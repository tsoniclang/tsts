/**
 * Strada-shaped parser skeleton.
 *
 * Substantive port of TS-Go `internal/parser/parser.go` (~6780 LoC,
 * 401 Parser methods). The existing `parser.ts` provides a working
 * minimal recursive-descent parser; this file is a separate file that
 * mirrors Strada's Parser API at the method-API level so downstream
 * code can declare against the full surface.
 *
 * Port scope: ~250 method signatures across the major parse-*
 * families (statements, expressions, types, JSX, decorators,
 * modifiers, JSDoc-aware variants), constant-union ParsingContext,
 * JSDocInfo state, parser pool. Method bodies are stubbed; the real
 * recursive-descent algorithm lives in `parser.ts` and is being
 * incrementally migrated onto this surface.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  SourceFile,
  Statement,
  Expression,
  TypeNode,
  EntityName,
  ModifierList,
  NodeList,
  ObjectLiteralExpression,
  Diagnostic,
  IdentifierNode,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// ParsingContext (constant-union, replaces Go iota)
// ---------------------------------------------------------------------------

export type ParsingContext = number;
export const ParsingContext = {
  SourceElements: 0 as ParsingContext,
  BlockStatements: 1 as ParsingContext,
  SwitchClauses: 2 as ParsingContext,
  SwitchClauseStatements: 3 as ParsingContext,
  TypeMembers: 4 as ParsingContext,
  ClassMembers: 5 as ParsingContext,
  EnumMembers: 6 as ParsingContext,
  HeritageClauseElement: 7 as ParsingContext,
  VariableDeclarations: 8 as ParsingContext,
  ObjectBindingElements: 9 as ParsingContext,
  ArrayBindingElements: 10 as ParsingContext,
  ArgumentExpressions: 11 as ParsingContext,
  ObjectLiteralMembers: 12 as ParsingContext,
  JsxAttributes: 13 as ParsingContext,
  JsxChildren: 14 as ParsingContext,
  ArrayLiteralMembers: 15 as ParsingContext,
  Parameters: 16 as ParsingContext,
  JSDocParameters: 17 as ParsingContext,
  RestProperties: 18 as ParsingContext,
  TypeParameters: 19 as ParsingContext,
  TypeArguments: 20 as ParsingContext,
  TupleElementTypes: 21 as ParsingContext,
  HeritageClauses: 22 as ParsingContext,
  ImportOrExportSpecifiers: 23 as ParsingContext,
  ImportAttributes: 24 as ParsingContext,
  JSDocComment: 25 as ParsingContext,
} as const;

export type ParsingContexts = number;
export type JsdocScannerInfo = number;

export interface JSDocInfo {
  jsdoc: AstNode[];
  hasParseError: boolean;
}

export interface ParserState {
  pos: number;
  token: number;
  tokenValue: string;
  parseDiagnosticLength: number;
  jsdocDiagnosticLength: number;
  contextFlags: number;
  parsingContext: ParsingContexts;
  identifierCount: number;
  nodeCount: number;
  topLevel: boolean;
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

export class Parser {
  sourceText = "";
  scriptKind = 0;
  fileName = "";
  languageVersion = 0;
  jsdocParsingMode = 0;
  pos = 0;
  token = 0;
  tokenValue = "";
  parseDiagnostics: Diagnostic[] = [];
  jsdocDiagnostics: Diagnostic[] = [];
  sourceFlags = 0;
  contextFlags = 0;
  parsingContext: ParsingContexts = 0;
  identifierCount = 0;
  nodeCount = 0;
  identifiers: Map<string, string> = new Map();
  notParenthesizedArrow: Set<number> = new Set();
  topLevel = true;
  inAmbientContext = false;
  jsdocCache: Map<AstNode, AstNode[]> = new Map();
  inJSDoc = false;
  parseSemicolonAfterPropertyName = false;

  constructor() {
    this.initializeClosures();
  }

  initializeClosures(): void { /* deferred */ }

  isJavaScript(): boolean {
    return this.scriptKind === ScriptKind.JS || this.scriptKind === ScriptKind.JSX;
  }

  parseJSONText(): SourceFile {
    return {} as SourceFile;
  }

  validateJsonValue(sourceFile: SourceFile, valueExpression: Expression): void {
    void sourceFile; void valueExpression;
  }

  validateJsonObjectLiteral(sourceFile: SourceFile, node: ObjectLiteralExpression): void {
    void sourceFile; void node;
  }

  initializeState(opts: SourceFileParseOptions, sourceText: string, scriptKind: number): void {
    this.sourceText = sourceText;
    this.scriptKind = scriptKind;
    void opts;
  }

  scanError(message: DiagnosticMessage, pos: number, length: number, ...args: unknown[]): void {
    void message; void pos; void length; void args;
  }

  parseErrorAt(pos: number, end: number, message: DiagnosticMessage, ...args: unknown[]): Diagnostic | undefined {
    void pos; void end; void message; void args;
    return undefined;
  }

  parseErrorAtCurrentToken(message: DiagnosticMessage, ...args: unknown[]): Diagnostic | undefined {
    void message; void args;
    return undefined;
  }

  parseErrorAtRange(loc: TextRange, message: DiagnosticMessage, ...args: unknown[]): Diagnostic | undefined {
    void loc; void message; void args;
    return undefined;
  }

  mark(): ParserState {
    return {
      pos: this.pos, token: this.token, tokenValue: this.tokenValue,
      parseDiagnosticLength: this.parseDiagnostics.length,
      jsdocDiagnosticLength: this.jsdocDiagnostics.length,
      contextFlags: this.contextFlags, parsingContext: this.parsingContext,
      identifierCount: this.identifierCount, nodeCount: this.nodeCount,
      topLevel: this.topLevel,
    };
  }

  rewind(state: ParserState): void {
    this.pos = state.pos; this.token = state.token; this.tokenValue = state.tokenValue;
    this.parseDiagnostics = this.parseDiagnostics.slice(0, state.parseDiagnosticLength);
    this.jsdocDiagnostics = this.jsdocDiagnostics.slice(0, state.jsdocDiagnosticLength);
    this.contextFlags = state.contextFlags;
    this.parsingContext = state.parsingContext;
    this.identifierCount = state.identifierCount;
    this.nodeCount = state.nodeCount;
    this.topLevel = state.topLevel;
  }

  lookAhead(callback: (p: Parser) => boolean): boolean {
    const state = this.mark();
    const result = callback(this);
    if (!result) this.rewind(state);
    return result;
  }

  // -------------------------------------------------------------------------
  // Token navigation
  // -------------------------------------------------------------------------

  nextToken(): number { return 0; }
  nextTokenWithoutCheck(): number { return 0; }
  nextTokenJSDoc(): number { return 0; }
  nextJSDocCommentTextToken(inBackticks: boolean): number { void inBackticks; return 0; }
  nodePos(): number { return this.pos; }
  hasPrecedingLineBreak(): boolean { return false; }
  jsdocScannerInfo(): JsdocScannerInfo { return 0; }

  parseExpected(kind: number): boolean {
    // If the current token matches, consume it; else report an error.
    if (this.token === kind) {
      this.nextToken();
      return true;
    }
    this.parseErrorAtCurrentToken({ code: 1005, message: `'${kind}' expected.` });
    return false;
  }
  parseExpectedJSDoc(kind: number): boolean {
    if (this.token === kind) {
      this.nextTokenJSDoc();
      return true;
    }
    return false;
  }
  parseExpectedMatchingBrackets(openKind: number, closeKind: number, openParsed: boolean, openPosition: number): void {
    void openKind; void openParsed; void openPosition;
    this.parseExpected(closeKind);
  }
  parseExpectedWithoutAdvancing(kind: number): boolean {
    return this.token === kind;
  }
  parseExpectedWithDiagnostic(kind: number, message: DiagnosticMessage, shouldAdvance: boolean): boolean {
    if (this.token === kind) {
      if (shouldAdvance) this.nextToken();
      return true;
    }
    this.parseErrorAtCurrentToken(message);
    return false;
  }
  parseOptional(token: number): boolean {
    if (this.token === token) {
      this.nextToken();
      return true;
    }
    return false;
  }
  parseTokenNode(): AstNode {
    // Capture the current token as a node, then advance.
    const node = { kind: this.token, pos: this.pos, end: this.pos } as unknown as AstNode;
    this.nextToken();
    return node;
  }
  parseExpectedToken(kind: number): AstNode {
    if (this.token === kind) return this.parseTokenNode();
    this.parseErrorAtCurrentToken({ code: 1005, message: `'${kind}' expected.` });
    return { kind, pos: this.pos, end: this.pos } as unknown as AstNode;
  }
  parseOptionalToken(kind: number): AstNode | undefined {
    if (this.token === kind) return this.parseTokenNode();
    return undefined;
  }
  parseExpectedTokenJSDoc(kind: number): AstNode {
    if (this.token === kind) return this.parseTokenNode();
    return { kind, pos: this.pos, end: this.pos } as unknown as AstNode;
  }
  parseOptionalTokenJSDoc(kind: number): AstNode | undefined {
    if (this.token === kind) return this.parseTokenNode();
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Source-file entry + top-level
  // -------------------------------------------------------------------------

  parseSourceFileWorker(): SourceFile { return {} as SourceFile; }
  finishSourceFile(result: SourceFile, isDeclarationFile: boolean): void {
    void result; void isDeclarationFile;
  }
  createJSDocCache(): Map<AstNode, AstNode[]> { return new Map(); }
  parseToplevelStatement(i: number): AstNode { void i; return {} as AstNode; }
  reparseTopLevelAwait(sourceFile: SourceFile): AstNode { void sourceFile; return {} as AstNode; }

  // -------------------------------------------------------------------------
  // List parsing
  // -------------------------------------------------------------------------

  parseListIndex(kind: ParsingContext, parseElement: (p: Parser, i: number) => AstNode): AstNode[] {
    void kind; void parseElement;
    return [];
  }
  parseList(kind: ParsingContext, parseElement: (p: Parser) => AstNode): NodeList {
    void kind; void parseElement;
    return {} as NodeList;
  }
  parseDelimitedList(kind: ParsingContext, parseElement: (p: Parser) => AstNode): NodeList {
    void kind; void parseElement;
    return {} as NodeList;
  }
  parseBracketedList(
    kind: ParsingContext, parseElement: (p: Parser) => AstNode,
    opening: number, closing: number,
  ): NodeList {
    void kind; void parseElement; void opening; void closing;
    return {} as NodeList;
  }
  parseEmptyNodeList(): NodeList { return {} as NodeList; }
  createMissingList(): NodeList { return {} as NodeList; }
  abortParsingListOrMoveToNextToken(kind: ParsingContext): boolean { void kind; return false; }
  isInSomeParsingContext(): boolean { return this.parsingContext !== 0; }
  parsingContextErrors(context: ParsingContext): void { void context; }
  isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
    void parsingContext; void inErrorRecovery; return false;
  }
  isListTerminator(kind: ParsingContext): boolean { void kind; return false; }

  // -------------------------------------------------------------------------
  // Statements
  // -------------------------------------------------------------------------

  parseStatement(): Statement { return {} as Statement; }
  parseDeclaration(): Statement { return {} as Statement; }
  parseDeclarationWorker(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): Statement {
    void pos; void jsdoc; void modifiers;
    return {} as Statement;
  }
  isLetDeclaration(): boolean { return false; }
  nextTokenIsBindingIdentifierOrStartOfDestructuring(): boolean { return false; }
  parseBlock(ignoreMissingOpenBrace: boolean, diagnosticMessage: DiagnosticMessage | undefined): AstNode {
    void ignoreMissingOpenBrace; void diagnosticMessage;
    return {} as AstNode;
  }
  parseEmptyStatement(): AstNode { return {} as AstNode; }
  parseIfStatement(): AstNode { return {} as AstNode; }
  parseDoStatement(): AstNode { return {} as AstNode; }
  parseWhileStatement(): AstNode { return {} as AstNode; }
  parseForOrForInOrForOfStatement(): AstNode { return {} as AstNode; }
  parseBreakStatement(): AstNode { return {} as AstNode; }
  parseContinueStatement(): AstNode { return {} as AstNode; }
  parseIdentifierUnlessAtSemicolon(): AstNode | undefined { return undefined; }
  parseReturnStatement(): AstNode { return {} as AstNode; }
  parseWithStatement(): AstNode { return {} as AstNode; }
  parseCaseClause(): AstNode { return {} as AstNode; }
  parseDefaultClause(): AstNode { return {} as AstNode; }
  parseCaseOrDefaultClause(): AstNode { return {} as AstNode; }
  parseCaseBlock(): AstNode { return {} as AstNode; }
  parseSwitchStatement(): AstNode { return {} as AstNode; }
  parseThrowStatement(): AstNode { return {} as AstNode; }
  parseTryStatement(): AstNode { return {} as AstNode; }
  parseCatchClause(): AstNode { return {} as AstNode; }
  parseDebuggerStatement(): AstNode { return {} as AstNode; }
  parseExpressionOrLabeledStatement(): Statement { return {} as Statement; }

  // -------------------------------------------------------------------------
  // Variables, parameters, bindings
  // -------------------------------------------------------------------------

  parseVariableStatement(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseVariableDeclarationList(inForStatementInitializer: boolean): AstNode {
    void inForStatementInitializer; return {} as AstNode;
  }
  parseVariableDeclaration(): AstNode { return {} as AstNode; }
  parseVariableDeclarationAllowExclamation(): AstNode { return {} as AstNode; }
  parseVariableDeclarationWorker(allowExclamation: boolean): AstNode {
    void allowExclamation; return {} as AstNode;
  }
  parseIdentifierOrPattern(): AstNode { return {} as AstNode; }
  parseIdentifierOrPatternWithDiagnostic(privateIdentifierDiagnosticMessage: DiagnosticMessage | undefined): AstNode {
    void privateIdentifierDiagnosticMessage; return {} as AstNode;
  }
  parseArrayBindingPattern(): AstNode { return {} as AstNode; }
  parseArrayBindingElement(): AstNode { return {} as AstNode; }
  parseObjectBindingPattern(): AstNode { return {} as AstNode; }
  parseObjectBindingElement(): AstNode { return {} as AstNode; }
  parseInitializer(): Expression | undefined { return undefined; }
  parseTypeAnnotation(): TypeNode | undefined { return undefined; }

  // -------------------------------------------------------------------------
  // Function / class / interface / type alias / enum / module declarations
  // -------------------------------------------------------------------------

  parseFunctionDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseClassDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseClassExpression(): AstNode { return {} as AstNode; }
  parseClassDeclarationOrExpression(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined, kind: number): AstNode {
    void pos; void jsdoc; void modifiers; void kind; return {} as AstNode;
  }
  parseNameOfClassDeclarationOrExpression(): AstNode | undefined { return undefined; }
  isImplementsClause(): boolean { return false; }
  parseHeritageClauses(): NodeList | undefined { return undefined; }
  parseHeritageClause(): AstNode { return {} as AstNode; }
  parseExpressionWithTypeArguments(): AstNode { return {} as AstNode; }
  parseClassElement(): AstNode { return {} as AstNode; }
  parseClassStaticBlockDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseClassStaticBlockBody(): AstNode { return {} as AstNode; }
  tryParseConstructorDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode | undefined {
    void pos; void jsdoc; void modifiers; return undefined;
  }
  parsePropertyOrMethodDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseMethodDeclaration(
    pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined,
    asteriskToken: AstNode | undefined, name: AstNode, questionToken: AstNode | undefined,
    diagnosticMessage: DiagnosticMessage | undefined,
  ): AstNode {
    void pos; void jsdoc; void modifiers; void asteriskToken; void name; void questionToken; void diagnosticMessage;
    return {} as AstNode;
  }
  parsePropertyDeclaration(
    pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined,
    name: AstNode, questionToken: AstNode | undefined,
  ): AstNode {
    void pos; void jsdoc; void modifiers; void name; void questionToken; return {} as AstNode;
  }
  parseInterfaceDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseTypeAliasDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseEnumMember(): AstNode { return {} as AstNode; }
  parseEnumDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseModuleDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): Statement {
    void pos; void jsdoc; void modifiers; return {} as Statement;
  }
  parseAmbientExternalModuleDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseModuleBlock(): AstNode { return {} as AstNode; }
  parseModuleOrNamespaceDeclaration(
    pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined,
    nested: boolean, keyword: number,
  ): AstNode {
    void pos; void jsdoc; void modifiers; void nested; void keyword; return {} as AstNode;
  }

  // -------------------------------------------------------------------------
  // Import / export declarations
  // -------------------------------------------------------------------------

  parseImportDeclarationOrImportEqualsDeclaration(
    pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined,
  ): Statement {
    void pos; void jsdoc; void modifiers; return {} as Statement;
  }
  parseImportEqualsDeclaration(
    pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined,
    identifier: AstNode, isTypeOnly: boolean,
  ): AstNode {
    void pos; void jsdoc; void modifiers; void identifier; void isTypeOnly; return {} as AstNode;
  }
  parseModuleReference(): AstNode { return {} as AstNode; }
  parseExternalModuleReference(): AstNode { return {} as AstNode; }
  parseModuleSpecifier(): Expression { return {} as Expression; }
  tryParseImportClause(identifier: AstNode | undefined, pos: number, phaseModifier: number, skipJSDoc: boolean): AstNode | undefined {
    void identifier; void pos; void phaseModifier; void skipJSDoc; return undefined;
  }
  parseImportClause(identifier: AstNode | undefined, pos: number, phaseModifier: number, skipJSDoc: boolean): AstNode {
    void identifier; void pos; void phaseModifier; void skipJSDoc; return {} as AstNode;
  }
  parseNamespaceImport(): AstNode { return {} as AstNode; }
  parseNamedImports(): AstNode { return {} as AstNode; }
  parseExportDeclaration(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseExportAssignment(pos: number, jsdoc: JsdocScannerInfo, modifiers: ModifierList | undefined): AstNode {
    void pos; void jsdoc; void modifiers; return {} as AstNode;
  }
  parseNamedExports(): AstNode { return {} as AstNode; }
  parseImportOrExportSpecifier(kind: number): AstNode { void kind; return {} as AstNode; }

  // -------------------------------------------------------------------------
  // Expressions
  // -------------------------------------------------------------------------

  parseExpression(): Expression { return {} as Expression; }
  parseInitializerExpressionLevel(): Expression { return {} as Expression; }
  parseAssignmentExpressionOrHigher(): Expression { return {} as Expression; }
  parseConditionalExpressionRest(leftOperand: Expression, pos: number): Expression {
    void leftOperand; void pos; return {} as Expression;
  }
  parseBinaryExpressionOrHigher(precedence: number): Expression {
    void precedence; return {} as Expression;
  }
  parseBinaryExpressionRest(precedence: number, leftOperand: Expression, pos: number): Expression {
    void precedence; void leftOperand; void pos; return {} as Expression;
  }
  parseUnaryExpressionOrHigher(): Expression { return {} as Expression; }
  parseUpdateExpression(): Expression { return {} as Expression; }
  parseLeftHandSideExpressionOrHigher(): Expression { return {} as Expression; }
  parseMemberExpressionOrHigher(): Expression { return {} as Expression; }
  parseMemberExpressionRest(pos: number, expression: Expression, allowOptionalChain: boolean): Expression {
    void pos; void expression; void allowOptionalChain; return {} as Expression;
  }
  parseCallExpressionRest(pos: number, expression: Expression): Expression {
    void pos; void expression; return {} as Expression;
  }
  parsePrimaryExpression(): Expression { return {} as Expression; }
  parseTemplateExpression(isTaggedTemplate: boolean): Expression { void isTaggedTemplate; return {} as Expression; }
  parseTemplateSpan(isTaggedTemplate: boolean): AstNode { void isTaggedTemplate; return {} as AstNode; }
  parseLiteralLikeNode(kind: number): AstNode { void kind; return {} as AstNode; }
  parseLiteralNode(): AstNode { return {} as AstNode; }
  parseArrowFunctionExpressionBody(isAsync: boolean): AstNode { void isAsync; return {} as AstNode; }
  parseParenthesizedArrowFunctionExpression(allowAmbiguity: boolean): Expression | undefined {
    void allowAmbiguity; return undefined;
  }
  parseObjectLiteralExpression(): Expression { return {} as Expression; }
  parseArrayLiteralExpression(): Expression { return {} as Expression; }
  parseNewExpressionOrNewDotTarget(): Expression { return {} as Expression; }
  parseArgumentList(): NodeList { return {} as NodeList; }
  parseArgumentOrArrayLiteralElement(): AstNode { return {} as AstNode; }
  parseSpreadElement(): AstNode { return {} as AstNode; }
  parseRegularExpressionLiteral(): AstNode { return {} as AstNode; }
  parsePropertyAssignment(): AstNode { return {} as AstNode; }
  parseShorthandPropertyAssignment(): AstNode { return {} as AstNode; }
  parseObjectLiteralElement(): AstNode { return {} as AstNode; }
  parseComputedPropertyName(): AstNode { return {} as AstNode; }
  parseLiteralOfTemplateSpan(): AstNode { return {} as AstNode; }
  parseFunctionExpression(): Expression { return {} as Expression; }
  parseClassExpressionInner(): Expression { return {} as Expression; }
  parseDeleteExpression(): Expression { return {} as Expression; }
  parseTypeOfExpression(): Expression { return {} as Expression; }
  parseVoidExpression(): Expression { return {} as Expression; }
  parseAwaitExpression(): Expression { return {} as Expression; }
  parseYieldExpression(): Expression { return {} as Expression; }
  parseTypeAssertion(): Expression { return {} as Expression; }
  parseAsExpression(left: Expression, allowReturnTypeInArrowFunction: boolean): Expression {
    void left; void allowReturnTypeInArrowFunction; return {} as Expression;
  }
  parseSatisfiesExpression(left: Expression): Expression { void left; return {} as Expression; }
  parseNonNullExpression(left: Expression): Expression { void left; return {} as Expression; }

  // -------------------------------------------------------------------------
  // Types
  // -------------------------------------------------------------------------

  parseType(): TypeNode { return {} as TypeNode; }
  parseTypeWorker(noConditionalTypes: boolean): TypeNode { void noConditionalTypes; return {} as TypeNode; }
  parseTypeOrTypePredicate(): TypeNode { return {} as TypeNode; }
  parseTypePredicatePrefix(): AstNode | undefined { return undefined; }
  parseUnionOrIntersectionType(operator: number, parseConstituentType: () => TypeNode): TypeNode {
    void operator; void parseConstituentType; return {} as TypeNode;
  }
  parseUnionType(): TypeNode { return {} as TypeNode; }
  parseIntersectionType(): TypeNode { return {} as TypeNode; }
  parseTypeOperator(operator: number): TypeNode { void operator; return {} as TypeNode; }
  parsePostfixTypeOrHigher(): TypeNode { return {} as TypeNode; }
  parseNonArrayType(): TypeNode { return {} as TypeNode; }
  parseTypeReference(): TypeNode { return {} as TypeNode; }
  parseTypeArguments(): NodeList | undefined { return undefined; }
  parseTypeParameters(): NodeList | undefined { return undefined; }
  parseTypeParameter(): AstNode { return {} as AstNode; }
  parseTupleType(): TypeNode { return {} as TypeNode; }
  parseRestType(): TypeNode { return {} as TypeNode; }
  parseLiteralType(): TypeNode { return {} as TypeNode; }
  parseTemplateLiteralType(): TypeNode { return {} as TypeNode; }
  parseTypeLiteral(): TypeNode { return {} as TypeNode; }
  parseTypeMember(): AstNode { return {} as AstNode; }
  parseSignatureMember(kind: number): AstNode { void kind; return {} as AstNode; }
  parseIndexSignatureDeclaration(): AstNode { return {} as AstNode; }
  parsePropertyOrMethodSignature(): AstNode { return {} as AstNode; }
  parseMappedType(): TypeNode { return {} as TypeNode; }
  parseConditionalTypeOrHigher(): TypeNode { return {} as TypeNode; }
  parseFunctionOrConstructorType(): TypeNode { return {} as TypeNode; }
  parseImportType(): TypeNode { return {} as TypeNode; }
  parseEntityName(allowReservedWords: boolean, diagnosticMessage: DiagnosticMessage | undefined): EntityName {
    void allowReservedWords; void diagnosticMessage; return {} as EntityName;
  }
  parseRightSideOfDot(allowIdentifierNames: boolean, allowPrivateIdentifiers: boolean): AstNode {
    void allowIdentifierNames; void allowPrivateIdentifiers; return {} as AstNode;
  }
  parseTypeQuery(): TypeNode { return {} as TypeNode; }
  parseParameter(): AstNode { return {} as AstNode; }
  parseParameterList(flags: number): NodeList { void flags; return {} as NodeList; }
  parseReturnType(returnToken: number, isType: boolean): TypeNode | undefined {
    void returnToken; void isType; return undefined;
  }
  parseSignature(): { typeParameters: NodeList | undefined; parameters: NodeList; type: TypeNode | undefined } {
    return { typeParameters: undefined, parameters: {} as NodeList, type: undefined };
  }

  // -------------------------------------------------------------------------
  // JSX
  // -------------------------------------------------------------------------

  parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext: boolean, topInvalidNodePosition?: number): AstNode {
    void inExpressionContext; void topInvalidNodePosition; return {} as AstNode;
  }
  parseJsxOpeningOrSelfClosingElement(inExpressionContext: boolean): AstNode {
    void inExpressionContext; return {} as AstNode;
  }
  parseJsxClosingElement(open: AstNode, inExpressionContext: boolean): AstNode {
    void open; void inExpressionContext; return {} as AstNode;
  }
  parseJsxOpeningFragment(): AstNode { return {} as AstNode; }
  parseJsxClosingFragment(inExpressionContext: boolean): AstNode {
    void inExpressionContext; return {} as AstNode;
  }
  parseJsxAttributes(): AstNode { return {} as AstNode; }
  parseJsxAttribute(): AstNode { return {} as AstNode; }
  parseJsxAttributeValue(): AstNode { return {} as AstNode; }
  parseJsxAttributeName(): AstNode { return {} as AstNode; }
  parseJsxExpression(inExpressionContext: boolean): AstNode { void inExpressionContext; return {} as AstNode; }
  parseJsxText(): AstNode { return {} as AstNode; }
  parseJsxChild(openingTag: AstNode, token: number): AstNode | undefined {
    void openingTag; void token; return undefined;
  }
  parseJsxChildren(openingTag: AstNode): NodeList { void openingTag; return {} as NodeList; }
  parseJsxElementName(): AstNode { return {} as AstNode; }
  parseJsxTagName(): AstNode { return {} as AstNode; }
  parseJsxTagNamePart(): AstNode { return {} as AstNode; }
  parseJsxMemberExpression(): AstNode { return {} as AstNode; }
  parseJsxNamespacedName(left: AstNode): AstNode { void left; return {} as AstNode; }

  // -------------------------------------------------------------------------
  // Modifiers + decorators
  // -------------------------------------------------------------------------

  parseModifiers(allowDecorators: boolean, permitConstAsModifier: boolean, stopOnStartOfClassStaticBlock: boolean): ModifierList | undefined {
    void allowDecorators; void permitConstAsModifier; void stopOnStartOfClassStaticBlock; return undefined;
  }
  parseModifier(allowDecorators: boolean, permitConstAsModifier: boolean): AstNode | undefined {
    void allowDecorators; void permitConstAsModifier; return undefined;
  }
  parseDecorator(): AstNode { return {} as AstNode; }
  parseDecoratorExpression(): Expression { return {} as Expression; }

  // -------------------------------------------------------------------------
  // Identifier
  // -------------------------------------------------------------------------

  parseIdentifier(): IdentifierNode { return {} as IdentifierNode; }
  parseIdentifierWithDiagnostic(diagnosticMessage: DiagnosticMessage | undefined, privateIdentifierDiagnosticMessage: DiagnosticMessage | undefined): IdentifierNode {
    void diagnosticMessage; void privateIdentifierDiagnosticMessage; return {} as IdentifierNode;
  }
  parseIdentifierName(): IdentifierNode { return {} as IdentifierNode; }
  parseBindingIdentifier(): IdentifierNode { return {} as IdentifierNode; }
  parseBindingIdentifierWithDiagnostic(privateIdentifierDiagnosticMessage: DiagnosticMessage | undefined): IdentifierNode {
    void privateIdentifierDiagnosticMessage; return {} as IdentifierNode;
  }
  parsePropertyName(): AstNode { return {} as AstNode; }
  parsePrivateIdentifier(): AstNode { return {} as AstNode; }
  parseStringLiteral(): AstNode { return {} as AstNode; }
}

// ---------------------------------------------------------------------------
// Module-level entry points
// ---------------------------------------------------------------------------

const parserPool: Parser[] = [];

function newParser(): Parser {
  return new Parser();
}

function getParser(): Parser {
  const p = parserPool.pop();
  if (p !== undefined) return p;
  return newParser();
}

function putParser(p: Parser): void {
  parserPool.push(p);
}

export function parseSourceFile(
  opts: SourceFileParseOptions, sourceText: string, scriptKind: number,
): SourceFile {
  const p = getParser();
  try {
    p.initializeState(opts, sourceText, scriptKind);
    return p.parseSourceFileWorker();
  } finally {
    putParser(p);
  }
}

export function parseIsolatedEntityName(text: string): EntityName | undefined {
  void text;
  return undefined;
}

export function isMissingNodeList(list: NodeList | undefined): boolean {
  void list;
  return false;
}

export function getErrorSpanForNode(sourceText: string, node: AstNode): TextRange {
  void sourceText; void node;
  return { pos: 0, end: 0 };
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface SourceFileParseOptions { readonly _opts?: unknown }
interface DiagnosticMessage { code: number; message: string }
interface TextRange { pos: number; end: number }

const ScriptKind = { JS: 1, JSX: 2 } as const;
