import {
  Kind,
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
  createClassExpression,
  createClassStaticBlockDeclaration,
  createComputedPropertyName,
  createConditionalTypeNode,
  createConstructorDeclaration,
  createCallSignatureDeclaration,
  createConstructSignatureDeclaration,
  createConstructorTypeNode,
  createDeleteExpression,
  createDefaultClause,
  createExportAssignment,
  createExportDeclaration,
  createExportSpecifier,
  createExpressionStatement,
  createExpressionWithTypeArguments,
  createBreakStatement,
  createContinueStatement,
  createConditionalExpression,
  createDebuggerStatement,
  createDoStatement,
  createDecorator,
  createElementAccessExpression,
  createEmptyStatement,
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
  createInferTypeNode,
  createIdentifier,
  createIndexSignatureDeclaration,
  createIndexedAccessTypeNode,
  createImportClause,
  createImportDeclaration,
  createImportEqualsDeclaration,
  createImportSpecifier,
  createImportTypeNode,
  createIntersectionTypeNode,
  createInterfaceDeclaration,
  createJSDoc,
  createJSDocParameterTag,
  createJSDocReturnTag,
  createJSDocTemplateTag,
  createJSDocTypeTag,
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
  createExternalModuleReference,
  createKeywordTypeNode,
  createLabeledStatement,
  createCallExpression,
  createKeywordExpression,
  createLiteralTypeNode,
  createMappedTypeNode,
  createMethodDeclaration,
  createMethodSignatureDeclaration,
  createMetaProperty,
  createModuleBlock,
  createModuleDeclaration,
  createNamedExports,
  createNamedImports,
  createNamedTupleMember,
  createNamespaceExportDeclaration,
  createNamespaceImport,
  createNewExpression,
  createOptionalTypeNode,
  createNoSubstitutionTemplateLiteral,
  createNonNullExpression,
  createJSDocNonNullableType,
  createJSDocNullableType,
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
  createRestTypeNode,
  createSatisfiesExpression,
  createSemicolonClassElement,
  createSetAccessorDeclaration,
  createShorthandPropertyAssignment,
  createSpreadElement,
  createSpreadAssignment,
  createSourceFile,
  createStringLiteral,
  createSwitchStatement,
  createTaggedTemplateExpression,
  createTemplateExpression,
  createTemplateHead,
  createTemplateLiteralTypeNode,
  createTemplateLiteralTypeSpan,
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
  createYieldExpression,
  isBinaryOperatorToken,
  isDecorator,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingName,
  type BindingElement,
  type Block,
  type ConciseBody,
  type ClassElement,
  type CaseOrDefaultClause,
  type Expression,
  type ExpressionWithTypeArguments,
  type EntityName,
  type ForInitializer,
  type Identifier,
  type ImportSpecifier,
  type ImportPhaseModifierSyntaxKind,
  type JSDocTag,
  type JsxAttributeLike,
  type JsxAttributeName,
  type JsxAttributeValue,
  type JsxChild,
  type JsxOpeningElement,
  type JsxTagNameExpression,
  type KeywordTypeSyntaxKind,
  type LeftHandSideExpression,
  type ModifierSyntaxKind,
  type ModifierLike,
  type ModuleBody,
  type ModuleExportName,
  type ModuleName,
  type ModuleReference,
  type NamedImportBindings,
  type Node,
  type NodeArray,
  type ObjectLiteralElementLike,
  type ParameterDeclaration,
  type ExclamationToken,
  type PrivateIdentifier,
  type PropertyName,
  type QuestionToken,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeAliasDeclaration,
  type TypeNode,
  type TemplateMiddleOrTail,
  type TemplateLiteral,
  type TemplateLiteralTypeSpan,
  type TypeParameterDeclaration,
  type VariableDeclaration,
} from "../ast/index.js";
import { createDiagnosticAt, type Diagnostic, type DiagnosticCode } from "../diagnostics/index.js";
import { scanAll, type ScannedToken } from "../scanner/index.js";

export interface ParseSourceFileOptions {
  readonly fileName?: string;
  readonly topLevelAwaitContext?: boolean;
}

export class ParseError extends Error {
  readonly token: ScannedToken;

  constructor(message: string, token: ScannedToken) {
    super(`${message} at ${token.pos}`);
    this.name = "ParseError";
    this.token = token;
  }
}

