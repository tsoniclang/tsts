import {
  Kind,
  NodeFlags,
  isArrayLiteralExpression,
  isArrowFunction,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isClassDeclaration,
  isConstructorDeclaration,
  isExpressionStatement,
  isExportDeclaration,
  isFunctionDeclaration,
  isHeritageClause,
  isIfStatement,
  isInterfaceDeclaration,
  isIdentifier,
  isImportDeclaration,
  isNamedExports,
  isNamedImports,
  isNamespaceImport,
  isNumericLiteral,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPropertyAssignment,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isShorthandPropertyAssignment,
  isReturnStatement,
  isStringLiteral,
  isTypeAliasDeclaration,
  isVariableStatement,
  type BinaryOperatorToken,
  type ArrowFunction,
  type ClassDeclaration,
  type ClassElement,
  type ConstructorDeclaration,
  type Expression,
  type ExportDeclaration,
  type FunctionDeclaration,
  type HeritageClause,
  type ImportClause,
  type ImportDeclaration,
  type ImportSpecifier,
  type MethodDeclaration,
  type ModifierLike,
  type ModuleExportName,
  type NamedExportBindings,
  type NamedImportBindings,
  type Node,
  type NodeArray,
  type ObjectLiteralElementLike,
  type ParameterDeclaration,
  type PropertyDeclaration,
  type SourceFile,
  type Statement,
  type VariableDeclaration,
  type VariableDeclarationList,
} from "../ast/index.js";

const binaryOperatorText = new Map<Kind, string>([
  [Kind.AsteriskAsteriskToken, "**"],
  [Kind.AsteriskToken, "*"],
  [Kind.SlashToken, "/"],
  [Kind.PercentToken, "%"],
  [Kind.PlusToken, "+"],
  [Kind.MinusToken, "-"],
  [Kind.LessThanLessThanToken, "<<"],
  [Kind.GreaterThanGreaterThanToken, ">>"],
  [Kind.GreaterThanGreaterThanGreaterThanToken, ">>>"],
  [Kind.LessThanToken, "<"],
  [Kind.LessThanEqualsToken, "<="],
  [Kind.GreaterThanToken, ">"],
  [Kind.GreaterThanEqualsToken, ">="],
  [Kind.InstanceOfKeyword, "instanceof"],
  [Kind.InKeyword, "in"],
  [Kind.EqualsEqualsToken, "=="],
  [Kind.EqualsEqualsEqualsToken, "==="],
  [Kind.ExclamationEqualsToken, "!="],
  [Kind.ExclamationEqualsEqualsToken, "!=="],
  [Kind.AmpersandToken, "&"],
  [Kind.CaretToken, "^"],
  [Kind.BarToken, "|"],
  [Kind.AmpersandAmpersandToken, "&&"],
  [Kind.BarBarToken, "||"],
  [Kind.QuestionQuestionToken, "??"],
  [Kind.EqualsToken, "="],
  [Kind.PlusEqualsToken, "+="],
  [Kind.MinusEqualsToken, "-="],
  [Kind.AsteriskEqualsToken, "*="],
  [Kind.AsteriskAsteriskEqualsToken, "**="],
  [Kind.SlashEqualsToken, "/="],
  [Kind.PercentEqualsToken, "%="],
  [Kind.AmpersandEqualsToken, "&="],
  [Kind.BarEqualsToken, "|="],
  [Kind.CaretEqualsToken, "^="],
  [Kind.LessThanLessThanEqualsToken, "<<="],
  [Kind.GreaterThanGreaterThanEqualsToken, ">>="],
  [Kind.GreaterThanGreaterThanGreaterThanEqualsToken, ">>>="],
  [Kind.AmpersandAmpersandEqualsToken, "&&="],
  [Kind.BarBarEqualsToken, "||="],
  [Kind.QuestionQuestionEqualsToken, "??="],
]);

export interface PrintOptions {
  readonly newline?: string;
  readonly indentText?: string;
}

interface PrintContext {
  readonly newline: string;
  readonly indentText: string;
}

