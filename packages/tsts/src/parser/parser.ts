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
  createKeywordExpression,
  createLabeledStatement,
  createLiteralTypeNode,
  createMethodDeclaration,
  createMethodSignatureDeclaration,
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
  isBinaryOperatorToken,
  isIdentifier,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingName,
  type BindingElement,
  type Block,
  type ConciseBody,
  type ClassElement,
  type CaseOrDefaultClause,
  type Decorator,
  type Expression,
  type ExpressionWithTypeArguments,
  type EntityName,
  type ForInitializer,
  type Identifier,
  type ImportAttributeName,
  type ImportSpecifier,
  type ImportPhaseModifierSyntaxKind,
  type KeywordTypeSyntaxKind,
  type LeftHandSideExpression,
  type ModifierSyntaxKind,
  type ModifierLike,
  type MinusToken,
  type ModuleExportName,
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
  type QuestionToken,
  type SourceFile,
  type Statement,
  type Token,
  type TypeElement,
  type TypeNode,
  type TemplateMiddleOrTail,
  type TypeParameterDeclaration,
  type VariableDeclaration,
} from "../ast/index.js";
import { createLiveScanner, type LiveScanner, type ScannerState, type ScannedToken } from "../scanner/index.js";
import { Diagnostics } from "../diagnostics/diagnostics_generated.js";
import { format } from "../diagnostics/diagnostics.js";
import type { Diagnostic, DiagnosticMessage } from "../diagnostics/types.js";

export interface ParseSourceFileOptions {
  readonly fileName?: string;
}

// wave 4b-swap: a speculative parse-state snapshot (tsgo ParserState,
// parser.go:349-372). Bundles the live-scanner state with the parser cursor
// (#token), #prevTokenEnd, and #contextFlags so #rewind can restore all of them.
interface ParserMark {
  readonly scannerState: ScannerState;
  readonly token: ScannedToken;
  readonly prevTokenEnd: number;
  readonly contextFlags: NodeFlags;
  // codex Stage-3a: snapshot of #diagnostics.length so #rewind can discard any
  // diagnostics pushed during a speculative probe (tsgo ParserState.diagnosticsLen,
  // parser.go:353/366). Inert in 3a (no throw flipped => #diagnostics stays empty).
  readonly diagnosticsLen: number;
}

export class ParseError extends Error {
  readonly token: ScannedToken;

  constructor(message: string, token: ScannedToken) {
    super(`${message} at ${token.pos}`);
    this.name = "ParseError";
    this.token = token;
  }
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
// Diagnostics.X_0_expected. The scanner.native-preview.ts tokenToString is NOT
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

export class Parser {
  readonly #sourceText: string;
  readonly #fileName: string;
  // wave 4b-swap: live-scanner cursor mirroring tsgo's Parser (`p.scanner` +
  // single `p.token` snapshot, parser.go:381-388). #token is the CURRENT token
  // (the not-yet-consumed token), rebuilt by #nextToken from the live scanner.
  // #prevTokenEnd is the end of the JUST-consumed token (seeded 0), the source
  // of #nodeEnd (token-tight, NOT trivia-inclusive — codex-048 (i)).
  readonly #scanner: LiveScanner;
  #token: ScannedToken;
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
  // JSON => JavaScriptFile|JsonFile, default (TS/TSX/.d.ts) => None. tsonic is
  // ALWAYS ScriptKindTS (.ts only, noLib .NET target), so the `default` arm
  // applies and contextFlags starts at NodeFlags.None; the JS/JSX/JSON arms are
  // unreachable for tsonic (no scriptKind is plumbed into ParseSourceFileOptions).
  #contextFlags: NodeFlags = NodeFlags.None;
  // codex Stage-3a: parser-owned diagnostics buffer (tsgo p.diagnostics,
  // parser.go:319-336). ADDITIVE: populated only when throw sites are flipped in
  // 3b; empty in 3a. The `readonly` binding is mutated in-place (push/length
  // truncate) — same controlled mutable-compiler-state category as #token /
  // #prevTokenEnd / #contextFlags (parse-state, NOT a binder slot).
  readonly #diagnostics: Diagnostic[] = [];

  constructor(sourceText: string, options: ParseSourceFileOptions = {}) {
    this.#sourceText = sourceText;
    this.#fileName = options.fileName ?? "input.ts";
    // tsgo initializeState (parser.go:288-313): create the scanner (default
    // LanguageVariant.Standard, skipTrivia true — createLiveScanner defaults),
    // then call nextToken() ONCE (parser.go:283/139) to load the
    // first token into #token before parseSourceFile runs. tsts is always
    // ScriptKindTS so #contextFlags starts at NodeFlags.None (the field default).
    this.#scanner = createLiveScanner(sourceText);
    // Seed #token with the EOF placeholder so #nextToken's `this.#token.end`
    // read is well-typed; #nextToken immediately overwrites it with the first
    // real token (and #prevTokenEnd stays 0 because the placeholder end is 0).
    this.#token = { kind: Kind.EndOfFile, pos: 0, end: 0, text: "" };
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
      pos: this.#scanner.getTokenStart(),
      end: this.#scanner.getTokenEnd(),
      text: this.#scanner.getTokenText(),
    };
  }