interface SpeculationState {
  readonly index: number;
  readonly diagnosticCount: number;
  readonly tokens: readonly ScannedToken[];
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
  [Kind.AsKeyword, 10],
  [Kind.SatisfiesKeyword, 10],
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
const conditionalPrecedence = 2;

const assignmentOperatorKinds = new Set<Kind>([
  Kind.EqualsToken,
  Kind.PlusEqualsToken,
  Kind.MinusEqualsToken,
  Kind.AsteriskEqualsToken,
  Kind.AsteriskAsteriskEqualsToken,
  Kind.SlashEqualsToken,
  Kind.PercentEqualsToken,
  Kind.AmpersandEqualsToken,
  Kind.BarEqualsToken,
  Kind.CaretEqualsToken,
  Kind.LessThanLessThanEqualsToken,
  Kind.GreaterThanGreaterThanEqualsToken,
  Kind.GreaterThanGreaterThanGreaterThanEqualsToken,
  Kind.AmpersandAmpersandEqualsToken,
  Kind.BarBarEqualsToken,
  Kind.QuestionQuestionEqualsToken,
]);

const modifierKinds = new Set<Kind>([
  Kind.AbstractKeyword,
  Kind.AccessorKeyword,
  Kind.ExportKeyword,
  Kind.DefaultKeyword,
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

export class Parser {
  readonly #sourceText: string;
  readonly #fileName: string;
  readonly #jsxMode: boolean;
  readonly #tokens: readonly ScannedToken[];
  readonly #jsDocByTokenStart: Map<number, readonly Node[]>;
  readonly #diagnostics: Diagnostic[] = [];
  readonly #topLevelAwaitContext: boolean;
  #index = 0;
  #awaitContext = false;
  #awaitContextMarksNodes = false;
  #decoratorContext = false;

  constructor(sourceText: string, options: ParseSourceFileOptions = {}) {
    this.#sourceText = sourceText;
    this.#fileName = options.fileName ?? "input.ts";
    this.#topLevelAwaitContext = options.topLevelAwaitContext === true;
    this.#jsxMode = isJsxFileName(this.#fileName);
    this.#tokens = scanAll(sourceText);
    this.#jsDocByTokenStart = collectJSDocByTokenStart(sourceText, this.#fileName);
    this.#awaitContext = this.#topLevelAwaitContext;
    this.#validateLexicalDiagnostics();
    if (sourceText.includes("\uFFFD")) {
      this.#addDiagnosticAt(0, 0, 1490);
    }
  }

  parseSourceFile(): SourceFile {
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.EndOfFile) {
      try {
        statements.push(this.#parseStatement());
      } catch (error) {
        if (!(error instanceof ParseError)) {
          throw error;
        }
        this.#addDiagnosticForUnexpectedToken(error.token);
        this.#advance();
      }
    }
    const sourceFile = createSourceFile(
      this.#fileName,
      this.#fileName as never,
      this.#sourceText,
      createNodeArray(statements),
      createToken(Kind.EndOfFile),
    );
    if (!this.#topLevelAwaitContext && sourceFileHasExternalModuleSyntax(sourceFile) && this.#tokens.some(token => token.kind === Kind.AwaitKeyword)) {
      const reparsed = new Parser(this.#sourceText, { fileName: this.#fileName, topLevelAwaitContext: true }).parseSourceFileWithDiagnostics();
      this.#diagnostics.splice(0, this.#diagnostics.length, ...reparsed.diagnostics);
      return reparsed.sourceFile;
    }
    return sourceFile;
  }

  parseSourceFileWithDiagnostics(): ParseResult {
    const sourceFile = this.parseSourceFile();
    return { sourceFile, diagnostics: [...this.#diagnostics] };
  }

  #parseStatement(): Statement {
    const modifiers = this.#parseModifiers({ allowDecorators: true });
    if (this.#current().kind === Kind.ConstKeyword && this.#tokens[this.#index + 1]?.kind === Kind.EnumKeyword) {
      const constModifier = createToken(this.#advance().kind as ModifierSyntaxKind) as ModifierLike;
      const enumModifiers = createNodeArray([...(modifiers ?? []), constModifier]);
      return this.#parseEnumDeclaration(enumModifiers);
    }
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.DefaultKeyword) {
      this.#advance();
      const defaultModifiers = createNodeArray([...modifiers, createToken(Kind.DefaultKeyword) as ModifierLike]);
      if (this.#current().kind === Kind.FunctionKeyword) {
        return this.#parseFunctionDeclaration(defaultModifiers);
      }
      if (this.#current().kind === Kind.ClassKeyword) {
        return this.#parseClassDeclaration(defaultModifiers);
      }
      if (this.#current().kind === Kind.InterfaceKeyword) {
        return this.#parseInterfaceDeclaration(defaultModifiers);
      }
      const expression = this.#parseCommaExpression();
      this.#consumeOptional(Kind.SemicolonToken);
      return createExportAssignment(defaultModifiers, false, undefined as never, expression);
    }
    switch (this.#current().kind) {
      case Kind.ImportKeyword:
        if (this.#isImportDeclarationStart()) {
          return this.#parseImportDeclaration(modifiers);
        }
        break;
      case Kind.SemicolonToken:
        this.#advance();
        return createEmptyStatement();
      case Kind.ClassKeyword:
        return this.#parseClassDeclaration(modifiers);
      case Kind.InterfaceKeyword:
        return this.#parseInterfaceDeclaration(modifiers);
      case Kind.ModuleKeyword:
      case Kind.NamespaceKeyword:
      case Kind.GlobalKeyword:
        if (this.#isModuleDeclarationStart()) {
          return this.#parseModuleDeclaration(modifiers);
        }
        break;
      case Kind.TypeKeyword:
        if (this.#isTypeAliasDeclarationStart()) {
          return this.#parseTypeAliasDeclaration(modifiers);
        }
        break;
      case Kind.EnumKeyword:
        return this.#parseEnumDeclaration(modifiers);
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
      case Kind.DebuggerKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on debugger statements", this.#current());
        }
        return this.#parseDebuggerStatement();
      case Kind.VarKeyword:
      case Kind.ConstKeyword:
        return this.#parseVariableStatement(modifiers);
      case Kind.LetKeyword:
        if (this.#isLetDeclaration()) {
          return this.#parseVariableStatement(modifiers);
        }
        break;
      case Kind.FunctionKeyword:
        return this.#parseFunctionDeclaration(modifiers);
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
      case Kind.WithKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on with statements", this.#current());
        }
        return this.#parseWithStatement();
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
          return this.#parseExportDeclaration(modifiers);
        }
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on blocks", this.#current());
        }
        return this.#parseBlock();
    }
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.AsteriskToken) {
      return this.#parseExportDeclaration(modifiers);
    }
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.AsKeyword) {
      return this.#parseExportDeclaration(modifiers);
    }
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.EqualsToken) {
      return this.#parseExportAssignment(modifiers);
    }
    if (modifiers !== undefined) {
      throw new ParseError("Modifiers are not valid on expression statements", this.#current());
    }
    if (this.#current().kind === Kind.Identifier && this.#tokens[this.#index + 1]?.kind === Kind.ColonToken) {
      return this.#parseLabeledStatement();
    }
    const expression = this.#parseCommaExpression();
    this.#consumeStatementTerminator(expression);
    return createExpressionStatement(expression);
  }

  #isTypeAliasDeclarationStart(): boolean {
    return this.#current().kind === Kind.TypeKeyword && isIdentifierNameKind(this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown);
  }

  #isLetDeclaration(): boolean {
    const nextKind = this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown;
    return nextKind === Kind.OpenBraceToken
      || nextKind === Kind.OpenBracketToken
      || isBindingIdentifierKind(nextKind);
  }

  #parseImportDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    this.#expect(Kind.ImportKeyword);
    if (this.#isImportEqualsDeclarationRestStart()) {
      const isTypeOnly = this.#consumeOptional(Kind.TypeKeyword);
      const name = this.#parseIdentifier();
      this.#expect(Kind.EqualsToken);
      const moduleReference = this.#parseModuleReference();
      this.#consumeOptional(Kind.SemicolonToken);
      return createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference);
    }
    let importClause: ReturnType<typeof createImportClause> | undefined;
    let moduleSpecifier: Expression;
    if (this.#current().kind === Kind.StringLiteral) {
      moduleSpecifier = this.#parseStringLiteralExpression();
    } else {
      importClause = this.#parseImportClause();
      this.#expect(Kind.FromKeyword);
      moduleSpecifier = this.#parseStringLiteralExpression();
    }
    this.#consumeOptional(Kind.SemicolonToken);
    return createImportDeclaration(modifiers, importClause, moduleSpecifier, undefined);
  }

  #isImportEqualsDeclarationRestStart(): boolean {
    const offset = this.#current().kind === Kind.TypeKeyword ? 1 : 0;
    return isIdentifierNameKind(this.#tokens[this.#index + offset]?.kind ?? Kind.Unknown)
      && this.#tokens[this.#index + offset + 1]?.kind === Kind.EqualsToken;
  }

  #isImportDeclarationStart(): boolean {
    const nextKind = this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown;
    return nextKind === Kind.DeferKeyword
      || nextKind === Kind.StringLiteral
      || nextKind === Kind.AsteriskToken
      || nextKind === Kind.OpenBraceToken
      || isIdentifierNameKind(nextKind);
  }

  #parseModuleReference(): ModuleReference {
    if (isIdentifierNameKind(this.#current().kind) && this.#current().text === "require" && this.#tokens[this.#index + 1]?.kind === Kind.OpenParenToken) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      const expression = this.#parseStringLiteralExpression();
      this.#expect(Kind.CloseParenToken);
      return createExternalModuleReference(expression);
    }
    return this.#parseEntityName(false);
  }

  #parseImportClause(): ReturnType<typeof createImportClause> {
    const phaseModifier = this.#current().kind === Kind.TypeKeyword || this.#current().kind === Kind.DeferKeyword
      ? this.#advance().kind as ImportPhaseModifierSyntaxKind
      : undefined;
    let name: Identifier | undefined;
    let namedBindings: NamedImportBindings | undefined;
    if (isIdentifierNameKind(this.#current().kind)) {
      name = this.#parseIdentifier();
      if (this.#consumeOptional(Kind.CommaToken)) {
        namedBindings = this.#parseNamedImportBindings();
      }
    } else {
      namedBindings = this.#parseNamedImportBindings();
    }
    return createImportClause(phaseModifier, name, namedBindings);
  }

  #parseNamedImportBindings(): NamedImportBindings {
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      this.#expect(Kind.AsKeyword);
      return createNamespaceImport(this.#parseIdentifier());
    }
    this.#expect(Kind.OpenBraceToken);
    const elements: ImportSpecifier[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken) {
      const isTypeOnly = this.#consumeOptional(Kind.TypeKeyword);
      const firstName = this.#parseModuleExportName();
      const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
      const name = propertyName === undefined ? firstName : this.#parseIdentifier();
      elements.push(createImportSpecifier(isTypeOnly, propertyName, name as Identifier));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return createNamedImports(createNodeArray(elements));
  }

  #parseExportDeclaration(modifiers: NodeArray<ModifierLike>): Statement {
    if (this.#consumeOptional(Kind.AsKeyword)) {
      this.#expect(Kind.NamespaceKeyword);
      const name = this.#parseIdentifier();
      this.#consumeOptional(Kind.SemicolonToken);
      return createNamespaceExportDeclaration(modifiers, name);
    }
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createExportDeclaration(modifiers, false, undefined, moduleSpecifier, undefined);
    }
    this.#expect(Kind.OpenBraceToken);
    const elements: ReturnType<typeof createExportSpecifier>[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken) {
      const firstName = this.#parseModuleExportName();
      const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
      const name = propertyName === undefined ? firstName : this.#parseModuleExportName();
      elements.push(createExportSpecifier(false, propertyName, name));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return createExportDeclaration(modifiers, false, createNamedExports(createNodeArray(elements)), moduleSpecifier, undefined);
  }

  #parseExportAssignment(modifiers: NodeArray<ModifierLike>): Statement {
    this.#expect(Kind.EqualsToken);
    const expression = this.#parseCommaExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createExportAssignment(modifiers, true, undefined as never, expression);
  }

  #parseModifiers(options: { readonly allowDecorators?: boolean; readonly stopOnStartOfClassStaticBlock?: boolean } = {}): NodeArray<ModifierLike> | undefined {
    const modifiers: ModifierLike[] = [];
    while (true) {
      if (options.allowDecorators === true && this.#current().kind === Kind.AtToken) {
        modifiers.push(this.#parseDecorator());
        continue;
      }
      if (!this.#isModifierAtCurrentPosition(options)) {
        break;
      }
      modifiers.push(createToken(this.#current().kind as ModifierSyntaxKind) as ModifierLike);
      this.#advance();
    }
    return modifiers.length === 0 ? undefined : createNodeArray(modifiers);
  }

  #parseDecorator(): ModifierLike {
    this.#expect(Kind.AtToken);
    const expression = this.#withDecoratorContext(() => this.#parseLeftHandSideExpression());
    return createDecorator(expression as LeftHandSideExpression);
  }

  #isModifierAtCurrentPosition(options: { readonly stopOnStartOfClassStaticBlock?: boolean } = {}): boolean {
    if (!modifierKinds.has(this.#current().kind)) {
      return false;
    }
    if (this.#current().kind === Kind.DefaultKeyword) {
      return this.#canDefaultKeywordBeModifier();
    }
    const nextKind = this.#tokens[this.#index + 1]?.kind;
    if (options.stopOnStartOfClassStaticBlock === true && this.#current().kind === Kind.StaticKeyword && nextKind === Kind.OpenBraceToken) {
      return false;
    }
    if (this.#current().kind === Kind.ExportKeyword && nextKind === Kind.EqualsToken) {
      return true;
    }
    if ((this.#current().kind === Kind.AbstractKeyword
      || this.#current().kind === Kind.PrivateKeyword
      || this.#current().kind === Kind.ProtectedKeyword
      || this.#current().kind === Kind.PublicKeyword)
      && this.#tokens[this.#index + 1] !== undefined
      && this.#hasLineBreakBetween(this.#current(), this.#tokens[this.#index + 1]!)) {
      return false;
    }
    return nextKind !== Kind.QuestionToken
      && nextKind !== Kind.ColonToken
      && nextKind !== Kind.DotToken
      && nextKind !== Kind.OpenParenToken
      && nextKind !== Kind.SemicolonToken
      && nextKind !== Kind.CommaToken
      && nextKind !== Kind.CloseParenToken
      && nextKind !== Kind.CloseBraceToken
      && !assignmentOperatorKinds.has(nextKind ?? Kind.Unknown);
  }

  #canDefaultKeywordBeModifier(): boolean {
    const nextKind = this.#tokens[this.#index + 1]?.kind;
    if (nextKind === Kind.ClassKeyword || nextKind === Kind.FunctionKeyword || nextKind === Kind.InterfaceKeyword || nextKind === Kind.AtToken) {
      return true;
    }
    if (nextKind === Kind.AbstractKeyword && this.#tokens[this.#index + 2]?.kind === Kind.ClassKeyword) {
      return true;
    }
    return nextKind === Kind.AsyncKeyword && this.#tokens[this.#index + 2]?.kind === Kind.FunctionKeyword;
  }

  #hasLineBreakBetween(left: ScannedToken, right: ScannedToken): boolean {
    return /[\r\n\u2028\u2029]/.test(this.#sourceText.slice(left.end, right.pos));
  }

  #parseClassDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    this.#expect(Kind.ClassKeyword);
    const name = this.#isClassNameStart() ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    const members: ClassElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      members.push(this.#parseClassElement());
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#withJSDoc(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, createNodeArray(members)), jsDoc);
  }

  #parseModuleDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    const keywordToken = this.#current();
    const keyword = keywordToken.kind === Kind.NamespaceKeyword ? Kind.NamespaceKeyword : Kind.ModuleKeyword;
    const names: ModuleName[] = [];
    if (keywordToken.kind === Kind.GlobalKeyword) {
      this.#advance();
      names.push(createIdentifier("global"));
    } else {
      this.#advance();
      if (this.#current().kind === Kind.OpenBraceToken) {
        this.#addDiagnosticAtToken(this.#current(), 1437);
        names.push(createIdentifier(""));
      } else if (this.#current().kind === Kind.StringLiteral) {
        names.push(this.#parseStringLiteralExpression() as ModuleName);
      } else {
        names.push(this.#parseIdentifier());
        while (this.#consumeOptional(Kind.DotToken)) {
          names.push(this.#parseIdentifier());
        }
      }
    }
    this.#expect(Kind.OpenBraceToken);
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    this.#expect(Kind.CloseBraceToken);
    this.#consumeOptional(Kind.SemicolonToken);
    let body: ModuleBody = createModuleBlock(createNodeArray(statements));
    for (let index = names.length - 1; index > 0; index -= 1) {
      body = createModuleDeclaration(undefined, keyword, names[index]!, body);
    }
    return createModuleDeclaration(modifiers, keyword, names[0]!, body);
  }

  #isModuleDeclarationStart(): boolean {
    const current = this.#current();
    const next = this.#tokens[this.#index + 1];
    if (next === undefined || this.#hasLineBreakBetween(current, next)) {
      return false;
    }
    if (current.kind === Kind.GlobalKeyword) {
      return next.kind === Kind.OpenBraceToken || next.kind === Kind.ExportKeyword || isIdentifierNameKind(next.kind);
    }
    return next.kind === Kind.OpenBraceToken || next.kind === Kind.StringLiteral || isIdentifierNameKind(next.kind);
  }

  #parseInterfaceDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
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
    return createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, createNodeArray(members));
  }

  #parseTypeAliasDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    this.#expect(Kind.TypeKeyword);
    const name = this.#parseIdentifier();
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.EqualsToken);
    const type = this.#parseType();
    this.#consumeOptional(Kind.SemicolonToken);
    return createTypeAliasDeclaration(modifiers, name, typeParameters, type);
  }

  #parseEnumDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    this.#expect(Kind.EnumKeyword);
    const name = this.#parseIdentifier();
    this.#expect(Kind.OpenBraceToken);
    const members = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.CommaToken)) {
        continue;
      }
      const memberName = this.#parsePropertyName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      members.push(createEnumMember(memberName, initializer));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return createEnumDeclaration(modifiers, name, createNodeArray(members));
  }

  #parseIfStatement(): Statement {
    this.#expect(Kind.IfKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    const thenStatement = this.#parseStatement();
    const elseStatement = this.#consumeOptional(Kind.ElseKeyword) ? this.#parseStatement() : undefined;
    return createIfStatement(expression, thenStatement, elseStatement);
  }

  #parseWhileStatement(): Statement {
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    return createWhileStatement(expression, this.#parseStatement());
  }

  #parseDoStatement(): Statement {
    this.#expect(Kind.DoKeyword);
    const statement = this.#parseStatement();
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    this.#consumeOptional(Kind.SemicolonToken);
    return createDoStatement(statement, expression);
  }

  #parseForStatement(): Statement {
    this.#expect(Kind.ForKeyword);
    const awaitModifier = this.#consumeOptional(Kind.AwaitKeyword) ? createToken(Kind.AwaitKeyword) : undefined;
    this.#expect(Kind.OpenParenToken);
    const initializer = this.#parseForInitializer();
    if (initializer !== undefined && (this.#current().kind === Kind.InKeyword || this.#current().kind === Kind.OfKeyword)) {
      const token = this.#current().kind;
      this.#advance();
      const expression = this.#parseCommaExpression();
      this.#expect(Kind.CloseParenToken);
      const statement = this.#parseStatement();
      return token === Kind.InKeyword
        ? createForInStatement(undefined, initializer, expression, statement)
        : createForOfStatement(awaitModifier, initializer, expression, statement);
    }
    this.#expect(Kind.SemicolonToken);
    const condition = this.#current().kind === Kind.SemicolonToken ? undefined : this.#parseCommaExpression();
    this.#expect(Kind.SemicolonToken);
    const incrementor = this.#current().kind === Kind.CloseParenToken ? undefined : this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    return createForStatement(initializer, condition, incrementor, this.#parseStatement());
  }

  #parseForInitializer(): ForInitializer | undefined {
    if (this.#current().kind === Kind.SemicolonToken) {
      return undefined;
    }
    if (this.#current().kind === Kind.VarKeyword || this.#current().kind === Kind.ConstKeyword || this.#current().kind === Kind.LetKeyword && this.#isLetDeclaration()) {
      return this.#parseVariableDeclarationList();
    }
    return this.#parseCommaExpression(true);
  }

  #parseBreakStatement(): Statement {
    this.#expect(Kind.BreakKeyword);
    const label = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return createBreakStatement(label);
  }

  #parseContinueStatement(): Statement {
    this.#expect(Kind.ContinueKeyword);
    const label = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return createContinueStatement(label);
  }

  #parseDebuggerStatement(): Statement {
    this.#expect(Kind.DebuggerKeyword);
    this.#consumeOptional(Kind.SemicolonToken);
    return createDebuggerStatement();
  }

  #parseWithStatement(): Statement {
    this.#expect(Kind.WithKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    return createWithStatement(expression, this.#parseStatement());
  }

  #parseLabeledStatement(): Statement {
    const label = this.#parseIdentifier();
    this.#expect(Kind.ColonToken);
    return createLabeledStatement(label, this.#parseStatement());
  }

  #parseClassElement(): ClassElement {
    if (this.#consumeOptional(Kind.SemicolonToken)) {
      return createSemicolonClassElement();
    }
    let modifiers = this.#parseModifiers({ allowDecorators: true, stopOnStartOfClassStaticBlock: true });
    const nextToken = this.#tokens[this.#index + 1];
    if (this.#current().kind === Kind.ConstKeyword && nextToken !== undefined && isIdentifierNameKind(nextToken.kind) && !this.#hasLineBreakBetween(this.#current(), nextToken)) {
      modifiers = createNodeArray([...(modifiers ?? []), createToken(this.#advance().kind as ModifierSyntaxKind) as ModifierLike]);
    }
    if (this.#current().kind === Kind.StaticKeyword && nextToken?.kind === Kind.OpenBraceToken) {
      this.#advance();
      return createClassStaticBlockDeclaration(modifiers, this.#withAwaitContext(true, () => this.#parseBlock()));
    }
    if (this.#current().kind === Kind.VarKeyword || this.#current().kind === Kind.LetKeyword) {
      return this.#parseInvalidClassVariableElement(modifiers);
    }
    if (this.#isIndexSignatureStart()) {
      return this.#parseIndexSignature(modifiers);
    }
    if (this.#current().kind === Kind.ConstructorKeyword) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withAwaitContext(false, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(false, () => this.#parseBlock()) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createConstructorDeclaration(modifiers, undefined, createNodeArray(parameters), undefined, body);
    }

    if (this.#isAccessorDeclarationStart(Kind.GetKeyword)) {
      this.#advance();
      const name = this.#parsePropertyName();
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withAwaitContext(false, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(false, () => this.#parseBlock()) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createGetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body);
    }

    if (this.#isAccessorDeclarationStart(Kind.SetKeyword)) {
      this.#advance();
      const name = this.#parsePropertyName();
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withAwaitContext(false, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(false, () => this.#parseBlock()) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createSetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body);
    }

    const name = this.#parsePropertyName();
    const postfixToken = this.#parseOptionalPostfixToken();
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      const isAsync = modifierListHas(modifiers, Kind.AsyncKeyword);
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#withAwaitContext(isAsync, () => this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(isAsync, () => this.#parseBlock()) : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createMethodDeclaration(modifiers, undefined, name, postfixToken, typeParameters, createNodeArray(parameters), type, body);
    }

    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#withAwaitContext(false, () => this.#parseExpression()) : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return createPropertyDeclaration(modifiers, name, postfixToken, type, initializer);
  }

  #parseTypeElement(): TypeElement {
    const modifiers = this.#parseModifiers();
    if (this.#isIndexSignatureStart()) {
      return this.#parseIndexSignature(modifiers);
    }
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      this.#consumeOptional(Kind.SemicolonToken);
      this.#consumeOptional(Kind.CommaToken);
      return createCallSignatureDeclaration(typeParameters, createNodeArray(parameters), type);
    }
    if (this.#current().kind === Kind.NewKeyword) {
      this.#advance();
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      this.#consumeOptional(Kind.SemicolonToken);
      this.#consumeOptional(Kind.CommaToken);
      return createConstructSignatureDeclaration(typeParameters, createNodeArray(parameters), type);
    }
    if (this.#isAccessorDeclarationStart(Kind.GetKeyword)) {
      this.#advance();
      const name = this.#parsePropertyName();
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      this.#consumeOptional(Kind.CommaToken);
      return createGetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body);
    }
    if (this.#isAccessorDeclarationStart(Kind.SetKeyword)) {
      this.#advance();
      const name = this.#parsePropertyName();
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      this.#consumeOptional(Kind.CommaToken);
      return createSetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body);
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
      return createMethodSignatureDeclaration(modifiers, name, postfixToken, typeParameters, createNodeArray(parameters), type);
    }
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    return createPropertySignatureDeclaration(modifiers, name, postfixToken, type as never, undefined as never);
  }

  #isIndexSignatureStart(): boolean {
    const name = this.#tokens[this.#index + 1];
    if (this.#current().kind !== Kind.OpenBracketToken || name === undefined) {
      return false;
    }
    if (name.kind === Kind.CloseBracketToken || name.kind === Kind.DotDotDotToken) {
      return true;
    }
    if (!isIdentifierNameKind(name.kind)) {
      return false;
    }
    const next = this.#tokens[this.#index + 2];
    if (next?.kind === Kind.ColonToken || next?.kind === Kind.CommaToken) {
      return true;
    }
    return next?.kind === Kind.QuestionToken && this.#tokens[this.#index + 3]?.kind === Kind.ColonToken;
  }

  #parseIndexSignature(modifiers: NodeArray<ModifierLike> | undefined): ReturnType<typeof createIndexSignatureDeclaration> {
    const openBracket = this.#expect(Kind.OpenBracketToken);
    const parameters: ParameterDeclaration[] = [];
    if (this.#current().kind !== Kind.CloseBracketToken) {
      while (true) {
        parameters.push(this.#parseParameterDeclaration());
        if (!this.#consumeOptional(Kind.CommaToken) || this.#current().kind === Kind.CloseBracketToken) {
          break;
        }
      }
    }
    this.#expect(Kind.CloseBracketToken);
    const hasTypeAnnotation = this.#consumeOptional(Kind.ColonToken);
    if (!hasTypeAnnotation && this.#shouldReportMissingIndexSignatureType(parameters)) {
      this.#addDiagnosticAtToken(openBracket, 1021);
    }
    const type = hasTypeAnnotation ? this.#parseType() : createKeywordTypeNode(Kind.AnyKeyword);
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    return createIndexSignatureDeclaration(
      modifiers,
      createNodeArray(parameters),
      type,
    );
  }

  #shouldReportMissingIndexSignatureType(parameters: readonly ParameterDeclaration[]): boolean {
    if (parameters.length !== 1) {
      return false;
    }
    const parameter = parameters[0]!;
    if (parameter.dotDotDotToken !== undefined || parameter.questionToken !== undefined) {
      return false;
    }
    return parameter.type?.kind === Kind.StringKeyword
      || parameter.type?.kind === Kind.NumberKeyword
      || parameter.type?.kind === Kind.SymbolKeyword
      || parameter.type?.kind === Kind.TemplateLiteralType;
  }

  #parseOptionalTypeParameters(): NodeArray<TypeParameterDeclaration> | undefined {
    if (!this.#consumeOptional(Kind.LessThanToken)) {
      return undefined;
    }
    const typeParameters: TypeParameterDeclaration[] = [];
    do {
      const modifiers = this.#parseTypeParameterModifiers();
      const name = this.#parseIdentifier();
      const constraint = this.#consumeOptional(Kind.ExtendsKeyword) ? this.#parseType() : undefined;
      const defaultType = this.#consumeOptional(Kind.EqualsToken) ? this.#parseType() : undefined;
      typeParameters.push(createTypeParameterDeclaration(modifiers, name, constraint, undefined, defaultType));
      if (!this.#consumeOptional(Kind.CommaToken)) {
        break;
      }
    } while (this.#current().kind !== Kind.GreaterThanToken);
    this.#parseExpectedGreaterThan();
    return createNodeArray(typeParameters);
  }

  #parseTypeParameterModifiers(): NodeArray<ModifierLike> | undefined {
    const modifiers: ModifierLike[] = [];
    while (this.#current().kind === Kind.ConstKeyword || this.#current().kind === Kind.InKeyword || this.#isOutTypeParameterModifier()) {
      modifiers.push(createToken(this.#advance().kind as ModifierSyntaxKind) as ModifierLike);
    }
    return modifiers.length === 0 ? undefined : createNodeArray(modifiers);
  }

  #isOutTypeParameterModifier(): boolean {
    if (this.#current().kind !== Kind.OutKeyword) {
      return false;
    }
    const nextKind = this.#tokens[this.#index + 1]?.kind;
    return nextKind !== Kind.CommaToken
      && nextKind !== Kind.EqualsToken
      && nextKind !== Kind.GreaterThanToken
      && nextKind !== undefined;
  }

  #parseHeritageClauses(): NodeArray<ReturnType<typeof createHeritageClause>> | undefined {
    const clauses: ReturnType<typeof createHeritageClause>[] = [];
    while (this.#current().kind === Kind.ExtendsKeyword || this.#current().kind === Kind.ImplementsKeyword) {
      const token = this.#current().kind as Kind.ExtendsKeyword | Kind.ImplementsKeyword;
      this.#advance();
      const types: ExpressionWithTypeArguments[] = [];
      do {
        types.push(this.#parseExpressionWithTypeArguments());
        if (!this.#consumeOptional(Kind.CommaToken)) {
          break;
        }
        if (this.#currentTokenEndsHeritageTypeList()) {
          this.#addDiagnosticAtToken(this.#tokens[this.#index - 1]!, 1009);
          break;
        }
      } while (true);
      clauses.push(createHeritageClause(token, createNodeArray(types)));
    }
    return clauses.length === 0 ? undefined : createNodeArray(clauses);
  }

  #currentTokenEndsHeritageTypeList(): boolean {
    return this.#current().kind === Kind.OpenBraceToken
      || this.#current().kind === Kind.ExtendsKeyword
      || this.#current().kind === Kind.ImplementsKeyword
      || this.#current().kind === Kind.EndOfFile;
  }

  #parseExpressionWithTypeArguments(): ExpressionWithTypeArguments {
    const expression = this.#parseLeftHandSideExpression();
    if (expression.kind === Kind.ExpressionWithTypeArguments) {
      return expression;
    }
    const typeArguments = this.#parseOptionalTypeArguments();
    return createExpressionWithTypeArguments(expression, typeArguments);
  }

  #parseHeritageExpression(): Expression {
    let expression: Expression = this.#parseIdentifier();
    while (this.#consumeOptional(Kind.DotToken)) {
      expression = createPropertyAccessExpression(expression, undefined, this.#parseIdentifier(), NodeFlags.None);
    }
    return expression;
  }

  #parseOptionalTypeArguments(): NodeArray<TypeNode> | undefined {
    if (!this.#consumeOptional(Kind.LessThanToken)) {
      return undefined;
    }
    const typeArguments: TypeNode[] = [];
    if (this.#currentTokenEndsTypeArgumentList()) {
      this.#addDiagnosticAtToken(this.#current(), 1099);
      this.#expectGreaterThan();
      return createNodeArray(typeArguments);
    }
    while (this.#current().kind !== Kind.EndOfFile) {
      if (this.#current().kind === Kind.CommaToken) {
        this.#addDiagnosticAtToken(this.#current(), 1110);
        typeArguments.push(this.#parseMissingType());
        this.#advance();
        continue;
      }
      typeArguments.push(this.#parseType());
      if (!this.#consumeOptional(Kind.CommaToken)) {
        break;
      }
      if (this.#currentTokenEndsTypeArgumentList()) {
        this.#addDiagnosticAtToken(this.#tokens[this.#index - 1]!, 1009);
        break;
      }
    }
    this.#expectGreaterThan();
    return createNodeArray(typeArguments);
  }

  #parseMissingType(): TypeNode {
    return createTypeReferenceNode(createIdentifier(""), undefined);
  }

  #currentTokenEndsTypeArgumentList(): boolean {
    return this.#current().kind === Kind.GreaterThanToken
      || this.#current().kind === Kind.GreaterThanGreaterThanToken
      || this.#current().kind === Kind.GreaterThanGreaterThanGreaterThanToken;
  }

  #parseVariableStatement(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    const declarationList = this.#parseVariableDeclarationList();
    if (jsDoc !== undefined) {
      this.#attachJSDocToFirstDeclaration(declarationList.declarations, jsDoc);
    }
    if (this.#recoverVariableStatementTerminator()) {
      return createVariableStatement(modifiers, declarationList);
    }
    this.#consumeOptional(Kind.SemicolonToken);
    return createVariableStatement(modifiers, declarationList);
  }

  #parseVariableDeclarationList(): ReturnType<typeof createVariableDeclarationList> {
    const flags = this.#parseVariableDeclarationListFlags();
    const declarations: VariableDeclaration[] = [];
    while (true) {
      declarations.push(this.#parseVariableDeclaration());
      if (this.#consumeOptional(Kind.CommaToken)) {
        continue;
      }
      if (this.#current().kind === Kind.ColonToken && this.#isBindingNameStart(this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown)) {
        this.#advance();
        this.#addDiagnosticAtToken(this.#current(), 1005, ",");
        continue;
      }
      if (this.#isBindingNameStart(this.#current().kind) && !this.#lineBreakBeforeCurrentToken()) {
        this.#addDiagnosticAtToken(this.#current(), 1005, ",");
        continue;
      }
      break;
    }
    return createVariableDeclarationList(createNodeArray(declarations), flags);
  }

  #recoverVariableStatementTerminator(): boolean {
    if (this.#current().kind === Kind.CloseParenToken && this.#tokens[this.#index + 1]?.kind === Kind.EqualsGreaterThanToken) {
      this.#advance();
    }
    if (this.#current().kind !== Kind.EqualsGreaterThanToken) {
      return false;
    }
    this.#addDiagnosticAtToken(this.#current(), 1005, ";");
    while (this.#current().kind !== Kind.SemicolonToken
      && this.#current().kind !== Kind.CloseBraceToken
      && this.#current().kind !== Kind.EndOfFile) {
      this.#advance();
    }
    this.#consumeOptional(Kind.SemicolonToken);
    return true;
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
    const name = this.#parseBindingName();
    const exclamationToken = this.#consumeOptional(Kind.ExclamationToken) ? createToken(Kind.ExclamationToken) : undefined;
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return createVariableDeclaration(name, exclamationToken, type, initializer);
  }

  #parseFunctionDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    const isAsync = modifierListHas(modifiers, Kind.AsyncKeyword);
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#withAwaitContext(isAsync, () => this.#parseParameterList());
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(isAsync, () => this.#parseBlock()) : undefined;
    if (body === undefined) {
      this.#consumeOptional(Kind.SemicolonToken);
    }
    return this.#withJSDoc(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body), jsDoc);
  }

  #parseParameterList(): ParameterDeclaration[] {
    const parameters: ParameterDeclaration[] = [];
    if (this.#current().kind === Kind.CloseParenToken) {
      return parameters;
    }
    while (true) {
      const parameter = this.#parseParameterDeclaration();
      parameters.push(parameter);
      if (this.#current().kind === Kind.CloseParenToken || this.#current().kind === Kind.EndOfFile) {
        break;
      }
      if (this.#consumeOptional(Kind.CommaToken)) {
        if (this.#current().kind === Kind.CloseParenToken) {
          break;
        }
        continue;
      }
      (parameter as { flags: number }).flags |= NodeFlags.ThisNodeHasError | NodeFlags.ThisNodeOrAnySubNodesHasError;
      this.#addDiagnosticAtToken(this.#current(), 1005, ",");
      if (!this.#isStartOfParameter(false)) {
        break;
      }
    }
    return parameters;
  }

  #parseParameterDeclaration(): ParameterDeclaration {
    const modifiers = this.#parseModifiers({ allowDecorators: true });
    const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
    const name = this.#parseBindingName();
    const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) : undefined;
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer);
  }

  #parseBlock(): Block {
    const openBrace = this.#expect(Kind.OpenBraceToken);
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    const multiLine = this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n");
    return createBlock(createNodeArray(statements), multiLine);
  }

  #parseReturnStatement(): Statement {
    this.#expect(Kind.ReturnKeyword);
    const expression = this.#current().kind === Kind.SemicolonToken
      || this.#current().kind === Kind.CloseBraceToken
      || this.#current().kind === Kind.EndOfFile
      || this.#lineBreakBeforeCurrentToken()
      ? undefined
      : this.#parseCommaExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createReturnStatement(expression);
  }

  #parseThrowStatement(): Statement {
    this.#expect(Kind.ThrowKeyword);
    const expression = this.#parseCommaExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createThrowStatement(expression);
  }

  #parseTryStatement(): Statement {
    this.#expect(Kind.TryKeyword);
    const tryBlock = this.#parseBlock();
    const catchClause = this.#current().kind === Kind.CatchKeyword ? this.#parseCatchClause() : undefined;
    const finallyBlock = this.#consumeOptional(Kind.FinallyKeyword) ? this.#parseBlock() : undefined;
    if (catchClause === undefined && finallyBlock === undefined) {
      throw new ParseError("Expected catch or finally clause", this.#current());
    }
    return createTryStatement(tryBlock, catchClause, finallyBlock);
  }

  #parseCatchClause(): ReturnType<typeof createCatchClause> {
    this.#expect(Kind.CatchKeyword);
    let variableDeclaration: VariableDeclaration | undefined;
    if (this.#consumeOptional(Kind.OpenParenToken)) {
      const name = this.#parseBindingName();
      const type = this.#parseOptionalTypeAnnotation();
      let initializer: Expression | undefined;
      if (this.#consumeOptional(Kind.EqualsToken)) {
        this.#addDiagnosticAtToken(this.#current(), 1197);
        initializer = this.#parseExpression();
      }
      variableDeclaration = createVariableDeclaration(name, undefined, type, initializer);
      this.#expect(Kind.CloseParenToken);
    }
    return createCatchClause(variableDeclaration, this.#parseBlock());
  }

  #parseSwitchStatement(): Statement {
    this.#expect(Kind.SwitchKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseCommaExpression();
    this.#expect(Kind.CloseParenToken);
    this.#expect(Kind.OpenBraceToken);
    const clauses: CaseOrDefaultClause[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.CaseKeyword)) {
        const caseExpression = this.#parseCommaExpression();
        this.#expect(Kind.ColonToken);
        clauses.push(createCaseClause(caseExpression, createNodeArray(this.#parseCaseClauseStatements())));
        continue;
      }
      if (this.#consumeOptional(Kind.DefaultKeyword)) {
        this.#expect(Kind.ColonToken);
        clauses.push(createDefaultClause(undefined as never, createNodeArray(this.#parseCaseClauseStatements())));
        continue;
      }
      throw new ParseError("Expected case or default clause", this.#current());
    }
    this.#expect(Kind.CloseBraceToken);
    return createSwitchStatement(expression, createCaseBlock(createNodeArray(clauses)));
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

  #parseExpression(precedence = 0, stopAtInKeyword = false, allowArrowFunction = true): Expression {
    if (allowArrowFunction && this.#isArrowFunctionStart()) {
      return this.#parseArrowFunction();
    }
    let left = this.#parseUnaryExpression();
    while (true) {
      const operatorToken = this.#current();
      if (stopAtInKeyword && operatorToken.kind === Kind.InKeyword) {
        break;
      }
      const operatorPrecedence = binaryPrecedence.get(operatorToken.kind) ?? 0;
      if (operatorPrecedence <= precedence) {
        break;
      }
      if (operatorToken.kind === Kind.AsKeyword || operatorToken.kind === Kind.SatisfiesKeyword) {
        if (this.#lineBreakBeforeCurrentToken()) {
          break;
        }
        this.#advance();
        const type = this.#parseType();
        left = operatorToken.kind === Kind.AsKeyword ? createAsExpression(left, type) : createSatisfiesExpression(left, type);
        continue;
      }
      this.#advance();
      const rightPrecedence = isRightAssociativeBinaryOperator(operatorToken.kind) ? operatorPrecedence - 1 : operatorPrecedence;
      const right = this.#parseExpression(rightPrecedence, stopAtInKeyword, assignmentOperatorKinds.has(operatorToken.kind));
      const token = createToken(operatorToken.kind as BinaryOperator);
      if (!isBinaryOperatorToken(token)) {
        throw new ParseError("Expected binary operator", operatorToken);
      }
      left = createBinaryExpression(undefined, left, undefined, token as BinaryOperatorToken, right);
    }
    if (precedence <= conditionalPrecedence && this.#consumeOptional(Kind.QuestionToken)) {
      const whenTrue = this.#parseExpression();
      this.#expect(Kind.ColonToken);
      const whenFalse = this.#parseExpression();
      left = createConditionalExpression(left, createToken(Kind.QuestionToken), whenTrue, createToken(Kind.ColonToken), whenFalse);
    }
    return left;
  }

  #parseCommaExpression(stopAtInKeyword = false, allowArrowFunction = true): Expression {
    let left = this.#parseExpression(0, stopAtInKeyword, allowArrowFunction);
    while (this.#current().kind === Kind.CommaToken) {
      const commaToken = createToken(this.#advance().kind as BinaryOperator);
      if (!isBinaryOperatorToken(commaToken)) {
        throw new ParseError("Expected comma operator", this.#current());
      }
      const right = this.#parseExpression(0, stopAtInKeyword, allowArrowFunction);
      left = createBinaryExpression(undefined, left, undefined, commaToken as BinaryOperatorToken, right);
    }
    return left;
  }

  #isArrowFunctionStart(): boolean {
    if (this.#current().kind === Kind.AsyncKeyword) {
      return this.#isAsyncArrowFunctionStart();
    }
    if (this.#current().kind === Kind.LessThanToken) {
      return this.#isGenericArrowFunctionStart();
    }
    if (isIdentifierNameKind(this.#current().kind) && this.#tokens[this.#index + 1]?.kind === Kind.EqualsGreaterThanToken) {
      return true;
    }
    if (this.#current().kind !== Kind.OpenParenToken) {
      return false;
    }
    const parenthesizedState = this.#parenthesizedArrowStartState();
    if (parenthesizedState === "true") {
      return true;
    }
    if (parenthesizedState === "false") {
      return false;
    }
    const parenthesized = this.#tryParseParenthesizedArrowHead();
    return parenthesized ?? false;
  }

  #parenthesizedArrowStartState(): "true" | "false" | "unknown" {
    const second = this.#tokens[this.#index + 1]?.kind;
    if (second === Kind.CloseParenToken) {
      const third = this.#tokens[this.#index + 2]?.kind;
      return third === Kind.EqualsGreaterThanToken || third === Kind.ColonToken || third === Kind.OpenBraceToken
        ? "true"
        : "false";
    }
    if (second === Kind.OpenBracketToken || second === Kind.OpenBraceToken) {
      return this.#matchingParenCanContinueArrow() ? "unknown" : "false";
    }
    if (second === Kind.DotDotDotToken) {
      return "true";
    }
    const third = this.#tokens[this.#index + 2]?.kind;
    if (second !== undefined && modifierKinds.has(second) && second !== Kind.AsyncKeyword && isIdentifierNameKind(third ?? Kind.Unknown)) {
      return third === Kind.AsKeyword ? "false" : "true";
    }
    if (!isIdentifierNameKind(second ?? Kind.Unknown) && second !== Kind.ThisKeyword) {
      return "false";
    }
    if (third === Kind.ColonToken) {
      return "true";
    }
    if (third === Kind.QuestionToken) {
      const fourth = this.#tokens[this.#index + 3]?.kind;
      return fourth === Kind.ColonToken || fourth === Kind.CommaToken || fourth === Kind.EqualsToken || fourth === Kind.CloseParenToken
        ? "true"
        : "false";
    }
    if (third === Kind.CommaToken || third === Kind.EqualsToken || third === Kind.CloseParenToken) {
      return this.#matchingParenCanContinueArrow() ? "unknown" : "false";
    }
    return "false";
  }

  #matchingParenCanContinueArrow(): boolean {
    const closeParenIndex = this.#findMatchingParenIndex(this.#index);
    if (closeParenIndex === undefined) {
      return false;
    }
    const nextKind = this.#tokens[closeParenIndex + 1]?.kind;
    if (nextKind === Kind.EqualsGreaterThanToken || nextKind === Kind.OpenBraceToken) {
      return true;
    }
    if (nextKind !== Kind.ColonToken) {
      return false;
    }
    return this.#hasEqualsGreaterThanBeforeStatementBoundary(closeParenIndex + 2);
  }

  #findMatchingParenIndex(openParenIndex: number): number | undefined {
    let depth = 0;
    for (let index = openParenIndex; index < this.#tokens.length; index += 1) {
      const kind = this.#tokens[index]!.kind;
      if (kind === Kind.OpenParenToken) {
        depth += 1;
      } else if (kind === Kind.CloseParenToken) {
        depth -= 1;
        if (depth === 0) {
          return index;
        }
      } else if (kind === Kind.EndOfFile) {
        return undefined;
      }
    }
    return undefined;
  }

  #tryParseParenthesizedArrowHead(): boolean | undefined {
    const state = this.#beginSpeculation();
    try {
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const hasTypedParameter = parameters.some(parameter => parameter.type !== undefined
        || parameter.questionToken !== undefined
        || parameter.dotDotDotToken !== undefined
        || parameter.modifiers !== undefined);
      const hasReturnType = this.#current().kind === Kind.ColonToken;
      this.#parseOptionalTypeAnnotation();
      const nextKind = this.#current().kind;
      this.#rewindSpeculation(state);
      return nextKind === Kind.EqualsGreaterThanToken
        || nextKind === Kind.OpenBraceToken
        || hasReturnType
        || hasTypedParameter;
    } catch {
      this.#rewindSpeculation(state);
      return undefined;
    }
  }

  #isAsyncArrowFunctionStart(): boolean {
    const next = this.#tokens[this.#index + 1];
    if (next === undefined || this.#hasLineBreakBetween(this.#current(), next)) {
      return false;
    }
    if (isIdentifierNameKind(next.kind) && this.#tokens[this.#index + 2]?.kind === Kind.EqualsGreaterThanToken) {
      return true;
    }
    const startIndex = this.#index;
    this.#index += 1;
    const isArrow = this.#isArrowFunctionStart();
    this.#index = startIndex;
    return isArrow;
  }

  #isGenericArrowFunctionStart(): boolean {
    const state = this.#beginSpeculation();
    try {
      const typeParameters = this.#parseOptionalTypeParameters();
      if (typeParameters === undefined) {
        this.#rewindSpeculation(state);
        return false;
      }
      this.#expect(Kind.OpenParenToken);
      this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      this.#parseOptionalTypeAnnotation();
      const isArrow = this.#current().kind === Kind.EqualsGreaterThanToken;
      this.#rewindSpeculation(state);
      return isArrow;
    } catch {
      this.#rewindSpeculation(state);
      return false;
    }
  }

  #hasEqualsGreaterThanBeforeStatementBoundary(startIndex: number): boolean {
    for (let index = startIndex; index < this.#tokens.length; index += 1) {
      const kind = this.#tokens[index]!.kind;
      if (kind === Kind.EqualsGreaterThanToken) {
        return true;
      }
      if (kind === Kind.SemicolonToken || kind === Kind.OpenBraceToken || kind === Kind.CloseBraceToken || kind === Kind.EndOfFile) {
        return false;
      }
    }
    return false;
  }

  #parseArrowFunction(): Expression {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    const modifiers = this.#consumeOptional(Kind.AsyncKeyword)
      ? createNodeArray([createToken(Kind.AsyncKeyword) as ModifierLike])
      : undefined;
    const isAsync = modifierListHas(modifiers, Kind.AsyncKeyword);
    const parameters: ParameterDeclaration[] = [];
    const typeParameters = this.#parseOptionalTypeParameters();
    let type: TypeNode | undefined;
    this.#withAwaitContext(isAsync, () => {
      if (typeParameters === undefined && isIdentifierNameKind(this.#current().kind)) {
        parameters.push(createParameterDeclaration(undefined, undefined, this.#parseIdentifier(), undefined, undefined, undefined));
      } else {
        this.#expect(Kind.OpenParenToken);
        parameters.push(...this.#parseParameterList());
        this.#expect(Kind.CloseParenToken);
        type = this.#parseOptionalTypeAnnotation();
      }
    });
    const hadArrow = this.#parseExpectedArrowToken();
    const body = hadArrow || this.#current().kind === Kind.OpenBraceToken
      ? this.#withAwaitContext(isAsync, () => this.#parseArrowBody())
      : createIdentifier("");
    return this.#withJSDoc(createArrowFunction(modifiers, typeParameters, createNodeArray(parameters), type, createToken(Kind.EqualsGreaterThanToken), body), jsDoc);
  }

  #parseExpectedArrowToken(): boolean {
    if (this.#current().kind !== Kind.EqualsGreaterThanToken) {
      this.#addDiagnosticAtToken(this.#current(), 1005, "=>");
      return false;
    }
    if (this.#lineBreakBeforeCurrentToken()) {
      this.#addDiagnosticAtToken(this.#current(), 1200);
    }
    this.#advance();
    return true;
  }

  #parseArrowBody(): ConciseBody {
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseBlock();
    }
    if (this.#isStartOfNonExpressionStatement(this.#current().kind)) {
      this.#addDiagnosticAtToken(this.#current(), 1005, "{");
      const statement = this.#parseStatement();
      this.#consumeOptional(Kind.CloseBraceToken);
      return createBlock(createNodeArray([statement]), true);
    }
    if (this.#current().kind === Kind.SemicolonToken || this.#current().kind === Kind.CloseBraceToken || this.#current().kind === Kind.EndOfFile) {
      this.#addDiagnosticAtToken(this.#current(), 1109);
      if (this.#current().kind === Kind.CloseBraceToken && this.#tokens[this.#index + 1]?.kind === Kind.SemicolonToken) {
        this.#advance();
      }
      return createIdentifier("");
    }
    return this.#parseExpression();
  }

  #isStartOfNonExpressionStatement(kind: Kind): boolean {
    return kind === Kind.VarKeyword
      || kind === Kind.LetKeyword
      || kind === Kind.ConstKeyword
      || kind === Kind.IfKeyword
      || kind === Kind.WhileKeyword
      || kind === Kind.DoKeyword
      || kind === Kind.ForKeyword
      || kind === Kind.BreakKeyword
      || kind === Kind.ContinueKeyword
      || kind === Kind.DebuggerKeyword
      || kind === Kind.ReturnKeyword
      || kind === Kind.ThrowKeyword
      || kind === Kind.WithKeyword
      || kind === Kind.TryKeyword
      || kind === Kind.SwitchKeyword;
  }

  #parseUnaryExpression(): Expression {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    const token = this.#current();
    let expression: Expression;
    switch (token.kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
      case Kind.PlusPlusToken:
      case Kind.MinusMinusToken:
        this.#advance();
        expression = createPrefixUnaryExpression(token.kind, this.#parseUnaryExpression());
        break;
      case Kind.NewKeyword:
        expression = this.#parseNewExpression();
        break;
      case Kind.DeleteKeyword:
        this.#advance();
        expression = createDeleteExpression(this.#parseUnaryExpression());
        break;
      case Kind.TypeOfKeyword:
        this.#advance();
        expression = createTypeOfExpression(this.#parseUnaryExpression());
        break;
      case Kind.VoidKeyword:
        this.#advance();
        expression = createVoidExpression(this.#parseUnaryExpression());
        break;
      case Kind.AwaitKeyword:
        if (!this.#isAwaitExpressionStart()) {
          expression = this.#parsePostfixExpression();
          break;
        }
        this.#advance();
        expression = this.#withCurrentAwaitContextFlag(createAwaitExpression(this.#parseUnaryExpression()));
        break;
      case Kind.YieldKeyword:
        expression = this.#parseYieldExpression();
        break;
      case Kind.LessThanToken:
        expression = this.#jsxMode && this.#nextTokenStartsJsxElement()
          ? this.#parseJsxElementOrSelfClosingElementOrFragment()
          : this.#parseTypeAssertionExpression();
        break;
      default:
        expression = this.#parsePostfixExpression();
        break;
    }
    return this.#withJSDoc(expression, jsDoc);
  }

  #parseTypeAssertionExpression(): Expression {
    this.#expect(Kind.LessThanToken);
    const type = this.#parseType();
    this.#expectGreaterThan();
    return createTypeAssertion(type, this.#parseUnaryExpression());
  }

  #parseYieldExpression(): Expression {
    const yieldToken = this.#expect(Kind.YieldKeyword);
    const next = this.#current();
    if (this.#hasLineBreakBetween(yieldToken, next) || (!this.#isStartOfExpression(next.kind) && next.kind !== Kind.AsteriskToken)) {
      return createYieldExpression(undefined, undefined);
    }
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    return createYieldExpression(asteriskToken, this.#parseExpression());
  }

  #isStartOfExpression(kind: Kind): boolean {
    return kind === Kind.OpenParenToken
      || kind === Kind.OpenBracketToken
      || kind === Kind.OpenBraceToken
      || kind === Kind.LessThanToken
      || kind === Kind.FunctionKeyword
      || kind === Kind.ClassKeyword
      || kind === Kind.NewKeyword
      || kind === Kind.DeleteKeyword
      || kind === Kind.TypeOfKeyword
      || kind === Kind.VoidKeyword
      || kind === Kind.AwaitKeyword
      || kind === Kind.YieldKeyword
      || kind === Kind.ThisKeyword
      || kind === Kind.SuperKeyword
      || kind === Kind.NullKeyword
      || kind === Kind.TrueKeyword
      || kind === Kind.FalseKeyword
      || kind === Kind.StringLiteral
      || kind === Kind.NumericLiteral
      || kind === Kind.BigIntLiteral
      || kind === Kind.RegularExpressionLiteral
      || kind === Kind.NoSubstitutionTemplateLiteral
      || kind === Kind.TemplateHead
      || kind === Kind.PrivateIdentifier
      || kind === Kind.PlusToken
      || kind === Kind.MinusToken
      || kind === Kind.TildeToken
      || kind === Kind.ExclamationToken
      || kind === Kind.PlusPlusToken
      || kind === Kind.MinusMinusToken
      || isIdentifierNameKind(kind);
  }

  #parsePostfixExpression(): Expression {
    const expression = this.#parseLeftHandSideExpression();
    if (!this.#lineBreakBeforeCurrentToken() && (this.#current().kind === Kind.PlusPlusToken || this.#current().kind === Kind.MinusMinusToken)) {
      const operator = this.#current().kind as Kind.PlusPlusToken | Kind.MinusMinusToken;
      this.#advance();
      return createPostfixUnaryExpression(expression, operator);
    }
    return expression;
  }

  #parseNewExpression(): Expression {
    this.#expect(Kind.NewKeyword);
    const expression = this.#parseNewTargetExpression();
    const typeArguments = this.#parseOptionalTypeArguments();
    let arguments_: NodeArray<Expression> | undefined;
    if (this.#consumeOptional(Kind.OpenParenToken)) {
      arguments_ = createNodeArray(this.#parseArgumentList());
      this.#expect(Kind.CloseParenToken);
    }
    return this.#parseMemberSuffixes(createNewExpression(expression, typeArguments, arguments_));
  }

  #parseNewTargetExpression(): Expression {
    let expression = this.#current().kind === Kind.ClassKeyword ? this.#parseClassExpression() : this.#parsePrimaryExpression();
    while (true) {
      if (this.#consumeOptional(Kind.DotToken)) {
        expression = createPropertyAccessExpression(expression, undefined, this.#parseMemberName(), NodeFlags.None);
        continue;
      }
      if (this.#consumeOptional(Kind.OpenBracketToken)) {
        expression = createElementAccessExpression(expression, undefined, this.#parseElementAccessArgument(), NodeFlags.None);
        this.#expect(Kind.CloseBracketToken);
        continue;
      }
      if (this.#consumeOptional(Kind.ExclamationToken)) {
        expression = createNonNullExpression(expression, NodeFlags.None);
        continue;
      }
      return expression;
    }
  }

  #parseLeftHandSideExpression(): Expression {
    return this.#parseMemberSuffixes(this.#parsePrimaryExpression());
  }

  #parseMemberSuffixes(initialExpression: Expression): Expression {
    let expression = initialExpression;
    while (true) {
      const questionDotToken = this.#consumeOptional(Kind.QuestionDotToken) ? createToken(Kind.QuestionDotToken) : undefined;
      if (questionDotToken !== undefined && this.#current().kind !== Kind.OpenParenToken && this.#current().kind !== Kind.OpenBracketToken && !isTemplateLiteralStart(this.#current().kind)) {
        expression = createPropertyAccessExpression(expression, questionDotToken, this.#parseMemberName(), NodeFlags.None);
        continue;
      }
      if (questionDotToken === undefined && this.#consumeOptional(Kind.DotToken)) {
        if (expression.kind === Kind.ExpressionWithTypeArguments) {
          this.#addDiagnosticAtToken(this.#tokens[this.#index - 1]!, 1477);
        }
        expression = createPropertyAccessExpression(expression, undefined, this.#parseMemberName(), NodeFlags.None);
        continue;
      }
      const typeArguments = this.#tryParseTypeArgumentsInExpression();
      if (isTemplateLiteralStart(this.#current().kind)) {
        expression = createTaggedTemplateExpression(expression, questionDotToken as never, typeArguments, this.#parseTemplateLiteral(), NodeFlags.None);
        continue;
      }
      if (questionDotToken !== undefined && this.#current().kind === Kind.OpenParenToken || typeArguments !== undefined && this.#current().kind === Kind.OpenParenToken) {
        this.#expect(Kind.OpenParenToken);
        expression = createCallExpression(expression, questionDotToken, typeArguments, createNodeArray(this.#parseArgumentList()), NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        continue;
      }
      if (this.#consumeOptional(Kind.OpenParenToken)) {
        expression = createCallExpression(expression, undefined, undefined, createNodeArray(this.#parseArgumentList()), NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        continue;
      }
      if (typeArguments !== undefined) {
        expression = createExpressionWithTypeArguments(expression, typeArguments);
        continue;
      }
      if (questionDotToken !== undefined && this.#current().kind === Kind.OpenBracketToken || questionDotToken === undefined && !this.#decoratorContext && this.#consumeOptional(Kind.OpenBracketToken)) {
        if (questionDotToken !== undefined) {
          this.#expect(Kind.OpenBracketToken);
        }
        expression = createElementAccessExpression(expression, questionDotToken, this.#parseElementAccessArgument(), NodeFlags.None);
        this.#expect(Kind.CloseBracketToken);
        continue;
      }
      if (questionDotToken !== undefined) {
        throw new ParseError("Expected optional chain member", this.#current());
      }
      if (this.#consumeOptional(Kind.ExclamationToken)) {
        expression = createNonNullExpression(expression, NodeFlags.None);
        continue;
      }
      return expression;
    }
  }

  #parseElementAccessArgument(): Expression {
    if (this.#current().kind === Kind.CloseBracketToken) {
      this.#addDiagnosticAtToken(this.#current(), 1011);
      return createIdentifier("");
    }
    return this.#parseCommaExpression();
  }

  #tryParseTypeArgumentsInExpression(): NodeArray<TypeNode> | undefined {
    if (this.#current().kind !== Kind.LessThanToken) {
      return undefined;
    }
    const state = this.#beginSpeculation();
    try {
      const typeArguments = this.#parseOptionalTypeArguments();
      if (typeArguments !== undefined && this.#canFollowTypeArgumentsInExpression()) {
        return typeArguments;
      }
    } catch {
    }
    this.#rewindSpeculation(state);
    return undefined;
  }

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
      default:
        return this.#lineBreakBeforeCurrentToken()
          || binaryPrecedence.has(this.#current().kind)
          || !this.#isStartOfExpression(this.#current().kind);
    }
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
    if (this.#consumeOptional(Kind.DotDotDotToken)) {
      return createSpreadElement(this.#parseExpression());
    }
    return this.#parseExpression();
  }

  #parsePrimaryExpression(): Expression {
    const token = this.#current();
    switch (token.kind) {
      case Kind.OpenBracketToken:
        return this.#parseArrayLiteralExpression();
      case Kind.OpenBraceToken:
        return this.#parseObjectLiteralExpression();
      case Kind.Identifier:
        this.#advance();
        return createIdentifier(token.text);
      case Kind.PrivateIdentifier:
        this.#advance();
        return createPrivateIdentifier(token.text);
      case Kind.FalseKeyword:
      case Kind.ImportKeyword:
      case Kind.NullKeyword:
      case Kind.SuperKeyword:
      case Kind.ThisKeyword:
      case Kind.TrueKeyword:
        this.#advance();
        if (token.kind === Kind.ImportKeyword && this.#consumeOptional(Kind.DotToken)) {
          return createMetaProperty(Kind.ImportKeyword, this.#parseIdentifier());
        }
        return createKeywordExpression(token.kind as Kind.FalseKeyword | Kind.ImportKeyword | Kind.NullKeyword | Kind.SuperKeyword | Kind.ThisKeyword | Kind.TrueKeyword);
      case Kind.NumericLiteral:
        this.#advance();
        return createNumericLiteral(token.text, 0);
      case Kind.BigIntLiteral:
        this.#advance();
        return createBigIntLiteral(token.text, 0);
      case Kind.RegularExpressionLiteral:
        this.#advance();
        return createRegularExpressionLiteral(token.text, 0);
      case Kind.StringLiteral:
        this.#advance();
        return createStringLiteral(unquote(token.text), 0);
      case Kind.NoSubstitutionTemplateLiteral:
      case Kind.TemplateHead:
        return this.#parseTemplateLiteral();
      case Kind.FunctionKeyword:
        return this.#parseFunctionExpression();
      case Kind.AsyncKeyword:
        if (this.#nextTokenIsFunctionKeywordOnSameLine()) {
          return this.#parseFunctionExpression();
        }
        this.#advance();
        return createIdentifier(token.text);
      case Kind.ClassKeyword:
        return this.#parseClassExpression();
      case Kind.AtToken:
        return this.#parseDecoratedExpression();
      case Kind.OpenParenToken: {
        this.#advance();
        const expression = this.#current().kind === Kind.CloseParenToken
          ? this.#parseMissingExpression()
          : this.#parseCommaExpression();
        this.#parseExpectedCloseParen();
        return createParenthesizedExpression(expression);
      }
      case Kind.LessThanToken:
        if (this.#jsxMode && this.#nextTokenStartsJsxElement()) {
          return this.#parseJsxElementOrSelfClosingElementOrFragment();
        }
        throw new ParseError(`Unexpected token ${Kind[token.kind]}`, token);
      default:
        if (isContextualExpressionIdentifierKind(token.kind)) {
          this.#advance();
          return createIdentifier(token.text);
        }
        if (binaryPrecedence.has(token.kind)) {
          this.#addDiagnosticAtToken(token, 1109);
          return createIdentifier("");
        }
        throw new ParseError(`Unexpected token ${Kind[token.kind]}`, token);
    }
  }

  #nextTokenStartsJsxElement(): boolean {
    const nextKind = this.#tokens[this.#index + 1]?.kind;
    return nextKind === Kind.GreaterThanToken || isIdentifierNameKind(nextKind ?? Kind.Unknown);
  }

  #parseJsxElementOrSelfClosingElementOrFragment(): Expression {
    this.#expect(Kind.LessThanToken);
    if (this.#current().kind === Kind.GreaterThanToken) {
      this.#advance();
      const openingFragment = createJsxOpeningFragment();
      const children = this.#parseJsxChildren();
      const closingFragment = this.#parseJsxClosingFragment();
      return createJsxFragment(openingFragment, createNodeArray(children), closingFragment);
    }

    const tagName = this.#parseJsxElementName();
    const typeArguments = this.#parseOptionalTypeArguments();
    const attributes = createJsxAttributes(createNodeArray(this.#parseJsxAttributes()));
    if (this.#consumeOptional(Kind.GreaterThanToken)) {
      const openingElement = createJsxOpeningElement(tagName, typeArguments, attributes);
      const children = this.#parseJsxChildren();
      const closingElement = this.#parseJsxClosingElement(openingElement);
      return createJsxElement(openingElement, createNodeArray(children), closingElement);
    }

    this.#expect(Kind.SlashToken);
    this.#expect(Kind.GreaterThanToken);
    return createJsxSelfClosingElement(tagName, typeArguments, attributes);
  }

  #parseJsxChildren(): JsxChild[] {
    const children: JsxChild[] = [];
    while (this.#current().kind !== Kind.EndOfFile && !this.#isJsxClosingStart()) {
      if (this.#current().kind === Kind.LessThanToken && this.#nextTokenStartsJsxElement()) {
        children.push(this.#parseJsxElementOrSelfClosingElementOrFragment() as JsxChild);
        continue;
      }
      if (this.#current().kind === Kind.OpenBraceToken) {
        children.push(this.#parseJsxExpression(false));
        continue;
      }
      const text = this.#parseJsxText();
      if (text !== undefined) {
        children.push(text);
        continue;
      }
      break;
    }
    return children;
  }

  #parseJsxText(): JsxChild | undefined {
    if (this.#current().kind === Kind.EndOfFile || this.#current().kind === Kind.LessThanToken || this.#isJsxClosingStart() || this.#current().kind === Kind.OpenBraceToken) {
      return undefined;
    }
    const start = this.#current().pos;
    let end = this.#current().end;
    while (this.#current().kind !== Kind.EndOfFile && this.#current().kind !== Kind.LessThanToken && !this.#isJsxClosingStart() && this.#current().kind !== Kind.OpenBraceToken) {
      end = this.#advance().end;
    }
    const text = this.#sourceText.slice(start, end);
    return createJsxText(text, /^[\s]*$/u.test(text));
  }

  #parseJsxExpression(inAttributeInitializer: boolean): ReturnType<typeof createJsxExpression> {
    this.#expect(Kind.OpenBraceToken);
    const dotDotDotToken = !inAttributeInitializer && this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
    const expression = this.#current().kind === Kind.CloseBraceToken ? undefined : this.#parseExpression();
    if (inAttributeInitializer && expression === undefined) {
      this.#addDiagnosticAtToken(this.#current(), 17000);
    }
    this.#expect(Kind.CloseBraceToken);
    return createJsxExpression(dotDotDotToken, expression);
  }

  #parseJsxClosingElement(openingElement: JsxOpeningElement): ReturnType<typeof createJsxClosingElement> {
    if (!this.#consumeJsxClosingStart()) {
      this.#addDiagnosticAtToken(openingElement.tagName, 17008, jsxTagNameText(openingElement.tagName));
      return createJsxClosingElement(openingElement.tagName);
    }
    const tagName = this.#parseJsxElementName();
    this.#expect(Kind.GreaterThanToken);
    if (jsxTagNameText(tagName) !== jsxTagNameText(openingElement.tagName)) {
      this.#addDiagnosticAtToken(tagName, 17008, jsxTagNameText(openingElement.tagName));
    }
    return createJsxClosingElement(tagName);
  }

  #parseJsxClosingFragment(): ReturnType<typeof createJsxClosingFragment> {
    this.#expectJsxClosingStart();
    this.#expect(Kind.GreaterThanToken);
    return createJsxClosingFragment();
  }

  #isJsxClosingStart(): boolean {
    return this.#current().kind === Kind.LessThanSlashToken
      || (this.#current().kind === Kind.LessThanToken && this.#tokens[this.#index + 1]?.kind === Kind.SlashToken);
  }

  #consumeJsxClosingStart(): boolean {
    if (this.#current().kind === Kind.LessThanSlashToken) {
      this.#advance();
      return true;
    }
    if (this.#current().kind === Kind.LessThanToken && this.#tokens[this.#index + 1]?.kind === Kind.SlashToken) {
      this.#advance();
      this.#advance();
      return true;
    }
    return false;
  }

  #expectJsxClosingStart(): void {
    if (!this.#consumeJsxClosingStart()) {
      this.#expect(Kind.LessThanToken);
      this.#expect(Kind.SlashToken);
    }
  }

  #parseJsxElementName(): JsxTagNameExpression {
    const initialExpression = this.#parseJsxTagName();
    if (initialExpression.kind === Kind.JsxNamespacedName) {
      return initialExpression;
    }
    let expression = initialExpression;
    while (this.#consumeOptional(Kind.DotToken)) {
      expression = createPropertyAccessExpression(expression, undefined, this.#parseJsxIdentifier(), NodeFlags.None);
    }
    return expression as JsxTagNameExpression;
  }

  #parseJsxTagName(): JsxTagNameExpression {
    const isThis = this.#current().kind === Kind.ThisKeyword;
    const tagName = this.#parseJsxIdentifier();
    if (this.#consumeOptional(Kind.ColonToken)) {
      return createJsxNamespacedName(tagName, this.#parseJsxIdentifier());
    }
    return isThis ? createKeywordExpression(Kind.ThisKeyword) : tagName;
  }

  #parseJsxAttributes(): JsxAttributeLike[] {
    const attributes: JsxAttributeLike[] = [];
    while (this.#current().kind !== Kind.GreaterThanToken && this.#current().kind !== Kind.SlashToken && this.#current().kind !== Kind.EndOfFile) {
      attributes.push(this.#parseJsxAttribute());
    }
    return attributes;
  }

  #parseJsxAttribute(): JsxAttributeLike {
    if (this.#current().kind === Kind.OpenBraceToken) {
      this.#advance();
      this.#expect(Kind.DotDotDotToken);
      const expression = this.#parseExpression();
      this.#expect(Kind.CloseBraceToken);
      return createJsxSpreadAttribute(expression);
    }
    const name = this.#parseJsxAttributeName();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseJsxAttributeValue() : undefined;
    return createJsxAttribute(name, initializer);
  }

  #parseJsxAttributeName(): JsxAttributeName {
    const name = this.#parseJsxIdentifier();
    if (this.#consumeOptional(Kind.ColonToken)) {
      return createJsxNamespacedName(name, this.#parseJsxIdentifier());
    }
    return name;
  }

  #parseJsxIdentifier(): Identifier {
    let text = this.#parseIdentifier().text;
    while (this.#current().kind === Kind.MinusToken && isIdentifierNameKind(this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown)) {
      text += this.#advance().text;
      text += this.#parseIdentifier().text;
    }
    return createIdentifier(text);
  }

  #parseJsxAttributeValue(): JsxAttributeValue | undefined {
    if (this.#current().kind === Kind.StringLiteral) {
      return this.#parseStringLiteralExpression() as JsxAttributeValue;
    }
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseJsxExpression(true);
    }
    if (this.#current().kind === Kind.LessThanToken && this.#nextTokenStartsJsxElement()) {
      return this.#parseJsxElementOrSelfClosingElementOrFragment() as JsxAttributeValue;
    }
    this.#addDiagnosticAtToken(this.#current(), 17000);
    return undefined;
  }

  #parseExpectedCloseParen(): ScannedToken {
    const token = this.#current();
    if (token.kind === Kind.CloseParenToken) {
      this.#advance();
      return token;
    }
    this.#addDiagnosticAtToken(token, 1005, ")");
    return { kind: Kind.CloseParenToken, pos: token.pos, end: token.pos, text: ")" };
  }

  #parseMissingExpression(): Expression {
    this.#addDiagnosticAtToken(this.#current(), 1109);
    return createIdentifier("");
  }

  #parseDecoratedExpression(): Expression {
    const modifiers = this.#parseModifiers({ allowDecorators: true });
    if (this.#current().kind === Kind.ClassKeyword) {
      return this.#parseClassExpression(modifiers);
    }
    this.#addDiagnosticAtToken(this.#current(), 1109);
    return createIdentifier("");
  }

  #parseFunctionExpression(): Expression {
    const modifiers = this.#parseModifiers();
    const isAsync = modifierListHas(modifiers, Kind.AsyncKeyword);
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#withAwaitContext(isAsync, () => this.#parseParameterList());
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#withAwaitContext(isAsync, () => this.#parseBlock());
    return createFunctionExpression(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body);
  }

  #nextTokenIsFunctionKeywordOnSameLine(): boolean {
    const next = this.#tokens[this.#index + 1];
    return next !== undefined && next.kind === Kind.FunctionKeyword && !this.#hasLineBreakBetween(this.#current(), next);
  }

  #parseClassExpression(modifiers: NodeArray<ModifierLike> | undefined = undefined): Expression {
    const jsDoc = this.#consumeJSDocBeforeCurrentToken();
    this.#expect(Kind.ClassKeyword);
    const name = this.#isClassNameStart() ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    const heritageClauses = this.#parseHeritageClauses();
    this.#expect(Kind.OpenBraceToken);
    const members: ClassElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      members.push(this.#parseClassElement());
    }
    this.#expect(Kind.CloseBraceToken);
    return this.#withJSDoc(createClassExpression(modifiers, name, typeParameters, heritageClauses, createNodeArray(members)), jsDoc);
  }

  #withAwaitContext<T>(awaitContext: boolean, callback: () => T): T {
    const previousAwaitContext = this.#awaitContext;
    const previousAwaitContextMarksNodes = this.#awaitContextMarksNodes;
    this.#awaitContext = awaitContext;
    this.#awaitContextMarksNodes = awaitContext;
    try {
      return callback();
    } finally {
      this.#awaitContext = previousAwaitContext;
      this.#awaitContextMarksNodes = previousAwaitContextMarksNodes;
    }
  }

  #withCurrentAwaitContextFlag<TNode extends Node>(node: TNode): TNode {
    if (this.#awaitContextMarksNodes) {
      (node as { flags: number }).flags |= NodeFlags.AwaitContext;
    }
    return node;
  }

  #withDecoratorContext<T>(callback: () => T): T {
    const previousDecoratorContext = this.#decoratorContext;
    this.#decoratorContext = true;
    try {
      return callback();
    } finally {
      this.#decoratorContext = previousDecoratorContext;
    }
  }

  #isAwaitExpressionStart(): boolean {
    if (this.#current().kind !== Kind.AwaitKeyword) {
      return false;
    }
    if (this.#awaitContext) {
      return true;
    }
    const next = this.#tokens[this.#index + 1];
    return next !== undefined
      && !this.#hasLineBreakBetween(this.#current(), next)
      && isIdentifierOrKeywordOrLiteralKind(next.kind);
  }

  #isClassNameStart(): boolean {
    const kind = this.#current().kind;
    return isIdentifierNameKind(kind)
      && kind !== Kind.ExtendsKeyword
      && kind !== Kind.ImplementsKeyword
      && kind !== Kind.OpenBraceToken;
  }

  #parseTemplateExpression(): Expression {
    const headToken = this.#expect(Kind.TemplateHead);
    const spans = [];
    while (true) {
      const expression = this.#parseCommaExpression();
      this.#expect(Kind.CloseBraceToken);
      const literalToken = this.#current();
      if (literalToken.kind !== Kind.TemplateMiddle && literalToken.kind !== Kind.TemplateTail) {
        throw new ParseError("Expected template continuation", literalToken);
      }
      this.#advance();
      const literal = literalToken.kind === Kind.TemplateMiddle
        ? createTemplateMiddle(templateMiddleText(literalToken.text), templateMiddleText(literalToken.text), 0)
        : createTemplateTail(templateTailText(literalToken.text), templateTailText(literalToken.text), 0);
      spans.push(createTemplateSpan(expression, literal as TemplateMiddleOrTail));
      if (literalToken.kind === Kind.TemplateTail) {
        break;
      }
    }
    return createTemplateExpression(createTemplateHead(templateHeadText(headToken.text), templateHeadText(headToken.text), 0), createNodeArray(spans));
  }

  #parseTemplateLiteral(): TemplateLiteral {
    const token = this.#current();
    if (token.kind === Kind.NoSubstitutionTemplateLiteral) {
      this.#advance();
      return createNoSubstitutionTemplateLiteral(unquoteTemplate(token.text), 0);
    }
    if (token.kind === Kind.TemplateHead) {
      return this.#parseTemplateExpression() as TemplateLiteral;
    }
    throw new ParseError("Expected template literal", token);
  }

  #parseArrayLiteralExpression(): Expression {
    this.#expect(Kind.OpenBracketToken);
    const elements: Expression[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      elements.push(this.#parseArgumentExpression());
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    return createArrayLiteralExpression(createNodeArray(elements), this.#sourceText.includes("\n"));
  }

  #parseObjectLiteralExpression(): Expression {
    const openBrace = this.#expect(Kind.OpenBraceToken);
    const properties: ObjectLiteralElementLike[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.DotDotDotToken)) {
        properties.push(createSpreadAssignment(this.#parseExpression()));
        this.#consumeOptional(Kind.CommaToken);
        continue;
      }
      const modifiers = this.#parseObjectLiteralModifiers();
      if (this.#isAccessorDeclarationStart(Kind.GetKeyword)) {
        this.#advance();
        const name = this.#parsePropertyName();
        const typeParameters = this.#parseOptionalTypeParameters();
        this.#expect(Kind.OpenParenToken);
        const parameters = this.#withAwaitContext(false, () => this.#parseParameterList());
        this.#expect(Kind.CloseParenToken);
        const type = this.#parseOptionalTypeAnnotation();
        const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(false, () => this.#parseBlock()) : undefined;
        properties.push(createGetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body));
        this.#consumeOptional(Kind.CommaToken);
        continue;
      }
      if (this.#isAccessorDeclarationStart(Kind.SetKeyword)) {
        this.#advance();
        const name = this.#parsePropertyName();
        const typeParameters = this.#parseOptionalTypeParameters();
        this.#expect(Kind.OpenParenToken);
        const parameters = this.#withAwaitContext(false, () => this.#parseParameterList());
        this.#expect(Kind.CloseParenToken);
        const type = this.#parseOptionalTypeAnnotation();
        const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(false, () => this.#parseBlock()) : undefined;
        properties.push(createSetAccessorDeclaration(modifiers, name, typeParameters, createNodeArray(parameters), type, body));
        this.#consumeOptional(Kind.CommaToken);
        continue;
      }
      const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
      const name = this.#parsePropertyName();
      const postfixToken = this.#parseOptionalPostfixToken();
      if (asteriskToken !== undefined || this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
        const isAsync = modifierListHas(modifiers, Kind.AsyncKeyword);
        const typeParameters = this.#parseOptionalTypeParameters();
        this.#expect(Kind.OpenParenToken);
        const parameters = this.#withAwaitContext(isAsync, () => this.#parseParameterList());
        this.#expect(Kind.CloseParenToken);
        const type = this.#parseOptionalTypeAnnotation();
        const body = this.#current().kind === Kind.OpenBraceToken ? this.#withAwaitContext(isAsync, () => this.#parseBlock()) : undefined;
        properties.push(createMethodDeclaration(modifiers, asteriskToken, name, postfixToken, typeParameters, createNodeArray(parameters), type, body));
      } else if (this.#consumeOptional(Kind.ColonToken)) {
        properties.push(createPropertyAssignment(modifiers, name, undefined, undefined as never, this.#parseExpression()));
      } else {
        const objectAssignmentInitializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
        properties.push(createShorthandPropertyAssignment(
          modifiers,
          name,
          undefined,
          undefined as never,
          objectAssignmentInitializer === undefined ? undefined : createToken(Kind.EqualsToken) as never,
          objectAssignmentInitializer,
        ));
      }
      this.#consumeOptional(Kind.CommaToken);
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    return createObjectLiteralExpression(createNodeArray(properties), this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n"));
  }

  #parseObjectLiteralModifiers(): NodeArray<ModifierLike> | undefined {
    const modifiers = this.#parseModifiers({ allowDecorators: true });
    if (modifiers !== undefined) {
      return modifiers;
    }
    if (this.#isObjectLiteralAsyncMethodStart()) {
      return createNodeArray([createToken(this.#advance().kind as ModifierSyntaxKind) as ModifierLike]);
    }
    return undefined;
  }

  #isObjectLiteralAsyncMethodStart(): boolean {
    if (this.#current().kind !== Kind.AsyncKeyword) {
      return false;
    }
    const next = this.#tokens[this.#index + 1];
    if (next === undefined || this.#hasLineBreakBetween(this.#current(), next)) {
      return false;
    }
    if (next.kind === Kind.AsteriskToken) {
      return true;
    }
    const afterNameIndex = this.#propertyNameLookaheadEnd(this.#index + 1);
    const afterNameKind = afterNameIndex === undefined ? undefined : this.#tokens[afterNameIndex]?.kind;
    return afterNameKind === Kind.OpenParenToken || afterNameKind === Kind.LessThanToken;
  }

  #propertyNameLookaheadEnd(index: number): number | undefined {
    const kind = this.#tokens[index]?.kind;
    if (kind === undefined) {
      return undefined;
    }
    if (isIdentifierNameKind(kind) || kind === Kind.StringLiteral || kind === Kind.NumericLiteral || kind === Kind.BigIntLiteral || kind === Kind.PrivateIdentifier) {
      return index + 1;
    }
    if (kind !== Kind.OpenBracketToken) {
      return undefined;
    }
    let depth = 0;
    for (let currentIndex = index; currentIndex < this.#tokens.length; currentIndex += 1) {
      const currentKind = this.#tokens[currentIndex]!.kind;
      if (currentKind === Kind.OpenBracketToken) {
        depth += 1;
      } else if (currentKind === Kind.CloseBracketToken) {
        depth -= 1;
        if (depth === 0) {
          return currentIndex + 1;
        }
      } else if (currentKind === Kind.EndOfFile) {
        return undefined;
      }
    }
    return undefined;
  }

  #isAccessorDeclarationStart(kind: Kind.GetKeyword | Kind.SetKeyword): boolean {
    if (this.#current().kind !== kind) {
      return false;
    }
    const nextToken = this.#tokens[this.#index + 1];
    if (nextToken === undefined || nextToken.kind === Kind.OpenParenToken) {
      return false;
    }
    return isPropertyNameStart(nextToken.kind);
  }

  #parseStringLiteralExpression(): Expression {
    const token = this.#expect(Kind.StringLiteral);
    return createStringLiteral(unquote(token.text), 0);
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

  #isBindingNameStart(kind: Kind): boolean {
    return kind === Kind.OpenBraceToken
      || kind === Kind.OpenBracketToken
      || (kind !== Kind.InKeyword && kind !== Kind.OfKeyword && isIdentifierNameKind(kind));
  }

  #parseObjectBindingPattern(): BindingName {
    this.#expect(Kind.OpenBraceToken);
    const elements: BindingElement[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const firstName = this.#parsePropertyName();
      const propertyName = this.#consumeOptional(Kind.ColonToken) ? firstName : undefined;
      if (propertyName === undefined && firstName.kind !== Kind.Identifier) {
        throw new ParseError("Expected identifier shorthand in binding pattern", this.#current());
      }
      const name = propertyName === undefined ? firstName as BindingName : this.#parseBindingName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      elements.push(createBindingElement(dotDotDotToken, propertyName, name, initializer));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return createObjectBindingPattern(createNodeArray(elements));
  }

  #parseArrayBindingPattern(): BindingName {
    this.#expect(Kind.OpenBracketToken);
    const elements: BindingElement[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.CommaToken)) {
        elements.push(createBindingElement(undefined, undefined, undefined, undefined));
        continue;
      }
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const name = this.#parseBindingName();
      const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
      elements.push(createBindingElement(dotDotDotToken, undefined, name, initializer));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    return createArrayBindingPattern(createNodeArray(elements));
  }

  #parsePropertyName(): PropertyName {
    const token = this.#current();
    if (this.#consumeOptional(Kind.OpenBracketToken)) {
      const expression = this.#parseCommaExpression();
      this.#expect(Kind.CloseBracketToken);
      return createComputedPropertyName(expression);
    }
    if (token.kind === Kind.StringLiteral) {
      return this.#parseStringLiteralExpression() as PropertyName;
    }
    if (token.kind === Kind.NumericLiteral) {
      this.#advance();
      return createNumericLiteral(token.text, 0) as PropertyName;
    }
    if (token.kind === Kind.BigIntLiteral) {
      this.#advance();
      return createBigIntLiteral(token.text, 0) as PropertyName;
    }
    if (token.kind === Kind.PrivateIdentifier) {
      this.#advance();
      return createPrivateIdentifier(token.text);
    }
    return this.#parseIdentifier();
  }

  #parseMemberName(): Identifier | PrivateIdentifier {
    if (this.#current().kind === Kind.PrivateIdentifier) {
      const token = this.#advance();
      return createPrivateIdentifier(token.text);
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
    this.#advance();
    return createIdentifier(token.text);
  }

  #parseOptionalTypeAnnotation(): TypeNode | undefined {
    if (!this.#consumeOptional(Kind.ColonToken)) {
      return undefined;
    }
    return this.#parseType();
  }

  #parseType(): TypeNode {
    const predicate = this.#tryParseTypePredicate();
    if (predicate !== undefined) {
      return predicate;
    }
    const checkType = this.#parseUnionType();
    if (this.#consumeOptional(Kind.ExtendsKeyword)) {
      const extendsType = this.#parseType();
      this.#expect(Kind.QuestionToken);
      const trueType = this.#parseType();
      this.#expect(Kind.ColonToken);
      const falseType = this.#parseType();
      return createConditionalTypeNode(checkType, extendsType, trueType, falseType);
    }
    return checkType;
  }

  #parseUnionType(): TypeNode {
    const hasLeadingBar = this.#consumeOptional(Kind.BarToken);
    const types = [this.#parseIntersectionType()];
    while (this.#consumeOptional(Kind.BarToken)) {
      types.push(this.#parseIntersectionType());
    }
    return !hasLeadingBar && types.length === 1 ? types[0]! : createUnionTypeNode(createNodeArray(types));
  }

  #parseIntersectionType(): TypeNode {
    const types = [this.#parsePostfixType()];
    while (this.#consumeOptional(Kind.AmpersandToken)) {
      types.push(this.#parsePostfixType());
    }
    return types.length === 1 ? types[0]! : createIntersectionTypeNode(createNodeArray(types));
  }

  #parsePostfixType(): TypeNode {
    let type = this.#parsePrimaryType();
    while (!this.#lineBreakBeforeCurrentToken()) {
      if (this.#consumeOptional(Kind.ExclamationToken)) {
        type = createJSDocNonNullableType(type);
        continue;
      }
      if (this.#current().kind === Kind.QuestionToken) {
        if (this.#nextTokenStartsType()) {
          return type;
        }
        this.#advance();
        type = createJSDocNullableType(type);
        continue;
      }
      if (this.#current().kind === Kind.OpenBracketToken) {
        this.#advance();
        if (this.#consumeOptional(Kind.CloseBracketToken)) {
          type = createArrayTypeNode(type);
          continue;
        }
        const indexType = this.#parseType();
        this.#expect(Kind.CloseBracketToken);
        type = createIndexedAccessTypeNode(type, indexType);
        continue;
      }
      return type;
    }
    return type;
  }

  #parsePrimaryType(): TypeNode {
    const token = this.#current();
    if (token.kind === Kind.KeyOfKeyword || token.kind === Kind.ReadonlyKeyword || token.kind === Kind.UniqueKeyword) {
      this.#advance();
      return createTypeOperatorNode(token.kind as Kind.KeyOfKeyword | Kind.ReadonlyKeyword | Kind.UniqueKeyword, this.#parsePostfixType());
    }
    if (token.kind === Kind.TypeOfKeyword) {
      this.#advance();
      if (this.#current().kind === Kind.ImportKeyword && this.#tokens[this.#index + 1]?.kind === Kind.OpenParenToken) {
        return this.#parseImportTypeNode(true);
      }
      return createTypeQueryNode(this.#parseEntityName(), this.#parseOptionalTypeArguments());
    }
    if (token.kind === Kind.ImportKeyword && this.#tokens[this.#index + 1]?.kind === Kind.OpenParenToken) {
      return this.#parseImportTypeNode(false);
    }
    if (token.kind === Kind.InferKeyword) {
      this.#advance();
      return createInferTypeNode(this.#parseInferTypeParameter());
    }
    if (token.kind === Kind.LessThanToken) {
      return this.#parseFunctionTypeWithOptionalTypeParameters();
    }
    if (token.kind === Kind.ThisKeyword) {
      this.#advance();
      return createThisTypeNode();
    }
    if (token.kind === Kind.OpenParenToken) {
      const functionType = this.#tryParseFunctionType();
      if (functionType !== undefined) {
        return functionType;
      }
      this.#advance();
      const type = this.#parseType();
      this.#expect(Kind.CloseParenToken);
      return createParenthesizedTypeNode(type);
    }
    if (token.kind === Kind.NewKeyword) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      this.#expect(Kind.EqualsGreaterThanToken);
      return createConstructorTypeNode(undefined, undefined, createNodeArray(parameters), this.#parseType());
    }
    if (token.kind === Kind.OpenBracketToken) {
      this.#advance();
      const elements: TypeNode[] = [];
      while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
        elements.push(this.#parseTupleElementType());
        this.#consumeOptional(Kind.CommaToken);
      }
      this.#expect(Kind.CloseBracketToken);
      return createTupleTypeNode(createNodeArray(elements));
    }
    if (token.kind === Kind.OpenBraceToken) {
      if (this.#isMappedTypeStart()) {
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
      return createTypeLiteralNode(createNodeArray(members));
    }
    if (keywordTypeKinds.has(token.kind)) {
      this.#advance();
      return createKeywordTypeNode(token.kind as KeywordTypeSyntaxKind);
    }
    if (token.kind === Kind.StringLiteral) {
      return createLiteralTypeNode(this.#parseStringLiteralExpression());
    }
    if (token.kind === Kind.NoSubstitutionTemplateLiteral) {
      this.#advance();
      return createLiteralTypeNode(createNoSubstitutionTemplateLiteral(unquoteTemplate(token.text), 0));
    }
    if (token.kind === Kind.TemplateHead) {
      return this.#parseTemplateType();
    }
    if (token.kind === Kind.NumericLiteral) {
      this.#advance();
      return createLiteralTypeNode(createNumericLiteral(token.text, 0));
    }
    if (token.kind === Kind.BigIntLiteral) {
      this.#advance();
      return createLiteralTypeNode(createBigIntLiteral(token.text, 0));
    }
    if ((token.kind === Kind.MinusToken || token.kind === Kind.PlusToken) && this.#tokens[this.#index + 1]?.kind === Kind.NumericLiteral) {
      const operator = this.#advance().kind as Kind.MinusToken | Kind.PlusToken;
      const literal = this.#current();
      this.#advance();
      return createLiteralTypeNode(createPrefixUnaryExpression(operator, createNumericLiteral(literal.text, 0)));
    }
    if (token.kind === Kind.TrueKeyword || token.kind === Kind.FalseKeyword || token.kind === Kind.NullKeyword) {
      this.#advance();
      return createLiteralTypeNode(createKeywordExpression(token.kind as Kind.TrueKeyword | Kind.FalseKeyword | Kind.NullKeyword));
    }
    if (isIdentifierNameKind(token.kind)) {
      return createTypeReferenceNode(this.#parseEntityName(), this.#parseOptionalTypeArguments());
    }
    throw new ParseError(`Unexpected type token ${Kind[token.kind]}`, token);
  }

  #parseTemplateType(): TypeNode {
    const headToken = this.#expect(Kind.TemplateHead);
    const spans: TemplateLiteralTypeSpan[] = [];
    while (true) {
      const type = this.#parseType();
      this.#expect(Kind.CloseBraceToken);
      const literalToken = this.#current();
      if (literalToken.kind !== Kind.TemplateMiddle && literalToken.kind !== Kind.TemplateTail) {
        throw new ParseError("Expected template type continuation", literalToken);
      }
      this.#advance();
      const literal = literalToken.kind === Kind.TemplateMiddle
        ? createTemplateMiddle(templateMiddleText(literalToken.text), templateMiddleText(literalToken.text), 0)
        : createTemplateTail(templateTailText(literalToken.text), templateTailText(literalToken.text), 0);
      spans.push(createTemplateLiteralTypeSpan(type, literal as TemplateMiddleOrTail));
      if (literalToken.kind === Kind.TemplateTail) {
        break;
      }
    }
    return createTemplateLiteralTypeNode(createTemplateHead(templateHeadText(headToken.text), templateHeadText(headToken.text), 0), createNodeArray(spans));
  }

  #parseTupleElementType(): TypeNode {
    if (this.#isNamedTupleElementStart()) {
      const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
      const name = this.#parseIdentifier();
      const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) : undefined;
      this.#expect(Kind.ColonToken);
      return createNamedTupleMember(dotDotDotToken, name, questionToken, this.#parseTupleElementType());
    }
    if (this.#consumeOptional(Kind.DotDotDotToken)) {
      return createRestTypeNode(this.#parseType());
    }
    const type = this.#parseType();
    if (type.kind === Kind.JSDocNullableType && type.pos === type.type.pos) {
      return createOptionalTypeNode(type.type);
    }
    return type;
  }

  #isNamedTupleElementStart(): boolean {
    let index = this.#index;
    if (this.#tokens[index]?.kind === Kind.DotDotDotToken) {
      index += 1;
    }
    if (!isIdentifierNameKind(this.#tokens[index]?.kind ?? Kind.Unknown)) {
      return false;
    }
    const nextKind = this.#tokens[index + 1]?.kind;
    return nextKind === Kind.ColonToken
      || nextKind === Kind.QuestionToken && this.#tokens[index + 2]?.kind === Kind.ColonToken;
  }

  #nextTokenStartsType(): boolean {
    const state = this.#beginSpeculation();
    this.#advance();
    const starts = this.#isStartOfType(false);
    this.#rewindSpeculation(state);
    return starts;
  }

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
        return !inStartOfParameter && this.#tokenAtIsNumericOrBigIntLiteral(this.#index + 1);
      case Kind.OpenParenToken:
        return !inStartOfParameter && this.#nextIsParenthesizedOrFunctionType();
      default:
        return isIdentifierNameKind(this.#current().kind);
    }
  }

  #nextIsParenthesizedOrFunctionType(): boolean {
    const state = this.#beginSpeculation();
    this.#advance();
    const starts = this.#current().kind === Kind.CloseParenToken
      || this.#isStartOfParameter(false)
      || this.#isStartOfType(false);
    this.#rewindSpeculation(state);
    return starts;
  }

  #isStartOfParameter(isJSDocParameter: boolean): boolean {
    return this.#current().kind === Kind.DotDotDotToken
      || this.#isBindingNameStart(this.#current().kind)
      || modifierKinds.has(this.#current().kind)
      || this.#current().kind === Kind.AtToken
      || this.#isStartOfType(!isJSDocParameter);
  }

  #tokenAtIsNumericOrBigIntLiteral(index: number): boolean {
    const kind = this.#tokens[index]?.kind;
    return kind === Kind.NumericLiteral || kind === Kind.BigIntLiteral;
  }

  #parseInferTypeParameter(): TypeParameterDeclaration {
    const name = this.#parseIdentifier();
    const constraint = this.#consumeOptional(Kind.ExtendsKeyword) ? this.#parseType() : undefined;
    return createTypeParameterDeclaration(undefined, name, constraint, undefined, undefined);
  }

  #isMappedTypeStart(): boolean {
    if (this.#current().kind !== Kind.OpenBraceToken) {
      return false;
    }
    let index = this.#index + 1;
    const first = this.#tokens[index]?.kind;
    if (first === Kind.PlusToken || first === Kind.MinusToken) {
      index += 1;
      if (this.#tokens[index]?.kind !== Kind.ReadonlyKeyword) {
        return false;
      }
      index += 1;
    } else if (first === Kind.ReadonlyKeyword) {
      index += 1;
    }
    return this.#tokens[index]?.kind === Kind.OpenBracketToken
      && isIdentifierNameKind(this.#tokens[index + 1]?.kind ?? Kind.Unknown)
      && this.#tokens[index + 2]?.kind === Kind.InKeyword;
  }

  #parseMappedType(): TypeNode {
    this.#expect(Kind.OpenBraceToken);
    const readonlyToken = this.#parseMappedTypeModifier(Kind.ReadonlyKeyword);
    this.#expect(Kind.OpenBracketToken);
    const typeParameter = this.#parseMappedTypeParameter();
    const nameType = this.#consumeOptional(Kind.AsKeyword) ? this.#parseType() : undefined;
    this.#expect(Kind.CloseBracketToken);
    const questionToken = this.#parseMappedTypeModifier(Kind.QuestionToken);
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
    return createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members.length === 0 ? undefined : createNodeArray(members));
  }

  #parseMappedTypeModifier(expectedToken: Kind.ReadonlyKeyword): ReturnType<typeof createToken<Kind.ReadonlyKeyword | Kind.PlusToken | Kind.MinusToken>> | undefined;
  #parseMappedTypeModifier(expectedToken: Kind.QuestionToken): ReturnType<typeof createToken<Kind.QuestionToken | Kind.PlusToken | Kind.MinusToken>> | undefined;
  #parseMappedTypeModifier(expectedToken: Kind.ReadonlyKeyword | Kind.QuestionToken): ReturnType<typeof createToken<Kind.ReadonlyKeyword | Kind.QuestionToken | Kind.PlusToken | Kind.MinusToken>> | undefined {
    if (this.#current().kind === expectedToken) {
      return createToken(this.#advance().kind as Kind.ReadonlyKeyword | Kind.QuestionToken);
    }
    if (this.#current().kind !== Kind.PlusToken && this.#current().kind !== Kind.MinusToken) {
      return undefined;
    }
    const token = createToken(this.#advance().kind as Kind.PlusToken | Kind.MinusToken);
    this.#expect(expectedToken);
    return token;
  }

  #parseMappedTypeParameter(): TypeParameterDeclaration {
    const name = this.#parseIdentifier();
    this.#expect(Kind.InKeyword);
    return createTypeParameterDeclaration(undefined, name, this.#parseType(), undefined, undefined);
  }

  #tryParseFunctionType(): TypeNode | undefined {
    const state = this.#beginSpeculation();
    try {
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      if (!this.#consumeOptional(Kind.EqualsGreaterThanToken)) {
        this.#rewindSpeculation(state);
        return undefined;
      }
      return createFunctionTypeNode(undefined, createNodeArray(parameters), this.#parseType());
    } catch {
      this.#rewindSpeculation(state);
      return undefined;
    }
  }

  #parseFunctionTypeWithOptionalTypeParameters(): TypeNode {
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    this.#expect(Kind.EqualsGreaterThanToken);
    return createFunctionTypeNode(typeParameters, createNodeArray(parameters), this.#parseType());
  }

  #parseImportTypeNode(isTypeOf: boolean): TypeNode {
    this.#expect(Kind.ImportKeyword);
    this.#expect(Kind.OpenParenToken);
    const argument = createLiteralTypeNode(this.#parseStringLiteralExpression());
    this.#expect(Kind.CloseParenToken);
    const qualifier = this.#consumeOptional(Kind.DotToken) ? this.#parseEntityName() : undefined;
    const typeArguments = this.#parseOptionalTypeArguments();
    return createImportTypeNode(isTypeOf, argument, undefined, qualifier, typeArguments);
  }

  #tryParseTypePredicate(): TypeNode | undefined {
    const state = this.#beginSpeculation();
    const assertsModifier = this.#consumeOptional(Kind.AssertsKeyword) ? createToken(Kind.AssertsKeyword) : undefined;
    let parameterName: ReturnType<typeof createThisTypeNode> | Identifier;
    if (this.#current().kind === Kind.ThisKeyword) {
      this.#advance();
      parameterName = createThisTypeNode();
    } else if (isIdentifierNameKind(this.#current().kind)) {
      parameterName = this.#parseIdentifier();
    } else {
      this.#rewindSpeculation(state);
      return undefined;
    }
    if (!this.#consumeOptional(Kind.IsKeyword)) {
      if (assertsModifier !== undefined) {
        return createTypePredicateNode(assertsModifier, parameterName, undefined);
      }
      this.#rewindSpeculation(state);
      return undefined;
    }
    return createTypePredicateNode(assertsModifier, parameterName, this.#parseType());
  }

  #parseEntityName(allowReservedWords = true): EntityName {
    let name: EntityName = this.#parseEntityNameIdentifier(allowReservedWords);
    while (this.#consumeOptional(Kind.DotToken)) {
      name = createQualifiedName(name, this.#parseEntityNameIdentifier(allowReservedWords));
    }
    return name;
  }

  #parseEntityNameIdentifier(allowReservedWords: boolean): Identifier {
    if (allowReservedWords) {
      return this.#parseIdentifier();
    }
    const token = this.#current();
    if (!isIdentifierNameKind(token.kind) || isReservedIdentifierNameKind(token.kind)) {
      if (token.kind === Kind.NullKeyword) {
        this.#addDiagnosticAtToken(token, 1359, token.text);
      } else {
        this.#addDiagnosticAtToken(token, 1003);
      }
      if (token.kind !== Kind.SemicolonToken && token.kind !== Kind.EndOfFile) {
        this.#advance();
      }
      return createIdentifier("");
    }
    this.#advance();
    return createIdentifier(token.text);
  }

  #consumeOptional(kind: Kind): boolean {
    if (this.#current().kind !== kind) {
      return false;
    }
    this.#advance();
    return true;
  }

  #consumeJSDocBeforeCurrentToken(): readonly Node[] | undefined {
    const token = this.#current();
    const jsDoc = this.#jsDocByTokenStart.get(token.pos);
    if (jsDoc !== undefined) {
      this.#jsDocByTokenStart.delete(token.pos);
    }
    return jsDoc;
  }

  #withJSDoc<TNode extends Node>(node: TNode, jsDoc: readonly Node[] | undefined): TNode {
    if (jsDoc !== undefined && jsDoc.length > 0) {
      Object.defineProperty(node, "jsDoc", {
        configurable: true,
        enumerable: true,
        value: jsDoc,
      });
    }
    return node;
  }

  #attachJSDocToFirstDeclaration(declarations: readonly VariableDeclaration[], jsDoc: readonly Node[]): void {
    const declaration = declarations[0];
    if (declaration !== undefined) {
      this.#withJSDoc(declaration, jsDoc);
    }
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
    const token = this.#current();
    if (token.kind === Kind.GreaterThanToken) {
      this.#advance();
      return token;
    }
    if (token.kind === Kind.GreaterThanGreaterThanToken) {
      const tokens = this.#tokens as ScannedToken[];
      tokens[this.#index] = { kind: Kind.GreaterThanToken, pos: token.pos + 1, end: token.end, text: ">" };
      return { kind: Kind.GreaterThanToken, pos: token.pos, end: token.pos + 1, text: ">" };
    }
    if (token.kind === Kind.GreaterThanGreaterThanGreaterThanToken) {
      const tokens = this.#tokens as ScannedToken[];
      tokens[this.#index] = { kind: Kind.GreaterThanGreaterThanToken, pos: token.pos + 1, end: token.end, text: ">>" };
      return { kind: Kind.GreaterThanToken, pos: token.pos, end: token.pos + 1, text: ">" };
    }
    throw new ParseError(`Expected token ${Kind[Kind.GreaterThanToken]}`, token);
  }

  #parseExpectedGreaterThan(): ScannedToken {
    try {
      return this.#expectGreaterThan();
    } catch {
      const token = this.#current();
      this.#addDiagnosticAtToken(token, 1005, ">");
      return { kind: Kind.GreaterThanToken, pos: token.pos, end: token.pos, text: ">" };
    }
  }

  #current(): ScannedToken {
    return this.#tokens[this.#index]!;
  }

  #beginSpeculation(): SpeculationState {
    return {
      index: this.#index,
      diagnosticCount: this.#diagnostics.length,
      tokens: [...this.#tokens],
    };
  }

  #rewindSpeculation(state: SpeculationState): void {
    this.#index = state.index;
    this.#diagnostics.length = state.diagnosticCount;
    const tokens = this.#tokens as ScannedToken[];
    tokens.splice(0, tokens.length, ...state.tokens);
  }

  #advance(): ScannedToken {
    const token = this.#current();
    if (token.kind !== Kind.EndOfFile) {
      this.#index += 1;
    }
    return token;
  }

  #consumeStatementTerminator(expression: Expression): void {
    if (this.#consumeOptional(Kind.SemicolonToken)
      || this.#lineBreakBeforeCurrentToken()
      || this.#current().kind === Kind.CloseBraceToken
      || this.#current().kind === Kind.EndOfFile) {
      return;
    }
    if (expression.kind === Kind.Identifier) {
      this.#addDiagnosticAtToken(expression, 1434);
      const current = this.#current();
      if ((current.kind === Kind.NumericLiteral || current.kind === Kind.BigIntLiteral) && current.text.startsWith(".")) {
        return;
      }
    }
    if (this.#current().kind === Kind.ColonToken) {
      this.#addDiagnosticAtToken(this.#current(), 1005, ";");
      this.#advance();
      return;
    }
    if (this.#current().kind === Kind.AtToken || this.#current().kind === Kind.Unknown) {
      this.#addDiagnosticAtToken(this.#current(), 1127);
    }
    this.#addDiagnosticAtToken(this.#current(), 1128);
    while (this.#current().kind !== Kind.SemicolonToken
      && this.#current().kind !== Kind.CloseBraceToken
      && this.#current().kind !== Kind.EndOfFile) {
      this.#advance();
    }
    this.#consumeOptional(Kind.SemicolonToken);
  }

  #lineBreakBeforeCurrentToken(): boolean {
    const previous = this.#tokens[this.#index - 1];
    const current = this.#current();
    if (previous === undefined || current.kind === Kind.EndOfFile) {
      return false;
    }
    return /[\r\n\u2028\u2029]/u.test(this.#sourceText.slice(previous.end, current.pos));
  }

  #parseInvalidClassVariableElement(modifiers: NodeArray<ModifierLike> | undefined): ClassElement {
    const keyword = this.#current();
    this.#addDiagnosticAtToken(keyword, modifiers === undefined ? 1068 : 1440);
    this.#advance();
    if (this.#current().kind === Kind.ConstructorKeyword && this.#tokens[this.#index + 1]?.kind === Kind.OpenParenToken) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      this.#expect(Kind.CloseParenToken);
      this.#addDiagnosticAtToken(this.#current(), 1005, ",");
      this.#addDiagnosticAtToken(this.#current(), 1005, "=>");
      if (this.#current().kind === Kind.OpenBraceToken) {
        this.#skipBalancedBlock();
      }
      this.#addDiagnosticAtToken(this.#current(), 1128);
      return createSemicolonClassElement();
    }
    while (this.#current().kind !== Kind.SemicolonToken
      && this.#current().kind !== Kind.CloseBraceToken
      && this.#current().kind !== Kind.EndOfFile) {
      this.#advance();
    }
    this.#consumeOptional(Kind.SemicolonToken);
    return createSemicolonClassElement();
  }

  #skipBalancedBlock(): void {
    if (!this.#consumeOptional(Kind.OpenBraceToken)) {
      return;
    }
    let depth = 1;
    while (depth > 0 && this.#current().kind !== Kind.EndOfFile) {
      if (this.#current().kind === Kind.OpenBraceToken) {
        depth += 1;
      } else if (this.#current().kind === Kind.CloseBraceToken) {
        depth -= 1;
      }
      this.#advance();
    }
  }

  #addDiagnosticForUnexpectedToken(token: ScannedToken): void {
    if (token.kind === Kind.AtToken || token.kind === Kind.Unknown) {
      this.#addDiagnosticAtToken(token, 1127);
    }
    this.#addDiagnosticAtToken(token, 1128);
  }

  #validateLexicalDiagnostics(): void {
    let previousToken: ScannedToken | undefined;
    for (const token of this.#tokens) {
      if (token.kind === Kind.NumericLiteral || token.kind === Kind.BigIntLiteral) {
        this.#validateNumericLiteralToken(token, previousToken);
        previousToken = token;
        continue;
      }
      if (
        token.kind === Kind.StringLiteral
        || token.kind === Kind.NoSubstitutionTemplateLiteral
        || token.kind === Kind.TemplateHead
        || token.kind === Kind.TemplateMiddle
        || token.kind === Kind.TemplateTail
      ) {
        this.#validateStringLikeEscapeSequences(token);
      }
      previousToken = token;
    }
  }

  #validateNumericLiteralToken(token: ScannedToken, previousToken: ScannedToken | undefined): void {
    const missingExponentDigit = missingExponentDigitDiagnostic(token.text);
    if (missingExponentDigit !== undefined) {
      this.#addDiagnosticAt(token.pos + missingExponentDigit.offset, 0, 1124);
    }
    const invalidBigInt = invalidBigIntLiteralDiagnostic(token.text);
    if (invalidBigInt !== undefined) {
      this.#addDiagnosticAt(token.pos, token.text.length, invalidBigInt.code);
    }
    const diagnostic = legacyOctalNumericLiteralDiagnostic(token.text);
    if (diagnostic === undefined) {
      return;
    }
    if (diagnostic.code === 1121) {
      if (previousToken?.kind === Kind.MinusToken) {
        this.#addDiagnosticAt(previousToken.pos, token.pos - previousToken.pos + diagnostic.length, diagnostic.code, `-${diagnostic.replacement}`);
        return;
      }
      this.#addDiagnosticAt(token.pos, diagnostic.length, diagnostic.code, diagnostic.replacement);
      return;
    }
    this.#addDiagnosticAt(token.pos, diagnostic.length, diagnostic.code);
  }

  #validateStringLikeEscapeSequences(token: ScannedToken): void {
    const bounds = stringLikeEscapeScanBounds(token);
    if (bounds === undefined) {
      return;
    }
    let index = bounds.start;
    while (index < bounds.end) {
      if (token.text[index] !== "\\") {
        index += 1;
        continue;
      }
      const diagnostic = invalidEscapeSequenceDiagnostic(token.text, index, bounds.end);
      if (diagnostic !== undefined) {
        this.#addDiagnosticAt(token.pos + index, diagnostic.length, diagnostic.code, diagnostic.replacement);
        index += diagnostic.length;
        continue;
      }
      index += 2;
    }
  }

  #addDiagnosticAtToken(token: ScannedToken | { readonly pos?: number; readonly end?: number }, code: DiagnosticCode, ...args: readonly string[]): void {
    const start = token.pos ?? 0;
    const end = token.end ?? start;
    this.#addDiagnosticAt(start, Math.max(0, end - start), code, ...args);
  }

  #addDiagnosticAt(start: number, length: number, code: DiagnosticCode, ...args: readonly string[]): void {
    const message = createDiagnosticAt({ fileName: this.#fileName, start, length }, code, ...args);
    const previous = this.#diagnostics.at(-1);
    if (previous?.start === start && previous.code === code && previous.message === message.message) {
      return;
    }
    this.#diagnostics.push(message);
  }
}

