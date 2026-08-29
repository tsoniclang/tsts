import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange as CommentRange__from_ast, ConditionalTypeNode as ConditionalTypeNode__from_ast, ExportDeclaration as ExportDeclaration__from_ast, FileReference as FileReference__from_ast, ImportClause as ImportClause__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, InferTypeNode as InferTypeNode__from_ast, Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeVisitor as NodeVisitor__from_ast, QualifiedName as QualifiedName__from_ast, SemanticMeaning as SemanticMeaning__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ContextFlags as ContextFlags__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { Number as Number__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { ArrayTypeNode as ArrayTypeNode__from_ast, BinaryExpression as BinaryExpression__from_ast, CanHaveModifiers as CanHaveModifiers__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExportSpecifier as ExportSpecifier__from_ast, FindAncestor as FindAncestor__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetDeclarationOfKind as GetDeclarationOfKind__from_ast, GetExternalModuleImportEqualsDeclarationExpression as GetExternalModuleImportEqualsDeclarationExpression__from_ast, GetHeritageElements as GetHeritageElements__from_ast, GetImplementsTypeNodes as GetImplementsTypeNodes__from_ast, GetModuleInstanceState as GetModuleInstanceState__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetReparsedNodeForNode as GetReparsedNodeForNode__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasInitializer as HasInitializer__from_ast, HeritageClause as HeritageClause__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsBreakOrContinueStatement as IsBreakOrContinueStatement__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsDeclarationName as IsDeclarationName__from_ast, IsDefaultClause as IsDefaultClause__from_ast, IsEntityName as IsEntityName__from_ast, IsEnumDeclaration as IsEnumDeclaration__from_ast, IsEnumMember as IsEnumMember__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpressionNode as IsExpressionNode__from_ast, IsExternalModuleImportEqualsDeclaration as IsExternalModuleImportEqualsDeclaration__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsImportCall as IsImportCall__from_ast, IsImportClause as IsImportClause__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsInternalModuleImportEqualsDeclaration as IsInternalModuleImportEqualsDeclaration__from_ast, IsJSDocNameReferenceContext as IsJSDocNameReferenceContext__from_ast, IsJsxAttribute as IsJsxAttribute__from_ast, IsJsxAttributes as IsJsxAttributes__from_ast, IsJsxSpreadAttribute as IsJsxSpreadAttribute__from_ast, IsLiteralExpression as IsLiteralExpression__from_ast, IsLiteralTypeNode as IsLiteralTypeNode__from_ast, IsModifier as IsModifier__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsModuleOrEnumDeclaration as IsModuleOrEnumDeclaration__from_ast, IsNewExpression as IsNewExpression__from_ast, IsObjectLiteralElement as IsObjectLiteralElement__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsOptionalChainRoot as IsOptionalChainRoot__from_ast, IsOptionalChain as IsOptionalChain__from_ast, IsPartOfTypeNode as IsPartOfTypeNode__from_ast, IsQualifiedName as IsQualifiedName__from_ast, IsRequireCall as IsRequireCall__from_ast, IsRightSideOfQualifiedNameOrPropertyAccess as IsRightSideOfQualifiedNameOrPropertyAccess__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringTextContainingNode as IsStringTextContainingNode__from_ast, IsTemplateLiteralKind as IsTemplateLiteralKind__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeElement as IsTypeElement__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsUnterminatedLiteral as IsUnterminatedLiteral__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableLike as IsVariableLike__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAsKeyword$constant as KindAsKeyword$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindAwaitKeyword$constant as KindAwaitKeyword$constant__from_ast, KindBarToken$constant as KindBarToken$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassKeyword$constant as KindClassKeyword$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstKeyword$constant as KindConstKeyword$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDeleteKeyword$constant as KindDeleteKeyword$constant__from_ast, KindDotToken$constant as KindDotToken$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumKeyword$constant as KindEnumKeyword$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindFromKeyword$constant as KindFromKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionKeyword$constant as KindFunctionKeyword$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGetKeyword$constant as KindGetKeyword$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportKeyword$constant as KindImportKeyword$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInferKeyword$constant as KindInferKeyword$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInstanceOfKeyword$constant as KindInstanceOfKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindInterfaceKeyword$constant as KindInterfaceKeyword$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindLetKeyword$constant as KindLetKeyword$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindModuleKeyword$constant as KindModuleKeyword$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNewKeyword$constant as KindNewKeyword$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOfKeyword$constant as KindOfKeyword$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindQuestionDotToken$constant as KindQuestionDotToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindRequireKeyword$constant as KindRequireKeyword$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSetKeyword$constant as KindSetKeyword$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindTypeOfKeyword$constant as KindTypeOfKeyword$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindVarKeyword$constant as KindVarKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, KindYieldKeyword$constant as KindYieldKeyword$constant__from_ast, ModifierFlagsStatic$constant as ModifierFlagsStatic$constant__from_ast, ModuleInstanceStateInstantiated$constant as ModuleInstanceStateInstantiated$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsAmbient$constant as NodeFlagsAmbient$constant__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeFlagsJavaScriptFile$constant as NodeFlagsJavaScriptFile$constant__from_ast, NodeKindIs as NodeKindIs__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, OEKAll$constant as OEKAll$constant__from_ast, SemanticMeaningAll$constant as SemanticMeaningAll$constant__from_ast, SemanticMeaningNamespace$constant as SemanticMeaningNamespace$constant__from_ast, SemanticMeaningType$constant as SemanticMeaningType$constant__from_ast, SemanticMeaningValue$constant as SemanticMeaningValue$constant__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, SkipParentheses as SkipParentheses__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast, TypeOperatorNode as TypeOperatorNode__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableDeclaration as VariableDeclaration__from_ast, Visitor as Visitor__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, FindPrecedingToken as FindPrecedingToken__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav, GetTouchingToken as GetTouchingToken__from_astnav, VisitEachChildAndJSDoc as VisitEachChildAndJSDoc__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Checker as Checker__from_checker, ContextFlagsNone$constant as ContextFlagsNone$constant__from_checker, SignatureKindCall$constant as SignatureKindCall$constant__from_checker, SignatureKindConstruct$constant as SignatureKindConstruct$constant__from_checker, Signature as Signature__from_checker, TypeFlagsUnionOrIntersection$constant as TypeFlagsUnionOrIntersection$constant__from_checker, Type as Type__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewTextRange as NewTextRange__from_core, SingleElementSlice as SingleElementSlice__from_core, StringifyJson as StringifyJson__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FromString as FromString__from_jsnum, ParseValidBigInt as ParseValidBigInt__from_jsnum, PseudoBigInt as PseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { GetQuotePreference as GetQuotePreference__from_lsutil, PositionBelongsToNode as PositionBelongsToNode__from_lsutil, QuotePreferenceSingle$constant as QuotePreferenceSingle$constant__from_lsutil, UserPreferences as UserPreferences__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/state.js";
import { GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, Scanner as Scanner__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { StripQuotes as StripQuotes__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, ResolvePath as ResolvePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_jsnum$Number, Set$Add$Named_jsnum$PseudoBigInt, Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$PointerTo_Named_ast$Node, Set$AddIfAbsent$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Filter$PointerTo_Named_checker$Signature } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$FileReference, Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { IfElse$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { MapNonNil$PointerTo_Named_checker$Type$PointerTo_Named_ast$Symbol } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$Named_jsnum$Number, $goInterfaceAdapter$Named_jsnum$PseudoBigInt, $goInterfaceAdapter$PointerTo_Named_ls$caseClauseTrackerState, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$ls$addValue$Interface_void_to_void, $goInterfaceMethod$ls$hasValue$Interface_void_to_bool } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_jsnum$Number_To_Struct_void, $goMap$MapOf_Named_jsnum$PseudoBigInt_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { getSwitchedType, isEqualityOperatorKind } from "./completions.js";
import { getRangeOfNode, refInfo } from "./findallreferences.js";
import { getRangeOfEnclosingComment } from "./format.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function IsInString(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(previousToken === undefined) && IsStringTextContainingNode__from_ast(previousToken)) {
        let start = GetStartOfNode__from_astnav(previousToken, sourceFile, false);
        let end = Node__from_ast.End(previousToken);
        if (start < position__shadow_1 && position__shadow_1 < end) {
            return true;
        }
        if (position__shadow_1 === end) {
            return IsUnterminatedLiteral__from_ast(previousToken);
        }
    }
    return false;
}
export function isModuleSpecifierLike(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!IsStringLiteralLike__from_ast(node)) {
        return false;
    }
    if (IsRequireCall__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, false) || IsImportCall__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Arguments(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent).get(0), node);
    }
    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSImportDeclaration$constant__from_ast();
}
export function getNonModuleSymbolOfMergedModuleSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 0 || ((Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (33555968)) >>> 0) === 0) {
        return void 0;
    }
    {
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !IsSourceFile__from_ast(d) && !IsModuleDeclaration__from_ast(d);
        });
        if (!(decl === undefined)) {
            return Node__from_ast.Symbol(decl);
        }
    }
    return void 0;
}
export function getLocalSymbolForExportSpecifier(referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, referenceSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, exportSpecifier: {
    value: ExportSpecifier__from_ast;
} | undefined, ch: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    if (isExportSpecifierAlias(referenceLocation, exportSpecifier)) {
        {
            const __gotots_receiver_0 = ch;
            const __gotots_store_3 = NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
            const __gotots_argument_4 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetExportSpecifierLocalTargetSymbol(__gotots_receiver_0, __gotots_argument_4);
            if (!(__go_symbol === undefined)) {
                return __go_symbol;
            }
        }
    }
    return referenceSymbol;
}
export function isExportSpecifierAlias(referenceLocation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, exportSpecifier: {
    value: ExportSpecifier__from_ast;
} | undefined): bool {
    Assert__from_debug(tsonicTypeScriptRuntime.sameLocation((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName, referenceLocation)
        ||
            tsonicTypeScriptRuntime.sameLocation(ExportSpecifier__from_ast.Name(exportSpecifier), referenceLocation), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("referenceLocation is not export specifier name or property name")]));
    let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PropertyName;
    if (!(propertyName === undefined)) {
        return tsonicTypeScriptRuntime.sameLocation(propertyName, referenceLocation);
    }
    else {
        return Node__from_ast.ModuleSpecifier(Node__from_ast.$storageOf((((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                NodeBase__from_ast.$storageOf((exportSpecifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault)).Node)).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === undefined;
    }
}
export function isInComment(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, tokenAtPosition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined {
    return getRangeOfEnclosingComment(file, position__shadow_1, FindPrecedingToken__from_astnav(file, position__shadow_1), tokenAtPosition);
}
export function positionBelongsToNode(candidate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return PositionBelongsToNode__from_lsutil(candidate, position__shadow_1, file);
}
export class PossibleTypeArgumentInfo {
    declare private readonly $goType: void;
    public constructor(public called: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public nTypeArguments: int) {
    }
    declare private readonly then?: never;
}
export function getPossibleTypeArgumentsInfo(tokenIn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): PossibleTypeArgumentInfo | undefined {
    if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(SourceFile__from_ast.Text(sourceFile), 60))) === -1) {
        return void 0;
    }
    let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tokenIn;
    let remainingLessThanTokens = 0;
    let nTypeArguments = 0;
    for (; !(token === undefined);) {
        switch (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindLessThanToken$constant__from_ast(): {
                token = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(token));
                if (!(token === undefined) && Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionDotToken$constant__from_ast()) {
                    token = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(token));
                }
                if (token === undefined || !IsIdentifier__from_ast(token)) {
                    return void 0;
                }
                if (remainingLessThanTokens === 0) {
                    if (IsDeclarationName__from_ast(token)) {
                        return void 0;
                    }
                    return new PossibleTypeArgumentInfo(token, nTypeArguments);
                }
                remainingLessThanTokens--;
                break;
            }
            case KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast(): {
                remainingLessThanTokens += 3;
                break;
            }
            case KindGreaterThanGreaterThanToken$constant__from_ast(): {
                remainingLessThanTokens += 2;
                break;
            }
            case KindGreaterThanToken$constant__from_ast(): {
                remainingLessThanTokens++;
                break;
            }
            case KindCloseBraceToken$constant__from_ast(): {
                token = findPrecedingMatchingToken(token, KindOpenBraceToken$constant__from_ast(), sourceFile);
                if (token === undefined) {
                    return void 0;
                }
                break;
            }
            case KindCloseParenToken$constant__from_ast(): {
                token = findPrecedingMatchingToken(token, KindOpenParenToken$constant__from_ast(), sourceFile);
                if (token === undefined) {
                    return void 0;
                }
                break;
            }
            case KindCloseBracketToken$constant__from_ast(): {
                token = findPrecedingMatchingToken(token, KindOpenBracketToken$constant__from_ast(), sourceFile);
                if (token === undefined) {
                    return void 0;
                }
                break;
            }
            case KindCommaToken$constant__from_ast(): {
                nTypeArguments++;
                break;
            }
            case KindEqualsGreaterThanToken$constant__from_ast():
            case KindIdentifier$constant__from_ast():
            case KindStringLiteral$constant__from_ast():
            case KindNumericLiteral$constant__from_ast():
            case KindBigIntLiteral$constant__from_ast():
            case KindTrueKeyword$constant__from_ast():
            case KindFalseKeyword$constant__from_ast():
            case KindTypeOfKeyword$constant__from_ast():
            case KindExtendsKeyword$constant__from_ast():
            case KindKeyOfKeyword$constant__from_ast():
            case KindDotToken$constant__from_ast():
            case KindBarToken$constant__from_ast():
            case KindQuestionToken$constant__from_ast():
            case KindColonToken$constant__from_ast(): {
                break;
            }
            default: {
                if (!IsTypeNode__from_ast(token)) {
                    return void 0;
                }
                break;
            }
        }
        token = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(token));
    }
    return void 0;
}
export function isNameOfModuleDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast())) {
        return false;
    }
    return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function isExpressionOfExternalModuleImportEqualsDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsExternalModuleImportEqualsDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(GetExternalModuleImportEqualsDeclarationExpression__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function isNamespaceReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
}
export function isQualifiedNameNamespaceReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    let isLastClause = true;
    if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast()) {
        for (; !(Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast();) {
            root = Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        isLastClause =
            tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsQualifiedName(root) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, node);
    }
    return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast() && !isLastClause;
}
export function isPropertyAccessNamespaceReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let root: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    let isLastClause = true;
    if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast()) {
        for (; !(Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast();) {
            root = Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        }
        isLastClause =
            tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(root), node);
    }
    if (!isLastClause && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExpressionWithTypeArguments$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindHeritageClause$constant__from_ast()) {
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        return (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindClassDeclaration$constant__from_ast() && HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindImplementsKeyword$constant__from_ast()) || (Node__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast() && HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((root ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindExtendsKeyword$constant__from_ast());
    }
    return false;
}
export function isThis(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindThisKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindIdentifier$constant__from_ast(): {
            return Node__from_ast.Text(node) === "this" && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast();
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isTypeReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsRightSideOfQualifiedNameOrPropertyAccess__from_ast(node)) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindThisKeyword$constant__from_ast(): {
            return !IsExpressionNode__from_ast(node);
            break;
        }
        case KindThisType$constant__from_ast(): {
            return true;
            break;
        }
    }
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeReference$constant__from_ast(): {
            return true;
            break;
        }
        case KindImportType$constant__from_ast(): {
            return !(Node__from_ast.AsImportTypeNode(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOf;
            break;
        }
        case KindExpressionWithTypeArguments$constant__from_ast(): {
            return IsPartOfTypeNode__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            break;
        }
    }
    return false;
}
export function isInRightSideOfInternalImportEqualsDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return false;
    }
    for (; Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast();) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return IsInternalModuleImportEqualsDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsImportEqualsDeclaration(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, node);
}
export function createRangeFromNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): TextRange__from_core {
    return NewTextRange__from_core(GetTokenPosOfNode__from_scanner(node, file, false), Node__from_ast.End(node));
}
export function quote(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences__from_lsutil, text: gostring): gostring {
    let quotePreference = GetQuotePreference__from_lsutil(file, UserPreferences__from_lsutil.$copy(preferences));
    const __gotots_results_0 = StringifyJson__from_core(new $goInterfaceAdapter$string(text), "", "");
    let quoted = __gotots_results_0[0];
    if (quotePreference.$value === QuotePreferenceSingle$constant__from_lsutil().$value) {
        const __gotots_receiver_1 = $state.quoteReplacer;
        quoted = strings__from_gostdlib.Replacer.Replace(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Replacer>).value, StripQuotes__from_stringutil(quoted));
    }
    return quoted;
}
export function isTypeKeyword(kind: Kind__from_ast): bool {
    return Set__from_collections.Has<Kind__from_ast>($state.typeKeywords, kind);
}
export function isLiteralNameOfPropertyDeclarationOrIndexAccess(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindEnumMember$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(GetNameOfDeclaration__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
            break;
        }
        case KindElementAccessExpression$constant__from_ast(): {
            return tsonicTypeScriptRuntime.sameLocation(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression, node);
            break;
        }
        case KindComputedPropertyName$constant__from_ast(): {
            return true;
            break;
        }
        case KindLiteralType$constant__from_ast(): {
            return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIndexedAccessType$constant__from_ast();
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isObjectBindingElementWithoutPropertyName(bindingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBindingElement$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectBindingPattern$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.Name(bindingElement) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() && Node__from_ast.PropertyName(bindingElement) === undefined;
}
export function isRightSideOfPropertyAccess(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function isStaticSymbol(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    if (Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) {
        return false;
    }
    let modifierFlags = Node__from_ast.ModifierFlags(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
    return !((modifierFlags & ModifierFlagsStatic$constant__from_ast()) >>> 0 === 0);
}
export function isImplementation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
        return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeAliasDeclaration$constant__from_ast());
    }
    if (IsVariableLike__from_ast(node)) {
        return HasInitializer__from_ast(node);
    }
    if (IsFunctionLikeDeclaration__from_ast(node)) {
        return !(Node__from_ast.Body(node) === undefined);
    }
    return IsClassLike__from_ast(node) || IsModuleOrEnumDeclaration__from_ast(node);
}
export function isImplementationExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParenthesizedExpression$constant__from_ast(): {
            return isImplementationExpression(Node__from_ast.Expression(node));
            break;
        }
        case KindArrowFunction$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindObjectLiteralExpression$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindArrayLiteralExpression$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isReadonlyTypeOperator(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindReadonlyKeyword$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOperator$constant__from_ast() && TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindReadonlyKeyword$constant__from_ast();
}
export function isJumpStatementTarget(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() && IsBreakOrContinueStatement__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Label(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function isLabelOfLabeledStatement(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLabeledStatement$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Label(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node);
}
export function findReferenceInPosition(refs: RuntimeSlice<{
    value: FileReference__from_ast;
} | undefined>, pos: int): {
    value: FileReference__from_ast;
} | undefined {
    return Find$PointerTo_Named_ast$FileReference(refs, (ref: {
        value: FileReference__from_ast;
    } | undefined): bool => {
        return (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TextRange.ContainsInclusive(pos);
    });
}
export function getContainingNodeIfInHeritageClause(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIdentifier$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast()) {
        return getContainingNodeIfInHeritageClause(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExpressionWithTypeArguments$constant__from_ast() && (IsClassLike__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast())) {
        return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return void 0;
}
export function getContainerNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent; !(parent === undefined); parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
        switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast():
            case KindMethodDeclaration$constant__from_ast():
            case KindMethodSignature$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindGetAccessor$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindClassDeclaration$constant__from_ast():
            case KindInterfaceDeclaration$constant__from_ast():
            case KindEnumDeclaration$constant__from_ast():
            case KindModuleDeclaration$constant__from_ast(): {
                return parent;
                break;
            }
        }
    }
    return void 0;
}
export function getAdjustedLocation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, forRename: bool, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    let isModifier: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (IsModifier__from_ast(node__shadow_1) && (forRename || !(Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast()))) {
            return CanHaveModifiers__from_ast(parent) && Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(parent), node__shadow_1);
        }
        switch (Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindClassKeyword$constant__from_ast(): {
                return IsClassDeclaration__from_ast(parent) || IsClassExpression__from_ast(node__shadow_1);
                break;
            }
            case KindFunctionKeyword$constant__from_ast(): {
                return IsFunctionDeclaration__from_ast(parent) || IsFunctionExpression__from_ast(node__shadow_1);
                break;
            }
            case KindInterfaceKeyword$constant__from_ast(): {
                return IsInterfaceDeclaration__from_ast(parent);
                break;
            }
            case KindEnumKeyword$constant__from_ast(): {
                return IsEnumDeclaration__from_ast(parent);
                break;
            }
            case KindTypeKeyword$constant__from_ast(): {
                return IsTypeAliasDeclaration__from_ast(parent);
                break;
            }
            case KindNamespaceKeyword$constant__from_ast():
            case KindModuleKeyword$constant__from_ast(): {
                return IsModuleDeclaration__from_ast(parent);
                break;
            }
            case KindImportKeyword$constant__from_ast(): {
                return IsImportEqualsDeclaration__from_ast(parent);
                break;
            }
            case KindGetKeyword$constant__from_ast(): {
                return IsGetAccessorDeclaration__from_ast(parent);
                break;
            }
            case KindSetKeyword$constant__from_ast(): {
                return IsSetAccessorDeclaration__from_ast(parent);
                break;
            }
        }
        return false;
    };
    const __gotots_callee_0 = isModifier;
    const __gotots_argument_0 = node;
    if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0)) {
        if (sourceFile === undefined) {
            sourceFile = GetSourceFileOfNode__from_ast(node);
        }
        {
            let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedLocationForDeclaration(parent, forRename, sourceFile);
            if (!(location === undefined)) {
                return location;
            }
        }
    }
    if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVarKeyword$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstKeyword$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLetKeyword$constant__from_ast()) && IsVariableDeclarationList__from_ast(parent) && NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
        let declaration: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined = Node__from_ast.AsVariableDeclaration(NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
        if (IsIdentifier__from_ast(VariableDeclaration__from_ast.Name(declaration))) {
            return VariableDeclaration__from_ast.Name(declaration);
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeKeyword$constant__from_ast()) {
        if (IsImportClause__from_ast(parent) && Node__from_ast.IsTypeOnly(parent)) {
            {
                let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedLocationForImportDeclaration(Node__from_ast.AsImportDeclaration(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), forRename);
                if (!(location === undefined)) {
                    return location;
                }
            }
        }
        if (IsExportDeclaration__from_ast(parent) && Node__from_ast.IsTypeOnly(parent)) {
            {
                let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedLocationForExportDeclaration(Node__from_ast.AsExportDeclaration(parent), forRename);
                if (!(location === undefined)) {
                    return location;
                }
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsKeyword$constant__from_ast()) {
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast() && !(Node__from_ast.PropertyName(parent) === undefined) || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportSpecifier$constant__from_ast() && !(Node__from_ast.PropertyName(parent) === undefined) || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceImport$constant__from_ast() || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceExport$constant__from_ast()) {
            return Node__from_ast.Name(parent);
        }
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportDeclaration$constant__from_ast()) {
            {
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsExportDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause;
                if (!(exportClause === undefined) && Node__from_ast.$storageOf(((exportClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceExport$constant__from_ast()) {
                    return Node__from_ast.Name(exportClause);
                }
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast()) {
        {
            let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedLocationForImportDeclaration(Node__from_ast.AsImportDeclaration(parent), forRename);
            if (!(location === undefined)) {
                return location;
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportKeyword$constant__from_ast()) {
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportDeclaration$constant__from_ast()) {
            {
                let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAdjustedLocationForExportDeclaration(Node__from_ast.AsExportDeclaration(parent), forRename);
                if (!(location === undefined)) {
                    return location;
                }
            }
        }
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast()) {
            return SkipOuterExpressions__from_ast(Node__from_ast.Expression(parent), OEKAll$constant__from_ast());
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindRequireKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast()) {
        return Node__from_ast.Expression(parent);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFromKeyword$constant__from_ast()) {
        if ((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast() || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportDeclaration$constant__from_ast()) && !(Node__from_ast.ModuleSpecifier(parent) === undefined)) {
            return Node__from_ast.ModuleSpecifier(parent);
        }
    }
    if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExtendsKeyword$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImplementsKeyword$constant__from_ast()) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindHeritageClause$constant__from_ast() && HeritageClause__from_ast.$storageOf(((Node__from_ast.AsHeritageClause(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        let getAdjustedLocationForHeritageClause: (($0: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
                return Node__from_ast.Expression(NodeList__from_ast.$storageOf(((HeritageClause__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0));
            }
            return void 0;
        };
        {
            const __gotots_callee_1 = getAdjustedLocationForHeritageClause;
            const __gotots_argument_1 = Node__from_ast.AsHeritageClause(parent);
            let location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
            if (!(location === undefined)) {
                return location;
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExtendsKeyword$constant__from_ast()) {
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeParameter$constant__from_ast()) {
            {
                let constraint: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Constraint;
                if (!(constraint === undefined) && Node__from_ast.$storageOf(((constraint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast()) {
                    return TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(constraint) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
                }
            }
        }
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConditionalType$constant__from_ast()) {
            {
                let extendsType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsConditionalTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendsType;
                if (!(extendsType === undefined) && Node__from_ast.$storageOf(((extendsType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast()) {
                    return TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(extendsType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
                }
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInferKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInferType$constant__from_ast()) {
        return Node__from_ast.Name((Node__from_ast.AsInferTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeParameter);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeParameter$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMappedType$constant__from_ast()) {
        return Node__from_ast.Name(parent);
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindKeyOfKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOperator$constant__from_ast() && TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindKeyOfKeyword$constant__from_ast()) {
        {
            let parentType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(parent);
            if (!(parentType === undefined) && Node__from_ast.$storageOf(((parentType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast()) {
                return TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(parentType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
            }
        }
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindReadonlyKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOperator$constant__from_ast() && TypeOperatorNode__from_ast.$storageOf(((Node__from_ast.AsTypeOperatorNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeOperatorNode__from_ast>).value).Operator === KindReadonlyKeyword$constant__from_ast()) {
        {
            let parentType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(parent);
            if (!(parentType === undefined) && Node__from_ast.$storageOf(((parentType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayType$constant__from_ast() && Node__from_ast.$storageOf(((ArrayTypeNode__from_ast.$storageOf(((Node__from_ast.AsArrayTypeNode(parentType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast>).value).ElementType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast()) {
                return TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(ArrayTypeNode__from_ast.$storageOf(((Node__from_ast.AsArrayTypeNode(parentType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast>).value).ElementType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
            }
        }
    }
    if (!forRename) {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNewKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNewExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVoidKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVoidExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOfKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeOfExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAwaitKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAwaitExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindYieldKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindYieldExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDeleteKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDeleteExpression$constant__from_ast()) {
            {
                let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(parent);
                if (!(expr === undefined)) {
                    return SkipOuterExpressions__from_ast(expr, OEKAll$constant__from_ast());
                }
            }
        }
        if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInKeyword$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInstanceOfKeyword$constant__from_ast()) && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() &&
            tsonicTypeScriptRuntime.sameLocation(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken, node)) {
            return SkipOuterExpressions__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, OEKAll$constant__from_ast());
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsExpression$constant__from_ast()) {
            {
                let asExprType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(parent);
                if (!(asExprType === undefined) && Node__from_ast.$storageOf(((asExprType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeReference$constant__from_ast()) {
                    return TypeReferenceNode__from_ast.$storageOf(((Node__from_ast.AsTypeReferenceNode(asExprType) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName;
                }
            }
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForInStatement$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOfKeyword$constant__from_ast() && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForOfStatement$constant__from_ast()) {
            return SkipOuterExpressions__from_ast(Node__from_ast.Expression(parent), OEKAll$constant__from_ast());
        }
    }
    return node;
}
export function getAdjustedLocationForDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, forRename: bool, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!(Node__from_ast.Name(node) === undefined)) {
        return Node__from_ast.Name(node);
    }
    if (forRename) {
        return void 0;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast(): {
            return Find$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node), ($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDefaultKeyword$constant__from_ast();
            });
            break;
        }
        case KindClassExpression$constant__from_ast(): {
            return FindChildOfKind__from_astnav(node, KindClassKeyword$constant__from_ast(), sourceFile);
            break;
        }
        case KindFunctionExpression$constant__from_ast(): {
            return FindChildOfKind__from_astnav(node, KindFunctionKeyword$constant__from_ast(), sourceFile);
            break;
        }
        case KindConstructor$constant__from_ast(): {
            return node;
            break;
        }
    }
    return void 0;
}
export function getAdjustedLocationForImportDeclaration(node: {
    value: ImportDeclaration__from_ast;
} | undefined, forRename: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined)) {
        {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
            if (!(name === undefined)) {
                if (!((Node__from_ast.AsImportClause((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined)) {
                    return void 0;
                }
                return Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
            }
        }
        {
            let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsImportClause((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings;
            if (!(namedBindings === undefined)) {
                switch (Node__from_ast.$storageOf(((namedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindNamedImports$constant__from_ast(): {
                        let elements = Node__from_ast.Elements(namedBindings);
                        if (elements.length !== 1) {
                            return void 0;
                        }
                        return Node__from_ast.Name(elements.get(0));
                        break;
                    }
                    case KindNamespaceImport$constant__from_ast(): {
                        return Node__from_ast.Name(namedBindings);
                        break;
                    }
                }
            }
        }
    }
    if (!forRename) {
        return (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
    }
    return void 0;
}
export function getAdjustedLocationForExportDeclaration(node: {
    value: ExportDeclaration__from_ast;
} | undefined, forRename: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (!((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) {
        switch (Node__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindNamedExports$constant__from_ast(): {
                let elements = Node__from_ast.Elements((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                if (elements.length !== 1) {
                    return void 0;
                }
                return Node__from_ast.Name(elements.get(0));
                break;
            }
            case KindNamespaceExport$constant__from_ast(): {
                return Node__from_ast.Name((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                break;
            }
        }
    }
    if (!forRename) {
        return (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
    }
    return void 0;
}
export function getMeaningFromLocation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SemanticMeaning__from_ast {
    node = getAdjustedLocation(GetReparsedNodeForNode__from_ast(node), false, void 0);
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    __gotots_control_target_0: {
        if (IsSourceFile__from_ast(node)) {
            return SemanticMeaningValue$constant__from_ast();
        }
        else if (NodeKindIs__from_ast(parent, RuntimeSlice.literal<Kind__from_ast>([KindExportAssignment$constant__from_ast(), KindExportSpecifier$constant__from_ast(), KindExternalModuleReference$constant__from_ast(), KindImportSpecifier$constant__from_ast(), KindImportClause$constant__from_ast()])) || Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast() &&
            tsonicTypeScriptRuntime.sameLocation(node, Node__from_ast.Name(parent))) {
            return SemanticMeaningAll$constant__from_ast();
        }
        else if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
            if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast())) {
                name = IfElse$PointerTo_Named_ast$Node(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQualifiedName$constant__from_ast() &&
                    tsonicTypeScriptRuntime.sameLocation((Node__from_ast.AsQualifiedName(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right, node), Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, void 0);
            }
            if (!(name === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportEqualsDeclaration$constant__from_ast()) {
                return SemanticMeaningAll$constant__from_ast();
            }
            return SemanticMeaningNamespace$constant__from_ast();
        }
        else if (IsDeclarationName__from_ast(node)) {
            return getMeaningFromDeclaration(parent);
        }
        else if (IsEntityName__from_ast(node) && IsJSDocNameReferenceContext__from_ast(node)) {
            return SemanticMeaningAll$constant__from_ast();
        }
        else if (isTypeReference(node)) {
            return SemanticMeaningType$constant__from_ast();
        }
        else if (isNamespaceReference(node)) {
            return SemanticMeaningNamespace$constant__from_ast();
        }
        else if (IsTypeParameterDeclaration__from_ast(parent)) {
            return SemanticMeaningType$constant__from_ast();
        }
        else if (IsLiteralTypeNode__from_ast(parent)) {
            return 3;
        }
        else {
            return SemanticMeaningValue$constant__from_ast();
        }
    }
}
export function getMeaningFromDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): SemanticMeaning__from_ast {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindVariableDeclaration$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindBindingElement$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindCatchClause$constant__from_ast():
        case KindJsxAttribute$constant__from_ast(): {
            return SemanticMeaningValue$constant__from_ast();
            break;
        }
        case KindTypeParameter$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast():
        case KindTypeLiteral$constant__from_ast(): {
            return SemanticMeaningType$constant__from_ast();
            break;
        }
        case KindEnumMember$constant__from_ast():
        case KindClassDeclaration$constant__from_ast(): {
            return 3;
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            if (IsAmbientModule__from_ast(node)) {
                return 5;
            }
            else if (GetModuleInstanceState__from_ast(node) === ModuleInstanceStateInstantiated$constant__from_ast()) {
                return 5;
            }
            else {
                return SemanticMeaningNamespace$constant__from_ast();
            }
            break;
        }
        case KindEnumDeclaration$constant__from_ast():
        case KindNamedImports$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindImportEqualsDeclaration$constant__from_ast():
        case KindImportDeclaration$constant__from_ast():
        case KindJSImportDeclaration$constant__from_ast():
        case KindExportAssignment$constant__from_ast():
        case KindExportDeclaration$constant__from_ast(): {
            return SemanticMeaningAll$constant__from_ast();
            break;
        }
        case KindSourceFile$constant__from_ast(): {
            return 5;
            break;
        }
    }
    return SemanticMeaningAll$constant__from_ast();
}
export function getIntersectingMeaningFromDeclarations(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, defaultMeaning: SemanticMeaning__from_ast): SemanticMeaning__from_ast {
    if (node === undefined) {
        return defaultMeaning;
    }
    let meaning = getMeaningFromLocation(node);
    let declarations = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    if (declarations.length === 0) {
        return meaning;
    }
    let lastIterationMeaning = meaning;
    let iteration: (($0: SemanticMeaning__from_ast) => SemanticMeaning__from_ast) | undefined = (m: SemanticMeaning__from_ast): SemanticMeaning__from_ast => {
        const __gotots_range_0 = declarations;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            let declarationMeaning = getMeaningFromDeclaration(declaration);
            if (!((declarationMeaning & m) === 0)) {
                m = m | declarationMeaning;
            }
        }
        return m;
    };
    const __gotots_callee_2 = iteration;
    const __gotots_argument_2 = meaning;
    meaning = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
    for (; !(meaning === lastIterationMeaning);) {
        lastIterationMeaning = meaning;
        const __gotots_callee_3 = iteration;
        const __gotots_argument_3 = meaning;
        meaning = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
    }
    return meaning;
}
export function getAllSuperTypeNodes(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    if (IsInterfaceDeclaration__from_ast(node)) {
        return GetHeritageElements__from_ast(node, KindExtendsKeyword$constant__from_ast());
    }
    if (IsClassLike__from_ast(node)) {
        return goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(SingleElementSlice__from_core<Node__from_ast>(GetClassExtendsHeritageElement__from_ast(node)), GetImplementsTypeNodes__from_ast(node), void 0);
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
}
export function getParentSymbolsOfPropertyAccess(location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, ch: {
    value: Checker__from_checker;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    if (!isRightSideOfPropertyAccess(location)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    }
    let lhsType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(ch, Node__from_ast.Expression(Node__from_ast.$storageOf(((location ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent));
    if (lhsType === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>();
    }
    let possibleSymbols = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>();
    if (!((Type__from_checker.Flags(lhsType) & TypeFlagsUnionOrIntersection$constant__from_checker()) >>> 0 === 0)) {
        possibleSymbols = Type__from_checker.Types(lhsType);
    }
    else if (!tsonicTypeScriptRuntime.sameLocation(Type__from_checker.Symbol(lhsType), Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Parent)) {
        possibleSymbols = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>([lhsType]);
    }
    return MapNonNil$PointerTo_Named_checker$Type$PointerTo_Named_ast$Symbol(possibleSymbols, (t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        if (!(Type__from_checker.Symbol(t) === undefined) && !((Symbol__from_ast.$storageOf(((Type__from_checker.Symbol(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (96)) >>> 0 === 0)) {
            return Type__from_checker.Symbol(t);
        }
        return void 0;
    });
}
export function getPropertySymbolsFromBaseTypes(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, propertyName: gostring, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, cb: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let seen = Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Symbol_To_Struct_void.nil();
    });
    const seen$location = tsonicTypeScriptRuntime.boundLocation({}, () => seen, seen$next => seen = seen$next);
    let recur: (($0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined) | undefined;
    recur = (__go_symbol__shadow_1: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        if ((Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & (96)) >>> 0 === 0 || !Set$AddIfAbsent$PointerTo_Named_ast$Symbol(seen$location, __go_symbol__shadow_1)) {
            return void 0;
        }
        const __gotots_range_2 = Symbol__from_ast.$storageOf(((__go_symbol__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            const __gotots_range_3 = getAllSuperTypeNodes(declaration);
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
                let typeReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_3;
                {
                    let propertyType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(checker__shadow_1, typeReference);
                    if (!(propertyType === undefined) && !(Type__from_checker.Symbol(propertyType) === undefined)) {
                        {
                            let propertySymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetPropertyOfType(checker__shadow_1, propertyType, propertyName);
                            if (!(propertySymbol === undefined)) {
                                const __gotots_range_4 = Checker__from_checker.GetRootSymbols(checker__shadow_1, propertySymbol);
                                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                                    const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
                                    let rootSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_4;
                                    {
                                        const __gotots_callee_4 = cb;
                                        const __gotots_argument_6 = rootSymbol;
                                        let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
                                        if (!(result === undefined)) {
                                            return result;
                                        }
                                    }
                                }
                            }
                        }
                        {
                            const __gotots_callee_5 = recur;
                            const __gotots_argument_7 = Type__from_checker.Symbol(propertyType);
                            let result: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
                            if (!(result === undefined)) {
                                return result;
                            }
                        }
                    }
                }
            }
        }
        return void 0;
    };
    const __gotots_callee_6 = recur;
    const __gotots_argument_8 = __go_symbol;
    return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
}
export function getPropertySymbolFromBindingElement(checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, bindingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    {
        let typeOfPattern: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(checker__shadow_1, Node__from_ast.$storageOf(((bindingElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        if (!(typeOfPattern === undefined)) {
            return Checker__from_checker.GetPropertyOfType(checker__shadow_1, typeOfPattern, Node__from_ast.Text(Node__from_ast.Name(bindingElement)));
        }
    }
    return void 0;
}
export function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(__go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    let bindingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetDeclarationOfKind__from_ast(__go_symbol, KindBindingElement$constant__from_ast());
    if (!(bindingElement === undefined) && isObjectBindingElementWithoutPropertyName(bindingElement)) {
        return getPropertySymbolFromBindingElement(checker__shadow_1, bindingElement);
    }
    return void 0;
}
export function getTargetLabel(referenceNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, labelName: gostring): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; !(referenceNode === undefined);) {
        if (Node__from_ast.$storageOf(((referenceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindLabeledStatement$constant__from_ast() && Node__from_ast.Text(Node__from_ast.Label(referenceNode)) === labelName) {
            return Node__from_ast.Label(referenceNode);
        }
        referenceNode = Node__from_ast.$storageOf(((referenceNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return void 0;
}
export function skipConstraint(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    if (Type__from_checker.IsTypeParameter(t)) {
        let c: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetBaseConstraintOfType(typeChecker, t);
        if (!(c === undefined)) {
            return c;
        }
    }
    return t;
}
export class caseClauseTrackerState {
    declare private readonly $goType: void;
    public constructor(public existingStrings: Set__from_collections<gostring>, public existingNumbers: Set__from_collections<Number__from_jsnum>, public existingBigInts: Set__from_collections<PseudoBigInt__from_jsnum>) {
    }
    declare private readonly then?: never;
    static $go$private$ls$addValue(c: caseClauseTrackerState | undefined, value: GoInterface | undefined): void {
        const __gotots_type_switch_0: GoInterface | undefined = value;
        switch (true) {
            case $goInterfaceAdapter$string.$is(__gotots_type_switch_0): {
                let v: gostring = __gotots_type_switch_0.$go$value;
                const __gotots_store_4 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "existingStrings"), v);
                break;
            }
            case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_0): {
                let v: Number__from_jsnum = __gotots_type_switch_0.$go$value;
                const __gotots_store_5 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                Set$Add$Named_jsnum$Number(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "existingNumbers"), v);
                break;
            }
            default: {
                let v: GoInterface | undefined = __gotots_type_switch_0;
                const __gotots_argument_5 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unsupported type: %T", RuntimeSlice.literal<GoInterface | undefined>([v])));
                GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
                break;
            }
        }
    }
    static $go$private$ls$hasValue(c: caseClauseTrackerState | undefined, value: GoInterface | undefined): bool {
        const __gotots_type_switch_1: GoInterface | undefined = value;
        switch (true) {
            case $goInterfaceAdapter$string.$is(__gotots_type_switch_1): {
                let v: gostring = __gotots_type_switch_1.$go$value;
                const __gotots_store_6 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "existingStrings"), v);
                break;
            }
            case $goInterfaceAdapter$Named_jsnum$Number.$is(__gotots_type_switch_1): {
                let v: Number__from_jsnum = __gotots_type_switch_1.$go$value;
                const __gotots_store_7 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return Set__from_collections.Has<Number__from_jsnum>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "existingNumbers"), v);
                break;
            }
            case $goInterfaceAdapter$Named_jsnum$PseudoBigInt.$is(__gotots_type_switch_1): {
                let v: PseudoBigInt__from_jsnum = PseudoBigInt__from_jsnum.$copy(__gotots_type_switch_1.$go$value);
                const __gotots_store_8 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return Set__from_collections.Has<PseudoBigInt__from_jsnum>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "existingBigInts"), PseudoBigInt__from_jsnum.$copy(v));
                break;
            }
            default: {
                let v: GoInterface | undefined = __gotots_type_switch_1;
                const __gotots_argument_12 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unsupported type: %T", RuntimeSlice.literal<GoInterface | undefined>([v])));
                GoPanic.raise(__gotots_argument_12 === undefined ? GoPanicNilValue.create() : __gotots_argument_12);
                break;
            }
        }
    }
}
export interface caseClauseTracker extends GoInterfaceValue {
    $go$private$ls$addValue($argument0: GoInterface | undefined): void;
    $go$private$ls$hasValue($argument0: GoInterface | undefined): bool;
}
export const caseClauseTracker$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$ls$addValue$Interface_void_to_void, $goInterfaceMethod$ls$hasValue$Interface_void_to_bool]);
export function caseClauseTracker$is(value: GoInterfaceValue | undefined): value is caseClauseTracker {
    return value !== undefined && value.$go$implements(caseClauseTracker$contract);
}
export function newCaseClauseTracker(typeChecker: {
    value: Checker__from_checker;
} | undefined, clauses: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): caseClauseTracker | undefined {
    let c: caseClauseTrackerState | undefined = new caseClauseTrackerState(Set__from_collections.$fromStorage<gostring>({
        M: GoMap.nil()
    }), Set__from_collections.$fromStorage<Number__from_jsnum>({
        M: $goMap$MapOf_Named_jsnum$Number_To_Struct_void.nil()
    }), Set__from_collections.$fromStorage<PseudoBigInt__from_jsnum>({
        M: $goMap$MapOf_Named_jsnum$PseudoBigInt_To_Struct_void.nil()
    }));
    const __gotots_range_1 = clauses;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let clause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (!IsDefaultClause__from_ast(clause)) {
            let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(Node__from_ast.Expression(clause));
            if (IsLiteralExpression__from_ast(expression)) {
                switch (Node__from_ast.$storageOf(((expression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindNoSubstitutionTemplateLiteral$constant__from_ast():
                    case KindStringLiteral$constant__from_ast(): {
                        const __gotots_store_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "existingStrings"), Node__from_ast.Text(expression));
                        break;
                    }
                    case KindNumericLiteral$constant__from_ast(): {
                        const __gotots_store_1 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        Set$Add$Named_jsnum$Number(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "existingNumbers"), FromString__from_jsnum(Node__from_ast.Text(expression)));
                        break;
                    }
                    case KindBigIntLiteral$constant__from_ast(): {
                        const __gotots_store_2 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        Set$Add$Named_jsnum$PseudoBigInt(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "existingBigInts"), ParseValidBigInt__from_jsnum(Node__from_ast.Text(expression)));
                        break;
                    }
                }
            }
            else {
                let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(typeChecker, Node__from_ast.Expression(clause));
                if (!(__go_symbol === undefined) && !(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && IsEnumMember__from_ast(Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration)) {
                    let enumValue: GoInterface | undefined = Checker__from_checker.GetConstantValue(typeChecker, Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration);
                    if (!(enumValue === undefined)) {
                        caseClauseTrackerState.$go$private$ls$addValue(c, enumValue);
                    }
                }
            }
        }
    }
    return new $goInterfaceAdapter$PointerTo_Named_ls$caseClauseTrackerState(c);
}
export function RangeContainsRange(r1: TextRange__from_core, r2: TextRange__from_core): bool {
    return startEndContainsRange(r1.Pos(), r1.End(), TextRange__from_core.$copy(r2));
}
export function startEndContainsRange(start: int, end: int, textRange: TextRange__from_core): bool {
    return start <= textRange.Pos() && end >= textRange.End();
}
export function getPossibleGenericSignatures(called: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeArgumentCount: int, c: {
    value: Checker__from_checker;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined> {
    let typeAtLocation: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = Checker__from_checker.GetTypeAtLocation(c, called);
    if (IsOptionalChain__from_ast(Node__from_ast.$storageOf(((called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        typeAtLocation = removeOptionality(typeAtLocation, IsOptionalChainRoot__from_ast(Node__from_ast.$storageOf(((called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), true, c);
    }
    let signatures = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>();
    if (IsNewExpression__from_ast(Node__from_ast.$storageOf(((called ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        signatures = Checker__from_checker.GetSignaturesOfType(c, typeAtLocation, SignatureKindConstruct$constant__from_checker());
    }
    else {
        signatures = Checker__from_checker.GetSignaturesOfType(c, typeAtLocation, SignatureKindCall$constant__from_checker());
    }
    return Filter$PointerTo_Named_checker$Signature(signatures, (s: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): bool => {
        return !Signature__from_checker.TypeParameters(s).isNil() && Signature__from_checker.TypeParameters(s).length >= typeArgumentCount;
    });
}
export function removeOptionality(t: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, isOptionalExpression: bool, isOptionalChain: bool, c: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    if (isOptionalExpression) {
        return Checker__from_checker.GetNonNullableType(c, t);
    }
    else if (isOptionalChain) {
        return Checker__from_checker.GetNonOptionalType(c, t);
    }
    return t;
}
export function isNoSubstitutionTemplateLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNoSubstitutionTemplateLiteral$constant__from_ast();
}
export function isTaggedTemplateExpression(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTaggedTemplateExpression$constant__from_ast();
}
export function isInsideTemplateLiteral(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position__shadow_1: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return IsTemplateLiteralKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && (GetTokenPosOfNode__from_scanner(node, sourceFile, false) < position__shadow_1 && position__shadow_1 < Node__from_ast.End(node) || (IsUnterminatedLiteral__from_ast(node) && position__shadow_1 === Node__from_ast.End(node)));
}
export function isTemplateHead(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateHead$constant__from_ast();
}
export function isTemplateTail(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateTail$constant__from_ast();
}
export function findPrecedingMatchingToken(token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, matchingTokenKind: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let closeTokenText = TokenToString__from_scanner(Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
    let matchingTokenText = TokenToString__from_scanner(matchingTokenKind);
    let bestGuessIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(SourceFile__from_ast.Text(sourceFile), matchingTokenText)));
    if (bestGuessIndex === -1) {
        return void 0;
    }
    if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(SourceFile__from_ast.Text(sourceFile), closeTokenText))) < bestGuessIndex) {
        let nodeAtGuess: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, bestGuessIndex + 1);
        if (!(nodeAtGuess === undefined) && Node__from_ast.$storageOf(((nodeAtGuess ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === matchingTokenKind) {
            return nodeAtGuess;
        }
    }
    let tokenKind = Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    let remainingMatchingTokens = 0;
    for (;;) {
        let preceding: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(token));
        if (preceding === undefined) {
            return void 0;
        }
        token = preceding;
        switch (Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case matchingTokenKind: {
                if (remainingMatchingTokens === 0) {
                    return token;
                }
                remainingMatchingTokens--;
                break;
            }
            case tokenKind: {
                remainingMatchingTokens++;
                break;
            }
        }
    }
}
export function findContainingList(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
    let visitNode__shadow_1: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return n;
    };
    let visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        if (!(nodes === undefined) && RangeContainsRange(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)))) {
            list = nodes;
        }
        return nodes;
    };
    VisitEachChildAndJSDoc__from_astnav(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, file, visitNode__shadow_1, visitNodes);
    return list;
}
export function getLeadingCommentRangesOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): iter__from_gostdlib.Seq<CommentRange__from_ast> {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast()) {
        return named_iter.IterSeqValueOperations.$wrap(void 0);
    }
    const __gotots_struct_0 = NodeFactory__from_ast.$zero();
    const __gotots_argument_9 = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0);
    const __gotots_argument_10 = SourceFile__from_ast.Text(file);
    const __gotots_argument_11 = Node__from_ast.Pos(node);
    return GetLeadingCommentRanges__from_scanner(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
}
export function getChildrenFromNonJSDocNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let childNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    Node__from_ast.ForEachChild(node, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        childNodes = childNodes.append(void 0, [child]);
        return false;
    }));
    if (childNodes.length === 0) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    let children = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let pos = Node__from_ast.Pos(node);
    const __gotots_range_5 = childNodes;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
        let scanner__shadow_2: Scanner__from_scanner | undefined = GetScannerForSourceFile__from_scanner(sourceFile, pos);
        for (; pos < Node__from_ast.Pos(child);) {
            let token = Scanner__from_scanner.Token(scanner__shadow_2);
            let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_2);
            let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_2);
            children = children.append(void 0, [SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, node, Scanner__from_scanner.TokenFlags(scanner__shadow_2))]);
            pos = tokenEnd;
            Scanner__from_scanner.Scan(scanner__shadow_2);
        }
        children = children.append(void 0, [child]);
        pos = Node__from_ast.End(child);
    }
    let scanner__shadow_1: Scanner__from_scanner | undefined = GetScannerForSourceFile__from_scanner(sourceFile, pos);
    for (; pos < Node__from_ast.End(node);) {
        let token = Scanner__from_scanner.Token(scanner__shadow_1);
        let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
        let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
        children = children.append(void 0, [SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, node, Scanner__from_scanner.TokenFlags(scanner__shadow_1))]);
        pos = tokenEnd;
        Scanner__from_scanner.Scan(scanner__shadow_1);
    }
    return children;
}
export function getContainingObjectLiteralElement(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let element: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getContainingObjectLiteralElementWorker(node);
    if (!(element === undefined) && (IsObjectLiteralExpression__from_ast(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsJsxAttributes__from_ast(Node__from_ast.$storageOf(((element ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
        return element;
    }
    return void 0;
}
export function getContainingObjectLiteralElementWorker(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindStringLiteral$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNoSubstitutionTemplateLiteral$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNumericLiteral$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindIdentifier$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        __gotots_control_target_1: {
            if (__gotots_switch_selection_0 === 0) {
                if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindComputedPropertyName$constant__from_ast()) {
                    if (isObjectLiteralOrJsxElement(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                        return Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                    }
                    return void 0;
                }
                __gotots_switch_selection_0 = 1;
            }
            if (__gotots_switch_selection_0 === 1) {
                if (isObjectLiteralOrJsxElement(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttributes$constant__from_ast()) &&
                    tsonicTypeScriptRuntime.sameLocation(Node__from_ast.Name(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), node)) {
                    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
                break __gotots_control_target_1;
            }
        }
    }
    return void 0;
}
export function isObjectLiteralOrJsxElement(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsObjectLiteralElement__from_ast(node) || IsJsxAttribute__from_ast(node) || IsJsxSpreadAttribute__from_ast(node);
}
export function nodeSeenTracker(): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined {
    let seen = Set__from_collections.$zero<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((): GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, GoEmptyStruct> => {
        return $goMap$MapOf_PointerTo_Named_ast$Node_To_Struct_void.nil();
    });
    const seen$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => seen, seen$next2 => seen = seen$next2);
    return (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Set$AddIfAbsent$PointerTo_Named_ast$Node(seen$location2, node);
    };
}
export function toContextRange(textRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, contextFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, context: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined {
    if (context === undefined) {
        return textRange;
    }
    let contextRange = getRangeOfNode(context, contextFile, void 0);
    const contextRange$location = tsonicTypeScriptRuntime.boundLocation({}, () => contextRange, contextRange$next => contextRange = contextRange$next);
    if (contextRange.Pos() !== ((textRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.Pos() || contextRange.End() !== ((textRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.End()) {
        return contextRange$location;
    }
    return void 0;
}
export function getReferenceAtPosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, program: {
    value: Program__from_compiler;
} | undefined): refInfo | undefined {
    {
        let referencePath: {
            value: FileReference__from_ast;
        } | undefined = findReferenceInPosition(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles, position__shadow_1);
        if (!(referencePath === undefined)) {
            {
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileFromReference(program, sourceFile, referencePath);
                if (!(file === undefined)) {
                    return new refInfo(file, SourceFile__from_ast.FileName(file), referencePath, false);
                }
            }
            return void 0;
        }
    }
    {
        let typeReferenceDirective: {
            value: FileReference__from_ast;
        } | undefined = findReferenceInPosition(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives, position__shadow_1);
        if (!(typeReferenceDirective === undefined)) {
            {
                let reference: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = Program__from_compiler.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(program, typeReferenceDirective, sourceFile);
                if (!(reference === undefined)) {
                    {
                        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFile(program, ((reference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName);
                        if (!(file === undefined)) {
                            return new refInfo(file, SourceFile__from_ast.FileName(file), typeReferenceDirective, false);
                        }
                    }
                }
            }
            return void 0;
        }
    }
    {
        let libReferenceDirective: {
            value: FileReference__from_ast;
        } | undefined = findReferenceInPosition(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives, position__shadow_1);
        if (!(libReferenceDirective === undefined)) {
            {
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetLibFileFromReference(program, libReferenceDirective);
                if (!(file === undefined)) {
                    return new refInfo(file, SourceFile__from_ast.FileName(file), libReferenceDirective, false);
                }
            }
            return void 0;
        }
    }
    if (SourceFile__from_ast.Imports(sourceFile).length === 0 && ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations.length === 0) {
        return void 0;
    }
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTouchingToken__from_astnav(sourceFile, position__shadow_1);
    if (!isModuleSpecifierLike(node) || !IsExternalModuleNameRelative__from_tspath(Node__from_ast.Text(node))) {
        return void 0;
    }
    {
        let resolution: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = Program__from_compiler.GetResolvedModuleFromModuleSpecifier(program, new GoInterfaceAdapter(sourceFile), node);
        if (!(resolution === undefined)) {
            let verifiedFileName = ((resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
            let fileName = ((resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
            if (fileName === "") {
                fileName = ResolvePath__from_tspath(GetDirectoryPath__from_tspath(SourceFile__from_ast.FileName(sourceFile)), RuntimeSlice.literal<gostring>([Node__from_ast.Text(node)]));
            }
            return new refInfo(Program__from_compiler.GetSourceFile(program, fileName), fileName, void 0, verifiedFileName !== "");
        }
    }
    return void 0;
}
export function getContextualTypeFromParent(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined, contextFlags: ContextFlags__from_checker): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindNewExpression$constant__from_ast(): {
            return Checker__from_checker.GetContextualType(typeChecker, parent, contextFlags);
            break;
        }
        case KindBinaryExpression$constant__from_ast(): {
            if (isEqualityOperatorKind(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
                return Checker__from_checker.GetTypeAtLocation(typeChecker, IfElse$PointerTo_Named_ast$Node(tsonicTypeScriptRuntime.sameLocation(node, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right), BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right));
            }
            return Checker__from_checker.GetContextualType(typeChecker, node, contextFlags);
            break;
        }
        case KindCaseClause$constant__from_ast(): {
            return getSwitchedType(parent, typeChecker);
            break;
        }
        default: {
            return Checker__from_checker.GetContextualType(typeChecker, node, contextFlags);
            break;
        }
    }
}
export function getContextualTypeFromParentOrAncestorTypeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeChecker: {
    value: Checker__from_checker;
} | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJavaScriptFile$constant__from_ast()) >>> 0 === 0) {
        return void 0;
    }
    let contextualType: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined = getContextualTypeFromParent(node, typeChecker, ContextFlagsNone$constant__from_checker());
    if (!(contextualType === undefined)) {
        return contextualType;
    }
    {
        let ancestorTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getAncestorTypeNode(node);
        if (!(ancestorTypeNode === undefined)) {
            return Checker__from_checker.GetTypeAtLocation(typeChecker, ancestorTypeNode);
        }
    }
    return void 0;
}
export function getAncestorTypeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let lastTypeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    FindAncestor__from_ast(node, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (IsTypeNode__from_ast(n)) {
            lastTypeNode = n;
        }
        return !IsQualifiedName__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsTypeNode__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsTypeElement__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    });
    return lastTypeNode;
}
export function isSourceFileWithGlobalExports(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(node === undefined) && IsSourceFile__from_ast(node) && !((Node__from_ast.AsSourceFile(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.GlobalExports.$value.isNil();
}
