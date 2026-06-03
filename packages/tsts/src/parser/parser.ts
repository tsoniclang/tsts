import type { int } from "@tsonic/core/types.js";
import {
  Kind,
  KindNames,
  NodeFlags,
  createArrowFunction,
  createArrayTypeNode,
  createArrayLiteralExpression,
  createArrayBindingPattern,
  createAsExpression,
  createAwaitExpression,
  createBigIntLiteral,
  createBinaryExpression,
  createBindingElement,
  createBlock,
  createCaseBlock,
  createCaseClause,
  createCatchClause,
  createClassDeclaration,
  createClassStaticBlockDeclaration,
  createComputedPropertyName,
  createConditionalTypeNode,
  createConstructorDeclaration,
  createConstructorTypeNode,
  createDebuggerStatement,
  createDecorator,
  createDeleteExpression,
  createDefaultClause,
  createEmptyStatement,
  createExportAssignment,
  createExportDeclaration,
  createExportSpecifier,
  createExpressionStatement,
  createExpressionWithTypeArguments,
  createExternalModuleReference,
  createBreakStatement,
  createContinueStatement,
  createConditionalExpression,
  createDoStatement,
  createElementAccessExpression,
  createEnumDeclaration,
  createEnumMember,
  createForInStatement,
  createForOfStatement,
  createForStatement,
  createFunctionDeclaration,
  createFunctionExpression,
  createFunctionTypeNode,
  createGetAccessorDeclaration,
  createHeritageClause,
  createIfStatement,
  createIdentifier,
  createIndexedAccessTypeNode,
  createImportAttribute,
  createImportAttributes,
  createImportClause,
  createImportDeclaration,
  createImportEqualsDeclaration,
  createImportSpecifier,
  createImportTypeNode,
  createInferTypeNode,
  createMappedTypeNode,
  createNamedTupleMember,
  createOptionalTypeNode,
  createRestTypeNode,
  createTemplateLiteralTypeNode,
  createTemplateLiteralTypeSpan,
  createIntersectionTypeNode,
  createInterfaceDeclaration,
  createKeywordTypeNode,
  createCallExpression,
  createCallSignatureDeclaration,
  createConstructSignatureDeclaration,
  createIndexSignatureDeclaration,
  createJsxAttribute,
  createJsxAttributes,
  createJsxClosingElement,
  createJsxClosingFragment,
  createJsxElement,
  createJsxExpression,
  createJsxFragment,
  createJsxNamespacedName,
  createJsxOpeningElement,
  createJsxOpeningFragment,
  createJsxSelfClosingElement,
  createJsxSpreadAttribute,
  createJsxText,
  createKeywordExpression,
  createLabeledStatement,
  createLiteralTypeNode,
  createMethodDeclaration,
  createMethodSignatureDeclaration,
  createMissingDeclaration,
  createModuleBlock,
  createModuleDeclaration,
  createNamedExports,
  createNamedImports,
  createNamespaceExportDeclaration,
  createNamespaceImport,
  createNewExpression,
  createNoSubstitutionTemplateLiteral,
  createNonNullExpression,
  createNodeArray,
  createNumericLiteral,
  createObjectLiteralExpression,
  createObjectBindingPattern,
  createParameterDeclaration,
  createParenthesizedExpression,
  createParenthesizedTypeNode,
  createPostfixUnaryExpression,
  createPropertyAssignment,
  createPropertyAccessExpression,
  createPropertyDeclaration,
  createPropertySignatureDeclaration,
  createPrivateIdentifier,
  createPrefixUnaryExpression,
  createQualifiedName,
  createRegularExpressionLiteral,
  createReturnStatement,
  createSatisfiesExpression,
  createSemicolonClassElement,
  createSetAccessorDeclaration,
  createShorthandPropertyAssignment,
  createSpreadElement,
  createSpreadAssignment,
  createSourceFile,
  createStringLiteral,
  createSwitchStatement,
  createTemplateExpression,
  createTemplateHead,
  createTemplateMiddle,
  createTemplateSpan,
  createTemplateTail,
  createThisTypeNode,
  createThrowStatement,
  createToken,
  createTypeAliasDeclaration,
  createTypeAssertion,
  createTypeLiteralNode,
  createTypeOfExpression,
  createTypeOperatorNode,
  createTypeParameterDeclaration,
  createTypePredicateNode,
  createTypeQueryNode,
  createTypeReferenceNode,
  createTryStatement,
  createTupleTypeNode,
  createUnionTypeNode,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
  createVoidExpression,
  createWhileStatement,
  createWithStatement,
  modifiersToFlags,
  isBinaryOperatorToken,
  isExportAssignment,
  isExportDeclaration,
  isExternalModuleReference,
  isIdentifier,
  isImportDeclaration,
  isImportEqualsDeclaration,
  isJsxElement,
  isJsxNamespacedName,
  isJsxOpeningElement,
  tagNamesAreEquivalent,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingName,
  type BindingElement,
  type Block,
  type ConciseBody,
  type ClassElement,
  type CaseOrDefaultClause,
  type AsteriskToken,
  type AssertsKeyword,
  type ColonToken,
  type Decorator,
  type DotDotDotToken,
  type EndOfFile,
  type EqualsGreaterThanToken,
  type EnumMember,
  type Expression,
  type ExpressionWithTypeArguments,
  type EntityName,
  type ExportSpecifier,
  type ForInitializer,
  type HeritageClause,
  type Identifier,
  type ImportAttribute,
  type ImportAttributeName,
  type ImportSpecifier,
  type ImportPhaseModifierSyntaxKind,
  type JsxAttributeLike,
  type JsxAttributeName,
  type JsxAttributeValue,
  type JsxChild,
  type JsxClosingElement,
  type JsxClosingFragment,
  type JsxElement,
  type JsxExpression,
  type JsxOpeningElement,
  type JsxOpeningFragment,
  type JsxSelfClosingElement,
  type JsxTagNameExpression,
  type JsxText,
  type KeywordTypeSyntaxKind,
  type LeftHandSideExpression,
  type ModifierSyntaxKind,
  type ModifierLike,
  type MinusToken,
  type ModuleExportName,
  type ModuleName,
  type ModuleReference,
  type NamedImportBindings,
  type Node,
  type NodeArray,
  type PlusToken,
  type ObjectLiteralElementLike,
  type ParameterDeclaration,
  type ExclamationToken,
  type PrivateIdentifier,
  type PropertyName,
  type QuestionDotToken,
  type QuestionToken,
  type ReadonlyKeyword,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeNode,
  type TemplateMiddleOrTail,
  type TemplateSpan,
  type TemplateLiteralTypeSpan,
  type TypeParameterDeclaration,
  type VariableDeclaration,
} from "../ast/index.js";
// M3 6b: ModifierFlags is imported as a VALUE from the enum module directly (the
// ../ast/index.js re-export is seen as type-only under verbatimModuleSyntax), matching
// how src/ast/utilities.ts / src/checker/utilities.ts consume it.
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { createLiveScanner, skipTrivia, TokenFlags, type LiveScanner, type ScannerState, type ScannedToken } from "../scanner/index.js";
import { getTextOfNodeFromSourceText, tokenIsIdentifierOrKeyword } from "../scanner/utilities.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import { format } from "../diagnostics/diagnostics.js";
import type { Diagnostic, DiagnosticMessage } from "../diagnostics/types.js";
// M3 Stage-5 pre-wave: scriptKind/languageVariant plumbing. tsgo
// initializeState (parser.go:288-313) resolves the effective ScriptKind, derives
// the LanguageVariant via getLanguageVariant, and seeds the scanner with it.
// ScriptKind + getScriptKindFromFileName mirror tsgo core.ScriptKind /
// core.GetScriptKindFromFileName (core/core.go:512); getLanguageVariant +
// LanguageVariant mirror tsgo parser.getLanguageVariant (parser/utilities.go:11)
// returning core.LanguageVariant (core/languagevariant.go).
import { ScriptKind, getScriptKindFromFileName } from "../core/core.js";
import { LanguageVariant, getLanguageVariant, tokenIsIdentifierOrKeywordOrGreaterThan } from "./utilities.js";

export interface ParseSourceFileOptions {
  readonly fileName?: string;
  // tsgo SourceFileParseOptions carries the explicit ScriptKind; initializeState
  // requires a known kind (panics on ScriptKindUnknown). When omitted here, the
  // parser infers it from fileName via getScriptKindFromFileName, exactly like the
  // tsgo program/host pipeline that fills opts.ScriptKind before parsing.
  readonly scriptKind?: ScriptKind;
}

// M3 3b-list-model: parser-internal token snapshot. tsgo carries the
// preceding-line-break status as a SEPARATE p.scanner.HasPrecedingLineBreak()
// method (parser.go:410-412), NOT on a token struct. The closest faithful tsts
// analogue — without polluting the shared scanner ScannedToken (also consumed by
// scanAll/tests) — is a parser-local snapshot that extends ScannedToken with the
// flag, captured at the moment the current token was scanned. The reader
// #hasPrecedingLineBreak() reads THIS snapshot (not the live scanner), because
// #peekKind/#lookAhead move the live scanner independently of the cached #token.
interface TokenSnapshot extends ScannedToken {
  readonly hasPrecedingLineBreak: boolean;
  // M3 4c: the trivia-inclusive full-start of this token (tsgo
  // scanner.TokenFullStart(), read by nodePos()=parser.go nodePos). Captured at
  // the moment this token was scanned, parallel to hasPrecedingLineBreak.
  readonly fullStart: int;
  // M3 6a: the scanner's preceding-JSDoc state for THIS token, captured the
  // moment it was scanned — parallel to hasPrecedingLineBreak. Feeds the
  // withJSDoc flag-stamp (tsgo jsdocScannerInfo, parser.go:414-426), which is
  // read at declaration start (where #nodePos() is taken) so it reflects the
  // token that STARTED the declaration, not a later token.
  readonly hasPrecedingJSDoc: boolean;
  // M3 6a: whether the preceding JSDoc contained an @deprecated tag (tsgo
  // jsdocScannerInfoHasDeprecated). Drives NodeFlags.PossiblyContainsDeprecatedTag.
  readonly hasPrecedingJSDocDeprecated: boolean;
}

// M3 6a: tsgo jsdocScannerInfo (parser.go:56-62), the preceding-JSDoc state
// captured at a declaration-start point and threaded into #withJSDoc. Modeled as
// a plain record (NOT an enum/bitset) carrying only the two TS-reachable bits;
// jsdocScannerInfoHasSeeOrLink is omitted because its only effect is the eager
// @see/@link parse, which is lazy/checker-owned here.
interface JSDocScannerInfo {
  readonly hasJSDoc: boolean;
  readonly hasDeprecated: boolean;
}

// wave 4b-swap: a speculative parse-state snapshot (tsgo ParserState,
// parser.go:349-372). Bundles the live-scanner state with the parser cursor
// (#token), #prevTokenEnd, and #contextFlags so #rewind can restore all of them.
interface ParserMark {
  scannerState: ScannerState;
  token: TokenSnapshot;
  prevTokenEnd: number;
  contextFlags: NodeFlags;
  // codex Stage-3a: snapshot of #diagnostics.length so #rewind can discard any
  // diagnostics pushed during a speculative probe (tsgo ParserState.diagnosticsLen,
  // parser.go:353/366). Inert in 3a (no throw flipped => #diagnostics stays empty).
  diagnosticsLen: int;
  // M3 6b: tsgo ParserState.statementHasAwaitIdentifier (parser.go:345/357/370) — a
  // speculative probe that builds an `await` identifier must not leak the flag into
  // the rewound cursor, so it is snapshot here and restored by #rewind.
  statementHasAwaitIdentifier: boolean;
}

const binaryPrecedence = new Map<Kind, number>([
  [Kind.AsteriskAsteriskToken, 14],
  [Kind.AsteriskToken, 13],
  [Kind.SlashToken, 13],
  [Kind.PercentToken, 13],
  [Kind.PlusToken, 12],
  [Kind.MinusToken, 12],
  [Kind.LessThanLessThanToken, 11],
  [Kind.GreaterThanGreaterThanToken, 11],
  [Kind.GreaterThanGreaterThanGreaterThanToken, 11],
  [Kind.LessThanToken, 10],
  [Kind.LessThanEqualsToken, 10],
  [Kind.GreaterThanToken, 10],
  [Kind.GreaterThanEqualsToken, 10],
  [Kind.InstanceOfKeyword, 10],
  [Kind.InKeyword, 10],
  [Kind.EqualsEqualsToken, 9],
  [Kind.EqualsEqualsEqualsToken, 9],
  [Kind.ExclamationEqualsToken, 9],
  [Kind.ExclamationEqualsEqualsToken, 9],
  [Kind.AmpersandToken, 8],
  [Kind.CaretToken, 7],
  [Kind.BarToken, 6],
  [Kind.AmpersandAmpersandToken, 5],
  [Kind.BarBarToken, 4],
  [Kind.QuestionQuestionToken, 4],
  [Kind.EqualsToken, 3],
  [Kind.PlusEqualsToken, 3],
  [Kind.MinusEqualsToken, 3],
  [Kind.AsteriskEqualsToken, 3],
  [Kind.AsteriskAsteriskEqualsToken, 3],
  [Kind.SlashEqualsToken, 3],
  [Kind.PercentEqualsToken, 3],
  [Kind.AmpersandEqualsToken, 3],
  [Kind.BarEqualsToken, 3],
  [Kind.CaretEqualsToken, 3],
  [Kind.LessThanLessThanEqualsToken, 3],
  [Kind.GreaterThanGreaterThanEqualsToken, 3],
  [Kind.GreaterThanGreaterThanGreaterThanEqualsToken, 3],
  [Kind.AmpersandAmpersandEqualsToken, 3],
  [Kind.BarBarEqualsToken, 3],
  [Kind.QuestionQuestionEqualsToken, 3],
]);

// M3 3b-list-model: faithful 1:1 port of tsgo ast.OperatorPrecedence ordinals
// (precedence.go:9-186, the `iota` scale). These are the numeric ordinals matching
// tsgo's iota — NOT the denser binaryPrecedence Map scale below. Named consts make
// getBinaryOperatorPrecedence read faithfully against precedence.go. NOTE tsgo
// defines OperatorPrecedenceCoalesce = OperatorPrecedenceLogicalOR (precedence.go:183),
// so both `??` and `||` return 5 — faithful.
const OperatorPrecedenceLogicalOR = 5;
const OperatorPrecedenceCoalesce = OperatorPrecedenceLogicalOR;
const OperatorPrecedenceLogicalAND = 6;
const OperatorPrecedenceBitwiseOR = 7;
const OperatorPrecedenceBitwiseXOR = 8;
const OperatorPrecedenceBitwiseAND = 9;
const OperatorPrecedenceEquality = 10;
const OperatorPrecedenceRelational = 11;
const OperatorPrecedenceShift = 12;
const OperatorPrecedenceAdditive = 13;
const OperatorPrecedenceMultiplicative = 14;
const OperatorPrecedenceExponentiation = 15;
const OperatorPrecedenceInvalid = -1;

// M3 3b-list-model: PURE, ADDITIVE faithful 1:1 port of tsgo
// ast.GetBinaryOperatorPrecedence (precedence.go:336-367). Used ONLY as a
// predicate source — consumed by #isBinaryOperator (parser.go:6275-6280) /
// #isStartOfExpression this wave. This is a SEPARATE function from the
// binaryPrecedence Map above (which drives the binary LOOP on a DIFFERENT, denser
// scale and is NOT touched per codex-204517). KindCommaToken is intentionally not
// a case — it falls through to OperatorPrecedenceInvalid (-1), matching tsgo.
function getBinaryOperatorPrecedence(kind: Kind): number {
  switch (kind) {
    case Kind.QuestionQuestionToken:
      return OperatorPrecedenceCoalesce;
    case Kind.BarBarToken:
      return OperatorPrecedenceLogicalOR;
    case Kind.AmpersandAmpersandToken:
      return OperatorPrecedenceLogicalAND;
    case Kind.BarToken:
      return OperatorPrecedenceBitwiseOR;
    case Kind.CaretToken:
      return OperatorPrecedenceBitwiseXOR;
    case Kind.AmpersandToken:
      return OperatorPrecedenceBitwiseAND;
    case Kind.EqualsEqualsToken:
    case Kind.ExclamationEqualsToken:
    case Kind.EqualsEqualsEqualsToken:
    case Kind.ExclamationEqualsEqualsToken:
      return OperatorPrecedenceEquality;
    case Kind.LessThanToken:
    case Kind.GreaterThanToken:
    case Kind.LessThanEqualsToken:
    case Kind.GreaterThanEqualsToken:
    case Kind.InstanceOfKeyword:
    case Kind.InKeyword:
    case Kind.AsKeyword:
    case Kind.SatisfiesKeyword:
      return OperatorPrecedenceRelational;
    case Kind.LessThanLessThanToken:
    case Kind.GreaterThanGreaterThanToken:
    case Kind.GreaterThanGreaterThanGreaterThanToken:
      return OperatorPrecedenceShift;
    case Kind.PlusToken:
    case Kind.MinusToken:
      return OperatorPrecedenceAdditive;
    case Kind.AsteriskToken:
    case Kind.SlashToken:
    case Kind.PercentToken:
      return OperatorPrecedenceMultiplicative;
    case Kind.AsteriskAsteriskToken:
      return OperatorPrecedenceExponentiation;
    default:
      return OperatorPrecedenceInvalid;
  }
}

// M3 3b-list-model: faithful 1:1 port of tsgo's ParsingContext iota
// (parser.go:19-47). NO TS enum (per no-enums policy) — each context is a NUMERIC
// ordinal const so the `1 << kind` bitset matches tsgo exactly. The full 26-wide
// model is ported (JSX 13/14 and JSDoc 17/25 included for a faithful bitset and
// isInSomeParsingContext loop) even though tsts has no JSX/JSDoc parser: those arms
// are present-but-UNREACHABLE (no loop ever runs with those kinds).
type ParsingContext = number;
const PCSourceElements: ParsingContext = 0;
const PCBlockStatements: ParsingContext = 1;
const PCSwitchClauses: ParsingContext = 2;
const PCSwitchClauseStatements: ParsingContext = 3;
const PCTypeMembers: ParsingContext = 4;
const PCClassMembers: ParsingContext = 5;
const PCEnumMembers: ParsingContext = 6;
const PCHeritageClauseElement: ParsingContext = 7;
const PCVariableDeclarations: ParsingContext = 8;
const PCObjectBindingElements: ParsingContext = 9;
const PCArrayBindingElements: ParsingContext = 10;
const PCArgumentExpressions: ParsingContext = 11;
const PCObjectLiteralMembers: ParsingContext = 12;
const PCJsxAttributes: ParsingContext = 13;
const PCJsxChildren: ParsingContext = 14;
const PCArrayLiteralMembers: ParsingContext = 15;
const PCParameters: ParsingContext = 16;
const PCJSDocParameters: ParsingContext = 17;
const PCRestProperties: ParsingContext = 18;
const PCTypeParameters: ParsingContext = 19;
const PCTypeArguments: ParsingContext = 20;
const PCTupleElementTypes: ParsingContext = 21;
const PCHeritageClauses: ParsingContext = 22;
const PCImportOrExportSpecifiers: ParsingContext = 23;
const PCImportAttributes: ParsingContext = 24;
const PCJSDocComment: ParsingContext = 25;
const PCCount = 26;

const modifierKinds = new Set<Kind>([
  Kind.AbstractKeyword,
  Kind.ExportKeyword,
  Kind.AsyncKeyword,
  Kind.DeclareKeyword,
  Kind.PrivateKeyword,
  Kind.ProtectedKeyword,
  Kind.PublicKeyword,
  Kind.ReadonlyKeyword,
  Kind.OverrideKeyword,
  Kind.StaticKeyword,
]);

const keywordTypeKinds = new Set<Kind>([
  Kind.AnyKeyword,
  Kind.BigIntKeyword,
  Kind.BooleanKeyword,
  Kind.IntrinsicKeyword,
  Kind.NeverKeyword,
  Kind.NumberKeyword,
  Kind.ObjectKeyword,
  Kind.StringKeyword,
  Kind.SymbolKeyword,
  Kind.UndefinedKeyword,
  Kind.UnknownKeyword,
  Kind.VoidKeyword,
]);

// codex Stage-3a: faithful port of tsgo scanner.go textToToken (124-189) ∪
// textToKeyword (36-122), inverted into tokenToText (scanner.go:2213-2219) and
// surfaced via tokenToString (scanner.go:2221-2223). Used as the `{0}` arg to
// Diagnostics.X_0_expected. The scanner.nativePreview.ts tokenToString is NOT
// usable here (that file is excluded from the build, tsconfig.json), so the map
// is rebuilt locally: punctuation lexemes from tsgo textToToken plus keyword
// stems derived from KindNames (matching scanner.ts textToKeyword, scanner.go:36).
const tokenToText: ReadonlyMap<Kind, string> = (() => {
  const m = new Map<Kind, string>();
  // tsgo textToToken punctuation entries (scanner.go:125-187).
  const punctuation: ReadonlyArray<readonly [string, Kind]> = [
    ["{", Kind.OpenBraceToken],
    ["}", Kind.CloseBraceToken],
    ["(", Kind.OpenParenToken],
    [")", Kind.CloseParenToken],
    ["[", Kind.OpenBracketToken],
    ["]", Kind.CloseBracketToken],
    [".", Kind.DotToken],
    ["...", Kind.DotDotDotToken],
    [";", Kind.SemicolonToken],
    [",", Kind.CommaToken],
    ["<", Kind.LessThanToken],
    [">", Kind.GreaterThanToken],
    ["<=", Kind.LessThanEqualsToken],
    [">=", Kind.GreaterThanEqualsToken],
    ["==", Kind.EqualsEqualsToken],
    ["!=", Kind.ExclamationEqualsToken],
    ["===", Kind.EqualsEqualsEqualsToken],
    ["!==", Kind.ExclamationEqualsEqualsToken],
    ["=>", Kind.EqualsGreaterThanToken],
    ["+", Kind.PlusToken],
    ["-", Kind.MinusToken],
    ["**", Kind.AsteriskAsteriskToken],
    ["*", Kind.AsteriskToken],
    ["/", Kind.SlashToken],
    ["%", Kind.PercentToken],
    ["++", Kind.PlusPlusToken],
    ["--", Kind.MinusMinusToken],
    ["<<", Kind.LessThanLessThanToken],
    ["</", Kind.LessThanSlashToken],
    [">>", Kind.GreaterThanGreaterThanToken],
    [">>>", Kind.GreaterThanGreaterThanGreaterThanToken],
    ["&", Kind.AmpersandToken],
    ["|", Kind.BarToken],
    ["^", Kind.CaretToken],
    ["!", Kind.ExclamationToken],
    ["~", Kind.TildeToken],
    ["&&", Kind.AmpersandAmpersandToken],
    ["||", Kind.BarBarToken],
    ["?", Kind.QuestionToken],
    ["??", Kind.QuestionQuestionToken],
    ["?.", Kind.QuestionDotToken],
    [":", Kind.ColonToken],
    ["=", Kind.EqualsToken],
    ["+=", Kind.PlusEqualsToken],
    ["-=", Kind.MinusEqualsToken],
    ["*=", Kind.AsteriskEqualsToken],
    ["**=", Kind.AsteriskAsteriskEqualsToken],
    ["/=", Kind.SlashEqualsToken],
    ["%=", Kind.PercentEqualsToken],
    ["<<=", Kind.LessThanLessThanEqualsToken],
    [">>=", Kind.GreaterThanGreaterThanEqualsToken],
    [">>>=", Kind.GreaterThanGreaterThanGreaterThanEqualsToken],
    ["&=", Kind.AmpersandEqualsToken],
    ["|=", Kind.BarEqualsToken],
    ["^=", Kind.CaretEqualsToken],
    ["||=", Kind.BarBarEqualsToken],
    ["&&=", Kind.AmpersandAmpersandEqualsToken],
    ["??=", Kind.QuestionQuestionEqualsToken],
    ["@", Kind.AtToken],
    ["#", Kind.HashToken],
    ["`", Kind.BacktickToken],
  ];
  // tsgo tokenToText inverts textToToken: last write per kind wins. Keywords are
  // copied in after punctuation (maps.Copy(m, textToKeyword), scanner.go:188), so
  // seed punctuation first, then keyword stems.
  for (const [text, kind] of punctuation) {
    m.set(kind, text);
  }
  for (let i = 0; i < KindNames.length; i++) {
    const name = KindNames[i]!;
    if (name.endsWith("Keyword")) {
      const stem = name.slice(0, -"Keyword".length);
      m.set(i as Kind, stem.toLowerCase());
    }
  }
  return m;
})();

// codex Stage-3a: tsgo scanner.TokenToString (scanner.go:2221-2223) — the lexeme
// for a punctuation/keyword Kind, or undefined for tokens with no fixed text
// (identifiers, literals). Top-level helper (no `this` coupling) per the plan.
// codex Stage-3b: wired to throw sites in 3b.
function tokenToString(kind: Kind): string | undefined {
  return tokenToText.get(kind);
}

function kindDebugName(kind: Kind): string {
  return String(kind);
}

export class Parser {
  readonly #sourceText: string;
  readonly #fileName: string;
  // wave 4b-swap: live-scanner cursor mirroring tsgo's Parser (`p.scanner` +
  // single `p.token` snapshot, parser.go:381-388). #token is the CURRENT token
  // (the not-yet-consumed token), rebuilt by #nextToken from the live scanner.
  // #prevTokenEnd is the end of the JUST-consumed token (seeded 0), the source
  // of #nodeEnd (token-tight, NOT trivia-inclusive — codex-048 (i)).
  readonly #scanner: LiveScanner;
  #token: TokenSnapshot;
  #prevTokenEnd = 0;
  // codex-054 M3 Stage-2: parser parse-state mirroring tsgo's `p.contextFlags`
  // (parser.go contextFlags field). This is a NodeFlags bitset of the parsing
  // contexts (Yield/Await/DisallowIn/DisallowConditionalTypes/Decorator/InWith)
  // currently in effect; #finishNode ORs it into each node's flags exactly like
  // tsgo finishNodeWithEnd `node.Flags |= p.contextFlags` (parser.go:5910). It is
  // the one allowed mutable parse-state field alongside #token/#prevTokenEnd
  // (NOT a binder slot).
  // INITIALIZED BY scriptKind: tsgo initializeState (parser.go:302-309) seeds
  // contextFlags from the script kind — JS/JSX => NodeFlagsJavaScriptFile,
  // JSON => JavaScriptFile|JsonFile, default (TS/TSX/.d.ts) => None. tsonic only
  // emits TS/TSX, so the JS/JSON arms stay unreached, but the variant plumbing
  // (M3 Stage-5 pre-wave) now resolves the effective ScriptKind faithfully; the
  // TS/TSX `default` arm keeps contextFlags at NodeFlags.None (the field default).
  #contextFlags: NodeFlags = NodeFlags.None;
  // M3 Stage-5 pre-wave: the resolved ScriptKind for this parse (tsgo
  // p.scriptKind, parser.go:300) and the LanguageVariant derived from it (tsgo
  // p.languageVariant = getLanguageVariant(p.scriptKind), parser.go:301). Both are
  // resolved in the constructor (tsgo initializeState) and stamped onto the
  // SourceFile (tsgo NewSourceFile carries scriptKind + languageVariant). They are
  // parse-config (set once at init), not mutable parse-state.
  readonly #scriptKind: ScriptKind;
  readonly #languageVariant: LanguageVariant;
  // codex Stage-3a: parser-owned diagnostics buffer (tsgo p.diagnostics,
  // parser.go:319-336). ADDITIVE: populated only when throw sites are flipped in
  // 3b; empty in 3a. The `readonly` binding is mutated in-place (push/length
  // truncate) — same controlled mutable-compiler-state category as #token /
  // #prevTokenEnd / #contextFlags (parse-state, NOT a binder slot).
  readonly #diagnostics: Diagnostic[] = [];
  // M3 3b-list-model: the bitset of currently-active parsing contexts (tsgo
  // Parser.parsingContexts, parser.go:80). One new mutable parse-state field, same
  // controlled category as #token/#contextFlags. parseList/parseDelimitedList/
  // parseBracketedList set `1 << kind` while iterating and restore on exit;
  // isInSomeParsingContext reads it to decide whether to abort a recovering list.
  #parsingContexts: number = 0;
  // M3 6b top-level-await reparse: tsgo p.statementHasAwaitIdentifier (parser.go:81).
  // Set true by #newIdentifier whenever it builds an identifier whose text is "await"
  // (i.e. with AwaitContext OFF, a leading `await x` mis-parses `await` as an
  // Identifier). Reset per top-level statement by #parseToplevelStatement; saved/
  // restored around nested-expression productions (class/enum/module/import/export/
  // property-name/function-block/binding-identifier) exactly as tsgo, so a span is
  // recorded ONLY when the await-identifier is at the statement's own top level.
  // Same controlled mutable parse-state category as #token/#contextFlags.
  #statementHasAwaitIdentifier: boolean = false;
  // M3 6b: tsgo p.possibleAwaitSpans (parser.go:91). A flat array of PAIRED
  // [startIndex, endIndex) statement-index spans recorded by #parseToplevelStatement
  // for every top-level statement that contained an `await` identifier (outside
  // AwaitContext). Consumed by #reparseTopLevelAwait. Same parse-state category.
  #possibleAwaitSpans: int[] = [];

  constructor(sourceText: string, options: ParseSourceFileOptions = {}) {
    this.#sourceText = sourceText;
    this.#fileName = options.fileName ?? "input.ts";
    // M3 Stage-5 pre-wave — tsgo initializeState (parser.go:300-301): resolve the
    // effective ScriptKind (explicit option wins; otherwise infer from fileName via
    // the shared getScriptKindFromFileName helper — NOT JSX-local logic), then
    // derive the LanguageVariant with getLanguageVariant. ScriptKind is the ONLY
    // source of truth for the variant (no text heuristic, no separate jsx flag).
    this.#scriptKind = options.scriptKind ?? getScriptKindFromFileName(options.fileName ?? "");
    this.#languageVariant = getLanguageVariant(this.#scriptKind);
    // tsgo initializeState (parser.go:288-313): create the scanner, then call
    // nextToken() ONCE (parser.go:283/139) to load the first token into #token
    // before parseSourceFile runs. tsts only emits TS/TSX so #contextFlags starts
    // at NodeFlags.None (the field default — the JS/JSON arms stay unreached).
    this.#scanner = createLiveScanner(sourceText);
    // tsgo p.scanner.SetLanguageVariant(p.languageVariant) (parser.go:312): seed
    // the live scanner with the resolved variant so a .tsx/ScriptKindTSX parse
    // reaches LanguageVariant.JSX (JSX scanner mode), faithful to tsgo.
    this.#scanner.setLanguageVariant(this.#languageVariant);
    // Seed #token with the EOF placeholder so #nextToken's `this.#token.end`
    // read is well-typed; #nextToken immediately overwrites it with the first
    // real token (and #prevTokenEnd stays 0 because the placeholder end is 0).
    this.#token = { kind: Kind.EndOfFile, pos: 0, end: 0, text: "", hasPrecedingLineBreak: false, fullStart: 0, hasPrecedingJSDoc: false, hasPrecedingJSDocDeprecated: false };
    this.#nextToken();
  }

