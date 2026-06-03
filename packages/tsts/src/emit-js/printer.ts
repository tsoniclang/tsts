import {
  Kind,
  NodeFlags,
  isArrayLiteralExpression,
  isArrowFunction,
  isAsExpression,
  isAwaitExpression,
  isBigIntLiteral,
  isBinaryExpression,
  isBlock,
  isBreakStatement,
  isCallExpression,
  isClassDeclaration,
  isConditionalExpression,
  isContinueStatement,
  isConstructorDeclaration,
  isComputedPropertyName,
  isDeleteExpression,
  isDoStatement,
  isElementAccessExpression,
  isEmptyStatement,
  isEnumDeclaration,
  isExpressionStatement,
  isExportAssignment,
  isExportDeclaration,
  isFunctionExpression,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isHeritageClause,
  isGetAccessorDeclaration,
  isIfStatement,
  isInterfaceDeclaration,
  isIdentifier,
  isImportDeclaration,
  isMissingDeclaration,
  isNamedExports,
  isNamedImports,
  isNamespaceImport,
  isNewExpression,
  isNoSubstitutionTemplateLiteral,
  isNonNullExpression,
  isNumericLiteral,
  isObjectBindingPattern,
  isObjectLiteralExpression,
  isParenthesizedExpression,
  isPostfixUnaryExpression,
  isPrefixUnaryExpression,
  isPrivateIdentifier,
  isPropertyAssignment,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isShorthandPropertyAssignment,
  isSetAccessorDeclaration,
  isReturnStatement,
  isRegularExpressionLiteral,
  isSatisfiesExpression,
  isSpreadElement,
  isSpreadAssignment,
  isSwitchStatement,
  isTemplateExpression,
  isThrowStatement,
  isStringLiteral,
  isTryStatement,
  isTypeAliasDeclaration,
  isTypeOfExpression,
  isVariableDeclarationList,
  isVariableStatement,
  isVoidExpression,
  isWhileStatement,
  isArrayBindingPattern,
  hasSyntacticModifier,
  type BindingElement,
  type BinaryOperatorToken,
  type ArrowFunction,
  type ClassDeclaration,
  type ClassElement,
  type ConstructorDeclaration,
  type EnumDeclaration,
  type Expression,
  type ExportAssignment,
  type ExportDeclaration,
  type ForInitializer,
  type FunctionDeclaration,
  type HeritageClause,
  type IfStatement,
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
  type WhileStatement,
} from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";

function kindDebugName(kind: Kind): string {
  return String(kind);
}

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