type LegacyOctalNumericDiagnostic = LegacyOctalLiteralDiagnostic | LeadingZeroDecimalDiagnostic;

interface LegacyOctalLiteralDiagnostic {
  readonly code: 1121;
  readonly length: number;
  readonly replacement: string;
}

interface LeadingZeroDecimalDiagnostic {
  readonly code: 1489;
  readonly length: number;
}

interface MissingExponentDigitDiagnostic {
  readonly offset: number;
}

interface InvalidBigIntLiteralDiagnostic {
  readonly code: 1352 | 1353;
}

interface InvalidEscapeDiagnostic {
  readonly code: 1487 | 1488;
  readonly length: number;
  readonly replacement: string;
}

interface EscapeScanBounds {
  readonly start: number;
  readonly end: number;
}

function legacyOctalNumericLiteralDiagnostic(text: string): LegacyOctalNumericDiagnostic | undefined {
  const literalText = text.endsWith("n") ? text.slice(0, -1) : text;
  if (literalText.length < 2 || literalText[0] !== "0") {
    return undefined;
  }
  const secondCharacter = literalText[1]!;
  if (!isAsciiDigit(secondCharacter)) {
    return undefined;
  }

  const leadingDigits = literalText.match(/^0[0-9]*/)?.[0];
  if (leadingDigits === undefined || leadingDigits.length < 2) {
    return undefined;
  }
  if (/[89]/.test(leadingDigits)) {
    return { code: 1489, length: leadingDigits.length };
  }

  const octalDigits = leadingDigits.replace(/^0+/, "") || "0";
  return { code: 1121, length: leadingDigits.length, replacement: `0o${octalDigits}` };
}