export function printSourceFile(sourceFile: SourceFile, options: PrintOptions = {}): string {
  const context: PrintContext = {
    newline: options.newline ?? "\n",
    indentText: options.indentText ?? "  ",
  };
  return sourceFile.statements.flatMap(statement => {
    const printed = printStatement(statement, context, 0);
    return printed === undefined ? [] : [printed];
  }).join(context.newline);
}

export function printNode(node: Node): string {
  if (isExpressionStatement(node)) {
    return printStatement(node, { newline: "\n", indentText: "  " }, 0) ?? "";
  }
  return printExpression(node as Expression);
}

function printStatement(statement: Statement, context: PrintContext, depth: number): string | undefined {
  if (isExpressionStatement(statement)) {
    return `${printExpression(statement.expression)};`;
  }
  if (isVariableStatement(statement)) {
    return printVariableStatement(statement.modifiers, statement.declarationList);
  }
  if (isImportDeclaration(statement)) {
    return printImportDeclaration(statement);
  }
  if (isExportDeclaration(statement)) {
    return printExportDeclaration(statement);
  }
  if (isFunctionDeclaration(statement)) {
    return printFunctionDeclaration(statement, context, depth);
  }
  if (isClassDeclaration(statement)) {
    return printClassDeclaration(statement, context, depth);
  }
  if (isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement)) {
    return undefined;
  }
  if (isIfStatement(statement)) {
    return printIfStatement(statement, context, depth);
  }
  if (isReturnStatement(statement)) {
    return statement.expression === undefined ? "return;" : `return ${printExpression(statement.expression)};`;
  }
  if (isBlock(statement)) {
    return printBlock(statement.statements, context, depth);
  }
  throw new Error(`Unsupported statement kind ${Kind[statement.kind]}`);
}

function printImportDeclaration(importDeclaration: ImportDeclaration): string {
  const moduleSpecifier = printExpression(importDeclaration.moduleSpecifier);
  if (importDeclaration.importClause === undefined) {
    return `import ${moduleSpecifier};`;
  }
  return `import ${printImportClause(importDeclaration.importClause)} from ${moduleSpecifier};`;
}

function printImportClause(importClause: ImportClause): string {
  const parts: string[] = [];
  if (importClause.name !== undefined) {
    parts.push(importClause.name.text);
  }
  if (importClause.namedBindings !== undefined) {
    parts.push(printNamedImportBindings(importClause.namedBindings));
  }
  return parts.join(", ");
}

function printNamedImportBindings(namedBindings: NamedImportBindings): string {
  if (isNamespaceImport(namedBindings)) {
    return `* as ${namedBindings.name.text}`;
  }
  if (isNamedImports(namedBindings)) {
    return `{ ${namedBindings.elements.map(printImportSpecifier).join(", ")} }`;
  }
  throw new Error(`Unsupported named import bindings kind ${Kind[(namedBindings as Node).kind]}`);
}

function printImportSpecifier(specifier: ImportSpecifier): string {
  if (specifier.propertyName === undefined) {
    return specifier.name.text;
  }
  return `${printModuleExportName(specifier.propertyName)} as ${specifier.name.text}`;
}

function printExportDeclaration(exportDeclaration: ExportDeclaration): string {
  const exportClause = exportDeclaration.exportClause === undefined ? "*" : printNamedExportBindings(exportDeclaration.exportClause);
  const moduleSpecifier = exportDeclaration.moduleSpecifier === undefined ? "" : ` from ${printExpression(exportDeclaration.moduleSpecifier)}`;
  return `export ${exportClause}${moduleSpecifier};`;
}

function printNamedExportBindings(namedBindings: NamedExportBindings): string {
  if (isNamedExports(namedBindings)) {
    return `{ ${namedBindings.elements.map(specifier => {
      if (specifier.propertyName === undefined) {
        return printModuleExportName(specifier.name);
      }
      return `${printModuleExportName(specifier.propertyName)} as ${printModuleExportName(specifier.name)}`;
    }).join(", ")} }`;
  }
  throw new Error(`Unsupported named export bindings kind ${Kind[namedBindings.kind]}`);
}