  // wave 4b-swap: refresh the #token snapshot from the live scanner AFTER an
  // in-place reScan* re-tokenization of the CURRENT token (no advance, so
  // #prevTokenEnd is NOT touched). reScan* keeps tokenStart (so #token.pos is
  // unchanged) and updates the kind + end.
  #refreshTokenFromScanner(kind: Kind): void {
    this.#token = {
      kind,
      pos: this.#scanner.getTokenStart(),
      end: this.#scanner.getTokenEnd(),
      text: this.#scanner.getTokenText(),
    };
  }

  #reScanGreaterThan(): void {
    const kind = this.#scanner.reScanGreaterThanToken();
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
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    // codex Stage-3a: attach the parser-owned diagnostics buffer onto the
    // SourceFile at end-of-parse, mirroring tsgo finishSourceFile's
    // result.SetDiagnostics(...) (parser.go:466) which runs AFTER the parse loop.
    // At this call point #diagnostics is fully populated (end of parse). In 3a it
    // is always empty (no throw flipped) — behaviorally inert but live end-to-end.
    return createSourceFile(
      this.#fileName,
      this.#fileName as never,
      this.#sourceText,
      createNodeArray(statements),
      createToken(Kind.EndOfFile),
      this.#diagnostics,
    );
  }

  #parseStatement(): Statement {
    // tsgo parseDeclaration / parseStatement: capture `pos := p.nodePos()` BEFORE
    // parseModifiersEx so the statement start covers any leading modifiers (export,
    // declare, abstract, async, ...). Thread this single pos into every
    // modifier-carrying production (variable/import/export/class/interface/type-alias/
    // enum/function/expression statement). Keyword-led statements that reject modifiers
    // capture their own pos at their #parseX entry instead.
    const pos = this.#nodePos();
    // tsgo parseStatement routes a leading `@` (KindAtToken, parser.go:1107-1108) into
    // parseDeclaration -> parseModifiersEx(allowDecorators=true), so leading decorators on a
    // class/function declaration are consumed into `modifiers`. Pass allowDecorators=true here
    // so a leading `@` is parsed as a decorator (otherwise it would fall through to
    // #parseExpression and throw); the existing ClassKeyword/FunctionKeyword switch cases then
    // build the decorated declaration with the combined modifiers list.
    const modifiers = this.#parseModifiers(true);
    // tsgo parseDeclarationWorker KindExportKeyword case (parser.go:1169-1178): after the
    // `export` keyword, the FOLLOWING token decides the production. Unlike tsgo (where the
    // bare `export` is consumed inside parseDeclarationWorker), tsts's #parseModifiers has
    // already consumed `export` into `modifiers`, so the deciding token is the CURRENT token.
    // Mirror tsgo's split: `default`(+expr) | `=` -> ExportAssignment; `as` -> namespace
    // export; `default`(+function/class) stays a declaration carrying a DefaultKeyword
    // modifier (tsgo absorbs `default` as a modifier only when followed by class/function).
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword)) {
      if (this.#current().kind === Kind.DefaultKeyword) {
        // tsgo nextTokenCanFollowDefaultKeyword (parser.go:3986): `export default class`/
        // `export default function` are declarations with a DefaultKeyword modifier; any
        // other follower is an ExportAssignment(isExportEquals=false).
        const followerKind = this.#peekKind();
        if (followerKind === Kind.FunctionKeyword || followerKind === Kind.ClassKeyword) {
          this.#advance();
          const defaultModifiers = createNodeArray([...modifiers, createToken(Kind.DefaultKeyword) as ModifierLike]);
          if (this.#current().kind === Kind.FunctionKeyword) {
            return this.#parseFunctionDeclaration(pos, defaultModifiers);
          }
          return this.#parseClassDeclaration(pos, defaultModifiers);
        }
        return this.#parseExportAssignment(pos, modifiers);
      }
      if (this.#current().kind === Kind.EqualsToken) {
        return this.#parseExportAssignment(pos, modifiers);
      }
      if (this.#current().kind === Kind.AsKeyword) {
        return this.#parseNamespaceExportDeclaration(pos, modifiers);
      }
    }
    switch (this.#current().kind) {
      case Kind.SemicolonToken:
        // tsgo parseStatement KindSemicolonToken (parser.go:1061): a bare `;` is an
        // EmptyStatement. It carries no modifiers (keyword-led production).
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on empty statements", this.#current());
        }
        return this.#parseEmptyStatement();
      case Kind.DebuggerKeyword:
        // tsgo parseStatement KindDebuggerKeyword (parser.go:1105).
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on debugger statements", this.#current());
        }
        return this.#parseDebuggerStatement();
      case Kind.WithKeyword:
        // tsgo parseStatement KindWithKeyword (parser.go:1097).
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on with statements", this.#current());
        }
        return this.#parseWithStatement();
      case Kind.ImportKeyword:
        return this.#parseImportDeclaration(pos, modifiers);
      case Kind.ClassKeyword:
        return this.#parseClassDeclaration(pos, modifiers);
      case Kind.InterfaceKeyword:
        return this.#parseInterfaceDeclaration(pos, modifiers);
      case Kind.TypeKeyword:
        if (this.#isTypeAliasDeclarationStart()) {
          return this.#parseTypeAliasDeclaration(pos, modifiers);
        }
        break;
      case Kind.EnumKeyword:
        return this.#parseEnumDeclaration(pos, modifiers);
      case Kind.IfKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on if statements", this.#current());
        }
        return this.#parseIfStatement();
      case Kind.WhileKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on while statements", this.#current());
        }
        return this.#parseWhileStatement();
      case Kind.DoKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on do statements", this.#current());
        }
        return this.#parseDoStatement();
      case Kind.ForKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on for statements", this.#current());
        }
        return this.#parseForStatement();
      case Kind.BreakKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on break statements", this.#current());
        }
        return this.#parseBreakStatement();
      case Kind.ContinueKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on continue statements", this.#current());
        }
        return this.#parseContinueStatement();
      case Kind.VarKeyword:
      case Kind.LetKeyword:
      case Kind.ConstKeyword:
        return this.#parseVariableStatement(pos, modifiers);
      case Kind.FunctionKeyword:
        return this.#parseFunctionDeclaration(pos, modifiers);
      case Kind.ReturnKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on return statements", this.#current());
        }
        return this.#parseReturnStatement();
      case Kind.ThrowKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on throw statements", this.#current());
        }
        return this.#parseThrowStatement();
      case Kind.TryKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on try statements", this.#current());
        }
        return this.#parseTryStatement();
      case Kind.SwitchKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on switch statements", this.#current());
        }
        return this.#parseSwitchStatement();
      case Kind.OpenBraceToken:
        if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword)) {
          return this.#parseExportDeclaration(pos, modifiers);
        }
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on blocks", this.#current());
        }
        return this.#parseBlock();
    }
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.AsteriskToken) {
      return this.#parseExportDeclaration(pos, modifiers);
    }
    if (modifiers !== undefined) {
      throw new ParseError("Modifiers are not valid on expression statements", this.#current());
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

  #parseImportDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseImportDeclarationOrImportEqualsDeclaration (parser.go:2229): ImportDeclaration
    // / ImportEqualsDeclaration start is the #parseStatement-top pos (covering modifiers);
    // finishNode runs after the trailing semicolon so a present `;` is covered.
    this.#expect(Kind.ImportKeyword);
    // tsgo: afterImportPos is captured here, before parsing the leading identifier. It becomes
    // the ImportClause's pos.
    const afterImportPos = this.#nodePos();
    // String-specifier shape: `import "x";` (no clause). tokenAfterImportDefinitelyProduces-
    // ImportDeclaration is implicitly handled by the clause path below.
    if (this.#current().kind === Kind.StringLiteral) {
      const moduleSpecifier = this.#parseStringLiteralExpression();
      const attributes = this.#tryParseImportAttributes();
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createImportDeclaration(modifiers, undefined, moduleSpecifier, attributes), pos);
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
      return this.#parseImportEqualsDeclaration(pos, modifiers, identifier, phaseModifier === Kind.TypeKeyword);
    }
    const importClause = this.#parseImportClause(afterImportPos, phaseModifier, identifier);
    this.#expect(Kind.FromKeyword);
    const moduleSpecifier = this.#parseStringLiteralExpression();
    const attributes = this.#tryParseImportAttributes();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes), pos);
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
    modifiers: NodeArray<ModifierLike> | undefined,
    name: Identifier,
    isTypeOnly: boolean,
  ): Statement {
    // tsgo parseImportEqualsDeclaration (parser.go:2293): `= ModuleReference ;`. Start pos is
    // the #parseStatement-top pos; finishNode after the trailing semicolon.
    this.#expect(Kind.EqualsToken);
    const moduleReference = this.#parseModuleReference();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), pos);
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
    const pos = this.#nodePos();
    this.#expect(Kind.RequireKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseStringLiteralExpression();
    this.#expect(Kind.CloseParenToken);
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
    let namedBindings: NamedImportBindings | undefined;
    if (identifier === undefined || this.#consumeOptional(Kind.CommaToken)) {
      namedBindings = this.#parseNamedImportBindings();
    }
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
    this.#expect(Kind.OpenBraceToken);
    const elements: ImportSpecifier[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken) {
      // tsgo parseImportSpecifier: each specifier pos is the top of its element parse,
      // before the optional `type` modifier / first name.
      const specifierPos = this.#nodePos();
      const isTypeOnly = this.#consumeOptional(Kind.TypeKeyword);
      const firstName = this.#parseModuleExportName();
      const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
      const name = propertyName === undefined ? firstName : this.#parseIdentifier();
      elements.push(this.#finishNode(createImportSpecifier(isTypeOnly, propertyName, name as Identifier), specifierPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createNamedImports(createNodeArray(elements)), pos);
  }

  #parseExportDeclaration(pos: number, modifiers: NodeArray<ModifierLike>): Statement {
    // tsgo parseExportDeclaration (parser.go:2539): ExportDeclaration start is the
    // #parseStatement-top pos (covering modifiers); finishNode runs after the trailing
    // semicolon. After a module specifier, an optional import-attributes clause
    // (`with`/`assert { ... }`) is parsed (tsgo parser.go:2564).
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
      const attributes = moduleSpecifier !== undefined ? this.#tryParseImportAttributes() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createExportDeclaration(modifiers, false, undefined, moduleSpecifier, attributes), pos);
    }
    // tsgo parseNamedExports: NamedExports pos is the `{` token.
    const namedExportsPos = this.#nodePos();
    this.#expect(Kind.OpenBraceToken);
    const elements: ReturnType<typeof createExportSpecifier>[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken) {
      // tsgo parseExportSpecifier: each specifier pos is the top of its element parse.
      const specifierPos = this.#nodePos();
      const firstName = this.#parseModuleExportName();
      const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
      const name = propertyName === undefined ? firstName : this.#parseModuleExportName();
      elements.push(this.#finishNode(createExportSpecifier(false, propertyName, name), specifierPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    const namedExports = this.#finishNode(createNamedExports(createNodeArray(elements)), namedExportsPos);
    const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
    const attributes = moduleSpecifier !== undefined ? this.#tryParseImportAttributes() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createExportDeclaration(modifiers, false, namedExports, moduleSpecifier, attributes), pos);
  }

  #parseExportAssignment(pos: number, modifiers: NodeArray<ModifierLike>): Statement {
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
    const isExportEquals = this.#consumeOptional(Kind.EqualsToken);
    if (!isExportEquals) {
      this.#expect(Kind.DefaultKeyword);
    }
    const expression = this.#doInContext(NodeFlags.AwaitContext, true, () => this.#parseExpression());
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createExportAssignment(modifiers, isExportEquals, undefined as never, expression), pos);
  }

  #parseNamespaceExportDeclaration(pos: number, modifiers: NodeArray<ModifierLike>): Statement {
    // tsgo parseNamespaceExportDeclaration (parser.go:2526): `export as namespace Id ;`. The
    // `export` modifier was already consumed into `modifiers`; here we consume `as`,
    // `namespace`, the identifier, then the trailing semicolon. Start pos is the
    // #parseStatement-top pos; finishNode after the semicolon.
    this.#expect(Kind.AsKeyword);
    this.#expect(Kind.NamespaceKeyword);
    const name = this.#parseIdentifier();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createNamespaceExportDeclaration(modifiers, name), pos);
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

  #parseImportAttributes(token: Kind, skipKeyword = false): ReturnType<typeof createImportAttributes> {
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
    const elements: ReturnType<typeof createImportAttribute>[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      elements.push(this.#parseImportAttribute());
      this.#consumeOptional(Kind.CommaToken);
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    const multiLine = this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n");
    // The factory's token param is narrowed to WithKeyword|AssertKeyword; the guard in
    // #tryParseImportAttributes ensures `token` is exactly one of those.
    return this.#finishNode(createImportAttributes(token as Kind.WithKeyword | Kind.AssertKeyword, createNodeArray(elements), multiLine), pos);
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

  // tsgo parseModifiers / parseModifiersEx (parser.go:3854-3896): a single loop that, when
  // `allowDecorators` is set, accepts EITHER a decorator (`@expr` -> parseDecorator) OR a
  // keyword modifier, appending both into ONE list (ModifierLike already includes Decorator,
  // nodes.ts:1019). tsts keeps the existing keyword-modifier branch and adds the AtToken
  // branch in front. `allowDecorators` defaults to false so decorator-forbidding sites
  // (#parseTypeElement et al.) never mis-consume a stray `@`, mirroring tsgo's parseModifiers
  // (allowDecorators=false) vs parseModifiersEx(true). The grammar-level legality of
  // interleavings/orderings is deferred to the checker, exactly as tsgo does.
  #parseModifiers(allowDecorators = false): NodeArray<ModifierLike> | undefined {
    const modifiers: ModifierLike[] = [];
    while (true) {
      if (allowDecorators && this.#current().kind === Kind.AtToken) {
        modifiers.push(this.#parseDecorator());
        continue;
      }
      if (!this.#isModifierAtCurrentPosition()) {
        break;
      }
      modifiers.push(createToken(this.#current().kind as ModifierSyntaxKind) as ModifierLike);
      this.#advance();
    }
    return modifiers.length === 0 ? undefined : createNodeArray(modifiers);
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

  #isModifierAtCurrentPosition(): boolean {
    if (!modifierKinds.has(this.#current().kind)) {
      return false;
    }
    const nextKind = this.#peekKind();
    // tsgo tryParseModifier stopOnStartOfClassStaticBlock (parser.go:3929-3930): a `static`
    // immediately followed by `{` is NOT a modifier — it begins a class static block, which
    // is dispatched by #parseClassElement. Without this guard #parseModifiers would eat the
    // `static` and misparse the `{`.
    if (this.#current().kind === Kind.StaticKeyword && nextKind === Kind.OpenBraceToken) {
      return false;
    }
    return nextKind !== Kind.QuestionToken
      && nextKind !== Kind.ColonToken
      && nextKind !== Kind.OpenParenToken
      && nextKind !== Kind.SemicolonToken
      && nextKind !== Kind.CommaToken
      && nextKind !== Kind.CloseBraceToken;
  }

  #parseClassDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseClassDeclaration: declaration start is the #parseStatement-top pos
    // (covering modifiers). Members/heritage/type-params are Stage 1e (left unstamped).
    this.#expect(Kind.ClassKeyword);
    const name = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    const members: ClassElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      members.push(this.#parseClassElement());
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, createNodeArray(members)), pos);
  }

  #parseInterfaceDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseInterfaceDeclaration: declaration start is the #parseStatement-top pos.
    // Members are Stage 1e (left unstamped).
    this.#expect(Kind.InterfaceKeyword);
    const name = this.#parseIdentifier();
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    const members: TypeElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.SemicolonToken) || this.#consumeOptional(Kind.CommaToken)) {
        continue;
      }
      members.push(this.#parseTypeElement());
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, createNodeArray(members)), pos);
  }

  #parseTypeAliasDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseTypeAliasDeclaration: declaration start is the #parseStatement-top pos.
    // The `.type` child is Stage 1d (left unstamped).
    this.#expect(Kind.TypeKeyword);
    const name = this.#parseIdentifier();
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.EqualsToken);
    const type = this.#parseType();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createTypeAliasDeclaration(modifiers, name, typeParameters, type), pos);
  }

  #parseEnumDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseEnumDeclaration: declaration start is the #parseStatement-top pos.
    this.#expect(Kind.EnumKeyword);
    const name = this.#parseIdentifier();
    this.#expect(Kind.OpenBraceToken);
    const members = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.CommaToken)) {
        continue;
      }
      // tsgo parseEnumMember (2121): pos at entry (before parsePropertyName);
      // finishNode after the optional initializer.
      const memberPos = this.#nodePos();
      const memberName = this.#parsePropertyName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      members.push(this.#finishNode(createEnumMember(memberName, initializer), memberPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createEnumDeclaration(modifiers, name, createNodeArray(members)), pos);
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
    if (this.#consumeOptional(Kind.SemicolonToken)) {
      return this.#finishNode(createSemicolonClassElement(), pos);
    }
    // tsgo parseClassElement (parser.go:1853): parseModifiersEx(allowDecorators=true,
    // stopOnStartOfClassStaticBlock=true) — decorators on members are consumed here, and a
    // `static {` is left UNconsumed (the static-block guard lives in #isModifierAtCurrentPosition).
    const modifiers = this.#parseModifiers(true);
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
      return this.#finishNode(createClassStaticBlockDeclaration(modifiers, body), pos);
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
        ? this.#withSignatureContext(false, false, () => this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()))
        : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createConstructorDeclaration(modifiers, undefined, createNodeArray(parameters), undefined, body), pos);
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
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createGetAccessorDeclaration(modifiers, name, undefined, createNodeArray([]), type, body), pos);
    }

    if (this.#current().kind === Kind.SetKeyword && this.#peekKind() !== Kind.OpenParenToken) {
      this.#advance();
      const name = this.#parsePropertyName();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createSetAccessorDeclaration(modifiers, name, undefined, createNodeArray(parameters), undefined, body), pos);
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
      const isAsync = modifiers !== undefined && hasModifier(modifiers, Kind.AsyncKeyword);
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withSignatureContext(isGenerator, isAsync, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken
        ? this.#withSignatureContext(isGenerator, isAsync, () => this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()))
        : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createMethodDeclaration(modifiers, undefined, name, postfixToken, typeParameters, createNodeArray(parameters), type, body), pos);
    }

    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createPropertyDeclaration(modifiers, name, postfixToken, type, initializer), pos);
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
    const modifiers = this.#parseModifiers();
    if (this.#isIndexSignature()) {
      return this.#parseIndexSignatureDeclaration(pos, modifiers);
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
      return this.#finishNode(createMethodSignatureDeclaration(modifiers, name, postfixToken, typeParameters, createNodeArray(parameters), type), pos);
    }
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    return this.#finishNode(createPropertySignatureDeclaration(modifiers, name, postfixToken, type as never, undefined as never), pos);
  }

  // `{ (args): R }` (call) and `{ new (args): R }` (construct) signatures.
  #parseSignatureMember(kind: Kind.CallSignature | Kind.ConstructSignature): TypeElement {
    // tsgo parseSignatureMember (3200): own pos captured at entry, BEFORE the
    // optional `new` consume (so the construct-signature start covers `new`);
    // finishNode after the trailing semicolon/comma handling.
    const pos = this.#nodePos();
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
    return kind === Kind.CallSignature
      ? this.#finishNode(createCallSignatureDeclaration(typeParameters, createNodeArray(parameters), type), pos)
      : this.#finishNode(createConstructSignatureDeclaration(typeParameters, createNodeArray(parameters), type), pos);
  }

  // `{ [key: K]: V }` index signature.
  #parseIndexSignatureDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): TypeElement {
    // tsgo parseIndexSignatureDeclaration(pos, ...): pos is the parseTypeMember-top
    // pos (covering preceding modifiers); finishNode after parseTypeMemberSemicolon.
    this.#expect(Kind.OpenBracketToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseBracketToken);
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    return this.#finishNode(createIndexSignatureDeclaration(modifiers, createNodeArray(parameters), type as never), pos);
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
    if (!this.#consumeOptional(Kind.LessThanToken)) {
      return undefined;
    }
    const typeParameters: TypeParameterDeclaration[] = [];
    do {
      // tsgo parseTypeParameter (3228): pos at entry (before modifiers/name);
      // finishNode after the optional defaultType.
      const pos = this.#nodePos();
      const name = this.#parseIdentifier();
      const constraint = this.#consumeOptional(Kind.ExtendsKeyword) ? this.#parseType() : undefined;
      const defaultType = this.#consumeOptional(Kind.EqualsToken) ? this.#parseType() : undefined;
      typeParameters.push(this.#finishNode(createTypeParameterDeclaration(undefined, name, constraint, undefined, defaultType), pos));
    } while (this.#consumeOptional(Kind.CommaToken));
    this.#expectGreaterThan();
    return createNodeArray(typeParameters);
  }

  #parseHeritageClauses(): NodeArray<ReturnType<typeof createHeritageClause>> | undefined {
    const clauses: ReturnType<typeof createHeritageClause>[] = [];
    while (this.#current().kind === Kind.ExtendsKeyword || this.#current().kind === Kind.ImplementsKeyword) {
      // tsgo parseHeritageClause (1826): pos at the extends/implements keyword
      // (captured before nextToken); finishNode after the delimited type list.
      // Inner ExpressionWithTypeArguments elements are already Stage-1d stamped.
      const clausePos = this.#nodePos();
      const token = this.#current().kind as Kind.ExtendsKeyword | Kind.ImplementsKeyword;
      this.#advance();
      const types: ExpressionWithTypeArguments[] = [];
      do {
        types.push(this.#parseExpressionWithTypeArguments());
      } while (this.#consumeOptional(Kind.CommaToken));
      clauses.push(this.#finishNode(createHeritageClause(token, createNodeArray(types)), clausePos));
    }
    return clauses.length === 0 ? undefined : createNodeArray(clauses);
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
    if (!this.#consumeOptional(Kind.LessThanToken)) {
      return undefined;
    }
    const typeArguments: TypeNode[] = [];
    do {
      typeArguments.push(this.#parseType());
    } while (this.#consumeOptional(Kind.CommaToken));
    this.#expectGreaterThan();
    return createNodeArray(typeArguments);
  }

  #parseVariableStatement(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseVariableStatement(pos, ...): the statement start is the #parseStatement-top
    // pos (covering modifiers); finishNode after the trailing optional semicolon.
    const declarationList = this.#parseVariableDeclarationList();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createVariableStatement(modifiers, declarationList), pos);
  }

  #parseVariableDeclarationList(): ReturnType<typeof createVariableDeclarationList> {
    // tsgo parseVariableDeclarationList: own pos at the var/let/const keyword (NOT the
    // outer statement's modifier start). When no modifiers precede, this equals the
    // variable-statement pos; with modifiers it starts later (at var/let/const).
    const pos = this.#nodePos();
    const flags = this.#parseVariableDeclarationListFlags();
    const declarations: VariableDeclaration[] = [];
    do {
      declarations.push(this.#parseVariableDeclaration());
    } while (this.#consumeOptional(Kind.CommaToken));
    return this.#finishNode(createVariableDeclarationList(createNodeArray(declarations), flags), pos);
  }

  #parseVariableDeclarationListFlags(): number {
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
        throw new ParseError("Expected variable declaration kind", token);
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

  #parseFunctionDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseFunctionDeclaration(pos, ...): the declaration start is the
    // #parseStatement-top pos (covering modifiers, incl. the default-export path).
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    // codex-054 M3 Stage-2: tsgo computes signatureFlags = IfElse(asterisk, Yield) |
    // IfElse(async modifier, Await) (parser.go:1719) and threads them through
    // parseParameters/parseFunctionBlock; the worker converts them to Yield/Await
    // contextFlags. tsts derives the same booleans from the asterisk token and the async
    // modifier and wraps the parameter list AND the body via #withSignatureContext.
    const isGenerator = asteriskToken !== undefined;
    const isAsync = modifiers !== undefined && hasModifier(modifiers, Kind.AsyncKeyword);
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
      // function body is never in decorator context. #withSignatureContext sets Yield/Await
      // from the signature; wrap the body additionally clearing Decorator.
      const body = this.#withSignatureContext(isGenerator, isAsync, () =>
        this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()),
      );
      return this.#finishNode(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body), pos);
    };
    return isExported ? this.#doInContext(NodeFlags.AwaitContext, true, build) : build();
  }

  #parseParameterList(): ParameterDeclaration[] {
    const parameters: ParameterDeclaration[] = [];
    if (this.#current().kind === Kind.CloseParenToken) {
      return parameters;
    }
    while (true) {
      parameters.push(this.#parseParameterDeclaration());
      if (!this.#consumeOptional(Kind.CommaToken) || this.#current().kind === Kind.CloseParenToken) {
        break;
      }
    }
    return parameters;
  }

  #parseParameterDeclaration(): ParameterDeclaration {
    // tsgo parseParameterEx (3315): pos captured at entry, BEFORE modifiers/decorators
    // and the optional `...`; finishNode after the optional initializer. (The single-
    // identifier arrow param in #parseArrowFunction is stamped separately via paramPos.)
    const pos = this.#nodePos();
    // tsgo parseParameterEx (parser.go:3315-3323): parseModifiersEx(allowDecorators=true)
    // runs right after the entry pos capture and BEFORE the `...` consume. This threads
    // parameter decorators (`@dec p`) and parameter-property accessibility modifiers
    // (public/private/protected/readonly) into the ParameterDeclaration's modifiers list
    // (previously hard-coded undefined, silently dropping them).
    const modifiers = this.#parseModifiers(true);
    const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
    const name = this.#parseBindingName();
    const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) : undefined;
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return this.#finishNode(createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer), pos);
  }

  #parseBlock(): Block {
    // tsgo parseBlock: pos at the `{` (captured before parseExpected); finishNode after the
    // closing `}` is consumed so the end covers it.
    const pos = this.#nodePos();
    const openBrace = this.#expect(Kind.OpenBraceToken);
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    const multiLine = this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n");
    return this.#finishNode(createBlock(createNodeArray(statements), multiLine), pos);
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
      throw new ParseError("Expected catch or finally clause", this.#current());
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
    const clauses: CaseOrDefaultClause[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      const clausePos = this.#nodePos();
      if (this.#consumeOptional(Kind.CaseKeyword)) {
        const caseExpression = this.#parseExpression();
        this.#expect(Kind.ColonToken);
        clauses.push(this.#finishNode(createCaseClause(caseExpression, createNodeArray(this.#parseCaseClauseStatements())), clausePos));
        continue;
      }
      if (this.#consumeOptional(Kind.DefaultKeyword)) {
        this.#expect(Kind.ColonToken);
        clauses.push(this.#finishNode(createDefaultClause(undefined as never, createNodeArray(this.#parseCaseClauseStatements())), clausePos));
        continue;
      }
      throw new ParseError("Expected case or default clause", this.#current());
    }
    this.#expect(Kind.CloseBraceToken);
    const caseBlock = this.#finishNode(createCaseBlock(createNodeArray(clauses)), caseBlockPos);
    return this.#finishNode(createSwitchStatement(expression, caseBlock), pos);
  }

  #parseCaseClauseStatements(): Statement[] {
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.CaseKeyword
      && this.#current().kind !== Kind.DefaultKeyword
      && this.#current().kind !== Kind.CloseBraceToken
      && this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    return statements;
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
    let left = this.#parseUnaryExpression();
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
      const token = createToken(operatorToken.kind as BinaryOperator);
      if (!isBinaryOperatorToken(token)) {
        throw new ParseError("Expected binary operator", operatorToken);
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
      left = this.#finishNode(createConditionalExpression(left, createToken(Kind.QuestionToken), whenTrue, createToken(Kind.ColonToken), whenFalse), pos);
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
    return this.#finishNode(createArrowFunction(undefined, undefined, createNodeArray(parameters), type, createToken(Kind.EqualsGreaterThanToken), body), pos);
  }

  #parseArrowBody(isAsync: boolean): ConciseBody {
    // codex-054 M3 Stage-2: tsgo parseArrowFunctionExpressionBody (parser.go:4461-4485). A
    // block body goes through parseFunctionBlock(IfElse(isAsync,Await)) which sets
    // Yield=false, Await=isAsync and CLEARS DecoratorContext (parser.go:3497-3500). An
    // expression body sets Await=isAsync, Yield=false directly (parser.go:4483-4484). Both
    // are reproduced via #withSignatureContext(false, isAsync, ...); the block body also
    // clears DecoratorContext.
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#withSignatureContext(false, isAsync, () =>
        this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()),
      );
    }
    return this.#withSignatureContext(false, isAsync, () => this.#parseExpression());
  }

  #parseUnaryExpression(): Expression {
    // tsgo parsePrefixUnaryExpression/parseDeleteExpression/parseTypeOfExpression/
    // parseVoidExpression/parseAwaitExpression: node start is the operator keyword/punct,
    // captured before consuming it. The NewKeyword case captures its pos inside
    // #parseNewExpression.
    const pos = this.#nodePos();
    const token = this.#current();
    switch (token.kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
      case Kind.PlusPlusToken:
      case Kind.MinusMinusToken:
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
      case Kind.AwaitKeyword:
        this.#advance();
        return this.#finishNode(createAwaitExpression(this.#parseUnaryExpression()), pos);
      default:
        return this.#parsePostfixExpression();
    }
  }

  #parsePostfixExpression(): Expression {
    // tsgo parseUpdateExpression: the postfix node start is the operand (LHS expression) start.
    const pos = this.#nodePos();
    const expression = this.#parseLeftHandSideExpression();
    if (this.#current().kind === Kind.PlusPlusToken || this.#current().kind === Kind.MinusMinusToken) {
      const operator = this.#current().kind as Kind.PlusPlusToken | Kind.MinusMinusToken;
      this.#advance();
      return this.#finishNode(createPostfixUnaryExpression(expression, operator), pos);
    }
    return expression;
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
      arguments_ = createNodeArray(this.#parseArgumentList());
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
      const questionDotToken = this.#consumeOptional(Kind.QuestionDotToken) ? createToken(Kind.QuestionDotToken) : undefined;
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
        const callee = createCallExpression(expression, questionDotToken, typeArguments, createNodeArray(this.#parseArgumentList()), NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        expression = this.#finishNode(callee, pos);
        continue;
      }
      if (this.#consumeOptional(Kind.OpenParenToken)) {
        const callee = createCallExpression(expression, undefined, undefined, createNodeArray(this.#parseArgumentList()), NodeFlags.None);
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
        throw new ParseError("Expected optional chain member", this.#current());
      }
      if (this.#consumeOptional(Kind.ExclamationToken)) {
        expression = this.#finishNode(createNonNullExpression(expression, NodeFlags.None), pos);
        continue;
      }
      return expression;
    }
  }

  #tryParseCallTypeArguments(): NodeArray<TypeNode> | undefined {
    if (this.#current().kind !== Kind.LessThanToken) {
      return undefined;
    }
    const mark = this.#mark();
    try {
      const typeArguments = this.#parseOptionalTypeArguments();
      if (typeArguments !== undefined && this.#current().kind === Kind.OpenParenToken) {
        return typeArguments;
      }
    } catch {
    }
    this.#rewind(mark);
    return undefined;
  }

  #parseArgumentList(): Expression[] {
    const expressions: Expression[] = [];
    if (this.#current().kind === Kind.CloseParenToken) {
      return expressions;
    }
    while (true) {
      expressions.push(this.#parseArgumentExpression());
      if (!this.#consumeOptional(Kind.CommaToken) || this.#current().kind === Kind.CloseParenToken) {
        break;
      }
    }
    return expressions;
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
        return this.#finishNode(createIdentifier(token.text), pos);
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
          return this.#finishNode(createIdentifier(token.text), pos);
        }
        throw new ParseError(`Unexpected token ${Kind[token.kind]}`, token);
    }
  }

  #parseFunctionExpression(): Expression {
    // tsgo parseFunctionExpression: node start is the 'function' keyword.
    const pos = this.#nodePos();
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
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
    const body = this.#withSignatureContext(isGenerator, isAsync, () =>
      this.#doInContext(NodeFlags.DecoratorContext, false, () => this.#parseBlock()),
    );
    return this.#finishNode(createFunctionExpression(undefined, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body), pos);
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
    return this.#finishNode(createTemplateExpression(head, createNodeArray(spans)), headPos);
  }

  // wave 4b-swap: tsgo parseLiteralOfTemplateSpan (parser.go:3727-3745). After a
  // span body, the CURRENT token is `}` (the live scanner emits CloseBraceToken,
  // NOT a TemplateMiddle/Tail, since scan() does not track brace depth). Re-scan
  // the `}`-started continuation in place via reScanTemplateToken(false) (tsgo
  // parser.go:5542), refresh #token, then read + advance past the Middle/Tail.
  #parseLiteralOfTemplateSpan(): ScannedToken {
    if (this.#current().kind !== Kind.CloseBraceToken) {
      throw new ParseError("Expected template continuation", this.#current());
    }
    const kind = this.#scanner.reScanTemplateToken(false);
    this.#refreshTokenFromScanner(kind);
    const literalToken = this.#current();
    if (literalToken.kind !== Kind.TemplateMiddle && literalToken.kind !== Kind.TemplateTail) {
      throw new ParseError("Expected template continuation", literalToken);
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
    const elements: Expression[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      elements.push(this.#parseArgumentExpression());
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    return this.#finishNode(createArrayLiteralExpression(createNodeArray(elements), this.#sourceText.includes("\n")), pos);
  }

  #parseObjectLiteralExpression(): Expression {
    // tsgo parseObjectLiteralExpression: node start is the '{' token; finish after the closing
    // '}' is consumed. Each element (parseObjectLiteralElement) captures its own start at the
    // top of the loop iteration before its first token (the '...' for spread, or the name).
    const pos = this.#nodePos();
    const openBrace = this.#expect(Kind.OpenBraceToken);
    const properties: ObjectLiteralElementLike[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      const elementPos = this.#nodePos();
      if (this.#consumeOptional(Kind.DotDotDotToken)) {
        properties.push(this.#finishNode(createSpreadAssignment(this.#parseExpression()), elementPos));
        this.#consumeOptional(Kind.CommaToken);
        continue;
      }
      const name = this.#parsePropertyName();
      if (this.#consumeOptional(Kind.ColonToken)) {
        properties.push(this.#finishNode(createPropertyAssignment(undefined, name, undefined, undefined as never, this.#parseExpression()), elementPos));
      } else {
        properties.push(this.#finishNode(createShorthandPropertyAssignment(undefined, name, undefined, undefined as never, undefined, undefined), elementPos));
      }
      this.#consumeOptional(Kind.CommaToken);
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createObjectLiteralExpression(createNodeArray(properties), this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n")), pos);
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
    const elements: BindingElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      // tsgo parseObjectBindingElement (1680): pos at the top of the iteration,
      // BEFORE the optional `...`; finishNode after the optional initializer.
      const elementPos = this.#nodePos();
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const firstName = this.#parsePropertyName();
      const propertyName = this.#consumeOptional(Kind.ColonToken) ? firstName : undefined;
      if (propertyName === undefined && firstName.kind !== Kind.Identifier) {
        throw new ParseError("Expected identifier shorthand in binding pattern", this.#current());
      }
      const name = propertyName === undefined ? firstName as BindingName : this.#parseBindingName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      elements.push(this.#finishNode(createBindingElement(dotDotDotToken, propertyName, name, initializer), elementPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createObjectBindingPattern(createNodeArray(elements)), pos);
  }

  #parseArrayBindingPattern(): BindingName {
    // tsgo parseArrayBindingPattern (1644): pattern pos at the `[` (before
    // parseExpected); finishNode after the closing `]`.
    const pos = this.#nodePos();
    this.#expect(Kind.OpenBracketToken);
    const elements: BindingElement[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      // tsgo parseArrayBindingElement (1655): pos captured at the top of the iteration
      // (BEFORE the comma), so an elided hole still finishNodes a (zero-length) nil
      // BindingElement at the comma position. Capture elementPos before consuming the
      // comma that TSTS uses to detect the hole.
      const elementPos = this.#nodePos();
      if (this.#consumeOptional(Kind.CommaToken)) {
        elements.push(this.#finishNode(createBindingElement(undefined, undefined, undefined, undefined), elementPos));
        continue;
      }
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const name = this.#parseBindingName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      elements.push(this.#finishNode(createBindingElement(dotDotDotToken, undefined, name, initializer), elementPos));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    return this.#finishNode(createArrayBindingPattern(createNodeArray(elements)), pos);
  }

  #parsePropertyName(): PropertyName {
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
      return createToken(Kind.QuestionToken);
    }
    if (this.#consumeOptional(Kind.ExclamationToken)) {
      return createToken(Kind.ExclamationToken);
    }
    return undefined;
  }

  #parseIdentifier(): Identifier {
    const token = this.#current();
    if (!isIdentifierNameKind(token.kind)) {
      throw new ParseError(`Expected token ${Kind[Kind.Identifier]}`, token);
    }
    const pos = this.#nodePos();
    this.#advance();
    return this.#finishNode(createIdentifier(token.text), pos);
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
    return !hasLeadingBar && types.length === 1 ? types[0]! : this.#finishNode(createUnionTypeNode(createNodeArray(types)), pos);
  }

  #parseIntersectionType(): TypeNode {
    // tsgo parseUnionOrIntersectionType (2639): pos at entry; finishNode ONLY when
    // the intersection node is built (single-constituent passthrough unwrapped).
    const pos = this.#nodePos();
    const types = [this.#parsePostfixType()];
    while (this.#consumeOptional(Kind.AmpersandToken)) {
      types.push(this.#parsePostfixType());
    }
    return types.length === 1 ? types[0]! : this.#finishNode(createIntersectionTypeNode(createNodeArray(types)), pos);
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
      return this.#finishNode(createConstructorTypeNode(undefined, undefined, createNodeArray(parameters), this.#parseType()), pos);
    }
    if (token.kind === Kind.OpenBracketToken) {
      this.#advance();
      const elements: TypeNode[] = [];
      while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
        elements.push(this.#parseTupleElementNameOrTupleElementType());
        this.#consumeOptional(Kind.CommaToken);
      }
      this.#expect(Kind.CloseBracketToken);
      return this.#finishNode(createTupleTypeNode(createNodeArray(elements)), pos);
    }
    if (token.kind === Kind.OpenBraceToken) {
      // tsgo parseNonArrayType (2810-2814): `{` dispatches to parseMappedType when the
      // lookahead (nextIsStartOfMappedType, 3123) matches `{ +/-? readonly? [ id in`,
      // otherwise to a type literal.
      if (this.#nextIsStartOfMappedType()) {
        return this.#parseMappedType();
      }
      this.#advance();
      const members: TypeElement[] = [];
      while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
        if (this.#consumeOptional(Kind.SemicolonToken) || this.#consumeOptional(Kind.CommaToken)) {
          continue;
        }
        members.push(this.#parseTypeElement());
      }
      this.#expect(Kind.CloseBraceToken);
      return this.#finishNode(createTypeLiteralNode(createNodeArray(members)), pos);
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
    throw new ParseError(`Unexpected type token ${Kind[token.kind]}`, token);
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
    if (keyword !== Kind.WithKeyword && keyword !== Kind.AssertKeyword) {
      throw new ParseError(`Expected token ${Kind[Kind.WithKeyword]}`, this.#current());
    }
    this.#advance();
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
    const readonlyToken = this.#parseMappedTypeModifierToken(Kind.ReadonlyKeyword);
    this.#expect(Kind.OpenBracketToken);
    const typeParameter = this.#parseMappedTypeParameter();
    const nameType = this.#consumeOptional(Kind.AsKeyword) ? this.#parseType() : undefined;
    this.#expect(Kind.CloseBracketToken);
    const questionToken = this.#parseMappedTypeModifierToken(Kind.QuestionToken);
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    const members: TypeElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.SemicolonToken) || this.#consumeOptional(Kind.CommaToken)) {
        continue;
      }
      members.push(this.#parseTypeElement());
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#finishNode(createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, createNodeArray(members)), pos);
  }

  #parseMappedTypeModifierToken<TExpected extends Kind.ReadonlyKeyword | Kind.QuestionToken>(expected: TExpected): Token<TExpected> | PlusToken | MinusToken | undefined {
    // tsgo parseMappedType (3137-3143 / 3151-3157): the readonly/question slot accepts an
    // optional `+`/`-` prefix OR the bare keyword/question token. When a `+`/`-` is seen tsgo
    // parses the token, then expects the keyword/question to follow — here we faithfully
    // consume the `+`/`-` token node and (per tsgo's parseExpected) require the following
    // keyword/question, advancing past it.
    const current = this.#current().kind;
    if (current === Kind.PlusToken) {
      this.#advance();
      this.#expect(expected);
      return createToken(Kind.PlusToken);
    }
    if (current === Kind.MinusToken) {
      this.#advance();
      this.#expect(expected);
      return createToken(Kind.MinusToken);
    }
    if (current === expected) {
      this.#advance();
      return createToken(expected);
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
    return this.#finishNode(createTemplateLiteralTypeNode(head, createNodeArray(spans)), headPos);
  }

  #parseTupleElementNameOrTupleElementType(): TypeNode {
    // tsgo parseTupleElementNameOrTupleElementType (3617): a named-tuple member is detected
    // by a lookahead (scanStartOfNamedTupleElement, 3633): optional `...`, an identifier OR
    // keyword, then `:` OR `?:`. On match build a NamedTupleMember; otherwise fall through to
    // the plain element parse (which itself handles leading `...` rest / trailing `?` optional).
    if (this.#scanStartOfNamedTupleElement()) {
      const pos = this.#nodePos();
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const name = this.#parseIdentifier();
      const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) : undefined;
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
    return this.#finishNode(createFunctionTypeNode(undefined, createNodeArray(parameters), this.#parseType()), pos);
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
    // with no error. tsts has no diagnostics array yet, so the binding-pattern arm
    // returns whether the pattern parsed without throwing.
    if (modifierKinds.has(this.#current().kind)) {
      this.#parseModifiers();
    }
    this.#consumeOptional(Kind.DotDotDotToken);
    if (isIdentifierNameKind(this.#current().kind) || this.#current().kind === Kind.ThisKeyword) {
      this.#nextToken();
      return true;
    }
    if (this.#current().kind === Kind.OpenBracketToken || this.#current().kind === Kind.OpenBraceToken) {
      try {
        this.#parseBindingName();
        return true;
      } catch {
        return false;
      }
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
    return this.#finishNode(createFunctionTypeNode(typeParameters, createNodeArray(parameters), this.#parseType()), pos);
  }

  #tryParseTypePredicate(): TypeNode | undefined {
    // tsgo parseTypeOrTypePredicate / parseAssertsTypePredicate (3404/3668): pos at
    // entry (BEFORE the optional 'asserts'); finishNode after parameterName (no 'is')
    // or after the #parseType following 'is'. The rewind paths return undefined
    // without creating a node, so no stray stamp.
    const mark = this.#mark();
    const pos = this.#nodePos();
    const assertsModifier = this.#consumeOptional(Kind.AssertsKeyword) ? createToken(Kind.AssertsKeyword) : undefined;
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
    const token = this.#current();
    if (token.kind !== kind) {
      throw new ParseError(`Expected token ${Kind[kind]}`, token);
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
      diagnosticsLen: this.#diagnostics.length,
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

  // codex-048 Stage-1a: position plumbing mirroring tsgo
  // internal/parser/parser.go finishNode (5904-5917) MINUS the error-flag bit
  // (that bit is Stage 3). nodePos is the start of the CURRENT (not-yet-consumed)
  // token; capture it BEFORE advancing. nodeEnd is token-tight: the end of the
  // just-consumed token. Per codex-048 (i) this is the token end, NOT the
  // trivia-inclusive Scanner TokenFullStart (that is a Stage-4 closure item).
  #nodePos(): number {
    return this.#token.pos;
  }

  #nodeEnd(): number {
    return this.#prevTokenEnd;
  }

  // codex-054 M3 Stage-2: tsgo setContextFlags (parser.go:6352-6358). Sets or
  // clears the given context bit(s) in #contextFlags in place; tsgo mutates the
  // pointer-receiver field, so this is the faithful mutable-parse-state equivalent.
  #setContextFlags(flags: NodeFlags, value: boolean): void {
    this.#contextFlags = value ? (this.#contextFlags | flags) : (this.#contextFlags & ~flags);
  }

  // codex-054 M3 Stage-2: tsgo doInContext (parser.go:6360-6366) — save the current
  // contextFlags, set the requested context, run the production, then RESTORE.
  // tsgo has no exceptions so it restores after the call returns; tsts still throws
  // ParseError in Stage-2 and uses try/catch speculative rewinds, so the restore MUST
  // run in a `finally` to guarantee #contextFlags is never left mutated when a
  // production unwinds via a throw. This is NOT an error-model change — it only
  // preserves tsgo's save/set/run/restore invariant under tsts's still-present throws.
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

  #finishNode<T extends Node>(node: T, pos: number): T {
    node.pos = pos;
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

function isIdentifierNameKind(kind: Kind): boolean {
  return kind === Kind.Identifier || (kind >= Kind.FirstKeyword && kind <= Kind.LastKeyword);
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

export function parseSourceFile(sourceText: string, options?: ParseSourceFileOptions): SourceFile {
  return new Parser(sourceText, options).parseSourceFile();
}