function missingExponentDigitDiagnostic(text: string): MissingExponentDigitDiagnostic | undefined {
  const literalText = text.endsWith("n") ? text.slice(0, -1) : text;
  if (isRadixNumericLiteralText(literalText)) {
    return undefined;
  }
  return /[eE][+-]?$/.test(literalText) ? { offset: literalText.length } : undefined;
}

function invalidBigIntLiteralDiagnostic(text: string): InvalidBigIntLiteralDiagnostic | undefined {
  if (!text.endsWith("n")) {
    return undefined;
  }
  const literalText = text.slice(0, -1);
  if (isRadixNumericLiteralText(literalText)) {
    return undefined;
  }
  if (literalText.includes(".")) {
    return { code: 1353 };
  }
  if (/[eE]/.test(literalText)) {
    return { code: 1352 };
  }
  return undefined;
}

function isRadixNumericLiteralText(text: string): boolean {
  return /^0[xob]/i.test(text);
}

function stringLikeEscapeScanBounds(token: ScannedToken): EscapeScanBounds | undefined {
  switch (token.kind) {
    case Kind.StringLiteral: {
      if (token.text.length < 2) {
        return undefined;
      }
      const quote = token.text[0]!;
      const hasClosingQuote = (quote === "\"" || quote === "'") && token.text.endsWith(quote);
      return { start: 1, end: hasClosingQuote ? token.text.length - 1 : token.text.length };
    }
    case Kind.NoSubstitutionTemplateLiteral:
      return { start: 1, end: token.text.endsWith("`") ? token.text.length - 1 : token.text.length };
    case Kind.TemplateHead:
      return { start: 1, end: token.text.endsWith("${") ? token.text.length - 2 : token.text.length };
    case Kind.TemplateMiddle:
      return { start: token.text.startsWith("}") ? 1 : 0, end: token.text.endsWith("${") ? token.text.length - 2 : token.text.length };
    case Kind.TemplateTail:
      return { start: token.text.startsWith("}") ? 1 : 0, end: token.text.endsWith("`") ? token.text.length - 1 : token.text.length };
    default:
      return undefined;
  }
}

