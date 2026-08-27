import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, CaseOrDefaultClause as CaseOrDefaultClause__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ImportAttributes as ImportAttributes__from_ast, JsxElement as JsxElement__from_ast, JsxFragment as JsxFragment__from_ast, JsxOpeningElement as JsxOpeningElement__from_ast, JsxSelfClosingElement as JsxSelfClosingElement__from_ast, Kind as Kind__from_ast, ModuleBlock as ModuleBlock__from_ast, NamedExports as NamedExports__from_ast, NamedImports as NamedImports__from_ast, NodeFactory as NodeFactory__from_ast, TryStatement as TryStatement__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ResolvedClientCapabilities as ResolvedClientCapabilities__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { NodeFactory as NodeFactory__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import { BinaryExpression as BinaryExpression__from_ast, Block as Block__from_ast, BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, CommentRange as CommentRange__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, IfStatement as IfStatement__from_ast, InterfaceDeclaration as InterfaceDeclaration__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBlock as IsBlock__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCallOrNewExpression as IsCallOrNewExpression__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsClassExpression as IsClassExpression__from_ast, IsClassLike as IsClassLike__from_ast, IsDeclaration as IsDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsIfStatement as IsIfStatement__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJsxText as IsJsxText__from_ast, IsModuleBlock as IsModuleBlock__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsReturnStatement as IsReturnStatement__from_ast, IsTupleTypeNode as IsTupleTypeNode__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportAttributes$constant as KindImportAttributes$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, KindWithStatement$constant as KindWithStatement$constant__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FoldingRangeKindComment$constant as FoldingRangeKindComment$constant__from_lsproto, FoldingRangeKind as FoldingRangeKind__from_lsproto, FoldingRange as FoldingRange__from_lsproto, GetClientCapabilities as GetClientCapabilities__from_lsproto, Position as Position__from_lsproto, Range as Range__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { EmitContext as EmitContext__from_printer, NewNodeFactory as NewNodeFactory__from_printer, PositionsAreOnSameLine as PositionsAreOnSameLine__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetTextOfNode as GetTextOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$Named_ast$Kind as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { LanguageService } from "./languageservice.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function visitNode(ctx: GoInterface | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, depthRemaining: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): RuntimeSlice<{
    value: FoldingRange__from_lsproto;
} | undefined> {
    let __gotots_logical_result_0 = !((Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) || depthRemaining === 0;
    if (!__gotots_logical_result_0) {
        const __gotots_receiver_0 = ctx;
        __gotots_logical_result_0 = !(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined);
    }
    if (__gotots_logical_result_0) {
        return RuntimeSlice.nil<{
            value: FoldingRange__from_lsproto;
        } | undefined>();
    }
    let foldingRange = RuntimeSlice.make<{
        value: FoldingRange__from_lsproto;
    } | undefined>(0, 40, void 0);
    if ((!IsBinaryExpression__from_ast(n) && IsDeclaration__from_ast(n)) || IsVariableStatement__from_ast(n) || IsReturnStatement__from_ast(n) || IsCallOrNewExpression__from_ast(n) || Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast()) {
        foldingRange = goSliceAppendSlice<{
            value: FoldingRange__from_lsproto;
        } | undefined>(foldingRange, addOutliningForLeadingCommentsForNode(ctx, n, sourceFile, l), void 0);
    }
    if (IsFunctionLike__from_ast(n) && !(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && IsBinaryExpression__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left === undefined) && IsPropertyAccessExpression__from_ast(BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left)) {
        foldingRange = goSliceAppendSlice<{
            value: FoldingRange__from_lsproto;
        } | undefined>(foldingRange, addOutliningForLeadingCommentsForNode(ctx, BinaryExpression__from_ast.$storageOf(((Node__from_ast.AsBinaryExpression(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left, sourceFile, l), void 0);
    }
    if (IsBlock__from_ast(n)) {
        let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Block__from_ast.$storageOf(((Node__from_ast.AsBlock(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Block__from_ast>).value).Statements;
        if (!(statements === undefined)) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, addOutliningForLeadingCommentsForPos(ctx, NodeList__from_ast.End(statements), sourceFile, l), void 0);
        }
    }
    if (IsModuleBlock__from_ast(n)) {
        let statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = (Node__from_ast.AsModuleBlock(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements;
        if (!(statements === undefined)) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, addOutliningForLeadingCommentsForPos(ctx, NodeList__from_ast.End(statements), sourceFile, l), void 0);
        }
    }
    if (IsClassLike__from_ast(n) || IsInterfaceDeclaration__from_ast(n)) {
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
        if (IsClassDeclaration__from_ast(n)) {
            members = (Node__from_ast.AsClassDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members;
        }
        else if (IsClassExpression__from_ast(n)) {
            members = (Node__from_ast.AsClassExpression(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members;
        }
        else {
            members = InterfaceDeclaration__from_ast.$storageOf(((Node__from_ast.AsInterfaceDeclaration(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<InterfaceDeclaration__from_ast>).value).Members;
        }
        if (!(members === undefined)) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, addOutliningForLeadingCommentsForPos(ctx, NodeList__from_ast.End(members), sourceFile, l), void 0);
        }
    }
    let span: {
        value: FoldingRange__from_lsproto;
    } | undefined = getOutliningSpanForNode(ctx, n, sourceFile, l);
    if (!(span === undefined)) {
        foldingRange = foldingRange.append(void 0, [span]);
    }
    depthRemaining--;
    if (IsCallExpression__from_ast(n)) {
        depthRemaining++;
        let expressionNodes = visitNode(ctx, Node__from_ast.Expression(n), depthRemaining, sourceFile, l);
        if (!expressionNodes.isNil()) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, expressionNodes, void 0);
        }
        depthRemaining--;
        const __gotots_range_0 = Node__from_ast.Arguments(n);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let arg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            if (!(arg === undefined)) {
                foldingRange = goSliceAppendSlice<{
                    value: FoldingRange__from_lsproto;
                } | undefined>(foldingRange, visitNode(ctx, arg, depthRemaining, sourceFile, l), void 0);
            }
        }
        let typeArguments = Node__from_ast.TypeArguments(n);
        const __gotots_range_1 = typeArguments;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let typeArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            if (!(typeArg === undefined)) {
                foldingRange = goSliceAppendSlice<{
                    value: FoldingRange__from_lsproto;
                } | undefined>(foldingRange, visitNode(ctx, typeArg, depthRemaining, sourceFile, l), void 0);
            }
        }
    }
    else if (IsIfStatement__from_ast(n) && !(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement === undefined) && IsIfStatement__from_ast(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement)) {
        let ifStatement: tsonicTypeScriptRuntime.Location<IfStatement__from_ast> | undefined = Node__from_ast.AsIfStatement(n);
        let expressionNodes = visitNode(ctx, Node__from_ast.Expression(n), depthRemaining, sourceFile, l);
        if (!expressionNodes.isNil()) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, expressionNodes, void 0);
        }
        let thenNode = visitNode(ctx, IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ThenStatement, depthRemaining, sourceFile, l);
        if (!thenNode.isNil()) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, thenNode, void 0);
        }
        depthRemaining++;
        let elseNode = visitNode(ctx, IfStatement__from_ast.$storageOf(((ifStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement, depthRemaining, sourceFile, l);
        if (!elseNode.isNil()) {
            foldingRange = goSliceAppendSlice<{
                value: FoldingRange__from_lsproto;
            } | undefined>(foldingRange, elseNode, void 0);
        }
        depthRemaining--;
    }
    else {
        let visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            let childNode = visitNode(ctx, node, depthRemaining, sourceFile, l);
            if (!childNode.isNil()) {
                foldingRange = goSliceAppendSlice<{
                    value: FoldingRange__from_lsproto;
                } | undefined>(foldingRange, childNode, void 0);
            }
            return false;
        };
        Node__from_ast.ForEachChild(n, new Visitor__from_ast(visit));
    }
    depthRemaining++;
    return foldingRange;
}
export function addOutliningForLeadingCommentsForNode(ctx: GoInterface | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): RuntimeSlice<{
    value: FoldingRange__from_lsproto;
} | undefined> {
    if (IsJsxText__from_ast(n)) {
        return RuntimeSlice.nil<{
            value: FoldingRange__from_lsproto;
        } | undefined>();
    }
    return addOutliningForLeadingCommentsForPos(ctx, Node__from_ast.Pos(n), sourceFile, l);
}
export function addOutliningForLeadingCommentsForPos(ctx: GoInterface | undefined, pos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): RuntimeSlice<{
    value: FoldingRange__from_lsproto;
} | undefined> {
    const __gotots_struct_0 = EmitContext__from_printer.$zero();
    let p: {
        value: EmitContext__from_printer;
    } | undefined = { value: __gotots_struct_0 };
    let foldingRange = RuntimeSlice.make<{
        value: FoldingRange__from_lsproto;
    } | undefined>(0, 40, void 0);
    let firstSingleLineCommentStart = -1;
    let lastSingleLineCommentEnd = -1;
    let singleLineCommentCount = 0;
    let foldingRangeKindComment = FoldingRangeKindComment$constant__from_lsproto();
    let combineAndAddMultipleSingleLineComments: (() => {
        value: FoldingRange__from_lsproto;
    } | undefined) | undefined = (): {
        value: FoldingRange__from_lsproto;
    } | undefined => {
        if (singleLineCommentCount > 1) {
            return createFoldingRangeFromBounds(ctx, firstSingleLineCommentStart, lastSingleLineCommentEnd, foldingRangeKindComment, sourceFile, l);
        }
        return void 0;
    };
    let sourceText = SourceFile__from_ast.Text(sourceFile);
    const __gotots_store_0 = (NewNodeFactory__from_printer(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_argument_0 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory");
    const __gotots_argument_1 = sourceText;
    const __gotots_argument_2 = pos;
    const __gotots_range_2 = named_iter.IterSeqValueOperations.$project(GetLeadingCommentRanges__from_scanner(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2));
    if (__gotots_range_2 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    let __gotots_range_return_0: RuntimeSlice<{
        value: FoldingRange__from_lsproto;
    } | undefined> = RuntimeSlice.nil<{
        value: FoldingRange__from_lsproto;
    } | undefined>();
    __gotots_range_2(($argument0: CommentRange__from_ast): bool => {
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
        const __gotots_range_value_2 = CommentRange__from_ast.$copy($argument0);
        let comment = __gotots_range_value_2;
        let commentPos = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos();
        let commentEnd = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End();
        const __gotots_receiver_1 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Err() === undefined)) {
            __gotots_range_return_0 = RuntimeSlice.nil<{
                value: FoldingRange__from_lsproto;
            } | undefined>();
            __gotots_range_state_0 = 2;
            return false;
        }
        switch (CommentRange__from_ast.$storageOf(comment).Kind) {
            case KindSingleLineCommentTrivia$constant__from_ast(): {
                let commentText = goStringSlice(sourceText, commentPos, commentEnd);
                if (!(parseRegionDelimiter(commentText) === undefined)) {
                    const __gotots_callee_2 = combineAndAddMultipleSingleLineComments;
                    let comments: {
                        value: FoldingRange__from_lsproto;
                    } | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
                    if (!(comments === undefined)) {
                        foldingRange = foldingRange.append(void 0, [comments]);
                    }
                    singleLineCommentCount = 0;
                    break;
                }
                if (singleLineCommentCount === 0) {
                    firstSingleLineCommentStart = commentPos;
                }
                lastSingleLineCommentEnd = commentEnd;
                singleLineCommentCount++;
                break;
                break;
            }
            case KindMultiLineCommentTrivia$constant__from_ast(): {
                const __gotots_callee_3 = combineAndAddMultipleSingleLineComments;
                let comments: {
                    value: FoldingRange__from_lsproto;
                } | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
                if (!(comments === undefined)) {
                    foldingRange = foldingRange.append(void 0, [comments]);
                }
                foldingRange = foldingRange.append(void 0, [createFoldingRangeFromBounds(ctx, commentPos, commentEnd, foldingRangeKindComment, sourceFile, l)]);
                singleLineCommentCount = 0;
                break;
                break;
            }
            default: {
                AssertNever__from_debug(new GoInterfaceAdapter(CommentRange__from_ast.$storageOf(comment).Kind), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                break;
            }
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    if (__gotots_range_state_0 === 2) {
        return __gotots_range_return_0;
    }
    __gotots_range_state_0 = -2;
    const __gotots_callee_4 = combineAndAddMultipleSingleLineComments;
    let addedComments: {
        value: FoldingRange__from_lsproto;
    } | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
    if (!(addedComments === undefined)) {
        foldingRange = foldingRange.append(void 0, [addedComments]);
    }
    return foldingRange;
}
export class regionDelimiterResult {
    declare private readonly $goType: void;
    public constructor(public isStart: bool, public name: gostring) {
    }
    declare private readonly then?: never;
}
export function parseRegionDelimiter(lineText: gostring): regionDelimiterResult | undefined {
    lineText = strings__from_gostdlib.TrimLeftFunc(lineText, unicode__from_gostdlib.IsSpace);
    if (!strings__from_gostdlib.HasPrefix(lineText, "//")) {
        return void 0;
    }
    lineText = strings__from_gostdlib.TrimSpace(goStringSlice(lineText, 2));
    lineText = strings__from_gostdlib.TrimSuffix(lineText, "\r");
    if (!strings__from_gostdlib.HasPrefix(lineText, "#")) {
        return void 0;
    }
    lineText = goStringSlice(lineText, 1);
    let isStart = true;
    if (strings__from_gostdlib.HasPrefix(lineText, "end")) {
        isStart = false;
        lineText = goStringSlice(lineText, 3);
    }
    if (!strings__from_gostdlib.HasPrefix(lineText, "region")) {
        return void 0;
    }
    lineText = goStringSlice(lineText, 6);
    return new regionDelimiterResult(isStart, strings__from_gostdlib.TrimSpace(lineText));
}
export function getOutliningSpanForNode(ctx: GoInterface | undefined, n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    switch (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindBlock$constant__from_ast(): {
            if (IsFunctionLike__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
                return functionSpan(ctx, Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, n, sourceFile, l);
            }
            {
                const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindDoStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindForInStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindForOfStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindForStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindIfStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindWhileStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindWithStatement$constant__from_ast();
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === KindCatchClause$constant__from_ast();
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === KindTryStatement$constant__from_ast();
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_0 = 1;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    __gotots_switch_selection_0 = 2;
                }
                __gotots_control_target_0: {
                    if (__gotots_switch_selection_0 === 0) {
                        return spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), true, sourceFile, l);
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 1) {
                        let tryStatement: {
                            value: TryStatement__from_ast;
                        } | undefined = Node__from_ast.AsTryStatement(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
                        if (tsonicTypeScriptRuntime.sameLocation((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TryBlock, n)) {
                            return spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), true, sourceFile, l);
                        }
                        else if (tsonicTypeScriptRuntime.sameLocation((tryStatement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FinallyBlock, n)) {
                            {
                                let span: {
                                    value: FoldingRange__from_lsproto;
                                } | undefined = spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), true, sourceFile, l);
                                if (!(span === undefined)) {
                                    return span;
                                }
                            }
                        }
                        __gotots_switch_selection_0 = 2;
                    }
                    if (__gotots_switch_selection_0 === 2) {
                        return createFoldingRange(ctx, LanguageService.$go$private$ls$createLspRangeFromNode(l, n, sourceFile), new FoldingRangeKind__from_lsproto(""), "");
                        break __gotots_control_target_0;
                    }
                }
            }
            break;
        }
        case KindModuleBlock$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), true, sourceFile, l);
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindCaseBlock$constant__from_ast():
        case KindTypeLiteral$constant__from_ast():
        case KindObjectBindingPattern$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), true, sourceFile, l);
            break;
        }
        case KindTupleType$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBracketToken$constant__from_ast(), !IsTupleTypeNode__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), sourceFile, l);
            break;
        }
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast(): {
            return spanForNodeArray(ctx, (Node__from_ast.AsCaseOrDefaultClause(n) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Statements, sourceFile, l);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBraceToken$constant__from_ast(), !IsArrayLiteralExpression__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsCallExpression__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), sourceFile, l);
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBracketToken$constant__from_ast(), !IsArrayLiteralExpression__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && !IsCallExpression__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), sourceFile, l);
            break;
        }
        case KindJsxElement$constant__from_ast():
        case KindJsxFragment$constant__from_ast(): {
            return spanForJSXElement(ctx, n, sourceFile, l);
            break;
        }
        case KindJsxSelfClosingElement$constant__from_ast():
        case KindJsxOpeningElement$constant__from_ast(): {
            return spanForJSXAttributes(ctx, n, sourceFile, l);
            break;
        }
        case KindTemplateExpression$constant__from_ast():
        case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
            return spanForTemplateLiteral(ctx, n, sourceFile, l);
            break;
        }
        case KindArrayBindingPattern$constant__from_ast(): {
            return spanForNode(ctx, n, KindOpenBracketToken$constant__from_ast(), !IsBindingElement__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent), sourceFile, l);
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            return spanForArrowFunction(ctx, n, sourceFile, l);
            break;
        }
        case KindCallExpression$constant__from_ast(): {
            return spanForCallExpression(ctx, n, sourceFile, l);
            break;
        }
        case KindParenthesizedExpression$constant__from_ast(): {
            return spanForParenthesizedExpression(ctx, n, sourceFile, l);
            break;
        }
        case KindNamedImports$constant__from_ast():
        case KindNamedExports$constant__from_ast():
        case KindImportAttributes$constant__from_ast(): {
            return spanForImportExportElements(ctx, n, sourceFile, l);
            break;
        }
    }
    return void 0;
}
export function spanForImportExportElements(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = void 0;
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindNamedImports$constant__from_ast(): {
            elements = (Node__from_ast.AsNamedImports(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
            break;
        }
        case KindNamedExports$constant__from_ast(): {
            elements = (Node__from_ast.AsNamedExports(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements;
            break;
        }
        case KindImportAttributes$constant__from_ast(): {
            elements = (Node__from_ast.AsImportAttributes(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
            break;
        }
    }
    if (elements === undefined || NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return void 0;
    }
    let openToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindOpenBraceToken$constant__from_ast(), sourceFile);
    let closeToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindCloseBraceToken$constant__from_ast(), sourceFile);
    if (openToken === undefined || closeToken === undefined || PositionsAreOnSameLine__from_printer(Node__from_ast.Pos(openToken), Node__from_ast.Pos(closeToken), sourceFile)) {
        return void 0;
    }
    return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, false, l);
}
export function spanForParenthesizedExpression(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let start = GetStartOfNode__from_astnav(node, sourceFile, false);
    if (PositionsAreOnSameLine__from_printer(start, Node__from_ast.End(node), sourceFile)) {
        return void 0;
    }
    let textRange = LanguageService.$go$private$ls$createLspRangeFromBounds(l, start, Node__from_ast.End(node), sourceFile);
    return createFoldingRange(ctx, Range__from_lsproto.$copy(textRange), new FoldingRangeKind__from_lsproto(""), "");
}
export function spanForCallExpression(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    if (CallExpression__from_ast.$storageOf(((Node__from_ast.AsCallExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments === undefined || NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((Node__from_ast.AsCallExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return void 0;
    }
    let openToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindOpenParenToken$constant__from_ast(), sourceFile);
    let closeToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindCloseParenToken$constant__from_ast(), sourceFile);
    if (openToken === undefined || closeToken === undefined || PositionsAreOnSameLine__from_printer(Node__from_ast.Pos(openToken), Node__from_ast.Pos(closeToken), sourceFile)) {
        return void 0;
    }
    return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true, l);
}
export function spanForArrowFunction(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let arrowFunctionNode: {
        value: ArrowFunction__from_ast;
    } | undefined = Node__from_ast.AsArrowFunction(node);
    if (IsBlock__from_ast(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) || IsParenthesizedExpression__from_ast(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body) || PositionsAreOnSameLine__from_printer(Node__from_ast.Pos(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body), Node__from_ast.End(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body), sourceFile)) {
        return void 0;
    }
    let textRange = LanguageService.$go$private$ls$createLspRangeFromBounds(l, Node__from_ast.Pos(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body), Node__from_ast.End(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((arrowFunctionNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body), sourceFile);
    return createFoldingRange(ctx, Range__from_lsproto.$copy(textRange), new FoldingRangeKind__from_lsproto(""), "");
}
export function spanForTemplateLiteral(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNoSubstitutionTemplateLiteral$constant__from_ast() && Node__from_ast.Text(node).length === 0) {
        return void 0;
    }
    return createFoldingRangeFromBounds(ctx, GetStartOfNode__from_astnav(node, sourceFile, false), Node__from_ast.End(node), new FoldingRangeKind__from_lsproto(""), sourceFile, l);
}
export function spanForJSXElement(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxElement$constant__from_ast()) {
        let jsxElement: {
            value: JsxElement__from_ast;
        } | undefined = Node__from_ast.AsJsxElement(node);
        let textRange__shadow_1 = LanguageService.$go$private$ls$createLspRangeFromBounds(l, GetStartOfNode__from_astnav((jsxElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement, sourceFile, false), Node__from_ast.End((jsxElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingElement), sourceFile);
        let tagName = GetTextOfNode__from_scanner(Node__from_ast.TagName((jsxElement ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement));
        let bannerText = "<" + tagName + ">...</" + tagName + ">";
        return createFoldingRange(ctx, Range__from_lsproto.$copy(textRange__shadow_1), new FoldingRangeKind__from_lsproto(""), bannerText);
    }
    let jsxFragment: {
        value: JsxFragment__from_ast;
    } | undefined = Node__from_ast.AsJsxFragment(node);
    let textRange = LanguageService.$go$private$ls$createLspRangeFromBounds(l, GetStartOfNode__from_astnav((jsxFragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningFragment, sourceFile, false), Node__from_ast.End((jsxFragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingFragment), sourceFile);
    return createFoldingRange(ctx, Range__from_lsproto.$copy(textRange), new FoldingRangeKind__from_lsproto(""), "<>...</>");
}
export function spanForJSXAttributes(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let attributes: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxSelfClosingElement$constant__from_ast()) {
        attributes = (Node__from_ast.AsJsxSelfClosingElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
    }
    else {
        attributes = (Node__from_ast.AsJsxOpeningElement(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
    }
    if (Node__from_ast.Properties(attributes).length === 0) {
        return void 0;
    }
    return createFoldingRangeFromBounds(ctx, GetStartOfNode__from_astnav(node, sourceFile, false), Node__from_ast.End(node), new FoldingRangeKind__from_lsproto(""), sourceFile, l);
}
export function spanForNodeArray(ctx: GoInterface | undefined, statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    if (!(statements === undefined) && NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 0) {
        return createFoldingRange(ctx, LanguageService.$go$private$ls$createLspRangeFromBounds(l, NodeList__from_ast.Pos(statements), NodeList__from_ast.End(statements), sourceFile), new FoldingRangeKind__from_lsproto(""), "");
    }
    return void 0;
}
export function spanForNode(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, open: Kind__from_ast, useFullStart: bool, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let closeBrace = KindCloseBraceToken$constant__from_ast();
    if (!(open === KindOpenBraceToken$constant__from_ast())) {
        closeBrace = KindCloseBracketToken$constant__from_ast();
    }
    let openToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, open, sourceFile);
    let closeToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, closeBrace, sourceFile);
    if (!(openToken === undefined) && !(closeToken === undefined)) {
        return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, useFullStart, l);
    }
    return void 0;
}
export function rangeBetweenTokens(ctx: GoInterface | undefined, openToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, closeToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, useFullStart: bool, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let textRange = Range__from_lsproto.$zero();
    if (useFullStart) {
        textRange = LanguageService.$go$private$ls$createLspRangeFromBounds(l, Node__from_ast.Pos(openToken), Node__from_ast.End(closeToken), sourceFile);
    }
    else {
        textRange = LanguageService.$go$private$ls$createLspRangeFromBounds(l, GetStartOfNode__from_astnav(openToken, sourceFile, false), Node__from_ast.End(closeToken), sourceFile);
    }
    return createFoldingRange(ctx, Range__from_lsproto.$copy(textRange), new FoldingRangeKind__from_lsproto(""), "");
}
export function supportsCollapsedText(ctx: GoInterface | undefined): bool {
    return ((GetClientCapabilities__from_lsproto(ctx) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedClientCapabilities__from_lsproto>).value.TextDocument.FoldingRange.FoldingRange.CollapsedText;
}
export function createFoldingRange(ctx: GoInterface | undefined, textRange: Range__from_lsproto, foldingRangeKind: FoldingRangeKind__from_lsproto, collapsedText: gostring): {
    value: FoldingRange__from_lsproto;
} | undefined {
    const foldingRangeKind$location = tsonicTypeScriptRuntime.boundLocation({}, () => foldingRangeKind, foldingRangeKind$next => foldingRangeKind = foldingRangeKind$next);
    const collapsedText$location = tsonicTypeScriptRuntime.boundLocation({}, () => collapsedText, collapsedText$next => collapsedText = collapsedText$next);
    let kind: tsonicTypeScriptRuntime.Location<FoldingRangeKind__from_lsproto> | undefined = void 0;
    if (!(foldingRangeKind.$value ===
        ((void FoldingRangeKind__from_lsproto,
            "") as string))) {
        kind =
            foldingRangeKind$location;
    }
    const __gotots_field_0 = Position__from_lsproto.$storageOf(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).Start)).Line;
    const __gotots_store_1 = Position__from_lsproto.$storageOf(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).Start));
    const __gotots_field_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Character");
    const __gotots_field_2 = Position__from_lsproto.$storageOf(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).End)).Line;
    const __gotots_store_2 = Position__from_lsproto.$storageOf(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf(textRange).End));
    const __gotots_field_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Character");
    let result: {
        value: FoldingRange__from_lsproto;
    } | undefined = { value: new FoldingRange__from_lsproto(__gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, kind, void 0) };
    if (collapsedText !== "" && supportsCollapsedText(ctx)) {
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CollapsedText =
            collapsedText$location;
    }
    return result;
}
export function createFoldingRangeFromBounds(ctx: GoInterface | undefined, pos: int, end: int, foldingRangeKind: FoldingRangeKind__from_lsproto, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    return createFoldingRange(ctx, LanguageService.$go$private$ls$createLspRangeFromBounds(l, pos, end, sourceFile), foldingRangeKind, "");
}
export function functionSpan(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, l: LanguageService | undefined): {
    value: FoldingRange__from_lsproto;
} | undefined {
    let openToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = tryGetFunctionOpenToken(node, body, sourceFile);
    let closeToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(body, KindCloseBraceToken$constant__from_ast(), sourceFile);
    if (!(openToken === undefined) && !(closeToken === undefined)) {
        return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true, l);
    }
    return void 0;
}
export function tryGetFunctionOpenToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (isNodeArrayMultiLine(Node__from_ast.Parameters(node), sourceFile)) {
        let openParenToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(node, KindOpenParenToken$constant__from_ast(), sourceFile);
        if (!(openParenToken === undefined)) {
            return openParenToken;
        }
    }
    return FindChildOfKind__from_astnav(body, KindOpenBraceToken$constant__from_ast(), sourceFile);
}
export function isNodeArrayMultiLine(list: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (list.length === 0) {
        return false;
    }
    return !PositionsAreOnSameLine__from_printer(Node__from_ast.Pos(list.get(0)), Node__from_ast.End(list.get(list.length - 1)), sourceFile);
}