  // tsgo nextToken (parser.go:381-388): record the just-consumed token's end as
  // #prevTokenEnd, then scan the next token and snapshot it into #token. Uses
  // getTokenText() (raw slice tokenStart..pos) — NOT getTokenValue() (processed)
  // — because the parser passes raw lexemes to createIdentifier/createNumeric/
  // createString and applies unquote/unquoteTemplate/templateHeadText itself.
  // At EOF scan() stays at Kind.EndOfFile (scanner pos>=end), so a further scan
  // never advances past EOF.
  #nextToken(): void {
    this.#prevTokenEnd = this.#token.end;
    const kind = this.#scanner.scan();
    this.#token = {
      kind,
      pos: this.#scanner.getTokenStart() | 0,
      end: this.#scanner.getTokenEnd() | 0,
      text: this.#scanner.getTokenText(),
      // M3 3b-list-model: capture the scanner's preceding-line-break bit at the
      // moment this token is scanned (tsgo p.scanner.HasPrecedingLineBreak(),
      // parser.go:410). The snapshot reader #hasPrecedingLineBreak() reads this.
      hasPrecedingLineBreak: this.#scanner.hasPrecedingLineBreak(),
      // M3 4c: capture the trivia-inclusive full-start of this scanned token
      // (tsgo scanner.TokenFullStart()). Every scanned snapshot — including the
      // ACTUAL scanned EOF token at end-of-input — is built here, so the EOF
      // token gets its real full-start (NOT hardcoded 0). The reader #nodePos()
      // reads this.
      fullStart: this.#scanner.getTokenFullStart() | 0,
      // M3 6a: capture the scanner's preceding-JSDoc state at the moment this
      // token is scanned (tsgo p.scanner.HasPrecedingJSDocComment() /
      // HasPrecedingJSDocWithDeprecatedTag(), read by jsdocScannerInfo at
      // parser.go:414-426). #jsdocScannerInfo() reads this snapshot.
      hasPrecedingJSDoc: this.#scanner.hasPrecedingJSDocComment(),
      hasPrecedingJSDocDeprecated: this.#scanner.hasPrecedingJSDocWithDeprecatedTag(),
    };
  }

  // wave 4b-swap: refresh the #token snapshot from the live scanner AFTER an
  // in-place reScan* re-tokenization of the CURRENT token (no advance, so
  // #prevTokenEnd is NOT touched). reScan* keeps tokenStart (so #token.pos is
  // unchanged) and updates the kind + end.
  #refreshTokenFromScanner(kind: Kind): void {
    this.#token = {
      kind,
      pos: this.#scanner.getTokenStart() | 0,
      end: this.#scanner.getTokenEnd() | 0,
      text: this.#scanner.getTokenText(),
      // M3 3b-list-model: reScan* keeps tokenStart, so the preceding-trivia
      // line-break status of the current token is unchanged; read it from the
      // scanner (it reflects the same token start).
      hasPrecedingLineBreak: this.#scanner.hasPrecedingLineBreak(),
      // M3 4c: reScan* re-reads from fullStartPos and keeps it, so
      // getTokenFullStart() returns the same trivia-inclusive full-start of the
      // current token — correct for an in-place re-tokenization.
      fullStart: this.#scanner.getTokenFullStart() | 0,
      // M3 6a: reScan* keeps the current token's trivia (tokenStart/fullStartPos
      // unchanged), so its preceding-JSDoc state is unchanged — re-read it from
      // the scanner, parallel to hasPrecedingLineBreak.
      hasPrecedingJSDoc: this.#scanner.hasPrecedingJSDocComment(),
      hasPrecedingJSDocDeprecated: this.#scanner.hasPrecedingJSDocWithDeprecatedTag(),
    };
  }

  #reScanGreaterThan(): void {
    const kind = this.#scanner.reScanGreaterThanToken();
    if (kind !== this.#token.kind) {
      this.#refreshTokenFromScanner(kind);
    }
  }

  // codex Stage-3b 3b-flip: mirrors #reScanGreaterThan for the `<` family
  // (tsgo p.reScanLessThanToken(), parser.go:5230). Used by the speculative
  // call-type-args path to merge `<<` etc. back to a single `<` before probing.
  #reScanLessThan(): void {
    const kind = this.#scanner.reScanLessThanToken();
    if (kind !== this.#token.kind) {
      this.#refreshTokenFromScanner(kind);
    }
  }

  // codex Stage-3a: faithful port of tsgo parseErrorAtRange (parser.go:330-340).
  // Builds a concrete Diagnostic (text via format(message.message, args)) and
  // pushes it onto #diagnostics, deduping by last-position: if the previous
  // diagnostic starts at the same pos, this one is skipped (tsgo parser.go:332).
  // tsgo's NewDiagnostic passes file=nil at parse time (finishSourceFile later
  // re-attaches the file); file:undefined is faithful here and the buffer is
  // empty in 3a regardless. ADDITIVE — not yet called by any throw site.
  // codex Stage-3b: wired to throw sites in 3b.
  #parseErrorAtRange(pos: number, end: number, message: DiagnosticMessage, args: readonly string[]): Diagnostic | undefined {
    const last = this.#diagnostics[this.#diagnostics.length - 1];
    if (last !== undefined && last.start === pos) {
      return undefined;
    }
    // tsgo NewDiagnostic passes file=nil at parse time (finishSourceFile later
    // re-attaches the file, parser.go:466). The `file` property is omitted here
    // rather than set to undefined: with exactOptionalPropertyTypes the optional
    // SourceFileSlim field rejects an explicit `undefined`, and an absent property
    // is the faithful "no file yet" state.
    const diag: Diagnostic = {
      message,
      start: pos,
      length: end - pos,
      category: message.category,
      code: message.code,
      text: format(message.message, args),
    };
    this.#diagnostics.push(diag);
    return diag;
  }

  // codex Stage-3a: tsgo parseErrorAt (parser.go:324-326). codex Stage-3b: wired in 3b.
  #parseErrorAt(pos: number, end: number, message: DiagnosticMessage, args: readonly string[] = []): Diagnostic | undefined {
    return this.#parseErrorAtRange(pos, end, message, args);
  }

  // codex Stage-3a: tsgo parseErrorAtCurrentToken (parser.go:328-330). codex Stage-3b: wired in 3b.
  #parseErrorAtCurrentToken(message: DiagnosticMessage, args: readonly string[] = []): Diagnostic | undefined {
    return this.#parseErrorAtRange(this.#token.pos, this.#token.end, message, args);
  }

  parseSourceFile(): SourceFile {
    // M3 6b: tsgo parseSourceFileWorker (parser.go:434) uses
    // parseListIndex(PCSourceElements, parseToplevelStatement) so each top-level
    // statement is parsed with the await-identifier flag reset and any `await`
    // identifier records a possibleAwaitSpan (by statement index). element:
    // !(Semi&&recovery)&&isStartOfStatement; terminator: EOF only.
    const statements = this.#parseListIndex(PCSourceElements, (i) => this.#parseToplevelStatement(i));
    // M3 6a: tsgo parseSourceFileWorker (parser.go:436-438) captures the trailing JSDoc
    // state AFTER the statement list and stamps it onto the EOF token. The parse loop has
    // consumed every statement, so the current #token is the EOF token and #jsdocScannerInfo
    // reads any JSDoc preceding it (file-trailing JSDoc). The EOF token node is built here
    // (synthetic, no finishNode), so the stamp ORs the flag bits onto it directly —
    // range-neutral (no pos/end touched).
    const endJSDoc = this.#jsdocScannerInfo();
    const endOfFileToken = this.#withJSDoc(createToken(Kind.EndOfFile) as EndOfFile, endJSDoc);
    // codex Stage-3a: attach the parser-owned diagnostics buffer onto the
    // SourceFile at end-of-parse, mirroring tsgo finishSourceFile's
    // result.SetDiagnostics(...) (parser.go:466) which runs AFTER the parse loop.
    // M3 6b: tsgo finishSourceFile (parser.go:486) calls SetExternalModuleIndicator —
    // the STRUCTURAL module decision (scan of the already-parsed statements). Compute
    // it here and stamp it onto the SourceFile (the field is constructed, mirroring
    // tsgo's post-parse mutation).
    const result = createSourceFile(
      this.#fileName,
      this.#fileName as never,
      this.#sourceText,
      statements,
      endOfFileToken,
      // M3 Stage-5 pre-wave: stamp the resolved variant + script kind onto the
      // SourceFile, faithful to tsgo NewSourceFile which carries languageVariant
      // and scriptKind (parser sets them in initializeState, ast.go:2432-2433).
      this.#diagnostics,
      this.#languageVariant,
      this.#scriptKind,
      getExternalModuleIndicator(statements),
    );
    // M3 6b: tsgo parseSourceFileWorker gate (parser.go:449) — reparse the recorded
    // top-level-await spans ONLY for a non-declaration external module that recorded at
    // least one span. tsts has no declaration-file parse path, so result.isDeclarationFile
    // is structurally false (the gate term stays faithful). The reparse rebuilds the
    // SourceFile (new statements, repointed parents, recomputed diagnostics + indicator).
    if (!result.isDeclarationFile && result.externalModuleIndicator !== undefined && this.#possibleAwaitSpans.length > 0) {
      return this.#reparseTopLevelAwait(result);
    }
    return result;
  }

  #parseStatement(): Statement {
    // tsgo parseDeclaration / parseStatement: capture `pos := p.nodePos()` BEFORE
    // parseModifiersEx so the statement start covers any leading modifiers (export,
    // declare, abstract, async, ...). Thread this single pos into every
    // modifier-carrying production (variable/import/export/class/interface/type-alias/
    // enum/function/expression statement). Keyword-led statements that reject modifiers
    // capture their own pos at their #parseX entry instead.
    const pos = this.#nodePos();
    // M3 6a: tsgo parseDeclaration captures jsdocScannerInfo() at the SAME point as
    // nodePos() — BEFORE parseModifiersEx (parser.go:1124-1126) — so it reflects the
    // JSDoc preceding the declaration's first token (the leading modifier or keyword).
    // Threaded into each declaration production exactly like `pos`.
    const jsdoc = this.#jsdocScannerInfo();
    // tsgo parseStatement routes a leading `@` (KindAtToken, parser.go:1107-1108) into
    // parseDeclaration -> parseModifiersEx(allowDecorators=true), so leading decorators on a
    // class/function declaration are consumed into `modifiers`. Pass allowDecorators=true here
    // so a leading `@` is parsed as a decorator (otherwise it would fall through to
    // #parseExpression and throw); the existing ClassKeyword/FunctionKeyword switch cases then
    // build the decorated declaration with the combined modifiers list.
    // tsgo parseDeclarationWorker (parser.go:1126): parseModifiersEx(true, false, false).
    // After the faithful modifier port, `export` is absorbed into `modifiers` ONLY when a
    // declaration follows (e.g. `export class`/`export const`/`export default class`, via
    // canFollowExportModifier / nextTokenCanFollowDefaultKeyword). For `export {`, `export *`,
    // `export =`, `export default <expr>`, `export as`, `export type {`, canFollowExportModifier
    // rejects, so `export` stays the CURRENT token and is dispatched by the KindExportKeyword
    // switch case below (tsgo parseDeclarationWorker parser.go:1169-1178).
    const modifiers = this.#parseModifiersEx(true, false, false);
    switch (this.#current().kind) {
      case Kind.SemicolonToken:
        // tsgo parseStatement KindSemicolonToken (parser.go:1061): a bare `;` is an
        // EmptyStatement. In tsgo a keyword-led statement is reached BEFORE modifiers
        // are consumed (modifiers only matter inside parseDeclaration), so it never
        // carries modifiers and builds with NO diagnostic. codex Stage-3b 3b-flip:
        // drop the modifier guard, build the node.
        return this.#parseEmptyStatement();
      case Kind.DebuggerKeyword:
        // tsgo parseStatement KindDebuggerKeyword (parser.go:1105).
        return this.#parseDebuggerStatement();
      case Kind.WithKeyword:
        // tsgo parseStatement KindWithKeyword (parser.go:1097).
        return this.#parseWithStatement();
      case Kind.ImportKeyword:
        return this.#parseImportDeclaration(pos, jsdoc, modifiers);
      case Kind.ExportKeyword: {
        // tsgo parseDeclarationWorker KindExportKeyword (parser.go:1169-1178): consume the
        // `export` keyword, then the FOLLOWING token decides the production.
        //   default | = -> ExportAssignment
        //   as          -> NamespaceExportDeclaration
        //   default     -> ExportDeclaration (named/star/`export {}`)
        this.#nextToken();
        switch (this.#current().kind) {
          case Kind.DefaultKeyword:
          case Kind.EqualsToken:
            return this.#parseExportAssignment(pos, jsdoc, modifiers);
          case Kind.AsKeyword:
            return this.#parseNamespaceExportDeclaration(pos, jsdoc, modifiers);
          default:
            return this.#parseExportDeclaration(pos, jsdoc, modifiers);
        }
      }
      case Kind.ClassKeyword:
        return this.#parseClassDeclaration(pos, jsdoc, modifiers);
      case Kind.InterfaceKeyword:
        return this.#parseInterfaceDeclaration(pos, jsdoc, modifiers);
      case Kind.TypeKeyword:
        if (this.#isTypeAliasDeclarationStart()) {
          return this.#parseTypeAliasDeclaration(pos, jsdoc, modifiers);
        }
        break;
      case Kind.EnumKeyword:
        return this.#parseEnumDeclaration(pos, jsdoc, modifiers);
      case Kind.ModuleKeyword:
      case Kind.NamespaceKeyword:
        return this.#parseModuleDeclaration(pos, jsdoc, modifiers);
      case Kind.IfKeyword:
        return this.#parseIfStatement();
      case Kind.WhileKeyword:
        return this.#parseWhileStatement();
      case Kind.DoKeyword:
        return this.#parseDoStatement();
      case Kind.ForKeyword:
        return this.#parseForStatement();
      case Kind.BreakKeyword:
        return this.#parseBreakStatement();
      case Kind.ContinueKeyword:
        return this.#parseContinueStatement();
      case Kind.VarKeyword:
      case Kind.LetKeyword:
      case Kind.ConstKeyword:
        return this.#parseVariableStatement(pos, jsdoc, modifiers);
      case Kind.FunctionKeyword:
        return this.#parseFunctionDeclaration(pos, jsdoc, modifiers);
      case Kind.ReturnKeyword:
        return this.#parseReturnStatement();
      case Kind.ThrowKeyword:
        return this.#parseThrowStatement();
      case Kind.TryKeyword:
        return this.#parseTryStatement();
      case Kind.SwitchKeyword:
        return this.#parseSwitchStatement();
      case Kind.OpenBraceToken:
        // tsgo parseStatement KindOpenBraceToken (parser.go:1059) -> parseBlock; this is a
        // statement-level Block, reached only when no leading modifier was consumed (a
        // modifier preceding `{` falls through to the terminal Declaration_expected recovery
        // below, matching parseDeclarationWorker parser.go:1180-1185). `export {` is NOT
        // reached here — it is dispatched by the KindExportKeyword case above.
        if (modifiers === undefined) {
          return this.#parseBlock();
        }
        break;
    }
    if (modifiers !== undefined) {
      // codex Stage-3b 3b-flip: tsgo parseDeclarationWorker terminal fall-through
      // (parser.go:1180-1185): leftover modifiers with no valid declaration ->
      // Declaration_expected + MissingDeclaration carrying the modifiers.
      this.#parseErrorAt(this.#nodePos(), this.#nodePos(), Diagnostics.Declaration_expected);
      return this.#finishNode(createMissingDeclaration(modifiers), pos);
    }
    // tsgo parseExpressionOrLabeledStatement (parser.go:1515): pos captured before the
    // expression. Since modifiers are rejected for expression statements, the
    // #parseStatement-top pos equals the expression's own start; reuse it. Parse the
    // expression, then if it is an Identifier followed by `:`, build a LabeledStatement
    // whose body is a full #parseStatement (so `a: b: stmt` recurses). The identifier+colon
    // test keys off the PARSED expression's kind (Kind.Identifier), not a raw token peek, so
    // a parenthesized/member expression followed by `:` is NOT mistaken for a label.
    const expression = this.#parseExpression();
    if (isIdentifier(expression) && this.#consumeOptional(Kind.ColonToken)) {
      return this.#finishNode(createLabeledStatement(expression, this.#parseStatement()), pos);
    }
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createExpressionStatement(expression), pos);
  }

  #isTypeAliasDeclarationStart(): boolean {
    return this.#current().kind === Kind.TypeKeyword && isIdentifierNameKind(this.#peekKind());
  }

  #parseImportDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseImportDeclarationOrImportEqualsDeclaration (parser.go:2229): ImportDeclaration
    // / ImportEqualsDeclaration start is the #parseStatement-top pos (covering modifiers);
    // finishNode runs after the trailing semicolon so a present `;` is covered.
    this.#expect(Kind.ImportKeyword);
    // tsgo: afterImportPos is captured here, before parsing the leading identifier. It becomes
    // the ImportClause's pos.
    const afterImportPos = this.#nodePos();
    // M3 6b: tsgo parseImportDeclarationOrImportEqualsDeclaration (parser.go:2233/2264/2268)
    // saves statementHasAwaitIdentifier before the leading identifier and restores it on
    // every return path — an import binding/clause (incl. a binding named `await`) is
    // always parsed in await context, so it must NOT mark the statement for reparse.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    // String-specifier shape: `import "x";` (no clause). tokenAfterImportDefinitelyProduces-
    // ImportDeclaration is implicitly handled by the clause path below.
    if (this.#current().kind === Kind.StringLiteral) {
      const moduleSpecifier = this.#parseStringLiteralExpression();
      const attributes = this.#tryParseImportAttributes();
      this.#consumeOptional(Kind.SemicolonToken);
      this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2273). tsgo has a single
      // ImportDeclaration finishNode; tsts split the no-clause string-import into an
      // early return, so the stamp applies on both ImportDeclaration return paths.
      return this.#withJSDoc(this.#finishNode(createImportDeclaration(modifiers, undefined, moduleSpecifier, attributes), pos), jsdoc);
    }
    // tsgo: optionally parse a leading identifier, then reinterpret a leading `type`/`defer`
    // as a phase modifier (re-parsing the real identifier after it). The phase-modifier
    // disambiguation mirrors tsgo (parser.go:2238-2261).
    let identifier = this.#isImportedIdentifier() ? this.#parseIdentifier() : undefined;
    let phaseModifier: ImportPhaseModifierSyntaxKind | undefined;
    if (
      identifier !== undefined
      && identifier.text === "type"
      && (this.#current().kind !== Kind.FromKeyword
        || (this.#isImportedIdentifier() && this.#nextTokenIsFromKeywordOrEqualsToken()))
      && (this.#isImportedIdentifier() || this.#tokenAfterImportDefinitelyProducesImportDeclaration())
    ) {
      phaseModifier = Kind.TypeKeyword;
      identifier = this.#isImportedIdentifier() ? this.#parseIdentifier() : undefined;
    } else if (identifier !== undefined && identifier.text === "defer") {
      const shouldParseAsDeferModifier = this.#current().kind === Kind.FromKeyword
        ? this.#peekKind() !== Kind.StringLiteral
        : this.#current().kind !== Kind.CommaToken && this.#current().kind !== Kind.EqualsToken;
      if (shouldParseAsDeferModifier) {
        phaseModifier = Kind.DeferKeyword;
        identifier = this.#isImportedIdentifier() ? this.#parseIdentifier() : undefined;
      }
    }
    // tsgo: `import id ___` where the token after the identifier is NOT comma/from produces an
    // ImportEqualsDeclaration (parser.go:2262). `defer` phase never produces import-equals.
    if (
      identifier !== undefined
      && !this.#tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration()
      && phaseModifier !== Kind.DeferKeyword
    ) {
      const importEquals = this.#parseImportEqualsDeclaration(pos, jsdoc, modifiers, identifier, phaseModifier === Kind.TypeKeyword);
      this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier; // tsgo 2264: Import= is always in await context, no reparse
      return importEquals;
    }
    const importClause = this.#parseImportClause(afterImportPos, phaseModifier, identifier);
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier; // tsgo 2268: import clause is always in await context
    this.#expect(Kind.FromKeyword);
    const moduleSpecifier = this.#parseStringLiteralExpression();
    const attributes = this.#tryParseImportAttributes();
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2273).
    return this.#withJSDoc(this.#finishNode(createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes), pos), jsdoc);
  }

  #isImportedIdentifier(): boolean {
    // tsgo isIdentifier (used as `p.isIdentifier()` when parsing the imported binding).
    // Mirrors the existing isIdentifierNameKind gate used elsewhere for import bindings.
    return isIdentifierNameKind(this.#current().kind);
  }

  #nextTokenIsFromKeywordOrEqualsToken(): boolean {
    // tsgo nextTokenIsFromKeywordOrEqualsToken (parser.go:2278): a lookAhead over the NEXT
    // token. Peek one token off the live scanner without consuming.
    const next = this.#peekKind();
    return next === Kind.FromKeyword || next === Kind.EqualsToken;
  }

  #tokenAfterImportDefinitelyProducesImportDeclaration(): boolean {
    // tsgo tokenAfterImportDefinitelyProducesImportDeclaration (parser.go:2283).
    return this.#current().kind === Kind.AsteriskToken || this.#current().kind === Kind.OpenBraceToken;
  }

  #tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration(): boolean {
    // tsgo tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration (parser.go:2287):
    // in `import id ___`, comma/from => ImportDeclaration; anything else => ImportEquals.
    return this.#current().kind === Kind.CommaToken || this.#current().kind === Kind.FromKeyword;
  }

  #parseImportEqualsDeclaration(
    pos: number,
    jsdoc: JSDocScannerInfo,
    modifiers: NodeArray<ModifierLike> | undefined,
    name: Identifier,
    isTypeOnly: boolean,
  ): Statement {
    // tsgo parseImportEqualsDeclaration (parser.go:2293): `= ModuleReference ;`. Start pos is
    // the #parseStatement-top pos; finishNode after the trailing semicolon.
    this.#expect(Kind.EqualsToken);
    const moduleReference = this.#parseModuleReference();
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2298).
    return this.#withJSDoc(this.#finishNode(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), pos), jsdoc);
  }

  #parseModuleReference(): ModuleReference {
    // tsgo parseModuleReference (parser.go:2302): `require( ... )` external module reference,
    // else a (dotted) entity name.
    if (this.#current().kind === Kind.RequireKeyword && this.#peekKind() === Kind.OpenParenToken) {
      return this.#parseExternalModuleReference();
    }
    return this.#parseEntityName();
  }

  #parseExternalModuleReference(): ModuleReference {
    // tsgo parseExternalModuleReference (parser.go:2309): `require ( ModuleSpecifier )`. Start
    // pos at the `require` keyword; finishNode after the closing `)`.
    // M3 6b: tsgo (parser.go:2310/2317) saves/restores statementHasAwaitIdentifier around
    // the reference — `import x = require(...)` is always in await context.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const pos = this.#nodePos();
    this.#expect(Kind.RequireKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseStringLiteralExpression();
    this.#expect(Kind.CloseParenToken);
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return this.#finishNode(createExternalModuleReference(expression), pos);
  }

  #parseImportClause(
    pos: number,
    phaseModifier: ImportPhaseModifierSyntaxKind | undefined,
    identifier: Identifier | undefined,
  ): ReturnType<typeof createImportClause> {
    // tsgo parseImportClause (parser.go:2344): ImportClause pos is `afterImportPos` (the token
    // after `import`); the default-binding identifier and phase modifier were already parsed
    // by the caller (#parseImportDeclaration), mirroring tsgo's threading of those values.
    // M3 6b: tsgo (parser.go:2354/2369) saves/restores statementHasAwaitIdentifier around the
    // named-bindings parse — an import binding named `await` is in await context.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    let namedBindings: NamedImportBindings | undefined;
    if (identifier === undefined || this.#consumeOptional(Kind.CommaToken)) {
      namedBindings = this.#parseNamedImportBindings();
    }
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return this.#finishNode(createImportClause(phaseModifier, identifier, namedBindings), pos);
  }

  #parseNamedImportBindings(): NamedImportBindings {
    // tsgo parseNamespaceImport: NamespaceImport pos is the `*` token.
    const pos = this.#nodePos();
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      this.#expect(Kind.AsKeyword);
      return this.#finishNode(createNamespaceImport(this.#parseIdentifier()), pos);
    }
    // tsgo parseNamedImports: NamedImports pos is the `{` token.
    // M3 3b-list-model retrofit (loop #18): tsgo parseNamedImports uses
    // parseBracketedList(PCImportOrExportSpecifiers, parseImportSpecifier, `{`, `}`).
    // element: (From&&lookAhead(stringLit)?false : String?true : tokenIsIdentifierOrKeyword);
    // terminator: CloseBrace (or EOF). On valid input identical to the prior loop.
    const elements = this.#parseBracketedList(PCImportOrExportSpecifiers, () => this.#parseImportSpecifier(), Kind.OpenBraceToken, Kind.CloseBraceToken);
    return this.#finishNode(createNamedImports(elements ?? createNodeArray([]) as NodeArray<ImportSpecifier>), pos);
  }

  #parseImportSpecifier(): ImportSpecifier {
    // tsgo parseImportSpecifier: each specifier pos is the top of its element parse,
    // before the optional `type` modifier / first name.
    const specifierPos = this.#nodePos();
    const isTypeOnly = this.#consumeOptional(Kind.TypeKeyword);
    const firstName = this.#parseModuleExportName();
    const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
    const name = propertyName === undefined ? firstName : this.#parseIdentifier();
    return this.#finishNode(createImportSpecifier(isTypeOnly, propertyName, name as Identifier), specifierPos);
  }

  #parseExportSpecifier(): ReturnType<typeof createExportSpecifier> {
    // tsgo parseExportSpecifier: each specifier pos is the top of its element parse.
    const specifierPos = this.#nodePos();
    const firstName = this.#parseModuleExportName();
    const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
    const name = propertyName === undefined ? firstName : this.#parseModuleExportName();
    return this.#finishNode(createExportSpecifier(false, propertyName, name), specifierPos);
  }

  #parseExportDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseExportDeclaration (parser.go:2539): ExportDeclaration start is the
    // #parseStatement-top pos (covering modifiers); finishNode runs after the trailing
    // semicolon. After a module specifier, an optional import-attributes clause
    // (`with`/`assert { ... }`) is parsed (tsgo parser.go:2564).
    // M3 6b: tsgo parseExportDeclaration (parser.go:2541/2572) saves
    // statementHasAwaitIdentifier and restores it before finishing — export clauses are
    // parsed in await context, so an `await` export specifier name must NOT mark the
    // statement for reparse. Restore on BOTH return paths (tsts split the `*`-export).
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
      const attributes = moduleSpecifier !== undefined ? this.#tryParseImportAttributes() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2574). tsgo has a single
      // ExportDeclaration finishNode; tsts split the `*`-export into an early return,
      // so the stamp applies on both ExportDeclaration return paths.
      return this.#withJSDoc(this.#finishNode(createExportDeclaration(modifiers, false, undefined, moduleSpecifier, attributes), pos), jsdoc);
    }
    // tsgo parseNamedExports: NamedExports pos is the `{` token.
    // M3 3b-list-model retrofit (loop #19): tsgo parseNamedExports uses
    // parseBracketedList(PCImportOrExportSpecifiers, parseExportSpecifier, `{`, `}`).
    // Same predicates as #18. On valid input identical to the prior loop.
    const namedExportsPos = this.#nodePos();
    const elements = this.#parseBracketedList(PCImportOrExportSpecifiers, () => this.#parseExportSpecifier(), Kind.OpenBraceToken, Kind.CloseBraceToken);
    const namedExports = this.#finishNode(createNamedExports(elements ?? createNodeArray([]) as NodeArray<ExportSpecifier>), namedExportsPos);
    const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
    const attributes = moduleSpecifier !== undefined ? this.#tryParseImportAttributes() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2574).
    return this.#withJSDoc(this.#finishNode(createExportDeclaration(modifiers, false, namedExports, moduleSpecifier, attributes), pos), jsdoc);
  }

  #parseExportAssignment(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseExportAssignment (parser.go:2506): `export = <expr> ;` (isExportEquals=true)
    // or `export default <expr> ;` (isExportEquals=false). Start pos is the #parseStatement-top
    // pos (covering the `export` modifier); finishNode after the trailing semicolon. tsgo
    // parses the value with parseAssignmentExpressionOrHigher; tsts has no separate assignment-
    // only production, so #parseExpression (precedence 0) is the faithful stand-in (broader,
    // but does not diverge in shape/range for valid inputs). The TypeNode arg is nil in tsgo;
    // passed as `undefined as never` here, matching the established tsts pattern for non-
    // optional factory fields that tsgo leaves nil. codex-054 M3 Stage-2 (1f): tsgo
    // parseExportAssignment sets NodeFlagsAwaitContext=true around the value expression
    // (parser.go:2509) — `export default`/`export =` values are in module-await context —
    // so the expression and its finished nodes carry AwaitContext.
    // M3 6b: tsgo parseExportAssignment (parser.go:2508-2519) saves
    // statementHasAwaitIdentifier and restores it at the end — the value is parsed in
    // AwaitContext, so any `await` identifier inside it must NOT mark the export
    // statement for reparse. (#doInContext already handles the contextFlags save.)
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const isExportEquals = this.#consumeOptional(Kind.EqualsToken);
    if (!isExportEquals) {
      this.#expect(Kind.DefaultKeyword);
    }
    const expression = this.#doInContext(NodeFlags.AwaitContext, true, () => this.#parseExpression());
    this.#consumeOptional(Kind.SemicolonToken);
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2521).
    return this.#withJSDoc(this.#finishNode(createExportAssignment(modifiers, isExportEquals, undefined as never, expression), pos), jsdoc);
  }

  #parseNamespaceExportDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseNamespaceExportDeclaration (parser.go:2526): `export as namespace Id ;`. The
    // `export` modifier was already consumed into `modifiers`; here we consume `as`,
    // `namespace`, the identifier, then the trailing semicolon. Start pos is the
    // #parseStatement-top pos; finishNode after the semicolon.
    this.#expect(Kind.AsKeyword);
    this.#expect(Kind.NamespaceKeyword);
    // M3 6b: tsgo parseNamespaceExportDeclaration (parser.go:2529-2531) saves/restores
    // statementHasAwaitIdentifier around the name identifier — `export as namespace
    // await` names a namespace, not a top-level await expression.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const name = this.#parseIdentifier();
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2535).
    return this.#withJSDoc(this.#finishNode(createNamespaceExportDeclaration(modifiers, name), pos), jsdoc);
  }

  #tryParseImportAttributes(): ReturnType<typeof createImportAttributes> | undefined {
    // tsgo tryParseImportAttributes (parser.go:2496): on `with` (or `assert`) parse the
    // attributes clause. The assert-deprecation diagnostic is Stage-3 error-model and is
    // intentionally NOT emitted here; the node is built faithfully.
    if (this.#current().kind === Kind.WithKeyword || this.#current().kind === Kind.AssertKeyword) {
      return this.#parseImportAttributes(this.#current().kind);
    }
    return undefined;
  }

  #parseImportAttributes(token: Kind, skipKeyword: boolean = false): ReturnType<typeof createImportAttributes> {
    // tsgo parseImportAttributes (parser.go:3085): `with|assert { name: value, ... }`. Start
    // pos at the with/assert keyword (or, when skipKeyword=true for the import-type form, at
    // the `{` — the keyword + `:` were already consumed by #parseImportType); finishNode after
    // the closing `}`. multiLine is computed from the source slice spanning the braces (matching
    // the existing tsts approach in #parseBlock / #parseObjectLiteralExpression, since tsts has
    // no hasPrecedingLineBreak).
    const pos = this.#nodePos();
    if (!skipKeyword) {
      this.#expect(token);
    }
    const openBrace = this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #20): tsgo parseImportAttributes uses
    // parseDelimitedList(PCImportAttributes, parseImportAttribute) between the braces.
    // element: isImportAttributeName; terminator: CloseBrace (or EOF); SPECIAL
    // semicolon-skip arm applies (PCImportAttributes). The braces are managed here
    // (keyword/skipKeyword logic), so this uses the delimited (not bracketed) list.
    const elements = this.#parseDelimitedList(PCImportAttributes, () => this.#parseImportAttribute());
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    const multiLine = this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n");
    // The factory's token param is narrowed to WithKeyword|AssertKeyword; the guard in
    // #tryParseImportAttributes ensures `token` is exactly one of those.
    return this.#finishNode(createImportAttributes(token as Kind.WithKeyword | Kind.AssertKeyword, elements ?? createNodeArray([]) as NodeArray<ImportAttribute>, multiLine), pos);
  }

  #parseImportAttribute(): ReturnType<typeof createImportAttribute> {
    // tsgo parseImportAttribute (parser.go:3068): `name: value`, where name is an identifier/
    // keyword or a string literal. Start pos at the name; finishNode after the value.
    const pos = this.#nodePos();
    const name: ImportAttributeName = this.#current().kind === Kind.StringLiteral
      ? this.#parseStringLiteralExpression() as ImportAttributeName
      : this.#parseIdentifier();
    this.#expect(Kind.ColonToken);
    const value = this.#parseExpression();
    return this.#finishNode(createImportAttribute(name, value), pos);
  }

  // tsgo parseModifiers (parser.go:3856-3858): parseModifiersEx(false, false, false).
  #parseModifiers(): NodeArray<ModifierLike> | undefined {
    return this.#parseModifiersEx(false, false, false);
  }

  // tsgo parseModifiersEx (parser.go:3860-3898): a single loop that, when `allowDecorators`
  // is set, accepts EITHER a decorator (`@expr` -> parseDecorator) OR a keyword modifier
  // (tryParseModifier), appending both into ONE list (ModifierLike already includes
  // Decorator). The hasLeadingModifier/hasTrailingDecorator/hasTrailingModifier/
  // hasStaticModifier flags thread through exactly as tsgo: decorators are contiguous but may
  // appear in two places (leading + trailing); grammar-level legality of interleavings is
  // deferred to the checker. The functional-state requirement is satisfied with a recursive
  // worker carrying the flags + accumulated list instead of mutable locals.
  #parseModifiersEx(
    allowDecorators: boolean,
    permitConstAsModifier: boolean,
    stopOnStartOfClassStaticBlock: boolean,
  ): NodeArray<ModifierLike> | undefined {
    const pos = this.#nodePos();
    const list = this.#parseModifiersLoop(
      allowDecorators,
      permitConstAsModifier,
      stopOnStartOfClassStaticBlock,
      [],
      false,
      false,
      false,
      false,
    );
    if (list.length !== 0) {
      // tsgo newModifierList(NewTextRange(pos, p.nodePos()), ...) (parser.go:3895): the
      // modifier list carries the [pos, current-pos) text range.
      return createNodeArray([...list], pos, this.#nodePos()) as NodeArray<ModifierLike>;
    }
    return undefined;
  }

  #parseModifiersLoop(
    allowDecorators: boolean,
    permitConstAsModifier: boolean,
    stopOnStartOfClassStaticBlock: boolean,
    list: readonly ModifierLike[],
    hasLeadingModifier: boolean,
    hasTrailingDecorator: boolean,
    hasTrailingModifier: boolean,
    hasStaticModifier: boolean,
  ): readonly ModifierLike[] {
    if (allowDecorators && this.#current().kind === Kind.AtToken && !hasTrailingModifier) {
      const decorator = this.#parseDecorator();
      return this.#parseModifiersLoop(
        allowDecorators,
        permitConstAsModifier,
        stopOnStartOfClassStaticBlock,
        [...list, decorator],
        hasLeadingModifier,
        hasLeadingModifier ? true : hasTrailingDecorator,
        hasTrailingModifier,
        hasStaticModifier,
      );
    }
    const modifier = this.#tryParseModifier(hasStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock);
    if (modifier === undefined) {
      return list;
    }
    const nextHasStaticModifier = modifier.kind === Kind.StaticKeyword ? true : hasStaticModifier;
    return this.#parseModifiersLoop(
      allowDecorators,
      permitConstAsModifier,
      stopOnStartOfClassStaticBlock,
      [...list, modifier as ModifierLike],
      hasTrailingDecorator ? hasLeadingModifier : true,
      hasTrailingDecorator,
      hasTrailingDecorator ? true : hasTrailingModifier,
      nextHasStaticModifier,
    );
  }

  // tsgo parseDecorator (parser.go:3898): pos at the `@`, consume it, then parse the
  // decorator expression as a left-hand-side expression. codex-054 M3 Stage-2 (1h): tsgo
  // wraps the expression in NodeFlagsDecoratorContext (parser.go:3901). The DecoratorContext
  // bit gates the `@await`-in-await-context recovery (parseDecoratorExpression
  // parser.go:3905-3915); the recovery branch itself is checker/error-model Stage-3, but the
  // FLAG must be set now so finished decorator-expression nodes faithfully carry
  // DecoratorContext and the predicate is available. The non-await branch (parser.go:3915) is
  // reproduced directly via #parseLeftHandSideExpression.
  #parseDecorator(): Decorator {
    const pos = this.#nodePos();
    this.#expect(Kind.AtToken);
    const expression = this.#doInContext(
      NodeFlags.DecoratorContext,
      true,
      () => this.#parseLeftHandSideExpression() as LeftHandSideExpression,
    );
    return this.#finishNode(createDecorator(expression), pos);
  }

  // tsgo tryParseModifier (parser.go:3920-3941): capture pos+kind, then decide whether the
  // current token is a modifier. `const` is only a modifier with permitConstAsModifier AND a
  // following modifier on the same line; a `static {` start is rejected when
  // stopOnStartOfClassStaticBlock; a repeated `static` after one already seen is rejected;
  // otherwise parseAnyContextualModifier decides. On success build a Modifier node finished at
  // pos.
  #tryParseModifier(
    hasSeenStaticModifier: boolean,
    permitConstAsModifier: boolean,
    stopOnStartOfClassStaticBlock: boolean,
  ): ModifierLike | undefined {
    const pos = this.#nodePos();
    const kind = this.#current().kind;
    if (this.#current().kind === Kind.ConstKeyword && permitConstAsModifier) {
      // We need to ensure that any subsequent modifiers appear on the same line
      // so that when 'const' is a standalone declaration, we don't issue an error.
      if (!this.#lookAhead(() => this.#nextTokenIsOnSameLineAndCanFollowModifier())) {
        return undefined;
      } else {
        this.#nextToken();
      }
    } else if (stopOnStartOfClassStaticBlock && this.#current().kind === Kind.StaticKeyword && this.#lookAhead(() => this.#nextTokenIsOpenBrace())) {
      return undefined;
    } else if (hasSeenStaticModifier && this.#current().kind === Kind.StaticKeyword) {
      return undefined;
    } else {
      if (!this.#parseAnyContextualModifier()) {
        return undefined;
      }
    }
    return this.#finishNode(createToken(kind as ModifierSyntaxKind) as ModifierLike, pos);
  }

  // tsgo parseContextualModifier (parser.go:3943-3950): speculatively accept `t` as a
  // modifier if it is the current token and the next token can follow a modifier.
  #parseContextualModifier(t: Kind): boolean {
    const state = this.#mark();
    if (this.#current().kind === t && this.#nextTokenCanFollowModifier()) {
      return true;
    }
    this.#rewind(state);
    return false;
  }

  // tsgo parseAnyContextualModifier (parser.go:3952-3959): speculatively accept any modifier
  // kind if the next token can follow a modifier.
  #parseAnyContextualModifier(): boolean {
    const state = this.#mark();
    if (isModifierKind(this.#current().kind) && this.#nextTokenCanFollowModifier()) {
      return true;
    }
    this.#rewind(state);
    return false;
  }

  // tsgo nextTokenCanFollowModifier (parser.go:3961-3986).
  #nextTokenCanFollowModifier(): boolean {
    switch (this.#current().kind) {
      case Kind.ConstKeyword:
        // 'const' is only a modifier if followed by 'enum'.
        this.#nextToken();
        return this.#current().kind === Kind.EnumKeyword;
      case Kind.ExportKeyword:
        this.#nextToken();
        if (this.#current().kind === Kind.DefaultKeyword) {
          return this.#lookAhead(() => this.#nextTokenCanFollowDefaultKeyword());
        }
        if (this.#current().kind === Kind.TypeKeyword) {
          return this.#lookAhead(() => this.#nextTokenCanFollowExportModifier());
        }
        return this.#canFollowExportModifier();
      case Kind.DefaultKeyword:
        return this.#nextTokenCanFollowDefaultKeyword();
      case Kind.StaticKeyword:
        this.#nextToken();
        return this.#canFollowModifier();
      case Kind.GetKeyword:
      case Kind.SetKeyword:
        this.#nextToken();
        return this.#canFollowGetOrSetKeyword();
      default:
        return this.#nextTokenIsOnSameLineAndCanFollowModifier();
    }
  }

  // tsgo canFollowExportModifier (parser.go:4029-4031).
  #canFollowExportModifier(): boolean {
    return this.#current().kind === Kind.AtToken
      || (this.#current().kind !== Kind.AsteriskToken
        && this.#current().kind !== Kind.AsKeyword
        && this.#current().kind !== Kind.OpenBraceToken
        && this.#canFollowModifier());
  }

  // tsgo canFollowModifier (parser.go:4033-4035).
  #canFollowModifier(): boolean {
    return this.#current().kind === Kind.OpenBracketToken
      || this.#current().kind === Kind.OpenBraceToken
      || this.#current().kind === Kind.AsteriskToken
      || this.#current().kind === Kind.DotDotDotToken
      || this.#isLiteralPropertyName();
  }

  // tsgo canFollowGetOrSetKeyword (parser.go:4037-4039).
  #canFollowGetOrSetKeyword(): boolean {
    return this.#current().kind === Kind.OpenBracketToken || this.#isLiteralPropertyName();
  }

  // tsgo nextTokenIsOnSameLineAndCanFollowModifier (parser.go:4041-4047).
  #nextTokenIsOnSameLineAndCanFollowModifier(): boolean {
    this.#nextToken();
    if (this.#hasPrecedingLineBreak()) {
      return false;
    }
    return this.#canFollowModifier();
  }

  // tsgo nextTokenIsOpenBrace (parser.go:4049-4051).
  #nextTokenIsOpenBrace(): boolean {
    this.#nextToken();
    return this.#current().kind === Kind.OpenBraceToken;
  }

  // tsgo nextTokenCanFollowExportModifier (parser.go:4024-4027).
  #nextTokenCanFollowExportModifier(): boolean {
    this.#nextToken();
    return this.#canFollowExportModifier();
  }

  // tsgo nextTokenCanFollowDefaultKeyword (parser.go:3988-3998).
  #nextTokenCanFollowDefaultKeyword(): boolean {
    this.#nextToken();
    switch (this.#current().kind) {
      case Kind.ClassKeyword:
      case Kind.FunctionKeyword:
      case Kind.InterfaceKeyword:
      case Kind.AtToken:
        return true;
      case Kind.AbstractKeyword:
        return this.#lookAhead(() => this.#nextTokenIsClassKeywordOnSameLine());
      case Kind.AsyncKeyword:
        return this.#lookAhead(() => this.#nextTokenIsFunctionKeywordOnSameLine());
    }
    return false;
  }

  // tsgo nextTokenIsClassKeywordOnSameLine (parser.go:4016-4018).
  #nextTokenIsClassKeywordOnSameLine(): boolean {
    this.#nextToken();
    return this.#current().kind === Kind.ClassKeyword && !this.#hasPrecedingLineBreak();
  }

  // tsgo nextTokenIsFunctionKeywordOnSameLine (parser.go:4020-4022).
  #nextTokenIsFunctionKeywordOnSameLine(): boolean {
    this.#nextToken();
    return this.#current().kind === Kind.FunctionKeyword && !this.#hasPrecedingLineBreak();
  }

  #parseClassDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseClassDeclaration: declaration start is the #parseStatement-top pos
    // (covering modifiers). Members/heritage/type-params are Stage 1e (left unstamped).
    this.#expect(Kind.ClassKeyword);
    // M3 6b: tsgo parseClassDeclarationOrExpression (parser.go:1797-1799) saves/restores
    // statementHasAwaitIdentifier around the class NAME binding identifier — a class named
    // `await` is a declaration name, not a top-level await expression. (Member names are
    // covered by #parsePropertyName's own save/restore.)
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const name = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #8): tsgo parseClassMembers uses
    // parseList(PCClassMembers, parseClassElement). element:
    // lookAhead(scanClassMemberStart) || (Semicolon && !recovery); terminator:
    // CloseBrace (or EOF). The bare `;` SemicolonClassElement is handled inside
    // #parseClassElement, matching tsgo.
    const members = this.#parseList(PCClassMembers, () => this.#parseClassElement());
    this.#expect(Kind.CloseBraceToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1774).
    return this.#withJSDoc(this.#finishNode(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), pos), jsdoc);
  }

  #parseInterfaceDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseInterfaceDeclaration: declaration start is the #parseStatement-top pos.
    // Members are Stage 1e (left unstamped).
    this.#expect(Kind.InterfaceKeyword);
    const name = this.#parseIdentifier();
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #5): tsgo parseInterfaceDeclaration members
    // use parseObjectTypeMembers -> parseList(PCTypeMembers, parseTypeMember).
    // element: lookAhead(scanTypeMemberStart); terminator: CloseBrace (or EOF).
    // The trailing `;`/`,` is consumed inside #parseTypeElement (tsgo
    // parseTypeMemberSemicolon), so the loop owns no separator.
    const members = this.#parseList(PCTypeMembers, () => this.#parseTypeElement());
    this.#expect(Kind.CloseBraceToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2087).
    return this.#withJSDoc(this.#finishNode(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), pos), jsdoc);
  }

  #parseTypeAliasDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseTypeAliasDeclaration: declaration start is the #parseStatement-top pos.
    // The `.type` child is Stage 1d (left unstamped).
    this.#expect(Kind.TypeKeyword);
    const name = this.#parseIdentifier();
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.EqualsToken);
    const type = this.#parseType();
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:2599).
    return this.#withJSDoc(this.#finishNode(createTypeAliasDeclaration(modifiers, name, typeParameters, type), pos), jsdoc);
  }

  #parseModuleDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseModuleDeclaration: declaration start is the #parseStatement-top pos.
    // Supports `namespace A { ... }`, `module A { ... }`, and the dotted namespace
    // spelling by nesting ModuleDeclaration bodies (`namespace A.B {}` =>
    // `A` whose body is module `B`). The module body's statement list reuses the
    // normal block-statement context, matching TS-Go's parseModuleBlock.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const keyword = this.#current().kind;
    this.#advance();
    const name = this.#current().kind === Kind.StringLiteral
      ? this.#parseStringLiteralExpression()
      : this.#parseIdentifier();
    const body = this.#consumeOptional(Kind.DotToken)
      ? this.#parseNestedModuleDeclaration(keyword, jsdoc, undefined)
      : this.#parseModuleBlock();
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return this.#withJSDoc(this.#finishNode(createModuleDeclaration(modifiers, keyword, name as ModuleName, body), pos), jsdoc);
  }

  #parseNestedModuleDeclaration(keyword: Kind, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): ReturnType<typeof createModuleDeclaration> {
    const pos = this.#nodePos();
    const name = this.#parseIdentifier();
    const body = this.#consumeOptional(Kind.DotToken)
      ? this.#parseNestedModuleDeclaration(keyword, jsdoc, undefined)
      : this.#parseModuleBlock();
    return this.#withJSDoc(this.#finishNode(createModuleDeclaration(modifiers, keyword, name, body), pos), jsdoc);
  }

  #parseModuleBlock(): ReturnType<typeof createModuleBlock> {
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    const statements = this.#parseList(PCBlockStatements, () => this.#parseStatement());
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createModuleBlock(statements), pos);
  }

  #parseEnumDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseEnumDeclaration: declaration start is the #parseStatement-top pos.
    // M3 6b: tsgo (parser.go:2132/2148) saves/restores statementHasAwaitIdentifier across
    // the whole enum — an enum named `await` (or a member named `await`) is a declaration
    // name, not a top-level await expression, so it must NOT mark the statement for reparse.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    this.#expect(Kind.EnumKeyword);
    const name = this.#parseIdentifier();
    this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #9): tsgo parseEnumDeclaration uses
    // parseDelimitedList(PCEnumMembers, parseEnumMember). element:
    // OpenBracket||isLiteralPropertyName; terminator: CloseBrace (or EOF). The
    // SPECIAL comma arm (An_enum_member_name_must_be_followed_by_a_or) lives in
    // #parseDelimitedList. tsgo's enclosing Yield/Await-context clear is a no-op
    // on the gate corpus (top-level enums have contextFlags=None) and is not part
    // of this loop retrofit.
    const members = this.#parseDelimitedList(PCEnumMembers, () => this.#parseEnumMember());
    this.#expect(Kind.CloseBraceToken);
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1625).
    return this.#withJSDoc(this.#finishNode(createEnumDeclaration(modifiers, name, members ?? createNodeArray([]) as NodeArray<EnumMember>), pos), jsdoc);
  }

  #parseEnumMember(): ReturnType<typeof createEnumMember> {
    // tsgo parseEnumMember (2121): pos at entry (before parsePropertyName);
    // finishNode after the optional initializer.
    const memberPos = this.#nodePos();
    const memberName = this.#parsePropertyName();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return this.#finishNode(createEnumMember(memberName, initializer), memberPos);
  }

  #parseIfStatement(): Statement {
    // tsgo parseIfStatement: pos at the `if` keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.IfKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    const thenStatement = this.#parseStatement();
    const elseStatement = this.#consumeOptional(Kind.ElseKeyword) ? this.#parseStatement() : undefined;
    return this.#finishNode(createIfStatement(expression, thenStatement, elseStatement), pos);
  }

  #parseWhileStatement(): Statement {
    // tsgo parseWhileStatement: pos at the `while` keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    return this.#finishNode(createWhileStatement(expression, this.#parseStatement()), pos);
  }

  #parseDoStatement(): Statement {
    // tsgo parseDoStatement: pos at the `do` keyword; finishNode after the trailing
    // optional semicolon.
    const pos = this.#nodePos();
    this.#expect(Kind.DoKeyword);
    const statement = this.#parseStatement();
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createDoStatement(statement, expression), pos);
  }

  #parseForStatement(): Statement {
    // tsgo parseForOrForInOrForOfStatement: single pos at the `for` keyword, threaded to
    // whichever branch produces (finishNode runs once at the bottom there).
    const pos = this.#nodePos();
    this.#expect(Kind.ForKeyword);
    this.#expect(Kind.OpenParenToken);
    const initializer = this.#parseForInitializer();
    if (initializer !== undefined && (this.#current().kind === Kind.InKeyword || this.#current().kind === Kind.OfKeyword)) {
      const token = this.#current().kind;
      this.#advance();
      // codex-054 M3 Stage-2: tsgo parses the for-OF right-hand side with
      // DisallowInContext=false (parser.go:1308, parseAssignmentExpressionOrHigher in the
      // of-branch) and the for-IN right-hand side with parseExpressionAllowIn (DisallowIn
      // cleared, parser.go:1313). tsts uses #parseExpression for both; clearing DisallowIn
      // around it matches tsgo (a top-level `in` would be a binary-in in the of/in RHS, but
      // since the enclosing for-init may have set DisallowIn we explicitly clear it here).
      const expression = this.#doInContext(NodeFlags.DisallowInContext, false, () => this.#parseExpression());
      this.#expect(Kind.CloseParenToken);
      const statement = this.#parseStatement();
      return token === Kind.InKeyword
        ? this.#finishNode(createForInStatement(undefined, initializer, expression, statement), pos)
        : this.#finishNode(createForOfStatement(undefined, initializer, expression, statement), pos);
    }
    this.#expect(Kind.SemicolonToken);
    const condition = this.#current().kind === Kind.SemicolonToken ? undefined : this.#parseExpression();
    this.#expect(Kind.SemicolonToken);
    const incrementor = this.#current().kind === Kind.CloseParenToken ? undefined : this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    return this.#finishNode(createForStatement(initializer, condition, incrementor, this.#parseStatement()), pos);
  }

  #parseForInitializer(): ForInitializer | undefined {
    if (this.#current().kind === Kind.SemicolonToken) {
      return undefined;
    }
    if (this.#current().kind === Kind.VarKeyword || this.#current().kind === Kind.LetKeyword || this.#current().kind === Kind.ConstKeyword) {
      return this.#parseVariableDeclarationList();
    }
    // codex-054 M3 Stage-2: tsgo parses the non-declaration for-initializer expression with
    // DisallowInContext=true (parser.go:1301) so a top-level `in` is read as the for-IN
    // separator (`for (x in y)`) rather than a binary `in` expression. #doInContext restores
    // the prior context after the initializer so the for-of/for-in RHS and the C-style
    // condition/incrementor (which tsgo parses allow-in) are unaffected.
    return this.#doInContext(NodeFlags.DisallowInContext, true, () => this.#parseExpression());
  }

  #parseBreakStatement(): Statement {
    // tsgo parseBreakStatement: pos at the `break` keyword; finishNode after the optional
    // label/semicolon.
    const pos = this.#nodePos();
    this.#expect(Kind.BreakKeyword);
    const label = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createBreakStatement(label), pos);
  }

  #parseContinueStatement(): Statement {
    // tsgo parseContinueStatement: pos at the `continue` keyword; finishNode after the
    // optional label/semicolon.
    const pos = this.#nodePos();
    this.#expect(Kind.ContinueKeyword);
    const label = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createContinueStatement(label), pos);
  }

  #parseClassElement(): ClassElement {
    // tsgo parseClassElement (1844): pos captured at the VERY TOP, BEFORE the ';'
    // check and BEFORE parseModifiersEx, so the member start covers leading
    // modifiers / the bare ';'. This single threaded pos flows into every branch's
    // finishNode (matching tsgo threading `pos` into parseAccessorDeclaration /
    // parseMethodDeclaration / parsePropertyDeclaration / tryParseConstructorDeclaration).
    const pos = this.#nodePos();
    // M3 6a: tsgo parseClassElement captures jsdocScannerInfo() at the SAME top point
    // as nodePos() (parser.go:1845-1846), BEFORE the ';' check and parseModifiersEx, so
    // it reflects the JSDoc preceding the member's first token. Threaded into every
    // class-element finishNode (matching tsgo threading jsdoc into each member production).
    const jsdoc = this.#jsdocScannerInfo();
    if (this.#consumeOptional(Kind.SemicolonToken)) {
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1850).
      return this.#withJSDoc(this.#finishNode(createSemicolonClassElement(), pos), jsdoc);
    }
    // tsgo parseClassElement (parser.go:1853): parseModifiersEx(allowDecorators=true,
    // permitConstAsModifier=true, stopOnStartOfClassStaticBlock=true) — decorators on members
    // are consumed here, and a `static {` is left UNconsumed (the static-block guard lives in
    // #tryParseModifier, gated by stopOnStartOfClassStaticBlock).
    const modifiers = this.#parseModifiersEx(true, true, true);
    // tsgo parseClassElement static-block dispatch (parser.go:1854-1856): the static-block
    // check runs AFTER parseModifiers and BEFORE the get/set/constructor branches, on the
    // still-unconsumed `static` token. `static {` -> parseClassStaticBlockDeclaration.
    // codex-054 M3 Stage-2 (1h): tsgo parseClassStaticBlockBody (parser.go:1907-1914) sets
    // YieldContext=false AND AwaitContext=true for the static-block body (a static block is
    // an await context but never a yield context). Wrap the body parse accordingly.
    if (this.#current().kind === Kind.StaticKeyword && this.#peekKind() === Kind.OpenBraceToken) {
      this.#expect(Kind.StaticKeyword);
      const body = this.#doInContext(NodeFlags.YieldContext, false, () =>
        this.#doInContext(NodeFlags.AwaitContext, true, () => this.#parseBlock()),
      );
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1903).
      return this.#withJSDoc(this.#finishNode(createClassStaticBlockDeclaration(modifiers, body), pos), jsdoc);
    }
    if (this.#current().kind === Kind.ConstructorKeyword) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      // codex-054 M3 Stage-2: tsgo tryParseConstructorDeclaration threads ParseFlagsNone for
      // the constructor params and body (parser.go:1921/1923) — a constructor is neither
      // generator nor async — so Yield=false, Await=false. The body also clears
      // DecoratorContext per parseFunctionBlock (parser.go:3500).
      const parameters = this.#withSignatureContext(false, false, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const body = this.#current().kind === Kind.OpenBraceToken
        ? this.#parseFunctionBlock(false, false)
        : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1925, tryParseConstructorDeclaration).
      return this.#withJSDoc(this.#finishNode(createConstructorDeclaration(modifiers, undefined, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, undefined, body), pos), jsdoc);
    }

    // codex-054 M3 Stage-2: tsgo parses get/set accessors with ParseFlagsNone
    // (parser.go:1858/1861, parseAccessorDeclaration parser.go:3425) — accessors are neither
    // async nor generators — so NO Yield/Await context is set; the params/body run with
    // whatever enclosing contextFlags exist (for a class body, None). The get/set branches
    // therefore correctly require NO #withSignatureContext wrap.
    if (this.#current().kind === Kind.GetKeyword && this.#peekKind() !== Kind.OpenParenToken) {
      this.#advance();
      const name = this.#parsePropertyName();
      this.#expect(Kind.OpenParenToken);
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      // M3 6b: tsgo accessor body goes through parseFunctionBlockOrSemicolon ->
      // parseFunctionBlock (parser.go:3437) with ParseFlagsNone, so no Yield/Await is set
      // but statementHasAwaitIdentifier IS saved/restored. #parseFunctionBlock(false,false)
      // matches: an accessor is neither generator nor async.
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseFunctionBlock(false, false) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      // M3 6a: tsgo withJSDoc(p.finishNode(result, pos), jsdoc) (parser.go:3438, parseAccessorDeclaration).
      return this.#withJSDoc(this.#finishNode(createGetAccessorDeclaration(modifiers, name, undefined, createNodeArray([]) as NodeArray<ParameterDeclaration>, type, body), pos), jsdoc);
    }

    if (this.#current().kind === Kind.SetKeyword && this.#peekKind() !== Kind.OpenParenToken) {
      this.#advance();
      const name = this.#parsePropertyName();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      // M3 6b: tsgo set-accessor body also goes through parseFunctionBlock (ParseFlagsNone) —
      // statementHasAwaitIdentifier saved/restored, no Yield/Await context.
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseFunctionBlock(false, false) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      // M3 6a: tsgo withJSDoc(p.finishNode(result, pos), jsdoc) (parser.go:3438, parseAccessorDeclaration).
      return this.#withJSDoc(this.#finishNode(createSetAccessorDeclaration(modifiers, name, undefined, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, undefined, body), pos), jsdoc);
    }

    const name = this.#parsePropertyName();
    const postfixToken = this.#parseOptionalPostfixToken();
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      // codex-054 M3 Stage-2: tsgo parseMethodDeclaration signatureFlags = IfElse(asterisk,
      // Yield) | IfElse(async modifier, Await) (parser.go:5681/parsePropertyOrMethodDeclaration
      // parser.go:1949). tsts builds methods with asteriskToken=undefined (no generator-method
      // asterisk is parsed) so isGenerator is false; isAsync comes from the async modifier
      // already consumed into `modifiers`. The worker wraps params and body (body also clears
      // DecoratorContext).
      const isGenerator = false;
      // tsgo parseMethodDeclaration (parser.go:1950): IfElse(modifierListHasAsync(modifiers), Await).
      const isAsync = modifierListHasAsync(modifiers);
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withSignatureContext(isGenerator, isAsync, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken
        ? this.#parseFunctionBlock(isGenerator, isAsync)
        : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1956, parseMethodDeclaration).
      return this.#withJSDoc(this.#finishNode(createMethodDeclaration(modifiers, undefined, name, postfixToken, typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type, body), pos), jsdoc);
    }

    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1974, parsePropertyDeclaration).
    return this.#withJSDoc(this.#finishNode(createPropertyDeclaration(modifiers, name, postfixToken, type, initializer), pos), jsdoc);
  }

  // Mirrors TS-Go parser.go parseTypeMember: call/construct signatures first,
  // then modifiers, then index signatures, then property/method signatures.
  #parseTypeElement(): TypeElement {
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      return this.#parseSignatureMember(Kind.CallSignature);
    }
    if (this.#current().kind === Kind.NewKeyword && this.#nextTokenIsOpenParenOrLessThan()) {
      return this.#parseSignatureMember(Kind.ConstructSignature);
    }
    // tsgo parseTypeMember (3180): after the call/construct early dispatch, pos is
    // captured BEFORE parseModifiers so index/property/method-signature starts cover
    // leading modifiers (e.g. `readonly`). This single pos threads into each branch.
    const pos = this.#nodePos();
    // M3 6a: tsgo captures jsdocScannerInfo() at this same point (parser.go:3181),
    // threaded into each type-member production.
    const jsdoc = this.#jsdocScannerInfo();
    const modifiers = this.#parseModifiers();
    if (this.#isIndexSignature()) {
      return this.#parseIndexSignatureDeclaration(pos, jsdoc, modifiers);
    }
    const name = this.#parsePropertyName();
    const postfixToken = this.#parseOptionalPostfixToken();
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      this.#consumeOptional(Kind.SemicolonToken);
      this.#consumeOptional(Kind.CommaToken);
      // M3 6a: tsgo withJSDoc(p.finishNode(result, pos), jsdoc) (parser.go:3593, parsePropertyOrMethodSignature).
      return this.#withJSDoc(this.#finishNode(createMethodSignatureDeclaration(modifiers, name, postfixToken, typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type), pos), jsdoc);
    }
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    // M3 6a: tsgo withJSDoc(p.finishNode(result, pos), jsdoc) (parser.go:3593, parsePropertyOrMethodSignature).
    return this.#withJSDoc(this.#finishNode(createPropertySignatureDeclaration(modifiers, name, postfixToken, type as never, undefined as never), pos), jsdoc);
  }

  // `{ (args): R }` (call) and `{ new (args): R }` (construct) signatures.
  #parseSignatureMember(kind: Kind.CallSignature | Kind.ConstructSignature): TypeElement {
    // tsgo parseSignatureMember (3200): own pos captured at entry, BEFORE the
    // optional `new` consume (so the construct-signature start covers `new`);
    // finishNode after the trailing semicolon/comma handling.
    const pos = this.#nodePos();
    // M3 6a: tsgo captures jsdocScannerInfo() at the same entry point (parser.go:3202).
    const jsdoc = this.#jsdocScannerInfo();
    if (kind === Kind.ConstructSignature) {
      this.#expect(Kind.NewKeyword);
    }
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:3217).
    return kind === Kind.CallSignature
      ? this.#withJSDoc(this.#finishNode(createCallSignatureDeclaration(typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type), pos), jsdoc)
      : this.#withJSDoc(this.#finishNode(createConstructSignatureDeclaration(typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type), pos), jsdoc);
  }

  // `{ [key: K]: V }` index signature.
  #parseIndexSignatureDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): TypeElement {
    // tsgo parseIndexSignatureDeclaration(pos, ...): pos is the parseTypeMember-top
    // pos (covering preceding modifiers); finishNode after parseTypeMemberSemicolon.
    this.#expect(Kind.OpenBracketToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseBracketToken);
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:3566).
    return this.#withJSDoc(this.#finishNode(createIndexSignatureDeclaration(modifiers, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type as never), pos), jsdoc);
  }

  #nextTokenIsOpenParenOrLessThan(): boolean {
    const kind = this.#peekKind();
    return kind === Kind.OpenParenToken || kind === Kind.LessThanToken;
  }

  // Distinguish an index signature `[id: T]` from a computed property name.
  // Faithful port of TS-Go nextIsUnambiguouslyIndexSignature (token lookahead).
  #isIndexSignature(): boolean {
    if (this.#current().kind !== Kind.OpenBracketToken) {
      return false;
    }
    // tsgo nextIsUnambiguouslyIndexSignature runs as a lookAhead callback; walk
    // the cursor forward off the live scanner and rewind via #lookAhead.
    return this.#lookAhead(() => {
      this.#nextToken(); // skip `[`
      const first = this.#current().kind;
      if (first === Kind.DotDotDotToken || first === Kind.CloseBracketToken) {
        return true;
      }
      if (modifierKinds.has(first)) {
        this.#nextToken();
        return isIdentifierNameKind(this.#current().kind);
      }
      if (!isIdentifierNameKind(first)) {
        return false;
      }
      this.#nextToken();
      const afterId = this.#current().kind;
      if (afterId === Kind.ColonToken || afterId === Kind.CommaToken) {
        return true;
      }
      if (afterId !== Kind.QuestionToken) {
        return false;
      }
      this.#nextToken();
      const afterQuestion = this.#current().kind;
      return afterQuestion === Kind.ColonToken || afterQuestion === Kind.CommaToken || afterQuestion === Kind.CloseBracketToken;
    });
  }

  #parseOptionalTypeParameters(): NodeArray<TypeParameterDeclaration> | undefined {
    if (this.#current().kind !== Kind.LessThanToken) {
      return undefined;
    }
    // M3 3b-list-model retrofit (loop #23): tsgo parseTypeParameters (parser.go:3223)
    // is parseBracketedList(PCTypeParameters, parseTypeParameter, `<`, `>`).
    // element: In||Const||isIdentifier; terminator: `>`||`(`||`{`||extends||implements.
    // Same #expectGreaterThan closer as #22. On valid input identical to the prior
    // do/while(comma) loop.
    return this.#parseBracketedList(PCTypeParameters, () => this.#parseTypeParameter(), Kind.LessThanToken, Kind.GreaterThanToken);
  }

  #parseTypeParameter(): TypeParameterDeclaration {
    // tsgo parseTypeParameter (3228): pos at entry (before modifiers/name);
    // finishNode after the optional defaultType.
    const pos = this.#nodePos();
    const name = this.#parseIdentifier();
    const constraint = this.#consumeOptional(Kind.ExtendsKeyword) ? this.#parseType() : undefined;
    const defaultType = this.#consumeOptional(Kind.EqualsToken) ? this.#parseType() : undefined;
    return this.#finishNode(createTypeParameterDeclaration(undefined, name, constraint, undefined, defaultType), pos);
  }

  #parseHeritageClauses(): NodeArray<ReturnType<typeof createHeritageClause>> | undefined {
    // M3 3b-list-model retrofit (loop #10): tsgo parseHeritageClauses (parser.go)
    // guards on isHeritageClause() then OUTER parseList(PCHeritageClauses,
    // parseHeritageClause), returning nil (undefined) when no clauses.
    if (this.#isHeritageClause()) {
      return this.#parseList(PCHeritageClauses, () => this.#parseHeritageClause());
    }
    return undefined;
  }

  #parseHeritageClause(): ReturnType<typeof createHeritageClause> {
    // tsgo parseHeritageClause (1826): pos at the extends/implements keyword
    // (captured before nextToken); finishNode after the delimited type list.
    // Inner ExpressionWithTypeArguments elements are already Stage-1d stamped.
    // INNER parseDelimitedList(PCHeritageClauseElement, parseExpressionWithTypeArguments).
    const clausePos = this.#nodePos();
    const token = this.#current().kind as Kind.ExtendsKeyword | Kind.ImplementsKeyword;
    this.#advance();
    const types = this.#parseDelimitedList(PCHeritageClauseElement, () => this.#parseExpressionWithTypeArguments());
    return this.#finishNode(createHeritageClause(token, types ?? createNodeArray([]) as NodeArray<ExpressionWithTypeArguments>), clausePos);
  }

  #parseExpressionWithTypeArguments(): ExpressionWithTypeArguments {
    // tsgo parseExpressionWithTypeArguments (1834): pos at the expression start;
    // finishNode after the optional type-argument list. Only the EWTA wrapper +
    // its TypeNode args are stamped here; the inner heritage PropertyAccess stays
    // unstamped (Stage 1e).
    const pos = this.#nodePos();
    const expression = this.#parseHeritageExpression();
    const typeArguments = this.#parseOptionalTypeArguments();
    return this.#finishNode(createExpressionWithTypeArguments(expression, typeArguments), pos);
  }

  #parseHeritageExpression(): Expression {
    // tsgo builds this via parseLeftHandSideExpressionOrHigher whose property-access
    // rest threads the base entity start: each dotted PropertyAccess node starts at
    // the leftmost base identifier (pos) and ends after the just-parsed name.
    const pos = this.#nodePos();
    let expression: Expression = this.#parseIdentifier();
    while (this.#consumeOptional(Kind.DotToken)) {
      expression = this.#finishNode(createPropertyAccessExpression(expression, undefined, this.#parseIdentifier(), NodeFlags.None), pos);
    }
    return expression;
  }

  #parseOptionalTypeArguments(): NodeArray<TypeNode> | undefined {
    if (this.#current().kind !== Kind.LessThanToken) {
      return undefined;
    }
    // M3 3b-list-model retrofit (loop #22): tsgo parseTypeArguments (parser.go:3016)
    // is parseBracketedList(PCTypeArguments, parseType, `<`, `>`). The closer uses
    // #expectGreaterThan (single `>`, reScan-aware) via the GreaterThan branch of
    // #parseBracketedList. element: Comma||isStartOfType(false); terminator:
    // token!==Comma. On valid input identical to the prior do/while(comma) loop.
    return this.#parseBracketedList(PCTypeArguments, () => this.#parseType(), Kind.LessThanToken, Kind.GreaterThanToken);
  }

  #parseVariableStatement(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseVariableStatement(pos, ...): the statement start is the #parseStatement-top
    // pos (covering modifiers); finishNode after the trailing optional semicolon.
    const declarationList = this.#parseVariableDeclarationList();
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1545).
    return this.#withJSDoc(this.#finishNode(createVariableStatement(modifiers, declarationList), pos), jsdoc);
  }

  #parseVariableDeclarationList(): ReturnType<typeof createVariableDeclarationList> {
    // tsgo parseVariableDeclarationList: own pos at the var/let/const keyword (NOT the
    // outer statement's modifier start). When no modifiers precede, this equals the
    // variable-statement pos; with modifiers it starts later (at var/let/const).
    const pos = this.#nodePos();
    const flags: int = this.#parseVariableDeclarationListFlags();
    // M3 3b-list-model retrofit (loop #11): tsgo parseVariableDeclarationList uses
    // parseDelimitedList(PCVariableDeclarations, parseVariableDeclaration...).
    // element: isBindingIdentifierOrPrivateIdentifierOrPattern; terminator:
    // canParseSemicolon||In||Of||EqualsGreaterThan. tsgo's for-initializer /
    // using / await-using / exclamation-variant machinery is NOT part of this
    // loop retrofit (separate scope); the existing single element parser is kept,
    // so valid-input ASTs are unchanged.
    const declarations = this.#parseDelimitedList(PCVariableDeclarations, () => this.#parseVariableDeclaration());
    return this.#finishNode(createVariableDeclarationList(declarations ?? createNodeArray([]) as NodeArray<VariableDeclaration>, flags), pos);
  }

  #parseVariableDeclarationListFlags(): int {
    const token = this.#current();
    switch (token.kind) {
      case Kind.VarKeyword:
        this.#advance();
        return NodeFlags.None;
      case Kind.LetKeyword:
        this.#advance();
        return NodeFlags.Let;
      case Kind.ConstKeyword:
        this.#advance();
        return NodeFlags.Const;
      default:
        // codex Stage-3b 3b-flip: UNREACHABLE internal invariant. #parseVariableStatement
        // is only entered for Var/Let/Const (the #parseStatement switch). This is a debug
        // assert, NOT a user-facing diagnostic (same category as the parsingContextErrors
        // panic-equivalents); a plain internal Error, NOT the removed diagnostic class.
        throw new Error("Unhandled variable declaration kind");
    }
  }

  #parseVariableDeclaration(): VariableDeclaration {
    // tsgo parseVariableDeclarationWorker: own pos at the binding-name start.
    const pos = this.#nodePos();
    const name = this.#parseBindingName();
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return this.#finishNode(createVariableDeclaration(name, undefined, type, initializer), pos);
  }

  #parseFunctionDeclaration(pos: number, jsdoc: JSDocScannerInfo, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseFunctionDeclaration(pos, ...): the declaration start is the
    // #parseStatement-top pos (covering modifiers, incl. the default-export path).
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) as AsteriskToken : undefined;
    // codex-054 M3 Stage-2: tsgo computes signatureFlags = IfElse(asterisk, Yield) |
    // IfElse(async modifier, Await) (parser.go:1719) and threads them through
    // parseParameters/parseFunctionBlock; the worker converts them to Yield/Await
    // contextFlags. tsts derives the same booleans from the asterisk token and the async
    // modifier and wraps the parameter list AND the body via #withSignatureContext.
    const isGenerator = asteriskToken !== undefined;
    // tsgo (parser.go:1719): IfElse(modifierListHasAsync(modifiers), Await).
    const isAsync = modifierListHasAsync(modifiers);
    // tsgo additionally sets AwaitContext=true for an EXPORTED function declaration
    // (parser.go:1722-1723) — an exported function is in module-await context — applied as
    // the OUTER context around params + body. For a non-exported function tsgo leaves the
    // enclosing AwaitContext unchanged, so we only wrap when exported.
    const isExported = modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword);
    const build = (): Statement => {
      const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withSignatureContext(isGenerator, isAsync, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      // tsgo parseFunctionBlock additionally CLEARS DecoratorContext (parser.go:3500): a
      // function body is never in decorator context, and saves/restores
      // statementHasAwaitIdentifier so a body `await` identifier does not mark THIS
      // declaration for reparse. #parseFunctionBlock wraps all three.
      const body = this.#parseFunctionBlock(isGenerator, isAsync);
      // M3 6a: tsgo withJSDoc(result, jsdoc) (parser.go:1730).
      return this.#withJSDoc(this.#finishNode(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type, body), pos), jsdoc);
    };
    return isExported ? this.#doInContext(NodeFlags.AwaitContext, true, build) : build();
  }

  #parseParameterList(): ParameterDeclaration[] {
    // M3 3b-list-model retrofit (loop #17): tsgo parseParametersWorker uses
    // parseDelimitedList(PCParameters, parseParameter). element: isStartOfParameter(false);
    // terminator: CloseParen||CloseBracket. The callers still wrap the result in
    // createNodeArray (an array is returned to preserve the existing signature and
    // avoid touching the ~13 call sites; the delimited list's NodeArray pos/end is
    // not load-bearing). On valid input identical to the prior while(true) loop.
    const parameters = this.#parseDelimitedList(PCParameters, () => this.#parseParameterDeclaration());
    return parameters === undefined ? [] : [...parameters];
  }

  #parseParameterDeclaration(): ParameterDeclaration {
    // tsgo parseParameterEx (3315): pos captured at entry, BEFORE modifiers/decorators
    // and the optional `...`; finishNode after the optional initializer. (The single-
    // identifier arrow param in #parseArrowFunction is stamped separately via paramPos.)
    const pos = this.#nodePos();
    // M3 6a: tsgo captures jsdocScannerInfo() at the same entry point (parser.go:3317).
    const jsdoc = this.#jsdocScannerInfo();
    // tsgo parseParameterEx (parser.go:3315-3323): parseModifiersEx(allowDecorators=true)
    // runs right after the entry pos capture and BEFORE the `...` consume. This threads
    // parameter decorators (`@dec p`) and parameter-property accessibility modifiers
    // (public/private/protected/readonly) into the ParameterDeclaration's modifiers list
    // (previously hard-coded undefined, silently dropping them).
    // tsgo parseParameterEx (parser.go:3323): parseModifiersEx(true, false, false).
    const modifiers = this.#parseModifiersEx(true, false, false);
    const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) as DotDotDotToken : undefined;
    const name = this.#parseBindingName();
    const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) as QuestionToken : undefined;
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    // M3 6a: tsgo withJSDoc(p.finishNode(result, pos), jsdoc) (parser.go:3336/3350).
    return this.#withJSDoc(this.#finishNode(createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer), pos), jsdoc);
  }

  #parseBlock(): Block {
    // tsgo parseBlock: pos at the `{` (captured before parseExpected); finishNode after the
    // closing `}` is consumed so the end covers it.
    const pos = this.#nodePos();
    const openBrace = this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #2): tsgo parseBlock uses
    // parseList(PCBlockStatements, parseStatement). element: isStartOfStatement;
    // terminator: CloseBrace (or EOF).
    const statements = this.#parseList(PCBlockStatements, () => this.#parseStatement());
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    const multiLine = this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n");
    return this.#finishNode(createBlock(statements, multiLine), pos);
  }

  #parseEmptyStatement(): Statement {
    // tsgo parseEmptyStatement (parser.go:1227): pos at the `;`; finishNode after the
    // consumed semicolon so the range covers exactly the `;`.
    const pos = this.#nodePos();
    this.#expect(Kind.SemicolonToken);
    return this.#finishNode(createEmptyStatement(), pos);
  }

  #parseDebuggerStatement(): Statement {
    // tsgo parseDebuggerStatement (parser.go:1505): pos at the `debugger` keyword;
    // finishNode after the optional terminating semicolon (tsgo parseSemicolon).
    const pos = this.#nodePos();
    this.#expect(Kind.DebuggerKeyword);
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createDebuggerStatement(), pos);
  }

  #parseWithStatement(): Statement {
    // tsgo parseWithStatement (parser.go:1377): pos at the `with` keyword; the body is a
    // full #parseStatement. codex-054 M3 Stage-2 (1f): tsgo wraps the body in
    // NodeFlagsInWithStatement (parser.go:1385) so every node finished inside the with-body
    // records that it descends from a WithStatement's `statement` (not its `expression`).
    const pos = this.#nodePos();
    this.#expect(Kind.WithKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    const statement = this.#doInContext(NodeFlags.InWithStatement, true, () => this.#parseStatement());
    return this.#finishNode(createWithStatement(expression, statement), pos);
  }

  #parseReturnStatement(): Statement {
    // tsgo parseReturnStatement: pos at the `return` keyword; finishNode after the optional
    // semicolon so a present `;` is covered.
    const pos = this.#nodePos();
    this.#expect(Kind.ReturnKeyword);
    const expression = this.#current().kind === Kind.SemicolonToken || this.#current().kind === Kind.CloseBraceToken
      ? undefined
      : this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createReturnStatement(expression), pos);
  }

  #parseThrowStatement(): Statement {
    // tsgo parseThrowStatement: pos at the `throw` keyword; finishNode after the optional
    // semicolon.
    const pos = this.#nodePos();
    this.#expect(Kind.ThrowKeyword);
    const expression = this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createThrowStatement(expression), pos);
  }

  #parseTryStatement(): Statement {
    // tsgo parseTryStatement: pos at the `try` keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.TryKeyword);
    const tryBlock = this.#parseBlock();
    const catchClause = this.#current().kind === Kind.CatchKeyword ? this.#parseCatchClause() : undefined;
    const finallyBlock = this.#consumeOptional(Kind.FinallyKeyword) ? this.#parseBlock() : undefined;
    if (catchClause === undefined && finallyBlock === undefined) {
      // codex Stage-3b 3b-flip: tsgo parseTryStatement (parser.go ~1810) records
      // X_catch_or_finally_expected (1472) and STILL finishes the node with both
      // clauses undefined (NO advance).
      this.#parseErrorAtCurrentToken(Diagnostics.X_catch_or_finally_expected);
    }
    return this.#finishNode(createTryStatement(tryBlock, catchClause, finallyBlock), pos);
  }

  #parseCatchClause(): ReturnType<typeof createCatchClause> {
    // tsgo parseCatchClause: pos at the `catch` keyword. The catch variable's
    // VariableDeclaration gets its own pos at the binding-name start (tsgo
    // parseVariableDeclaration), finished after its optional type annotation.
    const pos = this.#nodePos();
    this.#expect(Kind.CatchKeyword);
    let variableDeclaration: VariableDeclaration | undefined;
    if (this.#consumeOptional(Kind.OpenParenToken)) {
      const variablePos = this.#nodePos();
      const name = this.#parseBindingName();
      const type = this.#parseOptionalTypeAnnotation();
      variableDeclaration = this.#finishNode(createVariableDeclaration(name, undefined, type, undefined), variablePos);
      this.#expect(Kind.CloseParenToken);
    }
    return this.#finishNode(createCatchClause(variableDeclaration, this.#parseBlock()), pos);
  }

  #parseSwitchStatement(): Statement {
    // tsgo parseSwitchStatement: pos at the `switch` keyword. The CaseBlock has its own pos
    // at the `{` (tsgo parseCaseBlock); each case/default clause has its own pos captured at
    // the top of the loop iteration before consuming the case/default keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.SwitchKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    const caseBlockPos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #3): tsgo parseCaseBlock uses
    // parseList(PCSwitchClauses, parseCaseOrDefaultClause). element: Case||Default;
    // terminator: CloseBrace (or EOF).
    const clauses = this.#parseList(PCSwitchClauses, () => this.#parseCaseOrDefaultClause());
    this.#expect(Kind.CloseBraceToken);
    const caseBlock = this.#finishNode(createCaseBlock(clauses), caseBlockPos);
    return this.#finishNode(createSwitchStatement(expression, caseBlock), pos);
  }

  #parseCaseOrDefaultClause(): CaseOrDefaultClause {
    // tsgo parseCaseOrDefaultClause: if token==Case -> parseCaseClause, else
    // parseDefaultClause. pos at the case/default keyword; finishNode after the
    // clause statement list. The neither-token tail is UNREACHABLE here: #parseList
    // only calls this when isListElement(PCSwitchClauses) = Case||Default is true.
    const clausePos = this.#nodePos();
    if (this.#consumeOptional(Kind.CaseKeyword)) {
      const caseExpression = this.#parseExpression();
      this.#expect(Kind.ColonToken);
      return this.#finishNode(createCaseClause(caseExpression, this.#parseCaseClauseStatements()), clausePos);
    }
    if (this.#consumeOptional(Kind.DefaultKeyword)) {
      this.#expect(Kind.ColonToken);
      return this.#finishNode(createDefaultClause(undefined as never, this.#parseCaseClauseStatements()), clausePos);
    }
    // codex Stage-3b 3b-flip: dormant (unreachable under PCSwitchClauses, which gates
    // entry on Case||Default). Match the dormant PCSwitchClauses parsingContextErrors
    // (X_case_or_default_expected, 1130) and return a benign empty default clause.
    this.#parseErrorAtCurrentToken(Diagnostics.X_case_or_default_expected);
    return this.#finishNode(createDefaultClause(undefined as never, createNodeArray([]) as NodeArray<Statement>), clausePos);
  }

  #parseCaseClauseStatements(): NodeArray<Statement> {
    // M3 3b-list-model retrofit (loop #4): tsgo uses
    // parseList(PCSwitchClauseStatements, parseStatement). element: isStartOfStatement;
    // terminator: CloseBrace||Case||Default (or EOF).
    return this.#parseList(PCSwitchClauseStatements, () => this.#parseStatement());
  }

  #parseExpression(precedence: number = 0): Expression {
    // tsgo: this method fuses parseBinaryExpressionOrHigher + parseBinaryExpressionRest +
    // parseConditionalExpressionRest. The node start for EVERY binary/as/satisfies/conditional
    // level is the LEFT operand's start. Capture pos ONCE before the left operand, then reuse
    // it at every level (tsgo threads the same `pos` / left.Pos() through the rest loops —
    // makeBinaryExpression uses pos, makeAsExpression/makeSatisfiesExpression use left.Pos(),
    // parseConditionalExpressionRest uses the threaded pos; never a fresh nodePos). The arrow
    // path re-captures its own pos in #parseArrowFunction, so the unconditional capture here is
    // benign (no double-stamp).
    const pos = this.#nodePos();
    if (precedence === 0 && this.#isArrowFunctionStart()) {
      return this.#parseArrowFunction();
    }
    let left = this.#parseUnaryExpressionOrHigher();
    while (true) {
      // wave 4b-swap: EXPRESSION-POSITION `>`-family via reScanGreaterThanToken
      // (tsgo parser.go:4582). The live scanner emits a single GreaterThanToken for
      // `>` (no greedy `>>`/`>>>`/`>=`/`>>=`/`>>>=`), so before reading precedence we
      // merge the `>`-family off the scanner. reScanGreaterThanToken is a no-op
      // unless the current token IS `>`, so calling it unconditionally each iteration
      // is safe (tsgo does exactly this at 4582). `<<` is still scanned greedily
      // (scanner.ts:1806-1813) so shift-left/relational `<` is unaffected.
      this.#reScanGreaterThan();
      const operatorToken = this.#current();
      const operatorPrecedence = binaryPrecedence.get(operatorToken.kind) ?? 0;
      // wave 4b-swap: `**` (AsteriskAsteriskToken) is the ONLY right-associative
      // binary operator, so it consumes at EQUAL precedence (recursing right);
      // all other operators consume only at strictly-greater precedence (tsgo
      // parser.go:4605-4613). `a**b**c` -> `a**(b**c)`; `a-b-c` stays `(a-b)-c`.
      const consume = operatorToken.kind === Kind.AsteriskAsteriskToken
        ? operatorPrecedence >= precedence
        : operatorPrecedence > precedence;
      if (!consume) {
        break;
      }
      this.#advance();
      const right = this.#parseExpression(operatorPrecedence);
      const token = createToken(operatorToken.kind as BinaryOperator) as BinaryOperatorToken;
      if (!isBinaryOperatorToken(token)) {
        // codex Stage-3b 3b-flip: UNREACHABLE internal invariant. The loop is entered
        // only when binaryPrecedence.get(operatorToken.kind) consumes (> precedence),
        // which holds only for binary-operator kinds, so isBinaryOperatorToken is always
        // true. A plain internal Error (debug assert), NOT the removed diagnostic class.
        throw new Error("Unexpected non-binary operator token");
      }
      left = this.#finishNode(createBinaryExpression(undefined, left, undefined, token as BinaryOperatorToken, right), pos);
    }
    while (this.#current().kind === Kind.AsKeyword || this.#current().kind === Kind.SatisfiesKeyword) {
      const operator = this.#current().kind;
      this.#advance();
      const type = this.#parseType();
      left = operator === Kind.AsKeyword
        ? this.#finishNode(createAsExpression(left, type), pos)
        : this.#finishNode(createSatisfiesExpression(left, type), pos);
    }
    if (precedence === 0 && this.#consumeOptional(Kind.QuestionToken)) {
      const whenTrue = this.#parseExpression();
      this.#expect(Kind.ColonToken);
      const whenFalse = this.#parseExpression();
      left = this.#finishNode(createConditionalExpression(left, createToken(Kind.QuestionToken) as QuestionToken, whenTrue, createToken(Kind.ColonToken) as ColonToken, whenFalse), pos);
    }
    return left;
  }

  #isArrowFunctionStart(): boolean {
    if (isIdentifierNameKind(this.#current().kind) && this.#peekKind() === Kind.EqualsGreaterThanToken) {
      return true;
    }
    if (this.#current().kind !== Kind.OpenParenToken) {
      return false;
    }
    // the same boundary logic, driven entirely off the live scanner cursor
    // inside one #lookAhead (bounded by the matching `)` then the post-`)`
    // peek). Scan forward tracking paren depth to the matching `)`, then decide
    // off the token after it (`=>` ⇒ arrow; `:` ⇒ scan for `=>` before a
    // statement boundary; anything else ⇒ not an arrow).
    return this.#lookAhead(() => {
      let depth = 0;
      while (this.#current().kind !== Kind.EndOfFile) {
        const kind = this.#current().kind;
        if (kind === Kind.OpenParenToken) {
          depth += 1;
          this.#nextToken();
          continue;
        }
        if (kind === Kind.CloseParenToken) {
          depth -= 1;
          this.#nextToken();
          if (depth === 0) {
            const nextKind = this.#current().kind;
            if (nextKind === Kind.EqualsGreaterThanToken) {
              return true;
            }
            if (nextKind !== Kind.ColonToken) {
              return false;
            }
            this.#nextToken();
            return this.#hasEqualsGreaterThanBeforeStatementBoundary();
          }
          continue;
        }
        this.#nextToken();
      }
      return false;
    });
  }

  // wave 4b-swap: scan forward from the CURRENT token (already inside the
  // #isArrowFunctionStart #lookAhead) for a `=>` before a statement boundary.
  #hasEqualsGreaterThanBeforeStatementBoundary(): boolean {
    while (this.#current().kind !== Kind.EndOfFile) {
      const kind = this.#current().kind;
      if (kind === Kind.EqualsGreaterThanToken) {
        return true;
      }
      if (kind === Kind.SemicolonToken || kind === Kind.OpenBraceToken || kind === Kind.CloseBraceToken) {
        return false;
      }
      this.#nextToken();
    }
    return false;
  }

  #parseArrowFunction(): Expression {
    // tsgo parseParenthesizedArrowFunctionExpression/parseSimpleArrowFunctionExpression:
    // the arrow node start is captured at entry (before the param/openParen).
    const pos = this.#nodePos();
    // codex-054 M3 Stage-2: arrows are NEVER generators, so signatureFlags = IfElse(isAsync,
    // Await) (tsgo parser.go:4344-4345). tsts builds arrows with no modifiers
    // (createArrowFunction(undefined, ...)) and does not parse an async-arrow modifier, so
    // isAsync is false here — matching the node tsts builds. This wrap is still load-bearing:
    // it Yield=false/Await=false around the params and body, which CLEARS any enclosing
    // Await/Yield (e.g. a non-async arrow inside an async function is NOT in await context),
    // exactly as tsgo parseFunctionBlock(IfElse(isAsync,Await)) does for the arrow body.
    const isAsync = false;
    const parameters: ParameterDeclaration[] = [];
    let type: TypeNode | undefined;
    if (isIdentifierNameKind(this.#current().kind)) {
      // tsgo parseParameter: the single-identifier ParameterDeclaration has its own
      // start at the identifier token.
      const paramPos = this.#nodePos();
      parameters.push(this.#finishNode(createParameterDeclaration(undefined, undefined, this.#parseIdentifier(), undefined, undefined, undefined), paramPos));
    } else {
      this.#expect(Kind.OpenParenToken);
      parameters.push(...this.#withSignatureContext(false, isAsync, () => this.#parseParameterList()));
      this.#expect(Kind.CloseParenToken);
      type = this.#parseOptionalTypeAnnotation();
    }
    this.#expect(Kind.EqualsGreaterThanToken);
    const body = this.#parseArrowBody(isAsync);
    return this.#finishNode(createArrowFunction(undefined, undefined, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type, createToken(Kind.EqualsGreaterThanToken) as EqualsGreaterThanToken, body), pos);
  }

  #parseArrowBody(isAsync: boolean): ConciseBody {
    // codex-054 M3 Stage-2: tsgo parseArrowFunctionExpressionBody (parser.go:4461-4485). A
    // block body goes through parseFunctionBlock(IfElse(isAsync,Await)) which sets
    // Yield=false, Await=isAsync and CLEARS DecoratorContext (parser.go:3497-3500). An
    // expression body sets Await=isAsync, Yield=false directly (parser.go:4483-4484). Both
    // are reproduced via #withSignatureContext(false, isAsync, ...); the block body also
    // clears DecoratorContext.
    if (this.#current().kind === Kind.OpenBraceToken) {
      // M3 6b: tsgo arrow block body goes through parseFunctionBlock (parser.go:4462),
      // which saves/restores statementHasAwaitIdentifier. The expression-body branch
      // below does NOT (tsgo parses it directly at parser.go:4483-4484).
      return this.#parseFunctionBlock(false, isAsync);
    }
    return this.#withSignatureContext(false, isAsync, () => this.#parseExpression());
  }

  // tsgo isUpdateExpression (parser.go:4692-4700). Returns false for the
  // simple-unary entry tokens (+ - ~ ! delete typeof void await) and for `new`,
  // which is parsed by the NewExpression path below. For LessThanToken, it returns
  // true exactly in the JSX variant (a leading `<` is then a JSX element, an
  // UpdateExpression-level construct); in the Standard variant a leading `<` is a
  // type assertion (a SimpleUnaryExpression), so this returns false.
  #isUpdateExpression(): boolean {
    switch (this.#current().kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
      case Kind.DeleteKeyword:
      case Kind.TypeOfKeyword:
      case Kind.VoidKeyword:
      case Kind.AwaitKeyword:
      case Kind.NewKeyword:
        return false;
      case Kind.LessThanToken:
        return this.#languageVariant === LanguageVariant.JSX;
      default:
        return true;
    }
  }

  // tsgo parseUnaryExpressionOrHigher (parser.go:4653-4689). Dispatch on
  // #isUpdateExpression: an UpdateExpression-level construct (incl. a JSX-variant
  // leading `<`) routes to #parsePostfixExpression (tsgo parseUpdateExpression);
  // a SimpleUnaryExpression (a unary operator, or a Standard-variant leading `<`
  // type assertion) routes to #parseUnaryExpression (tsgo parseSimpleUnaryExpression).
  // The `**` exponentiation rest (tsgo 4661-4665) is handled by #parseExpression's
  // precedence loop (binaryPrecedence carries AsteriskAsteriskToken).
  #parseUnaryExpressionOrHigher(): Expression {
    if (this.#isUpdateExpression()) {
      return this.#parsePostfixExpression();
    }
    return this.#parseUnaryExpression();
  }

  #parseUnaryExpression(): Expression {
    // tsgo parseSimpleUnaryExpression (parser.go:5045-5072): the simple-unary arms.
    // tsgo parsePrefixUnaryExpression/parseDeleteExpression/parseTypeOfExpression/
    // parseVoidExpression/parseAwaitExpression: node start is the operator keyword/punct,
    // captured before consuming it. The NewKeyword case captures its pos inside
    // #parseNewExpression. `++`/`--` are NOT here (they are UpdateExpression-level,
    // handled by #parsePostfixExpression — tsgo parseUpdateExpression:4704).
    const pos = this.#nodePos();
    const token = this.#current();
    switch (token.kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
        this.#advance();
        return this.#finishNode(createPrefixUnaryExpression(token.kind, this.#parseUnaryExpression()), pos);
      case Kind.NewKeyword:
        return this.#parseNewExpression();
      case Kind.DeleteKeyword:
        this.#advance();
        return this.#finishNode(createDeleteExpression(this.#parseUnaryExpression()), pos);
      case Kind.TypeOfKeyword:
        this.#advance();
        return this.#finishNode(createTypeOfExpression(this.#parseUnaryExpression()), pos);
      case Kind.VoidKeyword:
        this.#advance();
        return this.#finishNode(createVoidExpression(this.#parseUnaryExpression()), pos);
      case Kind.LessThanToken:
        // tsgo parseSimpleUnaryExpression LessThanToken case (parser.go:5055-5064).
        // Reached only when `<` follows a true unary operator (e.g. `+<foo>bar`) or
        // is the simple-unary entry: in JSX this is a JSX element parsed with
        // mustBeUnary=true (the binary recovery is INVALID in a unary context); in
        // Standard it is a `< Type > expr` type assertion.
        if (this.#languageVariant === LanguageVariant.JSX) {
          return this.#parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, undefined /*openingTag*/, true /*mustBeUnary*/);
        }
        return this.#parseTypeAssertion();
      case Kind.AwaitKeyword:
        // tsgo parseSimpleUnaryExpression AwaitKeyword arm (parser.go:5065-5069):
        // build an AwaitExpression ONLY when isAwaitExpression() holds (in an await
        // context, OR the lookahead heuristic says the next token starts an operand
        // on the same line). Otherwise FALL THROUGH to parseUpdateExpression, where
        // `await` is consumed as a plain identifier — which #newIdentifier flags for
        // the top-level-await reparse.
        if (this.#isAwaitExpression()) {
          return this.#parseAwaitExpression();
        }
        return this.#parsePostfixExpression();
      default:
        return this.#parsePostfixExpression();
    }
  }

  // tsgo isAwaitExpression (parser.go:5100-5108): at an AwaitKeyword, `await` heads an
  // AwaitExpression when EITHER we are already in an await context, OR the same
  // heuristic as yield — the next token begins an operand on the SAME line. When this
  // is false the `await` is treated as an identifier (handled by the unary fall-through
  // to parseUpdateExpression), which is what the 6b reparse later promotes to a real
  // AwaitExpression once AwaitContext is forced on.
  #isAwaitExpression(): boolean {
    if (this.#current().kind === Kind.AwaitKeyword) {
      if (this.#inAwaitContext()) {
        return true;
      }
      return this.#lookAhead(() => this.#nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine());
    }
    return false;
  }

  // tsgo parseAwaitExpression (parser.go:5093-5097): node start is the `await` keyword;
  // consume it, then parse the operand as a SimpleUnaryExpression. (tsts #parseUnaryExpression
  // is parseSimpleUnaryExpression.)
  #parseAwaitExpression(): Expression {
    const pos = this.#nodePos();
    this.#advance();
    return this.#finishNode(createAwaitExpression(this.#parseUnaryExpression()), pos);
  }

  // tsgo parseTypeAssertion (parser.go:5117-5125): `< Type > unaryExpression` =>
  // TypeAssertionExpression. The Standard-variant arm of the fused LessThanToken
  // handling (tsgo debug.Asserts the variant is never JSX here). Reuses #parseType
  // and recurses into #parseUnaryExpression for the asserted expression.
  #parseTypeAssertion(): Expression {
    const pos = this.#nodePos();
    this.#expect(Kind.LessThanToken);
    const typeNode = this.#parseType();
    this.#expect(Kind.GreaterThanToken);
    const expression = this.#parseUnaryExpression();
    return this.#finishNode(createTypeAssertion(typeNode, expression), pos);
  }

  #parsePostfixExpression(): Expression {
    // tsgo parseUpdateExpression (parser.go:4702-4719): the postfix/update node start
    // is the operand (LHS expression) start. Handles `++`/`--` PREFIX, the JSX-variant
    // leading `<` (mustBeUnary=false — binary recovery IS allowed here), then a
    // left-hand-side expression with an optional trailing `++`/`--`.
    const pos = this.#nodePos();
    const token = this.#current();
    if (token.kind === Kind.PlusPlusToken || token.kind === Kind.MinusMinusToken) {
      this.#advance();
      return this.#finishNode(createPrefixUnaryExpression(token.kind, this.#parseLeftHandSideExpression()), pos);
    }
    if (this.#languageVariant === LanguageVariant.JSX && token.kind === Kind.LessThanToken && this.#lookAhead(() => this.#nextTokenIsIdentifierOrKeywordOrGreaterThan())) {
      // tsgo parseUpdateExpression JSX arm (parser.go:4708-4711): a JSXElement is part
      // of primaryExpression. One token of lookahead (nextTokenIsIdentifierOrKeyword
      // OrGreaterThan) via the existing #lookAhead/#mark/#rewind primitive.
      return this.#parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, undefined /*openingTag*/, false /*mustBeUnary*/);
    }
    const expression = this.#parseLeftHandSideExpression();
    if ((this.#current().kind === Kind.PlusPlusToken || this.#current().kind === Kind.MinusMinusToken) && !this.#hasPrecedingLineBreak()) {
      const operator = this.#current().kind as Kind.PlusPlusToken | Kind.MinusMinusToken;
      this.#advance();
      return this.#finishNode(createPostfixUnaryExpression(expression, operator), pos);
    }
    return expression;
  }

  // tsgo nextTokenIsIdentifierOrKeywordOrGreaterThan (parser.go:4002-4004):
  // tokenIsIdentifierOrKeywordOrGreaterThan(nextToken()). ONE token of lookahead.
  // The caller wraps this in #lookAhead so the cursor + snapshot rewind.
  #nextTokenIsIdentifierOrKeywordOrGreaterThan(): boolean {
    this.#nextToken();
    return tokenIsIdentifierOrKeywordOrGreaterThan(this.#current().kind);
  }

  // ==========================================================================
  // M3 Stage-5a: JSX scanner-cadence wrappers (tsgo parser.go:4883-4896).
  // tsgo writes `p.token = p.scanner.ScanJsxX()`. The faithful tsts equivalents
  // call the JSX scanner method and refresh the #token snapshot DIRECTLY from the
  // live scanner result — NOT via #nextToken (which calls the REGULAR scanner.scan()).
  // ==========================================================================

  // tsgo scanJsxText (parser.go:4883). ADVANCE wrapper: the current token (e.g. the
  // `>` of an opening tag) is being consumed and the scanner re-positions to scan the
  // following JSX text/`</`/`{`/`<`. Record the consumed token's end as #prevTokenEnd
  // (so a following #finishNode covers it — identical bookkeeping to #nextToken, but
  // driving the JSX scanner), then refresh #token from the JSX scan result.
  #scanJsxText(): void {
    this.#prevTokenEnd = this.#token.end;
    const kind = this.#scanner.scanJsxToken();
    this.#refreshTokenFromScanner(kind);
  }

  // tsgo scanJsxIdentifier (parser.go:4888). IN-PLACE re-scan: ScanJsxIdentifier
  // MUTATES the current identifier/keyword token (appends `-`/identifier-parts) WITHOUT
  // advancing to a new token — the subsequent parseIdentifierName* does the advance.
  // So this is a REFRESH (no #prevTokenEnd perturbation), mirroring the reScan* sites.
  #scanJsxIdentifier(): void {
    const kind = this.#scanner.scanJsxIdentifier();
    this.#refreshTokenFromScanner(kind);
  }

  // tsgo scanJsxAttributeValue (parser.go:4893). ADVANCE wrapper: the current `=`
  // token is consumed and the scanner scans the value (a JSX-aware string, or `{`/`<`
  // re-tokenized via the normal scanner). Record `=`'s end as #prevTokenEnd, then
  // refresh #token from the JSX attribute-value scan result.
  #scanJsxAttributeValue(): void {
    this.#prevTokenEnd = this.#token.end;
    const kind = this.#scanner.scanJsxAttributeValue();
    this.#refreshTokenFromScanner(kind);
  }

  // tsgo reScanJsxToken (parser.go via p.scanner.ReScanJsxToken). IN-PLACE: re-reads
  // the CURRENT token from its full-start as a JSX token (used at the top of the
  // children loop). No #prevTokenEnd perturbation (it re-tokenizes in place).
  #reScanJsxToken(allowMultilineJsxText: boolean): void {
    const kind = this.#scanner.reScanJsxToken(allowMultilineJsxText);
    this.#refreshTokenFromScanner(kind);
  }

  // ==========================================================================
  // M3 Stage-5a/5b: JSX element / fragment / attribute productions.
  // Faithful 1:1 port of tsgo parser.go:4721-5043. 5b adds the child-content
  // productions (JsxText, {expr}, nested-element recursion) in #parseJsxChild /
  // #parseJsxText / #parseJsxExpression.
  // ==========================================================================

  // tsgo parseJsxElementOrSelfClosingElementOrFragment (parser.go:4721-4799). The top
  // JSX driver. mustBeUnary is threaded from the two entry points: #parsePostfixExpression
  // (parseUpdateExpression-equivalent) passes false; #parseUnaryExpression
  // (parseSimpleUnaryExpression-equivalent) passes true.
  #parseJsxElementOrSelfClosingElementOrFragment(
    inExpressionContext: boolean,
    topInvalidNodePosition: number,
    openingTag: JsxOpeningElement | JsxOpeningFragment | undefined,
    mustBeUnary: boolean,
  ): Expression {
    const pos = this.#nodePos();
    const opening = this.#parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext);
    let result: Expression;
    if (opening.kind === Kind.JsxOpeningElement) {
      const openingElement = opening as JsxOpeningElement;
      let children = this.#parseJsxChildren(openingElement);
      let closingElement: JsxClosingElement;
      const lastChild = children.length > 0 ? children[children.length - 1] : undefined;
      if (
        lastChild !== undefined
        && isJsxElement(lastChild)
        && !tagNamesAreEquivalent(lastChild.openingElement.tagName, lastChild.closingElement.tagName)
        && tagNamesAreEquivalent(openingElement.tagName, lastChild.closingElement.tagName)
      ) {
        // tsgo (4730-4755): an unclosed JsxOpeningElement incorrectly parsed its parent's
        // JsxClosingElement. Restructure (<div>(...<span>...</div>)) -> (<div>(...<span>...</>)</div>).
        // The synthesized inner closing tag is zero-width at the discarded child's children end;
        // explicit-end stamping via #finishNodeWithEnd (NO parent-pointer reset — tsts manages
        // parents in the binder, not the parser, consistent with #finishNode).
        const end = lastChild.children.end;
        const missingIdentifier = this.#finishNodeWithEnd(createIdentifier(""), end, end);
        const newClosingElement = this.#finishNodeWithEnd(createJsxClosingElement(missingIdentifier), end, end);
        const newLast = this.#finishNodeWithEnd(
          createJsxElement(lastChild.openingElement, lastChild.children, newClosingElement),
          lastChild.openingElement.pos,
          end,
        );
        const rebuilt = [...children.slice(0, children.length - 1), newLast];
        children = createNodeArray(rebuilt as readonly JsxChild[], children.pos, newLast.end) as NodeArray<JsxChild>;
        closingElement = lastChild.closingElement;
      } else {
        closingElement = this.#parseJsxClosingElement(openingElement, inExpressionContext);
        if (!tagNamesAreEquivalent(openingElement.tagName, closingElement.tagName)) {
          if (openingTag !== undefined && isJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.tagName, openingTag.tagName)) {
            // opening incorrectly matched with its parent's closing -- put error on opening
            this.#parseErrorAtRange(openingElement.tagName.pos, openingElement.tagName.end, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, [getTextOfNodeFromSourceText(this.#sourceText, openingElement.tagName, false)]);
          } else {
            // other opening/closing mismatches -- put error on closing
            this.#parseErrorAtRange(closingElement.tagName.pos, closingElement.tagName.end, Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, [getTextOfNodeFromSourceText(this.#sourceText, openingElement.tagName, false)]);
          }
        }
      }
      result = this.#finishNode(createJsxElement(openingElement, children, closingElement), pos);
    } else if (opening.kind === Kind.JsxOpeningFragment) {
      const openingFragment = opening as JsxOpeningFragment;
      const children = this.#parseJsxChildren(openingFragment);
      const closingFragment = this.#parseJsxClosingFragment(inExpressionContext);
      result = this.#finishNode(createJsxFragment(openingFragment, children, closingFragment), pos);
    } else if (opening.kind === Kind.JsxSelfClosingElement) {
      // Nothing else to do for self-closing elements.
      result = opening;
    } else {
      // tsgo panic("Unhandled case in parseJsxElementOrSelfClosingElementOrFragment").
      throw new Error("Unhandled case in parseJsxElementOrSelfClosingElementOrFragment");
    }
    // tsgo (4778-4797): in an expression context (not a unary context), a following `<`
    // means the user wrote invalid sibling-element JSX like `<div></div><div></div>`.
    // Speculatively parse the second element and wrap both in a synthetic comma
    // BinaryExpression so the error is better localized. Not done in a unary context
    // (the binary expression would not be a valid UnaryExpression).
    if (!mustBeUnary && inExpressionContext && this.#current().kind === Kind.LessThanToken) {
      const topBadPos = topInvalidNodePosition < 0 ? result.pos : topInvalidNodePosition;
      const invalidElement = this.#parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, topBadPos, undefined, false);
      const operatorToken = createToken(Kind.CommaToken) as BinaryOperatorToken;
      operatorToken.pos = invalidElement.pos;
      operatorToken.end = invalidElement.pos;
      this.#parseErrorAt(skipTrivia(this.#sourceText, topBadPos), invalidElement.end, Diagnostics.JSX_expressions_must_have_one_parent_element);
      result = this.#finishNodeWithEnd(createBinaryExpression(undefined, result, undefined, operatorToken as BinaryOperatorToken, invalidElement), pos, invalidElement.end);
    }
    return result;
  }

  // tsgo parseJsxChildren (parser.go:4801-4822). Custom loop (NOT #parseList): set the
  // PCJsxChildren bit, reScanJsxToken(true) at the top of each iteration, parseJsxChild,
  // break when it returns undefined, restore the bit, build the child NodeList.
  // 5b: #parseJsxChild now parses the CHILD-CONTENT arms (JsxText, {expr}, nested `<`),
  // each of which leaves the scanner positioned for the next child; the reScanJsxToken at
  // the top of the loop re-tokenizes the current position as a JSX token before each
  // child. The loop terminates when #parseJsxChild returns undefined (`</`/EOF).
  #parseJsxChildren(openingTag: JsxOpeningElement | JsxOpeningFragment): NodeArray<JsxChild> {
    const pos = this.#nodePos();
    const save = this.#parsingContexts;
    this.#parsingContexts |= (1 << PCJsxChildren);
    const list: JsxChild[] = [];
    for (;;) {
      this.#reScanJsxToken(true /*allowMultilineJsxText*/);
      const currentToken = this.#current().kind;
      const child = this.#parseJsxChild(openingTag, currentToken);
      if (child === undefined) {
        break;
      }
      list.push(child);
      if (
        isJsxOpeningElement(openingTag)
        && isJsxElement(child)
        && !tagNamesAreEquivalent(child.openingElement.tagName, child.closingElement.tagName)
        && tagNamesAreEquivalent(openingTag.tagName, child.closingElement.tagName)
      ) {
        // tsgo (4813-4818): stop after a mismatched child like <div>...(<span></div>)
        // so the </div> can be reattached at a higher level.
        break;
      }
    }
    this.#parsingContexts = save;
    return createNodeArray(list, pos, this.#nodePos()) as NodeArray<JsxChild>;
  }

  // tsgo parseJsxChild (parser.go:4824-4850). TERMINATION cases — EofToken (closing-tag-
  // expected diagnostic + undefined), LessThanSlashToken / ConflictMarkerTrivia (undefined).
  // CONTENT arms (5b): JsxText / JsxTextAllWhiteSpaces => #parseJsxText; OpenBraceToken =>
  // child-position #parseJsxExpression(inExpressionContext=false); LessThanToken => nested
  // #parseJsxElementOrSelfClosingElementOrFragment in child position (inExpressionContext=
  // false, topInvalidNodePosition=-1, openingTag threaded through, mustBeUnary=false). The
  // trailing `Unhandled case` panic is tsgo's invariant guard (parser.go:4849).
  #parseJsxChild(openingTag: JsxOpeningElement | JsxOpeningFragment, token: Kind): JsxChild | undefined {
    switch (token) {
      case Kind.EndOfFile: {
        // tsgo (4826-4839): issue the no-closing-tag error at the opening tag (not at EOF).
        if (this.#isJsxOpeningFragment(openingTag)) {
          this.#parseErrorAtRange(openingTag.pos, openingTag.end, Diagnostics.JSX_fragment_has_no_corresponding_closing_tag, []);
        } else {
          const tag = (openingTag as JsxOpeningElement).tagName;
          const start = Math.min(skipTrivia(this.#sourceText, tag.pos), tag.end);
          this.#parseErrorAt(start, tag.end, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, [getTextOfNodeFromSourceText(this.#sourceText, tag, false)]);
        }
        return undefined;
      }
      case Kind.LessThanSlashToken:
      case Kind.ConflictMarkerTrivia:
        return undefined;
      case Kind.JsxText:
      case Kind.JsxTextAllWhiteSpaces:
        return this.#parseJsxText();
      case Kind.OpenBraceToken:
        return this.#parseJsxExpression(false /*inExpressionContext*/);
      case Kind.LessThanToken:
        return this.#parseJsxElementOrSelfClosingElementOrFragment(false /*inExpressionContext*/, -1 /*topInvalidNodePosition*/, openingTag, false /*mustBeUnary*/) as JsxChild;
      default:
        // tsgo panic("Unhandled case in parseJsxChild") (parser.go:4849).
        throw new Error("Unhandled case in parseJsxChild");
    }
  }

  // tsgo parseJsxText (parser.go:4852-4857). pos = nodePos(); build JsxText from the
  // current token's value (for a JsxText token tokenStart === fullStartPos, so the raw
  // snapshot text equals tsgo's scanner.TokenValue()) and containsOnlyTriviaWhiteSpaces =
  // (token kind === JsxTextAllWhiteSpaces). The value/kind are read BEFORE #scanJsxText
  // advances the scanner to position for the next child; finishNode covers the consumed
  // JsxText via the #prevTokenEnd set by #scanJsxText.
  #parseJsxText(): JsxText {
    const pos = this.#nodePos();
    const token = this.#current();
    const result = createJsxText(token.text, token.kind === Kind.JsxTextAllWhiteSpaces);
    this.#scanJsxText();
    return this.#finishNode(result, pos);
  }

  // tsgo ast.IsJsxOpeningFragment narrowing for the parseJsxChild EOF arm.
  #isJsxOpeningFragment(node: JsxOpeningElement | JsxOpeningFragment): node is JsxOpeningFragment {
    return node.kind === Kind.JsxOpeningFragment;
  }

  // tsgo parseJsxOpeningOrSelfClosingElementOrOpeningFragment (parser.go:4913-4946).
  #parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext: boolean): JsxOpeningElement | JsxSelfClosingElement | JsxOpeningFragment {
    const pos = this.#nodePos();
    this.#expect(Kind.LessThanToken);
    if (this.#current().kind === Kind.GreaterThanToken) {
      // `<>` opening fragment. scanJsxText positions the scanner for children.
      this.#scanJsxText();
      return this.#finishNode(createJsxOpeningFragment(), pos);
    }
    const tagName = this.#parseJsxElementName();
    // tsgo (4923): typeArguments parsed only when NOT a JS file. tsonic is always TS/TSX
    // (contextFlags never carries JavaScriptFile), so the guard is always true and type
    // args are attempted. #parseOptionalTypeArguments is the LessThan-guarded
    // parseBracketedList(PCTypeArguments) — exactly tsgo parseTypeArguments.
    const typeArguments = (this.#contextFlags & NodeFlags.JavaScriptFile) === 0 ? this.#parseOptionalTypeArguments() : undefined;
    const attributes = this.#parseJsxAttributes();
    if (this.#current().kind === Kind.GreaterThanToken) {
      // Opening tag. scanJsxText scans the immediately-following text with JSX rules.
      this.#scanJsxText();
      return this.#finishNode(createJsxOpeningElement(tagName, typeArguments, attributes), pos);
    }
    this.#expect(Kind.SlashToken);
    if (this.#parseExpectedGreaterThanWithoutAdvancing()) {
      if (inExpressionContext) {
        this.#nextToken();
      } else {
        this.#scanJsxText();
      }
    }
    return this.#finishNode(createJsxSelfClosingElement(tagName, typeArguments, attributes), pos);
  }

  // tsgo parseExpectedWithoutAdvancing(KindGreaterThanToken) (parser.go:4936/5034). On a
  // match returns true WITHOUT advancing; on a mismatch records X_0_expected and returns
  // false. Used by JSX self-closing/closing where the caller manually re-scans.
  #parseExpectedGreaterThanWithoutAdvancing(): boolean {
    if (this.#current().kind === Kind.GreaterThanToken) {
      return true;
    }
    this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, [tokenToString(Kind.GreaterThanToken) ?? kindDebugName(Kind.GreaterThanToken)]);
    return false;
  }

  // tsgo parseJsxElementName (parser.go:4948-4964). A JSX element name is an Identifier,
  // a `this` keyword, a namespaced name (`a:b`), or a `.`-chain (PropertyAccess). The
  // namespaced name short-circuits (no `.` chain on `a:b`). The `.`-chain reuses the
  // shared #parseRightSideOfDot, NOT a hand-rolled A.B.C.
  #parseJsxElementName(): JsxTagNameExpression {
    const pos = this.#nodePos();
    const initialExpression = this.#parseJsxTagName();
    if (isJsxNamespacedName(initialExpression)) {
      return initialExpression;
    }
    let expression: JsxTagNameExpression = initialExpression;
    while (this.#consumeOptional(Kind.DotToken)) {
      const name = this.#parseRightSideOfDot(true /*allowIdentifierNames*/, false /*allowPrivateIdentifiers*/, false /*allowUnicodeEscapeSequenceInIdentifierName*/);
      expression = this.#finishNode(createPropertyAccessExpression(expression, undefined, name, NodeFlags.None), pos);
    }
    return expression;
  }

  // tsgo parseJsxTagName (parser.go:4966-4980). scanJsxIdentifier-driven; allows the
  // `this` keyword tag and the `a:b` namespaced-name form. Uses the unicode-escape-
  // erroring identifier-name helper (keyword-allowed).
  #parseJsxTagName(): JsxTagNameExpression {
    const pos = this.#nodePos();
    this.#scanJsxIdentifier();
    const isThis = this.#current().kind === Kind.ThisKeyword;
    const tagName = this.#parseIdentifierNameErrorOnUnicodeEscapeSequence();
    if (this.#consumeOptional(Kind.ColonToken)) {
      this.#scanJsxIdentifier();
      return this.#finishNode(createJsxNamespacedName(tagName, this.#parseIdentifierNameErrorOnUnicodeEscapeSequence()), pos);
    }
    if (isThis) {
      return this.#finishNode(createKeywordExpression(Kind.ThisKeyword), pos);
    }
    return tagName;
  }

  // tsgo parseJsxAttributes (parser.go:4982-4985). parseList(PCJsxAttributes, parseJsxAttribute).
  #parseJsxAttributes(): JsxOpeningElement["attributes"] {
    const pos = this.#nodePos();
    const properties = this.#parseList(PCJsxAttributes, () => this.#parseJsxAttribute());
    return this.#finishNode(createJsxAttributes(properties), pos);
  }

  // tsgo parseJsxAttribute (parser.go:4987-4993). `{...}` => spread attribute; else a
  // name + optional value.
  #parseJsxAttribute(): JsxAttributeLike {
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseJsxSpreadAttribute();
    }
    const pos = this.#nodePos();
    return this.#finishNode(createJsxAttribute(this.#parseJsxAttributeName(), this.#parseJsxAttributeValue()), pos);
  }

  // tsgo parseJsxSpreadAttribute (parser.go:4995-5002). `{ ... expr }`.
  #parseJsxSpreadAttribute(): JsxAttributeLike {
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    this.#expect(Kind.DotDotDotToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createJsxSpreadAttribute(expression), pos);
  }

  // tsgo parseJsxAttributeName (parser.go:5004-5013). scanJsxIdentifier-driven; allows
  // the `a:b` namespaced-name form.
  #parseJsxAttributeName(): JsxAttributeName {
    const pos = this.#nodePos();
    this.#scanJsxIdentifier();
    const attrName = this.#parseIdentifierNameErrorOnUnicodeEscapeSequence();
    if (this.#consumeOptional(Kind.ColonToken)) {
      this.#scanJsxIdentifier();
      return this.#finishNode(createJsxNamespacedName(attrName, this.#parseIdentifierNameErrorOnUnicodeEscapeSequence()), pos);
    }
    return attrName;
  }

  // tsgo parseJsxAttributeValue (parser.go:5015-5029). After `=`: a JSX-scanned string
  // literal, or `{expr}` JsxExpression, or a JSX element value. No `=` => no initializer.
  #parseJsxAttributeValue(): JsxAttributeValue | undefined {
    if (this.#current().kind === Kind.EqualsToken) {
      this.#scanJsxAttributeValue();
      if (this.#current().kind === Kind.StringLiteral) {
        return this.#parseLiteralExpressionAdvancing() as JsxAttributeValue;
      }
      if (this.#current().kind === Kind.OpenBraceToken) {
        return this.#parseJsxExpression(true /*inExpressionContext*/) as JsxAttributeValue;
      }
      if (this.#current().kind === Kind.LessThanToken) {
        return this.#parseJsxElementOrSelfClosingElementOrFragment(true /*inExpressionContext*/, -1, undefined, false) as JsxAttributeValue;
      }
      this.#parseErrorAtCurrentToken(Diagnostics.X_or_JSX_element_expected);
    }
    return undefined;
  }

  // tsgo parseLiteralExpression(false /*intern*/) for a JSX attribute StringLiteral
  // (parser.go:5769). Builds a StringLiteral from the current token then advances —
  // identical to #parseStringLiteralExpression's body but the token is already known to
  // be a StringLiteral (no #expect) since the JSX-attribute-value scan produced it.
  #parseLiteralExpressionAdvancing(): Expression {
    const pos = this.#nodePos();
    const token = this.#current();
    this.#advance();
    return this.#finishNode(createStringLiteral(unquote(token.text), 0), pos);
  }

  // tsgo parseJsxExpression (parser.go:4859-4881). Shared by BOTH positions:
  //  - attribute value (#parseJsxAttributeValue, inExpressionContext=true): close via
  //    #expect(CloseBraceToken) — the normal scanner advance.
  //  - child position (#parseJsxChild OpenBraceToken arm, inExpressionContext=false): a
  //    leading `...` spread token is permitted, the close is checked WITHOUT advancing
  //    (#parseExpectedCloseBraceWithoutAdvancing), then #scanJsxText re-positions the
  //    scanner for the next child (tsgo 4877-4879).
  // The expression body (when not immediately `}`) re-enters the NORMAL #parseExpression.
  // Both call sites only invoke this when the current token is `{`, so the missing-`{`
  // fallback (tsgo `return nil`) is a never-reached invariant guard.
  #parseJsxExpression(inExpressionContext: boolean): JsxExpression {
    const pos = this.#nodePos();
    if (!this.#consumeOptional(Kind.OpenBraceToken)) {
      this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, [tokenToString(Kind.OpenBraceToken) ?? kindDebugName(Kind.OpenBraceToken)]);
      return this.#finishNode(createJsxExpression(undefined, undefined), pos);
    }
    let dotDotDotToken: DotDotDotToken | undefined;
    let expression: Expression | undefined;
    if (this.#current().kind !== Kind.CloseBraceToken) {
      if (!inExpressionContext) {
        // Child position: a spread child `{...expr}` is permitted (tsgo 4867-4869).
        dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) as DotDotDotToken : undefined;
      }
      // Only an AssignmentExpression is valid per the JSX spec, but a comma sequence is
      // parsed unambiguously here so grammar checking can give a better error (tsgo 4870-4873).
      expression = this.#parseExpression();
    }
    if (inExpressionContext) {
      this.#expect(Kind.CloseBraceToken);
    } else if (this.#parseExpectedCloseBraceWithoutAdvancing()) {
      // Child position: manually advance the JSX scanner to position for the next child.
      this.#scanJsxText();
    }
    return this.#finishNode(createJsxExpression(dotDotDotToken, expression), pos);
  }

  // tsgo parseExpectedWithoutAdvancing(KindCloseBraceToken) for the child-position
  // JsxExpression close. Match => true (no advance); mismatch => record X_0_expected + false.
  #parseExpectedCloseBraceWithoutAdvancing(): boolean {
    if (this.#current().kind === Kind.CloseBraceToken) {
      return true;
    }
    this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, [tokenToString(Kind.CloseBraceToken) ?? kindDebugName(Kind.CloseBraceToken)]);
    return false;
  }

  // tsgo parseJsxClosingElement (parser.go:4898-4911). `</ tagName >`. The `>` is checked
  // WITHOUT advancing, then the scanner is manually advanced (nextToken for an
  // expression-context/mismatched close, scanJsxText otherwise).
  #parseJsxClosingElement(open: JsxOpeningElement, inExpressionContext: boolean): JsxClosingElement {
    const pos = this.#nodePos();
    this.#expect(Kind.LessThanSlashToken);
    const tagName = this.#parseJsxElementName();
    if (this.#parseExpectedGreaterThanWithoutAdvancing()) {
      if (inExpressionContext || !tagNamesAreEquivalent(open.tagName, tagName)) {
        this.#nextToken();
      } else {
        this.#scanJsxText();
      }
    }
    return this.#finishNode(createJsxClosingElement(tagName), pos);
  }

  // tsgo parseJsxClosingFragment (parser.go:5031-5043). `</ >`.
  #parseJsxClosingFragment(inExpressionContext: boolean): JsxClosingFragment {
    const pos = this.#nodePos();
    this.#expect(Kind.LessThanSlashToken);
    if (this.#parseExpectedGreaterThanWithoutAdvancingFragment()) {
      if (inExpressionContext) {
        this.#nextToken();
      } else {
        this.#scanJsxText();
      }
    }
    return this.#finishNode(createJsxClosingFragment(), pos);
  }

  // tsgo parseExpectedWithDiagnostic(KindGreaterThanToken, Expected_corresponding_
  // closing_tag_for_JSX_fragment, shouldAdvance=false) (parser.go:5034). Match => true
  // (no advance); mismatch => record the fragment-specific diagnostic + false.
  #parseExpectedGreaterThanWithoutAdvancingFragment(): boolean {
    if (this.#current().kind === Kind.GreaterThanToken) {
      return true;
    }
    this.#parseErrorAtCurrentToken(Diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment);
    return false;
  }

  // tsgo parseRightSideOfDot (parser.go:2920-2972). The shared dotted-name right-side
  // behavior, reused by the JSX tag-name dot-chain (do NOT hand-roll A.B.C in JSX). The
  // ASI/private-identifier arms are faithful; for JSX it is called with
  // allowIdentifierNames=true, allowPrivateIdentifiers=false,
  // allowUnicodeEscapeSequenceInIdentifierName=false (the unicode-erroring helper).
  #parseRightSideOfDot(allowIdentifierNames: boolean, allowPrivateIdentifiers: boolean, allowUnicodeEscapeSequenceInIdentifierName: boolean): Identifier | PrivateIdentifier {
    if (this.#hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(this.#current().kind) && this.#lookAhead(() => {
      this.#nextToken();
      return tokenIsIdentifierOrKeyword(this.#current().kind) && !this.#hasPrecedingLineBreak();
    })) {
      this.#parseErrorAt(this.#nodePos(), this.#nodePos(), Diagnostics.Identifier_expected);
      return this.#createMissingIdentifier();
    }
    if (this.#current().kind === Kind.PrivateIdentifier) {
      const pid = this.#parseMemberName() as PrivateIdentifier;
      if (allowPrivateIdentifiers) {
        return pid;
      }
      this.#parseErrorAt(this.#nodePos(), this.#nodePos(), Diagnostics.Identifier_expected);
      return this.#createMissingIdentifier();
    }
    if (allowIdentifierNames) {
      if (allowUnicodeEscapeSequenceInIdentifierName) {
        return this.#parseIdentifier();
      }
      return this.#parseIdentifierNameErrorOnUnicodeEscapeSequence();
    }
    // M3 6b: tsgo parseRightSideOfDot final branch (parser.go:2961-2964) saves/restores
    // statementHasAwaitIdentifier around this parseIdentifier — the allowIdentifierNames
    // branches above intentionally do NOT (a `.await` member name over-records a span,
    // which the reparse handles idempotently), but this non-identifier-name branch does.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const id = this.#parseIdentifier();
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return id;
  }

  // M3 6b: tsgo newIdentifier (parser.go:2967-2974). The SINGLE identifier factory:
  // every identifier the parser builds from token text routes through here so the
  // top-level-await detector observes them. When the text is exactly "await" (i.e.
  // with AwaitContext OFF, a leading `await x` mis-parsed `await` as an Identifier),
  // flip #statementHasAwaitIdentifier so #parseToplevelStatement records the span and
  // #reparseTopLevelAwait can re-run the statement with AwaitContext ON. tsts has no
  // identifier-intern table, so the identifierCount bump is omitted (not part of 6b).
  #newIdentifier(text: string): Identifier {
    if (text === "await") {
      this.#statementHasAwaitIdentifier = true;
    }
    return createIdentifier(text);
  }

  // tsgo createMissingIdentifier (parser.go:2974-2976): a zero-width Identifier at the
  // current full-start, finished via #finishNode (no advance). Routes through
  // #newIdentifier like tsgo (text "" never matches "await", so this is a no-op flag-
  // wise — faithful, not behavior-changing).
  #createMissingIdentifier(): Identifier {
    return this.#finishNode(this.#newIdentifier(""), this.#nodePos());
  }

  // tsgo parseIdentifierNameErrorOnUnicodeEscapeSequence (parser.go:5795-5800). KEEP its
  // diagnostic behavior DISTINCT from the generic identifier helper: if the current token
  // carries a unicode escape, record Unicode_escape_sequence_cannot_appear_here, then
  // build the identifier (keyword-allowed) and advance. JSX tag parsing must NOT erase
  // unicode-escape diagnostics, so this is its own helper.
  #parseIdentifierNameErrorOnUnicodeEscapeSequence(): Identifier {
    const flags = this.#scanner.getTokenFlags();
    if ((flags & TokenFlags.UnicodeEscape) !== 0 || (flags & TokenFlags.ExtendedUnicodeEscape) !== 0) {
      this.#parseErrorAtCurrentToken(Diagnostics.Unicode_escape_sequence_cannot_appear_here);
    }
    // tsgo createIdentifier(tokenIsIdentifierOrKeyword(p.token)): build from the current
    // (identifier-or-keyword) token text and advance. The current token is an
    // identifier/keyword here (the JSX scan produced it), so build + advance directly.
    const pos = this.#nodePos();
    const token = this.#current();
    this.#advance();
    return this.#finishNode(this.#newIdentifier(token.text), pos);
  }

  #parseNewExpression(): Expression {
    // tsgo parseNewExpressionOrNewDotTarget: node start is the 'new' keyword. tsgo applies
    // member rest using that same 'new' start, so thread `pos` into #parseMemberSuffixes and
    // finish the NewExpression with the same pos.
    const pos = this.#nodePos();
    this.#expect(Kind.NewKeyword);
    const expression = this.#parseHeritageExpression();
    const typeArguments = this.#parseOptionalTypeArguments();
    let arguments_: NodeArray<Expression> | undefined;
    if (this.#consumeOptional(Kind.OpenParenToken)) {
      arguments_ = createNodeArray(this.#parseArgumentList()) as NodeArray<Expression>;
      this.#expect(Kind.CloseParenToken);
    }
    return this.#parseMemberSuffixes(this.#finishNode(createNewExpression(expression, typeArguments, arguments_), pos), pos);
  }

  #parseLeftHandSideExpression(): Expression {
    // tsgo parseLeftHandSideExpressionOrHigher: capture the base/primary start and thread it
    // into the member rest loop so every rest-loop node (property/element access, call,
    // non-null) is finished with the ORIGINAL base start.
    const pos = this.#nodePos();
    return this.#parseMemberSuffixes(this.#parsePrimaryExpression(), pos);
  }

  #parseMemberSuffixes(initialExpression: Expression, pos: number): Expression {
    // tsgo parseCallExpressionRest/parseMemberExpressionRest/parseElementAccessExpressionRest/
    // parsePropertyAccessExpressionRest: every node in the rest loop is finished with the
    // single threaded base start `pos`. finishNode runs AFTER the closing ')'/']' is consumed
    // so #nodeEnd() (the just-consumed last token's end) covers the closer.
    let expression = initialExpression;
    while (true) {
      const questionDotToken = this.#consumeOptional(Kind.QuestionDotToken) ? createToken(Kind.QuestionDotToken) as QuestionDotToken : undefined;
      if (questionDotToken !== undefined && this.#current().kind !== Kind.OpenParenToken && this.#current().kind !== Kind.OpenBracketToken) {
        expression = this.#finishNode(createPropertyAccessExpression(expression, questionDotToken, this.#parseMemberName(), NodeFlags.None), pos);
        continue;
      }
      if (questionDotToken === undefined && this.#consumeOptional(Kind.DotToken)) {
        expression = this.#finishNode(createPropertyAccessExpression(expression, undefined, this.#parseMemberName(), NodeFlags.None), pos);
        continue;
      }
      const typeArguments = this.#tryParseCallTypeArguments();
      if (questionDotToken !== undefined && this.#current().kind === Kind.OpenParenToken || typeArguments !== undefined && this.#current().kind === Kind.OpenParenToken) {
        this.#expect(Kind.OpenParenToken);
        const callee = createCallExpression(expression, questionDotToken, typeArguments, createNodeArray(this.#parseArgumentList()) as NodeArray<Expression>, NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        expression = this.#finishNode(callee, pos);
        continue;
      }
      if (this.#consumeOptional(Kind.OpenParenToken)) {
        const callee = createCallExpression(expression, undefined, undefined, createNodeArray(this.#parseArgumentList()) as NodeArray<Expression>, NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        expression = this.#finishNode(callee, pos);
        continue;
      }
      if (questionDotToken !== undefined && this.#current().kind === Kind.OpenBracketToken || questionDotToken === undefined && this.#consumeOptional(Kind.OpenBracketToken)) {
        if (questionDotToken !== undefined) {
          this.#expect(Kind.OpenBracketToken);
        }
        const access = createElementAccessExpression(expression, questionDotToken, this.#parseExpression(), NodeFlags.None);
        this.#expect(Kind.CloseBracketToken);
        expression = this.#finishNode(access, pos);
        continue;
      }
      if (questionDotToken !== undefined) {
        // codex Stage-3b 3b-flip: a `?.` not followed by `(`/`[`/property-name. tsgo
        // resolves this via parseRightSideOfDot -> parseIdentifierName ->
        // createMissingIdentifier(Identifier_expected). Record Identifier_expected
        // (1003) and build a PropertyAccessExpression with a zero-width missing member
        // name (NO advance); the loop continues and terminates next iteration since
        // nothing follows.
        this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
        expression = this.#finishNode(createPropertyAccessExpression(expression, questionDotToken, this.#finishNode(createIdentifier(""), this.#nodePos()), NodeFlags.None), pos);
        continue;
      }
      if (this.#consumeOptional(Kind.ExclamationToken)) {
        expression = this.#finishNode(createNonNullExpression(expression, NodeFlags.None), pos);
        continue;
      }
      return expression;
    }
  }

  // codex Stage-3b 3b-flip catchBailRework: faithful port of tsgo
  // tryParseTypeArgumentsInExpression (parser.go:5227-5247). No try/catch — recovery
  // is internal: #parseDelimitedList RECORDS, and the #mark/#rewind diagnosticsLen
  // truncate (Stage-3a) discards any diagnostics on the rewind path. This calls
  // #parseDelimitedList DIRECTLY (not #parseBracketedList) so there is no inner
  // #expect(`<`)/#expectGreaterThan recording a stray diagnostic — matching tsgo.
  #tryParseCallTypeArguments(): NodeArray<TypeNode> | undefined {
    if (this.#current().kind !== Kind.LessThanToken) {
      return undefined;
    }
    const mark = this.#mark();
    this.#reScanLessThan();
    if (this.#current().kind === Kind.LessThanToken) {
      this.#advance();
      const typeArguments = this.#parseDelimitedList(PCTypeArguments, () => this.#parseType());
      this.#reScanGreaterThan();
      if (this.#current().kind === Kind.GreaterThanToken) {
        this.#advance();
        // tsgo favors the type-argument interpretation only when the next token can
        // follow a type argument list in an expression (e.g. `(`/template); a `<`/`>`/
        // identifier disqualifies, so relational `x<y>z` stays a binary expression.
        if (this.#canFollowTypeArgumentsInExpression()) {
          return typeArguments === undefined ? undefined : typeArguments;
        }
      }
    }
    this.#rewind(mark);
    return undefined;
  }

  // codex Stage-3b 3b-flip: faithful port of tsgo canFollowTypeArgumentsInExpression
  // (parser.go:5249-5265). `(` / NoSubstitutionTemplateLiteral / TemplateHead favor
  // the type-arg interpretation; `<` / `>` / `+` / `-` disqualify it; otherwise favor
  // it when followed by a line break, a binary operator, or a non-expression-start.
  #canFollowTypeArgumentsInExpression(): boolean {
    switch (this.#current().kind) {
      case Kind.OpenParenToken:
      case Kind.NoSubstitutionTemplateLiteral:
      case Kind.TemplateHead:
        return true;
      case Kind.LessThanToken:
      case Kind.GreaterThanToken:
      case Kind.PlusToken:
      case Kind.MinusToken:
        return false;
    }
    return this.#hasPrecedingLineBreak() || this.#isBinaryOperator() || !this.#isStartOfExpression();
  }

  #parseArgumentList(): Expression[] {
    // M3 3b-list-model retrofit (loop #14): tsgo parseArgumentList uses
    // parseDelimitedList(PCArgumentExpressions, parseArgumentExpression). element:
    // DotDotDot||isStartOfExpression; terminator: CloseParen||Semicolon. Callers
    // wrap the array in createNodeArray; an array is returned to keep the signature.
    // On valid input identical to the prior while(true) loop.
    const expressions = this.#parseDelimitedList(PCArgumentExpressions, () => this.#parseArgumentExpression());
    return expressions === undefined ? [] : [...expressions];
  }

  #parseArgumentExpression(): Expression {
    // codex-054 M3 Stage-2: tsgo parseArgumentExpression (parser.go:5481) parses each
    // call-argument / array-literal element with NodeFlagsDisallowInContext |
    // NodeFlagsDecoratorContext CLEARED (value=false), so a top-level `in` IS allowed inside
    // arguments/array elements even when the call/array sits inside a for-initializer
    // (DisallowIn) context, and decorator-context recovery is off. Wrap the whole element.
    return this.#doInContext(NodeFlags.DisallowInContext | NodeFlags.DecoratorContext, false, () => {
      // tsgo parseSpreadElement: node start is the '...' token.
      const pos = this.#nodePos();
      if (this.#consumeOptional(Kind.DotDotDotToken)) {
        return this.#finishNode(createSpreadElement(this.#parseExpression()), pos);
      }
      return this.#parseExpression();
    });
  }

  #parsePrimaryExpression(): Expression {
    const token = this.#current();
    switch (token.kind) {
      case Kind.OpenBracketToken:
        return this.#parseArrayLiteralExpression();
      case Kind.OpenBraceToken:
        return this.#parseObjectLiteralExpression();
      case Kind.Identifier: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(this.#newIdentifier(token.text), pos);
      }
      case Kind.PrivateIdentifier: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createPrivateIdentifier(token.text), pos);
      }
      case Kind.FalseKeyword:
      case Kind.NullKeyword:
      case Kind.SuperKeyword:
      case Kind.ThisKeyword:
      case Kind.TrueKeyword: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createKeywordExpression(token.kind as Kind.FalseKeyword | Kind.NullKeyword | Kind.SuperKeyword | Kind.ThisKeyword | Kind.TrueKeyword), pos);
      }
      case Kind.NumericLiteral: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createNumericLiteral(token.text, 0), pos);
      }
      case Kind.BigIntLiteral: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createBigIntLiteral(token.text, 0), pos);
      }
      case Kind.SlashToken:
      case Kind.SlashEqualsToken: {
        // the live scanner yields SlashToken/SlashEqualsToken for `/`
        // (scanner.ts:1676+) — it does NOT auto-scan a RegularExpressionLiteral. At
        // the regex-allowed primary position, re-tokenize via reScanSlashToken()
        // (tsgo parser.go) and re-read
        // #token before building the regex literal (probe regex_literal_after_assignment
        // `x=/ab+/g;`).
        const pos = this.#nodePos();
        const kind = this.#scanner.reScanSlashToken();
        this.#refreshTokenFromScanner(kind);
        const regexToken = this.#current();
        this.#advance();
        return this.#finishNode(createRegularExpressionLiteral(regexToken.text, 0), pos);
      }
      case Kind.RegularExpressionLiteral: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createRegularExpressionLiteral(token.text, 0), pos);
      }
      case Kind.StringLiteral: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createStringLiteral(unquote(token.text), 0), pos);
      }
      case Kind.NoSubstitutionTemplateLiteral: {
        const pos = this.#nodePos();
        this.#advance();
        return this.#finishNode(createNoSubstitutionTemplateLiteral(unquoteTemplate(token.text), 0), pos);
      }
      case Kind.TemplateHead:
        return this.#parseTemplateExpression();
      case Kind.FunctionKeyword:
        return this.#parseFunctionExpression();
      case Kind.OpenParenToken: {
        // tsgo parseParenthesizedExpression: node start is the '(' token; finish after the
        // closing ')' is consumed so the end covers it.
        const pos = this.#nodePos();
        this.#advance();
        const expression = this.#parseExpression();
        this.#expect(Kind.CloseParenToken);
        return this.#finishNode(createParenthesizedExpression(expression), pos);
      }
      default:
        if (isContextualExpressionIdentifierKind(token.kind)) {
          const pos = this.#nodePos();
          this.#advance();
          // M3 6b: a contextual-keyword identifier here includes `await` outside an
          // await context (AwaitKeyword passes isContextualExpressionIdentifierKind),
          // so route through #newIdentifier — this is the site that mis-parses a
          // leading `await` as an Identifier and flips #statementHasAwaitIdentifier.
          return this.#finishNode(this.#newIdentifier(token.text), pos);
        }
        // codex Stage-3b 3b-flip: tsgo's start-of-expression failure flows through
        // parseExpression -> createMissingIdentifier on Expression_expected (1109,
        // parser.go ~5650/2976). Record Expression_expected and return a zero-width
        // MISSING identifier at the current pos WITHOUT advancing.
        this.#parseErrorAtCurrentToken(Diagnostics.Expression_expected);
        return this.#finishNode(this.#newIdentifier(""), this.#nodePos());
    }
  }

  #parseFunctionExpression(): Expression {
    // tsgo parseFunctionExpression: node start is the 'function' keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) as AsteriskToken : undefined;
    // codex-054 M3 Stage-2: tsgo signatureFlags = IfElse(asterisk, Yield) |
    // IfElse(async modifier, Await) (parser.go:1950). tsts builds function expressions with
    // no modifiers list (createFunctionExpression(undefined, ...)) so it has no async-modifier
    // to read — isAsync is false, matching the node tsts builds; isGenerator comes from the
    // asterisk token. The worker wraps params and body (body also clears DecoratorContext).
    const isGenerator = asteriskToken !== undefined;
    const isAsync = false;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#withSignatureContext(isGenerator, isAsync, () => this.#parseParameterList());
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    // M3 6b: tsgo function-expression body goes through parseFunctionBlock (parser.go:1716),
    // which saves/restores statementHasAwaitIdentifier (a body `await` identifier must not
    // mark the enclosing top-level statement for reparse).
    const body = this.#parseFunctionBlock(isGenerator, isAsync);
    return this.#finishNode(createFunctionExpression(undefined, asteriskToken, name, typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, type, body), pos);
  }

  #parseTemplateExpression(): Expression {
    const headPos = this.#nodePos();
    const headToken = this.#expect(Kind.TemplateHead);
    const head = this.#finishNode(createTemplateHead(templateHeadText(headToken.text), templateHeadText(headToken.text), 0), headPos);
    const spans = [];
    while (true) {
      // tsgo parseTemplateSpan: span node start is the span expression start. finish after the
      // trailing TemplateMiddle/TemplateTail literal is consumed so the end covers it.
      const spanPos = this.#nodePos();
      const expression = this.#parseExpression();
      const literalPos = this.#nodePos();
      const literalToken = this.#parseLiteralOfTemplateSpan();
      const literal = literalToken.kind === Kind.TemplateMiddle
        ? this.#finishNode(createTemplateMiddle(templateMiddleText(literalToken.text), templateMiddleText(literalToken.text), 0), literalPos)
        : this.#finishNode(createTemplateTail(templateTailText(literalToken.text), templateTailText(literalToken.text), 0), literalPos);
      spans.push(this.#finishNode(createTemplateSpan(expression, literal as TemplateMiddleOrTail), spanPos));
      if (literalToken.kind === Kind.TemplateTail) {
        break;
      }
    }
    // tsgo parseTemplateExpression: node start is the TemplateHead start (reuse headPos).
    return this.#finishNode(createTemplateExpression(head, createNodeArray(spans) as NodeArray<TemplateSpan>), headPos);
  }

  // wave 4b-swap: tsgo parseLiteralOfTemplateSpan (parser.go:3727-3745). After a
  // span body, the CURRENT token is `}` (the live scanner emits CloseBraceToken,
  // NOT a TemplateMiddle/Tail, since scan() does not track brace depth). Re-scan
  // the `}`-started continuation in place via reScanTemplateToken(false) (tsgo
  // parser.go:5542), refresh #token, then read + advance past the Middle/Tail.
  #parseLiteralOfTemplateSpan(): ScannedToken {
    // codex Stage-3b 3b-flip: tsgo parseTemplateSpan/parseLiteralOfTemplateSpan uses
    // parseExpectedToken which records X_0_expected (1005) and synthesizes the
    // continuation token (parser.go ~3727). When the `}` that should start the
    // continuation is missing, or the re-scanned token is not a Middle/Tail, record
    // X_0_expected("}") and return a synthesized zero-width TemplateTail at the
    // current pos (NO advance) so the caller breaks the span loop.
    if (this.#current().kind !== Kind.CloseBraceToken) {
      this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, ["}"]);
      return { kind: Kind.TemplateTail, pos: this.#current().pos, end: this.#current().pos, text: "" };
    }
    const kind = this.#scanner.reScanTemplateToken(false);
    this.#refreshTokenFromScanner(kind);
    const literalToken = this.#current();
    if (literalToken.kind !== Kind.TemplateMiddle && literalToken.kind !== Kind.TemplateTail) {
      this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, ["}"]);
      return { kind: Kind.TemplateTail, pos: this.#current().pos, end: this.#current().pos, text: "" };
    }
    this.#advance();
    return literalToken;
  }

  #parseArrayLiteralExpression(): Expression {
    // tsgo parseArrayLiteralExpression: node start is the '[' token; finish after the closing
    // ']' is consumed. (The multiLine flag's whole-source includes("\n") is a pre-existing bug
    // out of scope for Stage 1b — left untouched.)
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBracketToken);
    // M3 3b-list-model retrofit (loop #16): tsgo parseArrayLiteralExpression uses
    // parseDelimitedList(PCArrayLiteralMembers, parseArgumentOrArrayLiteralElement).
    // element: (Comma||Dot true) else DotDotDot||isStartOfExpression; terminator:
    // CloseBracket (or EOF). The existing #parseArgumentExpression element parser is
    // kept (tsts has no OmittedExpression hole handling — a pre-existing gap, not in
    // scope for this loop retrofit). On valid input identical to the prior loop.
    const elements = this.#parseDelimitedList(PCArrayLiteralMembers, () => this.#parseArgumentExpression());
    this.#expect(Kind.CloseBracketToken);
    return this.#finishNode(createArrayLiteralExpression(elements ?? createNodeArray([]) as NodeArray<Expression>, this.#sourceText.includes("\n")), pos);
  }

  #parseObjectLiteralExpression(): Expression {
    // tsgo parseObjectLiteralExpression: node start is the '{' token; finish after the closing
    // '}' is consumed. Each element (parseObjectLiteralElement) captures its own start at the
    // top of the loop iteration before its first token (the '...' for spread, or the name).
    const pos = this.#nodePos();
    const openBrace = this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #15): tsgo parseObjectLiteralExpression uses
    // parseDelimitedList(PCObjectLiteralMembers, parseObjectLiteralElement). element:
    // OpenBracket||Asterisk||DotDotDot||Dot true else isLiteralPropertyName;
    // terminator: CloseBrace (or EOF); SPECIAL semicolon-skip arm applies. The
    // EXISTING tsts inline build is extracted into #parseObjectLiteralElement (the
    // loop no longer owns the trailing comma).
    const properties = this.#parseDelimitedList(PCObjectLiteralMembers, () => this.#parseObjectLiteralElement());
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createObjectLiteralExpression(properties ?? createNodeArray([]) as NodeArray<ObjectLiteralElementLike>, this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n")), pos);
  }

  #parseObjectLiteralElement(): ObjectLiteralElementLike {
    const elementPos = this.#nodePos();
    if (this.#consumeOptional(Kind.DotDotDotToken)) {
      return this.#finishNode(createSpreadAssignment(this.#parseExpression()), elementPos);
    }
    const name = this.#parsePropertyName();
    if (this.#consumeOptional(Kind.ColonToken)) {
      return this.#finishNode(createPropertyAssignment(undefined, name, undefined, undefined as never, this.#parseExpression()), elementPos);
    }
    return this.#finishNode(createShorthandPropertyAssignment(undefined, name, undefined, undefined as never, undefined, undefined), elementPos);
  }

  #parseStringLiteralExpression(): Expression {
    const pos = this.#nodePos();
    const token = this.#expect(Kind.StringLiteral);
    return this.#finishNode(createStringLiteral(unquote(token.text), 0), pos);
  }

  #parseModuleExportName(): ModuleExportName {
    if (this.#current().kind === Kind.StringLiteral) {
      return this.#parseStringLiteralExpression() as ModuleExportName;
    }
    return this.#parseIdentifier();
  }

  #parseBindingName(): BindingName {
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseObjectBindingPattern();
    }
    if (this.#current().kind === Kind.OpenBracketToken) {
      return this.#parseArrayBindingPattern();
    }
    return this.#parseIdentifier();
  }

  #parseObjectBindingPattern(): BindingName {
    // tsgo parseObjectBindingPattern (1669): pattern pos at the `{` (before
    // parseExpected); finishNode after the closing `}`.
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    // M3 3b-list-model retrofit (loop #12): tsgo parseObjectBindingPattern uses
    // parseDelimitedList(PCObjectBindingElements, parseObjectBindingElement). element:
    // OpenBracket||DotDotDot||isLiteralPropertyName; terminator: CloseBrace (or EOF).
    const elements = this.#parseDelimitedList(PCObjectBindingElements, () => this.#parseObjectBindingElement());
    this.#expect(Kind.CloseBraceToken);
    const node = createObjectBindingPattern(elements ?? createNodeArray([]) as NodeArray<BindingElement>);
    return this.#finishNode(node, pos);
  }

  #parseObjectBindingElement(): BindingElement {
    // tsgo parseObjectBindingElement (1680): pos at the top of the iteration,
    // BEFORE the optional `...`; finishNode after the optional initializer.
    const elementPos = this.#nodePos();
    const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) as DotDotDotToken : undefined;
    const firstName = this.#parsePropertyName();
    const propertyName = this.#consumeOptional(Kind.ColonToken) ? firstName : undefined;
    if (propertyName === undefined && firstName.kind !== Kind.Identifier) {
      // codex Stage-3b 3b-flip: tsgo parseObjectBindingElement (parser.go:2296) treats
      // a non-Identifier property name with no `:` via the missing-identifier path.
      // Record Identifier_expected (1003) and continue building the element with
      // firstName as the binding name (NO advance).
      this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
    }
    const name = propertyName === undefined ? firstName as BindingName : this.#parseBindingName();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return this.#finishNode(createBindingElement(dotDotDotToken, propertyName, name, initializer), elementPos);
  }

  #parseArrayBindingPattern(): BindingName {
    // tsgo parseArrayBindingPattern (1644): pattern pos at the `[` (before
    // parseExpected); finishNode after the closing `]`.
    //
    // M3 3b-list-model: this loop is INTENTIONALLY NOT retrofitted to
    // #parseDelimitedList(PCArrayBindingElements). tsgo's parseArrayBindingElement
    // creates the HOLE node (token==Comma => all-nil) WITHOUT consuming, and the
    // delimited list consumes the comma AFTER. Under tsts's end=#prevTokenEnd
    // (token-tight) finishNode semantics — which differ from tsgo's
    // end=nodePos()/TokenFullStart() — the hole's end would then be the PREVIOUS
    // comma's end (14) instead of the hole comma's end (16), drifting
    // array_binding_hole_and_elements_ranges (expected 16, got 14). The existing
    // loop consumes the comma INSIDE the iteration before finishNode, so the hole
    // end is the hole comma's end. Retrofitting this loop requires the tsgo end
    // semantics (a separate, out-of-scope architectural change), so it is left as
    // the hand-rolled loop to preserve byte-identical hole ranges.
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBracketToken);
    const elements: BindingElement[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      const elementPos = this.#nodePos();
      if (this.#consumeOptional(Kind.CommaToken)) {
        elements.push(this.#finishNode(createBindingElement(undefined, undefined, undefined, undefined), elementPos));
        continue;
      }
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) as DotDotDotToken : undefined;
      const name = this.#parseBindingName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      elements.push(this.#finishNode(createBindingElement(dotDotDotToken, undefined, name, initializer), elementPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    const node = createArrayBindingPattern(createNodeArray(elements) as NodeArray<BindingElement>);
    return this.#finishNode(node, pos);
  }

  #parsePropertyName(): PropertyName {
    // M3 6b: tsgo parsePropertyName (parser.go:3446-3448) saves/restores
    // statementHasAwaitIdentifier around the whole worker — a property name `await`
    // (`{ await: 1 }`, a member `await() {}`) is a member name, not a top-level await
    // expression, so it must NOT mark the enclosing statement for reparse.
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const prop = this.#parsePropertyNameWorker();
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return prop;
  }

  #parsePropertyNameWorker(): PropertyName {
    const token = this.#current();
    // tsgo parseComputedPropertyName (3466): pos at the `[` (before parseExpected);
    // finishNode after the closing `]`. Only this branch is stamped here; the
    // identifier/string/numeric/private branches stamp their own leaves below.
    const pos = token.pos;
    if (this.#consumeOptional(Kind.OpenBracketToken)) {
      const expression = this.#parseExpression();
      this.#expect(Kind.CloseBracketToken);
      return this.#finishNode(createComputedPropertyName(expression), pos);
    }
    if (token.kind === Kind.StringLiteral) {
      return this.#parseStringLiteralExpression() as PropertyName;
    }
    if (token.kind === Kind.NumericLiteral) {
      const pos = this.#nodePos();
      this.#advance();
      return this.#finishNode(createNumericLiteral(token.text, 0), pos) as PropertyName;
    }
    if (token.kind === Kind.PrivateIdentifier) {
      const pos = this.#nodePos();
      this.#advance();
      return this.#finishNode(createPrivateIdentifier(token.text), pos);
    }
    return this.#parseIdentifier();
  }

  #parseMemberName(): Identifier | PrivateIdentifier {
    if (this.#current().kind === Kind.PrivateIdentifier) {
      const pos = this.#nodePos();
      const token = this.#advance();
      return this.#finishNode(createPrivateIdentifier(token.text), pos);
    }
    return this.#parseIdentifier();
  }

  #parseOptionalPostfixToken(): QuestionToken | ExclamationToken | undefined {
    if (this.#consumeOptional(Kind.QuestionToken)) {
      return createToken(Kind.QuestionToken) as QuestionToken;
    }
    if (this.#consumeOptional(Kind.ExclamationToken)) {
      return createToken(Kind.ExclamationToken) as ExclamationToken;
    }
    return undefined;
  }

  #parseIdentifier(): Identifier {
    // tsgo parseIdentifier (parser.go:5823-5825) -> parseIdentifierWithDiagnostic(nil,
    // nil) -> createIdentifierWithDiagnostic(p.isIdentifier(), nil, nil). This is the
    // generic identifier helper; the diagnosticMessage / privateIdentifierDiagnosticMessage
    // arms are nil here, so it routes through #createIdentifierWithDiagnostic with both
    // messages undefined. The acceptance gate stays isIdentifierNameKind (the existing
    // corpus-validated gate that mirrors tsgo's isIdentifier acceptance for the tokens
    // the corpus exercises); the error path below is the faithful decomposition.
    return this.#createIdentifierWithDiagnostic(isIdentifierNameKind(this.#current().kind), undefined, undefined);
  }

  // tsgo createIdentifierWithDiagnostic (parser.go:5835-5880). On a valid identifier:
  // build it from the token text and advance. On a PrivateIdentifier: record the
  // private-identifier diagnostic (caller-supplied or Private_identifiers_are_not_
  // allowed_outside_class_bodies) then build the identifier from the token text and
  // advance (tsgo's `return p.createIdentifier(true)` path consumes the token). Otherwise
  // pick the error message: a caller-supplied diagnosticMessage wins; else if the token is
  // a reserved word, report Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_
  // here with the token text; else the generic Identifier_expected. The EOF token reports
  // at the token full-start (reportAtCurrentPosition). Finally return a zero-width MISSING
  // identifier at the current pos WITHOUT advancing (tsgo createMissingIdentifier).
  #createIdentifierWithDiagnostic(isIdentifier: boolean, diagnosticMessage: DiagnosticMessage | undefined, privateIdentifierDiagnosticMessage: DiagnosticMessage | undefined): Identifier {
    const token = this.#current();
    if (isIdentifier) {
      const pos = this.#nodePos();
      this.#advance();
      return this.#finishNode(this.#newIdentifier(token.text), pos);
    }
    if (token.kind === Kind.PrivateIdentifier) {
      this.#parseErrorAtCurrentToken(privateIdentifierDiagnosticMessage ?? Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
      return this.#createIdentifier(true);
    }
    // Only for end of file because the error gets reported incorrectly on embedded script tags.
    const reportAtCurrentPosition = token.kind === Kind.EndOfFile;
    if (diagnosticMessage !== undefined) {
      if (reportAtCurrentPosition) {
        const pos = this.#token.fullStart;
        this.#parseErrorAt(pos, pos, diagnosticMessage);
      } else {
        this.#parseErrorAtCurrentToken(diagnosticMessage);
      }
    } else if (isReservedWord(token.kind)) {
      if (reportAtCurrentPosition) {
        const pos = this.#token.fullStart;
        this.#parseErrorAt(pos, pos, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, [token.text]);
      } else {
        this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, [token.text]);
      }
    } else {
      if (reportAtCurrentPosition) {
        const pos = this.#token.fullStart;
        this.#parseErrorAt(pos, pos, Diagnostics.Identifier_expected);
      } else {
        this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
      }
    }
    return this.#createMissingIdentifier();
  }

  // tsgo createIdentifier (parser.go:5831-5833): createIdentifierWithDiagnostic with both
  // diagnostic messages nil.
  #createIdentifier(isIdentifier: boolean): Identifier {
    return this.#createIdentifierWithDiagnostic(isIdentifier, undefined, undefined);
  }

  #parseOptionalTypeAnnotation(): TypeNode | undefined {
    if (!this.#consumeOptional(Kind.ColonToken)) {
      return undefined;
    }
    return this.#parseType();
  }

  #parseType(): TypeNode {
    // codex-054 M3 Stage-2: tsgo parseType (parser.go:2606-2607) clears
    // NodeFlagsTypeExcludesFlags (= YieldContext | AwaitContext) for the WHOLE type, so a
    // type annotation inside an async/generator signature does NOT inherit Await/Yield
    // context. Wrap the entire production in #doInContext with both bits cleared; the
    // #doInContext finally restores the enclosing Await/Yield afterwards (so e.g. an async
    // function's body — parsed after its return-type annotation — resumes Await context).
    return this.#doInContext(NodeFlags.TypeExcludesFlags, false, () => {
      const predicate = this.#tryParseTypePredicate();
      if (predicate !== undefined) {
        return predicate;
      }
      // tsgo parseType (2607): pos captured before parseUnionTypeOrHigher; the same
      // pos doubles as the conditional-type start (covers checkType through falseType).
      const pos = this.#nodePos();
      const checkType = this.#parseUnionType();
      if (this.#consumeOptional(Kind.ExtendsKeyword)) {
        // codex-054 M3 Stage-2: tsgo parseType (parser.go:2617/2619/2621) parses the
        // extends-type with DisallowConditionalTypesContext=true (a bare nested conditional
        // is forbidden as the extends-type) and the true/false branches with it set to false
        // (conditionals re-permitted). The extends=true flag is also what the infer-constraint
        // rewind (#tryParseConstraintOfInferType) reads to KEEP its constraint.
        const extendsType = this.#doInContext(NodeFlags.DisallowConditionalTypesContext, true, () => this.#parseType());
        this.#expect(Kind.QuestionToken);
        const trueType = this.#doInContext(NodeFlags.DisallowConditionalTypesContext, false, () => this.#parseType());
        this.#expect(Kind.ColonToken);
        const falseType = this.#doInContext(NodeFlags.DisallowConditionalTypesContext, false, () => this.#parseType());
        return this.#finishNode(createConditionalTypeNode(checkType, extendsType, trueType, falseType), pos);
      }
      return checkType;
    });
  }

  #parseUnionType(): TypeNode {
    // tsgo parseUnionOrIntersectionType (2639): pos at entry (before the optional
    // leading operator); finishNode ONLY when the union node is actually built. The
    // single-constituent passthrough returns the child unwrapped and must NOT be
    // re-stamped (else the child's correct range is overwritten).
    const pos = this.#nodePos();
    const hasLeadingBar = this.#consumeOptional(Kind.BarToken);
    const types = [this.#parseIntersectionType()];
    while (this.#consumeOptional(Kind.BarToken)) {
      types.push(this.#parseIntersectionType());
    }
    if (!hasLeadingBar && types.length === 1) {
      return types[0]!;
    }
    return this.#finishNode(this.#createUnionOrIntersectionTypeNode(Kind.BarToken, createNodeArray(types) as NodeArray<TypeNode>), pos);
  }

  #parseIntersectionType(): TypeNode {
    // tsgo parseUnionOrIntersectionType (2639): pos at entry; finishNode ONLY when
    // the intersection node is built (single-constituent passthrough unwrapped).
    const pos = this.#nodePos();
    const types = [this.#parsePostfixType()];
    while (this.#consumeOptional(Kind.AmpersandToken)) {
      types.push(this.#parsePostfixType());
    }
    if (types.length === 1) {
      return types[0]!;
    }
    return this.#finishNode(this.#createUnionOrIntersectionTypeNode(Kind.AmpersandToken, createNodeArray(types) as NodeArray<TypeNode>), pos);
  }

  // tsgo createUnionOrIntersectionTypeNode (parser.go:2661-2670): BarToken -> union,
  // AmpersandToken -> intersection; any other operator is unreachable (tsgo panics).
  #createUnionOrIntersectionTypeNode(operator: Kind, types: NodeArray<TypeNode>): TypeNode {
    switch (operator) {
      case Kind.BarToken:
        return createUnionTypeNode(types);
      case Kind.AmpersandToken:
        return createIntersectionTypeNode(types);
      default:
        throw new Error("Unhandled case in createUnionOrIntersectionType");
    }
  }

  #parsePostfixType(): TypeNode {
    // tsgo parsePostfixTypeOrHigher (2727): the node start for array (T[]) and
    // indexed-access (T[K]) is the LEFTMOST primary type's start — capture pos ONCE
    // before parseNonArrayType and thread that single pos into each loop iteration's
    // finishNode, finishing AFTER the closing ']' so the end covers it.
    // codex-054 M3 Stage-2: tsgo's parseTypeOperatorOrHigher default arm parses
    // postfix-and-higher under DisallowConditionalTypesContext=false (parser.go:2680). In tsts
    // that bit is set true ONLY transiently inside the conditional extends-type wrap
    // (#parseType) and the infer-constraint wrap, each of which restores it via #doInContext.
    // Outside those, DisallowConditionalTypes is its default (false) here, so no explicit wrap
    // is needed: #parsePostfixType / #parseIntersectionType never run under a stuck-true bit.
    const pos = this.#nodePos();
    let type = this.#parsePrimaryType();
    while (this.#current().kind === Kind.OpenBracketToken) {
      this.#advance();
      if (this.#consumeOptional(Kind.CloseBracketToken)) {
        type = this.#finishNode(createArrayTypeNode(type), pos);
        continue;
      }
      const indexType = this.#parseType();
      this.#expect(Kind.CloseBracketToken);
      type = this.#finishNode(createIndexedAccessTypeNode(type, indexType), pos);
    }
    return type;
  }

  #parsePrimaryType(): TypeNode {
    // tsgo: each non-array type production captures pos := nodePos() at its start
    // (before its first token). None of the branches below consume a token before
    // this point, so a single capture at the top covers all of them. The two
    // function-type branches ('<' and '(' paths) own their pos internally.
    const pos = this.#nodePos();
    const token = this.#current();
    if (token.kind === Kind.KeyOfKeyword || token.kind === Kind.ReadonlyKeyword || token.kind === Kind.UniqueKeyword) {
      this.#advance();
      return this.#finishNode(createTypeOperatorNode(token.kind as Kind.KeyOfKeyword | Kind.ReadonlyKeyword | Kind.UniqueKeyword, this.#parsePostfixType()), pos);
    }
    if (token.kind === Kind.InferKeyword) {
      // tsgo parseTypeOperatorOrHigher (2677) dispatches `infer` to parseInferType.
      return this.#parseInferType();
    }
    if (token.kind === Kind.ImportKeyword) {
      // tsgo parseNonArrayType (2807) KindImportKeyword -> parseImportType. Not a typeof
      // import here (that is routed from the TypeOfKeyword branch below).
      return this.#parseImportType(false);
    }
    if (token.kind === Kind.TypeOfKeyword) {
      // tsgo parseTypeQuery / parseImportType (2799-2806): `typeof import(...)` is an
      // import type with isTypeOf=true (nextIsStartOfTypeOfImportType, 3021), otherwise a
      // plain type query.
      if (this.#peekKind() === Kind.ImportKeyword) {
        return this.#parseImportType(true);
      }
      this.#advance();
      return this.#finishNode(createTypeQueryNode(this.#parseEntityName(), this.#parseOptionalTypeArguments()), pos);
    }
    if (token.kind === Kind.LessThanToken) {
      return this.#parseFunctionTypeWithOptionalTypeParameters();
    }
    if (token.kind === Kind.ThisKeyword) {
      this.#advance();
      return this.#finishNode(createThisTypeNode(), pos);
    }
    if (token.kind === Kind.OpenParenToken) {
      const functionType = this.#tryParseFunctionType();
      if (functionType !== undefined) {
        return functionType;
      }
      this.#advance();
      const type = this.#parseType();
      this.#expect(Kind.CloseParenToken);
      return this.#finishNode(createParenthesizedTypeNode(type), pos);
    }
    if (token.kind === Kind.NewKeyword) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      this.#expect(Kind.EqualsGreaterThanToken);
      return this.#finishNode(createConstructorTypeNode(undefined, undefined, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, this.#parseType()), pos);
    }
    if (token.kind === Kind.OpenBracketToken) {
      // M3 3b-list-model retrofit (loop #21): tsgo parseTupleType uses
      // parseBracketedList(PCTupleElementTypes, parseTupleElementNameOrTupleElementType,
      // `[`, `]`). element: Comma||isStartOfType(false); terminator: CloseBracket
      // (or EOF). #parseBracketedList consumes the opening `[` itself. On valid
      // input identical to the prior loop.
      const elements = this.#parseBracketedList(PCTupleElementTypes, () => this.#parseTupleElementNameOrTupleElementType(), Kind.OpenBracketToken, Kind.CloseBracketToken);
      return this.#finishNode(createTupleTypeNode(elements ?? createNodeArray([]) as NodeArray<TypeNode>), pos);
    }
    if (token.kind === Kind.OpenBraceToken) {
      // tsgo parseNonArrayType (2810-2814): `{` dispatches to parseMappedType when the
      // lookahead (nextIsStartOfMappedType, 3123) matches `{ +/-? readonly? [ id in`,
      // otherwise to a type literal.
      if (this.#nextIsStartOfMappedType()) {
        return this.#parseMappedType();
      }
      this.#advance();
      // M3 3b-list-model retrofit (loop #6): tsgo parseTypeLiteral -> parseObjectTypeMembers
      // -> parseList(PCTypeMembers, parseTypeMember). element: lookAhead(scanTypeMemberStart);
      // terminator: CloseBrace (or EOF). Trailing `;`/`,` consumed inside #parseTypeElement.
      const members = this.#parseList(PCTypeMembers, () => this.#parseTypeElement());
      this.#expect(Kind.CloseBraceToken);
      return this.#finishNode(createTypeLiteralNode(members), pos);
    }
    if (keywordTypeKinds.has(token.kind)) {
      this.#advance();
      return this.#finishNode(createKeywordTypeNode(token.kind as KeywordTypeSyntaxKind), pos);
    }
    if (token.kind === Kind.StringLiteral) {
      // The inner string-literal leaf is stamped via #parseStringLiteralExpression;
      // the LiteralTypeNode wrapper shares that same start (tsgo parseLiteralTypeNode 2875).
      return this.#finishNode(createLiteralTypeNode(this.#parseStringLiteralExpression()), pos);
    }
    if (token.kind === Kind.NumericLiteral) {
      // Stage-1a-deferred numeric leaf: stamp BOTH the inner numeric literal and the
      // LiteralTypeNode wrapper with the same pos (tsgo parseLiteralExpression stamps
      // the leaf, parseLiteralTypeNode stamps the wrapper, both share pos).
      this.#advance();
      return this.#finishNode(createLiteralTypeNode(this.#finishNode(createNumericLiteral(token.text, 0), pos)), pos);
    }
    if (token.kind === Kind.BigIntLiteral) {
      // The bigint leaf is already stamped; stamp the LiteralTypeNode wrapper with
      // that same pos (tsgo parseLiteralTypeNode 2875).
      this.#advance();
      return this.#finishNode(createLiteralTypeNode(this.#finishNode(createBigIntLiteral(token.text, 0), pos)), pos);
    }
    // Negative numeric / bigint literal type nodes only (TS-Go: KindMinusToken
    // when lookahead is a numeric/bigint literal -> LiteralTypeNode wrapping a
    // PrefixUnaryExpression). Not a general unary-expression-in-type parser.
    if (token.kind === Kind.MinusToken) {
      const nextKind = this.#peekKind();
      if (nextKind === Kind.NumericLiteral || nextKind === Kind.BigIntLiteral) {
        // The inner literal leaf and the PrefixUnaryExpression wrapper are stamped
        // (Stage 1b). Stage 1d stamps the LiteralTypeNode wrapper with unaryPos (the
        // '-' token start) so it shares the prefix-unary start (tsgo parseLiteralTypeNode
        // negative=true 2887-2889: both PrefixUnary and LiteralTypeNode share pos).
        const unaryPos = this.#nodePos();
        this.#advance();
        const literalPos = this.#nodePos();
        const literalToken = this.#advance();
        const literal = literalToken.kind === Kind.BigIntLiteral
          ? this.#finishNode(createBigIntLiteral(literalToken.text, 0), literalPos)
          : this.#finishNode(createNumericLiteral(literalToken.text, 0), literalPos);
        return this.#finishNode(createLiteralTypeNode(this.#finishNode(createPrefixUnaryExpression(Kind.MinusToken, literal), unaryPos)), unaryPos);
      }
    }
    if (token.kind === Kind.TrueKeyword || token.kind === Kind.FalseKeyword || token.kind === Kind.NullKeyword) {
      // Stage-1b-deferred keyword leaf: stamp BOTH the inner keyword-expression leaf
      // (tsgo parseKeywordExpression 5762) and the LiteralTypeNode wrapper with pos.
      this.#advance();
      return this.#finishNode(createLiteralTypeNode(this.#finishNode(createKeywordExpression(token.kind as Kind.TrueKeyword | Kind.FalseKeyword | Kind.NullKeyword), pos)), pos);
    }
    if (token.kind === Kind.TemplateHead) {
      // tsgo parseNonArrayType (2855) KindTemplateHead -> parseTemplateType (3684).
      return this.#parseTemplateLiteralType();
    }
    if (isIdentifierNameKind(token.kind)) {
      return this.#finishNode(createTypeReferenceNode(this.#parseEntityName(), this.#parseOptionalTypeArguments()), pos);
    }
    // codex Stage-3b 3b-flip: tsgo parseNonArrayType default (parser.go ~2855) ->
    // parseErrorAtCurrentToken(Type_expected) + a missing TypeReference whose entity
    // name is a missing identifier. Record Type_expected (1110) and return a
    // zero-width missing TypeReference at the current pos WITHOUT advancing.
    this.#parseErrorAtCurrentToken(Diagnostics.Type_expected);
    return this.#finishNode(createTypeReferenceNode(this.#finishNode(createIdentifier(""), this.#nodePos()), undefined), this.#nodePos());
  }

  #parseInferType(): TypeNode {
    // tsgo parseInferType (2689): node start at the `infer` keyword; finishNode after
    // the inner TypeParameterDeclaration. The TypeParameterDeclaration is built by
    // parseTypeParameterOfInferType (2695) with its own pos at the name.
    const pos = this.#nodePos();
    this.#expect(Kind.InferKeyword);
    const namePos = this.#nodePos();
    const name = this.#parseIdentifier();
    const constraint = this.#tryParseConstraintOfInferType();
    const typeParameter = this.#finishNode(createTypeParameterDeclaration(undefined, name, constraint, undefined, undefined), namePos);
    return this.#finishNode(createInferTypeNode(typeParameter), pos);
  }

  #tryParseConstraintOfInferType(): TypeNode | undefined {
    // codex-054 M3 Stage-2 (1g): tsgo tryParseConstraintOfInferType (parser.go:2702-2712).
    // On `extends`, parse the constraint under DisallowConditionalTypesContext=true. KEEP it
    // when `inDisallowConditionalTypesContext() || token != QuestionToken`; otherwise REWIND
    // (dropping the constraint) so the trailing `?` starts the ENCLOSING conditional whose
    // extends-type this infer-type is — e.g. `A extends infer U extends string ? U : never`
    // KEEPS `string` (the enclosing conditional's extends-type is parsed with
    // DisallowConditionalTypesContext=true via #parseType, so the predicate reads true), while
    // `infer U extends X ? ...` at a position NOT under that context rewinds the `?` out.
    const mark = this.#mark();
    if (this.#consumeOptional(Kind.ExtendsKeyword)) {
      const constraint = this.#doInContext(NodeFlags.DisallowConditionalTypesContext, true, () => this.#parseType());
      if (this.#inDisallowConditionalTypesContext() || this.#current().kind !== Kind.QuestionToken) {
        return constraint;
      }
    }
    this.#rewind(mark);
    return undefined;
  }

  #parseImportType(isTypeOf: boolean): TypeNode {
    // tsgo parseImportType (3026): node start at the `typeof` (when present) else `import`;
    // finishNode after the optional type arguments. The optional `, { with|assert: ... }`
    // attributes clause re-enters #parseImportAttributes (self-contained: captures its own
    // pos and consumes through `}`); the trailing `.` qualifier reuses #parseEntityName.
    const pos = this.#nodePos();
    if (isTypeOf) {
      this.#expect(Kind.TypeOfKeyword);
    }
    this.#expect(Kind.ImportKeyword);
    this.#expect(Kind.OpenParenToken);
    const argument = this.#parseType();
    const attributes = this.#consumeOptional(Kind.CommaToken)
      ? this.#parseImportTypeAttributes()
      : undefined;
    this.#expect(Kind.CloseParenToken);
    const qualifier = this.#consumeOptional(Kind.DotToken) ? this.#parseEntityName() : undefined;
    const typeArguments = this.#parseOptionalTypeArguments();
    return this.#finishNode(createImportTypeNode(isTypeOf, argument, attributes, qualifier, typeArguments), pos);
  }

  #parseImportTypeAttributes(): ReturnType<typeof createImportAttributes> {
    // tsgo parseImportType (3034-3057): after the comma, the attributes clause is the OUTER
    // `{ with|assert : { name: value, ... } }`. The outer `{`, the `with`/`assert` keyword and
    // the `:` are consumed here; the inner attribute object is then parsed by
    // #parseImportAttributes(keyword, skipKeyword=true) (its node starts at the inner `{` and
    // carries the keyword as token, exactly as tsgo's skipKeyword path). The trailing optional
    // comma and the outer `}` are consumed here.
    this.#expect(Kind.OpenBraceToken);
    const keyword = this.#current().kind;
    // codex Stage-3b 3b-flip: tsgo parseImportType (parser.go:3041) does
    // parseExpected(With|Assert) then parseExpected(Colon). On a bad keyword, record
    // X_0_expected("with") and DO NOT advance (leave the token for recovery so the
    // following #expect(Colon) records its own diagnostic against the same token).
    // Only advance past a real With/Assert keyword.
    if (keyword !== Kind.WithKeyword && keyword !== Kind.AssertKeyword) {
      this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, ["with"]);
    } else {
      this.#advance();
    }
    this.#expect(Kind.ColonToken);
    const attributes = this.#parseImportAttributes(keyword, true);
    this.#consumeOptional(Kind.CommaToken);
    this.#expect(Kind.CloseBraceToken);
    return attributes;
  }

  #parseMappedType(): TypeNode {
    // tsgo parseMappedType (3134): node start at the `{`; finishNode after the closing `}`.
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    const readonlyToken = this.#parseMappedTypeReadonlyModifierToken();
    this.#expect(Kind.OpenBracketToken);
    const typeParameter = this.#parseMappedTypeParameter();
    const nameType = this.#consumeOptional(Kind.AsKeyword) ? this.#parseType() : undefined;
    this.#expect(Kind.CloseBracketToken);
    const questionToken = this.#parseMappedTypeQuestionModifierToken();
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    // M3 3b-list-model retrofit (loop #7): tsgo parseMappedType uses
    // parseList(PCTypeMembers, parseTypeMember) for the trailing members.
    // element: lookAhead(scanTypeMemberStart); terminator: CloseBrace (or EOF).
    const members = this.#parseList(PCTypeMembers, () => this.#parseTypeElement());
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), pos);
  }

  #parseMappedTypeReadonlyModifierToken(): ReadonlyKeyword | PlusToken | MinusToken | undefined {
    return this.#parseMappedTypeModifierToken(Kind.ReadonlyKeyword) as ReadonlyKeyword | PlusToken | MinusToken | undefined;
  }

  #parseMappedTypeQuestionModifierToken(): QuestionToken | PlusToken | MinusToken | undefined {
    return this.#parseMappedTypeModifierToken(Kind.QuestionToken) as QuestionToken | PlusToken | MinusToken | undefined;
  }

  #parseMappedTypeModifierToken(expected: Kind.ReadonlyKeyword | Kind.QuestionToken): ReadonlyKeyword | QuestionToken | PlusToken | MinusToken | undefined {
    // tsgo parseMappedType (3137-3143 / 3151-3157): the readonly/question slot accepts an
    // optional `+`/`-` prefix OR the bare keyword/question token. When a `+`/`-` is seen tsgo
    // parses the token, then expects the keyword/question to follow — here we faithfully
    // consume the `+`/`-` token node and (per tsgo's parseExpected) require the following
    // keyword/question, advancing past it.
    const current = this.#current().kind;
    if (current === Kind.PlusToken) {
      this.#advance();
      this.#expect(expected);
      return createToken(Kind.PlusToken) as PlusToken;
    }
    if (current === Kind.MinusToken) {
      this.#advance();
      this.#expect(expected);
      return createToken(Kind.MinusToken) as MinusToken;
    }
    if (current === expected) {
      this.#advance();
      return expected === Kind.ReadonlyKeyword
        ? createToken(Kind.ReadonlyKeyword) as ReadonlyKeyword
        : createToken(Kind.QuestionToken) as QuestionToken;
    }
    return undefined;
  }

  #parseMappedTypeParameter(): TypeParameterDeclaration {
    // tsgo parseMappedTypeParameter (3165): `name in type`; the `in`-type goes in the
    // constraint slot of the TypeParameterDeclaration. Node start at the name.
    const pos = this.#nodePos();
    const name = this.#parseIdentifier();
    this.#expect(Kind.InKeyword);
    const type = this.#parseType();
    return this.#finishNode(createTypeParameterDeclaration(undefined, name, type, undefined, undefined), pos);
  }

  #nextIsStartOfMappedType(): boolean {
    // tsgo nextIsStartOfMappedType (3123): from the `{`, peek `+/-? readonly? [ id in`.
    // Runs as a lookAhead callback in tsgo; walk the cursor forward off the live
    // scanner and rewind via #lookAhead.
    return this.#lookAhead(() => {
      this.#nextToken(); // skip `{`
      if (this.#current().kind === Kind.PlusToken || this.#current().kind === Kind.MinusToken) {
        this.#nextToken();
        return this.#current().kind === Kind.ReadonlyKeyword;
      }
      if (this.#current().kind === Kind.ReadonlyKeyword) {
        this.#nextToken();
      }
      if (this.#current().kind !== Kind.OpenBracketToken) {
        return false;
      }
      this.#nextToken();
      if (!isIdentifierNameKind(this.#current().kind)) {
        return false;
      }
      this.#nextToken();
      return this.#current().kind === Kind.InKeyword;
    });
  }

  #parseTemplateLiteralType(): TypeNode {
    // tsgo parseTemplateType (3684): node start at the TemplateHead; spans parse a TYPE
    // (#parseType) rather than an expression. wave 4b-swap: the `${...}` continuation
    // is re-scanned in place via reScanTemplateToken(false) after each span (see
    // #parseLiteralOfTemplateSpan), since the live scanner emits a plain CloseBraceToken
    // for `}` (no brace-depth pre-scan of Middle/Tail).
    const headPos = this.#nodePos();
    const headToken = this.#expect(Kind.TemplateHead);
    const head = this.#finishNode(createTemplateHead(templateHeadText(headToken.text), templateHeadText(headToken.text), 0), headPos);
    const spans = [];
    while (true) {
      // tsgo parseTemplateTypeSpan (3720): span node start is the span TYPE start; finish
      // after the trailing TemplateMiddle/TemplateTail literal is consumed.
      const spanPos = this.#nodePos();
      const type = this.#parseType();
      const literalPos = this.#nodePos();
      const literalToken = this.#parseLiteralOfTemplateSpan();
      const literal = literalToken.kind === Kind.TemplateMiddle
        ? this.#finishNode(createTemplateMiddle(templateMiddleText(literalToken.text), templateMiddleText(literalToken.text), 0), literalPos)
        : this.#finishNode(createTemplateTail(templateTailText(literalToken.text), templateTailText(literalToken.text), 0), literalPos);
      spans.push(this.#finishNode(createTemplateLiteralTypeSpan(type, literal as TemplateMiddleOrTail), spanPos));
      if (literalToken.kind === Kind.TemplateTail) {
        break;
      }
    }
    return this.#finishNode(createTemplateLiteralTypeNode(head, createNodeArray(spans) as NodeArray<TemplateLiteralTypeSpan>), headPos);
  }

  #parseTupleElementNameOrTupleElementType(): TypeNode {
    // tsgo parseTupleElementNameOrTupleElementType (3617): a named-tuple member is detected
    // by a lookahead (scanStartOfNamedTupleElement, 3633): optional `...`, an identifier OR
    // keyword, then `:` OR `?:`. On match build a NamedTupleMember; otherwise fall through to
    // the plain element parse (which itself handles leading `...` rest / trailing `?` optional).
    if (this.#scanStartOfNamedTupleElement()) {
      const pos = this.#nodePos();
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) as DotDotDotToken : undefined;
      const name = this.#parseIdentifier();
      const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) as QuestionToken : undefined;
      this.#expect(Kind.ColonToken);
      const type = this.#parseTupleElementType();
      return this.#finishNode(createNamedTupleMember(dotDotDotToken, name, questionToken, type), pos);
    }
    return this.#parseTupleElementType();
  }

  #scanStartOfNamedTupleElement(): boolean {
    // tsgo scanStartOfNamedTupleElement (3633) + nextTokenIsColonOrQuestionColon (3640):
    // `...`? then an identifier/keyword, then `:` or `?` `:`. Runs as a lookAhead
    // callback; walk forward off the live scanner from the CURRENT token and rewind
    // via #lookAhead.
    return this.#lookAhead(() => {
      if (this.#current().kind === Kind.DotDotDotToken) {
        this.#nextToken();
      }
      if (!isIdentifierNameKind(this.#current().kind)) {
        return false;
      }
      this.#nextToken();
      if (this.#current().kind === Kind.ColonToken) {
        return true;
      }
      if (this.#current().kind !== Kind.QuestionToken) {
        return false;
      }
      this.#nextToken();
      return this.#current().kind === Kind.ColonToken;
    });
  }

  #parseTupleElementType(): TypeNode {
    // tsgo parseTupleElementType (3644): a leading `...` -> RestTypeNode wrapping the element
    // type; a trailing `?` -> OptionalTypeNode. tsgo derives the OptionalTypeNode from a
    // JSDocNullableType produced by parsePostfixTypeOrHigher (3650-3656); tsts has no
    // JSDoc-nullable postfix machinery and OptionalTypeNode appears ONLY inside a tuple, so we
    // handle the trailing `?` directly here — yielding the identical OptionalTypeNode-in-tuple
    // shape (equivalent AST per parser.go:3650-3656, NOT a token-for-token call-graph port).
    const pos = this.#nodePos();
    if (this.#consumeOptional(Kind.DotDotDotToken)) {
      return this.#finishNode(createRestTypeNode(this.#parseType()), pos);
    }
    const type = this.#parseType();
    if (this.#current().kind === Kind.QuestionToken) {
      this.#advance();
      return this.#finishNode(createOptionalTypeNode(type), pos);
    }
    return type;
  }

  #tryParseFunctionType(): TypeNode | undefined {
    // wave 4b-swap: faithful tsgo shape (isStartOfFunctionTypeOrConstructorType,
    // parser.go:3768-3773). A `(` is a function type ONLY if the unambiguous
    // lookahead matches; THEN we commit to parsing it (no rewind). The lookahead
    // itself runs under #lookAhead (= #mark/#rewind, the audited rewind machinery),
    // so the speculation is a bounded structural probe rather than a parse-then-
    // discard of a whole param-list AST. This eliminates the old catch-and-rollback.
    if (!this.#lookAhead(() => this.#nextIsUnambiguouslyStartOfFunctionType())) {
      return undefined;
    }
    // tsgo parseFunctionOrConstructorType (3775): pos at the '(' (BEFORE the consume).
    const pos = this.#nodePos();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    this.#expect(Kind.EqualsGreaterThanToken);
    return this.#finishNode(createFunctionTypeNode(undefined, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, this.#parseType()), pos);
  }

  #nextIsUnambiguouslyStartOfFunctionType(): boolean {
    // tsgo nextIsUnambiguouslyStartOfFunctionType (parser.go:3810-3833). Run under
    // #lookAhead by the caller (the cursor is rewound afterward).
    this.#nextToken(); // advance past `(`
    if (this.#current().kind === Kind.CloseParenToken || this.#current().kind === Kind.DotDotDotToken) {
      // `( )` or `( ...`
      return true;
    }
    if (this.#skipParameterStart()) {
      const kind = this.#current().kind;
      if (kind === Kind.ColonToken || kind === Kind.CommaToken || kind === Kind.QuestionToken || kind === Kind.EqualsToken) {
        // `( xxx :` / `( xxx ,` / `( xxx ?` / `( xxx =`
        return true;
      }
      if (kind === Kind.CloseParenToken) {
        this.#nextToken();
        return this.#current().kind === Kind.EqualsGreaterThanToken; // `( xxx ) =>`
      }
    }
    return false;
  }

  #skipParameterStart(): boolean {
    // tsgo skipParameterStart (parser.go:3835-3852). Skip modifiers, an optional
    // `...`, then an identifier/`this` (nextToken+true) OR a binding pattern parsed
    // with no error.
    if (modifierKinds.has(this.#current().kind)) {
      this.#parseModifiers();
    }
    this.#consumeOptional(Kind.DotDotDotToken);
    if (isIdentifierNameKind(this.#current().kind) || this.#current().kind === Kind.ThisKeyword) {
      this.#nextToken();
      return true;
    }
    if (this.#current().kind === Kind.OpenBracketToken || this.#current().kind === Kind.OpenBraceToken) {
      // codex Stage-3b 3b-flip catchBailRework: tsgo uses a diagnostics-length
      // WATERMARK, not try/catch (parser.go:3835-3852 — `previousErrorCount ==
      // len(p.diagnostics)`). Now that #parseBindingName/#parseObjectBindingPattern/
      // #parseIdentifier RECORD instead of THROW, a malformed binding pushes a
      // diagnostic; the watermark detects it. The 3b-list-model parseList progress
      // guards guarantee #parseBindingName terminates.
      const before = this.#diagnostics.length;
      this.#parseBindingName();
      return before === this.#diagnostics.length;
    }
    return false;
  }

  #parseFunctionTypeWithOptionalTypeParameters(): TypeNode {
    // tsgo parseFunctionOrConstructorType (3775): pos at the '<' (before the optional
    // type parameters); finishNode after the return-type #parseType.
    const pos = this.#nodePos();
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    this.#expect(Kind.EqualsGreaterThanToken);
    return this.#finishNode(createFunctionTypeNode(typeParameters, createNodeArray(parameters) as NodeArray<ParameterDeclaration>, this.#parseType()), pos);
  }

  #tryParseTypePredicate(): TypeNode | undefined {
    // tsgo parseTypeOrTypePredicate / parseAssertsTypePredicate (3404/3668): pos at
    // entry (BEFORE the optional 'asserts'); finishNode after parameterName (no 'is')
    // or after the #parseType following 'is'. The rewind paths return undefined
    // without creating a node, so no stray stamp.
    const mark = this.#mark();
    const pos = this.#nodePos();
      const assertsModifier = this.#consumeOptional(Kind.AssertsKeyword) ? createToken(Kind.AssertsKeyword) as AssertsKeyword : undefined;
    let parameterName: ReturnType<typeof createThisTypeNode> | Identifier;
    if (this.#current().kind === Kind.ThisKeyword) {
      // Inner this-type leaf used as the predicate parameter: capture pos before
      // advancing 'this' (tsgo parseThisTypeNode 2828).
      const thisPos = this.#nodePos();
      this.#advance();
      parameterName = this.#finishNode(createThisTypeNode(), thisPos);
    } else if (isIdentifierNameKind(this.#current().kind)) {
      parameterName = this.#parseIdentifier();
    } else {
      this.#rewind(mark);
      return undefined;
    }
    if (!this.#consumeOptional(Kind.IsKeyword)) {
      if (assertsModifier !== undefined) {
        return this.#finishNode(createTypePredicateNode(assertsModifier, parameterName, undefined), pos);
      }
      this.#rewind(mark);
      return undefined;
    }
    return this.#finishNode(createTypePredicateNode(assertsModifier, parameterName, this.#parseType()), pos);
  }

  #parseEntityName(): EntityName {
    // tsgo parseEntityName (2901): the node start is the leftmost entity-name start
    // threaded through the dotted loop; finishNode each iteration with the single pos.
    const pos = this.#nodePos();
    let name: EntityName = this.#parseIdentifier();
    while (this.#consumeOptional(Kind.DotToken)) {
      name = this.#finishNode(createQualifiedName(name, this.#parseIdentifier()), pos);
    }
    return name;
  }

  #consumeOptional(kind: Kind): boolean {
    if (this.#current().kind !== kind) {
      return false;
    }
    this.#advance();
    return true;
  }

  #expect(kind: Kind): ScannedToken {
    // codex Stage-3b 3b-flip: faithful port of tsgo parseExpectedWithDiagnostic
    // (parser.go:1001-1015). On match: advance + return the consumed token. On
    // mismatch: record X_0_expected with the expected token's lexeme (tsgo
    // scanner.TokenToString(kind); tokenToString returns undefined only for
    // identifier/literal kinds — never an #expect arg, the ?? Kind[kind] is
    // defensive) and DO NOT advance. Returns a zero-width synthesized MISSING token
    // at the current pos (tsgo parseExpected returns bool=false and the caller
    // proceeds; tsts callers proceed with this missing token — they either ignore
    // the return or read .text/.pos, which are caller-compatible here).
    const token = this.#current();
    if (token.kind !== kind) {
      this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, [tokenToString(kind) ?? kindDebugName(kind)]);
      return { kind, pos: this.#current().pos, end: this.#current().pos, text: "" };
    }
    this.#advance();
    return token;
  }

  #expectGreaterThan(): ScannedToken {
    // wave 4b-swap: the live scanner emits a SINGLE GreaterThanToken per `>`
    // (scanner.ts:1859-1860) — it never greedily combines `>>`/`>>>`/`>=` (matching
    // tsgo scanner.go:803-804). So the type-position closer just consumes one real
    // `>` (tsgo parseExpected(KindGreaterThanToken) on a single `>`, parser.go:710
    // via parseBracketedList). For nested `A<B<C>>` the inner closer consumes the
    // first `>` (so inner B<C> end == that `>`'s end, index 15) and the outer
    // consumes the second — no array mutation, no off-by-one.
    return this.#expect(Kind.GreaterThanToken);
  }

  #current(): ScannedToken {
    return this.#token;
  }

  // M3 3b-list-model: tsgo hasPrecedingLineBreak (parser.go:410-412). tsgo reads
  // the LIVE scanner; tsts MUST read the SNAPSHOT (#token) because the parser
  // caches the current token and #peekKind/#lookAhead move the live scanner
  // independently — reading the live scanner directly would be wrong after a
  // peek. The snapshot was taken at the moment the current token was scanned, so
  // it is the faithful tsts equivalent.
  #hasPrecedingLineBreak(): boolean {
    return this.#token.hasPrecedingLineBreak;
  }

  #advance(): ScannedToken {
    const token = this.#token;
    if (token.kind !== Kind.EndOfFile) {
      // #nextToken records #prevTokenEnd (= this consumed token's end) before
      // scanning, so after advance #nodeEnd() returns the consumed token's end.
      // At EOF we must NOT advance and NOT clobber #prevTokenEnd.
      this.#nextToken();
    }
    return token;
  }

  // wave 4b-swap: one-token lookahead with no #token mutation, modeling tsgo's
  // scanner-backed peeks. Marks the scanner, scans one token, reads its kind,
  // then rewinds the scanner back so the parser cursor is unchanged.
  #peekKind(): Kind {
    const saved = this.#scanner.mark();
    const kind = this.#scanner.scan();
    this.#scanner.rewind(saved);
    return kind;
  }

  // wave 4b-swap: speculative parse-state snapshot/restore, modeling tsgo
  // ParserState (parser.go:349-372). Captures the scanner state plus the
  // parser cursor (#token), #prevTokenEnd, and #contextFlags. codex Stage-3a:
  // now also snapshots #diagnostics.length (tsgo ParserState.diagnosticsLen,
  // parser.go:353) so #rewind can discard diagnostics pushed during a
  // speculative probe (parser.go:366). Inert in 3a — #diagnostics stays empty
  // for all input (no throw flipped), so the snapshot is always 0.
  #mark(): ParserMark {
    return {
      scannerState: this.#scanner.mark(),
      token: this.#token,
      prevTokenEnd: this.#prevTokenEnd,
      contextFlags: this.#contextFlags,
      diagnosticsLen: this.#diagnostics.length | 0,
      statementHasAwaitIdentifier: this.#statementHasAwaitIdentifier,
    };
  }

  #rewind(mark: ParserMark): void {
    this.#scanner.rewind(mark.scannerState);
    this.#token = mark.token;
    this.#prevTokenEnd = mark.prevTokenEnd;
    this.#contextFlags = mark.contextFlags;
    // codex Stage-3a: discard any diagnostics appended during the speculative
    // probe (tsgo p.diagnostics = p.diagnostics[0:state.diagnosticsLen],
    // parser.go:366). Setting Array.length truncates in place. Inert in 3a
    // (diagnosticsLen is always 0, #diagnostics stays empty).
    this.#diagnostics.length = mark.diagnosticsLen;
    // M3 6b: restore the await-identifier flag (tsgo parser.go:370) so a speculative
    // probe that built an `await` identifier does not leave the flag set for the
    // statement that actually parses after the rewind.
    this.#statementHasAwaitIdentifier = mark.statementHasAwaitIdentifier;
  }

  // wave 4b-swap: tsgo lookAhead (parser.go:374-379) — run a speculative probe
  // and ALWAYS rewind, returning the probe's result. Used for bounded
  // multi-token / unbounded boundary lookaheads that walk the cursor forward
  // via #advance/#current and must leave it untouched.
  #lookAhead<T>(callback: () => T): T {
    const mark = this.#mark();
    const result = callback();
    this.#rewind(mark);
    return result;
  }

  // codex-048 Stage-1a / M3 4c: position plumbing mirroring tsgo
  // internal/parser/parser.go finishNode (5904-5917) MINUS the error-flag bit
  // (that bit is Stage 3). nodePos is the trivia-INCLUSIVE full-start of the
  // CURRENT (not-yet-consumed) token (tsgo nodePos()=scanner.TokenFullStart(),
  // parser.go); capture it BEFORE advancing. nodeEnd stays token-tight: the end
  // of the just-consumed token (codex-048 (i) — the end side is NOT
  // trivia-inclusive).
  #nodePos(): number {
    return this.#token.fullStart;
  }

  #nodeEnd(): int {
    return this.#prevTokenEnd | 0;
  }

  // M3 6a: tsgo jsdocScannerInfo (parser.go:414-426). Capture the current
  // token's preceding-JSDoc state at the declaration-start point (where #nodePos
  // is taken), so it reflects the token that STARTED the declaration — not a
  // later token reached by the time #withJSDoc runs. tsgo reads the LIVE scanner
  // there (HasPrecedingJSDocComment/HasPrecedingJSDocWithDeprecatedTag); tsts
  // reads the #token snapshot for the same reason as #hasPrecedingLineBreak (the
  // live scanner may have advanced via a peek/lookahead since the token scan).
  // jsdocScannerInfoHasSeeOrLink is intentionally absent: it only drives the
  // eager @see/@link parse path (jsdoc.go:70-73), which is lazy/checker-owned
  // here and out of 6a scope.
  #jsdocScannerInfo(): JSDocScannerInfo {
    return {
      hasJSDoc: this.#token.hasPrecedingJSDoc,
      hasDeprecated: this.#token.hasPrecedingJSDocDeprecated,
    };
  }

  // M3 6a: tsgo withJSDoc (jsdoc.go:56-74), TS/TSX slice only. For a non-JS file
  // tsgo stamps NodeFlagsHasJSDoc (+ NodeFlagsPossiblyContainsDeprecatedTag when
  // the preceding JSDoc has @deprecated) and returns nil — NO eager JSDoc child
  // node (JSDoc is parsed lazily on checker access). tsonic is always TS/TSX, so
  // this is the whole reachable behavior. RANGE-NEUTRAL: it ORs flag bits onto an
  // already-finished node; it never touches node.pos/node.end, so the leading
  // JSDoc stays in trivia [node.pos, firstTokenStart) and the host span is
  // unchanged.
  #withJSDoc<T extends Node>(node: T, info: JSDocScannerInfo): T {
    if (!info.hasJSDoc) {
      return node;
    }
    node.flags |= NodeFlags.HasJSDoc;
    if (info.hasDeprecated) {
      node.flags |= NodeFlags.PossiblyContainsDeprecatedTag;
    }
    return node;
  }

  // codex-054 M3 Stage-2: tsgo setContextFlags (parser.go:6352-6358). Sets or
  // clears the given context bit(s) in #contextFlags in place; tsgo mutates the
  // pointer-receiver field, so this is the faithful mutable-parse-state equivalent.
  #setContextFlags(flags: NodeFlags, value: boolean): void {
    this.#contextFlags = value ? (this.#contextFlags | flags) : (this.#contextFlags & ~flags);
  }

  // codex-054 M3 Stage-2: tsgo doInContext (parser.go:6360-6366) — save the current
  // contextFlags, set the requested context, run the production, then RESTORE.
  // tsgo has no exceptions so it restores after the call returns. After the Stage-3b
  // throw->diagnostics flip the parser no longer throws diagnostics, but the internal
  // debug-assert Errors can still unwind; the `finally` guarantees #contextFlags is
  // never left mutated, preserving tsgo's save/set/run/restore invariant either way.
  #doInContext<T>(flags: NodeFlags, value: boolean, f: () => T): T {
    const save = this.#contextFlags;
    this.#setContextFlags(flags, value);
    try {
      return f();
    } finally {
      this.#contextFlags = save;
    }
  }

  // codex-054 M3 Stage-2: tsgo in*Context predicates (parser.go:6368-6386). Each is a
  // one-line bit read used at the wired call sites (#inDisallowConditionalTypesContext
  // is consumed by the infer-constraint rewind in #tryParseConstraintOfInferType).
  #inDisallowConditionalTypesContext(): boolean {
    return (this.#contextFlags & NodeFlags.DisallowConditionalTypesContext) !== 0;
  }

  // M3 3b-list-model: the remaining in*Context readers (tsgo parser.go:6368-6386).
  // Pure derivations of #contextFlags bits already set/cleared today (Yield/Await
  // via #withSignatureContext; DisallowIn via the for-initializer/conditional paths).
  #inYieldContext(): boolean {
    return (this.#contextFlags & NodeFlags.YieldContext) !== 0;
  }

  #inAwaitContext(): boolean {
    return (this.#contextFlags & NodeFlags.AwaitContext) !== 0;
  }

  #inDisallowInContext(): boolean {
    return (this.#contextFlags & NodeFlags.DisallowInContext) !== 0;
  }

  // codex-054 M3 Stage-2: convert the per-signature ParseFlags (Yield from generator,
  // Await from async) into contextFlags around a function/method/arrow parameter list
  // AND body, faithfully fusing tsgo parseParametersWorker (parser.go:3298-3299) and
  // parseFunctionBlock (parser.go:3497-3498), which each set BOTH bits in one save/set
  // pair. Accessors (get/set) thread ParseFlagsNone in tsgo, so they are NOT wrapped.
  #withSignatureContext<T>(isGenerator: boolean, isAsync: boolean, f: () => T): T {
    return this.#doInContext(NodeFlags.YieldContext, isGenerator, () =>
      this.#doInContext(NodeFlags.AwaitContext, isAsync, f),
    );
  }

  // M3 6b: tsgo parseFunctionBlock (parser.go:3494-3506). Parses a function/method/
  // constructor/accessor/arrow BODY block with Yield/Await context from the signature,
  // DecoratorContext cleared, AND statementHasAwaitIdentifier saved/restored — the flag
  // must NOT leak out of a function body, otherwise an `await` identifier inside a body
  // would mark the ENCLOSING top-level statement (the function/class declaration) for
  // reparse and stamp it with a spurious AwaitContext flag. tsts splits tsgo's single
  // setContextFlags trio into #withSignatureContext (Yield/Await) + the explicit Decorator
  // clear; this wrapper adds the flag save/restore around that exact pattern.
  #parseFunctionBlock(isGenerator: boolean, isAsync: boolean): Block {
    const saveHasAwaitIdentifier = this.#statementHasAwaitIdentifier;
    const block = this.#withSignatureContext(isGenerator, isAsync, () =>
      this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()),
    );
    this.#statementHasAwaitIdentifier = saveHasAwaitIdentifier;
    return block;
  }

  // ==========================================================================
  // M3 3b-list-model: start-of predicate layer (tsgo parser.go). All ADDITIVE.
  // Faithful 1:1 ports. tsgo reads the live scanner via p.token; tsts reads the
  // cached snapshot (#current().kind) and #hasPrecedingLineBreak() (the snapshot
  // field). Multi-token probes run inside #lookAhead so the cursor + snapshot
  // rewind correctly.
  // ==========================================================================

  // tsgo isIdentifier (parser.go:6252-6264).
  #isIdentifier(): boolean {
    const token = this.#current().kind;
    if (token === Kind.Identifier) {
      return true;
    }
    if ((token === Kind.YieldKeyword && this.#inYieldContext()) || (token === Kind.AwaitKeyword && this.#inAwaitContext())) {
      return false;
    }
    return token > Kind.LastReservedWord;
  }

  // tsgo isBindingIdentifier (parser.go:6266-6268).
  #isBindingIdentifier(): boolean {
    const token = this.#current().kind;
    return token === Kind.Identifier || token > Kind.LastReservedWord;
  }

  // tsgo isBindingIdentifierOrPrivateIdentifierOrPattern (parser.go:6225-6227).
  #isBindingIdentifierOrPrivateIdentifierOrPattern(): boolean {
    const token = this.#current().kind;
    return token === Kind.OpenBraceToken
      || token === Kind.OpenBracketToken
      || token === Kind.PrivateIdentifier
      || this.#isBindingIdentifier();
  }

  // tsgo isLiteralPropertyName (parser.go:6037-6039).
  #isLiteralPropertyName(): boolean {
    const token = this.#current().kind;
    return tokenIsIdentifierOrKeyword(token)
      || token === Kind.StringLiteral
      || token === Kind.NumericLiteral
      || token === Kind.BigIntLiteral;
  }

  // tsgo canParseSemicolon (parser.go:6016-6020). Consumes the snapshot
  // hasPrecedingLineBreak bit.
  #canParseSemicolon(): boolean {
    const token = this.#current().kind;
    return token === Kind.SemicolonToken
      || token === Kind.CloseBraceToken
      || token === Kind.EndOfFile
      || this.#hasPrecedingLineBreak();
  }

  // tsgo isImportAttributeName (parser.go:6271-6273).
  #isImportAttributeName(): boolean {
    const token = this.#current().kind;
    return tokenIsIdentifierOrKeyword(token) || token === Kind.StringLiteral;
  }

  // tsgo isBinaryOperator (parser.go:6275-6280). Uses the PURE
  // getBinaryOperatorPrecedence + the #inDisallowInContext reader. Does NOT touch
  // the binaryPrecedence Map / binary loop.
  #isBinaryOperator(): boolean {
    if (this.#inDisallowInContext() && this.#current().kind === Kind.InKeyword) {
      return false;
    }
    return getBinaryOperatorPrecedence(this.#current().kind) !== OperatorPrecedenceInvalid;
  }

  // tsgo isHeritageClause (parser.go:6301-6303).
  #isHeritageClause(): boolean {
    const token = this.#current().kind;
    return token === Kind.ExtendsKeyword || token === Kind.ImplementsKeyword;
  }

  // tsgo isHeritageClauseExtendsOrImplementsKeyword (parser.go:6305-6307).
  #isHeritageClauseExtendsOrImplementsKeyword(): boolean {
    return this.#isHeritageClause() && this.#lookAhead(() => {
      this.#nextToken();
      return this.#isStartOfExpression();
    });
  }

  // tsgo isValidHeritageClauseObjectLiteral (parser.go:6282-6299).
  #isValidHeritageClauseObjectLiteral(): boolean {
    return this.#lookAhead(() => {
      this.#nextToken();
      if (this.#current().kind === Kind.CloseBraceToken) {
        this.#nextToken();
        const next = this.#current().kind;
        return next === Kind.CommaToken
          || next === Kind.OpenBraceToken
          || next === Kind.ExtendsKeyword
          || next === Kind.ImplementsKeyword;
      }
      return true;
    });
  }

  // tsgo isStartOfStatement (parser.go:6041-6068).
  #isStartOfStatement(): boolean {
    switch (this.#current().kind) {
      case Kind.AtToken:
      case Kind.SemicolonToken:
      case Kind.OpenBraceToken:
      case Kind.VarKeyword:
      case Kind.LetKeyword:
      case Kind.UsingKeyword:
      case Kind.FunctionKeyword:
      case Kind.ClassKeyword:
      case Kind.EnumKeyword:
      case Kind.IfKeyword:
      case Kind.DoKeyword:
      case Kind.WhileKeyword:
      case Kind.ForKeyword:
      case Kind.ContinueKeyword:
      case Kind.BreakKeyword:
      case Kind.ReturnKeyword:
      case Kind.WithKeyword:
      case Kind.SwitchKeyword:
      case Kind.ThrowKeyword:
      case Kind.TryKeyword:
      case Kind.DebuggerKeyword:
      case Kind.CatchKeyword:
      case Kind.FinallyKeyword:
        return true;
      case Kind.ImportKeyword:
        return this.#isStartOfDeclaration() || this.#isNextTokenOpenParenOrLessThanOrDot();
      case Kind.ConstKeyword:
      case Kind.ExportKeyword:
        return this.#isStartOfDeclaration();
      case Kind.AsyncKeyword:
      case Kind.DeclareKeyword:
      case Kind.InterfaceKeyword:
      case Kind.ModuleKeyword:
      case Kind.NamespaceKeyword:
      case Kind.TypeKeyword:
      case Kind.GlobalKeyword:
      case Kind.DeferKeyword:
        return true;
      case Kind.AccessorKeyword:
      case Kind.PublicKeyword:
      case Kind.PrivateKeyword:
      case Kind.ProtectedKeyword:
      case Kind.StaticKeyword:
      case Kind.ReadonlyKeyword:
        return this.#isStartOfDeclaration() || !this.#lookAhead(() => this.#nextTokenIsIdentifierOrKeywordOnSameLine());
      default:
        return this.#isStartOfExpression();
    }
  }

  // tsgo isStartOfDeclaration (parser.go:6070-6072).
  #isStartOfDeclaration(): boolean {
    return this.#lookAhead(() => this.#scanStartOfDeclaration());
  }

  // tsgo scanStartOfDeclaration (parser.go:6074-6146). Modifier-eater loop; runs
  // inside #lookAhead (walks the cursor forward). Uses scan/loop-local mutation.
  #scanStartOfDeclaration(): boolean {
    for (;;) {
      switch (this.#current().kind) {
        case Kind.VarKeyword:
        case Kind.LetKeyword:
        case Kind.ConstKeyword:
        case Kind.FunctionKeyword:
        case Kind.ClassKeyword:
        case Kind.EnumKeyword:
          return true;
        case Kind.UsingKeyword:
          return this.#isUsingDeclaration();
        case Kind.AwaitKeyword:
          return this.#isAwaitUsingDeclaration();
        case Kind.InterfaceKeyword:
        case Kind.TypeKeyword:
        case Kind.DeferKeyword:
          return this.#nextTokenIsIdentifierOnSameLine();
        case Kind.ModuleKeyword:
        case Kind.NamespaceKeyword:
          return this.#nextTokenIsIdentifierOrStringLiteralOnSameLine();
        case Kind.AbstractKeyword:
        case Kind.AccessorKeyword:
        case Kind.AsyncKeyword:
        case Kind.DeclareKeyword:
        case Kind.PrivateKeyword:
        case Kind.ProtectedKeyword:
        case Kind.PublicKeyword:
        case Kind.ReadonlyKeyword: {
          const previousToken = this.#current().kind;
          this.#nextToken();
          if (this.#hasPrecedingLineBreak()) {
            return false;
          }
          if (previousToken === Kind.DeclareKeyword && this.#current().kind === Kind.TypeKeyword) {
            return true;
          }
          continue;
        }
        case Kind.GlobalKeyword: {
          this.#nextToken();
          const t = this.#current().kind;
          return t === Kind.OpenBraceToken || t === Kind.Identifier || t === Kind.ExportKeyword;
        }
        case Kind.ImportKeyword: {
          this.#nextToken();
          const t = this.#current().kind;
          return t === Kind.DeferKeyword
            || t === Kind.StringLiteral
            || t === Kind.AsteriskToken
            || t === Kind.OpenBraceToken
            || tokenIsIdentifierOrKeyword(t);
        }
        case Kind.ExportKeyword: {
          this.#nextToken();
          const t = this.#current().kind;
          if (t === Kind.EqualsToken
            || t === Kind.AsteriskToken
            || t === Kind.OpenBraceToken
            || t === Kind.DefaultKeyword
            || t === Kind.AsKeyword
            || t === Kind.AtToken) {
            return true;
          }
          if (t === Kind.TypeKeyword) {
            this.#nextToken();
            const t2 = this.#current().kind;
            return t2 === Kind.AsteriskToken
              || t2 === Kind.OpenBraceToken
              || (this.#isIdentifier() && !this.#hasPrecedingLineBreak());
          }
          continue;
        }
        case Kind.StaticKeyword:
          this.#nextToken();
          continue;
        default:
          return false;
      }
    }
  }

  // tsgo isStartOfExpression (parser.go:6148-6169).
  #isStartOfExpression(): boolean {
    if (this.#isStartOfLeftHandSideExpression()) {
      return true;
    }
    switch (this.#current().kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
      case Kind.DeleteKeyword:
      case Kind.TypeOfKeyword:
      case Kind.VoidKeyword:
      case Kind.PlusPlusToken:
      case Kind.MinusMinusToken:
      case Kind.LessThanToken:
      case Kind.AwaitKeyword:
      case Kind.YieldKeyword:
      case Kind.PrivateIdentifier:
      case Kind.AtToken:
        return true;
    }
    if (this.#isBinaryOperator()) {
      return true;
    }
    return this.#isIdentifier();
  }

  // tsgo isStartOfLeftHandSideExpression (parser.go:6171-6182).
  #isStartOfLeftHandSideExpression(): boolean {
    switch (this.#current().kind) {
      case Kind.ThisKeyword:
      case Kind.SuperKeyword:
      case Kind.NullKeyword:
      case Kind.TrueKeyword:
      case Kind.FalseKeyword:
      case Kind.NumericLiteral:
      case Kind.BigIntLiteral:
      case Kind.StringLiteral:
      case Kind.NoSubstitutionTemplateLiteral:
      case Kind.TemplateHead:
      case Kind.OpenParenToken:
      case Kind.OpenBracketToken:
      case Kind.OpenBraceToken:
      case Kind.FunctionKeyword:
      case Kind.ClassKeyword:
      case Kind.NewKeyword:
      case Kind.SlashToken:
      case Kind.SlashEqualsToken:
      case Kind.Identifier:
        return true;
      case Kind.ImportKeyword:
        return this.#isNextTokenOpenParenOrLessThanOrDot();
    }
    return this.#isIdentifier();
  }

  // tsgo isStartOfType (parser.go:6184-6205).
  #isStartOfType(inStartOfParameter: boolean): boolean {
    switch (this.#current().kind) {
      case Kind.AnyKeyword:
      case Kind.UnknownKeyword:
      case Kind.StringKeyword:
      case Kind.NumberKeyword:
      case Kind.BigIntKeyword:
      case Kind.BooleanKeyword:
      case Kind.ReadonlyKeyword:
      case Kind.SymbolKeyword:
      case Kind.UniqueKeyword:
      case Kind.VoidKeyword:
      case Kind.UndefinedKeyword:
      case Kind.NullKeyword:
      case Kind.ThisKeyword:
      case Kind.TypeOfKeyword:
      case Kind.NeverKeyword:
      case Kind.OpenBraceToken:
      case Kind.OpenBracketToken:
      case Kind.LessThanToken:
      case Kind.BarToken:
      case Kind.AmpersandToken:
      case Kind.NewKeyword:
      case Kind.StringLiteral:
      case Kind.NumericLiteral:
      case Kind.BigIntLiteral:
      case Kind.TrueKeyword:
      case Kind.FalseKeyword:
      case Kind.ObjectKeyword:
      case Kind.AsteriskToken:
      case Kind.QuestionToken:
      case Kind.ExclamationToken:
      case Kind.DotDotDotToken:
      case Kind.InferKeyword:
      case Kind.ImportKeyword:
      case Kind.AssertsKeyword:
      case Kind.NoSubstitutionTemplateLiteral:
      case Kind.TemplateHead:
        return true;
      case Kind.FunctionKeyword:
        return !inStartOfParameter;
      case Kind.MinusToken:
        return !inStartOfParameter && this.#lookAhead(() => this.#nextTokenIsNumericOrBigIntLiteral());
      case Kind.OpenParenToken:
        return !inStartOfParameter && this.#lookAhead(() => this.#nextIsParenthesizedOrFunctionType());
    }
    return this.#isIdentifier();
  }

  // tsgo nextTokenIsNumericOrBigIntLiteral (parser.go:6207-6210).
  #nextTokenIsNumericOrBigIntLiteral(): boolean {
    this.#nextToken();
    const t = this.#current().kind;
    return t === Kind.NumericLiteral || t === Kind.BigIntLiteral;
  }

  // tsgo nextIsParenthesizedOrFunctionType (parser.go:6212-6215).
  #nextIsParenthesizedOrFunctionType(): boolean {
    this.#nextToken();
    return this.#current().kind === Kind.CloseParenToken
      || this.#isStartOfParameter(false)
      || this.#isStartOfType(false);
  }

  // tsgo isStartOfParameter (parser.go:6217-6223).
  #isStartOfParameter(isJSDocParameter: boolean): boolean {
    const token = this.#current().kind;
    return token === Kind.DotDotDotToken
      || this.#isBindingIdentifierOrPrivateIdentifierOrPattern()
      || isModifierKind(token)
      || token === Kind.AtToken
      || this.#isStartOfType(!isJSDocParameter);
  }

  // tsgo isNextTokenOpenParenOrLessThanOrDot (parser.go:6229-6239).
  #isNextTokenOpenParenOrLessThanOrDot(): boolean {
    return this.#lookAhead(() => {
      this.#nextToken();
      const t = this.#current().kind;
      return t === Kind.OpenParenToken || t === Kind.LessThanToken || t === Kind.DotToken;
    });
  }

  // tsgo nextTokenIsIdentifierOnSameLine (parser.go:6241-6244).
  #nextTokenIsIdentifierOnSameLine(): boolean {
    this.#nextToken();
    return this.#isIdentifier() && !this.#hasPrecedingLineBreak();
  }

  // tsgo nextTokenIsIdentifierOrStringLiteralOnSameLine (parser.go:6246-6249).
  #nextTokenIsIdentifierOrStringLiteralOnSameLine(): boolean {
    this.#nextToken();
    return (this.#isIdentifier() || this.#current().kind === Kind.StringLiteral) && !this.#hasPrecedingLineBreak();
  }

  // tsgo nextTokenIsIdentifierOrKeywordOnSameLine (parser.go:4006-4008).
  #nextTokenIsIdentifierOrKeywordOnSameLine(): boolean {
    this.#nextToken();
    return tokenIsIdentifierOrKeyword(this.#current().kind) && !this.#hasPrecedingLineBreak();
  }

  // tsgo nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine (parser.go, used by
  // isAwaitExpression). Like the keyword variant but also admits numeric/bigint/string
  // literals as the start of an `await` operand on the same line. nextTokenIsIdentifierOrKeyword
  // advances one token; mirror it by advancing then testing the (now current) token.
  #nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine(): boolean {
    this.#nextToken();
    const kind = this.#current().kind;
    return (tokenIsIdentifierOrKeyword(kind)
      || kind === Kind.NumericLiteral
      || kind === Kind.BigIntLiteral
      || kind === Kind.StringLiteral)
      && !this.#hasPrecedingLineBreak();
  }

  // tsgo isUsingDeclaration (parser.go:6314-6321).
  #isUsingDeclaration(): boolean {
    return this.#lookAhead(() => this.#nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(false));
  }

  // tsgo nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine (parser.go:6328-6334).
  #nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(disallowOf: boolean): boolean {
    this.#nextToken();
    if (disallowOf && this.#current().kind === Kind.OfKeyword) {
      return this.#lookAhead(() => {
        this.#nextToken();
        const t = this.#current().kind;
        return t === Kind.EqualsToken || t === Kind.SemicolonToken || t === Kind.ColonToken;
      });
    }
    return this.#isBindingIdentifier()
      || (this.#current().kind === Kind.OpenBraceToken && !this.#hasPrecedingLineBreak());
  }

  // tsgo isAwaitUsingDeclaration (parser.go:6340-6346).
  #isAwaitUsingDeclaration(): boolean {
    return this.#lookAhead(() => {
      this.#nextToken();
      return this.#current().kind === Kind.UsingKeyword
        && this.#nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(false);
    });
  }

  // tsgo scanTypeMemberStart (parser.go:5929-5955). Runs inside #lookAhead.
  #scanTypeMemberStart(): boolean {
    const t = this.#current().kind;
    if (t === Kind.OpenParenToken || t === Kind.LessThanToken || t === Kind.GetKeyword || t === Kind.SetKeyword) {
      return true;
    }
    let idToken = false;
    while (isModifierKind(this.#current().kind)) {
      idToken = true;
      this.#nextToken();
    }
    if (this.#current().kind === Kind.OpenBracketToken) {
      return true;
    }
    if (this.#isLiteralPropertyName()) {
      idToken = true;
      this.#nextToken();
    }
    if (idToken) {
      const cur = this.#current().kind;
      return cur === Kind.OpenParenToken
        || cur === Kind.LessThanToken
        || cur === Kind.QuestionToken
        || cur === Kind.ColonToken
        || cur === Kind.CommaToken
        || this.#canParseSemicolon();
    }
    return false;
  }

  // tsgo scanClassMemberStart (parser.go:5957-6014). Runs inside #lookAhead.
  #scanClassMemberStart(): boolean {
    let idToken: Kind = Kind.Unknown;
    if (this.#current().kind === Kind.AtToken) {
      return true;
    }
    while (isModifierKind(this.#current().kind)) {
      idToken = this.#current().kind;
      if (isClassMemberModifier(idToken)) {
        return true;
      }
      this.#nextToken();
    }
    if (this.#current().kind === Kind.AsteriskToken) {
      return true;
    }
    if (this.#isLiteralPropertyName()) {
      idToken = this.#current().kind;
      this.#nextToken();
    }
    if (this.#current().kind === Kind.OpenBracketToken) {
      return true;
    }
    if (idToken !== Kind.Unknown) {
      if (!isKeyword(idToken) || idToken === Kind.SetKeyword || idToken === Kind.GetKeyword) {
        return true;
      }
      switch (this.#current().kind) {
        case Kind.OpenParenToken:
        case Kind.LessThanToken:
        case Kind.ExclamationToken:
        case Kind.ColonToken:
        case Kind.EqualsToken:
        case Kind.QuestionToken:
          return true;
      }
      return this.#canParseSemicolon();
    }
    return false;
  }

  // ==========================================================================
  // M3 3b-list-model: parseList family (tsgo parser.go:641-714). ADDITIVE — new
  // code paths. The reparseList machinery (tsgo parseListIndex, JSDoc-only) is
  // dropped: tsts has no JS @typedef reparse, so #parseList is implemented
  // directly (faithful-minus-JSDoc). On VALID input the dormant abort/error path
  // is unreachable (isListElement/isListTerminator always satisfied).
  // ==========================================================================

  // tsgo parseList (parser.go:641-645, collapsing parseListIndex 609-638 minus
  // the JSDoc-only reparse block).
  #parseList<T extends Node>(kind: ParsingContext, parseElement: () => T): NodeArray<T> {
    const pos = this.#nodePos();
    const save = this.#parsingContexts;
    this.#parsingContexts |= (1 << kind);
    const list: T[] = [];
    while (!this.#isListTerminator(kind)) {
      if (this.#isListElement(kind, false)) {
        list.push(parseElement());
        continue;
      }
      if (this.#abortParsingListOrMoveToNextToken(kind)) {
        break;
      }
    }
    this.#parsingContexts = save;
    return createNodeArray(list, pos, this.#nodePos()) as NodeArray<T>;
  }

  // M3 6b: tsgo parseListIndex (parser.go:609-638, minus the JSDoc-only reparseList
  // block tsts has already dropped — see #parseList). Identical to #parseList except
  // the element parser receives the element's INDEX in the list (the same `len(list)`
  // tsgo passes), used by #parseToplevelStatement to record possibleAwaitSpans by
  // statement index. Used only by parseSourceFile (PCSourceElements).
  #parseListIndex<T extends Node>(kind: ParsingContext, parseElement: (index: int) => T): NodeArray<T> {
    const pos = this.#nodePos();
    const save = this.#parsingContexts;
    this.#parsingContexts |= (1 << kind);
    const list: T[] = [];
    while (!this.#isListTerminator(kind)) {
      if (this.#isListElement(kind, false)) {
        const index: int = list.length | 0;
        list.push(parseElement(index));
        continue;
      }
      if (this.#abortParsingListOrMoveToNextToken(kind)) {
        break;
      }
    }
    this.#parsingContexts = save;
    return createNodeArray(list, pos, this.#nodePos()) as NodeArray<T>;
  }

  // M3 6b: tsgo parseToplevelStatement (parser.go:500-511). Parse one top-level
  // statement with the await-identifier flag reset, then — if the statement contained
  // an `await` identifier AND was not already parsed in AwaitContext — record/extend
  // its [i, i+1) span in #possibleAwaitSpans (merging into the previous span when the
  // statements are adjacent), exactly mirroring tsgo's index bookkeeping.
  #parseToplevelStatement(i: int): Statement {
    this.#statementHasAwaitIdentifier = false;
    const statement = this.#parseStatement();
    if (this.#statementHasAwaitIdentifier && (statement.flags & NodeFlags.AwaitContext) === 0) {
      const spans = this.#possibleAwaitSpans;
      if (spans.length === 0 || spans[spans.length - 1] !== i) {
        spans.push(i, i + 1);
      } else {
        spans[spans.length - 1] = i + 1;
      }
    }
    return statement;
  }

  // M3 6b: tsgo reparseTopLevelAwait (parser.go:513-607). The controlled reparse pass:
  // for each recorded possibleAwaitSpan, ResetPos to the span's first statement and
  // re-run the statement parse with AwaitContext FORCED ON (via #doInContext), so the
  // live scanner now yields the `await` OPERATOR and #parseUnaryExpression builds a real
  // AwaitExpression. Non-await statements are copied verbatim. A NEW SourceFile is built
  // from the spliced statement list, every statement's parent is repointed to it, and
  // the first-pass (bogus) await diagnostics are replaced by the reparse's diagnostics
  // (savedParseDiagnostics splice). This is ONE parser/scanner model — the same
  // #doInContext + #finishNode the first pass uses — not a second parser.
  // tsts Diagnostic uses `.start` (= tsgo Diagnostic.Pos()).
  #reparseTopLevelAwait(sourceFile: SourceFile): SourceFile {
    const spans = this.#possibleAwaitSpans;
    if (spans.length % 2 === 1) {
      throw new Error("possibleAwaitSpans malformed: odd number of indices, not paired into spans.");
    }
    const sourceStatements = sourceFile.statements;
    const statements: Statement[] = [];
    // tsgo swaps p.diagnostics for a fresh buffer (518-519) and rebuilds it span by
    // span. #diagnostics is a readonly in-place buffer here, so capture the saved
    // (first-pass) diagnostics, clear the live buffer in place, then re-accumulate.
    const savedParseDiagnostics: readonly Diagnostic[] = [...this.#diagnostics];
    this.#diagnostics.length = 0;

    const diagStart = (fromPos: number): int =>
      savedParseDiagnostics.findIndex((diagnostic) => (diagnostic.start ?? 0) >= fromPos) | 0;

    let afterAwaitStatement: int = 0;
    for (let i: int = 0; i < spans.length; i = (i + 2) | 0) {
      const nextAwaitStatement: int = spans[i]!;
      const prevStatement = sourceStatements[afterAwaitStatement]!;
      const nextStatement = sourceStatements[nextAwaitStatement]!;
      // append all non-await statements between afterAwaitStatement and nextAwaitStatement
      for (let s: int = afterAwaitStatement; s < nextAwaitStatement; s = (s + 1) | 0) {
        statements.push(sourceStatements[s]!);
      }

      // append all diagnostics associated with the copied range (tsgo 530-549)
      const diagnosticStart = diagStart(prevStatement.pos);
      if (diagnosticStart >= 0) {
        let diagnosticEnd: int = -1;
        for (let d: int = 0; d < diagnosticStart; d = (d + 1) | 0) {
          if ((savedParseDiagnostics[d]!.start ?? 0) >= nextStatement.pos) {
            diagnosticEnd = d;
            break;
          }
        }
        const slice = diagnosticEnd >= 0
          ? savedParseDiagnostics.slice(diagnosticStart, diagnosticStart + diagnosticEnd)
          : savedParseDiagnostics.slice(diagnosticStart);
        for (const d of slice) {
          this.#diagnostics.push(d);
        }
      }

      const state = this.#mark();
      // reparse all statements between start and pos with AwaitContext forced on; the
      // pre-existing diagnostics for this range are skipped above and new ones allowed.
      this.#setContextFlags(NodeFlags.AwaitContext, true);
      this.#scanner.resetPos(nextStatement.pos);
      this.#nextToken();

      afterAwaitStatement = spans[(i + 1) | 0]!;
      while (this.#current().kind !== Kind.EndOfFile) {
        const startPos = this.#scanner.getTokenFullStart();
        const statement = this.#parseStatement();
        statements.push(statement);
        if (startPos === this.#scanner.getTokenFullStart()) {
          this.#nextToken();
        }
        if (afterAwaitStatement < sourceStatements.length) {
          const nonAwaitStatement = sourceStatements[afterAwaitStatement]!;
          if (statement.end === nonAwaitStatement.pos) {
            // done reparsing this section
            break;
          }
          if (statement.end > nonAwaitStatement.pos) {
            // we ate into the next statement, so we must continue reparsing the next span
            i = (i + 2) | 0;
            if (i < spans.length) {
              afterAwaitStatement = spans[(i + 1) | 0]!;
            } else {
              afterAwaitStatement = sourceStatements.length;
            }
          }
        }
      }

      // Keep diagnostics from the reparse (tsgo 584-585): rewind everything EXCEPT the
      // diagnostics accumulated since `state` (override the snapshot's length to the
      // current length so #rewind keeps them).
      this.#rewind({ ...state, diagnosticsLen: this.#diagnostics.length });
    }

    // append all statements between pos and the end of the list (tsgo 588-600)
    if (afterAwaitStatement < sourceStatements.length) {
      const prevStatement = sourceStatements[afterAwaitStatement]!;
      for (let s: int = afterAwaitStatement; s < sourceStatements.length; s = (s + 1) | 0) {
        statements.push(sourceStatements[s]!);
      }
      const diagnosticStart = diagStart(prevStatement.pos);
      if (diagnosticStart >= 0) {
        for (const d of savedParseDiagnostics.slice(diagnosticStart)) {
          this.#diagnostics.push(d);
        }
      }
    }

    const result = createSourceFile(
      sourceFile.fileName,
      sourceFile.path,
      sourceFile.text,
      createNodeArray(statements, sourceFile.statements.pos, sourceFile.statements.end) as NodeArray<Statement>,
      sourceFile.endOfFileToken,
      this.#diagnostics,
      sourceFile.languageVariant,
      sourceFile.scriptKind,
      getExternalModuleIndicator(statements),
    );
    for (const s of statements) {
      s.parent = result; // force (re)set parent to reparsed source file
    }
    return result;
  }

  // tsgo parseDelimitedList (parser.go:648-703). The parseElement-returns-nil arm
  // (tsgo lines 657-661) is present-but-dormant: tsts element parsers throw rather
  // than return undefined today, so the undefined branch never fires under the
  // current throw model.
  #parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T | undefined): NodeArray<T> | undefined {
    const pos = this.#nodePos();
    const save = this.#parsingContexts;
    this.#parsingContexts |= (1 << kind);
    const list: T[] = [];
    for (;;) {
      if (this.#isListElement(kind, false)) {
        const startPos = this.#nodePos();
        const element = parseElement();
        if (element === undefined) {
          this.#parsingContexts = save;
          return undefined;
        }
        list.push(element);
        if (this.#consumeOptional(Kind.CommaToken)) {
          continue;
        }
        if (this.#isListTerminator(kind)) {
          break;
        }
        // No comma and not terminated: explicitly parse a comma for a good error.
        if (this.#current().kind !== Kind.CommaToken && kind === PCEnumMembers) {
          this.#parseErrorAtCurrentToken(Diagnostics.An_enum_member_name_must_be_followed_by_a_or);
        } else {
          this.#expect(Kind.CommaToken);
        }
        // Semicolon-as-delimiter recovery for object literals / import attributes.
        if ((kind === PCObjectLiteralMembers || kind === PCImportAttributes)
          && this.#current().kind === Kind.SemicolonToken
          && !this.#hasPrecedingLineBreak()) {
          this.#nextToken();
        }
        // Anti-hang: if we consumed no tokens, advance one to avoid an infinite loop.
        if (startPos === this.#nodePos()) {
          this.#nextToken();
        }
        continue;
      }
      if (this.#isListTerminator(kind)) {
        break;
      }
      if (this.#abortParsingListOrMoveToNextToken(kind)) {
        break;
      }
    }
    this.#parsingContexts = save;
    return createNodeArray(list, pos, this.#nodePos()) as NodeArray<T>;
  }

  // tsgo parseBracketedList (parser.go:707-714). PROBLEM: tsts #expect THROWS on
  // mismatch and returns a token (tsgo parseExpected returns bool). At every
  // bracketed call site the opening is guaranteed present (callers guard), so
  // #expect(opening) is behavior-identical on valid input; the false-branch
  // createMissingList recovery is dormant. The closing #expect runs after the
  // delimited list. closeWithGreaterThan threads through #expectGreaterThan for
  // the type-arg/type-param `>` closer (single-`>` reScan-aware).
  #parseBracketedList<T extends Node>(
    kind: ParsingContext,
    parseElement: () => T | undefined,
    opening: Kind,
    closing: Kind,
  ): NodeArray<T> | undefined {
    this.#expect(opening);
    const result = this.#parseDelimitedList(kind, parseElement);
    if (closing === Kind.GreaterThanToken) {
      this.#expectGreaterThan();
    } else {
      this.#expect(closing);
    }
    return result;
  }

  // tsgo createMissingList (parser.go:720-724). tsts has no missingListNodes
  // sentinel; an empty NodeArray at pos..pos is the faithful empty list.
  #createMissingList<T extends Node>(): NodeArray<T> {
    return createNodeArray([], this.#nodePos(), this.#nodePos()) as NodeArray<T>;
  }

  // tsgo abortParsingListOrMoveToNextToken (parser.go:727-734). #parsingContextErrors
  // pushes a dormant diagnostic; on VALID input the enclosing loop never reaches abort.
  #abortParsingListOrMoveToNextToken(kind: ParsingContext): boolean {
    this.#parsingContextErrors(kind);
    if (this.#isInSomeParsingContext()) {
      return true;
    }
    this.#nextToken();
    return false;
  }

  // tsgo isInSomeParsingContext (parser.go:737-749).
  #isInSomeParsingContext(): boolean {
    for (let kind = 0; kind < PCCount; kind++) {
      if ((this.#parsingContexts & (1 << kind)) !== 0) {
        if (this.#isListElement(kind, true) || this.#isListTerminator(kind)) {
          return true;
        }
      }
    }
    return false;
  }

  // tsgo parsingContextErrors (parser.go:751-818). Present-but-dormant this wave:
  // throws are NOT flipped, so this is only reachable via abort, which on the
  // VALID-input gate corpus is never entered. Pushes onto the inert #diagnostics
  // buffer.
  #parsingContextErrors(context: ParsingContext): void {
    switch (context) {
      case PCSourceElements:
        if (this.#current().kind === Kind.DefaultKeyword) {
          this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, ["export"]);
        } else {
          this.#parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
        }
        return;
      case PCBlockStatements:
        this.#parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
        return;
      case PCSwitchClauses:
        this.#parseErrorAtCurrentToken(Diagnostics.X_case_or_default_expected);
        return;
      case PCSwitchClauseStatements:
        this.#parseErrorAtCurrentToken(Diagnostics.Statement_expected);
        return;
      case PCRestProperties:
      case PCTypeMembers:
        this.#parseErrorAtCurrentToken(Diagnostics.Property_or_signature_expected);
        return;
      case PCClassMembers:
        this.#parseErrorAtCurrentToken(Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected);
        return;
      case PCEnumMembers:
        this.#parseErrorAtCurrentToken(Diagnostics.Enum_member_expected);
        return;
      case PCHeritageClauseElement:
        this.#parseErrorAtCurrentToken(Diagnostics.Expression_expected);
        return;
      case PCVariableDeclarations:
        if (isKeyword(this.#current().kind)) {
          this.#parseErrorAtCurrentToken(Diagnostics.X_0_is_not_allowed_as_a_variable_declaration_name, [tokenToString(this.#current().kind) ?? ""]);
        } else {
          this.#parseErrorAtCurrentToken(Diagnostics.Variable_declaration_expected);
        }
        return;
      case PCObjectBindingElements:
        this.#parseErrorAtCurrentToken(Diagnostics.Property_destructuring_pattern_expected);
        return;
      case PCArrayBindingElements:
        this.#parseErrorAtCurrentToken(Diagnostics.Array_element_destructuring_pattern_expected);
        return;
      case PCArgumentExpressions:
        this.#parseErrorAtCurrentToken(Diagnostics.Argument_expression_expected);
        return;
      case PCObjectLiteralMembers:
        this.#parseErrorAtCurrentToken(Diagnostics.Property_assignment_expected);
        return;
      case PCArrayLiteralMembers:
        this.#parseErrorAtCurrentToken(Diagnostics.Expression_or_comma_expected);
        return;
      case PCJSDocParameters:
        this.#parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
        return;
      case PCParameters:
        if (isKeyword(this.#current().kind)) {
          this.#parseErrorAtCurrentToken(Diagnostics.X_0_is_not_allowed_as_a_parameter_name, [tokenToString(this.#current().kind) ?? ""]);
        } else {
          this.#parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
        }
        return;
      case PCTypeParameters:
        this.#parseErrorAtCurrentToken(Diagnostics.Type_parameter_declaration_expected);
        return;
      case PCTypeArguments:
        this.#parseErrorAtCurrentToken(Diagnostics.Type_argument_expected);
        return;
      case PCTupleElementTypes:
        this.#parseErrorAtCurrentToken(Diagnostics.Type_expected);
        return;
      case PCHeritageClauses:
        this.#parseErrorAtCurrentToken(Diagnostics.Unexpected_token_expected);
        return;
      case PCImportOrExportSpecifiers:
        if (this.#current().kind === Kind.FromKeyword) {
          this.#parseErrorAtCurrentToken(Diagnostics.X_0_expected, ["}"]);
        } else {
          this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
        }
        return;
      case PCJsxAttributes:
      case PCJsxChildren:
      case PCJSDocComment:
        this.#parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
        return;
      case PCImportAttributes:
        this.#parseErrorAtCurrentToken(Diagnostics.Identifier_or_string_literal_expected);
        return;
      default:
        // tsgo panic("Unhandled case in parsingContextErrors") (parser.go:816).
        // Internal invariant violation (NOT a user parse error), so a plain Error
        // is the faithful panic-equivalent — it is a debug assert (not a recorded
        // diagnostic) and is unreachable (every defined context has an arm).
        throw new Error("Unhandled case in parsingContextErrors");
    }
  }

  // tsgo isListElement (parser.go:820-910). Faithful switch over all 26 contexts;
  // JSX (13/14) and JSDoc (17/25) arms are present-but-unreachable.
  #isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
    const token = this.#current().kind;
    switch (parsingContext) {
      case PCSourceElements:
      case PCBlockStatements:
      case PCSwitchClauseStatements:
        return !(token === Kind.SemicolonToken && inErrorRecovery) && this.#isStartOfStatement();
      case PCSwitchClauses:
        return token === Kind.CaseKeyword || token === Kind.DefaultKeyword;
      case PCTypeMembers:
        return this.#lookAhead(() => this.#scanTypeMemberStart());
      case PCClassMembers:
        return this.#lookAhead(() => this.#scanClassMemberStart())
          || (token === Kind.SemicolonToken && !inErrorRecovery);
      case PCEnumMembers:
        return token === Kind.OpenBracketToken || this.#isLiteralPropertyName();
      case PCObjectLiteralMembers:
        switch (token) {
          case Kind.OpenBracketToken:
          case Kind.AsteriskToken:
          case Kind.DotDotDotToken:
          case Kind.DotToken:
            return true;
          default:
            return this.#isLiteralPropertyName();
        }
      case PCRestProperties:
        return this.#isLiteralPropertyName();
      case PCObjectBindingElements:
        return token === Kind.OpenBracketToken
          || token === Kind.DotDotDotToken
          || this.#isLiteralPropertyName();
      case PCImportAttributes:
        return this.#isImportAttributeName();
      case PCHeritageClauseElement:
        if (token === Kind.OpenBraceToken) {
          return this.#isValidHeritageClauseObjectLiteral();
        }
        if (!inErrorRecovery) {
          return this.#isStartOfLeftHandSideExpression() && !this.#isHeritageClauseExtendsOrImplementsKeyword();
        }
        return this.#isIdentifier() && !this.#isHeritageClauseExtendsOrImplementsKeyword();
      case PCVariableDeclarations:
        return this.#isBindingIdentifierOrPrivateIdentifierOrPattern();
      case PCArrayBindingElements:
        return token === Kind.CommaToken
          || token === Kind.DotDotDotToken
          || this.#isBindingIdentifierOrPrivateIdentifierOrPattern();
      case PCTypeParameters:
        return token === Kind.InKeyword || token === Kind.ConstKeyword || this.#isIdentifier();
      case PCArrayLiteralMembers:
        if (token === Kind.CommaToken || token === Kind.DotToken) {
          return true;
        }
        return token === Kind.DotDotDotToken || this.#isStartOfExpression();
      case PCArgumentExpressions:
        return token === Kind.DotDotDotToken || this.#isStartOfExpression();
      case PCParameters:
        return this.#isStartOfParameter(false);
      case PCJSDocParameters:
        return this.#isStartOfParameter(true);
      case PCTypeArguments:
      case PCTupleElementTypes:
        return token === Kind.CommaToken || this.#isStartOfType(false);
      case PCHeritageClauses:
        return this.#isHeritageClause();
      case PCImportOrExportSpecifiers:
        if (token === Kind.FromKeyword && this.#lookAhead(() => {
          this.#nextToken();
          return this.#current().kind === Kind.StringLiteral;
        })) {
          return false;
        }
        if (token === Kind.StringLiteral) {
          return true;
        }
        return tokenIsIdentifierOrKeyword(token);
      case PCJsxAttributes:
        return tokenIsIdentifierOrKeyword(token) || token === Kind.OpenBraceToken;
      case PCJsxChildren:
        return true;
      case PCJSDocComment:
        return true;
      default:
        // tsgo panic("Unhandled case in isListElement") (parser.go:909). Internal
        // invariant violation (NOT a user parse error) — plain Error is the
        // faithful panic-equivalent; a debug assert, not a recorded diagnostic.
        throw new Error("Unhandled case in isListElement");
    }
  }

  // tsgo isListTerminator (parser.go:912-956).
  #isListTerminator(kind: ParsingContext): boolean {
    const token = this.#current().kind;
    if (token === Kind.EndOfFile) {
      return true;
    }
    switch (kind) {
      case PCBlockStatements:
      case PCSwitchClauses:
      case PCTypeMembers:
      case PCClassMembers:
      case PCEnumMembers:
      case PCObjectLiteralMembers:
      case PCObjectBindingElements:
      case PCImportOrExportSpecifiers:
      case PCImportAttributes:
        return token === Kind.CloseBraceToken;
      case PCSwitchClauseStatements:
        return token === Kind.CloseBraceToken || token === Kind.CaseKeyword || token === Kind.DefaultKeyword;
      case PCHeritageClauseElement:
        return token === Kind.OpenBraceToken || token === Kind.ExtendsKeyword || token === Kind.ImplementsKeyword;
      case PCVariableDeclarations:
        return this.#canParseSemicolon()
          || token === Kind.InKeyword
          || token === Kind.OfKeyword
          || token === Kind.EqualsGreaterThanToken;
      case PCTypeParameters:
        return token === Kind.GreaterThanToken
          || token === Kind.OpenParenToken
          || token === Kind.OpenBraceToken
          || token === Kind.ExtendsKeyword
          || token === Kind.ImplementsKeyword;
      case PCArgumentExpressions:
        return token === Kind.CloseParenToken || token === Kind.SemicolonToken;
      case PCArrayLiteralMembers:
      case PCTupleElementTypes:
      case PCArrayBindingElements:
        return token === Kind.CloseBracketToken;
      case PCJSDocParameters:
      case PCParameters:
      case PCRestProperties:
        return token === Kind.CloseParenToken || token === Kind.CloseBracketToken;
      case PCTypeArguments:
        return token !== Kind.CommaToken;
      case PCHeritageClauses:
        return token === Kind.OpenBraceToken || token === Kind.CloseBraceToken;
      case PCJsxAttributes:
        return token === Kind.GreaterThanToken || token === Kind.SlashToken;
      case PCJsxChildren:
        return token === Kind.LessThanToken && this.#lookAhead(() => {
          this.#nextToken();
          return this.#current().kind === Kind.SlashToken;
        });
      default:
        return false;
    }
  }

  #finishNode<T extends Node>(node: T, pos: number): T {
    node.pos = pos | 0;
    node.end = this.#nodeEnd();
    // codex-054 M3 Stage-2: tsgo finishNodeWithEnd (parser.go:5910)
    // `node.Flags |= p.contextFlags`. OR the parser's current contextFlags into the
    // node so each finished node faithfully records the parsing contexts it was built
    // in (Yield/Await/DisallowIn/DisallowConditionalTypes/Decorator/InWith). node.flags
    // is the controlled mutable parse-state slot made writable in the generator (Fork-A,
    // same category as pos/end above); this assignment typechecks with no cast.
    node.flags |= this.#contextFlags;
    return node;
  }

  // M3 Stage-5a: SHARED explicit-end primitive — the EXPLICIT-end sibling of
  // #finishNode. tsgo finishNodeWithEnd (parser.go:5908) stamps node.pos = the
  // supplied trivia-inclusive full-start `pos`, node.end = the EXPLICIT `end`, then
  // node.Flags |= p.contextFlags. #finishNode delegates to it in tsgo with
  // end = nodeEnd() (= TokenFullStart there); tsts keeps #finishNode independent
  // (#nodeEnd() = #prevTokenEnd) per the wave directive, so this is added as a
  // separate primitive. It mirrors #finishNode's body but takes an explicit `end`
  // instead of #nodeEnd(). Used ONLY where the faithful port supplies an explicit
  // end (JSX mismatch restructure, synthetic-binary recovery, and the
  // createMissingIdentifier(end, end) inside the restructure). It does NOT touch
  // #prevTokenEnd and is NOT a JSX-local span mode — the explicit end always comes
  // from an already-finished node's .end (a real token-tight position).
  #finishNodeWithEnd<T extends Node>(node: T, pos: number, end: number): T {
    node.pos = pos | 0;
    node.end = end | 0;
    node.flags |= this.#contextFlags;
    return node;
  }
}