function invalidEscapeSequenceDiagnostic(text: string, backslashIndex: number, end: number): InvalidEscapeDiagnostic | undefined {
  const escapedCharacter = text[backslashIndex + 1];
  if (escapedCharacter === undefined || backslashIndex + 1 >= end) {
    return undefined;
  }
  if (escapedCharacter === "8" || escapedCharacter === "9") {
    return { code: 1488, length: 2, replacement: `\\${escapedCharacter}` };
  }
  if (!isOctalDigit(escapedCharacter)) {
    return undefined;
  }
  if (escapedCharacter === "0" && !isAsciiDigit(text[backslashIndex + 2] ?? "")) {
    return undefined;
  }

  const octalDigitLimit = escapedCharacter >= "4" ? 2 : 3;
  let digits = escapedCharacter;
  while (
    digits.length < octalDigitLimit
    && backslashIndex + 1 + digits.length < end
    && isOctalDigit(text[backslashIndex + 1 + digits.length]!)
  ) {
    digits += text[backslashIndex + 1 + digits.length]!;
  }

  const value = Number.parseInt(digits, 8);
  const replacement = `\\x${value.toString(16).padStart(2, "0")}`;
  return { code: 1487, length: 1 + digits.length, replacement };
}

function isAsciiDigit(character: string): boolean {
  return character >= "0" && character <= "9";
}

