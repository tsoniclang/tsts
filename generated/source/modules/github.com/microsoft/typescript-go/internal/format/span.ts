import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast, MethodDeclaration as MethodDeclaration__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeVisitor as NodeVisitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TextChange$Storage as TextChange__from_core$Storage, TextRange$Storage as TextRange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { FormatRequestKind } from "./api.js";
import type { ruleImpl } from "./rule.js";
import type { TextRangeWithKind$Storage as TextRangeWithKind__from_format$Storage } from "./scanner.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { BodyBase as BodyBase__from_ast, CanHaveModifiers as CanHaveModifiers__from_ast, Diagnostic as Diagnostic__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetNameOfDeclaration as GetNameOfDeclaration__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, HasDecorators as HasDecorators__from_ast, IsDecorator as IsDecorator__from_ast, IsModifier as IsModifier__from_ast, IsTemplateLiteralKind as IsTemplateLiteralKind__from_ast, IsTokenKind as IsTokenKind__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindAsteriskToken$constant as KindAsteriskToken$constant__from_ast, KindAtToken$constant as KindAtToken$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassKeyword$constant as KindClassKeyword$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseBracketToken$constant as KindCloseBracketToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindDecorator$constant as KindDecorator$constant__from_ast, KindElseKeyword$constant as KindElseKeyword$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionKeyword$constant as KindFunctionKeyword$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGetKeyword$constant as KindGetKeyword$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindInterfaceKeyword$constant as KindInterfaceKeyword$constant__from_ast, KindJsxClosingElement$constant as KindJsxClosingElement$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindJsxText$constant as KindJsxText$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNewLineTrivia$constant as KindNewLineTrivia$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenBracketToken$constant as KindOpenBracketToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindRegularExpressionLiteral$constant as KindRegularExpressionLiteral$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSetKeyword$constant as KindSetKeyword$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindSlashToken$constant as KindSlashToken$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, KindWhileKeyword$constant as KindWhileKeyword$constant__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeIsSynthesized as NodeIsSynthesized__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, Node as Node__from_ast, PositionIsSynthesized as PositionIsSynthesized__from_ast, SourceFile as SourceFile__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindPrecedingToken as FindPrecedingToken__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { NewTextRange as NewTextRange__from_core, TextChange as TextChange__from_core, TextRange as TextRange__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetECMAEndLinePosition as GetECMAEndLinePosition__from_scanner, GetECMALineAndByteOffsetOfPosition as GetECMALineAndByteOffsetOfPosition__from_scanner, GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, SkipTrivia as SkipTrivia__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { Filter$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FindIndex$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindIndex.js";
import { FindLast$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindLast.js";
import { LastOrNil$Named_format$TextRangeWithKind } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GetFormatCodeSettingsFromContext, GetNewLineOrDefaultFromContext } from "./api.js";
import { FormattingContext, NewFormattingContext, withTokenStart } from "./context.js";
import { FindFirstNonWhitespaceColumn, NodeWillIndentChild, ShouldIndentChildNode, argumentStartsOnSameLineAsPreviousArgument, childIsUnindentedBranchOfConditionalExpression, childStartsOnTheSameLineWithElseInIfStatement, findFirstNonWhitespaceCharacterAndColumn } from "./indent.js";
import { ruleAction, ruleActionDeleteSpace$constant, ruleFlagsCanDeleteNewLines$constant } from "./rule.js";
import { getRules } from "./rulesmap.js";
import { NewTextRangeWithKind, TextRangeWithKind, formattingScanner, tokenInfo } from "./scanner.js";
import { GetLineStartPositionForPosition, getCloseTokenForOpenToken, getOpenTokenForList, isGrammarError } from "./util.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function findEnclosingNode(r: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let find: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    find = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        let candidate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        Node__from_ast.ForEachChild(n, new Visitor__from_ast((c: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            if (!((Node__from_ast.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                return false;
            }
            if (r.ContainedBy(withTokenStart(c, sourceFile))) {
                candidate = c;
                return true;
            }
            return false;
        }));
        if (!(candidate === undefined)) {
            const __gotots_callee_4 = find;
            const __gotots_argument_10 = candidate;
            let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
            if (!(result === undefined)) {
                return result;
            }
        }
        return n;
    };
    const __gotots_callee_5 = find;
    const __gotots_store_5 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    const __gotots_argument_11 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    }));
    return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
}
export function getScanStartPosition(enclosingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, originalRange: TextRange__from_core, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    let adjusted = withTokenStart(enclosingNode, sourceFile);
    let start = adjusted.Pos();
    if (start === originalRange.Pos() && Node__from_ast.End(enclosingNode) === originalRange.End()) {
        return start;
    }
    let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, originalRange.Pos());
    if (precedingToken === undefined) {
        return Node__from_ast.Pos(enclosingNode);
    }
    if (Node__from_ast.End(precedingToken) >= originalRange.Pos()) {
        return Node__from_ast.Pos(enclosingNode);
    }
    return Node__from_ast.End(precedingToken);
}
export function getOwnOrInheritedDelta(n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: FormatCodeSettings__from_lsutil, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    let previousLine = -1;
    let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    for (; !(n === undefined);) {
        let line = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), withTokenStart(n, sourceFile).Pos());
        if (previousLine !== -1 && line !== previousLine) {
            break;
        }
        if (ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy(options), n, child, sourceFile, RuntimeSlice.nil<bool>())) {
            return options.EditorSettings.IndentSize;
        }
        previousLine = line;
        child = n;
        n = Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return 0;
}
export function rangeHasNoErrors($0: TextRange__from_core): bool {
    return false;
}
export function prepareRangeContainsErrorFunction(errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, originalRange: TextRange__from_core): (($0: TextRange__from_core) => bool) | undefined {
    if (errors.length === 0) {
        return rangeHasNoErrors;
    }
    let sorted = Filter$PointerTo_Named_ast$Diagnostic(errors, (d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): bool => {
        return originalRange.Overlaps(Diagnostic__from_ast.Loc(d));
    });
    if (sorted.length === 0) {
        return rangeHasNoErrors;
    }
    SortStableFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(sorted, (a: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): int => {
        return Diagnostic__from_ast.Pos(a) - Diagnostic__from_ast.Pos(b);
    });
    let index = 0;
    return (r: TextRange__from_core): bool => {
        for (; true;) {
            if (index >= sorted.length) {
                return false;
            }
            let err: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = sorted.get(index);
            if (r.End() <= Diagnostic__from_ast.Pos(err)) {
                return false;
            }
            if (r.Overlaps(Diagnostic__from_ast.Loc(err))) {
                return true;
            }
            index++;
        }
        return false;
    };
}
export class formatSpanWorker {
    declare private readonly $goType: void;
    public constructor(public originalRange: TextRange__from_core, public enclosingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public initialIndentation: int, public delta: int, public requestKind: FormatRequestKind, public rangeContainsError: (($0: TextRange__from_core) => bool) | undefined, public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public ctx: GoInterface | undefined, public formattingScanner: formattingScanner | undefined, public formattingContext: FormattingContext | undefined, public edits: RuntimeSlice<TextChange__from_core$Storage>, public previousRange: TextRangeWithKind, public previousRangeTriviaEnd: int, public previousParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public previousRangeStartLine: int, public childContextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public lastIndentedLine: int, public indentationOnLastIndentedLine: int, public visitor: {
        value: NodeVisitor__from_ast;
    } | undefined, public visitingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public visitingIndenter: dynamicIndenter | undefined, public visitingNodeStartLine: int, public visitingUndecoratedNodeStartLine: int, public currentRules: RuntimeSlice<ruleImpl | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$format$applyRuleEdits(w: formatSpanWorker | undefined, rule__shadow_1: ruleImpl | undefined, previousRange: TextRangeWithKind, previousStartLine: int, currentRange: TextRangeWithKind, currentStartLine: int): LineAction {
        let onLaterLine = currentStartLine !== previousStartLine;
        switch ((rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Action().$value) {
            case 1: {
                return LineActionNone$constant();
                break;
            }
            case 16: {
                if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End() !== TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentRange).Loc).Pos()) {
                    formatSpanWorker.$go$private$format$recordDelete(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End(), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentRange).Loc).Pos() - TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End());
                    if (onLaterLine) {
                        return LineActionLineRemoved$constant();
                    }
                    return LineActionNone$constant();
                }
                break;
            }
            case 32: {
                formatSpanWorker.$go$private$format$recordDelete(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).Pos(), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).Len());
                break;
            }
            case 8: {
                if (!((rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags().$value === ruleFlagsCanDeleteNewLines$constant().$value) && previousStartLine !== currentStartLine) {
                    return LineActionNone$constant();
                }
                let lineDelta = currentStartLine - previousStartLine;
                if (lineDelta !== 1) {
                    formatSpanWorker.$go$private$format$recordReplace(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End(), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentRange).Loc).Pos() - TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End(), GetNewLineOrDefaultFromContext((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx));
                    if (onLaterLine) {
                        return LineActionNone$constant();
                    }
                    return LineActionLineAdded$constant();
                }
                break;
            }
            case 4: {
                if (!((rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags().$value === ruleFlagsCanDeleteNewLines$constant().$value) && previousStartLine !== currentStartLine) {
                    return LineActionNone$constant();
                }
                let posDelta = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentRange).Loc).Pos() - TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End();
                if (posDelta !== 1 || !strings__from_gostdlib.HasPrefix(goStringSlice(SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End()), " ")) {
                    formatSpanWorker.$go$private$format$recordReplace(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End(), posDelta, " ");
                    if (onLaterLine) {
                        return LineActionLineRemoved$constant();
                    }
                    return LineActionNone$constant();
                }
                break;
            }
            case 64: {
                formatSpanWorker.$go$private$format$recordInsert(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(previousRange).Loc).End(), ";");
                break;
            }
        }
        return LineActionNone$constant();
    }
    static $go$private$format$characterToColumn(w: formatSpanWorker | undefined, startLinePosition: int, characterInLine: int): int {
        let column = 0;
        const __gotots_range_4 = characterInLine;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_index_4;
            let i = __gotots_range_value_4;
            if (goStringIndex(SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), startLinePosition + i) === 9) {
                if (((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.TabSize > 0) {
                    column += ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.TabSize - (goNumberIntegerRemainder(column, ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.TabSize));
                }
            }
            else {
                column++;
            }
        }
        return column;
    }
    static $go$private$format$computeIndentation(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, startLine: int, inheritedIndentation: int, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parentDynamicIndentation: dynamicIndenter | undefined, effectiveParentStartLine: int): [
        int,
        int
    ] {
        let indentation: int = 0;
        let delta: int = 0;
        delta = 0;
        if (ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options), node, void 0, void 0, RuntimeSlice.nil<bool>())) {
            delta = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.IndentSize;
        }
        if (effectiveParentStartLine === startLine) {
            indentation = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine;
            if (startLine !== (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastIndentedLine) {
                indentation = dynamicIndenter.$go$private$format$getIndentation(parentDynamicIndentation);
            }
            delta = globalThis.Math.min(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.IndentSize, dynamicIndenter.$go$private$format$getDelta(parentDynamicIndentation, node) + delta);
            return [indentation, delta];
        }
        else if (inheritedIndentation === -1) {
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindOpenParenToken$constant__from_ast() && startLine === (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastIndentedLine) {
                return [(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine, dynamicIndenter.$go$private$format$getDelta(parentDynamicIndentation, node)];
            }
            else if (childStartsOnTheSameLineWithElseInIfStatement(parent, node, startLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile) || childIsUnindentedBranchOfConditionalExpression(parent, node, startLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile) || argumentStartsOnSameLineAsPreviousArgument(parent, node, startLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile)) {
                return [dynamicIndenter.$go$private$format$getIndentation(parentDynamicIndentation), delta];
            }
            else {
                let i = dynamicIndenter.$go$private$format$getIndentation(parentDynamicIndentation);
                if (i === -1) {
                    return [dynamicIndenter.$go$private$format$getIndentation(parentDynamicIndentation), delta];
                }
                return [i + dynamicIndenter.$go$private$format$getDelta(parentDynamicIndentation, node), delta];
            }
        }
        return [inheritedIndentation, delta];
    }
    static $go$private$format$consumeTokenAndAdvanceScanner(w: formatSpanWorker | undefined, currentTokenInfo: tokenInfo, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dynamicIndenation: dynamicIndenter | undefined, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isListEndToken: bool): void {
        let lastTriviaWasNewLine = formattingScanner.$go$private$format$lastTrailingTriviaWasNewLine((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner);
        let indentToken = false;
        if (currentTokenInfo.leadingTrivia.length > 0) {
            formatSpanWorker.$go$private$format$processTrivia(w, currentTokenInfo.leadingTrivia, parent, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode, dynamicIndenation);
        }
        let lineAction = LineActionNone$constant();
        let isTokenInRange = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentTokenInfo.token).Loc).ContainedBy(TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange));
        const __gotots_results_3 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentTokenInfo.token).Loc).Pos());
        let tokenStartLine = __gotots_results_3[0];
        let tokenStartChar = __gotots_results_3[1];
        if (isTokenInRange) {
            const __gotots_callee_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rangeContainsError;
            const __gotots_argument_8 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentTokenInfo.token).Loc));
            let rangeHasError = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
            let savePreviousRange = TextRangeWithKind.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange);
            lineAction = formatSpanWorker.$go$private$format$processRange(w, TextRangeWithKind.$copy(currentTokenInfo.token), tokenStartLine, tokenStartChar, parent, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode, dynamicIndenation);
            if (!rangeHasError) {
                if (lineAction.$value === LineActionNone$constant().$value) {
                    if (!TextRangeWithKind.$equal(savePreviousRange, NewTextRangeWithKind(0, 0, 0))) {
                        let prevEndLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(savePreviousRange).Loc).End());
                        indentToken = lastTriviaWasNewLine && tokenStartLine !== prevEndLine;
                    }
                    else {
                        indentToken = lastTriviaWasNewLine;
                    }
                }
                else {
                    indentToken = lineAction.$value === LineActionLineAdded$constant().$value;
                }
            }
        }
        if (currentTokenInfo.trailingTrivia.length > 0) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeTriviaEnd = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(LastOrNil$Named_format$TextRangeWithKind(currentTokenInfo.trailingTrivia)).Loc).End();
            const __gotots_range_3 = currentTokenInfo.trailingTrivia;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                const __gotots_range_value_3 = TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
                let trivia = __gotots_range_value_3;
                if (isComment(TextRangeWithKind.$storageOf(trivia).Kind) && !TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(trivia).Loc).ContainedBy(TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange))) {
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeTriviaEnd = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(trivia).Loc).Pos();
                    break;
                }
            }
            formatSpanWorker.$go$private$format$processTrivia(w, currentTokenInfo.trailingTrivia, parent, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode, dynamicIndenation);
        }
        if (indentToken) {
            let tokenIndentation = -1;
            let __gotots_logical_result_0 = isTokenInRange;
            if (__gotots_logical_result_0) {
                const __gotots_callee_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rangeContainsError;
                const __gotots_argument_9 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentTokenInfo.token).Loc));
                __gotots_logical_result_0 = !(__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
            }
            if (__gotots_logical_result_0) {
                tokenIndentation = dynamicIndenter.$go$private$format$getIndentationForToken(dynamicIndenation, tokenStartLine, TextRangeWithKind.$storageOf(currentTokenInfo.token).Kind, container, !!isListEndToken);
            }
            let indentNextTokenOrTrivia = true;
            if (currentTokenInfo.leadingTrivia.length > 0) {
                let commentIndentation = dynamicIndenter.$go$private$format$getIndentationForComment(dynamicIndenation, TextRangeWithKind.$storageOf(currentTokenInfo.token).Kind, tokenIndentation, container);
                indentNextTokenOrTrivia = formatSpanWorker.$go$private$format$indentTriviaItems(w, currentTokenInfo.leadingTrivia, commentIndentation, indentNextTokenOrTrivia, (item: TextRangeWithKind): void => {
                    formatSpanWorker.$go$private$format$insertIndentation(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(item).Loc).Pos(), commentIndentation, false);
                });
            }
            if (tokenIndentation !== -1 && indentNextTokenOrTrivia) {
                formatSpanWorker.$go$private$format$insertIndentation(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentTokenInfo.token).Loc).Pos(), tokenIndentation, lineAction.$value === LineActionLineAdded$constant().$value);
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastIndentedLine = tokenStartLine;
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine = tokenIndentation;
            }
        }
        formattingScanner.$go$private$format$advance((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode = parent;
    }
    static $go$private$format$execute(w: formatSpanWorker | undefined, s: formattingScanner | undefined): RuntimeSlice<TextChange__from_core$Storage> {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner = s;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine = -1;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).lastIndentedLine = -1;
        let opt = GetFormatCodeSettingsFromContext((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext = NewFormattingContext((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).requestKind, FormatCodeSettings__from_lsutil.$copy(opt));
        const __gotots_argument_0 = (child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (child === undefined) {
                return child;
            }
            formatSpanWorker.$go$private$format$processChildNode(w, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine, child, -1, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine, false, false);
            return child;
        };
        const __gotots_struct_0 = NodeFactory__from_ast.$zero();
        const __gotots_argument_1 = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0);
        const __gotots_argument_2 = new NodeVisitorHooks__from_ast(void 0, void 0, (nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, v: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (nodes === undefined) {
                return nodes;
            }
            formatSpanWorker.$go$private$format$processChildNodes(w, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine, nodes, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter);
            return nodes;
        }, void 0, void 0, void 0, void 0, void 0, void 0);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitor = NewNodeVisitor__from_ast(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        formattingScanner.$go$private$format$advance((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner);
        if (formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner)) {
            let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), withTokenStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile).Pos());
            let undecoratedStartLine = startLine;
            if (HasDecorators__from_ast((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode)) {
                undecoratedStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), getNonDecoratorTokenPosOfNode((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile));
            }
            formatSpanWorker.$go$private$format$processNode(w, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, startLine, undecoratedStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).initialIndentation, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).delta);
        }
        let remainingTrivia = formattingScanner.$go$private$format$getCurrentLeadingTrivia((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner);
        if (remainingTrivia.length > 0) {
            let indentation = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).initialIndentation;
            if (NodeWillIndentChild(FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, void 0, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, false)) {
                indentation += opt.EditorSettings.IndentSize;
            }
            formatSpanWorker.$go$private$format$indentTriviaItems(w, remainingTrivia, indentation, true, (item: TextRangeWithKind): void => {
                const __gotots_results_0 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(item).Loc).Pos());
                let startLine = __gotots_results_0[0];
                let startChar = __gotots_results_0[1];
                formatSpanWorker.$go$private$format$processRange(w, TextRangeWithKind.$copy(item), startLine, startChar, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode, void 0);
                formatSpanWorker.$go$private$format$insertIndentation(w, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(item).Loc).Pos(), indentation, false);
            });
            if (Tristate_IsTrue__from_core(opt.EditorSettings.TrimTrailingWhitespace)) {
                formatSpanWorker.$go$private$format$trimTrailingWhitespacesForRemainingRange(w, remainingTrivia);
            }
        }
        if (!TextRangeWithKind.$equal((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange, NewTextRangeWithKind(0, 0, 0)) && formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) >= (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End()) {
            let tokenInfo__shadow_1 = TextRangeWithKind.$zero();
            if (formattingScanner.$go$private$format$isOnEOF((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner)) {
                tokenInfo__shadow_1 = formattingScanner.$go$private$format$readEOFTokenRange((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner);
            }
            else if (formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner)) {
                tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).enclosingNode).token;
            }
            if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1).Loc).Pos() === (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeTriviaEnd) {
                let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1).Loc).End());
                if (!(parent === undefined)) {
                    parent = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
                }
                if (parent === undefined) {
                    parent = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousParent;
                }
                let line = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1).Loc).Pos());
                formatSpanWorker.$go$private$format$processPair(w, TextRangeWithKind.$copy(tokenInfo__shadow_1), line, parent, TextRangeWithKind.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousParent, parent, void 0);
            }
        }
        return (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits;
    }
    static $go$private$format$executeProcessNodeVisitor(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, indenter: dynamicIndenter | undefined, nodeStartLine: int, undecoratedNodeStartLine: int): void {
        let oldNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode;
        let oldIndenter: dynamicIndenter | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter;
        let oldStart = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine;
        let oldUndecoratedStart = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode = node;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter = indenter;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine = nodeStartLine;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine = undecoratedNodeStartLine;
        Node__from_ast.VisitEachChild(node, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitor);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNode = oldNode;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingIndenter = oldIndenter;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingNodeStartLine = oldStart;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).visitingUndecoratedNodeStartLine = oldUndecoratedStart;
    }
    static $go$private$format$getDynamicIndentation(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nodeStartLine: int, indentation: int, delta: int): dynamicIndenter | undefined {
        return new dynamicIndenter(node, nodeStartLine, indentation, delta, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
    }
    static $go$private$format$getTrailingWhitespaceStartPosition(w: formatSpanWorker | undefined, start: int, end: int): int {
        let pos = end;
        let text = SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
        for (; pos >= start;) {
            const __gotots_results_9 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
            const __gotots_results_10 = [__gotots_results_9[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_9[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_10[0];
            let size = __gotots_results_10[1];
            if (size === 0) {
                pos--;
                continue;
            }
            if (!IsWhiteSpaceSingleLine__from_stringutil(ch)) {
                break;
            }
            pos--;
        }
        if (pos !== end) {
            return pos + 1;
        }
        return -1;
    }
    static $go$private$format$indentMultilineComment(w: formatSpanWorker | undefined, commentRange: TextRange__from_core, indentation: int, firstLineIsIndented: bool, indentFinalLine: bool): void {
        let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), commentRange.Pos());
        let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), commentRange.End());
        if (startLine === endLine) {
            if (!firstLineIsIndented) {
                formatSpanWorker.$go$private$format$insertIndentation(w, commentRange.Pos(), indentation, false);
            }
            return;
        }
        const __gotots_slice_build_4 = goSliceAllocate<TextRange__from_core$Storage>(0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(goStringSlice(SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), commentRange.Pos(), commentRange.End()), "\n"))));
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, TextRange__from_core.$storageOf(TextRange__from_core.$zero()));
        }
        let parts = __gotots_slice_build_4;
        let startPos = commentRange.Pos();
        for (let line = startLine; line < endLine; line++) {
            let endOfLine = GetECMAEndLinePosition__from_scanner((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, line);
            const __gotots_slice_build_6 = parts;
            const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
            let __gotots_slice_build_7 = __gotots_slice_build_6;
            if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
                __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, TextRange__from_core.$storageOf(NewTextRange__from_core(startPos, endOfLine)));
            }
            else {
                __gotots_slice_build_7 = goSliceAllocate<TextRange__from_core$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
                for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.set(__gotots_slice_build_9, TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_9)))));
                }
                __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, TextRange__from_core.$storageOf(NewTextRange__from_core(startPos, endOfLine)));
                for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                    __gotots_slice_build_7.$initialize(__gotots_slice_build_9, TextRange__from_core.$storageOf(TextRange__from_core.$zero()));
                }
            }
            parts = __gotots_slice_build_7;
            startPos = GetECMALineStarts__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile)).get(line + 1);
        }
        if (indentFinalLine) {
            const __gotots_slice_build_10 = parts;
            const __gotots_slice_build_12 = __gotots_slice_build_10.length + 1;
            let __gotots_slice_build_11 = __gotots_slice_build_10;
            if (__gotots_slice_build_12 <= __gotots_slice_build_10.capacity) {
                __gotots_slice_build_11 = __gotots_slice_build_10.$withLength(__gotots_slice_build_12);
                __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, TextRange__from_core.$storageOf(NewTextRange__from_core(startPos, commentRange.End())));
            }
            else {
                __gotots_slice_build_11 = goSliceAllocate<TextRange__from_core$Storage>(__gotots_slice_build_12, RuntimeSlice.$grownCapacity(__gotots_slice_build_10.capacity, __gotots_slice_build_12));
                for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_10.length; __gotots_slice_build_13++) {
                    __gotots_slice_build_11.set(__gotots_slice_build_13, TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(__gotots_slice_build_10.get(__gotots_slice_build_13)))));
                }
                __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, TextRange__from_core.$storageOf(NewTextRange__from_core(startPos, commentRange.End())));
                for (let __gotots_slice_build_13 = __gotots_slice_build_12; __gotots_slice_build_13 < __gotots_slice_build_11.capacity; __gotots_slice_build_13++) {
                    __gotots_slice_build_11.$initialize(__gotots_slice_build_13, TextRange__from_core.$storageOf(TextRange__from_core.$zero()));
                }
            }
            parts = __gotots_slice_build_11;
        }
        if (parts.length === 0) {
            return;
        }
        let startLinePos = GetECMALineStarts__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile)).get(startLine);
        const __gotots_results_6 = findFirstNonWhitespaceCharacterAndColumn(startLinePos, TextRange__from_core.$fromStorage(parts.get(0)).Pos(), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
        let nonWhitespaceInFirstPartCharacter = __gotots_results_6[0];
        let nonWhitespaceInFirstPartColumn = __gotots_results_6[1];
        let startIndex = 0;
        if (firstLineIsIndented) {
            startIndex = 1;
            startLine++;
        }
        let delta = indentation - nonWhitespaceInFirstPartColumn;
        for (let i = startIndex; i < parts.length; i++) {
            let startLinePos__shadow_1 = GetECMALineStarts__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile)).get(startLine);
            let nonWhitespaceCharacter = nonWhitespaceInFirstPartCharacter;
            let nonWhitespaceColumn = nonWhitespaceInFirstPartColumn;
            if (i !== 0) {
                const __gotots_results_7 = findFirstNonWhitespaceCharacterAndColumn(TextRange__from_core.$fromStorage(parts.get(i)).Pos(), TextRange__from_core.$fromStorage(parts.get(i)).End(), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
                nonWhitespaceCharacter = __gotots_results_7[0];
                nonWhitespaceColumn = __gotots_results_7[1];
            }
            let newIndentation = nonWhitespaceColumn + delta;
            if (newIndentation > 0) {
                let indentationString = getIndentationString(newIndentation, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
                formatSpanWorker.$go$private$format$recordReplace(w, startLinePos__shadow_1, nonWhitespaceCharacter, indentationString);
            }
            else {
                formatSpanWorker.$go$private$format$recordDelete(w, startLinePos__shadow_1, nonWhitespaceCharacter);
            }
            startLine++;
        }
    }
    static $go$private$format$indentTriviaItems(w: formatSpanWorker | undefined, trivia: RuntimeSlice<TextRangeWithKind__from_format$Storage>, commentIndentation: int, indentNextTokenOrTrivia: bool, indentSingleLine: (($0: TextRangeWithKind) => void) | undefined): bool {
        const __gotots_range_1 = trivia;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
            let triviaItem = __gotots_range_value_1;
            let triviaInRange = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(triviaItem).Loc).ContainedBy(TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange));
            switch (TextRangeWithKind.$storageOf(triviaItem).Kind) {
                case KindMultiLineCommentTrivia$constant__from_ast(): {
                    if (triviaInRange) {
                        formatSpanWorker.$go$private$format$indentMultilineComment(w, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(triviaItem).Loc)), commentIndentation, !indentNextTokenOrTrivia, true);
                    }
                    indentNextTokenOrTrivia = false;
                    break;
                }
                case KindSingleLineCommentTrivia$constant__from_ast(): {
                    if (indentNextTokenOrTrivia && triviaInRange) {
                        const __gotots_callee_1 = indentSingleLine;
                        const __gotots_argument_7 = TextRangeWithKind.$copy(triviaItem);
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
                    }
                    indentNextTokenOrTrivia = false;
                    break;
                }
                case KindNewLineTrivia$constant__from_ast(): {
                    indentNextTokenOrTrivia = true;
                    break;
                }
            }
        }
        return indentNextTokenOrTrivia;
    }
    static $go$private$format$indentationIsDifferent(w: formatSpanWorker | undefined, indentationString: gostring, startLinePosition: int): bool {
        let text = SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
        let end = startLinePosition + indentationString.length;
        if (end > text.length) {
            return true;
        }
        return indentationString !== goStringSlice(text, startLinePosition, end);
    }
    static $go$private$format$insertIndentation(w: formatSpanWorker | undefined, pos: int, indentation: int, lineAdded: bool): void {
        let indentationString = getIndentationString(indentation, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
        if (lineAdded) {
            formatSpanWorker.$go$private$format$recordReplace(w, pos, 0, indentationString);
        }
        else {
            const __gotots_results_2 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), pos);
            let tokenStartLine = __gotots_results_2[0];
            let tokenStartCharacter = __gotots_results_2[1];
            let startLinePosition = GetECMALineStarts__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile)).get(tokenStartLine);
            if (indentation !== formatSpanWorker.$go$private$format$characterToColumn(w, startLinePosition, tokenStartCharacter) || formatSpanWorker.$go$private$format$indentationIsDifferent(w, indentationString, startLinePosition)) {
                formatSpanWorker.$go$private$format$recordReplace(w, startLinePosition, tokenStartCharacter, indentationString);
            }
        }
    }
    static $go$private$format$processChildNode(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, indenter: dynamicIndenter | undefined, nodeStartLine: int, undecoratedNodeStartLine: int, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, inheritedIndentation: int, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parentDynamicIndentation: dynamicIndenter | undefined, parentStartLine: int, undecoratedParentStartLine: int, isListItem: bool, isFirstListItem: bool): int {
        Assert__from_debug(!NodeIsSynthesized__from_ast(child), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        if (NodeIsMissing__from_ast(child) || isGrammarError(parent, child) || !((Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return inheritedIndentation;
        }
        let childStartPos = GetTokenPosOfNode__from_scanner(child, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, false);
        let childStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), childStartPos);
        let undecoratedChildStartLine = childStartLine;
        if (HasDecorators__from_ast(child)) {
            undecoratedChildStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), getNonDecoratorTokenPosOfNode(child, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile));
        }
        let childIndentationAmount = -1;
        if (isListItem && TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange))) {
            childIndentationAmount = formatSpanWorker.$go$private$format$tryComputeIndentationForListItem(w, childStartPos, Node__from_ast.End(child), parentStartLine, TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange), inheritedIndentation);
            if (childIndentationAmount !== -1) {
                inheritedIndentation = childIndentationAmount;
            }
        }
        if (!(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Overlaps(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)))) {
            if (Node__from_ast.End(child) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Pos()) {
                const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner;
                const __gotots_store_0 = Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                const __gotots_argument_3 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                    return TextRange__from_core.$fromStorage($go$storage);
                }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                    return TextRange__from_core.$storageOf($go$value);
                });
                formattingScanner.$go$private$format$skipToEndOf(__gotots_receiver_0, __gotots_argument_3);
            }
            return inheritedIndentation;
        }
        if (TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).Len() === 0) {
            return inheritedIndentation;
        }
        for (; formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) && formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End();) {
            let tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, node);
            if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).End() > (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End()) {
                return inheritedIndentation;
            }
            if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).End() > childStartPos) {
                if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).Pos() > childStartPos) {
                    const __gotots_receiver_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner;
                    const __gotots_store_1 = Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value);
                    const __gotots_argument_4 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                        return TextRange__from_core.$fromStorage($go$storage);
                    }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                        return TextRange__from_core.$storageOf($go$value);
                    });
                    formattingScanner.$go$private$format$skipToStartOf(__gotots_receiver_1, __gotots_argument_4);
                }
                break;
            }
            formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), node, parentDynamicIndentation, node, false);
        }
        if (!formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) || formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) >= (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End()) {
            return inheritedIndentation;
        }
        if (IsTokenKind__from_ast(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
            let tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, child);
            if (!(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJsxText$constant__from_ast())) {
                Assert__from_debug(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).End() === TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).End(), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("Token end is child end")]));
                formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), node, parentDynamicIndentation, child, false);
                return inheritedIndentation;
            }
        }
        let effectiveParentStartLine = undecoratedParentStartLine;
        if (Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDecorator$constant__from_ast()) {
            effectiveParentStartLine = childStartLine;
        }
        const __gotots_results_1 = formatSpanWorker.$go$private$format$computeIndentation(w, child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine);
        let childIndentation = __gotots_results_1[0];
        let delta = __gotots_results_1[1];
        formatSpanWorker.$go$private$format$processNode(w, child, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode, childStartLine, undecoratedChildStartLine, childIndentation, delta);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode = node;
        if (isFirstListItem && Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayLiteralExpression$constant__from_ast() && inheritedIndentation === -1) {
            inheritedIndentation = childIndentation;
        }
        return inheritedIndentation;
    }
    static $go$private$format$processChildNodes(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, indenter: dynamicIndenter | undefined, nodeStartLine: int, undecoratedNodeStartLine: int, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parentStartLine: int, parentDynamicIndentation: dynamicIndenter | undefined): void {
        Assert__from_debug(!(nodes === undefined), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        Assert__from_debug(!PositionIsSynthesized__from_ast(NodeList__from_ast.Pos(nodes)), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        Assert__from_debug(!PositionIsSynthesized__from_ast(NodeList__from_ast.End(nodes)), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        let listStartToken = getOpenTokenForList(parent, nodes);
        let listDynamicIndentation: dynamicIndenter | undefined = parentDynamicIndentation;
        let startLine = parentStartLine;
        if (!(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Overlaps(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)))) {
            if (NodeList__from_ast.End(nodes) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Pos() && (NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0 || (Node__from_ast.$storageOf(((NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                const __gotots_receiver_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner;
                const __gotots_store_2 = NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value);
                const __gotots_argument_5 = tsonicTypeScriptRuntime.projectLocation<TextRange__from_core$Storage, TextRange__from_core>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Loc"), ($go$storage: TextRange__from_core$Storage): TextRange__from_core => {
                    return TextRange__from_core.$fromStorage($go$storage);
                }, ($go$value: TextRange__from_core): TextRange__from_core$Storage => {
                    return TextRange__from_core.$storageOf($go$value);
                });
                formattingScanner.$go$private$format$skipToEndOf(__gotots_receiver_2, __gotots_argument_5);
            }
            return;
        }
        if (!(listStartToken === KindUnknown$constant__from_ast())) {
            for (; formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) && formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End();) {
                let tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, parent);
                if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).End() > NodeList__from_ast.Pos(nodes)) {
                    break;
                }
                else if (TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Kind === listStartToken) {
                    startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).Pos());
                    formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), parent, parentDynamicIndentation, parent, false);
                    let indentationOnListStartToken = 0;
                    if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine !== -1) {
                        indentationOnListStartToken = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentationOnLastIndentedLine;
                    }
                    else {
                        let startLinePosition = GetLineStartPositionForPosition(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).Pos(), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
                        indentationOnListStartToken = FindFirstNonWhitespaceColumn(startLinePosition, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).Pos(), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
                    }
                    listDynamicIndentation = formatSpanWorker.$go$private$format$getDynamicIndentation(w, parent, parentStartLine, indentationOnListStartToken, ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.IndentSize);
                }
                else {
                    formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), parent, parentDynamicIndentation, parent, false);
                }
            }
        }
        let inheritedIndentation = -1;
        const __gotots_range_0 = NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            let i = __gotots_range_value_0;
            let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
            inheritedIndentation = formatSpanWorker.$go$private$format$processChildNode(w, node, indenter, nodeStartLine, undecoratedNodeStartLine, child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, true, i === 0);
        }
        let listEndToken = getCloseTokenForOpenToken(listStartToken);
        if (!(listEndToken === KindUnknown$constant__from_ast()) && formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) && formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End()) {
            let tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, parent);
            if (TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Kind === KindCommaToken$constant__from_ast()) {
                formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), parent, listDynamicIndentation, parent, false);
                if (formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner)) {
                    tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, parent);
                }
                else {
                    return;
                }
            }
            if (TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Kind === listEndToken && TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)))) {
                formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), parent, listDynamicIndentation, parent, true);
            }
        }
    }
    static $go$private$format$processNode(w: formatSpanWorker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nodeStartLine: int, undecoratedNodeStartLine: int, indentation: int, delta: int): void {
        if (!(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Overlaps(withTokenStart(node, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile))) {
            return;
        }
        let nodeDynamicIndentation: dynamicIndenter | undefined = formatSpanWorker.$go$private$format$getDynamicIndentation(w, node, nodeStartLine, indentation, delta);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).childContextNode = contextNode;
        formatSpanWorker.$go$private$format$executeProcessNodeVisitor(w, node, nodeDynamicIndentation, nodeStartLine, undecoratedNodeStartLine);
        for (; formattingScanner.$go$private$format$isOnToken((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) && formattingScanner.$go$private$format$getTokenFullStart((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner) < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End();) {
            let tokenInfo__shadow_1 = formattingScanner.$go$private$format$readTokenInfo((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingScanner, node);
            if (TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(tokenInfo__shadow_1.token).Loc).End() > globalThis.Math.min(Node__from_ast.End(node), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End())) {
                break;
            }
            formatSpanWorker.$go$private$format$consumeTokenAndAdvanceScanner(w, tokenInfo.$copy(tokenInfo__shadow_1), node, nodeDynamicIndentation, node, false);
        }
    }
    static $go$private$format$processPair(w: formatSpanWorker | undefined, currentItem: TextRangeWithKind, currentStartLine: int, currentParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, previousItem: TextRangeWithKind, previousStartLine: int, previousParent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dynamicIndentation: dynamicIndenter | undefined): LineAction {
        FormattingContext.UpdateContext((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext, TextRangeWithKind.$copy(previousItem), previousParent, TextRangeWithKind.$copy(currentItem), currentParent, contextNode);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules.slice(0, 0, null);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules = getRules((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules);
        let trimTrailingWhitespaces = !Tristate_IsFalse__from_core(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.TrimTrailingWhitespace);
        let lineAction = LineActionNone$constant();
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules.length > 0) {
            for (let i = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules.length - 1; i >= 0; i--) {
                let rule__shadow_1: ruleImpl | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentRules.get(i);
                lineAction = formatSpanWorker.$go$private$format$applyRuleEdits(w, rule__shadow_1, TextRangeWithKind.$copy(previousItem), previousStartLine, TextRangeWithKind.$copy(currentItem), currentStartLine);
                if (!(dynamicIndentation === undefined)) {
                    switch (lineAction.$value) {
                        case 2: {
                            if (GetTokenPosOfNode__from_scanner(currentParent, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, false) === TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentItem).Loc).Pos()) {
                                dynamicIndenter.$go$private$format$recomputeIndentation(dynamicIndentation, false, contextNode);
                            }
                            break;
                        }
                        case 1: {
                            if (GetTokenPosOfNode__from_scanner(currentParent, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, false) === TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(currentItem).Loc).Pos()) {
                                dynamicIndenter.$go$private$format$recomputeIndentation(dynamicIndentation, true, contextNode);
                            }
                            break;
                        }
                        default: {
                            Assert__from_debug(lineAction.$value === LineActionNone$constant().$value, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                            break;
                        }
                    }
                }
                trimTrailingWhitespaces = trimTrailingWhitespaces && (((void ruleAction,
                    (rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Action().$value & ruleActionDeleteSpace$constant().$value) as number)
                    ===
                        ((void ruleAction,
                            0) as number)) && !((rule__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Flags().$value === ruleFlagsCanDeleteNewLines$constant().$value);
            }
        }
        else {
            trimTrailingWhitespaces = trimTrailingWhitespaces && !(TextRangeWithKind.$storageOf(currentItem).Kind === KindEndOfFile$constant__from_ast());
        }
        if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
            formatSpanWorker.$go$private$format$trimTrailingWhitespacesForLines(w, previousStartLine, currentStartLine, TextRangeWithKind.$copy(previousItem));
        }
        return lineAction;
    }
    static $go$private$format$processRange(w: formatSpanWorker | undefined, r: TextRangeWithKind, rangeStartLine: int, rangeStartCharacter: int, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dynamicIndentation: dynamicIndenter | undefined): LineAction {
        const __gotots_callee_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).rangeContainsError;
        const __gotots_argument_6 = TextRange__from_core.$copy(TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(r).Loc));
        let rangeHasError = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
        let lineAction = LineActionNone$constant();
        if (!rangeHasError) {
            if (TextRangeWithKind.$equal((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange, NewTextRangeWithKind(0, 0, 0))) {
                let originalStartLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Pos());
                formatSpanWorker.$go$private$format$trimTrailingWhitespacesForLines(w, originalStartLine, rangeStartLine, NewTextRangeWithKind(0, 0, 0));
            }
            else {
                lineAction = formatSpanWorker.$go$private$format$processPair(w, TextRangeWithKind.$copy(r), rangeStartLine, parent, TextRangeWithKind.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeStartLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousParent, contextNode, dynamicIndentation);
            }
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange = TextRangeWithKind.$copy(r);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeTriviaEnd = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(r).Loc).End();
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousParent = parent;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRangeStartLine = rangeStartLine;
        return lineAction;
    }
    static $go$private$format$processTrivia(w: formatSpanWorker | undefined, trivia: RuntimeSlice<TextRangeWithKind__from_format$Storage>, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, contextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, dynamicIndentation: dynamicIndenter | undefined): void {
        const __gotots_range_5 = trivia;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_5 = TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_range_5.get(__gotots_range_index_5)));
            let triviaItem = __gotots_range_value_5;
            if (isComment(TextRangeWithKind.$storageOf(triviaItem).Kind) && TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(triviaItem).Loc).ContainedBy(TextRange__from_core.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange))) {
                const __gotots_results_8 = GetECMALineAndByteOffsetOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(triviaItem).Loc).Pos());
                let triviaItemStartLine = __gotots_results_8[0];
                let triviaItemStartCharacter = __gotots_results_8[1];
                formatSpanWorker.$go$private$format$processRange(w, TextRangeWithKind.$copy(triviaItem), triviaItemStartLine, triviaItemStartCharacter, parent, contextNode, dynamicIndentation);
            }
        }
    }
    static $go$private$format$recordDelete(w: formatSpanWorker | undefined, start: int, length: int): void {
        if (length !== 0) {
            const __gotots_slice_build_14 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits;
            const __gotots_slice_build_16 = __gotots_slice_build_14.length + 1;
            let __gotots_slice_build_15 = __gotots_slice_build_14;
            if (__gotots_slice_build_16 <= __gotots_slice_build_14.capacity) {
                __gotots_slice_build_15 = __gotots_slice_build_14.$withLength(__gotots_slice_build_16);
                __gotots_slice_build_15.set(__gotots_slice_build_14.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, length, "")));
            }
            else {
                __gotots_slice_build_15 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_16, RuntimeSlice.$grownCapacity(__gotots_slice_build_14.capacity, __gotots_slice_build_16));
                for (let __gotots_slice_build_17 = 0; __gotots_slice_build_17 < __gotots_slice_build_14.length; __gotots_slice_build_17++) {
                    __gotots_slice_build_15.set(__gotots_slice_build_17, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_14.get(__gotots_slice_build_17)))));
                }
                __gotots_slice_build_15.set(__gotots_slice_build_14.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, length, "")));
                for (let __gotots_slice_build_17 = __gotots_slice_build_16; __gotots_slice_build_17 < __gotots_slice_build_15.capacity; __gotots_slice_build_17++) {
                    __gotots_slice_build_15.$initialize(__gotots_slice_build_17, TextChange__from_core.$storageOf(TextChange__from_core.$zero()));
                }
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits = __gotots_slice_build_15;
        }
    }
    static $go$private$format$recordInsert(w: formatSpanWorker | undefined, start: int, text: gostring): void {
        if (text !== "") {
            const __gotots_slice_build_18 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits;
            const __gotots_slice_build_20 = __gotots_slice_build_18.length + 1;
            let __gotots_slice_build_19 = __gotots_slice_build_18;
            if (__gotots_slice_build_20 <= __gotots_slice_build_18.capacity) {
                __gotots_slice_build_19 = __gotots_slice_build_18.$withLength(__gotots_slice_build_20);
                __gotots_slice_build_19.set(__gotots_slice_build_18.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, 0, text)));
            }
            else {
                __gotots_slice_build_19 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_20, RuntimeSlice.$grownCapacity(__gotots_slice_build_18.capacity, __gotots_slice_build_20));
                for (let __gotots_slice_build_21 = 0; __gotots_slice_build_21 < __gotots_slice_build_18.length; __gotots_slice_build_21++) {
                    __gotots_slice_build_19.set(__gotots_slice_build_21, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_18.get(__gotots_slice_build_21)))));
                }
                __gotots_slice_build_19.set(__gotots_slice_build_18.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, 0, text)));
                for (let __gotots_slice_build_21 = __gotots_slice_build_20; __gotots_slice_build_21 < __gotots_slice_build_19.capacity; __gotots_slice_build_21++) {
                    __gotots_slice_build_19.$initialize(__gotots_slice_build_21, TextChange__from_core.$storageOf(TextChange__from_core.$zero()));
                }
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits = __gotots_slice_build_19;
        }
    }
    static $go$private$format$recordReplace(w: formatSpanWorker | undefined, start: int, length: int, newText: gostring): void {
        if (length !== 0 || newText !== "") {
            const __gotots_slice_build_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, length, newText)));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<TextChange__from_core$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, TextChange__from_core.$storageOf(TextChange__from_core.$copy(TextChange__from_core.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, TextChange__from_core.$storageOf(createTextChangeFromStartLength(start, length, newText)));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, TextChange__from_core.$storageOf(TextChange__from_core.$zero()));
                }
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).edits = __gotots_slice_build_1;
        }
    }
    static $go$private$format$trimTrailingWhitespacesForLines(w: formatSpanWorker | undefined, line1: int, line2: int, r: TextRangeWithKind): void {
        let lineStarts = GetECMALineStarts__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile));
        for (let line = line1; line < line2; line++) {
            let lineStartPosition = lineStarts.get(line);
            let lineEndPosition = GetECMAEndLinePosition__from_scanner((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, line);
            if (!TextRangeWithKind.$equal(r, NewTextRangeWithKind(0, 0, 0)) && (isComment(TextRangeWithKind.$storageOf(r).Kind) || isStringOrRegularExpressionOrTemplateLiteral(TextRangeWithKind.$storageOf(r).Kind)) && TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(r).Loc).Pos() <= lineEndPosition && TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(r).Loc).End() > lineEndPosition) {
                continue;
            }
            let whitespaceStart = formatSpanWorker.$go$private$format$getTrailingWhitespaceStartPosition(w, lineStartPosition, lineEndPosition);
            if (whitespaceStart !== -1) {
                if (whitespaceStart !== lineStartPosition) {
                    const __gotots_results_4 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(SourceFile__from_ast.Text((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), whitespaceStart - 1));
                    const __gotots_results_5 = [__gotots_results_4[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_4[1]))] satisfies [
                        int32,
                        int
                    ];
                    let r__shadow_1 = __gotots_results_5[0];
                    Assert__from_debug(!IsWhiteSpaceSingleLine__from_stringutil(r__shadow_1), RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                }
                formatSpanWorker.$go$private$format$recordDelete(w, whitespaceStart, lineEndPosition + 1 - whitespaceStart);
            }
        }
    }
    static $go$private$format$trimTrailingWhitespacesForRemainingRange(w: formatSpanWorker | undefined, trivias: RuntimeSlice<TextRangeWithKind__from_format$Storage>): void {
        let startPos = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.Pos();
        if (!TextRangeWithKind.$equal((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange, NewTextRangeWithKind(0, 0, 0))) {
            startPos = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange).Loc).End();
        }
        const __gotots_range_2 = trivias;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = TextRangeWithKind.$copy(TextRangeWithKind.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
            let trivia = __gotots_range_value_2;
            if (isComment(TextRangeWithKind.$storageOf(trivia).Kind)) {
                if (startPos < TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(trivia).Loc).Pos()) {
                    formatSpanWorker.$go$private$format$trimTrailingWitespacesForPositions(w, startPos, TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(trivia).Loc).Pos() - 1, TextRangeWithKind.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange));
                }
                startPos = TextRange__from_core.$fromStorage(TextRangeWithKind.$storageOf(trivia).Loc).End() + 1;
            }
        }
        if (startPos < (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End()) {
            formatSpanWorker.$go$private$format$trimTrailingWitespacesForPositions(w, startPos, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).originalRange.End(), TextRangeWithKind.$copy((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).previousRange));
        }
    }
    static $go$private$format$trimTrailingWitespacesForPositions(w: formatSpanWorker | undefined, startPos: int, endPos: int, previousRange: TextRangeWithKind): void {
        let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), startPos);
        let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), endPos);
        formatSpanWorker.$go$private$format$trimTrailingWhitespacesForLines(w, startLine, endLine + 1, TextRangeWithKind.$copy(previousRange));
    }
    static $go$private$format$tryComputeIndentationForListItem(w: formatSpanWorker | undefined, startPos: int, endPos: int, parentStartLine: int, r: TextRange__from_core, inheritedIndentation: int): int {
        let r2 = NewTextRange__from_core(startPos, endPos);
        if (r.Overlaps(TextRange__from_core.$copy(r2)) || r2.ContainedBy(TextRange__from_core.$copy(r))) {
            if (inheritedIndentation !== -1) {
                return inheritedIndentation;
            }
        }
        else {
            let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), startPos);
            let startLinePosition = GetLineStartPositionForPosition(startPos, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
            let column = FindFirstNonWhitespaceColumn(startLinePosition, startPos, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, FormatCodeSettings__from_lsutil.$copy(((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options));
            if (startLine !== parentStartLine || startPos === column) {
                let baseIndentSize = ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formattingContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Options.EditorSettings.BaseIndentSize;
                if (baseIndentSize > column) {
                    return baseIndentSize;
                }
                return column;
            }
        }
        return -1;
    }
}
export function newFormatSpanWorker(ctx: GoInterface | undefined, originalRange: TextRange__from_core, enclosingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, initialIndentation: int, delta: int, requestKind: FormatRequestKind, rangeContainsError: (($0: TextRange__from_core) => bool) | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): formatSpanWorker | undefined {
    return new formatSpanWorker(TextRange__from_core.$copy(originalRange), enclosingNode, initialIndentation, delta, requestKind, rangeContainsError, sourceFile, ctx, void 0, void 0, RuntimeSlice.nil<TextChange__from_core$Storage>(), TextRangeWithKind.$zero(), 0, void 0, 0, void 0, 0, 0, void 0, void 0, void 0, 0, 0, RuntimeSlice.make<ruleImpl | undefined>(0, 32, void 0));
}
export function getNonDecoratorTokenPosOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    let lastDecorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (HasDecorators__from_ast(node)) {
        lastDecorator = FindLast$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node), IsDecorator__from_ast);
    }
    if (file === undefined) {
        file = GetSourceFileOfNode__from_ast(node);
    }
    if (lastDecorator === undefined) {
        return withTokenStart(node, file).Pos();
    }
    return SkipTrivia__from_scanner(SourceFile__from_ast.Text(file), Node__from_ast.End(lastDecorator));
}
export class LineAction {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function LineActionNone$constant(): LineAction {
    return new LineAction(0);
}
export function LineActionLineAdded$constant(): LineAction {
    return new LineAction(1);
}
export function LineActionLineRemoved$constant(): LineAction {
    return new LineAction(2);
}
export function isStringOrRegularExpressionOrTemplateLiteral(kind: Kind__from_ast): bool {
    return kind === KindStringLiteral$constant__from_ast() || kind === KindRegularExpressionLiteral$constant__from_ast() || IsTemplateLiteralKind__from_ast(kind);
}
export function isComment(kind: Kind__from_ast): bool {
    return kind === KindSingleLineCommentTrivia$constant__from_ast() || kind === KindMultiLineCommentTrivia$constant__from_ast();
}
export function getIndentationString(indentation: int, options: FormatCodeSettings__from_lsutil): gostring {
    if (!Tristate_IsTrue__from_core(options.EditorSettings.ConvertTabsToSpaces)) {
        if (options.EditorSettings.TabSize === 0) {
            return "";
        }
        let tabs = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(math__from_gostdlib.Floor(indentation / options.EditorSettings.TabSize))));
        let spaces = indentation - (tabs * options.EditorSettings.TabSize);
        let res = strings__from_gostdlib.Repeat("\t", BigInt.asIntN(64, goNumberToBigInt(tabs)));
        if (spaces > 0) {
            res = res + strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(spaces)));
        }
        return res;
    }
    else {
        return strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(indentation)));
    }
}
export function createTextChangeFromStartLength(start: int, length: int, newText: gostring): TextChange__from_core {
    return TextChange__from_core.$fromStorage({
        NewText: newText,
        TextRange: TextRange__from_core.$storageOf(NewTextRange__from_core(start, start + length))
    });
}
export class dynamicIndenter {
    declare private readonly $goType: void;
    public constructor(public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public nodeStartLine: int, public indentation: int, public delta: int, public options: FormatCodeSettings__from_lsutil, public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$format$getDelta(i: dynamicIndenter | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        if (NodeWillIndentChild(FormatCodeSettings__from_lsutil.$copy((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options), (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, child, (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, true)) {
            return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).delta;
        }
        return 0;
    }
    static $go$private$format$getIndentation(i: dynamicIndenter | undefined): int {
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentation;
    }
    static $go$private$format$getIndentationForComment(i: dynamicIndenter | undefined, kind: Kind__from_ast, tokenIndentation: int, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        switch (kind) {
            case KindCloseBraceToken$constant__from_ast():
            case KindCloseBracketToken$constant__from_ast():
            case KindCloseParenToken$constant__from_ast(): {
                return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentation + dynamicIndenter.$go$private$format$getDelta(i, container);
                break;
            }
        }
        if (tokenIndentation !== -1) {
            return tokenIndentation;
        }
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentation;
    }
    static $go$private$format$getIndentationForToken(i: dynamicIndenter | undefined, line: int, kind: Kind__from_ast, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, suppressDelta: bool): int {
        if (!suppressDelta && dynamicIndenter.$go$private$format$shouldAddDelta(i, line, kind, container)) {
            return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentation + dynamicIndenter.$go$private$format$getDelta(i, container);
        }
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).indentation;
    }
    static $go$private$format$recomputeIndentation(i: dynamicIndenter | undefined, lineAdded: bool, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options), parent, (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, RuntimeSlice.nil<bool>())) {
            if (lineAdded) {
                const __gotots_store_3 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_3.indentation = __gotots_store_3.indentation + (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.EditorSettings.IndentSize;
            }
            else {
                const __gotots_store_4 = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                __gotots_store_4.indentation = __gotots_store_4.indentation - (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.EditorSettings.IndentSize;
            }
            if (ShouldIndentChildNode(FormatCodeSettings__from_lsutil.$copy((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options), (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, void 0, void 0, RuntimeSlice.nil<bool>())) {
                (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).delta = (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.EditorSettings.IndentSize;
            }
            else {
                (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).delta = 0;
            }
        }
    }
    static $go$private$format$shouldAddDelta(i: dynamicIndenter | undefined, line: int, kind: Kind__from_ast, container: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        switch (kind) {
            case KindOpenBraceToken$constant__from_ast():
            case KindCloseBraceToken$constant__from_ast():
            case KindCloseParenToken$constant__from_ast():
            case KindElseKeyword$constant__from_ast():
            case KindWhileKeyword$constant__from_ast():
            case KindAtToken$constant__from_ast(): {
                return false;
                break;
            }
            case KindSlashToken$constant__from_ast():
            case KindGreaterThanToken$constant__from_ast(): {
                switch (Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                    case KindJsxOpeningElement$constant__from_ast():
                    case KindJsxClosingElement$constant__from_ast():
                    case KindJsxSelfClosingElement$constant__from_ast(): {
                        return false;
                        break;
                    }
                }
                break;
                break;
            }
            case KindOpenBracketToken$constant__from_ast():
            case KindCloseBracketToken$constant__from_ast(): {
                if (!(Node__from_ast.$storageOf(((container ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMappedType$constant__from_ast())) {
                    return false;
                }
                break;
                break;
            }
        }
        return (i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodeStartLine !== line && !(HasDecorators__from_ast((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node) && kind === getFirstNonDecoratorTokenOfNode((i ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node));
    }
}
export function getFirstNonDecoratorTokenOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Kind__from_ast {
    if (CanHaveModifiers__from_ast(node)) {
        let modifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node).slice(FindIndex$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node), IsDecorator__from_ast), null, null), IsModifier__from_ast);
        if (!(modifier === undefined)) {
            return Node__from_ast.$storageOf(((modifier ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        }
    }
    {
        const __gotots_switch_tag_0 = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                __gotots_switch_match_0 = __gotots_switch_tag_0 === KindClassDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = __gotots_switch_tag_0 === KindInterfaceDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_2 = false;
            if (!__gotots_switch_match_2) {
                __gotots_switch_match_2 = __gotots_switch_tag_0 === KindFunctionDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_2) {
                __gotots_switch_selection_0 = 2;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_3 = false;
            if (!__gotots_switch_match_3) {
                __gotots_switch_match_3 = __gotots_switch_tag_0 === KindEnumDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_3) {
                __gotots_switch_selection_0 = 3;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_4 = false;
            if (!__gotots_switch_match_4) {
                __gotots_switch_match_4 = __gotots_switch_tag_0 === KindGetAccessor$constant__from_ast();
            }
            if (__gotots_switch_match_4) {
                __gotots_switch_selection_0 = 4;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_5 = false;
            if (!__gotots_switch_match_5) {
                __gotots_switch_match_5 = __gotots_switch_tag_0 === KindSetAccessor$constant__from_ast();
            }
            if (__gotots_switch_match_5) {
                __gotots_switch_selection_0 = 5;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_6 = false;
            if (!__gotots_switch_match_6) {
                __gotots_switch_match_6 = __gotots_switch_tag_0 === KindMethodDeclaration$constant__from_ast();
            }
            if (__gotots_switch_match_6) {
                __gotots_switch_selection_0 = 6;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_7 = false;
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindPropertyDeclaration$constant__from_ast();
            }
            if (!__gotots_switch_match_7) {
                __gotots_switch_match_7 = __gotots_switch_tag_0 === KindParameter$constant__from_ast();
            }
            if (__gotots_switch_match_7) {
                __gotots_switch_selection_0 = 7;
            }
        }
        __gotots_control_target_0: {
            if (__gotots_switch_selection_0 === 0) {
                return KindClassKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 1) {
                return KindInterfaceKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 2) {
                return KindFunctionKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 3) {
                return KindEnumDeclaration$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 4) {
                return KindGetKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 5) {
                return KindSetKeyword$constant__from_ast();
                break __gotots_control_target_0;
            }
            if (__gotots_switch_selection_0 === 6) {
                if (!(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsMethodDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken === undefined)) {
                    return KindAsteriskToken$constant__from_ast();
                }
                __gotots_switch_selection_0 = 7;
            }
            if (__gotots_switch_selection_0 === 7) {
                let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetNameOfDeclaration__from_ast(node);
                if (!(name === undefined)) {
                    return Node__from_ast.$storageOf(((name ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind;
                }
                break __gotots_control_target_0;
            }
        }
    }
    return KindUnknown$constant__from_ast();
}