function unquote(text: string): string {
  if (text.length < 2) {
    return text;
  }
  const quote = text[0];
  if ((quote !== "\"" && quote !== "'") || text[text.length - 1] !== quote) {
    return text;
  }
  return unescapeStringContent(text.slice(1, -1));
}

function unescapeStringContent(text: string): string {
  return text.replace(/\\([\\'"`nrtbfv0])/g, (_match, escape: string) => {
    switch (escape) {
      case "n":
        return "\n";
      case "r":
        return "\r";
      case "t":
        return "\t";
      case "b":
        return "\b";
      case "f":
        return "\f";
      case "v":
        return "\v";
      case "0":
        return "\0";
      default:
        return escape;
    }
  });
}

function unquoteTemplate(text: string): string {
  return text.startsWith("`") && text.endsWith("`") ? text.slice(1, -1) : text;
}

function templateHeadText(text: string): string {
  return text.startsWith("`") && text.endsWith("${") ? text.slice(1, -2) : text;
}

function templateMiddleText(text: string): string {
  return text.startsWith("}") && text.endsWith("${") ? text.slice(1, -2) : text;
}

function templateTailText(text: string): string {
  return text.startsWith("}") && text.endsWith("`") ? text.slice(1, -1) : text;
}

function hasModifier(modifiers: NodeArray<ModifierLike>, kind: Kind): boolean {
  return modifiers.some(modifier => modifier.kind === kind);
}

// tsgo isAsyncModifier (parser.go:1813-1815).
function isAsyncModifier(modifier: ModifierLike): boolean {
  return modifier.kind === Kind.AsyncKeyword;
}

// tsgo modifierListHasAsync (parser.go:1961-1963): modifiers != nil && Some(isAsyncModifier).
function modifierListHasAsync(modifiers: NodeArray<ModifierLike> | undefined): boolean {
  return modifiers !== undefined && modifiers.some(isAsyncModifier);
}

function isIdentifierNameKind(kind: Kind): boolean {
  return kind === Kind.Identifier || (kind >= Kind.FirstKeyword && kind <= Kind.LastKeyword);
}

// tsgo isReservedWord (parser.go:6394-6396): FirstReservedWord..LastReservedWord inclusive.
function isReservedWord(token: Kind): boolean {
  return Kind.FirstReservedWord <= token && token <= Kind.LastReservedWord;
}

// M3 3b-list-model: faithful 1:1 port of tsgo ast.IsModifierKind
// (ast_generated.go:9657-9663). NOTE: distinct from the parser's `modifierKinds`
// Set above (that Set drives #parseModifiers and omits Const/Default/In/Out). This
// is the broader grammar predicate consumed by the start-of predicate layer.
function isModifierKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.AbstractKeyword:
    case Kind.AccessorKeyword:
    case Kind.AsyncKeyword:
    case Kind.ConstKeyword:
    case Kind.DeclareKeyword:
    case Kind.DefaultKeyword:
    case Kind.ExportKeyword:
    case Kind.InKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.PublicKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.OutKeyword:
    case Kind.OverrideKeyword:
    case Kind.StaticKeyword:
      return true;
    default:
      return false;
  }
}