function isOctalDigit(character: string): boolean {
  return character >= "0" && character <= "7";
}

function isTemplateLiteralStart(kind: Kind): boolean {
  return kind === Kind.NoSubstitutionTemplateLiteral || kind === Kind.TemplateHead;
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
  return modifiers.some(modifier => !isDecorator(modifier) && modifier.kind === kind);
}

function modifierListHas(modifiers: NodeArray<ModifierLike> | undefined, kind: Kind): boolean {
  return modifiers !== undefined && hasModifier(modifiers, kind);
}

function sourceFileHasExternalModuleSyntax(sourceFile: SourceFile): boolean {
  return sourceFile.statements.some(statement =>
    statement.kind === Kind.ImportDeclaration
    || statement.kind === Kind.ExportDeclaration
    || statement.kind === Kind.ExportAssignment
    || statement.kind === Kind.NamespaceExportDeclaration
    || (
      statement.kind === Kind.ImportEqualsDeclaration
      && (statement as { readonly moduleReference: { readonly kind: Kind } }).moduleReference.kind === Kind.ExternalModuleReference
    )
    || modifierListHas((statement as { readonly modifiers?: NodeArray<ModifierLike> }).modifiers, Kind.ExportKeyword)
  );
}

function isIdentifierNameKind(kind: Kind): boolean {
  return kind === Kind.Identifier || (kind >= Kind.FirstKeyword && kind <= Kind.LastKeyword);
}

