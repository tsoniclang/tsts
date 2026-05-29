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
  createComputedPropertyName,
  createConditionalTypeNode,
  createConstructorDeclaration,
  createConstructorTypeNode,
  createDeleteExpression,
  createDefaultClause,
  createExportDeclaration,
  createExportSpecifier,
  createExpressionStatement,
  createExpressionWithTypeArguments,
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
  createImportClause,
  createImportDeclaration,
  createImportSpecifier,
  createIntersectionTypeNode,
  createInterfaceDeclaration,
  createKeywordTypeNode,
  createCallExpression,
  createCallSignatureDeclaration,
  createConstructSignatureDeclaration,
  createIndexSignatureDeclaration,
  createKeywordExpression,
  createLiteralTypeNode,
  createMethodDeclaration,
  createMethodSignatureDeclaration,
  createNamedExports,
  createNamedImports,
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
  isBinaryOperatorToken,
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
  type KeywordTypeSyntaxKind,
  type ModifierSyntaxKind,
  type ModifierLike,
  type ModuleExportName,
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
  type TypeNode,
  type TemplateMiddleOrTail,
  type TypeParameterDeclaration,
  type VariableDeclaration,
} from "../ast/index.js";
import { scanAll, type ScannedToken } from "../scanner/index.js";

export interface ParseSourceFileOptions {
  readonly fileName?: string;
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

export class Parser {
  readonly #sourceText: string;
  readonly #fileName: string;
  readonly #tokens: readonly ScannedToken[];
  #index = 0;

  constructor(sourceText: string, options: ParseSourceFileOptions = {}) {
    this.#sourceText = sourceText;
    this.#fileName = options.fileName ?? "input.ts";
    this.#tokens = scanAll(sourceText);
  }

  parseSourceFile(): SourceFile {
    const statements: Statement[] = [];
    while (this.#current().kind !== Kind.EndOfFile) {
      statements.push(this.#parseStatement());
    }
    return createSourceFile(
      this.#fileName,
      this.#fileName as never,
      this.#sourceText,
      createNodeArray(statements),
      createToken(Kind.EndOfFile),
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
    const modifiers = this.#parseModifiers();
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.DefaultKeyword) {
      this.#advance();
      const defaultModifiers = createNodeArray([...modifiers, createToken(Kind.DefaultKeyword) as ModifierLike]);
      if (this.#current().kind === Kind.FunctionKeyword) {
        return this.#parseFunctionDeclaration(pos, defaultModifiers);
      }
      if (this.#current().kind === Kind.ClassKeyword) {
        return this.#parseClassDeclaration(pos, defaultModifiers);
      }
      throw new ParseError("Unsupported export default declaration", this.#current());
    }
    switch (this.#current().kind) {
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
    // tsgo parseExpressionOrLabeledStatement: pos captured before the expression. Since
    // modifiers are rejected for expression statements, the #parseStatement-top pos equals
    // the expression's own start; reuse it.
    const expression = this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createExpressionStatement(expression), pos);
  }

  #isTypeAliasDeclarationStart(): boolean {
    return this.#current().kind === Kind.TypeKeyword && isIdentifierNameKind(this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown);
  }

  #parseImportDeclaration(pos: number, modifiers: NodeArray<ModifierLike> | undefined): Statement {
    // tsgo parseImportDeclarationOrImportEqualsDeclaration: ImportDeclaration start is the
    // #parseStatement-top pos (covering modifiers); finishNode runs after the trailing
    // semicolon so a present `;` is covered.
    this.#expect(Kind.ImportKeyword);
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
    return this.#finishNode(createImportDeclaration(modifiers, importClause, moduleSpecifier, undefined), pos);
  }

  #parseImportClause(): ReturnType<typeof createImportClause> {
    // tsgo parseImportClause: ImportClause pos is `afterImportPos` (the token after
    // `import`), which equals this method's entry here.
    const pos = this.#nodePos();
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
    return this.#finishNode(createImportClause(phaseModifier, name, namedBindings), pos);
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
    // tsgo parseExportDeclaration: ExportDeclaration start is the #parseStatement-top pos
    // (covering modifiers); finishNode runs after the trailing semicolon.
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      const moduleSpecifier = this.#consumeOptional(Kind.FromKeyword) ? this.#parseStringLiteralExpression() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return this.#finishNode(createExportDeclaration(modifiers, false, undefined, moduleSpecifier, undefined), pos);
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
    this.#consumeOptional(Kind.SemicolonToken);
    return this.#finishNode(createExportDeclaration(modifiers, false, namedExports, moduleSpecifier, undefined), pos);
  }