// M3 3b-list-model: faithful 1:1 port of tsgo ast.IsKeyword (utilities.go:4068-4070):
// FirstKeyword..LastKeyword inclusive. (The accessors.ts isKeywordKind uses a
// DIFFERENT, narrower range and is NOT the faithful predicate; this local one is.)
function isKeyword(kind: Kind): boolean {
  return kind >= Kind.FirstKeyword && kind <= Kind.LastKeyword;
}

// M3 3b-list-model: faithful port of tsgo ast.IsClassMemberModifier
// (utilities.go:2960-2967): IsParameterPropertyModifier (public/private/protected/
// readonly/override per ModifierFlagsParameterPropertyModifier, modifierflags.go:43-45)
// || static || override || accessor. Override appears via both arms; the union is
// {public, private, protected, readonly, override, static, accessor}.
function isClassMemberModifier(kind: Kind): boolean {
  switch (kind) {
    case Kind.PublicKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.OverrideKeyword:
    case Kind.StaticKeyword:
    case Kind.AccessorKeyword:
      return true;
    default:
      return false;
  }
}

function isContextualExpressionIdentifierKind(kind: Kind): boolean {
  return isIdentifierNameKind(kind)
    && kind !== Kind.FalseKeyword
    && kind !== Kind.NullKeyword
    && kind !== Kind.SuperKeyword
    && kind !== Kind.ThisKeyword
    && kind !== Kind.TrueKeyword
    && kind !== Kind.NewKeyword
    && kind !== Kind.FunctionKeyword;
}