function printVariableStatement(modifiers: NodeArray<ModifierLike> | undefined, declarationList: VariableDeclarationList): string {
  const prefix = printModifierPrefix(modifiers);
  return `${prefix}${printVariableDeclarationKind(declarationList)} ${declarationList.declarations.map(printVariableDeclaration).join(", ")};`;
}

function printVariableDeclarationKind(declarationList: VariableDeclarationList): string {
  if ((declarationList.flags & NodeFlags.Const) !== 0) {
    return "const";
  }
  if ((declarationList.flags & NodeFlags.Let) !== 0) {
    return "let";
  }
  return "var";
}

function printVariableDeclaration(declaration: VariableDeclaration): string {
  const name = printBindingName(declaration.name);
  return declaration.initializer === undefined ? name : `${name} = ${printExpression(declaration.initializer)}`;
}

function printFunctionDeclaration(functionDeclaration: FunctionDeclaration, context: PrintContext, depth: number): string {
  const prefix = printModifierPrefix(functionDeclaration.modifiers);
  const asterisk = functionDeclaration.asteriskToken === undefined ? "" : "*";
  const name = functionDeclaration.name === undefined ? "" : ` ${functionDeclaration.name.text}`;
  const parameters = functionDeclaration.parameters.map(printParameterDeclaration).join(", ");
  const body = functionDeclaration.body === undefined ? ";" : ` ${printBlock(functionDeclaration.body.statements, context, depth)}`;
  return `${prefix}function${asterisk}${name}(${parameters})${body}`;
}

function printClassDeclaration(classDeclaration: ClassDeclaration, context: PrintContext, depth: number): string {
  const prefix = printDeclarationModifierPrefix(classDeclaration.modifiers);
  const name = classDeclaration.name === undefined ? "" : ` ${classDeclaration.name.text}`;
  const heritage = printClassHeritage(classDeclaration.heritageClauses);
  return `${prefix}class${name}${heritage} ${printClassBlock(classDeclaration.members, context, depth)}`;
}

function printClassHeritage(heritageClauses: NodeArray<HeritageClause> | undefined): string {
  if (heritageClauses === undefined) {
    return "";
  }
  const extendsClause = heritageClauses.find(clause => isHeritageClause(clause) && clause.token === Kind.ExtendsKeyword);
  if (extendsClause === undefined || extendsClause.types.length === 0) {
    return "";
  }
  return ` extends ${printExpression(extendsClause.types[0]!.expression)}`;
}

function printClassBlock(members: NodeArray<ClassElement>, context: PrintContext, depth: number): string {
  if (members.length === 0) {
    return "{}";
  }
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  const body = members.flatMap(member => {
    const printed = printClassElement(member, context, depth + 1);
    return printed === undefined ? [] : [`${childIndent}${printed}`];
  }).join(context.newline);
  return body.length === 0 ? "{}" : `{${context.newline}${body}${context.newline}${currentIndent}}`;
}

function printClassElement(member: ClassElement, context: PrintContext, depth: number): string | undefined {
  if (isConstructorDeclaration(member)) {
    return printConstructorDeclaration(member, context, depth);
  }
  if (isPropertyDeclaration(member)) {
    return printPropertyDeclaration(member);
  }
  if (member.kind === Kind.MethodDeclaration) {
    return printMethodDeclaration(member as MethodDeclaration, context, depth);
  }
  if (member.kind === Kind.SemicolonClassElement) {
    return ";";
  }
  throw new Error(`Unsupported class element kind ${Kind[member.kind]}`);
}

function printConstructorDeclaration(constructorDeclaration: ConstructorDeclaration, context: PrintContext, depth: number): string {
  const parameters = constructorDeclaration.parameters.map(printParameterDeclaration).join(", ");
  const body = constructorDeclaration.body === undefined ? "{}" : printBlock(constructorDeclaration.body.statements, context, depth);
  return `constructor(${parameters}) ${body}`;
}

