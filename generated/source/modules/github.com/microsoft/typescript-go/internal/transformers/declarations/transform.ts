import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, BindingPattern as BindingPattern__from_ast, CallSignatureDeclaration as CallSignatureDeclaration__from_ast, ClassLikeBase as ClassLikeBase__from_ast, CommentRange$Storage as CommentRange__from_ast$Storage, ConditionalTypeNode as ConditionalTypeNode__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ConstructorTypeNode as ConstructorTypeNode__from_ast, Diagnostic as Diagnostic__from_ast, ExportAssignment as ExportAssignment__from_ast, ExportDeclaration as ExportDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, HasFileName as HasFileName__from_ast, ImportClause as ImportClause__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, IndexSignatureDeclaration as IndexSignatureDeclaration__from_ast, JSDocAllType as JSDocAllType__from_ast, JSDocNonNullableType as JSDocNonNullableType__from_ast, JSDocNullableType as JSDocNullableType__from_ast, JSDocOptionalType as JSDocOptionalType__from_ast, JSDocParameterOrPropertyTag as JSDocParameterOrPropertyTag__from_ast, JSDocTypeExpression as JSDocTypeExpression__from_ast, JSDocTypeLiteral as JSDocTypeLiteral__from_ast, JSDocVariadicType as JSDocVariadicType__from_ast, Kind as Kind__from_ast, MappedTypeNode as MappedTypeNode__from_ast, ModifierFlags as ModifierFlags__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeId as NodeId__from_ast, SyntaxList as SyntaxList__from_ast, TypeQueryNode as TypeQueryNode__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Flags as Flags__from_nodebuilder, InternalFlags as InternalFlags__from_nodebuilder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, BindingElement as BindingElement__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, CanHaveModifiers as CanHaveModifiers__from_ast, ClassDeclaration as ClassDeclaration__from_ast, CommentRange as CommentRange__from_ast, ConstructSignatureDeclaration as ConstructSignatureDeclaration__from_ast, CreateModifiersFromModifierFlags as CreateModifiersFromModifierFlags__from_ast, DeclarationBase as DeclarationBase__from_ast, EnumDeclaration as EnumDeclaration__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FileReference as FileReference__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, FunctionOrConstructorTypeNodeBase as FunctionOrConstructorTypeNodeBase__from_ast, FunctionTypeNode as FunctionTypeNode__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, GetElementOrPropertyAccessName as GetElementOrPropertyAccessName__from_ast, GetExternalModuleImportEqualsDeclarationExpression as GetExternalModuleImportEqualsDeclarationExpression__from_ast, GetFirstConstructorWithBody as GetFirstConstructorWithBody__from_ast, GetLeftmostAccessExpression as GetLeftmostAccessExpression__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetNodeId as GetNodeId__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetTextOfPropertyName as GetTextOfPropertyName__from_ast, GetThisContainer as GetThisContainer__from_ast, GetThisParameter as GetThisParameter__from_ast, HasDynamicName as HasDynamicName__from_ast, HasInferredType as HasInferredType__from_ast, HasStaticModifier as HasStaticModifier__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, InterfaceDeclaration as InterfaceDeclaration__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsArrayBindingPattern as IsArrayBindingPattern__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassStaticBlockDeclaration as IsClassStaticBlockDeclaration__from_ast, IsComputedPropertyName as IsComputedPropertyName__from_ast, IsDeclaration as IsDeclaration__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsEntityNameExpression as IsEntityNameExpression__from_ast, IsEntityName as IsEntityName__from_ast, IsExpandoPropertyDeclaration as IsExpandoPropertyDeclaration__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpressionStatement as IsExpressionStatement__from_ast, IsExternalModuleIndicator as IsExternalModuleIndicator__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpressionOrArrowFunction as IsFunctionExpressionOrArrowFunction__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGlobalScopeAugmentation as IsGlobalScopeAugmentation__from_ast, IsHeritageClause as IsHeritageClause__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImplicitlyExportedJSDocDeclaration as IsImplicitlyExportedJSDocDeclaration__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsInJSFile as IsInJSFile__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsLateVisibilityPaintedStatement as IsLateVisibilityPaintedStatement__from_ast, IsLiteralImportTypeNode as IsLiteralImportTypeNode__from_ast, IsModifier as IsModifier__from_ast, IsNonContextualKeyword as IsNonContextualKeyword__from_ast, IsNumericLiteral as IsNumericLiteral__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParseTreeNode as IsParseTreeNode__from_ast, IsPrimitiveLiteralValue as IsPrimitiveLiteralValue__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsTypeLiteralNode as IsTypeLiteralNode__from_ast, IsVarAwaitUsing as IsVarAwaitUsing__from_ast, IsVarUsing as IsVarUsing__from_ast, IsVariableDeclarationInitializedToRequire as IsVariableDeclarationInitializedToRequire__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, JSDocTagBase as JSDocTagBase__from_ast, JSDoc as JSDoc__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDebuggerStatement$constant as KindDebuggerStatement$constant__from_ast, KindDeclareKeyword$constant as KindDeclareKeyword$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindDeferKeyword$constant as KindDeferKeyword$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindEmptyStatement$constant as KindEmptyStatement$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGlobalKeyword$constant as KindGlobalKeyword$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDocAllType$constant as KindJSDocAllType$constant__from_ast, KindJSDocNonNullableType$constant as KindJSDocNonNullableType$constant__from_ast, KindJSDocNullableType$constant as KindJSDocNullableType$constant__from_ast, KindJSDocOptionalType$constant as KindJSDocOptionalType$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocTypeExpression$constant as KindJSDocTypeExpression$constant__from_ast, KindJSDocTypeLiteral$constant as KindJSDocTypeLiteral$constant__from_ast, KindJSDocVariadicType$constant as KindJSDocVariadicType$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindMissingDeclaration$constant as KindMissingDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNotEmittedStatement$constant as KindNotEmittedStatement$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindOmittedExpression$constant as KindOmittedExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSemicolonClassElement$constant as KindSemicolonClassElement$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, LocalsContainerBase as LocalsContainerBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, MethodDeclaration as MethodDeclaration__from_ast, MethodSignatureDeclaration as MethodSignatureDeclaration__from_ast, ModifierFlagsAll$constant as ModifierFlagsAll$constant__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierFlagsParameterPropertyModifier$constant as ModifierFlagsParameterPropertyModifier$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, ModuleDeclaration as ModuleDeclaration__from_ast, MutableNode as MutableNode__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsConst$constant as NodeFlagsConst$constant__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeFlagsSynthesized$constant as NodeFlagsSynthesized$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeIsPresent as NodeIsPresent__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, PropertySignatureDeclaration as PropertySignatureDeclaration__from_ast, ReplaceModifiers as ReplaceModifiers__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, SourceFile as SourceFile__from_ast, StatementBase as StatementBase__from_ast, SymbolFlagsAssignment$constant as SymbolFlagsAssignment$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TypeAliasDeclaration as TypeAliasDeclaration__from_ast, TypeNodeBase as TypeNodeBase__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewTextRange as NewTextRange__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug, Assert as Assert__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Result as Result__from_evaluator } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/evaluator/package.js";
import { Number as Number__from_jsnum } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { AutoGenerateOptions as AutoGenerateOptions__from_printer, EFNoComments$constant as EFNoComments$constant__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, GeneratedIdentifierFlagsOptimistic$int as GeneratedIdentifierFlagsOptimistic$int__from_printer, GeneratedIdentifierFlags as GeneratedIdentifierFlags__from_printer, NodeFactory as NodeFactory__from_printer, SymbolAccessibilityResult as SymbolAccessibilityResult__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetTextOfJSDocComment as GetTextOfJSDocComment__from_scanner, GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner, IdentifierToKeywordKind as IdentifierToKeywordKind__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner, SkipTriviaEx as SkipTriviaEx__from_scanner, SkipTriviaOptions as SkipTriviaOptions__from_scanner, StringToToken as StringToToken__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsOriginalNodeSingleLine as IsOriginalNodeSingleLine__from_transformers, IsSimpleInlineableExpression as IsSimpleInlineableExpression__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetRelativePathToDirectoryOrUrl as GetRelativePathToDirectoryOrUrl__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { Set$Add$PointerTo_Named_ast$Node, Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Clear$PointerTo_Named_ast$Node, Set$Clear$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Clear.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { IfElse$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$FileReference$Named_declarations$ReferencedFilePair } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/IndexFunc.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_declarations$SymbolTrackerImpl as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$DeclarationFilePath$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEffectiveDeclarationFlags$PointerTo_Named_ast$Node_Named_ast$ModifierFlags_to_Named_ast$ModifierFlags, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetOutputPathsFor$PointerTo_Named_ast$SourceFile_bool_to_Named_declarations$OutputPaths, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolutionModeOverride$PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceFileFromReference$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$FileReference_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$JsFilePath$void_to_string, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node, $goMap$MapOf_Named_ast$NodeId_To_SliceOf_PointerTo_Named_ast$Node, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_string_To_PointerTo_Named_ast$Symbol, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { SymbolAccessibilityDiagnostic, createGetSymbolAccessibilityDiagnosticForNode, createGetSymbolAccessibilityDiagnosticForNodeName } from "./diagnostics.js";
import { NewSymbolTracker, SymbolTrackerImpl, SymbolTrackerSharedState, createDiagnosticForNode } from "./tracker.js";
import { canHaveLiteralInitializer, canProduceDiagnostics, getBindingNameVisible, getEffectiveBaseTypeNode, hasScopeMarker, isAlwaysType, isDeclarationAndNotVisible, isEnclosingDeclaration, isPrivateMethodTypeParameter, maskModifierFlags, needsScopeMarker, shouldEmitFunctionProperties, unwrapParenthesizedExpression } from "./util.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type ReferencedFilePair$Storage = {
    file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    ref: {
        value: FileReference__from_ast;
    } | undefined;
};
export class ReferencedFilePair implements GoContainerStoredValue<ReferencedFilePair$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ReferencedFilePair$Storage) {
    }
    public static $storageOf($source: ReferencedFilePair): ReferencedFilePair$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ReferencedFilePair$Storage): ReferencedFilePair {
        return new ReferencedFilePair($source);
    }
    public get file(): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return this.$storage.file;
    }
    public set file($value: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
        this.$storage.file = $value;
    }
    public get ref(): {
        value: FileReference__from_ast;
    } | undefined {
        return this.$storage.ref;
    }
    public set ref($value: {
        value: FileReference__from_ast;
    } | undefined) {
        this.$storage.ref = $value;
    }
    declare readonly [$goContainerStorageType]: ReferencedFilePair$Storage;
    static $zero(): ReferencedFilePair {
        return new ReferencedFilePair({
            file: void 0,
            ref: void 0
        });
    }
    static $copy($source: ReferencedFilePair): ReferencedFilePair {
        return new ReferencedFilePair({
            file: $source.$storage.file,
            ref: $source.$storage.ref
        });
    }
    static $zeroStorage(): ReferencedFilePair$Storage {
        return {
            file: void 0,
            ref: void 0
        };
    }
    declare private readonly then?: never;
}
export interface OutputPaths extends GoInterfaceValue {
    DeclarationFilePath(): gostring;
    JsFilePath(): gostring;
}
export const OutputPaths$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$DeclarationFilePath$void_to_string, $goInterfaceMethod$JsFilePath$void_to_string]);
export function OutputPaths$is(value: GoInterfaceValue | undefined): value is OutputPaths {
    return value !== undefined && value.$go$implements(OutputPaths$contract);
}
export interface DeclarationEmitHost extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    FileExists($argument0: gostring): bool;
    GetCurrentDirectory(): gostring;
    GetDefaultResolutionModeForFile($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core;
    GetEffectiveDeclarationFlags($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $argument1: ModifierFlags__from_ast): ModifierFlags__from_ast;
    GetEmitResolver(): EmitResolver__from_printer | undefined;
    GetGlobalTypingsCacheLocation(): gostring;
    GetModeForUsageLocation($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core;
    GetNearestAncestorDirectoryWithPackageJson($argument0: gostring): gostring;
    GetOutputPathsFor($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: bool): OutputPaths | undefined;
    GetPackageJsonInfo($argument0: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined;
    GetProjectReferenceFromSource($argument0: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined;
    GetRedirectTargets($argument0: Path__from_tspath): RuntimeSlice<gostring>;
    GetResolutionModeOverride($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core;
    GetResolvedModuleFromModuleSpecifier($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined;
    GetSourceFileFromReference($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $argument1: {
        value: FileReference__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    GetSourceOfProjectReferenceIfOutputIncluded($argument0: HasFileName__from_ast | undefined): gostring;
    GetSymlinkCache(): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined;
    UseCaseSensitiveFileNames(): bool;
}
export const DeclarationEmitHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetEffectiveDeclarationFlags$PointerTo_Named_ast$Node_Named_ast$ModifierFlags_to_Named_ast$ModifierFlags, $goInterfaceMethod$GetEmitResolver$void_to_Named_printer$EmitResolver, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetOutputPathsFor$PointerTo_Named_ast$SourceFile_bool_to_Named_declarations$OutputPaths, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolutionModeOverride$PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceFileFromReference$PointerTo_Named_ast$SourceFile_PointerTo_Named_ast$FileReference_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function DeclarationEmitHost$is(value: GoInterfaceValue | undefined): value is DeclarationEmitHost {
    return value !== undefined && value.$go$implements(DeclarationEmitHost$contract);
}
export class DeclarationTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public host: DeclarationEmitHost | undefined, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public tracker: {
        value: SymbolTrackerImpl;
    } | undefined, public state: {
        value: SymbolTrackerSharedState;
    } | undefined, public resolver: EmitResolver__from_printer | undefined, public declarationFilePath: gostring, public declarationMapPath: gostring, public needsDeclare: bool, public needsScopeFixMarker: bool, public resultHasScopeMarker: bool, public enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public resultHasExternalModuleIndicator: bool, public suppressNewDiagnosticContexts: bool, public witnessedCjsExports: Set__from_collections<gostring>, public lateStatementReplacementMap: GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public expandoHosts: GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public expandoMembers: GoMapValue<NodeId__from_ast, RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, public seenProperties: Set__from_collections<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public thisPropertyAssignmentsCollected: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public rawReferencedFiles: RuntimeSlice<ReferencedFilePair$Storage>, public rawTypeReferenceDirectives: RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined>, public rawLibReferenceDirectives: RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined>, public bindingNameVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public expressionVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public exportStrippingVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public thisPropertyVisitor: {
        value: NodeVisitor__from_ast;
    } | undefined) {
    }
    declare private readonly then?: never;
    static GetDiagnostics(tx: DeclarationTransformer | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics;
    }
    static $go$private$declarations$checkEntityNameVisibility(tx: DeclarationTransformer | undefined, entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_receiver_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_argument_27 = entityName;
        const __gotots_argument_28 = enclosingDeclaration;
        let visibilityResult = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_21).IsEntityNameVisible(__gotots_argument_27, __gotots_argument_28);
        SymbolTrackerImpl.$go$private$declarations$handleSymbolAccessibilityError((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, SymbolAccessibilityResult__from_printer.$copy(visibilityResult));
    }
    static $go$private$declarations$checkName(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
        }
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = Node__from_ast.Name(node);
        Assert__from_debug(HasDynamicName__from_ast(node), RuntimeSlice.nil<GoInterface | undefined>());
        let entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.Name(node));
        DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, entityName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
        }
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = void 0;
    }
    static $go$private$declarations$collectFileReferences(tx: DeclarationTransformer | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        const __gotots_slice_build_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawReferencedFiles;
        const __gotots_slice_build_3 = Map$PointerTo_Named_ast$FileReference$Named_declarations$ReferencedFilePair(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles, (ref: {
            value: FileReference__from_ast;
        } | undefined): ReferencedFilePair => {
            return ReferencedFilePair.$fromStorage({
                file: sourceFile,
                ref: ref
            });
        });
        let __gotots_slice_build_4 = __gotots_slice_build_3;
        if (__gotots_slice_build_3.length > 0) {
            __gotots_slice_build_4 = goSliceAllocate<ReferencedFilePair$Storage>(__gotots_slice_build_3.length, null);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_3.length; __gotots_slice_build_7++) {
                __gotots_slice_build_4.set(__gotots_slice_build_7, ReferencedFilePair.$storageOf(ReferencedFilePair.$copy(ReferencedFilePair.$fromStorage(__gotots_slice_build_3.get(__gotots_slice_build_7)))));
            }
        }
        const __gotots_slice_build_6 = __gotots_slice_build_2.length + __gotots_slice_build_4.length;
        let __gotots_slice_build_5 = __gotots_slice_build_2;
        if (__gotots_slice_build_6 <= __gotots_slice_build_2.capacity) {
            __gotots_slice_build_5 = __gotots_slice_build_2.$withLength(__gotots_slice_build_6);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                __gotots_slice_build_5.set(__gotots_slice_build_2.length + __gotots_slice_build_7, __gotots_slice_build_4.get(__gotots_slice_build_7));
            }
        }
        else {
            __gotots_slice_build_5 = goSliceAllocate<ReferencedFilePair$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_6));
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_2.length; __gotots_slice_build_7++) {
                __gotots_slice_build_5.set(__gotots_slice_build_7, ReferencedFilePair.$storageOf(ReferencedFilePair.$copy(ReferencedFilePair.$fromStorage(__gotots_slice_build_2.get(__gotots_slice_build_7)))));
            }
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                __gotots_slice_build_5.set(__gotots_slice_build_2.length + __gotots_slice_build_7, __gotots_slice_build_4.get(__gotots_slice_build_7));
            }
            for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                __gotots_slice_build_5.$initialize(__gotots_slice_build_7, ReferencedFilePair.$zeroStorage());
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawReferencedFiles = __gotots_slice_build_5;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawTypeReferenceDirectives = goSliceAppendSlice<{
            value: FileReference__from_ast;
        } | undefined>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawTypeReferenceDirectives, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives, void 0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawLibReferenceDirectives = goSliceAppendSlice<{
            value: FileReference__from_ast;
        } | undefined>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawLibReferenceDirectives, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives, void 0);
    }
    static $go$private$declarations$collectThisPropertyAssignments(tx: DeclarationTransformer | undefined, input: {
        value: ClassDeclaration__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    let seen = Set__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>({
                        M: $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil()
                    });
                    const seen$location = tsonicTypeScriptRuntime.boundLocation({}, () => seen, seen$next => seen = seen$next);
                    const __gotots_range_22 = NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_22.length; __gotots_range_index_17++) {
                        const __gotots_range_value_23 = __gotots_range_22.get(__gotots_range_index_17);
                        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_23;
                        if (!(Node__from_ast.Name(member) === undefined)) {
                            Set$Add$PointerTo_Named_ast$Node(seen$location, member);
                        }
                    }
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).seenProperties = Set__from_collections.$copy<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(seen);
                    const __gotots_store_618 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_235 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_618, "seenProperties");
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        Set$Clear$PointerTo_Named_ast$Node(__gotots_receiver_235);
                    };
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyAssignmentsCollected = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]);
                    const __gotots_callee_22 = (): void => {
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyAssignmentsCollected = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    };
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_22();
                    };
                    const __gotots_range_23 = NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_23.length; __gotots_range_index_18++) {
                        const __gotots_range_value_24 = __gotots_range_23.get(__gotots_range_index_18);
                        let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_24;
                        NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyVisitor, n);
                    }
                    __gotots_return_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyAssignmentsCollected;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_0 = __gotots_caught_2;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$declarations$createFullExpandoBlock(tx: DeclarationTransformer | undefined, id: NodeId__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts.lookup(id);
        {
            const __gotots_results_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers.lookupOk(id);
            let addOns = __gotots_results_11[0];
            let ok = __gotots_results_11[1];
            if (ok) {
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                let host = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                if (!(n === undefined) && Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                    const __gotots_store_428 = NodeBase__from_ast.$storageOf((Node__from_ast.AsSyntaxList(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
                    const __gotots_range_14 = named_iter.IterSeqValueOperations.$project(NodeDefault__from_ast.IterChildren(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_428, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)));
                    if (__gotots_range_14 === void 0) {
                        GoPanic.raiseRuntime("call of nil function");
                    }
                    let __gotots_range_state_4 = 1;
                    __gotots_range_14(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        if (__gotots_range_state_4 === 0) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        if (__gotots_range_state_4 === -1) {
                            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                        }
                        if (__gotots_range_state_4 === -2) {
                            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                        }
                        if (__gotots_range_state_4 === 2) {
                            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                        }
                        __gotots_range_state_4 = -1;
                        const __gotots_range_value_14 = $argument0;
                        let c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
                        if (!(Node__from_ast.Name(c) === undefined)) {
                            const __gotots_receiver_185 = Node__from_ast.Name(c);
                            const __gotots_store_429 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_460 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_429.Transformer));
                            name = Node__from_ast.Clone(__gotots_receiver_185, __gotots_argument_460);
                            if (!(Node__from_ast.Modifiers(c) === undefined)) {
                                const __gotots_receiver_186 = Node__from_ast.Modifiers(c);
                                const __gotots_store_430 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_431 = (Transformer__from_transformers.Factory(__gotots_store_430.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_461 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_431, "NodeFactory"));
                                modifiers = ModifierList__from_ast.Clone(__gotots_receiver_186, __gotots_argument_461);
                            }
                            __gotots_range_state_4 = 0;
                            return false;
                        }
                        __gotots_range_state_4 = 1;
                        return true;
                    });
                    if (__gotots_range_state_4 === -1) {
                        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                    }
                    __gotots_range_state_4 = -2;
                    host = (Node__from_ast.AsSyntaxList(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                }
                else if (!(n === undefined)) {
                    const __gotots_receiver_187 = Node__from_ast.Name(n);
                    const __gotots_store_432 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_462 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_432.Transformer));
                    name = Node__from_ast.Clone(__gotots_receiver_187, __gotots_argument_462);
                    if (!(Node__from_ast.Modifiers(n) === undefined)) {
                        const __gotots_receiver_188 = Node__from_ast.Modifiers(n);
                        const __gotots_store_433 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_434 = (Transformer__from_transformers.Factory(__gotots_store_433.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_463 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_434, "NodeFactory"));
                        modifiers = ModifierList__from_ast.Clone(__gotots_receiver_188, __gotots_argument_463);
                    }
                    host = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([n]);
                }
                if (!(name === undefined)) {
                    const __gotots_store_435 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_436 = (Transformer__from_transformers.Factory(__gotots_store_435.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_190 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_436, "NodeFactory");
                    const __gotots_argument_465 = modifiers;
                    const __gotots_argument_466 = KindNamespaceKeyword$constant__from_ast();
                    const __gotots_argument_467 = name;
                    const __gotots_store_437 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_438 = (Transformer__from_transformers.Factory(__gotots_store_437.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_189 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_438, "NodeFactory");
                    const __gotots_store_439 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_440 = (Transformer__from_transformers.Factory(__gotots_store_439.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_464 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_440, "NodeFactory"), addOns);
                    const __gotots_argument_468 = NodeFactory__from_ast.NewModuleBlock(__gotots_receiver_189, __gotots_argument_464);
                    let moduleDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewModuleDeclaration(__gotots_receiver_190, __gotots_argument_465, __gotots_argument_466, __gotots_argument_467, __gotots_argument_468);
                    let members = host.append(void 0, [moduleDecl]);
                    const __gotots_store_441 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_442 = (Transformer__from_transformers.Factory(__gotots_store_441.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_442, "NodeFactory"), members);
                }
            }
        }
        return n;
    }
    static $go$private$declarations$ensureModifierFlags(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModifierFlags__from_ast {
        let mask = 130030;
        let additions = ModifierFlagsNone$constant__from_ast();
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare && !isAlwaysType(node)) {
            additions = ModifierFlagsAmbient$constant__from_ast();
        }
        let parentIsFile = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast();
        if (!parentIsFile) {
            mask = (mask ^ 128) >>> 0;
            additions = ModifierFlagsNone$constant__from_ast();
        }
        if (IsImplicitlyExportedJSDocDeclaration__from_ast(node)) {
            additions = (additions | 32) >>> 0;
        }
        return maskModifierFlags(node, mask, additions);
    }
    static $go$private$declarations$ensureModifiers(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        const __gotots_store_571 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_566 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_571.Transformer), node);
        const __gotots_binary_operand_0 = GetCombinedModifierFlags__from_ast(__gotots_argument_566);
        const __gotots_binary_operand_1 = ModifierFlagsAll$constant__from_ast();
        let currentFlags = (__gotots_binary_operand_0 & __gotots_binary_operand_1) >>> 0;
        let newFlags = DeclarationTransformer.$go$private$declarations$ensureModifierFlags(tx, node);
        if (currentFlags === newFlags) {
            let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(node);
            if (mods === undefined) {
                return mods;
            }
            const __gotots_store_572 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_573 = (Transformer__from_transformers.Factory(__gotots_store_572.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_573, "NodeFactory"), Filter$PointerTo_Named_ast$Node((void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                ModifierList__from_ast.$storageOf(((mods ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes, IsModifier__from_ast));
        }
        const __gotots_argument_567 = newFlags;
        const __gotots_store_574 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_575 = (Transformer__from_transformers.Factory(__gotots_store_574.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_224 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_575, "NodeFactory");
        const __gotots_argument_568 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewModifier(__gotots_receiver_224, $argument0);
        };
        let result = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_567, __gotots_argument_568);
        if (result.length === 0) {
            return void 0;
        }
        const __gotots_store_576 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_577 = (Transformer__from_transformers.Factory(__gotots_store_576.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_577, "NodeFactory"), result);
    }
    static $go$private$declarations$ensureNoInitializer(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (DeclarationTransformer.$go$private$declarations$shouldPrintWithInitializer(tx, node)) {
            let unwrappedInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = unwrapParenthesizedExpression(Node__from_ast.Initializer(node));
            if (!IsPrimitiveLiteralValue__from_ast(unwrappedInitializer, true)) {
                SymbolTrackerImpl.ReportInferenceFallback((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, node);
            }
            const __gotots_receiver_229 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_594 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_585 = Transformer__from_transformers.EmitContext(__gotots_store_594.Transformer);
            const __gotots_store_595 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_586 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_595.Transformer), node);
            const __gotots_argument_587 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
            return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_229).CreateLiteralConstValue(__gotots_argument_585, __gotots_argument_586, __gotots_argument_587);
        }
        return void 0;
    }
    static $go$private$declarations$ensureParameter(tx: DeclarationTransformer | undefined, p: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            const __gotots_store_618 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_609 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_618, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(__gotots_argument_609);
        }
        let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_receiver_235 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_619 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_610 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_619, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_235).IsOptionalParameter(__gotots_argument_610)) {
            if (!(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken === undefined)) {
                questionToken = ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken;
            }
            else {
                const __gotots_store_620 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_621 = (Transformer__from_transformers.Factory(__gotots_store_620.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                questionToken = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_621, "NodeFactory"), KindQuestionToken$constant__from_ast());
            }
        }
        const __gotots_store_622 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_623 = (Transformer__from_transformers.Factory(__gotots_store_622.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_238 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_623, "NodeFactory");
        const __gotots_argument_614 = p;
        const __gotots_argument_615 = void 0;
        const __gotots_argument_616 = ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
        const __gotots_argument_617 = NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bindingNameVisitor, ParameterDeclaration__from_ast.Name(p));
        const __gotots_argument_618 = questionToken;
        const __gotots_receiver_236 = tx;
        const __gotots_store_624 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_611 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_624, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_612 = true;
        const __gotots_argument_619 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_236, __gotots_argument_611, __gotots_argument_612);
        const __gotots_receiver_237 = tx;
        const __gotots_store_625 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_613 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_625, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_620 = DeclarationTransformer.$go$private$declarations$ensureNoInitializer(__gotots_receiver_237, __gotots_argument_613);
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_238, __gotots_argument_614, __gotots_argument_615, __gotots_argument_616, __gotots_argument_617, __gotots_argument_618, __gotots_argument_619, __gotots_argument_620);
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
        return result;
    }
    static $go$private$declarations$ensureType(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ignorePrivate: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_5 = !ignorePrivate;
        if (__gotots_logical_result_5) {
            const __gotots_receiver_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_67 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_78.Transformer), node);
            const __gotots_argument_68 = ModifierFlagsPrivate$constant__from_ast();
            __gotots_logical_result_5 = !(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_39).GetEffectiveDeclarationFlags(__gotots_argument_67, __gotots_argument_68) === 0);
        }
        if (__gotots_logical_result_5) {
            return void 0;
        }
        if (DeclarationTransformer.$go$private$declarations$shouldPrintWithInitializer(tx, node)) {
            return void 0;
        }
        let __gotots_logical_result_7 = !IsExportAssignment__from_ast(node) && !IsBindingElement__from_ast(node) && !(Node__from_ast.Type(node) === undefined);
        if (__gotots_logical_result_7) {
            let __gotots_logical_result_6 = !IsParameterDeclaration__from_ast(node);
            if (!__gotots_logical_result_6) {
                const __gotots_receiver_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_argument_69 = node;
                const __gotots_argument_70 = void 0;
                const __gotots_argument_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                __gotots_logical_result_6 = !goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_40).RequiresAddingImplicitUndefined(__gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
            }
            __gotots_logical_result_7 = (__gotots_logical_result_6);
        }
        if (__gotots_logical_result_7) {
            if (SourceFile__from_ast.IsJS(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile)) {
                const __gotots_receiver_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_72 = Transformer__from_transformers.EmitContext(__gotots_store_79.Transformer);
                const __gotots_argument_73 = Node__from_ast.Type(node);
                const __gotots_argument_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                const __gotots_argument_75 = declarationEmitNodeBuilderFlags$constant();
                const __gotots_argument_76 = declarationEmitInternalNodeBuilderFlags$constant();
                const __gotots_argument_77 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_41).TryJSTypeNodeToTypeNode(__gotots_argument_72, __gotots_argument_73, __gotots_argument_74, __gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
                if (!(res === undefined)) {
                    return res;
                }
            }
            else {
                const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_callee_0: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_80.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
                const __gotots_argument_78 = Node__from_ast.Type(node);
                return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78);
            }
        }
        let oldErrorNameNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = Node__from_ast.Name(node);
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            oldDiag = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
            if (canProduceDiagnostics(node)) {
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
            }
        }
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (HasInferredType__from_ast(node)) {
            const __gotots_receiver_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_79 = Transformer__from_transformers.EmitContext(__gotots_store_81.Transformer);
            const __gotots_argument_80 = node;
            const __gotots_argument_81 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
            const __gotots_argument_82 = declarationEmitNodeBuilderFlags$constant();
            const __gotots_argument_83 = declarationEmitInternalNodeBuilderFlags$constant();
            const __gotots_argument_84 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
            typeNode = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_42).CreateTypeOfDeclaration(__gotots_argument_79, __gotots_argument_80, __gotots_argument_81, __gotots_argument_82, __gotots_argument_83, __gotots_argument_84);
        }
        else if (IsFunctionLike__from_ast(node)) {
            const __gotots_receiver_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_85 = Transformer__from_transformers.EmitContext(__gotots_store_82.Transformer);
            const __gotots_argument_86 = node;
            const __gotots_argument_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
            const __gotots_argument_88 = declarationEmitNodeBuilderFlags$constant();
            const __gotots_argument_89 = declarationEmitInternalNodeBuilderFlags$constant();
            const __gotots_argument_90 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
            typeNode = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_43).CreateReturnTypeOfSignatureDeclaration(__gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90);
        }
        else {
            AssertNever__from_debug(new $goInterfaceAdapter$PointerTo_Named_ast$Node(node), RuntimeSlice.nil<GoInterface | undefined>());
        }
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = oldErrorNameNode;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
        }
        if (typeNode === undefined) {
            const __gotots_store_83 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_84 = (Transformer__from_transformers.Factory(__gotots_store_83.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_84, "NodeFactory"), KindAnyKeyword$constant__from_ast());
        }
        return typeNode;
    }
    static $go$private$declarations$ensureTypeParams(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, params: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        const __gotots_receiver_225 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_578 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_569 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_578.Transformer), node);
        const __gotots_argument_570 = ModifierFlagsPrivate$constant__from_ast();
        if (!(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_225).GetEffectiveDeclarationFlags(__gotots_argument_569, __gotots_argument_570) === 0)) {
            return void 0;
        }
        let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        {
            const __gotots_store_579 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            typeParameters = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_579.Transformer), params);
            if (!(typeParameters === undefined)) {
                return typeParameters;
            }
        }
        let oldErrorNameNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = Node__from_ast.Name(node);
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            oldDiag = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
            if (canProduceDiagnostics(node)) {
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
            }
        }
        {
            let data: tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast> | undefined = Node__from_ast.FunctionLikeData(node);
            if (!(data === undefined) && !(FunctionLikeBase__from_ast.$storageOf(((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature === undefined)) {
                {
                    const __gotots_receiver_226 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                    const __gotots_store_580 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_571 = Transformer__from_transformers.EmitContext(__gotots_store_580.Transformer);
                    const __gotots_argument_572 = node;
                    const __gotots_argument_573 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                    const __gotots_argument_574 = declarationEmitNodeBuilderFlags$constant();
                    const __gotots_argument_575 = declarationEmitInternalNodeBuilderFlags$constant();
                    const __gotots_argument_576 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                    let nodes = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_226).CreateTypeParametersOfSignatureDeclaration(__gotots_argument_571, __gotots_argument_572, __gotots_argument_573, __gotots_argument_574, __gotots_argument_575, __gotots_argument_576);
                    if (!nodes.isNil()) {
                        typeParameters =
                            tsonicTypeScriptRuntime.location<NodeList__from_ast>(NodeList__from_ast.$fromStorage({
                                Loc: TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc))),
                                Nodes: nodes
                            }));
                    }
                }
            }
        }
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = oldErrorNameNode;
        if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
        }
        return typeParameters;
    }
    static $go$private$declarations$getExpandoHostId(tx: DeclarationTransformer | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): NodeId__from_ast {
        let root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(IsVariableDeclaration__from_ast(declaration), Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, declaration);
        const __gotots_store_374 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_384 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_374.Transformer), root);
        let id = GetNodeId__from_ast(__gotots_argument_384);
        return id;
    }
    static $go$private$declarations$getLeadingCommentRangesOfNode(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): iter__from_gostdlib.Seq<CommentRange__from_ast> {
        if (node === undefined || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast()) {
            return named_iter.IterSeqValueOperations.$wrap(void 0);
        }
        const __gotots_store_614 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_615 = (Transformer__from_transformers.Factory(__gotots_store_614.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_604 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_615, "NodeFactory"));
        const __gotots_argument_605 = SourceFile__from_ast.Text(sourceFile);
        const __gotots_argument_606 = Node__from_ast.Pos(node);
        return GetLeadingCommentRanges__from_scanner(__gotots_argument_604, __gotots_argument_605, __gotots_argument_606);
    }
    static $go$private$declarations$getLibReferences(tx: DeclarationTransformer | undefined): RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined> {
        let result: RuntimeSlice<{
            value: FileReference__from_ast;
        } | undefined> = RuntimeSlice.nil<{
            value: FileReference__from_ast;
        } | undefined>();
        const __gotots_range_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawLibReferenceDirectives;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let ref: {
                value: FileReference__from_ast;
            } | undefined = __gotots_range_value_7;
            if (!(ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) {
                continue;
            }
            result = result.append(void 0, [
                { value: new FileReference__from_ast(NewTextRange__from_core(-1, -1), (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) },
            ]);
        }
        return result;
    }
    static $go$private$declarations$getNameExpressionPreferringIdentifier(tx: DeclarationTransformer | undefined, nameExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsNumericLiteral__from_ast(nameExpr)) {
            const __gotots_store_121 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_122 = (Transformer__from_transformers.Factory(__gotots_store_121.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            nameExpr = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_122, "NodeFactory"), Node__from_ast.Text(nameExpr), TokenFlagsNone$constant__from_ast());
        }
        if (IsStringLiteralLike__from_ast(nameExpr) && IsIdentifierText__from_scanner(Node__from_ast.Text(nameExpr), LanguageVariantStandard$constant__from_core())) {
            const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_124 = (Transformer__from_transformers.Factory(__gotots_store_123.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_124, "NodeFactory"), Node__from_ast.Text(nameExpr));
            let kwKind = IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(result));
            if (kwKind === KindUnknown$constant__from_ast() || kwKind === KindDefaultKeyword$constant__from_ast()) {
                Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((nameExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                const __gotots_store_125 = Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                __gotots_store_125.Flags = (__gotots_store_125.Flags & ~16) >>> 0;
                return result;
            }
        }
        return nameExpr;
    }
    static $go$private$declarations$getReferencedFiles(tx: DeclarationTransformer | undefined, outputFilePath: gostring): RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined> {
        let results: RuntimeSlice<{
            value: FileReference__from_ast;
        } | undefined> = RuntimeSlice.nil<{
            value: FileReference__from_ast;
        } | undefined>();
        const __gotots_range_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawReferencedFiles;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_9 = ReferencedFilePair.$copy(ReferencedFilePair.$fromStorage(__gotots_range_9.get(__gotots_range_index_9)));
            let pair = __gotots_range_value_9;
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = ReferencedFilePair.$storageOf(pair).file;
            let ref: {
                value: FileReference__from_ast;
            } | undefined = ReferencedFilePair.$storageOf(pair).ref;
            if (!(ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) {
                continue;
            }
            const __gotots_receiver_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_argument_386 = sourceFile;
            const __gotots_argument_387 = ref;
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_159).GetSourceFileFromReference(__gotots_argument_386, __gotots_argument_387);
            if (file === undefined) {
                continue;
            }
            let declFileName = "";
            if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
                declFileName = SourceFile__from_ast.FileName(file);
            }
            else {
                const __gotots_receiver_160 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_388 = file;
                const __gotots_argument_389 = true;
                let paths: OutputPaths | undefined = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_160).GetOutputPathsFor(__gotots_argument_388, __gotots_argument_389);
                const __gotots_receiver_161 = paths;
                declFileName = goInterfaceNonNil<OutputPaths>(__gotots_receiver_161).DeclarationFilePath();
                if (declFileName.length === 0) {
                    const __gotots_receiver_162 = paths;
                    declFileName = goInterfaceNonNil<OutputPaths>(__gotots_receiver_162).JsFilePath();
                }
                if (declFileName.length === 0) {
                    declFileName = SourceFile__from_ast.FileName(file);
                }
            }
            if (declFileName.length === 0) {
                continue;
            }
            const __gotots_argument_390 = outputFilePath;
            const __gotots_argument_391 = declFileName;
            const __gotots_argument_392 = false;
            const __gotots_receiver_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_field_0 = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_163).GetCurrentDirectory();
            const __gotots_receiver_164 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_field_1 = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_164).UseCaseSensitiveFileNames();
            const __gotots_argument_393 = new ComparePathsOptions__from_tspath(__gotots_field_1, __gotots_field_0);
            let fileName = GetRelativePathToDirectoryOrUrl__from_tspath(__gotots_argument_390, __gotots_argument_391, __gotots_argument_392, __gotots_argument_393);
            results = results.append(void 0, [
                { value: new FileReference__from_ast(NewTextRange__from_core(-1, -1), fileName, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) },
            ]);
        }
        return results;
    }
    static $go$private$declarations$getTypeReferences(tx: DeclarationTransformer | undefined): RuntimeSlice<{
        value: FileReference__from_ast;
    } | undefined> {
        let result: RuntimeSlice<{
            value: FileReference__from_ast;
        } | undefined> = RuntimeSlice.nil<{
            value: FileReference__from_ast;
        } | undefined>();
        const __gotots_range_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawTypeReferenceDirectives;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
            let ref: {
                value: FileReference__from_ast;
            } | undefined = __gotots_range_value_8;
            if (!(ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) {
                continue;
            }
            result = result.append(void 0, [
                { value: new FileReference__from_ast(NewTextRange__from_core(-1, -1), (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve) },
            ]);
        }
        return result;
    }
    static $go$private$declarations$isInternalDeclaration(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        if (node === undefined) {
            return false;
        }
        const __gotots_store_380 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parseTreeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_380.Transformer), node);
        if (!IsParseTreeNode__from_ast(parseTreeNode)) {
            return false;
        }
        if (Node__from_ast.$storageOf(((parseTreeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
            let params = Node__from_ast.Parameters(Node__from_ast.$storageOf(((parseTreeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            let paramIdx = IndexFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(params, (p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return tsonicTypeScriptRuntime.sameLocation((void Node__from_ast.AsNode,
                    p), parseTreeNode);
            });
            let previousSibling: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (paramIdx > 0) {
                previousSibling =
                    (void Node__from_ast.AsNode,
                        params.get(paramIdx - 1));
            }
            let text = SourceFile__from_ast.Text(sourceFile);
            let commentRanges = RuntimeSlice.nil<CommentRange__from_ast$Storage>();
            if (!(previousSibling === undefined)) {
                let trailingPos = SkipTriviaEx__from_scanner(text, Node__from_ast.End(previousSibling) + 1, new SkipTriviaOptions__from_scanner(false, true, false));
                const __gotots_store_381 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_382 = (Transformer__from_transformers.Factory(__gotots_store_381.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_394 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_382, "NodeFactory"));
                const __gotots_argument_395 = text;
                const __gotots_argument_396 = trailingPos;
                const __gotots_range_10 = named_iter.IterSeqValueOperations.$project(GetTrailingCommentRanges__from_scanner(__gotots_argument_394, __gotots_argument_395, __gotots_argument_396));
                if (__gotots_range_10 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_0 = 1;
                __gotots_range_10(($argument0: CommentRange__from_ast): bool => {
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
                    const __gotots_range_value_10 = CommentRange__from_ast.$copy($argument0);
                    let comment = __gotots_range_value_10;
                    const __gotots_slice_build_8 = commentRanges;
                    const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                    let __gotots_slice_build_9 = __gotots_slice_build_8;
                    if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                        __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                        __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                    }
                    else {
                        __gotots_slice_build_9 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                        for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                            __gotots_slice_build_9.set(__gotots_slice_build_11, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                        }
                        __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                        for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                            __gotots_slice_build_9.$initialize(__gotots_slice_build_11, CommentRange__from_ast.$zeroStorage());
                        }
                    }
                    commentRanges = __gotots_slice_build_9;
                    __gotots_range_state_0 = 1;
                    return true;
                });
                if (__gotots_range_state_0 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_0 = -2;
                const __gotots_store_383 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_384 = (Transformer__from_transformers.Factory(__gotots_store_383.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_397 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_384, "NodeFactory"));
                const __gotots_argument_398 = text;
                const __gotots_argument_399 = Node__from_ast.Pos(node);
                const __gotots_range_11 = named_iter.IterSeqValueOperations.$project(GetLeadingCommentRanges__from_scanner(__gotots_argument_397, __gotots_argument_398, __gotots_argument_399));
                if (__gotots_range_11 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_1 = 1;
                __gotots_range_11(($argument0: CommentRange__from_ast): bool => {
                    if (__gotots_range_state_1 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_1 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_1 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_1 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_1 = -1;
                    const __gotots_range_value_11 = CommentRange__from_ast.$copy($argument0);
                    let comment = __gotots_range_value_11;
                    const __gotots_slice_build_12 = commentRanges;
                    const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                    let __gotots_slice_build_13 = __gotots_slice_build_12;
                    if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                        __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                    }
                    else {
                        __gotots_slice_build_13 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.set(__gotots_slice_build_15, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                        }
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                        for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.$initialize(__gotots_slice_build_15, CommentRange__from_ast.$zeroStorage());
                        }
                    }
                    commentRanges = __gotots_slice_build_13;
                    __gotots_range_state_1 = 1;
                    return true;
                });
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_1 = -2;
            }
            else {
                let trailingPos = SkipTriviaEx__from_scanner(text, Node__from_ast.Pos(node), new SkipTriviaOptions__from_scanner(false, true, false));
                const __gotots_store_385 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_386 = (Transformer__from_transformers.Factory(__gotots_store_385.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_400 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_386, "NodeFactory"));
                const __gotots_argument_401 = text;
                const __gotots_argument_402 = trailingPos;
                const __gotots_range_12 = named_iter.IterSeqValueOperations.$project(GetTrailingCommentRanges__from_scanner(__gotots_argument_400, __gotots_argument_401, __gotots_argument_402));
                if (__gotots_range_12 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_2 = 1;
                __gotots_range_12(($argument0: CommentRange__from_ast): bool => {
                    if (__gotots_range_state_2 === 0) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    if (__gotots_range_state_2 === -1) {
                        GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                    }
                    if (__gotots_range_state_2 === -2) {
                        GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                    }
                    if (__gotots_range_state_2 === 2) {
                        GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                    }
                    __gotots_range_state_2 = -1;
                    const __gotots_range_value_12 = CommentRange__from_ast.$copy($argument0);
                    let comment = __gotots_range_value_12;
                    const __gotots_slice_build_16 = commentRanges;
                    const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                    let __gotots_slice_build_17 = __gotots_slice_build_16;
                    if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                        __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                        __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                    }
                    else {
                        __gotots_slice_build_17 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                        for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                            __gotots_slice_build_17.set(__gotots_slice_build_19, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
                        }
                        __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(comment)));
                        for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                            __gotots_slice_build_17.$initialize(__gotots_slice_build_19, CommentRange__from_ast.$zeroStorage());
                        }
                    }
                    commentRanges = __gotots_slice_build_17;
                    __gotots_range_state_2 = 1;
                    return true;
                });
                if (__gotots_range_state_2 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_2 = -2;
            }
            if (commentRanges.length > 0) {
                return hasInternalAnnotation(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(commentRanges.get(commentRanges.length - 1))), sourceFile);
            }
            return false;
        }
        const __gotots_range_13 = named_iter.IterSeqValueOperations.$project(DeclarationTransformer.$go$private$declarations$getLeadingCommentRangesOfNode(tx, parseTreeNode, sourceFile));
        if (__gotots_range_13 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_3 = 1;
        let __gotots_range_return_0: bool = false;
        __gotots_range_13(($argument0: CommentRange__from_ast): bool => {
            if (__gotots_range_state_3 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_3 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_3 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_3 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_3 = -1;
            const __gotots_range_value_13 = CommentRange__from_ast.$copy($argument0);
            let commentRange = __gotots_range_value_13;
            if (hasInternalAnnotation(CommentRange__from_ast.$copy(commentRange), sourceFile)) {
                __gotots_range_return_0 = true;
                __gotots_range_state_3 = 2;
                return false;
            }
            __gotots_range_state_3 = 1;
            return true;
        });
        if (__gotots_range_state_3 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_3 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_3 = -2;
        return false;
    }
    static $go$private$declarations$omitPrivateMethodType(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(Node__from_ast.Symbol(input) === undefined) && Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && !tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0), input)) {
            return void 0;
        }
        const __gotots_store_569 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_570 = (Transformer__from_transformers.Factory(__gotots_store_569.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_570, "NodeFactory"), DeclarationTransformer.$go$private$declarations$ensureModifiers(tx, input), Node__from_ast.Name(input), void 0, void 0, void 0);
        DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, result, input);
        return result;
    }
    static $go$private$declarations$preserveJsDoc(tx: DeclarationTransformer | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AssignCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_85.Transformer), updated, original);
    }
    static $go$private$declarations$preservePartialJsDoc(tx: DeclarationTransformer | undefined, updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if ((Node__from_ast.$storageOf(((original ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
            return;
        }
        let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FirstOrNil$PointerTo_Named_ast$Node(Node__from_ast.EagerJSDoc(original, GetSourceFileOfNode__from_ast(original)));
        if (jsdoc === undefined) {
            return;
        }
        let description = GetTextOfJSDocComment__from_scanner(JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsdoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Comment);
        if (description === "") {
            return;
        }
        let comment = "*\n * " + strings__from_gostdlib.ReplaceAll(description, "\n", "\n * ") + "\n ";
        const __gotots_store_596 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddSyntheticLeadingComment(Transformer__from_transformers.EmitContext(__gotots_store_596.Transformer), updated, KindMultiLineCommentTrivia$constant__from_ast(), comment, true);
    }
    static $go$private$declarations$recreateBindingElement(tx: DeclarationTransformer | undefined, e: {
        value: BindingElement__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (BindingElement__from_ast.Name(e) === undefined) {
            return void 0;
        }
        const __gotots_argument_621 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_626 = NodeBase__from_ast.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_622 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_626, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!getBindingNameVisible(__gotots_argument_621, __gotots_argument_622)) {
            return void 0;
        }
        if (IsBindingPattern__from_ast(BindingElement__from_ast.Name(e))) {
            return DeclarationTransformer.$go$private$declarations$recreateBindingPattern(tx, Node__from_ast.AsBindingPattern(BindingElement__from_ast.Name(e)));
        }
        const __gotots_store_627 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_628 = (Transformer__from_transformers.Factory(__gotots_store_627.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_240 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_628, "NodeFactory");
        const __gotots_argument_625 = BindingElement__from_ast.Name(e);
        const __gotots_argument_626 = void 0;
        const __gotots_receiver_239 = tx;
        const __gotots_store_629 = NodeBase__from_ast.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_623 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_629, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_624 = false;
        const __gotots_argument_627 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_239, __gotots_argument_623, __gotots_argument_624);
        const __gotots_argument_628 = void 0;
        return NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_240, __gotots_argument_625, __gotots_argument_626, __gotots_argument_627, __gotots_argument_628);
    }
    static $go$private$declarations$recreateBindingPattern(tx: DeclarationTransformer | undefined, input: {
        value: BindingPattern__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_20 = NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_20.length; __gotots_range_index_15++) {
            const __gotots_range_value_21 = __gotots_range_20.get(__gotots_range_index_15);
            let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_21;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$recreateBindingElement(tx, Node__from_ast.AsBindingElement(elem));
            if (result === undefined) {
                continue;
            }
            if (Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                results = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(results, (Node__from_ast.AsSyntaxList(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children, void 0);
            }
            else {
                results = results.append(void 0, [result]);
            }
        }
        if (results.length === 0) {
            return void 0;
        }
        if (results.length === 1) {
            return results.get(0);
        }
        const __gotots_store_612 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_613 = (Transformer__from_transformers.Factory(__gotots_store_612.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_613, "NodeFactory"), results);
    }
    static $go$private$declarations$removeAllComments(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_store_568 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_568.Transformer), node, EFNoComments$constant__from_printer());
    }
    static $go$private$declarations$rewriteModuleSpecifier(tx: DeclarationTransformer | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (input === undefined) {
            return void 0;
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator || (!(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportType$constant__from_ast()));
        return input;
    }
    static $go$private$declarations$setupDiagnosticContext(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
        bool,
        (() => void) | undefined
    ] {
        let canProdiceDiagnostic = canProduceDiagnostics(input);
        let oldWithinObjectLiteralType = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts;
        let shouldEnterSuppressNewDiagnosticsContextContext = (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeLiteral$constant__from_ast() || Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMappedType$constant__from_ast()) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeAliasDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSTypeAliasDeclaration$constant__from_ast());
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
        if (canProdiceDiagnostic && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
        }
        let oldName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode;
        if (shouldEnterSuppressNewDiagnosticsContextContext) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts = true;
        }
        return [canProdiceDiagnostic, (): void => {
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = oldName;
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
            }];
    }
    static $go$private$declarations$shouldPrintWithInitializer(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let __gotots_logical_result_12 = canHaveLiteralInitializer((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, node) && !(Node__from_ast.Initializer(node) === undefined);
        if (__gotots_logical_result_12) {
            const __gotots_receiver_158 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_375 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_385 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_375.Transformer), node);
            __gotots_logical_result_12 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_158).IsLiteralConstDeclaration(__gotots_argument_385);
        }
        return __gotots_logical_result_12;
    }
    static $go$private$declarations$shouldStripInternal(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        return ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stripInternal && !(node === undefined) && DeclarationTransformer.$go$private$declarations$isInternalDeclaration(tx, node, ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile);
    }
    static $go$private$declarations$stripExportModifiers(tx: DeclarationTransformer | undefined, statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (statement === undefined) {
            return void 0;
        }
        const __gotots_store_7 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let parseNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_7.Transformer), statement);
        let __gotots_logical_result_1 = IsImportEqualsDeclaration__from_ast(statement);
        if (!__gotots_logical_result_1) {
            let __gotots_logical_result_0 = !(parseNode === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_receiver_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_argument_7 = parseNode;
                const __gotots_argument_8 = ModifierFlagsDefault$constant__from_ast();
                __gotots_logical_result_0 = !(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_12).GetEffectiveDeclarationFlags(__gotots_argument_7, __gotots_argument_8) === 0);
            }
            __gotots_logical_result_1 = (__gotots_logical_result_0);
        }
        if (__gotots_logical_result_1 || !CanHaveModifiers__from_ast(statement)) {
            return statement;
        }
        let oldFlags = GetCombinedModifierFlags__from_ast(statement);
        if ((oldFlags & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0) {
            return statement;
        }
        let newFlags = (oldFlags & (131039)) >>> 0;
        const __gotots_argument_9 = newFlags;
        const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_9 = (Transformer__from_transformers.Factory(__gotots_store_8.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory");
        const __gotots_argument_10 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return NodeFactory__from_ast.NewModifier(__gotots_receiver_13, $argument0);
        };
        let modifiers = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_9, __gotots_argument_10);
        const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_11 = (Transformer__from_transformers.Factory(__gotots_store_10.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_11 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeFactory"));
        const __gotots_argument_12 = statement;
        const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_13 = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), modifiers);
        return ReplaceModifiers__from_ast(__gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
    }
    static $go$private$declarations$transformAndReplaceLatePaintedStatements(tx: DeclarationTransformer | undefined, statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        for (; true;) {
            if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements.length === 0) {
                break;
            }
            let next: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements.get(0);
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements.slice(1, null, null);
            let saveNeedsDeclare = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = !(Node__from_ast.$storageOf(((next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsSourceFile__from_ast(Node__from_ast.$storageOf(((next ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$transformTopLevelDeclaration(tx, next);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = saveNeedsDeclare;
            const __gotots_store_376 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_376.Transformer), next);
            let id = GetNodeId__from_ast(original);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.store(id, result);
        }
        let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
        const __gotots_range_5 = NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
            let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            if (!IsLateVisibilityPaintedStatement__from_ast(statement)) {
                results = results.append(void 0, [statement]);
                continue;
            }
            const __gotots_store_377 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_377.Transformer), statement);
            let id = GetNodeId__from_ast(original);
            const __gotots_results_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.lookupOk(id);
            let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_10[0];
            let ok = __gotots_results_10[1];
            if (!ok) {
                results = results.append(void 0, [statement]);
                continue;
            }
            if (replacement === undefined) {
                continue;
            }
            if (Node__from_ast.$storageOf(((replacement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSyntaxList$constant__from_ast()) {
                if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker || !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator) {
                    const __gotots_range_6: SyntaxList__from_ast["Children"] = (Node__from_ast.AsSyntaxList(replacement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children;
                    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
                        let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                        if (needsScopeMarker(elem)) {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = true;
                        }
                        if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsExternalModuleIndicator__from_ast(elem)) {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
                        }
                    }
                }
                results = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(results, (Node__from_ast.AsSyntaxList(replacement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Children, void 0);
            }
            else {
                if (needsScopeMarker(replacement)) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = true;
                }
                if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((statement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsExternalModuleIndicator__from_ast(replacement)) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
                }
                results = results.append(void 0, [replacement]);
            }
        }
        const __gotots_store_378 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_379 = (Transformer__from_transformers.Factory(__gotots_store_378.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_379, "NodeFactory"), results);
    }
    static $go$private$declarations$transformCallSignatureDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: CallSignatureDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_263 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_264 = (Transformer__from_transformers.Factory(__gotots_store_263.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_121 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_264, "NodeFactory");
        const __gotots_argument_273 = input;
        const __gotots_receiver_118 = tx;
        const __gotots_store_265 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_267 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_265, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_268 = FunctionLikeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).TypeParameters;
        const __gotots_argument_274 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_118, __gotots_argument_267, __gotots_argument_268);
        const __gotots_receiver_119 = tx;
        const __gotots_store_266 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_269 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_266, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_270 = FunctionLikeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters;
        const __gotots_argument_275 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_119, __gotots_argument_269, __gotots_argument_270);
        const __gotots_receiver_120 = tx;
        const __gotots_store_267 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_271 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_267, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_272 = false;
        const __gotots_argument_276 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_120, __gotots_argument_271, __gotots_argument_272);
        return NodeFactory__from_ast.UpdateCallSignatureDeclaration(__gotots_receiver_121, __gotots_argument_273, __gotots_argument_274, __gotots_argument_275, __gotots_argument_276);
    }
    static $go$private$declarations$transformCjsRequireVariableDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_230 = tx;
        const __gotots_store_597 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_588 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_597, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_589 = NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((Node__from_ast.AsCallExpression(VariableDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_230, __gotots_argument_588, __gotots_argument_589);
        if (IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(input))) {
            const __gotots_store_598 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_599 = (Transformer__from_transformers.Factory(__gotots_store_598.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_231 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_599, "NodeFactory");
            const __gotots_argument_590 = void 0;
            const __gotots_argument_591 = false;
            const __gotots_argument_592 = VariableDeclaration__from_ast.Name(input);
            const __gotots_store_600 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_601 = (Transformer__from_transformers.Factory(__gotots_store_600.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_593 = NodeFactory__from_ast.NewExternalModuleReference(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_601, "NodeFactory"), specifier);
            return NodeFactory__from_ast.NewImportEqualsDeclaration(__gotots_receiver_231, __gotots_argument_590, __gotots_argument_591, __gotots_argument_592, __gotots_argument_593);
        }
        else if (IsArrayBindingPattern__from_ast(VariableDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        else {
            let b: {
                value: BindingPattern__from_ast;
            } | undefined = Node__from_ast.AsBindingPattern(VariableDeclaration__from_ast.Name(input));
            let importSpecifiers = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_19 = NodeList__from_ast.$storageOf((((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_19.length; __gotots_range_index_14++) {
                const __gotots_range_value_20 = __gotots_range_19.get(__gotots_range_index_14);
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_20;
                if (!IsIdentifier__from_ast(Node__from_ast.Name(elem))) {
                    continue;
                }
                const __gotots_argument_594 = importSpecifiers;
                const __gotots_store_602 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_603 = (Transformer__from_transformers.Factory(__gotots_store_602.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_595 = NodeFactory__from_ast.NewImportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_603, "NodeFactory"), false, Node__from_ast.PropertyName(elem), Node__from_ast.Name(elem));
                importSpecifiers = __gotots_argument_594.append(void 0, [__gotots_argument_595]);
            }
            const __gotots_store_604 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_605 = (Transformer__from_transformers.Factory(__gotots_store_604.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_234 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_605, "NodeFactory");
            const __gotots_argument_600 = void 0;
            const __gotots_store_606 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_607 = (Transformer__from_transformers.Factory(__gotots_store_606.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_233 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_607, "NodeFactory");
            const __gotots_argument_597 = KindUnknown$constant__from_ast();
            const __gotots_argument_598 = void 0;
            const __gotots_store_608 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_609 = (Transformer__from_transformers.Factory(__gotots_store_608.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_232 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_609, "NodeFactory");
            const __gotots_store_610 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_611 = (Transformer__from_transformers.Factory(__gotots_store_610.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_596 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_611, "NodeFactory"), importSpecifiers);
            const __gotots_argument_599 = NodeFactory__from_ast.NewNamedImports(__gotots_receiver_232, __gotots_argument_596);
            const __gotots_argument_601 = NodeFactory__from_ast.NewImportClause(__gotots_receiver_233, __gotots_argument_597, __gotots_argument_598, __gotots_argument_599);
            const __gotots_argument_602 = specifier;
            const __gotots_argument_603 = void 0;
            return NodeFactory__from_ast.NewImportDeclaration(__gotots_receiver_234, __gotots_argument_600, __gotots_argument_601, __gotots_argument_602, __gotots_argument_603);
        }
    }
    static $go$private$declarations$transformClassDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: ClassDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = ClassDeclaration__from_ast.Name(input);
                    const __gotots_receiver_203 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker;
                    const __gotots_store_479 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_508 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_479, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    SymbolTrackerImpl.PushErrorFallbackNode(__gotots_receiver_203, __gotots_argument_508);
                    const __gotots_receiver_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        SymbolTrackerImpl.PopErrorFallbackNode(__gotots_receiver_204);
                    };
                    const __gotots_receiver_205 = tx;
                    const __gotots_store_480 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_509 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_480, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_205, __gotots_argument_509);
                    const __gotots_receiver_206 = tx;
                    const __gotots_store_481 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_510 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_481, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_511 = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.TypeParameters;
                    let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_206, __gotots_argument_510, __gotots_argument_511);
                    const __gotots_store_482 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_512 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_482, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let ctor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetFirstConstructorWithBody__from_ast(__gotots_argument_512);
                    let parameterProperties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    if (!(ctor === undefined)) {
                        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
                        const __gotots_range_15 = NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                            FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsConstructorDeclaration(ctor) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_15.length; __gotots_range_index_10++) {
                            const __gotots_range_value_15 = __gotots_range_15.get(__gotots_range_index_10);
                            let param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_15;
                            if (!HasSyntacticModifier__from_ast(param, ModifierFlagsParameterPropertyModifier$constant__from_ast()) || DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, param)) {
                                continue;
                            }
                            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param);
                            if (Node__from_ast.$storageOf(((Node__from_ast.Name(param) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                                const __gotots_store_483 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_484 = (Transformer__from_transformers.Factory(__gotots_store_483.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_484, "NodeFactory"), DeclarationTransformer.$go$private$declarations$ensureModifiers(tx, param), Node__from_ast.Name(param), Node__from_ast.QuestionToken(param), DeclarationTransformer.$go$private$declarations$ensureType(tx, param, false), DeclarationTransformer.$go$private$declarations$ensureNoInitializer(tx, param));
                                DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, updated, param);
                                parameterProperties = parameterProperties.append(void 0, [updated]);
                            }
                            else {
                                parameterProperties = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(parameterProperties, DeclarationTransformer.$go$private$declarations$walkBindingPattern(tx, Node__from_ast.AsBindingPattern(Node__from_ast.Name(param)), param), void 0);
                            }
                        }
                        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    let privateIdentifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    if (Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return !(Node__from_ast.Name(member) === undefined) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(member));
                    })) {
                        const __gotots_store_485 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_486 = (Transformer__from_transformers.Factory(__gotots_store_485.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_207 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_486, "NodeFactory");
                        const __gotots_argument_513 = void 0;
                        const __gotots_store_487 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_488 = (Transformer__from_transformers.Factory(__gotots_store_487.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_514 = NodeFactory__from_ast.NewPrivateIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_488, "NodeFactory"), "#private");
                        const __gotots_argument_515 = void 0;
                        const __gotots_argument_516 = void 0;
                        const __gotots_argument_517 = void 0;
                        privateIdentifier = NodeFactory__from_ast.NewPropertyDeclaration(__gotots_receiver_207, __gotots_argument_513, __gotots_argument_514, __gotots_argument_515, __gotots_argument_516, __gotots_argument_517);
                    }
                    let thisPropertyAssignments = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    const __gotots_store_489 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_518 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_489, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    if (IsInJSFile__from_ast(__gotots_argument_518)) {
                        thisPropertyAssignments = DeclarationTransformer.$go$private$declarations$collectThisPropertyAssignments(tx, input);
                    }
                    const __gotots_receiver_208 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                    const __gotots_store_490 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_519 = Transformer__from_transformers.EmitContext(__gotots_store_490.Transformer);
                    const __gotots_store_491 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_520 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_491, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_521 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                    const __gotots_argument_522 = declarationEmitNodeBuilderFlags$constant();
                    const __gotots_argument_523 = declarationEmitInternalNodeBuilderFlags$constant();
                    const __gotots_argument_524 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                    let lateIndexes = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_208).CreateLateBoundIndexSignatures(__gotots_argument_519, __gotots_argument_520, __gotots_argument_521, __gotots_argument_522, __gotots_argument_523, __gotots_argument_524);
                    let memberNodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
                    if (!(privateIdentifier === undefined)) {
                        memberNodes = memberNodes.append(void 0, [privateIdentifier]);
                    }
                    memberNodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(memberNodes, lateIndexes, void 0);
                    memberNodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(memberNodes, parameterProperties, void 0);
                    memberNodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(memberNodes, thisPropertyAssignments, void 0);
                    const __gotots_store_492 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let visitResult: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_492.Transformer), (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                    if (!(visitResult === undefined) && NodeList__from_ast.$storageOf(((visitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                        memberNodes = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(memberNodes, NodeList__from_ast.$storageOf(((visitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                    }
                    const __gotots_store_493 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_494 = (Transformer__from_transformers.Factory(__gotots_store_493.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_494, "NodeFactory"), memberNodes);
                    const __gotots_store_495 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                    const __gotots_argument_525 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_495, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    let extendsClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getEffectiveBaseTypeNode(__gotots_argument_525);
                    if (!(extendsClause === undefined) && !IsEntityNameExpression__from_ast(ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(extendsClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression) && !(Node__from_ast.$storageOf(((ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(extendsClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast())) {
                        let oldId = "default";
                        if (NodeIsPresent__from_ast(ClassDeclaration__from_ast.Name(input)) && IsIdentifier__from_ast(ClassDeclaration__from_ast.Name(input)) && Node__from_ast.Text(ClassDeclaration__from_ast.Name(input)).length > 0) {
                            oldId = Node__from_ast.Text(ClassDeclaration__from_ast.Name(input));
                        }
                        const __gotots_store_496 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let newId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_496.Transformer), oldId + "_base", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
                        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = ($0: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
                            return new SymbolAccessibilityDiagnostic(extendsClause, $state__diagnostics.X_extends_clause_of_exported_class_0_has_or_is_using_private_name_1, ClassDeclaration__from_ast.Name(input));
                        };
                        const __gotots_store_497 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_498 = (Transformer__from_transformers.Factory(__gotots_store_497.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_210 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_498, "NodeFactory");
                        const __gotots_argument_532 = newId;
                        const __gotots_argument_533 = void 0;
                        const __gotots_receiver_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                        const __gotots_store_499 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_526 = Transformer__from_transformers.EmitContext(__gotots_store_499.Transformer);
                        const __gotots_argument_527 = Node__from_ast.Expression(extendsClause);
                        const __gotots_store_500 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                            StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                        const __gotots_argument_528 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_500, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                        const __gotots_argument_529 = declarationEmitNodeBuilderFlags$constant();
                        const __gotots_argument_530 = declarationEmitInternalNodeBuilderFlags$constant();
                        const __gotots_argument_531 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                        const __gotots_argument_534 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_209).CreateTypeOfExpression(__gotots_argument_526, __gotots_argument_527, __gotots_argument_528, __gotots_argument_529, __gotots_argument_530, __gotots_argument_531);
                        const __gotots_argument_535 = void 0;
                        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_210, __gotots_argument_532, __gotots_argument_533, __gotots_argument_534, __gotots_argument_535);
                        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare) {
                            const __gotots_store_501 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_502 = (Transformer__from_transformers.Factory(__gotots_store_501.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_211 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_502, "NodeFactory");
                            const __gotots_store_503 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_504 = (Transformer__from_transformers.Factory(__gotots_store_503.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_slice_element_15 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_504, "NodeFactory"), KindDeclareKeyword$constant__from_ast());
                            const __gotots_argument_536 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_15]);
                            mods = NodeFactory__from_ast.NewModifierList(__gotots_receiver_211, __gotots_argument_536);
                        }
                        const __gotots_store_505 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_506 = (Transformer__from_transformers.Factory(__gotots_store_505.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_213 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_506, "NodeFactory");
                        const __gotots_argument_539 = mods;
                        const __gotots_store_507 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_508 = (Transformer__from_transformers.Factory(__gotots_store_507.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_212 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_508, "NodeFactory");
                        const __gotots_store_509 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_510 = (Transformer__from_transformers.Factory(__gotots_store_509.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_537 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_510, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
                        const __gotots_argument_538 = NodeFlagsConst$constant__from_ast();
                        const __gotots_argument_540 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_212, __gotots_argument_537, __gotots_argument_538);
                        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_213, __gotots_argument_539, __gotots_argument_540);
                        const __gotots_store_511 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_512 = (Transformer__from_transformers.Factory(__gotots_store_511.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_216 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_512, "NodeFactory");
                        const __gotots_argument_545 = Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((extendsClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        const __gotots_argument_546 = HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((extendsClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token;
                        const __gotots_store_513 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_514 = (Transformer__from_transformers.Factory(__gotots_store_513.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_215 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_514, "NodeFactory");
                        const __gotots_store_515 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_516 = (Transformer__from_transformers.Factory(__gotots_store_515.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_214 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_516, "NodeFactory");
                        const __gotots_argument_541 = Node__from_ast.AsExpressionWithTypeArguments(extendsClause);
                        const __gotots_argument_542 = newId;
                        const __gotots_store_517 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_543 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_517.Transformer), ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(extendsClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).TypeArguments);
                        const __gotots_slice_element_16 = NodeFactory__from_ast.UpdateExpressionWithTypeArguments(__gotots_receiver_214, __gotots_argument_541, __gotots_argument_542, __gotots_argument_543);
                        const __gotots_argument_544 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_16]);
                        const __gotots_argument_547 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_215, __gotots_argument_544);
                        let newHeritageClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateHeritageClause(__gotots_receiver_216, __gotots_argument_545, __gotots_argument_546, __gotots_argument_547);
                        const __gotots_store_518 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        let retainedHeritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_518.Transformer), (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                        let heritageList = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([newHeritageClause]);
                        if (!(retainedHeritageClauses === undefined) && NodeList__from_ast.$storageOf(((retainedHeritageClauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                            heritageList = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(heritageList, NodeList__from_ast.$storageOf(((retainedHeritageClauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, void 0);
                        }
                        const __gotots_store_519 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_520 = (Transformer__from_transformers.Factory(__gotots_store_519.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_520, "NodeFactory"), heritageList);
                        const __gotots_store_521 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_522 = (Transformer__from_transformers.Factory(__gotots_store_521.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_217 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_522, "NodeFactory");
                        const __gotots_slice_element_17 = statement;
                        const __gotots_store_523 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_524 = (Transformer__from_transformers.Factory(__gotots_store_523.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_slice_element_18 = NodeFactory__from_ast.UpdateClassDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_524, "NodeFactory"), input, modifiers, ClassDeclaration__from_ast.Name(input), typeParameters, heritageClauses, members);
                        const __gotots_argument_548 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_17, __gotots_slice_element_18]);
                        __gotots_return_0 = NodeFactory__from_ast.NewSyntaxList(__gotots_receiver_217, __gotots_argument_548);
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_525 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_526 = (Transformer__from_transformers.Factory(__gotots_store_525.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_218 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_526, "NodeFactory");
                    const __gotots_argument_549 = input;
                    const __gotots_argument_550 = modifiers;
                    const __gotots_argument_551 = ClassDeclaration__from_ast.Name(input);
                    const __gotots_argument_552 = typeParameters;
                    const __gotots_store_527 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_553 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_527.Transformer), (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                    const __gotots_argument_554 = members;
                    __gotots_return_0 = NodeFactory__from_ast.UpdateClassDeclaration(__gotots_receiver_218, __gotots_argument_549, __gotots_argument_550, __gotots_argument_551, __gotots_argument_552, __gotots_argument_553, __gotots_argument_554);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$declarations$transformCommonJSExport(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nameText = "";
        if (IsIdentifier__from_ast(name) || IsStringLiteral__from_ast(name)) {
            nameText = Node__from_ast.Text(name);
        }
        const __gotots_store_126 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "witnessedCjsExports"), nameText) && nameText !== "") {
            return void 0;
        }
        const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_127, "witnessedCjsExports"), nameText);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = true;
        if (isCommonJSAliasExport(input)) {
            let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right;
            if (IsIdentifier__from_ast(name) && Node__from_ast.Text(propertyName) === Node__from_ast.Text(name)) {
                propertyName = void 0;
            }
            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_129 = (Transformer__from_transformers.Factory(__gotots_store_128.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let exportSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_129, "NodeFactory"), false, propertyName, name);
            const __gotots_store_130 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_131 = (Transformer__from_transformers.Factory(__gotots_store_130.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_53 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_131, "NodeFactory");
            const __gotots_argument_111 = void 0;
            const __gotots_argument_112 = false;
            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_133 = (Transformer__from_transformers.Factory(__gotots_store_132.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_52 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_133, "NodeFactory");
            const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_135 = (Transformer__from_transformers.Factory(__gotots_store_134.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_110 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_135, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([exportSpecifier]));
            const __gotots_argument_113 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_52, __gotots_argument_110);
            const __gotots_argument_114 = void 0;
            const __gotots_argument_115 = void 0;
            return NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_53, __gotots_argument_111, __gotots_argument_112, __gotots_argument_113, __gotots_argument_114, __gotots_argument_115);
        }
        else if (IsIdentifier__from_ast(name)) {
            if (Node__from_ast.Text(name) === "default") {
                const __gotots_store_136 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let newId__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_136.Transformer), "_default", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
                ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = ($0: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
                    return new SymbolAccessibilityDiagnostic(input, $state__diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0, void 0);
                };
                SymbolTrackerImpl.PushErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, input);
                let type___shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureType(tx, input, false);
                const __gotots_store_137 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_138 = (Transformer__from_transformers.Factory(__gotots_store_137.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let varDecl__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_138, "NodeFactory"), newId__shadow_1, void 0, type___shadow_1, void 0);
                SymbolTrackerImpl.PopErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                let modList__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare) {
                    const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_140 = (Transformer__from_transformers.Factory(__gotots_store_139.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_54 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_140, "NodeFactory");
                    const __gotots_store_141 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_142 = (Transformer__from_transformers.Factory(__gotots_store_141.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_slice_element_5 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_142, "NodeFactory"), KindDeclareKeyword$constant__from_ast());
                    const __gotots_argument_116 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_5]);
                    modList__shadow_1 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_54, __gotots_argument_116);
                }
                else {
                    const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_144 = (Transformer__from_transformers.Factory(__gotots_store_143.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    modList__shadow_1 = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
                }
                const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_146 = (Transformer__from_transformers.Factory(__gotots_store_145.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_56 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_146, "NodeFactory");
                const __gotots_argument_119 = modList__shadow_1;
                const __gotots_store_147 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_148 = (Transformer__from_transformers.Factory(__gotots_store_147.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_55 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_148, "NodeFactory");
                const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_150 = (Transformer__from_transformers.Factory(__gotots_store_149.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_117 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_150, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl__shadow_1]));
                const __gotots_argument_118 = NodeFlagsConst$constant__from_ast();
                const __gotots_argument_120 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_55, __gotots_argument_117, __gotots_argument_118);
                let statement__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_56, __gotots_argument_119, __gotots_argument_120);
                const __gotots_store_151 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_152 = (Transformer__from_transformers.Factory(__gotots_store_151.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let assignment__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "NodeFactory"), Node__from_ast.Modifiers(input), false, void 0, newId__shadow_1);
                DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, statement__shadow_1, input);
                DeclarationTransformer.$go$private$declarations$removeAllComments(tx, assignment__shadow_1);
                const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_154 = (Transformer__from_transformers.Factory(__gotots_store_153.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_154, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement__shadow_1, assignment__shadow_1]));
            }
            else {
                const __gotots_receiver_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                const __gotots_receiver_58 = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_57).GetEmitResolver();
                const __gotots_argument_121 = name;
                let __gotots_logical_result_10 = tsonicTypeScriptRuntime.sameLocation(goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_58).GetReferencedValueDeclaration(__gotots_argument_121), input);
                if (!__gotots_logical_result_10) {
                    const __gotots_receiver_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
                    const __gotots_receiver_60 = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_59).GetEmitResolver();
                    const __gotots_argument_122 = name;
                    __gotots_logical_result_10 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_60).GetReferencedValueDeclaration(__gotots_argument_122) === undefined;
                }
                if (__gotots_logical_result_10) {
                    SymbolTrackerImpl.PushErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, input);
                    let type___shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureType(tx, input, false);
                    const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_156 = (Transformer__from_transformers.Factory(__gotots_store_155.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let varDecl__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_156, "NodeFactory"), name, void 0, type___shadow_1, void 0);
                    SymbolTrackerImpl.PopErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
                    let modList__shadow_1: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                    if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare) {
                        const __gotots_store_157 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_158 = (Transformer__from_transformers.Factory(__gotots_store_157.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_61 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_158, "NodeFactory");
                        const __gotots_store_159 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_160 = (Transformer__from_transformers.Factory(__gotots_store_159.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_slice_element_6 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_160, "NodeFactory"), KindExportKeyword$constant__from_ast());
                        const __gotots_store_161 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_162 = (Transformer__from_transformers.Factory(__gotots_store_161.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_slice_element_7 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_162, "NodeFactory"), KindDeclareKeyword$constant__from_ast());
                        const __gotots_argument_123 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_6, __gotots_slice_element_7]);
                        modList__shadow_1 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_61, __gotots_argument_123);
                    }
                    else {
                        const __gotots_store_163 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_164 = (Transformer__from_transformers.Factory(__gotots_store_163.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_62 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_164, "NodeFactory");
                        const __gotots_store_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_166 = (Transformer__from_transformers.Factory(__gotots_store_165.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_slice_element_8 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_166, "NodeFactory"), KindExportKeyword$constant__from_ast());
                        const __gotots_argument_124 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_8]);
                        modList__shadow_1 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_62, __gotots_argument_124);
                    }
                    const __gotots_store_167 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_168 = (Transformer__from_transformers.Factory(__gotots_store_167.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_64 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_168, "NodeFactory");
                    const __gotots_argument_127 = modList__shadow_1;
                    const __gotots_store_169 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_170 = (Transformer__from_transformers.Factory(__gotots_store_169.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_63 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_170, "NodeFactory");
                    const __gotots_store_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_172 = (Transformer__from_transformers.Factory(__gotots_store_171.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_125 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_172, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl__shadow_1]));
                    const __gotots_argument_126 = NodeFlagsNone$constant__from_ast();
                    const __gotots_argument_128 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_63, __gotots_argument_125, __gotots_argument_126);
                    return NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_64, __gotots_argument_127, __gotots_argument_128);
                }
            }
        }
        const __gotots_store_173 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let newId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_173.Transformer), "_exported", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = ($0: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
            return new SymbolAccessibilityDiagnostic(input, $state__diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0, void 0);
        };
        SymbolTrackerImpl.PushErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, input);
        let type_: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureType(tx, input, false);
        const __gotots_store_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_175 = (Transformer__from_transformers.Factory(__gotots_store_174.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_175, "NodeFactory"), newId, void 0, type_, void 0);
        SymbolTrackerImpl.PopErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
        let modList: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare) {
            const __gotots_store_176 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_177 = (Transformer__from_transformers.Factory(__gotots_store_176.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_65 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_177, "NodeFactory");
            const __gotots_store_178 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_179 = (Transformer__from_transformers.Factory(__gotots_store_178.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_9 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_179, "NodeFactory"), KindDeclareKeyword$constant__from_ast());
            const __gotots_argument_129 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_9]);
            modList = NodeFactory__from_ast.NewModifierList(__gotots_receiver_65, __gotots_argument_129);
        }
        else {
            const __gotots_store_180 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_181 = (Transformer__from_transformers.Factory(__gotots_store_180.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            modList = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_181, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        }
        const __gotots_store_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_183 = (Transformer__from_transformers.Factory(__gotots_store_182.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_67 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_183, "NodeFactory");
        const __gotots_argument_132 = modList;
        const __gotots_store_184 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_185 = (Transformer__from_transformers.Factory(__gotots_store_184.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_66 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_185, "NodeFactory");
        const __gotots_store_186 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_187 = (Transformer__from_transformers.Factory(__gotots_store_186.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_130 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_187, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
        const __gotots_argument_131 = NodeFlagsConst$constant__from_ast();
        const __gotots_argument_133 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_66, __gotots_argument_130, __gotots_argument_131);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_67, __gotots_argument_132, __gotots_argument_133);
        const __gotots_store_188 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_189 = (Transformer__from_transformers.Factory(__gotots_store_188.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_189, "NodeFactory");
        const __gotots_argument_136 = void 0;
        const __gotots_argument_137 = false;
        const __gotots_store_190 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_191 = (Transformer__from_transformers.Factory(__gotots_store_190.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_69 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_191, "NodeFactory");
        const __gotots_store_192 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_193 = (Transformer__from_transformers.Factory(__gotots_store_192.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_68 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_193, "NodeFactory");
        const __gotots_store_194 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_195 = (Transformer__from_transformers.Factory(__gotots_store_194.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_10 = NodeFactory__from_ast.NewExportSpecifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_195, "NodeFactory"), false, newId, name);
        const __gotots_argument_134 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_10]);
        const __gotots_argument_135 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_68, __gotots_argument_134);
        const __gotots_argument_138 = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_69, __gotots_argument_135);
        const __gotots_argument_139 = void 0;
        const __gotots_argument_140 = void 0;
        let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportDeclaration(__gotots_receiver_70, __gotots_argument_136, __gotots_argument_137, __gotots_argument_138, __gotots_argument_139, __gotots_argument_140);
        DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, statement, input);
        DeclarationTransformer.$go$private$declarations$removeAllComments(tx, assignment);
        const __gotots_store_196 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_197 = (Transformer__from_transformers.Factory(__gotots_store_196.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_197, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement, assignment]));
    }
    static $go$private$declarations$transformConditionalTypeNode(tx: DeclarationTransformer | undefined, input: {
        value: ConditionalTypeNode__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_289 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_5: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_289.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_303: ConditionalTypeNode__from_ast["CheckType"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckType;
        let checkType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_303);
        const __gotots_store_290 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_6: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_290.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_304: ConditionalTypeNode__from_ast["ExtendsType"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType;
        let extendsType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_304);
        let oldEnclosingDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType;
        const __gotots_store_291 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_7: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_291.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_305: ConditionalTypeNode__from_ast["TrueType"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TrueType;
        let trueType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_305);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = oldEnclosingDecl;
        const __gotots_store_292 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_8: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_292.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_306: ConditionalTypeNode__from_ast["FalseType"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FalseType;
        let falseType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_306);
        const __gotots_store_293 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_294 = (Transformer__from_transformers.Factory(__gotots_store_293.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateConditionalTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_294, "NodeFactory"), input, checkType, extendsType, trueType, falseType);
    }
    static $go$private$declarations$transformConstructSignatureDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_230 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_231 = (Transformer__from_transformers.Factory(__gotots_store_230.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_94 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_231, "NodeFactory");
        const __gotots_argument_201 = input;
        const __gotots_receiver_91 = tx;
        const __gotots_store_232 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ConstructSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_195 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_232, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_196 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            ConstructSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters;
        const __gotots_argument_202 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_91, __gotots_argument_195, __gotots_argument_196);
        const __gotots_receiver_92 = tx;
        const __gotots_store_233 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ConstructSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_197 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_233, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_198 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            ConstructSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters;
        const __gotots_argument_203 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_92, __gotots_argument_197, __gotots_argument_198);
        const __gotots_receiver_93 = tx;
        const __gotots_store_234 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ConstructSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConstructSignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_199 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_234, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_200 = false;
        const __gotots_argument_204 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_93, __gotots_argument_199, __gotots_argument_200);
        return NodeFactory__from_ast.UpdateConstructSignatureDeclaration(__gotots_receiver_94, __gotots_argument_201, __gotots_argument_202, __gotots_argument_203, __gotots_argument_204);
    }
    static $go$private$declarations$transformConstructorDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: ConstructorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_235 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_236 = (Transformer__from_transformers.Factory(__gotots_store_235.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_97 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_236, "NodeFactory");
        const __gotots_argument_208 = input;
        const __gotots_receiver_95 = tx;
        const __gotots_store_237 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_205 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_237, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_209 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_95, __gotots_argument_205);
        const __gotots_argument_210 = void 0;
        const __gotots_receiver_96 = tx;
        const __gotots_store_238 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_206 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_238, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_207 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
        const __gotots_argument_211 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_96, __gotots_argument_206, __gotots_argument_207);
        const __gotots_argument_212 = void 0;
        const __gotots_argument_213 = void 0;
        const __gotots_argument_214 = void 0;
        return NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_97, __gotots_argument_208, __gotots_argument_209, __gotots_argument_210, __gotots_argument_211, __gotots_argument_212, __gotots_argument_213, __gotots_argument_214);
    }
    static $go$private$declarations$transformConstructorTypeNode(tx: DeclarationTransformer | undefined, input: {
        value: ConstructorTypeNode__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_300 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_301 = (Transformer__from_transformers.Factory(__gotots_store_300.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_136 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_301, "NodeFactory");
        const __gotots_argument_318 = input;
        const __gotots_receiver_134 = tx;
        const __gotots_store_302 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
        const __gotots_argument_314 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_302, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_319 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_134, __gotots_argument_314);
        const __gotots_store_303 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_320 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_303.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).TypeParameters);
        const __gotots_receiver_135 = tx;
        const __gotots_store_304 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeNodeBase).NodeBase));
        const __gotots_argument_315 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_304, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_316 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).Parameters;
        const __gotots_argument_321 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_135, __gotots_argument_315, __gotots_argument_316);
        const __gotots_store_305 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_10: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_305.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_317 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionOrConstructorTypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionOrConstructorTypeNodeBase).FunctionLikeBase)).Type;
        const __gotots_argument_322 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_317);
        return NodeFactory__from_ast.UpdateConstructorTypeNode(__gotots_receiver_136, __gotots_argument_318, __gotots_argument_319, __gotots_argument_320, __gotots_argument_321, __gotots_argument_322);
    }
    static $go$private$declarations$transformEnumDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: EnumDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_545 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_546 = (Transformer__from_transformers.Factory(__gotots_store_545.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_223 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_546, "NodeFactory");
        const __gotots_argument_562 = input;
        const __gotots_receiver_219 = tx;
        const __gotots_store_547 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_556 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_547, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_563 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_219, __gotots_argument_556);
        const __gotots_argument_564 = EnumDeclaration__from_ast.Name(input);
        const __gotots_store_548 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_549 = (Transformer__from_transformers.Factory(__gotots_store_548.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_565 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_549, "NodeFactory"), MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (m: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, m)) {
                return void 0;
            }
            const __gotots_receiver_220 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_557 = m;
            let enumValue = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_220).GetEnumMemberValue(__gotots_argument_557);
            if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isolatedDeclarations && !(Node__from_ast.Initializer(m) === undefined) && Result__from_evaluator.$storageOf(enumValue).HasExternalReferences && !IsComputedPropertyName__from_ast(Node__from_ast.Name(m))) {
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(m, $state__diagnostics.Enum_member_initializers_must_be_computable_without_references_to_external_symbols_with_isolatedDeclarations, RuntimeSlice.nil<GoInterface | undefined>()));
            }
            let newInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            const __gotots_type_switch_0: GoInterface | undefined = Result__from_evaluator.$storageOf(enumValue).Value;
            switch (true) {
                case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
                    let value: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                    if (value.IsInf()) {
                        if (value.$value > 0) {
                            const __gotots_store_550 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_551 = (Transformer__from_transformers.Factory(__gotots_store_550.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            newInitializer = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_551, "NodeFactory"), "Infinity");
                        }
                        else {
                            const __gotots_store_552 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_553 = (Transformer__from_transformers.Factory(__gotots_store_552.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_221 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_553, "NodeFactory");
                            const __gotots_argument_558 = KindMinusToken$constant__from_ast();
                            const __gotots_store_554 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_555 = (Transformer__from_transformers.Factory(__gotots_store_554.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_559 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_555, "NodeFactory"), "Infinity");
                            newInitializer = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_221, __gotots_argument_558, __gotots_argument_559);
                        }
                    }
                    else if (value.IsNaN()) {
                        const __gotots_store_556 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_557 = (Transformer__from_transformers.Factory(__gotots_store_556.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        newInitializer = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_557, "NodeFactory"), "NaN");
                    }
                    else if (value.$value >= 0) {
                        const __gotots_store_558 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_559 = (Transformer__from_transformers.Factory(__gotots_store_558.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        newInitializer = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_559, "NodeFactory"), value.String(), TokenFlagsNone$constant__from_ast());
                    }
                    else {
                        const __gotots_store_560 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_561 = (Transformer__from_transformers.Factory(__gotots_store_560.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_222 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_561, "NodeFactory");
                        const __gotots_argument_560 = KindMinusToken$constant__from_ast();
                        const __gotots_store_562 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_563 = (Transformer__from_transformers.Factory(__gotots_store_562.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_561 = NodeFactory__from_ast.NewNumericLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_563, "NodeFactory"), (new Number__from_jsnum(-value.$value)).String(), TokenFlagsNone$constant__from_ast());
                        newInitializer = NodeFactory__from_ast.NewPrefixUnaryExpression(__gotots_receiver_222, __gotots_argument_560, __gotots_argument_561);
                    }
                    break;
                }
                case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
                    let value: gostring = __gotots_type_switch_0.$go$value;
                    const __gotots_store_564 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_565 = (Transformer__from_transformers.Factory(__gotots_store_564.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    newInitializer = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_565, "NodeFactory"), value, TokenFlagsNone$constant__from_ast());
                    break;
                }
                default: {
                    let value: GoInterface | undefined = __gotots_type_switch_0;
                    newInitializer = void 0;
                    break;
                }
            }
            const __gotots_store_566 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_567 = (Transformer__from_transformers.Factory(__gotots_store_566.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateEnumMember(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_567, "NodeFactory"), Node__from_ast.AsEnumMember(m), Node__from_ast.Name(m), newInitializer);
            DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, result, m);
            return result;
        }));
        return NodeFactory__from_ast.UpdateEnumDeclaration(__gotots_receiver_223, __gotots_argument_562, __gotots_argument_563, __gotots_argument_564, __gotots_argument_565);
    }
    static $go$private$declarations$transformExpandoAssignment(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (void DeclarationBase__from_ast.$storageOf, (void DeclarationBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).DeclarationBase)).Symbol;
                    if (__go_symbol === undefined || (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAssignment$constant__from_ast()) >>> 0 === 0) {
                        break __gotots_return_block_0;
                    }
                    let ns: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLeftmostAccessExpression__from_ast(left);
                    if (ns === undefined || !(Node__from_ast.$storageOf(((ns ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast())) {
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                    const __gotots_argument_29 = ns;
                    let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_22).GetReferencedValueDeclaration(__gotots_argument_29);
                    if (declaration === undefined) {
                        break __gotots_return_block_0;
                    }
                    if (DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, declaration)) {
                        break __gotots_return_block_0;
                    }
                    if (IsVariableDeclaration__from_ast(declaration) && !(Node__from_ast.Type(declaration) === undefined)) {
                        break __gotots_return_block_0;
                    }
                    if (IsFunctionDeclaration__from_ast(declaration) && !(FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature === undefined)) {
                        break __gotots_return_block_0;
                    }
                    if (IsVariableDeclaration__from_ast(declaration) && !IsFunctionLike__from_ast(Node__from_ast.Initializer(declaration))) {
                        break __gotots_return_block_0;
                    }
                    let host: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(declaration);
                    if (host === undefined) {
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_39 = (Transformer__from_transformers.Factory(__gotots_store_38.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), Node__from_ast.Text(ns));
                    let property = DeclarationTransformer.$go$private$declarations$tryGetPropertyName(tx, left);
                    if (property === "" || !IsIdentifierText__from_scanner(property, LanguageVariantStandard$constant__from_core())) {
                        break __gotots_return_block_0;
                    }
                    let __gotots_logical_result_4 = IsDeclaration__from_ast(declaration);
                    if (__gotots_logical_result_4) {
                        const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_30 = Transformer__from_transformers.EmitContext(__gotots_store_40.Transformer);
                        const __gotots_argument_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                        const __gotots_argument_32 = declaration;
                        __gotots_logical_result_4 = isDeclarationAndNotVisible(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32);
                    }
                    if (__gotots_logical_result_4) {
                        break __gotots_return_block_0;
                    }
                    if (IsFunctionDeclaration__from_ast(declaration) && !shouldEmitFunctionProperties(Node__from_ast.AsFunctionDeclaration(declaration))) {
                        break __gotots_return_block_0;
                    }
                    DeclarationTransformer.$go$private$declarations$transformExpandoHost(tx, name, declaration);
                    let isNonContextualKeywordName = IsNonContextualKeyword__from_ast(StringToToken__from_scanner(property));
                    const __gotots_argument_33 = isNonContextualKeywordName;
                    const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_argument_34 = NodeFactory__from_printer.NewGeneratedNameForNode(Transformer__from_transformers.Factory(__gotots_store_41.Transformer), left);
                    const __gotots_store_42 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_43 = (Transformer__from_transformers.Factory(__gotots_store_42.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_35 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "NodeFactory"), property);
                    let exportName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(__gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                    let hostId = DeclarationTransformer.$go$private$declarations$getExpandoHostId(tx, declaration);
                    let preexistingExpandoHasExport = Some$PointerTo_Named_ast$Node((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers.lookup(hostId), IsExportDeclaration__from_ast);
                    let varModifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                    if (preexistingExpandoHasExport) {
                        const __gotots_store_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_45 = (Transformer__from_transformers.Factory(__gotots_store_44.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "NodeFactory");
                        const __gotots_argument_36 = ModifierFlagsExport$constant__from_ast();
                        const __gotots_store_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_47 = (Transformer__from_transformers.Factory(__gotots_store_46.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "NodeFactory");
                        const __gotots_argument_37 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                            return NodeFactory__from_ast.NewModifier(__gotots_receiver_23, $argument0);
                        };
                        const __gotots_argument_38 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_36, __gotots_argument_37);
                        varModifiers = NodeFactory__from_ast.NewModifierList(__gotots_receiver_24, __gotots_argument_38);
                    }
                    const __gotots_store_48 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_49 = (Transformer__from_transformers.Factory(__gotots_store_48.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory");
                    const __gotots_argument_40 = void 0;
                    const __gotots_argument_41 = KindNamespaceKeyword$constant__from_ast();
                    const __gotots_argument_42 = name;
                    const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_51 = (Transformer__from_transformers.Factory(__gotots_store_50.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "NodeFactory");
                    const __gotots_store_52 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_53 = (Transformer__from_transformers.Factory(__gotots_store_52.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_39 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
                    const __gotots_argument_43 = NodeFactory__from_ast.NewModuleBlock(__gotots_receiver_25, __gotots_argument_39);
                    let synthesizedNamespace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewModuleDeclaration(__gotots_receiver_26, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43);
                    Node__from_ast.$storageOf(((synthesizedNamespace ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                    let declarationData: tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast> | undefined = Node__from_ast.DeclarationData(synthesizedNamespace);
                    DeclarationBase__from_ast.$storageOf(((declarationData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast>).value).Symbol = host;
                    let containerData: tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast> | undefined = Node__from_ast.LocalsContainerData(synthesizedNamespace);
                    LocalsContainerBase__from_ast.$storageOf(((containerData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LocalsContainerBase__from_ast>).value).Locals = new SymbolTable__from_ast($goMap$MapOf_string_To_PointerTo_Named_ast$Symbol.make(0, [])).$value;
                    let oldEnclosing: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = synthesizedNamespace;
                    const __gotots_callee_0 = (): void => {
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = oldEnclosing;
                    };
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_callee_0();
                    };
                    const __gotots_receiver_27 = tx;
                    const __gotots_store_54 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                    const __gotots_argument_44 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_results_2 = DeclarationTransformer.$go$private$declarations$setupDiagnosticContext(__gotots_receiver_27, __gotots_argument_44);
                    let cleanupDiagnosticContext: (() => void) | undefined = __gotots_results_2[1];
                    const __gotots_callee_1: (() => void) | undefined = cleanupDiagnosticContext;
                    const __gotots_deferred_2 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_2 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_2($go$recovery);
                    };
                    const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_56 = (Transformer__from_transformers.Factory(__gotots_store_55.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "NodeFactory");
                    const __gotots_argument_54 = varModifiers;
                    const __gotots_store_57 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_58 = (Transformer__from_transformers.Factory(__gotots_store_57.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "NodeFactory");
                    const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_60 = (Transformer__from_transformers.Factory(__gotots_store_59.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeFactory");
                    const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_62 = (Transformer__from_transformers.Factory(__gotots_store_61.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "NodeFactory");
                    const __gotots_argument_47 = exportName;
                    const __gotots_argument_48 = void 0;
                    const __gotots_receiver_28 = tx;
                    const __gotots_store_63 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                            BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                    const __gotots_argument_45 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    const __gotots_argument_46 = false;
                    const __gotots_argument_49 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_28, __gotots_argument_45, __gotots_argument_46);
                    const __gotots_argument_50 = void 0;
                    const __gotots_slice_element_1 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_29, __gotots_argument_47, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
                    const __gotots_argument_51 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_1]);
                    const __gotots_argument_52 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_30, __gotots_argument_51);
                    const __gotots_argument_53 = NodeFlagsNone$constant__from_ast();
                    const __gotots_argument_55 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_31, __gotots_argument_52, __gotots_argument_53);
                    const __gotots_slice_element_2 = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_32, __gotots_argument_54, __gotots_argument_55);
                    let statements = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_2]);
                    if (isNonContextualKeywordName) {
                        const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_65 = (Transformer__from_transformers.Factory(__gotots_store_64.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory");
                        const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_67 = (Transformer__from_transformers.Factory(__gotots_store_66.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
                        const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_69 = (Transformer__from_transformers.Factory(__gotots_store_68.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "NodeFactory");
                        const __gotots_argument_56 = false;
                        const __gotots_argument_57 = exportName;
                        const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_71 = (Transformer__from_transformers.Factory(__gotots_store_70.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_58 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "NodeFactory"), property);
                        const __gotots_slice_element_3 = NodeFactory__from_ast.NewExportSpecifier(__gotots_receiver_33, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
                        const __gotots_argument_59 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_3]);
                        const __gotots_argument_60 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_34, __gotots_argument_59);
                        let namedExports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNamedExports(__gotots_receiver_35, __gotots_argument_60);
                        const __gotots_argument_61 = statements;
                        const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_73 = (Transformer__from_transformers.Factory(__gotots_store_72.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_62 = NodeFactory__from_ast.NewExportDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "NodeFactory"), void 0, false, namedExports, void 0, void 0);
                        statements = __gotots_argument_61.append(void 0, [__gotots_argument_62]);
                    }
                    if (statements.length > 1 && !preexistingExpandoHasExport) {
                        const __gotots_range_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers.lookup(hostId);
                        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                            let modifierFlags = (ModifierFlagsExport$constant__from_ast() | GetCombinedModifierFlags__from_ast(decl)) >>> 0;
                            const __gotots_receiver_38 = Node__from_ast.AsMutable(decl);
                            const __gotots_store_74 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_75 = (Transformer__from_transformers.Factory(__gotots_store_74.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory");
                            const __gotots_argument_63 = modifierFlags;
                            const __gotots_store_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_77 = (Transformer__from_transformers.Factory(__gotots_store_76.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "NodeFactory");
                            const __gotots_argument_64 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                                return NodeFactory__from_ast.NewModifier(__gotots_receiver_36, $argument0);
                            };
                            const __gotots_argument_65 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_63, __gotots_argument_64);
                            const __gotots_argument_66 = NodeFactory__from_ast.NewModifierList(__gotots_receiver_37, __gotots_argument_65);
                            MutableNode__from_ast.SetModifiers(__gotots_receiver_38, __gotots_argument_66);
                        }
                    }
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers.store(hostId, goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers.lookup(hostId), statements, void 0));
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_0 = __gotots_caught_2;
            }
        }
        finally {
            if (__gotots_deferred_1 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_1(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
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
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$declarations$transformExpandoHost(tx: DeclarationTransformer | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(IsVariableDeclaration__from_ast(declaration), Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, declaration);
                    let id = DeclarationTransformer.$go$private$declarations$getExpandoHostId(tx, declaration);
                    {
                        const __gotots_results_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts.lookupOk(id);
                        let ok = __gotots_results_5[1];
                        if (ok) {
                            break __gotots_return_block_0;
                        }
                    }
                    let saveNeedsDeclare = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare;
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = true;
                    let modifierFlags = DeclarationTransformer.$go$private$declarations$ensureModifierFlags(tx, root);
                    let defaultExport = !((modifierFlags & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0) && !((modifierFlags & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0);
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = saveNeedsDeclare;
                    if (defaultExport) {
                        modifierFlags = (modifierFlags | 128) >>> 0;
                        modifierFlags = (modifierFlags ^ 2048) >>> 0;
                        modifierFlags = (modifierFlags ^ 32) >>> 0;
                    }
                    const __gotots_results_6 = DeclarationTransformer.$go$private$declarations$setupDiagnosticContext(tx, declaration);
                    let cleanupDiagnosticContext: (() => void) | undefined = __gotots_results_6[1];
                    const __gotots_callee_18: (() => void) | undefined = cleanupDiagnosticContext;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_18);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    };
                    const __gotots_store_358 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_359 = (Transformer__from_transformers.Factory(__gotots_store_358.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_156 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_359, "NodeFactory");
                    const __gotots_argument_366 = modifierFlags;
                    const __gotots_store_360 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_361 = (Transformer__from_transformers.Factory(__gotots_store_360.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_155 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_361, "NodeFactory");
                    const __gotots_argument_367 = ($argument0: Kind__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                        return NodeFactory__from_ast.NewModifier(__gotots_receiver_155, $argument0);
                    };
                    const __gotots_argument_368 = CreateModifiersFromModifierFlags__from_ast(__gotots_argument_366, __gotots_argument_367);
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList(__gotots_receiver_156, __gotots_argument_368);
                    let replacement = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, null, void 0);
                    if (IsFunctionDeclaration__from_ast(declaration)) {
                        const __gotots_results_7 = extractExpandoHostParams(declaration);
                        let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_7[0];
                        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_7[1];
                        let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_7[2];
                        const __gotots_argument_369 = replacement;
                        const __gotots_store_362 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_363 = (Transformer__from_transformers.Factory(__gotots_store_362.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_370 = NodeFactory__from_ast.UpdateFunctionDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_363, "NodeFactory"), Node__from_ast.AsFunctionDeclaration(declaration), modifiers, asteriskToken, Node__from_ast.Name(declaration), DeclarationTransformer.$go$private$declarations$ensureTypeParams(tx, declaration, typeParameters), DeclarationTransformer.$go$private$declarations$updateParamList(tx, declaration, parameters), DeclarationTransformer.$go$private$declarations$ensureType(tx, declaration, false), void 0, void 0);
                        replacement = __gotots_argument_369.append(void 0, [__gotots_argument_370]);
                    }
                    else if (IsVariableDeclaration__from_ast(declaration) && IsFunctionExpressionOrArrowFunction__from_ast(Node__from_ast.Initializer(declaration))) {
                        let fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(declaration);
                        const __gotots_results_8 = extractExpandoHostParams(fn);
                        let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_8[0];
                        let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_results_8[1];
                        let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_8[2];
                        const __gotots_argument_379 = replacement;
                        const __gotots_store_364 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_365 = (Transformer__from_transformers.Factory(__gotots_store_364.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_157 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_365, "NodeFactory");
                        const __gotots_argument_371 = modifiers;
                        const __gotots_argument_372 = asteriskToken;
                        const __gotots_store_366 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_367 = (Transformer__from_transformers.Factory(__gotots_store_366.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_373 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_367, "NodeFactory"), Node__from_ast.Text(name));
                        const __gotots_argument_374 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(tx, fn, typeParameters);
                        const __gotots_argument_375 = DeclarationTransformer.$go$private$declarations$updateParamList(tx, fn, parameters);
                        const __gotots_argument_376 = DeclarationTransformer.$go$private$declarations$ensureType(tx, fn, false);
                        const __gotots_argument_377 = void 0;
                        const __gotots_argument_378 = void 0;
                        const __gotots_argument_380 = NodeFactory__from_ast.NewFunctionDeclaration(__gotots_receiver_157, __gotots_argument_371, __gotots_argument_372, __gotots_argument_373, __gotots_argument_374, __gotots_argument_375, __gotots_argument_376, __gotots_argument_377, __gotots_argument_378);
                        replacement = __gotots_argument_379.append(void 0, [__gotots_argument_380]);
                    }
                    else {
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts.store(id, DeclarationTransformer.$go$private$declarations$transformTopLevelDeclaration(tx, declaration));
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_19: SymbolTrackerSharedState["reportExpandoFunctionErrors"] = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportExpandoFunctionErrors;
                    const __gotots_argument_381 = declaration;
                    (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_381);
                    if (defaultExport) {
                        if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
                        }
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = true;
                        const __gotots_argument_382 = replacement;
                        const __gotots_store_368 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_369 = (Transformer__from_transformers.Factory(__gotots_store_368.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_argument_383 = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_369, "NodeFactory"), void 0, false, void 0, name);
                        replacement = __gotots_argument_382.append(void 0, [__gotots_argument_383]);
                    }
                    const __gotots_store_372 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts;
                    const __gotots_store_373 = id;
                    const __gotots_store_370 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_371 = (Transformer__from_transformers.Factory(__gotots_store_370.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    __gotots_store_372.store(__gotots_store_373, NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_371, "NodeFactory"), replacement));
                    {
                        const __gotots_results_9 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.lookupOk(id);
                        let ok = __gotots_results_9[1];
                        if (ok) {
                            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.store(id, DeclarationTransformer.$go$private$declarations$createFullExpandoBlock(tx, id));
                        }
                    }
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$declarations$transformExportAssignment(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isExportEquals: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = true;
        if (IsIdentifier__from_ast(expression)) {
            const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_96 = (Transformer__from_transformers.Factory(__gotots_store_95.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let exportAssignment__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_96, "NodeFactory"), void 0, isExportEquals, void 0, expression);
            DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, exportAssignment__shadow_1, input);
            return exportAssignment__shadow_1;
        }
        const __gotots_store_97 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let newId: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewUniqueNameEx(Transformer__from_transformers.Factory(__gotots_store_97.Transformer), "_default", new AutoGenerateOptions__from_printer(new GeneratedIdentifierFlags__from_printer(GeneratedIdentifierFlagsOptimistic$int__from_printer), "", ""));
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = ($0: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined => {
            return new SymbolAccessibilityDiagnostic(input, $state__diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0, void 0);
        };
        SymbolTrackerImpl.PushErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, assignment);
        let type_: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsPrimitiveLiteralValue__from_ast(unwrapParenthesizedExpression(expression), true)) {
            const __gotots_receiver_46 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_96 = Transformer__from_transformers.EmitContext(__gotots_store_98.Transformer);
            const __gotots_store_99 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_97 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_99.Transformer), assignment);
            const __gotots_argument_98 = new GoInterfaceAdapter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
            initializer = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_46).CreateLiteralConstValue(__gotots_argument_96, __gotots_argument_97, __gotots_argument_98);
        }
        if (initializer === undefined) {
            type_ = DeclarationTransformer.$go$private$declarations$ensureType(tx, assignment, false);
        }
        const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_101 = (Transformer__from_transformers.Factory(__gotots_store_100.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let varDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NodeFactory"), newId, void 0, type_, initializer);
        SymbolTrackerImpl.PopErrorFallbackNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker);
        let modList: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
        if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare) {
            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_103 = (Transformer__from_transformers.Factory(__gotots_store_102.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_47 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_103, "NodeFactory");
            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_slice_element_4 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory"), KindDeclareKeyword$constant__from_ast());
            const __gotots_argument_99 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_4]);
            modList = NodeFactory__from_ast.NewModifierList(__gotots_receiver_47, __gotots_argument_99);
        }
        else {
            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_107 = (Transformer__from_transformers.Factory(__gotots_store_106.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            modList = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_107, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        }
        const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_109 = (Transformer__from_transformers.Factory(__gotots_store_108.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_49 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory");
        const __gotots_argument_102 = modList;
        const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_111 = (Transformer__from_transformers.Factory(__gotots_store_110.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_48 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_111, "NodeFactory");
        const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_100 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([varDecl]));
        const __gotots_argument_101 = NodeFlagsConst$constant__from_ast();
        const __gotots_argument_103 = NodeFactory__from_ast.NewVariableDeclarationList(__gotots_receiver_48, __gotots_argument_100, __gotots_argument_101);
        let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewVariableStatement(__gotots_receiver_49, __gotots_argument_102, __gotots_argument_103);
        const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_115 = (Transformer__from_transformers.Factory(__gotots_store_114.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let exportAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewExportAssignment(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_115, "NodeFactory"), void 0, isExportEquals, void 0, newId);
        DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, statement, input);
        const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([statement, exportAssignment]));
    }
    static $go$private$declarations$transformExpressionWithTypeArguments(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsEntityName__from_ast(ExpressionWithTypeArguments__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression) || IsEntityNameExpression__from_ast(ExpressionWithTypeArguments__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression)) {
            DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, ExpressionWithTypeArguments__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
        }
        const __gotots_store_285 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_130 = Transformer__from_transformers.Visitor(__gotots_store_285.Transformer);
        const __gotots_store_286 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                ExpressionWithTypeArguments__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_301 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_286, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_130, __gotots_argument_301);
    }
    static $go$private$declarations$transformFunctionDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_195 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_454 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_483 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_454, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_195).IsExpandoFunctionDeclaration(__gotots_argument_483)) {
            const __gotots_callee_20: SymbolTrackerSharedState["reportExpandoFunctionErrors"] = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportExpandoFunctionErrors;
            const __gotots_store_455 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                    FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
            const __gotots_argument_484 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_455, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_484);
        }
        const __gotots_store_456 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_457 = (Transformer__from_transformers.Factory(__gotots_store_456.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_200 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_457, "NodeFactory");
        const __gotots_argument_492 = input;
        const __gotots_receiver_196 = tx;
        const __gotots_store_458 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_485 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_458, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_493 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_196, __gotots_argument_485);
        const __gotots_argument_494 = void 0;
        const __gotots_argument_495 = FunctionDeclaration__from_ast.Name(input);
        const __gotots_receiver_197 = tx;
        const __gotots_store_459 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_486 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_459, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_487 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).TypeParameters;
        const __gotots_argument_496 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_197, __gotots_argument_486, __gotots_argument_487);
        const __gotots_receiver_198 = tx;
        const __gotots_store_460 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_488 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_460, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_489 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters;
        const __gotots_argument_497 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_198, __gotots_argument_488, __gotots_argument_489);
        const __gotots_receiver_199 = tx;
        const __gotots_store_461 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_490 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_461, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_491 = false;
        const __gotots_argument_498 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_199, __gotots_argument_490, __gotots_argument_491);
        const __gotots_argument_499 = void 0;
        const __gotots_argument_500 = void 0;
        return NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_200, __gotots_argument_492, __gotots_argument_493, __gotots_argument_494, __gotots_argument_495, __gotots_argument_496, __gotots_argument_497, __gotots_argument_498, __gotots_argument_499, __gotots_argument_500);
    }
    static $go$private$declarations$transformFunctionTypeNode(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_295 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_296 = (Transformer__from_transformers.Factory(__gotots_store_295.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_133 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_296, "NodeFactory");
        const __gotots_argument_310 = input;
        const __gotots_store_297 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_311 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_297.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                FunctionTypeNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).TypeParameters);
        const __gotots_receiver_132 = tx;
        const __gotots_store_298 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void TypeNodeBase__from_ast.$storageOf, (void TypeNodeBase__from_ast.$fromStorage,
                FunctionTypeNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).TypeNodeBase)).NodeBase));
        const __gotots_argument_307 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_298, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_308 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                FunctionTypeNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).Parameters;
        const __gotots_argument_312 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_132, __gotots_argument_307, __gotots_argument_308);
        const __gotots_store_299 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_9: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_299.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_309 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            (void FunctionOrConstructorTypeNodeBase__from_ast.$storageOf, (void FunctionOrConstructorTypeNodeBase__from_ast.$fromStorage,
                FunctionTypeNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionTypeNode__from_ast>).value).FunctionOrConstructorTypeNodeBase)).FunctionLikeBase)).Type;
        const __gotots_argument_313 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_309);
        return NodeFactory__from_ast.UpdateFunctionTypeNode(__gotots_receiver_133, __gotots_argument_310, __gotots_argument_311, __gotots_argument_312, __gotots_argument_313);
    }
    static $go$private$declarations$transformGetAccesorDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: GetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(GetAccessorDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        const __gotots_store_239 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_240 = (Transformer__from_transformers.Factory(__gotots_store_239.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_103 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_240, "NodeFactory");
        const __gotots_argument_223 = input;
        const __gotots_receiver_98 = tx;
        const __gotots_store_241 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_215 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_241, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_224 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_98, __gotots_argument_215);
        const __gotots_argument_225 = GetAccessorDeclaration__from_ast.Name(input);
        const __gotots_argument_226 = void 0;
        const __gotots_receiver_101 = tx;
        const __gotots_store_242 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_219 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_242, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_receiver_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_243 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_99 = Transformer__from_transformers.EmitContext(__gotots_store_243.Transformer);
        const __gotots_store_244 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_216 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_244, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_217 = EmitContext__from_printer.ParseNode(__gotots_receiver_99, __gotots_argument_216);
        const __gotots_argument_218 = ModifierFlagsPrivate$constant__from_ast();
        const __gotots_argument_220 = !(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_100).GetEffectiveDeclarationFlags(__gotots_argument_217, __gotots_argument_218) === 0);
        const __gotots_argument_227 = DeclarationTransformer.$go$private$declarations$updateAccessorParamList(__gotots_receiver_101, __gotots_argument_219, __gotots_argument_220);
        const __gotots_receiver_102 = tx;
        const __gotots_store_245 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_221 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_245, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_222 = false;
        const __gotots_argument_228 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_102, __gotots_argument_221, __gotots_argument_222);
        const __gotots_argument_229 = void 0;
        const __gotots_argument_230 = void 0;
        return NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_103, __gotots_argument_223, __gotots_argument_224, __gotots_argument_225, __gotots_argument_226, __gotots_argument_227, __gotots_argument_228, __gotots_argument_229, __gotots_argument_230);
    }
    static $go$private$declarations$transformHeritageClause(tx: DeclarationTransformer | undefined, clause: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let retainedClauses = Filter$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return IsEntityNameExpression__from_ast(ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression) || (HeritageClause__from_ast.$storageOf(((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindExtendsKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.Expression(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast());
        });
        if (retainedClauses.length === 0) {
            return void 0;
        }
        if (retainedClauses.length === NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length) {
            const __gotots_store_205 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_72 = Transformer__from_transformers.Visitor(__gotots_store_205.Transformer);
            const __gotots_store_206 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                HeritageClause__from_ast.$storageOf(((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).NodeBase));
            const __gotots_argument_151 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_206, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_72, __gotots_argument_151);
        }
        const __gotots_store_207 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_208 = (Transformer__from_transformers.Factory(__gotots_store_207.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_208, "NodeFactory");
        const __gotots_argument_153 = clause;
        const __gotots_argument_154 = HeritageClause__from_ast.$storageOf(((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token;
        const __gotots_store_209 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_73 = Transformer__from_transformers.Visitor(__gotots_store_209.Transformer);
        const __gotots_store_210 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_211 = (Transformer__from_transformers.Factory(__gotots_store_210.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_152 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_211, "NodeFactory"), retainedClauses);
        const __gotots_argument_155 = NodeVisitor__from_ast.VisitNodes(__gotots_receiver_73, __gotots_argument_152);
        return NodeFactory__from_ast.UpdateHeritageClause(__gotots_receiver_74, __gotots_argument_153, __gotots_argument_154, __gotots_argument_155);
    }
    static $go$private$declarations$transformImportDeclaration(tx: DeclarationTransformer | undefined, decl: {
        value: ImportDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
            const __gotots_store_397 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_398 = (Transformer__from_transformers.Factory(__gotots_store_397.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_170 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_398, "NodeFactory");
            const __gotots_argument_417 = decl;
            const __gotots_store_399 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_418 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_399, "ModifiersBase"));
            const __gotots_argument_419: ImportDeclaration__from_ast["ImportClause"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
            const __gotots_receiver_169 = tx;
            const __gotots_store_400 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_415 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_400, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_416: ImportDeclaration__from_ast["ModuleSpecifier"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_420 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_169, __gotots_argument_415, __gotots_argument_416);
            const __gotots_argument_421 = DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_170, __gotots_argument_417, __gotots_argument_418, __gotots_argument_419, __gotots_argument_420, __gotots_argument_421);
        }
        let phaseModifier: ImportClause__from_ast["PhaseModifier"] = (Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier;
        if (phaseModifier === KindDeferKeyword$constant__from_ast()) {
            phaseModifier = KindUnknown$constant__from_ast();
        }
        let visibleDefaultBinding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let __gotots_logical_result_13 = !((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) && !(Node__from_ast.Name((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) === undefined);
        if (__gotots_logical_result_13) {
            const __gotots_receiver_171 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_422: ImportDeclaration__from_ast["ImportClause"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause;
            __gotots_logical_result_13 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_171).IsDeclarationVisible(__gotots_argument_422);
        }
        if (__gotots_logical_result_13) {
            visibleDefaultBinding = Node__from_ast.Name((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
        }
        if ((Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) {
            if (visibleDefaultBinding === undefined) {
                return void 0;
            }
            const __gotots_store_401 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_402 = (Transformer__from_transformers.Factory(__gotots_store_401.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_173 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_402, "NodeFactory");
            const __gotots_argument_425 = decl;
            const __gotots_store_403 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_426 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_403, "ModifiersBase"));
            const __gotots_store_404 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_405 = (Transformer__from_transformers.Factory(__gotots_store_404.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_427 = NodeFactory__from_ast.UpdateImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_405, "NodeFactory"), Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause), phaseModifier, visibleDefaultBinding, void 0);
            const __gotots_receiver_172 = tx;
            const __gotots_store_406 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_423 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_406, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_424: ImportDeclaration__from_ast["ModuleSpecifier"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_428 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_172, __gotots_argument_423, __gotots_argument_424);
            const __gotots_argument_429 = DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_173, __gotots_argument_425, __gotots_argument_426, __gotots_argument_427, __gotots_argument_428, __gotots_argument_429);
        }
        if (Node__from_ast.$storageOf((((Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceImport$constant__from_ast()) {
            let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            const __gotots_receiver_174 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_430: ImportClause__from_ast["NamedBindings"] = (Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
            if (goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_174).IsDeclarationVisible(__gotots_argument_430)) {
                namedBindings = (Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
            }
            if (visibleDefaultBinding === undefined && namedBindings === undefined) {
                return void 0;
            }
            const __gotots_store_407 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_408 = (Transformer__from_transformers.Factory(__gotots_store_407.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_176 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_408, "NodeFactory");
            const __gotots_argument_433 = decl;
            const __gotots_store_409 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_434 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_409, "ModifiersBase"));
            const __gotots_store_410 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_411 = (Transformer__from_transformers.Factory(__gotots_store_410.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_435 = NodeFactory__from_ast.UpdateImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_411, "NodeFactory"), Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause), phaseModifier, visibleDefaultBinding, namedBindings);
            const __gotots_receiver_175 = tx;
            const __gotots_store_412 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_431 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_412, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_432: ImportDeclaration__from_ast["ModuleSpecifier"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_436 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_175, __gotots_argument_431, __gotots_argument_432);
            const __gotots_argument_437 = DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_176, __gotots_argument_433, __gotots_argument_434, __gotots_argument_435, __gotots_argument_436, __gotots_argument_437);
        }
        let bindingList = Filter$PointerTo_Named_ast$Node(Node__from_ast.Elements((Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings), (b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            const __gotots_receiver_177 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_438 = b;
            return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_177).IsDeclarationVisible(__gotots_argument_438);
        });
        if (bindingList.length > 0 || !(visibleDefaultBinding === undefined)) {
            let namedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (bindingList.length > 0) {
                const __gotots_store_413 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_414 = (Transformer__from_transformers.Factory(__gotots_store_413.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_178 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_414, "NodeFactory");
                const __gotots_argument_439 = Node__from_ast.AsNamedImports((Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
                const __gotots_store_415 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_416 = (Transformer__from_transformers.Factory(__gotots_store_415.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_440 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_416, "NodeFactory"), bindingList);
                namedImports = NodeFactory__from_ast.UpdateNamedImports(__gotots_receiver_178, __gotots_argument_439, __gotots_argument_440);
            }
            const __gotots_store_417 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_418 = (Transformer__from_transformers.Factory(__gotots_store_417.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_180 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_418, "NodeFactory");
            const __gotots_argument_443 = decl;
            const __gotots_store_419 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_444 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_419, "ModifiersBase"));
            const __gotots_store_420 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_421 = (Transformer__from_transformers.Factory(__gotots_store_420.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_445 = NodeFactory__from_ast.UpdateImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_421, "NodeFactory"), Node__from_ast.AsImportClause((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause), phaseModifier, visibleDefaultBinding, namedImports);
            const __gotots_receiver_179 = tx;
            const __gotots_store_422 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_441 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_422, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_442: ImportDeclaration__from_ast["ModuleSpecifier"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_446 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_179, __gotots_argument_441, __gotots_argument_442);
            const __gotots_argument_447 = DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_180, __gotots_argument_443, __gotots_argument_444, __gotots_argument_445, __gotots_argument_446, __gotots_argument_447);
        }
        const __gotots_receiver_181 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_argument_448 = decl;
        if (goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_181).IsImportRequiredByAugmentation(__gotots_argument_448)) {
            if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isolatedDeclarations) {
                const __gotots_receiver_182 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state;
                const __gotots_store_423 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
                const __gotots_argument_449 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_423, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_450 = $state__diagnostics.Declaration_emit_for_this_file_requires_preserving_this_import_for_augmentations_This_is_not_supported_with_isolatedDeclarations;
                const __gotots_argument_451 = RuntimeSlice.nil<GoInterface | undefined>();
                const __gotots_argument_452 = createDiagnosticForNode(__gotots_argument_449, __gotots_argument_450, __gotots_argument_451);
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic(__gotots_receiver_182, __gotots_argument_452);
            }
            const __gotots_store_424 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_425 = (Transformer__from_transformers.Factory(__gotots_store_424.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_184 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_425, "NodeFactory");
            const __gotots_argument_455 = decl;
            const __gotots_store_426 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_456 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_426, "ModifiersBase"));
            const __gotots_argument_457 = void 0;
            const __gotots_receiver_183 = tx;
            const __gotots_store_427 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_453 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_427, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_454: ImportDeclaration__from_ast["ModuleSpecifier"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
            const __gotots_argument_458 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_183, __gotots_argument_453, __gotots_argument_454);
            const __gotots_argument_459 = DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            return NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_184, __gotots_argument_455, __gotots_argument_456, __gotots_argument_457, __gotots_argument_458, __gotots_argument_459);
        }
        return void 0;
    }
    static $go$private$declarations$transformImportEqualsDeclaration(tx: DeclarationTransformer | undefined, decl: {
        value: ImportEqualsDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_165 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_store_387 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_403 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_387, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_165).IsDeclarationVisible(__gotots_argument_403)) {
            return void 0;
        }
        if (Node__from_ast.$storageOf((((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast()) {
            const __gotots_store_388 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_404 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_388, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetExternalModuleImportEqualsDeclarationExpression__from_ast(__gotots_argument_404);
            const __gotots_store_389 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_390 = (Transformer__from_transformers.Factory(__gotots_store_389.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_168 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_390, "NodeFactory");
            const __gotots_argument_409 = decl;
            const __gotots_store_391 = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_410 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_391, "ModifiersBase"));
            const __gotots_argument_411: ImportEqualsDeclaration__from_ast["IsTypeOnly"] = (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly;
            const __gotots_argument_412 = ImportEqualsDeclaration__from_ast.Name(decl);
            const __gotots_store_392 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_393 = (Transformer__from_transformers.Factory(__gotots_store_392.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_167 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_393, "NodeFactory");
            const __gotots_argument_407 = Node__from_ast.AsExternalModuleReference((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
            const __gotots_receiver_166 = tx;
            const __gotots_store_394 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_405 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_394, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_406 = specifier;
            const __gotots_argument_408 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_166, __gotots_argument_405, __gotots_argument_406);
            const __gotots_argument_413 = NodeFactory__from_ast.UpdateExternalModuleReference(__gotots_receiver_167, __gotots_argument_407, __gotots_argument_408);
            return NodeFactory__from_ast.UpdateImportEqualsDeclaration(__gotots_receiver_168, __gotots_argument_409, __gotots_argument_410, __gotots_argument_411, __gotots_argument_412, __gotots_argument_413);
        }
        else {
            let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
            const __gotots_store_395 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_414 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_395, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(__gotots_argument_414);
            DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, (decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
            const __gotots_store_396 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_396, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
    }
    static $go$private$declarations$transformImportTypeNode(tx: DeclarationTransformer | undefined, input: {
        value: ImportTypeNode__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_306 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void TypeNodeBase__from_ast.$storageOf, (void TypeNodeBase__from_ast.$fromStorage,
                NodeWithTypeArgumentsBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeNodeBase)).NodeBase));
        const __gotots_argument_323 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_306, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!IsLiteralImportTypeNode__from_ast(__gotots_argument_323)) {
            const __gotots_store_307 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void TypeNodeBase__from_ast.$storageOf, (void TypeNodeBase__from_ast.$fromStorage,
                    NodeWithTypeArgumentsBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeNodeBase)).NodeBase));
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_307, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_308 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_309 = (Transformer__from_transformers.Factory(__gotots_store_308.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_139 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_309, "NodeFactory");
        const __gotots_argument_328 = input;
        const __gotots_argument_329: ImportTypeNode__from_ast["IsTypeOf"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf;
        const __gotots_store_310 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_311 = (Transformer__from_transformers.Factory(__gotots_store_310.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_138 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_311, "NodeFactory");
        const __gotots_argument_326 = Node__from_ast.AsLiteralTypeNode((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument);
        const __gotots_receiver_137 = tx;
        const __gotots_store_312 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void TypeNodeBase__from_ast.$storageOf, (void TypeNodeBase__from_ast.$fromStorage,
                NodeWithTypeArgumentsBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeNodeBase)).NodeBase));
        const __gotots_argument_324 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_312, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_325 = LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Argument) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal;
        const __gotots_argument_327 = DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(__gotots_receiver_137, __gotots_argument_324, __gotots_argument_325);
        const __gotots_argument_330 = NodeFactory__from_ast.UpdateLiteralTypeNode(__gotots_receiver_138, __gotots_argument_326, __gotots_argument_327);
        const __gotots_argument_331: ImportTypeNode__from_ast["Attributes"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
        const __gotots_argument_332: ImportTypeNode__from_ast["Qualifier"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Qualifier;
        const __gotots_store_313 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_333 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_313.Transformer), NodeWithTypeArgumentsBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeWithTypeArgumentsBase).TypeArguments);
        return NodeFactory__from_ast.UpdateImportTypeNode(__gotots_receiver_139, __gotots_argument_328, __gotots_argument_329, __gotots_argument_330, __gotots_argument_331, __gotots_argument_332, __gotots_argument_333);
    }
    static $go$private$declarations$transformIndexSignatureDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: IndexSignatureDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_268 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_4: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_268.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_277 = FunctionLikeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type;
        let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_277);
        if (t === undefined) {
            const __gotots_store_269 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_270 = (Transformer__from_transformers.Factory(__gotots_store_269.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            t = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_270, "NodeFactory"), KindAnyKeyword$constant__from_ast());
        }
        const __gotots_store_271 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_272 = (Transformer__from_transformers.Factory(__gotots_store_271.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_124 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_272, "NodeFactory");
        const __gotots_argument_281 = input;
        const __gotots_receiver_122 = tx;
        const __gotots_store_273 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_278 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_273, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_282 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_122, __gotots_argument_278);
        const __gotots_receiver_123 = tx;
        const __gotots_store_274 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_279 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_274, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_280 = FunctionLikeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Parameters;
        const __gotots_argument_283 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_123, __gotots_argument_279, __gotots_argument_280);
        const __gotots_argument_284 = t;
        return NodeFactory__from_ast.UpdateIndexSignatureDeclaration(__gotots_receiver_124, __gotots_argument_281, __gotots_argument_282, __gotots_argument_283, __gotots_argument_284);
    }
    static $go$private$declarations$transformInterfaceDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_448 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_449 = (Transformer__from_transformers.Factory(__gotots_store_448.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_194 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_449, "NodeFactory");
        const __gotots_argument_477 = input;
        const __gotots_receiver_193 = tx;
        const __gotots_store_450 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                InterfaceDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_476 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_450, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_478 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_193, __gotots_argument_476);
        const __gotots_argument_479 = InterfaceDeclaration__from_ast.Name(input);
        const __gotots_store_451 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_480 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_451.Transformer), InterfaceDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).TypeParameters);
        const __gotots_store_452 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_481 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_452.Transformer), InterfaceDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).HeritageClauses);
        const __gotots_store_453 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_482 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_453.Transformer), InterfaceDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).Members);
        return NodeFactory__from_ast.UpdateInterfaceDeclaration(__gotots_receiver_194, __gotots_argument_477, __gotots_argument_478, __gotots_argument_479, __gotots_argument_480, __gotots_argument_481, __gotots_argument_482);
    }
    static $go$private$declarations$transformJSDocAllType(tx: DeclarationTransformer | undefined, input: {
        value: JSDocAllType__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_328 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_329 = (Transformer__from_transformers.Factory(__gotots_store_328.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_329, "NodeFactory"), KindAnyKeyword$constant__from_ast());
        const __gotots_store_330 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_144 = Transformer__from_transformers.EmitContext(__gotots_store_330.Transformer);
        const __gotots_argument_347 = replacement;
        const __gotots_store_331 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTypeBase.TypeNodeBase).NodeBase));
        const __gotots_argument_348 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_331, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_144, __gotots_argument_347, __gotots_argument_348);
        return replacement;
    }
    static $go$private$declarations$transformJSDocNonNullableType(tx: DeclarationTransformer | undefined, input: {
        value: JSDocNonNullableType__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_343 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_15: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_343.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_355: JSDocNonNullableType__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
        return (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_355);
    }
    static $go$private$declarations$transformJSDocNullableType(tx: DeclarationTransformer | undefined, input: {
        value: JSDocNullableType__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_332 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_333 = (Transformer__from_transformers.Factory(__gotots_store_332.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_147 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_333, "NodeFactory");
        const __gotots_store_334 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_335 = (Transformer__from_transformers.Factory(__gotots_store_334.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_146 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_335, "NodeFactory");
        const __gotots_store_336 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_14: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_336.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_349: JSDocNullableType__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
        const __gotots_slice_element_11 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_349);
        const __gotots_store_337 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_338 = (Transformer__from_transformers.Factory(__gotots_store_337.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_145 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_338, "NodeFactory");
        const __gotots_store_339 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_340 = (Transformer__from_transformers.Factory(__gotots_store_339.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_350 = NodeFactory__from_ast.NewKeywordExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_340, "NodeFactory"), KindNullKeyword$constant__from_ast());
        const __gotots_slice_element_12 = NodeFactory__from_ast.NewLiteralTypeNode(__gotots_receiver_145, __gotots_argument_350);
        const __gotots_argument_351 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_11, __gotots_slice_element_12]);
        const __gotots_argument_352 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_146, __gotots_argument_351);
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewUnionTypeNode(__gotots_receiver_147, __gotots_argument_352);
        const __gotots_store_341 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_148 = Transformer__from_transformers.EmitContext(__gotots_store_341.Transformer);
        const __gotots_argument_353 = replacement;
        const __gotots_store_342 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTypeBase.TypeNodeBase).NodeBase));
        const __gotots_argument_354 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_342, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_148, __gotots_argument_353, __gotots_argument_354);
        return replacement;
    }
    static $go$private$declarations$transformJSDocOptionalType(tx: DeclarationTransformer | undefined, input: {
        value: JSDocOptionalType__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_344 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_345 = (Transformer__from_transformers.Factory(__gotots_store_344.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_150 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_345, "NodeFactory");
        const __gotots_store_346 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_347 = (Transformer__from_transformers.Factory(__gotots_store_346.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_149 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_347, "NodeFactory");
        const __gotots_store_348 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_16: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_348.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_356: JSDocOptionalType__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
        const __gotots_slice_element_13 = (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_356);
        const __gotots_store_349 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_350 = (Transformer__from_transformers.Factory(__gotots_store_349.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_slice_element_14 = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_350, "NodeFactory"), KindUndefinedKeyword$constant__from_ast());
        const __gotots_argument_357 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_13, __gotots_slice_element_14]);
        const __gotots_argument_358 = NodeFactory__from_ast.NewNodeList(__gotots_receiver_149, __gotots_argument_357);
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewUnionTypeNode(__gotots_receiver_150, __gotots_argument_358);
        const __gotots_store_351 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_151 = Transformer__from_transformers.EmitContext(__gotots_store_351.Transformer);
        const __gotots_argument_359 = replacement;
        const __gotots_store_352 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTypeBase.TypeNodeBase).NodeBase));
        const __gotots_argument_360 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_352, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_151, __gotots_argument_359, __gotots_argument_360);
        return replacement;
    }
    static $go$private$declarations$transformJSDocPropertyTag(tx: DeclarationTransformer | undefined, input: {
        value: JSDocParameterOrPropertyTag__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_322 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_323 = (Transformer__from_transformers.Factory(__gotots_store_322.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_142 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_323, "NodeFactory");
        const __gotots_argument_340 = void 0;
        const __gotots_store_324 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_12: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_324.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_338 = JSDocTagBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).TagName;
        const __gotots_argument_341 = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_338);
        const __gotots_argument_342 = void 0;
        const __gotots_store_325 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_13: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_325.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_339: JSDocParameterOrPropertyTag__from_ast["TypeExpression"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
        const __gotots_argument_343 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_339);
        const __gotots_argument_344 = void 0;
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertySignatureDeclaration(__gotots_receiver_142, __gotots_argument_340, __gotots_argument_341, __gotots_argument_342, __gotots_argument_343, __gotots_argument_344);
        const __gotots_store_326 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_143 = Transformer__from_transformers.EmitContext(__gotots_store_326.Transformer);
        const __gotots_argument_345 = replacement;
        const __gotots_store_327 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            JSDocTagBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).NodeBase));
        const __gotots_argument_346 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_327, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_143, __gotots_argument_345, __gotots_argument_346);
        return replacement;
    }
    static $go$private$declarations$transformJSDocTypeExpression(tx: DeclarationTransformer | undefined, input: {
        value: JSDocTypeExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_314 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_11: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_314.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_334: JSDocTypeExpression__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
        return (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_334);
    }
    static $go$private$declarations$transformJSDocTypeLiteral(tx: DeclarationTransformer | undefined, input: {
        value: JSDocTypeLiteral__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_315 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_4 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_315.Transformer), (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocPropertyTags);
        let members = __gotots_results_4[0];
        const __gotots_store_316 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_317 = (Transformer__from_transformers.Factory(__gotots_store_316.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_140 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_317, "NodeFactory");
        const __gotots_store_318 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_319 = (Transformer__from_transformers.Factory(__gotots_store_318.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_335 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_319, "NodeFactory"), members);
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewTypeLiteralNode(__gotots_receiver_140, __gotots_argument_335);
        const __gotots_store_320 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_141 = Transformer__from_transformers.EmitContext(__gotots_store_320.Transformer);
        const __gotots_argument_336 = replacement;
        const __gotots_store_321 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTypeBase.TypeNodeBase).NodeBase));
        const __gotots_argument_337 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_321, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_141, __gotots_argument_336, __gotots_argument_337);
        return replacement;
    }
    static $go$private$declarations$transformJSDocVariadicType(tx: DeclarationTransformer | undefined, input: {
        value: JSDocVariadicType__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_353 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_354 = (Transformer__from_transformers.Factory(__gotots_store_353.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_152 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_354, "NodeFactory");
        const __gotots_store_355 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_17: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_355.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_361: JSDocVariadicType__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
        const __gotots_argument_362 = (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_361);
        let replacement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewArrayTypeNode(__gotots_receiver_152, __gotots_argument_362);
        const __gotots_store_356 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_153 = Transformer__from_transformers.EmitContext(__gotots_store_356.Transformer);
        const __gotots_argument_363 = replacement;
        const __gotots_store_357 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeNodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTypeBase.TypeNodeBase).NodeBase));
        const __gotots_argument_364 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_357, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        EmitContext__from_printer.SetOriginal(__gotots_receiver_153, __gotots_argument_363, __gotots_argument_364);
        return replacement;
    }
    static $go$private$declarations$transformMappedTypeNode(tx: DeclarationTransformer | undefined, input: {
        value: MappedTypeNode__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if ((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type === undefined) {
            const __gotots_store_198 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_199 = (Transformer__from_transformers.Factory(__gotots_store_198.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            typeNode = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_199, "NodeFactory"), KindAnyKeyword$constant__from_ast());
        }
        else {
            const __gotots_store_200 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_callee_1: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_200.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_141: MappedTypeNode__from_ast["Type"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
            typeNode = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_141);
        }
        const __gotots_store_201 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_202 = (Transformer__from_transformers.Factory(__gotots_store_201.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_71 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_202, "NodeFactory");
        const __gotots_argument_144 = input;
        const __gotots_argument_145: MappedTypeNode__from_ast["ReadonlyToken"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReadonlyToken;
        const __gotots_store_203 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_2: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_203.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_142: MappedTypeNode__from_ast["TypeParameter"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter;
        const __gotots_argument_146 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_142);
        const __gotots_store_204 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_3: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_204.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_143: MappedTypeNode__from_ast["NameType"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NameType;
        const __gotots_argument_147 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_143);
        const __gotots_argument_148: MappedTypeNode__from_ast["QuestionToken"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionToken;
        const __gotots_argument_149 = typeNode;
        const __gotots_argument_150 = void 0;
        return NodeFactory__from_ast.UpdateMappedTypeNode(__gotots_receiver_71, __gotots_argument_144, __gotots_argument_145, __gotots_argument_146, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149, __gotots_argument_150);
    }
    static $go$private$declarations$transformMethodDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: MethodDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_221 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_83 = Transformer__from_transformers.EmitContext(__gotots_store_221.Transformer);
        const __gotots_store_222 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_174 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_222, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_175 = EmitContext__from_printer.ParseNode(__gotots_receiver_83, __gotots_argument_174);
        const __gotots_argument_176 = ModifierFlagsPrivate$constant__from_ast();
        if (!(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_84).GetEffectiveDeclarationFlags(__gotots_argument_175, __gotots_argument_176) === 0)) {
            const __gotots_receiver_85 = tx;
            const __gotots_store_223 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_177 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_223, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return DeclarationTransformer.$go$private$declarations$omitPrivateMethodType(__gotots_receiver_85, __gotots_argument_177);
        }
        else if (IsPrivateIdentifier__from_ast(MethodDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        else {
            const __gotots_store_224 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_225 = (Transformer__from_transformers.Factory(__gotots_store_224.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_90 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_225, "NodeFactory");
            const __gotots_argument_185 = input;
            const __gotots_receiver_86 = tx;
            const __gotots_store_226 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_178 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_226, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_186 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_86, __gotots_argument_178);
            const __gotots_argument_187 = void 0;
            const __gotots_argument_188 = MethodDeclaration__from_ast.Name(input);
            const __gotots_argument_189 = NamedMemberBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
            const __gotots_receiver_87 = tx;
            const __gotots_store_227 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_179 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_227, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_180 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters;
            const __gotots_argument_190 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_87, __gotots_argument_179, __gotots_argument_180);
            const __gotots_receiver_88 = tx;
            const __gotots_store_228 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_181 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_228, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_182 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters;
            const __gotots_argument_191 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_88, __gotots_argument_181, __gotots_argument_182);
            const __gotots_receiver_89 = tx;
            const __gotots_store_229 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_183 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_229, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_184 = false;
            const __gotots_argument_192 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_89, __gotots_argument_183, __gotots_argument_184);
            const __gotots_argument_193 = void 0;
            const __gotots_argument_194 = void 0;
            return NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_90, __gotots_argument_185, __gotots_argument_186, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190, __gotots_argument_191, __gotots_argument_192, __gotots_argument_193, __gotots_argument_194);
        }
    }
    static $go$private$declarations$transformMethodSignatureDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_76 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_212 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_75 = Transformer__from_transformers.EmitContext(__gotots_store_212.Transformer);
        const __gotots_store_213 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_156 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_213, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_157 = EmitContext__from_printer.ParseNode(__gotots_receiver_75, __gotots_argument_156);
        const __gotots_argument_158 = ModifierFlagsPrivate$constant__from_ast();
        if (!(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_76).GetEffectiveDeclarationFlags(__gotots_argument_157, __gotots_argument_158) === 0)) {
            const __gotots_receiver_77 = tx;
            const __gotots_store_214 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_159 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_214, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return DeclarationTransformer.$go$private$declarations$omitPrivateMethodType(__gotots_receiver_77, __gotots_argument_159);
        }
        else if (IsPrivateIdentifier__from_ast(MethodSignatureDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        else {
            const __gotots_store_215 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_216 = (Transformer__from_transformers.Factory(__gotots_store_215.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_82 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_216, "NodeFactory");
            const __gotots_argument_167 = input;
            const __gotots_receiver_78 = tx;
            const __gotots_store_217 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_160 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_217, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_168 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_78, __gotots_argument_160);
            const __gotots_argument_169 = MethodSignatureDeclaration__from_ast.Name(input);
            const __gotots_argument_170 = (void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken;
            const __gotots_receiver_79 = tx;
            const __gotots_store_218 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_161 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_218, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_162 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters;
            const __gotots_argument_171 = DeclarationTransformer.$go$private$declarations$ensureTypeParams(__gotots_receiver_79, __gotots_argument_161, __gotots_argument_162);
            const __gotots_receiver_80 = tx;
            const __gotots_store_219 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_163 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_219, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_164 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters;
            const __gotots_argument_172 = DeclarationTransformer.$go$private$declarations$updateParamList(__gotots_receiver_80, __gotots_argument_163, __gotots_argument_164);
            const __gotots_receiver_81 = tx;
            const __gotots_store_220 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                MethodSignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_165 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_220, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_166 = false;
            const __gotots_argument_173 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_81, __gotots_argument_165, __gotots_argument_166);
            return NodeFactory__from_ast.UpdateMethodSignatureDeclaration(__gotots_receiver_82, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169, __gotots_argument_170, __gotots_argument_171, __gotots_argument_172, __gotots_argument_173);
        }
    }
    static $go$private$declarations$transformModuleDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: ModuleDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_201 = tx;
        const __gotots_store_462 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
        const __gotots_argument_501 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_462, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_201, __gotots_argument_501);
        let saveNeedsDeclare = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = false;
        let inner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = BodyBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body;
        let keyword: ModuleDeclaration__from_ast["Keyword"] = (input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Keyword;
        if (!(keyword === KindGlobalKeyword$constant__from_ast()) && (ModuleDeclaration__from_ast.Name(input) === undefined || !IsStringLiteral__from_ast(ModuleDeclaration__from_ast.Name(input)))) {
            keyword = KindNamespaceKeyword$constant__from_ast();
        }
        if (!(inner === undefined) && Node__from_ast.$storageOf(((inner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast()) {
            let oldNeedsScopeFix = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker;
            let oldHasScopeFix = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = false;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = false;
            const __gotots_store_463 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_463.Transformer), Node__from_ast.StatementList(inner));
            let lateStatements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$transformAndReplaceLatePaintedStatements(tx, statements);
            if (!(((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase)).NodeDefault)).Node)).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = false;
            }
            const __gotots_store_464 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                StatementBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StatementBase).NodeBase));
            const __gotots_argument_502 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_464, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            if (!IsGlobalScopeAugmentation__from_ast(__gotots_argument_502) && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker && !hasScopeMarker(lateStatements)) {
                if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker) {
                    const __gotots_store_465 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_466 = (Transformer__from_transformers.Factory(__gotots_store_465.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_202 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_466, "NodeFactory");
                    const __gotots_argument_504 = NodeList__from_ast.$storageOf(((lateStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    const __gotots_store_467 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_468 = (Transformer__from_transformers.Factory(__gotots_store_467.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_argument_503 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_468, "NodeFactory"));
                    const __gotots_argument_505 = createEmptyExports(__gotots_argument_503);
                    const __gotots_argument_506 = __gotots_argument_504.append(void 0, [__gotots_argument_505]);
                    lateStatements = NodeFactory__from_ast.NewNodeList(__gotots_receiver_202, __gotots_argument_506);
                }
                else {
                    lateStatements = NodeVisitor__from_ast.VisitNodes((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportStrippingVisitor, lateStatements);
                }
            }
            const __gotots_store_469 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_470 = (Transformer__from_transformers.Factory(__gotots_store_469.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateModuleBlock(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_470, "NodeFactory"), Node__from_ast.AsModuleBlock(inner), lateStatements);
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = saveNeedsDeclare;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = oldNeedsScopeFix;
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = oldHasScopeFix;
            const __gotots_store_471 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_472 = (Transformer__from_transformers.Factory(__gotots_store_471.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateModuleDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_472, "NodeFactory"), input, mods, keyword, ModuleDeclaration__from_ast.Name(input), body);
        }
        if (!(inner === undefined)) {
            const __gotots_store_473 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_callee_21: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_473.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_507 = inner;
            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_507);
            const __gotots_store_474 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_474.Transformer), inner);
            let id = GetNodeId__from_ast(original);
            const __gotots_results_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.lookupOk(id);
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_12[0];
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.delete(id);
            const __gotots_store_475 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_476 = (Transformer__from_transformers.Factory(__gotots_store_475.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.UpdateModuleDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_476, "NodeFactory"), input, mods, keyword, ModuleDeclaration__from_ast.Name(input), body);
        }
        const __gotots_store_477 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_478 = (Transformer__from_transformers.Factory(__gotots_store_477.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateModuleDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_478, "NodeFactory"), input, mods, keyword, ModuleDeclaration__from_ast.Name(input), void 0);
    }
    static $go$private$declarations$transformPropertyDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: PropertyDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(PropertyDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NamedMemberBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
        if (!(postfixToken === undefined) && Node__from_ast.$storageOf(((postfixToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExclamationToken$constant__from_ast()) {
            postfixToken = void 0;
        }
        const __gotots_store_252 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_253 = (Transformer__from_transformers.Factory(__gotots_store_252.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_112 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_253, "NodeFactory");
        const __gotots_argument_249 = input;
        const __gotots_receiver_109 = tx;
        const __gotots_store_254 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_245 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_254, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_250 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_109, __gotots_argument_245);
        const __gotots_argument_251 = PropertyDeclaration__from_ast.Name(input);
        const __gotots_argument_252 = postfixToken;
        const __gotots_receiver_110 = tx;
        const __gotots_store_255 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_246 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_255, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_247 = false;
        const __gotots_argument_253 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_110, __gotots_argument_246, __gotots_argument_247);
        const __gotots_receiver_111 = tx;
        const __gotots_store_256 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_248 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_256, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_254 = DeclarationTransformer.$go$private$declarations$ensureNoInitializer(__gotots_receiver_111, __gotots_argument_248);
        return NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_112, __gotots_argument_249, __gotots_argument_250, __gotots_argument_251, __gotots_argument_252, __gotots_argument_253, __gotots_argument_254);
    }
    static $go$private$declarations$transformPropertySignatureDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(PropertySignatureDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        const __gotots_store_257 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_258 = (Transformer__from_transformers.Factory(__gotots_store_257.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_116 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_258, "NodeFactory");
        const __gotots_argument_259 = input;
        const __gotots_receiver_113 = tx;
        const __gotots_store_259 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertySignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_255 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_259, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_260 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_113, __gotots_argument_255);
        const __gotots_argument_261 = PropertySignatureDeclaration__from_ast.Name(input);
        const __gotots_argument_262 = (void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
            PropertySignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken;
        const __gotots_receiver_114 = tx;
        const __gotots_store_260 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertySignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_256 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_260, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_257 = false;
        const __gotots_argument_263 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_114, __gotots_argument_256, __gotots_argument_257);
        const __gotots_receiver_115 = tx;
        const __gotots_store_261 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertySignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_258 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_261, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_264 = DeclarationTransformer.$go$private$declarations$ensureNoInitializer(__gotots_receiver_115, __gotots_argument_258);
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdatePropertySignatureDeclaration(__gotots_receiver_116, __gotots_argument_259, __gotots_argument_260, __gotots_argument_261, __gotots_argument_262, __gotots_argument_263, __gotots_argument_264);
        const __gotots_receiver_117 = tx;
        const __gotots_argument_265 = result;
        const __gotots_store_262 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            PropertySignatureDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_266 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_262, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        DeclarationTransformer.$go$private$declarations$preservePartialJsDoc(__gotots_receiver_117, __gotots_argument_265, __gotots_argument_266);
        return result;
    }
    static $go$private$declarations$transformSetAccessorDeclaration(tx: DeclarationTransformer | undefined, input: {
        value: SetAccessorDeclaration__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (IsPrivateIdentifier__from_ast(SetAccessorDeclaration__from_ast.Name(input))) {
            return void 0;
        }
        const __gotots_store_246 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_247 = (Transformer__from_transformers.Factory(__gotots_store_246.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_108 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_247, "NodeFactory");
        const __gotots_argument_237 = input;
        const __gotots_receiver_104 = tx;
        const __gotots_store_248 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_231 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_248, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_238 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_104, __gotots_argument_231);
        const __gotots_argument_239 = SetAccessorDeclaration__from_ast.Name(input);
        const __gotots_argument_240 = void 0;
        const __gotots_receiver_107 = tx;
        const __gotots_store_249 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_235 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_249, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_receiver_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_250 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_105 = Transformer__from_transformers.EmitContext(__gotots_store_250.Transformer);
        const __gotots_store_251 = NodeBase__from_ast.$storageOf((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
        const __gotots_argument_232 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_251, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_233 = EmitContext__from_printer.ParseNode(__gotots_receiver_105, __gotots_argument_232);
        const __gotots_argument_234 = ModifierFlagsPrivate$constant__from_ast();
        const __gotots_argument_236 = !(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_106).GetEffectiveDeclarationFlags(__gotots_argument_233, __gotots_argument_234) === 0);
        const __gotots_argument_241 = DeclarationTransformer.$go$private$declarations$updateAccessorParamList(__gotots_receiver_107, __gotots_argument_235, __gotots_argument_236);
        const __gotots_argument_242 = void 0;
        const __gotots_argument_243 = void 0;
        const __gotots_argument_244 = void 0;
        return NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_108, __gotots_argument_237, __gotots_argument_238, __gotots_argument_239, __gotots_argument_240, __gotots_argument_241, __gotots_argument_242, __gotots_argument_243, __gotots_argument_244);
    }
    static $go$private$declarations$transformSourceFile(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_receiver_44 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionVisitor;
        const __gotots_store_86 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_92 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_86, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        NodeVisitor__from_ast.VisitNode(__gotots_receiver_44, __gotots_argument_92);
        let combinedStatements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_87.Transformer), ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements);
        combinedStatements = DeclarationTransformer.$go$private$declarations$transformAndReplaceLatePaintedStatements(tx, statements);
        NodeList__from_ast.$storageOf(((combinedStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        if (IsExternalOrCommonJSModule__from_ast(node)) {
            const __gotots_store_88 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_93 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            if (IsInJSFile__from_ast(__gotots_argument_93)) {
                {
                    let exportEquals: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookup(InternalSymbolNameExportEquals$string__from_ast);
                    if (!(exportEquals === undefined) && Symbol__from_ast.$storageOf(((exportEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 1) {
                        const __gotots_range_3 = Symbol__from_ast.$storageOf(((exportEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
                        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                            let node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                            SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(node__shadow_1, $state__diagnostics.Multiple_module_exports_assignments_cannot_be_serialized_for_declaration_emit, RuntimeSlice.nil<GoInterface | undefined>()));
                        }
                    }
                }
                const __gotots_range_4 = ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NestedCJSExports;
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                    const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                    let node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
                    SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(node__shadow_1, $state__diagnostics.Nested_CommonJS_export_constructs_cannot_be_serialized_for_declaration_emit, RuntimeSlice.nil<GoInterface | undefined>()));
                }
            }
            if (!(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator || ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker && !(tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker)) {
                const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_90 = (Transformer__from_transformers.Factory(__gotots_store_89.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_94 = (void NodeFactory__from_ast.AsNodeFactory, tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "NodeFactory"));
                let marker: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = createEmptyExports(__gotots_argument_94);
                let newList = NodeList__from_ast.$storageOf(((combinedStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.append(void 0, [marker]);
                const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_92 = (Transformer__from_transformers.Factory(__gotots_store_91.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let withMarker: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_92, "NodeFactory"), newList);
                NodeList__from_ast.$storageOf(((withMarker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((combinedStatements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
                combinedStatements = withMarker;
            }
        }
        let outputFilePath = GetDirectoryPath__from_tspath(NormalizeSlashes__from_tspath((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).declarationFilePath));
        const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_94 = (Transformer__from_transformers.Factory(__gotots_store_93.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_94, "NodeFactory"), node, combinedStatements, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken);
        ((Node__from_ast.AsSourceFile(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives = DeclarationTransformer.$go$private$declarations$getLibReferences(tx);
        ((Node__from_ast.AsSourceFile(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives = DeclarationTransformer.$go$private$declarations$getTypeReferences(tx);
        ((Node__from_ast.AsSourceFile(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile = true;
        ((Node__from_ast.AsSourceFile(result) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles = DeclarationTransformer.$go$private$declarations$getReferencedFiles(tx, outputFilePath);
        return (void Node__from_ast.AsNode,
            result);
    }
    static $go$private$declarations$transformTopLevelDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements.length > 0) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements = Filter$PointerTo_Named_ast$Node(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return !tsonicTypeScriptRuntime.sameLocation(node, input);
            });
        }
        if (DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, input)) {
            return void 0;
        }
        if (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) {
            return DeclarationTransformer.$go$private$declarations$transformImportEqualsDeclaration(tx, Node__from_ast.AsImportEqualsDeclaration(input));
        }
        if (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSImportDeclaration$constant__from_ast()) {
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$transformImportDeclaration(tx, Node__from_ast.AsImportDeclaration(input));
            if (!(res === undefined) && !(Node__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast())) {
                const __gotots_receiver_50 = res;
                const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_104 = new $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory(Transformer__from_transformers.Factory(__gotots_store_118.Transformer));
                let res__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Clone(__gotots_receiver_50, __gotots_argument_104);
                Node__from_ast.$storageOf(((res__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind = KindImportDeclaration$constant__from_ast();
                return res__shadow_1;
            }
            return res;
        }
        let __gotots_logical_result_8 = IsDeclaration__from_ast(input);
        if (__gotots_logical_result_8) {
            const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_105 = Transformer__from_transformers.EmitContext(__gotots_store_119.Transformer);
            const __gotots_argument_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_107 = input;
            __gotots_logical_result_8 = isDeclarationAndNotVisible(__gotots_argument_105, __gotots_argument_106, __gotots_argument_107);
        }
        if (__gotots_logical_result_8) {
            return void 0;
        }
        let __gotots_logical_result_9 = IsFunctionLike__from_ast(input);
        if (__gotots_logical_result_9) {
            const __gotots_receiver_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_108 = input;
            __gotots_logical_result_9 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_51).IsImplementationOfOverload(__gotots_argument_108);
        }
        if (__gotots_logical_result_9) {
            return void 0;
        }
        const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let original: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_120.Transformer), input);
        let id = GetNodeId__from_ast(original);
        {
            const __gotots_results_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts.lookupOk(id);
            let ok = __gotots_results_3[1];
            if (ok) {
                return DeclarationTransformer.$go$private$declarations$createFullExpandoBlock(tx, id);
            }
        }
        let previousEnclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
        if (isEnclosingDeclaration(input)) {
            (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = input;
        }
        let canProdiceDiagnostic = canProduceDiagnostics(input);
        let oldDiag: (($0: SymbolAccessibilityResult__from_printer) => SymbolAccessibilityDiagnostic | undefined) | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic;
        let oldName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode;
        if (canProdiceDiagnostic) {
            ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
        }
        let saveNeedsDeclare = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare;
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        switch (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindTypeAliasDeclaration$constant__from_ast():
            case KindJSTypeAliasDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformTypeAliasDeclaration(tx, Node__from_ast.AsTypeAliasDeclaration(input));
                break;
            }
            case KindInterfaceDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformInterfaceDeclaration(tx, Node__from_ast.AsInterfaceDeclaration(input));
                break;
            }
            case KindFunctionDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformFunctionDeclaration(tx, Node__from_ast.AsFunctionDeclaration(input));
                break;
            }
            case KindModuleDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformModuleDeclaration(tx, Node__from_ast.AsModuleDeclaration(input));
                break;
            }
            case KindClassDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformClassDeclaration(tx, Node__from_ast.AsClassDeclaration(input));
                break;
            }
            case KindVariableStatement$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformVariableStatement(tx, Node__from_ast.AsVariableStatement(input));
                break;
            }
            case KindEnumDeclaration$constant__from_ast(): {
                result = DeclarationTransformer.$go$private$declarations$transformEnumDeclaration(tx, Node__from_ast.AsEnumDeclaration(input));
                break;
            }
            default: {
                const __gotots_argument_109 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unhandled top-level node in declaration emit: %q", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
                GoPanic.raise(__gotots_argument_109 === undefined ? GoPanicNilValue.create() : __gotots_argument_109);
                break;
            }
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = previousEnclosingDeclaration;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = oldDiag;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = saveNeedsDeclare;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorNameNode = oldName;
        return result;
    }
    static $go$private$declarations$transformTypeAliasDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = false;
        const __gotots_store_443 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_444 = (Transformer__from_transformers.Factory(__gotots_store_443.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_192 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_444, "NodeFactory");
        const __gotots_argument_471 = input;
        const __gotots_receiver_191 = tx;
        const __gotots_store_445 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                TypeAliasDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_469 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_445, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_472 = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_191, __gotots_argument_469);
        const __gotots_argument_473 = TypeAliasDeclaration__from_ast.Name(input);
        const __gotots_store_446 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_474 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_446.Transformer), TypeAliasDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value).TypeParameters);
        const __gotots_store_447 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_callee_19: NodeVisitor__from_ast["Visit"] = (Transformer__from_transformers.Visitor(__gotots_store_447.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
        const __gotots_argument_470 = TypeAliasDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeAliasDeclaration__from_ast>).value).Type;
        const __gotots_argument_475 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_470);
        return NodeFactory__from_ast.UpdateTypeAliasDeclaration(__gotots_receiver_192, __gotots_argument_471, __gotots_argument_472, __gotots_argument_473, __gotots_argument_474, __gotots_argument_475);
    }
    static $go$private$declarations$transformTypeParameterDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (isPrivateMethodTypeParameter((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host, input) && (!(TypeParameterDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType === undefined) || !(TypeParameterDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint === undefined))) {
            const __gotots_store_280 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_281 = (Transformer__from_transformers.Factory(__gotots_store_280.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_128 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_281, "NodeFactory");
            const __gotots_argument_294 = input;
            const __gotots_store_282 = TypeParameterDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value);
            const __gotots_argument_295 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.projectLocation<ModifiersBase__from_ast$Storage, ModifiersBase__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_282, "ModifiersBase"), ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
            const __gotots_argument_296 = TypeParameterDeclaration__from_ast.Name(input);
            const __gotots_argument_297 = void 0;
            const __gotots_argument_298 = TypeParameterDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Expression;
            const __gotots_argument_299 = void 0;
            return NodeFactory__from_ast.UpdateTypeParameterDeclaration(__gotots_receiver_128, __gotots_argument_294, __gotots_argument_295, __gotots_argument_296, __gotots_argument_297, __gotots_argument_298, __gotots_argument_299);
        }
        const __gotots_store_283 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_129 = Transformer__from_transformers.Visitor(__gotots_store_283.Transformer);
        const __gotots_store_284 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            TypeParameterDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_300 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_284, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_129, __gotots_argument_300);
    }
    static $go$private$declarations$transformTypeReference(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, TypeReferenceNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
        const __gotots_store_287 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_131 = Transformer__from_transformers.Visitor(__gotots_store_287.Transformer);
        const __gotots_store_288 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void TypeNodeBase__from_ast.$storageOf, (void TypeNodeBase__from_ast.$fromStorage,
                (void NodeWithTypeArgumentsBase__from_ast.$storageOf, (void NodeWithTypeArgumentsBase__from_ast.$fromStorage,
                    TypeReferenceNode__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeNodeBase)).NodeBase));
        const __gotots_argument_302 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_288, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_131, __gotots_argument_302);
    }
    static $go$private$declarations$transformVariableDeclaration(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_logical_result_11 = !(((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined);
        if (__gotots_logical_result_11) {
            const __gotots_store_275 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_285 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_275, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_11 = IsVariableDeclarationInitializedToRequire__from_ast(__gotots_argument_285);
        }
        if (__gotots_logical_result_11) {
            return DeclarationTransformer.$go$private$declarations$transformCjsRequireVariableDeclaration(tx, input);
        }
        if (IsBindingPattern__from_ast(VariableDeclaration__from_ast.Name(input))) {
            return DeclarationTransformer.$go$private$declarations$recreateBindingPattern(tx, Node__from_ast.AsBindingPattern(VariableDeclaration__from_ast.Name(input)));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts = true;
        const __gotots_store_276 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_277 = (Transformer__from_transformers.Factory(__gotots_store_276.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_127 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_277, "NodeFactory");
        const __gotots_argument_289 = input;
        const __gotots_argument_290 = VariableDeclaration__from_ast.Name(input);
        const __gotots_argument_291 = void 0;
        const __gotots_receiver_125 = tx;
        const __gotots_store_278 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_286 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_278, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_287 = false;
        const __gotots_argument_292 = DeclarationTransformer.$go$private$declarations$ensureType(__gotots_receiver_125, __gotots_argument_286, __gotots_argument_287);
        const __gotots_receiver_126 = tx;
        const __gotots_store_279 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_288 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_279, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        const __gotots_argument_293 = DeclarationTransformer.$go$private$declarations$ensureNoInitializer(__gotots_receiver_126, __gotots_argument_288);
        return NodeFactory__from_ast.UpdateVariableDeclaration(__gotots_receiver_127, __gotots_argument_289, __gotots_argument_290, __gotots_argument_291, __gotots_argument_292, __gotots_argument_293);
    }
    static $go$private$declarations$transformVariableStatement(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<VariableStatement__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let visible = false;
        const __gotots_range_16 = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_16.length; __gotots_range_index_11++) {
            const __gotots_range_value_16 = __gotots_range_16.get(__gotots_range_index_11);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
            visible = getBindingNameVisible((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver, decl);
            if (visible) {
                break;
            }
        }
        if (!visible) {
            return void 0;
        }
        let inputNodes = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        let extraImports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!(((((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
            let normalDeclarations = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            let imports = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_17 = inputNodes;
            for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_17.length; __gotots_range_index_12++) {
                const __gotots_range_value_17 = __gotots_range_17.get(__gotots_range_index_12);
                let n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_17;
                if (IsVariableDeclarationInitializedToRequire__from_ast(n)) {
                    imports = imports.append(void 0, [n]);
                }
                else {
                    normalDeclarations = normalDeclarations.append(void 0, [n]);
                }
            }
            inputNodes = normalDeclarations;
            const __gotots_store_528 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_13 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_528.Transformer), imports);
            extraImports = __gotots_results_13[0];
        }
        const __gotots_store_529 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_14 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_529.Transformer), inputNodes);
        let nodes = __gotots_results_14[0];
        if (nodes.length === 0) {
            if (extraImports.length > 0) {
                const __gotots_store_530 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_531 = (Transformer__from_transformers.Factory(__gotots_store_530.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_531, "NodeFactory"), extraImports);
            }
            return void 0;
        }
        const __gotots_store_532 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_533 = (Transformer__from_transformers.Factory(__gotots_store_532.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_533, "NodeFactory"), nodes);
        const __gotots_receiver_218 = tx;
        const __gotots_store_534 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void StatementBase__from_ast.$storageOf, (void StatementBase__from_ast.$fromStorage,
                VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).StatementBase)).NodeBase));
        const __gotots_argument_555 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_534, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$ensureModifiers(__gotots_receiver_218, __gotots_argument_555);
        let declList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsVarUsing__from_ast(VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) || IsVarAwaitUsing__from_ast(VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList)) {
            const __gotots_store_535 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_536 = (Transformer__from_transformers.Factory(__gotots_store_535.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            declList = NodeFactory__from_ast.NewVariableDeclarationList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_536, "NodeFactory"), nodeList, NodeFlagsConst$constant__from_ast());
            const __gotots_store_537 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_537.Transformer), declList, VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList);
            const __gotots_store_538 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetCommentRange(Transformer__from_transformers.EmitContext(__gotots_store_538.Transformer), declList, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            Node__from_ast.$storageOf(((declList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        else {
            const __gotots_store_539 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_540 = (Transformer__from_transformers.Factory(__gotots_store_539.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            declList = NodeFactory__from_ast.UpdateVariableDeclarationList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_540, "NodeFactory"), Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList), nodeList, Node__from_ast.$storageOf(((VariableStatement__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags);
        }
        const __gotots_store_541 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_542 = (Transformer__from_transformers.Factory(__gotots_store_541.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableStatement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_542, "NodeFactory"), input, modifiers, declList);
        if (extraImports.length > 0) {
            const __gotots_store_543 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_544 = (Transformer__from_transformers.Factory(__gotots_store_543.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewSyntaxList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_544, "NodeFactory"), extraImports.append(void 0, [res]));
        }
        return res;
    }
    static $go$private$declarations$tryGetPropertyName(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        if (IsElementAccessExpression__from_ast(node)) {
            const __gotots_receiver_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
            const __gotots_argument_365 = Node__from_ast.AsElementAccessExpression(node);
            return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_154).GetElementAccessExpressionName(__gotots_argument_365);
        }
        if (IsPropertyAccessExpression__from_ast(node)) {
            return Node__from_ast.Text(Node__from_ast.Name(node));
        }
        return "";
    }
    static $go$private$declarations$tryGetResolutionModeOverride(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return node;
        }
        const __gotots_receiver_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_95 = node;
        let mode = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_45).GetResolutionModeOverride(__gotots_argument_95);
        if (!(mode === ResolutionModeNone$constant__from_core())) {
            return node;
        }
        return void 0;
    }
    static $go$private$declarations$updateAccessorParamList(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isPrivate: bool): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        let newParams = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        if (!isPrivate) {
            let thisParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetThisParameter__from_ast(input);
            if (!(thisParam === undefined)) {
                newParams = newParams.append(void 0, [DeclarationTransformer.$go$private$declarations$ensureParameter(tx, Node__from_ast.AsParameterDeclaration(thisParam))]);
            }
        }
        if (IsSetAccessorDeclaration__from_ast(input)) {
            let valueParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            if (!isPrivate) {
                if (newParams.length === 1 && NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >= 2) {
                    valueParam = DeclarationTransformer.$go$private$declarations$ensureParameter(tx, Node__from_ast.AsParameterDeclaration(NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(1)));
                }
                else if (newParams.length === 0 && NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length >= 1) {
                    valueParam = DeclarationTransformer.$go$private$declarations$ensureParameter(tx, Node__from_ast.AsParameterDeclaration(NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                        FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0)));
                }
            }
            if (valueParam === undefined) {
                let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (!isPrivate) {
                    const __gotots_store_586 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_587 = (Transformer__from_transformers.Factory(__gotots_store_586.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    t = NodeFactory__from_ast.NewKeywordTypeNode(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_587, "NodeFactory"), KindAnyKeyword$constant__from_ast());
                }
                const __gotots_store_588 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_589 = (Transformer__from_transformers.Factory(__gotots_store_588.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_228 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_589, "NodeFactory");
                const __gotots_argument_579 = void 0;
                const __gotots_argument_580 = void 0;
                const __gotots_store_590 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_591 = (Transformer__from_transformers.Factory(__gotots_store_590.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_581 = NodeFactory__from_ast.NewIdentifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_591, "NodeFactory"), "value");
                const __gotots_argument_582 = void 0;
                const __gotots_argument_583 = t;
                const __gotots_argument_584 = void 0;
                valueParam = NodeFactory__from_ast.NewParameterDeclaration(__gotots_receiver_228, __gotots_argument_579, __gotots_argument_580, __gotots_argument_581, __gotots_argument_582, __gotots_argument_583, __gotots_argument_584);
            }
            newParams = newParams.append(void 0, [valueParam]);
        }
        const __gotots_store_592 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_593 = (Transformer__from_transformers.Factory(__gotots_store_592.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_593, "NodeFactory"), newParams);
    }
    static $go$private$declarations$updateParamList(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, params: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        const __gotots_receiver_227 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_store_581 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_577 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_581.Transformer), node);
        const __gotots_argument_578 = ModifierFlagsPrivate$constant__from_ast();
        if (!(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_227).GetEffectiveDeclarationFlags(__gotots_argument_577, __gotots_argument_578) === 0) || NodeList__from_ast.$storageOf(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            const __gotots_store_582 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_583 = (Transformer__from_transformers.Factory(__gotots_store_582.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            return NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_583, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]));
        }
        let results = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(NodeList__from_ast.$storageOf(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, null, void 0);
        const __gotots_range_18 = NodeList__from_ast.$storageOf(((params ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_18.length; __gotots_range_index_13++) {
            const __gotots_range_value_18 = __gotots_range_index_13;
            const __gotots_range_value_19 = __gotots_range_18.get(__gotots_range_index_13);
            let i = __gotots_range_value_18;
            let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_19;
            results.set(i, DeclarationTransformer.$go$private$declarations$ensureParameter(tx, Node__from_ast.AsParameterDeclaration(p)));
        }
        const __gotots_store_584 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_585 = (Transformer__from_transformers.Factory(__gotots_store_584.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_585, "NodeFactory"), results);
    }
    static $go$private$declarations$visit(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return void 0;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                return DeclarationTransformer.$go$private$declarations$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
            case KindFunctionDeclaration$constant__from_ast():
            case KindModuleDeclaration$constant__from_ast():
            case KindImportEqualsDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindJSTypeAliasDeclaration$constant__from_ast():
            case KindTypeAliasDeclaration$constant__from_ast():
            case KindEnumDeclaration$constant__from_ast():
            case KindVariableStatement$constant__from_ast():
            case KindImportDeclaration$constant__from_ast():
            case KindJSImportDeclaration$constant__from_ast():
            case KindExportDeclaration$constant__from_ast():
            case KindExportAssignment$constant__from_ast(): {
                return DeclarationTransformer.$go$private$declarations$visitDeclarationStatements(tx, node);
                break;
            }
            case KindBreakStatement$constant__from_ast():
            case KindContinueStatement$constant__from_ast():
            case KindDebuggerStatement$constant__from_ast():
            case KindDoStatement$constant__from_ast():
            case KindEmptyStatement$constant__from_ast():
            case KindForInStatement$constant__from_ast():
            case KindForOfStatement$constant__from_ast():
            case KindForStatement$constant__from_ast():
            case KindIfStatement$constant__from_ast():
            case KindLabeledStatement$constant__from_ast():
            case KindReturnStatement$constant__from_ast():
            case KindSwitchStatement$constant__from_ast():
            case KindThrowStatement$constant__from_ast():
            case KindTryStatement$constant__from_ast():
            case KindWhileStatement$constant__from_ast():
            case KindWithStatement$constant__from_ast():
            case KindNotEmittedStatement$constant__from_ast():
            case KindBlock$constant__from_ast():
            case KindMissingDeclaration$constant__from_ast(): {
                return void 0;
                break;
            }
            case KindExpressionStatement$constant__from_ast(): {
                return DeclarationTransformer.$go$private$declarations$visitExpressionStatement(tx, node);
                break;
            }
            default: {
                return DeclarationTransformer.$go$private$declarations$visitDeclarationSubtree(tx, node);
                break;
            }
        }
    }
    static $go$private$declarations$visitBindingName(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindIdentifier$constant__from_ast():
            case KindOmittedExpression$constant__from_ast(): {
                return node;
                break;
            }
            case KindArrayBindingPattern$constant__from_ast():
            case KindObjectBindingPattern$constant__from_ast(): {
                return Node__from_ast.VisitEachChild(node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bindingNameVisitor);
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                if (!(Node__from_ast.PropertyName(node) === undefined) && IsComputedPropertyName__from_ast(Node__from_ast.PropertyName(node)) && IsEntityNameExpression__from_ast(Node__from_ast.Expression(Node__from_ast.PropertyName(node)))) {
                    DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, Node__from_ast.Expression(Node__from_ast.PropertyName(node)), (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
                }
                const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_6 = (Transformer__from_transformers.Factory(__gotots_store_5.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateBindingElement(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeFactory"), Node__from_ast.AsBindingElement(node), (Node__from_ast.AsBindingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken, Node__from_ast.PropertyName(node), NodeVisitor__from_ast.VisitNode((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bindingNameVisitor, Node__from_ast.Name(node)), void 0);
                break;
            }
            default: {
                return node;
                break;
            }
        }
    }
    static $go$private$declarations$visitDeclarationStatements(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, input)) {
            return void 0;
        }
        switch (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindExportDeclaration$constant__from_ast(): {
                if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = true;
                }
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = true;
                const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_29 = (Transformer__from_transformers.Factory(__gotots_store_28.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateExportDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "NodeFactory"), Node__from_ast.AsExportDeclaration(input), Node__from_ast.Modifiers(input), Node__from_ast.IsTypeOnly(input), (Node__from_ast.AsExportDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause, DeclarationTransformer.$go$private$declarations$rewriteModuleSpecifier(tx, input, Node__from_ast.ModuleSpecifier(input)), DeclarationTransformer.$go$private$declarations$tryGetResolutionModeOverride(tx, (Node__from_ast.AsExportDeclaration(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes));
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return DeclarationTransformer.$go$private$declarations$transformExportAssignment(tx, input, input, Node__from_ast.Expression(input), (Node__from_ast.AsExportAssignment(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsExportEquals);
                break;
            }
            default: {
                const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_18 = EmitContext__from_printer.MostOriginal(Transformer__from_transformers.EmitContext(__gotots_store_30.Transformer), input);
                let id = GetNodeId__from_ast(__gotots_argument_18);
                if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.lookup(id) === undefined) {
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap.store(id, DeclarationTransformer.$go$private$declarations$transformTopLevelDeclaration(tx, input));
                }
                return input;
                break;
            }
        }
    }
    static $go$private$declarations$visitDeclarationSubtree(tx: DeclarationTransformer | undefined, input: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (DeclarationTransformer.$go$private$declarations$shouldStripInternal(tx, input)) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    if (IsDeclaration__from_ast(input)) {
                        const __gotots_store_31 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_19 = Transformer__from_transformers.EmitContext(__gotots_store_31.Transformer);
                        const __gotots_argument_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                        const __gotots_argument_21 = input;
                        if (isDeclarationAndNotVisible(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21)) {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                        }
                        if (HasDynamicName__from_ast(input)) {
                            if (((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isolatedDeclarations) {
                                const __gotots_receiver_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                                const __gotots_argument_22 = Node__from_ast.Expression(Node__from_ast.Name(input));
                                if (!goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_18).IsDefinitelyReferenceToGlobalSymbolObject(__gotots_argument_22)) {
                                    if (IsClassDeclaration__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                                        SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(input, $state__diagnostics.Computed_property_names_on_class_or_object_literals_cannot_be_inferred_with_isolatedDeclarations, RuntimeSlice.nil<GoInterface | undefined>()));
                                        __gotots_return_0 = void 0;
                                        break __gotots_return_block_0;
                                    }
                                    else if ((IsInterfaceDeclaration__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsTypeLiteralNode__from_ast(Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) && !IsEntityNameExpression__from_ast(Node__from_ast.Expression(Node__from_ast.Name(input)))) {
                                        SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(input, $state__diagnostics.Computed_properties_must_be_number_or_string_literals_variables_or_dotted_expressions_with_isolatedDeclarations, RuntimeSlice.nil<GoInterface | undefined>()));
                                        __gotots_return_0 = void 0;
                                        break __gotots_return_block_0;
                                    }
                                }
                            }
                            else {
                                const __gotots_receiver_19 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                                const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_argument_23 = EmitContext__from_printer.ParseNode(Transformer__from_transformers.EmitContext(__gotots_store_32.Transformer), input);
                                if (!goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_19).IsLateBound(__gotots_argument_23) || !IsEntityNameExpression__from_ast(Node__from_ast.Expression(Node__from_ast.Name(input)))) {
                                    __gotots_return_0 = void 0;
                                    break __gotots_return_block_0;
                                }
                            }
                        }
                    }
                    let __gotots_logical_result_3 = IsFunctionLike__from_ast(input);
                    if (__gotots_logical_result_3) {
                        const __gotots_receiver_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                        const __gotots_argument_24 = input;
                        __gotots_logical_result_3 = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_20).IsImplementationOfOverload(__gotots_argument_24);
                    }
                    if (__gotots_logical_result_3) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    if (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonClassElement$constant__from_ast()) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    if (IsHeritageClause__from_ast(input) && (NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0 || (NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1 && NodeIsMissing__from_ast(NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0))))) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    let previousEnclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration;
                    if (isEnclosingDeclaration(input)) {
                        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = input;
                    }
                    const __gotots_results_1 = DeclarationTransformer.$go$private$declarations$setupDiagnosticContext(tx, input);
                    let canProdiceDiagnostic = __gotots_results_1[0];
                    let cleanupDiagnosticContext: (() => void) | undefined = __gotots_results_1[1];
                    const __gotots_callee_0: (() => void) | undefined = cleanupDiagnosticContext;
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    };
                    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    switch (Node__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindMappedType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformMappedTypeNode(tx, Node__from_ast.AsMappedTypeNode(input));
                            break;
                        }
                        case KindHeritageClause$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformHeritageClause(tx, Node__from_ast.AsHeritageClause(input));
                            break;
                        }
                        case KindMethodSignature$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformMethodSignatureDeclaration(tx, Node__from_ast.AsMethodSignatureDeclaration(input));
                            break;
                        }
                        case KindMethodDeclaration$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformMethodDeclaration(tx, Node__from_ast.AsMethodDeclaration(input));
                            break;
                        }
                        case KindConstructSignature$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformConstructSignatureDeclaration(tx, Node__from_ast.AsConstructSignatureDeclaration(input));
                            break;
                        }
                        case KindConstructor$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformConstructorDeclaration(tx, Node__from_ast.AsConstructorDeclaration(input));
                            break;
                        }
                        case KindGetAccessor$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformGetAccesorDeclaration(tx, Node__from_ast.AsGetAccessorDeclaration(input));
                            break;
                        }
                        case KindSetAccessor$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformSetAccessorDeclaration(tx, Node__from_ast.AsSetAccessorDeclaration(input));
                            break;
                        }
                        case KindPropertyDeclaration$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformPropertyDeclaration(tx, Node__from_ast.AsPropertyDeclaration(input));
                            break;
                        }
                        case KindPropertySignature$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformPropertySignatureDeclaration(tx, Node__from_ast.AsPropertySignatureDeclaration(input));
                            break;
                        }
                        case KindCallSignature$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformCallSignatureDeclaration(tx, Node__from_ast.AsCallSignatureDeclaration(input));
                            break;
                        }
                        case KindIndexSignature$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformIndexSignatureDeclaration(tx, Node__from_ast.AsIndexSignatureDeclaration(input));
                            break;
                        }
                        case KindVariableDeclaration$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformVariableDeclaration(tx, Node__from_ast.AsVariableDeclaration(input));
                            break;
                        }
                        case KindTypeParameter$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformTypeParameterDeclaration(tx, Node__from_ast.AsTypeParameterDeclaration(input));
                            break;
                        }
                        case KindExpressionWithTypeArguments$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformExpressionWithTypeArguments(tx, Node__from_ast.AsExpressionWithTypeArguments(input));
                            break;
                        }
                        case KindTypeReference$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformTypeReference(tx, Node__from_ast.AsTypeReferenceNode(input));
                            break;
                        }
                        case KindConditionalType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformConditionalTypeNode(tx, Node__from_ast.AsConditionalTypeNode(input));
                            break;
                        }
                        case KindFunctionType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformFunctionTypeNode(tx, Node__from_ast.AsFunctionTypeNode(input));
                            break;
                        }
                        case KindConstructorType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformConstructorTypeNode(tx, Node__from_ast.AsConstructorTypeNode(input));
                            break;
                        }
                        case KindImportType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformImportTypeNode(tx, Node__from_ast.AsImportTypeNode(input));
                            break;
                        }
                        case KindTypeQuery$constant__from_ast(): {
                            DeclarationTransformer.$go$private$declarations$checkEntityNameVisibility(tx, (Node__from_ast.AsTypeQueryNode(input) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration);
                            const __gotots_store_33 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_33.Transformer), input);
                            break;
                        }
                        case KindTupleType$constant__from_ast(): {
                            const __gotots_store_34 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_34.Transformer), input);
                            if (!(result === undefined)) {
                                const __gotots_store_35 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_argument_25 = Transformer__from_transformers.EmitContext(__gotots_store_35.Transformer);
                                const __gotots_argument_26 = input;
                                if (IsOriginalNodeSingleLine__from_transformers(__gotots_argument_25, __gotots_argument_26)) {
                                    const __gotots_store_36 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(__gotots_store_36.Transformer), result, EFSingleLine$constant__from_printer());
                                }
                            }
                            break;
                        }
                        case KindJSDocTypeExpression$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocTypeExpression(tx, Node__from_ast.AsJSDocTypeExpression(input));
                            break;
                        }
                        case KindJSDocTypeLiteral$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocTypeLiteral(tx, Node__from_ast.AsJSDocTypeLiteral(input));
                            break;
                        }
                        case KindJSDocPropertyTag$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocPropertyTag(tx, Node__from_ast.AsJSDocParameterOrPropertyTag(input));
                            break;
                        }
                        case KindJSDocAllType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocAllType(tx, Node__from_ast.AsJSDocAllType(input));
                            break;
                        }
                        case KindJSDocNullableType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocNullableType(tx, Node__from_ast.AsJSDocNullableType(input));
                            break;
                        }
                        case KindJSDocNonNullableType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocNonNullableType(tx, Node__from_ast.AsJSDocNonNullableType(input));
                            break;
                        }
                        case KindJSDocOptionalType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocOptionalType(tx, Node__from_ast.AsJSDocOptionalType(input));
                            break;
                        }
                        case KindJSDocVariadicType$constant__from_ast(): {
                            result = DeclarationTransformer.$go$private$declarations$transformJSDocVariadicType(tx, Node__from_ast.AsJSDocVariadicType(input));
                            break;
                        }
                        default: {
                            const __gotots_store_37 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            result = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_37.Transformer), input);
                            break;
                        }
                    }
                    if (!(result === undefined) && canProdiceDiagnostic && HasDynamicName__from_ast(input)) {
                        DeclarationTransformer.$go$private$declarations$checkName(tx, input);
                    }
                    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = previousEnclosingDeclaration;
                    __gotots_return_0 = result;
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$declarations$visitExpressionStatement(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    {
                        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(node);
                        if (!(expression === undefined)) {
                            const __gotots_results_0 = DeclarationTransformer.$go$private$declarations$setupDiagnosticContext(tx, expression);
                            let cleanupDiagnosticContext: (() => void) | undefined = __gotots_results_0[1];
                            const __gotots_callee_0: (() => void) | undefined = cleanupDiagnosticContext;
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                            switch (GetAssignmentDeclarationKind__from_ast(expression).$value) {
                                case 1: {
                                    if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(((Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
                                        __gotots_return_0 = DeclarationTransformer.$go$private$declarations$transformExportAssignment(tx, node, expression, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, true);
                                        break __gotots_return_block_0;
                                    }
                                    break;
                                }
                                case 2: {
                                    if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(((Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
                                        __gotots_return_0 = DeclarationTransformer.$go$private$declarations$transformCommonJSExport(tx, expression, DeclarationTransformer.$go$private$declarations$getNameExpressionPreferringIdentifier(tx, GetElementOrPropertyAccessName__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)));
                                        break __gotots_return_block_0;
                                    }
                                    break;
                                }
                                case 4: {
                                    __gotots_return_0 = void 0;
                                    break __gotots_return_block_0;
                                    break;
                                }
                                case 6: {
                                    if (IsSourceFile__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(((Node__from_ast.AsSourceFile(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommonJSModuleIndicator === undefined)) {
                                        __gotots_return_0 = DeclarationTransformer.$go$private$declarations$transformCommonJSExport(tx, expression, DeclarationTransformer.$go$private$declarations$getNameExpressionPreferringIdentifier(tx, Node__from_ast.Arguments(expression).get(1)));
                                        break __gotots_return_block_0;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
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
    static $go$private$declarations$visitNestedExpression(tx: DeclarationTransformer | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(expression === undefined)) {
            switch (GetAssignmentDeclarationKind__from_ast(expression).$value) {
                case 4: {
                    DeclarationTransformer.$go$private$declarations$transformExpandoAssignment(tx, Node__from_ast.AsBinaryExpression(expression));
                    break;
                }
            }
            return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionVisitor, expression);
        }
        return void 0;
    }
    static $go$private$declarations$visitSourceFile(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_25 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsDeclare = true;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).needsScopeFixMarker = false;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasScopeMarker = false;
        const __gotots_store_26 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.getSymbolAccessibilityDiagnostic = throwDiagnostic;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resultHasExternalModuleIndicator = false;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).suppressNewDiagnosticContexts = false;
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lateMarkedStatements = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, null, void 0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lateStatementReplacementMap = $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node.make(0, []);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoHosts = $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node.make(0, []);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expandoMembers = $goMap$MapOf_Named_ast$NodeId_To_SliceOf_PointerTo_Named_ast$Node.make(0, []);
        const __gotots_slice_build_0 = goSliceAllocate<ReferencedFilePair$Storage>(0, null);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, ReferencedFilePair.$zeroStorage());
        }
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawReferencedFiles = __gotots_slice_build_0;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawTypeReferenceDirectives = RuntimeSlice.make<{
            value: FileReference__from_ast;
        } | undefined>(0, null, void 0);
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rawLibReferenceDirectives = RuntimeSlice.make<{
            value: FileReference__from_ast;
        } | undefined>(0, null, void 0);
        const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Clear$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "witnessedCjsExports"));
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile = node;
        DeclarationTransformer.$go$private$declarations$collectFileReferences(tx, node);
        const __gotots_receiver_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
        const __gotots_argument_17 = node;
        goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_17).PrecalculateDeclarationEmitVisibility(__gotots_argument_17);
        let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = DeclarationTransformer.$go$private$declarations$transformSourceFile(tx, node);
        ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentSourceFile = void 0;
        return updated;
    }
    static $go$private$declarations$visitThisPropertyAssignments(tx: DeclarationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let thisTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let isStatic = false;
        let thisContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetThisContainer__from_ast(node, false, false);
        thisTarget = Node__from_ast.$storageOf(((thisContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (thisTarget === undefined) {
            return void 0;
        }
        if (HasStaticModifier__from_ast(thisContainer) || IsClassStaticBlockDeclaration__from_ast(thisContainer)) {
            isStatic = true;
        }
        if (!tsonicTypeScriptRuntime.sameLocation(thisTarget, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingDeclaration)) {
            return void 0;
        }
        caseBlock: switch (GetAssignmentDeclarationKind__from_ast(node).$value) {
            case 3: {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
                const __gotots_receiver_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                const __gotots_argument_14 = node;
                let base: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_14).GetReferencedMemberValueDeclaration(__gotots_argument_14);
                let __gotots_logical_result_2 = base === undefined;
                if (!__gotots_logical_result_2) {
                    const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    __gotots_logical_result_2 = Set__from_collections.Has<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "seenProperties"), base);
                }
                if (__gotots_logical_result_2) {
                    break;
                }
                const __gotots_store_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                Set$Add$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "seenProperties"), base);
                if (!(((Node__from_ast.ClassLikeData(thisTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast>).value.HeritageClauses === undefined) && NodeList__from_ast.$storageOf(((((Node__from_ast.ClassLikeData(thisTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast>).value.HeritageClauses ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0 && !isClassExtendingNull(thisTarget)) {
                    SymbolTrackerImpl.ReportInferenceFallback((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tracker, thisTarget);
                    const __gotots_receiver_15 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).resolver;
                    const __gotots_argument_15 = node;
                    let decls = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_15).GetBaseDeclarationsForPropertyDeclaration(__gotots_argument_15);
                    if (decls.length > 0) {
                        break caseBlock;
                    }
                }
                let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                if (isStatic) {
                    const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_17 = (Transformer__from_transformers.Factory(__gotots_store_16.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory");
                    const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_19 = (Transformer__from_transformers.Factory(__gotots_store_18.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_slice_element_0 = NodeFactory__from_ast.NewModifier(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), KindStaticKeyword$constant__from_ast());
                    const __gotots_argument_16 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
                    mods = NodeFactory__from_ast.NewModifierList(__gotots_receiver_16, __gotots_argument_16);
                }
                if (HasDynamicName__from_ast(node)) {
                    if (!IsSimpleInlineableExpression__from_transformers(name)) {
                        break;
                    }
                    DeclarationTransformer.$go$private$declarations$checkName(tx, node);
                    const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_store_21 = (Transformer__from_transformers.Factory(__gotots_store_20.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    name = NodeFactory__from_ast.NewComputedPropertyName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory"), name);
                }
                if (GetTextOfPropertyName__from_ast(name) === "constructor") {
                    break;
                }
                if (IsIdentifier__from_ast(name) && !IsIdentifierText__from_scanner(Node__from_ast.Text(name), LanguageVariantStandard$constant__from_core())) {
                    const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    name = NodeFactory__from_printer.NewStringLiteralFromNode(Transformer__from_transformers.Factory(__gotots_store_22.Transformer), name);
                }
                const __gotots_store_23 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_24 = (Transformer__from_transformers.Factory(__gotots_store_23.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                let prop: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "NodeFactory"), mods, name, void 0, DeclarationTransformer.$go$private$declarations$ensureType(tx, node, false), void 0);
                if (IsExpressionStatement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    DeclarationTransformer.$go$private$declarations$preserveJsDoc(tx, prop, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                }
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyAssignmentsCollected = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyAssignmentsCollected.append(void 0, [prop]);
                break;
            }
        }
        return NodeVisitor__from_ast.VisitEachChild((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyVisitor, node);
    }
    static $go$private$declarations$walkBindingPattern(tx: DeclarationTransformer | undefined, pattern: {
        value: BindingPattern__from_ast;
    } | undefined, param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let elems = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_21 = NodeList__from_ast.$storageOf((((pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_21.length; __gotots_range_index_16++) {
            const __gotots_range_value_22 = __gotots_range_21.get(__gotots_range_index_16);
            let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_22;
            if (IsOmittedExpression__from_ast(elem)) {
                continue;
            }
            if (IsBindingPattern__from_ast(Node__from_ast.Name(elem))) {
                elems = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(elems, DeclarationTransformer.$go$private$declarations$walkBindingPattern(tx, Node__from_ast.AsBindingPattern(Node__from_ast.Name(elem)), param), void 0);
                continue;
            }
            const __gotots_argument_607 = elems;
            const __gotots_store_616 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_617 = (Transformer__from_transformers.Factory(__gotots_store_616.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_608 = NodeFactory__from_ast.NewPropertyDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_617, "NodeFactory"), DeclarationTransformer.$go$private$declarations$ensureModifiers(tx, param), Node__from_ast.Name(elem), void 0, DeclarationTransformer.$go$private$declarations$ensureType(tx, elem, false), void 0);
            elems = __gotots_argument_607.append(void 0, [__gotots_argument_608]);
        }
        return elems;
    }
}
export function NewDeclarationTransformer(host: DeclarationEmitHost | undefined, context: {
    value: EmitContext__from_printer;
} | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, declarationFilePath: gostring, declarationMapPath: gostring): DeclarationTransformer | undefined {
    const __gotots_receiver_0 = host;
    let resolver: EmitResolver__from_printer | undefined = goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_0).GetEmitResolver();
    let state: {
        value: SymbolTrackerSharedState;
    } | undefined = { value: new SymbolTrackerSharedState(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), void 0, void 0, Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedDeclarations), Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StripInternal), void 0, resolver, void 0) };
    let tracker: {
        value: SymbolTrackerImpl;
    } | undefined = NewSymbolTracker(host, resolver, state);
    let tx: DeclarationTransformer | undefined = new DeclarationTransformer(Transformer__from_transformers.$zero(), host, compilerOptions, tracker, state, resolver, declarationFilePath, declarationMapPath, false, false, false, void 0, false, false, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    }), $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_Named_ast$NodeId_To_SliceOf_PointerTo_Named_ast$Node.nil(), Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    }), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<ReferencedFilePair$Storage>(), RuntimeSlice.nil<{
        value: FileReference__from_ast;
    } | undefined>(), RuntimeSlice.nil<{
        value: FileReference__from_ast;
    } | undefined>(), void 0, void 0, void 0, void 0);
    ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportExpandoFunctionErrors = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void => {
        if (!((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isolatedDeclarations) {
            return;
        }
        const __gotots_receiver_1 = resolver;
        const __gotots_argument_0 = node;
        let props = goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_1).GetPropertiesOfContainerFunction(__gotots_argument_0);
        const __gotots_range_0 = props;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_0;
            if (IsExpandoPropertyDeclaration__from_ast(Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                let errorTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
                if (IsBinaryExpression__from_ast(errorTarget)) {
                    errorTarget = BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(errorTarget) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left;
                }
                SymbolTrackerSharedState.$go$private$declarations$addDiagnostic((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).state, createDiagnosticForNode(errorTarget, $state__diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function, RuntimeSlice.nil<GoInterface | undefined>()));
            }
        }
    };
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_3 = __gotots_store_0.Transformer;
    const __gotots_receiver_2 = tx;
    const __gotots_argument_1 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return DeclarationTransformer.$go$private$declarations$visit(__gotots_receiver_2, $argument0);
    };
    const __gotots_argument_2 = context;
    Transformer__from_transformers.NewTransformer(__gotots_receiver_3, __gotots_argument_1, __gotots_argument_2);
    const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_5 = Transformer__from_transformers.EmitContext(__gotots_store_1.Transformer);
    const __gotots_receiver_4 = tx;
    const __gotots_argument_3 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return DeclarationTransformer.$go$private$declarations$visitBindingName(__gotots_receiver_4, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).bindingNameVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_5, __gotots_argument_3);
    const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_7 = Transformer__from_transformers.EmitContext(__gotots_store_2.Transformer);
    const __gotots_receiver_6 = tx;
    const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return DeclarationTransformer.$go$private$declarations$visitNestedExpression(__gotots_receiver_6, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).expressionVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_7, __gotots_argument_4);
    const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_9 = Transformer__from_transformers.EmitContext(__gotots_store_3.Transformer);
    const __gotots_receiver_8 = tx;
    const __gotots_argument_5 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return DeclarationTransformer.$go$private$declarations$stripExportModifiers(__gotots_receiver_8, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).exportStrippingVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_9, __gotots_argument_5);
    const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_11 = Transformer__from_transformers.EmitContext(__gotots_store_4.Transformer);
    const __gotots_receiver_10 = tx;
    const __gotots_argument_6 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return DeclarationTransformer.$go$private$declarations$visitThisPropertyAssignments(__gotots_receiver_10, $argument0);
    };
    (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).thisPropertyVisitor = EmitContext__from_printer.NewNodeVisitor(__gotots_receiver_11, __gotots_argument_6);
    return tx;
}
export function hasInternalAnnotation(commentRange: CommentRange__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let comment = goStringSlice(SourceFile__from_ast.Text(sourceFile), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).Pos(), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).End());
    return strings__from_gostdlib.Contains(comment, "@internal");
}
export function declarationEmitNodeBuilderFlags$constant(): Flags__from_nodebuilder {
    return 531469;
}
export function declarationEmitInternalNodeBuilderFlags$constant(): InternalFlags__from_nodebuilder {
    return 8;
}
export function throwDiagnostic(result: SymbolAccessibilityResult__from_printer): SymbolAccessibilityDiagnostic | undefined {
    const __gotots_argument_91 = new $goInterfaceAdapter$string("Diagnostic emitted without context");
    GoPanic.raise(__gotots_argument_91 === undefined ? GoPanicNilValue.create() : __gotots_argument_91);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function createEmptyExports(factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return NodeFactory__from_ast.NewExportDeclaration(factory, void 0, false, NodeFactory__from_ast.NewNamedExports(factory, NodeFactory__from_ast.NewNodeList(factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([]))), void 0, void 0);
}
export function isCommonJSAliasExport(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsBinaryExpression__from_ast(node) && IsIdentifier__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right)) {
        {
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(node);
            if (!(__go_symbol === undefined) && Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 1) {
                return true;
            }
        }
    }
    return false;
}
export function isClassExtendingNull(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    let heritage: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = ((Node__from_ast.ClassLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast>).value.HeritageClauses;
    if (heritage === undefined) {
        return false;
    }
    if (NodeList__from_ast.$storageOf(((heritage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 1 || NodeList__from_ast.$storageOf(((heritage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return false;
    }
    const __gotots_range_2 = NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(NodeList__from_ast.$storageOf(((heritage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let expA: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
        let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ExpressionWithTypeArguments__from_ast.$storageOf(((Node__from_ast.AsExpressionWithTypeArguments(expA) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression;
        if (!(expr === undefined) && Node__from_ast.$storageOf(((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNullKeyword$constant__from_ast()) {
            return true;
        }
    }
    return false;
}
export function extractExpandoHostParams(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): [
    tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined,
    tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined,
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
] {
    let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
    let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
    let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindFunctionExpression$constant__from_ast(): {
            let fn: {
                value: FunctionExpression__from_ast;
            } | undefined = Node__from_ast.AsFunctionExpression(node);
            return [(void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken];
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            let fn: {
                value: ArrowFunction__from_ast;
            } | undefined = Node__from_ast.AsArrowFunction(node);
            return [(void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken];
            break;
        }
        default: {
            let fn: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
            return [(void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).TypeParameters, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters, (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                    (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                        FunctionDeclaration__from_ast.$storageOf(((fn ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken];
            break;
        }
    }
}