// M3 6b top-level-await reparse — SHARED STRUCTURAL module-indicator infrastructure.
// Faithful port of tsgo internal/ast/parseoptions.go getExternalModuleIndicator /
// isFileProbablyExternalModule / isAnExternalModuleIndicatorNode. This is the MODULE
// DECISION: a SourceFile is an external module iff one of its top-level statements is
// an external-module-indicator node. The decision is STRUCTURAL (a scan over the
// already-parsed statements) — NO filename, package, or content heuristics.
//
// tsgo getExternalModuleIndicator additionally consults three option/syntax branches
// that are CLASSIFIED NOT-APPLICABLE here, because they depend on inputs tsts does not
// have:
//  - getImportMetaIfNecessary (PossiblyContainsImportMeta + IsImportMeta): tsts does
//    NOT parse `import.meta` (no MetaProperty is produced for it), so the import-meta
//    indicator can never fire — there is no node to find. Not-applicable (syntax).
//  - isFileModuleFromUsingJSXTag (opts.JSX): driven by ExternalModuleIndicatorOptions
//    .JSX, computed from CompilerOptions.Jsx — not threaded into the parser. Not-
//    applicable (options).
//  - opts.Force (ModuleDetectionKind / file-format): driven by ExternalModuleIndicator
//    Options.Force, computed from CompilerOptions — not threaded into the parser.
//    Not-applicable (options).
// What REMAINS is isFileProbablyExternalModule (the statement scan), ported directly.

