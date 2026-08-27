import type { gostring, int16 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/state.js";
import { _Kind_name$string } from "./kind_stringer_generated.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export type Kind = int16;
export function KindUnknown$constant(): Kind {
    return 0;
}
export function KindEndOfFile$constant(): Kind {
    return 1;
}
export function KindSingleLineCommentTrivia$constant(): Kind {
    return 2;
}
export function KindMultiLineCommentTrivia$constant(): Kind {
    return 3;
}
export function KindNewLineTrivia$constant(): Kind {
    return 4;
}
export function KindWhitespaceTrivia$constant(): Kind {
    return 5;
}
export function KindConflictMarkerTrivia$constant(): Kind {
    return 6;
}
export function KindNonTextFileMarkerTrivia$constant(): Kind {
    return 7;
}
export function KindNumericLiteral$constant(): Kind {
    return 8;
}
export function KindBigIntLiteral$constant(): Kind {
    return 9;
}
export function KindStringLiteral$constant(): Kind {
    return 10;
}
export function KindJsxText$constant(): Kind {
    return 11;
}
export function KindJsxTextAllWhiteSpaces$constant(): Kind {
    return 12;
}
export function KindRegularExpressionLiteral$constant(): Kind {
    return 13;
}
export function KindNoSubstitutionTemplateLiteral$constant(): Kind {
    return 14;
}
export function KindTemplateHead$constant(): Kind {
    return 15;
}
export function KindTemplateMiddle$constant(): Kind {
    return 16;
}
export function KindTemplateTail$constant(): Kind {
    return 17;
}
export function KindOpenBraceToken$constant(): Kind {
    return 18;
}
export function KindCloseBraceToken$constant(): Kind {
    return 19;
}
export function KindOpenParenToken$constant(): Kind {
    return 20;
}
export function KindCloseParenToken$constant(): Kind {
    return 21;
}
export function KindOpenBracketToken$constant(): Kind {
    return 22;
}
export function KindCloseBracketToken$constant(): Kind {
    return 23;
}
export function KindDotToken$constant(): Kind {
    return 24;
}
export function KindDotDotDotToken$constant(): Kind {
    return 25;
}
export function KindSemicolonToken$constant(): Kind {
    return 26;
}
export function KindCommaToken$constant(): Kind {
    return 27;
}
export function KindQuestionDotToken$constant(): Kind {
    return 28;
}
export function KindLessThanToken$constant(): Kind {
    return 29;
}
export function KindLessThanSlashToken$constant(): Kind {
    return 30;
}
export function KindGreaterThanToken$constant(): Kind {
    return 31;
}
export function KindLessThanEqualsToken$constant(): Kind {
    return 32;
}
export function KindGreaterThanEqualsToken$constant(): Kind {
    return 33;
}
export function KindEqualsEqualsToken$constant(): Kind {
    return 34;
}
export function KindExclamationEqualsToken$constant(): Kind {
    return 35;
}
export function KindEqualsEqualsEqualsToken$constant(): Kind {
    return 36;
}
export function KindExclamationEqualsEqualsToken$constant(): Kind {
    return 37;
}
export function KindEqualsGreaterThanToken$constant(): Kind {
    return 38;
}
export function KindPlusToken$constant(): Kind {
    return 39;
}
export function KindMinusToken$constant(): Kind {
    return 40;
}
export function KindAsteriskToken$constant(): Kind {
    return 41;
}
export function KindAsteriskAsteriskToken$constant(): Kind {
    return 42;
}
export function KindSlashToken$constant(): Kind {
    return 43;
}
export function KindPercentToken$constant(): Kind {
    return 44;
}
export function KindPlusPlusToken$constant(): Kind {
    return 45;
}
export function KindMinusMinusToken$constant(): Kind {
    return 46;
}
export function KindLessThanLessThanToken$constant(): Kind {
    return 47;
}
export function KindGreaterThanGreaterThanToken$constant(): Kind {
    return 48;
}
export function KindGreaterThanGreaterThanGreaterThanToken$constant(): Kind {
    return 49;
}
export function KindAmpersandToken$constant(): Kind {
    return 50;
}
export function KindBarToken$constant(): Kind {
    return 51;
}
export function KindCaretToken$constant(): Kind {
    return 52;
}
export function KindExclamationToken$constant(): Kind {
    return 53;
}
export function KindTildeToken$constant(): Kind {
    return 54;
}
export function KindAmpersandAmpersandToken$constant(): Kind {
    return 55;
}
export function KindBarBarToken$constant(): Kind {
    return 56;
}
export function KindQuestionToken$constant(): Kind {
    return 57;
}
export function KindColonToken$constant(): Kind {
    return 58;
}
export function KindAtToken$constant(): Kind {
    return 59;
}
export function KindQuestionQuestionToken$constant(): Kind {
    return 60;
}
export function KindBacktickToken$constant(): Kind {
    return 61;
}
export function KindHashToken$constant(): Kind {
    return 62;
}
export function KindEqualsToken$constant(): Kind {
    return 63;
}
export function KindPlusEqualsToken$constant(): Kind {
    return 64;
}
export function KindMinusEqualsToken$constant(): Kind {
    return 65;
}
export function KindAsteriskEqualsToken$constant(): Kind {
    return 66;
}
export function KindAsteriskAsteriskEqualsToken$constant(): Kind {
    return 67;
}
export function KindSlashEqualsToken$constant(): Kind {
    return 68;
}
export function KindPercentEqualsToken$constant(): Kind {
    return 69;
}
export function KindLessThanLessThanEqualsToken$constant(): Kind {
    return 70;
}
export function KindGreaterThanGreaterThanEqualsToken$constant(): Kind {
    return 71;
}
export function KindGreaterThanGreaterThanGreaterThanEqualsToken$constant(): Kind {
    return 72;
}
export function KindAmpersandEqualsToken$constant(): Kind {
    return 73;
}
export function KindBarEqualsToken$constant(): Kind {
    return 74;
}
export function KindBarBarEqualsToken$constant(): Kind {
    return 75;
}
export function KindAmpersandAmpersandEqualsToken$constant(): Kind {
    return 76;
}
export function KindQuestionQuestionEqualsToken$constant(): Kind {
    return 77;
}
export function KindCaretEqualsToken$constant(): Kind {
    return 78;
}
export function KindIdentifier$constant(): Kind {
    return 79;
}
export function KindPrivateIdentifier$constant(): Kind {
    return 80;
}
export function KindJSDocCommentTextToken$constant(): Kind {
    return 81;
}
export function KindBreakKeyword$constant(): Kind {
    return 82;
}
export function KindCaseKeyword$constant(): Kind {
    return 83;
}
export function KindCatchKeyword$constant(): Kind {
    return 84;
}
export function KindClassKeyword$constant(): Kind {
    return 85;
}
export function KindConstKeyword$constant(): Kind {
    return 86;
}
export function KindContinueKeyword$constant(): Kind {
    return 87;
}
export function KindDebuggerKeyword$constant(): Kind {
    return 88;
}
export function KindDefaultKeyword$constant(): Kind {
    return 89;
}
export function KindDeleteKeyword$constant(): Kind {
    return 90;
}
export function KindDoKeyword$constant(): Kind {
    return 91;
}
export function KindElseKeyword$constant(): Kind {
    return 92;
}
export function KindEnumKeyword$constant(): Kind {
    return 93;
}
export function KindExportKeyword$constant(): Kind {
    return 94;
}
export function KindExtendsKeyword$constant(): Kind {
    return 95;
}
export function KindFalseKeyword$constant(): Kind {
    return 96;
}
export function KindFinallyKeyword$constant(): Kind {
    return 97;
}
export function KindForKeyword$constant(): Kind {
    return 98;
}
export function KindFunctionKeyword$constant(): Kind {
    return 99;
}
export function KindIfKeyword$constant(): Kind {
    return 100;
}
export function KindImportKeyword$constant(): Kind {
    return 101;
}
export function KindInKeyword$constant(): Kind {
    return 102;
}
export function KindInstanceOfKeyword$constant(): Kind {
    return 103;
}
export function KindNewKeyword$constant(): Kind {
    return 104;
}
export function KindNullKeyword$constant(): Kind {
    return 105;
}
export function KindReturnKeyword$constant(): Kind {
    return 106;
}
export function KindSuperKeyword$constant(): Kind {
    return 107;
}
export function KindSwitchKeyword$constant(): Kind {
    return 108;
}
export function KindThisKeyword$constant(): Kind {
    return 109;
}
export function KindThrowKeyword$constant(): Kind {
    return 110;
}
export function KindTrueKeyword$constant(): Kind {
    return 111;
}
export function KindTryKeyword$constant(): Kind {
    return 112;
}
export function KindTypeOfKeyword$constant(): Kind {
    return 113;
}
export function KindVarKeyword$constant(): Kind {
    return 114;
}
export function KindVoidKeyword$constant(): Kind {
    return 115;
}
export function KindWhileKeyword$constant(): Kind {
    return 116;
}
export function KindWithKeyword$constant(): Kind {
    return 117;
}
export function KindImplementsKeyword$constant(): Kind {
    return 118;
}
export function KindInterfaceKeyword$constant(): Kind {
    return 119;
}
export function KindLetKeyword$constant(): Kind {
    return 120;
}
export function KindPackageKeyword$constant(): Kind {
    return 121;
}
export function KindPrivateKeyword$constant(): Kind {
    return 122;
}
export function KindProtectedKeyword$constant(): Kind {
    return 123;
}
export function KindPublicKeyword$constant(): Kind {
    return 124;
}
export function KindStaticKeyword$constant(): Kind {
    return 125;
}
export function KindYieldKeyword$constant(): Kind {
    return 126;
}
export function KindAbstractKeyword$constant(): Kind {
    return 127;
}
export function KindAccessorKeyword$constant(): Kind {
    return 128;
}
export function KindAsKeyword$constant(): Kind {
    return 129;
}
export function KindAssertsKeyword$constant(): Kind {
    return 130;
}
export function KindAssertKeyword$constant(): Kind {
    return 131;
}
export function KindAnyKeyword$constant(): Kind {
    return 132;
}
export function KindAsyncKeyword$constant(): Kind {
    return 133;
}
export function KindAwaitKeyword$constant(): Kind {
    return 134;
}
export function KindBooleanKeyword$constant(): Kind {
    return 135;
}
export function KindConstructorKeyword$constant(): Kind {
    return 136;
}
export function KindDeclareKeyword$constant(): Kind {
    return 137;
}
export function KindGetKeyword$constant(): Kind {
    return 138;
}
export function KindImmediateKeyword$constant(): Kind {
    return 139;
}
export function KindInferKeyword$constant(): Kind {
    return 140;
}
export function KindIntrinsicKeyword$constant(): Kind {
    return 141;
}
export function KindIsKeyword$constant(): Kind {
    return 142;
}
export function KindKeyOfKeyword$constant(): Kind {
    return 143;
}
export function KindModuleKeyword$constant(): Kind {
    return 144;
}
export function KindNamespaceKeyword$constant(): Kind {
    return 145;
}
export function KindNeverKeyword$constant(): Kind {
    return 146;
}
export function KindOutKeyword$constant(): Kind {
    return 147;
}
export function KindReadonlyKeyword$constant(): Kind {
    return 148;
}
export function KindRequireKeyword$constant(): Kind {
    return 149;
}
export function KindNumberKeyword$constant(): Kind {
    return 150;
}
export function KindObjectKeyword$constant(): Kind {
    return 151;
}
export function KindSatisfiesKeyword$constant(): Kind {
    return 152;
}
export function KindSetKeyword$constant(): Kind {
    return 153;
}
export function KindStringKeyword$constant(): Kind {
    return 154;
}
export function KindSymbolKeyword$constant(): Kind {
    return 155;
}
export function KindTypeKeyword$constant(): Kind {
    return 156;
}
export function KindUndefinedKeyword$constant(): Kind {
    return 157;
}
export function KindUniqueKeyword$constant(): Kind {
    return 158;
}
export function KindUnknownKeyword$constant(): Kind {
    return 159;
}
export function KindUsingKeyword$constant(): Kind {
    return 160;
}
export function KindFromKeyword$constant(): Kind {
    return 161;
}
export function KindGlobalKeyword$constant(): Kind {
    return 162;
}
export function KindBigIntKeyword$constant(): Kind {
    return 163;
}
export function KindOverrideKeyword$constant(): Kind {
    return 164;
}
export function KindOfKeyword$constant(): Kind {
    return 165;
}
export function KindDeferKeyword$constant(): Kind {
    return 166;
}
export function KindQualifiedName$constant(): Kind {
    return 167;
}
export function KindComputedPropertyName$constant(): Kind {
    return 168;
}
export function KindTypeParameter$constant(): Kind {
    return 169;
}
export function KindParameter$constant(): Kind {
    return 170;
}
export function KindDecorator$constant(): Kind {
    return 171;
}
export function KindPropertySignature$constant(): Kind {
    return 172;
}
export function KindPropertyDeclaration$constant(): Kind {
    return 173;
}
export function KindMethodSignature$constant(): Kind {
    return 174;
}
export function KindMethodDeclaration$constant(): Kind {
    return 175;
}
export function KindClassStaticBlockDeclaration$constant(): Kind {
    return 176;
}
export function KindConstructor$constant(): Kind {
    return 177;
}
export function KindGetAccessor$constant(): Kind {
    return 178;
}
export function KindSetAccessor$constant(): Kind {
    return 179;
}
export function KindCallSignature$constant(): Kind {
    return 180;
}
export function KindConstructSignature$constant(): Kind {
    return 181;
}
export function KindIndexSignature$constant(): Kind {
    return 182;
}
export function KindTypePredicate$constant(): Kind {
    return 183;
}
export function KindTypeReference$constant(): Kind {
    return 184;
}
export function KindFunctionType$constant(): Kind {
    return 185;
}
export function KindConstructorType$constant(): Kind {
    return 186;
}
export function KindTypeQuery$constant(): Kind {
    return 187;
}
export function KindTypeLiteral$constant(): Kind {
    return 188;
}
export function KindArrayType$constant(): Kind {
    return 189;
}
export function KindTupleType$constant(): Kind {
    return 190;
}
export function KindOptionalType$constant(): Kind {
    return 191;
}
export function KindRestType$constant(): Kind {
    return 192;
}
export function KindUnionType$constant(): Kind {
    return 193;
}
export function KindIntersectionType$constant(): Kind {
    return 194;
}
export function KindConditionalType$constant(): Kind {
    return 195;
}
export function KindInferType$constant(): Kind {
    return 196;
}
export function KindParenthesizedType$constant(): Kind {
    return 197;
}
export function KindThisType$constant(): Kind {
    return 198;
}
export function KindTypeOperator$constant(): Kind {
    return 199;
}
export function KindIndexedAccessType$constant(): Kind {
    return 200;
}
export function KindMappedType$constant(): Kind {
    return 201;
}
export function KindLiteralType$constant(): Kind {
    return 202;
}
export function KindNamedTupleMember$constant(): Kind {
    return 203;
}
export function KindTemplateLiteralType$constant(): Kind {
    return 204;
}
export function KindTemplateLiteralTypeSpan$constant(): Kind {
    return 205;
}
export function KindImportType$constant(): Kind {
    return 206;
}
export function KindObjectBindingPattern$constant(): Kind {
    return 207;
}
export function KindArrayBindingPattern$constant(): Kind {
    return 208;
}
export function KindBindingElement$constant(): Kind {
    return 209;
}
export function KindArrayLiteralExpression$constant(): Kind {
    return 210;
}
export function KindObjectLiteralExpression$constant(): Kind {
    return 211;
}
export function KindPropertyAccessExpression$constant(): Kind {
    return 212;
}
export function KindElementAccessExpression$constant(): Kind {
    return 213;
}
export function KindCallExpression$constant(): Kind {
    return 214;
}
export function KindNewExpression$constant(): Kind {
    return 215;
}
export function KindTaggedTemplateExpression$constant(): Kind {
    return 216;
}
export function KindTypeAssertionExpression$constant(): Kind {
    return 217;
}
export function KindParenthesizedExpression$constant(): Kind {
    return 218;
}
export function KindFunctionExpression$constant(): Kind {
    return 219;
}
export function KindArrowFunction$constant(): Kind {
    return 220;
}
export function KindDeleteExpression$constant(): Kind {
    return 221;
}
export function KindTypeOfExpression$constant(): Kind {
    return 222;
}
export function KindVoidExpression$constant(): Kind {
    return 223;
}
export function KindAwaitExpression$constant(): Kind {
    return 224;
}
export function KindPrefixUnaryExpression$constant(): Kind {
    return 225;
}
export function KindPostfixUnaryExpression$constant(): Kind {
    return 226;
}
export function KindBinaryExpression$constant(): Kind {
    return 227;
}
export function KindConditionalExpression$constant(): Kind {
    return 228;
}
export function KindTemplateExpression$constant(): Kind {
    return 229;
}
export function KindYieldExpression$constant(): Kind {
    return 230;
}
export function KindSpreadElement$constant(): Kind {
    return 231;
}
export function KindClassExpression$constant(): Kind {
    return 232;
}
export function KindOmittedExpression$constant(): Kind {
    return 233;
}
export function KindExpressionWithTypeArguments$constant(): Kind {
    return 234;
}
export function KindAsExpression$constant(): Kind {
    return 235;
}
export function KindNonNullExpression$constant(): Kind {
    return 236;
}
export function KindMetaProperty$constant(): Kind {
    return 237;
}
export function KindSyntheticExpression$constant(): Kind {
    return 238;
}
export function KindSatisfiesExpression$constant(): Kind {
    return 239;
}
export function KindTemplateSpan$constant(): Kind {
    return 240;
}
export function KindSemicolonClassElement$constant(): Kind {
    return 241;
}
export function KindBlock$constant(): Kind {
    return 242;
}
export function KindEmptyStatement$constant(): Kind {
    return 243;
}
export function KindVariableStatement$constant(): Kind {
    return 244;
}
export function KindExpressionStatement$constant(): Kind {
    return 245;
}
export function KindIfStatement$constant(): Kind {
    return 246;
}
export function KindDoStatement$constant(): Kind {
    return 247;
}
export function KindWhileStatement$constant(): Kind {
    return 248;
}
export function KindForStatement$constant(): Kind {
    return 249;
}
export function KindForInStatement$constant(): Kind {
    return 250;
}
export function KindForOfStatement$constant(): Kind {
    return 251;
}
export function KindContinueStatement$constant(): Kind {
    return 252;
}
export function KindBreakStatement$constant(): Kind {
    return 253;
}
export function KindReturnStatement$constant(): Kind {
    return 254;
}
export function KindWithStatement$constant(): Kind {
    return 255;
}
export function KindSwitchStatement$constant(): Kind {
    return 256;
}
export function KindLabeledStatement$constant(): Kind {
    return 257;
}
export function KindThrowStatement$constant(): Kind {
    return 258;
}
export function KindTryStatement$constant(): Kind {
    return 259;
}
export function KindDebuggerStatement$constant(): Kind {
    return 260;
}
export function KindVariableDeclaration$constant(): Kind {
    return 261;
}
export function KindVariableDeclarationList$constant(): Kind {
    return 262;
}
export function KindFunctionDeclaration$constant(): Kind {
    return 263;
}
export function KindClassDeclaration$constant(): Kind {
    return 264;
}
export function KindInterfaceDeclaration$constant(): Kind {
    return 265;
}
export function KindTypeAliasDeclaration$constant(): Kind {
    return 266;
}
export function KindEnumDeclaration$constant(): Kind {
    return 267;
}
export function KindModuleDeclaration$constant(): Kind {
    return 268;
}
export function KindModuleBlock$constant(): Kind {
    return 269;
}
export function KindCaseBlock$constant(): Kind {
    return 270;
}
export function KindNamespaceExportDeclaration$constant(): Kind {
    return 271;
}
export function KindImportEqualsDeclaration$constant(): Kind {
    return 272;
}
export function KindImportDeclaration$constant(): Kind {
    return 273;
}
export function KindImportClause$constant(): Kind {
    return 274;
}
export function KindNamespaceImport$constant(): Kind {
    return 275;
}
export function KindNamedImports$constant(): Kind {
    return 276;
}
export function KindImportSpecifier$constant(): Kind {
    return 277;
}
export function KindExportAssignment$constant(): Kind {
    return 278;
}
export function KindExportDeclaration$constant(): Kind {
    return 279;
}
export function KindNamedExports$constant(): Kind {
    return 280;
}
export function KindNamespaceExport$constant(): Kind {
    return 281;
}
export function KindExportSpecifier$constant(): Kind {
    return 282;
}
export function KindMissingDeclaration$constant(): Kind {
    return 283;
}
export function KindExternalModuleReference$constant(): Kind {
    return 284;
}
export function KindJsxElement$constant(): Kind {
    return 285;
}
export function KindJsxSelfClosingElement$constant(): Kind {
    return 286;
}
export function KindJsxOpeningElement$constant(): Kind {
    return 287;
}
export function KindJsxClosingElement$constant(): Kind {
    return 288;
}
export function KindJsxFragment$constant(): Kind {
    return 289;
}
export function KindJsxOpeningFragment$constant(): Kind {
    return 290;
}
export function KindJsxClosingFragment$constant(): Kind {
    return 291;
}
export function KindJsxAttribute$constant(): Kind {
    return 292;
}
export function KindJsxAttributes$constant(): Kind {
    return 293;
}
export function KindJsxSpreadAttribute$constant(): Kind {
    return 294;
}
export function KindJsxExpression$constant(): Kind {
    return 295;
}
export function KindJsxNamespacedName$constant(): Kind {
    return 296;
}
export function KindCaseClause$constant(): Kind {
    return 297;
}
export function KindDefaultClause$constant(): Kind {
    return 298;
}
export function KindHeritageClause$constant(): Kind {
    return 299;
}
export function KindCatchClause$constant(): Kind {
    return 300;
}
export function KindImportAttributes$constant(): Kind {
    return 301;
}
export function KindImportAttribute$constant(): Kind {
    return 302;
}
export function KindPropertyAssignment$constant(): Kind {
    return 303;
}
export function KindShorthandPropertyAssignment$constant(): Kind {
    return 304;
}
export function KindSpreadAssignment$constant(): Kind {
    return 305;
}
export function KindEnumMember$constant(): Kind {
    return 306;
}
export function KindSourceFile$constant(): Kind {
    return 307;
}
export function KindJSDocTypeExpression$constant(): Kind {
    return 308;
}
export function KindJSDocNameReference$constant(): Kind {
    return 309;
}
export function KindJSDocAllType$constant(): Kind {
    return 310;
}
export function KindJSDocNullableType$constant(): Kind {
    return 311;
}
export function KindJSDocNonNullableType$constant(): Kind {
    return 312;
}
export function KindJSDocOptionalType$constant(): Kind {
    return 313;
}
export function KindJSDocVariadicType$constant(): Kind {
    return 314;
}
export function KindJSDoc$constant(): Kind {
    return 315;
}
export function KindJSDocText$constant(): Kind {
    return 316;
}
export function KindJSDocTypeLiteral$constant(): Kind {
    return 317;
}
export function KindJSDocSignature$constant(): Kind {
    return 318;
}
export function KindJSDocLink$constant(): Kind {
    return 319;
}
export function KindJSDocLinkCode$constant(): Kind {
    return 320;
}
export function KindJSDocLinkPlain$constant(): Kind {
    return 321;
}
export function KindJSDocUnknownTag$constant(): Kind {
    return 322;
}
export function KindJSDocAugmentsTag$constant(): Kind {
    return 323;
}
export function KindJSDocImplementsTag$constant(): Kind {
    return 324;
}
export function KindJSDocDeprecatedTag$constant(): Kind {
    return 325;
}
export function KindJSDocPublicTag$constant(): Kind {
    return 326;
}
export function KindJSDocPrivateTag$constant(): Kind {
    return 327;
}
export function KindJSDocProtectedTag$constant(): Kind {
    return 328;
}
export function KindJSDocReadonlyTag$constant(): Kind {
    return 329;
}
export function KindJSDocOverrideTag$constant(): Kind {
    return 330;
}
export function KindJSDocCallbackTag$constant(): Kind {
    return 331;
}
export function KindJSDocOverloadTag$constant(): Kind {
    return 332;
}
export function KindJSDocParameterTag$constant(): Kind {
    return 333;
}
export function KindJSDocReturnTag$constant(): Kind {
    return 334;
}
export function KindJSDocThisTag$constant(): Kind {
    return 335;
}
export function KindJSDocTypeTag$constant(): Kind {
    return 336;
}
export function KindJSDocTemplateTag$constant(): Kind {
    return 337;
}
export function KindJSDocTypedefTag$constant(): Kind {
    return 338;
}
export function KindJSDocSeeTag$constant(): Kind {
    return 339;
}
export function KindJSDocPropertyTag$constant(): Kind {
    return 340;
}
export function KindJSDocThrowsTag$constant(): Kind {
    return 341;
}
export function KindJSDocSatisfiesTag$constant(): Kind {
    return 342;
}
export function KindJSDocImportTag$constant(): Kind {
    return 343;
}
export function KindSyntaxList$constant(): Kind {
    return 344;
}
export function KindJSTypeAliasDeclaration$constant(): Kind {
    return 345;
}
export function KindJSImportDeclaration$constant(): Kind {
    return 346;
}
export function KindNotEmittedStatement$constant(): Kind {
    return 347;
}
export function KindPartiallyEmittedExpression$constant(): Kind {
    return 348;
}
export function KindSyntheticReferenceExpression$constant(): Kind {
    return 349;
}
export function KindNotEmittedTypeElement$constant(): Kind {
    return 350;
}
export function KindFirstCompoundAssignment$constant(): Kind {
    return 64;
}
export function KindLastCompoundAssignment$constant(): Kind {
    return 78;
}
export function KindFirstReservedWord$constant(): Kind {
    return 82;
}
export function KindLastReservedWord$constant(): Kind {
    return 117;
}
export function KindFirstKeyword$constant(): Kind {
    return 82;
}
export function KindLastKeyword$constant(): Kind {
    return 166;
}
export function KindFirstFutureReservedWord$constant(): Kind {
    return 118;
}
export function KindLastFutureReservedWord$constant(): Kind {
    return 126;
}
export function KindFirstTypeNode$constant(): Kind {
    return 183;
}
export function KindLastTypeNode$constant(): Kind {
    return 206;
}
export function KindFirstPunctuation$constant(): Kind {
    return 18;
}
export function KindLastPunctuation$constant(): Kind {
    return 78;
}
export function KindFirstToken$constant(): Kind {
    return 0;
}
export function KindLastToken$constant(): Kind {
    return 166;
}
export function KindFirstLiteralToken$constant(): Kind {
    return 8;
}
export function KindLastLiteralToken$constant(): Kind {
    return 14;
}
export function KindFirstTemplateToken$constant(): Kind {
    return 14;
}
export function KindLastTemplateToken$constant(): Kind {
    return 17;
}
export function KindFirstBinaryOperator$constant(): Kind {
    return 29;
}
export function KindLastBinaryOperator$constant(): Kind {
    return 78;
}
export function KindFirstStatement$constant(): Kind {
    return 244;
}
export function KindLastStatement$constant(): Kind {
    return 260;
}
export function KindFirstNode$constant(): Kind {
    return 167;
}
export function KindFirstJSDocNode$constant(): Kind {
    return 308;
}
export function KindLastJSDocNode$constant(): Kind {
    return 343;
}
export function KindFirstJSDocTagNode$constant(): Kind {
    return 322;
}
export function KindLastJSDocTagNode$constant(): Kind {
    return 343;
}
export function KindFirstContextualKeyword$constant(): Kind {
    return 127;
}
export function KindLastContextualKeyword$constant(): Kind {
    return 166;
}
export function KindLastUnaryOperator$constant(): Kind {
    return 54;
}
export function KindFirstTriviaToken$constant(): Kind {
    return 2;
}
export function KindLastTriviaToken$constant(): Kind {
    return 6;
}
export function Kind_String(i: Kind): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 352) {
        return "Kind(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_Kind_name$string, $state._Kind_index.get(idx), $state._Kind_index.get(idx + 1));
}