  #parseModifiers(): NodeArray<ModifierLike> | undefined {
    const modifiers: ModifierLike[] = [];
    while (this.#isModifierAtCurrentPosition()) {
      modifiers.push(createToken(this.#current().kind as ModifierSyntaxKind) as ModifierLike);
      this.#advance();
    }
    return modifiers.length === 0 ? undefined : createNodeArray(modifiers);
  }

  #isModifierAtCurrentPosition(): boolean {
    if (!modifierKinds.has(this.#current().kind)) {
      return false;
    }
    const nextKind = this.#tokens[this.#index + 1]?.kind;
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
    // Enum members are Stage 1e (left unstamped).
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
      const expression = this.#parseExpression();
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
    return this.#parseExpression();
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
    if (this.#consumeOptional(Kind.SemicolonToken)) {
      return createSemicolonClassElement();
    }
    const modifiers = this.#parseModifiers();
    if (this.#current().kind === Kind.ConstructorKeyword) {
      this.#advance();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createConstructorDeclaration(modifiers, undefined, createNodeArray(parameters), undefined, body);
    }

    if (this.#current().kind === Kind.GetKeyword && this.#tokens[this.#index + 1]?.kind !== Kind.OpenParenToken) {
      this.#advance();
      const name = this.#parsePropertyName();
      this.#expect(Kind.OpenParenToken);
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createGetAccessorDeclaration(modifiers, name, undefined, createNodeArray([]), type, body);
    }

    if (this.#current().kind === Kind.SetKeyword && this.#tokens[this.#index + 1]?.kind !== Kind.OpenParenToken) {
      this.#advance();
      const name = this.#parsePropertyName();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createSetAccessorDeclaration(modifiers, name, undefined, createNodeArray(parameters), undefined, body);
    }

    const name = this.#parsePropertyName();
    const postfixToken = this.#parseOptionalPostfixToken();
    if (this.#current().kind === Kind.OpenParenToken || this.#current().kind === Kind.LessThanToken) {
      const typeParameters = this.#parseOptionalTypeParameters();
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      const type = this.#parseOptionalTypeAnnotation();
      const body = this.#current().kind === Kind.OpenBraceToken ? this.#parseBlock() : undefined;
      this.#consumeOptional(Kind.SemicolonToken);
      return createMethodDeclaration(modifiers, undefined, name, postfixToken, typeParameters, createNodeArray(parameters), type, body);
    }

    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    this.#consumeOptional(Kind.SemicolonToken);
    return createPropertyDeclaration(modifiers, name, postfixToken, type, initializer);
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
    const modifiers = this.#parseModifiers();
    if (this.#isIndexSignature()) {
      return this.#parseIndexSignatureDeclaration(modifiers);
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

  // `{ (args): R }` (call) and `{ new (args): R }` (construct) signatures.
  #parseSignatureMember(kind: Kind.CallSignature | Kind.ConstructSignature): TypeElement {
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
      ? createCallSignatureDeclaration(typeParameters, createNodeArray(parameters), type)
      : createConstructSignatureDeclaration(typeParameters, createNodeArray(parameters), type);
  }

  // `{ [key: K]: V }` index signature.
  #parseIndexSignatureDeclaration(modifiers: NodeArray<ModifierLike> | undefined): TypeElement {
    this.#expect(Kind.OpenBracketToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseBracketToken);
    const type = this.#parseOptionalTypeAnnotation();
    this.#consumeOptional(Kind.SemicolonToken);
    this.#consumeOptional(Kind.CommaToken);
    return createIndexSignatureDeclaration(modifiers, createNodeArray(parameters), type as never);
  }

  #nextTokenIsOpenParenOrLessThan(): boolean {
    const kind = this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown;
    return kind === Kind.OpenParenToken || kind === Kind.LessThanToken;
  }

