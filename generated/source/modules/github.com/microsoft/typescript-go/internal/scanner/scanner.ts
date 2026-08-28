import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentDirective$Storage as CommentDirective__from_ast$Storage, CommentRange as CommentRange__from_ast, JSDocSatisfiesTag as JSDocSatisfiesTag__from_ast, Kind as Kind__from_ast, SatisfiesExpression as SatisfiesExpression__from_ast, SourceFileLike as SourceFileLike__from_ast, TokenFlags as TokenFlags__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageVariant as LanguageVariant__from_core, ScriptTarget as ScriptTarget__from_core, TextPos as TextPos__from_core, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { decimalEscapeValue$Storage as decimalEscapeValue__from_scanner$Storage, groupNameReference$Storage as groupNameReference__from_scanner$Storage, regularExpressionFlags } from "./regexp.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, int64, uint8 } from "@gotots/runtime/scalars.js";
import { CommentDirectiveKindExpectError$constant as CommentDirectiveKindExpectError$constant__from_ast, CommentDirectiveKindIgnore$constant as CommentDirectiveKindIgnore$constant__from_ast, CommentDirective as CommentDirective__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, IsJSDocNode as IsJSDocNode__from_ast, IsJSDocSatisfiesTag as IsJSDocSatisfiesTag__from_ast, IsJsxText as IsJsxText__from_ast, JSDoc as JSDoc__from_ast, KindAmpersandAmpersandEqualsToken$constant as KindAmpersandAmpersandEqualsToken$constant__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindAmpersandEqualsToken$constant as KindAmpersandEqualsToken$constant__from_ast, KindAmpersandToken$constant as KindAmpersandToken$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsteriskAsteriskEqualsToken$constant as KindAsteriskAsteriskEqualsToken$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindAsteriskEqualsToken$constant as KindAsteriskEqualsToken$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAtToken$constant as KindAtToken$constant__from_ast, KindBacktickToken$constant as KindBacktickToken$constant__from_ast, KindBarBarEqualsToken$constant as KindBarBarEqualsToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBarEqualsToken$constant as KindBarEqualsToken$constant__from_ast, KindBarToken$constant as KindBarToken$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCaretEqualsToken$constant as KindCaretEqualsToken$constant__from_ast, KindCaretToken$constant as KindCaretToken$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConflictMarkerTrivia$constant as KindConflictMarkerTrivia$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorKeyword$constant as KindConstructorKeyword$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDotDotDotToken$constant as KindDotDotDotToken$constant__from_ast, KindDotToken$constant as KindDotToken$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsEqualsEqualsToken$constant as KindEqualsEqualsEqualsToken$constant__from_ast, KindEqualsEqualsToken$constant as KindEqualsEqualsToken$constant__from_ast, KindEqualsGreaterThanToken$constant as KindEqualsGreaterThanToken$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExclamationEqualsEqualsToken$constant as KindExclamationEqualsEqualsToken$constant__from_ast, KindExclamationEqualsToken$constant as KindExclamationEqualsToken$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGreaterThanEqualsToken$constant as KindGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanEqualsToken$constant as KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast, KindGreaterThanGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanGreaterThanToken$constant as KindGreaterThanGreaterThanToken$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindHashToken$constant as KindHashToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSDocCommentTextToken$constant as KindJSDocCommentTextToken$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindJsxTextAllWhiteSpaces$constant as KindJsxTextAllWhiteSpaces$constant__from_ast, KindLessThanEqualsToken$constant as KindLessThanEqualsToken$constant__from_ast, KindLessThanLessThanEqualsToken$constant as KindLessThanLessThanEqualsToken$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, KindLessThanSlashToken$constant as KindLessThanSlashToken$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMinusEqualsToken$constant as KindMinusEqualsToken$constant__from_ast, KindMinusMinusToken$constant as KindMinusMinusToken$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindNewLineTrivia$constant as KindNewLineTrivia$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNonTextFileMarkerTrivia$constant as KindNonTextFileMarkerTrivia$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindPercentEqualsToken$constant as KindPercentEqualsToken$constant__from_ast, KindPercentToken$constant as KindPercentToken$constant__from_ast, KindPlusEqualsToken$constant as KindPlusEqualsToken$constant__from_ast, KindPlusPlusToken$constant as KindPlusPlusToken$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionDotToken$constant as KindQuestionDotToken$constant__from_ast, KindQuestionQuestionEqualsToken$constant as KindQuestionQuestionEqualsToken$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindSlashEqualsToken$constant as KindSlashEqualsToken$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindTildeToken$constant as KindTildeToken$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindWhitespaceTrivia$constant as KindWhitespaceTrivia$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsHasJSDoc$constant as NodeFlagsHasJSDoc$constant__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PositionIsSynthesized as PositionIsSynthesized__from_ast, SourceFile as SourceFile__from_ast, TokenFlagsBinaryOrOctalSpecifier$constant as TokenFlagsBinaryOrOctalSpecifier$constant__from_ast, TokenFlagsBinarySpecifier$constant as TokenFlagsBinarySpecifier$constant__from_ast, TokenFlagsContainsInvalidEscape$constant as TokenFlagsContainsInvalidEscape$constant__from_ast, TokenFlagsContainsInvalidSeparator$constant as TokenFlagsContainsInvalidSeparator$constant__from_ast, TokenFlagsContainsLeadingZero$constant as TokenFlagsContainsLeadingZero$constant__from_ast, TokenFlagsContainsSeparator$constant as TokenFlagsContainsSeparator$constant__from_ast, TokenFlagsExtendedUnicodeEscape$constant as TokenFlagsExtendedUnicodeEscape$constant__from_ast, TokenFlagsHexEscape$constant as TokenFlagsHexEscape$constant__from_ast, TokenFlagsHexSpecifier$constant as TokenFlagsHexSpecifier$constant__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, TokenFlagsOctal$constant as TokenFlagsOctal$constant__from_ast, TokenFlagsOctalSpecifier$constant as TokenFlagsOctalSpecifier$constant__from_ast, TokenFlagsPrecedingJSDocComment$constant as TokenFlagsPrecedingJSDocComment$constant__from_ast, TokenFlagsPrecedingJSDocLeadingAsterisks$constant as TokenFlagsPrecedingJSDocLeadingAsterisks$constant__from_ast, TokenFlagsPrecedingJSDocWithDeprecated$constant as TokenFlagsPrecedingJSDocWithDeprecated$constant__from_ast, TokenFlagsPrecedingJSDocWithSeeOrLink$constant as TokenFlagsPrecedingJSDocWithSeeOrLink$constant__from_ast, TokenFlagsPrecedingLineBreak$constant as TokenFlagsPrecedingLineBreak$constant__from_ast, TokenFlagsScientific$constant as TokenFlagsScientific$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, TokenFlagsUnicodeEscape$constant as TokenFlagsUnicodeEscape$constant__from_ast, TokenFlagsUnterminated$constant as TokenFlagsUnterminated$constant__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { LanguageVariantJSX$constant as LanguageVariantJSX$constant__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, NewTextRange as NewTextRange__from_core, ScriptTargetLatest$constant as ScriptTargetLatest$constant__from_core, ScriptTargetNone$constant as ScriptTargetNone$constant__from_core, ScriptTarget_String as ScriptTarget_String__from_core, TextRange as TextRange__from_core, UTF16Len as UTF16Len__from_core, UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { FromString as FromString__from_jsnum, ParsePseudoBigInt as ParsePseudoBigInt__from_jsnum } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/jsnum/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/state.js";
import { EncodeJSStringRune as EncodeJSStringRune__from_stringutil, IsASCIILetter as IsASCIILetter__from_stringutil, IsDigit as IsDigit__from_stringutil, IsHexDigit as IsHexDigit__from_stringutil, IsHighSurrogate as IsHighSurrogate__from_stringutil, IsLineBreak as IsLineBreak__from_stringutil, IsLowSurrogate as IsLowSurrogate__from_stringutil, IsOctalDigit as IsOctalDigit__from_stringutil, IsUnicodeIdentifierPart as IsUnicodeIdentifierPart__from_stringutil, IsUnicodeIdentifierStart as IsUnicodeIdentifierStart__from_stringutil, IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil, SurrogatePairToCodePoint as SurrogatePairToCodePoint__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { MaxASCII$int32 as MaxASCII$int32__from_unicode } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/index.js";
import { RuneError$int32 as RuneError$int32__from_utf8, RuneSelf$int32 as RuneSelf$int32__from_utf8, RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { IfElse$Named_ast$Kind, IfElse$Named_scanner$EscapeSequenceScanningFlags, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { cleared$MapOf_string_To_string$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/scanner/cleared.js";
import { $goInterfaceAdapter$Named_core$UTF16Offset, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$int64, $goInterfaceAdapter$string, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { regExpParser, regularExpressionFlagsAnyUnicodeMode$constant, regularExpressionFlagsUnicodeSets$constant } from "./regexp.js";
import { tokenIsIdentifierOrKeyword } from "./utilities.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export type EscapeSequenceScanningFlags = int32;
export function EscapeSequenceScanningFlagsString$constant(): EscapeSequenceScanningFlags {
    return 1;
}
export function EscapeSequenceScanningFlagsReportErrors$constant(): EscapeSequenceScanningFlags {
    return 2;
}
export function EscapeSequenceScanningFlagsRegularExpression$constant(): EscapeSequenceScanningFlags {
    return 4;
}
export function EscapeSequenceScanningFlagsAnnexB$constant(): EscapeSequenceScanningFlags {
    return 8;
}
export function EscapeSequenceScanningFlagsAnyUnicodeMode$constant(): EscapeSequenceScanningFlags {
    return 16;
}
export function EscapeSequenceScanningFlagsAtomEscape$constant(): EscapeSequenceScanningFlags {
    return 32;
}
export function EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant(): EscapeSequenceScanningFlags {
    return 6;
}
export function EscapeSequenceScanningFlagsAllowExtendedUnicodeEscape$constant(): EscapeSequenceScanningFlags {
    return 17;
}
export class ErrorCallback {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: int, $2: int, $3: RuntimeSlice<GoInterface | undefined>) => void) | undefined) {
    }
    declare private readonly then?: never;
}
export class ScannerState {
    declare private readonly $goType: void;
    public constructor(public pos: int, public fullStartPos: int, public tokenStart: int, public token: Kind__from_ast, public tokenValue: gostring, public tokenFlags: TokenFlags__from_ast, public commentDirectives: RuntimeSlice<CommentDirective__from_ast$Storage>, public skipJSDocLeadingAsterisks: int) {
    }
    static $zero(): ScannerState {
        return new ScannerState(0, 0, 0, 0, "", 0, RuntimeSlice.nil<CommentDirective__from_ast$Storage>(), 0);
    }
    static $copy($source: ScannerState): ScannerState {
        return new ScannerState($source.pos, $source.fullStartPos, $source.tokenStart, $source.token, $source.tokenValue, $source.tokenFlags, $source.commentDirectives, $source.skipJSDocLeadingAsterisks);
    }
    declare private readonly then?: never;
}
export class Scanner {
    declare private readonly $goType: void;
    public constructor(public text: gostring, public end: int, public languageVariant: LanguageVariant__from_core, public scriptTarget: ScriptTarget__from_core, public onError: ErrorCallback, public skipTrivia: bool, public ScannerState: ScannerState, public containsNonASCII: bool, public numberCache: GoMapValue<gostring, gostring>, public hexNumberCache: GoMapValue<gostring, gostring>, public hexDigitCache: GoMapValue<gostring, gostring>) {
    }
    static $copy($source: Scanner): Scanner {
        return new Scanner($source.text, $source.end, $source.languageVariant, $source.scriptTarget, $source.onError, $source.skipTrivia, ScannerState.$copy($source.ScannerState), $source.containsNonASCII, $source.numberCache, $source.hexNumberCache, $source.hexDigitCache);
    }
    declare private readonly then?: never;
    static CanFollowJSDocAt(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length) {
            return true;
        }
        const __gotots_results_48 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
        const __gotots_results_49 = [__gotots_results_48[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_48[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_49[0];
        return IsIdentifierStart(ch) || IsWhiteSpaceSingleLine__from_stringutil(ch) || IsLineBreak__from_stringutil(ch);
    }
    static CommentDirectives(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): RuntimeSlice<CommentDirective__from_ast$Storage> {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.commentDirectives;
    }
    static ContainsNonASCII(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.containsNonASCII;
    }
    static HasExtendedUnicodeEscape(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsExtendedUnicodeEscape$constant__from_ast()) === 0);
    }
    static HasPrecedingJSDocComment(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocComment$constant__from_ast()) === 0);
    }
    static HasPrecedingJSDocLeadingAsterisks(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocLeadingAsterisks$constant__from_ast()) === 0);
    }
    static HasPrecedingJSDocWithDeprecatedTag(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocWithDeprecated$constant__from_ast()) === 0);
    }
    static HasPrecedingJSDocWithSeeOrLink(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocWithSeeOrLink$constant__from_ast()) === 0);
    }
    static HasPrecedingLineBreak(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingLineBreak$constant__from_ast()) === 0);
    }
    static HasUnicodeEscape(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): bool {
        return !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsUnicodeEscape$constant__from_ast()) === 0);
    }
    static Mark(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): ScannerState {
        return ScannerState.$copy(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState);
    }
    static ReScanAsteriskEqualsToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindAsteriskEqualsToken$constant__from_ast())) {
            const __gotots_argument_32 = new $goInterfaceAdapter$string("'ReScanAsteriskEqualsToken' should only be called on a '*='");
            GoPanic.raise(__gotots_argument_32 === undefined ? GoPanicNilValue.create() : __gotots_argument_32);
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsToken$constant__from_ast();
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanGreaterThanToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindGreaterThanToken$constant__from_ast()) {
            Scanner.$go$private$scanner$reScanGreaterThanTokenInner(s);
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanHashToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindPrivateIdentifier$constant__from_ast()) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindHashToken$constant__from_ast();
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanJsxAttributeValue(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos;
        return Scanner.ScanJsxAttributeValue(s);
    }
    static ReScanJsxToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, allowMultilineJsxText: bool): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.ScanJsxTokenEx(s, allowMultilineJsxText);
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanLessThanToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindLessThanLessThanToken$constant__from_ast()) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanToken$constant__from_ast();
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanQuestionToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindQuestionQuestionToken$constant__from_ast())) {
            const __gotots_argument_33 = new $goInterfaceAdapter$string("'reScanQuestionToken' should only be called on a '??'");
            GoPanic.raise(__gotots_argument_33 === undefined ? GoPanicNilValue.create() : __gotots_argument_33);
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindQuestionToken$constant__from_ast();
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanSlashToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, reportErrors: RuntimeSlice<bool>): Kind__from_ast {
        let shouldReportErrors = reportErrors.length > 0 && reportErrors.get(0);
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindSlashToken$constant__from_ast() || ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindSlashEqualsToken$constant__from_ast()) {
            let startOfRegExpBody = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
            let p = startOfRegExpBody;
            let inEscape = false;
            let namedCaptureGroups = false;
            let inCharacterClass = false;
            loop: for (;;) {
                if (p >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end) {
                    const __gotots_store_173 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_173.tokenFlags = __gotots_store_173.tokenFlags | 4;
                    break loop;
                }
                let ch = goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p);
                __gotots_control_target_8: {
                    if (IsLineBreak__from_stringutil(ch)) {
                        const __gotots_store_174 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_174.tokenFlags = __gotots_store_174.tokenFlags | 4;
                        break loop;
                    }
                    else if (inEscape) {
                        inEscape = false;
                    }
                    else if (ch === 47 && !inCharacterClass) {
                        break loop;
                    }
                    else if (ch === 91) {
                        inCharacterClass = true;
                    }
                    else if (ch === 92) {
                        inEscape = true;
                    }
                    else if (ch === 93) {
                        inCharacterClass = false;
                    }
                    else if (!inCharacterClass && ch === 40 && p + 1 < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p + 1) === 63 && p + 2 < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p + 2) === 60 && (p + 3 >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end || (goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p + 3) !== 61 && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p + 3) !== 33))) {
                        namedCaptureGroups = true;
                    }
                }
                p++;
            }
            let endOfRegExpBody = p;
            if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsUnterminated$constant__from_ast()) === 0)) {
                p = startOfRegExpBody;
                inEscape = false;
                let characterClassDepth = 0;
                let inDecimalQuantifier = false;
                let groupDepth = 0;
                for (; p < endOfRegExpBody;) {
                    let ch = goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p);
                    if (inEscape) {
                        inEscape = false;
                    }
                    else if (ch === 92) {
                        inEscape = true;
                    }
                    else if (ch === 91) {
                        characterClassDepth++;
                    }
                    else if (ch === 93 && characterClassDepth !== 0) {
                        characterClassDepth--;
                    }
                    else if (characterClassDepth === 0) {
                        if (ch === 123) {
                            inDecimalQuantifier = true;
                        }
                        else if (ch === 125 && inDecimalQuantifier) {
                            inDecimalQuantifier = false;
                        }
                        else if (!inDecimalQuantifier) {
                            if (ch === 40) {
                                groupDepth++;
                            }
                            else if (ch === 41 && groupDepth !== 0) {
                                groupDepth--;
                            }
                            else if (ch === 41 || ch === 93 || ch === 125) {
                                break;
                            }
                        }
                    }
                    p++;
                }
                for (; p > startOfRegExpBody;) {
                    const __gotots_results_61 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, 0, p));
                    const __gotots_results_62 = [__gotots_results_61[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_61[1]))] satisfies [
                        int32,
                        int
                    ];
                    let ch = __gotots_results_62[0];
                    let size = __gotots_results_62[1];
                    if (IsWhiteSpaceLike__from_stringutil(ch) || ch === 59) {
                        p = p - size;
                    }
                    else {
                        break;
                    }
                }
                Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Unterminated_regular_expression_literal, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, p - ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else {
                p++;
                let regExpFlags = 0;
                for (; p < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end;) {
                    const __gotots_results_63 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, p));
                    const __gotots_results_64 = [__gotots_results_63[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_63[1]))] satisfies [
                        int32,
                        int
                    ];
                    let ch = __gotots_results_64[0];
                    let size = __gotots_results_64[1];
                    if (ch === RuneError$int32__from_utf8 || !IsIdentifierPart(ch)) {
                        break;
                    }
                    if (shouldReportErrors) {
                        const __gotots_results_65 = $state.charCodeToRegExpFlag.lookupOk(ch);
                        let flag = __gotots_results_65[0];
                        let ok = __gotots_results_65[1];
                        if (!ok) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Unknown_regular_expression_flag, p, size, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        else if (!((regExpFlags & flag) === 0)) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Duplicate_regular_expression_flag, p, size, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        else if (((regExpFlags | flag) & regularExpressionFlagsAnyUnicodeMode$constant()) === regularExpressionFlagsAnyUnicodeMode$constant()) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously, p, size, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        else {
                            regExpFlags = regExpFlags | flag;
                            Scanner.$go$private$scanner$checkRegularExpressionFlagAvailability(s, flag, p, size);
                        }
                    }
                    p += size;
                }
                if (shouldReportErrors) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = startOfRegExpBody;
                    let saveEnd = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end;
                    let saveTokenPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart;
                    let saveTokenFlags = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end = endOfRegExpBody;
                    let parser: regExpParser | undefined = new regExpParser(s, endOfRegExpBody, regExpFlags, !((regExpFlags & regularExpressionFlagsAnyUnicodeMode$constant()) === 0), !((regExpFlags & regularExpressionFlagsUnicodeSets$constant()) === 0), true, false, namedCaptureGroups, false, 0, GoMap.make<gostring, bool>(false, 0, []), RuntimeSlice.nil<groupNameReference__from_scanner$Storage>(), RuntimeSlice.nil<decimalEscapeValue__from_scanner$Storage>(), RuntimeSlice.nil<GoMapValue<gostring, bool>>(), 0);
                    regExpParser.$go$private$scanner$run(parser);
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end = saveEnd;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = p;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = saveTokenPos;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = saveTokenFlags;
                }
                else {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = p;
                }
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = p;
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindRegularExpressionLiteral$constant__from_ast();
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ReScanTemplateToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, isTaggedTemplate: bool): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanTemplateAndSetTokenValue(s, !isTaggedTemplate);
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static Reset(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): void {
        let numberCache: GoMapValue<gostring, gostring> = cleared$MapOf_string_To_string$string$string(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache);
        let hexNumberCache: GoMapValue<gostring, gostring> = cleared$MapOf_string_To_string$string$string(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache);
        let hexDigitCache: GoMapValue<gostring, gostring> = cleared$MapOf_string_To_string$string$string(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache);
        void ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            defaultScanner());
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache = numberCache;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache = hexNumberCache;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache = hexDigitCache;
    }
    static ResetPos(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, pos: int): void {
        if (pos < 0) {
            const __gotots_argument_25 = new $goInterfaceAdapter$string("Cannot reset token state to negative position");
            GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = pos;
    }
    static ResetTokenState(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, pos: int): void {
        Scanner.ResetPos(s, pos);
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindUnknown$constant__from_ast();
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "";
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = TokenFlagsNone$constant__from_ast();
    }
    static Rewind(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, state: ScannerState): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState = ScannerState.$copy(state);
    }
    static Scan(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = TokenFlagsNone$constant__from_ast();
        for (;;) {
            let ch = Scanner.$go$private$scanner$char(s);
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            {
                const __gotots_switch_tag_0 = ch;
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 9;
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 11;
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 12;
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 32;
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === 10;
                    }
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === 13;
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_0 = 1;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_2 = false;
                    if (!__gotots_switch_match_2) {
                        __gotots_switch_match_2 = __gotots_switch_tag_0 === 33;
                    }
                    if (__gotots_switch_match_2) {
                        __gotots_switch_selection_0 = 2;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_0 === 34;
                    }
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_0 === 39;
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_0 = 3;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_4 = false;
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === 96;
                    }
                    if (__gotots_switch_match_4) {
                        __gotots_switch_selection_0 = 4;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_5 = false;
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 = __gotots_switch_tag_0 === 37;
                    }
                    if (__gotots_switch_match_5) {
                        __gotots_switch_selection_0 = 5;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_6 = false;
                    if (!__gotots_switch_match_6) {
                        __gotots_switch_match_6 = __gotots_switch_tag_0 === 38;
                    }
                    if (__gotots_switch_match_6) {
                        __gotots_switch_selection_0 = 6;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_7 = false;
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === 40;
                    }
                    if (__gotots_switch_match_7) {
                        __gotots_switch_selection_0 = 7;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_8 = false;
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_0 === 41;
                    }
                    if (__gotots_switch_match_8) {
                        __gotots_switch_selection_0 = 8;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_9 = false;
                    if (!__gotots_switch_match_9) {
                        __gotots_switch_match_9 = __gotots_switch_tag_0 === 42;
                    }
                    if (__gotots_switch_match_9) {
                        __gotots_switch_selection_0 = 9;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_10 = false;
                    if (!__gotots_switch_match_10) {
                        __gotots_switch_match_10 = __gotots_switch_tag_0 === 43;
                    }
                    if (__gotots_switch_match_10) {
                        __gotots_switch_selection_0 = 10;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_11 = false;
                    if (!__gotots_switch_match_11) {
                        __gotots_switch_match_11 = __gotots_switch_tag_0 === 44;
                    }
                    if (__gotots_switch_match_11) {
                        __gotots_switch_selection_0 = 11;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_12 = false;
                    if (!__gotots_switch_match_12) {
                        __gotots_switch_match_12 = __gotots_switch_tag_0 === 45;
                    }
                    if (__gotots_switch_match_12) {
                        __gotots_switch_selection_0 = 12;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_13 = false;
                    if (!__gotots_switch_match_13) {
                        __gotots_switch_match_13 = __gotots_switch_tag_0 === 46;
                    }
                    if (__gotots_switch_match_13) {
                        __gotots_switch_selection_0 = 13;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_14 = false;
                    if (!__gotots_switch_match_14) {
                        __gotots_switch_match_14 = __gotots_switch_tag_0 === 47;
                    }
                    if (__gotots_switch_match_14) {
                        __gotots_switch_selection_0 = 14;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_15 = false;
                    if (!__gotots_switch_match_15) {
                        __gotots_switch_match_15 = __gotots_switch_tag_0 === 48;
                    }
                    if (__gotots_switch_match_15) {
                        __gotots_switch_selection_0 = 15;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_16 = false;
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 49;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 50;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 51;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 52;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 53;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 54;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 55;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 56;
                    }
                    if (!__gotots_switch_match_16) {
                        __gotots_switch_match_16 = __gotots_switch_tag_0 === 57;
                    }
                    if (__gotots_switch_match_16) {
                        __gotots_switch_selection_0 = 16;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_17 = false;
                    if (!__gotots_switch_match_17) {
                        __gotots_switch_match_17 = __gotots_switch_tag_0 === 58;
                    }
                    if (__gotots_switch_match_17) {
                        __gotots_switch_selection_0 = 17;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_18 = false;
                    if (!__gotots_switch_match_18) {
                        __gotots_switch_match_18 = __gotots_switch_tag_0 === 59;
                    }
                    if (__gotots_switch_match_18) {
                        __gotots_switch_selection_0 = 18;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_19 = false;
                    if (!__gotots_switch_match_19) {
                        __gotots_switch_match_19 = __gotots_switch_tag_0 === 60;
                    }
                    if (__gotots_switch_match_19) {
                        __gotots_switch_selection_0 = 19;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_20 = false;
                    if (!__gotots_switch_match_20) {
                        __gotots_switch_match_20 = __gotots_switch_tag_0 === 61;
                    }
                    if (__gotots_switch_match_20) {
                        __gotots_switch_selection_0 = 20;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_21 = false;
                    if (!__gotots_switch_match_21) {
                        __gotots_switch_match_21 = __gotots_switch_tag_0 === 62;
                    }
                    if (__gotots_switch_match_21) {
                        __gotots_switch_selection_0 = 21;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_22 = false;
                    if (!__gotots_switch_match_22) {
                        __gotots_switch_match_22 = __gotots_switch_tag_0 === 63;
                    }
                    if (__gotots_switch_match_22) {
                        __gotots_switch_selection_0 = 22;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_23 = false;
                    if (!__gotots_switch_match_23) {
                        __gotots_switch_match_23 = __gotots_switch_tag_0 === 91;
                    }
                    if (__gotots_switch_match_23) {
                        __gotots_switch_selection_0 = 23;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_24 = false;
                    if (!__gotots_switch_match_24) {
                        __gotots_switch_match_24 = __gotots_switch_tag_0 === 93;
                    }
                    if (__gotots_switch_match_24) {
                        __gotots_switch_selection_0 = 24;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_25 = false;
                    if (!__gotots_switch_match_25) {
                        __gotots_switch_match_25 = __gotots_switch_tag_0 === 94;
                    }
                    if (__gotots_switch_match_25) {
                        __gotots_switch_selection_0 = 25;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_26 = false;
                    if (!__gotots_switch_match_26) {
                        __gotots_switch_match_26 = __gotots_switch_tag_0 === 123;
                    }
                    if (__gotots_switch_match_26) {
                        __gotots_switch_selection_0 = 26;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_27 = false;
                    if (!__gotots_switch_match_27) {
                        __gotots_switch_match_27 = __gotots_switch_tag_0 === 124;
                    }
                    if (__gotots_switch_match_27) {
                        __gotots_switch_selection_0 = 27;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_28 = false;
                    if (!__gotots_switch_match_28) {
                        __gotots_switch_match_28 = __gotots_switch_tag_0 === 125;
                    }
                    if (__gotots_switch_match_28) {
                        __gotots_switch_selection_0 = 28;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_29 = false;
                    if (!__gotots_switch_match_29) {
                        __gotots_switch_match_29 = __gotots_switch_tag_0 === 126;
                    }
                    if (__gotots_switch_match_29) {
                        __gotots_switch_selection_0 = 29;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_30 = false;
                    if (!__gotots_switch_match_30) {
                        __gotots_switch_match_30 = __gotots_switch_tag_0 === 64;
                    }
                    if (__gotots_switch_match_30) {
                        __gotots_switch_selection_0 = 30;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_31 = false;
                    if (!__gotots_switch_match_31) {
                        __gotots_switch_match_31 = __gotots_switch_tag_0 === 92;
                    }
                    if (__gotots_switch_match_31) {
                        __gotots_switch_selection_0 = 31;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_32 = false;
                    if (!__gotots_switch_match_32) {
                        __gotots_switch_match_32 = __gotots_switch_tag_0 === 35;
                    }
                    if (__gotots_switch_match_32) {
                        __gotots_switch_selection_0 = 32;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    __gotots_switch_selection_0 = 33;
                }
                __gotots_control_target_0: {
                    if (__gotots_switch_selection_0 === 0) {
                        const __gotots_store_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_0.pos = __gotots_store_0.pos + 1;
                        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                            continue;
                        }
                        for (;;) {
                            const __gotots_results_0 = Scanner.$go$private$scanner$charAndSize(s);
                            let ch__shadow_1 = __gotots_results_0[0];
                            let size = __gotots_results_0[1];
                            if (!IsWhiteSpaceSingleLine__from_stringutil(ch__shadow_1)) {
                                break;
                            }
                            const __gotots_store_1 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_1.pos = __gotots_store_1.pos + size;
                        }
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindWhitespaceTrivia$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 1) {
                        const __gotots_store_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_2.tokenFlags = __gotots_store_2.tokenFlags | 1;
                        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                            const __gotots_store_3 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_3.pos = __gotots_store_3.pos + 1;
                            Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                                return b === 32 || (b >= 9 && b <= 13);
                            });
                            continue;
                        }
                        if (ch === 13 && Scanner.$go$private$scanner$charAt(s, 1) === 10) {
                            const __gotots_store_4 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_4.pos = __gotots_store_4.pos + 2;
                        }
                        else {
                            const __gotots_store_5 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_5.pos = __gotots_store_5.pos + 1;
                        }
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindNewLineTrivia$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 2) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_6 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_6.pos = __gotots_store_6.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindExclamationEqualsEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_7 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_7.pos = __gotots_store_7.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindExclamationEqualsToken$constant__from_ast();
                            }
                        }
                        else {
                            const __gotots_store_8 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_8.pos = __gotots_store_8.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindExclamationToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 3) {
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = Scanner.$go$private$scanner$scanString(s, false);
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindStringLiteral$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 4) {
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanTemplateAndSetTokenValue(s, false);
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 5) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            const __gotots_store_9 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_9.pos = __gotots_store_9.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPercentEqualsToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_10 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_10.pos = __gotots_store_10.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPercentToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 6) {
                        let next = Scanner.$go$private$scanner$charAt(s, 1);
                        if (next === 38) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_11 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_11.pos = __gotots_store_11.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAmpersandAmpersandEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_12 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_12.pos = __gotots_store_12.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAmpersandAmpersandToken$constant__from_ast();
                            }
                        }
                        else if (next === 61) {
                            const __gotots_store_13 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_13.pos = __gotots_store_13.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAmpersandEqualsToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_14 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_14.pos = __gotots_store_14.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAmpersandToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 7) {
                        const __gotots_store_15 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_15.pos = __gotots_store_15.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenParenToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 8) {
                        const __gotots_store_16 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_16.pos = __gotots_store_16.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseParenToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 9) {
                        let next = Scanner.$go$private$scanner$charAt(s, 1);
                        if (next === 61) {
                            const __gotots_store_17 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_17.pos = __gotots_store_17.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAsteriskEqualsToken$constant__from_ast();
                        }
                        else if (next === 42) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_18 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_18.pos = __gotots_store_18.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAsteriskAsteriskEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_19 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_19.pos = __gotots_store_19.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAsteriskAsteriskToken$constant__from_ast();
                            }
                        }
                        else {
                            const __gotots_store_20 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_20.pos = __gotots_store_20.pos + 1;
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.skipJSDocLeadingAsterisks !== 0 && (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocLeadingAsterisks$constant__from_ast()) === 0 && !((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingLineBreak$constant__from_ast()) === 0)) {
                                const __gotots_store_21 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_21.tokenFlags = __gotots_store_21.tokenFlags | 32768;
                                continue;
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAsteriskToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 10) {
                        let next = Scanner.$go$private$scanner$charAt(s, 1);
                        if (next === 61) {
                            const __gotots_store_22 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_22.pos = __gotots_store_22.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPlusEqualsToken$constant__from_ast();
                        }
                        else if (next === 43) {
                            const __gotots_store_23 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_23.pos = __gotots_store_23.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPlusPlusToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_24 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_24.pos = __gotots_store_24.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPlusToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 11) {
                        const __gotots_store_25 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_25.pos = __gotots_store_25.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCommaToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 12) {
                        let next = Scanner.$go$private$scanner$charAt(s, 1);
                        if (next === 61) {
                            const __gotots_store_26 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_26.pos = __gotots_store_26.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindMinusEqualsToken$constant__from_ast();
                        }
                        else if (next === 45) {
                            const __gotots_store_27 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_27.pos = __gotots_store_27.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindMinusMinusToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_28 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_28.pos = __gotots_store_28.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindMinusToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 13) {
                        let next = Scanner.$go$private$scanner$charAt(s, 1);
                        if (IsDigit__from_stringutil(next)) {
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanNumber(s);
                        }
                        else if (next === 46 && Scanner.$go$private$scanner$charAt(s, 2) === 46) {
                            const __gotots_store_29 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_29.pos = __gotots_store_29.pos + 3;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindDotDotDotToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_30 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_30.pos = __gotots_store_30.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindDotToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 14) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 47) {
                            const __gotots_store_31 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_31.pos = __gotots_store_31.pos + 2;
                            for (;;) {
                                Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                                    return b !== 10 && b !== 13;
                                });
                                const __gotots_results_1 = Scanner.$go$private$scanner$charAndSize(s);
                                let ch1 = __gotots_results_1[0];
                                let size = __gotots_results_1[1];
                                if (size === 0 || IsLineBreak__from_stringutil(ch1)) {
                                    break;
                                }
                                const __gotots_store_32 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_32.pos = __gotots_store_32.pos + size;
                            }
                            Scanner.$go$private$scanner$processCommentDirective(s, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, false);
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindSingleLineCommentTrivia$constant__from_ast();
                            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 42) {
                            const __gotots_store_33 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_33.pos = __gotots_store_33.pos + 2;
                            let isJSDoc = Scanner.$go$private$scanner$char(s) === 42 && Scanner.$go$private$scanner$charAt(s, 1) !== 47;
                            let commentClosed = false;
                            let lastLineStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart;
                            for (;;) {
                                Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                                    return b !== 42 && b !== 10 && b !== 13;
                                });
                                const __gotots_results_2 = Scanner.$go$private$scanner$charAndSize(s);
                                let ch1 = __gotots_results_2[0];
                                let size = __gotots_results_2[1];
                                if (size === 0) {
                                    break;
                                }
                                if (ch1 === 42 && Scanner.$go$private$scanner$charAt(s, 1) === 47) {
                                    const __gotots_store_34 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                    __gotots_store_34.pos = __gotots_store_34.pos + 2;
                                    commentClosed = true;
                                    break;
                                }
                                const __gotots_store_35 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_35.pos = __gotots_store_35.pos + size;
                                if (IsLineBreak__from_stringutil(ch1)) {
                                    lastLineStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                                    const __gotots_store_36 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                    __gotots_store_36.tokenFlags = __gotots_store_36.tokenFlags | 1;
                                }
                            }
                            if (isJSDoc) {
                                const __gotots_store_37 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_37.tokenFlags = __gotots_store_37.tokenFlags | 2;
                                Scanner.$go$private$scanner$scanJSDocCommentForTags(s, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                            }
                            Scanner.$go$private$scanner$processCommentDirective(s, lastLineStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, true);
                            if (!commentClosed) {
                                Scanner.$go$private$scanner$error(s, $state__diagnostics.Asterisk_Slash_expected);
                            }
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            if (!commentClosed) {
                                const __gotots_store_38 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_38.tokenFlags = __gotots_store_38.tokenFlags | 4;
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindMultiLineCommentTrivia$constant__from_ast();
                            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            const __gotots_store_39 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_39.pos = __gotots_store_39.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindSlashEqualsToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_40 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_40.pos = __gotots_store_40.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindSlashToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 15) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 88 || Scanner.$go$private$scanner$charAt(s, 1) === 120) {
                            let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_store_41 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_41.pos = __gotots_store_41.pos + 2;
                            let digits = Scanner.$go$private$scanner$scanHexDigits(s, 1, true, true);
                            if (digits === "") {
                                Scanner.$go$private$scanner$error(s, $state__diagnostics.Hexadecimal_digit_expected);
                                digits = "0";
                            }
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache.isNil()) {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache = GoMap.make<gostring, gostring>("", 0, []);
                            }
                            {
                                const __gotots_results_3 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache.lookupOk(digits);
                                let cachedValue = __gotots_results_3[0];
                                let ok = __gotots_results_3[1];
                                if (ok) {
                                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = cachedValue;
                                }
                                else {
                                    let rawText = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                                    if (strings__from_gostdlib.HasPrefix(rawText, "0x") && goStringSlice(rawText, 2) === digits) {
                                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = rawText;
                                    }
                                    else {
                                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "0x" + digits;
                                    }
                                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexNumberCache.store(digits, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
                                }
                            }
                            const __gotots_store_42 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_42.tokenFlags = __gotots_store_42.tokenFlags | 64;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanBigIntSuffix(s);
                            break __gotots_control_target_0;
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 66 || Scanner.$go$private$scanner$charAt(s, 1) === 98) {
                            const __gotots_store_43 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_43.pos = __gotots_store_43.pos + 2;
                            let digits = Scanner.$go$private$scanner$scanBinaryOrOctalDigits(s, 2);
                            if (digits === "") {
                                Scanner.$go$private$scanner$error(s, $state__diagnostics.Binary_digit_expected);
                                digits = "0";
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "0b" + digits;
                            const __gotots_store_44 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_44.tokenFlags = __gotots_store_44.tokenFlags | 128;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanBigIntSuffix(s);
                            break __gotots_control_target_0;
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 79 || Scanner.$go$private$scanner$charAt(s, 1) === 111) {
                            const __gotots_store_45 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_45.pos = __gotots_store_45.pos + 2;
                            let digits = Scanner.$go$private$scanner$scanBinaryOrOctalDigits(s, 8);
                            if (digits === "") {
                                Scanner.$go$private$scanner$error(s, $state__diagnostics.Octal_digit_expected);
                                digits = "0";
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "0o" + digits;
                            const __gotots_store_46 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_46.tokenFlags = __gotots_store_46.tokenFlags | 256;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanBigIntSuffix(s);
                            break __gotots_control_target_0;
                        }
                        __gotots_switch_selection_0 = 16;
                    }
                    if (__gotots_switch_selection_0 === 16) {
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = Scanner.$go$private$scanner$scanNumber(s);
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 17) {
                        const __gotots_store_47 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_47.pos = __gotots_store_47.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindColonToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 18) {
                        const __gotots_store_48 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_48.pos = __gotots_store_48.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindSemicolonToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 19) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 60 && isConflictMarkerTrivia(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)) {
                            const __gotots_argument_1 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
                            const __gotots_argument_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_receiver_2 = s;
                            const __gotots_argument_3 = ($argument0: {
                                value: Message__from_diagnostics;
                            } | undefined, $argument1: int, $argument2: int, $argument3: RuntimeSlice<GoInterface | undefined>): void => {
                                Scanner.$go$private$scanner$errorAt(__gotots_receiver_2, $argument0, $argument1, $argument2, $argument3);
                            };
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = scanConflictMarkerTrivia(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            else {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindConflictMarkerTrivia$constant__from_ast();
                                return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                            }
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 60) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_49 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_49.pos = __gotots_store_49.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanLessThanEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_50 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_50.pos = __gotots_store_50.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanLessThanToken$constant__from_ast();
                            }
                        }
                        else if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            const __gotots_store_51 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_51.pos = __gotots_store_51.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanEqualsToken$constant__from_ast();
                        }
                        else if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.languageVariant === LanguageVariantJSX$constant__from_core() && Scanner.$go$private$scanner$charAt(s, 1) === 47 && Scanner.$go$private$scanner$charAt(s, 2) !== 42) {
                            const __gotots_store_52 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_52.pos = __gotots_store_52.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanSlashToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_53 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_53.pos = __gotots_store_53.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 20) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61 && isConflictMarkerTrivia(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)) {
                            const __gotots_argument_4 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
                            const __gotots_argument_5 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_receiver_3 = s;
                            const __gotots_argument_6 = ($argument0: {
                                value: Message__from_diagnostics;
                            } | undefined, $argument1: int, $argument2: int, $argument3: RuntimeSlice<GoInterface | undefined>): void => {
                                Scanner.$go$private$scanner$errorAt(__gotots_receiver_3, $argument0, $argument1, $argument2, $argument3);
                            };
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = scanConflictMarkerTrivia(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            else {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindConflictMarkerTrivia$constant__from_ast();
                                return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                            }
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_54 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_54.pos = __gotots_store_54.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsEqualsEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_55 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_55.pos = __gotots_store_55.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsEqualsToken$constant__from_ast();
                            }
                        }
                        else if (Scanner.$go$private$scanner$charAt(s, 1) === 62) {
                            const __gotots_store_56 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_56.pos = __gotots_store_56.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsGreaterThanToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_57 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_57.pos = __gotots_store_57.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 21) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 62 && isConflictMarkerTrivia(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)) {
                            const __gotots_argument_7 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
                            const __gotots_argument_8 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_receiver_4 = s;
                            const __gotots_argument_9 = ($argument0: {
                                value: Message__from_diagnostics;
                            } | undefined, $argument1: int, $argument2: int, $argument3: RuntimeSlice<GoInterface | undefined>): void => {
                                Scanner.$go$private$scanner$errorAt(__gotots_receiver_4, $argument0, $argument1, $argument2, $argument3);
                            };
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = scanConflictMarkerTrivia(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            else {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindConflictMarkerTrivia$constant__from_ast();
                                return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                            }
                        }
                        const __gotots_store_58 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_58.pos = __gotots_store_58.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 22) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 46 && !IsDigit__from_stringutil(Scanner.$go$private$scanner$charAt(s, 2))) {
                            const __gotots_store_59 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_59.pos = __gotots_store_59.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindQuestionDotToken$constant__from_ast();
                        }
                        else if (Scanner.$go$private$scanner$charAt(s, 1) === 63) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_60 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_60.pos = __gotots_store_60.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindQuestionQuestionEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_61 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_61.pos = __gotots_store_61.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindQuestionQuestionToken$constant__from_ast();
                            }
                        }
                        else {
                            const __gotots_store_62 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_62.pos = __gotots_store_62.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindQuestionToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 23) {
                        const __gotots_store_63 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_63.pos = __gotots_store_63.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenBracketToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 24) {
                        const __gotots_store_64 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_64.pos = __gotots_store_64.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseBracketToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 25) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            const __gotots_store_65 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_65.pos = __gotots_store_65.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCaretEqualsToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_66 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_66.pos = __gotots_store_66.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCaretToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 26) {
                        const __gotots_store_67 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_67.pos = __gotots_store_67.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenBraceToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 27) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 124 && isConflictMarkerTrivia(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)) {
                            const __gotots_argument_10 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
                            const __gotots_argument_11 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_receiver_5 = s;
                            const __gotots_argument_12 = ($argument0: {
                                value: Message__from_diagnostics;
                            } | undefined, $argument1: int, $argument2: int, $argument3: RuntimeSlice<GoInterface | undefined>): void => {
                                Scanner.$go$private$scanner$errorAt(__gotots_receiver_5, $argument0, $argument1, $argument2, $argument3);
                            };
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = scanConflictMarkerTrivia(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            else {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindConflictMarkerTrivia$constant__from_ast();
                                return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                            }
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 124) {
                            if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                                const __gotots_store_68 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_68.pos = __gotots_store_68.pos + 3;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindBarBarEqualsToken$constant__from_ast();
                            }
                            else {
                                const __gotots_store_69 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_69.pos = __gotots_store_69.pos + 2;
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindBarBarToken$constant__from_ast();
                            }
                        }
                        else if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                            const __gotots_store_70 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_70.pos = __gotots_store_70.pos + 2;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindBarEqualsToken$constant__from_ast();
                        }
                        else {
                            const __gotots_store_71 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_71.pos = __gotots_store_71.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindBarToken$constant__from_ast();
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 28) {
                        const __gotots_store_72 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_72.pos = __gotots_store_72.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseBraceToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 29) {
                        const __gotots_store_73 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_73.pos = __gotots_store_73.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindTildeToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 30) {
                        const __gotots_store_74 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_74.pos = __gotots_store_74.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAtToken$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 31) {
                        let cp = Scanner.$go$private$scanner$peekUnicodeEscape(s);
                        if (cp >= 0 && IsIdentifierStart(cp)) {
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringEncodeRune(Scanner.$go$private$scanner$scanUnicodeEscape(s, true)) + Scanner.$go$private$scanner$scanIdentifierParts(s);
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = GetIdentifierToken(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
                        }
                        else {
                            Scanner.$go$private$scanner$scanInvalidCharacter(s);
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 32) {
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 33) {
                            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos === 0) {
                                const __gotots_store_75 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_75.pos = __gotots_store_75.pos + 2;
                                {
                                    const __gotots_results_4 = Scanner.$go$private$scanner$charAndSize(s);
                                    let ch__shadow_1 = __gotots_results_4[0];
                                    let size = __gotots_results_4[1];
                                    let __gotots_for_first_0 = true;
                                    for (;;) {
                                        if (__gotots_for_first_0) {
                                            __gotots_for_first_0 = false;
                                        }
                                        else {
                                            const __gotots_results_5 = Scanner.$go$private$scanner$charAndSize(s);
                                            ch__shadow_1 = __gotots_results_5[0];
                                            size = __gotots_results_5[1];
                                        }
                                        if (!(size > 0 && !IsLineBreak__from_stringutil(ch__shadow_1))) {
                                            break;
                                        }
                                        {
                                            const __gotots_store_76 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                            __gotots_store_76.pos = __gotots_store_76.pos + size;
                                        }
                                    }
                                }
                                continue;
                            }
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.X_can_only_be_used_at_the_start_of_a_file, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 2, RuntimeSlice.nil<GoInterface | undefined>());
                            const __gotots_store_77 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_77.pos = __gotots_store_77.pos + 1;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindUnknown$constant__from_ast();
                            break __gotots_control_target_0;
                        }
                        if (Scanner.$go$private$scanner$charAt(s, 1) === 92) {
                            const __gotots_store_78 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_78.pos = __gotots_store_78.pos + 1;
                            let cp = Scanner.$go$private$scanner$peekUnicodeEscape(s);
                            if (cp >= 0 && IsIdentifierStart(cp)) {
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "#" + goStringEncodeRune(Scanner.$go$private$scanner$scanUnicodeEscape(s, true)) + Scanner.$go$private$scanner$scanIdentifierParts(s);
                                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPrivateIdentifier$constant__from_ast();
                                break __gotots_control_target_0;
                            }
                            const __gotots_store_79 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_79.pos = __gotots_store_79.pos - 1;
                        }
                        if (!Scanner.$go$private$scanner$scanIdentifier(s, 1)) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Invalid_character, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = "#";
                        }
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindPrivateIdentifier$constant__from_ast();
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 33) {
                        if (ch < 0) {
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEndOfFile$constant__from_ast();
                            break __gotots_control_target_0;
                        }
                        if (Scanner.$go$private$scanner$scanIdentifier(s, 0)) {
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = GetIdentifierToken(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
                            break __gotots_control_target_0;
                        }
                        const __gotots_results_6 = Scanner.$go$private$scanner$charAndSize(s);
                        let ch__shadow_1 = __gotots_results_6[0];
                        let size = __gotots_results_6[1];
                        if (ch__shadow_1 === RuneError$int32__from_utf8) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.File_appears_to_be_binary, 0, 0, RuntimeSlice.nil<GoInterface | undefined>());
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length;
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindNonTextFileMarkerTrivia$constant__from_ast();
                            break __gotots_control_target_0;
                        }
                        if (IsWhiteSpaceSingleLine__from_stringutil(ch__shadow_1)) {
                            const __gotots_store_80 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_80.pos = __gotots_store_80.pos + size;
                            if (ch__shadow_1 === 133 || ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia) {
                                continue;
                            }
                            for (;;) {
                                const __gotots_results_7 = Scanner.$go$private$scanner$charAndSize(s);
                                ch__shadow_1 = __gotots_results_7[0];
                                size = __gotots_results_7[1];
                                if (!IsWhiteSpaceSingleLine__from_stringutil(ch__shadow_1)) {
                                    break;
                                }
                                const __gotots_store_81 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_81.pos = __gotots_store_81.pos + size;
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindWhitespaceTrivia$constant__from_ast();
                            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                        }
                        if (IsLineBreak__from_stringutil(ch__shadow_1)) {
                            const __gotots_store_82 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_82.tokenFlags = __gotots_store_82.tokenFlags | 1;
                            const __gotots_store_83 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_83.pos = __gotots_store_83.pos + size;
                            continue;
                        }
                        Scanner.$go$private$scanner$scanInvalidCharacter(s);
                        break __gotots_control_target_0;
                    }
                }
            }
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
        }
    }
    static ScanJSDocCommentTextToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, inBackticks: bool): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = TokenFlagsNone$constant__from_ast();
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEndOfFile$constant__from_ast();
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        {
            const __gotots_results_54 = Scanner.$go$private$scanner$charAndSize(s);
            let ch = __gotots_results_54[0];
            let size = __gotots_results_54[1];
            let __gotots_for_first_3 = true;
            for (;;) {
                if (__gotots_for_first_3) {
                    __gotots_for_first_3 = false;
                }
                else {
                    const __gotots_results_55 = Scanner.$go$private$scanner$charAndSize(s);
                    ch = __gotots_results_55[0];
                    size = __gotots_results_55[1];
                }
                if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length && !IsLineBreak__from_stringutil(ch) && ch !== 96)) {
                    break;
                }
                {
                    if (!inBackticks) {
                        if (ch === 123) {
                            break;
                        }
                        else if (ch === 64 && ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= 0) {
                            const __gotots_results_56 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, 0, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                            const __gotots_results_57 = [__gotots_results_56[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_56[1]))] satisfies [
                                int32,
                                int
                            ];
                            let previous = __gotots_results_57[0];
                            if (IsWhiteSpaceSingleLine__from_stringutil(previous)) {
                                const __gotots_results_58 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos + size));
                                const __gotots_results_59 = [__gotots_results_58[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_58[1]))] satisfies [
                                    int32,
                                    int
                                ];
                                let next = __gotots_results_59[0];
                                if (IsIdentifierStart(next)) {
                                    break;
                                }
                            }
                        }
                    }
                    const __gotots_store_158 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_158.pos = __gotots_store_158.pos + size;
                }
            }
        }
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos === ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart) {
            return Scanner.ScanJSDocToken(s);
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindJSDocCommentTextToken$constant__from_ast();
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ScanJSDocToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = TokenFlagsNone$constant__from_ast();
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEndOfFile$constant__from_ast();
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        const __gotots_results_50 = Scanner.$go$private$scanner$charAndSize(s);
        let ch = __gotots_results_50[0];
        let size = __gotots_results_50[1];
        const __gotots_store_150 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_150.pos = __gotots_store_150.pos + size;
        {
            const __gotots_switch_tag_4 = ch;
            let __gotots_switch_selection_4 = -1;
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_60 = false;
                if (!__gotots_switch_match_60) {
                    __gotots_switch_match_60 = __gotots_switch_tag_4 === 9;
                }
                if (!__gotots_switch_match_60) {
                    __gotots_switch_match_60 = __gotots_switch_tag_4 === 11;
                }
                if (!__gotots_switch_match_60) {
                    __gotots_switch_match_60 = __gotots_switch_tag_4 === 12;
                }
                if (!__gotots_switch_match_60) {
                    __gotots_switch_match_60 = __gotots_switch_tag_4 === 32;
                }
                if (__gotots_switch_match_60) {
                    __gotots_switch_selection_4 = 0;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_61 = false;
                if (!__gotots_switch_match_61) {
                    __gotots_switch_match_61 = __gotots_switch_tag_4 === 64;
                }
                if (__gotots_switch_match_61) {
                    __gotots_switch_selection_4 = 1;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_62 = false;
                if (!__gotots_switch_match_62) {
                    __gotots_switch_match_62 = __gotots_switch_tag_4 === 13;
                }
                if (__gotots_switch_match_62) {
                    __gotots_switch_selection_4 = 2;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_63 = false;
                if (!__gotots_switch_match_63) {
                    __gotots_switch_match_63 = __gotots_switch_tag_4 === 10;
                }
                if (__gotots_switch_match_63) {
                    __gotots_switch_selection_4 = 3;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_64 = false;
                if (!__gotots_switch_match_64) {
                    __gotots_switch_match_64 = __gotots_switch_tag_4 === 42;
                }
                if (__gotots_switch_match_64) {
                    __gotots_switch_selection_4 = 4;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_65 = false;
                if (!__gotots_switch_match_65) {
                    __gotots_switch_match_65 = __gotots_switch_tag_4 === 123;
                }
                if (__gotots_switch_match_65) {
                    __gotots_switch_selection_4 = 5;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_66 = false;
                if (!__gotots_switch_match_66) {
                    __gotots_switch_match_66 = __gotots_switch_tag_4 === 125;
                }
                if (__gotots_switch_match_66) {
                    __gotots_switch_selection_4 = 6;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_67 = false;
                if (!__gotots_switch_match_67) {
                    __gotots_switch_match_67 = __gotots_switch_tag_4 === 91;
                }
                if (__gotots_switch_match_67) {
                    __gotots_switch_selection_4 = 7;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_68 = false;
                if (!__gotots_switch_match_68) {
                    __gotots_switch_match_68 = __gotots_switch_tag_4 === 93;
                }
                if (__gotots_switch_match_68) {
                    __gotots_switch_selection_4 = 8;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_69 = false;
                if (!__gotots_switch_match_69) {
                    __gotots_switch_match_69 = __gotots_switch_tag_4 === 40;
                }
                if (__gotots_switch_match_69) {
                    __gotots_switch_selection_4 = 9;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_70 = false;
                if (!__gotots_switch_match_70) {
                    __gotots_switch_match_70 = __gotots_switch_tag_4 === 41;
                }
                if (__gotots_switch_match_70) {
                    __gotots_switch_selection_4 = 10;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_71 = false;
                if (!__gotots_switch_match_71) {
                    __gotots_switch_match_71 = __gotots_switch_tag_4 === 60;
                }
                if (__gotots_switch_match_71) {
                    __gotots_switch_selection_4 = 11;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_72 = false;
                if (!__gotots_switch_match_72) {
                    __gotots_switch_match_72 = __gotots_switch_tag_4 === 62;
                }
                if (__gotots_switch_match_72) {
                    __gotots_switch_selection_4 = 12;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_73 = false;
                if (!__gotots_switch_match_73) {
                    __gotots_switch_match_73 = __gotots_switch_tag_4 === 61;
                }
                if (__gotots_switch_match_73) {
                    __gotots_switch_selection_4 = 13;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_74 = false;
                if (!__gotots_switch_match_74) {
                    __gotots_switch_match_74 = __gotots_switch_tag_4 === 44;
                }
                if (__gotots_switch_match_74) {
                    __gotots_switch_selection_4 = 14;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_75 = false;
                if (!__gotots_switch_match_75) {
                    __gotots_switch_match_75 = __gotots_switch_tag_4 === 46;
                }
                if (__gotots_switch_match_75) {
                    __gotots_switch_selection_4 = 15;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_76 = false;
                if (!__gotots_switch_match_76) {
                    __gotots_switch_match_76 = __gotots_switch_tag_4 === 96;
                }
                if (__gotots_switch_match_76) {
                    __gotots_switch_selection_4 = 16;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_77 = false;
                if (!__gotots_switch_match_77) {
                    __gotots_switch_match_77 = __gotots_switch_tag_4 === 35;
                }
                if (__gotots_switch_match_77) {
                    __gotots_switch_selection_4 = 17;
                }
            }
            if (__gotots_switch_selection_4 === -1) {
                let __gotots_switch_match_78 = false;
                if (!__gotots_switch_match_78) {
                    __gotots_switch_match_78 = __gotots_switch_tag_4 === 92;
                }
                if (__gotots_switch_match_78) {
                    __gotots_switch_selection_4 = 18;
                }
            }
            __gotots_control_target_5: {
                if (__gotots_switch_selection_4 === 0) {
                    {
                        const __gotots_results_51 = Scanner.$go$private$scanner$charAndSize(s);
                        let ch2 = __gotots_results_51[0];
                        let size2 = __gotots_results_51[1];
                        let __gotots_for_first_2 = true;
                        for (;;) {
                            if (__gotots_for_first_2) {
                                __gotots_for_first_2 = false;
                            }
                            else {
                                const __gotots_results_52 = Scanner.$go$private$scanner$charAndSize(s);
                                ch2 = __gotots_results_52[0];
                                size2 = __gotots_results_52[1];
                            }
                            if (!(size2 > 0 && IsWhiteSpaceSingleLine__from_stringutil(ch2))) {
                                break;
                            }
                            {
                                const __gotots_store_151 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_151.pos = __gotots_store_151.pos + size2;
                            }
                        }
                    }
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindWhitespaceTrivia$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 1) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAtToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 2) {
                    if (Scanner.$go$private$scanner$char(s) === 10) {
                        const __gotots_store_152 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_152.pos = __gotots_store_152.pos + 1;
                    }
                    __gotots_switch_selection_4 = 3;
                }
                if (__gotots_switch_selection_4 === 3) {
                    const __gotots_store_153 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_153.tokenFlags = __gotots_store_153.tokenFlags | 1;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindNewLineTrivia$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 4) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindAsteriskToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 5) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenBraceToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 6) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseBraceToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 7) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenBracketToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 8) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseBracketToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 9) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenParenToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 10) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCloseParenToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 11) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 12) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 13) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEqualsToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 14) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindCommaToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 15) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindDotToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 16) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindBacktickToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 17) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindHashToken$constant__from_ast();
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
                if (__gotots_switch_selection_4 === 18) {
                    const __gotots_store_154 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_154.pos = __gotots_store_154.pos - 1;
                    let cp = Scanner.$go$private$scanner$peekUnicodeEscape(s);
                    if (cp >= 0 && IsIdentifierStart(cp)) {
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringEncodeRune(Scanner.$go$private$scanner$scanUnicodeEscape(s, true)) + Scanner.$go$private$scanner$scanIdentifierParts(s);
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = GetIdentifierToken(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
                    }
                    else {
                        const __gotots_store_155 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_155.pos = __gotots_store_155.pos + 1;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindUnknown$constant__from_ast();
                    }
                    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                    break __gotots_control_target_5;
                }
            }
        }
        if (IsIdentifierStart(ch)) {
            let char = ch;
            for (;;) {
                if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length) {
                    break;
                }
                const __gotots_results_53 = Scanner.$go$private$scanner$charAndSize(s);
                char = __gotots_results_53[0];
                size = __gotots_results_53[1];
                if (!IsIdentifierPart(char) && char !== 45) {
                    break;
                }
                const __gotots_store_156 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_156.pos = __gotots_store_156.pos + size;
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
            if (char === 92) {
                const __gotots_store_157 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_157.tokenValue = __gotots_store_157.tokenValue + Scanner.$go$private$scanner$scanIdentifierParts(s);
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = GetIdentifierToken(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
        }
        else {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindUnknown$constant__from_ast();
            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
        }
    }
    static ScanJsxAttributeValue(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        {
            const __gotots_results_66 = Scanner.$go$private$scanner$charAndSize(s);
            let ch = __gotots_results_66[0];
            let size = __gotots_results_66[1];
            let __gotots_for_first_4 = true;
            for (;;) {
                if (__gotots_for_first_4) {
                    __gotots_for_first_4 = false;
                }
                else {
                    const __gotots_results_67 = Scanner.$go$private$scanner$charAndSize(s);
                    ch = __gotots_results_67[0];
                    size = __gotots_results_67[1];
                }
                if (!(size > 0 && IsWhiteSpaceLike__from_stringutil(ch))) {
                    break;
                }
                {
                    const __gotots_store_175 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_175.pos = __gotots_store_175.pos + size;
                }
            }
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        switch (Scanner.$go$private$scanner$char(s)) {
            case 34:
            case 39: {
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = Scanner.$go$private$scanner$scanString(s, true);
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindStringLiteral$constant__from_ast();
                return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                break;
            }
            default: {
                return Scanner.Scan(s);
                break;
            }
        }
    }
    static ScanJsxIdentifier(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (tokenIsIdentifierOrKeyword(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token)) {
            for (;;) {
                let ch = Scanner.$go$private$scanner$char(s);
                if (ch < 0) {
                    break;
                }
                if (ch === 45) {
                    const __gotots_store_170 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_170.tokenValue = __gotots_store_170.tokenValue + "-";
                    const __gotots_store_171 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_171.pos = __gotots_store_171.pos + 1;
                    continue;
                }
                let oldPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                const __gotots_store_172 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_172.tokenValue = __gotots_store_172.tokenValue + Scanner.$go$private$scanner$scanIdentifierParts(s);
                if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos === oldPos) {
                    break;
                }
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = GetIdentifierToken(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static ScanJsxToken(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        return Scanner.ScanJsxTokenEx(s, true);
    }
    static ScanJsxTokenEx(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, allowMultilineJsxText: bool): Kind__from_ast {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let ch = Scanner.$go$private$scanner$char(s);
        __gotots_control_target_6: {
            if (ch < 0) {
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindEndOfFile$constant__from_ast();
            }
            else if (ch === 60) {
                if (Scanner.$go$private$scanner$charAt(s, 1) === 47) {
                    const __gotots_store_159 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_159.pos = __gotots_store_159.pos + 2;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanSlashToken$constant__from_ast();
                }
                else {
                    const __gotots_store_160 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_160.pos = __gotots_store_160.pos + 1;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindLessThanToken$constant__from_ast();
                }
            }
            else if (ch === 123) {
                const __gotots_store_161 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_161.pos = __gotots_store_161.pos + 1;
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindOpenBraceToken$constant__from_ast();
            }
            else {
                let firstNonWhitespace = 0;
                for (;;) {
                    const __gotots_results_60 = Scanner.$go$private$scanner$charAndSize(s);
                    let ch__shadow_1 = __gotots_results_60[0];
                    let size = __gotots_results_60[1];
                    if (size === 0 || ch__shadow_1 === 123) {
                        break;
                    }
                    if (ch__shadow_1 === 60) {
                        if (isConflictMarkerTrivia(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)) {
                            const __gotots_argument_29 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
                            const __gotots_argument_30 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            const __gotots_receiver_6 = s;
                            const __gotots_argument_31 = ($argument0: {
                                value: Message__from_diagnostics;
                            } | undefined, $argument1: int, $argument2: int, $argument3: RuntimeSlice<GoInterface | undefined>): void => {
                                Scanner.$go$private$scanner$errorAt(__gotots_receiver_6, $argument0, $argument1, $argument2, $argument3);
                            };
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = scanConflictMarkerTrivia(__gotots_argument_29, __gotots_argument_30, __gotots_argument_31);
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindConflictMarkerTrivia$constant__from_ast();
                            return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
                        }
                        break;
                    }
                    if (ch__shadow_1 === 62) {
                        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Unexpected_token_Did_you_mean_or_gt, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    else if (ch__shadow_1 === 125) {
                        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Unexpected_token_Did_you_mean_or_rbrace, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    if (IsLineBreak__from_stringutil(ch__shadow_1) && firstNonWhitespace === 0) {
                        firstNonWhitespace = -1;
                    }
                    else if (!allowMultilineJsxText && IsLineBreak__from_stringutil(ch__shadow_1) && firstNonWhitespace > 0) {
                        break;
                    }
                    else if (!IsWhiteSpaceLike__from_stringutil(ch__shadow_1)) {
                        firstNonWhitespace = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                    }
                    const __gotots_store_162 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_162.pos = __gotots_store_162.pos + size;
                }
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindJsxText$constant__from_ast();
                if (firstNonWhitespace === -1) {
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindJsxTextAllWhiteSpaces$constant__from_ast();
                }
            }
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static SetLanguageVariant(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, languageVariant: LanguageVariant__from_core): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.languageVariant = languageVariant;
    }
    static SetOnError(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, errorCallback: ErrorCallback): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.onError = errorCallback;
    }
    static SetScriptTarget(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, scriptTarget: ScriptTarget__from_core): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.scriptTarget = scriptTarget;
    }
    static SetSkipJSDocLeadingAsterisks(scanner: tsonicTypeScriptRuntime.Location<Scanner> | undefined, skip: bool): void {
        if (skip) {
            const __gotots_store_168 = ((scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_168.skipJSDocLeadingAsterisks = __gotots_store_168.skipJSDocLeadingAsterisks + 1;
        }
        else {
            const __gotots_store_169 = ((scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_169.skipJSDocLeadingAsterisks = __gotots_store_169.skipJSDocLeadingAsterisks + -1;
        }
    }
    static SetSkipTrivia(scanner: tsonicTypeScriptRuntime.Location<Scanner> | undefined, skip: bool): void {
        ((scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.skipTrivia = skip;
    }
    static SetText(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, text: gostring): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text = text;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end = text.length;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState = new ScannerState(0, 0, 0, 0, "", 0, RuntimeSlice.nil<CommentDirective__from_ast$Storage>(), 0);
    }
    static Token(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
    }
    static TokenEnd(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): int {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
    }
    static TokenFlags(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): TokenFlags__from_ast {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags;
    }
    static TokenFullStart(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): int {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.fullStartPos;
    }
    static TokenRange(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): TextRange__from_core {
        return NewTextRange__from_core(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
    }
    static TokenStart(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): int {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart;
    }
    static TokenText(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): gostring {
        return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
    }
    static TokenValue(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): gostring {
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue;
    }
    static $go$private$scanner$char(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): int32 {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end) {
            return goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
        }
        return -1;
    }
    static $go$private$scanner$charAndSize(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): [
        int32,
        int
    ] {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end) {
            {
                let b = goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                if (b < RuneSelf$uint8__from_utf8) {
                    return [b, 1];
                }
            }
        }
        const __gotots_results_14 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
        const __gotots_results_15 = [__gotots_results_14[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_14[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_15[0];
        let size = __gotots_results_15[1];
        if (size > 1) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.containsNonASCII = true;
        }
        return [r, size];
    }
    static $go$private$scanner$charAt(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, offset: int): int32 {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos + offset < ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end) {
            return goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos + offset);
        }
        return -1;
    }
    static $go$private$scanner$checkRegularExpressionFlagAvailability(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, flag: regularExpressionFlags, pos: int, size: int): void {
        {
            const __gotots_results_68 = $state.regExpFlagToFirstAvailableLanguageVersion.lookupOk(flag);
            let availableFrom = __gotots_results_68[0];
            let ok = __gotots_results_68[1];
            if (ok && Scanner.$go$private$scanner$languageVersion(s) < availableFrom) {
                Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.This_regular_expression_flag_is_only_available_when_targeting_0_or_later, pos, size, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.ToLower(ScriptTarget_String__from_core(availableFrom)))]));
            }
        }
    }
    static $go$private$scanner$error(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, diagnostic: {
        value: Message__from_diagnostics;
    } | undefined): void {
        Scanner.$go$private$scanner$errorAt(s, diagnostic, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 0, RuntimeSlice.nil<GoInterface | undefined>());
    }
    static $go$private$scanner$errorAt(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, diagnostic: {
        value: Message__from_diagnostics;
    } | undefined, pos: int, length: int, args: RuntimeSlice<GoInterface | undefined>): void {
        if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.onError.$value === undefined)) {
            const __gotots_callee_2 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.onError.$value;
            const __gotots_argument_21 = diagnostic;
            const __gotots_argument_22 = pos;
            const __gotots_argument_23 = length;
            const __gotots_argument_24 = args;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
        }
    }
    static $go$private$scanner$languageVersion(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): ScriptTarget__from_core {
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.scriptTarget === ScriptTargetNone$constant__from_core()) {
            return ScriptTargetLatest$constant__from_core();
        }
        return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.scriptTarget;
    }
    static $go$private$scanner$peekUnicodeEscape(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): int32 {
        if (Scanner.$go$private$scanner$charAt(s, 1) === 117) {
            let savePos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            let saveTokenFlags = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags;
            let codePoint = Scanner.$go$private$scanner$scanUnicodeEscape(s, false);
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = savePos;
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = saveTokenFlags;
            return codePoint;
        }
        return -1;
    }
    static $go$private$scanner$processCommentDirective(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, start: int, end: int, multiline: bool): void {
        let pos = start;
        if (multiline) {
            for (; pos < end && (goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 32 || goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 9);) {
                pos++;
            }
            for (; pos < end && (goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 47 || goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 42);) {
                pos++;
            }
        }
        else {
            pos += 2;
            for (; pos < end && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 47;) {
                pos++;
            }
        }
        for (; pos < end && (goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 32 || goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 9);) {
            pos++;
        }
        if (!(pos < end && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos) === 64)) {
            return;
        }
        pos++;
        let kind = 0;
        __gotots_control_target_1: {
            if (strings__from_gostdlib.HasPrefix(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos), "ts-expect-error")) {
                kind = CommentDirectiveKindExpectError$constant__from_ast();
            }
            else if (strings__from_gostdlib.HasPrefix(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, pos), "ts-ignore")) {
                kind = CommentDirectiveKindIgnore$constant__from_ast();
            }
            else {
                return;
            }
        }
        const __gotots_slice_build_0 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.commentDirectives;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void CommentDirective__from_ast.$storageOf, (void CommentDirective__from_ast.$fromStorage,
                {
                    Loc: TextRange__from_core.$storageOf(NewTextRange__from_core(start, end)),
                    Kind: kind
                })));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<CommentDirective__from_ast$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, CommentDirective__from_ast.$storageOf(CommentDirective__from_ast.$copy(CommentDirective__from_ast.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void CommentDirective__from_ast.$storageOf, (void CommentDirective__from_ast.$fromStorage,
                {
                    Loc: TextRange__from_core.$storageOf(NewTextRange__from_core(start, end)),
                    Kind: kind
                })));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, CommentDirective__from_ast.$storageOf(CommentDirective__from_ast.$zero()));
            }
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.commentDirectives = __gotots_slice_build_1;
    }
    static $go$private$scanner$reScanGreaterThanTokenInner(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): void {
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart + 1;
        if (Scanner.$go$private$scanner$char(s) === 62) {
            if (Scanner.$go$private$scanner$charAt(s, 1) === 62) {
                if (Scanner.$go$private$scanner$charAt(s, 2) === 61) {
                    const __gotots_store_163 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_163.pos = __gotots_store_163.pos + 3;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanGreaterThanGreaterThanEqualsToken$constant__from_ast();
                }
                else {
                    const __gotots_store_164 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_164.pos = __gotots_store_164.pos + 2;
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanGreaterThanGreaterThanToken$constant__from_ast();
                }
            }
            else if (Scanner.$go$private$scanner$charAt(s, 1) === 61) {
                const __gotots_store_165 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_165.pos = __gotots_store_165.pos + 2;
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanGreaterThanEqualsToken$constant__from_ast();
            }
            else {
                const __gotots_store_166 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_166.pos = __gotots_store_166.pos + 1;
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanGreaterThanToken$constant__from_ast();
            }
        }
        else if (Scanner.$go$private$scanner$char(s) === 61) {
            const __gotots_store_167 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_167.pos = __gotots_store_167.pos + 1;
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindGreaterThanEqualsToken$constant__from_ast();
        }
    }
    static $go$private$scanner$scanASCIIWhile(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, pred: (($0: uint8) => bool) | undefined): void {
        let text = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end);
        let i = 0;
        for (; i < text.length;) {
            let b = goStringIndex(text, i);
            let __gotots_logical_result_0 = b >= RuneSelf$uint8__from_utf8;
            if (!__gotots_logical_result_0) {
                const __gotots_callee_1 = pred;
                const __gotots_argument_20 = b;
                __gotots_logical_result_0 = !(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
            }
            if (__gotots_logical_result_0) {
                break;
            }
            i++;
        }
        const __gotots_store_84 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_84.pos = __gotots_store_84.pos + i;
    }
    static $go$private$scanner$scanBigIntSuffix(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        if (Scanner.$go$private$scanner$char(s) === 110) {
            const __gotots_store_114 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_114.tokenValue = __gotots_store_114.tokenValue + "n";
            if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsBinaryOrOctalSpecifier$constant__from_ast()) === 0)) {
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = ParsePseudoBigInt__from_jsnum(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue) + "n";
            }
            const __gotots_store_115 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_115.pos = __gotots_store_115.pos + 1;
            return KindBigIntLiteral$constant__from_ast();
        }
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache.isNil()) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache = GoMap.make<gostring, gostring>("", 0, []);
        }
        {
            const __gotots_results_21 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache.lookupOk(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
            let cached = __gotots_results_21[0];
            let ok = __gotots_results_21[1];
            if (ok) {
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = cached;
            }
            else {
                let tokenValue = FromString__from_jsnum(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue).String();
                if (tokenValue === ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue) {
                    tokenValue = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue;
                }
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.numberCache.store(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue, tokenValue);
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = tokenValue;
            }
        }
        return KindNumericLiteral$constant__from_ast();
    }
    static $go$private$scanner$scanBinaryOrOctalDigits(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, base: int32): gostring {
        let sb = named_strings.StringsBuilderOperations.$zero();
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        for (;;) {
            let ch = Scanner.$go$private$scanner$char(s);
            if (IsDigit__from_stringutil(ch) && ch - 48 < base) {
                strings__from_gostdlib.Builder.WriteByte(sb, ch & 255);
                allowSeparator = true;
                isPreviousTokenSeparator = false;
            }
            else if (ch === 95) {
                const __gotots_store_116 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_116.tokenFlags = __gotots_store_116.tokenFlags | 512;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                }
                else {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                }
            }
            else {
                break;
            }
            const __gotots_store_117 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_117.pos = __gotots_store_117.pos + 1;
        }
        if (isPreviousTokenSeparator) {
            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
        }
        return strings__from_gostdlib.Builder.String(sb);
    }
    static $go$private$scanner$scanDigits(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): [
        gostring,
        bool
    ] {
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let isOctal = true;
        for (; IsDigit__from_stringutil(Scanner.$go$private$scanner$char(s));) {
            if (!IsOctalDigit__from_stringutil(Scanner.$go$private$scanner$char(s))) {
                isOctal = false;
            }
            const __gotots_store_149 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_149.pos = __gotots_store_149.pos + 1;
        }
        return [goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos), isOctal];
    }
    static $go$private$scanner$scanEscapeSequence(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, flags: EscapeSequenceScanningFlags): gostring {
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        const __gotots_store_131 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_131.pos = __gotots_store_131.pos + 1;
        let ch = Scanner.$go$private$scanner$char(s);
        if (ch < 0) {
            Scanner.$go$private$scanner$error(s, $state__diagnostics.Unexpected_end_of_text);
            return "";
        }
        const __gotots_store_132 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_132.pos = __gotots_store_132.pos + 1;
        {
            const __gotots_switch_tag_2 = ch;
            let __gotots_switch_selection_2 = -1;
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_40 = false;
                if (!__gotots_switch_match_40) {
                    __gotots_switch_match_40 = __gotots_switch_tag_2 === 48;
                }
                if (__gotots_switch_match_40) {
                    __gotots_switch_selection_2 = 0;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_41 = false;
                if (!__gotots_switch_match_41) {
                    __gotots_switch_match_41 = __gotots_switch_tag_2 === 49;
                }
                if (!__gotots_switch_match_41) {
                    __gotots_switch_match_41 = __gotots_switch_tag_2 === 50;
                }
                if (!__gotots_switch_match_41) {
                    __gotots_switch_match_41 = __gotots_switch_tag_2 === 51;
                }
                if (__gotots_switch_match_41) {
                    __gotots_switch_selection_2 = 1;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_42 = false;
                if (!__gotots_switch_match_42) {
                    __gotots_switch_match_42 = __gotots_switch_tag_2 === 52;
                }
                if (!__gotots_switch_match_42) {
                    __gotots_switch_match_42 = __gotots_switch_tag_2 === 53;
                }
                if (!__gotots_switch_match_42) {
                    __gotots_switch_match_42 = __gotots_switch_tag_2 === 54;
                }
                if (!__gotots_switch_match_42) {
                    __gotots_switch_match_42 = __gotots_switch_tag_2 === 55;
                }
                if (__gotots_switch_match_42) {
                    __gotots_switch_selection_2 = 2;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_43 = false;
                if (!__gotots_switch_match_43) {
                    __gotots_switch_match_43 = __gotots_switch_tag_2 === 56;
                }
                if (!__gotots_switch_match_43) {
                    __gotots_switch_match_43 = __gotots_switch_tag_2 === 57;
                }
                if (__gotots_switch_match_43) {
                    __gotots_switch_selection_2 = 3;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_44 = false;
                if (!__gotots_switch_match_44) {
                    __gotots_switch_match_44 = __gotots_switch_tag_2 === 98;
                }
                if (__gotots_switch_match_44) {
                    __gotots_switch_selection_2 = 4;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_45 = false;
                if (!__gotots_switch_match_45) {
                    __gotots_switch_match_45 = __gotots_switch_tag_2 === 116;
                }
                if (__gotots_switch_match_45) {
                    __gotots_switch_selection_2 = 5;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_46 = false;
                if (!__gotots_switch_match_46) {
                    __gotots_switch_match_46 = __gotots_switch_tag_2 === 110;
                }
                if (__gotots_switch_match_46) {
                    __gotots_switch_selection_2 = 6;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_47 = false;
                if (!__gotots_switch_match_47) {
                    __gotots_switch_match_47 = __gotots_switch_tag_2 === 118;
                }
                if (__gotots_switch_match_47) {
                    __gotots_switch_selection_2 = 7;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_48 = false;
                if (!__gotots_switch_match_48) {
                    __gotots_switch_match_48 = __gotots_switch_tag_2 === 102;
                }
                if (__gotots_switch_match_48) {
                    __gotots_switch_selection_2 = 8;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_49 = false;
                if (!__gotots_switch_match_49) {
                    __gotots_switch_match_49 = __gotots_switch_tag_2 === 114;
                }
                if (__gotots_switch_match_49) {
                    __gotots_switch_selection_2 = 9;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_50 = false;
                if (!__gotots_switch_match_50) {
                    __gotots_switch_match_50 = __gotots_switch_tag_2 === 39;
                }
                if (__gotots_switch_match_50) {
                    __gotots_switch_selection_2 = 10;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_51 = false;
                if (!__gotots_switch_match_51) {
                    __gotots_switch_match_51 = __gotots_switch_tag_2 === 34;
                }
                if (__gotots_switch_match_51) {
                    __gotots_switch_selection_2 = 11;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_52 = false;
                if (!__gotots_switch_match_52) {
                    __gotots_switch_match_52 = __gotots_switch_tag_2 === 117;
                }
                if (__gotots_switch_match_52) {
                    __gotots_switch_selection_2 = 12;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_53 = false;
                if (!__gotots_switch_match_53) {
                    __gotots_switch_match_53 = __gotots_switch_tag_2 === 120;
                }
                if (__gotots_switch_match_53) {
                    __gotots_switch_selection_2 = 13;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_54 = false;
                if (!__gotots_switch_match_54) {
                    __gotots_switch_match_54 = __gotots_switch_tag_2 === 13;
                }
                if (__gotots_switch_match_54) {
                    __gotots_switch_selection_2 = 14;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_55 = false;
                if (!__gotots_switch_match_55) {
                    __gotots_switch_match_55 = __gotots_switch_tag_2 === 10;
                }
                if (__gotots_switch_match_55) {
                    __gotots_switch_selection_2 = 15;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                __gotots_switch_selection_2 = 16;
            }
            __gotots_control_target_3: {
                if (__gotots_switch_selection_2 === 0) {
                    if (!IsDigit__from_stringutil(Scanner.$go$private$scanner$char(s))) {
                        return "\0";
                    }
                    __gotots_switch_selection_2 = 1;
                }
                if (__gotots_switch_selection_2 === 1) {
                    if (IsOctalDigit__from_stringutil(Scanner.$go$private$scanner$char(s))) {
                        const __gotots_store_133 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_133.pos = __gotots_store_133.pos + 1;
                    }
                    __gotots_switch_selection_2 = 2;
                }
                if (__gotots_switch_selection_2 === 2) {
                    if (IsOctalDigit__from_stringutil(Scanner.$go$private$scanner$char(s))) {
                        const __gotots_store_134 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_134.pos = __gotots_store_134.pos + 1;
                    }
                    const __gotots_store_135 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_135.tokenFlags = __gotots_store_135.tokenFlags | 2048;
                    if (!((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0)) {
                        const __gotots_results_34 = strconv__from_gostdlib.ParseInt(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start + 1, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos), BigInt.asIntN(64, goNumberToBigInt(8)), BigInt.asIntN(64, goNumberToBigInt(32)));
                        const __gotots_results_35 = [__gotots_results_34[0], GoProviderInterfaceBridge.$from(__gotots_results_34[1])] satisfies [
                            int64,
                            $goInterface$Interface_Method_Error_void_to_string | undefined
                        ];
                        let code = __gotots_results_35[0];
                        if (!((flags & EscapeSequenceScanningFlagsRegularExpression$constant()) === 0) && (flags & EscapeSequenceScanningFlagsAtomEscape$constant()) === 0 && ch !== 48) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended_as_an_escape_sequence_use_the_syntax_0_instead, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("\\x%02x", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int64(code)])))]));
                        }
                        else {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("\\x%02x", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int64(code)])))]));
                        }
                        return goStringEncodeRune(globalThis.Number(BigInt.asIntN(32, code)));
                    }
                    return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 3) {
                    const __gotots_store_136 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_136.tokenFlags = __gotots_store_136.tokenFlags | 2048;
                    if (!((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0)) {
                        if (!((flags & EscapeSequenceScanningFlagsRegularExpression$constant()) === 0) && (flags & EscapeSequenceScanningFlagsAtomEscape$constant()) === 0) {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        else {
                            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Escape_sequence_0_is_not_allowed, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos))]));
                        }
                        return goStringEncodeRune(ch);
                    }
                    return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 4) {
                    return "\b";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 5) {
                    return "\t";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 6) {
                    return "\n";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 7) {
                    return "\v";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 8) {
                    return "\f";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 9) {
                    return "\r";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 10) {
                    return "'";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 11) {
                    return "\"";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 12) {
                    let extended = Scanner.$go$private$scanner$char(s) === 123;
                    const __gotots_store_137 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_137.pos = __gotots_store_137.pos - 2;
                    let codePoint = Scanner.$go$private$scanner$scanUnicodeEscape(s, !((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0));
                    if (extended) {
                        if ((flags & EscapeSequenceScanningFlagsAllowExtendedUnicodeEscape$constant()) === 0) {
                            const __gotots_store_138 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                            __gotots_store_138.tokenFlags = __gotots_store_138.tokenFlags | 2048;
                            if (!((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0)) {
                                Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                        }
                        if (codePoint < 0) {
                            return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                        }
                        if ((flags & EscapeSequenceScanningFlagsRegularExpression$constant()) === 0 && IsHighSurrogate__from_stringutil(codePoint)) {
                            {
                                const __gotots_results_36 = Scanner.$go$private$scanner$scanLowSurrogateEscape(s, codePoint);
                                let combined = __gotots_results_36[0];
                                let ok = __gotots_results_36[1];
                                if (ok) {
                                    return goStringEncodeRune(combined);
                                }
                            }
                        }
                        return EncodeJSStringRune__from_stringutil(codePoint);
                    }
                    if (codePoint < 0) {
                        return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                    }
                    else if (IsHighSurrogate__from_stringutil(codePoint)) {
                        if ((flags & EscapeSequenceScanningFlagsRegularExpression$constant()) === 0) {
                            {
                                const __gotots_results_37 = Scanner.$go$private$scanner$scanLowSurrogateEscape(s, codePoint);
                                let combined = __gotots_results_37[0];
                                let ok = __gotots_results_37[1];
                                if (ok) {
                                    return goStringEncodeRune(combined);
                                }
                            }
                        }
                        else if (!((flags & EscapeSequenceScanningFlagsAnyUnicodeMode$constant()) === 0) && Scanner.$go$private$scanner$char(s) === 92 && Scanner.$go$private$scanner$charAt(s, 1) === 117 && Scanner.$go$private$scanner$charAt(s, 2) !== 123) {
                            let savedPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                            let nextCodePoint = Scanner.$go$private$scanner$scanUnicodeEscape(s, !((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0));
                            if (IsLowSurrogate__from_stringutil(nextCodePoint)) {
                                return goStringEncodeRune(SurrogatePairToCodePoint__from_stringutil(codePoint, nextCodePoint));
                            }
                            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = savedPos;
                        }
                    }
                    return EncodeJSStringRune__from_stringutil(codePoint);
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 13) {
                    {
                        let __gotots_for_first_1 = true;
                        for (;;) {
                            if (__gotots_for_first_1) {
                                __gotots_for_first_1 = false;
                            }
                            else {
                                const __gotots_store_139 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                __gotots_store_139.pos = __gotots_store_139.pos + 1;
                            }
                            if (!(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos < start + 4)) {
                                break;
                            }
                            {
                                if (!IsHexDigit__from_stringutil(Scanner.$go$private$scanner$char(s))) {
                                    const __gotots_store_140 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                                    __gotots_store_140.tokenFlags = __gotots_store_140.tokenFlags | 2048;
                                    if (!((flags & EscapeSequenceScanningFlagsReportInvalidEscapeErrors$constant()) === 0)) {
                                        Scanner.$go$private$scanner$error(s, $state__diagnostics.Hexadecimal_digit_expected);
                                    }
                                    return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                                }
                            }
                        }
                    }
                    const __gotots_store_141 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_141.tokenFlags = __gotots_store_141.tokenFlags | 4096;
                    const __gotots_results_38 = strconv__from_gostdlib.ParseInt(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start + 2, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos), BigInt.asIntN(64, goNumberToBigInt(16)), BigInt.asIntN(64, goNumberToBigInt(32)));
                    const __gotots_results_39 = [__gotots_results_38[0], GoProviderInterfaceBridge.$from(__gotots_results_38[1])] satisfies [
                        int64,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ];
                    let escapedValue = __gotots_results_39[0];
                    return goStringEncodeRune(globalThis.Number(BigInt.asIntN(32, escapedValue)));
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 14) {
                    if (Scanner.$go$private$scanner$char(s) === 10) {
                        const __gotots_store_142 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_142.pos = __gotots_store_142.pos + 1;
                    }
                    __gotots_switch_selection_2 = 15;
                }
                if (__gotots_switch_selection_2 === 15) {
                    return "";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_2 === 16) {
                    if (ch >= RuneSelf$int32__from_utf8) {
                        const __gotots_store_143 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_143.pos = __gotots_store_143.pos - 1;
                        let size = 0;
                        const __gotots_results_40 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                        const __gotots_results_41 = [__gotots_results_40[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_40[1]))] satisfies [
                            int32,
                            int
                        ];
                        ch = __gotots_results_41[0];
                        size = __gotots_results_41[1];
                        const __gotots_store_144 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                        __gotots_store_144.pos = __gotots_store_144.pos + size;
                        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.containsNonASCII = true;
                    }
                    if (ch === 8232 || ch === 8233) {
                        return "";
                    }
                    if (!((flags & EscapeSequenceScanningFlagsAnyUnicodeMode$constant()) === 0) || !((flags & EscapeSequenceScanningFlagsRegularExpression$constant()) === 0) && (flags & EscapeSequenceScanningFlagsAnnexB$constant()) === 0 && IsIdentifierPart(ch)) {
                        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    return goStringEncodeRune(ch);
                    break __gotots_control_target_3;
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$scanner$scanHexDigits(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, minCount: int, scanAsManyAsPossible: bool, canHaveSeparators: bool): gostring {
        let digitCount = 0;
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        for (; digitCount < minCount || scanAsManyAsPossible;) {
            let ch = Scanner.$go$private$scanner$char(s);
            if (IsHexDigit__from_stringutil(ch)) {
                allowSeparator = canHaveSeparators;
                isPreviousTokenSeparator = false;
                digitCount++;
            }
            else if (canHaveSeparators && ch === 95) {
                const __gotots_store_112 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_112.tokenFlags = __gotots_store_112.tokenFlags | 512;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                }
                else {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                }
            }
            else {
                break;
            }
            const __gotots_store_113 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_113.pos = __gotots_store_113.pos + 1;
        }
        if (isPreviousTokenSeparator) {
            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
        }
        if (digitCount < minCount) {
            return "";
        }
        let digits = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
        if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache.isNil()) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache = GoMap.make<gostring, gostring>("", 0, []);
        }
        {
            const __gotots_results_20 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache.lookupOk(digits);
            let cached = __gotots_results_20[0];
            let ok = __gotots_results_20[1];
            if (ok) {
                return cached;
            }
            else {
                let original = digits;
                if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsContainsSeparator$constant__from_ast()) === 0)) {
                    digits = strings__from_gostdlib.ReplaceAll(digits, "_", "");
                }
                digits = strings__from_gostdlib.ToLower(digits);
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.hexDigitCache.store(original, digits);
                return digits;
            }
        }
    }
    static $go$private$scanner$scanIdentifier(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, prefixLength: int): bool {
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        const __gotots_store_127 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_127.pos = __gotots_store_127.pos + prefixLength;
        let ch = Scanner.$go$private$scanner$char(s);
        if (IsASCIILetter__from_stringutil(ch) || ch === 95 || ch === 36) {
            const __gotots_store_128 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_128.pos = __gotots_store_128.pos + 1;
            Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                return (b >= 97 && b <= 122) || (b >= 65 && b <= 90) || (b >= 48 && b <= 57) || b === 95 || b === 36;
            });
            ch = Scanner.$go$private$scanner$char(s);
            if (ch < RuneSelf$int32__from_utf8 && ch !== 92) {
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
                return true;
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = start + prefixLength;
        }
        const __gotots_results_26 = Scanner.$go$private$scanner$charAndSize(s);
        ch = __gotots_results_26[0];
        let size = __gotots_results_26[1];
        if (IsIdentifierStart(ch)) {
            for (;;) {
                const __gotots_store_129 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_129.pos = __gotots_store_129.pos + size;
                const __gotots_results_27 = Scanner.$go$private$scanner$charAndSize(s);
                ch = __gotots_results_27[0];
                size = __gotots_results_27[1];
                if (!IsIdentifierPart(ch)) {
                    break;
                }
            }
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
            if (ch === 92) {
                const __gotots_store_130 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_130.tokenValue = __gotots_store_130.tokenValue + Scanner.$go$private$scanner$scanIdentifierParts(s);
            }
            return true;
        }
        return false;
    }
    static $go$private$scanner$scanIdentifierParts(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): gostring {
        let sb = named_strings.StringsBuilderOperations.$zero();
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        for (;;) {
            const __gotots_results_24 = Scanner.$go$private$scanner$charAndSize(s);
            let ch = __gotots_results_24[0];
            let size = __gotots_results_24[1];
            if (IsIdentifierPart(ch)) {
                const __gotots_store_125 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_125.pos = __gotots_store_125.pos + size;
                continue;
            }
            if (ch === 92) {
                let escaped = Scanner.$go$private$scanner$peekUnicodeEscape(s);
                if (escaped >= 0 && IsIdentifierPart(escaped)) {
                    strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                    strings__from_gostdlib.Builder.WriteRune(sb, Scanner.$go$private$scanner$scanUnicodeEscape(s, true));
                    start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                    continue;
                }
            }
            break;
        }
        strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
        return strings__from_gostdlib.Builder.String(sb);
    }
    static $go$private$scanner$scanInvalidCharacter(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): void {
        const __gotots_results_25 = Scanner.$go$private$scanner$charAndSize(s);
        let size = __gotots_results_25[1];
        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Invalid_character, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, size, RuntimeSlice.nil<GoInterface | undefined>());
        const __gotots_store_126 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_126.pos = __gotots_store_126.pos + size;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token = KindUnknown$constant__from_ast();
    }
    static $go$private$scanner$scanJSDocCommentForTags(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, commentText: gostring): void {
        for (;;) {
            let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(commentText, 64)));
            if (i < 0) {
                return;
            }
            commentText = goStringSlice(commentText, i + 1);
            if ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocWithDeprecated$constant__from_ast()) === 0 && hasJSDocTag(commentText, RuntimeSlice.literal<gostring>(["deprecated"]))) {
                const __gotots_store_110 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_110.tokenFlags = __gotots_store_110.tokenFlags | 131072;
            }
            if ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsPrecedingJSDocWithSeeOrLink$constant__from_ast()) === 0 && hasJSDocTag(commentText, RuntimeSlice.literal<gostring>(["see", "link", "linkcode", "linkplain"]))) {
                const __gotots_store_111 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_111.tokenFlags = __gotots_store_111.tokenFlags | 262144;
            }
            if ((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & (393216)) === (393216)) {
                return;
            }
        }
    }
    static $go$private$scanner$scanLowSurrogateEscape(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, high: int32): [
        int32,
        bool
    ] {
        if (Scanner.$go$private$scanner$char(s) !== 92 || Scanner.$go$private$scanner$charAt(s, 1) !== 117) {
            return [0, false];
        }
        let savedPos = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let savedTokenFlags = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags;
        let low = Scanner.$go$private$scanner$scanUnicodeEscape(s, false);
        if (IsLowSurrogate__from_stringutil(low)) {
            return [SurrogatePairToCodePoint__from_stringutil(high, low), true];
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = savedPos;
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags = savedTokenFlags;
        return [0, false];
    }
    static $go$private$scanner$scanNumber(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): Kind__from_ast {
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let fixedPart = "";
        if (Scanner.$go$private$scanner$char(s) === 48) {
            const __gotots_store_100 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_100.pos = __gotots_store_100.pos + 1;
            if (Scanner.$go$private$scanner$char(s) === 95) {
                const __gotots_store_101 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_101.tokenFlags = __gotots_store_101.tokenFlags | 16896;
                Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = start;
                fixedPart = Scanner.$go$private$scanner$scanNumberFragment(s);
            }
            else {
                const __gotots_results_16 = Scanner.$go$private$scanner$scanDigits(s);
                let digits = __gotots_results_16[0];
                let isOctal = __gotots_results_16[1];
                if (digits === "") {
                    fixedPart = "0";
                }
                else if (!isOctal) {
                    const __gotots_store_102 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_102.tokenFlags = __gotots_store_102.tokenFlags | 8192;
                    fixedPart = digits;
                }
                else {
                    const __gotots_results_17 = strconv__from_gostdlib.ParseInt(digits, BigInt.asIntN(64, goNumberToBigInt(8)), BigInt.asIntN(64, goNumberToBigInt(64)));
                    const __gotots_results_18 = [__gotots_results_17[0], GoProviderInterfaceBridge.$from(__gotots_results_17[1])] satisfies [
                        int64,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ];
                    let val = __gotots_results_18[0];
                    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = strconv__from_gostdlib.FormatInt(val, BigInt.asIntN(64, goNumberToBigInt(10)));
                    const __gotots_store_103 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_103.tokenFlags = __gotots_store_103.tokenFlags | 32;
                    let withMinus = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token === KindMinusToken$constant__from_ast();
                    let literal = IfElse$string(withMinus, "-", "") + "0o" + strconv__from_gostdlib.FormatInt(val, BigInt.asIntN(64, goNumberToBigInt(8)));
                    if (withMinus) {
                        start--;
                    }
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Octal_literals_are_not_allowed_Use_the_syntax_0, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(literal)]));
                    return KindNumericLiteral$constant__from_ast();
                }
            }
        }
        else {
            fixedPart = Scanner.$go$private$scanner$scanNumberFragment(s);
        }
        let fixedPartEnd = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let fractionalPart = "";
        let exponentPreamble = "";
        let exponentPart = "";
        if (Scanner.$go$private$scanner$char(s) === 46) {
            const __gotots_store_104 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_104.pos = __gotots_store_104.pos + 1;
            fractionalPart = Scanner.$go$private$scanner$scanNumberFragment(s);
        }
        let end = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        if (Scanner.$go$private$scanner$char(s) === 69 || Scanner.$go$private$scanner$char(s) === 101) {
            const __gotots_store_105 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_105.pos = __gotots_store_105.pos + 1;
            const __gotots_store_106 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_106.tokenFlags = __gotots_store_106.tokenFlags | 16;
            if (Scanner.$go$private$scanner$char(s) === 43 || Scanner.$go$private$scanner$char(s) === 45) {
                const __gotots_store_107 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_107.pos = __gotots_store_107.pos + 1;
            }
            let startNumericPart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            exponentPart = Scanner.$go$private$scanner$scanNumberFragment(s);
            if (exponentPart === "") {
                Scanner.$go$private$scanner$error(s, $state__diagnostics.Digit_expected);
            }
            else {
                exponentPreamble = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, end, startNumericPart);
                end = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            }
        }
        if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsContainsSeparator$constant__from_ast()) === 0)) {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = fixedPart;
            if (fractionalPart !== "") {
                const __gotots_store_108 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_108.tokenValue = __gotots_store_108.tokenValue + ("." + fractionalPart);
            }
            if (exponentPart !== "") {
                const __gotots_store_109 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_109.tokenValue = __gotots_store_109.tokenValue + (exponentPreamble + exponentPart);
            }
        }
        else {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, end);
        }
        if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsContainsLeadingZero$constant__from_ast()) === 0)) {
            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Decimals_with_leading_zeros_are_not_allowed, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = FromString__from_jsnum(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue).String();
            return KindNumericLiteral$constant__from_ast();
        }
        let result = 0;
        if (fixedPartEnd === ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos) {
            result = Scanner.$go$private$scanner$scanBigIntSuffix(s);
        }
        else {
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = FromString__from_jsnum(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue).String();
            result = KindNumericLiteral$constant__from_ast();
        }
        const __gotots_results_19 = Scanner.$go$private$scanner$charAndSize(s);
        let ch = __gotots_results_19[0];
        if (IsIdentifierStart(ch)) {
            let idStart = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            let id = Scanner.$go$private$scanner$scanIdentifierParts(s);
            if (!(result === KindBigIntLiteral$constant__from_ast()) && id.length === 1 && goStringIndex(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, idStart) === 110) {
                if (!((((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenFlags & TokenFlagsScientific$constant__from_ast()) === 0)) {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.A_bigint_literal_cannot_use_exponential_notation, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
                    return result;
                }
                if (fixedPartEnd < idStart) {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.A_bigint_literal_must_be_an_integer, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start, RuntimeSlice.nil<GoInterface | undefined>());
                    return result;
                }
            }
            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, idStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - idStart, RuntimeSlice.nil<GoInterface | undefined>());
            ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = idStart;
        }
        return result;
    }
    static $go$private$scanner$scanNumberFragment(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined): gostring {
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        let result = named_strings.StringsBuilderOperations.$zero();
        for (;;) {
            let before = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
            Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                return b >= 48 && b <= 57;
            });
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos > before) {
                allowSeparator = true;
                isPreviousTokenSeparator = false;
            }
            let ch = Scanner.$go$private$scanner$char(s);
            if (ch === 95) {
                const __gotots_store_145 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_145.tokenFlags = __gotots_store_145.tokenFlags | 512;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                    strings__from_gostdlib.Builder.WriteString(result, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                }
                else {
                    const __gotots_store_146 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_146.tokenFlags = __gotots_store_146.tokenFlags | 16384;
                    if (isPreviousTokenSeparator) {
                        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    else {
                        Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, 1, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                }
                const __gotots_store_147 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_147.pos = __gotots_store_147.pos + 1;
                start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                continue;
            }
            break;
        }
        if (isPreviousTokenSeparator) {
            const __gotots_store_148 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_148.tokenFlags = __gotots_store_148.tokenFlags | 16384;
            Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.Numeric_separators_are_not_allowed_here, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
        }
        if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(result))) === 0) {
            return goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
        }
        strings__from_gostdlib.Builder.WriteString(result, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
        return strings__from_gostdlib.Builder.String(result);
    }
    static $go$private$scanner$scanString(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, jsxAttributeString: bool): gostring {
        let quote = Scanner.$go$private$scanner$char(s);
        if (quote === 39) {
            const __gotots_store_85 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_85.tokenFlags = __gotots_store_85.tokenFlags | 65536;
        }
        const __gotots_store_86 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_86.pos = __gotots_store_86.pos + 1;
        let strLen = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos), quote & 255)));
        if (strLen === 0) {
            const __gotots_store_87 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_87.pos = __gotots_store_87.pos + 1;
            return "";
        }
        if (strLen > 0) {
            let str = goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos + strLen);
            if (jsxAttributeString || globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(str, 92))) < 0 && globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(str, 13))) < 0 && globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(str, 10))) < 0) {
                const __gotots_store_88 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_88.pos = __gotots_store_88.pos + (strLen + 1);
                return str;
            }
        }
        let sb = named_strings.StringsBuilderOperations.$zero();
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        for (;;) {
            let ch = Scanner.$go$private$scanner$char(s);
            if (ch < 0) {
                strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                const __gotots_store_89 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_89.tokenFlags = __gotots_store_89.tokenFlags | 4;
                Scanner.$go$private$scanner$error(s, $state__diagnostics.Unterminated_string_literal);
                break;
            }
            if (ch === quote) {
                strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                const __gotots_store_90 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_90.pos = __gotots_store_90.pos + 1;
                break;
            }
            if (ch === 92 && !jsxAttributeString) {
                strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                strings__from_gostdlib.Builder.WriteString(sb, Scanner.$go$private$scanner$scanEscapeSequence(s, 3));
                start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                continue;
            }
            if ((ch === 10 || ch === 13) && !jsxAttributeString) {
                strings__from_gostdlib.Builder.WriteString(sb, goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos));
                const __gotots_store_91 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_91.tokenFlags = __gotots_store_91.tokenFlags | 4;
                Scanner.$go$private$scanner$error(s, $state__diagnostics.Unterminated_string_literal);
                break;
            }
            const __gotots_store_92 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_92.pos = __gotots_store_92.pos + 1;
        }
        return strings__from_gostdlib.Builder.String(sb);
    }
    static $go$private$scanner$scanTemplateAndSetTokenValue(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, shouldEmitInvalidEscapeError: bool): Kind__from_ast {
        let startedWithBacktick = Scanner.$go$private$scanner$char(s) === 96;
        const __gotots_store_93 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_93.pos = __gotots_store_93.pos + 1;
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let parts = RuntimeSlice.make<gostring>(0, 4, "");
        let token = 0;
        for (;;) {
            Scanner.$go$private$scanner$scanASCIIWhile(s, (b: uint8): bool => {
                return b !== 96 && b !== 36 && b !== 92 && b !== 13;
            });
            let ch = Scanner.$go$private$scanner$char(s);
            if (ch < 0 || ch === 96) {
                parts = parts.append("", [goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)]);
                if (ch === 96) {
                    const __gotots_store_94 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_94.pos = __gotots_store_94.pos + 1;
                }
                else {
                    const __gotots_store_95 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_95.tokenFlags = __gotots_store_95.tokenFlags | 4;
                    Scanner.$go$private$scanner$error(s, $state__diagnostics.Unterminated_template_literal);
                }
                token = IfElse$Named_ast$Kind(startedWithBacktick, KindNoSubstitutionTemplateLiteral$constant__from_ast(), KindTemplateTail$constant__from_ast());
                break;
            }
            if (ch === 36 && Scanner.$go$private$scanner$charAt(s, 1) === 123) {
                parts = parts.append("", [goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)]);
                const __gotots_store_96 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_96.pos = __gotots_store_96.pos + 2;
                token = IfElse$Named_ast$Kind(startedWithBacktick, KindTemplateHead$constant__from_ast(), KindTemplateMiddle$constant__from_ast());
                break;
            }
            if (ch === 92) {
                parts = parts.append("", [goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)]);
                parts = parts.append("", [Scanner.$go$private$scanner$scanEscapeSequence(s, EscapeSequenceScanningFlagsString$constant() | IfElse$Named_scanner$EscapeSequenceScanningFlags(shouldEmitInvalidEscapeError, EscapeSequenceScanningFlagsReportErrors$constant(), 0))]);
                start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                continue;
            }
            if (ch === 13) {
                parts = parts.append("", [goStringSlice(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text, start, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos)]);
                const __gotots_store_97 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_97.pos = __gotots_store_97.pos + 1;
                if (Scanner.$go$private$scanner$char(s) === 10) {
                    const __gotots_store_98 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                    __gotots_store_98.pos = __gotots_store_98.pos + 1;
                }
                parts = parts.append("", ["\n"]);
                start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
                continue;
            }
            const __gotots_store_99 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_99.pos = __gotots_store_99.pos + 1;
        }
        ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = strings__from_gostdlib.Join(parts, "");
        return token;
    }
    static $go$private$scanner$scanUnicodeEscape(s: tsonicTypeScriptRuntime.Location<Scanner> | undefined, shouldEmitInvalidEscapeError: bool): int32 {
        const __gotots_store_118 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_118.pos = __gotots_store_118.pos + 2;
        let start = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
        let extended = Scanner.$go$private$scanner$char(s) === 123;
        let hexDigits = "";
        if (extended) {
            const __gotots_store_119 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_119.pos = __gotots_store_119.pos + 1;
            hexDigits = Scanner.$go$private$scanner$scanHexDigits(s, 1, true, false);
        }
        else {
            const __gotots_store_120 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_120.tokenFlags = __gotots_store_120.tokenFlags | 1024;
            hexDigits = Scanner.$go$private$scanner$scanHexDigits(s, 4, false, false);
        }
        if (hexDigits === "") {
            const __gotots_store_121 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_121.tokenFlags = __gotots_store_121.tokenFlags | 2048;
            if (shouldEmitInvalidEscapeError) {
                Scanner.$go$private$scanner$error(s, $state__diagnostics.Hexadecimal_digit_expected);
            }
            return -1;
        }
        const __gotots_results_22 = strconv__from_gostdlib.ParseInt(hexDigits, BigInt.asIntN(64, goNumberToBigInt(16)), BigInt.asIntN(64, goNumberToBigInt(32)));
        const __gotots_results_23 = [__gotots_results_22[0], GoProviderInterfaceBridge.$from(__gotots_results_22[1])] satisfies [
            int64,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ];
        let hexValue = __gotots_results_23[0];
        if (extended) {
            let isInvalidExtendedEscape = false;
            if (hexValue > 1114111n) {
                if (shouldEmitInvalidEscapeError) {
                    Scanner.$go$private$scanner$errorAt(s, $state__diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive, start + 1, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos - start - 1, RuntimeSlice.nil<GoInterface | undefined>());
                }
                isInvalidExtendedEscape = true;
            }
            if (((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos >= ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end) {
                if (shouldEmitInvalidEscapeError) {
                    Scanner.$go$private$scanner$error(s, $state__diagnostics.Unexpected_end_of_text);
                }
                isInvalidExtendedEscape = true;
            }
            else if (Scanner.$go$private$scanner$char(s) === 125) {
                const __gotots_store_122 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_122.pos = __gotots_store_122.pos + 1;
            }
            else {
                if (shouldEmitInvalidEscapeError) {
                    Scanner.$go$private$scanner$error(s, $state__diagnostics.Unterminated_Unicode_escape_sequence);
                }
                isInvalidExtendedEscape = true;
            }
            if (isInvalidExtendedEscape) {
                const __gotots_store_123 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
                __gotots_store_123.tokenFlags = __gotots_store_123.tokenFlags | 2048;
                return -1;
            }
            const __gotots_store_124 = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
            __gotots_store_124.tokenFlags = __gotots_store_124.tokenFlags | 8;
        }
        return globalThis.Number(BigInt.asIntN(32, hexValue));
    }
}
export function defaultScanner(): Scanner {
    return new Scanner("", 0, 0, 0, new ErrorCallback(void 0), true, ScannerState.$zero(), false, GoMap.nil<gostring, gostring>(""), GoMap.nil<gostring, gostring>(""), GoMap.nil<gostring, gostring>(""));
}
export function NewScanner(): tsonicTypeScriptRuntime.Location<Scanner> | undefined {
    let s = defaultScanner();
    const s$location = tsonicTypeScriptRuntime.boundLocation({}, () => s, s$next => s = s$next);
    return s$location;
}
export function cleared$kernel<M, K, V>($go$clear$T0_to_void: ($0: M) => void, m: M): M {
    $go$clear$T0_to_void(m);
    return m;
}
export function hasJSDocTag(text: gostring, tags: RuntimeSlice<gostring>): bool {
    const __gotots_range_1 = tags;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let tag = __gotots_range_value_1;
        if (!strings__from_gostdlib.HasPrefix(text, tag)) {
            continue;
        }
        if (text.length === tag.length) {
            return true;
        }
        let ch = goStringIndex(text, tag.length);
        if (ch === 32 || ch === 9 || ch === 10 || ch === 13 || ch === 125 || ch === 42) {
            return true;
        }
    }
    return false;
}
export function GetIdentifierToken(str: gostring): Kind__from_ast {
    if (str.length >= 2 && str.length <= 12 && goStringIndex(str, 0) >= 97 && goStringIndex(str, 0) <= 122) {
        let keyword = $state.textToKeyword.lookup(str);
        if (!(keyword === KindUnknown$constant__from_ast())) {
            return keyword;
        }
    }
    return KindIdentifier$constant__from_ast();
}
export function IsValidIdentifier(s: gostring): bool {
    if (s.length === 0) {
        return false;
    }
    const __gotots_range_2 = s;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_2, __gotots_range_index_2);
        const __gotots_range_value_2 = __gotots_range_index_2;
        const __gotots_range_value_3 = __gotots_range_decode_0[0];
        let i = __gotots_range_value_2;
        let ch = __gotots_range_value_3;
        __gotots_range_index_2 += __gotots_range_decode_0[1];
        if (i === 0 && !IsIdentifierStart(ch) || i !== 0 && !IsIdentifierPart(ch)) {
            return false;
        }
    }
    return true;
}
export function isWordCharacter(ch: int32): bool {
    return IsASCIILetter__from_stringutil(ch) || IsDigit__from_stringutil(ch) || ch === 95;
}
export function IsIdentifierStart(ch: int32): bool {
    return IsASCIILetter__from_stringutil(ch) || ch === 95 || ch === 36 || ch >= RuneSelf$int32__from_utf8 && IsUnicodeIdentifierStart__from_stringutil(ch);
}
export function IsIdentifierPart(ch: int32): bool {
    return IsIdentifierPartEx(ch, LanguageVariantStandard$constant__from_core());
}
export function IsIdentifierPartEx(ch: int32, languageVariant: LanguageVariant__from_core): bool {
    return isWordCharacter(ch) || ch === 36 || ch >= RuneSelf$int32__from_utf8 && IsUnicodeIdentifierPart__from_stringutil(ch) || languageVariant === LanguageVariantJSX$constant__from_core() && (ch === 45 || ch === 58);
}
export function TokenToString(token: Kind__from_ast): gostring {
    return $state.tokenToText.get(token);
}
export function StringToToken(s: gostring): Kind__from_ast {
    const __gotots_results_71 = $state.textToToken.lookupOk(s);
    let kind = __gotots_results_71[0];
    let ok = __gotots_results_71[1];
    if (ok) {
        return kind;
    }
    return KindUnknown$constant__from_ast();
}
export function GetViableKeywordSuggestions(): RuntimeSlice<gostring> {
    let result = RuntimeSlice.make<gostring>(0, $state.textToKeyword.length(), "");
    const __gotots_range_5 = $state.textToKeyword;
    const __gotots_range_keys_0 = __gotots_range_5.keys();
    for (const __gotots_range_value_6 of __gotots_range_keys_0) {
        const __gotots_range_value_7 = __gotots_range_5.lookupOk(__gotots_range_value_6);
        if (!__gotots_range_value_7[1]) {
            continue;
        }
        const __gotots_range_value_8 = __gotots_range_value_6;
        let text = __gotots_range_value_8;
        if (text.length > 2) {
            result = result.append("", [text]);
        }
    }
    return result;
}
export class SkipTriviaOptions {
    declare private readonly $goType: void;
    public constructor(public StopAfterLineBreak: bool, public StopAtComments: bool, public InJSDoc: bool) {
    }
    declare private readonly then?: never;
}
export function SkipTrivia(text: gostring, pos: int): int {
    return SkipTriviaEx(text, pos, void 0);
}
export function SkipTriviaEx(text: gostring, pos: int, options: SkipTriviaOptions | undefined): int {
    if (PositionIsSynthesized__from_ast(pos)) {
        return pos;
    }
    if (options === undefined) {
        options = new SkipTriviaOptions(false, false, false);
    }
    let textLen = text.length;
    let canConsumeStar = false;
    for (;;) {
        if (pos >= textLen) {
            return pos;
        }
        const __gotots_results_28 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
        const __gotots_results_29 = [__gotots_results_28[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_28[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_29[0];
        let size = __gotots_results_29[1];
        {
            const __gotots_switch_tag_1 = ch;
            let __gotots_switch_selection_1 = -1;
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_33 = false;
                if (!__gotots_switch_match_33) {
                    __gotots_switch_match_33 = __gotots_switch_tag_1 === 13;
                }
                if (__gotots_switch_match_33) {
                    __gotots_switch_selection_1 = 0;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_34 = false;
                if (!__gotots_switch_match_34) {
                    __gotots_switch_match_34 = __gotots_switch_tag_1 === 10;
                }
                if (__gotots_switch_match_34) {
                    __gotots_switch_selection_1 = 1;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_35 = false;
                if (!__gotots_switch_match_35) {
                    __gotots_switch_match_35 = __gotots_switch_tag_1 === 9;
                }
                if (!__gotots_switch_match_35) {
                    __gotots_switch_match_35 = __gotots_switch_tag_1 === 11;
                }
                if (!__gotots_switch_match_35) {
                    __gotots_switch_match_35 = __gotots_switch_tag_1 === 12;
                }
                if (!__gotots_switch_match_35) {
                    __gotots_switch_match_35 = __gotots_switch_tag_1 === 32;
                }
                if (__gotots_switch_match_35) {
                    __gotots_switch_selection_1 = 2;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_36 = false;
                if (!__gotots_switch_match_36) {
                    __gotots_switch_match_36 = __gotots_switch_tag_1 === 47;
                }
                if (__gotots_switch_match_36) {
                    __gotots_switch_selection_1 = 3;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_37 = false;
                if (!__gotots_switch_match_37) {
                    __gotots_switch_match_37 = __gotots_switch_tag_1 === 60;
                }
                if (!__gotots_switch_match_37) {
                    __gotots_switch_match_37 = __gotots_switch_tag_1 === 124;
                }
                if (!__gotots_switch_match_37) {
                    __gotots_switch_match_37 = __gotots_switch_tag_1 === 61;
                }
                if (!__gotots_switch_match_37) {
                    __gotots_switch_match_37 = __gotots_switch_tag_1 === 62;
                }
                if (__gotots_switch_match_37) {
                    __gotots_switch_selection_1 = 4;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_38 = false;
                if (!__gotots_switch_match_38) {
                    __gotots_switch_match_38 = __gotots_switch_tag_1 === 35;
                }
                if (__gotots_switch_match_38) {
                    __gotots_switch_selection_1 = 5;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_39 = false;
                if (!__gotots_switch_match_39) {
                    __gotots_switch_match_39 = __gotots_switch_tag_1 === 42;
                }
                if (__gotots_switch_match_39) {
                    __gotots_switch_selection_1 = 6;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                __gotots_switch_selection_1 = 7;
            }
            __gotots_control_target_2: {
                if (__gotots_switch_selection_1 === 0) {
                    if (pos + 1 < textLen && goStringIndex(text, pos + 1) === 10) {
                        pos++;
                    }
                    __gotots_switch_selection_1 = 1;
                }
                if (__gotots_switch_selection_1 === 1) {
                    pos++;
                    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).StopAfterLineBreak) {
                        return pos;
                    }
                    canConsumeStar = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).InJSDoc;
                    continue;
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 2) {
                    pos++;
                    continue;
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 3) {
                    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).StopAtComments) {
                        break __gotots_control_target_2;
                    }
                    if (pos + 1 < textLen) {
                        if (goStringIndex(text, pos + 1) === 47) {
                            pos += 2;
                            for (; pos < textLen;) {
                                const __gotots_results_30 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
                                const __gotots_results_31 = [__gotots_results_30[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_30[1]))] satisfies [
                                    int32,
                                    int
                                ];
                                let ch__shadow_1 = __gotots_results_31[0];
                                let size__shadow_1 = __gotots_results_31[1];
                                if (IsLineBreak__from_stringutil(ch__shadow_1)) {
                                    break;
                                }
                                pos += size__shadow_1;
                            }
                            canConsumeStar = false;
                            continue;
                        }
                        if (goStringIndex(text, pos + 1) === 42) {
                            pos += 2;
                            for (; pos < textLen;) {
                                if (goStringIndex(text, pos) === 42 && (pos + 1 < textLen) && goStringIndex(text, pos + 1) === 47) {
                                    pos += 2;
                                    break;
                                }
                                const __gotots_results_32 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
                                const __gotots_results_33 = [__gotots_results_32[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_32[1]))] satisfies [
                                    int32,
                                    int
                                ];
                                let size__shadow_1 = __gotots_results_33[1];
                                pos += size__shadow_1;
                            }
                            canConsumeStar = false;
                            continue;
                        }
                    }
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 4) {
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, void 0);
                        canConsumeStar = false;
                        continue;
                    }
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 5) {
                    if (pos === 0 && isShebangTrivia(text, pos)) {
                        pos = scanShebangTrivia(text, pos);
                        canConsumeStar = false;
                        continue;
                    }
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 6) {
                    if (canConsumeStar) {
                        pos++;
                        canConsumeStar = false;
                        continue;
                    }
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_1 === 7) {
                    if (ch > $state.maxAsciiCharacter && IsWhiteSpaceLike__from_stringutil(ch)) {
                        pos += size;
                        continue;
                    }
                    break __gotots_control_target_2;
                }
            }
        }
        return pos;
    }
}
export function isConflictMarkerTrivia(text: gostring, pos: int): bool {
    if (pos < 0) {
        const __gotots_argument_14 = new $goInterfaceAdapter$string("pos < 0");
        GoPanic.raise(__gotots_argument_14 === undefined ? GoPanicNilValue.create() : __gotots_argument_14);
    }
    if (pos + 1 >= text.length || goStringIndex(text, pos + 1) !== goStringIndex(text, pos)) {
        return false;
    }
    let atLineStart = pos === 0 || IsLineBreak__from_stringutil(goStringIndex(text, pos - 1));
    if (!atLineStart && pos >= 2) {
        const __gotots_results_8 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(text, 0, pos - 2));
        const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
            int32,
            int
        ];
        let prev = __gotots_results_9[0];
        atLineStart = IsLineBreak__from_stringutil(prev);
    }
    if (atLineStart) {
        let ch = goStringIndex(text, pos);
        if ((pos + $state.mergeConflictMarkerLength) < text.length) {
            const __gotots_range_0 = $state.mergeConflictMarkerLength;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_index_0;
                let i = __gotots_range_value_0;
                if (goStringIndex(text, pos + i) !== ch) {
                    return false;
                }
            }
            return ch === 61 || goStringIndex(text, pos + $state.mergeConflictMarkerLength) === 32;
        }
    }
    return false;
}
export function scanConflictMarkerTrivia(text: gostring, pos: int, reportError: (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: int, $2: int, $3: RuntimeSlice<GoInterface | undefined>) => void) | undefined): int {
    if (!(reportError === undefined)) {
        const __gotots_callee_0 = reportError;
        const __gotots_argument_15 = $state__diagnostics.Merge_conflict_marker_encountered;
        const __gotots_argument_16 = pos;
        const __gotots_argument_17 = $state.mergeConflictMarkerLength;
        const __gotots_argument_18 = RuntimeSlice.nil<GoInterface | undefined>();
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
    }
    const __gotots_results_10 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
    const __gotots_results_11 = [__gotots_results_10[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_10[1]))] satisfies [
        int32,
        int
    ];
    let ch = __gotots_results_11[0];
    let size = __gotots_results_11[1];
    let length = text.length;
    if (ch === 60 || ch === 62) {
        for (; pos < length && !IsLineBreak__from_stringutil(ch);) {
            pos += size;
            const __gotots_results_12 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_13 = [__gotots_results_12[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_12[1]))] satisfies [
                int32,
                int
            ];
            ch = __gotots_results_13[0];
            size = __gotots_results_13[1];
        }
    }
    else {
        if (ch !== 124 && ch !== 61) {
            const __gotots_argument_19 = new $goInterfaceAdapter$string("Assertion failed: ch must be either '|' or '='");
            GoPanic.raise(__gotots_argument_19 === undefined ? GoPanicNilValue.create() : __gotots_argument_19);
        }
        for (; pos < length;) {
            let currentChar = goStringIndex(text, pos);
            if ((currentChar === 61 || currentChar === 62) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                break;
            }
            pos++;
        }
    }
    return pos;
}
export function isShebangTrivia(text: gostring, pos: int): bool {
    if (text.length < 2) {
        return false;
    }
    if (pos !== 0) {
        const __gotots_argument_26 = new $goInterfaceAdapter$string("Shebangs check must only be done at the start of the file");
        GoPanic.raise(__gotots_argument_26 === undefined ? GoPanicNilValue.create() : __gotots_argument_26);
    }
    return goStringIndex(text, 0) === 35 && goStringIndex(text, 1) === 33;
}
export function scanShebangTrivia(text: gostring, pos: int): int {
    pos += 2;
    for (; pos < text.length;) {
        const __gotots_results_42 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
        const __gotots_results_43 = [__gotots_results_42[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_42[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_43[0];
        let size = __gotots_results_43[1];
        if (IsLineBreak__from_stringutil(ch)) {
            break;
        }
        pos += size;
    }
    return pos;
}
export function GetShebang(text: gostring): gostring {
    if (!isShebangTrivia(text, 0)) {
        return "";
    }
    let end = scanShebangTrivia(text, 0);
    return goStringSlice(text, 0, end);
}
export function GetScannerForSourceFile(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): tsonicTypeScriptRuntime.Location<Scanner> | undefined {
    let s: tsonicTypeScriptRuntime.Location<Scanner> | undefined = NewScanner();
    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text = SourceFile__from_ast.Text(sourceFile);
    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos = pos;
    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.end = ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text.length;
    ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.languageVariant = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant;
    Scanner.Scan(s);
    return s;
}
export function ScanTokenAtPosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): Kind__from_ast {
    let s: tsonicTypeScriptRuntime.Location<Scanner> | undefined = GetScannerForSourceFile(sourceFile, pos);
    return ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.token;
}
export function GetRangeOfTokenAtPosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): TextRange__from_core {
    let s: tsonicTypeScriptRuntime.Location<Scanner> | undefined = GetScannerForSourceFile(sourceFile, pos);
    return NewTextRange__from_core(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, ((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos);
}
export function GetTokenPosOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeJSDoc: bool): int {
    if (NodeIsMissing__from_ast(node)) {
        return Node__from_ast.Pos(node);
    }
    if (IsJSDocNode__from_ast(node) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast()) {
        return SkipTriviaEx(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node), new SkipTriviaOptions(false, true, false));
    }
    if (includeJSDoc && Node__from_ast.JSDoc(node, sourceFile).length > 0) {
        return GetTokenPosOfNode(Node__from_ast.JSDoc(node, sourceFile).get(0), sourceFile, false);
    }
    return SkipTriviaEx(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node), new SkipTriviaOptions(false, false, !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0)));
}
export function getErrorRangeForArrowFunction(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    let pos = SkipTrivia(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node));
    let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(node);
    if (!(body === undefined) && Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBlock$constant__from_ast()) {
        let startLine = GetECMALineOfPosition(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), Node__from_ast.Pos(body));
        let endLine = GetECMALineOfPosition(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), Node__from_ast.End(body));
        if (startLine < endLine) {
            return NewTextRange__from_core(pos, GetECMAEndLinePosition(sourceFile, startLine) + 1);
        }
    }
    return NewTextRange__from_core(pos, Node__from_ast.End(node));
}
export function findOriginatingJSDocSatisfiesTag(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let targetType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsSatisfiesExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
    if ((Node__from_ast.$storageOf(((targetType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
        return void 0;
    }
    for (let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent; !(current === undefined); current = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) {
        if ((Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsHasJSDoc$constant__from_ast()) >>> 0 === 0) {
            continue;
        }
        let firstSatisfiesTag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_range_3 = Node__from_ast.EagerJSDoc(current, sourceFile);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            {
                let tags: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = JSDoc__from_ast.$storageOf(((Node__from_ast.AsJSDoc(jsDoc) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSDoc__from_ast>).value).Tags;
                if (!(tags === undefined)) {
                    const __gotots_range_4 = NodeList__from_ast.$storageOf(((tags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                        const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
                        let tag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
                        if (!IsJSDocSatisfiesTag__from_ast(tag)) {
                            continue;
                        }
                        if (firstSatisfiesTag === undefined) {
                            firstSatisfiesTag = tag;
                        }
                        {
                            let typeExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (Node__from_ast.AsJSDocSatisfiesTag(tag) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeExpression;
                            if (!(typeExpr === undefined)) {
                                {
                                    let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(typeExpr);
                                    if (!(t === undefined) && TextRange__from_core.$equal(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc), TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((targetType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc))) {
                                        return tag;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return firstSatisfiesTag;
    }
    return void 0;
}
export function GetErrorRangeForNode(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextRange__from_core {
    let errorNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    {
        const __gotots_switch_tag_5 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_5 = -1;
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_79 = false;
            if (!__gotots_switch_match_79) {
                __gotots_switch_match_79 = __gotots_switch_tag_5 === KindSourceFile$constant__from_ast();
            }
            if (__gotots_switch_match_79) {
                __gotots_switch_selection_5 = 0;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_80 = false;
            if (!__gotots_switch_match_80) {
                __gotots_switch_match_80 = __gotots_switch_tag_5 === KindFunctionDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_80) {
                __gotots_switch_match_80 = __gotots_switch_tag_5 === KindMethodDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_80) {
                __gotots_switch_selection_5 = 1;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_81 = false;
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindVariableDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindBindingElement$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindClassDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindModuleDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindEnumDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindEnumMember$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindFunctionExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindTypeAliasDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindJSTypeAliasDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindPropertyDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindPropertySignature$constant__from_ast();
            }
            if (!__gotots_switch_match_81) {
                __gotots_switch_match_81 = __gotots_switch_tag_5 === KindNamespaceImport$constant__from_ast();
            }
            if (__gotots_switch_match_81) {
                __gotots_switch_selection_5 = 2;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_82 = false;
            if (!__gotots_switch_match_82) {
                __gotots_switch_match_82 = __gotots_switch_tag_5 === KindClassExpression$constant__from_ast();
            }
            if (__gotots_switch_match_82) {
                __gotots_switch_selection_5 = 3;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_83 = false;
            if (!__gotots_switch_match_83) {
                __gotots_switch_match_83 = __gotots_switch_tag_5 === KindArrowFunction$constant__from_ast();
            }
            if (__gotots_switch_match_83) {
                __gotots_switch_selection_5 = 4;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_84 = false;
            if (!__gotots_switch_match_84) {
                __gotots_switch_match_84 = __gotots_switch_tag_5 === KindCaseClause$constant__from_ast();
            }
            if (!__gotots_switch_match_84) {
                __gotots_switch_match_84 = __gotots_switch_tag_5 === KindDefaultClause$constant__from_ast();
            }
            if (__gotots_switch_match_84) {
                __gotots_switch_selection_5 = 5;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_85 = false;
            if (!__gotots_switch_match_85) {
                __gotots_switch_match_85 = __gotots_switch_tag_5 === KindReturnStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_85) {
                __gotots_switch_match_85 = __gotots_switch_tag_5 === KindYieldExpression$constant__from_ast();
            }
            if (__gotots_switch_match_85) {
                __gotots_switch_selection_5 = 6;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_86 = false;
            if (!__gotots_switch_match_86) {
                __gotots_switch_match_86 = __gotots_switch_tag_5 === KindSatisfiesExpression$constant__from_ast();
            }
            if (__gotots_switch_match_86) {
                __gotots_switch_selection_5 = 7;
            }
        }
        if (__gotots_switch_selection_5 === -1) {
            let __gotots_switch_match_87 = false;
            if (!__gotots_switch_match_87) {
                __gotots_switch_match_87 = __gotots_switch_tag_5 === KindConstructor$constant__from_ast();
            }
            if (__gotots_switch_match_87) {
                __gotots_switch_selection_5 = 8;
            }
        }
        __gotots_control_target_7: {
            if (__gotots_switch_selection_5 === 0) {
                let pos__shadow_1 = SkipTrivia(SourceFile__from_ast.Text(sourceFile), 0);
                if (pos__shadow_1 === SourceFile__from_ast.Text(sourceFile).length) {
                    return NewTextRange__from_core(0, 0);
                }
                return GetRangeOfTokenAtPosition(sourceFile, pos__shadow_1);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 1) {
                if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                    errorNode = node;
                    break __gotots_control_target_7;
                }
                __gotots_switch_selection_5 = 2;
            }
            if (__gotots_switch_selection_5 === 2) {
                errorNode = GetNameOfDeclaration__from_ast(node);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 3) {
                errorNode = Node__from_ast.Name(node);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 4) {
                return getErrorRangeForArrowFunction(sourceFile, node);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 5) {
                let start = SkipTrivia(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node));
                let end = Node__from_ast.End(node);
                let statements = Node__from_ast.Statements(node);
                if (statements.length !== 0) {
                    end = Node__from_ast.Pos(statements.get(0));
                }
                return NewTextRange__from_core(start, end);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 6) {
                let pos__shadow_1 = SkipTrivia(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(node));
                return GetRangeOfTokenAtPosition(sourceFile, pos__shadow_1);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 7) {
                {
                    let jsDocSatisfiesTag: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findOriginatingJSDocSatisfiesTag(sourceFile, node);
                    if (!(jsDocSatisfiesTag === undefined)) {
                        let pos__shadow_2 = SkipTrivia(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(Node__from_ast.TagName(jsDocSatisfiesTag)));
                        return GetRangeOfTokenAtPosition(sourceFile, pos__shadow_2);
                    }
                }
                let pos__shadow_1 = SkipTrivia(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End((Node__from_ast.AsSatisfiesExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression));
                return GetRangeOfTokenAtPosition(sourceFile, pos__shadow_1);
                break __gotots_control_target_7;
            }
            if (__gotots_switch_selection_5 === 8) {
                if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                    errorNode = node;
                    break __gotots_control_target_7;
                }
                let scanner: tsonicTypeScriptRuntime.Location<Scanner> | undefined = GetScannerForSourceFile(sourceFile, Node__from_ast.Pos(node));
                let start = Scanner.TokenStart(scanner);
                for (; !(Scanner.Token(scanner) === KindConstructorKeyword$constant__from_ast()) && !(Scanner.Token(scanner) === KindStringLiteral$constant__from_ast()) && !(Scanner.Token(scanner) === KindEndOfFile$constant__from_ast());) {
                    Scanner.Scan(scanner);
                }
                return NewTextRange__from_core(start, Scanner.TokenEnd(scanner));
                break __gotots_control_target_7;
            }
        }
    }
    if (errorNode === undefined) {
        return GetRangeOfTokenAtPosition(sourceFile, Node__from_ast.Pos(node));
    }
    let pos = Node__from_ast.Pos(errorNode);
    if (!NodeIsMissing__from_ast(errorNode) && !IsJsxText__from_ast(errorNode)) {
        pos = SkipTrivia(SourceFile__from_ast.Text(sourceFile), pos);
    }
    return NewTextRange__from_core(pos, Node__from_ast.End(errorNode));
}
export function ComputeLineOfPosition(lineStarts: RuntimeSlice<TextPos__from_core>, pos: int): int {
    let low = 0;
    let high = lineStarts.length - 1;
    for (; low <= high;) {
        let middle = low + ((high - low) >> 1);
        let value = lineStarts.get(middle);
        if (value < pos) {
            low = middle + 1;
        }
        else if (value > pos) {
            high = middle - 1;
        }
        else {
            return middle;
        }
    }
    return low - 1;
}
export function GetECMALineStarts(sourceFile: SourceFileLike__from_ast | undefined): RuntimeSlice<TextPos__from_core> {
    const __gotots_receiver_1 = sourceFile;
    return goInterfaceNonNil<SourceFileLike__from_ast>(__gotots_receiver_1).ECMALineMap();
}
export function GetECMALineOfPosition(sourceFile: SourceFileLike__from_ast | undefined, pos: int): int {
    let lineMap = GetECMALineStarts(sourceFile);
    return ComputeLineOfPosition(lineMap, pos);
}
export function GetECMALineAndUTF16CharacterOfPosition(sourceFile: SourceFileLike__from_ast | undefined, pos: int): [
    int,
    UTF16Offset__from_core
] {
    let line: int = 0;
    let character: UTF16Offset__from_core = new UTF16Offset__from_core(0);
    let lineMap = GetECMALineStarts(sourceFile);
    line = ComputeLineOfPosition(lineMap, pos);
    const __gotots_receiver_0 = sourceFile;
    const __gotots_slice_operand_0 = goInterfaceNonNil<SourceFileLike__from_ast>(__gotots_receiver_0).Text();
    const __gotots_slice_operand_1 = lineMap.get(line);
    const __gotots_slice_operand_2 = pos;
    const __gotots_argument_0 = goStringSlice(__gotots_slice_operand_0, __gotots_slice_operand_1, __gotots_slice_operand_2);
    character = UTF16Len__from_core(__gotots_argument_0);
    return [line, character];
}
export function GetECMALineAndByteOffsetOfPosition(sourceFile: SourceFileLike__from_ast | undefined, pos: int): [
    int,
    int
] {
    let line: int = 0;
    let byteOffset: int = 0;
    let lineMap = GetECMALineStarts(sourceFile);
    line = ComputeLineOfPosition(lineMap, pos);
    byteOffset = pos - lineMap.get(line);
    return [line, byteOffset];
}
export function GetECMAEndLinePosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, line: int): int {
    let pos = GetECMALineStarts(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile)).get(line);
    for (;;) {
        const __gotots_results_69 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(SourceFile__from_ast.Text(sourceFile), pos));
        const __gotots_results_70 = [__gotots_results_69[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_69[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_70[0];
        let size = __gotots_results_70[1];
        if (size === 0 || IsLineBreak__from_stringutil(ch)) {
            return pos - 1;
        }
        pos += size;
    }
}
export function GetECMAPositionOfLineAndByteOffset(sourceFile: SourceFileLike__from_ast | undefined, line: int, byteOffset: int): int {
    return ComputePositionOfLineAndByteOffset(GetECMALineStarts(sourceFile), line, byteOffset);
}
export function ComputePositionOfLineAndByteOffset(lineStarts: RuntimeSlice<TextPos__from_core>, line: int, byteOffset: int): int {
    if (line < 0 || line >= lineStarts.length) {
        const __gotots_argument_13 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Bad line number. Line: %d, lineStarts.length: %d.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(line), new GoInterfaceAdapter(lineStarts.length)])));
        GoPanic.raise(__gotots_argument_13 === undefined ? GoPanicNilValue.create() : __gotots_argument_13);
    }
    return lineStarts.get(line) + byteOffset;
}
export function ComputePositionOfLineAndUTF16Character(lineStarts: RuntimeSlice<TextPos__from_core>, line: int, character: UTF16Offset__from_core, text: gostring, allowEdits: bool): int {
    if (line < 0 || line >= lineStarts.length) {
        if (allowEdits) {
            if (line < 0) {
                line = 0;
            }
            else if (line >= lineStarts.length) {
                line = lineStarts.length - 1;
            }
        }
        else {
            const __gotots_argument_34 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Bad line number. Line: %d, lineStarts.length: %d.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(line), new GoInterfaceAdapter(lineStarts.length)])));
            GoPanic.raise(__gotots_argument_34 === undefined ? GoPanicNilValue.create() : __gotots_argument_34);
        }
    }
    let lineStart = lineStarts.get(line);
    if (character.$value > 0) {
        let lineEnd = text.length;
        if (line + 1 < lineStarts.length) {
            lineEnd = lineStarts.get(line + 1);
        }
        let utf16Count = new UTF16Offset__from_core(0);
        let pos = lineStart;
        for (; pos < lineEnd;) {
            if (utf16Count.$value >= character.$value) {
                break;
            }
            const __gotots_results_72 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_73 = [__gotots_results_72[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_72[1]))] satisfies [
                int32,
                int
            ];
            let r = __gotots_results_73[0];
            let size = __gotots_results_73[1];
            utf16Count = new UTF16Offset__from_core(utf16Count.$value +
                ((void UTF16Offset__from_core,
                    globalThis.Number(BigInt.asIntN(64, utf16__from_gostdlib.RuneLen(r)))) as number));
            pos += size;
        }
        if (!allowEdits) {
            if (pos === lineEnd && utf16Count.$value < character.$value) {
                const __gotots_argument_35 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Bad UTF-16 character offset. Line: %d, character: %d.", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(line), new $goInterfaceAdapter$Named_core$UTF16Offset(character)])));
                GoPanic.raise(__gotots_argument_35 === undefined ? GoPanicNilValue.create() : __gotots_argument_35);
            }
            Assert__from_debug(pos <= text.length, RuntimeSlice.nil<GoInterface | undefined>());
            return pos;
        }
        if (pos > text.length) {
            return text.length;
        }
        return pos;
    }
    let res = lineStart;
    if (allowEdits) {
        if (res > text.length) {
            return text.length;
        }
        return res;
    }
    Assert__from_debug(res <= text.length, RuntimeSlice.nil<GoInterface | undefined>());
    return res;
}
export function GetLeadingCommentRanges(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, text: gostring, pos: int): iter__from_gostdlib.Seq<CommentRange__from_ast> {
    return iterateCommentRanges(f, text, pos, false);
}
export function GetTrailingCommentRanges(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, text: gostring, pos: int): iter__from_gostdlib.Seq<CommentRange__from_ast> {
    return iterateCommentRanges(f, text, pos, true);
}
export function iterateCommentRanges(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, text: gostring, pos: int, trailing: bool): iter__from_gostdlib.Seq<CommentRange__from_ast> {
    return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: CommentRange__from_ast) => bool) | undefined): void => {
        let pendingPos = 0;
        let pendingEnd = 0;
        let pendingKind = 0;
        let pendingHasTrailingNewLine = false;
        let hasPendingCommentRange = false;
        let collecting = trailing;
        if (pos === 0) {
            collecting = true;
            if (isShebangTrivia(text, pos)) {
                pos = scanShebangTrivia(text, pos);
            }
        }
        scan: for (; pos >= 0 && pos < text.length;) {
            const __gotots_results_44 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_45 = [__gotots_results_44[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_44[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_45[0];
            let size = __gotots_results_45[1];
            {
                const __gotots_switch_tag_3 = ch;
                let __gotots_switch_selection_3 = -1;
                if (__gotots_switch_selection_3 === -1) {
                    let __gotots_switch_match_56 = false;
                    if (!__gotots_switch_match_56) {
                        __gotots_switch_match_56 = __gotots_switch_tag_3 === 13;
                    }
                    if (__gotots_switch_match_56) {
                        __gotots_switch_selection_3 = 0;
                    }
                }
                if (__gotots_switch_selection_3 === -1) {
                    let __gotots_switch_match_57 = false;
                    if (!__gotots_switch_match_57) {
                        __gotots_switch_match_57 = __gotots_switch_tag_3 === 10;
                    }
                    if (__gotots_switch_match_57) {
                        __gotots_switch_selection_3 = 1;
                    }
                }
                if (__gotots_switch_selection_3 === -1) {
                    let __gotots_switch_match_58 = false;
                    if (!__gotots_switch_match_58) {
                        __gotots_switch_match_58 = __gotots_switch_tag_3 === 9;
                    }
                    if (!__gotots_switch_match_58) {
                        __gotots_switch_match_58 = __gotots_switch_tag_3 === 11;
                    }
                    if (!__gotots_switch_match_58) {
                        __gotots_switch_match_58 = __gotots_switch_tag_3 === 12;
                    }
                    if (!__gotots_switch_match_58) {
                        __gotots_switch_match_58 = __gotots_switch_tag_3 === 32;
                    }
                    if (__gotots_switch_match_58) {
                        __gotots_switch_selection_3 = 2;
                    }
                }
                if (__gotots_switch_selection_3 === -1) {
                    let __gotots_switch_match_59 = false;
                    if (!__gotots_switch_match_59) {
                        __gotots_switch_match_59 = __gotots_switch_tag_3 === 47;
                    }
                    if (__gotots_switch_match_59) {
                        __gotots_switch_selection_3 = 3;
                    }
                }
                if (__gotots_switch_selection_3 === -1) {
                    __gotots_switch_selection_3 = 4;
                }
                __gotots_control_target_4: {
                    if (__gotots_switch_selection_3 === 0) {
                        if (pos + 1 < text.length && goStringIndex(text, pos + 1) === 10) {
                            pos++;
                        }
                        __gotots_switch_selection_3 = 1;
                    }
                    if (__gotots_switch_selection_3 === 1) {
                        pos++;
                        if (trailing) {
                            break scan;
                        }
                        collecting = true;
                        if (hasPendingCommentRange) {
                            pendingHasTrailingNewLine = true;
                        }
                        continue;
                        break __gotots_control_target_4;
                    }
                    if (__gotots_switch_selection_3 === 2) {
                        pos++;
                        continue;
                        break __gotots_control_target_4;
                    }
                    if (__gotots_switch_selection_3 === 3) {
                        let nextChar = 0;
                        if (pos + 1 < text.length) {
                            nextChar = goStringIndex(text, pos + 1);
                        }
                        let hasTrailingNewLine = false;
                        if (nextChar === 47 || nextChar === 42) {
                            let kind = 0;
                            if (nextChar === 47) {
                                kind = KindSingleLineCommentTrivia$constant__from_ast();
                            }
                            else {
                                kind = KindMultiLineCommentTrivia$constant__from_ast();
                            }
                            let startPos = pos;
                            pos += 2;
                            if (nextChar === 47) {
                                for (; pos < text.length;) {
                                    const __gotots_results_46 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
                                    const __gotots_results_47 = [__gotots_results_46[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_46[1]))] satisfies [
                                        int32,
                                        int
                                    ];
                                    let c = __gotots_results_47[0];
                                    let s = __gotots_results_47[1];
                                    if (IsLineBreak__from_stringutil(c)) {
                                        hasTrailingNewLine = true;
                                        break;
                                    }
                                    pos += s;
                                }
                            }
                            else {
                                {
                                    let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, pos), "*/")));
                                    if (i >= 0) {
                                        pos += i + 2;
                                    }
                                    else {
                                        pos = text.length;
                                    }
                                }
                            }
                            if (collecting) {
                                if (hasPendingCommentRange) {
                                    const __gotots_callee_3 = __go_yield;
                                    const __gotots_argument_27 = NodeFactory__from_ast.NewCommentRange(f, pendingKind, pendingPos, pendingEnd, pendingHasTrailingNewLine);
                                    if (!(__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27)) {
                                        return;
                                    }
                                }
                                pendingPos = startPos;
                                pendingEnd = pos;
                                pendingKind = kind;
                                pendingHasTrailingNewLine = hasTrailingNewLine;
                                hasPendingCommentRange = true;
                            }
                            continue;
                        }
                        break scan;
                        break __gotots_control_target_4;
                    }
                    if (__gotots_switch_selection_3 === 4) {
                        if (ch > MaxASCII$int32__from_unicode && IsWhiteSpaceLike__from_stringutil(ch)) {
                            if (hasPendingCommentRange && IsLineBreak__from_stringutil(ch)) {
                                pendingHasTrailingNewLine = true;
                            }
                            pos += size;
                            continue;
                        }
                        break scan;
                        break __gotots_control_target_4;
                    }
                }
            }
        }
        if (hasPendingCommentRange) {
            const __gotots_callee_4 = __go_yield;
            const __gotots_argument_28 = NodeFactory__from_ast.NewCommentRange(f, pendingKind, pendingPos, pendingEnd, pendingHasTrailingNewLine);
            (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
        }
    });
}
