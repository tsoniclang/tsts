import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CaseBlock as CaseBlock__from_ast, ClassLikeBase as ClassLikeBase__from_ast, Kind as Kind__from_ast, NewExpression as NewExpression__from_ast, NodeList$Storage as NodeList__from_ast$Storage, TemplateExpression as TemplateExpression__from_ast, TemplateLiteralLikeNodeBase as TemplateLiteralLikeNodeBase__from_ast, TemplateLiteralTypeNode as TemplateLiteralTypeNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextPos as TextPos__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Source as Source__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_printer$End_void_to_int as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { BinaryExpression as BinaryExpression__from_ast, CallExpression as CallExpression__from_ast, CommentRange as CommentRange__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, InterfaceDeclaration as InterfaceDeclaration__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsCallExpression as IsCallExpression__from_ast, IsClassElement as IsClassElement__from_ast, IsClassLike as IsClassLike__from_ast, IsEnumMember as IsEnumMember__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsInferTypeNode as IsInferTypeNode__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJsxChild as IsJsxChild__from_ast, IsModifier as IsModifier__from_ast, IsStatement as IsStatement__from_ast, IsTypeElement as IsTypeElement__from_ast, IsTypeNode as IsTypeNode__from_ast, IsTypeOrJSTypeAliasDeclaration as IsTypeOrJSTypeAliasDeclaration__from_ast, IsUnterminatedLiteral as IsUnterminatedLiteral__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJsxAttributes$constant as KindJsxAttributes$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTemplateLiteralTypeSpan$constant as KindTemplateLiteralTypeSpan$constant__from_ast, KindTemplateMiddle$constant as KindTemplateMiddle$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTemplateTail$constant as KindTemplateTail$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, LiteralExpressionBase as LiteralExpressionBase__from_ast, LiteralLikeNodeBase as LiteralLikeNodeBase__from_ast, ModifierList as ModifierList__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, NumericLiteral as NumericLiteral__from_ast, PositionIsSynthesized as PositionIsSynthesized__from_ast, SkipPartiallyEmittedExpressions as SkipPartiallyEmittedExpressions__from_ast, SourceFile as SourceFile__from_ast, StringLiteral as StringLiteral__from_ast, TokenFlagsContainsSeparator$constant as TokenFlagsContainsSeparator$constant__from_ast, TokenFlagsIsInvalid$constant as TokenFlagsIsInvalid$constant__from_ast, TokenFlagsSingleQuote$constant as TokenFlagsSingleQuote$constant__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core, UTF16Len as UTF16Len__from_core, UTF16Offset as UTF16Offset__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/state.js";
import { ComputeLineOfPosition as ComputeLineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, GetSourceTextOfNodeFromSourceFile as GetSourceTextOfNodeFromSourceFile__from_scanner, SkipTriviaEx as SkipTriviaEx__from_scanner, SkipTriviaOptions as SkipTriviaOptions__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { DecodeJSStringRune as DecodeJSStringRune__from_stringutil, IsASCIILetter as IsASCIILetter__from_stringutil, IsDigit as IsDigit__from_stringutil, IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { GetBaseFileName as GetBaseFileName__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$Named_core$TextRange, $goInterfaceAdapter$PointerTo_Named_ast$ModifierList, $goInterfaceAdapter$PointerTo_Named_ast$Node, $goInterfaceAdapter$PointerTo_Named_ast$NodeList, $goInterfaceAdapter$PointerTo_Named_core$TextRange, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { EmitContext } from "./emitcontext.js";
import { GetDefaultIndentSize } from "./textwriter.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class getLiteralTextFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function getLiteralTextFlagsNone$constant(): getLiteralTextFlags {
    return new getLiteralTextFlags(0);
}
export function getLiteralTextFlagsNeverAsciiEscape$constant(): getLiteralTextFlags {
    return new getLiteralTextFlags(1);
}
export function getLiteralTextFlagsJsxAttributeEscape$constant(): getLiteralTextFlags {
    return new getLiteralTextFlags(2);
}
export function getLiteralTextFlagsTerminateUnterminatedLiterals$constant(): getLiteralTextFlags {
    return new getLiteralTextFlags(4);
}
export function getLiteralTextFlagsAllowNumericSeparator$constant(): getLiteralTextFlags {
    return new getLiteralTextFlags(8);
}
export type QuoteChar = int32;
export function QuoteCharSingleQuote$constant(): QuoteChar {
    return 39;
}
export function QuoteCharDoubleQuote$constant(): QuoteChar {
    return 34;
}
export function QuoteCharBacktick$constant(): QuoteChar {
    return 96;
}
export function encodeJsxCharacterEntity(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, charCode: int32): void {
    let hexCharCode = strings__from_gostdlib.ToUpper(strconv__from_gostdlib.FormatUint(BigInt.asUintN(64, goNumberToBigInt(charCode)), BigInt.asIntN(64, goNumberToBigInt(16))));
    const __gotots_receiver_10 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_10 === void 0 ? void 0 :
        (__gotots_receiver_10 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "&#x");
    const __gotots_receiver_11 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_11 === void 0 ? void 0 :
        (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, hexCharCode);
    const __gotots_receiver_12 = b;
    strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_12 === void 0 ? void 0 :
        (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 59);
}
export function encodeUtf16EscapeSequence(b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined, charCode: int32): void {
    let hexCharCode = strings__from_gostdlib.ToUpper(strconv__from_gostdlib.FormatUint(BigInt.asUintN(64, goNumberToBigInt(charCode)), BigInt.asIntN(64, goNumberToBigInt(16))));
    const __gotots_receiver_13 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_13 === void 0 ? void 0 :
        (__gotots_receiver_13 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\\u");
    for (let i = hexCharCode.length; i < 4; i++) {
        const __gotots_receiver_14 = b;
        strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_14 === void 0 ? void 0 :
            (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 48);
    }
    const __gotots_receiver_15 = b;
    strings__from_gostdlib.Builder.WriteString(__gotots_receiver_15 === void 0 ? void 0 :
        (__gotots_receiver_15 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, hexCharCode);
}
export function escapeStringWorker(s: gostring, quoteChar: QuoteChar, flags: getLiteralTextFlags, b: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined): void {
    let pos = 0;
    let i = 0;
    for (; i < s.length;) {
        const __gotots_results_4 = DecodeJSStringRune__from_stringutil(goStringSlice(s, i));
        let ch = __gotots_results_4[0];
        let size = __gotots_results_4[1];
        let escape = false;
        if (ch >= 55296 && ch <= 57343) {
            escape = true;
        }
        else if (ch === RuneError$int32__from_utf8 && size === 1) {
            escape = true;
        }
        switch (ch) {
            case 92: {
                if (((void getLiteralTextFlags,
                    flags.$value & getLiteralTextFlagsJsxAttributeEscape$constant().$value) as int)
                    ===
                        ((void getLiteralTextFlags,
                            0) as int)) {
                    escape = true;
                }
                break;
            }
            case 36: {
                if (quoteChar === QuoteCharBacktick$constant() && i + 1 < s.length && goStringIndex(s, i + 1) === 123) {
                    escape = true;
                }
                break;
            }
            case quoteChar:
            case 8232:
            case 8233:
            case 133:
            case 13: {
                escape = true;
                break;
            }
            case 10: {
                if (!(quoteChar === QuoteCharBacktick$constant())) {
                    escape = true;
                }
                break;
            }
            default: {
                if (ch <= 31 || ((void getLiteralTextFlags,
                    flags.$value & getLiteralTextFlagsNeverAsciiEscape$constant().$value) as int)
                    ===
                        ((void getLiteralTextFlags,
                            0) as int) && ch > 127) {
                    escape = true;
                }
                break;
            }
        }
        if (escape) {
            if (pos < i) {
                const __gotots_receiver_2 = b;
                strings__from_gostdlib.Builder.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
                    (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, goStringSlice(s, pos, i));
            }
            __gotots_control_target_1: {
                if (!(((void getLiteralTextFlags,
                    flags.$value & getLiteralTextFlagsJsxAttributeEscape$constant().$value) as int)
                    ===
                        ((void getLiteralTextFlags,
                            0) as int))) {
                    if (ch === 0) {
                        const __gotots_receiver_3 = b;
                        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_3 === void 0 ? void 0 :
                            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "&#0;");
                    }
                    else {
                        const __gotots_results_5 = $state.jsxEscapedCharsMap.lookupOk(ch);
                        let match = __gotots_results_5[0];
                        let ok = __gotots_results_5[1];
                        if (ok) {
                            const __gotots_receiver_4 = b;
                            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
                                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, match);
                        }
                        else {
                            encodeJsxCharacterEntity(b, ch);
                        }
                    }
                }
                else {
                    if (ch === 13 && quoteChar === QuoteCharBacktick$constant() && i + 1 < s.length && goStringIndex(s, i + 1) === 10) {
                        size++;
                        const __gotots_receiver_5 = b;
                        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_5 === void 0 ? void 0 :
                            (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\\r\\n");
                    }
                    else if (ch > 65535) {
                        ch = ch - 65536;
                        encodeUtf16EscapeSequence(b, ((ch & 1047552) >> 10) + 55296);
                        encodeUtf16EscapeSequence(b, (ch & 1023) + 56320);
                    }
                    else if (ch >= 55296 && ch <= 57343) {
                        encodeUtf16EscapeSequence(b, ch);
                    }
                    else if (ch === 0) {
                        if (i + 1 < s.length && IsDigit__from_stringutil(goStringIndex(s, i + 1))) {
                            const __gotots_receiver_6 = b;
                            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_6 === void 0 ? void 0 :
                                (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\\x00");
                        }
                        else {
                            const __gotots_receiver_7 = b;
                            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_7 === void 0 ? void 0 :
                                (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "\\0");
                        }
                    }
                    else {
                        {
                            const __gotots_results_6 = $state.escapedCharsMap.lookupOk(ch);
                            let match = __gotots_results_6[0];
                            let ok = __gotots_results_6[1];
                            if (ok) {
                                const __gotots_receiver_8 = b;
                                strings__from_gostdlib.Builder.WriteString(__gotots_receiver_8 === void 0 ? void 0 :
                                    (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, match);
                            }
                            else {
                                encodeUtf16EscapeSequence(b, ch);
                            }
                        }
                    }
                }
            }
            pos = i + size;
        }
        i += size;
    }
    if (pos < i) {
        const __gotots_receiver_9 = b;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_9 === void 0 ? void 0 :
            (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, goStringSlice(s, pos));
    }
}
export function EscapeString(s: gostring, quoteChar: QuoteChar): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next => b = b$next);
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(s.length + 2)));
    escapeStringWorker(s, quoteChar, getLiteralTextFlagsNeverAsciiEscape$constant(), b$location);
    return strings__from_gostdlib.Builder.String(b);
}
export function escapeNonAsciiString(s: gostring, quoteChar: QuoteChar): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next2 => b = b$next2);
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(s.length + 2)));
    escapeStringWorker(s, quoteChar, getLiteralTextFlagsNone$constant(), b$location2);
    return strings__from_gostdlib.Builder.String(b);
}
export function escapeJsxAttributeString(s: gostring, quoteChar: QuoteChar): gostring {
    let b = named_strings.StringsBuilderOperations.$zero();
    const b$location3 = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next3 => b = b$next3);
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(s.length + 2)));
    escapeStringWorker(s, quoteChar, new getLiteralTextFlags(3), b$location3);
    return strings__from_gostdlib.Builder.String(b);
}
export function canUseOriginalText(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, flags: getLiteralTextFlags): bool {
    if (NodeIsSynthesized__from_ast(node) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !(((void getLiteralTextFlags,
        flags.$value & getLiteralTextFlagsTerminateUnterminatedLiterals$constant().$value) as int)
        ===
            ((void getLiteralTextFlags,
                0) as int)) && IsUnterminatedLiteral__from_ast(node)) {
        return false;
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNumericLiteral$constant__from_ast()) {
        let tokenFlags = (void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
            (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                NumericLiteral__from_ast.$storageOf(((Node__from_ast.AsNumericLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NumericLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags;
        if (!((tokenFlags & TokenFlagsIsInvalid$constant__from_ast()) === 0)) {
            return false;
        }
        if (!((tokenFlags & TokenFlagsContainsSeparator$constant__from_ast()) === 0)) {
            return !(((void getLiteralTextFlags,
                flags.$value & getLiteralTextFlagsAllowNumericSeparator$constant().$value) as int)
                ===
                    ((void getLiteralTextFlags,
                        0) as int));
        }
    }
    return !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBigIntLiteral$constant__from_ast());
}
export function getLiteralText(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, flags: getLiteralTextFlags): gostring {
    if (!(sourceFile === undefined) && canUseOriginalText(node, flags)) {
        return GetSourceTextOfNodeFromSourceFile__from_scanner(sourceFile, node, false);
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindStringLiteral$constant__from_ast(): {
            let b = named_strings.StringsBuilderOperations.$zero();
            const b$location4 = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next4 => b = b$next4);
            let quoteChar = 0;
            if (!(((void LiteralLikeNodeBase__from_ast.$storageOf, (void LiteralLikeNodeBase__from_ast.$fromStorage,
                (void LiteralExpressionBase__from_ast.$storageOf, (void LiteralExpressionBase__from_ast.$fromStorage,
                    StringLiteral__from_ast.$storageOf(((Node__from_ast.AsStringLiteral(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<StringLiteral__from_ast>).value).LiteralExpressionBase)).LiteralLikeNodeBase)).TokenFlags & TokenFlagsSingleQuote$constant__from_ast()) === 0)) {
                quoteChar = QuoteCharSingleQuote$constant();
            }
            else {
                quoteChar = QuoteCharDoubleQuote$constant();
            }
            let text = Node__from_ast.Text(node);
            strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(text.length + 2)));
            strings__from_gostdlib.Builder.WriteRune(b, quoteChar);
            escapeStringWorker(text, quoteChar, flags, b$location4);
            strings__from_gostdlib.Builder.WriteRune(b, quoteChar);
            return strings__from_gostdlib.Builder.String(b);
            break;
        }
        case KindNoSubstitutionTemplateLiteral$constant__from_ast():
        case KindTemplateHead$constant__from_ast():
        case KindTemplateMiddle$constant__from_ast():
        case KindTemplateTail$constant__from_ast(): {
            let b = named_strings.StringsBuilderOperations.$zero();
            const b$location5 = tsonicTypeScriptRuntime.boundLocation({}, () => b, b$next5 => b = b$next5);
            let text = Node__from_ast.Text(node);
            let rawText = ((Node__from_ast.TemplateLiteralLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TemplateLiteralLikeNodeBase__from_ast>).value.RawText;
            let raw = rawText.length > 0 || text.length === 0;
            let textLen = 0;
            if (raw) {
                textLen = rawText.length;
            }
            else {
                textLen = text.length;
            }
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(2 + textLen)));
                    strings__from_gostdlib.Builder.WriteRune(b, 96);
                    break;
                }
                case KindTemplateHead$constant__from_ast(): {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(3 + textLen)));
                    strings__from_gostdlib.Builder.WriteRune(b, 96);
                    break;
                }
                case KindTemplateMiddle$constant__from_ast(): {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(3 + textLen)));
                    strings__from_gostdlib.Builder.WriteRune(b, 125);
                    break;
                }
                case KindTemplateTail$constant__from_ast(): {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(2 + textLen)));
                    strings__from_gostdlib.Builder.WriteRune(b, 125);
                    break;
                }
            }
            __gotots_control_target_0: {
                if (rawText.length > 0 || text.length === 0) {
                    strings__from_gostdlib.Builder.WriteString(b, rawText);
                }
                else {
                    escapeStringWorker(text, QuoteCharBacktick$constant(), flags, b$location5);
                }
            }
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                    strings__from_gostdlib.Builder.WriteRune(b, 96);
                    break;
                }
                case KindTemplateHead$constant__from_ast(): {
                    strings__from_gostdlib.Builder.WriteString(b, "${");
                    break;
                }
                case KindTemplateMiddle$constant__from_ast(): {
                    strings__from_gostdlib.Builder.WriteString(b, "${");
                    break;
                }
                case KindTemplateTail$constant__from_ast(): {
                    strings__from_gostdlib.Builder.WriteRune(b, 96);
                    break;
                }
            }
            return strings__from_gostdlib.Builder.String(b);
            break;
        }
        case KindNumericLiteral$constant__from_ast():
        case KindBigIntLiteral$constant__from_ast(): {
            return Node__from_ast.Text(node);
            break;
        }
        case KindRegularExpressionLiteral$constant__from_ast(): {
            if (!(((void getLiteralTextFlags,
                flags.$value & getLiteralTextFlagsTerminateUnterminatedLiterals$constant().$value) as int)
                ===
                    ((void getLiteralTextFlags,
                        0) as int)) && IsUnterminatedLiteral__from_ast(node)) {
                let b = named_strings.StringsBuilderOperations.$zero();
                let text = Node__from_ast.Text(node);
                if (text.length > 0 && goStringIndex(text, text.length - 1) === 92) {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(2 + text.length)));
                    strings__from_gostdlib.Builder.WriteString(b, text);
                    strings__from_gostdlib.Builder.WriteString(b, " /");
                }
                else {
                    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(1 + text.length)));
                    strings__from_gostdlib.Builder.WriteString(b, text);
                    strings__from_gostdlib.Builder.WriteString(b, "/");
                }
                return strings__from_gostdlib.Builder.String(b);
            }
            return Node__from_ast.Text(node);
            break;
        }
        default: {
            const __gotots_argument_2 = new $goInterfaceAdapter$string("Unsupported LiteralLikeNode");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
            break;
        }
    }
}
export function RangeIsOnSingleLine(r: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return rangeStartIsOnSameLineAsRangeEnd(TextRange__from_core.$copy(r), TextRange__from_core.$copy(r), sourceFile);
}
export function RangeStartPositionsAreOnSameLine(range1: TextRange__from_core, range2: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return PositionsAreOnSameLine(getStartPositionOfRange(TextRange__from_core.$copy(range1), sourceFile, false), getStartPositionOfRange(TextRange__from_core.$copy(range2), sourceFile, false), sourceFile);
}
export function rangeEndPositionsAreOnSameLine(range1: TextRange__from_core, range2: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return PositionsAreOnSameLine(range1.End(), range2.End(), sourceFile);
}
export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange__from_core, range2: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return PositionsAreOnSameLine(getStartPositionOfRange(TextRange__from_core.$copy(range1), sourceFile, false), range2.End(), sourceFile);
}
export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange__from_core, range2: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return PositionsAreOnSameLine(range1.End(), getStartPositionOfRange(TextRange__from_core.$copy(range2), sourceFile, false), sourceFile);
}
export function getStartPositionOfRange(r: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeComments: bool): int {
    if (PositionIsSynthesized__from_ast(r.Pos())) {
        return -1;
    }
    return SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), r.Pos(), new SkipTriviaOptions__from_scanner(false, includeComments, false));
}
export function PositionsAreOnSameLine(pos1: int, pos2: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return GetLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
}
export function GetLinesBetweenPositions(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos1: int, pos2: int): int {
    if (pos1 === pos2) {
        return 0;
    }
    let lineStarts = GetECMALineStarts__from_scanner(new GoInterfaceAdapter(sourceFile));
    let lower = IfElse$int(pos1 < pos2, pos1, pos2);
    let isNegative = lower === pos2;
    let upper = IfElse$int(isNegative, pos1, pos2);
    let lowerLine = ComputeLineOfPosition__from_scanner(lineStarts, lower);
    let upperLine = lowerLine + ComputeLineOfPosition__from_scanner(lineStarts.slice(lowerLine, null, null), upper);
    if (isNegative) {
        return lowerLine - upperLine;
    }
    else {
        return upperLine - lowerLine;
    }
}
export function getLinesBetweenRangeEndAndRangeStart(range1: TextRange__from_core, range2: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeSecondRangeComments: bool): int {
    let range2Start = getStartPositionOfRange(TextRange__from_core.$copy(range2), sourceFile, includeSecondRangeComments);
    return GetLinesBetweenPositions(sourceFile, range1.End(), range2Start);
}
export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos: int, stopPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeComments: bool): int {
    let startPos = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), pos, new SkipTriviaOptions__from_scanner(false, includeComments, false));
    let prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
    return GetLinesBetweenPositions(sourceFile, IfElse$int(prevPos >= 0, prevPos, stopPos), startPos);
}
export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos: int, stopPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeComments: bool): int {
    let nextPos = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), pos, new SkipTriviaOptions__from_scanner(false, includeComments, false));
    return GetLinesBetweenPositions(sourceFile, pos, IfElse$int(stopPos < nextPos, stopPos, nextPos));
}
export function getPreviousNonWhitespacePosition(pos: int, stopPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    for (; pos >= stopPos; pos--) {
        if (!IsWhiteSpaceLike__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), pos))) {
            return pos;
        }
    }
    return -1;
}
export function siblingNodePositionsAreComparable(emitContext: {
    value: EmitContext;
} | undefined, previousNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.Pos(nextNode) < Node__from_ast.End(previousNode)) {
        return false;
    }
    previousNode = EmitContext.MostOriginal(emitContext, previousNode);
    nextNode = EmitContext.MostOriginal(emitContext, nextNode);
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((previousNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (parent === undefined || !tsonicTypeScriptRuntime.sameLocation(parent, Node__from_ast.$storageOf(((nextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return false;
    }
    let parentNodeArray: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getContainingNodeArray(previousNode);
    if (!(parentNodeArray === undefined)) {
        let prevNodeIndex = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((parentNodeArray ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, previousNode);
        return prevNodeIndex >= 0 && Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((parentNodeArray ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, nextNode) === prevNodeIndex + 1;
    }
    return false;
}
export function getContainingNodeArray(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (parent === undefined) {
        return void 0;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeParameter$constant__from_ast(): {
            __gotots_control_target_2: {
                if (IsFunctionLike__from_ast(parent) || IsClassLike__from_ast(parent) || IsInterfaceDeclaration__from_ast(parent) || IsTypeOrJSTypeAliasDeclaration__from_ast(parent)) {
                    return Node__from_ast.TypeParameterList(parent);
                }
                else if (IsInferTypeNode__from_ast(parent)) {
                    break;
                }
                else {
                    const __gotots_argument_3 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("Unexpected TypeParameter parent: %#v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_ast$Kind(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)])));
                    GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                }
            }
            break;
        }
        case KindParameter$constant__from_ast(): {
            return FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).Parameters;
            break;
        }
        case KindTemplateLiteralTypeSpan$constant__from_ast(): {
            return (Node__from_ast.AsTemplateLiteralTypeNode(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans;
            break;
        }
        case KindTemplateSpan$constant__from_ast(): {
            return (Node__from_ast.AsTemplateExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans;
            break;
        }
        case KindDecorator$constant__from_ast(): {
            if (canHaveDecorators(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                {
                    let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                    if (!(modifiers === undefined)) {
                        const __gotots_store_1 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                        return tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeList"), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
                    }
                }
            }
            return void 0;
            break;
        }
        case KindHeritageClause$constant__from_ast(): {
            if (IsClassLike__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return ((Node__from_ast.ClassLikeData(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ClassLikeBase__from_ast>).value.HeritageClauses;
            }
            else {
                return InterfaceDeclaration__from_ast.$storageOf(((Node__from_ast.AsInterfaceDeclaration(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).HeritageClauses;
            }
            break;
        }
    }
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeLiteral$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast(): {
            if (IsTypeElement__from_ast(node)) {
                return Node__from_ast.MemberList(parent);
            }
            break;
        }
        case KindUnionType$constant__from_ast(): {
            return (void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types;
            break;
        }
        case KindIntersectionType$constant__from_ast(): {
            return (void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                IntersectionTypeNode__from_ast.$storageOf(((Node__from_ast.AsIntersectionTypeNode(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types;
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast():
        case KindTupleType$constant__from_ast():
        case KindNamedImports$constant__from_ast():
        case KindNamedExports$constant__from_ast(): {
            return Node__from_ast.ElementList(parent);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast():
        case KindJsxAttributes$constant__from_ast(): {
            return Node__from_ast.PropertyList(parent);
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            let p: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(parent);
            __gotots_control_target_3: {
                if (IsTypeNode__from_ast(node)) {
                    return CallExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).TypeArguments;
                }
                else if (!tsonicTypeScriptRuntime.sameLocation(node, CallExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
                    return CallExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments;
                }
            }
            break;
        }
        case KindNewExpression$constant__from_ast(): {
            let p: {
                value: NewExpression__from_ast;
            } | undefined = Node__from_ast.AsNewExpression(parent);
            __gotots_control_target_4: {
                if (IsTypeNode__from_ast(node)) {
                    return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeArguments;
                }
                else if (!tsonicTypeScriptRuntime.sameLocation(node, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression)) {
                    return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Arguments;
                }
            }
            break;
        }
        case KindJsxElement$constant__from_ast():
        case KindJsxFragment$constant__from_ast(): {
            if (IsJsxChild__from_ast(node)) {
                return Node__from_ast.Children(parent);
            }
            break;
        }
        case KindJsxOpeningElement$constant__from_ast():
        case KindJsxSelfClosingElement$constant__from_ast(): {
            if (IsTypeNode__from_ast(node)) {
                return Node__from_ast.TypeArgumentList(parent);
            }
            break;
        }
        case KindBlock$constant__from_ast():
        case KindModuleBlock$constant__from_ast():
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast(): {
            return Node__from_ast.StatementList(parent);
            break;
        }
        case KindCaseBlock$constant__from_ast(): {
            return (Node__from_ast.AsCaseBlock(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clauses;
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast(): {
            if (IsClassElement__from_ast(node)) {
                return Node__from_ast.MemberList(parent);
            }
            break;
        }
        case KindEnumDeclaration$constant__from_ast(): {
            if (IsEnumMember__from_ast(node)) {
                return Node__from_ast.MemberList(parent);
            }
            break;
        }
        case KindSourceFile$constant__from_ast(): {
            if (IsStatement__from_ast(node)) {
                return Node__from_ast.StatementList(parent);
            }
            break;
        }
    }
    if (IsModifier__from_ast(node)) {
        {
            let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = Node__from_ast.Modifiers(parent);
            if (!(modifiers === undefined)) {
                const __gotots_store_2 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                return tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeList"), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
            }
        }
    }
    return void 0;
}
export function canHaveDecorators(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindClassDeclaration$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function originalNodesHaveSameParent(emitContext: {
    value: EmitContext;
} | undefined, nodeA: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nodeB: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    nodeA = EmitContext.MostOriginal(emitContext, nodeA);
    if (!(Node__from_ast.$storageOf(((nodeA ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined)) {
        nodeB = EmitContext.MostOriginal(emitContext, nodeB);
        return tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((nodeA ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, Node__from_ast.$storageOf(((nodeB ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    }
    return false;
}
export function tryGetEnd(node: GoInterface | undefined): [
    int,
    bool
] {
    const __gotots_type_switch_0: GoInterface | undefined = node;
    switch (true) {
        case $goInterfaceAdapter$PointerTo_Named_ast$Node.$is(__gotots_type_switch_0): {
            let v: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_type_switch_0.$go$value;
            if (!(v === undefined)) {
                return [Node__from_ast.End(v), true];
            }
            break;
        }
        case $goInterfaceAdapter$PointerTo_Named_ast$NodeList.$is(__gotots_type_switch_0): {
            let v: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = __gotots_type_switch_0.$go$value;
            if (!(v === undefined)) {
                return [NodeList__from_ast.End(v), true];
            }
            break;
        }
        case $goInterfaceAdapter$PointerTo_Named_ast$ModifierList.$is(__gotots_type_switch_0): {
            let v: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = __gotots_type_switch_0.$go$value;
            if (!(v === undefined)) {
                const __gotots_store_0 = ModifierList__from_ast.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_results_2 = NodeList__from_ast.End(tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeList"), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf));
                const __gotots_results_3 = true;
                return [__gotots_results_2, __gotots_results_3];
            }
            break;
        }
        case $goInterfaceAdapter$PointerTo_Named_core$TextRange.$is(__gotots_type_switch_0): {
            let v: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined = __gotots_type_switch_0.$go$value;
            if (!(v === undefined)) {
                return [((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.End(), true];
            }
            break;
        }
        case $goInterfaceAdapter$Named_core$TextRange.$is(__gotots_type_switch_0): {
            let v: TextRange__from_core = TextRange__from_core.$copy(__gotots_type_switch_0.$go$value);
            return [v.End(), true];
            break;
        }
        default: {
            let v: GoInterface | undefined = __gotots_type_switch_0;
            const __gotots_argument_1 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("unhandled type: %T", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([node])));
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
            break;
        }
    }
    return [0, false];
}
export function greatestEnd(end: int, nodes: RuntimeSlice<GoInterface | undefined>): int {
    for (let i = nodes.length - 1; i >= 0; i--) {
        let node: GoInterface | undefined = nodes.get(i);
        {
            const __gotots_results_0 = tryGetEnd(node);
            let nodeEnd = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok && end < nodeEnd) {
                end = nodeEnd;
            }
        }
    }
    return end;
}
export function skipSynthesizedParentheses(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParenthesizedExpression$constant__from_ast() && NodeIsSynthesized__from_ast(node);) {
        node = Node__from_ast.Expression(node);
    }
    return node;
}
export function isNewExpressionWithoutArguments(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNewExpression$constant__from_ast() && Node__from_ast.ArgumentList(node) === undefined;
}
export function isBinaryOperation(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, token: Kind__from_ast): bool {
    node = SkipPartiallyEmittedExpressions__from_ast(node);
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() && Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === token;
}
export function mixingBinaryOperatorsRequiresParentheses(a: Kind__from_ast, b: Kind__from_ast): bool {
    if (a === KindQuestionQuestionToken$constant__from_ast()) {
        return b === KindAmpersandAmpersandToken$constant__from_ast() || b === KindBarBarToken$constant__from_ast();
    }
    if (b === KindQuestionQuestionToken$constant__from_ast()) {
        return a === KindAmpersandAmpersandToken$constant__from_ast() || a === KindBarBarToken$constant__from_ast();
    }
    return false;
}
export function isImmediatelyInvokedFunctionExpressionOrArrowFunction(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    node = SkipPartiallyEmittedExpressions__from_ast(node);
    if (!IsCallExpression__from_ast(node)) {
        return false;
    }
    node = SkipPartiallyEmittedExpressions__from_ast(Node__from_ast.Expression(node));
    return IsFunctionExpression__from_ast(node) || IsArrowFunction__from_ast(node);
}
export function IsFileLevelUniqueName(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, name: gostring, hasGlobalName: (($0: gostring) => bool) | undefined): bool {
    let __gotots_logical_result_0 = !(hasGlobalName === undefined);
    if (__gotots_logical_result_0) {
        const __gotots_callee_0 = hasGlobalName;
        const __gotots_argument_0 = name;
        __gotots_logical_result_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
    }
    if (__gotots_logical_result_0) {
        return false;
    }
    const __gotots_results_1 = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Identifiers.lookupOk(name);
    let ok = __gotots_results_1[1];
    return !ok;
}
export function hasLeadingHash(text: gostring): bool {
    return text.length > 0 && goStringIndex(text, 0) === 35;
}
export function removeLeadingHash(text: gostring): gostring {
    if (hasLeadingHash(text)) {
        return goStringSlice(text, 1);
    }
    else {
        return text;
    }
}
export function ensureLeadingHash(text: gostring): gostring {
    if (hasLeadingHash(text)) {
        return text;
    }
    else {
        return "#" + text;
    }
}
export function FormatGeneratedName(privateName: bool, prefix: gostring, base: gostring, suffix: gostring): gostring {
    let name = removeLeadingHash(prefix) + removeLeadingHash(base) + removeLeadingHash(suffix);
    if (privateName) {
        return ensureLeadingHash(name);
    }
    return name;
}
export function isASCIIWordCharacter(ch: int32): bool {
    return IsASCIILetter__from_stringutil(ch) || IsDigit__from_stringutil(ch) || ch === 95;
}
export function makeIdentifierFromModuleName(moduleName: gostring): gostring {
    moduleName = GetBaseFileName__from_tspath(moduleName);
    let builder = named_strings.StringsBuilderOperations.$zero();
    let start = 0;
    let pos = 0;
    for (; pos < moduleName.length;) {
        let ch = goStringIndex(moduleName, pos);
        if (pos === 0 && IsDigit__from_stringutil(ch)) {
            strings__from_gostdlib.Builder.WriteByte(builder, 95);
        }
        else if (!isASCIIWordCharacter(ch)) {
            if (start < pos) {
                strings__from_gostdlib.Builder.WriteString(builder, goStringSlice(moduleName, start, pos));
            }
            strings__from_gostdlib.Builder.WriteByte(builder, 95);
            start = pos + 1;
        }
        pos++;
    }
    if (start < pos) {
        strings__from_gostdlib.Builder.WriteString(builder, goStringSlice(moduleName, start, pos));
    }
    return strings__from_gostdlib.Builder.String(builder);
}
export function findSpanEndWithEmitContext$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, c: {
    value: EmitContext;
} | undefined, array: RuntimeSlice<GoContainerStorage<T>>, test: (($0: {
    value: EmitContext;
} | undefined, $1: T) => bool) | undefined, start: int): int {
    let i = start;
    {
        for (;;) {
            let __gotots_logical_result_2 = i < $go$length$SliceOf_T0_to_int(array);
            if (__gotots_logical_result_2) {
                const __gotots_callee_2 = test;
                const __gotots_argument_5 = c;
                const __gotots_argument_6 = $go$index$SliceOf_T0_int_to_T0(array, i);
                __gotots_logical_result_2 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
            }
            if (!__gotots_logical_result_2) {
                break;
            }
            {
                i++;
            }
        }
    }
    return i;
}
export function findSpanEnd$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, array: RuntimeSlice<GoContainerStorage<T>>, test: (($0: T) => bool) | undefined, start: int): int {
    let i = start;
    {
        for (;;) {
            let __gotots_logical_result_1 = i < $go$length$SliceOf_T0_to_int(array);
            if (__gotots_logical_result_1) {
                const __gotots_callee_1 = test;
                const __gotots_argument_4 = $go$index$SliceOf_T0_int_to_T0(array, i);
                __gotots_logical_result_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
            }
            if (!__gotots_logical_result_1) {
                break;
            }
            {
                i++;
            }
        }
    }
    return i;
}
export function skipWhiteSpaceSingleLine(text: gostring, pos: tsonicTypeScriptRuntime.Location<int> | undefined): void {
    for (; ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value
        < text.length;) {
        const __gotots_results_9 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value));
        const __gotots_results_10 = [__gotots_results_9[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_9[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_10[0];
        let size = __gotots_results_10[1];
        if (!IsWhiteSpaceSingleLine__from_stringutil(ch)) {
            break;
        }
        const __gotots_store_3 = (pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_3.value =
            __gotots_store_3.value
                + size);
    }
}
export function matchWhiteSpaceSingleLine(text: gostring, pos: tsonicTypeScriptRuntime.Location<int> | undefined): bool {
    let startPos = ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
    skipWhiteSpaceSingleLine(text, pos);
    return ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value
        !== startPos;
}
export function matchRune(text: gostring, pos: tsonicTypeScriptRuntime.Location<int> | undefined, expected: int32): bool {
    const __gotots_results_11 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value));
    const __gotots_results_12 = [__gotots_results_11[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_11[1]))] satisfies [
        int32,
        int
    ];
    let ch = __gotots_results_12[0];
    let size = __gotots_results_12[1];
    if (ch === expected) {
        const __gotots_store_4 = (pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_4.value =
            __gotots_store_4.value
                + size);
        return true;
    }
    return false;
}
export function matchString(text: gostring, pos: tsonicTypeScriptRuntime.Location<int> | undefined, expected: gostring): bool {
    let textPos = ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
    const textPos$location = tsonicTypeScriptRuntime.boundLocation({}, () => textPos, textPos$next => textPos = textPos$next);
    let expectedPos = 0;
    for (; expectedPos < expected.length;) {
        if (textPos >= text.length) {
            return false;
        }
        const __gotots_results_13 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(expected, expectedPos));
        const __gotots_results_14 = [__gotots_results_13[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_13[1]))] satisfies [
            int32,
            int
        ];
        let expectedRune = __gotots_results_14[0];
        let expectedSize = __gotots_results_14[1];
        if (!matchRune(text, textPos$location, expectedRune)) {
            return false;
        }
        expectedPos += expectedSize;
    }
    void ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
        textPos);
    return true;
}
export function matchQuotedString(text: gostring, pos: tsonicTypeScriptRuntime.Location<int> | undefined): bool {
    let textPos = ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
    const textPos$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => textPos, textPos$next2 => textPos = textPos$next2);
    let quoteChar = 0;
    __gotots_control_target_6: {
        if (matchRune(text, textPos$location2, 39)) {
            quoteChar = 39;
        }
        else if (matchRune(text, textPos$location2, 34)) {
            quoteChar = 34;
        }
        else {
            return false;
        }
    }
    for (; textPos < text.length;) {
        const __gotots_results_15 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, textPos));
        const __gotots_results_16 = [__gotots_results_15[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_15[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_16[0];
        let size = __gotots_results_16[1];
        textPos += size;
        if (ch === quoteChar) {
            void ((pos ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                textPos);
            return true;
        }
    }
    return false;
}
export function IsRecognizedTripleSlashComment(text: gostring, commentRange: CommentRange__from_ast): bool {
    if (CommentRange__from_ast.$storageOf(commentRange).Kind === KindSingleLineCommentTrivia$constant__from_ast() && TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).Len() > 2 && goStringIndex(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).Pos() + 1) === 47 && goStringIndex(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).Pos() + 2) === 47) {
        text = goStringSlice(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).Pos() + 3, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).End());
        let pos = 0;
        const pos$location = tsonicTypeScriptRuntime.boundLocation({}, () => pos, pos$next => pos = pos$next);
        skipWhiteSpaceSingleLine(text, pos$location);
        if (!matchRune(text, pos$location, 60)) {
            return false;
        }
        __gotots_control_target_5: {
            if (matchString(text, pos$location, "reference")) {
                if (!matchWhiteSpaceSingleLine(text, pos$location)) {
                    return false;
                }
                if (!matchString(text, pos$location, "path") && !matchString(text, pos$location, "types") && !matchString(text, pos$location, "lib") && !matchString(text, pos$location, "no-default-lib")) {
                    return false;
                }
                skipWhiteSpaceSingleLine(text, pos$location);
                if (!matchRune(text, pos$location, 61)) {
                    return false;
                }
                skipWhiteSpaceSingleLine(text, pos$location);
                if (!matchQuotedString(text, pos$location)) {
                    return false;
                }
            }
            else if (matchString(text, pos$location, "amd-dependency")) {
                if (!matchWhiteSpaceSingleLine(text, pos$location)) {
                    return false;
                }
                if (!matchString(text, pos$location, "path")) {
                    return false;
                }
                skipWhiteSpaceSingleLine(text, pos$location);
                if (!matchRune(text, pos$location, 61)) {
                    return false;
                }
                skipWhiteSpaceSingleLine(text, pos$location);
                if (!matchQuotedString(text, pos$location)) {
                    return false;
                }
            }
            else if (matchString(text, pos$location, "amd-module")) {
                skipWhiteSpaceSingleLine(text, pos$location);
            }
            else {
                return false;
            }
        }
        let index = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(text, pos), "/>")));
        return index !== -1;
    }
    return false;
}
export function isJSDocLikeText(text: gostring, comment: CommentRange__from_ast): bool {
    return CommentRange__from_ast.$storageOf(comment).Kind === KindMultiLineCommentTrivia$constant__from_ast() && TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Len() >= 5 && goStringIndex(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos() + 2) === 42 && goStringIndex(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos() + 3) !== 47;
}
export function IsPinnedComment(text: gostring, comment: CommentRange__from_ast): bool {
    return CommentRange__from_ast.$storageOf(comment).Kind === KindMultiLineCommentTrivia$constant__from_ast() && TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Len() > 5 && goStringIndex(text, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos() + 2) === 33;
}
export function calculateIndent(text: gostring, pos: int, end: int): int {
    let currentLineIndent = 0;
    let indentSize = GetDefaultIndentSize();
    for (; pos < end;) {
        const __gotots_results_7 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
        const __gotots_results_8 = [__gotots_results_7[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_7[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_8[0];
        let size = __gotots_results_8[1];
        if (!IsWhiteSpaceSingleLine__from_stringutil(ch)) {
            break;
        }
        if (ch === 9) {
            currentLineIndent += indentSize - (goNumberIntegerRemainder(currentLineIndent, indentSize));
        }
        else {
            currentLineIndent++;
        }
        pos += size;
    }
    return currentLineIndent;
}
export class lineCharacterCache {
    declare private readonly $goType: void;
    public constructor(public lineMap: RuntimeSlice<TextPos__from_core>, public text: gostring, public cachedLine: int, public cachedPos: int, public cachedChar: UTF16Offset__from_core, public hasCached: bool) {
    }
    declare private readonly then?: never;
    static $go$private$printer$getLineAndCharacter(c: lineCharacterCache | undefined, pos: int): [
        int,
        UTF16Offset__from_core
    ] {
        let line: int = 0;
        let character: UTF16Offset__from_core = new UTF16Offset__from_core(0);
        line = ComputeLineOfPosition__from_scanner((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lineMap, pos);
        let lineStart = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lineMap.get(line);
        let endPos = globalThis.Math.min(pos, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text.length);
        if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasCached && line === (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedLine && endPos >= (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedPos) {
            character = new UTF16Offset__from_core((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedChar.$value + UTF16Len__from_core(goStringSlice((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedPos, endPos)).$value);
        }
        else {
            character = UTF16Len__from_core(goStringSlice((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).text, lineStart, endPos));
        }
        let cachedChar = character;
        character = new UTF16Offset__from_core(character.$value +
            ((void UTF16Offset__from_core,
                pos - endPos) as number));
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedLine = line;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedPos = endPos;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cachedChar = cachedChar;
        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasCached = true;
        return [line, character];
    }
}
export function newLineCharacterCache(source: Source__from_sourcemap | undefined): lineCharacterCache | undefined {
    const __gotots_receiver_0 = source;
    const __gotots_field_0 = goInterfaceNonNil<Source__from_sourcemap>(__gotots_receiver_0).ECMALineMap();
    const __gotots_receiver_1 = source;
    const __gotots_field_1 = goInterfaceNonNil<Source__from_sourcemap>(__gotots_receiver_1).Text();
    return new lineCharacterCache(__gotots_field_0, __gotots_field_1, 0, 0, new UTF16Offset__from_core(0), false);
}