  // Distinguish an index signature `[id: T]` from a computed property name.
  // Faithful port of TS-Go nextIsUnambiguouslyIndexSignature (token lookahead).
  #isIndexSignature(): boolean {
    if (this.#current().kind !== Kind.OpenBracketToken) {
      return false;
    }
    const kindAt = (offset: number): Kind => this.#tokens[this.#index + offset]?.kind ?? Kind.Unknown;
    const first = kindAt(1);
    if (first === Kind.DotDotDotToken || first === Kind.CloseBracketToken) {
      return true;
    }
    if (modifierKinds.has(first)) {
      return isIdentifierNameKind(kindAt(2));
    }
    if (!isIdentifierNameKind(first)) {
      return false;
    }
    const afterId = kindAt(2);
    if (afterId === Kind.ColonToken || afterId === Kind.CommaToken) {
      return true;
    }
    if (afterId !== Kind.QuestionToken) {
      return false;
    }
    const afterQuestion = kindAt(3);
    return afterQuestion === Kind.ColonToken || afterQuestion === Kind.CommaToken || afterQuestion === Kind.CloseBracketToken;
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
      const token = this.#current().kind as Kind.ExtendsKeyword | Kind.ImplementsKeyword;
      this.#advance();
      const types: ExpressionWithTypeArguments[] = [];
      do {
        types.push(this.#parseExpressionWithTypeArguments());
      } while (this.#consumeOptional(Kind.CommaToken));
      clauses.push(createHeritageClause(token, createNodeArray(types)));
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
    // Params are Stage 1e (left unstamped); the body Block is stamped via #parseBlock.
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#parseBlock();
    return this.#finishNode(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body), pos);
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
    const dotDotDotToken = this.#consumeOptional(Kind.DotDotDotToken) ? createToken(Kind.DotDotDotToken) : undefined;
    const name = this.#parseBindingName();
    const questionToken = this.#consumeOptional(Kind.QuestionToken) ? createToken(Kind.QuestionToken) : undefined;
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return createParameterDeclaration(undefined, dotDotDotToken, name, questionToken, type, initializer);
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
      const operatorToken = this.#current();
      const operatorPrecedence = binaryPrecedence.get(operatorToken.kind) ?? 0;
      if (operatorPrecedence <= precedence) {
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
    if (isIdentifierNameKind(this.#current().kind) && this.#tokens[this.#index + 1]?.kind === Kind.EqualsGreaterThanToken) {
      return true;
    }
    if (this.#current().kind !== Kind.OpenParenToken) {
      return false;
    }
    let depth = 0;
    for (let index = this.#index; index < this.#tokens.length; index += 1) {
      const kind = this.#tokens[index]!.kind;
      if (kind === Kind.OpenParenToken) {
        depth += 1;
        continue;
      }
      if (kind === Kind.CloseParenToken) {
        depth -= 1;
        if (depth === 0) {
          const nextKind = this.#tokens[index + 1]?.kind;
          if (nextKind === Kind.EqualsGreaterThanToken) {
            return true;
          }
          if (nextKind !== Kind.ColonToken) {
            return false;
          }
          return this.#hasEqualsGreaterThanBeforeStatementBoundary(index + 2);
        }
      }
    }
    return false;
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
    // tsgo parseParenthesizedArrowFunctionExpression/parseSimpleArrowFunctionExpression:
    // the arrow node start is captured at entry (before the param/openParen).
    const pos = this.#nodePos();
    const parameters: ParameterDeclaration[] = [];
    let type: TypeNode | undefined;
    if (isIdentifierNameKind(this.#current().kind)) {
      // tsgo parseParameter: the single-identifier ParameterDeclaration has its own
      // start at the identifier token.
      const paramPos = this.#nodePos();
      parameters.push(this.#finishNode(createParameterDeclaration(undefined, undefined, this.#parseIdentifier(), undefined, undefined, undefined), paramPos));
    } else {
      this.#expect(Kind.OpenParenToken);
      parameters.push(...this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      type = this.#parseOptionalTypeAnnotation();
    }
    this.#expect(Kind.EqualsGreaterThanToken);
    const body = this.#parseArrowBody();
    return this.#finishNode(createArrowFunction(undefined, undefined, createNodeArray(parameters), type, createToken(Kind.EqualsGreaterThanToken), body), pos);
  }

  #parseArrowBody(): ConciseBody {
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseBlock();
    }
    return this.#parseExpression();
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
    const startIndex = this.#index;
    try {
      const typeArguments = this.#parseOptionalTypeArguments();
      if (typeArguments !== undefined && this.#current().kind === Kind.OpenParenToken) {
        return typeArguments;
      }
    } catch {
    }
    this.#index = startIndex;
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
    // tsgo parseSpreadElement: node start is the '...' token.
    const pos = this.#nodePos();
    if (this.#consumeOptional(Kind.DotDotDotToken)) {
      return this.#finishNode(createSpreadElement(this.#parseExpression()), pos);
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
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#parseBlock();
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
      this.#expect(Kind.CloseBraceToken);
      const literalToken = this.#current();
      if (literalToken.kind !== Kind.TemplateMiddle && literalToken.kind !== Kind.TemplateTail) {
        throw new ParseError("Expected template continuation", literalToken);
      }
      const literalPos = this.#nodePos();
      this.#advance();
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
      const expression = this.#parseExpression();
      this.#expect(Kind.CloseBracketToken);
      return createComputedPropertyName(expression);
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
    const predicate = this.#tryParseTypePredicate();
    if (predicate !== undefined) {
      return predicate;
    }
    // tsgo parseType (2607): pos captured before parseUnionTypeOrHigher; the same
    // pos doubles as the conditional-type start (covers checkType through falseType).
    const pos = this.#nodePos();
    const checkType = this.#parseUnionType();
    if (this.#consumeOptional(Kind.ExtendsKeyword)) {
      const extendsType = this.#parseType();
      this.#expect(Kind.QuestionToken);
      const trueType = this.#parseType();
      this.#expect(Kind.ColonToken);
      const falseType = this.#parseType();
      return this.#finishNode(createConditionalTypeNode(checkType, extendsType, trueType, falseType), pos);
    }
    return checkType;
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
    if (token.kind === Kind.TypeOfKeyword) {
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
        elements.push(this.#parseType());
        this.#consumeOptional(Kind.CommaToken);
      }
      this.#expect(Kind.CloseBracketToken);
      return this.#finishNode(createTupleTypeNode(createNodeArray(elements)), pos);
    }
    if (token.kind === Kind.OpenBraceToken) {
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
      const nextKind = this.#tokens[this.#index + 1]?.kind;
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
    if (isIdentifierNameKind(token.kind)) {
      return this.#finishNode(createTypeReferenceNode(this.#parseEntityName(), this.#parseOptionalTypeArguments()), pos);
    }
    throw new ParseError(`Unexpected type token ${Kind[token.kind]}`, token);
  }

  #tryParseFunctionType(): TypeNode | undefined {
    // tsgo parseFunctionOrConstructorType (3775): pos at the '(' (captured BEFORE the
    // speculative consume). On the rewind paths NO node is created, so no stray stamp.
    const startIndex = this.#index;
    const pos = this.#nodePos();
    try {
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      if (!this.#consumeOptional(Kind.EqualsGreaterThanToken)) {
        this.#index = startIndex;
        return undefined;
      }
      return this.#finishNode(createFunctionTypeNode(undefined, createNodeArray(parameters), this.#parseType()), pos);
    } catch {
      this.#index = startIndex;
      return undefined;
    }
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
    const startIndex = this.#index;
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
      this.#index = startIndex;
      return undefined;
    }
    if (!this.#consumeOptional(Kind.IsKeyword)) {
      if (assertsModifier !== undefined) {
        return this.#finishNode(createTypePredicateNode(assertsModifier, parameterName, undefined), pos);
      }
      this.#index = startIndex;
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

  #current(): ScannedToken {
    return this.#tokens[this.#index]!;
  }

  #advance(): ScannedToken {
    const token = this.#current();
    if (token.kind !== Kind.EndOfFile) {
      this.#index += 1;
    }
    return token;
  }

  // codex-048 Stage-1a: position plumbing mirroring tsgo
  // internal/parser/parser.go finishNode (5904-5917) MINUS the error-flag bit
  // (that bit is Stage 3). nodePos is the start of the CURRENT (not-yet-consumed)
  // token; capture it BEFORE advancing. nodeEnd is token-tight: the end of the
  // just-consumed token. Per codex-048 (i) this is the token end, NOT the
  // trivia-inclusive Scanner TokenFullStart (that is a Stage-4 closure item).
  #nodePos(): number {
    return this.#current().pos;
  }

  #nodeEnd(): number {
    return this.#tokens[this.#index - 1]!.end;
  }

  #finishNode<T extends Node>(node: T, pos: number): T {
    node.pos = pos;
    node.end = this.#nodeEnd();
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
