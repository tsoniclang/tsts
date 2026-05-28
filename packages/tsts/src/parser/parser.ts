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
    const modifiers = this.#parseModifiers();
    if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword) && this.#current().kind === Kind.DefaultKeyword) {
      this.#advance();
      const defaultModifiers = createNodeArray([...modifiers, createToken(Kind.DefaultKeyword) as ModifierLike]);
      if (this.#current().kind === Kind.FunctionKeyword) {
        return this.#parseFunctionDeclaration(defaultModifiers);
      }
      if (this.#current().kind === Kind.ClassKeyword) {
        return this.#parseClassDeclaration(defaultModifiers);
      }
      throw new ParseError("Unsupported export default declaration", this.#current());
    }
    switch (this.#current().kind) {
      case Kind.ImportKeyword:
        return this.#parseImportDeclaration(modifiers);
      case Kind.ClassKeyword:
        return this.#parseClassDeclaration(modifiers);
      case Kind.InterfaceKeyword:
        return this.#parseInterfaceDeclaration(modifiers);
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
      case Kind.VarKeyword:
      case Kind.LetKeyword:
      case Kind.ConstKeyword:
        return this.#parseVariableStatement(modifiers);
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
    if (modifiers !== undefined) {
      throw new ParseError("Modifiers are not valid on expression statements", this.#current());
    }
    const expression = this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createExpressionStatement(expression);
  }

  #isTypeAliasDeclarationStart(): boolean {
    return this.#current().kind === Kind.TypeKeyword && isIdentifierNameKind(this.#tokens[this.#index + 1]?.kind ?? Kind.Unknown);
  }

  #parseImportDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
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
    return createImportDeclaration(modifiers, importClause, moduleSpecifier, undefined);
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

  #parseClassDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
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
    return createClassDeclaration(modifiers, name, typeParameters, heritageClauses, createNodeArray(members));
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
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    const thenStatement = this.#parseStatement();
    const elseStatement = this.#consumeOptional(Kind.ElseKeyword) ? this.#parseStatement() : undefined;
    return createIfStatement(expression, thenStatement, elseStatement);
  }

  #parseWhileStatement(): Statement {
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    return createWhileStatement(expression, this.#parseStatement());
  }

  #parseDoStatement(): Statement {
    this.#expect(Kind.DoKeyword);
    const statement = this.#parseStatement();
    this.#expect(Kind.WhileKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    this.#consumeOptional(Kind.SemicolonToken);
    return createDoStatement(statement, expression);
  }

  #parseForStatement(): Statement {
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
        ? createForInStatement(undefined, initializer, expression, statement)
        : createForOfStatement(undefined, initializer, expression, statement);
    }
    this.#expect(Kind.SemicolonToken);
    const condition = this.#current().kind === Kind.SemicolonToken ? undefined : this.#parseExpression();
    this.#expect(Kind.SemicolonToken);
    const incrementor = this.#current().kind === Kind.CloseParenToken ? undefined : this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    return createForStatement(initializer, condition, incrementor, this.#parseStatement());
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

  #parseTypeElement(): TypeElement {
    const modifiers = this.#parseModifiers();
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

  #parseOptionalTypeParameters(): NodeArray<TypeParameterDeclaration> | undefined {
    if (!this.#consumeOptional(Kind.LessThanToken)) {
      return undefined;
    }
    const typeParameters: TypeParameterDeclaration[] = [];
    do {
      const name = this.#parseIdentifier();
      const constraint = this.#consumeOptional(Kind.ExtendsKeyword) ? this.#parseType() : undefined;
      const defaultType = this.#consumeOptional(Kind.EqualsToken) ? this.#parseType() : undefined;
      typeParameters.push(createTypeParameterDeclaration(undefined, name, constraint, undefined, defaultType));
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
    const expression = this.#parseHeritageExpression();
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
    do {
      typeArguments.push(this.#parseType());
    } while (this.#consumeOptional(Kind.CommaToken));
    this.#expectGreaterThan();
    return createNodeArray(typeArguments);
  }

  #parseVariableStatement(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    const declarationList = this.#parseVariableDeclarationList();
    this.#consumeOptional(Kind.SemicolonToken);
    return createVariableStatement(modifiers, declarationList);
  }

  #parseVariableDeclarationList(): ReturnType<typeof createVariableDeclarationList> {
    const flags = this.#parseVariableDeclarationListFlags();
    const declarations: VariableDeclaration[] = [];
    do {
      declarations.push(this.#parseVariableDeclaration());
    } while (this.#consumeOptional(Kind.CommaToken));
    return createVariableDeclarationList(createNodeArray(declarations), flags);
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
    const type = this.#parseOptionalTypeAnnotation();
    const initializer = this.#consumeOptional(Kind.EqualsToken) ? this.#parseExpression() : undefined;
    return createVariableDeclaration(name, undefined, type, initializer);
  }

  #parseFunctionDeclaration(modifiers: NodeArray<ModifierLike> | undefined): Statement {
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#parseBlock();
    return createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body);
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
    const expression = this.#current().kind === Kind.SemicolonToken || this.#current().kind === Kind.CloseBraceToken
      ? undefined
      : this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createReturnStatement(expression);
  }

  #parseThrowStatement(): Statement {
    this.#expect(Kind.ThrowKeyword);
    const expression = this.#parseExpression();
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
      variableDeclaration = createVariableDeclaration(name, undefined, type, undefined);
      this.#expect(Kind.CloseParenToken);
    }
    return createCatchClause(variableDeclaration, this.#parseBlock());
  }

  #parseSwitchStatement(): Statement {
    this.#expect(Kind.SwitchKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    this.#expect(Kind.OpenBraceToken);
    const clauses: CaseOrDefaultClause[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
      if (this.#consumeOptional(Kind.CaseKeyword)) {
        const caseExpression = this.#parseExpression();
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

  #parseExpression(precedence: number = 0): Expression {
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
      left = createBinaryExpression(undefined, left, undefined, token as BinaryOperatorToken, right);
    }
    while (this.#current().kind === Kind.AsKeyword || this.#current().kind === Kind.SatisfiesKeyword) {
      const operator = this.#current().kind;
      this.#advance();
      const type = this.#parseType();
      left = operator === Kind.AsKeyword ? createAsExpression(left, type) : createSatisfiesExpression(left, type);
    }
    if (precedence === 0 && this.#consumeOptional(Kind.QuestionToken)) {
      const whenTrue = this.#parseExpression();
      this.#expect(Kind.ColonToken);
      const whenFalse = this.#parseExpression();
      left = createConditionalExpression(left, createToken(Kind.QuestionToken), whenTrue, createToken(Kind.ColonToken), whenFalse);
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
    const parameters: ParameterDeclaration[] = [];
    let type: TypeNode | undefined;
    if (isIdentifierNameKind(this.#current().kind)) {
      parameters.push(createParameterDeclaration(undefined, undefined, this.#parseIdentifier(), undefined, undefined, undefined));
    } else {
      this.#expect(Kind.OpenParenToken);
      parameters.push(...this.#parseParameterList());
      this.#expect(Kind.CloseParenToken);
      type = this.#parseOptionalTypeAnnotation();
    }
    this.#expect(Kind.EqualsGreaterThanToken);
    const body = this.#parseArrowBody();
    return createArrowFunction(undefined, undefined, createNodeArray(parameters), type, createToken(Kind.EqualsGreaterThanToken), body);
  }

  #parseArrowBody(): ConciseBody {
    if (this.#current().kind === Kind.OpenBraceToken) {
      return this.#parseBlock();
    }
    return this.#parseExpression();
  }

  #parseUnaryExpression(): Expression {
    const token = this.#current();
    switch (token.kind) {
      case Kind.PlusToken:
      case Kind.MinusToken:
      case Kind.TildeToken:
      case Kind.ExclamationToken:
      case Kind.PlusPlusToken:
      case Kind.MinusMinusToken:
        this.#advance();
        return createPrefixUnaryExpression(token.kind, this.#parseUnaryExpression());
      case Kind.NewKeyword:
        return this.#parseNewExpression();
      case Kind.DeleteKeyword:
        this.#advance();
        return createDeleteExpression(this.#parseUnaryExpression());
      case Kind.TypeOfKeyword:
        this.#advance();
        return createTypeOfExpression(this.#parseUnaryExpression());
      case Kind.VoidKeyword:
        this.#advance();
        return createVoidExpression(this.#parseUnaryExpression());
      case Kind.AwaitKeyword:
        this.#advance();
        return createAwaitExpression(this.#parseUnaryExpression());
      default:
        return this.#parsePostfixExpression();
    }
  }

  #parsePostfixExpression(): Expression {
    const expression = this.#parseLeftHandSideExpression();
    if (this.#current().kind === Kind.PlusPlusToken || this.#current().kind === Kind.MinusMinusToken) {
      const operator = this.#current().kind as Kind.PlusPlusToken | Kind.MinusMinusToken;
      this.#advance();
      return createPostfixUnaryExpression(expression, operator);
    }
    return expression;
  }

  #parseNewExpression(): Expression {
    this.#expect(Kind.NewKeyword);
    const expression = this.#parseHeritageExpression();
    const typeArguments = this.#parseOptionalTypeArguments();
    let arguments_: NodeArray<Expression> | undefined;
    if (this.#consumeOptional(Kind.OpenParenToken)) {
      arguments_ = createNodeArray(this.#parseArgumentList());
      this.#expect(Kind.CloseParenToken);
    }
    return this.#parseMemberSuffixes(createNewExpression(expression, typeArguments, arguments_));
  }

  #parseLeftHandSideExpression(): Expression {
    return this.#parseMemberSuffixes(this.#parsePrimaryExpression());
  }

  #parseMemberSuffixes(initialExpression: Expression): Expression {
    let expression = initialExpression;
    while (true) {
      const questionDotToken = this.#consumeOptional(Kind.QuestionDotToken) ? createToken(Kind.QuestionDotToken) : undefined;
      if (questionDotToken !== undefined && this.#current().kind !== Kind.OpenParenToken && this.#current().kind !== Kind.OpenBracketToken) {
        expression = createPropertyAccessExpression(expression, questionDotToken, this.#parseMemberName(), NodeFlags.None);
        continue;
      }
      if (questionDotToken === undefined && this.#consumeOptional(Kind.DotToken)) {
        expression = createPropertyAccessExpression(expression, undefined, this.#parseMemberName(), NodeFlags.None);
        continue;
      }
      const typeArguments = this.#tryParseCallTypeArguments();
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
      if (questionDotToken !== undefined && this.#current().kind === Kind.OpenBracketToken || questionDotToken === undefined && this.#consumeOptional(Kind.OpenBracketToken)) {
        if (questionDotToken !== undefined) {
          this.#expect(Kind.OpenBracketToken);
        }
        expression = createElementAccessExpression(expression, questionDotToken, this.#parseExpression(), NodeFlags.None);
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
      case Kind.NullKeyword:
      case Kind.SuperKeyword:
      case Kind.ThisKeyword:
      case Kind.TrueKeyword:
        this.#advance();
        return createKeywordExpression(token.kind as Kind.FalseKeyword | Kind.NullKeyword | Kind.SuperKeyword | Kind.ThisKeyword | Kind.TrueKeyword);
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
        this.#advance();
        return createNoSubstitutionTemplateLiteral(unquoteTemplate(token.text), 0);
      case Kind.TemplateHead:
        return this.#parseTemplateExpression();
      case Kind.FunctionKeyword:
        return this.#parseFunctionExpression();
      case Kind.OpenParenToken: {
        this.#advance();
        const expression = this.#parseExpression();
        this.#expect(Kind.CloseParenToken);
        return createParenthesizedExpression(expression);
      }
      default:
        if (isContextualExpressionIdentifierKind(token.kind)) {
          this.#advance();
          return createIdentifier(token.text);
        }
        throw new ParseError(`Unexpected token ${Kind[token.kind]}`, token);
    }
  }

  #parseFunctionExpression(): Expression {
    this.#expect(Kind.FunctionKeyword);
    const asteriskToken = this.#consumeOptional(Kind.AsteriskToken) ? createToken(Kind.AsteriskToken) : undefined;
    const name = isIdentifierNameKind(this.#current().kind) ? this.#parseIdentifier() : undefined;
    const typeParameters = this.#parseOptionalTypeParameters();
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#parseBlock();
    return createFunctionExpression(undefined, asteriskToken, name, typeParameters, createNodeArray(parameters), type, body);
  }

  #parseTemplateExpression(): Expression {
    const headToken = this.#expect(Kind.TemplateHead);
    const spans = [];
    while (true) {
      const expression = this.#parseExpression();
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
      const name = this.#parsePropertyName();
      if (this.#consumeOptional(Kind.ColonToken)) {
        properties.push(createPropertyAssignment(undefined, name, undefined, undefined as never, this.#parseExpression()));
      } else {
        properties.push(createShorthandPropertyAssignment(undefined, name, undefined, undefined as never, undefined, undefined));
      }
      this.#consumeOptional(Kind.CommaToken);
    }
    const closeBrace = this.#expect(Kind.CloseBraceToken);
    return createObjectLiteralExpression(createNodeArray(properties), this.#sourceText.slice(openBrace.pos, closeBrace.end).includes("\n"));
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
      this.#advance();
      return createNumericLiteral(token.text, 0) as PropertyName;
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
    while (this.#current().kind === Kind.OpenBracketToken) {
      this.#advance();
      if (this.#consumeOptional(Kind.CloseBracketToken)) {
        type = createArrayTypeNode(type);
        continue;
      }
      const indexType = this.#parseType();
      this.#expect(Kind.CloseBracketToken);
      type = createIndexedAccessTypeNode(type, indexType);
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
      return createTypeQueryNode(this.#parseEntityName(), this.#parseOptionalTypeArguments());
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
        elements.push(this.#parseType());
        this.#consumeOptional(Kind.CommaToken);
      }
      this.#expect(Kind.CloseBracketToken);
      return createTupleTypeNode(createNodeArray(elements));
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
      return createTypeLiteralNode(createNodeArray(members));
    }
    if (keywordTypeKinds.has(token.kind)) {
      this.#advance();
      return createKeywordTypeNode(token.kind as KeywordTypeSyntaxKind);
    }
    if (token.kind === Kind.StringLiteral) {
      return createLiteralTypeNode(this.#parseStringLiteralExpression());
    }
    if (token.kind === Kind.NumericLiteral) {
      this.#advance();
      return createLiteralTypeNode(createNumericLiteral(token.text, 0));
    }
    if (token.kind === Kind.BigIntLiteral) {
      this.#advance();
      return createLiteralTypeNode(createBigIntLiteral(token.text, 0));
    }
    // Negative numeric / bigint literal type nodes only (TS-Go: KindMinusToken
    // when lookahead is a numeric/bigint literal -> LiteralTypeNode wrapping a
    // PrefixUnaryExpression). Not a general unary-expression-in-type parser.
    if (token.kind === Kind.MinusToken) {
      const nextKind = this.#tokens[this.#index + 1]?.kind;
      if (nextKind === Kind.NumericLiteral || nextKind === Kind.BigIntLiteral) {
        this.#advance();
        const literalToken = this.#advance();
        const literal = literalToken.kind === Kind.BigIntLiteral
          ? createBigIntLiteral(literalToken.text, 0)
          : createNumericLiteral(literalToken.text, 0);
        return createLiteralTypeNode(createPrefixUnaryExpression(Kind.MinusToken, literal));
      }
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

  #tryParseFunctionType(): TypeNode | undefined {
    const startIndex = this.#index;
    try {
      this.#expect(Kind.OpenParenToken);
      const parameters = this.#parseParameterList();
      this.#expect(Kind.CloseParenToken);
      if (!this.#consumeOptional(Kind.EqualsGreaterThanToken)) {
        this.#index = startIndex;
        return undefined;
      }
      return createFunctionTypeNode(undefined, createNodeArray(parameters), this.#parseType());
    } catch {
      this.#index = startIndex;
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

  #tryParseTypePredicate(): TypeNode | undefined {
    const startIndex = this.#index;
    const assertsModifier = this.#consumeOptional(Kind.AssertsKeyword) ? createToken(Kind.AssertsKeyword) : undefined;
    let parameterName: ReturnType<typeof createThisTypeNode> | Identifier;
    if (this.#current().kind === Kind.ThisKeyword) {
      this.#advance();
      parameterName = createThisTypeNode();
    } else if (isIdentifierNameKind(this.#current().kind)) {
      parameterName = this.#parseIdentifier();
    } else {
      this.#index = startIndex;
      return undefined;
    }
    if (!this.#consumeOptional(Kind.IsKeyword)) {
      if (assertsModifier !== undefined) {
        return createTypePredicateNode(assertsModifier, parameterName, undefined);
      }
      this.#index = startIndex;
      return undefined;
    }
    return createTypePredicateNode(assertsModifier, parameterName, this.#parseType());
  }

  #parseEntityName(): EntityName {
    let name: EntityName = this.#parseIdentifier();
    while (this.#consumeOptional(Kind.DotToken)) {
      name = createQualifiedName(name, this.#parseIdentifier());
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
