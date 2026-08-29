import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, BindingPattern as BindingPattern__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, EnumMember as EnumMember__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, Kind as Kind__from_ast, MappedTypeNode as MappedTypeNode__from_ast, ModifierList as ModifierList__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, QualifiedName as QualifiedName__from_ast, SymbolFlags as SymbolFlags__from_ast, TypePredicateNode as TypePredicateNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { Flags as Flags__from_nodebuilder, InternalFlags as InternalFlags__from_nodebuilder, SymbolTracker as SymbolTracker__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { NodeFactory as NodeFactory__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { PseudoGetAccessor as PseudoGetAccessor__from_pseudochecker, PseudoObjectMethod as PseudoObjectMethod__from_pseudochecker, PseudoParameter as PseudoParameter__from_pseudochecker, PseudoPropertyAssignment as PseudoPropertyAssignment__from_pseudochecker, PseudoSetAccessor as PseudoSetAccessor__from_pseudochecker, PseudoTypeDirect as PseudoTypeDirect__from_pseudochecker, PseudoTypeInferred as PseudoTypeInferred__from_pseudochecker, PseudoTypeLiteral as PseudoTypeLiteral__from_pseudochecker, PseudoTypeMaybeConstLocation as PseudoTypeMaybeConstLocation__from_pseudochecker, PseudoTypeNoResult as PseudoTypeNoResult__from_pseudochecker, PseudoTypeObjectLiteral as PseudoTypeObjectLiteral__from_pseudochecker, PseudoTypeSingleCallSignature as PseudoTypeSingleCallSignature__from_pseudochecker, PseudoTypeTuple as PseudoTypeTuple__from_pseudochecker, PseudoTypeUnion as PseudoTypeUnion__from_pseudochecker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Host, Program } from "./checker.js";
import type { localsRecord$Storage as localsRecord__from_checker$Storage } from "./nodebuilderscopes.js";
import type { SymbolTrackerImpl } from "./symboltracker.js";
import type { ConditionalRoot, ConditionalType, IndexedAccessType, InstantiationExpressionType, IntersectionType, LiteralType, MappedType, ReverseMappedSymbolLinks$Storage as ReverseMappedSymbolLinks__from_checker$Storage, StringMappingType, SubstitutionType, SymbolNodeLinks$Storage as SymbolNodeLinks__from_checker$Storage, TemplateLiteralType, Ternary, TupleType, TypeId, TypeParameter, TypePredicate, TypeReference, UnionType, UniqueESSymbolType, ValueSymbolLinks$Storage as ValueSymbolLinks__from_checker$Storage } from "./types.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStorage, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BindingElement as BindingElement__from_ast, BodyBase as BodyBase__from_ast, CanHaveModifiers as CanHaveModifiers__from_ast, CheckFlagsInstantiated$constant as CheckFlagsInstantiated$constant__from_ast, CheckFlagsLate$constant as CheckFlagsLate$constant__from_ast, CheckFlagsOptionalParameter$constant as CheckFlagsOptionalParameter$constant__from_ast, CheckFlagsRestParameter$constant as CheckFlagsRestParameter$constant__from_ast, CheckFlagsReverseMapped$constant as CheckFlagsReverseMapped$constant__from_ast, CreateModifiersFromModifierFlags as CreateModifiersFromModifierFlags__from_ast, DeclarationBase as DeclarationBase__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FindAncestor as FindAncestor__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetContainingFunction as GetContainingFunction__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetExtendsHeritageClauseElements as GetExtendsHeritageClauseElements__from_ast, GetFirstIdentifier as GetFirstIdentifier__from_ast, GetImplementsHeritageClauseElements as GetImplementsHeritageClauseElements__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetNodeId as GetNodeId__from_ast, GetSourceFileOfModule as GetSourceFileOfModule__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetSymbolId as GetSymbolId__from_ast, HasInferredType as HasInferredType__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, Identifier as Identifier__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, InternalSymbolNameDefault$string as InternalSymbolNameDefault$string__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, InternalSymbolNameMissing$string as InternalSymbolNameMissing$string__from_ast, IsAccessor as IsAccessor__from_ast, IsAmbientModuleSymbolName as IsAmbientModuleSymbolName__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsBlock as IsBlock__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsDeclaration as IsDeclaration__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsEntityName as IsEntityName__from_ast, IsEnumMember as IsEnumMember__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpressionWithTypeArguments as IsExpressionWithTypeArguments__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsImportTypeNode as IsImportTypeNode__from_ast, IsInJSFile as IsInJSFile__from_ast, IsIndexedAccessTypeNode as IsIndexedAccessTypeNode__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsLiteralImportTypeNode as IsLiteralImportTypeNode__from_ast, IsModifier as IsModifier__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessEntityNameExpression as IsPropertyAccessEntityNameExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsRequireCall as IsRequireCall__from_ast, IsReturnStatement as IsReturnStatement__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsThisIdentifier as IsThisIdentifier__from_ast, IsThisTypeNode as IsThisTypeNode__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsTypePredicateNode as IsTypePredicateNode__from_ast, IsTypeQueryNode as IsTypeQueryNode__from_ast, IsTypeReferenceNode as IsTypeReferenceNode__from_ast, KindAccessorKeyword$constant as KindAccessorKeyword$constant__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAssertsKeyword$constant as KindAssertsKeyword$constant__from_ast, KindBigIntKeyword$constant as KindBigIntKeyword$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIntrinsicKeyword$constant as KindIntrinsicKeyword$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleKeyword$constant as KindModuleKeyword$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, KindOmittedExpression$constant as KindOmittedExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, KindWithKeyword$constant as KindWithKeyword$constant__from_ast, Kind_String as Kind_String__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, LocalsContainerBase as LocalsContainerBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierFlagsAsync$constant as ModifierFlagsAsync$constant__from_ast, ModifierFlagsConst$constant as ModifierFlagsConst$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, ModifiersToFlags as ModifiersToFlags__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsLet$constant as NodeFlagsLet$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, NodeId as NodeId__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, ReplaceModifiers as ReplaceModifiers__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, SymbolFlagsAccessor$constant as SymbolFlagsAccessor$constant__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsAll$constant as SymbolFlagsAll$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsEnum$constant as SymbolFlagsEnum$constant__from_ast, SymbolFlagsEnumMember$constant as SymbolFlagsEnumMember$constant__from_ast, SymbolFlagsFunction$constant as SymbolFlagsFunction$constant__from_ast, SymbolFlagsFunctionScopedVariable$constant as SymbolFlagsFunctionScopedVariable$constant__from_ast, SymbolFlagsInterface$constant as SymbolFlagsInterface$constant__from_ast, SymbolFlagsMethod$constant as SymbolFlagsMethod$constant__from_ast, SymbolFlagsOptional$constant as SymbolFlagsOptional$constant__from_ast, SymbolFlagsPrototype$constant as SymbolFlagsPrototype$constant__from_ast, SymbolFlagsTransient$constant as SymbolFlagsTransient$constant__from_ast, SymbolFlagsType$constant as SymbolFlagsType$constant__from_ast, SymbolFlagsTypeAlias$constant as SymbolFlagsTypeAlias$constant__from_ast, SymbolFlagsTypeLiteral$constant as SymbolFlagsTypeLiteral$constant__from_ast, SymbolFlagsTypeParameter$constant as SymbolFlagsTypeParameter$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, SymbolId as SymbolId__from_ast, SymbolName as SymbolName__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TryGetTextOfPropertyName as TryGetTextOfPropertyName__from_ast, TypeNodeBase as TypeNodeBase__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclaration as VariableDeclaration__from_ast, Visitor as Visitor__from_ast, WalkUpParenthesizedTypes as WalkUpParenthesizedTypes__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CopyOnWriteMap as CopyOnWriteMap__from_collections, CopyOnWriteSet as CopyOnWriteSet__from_collections, MultiMap as MultiMap__from_collections, Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, LinkStore as LinkStore__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, NewTextRange as NewTextRange__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FromString as FromString__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { ModeAwareCacheKey as ModeAwareCacheKey__from___go_module, ModeAwareCache as ModeAwareCache__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { CountPathComponents as CountPathComponents__from_modulespecifiers, GetModuleSpecifiers as GetModuleSpecifiers__from_modulespecifiers, ImportModuleSpecifierEndingPreferenceJs$constant as ImportModuleSpecifierEndingPreferenceJs$constant__from_modulespecifiers, ImportModuleSpecifierEndingPreferenceNone$constant as ImportModuleSpecifierEndingPreferenceNone$constant__from_modulespecifiers, ImportModuleSpecifierPreferenceProjectRelative$constant as ImportModuleSpecifierPreferenceProjectRelative$constant__from_modulespecifiers, ModuleSpecifierOptions as ModuleSpecifierOptions__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { FlagsAllowAnonymousIdentifier$constant as FlagsAllowAnonymousIdentifier$constant__from_nodebuilder, FlagsAllowEmptyIndexInfoType$constant as FlagsAllowEmptyIndexInfoType$constant__from_nodebuilder, FlagsAllowEmptyTuple$constant as FlagsAllowEmptyTuple$constant__from_nodebuilder, FlagsAllowEmptyUnionOrIntersection$constant as FlagsAllowEmptyUnionOrIntersection$constant__from_nodebuilder, FlagsAllowNodeModulesRelativePaths$constant as FlagsAllowNodeModulesRelativePaths$constant__from_nodebuilder, FlagsAllowQualifiedNameInPlaceOfIdentifier$constant as FlagsAllowQualifiedNameInPlaceOfIdentifier$constant__from_nodebuilder, FlagsAllowThisInObjectLiteral$constant as FlagsAllowThisInObjectLiteral$constant__from_nodebuilder, FlagsAllowUniqueESSymbolType$constant as FlagsAllowUniqueESSymbolType$constant__from_nodebuilder, FlagsForbidIndexedAccessSymbolReferences$constant as FlagsForbidIndexedAccessSymbolReferences$constant__from_nodebuilder, FlagsGenerateNamesForShadowedTypeParams$constant as FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder, FlagsInInitialEntityName$constant as FlagsInInitialEntityName$constant__from_nodebuilder, FlagsInObjectTypeLiteral$constant as FlagsInObjectTypeLiteral$constant__from_nodebuilder, FlagsInTypeAlias$constant as FlagsInTypeAlias$constant__from_nodebuilder, FlagsMultilineObjectLiterals$constant as FlagsMultilineObjectLiterals$constant__from_nodebuilder, FlagsNoTruncation$constant as FlagsNoTruncation$constant__from_nodebuilder, FlagsNoTypeReduction$constant as FlagsNoTypeReduction$constant__from_nodebuilder, FlagsOmitParameterModifiers$constant as FlagsOmitParameterModifiers$constant__from_nodebuilder, FlagsOmitThisParameter$constant as FlagsOmitThisParameter$constant__from_nodebuilder, FlagsSuppressAnyReturnType$constant as FlagsSuppressAnyReturnType$constant__from_nodebuilder, FlagsUseAliasDefinedOutsideCurrentScope$constant as FlagsUseAliasDefinedOutsideCurrentScope$constant__from_nodebuilder, FlagsUseFullyQualifiedType$constant as FlagsUseFullyQualifiedType$constant__from_nodebuilder, FlagsUseInstantiationExpressions$constant as FlagsUseInstantiationExpressions$constant__from_nodebuilder, FlagsUseOnlyExternalAliasing$constant as FlagsUseOnlyExternalAliasing$constant__from_nodebuilder, FlagsUseSingleQuotesForStringLiteralType$constant as FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder, FlagsUseStructuralFallback$constant as FlagsUseStructuralFallback$constant__from_nodebuilder, FlagsUseTypeOfFunction$constant as FlagsUseTypeOfFunction$constant__from_nodebuilder, FlagsWriteArrayAsGenericType$constant as FlagsWriteArrayAsGenericType$constant__from_nodebuilder, FlagsWriteClassExpressionAsTypeLiteral$constant as FlagsWriteClassExpressionAsTypeLiteral$constant__from_nodebuilder, FlagsWriteTypeArgumentsOfSignature$constant as FlagsWriteTypeArgumentsOfSignature$constant__from_nodebuilder, FlagsWriteTypeParametersInQualifiedName$constant as FlagsWriteTypeParametersInQualifiedName$constant__from_nodebuilder, InternalFlagsDoNotIncludeSymbolChain$constant as InternalFlagsDoNotIncludeSymbolChain$constant__from_nodebuilder, InternalFlagsWriteComputedProps$constant as InternalFlagsWriteComputedProps$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { EFNoAsciiEscaping$constant as EFNoAsciiEscaping$constant__from_printer, EFNoIndentation$constant as EFNoIndentation$constant__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, SymbolAccessibilityAccessible$constant as SymbolAccessibilityAccessible$constant__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { $state as $state__pseudochecker, IsInConstContext as IsInConstContext__from_pseudochecker, NewPseudoChecker as NewPseudoChecker__from_pseudochecker, NewPseudoTypeUnion as NewPseudoTypeUnion__from_pseudochecker, PseudoChecker as PseudoChecker__from_pseudochecker, PseudoObjectElementKindGetAccessor$constant as PseudoObjectElementKindGetAccessor$constant__from_pseudochecker, PseudoObjectElementKindMethod$constant as PseudoObjectElementKindMethod$constant__from_pseudochecker, PseudoObjectElementKindPropertyAssignment$constant as PseudoObjectElementKindPropertyAssignment$constant__from_pseudochecker, PseudoObjectElementKindSetAccessor$constant as PseudoObjectElementKindSetAccessor$constant__from_pseudochecker, PseudoObjectElement as PseudoObjectElement__from_pseudochecker, PseudoTypeKindAny$constant as PseudoTypeKindAny$constant__from_pseudochecker, PseudoTypeKindBigInt$constant as PseudoTypeKindBigInt$constant__from_pseudochecker, PseudoTypeKindBigIntLiteral$constant as PseudoTypeKindBigIntLiteral$constant__from_pseudochecker, PseudoTypeKindBoolean$constant as PseudoTypeKindBoolean$constant__from_pseudochecker, PseudoTypeKindDirect$constant as PseudoTypeKindDirect$constant__from_pseudochecker, PseudoTypeKindFalse$constant as PseudoTypeKindFalse$constant__from_pseudochecker, PseudoTypeKindInferred$constant as PseudoTypeKindInferred$constant__from_pseudochecker, PseudoTypeKindMaybeConstLocation$constant as PseudoTypeKindMaybeConstLocation$constant__from_pseudochecker, PseudoTypeKindNoResult$constant as PseudoTypeKindNoResult$constant__from_pseudochecker, PseudoTypeKindNull$constant as PseudoTypeKindNull$constant__from_pseudochecker, PseudoTypeKindNumber$constant as PseudoTypeKindNumber$constant__from_pseudochecker, PseudoTypeKindNumericLiteral$constant as PseudoTypeKindNumericLiteral$constant__from_pseudochecker, PseudoTypeKindObjectLiteral$constant as PseudoTypeKindObjectLiteral$constant__from_pseudochecker, PseudoTypeKindSingleCallSignature$constant as PseudoTypeKindSingleCallSignature$constant__from_pseudochecker, PseudoTypeKindString$constant as PseudoTypeKindString$constant__from_pseudochecker, PseudoTypeKindStringLiteral$constant as PseudoTypeKindStringLiteral$constant__from_pseudochecker, PseudoTypeKindTrue$constant as PseudoTypeKindTrue$constant__from_pseudochecker, PseudoTypeKindTuple$constant as PseudoTypeKindTuple$constant__from_pseudochecker, PseudoTypeKindUndefined$constant as PseudoTypeKindUndefined$constant__from_pseudochecker, PseudoTypeKindUnion$constant as PseudoTypeKindUnion$constant__from_pseudochecker, PseudoType as PseudoType__from_pseudochecker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/package.js";
import { DeclarationNameToString as DeclarationNameToString__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsDigit as IsDigit__from_stringutil, StripQuotes as StripQuotes__from_stringutil, UnquoteString as UnquoteString__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { PathIsRelative as PathIsRelative__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { CopyOnWriteMap$Get$Named_checker$TypeId$PointerTo_Named_ast$Identifier, CopyOnWriteMap$Get$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/CopyOnWriteMap$Get.js";
import { CopyOnWriteMap$Set$Named_checker$TypeId$PointerTo_Named_ast$Identifier, CopyOnWriteMap$Set$string$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/CopyOnWriteMap$Set.js";
import { CopyOnWriteSet$Add$Named_ast$SymbolId, CopyOnWriteSet$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/CopyOnWriteSet$Add.js";
import { CopyOnWriteSet$Has$Named_ast$SymbolId, CopyOnWriteSet$Has$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/CopyOnWriteSet$Has.js";
import { Set$Add$Named_checker$TypeId, Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Len$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { Coalesce$PointerTo_Named_ast$Node$Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Coalesce.js";
import { CountWhere$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/CountWhere.js";
import { Every$PointerTo_Named_ast$Node, Every$PointerTo_Named_checker$Signature } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$PointerTo_Named_ast$Node, Filter$PointerTo_Named_ast$Symbol, Filter$PointerTo_Named_checker$Signature } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonNil.js";
import { FirstOrNil$PointerTo_Named_ast$Node, FirstOrNil$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { IfElse$Named_ast$Kind, IfElse$Named_ast$TokenFlags, IfElse$Named_checker$propertyNameNodeKind, IfElse$Named_printer$EmitFlags, IfElse$PointerTo_Named_ast$Node, IfElse$SliceOf_PointerTo_Named_ast$Symbol, IfElse$SliceOf_PointerTo_Named_checker$Signature, IfElse$int, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks, LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SymbolNodeLinks, LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$NodeBuilderSymbolLinks, LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LinkStore$Get.js";
import { Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node, Map$PointerTo_Named_ast$Symbol$Named_checker$sortedSymbolNamePair, Map$PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Node, Map$PointerTo_Named_checker$Signature$PointerTo_Named_checker$Type, Map$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node, Map$PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapIndex$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapIndex.js";
import { SameMapIndex$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/SameMapIndex.js";
import { Some$PointerTo_Named_ast$Node, Some$PointerTo_Named_ast$Symbol, Some$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Keys$MapOf_PointerTo_Named_ast$Symbol_To_string$PointerTo_Named_ast$Symbol$string } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { Collect$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { Concat$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { Contains$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol, Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Equal$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { SortStableFunc$SliceOf_Named_checker$sortedSymbolNamePair$Named_checker$sortedSymbolNamePair } from "../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_pseudochecker$PseudoTypeKind, $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_checker$Checker, $goInterfaceAdapter$PointerTo_Named_checker$SymbolTrackerImpl, $goInterfaceAdapter$PointerTo_Named_checker$wrappingTracker, $goInterfaceAdapter$bool, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_string, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeBuilderLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$NodeBuilderSymbolLinks, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_string, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_checker$CompositeTypeCacheIdentity_To_PointerTo_Named_checker$SerializedTypeEntry as GoMap } from "../../../../../../support/maps.js";
import { Checker, MappedTypeModifiersIncludeOptional$constant, TypeFactsNEUndefined$constant, getBigIntLiteralValue, getMappedTypeModifiers, getNameFromIndexInfo, isConstEnumSymbol, isRestParameter, isTupleType } from "./checker.js";
import { EmitResolver } from "./emitresolver.js";
import { TypeMapper, newTypeMapper, prependTypeMapping } from "./mapper.js";
import { isExpanding, isHashPrivate, typeElementsToClassElements } from "./nodebuilder_hover.js";
import { cloneNodeBuilderContext, localsRecord } from "./nodebuilderscopes.js";
import { getExistingNodeTreeVisitor, newWrappingTracker, recoveryBoundary } from "./nodecopy.js";
import { isStructuralPseudoType } from "./pseudotypenodebuilder.js";
import { getQualifiedLeftMeaning, hasNonGlobalAugmentationExternalModuleSymbol } from "./symbolaccessibility.js";
import { NewSymbolTrackerImpl } from "./symboltracker.js";
import { ContextFlagsNone$constant, ElementFlagsNonRequired$constant, ElementFlagsOptional$constant, ElementFlagsRest$constant, ElementFlagsVariable$constant, IndexInfo, InterfaceType, ObjectFlagsAnonymous$constant, ObjectFlagsClassOrInterface$constant, ObjectFlagsInstantiationExpressionType$uint32, ObjectFlagsIsClassInstanceClone$uint32, ObjectFlagsMapped$constant, ObjectFlagsReference$constant, ObjectFlagsRequiresWidening$constant, ObjectFlagsReverseMapped$constant, ObjectFlagsTuple$constant, ReverseMappedSymbolLinks, Signature, SignatureFlagsAbstract$constant, SignatureFlagsNone$constant, SignatureKindCall$constant, SignatureKindConstruct$constant, StructuredType, SymbolNodeLinks, TernaryTrue$constant, TupleElementInfo, Type, TypeAlias, TypeBase, TypeFlagsAny$constant, TypeFlagsBigInt$constant, TypeFlagsBigIntLiteral$constant, TypeFlagsBoolean$constant, TypeFlagsBooleanLiteral$constant, TypeFlagsConditional$constant, TypeFlagsESSymbol$constant, TypeFlagsEnumLike$constant, TypeFlagsIndex$constant, TypeFlagsIndexedAccess$constant, TypeFlagsNever$constant, TypeFlagsNonPrimitive$constant, TypeFlagsNull$constant, TypeFlagsNumber$constant, TypeFlagsNumberLiteral$constant, TypeFlagsObject$constant, TypeFlagsString$constant, TypeFlagsStringLike$constant, TypeFlagsStringLiteral$constant, TypeFlagsStringMapping$constant, TypeFlagsStringOrNumberLiteral$constant, TypeFlagsSubstitution$constant, TypeFlagsTemplateLiteral$constant, TypeFlagsTypeParameter$constant, TypeFlagsUndefined$constant, TypeFlagsUnion$constant, TypeFlagsUniqueESSymbol$constant, TypeFlagsUnknown$constant, TypeFlagsVoid$constant, TypePredicateKindAssertsIdentifier$constant, TypePredicateKindAssertsThis$constant, TypePredicateKindIdentifier$constant, TypePredicateKindThis$constant, ValueSymbolLinks } from "./types.js";
import { IsExternalModuleSymbol, IsPrivateIdentifierSymbol, IsTypeAny, containsNonMissingUndefinedType, getDeclarationModifierFlagsFromSymbol, isLateBoundName, isNumericLiteralName, isOptionalDeclaration, isReservedMemberName, isThisTypeParameter, pseudoBigIntToString } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMapValue } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class CompositeSymbolIdentity {
    declare private readonly $goType: void;
    public constructor(public isConstructorNode: bool, public symbolId: SymbolId__from_ast, public nodeId: NodeId__from_ast) {
    }
    static $copy($source: CompositeSymbolIdentity): CompositeSymbolIdentity {
        return new CompositeSymbolIdentity($source.isConstructorNode, $source.symbolId, $source.nodeId);
    }
    static $equal($left: CompositeSymbolIdentity, $right: CompositeSymbolIdentity): bool {
        return $left.isConstructorNode === $right.isConstructorNode && $left.symbolId.$value === $right.symbolId.$value && $left.nodeId.$value === $right.nodeId.$value;
    }
    static $hash($source: CompositeSymbolIdentity): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isConstructorNode));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.symbolId.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint($source.nodeId.$value));
        return $hash;
    }
    declare private readonly then?: never;
}
export class TrackedSymbolArgs {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public meaning: SymbolFlags__from_ast) {
    }
    static $copy($source: TrackedSymbolArgs): TrackedSymbolArgs {
        return new TrackedSymbolArgs($source.__go_symbol, $source.enclosingDeclaration, $source.meaning);
    }
    static $equal($left: TrackedSymbolArgs, $right: TrackedSymbolArgs): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.__go_symbol, $right.__go_symbol)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.enclosingDeclaration, $right.enclosingDeclaration) && $left.meaning === $right.meaning;
    }
    static $hash($source: TrackedSymbolArgs): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.__go_symbol));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.enclosingDeclaration));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.meaning));
        return $hash;
    }
    declare private readonly then?: never;
}
export class SerializedTypeEntry {
    declare private readonly $goType: void;
    public constructor(public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public truncating: bool, public addedLength: int, public trackedSymbols: RuntimeSlice<{
        value: TrackedSymbolArgs;
    } | undefined>) {
    }
    declare private readonly then?: never;
}
export class CompositeTypeCacheIdentity {
    declare private readonly $goType: void;
    public constructor(public typeId: TypeId, public flags: Flags__from_nodebuilder, public internalFlags: InternalFlags__from_nodebuilder) {
    }
    static $copy($source: CompositeTypeCacheIdentity): CompositeTypeCacheIdentity {
        return new CompositeTypeCacheIdentity($source.typeId, $source.flags, $source.internalFlags);
    }
    static $equal($left: CompositeTypeCacheIdentity, $right: CompositeTypeCacheIdentity): bool {
        return $left.typeId === $right.typeId && $left.flags === $right.flags && $left.internalFlags === $right.internalFlags;
    }
    static $hash($source: CompositeTypeCacheIdentity): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.typeId));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.flags));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.internalFlags));
        return $hash;
    }
    declare private readonly then?: never;
}
export type NodeBuilderLinks$Storage = {
    serializedTypes: GoMapValue<CompositeTypeCacheIdentity, SerializedTypeEntry | undefined>;
    fakeScopeForSignatureDeclaration: tsonicTypeScriptRuntime.Location<gostring> | undefined;
};
export class NodeBuilderLinks implements GoContainerStoredValue<NodeBuilderLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeBuilderLinks$Storage) {
    }
    public static $storageOf($source: NodeBuilderLinks): NodeBuilderLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeBuilderLinks$Storage): NodeBuilderLinks {
        return new NodeBuilderLinks($source);
    }
    public get serializedTypes(): GoMapValue<CompositeTypeCacheIdentity, SerializedTypeEntry | undefined> {
        return this.$storage.serializedTypes;
    }
    public set serializedTypes($value: GoMapValue<CompositeTypeCacheIdentity, SerializedTypeEntry | undefined>) {
        this.$storage.serializedTypes = $value;
    }
    public get fakeScopeForSignatureDeclaration(): tsonicTypeScriptRuntime.Location<gostring> | undefined {
        return this.$storage.fakeScopeForSignatureDeclaration;
    }
    public set fakeScopeForSignatureDeclaration($value: tsonicTypeScriptRuntime.Location<gostring> | undefined) {
        this.$storage.fakeScopeForSignatureDeclaration = $value;
    }
    declare readonly [$goContainerStorageType]: NodeBuilderLinks$Storage;
    static $zero(): NodeBuilderLinks {
        return new NodeBuilderLinks({
            serializedTypes: GoMap.nil(),
            fakeScopeForSignatureDeclaration: void 0
        });
    }
    static $copy($source: NodeBuilderLinks): NodeBuilderLinks {
        return new NodeBuilderLinks({
            serializedTypes: $source.$storage.serializedTypes,
            fakeScopeForSignatureDeclaration: $source.$storage.fakeScopeForSignatureDeclaration
        });
    }
    static $zeroStorage(): NodeBuilderLinks$Storage {
        return {
            serializedTypes: GoMap.nil(),
            fakeScopeForSignatureDeclaration: void 0
        };
    }
    declare private readonly then?: never;
}
export type NodeBuilderSymbolLinks$Storage = {
    specifierCache: GoMapValue<ModeAwareCacheKey__from___go_module, gostring>;
};
export class NodeBuilderSymbolLinks implements GoContainerStoredValue<NodeBuilderSymbolLinks$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: NodeBuilderSymbolLinks$Storage) {
    }
    public static $storageOf($source: NodeBuilderSymbolLinks): NodeBuilderSymbolLinks$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: NodeBuilderSymbolLinks$Storage): NodeBuilderSymbolLinks {
        return new NodeBuilderSymbolLinks($source);
    }
    public get specifierCache(): ModeAwareCache__from___go_module<gostring> {
        return new ModeAwareCache__from___go_module(this.$storage.specifierCache);
    }
    public set specifierCache($value: ModeAwareCache__from___go_module<gostring>) {
        this.$storage.specifierCache = $value.$value;
    }
    declare readonly [$goContainerStorageType]: NodeBuilderSymbolLinks$Storage;
    static $zero(): NodeBuilderSymbolLinks {
        return new NodeBuilderSymbolLinks({
            specifierCache: new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_string.nil()).$value
        });
    }
    static $copy($source: NodeBuilderSymbolLinks): NodeBuilderSymbolLinks {
        return new NodeBuilderSymbolLinks({
            specifierCache: new ModeAwareCache__from___go_module($source.$storage.specifierCache).$value
        });
    }
    static $zeroStorage(): NodeBuilderSymbolLinks$Storage {
        return {
            specifierCache: new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_string.nil()).$value
        };
    }
    declare private readonly then?: never;
}
export class NodeBuilderContext {
    declare private readonly $goType: void;
    public constructor(public host: Host | undefined, public tracker: SymbolTracker__from_nodebuilder | undefined, public approximateLength: int, public maxTruncationLength: int, public encounteredError: bool, public truncating: bool, public reportedDiagnostic: bool, public flags: Flags__from_nodebuilder, public internalFlags: InternalFlags__from_nodebuilder, public depth: int, public maxExpansionDepth: int, public typeStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public canIncreaseExpansionDepth: bool, public expansionTruncated: bool, public enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public enclosingFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public inferTypeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, public visitedTypes: Set__from_collections<TypeId>, public symbolDepth: GoMapValue<CompositeSymbolIdentity, int>, public trackedSymbols: RuntimeSlice<{
        value: TrackedSymbolArgs;
    } | undefined>, public mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined, public reverseMappedStack: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public enclosingSymbolTypes: GoMapValue<SymbolId__from_ast, tsonicTypeScriptRuntime.Location<Type> | undefined>, public suppressReportInferenceFallback: bool, public remappedSymbolReferences: GoMapValue<SymbolId__from_ast, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public typeParameterNames: CopyOnWriteMap__from_collections<TypeId, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>, public typeParameterNamesByText: CopyOnWriteSet__from_collections<gostring>, public typeParameterNamesByTextNextNameCount: CopyOnWriteMap__from_collections<gostring, int>, public typeParameterSymbolList: CopyOnWriteSet__from_collections<SymbolId__from_ast>) {
    }
    static $copy($source: NodeBuilderContext): NodeBuilderContext {
        return new NodeBuilderContext($source.host, $source.tracker, $source.approximateLength, $source.maxTruncationLength, $source.encounteredError, $source.truncating, $source.reportedDiagnostic, $source.flags, $source.internalFlags, $source.depth, $source.maxExpansionDepth, $source.typeStack, $source.canIncreaseExpansionDepth, $source.expansionTruncated, $source.enclosingDeclaration, $source.enclosingFile, $source.inferTypeParameters, Set__from_collections.$copy<TypeId>($source.visitedTypes), $source.symbolDepth, $source.trackedSymbols, $source.mapper, $source.reverseMappedStack, $source.enclosingSymbolTypes, $source.suppressReportInferenceFallback, $source.remappedSymbolReferences, CopyOnWriteMap__from_collections.$copy<TypeId, tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined>($source.typeParameterNames), CopyOnWriteSet__from_collections.$copy<gostring>($source.typeParameterNamesByText), CopyOnWriteMap__from_collections.$copy<gostring, int>($source.typeParameterNamesByTextNextNameCount), CopyOnWriteSet__from_collections.$copy<SymbolId__from_ast>($source.typeParameterSymbolList));
    }
    declare private readonly then?: never;
}
export class NodeBuilderImpl {
    declare private readonly $goType: void;
    public constructor(public f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, public ch: {
        value: Checker;
    } | undefined, public e: {
        value: EmitContext__from_printer;
    } | undefined, public pc: {
        value: PseudoChecker__from_pseudochecker;
    } | undefined, public links: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>, public symbolLinks: LinkStore__from_core<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, NodeBuilderSymbolLinks>, public ctx: {
        value: NodeBuilderContext;
    } | undefined, public cloneBindingNameVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>) {
    }
    static $copy($source: NodeBuilderImpl): NodeBuilderImpl {
        return new NodeBuilderImpl($source.f, $source.ch, $source.e, $source.pc, LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>($source.links), LinkStore__from_core.$copy<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, NodeBuilderSymbolLinks>($source.symbolLinks), $source.ctx, $source.cloneBindingNameVisitor, $source.idToSymbol);
    }
    declare private readonly then?: never;
    static $go$private$checker$addClassModifiers(b: {
        value: NodeBuilderImpl;
    } | undefined, members: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, isStatic: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_range_62 = members;
        for (let __gotots_range_index_59 = 0; __gotots_range_index_59 < __gotots_range_62.length; __gotots_range_index_59++) {
            const __gotots_range_value_74 = __gotots_range_index_59;
            const __gotots_range_value_75 = __gotots_range_62.get(__gotots_range_index_59);
            let i = __gotots_range_value_74;
            let m: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_75;
            let memberSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
            let memberName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(m);
            if (!(memberName === undefined)) {
                {
                    const __gotots_results_14 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.lookupOk(memberName);
                    let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_14[0];
                    let ok = __gotots_results_14[1];
                    if (ok) {
                        memberSymbol = sym;
                    }
                }
            }
            if (memberSymbol === undefined) {
                continue;
            }
            let modFlags = (getDeclarationModifierFlagsFromSymbol(memberSymbol) & ~ModifierFlagsAsync$constant__from_ast()) >>> 0;
            if (isStatic) {
                modFlags = (modFlags | 256) >>> 0;
            }
            if (!(modFlags === 0) && CanHaveModifiers__from_ast(m)) {
                let existing = Node__from_ast.ModifierFlags(m);
                if (!(modFlags === existing)) {
                    const __gotots_store_147 = members;
                    const __gotots_store_148 = i;
                    const __gotots_argument_172: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                    const __gotots_argument_173 = m;
                    const __gotots_receiver_75: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                    const __gotots_argument_169 = (modFlags | existing) >>> 0;
                    const __gotots_receiver_74: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                    const __gotots_argument_170 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                        return NodeFactory__from_ast.NewModifier(__gotots_receiver_74, $argument0);
                    };
                    const __gotots_argument_171 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_169, __gotots_argument_170);
                    const __gotots_argument_174 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_75, __gotots_argument_171);
                    __gotots_store_147.set(__gotots_store_148, ReplaceModifiers__from_ast(__gotots_argument_172, __gotots_argument_173, __gotots_argument_174));
                }
            }
        }
        return members;
    }
    static $go$private$checker$addPropertyToElementList(b: {
        value: NodeBuilderImpl;
    } | undefined, propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeElements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let propertyIsReverseMapped = !((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsReverseMapped$constant__from_ast()) >>> 0 === 0);
        let propertyType: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
        if (NodeBuilderImpl.$go$private$checker$shouldUsePlaceholderForProperty(b, propertySymbol)) {
            propertyType = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType;
        }
        else {
            propertyType = Checker.$go$private$checker$getNonMissingTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertySymbol);
        }
        let saveEnclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = void 0;
        if (isLateBoundName(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)) {
            if (Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
                if (Checker.$go$private$checker$hasLateBindableName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, decl)) {
                    if (IsBinaryExpression__from_ast(decl)) {
                        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(decl);
                        if (!(name === undefined) && IsElementAccessExpression__from_ast(name) && IsPropertyAccessEntityNameExpression__from_ast(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression, false)) {
                            NodeBuilderImpl.$go$private$checker$trackComputedName(b, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression, saveEnclosingDeclaration);
                        }
                    }
                    else {
                        NodeBuilderImpl.$go$private$checker$trackComputedName(b, Node__from_ast.Expression(Node__from_ast.Name(decl)), saveEnclosingDeclaration);
                    }
                }
            }
            else {
                const __gotots_receiver_35: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_112 = Checker.$go$private$checker$symbolToString((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertySymbol);
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_35).ReportNonSerializableProperty(__gotots_argument_112);
            }
        }
        if (!(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
        }
        else if (Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && !(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0) === undefined)) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
        }
        else {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = saveEnclosingDeclaration;
        }
        let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$getPropertyNameNodeForSymbol(b, propertySymbol);
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = saveEnclosingDeclaration;
        const __gotots_store_115 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_115.approximateLength = __gotots_store_115.approximateLength + (SymbolName__from_ast(propertySymbol).length + 1);
        if (!((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAccessor$constant__from_ast()) >>> 0 === 0)) {
            let writeType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getWriteTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertySymbol);
            if (!Checker.$go$private$checker$isErrorType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertyType) && !Checker.$go$private$checker$isErrorType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, writeType)) {
                let propDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(propertySymbol, KindPropertyDeclaration$constant__from_ast());
                if (!tsonicTypeScriptRuntime.sameLocation(propertyType, writeType) || !(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !((Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && propDeclaration === undefined) {
                    const __gotots_store_116 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let symbolMapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_116, "valueSymbolLinks"), propertySymbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).mapper;
                    {
                        let getterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(propertySymbol, KindGetAccessor$constant__from_ast());
                        if (!(getterDeclaration === undefined)) {
                            let getterSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, getterDeclaration);
                            if (!(symbolMapper === undefined)) {
                                getterSignature = Checker.$go$private$checker$instantiateSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, getterSignature, symbolMapper);
                            }
                            let getter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, getterSignature, KindGetAccessor$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), propertyName, void 0));
                            NodeBuilderImpl.$go$private$checker$setCommentRange(b, getter, getterDeclaration);
                            typeElements = typeElements.append(void 0, [getter]);
                        }
                    }
                    {
                        let setterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(propertySymbol, KindSetAccessor$constant__from_ast());
                        if (!(setterDeclaration === undefined)) {
                            let setterSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, setterDeclaration);
                            if (!(symbolMapper === undefined)) {
                                setterSignature = Checker.$go$private$checker$instantiateSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, setterSignature, symbolMapper);
                            }
                            let setter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, setterSignature, KindSetAccessor$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), propertyName, void 0));
                            NodeBuilderImpl.$go$private$checker$setCommentRange(b, setter, setterDeclaration);
                            typeElements = typeElements.append(void 0, [setter]);
                        }
                    }
                    return typeElements;
                }
                else if (!(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && !((Symbol__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && !(propDeclaration === undefined) && !(Find$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(propDeclaration), (m: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return Node__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAccessorKeyword$constant__from_ast();
                }) === undefined)) {
                    let fakeGetterSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$newSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SignatureFlagsNone$constant(), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(), propertyType, void 0, 0);
                    let fakeGetterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, fakeGetterSignature, KindGetAccessor$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), propertyName, void 0));
                    NodeBuilderImpl.$go$private$checker$setCommentRange(b, fakeGetterDeclaration, propDeclaration);
                    typeElements = typeElements.append(void 0, [fakeGetterDeclaration]);
                    let setterParam: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$newSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SymbolFlagsFunctionScopedVariable$constant__from_ast(), "arg");
                    const __gotots_store_117 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "valueSymbolLinks"), setterParam) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).resolvedType = writeType;
                    let fakeSetterSignature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$newSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SignatureFlagsNone$constant(), void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>(), void 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([setterParam]), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.voidType, void 0, 0);
                    let fakeSetterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, fakeSetterSignature, KindSetAccessor$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), propertyName, void 0));
                    typeElements = typeElements.append(void 0, [fakeSetterDeclaration]);
                    return typeElements;
                }
            }
        }
        let optionalToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0)) {
            optionalToken = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindQuestionToken$constant__from_ast());
        }
        else {
            optionalToken = void 0;
        }
        if (!((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (8208)) >>> 0 === 0) && Checker.$go$private$checker$getPropertiesOfObjectType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertyType).length === 0 && !Checker.$go$private$checker$isReadonlySymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertySymbol)) {
            let signatures = Checker.$go$private$checker$getSignaturesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$filterType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertyType, (t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
                return (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0;
            }), SignatureKindCall$constant());
            const __gotots_range_28 = signatures;
            for (let __gotots_range_index_26 = 0; __gotots_range_index_26 < __gotots_range_28.length; __gotots_range_index_26++) {
                const __gotots_range_value_33 = __gotots_range_28.get(__gotots_range_index_26);
                let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_33;
                let methodDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, signature, KindMethodSignature$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), propertyName, optionalToken));
                NodeBuilderImpl.$go$private$checker$setCommentRange(b, methodDeclaration, Coalesce$PointerTo_Named_ast$Node$Named_ast$Node(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration, Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
                typeElements = typeElements.append(void 0, [methodDeclaration]);
            }
            if (signatures.length !== 0 || optionalToken === undefined) {
                return typeElements;
            }
        }
        let propertyTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (NodeBuilderImpl.$go$private$checker$shouldUsePlaceholderForProperty(b, propertySymbol)) {
            propertyTypeNode = NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
        }
        else {
            if (propertyIsReverseMapped) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.append(void 0, [propertySymbol]);
            }
            if (!(propertyType === undefined)) {
                propertyTypeNode = NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, void 0, propertyType, propertySymbol, true);
            }
            else {
                propertyTypeNode = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
            }
            if (propertyIsReverseMapped) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.slice(0, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.length - 1, null);
            }
        }
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (Checker.$go$private$checker$isReadonlySymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propertySymbol)) {
            modifiers = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewModifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast())]));
            const __gotots_store_118 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_118.approximateLength = __gotots_store_118.approximateLength + 9;
        }
        let propertySignature: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, propertyName, optionalToken, propertyTypeNode, void 0);
        NodeBuilderImpl.$go$private$checker$setCommentRange(b, propertySignature, Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
        typeElements = typeElements.append(void 0, [propertySignature]);
        return typeElements;
    }
    static $go$private$checker$addSymbolTypeToContext(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): (() => void) | undefined {
        let id = GetSymbolId__from_ast(__go_symbol);
        const __gotots_results_11 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.lookupOk(id);
        let oldType: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_results_11[0];
        let oldTypeExists = __gotots_results_11[1];
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.store(id, t);
        return (): void => {
            if (oldTypeExists) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.store(id, oldType);
            }
            else {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.delete(id);
            }
        };
    }
    static $go$private$checker$appendReferenceToType(b: {
        value: NodeBuilderImpl;
    } | undefined, root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsImportTypeNode__from_ast(root)) {
            let imprt: {
                value: ImportTypeNode__from_ast;
            } | undefined = Node__from_ast.AsImportTypeNode(root);
            let ids = getAccessStack(ref);
            let qualifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportTypeNode(root) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier;
            const __gotots_range_0 = ids;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                if (!(qualifier === undefined)) {
                    qualifier = NodeFactory__from_ast.NewQualifiedName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, qualifier, id);
                }
                else {
                    qualifier = id;
                }
            }
            return NodeFactory__from_ast.UpdateImportTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, imprt, (imprt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf, (imprt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument, (imprt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes, qualifier, Node__from_ast.TypeArgumentList(ref));
        }
        else if (IsTypeReferenceNode__from_ast(root)) {
            let typeRef: tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined = Node__from_ast.AsTypeReferenceNode(root);
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseInstantiationExpressions$constant__from_nodebuilder()) >>> 0 === 0) && !((void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                TypeReferenceNode__from_ast.$storageOf(((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments === undefined) && NodeList__from_ast.$storageOf((((void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                TypeReferenceNode__from_ast.$storageOf(((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 0) {
                let expr__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createExpressionWithTypeArguments(b, NodeBuilderImpl.$go$private$checker$createAccessExpression(b, TypeReferenceNode__from_ast.$storageOf(((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName), (void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                    TypeReferenceNode__from_ast.$storageOf(((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments);
                const __gotots_range_1 = getAccessStack(ref);
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                    expr__shadow_1 = NodeFactory__from_ast.NewPropertyAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, expr__shadow_1, void 0, id, NodeFlagsNone$constant__from_ast());
                }
                return expr__shadow_1;
            }
            let typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeReferenceNode__from_ast.$storageOf(((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
            const __gotots_range_2 = getAccessStack(ref);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                typeName = NodeFactory__from_ast.NewQualifiedName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeName, id);
            }
            return NodeFactory__from_ast.UpdateTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.AsTypeReferenceNode(root), typeName, Node__from_ast.TypeArgumentList(ref));
        }
        let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAccessExpression(b, root);
        const __gotots_range_3 = getAccessStack(ref);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
            expr = NodeFactory__from_ast.NewPropertyAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, expr, void 0, id, NodeFlagsNone$constant__from_ast());
        }
        return expr;
    }
    static $go$private$checker$checkTruncationLength(b: {
        value: NodeBuilderImpl;
    } | undefined): bool {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating) {
            return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating;
        }
        let maxLength = 0;
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
            maxLength = noTruncationMaximumTruncationLength$int;
        }
        else if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxTruncationLength > 0) {
            maxLength = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxTruncationLength;
        }
        else {
            maxLength = defaultMaximumTruncationLength$int;
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.approximateLength > maxLength;
        return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating;
    }
    static $go$private$checker$checkTruncationLengthIfExpanding(b: {
        value: NodeBuilderImpl;
    } | undefined): bool {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth >= 0 && NodeBuilderImpl.$go$private$checker$checkTruncationLength(b)) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expansionTruncated = true;
            return true;
        }
        return false;
    }
    static $go$private$checker$checkTypeExpandability(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): void {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth < 0 || t === undefined || ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
            return;
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.append(void 0, [t]);
        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined)) {
            NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, true);
        }
        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
            NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, false);
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.slice(0, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.length - 1, null);
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
            return;
        }
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0)) {
            const __gotots_range_37 = Checker.$go$private$checker$getTypeArguments((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
            for (let __gotots_range_index_35 = 0; __gotots_range_index_35 < __gotots_range_37.length; __gotots_range_index_35++) {
                const __gotots_range_value_43 = __gotots_range_37.get(__gotots_range_index_35);
                let arg: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_43;
                NodeBuilderImpl.$go$private$checker$checkTypeExpandability(b, arg);
                if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
                    return;
                }
            }
        }
    }
    static $go$private$checker$cloneBindingName(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsComputedPropertyName__from_ast(node) && Checker.$go$private$checker$isLateBindableName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node)) {
            NodeBuilderImpl.$go$private$checker$trackComputedName(b, Node__from_ast.Expression(node), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
        }
        let visited: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitEachChild((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cloneBindingNameVisitor, node);
        if (IsBindingElement__from_ast(visited)) {
            let bindingElement: {
                value: BindingElement__from_ast;
            } | undefined = Node__from_ast.AsBindingElement(visited);
            visited = NodeFactory__from_ast.UpdateBindingElement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, bindingElement, (bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken, (bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName, BindingElement__from_ast.Name(bindingElement), void 0);
        }
        if (!NodeIsSynthesized__from_ast(visited)) {
            visited = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, visited);
        }
        EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, visited, 131073);
        return visited;
    }
    static $go$private$checker$conditionalTypeToTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, _t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (NodeBuilderImpl.$go$private$checker$checkTruncationLength(b)) {
            return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
        }
        let t: {
            value: ConditionalType;
        } | undefined = Type.AsConditionalType(_t);
        let checkTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType);
        const __gotots_store_60 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_60.approximateLength = __gotots_store_60.approximateLength + 15;
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isDistributive && ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) {
            let newParam: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$newTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$newSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SymbolFlagsTypeParameter$constant__from_ast(), "T"));
            let name: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToName(b, newParam);
            const __gotots_receiver_14: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_store_61 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                        Identifier__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_29 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_30 = void 0;
            let newTypeVariable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeReferenceNode(__gotots_receiver_14, __gotots_argument_29, __gotots_argument_30);
            const __gotots_store_62 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_62.approximateLength = __gotots_store_62.approximateLength + 37;
            let newMapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = prependTypeMapping(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkType, newParam, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
            let saveInferTypeParameters__shadow_1: NodeBuilderContext["inferTypeParameters"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters;
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters;
            let extendsTypeNode__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType, newMapper));
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters = saveInferTypeParameters__shadow_1;
            let trueTypeNode__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNodeOrCircularityElision(b, Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType, false), newMapper));
            let falseTypeNode__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNodeOrCircularityElision(b, Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType, false), newMapper));
            let newId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Identifier__from_ast.Clone(Node__from_ast.AsIdentifier(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(newTypeVariable) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName), new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
            let syntheticExtendsNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewInferTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, newId, void 0, void 0, void 0));
            let innerCheckConditionalNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, newTypeVariable, extendsTypeNode__shadow_1, trueTypeNode__shadow_1, falseTypeNode__shadow_1);
            let syntheticTrueNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Identifier__from_ast.Clone(name, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f)), void 0), NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, checkTypeNode), innerCheckConditionalNode, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast()));
            return NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, checkTypeNode, syntheticExtendsNode, syntheticTrueNode, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast()));
        }
        let saveInferTypeParameters: NodeBuilderContext["inferTypeParameters"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters;
        let extendsTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendsType);
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters = saveInferTypeParameters;
        let trueTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNodeOrCircularityElision(b, Checker.$go$private$checker$getTrueTypeFromConditionalType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, _t));
        let falseTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNodeOrCircularityElision(b, Checker.$go$private$checker$getFalseTypeFromConditionalType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, _t));
        return NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode);
    }
    static $go$private$checker$createAccessExpression(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        __gotots_control_target_2: {
            if (IsQualifiedName__from_ast(node)) {
                return NodeFactory__from_ast.NewPropertyAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$createAccessExpression(b, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left), void 0, NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (Node__from_ast.AsQualifiedName(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right), NodeFlagsNone$constant__from_ast());
            }
            else if (IsIdentifier__from_ast(node) || IsPropertyAccessExpression__from_ast(node) || IsExpressionWithTypeArguments__from_ast(node)) {
                return NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, node);
            }
            else {
                const __gotots_argument_40 = new GoInterfaceAdapter("unexpected access node kind: " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
                GoPanic.raise(__gotots_argument_40 === undefined ? GoPanicNilValue.create() : __gotots_argument_40);
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$checker$createAccessFromSymbolChain(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int, stopper: int, overrideTypeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeParameterNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = overrideTypeArguments;
        if (index !== (chain.length - 1)) {
            typeParameterNodes = NodeBuilderImpl.$go$private$checker$lookupTypeParameterNodes(b, chain, index);
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
        let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
        if (index > 0) {
            parent = chain.get(index - 1);
        }
        let symbolName = "";
        if (index === 0) {
            const __gotots_store_66 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_66.flags = (__gotots_store_66.flags | 16777216) >>> 0;
            symbolName = NodeBuilderImpl.$go$private$checker$getNameOfSymbolAsWritten(b, __go_symbol);
            const __gotots_store_67 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_67.approximateLength = __gotots_store_67.approximateLength + (symbolName.length + 1);
            const __gotots_store_68 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_68.flags = (__gotots_store_68.flags ^ 16777216) >>> 0;
        }
        else {
            if (!(parent === undefined)) {
                let exports: SymbolTable__from_ast = Checker.$go$private$checker$getExportsOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent);
                if (!exports.$value.isNil()) {
                    const __gotots_results_3 = exports.$value.lookupOk(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    let res: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== InternalSymbolNameExportEquals$string__from_ast && !isLateBoundName(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) && ok && !(res === undefined) && !(Checker.$go$private$checker$getSymbolIfSameReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, res, __go_symbol) === undefined)) {
                        symbolName = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                    }
                    else {
                        let results: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring> = $goMap$MapOf_PointerTo_Named_ast$Symbol_To_string.make(1, []);
                        const __gotots_range_8 = exports.$value;
                        const __gotots_range_keys_0 = __gotots_range_8.keys();
                        for (const __gotots_range_value_9 of __gotots_range_keys_0) {
                            const __gotots_range_value_10 = __gotots_range_8.lookupOk(__gotots_range_value_9);
                            if (!__gotots_range_value_10[1]) {
                                continue;
                            }
                            const __gotots_range_value_11 = __gotots_range_value_9;
                            const __gotots_range_value_12 = __gotots_range_value_10[0];
                            let name = __gotots_range_value_11;
                            let ex: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_12;
                            if (!(Checker.$go$private$checker$getSymbolIfSameReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ex, __go_symbol) === undefined) && !isLateBoundName(name) && name !== InternalSymbolNameExportEquals$string__from_ast) {
                                results.store(ex, name);
                            }
                        }
                        let resultSymbols = Collect$PointerTo_Named_ast$Symbol(Keys$MapOf_PointerTo_Named_ast$Symbol_To_string$PointerTo_Named_ast$Symbol$string(results));
                        if (resultSymbols.length > 0) {
                            Checker.$go$private$checker$sortSymbols((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, resultSymbols);
                            symbolName = results.lookup(resultSymbols.get(0));
                        }
                    }
                }
            }
        }
        if (symbolName.length === 0) {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            const __gotots_range_9 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
                const __gotots_range_value_13 = __gotots_range_9.get(__gotots_range_index_7);
                let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
                name = GetNameOfDeclaration__from_ast(d);
                if (!(name === undefined)) {
                    break;
                }
            }
            if (!(name === undefined) && IsComputedPropertyName__from_ast(name) && IsEntityName__from_ast(Node__from_ast.Expression(name))) {
                let lhs: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAccessFromSymbolChain(b, chain, index - 1, stopper, overrideTypeArguments);
                if (IsEntityName__from_ast(lhs)) {
                    return NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewParenthesizedTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, lhs, void 0)), NodeFactory__from_ast.NewTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.Expression(name), void 0));
                }
                return lhs;
            }
            symbolName = NodeBuilderImpl.$go$private$checker$getNameOfSymbolAsWritten(b, __go_symbol);
        }
        const __gotots_store_69 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_69.approximateLength = __gotots_store_69.approximateLength + (symbolName.length + 1);
        if (((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsForbidIndexedAccessSymbolReferences$constant__from_nodebuilder()) >>> 0 === 0) && !(parent === undefined) && !Checker.$go$private$checker$getMembersOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent).$value.isNil() && !(Checker.$go$private$checker$getMembersOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent).$value.lookup(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) === undefined) && !(Checker.$go$private$checker$getSymbolIfSameReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getMembersOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent).$value.lookup(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), __go_symbol) === undefined)) {
            let lhs: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAccessFromSymbolChain(b, chain, index - 1, stopper, overrideTypeArguments);
            if (IsIndexedAccessTypeNode__from_ast(lhs)) {
                return NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, lhs, NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, symbolName)));
            }
            return NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, lhs, typeParameterNodes), NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, symbolName)));
        }
        let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$newIdentifier(b, symbolName, __go_symbol);
        EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, identifier, EFNoAsciiEscaping$constant__from_printer());
        if (index > stopper) {
            let lhs: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAccessFromSymbolChain(b, chain, index - 1, stopper, overrideTypeArguments);
            if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseInstantiationExpressions$constant__from_nodebuilder()) >>> 0 === 0 || IsEntityName__from_ast(lhs) && (typeParameterNodes === undefined || NodeList__from_ast.$storageOf(((typeParameterNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0)) {
                return NodeFactory__from_ast.NewQualifiedName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, lhs, identifier);
            }
            return NodeBuilderImpl.$go$private$checker$createExpressionWithTypeArguments(b, NodeFactory__from_ast.NewPropertyAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$createAccessExpression(b, lhs), void 0, identifier, NodeFlagsNone$constant__from_ast()), typeParameterNodes);
        }
        return identifier;
    }
    static $go$private$checker$createAnonymousTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeBuilderImpl.$go$private$checker$createAnonymousTypeNodeEx(b, t, false, false);
    }
    static $go$private$checker$createAnonymousTypeNodeEx(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, forceClassExpansion: bool, forceExpansion: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeId = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id;
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
        if (!(__go_symbol === undefined)) {
            let isInstantiationExpressionType = !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsInstantiationExpressionType$uint32) >>> 0 === 0);
            if (isInstantiationExpressionType) {
                let instantiationExpressionType: {
                    value: InstantiationExpressionType;
                } | undefined = Type.AsInstantiationExpressionType(t);
                let existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (instantiationExpressionType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node;
                if (IsTypeQueryNode__from_ast(existing) &&
                    tsonicTypeScriptRuntime.sameLocation(NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, existing, false), t)) {
                    const __gotots_store_37 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    if (Set__from_collections.Has<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "visitedTypes"), typeId)) {
                        return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
                    }
                    const __gotots_store_38 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    Set$Add$Named_checker$TypeId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "visitedTypes"), typeId);
                    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$tryReuseExistingNonParameterTypeNode(b, existing, t, void 0, void 0);
                    const __gotots_store_39 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    Set__from_collections.Delete<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "visitedTypes"), typeId);
                    if (!(typeNode === undefined)) {
                        return typeNode;
                    }
                }
                const __gotots_store_40 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                if (Set__from_collections.Has<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "visitedTypes"), typeId)) {
                    return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
                }
                return NodeBuilderImpl.$go$private$checker$visitAndTransformType(b, t, ($argument0: {
                    value: NodeBuilderImpl;
                } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return NodeBuilderImpl.$go$private$checker$createTypeNodeFromObjectType($argument0, $argument1);
                });
            }
            let isInstanceType = 0;
            if (isClassInstanceSide((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) {
                isInstanceType = SymbolFlagsType$constant__from_ast();
            }
            else {
                isInstanceType = SymbolFlagsValue$constant__from_ast();
            }
            if (!forceExpansion && (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && !forceClassExpansion && Checker.$go$private$checker$getBaseTypeVariableOfClass((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol) === undefined && !(!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsClassLike__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteClassExpressionAsTypeLiteral$constant__from_nodebuilder()) >>> 0 === 0) && (!IsClassDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) || !(Checker.IsSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, isInstanceType, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer()))) || !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (896)) >>> 0 === 0) || NodeBuilderImpl.$go$private$checker$shouldWriteTypeOfFunctionSymbol(b, __go_symbol, typeId))) {
                if (NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, false)) {
                    const __gotots_store_41 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_41.depth = __gotots_store_41.depth + 1;
                }
                else {
                    return NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, __go_symbol, isInstanceType, void 0);
                }
            }
            const __gotots_store_42 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (Set__from_collections.Has<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "visitedTypes"), typeId)) {
                let typeAlias: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = getTypeAliasForTypeLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
                if (!(typeAlias === undefined)) {
                    return NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, typeAlias, SymbolFlagsType$constant__from_ast(), void 0);
                }
                else {
                    return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
                }
            }
            else {
                return NodeBuilderImpl.$go$private$checker$visitAndTransformType(b, t, ($argument0: {
                    value: NodeBuilderImpl;
                } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return NodeBuilderImpl.$go$private$checker$createTypeNodeFromObjectType($argument0, $argument1);
                });
            }
        }
        else {
            return NodeBuilderImpl.$go$private$checker$createTypeNodeFromObjectType(b, t);
        }
    }
    static $go$private$checker$createElidedInformationPlaceholder(b: {
        value: NodeBuilderImpl;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_73 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_73.approximateLength = __gotots_store_73.approximateLength + 3;
        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0) {
            return NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, "..."), void 0);
        }
        return EmitContext__from_printer.AddSyntheticLeadingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast()), KindMultiLineCommentTrivia$constant__from_ast(), "elided", false);
    }
    static $go$private$checker$createEntityNameFromSymbolChain(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
        if (index === 0) {
            const __gotots_store_63 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_63.flags = (__gotots_store_63.flags | 16777216) >>> 0;
        }
        let symbolName = NodeBuilderImpl.$go$private$checker$getNameOfSymbolAsWritten(b, __go_symbol);
        if (index === 0) {
            const __gotots_store_64 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_64.flags = (__gotots_store_64.flags ^ 16777216) >>> 0;
        }
        let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$newIdentifier(b, symbolName, __go_symbol);
        EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, identifier, EFNoAsciiEscaping$constant__from_printer());
        if (index > 0) {
            return NodeFactory__from_ast.NewQualifiedName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$createEntityNameFromSymbolChain(b, chain, index - 1), identifier);
        }
        return identifier;
    }
    static $go$private$checker$createExpressionFromSymbolChain(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeParameterNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$lookupExpressionChainTypeArgumentNodes(b, chain, index);
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
        if (index === 0) {
            const __gotots_store_79 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_79.flags = (__gotots_store_79.flags | 16777216) >>> 0;
        }
        let symbolName = NodeBuilderImpl.$go$private$checker$getNameOfSymbolAsWritten(b, __go_symbol);
        if (index === 0) {
            const __gotots_store_80 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_80.flags = (__gotots_store_80.flags ^ 16777216) >>> 0;
        }
        if (startsWithSingleOrDoubleQuote(symbolName) && Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
            let specifier = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, __go_symbol, ResolutionModeNone$constant__from_core());
            const __gotots_store_81 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_81.approximateLength = __gotots_store_81.approximateLength + (2 + specifier.length);
            return NodeBuilderImpl.$go$private$checker$newStringLiteral(b, specifier);
        }
        if (index === 0 || canUsePropertyAccess(symbolName)) {
            let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$newIdentifier(b, symbolName, __go_symbol);
            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, identifier, EFNoAsciiEscaping$constant__from_printer());
            const __gotots_store_82 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_82.approximateLength = __gotots_store_82.approximateLength + (1 + symbolName.length);
            if (index > 0) {
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$createExpressionFromSymbolChain(b, chain, index - 1), void 0, identifier, NodeFlagsNone$constant__from_ast());
                EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result, EFNoIndentation$constant__from_printer());
                return NodeBuilderImpl.$go$private$checker$createExpressionWithTypeArguments(b, result, typeParameterNodes);
            }
            return NodeBuilderImpl.$go$private$checker$createExpressionWithTypeArguments(b, identifier, typeParameterNodes);
        }
        if (startsWithSquareBracket(symbolName)) {
            symbolName = goStringSlice(symbolName, 1, symbolName.length - 1);
        }
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (startsWithSingleOrDoubleQuote(symbolName) && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0) {
            let literalText = UnquoteString__from_stringutil(symbolName);
            const __gotots_store_83 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_83.approximateLength = __gotots_store_83.approximateLength + (literalText.length + 2);
            expression = NodeBuilderImpl.$go$private$checker$newStringLiteralEx(b, literalText, goStringIndex(symbolName, 0) === 39);
        }
        else if (FromString__from_jsnum(symbolName).String() === symbolName) {
            const __gotots_store_84 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_84.approximateLength = __gotots_store_84.approximateLength + symbolName.length;
            expression = NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, symbolName, TokenFlagsNone$constant__from_ast());
        }
        if (expression === undefined) {
            const __gotots_store_85 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_85.approximateLength = __gotots_store_85.approximateLength + symbolName.length;
            expression = NodeBuilderImpl.$go$private$checker$newIdentifier(b, symbolName, __go_symbol);
            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, expression, EFNoAsciiEscaping$constant__from_printer());
        }
        const __gotots_store_86 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_86.approximateLength = __gotots_store_86.approximateLength + 2;
        return NodeBuilderImpl.$go$private$checker$createExpressionWithTypeArguments(b, NodeFactory__from_ast.NewElementAccessExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$createExpressionFromSymbolChain(b, chain, index - 1), void 0, expression, NodeFlagsNone$constant__from_ast()), typeParameterNodes);
    }
    static $go$private$checker$createExpressionWithTypeArguments(b: {
        value: NodeBuilderImpl;
    } | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (typeArguments === undefined || NodeList__from_ast.$storageOf(((typeArguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return expr;
        }
        return NodeFactory__from_ast.NewExpressionWithTypeArguments((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, expr, typeArguments);
    }
    static $go$private$checker$createMappedTypeNodeFromType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        Assert__from_debug(!((Type.Flags(t) & TypeFlagsObject$constant()) >>> 0 === 0), RuntimeSlice.nil<GoInterface | undefined>());
        let mapped: {
            value: MappedType;
        } | undefined = Type.AsMappedType(t);
        let readonlyToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken === undefined)) {
            readonlyToken = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.$storageOf(((((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
        }
        let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken === undefined)) {
            questionToken = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Node__from_ast.$storageOf(((((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
        }
        let appropriateConstraintTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let newTypeVariable: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let templateType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTemplateTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
        let typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeParameterFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
        let needsModifierPreservingWrapper = !Checker.$go$private$checker$isMappedTypeWithKeyofConstraintDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t) && (((Checker.$go$private$checker$getModifiersTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnknown$constant()) >>> 0 === 0 && !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && !(!((((Checker.$go$private$checker$getConstraintTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && !((((Checker.$go$private$checker$getConstraintOfTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getConstraintTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0));
        if (Checker.$go$private$checker$isMappedTypeWithKeyofConstraintDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) {
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && NodeBuilderImpl.$go$private$checker$isHomomorphicMappedTypeWithNonHomomorphicInstantiation(b, mapped)) {
                let newConstraintParam: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$newTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$newSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SymbolFlagsTypeParameter$constant__from_ast(), "T"));
                let name: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToName(b, newConstraintParam);
                let target: tsonicTypeScriptRuntime.Location<Type> | undefined = Type.Target(t);
                const __gotots_receiver_21: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                const __gotots_store_93 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                            Identifier__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_51 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_93, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_52 = void 0;
                newTypeVariable = NodeFactory__from_ast.NewTypeReferenceNode(__gotots_receiver_21, __gotots_argument_51, __gotots_argument_52);
                templateType = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTemplateTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, target), newTypeMapper(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([Checker.$go$private$checker$getTypeParameterFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, target), Checker.$go$private$checker$getModifiersTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, target)]), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([typeParameter, newConstraintParam])));
            }
            let indexTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = newTypeVariable;
            if (indexTarget === undefined) {
                indexTarget = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getModifiersTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t));
            }
            appropriateConstraintTypeNode = NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindKeyOfKeyword$constant__from_ast(), indexTarget);
        }
        else if (needsModifierPreservingWrapper) {
            let newParam: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$newTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$newSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, SymbolFlagsTypeParameter$constant__from_ast(), "T"));
            let name: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToName(b, newParam);
            const __gotots_receiver_22: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_store_94 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                        Identifier__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_53 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_54 = void 0;
            newTypeVariable = NodeFactory__from_ast.NewTypeReferenceNode(__gotots_receiver_22, __gotots_argument_53, __gotots_argument_54);
            appropriateConstraintTypeNode = newTypeVariable;
        }
        else {
            appropriateConstraintTypeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getConstraintTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t));
        }
        const __gotots_receiver_23 = b;
        const __gotots_store_95 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf(((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
        const __gotots_argument_55 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_95, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_56 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
        const __gotots_argument_57 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type> | undefined>([Checker.$go$private$checker$getTypeParameterFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)]);
        const __gotots_argument_58 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
        const __gotots_argument_59 = void 0;
        let cleanup: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$enterNewScope(__gotots_receiver_23, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59);
        let typeParameterDeclarationNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToDeclarationWithConstraint(b, typeParameter, appropriateConstraintTypeNode);
        let nameTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType === undefined)) {
            nameTypeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getNameTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t));
        }
        let templateTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$removeMissingType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, templateType, !((getMappedTypeModifiers(t) & MappedTypeModifiersIncludeOptional$constant()) >>> 0 === 0)));
        const __gotots_callee_12 = cleanup;
        (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))();
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewMappedTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, readonlyToken, typeParameterDeclarationNode, nameTypeNode, questionToken, templateTypeNode, void 0);
        const __gotots_store_96 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_96.approximateLength = __gotots_store_96.approximateLength + 10;
        EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result, EFSingleLine$constant__from_printer());
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && NodeBuilderImpl.$go$private$checker$isHomomorphicMappedTypeWithNonHomomorphicInstantiation(b, mapped)) {
            let rawConstraintTypeFromDeclaration: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, Node__from_ast.Type(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint), false);
            if (!(rawConstraintTypeFromDeclaration === undefined)) {
                rawConstraintTypeFromDeclaration = Checker.$go$private$checker$getConstraintOfTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, rawConstraintTypeFromDeclaration);
            }
            if (rawConstraintTypeFromDeclaration === undefined) {
                rawConstraintTypeFromDeclaration = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownType;
            }
            let originalConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, rawConstraintTypeFromDeclaration, (mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectType.mapper);
            let originalConstraintNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if ((((originalConstraint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnknown$constant()) >>> 0 === 0) {
                originalConstraintNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, originalConstraint);
            }
            return NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getModifiersTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)), NodeFactory__from_ast.NewInferTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, Node__from_ast.Clone(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(newTypeVariable) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f)), originalConstraintNode, void 0, void 0)), result, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast()));
        }
        else if (needsModifierPreservingWrapper) {
            return NodeFactory__from_ast.NewConditionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getConstraintTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)), NodeFactory__from_ast.NewInferTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, Node__from_ast.Clone(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(newTypeVariable) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f)), NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindKeyOfKeyword$constant__from_ast(), NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getModifiersTypeFromMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t))), void 0, void 0)), result, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast()));
        }
        return result;
    }
    static $go$private$checker$createPropertyNameNodeForIdentifierOrLiteral(b: {
        value: NodeBuilderImpl;
    } | undefined, name: gostring, singleQuote: bool, stringNamed: bool, isMethod: bool, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (classifyPropertyName(name, stringNamed, isMethod).$value) {
            case 0: {
                return NodeBuilderImpl.$go$private$checker$newIdentifier(b, name, __go_symbol);
                break;
            }
            case 1: {
                return NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name, TokenFlagsNone$constant__from_ast());
                break;
            }
            default: {
                return NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name, IfElse$Named_ast$TokenFlags(singleQuote, TokenFlagsSingleQuote$constant__from_ast(), TokenFlagsNone$constant__from_ast()));
                break;
            }
        }
    }
    static $go$private$checker$createRecoveryBoundary(b: {
        value: NodeBuilderImpl;
    } | undefined): {
        value: recoveryBoundary;
    } | undefined {
        Checker.$go$private$checker$checkNotCanceled((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch);
        let bound: {
            value: recoveryBoundary;
        } | undefined = { value: new recoveryBoundary((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx, false, RuntimeSlice.nil<(() => void) | undefined>(), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols, RuntimeSlice.nil<{
                value: TrackedSymbolArgs;
            } | undefined>(), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.approximateLength) };
        let newTracker: {
            value: SymbolTrackerImpl;
        } | undefined = NewSymbolTrackerImpl((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx, new $goInterfaceAdapter$PointerTo_Named_checker$wrappingTracker(newWrappingTracker(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker, bound)));
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker = new $goInterfaceAdapter$PointerTo_Named_checker$SymbolTrackerImpl(newTracker);
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = RuntimeSlice.nil<{
            value: TrackedSymbolArgs;
        } | undefined>();
        return bound;
    }
    static $go$private$checker$createTypeNodeFromObjectType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (Checker.$go$private$checker$isGenericMappedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t) || (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsMapped$constant()) >>> 0 === 0) && (Type.AsMappedType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.containsError)) {
            return NodeBuilderImpl.$go$private$checker$createMappedTypeNodeFromType(b, t);
        }
        let resolved: tsonicTypeScriptRuntime.Location<StructuredType> | undefined = Checker.$go$private$checker$resolveStructuredTypeMembers((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
        let callSigs = StructuredType.CallSignatures(resolved);
        let ctorSigs = StructuredType.ConstructSignatures(resolved);
        if (((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties.length === 0 && ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.indexInfos.length === 0) {
            if (callSigs.length === 0 && ctorSigs.length === 0) {
                const __gotots_store_74 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_store_74.approximateLength = __gotots_store_74.approximateLength + 2;
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeLiteralNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])));
                EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result, EFSingleLine$constant__from_printer());
                return result;
            }
            if (callSigs.length === 1 && ctorSigs.length === 0) {
                let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = callSigs.get(0);
                let signatureNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, signature, KindFunctionType$constant__from_ast(), void 0);
                return signatureNode;
            }
            if (ctorSigs.length === 1 && callSigs.length === 0) {
                let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = ctorSigs.get(0);
                let signatureNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, signature, KindConstructorType$constant__from_ast(), void 0);
                return signatureNode;
            }
        }
        let abstractSignatures = Filter$PointerTo_Named_checker$Signature(ctorSigs, (signature: tsonicTypeScriptRuntime.Location<Signature> | undefined): bool => {
            return !((Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0);
        });
        if (abstractSignatures.length > 0) {
            let types = Map$PointerTo_Named_checker$Signature$PointerTo_Named_checker$Type(abstractSignatures, (s: tsonicTypeScriptRuntime.Location<Signature> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                return Checker.$go$private$checker$getOrCreateTypeFromSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, s);
            });
            let typeElementCount = callSigs.length + (ctorSigs.length - abstractSignatures.length) + ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.indexInfos.length + IfElse$int(!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteClassExpressionAsTypeLiteral$constant__from_nodebuilder()) >>> 0 === 0), CountWhere$PointerTo_Named_ast$Symbol(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                return (Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0;
            }), ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties.length);
            if (typeElementCount !== 0) {
                types = types.append(void 0, [NodeBuilderImpl.$go$private$checker$getResolvedTypeWithoutAbstractConstructSignatures(b, resolved)]);
            }
            return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getIntersectionType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, types));
        }
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        const __gotots_store_75 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_75.flags = (__gotots_store_75.flags | 4194304) >>> 0;
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createTypeNodesFromResolvedType(b, resolved);
        const __gotots_callee_10 = restoreFlags;
        (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))();
        let typeLiteralNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeLiteralNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, members);
        const __gotots_store_76 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_76.approximateLength = __gotots_store_76.approximateLength + 2;
        EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, typeLiteralNode, IfElse$Named_printer$EmitFlags((!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsMultilineObjectLiterals$constant__from_nodebuilder()) >>> 0 === 0)), 0, EFSingleLine$constant__from_printer()));
        return typeLiteralNode;
    }
    static $go$private$checker$createTypeNodesFromResolvedType(b: {
        value: NodeBuilderImpl;
    } | undefined, resolvedType: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (NodeBuilderImpl.$go$private$checker$checkTruncationLength(b)) {
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNotEmittedTypeElement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f);
                return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([EmitContext__from_printer.AddSyntheticTrailingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, elem, KindMultiLineCommentTrivia$constant__from_ast(), "elided", false)]));
            }
            return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, "..."), void 0, void 0, void 0)]));
        }
        let typeElements = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_16 = StructuredType.CallSignatures(resolvedType);
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_16.length; __gotots_range_index_14++) {
            const __gotots_range_value_20 = __gotots_range_16.get(__gotots_range_index_14);
            let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_20;
            typeElements = typeElements.append(void 0, [NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, signature, KindCallSignature$constant__from_ast(), void 0)]);
        }
        const __gotots_range_17 = StructuredType.ConstructSignatures(resolvedType);
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_17.length; __gotots_range_index_15++) {
            const __gotots_range_value_21 = __gotots_range_17.get(__gotots_range_index_15);
            let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_21;
            if (!((Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0)) {
                continue;
            }
            typeElements = typeElements.append(void 0, [NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, signature, KindConstructSignature$constant__from_ast(), void 0)]);
        }
        const __gotots_range_18 = ((resolvedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.indexInfos;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_18.length; __gotots_range_index_16++) {
            const __gotots_range_value_22 = __gotots_range_18.get(__gotots_range_index_16);
            let info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_22;
            typeElements = Concat$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>([typeElements, NodeBuilderImpl.$go$private$checker$indexInfoToObjectComputedNamesOrSignatureDeclaration(b, info, IfElse$PointerTo_Named_ast$Node(!((((resolvedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.ConstrainedType.TypeBase.Type.objectFlags & ObjectFlagsReverseMapped$constant()) >>> 0 === 0), NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b), void 0))]));
        }
        let properties = ((resolvedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties;
        if (properties.length === 0) {
            return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeElements);
        }
        let i = 0;
        const __gotots_range_19 = properties;
        for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_19.length; __gotots_range_index_17++) {
            const __gotots_range_value_23 = __gotots_range_19.get(__gotots_range_index_17);
            let propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_23;
            if (isExpanding((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx) && !((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0)) {
                continue;
            }
            i++;
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteClassExpressionAsTypeLiteral$constant__from_nodebuilder()) >>> 0 === 0)) {
                if (!((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0)) {
                    continue;
                }
                if (!((getDeclarationModifierFlagsFromSymbol(propertySymbol) & (6)) >>> 0 === 0)) {
                    const __gotots_receiver_25: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_63 = Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_25).ReportPrivateInBaseOfClassExpression(__gotots_argument_63);
                }
                if (IsPrivateIdentifierSymbol(propertySymbol)) {
                    const __gotots_receiver_26: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_64 = SymbolName__from_ast(propertySymbol);
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_26).ReportPrivateInBaseOfClassExpression(__gotots_argument_64);
                }
            }
            if (NodeBuilderImpl.$go$private$checker$checkTruncationLength(b) && (i + 2 < properties.length - 1)) {
                if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
                    typeElements.set(typeElements.length - 1, EmitContext__from_printer.AddSyntheticTrailingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, typeElements.get(typeElements.length - 1), KindMultiLineCommentTrivia$constant__from_ast(), fmt__from_gostdlib.Sprintf("... %d more elided ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(properties.length - i)])), false));
                }
                else {
                    let text = fmt__from_gostdlib.Sprintf("... %d more ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(properties.length - i)]));
                    typeElements = typeElements.append(void 0, [NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text), void 0, void 0, void 0)]);
                }
                typeElements = NodeBuilderImpl.$go$private$checker$addPropertyToElementList(b, properties.get(properties.length - 1), typeElements);
                break;
            }
            typeElements = NodeBuilderImpl.$go$private$checker$addPropertyToElementList(b, propertySymbol, typeElements);
        }
        if (typeElements.length !== 0) {
            return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeElements);
        }
        else {
            return void 0;
        }
    }
    static $go$private$checker$enterNewScope(b: {
        value: NodeBuilderImpl;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expandedParams: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, typeParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, originalParameters: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, mapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined): (() => void) | undefined {
        let cleanupContext: (() => void) | undefined = cloneNodeBuilderContext((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx);
        let cleanupParams: (() => void) | undefined;
        let cleanupTypeParams: (() => void) | undefined;
        let oldEnclosingDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        let oldMapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper;
        if (!(mapper === undefined)) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper = mapper;
        }
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) && !(declaration === undefined)) {
            let pushFakeScope: (($0: gostring, $1: (($0: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined) => void) | undefined) => (() => void) | undefined) | undefined = (kind: gostring, addAll: (($0: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined) => void) | undefined): (() => void) | undefined => {
                const kind$location = tsonicTypeScriptRuntime.boundLocation({}, () => kind, kind$next => kind = kind$next);
                Assert__from_debug(!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined), RuntimeSlice.nil<GoInterface | undefined>());
                let existingFakeScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                const __gotots_store_107 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "links"), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration)) {
                    const __gotots_store_108 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let links: tsonicTypeScriptRuntime.Location<NodeBuilderLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_108, "links"), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
                    if (!(NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration === undefined) && ((NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                        === kind) {
                        existingFakeScope = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
                    }
                }
                if (existingFakeScope === undefined && !(Node__from_ast.$storageOf(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
                    const __gotots_store_109 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "links"), Node__from_ast.$storageOf(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        const __gotots_store_110 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        let links: tsonicTypeScriptRuntime.Location<NodeBuilderLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_110, "links"), Node__from_ast.$storageOf(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        if (!(NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration === undefined) && ((NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                            === kind) {
                            existingFakeScope = Node__from_ast.$storageOf(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                        }
                    }
                }
                Assert__from_debug(existingFakeScope === undefined || IsBlock__from_ast(existingFakeScope), RuntimeSlice.nil<GoInterface | undefined>());
                let locals: SymbolTable__from_ast = new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.nil());
                if (!(existingFakeScope === undefined)) {
                    locals = Node__from_ast.Locals(existingFakeScope);
                }
                if (locals.$value.isNil()) {
                    locals = new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, []));
                }
                let newLocals = RuntimeSlice.literal<gostring>([]);
                let oldLocals = RuntimeSlice.literal<localsRecord__from_checker$Storage>([]);
                const __gotots_callee_18 = addAll;
                const __gotots_argument_89 = (name: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void => {
                    if (!(existingFakeScope === undefined)) {
                        const __gotots_results_9 = locals.$value.lookupOk(name);
                        let oldSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_9[0];
                        let ok = __gotots_results_9[1];
                        if (!ok || oldSymbol === undefined) {
                            newLocals = newLocals.append("", [name]);
                        }
                        else {
                            const __gotots_slice_build_0 = oldLocals;
                            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                            let __gotots_slice_build_1 = __gotots_slice_build_0;
                            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void localsRecord.$storageOf, (void localsRecord.$fromStorage,
                                    {
                                        name: name,
                                        oldSymbol: oldSymbol
                                    })));
                            }
                            else {
                                __gotots_slice_build_1 = goSliceAllocate<localsRecord__from_checker$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.set(__gotots_slice_build_3, localsRecord.$storageOf(localsRecord.$copy(localsRecord.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                                }
                                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void localsRecord.$storageOf, (void localsRecord.$fromStorage,
                                    {
                                        name: name,
                                        oldSymbol: oldSymbol
                                    })));
                                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, localsRecord.$zeroStorage());
                                }
                            }
                            oldLocals = __gotots_slice_build_1;
                        }
                    }
                    locals.$value.store(name, __go_symbol);
                };
                (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_89);
                if (existingFakeScope === undefined) {
                    let fakeScope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])), false);
                    const __gotots_store_111 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    NodeBuilderLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "links"), fakeScope) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration =
                        kind$location;
                    let data: tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast> | undefined = Node__from_ast.LocalsContainerData(fakeScope);
                    LocalsContainerBase__from_ast.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast>).value).Locals = locals.$value;
                    Node__from_ast.$storageOf(((fakeScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = fakeScope;
                    return void 0;
                }
                else {
                    let undo: (() => void) | undefined = (): void => {
                        const __gotots_range_23 = newLocals;
                        for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_23.length; __gotots_range_index_21++) {
                            const __gotots_range_value_27 = __gotots_range_23.get(__gotots_range_index_21);
                            let s = __gotots_range_value_27;
                            locals.$value.delete(s);
                        }
                        const __gotots_range_24 = oldLocals;
                        for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_24.length; __gotots_range_index_22++) {
                            const __gotots_range_value_28 = localsRecord.$copy(localsRecord.$fromStorage(__gotots_range_24.get(__gotots_range_index_22)));
                            let s = __gotots_range_value_28;
                            locals.$value.store(localsRecord.$storageOf(s).name, localsRecord.$storageOf(s).oldSymbol);
                        }
                    };
                    return undo;
                }
            };
            if (expandedParams.isNil() || !Some$PointerTo_Named_ast$Symbol(expandedParams, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                return !(p === undefined);
            })) {
                cleanupParams = void 0;
            }
            else {
                const __gotots_callee_26 = pushFakeScope;
                const __gotots_argument_103 = "params";
                const __gotots_argument_104 = (add: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined): void => {
                    if (expandedParams.isNil()) {
                        return;
                    }
                    const __gotots_range_25 = expandedParams;
                    for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_25.length; __gotots_range_index_23++) {
                        const __gotots_range_value_29 = __gotots_range_index_23;
                        const __gotots_range_value_30 = __gotots_range_25.get(__gotots_range_index_23);
                        let pIndex = __gotots_range_value_29;
                        let param: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_30;
                        let originalParam: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
                        if (pIndex < originalParameters.length) {
                            originalParam = originalParameters.get(pIndex);
                        }
                        if (!originalParameters.isNil() && !tsonicTypeScriptRuntime.sameLocation(originalParam, param)) {
                            const __gotots_callee_19 = add;
                            const __gotots_argument_90 = Symbol__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                            const __gotots_argument_91: Checker["unknownSymbol"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownSymbol;
                            (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_90, __gotots_argument_91);
                            if (!(originalParam === undefined)) {
                                const __gotots_callee_20 = add;
                                const __gotots_argument_92 = Symbol__from_ast.$storageOf(((originalParam ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                                const __gotots_argument_93: Checker["unknownSymbol"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unknownSymbol;
                                (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_92, __gotots_argument_93);
                            }
                        }
                        else if (!Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                            let bindElement: (($0: {
                                value: BindingElement__from_ast;
                            } | undefined) => void) | undefined;
                            let bindPattern: (($0: {
                                value: BindingPattern__from_ast;
                            } | undefined) => void) | undefined;
                            let bindPatternWorker: (($0: {
                                value: BindingPattern__from_ast;
                            } | undefined) => void) | undefined = (p: {
                                value: BindingPattern__from_ast;
                            } | undefined): void => {
                                const __gotots_range_26 = NodeList__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                                for (let __gotots_range_index_24 = 0; __gotots_range_index_24 < __gotots_range_26.length; __gotots_range_index_24++) {
                                    const __gotots_range_value_31 = __gotots_range_26.get(__gotots_range_index_24);
                                    let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_31;
                                    switch (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                                        case KindOmittedExpression$constant__from_ast(): {
                                            return;
                                            break;
                                        }
                                        case KindBindingElement$constant__from_ast(): {
                                            const __gotots_callee_21 = bindElement;
                                            const __gotots_argument_94 = Node__from_ast.AsBindingElement(e);
                                            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_94);
                                            return;
                                            break;
                                        }
                                        default: {
                                            const __gotots_argument_95 = new GoInterfaceAdapter("Unhandled binding element kind");
                                            GoPanic.raise(__gotots_argument_95 === undefined ? GoPanicNilValue.create() : __gotots_argument_95);
                                            break;
                                        }
                                    }
                                }
                            };
                            let bindElementWorker: (($0: {
                                value: BindingElement__from_ast;
                            } | undefined) => void) | undefined = (e: {
                                value: BindingElement__from_ast;
                            } | undefined): void => {
                                if (!(BindingElement__from_ast.Name(e) === undefined) && IsBindingPattern__from_ast(BindingElement__from_ast.Name(e))) {
                                    const __gotots_callee_22 = bindPattern;
                                    const __gotots_argument_96 = Node__from_ast.AsBindingPattern(BindingElement__from_ast.Name(e));
                                    (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_96);
                                    return;
                                }
                                const __gotots_receiver_32: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                                const __gotots_store_112 = NodeBase__from_ast.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                                const __gotots_argument_97 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_112, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration(__gotots_receiver_32, __gotots_argument_97);
                                if (!(__go_symbol === undefined)) {
                                    const __gotots_callee_23 = add;
                                    const __gotots_argument_98 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                                    const __gotots_argument_99 = __go_symbol;
                                    (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_98, __gotots_argument_99);
                                }
                            };
                            bindElement = bindElementWorker;
                            bindPattern = bindPatternWorker;
                            if (IsParameterDeclaration__from_ast(d) && !(Node__from_ast.Name(d) === undefined) && IsBindingPattern__from_ast(Node__from_ast.Name(d))) {
                                const __gotots_callee_24 = bindPattern;
                                const __gotots_argument_100 = Node__from_ast.AsBindingPattern(Node__from_ast.Name(d));
                                (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_100);
                                return true;
                            }
                            return false;
                        })) {
                            const __gotots_callee_25 = add;
                            const __gotots_argument_101 = Symbol__from_ast.$storageOf(((param ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                            const __gotots_argument_102 = param;
                            (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_101, __gotots_argument_102);
                        }
                    }
                };
                cleanupParams = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_103, __gotots_argument_104);
            }
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && !typeParameters.isNil() && Some$PointerTo_Named_checker$Type(typeParameters, (p: tsonicTypeScriptRuntime.Location<Type> | undefined): bool => {
                return !(p === undefined);
            })) {
                const __gotots_callee_28 = pushFakeScope;
                const __gotots_argument_107 = "typeParams";
                const __gotots_argument_108 = (add: (($0: gostring, $1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => void) | undefined): void => {
                    if (typeParameters.isNil()) {
                        return;
                    }
                    const __gotots_range_27 = typeParameters;
                    for (let __gotots_range_index_25 = 0; __gotots_range_index_25 < __gotots_range_27.length; __gotots_range_index_25++) {
                        const __gotots_range_value_32 = __gotots_range_27.get(__gotots_range_index_25);
                        let typeParam: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_32;
                        if (typeParam === undefined) {
                            continue;
                        }
                        let typeParamName = Identifier__from_ast.$storageOf(((NodeBuilderImpl.$go$private$checker$typeParameterToName(b, typeParam) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text;
                        const __gotots_callee_27 = add;
                        const __gotots_argument_105 = typeParamName;
                        const __gotots_argument_106 = ((typeParam ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol;
                        (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_105, __gotots_argument_106);
                    }
                };
                cleanupTypeParams = (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_107, __gotots_argument_108);
            }
        }
        return (): void => {
            if (!(cleanupParams === undefined)) {
                const __gotots_callee_29 = cleanupParams;
                (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
            if (!(cleanupTypeParams === undefined)) {
                const __gotots_callee_30 = cleanupTypeParams;
                (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
            const __gotots_callee_31 = cleanupContext;
            (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))();
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = oldEnclosingDecl;
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper = oldMapper;
        };
    }
    static $go$private$checker$enterSignatureScope(b: {
        value: NodeBuilderImpl;
    } | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>,
        (() => void) | undefined
    ] {
        let expandedParams: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
        let cleanup: (() => void) | undefined = void 0;
        expandedParams = Checker.$go$private$checker$getExpandedParameters((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature, true).get(0);
        cleanup = NodeBuilderImpl.$go$private$checker$enterNewScope(b, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration, expandedParams, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).mapper);
        return [expandedParams, cleanup];
    }
    static $go$private$checker$enumMemberInitializer(b: {
        value: NodeBuilderImpl;
    } | undefined, p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let memberDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsEnumMember__from_ast);
        if (memberDecl === undefined) {
            return void 0;
        }
        let val: GoInterface | undefined = Checker.GetConstantValue((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, memberDecl);
        if (val === undefined) {
            return void 0;
        }
        const __gotots_type_switch_2: GoInterface | undefined = val;
        switch (true) {
            case GoInterfaceAdapter.$is(__gotots_type_switch_2): {
                let v: gostring = __gotots_type_switch_2.$go$value;
                return NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, v, 0);
                break;
            }
            case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_2): {
                let v: Number__from_jsnum = __gotots_type_switch_2.$go$value;
                return NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, v.String(), 0);
                break;
            }
        }
        return void 0;
    }
    static $go$private$checker$existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(b: {
        value: NodeBuilderImpl;
    } | undefined, existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) {
            return true;
        }
        if (!IsTypeReferenceNode__from_ast(existing)) {
            return true;
        }
        Checker.$go$private$checker$getTypeFromTypeReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, existing);
        const __gotots_store_91 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let links: tsonicTypeScriptRuntime.Location<SymbolNodeLinks> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, SymbolNodeLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_91, "symbolNodeLinks"), existing);
        if (links === undefined) {
            return true;
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SymbolNodeLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SymbolNodeLinks>).value).resolvedSymbol;
        if (__go_symbol === undefined) {
            return true;
        }
        let existingTarget: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        if (existingTarget === undefined || !tsonicTypeScriptRuntime.sameLocation(existingTarget, ((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target)) {
            return true;
        }
        return Node__from_ast.TypeArguments(existing).length >= Checker.$go$private$checker$getMinTypeArgumentCount((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, InterfaceType.TypeParameters(Type.AsInterfaceType(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.ObjectType.target)));
    }
    static $go$private$checker$expandClassDecl(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    let name = SymbolName__from_ast(__go_symbol);
                    const __gotots_store_138 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_138.approximateLength = __gotots_store_138.approximateLength + (9 + name.length);
                    let classLikeDeclarations = Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsClassLike__from_ast);
                    let originalDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(classLikeDeclarations);
                    let oldEnclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
                    if (!(originalDecl === undefined)) {
                        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = originalDecl;
                    }
                    const __gotots_callee_41 = (): void => {
                        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = oldEnclosing;
                    };
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_41();
                    };
                    let localParams = Checker.$go$private$checker$getLocalTypeParametersOfClassOrInterfaceOrTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
                    let typeParamDecls = Map$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node(localParams, (p: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                        return NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, p);
                    });
                    let declaredType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfClassOrInterface((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
                    let classType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeWithThisArgument((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, declaredType, void 0, false);
                    let baseTypes = Checker.$go$private$checker$getBaseTypes((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTargetType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, classType));
                    let staticType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
                    let isClass = !(((staticType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !(Symbol__from_ast.$storageOf(((((staticType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsClassLike__from_ast(Symbol__from_ast.$storageOf(((((staticType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                    let staticBaseType: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
                    if (isClass) {
                        staticBaseType = Checker.$go$private$checker$getBaseConstructorTypeOfClass((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, declaredType);
                    }
                    else {
                        staticBaseType = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType;
                    }
                    let heritageClauses = NodeBuilderImpl.$go$private$checker$hoverHeritageClauses(b, classLikeDeclarations);
                    let allProps = Checker.$go$private$checker$getPropertiesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, classType);
                    let symbolProps = NodeBuilderImpl.$go$private$checker$filterInheritedProperties(b, classType, baseTypes, allProps);
                    let publicProps = Filter$PointerTo_Named_ast$Symbol(symbolProps, (s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                        return !isHashPrivate(s);
                    });
                    let hasPrivate = Some$PointerTo_Named_ast$Symbol(symbolProps, isHashPrivate);
                    let instanceMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    instanceMembers = NodeBuilderImpl.$go$private$checker$serializePropertiesWithTruncation(b, publicProps, instanceMembers);
                    instanceMembers = typeElementsToClassElements((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, instanceMembers);
                    instanceMembers = NodeBuilderImpl.$go$private$checker$addClassModifiers(b, instanceMembers, false);
                    let staticProps = Filter$PointerTo_Named_ast$Symbol(Checker.$go$private$checker$getPropertiesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, staticType), (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
                        return (Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0 && Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== "prototype" && !NodeBuilderImpl.$go$private$checker$isNamespaceMember(b, p);
                    });
                    let staticMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    staticMembers = NodeBuilderImpl.$go$private$checker$serializePropertiesWithTruncation(b, staticProps, staticMembers);
                    staticMembers = typeElementsToClassElements((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, staticMembers);
                    staticMembers = NodeBuilderImpl.$go$private$checker$addClassModifiers(b, staticMembers, true);
                    let privateMembers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    if (hasPrivate) {
                        privateMembers = NodeBuilderImpl.$go$private$checker$serializePropertiesWithTruncation(b, Filter$PointerTo_Named_ast$Symbol(symbolProps, isHashPrivate), privateMembers);
                        privateMembers = typeElementsToClassElements((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, privateMembers);
                    }
                    let constructors = NodeBuilderImpl.$go$private$checker$serializeConstructors(b, staticType, staticBaseType, isClass, __go_symbol);
                    let indexSigs = NodeBuilderImpl.$go$private$checker$serializeIndexSignaturesOfType(b, classType, FirstOrNil$PointerTo_Named_checker$Type(baseTypes));
                    let allMembers = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, indexSigs.length + staticMembers.length + constructors.length + instanceMembers.length + privateMembers.length, void 0);
                    allMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allMembers, indexSigs, void 0);
                    allMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allMembers, staticMembers, void 0);
                    allMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allMembers, constructors, void 0);
                    allMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allMembers, instanceMembers, void 0);
                    allMembers = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(allMembers, privateMembers, void 0);
                    __gotots_return_1 = NodeFactory__from_ast.NewClassDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamDecls), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, heritageClauses), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, allMembers));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static $go$private$checker$expandEnumDecl(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name = SymbolName__from_ast(__go_symbol);
        const __gotots_store_135 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_135.approximateLength = __gotots_store_135.approximateLength + (9 + name.length);
        let memberProps = Filter$PointerTo_Named_ast$Symbol(Checker.$go$private$checker$getPropertiesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol)), (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0);
        });
        let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_47 = memberProps;
        for (let __gotots_range_index_45 = 0; __gotots_range_index_45 < __gotots_range_47.length; __gotots_range_index_45++) {
            const __gotots_range_value_54 = __gotots_range_index_45;
            const __gotots_range_value_55 = __gotots_range_47.get(__gotots_range_index_45);
            let i = __gotots_range_value_54;
            let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_55;
            if (NodeBuilderImpl.$go$private$checker$checkTruncationLengthIfExpanding(b) && i + 3 < memberProps.length - 1) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expansionTruncated = true;
                members = members.append(void 0, [NodeFactory__from_ast.NewEnumMember((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, fmt__from_gostdlib.Sprintf(" ... %d more ... ", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(memberProps.length - i - 1)])), 0), void 0)]);
                let last: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = memberProps.get(memberProps.length - 1);
                members = members.append(void 0, [NodeFactory__from_ast.NewEnumMember((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), NodeBuilderImpl.$go$private$checker$enumMemberInitializer(b, last))]);
                break;
            }
            let memberDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsEnumMember__from_ast);
            let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!(memberDecl === undefined) && !((Node__from_ast.AsEnumMember(memberDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer === undefined)) {
                initializer = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (Node__from_ast.AsEnumMember(memberDecl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
            }
            else {
                initializer = NodeBuilderImpl.$go$private$checker$enumMemberInitializer(b, p);
            }
            const __gotots_store_136 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_136.approximateLength = __gotots_store_136.approximateLength + (4 + Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name.length);
            if (!(initializer === undefined)) {
                const __gotots_store_137 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_store_137.approximateLength = __gotots_store_137.approximateLength + 5;
            }
            members = members.append(void 0, [NodeFactory__from_ast.NewEnumMember((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), initializer)]);
        }
        let constModifier = ModifierFlagsNone$constant__from_ast();
        if (isConstEnumSymbol(__go_symbol)) {
            constModifier = ModifierFlagsConst$constant__from_ast();
        }
        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (!(constModifier === 0)) {
            const __gotots_receiver_69: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_argument_154 = constModifier;
            const __gotots_receiver_68: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_argument_155 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return NodeFactory__from_ast.NewModifier(__gotots_receiver_68, $argument0);
            };
            const __gotots_argument_156 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_154, __gotots_argument_155);
            mods = NodeFactory__from_ast.NewModifierList(__gotots_receiver_69, __gotots_argument_156);
        }
        return NodeFactory__from_ast.NewEnumDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, mods, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, members));
    }
    static $go$private$checker$expandInterfaceDecl(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name = SymbolName__from_ast(__go_symbol);
        const __gotots_store_146 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_146.approximateLength = __gotots_store_146.approximateLength + (14 + name.length);
        let interfaceType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfClassOrInterface((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        let interfaceDeclarations = Filter$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsInterfaceDeclaration__from_ast);
        let localParams = Checker.$go$private$checker$getLocalTypeParametersOfClassOrInterfaceOrTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        let typeParamDecls = Map$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node(localParams, (p: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, p);
        });
        let baseTypes = Checker.$go$private$checker$getBaseTypes((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, interfaceType);
        let baseType: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
        if (baseTypes.length > 0) {
            baseType = Checker.$go$private$checker$getIntersectionType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, baseTypes);
        }
        let resolved: tsonicTypeScriptRuntime.Location<StructuredType> | undefined = Checker.$go$private$checker$resolveStructuredTypeMembers((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, interfaceType);
        let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        members = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(members, NodeBuilderImpl.$go$private$checker$serializeIndexSignaturesOfType(b, interfaceType, baseType), void 0);
        const __gotots_range_53 = StructuredType.ConstructSignatures(resolved);
        for (let __gotots_range_index_50 = 0; __gotots_range_index_50 < __gotots_range_53.length; __gotots_range_index_50++) {
            const __gotots_range_value_64 = __gotots_range_53.get(__gotots_range_index_50);
            let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_64;
            if (!((Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0)) {
                continue;
            }
            members = members.append(void 0, [NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, sig, KindConstructSignature$constant__from_ast(), void 0)]);
        }
        const __gotots_range_54 = StructuredType.CallSignatures(resolved);
        for (let __gotots_range_index_51 = 0; __gotots_range_index_51 < __gotots_range_54.length; __gotots_range_index_51++) {
            const __gotots_range_value_65 = __gotots_range_54.get(__gotots_range_index_51);
            let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_65;
            members = members.append(void 0, [NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, sig, KindCallSignature$constant__from_ast(), void 0)]);
        }
        let filteredProps = NodeBuilderImpl.$go$private$checker$filterInheritedProperties(b, interfaceType, baseTypes, ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.properties);
        members = NodeBuilderImpl.$go$private$checker$serializePropertiesWithTruncation(b, filteredProps, members);
        let heritageClauses = NodeBuilderImpl.$go$private$checker$hoverHeritageClauses(b, interfaceDeclarations);
        return NodeFactory__from_ast.NewInterfaceDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamDecls), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, heritageClauses), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, members));
    }
    static $go$private$checker$expandModuleDecl(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    let exports: SymbolTable__from_ast = Checker.$go$private$checker$getExportsOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
                    let members = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
                    const __gotots_range_48 = exports.$value;
                    const __gotots_range_keys_1 = __gotots_range_48.keys();
                    for (const __gotots_range_value_56 of __gotots_range_keys_1) {
                        const __gotots_range_value_57 = __gotots_range_48.lookupOk(__gotots_range_value_56);
                        if (!__gotots_range_value_57[1]) {
                            continue;
                        }
                        const __gotots_range_value_58 = __gotots_range_value_57[0];
                        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_58;
                        if (!NodeBuilderImpl.$go$private$checker$isNamespaceMember(b, sym)) {
                            continue;
                        }
                        if (!IsIdentifierText__from_scanner(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, LanguageVariantStandard$constant__from_core())) {
                            continue;
                        }
                        members = members.append(void 0, [sym]);
                    }
                    Checker.$go$private$checker$sortSymbols((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, members);
                    const __gotots_store_139 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_139.approximateLength = __gotots_store_139.approximateLength + 14;
                    let oldFlags: NodeBuilderContext["flags"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags;
                    const __gotots_callee_41 = (): void => {
                        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags = oldFlags;
                    };
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_41();
                    };
                    const __gotots_store_140 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_140.flags = (__gotots_store_140.flags | 514) >>> 0;
                    let localName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$symbolToNode(b, __go_symbol, SymbolFlagsAll$constant__from_ast());
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags = oldFlags;
                    type hoverStatement$Storage = {
                        node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
                        isLocal: bool;
                    };
                    class hoverStatement {
                        declare private readonly $goType: void;
                        public constructor(private readonly $storage: hoverStatement$Storage) {
                        }
                        public static $storageOf($source: hoverStatement): hoverStatement$Storage {
                            return $source.$storage;
                        }
                        public static $fromStorage($source: hoverStatement$Storage): hoverStatement {
                            return new hoverStatement($source);
                        }
                        public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
                            return this.$storage.node;
                        }
                        public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
                            this.$storage.node = $value;
                        }
                        public get isLocal(): bool {
                            return this.$storage.isLocal;
                        }
                        public set isLocal($value: bool) {
                            this.$storage.isLocal = $value;
                        }
                        static $copy($source: hoverStatement): hoverStatement {
                            return new hoverStatement({
                                node: $source.$storage.node,
                                isLocal: $source.$storage.isLocal
                            });
                        }
                        static $zeroStorage(): hoverStatement$Storage {
                            return {
                                node: void 0,
                                isLocal: false
                            };
                        }
                        declare private readonly then?: never;
                    }
                    let bodyStmts = RuntimeSlice.nil<hoverStatement$Storage>();
                    let emittedLocals = Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
                        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil();
                    });
                    const emittedLocals$location = tsonicTypeScriptRuntime.boundLocation({}, () => emittedLocals, emittedLocals$next => emittedLocals = emittedLocals$next);
                    for (let i = 0; i < members.length; i++) {
                        let m: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = members.get(i);
                        if (NodeBuilderImpl.$go$private$checker$checkTruncationLengthIfExpanding(b) && i + 3 < members.length - 1) {
                            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expansionTruncated = true;
                            const __gotots_slice_build_4 = bodyStmts;
                            const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                            let __gotots_slice_build_5 = __gotots_slice_build_4;
                            if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                                __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                    {
                                        node: NodeFactory__from_ast.NewExpressionStatement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, fmt__from_gostdlib.Sprintf("... (%d more) ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(members.length - i - 1)])))),
                                        isLocal: false
                                    })));
                            }
                            else {
                                __gotots_slice_build_5 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                                    __gotots_slice_build_5.set(__gotots_slice_build_7, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                                }
                                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                    {
                                        node: NodeFactory__from_ast.NewExpressionStatement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, fmt__from_gostdlib.Sprintf("... (%d more) ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(members.length - i - 1)])))),
                                        isLocal: false
                                    })));
                                for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                                    __gotots_slice_build_5.$initialize(__gotots_slice_build_7, hoverStatement.$zeroStorage());
                                }
                            }
                            bodyStmts = __gotots_slice_build_5;
                            i = members.length - 2;
                            continue;
                        }
                        if (!((Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
                            let aliasDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker.$go$private$checker$getDeclarationOfAliasSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, m);
                            let target: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getMergedSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTargetOfAliasDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, aliasDecl));
                            if (!(target === undefined)) {
                                if (!((Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (7)) >>> 0 === 0)) {
                                    if (Set$AddIfAbsent$PointerTo_Named_ast$Symbol(emittedLocals$location, target)) {
                                        let localType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getWidenedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, target));
                                        const __gotots_store_141 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                        __gotots_store_141.approximateLength = __gotots_store_141.approximateLength + (Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name.length + 5);
                                        let localStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewVariableDeclarationList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewVariableDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), void 0, NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, void 0, localType, target, true), void 0)])), NodeFlagsLet$constant__from_ast()));
                                        const __gotots_slice_build_8 = bodyStmts;
                                        const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                                        let __gotots_slice_build_9 = __gotots_slice_build_8;
                                        if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                                            __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                                            __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                                {
                                                    node: localStmt,
                                                    isLocal: true
                                                })));
                                        }
                                        else {
                                            __gotots_slice_build_9 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                                            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                                                __gotots_slice_build_9.set(__gotots_slice_build_11, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                                            }
                                            __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                                {
                                                    node: localStmt,
                                                    isLocal: true
                                                })));
                                            for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                                                __gotots_slice_build_9.$initialize(__gotots_slice_build_11, hoverStatement.$zeroStorage());
                                            }
                                        }
                                        bodyStmts = __gotots_slice_build_9;
                                    }
                                }
                                let targetName = Symbol__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                                const __gotots_store_142 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                __gotots_store_142.approximateLength = __gotots_store_142.approximateLength + (16 + Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name.length);
                                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                                if (Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name !== targetName) {
                                    propertyName = NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, targetName);
                                }
                                let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, false, NodeFactory__from_ast.NewNamedExports((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewExportSpecifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, false, propertyName, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name))]))), void 0, void 0);
                                const __gotots_slice_build_12 = bodyStmts;
                                const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                                let __gotots_slice_build_13 = __gotots_slice_build_12;
                                if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                                    __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                                    __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: stmt,
                                            isLocal: false
                                        })));
                                }
                                else {
                                    __gotots_slice_build_13 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                                    for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                                        __gotots_slice_build_13.set(__gotots_slice_build_15, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                                    }
                                    __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: stmt,
                                            isLocal: false
                                        })));
                                    for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                                        __gotots_slice_build_13.$initialize(__gotots_slice_build_15, hoverStatement.$zeroStorage());
                                    }
                                }
                                bodyStmts = __gotots_slice_build_13;
                                continue;
                            }
                        }
                        let resolved: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, m);
                        if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (8208)) >>> 0 === 0)) {
                            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, resolved);
                            let sigs = Checker.$go$private$checker$getSignaturesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t, SignatureKindCall$constant());
                            const __gotots_range_49 = sigs;
                            for (let __gotots_range_index_46 = 0; __gotots_range_index_46 < __gotots_range_49.length; __gotots_range_index_46++) {
                                const __gotots_range_value_59 = __gotots_range_49.get(__gotots_range_index_46);
                                let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_59;
                                const __gotots_store_143 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                __gotots_store_143.approximateLength = __gotots_store_143.approximateLength + 1;
                                let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, sig, KindFunctionDeclaration$constant__from_ast(), new SignatureToSignatureDeclarationOptions(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), void 0));
                                const __gotots_slice_build_16 = bodyStmts;
                                const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                                let __gotots_slice_build_17 = __gotots_slice_build_16;
                                if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                                    __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: decl,
                                            isLocal: false
                                        })));
                                }
                                else {
                                    __gotots_slice_build_17 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                                        __gotots_slice_build_17.set(__gotots_slice_build_19, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
                                    }
                                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: decl,
                                            isLocal: false
                                        })));
                                    for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                                        __gotots_slice_build_17.$initialize(__gotots_slice_build_19, hoverStatement.$zeroStorage());
                                    }
                                }
                                bodyStmts = __gotots_slice_build_17;
                            }
                            let merged: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getMergedSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, resolved);
                            let hasModuleExports = !((Symbol__from_ast.$storageOf(((merged ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (1536)) >>> 0 === 0) && !new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((merged ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.isNil() && new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((merged ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.length() !== 0;
                            if (!hasModuleExports) {
                                const __gotots_slice_build_20 = bodyStmts;
                                const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
                                let __gotots_slice_build_21 = __gotots_slice_build_20;
                                if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                                    __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: NodeFactory__from_ast.NewModuleDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, KindNamespaceKeyword$constant__from_ast(), NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), NodeFactory__from_ast.NewModuleBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()))),
                                            isLocal: false
                                        })));
                                }
                                else {
                                    __gotots_slice_build_21 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                                    for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                                        __gotots_slice_build_21.set(__gotots_slice_build_23, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                                    }
                                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: NodeFactory__from_ast.NewModuleDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, KindNamespaceKeyword$constant__from_ast(), NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name), NodeFactory__from_ast.NewModuleBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()))),
                                            isLocal: false
                                        })));
                                    for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                                        __gotots_slice_build_21.$initialize(__gotots_slice_build_23, hoverStatement.$zeroStorage());
                                    }
                                }
                                bodyStmts = __gotots_slice_build_21;
                            }
                            continue;
                        }
                        {
                            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeNamespaceMember(b, resolved, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                            if (!(node === undefined)) {
                                const __gotots_slice_build_24 = bodyStmts;
                                const __gotots_slice_build_26 = __gotots_slice_build_24.length + 1;
                                let __gotots_slice_build_25 = __gotots_slice_build_24;
                                if (__gotots_slice_build_26 <= __gotots_slice_build_24.capacity) {
                                    __gotots_slice_build_25 = __gotots_slice_build_24.$withLength(__gotots_slice_build_26);
                                    __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: node,
                                            isLocal: false
                                        })));
                                }
                                else {
                                    __gotots_slice_build_25 = goSliceAllocate<hoverStatement$Storage>(__gotots_slice_build_26, RuntimeSlice.$grownCapacity(__gotots_slice_build_24.capacity, __gotots_slice_build_26));
                                    for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_24.length; __gotots_slice_build_27++) {
                                        __gotots_slice_build_25.set(__gotots_slice_build_27, hoverStatement.$storageOf(hoverStatement.$copy(hoverStatement.$fromStorage(__gotots_slice_build_24.get(__gotots_slice_build_27)))));
                                    }
                                    __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                                        {
                                            node: node,
                                            isLocal: false
                                        })));
                                    for (let __gotots_slice_build_27 = __gotots_slice_build_26; __gotots_slice_build_27 < __gotots_slice_build_25.capacity; __gotots_slice_build_27++) {
                                        __gotots_slice_build_25.$initialize(__gotots_slice_build_27, hoverStatement.$zeroStorage());
                                    }
                                }
                                bodyStmts = __gotots_slice_build_25;
                            }
                        }
                    }
                    const __gotots_range_50 = bodyStmts;
                    for (let __gotots_range_index_47 = 0; __gotots_range_index_47 < __gotots_range_50.length; __gotots_range_index_47++) {
                        const __gotots_range_value_60 = __gotots_range_index_47;
                        let i = __gotots_range_value_60;
                        let s: tsonicTypeScriptRuntime.Location<hoverStatement> | undefined = tsonicTypeScriptRuntime.projectLocation<hoverStatement$Storage, hoverStatement>(goSliceAddress<hoverStatement$Storage>(bodyStmts, i), hoverStatement.$fromStorage, hoverStatement.$storageOf);
                        if (hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).isLocal || IsExportDeclaration__from_ast(hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).node)) {
                            continue;
                        }
                        if (CanHaveModifiers__from_ast(hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).node)) {
                            let mf = (Node__from_ast.ModifierFlags(hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).node) | ModifierFlagsExport$constant__from_ast()) >>> 0;
                            const __gotots_argument_160: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                            const __gotots_argument_161 = hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).node;
                            const __gotots_receiver_71: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                            const __gotots_argument_157 = mf;
                            const __gotots_receiver_70: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                            const __gotots_argument_158 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return NodeFactory__from_ast.NewModifier(__gotots_receiver_70, $argument0);
                            };
                            const __gotots_argument_159 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_157, __gotots_argument_158);
                            const __gotots_argument_162 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_71, __gotots_argument_159);
                            hoverStatement.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<hoverStatement>).value).node = ReplaceModifiers__from_ast(__gotots_argument_160, __gotots_argument_161, __gotots_argument_162);
                        }
                    }
                    let bodyStatements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(bodyStmts.length, null, void 0);
                    const __gotots_range_51 = bodyStmts;
                    for (let __gotots_range_index_48 = 0; __gotots_range_index_48 < __gotots_range_51.length; __gotots_range_index_48++) {
                        const __gotots_range_value_61 = __gotots_range_index_48;
                        let i = __gotots_range_value_61;
                        bodyStatements.set(i, (void hoverStatement.$storageOf, (void hoverStatement.$fromStorage,
                            bodyStmts.get(i))).node);
                    }
                    let allExported = bodyStatements.length > 0 && Every$PointerTo_Named_ast$Node(bodyStatements, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return HasSyntacticModifier__from_ast(d, ModifierFlagsExport$constant__from_ast());
                    });
                    if (allExported) {
                        const __gotots_range_52 = bodyStatements;
                        for (let __gotots_range_index_49 = 0; __gotots_range_index_49 < __gotots_range_52.length; __gotots_range_index_49++) {
                            const __gotots_range_value_62 = __gotots_range_index_49;
                            const __gotots_range_value_63 = __gotots_range_52.get(__gotots_range_index_49);
                            let i = __gotots_range_value_62;
                            let stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_63;
                            if (CanHaveModifiers__from_ast(stmt)) {
                                let mf = (Node__from_ast.ModifierFlags(stmt) & ~ModifierFlagsExport$constant__from_ast()) >>> 0;
                                const __gotots_store_144 = bodyStatements;
                                const __gotots_store_145 = i;
                                const __gotots_argument_166: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                                const __gotots_argument_167 = stmt;
                                const __gotots_receiver_73: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                                const __gotots_argument_163 = mf;
                                const __gotots_receiver_72: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                                const __gotots_argument_164 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                    return NodeFactory__from_ast.NewModifier(__gotots_receiver_72, $argument0);
                                };
                                const __gotots_argument_165 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_163, __gotots_argument_164);
                                const __gotots_argument_168 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_73, __gotots_argument_165);
                                __gotots_store_144.set(__gotots_store_145, ReplaceModifiers__from_ast(__gotots_argument_166, __gotots_argument_167, __gotots_argument_168));
                            }
                        }
                    }
                    let keyword = KindNamespaceKeyword$constant__from_ast();
                    if (!IsIdentifier__from_ast(localName)) {
                        keyword = KindModuleKeyword$constant__from_ast();
                    }
                    __gotots_return_1 = NodeFactory__from_ast.NewModuleDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, keyword, localName, NodeFactory__from_ast.NewModuleBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, bodyStatements)));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static $go$private$checker$expandSymbolForHover(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
            {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$expandEnumDecl(b, __go_symbol);
                if (!(node === undefined)) {
                    results = results.append(void 0, [node]);
                }
            }
        }
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
            {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$expandClassDecl(b, __go_symbol);
                if (!(node === undefined)) {
                    results = results.append(void 0, [node]);
                }
            }
        }
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (1536)) >>> 0 === 0)) {
            {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$expandModuleDecl(b, __go_symbol);
                if (!(node === undefined)) {
                    results = results.append(void 0, [node]);
                }
            }
        }
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0) && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) {
            {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$expandInterfaceDecl(b, __go_symbol);
                if (!(node === undefined)) {
                    results = results.append(void 0, [node]);
                }
            }
        }
        return results;
    }
    static $go$private$checker$filterInheritedProperties(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, baseTypes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, properties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        if (baseTypes.length === 0) {
            return properties;
        }
        let propsByName: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(properties.length, []);
        const __gotots_range_58 = properties;
        for (let __gotots_range_index_55 = 0; __gotots_range_index_55 < __gotots_range_58.length; __gotots_range_index_55++) {
            const __gotots_range_value_69 = __gotots_range_58.get(__gotots_range_index_55);
            let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_69;
            propsByName.store(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, p);
        }
        let inherited = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
            return $goMap$MapOf_string_To_Struct_void.nil();
        });
        const inherited$location = tsonicTypeScriptRuntime.boundLocation({}, () => inherited, inherited$next => inherited = inherited$next);
        const __gotots_range_59 = baseTypes;
        for (let __gotots_range_index_56 = 0; __gotots_range_index_56 < __gotots_range_59.length; __gotots_range_index_56++) {
            const __gotots_range_value_70 = __gotots_range_59.get(__gotots_range_index_56);
            let base: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_70;
            let baseWithThis: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeWithThisArgument((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, base, ((Type.AsInterfaceType(Checker.$go$private$checker$getTargetType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceType>).value.thisType, false);
            const __gotots_range_60 = Checker.$go$private$checker$getPropertiesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, baseWithThis);
            for (let __gotots_range_index_57 = 0; __gotots_range_index_57 < __gotots_range_60.length; __gotots_range_index_57++) {
                const __gotots_range_value_71 = __gotots_range_60.get(__gotots_range_index_57);
                let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_71;
                {
                    const __gotots_results_13 = propsByName.lookupOk(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    let existing: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_13[0];
                    let ok = __gotots_results_13[1];
                    if (ok &&
                        tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, Symbol__from_ast.$storageOf(((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
                        Set$Add$string(inherited$location, Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    }
                }
            }
        }
        if (Set$Len$string(inherited$location) === 0) {
            return properties;
        }
        return Filter$PointerTo_Named_ast$Symbol(properties, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !Set__from_collections.Has<gostring>(inherited$location, Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        });
    }
    static $go$private$checker$finalizeBoundary(b: {
        value: NodeBuilderImpl;
    } | undefined, bound: {
        value: recoveryBoundary;
    } | undefined): bool {
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.oldTracker;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.oldTrackedSymbols;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.oldEncounteredError;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.approximateLength = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.oldApproximateLength;
        const __gotots_range_21: recoveryBoundary["deferredReports"] = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.deferredReports;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_21.length; __gotots_range_index_19++) {
            const __gotots_range_value_25 = __gotots_range_21.get(__gotots_range_index_19);
            let f: (() => void) | undefined = __gotots_range_value_25;
            const __gotots_callee_17 = f;
            (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        if ((bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hadError) {
            return false;
        }
        const __gotots_range_22: recoveryBoundary["trackedSymbols"] = (bound ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols;
        for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_22.length; __gotots_range_index_20++) {
            const __gotots_range_value_26 = __gotots_range_22.get(__gotots_range_index_20);
            let a: {
                value: TrackedSymbolArgs;
            } | undefined = __gotots_range_value_26;
            const __gotots_receiver_30: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
            const __gotots_argument_85: TrackedSymbolArgs["__go_symbol"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol;
            const __gotots_argument_86: TrackedSymbolArgs["enclosingDeclaration"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
            const __gotots_argument_87: TrackedSymbolArgs["meaning"] = (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.meaning;
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_30).TrackSymbol(__gotots_argument_85, __gotots_argument_86, __gotots_argument_87);
        }
        return true;
    }
    static $go$private$checker$getEnclosingDeclarationIgnoringFakeScope(b: {
        value: NodeBuilderImpl;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let enc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        {
            for (;;) {
                let __gotots_logical_result_11 = !(enc === undefined);
                if (__gotots_logical_result_11) {
                    const __gotots_store_119 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_logical_result_11 = !(NodeBuilderLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_119, "links"), enc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).fakeScopeForSignatureDeclaration === undefined);
                }
                if (!__gotots_logical_result_11) {
                    break;
                }
                {
                    enc = Node__from_ast.$storageOf(((enc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
            }
        }
        return enc;
    }
    static $go$private$checker$getModuleSpecifierOverride(b: {
        value: NodeBuilderImpl;
    } | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lit: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        if (!tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast(lit))) {
            let mode = ResolutionModeNone$constant__from_core();
            if (!((Node__from_ast.AsImportTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes === undefined)) {
                mode = Checker.$go$private$checker$getResolutionModeOverride((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.AsImportAttributes((Node__from_ast.AsImportTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes), false);
            }
            let name = Node__from_ast.Text(lit);
            let originalName = name;
            const __gotots_store_129 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let nodeSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SymbolNodeLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$SymbolNodeLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "symbolNodeLinks"), parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SymbolNodeLinks>).value).resolvedSymbol;
            let meaning = SymbolFlagsType$constant__from_ast();
            if ((Node__from_ast.AsImportTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf) {
                meaning = SymbolFlagsValue$constant__from_ast();
            }
            let parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
            if (!(nodeSymbol === undefined) && Checker.IsSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, nodeSymbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, meaning, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer()) {
                parentSymbol = NodeBuilderImpl.$go$private$checker$lookupSymbolChain(b, nodeSymbol, meaning, true).get(0);
            }
            if (!(parentSymbol === undefined) && IsExternalModuleSymbol(parentSymbol)) {
                name = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, parentSymbol, mode);
            }
            else {
                let targetFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Checker.$go$private$checker$getExternalModuleFileFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent);
                if (!(targetFile === undefined)) {
                    name = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, DeclarationBase__from_ast.$storageOf(((targetFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol, mode);
                }
            }
            if (name.length > 0 && strings__from_gostdlib.Contains(name, "/node_modules/")) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                const __gotots_receiver_54: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_135 = name;
                const __gotots_argument_136 = "";
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_54).ReportLikelyUnsafeImportRequiredError(__gotots_argument_135, __gotots_argument_136);
            }
            if (name !== originalName) {
                return name;
            }
        }
        return "";
    }
    static $go$private$checker$getNameOfSymbolAsWritten(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring {
        const __gotots_results_6 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.remappedSymbolReferences.lookupOk(GetSymbolId__from_ast(__go_symbol));
        let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_6[0];
        let ok = __gotots_results_6[1];
        if (ok) {
            __go_symbol = result;
        }
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameDefault$string__from_ast && ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseAliasDefinedOutsideCurrentScope$constant__from_nodebuilder()) >>> 0 === 0) && (((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsInInitialEntityName$constant__from_nodebuilder()) >>> 0 === 0) || Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0 || (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) && !tsonicTypeScriptRuntime.sameLocation(FindAncestor__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), isDefaultBindingContext), FindAncestor__from_ast(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, isDefaultBindingContext))))) {
            return "default";
        }
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
            let name__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, GetNameOfDeclaration__from_ast);
            if (!(name__shadow_1 === undefined)) {
                if (IsComputedPropertyName__from_ast(name__shadow_1) && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsLate$constant__from_ast()) >>> 0 === 0) {
                    const __gotots_store_87 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let __gotots_logical_result_7 = LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_87, "valueSymbolLinks"), __go_symbol);
                    if (__gotots_logical_result_7) {
                        const __gotots_store_88 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_logical_result_7 = !(ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "valueSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).nameType === undefined);
                    }
                    let __gotots_logical_result_8 = __gotots_logical_result_7;
                    if (__gotots_logical_result_8) {
                        const __gotots_store_89 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_binary_operand_0 = ((ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_89, "valueSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags;
                        const __gotots_binary_operand_1 = TypeFlagsStringOrNumberLiteral$constant();
                        __gotots_logical_result_8 = !((__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0 === 0);
                    }
                    if (__gotots_logical_result_8) {
                        let result__shadow_1 = NodeBuilderImpl.$go$private$checker$getNameOfSymbolFromNameType(b, __go_symbol);
                        if (result__shadow_1.length > 0) {
                            return result__shadow_1;
                        }
                    }
                }
                return DeclarationNameToString__from_scanner(name__shadow_1);
            }
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
            if (!(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclaration$constant__from_ast()) {
                return DeclarationNameToString__from_scanner(VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)));
            }
            if (IsClassExpression__from_ast(declaration) || IsFunctionExpression__from_ast(declaration) || IsArrowFunction__from_ast(declaration)) {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx === undefined) && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError && (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowAnonymousIdentifier$constant__from_nodebuilder()) >>> 0 === 0) {
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                }
                switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindClassExpression$constant__from_ast(): {
                        return "(Anonymous class)";
                        break;
                    }
                    case KindFunctionExpression$constant__from_ast():
                    case KindArrowFunction$constant__from_ast(): {
                        return "(Anonymous function)";
                        break;
                    }
                }
            }
        }
        let name = NodeBuilderImpl.$go$private$checker$getNameOfSymbolFromNameType(b, __go_symbol);
        if (name.length > 0) {
            return name;
        }
        if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === InternalSymbolNameMissing$string__from_ast) {
            return "__missing";
        }
        return Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
    }
    static $go$private$checker$getNameOfSymbolFromNameType(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): gostring {
        const __gotots_store_104 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_104, "valueSymbolLinks"), __go_symbol)) {
            const __gotots_store_105 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let nameType: tsonicTypeScriptRuntime.Location<Type> | undefined = ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "valueSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).nameType;
            if (nameType === undefined) {
                return "";
            }
            if (!((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringOrNumberLiteral$constant()) >>> 0 === 0)) {
                let name = "";
                const __gotots_type_switch_0: GoInterface | undefined = (Type.AsLiteralType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value;
                switch (true) {
                    case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
                        let v: gostring = __gotots_type_switch_0.$go$value;
                        name = v;
                        break;
                    }
                    case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
                        let v: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                        name = v.String();
                        break;
                    }
                }
                if (!IsIdentifierText__from_scanner(name, LanguageVariantStandard$constant__from_core()) && !isNumericLiteralName(name)) {
                    return Checker.$go$private$checker$valueToString((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (Type.AsLiteralType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
                }
                if (isNumericLiteralName(name) && strings__from_gostdlib.HasPrefix(name, "-")) {
                    return fmt__from_gostdlib.Sprintf("[%s]", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(name)]));
                }
                return name;
            }
            if (!((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0)) {
                let text = NodeBuilderImpl.$go$private$checker$getNameOfSymbolAsWritten(b, (Type.AsUniqueESSymbolType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeBase.Type.__go_symbol);
                return fmt__from_gostdlib.Sprintf("[%s]", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(text)]));
            }
        }
        return "";
    }
    static $go$private$checker$getParentSymbolOfTypeParameter(b: {
        value: NodeBuilderImpl;
    } | undefined, typeParameter: {
        value: TypeParameter;
    } | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        let tp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase.Type.__go_symbol, KindTypeParameter$constant__from_ast());
        let host: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        host = Node__from_ast.$storageOf(((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (host === undefined) {
            return void 0;
        }
        return Checker.$go$private$checker$getSymbolOfNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, host);
    }
    static $go$private$checker$getPropertyNameNodeForSymbol(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
            let declName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
            if (!(declName === undefined) && IsPrivateIdentifier__from_ast(declName)) {
                return NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, declName);
            }
        }
        let __gotots_logical_result_12 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0;
        if (__gotots_logical_result_12) {
            const __gotots_argument_131 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            const __gotots_receiver_52 = b;
            const __gotots_argument_132 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return NodeBuilderImpl.$go$private$checker$isStringNamed(__gotots_receiver_52, $argument0);
            };
            __gotots_logical_result_12 = Every$PointerTo_Named_ast$Node(__gotots_argument_131, __gotots_argument_132);
        }
        let stringNamed = __gotots_logical_result_12;
        let __gotots_logical_result_13 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length !== 0;
        if (__gotots_logical_result_13) {
            const __gotots_argument_133 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
            const __gotots_receiver_53 = b;
            const __gotots_argument_134 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return NodeBuilderImpl.$go$private$checker$isSingleQuotedStringNamed(__gotots_receiver_53, $argument0);
            };
            __gotots_logical_result_13 = Every$PointerTo_Named_ast$Node(__gotots_argument_133, __gotots_argument_134);
        }
        let singleQuote = __gotots_logical_result_13;
        let isMethod = !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0);
        let fromNameType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$getPropertyNameNodeForSymbolFromNameType(b, __go_symbol, singleQuote, stringNamed, isMethod);
        if (!(fromNameType === undefined)) {
            return fromNameType;
        }
        let name = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
        const privateNamePrefix$string: gostring = "\u00FE#";
        if (strings__from_gostdlib.HasPrefix(name, privateNamePrefix$string)) {
            name = goStringSlice(name, 2);
            name = strings__from_gostdlib.TrimLeftFunc(name, IsDigit__from_stringutil);
            name = "__#private" + name;
        }
        return NodeBuilderImpl.$go$private$checker$createPropertyNameNodeForIdentifierOrLiteral(b, name, singleQuote, stringNamed, isMethod, __go_symbol);
    }
    static $go$private$checker$getPropertyNameNodeForSymbolFromNameType(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, singleQuote: bool, stringNamed: bool, isMethod: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_133 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (!LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "valueSymbolLinks"), __go_symbol)) {
            return void 0;
        }
        const __gotots_store_134 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let nameType: tsonicTypeScriptRuntime.Location<Type> | undefined = ValueSymbolLinks.$storageOf(((LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_134, "valueSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).nameType;
        if (nameType === undefined) {
            return void 0;
        }
        if (!((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringOrNumberLiteral$constant()) >>> 0 === 0)) {
            let name = "";
            const __gotots_type_switch_1: GoInterface | undefined = (Type.AsLiteralType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value;
            switch (true) {
                case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_1): {
                    name = (($value: GoInterface | undefined): Number__from_jsnum => {
                        if (!$goInterfaceAdapter$Named_jsnum$Number.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((Type.AsLiteralType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value).String();
                    break;
                }
                case GoInterfaceAdapter.$is(__gotots_type_switch_1): {
                    name = (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })((Type.AsLiteralType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
                    break;
                }
            }
            if (!IsIdentifierText__from_scanner(name, LanguageVariantStandard$constant__from_core()) && (stringNamed || !isNumericLiteralName(name))) {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name, IfElse$Named_ast$TokenFlags(singleQuote, TokenFlagsSingleQuote$constant__from_ast(), TokenFlagsNone$constant__from_ast()));
                return node;
            }
            if (isNumericLiteralName(name) && goStringIndex(name, 0) === 45) {
                return NodeFactory__from_ast.NewComputedPropertyName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewPrefixUnaryExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindMinusToken$constant__from_ast(), NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, goStringSlice(name, 1), TokenFlagsNone$constant__from_ast())));
            }
            return NodeBuilderImpl.$go$private$checker$createPropertyNameNodeForIdentifierOrLiteral(b, name, singleQuote, stringNamed, isMethod, __go_symbol);
        }
        if (!((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0)) {
            return NodeFactory__from_ast.NewComputedPropertyName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$symbolToExpression(b, (Type.AsUniqueESSymbolType(nameType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeBase.Type.__go_symbol, SymbolFlagsValue$constant__from_ast()));
        }
        return void 0;
    }
    static $go$private$checker$getResolvedTypeWithoutAbstractConstructSignatures(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<StructuredType> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        if (StructuredType.ConstructSignatures(t).length === 0) {
            const __gotots_store_99 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.ConstrainedType;
            return TypeBase.AsType(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "TypeBase"));
        }
        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.objectTypeWithoutAbstractConstructSignatures === undefined)) {
            return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.objectTypeWithoutAbstractConstructSignatures;
        }
        let constructSignatures = Filter$PointerTo_Named_checker$Signature(StructuredType.ConstructSignatures(t), (signature: tsonicTypeScriptRuntime.Location<Signature> | undefined): bool => {
            return (Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0;
        });
        if (constructSignatures.length === StructuredType.ConstructSignatures(t).length) {
            const __gotots_store_100 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.ConstrainedType;
            ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.objectTypeWithoutAbstractConstructSignatures = TypeBase.AsType(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_100, "TypeBase"));
            const __gotots_store_101 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.ConstrainedType;
            return TypeBase.AsType(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "TypeBase"));
        }
        let typeCopy: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$newAnonymousType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.ConstrainedType.TypeBase.Type.__go_symbol, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.members, StructuredType.CallSignatures(t), IfElse$SliceOf_PointerTo_Named_checker$Signature(constructSignatures.length > 0, constructSignatures, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Signature> | undefined>([])), ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.indexInfos);
        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.objectTypeWithoutAbstractConstructSignatures = typeCopy;
        ((Type.AsStructuredType(typeCopy) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StructuredType>).value.objectTypeWithoutAbstractConstructSignatures = typeCopy;
        return typeCopy;
    }
    static $go$private$checker$getSpecifierForModuleSymbol(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, overrideImportMode: ModuleKind__from_core): gostring {
        let file: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindSourceFile$constant__from_ast());
        if (file === undefined) {
            let equivalentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = FirstNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Symbol(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
                return Checker.$go$private$checker$getFileSymbolIfFileSymbolExportEqualsContainer((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, d, __go_symbol);
            });
            if (!(equivalentSymbol === undefined)) {
                file = GetDeclarationOfKind__from_ast(equivalentSymbol, KindSourceFile$constant__from_ast());
            }
        }
        if (file === undefined) {
            if (IsAmbientModuleSymbolName__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)) {
                return StripQuotes__from_stringutil(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            }
        }
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile === undefined) {
            if (IsAmbientModuleSymbolName__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name)) {
                return StripQuotes__from_stringutil(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
            }
            return SourceFile__from_ast.FileName(GetSourceFileOfModule__from_ast(__go_symbol));
        }
        let enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
        let originalModuleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (canHaveModuleSpecifier(enclosingDeclaration)) {
            originalModuleSpecifier = TryGetModuleSpecifierFromDeclaration(enclosingDeclaration);
        }
        let contextFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile;
        let resolutionMode = overrideImportMode;
        if (resolutionMode === ResolutionModeNone$constant__from_core() && !(originalModuleSpecifier === undefined)) {
            const __gotots_receiver_17: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
            const __gotots_argument_37 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(contextFile);
            const __gotots_argument_38 = originalModuleSpecifier;
            resolutionMode = goInterfaceNonNil<Program>(__gotots_receiver_17).GetModeForUsageLocation(__gotots_argument_37, __gotots_argument_38);
        }
        else if (resolutionMode === ResolutionModeNone$constant__from_core() && !(contextFile === undefined)) {
            const __gotots_receiver_18: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
            const __gotots_argument_39 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(contextFile);
            resolutionMode = goInterfaceNonNil<Program>(__gotots_receiver_18).GetDefaultResolutionModeForFile(__gotots_argument_39);
        }
        let cacheKey = ModeAwareCacheKey__from___go_module.$fromStorage({
            Name: SourceFile__from_ast.Path(contextFile).$value,
            Mode: resolutionMode
        });
        const __gotots_store_72 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let links: tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$NodeBuilderSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "symbolLinks"), __go_symbol);
        if (new ModeAwareCache__from___go_module(NodeBuilderSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks>).value).specifierCache).$value.isNil()) {
            NodeBuilderSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks>).value).specifierCache = new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_string.make(0, [])).$value;
        }
        const __gotots_results_4 = new ModeAwareCache__from___go_module(NodeBuilderSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks>).value).specifierCache).$value.lookupOk(cacheKey);
        let result = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (ok) {
            return result;
        }
        let host: Host | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        let specifierCompilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions;
        let specifierPref = ImportModuleSpecifierPreferenceProjectRelative$constant__from_modulespecifiers();
        let endingPref = ImportModuleSpecifierEndingPreferenceNone$constant__from_modulespecifiers();
        if (resolutionMode === ResolutionModeESM$constant__from_core()) {
            endingPref = ImportModuleSpecifierEndingPreferenceJs$constant__from_modulespecifiers();
        }
        let allSpecifiers = GetModuleSpecifiers__from_modulespecifiers(__go_symbol, new $goInterfaceAdapter$PointerTo_Named_checker$Checker((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch), specifierCompilerOptions, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(contextFile), host, new UserPreferences__from_modulespecifiers(specifierPref, endingPref, RuntimeSlice.nil<gostring>()), new ModuleSpecifierOptions__from_modulespecifiers(overrideImportMode), false);
        if (allSpecifiers.length === 0) {
            new ModeAwareCache__from___go_module(NodeBuilderSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks>).value).specifierCache).$value.store(cacheKey, "");
            return "";
        }
        let specifier = allSpecifiers.get(0);
        new ModeAwareCache__from___go_module(NodeBuilderSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks>).value).specifierCache).$value.store(cacheKey, specifier);
        return specifier;
    }
    static $go$private$checker$getSymbolChain(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, endOfChain: bool, yieldModuleSymbol: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        let accessibleSymbolChain = Checker.$go$private$checker$getAccessibleSymbolChain((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, meaning, !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseOnlyExternalAliasing$constant__from_nodebuilder()) >>> 0 === 0));
        let qualifierMeaning = meaning;
        if (accessibleSymbolChain.length > 1) {
            qualifierMeaning = getQualifiedLeftMeaning(meaning);
        }
        if (accessibleSymbolChain.length === 0 || Checker.$go$private$checker$needsQualification((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, accessibleSymbolChain.get(0), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, qualifierMeaning)) {
            let root: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
            if (accessibleSymbolChain.length > 0) {
                root = accessibleSymbolChain.get(0);
            }
            let parents = Checker.$go$private$checker$getContainersOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, root, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, meaning);
            if (parents.length > 0) {
                let parentSpecifiers = Map$PointerTo_Named_ast$Symbol$Named_checker$sortedSymbolNamePair(parents, (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): sortedSymbolNamePair => {
                    if (Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        return sortedSymbolNamePair.$fromStorage({
                            sym: __go_symbol__shadow_1,
                            name: NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, __go_symbol__shadow_1, ResolutionModeNone$constant__from_core())
                        });
                    }
                    return sortedSymbolNamePair.$fromStorage({
                        sym: __go_symbol__shadow_1,
                        name: ""
                    });
                });
                const __gotots_argument_65 = parentSpecifiers;
                const __gotots_receiver_27 = b;
                const __gotots_argument_66 = ($argument0: sortedSymbolNamePair, $argument1: sortedSymbolNamePair): int => {
                    return NodeBuilderImpl.$go$private$checker$sortByBestName(__gotots_receiver_27, $argument0, $argument1);
                };
                SortStableFunc$SliceOf_Named_checker$sortedSymbolNamePair$Named_checker$sortedSymbolNamePair(__gotots_argument_65, __gotots_argument_66);
                const __gotots_range_20 = parentSpecifiers;
                for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_20.length; __gotots_range_index_18++) {
                    const __gotots_range_value_24 = sortedSymbolNamePair.$copy(sortedSymbolNamePair.$fromStorage(__gotots_range_20.get(__gotots_range_index_18)));
                    let pair = __gotots_range_value_24;
                    let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = sortedSymbolNamePair.$storageOf(pair).sym;
                    let parentChain = NodeBuilderImpl.$go$private$checker$getSymbolChain(b, parent, getQualifiedLeftMeaning(meaning), false, yieldModuleSymbol);
                    if (parentChain.length > 0) {
                        if (!new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.isNil()) {
                            const __gotots_results_8 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookupOk(InternalSymbolNameExportEquals$string__from_ast);
                            let exported: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_8[0];
                            let ok = __gotots_results_8[1];
                            if (ok && !(Checker.$go$private$checker$getSymbolIfSameReference((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, exported, __go_symbol) === undefined)) {
                                accessibleSymbolChain = parentChain;
                                break;
                            }
                        }
                        let nextSyms = accessibleSymbolChain;
                        if (nextSyms.length === 0) {
                            let fallback: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getAliasForSymbolInContainer((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parent, __go_symbol);
                            if (fallback === undefined) {
                                fallback = __go_symbol;
                            }
                            nextSyms = nextSyms.append(void 0, [fallback]);
                        }
                        accessibleSymbolChain = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(parentChain, nextSyms, void 0);
                        break;
                    }
                }
            }
        }
        if (accessibleSymbolChain.length > 0) {
            return accessibleSymbolChain;
        }
        if (endOfChain || ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (6144)) >>> 0 === 0)) {
            if (!endOfChain && !yieldModuleSymbol && Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
            }
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>([__go_symbol]);
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    }
    static $go$private$checker$getTypeFromTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, noMappedTypes: bool): tsonicTypeScriptRuntime.Location<Type> | undefined {
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeFromTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node);
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper === undefined) {
            return t;
        }
        let instantiated: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
        if (noMappedTypes && !tsonicTypeScriptRuntime.sameLocation(instantiated, t)) {
            return void 0;
        }
        return instantiated;
    }
    static $go$private$checker$getTypeParametersOfClassOrInterface(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined> {
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Type> | undefined>(0, null, void 0);
        result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>(result, Checker.$go$private$checker$getOuterTypeParametersOfClassOrInterface((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol), void 0);
        result = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>(result, Checker.$go$private$checker$getLocalTypeParametersOfClassOrInterfaceOrTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol), void 0);
        return result;
    }
    static $go$private$checker$hoverHeritageClauses(b: {
        value: NodeBuilderImpl;
    } | undefined, declarations: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let extendsTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        let implementsTypes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_55 = declarations;
        for (let __gotots_range_index_52 = 0; __gotots_range_index_52 < __gotots_range_55.length; __gotots_range_index_52++) {
            const __gotots_range_value_66 = __gotots_range_55.get(__gotots_range_index_52);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_66;
            const __gotots_range_56 = GetExtendsHeritageClauseElements__from_ast(declaration);
            for (let __gotots_range_index_53 = 0; __gotots_range_index_53 < __gotots_range_56.length; __gotots_range_index_53++) {
                const __gotots_range_value_67 = __gotots_range_56.get(__gotots_range_index_53);
                let heritageElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_67;
                extendsTypes = extendsTypes.append(void 0, [NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (void Node__from_ast.AsNode,
                        heritageElement))]);
            }
            const __gotots_range_57 = GetImplementsHeritageClauseElements__from_ast(declaration);
            for (let __gotots_range_index_54 = 0; __gotots_range_index_54 < __gotots_range_57.length; __gotots_range_index_54++) {
                const __gotots_range_value_68 = __gotots_range_57.get(__gotots_range_index_54);
                let heritageElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_68;
                implementsTypes = implementsTypes.append(void 0, [NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (void Node__from_ast.AsNode,
                        heritageElement))]);
            }
        }
        let heritageClauses = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (extendsTypes.length > 0) {
            heritageClauses = heritageClauses.append(void 0, [NodeFactory__from_ast.NewHeritageClause((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindExtendsKeyword$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, extendsTypes))]);
        }
        if (implementsTypes.length > 0) {
            heritageClauses = heritageClauses.append(void 0, [NodeFactory__from_ast.NewHeritageClause((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindImplementsKeyword$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, implementsTypes))]);
        }
        return heritageClauses;
    }
    static $go$private$checker$indexInfoToIndexSignatureDeclarationHelper(b: {
        value: NodeBuilderImpl;
    } | undefined, indexInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let name = getNameFromIndexInfo(indexInfo);
        let indexerTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType);
        let indexingParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, void 0, NodeBuilderImpl.$go$private$checker$newIdentifier(b, name, void 0), void 0, indexerTypeNode, void 0);
        if (typeNode === undefined) {
            if (IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType === undefined) {
                typeNode = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
            }
            else {
                typeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType);
            }
        }
        if (IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType === undefined && (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowEmptyIndexInfoType$constant__from_nodebuilder()) >>> 0 === 0) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
        }
        const __gotots_store_121 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_121.approximateLength = __gotots_store_121.approximateLength + (name.length + 4);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly) {
            const __gotots_store_122 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_122.approximateLength = __gotots_store_122.approximateLength + 9;
            modifiers = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewModifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast())]));
        }
        return NodeFactory__from_ast.NewIndexSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([indexingParameter])), typeNode);
    }
    static $go$private$checker$indexInfoToObjectComputedNamesOrSignatureDeclaration(b: {
        value: NodeBuilderImpl;
    } | undefined, indexInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if (IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components.length > 0) {
            let __gotots_logical_result_10 = !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined);
            if (__gotots_logical_result_10) {
                const __gotots_argument_110 = IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components;
                const __gotots_receiver_34 = b;
                const __gotots_argument_111 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return NodeBuilderImpl.$go$private$checker$isTriviallySerializableComputedName(__gotots_receiver_34, $argument0);
                };
                __gotots_logical_result_10 = Every$PointerTo_Named_ast$Node(__gotots_argument_110, __gotots_argument_111);
            }
            let allComponentComputedNamesSerializable = __gotots_logical_result_10;
            if (allComponentComputedNamesSerializable) {
                let newComponents = Filter$PointerTo_Named_ast$Node(IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).components, (c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return !Checker.$go$private$checker$hasLateBindableName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, c);
                });
                let bailed = false;
                let results = Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(newComponents, (e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$reuseNode(b, Node__from_ast.Name(e));
                    if (!(name === undefined)) {
                        NodeBuilderImpl.$go$private$checker$trackComputedName(b, Node__from_ast.Expression(Node__from_ast.Name(e)), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
                        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                        if (IndexInfo.$storageOf(((indexInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).isReadonly) {
                            mods = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewModifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast())]));
                        }
                        let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!(Node__from_ast.PostfixToken(e) === undefined)) {
                            postfixToken = Node__from_ast.Clone(Node__from_ast.PostfixToken(e), new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
                        }
                        let currentTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                        if (!(typeNode === undefined)) {
                            currentTypeNode = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeNode);
                        }
                        else {
                            currentTypeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.Symbol(e)));
                        }
                        let sig: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, mods, name, postfixToken, currentTypeNode, void 0);
                        Node__from_ast.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                        return sig;
                    }
                    bailed = true;
                    return void 0;
                });
                if (!bailed) {
                    return results;
                }
            }
        }
        return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeBuilderImpl.$go$private$checker$indexInfoToIndexSignatureDeclarationHelper(b, indexInfo, typeNode)]);
    }
    static $go$private$checker$isActivelyExpanding(b: {
        value: NodeBuilderImpl;
    } | undefined): bool {
        return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth > 0 && ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.depth < ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth;
    }
    static $go$private$checker$isExpandableType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, isAlias: bool): bool {
        if (isAlias) {
            return !Checker.IsLibSymbolForHoverVerbosity((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, TypeAlias.Symbol(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias));
        }
        if (Checker.IsLibTypeForHoverVerbosity((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) {
            return false;
        }
        let objectFlags = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags;
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsEnumLike$constant()) >>> 0 === 0) || !((objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) || !((objectFlags & ObjectFlagsClassOrInterface$constant()) >>> 0 === 0)) {
            return true;
        }
        if (!((objectFlags & ObjectFlagsAnonymous$constant()) >>> 0 === 0) && !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (9136)) >>> 0 === 0)) {
            return true;
        }
        return false;
    }
    static $go$private$checker$isHomomorphicMappedTypeWithNonHomomorphicInstantiation(b: {
        value: NodeBuilderImpl;
    } | undefined, mapped: {
        value: MappedType;
    } | undefined): bool {
        let __gotots_logical_result_9 = !((mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectType.target === undefined);
        if (__gotots_logical_result_9) {
            const __gotots_receiver_31 = b;
            const __gotots_store_106 = (mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectType.StructuredType.ConstrainedType;
            const __gotots_argument_88 = TypeBase.AsType(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_106, "TypeBase"));
            __gotots_logical_result_9 = !NodeBuilderImpl.$go$private$checker$isMappedTypeHomomorphic(__gotots_receiver_31, __gotots_argument_88);
        }
        return __gotots_logical_result_9 && NodeBuilderImpl.$go$private$checker$isMappedTypeHomomorphic(b, (mapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ObjectType.target);
    }
    static $go$private$checker$isMappedTypeHomomorphic(b: {
        value: NodeBuilderImpl;
    } | undefined, mapped: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        return !(Checker.$go$private$checker$getHomomorphicTypeVariable((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, mapped) === undefined);
    }
    static $go$private$checker$isNamespaceMember(b: {
        value: NodeBuilderImpl;
    } | undefined, p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
        return !((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (2887656)) >>> 0 === 0) || !(!((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0) || Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name === "prototype" || (!(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && HasStaticModifier__from_ast(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && IsClassLike__from_ast(Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)));
    }
    static $go$private$checker$isSingleQuotedStringNamed(b: {
        value: NodeBuilderImpl;
    } | undefined, d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(d);
        return !(name === undefined) && IsStringLiteral__from_ast(name) && !(((void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
            (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags & TokenFlagsSingleQuote$constant__from_ast()) === 0);
    }
    static $go$private$checker$isStringNamed(b: {
        value: NodeBuilderImpl;
    } | undefined, d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(d);
        if (name === undefined) {
            return false;
        }
        if (IsComputedPropertyName__from_ast(name)) {
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$checkExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.Expression(name));
            return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLike$constant()) >>> 0 === 0);
        }
        if (IsElementAccessExpression__from_ast(name)) {
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$checkExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
            return !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLike$constant()) >>> 0 === 0);
        }
        return IsStringLiteral__from_ast(name);
    }
    static $go$private$checker$isTriviallySerializableComputedName(b: {
        value: NodeBuilderImpl;
    } | undefined, e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let shapeGood = !(e === undefined) && !(Node__from_ast.Name(e) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.Name(e)) && IsEntityNameExpression__from_ast(Node__from_ast.Expression(Node__from_ast.Name(e)));
        if (!shapeGood) {
            return false;
        }
        return EmitResolver.$go$private$checker$isEntityNameVisible(Checker.GetEmitResolver((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch), Node__from_ast.Expression(Node__from_ast.Name(e)), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer();
    }
    static $go$private$checker$isTypeOnStack(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        const __gotots_range_10 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.length - 1;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10; __gotots_range_index_8++) {
            const __gotots_range_value_14 = __gotots_range_index_8;
            let i = __gotots_range_value_14;
            if (tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.get(i), t)) {
                return true;
            }
        }
        return false;
    }
    static $go$private$checker$lookupExpressionChainTypeArgumentNodes(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (NodeBuilderImpl.$go$private$checker$shouldWriteTypeParametersInQualifiedName(b, chain, index)) {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
            let symbolId = GetSymbolId__from_ast(__go_symbol);
            const __gotots_store_102 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (CopyOnWriteSet$Has$Named_ast$SymbolId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_102, "typeParameterSymbolList"), symbolId)) {
                return void 0;
            }
            const __gotots_store_103 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            CopyOnWriteSet$Add$Named_ast$SymbolId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "typeParameterSymbolList"), symbolId);
            {
                let typeArgumentNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$lookupInstantiatedTypeArgumentNodes(b, chain, index);
                if (!(typeArgumentNodes === undefined)) {
                    return typeArgumentNodes;
                }
            }
            let typeParameterNodes = NodeBuilderImpl.$go$private$checker$typeParametersToTypeParameterDeclarations(b, __go_symbol);
            if (typeParameterNodes.length > 0) {
                return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParameterNodes);
            }
        }
        return void 0;
    }
    static $go$private$checker$lookupInstantiatedTypeArgumentNodes(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (NodeBuilderImpl.$go$private$checker$shouldWriteTypeParametersInQualifiedName(b, chain, index)) {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
            let nextSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index + 1);
            if ((Symbol__from_ast.$storageOf(((nextSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsInstantiated$constant__from_ast()) >>> 0 === 0) {
                return void 0;
            }
            let targetSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
            if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
                targetSymbol = Checker.$go$private$checker$resolveAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
            }
            let params = NodeBuilderImpl.$go$private$checker$getTypeParametersOfClassOrInterface(b, targetSymbol);
            const __gotots_store_90 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let targetMapper: tsonicTypeScriptRuntime.Location<TypeMapper> | undefined = ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "valueSymbolLinks"), nextSymbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).mapper;
            if (!(targetMapper === undefined)) {
                const __gotots_argument_49 = params;
                const __gotots_receiver_20 = targetMapper;
                const __gotots_argument_50 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                    return TypeMapper.Map(__gotots_receiver_20, $argument0);
                };
                params = Map$PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(__gotots_argument_49, __gotots_argument_50);
            }
            return NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, params, false);
        }
        return void 0;
    }
    static $go$private$checker$lookupSymbolChain(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, yieldModuleSymbol: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        const __gotots_receiver_15: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
        const __gotots_argument_31 = __go_symbol;
        const __gotots_argument_32: NodeBuilderContext["enclosingDeclaration"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        const __gotots_argument_33 = meaning;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_15).TrackSymbol(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
        return NodeBuilderImpl.$go$private$checker$lookupSymbolChainWorker(b, __go_symbol, meaning, yieldModuleSymbol);
    }
    static $go$private$checker$lookupSymbolChainWorker(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, yieldModuleSymbol: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
        let chain = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
        let isTypeParameter = !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0);
        if (!isTypeParameter && (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) || !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseFullyQualifiedType$constant__from_nodebuilder()) >>> 0 === 0)) && ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags & InternalFlagsDoNotIncludeSymbolChain$constant__from_nodebuilder()) === 0)) {
            let res = NodeBuilderImpl.$go$private$checker$getSymbolChain(b, __go_symbol, meaning, true, yieldModuleSymbol);
            chain = res;
            Assert__from_debug(!chain.isNil(), RuntimeSlice.nil<GoInterface | undefined>());
            Assert__from_debug(chain.length > 0, RuntimeSlice.nil<GoInterface | undefined>());
        }
        else {
            chain = chain.append(void 0, [__go_symbol]);
        }
        return chain;
    }
    static $go$private$checker$lookupTypeParameterNodes(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        Assert__from_debug(!chain.isNil() && 0 <= index && index < chain.length, RuntimeSlice.nil<GoInterface | undefined>());
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = chain.get(index);
        let symbolId = GetSymbolId__from_ast(__go_symbol);
        const __gotots_store_70 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (CopyOnWriteSet$Has$Named_ast$SymbolId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "typeParameterSymbolList"), symbolId)) {
            return void 0;
        }
        const __gotots_store_71 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        CopyOnWriteSet$Add$Named_ast$SymbolId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "typeParameterSymbolList"), symbolId);
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteTypeParametersInQualifiedName$constant__from_nodebuilder()) >>> 0 === 0) && index < (chain.length - 1)) {
            {
                let typeArgumentNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$lookupInstantiatedTypeArgumentNodes(b, chain, index);
                if (!(typeArgumentNodes === undefined)) {
                    return typeArgumentNodes;
                }
                else {
                    let typeParameterNodes = NodeBuilderImpl.$go$private$checker$typeParametersToTypeParameterDeclarations(b, __go_symbol);
                    if (typeParameterNodes.length > 0) {
                        return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParameterNodes);
                    }
                    return void 0;
                }
            }
        }
        return void 0;
    }
    static $go$private$checker$mapToTypeNodes(b: {
        value: NodeBuilderImpl;
    } | undefined, list: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type> | undefined>, isBareList: bool): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (list.length === 0) {
            return void 0;
        }
        if (NodeBuilderImpl.$go$private$checker$checkTruncationLength(b)) {
            if (!isBareList) {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
                    node = EmitContext__from_printer.AddSyntheticLeadingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast()), KindMultiLineCommentTrivia$constant__from_ast(), "elided", false);
                }
                else {
                    node = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, "..."), void 0);
                }
                return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([node]));
            }
            else if (list.length > 2) {
                let nodes = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, list.get(0)), void 0, NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, list.get(list.length - 1))]);
                if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
                    nodes.set(1, EmitContext__from_printer.AddSyntheticLeadingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast()), KindMultiLineCommentTrivia$constant__from_ast(), fmt__from_gostdlib.Sprintf("... %d more elided ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(list.length - 2)])), false));
                }
                else {
                    let text = fmt__from_gostdlib.Sprintf("... %d more ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(list.length - 2)]));
                    nodes.set(1, NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text), void 0));
                }
                return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, nodes);
            }
        }
        let mayHaveNameCollisions = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseFullyQualifiedType$constant__from_nodebuilder()) >>> 0 === 0;
        type seenName$Storage = {
            t: tsonicTypeScriptRuntime.Location<Type> | undefined;
            i: int;
        };
        class seenName implements GoContainerStoredValue<seenName$Storage> {
            declare private readonly $goType: void;
            public constructor(private readonly $storage: seenName$Storage) {
            }
            public static $storageOf($source: seenName): seenName$Storage {
                return $source.$storage;
            }
            public static $fromStorage($source: seenName$Storage): seenName {
                return new seenName($source);
            }
            public get t(): tsonicTypeScriptRuntime.Location<Type> | undefined {
                return this.$storage.t;
            }
            public set t($value: tsonicTypeScriptRuntime.Location<Type> | undefined) {
                this.$storage.t = $value;
            }
            public get i(): int {
                return this.$storage.i;
            }
            public set i($value: int) {
                this.$storage.i = $value;
            }
            declare readonly [$goContainerStorageType]: seenName$Storage;
            static $zero(): seenName {
                return new seenName({
                    t: void 0,
                    i: 0
                });
            }
            static $copy($source: seenName): seenName {
                return new seenName({
                    t: $source.$storage.t,
                    i: $source.$storage.i
                });
            }
            declare private readonly then?: never;
        }
        class $goMap$MapOf_string_To_SliceOf_Named_seenName extends GoMapValue<gostring, RuntimeSlice<seenName$Storage>> {
            private constructor(private readonly zeroValue: RuntimeSlice<seenName$Storage>, private readonly values: Map<gostring, [
                RuntimeSlice<seenName$Storage>
            ]> | undefined) {
                super();
            }
            private static $zeroValue(): RuntimeSlice<seenName$Storage> {
                return RuntimeSlice.nil<seenName$Storage>();
            }
            private static $copyValue($value: RuntimeSlice<seenName$Storage>): RuntimeSlice<seenName$Storage> {
                return $value;
            }
            static nil(): $goMap$MapOf_string_To_SliceOf_Named_seenName {
                return new $goMap$MapOf_string_To_SliceOf_Named_seenName($goMap$MapOf_string_To_SliceOf_Named_seenName.$zeroValue(), undefined);
            }
            static make(size: number | bigint, entries: [
                gostring,
                RuntimeSlice<seenName$Storage>
            ][]): $goMap$MapOf_string_To_SliceOf_Named_seenName {
                const result: $goMap$MapOf_string_To_SliceOf_Named_seenName = new $goMap$MapOf_string_To_SliceOf_Named_seenName($goMap$MapOf_string_To_SliceOf_Named_seenName.$zeroValue(), new Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]>);
                for (const entry of entries) {
                    result.store(entry[0], entry[1]);
                }
                return result;
            }
            lookup(key: gostring): RuntimeSlice<seenName$Storage> {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (values === undefined) {
                    return $goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(this.zeroValue);
                }
                const entry: [
                    RuntimeSlice<seenName$Storage>
                ] | undefined = values.get(key);
                return $goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(entry === undefined ? this.zeroValue : entry[0]);
            }
            lookupOk(key: gostring): [
                RuntimeSlice<seenName$Storage>,
                boolean
            ] {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (values === undefined) {
                    return [$goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(this.zeroValue), false];
                }
                const entry: [
                    RuntimeSlice<seenName$Storage>
                ] | undefined = values.get(key);
                if (entry === undefined) {
                    return [$goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(this.zeroValue), false];
                }
                return [$goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(entry[0]), true];
            }
            store(key: gostring, value: RuntimeSlice<seenName$Storage>): void {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (values === undefined)
                    GoPanic.raiseRuntime("assignment to entry in nil map");
                values.set(key, [$goMap$MapOf_string_To_SliceOf_Named_seenName.$copyValue(value)]);
            }
            delete(key: gostring): void {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (!(values === undefined))
                    values.delete(key);
            }
            length(): number {
                return this.values === undefined ? 0 : this.values.size;
            }
            isNil(): boolean {
                return this.values === undefined;
            }
            clear(): void {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (!(values === undefined))
                    values.clear();
            }
            keys(): gostring[] {
                const values: Map<gostring, [
                    RuntimeSlice<seenName$Storage>
                ]> | undefined = this.values;
                if (values === undefined) {
                    return [];
                }
                return Array.from(values.keys());
            }
        }
        function MultiMap$Add$string$Named_seenName($argument0: MultiMap__from_collections<gostring, seenName> | undefined, $argument1: gostring, $argument2: seenName): void {
            return MultiMap__from_collections.Add$kernel<gostring, seenName>($argument0, ($argument0: seenName): seenName => {
                return seenName.$copy($argument0);
            }, ($argument0: seenName$Storage): seenName => {
                return seenName.$fromStorage($argument0);
            }, ($argument0: RuntimeSlice<seenName$Storage>): GoMapValue<gostring, RuntimeSlice<seenName$Storage>> => {
                return $goMap$MapOf_string_To_SliceOf_Named_seenName.make(0, []);
            }, ($argument0: seenName): seenName$Storage => {
                return seenName.$storageOf($argument0);
            }, (): seenName => {
                return seenName.$zero();
            }, $argument1, $argument2);
        }
        function MultiMap$Values$string$Named_seenName($argument0: MultiMap__from_collections<gostring, seenName> | undefined): iter__from_gostdlib.Seq<RuntimeSlice<seenName$Storage>> {
            return MultiMap__from_collections.Values$kernel<gostring, seenName>($argument0, ($argument0: GoMapValue<gostring, RuntimeSlice<seenName$Storage>>): GoMapValue<gostring, RuntimeSlice<seenName$Storage>> => {
                return $argument0;
            }, ($argument0: RuntimeSlice<seenName$Storage>): RuntimeSlice<seenName$Storage> => {
                return $argument0;
            });
        }
        function arrayIsHomogeneous$Named_seenName($argument0: RuntimeSlice<seenName$Storage>, $argument1: (($0: seenName, $1: seenName) => bool) | undefined): bool {
            return arrayIsHomogeneous$kernel<seenName>(($argument0: seenName): seenName => {
                return seenName.$copy($argument0);
            }, ($argument0: RuntimeSlice<seenName$Storage>, $argument1: int): seenName => {
                return seenName.$fromStorage($argument0.get($argument1));
            }, ($argument0: RuntimeSlice<seenName$Storage>): int => {
                return $argument0.length;
            }, $argument0, $argument1);
        }
        let seenNames: MultiMap__from_collections<gostring, seenName> | undefined = void 0;
        if (mayHaveNameCollisions) {
            seenNames = MultiMap__from_collections.$fromStorage<gostring, seenName>({
                M: $goMap$MapOf_string_To_SliceOf_Named_seenName.nil()
            });
        }
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, list.length, void 0);
        const __gotots_range_4 = list;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_index_4;
            const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
            let i = __gotots_range_value_4;
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_5;
            let displayIndex = i + 1;
            if (NodeBuilderImpl.$go$private$checker$checkTruncationLength(b) && (displayIndex + 2 < list.length - 1)) {
                if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTruncation$constant__from_nodebuilder()) >>> 0 === 0)) {
                    result = result.append(void 0, [EmitContext__from_printer.AddSyntheticLeadingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast()), KindMultiLineCommentTrivia$constant__from_ast(), fmt__from_gostdlib.Sprintf("... %d more elided ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(list.length - displayIndex)])), false)]);
                }
                else {
                    let text = fmt__from_gostdlib.Sprintf("... %d more ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(list.length - displayIndex)]));
                    result = result.append(void 0, [NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text), void 0)]);
                }
                let typeNode__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, list.get(list.length - 1));
                if (!(typeNode__shadow_1 === undefined)) {
                    result = result.append(void 0, [typeNode__shadow_1]);
                }
                break;
            }
            const __gotots_store_35 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_35.approximateLength = __gotots_store_35.approximateLength + 2;
            let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
            if (!(typeNode === undefined)) {
                result = result.append(void 0, [typeNode]);
                if (!(seenNames === undefined) && isIdentifierTypeReference(typeNode)) {
                    MultiMap$Add$string$Named_seenName(seenNames, Node__from_ast.Text(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName), seenName.$fromStorage({
                        t: t,
                        i: result.length - 1
                    }));
                }
            }
        }
        if (!(seenNames === undefined)) {
            let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
            const __gotots_store_36 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_36.flags = (__gotots_store_36.flags | 64) >>> 0;
            const __gotots_range_5 = named_iter.IterSeqValueOperations.$project(MultiMap$Values$string$Named_seenName(seenNames));
            if (__gotots_range_5 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            __gotots_range_5(($argument0: RuntimeSlice<seenName$Storage>): bool => {
                if (__gotots_range_state_0 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_0 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_0 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_0 = -1;
                const __gotots_range_value_6 = $argument0;
                let types = __gotots_range_value_6;
                if (!arrayIsHomogeneous$Named_seenName(types, (a: seenName, b__shadow_1: seenName): bool => {
                    return typesAreSameReference(seenName.$storageOf(a).t, seenName.$storageOf(b__shadow_1).t);
                })) {
                    const __gotots_range_6 = types;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
                        const __gotots_range_value_7 = seenName.$copy(seenName.$fromStorage(__gotots_range_6.get(__gotots_range_index_5)));
                        let seen = __gotots_range_value_7;
                        result.set(seenName.$storageOf(seen).i, NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, seenName.$storageOf(seen).t));
                    }
                }
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_0 = -2;
            const __gotots_callee_0 = restoreFlags;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, result);
    }
    static $go$private$checker$newIdentifier(b: {
        value: NodeBuilderImpl;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let id: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text);
        if (!(__go_symbol === undefined)) {
            (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.store(id, __go_symbol);
        }
        return id;
    }
    static $go$private$checker$newStringLiteral(b: {
        value: NodeBuilderImpl;
    } | undefined, text: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeBuilderImpl.$go$private$checker$newStringLiteralEx(b, text, false);
    }
    static $go$private$checker$newStringLiteralEx(b: {
        value: NodeBuilderImpl;
    } | undefined, text: gostring, isSingleQuote: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let flags = TokenFlagsNone$constant__from_ast();
        if (isSingleQuote || !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder()) >>> 0 === 0)) {
            flags = flags | 65536;
        }
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text, flags);
        return node;
    }
    static $go$private$checker$parameterToParameterDeclarationName(b: {
        value: NodeBuilderImpl;
    } | undefined, parameterSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, parameterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (parameterDeclaration === undefined || Node__from_ast.Name(parameterDeclaration) === undefined) {
            return NodeBuilderImpl.$go$private$checker$newIdentifier(b, Symbol__from_ast.$storageOf(((parameterSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, parameterSymbol);
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name(parameterDeclaration);
        switch (Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast(): {
                let cloned: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name);
                EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, cloned, EFNoAsciiEscaping$constant__from_printer());
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.store(cloned, parameterSymbol);
                return cloned;
                break;
            }
            case KindQualifiedName$constant__from_ast(): {
                let cloned: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (Node__from_ast.AsQualifiedName(name) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right);
                EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, cloned, EFNoAsciiEscaping$constant__from_printer());
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.store(cloned, parameterSymbol);
                return cloned;
                break;
            }
            default: {
                return NodeBuilderImpl.$go$private$checker$cloneBindingName(b, name);
                break;
            }
        }
    }
    static $go$private$checker$pseudoParameterToNode(b: {
        value: NodeBuilderImpl;
    } | undefined, p: PseudoParameter__from_pseudochecker | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let dotDotDot: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let questionMark: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Rest) {
            dotDotDot = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindDotDotDotToken$constant__from_ast());
        }
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional) {
            questionMark = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindQuestionToken$constant__from_ast());
        }
        let parameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, dotDotDot, NodeBuilderImpl.$go$private$checker$parameterToParameterDeclarationName(b, Node__from_ast.Symbol(Node__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), Node__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), questionMark, NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type), void 0);
        {
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (IsParameterDeclaration__from_ast(original)) {
                NodeBuilderImpl.$go$private$checker$setCommentRange(b, parameter, original);
            }
        }
        return parameter;
    }
    static $go$private$checker$pseudoParametersEquivalentToParameters(b: {
        value: NodeBuilderImpl;
    } | undefined, params: RuntimeSlice<PseudoParameter__from_pseudochecker | undefined>, targetSig: tsonicTypeScriptRuntime.Location<Signature> | undefined, reportErrors: bool, nonParamErrorLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        if (!(Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter === undefined) && params.length === 0) {
            if (reportErrors) {
                const __gotots_receiver_55: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_137 = nonParamErrorLocation;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_55).ReportInferenceFallback(__gotots_argument_137);
            }
            return false;
        }
        else if (!(Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter === undefined) && IsThisIdentifier__from_ast((params.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name)) {
            let targetParam: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter;
            let paramType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetParam);
            if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (params.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type, paramType, (params.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional, false)) {
                if (reportErrors) {
                    const __gotots_receiver_56: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_138 = Node__from_ast.$storageOf((((params.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_56).ReportInferenceFallback(__gotots_argument_138);
                }
                return false;
            }
            params = params.slice(1, null, null);
        }
        else if (!(Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter === undefined)) {
            if (reportErrors) {
                const __gotots_receiver_57: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_139 = nonParamErrorLocation;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_57).ReportInferenceFallback(__gotots_argument_139);
            }
            return false;
        }
        if (Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters.length !== params.length) {
            if (reportErrors) {
                const __gotots_receiver_58: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_140 = nonParamErrorLocation;
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_58).ReportInferenceFallback(__gotots_argument_140);
            }
            return false;
        }
        const __gotots_range_39 = params;
        for (let __gotots_range_index_37 = 0; __gotots_range_index_37 < __gotots_range_39.length; __gotots_range_index_37++) {
            const __gotots_range_value_45 = __gotots_range_index_37;
            const __gotots_range_value_46 = __gotots_range_39.get(__gotots_range_index_37);
            let i = __gotots_range_value_45;
            let p: PseudoParameter__from_pseudochecker | undefined = __gotots_range_value_46;
            let targetParam: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters.get(i);
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional !== Checker.$go$private$checker$isOptionalParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Symbol__from_ast.$storageOf(((targetParam ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                if (reportErrors) {
                    const __gotots_receiver_59: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_141 = Node__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_59).ReportInferenceFallback(__gotots_argument_141);
                }
                return false;
            }
            let paramType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetParam);
            if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type, paramType, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional, false)) {
                if (reportErrors) {
                    const __gotots_receiver_60: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_142 = Node__from_ast.$storageOf((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_60).ReportInferenceFallback(__gotots_argument_142);
                }
                return false;
            }
        }
        return true;
    }
    static $go$private$checker$pseudoParametersToNodeList(b: {
        value: NodeBuilderImpl;
    } | undefined, params: RuntimeSlice<PseudoParameter__from_pseudochecker | undefined>): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        let res = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, params.length, void 0);
        const __gotots_range_46 = params;
        for (let __gotots_range_index_44 = 0; __gotots_range_index_44 < __gotots_range_46.length; __gotots_range_index_44++) {
            const __gotots_range_value_53 = __gotots_range_46.get(__gotots_range_index_44);
            let p: PseudoParameter__from_pseudochecker | undefined = __gotots_range_value_53;
            res = res.append(void 0, [NodeBuilderImpl.$go$private$checker$pseudoParameterToNode(b, p)]);
        }
        return NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, res);
    }
    static $go$private$checker$pseudoReturnTypeMatchesPredicate(b: {
        value: NodeBuilderImpl;
    } | undefined, rt: PseudoType__from_pseudochecker | undefined, predicate: {
        value: TypePredicate;
    } | undefined): bool {
        if (!((rt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindDirect$constant__from_pseudochecker())) {
            return false;
        }
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeDirect(rt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeNode;
        if (!IsTypePredicateNode__from_ast(node)) {
            return false;
        }
        let tp: {
            value: TypePredicateNode__from_ast;
        } | undefined = Node__from_ast.AsTypePredicateNode(node);
        let isAsserts = !((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssertsModifier === undefined);
        let predicateIsAsserts = (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsThis$constant() || (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsIdentifier$constant();
        if (isAsserts !== predicateIsAsserts) {
            return false;
        }
        let isThis = IsThisTypeNode__from_ast((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName);
        let predicateIsThis = (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindThis$constant() || (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsThis$constant();
        if (isThis !== predicateIsThis) {
            return false;
        }
        if (!isThis) {
            if (Node__from_ast.Text((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ParameterName) !== (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parameterName) {
                return false;
            }
        }
        if (!((predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t === undefined)) {
            if ((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined) {
                return false;
            }
            let predicateTypeFromNode: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeFromTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
            if (!tsonicTypeScriptRuntime.sameLocation(predicateTypeFromNode, (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t)) {
                if (!(Checker.$go$private$checker$compareTypesIdentical((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, predicateTypeFromNode, (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t) === TernaryTrue$constant())) {
                    return false;
                }
            }
        }
        else if (!((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined)) {
            return false;
        }
        return true;
    }
    static $go$private$checker$pseudoTypeEquivalentToType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: PseudoType__from_pseudochecker | undefined, type_: tsonicTypeScriptRuntime.Location<Type> | undefined, isOptionalAnnotated: bool, reportErrors: bool): bool {
        if (!(type_ === undefined) && Checker.$go$private$checker$isErrorType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_)) {
            return true;
        }
        let typeFromPseudo: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, t);
        if (tsonicTypeScriptRuntime.sameLocation(typeFromPseudo, type_)) {
            return true;
        }
        if (!(typeFromPseudo === undefined) && !(type_ === undefined)) {
            if (isOptionalAnnotated) {
                let undefinedStripped: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeWithFacts((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_, TypeFactsNEUndefined$constant());
                if (tsonicTypeScriptRuntime.sameLocation(undefinedStripped, typeFromPseudo)) {
                    return true;
                }
                if (!((((typeFromPseudo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && !((((undefinedStripped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                    if (Checker.$go$private$checker$compareTypesIdentical((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeFromPseudo, undefinedStripped) === TernaryTrue$constant()) {
                        return true;
                    }
                }
            }
            if (tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getRegularTypeOfLiteralType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeFromPseudo), Checker.$go$private$checker$getRegularTypeOfLiteralType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_))) {
                return true;
            }
            if (!((((typeFromPseudo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && !((((type_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                if (Checker.$go$private$checker$compareTypesIdentical((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeFromPseudo, type_) === TernaryTrue$constant()) {
                    return true;
                }
            }
        }
        switch ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
            case PseudoTypeKindInferred$constant__from_pseudochecker(): {
                {
                    let errorNodes = (PseudoType__from_pseudochecker.AsPseudoTypeInferred(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes;
                    if (errorNodes.length > 0) {
                        if (reportErrors) {
                            const __gotots_range_29 = errorNodes;
                            for (let __gotots_range_index_27 = 0; __gotots_range_index_27 < __gotots_range_29.length; __gotots_range_index_27++) {
                                const __gotots_range_value_34 = __gotots_range_29.get(__gotots_range_index_27);
                                let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_34;
                                const __gotots_receiver_36: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                const __gotots_argument_115 = n;
                                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_36).ReportInferenceFallback(__gotots_argument_115);
                            }
                        }
                        return false;
                    }
                }
                if (reportErrors) {
                    const __gotots_receiver_37: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_116 = (PseudoType__from_pseudochecker.AsPseudoTypeInferred(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Expression;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_37).ReportInferenceFallback(__gotots_argument_116);
                }
                return false;
                break;
            }
            case PseudoTypeKindObjectLiteral$constant__from_pseudochecker(): {
                let pt: PseudoTypeObjectLiteral__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeObjectLiteral(t);
                if (type_ === undefined) {
                    return false;
                }
                let targetProps = Checker.$go$private$checker$getPropertiesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_);
                let targetDeclCount = 0;
                const __gotots_range_30 = targetProps;
                for (let __gotots_range_index_28 = 0; __gotots_range_index_28 < __gotots_range_30.length; __gotots_range_index_28++) {
                    const __gotots_range_value_35 = __gotots_range_30.get(__gotots_range_index_28);
                    let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_35;
                    targetDeclCount += Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length;
                }
                if ((pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements.length !== targetDeclCount) {
                    return false;
                }
                const __gotots_range_31 = (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements;
                for (let __gotots_range_index_29 = 0; __gotots_range_index_29 < __gotots_range_31.length; __gotots_range_index_29++) {
                    const __gotots_range_value_36 = __gotots_range_31.get(__gotots_range_index_29);
                    let e: PseudoObjectElement__from_pseudochecker | undefined = __gotots_range_value_36;
                    let targetProp: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = void 0;
                    let elemSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(elemSymbol === undefined)) {
                        targetProp = Checker.$go$private$checker$getPropertyOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_, Symbol__from_ast.$storageOf(((elemSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                    }
                    if (targetProp === undefined) {
                        const __gotots_range_32 = targetProps;
                        for (let __gotots_range_index_30 = 0; __gotots_range_index_30 < __gotots_range_32.length; __gotots_range_index_30++) {
                            const __gotots_range_value_37 = __gotots_range_32.get(__gotots_range_index_30);
                            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_37;
                            if (!(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) &&
                                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Symbol__from_ast.$storageOf(((prop ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration), (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name)) {
                                targetProp = prop;
                                break;
                            }
                        }
                        if (targetProp === undefined) {
                            if (reportErrors) {
                                const __gotots_receiver_38: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                const __gotots_argument_117 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_38).ReportInferenceFallback(__gotots_argument_117);
                            }
                            return false;
                        }
                    }
                    let targetIsOptional = !((Symbol__from_ast.$storageOf(((targetProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsOptional$constant__from_ast()) >>> 0 === 0);
                    if ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional !== targetIsOptional) {
                        if (reportErrors) {
                            const __gotots_receiver_39: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            const __gotots_argument_118 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_39).ReportInferenceFallback(__gotots_argument_118);
                        }
                        return false;
                    }
                    let propType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetProp);
                    propType = Checker.$go$private$checker$removeMissingType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propType, targetIsOptional);
                    switch ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
                        case PseudoObjectElementKindPropertyAssignment$constant__from_pseudochecker(): {
                            let d: PseudoPropertyAssignment__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoPropertyAssignment(e);
                            if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type, propType, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Optional, false)) {
                                if (reportErrors) {
                                    if (((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant__from_pseudochecker() && (PseudoType__from_pseudochecker.AsPseudoTypeInferred((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes.length > 0) {
                                        const __gotots_range_33 = (PseudoType__from_pseudochecker.AsPseudoTypeInferred((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes;
                                        for (let __gotots_range_index_31 = 0; __gotots_range_index_31 < __gotots_range_33.length; __gotots_range_index_31++) {
                                            const __gotots_range_value_38 = __gotots_range_33.get(__gotots_range_index_31);
                                            let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_38;
                                            const __gotots_receiver_40: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                            const __gotots_argument_119 = n;
                                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_40).ReportInferenceFallback(__gotots_argument_119);
                                        }
                                    }
                                    else if (!isStructuralPseudoType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type)) {
                                        const __gotots_receiver_41: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                        const __gotots_argument_120 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_41).ReportInferenceFallback(__gotots_argument_120);
                                    }
                                }
                                return false;
                            }
                            break;
                        }
                        case PseudoObjectElementKindMethod$constant__from_pseudochecker(): {
                            let d: PseudoObjectMethod__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoObjectMethod(e);
                            let targetSig: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSingleCallSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, propType);
                            if (targetSig === undefined) {
                                continue;
                            }
                            let paramEq = NodeBuilderImpl.$go$private$checker$pseudoParametersEquivalentToParameters(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameters, targetSig, reportErrors, Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            if (!paramEq) {
                                return false;
                            }
                            let targetPredicate: {
                                value: TypePredicate;
                            } | undefined = Checker.$go$private$checker$getTypePredicateOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetSig);
                            if (!(targetPredicate === undefined)) {
                                if (!NodeBuilderImpl.$go$private$checker$pseudoReturnTypeMatchesPredicate(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType, targetPredicate)) {
                                    if (reportErrors) {
                                        const __gotots_receiver_42: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                        const __gotots_argument_121 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_42).ReportInferenceFallback(__gotots_argument_121);
                                    }
                                    return false;
                                }
                            }
                            else if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType, Checker.$go$private$checker$getReturnTypeOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetSig), false, false)) {
                                if (reportErrors) {
                                    const __gotots_receiver_43: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                    const __gotots_argument_122 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_43).ReportInferenceFallback(__gotots_argument_122);
                                }
                                return false;
                            }
                            break;
                        }
                        case PseudoObjectElementKindGetAccessor$constant__from_pseudochecker(): {
                            let d: PseudoGetAccessor__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoGetAccessor(e);
                            if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type, propType, false, false)) {
                                if (reportErrors) {
                                    const __gotots_receiver_44: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                    const __gotots_argument_123 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_44).ReportInferenceFallback(__gotots_argument_123);
                                }
                                return false;
                            }
                            break;
                        }
                        case PseudoObjectElementKindSetAccessor$constant__from_pseudochecker(): {
                            let d: PseudoSetAccessor__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoSetAccessor(e);
                            let writeType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getWriteTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetProp);
                            if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type, writeType, false, false)) {
                                if (reportErrors) {
                                    const __gotots_receiver_45: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                    const __gotots_argument_124 = Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_45).ReportInferenceFallback(__gotots_argument_124);
                                }
                                return false;
                            }
                            break;
                        }
                    }
                }
                return true;
                break;
            }
            case PseudoTypeKindTuple$constant__from_pseudochecker(): {
                let pt: PseudoTypeTuple__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeTuple(t);
                if (type_ === undefined || !isTupleType(type_)) {
                    return false;
                }
                let tupleTarget: {
                    value: TupleType;
                } | undefined = Type.TargetTupleType(type_);
                if (!(((tupleTarget ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.combinedFlags & ElementFlagsNonRequired$constant()) >>> 0 === 0)) {
                    return false;
                }
                let elementTypes = Checker.$go$private$checker$getTypeArguments((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_);
                if ((pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements.length !== elementTypes.length) {
                    return false;
                }
                const __gotots_range_34 = (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements;
                for (let __gotots_range_index_32 = 0; __gotots_range_index_32 < __gotots_range_34.length; __gotots_range_index_32++) {
                    const __gotots_range_value_39 = __gotots_range_index_32;
                    const __gotots_range_value_40 = __gotots_range_34.get(__gotots_range_index_32);
                    let i = __gotots_range_value_39;
                    let elem: PseudoType__from_pseudochecker | undefined = __gotots_range_value_40;
                    if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, elem, elementTypes.get(i), false, reportErrors)) {
                        return false;
                    }
                }
                return true;
                break;
            }
            case PseudoTypeKindSingleCallSignature$constant__from_pseudochecker(): {
                let targetSig: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSingleCallSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, type_);
                if (targetSig === undefined) {
                    return false;
                }
                let pt: PseudoTypeSingleCallSignature__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeSingleCallSignature(t);
                if (Signature.$storageOf(((targetSig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters.length !== (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters.length) {
                    if (reportErrors) {
                        const __gotots_receiver_46: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                        const __gotots_argument_125 = (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature;
                        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_46).ReportInferenceFallback(__gotots_argument_125);
                    }
                    return false;
                }
                let paramEq = NodeBuilderImpl.$go$private$checker$pseudoParametersEquivalentToParameters(b, (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameters, targetSig, reportErrors, (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature);
                if (!paramEq) {
                    return false;
                }
                let targetPredicate: {
                    value: TypePredicate;
                } | undefined = Checker.$go$private$checker$getTypePredicateOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetSig);
                if (!(targetPredicate === undefined)) {
                    if (!NodeBuilderImpl.$go$private$checker$pseudoReturnTypeMatchesPredicate(b, (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType, targetPredicate)) {
                        if (reportErrors) {
                            const __gotots_receiver_47: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            const __gotots_argument_126 = (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_47).ReportInferenceFallback(__gotots_argument_126);
                        }
                        return false;
                    }
                }
                else if (!NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType, Checker.$go$private$checker$getReturnTypeOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, targetSig), false, reportErrors)) {
                    return false;
                }
                return true;
                break;
            }
            case PseudoTypeKindNoResult$constant__from_pseudochecker(): {
                if (reportErrors) {
                    const __gotots_receiver_48: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_127 = (PseudoType__from_pseudochecker.AsPseudoTypeNoResult(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Declaration;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_48).ReportInferenceFallback(__gotots_argument_127);
                }
                return false;
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static $go$private$checker$pseudoTypeToNode(b: {
        value: NodeBuilderImpl;
    } | undefined, t: PseudoType__from_pseudochecker | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    Assert__from_debug(!(t === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Attempted to serialize nil pseudotype")]));
                    switch ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
                        case PseudoTypeKindDirect$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$reuseTypeNode(b, (PseudoType__from_pseudochecker.AsPseudoTypeDirect(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeNode);
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindInferred$constant__from_pseudochecker(): {
                            let inferred: PseudoTypeInferred__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeInferred(t);
                            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (inferred ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Expression;
                            {
                                let errorNodes = (inferred ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes;
                                if (errorNodes.length > 0) {
                                    const __gotots_range_40 = errorNodes;
                                    for (let __gotots_range_index_38 = 0; __gotots_range_index_38 < __gotots_range_40.length; __gotots_range_index_38++) {
                                        const __gotots_range_value_47 = __gotots_range_40.get(__gotots_range_index_38);
                                        let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_47;
                                        const __gotots_receiver_61: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                        const __gotots_argument_143 = n;
                                        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_61).ReportInferenceFallback(__gotots_argument_143);
                                    }
                                }
                                else if (IsEntityNameExpression__from_ast(node) && IsDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                                    const __gotots_receiver_62: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                    const __gotots_argument_144 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_62).ReportInferenceFallback(__gotots_argument_144);
                                }
                                else {
                                    const __gotots_receiver_63: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                                    const __gotots_argument_145 = node;
                                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_63).ReportInferenceFallback(__gotots_argument_145);
                                }
                            }
                            if (IsReturnStatement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                                let enclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetContainingFunction__from_ast(node);
                                if (IsAccessor__from_ast(enclosing)) {
                                    __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, enclosing, void 0, void 0, false);
                                    break __gotots_return_block_0;
                                }
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeReturnTypeForSignature(b, Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, enclosing), false);
                                break __gotots_return_block_0;
                            }
                            if (IsArrowFunction__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                                tsonicTypeScriptRuntime.sameLocation((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                    FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsArrowFunction(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body, node)) {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeReturnTypeForSignature(b, Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), false);
                                break __gotots_return_block_0;
                            }
                            if (IsDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, void 0, void 0, false);
                                break __gotots_return_block_0;
                            }
                            let ty: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node);
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, ty);
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindNoResult$constant__from_pseudochecker(): {
                            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeNoResult(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Declaration;
                            const __gotots_receiver_64: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            const __gotots_argument_146 = node;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_64).ReportInferenceFallback(__gotots_argument_146);
                            if (IsFunctionLike__from_ast(node) && !IsAccessor__from_ast(node)) {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeReturnTypeForSignature(b, Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node), false);
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, node, void 0, void 0, false);
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindMaybeConstLocation$constant__from_pseudochecker(): {
                            let d: PseudoTypeMaybeConstLocation__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeMaybeConstLocation(t);
                            let isInConstContext = Checker.$go$private$checker$isConstContext((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node);
                            if (!isInConstContext && IsInConstContext__from_pseudochecker((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node)) {
                                let contextualType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getContextualType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node, ContextFlagsNone$constant());
                                let t__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ConstType);
                                if (!(t__shadow_1 === undefined) && Checker.$go$private$checker$isLiteralOfContextualType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t__shadow_1, Checker.$go$private$checker$instantiateContextualType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, contextualType, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node, ContextFlagsNone$constant()))) {
                                    isInConstContext = true;
                                }
                            }
                            if (isInConstContext) {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ConstType);
                                break __gotots_return_block_0;
                            }
                            else {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).RegularType);
                                break __gotots_return_block_0;
                            }
                            break;
                        }
                        case PseudoTypeKindUnion$constant__from_pseudochecker(): {
                            let res = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                            let hasElidedType = false;
                            let members = (PseudoType__from_pseudochecker.AsPseudoTypeUnion(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Types;
                            const __gotots_range_41 = members;
                            for (let __gotots_range_index_39 = 0; __gotots_range_index_39 < __gotots_range_41.length; __gotots_range_index_39++) {
                                const __gotots_range_value_48 = __gotots_range_41.get(__gotots_range_index_39);
                                let m: PseudoType__from_pseudochecker | undefined = __gotots_range_value_48;
                                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks) {
                                    if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindUndefined$constant__from_pseudochecker() || (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNull$constant__from_pseudochecker()) {
                                        hasElidedType = true;
                                        continue;
                                    }
                                }
                                res = res.append(void 0, [NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, m)]);
                            }
                            if (res.length === 1) {
                                __gotots_return_0 = res.get(0);
                                break __gotots_return_block_0;
                            }
                            if (res.length === 0) {
                                if (hasElidedType) {
                                    __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
                                    break __gotots_return_block_0;
                                }
                                __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast());
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = NodeFactory__from_ast.NewUnionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, res));
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindUndefined$constant__from_pseudochecker(): {
                            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks) {
                                __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindUndefinedKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindNull$constant__from_pseudochecker(): {
                            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks) {
                                __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNullKeyword$constant__from_ast()));
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindAny$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindString$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindStringKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindNumber$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNumberKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindBigInt$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindBigIntKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindBoolean$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindBooleanKeyword$constant__from_ast());
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindFalse$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindFalseKeyword$constant__from_ast()));
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindTrue$constant__from_pseudochecker(): {
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindTrueKeyword$constant__from_ast()));
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindSingleCallSignature$constant__from_pseudochecker(): {
                            let d: PseudoTypeSingleCallSignature__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeSingleCallSignature(t);
                            let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature);
                            let expandedParams = Checker.$go$private$checker$getExpandedParameters((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature, true).get(0);
                            let cleanup: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$enterNewScope(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Signature, expandedParams, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).mapper);
                            const __gotots_callee_38: (() => void) | undefined = cleanup;
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_38);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                            let typeParams: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                            if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters.length > 0) {
                                let res = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters.length, void 0);
                                const __gotots_range_42 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters;
                                for (let __gotots_range_index_40 = 0; __gotots_range_index_40 < __gotots_range_42.length; __gotots_range_index_40++) {
                                    const __gotots_range_value_49 = __gotots_range_42.get(__gotots_range_index_40);
                                    let tp: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined = __gotots_range_value_49;
                                    const __gotots_argument_148 = res;
                                    const __gotots_receiver_65 = b;
                                    const __gotots_store_130 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        TypeParameterDeclaration__from_ast.$storageOf(((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).NodeBase));
                                    const __gotots_argument_147 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                                    const __gotots_argument_149 = NodeBuilderImpl.$go$private$checker$reuseNode(__gotots_receiver_65, __gotots_argument_147);
                                    res = __gotots_argument_148.append(void 0, [__gotots_argument_149]);
                                }
                                typeParams = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, res);
                            }
                            let params: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$pseudoParametersToNodeList(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameters);
                            let returnType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType);
                            __gotots_return_0 = NodeFactory__from_ast.NewFunctionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParams, params, returnType);
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindTuple$constant__from_pseudochecker(): {
                            let res = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                            let elements = (PseudoType__from_pseudochecker.AsPseudoTypeTuple(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements;
                            const __gotots_range_43 = elements;
                            for (let __gotots_range_index_41 = 0; __gotots_range_index_41 < __gotots_range_43.length; __gotots_range_index_41++) {
                                const __gotots_range_value_50 = __gotots_range_43.get(__gotots_range_index_41);
                                let e: PseudoType__from_pseudochecker | undefined = __gotots_range_value_50;
                                res = res.append(void 0, [NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, e)]);
                            }
                            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTupleTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, res));
                            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result, EFSingleLine$constant__from_printer());
                            __gotots_return_0 = NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast(), result);
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindObjectLiteral$constant__from_pseudochecker(): {
                            let elements = (PseudoType__from_pseudochecker.AsPseudoTypeObjectLiteral(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Elements;
                            if (elements.length === 0) {
                                let result__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeLiteralNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()));
                                EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result__shadow_1, EFSingleLine$constant__from_printer());
                                __gotots_return_0 = result__shadow_1;
                                break __gotots_return_block_0;
                            }
                            let isConst = Checker.$go$private$checker$isConstContext((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((elements.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                            let newElements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, elements.length, void 0);
                            let restoreObjectLiteralFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
                            const __gotots_store_131 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_131.flags = (__gotots_store_131.flags | 4194304) >>> 0;
                            const __gotots_range_44 = elements;
                            for (let __gotots_range_index_42 = 0; __gotots_range_index_42 < __gotots_range_44.length; __gotots_range_index_42++) {
                                const __gotots_range_value_51 = __gotots_range_44.get(__gotots_range_index_42);
                                let e: PseudoObjectElement__from_pseudochecker | undefined = __gotots_range_value_51;
                                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                                if (isConst || ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoObjectElementKindPropertyAssignment$constant__from_pseudochecker() && (PseudoObjectElement__from_pseudochecker.AsPseudoPropertyAssignment(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Readonly)) {
                                    modifiers = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewModifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast())]));
                                }
                                let cleanup: (() => void) | undefined;
                                if (!((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoObjectElementKindPropertyAssignment$constant__from_pseudochecker())) {
                                    let signature: tsonicTypeScriptRuntime.Location<Signature> | undefined = Checker.$go$private$checker$getSignatureFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, PseudoObjectElement__from_pseudochecker.Signature(e));
                                    let expandedParams = Checker.$go$private$checker$getExpandedParameters((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature, true).get(0);
                                    cleanup = NodeBuilderImpl.$go$private$checker$enterNewScope(b, PseudoObjectElement__from_pseudochecker.Signature(e), expandedParams, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).mapper);
                                }
                                let newProp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                                switch ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
                                    case PseudoObjectElementKindMethod$constant__from_pseudochecker(): {
                                        let d: PseudoObjectMethod__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoObjectMethod(e);
                                        let typeParams: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                                        if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters.length > 0) {
                                            let res = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters.length, void 0);
                                            const __gotots_range_45 = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeParameters;
                                            for (let __gotots_range_index_43 = 0; __gotots_range_index_43 < __gotots_range_45.length; __gotots_range_index_43++) {
                                                const __gotots_range_value_52 = __gotots_range_45.get(__gotots_range_index_43);
                                                let tp: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined = __gotots_range_value_52;
                                                const __gotots_argument_151 = res;
                                                const __gotots_receiver_66 = b;
                                                const __gotots_store_132 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                                    TypeParameterDeclaration__from_ast.$storageOf(((tp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).NodeBase));
                                                const __gotots_argument_150 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_132, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                                                const __gotots_argument_152 = NodeBuilderImpl.$go$private$checker$reuseNode(__gotots_receiver_66, __gotots_argument_150);
                                                res = __gotots_argument_151.append(void 0, [__gotots_argument_152]);
                                            }
                                            typeParams = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, res);
                                        }
                                        if (isConst) {
                                            newProp = NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, NodeBuilderImpl.$go$private$checker$reuseName(b, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name, false), void 0, NodeFactory__from_ast.NewFunctionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParams, NodeBuilderImpl.$go$private$checker$pseudoParametersToNodeList(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameters), NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType)), void 0);
                                            break;
                                        }
                                        newProp = NodeFactory__from_ast.NewMethodSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, NodeBuilderImpl.$go$private$checker$reuseName(b, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name, true), void 0, typeParams, NodeBuilderImpl.$go$private$checker$pseudoParametersToNodeList(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameters), NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReturnType));
                                        break;
                                    }
                                    case PseudoObjectElementKindPropertyAssignment$constant__from_pseudochecker(): {
                                        let d: PseudoPropertyAssignment__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoPropertyAssignment(e);
                                        newProp = NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, NodeBuilderImpl.$go$private$checker$reuseName(b, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name, false), void 0, NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type), void 0);
                                        break;
                                    }
                                    case PseudoObjectElementKindSetAccessor$constant__from_pseudochecker(): {
                                        let d: PseudoSetAccessor__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoSetAccessor(e);
                                        newProp = NodeFactory__from_ast.NewSetAccessorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeBuilderImpl.$go$private$checker$reuseName(b, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name, false), void 0, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeBuilderImpl.$go$private$checker$pseudoParameterToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Parameter)])), void 0, void 0, void 0);
                                        break;
                                    }
                                    case PseudoObjectElementKindGetAccessor$constant__from_pseudochecker(): {
                                        let d: PseudoGetAccessor__from_pseudochecker | undefined = PseudoObjectElement__from_pseudochecker.AsPseudoGetAccessor(e);
                                        newProp = NodeFactory__from_ast.NewGetAccessorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeBuilderImpl.$go$private$checker$reuseName(b, (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name, false), void 0, void 0, NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Type), void 0, void 0);
                                        break;
                                    }
                                }
                                if (tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name))) {
                                    EmitContext__from_printer.SetCommentRange((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, newProp, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                                }
                                newElements = newElements.append(void 0, [newProp]);
                                if (!(cleanup === undefined)) {
                                    const __gotots_callee_39 = cleanup;
                                    (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))();
                                }
                            }
                            const __gotots_callee_40 = restoreObjectLiteralFlags;
                            (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))();
                            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeLiteralNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, newElements));
                            if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsMultilineObjectLiterals$constant__from_nodebuilder()) >>> 0 === 0) {
                                EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, result, EFSingleLine$constant__from_printer());
                            }
                            __gotots_return_0 = result;
                            break __gotots_return_block_0;
                            break;
                        }
                        case PseudoTypeKindStringLiteral$constant__from_pseudochecker():
                        case PseudoTypeKindNumericLiteral$constant__from_pseudochecker():
                        case PseudoTypeKindBigIntLiteral$constant__from_pseudochecker(): {
                            let source: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeLiteral(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node;
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$reuseNode(b, source));
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            AssertNever__from_debug(new $goInterfaceAdapter$Named_pseudochecker$PseudoTypeKind((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Unhandled pseudotype kind in pseudotype node construction")]));
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$checker$pseudoTypeToNodeWithCheckerFallback(b: {
        value: NodeBuilderImpl;
    } | undefined, t: PseudoType__from_pseudochecker | undefined, checkerType: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant__from_pseudochecker()) {
            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback) {
                {
                    let errorNodes = (PseudoType__from_pseudochecker.AsPseudoTypeInferred(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes;
                    if (errorNodes.length > 0) {
                        const __gotots_range_35 = errorNodes;
                        for (let __gotots_range_index_33 = 0; __gotots_range_index_33 < __gotots_range_35.length; __gotots_range_index_33++) {
                            const __gotots_range_value_41 = __gotots_range_35.get(__gotots_range_index_33);
                            let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_41;
                            const __gotots_receiver_49: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            const __gotots_argument_128 = n;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_49).ReportInferenceFallback(__gotots_argument_128);
                        }
                    }
                    else {
                        const __gotots_receiver_50: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                        const __gotots_argument_129 = (PseudoType__from_pseudochecker.AsPseudoTypeInferred(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Expression;
                        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_50).ReportInferenceFallback(__gotots_argument_129);
                    }
                }
            }
            let oldSuppress: NodeBuilderContext["suppressReportInferenceFallback"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback;
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = true;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, checkerType);
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = oldSuppress;
            return result;
        }
        else if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindDirect$constant__from_pseudochecker()) {
            let existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeDirect(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeNode;
            if (!NodeBuilderImpl.$go$private$checker$existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(b, existing, checkerType)) {
                if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback) {
                    const __gotots_receiver_51: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_130 = existing;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_51).ReportInferenceFallback(__gotots_argument_130);
                }
                let oldSuppress: NodeBuilderContext["suppressReportInferenceFallback"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback;
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = true;
                let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, checkerType);
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = oldSuppress;
                return result;
            }
        }
        return NodeBuilderImpl.$go$private$checker$pseudoTypeToNode(b, t);
    }
    static $go$private$checker$pseudoTypeToType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: PseudoType__from_pseudochecker | undefined): tsonicTypeScriptRuntime.Location<Type> | undefined {
        Assert__from_debug(!(t === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Attempted to realize nil pseudotype")]));
        switch ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind) {
            case PseudoTypeKindDirect$constant__from_pseudochecker(): {
                return Checker.$go$private$checker$getTypeFromTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (PseudoType__from_pseudochecker.AsPseudoTypeDirect(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeNode);
                break;
            }
            case PseudoTypeKindInferred$constant__from_pseudochecker(): {
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeInferred(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Expression;
                let ty: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getWidenedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getRegularTypeOfExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node));
                return ty;
                break;
            }
            case PseudoTypeKindNoResult$constant__from_pseudochecker(): {
                return void 0;
                break;
            }
            case PseudoTypeKindMaybeConstLocation$constant__from_pseudochecker(): {
                let d: PseudoTypeMaybeConstLocation__from_pseudochecker | undefined = PseudoType__from_pseudochecker.AsPseudoTypeMaybeConstLocation(t);
                if (Checker.$go$private$checker$isConstContext((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node)) {
                    return NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ConstType);
                }
                return NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).RegularType);
                break;
            }
            case PseudoTypeKindUnion$constant__from_pseudochecker(): {
                let res = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
                let hasElidedType = false;
                let members = (PseudoType__from_pseudochecker.AsPseudoTypeUnion(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Types;
                const __gotots_range_38 = members;
                for (let __gotots_range_index_36 = 0; __gotots_range_index_36 < __gotots_range_38.length; __gotots_range_index_36++) {
                    const __gotots_range_value_44 = __gotots_range_38.get(__gotots_range_index_36);
                    let m: PseudoType__from_pseudochecker | undefined = __gotots_range_value_44;
                    if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks) {
                        if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindUndefined$constant__from_pseudochecker() || (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNull$constant__from_pseudochecker()) {
                            hasElidedType = true;
                            continue;
                        }
                    }
                    let t__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, m);
                    if (t__shadow_1 === undefined) {
                        return void 0;
                    }
                    res = res.append(void 0, [t__shadow_1]);
                }
                if (res.length === 1) {
                    return res.get(0);
                }
                if (res.length === 0) {
                    if (hasElidedType) {
                        return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType;
                    }
                    return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.neverType;
                }
                return Checker.$go$private$checker$getUnionType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, res);
                break;
            }
            case PseudoTypeKindUndefined$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.undefinedWideningType;
                break;
            }
            case PseudoTypeKindNull$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.nullWideningType;
                break;
            }
            case PseudoTypeKindAny$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.anyType;
                break;
            }
            case PseudoTypeKindString$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stringType;
                break;
            }
            case PseudoTypeKindNumber$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.numberType;
                break;
            }
            case PseudoTypeKindBigInt$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.bigintType;
                break;
            }
            case PseudoTypeKindBoolean$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.booleanType;
                break;
            }
            case PseudoTypeKindFalse$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.falseType;
                break;
            }
            case PseudoTypeKindTrue$constant__from_pseudochecker(): {
                return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trueType;
                break;
            }
            case PseudoTypeKindStringLiteral$constant__from_pseudochecker():
            case PseudoTypeKindNumericLiteral$constant__from_pseudochecker():
            case PseudoTypeKindBigIntLiteral$constant__from_pseudochecker(): {
                let source: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType__from_pseudochecker.AsPseudoTypeLiteral(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node;
                return Checker.$go$private$checker$getRegularTypeOfExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, source);
                break;
            }
            case PseudoTypeKindObjectLiteral$constant__from_pseudochecker():
            case PseudoTypeKindSingleCallSignature$constant__from_pseudochecker():
            case PseudoTypeKindTuple$constant__from_pseudochecker(): {
                return void 0;
                break;
            }
            default: {
                Fail__from_debug("Unhandled pseudochecker.PseudoTypeKind in pseudoTypeToType");
                return void 0;
                break;
            }
        }
    }
    static $go$private$checker$reuseName(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isMethod: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$reuseNode(b, node);
        if (res === undefined) {
            return res;
        }
        const __gotots_results_12 = TryGetTextOfPropertyName__from_ast(res);
        let text = __gotots_results_12[0];
        let ok = __gotots_results_12[1];
        if (!ok) {
            return res;
        }
        let kind = classifyPropertyName(text, IsStringLiteral__from_ast(res), isMethod);
        if (IsIdentifier__from_ast(res) && kind.$value === propertyNameNodeKindIdentifier$constant().$value) {
            return res;
        }
        if (IsStringLiteral__from_ast(res) && kind.$value === propertyNameNodeKindStringLiteral$constant().$value) {
            return res;
        }
        let renamed: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        switch (kind.$value) {
            case 0: {
                renamed = NodeBuilderImpl.$go$private$checker$newIdentifier(b, text, void 0);
                break;
            }
            case 2: {
                renamed = NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text, TokenFlagsNone$constant__from_ast());
                break;
            }
            default: {
                return res;
                break;
            }
        }
        EmitContext__from_printer.SetOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, renamed, res);
        return NodeBuilderImpl.$go$private$checker$setTextRange(b, renamed, res);
    }
    static $go$private$checker$reuseNode(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return node;
        }
        return NodeBuilderImpl.$go$private$checker$tryReuseExistingNodeHelper(b, node);
    }
    static $go$private$checker$reuseTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return node;
        }
        let r: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$reuseNode(b, node);
        if (!(r === undefined)) {
            if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth >= 0 && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
                NodeBuilderImpl.$go$private$checker$walkNodeForExpandability(b, node);
            }
            return r;
        }
        const __gotots_receiver_67: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
        const __gotots_argument_153 = node;
        goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_67).ReportInferenceFallback(__gotots_argument_153);
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, node, false);
        return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
    }
    static $go$private$checker$rewriteModuleSpecifier(b: {
        value: NodeBuilderImpl;
    } | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lit: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let newName = NodeBuilderImpl.$go$private$checker$getModuleSpecifierOverride(b, parent, lit);
        if (newName.length === 0) {
            return lit;
        }
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, newName, TokenFlagsNone$constant__from_ast());
        EmitContext__from_printer.SetOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, res, lit);
        return res;
    }
    static $go$private$checker$saveRestoreFlags(b: {
        value: NodeBuilderImpl;
    } | undefined): (() => void) | undefined {
        let flags: NodeBuilderContext["flags"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags;
        let internalFlags: NodeBuilderContext["internalFlags"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags;
        let depth: NodeBuilderContext["depth"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.depth;
        return (): void => {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags = flags;
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags = internalFlags;
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.depth = depth;
        };
    }
    static $go$private$checker$serializeConstructors(b: {
        value: NodeBuilderImpl;
    } | undefined, staticType: tsonicTypeScriptRuntime.Location<Type> | undefined, staticBaseType: tsonicTypeScriptRuntime.Location<Type> | undefined, isClass: bool, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let isNonConstructable = !isClass && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsInJSFile__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && Checker.$go$private$checker$getSignaturesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, staticType, SignatureKindConstruct$constant()).length === 0;
        if (isNonConstructable) {
            const __gotots_store_149 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_149.approximateLength = __gotots_store_149.approximateLength + 21;
            const __gotots_argument_175 = ModifierFlagsPrivate$constant__from_ast();
            const __gotots_receiver_76: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_argument_176 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return NodeFactory__from_ast.NewModifier(__gotots_receiver_76, $argument0);
            };
            let modifiers = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_175, __gotots_argument_176);
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewConstructorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers), void 0, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>()), void 0, void 0, void 0)]);
        }
        let signatures = Checker.$go$private$checker$getSignaturesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, staticType, SignatureKindConstruct$constant());
        if (!(staticBaseType === undefined)) {
            let baseSigs = Checker.$go$private$checker$getSignaturesOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, staticBaseType, SignatureKindConstruct$constant());
            if (baseSigs.length === 0 && Every$PointerTo_Named_checker$Signature(signatures, (sig: tsonicTypeScriptRuntime.Location<Signature> | undefined): bool => {
                return Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters.length === 0;
            })) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            }
            if (baseSigs.length === signatures.length) {
                let allMatch = true;
                const __gotots_range_63 = baseSigs;
                for (let __gotots_range_index_60 = 0; __gotots_range_index_60 < __gotots_range_63.length; __gotots_range_index_60++) {
                    const __gotots_range_value_76 = __gotots_range_index_60;
                    let i = __gotots_range_value_76;
                    const __gotots_receiver_78: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                    const __gotots_argument_177 = signatures.get(i);
                    const __gotots_argument_178 = baseSigs.get(i);
                    const __gotots_argument_179 = false;
                    const __gotots_argument_180 = false;
                    const __gotots_argument_181 = true;
                    const __gotots_receiver_77: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                    const __gotots_argument_182 = ($argument0: tsonicTypeScriptRuntime.Location<Type> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): Ternary => {
                        return Checker.$go$private$checker$compareTypesIdentical(__gotots_receiver_77, $argument0, $argument1);
                    };
                    if (!(Checker.$go$private$checker$compareSignaturesIdentical(__gotots_receiver_78, __gotots_argument_177, __gotots_argument_178, __gotots_argument_179, __gotots_argument_180, __gotots_argument_181, __gotots_argument_182) === TernaryTrue$constant())) {
                        allMatch = false;
                        break;
                    }
                }
                if (allMatch) {
                    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                }
            }
            let privateProtected = 0;
            const __gotots_range_64 = signatures;
            for (let __gotots_range_index_61 = 0; __gotots_range_index_61 < __gotots_range_64.length; __gotots_range_index_61++) {
                const __gotots_range_value_77 = __gotots_range_64.get(__gotots_range_index_61);
                let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_77;
                if (!(Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined)) {
                    privateProtected = (privateProtected | (Node__from_ast.ModifierFlags(Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration) & (6)) >>> 0) >>> 0;
                }
            }
            if (!(privateProtected === 0)) {
                const __gotots_receiver_81: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                const __gotots_receiver_80: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                const __gotots_argument_183 = privateProtected;
                const __gotots_receiver_79: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
                const __gotots_argument_184 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                    return NodeFactory__from_ast.NewModifier(__gotots_receiver_79, $argument0);
                };
                const __gotots_argument_185 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_183, __gotots_argument_184);
                const __gotots_argument_186 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_80, __gotots_argument_185);
                const __gotots_argument_187 = void 0;
                const __gotots_argument_188 = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                const __gotots_argument_189 = void 0;
                const __gotots_argument_190 = void 0;
                const __gotots_argument_191 = void 0;
                const __gotots_slice_element_0 = NodeFactory__from_ast.NewConstructorDeclaration(__gotots_receiver_81, __gotots_argument_186, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190, __gotots_argument_191);
                return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
            }
        }
        else if (Every$PointerTo_Named_checker$Signature(signatures, (sig: tsonicTypeScriptRuntime.Location<Signature> | undefined): bool => {
            return Signature.$storageOf(((sig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters.length === 0;
        })) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_65 = signatures;
        for (let __gotots_range_index_62 = 0; __gotots_range_index_62 < __gotots_range_65.length; __gotots_range_index_62++) {
            const __gotots_range_value_78 = __gotots_range_65.get(__gotots_range_index_62);
            let sig: tsonicTypeScriptRuntime.Location<Signature> | undefined = __gotots_range_value_78;
            const __gotots_store_150 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_150.approximateLength = __gotots_store_150.approximateLength + 1;
            result = result.append(void 0, [NodeBuilderImpl.$go$private$checker$signatureToSignatureDeclarationHelper(b, sig, KindConstructor$constant__from_ast(), void 0)]);
        }
        return result;
    }
    static $go$private$checker$serializeIndexSignaturesOfType(b: {
        value: NodeBuilderImpl;
    } | undefined, input: tsonicTypeScriptRuntime.Location<Type> | undefined, baseType: tsonicTypeScriptRuntime.Location<Type> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_66 = Checker.$go$private$checker$getIndexInfosOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, input);
        for (let __gotots_range_index_63 = 0; __gotots_range_index_63 < __gotots_range_66.length; __gotots_range_index_63++) {
            const __gotots_range_value_79 = __gotots_range_66.get(__gotots_range_index_63);
            let info: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = __gotots_range_value_79;
            if (!(baseType === undefined)) {
                let baseInfo: tsonicTypeScriptRuntime.Location<IndexInfo> | undefined = Checker.$go$private$checker$getIndexInfoOfType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, baseType, IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).keyType);
                if (!(baseInfo === undefined) && Checker.$go$private$checker$isTypeIdenticalTo((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, IndexInfo.$storageOf(((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType, IndexInfo.$storageOf(((baseInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexInfo>).value).valueType)) {
                    continue;
                }
            }
            result = result.append(void 0, [NodeBuilderImpl.$go$private$checker$indexInfoToIndexSignatureDeclarationHelper(b, info, void 0)]);
        }
        return result;
    }
    static $go$private$checker$serializeInferredReturnTypeForSignature(b: {
        value: NodeBuilderImpl;
    } | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined, returnType: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let oldSuppressReportInferenceFallback: NodeBuilderContext["suppressReportInferenceFallback"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = true;
        let typePredicate: {
            value: TypePredicate;
        } | undefined = Checker.$go$private$checker$getTypePredicateOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature);
        let returnTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(typePredicate === undefined)) {
            let predicate: {
                value: TypePredicate;
            } | undefined = void 0;
            if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper === undefined)) {
                predicate = Checker.$go$private$checker$instantiateTypePredicate((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typePredicate, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
            }
            else {
                predicate = typePredicate;
            }
            returnTypeNode = NodeBuilderImpl.$go$private$checker$typePredicateToTypePredicateNodeHelper(b, predicate);
        }
        else {
            returnTypeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, returnType);
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = oldSuppressReportInferenceFallback;
        return returnTypeNode;
    }
    static $go$private$checker$serializeNamespaceMember(b: {
        value: NodeBuilderImpl;
    } | undefined, resolved: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        __gotots_control_target_4: {
            if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeAlias$constant__from_ast()) >>> 0 === 0)) {
                return NodeBuilderImpl.$go$private$checker$serializeTypeAliasForNamespace(b, resolved, name);
            }
            else if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnum$constant__from_ast()) >>> 0 === 0)) {
                return NodeBuilderImpl.$go$private$checker$expandEnumDecl(b, resolved);
            }
            else if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
                return NodeBuilderImpl.$go$private$checker$expandClassDecl(b, resolved);
            }
            else if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsInterface$constant__from_ast()) >>> 0 === 0)) {
                return NodeBuilderImpl.$go$private$checker$expandInterfaceDecl(b, resolved);
            }
            else if (!((Symbol__from_ast.$storageOf(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (1536)) >>> 0 === 0)) {
                return NodeBuilderImpl.$go$private$checker$expandModuleDecl(b, resolved);
            }
            else {
                let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getWidenedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, resolved));
                const __gotots_store_151 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_store_151.approximateLength = __gotots_store_151.approximateLength + (name.length + 5);
                return NodeFactory__from_ast.NewVariableStatement((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewVariableDeclarationList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewVariableDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name), void 0, NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, void 0, t, resolved, true), void 0)])), NodeFlagsLet$constant__from_ast()));
            }
        }
    }
    static $go$private$checker$serializePropertiesWithTruncation(b: {
        value: NodeBuilderImpl;
    } | undefined, properties: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, elements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        properties = Filter$PointerTo_Named_ast$Symbol(properties, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return (Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsPrototype$constant__from_ast()) >>> 0 === 0;
        });
        const __gotots_range_61 = properties;
        for (let __gotots_range_index_58 = 0; __gotots_range_index_58 < __gotots_range_61.length; __gotots_range_index_58++) {
            const __gotots_range_value_72 = __gotots_range_index_58;
            const __gotots_range_value_73 = __gotots_range_61.get(__gotots_range_index_58);
            let i = __gotots_range_value_72;
            let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_73;
            if (NodeBuilderImpl.$go$private$checker$checkTruncationLengthIfExpanding(b) && (i + 3 < properties.length - 1)) {
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.expansionTruncated = true;
                let text = fmt__from_gostdlib.Sprintf("... %d more ...", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(properties.length - i - 1)]));
                elements = elements.append(void 0, [NodeFactory__from_ast.NewPropertySignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, text), void 0, void 0, void 0)]);
                elements = NodeBuilderImpl.$go$private$checker$addPropertyToElementList(b, properties.get(properties.length - 1), elements);
                break;
            }
            elements = NodeBuilderImpl.$go$private$checker$addPropertyToElementList(b, p, elements);
        }
        return elements;
    }
    static $go$private$checker$serializeReturnTypeForSignature(b: {
        value: NodeBuilderImpl;
    } | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined, tryReuse: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let suppressAny = !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsSuppressAnyReturnType$constant__from_nodebuilder()) >>> 0 === 0);
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        if (suppressAny) {
            const __gotots_store_114 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_114.flags = (__gotots_store_114.flags & ~256) >>> 0;
        }
        let returnTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let returnType: tsonicTypeScriptRuntime.Location<Type> | undefined = void 0;
        if (!(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined) && !NodeIsSynthesized__from_ast(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration)) {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration);
            let ok = false;
            const __gotots_results_10 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.lookupOk(GetSymbolId__from_ast(__go_symbol));
            returnType = __gotots_results_10[0];
            ok = __gotots_results_10[1];
            if (!ok || returnType === undefined) {
                returnType = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getReturnTypeOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
            }
        }
        else {
            returnType = Checker.$go$private$checker$getReturnTypeOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature);
        }
        if (!(suppressAny && IsTypeAny(returnType))) {
            if (!NodeBuilderImpl.$go$private$checker$isActivelyExpanding(b) && tryReuse && !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) && !(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined) && !NodeIsSynthesized__from_ast(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration)) {
                let declarationSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getSymbolOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration);
                let restore: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$addSymbolTypeToContext(b, declarationSymbol, returnType);
                let pt: PseudoType__from_pseudochecker | undefined = PseudoChecker__from_pseudochecker.GetReturnTypeOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pc, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration);
                if (NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, pt, returnType, false, !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback)) {
                    let typePredicate: {
                        value: TypePredicate;
                    } | undefined = Checker.$go$private$checker$getTypePredicateOfSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, signature);
                    if (!(typePredicate === undefined) && !NodeBuilderImpl.$go$private$checker$pseudoReturnTypeMatchesPredicate(b, pt, typePredicate)) {
                        if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback) {
                            const __gotots_receiver_33: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            const __gotots_argument_109 = Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_33).ReportInferenceFallback(__gotots_argument_109);
                        }
                        pt = void 0;
                    }
                    if (!(pt === undefined)) {
                        returnTypeNode = NodeBuilderImpl.$go$private$checker$pseudoTypeToNodeWithCheckerFallback(b, pt, returnType);
                    }
                }
                const __gotots_callee_32 = restore;
                (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
            if (returnTypeNode === undefined) {
                returnTypeNode = NodeBuilderImpl.$go$private$checker$serializeInferredReturnTypeForSignature(b, signature, returnType);
            }
        }
        if (returnTypeNode === undefined && !suppressAny) {
            returnTypeNode = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
        }
        const __gotots_callee_33 = restoreFlags;
        (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))();
        return returnTypeNode;
    }
    static $go$private$checker$serializeTypeAliasForNamespace(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, name: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let aliasType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDeclaredTypeOfTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        let typeParams = Checker.$go$private$checker$getLocalTypeParametersOfClassOrInterfaceOrTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        let typeParamDecls = Map$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node(typeParams, (p: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, p);
        });
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        const __gotots_store_152 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_152.flags = (__gotots_store_152.flags | 8388608) >>> 0;
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, aliasType);
        const __gotots_callee_41 = restoreFlags;
        (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_store_153 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_153.approximateLength = __gotots_store_153.approximateLength + (8 + name.length);
        return NodeFactory__from_ast.NewTypeAliasDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, void 0, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, name), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamDecls), typeNode);
    }
    static $go$private$checker$serializeTypeForDeclaration(b: {
        value: NodeBuilderImpl;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tryReuse: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (declaration === undefined) {
            if (!(__go_symbol === undefined)) {
                declaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                if (declaration === undefined) {
                    declaration = FirstOrNil$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
                }
            }
        }
        if (__go_symbol === undefined) {
            __go_symbol = Checker.$go$private$checker$getSymbolOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, declaration);
        }
        if (t === undefined) {
            t = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingSymbolTypes.lookup(GetSymbolId__from_ast(__go_symbol));
            if (t === undefined) {
                if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAccessor$constant__from_ast()) >>> 0 === 0) && Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) {
                    t = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getWriteTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
                }
                else if (!(__go_symbol === undefined) && ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (133120)) >>> 0 === 0)) {
                    t = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getWidenedLiteralType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol)), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
                }
                else {
                    t = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorType;
                }
            }
        }
        let requiresAddingUndefined = !(declaration === undefined) && (IsParameterDeclaration__from_ast(declaration) || IsPropertySignatureDeclaration__from_ast(declaration) || IsPropertyDeclaration__from_ast(declaration)) && EmitResolver.$go$private$checker$requiresAddingImplicitUndefined(Checker.GetEmitResolver((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch), declaration, __go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
        let addUndefinedForParameter = requiresAddingUndefined && (IsParameterDeclaration__from_ast(declaration));
        if (addUndefinedForParameter) {
            t = Checker.$go$private$checker$getOptionalType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t, false);
        }
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0) &&
            tsonicTypeScriptRuntime.sameLocation(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, __go_symbol) && (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined || Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(d), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile);
        }))) {
            const __gotots_store_120 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_120.flags = (__gotots_store_120.flags | 1048576) >>> 0;
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let reportedInferenceFallback = false;
        if (!NodeBuilderImpl.$go$private$checker$isActivelyExpanding(b) && tryReuse && !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined) && !(declaration === undefined) && (IsAccessor__from_ast(declaration) || (HasInferredType__from_ast(declaration) && !NodeIsSynthesized__from_ast(declaration) && ((Type.ObjectFlags(t) & ObjectFlagsRequiresWidening$constant()) >>> 0) === 0))) {
            let remove: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$addSymbolTypeToContext(b, __go_symbol, t);
            let pt: PseudoType__from_pseudochecker | undefined = void 0;
            if (IsAccessor__from_ast(declaration)) {
                pt = PseudoChecker__from_pseudochecker.GetTypeOfAccessor((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pc, declaration);
            }
            else {
                pt = PseudoChecker__from_pseudochecker.GetTypeOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pc, declaration);
            }
            if ((pt === undefined || (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNoResult$constant__from_pseudochecker()) && IsBinaryExpression__from_ast(declaration)) {
                {
                    let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, hasTypeAnnotation);
                    if (!(decl === undefined)) {
                        pt = PseudoChecker__from_pseudochecker.GetTypeOfDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pc, decl);
                    }
                }
            }
            let reportErrors = !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback;
            if (NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, pt, t, !requiresAddingUndefined && (IsParameterDeclaration__from_ast(declaration) || IsPropertySignatureDeclaration__from_ast(declaration) || IsPropertyDeclaration__from_ast(declaration)) && isOptionalDeclaration(declaration), reportErrors)) {
                let ptt: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$pseudoTypeToType(b, pt);
                if (!(ptt === undefined) && requiresAddingUndefined && containsNonMissingUndefinedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t) && !containsNonMissingUndefinedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ptt)) {
                    pt = NewPseudoTypeUnion__from_pseudochecker(RuntimeSlice.literal<PseudoType__from_pseudochecker | undefined>([pt, $state__pseudochecker.PseudoTypeUndefined]));
                }
                result = NodeBuilderImpl.$go$private$checker$pseudoTypeToNodeWithCheckerFallback(b, pt, t);
            }
            else {
                reportedInferenceFallback = reportErrors && (pt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant__from_pseudochecker() && (PseudoType__from_pseudochecker.AsPseudoTypeInferred(pt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes.length > 0;
                if (requiresAddingUndefined) {
                    pt = NewPseudoTypeUnion__from_pseudochecker(RuntimeSlice.literal<PseudoType__from_pseudochecker | undefined>([pt, $state__pseudochecker.PseudoTypeUndefined]));
                    if (NodeBuilderImpl.$go$private$checker$pseudoTypeEquivalentToType(b, pt, t, false, reportErrors)) {
                        result = NodeBuilderImpl.$go$private$checker$pseudoTypeToNodeWithCheckerFallback(b, pt, t);
                        reportedInferenceFallback = false;
                    }
                }
            }
            const __gotots_callee_35 = remove;
            (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        if (result === undefined) {
            if (reportedInferenceFallback) {
                let oldSuppress: NodeBuilderContext["suppressReportInferenceFallback"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback;
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = true;
                result = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.suppressReportInferenceFallback = oldSuppress;
            }
            else {
                result = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
            }
        }
        const __gotots_callee_36 = restoreFlags;
        (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))();
        if (result === undefined) {
            return NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
        }
        return result;
    }
    static $go$private$checker$serializeTypeForExpression(b: {
        value: NodeBuilderImpl;
    } | undefined, expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let t: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getWidenedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Checker.$go$private$checker$getRegularTypeOfExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, expr)), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mapper);
        return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
    }
    static $go$private$checker$serializeTypeName(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isTypeOf: bool, typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let meaning = SymbolFlagsType$constant__from_ast();
        if (isTypeOf) {
            meaning = SymbolFlagsValue$constant__from_ast();
        }
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$resolveEntityName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, node, meaning, true, false, node);
        if (__go_symbol === undefined) {
            return void 0;
        }
        let resolvedSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __go_symbol;
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            resolvedSymbol = Checker.$go$private$checker$resolveAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        }
        if (!(Checker.IsSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration, meaning, false).Accessibility === SymbolAccessibilityAccessible$constant__from_printer())) {
            return void 0;
        }
        return NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, resolvedSymbol, meaning, typeArguments);
    }
    static $go$private$checker$setCommentRange(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, range_: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(range_ === undefined) && !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast(range_))) {
            EmitContext__from_printer.AssignCommentRange((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, node, range_);
        }
    }
    static $go$private$checker$setTextRange(b: {
        value: NodeBuilderImpl;
    } | undefined, range_: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (range_ === undefined) {
            return range_;
        }
        if (!NodeIsSynthesized__from_ast(range_) || ((Node__from_ast.$storageOf(((range_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsSynthesized$constant__from_ast()) >>> 0 === 0) || ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile === undefined || !tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast(EmitContext__from_printer.MostOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, range_)))) {
            let original__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = range_;
            range_ = Node__from_ast.Clone(range_, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
            Node__from_ast.$storageOf(((range_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
            {
                const __gotots_results_5 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.lookupOk(original__shadow_1);
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_5[0];
                let ok = __gotots_results_5[1];
                if (ok) {
                    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.idToSymbol.store(range_, __go_symbol);
                }
            }
        }
        if (tsonicTypeScriptRuntime.sameLocation(range_, location)
            || location === undefined) {
            return range_;
        }
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.Original((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, range_);
        for (; !(original === undefined) && !tsonicTypeScriptRuntime.sameLocation(original, location);) {
            original = EmitContext__from_printer.Original((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, original);
        }
        if (original === undefined) {
            EmitContext__from_printer.SetOriginalEx((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, range_, location, true);
        }
        if (!(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingFile, GetSourceFileOfNode__from_ast(EmitContext__from_printer.MostOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, location)))) {
            Node__from_ast.$storageOf(((range_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            return range_;
        }
        else {
            Node__from_ast.$storageOf(((range_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(-1, -1));
        }
        return range_;
    }
    static $go$private$checker$shouldExpandType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, isAlias: bool): bool {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth < 0) {
            return false;
        }
        if (!NodeBuilderImpl.$go$private$checker$isExpandableType(b, t, isAlias)) {
            return false;
        }
        if (NodeBuilderImpl.$go$private$checker$isTypeOnStack(b, t)) {
            return false;
        }
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.depth < ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth) {
            return true;
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth = true;
        return false;
    }
    static $go$private$checker$shouldUsePlaceholderForProperty(b: {
        value: NodeBuilderImpl;
    } | undefined, propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
        if ((Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsReverseMapped$constant__from_ast()) >>> 0 === 0) {
            return false;
        }
        if (Contains$SliceOf_PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Symbol(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack, propertySymbol)) {
            return true;
        }
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.length > 0) {
            let last: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.get(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.length - 1);
            const __gotots_store_123 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_123, "ReverseMappedSymbolLinks"), last)) {
                const __gotots_store_124 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let links: tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "ReverseMappedSymbolLinks"), last);
                let propertyType: tsonicTypeScriptRuntime.Location<Type> | undefined = ReverseMappedSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks>).value).propertyType;
                if (!(propertyType === undefined) && (((propertyType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsAnonymous$constant()) >>> 0 === 0) {
                    return true;
                }
            }
        }
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.length < MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH$int) {
            return false;
        }
        const __gotots_store_125 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        if (!LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_125, "ReverseMappedSymbolLinks"), propertySymbol)) {
            return false;
        }
        const __gotots_store_126 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let propertyLinks: tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "ReverseMappedSymbolLinks"), propertySymbol);
        let propMappedType: tsonicTypeScriptRuntime.Location<Type> | undefined = ReverseMappedSymbolLinks.$storageOf(((propertyLinks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks>).value).mappedType;
        if (propMappedType === undefined || ((propMappedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) {
            return false;
        }
        const __gotots_range_36: NodeBuilderContext["reverseMappedStack"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack;
        for (let __gotots_range_index_34 = 0; __gotots_range_index_34 < __gotots_range_36.length; __gotots_range_index_34++) {
            const __gotots_range_value_42 = __gotots_range_index_34;
            let i = __gotots_range_value_42;
            if (i > MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH$int) {
                break;
            }
            let prop: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.get(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reverseMappedStack.length - 1 - i);
            const __gotots_store_127 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "ReverseMappedSymbolLinks"), prop)) {
                const __gotots_store_128 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let links: tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks> | undefined = LinkStore__from_core.TryGet<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ReverseMappedSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_128, "ReverseMappedSymbolLinks"), prop);
                let mappedType: tsonicTypeScriptRuntime.Location<Type> | undefined = ReverseMappedSymbolLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReverseMappedSymbolLinks>).value).mappedType;
                if (!(mappedType === undefined) &&
                    tsonicTypeScriptRuntime.sameLocation(((mappedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, ((propMappedType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol)) {
                    return true;
                }
            }
        }
        return false;
    }
    static $go$private$checker$shouldWriteTypeOfFunctionSymbol(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeId: TypeId): bool {
        let isStaticMethodSymbol = !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsMethod$constant__from_ast()) >>> 0 === 0) && Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return IsStatic__from_ast(declaration) && !Checker.$go$private$checker$isLateBindableIndexSignature((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, GetNameOfDeclaration__from_ast(declaration));
        });
        let isNonLocalFunctionSymbol = false;
        if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunction$constant__from_ast()) >>> 0 === 0)) {
            if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
                isNonLocalFunctionSymbol = true;
            }
            else {
                const __gotots_range_11 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_11.length; __gotots_range_index_9++) {
                    const __gotots_range_value_15 = __gotots_range_11.get(__gotots_range_index_9);
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
                    if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast()) {
                        isNonLocalFunctionSymbol = true;
                        break;
                    }
                }
            }
        }
        if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
            let __gotots_logical_result_6 = !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseTypeOfFunction$constant__from_nodebuilder()) >>> 0 === 0);
            if (!__gotots_logical_result_6) {
                const __gotots_store_77 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_logical_result_6 = Set__from_collections.Has<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "visitedTypes"), typeId);
            }
            return (__gotots_logical_result_6) && ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseStructuralFallback$constant__from_nodebuilder()) >>> 0 === 0 || Checker.IsValueSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration));
        }
        return false;
    }
    static $go$private$checker$shouldWriteTypeParametersInQualifiedName(b: {
        value: NodeBuilderImpl;
    } | undefined, chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, index: int): bool {
        return !((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteTypeParametersInQualifiedName$constant__from_nodebuilder()) >>> 0 === 0) && index < chain.length - 1;
    }
    static $go$private$checker$signatureToSignatureDeclarationHelper(b: {
        value: NodeBuilderImpl;
    } | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined, kind: Kind__from_ast, options: SignatureToSignatureDeclarationOptions | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeParameters = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_results_7 = NodeBuilderImpl.$go$private$checker$enterSignatureScope(b, signature);
        let expandedParams = __gotots_results_7[0];
        let cleanup: (() => void) | undefined = __gotots_results_7[1];
        const __gotots_store_97 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_97.approximateLength = __gotots_store_97.approximateLength + 3;
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteTypeArgumentsOfSignature$constant__from_nodebuilder()) >>> 0 === 0) && !(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).target === undefined) && !(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).mapper === undefined) && Signature.$storageOf(((Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters.length !== 0) {
            const __gotots_range_14 = Signature.$storageOf(((Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters;
            for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_14.length; __gotots_range_index_12++) {
                const __gotots_range_value_18 = __gotots_range_14.get(__gotots_range_index_12);
                let parameter: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_18;
                typeParameters = typeParameters.append(void 0, [NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Checker.$go$private$checker$instantiateType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parameter, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).mapper))]);
            }
        }
        else {
            const __gotots_range_15 = Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).typeParameters;
            for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_15.length; __gotots_range_index_13++) {
                const __gotots_range_value_19 = __gotots_range_15.get(__gotots_range_index_13);
                let parameter: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_19;
                typeParameters = typeParameters.append(void 0, [NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, parameter)]);
            }
        }
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        const __gotots_store_98 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_98.flags = (__gotots_store_98.flags & ~256) >>> 0;
        let parameters = Map$PointerTo_Named_ast$Symbol$PointerTo_Named_ast$Node(IfElse$SliceOf_PointerTo_Named_ast$Symbol(Some$PointerTo_Named_ast$Symbol(expandedParams, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !tsonicTypeScriptRuntime.sameLocation(p, expandedParams.get(expandedParams.length - 1)) && !((Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsRestParameter$constant__from_ast()) >>> 0 === 0);
        }), Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).parameters, expandedParams), (parameter: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeBuilderImpl.$go$private$checker$symbolToParameterDeclaration(b, parameter, kind === KindConstructor$constant__from_ast());
        });
        let thisParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsOmitThisParameter$constant__from_nodebuilder()) >>> 0 === 0)) {
            thisParameter = void 0;
        }
        else {
            thisParameter = NodeBuilderImpl.$go$private$checker$tryGetThisParameterDeclaration(b, signature);
        }
        if (!(thisParameter === undefined)) {
            parameters = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([thisParameter]), parameters, void 0);
        }
        const __gotots_callee_13 = restoreFlags;
        (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))();
        let returnTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeReturnTypeForSignature(b, signature, true);
        let modifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(options === undefined)) {
            modifiers = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).modifiers;
        }
        if ((kind === KindConstructorType$constant__from_ast()) && !((Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).flags & SignatureFlagsAbstract$constant()) >>> 0 === 0)) {
            let flags = ModifiersToFlags__from_ast(modifiers);
            const __gotots_argument_60 = (flags | ModifierFlagsAbstract$constant__from_ast()) >>> 0;
            const __gotots_receiver_24: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
            const __gotots_argument_61 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return NodeFactory__from_ast.NewModifier(__gotots_receiver_24, $argument0);
            };
            modifiers = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_60, __gotots_argument_61);
        }
        let paramList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, parameters);
        let typeParamList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (typeParameters.length !== 0) {
            typeParamList = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParameters);
        }
        let modifierList: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (modifiers.length > 0) {
            modifierList = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers);
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(options === undefined)) {
            name = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).name;
        }
        if (name === undefined) {
            name = NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, "");
        }
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        __gotots_control_target_3: {
            if (kind === KindCallSignature$constant__from_ast()) {
                node = NodeFactory__from_ast.NewCallSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamList, paramList, returnTypeNode);
            }
            else if (kind === KindConstructSignature$constant__from_ast()) {
                node = NodeFactory__from_ast.NewConstructSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamList, paramList, returnTypeNode);
            }
            else if (kind === KindMethodSignature$constant__from_ast()) {
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!(options === undefined)) {
                    questionToken = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).questionToken;
                }
                node = NodeFactory__from_ast.NewMethodSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, name, questionToken, typeParamList, paramList, returnTypeNode);
            }
            else if (kind === KindMethodDeclaration$constant__from_ast()) {
                node = NodeFactory__from_ast.NewMethodDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, void 0, name, void 0, typeParamList, paramList, returnTypeNode, void 0, void 0);
            }
            else if (kind === KindConstructor$constant__from_ast()) {
                node = NodeFactory__from_ast.NewConstructorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, void 0, paramList, void 0, void 0, void 0);
            }
            else if (kind === KindGetAccessor$constant__from_ast()) {
                node = NodeFactory__from_ast.NewGetAccessorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, name, void 0, paramList, returnTypeNode, void 0, void 0);
            }
            else if (kind === KindSetAccessor$constant__from_ast()) {
                node = NodeFactory__from_ast.NewSetAccessorDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, name, void 0, paramList, void 0, void 0, void 0);
            }
            else if (kind === KindIndexSignature$constant__from_ast()) {
                node = NodeFactory__from_ast.NewIndexSignatureDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, paramList, returnTypeNode);
            }
            else if (kind === KindFunctionType$constant__from_ast()) {
                if (returnTypeNode === undefined) {
                    returnTypeNode = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, ""), void 0);
                }
                node = NodeFactory__from_ast.NewFunctionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeParamList, paramList, returnTypeNode);
            }
            else if (kind === KindConstructorType$constant__from_ast()) {
                if (returnTypeNode === undefined) {
                    returnTypeNode = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, ""), void 0);
                }
                node = NodeFactory__from_ast.NewConstructorTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, typeParamList, paramList, returnTypeNode);
            }
            else if (kind === KindFunctionDeclaration$constant__from_ast()) {
                node = NodeFactory__from_ast.NewFunctionDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, void 0, name, typeParamList, paramList, returnTypeNode, void 0, void 0);
            }
            else if (kind === KindFunctionExpression$constant__from_ast()) {
                node = NodeFactory__from_ast.NewFunctionExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, void 0, name, typeParamList, paramList, returnTypeNode, void 0, NodeFactory__from_ast.NewBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])), false));
            }
            else if (kind === KindArrowFunction$constant__from_ast()) {
                node = NodeFactory__from_ast.NewArrowFunction((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifierList, typeParamList, paramList, returnTypeNode, void 0, void 0, NodeFactory__from_ast.NewBlock((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])), false));
            }
            else {
                const __gotots_argument_62 = new GoInterfaceAdapter("Unhandled kind in signatureToSignatureDeclarationHelper");
                GoPanic.raise(__gotots_argument_62 === undefined ? GoPanicNilValue.create() : __gotots_argument_62);
            }
        }
        const __gotots_callee_14 = cleanup;
        (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))();
        return node;
    }
    static $go$private$checker$sortByBestName(b_: {
        value: NodeBuilderImpl;
    } | undefined, a: sortedSymbolNamePair, b: sortedSymbolNamePair): int {
        let specifierA = sortedSymbolNamePair.$storageOf(a).name;
        let specifierB = sortedSymbolNamePair.$storageOf(b).name;
        if (specifierA.length > 0 && specifierB.length > 0) {
            let isBRelative = PathIsRelative__from_tspath(specifierB);
            if (PathIsRelative__from_tspath(specifierA) === isBRelative) {
                return CountPathComponents__from_modulespecifiers(specifierA) - CountPathComponents__from_modulespecifiers(specifierB);
            }
            if (isBRelative) {
                return -1;
            }
            return 1;
        }
        const __gotots_callee_34: Checker["compareSymbols"] = ((b_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compareSymbols;
        const __gotots_argument_113 = sortedSymbolNamePair.$storageOf(a).sym;
        const __gotots_argument_114 = sortedSymbolNamePair.$storageOf(b).sym;
        return (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_113, __gotots_argument_114);
    }
    static $go$private$checker$symbolToEntityNameNode(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let identifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$newIdentifier(b, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name, __go_symbol);
        if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
            return NodeFactory__from_ast.NewQualifiedName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$symbolToEntityNameNode(b, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent), identifier);
        }
        return identifier;
    }
    static $go$private$checker$symbolToExpression(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, mask: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let chain = NodeBuilderImpl.$go$private$checker$lookupSymbolChain(b, __go_symbol, mask, false);
        return NodeBuilderImpl.$go$private$checker$createExpressionFromSymbolChain(b, chain, chain.length - 1);
    }
    static $go$private$checker$symbolToName(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast, expectsIdentifier: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let chain = NodeBuilderImpl.$go$private$checker$lookupSymbolChain(b, __go_symbol, meaning, false);
        if (expectsIdentifier && chain.length !== 1 && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError && (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowQualifiedNameInPlaceOfIdentifier$constant__from_nodebuilder()) >>> 0 === 0))) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
        }
        return NodeBuilderImpl.$go$private$checker$createEntityNameFromSymbolChain(b, chain, chain.length - 1);
    }
    static $go$private$checker$symbolToNode(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, meaning: SymbolFlags__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags & InternalFlagsWriteComputedProps$constant__from_nodebuilder()) === 0)) {
            if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                if (!(name === undefined) && IsComputedPropertyName__from_ast(name)) {
                    return name;
                }
            }
            const __gotots_store_32 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ValueSymbolLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "valueSymbolLinks"), __go_symbol)) {
                const __gotots_store_33 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let nameType: tsonicTypeScriptRuntime.Location<Type> | undefined = ValueSymbolLinks.$storageOf(((LinkStore$Get$PointerTo_Named_ast$Symbol$Named_checker$ValueSymbolLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "valueSymbolLinks"), __go_symbol) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ValueSymbolLinks>).value).nameType;
                if (!(nameType === undefined) && !((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (49152)) >>> 0 === 0)) {
                    let oldEnclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = Symbol__from_ast.$storageOf(((((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewComputedPropertyName((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$symbolToExpression(b, ((nameType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, meaning));
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration = oldEnclosing;
                    return result;
                }
            }
        }
        return NodeBuilderImpl.$go$private$checker$symbolToExpression(b, __go_symbol, meaning);
    }
    static $go$private$checker$symbolToParameterDeclaration(b: {
        value: NodeBuilderImpl;
    } | undefined, parameterSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, preserveModifierFlags: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let parameterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getEffectiveParameterDeclaration(parameterSymbol);
        let parameterType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parameterSymbol);
        let parameterTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$serializeTypeForDeclaration(b, parameterDeclaration, parameterType, parameterSymbol, true);
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsOmitParameterModifiers$constant__from_nodebuilder()) >>> 0 === 0 && preserveModifierFlags && !(parameterDeclaration === undefined) && CanHaveModifiers__from_ast(parameterDeclaration)) {
            let originals = Filter$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(parameterDeclaration), IsModifier__from_ast);
            let clones = Map$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(originals, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return Node__from_ast.Clone(node, new $goInterfaceAdapter$PointerTo_Named_ast$NodeFactory((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f));
            });
            if (clones.length > 0) {
                modifiers = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, clones);
            }
        }
        let isRest = !(parameterDeclaration === undefined) && isRestParameter(parameterDeclaration) || !((Symbol__from_ast.$storageOf(((parameterSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsRestParameter$constant__from_ast()) >>> 0 === 0);
        let dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isRest) {
            dotDotDotToken = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindDotDotDotToken$constant__from_ast());
        }
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$parameterToParameterDeclarationName(b, parameterSymbol, parameterDeclaration);
        let isOptional = !(parameterDeclaration === undefined) && Checker.$go$private$checker$isOptionalParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parameterDeclaration) || !((Symbol__from_ast.$storageOf(((parameterSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).CheckFlags & CheckFlagsOptionalParameter$constant__from_ast()) >>> 0 === 0);
        let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isOptional) {
            questionToken = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindQuestionToken$constant__from_ast());
        }
        let parameterNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewParameterDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers, dotDotDotToken, name, questionToken, parameterTypeNode, void 0);
        const __gotots_store_113 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_113.approximateLength = __gotots_store_113.approximateLength + (Symbol__from_ast.$storageOf(((parameterSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name.length + 3);
        return parameterNode;
    }
    static $go$private$checker$symbolToTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, mask: SymbolFlags__from_ast, typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let chain = NodeBuilderImpl.$go$private$checker$lookupSymbolChain(b, __go_symbol, mask, ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseAliasDefinedOutsideCurrentScope$constant__from_nodebuilder()) >>> 0 === 0));
        if (chain.length === 0) {
            return void 0;
        }
        let isTypeOf = mask === SymbolFlagsValue$constant__from_ast();
        if (Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((chain.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
            let nonRootParts: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (chain.length > 1) {
                nonRootParts = NodeBuilderImpl.$go$private$checker$createAccessFromSymbolChain(b, chain, chain.length - 1, 1, typeArguments);
            }
            let typeParameterNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = typeArguments;
            if (typeParameterNodes === undefined) {
                typeParameterNodes = NodeBuilderImpl.$go$private$checker$lookupTypeParameterNodes(b, chain, 0);
            }
            let contextFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(EmitContext__from_printer.MostOriginal((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration));
            let targetFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfModule__from_ast(chain.get(0));
            let specifier = "";
            let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (CompilerOptions__from_core.GetModuleResolutionKind(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) === ModuleResolutionKindNode16$constant__from_core() || CompilerOptions__from_core.GetModuleResolutionKind(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) === ModuleResolutionKindNodeNext$constant__from_core()) {
                let __gotots_logical_result_0 = !(targetFile === undefined) && !(contextFile === undefined);
                if (__gotots_logical_result_0) {
                    const __gotots_receiver_2: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
                    const __gotots_argument_2 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(targetFile);
                    __gotots_logical_result_0 = goInterfaceNonNil<Program>(__gotots_receiver_2).GetEmitModuleFormatOfFile(__gotots_argument_2) === ModuleKindESNext$constant__from_core();
                }
                let __gotots_logical_result_1 = __gotots_logical_result_0;
                if (__gotots_logical_result_1) {
                    const __gotots_receiver_3: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
                    const __gotots_argument_3 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(targetFile);
                    const __gotots_equal_operand_0 = goInterfaceNonNil<Program>(__gotots_receiver_3).GetEmitModuleFormatOfFile(__gotots_argument_3);
                    const __gotots_receiver_4: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
                    const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(contextFile);
                    __gotots_logical_result_1 = !(__gotots_equal_operand_0 === goInterfaceNonNil<Program>(__gotots_receiver_4).GetEmitModuleFormatOfFile(__gotots_argument_4));
                }
                if (__gotots_logical_result_1) {
                    specifier = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, chain.get(0), ModuleKindESNext$constant__from_core());
                    attributes = NodeFactory__from_ast.NewImportAttributes((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindWithKeyword$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewImportAttribute((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, "resolution-mode"), NodeBuilderImpl.$go$private$checker$newStringLiteral(b, "import"))])), false);
                }
            }
            if (specifier.length === 0) {
                specifier = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, chain.get(0), ResolutionModeNone$constant__from_core());
            }
            if (((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowNodeModulesRelativePaths$constant__from_nodebuilder()) >>> 0 === 0) && strings__from_gostdlib.Contains(specifier, "/node_modules/")) {
                let oldSpecifier = specifier;
                if (CompilerOptions__from_core.GetModuleResolutionKind(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) === ModuleResolutionKindNode16$constant__from_core() || CompilerOptions__from_core.GetModuleResolutionKind(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerOptions) === ModuleResolutionKindNodeNext$constant__from_core()) {
                    let swappedMode = ModuleKindESNext$constant__from_core();
                    const __gotots_receiver_5: Checker["program"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
                    const __gotots_argument_5 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(contextFile);
                    if (goInterfaceNonNil<Program>(__gotots_receiver_5).GetEmitModuleFormatOfFile(__gotots_argument_5) === ModuleKindESNext$constant__from_core()) {
                        swappedMode = ModuleKindCommonJS$constant__from_core();
                    }
                    specifier = NodeBuilderImpl.$go$private$checker$getSpecifierForModuleSymbol(b, chain.get(0), swappedMode);
                    if (strings__from_gostdlib.Contains(specifier, "/node_modules/")) {
                        specifier = oldSpecifier;
                    }
                    else {
                        let modeStr = "require";
                        if (swappedMode === ModuleKindESNext$constant__from_core()) {
                            modeStr = "import";
                        }
                        attributes = NodeFactory__from_ast.NewImportAttributes((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindWithKeyword$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([NodeFactory__from_ast.NewImportAttribute((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, "resolution-mode"), NodeBuilderImpl.$go$private$checker$newStringLiteral(b, modeStr))])), false);
                    }
                }
                if (attributes === undefined) {
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                    const __gotots_receiver_6: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_6 = oldSpecifier;
                    const __gotots_argument_7 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_6).ReportLikelyUnsafeImportRequiredError(__gotots_argument_6, __gotots_argument_7);
                }
            }
            let lit: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, specifier));
            const __gotots_store_34 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_34.approximateLength = __gotots_store_34.approximateLength + (specifier.length + 10);
            if (nonRootParts === undefined || IsEntityName__from_ast(nonRootParts)) {
                if (!(nonRootParts === undefined)) {
                }
                return NodeFactory__from_ast.NewImportTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, isTypeOf, lit, attributes, nonRootParts, typeParameterNodes);
            }
            let splitNode: tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined = getTopmostIndexedAccessType(Node__from_ast.AsIndexedAccessTypeNode(nonRootParts));
            let qualifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(IndexedAccessTypeNode__from_ast.$storageOf(((splitNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
            return NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewImportTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, isTypeOf, lit, attributes, qualifier, typeParameterNodes), IndexedAccessTypeNode__from_ast.$storageOf(((splitNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType);
        }
        let entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAccessFromSymbolChain(b, chain, chain.length - 1, 0, typeArguments);
        if (IsIndexedAccessTypeNode__from_ast(entityName)) {
            return entityName;
        }
        if (IsEntityName__from_ast(entityName)) {
            if (isTypeOf) {
                return NodeFactory__from_ast.NewTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, entityName, void 0);
            }
            return NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, entityName, typeArguments);
        }
        if (isTypeOf && IsExpressionWithTypeArguments__from_ast(entityName)) {
            let expr: tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined = Node__from_ast.AsExpressionWithTypeArguments(entityName);
            return NodeFactory__from_ast.NewTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, ExpressionWithTypeArguments__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression), ExpressionWithTypeArguments__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).TypeArguments);
        }
        return entityName;
    }
    static $go$private$checker$symbolToTypeParameterDeclarations(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        return NodeBuilderImpl.$go$private$checker$typeParametersToTypeParameterDeclarations(b, __go_symbol);
    }
    static $go$private$checker$trackComputedName(b: {
        value: NodeBuilderImpl;
    } | undefined, accessExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let firstIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstIdentifier__from_ast(accessExpression);
        const __gotots_callee_15: Checker["resolveName"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
        const __gotots_argument_67 = enclosingDeclaration;
        const __gotots_argument_68 = Node__from_ast.Text(firstIdentifier);
        const __gotots_argument_69 = 1160127;
        const __gotots_argument_70 = void 0;
        const __gotots_argument_71 = true;
        const __gotots_argument_72 = false;
        let name: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_67, __gotots_argument_68, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
        if (!(name === undefined)) {
            const __gotots_receiver_28: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
            const __gotots_argument_73 = name;
            const __gotots_argument_74 = enclosingDeclaration;
            const __gotots_argument_75 = SymbolFlagsValue$constant__from_ast();
            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_28).TrackSymbol(__gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
        }
        else {
            const __gotots_callee_16: Checker["resolveName"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
            const __gotots_argument_76 = firstIdentifier;
            const __gotots_argument_77 = Node__from_ast.Text(firstIdentifier);
            const __gotots_argument_78 = 1160127;
            const __gotots_argument_79 = void 0;
            const __gotots_argument_80 = true;
            const __gotots_argument_81 = false;
            let fallback: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
            if (!(fallback === undefined)) {
                const __gotots_receiver_29: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                const __gotots_argument_82 = fallback;
                const __gotots_argument_83 = enclosingDeclaration;
                const __gotots_argument_84 = SymbolFlagsValue$constant__from_ast();
                goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_29).TrackSymbol(__gotots_argument_82, __gotots_argument_83, __gotots_argument_84);
            }
        }
    }
    static $go$private$checker$tryGetThisParameterDeclaration(b: {
        value: NodeBuilderImpl;
    } | undefined, signature: tsonicTypeScriptRuntime.Location<Signature> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter === undefined)) {
            return NodeBuilderImpl.$go$private$checker$symbolToParameterDeclaration(b, Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).thisParameter, false);
        }
        if (!(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration === undefined) && IsInJSFile__from_ast(Signature.$storageOf(((signature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Signature>).value).declaration)) {
        }
        return void 0;
    }
    static $go$private$checker$tryJSTypeNodeToTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return NodeBuilderImpl.$go$private$checker$reuseNode(b, node);
    }
    static $go$private$checker$tryReuseExistingNodeHelper(b: {
        value: NodeBuilderImpl;
    } | undefined, existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let bound: {
            value: recoveryBoundary;
        } | undefined = NodeBuilderImpl.$go$private$checker$createRecoveryBoundary(b);
        let transformed: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let v: {
            value: NodeVisitor__from_ast;
        } | undefined = getExistingNodeTreeVisitor(b, bound);
        transformed = NodeVisitor__from_ast.VisitNode(v, existing);
        if (!NodeBuilderImpl.$go$private$checker$finalizeBoundary(b, bound)) {
            return void 0;
        }
        const __gotots_store_92 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_92.approximateLength = __gotots_store_92.approximateLength + (TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).End() - TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Pos());
        return transformed;
    }
    static $go$private$checker$tryReuseExistingNonParameterTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, existing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, host: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, annotationType: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (host === undefined) {
            host = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        }
        if (annotationType === undefined) {
            annotationType = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, existing, true);
        }
        if (!(annotationType === undefined) && NodeBuilderImpl.$go$private$checker$typeNodeIsEquivalentToType(b, host, t, annotationType) && NodeBuilderImpl.$go$private$checker$existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(b, existing, t)) {
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$tryReuseExistingNodeHelper(b, existing);
            if (!(result === undefined)) {
                return result;
            }
        }
        return void 0;
    }
    static $go$private$checker$typeNodeIsEquivalentToType(b: {
        value: NodeBuilderImpl;
    } | undefined, annotatedDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, typeFromTypeNode: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        if (tsonicTypeScriptRuntime.sameLocation(typeFromTypeNode, t)) {
            return true;
        }
        if (annotatedDeclaration === undefined) {
            return false;
        }
        if (isOptionalDeclaration(annotatedDeclaration)) {
            return tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getTypeWithFacts((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t, TypeFactsNEUndefined$constant()), typeFromTypeNode);
        }
        return false;
    }
    static $go$private$checker$typeParameterShadowsOtherTypeParameterInScope(b: {
        value: NodeBuilderImpl;
    } | undefined, name: gostring, typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
        const __gotots_callee_11: Checker["resolveName"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolveName;
        const __gotots_argument_43: NodeBuilderContext["enclosingDeclaration"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
        const __gotots_argument_44 = name;
        const __gotots_argument_45 = SymbolFlagsType$constant__from_ast();
        const __gotots_argument_46 = void 0;
        const __gotots_argument_47 = false;
        const __gotots_argument_48 = false;
        let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
        if (!(result === undefined) && !((Symbol__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeParameter$constant__from_ast()) >>> 0 === 0)) {
            return !tsonicTypeScriptRuntime.sameLocation(result, ((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
        }
        return false;
    }
    static $go$private$checker$typeParameterToDeclaration(b: {
        value: NodeBuilderImpl;
    } | undefined, parameter: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parameter);
        let constraintNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(constraint === undefined)) {
            constraintNode = NodeBuilderImpl.$go$private$checker$typeToTypeNodeHelperWithPossibleReusableTypeNode(b, constraint, Checker.$go$private$checker$getConstraintDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parameter));
        }
        return NodeBuilderImpl.$go$private$checker$typeParameterToDeclarationWithConstraint(b, parameter, constraintNode);
    }
    static $go$private$checker$typeParameterToDeclarationWithConstraint(b: {
        value: NodeBuilderImpl;
    } | undefined, typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined, constraintNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
        const __gotots_store_52 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        __gotots_store_52.flags = (__gotots_store_52.flags & ~512) >>> 0;
        const __gotots_argument_22 = Checker.$go$private$checker$getTypeParameterModifiers((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeParameter);
        const __gotots_receiver_12: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
        const __gotots_argument_23 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewModifier(__gotots_receiver_12, $argument0);
        };
        let modifiers = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_22, __gotots_argument_23);
        let modifiersList: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if (modifiers.length > 0) {
            modifiersList = NodeFactory__from_ast.NewModifierList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, modifiers);
        }
        let name: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToName(b, typeParameter);
        let defaultParameter: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDefaultFromTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeParameter);
        let defaultParameterDeclarationNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(defaultParameter === undefined)) {
            defaultParameterDeclarationNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, defaultParameter);
        }
        const __gotots_callee_8 = restoreFlags;
        (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_receiver_13: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
        const __gotots_argument_24 = modifiersList;
        const __gotots_store_53 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                (void PrimaryExpressionBase__from_ast.$storageOf, (void PrimaryExpressionBase__from_ast.$fromStorage,
                                    Identifier__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_25 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_26 = constraintNode;
        const __gotots_argument_27 = void 0;
        const __gotots_argument_28 = defaultParameterDeclarationNode;
        return NodeFactory__from_ast.NewTypeParameterDeclaration(__gotots_receiver_13, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
    }
    static $go$private$checker$typeParameterToName(b: {
        value: NodeBuilderImpl;
    } | undefined, typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined {
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0)) {
            {
                const __gotots_store_54 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_1 = CopyOnWriteMap$Get$Named_checker$TypeId$PointerTo_Named_ast$Identifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "typeParameterNames"), ((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id);
                let cached: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    return cached;
                }
            }
        }
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$symbolToName(b, ((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsType$constant__from_ast(), true);
        if (!IsIdentifier__from_ast(result)) {
            return Node__from_ast.AsIdentifier(NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, "(Missing type parameter)"));
        }
        if (!(((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && Symbol__from_ast.$storageOf(((((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
            if (!(decl === undefined) && IsTypeParameterDeclaration__from_ast(decl)) {
                result = NodeBuilderImpl.$go$private$checker$setTextRange(b, result, Node__from_ast.Name(decl));
            }
        }
        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0)) {
            let rawText = Node__from_ast.Text(result);
            const __gotots_store_55 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_2 = CopyOnWriteMap$Get$string$int(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "typeParameterNamesByTextNextNameCount"), rawText);
            let i = __gotots_results_2[0];
            let text = rawText;
            for (; true;) {
                const __gotots_store_56 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                if (!CopyOnWriteSet$Has$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "typeParameterNamesByText"), text) && !NodeBuilderImpl.$go$private$checker$typeParameterShadowsOtherTypeParameterInScope(b, text, typeParameter)) {
                    break;
                }
                i++;
                text = fmt__from_gostdlib.Sprintf("%s_%d", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(rawText), new $goInterfaceAdapter$int(i)]));
            }
            if (text !== rawText) {
                result = NodeBuilderImpl.$go$private$checker$newIdentifier(b, text, ((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
            }
            const __gotots_store_57 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            CopyOnWriteMap$Set$string$int(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "typeParameterNamesByTextNextNameCount"), rawText, i);
            const __gotots_store_58 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            CopyOnWriteMap$Set$Named_checker$TypeId$PointerTo_Named_ast$Identifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "typeParameterNames"), ((typeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id, Node__from_ast.AsIdentifier(result));
            const __gotots_store_59 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            CopyOnWriteSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "typeParameterNamesByText"), text);
        }
        return Node__from_ast.AsIdentifier(result);
    }
    static $go$private$checker$typeParametersToTypeParameterDeclarations(b: {
        value: NodeBuilderImpl;
    } | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let targetSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getTargetSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
        if (!((Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (2097248)) >>> 0 === 0)) {
            let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let params = Checker.$go$private$checker$getLocalTypeParametersOfClassOrInterfaceOrTypeAlias((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, __go_symbol);
            const __gotots_range_12 = params;
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_12.length; __gotots_range_index_10++) {
                const __gotots_range_value_16 = __gotots_range_12.get(__gotots_range_index_10);
                let param: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_16;
                results = results.append(void 0, [NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, param)]);
            }
            return results;
        }
        else if (!((Symbol__from_ast.$storageOf(((targetSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsFunction$constant__from_ast()) >>> 0 === 0)) {
            let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_13 = Checker.$go$private$checker$getTypeParametersFromDeclaration((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
            for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_13.length; __gotots_range_index_11++) {
                const __gotots_range_value_17 = __gotots_range_13.get(__gotots_range_index_11);
                let param: tsonicTypeScriptRuntime.Location<Type> | undefined = __gotots_range_value_17;
                results = results.append(void 0, [NodeBuilderImpl.$go$private$checker$typeParameterToDeclaration(b, param)]);
            }
            return results;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$checker$typePredicateToTypePredicateNode(b: {
        value: NodeBuilderImpl;
    } | undefined, predicate: {
        value: TypePredicate;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let assertsModifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsIdentifier$constant() || (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsThis$constant()) {
            assertsModifier = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAssertsKeyword$constant__from_ast());
        }
        let parameterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindIdentifier$constant() || (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsIdentifier$constant()) {
            parameterName = NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parameterName);
            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, parameterName, EFNoAsciiEscaping$constant__from_printer());
        }
        else {
            parameterName = NodeFactory__from_ast.NewThisTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f);
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t === undefined)) {
            typeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (predicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t);
        }
        return NodeFactory__from_ast.NewTypePredicateNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, assertsModifier, parameterName, typeNode);
    }
    static $go$private$checker$typePredicateToTypePredicateNodeHelper(b: {
        value: NodeBuilderImpl;
    } | undefined, typePredicate: {
        value: TypePredicate;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let assertsModifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsThis$constant() || (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsIdentifier$constant()) {
            assertsModifier = NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAssertsKeyword$constant__from_ast());
        }
        else {
            assertsModifier = void 0;
        }
        let parameterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindIdentifier$constant() || (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === TypePredicateKindAssertsIdentifier$constant()) {
            parameterName = NodeBuilderImpl.$go$private$checker$newIdentifier(b, (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.parameterName, void 0);
            EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, parameterName, EFNoAsciiEscaping$constant__from_printer());
        }
        else {
            parameterName = NodeFactory__from_ast.NewThisTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f);
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!((typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t === undefined)) {
            typeNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (typePredicate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.t);
        }
        return NodeFactory__from_ast.NewTypePredicateNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, assertsModifier, parameterName, typeNode);
    }
    static $go$private$checker$typeReferenceToTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeArguments = Checker.$go$private$checker$getTypeArguments((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
        if (tsonicTypeScriptRuntime.sameLocation(Type.Target(t), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalArrayType)
            ||
                tsonicTypeScriptRuntime.sameLocation(Type.Target(t), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalReadonlyArrayType)) {
            if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteArrayAsGenericType$constant__from_nodebuilder()) >>> 0 === 0)) {
                let typeArgumentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, typeArguments.get(0));
                return NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newIdentifier(b, IfElse$string(tsonicTypeScriptRuntime.sameLocation(Type.Target(t), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalArrayType), "Array", "ReadonlyArray"), ((Type.Target(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([typeArgumentNode])));
            }
            let elementType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, typeArguments.get(0));
            let arrayType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, elementType);
            if (tsonicTypeScriptRuntime.sameLocation(Type.Target(t), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalArrayType)) {
                return arrayType;
            }
            else {
                return NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast(), arrayType);
            }
        }
        else if (!((((Type.Target(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsTuple$constant()) >>> 0 === 0)) {
            typeArguments = SameMapIndex$PointerTo_Named_checker$Type(typeArguments, (arg: tsonicTypeScriptRuntime.Location<Type> | undefined, i: int): tsonicTypeScriptRuntime.Location<Type> | undefined => {
                let isOptional = false;
                if (i < (Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.length) {
                    isOptional = !(((void TupleElementInfo.$storageOf, (void TupleElementInfo.$fromStorage,
                        (Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).flags & ElementFlagsOptional$constant()) >>> 0 === 0);
                }
                return Checker.$go$private$checker$removeMissingType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, arg, isOptional);
            });
            if (typeArguments.length > 0) {
                let arity = Checker.$go$private$checker$getTypeReferenceArity((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
                let tupleConstituentNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, typeArguments.slice(0, arity, null), false);
                if (!(tupleConstituentNodes === undefined)) {
                    for (let i = 0; i < NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length; i++) {
                        let flags = (void TupleElementInfo.$storageOf, (void TupleElementInfo.$fromStorage,
                            (Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).flags;
                        let labeledElementDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void TupleElementInfo.$storageOf, (void TupleElementInfo.$fromStorage,
                            (Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))).labeledDeclaration;
                        if (!(labeledElementDeclaration === undefined)) {
                            NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.set(i, NodeFactory__from_ast.NewNamedTupleMember((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, IfElse$PointerTo_Named_ast$Node(!((flags & ElementFlagsVariable$constant()) >>> 0 === 0), NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindDotDotDotToken$constant__from_ast()), void 0), NodeBuilderImpl.$go$private$checker$newIdentifier(b, Checker.$go$private$checker$getTupleElementLabel((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, TupleElementInfo.$copy(TupleElementInfo.$fromStorage((Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elementInfos.get(i))), void 0, i), void 0), IfElse$PointerTo_Named_ast$Node(!((flags & ElementFlagsOptional$constant()) >>> 0 === 0), NodeFactory__from_ast.NewToken((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindQuestionToken$constant__from_ast()), void 0), IfElse$PointerTo_Named_ast$Node(!((flags & ElementFlagsRest$constant()) >>> 0 === 0), NodeFactory__from_ast.NewArrayTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i)), NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i))));
                        }
                        else {
                            __gotots_control_target_0: {
                                if (!((flags & ElementFlagsVariable$constant()) >>> 0 === 0)) {
                                    NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.set(i, NodeFactory__from_ast.NewRestTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, IfElse$PointerTo_Named_ast$Node(!((flags & ElementFlagsRest$constant()) >>> 0 === 0), NodeFactory__from_ast.NewArrayTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i)), NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i))));
                                }
                                else if (!((flags & ElementFlagsOptional$constant()) >>> 0 === 0)) {
                                    NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.set(i, NodeFactory__from_ast.NewOptionalTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeList__from_ast.$storageOf(((tupleConstituentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i)));
                                }
                            }
                        }
                    }
                    let tupleTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTupleTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, tupleConstituentNodes);
                    EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, tupleTypeNode, EFSingleLine$constant__from_printer());
                    if ((Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly) {
                        return NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast(), tupleTypeNode);
                    }
                    else {
                        return tupleTypeNode;
                    }
                }
            }
            if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError || (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowEmptyTuple$constant__from_nodebuilder()) >>> 0 === 0))) {
                let tupleTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTupleTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])));
                EmitContext__from_printer.SetEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, tupleTypeNode, EFSingleLine$constant__from_printer());
                if ((Type.AsTupleType(Type.Target(t)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_readonly) {
                    return NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindReadonlyKeyword$constant__from_ast(), tupleTypeNode);
                }
                else {
                    return tupleTypeNode;
                }
            }
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
            return void 0;
        }
        else if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsWriteClassExpressionAsTypeLiteral$constant__from_nodebuilder()) >>> 0 === 0) && !(Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsClassLike__from_ast(Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) && !Checker.IsValueSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration)) {
            return NodeBuilderImpl.$go$private$checker$createAnonymousTypeNode(b, t);
        }
        else {
            let outerTypeParameters = InterfaceType.OuterTypeParameters(Type.AsInterfaceType(Type.Target(t)));
            let i = 0;
            let resultType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!outerTypeParameters.isNil()) {
                let length = outerTypeParameters.length;
                for (; i < length;) {
                    let start = i;
                    let parent: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$getParentSymbolOfTypeParameter(b, Type.AsTypeParameter(outerTypeParameters.get(i)));
                    for (let ok = true; ok; ok = i < length &&
                        tsonicTypeScriptRuntime.sameLocation(NodeBuilderImpl.$go$private$checker$getParentSymbolOfTypeParameter(b, Type.AsTypeParameter(outerTypeParameters.get(i))), parent)) {
                        i++;
                    }
                    if (!Equal$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(outerTypeParameters.slice(start, i, null), typeArguments.slice(start, i, null))) {
                        let typeArgumentSlice: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, typeArguments.slice(start, i, null), false);
                        let restoreFlags__shadow_1: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
                        const __gotots_store_43 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_43.flags = (__gotots_store_43.flags | 16) >>> 0;
                        let ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, parent, SymbolFlagsType$constant__from_ast(), typeArgumentSlice);
                        const __gotots_callee_1 = restoreFlags__shadow_1;
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                        if (resultType === undefined) {
                            resultType = ref;
                        }
                        else {
                            resultType = NodeBuilderImpl.$go$private$checker$appendReferenceToType(b, resultType, ref);
                        }
                    }
                }
            }
            let typeArgumentNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
            if (typeArguments.length > 0) {
                let typeParameterCount = 0;
                let typeParams = InterfaceType.TypeParameters(Type.AsInterfaceType(Type.Target(t)));
                if (!typeParams.isNil()) {
                    typeParameterCount = globalThis.Math.min(typeParams.length, typeArguments.length);
                    const __gotots_receiver_7: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                    const __gotots_argument_8 = t;
                    const __gotots_callee_2: Checker["getGlobalIterableType"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalIterableType;
                    const __gotots_argument_9 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
                    let __gotots_logical_result_2 = Checker.$go$private$checker$isReferenceToType(__gotots_receiver_7, __gotots_argument_8, __gotots_argument_9);
                    if (!__gotots_logical_result_2) {
                        const __gotots_receiver_8: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                        const __gotots_argument_10 = t;
                        const __gotots_callee_3: Checker["getGlobalIterableIteratorType"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalIterableIteratorType;
                        const __gotots_argument_11 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
                        __gotots_logical_result_2 = Checker.$go$private$checker$isReferenceToType(__gotots_receiver_8, __gotots_argument_10, __gotots_argument_11);
                    }
                    let __gotots_logical_result_3 = __gotots_logical_result_2;
                    if (!__gotots_logical_result_3) {
                        const __gotots_receiver_9: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                        const __gotots_argument_12 = t;
                        const __gotots_callee_4: Checker["getGlobalAsyncIterableType"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalAsyncIterableType;
                        const __gotots_argument_13 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
                        __gotots_logical_result_3 = Checker.$go$private$checker$isReferenceToType(__gotots_receiver_9, __gotots_argument_12, __gotots_argument_13);
                    }
                    let __gotots_logical_result_4 = __gotots_logical_result_3;
                    if (!__gotots_logical_result_4) {
                        const __gotots_receiver_10: NodeBuilderImpl["ch"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch;
                        const __gotots_argument_14 = t;
                        const __gotots_callee_5: Checker["getGlobalAsyncIterableIteratorType"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getGlobalAsyncIterableIteratorType;
                        const __gotots_argument_15 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
                        __gotots_logical_result_4 = Checker.$go$private$checker$isReferenceToType(__gotots_receiver_10, __gotots_argument_14, __gotots_argument_15);
                    }
                    if (__gotots_logical_result_4) {
                        if (((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined || !IsTypeReferenceNode__from_ast(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node) || Node__from_ast.TypeArguments(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node).isNil() || Node__from_ast.TypeArguments(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node).length < typeParameterCount) {
                            for (; typeParameterCount > 0;) {
                                let typeArgument: tsonicTypeScriptRuntime.Location<Type> | undefined = typeArguments.get(typeParameterCount - 1);
                                let typeParameter: tsonicTypeScriptRuntime.Location<Type> | undefined = InterfaceType.TypeParameters(Type.AsInterfaceType(Type.Target(t))).get(typeParameterCount - 1);
                                let defaultType: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getDefaultFromTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeParameter);
                                if (defaultType === undefined || !Checker.$go$private$checker$isTypeIdenticalTo((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, typeArgument, defaultType)) {
                                    break;
                                }
                                typeParameterCount--;
                            }
                        }
                    }
                }
                typeArgumentNodes = NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, typeArguments.slice(i, typeParameterCount, null), false);
            }
            let restoreFlags: (() => void) | undefined = NodeBuilderImpl.$go$private$checker$saveRestoreFlags(b);
            const __gotots_store_44 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_store_44.flags = (__gotots_store_44.flags | 16) >>> 0;
            let finalRef: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsType$constant__from_ast(), typeArgumentNodes);
            const __gotots_callee_6 = restoreFlags;
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))();
            if (resultType === undefined) {
                return finalRef;
            }
            else {
                return NodeBuilderImpl.$go$private$checker$appendReferenceToType(b, resultType, finalRef);
            }
        }
    }
    static $go$private$checker$typeToTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth >= 0 && !(t === undefined)) {
                        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.append(void 0, [t]);
                        const __gotots_callee_0 = (): void => {
                            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.slice(0, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeStack.length - 1, null);
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_0();
                        });
                    }
                    let inTypeAlias = (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsInTypeAlias$constant__from_nodebuilder()) >>> 0;
                    const __gotots_store_0 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_0.flags = (__gotots_store_0.flags & ~8388608) >>> 0;
                    if (t === undefined) {
                        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowEmptyUnionOrIntersection$constant__from_nodebuilder()) >>> 0 === 0) {
                            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        const __gotots_store_1 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_1.approximateLength = __gotots_store_1.approximateLength + 3;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsNoTypeReduction$constant__from_nodebuilder()) >>> 0 === 0) {
                        t = Checker.$go$private$checker$getReducedType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsAny$constant()) >>> 0 === 0)) {
                        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined)) {
                            __gotots_return_0 = TypeAlias.ToTypeReferenceNode(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias, b);
                            break __gotots_return_block_0;
                        }
                        if (tsonicTypeScriptRuntime.sameLocation(t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.unresolvedType)) {
                            __gotots_return_0 = EmitContext__from_printer.AddSyntheticLeadingComment((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast()), KindMultiLineCommentTrivia$constant__from_ast(), "unresolved", false);
                            break __gotots_return_block_0;
                        }
                        const __gotots_store_2 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_2.approximateLength = __gotots_store_2.approximateLength + 3;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, IfElse$Named_ast$Kind(tsonicTypeScriptRuntime.sameLocation(t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.intrinsicMarkerType), KindIntrinsicKeyword$constant__from_ast(), KindAnyKeyword$constant__from_ast()));
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnknown$constant()) >>> 0 === 0)) {
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindUnknownKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsString$constant()) >>> 0 === 0)) {
                        const __gotots_store_3 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_3.approximateLength = __gotots_store_3.approximateLength + 6;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindStringKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumber$constant()) >>> 0 === 0)) {
                        const __gotots_store_4 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_4.approximateLength = __gotots_store_4.approximateLength + 6;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNumberKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBigInt$constant()) >>> 0 === 0)) {
                        const __gotots_store_5 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_5.approximateLength = __gotots_store_5.approximateLength + 6;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindBigIntKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBoolean$constant()) >>> 0 === 0) && ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) {
                        const __gotots_store_6 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_6.approximateLength = __gotots_store_6.approximateLength + 7;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindBooleanKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    let expandingEnum = false;
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsEnumLike$constant()) >>> 0 === 0)) {
                        if (!((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsEnumMember$constant__from_ast()) >>> 0 === 0)) {
                            let parentSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getParentOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
                            let parentName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, parentSymbol, SymbolFlagsType$constant__from_ast(), void 0);
                            if (tsonicTypeScriptRuntime.sameLocation(Checker.$go$private$checker$getDeclaredTypeOfSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, parentSymbol), t)) {
                                __gotots_return_0 = parentName;
                                break __gotots_return_block_0;
                            }
                            let memberName = SymbolName__from_ast(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
                            if (IsIdentifierText__from_scanner(memberName, LanguageVariantStandard$constant__from_core())) {
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$appendReferenceToType(b, parentName, NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, memberName), void 0));
                                break __gotots_return_block_0;
                            }
                            if (IsImportTypeNode__from_ast(parentName)) {
                                (Node__from_ast.AsImportTypeNode(parentName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf = true;
                                __gotots_return_0 = NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, parentName, NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, memberName)));
                                break __gotots_return_block_0;
                            }
                            else if (IsTypeReferenceNode__from_ast(parentName)) {
                                __gotots_return_0 = NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewTypeQueryNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(parentName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, void 0), NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newStringLiteral(b, memberName)));
                                break __gotots_return_block_0;
                            }
                            else {
                                const __gotots_argument_0 = new GoInterfaceAdapter("Unhandled type node kind returned from `symbolToTypeNode`.");
                                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                            }
                        }
                        if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0 || !NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, false)) {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsType$constant__from_ast(), void 0);
                            break __gotots_return_block_0;
                        }
                        expandingEnum = true;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringLiteral$constant()) >>> 0 === 0)) {
                        const __gotots_store_7 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_7.approximateLength = __gotots_store_7.approximateLength + ((($value: GoInterface | undefined): gostring => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value).length + 2);
                        let lit: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$newStringLiteral(b, (($value: GoInterface | undefined): gostring => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value));
                        EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, lit, EFNoAsciiEscaping$constant__from_printer());
                        __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, lit);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNumberLiteral$constant()) >>> 0 === 0)) {
                        let value = (($value: GoInterface | undefined): Number__from_jsnum => {
                            if (!$goInterfaceAdapter$Named_jsnum$Number.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value);
                        const __gotots_store_8 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_8.approximateLength = __gotots_store_8.approximateLength + value.String().length;
                        if (value.$value < 0) {
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewPrefixUnaryExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindMinusToken$constant__from_ast(), NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, goStringSlice(value.String(), 1), TokenFlagsNone$constant__from_ast())));
                            break __gotots_return_block_0;
                        }
                        else {
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewNumericLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, value.String(), TokenFlagsNone$constant__from_ast()));
                            break __gotots_return_block_0;
                        }
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBigIntLiteral$constant()) >>> 0 === 0)) {
                        const __gotots_store_9 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_9.approximateLength = __gotots_store_9.approximateLength + (pseudoBigIntToString(getBigIntLiteralValue(t)).length + 1);
                        __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewBigIntLiteral((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, pseudoBigIntToString(getBigIntLiteralValue(t)) + "n", TokenFlagsNone$constant__from_ast()));
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsBooleanLiteral$constant()) >>> 0 === 0)) {
                        if ((($value: GoInterface | undefined): bool => {
                            if (!$goInterfaceAdapter$bool.$is($value)) {
                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                            }
                            return $value.$go$value;
                        })((Type.AsLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.value)) {
                            const __gotots_store_10 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_10.approximateLength = __gotots_store_10.approximateLength + 4;
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindTrueKeyword$constant__from_ast()));
                            break __gotots_return_block_0;
                        }
                        else {
                            const __gotots_store_11 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_11.approximateLength = __gotots_store_11.approximateLength + 5;
                            __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindFalseKeyword$constant__from_ast()));
                            break __gotots_return_block_0;
                        }
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUniqueESSymbol$constant()) >>> 0 === 0)) {
                        if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowUniqueESSymbolType$constant__from_nodebuilder()) >>> 0 === 0) {
                            if (Checker.IsValueSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration)) {
                                const __gotots_store_12 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                __gotots_store_12.approximateLength = __gotots_store_12.approximateLength + 6;
                                __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsValue$constant__from_ast(), void 0);
                                break __gotots_return_block_0;
                            }
                            const __gotots_receiver_0: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_0).ReportInaccessibleUniqueSymbolError();
                        }
                        const __gotots_store_13 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_13.approximateLength = __gotots_store_13.approximateLength + 13;
                        __gotots_return_0 = NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindUniqueKeyword$constant__from_ast(), NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindSymbolKeyword$constant__from_ast()));
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsVoid$constant()) >>> 0 === 0)) {
                        const __gotots_store_14 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_14.approximateLength = __gotots_store_14.approximateLength + 4;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindVoidKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUndefined$constant()) >>> 0 === 0)) {
                        const __gotots_store_15 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_15.approximateLength = __gotots_store_15.approximateLength + 9;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindUndefinedKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNull$constant()) >>> 0 === 0)) {
                        const __gotots_store_16 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_16.approximateLength = __gotots_store_16.approximateLength + 4;
                        __gotots_return_0 = NodeFactory__from_ast.NewLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewKeywordExpression((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNullKeyword$constant__from_ast()));
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNever$constant()) >>> 0 === 0)) {
                        const __gotots_store_17 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_17.approximateLength = __gotots_store_17.approximateLength + 5;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindNeverKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsESSymbol$constant()) >>> 0 === 0)) {
                        const __gotots_store_18 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_18.approximateLength = __gotots_store_18.approximateLength + 6;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindSymbolKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsNonPrimitive$constant()) >>> 0 === 0)) {
                        const __gotots_store_19 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_19.approximateLength = __gotots_store_19.approximateLength + 6;
                        __gotots_return_0 = NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindObjectKeyword$constant__from_ast());
                        break __gotots_return_block_0;
                    }
                    if (isThisTypeParameter(t)) {
                        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsInObjectTypeLiteral$constant__from_nodebuilder()) >>> 0 === 0)) {
                            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError && (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowThisInObjectLiteral$constant__from_nodebuilder()) >>> 0 === 0) {
                                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                            }
                            const __gotots_receiver_1: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                            goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_1).ReportInaccessibleThisError();
                        }
                        const __gotots_store_20 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_20.approximateLength = __gotots_store_20.approximateLength + 4;
                        __gotots_return_0 = NodeFactory__from_ast.NewThisTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f);
                        break __gotots_return_block_0;
                    }
                    if (inTypeAlias === 0 && !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) && (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsUseAliasDefinedOutsideCurrentScope$constant__from_nodebuilder()) >>> 0 === 0) || Checker.IsTypeSymbolAccessible((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, TypeAlias.Symbol(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration))) {
                        if (!NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, true)) {
                            let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = TypeAlias.Symbol(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias);
                            let typeArgumentNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, TypeAlias.TypeArguments(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias), false);
                            if (isReservedMemberName(Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name) && (Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) {
                                __gotots_return_0 = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeFactory__from_ast.NewIdentifier((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, ""), typeArgumentNodes);
                                break __gotots_return_block_0;
                            }
                            if (!(typeArgumentNodes === undefined) && NodeList__from_ast.$storageOf(((typeArgumentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1 &&
                                tsonicTypeScriptRuntime.sameLocation(sym, ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalArrayType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol)) {
                                __gotots_return_0 = NodeFactory__from_ast.NewArrayTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeList__from_ast.$storageOf(((typeArgumentNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, sym, SymbolFlagsType$constant__from_ast(), typeArgumentNodes);
                            break __gotots_return_block_0;
                        }
                        const __gotots_store_21 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_21.depth = __gotots_store_21.depth + 1;
                        const __gotots_callee_1 = (): void => {
                            const __gotots_store_22 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_22.depth = __gotots_store_22.depth - 1;
                        };
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_callee_1();
                        });
                    }
                    let objectFlags = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags;
                    if (!((objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0)) {
                        Assert__from_debug(!((Type.Flags(t) & TypeFlagsObject$constant()) >>> 0 === 0), RuntimeSlice.nil<GoInterface | undefined>());
                        if (NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, false)) {
                            const __gotots_store_23 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_23.depth = __gotots_store_23.depth + 1;
                            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAnonymousTypeNodeEx(b, t, true, true);
                            const __gotots_store_24 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_24.depth = __gotots_store_24.depth - 1;
                            __gotots_return_0 = result;
                            break __gotots_return_block_0;
                        }
                        if (!(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined)) {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$visitAndTransformType(b, t, ($argument0: {
                                value: NodeBuilderImpl;
                            } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return NodeBuilderImpl.$go$private$checker$typeReferenceToTypeNode($argument0, $argument1);
                            });
                            break __gotots_return_block_0;
                        }
                        else {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$typeReferenceToTypeNode(b, t);
                            break __gotots_return_block_0;
                        }
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) || !((objectFlags & ObjectFlagsClassOrInterface$constant()) >>> 0 === 0)) {
                        if (!((objectFlags & ObjectFlagsClassOrInterface$constant()) >>> 0 === 0) && NodeBuilderImpl.$go$private$checker$shouldExpandType(b, t, false)) {
                            const __gotots_store_25 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_25.depth = __gotots_store_25.depth + 1;
                            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$createAnonymousTypeNodeEx(b, t, true, true);
                            const __gotots_store_26 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_26.depth = __gotots_store_26.depth - 1;
                            __gotots_return_0 = result;
                            break __gotots_return_block_0;
                        }
                        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0) && Contains$SliceOf_PointerTo_Named_checker$Type$PointerTo_Named_checker$Type(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inferTypeParameters, t)) {
                            const __gotots_store_27 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_27.approximateLength = __gotots_store_27.approximateLength + (SymbolName__from_ast(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol).length + 6);
                            let constraintNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                            let constraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getConstraintOfTypeParameter((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t);
                            if (!(constraint === undefined)) {
                                let inferredConstraint: tsonicTypeScriptRuntime.Location<Type> | undefined = Checker.$go$private$checker$getInferredTypeParameterConstraint((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t, true);
                                if (!(!(inferredConstraint === undefined) && Checker.$go$private$checker$isTypeIdenticalTo((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, constraint, inferredConstraint))) {
                                    const __gotots_store_28 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    __gotots_store_28.approximateLength = __gotots_store_28.approximateLength + 9;
                                    constraintNode = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, constraint);
                                }
                            }
                            __gotots_return_0 = NodeFactory__from_ast.NewInferTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$typeParameterToDeclarationWithConstraint(b, t, constraintNode));
                            break __gotots_return_block_0;
                        }
                        if (!((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsGenerateNamesForShadowedTypeParams$constant__from_nodebuilder()) >>> 0 === 0) && !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTypeParameter$constant()) >>> 0 === 0)) {
                            let name__shadow_1: tsonicTypeScriptRuntime.Location<Identifier__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeParameterToName(b, t);
                            const __gotots_store_29 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_store_29.approximateLength = __gotots_store_29.approximateLength + Identifier__from_ast.$storageOf(((name__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text.length;
                            __gotots_return_0 = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newIdentifier(b, Identifier__from_ast.$storageOf(((name__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol), void 0);
                            break __gotots_return_block_0;
                        }
                        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, SymbolFlagsType$constant__from_ast(), void 0);
                            break __gotots_return_block_0;
                        }
                        let name = "";
                        if ((tsonicTypeScriptRuntime.sameLocation(t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.markerSuperTypeForCheck)
                            ||
                                tsonicTypeScriptRuntime.sameLocation(t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.markerSubTypeForCheck)) && !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.varianceTypeParameter === undefined) && !(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.varianceTypeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
                            name = IfElse$string(tsonicTypeScriptRuntime.sameLocation(t, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.markerSubTypeForCheck), "sub-", "super-") + SymbolName__from_ast(((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.varianceTypeParameter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol);
                        }
                        else {
                            name = "?";
                        }
                        __gotots_return_0 = NodeFactory__from_ast.NewTypeReferenceNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$newIdentifier(b, name, void 0), void 0);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0) && !((Type.AsUnionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin === undefined)) {
                        t = (Type.AsUnionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origin;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & (402653184)) >>> 0 === 0)) {
                        let types = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type> | undefined>();
                        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                            types = Checker.$go$private$checker$formatUnionTypes((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, (Type.AsUnionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types, expandingEnum);
                        }
                        else {
                            types = (Type.AsIntersectionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnionOrIntersectionType.types;
                        }
                        if (types.length === 1) {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, types.get(0));
                            break __gotots_return_block_0;
                        }
                        let typeNodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$mapToTypeNodes(b, types, true);
                        if (!(typeNodes === undefined) && NodeList__from_ast.$storageOf(((typeNodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
                                __gotots_return_0 = NodeFactory__from_ast.NewUnionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeNodes);
                                break __gotots_return_block_0;
                            }
                            else {
                                __gotots_return_0 = NodeFactory__from_ast.NewIntersectionTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, typeNodes);
                                break __gotots_return_block_0;
                            }
                        }
                        else {
                            if (!((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError && (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowEmptyUnionOrIntersection$constant__from_nodebuilder()) >>> 0 === 0) {
                                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                            }
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                    }
                    if (!((objectFlags & (48)) >>> 0 === 0)) {
                        Assert__from_debug(!((Type.Flags(t) & TypeFlagsObject$constant()) >>> 0 === 0), RuntimeSlice.nil<GoInterface | undefined>());
                        __gotots_return_0 = NodeBuilderImpl.$go$private$checker$createAnonymousTypeNode(b, t);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndex$constant()) >>> 0 === 0)) {
                        let indexedType: tsonicTypeScriptRuntime.Location<Type> | undefined = Type.Target(t);
                        const __gotots_store_30 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_30.approximateLength = __gotots_store_30.approximateLength + 6;
                        let indexTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, indexedType);
                        __gotots_return_0 = NodeFactory__from_ast.NewTypeOperatorNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindKeyOfKeyword$constant__from_ast(), indexTypeNode);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsTemplateLiteral$constant()) >>> 0 === 0)) {
                        let texts: TemplateLiteralType["texts"] = (Type.AsTemplateLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.texts;
                        let types: TemplateLiteralType["types"] = (Type.AsTemplateLiteralType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.types;
                        let templateHead: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTemplateHead((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, texts.get(0), "", TokenFlagsNone$constant__from_ast());
                        EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, templateHead, EFNoAsciiEscaping$constant__from_printer());
                        let templateSpans: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, MapIndex$PointerTo_Named_checker$Type$PointerTo_Named_ast$Node(types, (t__shadow_1: tsonicTypeScriptRuntime.Location<Type> | undefined, i: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                            if (i < types.length - 1) {
                                res = NodeFactory__from_ast.NewTemplateMiddle((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, texts.get(i + 1), "", TokenFlagsNone$constant__from_ast());
                            }
                            else {
                                res = NodeFactory__from_ast.NewTemplateTail((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, texts.get(i + 1), "", TokenFlagsNone$constant__from_ast());
                            }
                            EmitContext__from_printer.AddEmitFlags((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.e, res, EFNoAsciiEscaping$constant__from_printer());
                            return NodeFactory__from_ast.NewTemplateLiteralTypeSpan((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t__shadow_1), res);
                        }));
                        const __gotots_store_31 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_31.approximateLength = __gotots_store_31.approximateLength + 2;
                        __gotots_return_0 = NodeFactory__from_ast.NewTemplateLiteralTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, templateHead, templateSpans);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsStringMapping$constant()) >>> 0 === 0)) {
                        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, Type.Target(t));
                        __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, (Type.AsStringMappingType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConstrainedType.TypeBase.Type.__go_symbol, SymbolFlagsType$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([typeNode])));
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsIndexedAccess$constant()) >>> 0 === 0)) {
                        let objectTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (Type.AsIndexedAccessType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.objectType);
                        let indexTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (Type.AsIndexedAccessType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.indexType);
                        const __gotots_store_32 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        __gotots_store_32.approximateLength = __gotots_store_32.approximateLength + 2;
                        __gotots_return_0 = NodeFactory__from_ast.NewIndexedAccessTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, objectTypeNode, indexTypeNode);
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                        __gotots_return_0 = NodeBuilderImpl.$go$private$checker$visitAndTransformType(b, t, ($argument0: {
                            value: NodeBuilderImpl;
                        } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                            return NodeBuilderImpl.$go$private$checker$conditionalTypeToTypeNode($argument0, $argument1);
                        });
                        break __gotots_return_block_0;
                    }
                    if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsSubstitution$constant()) >>> 0 === 0)) {
                        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, (Type.AsSubstitutionType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.baseType);
                        if (!Checker.$go$private$checker$isNoInferType((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, t)) {
                            __gotots_return_0 = typeNode;
                            break __gotots_return_block_0;
                        }
                        let noInferSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker.$go$private$checker$getGlobalTypeAliasSymbol((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ch, "NoInfer", 1, false);
                        if (!(noInferSymbol === undefined)) {
                            __gotots_return_0 = NodeBuilderImpl.$go$private$checker$symbolToTypeNode(b, noInferSymbol, SymbolFlagsType$constant__from_ast(), NodeFactory__from_ast.NewNodeList((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([typeNode])));
                            break __gotots_return_block_0;
                        }
                        else {
                            __gotots_return_0 = typeNode;
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_argument_1 = new GoInterfaceAdapter("Should be unreachable.");
                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
        finally {
            while (__gotots_defers_0.length !== 0) {
                const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_1) {
                    if (!(__gotots_caught_1 instanceof GoPanic)) {
                        throw __gotots_caught_1;
                    }
                    __gotots_panic_0 = __gotots_caught_1;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$checker$typeToTypeNodeHelperWithPossibleReusableTypeNode(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (t === undefined) {
            return NodeFactory__from_ast.NewKeywordTypeNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, KindAnyKeyword$constant__from_ast());
        }
        if (!NodeBuilderImpl.$go$private$checker$isActivelyExpanding(b) && !(typeNode === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, typeNode, false), t)) {
            let reused: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeBuilderImpl.$go$private$checker$tryReuseExistingNodeHelper(b, typeNode);
            if (!(reused === undefined)) {
                NodeBuilderImpl.$go$private$checker$checkTypeExpandability(b, t);
                return reused;
            }
        }
        return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
    }
    static $go$private$checker$typeToTypeNodeOrCircularityElision(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsUnion$constant()) >>> 0 === 0)) {
            const __gotots_store_78 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            if (Set__from_collections.Has<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "visitedTypes"), ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id)) {
                if ((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags & FlagsAllowAnonymousIdentifier$constant__from_nodebuilder()) >>> 0 === 0) {
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError = true;
                    const __gotots_receiver_19: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_19).ReportCyclicStructureError();
                }
                return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
            }
            return NodeBuilderImpl.$go$private$checker$visitAndTransformType(b, t, ($argument0: {
                value: NodeBuilderImpl;
            } | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                return NodeBuilderImpl.$go$private$checker$typeToTypeNode($argument0, $argument1);
            });
        }
        return NodeBuilderImpl.$go$private$checker$typeToTypeNode(b, t);
    }
    static $go$private$checker$visitAndTransformType(b: {
        value: NodeBuilderImpl;
    } | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined, transform: (($0: {
        value: NodeBuilderImpl;
    } | undefined, $1: tsonicTypeScriptRuntime.Location<Type> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeId = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.id;
        let isConstructorObject = !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsAnonymous$constant()) >>> 0 === 0) && !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0);
        let id: CompositeSymbolIdentity | undefined = void 0;
        __gotots_control_target_1: {
            if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsReference$constant()) >>> 0 === 0) && !(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node === undefined)) {
                id = new CompositeSymbolIdentity(false, new SymbolId__from_ast(0n), GetNodeId__from_ast(((Type.AsTypeReference(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReference>).value.node));
            }
            else if (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsConditional$constant()) >>> 0 === 0)) {
                const __gotots_field_0 = false;
                const __gotots_field_1 = new SymbolId__from_ast(0n);
                const __gotots_store_45 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    TypeNodeBase__from_ast.$storageOf((((Type.AsConditionalType(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
                const __gotots_argument_16 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_field_2 = GetNodeId__from_ast(__gotots_argument_16);
                id = new CompositeSymbolIdentity(__gotots_field_0, __gotots_field_1, __gotots_field_2);
            }
            else if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined)) {
                id = new CompositeSymbolIdentity(isConstructorObject, GetSymbolId__from_ast(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol), new NodeId__from_ast(0n));
            }
            else {
                id = void 0;
            }
        }
        let key = new CompositeTypeCacheIdentity(typeId, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.flags, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.internalFlags);
        let canUseCache = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth < 0;
        let __gotots_logical_result_5 = canUseCache && !(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration === undefined);
        if (__gotots_logical_result_5) {
            const __gotots_store_46 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            __gotots_logical_result_5 = LinkStore__from_core.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "links"), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
        }
        if (__gotots_logical_result_5) {
            const __gotots_store_47 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let links: tsonicTypeScriptRuntime.Location<NodeBuilderLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "links"), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
            const __gotots_results_0 = NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).serializedTypes.lookupOk(key);
            let cachedResult: SerializedTypeEntry | undefined = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                const __gotots_range_7 = (cachedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).trackedSymbols;
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                    const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_6);
                    let arg: {
                        value: TrackedSymbolArgs;
                    } | undefined = __gotots_range_value_8;
                    const __gotots_receiver_11: NodeBuilderContext["tracker"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tracker;
                    const __gotots_argument_17: TrackedSymbolArgs["__go_symbol"] = (arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.__go_symbol;
                    const __gotots_argument_18: TrackedSymbolArgs["enclosingDeclaration"] = (arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration;
                    const __gotots_argument_19: TrackedSymbolArgs["meaning"] = (arg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.meaning;
                    goInterfaceNonNil<SymbolTracker__from_nodebuilder>(__gotots_receiver_11).TrackSymbol(__gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                }
                if ((cachedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).truncating) {
                    ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating = true;
                }
                const __gotots_store_48 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                __gotots_store_48.approximateLength = __gotots_store_48.approximateLength + (cachedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).addedLength;
                return NodeFactory__from_ast.DeepCloneNode((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f, (cachedResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node);
            }
        }
        let depth = 0;
        if (!(id === undefined)) {
            depth = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolDepth.lookup(CompositeSymbolIdentity.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
            if (depth > 10) {
                return NodeBuilderImpl.$go$private$checker$createElidedInformationPlaceholder(b);
            }
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolDepth.store(CompositeSymbolIdentity.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))), depth + 1);
        }
        const __gotots_store_49 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        Set$Add$Named_checker$TypeId(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "visitedTypes"), typeId);
        let prevTrackedSymbols: NodeBuilderContext["trackedSymbols"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols;
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = RuntimeSlice.nil<{
            value: TrackedSymbolArgs;
        } | undefined>();
        let startLength: NodeBuilderContext["approximateLength"] = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.approximateLength;
        const __gotots_callee_7 = transform;
        const __gotots_argument_20 = b;
        const __gotots_argument_21 = t;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21);
        let addedLength = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.approximateLength - startLength;
        if (canUseCache && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportedDiagnostic && !((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.encounteredError) {
            const __gotots_store_50 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let links: tsonicTypeScriptRuntime.Location<NodeBuilderLinks> | undefined = LinkStore$Get$PointerTo_Named_ast$Node$Named_checker$NodeBuilderLinks(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "links"), ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.enclosingDeclaration);
            if (NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).serializedTypes.isNil()) {
                NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).serializedTypes = GoMap.make(0, []);
            }
            NodeBuilderLinks.$storageOf(((links ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeBuilderLinks>).value).serializedTypes.store(key, new SerializedTypeEntry(result, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.truncating, addedLength, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols));
        }
        const __gotots_store_51 = ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        Set__from_collections.Delete<TypeId>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "visitedTypes"), typeId);
        if (!(id === undefined)) {
            ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolDepth.store(CompositeSymbolIdentity.$copy((id ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))), depth);
        }
        ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trackedSymbols = prevTrackedSymbols;
        return result;
    }
    static $go$private$checker$walkNodeForExpandability(b: {
        value: NodeBuilderImpl;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth || node === undefined) {
            return;
        }
        if (IsTypeReferenceNode__from_ast(node) || IsExpressionWithTypeArguments__from_ast(node) || IsTypePredicateNode__from_ast(node) || IsImportTypeNode__from_ast(node)) {
            let t: tsonicTypeScriptRuntime.Location<Type> | undefined = NodeBuilderImpl.$go$private$checker$getTypeFromTypeNode(b, node, false);
            if (!(t === undefined)) {
                NodeBuilderImpl.$go$private$checker$checkTypeExpandability(b, t);
                if (((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth) {
                    return;
                }
            }
        }
        Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            NodeBuilderImpl.$go$private$checker$walkNodeForExpandability(b, child);
            return ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.canIncreaseExpansionDepth;
        }));
    }
}
export const defaultMaximumTruncationLength$int: int = 160;
export const noTruncationMaximumTruncationLength$int: int = 1000000;
export function newNodeBuilderImpl(ch: {
    value: Checker;
} | undefined, e: {
    value: EmitContext__from_printer;
} | undefined, idToSymbol: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): {
    value: NodeBuilderImpl;
} | undefined {
    if (idToSymbol.isNil()) {
        idToSymbol = $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol.make(0, []);
    }
    const __gotots_store_65 = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_field_3 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory"));
    let b: {
        value: NodeBuilderImpl;
    } | undefined = { value: new NodeBuilderImpl(__gotots_field_3, ch, e, NewPseudoChecker__from_pseudochecker((ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks, (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exactOptionalPropertyTypes), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, NodeBuilderLinks>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<NodeBuilderLinks> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_checker$NodeBuilderLinks.nil();
        }), LinkStore__from_core.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, NodeBuilderSymbolLinks>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<NodeBuilderSymbolLinks> | undefined> => {
            return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_PointerTo_Named_checker$NodeBuilderSymbolLinks.nil();
        }), void 0, void 0, idToSymbol) };
    const __gotots_receiver_16 = b;
    const __gotots_argument_34 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return NodeBuilderImpl.$go$private$checker$cloneBindingName(__gotots_receiver_16, $argument0);
    };
    const __gotots_argument_35: NodeBuilderImpl["f"] = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.f;
    const __gotots_argument_36 = new NodeVisitorHooks__from_ast(void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
    (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cloneBindingNameVisitor = NewNodeVisitor__from_ast(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
    return b;
}
export function getAccessStack(ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let state: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(ref) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
    let ids = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
    for (; !IsIdentifier__from_ast(state);) {
        let entity: {
            value: QualifiedName__from_ast;
        } | undefined = Node__from_ast.AsQualifiedName(state);
        ids = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([(entity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right]), ids, void 0);
        state = (entity ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left;
    }
    ids = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([state]), ids, void 0);
    return ids;
}
export function isClassInstanceSide(c: {
    value: Checker;
} | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0) && (tsonicTypeScriptRuntime.sameLocation(t, Checker.$go$private$checker$getDeclaredTypeOfClassOrInterface(c, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol))
        || (!((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.flags & TypeFlagsObject$constant()) >>> 0 === 0) && !((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.objectFlags & ObjectFlagsIsClassInstanceClone$uint32) >>> 0 === 0)));
}
export function isIdentifierTypeReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsTypeReferenceNode__from_ast(node) && IsIdentifier__from_ast(TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName);
}
export function arrayIsHomogeneous$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, array: RuntimeSlice<GoContainerStorage<T>>, comparer: (($0: T, $1: T) => bool) | undefined): bool {
    if ($go$length$SliceOf_T0_to_int(array) < 2) {
        return true;
    }
    let first: T = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(array, 0));
    for (let i = 1; i < $go$length$SliceOf_T0_to_int(array); i++) {
        let target: T = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(array, i));
        const __gotots_callee_9 = comparer;
        const __gotots_argument_41 = $go$copy$T0_to_T0(first);
        const __gotots_argument_42 = $go$copy$T0_to_T0(target);
        if (!(__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41, __gotots_argument_42)) {
            return false;
        }
    }
    return true;
}
export function typesAreSameReference(a: tsonicTypeScriptRuntime.Location<Type> | undefined, b: tsonicTypeScriptRuntime.Location<Type> | undefined): bool {
    return tsonicTypeScriptRuntime.sameLocation(a, b)
        || !(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) &&
            tsonicTypeScriptRuntime.sameLocation(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol, ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol) || !(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias === undefined) &&
        ((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias
            ===
                ((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.alias;
}
export function getTopmostIndexedAccessType(node: tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast> | undefined {
    if (IsIndexedAccessTypeNode__from_ast(IndexedAccessTypeNode__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType)) {
        return getTopmostIndexedAccessType(Node__from_ast.AsIndexedAccessTypeNode(IndexedAccessTypeNode__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType));
    }
    return node;
}
export function canUsePropertyAccess(name: gostring): bool {
    if (name.length === 0) {
        return false;
    }
    if (strings__from_gostdlib.HasPrefix(name, "#")) {
        return name.length > 1 && IsIdentifierText__from_scanner(goStringSlice(name, 1), LanguageVariantStandard$constant__from_core());
    }
    return IsIdentifierText__from_scanner(name, LanguageVariantStandard$constant__from_core());
}
export function startsWithSingleOrDoubleQuote(str: gostring): bool {
    return strings__from_gostdlib.HasPrefix(str, "'") || strings__from_gostdlib.HasPrefix(str, "\"");
}
export function startsWithSquareBracket(str: gostring): bool {
    return strings__from_gostdlib.HasPrefix(str, "[");
}
export function isDefaultBindingContext(location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() || IsAmbientModule__from_ast(location);
}
export type sortedSymbolNamePair$Storage = {
    sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    name: gostring;
};
export class sortedSymbolNamePair implements GoContainerStoredValue<sortedSymbolNamePair$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: sortedSymbolNamePair$Storage) {
    }
    public static $storageOf($source: sortedSymbolNamePair): sortedSymbolNamePair$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: sortedSymbolNamePair$Storage): sortedSymbolNamePair {
        return new sortedSymbolNamePair($source);
    }
    public get sym(): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
        return this.$storage.sym;
    }
    public set sym($value: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
        this.$storage.sym = $value;
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    declare readonly [$goContainerStorageType]: sortedSymbolNamePair$Storage;
    static $zero(): sortedSymbolNamePair {
        return new sortedSymbolNamePair({
            sym: void 0,
            name: ""
        });
    }
    static $copy($source: sortedSymbolNamePair): sortedSymbolNamePair {
        return new sortedSymbolNamePair({
            sym: $source.$storage.sym,
            name: $source.$storage.name
        });
    }
    declare private readonly then?: never;
}
export function canHaveModuleSpecifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindImportDeclaration$constant__from_ast():
        case KindExportDeclaration$constant__from_ast():
        case KindImportEqualsDeclaration$constant__from_ast():
        case KindImportClause$constant__from_ast():
        case KindNamespaceExport$constant__from_ast():
        case KindNamespaceImport$constant__from_ast():
        case KindExportSpecifier$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindImportType$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function TryGetModuleSpecifierFromDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tryGetModuleSpecifierFromDeclarationWorker(node);
    if (res === undefined || !IsStringLiteral__from_ast(res)) {
        return void 0;
    }
    return res;
}
export function tryGetModuleSpecifierFromDeclarationWorker(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast():
        case KindBindingElement$constant__from_ast(): {
            let requireCall: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(Node__from_ast.Initializer(node), (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return IsRequireCall__from_ast(node__shadow_1, true);
            });
            if (requireCall === undefined) {
                return void 0;
            }
            return Node__from_ast.Arguments(requireCall).get(0);
            break;
        }
        case KindImportDeclaration$constant__from_ast():
        case KindExportDeclaration$constant__from_ast():
        case KindJSDocImportTag$constant__from_ast(): {
            return Node__from_ast.ModuleSpecifier(node);
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let ref: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportEqualsDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference;
            if (!(Node__from_ast.$storageOf(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast())) {
                return void 0;
            }
            return Node__from_ast.Expression(ref);
            break;
        }
        case KindImportClause$constant__from_ast(): {
            if (IsImportDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindNamespaceExport$constant__from_ast(): {
            return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindNamespaceImport$constant__from_ast(): {
            if (IsImportDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindExportSpecifier$constant__from_ast(): {
            return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            if (IsImportDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindImportType$constant__from_ast(): {
            if (IsLiteralImportTypeNode__from_ast(node)) {
                return LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode((Node__from_ast.AsImportTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal;
            }
            return void 0;
            break;
        }
        default: {
            AssertNever__from_debug(new $goInterfaceAdapter$PointerTo_Named_ast$Node(node), RuntimeSlice.nil<GoInterface | undefined>());
            return void 0;
            break;
        }
    }
}
export function getEffectiveParameterDeclaration(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parameterDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindParameter$constant__from_ast());
    if (!(parameterDeclaration === undefined)) {
        return parameterDeclaration;
    }
    if ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTransient$constant__from_ast()) >>> 0 === 0) {
        return GetDeclarationOfKind__from_ast(__go_symbol, KindJSDocParameterTag$constant__from_ast());
    }
    return void 0;
}
export class SignatureToSignatureDeclarationOptions {
    declare private readonly $goType: void;
    public constructor(public modifiers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export function hasTypeAnnotation(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(declaration === undefined) && !(Node__from_ast.Type(declaration) === undefined);
}
export const MAX_REVERSE_MAPPED_NESTING_INSPECTION_DEPTH$int: int = 3;
export class propertyNameNodeKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function propertyNameNodeKindIdentifier$constant(): propertyNameNodeKind {
    return new propertyNameNodeKind(0);
}
export function propertyNameNodeKindNumericLiteral$constant(): propertyNameNodeKind {
    return new propertyNameNodeKind(1);
}
export function propertyNameNodeKindStringLiteral$constant(): propertyNameNodeKind {
    return new propertyNameNodeKind(2);
}
export function classifyPropertyName(name: gostring, stringNamed: bool, isMethod: bool): propertyNameNodeKind {
    if (isMethod && name === "new") {
        return propertyNameNodeKindStringLiteral$constant();
    }
    if (IsIdentifierText__from_scanner(name, LanguageVariantStandard$constant__from_core())) {
        return propertyNameNodeKindIdentifier$constant();
    }
    return IfElse$Named_checker$propertyNameNodeKind(!stringNamed && isNumericLiteralName(name) && FromString__from_jsnum(name).$value >= 0, propertyNameNodeKindNumericLiteral$constant(), propertyNameNodeKindStringLiteral$constant());
}
export function getTypeAliasForTypeLiteral(c: {
    value: Checker;
} | undefined, t: tsonicTypeScriptRuntime.Location<Type> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsTypeLiteral$constant__from_ast()) >>> 0 === 0) && !Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.isNil()) {
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = WalkUpParenthesizedTypes__from_ast(Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Type>).value.__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        if (IsTypeAliasDeclaration__from_ast(node)) {
            return Checker.$go$private$checker$getSymbolOfDeclaration(c, node);
        }
    }
    return void 0;
}
