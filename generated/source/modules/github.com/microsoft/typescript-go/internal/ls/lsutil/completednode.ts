import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CatchClause as CatchClause__from_ast, IndexSignatureDeclaration as IndexSignatureDeclaration__from_ast, Kind as Kind__from_ast, TaggedTemplateExpression as TaggedTemplateExpression__from_ast, TemplateExpression as TemplateExpression__from_ast, TemplateSpan as TemplateSpan__from_ast, TypeQueryNode as TypeQueryNode__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, ConditionalExpression as ConditionalExpression__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, IfStatement as IfStatement__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOfExpression$constant as KindTypeOfExpression$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindVoidExpression$constant as KindVoidExpression$constant__from_ast, KindWhileKeyword$constant as KindWhileKeyword$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindYieldExpression$constant as KindYieldExpression$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeIsPresent as NodeIsPresent__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, Scanner as Scanner__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { LastOrNil$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { GetLastVisitedChild } from "./children.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function PositionBelongsToNode(candidate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (Node__from_ast.Pos(candidate) > position) {
        const __gotots_argument_0 = new GoInterfaceAdapter("Expected candidate.pos <= position");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return position < Node__from_ast.End(candidate) || !IsCompletedNode(candidate, file);
}
export function IsCompletedNode(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (n === undefined || NodeIsMissing__from_ast(n)) {
        return false;
    }
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindClassDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindEnumDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindObjectLiteralExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindObjectBindingPattern$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindTypeLiteral$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindBlock$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindModuleBlock$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindCaseBlock$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNamedImports$constant__from_ast();
            }
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindNamedExports$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindCatchClause$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindNewExpression$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindCallExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindParenthesizedExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindParenthesizedType$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindFunctionType$constant__from_ast();
            }
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindConstructorType$constant__from_ast();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_0 = 4;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindConstructor$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindFunctionExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindMethodSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindConstructSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindCallSignature$constant__from_ast();
            }
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindArrowFunction$constant__from_ast();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_0 = 5;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindModuleDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_0 = 6;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_7 = false;
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindIfStatement$constant__from_ast();
            }
            if (__gotots_switch_match_7) {
                __gotots_switch_selection_0 = 7;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_8 = false;
            if (!__gotots_switch_match_8) {
                __gotots_switch_match_8 = __gotots_switch_tag_0 === KindExpressionStatement$constant__from_ast();
            }
            if (__gotots_switch_match_8) {
                __gotots_switch_selection_0 = 8;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_9 = false;
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindArrayLiteralExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindArrayBindingPattern$constant__from_ast();
            }
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindElementAccessExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindComputedPropertyName$constant__from_ast();
            }
            if (!__gotots_switch_match_9) {
                __gotots_switch_match_9 = __gotots_switch_tag_0 === KindTupleType$constant__from_ast();
            }
            if (__gotots_switch_match_9) {
                __gotots_switch_selection_0 = 9;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_10 = false;
            if (!__gotots_switch_match_10) {
                __gotots_switch_match_10 = __gotots_switch_tag_0 === KindIndexSignature$constant__from_ast();
            }
            if (__gotots_switch_match_10) {
                __gotots_switch_selection_0 = 10;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_11 = false;
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindCaseClause$constant__from_ast();
            }
            if (!__gotots_switch_match_11) {
                __gotots_switch_match_11 = __gotots_switch_tag_0 === KindDefaultClause$constant__from_ast();
            }
            if (__gotots_switch_match_11) {
                __gotots_switch_selection_0 = 11;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_12 = false;
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_0 === KindForStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_0 === KindForInStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_0 === KindForOfStatement$constant__from_ast();
            }
            if (!__gotots_switch_match_12) {
                __gotots_switch_match_12 = __gotots_switch_tag_0 === KindWhileStatement$constant__from_ast();
            }
            if (__gotots_switch_match_12) {
                __gotots_switch_selection_0 = 12;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_13 = false;
            if (!__gotots_switch_match_13) {
                __gotots_switch_match_13 = __gotots_switch_tag_0 === KindDoStatement$constant__from_ast();
            }
            if (__gotots_switch_match_13) {
                __gotots_switch_selection_0 = 13;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_14 = false;
            if (!__gotots_switch_match_14) {
                __gotots_switch_match_14 = __gotots_switch_tag_0 === KindTypeQuery$constant__from_ast();
            }
            if (__gotots_switch_match_14) {
                __gotots_switch_selection_0 = 14;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_15 = false;
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_0 === KindTypeOfExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_0 === KindDeleteExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_0 === KindVoidExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_0 === KindYieldExpression$constant__from_ast();
            }
            if (!__gotots_switch_match_15) {
                __gotots_switch_match_15 = __gotots_switch_tag_0 === KindSpreadElement$constant__from_ast();
            }
            if (__gotots_switch_match_15) {
                __gotots_switch_selection_0 = 15;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_16 = false;
            if (!__gotots_switch_match_16) {
                __gotots_switch_match_16 = __gotots_switch_tag_0 === KindTaggedTemplateExpression$constant__from_ast();
            }
            if (__gotots_switch_match_16) {
                __gotots_switch_selection_0 = 16;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_17 = false;
            if (!__gotots_switch_match_17) {
                __gotots_switch_match_17 = __gotots_switch_tag_0 === KindTemplateExpression$constant__from_ast();
            }
            if (__gotots_switch_match_17) {
                __gotots_switch_selection_0 = 17;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_18 = false;
            if (!__gotots_switch_match_18) {
                __gotots_switch_match_18 = __gotots_switch_tag_0 === KindTemplateSpan$constant__from_ast();
            }
            if (__gotots_switch_match_18) {
                __gotots_switch_selection_0 = 18;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_19 = false;
            if (!__gotots_switch_match_19) {
                __gotots_switch_match_19 = __gotots_switch_tag_0 === KindExportDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_19) {
                __gotots_switch_match_19 = __gotots_switch_tag_0 === KindImportDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_19) {
                __gotots_switch_selection_0 = 19;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_20 = false;
            if (!__gotots_switch_match_20) {
                __gotots_switch_match_20 = __gotots_switch_tag_0 === KindPrefixUnaryExpression$constant__from_ast();
            }
            if (__gotots_switch_match_20) {
                __gotots_switch_selection_0 = 20;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_21 = false;
            if (!__gotots_switch_match_21) {
                __gotots_switch_match_21 = __gotots_switch_tag_0 === KindBinaryExpression$constant__from_ast();
            }
            if (__gotots_switch_match_21) {
                __gotots_switch_selection_0 = 21;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_22 = false;
            if (!__gotots_switch_match_22) {
                __gotots_switch_match_22 = __gotots_switch_tag_0 === KindConditionalExpression$constant__from_ast();
            }
            if (__gotots_switch_match_22) {
                __gotots_switch_selection_0 = 22;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 23;
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return nodeEndsWith(n, KindCloseBraceToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                return IsCompletedNode((Node__from_ast.AsCatchClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                if (Node__from_ast.ArgumentList(n) === undefined) {
                    return true;
                }
                __gotots_switch_selection_0 = 3;
            }
            if (__gotots_switch_selection_0 === 3) {
                return nodeEndsWith(n, KindCloseParenToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 4) {
                return IsCompletedNode(Node__from_ast.Type(n), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 5) {
                if (!(Node__from_ast.Body(n) === undefined)) {
                    return IsCompletedNode(Node__from_ast.Body(n), sourceFile);
                }
                if (!(Node__from_ast.Type(n) === undefined)) {
                    return IsCompletedNode(Node__from_ast.Type(n), sourceFile);
                }
                return hasChildOfKind(n, KindCloseParenToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 6) {
                return !(Node__from_ast.Body(n) === undefined) && IsCompletedNode(Node__from_ast.Body(n), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 7) {
                if (!(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement === undefined)) {
                    return IsCompletedNode(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement, sourceFile);
                }
                return IsCompletedNode(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ThenStatement, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 8) {
                return IsCompletedNode(Node__from_ast.Expression(n), sourceFile) || hasChildOfKind(n, KindSemicolonToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 9) {
                return nodeEndsWith(n, KindCloseBracketToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 10) {
                if (!(FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsIndexSignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type === undefined)) {
                    return IsCompletedNode(FunctionLikeBase__from_ast.$storageOf((Node__from_ast.AsIndexSignatureDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeBase).Type, sourceFile);
                }
                return hasChildOfKind(n, KindCloseBracketToken$constant__from_ast(), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 11) {
                return false;
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 12) {
                return IsCompletedNode(Node__from_ast.Statement(n), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 13) {
                if (hasChildOfKind(n, KindWhileKeyword$constant__from_ast(), sourceFile)) {
                    return nodeEndsWith(n, KindCloseParenToken$constant__from_ast(), sourceFile);
                }
                return IsCompletedNode(Node__from_ast.Statement(n), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 14) {
                return IsCompletedNode((Node__from_ast.AsTypeQueryNode(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExprName, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 15) {
                return IsCompletedNode(Node__from_ast.Expression(n), sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 16) {
                return IsCompletedNode((Node__from_ast.AsTaggedTemplateExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 17) {
                if ((Node__from_ast.AsTemplateExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans === undefined) {
                    return false;
                }
                let lastSpan: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = LastOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((Node__from_ast.AsTemplateExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TemplateSpans ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
                return IsCompletedNode(lastSpan, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 18) {
                return NodeIsPresent__from_ast((Node__from_ast.AsTemplateSpan(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 19) {
                return NodeIsPresent__from_ast(Node__from_ast.ModuleSpecifier(n));
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 20) {
                return IsCompletedNode(PrefixUnaryExpression__from_ast.$storageOf(((Node__from_ast.AsPrefixUnaryExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 21) {
                return IsCompletedNode(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 22) {
                return IsCompletedNode(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse, sourceFile);
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 23) {
                return true;
                break __gotots_control_target_0;
            }
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function nodeEndsWith(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, expectedLastToken: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let lastChildNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastVisitedChild(n, sourceFile);
    let lastNodeAndTokens = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    let tokenStartPos = 0;
    if (!(lastChildNode === undefined)) {
        lastNodeAndTokens = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([lastChildNode]);
        tokenStartPos = Node__from_ast.End(lastChildNode);
    }
    else {
        tokenStartPos = Node__from_ast.Pos(n);
    }
    let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, tokenStartPos);
    for (let startPos = tokenStartPos; startPos < Node__from_ast.End(n);) {
        let tokenKind = Scanner__from_scanner.Token(scanner__shadow_1);
        let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
        let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
        let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SourceFile__from_ast.GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, n, Scanner__from_scanner.TokenFlags(scanner__shadow_1));
        lastNodeAndTokens = lastNodeAndTokens.append(void 0, [token]);
        startPos = tokenEnd;
        Scanner__from_scanner.Scan(scanner__shadow_1);
    }
    if (lastNodeAndTokens.length === 0) {
        return false;
    }
    let lastChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = lastNodeAndTokens.get(lastNodeAndTokens.length - 1);
    if (Node__from_ast.$storageOf(((lastChild ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === expectedLastToken) {
        return true;
    }
    else if (Node__from_ast.$storageOf(((lastChild ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast() && lastNodeAndTokens.length > 1) {
        return Node__from_ast.$storageOf(((lastNodeAndTokens.get(lastNodeAndTokens.length - 2) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === expectedLastToken;
    }
    return false;
}
export function hasChildOfKind(containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return !(FindChildOfKind__from_astnav(containingNode, kind, sourceFile) === undefined);
}
