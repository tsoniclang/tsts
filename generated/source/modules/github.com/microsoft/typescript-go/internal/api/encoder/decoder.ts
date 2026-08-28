import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, Kind as Kind__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import { ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, KindAbstractKeyword$constant as KindAbstractKeyword$constant__from_ast, KindAccessorKeyword$constant as KindAccessorKeyword$constant__from_ast, KindAmpersandAmpersandEqualsToken$constant as KindAmpersandAmpersandEqualsToken$constant__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindAmpersandEqualsToken$constant as KindAmpersandEqualsToken$constant__from_ast, KindAmpersandToken$constant as KindAmpersandToken$constant__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindAsKeyword$constant as KindAsKeyword$constant__from_ast, KindAssertKeyword$constant as KindAssertKeyword$constant__from_ast, KindAssertsKeyword$constant as KindAssertsKeyword$constant__from_ast, KindAsteriskAsteriskEqualsToken$constant as KindAsteriskAsteriskEqualsToken$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindAsteriskEqualsToken$constant as KindAsteriskEqualsToken$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAsyncKeyword$constant as KindAsyncKeyword$constant__from_ast, KindAtToken$constant as KindAtToken$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindAwaitKeyword$constant as KindAwaitKeyword$constant__from_ast, KindBacktickToken$constant as KindBacktickToken$constant__from_ast, KindBarBarEqualsToken$constant as KindBarBarEqualsToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBarEqualsToken$constant as KindBarEqualsToken$constant__from_ast, KindBarToken$constant as KindBarToken$constant__from_ast, KindBigIntKeyword$constant as KindBigIntKeyword$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindBreakKeyword$constant as KindBreakKeyword$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaretEqualsToken$constant as KindCaretEqualsToken$constant__from_ast, KindCaretToken$constant as KindCaretToken$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCaseKeyword$constant as KindCaseKeyword$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindCatchKeyword$constant as KindCatchKeyword$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindClassKeyword$constant as KindClassKeyword$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConflictMarkerTrivia$constant as KindConflictMarkerTrivia$constant__from_ast, KindConstKeyword$constant as KindConstKeyword$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindContinueKeyword$constant as KindContinueKeyword$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDebuggerKeyword$constant as KindDebuggerKeyword$constant__from_ast, KindDebuggerStatement$constant as KindDebuggerStatement$constant__from_ast, KindDeclareKeyword$constant as KindDeclareKeyword$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDefaultKeyword$constant as KindDefaultKeyword$constant__from_ast, KindDeferKeyword$constant as KindDeferKeyword$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDeleteKeyword$constant as KindDeleteKeyword$constant__from_ast, KindDoKeyword$constant as KindDoKeyword$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindDotToken$constant as KindDotToken$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindElseKeyword$constant as KindElseKeyword$constant__from_ast, KindEmptyStatement$constant as KindEmptyStatement$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumKeyword$constant as KindEnumKeyword$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsEqualsToken$constant as KindEqualsEqualsToken$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindExclamationEqualsToken$constant as KindExclamationEqualsToken$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindExtendsKeyword$constant as KindExtendsKeyword$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFinallyKeyword$constant as KindFinallyKeyword$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForKeyword$constant as KindForKeyword$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFromKeyword$constant as KindFromKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionKeyword$constant as KindFunctionKeyword$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGetKeyword$constant as KindGetKeyword$constant__from_ast, KindGlobalKeyword$constant as KindGlobalKeyword$constant__from_ast, KindGreaterThanEqualsToken$constant as KindGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindHashToken$constant as KindHashToken$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIfKeyword$constant as KindIfKeyword$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImmediateKeyword$constant as KindImmediateKeyword$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportAttribute$constant as KindImportAttribute$constant__from_ast, KindImportAttributes$constant as KindImportAttributes$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportKeyword$constant as KindImportKeyword$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInferKeyword$constant as KindInferKeyword$constant__from_ast, KindInferType$constant as KindInferType$constant__from_ast, KindInstanceOfKeyword$constant as KindInstanceOfKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindInterfaceKeyword$constant as KindInterfaceKeyword$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindIntrinsicKeyword$constant as KindIntrinsicKeyword$constant__from_ast, KindIsKeyword$constant as KindIsKeyword$constant__from_ast, KindJSDoc$constant as KindJSDoc$constant__from_ast, KindJSDocAllType$constant as KindJSDocAllType$constant__from_ast, KindJSDocAugmentsTag$constant as KindJSDocAugmentsTag$constant__from_ast, KindJSDocCallbackTag$constant as KindJSDocCallbackTag$constant__from_ast, KindJSDocCommentTextToken$constant as KindJSDocCommentTextToken$constant__from_ast, KindJSDocDeprecatedTag$constant as KindJSDocDeprecatedTag$constant__from_ast, KindJSDocImplementsTag$constant as KindJSDocImplementsTag$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSDocLink$constant as KindJSDocLink$constant__from_ast, KindJSDocLinkCode$constant as KindJSDocLinkCode$constant__from_ast, KindJSDocLinkPlain$constant as KindJSDocLinkPlain$constant__from_ast, KindJSDocNameReference$constant as KindJSDocNameReference$constant__from_ast, KindJSDocNonNullableType$constant as KindJSDocNonNullableType$constant__from_ast, KindJSDocNullableType$constant as KindJSDocNullableType$constant__from_ast, KindJSDocOptionalType$constant as KindJSDocOptionalType$constant__from_ast, KindJSDocOverloadTag$constant as KindJSDocOverloadTag$constant__from_ast, KindJSDocOverrideTag$constant as KindJSDocOverrideTag$constant__from_ast, KindJSDocParameterTag$constant as KindJSDocParameterTag$constant__from_ast, KindJSDocPrivateTag$constant as KindJSDocPrivateTag$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocProtectedTag$constant as KindJSDocProtectedTag$constant__from_ast, KindJSDocPublicTag$constant as KindJSDocPublicTag$constant__from_ast, KindJSDocReadonlyTag$constant as KindJSDocReadonlyTag$constant__from_ast, KindJSDocReturnTag$constant as KindJSDocReturnTag$constant__from_ast, KindJSDocSatisfiesTag$constant as KindJSDocSatisfiesTag$constant__from_ast, KindJSDocSeeTag$constant as KindJSDocSeeTag$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindJSDocTemplateTag$constant as KindJSDocTemplateTag$constant__from_ast, KindJSDocText$constant as KindJSDocText$constant__from_ast, KindJSDocThisTag$constant as KindJSDocThisTag$constant__from_ast, KindJSDocThrowsTag$constant as KindJSDocThrowsTag$constant__from_ast, KindJSDocTypeExpression$constant as KindJSDocTypeExpression$constant__from_ast, KindJSDocTypeLiteral$constant as KindJSDocTypeLiteral$constant__from_ast, KindJSDocTypeTag$constant as KindJSDocTypeTag$constant__from_ast, KindJSDocTypedefTag$constant as KindJSDocTypedefTag$constant__from_ast, KindJSDocUnknownTag$constant as KindJSDocUnknownTag$constant__from_ast, KindJSDocVariadicType$constant as KindJSDocVariadicType$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxClosingFragment$constant as KindJsxClosingFragment$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxNamespacedName$constant as KindJsxNamespacedName$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxOpeningFragment$constant as KindJsxOpeningFragment$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindJsxTextAllWhiteSpaces$constant as KindJsxTextAllWhiteSpaces$constant__from_ast, KindKeyOfKeyword$constant as KindKeyOfKeyword$constant__from_ast, KindLabeledStatement$constant as KindLabeledStatement$constant__from_ast, KindLessThanEqualsToken$constant as KindLessThanEqualsToken$constant__from_ast, KindLessThanLessThanEqualsToken$constant as KindLessThanLessThanEqualsToken$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, KindLessThanSlashToken$constant as KindLessThanSlashToken$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindLetKeyword$constant as KindLetKeyword$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMetaProperty$constant as KindMetaProperty$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusEqualsToken$constant as KindMinusEqualsToken$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindMissingDeclaration$constant as KindMissingDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindModuleKeyword$constant as KindModuleKeyword$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamedTupleMember$constant as KindNamedTupleMember$constant__from_ast, KindNamespaceExport$constant as KindNamespaceExport$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNamespaceKeyword$constant as KindNamespaceKeyword$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNewKeyword$constant as KindNewKeyword$constant__from_ast, KindNewLineTrivia$constant as KindNewLineTrivia$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindNonTextFileMarkerTrivia$constant as KindNonTextFileMarkerTrivia$constant__from_ast, KindNotEmittedStatement$constant as KindNotEmittedStatement$constant__from_ast, KindNotEmittedTypeElement$constant as KindNotEmittedTypeElement$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOfKeyword$constant as KindOfKeyword$constant__from_ast, KindOmittedExpression$constant as KindOmittedExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindOptionalType$constant as KindOptionalType$constant__from_ast, KindOutKeyword$constant as KindOutKeyword$constant__from_ast, KindOverrideKeyword$constant as KindOverrideKeyword$constant__from_ast, KindPackageKeyword$constant as KindPackageKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPartiallyEmittedExpression$constant as KindPartiallyEmittedExpression$constant__from_ast, KindPercentEqualsToken$constant as KindPercentEqualsToken$constant__from_ast, KindPercentToken$constant as KindPercentToken$constant__from_ast, KindPlusEqualsToken$constant as KindPlusEqualsToken$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPostfixUnaryExpression$constant as KindPostfixUnaryExpression$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPrivateKeyword$constant as KindPrivateKeyword$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindProtectedKeyword$constant as KindProtectedKeyword$constant__from_ast, KindPublicKeyword$constant as KindPublicKeyword$constant__from_ast, KindQualifiedName$constant as KindQualifiedName$constant__from_ast, KindQuestionDotToken$constant as KindQuestionDotToken$constant__from_ast, KindQuestionQuestionEqualsToken$constant as KindQuestionQuestionEqualsToken$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindRequireKeyword$constant as KindRequireKeyword$constant__from_ast, KindRestType$constant as KindRestType$constant__from_ast, KindReturnKeyword$constant as KindReturnKeyword$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSatisfiesKeyword$constant as KindSatisfiesKeyword$constant__from_ast, KindSemicolonClassElement$constant as KindSemicolonClassElement$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSetKeyword$constant as KindSetKeyword$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindSlashEqualsToken$constant as KindSlashEqualsToken$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindStaticKeyword$constant as KindStaticKeyword$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, KindSwitchKeyword$constant as KindSwitchKeyword$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindSyntaxList$constant as KindSyntaxList$constant__from_ast, KindSyntheticExpression$constant as KindSyntheticExpression$constant__from_ast, KindSyntheticReferenceExpression$constant as KindSyntheticReferenceExpression$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateLiteralType$constant as KindTemplateLiteralType$constant__from_ast, KindTemplateLiteralTypeSpan$constant as KindTemplateLiteralTypeSpan$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindThisKeyword$constant as KindThisKeyword$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindThrowKeyword$constant as KindThrowKeyword$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTildeToken$constant as KindTildeToken$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTryKeyword$constant as KindTryKeyword$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindTypeOfKeyword$constant as KindTypeOfKeyword$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUniqueKeyword$constant as KindUniqueKeyword$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindUsingKeyword$constant as KindUsingKeyword$constant__from_ast, KindVarKeyword$constant as KindVarKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, KindWhileKeyword$constant as KindWhileKeyword$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWhitespaceTrivia$constant as KindWhitespaceTrivia$constant__from_ast, KindWithKeyword$constant as KindWithKeyword$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, KindYieldKeyword$constant as KindYieldKeyword$constant__from_ast, ModifierList as ModifierList__from_ast, NewNodeFactory as NewNodeFactory__from_ast, NodeFactoryHooks as NodeFactoryHooks__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$byte, $goInterfaceAdapter$string, $goInterfaceAdapter$uint32, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { HeaderOffsetExtendedData$int, HeaderOffsetNodes$int, HeaderOffsetParseOptions$int, HeaderOffsetStringData$int, HeaderOffsetStringOffsets$int, HeaderSize$int, NodeDataChildMask, NodeDataStringIndexMask, NodeDataTypeExtendedData, NodeDataTypeMask, NodeDataTypeString, NodeOffsetData$int, NodeOffsetEnd$int, NodeOffsetFlags$int, NodeOffsetKind$int, NodeOffsetNext$int, NodeOffsetParent$int, NodeOffsetPos$int, NodeSize$int, ProtocolVersion, SyntaxKindNodeList } from "./encoder.js";
import * as binary__from_gostdlib from "@gotots/gostdlib/encoding/binary.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class astDecoder {
    declare private readonly $goType: void;
    public constructor(public raw: RuntimeSlice<uint8>, public strTable: uint32, public strData: uint32, public extData: uint32, public nodeOff: uint32, public nodeCount: int, public factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, public childBuf: RuntimeSlice<int>, public allStringData: gostring, public nodeArena: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public nodeLists: RuntimeSlice<tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$encoder$allocNodeSlice(d: astDecoder | undefined, capacity: int): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        let start = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeArena.length;
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeArena = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeArena.slice(0, start + capacity, null);
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeArena.slice(start, start, start + capacity);
    }
    static $go$private$encoder$collectChildren(d: astDecoder | undefined, i: int): RuntimeSlice<int> {
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf.slice(0, 0, null);
        if (i + 1 >= (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount) {
            return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf;
        }
        let firstChild = i + 1;
        if (astDecoder.$go$private$encoder$nodeField(d, firstChild, NodeOffsetParent$int) !== i >>> 0) {
            return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf;
        }
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf.append(0, [firstChild]);
        let next = astDecoder.$go$private$encoder$nodeField(d, firstChild, NodeOffsetNext$int);
        for (; next !== 0;) {
            (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf.append(0, [next]);
            next = astDecoder.$go$private$encoder$nodeField(d, next, NodeOffsetNext$int);
        }
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childBuf;
    }
    static $go$private$encoder$createChildrenNode(d: astDecoder | undefined, kind: Kind__from_ast, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let mask = (data & NodeDataChildMask) >>> 0 & 255;
        switch (kind) {
            case KindUnknown$constant__from_ast():
            case KindEndOfFile$constant__from_ast():
            case KindSingleLineCommentTrivia$constant__from_ast():
            case KindMultiLineCommentTrivia$constant__from_ast():
            case KindNewLineTrivia$constant__from_ast():
            case KindWhitespaceTrivia$constant__from_ast():
            case KindConflictMarkerTrivia$constant__from_ast():
            case KindNonTextFileMarkerTrivia$constant__from_ast():
            case KindNumericLiteral$constant__from_ast():
            case KindBigIntLiteral$constant__from_ast():
            case KindStringLiteral$constant__from_ast():
            case KindJsxText$constant__from_ast():
            case KindJsxTextAllWhiteSpaces$constant__from_ast():
            case KindRegularExpressionLiteral$constant__from_ast():
            case KindNoSubstitutionTemplateLiteral$constant__from_ast():
            case KindTemplateHead$constant__from_ast():
            case KindTemplateMiddle$constant__from_ast():
            case KindTemplateTail$constant__from_ast():
            case KindOpenBraceToken$constant__from_ast():
            case KindCloseBraceToken$constant__from_ast():
            case KindOpenParenToken$constant__from_ast():
            case KindCloseParenToken$constant__from_ast():
            case KindOpenBracketToken$constant__from_ast():
            case KindCloseBracketToken$constant__from_ast():
            case KindDotToken$constant__from_ast():
            case KindDotDotDotToken$constant__from_ast():
            case KindSemicolonToken$constant__from_ast():
            case KindCommaToken$constant__from_ast():
            case KindQuestionDotToken$constant__from_ast():
            case KindLessThanToken$constant__from_ast():
            case KindLessThanSlashToken$constant__from_ast():
            case KindGreaterThanToken$constant__from_ast():
            case KindLessThanEqualsToken$constant__from_ast():
            case KindGreaterThanEqualsToken$constant__from_ast():
            case KindEqualsEqualsToken$constant__from_ast():
            case KindExclamationEqualsToken$constant__from_ast():
            case KindEqualsEqualsEqualsToken$constant__from_ast():
            case KindExclamationEqualsEqualsToken$constant__from_ast():
            case KindEqualsGreaterThanToken$constant__from_ast():
            case KindPlusToken$constant__from_ast():
            case KindMinusToken$constant__from_ast():
            case KindAsteriskToken$constant__from_ast():
            case KindAsteriskAsteriskToken$constant__from_ast():
            case KindSlashToken$constant__from_ast():
            case KindPercentToken$constant__from_ast():
            case KindPlusPlusToken$constant__from_ast():
            case KindMinusMinusToken$constant__from_ast():
            case KindLessThanLessThanToken$constant__from_ast():
            case KindGreaterThanGreaterThanToken$constant__from_ast():
            case KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast():
            case KindAmpersandToken$constant__from_ast():
            case KindBarToken$constant__from_ast():
            case KindCaretToken$constant__from_ast():
            case KindExclamationToken$constant__from_ast():
            case KindTildeToken$constant__from_ast():
            case KindAmpersandAmpersandToken$constant__from_ast():
            case KindBarBarToken$constant__from_ast():
            case KindQuestionToken$constant__from_ast():
            case KindColonToken$constant__from_ast():
            case KindAtToken$constant__from_ast():
            case KindQuestionQuestionToken$constant__from_ast():
            case KindBacktickToken$constant__from_ast():
            case KindHashToken$constant__from_ast():
            case KindEqualsToken$constant__from_ast():
            case KindPlusEqualsToken$constant__from_ast():
            case KindMinusEqualsToken$constant__from_ast():
            case KindAsteriskEqualsToken$constant__from_ast():
            case KindAsteriskAsteriskEqualsToken$constant__from_ast():
            case KindSlashEqualsToken$constant__from_ast():
            case KindPercentEqualsToken$constant__from_ast():
            case KindLessThanLessThanEqualsToken$constant__from_ast():
            case KindGreaterThanGreaterThanEqualsToken$constant__from_ast():
            case KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast():
            case KindAmpersandEqualsToken$constant__from_ast():
            case KindBarEqualsToken$constant__from_ast():
            case KindBarBarEqualsToken$constant__from_ast():
            case KindAmpersandAmpersandEqualsToken$constant__from_ast():
            case KindQuestionQuestionEqualsToken$constant__from_ast():
            case KindCaretEqualsToken$constant__from_ast():
            case KindIdentifier$constant__from_ast():
            case KindPrivateIdentifier$constant__from_ast():
            case KindJSDocCommentTextToken$constant__from_ast():
            case KindBreakKeyword$constant__from_ast():
            case KindCaseKeyword$constant__from_ast():
            case KindCatchKeyword$constant__from_ast():
            case KindClassKeyword$constant__from_ast():
            case KindConstKeyword$constant__from_ast():
            case KindContinueKeyword$constant__from_ast():
            case KindDebuggerKeyword$constant__from_ast():
            case KindDefaultKeyword$constant__from_ast():
            case KindDeleteKeyword$constant__from_ast():
            case KindDoKeyword$constant__from_ast():
            case KindElseKeyword$constant__from_ast():
            case KindEnumKeyword$constant__from_ast():
            case KindExportKeyword$constant__from_ast():
            case KindExtendsKeyword$constant__from_ast():
            case KindFinallyKeyword$constant__from_ast():
            case KindForKeyword$constant__from_ast():
            case KindFunctionKeyword$constant__from_ast():
            case KindIfKeyword$constant__from_ast():
            case KindInKeyword$constant__from_ast():
            case KindInstanceOfKeyword$constant__from_ast():
            case KindNewKeyword$constant__from_ast():
            case KindReturnKeyword$constant__from_ast():
            case KindSwitchKeyword$constant__from_ast():
            case KindThrowKeyword$constant__from_ast():
            case KindTryKeyword$constant__from_ast():
            case KindTypeOfKeyword$constant__from_ast():
            case KindVarKeyword$constant__from_ast():
            case KindWhileKeyword$constant__from_ast():
            case KindWithKeyword$constant__from_ast():
            case KindImplementsKeyword$constant__from_ast():
            case KindInterfaceKeyword$constant__from_ast():
            case KindLetKeyword$constant__from_ast():
            case KindPackageKeyword$constant__from_ast():
            case KindPrivateKeyword$constant__from_ast():
            case KindProtectedKeyword$constant__from_ast():
            case KindPublicKeyword$constant__from_ast():
            case KindStaticKeyword$constant__from_ast():
            case KindYieldKeyword$constant__from_ast():
            case KindAbstractKeyword$constant__from_ast():
            case KindAccessorKeyword$constant__from_ast():
            case KindAsKeyword$constant__from_ast():
            case KindAssertsKeyword$constant__from_ast():
            case KindAssertKeyword$constant__from_ast():
            case KindAsyncKeyword$constant__from_ast():
            case KindAwaitKeyword$constant__from_ast():
            case KindConstructorKeyword$constant__from_ast():
            case KindDeclareKeyword$constant__from_ast():
            case KindGetKeyword$constant__from_ast():
            case KindImmediateKeyword$constant__from_ast():
            case KindInferKeyword$constant__from_ast():
            case KindIsKeyword$constant__from_ast():
            case KindKeyOfKeyword$constant__from_ast():
            case KindModuleKeyword$constant__from_ast():
            case KindNamespaceKeyword$constant__from_ast():
            case KindOutKeyword$constant__from_ast():
            case KindReadonlyKeyword$constant__from_ast():
            case KindRequireKeyword$constant__from_ast():
            case KindSatisfiesKeyword$constant__from_ast():
            case KindSetKeyword$constant__from_ast():
            case KindTypeKeyword$constant__from_ast():
            case KindUniqueKeyword$constant__from_ast():
            case KindUsingKeyword$constant__from_ast():
            case KindFromKeyword$constant__from_ast():
            case KindGlobalKeyword$constant__from_ast():
            case KindOverrideKeyword$constant__from_ast():
            case KindOfKeyword$constant__from_ast():
            case KindDeferKeyword$constant__from_ast(): {
                return [NodeFactory__from_ast.NewToken((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind), void 0];
                break;
            }
            case KindQualifiedName$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewQualifiedName((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, left, right), void 0];
                break;
            }
            case KindComputedPropertyName$constant__from_ast(): {
                return [NodeFactory__from_ast.NewComputedPropertyName((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindDecorator$constant__from_ast(): {
                return [NodeFactory__from_ast.NewDecorator((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindEmptyStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewEmptyStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindIfStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let thenStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let elseStatement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewIfStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, thenStatement, elseStatement), void 0];
                break;
            }
            case KindDoStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewDoStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, statement, expression), void 0];
                break;
            }
            case KindWhileStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewWhileStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, statement), void 0];
                break;
            }
            case KindForStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let condition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let incrementor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewForStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, initializer, condition, incrementor, statement), void 0];
                break;
            }
            case KindForInStatement$constant__from_ast():
            case KindForOfStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let awaitModifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewForInOrOfStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind, awaitModifier, initializer, expression, statement), void 0];
                break;
            }
            case KindBreakStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewBreakStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindContinueStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewContinueStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindReturnStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewReturnStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindWithStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewWithStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, statement), void 0];
                break;
            }
            case KindSwitchStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let caseBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewSwitchStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, caseBlock), void 0];
                break;
            }
            case KindCaseBlock$constant__from_ast(): {
                return [NodeFactory__from_ast.NewCaseBlock((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindCaseClause$constant__from_ast():
            case KindDefaultClause$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewCaseOrDefaultClause((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind, expression, statements), void 0];
                break;
            }
            case KindThrowStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewThrowStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindTryStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tryBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let catchClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let finallyBlock: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewTryStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tryBlock, catchClause, finallyBlock), void 0];
                break;
            }
            case KindCatchClause$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let variableDeclaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let block: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewCatchClause((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, variableDeclaration, block), void 0];
                break;
            }
            case KindDebuggerStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewDebuggerStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindLabeledStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let label: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let statement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewLabeledStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, label, statement), void 0];
                break;
            }
            case KindExpressionStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewExpressionStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindBlock$constant__from_ast(): {
                let multiLine = (commonData & 1) !== 0;
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                if (childIndices.length > 0) {
                    list = astDecoder.$go$private$encoder$nodeListAt(d, childIndices.get(0));
                }
                return [NodeFactory__from_ast.NewBlock((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, list, multiLine), void 0];
                break;
            }
            case KindVariableStatement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let declarationList: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewVariableStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, declarationList), void 0];
                break;
            }
            case KindVariableDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let exclamationToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewVariableDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, name, exclamationToken, typeNode, initializer), void 0];
                break;
            }
            case KindVariableDeclarationList$constant__from_ast(): {
                return [NodeFactory__from_ast.NewVariableDeclarationList((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices), 0), void 0];
                break;
            }
            case KindObjectBindingPattern$constant__from_ast():
            case KindArrayBindingPattern$constant__from_ast(): {
                return [NodeFactory__from_ast.NewBindingPattern((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindParameter$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewParameterDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, dotDotDotToken, name, questionToken, typeNode, initializer), void 0];
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewBindingElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, dotDotDotToken, propertyName, name, initializer), void 0];
                break;
            }
            case KindMissingDeclaration$constant__from_ast(): {
                let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                if (childIndices.length > 0) {
                    mods = astDecoder.$go$private$encoder$modifierListAt(d, childIndices.get(0));
                }
                return [NodeFactory__from_ast.NewMissingDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, mods), void 0];
                break;
            }
            case KindFunctionDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 6));
                return [NodeFactory__from_ast.NewFunctionDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, asteriskToken, name, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindClassDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewClassDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, heritageClauses, members), void 0];
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewClassExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, heritageClauses, members), void 0];
                break;
            }
            case KindHeritageClause$constant__from_ast(): {
                let token = KindExtendsKeyword$constant__from_ast();
                if ((commonData & 1) !== 0) {
                    token = KindImplementsKeyword$constant__from_ast();
                }
                return [NodeFactory__from_ast.NewHeritageClause((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, token, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindInterfaceDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let heritageClauses: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewInterfaceDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, heritageClauses, members), void 0];
                break;
            }
            case KindTypeAliasDeclaration$constant__from_ast():
            case KindJSTypeAliasDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                if (kind === KindJSTypeAliasDeclaration$constant__from_ast()) {
                    return [NodeFactory__from_ast.NewJSTypeAliasDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, typeNode), void 0];
                }
                return [NodeFactory__from_ast.NewTypeAliasDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, typeNode), void 0];
                break;
            }
            case KindEnumMember$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewEnumMember((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, name, initializer), void 0];
                break;
            }
            case KindEnumDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewEnumDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, members), void 0];
                break;
            }
            case KindModuleBlock$constant__from_ast(): {
                return [NodeFactory__from_ast.NewModuleBlock((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindNotEmittedStatement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNotEmittedStatement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindNotEmittedTypeElement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNotEmittedTypeElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindImportDeclaration$constant__from_ast():
            case KindJSImportDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                if (kind === KindJSImportDeclaration$constant__from_ast()) {
                    return [NodeFactory__from_ast.NewJSImportDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, importClause, moduleSpecifier, attributes), void 0];
                }
                return [NodeFactory__from_ast.NewImportDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, importClause, moduleSpecifier, attributes), void 0];
                break;
            }
            case KindExternalModuleReference$constant__from_ast(): {
                return [NodeFactory__from_ast.NewExternalModuleReference((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindNamespaceImport$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNamespaceImport((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindNamedImports$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNamedImports((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                let isExportEquals = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewExportAssignment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, isExportEquals, typeNode, expression), void 0];
                break;
            }
            case KindNamespaceExportDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewNamespaceExportDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name), void 0];
                break;
            }
            case KindNamespaceExport$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNamespaceExport((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindNamedExports$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNamedExports((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindExportSpecifier$constant__from_ast(): {
                let isTypeOnly = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewExportSpecifier((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, isTypeOnly, propertyName, name), void 0];
                break;
            }
            case KindCallSignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewCallSignatureDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindConstructSignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewConstructSignatureDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindConstructor$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewConstructorDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindGetAccessor$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewGetAccessorDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindSetAccessor$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewSetAccessorDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindIndexSignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewIndexSignatureDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, parameters, typeNode), void 0];
                break;
            }
            case KindMethodSignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewMethodSignatureDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, postfixToken, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindMethodDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 6));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 7));
                return [NodeFactory__from_ast.NewMethodDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, asteriskToken, name, postfixToken, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindPropertySignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewPropertySignatureDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, postfixToken, typeNode, initializer), void 0];
                break;
            }
            case KindPropertyDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewPropertyDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, postfixToken, typeNode, initializer), void 0];
                break;
            }
            case KindSemicolonClassElement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewSemicolonClassElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindClassStaticBlockDeclaration$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewClassStaticBlockDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, body), void 0];
                break;
            }
            case KindOmittedExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewOmittedExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindFalseKeyword$constant__from_ast():
            case KindImportKeyword$constant__from_ast():
            case KindNullKeyword$constant__from_ast():
            case KindSuperKeyword$constant__from_ast():
            case KindThisKeyword$constant__from_ast():
            case KindTrueKeyword$constant__from_ast(): {
                return [NodeFactory__from_ast.NewKeywordExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind), void 0];
                break;
            }
            case KindBinaryExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let operatorToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewBinaryExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, left, typeNode, operatorToken, right), void 0];
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                let operator = 0;
                switch (commonData & 7) {
                    case 0: {
                        operator = KindPlusToken$constant__from_ast();
                        break;
                    }
                    case 1: {
                        operator = KindMinusToken$constant__from_ast();
                        break;
                    }
                    case 2: {
                        operator = KindTildeToken$constant__from_ast();
                        break;
                    }
                    case 3: {
                        operator = KindExclamationToken$constant__from_ast();
                        break;
                    }
                    case 4: {
                        operator = KindPlusPlusToken$constant__from_ast();
                        break;
                    }
                    case 5: {
                        operator = KindMinusMinusToken$constant__from_ast();
                        break;
                    }
                }
                return [NodeFactory__from_ast.NewPrefixUnaryExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, operator, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindPostfixUnaryExpression$constant__from_ast(): {
                let operator = KindPlusPlusToken$constant__from_ast();
                if ((commonData & 1) !== 0) {
                    operator = KindMinusMinusToken$constant__from_ast();
                }
                return [NodeFactory__from_ast.NewPostfixUnaryExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices), operator), void 0];
                break;
            }
            case KindYieldExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewYieldExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, asteriskToken, expression), void 0];
                break;
            }
            case KindArrowFunction$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let equalsGreaterThanToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewArrowFunction((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, typeParameters, parameters, typeNode, void 0, equalsGreaterThanToken, body), void 0];
                break;
            }
            case KindFunctionExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let asteriskToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 6));
                return [NodeFactory__from_ast.NewFunctionExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, asteriskToken, name, typeParameters, parameters, typeNode, void 0, body), void 0];
                break;
            }
            case KindAsExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewAsExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, typeNode), void 0];
                break;
            }
            case KindSatisfiesExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewSatisfiesExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, typeNode), void 0];
                break;
            }
            case KindConditionalExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let condition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let whenTrue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let colonToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let whenFalse: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewConditionalExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, condition, questionToken, whenTrue, colonToken, whenFalse), void 0];
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let questionDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewPropertyAccessExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, questionDotToken, name, 0), void 0];
                break;
            }
            case KindElementAccessExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let questionDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let argumentExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewElementAccessExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, questionDotToken, argumentExpression, 0), void 0];
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let questionDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let __go_arguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewCallExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, questionDotToken, typeArguments, __go_arguments, 0), void 0];
                break;
            }
            case KindNewExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let __go_arguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewNewExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, typeArguments, __go_arguments), void 0];
                break;
            }
            case KindMetaProperty$constant__from_ast(): {
                let keywordToken = KindImportKeyword$constant__from_ast();
                if ((commonData & 1) !== 0) {
                    keywordToken = KindNewKeyword$constant__from_ast();
                }
                return [NodeFactory__from_ast.NewMetaProperty((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, keywordToken, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindNonNullExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewNonNullExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices), 0), void 0];
                break;
            }
            case KindSpreadElement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewSpreadElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindTemplateExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let head: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let templateSpans: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTemplateExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, head, templateSpans), void 0];
                break;
            }
            case KindTemplateSpan$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let literal: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTemplateSpan((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, literal), void 0];
                break;
            }
            case KindTaggedTemplateExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let questionDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let template: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewTaggedTemplateExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tag, questionDotToken, typeArguments, template, 0), void 0];
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewParenthesizedExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindArrayLiteralExpression$constant__from_ast(): {
                let multiLine = (commonData & 1) !== 0;
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                if (childIndices.length > 0) {
                    list = astDecoder.$go$private$encoder$nodeListAt(d, childIndices.get(0));
                }
                return [NodeFactory__from_ast.NewArrayLiteralExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, list, multiLine), void 0];
                break;
            }
            case KindObjectLiteralExpression$constant__from_ast(): {
                let multiLine = (commonData & 1) !== 0;
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                if (childIndices.length > 0) {
                    list = astDecoder.$go$private$encoder$nodeListAt(d, childIndices.get(0));
                }
                return [NodeFactory__from_ast.NewObjectLiteralExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, list, multiLine), void 0];
                break;
            }
            case KindSpreadAssignment$constant__from_ast(): {
                return [NodeFactory__from_ast.NewSpreadAssignment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindPropertyAssignment$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewPropertyAssignment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, postfixToken, typeNode, initializer), void 0];
                break;
            }
            case KindShorthandPropertyAssignment$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let postfixToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let equalsToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let objectAssignmentInitializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewShorthandPropertyAssignment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, postfixToken, typeNode, equalsToken, objectAssignmentInitializer), void 0];
                break;
            }
            case KindDeleteExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewDeleteExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindTypeOfExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewTypeOfExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindVoidExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewVoidExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindAwaitExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewAwaitExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindTypeAssertionExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTypeAssertion((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeNode, expression), void 0];
                break;
            }
            case KindVoidKeyword$constant__from_ast():
            case KindAnyKeyword$constant__from_ast():
            case KindBooleanKeyword$constant__from_ast():
            case KindIntrinsicKeyword$constant__from_ast():
            case KindNeverKeyword$constant__from_ast():
            case KindNumberKeyword$constant__from_ast():
            case KindObjectKeyword$constant__from_ast():
            case KindStringKeyword$constant__from_ast():
            case KindSymbolKeyword$constant__from_ast():
            case KindUndefinedKeyword$constant__from_ast():
            case KindUnknownKeyword$constant__from_ast():
            case KindBigIntKeyword$constant__from_ast(): {
                return [NodeFactory__from_ast.NewKeywordTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind), void 0];
                break;
            }
            case KindUnionType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewUnionTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindIntersectionType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewIntersectionTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindConditionalType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let checkType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let extendsType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let trueType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let falseType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewConditionalTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, checkType, extendsType, trueType, falseType), void 0];
                break;
            }
            case KindTypeOperator$constant__from_ast(): {
                let operator = 0;
                switch (commonData & 3) {
                    case 0: {
                        operator = KindKeyOfKeyword$constant__from_ast();
                        break;
                    }
                    case 1: {
                        operator = KindReadonlyKeyword$constant__from_ast();
                        break;
                    }
                    case 2: {
                        operator = KindUniqueKeyword$constant__from_ast();
                        break;
                    }
                }
                return [NodeFactory__from_ast.NewTypeOperatorNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, operator, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindInferType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewInferTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindArrayType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewArrayTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindIndexedAccessType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let objectType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let indexType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewIndexedAccessTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, objectType, indexType), void 0];
                break;
            }
            case KindTypeReference$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTypeReferenceNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeName, typeArguments), void 0];
                break;
            }
            case KindExpressionWithTypeArguments$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewExpressionWithTypeArguments((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, typeArguments), void 0];
                break;
            }
            case KindLiteralType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewLiteralTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindThisType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewThisTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindTypePredicate$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let assertsModifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameterName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewTypePredicateNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, assertsModifier, parameterName, typeNode), void 0];
                break;
            }
            case KindImportAttribute$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewImportAttribute((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, name, value), void 0];
                break;
            }
            case KindImportAttributes$constant__from_ast(): {
                let multiLine = (commonData & 1) !== 0;
                let token = KindWithKeyword$constant__from_ast();
                if (((commonData >> 1) & 1) !== 0) {
                    token = KindAssertKeyword$constant__from_ast();
                }
                let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
                if (childIndices.length > 0) {
                    list = astDecoder.$go$private$encoder$nodeListAt(d, childIndices.get(0));
                }
                return [NodeFactory__from_ast.NewImportAttributes((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, token, list, multiLine), void 0];
                break;
            }
            case KindTypeQuery$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let exprName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTypeQueryNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, exprName, typeArguments), void 0];
                break;
            }
            case KindMappedType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let readonlyToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeParameter: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let nameType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 5));
                return [NodeFactory__from_ast.NewMappedTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, readonlyToken, typeParameter, nameType, questionToken, typeNode, members), void 0];
                break;
            }
            case KindTypeLiteral$constant__from_ast(): {
                return [NodeFactory__from_ast.NewTypeLiteralNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindTupleType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewTupleTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindNamedTupleMember$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let questionToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewNamedTupleMember((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, dotDotDotToken, name, questionToken, typeNode), void 0];
                break;
            }
            case KindOptionalType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewOptionalTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindRestType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewRestTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindParenthesizedType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewParenthesizedTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindFunctionType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewFunctionTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindConstructorType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewConstructorTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindTemplateLiteralType$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let head: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let templateSpans: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTemplateLiteralTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, head, templateSpans), void 0];
                break;
            }
            case KindTemplateLiteralTypeSpan$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let literal: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewTemplateLiteralTypeSpan((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeNode, literal), void 0];
                break;
            }
            case KindSyntheticExpression$constant__from_ast(): {
                const __gotots_results_2 = decodeNodeCommonData_SyntheticExpression(commonData);
                let typeNode: $goInterface$Interface_void | undefined = __gotots_results_2[0];
                let isSpread = __gotots_results_2[1];
                return [NodeFactory__from_ast.NewSyntheticExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeNode, isSpread, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindPartiallyEmittedExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewPartiallyEmittedExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJsxElement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let openingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let closingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJsxElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, openingElement, children, closingElement), void 0];
                break;
            }
            case KindJsxAttributes$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJsxAttributes((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleNodeListChild(d, childIndices)), void 0];
                break;
            }
            case KindJsxNamespacedName$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let __go_namespace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJsxNamespacedName((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, __go_namespace, name), void 0];
                break;
            }
            case KindJsxOpeningElement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJsxOpeningElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeArguments, attributes), void 0];
                break;
            }
            case KindJsxSelfClosingElement$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJsxSelfClosingElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeArguments, attributes), void 0];
                break;
            }
            case KindJsxFragment$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let openingFragment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let children: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let closingFragment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJsxFragment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, openingFragment, children, closingFragment), void 0];
                break;
            }
            case KindJsxOpeningFragment$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJsxOpeningFragment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindJsxClosingFragment$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJsxClosingFragment((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindJsxAttribute$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJsxAttribute((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, name, initializer), void 0];
                break;
            }
            case KindJsxSpreadAttribute$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJsxSpreadAttribute((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJsxClosingElement$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJsxClosingElement((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJsxExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let dotDotDotToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJsxExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, dotDotDotToken, expression), void 0];
                break;
            }
            case KindSyntaxList$constant__from_ast(): {
                let nodes = astDecoder.$go$private$encoder$allocNodeSlice(d, childIndices.length);
                const __gotots_range_1 = childIndices;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_index_1;
                    const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
                    let i = __gotots_range_value_1;
                    let ci = __gotots_range_value_2;
                    nodes.set(i, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci));
                }
                return [NodeFactory__from_ast.NewSyntaxList((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, nodes), void 0];
                break;
            }
            case KindJSDoc$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let tags: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDoc((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, comment, tags), void 0];
                break;
            }
            case KindJSDocTypeExpression$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocTypeExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJSDocNonNullableType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocNonNullableType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJSDocNullableType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocNullableType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJSDocAllType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocAllType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory), void 0];
                break;
            }
            case KindJSDocVariadicType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocVariadicType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJSDocOptionalType$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocOptionalType((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindJSDocTypeTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocTypeTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocUnknownTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocUnknownTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocTemplateTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let constraint: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewJSDocTemplateTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, constraint, typeParameters, comment), void 0];
                break;
            }
            case KindJSDocReturnTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocReturnTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocPublicTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocPublicTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocPrivateTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocPrivateTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocProtectedTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocProtectedTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocReadonlyTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocReadonlyTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocOverrideTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocOverrideTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocDeprecatedTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewJSDocDeprecatedTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, comment), void 0];
                break;
            }
            case KindJSDocSeeTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let nameExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocSeeTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, nameExpression, comment), void 0];
                break;
            }
            case KindJSDocImplementsTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocImplementsTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, className, comment), void 0];
                break;
            }
            case KindJSDocAugmentsTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let className: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocAugmentsTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, className, comment), void 0];
                break;
            }
            case KindJSDocSatisfiesTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocSatisfiesTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocThrowsTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocThrowsTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocThisTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocThisTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocImportTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewJSDocImportTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, importClause, moduleSpecifier, attributes, comment), void 0];
                break;
            }
            case KindJSDocCallbackTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewJSDocCallbackTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, name, comment), void 0];
                break;
            }
            case KindJSDocOverloadTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocOverloadTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, comment), void 0];
                break;
            }
            case KindJSDocTypedefTag$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewJSDocTypedefTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, tagName, typeExpression, name, comment), void 0];
                break;
            }
            case KindJSDocSignature$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let typeParameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let parameters: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewJSDocSignature((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, typeParameters, parameters, typeNode), void 0];
                break;
            }
            case KindJSDocNameReference$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocNameReference((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$singleChild(d, childIndices)), void 0];
                break;
            }
            case KindModuleDeclaration$constant__from_ast(): {
                let keyword = KindModuleKeyword$constant__from_ast();
                if ((commonData & 1) !== 0) {
                    keyword = KindNamespaceKeyword$constant__from_ast();
                }
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewModuleDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, keyword, name, body), void 0];
                break;
            }
            case KindImportEqualsDeclaration$constant__from_ast(): {
                let isTypeOnly = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let moduleReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                return [NodeFactory__from_ast.NewImportEqualsDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, isTypeOnly, name, moduleReference), void 0];
                break;
            }
            case KindExportDeclaration$constant__from_ast(): {
                let isTypeOnly = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewExportDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes), void 0];
                break;
            }
            case KindImportType$constant__from_ast(): {
                let isTypeOf = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let argument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let qualifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let typeArguments: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewImportTypeNode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, isTypeOf, argument, attributes, qualifier, typeArguments), void 0];
                break;
            }
            case KindImportClause$constant__from_ast(): {
                let phaseModifier = 0;
                switch (commonData & 3) {
                    case 1: {
                        phaseModifier = KindTypeKeyword$constant__from_ast();
                        break;
                    }
                    case 2: {
                        phaseModifier = KindDeferKeyword$constant__from_ast();
                        break;
                    }
                }
                let it = newChildIter(childIndices);
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewImportClause((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, phaseModifier, name, namedBindings), void 0];
                break;
            }
            case KindImportSpecifier$constant__from_ast(): {
                let isTypeOnly = (commonData & 1) !== 0;
                let it = newChildIter(childIndices);
                let propertyName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewImportSpecifier((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, isTypeOnly, propertyName, name), void 0];
                break;
            }
            case KindTypeParameter$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = astDecoder.$go$private$encoder$modifierListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let constraint: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                let defaultType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 4));
                return [NodeFactory__from_ast.NewTypeParameterDeclaration((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, modifiers, name, constraint, expression, defaultType), void 0];
                break;
            }
            case KindSyntheticReferenceExpression$constant__from_ast(): {
                let it = newChildIter(childIndices);
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                return [NodeFactory__from_ast.NewSyntheticReferenceExpression((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, expression, thisArg), void 0];
                break;
            }
            case KindJSDocTypeLiteral$constant__from_ast(): {
                let isArrayType = (commonData & 1) !== 0;
                let nodes = astDecoder.$go$private$encoder$allocNodeSlice(d, childIndices.length);
                const __gotots_range_2 = childIndices;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_3 = __gotots_range_index_2;
                    const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
                    let i = __gotots_range_value_3;
                    let ci = __gotots_range_value_4;
                    nodes.set(i, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci));
                }
                return [NodeFactory__from_ast.NewJSDocTypeLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, nodes, isArrayType), void 0];
                break;
            }
            case KindJSDocParameterTag$constant__from_ast():
            case KindJSDocPropertyTag$constant__from_ast(): {
                let isBracketed = (commonData & 1) !== 0;
                let isNameFirst = (commonData & 2) !== 0;
                let it = newChildIter(childIndices);
                let tagName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 0));
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 1));
                let typeExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = astDecoder.$go$private$encoder$nodeAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 2));
                let comment: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = astDecoder.$go$private$encoder$nodeListAt(d, childIterator.$go$private$encoder$nextIf(it, mask, 3));
                return [NodeFactory__from_ast.NewJSDocParameterOrPropertyTag((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, kind, tagName, name, isBracketed, typeExpression, isNameFirst, comment), void 0];
                break;
            }
            default: {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unhandled node kind %v with %d children", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ast$Kind(kind), new GoInterfaceAdapter(childIndices.length)])))];
                break;
            }
        }
    }
    static $go$private$encoder$createExtendedNode(d: astDecoder | undefined, kind: Kind__from_ast, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        switch (kind) {
            case KindStringLiteral$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_StringLiteral(d, data, childIndices, commonData);
                break;
            }
            case KindNumericLiteral$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_NumericLiteral(d, data, childIndices, commonData);
                break;
            }
            case KindBigIntLiteral$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_BigIntLiteral(d, data, childIndices, commonData);
                break;
            }
            case KindRegularExpressionLiteral$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_RegularExpressionLiteral(d, data, childIndices, commonData);
                break;
            }
            case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_NoSubstitutionTemplateLiteral(d, data, childIndices, commonData);
                break;
            }
            case KindTemplateHead$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_TemplateHead(d, data, childIndices, commonData);
                break;
            }
            case KindTemplateMiddle$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_TemplateMiddle(d, data, childIndices, commonData);
                break;
            }
            case KindTemplateTail$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_TemplateTail(d, data, childIndices, commonData);
                break;
            }
            case KindSourceFile$constant__from_ast(): {
                return astDecoder.$go$private$encoder$decodeExtendedData_u5f_SourceFile(d, data, childIndices, commonData);
                break;
            }
            default: {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unknown extended data node kind %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ast$Kind(kind)])))];
                break;
            }
        }
    }
    static $go$private$encoder$createNode(d: astDecoder | undefined, kind: Kind__from_ast, data: uint32, childIndices: RuntimeSlice<int>): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let dataType = (data & NodeDataTypeMask) >>> 0;
        let commonData = ((data >>> 24) & 63) >>> 0 & 255;
        switch (dataType) {
            case NodeDataTypeString: {
                return astDecoder.$go$private$encoder$createStringNode(d, kind, data, commonData);
                break;
            }
            case NodeDataTypeExtendedData: {
                return astDecoder.$go$private$encoder$createExtendedNode(d, kind, data, childIndices, commonData);
                break;
            }
            default: {
                return astDecoder.$go$private$encoder$createChildrenNode(d, kind, data, childIndices, commonData);
                break;
            }
        }
    }
    static $go$private$encoder$createStringNode(d: astDecoder | undefined, kind: Kind__from_ast, data: uint32, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let strIdx = (data & NodeDataStringIndexMask) >>> 0;
        let text = astDecoder.$go$private$encoder$getString(d, strIdx);
        switch (kind) {
            case KindIdentifier$constant__from_ast(): {
                return [NodeFactory__from_ast.NewIdentifier((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, text), void 0];
                break;
            }
            case KindPrivateIdentifier$constant__from_ast(): {
                return [NodeFactory__from_ast.NewPrivateIdentifier((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, text), void 0];
                break;
            }
            case KindJsxText$constant__from_ast(): {
                let containsOnlyTriviaWhiteSpaces = (commonData & 1) !== 0;
                return [NodeFactory__from_ast.NewJsxText((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, text, containsOnlyTriviaWhiteSpaces), void 0];
                break;
            }
            case KindJSDocText$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocText((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, RuntimeSlice.literal<gostring>([text])), void 0];
                break;
            }
            case KindJSDocLink$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocLink((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, void 0, RuntimeSlice.literal<gostring>([text])), void 0];
                break;
            }
            case KindJSDocLinkPlain$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocLinkPlain((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, void 0, RuntimeSlice.literal<gostring>([text])), void 0];
                break;
            }
            case KindJSDocLinkCode$constant__from_ast(): {
                return [NodeFactory__from_ast.NewJSDocLinkCode((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, void 0, RuntimeSlice.literal<gostring>([text])), void 0];
                break;
            }
            default: {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unknown string node kind %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ast$Kind(kind)])))];
                break;
            }
        }
    }
    static $go$private$encoder$decode(d: astDecoder | undefined): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        if ((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount < 2) {
            return [void 0, GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("no nodes to decode"))];
        }
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount, null, void 0);
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeLists = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined>((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount, null, void 0);
        (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeArena = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount, void 0);
        for (let i = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount - 1; i >= 1; i--) {
            let kind = astDecoder.$go$private$encoder$nodeField(d, i, NodeOffsetKind$int);
            let pos = astDecoder.$go$private$encoder$nodeField(d, i, NodeOffsetPos$int);
            let end = astDecoder.$go$private$encoder$nodeField(d, i, NodeOffsetEnd$int);
            let data = astDecoder.$go$private$encoder$nodeField(d, i, NodeOffsetData$int);
            let childIndices = astDecoder.$go$private$encoder$collectChildren(d, i);
            if (kind === SyntaxKindNodeList) {
                let childNodes = astDecoder.$go$private$encoder$allocNodeSlice(d, childIndices.length);
                const __gotots_range_0 = childIndices;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                    let ci = __gotots_range_value_0;
                    if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci) === undefined)) {
                        childNodes = childNodes.append(void 0, [(d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci)]);
                    }
                }
                let nl: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, childNodes);
                NodeList__from_ast.$storageOf(((nl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(pos, end));
                (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeLists.set(i, nl);
                continue;
            }
            const __gotots_results_1 = astDecoder.$go$private$encoder$createNode(d, kind << 16 >> 16, data, childIndices);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_1[0];
            let err: GoInterface | undefined = __gotots_results_1[1];
            if (!(err === undefined)) {
                return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("at node %d (kind %v): %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(i), new $goInterfaceAdapter$Named_ast$Kind(kind << 16 >> 16), err])))];
            }
            Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(pos, end));
            Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags = astDecoder.$go$private$encoder$nodeField(d, i, NodeOffsetFlags$int);
            (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.set(i, node);
        }
        return [(d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(1), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_BigIntLiteral(d: astDecoder | undefined, data: uint32, $1: RuntimeSlice<int>, $2: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        return [NodeFactory__from_ast.NewBigIntLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_NoSubstitutionTemplateLiteral(d: astDecoder | undefined, data: uint32, $1: RuntimeSlice<int>, $2: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        return [NodeFactory__from_ast.NewNoSubstitutionTemplateLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_NumericLiteral(d: astDecoder | undefined, data: uint32, $1: RuntimeSlice<int>, $2: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        return [NodeFactory__from_ast.NewNumericLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_RegularExpressionLiteral(d: astDecoder | undefined, data: uint32, $1: RuntimeSlice<int>, $2: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        return [NodeFactory__from_ast.NewRegularExpressionLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_SourceFile(d: astDecoder | undefined, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let fileNameIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        let pathIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 8);
        let text = astDecoder.$go$private$encoder$getString(d, textIdx);
        let fileName = astDecoder.$go$private$encoder$getString(d, fileNameIdx);
        let path = astDecoder.$go$private$encoder$getString(d, pathIdx);
        let parseOpts = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, HeaderOffsetParseOptions$int);
        let opts = SourceFileParseOptions__from_ast.$fromStorage({
            FileName: fileName,
            Path: ((void Path__from_tspath,
                path) as string),
            ExternalModuleIndicatorOptions: (void ExternalModuleIndicatorOptions__from_ast.$storageOf, (void ExternalModuleIndicatorOptions__from_ast.$fromStorage,
                {
                    JSX: (parseOpts & 1) >>> 0 !== 0,
                    Force: (parseOpts & 2) >>> 0 !== 0
                }))
        });
        let stmts: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        let endOfFile: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_range_3 = childIndices;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_3);
            let ci = __gotots_range_value_5;
            if (astDecoder.$go$private$encoder$nodeField(d, ci, NodeOffsetKind$int) === SyntaxKindNodeList) {
                stmts = astDecoder.$go$private$encoder$nodeListAt(d, ci);
            }
            else if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci) === undefined) && Node__from_ast.$storageOf((((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast()) {
                endOfFile = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci);
            }
        }
        if (endOfFile === undefined) {
            endOfFile = NodeFactory__from_ast.NewToken((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, KindEndOfFile$constant__from_ast());
        }
        return [NodeFactory__from_ast.NewSourceFile((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, SourceFileParseOptions__from_ast.$copy(opts), text, stmts, endOfFile), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_StringLiteral(d: astDecoder | undefined, data: uint32, $1: RuntimeSlice<int>, $2: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        return [NodeFactory__from_ast.NewStringLiteral((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_TemplateHead(d: astDecoder | undefined, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let rawTextIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 8);
        return [NodeFactory__from_ast.NewTemplateHead((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), astDecoder.$go$private$encoder$getString(d, rawTextIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_TemplateMiddle(d: astDecoder | undefined, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let rawTextIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 8);
        return [NodeFactory__from_ast.NewTemplateMiddle((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), astDecoder.$go$private$encoder$getString(d, rawTextIdx), flags | 0), void 0];
    }
    static $go$private$encoder$decodeExtendedData_u5f_TemplateTail(d: astDecoder | undefined, data: uint32, childIndices: RuntimeSlice<int>, commonData: uint8): [
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
        GoInterface | undefined
    ] {
        let extOff = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extData + ((data & NodeDataStringIndexMask) >>> 0);
        let textIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff);
        let rawTextIdx = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 4);
        let flags = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, extOff + 8);
        return [NodeFactory__from_ast.NewTemplateTail((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, astDecoder.$go$private$encoder$getString(d, textIdx), astDecoder.$go$private$encoder$getString(d, rawTextIdx), flags | 0), void 0];
    }
    static $go$private$encoder$getModifierList(d: astDecoder | undefined, ci: int): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        let nl: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeLists.get(ci);
        if (nl === undefined) {
            return void 0;
        }
        let ml: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NodeFactory__from_ast.NewModifierList((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).factory, NodeList__from_ast.$storageOf(((nl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        (void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
            ModifierList__from_ast.$storageOf(((ml ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((nl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        return ml;
    }
    static $go$private$encoder$getString(d: astDecoder | undefined, idx: uint32): gostring {
        let offBase = (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).strTable + idx * 4;
        let start = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, offBase);
        let end = readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, offBase + 4);
        return goStringSlice((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allStringData, start, end);
    }
    static $go$private$encoder$modifierListAt(d: astDecoder | undefined, ci: int): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
        if (ci === 0) {
            return void 0;
        }
        return astDecoder.$go$private$encoder$getModifierList(d, ci);
    }
    static $go$private$encoder$nodeAt(d: astDecoder | undefined, ci: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (ci === 0) {
            return void 0;
        }
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(ci);
    }
    static $go$private$encoder$nodeField(d: astDecoder | undefined, i: int, field: int): uint32 {
        return readLE32((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).raw, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeOff + i * NodeSize$int + field);
    }
    static $go$private$encoder$nodeListAt(d: astDecoder | undefined, ci: int): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (ci === 0) {
            return void 0;
        }
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeLists.get(ci);
    }
    static $go$private$encoder$singleChild(d: astDecoder | undefined, childIndices: RuntimeSlice<int>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (childIndices.length === 0) {
            return void 0;
        }
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes.get(childIndices.get(0));
    }
    static $go$private$encoder$singleNodeListChild(d: astDecoder | undefined, childIndices: RuntimeSlice<int>): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
        if (childIndices.length === 0) {
            return void 0;
        }
        return (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeLists.get(childIndices.get(0));
    }
}
export function DecodeNodes(data: RuntimeSlice<uint8>): [
    tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined,
    GoInterface | undefined
] {
    const __gotots_results_0 = newASTDecoder(data);
    let d: astDecoder | undefined = __gotots_results_0[0];
    let err: GoInterface | undefined = __gotots_results_0[1];
    if (!(err === undefined)) {
        return [void 0, err];
    }
    return astDecoder.$go$private$encoder$decode(d);
}
export function newASTDecoder(data: RuntimeSlice<uint8>): [
    astDecoder | undefined,
    GoInterface | undefined
] {
    if (data.length < HeaderSize$int) {
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("data too short for header: %d bytes", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(data.length)])))];
    }
    let version = data.get(3);
    if (version !== ProtocolVersion) {
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("unsupported protocol version %d (expected %d)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$byte(version), new $goInterfaceAdapter$byte(ProtocolVersion)])))];
    }
    let strTable = readLE32(data, HeaderOffsetStringOffsets$int);
    let strData = readLE32(data, HeaderOffsetStringData$int);
    let extData = readLE32(data, HeaderOffsetExtendedData$int);
    let nodeOff = readLE32(data, HeaderOffsetNodes$int);
    let dataLen = data.length >>> 0;
    if (strTable > dataLen || strData > dataLen || extData > dataLen || nodeOff > dataLen) {
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid AST header offsets: offsets exceed data length (%d)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint32(dataLen)])))];
    }
    if (!(strTable <= strData && strData <= extData && extData <= nodeOff)) {
        return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("invalid AST header offsets: expected strTable <= strData <= extData <= nodeOff (got %d, %d, %d, %d)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint32(strTable), new $goInterfaceAdapter$uint32(strData), new $goInterfaceAdapter$uint32(extData), new $goInterfaceAdapter$uint32(nodeOff)])))];
    }
    let d: astDecoder | undefined = new astDecoder(data, strTable, strData, extData, nodeOff, 0, NewNodeFactory__from_ast(new NodeFactoryHooks__from_ast(void 0, void 0, void 0)), RuntimeSlice.nil<int>(), "", RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined>());
    (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeCount = goNumberIntegerDivide((data.length - (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeOff), NodeSize$int);
    const __gotots_conversion_0 = data.slice((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).strData, null, null);
    let __gotots_conversion_1 = "";
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
    }
    (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).allStringData = __gotots_conversion_1;
    return [d, void 0];
}
export class childIterator {
    declare private readonly $goType: void;
    public constructor(public indices: RuntimeSlice<int>, public pos: int) {
    }
    declare private readonly then?: never;
    static $go$private$encoder$next(it: childIterator | undefined): int {
        if ((it ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos >= (it ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indices.length) {
            return 0;
        }
        let ci = (it ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indices.get((it ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pos);
        const __gotots_store_0 = (it ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        __gotots_store_0.pos = __gotots_store_0.pos + 1;
        return ci;
    }
    static $go$private$encoder$nextIf(it: childIterator | undefined, mask: uint8, bit: uint8): int {
        if ((mask & (bit < 0 ? GoPanic.raiseRuntime("negative shift amount") : bit >= 8 ? 0 : (1 & 255) << bit & 255)) === 0) {
            return 0;
        }
        return childIterator.$go$private$encoder$next(it);
    }
}
export function newChildIter(indices: RuntimeSlice<int>): childIterator {
    return new childIterator(indices, 0);
}
export function readLE32(data: RuntimeSlice<uint8>, offset: int): uint32 {
    if (offset < 0 || offset + 4 > data.length) {
        return 0;
    }
    return binary__from_gostdlib.state.LittleEndian.Uint32(data.slice(offset, offset + 4, null));
}
export function decodeNodeCommonData_SyntheticExpression($0: uint8): [
    $goInterface$Interface_void | undefined,
    bool
] {
    const __gotots_argument_0 = new $goInterfaceAdapter$string("SyntheticExpression should never be decoded");
    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    GoPanic.raiseRuntime("unreachable Go function end");
}