function printMethodDeclaration(methodDeclaration: MethodDeclaration, context: PrintContext, depth: number): string {
  const prefix = printMemberModifierPrefix(methodDeclaration.modifiers);
  const parameters = methodDeclaration.parameters.map(printParameterDeclaration).join(", ");
  const body = methodDeclaration.body === undefined ? "{}" : printBlock(methodDeclaration.body.statements, context, depth);
  return `${prefix}${printPropertyName(methodDeclaration.name)}(${parameters}) ${body}`;
}

function printPropertyDeclaration(propertyDeclaration: PropertyDeclaration): string | undefined {
  if (hasModifier(propertyDeclaration.modifiers, Kind.DeclareKeyword)) {
    return undefined;
  }
  const prefix = printMemberModifierPrefix(propertyDeclaration.modifiers);
  const initializer = propertyDeclaration.initializer === undefined ? "" : ` = ${printExpression(propertyDeclaration.initializer)}`;
  return `${prefix}${printPropertyName(propertyDeclaration.name)}${initializer};`;
}

function printIfStatement(ifStatement: Extract<Statement, { readonly kind: Kind.IfStatement }>, context: PrintContext, depth: number): string {
  const thenStatement = printEmbeddedStatement(ifStatement.thenStatement, context, depth);
  const elseStatement = ifStatement.elseStatement === undefined ? "" : ` else ${printEmbeddedStatement(ifStatement.elseStatement, context, depth)}`;
  return `if (${printExpression(ifStatement.expression)}) ${thenStatement}${elseStatement}`;
}

function printEmbeddedStatement(statement: Statement, context: PrintContext, depth: number): string {
  if (isBlock(statement)) {
    return printBlock(statement.statements, context, depth);
  }
  const printed = printStatement(statement, context, depth + 1);
  if (printed === undefined) {
    return "{}";
  }
  return `{${context.newline}${context.indentText.repeat(depth + 1)}${printed}${context.newline}${context.indentText.repeat(depth)}}`;
}

function printBlock(statements: NodeArray<Statement>, context: PrintContext, depth: number): string {
  if (statements.length === 0) {
    return "{}";
  }
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  const body = statements.flatMap(statement => {
    const printed = printStatement(statement, context, depth + 1);
    return printed === undefined ? [] : [`${childIndent}${printed}`];
  }).join(context.newline);
  return `{${context.newline}${body}${context.newline}${currentIndent}}`;
}

function printParameterDeclaration(parameter: ParameterDeclaration): string {
  const rest = parameter.dotDotDotToken === undefined ? "" : "...";
  const optional = parameter.questionToken === undefined ? "" : "?";
  const initializer = parameter.initializer === undefined ? "" : ` = ${printExpression(parameter.initializer)}`;
  return `${rest}${printBindingName(parameter.name)}${optional}${initializer}`;
}

function printModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined): string {
  return printDeclarationModifierPrefix(modifiers);
}

function printDeclarationModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined): string {
  if (modifiers === undefined || modifiers.length === 0) {
    return "";
  }
  const printed = modifiers.flatMap(modifier => {
    const text = printDeclarationModifier(modifier);
    return text === undefined ? [] : [text];
  });
  return printed.length === 0 ? "" : `${printed.join(" ")} `;
}

function printMemberModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined): string {
  if (modifiers === undefined || modifiers.length === 0) {
    return "";
  }
  const printed = modifiers.flatMap(modifier => {
    switch (modifier.kind) {
      case Kind.StaticKeyword:
        return ["static"];
      case Kind.AsyncKeyword:
        return ["async"];
      default:
        return [];
    }
  });
  return printed.length === 0 ? "" : `${printed.join(" ")} `;
}