const prefixUnaryOperatorText = new Map<Kind, string>([
  [Kind.PlusToken, "+"],
  [Kind.MinusToken, "-"],
  [Kind.TildeToken, "~"],
  [Kind.ExclamationToken, "!"],
  [Kind.PlusPlusToken, "++"],
  [Kind.MinusMinusToken, "--"],
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
  if (isEmptyStatement(statement)) {
    // A standalone empty statement (a bare `;`) is preserved verbatim, matching
    // tsc, which keeps it (e.g. as ASI defense before an IIFE).
    return ";";
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
  if (isExportAssignment(statement)) {
    return printExportAssignment(statement);
  }
  if (isFunctionDeclaration(statement)) {
    return printFunctionDeclaration(statement, context, depth);
  }
  if (isClassDeclaration(statement)) {
    return printClassDeclaration(statement, context, depth);
  }
  if (isEnumDeclaration(statement)) {
    return printEnumDeclaration(statement);
  }
  if (isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement)) {
    return undefined;
  }
  if (isIfStatement(statement)) {
    return printIfStatement(statement, context, depth);
  }
  if (isWhileStatement(statement)) {
    return printWhileStatement(statement, context, depth);
  }
  if (isDoStatement(statement)) {
    return `do ${printEmbeddedStatement(statement.statement, context, depth)} while (${printExpression(statement.expression)});`;
  }
  if (isForStatement(statement)) {
    return `for (${printForInitializer(statement.initializer)}; ${statement.condition === undefined ? "" : printExpression(statement.condition)}; ${statement.incrementor === undefined ? "" : printExpression(statement.incrementor)}) ${printEmbeddedStatement(statement.statement, context, depth)}`;
  }
  if (isForInStatement(statement)) {
    return `for (${printForInitializer(statement.initializer)} in ${printExpression(statement.expression)}) ${printEmbeddedStatement(statement.statement, context, depth)}`;
  }
  if (isForOfStatement(statement)) {
    return `for (${printForInitializer(statement.initializer)} of ${printExpression(statement.expression)}) ${printEmbeddedStatement(statement.statement, context, depth)}`;
  }
  if (isBreakStatement(statement)) {
    return statement.label === undefined ? "break;" : `break ${statement.label.text};`;
  }
  if (isContinueStatement(statement)) {
    return statement.label === undefined ? "continue;" : `continue ${statement.label.text};`;
  }
  if (isReturnStatement(statement)) {
    return statement.expression === undefined ? "return;" : `return ${printExpression(statement.expression)};`;
  }
  if (isThrowStatement(statement)) {
    return `throw ${printExpression(statement.expression)};`;
  }
  if (isTryStatement(statement)) {
    const catchClause = statement.catchClause === undefined ? "" : ` catch${statement.catchClause.variableDeclaration === undefined ? "" : ` (${printVariableDeclaration(statement.catchClause.variableDeclaration)})`} ${printBlock(statement.catchClause.block.statements, context, depth)}`;
    const finallyBlock = statement.finallyBlock === undefined ? "" : ` finally ${printBlock(statement.finallyBlock.statements, context, depth)}`;
    return `try ${printBlock(statement.tryBlock.statements, context, depth)}${catchClause}${finallyBlock}`;
  }
  if (isSwitchStatement(statement)) {
    const childIndent = context.indentText.repeat(depth + 1);
    const currentIndent = context.indentText.repeat(depth);
    const clauses = statement.caseBlock.clauses.map(clause => {
      const header = clause.kind === Kind.CaseClause ? `case ${printExpression(clause.expression)}:` : "default:";
      const body = clause.statements.map(child => `${context.indentText.repeat(depth + 2)}${printStatement(child, context, depth + 2) ?? ""}`).join(context.newline);
      return body.length === 0 ? `${childIndent}${header}` : `${childIndent}${header}${context.newline}${body}`;
    }).join(context.newline);
    return `switch (${printExpression(statement.expression)}) {${context.newline}${clauses}${context.newline}${currentIndent}}`;
  }
  if (isBlock(statement)) {
    return printBlock(statement.statements, context, depth);
  }
  throw new Error(`Unsupported statement kind ${kindDebugName(statement.kind)}`);
}

function printImportDeclaration(importDeclaration: ImportDeclaration): string | undefined {
  const moduleSpecifier = printExpression(importDeclaration.moduleSpecifier);
  if (importDeclaration.importClause === undefined) {
    return `import ${moduleSpecifier};`;
  }
  const importClause = printImportClause(importDeclaration.importClause);
  return importClause === undefined ? undefined : `import ${importClause} from ${moduleSpecifier};`;
}

function printImportClause(importClause: ImportClause): string | undefined {
  if (importClause.phaseModifier === Kind.TypeKeyword) {
    return undefined;
  }
  const parts: string[] = [];
  if (importClause.name !== undefined) {
    parts.push(importClause.name.text);
  }
  if (importClause.namedBindings !== undefined) {
    const namedBindings = printNamedImportBindings(importClause.namedBindings);
    if (namedBindings !== undefined) {
      parts.push(namedBindings);
    }
  }
  return parts.length === 0 ? undefined : parts.join(", ");
}

function printNamedImportBindings(namedBindings: NamedImportBindings): string | undefined {
  if (isNamespaceImport(namedBindings)) {
    return `* as ${namedBindings.name.text}`;
  }
  if (isNamedImports(namedBindings)) {
    const elements = namedBindings.elements.flatMap(specifier => specifier.isTypeOnly ? [] : [printImportSpecifier(specifier)]);
    return elements.length === 0 ? undefined : `{ ${elements.join(", ")} }`;
  }
  throw new Error(`Unsupported named import bindings kind ${kindDebugName((namedBindings as Node).kind)}`);
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

/**
 * Print an `ExportAssignment` node (SyntaxKind 278).
 *
 * The kind covers two distinct source forms, discriminated by `isExportEquals`:
 *
 *   - `export = <expr>` (`isExportEquals === true`). This is a TypeScript
 *     export-equals assignment. TypeScript only permits it when targeting a
 *     CommonJS-style module (`export =` is a hard error under ES module targets,
 *     so it never reaches JS emit there); the canonical lowering for every
 *     emitting case is `module.exports = <expr>;`, matching TS-Go's CommonJS
 *     transform (see e.g. `exportAssignmentMerging1` → `a.js`:
 *     `module.exports = { a: 1, b: "hello" };`).
 *
 *   - `export default <expr>` (`isExportEquals === false`). This printer
 *     preserves ES-module syntax (it keeps `export const` / `import ... from`
 *     verbatim), so the consistent emit is the verbatim `export default <expr>;`.
 *
 * The type annotation (`export = expr` carries no value-level type) is erased.
 */
function printExportAssignment(exportAssignment: ExportAssignment): string {
  const expression = printExpression(exportAssignment.expression);
  if (exportAssignment.isExportEquals) {
    return `module.exports = ${expression};`;
  }
  return `export default ${expression};`;
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
  throw new Error(`Unsupported named export bindings kind ${kindDebugName(namedBindings.kind)}`);
}

function printVariableStatement(modifiers: NodeArray<ModifierLike> | undefined, declarationList: VariableDeclarationList): string {
  const prefix = printModifierPrefix(modifiers);
  return `${prefix}${printVariableDeclarationList(declarationList)};`;
}

function printVariableDeclarationList(declarationList: VariableDeclarationList): string {
  return `${printVariableDeclarationKind(declarationList)} ${declarationList.declarations.map(printVariableDeclaration).join(", ")}`;
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

function printEnumDeclaration(enumDeclaration: EnumDeclaration): string {
  const prefix = hasModifier(enumDeclaration.modifiers, Kind.ExportKeyword) ? "export " : "";
  const enumName = enumDeclaration.name.text;
  const memberNames = new Set(enumDeclaration.members.flatMap(member => isIdentifier(member.name) ? [member.name.text] : []));
  let nextValue = 0;
  const assignments = enumDeclaration.members.map(member => {
    const name = printPropertyName(member.name);
    const initializer = member.initializer === undefined ? `${nextValue}` : printEnumInitializer(member.initializer, enumName, memberNames);
    if (member.initializer === undefined) {
      nextValue += 1;
    }
    return `${enumName}[${enumName}[${JSON.stringify(name)}] = ${initializer}] = ${JSON.stringify(name)};`;
  }).join(" ");
  return `${prefix}var ${enumName};${assignments.length === 0 ? "" : `\n(function (${enumName}) { ${assignments} })(${enumName} || (${enumName} = {}));`}`;
}

function printEnumInitializer(expression: Expression, enumName: string, memberNames: Set<string>): string {
  if (isIdentifier(expression) && memberNames.has(expression.text)) {
    return `${enumName}.${expression.text}`;
  }
  if (isBinaryExpression(expression)) {
    return `${printEnumInitializer(expression.left, enumName, memberNames)} ${printBinaryOperator(expression.operatorToken)} ${printEnumInitializer(expression.right, enumName, memberNames)}`;
  }
  if (isPrefixUnaryExpression(expression)) {
    return `${printPrefixUnaryOperator(expression.operator)}${printEnumInitializer(expression.operand, enumName, memberNames)}`;
  }
  if (isParenthesizedExpression(expression)) {
    return `(${printEnumInitializer(expression.expression, enumName, memberNames)})`;
  }
  return printExpression(expression);
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
  if (isGetAccessorDeclaration(member)) {
    const prefix = printMemberModifierPrefix(member.modifiers);
    const body = member.body === undefined ? "{}" : printBlock(member.body.statements, context, depth);
    return `${prefix}get ${printPropertyName(member.name)}() ${body}`;
  }
  if (isSetAccessorDeclaration(member)) {
    const prefix = printMemberModifierPrefix(member.modifiers);
    const parameters = member.parameters.map(printParameterDeclaration).join(", ");
    const body = member.body === undefined ? "{}" : printBlock(member.body.statements, context, depth);
    return `${prefix}set ${printPropertyName(member.name)}(${parameters}) ${body}`;
  }
  if (member.kind === Kind.SemicolonClassElement) {
    return ";";
  }
  throw new Error(`Unsupported class element kind ${kindDebugName(member.kind)}`);
}

function printConstructorDeclaration(constructorDeclaration: ConstructorDeclaration, context: PrintContext, depth: number): string {
  const parameters = constructorDeclaration.parameters.map(printParameterDeclaration).join(", ");
  const body = printConstructorBody(constructorDeclaration, context, depth);
  return `constructor(${parameters}) ${body}`;
}

/**
 * Print the constructor body, lowering parameter properties.
 *
 * A constructor parameter carrying an access modifier (`public` / `private` /
 * `protected` / `readonly` / `override`, i.e. `ModifierFlags.ParameterPropertyModifier`)
 * declares an instance field initialized from the parameter. TypeScript erases
 * the modifier from the parameter list (handled by {@link printParameterDeclaration},
 * which never prints those modifiers) and injects `this.<name> = <name>;`
 * assignments into the constructor body, in declaration order. This mirrors the
 * standard TS parameter-property lowering.
 *
 * The assignments are inserted immediately after a leading `super(...)` call (a
 * derived class cannot reference `this` before `super()`); otherwise they go at
 * the very start of the body.
 *
 * A constructor with no body is an overload signature; it carries no statements
 * and gets no injected assignments.
 */
function printConstructorBody(constructorDeclaration: ConstructorDeclaration, context: PrintContext, depth: number): string {
  // An overload signature has no body and emits no statements.
  if (constructorDeclaration.body === undefined) {
    return "{}";
  }

  const assignments = constructorDeclaration.parameters.flatMap(parameter => {
    if (!hasSyntacticModifier(parameter, ModifierFlags.ParameterPropertyModifier)) {
      return [];
    }
    // A parameter property name is always a plain identifier; binding patterns
    // cannot carry access modifiers.
    if (!isIdentifier(parameter.name)) {
      return [];
    }
    const name = parameter.name.text;
    return [`this.${name} = ${name};`];
  });

  if (assignments.length === 0) {
    return printBlock(constructorDeclaration.body.statements, context, depth);
  }

  const statementLines = constructorDeclaration.body.statements.flatMap(statement => {
    const printed = printStatement(statement, context, depth + 1);
    return printed === undefined ? [] : [printed];
  });

  // Parameter-property assignments must follow a leading `super(...)` call.
  const insertAt = startsWithSuperCall(constructorDeclaration.body.statements) ? 1 : 0;
  const lines = [
    ...statementLines.slice(0, insertAt),
    ...assignments,
    ...statementLines.slice(insertAt),
  ];
  return printSyntheticBlock(lines, context, depth);
}

/** Whether the first statement is a `super(...)` call expression statement. */
function startsWithSuperCall(statements: NodeArray<Statement>): boolean {
  const first = statements[0];
  return first !== undefined
    && isExpressionStatement(first)
    && isCallExpression(first.expression)
    && first.expression.expression.kind === Kind.SuperKeyword;
}

/**
 * Render a block from already-printed statement lines, indented at `depth + 1`.
 */
function printSyntheticBlock(lines: readonly string[], context: PrintContext, depth: number): string {
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  if (lines.length === 0) {
    return "{}";
  }
  const body = lines.map(line => `${childIndent}${line}`).join(context.newline);
  return `{${context.newline}${body}${context.newline}${currentIndent}}`;
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

function printIfStatement(ifStatement: IfStatement, context: PrintContext, depth: number): string {
  const thenStatement = printEmbeddedStatement(ifStatement.thenStatement, context, depth);
  const elseStatement = ifStatement.elseStatement === undefined ? "" : ` else ${printEmbeddedStatement(ifStatement.elseStatement, context, depth)}`;
  return `if (${printExpression(ifStatement.expression)}) ${thenStatement}${elseStatement}`;
}

function printWhileStatement(whileStatement: WhileStatement, context: PrintContext, depth: number): string {
  return `while (${printExpression(whileStatement.expression)}) ${printEmbeddedStatement(whileStatement.statement, context, depth)}`;
}

function printForInitializer(initializer: ForInitializer | undefined): string {
  if (initializer === undefined) {
    return "";
  }
  if (isVariableDeclarationList(initializer)) {
    return printVariableDeclarationList(initializer);
  }
  if (isMissingDeclaration(initializer)) {
    return "";
  }
  return printExpression(initializer);
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
  const initializer = parameter.initializer === undefined ? "" : ` = ${printExpression(parameter.initializer)}`;
  return `${rest}${printBindingName(parameter.name)}${initializer}`;
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
      throw new Error(`Unsupported modifier kind ${kindDebugName(modifier.kind)}`);
  }
}

function printModuleExportName(name: ModuleExportName): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  if (isStringLiteral(name)) {
    return JSON.stringify(name.text);
  }
  throw new Error(`Unsupported module export name kind ${kindDebugName((name as Node).kind)}`);
}

function printBindingName(name: Node): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  if (isPrivateIdentifier(name)) {
    return name.text;
  }
  if (isObjectBindingPattern(name)) {
    return `{ ${name.elements.map(printBindingElement).join(", ")} }`;
  }
  if (isArrayBindingPattern(name)) {
    return `[${name.elements.map(printBindingElement).join(", ")}]`;
  }
  throw new Error(`Unsupported binding name kind ${kindDebugName(name.kind)}`);
}

function printBindingElement(element: BindingElement): string {
  const rest = element.dotDotDotToken === undefined ? "" : "...";
  const propertyName = element.propertyName === undefined ? "" : `${printPropertyName(element.propertyName)}: `;
  const name = element.name === undefined ? "" : printBindingName(element.name);
  const initializer = element.initializer === undefined ? "" : ` = ${printExpression(element.initializer)}`;
  return `${rest}${propertyName}${name}${initializer}`;
}

function printPropertyName(name: Node): string {
  if (isIdentifier(name)) {
    return name.text;
  }
  if (isPrivateIdentifier(name)) {
    return name.text;
  }
  if (isStringLiteral(name)) {
    return JSON.stringify(name.text);
  }
  if (isNumericLiteral(name)) {
    return name.text;
  }
  if (isComputedPropertyName(name)) {
    return `[${printExpression(name.expression)}]`;
  }
  throw new Error(`Unsupported property name kind ${kindDebugName(name.kind)}`);
}

function printExpression(expression: Expression): string {
  if (isIdentifier(expression)) {
    return expression.text;
  }
  if (isPrivateIdentifier(expression)) {
    return expression.text;
  }
  if (isNumericLiteral(expression)) {
    return expression.text;
  }
  if (isBigIntLiteral(expression)) {
    return expression.text;
  }
  if (isRegularExpressionLiteral(expression)) {
    return expression.text;
  }
  if (isStringLiteral(expression)) {
    return JSON.stringify(expression.text);
  }
  if (isNoSubstitutionTemplateLiteral(expression)) {
    return `\`${expression.text}\``;
  }
  if (isTemplateExpression(expression)) {
    return `\`${expression.head.text}${expression.templateSpans.map(span => `\${${printExpression(span.expression)}}${span.literal.text}`).join("")}\``;
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
  if (isSpreadElement(expression)) {
    return `...${printExpression(expression.expression)}`;
  }
  if (isObjectLiteralExpression(expression)) {
    return `{ ${expression.properties.map(printObjectLiteralElement).join(", ")} }`;
  }
  if (isPropertyAccessExpression(expression)) {
    return `${printExpression(expression.expression)}${expression.questionDotToken === undefined ? "." : "?."}${expression.name.text}`;
  }
  if (isElementAccessExpression(expression)) {
    return `${printExpression(expression.expression)}${expression.questionDotToken === undefined ? "" : "?."}[${printExpression(expression.argumentExpression)}]`;
  }
  if (isCallExpression(expression)) {
    return `${printExpression(expression.expression)}${expression.questionDotToken === undefined ? "" : "?."}(${expression.arguments.map(printExpression).join(", ")})`;
  }
  if (isFunctionExpression(expression)) {
    const asterisk = expression.asteriskToken === undefined ? "" : "*";
    const name = expression.name === undefined ? "" : ` ${expression.name.text}`;
    const parameters = expression.parameters.map(printParameterDeclaration).join(", ");
    return `function${asterisk}${name}(${parameters}) ${printBlock(expression.body.statements, { newline: "\n", indentText: "  " }, 0)}`;
  }
  if (isNewExpression(expression)) {
    const typeArguments = "";
    const argumentsText = expression.arguments === undefined ? "" : `(${expression.arguments.map(printExpression).join(", ")})`;
    return `new ${printExpression(expression.expression)}${typeArguments}${argumentsText}`;
  }
  if (isPrefixUnaryExpression(expression)) {
    return `${printPrefixUnaryOperator(expression.operator)}${printExpression(expression.operand)}`;
  }
  if (isDeleteExpression(expression)) {
    return `delete ${printExpression(expression.expression)}`;
  }
  if (isTypeOfExpression(expression)) {
    return `typeof ${printExpression(expression.expression)}`;
  }
  if (isVoidExpression(expression)) {
    return `void ${printExpression(expression.expression)}`;
  }
  if (isAwaitExpression(expression)) {
    return `await ${printExpression(expression.expression)}`;
  }
  if (isPostfixUnaryExpression(expression)) {
    return `${printExpression(expression.operand)}${expression.operator === Kind.PlusPlusToken ? "++" : "--"}`;
  }
  if (isNonNullExpression(expression)) {
    return printExpression(expression.expression);
  }
  if (isAsExpression(expression) || isSatisfiesExpression(expression)) {
    return printExpression(expression.expression);
  }
  if (isConditionalExpression(expression)) {
    return `${printExpression(expression.condition)} ? ${printExpression(expression.whenTrue)} : ${printExpression(expression.whenFalse)}`;
  }
  if (isArrowFunction(expression)) {
    return printArrowFunction(expression);
  }
  if (isBinaryExpression(expression)) {
    return `${printExpression(expression.left)} ${printBinaryOperator(expression.operatorToken)} ${printExpression(expression.right)}`;
  }
  throw new Error(`Unsupported expression kind ${kindDebugName(expression.kind)}`);
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
  if (isSpreadAssignment(element)) {
    return `...${printExpression(element.expression)}`;
  }
  throw new Error(`Unsupported object literal element kind ${kindDebugName(element.kind)}`);
}

function hasModifier(modifiers: NodeArray<ModifierLike> | undefined, kind: Kind): boolean {
  return modifiers?.some(modifier => modifier.kind === kind) ?? false;
}

function printBinaryOperator(operatorToken: BinaryOperatorToken): string {
  const text = binaryOperatorText.get(operatorToken.kind);
  if (text === undefined) {
    throw new Error(`Unsupported binary operator ${kindDebugName(operatorToken.kind)}`);
  }
  return text;
}

function printPrefixUnaryOperator(operator: Kind): string {
  const text = prefixUnaryOperatorText.get(operator);
  if (text === undefined) {
    throw new Error(`Unsupported prefix unary operator ${kindDebugName(operator)}`);
  }
  return text;
}
