import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { BindingElement as BindingElement__from_ast, FindAncestorResult as FindAncestorResult__from_ast, JSDocTemplateTag as JSDocTemplateTag__from_ast, Kind as Kind__from_ast, ModifierFlags as ModifierFlags__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, QualifiedName as QualifiedName__from_ast, SymbolId as SymbolId__from_ast, TypeQueryNode as TypeQueryNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ScriptTarget as ScriptTarget__from_core, TextChange$Storage as TextChange__from_core$Storage, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { FixAndExport as FixAndExport__from_autoimport } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/autoimport/package.js";
import type { QuotePreference as QuotePreference__from_lsutil, ScriptElementKind as ScriptElementKind__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { CompletionItemApplyKinds as CompletionItemApplyKinds__from_lsproto, CompletionItemDefaults as CompletionItemDefaults__from_lsproto, CompletionItemKind as CompletionItemKind__from_lsproto, CompletionItemLabelDetails as CompletionItemLabelDetails__from_lsproto, InsertTextFormat as InsertTextFormat__from_lsproto, MarkupKind as MarkupKind__from_lsproto, Range as Range__from_lsproto, ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { argumentListInfo, callInvocation, invocation } from "./signaturehelp.js";
import type { PossibleTypeArgumentInfo } from "./utilities.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { BinaryExpression as BinaryExpression__from_ast, FindAncestorFalse$constant as FindAncestorFalse$constant__from_ast, FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestorTrue$constant as FindAncestorTrue$constant__from_ast, FindAncestor as FindAncestor__from_ast, GetClassLikeDeclarationOfSymbol as GetClassLikeDeclarationOfSymbol__from_ast, GetContainingClass as GetContainingClass__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetPropertyNameForPropertyNameNode as GetPropertyNameForPropertyNameNode__from_ast, GetReparsedNodeForNode as GetReparsedNodeForNode__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, GetSymbolId as GetSymbolId__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IndexedAccessTypeNode as IndexedAccessTypeNode__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsBigIntLiteral as IsBigIntLiteral__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCaseClause as IsCaseClause__from_ast, IsCheckJSEnabledForFile as IsCheckJSEnabledForFile__from_ast, IsClassLike as IsClassLike__from_ast, IsClassMemberModifier as IsClassMemberModifier__from_ast, IsClassOrTypeElement as IsClassOrTypeElement__from_ast, IsConditionalExpression as IsConditionalExpression__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsContextualKeyword as IsContextualKeyword__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpression as IsExpression__from_ast, IsExternalModuleReference as IsExternalModuleReference__from_ast, IsFunctionBlock as IsFunctionBlock__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsFunctionLikeKind as IsFunctionLikeKind__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsImportSpecifier as IsImportSpecifier__from_ast, IsInJSFile as IsInJSFile__from_ast, IsIndexSignatureDeclaration as IsIndexSignatureDeclaration__from_ast, IsInferTypeNode as IsInferTypeNode__from_ast, IsInitializedProperty as IsInitializedProperty__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJSDocAugmentsTag as IsJSDocAugmentsTag__from_ast, IsJSDocImplementsTag as IsJSDocImplementsTag__from_ast, IsJSDocParameterTag as IsJSDocParameterTag__from_ast, IsJSDocTag as IsJSDocTag__from_ast, IsJSDocTemplateTag as IsJSDocTemplateTag__from_ast, IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxClosingElement as IsJsxClosingElement__from_ast, IsJsxElement as IsJsxElement__from_ast, IsJsxExpression as IsJsxExpression__from_ast, IsJsxFragment as IsJsxFragment__from_ast, IsJsxOpeningLikeElement as IsJsxOpeningLikeElement__from_ast, IsJsxSpreadAttribute as IsJsxSpreadAttribute__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsMemberName as IsMemberName__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsNamedExports as IsNamedExports__from_ast, IsNamedImports as IsNamedImports__from_ast, IsObjectBindingPattern as IsObjectBindingPattern__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsObjectTypeDeclaration as IsObjectTypeDeclaration__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsParameterPropertyModifier as IsParameterPropertyModifier__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsPrivateIdentifierClassElementDeclaration as IsPrivateIdentifierClassElementDeclaration__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsRegularExpressionLiteral as IsRegularExpressionLiteral__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, IsSpreadAssignment as IsSpreadAssignment__from_ast, IsStatement as IsStatement__from_ast, IsStatic as IsStatic__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringTextContainingNode as IsStringTextContainingNode__from_ast, IsTypeKeywordToken as IsTypeKeywordToken__from_ast, IsTypeLiteralNode as IsTypeLiteralNode__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeOfExpression as IsTypeOfExpression__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsUnterminatedLiteral as IsUnterminatedLiteral__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, JSDocParameterOrPropertyTag as JSDocParameterOrPropertyTag__from_ast, JSDocTagBase as JSDocTagBase__from_ast, JSDoc as JSDoc__from_ast, KindAbstractKeyword$constant as KindAbstractKeyword$constant__from_ast, KindAccessorKeyword$constant as KindAccessorKeyword$constant__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAsKeyword$constant as KindAsKeyword$constant__from_ast, KindAssertKeyword$constant as KindAssertKeyword$constant__from_ast, KindAssertsKeyword$constant as KindAssertsKeyword$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindAwaitKeyword$constant as KindAwaitKeyword$constant__from_ast, KindBigIntKeyword$constant as KindBigIntKeyword$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCaseKeyword$constant as KindCaseKeyword$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassKeyword$constant as KindClassKeyword$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstKeyword$constant as KindConstKeyword$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindDeclareKeyword$constant as KindDeclareKeyword$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindDotToken$constant as KindDotToken$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumKeyword$constant as KindEnumKeyword$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsEqualsToken$constant as KindEqualsEqualsToken$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindExclamationEqualsToken$constant as KindExclamationEqualsToken$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindFunctionKeyword$constant as KindFunctionKeyword$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGetKeyword$constant as KindGetKeyword$constant__from_ast, KindGlobalKeyword$constant as KindGlobalKeyword$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportKeyword$constant as KindImportKeyword$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInferKeyword$constant as KindInferKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindInterfaceKeyword$constant as KindInterfaceKeyword$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindIsKeyword$constant as KindIsKeyword$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocReturnTag$constant as KindJSDocReturnTag$constant__from_ast, KindJSDocSatisfiesTag$constant as KindJSDocSatisfiesTag$constant__from_ast, KindJSDocTemplateTag$constant as KindJSDocTemplateTag$constant__from_ast, KindJSDocThrowsTag$constant as KindJSDocThrowsTag$constant__from_ast, KindJSDocTypeExpression$constant as KindJSDocTypeExpression$constant__from_ast, KindJSDocTypeTag$constant as KindJSDocTypeTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindLessThanSlashToken$constant as KindLessThanSlashToken$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindLetKeyword$constant as KindLetKeyword$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindModuleKeyword$constant as KindModuleKeyword$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNewKeyword$constant as KindNewKeyword$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindOverrideKeyword$constant as KindOverrideKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPrivateKeyword$constant as KindPrivateKeyword$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindProtectedKeyword$constant as KindProtectedKeyword$constant__from_ast, KindPublicKeyword$constant as KindPublicKeyword$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSatisfiesKeyword$constant as KindSatisfiesKeyword$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSetKeyword$constant as KindSetKeyword$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfKeyword$constant as KindTypeOfKeyword$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindUsingKeyword$constant as KindUsingKeyword$constant__from_ast, KindVarKeyword$constant as KindVarKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, Kind_String as Kind_String__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, LiteralTypeNode as LiteralTypeNode__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierFlagsNonPublicAccessibilityModifier$constant as ModifierFlagsNonPublicAccessibilityModifier$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, NewNodeFactory as NewNodeFactory__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactoryHooks as NodeFactoryHooks__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, NumericLiteral as NumericLiteral__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedTypeNode as ParenthesizedTypeNode__from_ast, SetParentInChildren as SetParentInChildren__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolFlagsAll$constant as SymbolFlagsAll$constant__from_ast, SymbolFlagsClass$constant as SymbolFlagsClass$constant__from_ast, SymbolFlagsExportValue$constant as SymbolFlagsExportValue$constant__from_ast, SymbolFlagsModule$constant as SymbolFlagsModule$constant__from_ast, SymbolFlagsNamespace$constant as SymbolFlagsNamespace$constant__from_ast, SymbolFlagsType$constant as SymbolFlagsType$constant__from_ast, SymbolFlagsValue$constant as SymbolFlagsValue$constant__from_ast, SymbolName as SymbolName__from_ast, Symbol as Symbol__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TryGetImportFromModuleSpecifier as TryGetImportFromModuleSpecifier__from_ast, TryGetTextOfPropertyName as TryGetTextOfPropertyName__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, FindPrecedingToken as FindPrecedingToken__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav, GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ContextFlagsIgnoreNodeInferences$constant as ContextFlagsIgnoreNodeInferences$constant__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, GetDeclarationModifierFlagsFromSymbol as GetDeclarationModifierFlagsFromSymbol__from_checker, IsExternalModuleSymbol as IsExternalModuleSymbol__from_checker, IsKnownSymbol as IsKnownSymbol__from_checker, SkipAlias as SkipAlias__from_checker, StructuredType as StructuredType__from_checker, TypeFlagsAnyOrUnknown$constant as TypeFlagsAnyOrUnknown$constant__from_checker, TypeFlagsPrimitive$constant as TypeFlagsPrimitive$constant__from_checker, TypeFlagsStructuredType$constant as TypeFlagsStructuredType$constant__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ApplyBulkEdits as ApplyBulkEdits__from_core, CheckEachDefined as CheckEachDefined__from_core, CompareTextRanges as CompareTextRanges__from_core, LanguageVariantJSX$constant as LanguageVariantJSX$constant__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewLineKind_GetNewLineCharacter as NewLineKind_GetNewLineCharacter__from_core, NewTextRange as NewTextRange__from_core, StringifyJson as StringifyJson__from_core, TSTrue$constant as TSTrue$constant__from_core, TextChange as TextChange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FormatNodeGivenIndentation as FormatNodeGivenIndentation__from_format } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/format/package.js";
import { PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { GetLastToken as GetLastToken__from_lsutil, GetQuotePreference as GetQuotePreference__from_lsutil, IsNonContextualKeyword as IsNonContextualKeyword__from_lsutil, QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { CompletionItemData as CompletionItemData__from_lsproto, CompletionItemKindClass$constant as CompletionItemKindClass$constant__from_lsproto, CompletionItemKindConstant$constant as CompletionItemKindConstant$constant__from_lsproto, CompletionItemKindEnum$constant as CompletionItemKindEnum$constant__from_lsproto, CompletionItemKindEnumMember$constant as CompletionItemKindEnumMember$constant__from_lsproto, CompletionItemKindField$constant as CompletionItemKindField$constant__from_lsproto, CompletionItemKindFile$constant as CompletionItemKindFile$constant__from_lsproto, CompletionItemKindFolder$constant as CompletionItemKindFolder$constant__from_lsproto, CompletionItemKindFunction$constant as CompletionItemKindFunction$constant__from_lsproto, CompletionItemKindInterface$constant as CompletionItemKindInterface$constant__from_lsproto, CompletionItemKindKeyword$constant as CompletionItemKindKeyword$constant__from_lsproto, CompletionItemKindMethod$constant as CompletionItemKindMethod$constant__from_lsproto, CompletionItemKindModule$constant as CompletionItemKindModule$constant__from_lsproto, CompletionItemKindProperty$constant as CompletionItemKindProperty$constant__from_lsproto, CompletionItemKindText$constant as CompletionItemKindText$constant__from_lsproto, CompletionItemKindVariable$constant as CompletionItemKindVariable$constant__from_lsproto, CompletionItem as CompletionItem__from_lsproto, CompletionList as CompletionList__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto, InsertTextFormatSnippet$constant as InsertTextFormatSnippet$constant__from_lsproto, MarkupContent as MarkupContent__from_lsproto, PreferredMarkupKind as PreferredMarkupKind__from_lsproto, StringOrMarkupContent as StringOrMarkupContent__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { FlagsNone$constant as FlagsNone$constant__from_nodebuilder, FlagsUseSingleQuotesForStringLiteralType$constant as FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/nodebuilder/package.js";
import { ChangeTrackerWriter as ChangeTrackerWriter__from_printer, EFSingleLine$constant as EFSingleLine$constant__from_printer, EmitContext as EmitContext__from_printer, NewChangeTrackerWriter as NewChangeTrackerWriter__from_printer, NewEmitContext as NewEmitContext__from_printer, NewPrinter as NewPrinter__from_printer, PrintHandlers as PrintHandlers__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, GetTextOfNode as GetTextOfNode__from_scanner, IdentifierToKeywordKind as IdentifierToKeywordKind__from_scanner, IsIdentifierPart as IsIdentifierPart__from_scanner, IsIdentifierStart as IsIdentifierStart__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner, StringToToken as StringToToken__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Named_ast$SymbolId } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { SyncMap$Load$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Filter$PointerTo_Named_ast$Symbol, Filter$PointerTo_Named_checker$Type, Filter$PointerTo_Named_lsproto$CompletionItem } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FirstNonNil$PointerTo_Named_checker$Type$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstNonNil.js";
import { IfElse$Named_ast$Kind_to_bool, IfElse$Named_ast$TokenFlags, IfElse$Named_core$LanguageVariant, IfElse$Named_nodebuilder$Flags, IfElse$PointerTo_Named_ast$Node, IfElse$PointerTo_Named_ast$Symbol, IfElse$PointerTo_Named_lsproto$InsertTextFormat, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$CompletionItem } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { Some$PointerTo_Named_ast$Node, Some$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Clone$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { SortFunc$SliceOf_Named_core$TextChange$Named_core$TextChange } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$Named_ls$CompletionKind, $goInterfaceAdapter$Named_ls$KeywordCompletionFilters, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_ls$snippetEmitTextWriter, $goInterfaceAdapter$PointerTo_Named_ls$symbolOriginInfoComputedPropertyName, $goInterfaceAdapter$PointerTo_Named_ls$symbolOriginInfoObjectLiteralMethod, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_ast$SymbolId_To_Struct_void, $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_ast$Symbol as GoMap } from "../../../../../../support/maps.js";
import { getImmediatelyContainingArgumentInfo } from "./signaturehelp.js";
import { getContextualTypeFromParent, getPossibleGenericSignatures, getPossibleTypeArgumentsInfo, isInRightSideOfInternalImportEqualsDeclaration, isTypeKeyword, positionBelongsToNode, quote } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class CompletionItem {
    declare private readonly $goType: void;
    public constructor(public CompletionItem: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, public Symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) {
    }
    static $copy($source: CompletionItem): CompletionItem {
        return new CompletionItem($source.CompletionItem, $source.Symbol);
    }
    static $equal($left: CompletionItem, $right: CompletionItem): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.CompletionItem, $right.CompletionItem)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.Symbol, $right.Symbol);
    }
    static $hash($source: CompletionItem): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.CompletionItem));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.Symbol));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CompletionList {
    declare private readonly $goType: void;
    public constructor(public IsIncomplete: bool, public ItemDefaults: {
        value: CompletionItemDefaults__from_lsproto;
    } | undefined, public ApplyKind: tsonicTypeScriptRuntime.Location<CompletionItemApplyKinds__from_lsproto> | undefined, public Items: RuntimeSlice<{
        value: CompletionItem;
    } | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$toLSP(l: CompletionList | undefined): {
        value: CompletionList__from_lsproto;
    } | undefined {
        if (l === undefined) {
            return void 0;
        }
        let items = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>(0, (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Items.length, void 0);
        const __gotots_range_8 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Items;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_9 = __gotots_range_8.get(__gotots_range_index_8);
            let entry: {
                value: CompletionItem;
            } | undefined = __gotots_range_value_9;
            if (!(entry === undefined) && !((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem === undefined)) {
                items = items.append(void 0, [(entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompletionItem]);
            }
        }
        return { value: new CompletionList__from_lsproto((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).IsIncomplete, (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ItemDefaults, (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ApplyKind, items) };
    }
}
export function ensureItemData(fileName: gostring, pos: int, list: {
    value: CompletionList__from_lsproto;
} | undefined): {
    value: CompletionList__from_lsproto;
} | undefined {
    if (list === undefined) {
        return void 0;
    }
    const __gotots_range_7: CompletionList__from_lsproto["Items"] = (list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Items;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_7);
        let item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined = __gotots_range_value_8;
        if (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Data === undefined) {
            ((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Data =
                { value: new CompletionItemData__from_lsproto(fileName, pos | 0, "", ((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Label, void 0) };
        }
    }
    return list;
}
export class completionDataData {
    declare private readonly $goType: void;
    public constructor(public symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, public autoImports: RuntimeSlice<{
        value: FixAndExport__from_autoimport;
    } | undefined>, public completionKind: CompletionKind, public isInSnippetScope: bool, public propertyAccessToConvert: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public isNewIdentifierLocation: bool, public location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public keywordFilters: KeywordCompletionFilters, public literals: RuntimeSlice<literalValue | undefined>, public symbolToOriginInfoMap: GoMapValue<int, symbolOriginInfo | undefined>, public symbolToSortTextMap: GoMapValue<SymbolId__from_ast, SortText>, public recommendedCompletion: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public jsxInitializer: jsxInitializer, public insideJSDocTagTypeExpression: bool, public isTypeOnlyLocation: bool, public isJsxIdentifierExpected: bool, public isRightOfOpenTag: bool, public isRightOfDotOrQuestionDot: bool, public importStatementCompletion: tsonicTypeScriptRuntime.Location<importStatementCompletionInfo> | undefined, public hasUnresolvedAutoImports: bool, public defaultCommitCharacters: RuntimeSlice<gostring>) {
    }
    static $copy($source: completionDataData): completionDataData {
        return new completionDataData($source.symbols, $source.autoImports, $source.completionKind, $source.isInSnippetScope, $source.propertyAccessToConvert, $source.isNewIdentifierLocation, $source.location, $source.keywordFilters, $source.literals, $source.symbolToOriginInfoMap, $source.symbolToSortTextMap, $source.recommendedCompletion, $source.previousToken, $source.contextToken, jsxInitializer.$copy($source.jsxInitializer), $source.insideJSDocTagTypeExpression, $source.isTypeOnlyLocation, $source.isJsxIdentifierExpected, $source.isRightOfOpenTag, $source.isRightOfDotOrQuestionDot, $source.importStatementCompletion, $source.hasUnresolvedAutoImports, $source.defaultCommitCharacters);
    }
    declare private readonly then?: never;
}
export class completionDataKeyword {
    declare private readonly $goType: void;
    public constructor(public keywordCompletions: RuntimeSlice<{
        value: CompletionItem;
    } | undefined>, public isNewIdentifierLocation: bool) {
    }
    static $copy($source: completionDataKeyword): completionDataKeyword {
        return new completionDataKeyword($source.keywordCompletions, $source.isNewIdentifierLocation);
    }
    declare private readonly then?: never;
}
export class completionDataJSDocTagName {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: completionDataJSDocTagName): completionDataJSDocTagName {
        return new completionDataJSDocTagName();
    }
    static $equal($left: completionDataJSDocTagName, $right: completionDataJSDocTagName): bool {
        return true;
    }
    static $hash($source: completionDataJSDocTagName): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
}
export class completionDataJSDocTag {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $copy($source: completionDataJSDocTag): completionDataJSDocTag {
        return new completionDataJSDocTag();
    }
    static $equal($left: completionDataJSDocTag, $right: completionDataJSDocTag): bool {
        return true;
    }
    static $hash($source: completionDataJSDocTag): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
}
export class completionDataJSDocParameterName {
    declare private readonly $goType: void;
    public constructor(public tag: {
        value: JSDocParameterOrPropertyTag__from_ast;
    } | undefined) {
    }
    static $copy($source: completionDataJSDocParameterName): completionDataJSDocParameterName {
        return new completionDataJSDocParameterName($source.tag);
    }
    static $equal($left: completionDataJSDocParameterName, $right: completionDataJSDocParameterName): bool {
        return $left.tag
            ===
                $right.tag;
    }
    static $hash($source: completionDataJSDocParameterName): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.tag));
        return $hash;
    }
    declare private readonly then?: never;
}
export class importStatementCompletionInfo {
    declare private readonly $goType: void;
    public constructor(public isKeywordOnlyCompletion: bool, public keywordCompletion: Kind__from_ast, public isNewIdentifierLocation: bool, public isTopLevelTypeOnly: bool, public couldBeTypeOnlyImportSpecifier: bool, public replacementSpan: tsonicTypeScriptRuntime.Location<Range__from_lsproto> | undefined) {
    }
    static $copy($source: importStatementCompletionInfo): importStatementCompletionInfo {
        return new importStatementCompletionInfo($source.isKeywordOnlyCompletion, $source.keywordCompletion, $source.isNewIdentifierLocation, $source.isTopLevelTypeOnly, $source.couldBeTypeOnlyImportSpecifier, $source.replacementSpan);
    }
    static $equal($left: importStatementCompletionInfo, $right: importStatementCompletionInfo): bool {
        return $left.isKeywordOnlyCompletion === $right.isKeywordOnlyCompletion && $left.keywordCompletion === $right.keywordCompletion && $left.isNewIdentifierLocation === $right.isNewIdentifierLocation && $left.isTopLevelTypeOnly === $right.isTopLevelTypeOnly && $left.couldBeTypeOnlyImportSpecifier === $right.couldBeTypeOnlyImportSpecifier &&
            tsonicTypeScriptRuntime.sameLocation($left.replacementSpan, $right.replacementSpan);
    }
    static $hash($source: importStatementCompletionInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isKeywordOnlyCompletion));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.keywordCompletion));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isNewIdentifierLocation));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isTopLevelTypeOnly));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.couldBeTypeOnlyImportSpecifier));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.replacementSpan));
        return $hash;
    }
    declare private readonly then?: never;
}
export class jsxInitializer {
    declare private readonly $goType: void;
    public constructor(public isInitializer: bool, public initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $zero(): jsxInitializer {
        return new jsxInitializer(false, void 0);
    }
    static $copy($source: jsxInitializer): jsxInitializer {
        return new jsxInitializer($source.isInitializer, $source.initializer);
    }
    static $equal($left: jsxInitializer, $right: jsxInitializer): bool {
        return $left.isInitializer === $right.isInitializer &&
            tsonicTypeScriptRuntime.sameLocation($left.initializer, $right.initializer);
    }
    static $hash($source: jsxInitializer): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.isInitializer));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.initializer));
        return $hash;
    }
    declare private readonly then?: never;
}
export class KeywordCompletionFilters implements GoContainerStoredValue<int> {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare readonly [$goContainerStorageType]: int;
    declare private readonly then?: never;
}
export function KeywordCompletionFiltersNone$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(0);
}
export function KeywordCompletionFiltersAll$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(1);
}
export function KeywordCompletionFiltersClassElementKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(2);
}
export function KeywordCompletionFiltersInterfaceElementKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(3);
}
export function KeywordCompletionFiltersConstructorParameterKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(4);
}
export function KeywordCompletionFiltersFunctionLikeBodyKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(5);
}
export function KeywordCompletionFiltersTypeAssertionKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(6);
}
export function KeywordCompletionFiltersTypeKeywords$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(7);
}
export function KeywordCompletionFiltersTypeKeyword$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(8);
}
export function KeywordCompletionFiltersLast$constant(): KeywordCompletionFilters {
    return new KeywordCompletionFilters(8);
}
export function keywordFiltersFromSyntaxKind(keywordCompletion: Kind__from_ast): KeywordCompletionFilters {
    switch (keywordCompletion) {
        case KindTypeKeyword$constant__from_ast(): {
            return KeywordCompletionFiltersTypeKeyword$constant();
            break;
        }
        default: {
            const __gotots_argument_3 = new GoInterfaceAdapter("Unknown mapping from ast.Kind `" + Kind_String__from_ast(keywordCompletion) + "` to KeywordCompletionFilters");
            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
            break;
        }
    }
}
export class CompletionKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function CompletionKindNone$constant(): CompletionKind {
    return new CompletionKind(0);
}
export function CompletionKindObjectPropertyDeclaration$constant(): CompletionKind {
    return new CompletionKind(1);
}
export function CompletionKindGlobal$constant(): CompletionKind {
    return new CompletionKind(2);
}
export function CompletionKindPropertyAccess$constant(): CompletionKind {
    return new CompletionKind(3);
}
export function CompletionKindMemberLike$constant(): CompletionKind {
    return new CompletionKind(4);
}
export function CompletionKindString$constant(): CompletionKind {
    return new CompletionKind(5);
}
export class SortText {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function SortTextLocalDeclarationPriority$constant(): SortText {
    return new SortText("10");
}
export function SortTextLocationPriority$constant(): SortText {
    return new SortText("11");
}
export function SortTextOptionalMember$constant(): SortText {
    return new SortText("12");
}
export function SortTextMemberDeclaredBySpreadAssignment$constant(): SortText {
    return new SortText("13");
}
export function SortTextSuggestedClassMembers$constant(): SortText {
    return new SortText("14");
}
export function SortTextGlobalsOrKeywords$constant(): SortText {
    return new SortText("15");
}
export function SortTextAutoImportSuggestions$constant(): SortText {
    return new SortText("16");
}
export function DeprecateSortText(original: SortText): SortText {
    return new SortText("z" + original.$value);
}
export function sortBelow(original: SortText): SortText {
    return new SortText(original.$value + "1");
}
export class symbolOriginInfoKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function symbolOriginInfoKindThisType$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(1);
}
export function symbolOriginInfoKindSymbolMember$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(2);
}
export function symbolOriginInfoKindPromise$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(4);
}
export function symbolOriginInfoKindNullable$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(8);
}
export function symbolOriginInfoKindTypeOnlyAlias$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(16);
}
export function symbolOriginInfoKindObjectLiteralMethod$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(32);
}
export function symbolOriginInfoKindIgnore$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(64);
}
export function symbolOriginInfoKindComputedPropertyName$constant(): symbolOriginInfoKind {
    return new symbolOriginInfoKind(128);
}
export class symbolOriginInfo {
    declare private readonly $goType: void;
    public constructor(public kind: symbolOriginInfoKind, public isDefaultExport: bool, public isFromPackageJson: bool, public fileName: gostring, public data: $goInterface$Interface_void | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$ls$asObjectLiteralMethod(s: symbolOriginInfo | undefined): tsonicTypeScriptRuntime.Location<symbolOriginInfoObjectLiteralMethod> | undefined {
        return (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<symbolOriginInfoObjectLiteralMethod> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_ls$symbolOriginInfoObjectLiteralMethod.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data);
    }
    static $go$private$ls$symbolName(origin: symbolOriginInfo | undefined): gostring {
        const __gotots_type_switch_1: $goInterface$Interface_void | undefined = (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data;
        switch (true) {
            case $goInterfaceAdapter$PointerTo_Named_ls$symbolOriginInfoComputedPropertyName.$is(__gotots_type_switch_1): {
                return ((($value: $goInterface$Interface_void | undefined): {
                    value: symbolOriginInfoComputedPropertyName;
                } | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_ls$symbolOriginInfoComputedPropertyName.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolName;
                break;
            }
            default: {
                const __gotots_argument_17 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("symbolOriginInfo: unknown data type for symbolName(): %T", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([(origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).data])));
                GoPanic.raise(__gotots_argument_17 === undefined ? GoPanicNilValue.create() : __gotots_argument_17);
                break;
            }
        }
    }
}
export class symbolOriginInfoObjectLiteralMethod {
    declare private readonly $goType: void;
    public constructor(public insertText: gostring, public labelDetails: {
        value: CompletionItemLabelDetails__from_lsproto;
    } | undefined, public isSnippet: bool) {
    }
    declare private readonly then?: never;
}
export class symbolOriginInfoTypeOnlyAlias {
    declare private readonly $goType: void;
    public constructor(public declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: symbolOriginInfoTypeOnlyAlias): symbolOriginInfoTypeOnlyAlias {
        return new symbolOriginInfoTypeOnlyAlias($source.declaration);
    }
    static $equal($left: symbolOriginInfoTypeOnlyAlias, $right: symbolOriginInfoTypeOnlyAlias): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.declaration, $right.declaration);
    }
    static $hash($source: symbolOriginInfoTypeOnlyAlias): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.declaration));
        return $hash;
    }
    declare private readonly then?: never;
}
export class symbolOriginInfoComputedPropertyName {
    declare private readonly $goType: void;
    public constructor(public symbolName: gostring) {
    }
    static $copy($source: symbolOriginInfoComputedPropertyName): symbolOriginInfoComputedPropertyName {
        return new symbolOriginInfoComputedPropertyName($source.symbolName);
    }
    static $equal($left: symbolOriginInfoComputedPropertyName, $right: symbolOriginInfoComputedPropertyName): bool {
        return $left.symbolName === $right.symbolName;
    }
    static $hash($source: symbolOriginInfoComputedPropertyName): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.symbolName));
        return $hash;
    }
    declare private readonly then?: never;
}
export interface literalValue extends GoInterfaceValue {
}
export const literalValue$contract: readonly object[] = globalThis.Object.freeze([]);
export function literalValue$is(value: GoInterfaceValue | undefined): value is literalValue {
    return value !== undefined && value.$go$implements(literalValue$contract);
}
export class globalsSearch {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function globalsSearchContinue$constant(): globalsSearch {
    return new globalsSearch(0);
}
export function globalsSearchSuccess$constant(): globalsSearch {
    return new globalsSearch(1);
}
export function globalsSearchFail$constant(): globalsSearch {
    return new globalsSearch(2);
}
export function keywordCompletionData(keywordFilters: KeywordCompletionFilters, filterOutTSOnlyKeywords: bool, isNewIdentifierLocation: bool): {
    value: completionDataKeyword;
} | undefined {
    return { value: new completionDataKeyword(getKeywordCompletions(keywordFilters, filterOutTSOnlyKeywords), isNewIdentifierLocation) };
}
export function getDefaultCommitCharacters(isNewIdentifierLocation: bool): RuntimeSlice<gostring> {
    if (isNewIdentifierLocation) {
        return RuntimeSlice.literal<gostring>([]);
    }
    return Clone$SliceOf_string$string($state.allCommitCharacters);
}
export function completionNameForLiteral(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, literal: literalValue | undefined): gostring {
    const __gotots_type_switch_0: literalValue | undefined = literal;
    switch (true) {
        case GoInterfaceAdapter.$is(__gotots_type_switch_0): {
            let literal__shadow_1: gostring = __gotots_type_switch_0.$go$value;
            return quote(file, UserPreferences__from_lsutil.$copy(preferences), literal__shadow_1);
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
            let literal__shadow_1: Number__from_jsnum = __gotots_type_switch_0.$go$value;
            const __gotots_results_5 = StringifyJson__from_core(new $goInterfaceAdapter$Named_jsnum$Number(literal__shadow_1), "", "");
            let name = __gotots_results_5[0];
            return name;
            break;
        }
        case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_0): {
            let literal__shadow_1: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_0.$go$value);
            return literal__shadow_1.String() + "n";
            break;
        }
    }
    const __gotots_argument_15 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unhandled literal value: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([literal])));
    GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function createCompletionItemForLiteral(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, literal: literalValue | undefined): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined {
    return tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(completionNameForLiteral(file, UserPreferences__from_lsutil.$copy(preferences), literal), void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindConstant$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<RuntimeSlice<gostring>>(RuntimeSlice.literal<gostring>([])), void 0, void 0));
}
export function isRecommendedCompletionMatch(localSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, recommendedCompletion: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    return tsonicTypeScriptRuntime.sameLocation(localSymbol, recommendedCompletion)
        || !((Symbol__from_ast.$storageOf(((localSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsExportValue$constant__from_ast()) >>> 0 === 0) &&
            tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetExportSymbolOfSymbol(typeChecker, localSymbol), recommendedCompletion);
}
export function getWordLengthAndStart(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): [
    int,
    int32
] {
    let wordLength: int = 0;
    let wordStart: int32 = 0;
    let text = goStringSlice(SourceFile__from_ast.Text(sourceFile), 0, position__shadow_1);
    let totalSize = 0;
    let firstRune = 0;
    {
        const __gotots_results_11 = utf8__from_gostdlib.DecodeLastRuneInString(text);
        const __gotots_results_12 = [__gotots_results_11[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_11[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_12[0];
        let size = __gotots_results_12[1];
        let __gotots_for_first_0 = true;
        for (;;) {
            if (__gotots_for_first_0) {
                __gotots_for_first_0 = false;
            }
            else {
                const __gotots_results_13 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(text, 0, text.length - totalSize));
                const __gotots_results_14 = [__gotots_results_13[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_13[1]))] satisfies [
                    int32,
                    int
                ];
                r = __gotots_results_14[0];
                size = __gotots_results_14[1];
            }
            if (!(size !== 0)) {
                break;
            }
            {
                if (Set__from_collections.Has<int32>($state.wordSeparators, r) || unicode__from_gostdlib.IsSpace(r)) {
                    break;
                }
                totalSize += size;
                firstRune = r;
            }
        }
    }
    if (firstRune === 64) {
        totalSize = totalSize - 1;
        const __gotots_results_15 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, text.length - totalSize));
        const __gotots_results_16 = [__gotots_results_15[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_15[1]))] satisfies [
            int32,
            int
        ];
        firstRune = __gotots_results_16[0];
    }
    return [totalSize, firstRune];
}
export function trimElementAccess(text: gostring): gostring {
    text = strings__from_gostdlib.TrimPrefix(text, "[");
    text = strings__from_gostdlib.TrimSuffix(text, "]");
    if (strings__from_gostdlib.HasPrefix(text, "'") && strings__from_gostdlib.HasSuffix(text, "'")) {
        text = strings__from_gostdlib.TrimPrefix(strings__from_gostdlib.TrimSuffix(text, "'"), "'");
    }
    if (strings__from_gostdlib.HasPrefix(text, "\"") && strings__from_gostdlib.HasSuffix(text, "\"")) {
        text = strings__from_gostdlib.TrimPrefix(strings__from_gostdlib.TrimSuffix(text, "\""), "\"");
    }
    return text;
}
export function getFilterText(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, insertText: gostring, label: gostring, wordStart: int32, dotAccessor: gostring): gostring {
    {
        const __gotots_results_18 = strings__from_gostdlib.CutPrefix(label, "#");
        let after = __gotots_results_18[0];
        let ok = __gotots_results_18[1];
        if (ok) {
            if (insertText !== "") {
                {
                    const __gotots_results_20 = strings__from_gostdlib.CutPrefix(insertText, "this.#");
                    let after__shadow_1 = __gotots_results_20[0];
                    let ok__shadow_1 = __gotots_results_20[1];
                    if (ok__shadow_1) {
                        if (wordStart === 35) {
                            return "";
                        }
                        else {
                            return after__shadow_1;
                        }
                    }
                }
            }
            else {
                if (wordStart === 35) {
                    return "";
                }
                else {
                    return after;
                }
            }
        }
    }
    if (strings__from_gostdlib.HasPrefix(insertText, "this.")) {
        return "";
    }
    if (strings__from_gostdlib.HasPrefix(insertText, "[")) {
        return dotAccessor + trimElementAccess(insertText);
    }
    if (strings__from_gostdlib.HasPrefix(insertText, "?.")) {
        if (strings__from_gostdlib.HasPrefix(insertText, "?.[")) {
            return dotAccessor + trimElementAccess(goStringSlice(insertText, 2));
        }
        else {
            return dotAccessor + goStringSlice(insertText, 2);
        }
    }
    return insertText;
}
export function getDotAccessor(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): gostring {
    let text = goStringSlice(SourceFile__from_ast.Text(file), 0, position__shadow_1);
    let totalSize = 0;
    if (strings__from_gostdlib.HasSuffix(text, "?.")) {
        totalSize += 2;
        return goStringSlice(SourceFile__from_ast.Text(file), position__shadow_1 - totalSize, position__shadow_1);
    }
    if (strings__from_gostdlib.HasSuffix(text, ".")) {
        totalSize += 1;
        return goStringSlice(SourceFile__from_ast.Text(file), position__shadow_1 - totalSize, position__shadow_1);
    }
    return "";
}
export function strPtrTo(v: gostring): tsonicTypeScriptRuntime.Location<gostring> | undefined {
    const v$location = tsonicTypeScriptRuntime.boundLocation({}, () => v, v$next => v = v$next);
    if (v === "") {
        return void 0;
    }
    return v$location;
}
export function boolToPtr(v: bool): tsonicTypeScriptRuntime.Location<bool> | undefined {
    if (v) {
        return tsonicTypeScriptRuntime.location<bool>(true);
    }
    return void 0;
}
export function getLineOfPosition(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): int {
    let line = GetECMALineOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), pos);
    return line;
}
export function getLineEndOfPosition(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): int {
    let line = getLineOfPosition(file, pos);
    let lineStarts = GetECMALineStarts__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file));
    let lastCharPos = 0;
    if (line + 1 >= lineStarts.length) {
        const __gotots_store_8 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
        lastCharPos = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
    }
    else {
        lastCharPos = lineStarts.get(line + 1) - 1;
    }
    let fullText = SourceFile__from_ast.Text(file);
    if (lastCharPos > 0 && lastCharPos < fullText.length && goStringIndex(fullText, lastCharPos) === 10 && goStringIndex(fullText, lastCharPos - 1) === 13) {
        return lastCharPos - 1;
    }
    return lastCharPos;
}
export function isClassLikeMemberCompletion(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return false;
}
export function symbolAppearsToBeTypeOnly(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    let flags = Symbol__from_ast.CombinedLocalAndExportSymbolFlags(SkipAlias__from_checker(__go_symbol, typeChecker));
    return (flags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0 && (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0 || !IsInJSFile__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0)) || !((flags & SymbolFlagsType$constant__from_ast()) >>> 0 === 0));
}
export function shouldIncludeSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, data: {
    value: completionDataData;
} | undefined, closestSymbolDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    let allFlags = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags;
    let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.location;
    if (!(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsExportAssignment__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return true;
    }
    if (!(closestSymbolDeclaration === undefined) && IsVariableDeclaration__from_ast(closestSymbolDeclaration) &&
        tsonicTypeScriptRuntime.sameLocation(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration, closestSymbolDeclaration)) {
        return false;
    }
    let symbolDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined)) {
        symbolDeclaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
    }
    else if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0) {
        symbolDeclaration = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.get(0);
    }
    if (!(closestSymbolDeclaration === undefined) && !(symbolDeclaration === undefined)) {
        if (IsParameterDeclaration__from_ast(closestSymbolDeclaration) && IsParameterDeclaration__from_ast(symbolDeclaration)) {
            let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.ParameterList(Node__from_ast.$storageOf(((closestSymbolDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            if (Node__from_ast.Pos(symbolDeclaration) >= Node__from_ast.Pos(closestSymbolDeclaration) && Node__from_ast.Pos(symbolDeclaration) < NodeList__from_ast.End(parameters)) {
                return false;
            }
        }
        else if (IsTypeParameterDeclaration__from_ast(closestSymbolDeclaration) && IsTypeParameterDeclaration__from_ast(symbolDeclaration)) {
            if (tsonicTypeScriptRuntime.sameLocation(closestSymbolDeclaration, symbolDeclaration)
                && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextToken === undefined) && Node__from_ast.$storageOf((((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExtendsKeyword$constant__from_ast()) {
                return false;
            }
            if (isInTypeParameterDefault((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.contextToken) && !IsInferTypeNode__from_ast(Node__from_ast.$storageOf(((closestSymbolDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.TypeParameterList(Node__from_ast.$storageOf(((closestSymbolDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if (!(typeParameters === undefined) && Node__from_ast.Pos(symbolDeclaration) >= Node__from_ast.Pos(closestSymbolDeclaration) && Node__from_ast.Pos(symbolDeclaration) < NodeList__from_ast.End(typeParameters)) {
                    return false;
                }
            }
        }
    }
    let symbolOrigin: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SkipAlias__from_checker(__go_symbol, typeChecker);
    const __gotots_store_7 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
        NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    if (!(((Node__from_ast.AsSourceFile(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ExternalModuleIndicator === undefined) && !((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowUmdGlobalAccess === TSTrue$constant__from_core()) && !tsonicTypeScriptRuntime.sameLocation(__go_symbol, symbolOrigin) && (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.symbolToSortTextMap.lookup(GetSymbolId__from_ast(__go_symbol)).$value === SortTextGlobalsOrKeywords$constant().$value && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined) && IsExternalModuleSymbol__from_checker(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
        return false;
    }
    allFlags = (allFlags | Symbol__from_ast.CombinedLocalAndExportSymbolFlags(symbolOrigin)) >>> 0;
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        allFlags = (allFlags | Checker__from_checker.GetSymbolFlags(typeChecker, __go_symbol)) >>> 0;
    }
    if (isInRightSideOfInternalImportEqualsDeclaration((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.location)) {
        return !((allFlags & SymbolFlagsNamespace$constant__from_ast()) >>> 0 === 0);
    }
    if ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isTypeOnlyLocation) {
        return symbolCanBeReferencedAtTypeLocation(__go_symbol, typeChecker, Set__from_collections.$fromStorage<SymbolId__from_ast>({
            M: $goMap$MapOf_Named_ast$SymbolId_To_Struct_void.nil()
        }));
    }
    return !((allFlags & SymbolFlagsValue$constant__from_ast()) >>> 0 === 0);
}
export function getCompletionEntryDisplayNameForSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, origin: symbolOriginInfo | undefined, completionKind: CompletionKind, isJsxIdentifierExpected: bool): [
    gostring,
    bool
] {
    let displayName: gostring = "";
    let needsConvertPropertyAccess: bool = false;
    if (originIsIgnore(origin)) {
        return ["", false];
    }
    let name = "";
    if (originIncludesSymbolName(origin)) {
        name = symbolOriginInfo.$go$private$ls$symbolName(origin);
    }
    else {
        name = SymbolName__from_ast(__go_symbol);
    }
    if (name === "" || !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0) && startsWithQuote(name) || IsKnownSymbol__from_checker(__go_symbol)) {
        return ["", false];
    }
    let variant = IfElse$Named_core$LanguageVariant(isJsxIdentifierExpected, LanguageVariantJSX$constant__from_core(), LanguageVariantStandard$constant__from_core());
    if (IsIdentifierText__from_scanner(name, variant) || !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsPrivateIdentifierClassElementDeclaration__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
        return [name, false];
    }
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
        return [name, true];
    }
    switch (completionKind.$value) {
        case 4: {
            if (originIsComputedPropertyName(origin)) {
                return [symbolOriginInfo.$go$private$ls$symbolName(origin), false];
            }
            return ["", false];
            break;
        }
        case 1: {
            const __gotots_results_6 = StringifyJson__from_core(new GoInterfaceAdapter(name), "", "");
            let escapedName = __gotots_results_6[0];
            return [escapedName, false];
            break;
        }
        case 3:
        case 2: {
            const __gotots_results_7 = utf8__from_gostdlib.DecodeRuneInString(name);
            const __gotots_results_8 = [__gotots_results_7[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_7[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_8[0];
            if (ch === 32) {
                return ["", false];
            }
            return [name, true];
            break;
        }
        case 0:
        case 5: {
            return [name, false];
            break;
        }
        default: {
            const __gotots_argument_16 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unexpected completion kind: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ls$CompletionKind(completionKind)])));
            GoPanic.raise(__gotots_argument_16 === undefined ? GoPanicNilValue.create() : __gotots_argument_16);
            break;
        }
    }
}
export function originIsIgnore(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindIgnore$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIncludesSymbolName(origin: symbolOriginInfo | undefined): bool {
    return originIsComputedPropertyName(origin);
}
export function originIsComputedPropertyName(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindComputedPropertyName$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsObjectLiteralMethod(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindObjectLiteralMethod$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsThisTypeNode(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindThisType$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsTypeOnlyAlias(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindTypeOnlyAlias$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsSymbolMember(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindSymbolMember$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsNullableMember(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindNullable$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function originIsPromise(origin: symbolOriginInfo | undefined): bool {
    return !(origin === undefined) && !(((void symbolOriginInfoKind,
        (origin ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value & symbolOriginInfoKindPromise$constant().$value) as int)
        ===
            ((void symbolOriginInfoKind,
                0) as int));
}
export function getSourceFromOrigin(origin: symbolOriginInfo | undefined): gostring {
    if (originIsThisTypeNode(origin)) {
        return "ThisProperty/";
    }
    if (originIsTypeOnlyAlias(origin)) {
        return "TypeOnlyAlias/";
    }
    return "";
}
export function getRelevantTokens(position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
] {
    let contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    previousToken = FindPrecedingToken__from_astnav(file, position__shadow_1);
    if (!(previousToken === undefined) && position__shadow_1 <= Node__from_ast.End(previousToken) && (IsMemberName__from_ast(previousToken) || IsKeywordKind__from_ast(Node__from_ast.$storageOf(((previousToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind))) {
        let contextToken__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(file, Node__from_ast.Pos(previousToken));
        return [contextToken__shadow_1, previousToken];
    }
    return [previousToken, previousToken];
}
export function isValidTrigger(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, triggerCharacter: gostring, contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int): bool {
    switch (triggerCharacter) {
        case ".":
        case "@": {
            return true;
            break;
        }
        case "\"":
        case "'":
        case "`": {
            return !(contextToken === undefined) && isStringLiteralOrTemplate(contextToken) && position__shadow_1 === GetStartOfNode__from_astnav(contextToken, file, false) + 1;
            break;
        }
        case "#": {
            return !(contextToken === undefined) && IsPrivateIdentifier__from_ast(contextToken) && !(GetContainingClass__from_ast(contextToken) === undefined);
            break;
        }
        case "<": {
            return !(contextToken === undefined) && Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLessThanToken$constant__from_ast() && (!IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || binaryExpressionMayBeOpenTag(Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)));
            break;
        }
        case "/": {
            if (contextToken === undefined) {
                return false;
            }
            if (IsStringLiteralLike__from_ast(contextToken)) {
                return !(TryGetImportFromModuleSpecifier__from_ast(contextToken) === undefined);
            }
            return Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLessThanSlashToken$constant__from_ast() && IsJsxClosingElement__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case " ": {
            return !(contextToken === undefined) && Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast();
            break;
        }
        default: {
            const __gotots_argument_0 = new GoInterfaceAdapter("Unknown trigger character: " + triggerCharacter);
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
            break;
        }
    }
}
export function isStringLiteralOrTemplate(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindStringLiteral$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindTemplateExpression$constant__from_ast():
        case KindTaggedTemplateExpression$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function binaryExpressionMayBeOpenTag(binaryExpression: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): bool {
    return NodeIsMissing__from_ast(BinaryExpression__from_ast.$storageOf(((binaryExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
}
export function isCheckedFile(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    return !IsSourceFileJS__from_ast(file) || IsCheckJSEnabledForFile__from_ast(file, compilerOptions);
}
export function isContextTokenValueLocation(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(contextToken === undefined) && ((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOfKeyword$constant__from_ast() && (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeQuery$constant__from_ast() || IsTypeOfExpression__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) || (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAssertsKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypePredicate$constant__from_ast()));
}
export function isPossiblyTypeArgumentPosition(token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    let info: PossibleTypeArgumentInfo | undefined = getPossibleTypeArgumentsInfo(token, sourceFile);
    return !(info === undefined) && (IsPartOfTypeNode__from_ast((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).called) || getPossibleGenericSignatures((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).called, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nTypeArguments, typeChecker).length !== 0 || isPossiblyTypeArgumentPosition((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).called, sourceFile, typeChecker));
}
export function isContextTokenTypeLocation(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(contextToken === undefined)) {
        let parentKind = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindColonToken$constant__from_ast(): {
                return parentKind === KindPropertyDeclaration$constant__from_ast() || parentKind === KindPropertySignature$constant__from_ast() || parentKind === KindParameter$constant__from_ast() || parentKind === KindVariableDeclaration$constant__from_ast() || IsFunctionLikeKind__from_ast(parentKind);
                break;
            }
            case KindEqualsToken$constant__from_ast(): {
                return parentKind === KindTypeAliasDeclaration$constant__from_ast() || parentKind === KindTypeParameter$constant__from_ast();
                break;
            }
            case KindAsKeyword$constant__from_ast(): {
                return parentKind === KindAsExpression$constant__from_ast();
                break;
            }
            case KindLessThanToken$constant__from_ast(): {
                return parentKind === KindTypeReference$constant__from_ast() || parentKind === KindTypeAssertionExpression$constant__from_ast();
                break;
            }
            case KindExtendsKeyword$constant__from_ast(): {
                return parentKind === KindTypeParameter$constant__from_ast();
                break;
            }
            case KindSatisfiesKeyword$constant__from_ast(): {
                return parentKind === KindSatisfiesExpression$constant__from_ast();
                break;
            }
        }
    }
    return false;
}
export function symbolCanBeReferencedAtTypeLocation(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, seenModules: Set__from_collections<SymbolId__from_ast>): bool {
    return nonAliasCanBeReferencedAtTypeLocation(__go_symbol, typeChecker, Set__from_collections.$copy<SymbolId__from_ast>(seenModules)) || nonAliasCanBeReferencedAtTypeLocation(SkipAlias__from_checker(IfElse$PointerTo_Named_ast$Symbol(!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol === undefined), Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ExportSymbol, __go_symbol), typeChecker), typeChecker, Set__from_collections.$copy<SymbolId__from_ast>(seenModules));
}
export function nonAliasCanBeReferencedAtTypeLocation(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, seenModules: Set__from_collections<SymbolId__from_ast>): bool {
    const seenModules$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenModules, seenModules$next => seenModules = seenModules$next);
    return !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsType$constant__from_ast()) >>> 0 === 0) || Checker__from_checker.IsUnknownSymbol(typeChecker, __go_symbol) || !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsModule$constant__from_ast()) >>> 0 === 0) && Set$AddIfAbsent$Named_ast$SymbolId(seenModules$location, GetSymbolId__from_ast(__go_symbol)) && Some$PointerTo_Named_ast$Symbol(Checker__from_checker.GetExportsOfModule(typeChecker, __go_symbol), (e: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return symbolCanBeReferencedAtTypeLocation(e, typeChecker, Set__from_collections.$copy<SymbolId__from_ast>(seenModules));
    });
}
export function getPropertiesForCompletion(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    if (Type__from_checker.IsUnion(t)) {
        return CheckEachDefined__from_core<Symbol__from_ast>(Checker__from_checker.GetAllPossiblePropertiesOfTypes(typeChecker, Type__from_checker.Types(t)), "getAllPossiblePropertiesOfTypes() should all be defined.");
    }
    else {
        return CheckEachDefined__from_core<Symbol__from_ast>(Checker__from_checker.GetApparentProperties(typeChecker, t), "getApparentProperties() should all be defined.");
    }
}
export function getLeftMostName(e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsIdentifier__from_ast(e)) {
        return e;
    }
    else if (IsPropertyAccessExpression__from_ast(e)) {
        return getLeftMostName(Node__from_ast.Expression(e));
    }
    else {
        return void 0;
    }
}
export function getFirstSymbolInChain(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, enclosingDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let chain = Checker__from_checker.GetAccessibleSymbolChain(typeChecker, __go_symbol, enclosingDeclaration, SymbolFlagsAll$constant__from_ast(), false);
    if (chain.length > 0) {
        return chain.get(0);
    }
    if (!(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent === undefined)) {
        if (isModuleSymbol(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
            return __go_symbol;
        }
        return getFirstSymbolInChain(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent, enclosingDeclaration, typeChecker);
    }
    return void 0;
}
export function isModuleSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast();
    });
}
export function getNullableSymbolOriginInfoKind(kind: symbolOriginInfoKind, insertQuestionDot: bool): symbolOriginInfoKind {
    if (insertQuestionDot) {
        kind = new symbolOriginInfoKind(kind.$value | 8);
    }
    return kind;
}
export function isStaticProperty(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && !((Node__from_ast.ModifierFlags(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) & ModifierFlagsStatic$constant__from_ast()) >>> 0 === 0) && IsClassLike__from_ast(Node__from_ast.$storageOf(((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function getContextualTypeForConditionalExpression(conditionalExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    let argInfo: argumentInfoForCompletions | undefined = getArgumentInfoForCompletions(conditionalExpr, position__shadow_1, file, typeChecker);
    if (!(argInfo === undefined)) {
        return Checker__from_checker.GetContextualTypeForArgumentAtIndex(typeChecker, (argInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation, (argInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex);
    }
    let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, conditionalExpr, ContextFlagsIgnoreNodeInferences$constant__from_checker());
    if (!(contextualType === undefined)) {
        return contextualType;
    }
    return Checker__from_checker.GetContextualType(typeChecker, conditionalExpr, ContextFlagsNone$constant__from_checker());
}
export function getContextualType(previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((previousToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((previousToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIdentifier$constant__from_ast(): {
            return getContextualTypeFromParent(previousToken, typeChecker, ContextFlagsNone$constant__from_checker());
            break;
        }
        case KindEqualsToken$constant__from_ast(): {
            switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindVariableDeclaration$constant__from_ast(): {
                    return Checker__from_checker.GetContextualType(typeChecker, Node__from_ast.Initializer(parent), ContextFlagsNone$constant__from_checker());
                    break;
                }
                case KindBinaryExpression$constant__from_ast(): {
                    return Checker__from_checker.GetTypeAtLocation(typeChecker, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                    break;
                }
                case KindJsxAttribute$constant__from_ast(): {
                    return Checker__from_checker.GetContextualTypeForJsxAttribute(typeChecker, parent);
                    break;
                }
                default: {
                    return void 0;
                    break;
                }
            }
            break;
        }
        case KindNewKeyword$constant__from_ast(): {
            return Checker__from_checker.GetContextualType(typeChecker, parent, ContextFlagsNone$constant__from_checker());
            break;
        }
        case KindCaseKeyword$constant__from_ast(): {
            let caseClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = IfElse$PointerTo_Named_ast$Node(IsCaseClause__from_ast(parent), parent, void 0);
            if (!(caseClause === undefined)) {
                return getSwitchedType(caseClause, typeChecker);
            }
            return void 0;
            break;
        }
        case KindOpenBraceToken$constant__from_ast(): {
            if (IsJsxExpression__from_ast(parent) && !IsJsxElement__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsJsxFragment__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Checker__from_checker.GetContextualTypeForJsxAttribute(typeChecker, Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            return void 0;
            break;
        }
        case KindOpenBracketToken$constant__from_ast(): {
            if (IsArrayLiteralExpression__from_ast(parent)) {
                let contextualArrayType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, parent, ContextFlagsNone$constant__from_checker());
                if (!(contextualArrayType === undefined)) {
                    return Checker__from_checker.GetContextualTypeForArrayLiteralAtPosition(typeChecker, contextualArrayType, parent, position__shadow_1);
                }
            }
            return void 0;
            break;
        }
        case KindCloseBracketToken$constant__from_ast(): {
            return void 0;
            break;
        }
        case KindQuestionToken$constant__from_ast(): {
            if (IsConditionalExpression__from_ast(parent)) {
                return getContextualTypeForConditionalExpression(parent, position__shadow_1, file, typeChecker);
            }
            return void 0;
            break;
        }
        case KindColonToken$constant__from_ast(): {
            if (IsConditionalExpression__from_ast(parent)) {
                return getContextualTypeForConditionalExpression(parent, position__shadow_1, file, typeChecker);
            }
            break;
        }
        case KindCommaToken$constant__from_ast(): {
            if (IsArrayLiteralExpression__from_ast(parent)) {
                let contextualArrayType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, parent, ContextFlagsNone$constant__from_checker());
                if (!(contextualArrayType === undefined)) {
                    return Checker__from_checker.GetContextualTypeForArrayLiteralAtPosition(typeChecker, contextualArrayType, parent, position__shadow_1);
                }
                return void 0;
            }
            break;
        }
    }
    let argInfo: argumentInfoForCompletions | undefined = getArgumentInfoForCompletions(previousToken, position__shadow_1, file, typeChecker);
    if (!(argInfo === undefined)) {
        return Checker__from_checker.GetContextualTypeForArgumentAtIndex(typeChecker, (argInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation, (argInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex);
    }
    else if (isEqualityOperatorKind(Node__from_ast.$storageOf(((previousToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && IsBinaryExpression__from_ast(parent) && isEqualityOperatorKind(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        return Checker__from_checker.GetTypeAtLocation(typeChecker, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
    }
    else {
        let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, previousToken, ContextFlagsIgnoreNodeInferences$constant__from_checker());
        if (!(contextualType === undefined)) {
            return contextualType;
        }
        return Checker__from_checker.GetContextualType(typeChecker, previousToken, ContextFlagsNone$constant__from_checker());
    }
}
export function getSwitchedType(caseClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return Checker__from_checker.GetTypeAtLocation(typeChecker, Node__from_ast.Expression(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((caseClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
}
export function isEqualityOperatorKind(kind: Kind__from_ast): bool {
    switch (kind) {
        case KindEqualsEqualsEqualsToken$constant__from_ast():
        case KindEqualsEqualsToken$constant__from_ast():
        case KindExclamationEqualsEqualsToken$constant__from_ast():
        case KindExclamationEqualsToken$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isLiteral(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    return Type__from_checker.IsStringLiteral(t) || Type__from_checker.IsNumberLiteral(t) || Type__from_checker.IsBigIntLiteral(t);
}
export function getRecommendedCompletion(previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let types = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    if (Type__from_checker.IsUnion(contextualType)) {
        types = Type__from_checker.Types(contextualType);
    }
    else {
        types = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([contextualType]);
    }
    return FirstNonNil$PointerTo_Named_checker$Type$PointerTo_Named_ast$Symbol(types, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Type__from_checker.Symbol(t);
        if (!(__go_symbol === undefined) && !((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (424)) >>> 0 === 0) && !isAbstractConstructorSymbol(__go_symbol)) {
            return getFirstSymbolInChain(__go_symbol, previousToken, typeChecker);
        }
        return void 0;
    });
}
export function isAbstractConstructorSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (!((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsClass$constant__from_ast()) >>> 0 === 0)) {
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassLikeDeclarationOfSymbol__from_ast(__go_symbol);
        return !(declaration === undefined) && HasSyntacticModifier__from_ast(declaration, ModifierFlagsAbstract$constant__from_ast());
    }
    return false;
}
export function startsWithQuote(s: gostring): bool {
    const __gotots_results_21 = utf8__from_gostdlib.DecodeRuneInString(s);
    const __gotots_results_22 = [__gotots_results_21[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_21[1]))] satisfies [
        int32,
        int
    ];
    let r = __gotots_results_22[0];
    return r === 34 || r === 39;
}
export function getClosestSymbolDeclaration(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (contextToken === undefined) {
        return void 0;
    }
    let closestDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(contextToken, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsFunctionBlock__from_ast(node) || isArrowFunctionBody(node) || IsBindingPattern__from_ast(node)) {
            return FindAncestorQuit$constant__from_ast();
        }
        if ((IsParameterDeclaration__from_ast(node) || IsTypeParameterDeclaration__from_ast(node)) && !IsIndexSignatureDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            return FindAncestorTrue$constant__from_ast();
        }
        return FindAncestorFalse$constant__from_ast();
    });
    if (closestDeclaration === undefined) {
        closestDeclaration = FindAncestorOrQuit__from_ast(location, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
            if (IsFunctionBlock__from_ast(node) || isArrowFunctionBody(node) || IsBindingPattern__from_ast(node)) {
                return FindAncestorQuit$constant__from_ast();
            }
            if (IsVariableDeclaration__from_ast(node)) {
                return FindAncestorTrue$constant__from_ast();
            }
            return FindAncestorFalse$constant__from_ast();
        });
    }
    return closestDeclaration;
}
export function isArrowFunctionBody(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsArrowFunction__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Body(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)
        || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsGreaterThanToken$constant__from_ast());
}
export function isInTypeParameterDefault(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (contextToken === undefined) {
        return false;
    }
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = contextToken;
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    for (; !(parent === undefined);) {
        if (IsTypeParameterDeclaration__from_ast(parent)) {
            return tsonicTypeScriptRuntime.sameLocation(TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).DefaultType, node)
                || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast();
        }
        node = parent;
        parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return false;
}
export function isDeprecated(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    let declarations = Symbol__from_ast.$storageOf(((SkipAlias__from_checker(__go_symbol, typeChecker) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    return declarations.length > 0 && Every$PointerTo_Named_ast$Node(declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Checker__from_checker.IsDeprecatedDeclaration(typeChecker, decl);
    });
}
export function quotePropertyName(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, name: gostring): gostring {
    const __gotots_results_23 = utf8__from_gostdlib.DecodeRuneInString(name);
    const __gotots_results_24 = [__gotots_results_23[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_23[1]))] satisfies [
        int32,
        int
    ];
    let r = __gotots_results_24[0];
    if (unicode__from_gostdlib.IsDigit(r)) {
        return name;
    }
    return quote(file, UserPreferences__from_lsutil.$copy(preferences), name);
}
export function isStringAndEmptyAnonymousObjectIntersection(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    if (!Type__from_checker.IsIntersection(t)) {
        return false;
    }
    return Type__from_checker.Types(t).length === 2 && (areIntersectedTypesAvoidingStringReduction(typeChecker, Type__from_checker.Types(t).get(0), Type__from_checker.Types(t).get(1)) || areIntersectedTypesAvoidingStringReduction(typeChecker, Type__from_checker.Types(t).get(1), Type__from_checker.Types(t).get(0)));
}
export function areIntersectedTypesAvoidingStringReduction(typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, t1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, t2: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    return Type__from_checker.IsString(t1) && Checker__from_checker.IsEmptyAnonymousObjectType(typeChecker, t2);
}
export function escapeSnippetText(text: gostring): gostring {
    return strings__from_gostdlib.ReplaceAll(text, "$", "\\$");
}
export function isNamedImportsOrExports(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsNamedImports__from_ast(node) || IsNamedExports__from_ast(node);
}
export function generateIdentifierForArbitraryString(text: gostring): gostring {
    let needsUnderscore = false;
    let identifier = named_strings.StringsBuilderOperations.$zero();
    let ch = 0;
    let size = 0;
    for (let pos = 0; pos < text.length; pos += size) {
        const __gotots_results_25 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
        const __gotots_results_26 = [__gotots_results_25[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_25[1]))] satisfies [
            int32,
            int
        ];
        ch = __gotots_results_26[0];
        size = __gotots_results_26[1];
        let validChar = false;
        if (pos === 0) {
            validChar = IsIdentifierStart__from_scanner(ch);
        }
        else {
            validChar = IsIdentifierPart__from_scanner(ch);
        }
        if (size > 0 && validChar) {
            if (needsUnderscore) {
                strings__from_gostdlib.Builder.WriteRune(identifier, 95);
            }
            strings__from_gostdlib.Builder.WriteRune(identifier, ch);
            needsUnderscore = false;
        }
        else {
            needsUnderscore = true;
        }
    }
    if (needsUnderscore) {
        strings__from_gostdlib.Builder.WriteRune(identifier, 95);
    }
    let id = strings__from_gostdlib.Builder.String(identifier);
    if (id === "") {
        return "_";
    }
    return id;
}
export function getCompletionsSymbolKind(kind: ScriptElementKind__from_lsutil): CompletionItemKind__from_lsproto {
    switch (kind.$value) {
        case 28:
        case 2: {
            return CompletionItemKindKeyword$constant__from_lsproto();
            break;
        }
        case 31:
        case 32:
        case 11:
        case 12:
        case 30:
        case 26: {
            return CompletionItemKindVariable$constant__from_lsproto();
            break;
        }
        case 20:
        case 18:
        case 19: {
            return CompletionItemKindField$constant__from_lsproto();
            break;
        }
        case 15:
        case 16: {
            return CompletionItemKindFunction$constant__from_lsproto();
            break;
        }
        case 17:
        case 25:
        case 23:
        case 24: {
            return CompletionItemKindMethod$constant__from_lsproto();
            break;
        }
        case 9: {
            return CompletionItemKindEnum$constant__from_lsproto();
            break;
        }
        case 10: {
            return CompletionItemKindEnumMember$constant__from_lsproto();
            break;
        }
        case 4:
        case 34: {
            return CompletionItemKindModule$constant__from_lsproto();
            break;
        }
        case 5:
        case 8: {
            return CompletionItemKindClass$constant__from_lsproto();
            break;
        }
        case 7: {
            return CompletionItemKindInterface$constant__from_lsproto();
            break;
        }
        case 1: {
            return CompletionItemKindText$constant__from_lsproto();
            break;
        }
        case 3: {
            return CompletionItemKindFile$constant__from_lsproto();
            break;
        }
        case 33: {
            return CompletionItemKindFolder$constant__from_lsproto();
            break;
        }
        case 35: {
            return CompletionItemKindConstant$constant__from_lsproto();
            break;
        }
        default: {
            return CompletionItemKindProperty$constant__from_lsproto();
            break;
        }
    }
}
export function cloneItems(items: RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    if (items.isNil()) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let entries = RuntimeSlice.make<{
        value: CompletionItem;
    } | undefined>(items.length, null, void 0);
    const __gotots_range_1 = items;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
        let i = __gotots_range_value_1;
        let item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined = __gotots_range_value_2;
        let itemClone = CompletionItem__from_lsproto.$copy(CompletionItem__from_lsproto.$copy(((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value));
        const itemClone$location = tsonicTypeScriptRuntime.boundLocation({}, () => itemClone, itemClone$next => itemClone = itemClone$next);
        entries.set(i, { value: new CompletionItem(itemClone$location, void 0) });
    }
    return entries;
}
export function getKeywordCompletions(keywordFilter: KeywordCompletionFilters, filterOutTsOnlyKeywords: bool): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    if (!filterOutTsOnlyKeywords) {
        return cloneItems(getTypescriptKeywordCompletions(keywordFilter));
    }
    let index = new KeywordCompletionFilters(((void KeywordCompletionFilters,
        keywordFilter.$value + KeywordCompletionFiltersLast$constant().$value) as int)
        + 1);
    {
        const __gotots_results_1 = SyncMap$Load$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>, SyncMap__from_collections<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>>(tsonicTypeScriptRuntime.propertyLocation($state, "keywordCompletionsCache"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), index);
        let cached = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok) {
            return cloneItems(cached);
        }
    }
    let result = Filter$PointerTo_Named_lsproto$CompletionItem(getTypescriptKeywordCompletions(keywordFilter), (ci: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): bool => {
        return !isTypeScriptOnlyKeyword(StringToToken__from_scanner(((ci ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Label));
    });
    SyncMap$Store$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>, SyncMap__from_collections<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>>(tsonicTypeScriptRuntime.propertyLocation($state, "keywordCompletionsCache"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), index, result);
    return cloneItems(result);
}
export function getTypescriptKeywordCompletions(keywordFilter: KeywordCompletionFilters): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> {
    {
        const __gotots_results_4 = SyncMap$Load$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>, SyncMap__from_collections<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>>(tsonicTypeScriptRuntime.propertyLocation($state, "keywordCompletionsCache"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), keywordFilter);
        let cached = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (ok) {
            return cached;
        }
    }
    const __gotots_callee_4 = $state.allKeywordCompletions;
    const __gotots_argument_13 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_argument_14 = (entry: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined): bool => {
        let kind = StringToToken__from_scanner(((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Label);
        switch (keywordFilter.$value) {
            case 0: {
                return false;
                break;
            }
            case 1: {
                return isFunctionLikeBodyKeyword(kind) || kind === KindDeclareKeyword$constant__from_ast() || kind === KindModuleKeyword$constant__from_ast() || kind === KindTypeKeyword$constant__from_ast() || kind === KindNamespaceKeyword$constant__from_ast() || kind === KindAbstractKeyword$constant__from_ast() || isTypeKeyword(kind) && !(kind === KindUndefinedKeyword$constant__from_ast());
                break;
            }
            case 5: {
                return isFunctionLikeBodyKeyword(kind);
                break;
            }
            case 2: {
                return isClassMemberCompletionKeyword(kind);
                break;
            }
            case 3: {
                return isInterfaceOrTypeLiteralCompletionKeyword(kind);
                break;
            }
            case 4: {
                return IsParameterPropertyModifier__from_ast(kind);
                break;
            }
            case 6: {
                return isTypeKeyword(kind) || kind === KindConstKeyword$constant__from_ast();
                break;
            }
            case 7: {
                return isTypeKeyword(kind);
                break;
            }
            case 8: {
                return kind === KindTypeKeyword$constant__from_ast();
                break;
            }
            default: {
                const __gotots_argument_12 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unknown keyword filter: %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ls$KeywordCompletionFilters(keywordFilter)])));
                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                break;
            }
        }
    };
    let result = Filter$PointerTo_Named_lsproto$CompletionItem(__gotots_argument_13, __gotots_argument_14);
    SyncMap$Store$Named_ls$KeywordCompletionFilters$SliceOf_PointerTo_Named_lsproto$CompletionItem(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>, SyncMap__from_collections<KeywordCompletionFilters, RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>>>(tsonicTypeScriptRuntime.propertyLocation($state, "keywordCompletionsCache"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), keywordFilter, result);
    return result;
}
export function isTypeScriptOnlyKeyword(kind: Kind__from_ast): bool {
    switch (kind) {
        case KindAbstractKeyword$constant__from_ast():
        case KindAnyKeyword$constant__from_ast():
        case KindBigIntKeyword$constant__from_ast():
        case KindBooleanKeyword$constant__from_ast():
        case KindDeclareKeyword$constant__from_ast():
        case KindEnumKeyword$constant__from_ast():
        case KindGlobalKeyword$constant__from_ast():
        case KindImplementsKeyword$constant__from_ast():
        case KindInferKeyword$constant__from_ast():
        case KindInterfaceKeyword$constant__from_ast():
        case KindIsKeyword$constant__from_ast():
        case KindKeyOfKeyword$constant__from_ast():
        case KindModuleKeyword$constant__from_ast():
        case KindNamespaceKeyword$constant__from_ast():
        case KindNeverKeyword$constant__from_ast():
        case KindNumberKeyword$constant__from_ast():
        case KindObjectKeyword$constant__from_ast():
        case KindOverrideKeyword$constant__from_ast():
        case KindPrivateKeyword$constant__from_ast():
        case KindProtectedKeyword$constant__from_ast():
        case KindPublicKeyword$constant__from_ast():
        case KindReadonlyKeyword$constant__from_ast():
        case KindStringKeyword$constant__from_ast():
        case KindSymbolKeyword$constant__from_ast():
        case KindTypeKeyword$constant__from_ast():
        case KindUniqueKeyword$constant__from_ast():
        case KindUnknownKeyword$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isFunctionLikeBodyKeyword(kind: Kind__from_ast): bool {
    return kind === KindAsyncKeyword$constant__from_ast() || kind === KindAwaitKeyword$constant__from_ast() || kind === KindUsingKeyword$constant__from_ast() || kind === KindAsKeyword$constant__from_ast() || kind === KindSatisfiesKeyword$constant__from_ast() || kind === KindTypeKeyword$constant__from_ast() || !IsContextualKeyword__from_ast(kind) && !isClassMemberCompletionKeyword(kind);
}
export function isClassMemberCompletionKeyword(kind: Kind__from_ast): bool {
    switch (kind) {
        case KindAbstractKeyword$constant__from_ast():
        case KindAccessorKeyword$constant__from_ast():
        case KindConstructorKeyword$constant__from_ast():
        case KindGetKeyword$constant__from_ast():
        case KindSetKeyword$constant__from_ast():
        case KindAsyncKeyword$constant__from_ast():
        case KindDeclareKeyword$constant__from_ast():
        case KindOverrideKeyword$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return IsClassMemberModifier__from_ast(kind);
            break;
        }
    }
}
export function isInterfaceOrTypeLiteralCompletionKeyword(kind: Kind__from_ast): bool {
    return kind === KindReadonlyKeyword$constant__from_ast();
}
export function isContextualKeywordInAutoImportableExpressionSpace(keyword: gostring): bool {
    return keyword === "abstract" || keyword === "async" || keyword === "await" || keyword === "declare" || keyword === "module" || keyword === "namespace" || keyword === "type" || keyword === "satisfies" || keyword === "as";
}
export function getContextualKeywords(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined> {
    let entries = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined>();
    if (!(contextToken === undefined)) {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        let tokenLine = GetECMALineOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), Node__from_ast.End(contextToken));
        let currentLine = GetECMALineOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), position__shadow_1);
        if ((IsImportDeclaration__from_ast(parent) || IsExportDeclaration__from_ast(parent) && !(Node__from_ast.ModuleSpecifier(parent) === undefined)) &&
            tsonicTypeScriptRuntime.sameLocation(contextToken, Node__from_ast.ModuleSpecifier(parent)) && tokenLine === currentLine) {
            entries = entries.append(void 0, [
                tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(TokenToString__from_scanner(KindAssertKeyword$constant__from_ast()), void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindKeyword$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("15"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0)),
            ]);
        }
    }
    return entries;
}
export function isMemberCompletionKind(kind: CompletionKind): bool {
    return kind.$value === CompletionKindObjectPropertyDeclaration$constant().$value || kind.$value === CompletionKindMemberLike$constant().$value || kind.$value === CompletionKindPropertyAccess$constant().$value;
}
export function tryGetFunctionLikeBodyCompletionContainer(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (contextToken === undefined) {
        return void 0;
    }
    let prev: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(contextToken, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsClassLike__from_ast(node)) {
            return FindAncestorQuit$constant__from_ast();
        }
        if (IsFunctionLikeDeclaration__from_ast(node) &&
            tsonicTypeScriptRuntime.sameLocation(prev, Node__from_ast.Body(node))) {
            return FindAncestorTrue$constant__from_ast();
        }
        prev = node;
        return FindAncestorFalse$constant__from_ast();
    });
    return container;
}
export function computeCommitCharactersAndIsNewIdentifier(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): [
    bool,
    RuntimeSlice<gostring>
] {
    let isNewIdentifierLocation: bool = false;
    let defaultCommitCharacters: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    if (contextToken === undefined) {
        return [false, $state.allCommitCharacters];
    }
    let containingNodeKind = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    let tokenKind = keywordForNode(contextToken);
    switch (tokenKind) {
        case KindCommaToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindCallExpression$constant__from_ast():
                case KindNewExpression$constant__from_ast(): {
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (getLineOfPosition(file, Node__from_ast.End(expression)) !== getLineOfPosition(file, position__shadow_1)) {
                        return [true, $state.noCommaCommitCharacters];
                    }
                    return [true, $state.allCommitCharacters];
                    break;
                }
                case KindBinaryExpression$constant__from_ast(): {
                    return [true, $state.noCommaCommitCharacters];
                    break;
                }
                case KindConstructor$constant__from_ast():
                case KindFunctionType$constant__from_ast():
                case KindObjectLiteralExpression$constant__from_ast(): {
                    return [true, $state.emptyCommitCharacters];
                    break;
                }
                case KindArrayLiteralExpression$constant__from_ast(): {
                    return [true, $state.allCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindOpenParenToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindCallExpression$constant__from_ast():
                case KindNewExpression$constant__from_ast(): {
                    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (getLineOfPosition(file, Node__from_ast.End(expression)) !== getLineOfPosition(file, position__shadow_1)) {
                        return [true, $state.noCommaCommitCharacters];
                    }
                    return [true, $state.allCommitCharacters];
                    break;
                }
                case KindParenthesizedExpression$constant__from_ast(): {
                    return [true, $state.noCommaCommitCharacters];
                    break;
                }
                case KindConstructor$constant__from_ast():
                case KindParenthesizedType$constant__from_ast(): {
                    return [true, $state.emptyCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindOpenBracketToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindArrayLiteralExpression$constant__from_ast():
                case KindIndexSignature$constant__from_ast():
                case KindTupleType$constant__from_ast():
                case KindComputedPropertyName$constant__from_ast(): {
                    return [true, $state.allCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindModuleKeyword$constant__from_ast():
        case KindNamespaceKeyword$constant__from_ast():
        case KindImportKeyword$constant__from_ast(): {
            return [true, $state.emptyCommitCharacters];
            break;
        }
        case KindDotToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindModuleDeclaration$constant__from_ast(): {
                    return [true, $state.emptyCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindOpenBraceToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindClassDeclaration$constant__from_ast():
                case KindObjectLiteralExpression$constant__from_ast(): {
                    return [true, $state.emptyCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindEqualsToken$constant__from_ast(): {
            switch (containingNodeKind) {
                case KindVariableDeclaration$constant__from_ast():
                case KindBinaryExpression$constant__from_ast(): {
                    return [true, $state.allCommitCharacters];
                    break;
                }
                default: {
                    return [false, $state.allCommitCharacters];
                    break;
                }
            }
            break;
        }
        case KindTemplateHead$constant__from_ast(): {
            return [containingNodeKind === KindTemplateExpression$constant__from_ast(), $state.allCommitCharacters];
            break;
        }
        case KindTemplateMiddle$constant__from_ast(): {
            return [containingNodeKind === KindTemplateSpan$constant__from_ast(), $state.allCommitCharacters];
            break;
        }
        case KindAsyncKeyword$constant__from_ast(): {
            if (containingNodeKind === KindMethodDeclaration$constant__from_ast() || containingNodeKind === KindShorthandPropertyAssignment$constant__from_ast()) {
                return [true, $state.emptyCommitCharacters];
            }
            return [false, $state.allCommitCharacters];
            break;
        }
        case KindAsteriskToken$constant__from_ast(): {
            if (containingNodeKind === KindMethodDeclaration$constant__from_ast()) {
                return [true, $state.emptyCommitCharacters];
            }
            return [false, $state.allCommitCharacters];
            break;
        }
    }
    if (isClassMemberCompletionKeyword(tokenKind)) {
        return [true, $state.emptyCommitCharacters];
    }
    return [false, $state.allCommitCharacters];
}
export function keywordForNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Kind__from_ast {
    if (IsIdentifier__from_ast(node)) {
        return IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(node));
    }
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
}
export function getScopeNode(initialToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let scope: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = initialToken;
    for (; !(scope === undefined) && !positionBelongsToNode(scope, position__shadow_1, file);) {
        scope = Node__from_ast.$storageOf(((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return scope;
}
export function isSnippetScope(scopeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((scopeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindSourceFile$constant__from_ast():
        case KindTemplateExpression$constant__from_ast():
        case KindJsxExpression$constant__from_ast():
        case KindBlock$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return IsStatement__from_ast(scopeNode);
            break;
        }
    }
}
export function isProbablyGlobalType(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    let selfSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetGlobalSymbol(typeChecker, "self", SymbolFlagsValue$constant__from_ast(), void 0);
    let __gotots_logical_result_2 = !(selfSymbol === undefined);
    if (__gotots_logical_result_2) {
        const __gotots_receiver_0 = typeChecker;
        const __gotots_argument_6 = selfSymbol;
        const __gotots_store_4 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_7 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_2 =
            tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetTypeOfSymbolAtLocation(__gotots_receiver_0, __gotots_argument_6, __gotots_argument_7), t);
    }
    if (__gotots_logical_result_2) {
        return true;
    }
    let globalSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetGlobalSymbol(typeChecker, "global", SymbolFlagsValue$constant__from_ast(), void 0);
    let __gotots_logical_result_3 = !(globalSymbol === undefined);
    if (__gotots_logical_result_3) {
        const __gotots_receiver_1 = typeChecker;
        const __gotots_argument_8 = globalSymbol;
        const __gotots_store_5 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_3 =
            tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetTypeOfSymbolAtLocation(__gotots_receiver_1, __gotots_argument_8, __gotots_argument_9), t);
    }
    if (__gotots_logical_result_3) {
        return true;
    }
    let globalThisSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetGlobalSymbol(typeChecker, "globalThis", SymbolFlagsValue$constant__from_ast(), void 0);
    let __gotots_logical_result_4 = !(globalThisSymbol === undefined);
    if (__gotots_logical_result_4) {
        const __gotots_receiver_2 = typeChecker;
        const __gotots_argument_10 = globalThisSymbol;
        const __gotots_store_6 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        const __gotots_argument_11 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        __gotots_logical_result_4 =
            tsonicTypeScriptRuntime.sameLocation(Checker__from_checker.GetTypeOfSymbolAtLocation(__gotots_receiver_2, __gotots_argument_10, __gotots_argument_11), t);
    }
    if (__gotots_logical_result_4) {
        return true;
    }
    return false;
}
export function tryGetTypeLiteralNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindOpenBraceToken$constant__from_ast(): {
            if (IsTypeLiteralNode__from_ast(parent)) {
                return parent;
            }
            break;
        }
        case KindSemicolonToken$constant__from_ast():
        case KindCommaToken$constant__from_ast():
        case KindIdentifier$constant__from_ast(): {
            if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertySignature$constant__from_ast() && IsTypeLiteralNode__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
    }
    return void 0;
}
export function getConstraintOfTypeArgumentProperty(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    if (node === undefined) {
        return void 0;
    }
    if (IsTypeNode__from_ast(node)) {
        let constraint: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeArgumentConstraint(typeChecker, node);
        if (!(constraint === undefined)) {
            return constraint;
        }
    }
    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = getConstraintOfTypeArgumentProperty(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, typeChecker);
    if (t === undefined) {
        return void 0;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertySignature$constant__from_ast(): {
            let reparsed: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetReparsedNodeForNode__from_ast(node);
            {
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Node__from_ast.Symbol(reparsed);
                if (!(__go_symbol === undefined)) {
                    return Checker__from_checker.GetTypeOfPropertyOfContextualType(typeChecker, t, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
                }
            }
            {
                const __gotots_results_0 = TryGetTextOfPropertyName__from_ast(Node__from_ast.Name(reparsed));
                let name = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (ok) {
                    return Checker__from_checker.GetTypeOfPropertyOfContextualType(typeChecker, t, name);
                }
            }
            return void 0;
            break;
        }
        case KindColonToken$constant__from_ast(): {
            if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertySignature$constant__from_ast()) {
                return t;
            }
            break;
        }
        case KindIntersectionType$constant__from_ast():
        case KindTypeLiteral$constant__from_ast():
        case KindUnionType$constant__from_ast(): {
            return t;
            break;
        }
        case KindOpenBracketToken$constant__from_ast(): {
            return Checker__from_checker.GetElementTypeOfArrayType(typeChecker, t);
            break;
        }
    }
    return void 0;
}
export function tryGetObjectLikeCompletionContainer(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (contextToken === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindOpenBraceToken$constant__from_ast():
        case KindCommaToken$constant__from_ast(): {
            if (IsObjectLiteralExpression__from_ast(parent) || IsObjectBindingPattern__from_ast(parent)) {
                return parent;
            }
            break;
        }
        case KindAsteriskToken$constant__from_ast(): {
            if (IsMethodDeclaration__from_ast(parent) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
        case KindAsyncKeyword$constant__from_ast(): {
            if (IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            if (Node__from_ast.Text(contextToken) === "async" && IsShorthandPropertyAssignment__from_ast(parent)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            else {
                if (IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && (IsSpreadAssignment__from_ast(parent) || IsShorthandPropertyAssignment__from_ast(parent) && getLineOfPosition(file, Node__from_ast.End(contextToken)) !== getLineOfPosition(file, position__shadow_1))) {
                    return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
                let ancestorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, IsPropertyAssignment__from_ast);
                if (!(ancestorNode === undefined) &&
                    tsonicTypeScriptRuntime.sameLocation(GetLastToken__from_lsutil(ancestorNode, file), contextToken) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((ancestorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                    return Node__from_ast.$storageOf(((ancestorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
            }
            break;
        }
        default: {
            if (!(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (IsMethodDeclaration__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsGetAccessorDeclaration__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsSetAccessorDeclaration__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            if (IsSpreadAssignment__from_ast(parent) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            let ancestorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, IsPropertyAssignment__from_ast);
            if (!(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindColonToken$constant__from_ast()) && !(ancestorNode === undefined) &&
                tsonicTypeScriptRuntime.sameLocation(GetLastToken__from_lsutil(ancestorNode, file), contextToken) && IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((ancestorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((ancestorNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
    }
    return void 0;
}
export function tryGetObjectLiteralContextualType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetContextualType(typeChecker, node, ContextFlagsNone$constant__from_checker());
    if (!(t === undefined)) {
        return t;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    if (IsBinaryExpression__from_ast(parent) && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(node, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
        return Checker__from_checker.GetTypeAtLocation(typeChecker, parent);
    }
    if (IsExpression__from_ast(parent)) {
        return Checker__from_checker.GetContextualType(typeChecker, parent, ContextFlagsNone$constant__from_checker());
    }
    return void 0;
}
export function getPropertiesForObjectExpression(contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, completionsType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, obj: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    let hasCompletionsType = !(completionsType === undefined) && !tsonicTypeScriptRuntime.sameLocation(completionsType, contextualType);
    let types = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    if (Type__from_checker.IsUnion(contextualType)) {
        types = Type__from_checker.Types(contextualType);
    }
    else {
        types = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([contextualType]);
    }
    let promiseFilteredContextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetUnionType(typeChecker, Filter$PointerTo_Named_checker$Type(types, (t__shadow_1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return Checker__from_checker.GetPromisedTypeOfPromise(typeChecker, t__shadow_1) === undefined;
    }));
    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
    if (hasCompletionsType && (Type__from_checker.Flags(completionsType) & TypeFlagsAnyOrUnknown$constant__from_checker()) >>> 0 === 0) {
        t = Checker__from_checker.GetUnionType(typeChecker, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([promiseFilteredContextualType, completionsType]));
    }
    else {
        t = promiseFilteredContextualType;
    }
    let hasDeclarationOtherThanSelf: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => bool) | undefined = (member: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        if (Symbol__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0) {
            return true;
        }
        return Some$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, obj);
        });
    };
    let properties = getApparentProperties(t, obj, typeChecker);
    if (Type__from_checker.IsClass(t) && containsNonPublicProperties(properties)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    }
    else if (hasCompletionsType) {
        return Filter$PointerTo_Named_ast$Symbol(properties, hasDeclarationOtherThanSelf);
    }
    else {
        return properties;
    }
}
export function getApparentProperties(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    if (!Type__from_checker.IsUnion(t)) {
        return Checker__from_checker.GetApparentProperties(typeChecker, t);
    }
    return Checker__from_checker.GetAllPossiblePropertiesOfTypes(typeChecker, Filter$PointerTo_Named_checker$Type(Type__from_checker.Types(t), (memberType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !(!((Type__from_checker.Flags(memberType) & TypeFlagsPrimitive$constant__from_checker()) >>> 0 === 0) || Checker__from_checker.IsArrayLikeType(typeChecker, memberType) || Checker__from_checker.IsTypeInvalidDueToUnionDiscriminant(typeChecker, memberType, node) || Checker__from_checker.TypeHasCallOrConstructSignatures(typeChecker, memberType) || Type__from_checker.IsClass(memberType) && containsNonPublicProperties(Checker__from_checker.GetApparentProperties(typeChecker, memberType)));
    }));
}
export function containsNonPublicProperties(props: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): bool {
    return Some$PointerTo_Named_ast$Symbol(props, (p: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !((GetDeclarationModifierFlagsFromSymbol__from_checker(p) & ModifierFlagsNonPublicAccessibilityModifier$constant__from_ast()) >>> 0 === 0);
    });
}
export function filterObjectMembersList(contextualMemberSymbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, existingMembers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>,
    Set__from_collections<gostring>
] {
    let filteredMembers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    let spreadMemberNames: Set__from_collections<gostring> = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.nil();
    });
    if (existingMembers.length === 0) {
        return [contextualMemberSymbols, Set__from_collections.$fromStorage<gostring>({
                M: $goMap$MapOf_string_To_Struct_void.nil()
            })];
    }
    let membersDeclaredBySpreadAssignment = Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    });
    const membersDeclaredBySpreadAssignment$location = tsonicTypeScriptRuntime.boundLocation({}, () => membersDeclaredBySpreadAssignment, membersDeclaredBySpreadAssignment$next => membersDeclaredBySpreadAssignment = membersDeclaredBySpreadAssignment$next);
    let existingMemberNames = Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    });
    const existingMemberNames$location = tsonicTypeScriptRuntime.boundLocation({}, () => existingMemberNames, existingMemberNames$next => existingMemberNames = existingMemberNames$next);
    const __gotots_range_2 = existingMembers;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
        if (!(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAssignment$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindShorthandPropertyAssignment$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBindingElement$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSpreadAssignment$constant__from_ast())) {
            continue;
        }
        if (isCurrentlyEditingNode(member, file, position__shadow_1)) {
            continue;
        }
        let existingName = "";
        if (IsSpreadAssignment__from_ast(member)) {
            setMemberDeclaredBySpreadAssignment(member, membersDeclaredBySpreadAssignment$location, typeChecker);
        }
        else if (IsBindingElement__from_ast(member) && !(Node__from_ast.PropertyName(member) === undefined)) {
            if (Node__from_ast.$storageOf(((Node__from_ast.PropertyName(member) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast()) {
                existingName = Node__from_ast.Text(Node__from_ast.PropertyName(member));
            }
        }
        else {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(member);
            if (!(name === undefined) && IsPropertyNameLiteral__from_ast(name)) {
                existingName = Node__from_ast.Text(name);
            }
        }
        if (existingName !== "") {
            Set$Add$string(existingMemberNames$location, existingName);
        }
    }
    let filteredSymbols = Filter$PointerTo_Named_ast$Symbol(contextualMemberSymbols, (m: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !Set__from_collections.Has<gostring>(existingMemberNames$location, Symbol__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
    });
    return [filteredSymbols, Set__from_collections.$copy<gostring>(membersDeclaredBySpreadAssignment)];
}
export function isCurrentlyEditingNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): bool {
    let start = GetStartOfNode__from_astnav(node, file, false);
    return start <= position__shadow_1 && position__shadow_1 <= Node__from_ast.End(node);
}
export function setMemberDeclaredBySpreadAssignment(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, members: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): void {
    let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(declaration);
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(typeChecker, expression);
    let t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = void 0;
    if (!(__go_symbol === undefined)) {
        t = Checker__from_checker.GetTypeOfSymbolAtLocation(typeChecker, __go_symbol, expression);
    }
    let properties = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    if (!(t === undefined) && !((Type__from_checker.Flags(t) & TypeFlagsStructuredType$constant__from_checker()) >>> 0 === 0)) {
        properties = StructuredType__from_checker.Properties(Type__from_checker.AsStructuredType(t));
    }
    const __gotots_range_6 = properties;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
        let property: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_7;
        Set$Add$string(members, Symbol__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
    }
}
export function tryGetConstructorLikeCompletionContainer(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (contextToken === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindOpenParenToken$constant__from_ast():
        case KindCommaToken$constant__from_ast(): {
            if (IsConstructorDeclaration__from_ast(parent)) {
                return parent;
            }
            return void 0;
            break;
        }
        default: {
            if (isConstructorParameterCompletion(contextToken)) {
                return Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
    }
    return void 0;
}
export function isConstructorParameterCompletion(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsParameterDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsConstructorDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && (IsParameterPropertyModifier__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || IsDeclarationName__from_ast(node));
}
export function tryGetObjectTypeDeclarationCompletionContainer(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindSyntaxList$constant__from_ast(): {
            if (IsObjectTypeDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            return void 0;
            break;
        }
        case KindEndOfFile$constant__from_ast(): {
            let stmtList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.StatementList(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            if (!(stmtList === undefined) && NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0 && IsObjectTypeDeclaration__from_ast(NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1))) {
                let cls: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf(((stmtList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1);
                if (FindChildOfKind__from_astnav(cls, KindCloseBraceToken$constant__from_ast(), file) === undefined) {
                    return cls;
                }
            }
            break;
        }
        case KindPrivateIdentifier$constant__from_ast(): {
            if (IsPropertyDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return FindAncestor__from_ast(location, IsClassLike__from_ast);
            }
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            let originalKeywordKind = IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(location));
            if (!(originalKeywordKind === KindUnknown$constant__from_ast())) {
                return void 0;
            }
            if (IsPropertyDeclaration__from_ast(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Initializer(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), location)) {
                return void 0;
            }
            if (isFromObjectTypeDeclaration(location)) {
                return FindAncestor__from_ast(location, IsObjectTypeDeclaration__from_ast);
            }
            break;
        }
    }
    if (contextToken === undefined) {
        return void 0;
    }
    if (Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructorKeyword$constant__from_ast() || (IsIdentifier__from_ast(contextToken) && IsPropertyDeclaration__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsClassLike__from_ast(location))) {
        return FindAncestor__from_ast(contextToken, IsClassLike__from_ast);
    }
    switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindEqualsToken$constant__from_ast(): {
            return void 0;
            break;
        }
        case KindSemicolonToken$constant__from_ast():
        case KindCloseBraceToken$constant__from_ast(): {
            if (isFromObjectTypeDeclaration(location) &&
                tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), location)) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            if (IsObjectTypeDeclaration__from_ast(location)) {
                return location;
            }
            return void 0;
            break;
        }
        case KindOpenBraceToken$constant__from_ast():
        case KindCommaToken$constant__from_ast(): {
            if (IsObjectTypeDeclaration__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            return void 0;
            break;
        }
        default: {
            if (IsObjectTypeDeclaration__from_ast(location)) {
                if (getLineOfPosition(file, Node__from_ast.End(contextToken)) !== getLineOfPosition(file, position__shadow_1)) {
                    return location;
                }
                let isValidKeyword: (($0: Kind__from_ast) => bool) | undefined = IfElse$Named_ast$Kind_to_bool(IsClassLike__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), isClassMemberCompletionKeyword, isInterfaceOrTypeLiteralCompletionKeyword);
                const __gotots_callee_2 = isValidKeyword;
                const __gotots_argument_4 = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
                let __gotots_logical_result_1 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4) || Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsteriskToken$constant__from_ast();
                if (!__gotots_logical_result_1) {
                    let __gotots_logical_result_0 = IsIdentifier__from_ast(contextToken);
                    if (__gotots_logical_result_0) {
                        const __gotots_callee_3 = isValidKeyword;
                        const __gotots_argument_5 = IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(contextToken));
                        __gotots_logical_result_0 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
                    }
                    __gotots_logical_result_1 = __gotots_logical_result_0;
                }
                if (__gotots_logical_result_1) {
                    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
            }
            return void 0;
            break;
        }
    }
}
export function isFromObjectTypeDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsClassOrTypeElement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsObjectTypeDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
}
export function filterClassMembersList(baseSymbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, existingMembers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, classElementModifierFlags: ModifierFlags__from_ast, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    let existingMemberNames = Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    });
    const existingMemberNames$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => existingMemberNames, existingMemberNames$next2 => existingMemberNames = existingMemberNames$next2);
    const __gotots_range_3 = existingMembers;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
        let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
        if (!(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast()) && !(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast())) {
            continue;
        }
        if (isCurrentlyEditingNode(member, file, position__shadow_1)) {
            continue;
        }
        if (!((Node__from_ast.ModifierFlags(member) & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0)) {
            continue;
        }
        if (IsStatic__from_ast(member) !== (!((classElementModifierFlags & ModifierFlagsStatic$constant__from_ast()) >>> 0 === 0))) {
            continue;
        }
        let existingName = GetPropertyNameForPropertyNameNode__from_ast(Node__from_ast.Name(member));
        if (existingName !== "") {
            Set$Add$string(existingMemberNames$location2, existingName);
        }
    }
    return Filter$PointerTo_Named_ast$Symbol(baseSymbols, (propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
        return !Set__from_collections.Has<gostring>(existingMemberNames$location2, SymbolName__from_ast(propertySymbol)) && Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length > 0 && (GetDeclarationModifierFlagsFromSymbol__from_checker(propertySymbol) & ModifierFlagsPrivate$constant__from_ast()) >>> 0 === 0 && !(!(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsPrivateIdentifierClassElementDeclaration__from_ast(Symbol__from_ast.$storageOf(((propertySymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
    });
}
export function tryGetContainingJsxElement(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (contextToken === undefined) {
        return void 0;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindGreaterThanToken$constant__from_ast():
        case KindLessThanSlashToken$constant__from_ast():
        case KindSlashToken$constant__from_ast():
        case KindIdentifier$constant__from_ast():
        case KindPropertyAccessExpression$constant__from_ast():
        case KindJsxAttributes$constant__from_ast():
        case KindJsxAttribute$constant__from_ast():
        case KindJsxSpreadAttribute$constant__from_ast(): {
            if (!(parent === undefined) && (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSelfClosingElement$constant__from_ast() || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxOpeningElement$constant__from_ast())) {
                if (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGreaterThanToken$constant__from_ast()) {
                    let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(file, Node__from_ast.Pos(contextToken));
                    if (Node__from_ast.TypeArguments(parent).length === 0 || !(precedingToken === undefined) && Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSlashToken$constant__from_ast()) {
                        return void 0;
                    }
                }
                return parent;
            }
            else if (!(parent === undefined) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast()) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
        case KindStringLiteral$constant__from_ast(): {
            if (!(parent === undefined) && (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast() || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSpreadAttribute$constant__from_ast())) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
        case KindCloseBraceToken$constant__from_ast(): {
            if (!(parent === undefined) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxExpression$constant__from_ast() && !(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast()) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            if (!(parent === undefined) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSpreadAttribute$constant__from_ast()) {
                return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            }
            break;
        }
    }
    return void 0;
}
export function filterJsxAttributes(symbols: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, attributes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): [
    RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>,
    tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined
] {
    let filteredMembers: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    let spreadMemberNames: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = void 0;
    let existingNames = Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    });
    const existingNames$location = tsonicTypeScriptRuntime.boundLocation({}, () => existingNames, existingNames$next => existingNames = existingNames$next);
    let membersDeclaredBySpreadAssignment = Set__from_collections.$fromStorage<gostring>({
        M: $goMap$MapOf_string_To_Struct_void.nil()
    });
    const membersDeclaredBySpreadAssignment$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => membersDeclaredBySpreadAssignment, membersDeclaredBySpreadAssignment$next2 => membersDeclaredBySpreadAssignment = membersDeclaredBySpreadAssignment$next2);
    const __gotots_range_4 = attributes;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
        let attr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        if (isCurrentlyEditingNode(attr, file, position__shadow_1)) {
            continue;
        }
        if (Node__from_ast.$storageOf(((attr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast()) {
            Set$Add$string(existingNames$location, Node__from_ast.Text(Node__from_ast.Name(attr)));
        }
        else if (IsJsxSpreadAttribute__from_ast(attr)) {
            setMemberDeclaredBySpreadAssignment(attr, membersDeclaredBySpreadAssignment$location2, typeChecker);
        }
    }
    return [Filter$PointerTo_Named_ast$Symbol(symbols, (a: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool => {
            return !Set__from_collections.Has<gostring>(existingNames$location, Symbol__from_ast.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Name);
        }), membersDeclaredBySpreadAssignment$location2,
    ];
}
export function isTypeKeywordTokenOrIdentifier(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsTypeKeywordToken__from_ast(node) || IsIdentifier__from_ast(node) && IdentifierToKeywordKind__from_scanner(Node__from_ast.AsIdentifier(node)) === KindTypeKeyword$constant__from_ast();
}
export function isCompletionListBlocker(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    return isInStringOrRegularExpressionOrTemplateLiteral(contextToken, position__shadow_1) || isSolelyIdentifierDefinitionLocation(contextToken, previousToken, file, position__shadow_1, typeChecker) || isDotOfNumericLiteral(contextToken, file) || isInJsxText(contextToken, location) || IsBigIntLiteral__from_ast(contextToken);
}
export function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int): bool {
    return (IsRegularExpressionLiteral__from_ast(contextToken) || IsStringTextContainingNode__from_ast(contextToken)) && TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainsExclusive(position__shadow_1) || position__shadow_1 === Node__from_ast.End(contextToken) && (IsUnterminatedLiteral__from_ast(contextToken) || IsRegularExpressionLiteral__from_ast(contextToken));
}
export function isSolelyIdentifierDefinitionLocation(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    let containingNodeKind = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    switch (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindCommaToken$constant__from_ast(): {
            return containingNodeKind === KindVariableDeclaration$constant__from_ast() || isVariableDeclarationListButNotTypeArgument(contextToken, file, typeChecker) || containingNodeKind === KindVariableStatement$constant__from_ast() || containingNodeKind === KindEnumDeclaration$constant__from_ast() || isFunctionLikeButNotConstructor(containingNodeKind) || containingNodeKind === KindInterfaceDeclaration$constant__from_ast() || containingNodeKind === KindArrayBindingPattern$constant__from_ast() || containingNodeKind === KindTypeAliasDeclaration$constant__from_ast() || (IsClassLike__from_ast(parent) && !(Node__from_ast.TypeParameterList(parent) === undefined) && NodeList__from_ast.End(Node__from_ast.TypeParameterList(parent)) >= Node__from_ast.Pos(contextToken));
            break;
        }
        case KindDotToken$constant__from_ast(): {
            return containingNodeKind === KindArrayBindingPattern$constant__from_ast();
            break;
        }
        case KindColonToken$constant__from_ast(): {
            return containingNodeKind === KindBindingElement$constant__from_ast();
            break;
        }
        case KindOpenBracketToken$constant__from_ast(): {
            return containingNodeKind === KindArrayBindingPattern$constant__from_ast();
            break;
        }
        case KindOpenParenToken$constant__from_ast(): {
            return containingNodeKind === KindCatchClause$constant__from_ast() || isFunctionLikeButNotConstructor(containingNodeKind);
            break;
        }
        case KindOpenBraceToken$constant__from_ast(): {
            return containingNodeKind === KindEnumDeclaration$constant__from_ast();
            break;
        }
        case KindLessThanToken$constant__from_ast(): {
            return containingNodeKind === KindClassDeclaration$constant__from_ast() || containingNodeKind === KindClassExpression$constant__from_ast() || containingNodeKind === KindInterfaceDeclaration$constant__from_ast() || containingNodeKind === KindTypeAliasDeclaration$constant__from_ast() || IsFunctionLikeKind__from_ast(containingNodeKind);
            break;
        }
        case KindStaticKeyword$constant__from_ast(): {
            return containingNodeKind === KindPropertyDeclaration$constant__from_ast() && !IsClassLike__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindDotDotDotToken$constant__from_ast(): {
            return containingNodeKind === KindParameter$constant__from_ast() || (!(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayBindingPattern$constant__from_ast());
            break;
        }
        case KindPublicKeyword$constant__from_ast():
        case KindPrivateKeyword$constant__from_ast():
        case KindProtectedKeyword$constant__from_ast(): {
            return containingNodeKind === KindParameter$constant__from_ast() && !IsConstructorDeclaration__from_ast(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
        case KindAsKeyword$constant__from_ast(): {
            return containingNodeKind === KindImportSpecifier$constant__from_ast() || containingNodeKind === KindExportSpecifier$constant__from_ast() || containingNodeKind === KindNamespaceImport$constant__from_ast();
            break;
        }
        case KindGetKeyword$constant__from_ast():
        case KindSetKeyword$constant__from_ast(): {
            return !isFromObjectTypeDeclaration(contextToken);
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            if ((containingNodeKind === KindImportSpecifier$constant__from_ast() || containingNodeKind === KindExportSpecifier$constant__from_ast()) &&
                tsonicTypeScriptRuntime.sameLocation(contextToken, Node__from_ast.Name(parent)) && Node__from_ast.Text(contextToken) === "type") {
                return false;
            }
            let ancestorVariableDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, IsVariableDeclaration__from_ast);
            if (!(ancestorVariableDeclaration === undefined) && getLineEndOfPosition(file, Node__from_ast.End(contextToken)) < position__shadow_1) {
                return false;
            }
            break;
        }
        case KindClassKeyword$constant__from_ast():
        case KindEnumKeyword$constant__from_ast():
        case KindInterfaceKeyword$constant__from_ast():
        case KindFunctionKeyword$constant__from_ast():
        case KindVarKeyword$constant__from_ast():
        case KindImportKeyword$constant__from_ast():
        case KindLetKeyword$constant__from_ast():
        case KindConstKeyword$constant__from_ast():
        case KindInferKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindTypeKeyword$constant__from_ast(): {
            return !(containingNodeKind === KindImportSpecifier$constant__from_ast());
            break;
        }
        case KindAsteriskToken$constant__from_ast(): {
            return IsFunctionLike__from_ast(parent) && !IsMethodDeclaration__from_ast(parent);
            break;
        }
    }
    let tokenKind = keywordForNode(contextToken);
    if (isClassMemberCompletionKeyword(tokenKind) && isFromObjectTypeDeclaration(contextToken)) {
        return false;
    }
    if (isConstructorParameterCompletion(contextToken)) {
        if (!IsIdentifier__from_ast(contextToken) || IsParameterPropertyModifier__from_ast(tokenKind) || isCurrentlyEditingNode(contextToken, file, position__shadow_1)) {
            return false;
        }
    }
    switch (keywordForNode(contextToken)) {
        case KindAbstractKeyword$constant__from_ast():
        case KindClassKeyword$constant__from_ast():
        case KindDeclareKeyword$constant__from_ast():
        case KindEnumKeyword$constant__from_ast():
        case KindFunctionKeyword$constant__from_ast():
        case KindInterfaceKeyword$constant__from_ast():
        case KindLetKeyword$constant__from_ast():
        case KindPrivateKeyword$constant__from_ast():
        case KindProtectedKeyword$constant__from_ast():
        case KindPublicKeyword$constant__from_ast():
        case KindStaticKeyword$constant__from_ast():
        case KindVarKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindAsyncKeyword$constant__from_ast(): {
            return IsPropertyDeclaration__from_ast(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
    }
    let ancestorClassLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, IsClassLike__from_ast);
    if (!(ancestorClassLike === undefined) &&
        tsonicTypeScriptRuntime.sameLocation(contextToken, previousToken) && isPreviousPropertyDeclarationTerminated(contextToken, file, position__shadow_1)) {
        return false;
    }
    let ancestorPropertyDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(parent, IsPropertyDeclaration__from_ast);
    if (!(ancestorPropertyDeclaration === undefined) && !tsonicTypeScriptRuntime.sameLocation(contextToken, previousToken) && IsClassLike__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((previousToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && position__shadow_1 <= Node__from_ast.End(previousToken)) {
        if (isPreviousPropertyDeclarationTerminated(contextToken, file, Node__from_ast.End(previousToken))) {
            return false;
        }
        else if (!(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast()) && (IsInitializedProperty__from_ast(ancestorPropertyDeclaration) || !(Node__from_ast.Type(ancestorPropertyDeclaration) === undefined))) {
            return true;
        }
    }
    if (tokenKind === KindConstKeyword$constant__from_ast()) {
        return true;
    }
    return IsDeclarationName__from_ast(contextToken) && !IsShorthandPropertyAssignment__from_ast(parent) && !IsJsxAttribute__from_ast(parent) && !((IsClassLike__from_ast(parent) || IsInterfaceDeclaration__from_ast(parent) || IsTypeParameterDeclaration__from_ast(parent)) && (!tsonicTypeScriptRuntime.sameLocation(contextToken, previousToken) || position__shadow_1 > Node__from_ast.End(previousToken)));
}
export function isVariableDeclarationListButNotTypeArgument(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): bool {
    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclarationList$constant__from_ast() && !isPossiblyTypeArgumentPosition(node, file, typeChecker);
}
export function isFunctionLikeButNotConstructor(kind: Kind__from_ast): bool {
    return IsFunctionLikeKind__from_ast(kind) && !(kind === KindConstructor$constant__from_ast());
}
export function isPreviousPropertyDeclarationTerminated(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): bool {
    return !(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEqualsToken$constant__from_ast()) && (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast() || getLineOfPosition(file, Node__from_ast.End(contextToken)) !== getLineOfPosition(file, position__shadow_1));
}
export function isDotOfNumericLiteral(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNumericLiteral$constant__from_ast()) {
        let text = goStringSlice(SourceFile__from_ast.Text(file), Node__from_ast.Pos(contextToken), Node__from_ast.End(contextToken));
        const __gotots_results_2 = utf8__from_gostdlib.DecodeLastRuneInString(text);
        const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_3[0];
        return r === 46;
    }
    return false;
}
export function isInJsxText(contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast()) {
        return true;
    }
    if (Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGreaterThanToken$constant__from_ast() && !(Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
        if (tsonicTypeScriptRuntime.sameLocation(location, Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)
            && IsJsxOpeningLikeElement__from_ast(location)) {
            return false;
        }
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxOpeningElement$constant__from_ast()) {
            return !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxOpeningElement$constant__from_ast());
        }
        if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxClosingElement$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSelfClosingElement$constant__from_ast()) {
            return !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((contextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxElement$constant__from_ast();
        }
    }
    return false;
}
export function clientSupportsItemLabelDetails(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionItem.LabelDetailsSupport;
}
export function clientSupportsItemSnippet(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionItem.SnippetSupport;
}
export function clientSupportsItemCommitCharacters(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionItem.CommitCharactersSupport;
}
export function clientSupportsItemInsertReplace(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionItem.InsertReplaceSupport;
}
export function clientSupportsDefaultCommitCharacters(ctx: GoInterface | undefined): bool {
    return Contains$SliceOf_string$string(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionList.ItemDefaults, "commitCharacters");
}
export function clientSupportsDefaultEditRange(ctx: GoInterface | undefined): bool {
    return Contains$SliceOf_string$string(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionList.ItemDefaults, "editRange");
}
export class argumentInfoForCompletions {
    declare private readonly $goType: void;
    public constructor(public invocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public argumentIndex: int, public argumentCount: int) {
    }
    declare private readonly then?: never;
}
export function getArgumentInfoForCompletions(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined): argumentInfoForCompletions | undefined {
    let info: argumentListInfo | undefined = getImmediatelyContainingArgumentInfo(node, position__shadow_1, file, typeChecker);
    if (info === undefined || (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isTypeParameterList || ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation === undefined) {
        return void 0;
    }
    return new argumentInfoForCompletions((((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).invocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.callInvocation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.node, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentIndex, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).argumentCount);
}
export const SourceSwitchCases$string: gostring = "SwitchCases/";
export function getCompletionDocumentationFormat(ctx: GoInterface | undefined): MarkupKind__from_lsproto {
    return PreferredMarkupKind__from_lsproto(((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.Completion.CompletionItem.DocumentationFormat);
}
export class detailsData {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: symbolDetails | undefined, public request: tsonicTypeScriptRuntime.Location<$goInterface$Interface_void | undefined> | undefined, public literal: tsonicTypeScriptRuntime.Location<literalValue | undefined> | undefined, public cases: tsonicTypeScriptRuntime.Location<GoEmptyStruct> | undefined) {
    }
    declare private readonly then?: never;
}
export class symbolDetails {
    declare private readonly $goType: void;
    public constructor(public __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, public location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public origin: symbolOriginInfo | undefined, public previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public jsxInitializer: jsxInitializer, public isTypeOnlyLocation: bool) {
    }
    declare private readonly then?: never;
}
export function createSimpleDetails(item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, name: gostring, docFormat: MarkupKind__from_lsproto): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined {
    return createCompletionDetails(item, name, "", docFormat);
}
export function createCompletionDetails(item: tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined, detail: gostring, documentation: gostring, docFormat: MarkupKind__from_lsproto): tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto> | undefined {
    const detail$location = tsonicTypeScriptRuntime.boundLocation({}, () => detail, detail$next => detail = detail$next);
    if (((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Detail === undefined && detail !== "") {
        ((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Detail =
            detail$location;
    }
    if (documentation !== "") {
        ((item ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompletionItem__from_lsproto>).value.Documentation =
            tsonicTypeScriptRuntime.location<StringOrMarkupContent__from_lsproto>(new StringOrMarkupContent__from_lsproto(void 0, { value: new MarkupContent__from_lsproto(docFormat, documentation) }));
    }
    return item;
}
export function couldBeTypeOnlyImportSpecifier(importSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsImportSpecifier__from_ast(importSpecifier) && (Node__from_ast.IsTypeOnly(importSpecifier) || tsonicTypeScriptRuntime.sameLocation(contextToken, Node__from_ast.Name(importSpecifier))
        && isTypeKeywordTokenOrIdentifier(contextToken));
}
export function canCompleteFromNamedBindings(namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!isModuleSpecifierMissingOrEmpty(Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) || !(Node__from_ast.Name(Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined)) {
        return false;
    }
    if (IsNamedImports__from_ast(namedBindings)) {
        let invalidNamedImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getPotentiallyInvalidImportSpecifier(namedBindings);
        let elements = Node__from_ast.Elements(namedBindings);
        let validImports = elements.length;
        if (!(invalidNamedImport === undefined)) {
            validImports = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(elements, invalidNamedImport);
        }
        return validImports < 2 && validImports > -1;
    }
    return true;
}
export function getPotentiallyInvalidImportSpecifier(namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (namedBindings === undefined || !(Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast())) {
        return void 0;
    }
    return Find$PointerTo_Named_ast$Node(Node__from_ast.Elements(namedBindings), (e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.PropertyName(e) === undefined && IsNonContextualKeyword__from_lsutil(StringToToken__from_scanner(Node__from_ast.Text(Node__from_ast.Name(e)))) && !(Node__from_ast.$storageOf(((FindPrecedingToken__from_astnav(GetSourceFileOfNode__from_ast(namedBindings), Node__from_ast.Pos(Node__from_ast.Name(e))) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast());
    });
}
export function isModuleSpecifierMissingOrEmpty(specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (NodeIsMissing__from_ast(specifier)) {
        return true;
    }
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = specifier;
    if (IsExternalModuleReference__from_ast(node)) {
        node = Node__from_ast.Expression(node);
    }
    if (!IsStringLiteralLike__from_ast(node)) {
        return true;
    }
    return Node__from_ast.Text(node) === "";
}
export function hasDocComment(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int): bool {
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(file, position__shadow_1);
    return !(FindAncestor__from_ast(token, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.IsJSDoc($argument0);
    }) === undefined);
}
export function getJSDocTagAtPosition(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindAncestorOrQuit__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (IsJSDocTag__from_ast(n) && TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainsInclusive(position__shadow_1)) {
            return FindAncestorTrue$constant__from_ast();
        }
        if (Node__from_ast.IsJSDoc(n)) {
            return FindAncestorQuit$constant__from_ast();
        }
        return FindAncestorFalse$constant__from_ast();
    });
}
export function tryGetTypeExpressionFromTag(tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (isTagWithTypeExpression(tag)) {
        let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsJSDocTemplateTag__from_ast(tag)) {
            typeExpression = (Node__from_ast.AsJSDocTemplateTag(tag) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Constraint;
        }
        else {
            typeExpression = Node__from_ast.TypeExpression(tag);
        }
        if (!(typeExpression === undefined) && Node__from_ast.$storageOf(((typeExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTypeExpression$constant__from_ast()) {
            return typeExpression;
        }
    }
    if (IsJSDocAugmentsTag__from_ast(tag) || IsJSDocImplementsTag__from_ast(tag)) {
        return Node__from_ast.ClassName(tag);
    }
    return void 0;
}
export function isTagWithTypeExpression(tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindJSDocParameterTag$constant__from_ast():
        case KindJSDocPropertyTag$constant__from_ast():
        case KindJSDocReturnTag$constant__from_ast():
        case KindJSDocTypeTag$constant__from_ast():
        case KindJSDocTypedefTag$constant__from_ast():
        case KindJSDocThrowsTag$constant__from_ast():
        case KindJSDocSatisfiesTag$constant__from_ast(): {
            return true;
            break;
        }
        case KindJSDocTemplateTag$constant__from_ast(): {
            return !((Node__from_ast.AsJSDocTemplateTag(tag) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Constraint === undefined);
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function getJSDocTagNameCompletions(): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    const __gotots_callee_0 = $state.jsDocTagNameCompletionItems;
    const __gotots_argument_1 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
    return cloneItems(__gotots_argument_1);
}
export function getJSDocTagCompletions(): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    const __gotots_callee_1 = $state.jsDocTagCompletionItems;
    const __gotots_argument_2 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
    return cloneItems(__gotots_argument_2);
}
export function getJSDocParameterCompletions(ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil, tagNameOnly: bool): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    let currentToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(file, position__shadow_1);
    if (!IsJSDocTag__from_ast(currentToken) && !Node__from_ast.IsJSDoc(currentToken)) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (Node__from_ast.IsJSDoc(currentToken)) {
        jsDoc = currentToken;
    }
    else {
        jsDoc = Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    if (!Node__from_ast.IsJSDoc(jsDoc)) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let fun: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((jsDoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (!IsFunctionLike__from_ast(fun)) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let isJS = IsSourceFileJS__from_ast(file);
    let isSnippet = false;
    let paramTagCount = 0;
    let tags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    if (!(JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags === undefined)) {
        tags = NodeList__from_ast.$storageOf(((JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    }
    const __gotots_range_0 = tags;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (IsJSDocParameterTag__from_ast(tag) && GetStartOfNode__from_astnav(tag, file, false) < position__shadow_1 && IsIdentifier__from_ast(Node__from_ast.Name(tag))) {
            paramTagCount++;
        }
    }
    let paramIndex = -1;
    return MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$CompletionItem(Node__from_ast.Parameters(fun), (param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
        value: CompletionItem;
    } | undefined => {
        paramIndex++;
        if (paramIndex < paramTagCount) {
            return void 0;
        }
        if (IsIdentifier__from_ast(Node__from_ast.Name(param))) {
            let tabstopCounter = 1;
            const tabstopCounter$location = tsonicTypeScriptRuntime.boundLocation({}, () => tabstopCounter, tabstopCounter$next => tabstopCounter = tabstopCounter$next);
            let paramName = Node__from_ast.Text(Node__from_ast.Name(param));
            let displayText = getJSDocParamAnnotation(paramName, Node__from_ast.Initializer(param), ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(param) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, isJS, false, false, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), tabstopCounter$location);
            let snippetText = "";
            if (isSnippet) {
                snippetText = getJSDocParamAnnotation(paramName, Node__from_ast.Initializer(param), ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(param) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, isJS, false, true, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), tabstopCounter$location);
            }
            if (tagNameOnly) {
                displayText = goStringSlice(displayText, 1);
                if (snippetText !== "") {
                    snippetText = goStringSlice(snippetText, 1);
                }
            }
            return { value: new CompletionItem(tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(displayText, void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindVariable$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, strPtrTo(snippetText), IfElse$PointerTo_Named_lsproto$InsertTextFormat(isSnippet, tsonicTypeScriptRuntime.location<InsertTextFormat__from_lsproto>(InsertTextFormatSnippet$constant__from_lsproto()), void 0), void 0, void 0, void 0, void 0, void 0, void 0, void 0)), void 0) };
        }
        else if (paramIndex === paramTagCount) {
            let paramPath = fmt__from_gostdlib.Sprintf("param%d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(paramIndex)]));
            let displayTextResult = generateJSDocParamTagsForDestructuring(paramPath, Node__from_ast.Name(param), Node__from_ast.Initializer(param), ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(param) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, isJS, false, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences));
            let snippetText = "";
            if (isSnippet) {
                let snippetTextResult = generateJSDocParamTagsForDestructuring(paramPath, Node__from_ast.Name(param), Node__from_ast.Initializer(param), ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(param) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken, isJS, true, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences));
                snippetText = strings__from_gostdlib.Join(snippetTextResult, NewLineKind_GetNewLineCharacter__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine) + "* ");
            }
            let displayText = strings__from_gostdlib.Join(displayTextResult, NewLineKind_GetNewLineCharacter__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine) + "* ");
            if (tagNameOnly) {
                displayText = strings__from_gostdlib.TrimPrefix(displayText, "@");
                snippetText = strings__from_gostdlib.TrimPrefix(snippetText, "@");
            }
            return { value: new CompletionItem(tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(displayText, void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindVariable$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, strPtrTo(snippetText), IfElse$PointerTo_Named_lsproto$InsertTextFormat(isSnippet, tsonicTypeScriptRuntime.location<InsertTextFormat__from_lsproto>(InsertTextFormatSnippet$constant__from_lsproto()), void 0), void 0, void 0, void 0, void 0, void 0, void 0, void 0)), void 0) };
        }
        return void 0;
    });
}
export function getJSDocParamAnnotation(paramName: gostring, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isJS: bool, isObject: bool, isSnippet: bool, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil, tabstopCounter: tsonicTypeScriptRuntime.Location<int> | undefined): gostring {
    if (isSnippet) {
        Assert__from_debug(!(tabstopCounter === undefined), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
    }
    if (!(initializer === undefined)) {
        paramName = getJSDocParamNameWithInitializer(paramName, initializer);
    }
    if (isSnippet) {
        paramName = escapeSnippetText(paramName);
    }
    if (isJS) {
        let t = "*";
        if (isObject) {
            Assert__from_debug(dotDotDotToken === undefined, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("Cannot annotate a rest parameter with type 'object'.")]));
            t = "object";
        }
        else {
            if (!(initializer === undefined)) {
                let inferredType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(typeChecker, Node__from_ast.$storageOf(((initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                if ((Type__from_checker.Flags(inferredType) & (17)) >>> 0 === 0) {
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(initializer);
                    let quotePreference = GetQuotePreference__from_lsutil(file, UserPreferences__from_lsutil.$copy(preferences));
                    let builderFlags = IfElse$Named_nodebuilder$Flags(quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value, FlagsUseSingleQuotesForStringLiteralType$constant__from_nodebuilder(), FlagsNone$constant__from_nodebuilder());
                    let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Checker__from_checker.TypeToTypeNode(typeChecker, inferredType, FindAncestor__from_ast(initializer, IsFunctionLike__from_ast), builderFlags, GoMap.nil());
                    if (!(typeNode === undefined)) {
                        let emitContext: {
                            value: EmitContext__from_printer;
                        } | undefined = NewEmitContext__from_printer();
                        let p: Printer__from_printer | undefined = NewPrinter__from_printer(new PrinterOptions__from_printer(true, 0, false, 0, false, false, false, false, false, false, false, false), new PrintHandlers__from_printer(void 0, void 0, void 0, void 0, void 0, void 0, void 0), emitContext);
                        EmitContext__from_printer.SetEmitFlags(emitContext, typeNode, EFSingleLine$constant__from_printer());
                        t = Printer__from_printer.Emit(p, typeNode, file);
                    }
                }
            }
            if (isSnippet && t === "*") {
                let tabstop = ((tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
                const __gotots_store_1 = (tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                void (__gotots_store_1.value =
                    __gotots_store_1.value
                        + 1);
                t = fmt__from_gostdlib.Sprintf("${%d:%s}", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(tabstop), new GoInterfaceAdapter(t)]));
            }
        }
        let dotDotDot = IfElse$string(!isObject && !(dotDotDotToken === undefined), "...", "");
        let description = "";
        if (isSnippet) {
            let tabstop = ((tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
            const __gotots_store_2 = (tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            void (__gotots_store_2.value =
                __gotots_store_2.value
                    + 1);
            description = fmt__from_gostdlib.Sprintf("${%d}", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(tabstop)]));
        }
        return fmt__from_gostdlib.Sprintf("@param {%s%s} %s %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(dotDotDot), new GoInterfaceAdapter(t), new GoInterfaceAdapter(paramName), new GoInterfaceAdapter(description)]));
    }
    else {
        let description = "";
        if (isSnippet) {
            let tabstop = ((tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
            const __gotots_store_3 = (tabstopCounter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            void (__gotots_store_3.value =
                __gotots_store_3.value
                    + 1);
            description = fmt__from_gostdlib.Sprintf("${%d}", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(tabstop)]));
        }
        return fmt__from_gostdlib.Sprintf("@param %s %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(paramName), new GoInterfaceAdapter(description)]));
    }
}
export function getJSDocParamNameWithInitializer(paramName: gostring, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    let initializerText = strings__from_gostdlib.TrimSpace(GetTextOfNode__from_scanner(initializer));
    if (strings__from_gostdlib.Contains(initializerText, "\n") || initializerText.length > 80) {
        return fmt__from_gostdlib.Sprintf("[%s]", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(paramName)]));
    }
    return fmt__from_gostdlib.Sprintf("[%s=%s]", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(paramName), new GoInterfaceAdapter(initializerText)]));
}
export function generateJSDocParamTagsForDestructuring(path: gostring, pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isJS: bool, isSnippet: bool, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil): RuntimeSlice<gostring> {
    let tabstopCounter = 1;
    const tabstopCounter$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => tabstopCounter, tabstopCounter$next2 => tabstopCounter = tabstopCounter$next2);
    if (!isJS) {
        return RuntimeSlice.literal<gostring>([getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJS, false, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), tabstopCounter$location2)]);
    }
    return jsDocParamPatternWorker(path, pattern, initializer, dotDotDotToken, isJS, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), tabstopCounter$location2);
}
export function jsDocParamPatternWorker(path: gostring, pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isJS: bool, isSnippet: bool, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil, counter: tsonicTypeScriptRuntime.Location<int> | undefined): RuntimeSlice<gostring> {
    if (IsObjectBindingPattern__from_ast(pattern) && dotDotDotToken === undefined) {
        let childCounter = ((counter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
        const childCounter$location = tsonicTypeScriptRuntime.boundLocation({}, () => childCounter, childCounter$next => childCounter = childCounter$next);
        let rootParam = getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJS, true, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), childCounter$location);
        let childTags = RuntimeSlice.nil<gostring>();
        const __gotots_range_5 = Node__from_ast.Elements(pattern);
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
            let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
            let elementTags = jsDocParamElementWorker(path, element, initializer, dotDotDotToken, isJS, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), childCounter$location);
            if (elementTags.length === 0) {
                childTags = RuntimeSlice.nil<gostring>();
                break;
            }
            childTags = goSliceAppendSlice<gostring>(childTags, elementTags, "");
        }
        if (childTags.length > 0) {
            void ((counter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                childCounter);
            return goSliceAppendSlice<gostring>(RuntimeSlice.literal<gostring>([rootParam]), childTags, "");
        }
    }
    return RuntimeSlice.literal<gostring>([getJSDocParamAnnotation(path, initializer, dotDotDotToken, isJS, false, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), counter)]);
}
export function jsDocParamElementWorker(path: gostring, element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isJS: bool, isSnippet: bool, typeChecker: tsonicTypeScriptRuntime.Location<Checker__from_checker> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences__from_lsutil, counter: tsonicTypeScriptRuntime.Location<int> | undefined): RuntimeSlice<gostring> {
    if (IsIdentifier__from_ast(Node__from_ast.Name(element))) {
        let propertyName = "";
        if (!(Node__from_ast.PropertyName(element) === undefined)) {
            const __gotots_results_9 = TryGetTextOfPropertyName__from_ast(Node__from_ast.PropertyName(element));
            propertyName = __gotots_results_9[0];
        }
        else {
            propertyName = Node__from_ast.Text(Node__from_ast.Name(element));
        }
        if (propertyName === "") {
            return RuntimeSlice.nil<gostring>();
        }
        let paramName = fmt__from_gostdlib.Sprintf("%s.%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(path), new GoInterfaceAdapter(propertyName)]));
        return RuntimeSlice.literal<gostring>([getJSDocParamAnnotation(paramName, Node__from_ast.Initializer(element), (Node__from_ast.AsBindingElement(element) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken, isJS, false, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), counter)]);
    }
    else if (!(Node__from_ast.PropertyName(element) === undefined)) {
        const __gotots_results_10 = TryGetTextOfPropertyName__from_ast(Node__from_ast.PropertyName(element));
        let propertyName = __gotots_results_10[0];
        if (propertyName === "") {
            return RuntimeSlice.nil<gostring>();
        }
        return jsDocParamPatternWorker(fmt__from_gostdlib.Sprintf("%s.%s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(path), new GoInterfaceAdapter(propertyName)])), Node__from_ast.Name(element), Node__from_ast.Initializer(element), (Node__from_ast.AsBindingElement(element) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DotDotDotToken, isJS, isSnippet, typeChecker, options, UserPreferences__from_lsutil.$copy(preferences), counter);
    }
    return RuntimeSlice.nil<gostring>();
}
export function getJSDocParameterNameCompletions(tag: {
    value: JSDocParameterOrPropertyTag__from_ast;
} | undefined): RuntimeSlice<{
    value: CompletionItem;
} | undefined> {
    if (!IsIdentifier__from_ast(JSDocParameterOrPropertyTag__from_ast.Name(tag))) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let nameThusFar = Node__from_ast.Text(JSDocParameterOrPropertyTag__from_ast.Name(tag));
    let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                JSDocTagBase__from_ast.$storageOf((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).NodeBase)).NodeDefault)).Node)).Parent;
    let fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((jsDoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (!IsFunctionLike__from_ast(fn)) {
        return RuntimeSlice.nil<{
            value: CompletionItem;
        } | undefined>();
    }
    let tags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    if (!(JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags === undefined)) {
        tags = NodeList__from_ast.$storageOf(((JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
    }
    return MapNonNil$PointerTo_Named_ast$Node$PointerTo_Named_ls$CompletionItem(Node__from_ast.Parameters(fn), (param: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): {
        value: CompletionItem;
    } | undefined => {
        if (!IsIdentifier__from_ast(Node__from_ast.Name(param))) {
            return void 0;
        }
        let name = Node__from_ast.Text(Node__from_ast.Name(param));
        if (Some$PointerTo_Named_ast$Node(tags, (t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            const __gotots_equal_operand_0 = t;
            const __gotots_store_0 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                JSDocTagBase__from_ast.$storageOf((tag ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JSDocTagBase).NodeBase));
            return !tsonicTypeScriptRuntime.sameLocation(__gotots_equal_operand_0, NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf))) && IsJSDocParameterTag__from_ast(t) && IsIdentifier__from_ast(Node__from_ast.Name(t)) && Node__from_ast.Text(Node__from_ast.Name(t)) === name;
        }) || nameThusFar !== "" && !strings__from_gostdlib.HasPrefix(name, nameThusFar)) {
            return void 0;
        }
        return { value: new CompletionItem(tsonicTypeScriptRuntime.location<CompletionItem__from_lsproto>(new CompletionItem__from_lsproto(name, void 0, tsonicTypeScriptRuntime.location<CompletionItemKind__from_lsproto>(CompletionItemKindVariable$constant__from_lsproto()), void 0, void 0, void 0, void 0, void 0, tsonicTypeScriptRuntime.location<gostring>("11"), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0)), void 0) };
    });
}
export function typeNodeToExpression(typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, target: ScriptTarget__from_core, quotePreference: QuotePreference__from_lsutil, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((typeNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeReference$constant__from_ast(): {
            let typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
            return entityNameToExpression(typeName, target, quotePreference, factory);
            break;
        }
        case KindIndexedAccessType$constant__from_ast(): {
            let objectExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = typeNodeToExpression(IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).ObjectType, target, quotePreference, factory);
            let indexExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = typeNodeToExpression(IndexedAccessTypeNode__from_ast.$storageOf(((Node__from_ast.AsIndexedAccessTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IndexedAccessTypeNode__from_ast>).value).IndexType, target, quotePreference, factory);
            if (!(objectExpression === undefined) && !(indexExpression === undefined)) {
                return NodeFactory__from_ast.NewElementAccessExpression(factory, objectExpression, void 0, indexExpression, NodeFlagsNone$constant__from_ast());
            }
            return void 0;
            break;
        }
        case KindLiteralType$constant__from_ast(): {
            let literal: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LiteralTypeNode__from_ast.$storageOf(((Node__from_ast.AsLiteralTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LiteralTypeNode__from_ast>).value).Literal;
            switch (Node__from_ast.$storageOf(((literal ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindStringLiteral$constant__from_ast(): {
                    let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(factory, Node__from_ast.Text(literal), IfElse$Named_ast$TokenFlags(quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value, TokenFlagsSingleQuote$constant__from_ast(), TokenFlagsNone$constant__from_ast()));
                    return expr;
                    break;
                }
                case KindNumericLiteral$constant__from_ast(): {
                    let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewNumericLiteral(factory, Node__from_ast.Text(literal), (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                        (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                            NumericLiteral__from_ast.$storageOf(((Node__from_ast.AsNumericLiteral(literal) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags);
                    return expr;
                    break;
                }
                default: {
                    return void 0;
                    break;
                }
            }
            break;
        }
        case KindParenthesizedType$constant__from_ast(): {
            let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = typeNodeToExpression(ParenthesizedTypeNode__from_ast.$storageOf(((Node__from_ast.AsParenthesizedTypeNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast>).value).Type, target, quotePreference, factory);
            if (expr === undefined) {
                return void 0;
            }
            if (IsIdentifier__from_ast(expr)) {
                return expr;
            }
            return NodeFactory__from_ast.NewParenthesizedExpression(factory, expr);
            break;
        }
        case KindTypeQuery$constant__from_ast(): {
            return entityNameToExpression((Node__from_ast.AsTypeQueryNode(typeNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName, target, quotePreference, factory);
            break;
        }
        case KindImportType$constant__from_ast(): {
            Fail__from_debug("We should not get an import type after calling 'typeToAutoImportableTypeNode'.");
            return void 0;
            break;
        }
    }
    return void 0;
}
export function entityNameToExpression(entityName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, target: ScriptTarget__from_core, quotePreference: QuotePreference__from_lsutil, factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsIdentifier__from_ast(entityName)) {
        return entityName;
    }
    return NodeFactory__from_ast.NewPropertyAccessExpression(factory, entityNameToExpression((Node__from_ast.AsQualifiedName(entityName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left, target, quotePreference, factory), void 0, (Node__from_ast.AsQualifiedName(entityName) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, NodeFlagsNone$constant__from_ast());
}
export class snippetPrinter {
    declare private readonly $goType: void;
    public constructor(public baseWriter: {
        value: ChangeTrackerWriter__from_printer;
    } | undefined, public printer: Printer__from_printer | undefined, public writer: {
        value: snippetEmitTextWriter;
    } | undefined, public factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$ls$createSyntheticFile(p: snippetPrinter | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, text: gostring, targetFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let eof: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, KindEndOfFile$constant__from_ast());
        Node__from_ast.$storageOf(((eof ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(text.length, text.length));
        let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([node]));
        NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(Node__from_ast.Pos(node), Node__from_ast.End(node)));
        let syntheticFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSourceFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, SourceFile__from_ast.ParseOptions(targetFile), text, statements, eof);
        Node__from_ast.$storageOf(((syntheticFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(0, text.length));
        SetParentInChildren__from_ast(syntheticFile);
        return Node__from_ast.AsSourceFile(syntheticFile);
    }
    static $go$private$ls$printAndFormatNode(p: snippetPrinter | undefined, ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring {
        let text = snippetPrinter.$go$private$ls$printUnescapedNode(p, node);
        let nodeWithPos: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ChangeTrackerWriter__from_printer.AssignPositionsToNode((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).baseWriter, node, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory);
        let syntheticFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = snippetPrinter.$go$private$ls$createSyntheticFile(p, nodeWithPos, text, sourceFile);
        let changes = FormatNodeGivenIndentation__from_format(ctx, nodeWithPos, syntheticFile, ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant, 0, 0);
        let allChanges = changes;
        if (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.escapes.length > 0) {
            const __gotots_slice_build_0 = changes;
            const __gotots_slice_build_1: snippetEmitTextWriter["escapes"] = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.escapes;
            let __gotots_slice_build_2 = __gotots_slice_build_1;
            if (__gotots_slice_build_1.length > 0) {
                __gotots_slice_build_2 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_1.length, null);
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_1.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_2.set(__gotots_slice_build_5, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_1.get(__gotots_slice_build_5)))));
                }
            }
            const __gotots_slice_build_4 = __gotots_slice_build_0.length + __gotots_slice_build_2.length;
            let __gotots_slice_build_3 = __gotots_slice_build_0;
            if (__gotots_slice_build_4 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_3 = __gotots_slice_build_0.$withLength(__gotots_slice_build_4);
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                }
            }
            else {
                __gotots_slice_build_3 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_4));
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_0.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_5, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_5)))));
                }
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                }
                for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.$initialize(__gotots_slice_build_5, TextChange__from_core.$storageOf(TextChange__from_core.$zero()));
                }
            }
            allChanges = __gotots_slice_build_3;
            SortFunc$SliceOf_Named_core$TextChange$Named_core$TextChange(allChanges, (a: TextChange__from_core, b: TextChange__from_core): int => {
                return CompareTextRanges__from_core(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextChange__from_core.$storageOf(a).TextRange)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextChange__from_core.$storageOf(b).TextRange)));
            });
        }
        return ApplyBulkEdits__from_core(SourceFile__from_ast.Text(syntheticFile), allChanges);
    }
    static $go$private$ls$printUnescapedNode(p: snippetPrinter | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
        ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.escapes = RuntimeSlice.nil<TextChange__from_core$Storage>();
        ChangeTrackerWriter__from_printer.Clear(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter);
        Printer__from_printer.Write((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).printer, node, void 0, new $goInterfaceAdapter$PointerTo_Named_ls$snippetEmitTextWriter((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer), void 0);
        return ChangeTrackerWriter__from_printer.String(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter);
    }
}
export function createSnippetPrinter(options: PrinterOptions__from_printer): snippetPrinter | undefined {
    let baseWriter: {
        value: ChangeTrackerWriter__from_printer;
    } | undefined = NewChangeTrackerWriter__from_printer(NewLineKind_GetNewLineCharacter__from_core(options.NewLine), -1);
    let printer__shadow_1: Printer__from_printer | undefined = NewPrinter__from_printer(PrinterOptions__from_printer.$copy(options), ChangeTrackerWriter__from_printer.GetPrintHandlers(baseWriter), void 0);
    let writer: {
        value: snippetEmitTextWriter;
    } | undefined = { value: new snippetEmitTextWriter(baseWriter, RuntimeSlice.nil<TextChange__from_core$Storage>()) };
    return new snippetPrinter(baseWriter, printer__shadow_1, writer, NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0)));
}
export class snippetEmitTextWriter {
    declare private readonly $goType: void;
    public constructor(public ChangeTrackerWriter: {
        value: ChangeTrackerWriter__from_printer;
    } | undefined, public escapes: RuntimeSlice<TextChange__from_core$Storage>) {
    }
    static $copy($source: snippetEmitTextWriter): snippetEmitTextWriter {
        return new snippetEmitTextWriter($source.ChangeTrackerWriter, $source.escapes);
    }
    declare private readonly then?: never;
    static Write(w: {
        value: snippetEmitTextWriter;
    } | undefined, s: gostring): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, s, (): void => {
            ChangeTrackerWriter__from_printer.Write((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, s);
        });
    }
    static WriteComment(w: {
        value: snippetEmitTextWriter;
    } | undefined, text: gostring): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, text, (): void => {
            ChangeTrackerWriter__from_printer.WriteComment((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, text);
        });
    }
    static WriteParameter(w: {
        value: snippetEmitTextWriter;
    } | undefined, text: gostring): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, text, (): void => {
            ChangeTrackerWriter__from_printer.WriteParameter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, text);
        });
    }
    static WriteProperty(w: {
        value: snippetEmitTextWriter;
    } | undefined, text: gostring): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, text, (): void => {
            ChangeTrackerWriter__from_printer.WriteProperty((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, text);
        });
    }
    static WriteStringLiteral(w: {
        value: snippetEmitTextWriter;
    } | undefined, text: gostring): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, text, (): void => {
            ChangeTrackerWriter__from_printer.WriteStringLiteral((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, text);
        });
    }
    static WriteSymbol(w: {
        value: snippetEmitTextWriter;
    } | undefined, text: gostring, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
        snippetEmitTextWriter.$go$private$ls$escapingWrite(w, text, (): void => {
            ChangeTrackerWriter__from_printer.WriteSymbol((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter, text, __go_symbol);
        });
    }
    static $go$private$ls$escapingWrite(w: {
        value: snippetEmitTextWriter;
    } | undefined, s: gostring, write: (() => void) | undefined): void {
        let escaped = escapeSnippetText(s);
        if (escaped !== s) {
            let start = ChangeTrackerWriter__from_printer.GetTextPos((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter);
            const __gotots_callee_5 = write;
            (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
            let end = ChangeTrackerWriter__from_printer.GetTextPos((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ChangeTrackerWriter);
            const __gotots_slice_build_6: snippetEmitTextWriter["escapes"] = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.escapes;
            const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
            let __gotots_slice_build_7 = __gotots_slice_build_6;
            if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
                __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, (void TextChange__from_core.$storageOf, (void TextChange__from_core.$fromStorage,
                    {
                        NewText: escaped,
                        TextRange: TextRange__from_core.$storageOf(NewTextRange__from_core(start, end))
                    })));
            }
            else {
                __gotots_slice_build_7 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
                for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.set(__gotots_slice_build_9, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_9)))));
                }
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, (void TextChange__from_core.$storageOf, (void TextChange__from_core.$fromStorage,
                    {
                        NewText: escaped,
                        TextRange: TextRange__from_core.$storageOf(NewTextRange__from_core(start, end))
                    })));
                for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.$initialize(__gotots_slice_build_9, TextChange__from_core.$storageOf(TextChange__from_core.$zero()));
                }
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.escapes = __gotots_slice_build_7;
        }
        else {
            const __gotots_callee_6 = write;
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
    }
}