function printDeclarationModifier(modifier: ModifierLike): string | undefined {
  switch (modifier.kind) {
    case Kind.ExportKeyword:
      return "export";
    case Kind.DefaultKeyword:
      return "default";
    case Kind.AsyncKeyword:
      return "async";
    case Kind.AbstractKeyword:
    case Kind.DeclareKeyword:
      return undefined;
    default:
      throw new Error(`Unsupported modifier kind ${Kind[modifier.kind]}`);
  }
}

function printModuleExportName(name: ModuleExportName): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  if (isStringLiteral(name)) {
    return JSON.stringify(name.text);
  }
  throw new Error(`Unsupported module export name kind ${Kind[(name as Node).kind]}`);
}

function printBindingName(name: Node): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  throw new Error(`Unsupported binding name kind ${Kind[name.kind]}`);
}

function printPropertyName(name: Node): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  if (isStringLiteral(name)) {
    return JSON.stringify(name.text);
  }
  if (isNumericLiteral(name)) {
    return name.text;
  }
  throw new Error(`Unsupported property name kind ${Kind[name.kind]}`);
}

function printExpression(expression: Expression): string {
  if (isIdentifier(expression)) {
    return expression.text;
  }
  if (isNumericLiteral(expression)) {
    return expression.text;
  }
  if (isStringLiteral(expression)) {
    return JSON.stringify(expression.text);
  }
  if (expression.kind === Kind.TrueKeyword) {
    return "true";
  }
  if (expression.kind === Kind.FalseKeyword) {
    return "false";
  }
  if (expression.kind === Kind.NullKeyword) {
    return "null";
  }
  if (expression.kind === Kind.ThisKeyword) {
    return "this";
  }
  if (expression.kind === Kind.SuperKeyword) {
    return "super";
  }
  if (isParenthesizedExpression(expression)) {
    return `(${printExpression(expression.expression)})`;
  }
  if (isArrayLiteralExpression(expression)) {
    return `[${expression.elements.map(printExpression).join(", ")}]`;
  }
  if (isObjectLiteralExpression(expression)) {
    return `{ ${expression.properties.map(printObjectLiteralElement).join(", ")} }`;
  }
  if (isPropertyAccessExpression(expression)) {
    return `${printExpression(expression.expression)}.${expression.name.text}`;
  }
  if (isCallExpression(expression)) {
    return `${printExpression(expression.expression)}(${expression.arguments.map(printExpression).join(", ")})`;
  }
  if (isArrowFunction(expression)) {
    return printArrowFunction(expression);
  }
  if (isBinaryExpression(expression)) {
    return `${printExpression(expression.left)} ${printBinaryOperator(expression.operatorToken)} ${printExpression(expression.right)}`;
  }
  throw new Error(`Unsupported expression kind ${Kind[expression.kind]}`);
}

function printArrowFunction(arrowFunction: ArrowFunction): string {
  const parameters = arrowFunction.parameters.length === 1
    ? printParameterDeclaration(arrowFunction.parameters[0]!)
    : `(${arrowFunction.parameters.map(printParameterDeclaration).join(", ")})`;
  const body = isBlock(arrowFunction.body) ? printBlock(arrowFunction.body.statements, { newline: "\n", indentText: "  " }, 0) : printExpression(arrowFunction.body);
  return `${parameters} => ${body}`;
}

function printObjectLiteralElement(element: ObjectLiteralElementLike): string {
  if (isPropertyAssignment(element)) {
    return `${printPropertyName(element.name)}: ${printExpression(element.initializer)}`;
  }
  if (isShorthandPropertyAssignment(element)) {
    return printPropertyName(element.name);
  }
  throw new Error(`Unsupported object literal element kind ${Kind[element.kind]}`);
}

function hasModifier(modifiers: NodeArray<ModifierLike> | undefined, kind: Kind): boolean {
  return modifiers?.some(modifier => modifier.kind === kind) ?? false;
}

function printBinaryOperator(operatorToken: BinaryOperatorToken): string {
  const text = binaryOperatorText.get(operatorToken.kind);
  if (text === undefined) {
    throw new Error(`Unsupported binary operator ${Kind[operatorToken.kind]}`);
  }
  return text;
}