function isBindingIdentifierKind(kind: Kind): boolean {
  return kind === Kind.Identifier || kind > Kind.LastReservedWord;
}

function isRightAssociativeBinaryOperator(kind: Kind): boolean {
  return kind === Kind.AsteriskAsteriskToken || assignmentOperatorKinds.has(kind);
}

function isIdentifierOrKeywordOrLiteralKind(kind: Kind): boolean {
  return isIdentifierNameKind(kind)
    || kind === Kind.StringLiteral
    || kind === Kind.NumericLiteral
    || kind === Kind.BigIntLiteral
    || kind === Kind.RegularExpressionLiteral
    || kind === Kind.NoSubstitutionTemplateLiteral
    || kind === Kind.TemplateHead;
}

function isReservedIdentifierNameKind(kind: Kind): boolean {
  return kind === Kind.FalseKeyword
    || kind === Kind.NullKeyword
    || kind === Kind.SuperKeyword
    || kind === Kind.ThisKeyword
    || kind === Kind.TrueKeyword;
}

function isPropertyNameStart(kind: Kind): boolean {
  return isIdentifierNameKind(kind)
    || kind === Kind.StringLiteral
    || kind === Kind.NumericLiteral
    || kind === Kind.BigIntLiteral
    || kind === Kind.PrivateIdentifier
    || kind === Kind.OpenBracketToken;
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

function isJsxFileName(fileName: string): boolean {
  return /\.(?:jsx|tsx)$/iu.test(fileName);
}

function jsxTagNameText(tagName: JsxTagNameExpression): string {
  if (tagName.kind === Kind.Identifier) {
    return tagName.text;
  }
  if (tagName.kind === Kind.JsxNamespacedName) {
    return `${tagName.namespace.text}:${tagName.name.text}`;
  }
  if (tagName.kind === Kind.PropertyAccessExpression) {
    const propertyAccess = tagName as Extract<JsxTagNameExpression, { readonly kind: Kind.PropertyAccessExpression }>;
    return `${jsxTagNameText(propertyAccess.expression as JsxTagNameExpression)}.${propertyAccess.name.text}`;
  }
  return "this";
}

function collectJSDocByTokenStart(sourceText: string, fileName: string): Map<number, readonly Node[]> {
  const tokens = scanAll(sourceText, { skipTrivia: false });
  const jsDocByTokenStart = new Map<number, readonly Node[]>();
  let pendingComments: string[] = [];
  let lineBreaksAfterPending = 0;
  for (const token of tokens) {
    if (token.kind === Kind.MultiLineCommentTrivia && token.text.startsWith("/**") && !token.text.startsWith("/***")) {
      pendingComments.push(token.text);
      lineBreaksAfterPending = 0;
      continue;
    }
    if (token.kind === Kind.WhitespaceTrivia) {
      continue;
    }
    if (token.kind === Kind.NewLineTrivia) {
      if (pendingComments.length > 0) {
        lineBreaksAfterPending += 1;
        if (lineBreaksAfterPending > 1) {
          pendingComments = [];
          lineBreaksAfterPending = 0;
        }
      }
      continue;
    }
    if (token.kind === Kind.SingleLineCommentTrivia || token.kind === Kind.MultiLineCommentTrivia) {
      pendingComments = [];
      lineBreaksAfterPending = 0;
      continue;
    }
    if (pendingComments.length > 0) {
      jsDocByTokenStart.set(token.pos, pendingComments.map(comment => parseJSDocComment(comment, fileName)));
      pendingComments = [];
      lineBreaksAfterPending = 0;
    }
  }
  return jsDocByTokenStart;
}

function parseJSDocComment(commentText: string, fileName: string): Node {
  const body = cleanJSDocComment(commentText);
  const tags: JSDocTag[] = [];
  const jsDocIdentifier = String.raw`[\p{ID_Start}_$][\p{ID_Continue}\u200c\u200d_$]*`;
  for (const match of body.matchAll(new RegExp(String.raw`@template\s+(${jsDocIdentifier}(?:\s*,\s*${jsDocIdentifier})*)`, "gu"))) {
    const typeParameters = match[1]!.split(/\s*,\s*/u)
      .filter(name => name.length > 0)
      .map(name => createTypeParameterDeclaration(undefined, createIdentifier(name), undefined, undefined, undefined));
    if (typeParameters.length > 0) {
      tags.push(createJSDocTemplateTag(createIdentifier("template"), undefined as never, createNodeArray(typeParameters), undefined));
    }
  }
  for (const match of body.matchAll(new RegExp(String.raw`@param\s*\{([^}]*)\}\s*(${jsDocIdentifier})`, "gu"))) {
    tags.push(createJSDocParameterTag(
      createIdentifier("param"),
      createIdentifier(match[2]!),
      false,
      parseJSDocType(match[1]!, fileName),
      false,
      undefined,
    ));
  }
  for (const match of body.matchAll(/@returns?\s*\{([^}]*)\}/gu)) {
    tags.push(createJSDocReturnTag(createIdentifier("returns"), parseJSDocType(match[1]!, fileName), undefined));
  }
  for (const match of body.matchAll(/@type\s*\{([^}]*)\}/gu)) {
    tags.push(createJSDocTypeTag(createIdentifier("type"), parseJSDocType(match[1]!, fileName), undefined));
  }
  return createJSDoc(createNodeArray([]), tags.length === 0 ? undefined : createNodeArray(tags));
}