// tsgo isAnExternalModuleIndicatorNode (parseoptions.go:95-99). The HasSyntacticModifier
// (node, Export) check is computed DIRECTLY from the node's modifier list — tsgo's
// Node.ModifierFlags() reads ModifierList.ModifierFlags, which NewModifierList computes
// eagerly at parse time via ModifiersToFlags(nodes). tsts's nodeModifierFlags/
// hasSyntacticModifier instead read a `modifierFlags` cache that the BINDER fills (empty
// at parse time), so it cannot be used here; compute the flag from the modifiers array,
// exactly mirroring tsgo's ModifiersToFlags-derived ModifierFlags.
function hasExportModifier(node: Statement): boolean {
  const modifiers = (node as { readonly modifiers?: readonly ModifierLike[] }).modifiers;
  return modifiers !== undefined && (modifiersToFlags(modifiers) & ModifierFlags.Export) !== 0;
}

function isAnExternalModuleIndicatorNode(node: Statement): boolean {
  return hasExportModifier(node)
    || (isImportEqualsDeclaration(node) && isExternalModuleReference(node.moduleReference))
    || isImportDeclaration(node)
    || isExportAssignment(node)
    || isExportDeclaration(node);
}

// tsgo isFileProbablyExternalModule (parseoptions.go:86-93), minus the import.meta tail
// (getImportMetaIfNecessary) which is not-applicable (tsts does not parse import.meta).
function getExternalModuleIndicator(statements: readonly Statement[]): Node | undefined {
  for (const statement of statements) {
    if (isAnExternalModuleIndicatorNode(statement)) {
      return statement;
    }
  }
  return undefined;
}

export function parseSourceFile(sourceText: string, options?: ParseSourceFileOptions): SourceFile {
  return new Parser(sourceText, options).parseSourceFile();
}
