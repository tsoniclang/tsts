import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { SemicolonPreference as SemicolonPreference__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, HasDecorators as HasDecorators__from_ast, HasQuestionToken as HasQuestionToken__from_ast, IsExpression as IsExpression__from_ast, IsFunctionLikeKind as IsFunctionLikeKind__from_ast, IsNumericLiteral as IsNumericLiteral__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsTrivia as IsTrivia__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindDotToken$constant as KindDotToken$constant__from_ast, KindEmptyStatement$constant as KindEmptyStatement$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindEnumMember$constant as KindEnumMember$constant__from_ast, KindEqualsToken$constant as KindEqualsToken$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJsxAttribute$constant as KindJsxAttribute$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxNamespacedName$constant as KindJsxNamespacedName$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxSpreadAttribute$constant as KindJsxSpreadAttribute$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindMinusToken$constant as KindMinusToken$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOfKeyword$constant as KindOfKeyword$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSemicolonClassElement$constant as KindSemicolonClassElement$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindSwitchStatement$constant as KindSwitchStatement$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateHead$constant as KindTemplateHead$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindNextToken as FindNextToken__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { TextRange as TextRange__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrueOrUnknown as Tristate_IsTrueOrUnknown__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil, GetFirstToken as GetFirstToken__from_lsutil, PositionIsASICandidate as PositionIsASICandidate__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { FormatRequestKindFormatOnEnter$constant } from "./api.js";
import { FormattingContext } from "./context.js";
import { TextRangeWithKind } from "./scanner.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export type anyOptionSelector<T> = (($0: FormatCodeSettings__from_lsutil) => T) | undefined;
export function semicolonOption(options: FormatCodeSettings__from_lsutil): SemicolonPreference__from_lsutil {
    return options.Semicolons;
}
export function insertSpaceAfterCommaDelimiterOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterCommaDelimiter;
}
export function insertSpaceAfterSemicolonInForStatementsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterSemicolonInForStatements;
}
export function insertSpaceBeforeAndAfterBinaryOperatorsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceBeforeAndAfterBinaryOperators;
}
export function insertSpaceAfterConstructorOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterConstructor;
}
export function insertSpaceAfterKeywordsInControlFlowStatementsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterKeywordsInControlFlowStatements;
}
export function insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterFunctionKeywordForAnonymousFunctions;
}
export function insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis;
}
export function insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets;
}
export function insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces;
}
export function insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces;
}
export function insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces;
}
export function insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces;
}
export function insertSpaceAfterTypeAssertionOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceAfterTypeAssertion;
}
export function insertSpaceBeforeFunctionParenthesisOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceBeforeFunctionParenthesis;
}
export function placeOpenBraceOnNewLineForFunctionsOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.PlaceOpenBraceOnNewLineForFunctions;
}
export function placeOpenBraceOnNewLineForControlBlocksOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.PlaceOpenBraceOnNewLineForControlBlocks;
}
export function insertSpaceBeforeTypeAnnotationOption(options: FormatCodeSettings__from_lsutil): Tristate__from_core {
    return options.InsertSpaceBeforeTypeAnnotation;
}
export function optionEquals$kernel<T>($go$binary_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, optionName: anyOptionSelector<T>, optionValue: T): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_4 = optionName;
        const __gotots_argument_4 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        const __gotots_binary_operand_0 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
        const __gotots_binary_operand_1 = optionValue;
        return $go$binary_equal$T0_T0_to_bool(__gotots_binary_operand_0, __gotots_binary_operand_1);
    };
}
export function isOptionEnabled(optionName: (($0: FormatCodeSettings__from_lsutil) => Tristate__from_core) | undefined): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_0 = optionName;
        const __gotots_argument_0 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        return Tristate_IsTrue__from_core((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0));
    };
}
export function isOptionDisabled(optionName: (($0: FormatCodeSettings__from_lsutil) => Tristate__from_core) | undefined): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_3 = optionName;
        const __gotots_argument_3 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        return Tristate_IsFalse__from_core((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3));
    };
}
export function isOptionDisabledOrUndefined(optionName: (($0: FormatCodeSettings__from_lsutil) => Tristate__from_core) | undefined): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_1 = optionName;
        const __gotots_argument_1 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        return Tristate_IsFalseOrUnknown__from_core((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1));
    };
}
export function isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName: (($0: FormatCodeSettings__from_lsutil) => Tristate__from_core) | undefined): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_5 = optionName;
        const __gotots_argument_8 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        return Tristate_IsFalseOrUnknown__from_core((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8)) || FormattingContext.TokensAreOnSameLine(context);
    };
}
export function isOptionEnabledOrUndefined(optionName: (($0: FormatCodeSettings__from_lsutil) => Tristate__from_core) | undefined): (($0: FormattingContext | undefined) => bool) | undefined {
    return (context: FormattingContext | undefined): bool => {
        const __gotots_callee_2 = optionName;
        const __gotots_argument_2 = FormatCodeSettings__from_lsutil.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options);
        return Tristate_IsTrueOrUnknown__from_core((__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2));
    };
}
export function isForContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForStatement$constant__from_ast();
}
export function isNotForContext(context: FormattingContext | undefined): bool {
    return !isForContext(context);
}
export function isBinaryOpContext(context: FormattingContext | undefined): bool {
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindBinaryExpression$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindConditionalExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindConditionalType$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindAsExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindExportSpecifier$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindImportSpecifier$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindTypePredicate$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindUnionType$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindIntersectionType$constant__from_ast();
            }
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindSatisfiesExpression$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindBindingElement$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindTypeAliasDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindImportEqualsDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_0 = 4;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindExportAssignment$constant__from_ast();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_0 = 5;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindVariableDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_0 = 6;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_7 = false;
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindParameter$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindEnumMember$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindPropertySignature$constant__from_ast();
            }
            if (__gotots_switch_match_7) {
                __gotots_switch_selection_0 = 7;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_8 = false;
            if (!__gotots_switch_match_8) {
                __gotots_switch_match_8 = __gotots_switch_tag_0 === KindForInStatement$constant__from_ast();
            }
            if (__gotots_switch_match_8) {
                __gotots_switch_selection_0 = 8;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_9 = false;
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindTypeParameter$constant__from_ast();
            }
            if (__gotots_switch_match_9) {
                __gotots_switch_selection_0 = 9;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_10 = false;
            if (!__gotots_switch_match_10) {
                __gotots_switch_match_10 = __gotots_switch_tag_0 === KindForOfStatement$constant__from_ast();
            }
            if (__gotots_switch_match_10) {
                __gotots_switch_selection_0 = 10;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return !(Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast());
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                return true;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                __gotots_switch_selection_0 = 3;
            }
            if (__gotots_switch_selection_0 === 3) {
                __gotots_switch_selection_0 = 4;
            }
            if (__gotots_switch_selection_0 === 4) {
                __gotots_switch_selection_0 = 5;
            }
            if (__gotots_switch_selection_0 === 5) {
                __gotots_switch_selection_0 = 6;
            }
            if (__gotots_switch_selection_0 === 6) {
                __gotots_switch_selection_0 = 7;
            }
            if (__gotots_switch_selection_0 === 7) {
                return TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindEqualsToken$constant__from_ast() || TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindEqualsToken$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 8) {
                __gotots_switch_selection_0 = 9;
            }
            if (__gotots_switch_selection_0 === 9) {
                return TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindInKeyword$constant__from_ast() || TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindInKeyword$constant__from_ast() || TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindEqualsToken$constant__from_ast() || TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindEqualsToken$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 10) {
                return TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindOfKeyword$constant__from_ast() || TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindOfKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
        }
    }
    return false;
}
export function isNotBinaryOpContext(context: FormattingContext | undefined): bool {
    return !isBinaryOpContext(context);
}
export function isNotTypeAnnotationContext(context: FormattingContext | undefined): bool {
    return !isTypeAnnotationContext(context);
}
export function isTypeAnnotationContext(context: FormattingContext | undefined): bool {
    let contextKind = Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    return contextKind === KindPropertyDeclaration$constant__from_ast() || contextKind === KindPropertySignature$constant__from_ast() || contextKind === KindParameter$constant__from_ast() || contextKind === KindVariableDeclaration$constant__from_ast() || IsFunctionLikeKind__from_ast(contextKind);
}
export function isOptionalPropertyContext(context: FormattingContext | undefined): bool {
    return IsPropertyDeclaration__from_ast((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode) && HasQuestionToken__from_ast((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode);
}
export function isNonOptionalPropertyContext(context: FormattingContext | undefined): bool {
    return !isOptionalPropertyContext(context);
}
export function isConditionalOperatorContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConditionalExpression$constant__from_ast() || Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConditionalType$constant__from_ast();
}
export function isSameLineTokenOrBeforeBlockContext(context: FormattingContext | undefined): bool {
    return FormattingContext.TokensAreOnSameLine(context) || isBeforeBlockContext(context);
}
export function isBraceWrappedContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectBindingPattern$constant__from_ast() || Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMappedType$constant__from_ast() || isSingleLineBlockContext(context);
}
export function isBeforeMultilineBlockContext(context: FormattingContext | undefined): bool {
    return isBeforeBlockContext(context) && !(FormattingContext.NextNodeAllOnSameLine(context) || FormattingContext.NextNodeBlockIsOnOneLine(context));
}
export function isMultilineBlockContext(context: FormattingContext | undefined): bool {
    return isBlockContext(context) && !(FormattingContext.ContextNodeAllOnSameLine(context) || FormattingContext.ContextNodeBlockIsOnOneLine(context));
}
export function isSingleLineBlockContext(context: FormattingContext | undefined): bool {
    return isBlockContext(context) && (FormattingContext.ContextNodeAllOnSameLine(context) || FormattingContext.ContextNodeBlockIsOnOneLine(context));
}
export function isBlockContext(context: FormattingContext | undefined): bool {
    return nodeIsBlockContext((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode);
}
export function isBeforeBlockContext(context: FormattingContext | undefined): bool {
    return nodeIsBlockContext((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent);
}
export function nodeIsBlockContext(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (nodeIsTypeScriptDeclWithBlockContext(node)) {
        return true;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBlock$constant__from_ast():
        case KindCaseBlock$constant__from_ast():
        case KindObjectLiteralExpression$constant__from_ast():
        case KindModuleBlock$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function isFunctionDeclContext(context: FormattingContext | undefined): bool {
    {
        const __gotots_switch_tag_2 = Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_2 = -1;
        if (__gotots_switch_selection_2 === -1) {
            let __gotots_switch_match_13 = false;
            if (!__gotots_switch_match_13) {
                __gotots_switch_match_13 = __gotots_switch_tag_2 === KindFunctionDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_13) {
                __gotots_switch_match_13 = __gotots_switch_tag_2 === KindMethodDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_13) {
                __gotots_switch_match_13 = __gotots_switch_tag_2 === KindMethodSignature$constant__from_ast();
            }
            if (__gotots_switch_match_13) {
                __gotots_switch_selection_2 = 0;
            }
        }
        if (__gotots_switch_selection_2 === -1) {
            let __gotots_switch_match_14 = false;
            if (!__gotots_switch_match_14) {
                __gotots_switch_match_14 = __gotots_switch_tag_2 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_14) {
                __gotots_switch_match_14 = __gotots_switch_tag_2 === KindSetAccessor$constant__from_ast();
            }
            if (__gotots_switch_match_14) {
                __gotots_switch_selection_2 = 1;
            }
        }
        if (__gotots_switch_selection_2 === -1) {
            let __gotots_switch_match_15 = false;
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_2 === KindCallSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_2 === KindFunctionExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_2 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_2 === KindArrowFunction$constant__from_ast();
            }
            if (__gotots_switch_match_15) {
                __gotots_switch_selection_2 = 2;
            }
        }
        if (__gotots_switch_selection_2 === -1) {
            let __gotots_switch_match_16 = false;
            if (!__gotots_switch_match_16) {
                __gotots_switch_match_16 = __gotots_switch_tag_2 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_16) {
                __gotots_switch_selection_2 = 3;
            }
        }
        __gotots_control_target_2: {
            if (__gotots_switch_selection_2 === 0) {
                __gotots_switch_selection_2 = 1;
            }
            if (__gotots_switch_selection_2 === 1) {
                __gotots_switch_selection_2 = 2;
            }
            if (__gotots_switch_selection_2 === 2) {
                __gotots_switch_selection_2 = 3;
            }
            if (__gotots_switch_selection_2 === 3) {
                return true;
                break __gotots_control_target_2;
            }
        }
    }
    return false;
}
export function isNotFunctionDeclContext(context: FormattingContext | undefined): bool {
    return !isFunctionDeclContext(context);
}
export function isFunctionDeclarationOrFunctionExpressionContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionDeclaration$constant__from_ast() || Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast();
}
export function isTypeScriptDeclWithBlockContext(context: FormattingContext | undefined): bool {
    return nodeIsTypeScriptDeclWithBlockContext((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode);
}
export function nodeIsTypeScriptDeclWithBlockContext(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindTypeLiteral$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindExportDeclaration$constant__from_ast():
        case KindNamedExports$constant__from_ast():
        case KindImportDeclaration$constant__from_ast():
        case KindNamedImports$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function isAfterCodeBlockContext(context: FormattingContext | undefined): bool {
    switch (Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindCatchClause$constant__from_ast():
        case KindModuleBlock$constant__from_ast():
        case KindSwitchStatement$constant__from_ast(): {
            return true;
            break;
        }
        case KindBlock$constant__from_ast(): {
            let blockParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (blockParent === undefined || !(Node__from_ast.$storageOf(((blockParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast()) && !(Node__from_ast.$storageOf(((blockParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast())) {
                return true;
            }
            break;
        }
    }
    return false;
}
export function isControlDeclContext(context: FormattingContext | undefined): bool {
    {
        const __gotots_switch_tag_1 = Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_1 = -1;
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_11 = false;
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindIfStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindSwitchStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindForStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindForInStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindForOfStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindWhileStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindTryStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindDoStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_1 === KindWithStatement$constant__from_ast();
            }
            if (__gotots_switch_match_11) {
                __gotots_switch_selection_1 = 0;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            let __gotots_switch_match_12 = false;
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_1 === KindCatchClause$constant__from_ast();
            }
            if (__gotots_switch_match_12) {
                __gotots_switch_selection_1 = 1;
            }
        }
        if (__gotots_switch_selection_1 === -1) {
            __gotots_switch_selection_1 = 2;
        }
        __gotots_control_target_1: {
            if (__gotots_switch_selection_1 === 0) {
                __gotots_switch_selection_1 = 1;
            }
            if (__gotots_switch_selection_1 === 1) {
                return true;
                break __gotots_control_target_1;
            }
            if (__gotots_switch_selection_1 === 2) {
                return false;
                break __gotots_control_target_1;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function isObjectContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast();
}
export function isFunctionCallContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCallExpression$constant__from_ast();
}
export function isNewContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNewExpression$constant__from_ast();
}
export function isFunctionCallOrNewContext(context: FormattingContext | undefined): bool {
    return isFunctionCallContext(context) || isNewContext(context);
}
export function isPreviousTokenNotComma(context: FormattingContext | undefined): bool {
    return !(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindCommaToken$constant__from_ast());
}
export function isNextTokenNotCloseBracket(context: FormattingContext | undefined): bool {
    return !(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindCloseBracketToken$constant__from_ast());
}
export function isNextTokenNotCloseParen(context: FormattingContext | undefined): bool {
    return !(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind === KindCloseParenToken$constant__from_ast());
}
export function isArrowFunctionContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast();
}
export function isImportTypeContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportType$constant__from_ast();
}
export function isNonJsxSameLineTokenContext(context: FormattingContext | undefined): bool {
    return FormattingContext.TokensAreOnSameLine(context) && !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast());
}
export function isNonJsxTextContext(context: FormattingContext | undefined): bool {
    return !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast());
}
export function isNonJsxElementOrFragmentContext(context: FormattingContext | undefined): bool {
    return !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxElement$constant__from_ast()) && !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxFragment$constant__from_ast());
}
export function isJsxExpressionContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxExpression$constant__from_ast() || Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSpreadAttribute$constant__from_ast();
}
export function isNextTokenParentJsxAttribute(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast() || (Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxNamespacedName$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast());
}
export function isJsxAttributeContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxAttribute$constant__from_ast();
}
export function isNextTokenParentNotJsxNamespacedName(context: FormattingContext | undefined): bool {
    return !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxNamespacedName$constant__from_ast());
}
export function isNextTokenParentJsxNamespacedName(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxNamespacedName$constant__from_ast();
}
export function isJsxSelfClosingElementContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSelfClosingElement$constant__from_ast();
}
export function isNotBeforeBlockInFunctionDeclarationContext(context: FormattingContext | undefined): bool {
    return !isFunctionDeclContext(context) && !isBeforeBlockContext(context);
}
export function isEndOfDecoratorContextOnSameLine(context: FormattingContext | undefined): bool {
    return FormattingContext.TokensAreOnSameLine(context) && HasDecorators__from_ast((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode) && nodeIsInDecoratorContext((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent) && !nodeIsInDecoratorContext((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent);
}
export function nodeIsInDecoratorContext(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; !(node === undefined) && IsExpression__from_ast(node);) {
        node = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return !(node === undefined) && Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDecorator$constant__from_ast();
}
export function isStartOfVariableDeclarationList(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclarationList$constant__from_ast() && GetTokenPosOfNode__from_scanner((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent, (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, false) === TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Loc).Pos();
}
export function isNotFormatOnEnter(context: FormattingContext | undefined): bool {
    return !((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FormattingRequestKind.$value === FormatRequestKindFormatOnEnter$constant().$value);
}
export function isModuleDeclContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleDeclaration$constant__from_ast();
}
export function isObjectTypeContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeLiteral$constant__from_ast();
}
export function isConstructorSignatureContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConstructSignature$constant__from_ast();
}
export function isTypeArgumentOrParameterOrAssertion(token: TextRangeWithKind, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (!(TextRangeWithKind.$storageOf(token).Kind === KindLessThanToken$constant__from_ast()) && !(TextRangeWithKind.$storageOf(token).Kind === KindGreaterThanToken$constant__from_ast())) {
        return false;
    }
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeReference$constant__from_ast():
        case KindTypeAssertionExpression$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindCallSignature$constant__from_ast():
        case KindConstructSignature$constant__from_ast():
        case KindCallExpression$constant__from_ast():
        case KindNewExpression$constant__from_ast():
        case KindExpressionWithTypeArguments$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isTypeArgumentOrParameterOrAssertionContext(context: FormattingContext | undefined): bool {
    return isTypeArgumentOrParameterOrAssertion(TextRangeWithKind.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan), (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent) || isTypeArgumentOrParameterOrAssertion(TextRangeWithKind.$copy((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan), (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent);
}
export function isTypeAssertionContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeAssertionExpression$constant__from_ast();
}
export function isNonTypeAssertionContext(context: FormattingContext | undefined): bool {
    return !isTypeAssertionContext(context);
}
export function isVoidOpContext(context: FormattingContext | undefined): bool {
    return TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindVoidKeyword$constant__from_ast() && Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVoidExpression$constant__from_ast();
}
export function isYieldOrYieldStarWithOperand(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindYieldExpression$constant__from_ast() && !(Node__from_ast.Expression((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode) === undefined);
}
export function isNonNullAssertionContext(context: FormattingContext | undefined): bool {
    return Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNonNullExpression$constant__from_ast();
}
export function isNotStatementConditionContext(context: FormattingContext | undefined): bool {
    return !isStatementConditionContext(context);
}
export function isStatementConditionContext(context: FormattingContext | undefined): bool {
    switch (Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindIfStatement$constant__from_ast():
        case KindForStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast():
        case KindDoStatement$constant__from_ast():
        case KindWhileStatement$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function isSemicolonDeletionContext(context: FormattingContext | undefined): bool {
    let nextTokenKind__shadow_1 = TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Kind;
    let nextTokenStart = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenSpan).Loc).Pos();
    if (IsTrivia__from_ast(nextTokenKind__shadow_1)) {
        let nextRealToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (tsonicTypeScriptRuntime.sameLocation((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent, (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent)) {
            const __gotots_argument_5 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent;
            const __gotots_store_0 = NodeBase__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            const __gotots_argument_6 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_0, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_7 = (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile;
            nextRealToken = FindNextToken__from_astnav(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
        }
        else {
            nextRealToken = GetFirstToken__from_lsutil((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextTokenParent, (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
        }
        if (nextRealToken === undefined) {
            return true;
        }
        nextTokenKind__shadow_1 = Node__from_ast.$storageOf(((nextRealToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        nextTokenStart = GetTokenPosOfNode__from_scanner(nextRealToken, (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile, false);
    }
    let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Loc).Pos());
    let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile), nextTokenStart);
    if (startLine === endLine) {
        return nextTokenKind__shadow_1 === KindCloseBraceToken$constant__from_ast() || nextTokenKind__shadow_1 === KindEndOfFile$constant__from_ast();
    }
    if (nextTokenKind__shadow_1 === KindSemicolonToken$constant__from_ast() && TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Kind === KindSemicolonToken$constant__from_ast()) {
        return true;
    }
    if (nextTokenKind__shadow_1 === KindSemicolonClassElement$constant__from_ast() || nextTokenKind__shadow_1 === KindSemicolonToken$constant__from_ast()) {
        return false;
    }
    if (Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast() || Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeAliasDeclaration$constant__from_ast()) {
        return !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertySignature$constant__from_ast()) || !(Node__from_ast.Type((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent) === undefined) || !(nextTokenKind__shadow_1 === KindOpenParenToken$constant__from_ast());
    }
    if (IsPropertyDeclaration__from_ast((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent)) {
        return Node__from_ast.Initializer((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent) === undefined;
    }
    return !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindForStatement$constant__from_ast()) && !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEmptyStatement$constant__from_ast()) && !(Node__from_ast.$storageOf((((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonClassElement$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindOpenBracketToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindOpenParenToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindPlusToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindMinusToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindSlashToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindRegularExpressionLiteral$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindCommaToken$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindTemplateExpression$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindTemplateHead$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindNoSubstitutionTemplateLiteral$constant__from_ast()) && !(nextTokenKind__shadow_1 === KindDotToken$constant__from_ast());
}
export function isSemicolonInsertionContext(context: FormattingContext | undefined): bool {
    return PositionIsASICandidate__from_lsutil(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenSpan).Loc).End(), (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentTokenParent, (context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SourceFile);
}
export function isNotPropertyAccessOnIntegerLiteral(context: FormattingContext | undefined): bool {
    return !IsPropertyAccessExpression__from_ast((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode) || !IsNumericLiteral__from_ast(Node__from_ast.Expression((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode)) || strings__from_gostdlib.Contains(Node__from_ast.Text(Node__from_ast.Expression((context ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).contextNode)), ".");
}
