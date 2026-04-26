import {
  Kind,
  NodeFlags,
  createArrowFunction,
  createArrayTypeNode,
  createArrayLiteralExpression,
  createBinaryExpression,
  createBlock,
  createClassDeclaration,
  createConstructorDeclaration,
  createExportDeclaration,
  createExportSpecifier,
  createExpressionStatement,
  createExpressionWithTypeArguments,
  createFunctionDeclaration,
  createHeritageClause,
  createIfStatement,
  createIdentifier,
  createImportClause,
  createImportDeclaration,
  createImportSpecifier,
  createInterfaceDeclaration,
  createKeywordTypeNode,
  createCallExpression,
  createKeywordExpression,
  createMethodDeclaration,
  createMethodSignatureDeclaration,
  createNamedExports,
  createNamedImports,
  createNamespaceImport,
  createNodeArray,
  createNumericLiteral,
  createObjectLiteralExpression,
  createParameterDeclaration,
  createParenthesizedExpression,
  createParenthesizedTypeNode,
  createPropertyAssignment,
  createPropertyAccessExpression,
  createPropertyDeclaration,
  createPropertySignatureDeclaration,
  createReturnStatement,
  createSemicolonClassElement,
  createShorthandPropertyAssignment,
  createSourceFile,
  createStringLiteral,
  createToken,
  createTypeAliasDeclaration,
  createTypeLiteralNode,
  createTypeParameterDeclaration,
  createTypeReferenceNode,
  createUnionTypeNode,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
  isBinaryOperatorToken,
  type BinaryOperator,
  type BinaryOperatorToken,
  type BindingName,
  type Block,
  type ConciseBody,
  type ClassElement,
  type Expression,
  type ExpressionWithTypeArguments,
  type Identifier,
  type ImportSpecifier,
  type KeywordTypeSyntaxKind,
  type ModifierSyntaxKind,
  type ModifierLike,
  type ModuleExportName,
  type NamedImportBindings,
  type NodeArray,
  type ObjectLiteralElementLike,
  type ParameterDeclaration,
  type ExclamationToken,
  type PropertyName,
  type QuestionToken,
  type SourceFile,
  type Statement,
  type TypeElement,
  type TypeNode,
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
    switch (this.#current().kind) {
      case Kind.ImportKeyword:
        return this.#parseImportDeclaration(modifiers);
      case Kind.ClassKeyword:
        return this.#parseClassDeclaration(modifiers);
      case Kind.InterfaceKeyword:
        return this.#parseInterfaceDeclaration(modifiers);
      case Kind.TypeKeyword:
        return this.#parseTypeAliasDeclaration(modifiers);
      case Kind.IfKeyword:
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on if statements", this.#current());
        }
        return this.#parseIfStatement();
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
      case Kind.OpenBraceToken:
        if (modifiers !== undefined && hasModifier(modifiers, Kind.ExportKeyword)) {
          return this.#parseExportDeclaration(modifiers);
        }
        if (modifiers !== undefined) {
          throw new ParseError("Modifiers are not valid on blocks", this.#current());
        }
        return this.#parseBlock();
    }
    if (modifiers !== undefined) {
      throw new ParseError("Modifiers are not valid on expression statements", this.#current());
    }
    const expression = this.#parseExpression();
    this.#consumeOptional(Kind.SemicolonToken);
    return createExpressionStatement(expression);
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
    let name: Identifier | undefined;
    let namedBindings: NamedImportBindings | undefined;
    if (this.#current().kind === Kind.Identifier) {
      name = this.#parseIdentifier();
      if (this.#consumeOptional(Kind.CommaToken)) {
        namedBindings = this.#parseNamedImportBindings();
      }
    } else {
      namedBindings = this.#parseNamedImportBindings();
    }
    return createImportClause(undefined, name, namedBindings);
  }

  #parseNamedImportBindings(): NamedImportBindings {
    if (this.#consumeOptional(Kind.AsteriskToken)) {
      this.#expect(Kind.AsKeyword);
      return createNamespaceImport(this.#parseIdentifier());
    }
    this.#expect(Kind.OpenBraceToken);
    const elements: ImportSpecifier[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken) {
      const firstName = this.#parseModuleExportName();
      const propertyName = this.#consumeOptional(Kind.AsKeyword) ? firstName : undefined;
      const name = propertyName === undefined ? firstName : this.#parseIdentifier();
      elements.push(createImportSpecifier(false, propertyName, name as Identifier));
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBraceToken);
    return createNamedImports(createNodeArray(elements));
  }

  #parseExportDeclaration(modifiers: NodeArray<ModifierLike>): Statement {
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
    while (modifierKinds.has(this.#current().kind)) {
      modifiers.push(createToken(this.#current().kind as ModifierSyntaxKind) as ModifierLike);
      this.#advance();
    }
    return modifiers.length === 0 ? undefined : createNodeArray(modifiers);
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

  #parseIfStatement(): Statement {
    this.#expect(Kind.IfKeyword);
    this.#expect(Kind.OpenParenToken);
    const expression = this.#parseExpression();
    this.#expect(Kind.CloseParenToken);
    const thenStatement = this.#parseStatement();
    const elseStatement = this.#consumeOptional(Kind.ElseKeyword) ? this.#parseStatement() : undefined;
    return createIfStatement(expression, thenStatement, elseStatement);
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
    this.#expect(Kind.GreaterThanToken);
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
    this.#expect(Kind.GreaterThanToken);
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
    const name = this.#current().kind === Kind.Identifier ? this.#parseIdentifier() : undefined;
    this.#expect(Kind.OpenParenToken);
    const parameters = this.#parseParameterList();
    this.#expect(Kind.CloseParenToken);
    const type = this.#parseOptionalTypeAnnotation();
    const body = this.#parseBlock();
    return createFunctionDeclaration(modifiers, asteriskToken, name, undefined, createNodeArray(parameters), type, body);
  }

  #parseParameterList(): ParameterDeclaration[] {
    const parameters: ParameterDeclaration[] = [];
    if (this.#current().kind === Kind.CloseParenToken) {
      return parameters;
    }
    do {
      parameters.push(this.#parseParameterDeclaration());
    } while (this.#consumeOptional(Kind.CommaToken));
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

  #parseExpression(precedence = 0): Expression {
    if (precedence === 0 && this.#isArrowFunctionStart()) {
      return this.#parseArrowFunction();
    }
    let left = this.#parseLeftHandSideExpression();
    while (true) {
      const operatorToken = this.#current();
      const operatorPrecedence = binaryPrecedence.get(operatorToken.kind) ?? 0;
      if (operatorPrecedence <= precedence) {
        return left;
      }
      this.#advance();
      const right = this.#parseExpression(operatorPrecedence);
      const token = createToken(operatorToken.kind as BinaryOperator);
      if (!isBinaryOperatorToken(token)) {
        throw new ParseError("Expected binary operator", operatorToken);
      }
      left = createBinaryExpression(undefined, left, undefined, token as BinaryOperatorToken, right);
    }
  }

  #isArrowFunctionStart(): boolean {
    if (this.#current().kind === Kind.Identifier && this.#tokens[this.#index + 1]?.kind === Kind.EqualsGreaterThanToken) {
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
    if (this.#current().kind === Kind.Identifier) {
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

  #parseLeftHandSideExpression(): Expression {
    let expression = this.#parsePrimaryExpression();
    while (true) {
      if (this.#consumeOptional(Kind.DotToken)) {
        expression = createPropertyAccessExpression(expression, undefined, this.#parseIdentifier(), NodeFlags.None);
        continue;
      }
      if (this.#consumeOptional(Kind.OpenParenToken)) {
        expression = createCallExpression(expression, undefined, undefined, createNodeArray(this.#parseArgumentList()), NodeFlags.None);
        this.#expect(Kind.CloseParenToken);
        continue;
      }
      return expression;
    }
  }

  #parseArgumentList(): Expression[] {
    const expressions: Expression[] = [];
    if (this.#current().kind === Kind.CloseParenToken) {
      return expressions;
    }
    do {
      expressions.push(this.#parseExpression());
    } while (this.#consumeOptional(Kind.CommaToken));
    return expressions;
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
      case Kind.StringLiteral:
        this.#advance();
        return createStringLiteral(unquote(token.text), 0);
      case Kind.OpenParenToken: {
        this.#advance();
        const expression = this.#parseExpression();
        this.#expect(Kind.CloseParenToken);
        return createParenthesizedExpression(expression);
      }
      default:
        throw new ParseError(`Unexpected token ${Kind[token.kind]}`, token);
    }
  }

  #parseArrayLiteralExpression(): Expression {
    this.#expect(Kind.OpenBracketToken);
    const elements: Expression[] = [];
    while (this.#current().kind !== Kind.CloseBracketToken && this.#current().kind !== Kind.EndOfFile) {
      elements.push(this.#parseExpression());
      this.#consumeOptional(Kind.CommaToken);
    }
    this.#expect(Kind.CloseBracketToken);
    return createArrayLiteralExpression(createNodeArray(elements), this.#sourceText.includes("\n"));
  }

  #parseObjectLiteralExpression(): Expression {
    const openBrace = this.#expect(Kind.OpenBraceToken);
    const properties: ObjectLiteralElementLike[] = [];
    while (this.#current().kind !== Kind.CloseBraceToken && this.#current().kind !== Kind.EndOfFile) {
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
    return this.#parseIdentifier();
  }

  #parsePropertyName(): PropertyName {
    const token = this.#current();
    if (token.kind === Kind.StringLiteral) {
      return this.#parseStringLiteralExpression() as PropertyName;
    }
    if (token.kind === Kind.NumericLiteral) {
      this.#advance();
      return createNumericLiteral(token.text, 0) as PropertyName;
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
    const token = this.#expect(Kind.Identifier);
    return createIdentifier(token.text);
  }

  #parseOptionalTypeAnnotation(): TypeNode | undefined {
    if (!this.#consumeOptional(Kind.ColonToken)) {
      return undefined;
    }
    return this.#parseType();
  }

  #parseType(): TypeNode {
    const types = [this.#parseArrayType()];
    while (this.#consumeOptional(Kind.BarToken)) {
      types.push(this.#parseArrayType());
    }
    return types.length === 1 ? types[0]! : createUnionTypeNode(createNodeArray(types));
  }

  #parseArrayType(): TypeNode {
    let type = this.#parsePrimaryType();
    while (this.#current().kind === Kind.OpenBracketToken && this.#tokens[this.#index + 1]?.kind === Kind.CloseBracketToken) {
      this.#advance();
      this.#advance();
      type = createArrayTypeNode(type);
    }
    return type;
  }

  #parsePrimaryType(): TypeNode {
    const token = this.#current();
    if (token.kind === Kind.OpenParenToken) {
      this.#advance();
      const type = this.#parseType();
      this.#expect(Kind.CloseParenToken);
      return createParenthesizedTypeNode(type);
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
    if (token.kind === Kind.Identifier) {
      return createTypeReferenceNode(this.#parseIdentifier(), this.#parseOptionalTypeArguments());
    }
    throw new ParseError(`Unexpected type token ${Kind[token.kind]}`, token);
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
  return text.slice(1, -1);
}

function hasModifier(modifiers: NodeArray<ModifierLike>, kind: Kind): boolean {
  return modifiers.some(modifier => modifier.kind === kind);
}

export function parseSourceFile(sourceText: string, options?: ParseSourceFileOptions): SourceFile {
  return new Parser(sourceText, options).parseSourceFile();
}
