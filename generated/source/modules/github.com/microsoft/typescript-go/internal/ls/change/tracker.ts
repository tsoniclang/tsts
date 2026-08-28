import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, Kind as Kind__from_ast, NamedImports as NamedImports__from_ast, Node$Storage as Node__from_ast$Storage, PropertyDeclaration as PropertyDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, TextPos as TextPos__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Position$Storage as Position__from_lsproto$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { CommentRange as CommentRange__from_ast, ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsClassOrTypeElement as IsClassOrTypeElement__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJsonSourceFile as IsJsonSourceFile__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPrologueDirective as IsPrologueDirective__from_ast, IsStatement as IsStatement__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindExportKeyword$constant as KindExportKeyword$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindMultiLineCommentTrivia$constant as KindMultiLineCommentTrivia$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, Kind_String as Kind_String__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, PropertySignatureDeclaration as PropertySignatureDeclaration__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, VariableDeclaration as VariableDeclaration__from_ast, Visitor as Visitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, FindPrecedingToken as FindPrecedingToken__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav, GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { MultiMap as MultiMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ApplyBulkEdits as ApplyBulkEdits__from_core, GetNewLineKind as GetNewLineKind__from_core, NewLineKind_GetNewLineCharacter as NewLineKind_GetNewLineCharacter__from_core, NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { FindFirstNonWhitespaceColumn as FindFirstNonWhitespaceColumn__from_format, FormatNodeGivenIndentation as FormatNodeGivenIndentation__from_format, GetContainingList as GetContainingList__from_format, GetIndentation as GetIndentation__from_format, GetLineStartPositionForPosition as GetLineStartPositionForPosition__from_format, ShouldIndentChildNode as ShouldIndentChildNode__from_format, WithFormatCodeSettings as WithFormatCodeSettings__from_format } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/format/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { FormatCodeSettings as FormatCodeSettings__from_lsutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/package.js";
import { ComparePositions as ComparePositions__from_lsproto, CompareRanges as CompareRanges__from_lsproto, Position as Position__from_lsproto, Range as Range__from_lsproto, TextEdit as TextEdit__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetJSDocCommentRanges as GetJSDocCommentRanges__from_parser } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { ChangeTrackerWriter as ChangeTrackerWriter__from_printer, IsPinnedComment as IsPinnedComment__from_printer, IsRecognizedTripleSlashComment as IsRecognizedTripleSlashComment__from_printer, NewChangeTrackerWriter as NewChangeTrackerWriter__from_printer, NewEmitContext as NewEmitContext__from_printer, NewPrinter as NewPrinter__from_printer, PrinterOptions as PrinterOptions__from_printer, Printer as Printer__from_printer, RangeStartPositionsAreOnSameLine as RangeStartPositionsAreOnSameLine__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ComputeLineOfPosition as ComputeLineOfPosition__from_scanner, GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetShebang as GetShebang__from_scanner, GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner, SkipTriviaEx as SkipTriviaEx__from_scanner, SkipTriviaOptions as SkipTriviaOptions__from_scanner, TokenToString as TokenToString__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IsLineBreak as IsLineBreak__from_stringutil, IsWhiteSpaceSingleLine as IsWhiteSpaceSingleLine__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { MultiMap$Add$PointerTo_Named_ast$SourceFile$PointerTo_Named_change$trackerEdit } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/MultiMap$Add.js";
import { IfElse$Named_ast$Kind, IfElse$int, IfElse$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_ast$Node$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapNonNil$PointerTo_Named_change$trackerEdit$PointerTo_Named_lsproto$TextEdit } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapNonNil.js";
import { AppendSeq$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange } from "../../../../../../../support/generics/concretizations/slices/AppendSeq.js";
import { Collect$Named_ast$CommentRange } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Index.js";
import { SortStableFunc$SliceOf_PointerTo_Named_change$trackerEdit$PointerTo_Named_change$trackerEdit } from "../../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goInterfaceAdapter$Named_change$trackerEditKind, $goInterfaceAdapter$Named_lsproto$Range, $goInterfaceAdapter$PointerTo_Named_printer$ChangeTrackerWriter, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_change$nodesInsertedAtStartState, $goMap$MapOf_PointerTo_Named_ast$Node_To_bool, $goMap$MapOf_string_To_SliceOf_PointerTo_Named_lsproto$TextEdit, $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_SliceOf_PointerTo_Named_change$trackerEdit as GoMap } from "../../../../../../../support/maps.js";
import { deleteDeclaration, positionsAreOnSameLine } from "./delete.js";
import { getFormatCodeSettingsForWriting, hasCommentsBeforeLineBreak, needSemicolonBetween } from "./trackerimpl.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goNumberIntegerRemainder } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class NodeOptions {
    declare private readonly $goType: void;
    public constructor(public Prefix: gostring, public Suffix: gostring, public indentation: tsonicTypeScriptRuntime.Location<int> | undefined, public delta: tsonicTypeScriptRuntime.Location<int> | undefined, public LeadingTriviaOption: LeadingTriviaOption, public TrailingTriviaOption: TrailingTriviaOption, public joiner: gostring) {
    }
    static $zero(): NodeOptions {
        return new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
    }
    static $copy($source: NodeOptions): NodeOptions {
        return new NodeOptions($source.Prefix, $source.Suffix, $source.indentation, $source.delta, $source.LeadingTriviaOption, $source.TrailingTriviaOption, $source.joiner);
    }
    declare private readonly then?: never;
}
export class LeadingTriviaOption {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function LeadingTriviaOptionNone$constant(): LeadingTriviaOption {
    return new LeadingTriviaOption(0);
}
export function LeadingTriviaOptionExclude$constant(): LeadingTriviaOption {
    return new LeadingTriviaOption(1);
}
export function LeadingTriviaOptionIncludeAll$constant(): LeadingTriviaOption {
    return new LeadingTriviaOption(2);
}
export function LeadingTriviaOptionJSDoc$constant(): LeadingTriviaOption {
    return new LeadingTriviaOption(3);
}
export function LeadingTriviaOptionStartLine$constant(): LeadingTriviaOption {
    return new LeadingTriviaOption(4);
}
export class TrailingTriviaOption {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function TrailingTriviaOptionNone$constant(): TrailingTriviaOption {
    return new TrailingTriviaOption(0);
}
export function TrailingTriviaOptionExclude$constant(): TrailingTriviaOption {
    return new TrailingTriviaOption(1);
}
export function TrailingTriviaOptionExcludeWhitespace$constant(): TrailingTriviaOption {
    return new TrailingTriviaOption(2);
}
export function TrailingTriviaOptionInclude$constant(): TrailingTriviaOption {
    return new TrailingTriviaOption(3);
}
export class trackerEditKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function trackerEditKindText$constant(): trackerEditKind {
    return new trackerEditKind(1);
}
export function trackerEditKindRemove$constant(): trackerEditKind {
    return new trackerEditKind(2);
}
export function trackerEditKindReplaceWithSingleNode$constant(): trackerEditKind {
    return new trackerEditKind(3);
}
export function trackerEditKindReplaceWithMultipleNodes$constant(): trackerEditKind {
    return new trackerEditKind(4);
}
export class trackerEdit {
    declare private readonly $goType: void;
    public constructor(public kind: trackerEditKind, public Range: Range__from_lsproto, public NewText: gostring, public Node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public nodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public options: NodeOptions) {
    }
    declare private readonly then?: never;
}
export class nodesInsertedAtStartState {
    declare private readonly $goType: void;
    public constructor(public node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
    }
    declare private readonly then?: never;
}
export class Tracker {
    declare private readonly $goType: void;
    public constructor(public formatSettings: FormatCodeSettings__from_lsutil, public newLine: gostring, public converters: {
        value: Converters__from_lsconv;
    } | undefined, public ctx: GoInterface | undefined, public EmitContext: {
        value: EmitContext__from_printer;
    } | undefined, public NodeFactory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, public changes: tsonicTypeScriptRuntime.Location<MultiMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit | undefined>> | undefined, public deletedNodes: RuntimeSlice<deletedNode$Storage>, public nodesWithInsertionsAtStart: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nodesInsertedAtStartState | undefined>, public writer: {
        value: ChangeTrackerWriter__from_printer;
    } | undefined) {
    }
    declare private readonly then?: never;
    static Delete(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        const __gotots_slice_build_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).deletedNodes;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void deletedNode.$storageOf, (void deletedNode.$fromStorage,
                {
                    sourceFile: sourceFile,
                    node: node
                })));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<deletedNode$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, deletedNode.$storageOf(deletedNode.$copy(deletedNode.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void deletedNode.$storageOf, (void deletedNode.$fromStorage,
                {
                    sourceFile: sourceFile,
                    node: node
                })));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, deletedNode.$storageOf(deletedNode.$zero()));
            }
        }
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).deletedNodes = __gotots_slice_build_1;
    }
    static DeleteNodeRange(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, startNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, endNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, leadingTrivia: LeadingTriviaOption, trailingTrivia: TrailingTriviaOption): void {
        let startPosition = Tracker.$go$private$change$getAdjustedStartPosition(t, sourceFile, startNode, leadingTrivia, false);
        let endPosition = Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, endNode, trailingTrivia);
        let startPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), startPosition | 0);
        let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), endPosition | 0);
        Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startPos)),
            End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
        }), "");
    }
    static DeleteRange(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, textRange: TextRange__from_core): void {
        let lspRange = Converters__from_lsconv.ToLSPRange((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), TextRange__from_core.$copy(textRange));
        Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$copy(lspRange), "");
    }
    static GetAdjustedRange(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, startNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, endNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, leadingOption: LeadingTriviaOption, trailingOption: TrailingTriviaOption): Range__from_lsproto {
        return Converters__from_lsconv.ToLSPRange((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), NewTextRange__from_core(Tracker.$go$private$change$getAdjustedStartPosition(t, sourceFile, startNode, leadingOption, false), Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, endNode, trailingOption)));
    }
    static GetChanges(t: Tracker | undefined): GoMapValue<gostring, RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>> {
        Tracker.$go$private$change$finishDeleteDeclarations(t);
        Tracker.$go$private$change$finishNodesWithInsertionsAtStart(t);
        let changes: GoMapValue<gostring, RuntimeSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>> = Tracker.$go$private$change$getTextChangesFromChanges(t);
        return changes;
    }
    static InsertAtTopOfFile(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, insert: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, blankLineBetween: bool): void {
        if (insert.length === 0) {
            return;
        }
        let pos = Tracker.$go$private$change$getInsertionPositionAtSourceFileTop(t, sourceFile);
        let options = new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        if (pos !== 0) {
            options.Prefix = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
        }
        if (SourceFile__from_ast.Text(sourceFile).length === 0 || !IsLineBreak__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), pos))) {
            options.Suffix = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
        }
        if (blankLineBetween) {
            const __gotots_store_1 = options;
            __gotots_store_1.Suffix = __gotots_store_1.Suffix + (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
        }
        if (insert.length === 1) {
            Tracker.InsertNodeAt(t, sourceFile, pos | 0, insert.get(0), NodeOptions.$copy(options));
        }
        else {
            Tracker.InsertNodesAt(t, sourceFile, pos | 0, insert, NodeOptions.$copy(options));
        }
    }
    static InsertImportSpecifierAtIndex(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, newSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, namedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, index: int): void {
        let namedImportsNode: {
            value: NamedImports__from_ast;
        } | undefined = Node__from_ast.AsNamedImports(namedImports);
        let elements = NodeList__from_ast.$storageOf((((namedImportsNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        let prevSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (index > 0 && index - 1 < elements.length) {
            prevSpecifier = elements.get(index - 1);
        }
        if (!(prevSpecifier === undefined)) {
            Tracker.InsertNodeInListAfter(t, sourceFile, prevSpecifier, newSpecifier, void 0);
        }
        else {
            Tracker.InsertNodeBefore(t, sourceFile, elements.get(0), newSpecifier, !positionsAreOnSameLine(GetStartOfNode__from_astnav(elements.get(0), sourceFile, false), GetStartOfNode__from_astnav(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, sourceFile, false), sourceFile), LeadingTriviaOptionNone$constant());
        }
    }
    static InsertMemberAtStart(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        Tracker.$go$private$change$insertNodeAtStartWorker(t, sourceFile, node, newElement);
    }
    static InsertModifierBefore(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, modifier: Kind__from_ast, before: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let pos = GetStartOfNode__from_astnav(before, sourceFile, false);
        let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, modifier);
        Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(pos, pos));
        Node__from_ast.$storageOf(((token ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        Tracker.InsertNodeAt(t, sourceFile, pos | 0, token, new NodeOptions("", " ", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
    }
    static InsertNodeAfter(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, after: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let endPosition = Tracker.$go$private$change$endPosForInsertNodeAfter(t, sourceFile, after, newNode);
        Tracker.InsertNodeAt(t, sourceFile, endPosition, newNode, Tracker.$go$private$change$getInsertNodeAfterOptions(t, sourceFile, after));
    }
    static InsertNodeAt(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: TextPos__from_core, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: NodeOptions): void {
        let lsPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), pos);
        Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(lsPos)),
            End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(lsPos))
        }), newNode, NodeOptions.$copy(options));
    }
    static InsertNodeBefore(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, before: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, blankLineBetween: bool, leadingTriviaOption: LeadingTriviaOption): void {
        Tracker.InsertNodeAt(t, sourceFile, Tracker.$go$private$change$getAdjustedStartPosition(t, sourceFile, before, leadingTriviaOption, false) | 0, newNode, Tracker.$go$private$change$getOptionsForInsertNodeBefore(t, before, newNode, blankLineBetween));
    }
    static InsertNodeInListAfter(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, after: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, containingList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): void {
        if (containingList === undefined) {
            containingList = GetContainingList__from_format(after, sourceFile);
        }
        if (containingList === undefined) {
            return;
        }
        let index = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, after);
        if (index < 0) {
            return;
        }
        let end = Node__from_ast.End(after);
        if (index !== NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1) {
            {
                let nextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, Node__from_ast.End(after));
                if (!(nextToken === undefined) && isSeparator(after, nextToken)) {
                    let nextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index + 1);
                    let startPos = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.Pos(nextNode), new SkipTriviaOptions__from_scanner(false, true, false));
                    let suffix = TokenToString__from_scanner(Node__from_ast.$storageOf(((nextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) + goStringSlice(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(nextToken), startPos);
                    Tracker.InsertNodesAt(t, sourceFile, startPos | 0, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([newNode]), new NodeOptions("", suffix, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
                }
            }
            return;
        }
        let afterStart = GetStartOfNode__from_astnav(after, sourceFile, false);
        let afterStartLinePosition = GetLineStartPositionForPosition__from_format(afterStart, sourceFile);
        let multilineList = false;
        let separator = KindCommaToken$constant__from_ast();
        if (NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 1) {
            let tokenBeforeInsertPosition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, Node__from_ast.Pos(after));
            separator = IfElse$Named_ast$Kind(isSeparator(after, tokenBeforeInsertPosition), Node__from_ast.$storageOf(((tokenBeforeInsertPosition ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind, KindCommaToken$constant__from_ast());
            let afterMinusOneStartLinePosition = GetLineStartPositionForPosition__from_format(GetStartOfNode__from_astnav(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index - 1), sourceFile, false), sourceFile);
            multilineList = afterMinusOneStartLinePosition !== afterStartLinePosition;
        }
        if (hasCommentsBeforeLineBreak(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(after)) || !positionsAreOnSameLine(NodeList__from_ast.Pos(containingList), NodeList__from_ast.End(containingList), sourceFile)) {
            multilineList = true;
        }
        if (multilineList) {
            let separatorToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, separator);
            let separatorString = TokenToString__from_scanner(separator);
            Node__from_ast.$storageOf(((separatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(end, end + separatorString.length));
            Node__from_ast.$storageOf(((separatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((after ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), end | 0);
            Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$fromStorage({
                Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos)),
                End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
            }), separatorToken, new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
            let indentation = FindFirstNonWhitespaceColumn__from_format(afterStartLinePosition, afterStart, sourceFile, FormatCodeSettings__from_lsutil.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings));
            const indentation$location = tsonicTypeScriptRuntime.boundLocation({}, () => indentation, indentation$next => indentation = indentation$next);
            let insertPos = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), end, new SkipTriviaOptions__from_scanner(true, false, false));
            for (; insertPos !== end && IsLineBreak__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), insertPos - 1));) {
                insertPos--;
            }
            let insertLSPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), insertPos | 0);
            Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$fromStorage({
                Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(insertLSPos)),
                End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(insertLSPos))
            }), newNode, new NodeOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine, "", indentation$location, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
        }
        else {
            let separatorString = TokenToString__from_scanner(separator);
            let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), end | 0);
            Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$fromStorage({
                Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos)),
                End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
            }), newNode, new NodeOptions(separatorString + " ", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
        }
    }
    static InsertNodesAfter(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, after: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): void {
        let endPosition = Tracker.$go$private$change$endPosForInsertNodeAfter(t, sourceFile, after, newNodes.get(0));
        Tracker.InsertNodesAt(t, sourceFile, endPosition, newNodes, Tracker.$go$private$change$getInsertNodeAfterOptions(t, sourceFile, after));
    }
    static InsertNodesAt(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: TextPos__from_core, newNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, options: NodeOptions): void {
        let lsPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), pos);
        Tracker.ReplaceRangeWithNodes(t, sourceFile, Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(lsPos)),
            End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(lsPos))
        }), newNodes, NodeOptions.$copy(options));
    }
    static InsertText(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: Position__from_lsproto, text: gostring): void {
        Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(pos)),
            End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(pos))
        }), text);
    }
    static ParenthesizeArrowParameters(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, arrowFunc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        if (!(FindChildOfKind__from_astnav(arrowFunc, KindCloseParenToken$constant__from_ast(), sourceFile) === undefined)) {
            return;
        }
        let params = Node__from_ast.Parameters(arrowFunc);
        if (params.length === 0) {
            return;
        }
        let firstParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = params.get(0);
        let lastParam: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = params.get(params.length - 1);
        let startPos = GetStartOfNode__from_astnav(firstParam, sourceFile, false);
        Tracker.InsertText(t, sourceFile, Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), startPos | 0), "(");
        Tracker.InsertText(t, sourceFile, Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), Node__from_ast.End(lastParam) | 0), ")");
    }
    static ReplaceNode(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, oldNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: NodeOptions | undefined): void {
        if (options === undefined) {
            options = new NodeOptions("", "", void 0, void 0, LeadingTriviaOptionExclude$constant(), TrailingTriviaOptionExclude$constant(), "");
        }
        Tracker.ReplaceRange(t, sourceFile, Tracker.GetAdjustedRange(t, sourceFile, oldNode, oldNode, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LeadingTriviaOption, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TrailingTriviaOption), newNode, NodeOptions.$copy(NodeOptions.$copy((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")))));
    }
    static ReplaceNodeWithNodes(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, oldNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, options: NodeOptions | undefined): void {
        if (options === undefined) {
            options = new NodeOptions("", "", void 0, void 0, LeadingTriviaOptionExclude$constant(), TrailingTriviaOptionExclude$constant(), "");
        }
        Tracker.ReplaceRangeWithNodes(t, sourceFile, Tracker.GetAdjustedRange(t, sourceFile, oldNode, oldNode, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LeadingTriviaOption, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TrailingTriviaOption), newNodes, NodeOptions.$copy(NodeOptions.$copy((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")))));
    }
    static ReplaceRange(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, lsprotoRange: Range__from_lsproto, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: NodeOptions): void {
        MultiMap$Add$PointerTo_Named_ast$SourceFile$PointerTo_Named_change$trackerEdit((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changes, sourceFile, new trackerEdit(trackerEditKindReplaceWithSingleNode$constant(), Range__from_lsproto.$copy(lsprotoRange), "", newNode, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), NodeOptions.$copy(options)));
    }
    static ReplaceRangeWithNodes(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, lsprotoRange: Range__from_lsproto, newNodes: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, options: NodeOptions): void {
        if (newNodes.length === 1) {
            Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$copy(lsprotoRange), newNodes.get(0), NodeOptions.$copy(options));
            return;
        }
        MultiMap$Add$PointerTo_Named_ast$SourceFile$PointerTo_Named_change$trackerEdit((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changes, sourceFile, new trackerEdit(trackerEditKindReplaceWithMultipleNodes$constant(), Range__from_lsproto.$copy(lsprotoRange), "", void 0, newNodes, NodeOptions.$copy(options)));
    }
    static ReplaceRangeWithText(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, lsprotoRange: Range__from_lsproto, text: gostring): void {
        MultiMap$Add$PointerTo_Named_ast$SourceFile$PointerTo_Named_change$trackerEdit((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changes, sourceFile, new trackerEdit(trackerEditKindText$constant(), Range__from_lsproto.$copy(lsprotoRange), text, void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), NodeOptions.$zero()));
    }
    static TryInsertTypeAnnotation(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
        let endNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (IsFunctionLike__from_ast(node)) {
            endNode = FindChildOfKind__from_astnav(node, KindCloseParenToken$constant__from_ast(), sourceFile);
            if (endNode === undefined) {
                if (!IsArrowFunction__from_ast(node)) {
                    return false;
                }
                let params = Node__from_ast.Parameters(node);
                if (params.length === 0) {
                    return false;
                }
                endNode = params.get(0);
            }
        }
        else {
            switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindVariableDeclaration$constant__from_ast(): {
                    endNode = VariableDeclaration__from_ast.$storageOf(((Node__from_ast.AsVariableDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).ExclamationToken;
                    break;
                }
                case KindPropertySignature$constant__from_ast(): {
                    endNode = (void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                        PropertySignatureDeclaration__from_ast.$storageOf(((Node__from_ast.AsPropertySignatureDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NamedMemberBase)).PostfixToken;
                    break;
                }
                case KindPropertyDeclaration$constant__from_ast(): {
                    endNode = NamedMemberBase__from_ast.$storageOf((Node__from_ast.AsPropertyDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken;
                    break;
                }
                case KindParameter$constant__from_ast(): {
                    endNode = ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken;
                    break;
                }
            }
            if (endNode === undefined) {
                endNode = Node__from_ast.Name(node);
            }
        }
        if (endNode === undefined) {
            return false;
        }
        Tracker.InsertNodeAt(t, sourceFile, Node__from_ast.End(endNode) | 0, typeNode, new NodeOptions(": ", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
        return true;
    }
    static $go$private$change$computeNewText(t: Tracker | undefined, change: trackerEdit | undefined, targetSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring {
        switch ((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value) {
            case 2: {
                return "";
                break;
            }
            case 1: {
                return (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NewText;
                break;
            }
        }
        let pos = Converters__from_lsconv.LineAndCharacterToPosition((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), Position__from_lsproto.$copy(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range).Start)));
        let formatNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => gostring) | undefined = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring => {
            return Tracker.$go$private$change$getFormattedTextOfNode(t, n, targetSourceFile, sourceFile, pos, NodeOptions.$copy((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options));
        };
        let text = "";
        switch ((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind.$value) {
            case 4: {
                if ((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.joiner === "") {
                    (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.joiner = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
                }
                text = strings__from_gostdlib.Join(Map$PointerTo_Named_ast$Node$string((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodes, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring => {
                    const __gotots_callee_3 = formatNode;
                    const __gotots_argument_3 = n;
                    const __gotots_argument_4 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                    const __gotots_argument_5 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
                    return strings__from_gostdlib.TrimSuffix(__gotots_argument_4, __gotots_argument_5);
                }), (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.joiner);
                break;
            }
            case 3: {
                const __gotots_callee_4 = formatNode;
                const __gotots_argument_6 = (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Node;
                text = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
                break;
            }
            default: {
                const __gotots_argument_7 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("change kind %d should have been handled earlier", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_change$trackerEditKind((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).kind)])));
                GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
                break;
            }
        }
        let noIndent = text;
        if (!(!((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.indentation === undefined) || GetLineStartPositionForPosition__from_format(pos, targetSourceFile) === pos)) {
            noIndent = strings__from_gostdlib.TrimLeftFunc(text, unicode__from_gostdlib.IsSpace);
        }
        return (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.Prefix + noIndent + IfElse$string(strings__from_gostdlib.HasSuffix(noIndent, (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.Suffix), "", (change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).options.Suffix);
    }
    static $go$private$change$endPosForInsertNodeAfter(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, after: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): TextPos__from_core {
        if (needSemicolonBetween(after, newNode) && (goStringIndex(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(after) - 1) !== 59)) {
            let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), Node__from_ast.End(after) | 0);
            let semicolon: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, KindSemicolonToken$constant__from_ast());
            Node__from_ast.$storageOf(((semicolon ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(Node__from_ast.End(after), Node__from_ast.End(after)));
            Node__from_ast.$storageOf(((semicolon ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = Node__from_ast.$storageOf(((after ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            Tracker.ReplaceRange(t, sourceFile, Range__from_lsproto.$fromStorage({
                Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos)),
                End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
            }), semicolon, new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), ""));
        }
        return Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, after, TrailingTriviaOptionNone$constant()) | 0;
    }
    static $go$private$change$endPositionToDeleteNodeInList(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, prevNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, nextNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        let end = Tracker.$go$private$change$startPositionToDeleteNodeInList(t, sourceFile, nextNode);
        if (prevNode === undefined || positionsAreOnSameLine(Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, node, TrailingTriviaOptionInclude$constant()), end, sourceFile)) {
            return end;
        }
        let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, GetStartOfNode__from_astnav(nextNode, sourceFile, false));
        if (isSeparator(node, token)) {
            let prevToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, GetStartOfNode__from_astnav(node, sourceFile, false));
            if (isSeparator(prevNode, prevToken)) {
                let pos = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(token), new SkipTriviaOptions__from_scanner(true, true, false));
                if (positionsAreOnSameLine(GetStartOfNode__from_astnav(prevToken, sourceFile, false), GetStartOfNode__from_astnav(token, sourceFile, false), sourceFile)) {
                    if (pos > 0 && IsLineBreak__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), pos - 1))) {
                        return pos - 1;
                    }
                    return pos;
                }
                if (IsLineBreak__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), pos))) {
                    return pos;
                }
            }
        }
        return end;
    }
    static $go$private$change$finishDeleteDeclarations(t: Tracker | undefined): void {
        let deletedNodesInLists: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, bool> = $goMap$MapOf_PointerTo_Named_ast$Node_To_bool.make(0, []);
        const __gotots_range_0 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).deletedNodes;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = deletedNode.$copy(deletedNode.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let deleted = __gotots_range_value_0;
            let isContained = false;
            const __gotots_range_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).deletedNodes;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = deletedNode.$copy(deletedNode.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                let other = __gotots_range_value_1;
                if (tsonicTypeScriptRuntime.sameLocation(deletedNode.$storageOf(other).sourceFile, deletedNode.$storageOf(deleted).sourceFile)
                    && !tsonicTypeScriptRuntime.sameLocation(deletedNode.$storageOf(other).node, deletedNode.$storageOf(deleted).node) && rangeContainsRangeExclusive(deletedNode.$storageOf(other).node, deletedNode.$storageOf(deleted).node)) {
                    isContained = true;
                    break;
                }
            }
            if (isContained) {
                continue;
            }
            deleteDeclaration(t, deletedNodesInLists, deletedNode.$storageOf(deleted).sourceFile, deletedNode.$storageOf(deleted).node);
        }
        const __gotots_range_2 = deletedNodesInLists;
        const __gotots_range_keys_0 = __gotots_range_2.keys();
        for (const __gotots_range_value_2 of __gotots_range_keys_0) {
            const __gotots_range_value_3 = __gotots_range_2.lookupOk(__gotots_range_value_2);
            if (!__gotots_range_value_3[1]) {
                continue;
            }
            const __gotots_range_value_4 = __gotots_range_value_2;
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(node);
            let list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList__from_format(node, sourceFile);
            if (list === undefined || !tsonicTypeScriptRuntime.sameLocation(node, NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1))) {
                continue;
            }
            let lastNonDeletedIndex = -1;
            for (let i = NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 2; i >= 0; i--) {
                if (!deletedNodesInLists.lookup(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i))) {
                    lastNonDeletedIndex = i;
                    break;
                }
            }
            if (lastNonDeletedIndex !== -1) {
                let startPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), Node__from_ast.End(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(lastNonDeletedIndex)) | 0);
                let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), Tracker.$go$private$change$startPositionToDeleteNodeInList(t, sourceFile, NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(lastNonDeletedIndex + 1)) | 0);
                Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
                    Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startPos)),
                    End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
                }), "");
            }
        }
    }
    static $go$private$change$finishNodesWithInsertionsAtStart(t: Tracker | undefined): void {
        const __gotots_range_3 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodesWithInsertionsAtStart;
        const __gotots_range_keys_1 = __gotots_range_3.keys();
        for (const __gotots_range_value_5 of __gotots_range_keys_1) {
            const __gotots_range_value_6 = __gotots_range_3.lookupOk(__gotots_range_value_5);
            if (!__gotots_range_value_6[1]) {
                continue;
            }
            const __gotots_range_value_7 = __gotots_range_value_6[0];
            let state: nodesInsertedAtStartState | undefined = __gotots_range_value_7;
            if (state === undefined) {
                continue;
            }
            let openBrace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, KindOpenBraceToken$constant__from_ast(), (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
            if (openBrace === undefined) {
                continue;
            }
            let closeBrace: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node, KindCloseBraceToken$constant__from_ast(), (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
            if (closeBrace === undefined) {
                continue;
            }
            let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getMembersOrProperties((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).node);
            let isEmpty = members === undefined || NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0;
            let isSingleLine = positionsAreOnSameLine(Node__from_ast.End(openBrace), Node__from_ast.End(closeBrace), (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile);
            if (isEmpty && isSingleLine && Node__from_ast.End(openBrace) !== Node__from_ast.End(closeBrace) - 1) {
                Tracker.DeleteRange(t, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, NewTextRange__from_core(Node__from_ast.End(openBrace), Node__from_ast.End(closeBrace) - 1));
            }
            if (isSingleLine) {
                Tracker.InsertText(t, (state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile, Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFile), Node__from_ast.End(closeBrace) - 1 | 0), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine);
            }
        }
    }
    static $go$private$change$getAdjustedEndPosition(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, TrailingTriviaOption__shadow_1: TrailingTriviaOption): int {
        if (TrailingTriviaOption__shadow_1.$value === TrailingTriviaOptionExclude$constant().$value) {
            return Node__from_ast.End(node);
        }
        if (TrailingTriviaOption__shadow_1.$value === TrailingTriviaOptionExcludeWhitespace$constant().$value) {
            {
                let comments = AppendSeq$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange(Collect$Named_ast$CommentRange(GetTrailingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node))), GetLeadingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node)));
                if (comments.length > 0) {
                    {
                        let realEnd = TextRange__from_core.$fromStorage((void CommentRange__from_ast.$storageOf, (void CommentRange__from_ast.$fromStorage,
                            comments.get(comments.length - 1))).TextRange).End();
                        if (realEnd !== 0) {
                            return realEnd;
                        }
                    }
                }
            }
            return Node__from_ast.End(node);
        }
        {
            let multilineEndPosition = Tracker.$go$private$change$getEndPositionOfMultilineTrailingComment(t, sourceFile, node, TrailingTriviaOption__shadow_1);
            if (multilineEndPosition !== 0) {
                return multilineEndPosition;
            }
        }
        let newEnd = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node), new SkipTriviaOptions__from_scanner(true, false, false));
        if (newEnd !== Node__from_ast.End(node) && (TrailingTriviaOption__shadow_1.$value === TrailingTriviaOptionInclude$constant().$value || IsLineBreak__from_stringutil(goStringIndex(SourceFile__from_ast.Text(sourceFile), newEnd - 1)))) {
            return newEnd;
        }
        return Node__from_ast.End(node);
    }
    static $go$private$change$getAdjustedStartPosition(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, leadingOption: LeadingTriviaOption, hasTrailingComment: bool): int {
        if (leadingOption.$value === LeadingTriviaOptionJSDoc$constant().$value) {
            {
                let JSDocComments = GetJSDocCommentRanges__from_parser((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.nil<CommentRange__from_ast$Storage>(), node, SourceFile__from_ast.Text(sourceFile));
                if (JSDocComments.length > 0) {
                    return GetLineStartPositionForPosition__from_format(TextRange__from_core.$fromStorage((void CommentRange__from_ast.$storageOf, (void CommentRange__from_ast.$fromStorage,
                        JSDocComments.get(0))).TextRange).Pos(), sourceFile);
                }
            }
        }
        let start = GetStartOfNode__from_astnav(node, sourceFile, false);
        let startOfLinePos = GetLineStartPositionForPosition__from_format(start, sourceFile);
        switch (leadingOption.$value) {
            case 1: {
                return start;
                break;
            }
            case 4: {
                if (TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainsInclusive(startOfLinePos)) {
                    return startOfLinePos;
                }
                return start;
                break;
            }
        }
        let fullStart = Node__from_ast.Pos(node);
        if (fullStart === start) {
            return start;
        }
        let lineStarts = SourceFile__from_ast.ECMALineMap(sourceFile);
        let fullStartLineIndex = ComputeLineOfPosition__from_scanner(lineStarts, fullStart);
        let fullStartLinePos = lineStarts.get(fullStartLineIndex);
        if (startOfLinePos === fullStartLinePos) {
            if (leadingOption.$value === LeadingTriviaOptionIncludeAll$constant().$value) {
                return fullStart;
            }
            return start;
        }
        if (hasTrailingComment) {
            let comments = Collect$Named_ast$CommentRange(GetLeadingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, SourceFile__from_ast.Text(sourceFile), fullStart));
            if (comments.length === 0) {
                comments = Collect$Named_ast$CommentRange(GetTrailingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, SourceFile__from_ast.Text(sourceFile), fullStart));
            }
            if (comments.length > 0) {
                return SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), TextRange__from_core.$fromStorage((void CommentRange__from_ast.$storageOf, (void CommentRange__from_ast.$fromStorage,
                    comments.get(0))).TextRange).End(), new SkipTriviaOptions__from_scanner(true, true, false));
            }
        }
        let nextLineStart = IfElse$int(fullStart > 0, 1, 0);
        let adjustedStartPosition = lineStarts.get(fullStartLineIndex + nextLineStart);
        adjustedStartPosition = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), adjustedStartPosition, new SkipTriviaOptions__from_scanner(false, true, false));
        return lineStarts.get(ComputeLineOfPosition__from_scanner(lineStarts, adjustedStartPosition));
    }
    static $go$private$change$getEndPositionOfMultilineTrailingComment(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, trailingOpt: TrailingTriviaOption): int {
        if (trailingOpt.$value === TrailingTriviaOptionInclude$constant().$value) {
            let lineStarts = SourceFile__from_ast.ECMALineMap(sourceFile);
            let nodeEndLine = ComputeLineOfPosition__from_scanner(lineStarts, Node__from_ast.End(node));
            const __gotots_range_8 = named_iter.IterSeqValueOperations.$project(GetTrailingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node)));
            if (__gotots_range_8 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            let __gotots_range_return_0: int = 0;
            __gotots_range_8(($argument0: CommentRange__from_ast): bool => {
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
                const __gotots_range_value_15 = CommentRange__from_ast.$copy($argument0);
                let comment = __gotots_range_value_15;
                if (CommentRange__from_ast.$storageOf(comment).Kind === KindSingleLineCommentTrivia$constant__from_ast() || ComputeLineOfPosition__from_scanner(lineStarts, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos()) > nodeEndLine) {
                    __gotots_range_state_0 = 0;
                    return false;
                }
                {
                    let commentEndLine = ComputeLineOfPosition__from_scanner(lineStarts, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End());
                    if (commentEndLine > nodeEndLine) {
                        __gotots_range_return_0 = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End(), new SkipTriviaOptions__from_scanner(true, true, false));
                        __gotots_range_state_0 = 2;
                        return false;
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
        }
        return 0;
    }
    static $go$private$change$getFormattedTextOfNode(t: Tracker | undefined, nodeIn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, targetSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int, options: NodeOptions): gostring {
        const __gotots_results_0 = Tracker.$go$private$change$getNonformattedText(t, nodeIn, targetSourceFile);
        let text = __gotots_results_0[0];
        let sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_results_0[1];
        let formatOptions = getFormatCodeSettingsForWriting(FormatCodeSettings__from_lsutil.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings), targetSourceFile);
        let initialIndentation = 0, delta = 0;
        if (options.indentation === undefined) {
            initialIndentation = GetIndentation__from_format(pos, sourceFile, FormatCodeSettings__from_lsutil.$copy(formatOptions), options.Prefix === (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine || GetLineStartPositionForPosition__from_format(pos, targetSourceFile) === pos);
        }
        else {
            initialIndentation =
                ((options.indentation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
        }
        if (!(options.delta === undefined)) {
            delta =
                ((options.delta ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
        }
        else if (formatOptions.EditorSettings.IndentSize !== 0 && ShouldIndentChildNode__from_format(FormatCodeSettings__from_lsutil.$copy(formatOptions), nodeIn, void 0, void 0, RuntimeSlice.nil<bool>())) {
            delta = formatOptions.EditorSettings.IndentSize;
        }
        let changes = FormatNodeGivenIndentation__from_format((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, sourceFileLike, Node__from_ast.AsSourceFile(sourceFileLike), ((targetSourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LanguageVariant, initialIndentation, delta);
        return ApplyBulkEdits__from_core(text, changes);
    }
    static $go$private$change$getInsertNodeAfterOptions(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): NodeOptions {
        let newLineChar = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
        let options = NodeOptions.$zero();
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindParameter$constant__from_ast(): {
                options = new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
            case KindClassDeclaration$constant__from_ast():
            case KindModuleDeclaration$constant__from_ast(): {
                options = new NodeOptions(newLineChar, newLineChar, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
            case KindVariableDeclaration$constant__from_ast():
            case KindStringLiteral$constant__from_ast():
            case KindIdentifier$constant__from_ast(): {
                options = new NodeOptions(", ", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
            case KindPropertyAssignment$constant__from_ast(): {
                options = new NodeOptions("", "," + newLineChar, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
            case KindExportKeyword$constant__from_ast(): {
                options = new NodeOptions(" ", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
            default: {
                if (!(IsStatement__from_ast(node) || IsClassOrTypeElement__from_ast(node))) {
                    const __gotots_argument_1 = new $goInterfaceAdapter$string("unimplemented node type " + Kind_String__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) + " in changeTracker.getInsertNodeAfterOptions");
                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                }
                options = new NodeOptions("", newLineChar, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
                break;
            }
        }
        const __gotots_binary_operand_0 = Node__from_ast.End(node);
        const __gotots_store_2 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
        const __gotots_binary_operand_1 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
        if (__gotots_binary_operand_0 === __gotots_binary_operand_1 && IsStatement__from_ast(node)) {
            options.Prefix = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine + options.Prefix;
        }
        return NodeOptions.$copy(options);
    }
    static $go$private$change$getInsertNodeAtStartInsertOptions(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, indentation: int): NodeOptions {
        const indentation$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => indentation, indentation$next2 => indentation = indentation$next2);
        let state: nodesInsertedAtStartState | undefined = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodesWithInsertionsAtStart.lookup(node);
        let hasPreviousInsertion = !(state === undefined);
        if (state === undefined) {
            state = new nodesInsertedAtStartState(node, sourceFile);
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nodesWithInsertionsAtStart.store(node, state);
        }
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getMembersOrProperties(node);
        let isObjectLiteral = IsObjectLiteralExpression__from_ast(node);
        let isJSON = IsJsonSourceFile__from_ast(sourceFile);
        let hasMembers = !(members === undefined) && NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0;
        let insertTrailingComma = isObjectLiteral && (hasMembers || !isJSON);
        let insertLeadingComma = isObjectLiteral && isJSON && !hasMembers && hasPreviousInsertion;
        let suffix = "";
        if (insertTrailingComma) {
            suffix = ",";
        }
        else if (IsInterfaceDeclaration__from_ast(node) && !hasMembers) {
            suffix = ";";
        }
        let prefix = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
        if (insertLeadingComma) {
            prefix = "," + prefix;
        }
        return new NodeOptions(prefix, suffix, indentation$location2, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
    }
    static $go$private$change$getInsertionPositionAtSourceFileTop(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
        let lastPrologue: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_range_6 = NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_6.length; __gotots_range_index_3++) {
            const __gotots_range_value_13 = __gotots_range_6.get(__gotots_range_index_3);
            let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
            if (IsPrologueDirective__from_ast(node)) {
                lastPrologue = node;
            }
            else {
                break;
            }
        }
        let position = 0;
        let text = SourceFile__from_ast.Text(sourceFile);
        let advancePastLineBreak: (() => void) | undefined = (): void => {
            if (position >= text.length) {
                return;
            }
            {
                let char = goStringIndex(text, position);
                if (IsLineBreak__from_stringutil(char)) {
                    position++;
                    if (position < text.length && char === 13 && goStringIndex(text, position) === 10) {
                        position++;
                    }
                }
            }
        };
        if (!(lastPrologue === undefined)) {
            position = Node__from_ast.End(lastPrologue);
            const __gotots_callee_0 = advancePastLineBreak;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
            return position;
        }
        let shebang = GetShebang__from_scanner(text);
        if (shebang !== "") {
            position = shebang.length;
            const __gotots_callee_1 = advancePastLineBreak;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        let ranges = Collect$Named_ast$CommentRange(GetLeadingCommentRanges__from_scanner((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, text, position));
        if (ranges.length === 0) {
            return position;
        }
        let lastComment: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = void 0;
        let pinnedOrTripleSlash = false;
        let firstNodeLine = -1;
        let lenStatements = NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length;
        let lineMap = SourceFile__from_ast.ECMALineMap(sourceFile);
        const __gotots_range_7 = ranges;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_7.length; __gotots_range_index_4++) {
            const __gotots_range_value_14 = CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_range_7.get(__gotots_range_index_4)));
            let r = __gotots_range_value_14;
            const r$location = tsonicTypeScriptRuntime.boundLocation({}, () => r, r$next => r = r$next);
            if (CommentRange__from_ast.$storageOf(r).Kind === KindMultiLineCommentTrivia$constant__from_ast()) {
                if (IsPinnedComment__from_printer(text, CommentRange__from_ast.$copy(r))) {
                    lastComment =
                        r$location;
                    pinnedOrTripleSlash = true;
                    continue;
                }
            }
            else if (IsRecognizedTripleSlashComment__from_printer(text, CommentRange__from_ast.$copy(r))) {
                lastComment =
                    r$location;
                pinnedOrTripleSlash = true;
                continue;
            }
            if (!(lastComment === undefined)) {
                if (pinnedOrTripleSlash) {
                    break;
                }
                let commentLine = ComputeLineOfPosition__from_scanner(lineMap, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(r).TextRange).Pos());
                let lastCommentEndLine = ComputeLineOfPosition__from_scanner(lineMap, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((lastComment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).End());
                if (commentLine >= lastCommentEndLine + 2) {
                    break;
                }
            }
            if (lenStatements > 0) {
                if (firstNodeLine === -1) {
                    firstNodeLine = ComputeLineOfPosition__from_scanner(lineMap, GetStartOfNode__from_astnav(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0), sourceFile, false));
                }
                let commentEndLine = ComputeLineOfPosition__from_scanner(lineMap, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(r).TextRange).End());
                if (firstNodeLine < commentEndLine + 2) {
                    break;
                }
            }
            lastComment =
                r$location;
            pinnedOrTripleSlash = false;
        }
        if (!(lastComment === undefined)) {
            position = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((lastComment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).End();
            const __gotots_callee_2 = advancePastLineBreak;
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        return position;
    }
    static $go$private$change$getNonformattedText(t: Tracker | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        gostring,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let writer: {
            value: ChangeTrackerWriter__from_printer;
        } | undefined = NewChangeTrackerWriter__from_printer((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings.EditorSettings.IndentSize);
        Printer__from_printer.Write(NewPrinter__from_printer(new PrinterOptions__from_printer(false, GetNewLineKind__from_core((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine), false, 0, false, false, false, false, false, true, true, true), ChangeTrackerWriter__from_printer.GetPrintHandlers(writer), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext), node, sourceFile, new $goInterfaceAdapter$PointerTo_Named_printer$ChangeTrackerWriter(writer), void 0);
        let text = ChangeTrackerWriter__from_printer.String(writer);
        text = strings__from_gostdlib.TrimSuffix(text, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine);
        let nodeOut: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ChangeTrackerWriter__from_printer.AssignPositionsToNode(writer, node, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory);
        const __gotots_store_3 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let eofToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory"), KindEndOfFile$constant__from_ast());
        const __gotots_store_4 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory"), RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([nodeOut]));
        NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((nodeOut ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        Node__from_ast.$storageOf(((eofToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(NewTextRange__from_core(Node__from_ast.End(nodeOut), Node__from_ast.End(nodeOut)));
        const __gotots_store_5 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let sourceFileLike: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), SourceFileParseOptions__from_ast.$fromStorage({
            FileName: SourceFile__from_ast.FileName(sourceFile),
            Path: SourceFile__from_ast.Path(sourceFile).$value,
            ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(ExternalModuleIndicatorOptions__from_ast.$zero())
        }), text, nodeList, eofToken);
        Node__from_ast.ForEachChild(sourceFileLike, new Visitor__from_ast((child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = sourceFileLike;
            return true;
        }));
        Node__from_ast.$storageOf(((sourceFileLike ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((nodeOut ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        return [text, sourceFileLike];
    }
    static $go$private$change$getOptionsForInsertNodeBefore(t: Tracker | undefined, before: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, inserted: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, blankLineBetween: bool): NodeOptions {
        if (IsStatement__from_ast(before) || IsClassOrTypeElement__from_ast(before)) {
            if (blankLineBetween) {
                return new NodeOptions("", (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine + (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
            }
            return new NodeOptions("", (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        }
        else if (Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindVariableDeclaration$constant__from_ast()) {
            return new NodeOptions("", ", ", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        }
        else if (Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
            if (Node__from_ast.$storageOf(((inserted ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast()) {
                return new NodeOptions("", ", ", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
            }
            return new NodeOptions("", "", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        }
        else if ((Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast() && !(Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast()) || Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast()) {
            return new NodeOptions("", ", ", void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        }
        else if (Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportSpecifier$constant__from_ast()) {
            let suffix = ",";
            if (blankLineBetween) {
                suffix = suffix + (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).newLine;
            }
            else {
                suffix = suffix + " ";
            }
            return new NodeOptions("", suffix, void 0, void 0, new LeadingTriviaOption(0), new TrailingTriviaOption(0), "");
        }
        const __gotots_argument_2 = new $goInterfaceAdapter$string("unimplemented node type " + Kind_String__from_ast(Node__from_ast.$storageOf(((before ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) + " in changeTracker.getOptionsForInsertNodeBefore");
        GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$change$getTextChangesFromChanges(t: Tracker | undefined): GoMapValue<gostring, RuntimeSlice<{
        value: TextEdit__from_lsproto;
    } | undefined>> {
        let changes: GoMapValue<gostring, RuntimeSlice<{
            value: TextEdit__from_lsproto;
        } | undefined>> = $goMap$MapOf_string_To_SliceOf_PointerTo_Named_lsproto$TextEdit.make(0, []);
        const __gotots_range_4 = MultiMap__from_collections.$storageOf((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MultiMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit | undefined>>).value).M;
        const __gotots_range_keys_2 = __gotots_range_4.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_2) {
            const __gotots_range_value_9 = __gotots_range_4.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_8;
            const __gotots_range_value_11 = __gotots_range_value_9[0];
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_10;
            let changesInFile = __gotots_range_value_11;
            SortStableFunc$SliceOf_PointerTo_Named_change$trackerEdit$PointerTo_Named_change$trackerEdit(changesInFile, (a: trackerEdit | undefined, b: trackerEdit | undefined): int => {
                return CompareRanges__from_lsproto(Range__from_lsproto.$copy((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range), Range__from_lsproto.$copy((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range));
            });
            const __gotots_range_5 = changesInFile.length - 1;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_5; __gotots_range_index_2++) {
                const __gotots_range_value_12 = __gotots_range_index_2;
                let i = __gotots_range_value_12;
                if (ComparePositions__from_lsproto(Position__from_lsproto.$copy(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf((changesInFile.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range).End)), Position__from_lsproto.$copy(Position__from_lsproto.$fromStorage(Range__from_lsproto.$storageOf((changesInFile.get(i + 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range).Start))) > 0) {
                    const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("changes overlap: %v and %v", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$Named_lsproto$Range(Range__from_lsproto.$copy((changesInFile.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range)), new $goInterfaceAdapter$Named_lsproto$Range(Range__from_lsproto.$copy((changesInFile.get(i + 1) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range))])));
                    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                }
            }
            let textChanges = MapNonNil$PointerTo_Named_change$trackerEdit$PointerTo_Named_lsproto$TextEdit(changesInFile, (change: trackerEdit | undefined): {
                value: TextEdit__from_lsproto;
            } | undefined => {
                let newText = Tracker.$go$private$change$computeNewText(t, change, sourceFile, sourceFile);
                return { value: new TextEdit__from_lsproto(Range__from_lsproto.$copy((change ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Range), newText) };
            });
            if (textChanges.length > 0) {
                changes.store(SourceFile__from_ast.FileName(sourceFile), textChanges);
            }
        }
        return changes;
    }
    static $go$private$change$insertNodeAtStartWorker(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, newElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        let indentation = Tracker.$go$private$change$tryComputeIndentationFromExistingMembers(t, sourceFile, node);
        if (indentation < 0) {
            indentation = Tracker.$go$private$change$tryComputeIndentationForNewMember(t, sourceFile, node);
        }
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getMembersOrProperties(node);
        if (members === undefined) {
            return;
        }
        Tracker.InsertNodeAt(t, sourceFile, NodeList__from_ast.Pos(members) | 0, newElement, Tracker.$go$private$change$getInsertNodeAtStartInsertOptions(t, sourceFile, node, indentation));
    }
    static $go$private$change$startPositionToDeleteNodeInList(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        let start = Tracker.$go$private$change$getAdjustedStartPosition(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), false);
        return SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), start, new SkipTriviaOptions__from_scanner(false, true, false));
    }
    static $go$private$change$tryComputeIndentationForNewMember(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        let nodeStart = GetStartOfNode__from_astnav(node, sourceFile, false);
        let lineStart = GetLineStartPositionForPosition__from_format(nodeStart, sourceFile);
        let tabSize = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings.EditorSettings.TabSize;
        if (tabSize <= 0) {
            tabSize = 4;
        }
        let indentSize = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings.EditorSettings.IndentSize;
        if (indentSize <= 0) {
            indentSize = 4;
        }
        return globalThis.Math.max(findIndentationColumn(SourceFile__from_ast.Text(sourceFile), lineStart, nodeStart, tabSize), 0) + indentSize;
    }
    static $go$private$change$tryComputeIndentationFromExistingMembers(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
        let members: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = getMembersOrProperties(node);
        if (members === undefined) {
            return -1;
        }
        let indentation = -1;
        let text = SourceFile__from_ast.Text(sourceFile);
        let tabSize = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).formatSettings.EditorSettings.TabSize;
        let last: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
        if (tabSize <= 0) {
            tabSize = 4;
        }
        const __gotots_range_9 = NodeList__from_ast.$storageOf(((members ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_9.length; __gotots_range_index_5++) {
            const __gotots_range_value_16 = __gotots_range_9.get(__gotots_range_index_5);
            let member: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_16;
            if (member === undefined) {
                continue;
            }
            if (RangeStartPositionsAreOnSameLine__from_printer(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((member ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), sourceFile)) {
                return -1;
            }
            let memberStart = GetStartOfNode__from_astnav(member, sourceFile, false);
            let lineStart = GetLineStartPositionForPosition__from_format(memberStart, sourceFile);
            let column = findIndentationColumn(text, lineStart, memberStart, tabSize);
            if (column < 0) {
                return -1;
            }
            if (indentation >= 0) {
                if (indentation !== column) {
                    return -1;
                }
                last = member;
                continue;
            }
            indentation = column;
            last = member;
        }
        return indentation;
    }
}
export type deletedNode$Storage = {
    sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined;
};
export class deletedNode {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: deletedNode$Storage) {
    }
    public static $storageOf($source: deletedNode): deletedNode$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: deletedNode$Storage): deletedNode {
        return new deletedNode($source);
    }
    public get sourceFile(): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return this.$storage.sourceFile;
    }
    public set sourceFile($value: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) {
        this.$storage.sourceFile = $value;
    }
    public get node(): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return this.$storage.node;
    }
    public set node($value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
        this.$storage.node = $value;
    }
    static $zero(): deletedNode {
        return new deletedNode({
            sourceFile: void 0,
            node: void 0
        });
    }
    static $copy($source: deletedNode): deletedNode {
        return new deletedNode({
            sourceFile: $source.$storage.sourceFile,
            node: $source.$storage.node
        });
    }
    declare private readonly then?: never;
}
export function NewTracker(ctx: GoInterface | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, formatOptions: FormatCodeSettings__from_lsutil, converters: {
    value: Converters__from_lsconv;
} | undefined): Tracker | undefined {
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = NewEmitContext__from_printer();
    let newLine = NewLineKind_GetNewLineCharacter__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine);
    ctx = WithFormatCodeSettings__from_format(ctx, FormatCodeSettings__from_lsutil.$copy(formatOptions), newLine);
    const __gotots_field_0 = emitContext;
    const __gotots_store_0 = ((emitContext ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Factory ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
    const __gotots_field_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeFactory");
    return new Tracker(FormatCodeSettings__from_lsutil.$copy(formatOptions), newLine, converters, ctx, __gotots_field_0, __gotots_field_1, tsonicTypeScriptRuntime.location<MultiMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit | undefined>>(MultiMap__from_collections.$fromStorage<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, trackerEdit | undefined>({
        M: GoMap.nil()
    })), RuntimeSlice.nil<deletedNode$Storage>(), $goMap$MapOf_PointerTo_Named_ast$Node_To_PointerTo_Named_change$nodesInsertedAtStartState.make(0, []), void 0);
}
export function getMembersOrProperties(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined {
    if (IsObjectLiteralExpression__from_ast(node)) {
        return Node__from_ast.PropertyList(node);
    }
    return Node__from_ast.MemberList(node);
}
export function rangeContainsRangeExclusive(outer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, inner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.Pos(outer) < Node__from_ast.Pos(inner) && Node__from_ast.End(inner) < Node__from_ast.End(outer);
}
export function isSeparator(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, candidate: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(candidate === undefined) && !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && (Node__from_ast.$storageOf(((candidate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast() || (Node__from_ast.$storageOf(((candidate ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast() && Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindObjectLiteralExpression$constant__from_ast()));
}
export function findIndentationColumn(text: gostring, lineStart: int, memberStart: int, tabSize: int): int {
    let column = 0;
    for (let i = lineStart; i < memberStart && i < text.length; i++) {
        let ch = goStringIndex(text, i);
        if (IsLineBreak__from_stringutil(ch)) {
            return -1;
        }
        if (IsWhiteSpaceSingleLine__from_stringutil(ch)) {
            column = advanceIndentationColumn(column, ch, tabSize);
            continue;
        }
        return column;
    }
    return column;
}
export function advanceIndentationColumn(column: int, ch: int32, tabSize: int): int {
    if (ch === 9) {
        return column + tabSize - (goNumberIntegerRemainder(column, tabSize));
    }
    return column + 1;
}
