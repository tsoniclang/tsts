import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ImportClause as ImportClause__from_ast, Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { bool, int, int32 } from "@gotots/runtime/scalars.js";
import { CommentRange as CommentRange__from_ast, ConditionalExpression as ConditionalExpression__from_ast, FindAncestor as FindAncestor__from_ast, IfStatement as IfStatement__from_ast, IsCallExpression as IsCallExpression__from_ast, IsDeclaration as IsDeclaration__from_ast, IsNewExpression as IsNewExpression__from_ast, IsStatementButNotDeclaration as IsStatementButNotDeclaration__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAwaitExpression$constant as KindAwaitExpression$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCaseBlock$constant as KindCaseBlock$constant__from_ast, KindCaseClause$constant as KindCaseClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConditionalExpression$constant as KindConditionalExpression$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDefaultClause$constant as KindDefaultClause$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIfStatement$constant as KindIfStatement$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJSDocTemplateTag$constant as KindJSDocTemplateTag$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxClosingFragment$constant as KindJsxClosingFragment$constant__from_ast, KindJsxElement$constant as KindJsxElement$constant__from_ast, KindJsxExpression$constant as KindJsxExpression$constant__from_ast, KindJsxFragment$constant as KindJsxFragment$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxOpeningFragment$constant as KindJsxOpeningFragment$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindObjectBindingPattern$constant as KindObjectBindingPattern$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTryStatement$constant as KindTryStatement$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableDeclarationList$constant as KindVariableDeclarationList$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, KindWhileStatement$constant as KindWhileStatement$constant__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindNextToken as FindNextToken__from_astnav, FindPrecedingTokenEx as FindPrecedingTokenEx__from_astnav, FindPrecedingToken as FindPrecedingToken__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav, GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core, Tristate_IsTrueOrUnknown as Tristate_IsTrueOrUnknown__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil, IndentStyleBlock$constant as IndentStyleBlock$constant__from_lsutil, IndentStyleNone$constant as IndentStyleNone$constant__from_lsutil, PositionBelongsToNode as PositionBelongsToNode__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetECMALineAndByteOffsetOfPosition as GetECMALineAndByteOffsetOfPosition__from_scanner, GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, GetECMAPositionOfLineAndByteOffset as GetECMAPositionOfLineAndByteOffset__from_scanner, GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner, Scanner as Scanner__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { ConcatenateSeq$Named_ast$CommentRange } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/ConcatenateSeq.js";
import { FindIndex$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindIndex.js";
import { FirstOrNil$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNil.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { isStringOrRegularExpressionOrTemplateLiteral } from "./span.js";
import { GetLineStartPositionForPosition, rangeIsOnOneLine } from "./util.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function GetIndentationForNode(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, ignoreActualIndentationRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    const __gotots_results_12 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), GetTokenPosOfNode__from_scanner(n, sourceFile, false));
    let startline = __gotots_results_12[0];
    let startpos = __gotots_results_12[1];
    return getIndentationForNodeWorker(n, startline, startpos, ignoreActualIndentationRange, 0, sourceFile, false, FormatCodeSettings__from_lsutil.$copy(options));
}
export function GetIndentation(position: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil, assumeNewLineBeforeCloseBrace: bool): int {
    if (position > SourceFile__from_ast.Text(sourceFile).length) {
        return options.EditorSettings.BaseIndentSize;
    }
    if (options.EditorSettings.IndentStyle.$value === IndentStyleNone$constant__from_lsutil().$value) {
        return 0;
    }
    let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingTokenEx__from_astnav(sourceFile, position, void 0, true);
    let enclosingCommentRange: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = getRangeOfEnclosingComment(sourceFile, position, precedingToken);
    if (!(enclosingCommentRange === undefined) && CommentRange__from_ast.$storageOf(((enclosingCommentRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).Kind === KindMultiLineCommentTrivia$constant__from_ast()) {
        return getCommentIndent(sourceFile, position, FormatCodeSettings__from_lsutil.$copy(options), enclosingCommentRange);
    }
    if (precedingToken === undefined) {
        return options.EditorSettings.BaseIndentSize;
    }
    if (isStringOrRegularExpressionOrTemplateLiteral(Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        let tokenStart = GetTokenPosOfNode__from_scanner(precedingToken, sourceFile, false);
        if (tokenStart <= position && position < Node__from_ast.End(precedingToken)) {
            return 0;
        }
    }
    let lineAtPosition = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), position);
    let currentToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, position);
    let isObjectLiteral = Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOpenBraceToken$constant__from_ast() && !(Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast();
    if (options.EditorSettings.IndentStyle.$value === IndentStyleBlock$constant__from_lsutil().$value || isObjectLiteral) {
        return getBlockIndent(sourceFile, position, FormatCodeSettings__from_lsutil.$copy(options));
    }
    if (Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast() && !(Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && !(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast())) {
        let actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
        if (actualIndentation !== -1) {
            return actualIndentation;
        }
    }
    let containerList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getListByPosition(position, Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile);
    if (!(containerList === undefined) && !TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((containerList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)))) {
        let useTheSameBaseIndentation = !(Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindFunctionExpression$constant__from_ast() || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((currentToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast());
        let indentSize = 0;
        if (!useTheSameBaseIndentation) {
            indentSize = options.EditorSettings.IndentSize;
        }
        let res = getActualIndentationForListStartLine(containerList, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
        if (res === -1) {
            return indentSize;
        }
        return res + indentSize;
    }
    return getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, FormatCodeSettings__from_lsutil.$copy(options));
}
export function getCommentIndent(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, options: FormatCodeSettings__from_lsutil, enclosingCommentRange: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined): int {
    let previousLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), position) - 1;
    let commentStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((enclosingCommentRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).Pos());
    Assert__from_debug(commentStartLine >= 0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("commentStartLine >= 0")]));
    if (previousLine <= commentStartLine) {
        let lineStarts__shadow_1 = GetECMALineStarts__from_scanner(new GoInterfaceAdapter(sourceFile));
        return FindFirstNonWhitespaceColumn(lineStarts__shadow_1.get(commentStartLine), position, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
    }
    let lineStarts = GetECMALineStarts__from_scanner(new GoInterfaceAdapter(sourceFile));
    let startPositionOfLine = lineStarts.get(previousLine);
    const __gotots_results_3 = findFirstNonWhitespaceCharacterAndColumn(startPositionOfLine, position, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
    let character = __gotots_results_3[0];
    let column = __gotots_results_3[1];
    if (column === 0) {
        return column;
    }
    let firstNonWhitespaceCharacterCode = goStringIndex(SourceFile__from_ast.Text(sourceFile), startPositionOfLine + character);
    if (firstNonWhitespaceCharacterCode === 42) {
        return column - 1;
    }
    return column;
}
export function getLeadingCommentRangesOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): iter__from_gostdlib.Seq<CommentRange__from_ast> {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast()) {
        return named_iter.IterSeqValueOperations.$wrap(void 0);
    }
    const __gotots_struct_1 = NodeFactory__from_ast.$zero();
    const __gotots_argument_3 = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_1);
    const __gotots_argument_4 = SourceFile__from_ast.Text(file);
    const __gotots_argument_5 = Node__from_ast.Pos(node);
    return GetLeadingCommentRanges__from_scanner(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
}
export function getRangeOfEnclosingComment(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined {
    let tokenAtPosition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, position);
    let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(tokenAtPosition, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.IsJSDoc($argument0);
    });
    if (!(jsdoc === undefined)) {
        tokenAtPosition = Node__from_ast.$storageOf(((jsdoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    let tokenStart = GetStartOfNode__from_astnav(tokenAtPosition, sourceFile, false);
    if (tokenStart <= position && position < Node__from_ast.End(tokenAtPosition)) {
        return void 0;
    }
    let trailingRangesOfPreviousToken: iter__from_gostdlib.Seq<CommentRange__from_ast> = named_iter.IterSeqValueOperations.$wrap(void 0);
    if (!(precedingToken === undefined)) {
        const __gotots_struct_0 = NodeFactory__from_ast.$zero();
        const __gotots_argument_0 = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0);
        const __gotots_argument_1 = SourceFile__from_ast.Text(sourceFile);
        const __gotots_argument_2 = Node__from_ast.End(precedingToken);
        trailingRangesOfPreviousToken = GetTrailingCommentRanges__from_scanner(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
    }
    let leadingRangesOfNextToken: iter__from_gostdlib.Seq<CommentRange__from_ast> = getLeadingCommentRangesOfNode(tokenAtPosition, sourceFile);
    let commentRanges: iter__from_gostdlib.Seq<CommentRange__from_ast> = ConcatenateSeq$Named_ast$CommentRange(RuntimeSlice.literal<iter__from_gostdlib.Seq<CommentRange__from_ast>>([trailingRangesOfPreviousToken, leadingRangesOfNextToken]));
    const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(commentRanges);
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    let __gotots_range_return_0: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = void 0;
    __gotots_range_0(($argument0: CommentRange__from_ast): bool => {
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
        const __gotots_range_value_0 = CommentRange__from_ast.$copy($argument0);
        let commentRange = __gotots_range_value_0;
        const commentRange$location = tsonicTypeScriptRuntime.boundLocation({}, () => commentRange, commentRange$next => commentRange = commentRange$next);
        if (TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).ContainsExclusive(position) || position === TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).End() && (CommentRange__from_ast.$storageOf(commentRange).Kind === KindSingleLineCommentTrivia$constant__from_ast() || position === SourceFile__from_ast.Text(sourceFile).length)) {
            __gotots_range_return_0 =
                commentRange$location;
            __gotots_range_state_0 = 2;
            return false;
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
    return void 0;
}
export function getBlockIndent(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, options: FormatCodeSettings__from_lsutil): int {
    let current = position;
    for (; current > 0;) {
        const __gotots_results_4 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(SourceFile__from_ast.Text(sourceFile), current));
        const __gotots_results_5 = [__gotots_results_4[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_4[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_5[0];
        let size = __gotots_results_5[1];
        if (!IsWhiteSpaceLike__from_stringutil(ch)) {
            break;
        }
        current = current - size;
    }
    let lineStart = GetLineStartPositionForPosition(current, sourceFile);
    return FindFirstNonWhitespaceColumn(lineStart, current, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
}
export function getActualIndentationForListItemBeforeComma(commaToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    if (Node__from_ast.$storageOf(((commaToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return -1;
    }
    let containingList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList(commaToken, sourceFile);
    if (containingList === undefined) {
        return -1;
    }
    let commaIndex = FindIndex$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation(n, commaToken);
    });
    if (commaIndex > 0) {
        return deriveActualIndentationFromList(containingList, commaIndex - 1, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
    }
    return -1;
}
export class nextTokenKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function nextTokenKindUnknown$constant(): nextTokenKind {
    return new nextTokenKind(0);
}
export function nextTokenKindOpenBrace$constant(): nextTokenKind {
    return new nextTokenKind(1);
}
export function nextTokenKindCloseBrace$constant(): nextTokenKind {
    return new nextTokenKind(2);
}
export function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lineAtPosition: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): nextTokenKind {
    let nextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindNextToken__from_astnav(precedingToken, current, sourceFile);
    if (nextToken === undefined) {
        return nextTokenKindUnknown$constant();
    }
    if (Node__from_ast.$storageOf(((nextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOpenBraceToken$constant__from_ast()) {
        return nextTokenKindOpenBrace$constant();
    }
    else if (Node__from_ast.$storageOf(((nextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCloseBraceToken$constant__from_ast()) {
        let nextTokenStartLine = getStartLineForNode(nextToken, sourceFile);
        if (lineAtPosition === nextTokenStartLine) {
            return nextTokenKindCloseBrace$constant();
        }
        return nextTokenKindUnknown$constant();
    }
    return nextTokenKindUnknown$constant();
}
export function getSmartIndent(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, lineAtPosition: int, assumeNewLineBeforeCloseBrace: bool, options: FormatCodeSettings__from_lsutil): int {
    let previous: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = precedingToken;
    for (; !(current === undefined);) {
        if (PositionBelongsToNode__from_lsutil(current, position, sourceFile) && ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy(options), current, previous, sourceFile, RuntimeSlice.literal<bool>([true]))) {
            const __gotots_results_7 = getStartLineAndCharacterForNode(current, sourceFile);
            let currentStartLine = __gotots_results_7[0];
            let currentStartChar = __gotots_results_7[1];
            let ntk = nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile);
            let indentationDelta = 0;
            if (!(ntk.$value === nextTokenKindUnknown$constant().$value)) {
                if (assumeNewLineBeforeCloseBrace && ntk.$value === nextTokenKindCloseBrace$constant().$value) {
                    indentationDelta = options.EditorSettings.IndentSize;
                }
            }
            else {
                if (lineAtPosition !== currentStartLine) {
                    indentationDelta = options.EditorSettings.IndentSize;
                }
            }
            return getIndentationForNodeWorker(current, currentStartLine, currentStartChar, void 0, indentationDelta, sourceFile, true, FormatCodeSettings__from_lsutil.$copy(options));
        }
        let actualIndentation = getActualIndentationForListItem(current, sourceFile, FormatCodeSettings__from_lsutil.$copy(options), true);
        if (actualIndentation !== -1) {
            return actualIndentation;
        }
        previous = current;
        current = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return options.EditorSettings.BaseIndentSize;
}
export function getIndentationForNodeWorker(current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, currentStartLine: int, currentStartCharacter: int, ignoreActualIndentationRange: tsonicTypeScriptRuntime.Location<TextRange__from_core> | undefined, indentationDelta: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, isNextChild: bool, options: FormatCodeSettings__from_lsutil): int {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    for (; !(parent === undefined);) {
        let useActualIndentation = true;
        if (!(ignoreActualIndentationRange === undefined)) {
            let start = GetTokenPosOfNode__from_scanner(current, sourceFile, false);
            useActualIndentation = start < ((ignoreActualIndentationRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.Pos() || start > ((ignoreActualIndentationRange ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TextRange__from_core>).value.End();
        }
        const __gotots_results_10 = getContainingListOrParentStart(parent, current, sourceFile);
        let containingListOrParentStartLine = __gotots_results_10[0];
        let containingListOrParentStartCharacter = __gotots_results_10[1];
        let parentAndChildShareLine = containingListOrParentStartLine === currentStartLine || childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStartLine, sourceFile);
        if (useActualIndentation) {
            let firstListChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            let containerList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList(current, sourceFile);
            if (!(containerList === undefined)) {
                firstListChild = FirstOrNil$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((containerList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            }
            let listIndentsChild = false;
            if (!(firstListChild === undefined)) {
                let listLine = getStartLineForNode(firstListChild, sourceFile);
                listIndentsChild = listLine > containingListOrParentStartLine;
            }
            let actualIndentation = getActualIndentationForListItem(current, sourceFile, FormatCodeSettings__from_lsutil.$copy(options), listIndentsChild);
            if (actualIndentation !== -1) {
                return actualIndentation + indentationDelta;
            }
            actualIndentation = getActualIndentationForNode(current, parent, currentStartLine, currentStartCharacter, parentAndChildShareLine, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
            if (actualIndentation !== -1) {
                return actualIndentation + indentationDelta;
            }
        }
        if (ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy(options), parent, current, sourceFile, RuntimeSlice.literal<bool>([isNextChild])) && !parentAndChildShareLine) {
            indentationDelta += options.EditorSettings.IndentSize;
        }
        let useTrueStart = isArgumentAndStartLineOverlapsExpressionBeingCalled(parent, current, currentStartLine, sourceFile);
        current = parent;
        parent = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        if (useTrueStart) {
            const __gotots_results_11 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), GetTokenPosOfNode__from_scanner(current, sourceFile, false));
            currentStartLine = __gotots_results_11[0];
            currentStartCharacter = __gotots_results_11[1];
        }
        else {
            currentStartLine = containingListOrParentStartLine;
            currentStartCharacter = containingListOrParentStartCharacter;
        }
    }
    return indentationDelta + options.EditorSettings.BaseIndentSize;
}
export function getActualIndentationForNode(current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, cuurentLine: int, currentChar: int, parentAndChildShareLine: bool, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    let useActualIndentation = (IsDeclaration__from_ast(current) || IsStatementButNotDeclaration__from_ast(current)) && (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast() || !parentAndChildShareLine);
    if (!useActualIndentation) {
        return -1;
    }
    return findColumnForFirstNonWhitespaceCharacterInLine(cuurentLine, currentChar, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
}
export function isArgumentAndStartLineOverlapsExpressionBeingCalled(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, childStartLine: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (!(IsCallExpression__from_ast(parent) && Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Node__from_ast.Arguments(parent), child))) {
        return false;
    }
    let expressionOfCallExpressionEnd = Node__from_ast.End(Node__from_ast.Expression(parent));
    let expressionOfCallExpressionEndLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), expressionOfCallExpressionEnd);
    return expressionOfCallExpressionEndLine === childStartLine;
}
export function getActualIndentationForListItem(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil, listIndentsChild: bool): int {
    if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclarationList$constant__from_ast()) {
        return -1;
    }
    let containingList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList(node, sourceFile);
    if (!(containingList === undefined)) {
        let index = FindIndex$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(e, node);
        });
        if (index !== -1) {
            let result = deriveActualIndentationFromList(containingList, index, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
            if (result !== -1) {
                return result;
            }
        }
        let delta = 0;
        if (listIndentsChild) {
            delta = options.EditorSettings.IndentSize;
        }
        let res = getActualIndentationForListStartLine(containingList, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
        if (res === -1) {
            return delta;
        }
        return res + delta;
    }
    return -1;
}
export function getActualIndentationForListStartLine(list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    if (list === undefined) {
        return -1;
    }
    const __gotots_results_6 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc).Pos());
    let line = __gotots_results_6[0];
    let char = __gotots_results_6[1];
    return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
}
export function deriveActualIndentationFromList(list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, index: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    Assert__from_debug(!(list === undefined) && index >= 0 && index < NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, RuntimeSlice.nil<GoInterface | undefined>());
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index);
    const __gotots_results_8 = getStartLineAndCharacterForNode(node, sourceFile);
    let line = __gotots_results_8[0];
    let char = __gotots_results_8[1];
    for (let i = index; i >= 0; i--) {
        if (Node__from_ast.$storageOf(((NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            continue;
        }
        let prevEndLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), Node__from_ast.End(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i)));
        if (prevEndLine !== line) {
            return findColumnForFirstNonWhitespaceCharacterInLine(line, char, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
        }
        const __gotots_results_9 = getStartLineAndCharacterForNode(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i), sourceFile);
        line = __gotots_results_9[0];
        char = __gotots_results_9[1];
    }
    return -1;
}
export function findColumnForFirstNonWhitespaceCharacterInLine(line: int, char: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    let lineStart = GetECMAPositionOfLineAndByteOffset__from_scanner(new GoInterfaceAdapter(sourceFile), line, 0);
    return FindFirstNonWhitespaceColumn(lineStart, lineStart + char, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
}
export function FindFirstNonWhitespaceColumn(startPos: int, endPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): int {
    const __gotots_results_0 = findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, FormatCodeSettings__from_lsutil.$copy(options));
    let col = __gotots_results_0[1];
    return col;
}
export function findFirstNonWhitespaceCharacterAndColumn(startPos: int, endPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: FormatCodeSettings__from_lsutil): [
    int,
    int
] {
    let character: int = 0;
    let column: int = 0;
    column = 0;
    let text = SourceFile__from_ast.Text(sourceFile);
    let pos = startPos;
    for (; pos < endPos;) {
        const __gotots_results_1 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
        const __gotots_results_2 = [__gotots_results_1[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_1[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_2[0];
        let size = __gotots_results_2[1];
        if (!IsWhiteSpaceSingleLine__from_stringutil(ch)) {
            break;
        }
        if (ch === 9) {
            if (options.EditorSettings.TabSize > 0) {
                column += options.EditorSettings.TabSize + (goNumberIntegerRemainder(column, options.EditorSettings.TabSize));
            }
        }
        else {
            column++;
        }
        pos += size;
    }
    return [pos - startPos, column];
}
export function childStartsOnTheSameLineWithElseInIfStatement(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, childStartLine: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindIfStatement$constant__from_ast() &&
        tsonicTypeScriptRuntime.sameLocation(IfStatement__from_ast.$storageOf(((Node__from_ast.AsIfStatement(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IfStatement__from_ast>).value).ElseStatement, child)) {
        let elseKeyword: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(child));
        Assert__from_debug(!(elseKeyword === undefined), RuntimeSlice.nil<GoInterface | undefined>());
        let elseKeywordStartLine = getStartLineForNode(elseKeyword, sourceFile);
        return elseKeywordStartLine === childStartLine;
    }
    return false;
}
export function getStartLineAndCharacterForNode(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    int,
    int
] {
    let line: int = 0;
    let character: int = 0;
    return GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), GetTokenPosOfNode__from_scanner(n, sourceFile, false));
}
export function getStartLineForNode(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    return GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), GetTokenPosOfNode__from_scanner(n, sourceFile, false));
}
export function GetContainingList(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
        return void 0;
    }
    return getListByRange(GetTokenPosOfNode__from_scanner(node, sourceFile, false), Node__from_ast.End(node), Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile);
}
export function getListByPosition(pos: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    return getListByRange(pos, pos, node, sourceFile);
}
export function getListByRange(start: int, end: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    let r = NewTextRange__from_core(start, end);
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeReference$constant__from_ast(): {
            return getList(Node__from_ast.TypeArgumentList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindObjectLiteralExpression$constant__from_ast(): {
            return getList(Node__from_ast.PropertyList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindArrayLiteralExpression$constant__from_ast(): {
            return getList(Node__from_ast.ElementList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindTypeLiteral$constant__from_ast(): {
            return getList(Node__from_ast.MemberList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindCallSignature$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindConstructorType$constant__from_ast():
        case KindConstructSignature$constant__from_ast(): {
            let tpl: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getList(Node__from_ast.TypeParameterList(node), TextRange__from_core.$copy(r), node, sourceFile);
            if (!(tpl === undefined)) {
                return tpl;
            }
            return getList(Node__from_ast.ParameterList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindGetAccessor$constant__from_ast(): {
            return getList(Node__from_ast.ParameterList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSDocTemplateTag$constant__from_ast(): {
            return getList(Node__from_ast.TypeParameterList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindNewExpression$constant__from_ast():
        case KindCallExpression$constant__from_ast(): {
            let l: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getList(Node__from_ast.TypeArgumentList(node), TextRange__from_core.$copy(r), node, sourceFile);
            if (!(l === undefined)) {
                return l;
            }
            return getList(Node__from_ast.ArgumentList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindVariableDeclarationList$constant__from_ast(): {
            return getList(VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations, TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
        case KindObjectBindingPattern$constant__from_ast():
        case KindArrayBindingPattern$constant__from_ast():
        case KindNamedImports$constant__from_ast():
        case KindNamedExports$constant__from_ast(): {
            return getList(Node__from_ast.ElementList(node), TextRange__from_core.$copy(r), node, sourceFile);
            break;
        }
    }
    return void 0;
}
export function getList(list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, r: TextRange__from_core, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (list === undefined) {
        return void 0;
    }
    if (r.ContainedBy(getVisualListRange(node, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)), sourceFile))) {
        return list;
    }
    return void 0;
}
export function getVisualListRange(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, list: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): TextRange__from_core {
    let prior: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, list.Pos());
    let priorEnd = 0;
    if (prior === undefined) {
        priorEnd = list.Pos();
    }
    else {
        priorEnd = Node__from_ast.End(prior);
    }
    let scan: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, list.End());
    let nextStart = 0;
    if (Scanner__from_scanner.Token(scan) === KindEndOfFile$constant__from_ast()) {
        nextStart = list.End();
    }
    else {
        nextStart = Scanner__from_scanner.TokenStart(scan);
    }
    return NewTextRange__from_core(priorEnd, nextStart);
}
export function getContainingListOrParentStart(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
    int,
    int
] {
    let line: int = 0;
    let character: int = 0;
    let containingList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList(child, sourceFile);
    let startPos = 0;
    if (!(containingList === undefined)) {
        startPos = TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc).Pos();
    }
    else {
        startPos = GetTokenPosOfNode__from_scanner(parent, sourceFile, false);
    }
    return GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), startPos);
}
export function isControlFlowEndingStatement(kind: Kind__from_ast, parentKind: Kind__from_ast): bool {
    switch (kind) {
        case KindReturnStatement$constant__from_ast():
        case KindThrowStatement$constant__from_ast():
        case KindContinueStatement$constant__from_ast():
        case KindBreakStatement$constant__from_ast(): {
            return !(parentKind === KindBlock$constant__from_ast());
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function ShouldIndentChildNode(settings: FormatCodeSettings__from_lsutil, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, isNextChildArg: RuntimeSlice<bool>): bool {
    let isNextChild = false;
    if (isNextChildArg.length > 0) {
        isNextChild = isNextChildArg.get(0);
    }
    return NodeWillIndentChild(FormatCodeSettings__from_lsutil.$copy(settings), parent, child, sourceFile, false) && !(isNextChild && !(child === undefined) && isControlFlowEndingStatement(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
}
export function NodeWillIndentChild(settings: FormatCodeSettings__from_lsutil, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, indentByDefault: bool): bool {
    let childKind = KindUnknown$constant__from_ast();
    if (!(child === undefined)) {
        childKind = Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
    }
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindExpressionStatement$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindArrayLiteralExpression$constant__from_ast():
        case KindBlock$constant__from_ast():
        case KindModuleBlock$constant__from_ast():
        case KindObjectLiteralExpression$constant__from_ast():
        case KindTypeLiteral$constant__from_ast():
        case KindMappedType$constant__from_ast():
        case KindTupleType$constant__from_ast():
        case KindParenthesizedExpression$constant__from_ast():
        case KindPropertyAccessExpression$constant__from_ast():
        case KindCallExpression$constant__from_ast():
        case KindNewExpression$constant__from_ast():
        case KindVariableStatement$constant__from_ast():
        case KindExportAssignment$constant__from_ast():
        case KindReturnStatement$constant__from_ast():
        case KindConditionalExpression$constant__from_ast():
        case KindArrayBindingPattern$constant__from_ast():
        case KindObjectBindingPattern$constant__from_ast():
        case KindJsxOpeningElement$constant__from_ast():
        case KindJsxOpeningFragment$constant__from_ast():
        case KindJsxSelfClosingElement$constant__from_ast():
        case KindJsxExpression$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindCallSignature$constant__from_ast():
        case KindConstructSignature$constant__from_ast():
        case KindParameter$constant__from_ast():
        case KindFunctionType$constant__from_ast():
        case KindConstructorType$constant__from_ast():
        case KindParenthesizedType$constant__from_ast():
        case KindTaggedTemplateExpression$constant__from_ast():
        case KindAwaitExpression$constant__from_ast():
        case KindNamedExports$constant__from_ast():
        case KindNamedImports$constant__from_ast():
        case KindExportSpecifier$constant__from_ast():
        case KindImportSpecifier$constant__from_ast():
        case KindPropertyDeclaration$constant__from_ast():
        case KindCaseClause$constant__from_ast():
        case KindDefaultClause$constant__from_ast(): {
            return true;
            break;
        }
        case KindCaseBlock$constant__from_ast(): {
            return Tristate_IsTrueOrUnknown__from_core(settings.IndentSwitchCase);
            break;
        }
        case KindVariableDeclaration$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindBinaryExpression$constant__from_ast(): {
            if (Tristate_IsFalseOrUnknown__from_core(settings.IndentMultiLineObjectLiteralBeginningOnBlankLine) && !(sourceFile === undefined) && childKind === KindObjectLiteralExpression$constant__from_ast()) {
                return rangeIsOnOneLine(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), sourceFile);
            }
            if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast() && !(sourceFile === undefined) && childKind === KindJsxElement$constant__from_ast()) {
                let parentStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(parent)));
                let childStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), SkipTrivia__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(child)));
                return parentStartLine !== childStartLine;
            }
            if (!(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBinaryExpression$constant__from_ast())) {
                return true;
            }
            return indentByDefault;
            break;
        }
        case KindDoStatement$constant__from_ast():
        case KindWhileStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast():
        case KindForOfStatement$constant__from_ast():
        case KindForStatement$constant__from_ast():
        case KindIfStatement$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindConstructor$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            return !(childKind === KindBlock$constant__from_ast());
            break;
        }
        case KindArrowFunction$constant__from_ast(): {
            if (!(sourceFile === undefined) && childKind === KindParenthesizedExpression$constant__from_ast()) {
                return rangeIsOnOneLine(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), sourceFile);
            }
            return !(childKind === KindBlock$constant__from_ast());
            break;
        }
        case KindExportDeclaration$constant__from_ast(): {
            return !(childKind === KindNamedExports$constant__from_ast());
            break;
        }
        case KindImportDeclaration$constant__from_ast(): {
            return !(childKind === KindImportClause$constant__from_ast()) || (!((Node__from_ast.AsImportClause(child) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && !(Node__from_ast.$storageOf((((Node__from_ast.AsImportClause(child) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()));
            break;
        }
        case KindJsxElement$constant__from_ast(): {
            return !(childKind === KindJsxClosingElement$constant__from_ast());
            break;
        }
        case KindJsxFragment$constant__from_ast(): {
            return !(childKind === KindJsxClosingFragment$constant__from_ast());
            break;
        }
        case KindIntersectionType$constant__from_ast():
        case KindUnionType$constant__from_ast():
        case KindSatisfiesExpression$constant__from_ast(): {
            if (childKind === KindTypeLiteral$constant__from_ast() || childKind === KindTupleType$constant__from_ast() || childKind === KindMappedType$constant__from_ast()) {
                return false;
            }
            return indentByDefault;
            break;
        }
        case KindTryStatement$constant__from_ast(): {
            if (childKind === KindBlock$constant__from_ast()) {
                return false;
            }
            return indentByDefault;
            break;
        }
    }
    return indentByDefault;
}
export function childIsUnindentedBranchOfConditionalExpression(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, childStartLine: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindConditionalExpression$constant__from_ast() && (tsonicTypeScriptRuntime.sameLocation(child, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue)
        ||
            tsonicTypeScriptRuntime.sameLocation(child, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenFalse))) {
        let conditionEndLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), Node__from_ast.End(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).Condition));
        if (tsonicTypeScriptRuntime.sameLocation(child, ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue)) {
            return childStartLine === conditionEndLine;
        }
        else {
            let trueStartLine = getStartLineForNode(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue, sourceFile);
            let trueEndLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), Node__from_ast.End(ConditionalExpression__from_ast.$storageOf(((Node__from_ast.AsConditionalExpression(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ConditionalExpression__from_ast>).value).WhenTrue));
            return conditionEndLine === trueStartLine && trueEndLine === childStartLine;
        }
    }
    return false;
}
export function argumentStartsOnSameLineAsPreviousArgument(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, childStartLine: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (IsCallExpression__from_ast(parent) || IsNewExpression__from_ast(parent)) {
        if (Node__from_ast.Arguments(parent).length === 0) {
            return false;
        }
        let currentIndex = FindIndex$PointerTo_Named_ast$Node(Node__from_ast.Arguments(parent), (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return tsonicTypeScriptRuntime.sameLocation(n, child);
        });
        if (currentIndex === -1) {
            return false;
        }
        if (currentIndex === 0) {
            return false;
        }
        let previousNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Arguments(parent).get(currentIndex - 1);
        let lineOfPreviousNode = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), Node__from_ast.End(previousNode));
        if (childStartLine === lineOfPreviousNode) {
            return true;
        }
    }
    return false;
}
