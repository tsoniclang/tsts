import {
  Kind,
  NodeFlags,
  isBinaryExpression,
  isBlock,
  isCallExpression,
  isExpressionStatement,
  isExportDeclaration,
  isFunctionDeclaration,
  isIdentifier,
  isImportDeclaration,
  isNamedExports,
  isNamedImports,
  isNamespaceImport,
  isNumericLiteral,
  isParenthesizedExpression,
  isPropertyAccessExpression,
  isReturnStatement,
  isStringLiteral,
  isVariableStatement,
  type BinaryOperatorToken,
  type Expression,
  type ExportDeclaration,
  type FunctionDeclaration,
  type ImportClause,
  type ImportDeclaration,
  type ImportSpecifier,
  type ModifierLike,
  type ModuleExportName,
  type NamedExportBindings,
  type NamedImportBindings,
  type Node,
  type NodeArray,
  type ParameterDeclaration,
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
  return sourceFile.statements.map(statement => printStatement(statement, context, 0)).join(context.newline);
}

export function printNode(node: Node): string {
  if (isExpressionStatement(node)) {
    return printStatement(node, { newline: "\n", indentText: "  " }, 0);
  }
  return printExpression(node as Expression);
}

function printStatement(statement: Statement, context: PrintContext, depth: number): string {
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

function printBlock(statements: NodeArray<Statement>, context: PrintContext, depth: number): string {
  if (statements.length === 0) {
    return "{}";
  }
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  const body = statements.map(statement => `${childIndent}${printStatement(statement, context, depth + 1)}`).join(context.newline);
  return `{${context.newline}${body}${context.newline}${currentIndent}}`;
}

function printParameterDeclaration(parameter: ParameterDeclaration): string {
  const rest = parameter.dotDotDotToken === undefined ? "" : "...";
  const optional = parameter.questionToken === undefined ? "" : "?";
  const initializer = parameter.initializer === undefined ? "" : ` = ${printExpression(parameter.initializer)}`;
  return `${rest}${printBindingName(parameter.name)}${optional}${initializer}`;
}

function printModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined): string {
  if (modifiers === undefined || modifiers.length === 0) {
    return "";
  }
  return `${modifiers.map(printModifier).join(" ")} `;
}

function printModifier(modifier: ModifierLike): string {
  switch (modifier.kind) {
    case Kind.ExportKeyword:
      return "export";
    case Kind.DefaultKeyword:
      return "default";
    case Kind.AsyncKeyword:
      return "async";
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
  if (isParenthesizedExpression(expression)) {
    return `(${printExpression(expression.expression)})`;
  }
  if (isPropertyAccessExpression(expression)) {
    return `${printExpression(expression.expression)}.${expression.name.text}`;
  }
  if (isCallExpression(expression)) {
    return `${printExpression(expression.expression)}(${expression.arguments.map(printExpression).join(", ")})`;
  }
  if (isBinaryExpression(expression)) {
    return `${printExpression(expression.left)} ${printBinaryOperator(expression.operatorToken)} ${printExpression(expression.right)}`;
  }
  throw new Error(`Unsupported expression kind ${Kind[expression.kind]}`);
}

function printBinaryOperator(operatorToken: BinaryOperatorToken): string {
  const text = binaryOperatorText.get(operatorToken.kind);
  if (text === undefined) {
    throw new Error(`Unsupported binary operator ${Kind[operatorToken.kind]}`);
  }
  return text;
}
