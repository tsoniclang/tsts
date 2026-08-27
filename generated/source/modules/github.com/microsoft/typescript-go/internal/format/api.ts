import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node$Storage as Node__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageVariant as LanguageVariant__from_core, TextChange$Storage as TextChange__from_core$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil, GetDefaultFormatCodeSettings as GetDefaultFormatCodeSettings__from_lsutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { GetECMAEndLinePosition as GetECMAEndLinePosition__from_scanner, GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsLineBreak as IsLineBreak__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $goInterfaceAdapter$Named_lsutil$FormatCodeSettings, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_format$formatContextKey as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { GetIndentationForNode } from "./indent.js";
import { newFormattingScanner } from "./scanner.js";
import { findEnclosingNode, getOwnOrInheritedDelta, getScanStartPosition, newFormatSpanWorker, prepareRangeContainsErrorFunction } from "./span.js";
import { GetLineStartPositionForPosition, findImmediatelyPrecedingTokenOfKind, findOutermostNodeWithinListLevel } from "./util.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export class FormatRequestKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function FormatRequestKindFormatDocument$constant(): FormatRequestKind {
    return new FormatRequestKind(0);
}
export function FormatRequestKindFormatSelection$constant(): FormatRequestKind {
    return new FormatRequestKind(1);
}
export function FormatRequestKindFormatOnEnter$constant(): FormatRequestKind {
    return new FormatRequestKind(2);
}
export function FormatRequestKindFormatOnSemicolon$constant(): FormatRequestKind {
    return new FormatRequestKind(3);
}
export function FormatRequestKindFormatOnOpeningCurlyBrace$constant(): FormatRequestKind {
    return new FormatRequestKind(4);
}
export function FormatRequestKindFormatOnClosingCurlyBrace$constant(): FormatRequestKind {
    return new FormatRequestKind(5);
}
export class formatContextKey {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function formatOptionsKey$constant(): formatContextKey {
    return new formatContextKey(0);
}
export function formatNewlineKey$constant(): formatContextKey {
    return new formatContextKey(1);
}
export function WithFormatCodeSettings(ctx: GoInterface | undefined, options: FormatCodeSettings__from_lsutil, newLine: gostring): GoInterface | undefined {
    const __gotots_argument_2 = ctx;
    const __gotots_argument_3 = new GoInterfaceAdapter(formatOptionsKey$constant());
    const __gotots_argument_4 = new $goInterfaceAdapter$Named_lsutil$FormatCodeSettings(FormatCodeSettings__from_lsutil.$copy(options));
    ctx = GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_2), __gotots_argument_3, __gotots_argument_4));
    const __gotots_argument_5 = ctx;
    const __gotots_argument_6 = new GoInterfaceAdapter(formatNewlineKey$constant());
    const __gotots_argument_7 = new $goInterfaceAdapter$string(newLine);
    ctx = GoProviderProfileBridge.$from(provider_context.ContextWithValueDirect(GoProviderProfileBridge.$to(__gotots_argument_5), __gotots_argument_6, __gotots_argument_7));
    return ctx;
}
export function GetFormatCodeSettingsFromContext(ctx: GoInterface | undefined): FormatCodeSettings__from_lsutil {
    {
        const __gotots_receiver_0 = ctx;
        const __gotots_argument_0 = new GoInterfaceAdapter(formatOptionsKey$constant());
        let opt: $goInterface$Interface_void | undefined = goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Value(__gotots_argument_0);
        if (!(opt === undefined)) {
            return FormatCodeSettings__from_lsutil.$copy((($value: $goInterface$Interface_void | undefined): FormatCodeSettings__from_lsutil => {
                if (!$goInterfaceAdapter$Named_lsutil$FormatCodeSettings.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return FormatCodeSettings__from_lsutil.$copy($value.$go$value);
            })(opt));
        }
    }
    return GetDefaultFormatCodeSettings__from_lsutil();
}
export function GetNewLineOrDefaultFromContext(ctx: GoInterface | undefined): gostring {
    let opt = GetFormatCodeSettingsFromContext(ctx);
    if (opt.EditorSettings.NewLineCharacter.length > 0) {
        return opt.EditorSettings.NewLineCharacter;
    }
    const __gotots_receiver_1 = ctx;
    const __gotots_argument_1 = new GoInterfaceAdapter(formatNewlineKey$constant());
    let host = (($value: $goInterface$Interface_void | undefined): gostring => {
        if (!$goInterfaceAdapter$string.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Value(__gotots_argument_1));
    if (host.length > 0) {
        return host;
    }
    return "\n";
}
export function FormatSpan(ctx: GoInterface | undefined, span: TextRange__from_core, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, kind: FormatRequestKind): RuntimeSlice<TextChange__from_core$Storage> {
    const span$location = tsonicTypeScriptRuntime.boundLocation({}, () => span, span$next => span = span$next);
    let enclosingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findEnclosingNode(TextRange__from_core.$copy(span), file);
    let opts = GetFormatCodeSettingsFromContext(ctx);
    return newFormattingScanner(SourceFile__from_ast.Text(file), ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant, getScanStartPosition(enclosingNode, TextRange__from_core.$copy(span), file), span.End(), newFormatSpanWorker(ctx, TextRange__from_core.$copy(span), enclosingNode, GetIndentationForNode(enclosingNode, span$location, file, FormatCodeSettings__from_lsutil.$copy(opts)), getOwnOrInheritedDelta(enclosingNode, FormatCodeSettings__from_lsutil.$copy(opts), file), kind, prepareRangeContainsErrorFunction(SourceFile__from_ast.Diagnostics(file), TextRange__from_core.$copy(span)), file));
}
export function FormatNodeGivenIndentation(ctx: GoInterface | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, languageVariant: LanguageVariant__from_core, initialIndentation: int, delta: int): RuntimeSlice<TextChange__from_core$Storage> {
    let textRange = NewTextRange__from_core(Node__from_ast.Pos(node), Node__from_ast.End(node));
    return newFormattingScanner(SourceFile__from_ast.Text(file), languageVariant, textRange.Pos(), textRange.End(), newFormatSpanWorker(ctx, TextRange__from_core.$copy(textRange), node, initialIndentation, delta, FormatRequestKindFormatSelection$constant(), ($0: TextRange__from_core): bool => {
        return false;
    }, file));
}
export function formatNodeLines(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, requestKind: FormatRequestKind): RuntimeSlice<TextChange__from_core$Storage> {
    if (node === undefined) {
        return RuntimeSlice.nil<TextChange__from_core$Storage>();
    }
    let tokenStart = GetTokenPosOfNode__from_scanner(node, sourceFile, false);
    let lineStart = GetLineStartPositionForPosition(tokenStart, sourceFile);
    let span = NewTextRange__from_core(lineStart, Node__from_ast.End(node));
    return FormatSpan(ctx, TextRange__from_core.$copy(span), sourceFile, requestKind);
}
export function FormatDocument(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<TextChange__from_core$Storage> {
    const __gotots_argument_10 = ctx;
    const __gotots_argument_8 = 0;
    const __gotots_store_0 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    const __gotots_argument_9 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
        return Node__from_ast.$fromStorage($go$storage);
    }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
        return Node__from_ast.$storageOf($go$value);
    }));
    const __gotots_argument_11 = NewTextRange__from_core(__gotots_argument_8, __gotots_argument_9);
    const __gotots_argument_12 = sourceFile;
    const __gotots_argument_13 = FormatRequestKindFormatDocument$constant();
    return FormatSpan(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
}
export function FormatSelection(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, start: int, end: int): RuntimeSlice<TextChange__from_core$Storage> {
    return FormatSpan(ctx, NewTextRange__from_core(GetLineStartPositionForPosition(start, sourceFile), end), sourceFile, FormatRequestKindFormatSelection$constant());
}
export function FormatOnOpeningCurly(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): RuntimeSlice<TextChange__from_core$Storage> {
    let openingCurly: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findImmediatelyPrecedingTokenOfKind(position, KindOpenBraceToken$constant__from_ast(), sourceFile);
    if (openingCurly === undefined) {
        return RuntimeSlice.nil<TextChange__from_core$Storage>();
    }
    let curlyBraceRange: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((openingCurly ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    let outermostNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findOutermostNodeWithinListLevel(curlyBraceRange);
    let textRange = NewTextRange__from_core(GetLineStartPositionForPosition(GetTokenPosOfNode__from_scanner(outermostNode, sourceFile, false), sourceFile), position);
    return FormatSpan(ctx, TextRange__from_core.$copy(textRange), sourceFile, FormatRequestKindFormatOnOpeningCurlyBrace$constant());
}
export function FormatOnClosingCurly(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): RuntimeSlice<TextChange__from_core$Storage> {
    let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findImmediatelyPrecedingTokenOfKind(position, KindCloseBraceToken$constant__from_ast(), sourceFile);
    return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(precedingToken), FormatRequestKindFormatOnClosingCurlyBrace$constant());
}
export function FormatOnSemicolon(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): RuntimeSlice<TextChange__from_core$Storage> {
    let semicolon: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = findImmediatelyPrecedingTokenOfKind(position, KindSemicolonToken$constant__from_ast(), sourceFile);
    return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(semicolon), FormatRequestKindFormatOnSemicolon$constant());
}
export function FormatOnEnter(ctx: GoInterface | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): RuntimeSlice<TextChange__from_core$Storage> {
    let line = GetECMALineOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), position);
    if (line === 0) {
        return RuntimeSlice.nil<TextChange__from_core$Storage>();
    }
    let startPos = GetECMALineStarts__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile)).get(line - 1);
    let endOfFormatSpan = GetECMAEndLinePosition__from_scanner(sourceFile, line);
    for (; endOfFormatSpan > startPos;) {
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(SourceFile__from_ast.Text(sourceFile), endOfFormatSpan));
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let ch__shadow_1 = __gotots_results_1[0];
        let s = __gotots_results_1[1];
        if (s === 0 || IsWhiteSpaceSingleLine__from_stringutil(ch__shadow_1)) {
            endOfFormatSpan--;
            continue;
        }
        break;
    }
    const __gotots_results_2 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(SourceFile__from_ast.Text(sourceFile), endOfFormatSpan));
    const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
        int32,
        int
    ];
    let ch = __gotots_results_3[0];
    if (IsLineBreak__from_stringutil(ch)) {
        endOfFormatSpan--;
    }
    let span = NewTextRange__from_core(startPos, endOfFormatSpan + 1);
    return FormatSpan(ctx, TextRange__from_core.$copy(span), sourceFile, FormatRequestKindFormatOnEnter$constant());
}
