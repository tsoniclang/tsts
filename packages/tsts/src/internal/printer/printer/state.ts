import type { bool, int, uint } from "../../../go/scalars.js";
import type { GoMap, GoPtr } from "../../../go/compat.js";
import type { SourceFile } from "../../ast/ast.js";
import type { Node, NodeList } from "../../ast/spine.js";
import type { IdentifierNode, TokenNode } from "../../ast/generated/unions.js";
import type { Symbol } from "../../ast/symbol.js";
import type { Arena } from "../../core/arena.js";
import type { NewLineKind, ScriptTarget } from "../../core/compileroptions.js";
import type { Stack } from "../../core/stack.js";
import type { TextRange } from "../../core/text.js";
import type { Generator, SourceIndex } from "../../sourcemap/generator.js";
import type { Source } from "../../sourcemap/source.js";
import type { EmitContext } from "../emitcontext.js";
import type { EmitFlags } from "../emitflags.js";
import type { EmitTextWriter } from "../emittextwriter.js";
import type { NameGenerator } from "../namegenerator.js";
import type { lineCharacterCache } from "../utilities.js";

import type { GoFunc, GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::PrinterOptions","kind":"type","status":"implemented","sigHash":"e05c9b3336abcef2ef37a751378d949c3d6e7064f9bce544fdcba0c8fa66a958"}
 *
 * Go source:
 * PrinterOptions struct {
 * 	RemoveComments bool
 * 	NewLine        core.NewLineKind
 * 	// OmitTrailingSemicolon         bool
 * 	NoEmitHelpers bool
 * 	// Module                        core.ModuleKind
 * 	// ModuleResolution              core.ModuleResolutionKind
 * 	Target                      core.ScriptTarget
 * 	SourceMap                   bool
 * 	InlineSourceMap             bool
 * 	InlineSources               bool
 * 	OmitBraceSourceMapPositions bool
 * 	// ExtendedDiagnostics           bool
 * 	OnlyPrintJSDocStyle bool
 * 	NeverAsciiEscape    bool
 * 	// StripInternal                 bool
 * 	PreserveSourceNewlines        bool
 * 	TerminateUnterminatedLiterals bool // !!!
 * }
 */
export interface PrinterOptions {
  RemoveComments: bool;
  NewLine: NewLineKind;
  NoEmitHelpers: bool;
  Target: ScriptTarget;
  SourceMap: bool;
  InlineSourceMap: bool;
  InlineSources: bool;
  OmitBraceSourceMapPositions: bool;
  OnlyPrintJSDocStyle: bool;
  NeverAsciiEscape: bool;
  PreserveSourceNewlines: bool;
  TerminateUnterminatedLiterals: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::PrintHandlers","kind":"type","status":"implemented","sigHash":"f62453a560569c829ada5cc0c2ce8be833c1ef6e0d4250c4acb1617c7e4cdc55"}
 *
 * Go source:
 * PrintHandlers struct {
 * 	// A hook used by the Printer when generating unique names to avoid collisions with
 * 	// globally defined names that exist outside of the current source file.
 * 	HasGlobalName func(name string) bool
 * 
 * 	// !!!
 * 	////// A hook used by the Printer to provide notifications prior to emitting a node. A
 * 	////// compatible implementation **must** invoke `emitCallback` with the provided `hint` and
 * 	////// `node` values.
 * 	////// @param hint A hint indicating the intended purpose of the node.
 * 	////// @param node The node to emit.
 * 	////// @param emitCallback A callback that, when invoked, will emit the node.
 * 	////// @example
 * 	////// ```ts
 * 	////// var printer = createPrinter(printerOptions, {
 * 	//////   onEmitNode(hint, node, emitCallback) {
 * 	//////     // set up or track state prior to emitting the node...
 * 	//////     emitCallback(hint, node);
 * 	//////     // restore state after emitting the node...
 * 	//////   }
 * 	////// });
 * 	////// ```
 * 	////OnEmitNode func(hint EmitHint, node *ast.Node, emitCallback func(hint EmitHint, node *ast.Node))
 * 
 * 	// !!!
 * 	////// A hook used to check if an emit notification is required for a node.
 * 	////// @param node The node to emit.
 * 	////IsEmitNotificationEnabled func(node *ast.Node) bool
 * 
 * 	// !!!
 * 	////// A hook used by the Printer to perform just-in-time substitution of a node. This is
 * 	////// primarily used by node transformations that need to substitute one node for another,
 * 	////// such as replacing `myExportedVar` with `exports.myExportedVar`.
 * 	////// @param hint A hint indicating the intended purpose of the node.
 * 	////// @param node The node to emit.
 * 	////// @example
 * 	////// ```ts
 * 	////// var printer = createPrinter(printerOptions, {
 * 	//////   substituteNode(hint, node) {
 * 	//////     // perform substitution if necessary...
 * 	//////     return node;
 * 	//////   }
 * 	////// });
 * 	////// ```
 * 	////SubstituteNode func(hint EmitHint, node *ast.Node) *ast.Node
 * 
 * 	// !!!
 * 	////OnEmitSourceMapOfNode func(hint EmitHint, node *ast.Node, emitCallback func(hint EmitHint, node *ast.Node))
 * 	////OnEmitSourceMapOfToken func(nodeOpt *ast.Node | undefined, token: ast.Kind, writeKind WriteKind, pos int, emitCallback func(token ast.Kind, writeKind WriteKind, pos int) int) int
 * 	////OnEmitSourceMapOfPosition func(pos int)
 * 
 * 	OnBeforeEmitNode     func(nodeOpt *ast.Node)
 * 	OnAfterEmitNode      func(nodeOpt *ast.Node)
 * 	OnBeforeEmitNodeList func(nodesOpt *ast.NodeList)
 * 	OnAfterEmitNodeList  func(nodesOpt *ast.NodeList)
 * 	OnBeforeEmitToken    func(nodeOpt *ast.TokenNode)
 * 	OnAfterEmitToken     func(nodeOpt *ast.TokenNode)
 * }
 */
export interface PrintHandlers {
  HasGlobalName: GoFunc<(name: string) => bool>;
  OnBeforeEmitNode: GoFunc<(nodeOpt: GoPtr<Node>) => void>;
  OnAfterEmitNode: GoFunc<(nodeOpt: GoPtr<Node>) => void>;
  OnBeforeEmitNodeList: GoFunc<(nodesOpt: GoPtr<NodeList>) => void>;
  OnAfterEmitNodeList: GoFunc<(nodesOpt: GoPtr<NodeList>) => void>;
  OnBeforeEmitToken: GoFunc<(nodeOpt: GoPtr<TokenNode>) => void>;
  OnAfterEmitToken: GoFunc<(nodeOpt: GoPtr<TokenNode>) => void>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::Printer","kind":"type","status":"implemented","sigHash":"fcfaf25a4675b1c48962bca97058109f3fc983a6115ab3083bfaa783c635607e"}
 *
 * Go source:
 * Printer struct {
 * 	PrintHandlers
 * 	Options                           PrinterOptions
 * 	emitContext                       *EmitContext
 * 	currentSourceFile                 *ast.SourceFile
 * 	uniqueHelperNames                 map[string]*ast.IdentifierNode
 * 	externalHelpersModuleName         *ast.IdentifierNode
 * 	nextListElementPos                int
 * 	writer                            EmitTextWriter
 * 	ownWriter                         EmitTextWriter
 * 	writeKind                         WriteKind
 * 	sourceMapsDisabled                bool
 * 	sourceMapGenerator                *sourcemap.Generator
 * 	sourceMapSource                   sourcemap.Source
 * 	sourceMapSourceIndex              sourcemap.SourceIndex
 * 	sourceMapSourceIsJson             bool
 * 	sourceMapLineCharCache            *lineCharacterCache
 * 	mostRecentSourceMapSource         sourcemap.Source
 * 	mostRecentSourceMapSourceIndex    sourcemap.SourceIndex
 * 	containerPos                      int
 * 	containerEnd                      int
 * 	declarationListContainerEnd       int
 * 	detachedCommentsInfo              core.Stack[detachedCommentsInfo]
 * 	commentsDisabled                  bool
 * 	inExtends                         bool // whether we are emitting the `extends` clause of a ConditionalTypeNode or InferTypeNode
 * 	nameGenerator                     NameGenerator
 * 	makeFileLevelOptimisticUniqueName func(string) string
 * 	commentStateArena                 core.Arena[commentState]
 * 	sourceMapStateArena               core.Arena[sourceMapState]
 * 	IdToSymbol                        map[*ast.IdentifierNode]*ast.Symbol
 * }
 */
export interface Printer {
  __tsgoEmbedded0: PrintHandlers;
  Options: PrinterOptions;
  emitContext: GoPtr<EmitContext>;
  currentSourceFile: GoPtr<SourceFile>;
  uniqueHelperNames: GoMap<string, GoPtr<IdentifierNode>>;
  externalHelpersModuleName: GoPtr<IdentifierNode>;
  nextListElementPos: int;
  writer: GoInterface<EmitTextWriter>;
  ownWriter: GoInterface<EmitTextWriter>;
  writeKind: WriteKind;
  sourceMapsDisabled: bool;
  sourceMapGenerator: GoPtr<Generator>;
  sourceMapSource: GoInterface<Source>;
  sourceMapSourceIndex: SourceIndex;
  sourceMapSourceIsJson: bool;
  sourceMapLineCharCache: GoPtr<lineCharacterCache>;
  mostRecentSourceMapSource: GoInterface<Source>;
  mostRecentSourceMapSourceIndex: SourceIndex;
  containerPos: int;
  containerEnd: int;
  declarationListContainerEnd: int;
  detachedCommentsInfo: Stack<detachedCommentsInfo>;
  commentsDisabled: bool;
  inExtends: bool;
  nameGenerator: NameGenerator;
  makeFileLevelOptimisticUniqueName: GoFunc<(arg0: string) => string>;
  commentStateArena: Arena<commentState>;
  sourceMapStateArena: Arena<sourceMapState>;
  IdToSymbol: GoMap<GoPtr<IdentifierNode>, GoPtr<Symbol>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::detachedCommentsInfo","kind":"type","status":"implemented","sigHash":"3970aa080ef2767a66f0ee8df2f09b615abadff9afcf0f8c56887e6060a4cd67"}
 *
 * Go source:
 * detachedCommentsInfo struct {
 * 	nodePos               int
 * 	detachedCommentEndPos int
 * }
 */
export interface detachedCommentsInfo {
  nodePos: int;
  detachedCommentEndPos: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::commentState","kind":"type","status":"implemented","sigHash":"926dadfcef3fa3f73fe7a8ea8588a46c607cae86d19331c9140ba5968598c517"}
 *
 * Go source:
 * commentState struct {
 * 	emitFlags                   EmitFlags      // holds the emit flags for the current node
 * 	commentRange                core.TextRange // holds the comment range calculated for the current node
 * 	containerPos                int            // captures the value of containerPos prior to entering an node
 * 	containerEnd                int            // captures the value of containerEnd prior to entering an node
 * 	declarationListContainerEnd int            // captures the value of declarationListContainerEnd prior to entering an node
 * }
 */
export interface commentState {
  emitFlags: EmitFlags;
  commentRange: TextRange;
  containerPos: int;
  containerEnd: int;
  declarationListContainerEnd: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::sourceMapState","kind":"type","status":"implemented","sigHash":"a68ff8de837fa3fc6a6f9ad5ab796aaa2b65a8e5366cdc0741f1fb9c2a95ae9d"}
 *
 * Go source:
 * sourceMapState struct {
 * 	emitFlags              EmitFlags      // holds the emit flags for the current node
 * 	sourceMapRange         core.TextRange // holds the source map range calculated for the current node
 * 	hasTokenSourceMapRange bool           // captures whether the source map range was set for the current node
 * }
 */
export interface sourceMapState {
  emitFlags: EmitFlags;
  sourceMapRange: TextRange;
  hasTokenSourceMapRange: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::printerState","kind":"type","status":"implemented","sigHash":"11057588982d3f230c8498bfee870042d0a88f3a4e7698edb227364499229f62"}
 *
 * Go source:
 * printerState struct {
 * 	commentState   *commentState
 * 	sourceMapState *sourceMapState
 * }
 */
export interface printerState {
  commentState: GoPtr<commentState>;
  sourceMapState: GoPtr<sourceMapState>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::WriteKind","kind":"type","status":"implemented","sigHash":"cff0cd2c0ce98ae8e1d007610b529ba1f2cb8488272b8ce547e528877633be17"}
 *
 * Go source:
 * WriteKind int
 */
export type WriteKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::constGroup::WriteKindNone+WriteKindKeyword+WriteKindOperator+WriteKindPunctuation+WriteKindStringLiteral+WriteKindParameter+WriteKindProperty+WriteKindComment+WriteKindLiteral","kind":"constGroup","status":"implemented","sigHash":"f857e88bbd770a526a1409900bf938f7c504daa712f75842be7b9b8a96a57f4f"}
 *
 * Go source:
 * const (
 * 	WriteKindNone WriteKind = iota
 * 	WriteKindKeyword
 * 	WriteKindOperator
 * 	WriteKindPunctuation
 * 	WriteKindStringLiteral
 * 	WriteKindParameter
 * 	WriteKindProperty
 * 	WriteKindComment
 * 	WriteKindLiteral
 * )
 */
export const WriteKindNone: WriteKind = 0;
export const WriteKindKeyword: WriteKind = 1;
export const WriteKindOperator: WriteKind = 2;
export const WriteKindPunctuation: WriteKind = 3;
export const WriteKindStringLiteral: WriteKind = 4;
export const WriteKindParameter: WriteKind = 5;
export const WriteKindProperty: WriteKind = 6;
export const WriteKindComment: WriteKind = 7;
export const WriteKindLiteral: WriteKind = 8;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::commentSeparator","kind":"type","status":"implemented","sigHash":"563a47c13ee551302187f172cb5cde7c504d640dc6e5386babd6b1734cabf941"}
 *
 * Go source:
 * commentSeparator uint32
 */
export type commentSeparator = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::constGroup::commentSeparatorNone+commentSeparatorBefore+commentSeparatorAfter","kind":"constGroup","status":"implemented","sigHash":"a2a79165f3b5e5fbbbc4c2b324ec30896284bed59c16f00ba415b9f8252fad08"}
 *
 * Go source:
 * const (
 * 	commentSeparatorNone commentSeparator = iota
 * 	commentSeparatorBefore
 * 	commentSeparatorAfter
 * )
 */
export const commentSeparatorNone: commentSeparator = 0;
export const commentSeparatorBefore: commentSeparator = 1;
export const commentSeparatorAfter: commentSeparator = 2;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::tokenEmitFlags","kind":"type","status":"implemented","sigHash":"525979afb92adb5c028cfc4227291d6d0c4297954f83a6c3743a31f66fb12de1"}
 *
 * Go source:
 * tokenEmitFlags uint32
 */
export type tokenEmitFlags = uint;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::constGroup::tefNoComments+tefIndentLeadingComments+tefNoSourceMaps+tefNone","kind":"constGroup","status":"implemented","sigHash":"a86d6c8334930890a3002ea14ea47b2d7ea6aadfaff0ddd13d668ae2263ec45d"}
 *
 * Go source:
 * const (
 * 	tefNoComments tokenEmitFlags = 1 << iota
 * 	tefIndentLeadingComments
 * 	tefNoSourceMaps
 * 
 * 	tefNone tokenEmitFlags = 0
 * )
 */
export const tefNoComments: tokenEmitFlags = 1 << 0;
export const tefIndentLeadingComments: tokenEmitFlags = 1 << 1;
export const tefNoSourceMaps: tokenEmitFlags = 1 << 2;
export const tefNone: tokenEmitFlags = 0;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::type::ListFormat","kind":"type","status":"implemented","sigHash":"a4e14d03530120f1663ecbd3e112a96550946479937a20e890b806d00e4d15eb"}
 *
 * Go source:
 * ListFormat int
 */
export type ListFormat = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/printer/printer.go::constGroup::LFNone+LFSingleLine+LFMultiLine+LFPreserveLines+LFLinesMask+LFNotDelimited+LFBarDelimited+LFAmpersandDelimited+LFCommaDelimited+LFAsteriskDelimited+LFDelimitersMask+LFAllowTrailingComma+LFIndented+LFSpaceBetweenBraces+LFSpaceBetweenSiblings+LFBraces+LFParenthesis+LFAngleBrackets+LFSquareBrackets+LFBracketsMask+LFOptionalIfNil+LFOptionalIfEmpty+LFOptional+LFPreferNewLine+LFNoTrailingNewLine+LFNoInterveningComments+LFNoSpaceIfEmpty+LFSingleElement+LFSpaceAfterList+LFModifiers+LFHeritageClauses+LFSingleLineTypeLiteralMembers+LFMultiLineTypeLiteralMembers+LFSingleLineTupleTypeElements+LFMultiLineTupleTypeElements+LFUnionTypeConstituents+LFIntersectionTypeConstituents+LFObjectBindingPatternElements+LFArrayBindingPatternElements+LFObjectLiteralExpressionProperties+LFImportAttributes+LFArrayLiteralExpressionElements+LFCommaListElements+LFCallExpressionArguments+LFNewExpressionArguments+LFTemplateExpressionSpans+LFSingleLineBlockStatements+LFMultiLineBlockStatements+LFVariableDeclarationList+LFSingleLineFunctionBodyStatements+LFMultiLineFunctionBodyStatements+LFClassHeritageClauses+LFClassMembers+LFInterfaceMembers+LFEnumMembers+LFCaseBlockClauses+LFNamedImportsOrExportsElements+LFJsxElementOrFragmentChildren+LFJsxElementAttributes+LFCaseOrDefaultClauseStatements+LFHeritageClauseTypes+LFSourceFileStatements+LFDecorators+LFTypeArguments+LFTypeParameters+LFParameters+LFSingleArrowParameter+LFIndexSignatureParameters+LFJSDocComment+LFImportClauseEntries","kind":"constGroup","status":"implemented","sigHash":"b6a4554872a04b2300e984ead8bb621efc9cdfe93ac9df72242d803e71c69416"}
 *
 * Go source:
 * const (
 * 	LFNone ListFormat = 0
 * 
 * 	// Line separators
 * 	LFSingleLine    ListFormat = 0      // Prints the list on a single line (default).
 * 	LFMultiLine     ListFormat = 1 << 0 // Prints the list on multiple lines.
 * 	LFPreserveLines ListFormat = 1 << 1 // Prints the list using line preservation if possible.
 * 	LFLinesMask     ListFormat = LFSingleLine | LFMultiLine | LFPreserveLines
 * 
 * 	// Delimiters
 * 	LFNotDelimited       ListFormat = 0      // There is no delimiter between list items (default).
 * 	LFBarDelimited       ListFormat = 1 << 2 // Each list item is space-and-bar (" |") delimited.
 * 	LFAmpersandDelimited ListFormat = 1 << 3 // Each list item is space-and-ampersand (" &") delimited.
 * 	LFCommaDelimited     ListFormat = 1 << 4 // Each list item is comma (",") delimited.
 * 	LFAsteriskDelimited  ListFormat = 1 << 5 // Each list item is asterisk ("\n *") delimited, used with JSDoc.
 * 	LFDelimitersMask     ListFormat = LFBarDelimited | LFAmpersandDelimited | LFCommaDelimited | LFAsteriskDelimited
 * 
 * 	LFAllowTrailingComma ListFormat = 1 << 6 // Write a trailing comma (",") if present.
 * 
 * 	// Whitespace
 * 	LFIndented             ListFormat = 1 << 7 // The list should be indented.
 * 	LFSpaceBetweenBraces   ListFormat = 1 << 8 // Inserts a space after the opening brace and before the closing brace.
 * 	LFSpaceBetweenSiblings ListFormat = 1 << 9 // Inserts a space between each sibling node.
 * 
 * 	// Brackets/Braces
 * 	LFBraces         ListFormat = 1 << 10 // The list is surrounded by "{" and "}".
 * 	LFParenthesis    ListFormat = 1 << 11 // The list is surrounded by "(" and ")".
 * 	LFAngleBrackets  ListFormat = 1 << 12 // The list is surrounded by "<" and ">".
 * 	LFSquareBrackets ListFormat = 1 << 13 // The list is surrounded by "[" and "]".
 * 	LFBracketsMask   ListFormat = LFBraces | LFParenthesis | LFAngleBrackets | LFSquareBrackets
 * 
 * 	LFOptionalIfNil   ListFormat = 1 << 14 // Do not emit brackets if the list is nil.
 * 	LFOptionalIfEmpty ListFormat = 1 << 15 // Do not emit brackets if the list is empty.
 * 	LFOptional        ListFormat = LFOptionalIfNil | LFOptionalIfEmpty
 * 
 * 	// Other
 * 	LFPreferNewLine         ListFormat = 1 << 16 // Prefer adding a LineTerminator between synthesized nodes.
 * 	LFNoTrailingNewLine     ListFormat = 1 << 17 // Do not emit a trailing NewLine for a MultiLine list.
 * 	LFNoInterveningComments ListFormat = 1 << 18 // Do not emit comments between each node
 * 	LFNoSpaceIfEmpty        ListFormat = 1 << 19 // If the literal is empty, do not add spaces between braces.
 * 	LFSingleElement         ListFormat = 1 << 20
 * 	LFSpaceAfterList        ListFormat = 1 << 21 // Add space after list
 * 
 * 	// Precomputed Formats
 * 	LFModifiers                    ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments | LFSpaceAfterList
 * 	LFHeritageClauses              ListFormat = LFSingleLine | LFSpaceBetweenSiblings
 * 	LFSingleLineTypeLiteralMembers ListFormat = LFSingleLine | LFSpaceBetweenBraces | LFSpaceBetweenSiblings
 * 	LFMultiLineTypeLiteralMembers  ListFormat = LFMultiLine | LFIndented | LFOptionalIfEmpty
 * 
 * 	LFSingleLineTupleTypeElements       ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFMultiLineTupleTypeElements        ListFormat = LFCommaDelimited | LFIndented | LFSpaceBetweenSiblings | LFMultiLine
 * 	LFUnionTypeConstituents             ListFormat = LFBarDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFIntersectionTypeConstituents      ListFormat = LFAmpersandDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFObjectBindingPatternElements      ListFormat = LFSingleLine | LFAllowTrailingComma | LFSpaceBetweenBraces | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty
 * 	LFArrayBindingPatternElements       ListFormat = LFSingleLine | LFAllowTrailingComma | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty
 * 	LFObjectLiteralExpressionProperties ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty
 * 	LFImportAttributes                  ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty
 * 	LFArrayLiteralExpressionElements    ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFIndented | LFSquareBrackets
 * 	LFCommaListElements                 ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFCallExpressionArguments           ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis
 * 	LFNewExpressionArguments            ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis | LFOptionalIfNil
 * 	LFTemplateExpressionSpans           ListFormat = LFSingleLine | LFNoInterveningComments
 * 	LFSingleLineBlockStatements         ListFormat = LFSpaceBetweenBraces | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFMultiLineBlockStatements          ListFormat = LFIndented | LFMultiLine
 * 	LFVariableDeclarationList           ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFSingleLineFunctionBodyStatements  ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFSpaceBetweenBraces
 * 	LFMultiLineFunctionBodyStatements   ListFormat = LFMultiLine
 * 	LFClassHeritageClauses              ListFormat = LFSingleLine
 * 	LFClassMembers                      ListFormat = LFIndented | LFMultiLine
 * 	LFInterfaceMembers                  ListFormat = LFIndented | LFMultiLine
 * 	LFEnumMembers                       ListFormat = LFCommaDelimited | LFIndented | LFMultiLine
 * 	LFCaseBlockClauses                  ListFormat = LFIndented | LFMultiLine
 * 	LFNamedImportsOrExportsElements     ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFSingleLine | LFSpaceBetweenBraces | LFNoSpaceIfEmpty
 * 	LFJsxElementOrFragmentChildren      ListFormat = LFSingleLine | LFNoInterveningComments
 * 	LFJsxElementAttributes              ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments
 * 	LFCaseOrDefaultClauseStatements     ListFormat = LFIndented | LFMultiLine | LFNoTrailingNewLine | LFOptionalIfEmpty
 * 	LFHeritageClauseTypes               ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFSourceFileStatements              ListFormat = LFMultiLine | LFNoTrailingNewLine
 * 	LFDecorators                        ListFormat = LFMultiLine | LFOptional | LFSpaceAfterList
 * 	LFTypeArguments                     ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional
 * 	LFTypeParameters                    ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional
 * 	LFParameters                        ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis
 * 	LFSingleArrowParameter              ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine
 * 	LFIndexSignatureParameters          ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFIndented | LFSquareBrackets
 * 	LFJSDocComment                      ListFormat = LFMultiLine | LFAsteriskDelimited
 * 	LFImportClauseEntries               ListFormat = LFImportAttributes // Deprecated: Use LFImportAttributes
 * )
 */
export const LFNone: ListFormat = 0;

// Line separators
export const LFSingleLine: ListFormat = 0;      // Prints the list on a single line (default).
export const LFMultiLine: ListFormat = 1 << 0;  // Prints the list on multiple lines.
export const LFPreserveLines: ListFormat = 1 << 1; // Prints the list using line preservation if possible.
export const LFLinesMask: ListFormat = LFSingleLine | LFMultiLine | LFPreserveLines;

// Delimiters
export const LFNotDelimited: ListFormat = 0;       // There is no delimiter between list items (default).
export const LFBarDelimited: ListFormat = 1 << 2;  // Each list item is space-and-bar (" |") delimited.
export const LFAmpersandDelimited: ListFormat = 1 << 3; // Each list item is space-and-ampersand (" &") delimited.
export const LFCommaDelimited: ListFormat = 1 << 4;  // Each list item is comma (",") delimited.
export const LFAsteriskDelimited: ListFormat = 1 << 5; // Each list item is asterisk ("\n *") delimited, used with JSDoc.
export const LFDelimitersMask: ListFormat = LFBarDelimited | LFAmpersandDelimited | LFCommaDelimited | LFAsteriskDelimited;

export const LFAllowTrailingComma: ListFormat = 1 << 6; // Write a trailing comma (",") if present.

// Whitespace
export const LFIndented: ListFormat = 1 << 7;            // The list should be indented.
export const LFSpaceBetweenBraces: ListFormat = 1 << 8;  // Inserts a space after the opening brace and before the closing brace.
export const LFSpaceBetweenSiblings: ListFormat = 1 << 9; // Inserts a space between each sibling node.

// Brackets/Braces
export const LFBraces: ListFormat = 1 << 10;         // The list is surrounded by "{" and "}".
export const LFParenthesis: ListFormat = 1 << 11;    // The list is surrounded by "(" and ")".
export const LFAngleBrackets: ListFormat = 1 << 12;  // The list is surrounded by "<" and ">".
export const LFSquareBrackets: ListFormat = 1 << 13; // The list is surrounded by "[" and "]".
export const LFBracketsMask: ListFormat = LFBraces | LFParenthesis | LFAngleBrackets | LFSquareBrackets;

export const LFOptionalIfNil: ListFormat = 1 << 14;   // Do not emit brackets if the list is nil.
export const LFOptionalIfEmpty: ListFormat = 1 << 15; // Do not emit brackets if the list is empty.
export const LFOptional: ListFormat = LFOptionalIfNil | LFOptionalIfEmpty;

// Other
export const LFPreferNewLine: ListFormat = 1 << 16;         // Prefer adding a LineTerminator between synthesized nodes.
export const LFNoTrailingNewLine: ListFormat = 1 << 17;     // Do not emit a trailing NewLine for a MultiLine list.
export const LFNoInterveningComments: ListFormat = 1 << 18; // Do not emit comments between each node
export const LFNoSpaceIfEmpty: ListFormat = 1 << 19;        // If the literal is empty, do not add spaces between braces.
export const LFSingleElement: ListFormat = 1 << 20;
export const LFSpaceAfterList: ListFormat = 1 << 21; // Add space after list

// Precomputed Formats
export const LFModifiers: ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments | LFSpaceAfterList;
export const LFHeritageClauses: ListFormat = LFSingleLine | LFSpaceBetweenSiblings;
export const LFSingleLineTypeLiteralMembers: ListFormat = LFSingleLine | LFSpaceBetweenBraces | LFSpaceBetweenSiblings;
export const LFMultiLineTypeLiteralMembers: ListFormat = LFMultiLine | LFIndented | LFOptionalIfEmpty;

export const LFSingleLineTupleTypeElements: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFMultiLineTupleTypeElements: ListFormat = LFCommaDelimited | LFIndented | LFSpaceBetweenSiblings | LFMultiLine;
export const LFUnionTypeConstituents: ListFormat = LFBarDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFIntersectionTypeConstituents: ListFormat = LFAmpersandDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFObjectBindingPatternElements: ListFormat = LFSingleLine | LFAllowTrailingComma | LFSpaceBetweenBraces | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty;
export const LFArrayBindingPatternElements: ListFormat = LFSingleLine | LFAllowTrailingComma | LFCommaDelimited | LFSpaceBetweenSiblings | LFNoSpaceIfEmpty;
export const LFObjectLiteralExpressionProperties: ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty;
export const LFImportAttributes: ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFSpaceBetweenBraces | LFIndented | LFBraces | LFNoSpaceIfEmpty;
export const LFArrayLiteralExpressionElements: ListFormat = LFPreserveLines | LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFIndented | LFSquareBrackets;
export const LFCommaListElements: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFCallExpressionArguments: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis;
export const LFNewExpressionArguments: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis | LFOptionalIfNil;
export const LFTemplateExpressionSpans: ListFormat = LFSingleLine | LFNoInterveningComments;
export const LFSingleLineBlockStatements: ListFormat = LFSpaceBetweenBraces | LFSpaceBetweenSiblings | LFSingleLine;
export const LFMultiLineBlockStatements: ListFormat = LFIndented | LFMultiLine;
export const LFVariableDeclarationList: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFSingleLineFunctionBodyStatements: ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFSpaceBetweenBraces;
export const LFMultiLineFunctionBodyStatements: ListFormat = LFMultiLine;
export const LFClassHeritageClauses: ListFormat = LFSingleLine;
export const LFClassMembers: ListFormat = LFIndented | LFMultiLine;
export const LFInterfaceMembers: ListFormat = LFIndented | LFMultiLine;
export const LFEnumMembers: ListFormat = LFCommaDelimited | LFIndented | LFMultiLine;
export const LFCaseBlockClauses: ListFormat = LFIndented | LFMultiLine;
export const LFNamedImportsOrExportsElements: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFAllowTrailingComma | LFSingleLine | LFSpaceBetweenBraces | LFNoSpaceIfEmpty;
export const LFJsxElementOrFragmentChildren: ListFormat = LFSingleLine | LFNoInterveningComments;
export const LFJsxElementAttributes: ListFormat = LFSingleLine | LFSpaceBetweenSiblings | LFNoInterveningComments;
export const LFCaseOrDefaultClauseStatements: ListFormat = LFIndented | LFMultiLine | LFNoTrailingNewLine | LFOptionalIfEmpty;
export const LFHeritageClauseTypes: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFSourceFileStatements: ListFormat = LFMultiLine | LFNoTrailingNewLine;
export const LFDecorators: ListFormat = LFMultiLine | LFOptional | LFSpaceAfterList;
export const LFTypeArguments: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional;
export const LFTypeParameters: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFAngleBrackets | LFOptional;
export const LFParameters: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFParenthesis;
export const LFSingleArrowParameter: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine;
export const LFIndexSignatureParameters: ListFormat = LFCommaDelimited | LFSpaceBetweenSiblings | LFSingleLine | LFIndented | LFSquareBrackets;
export const LFJSDocComment: ListFormat = LFMultiLine | LFAsteriskDelimited;
export const LFImportClauseEntries: ListFormat = LFImportAttributes; // Deprecated: Use LFImportAttributes