function cleanJSDocComment(commentText: string): string {
  return commentText
    .replace(/^\/\*\*/u, "")
    .replace(/\*\/$/u, "")
    .split(/\r\n?|\n|\u2028|\u2029/u)
    .map(line => line.replace(/^\s*\*\s?/u, ""))
    .join("\n");
}

function parseJSDocType(typeText: string, fileName: string): TypeNode {
  const normalized = normalizeJSDocType(typeText);
  try {
    const sourceFile = new Parser(`type __JSDoc = ${normalized};`, { fileName }).parseSourceFile();
    const statement = sourceFile.statements[0] as TypeAliasDeclaration | undefined;
    if (statement?.kind === Kind.TypeAliasDeclaration) {
      return statement.type;
    }
  } catch {
    return createKeywordTypeNode(Kind.AnyKeyword);
  }
  return createKeywordTypeNode(Kind.AnyKeyword);
}

function normalizeJSDocType(typeText: string): string {
  let text = typeText.trim();
  if (text === "*") {
    return "any";
  }
  if (text.endsWith("=")) {
    text = `${text.slice(0, -1).trim()} | undefined`;
  }
  if (text.startsWith("?")) {
    text = `${text.slice(1).trim()} | null`;
  }
  if (text.startsWith("!")) {
    text = text.slice(1).trim();
  }
  return text;
}

export function parseSourceFile(sourceText: string, options?: ParseSourceFileOptions): SourceFile {
  return new Parser(sourceText, options).parseSourceFile();
}

export interface ParseResult {
  readonly sourceFile: SourceFile;
  readonly diagnostics: readonly Diagnostic[];
}

export function parseSourceFileWithDiagnostics(sourceText: string, options?: ParseSourceFileOptions): ParseResult {
  return new Parser(sourceText, options).parseSourceFileWithDiagnostics();
}
