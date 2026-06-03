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
  isModuleBlock,
  isModuleDeclaration,
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
  isExternalModuleReference,
  isImportEqualsDeclaration,
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
  type ImportEqualsDeclaration,
  type ImportSpecifier,
  type MethodDeclaration,
  type ModifierLike,
  type ModuleDeclaration,
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

/**
 * Lexical scope captured while emitting the body of a single `namespace` /
 * `module` declaration.
 *
 * TypeScript lowers a namespace into an IIFE whose single parameter shadows the
 * namespace variable (`(function (N) { ... })(N || (N = {}))`). Inside that body
 * every reference to an *exported* member of the namespace is qualified with the
 * parameter name (`x` becomes `N.x`), because exported members live as
 * properties on `N` rather than as free variables. This context carries the
 * parameter name and the set of exported member names so expression printing can
 * perform that qualification.
 *
 * The set is collected purely lexically from the single declaration's body (no
 * symbol resolution), so it is correct for non-merged namespaces. Cross-merge
 * member references (a name exported in another declaration of the same
 * namespace) are intentionally out of scope and rejected upstream.
 */
interface NamespaceContext {
  readonly name: string;
  readonly exportedNames: ReadonlySet<string>;
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
    const printed = printStatement(statement, context, 0, undefined);
    return printed === undefined ? [] : [printed];
  }).join(context.newline);
}

export function printNode(node: Node): string {
  if (isExpressionStatement(node)) {
    return printStatement(node, { newline: "\n", indentText: "  " }, 0, undefined) ?? "";
  }
  return printExpression(node as Expression, undefined);
}

function printStatement(statement: Statement, context: PrintContext, depth: number, ns: NamespaceContext | undefined): string | undefined {
  if (isExpressionStatement(statement)) {
    return `${printExpression(statement.expression, ns)};`;
  }
  if (isEmptyStatement(statement)) {
    // A standalone empty statement (a bare `;`) is preserved verbatim, matching
    // tsc, which keeps it (e.g. as ASI defense before an IIFE).
    return ";";
  }
  if (isVariableStatement(statement)) {
    return printVariableStatement(statement.modifiers, statement.declarationList, ns);
  }
  if (isImportDeclaration(statement)) {
    return printImportDeclaration(statement);
  }
  if (isImportEqualsDeclaration(statement)) {
    return printImportEqualsDeclaration(statement);
  }
  if (isExportDeclaration(statement)) {
    return printExportDeclaration(statement);
  }
  if (isExportAssignment(statement)) {
    return printExportAssignment(statement);
  }
  if (isFunctionDeclaration(statement)) {
    return printFunctionDeclaration(statement, context, depth, false);
  }
  if (isClassDeclaration(statement)) {
    return printClassDeclaration(statement, context, depth, false);
  }
  if (isEnumDeclaration(statement)) {
    return printEnumDeclaration(statement);
  }
  if (isModuleDeclaration(statement)) {
    return printModuleDeclaration(statement, context, depth);
  }
  if (isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement)) {
    return undefined;
  }
  if (isIfStatement(statement)) {
    return printIfStatement(statement, context, depth, ns);
  }
  if (isWhileStatement(statement)) {
    return printWhileStatement(statement, context, depth, ns);
  }
  if (isDoStatement(statement)) {
    return `do ${printEmbeddedStatement(statement.statement, context, depth, ns)} while (${printExpression(statement.expression, ns)});`;
  }
  if (isForStatement(statement)) {
    return `for (${printForInitializer(statement.initializer, ns)}; ${statement.condition === undefined ? "" : printExpression(statement.condition, ns)}; ${statement.incrementor === undefined ? "" : printExpression(statement.incrementor, ns)}) ${printEmbeddedStatement(statement.statement, context, depth, ns)}`;
  }
  if (isForInStatement(statement)) {
    return `for (${printForInitializer(statement.initializer, ns)} in ${printExpression(statement.expression, ns)}) ${printEmbeddedStatement(statement.statement, context, depth, ns)}`;
  }
  if (isForOfStatement(statement)) {
    return `for (${printForInitializer(statement.initializer, ns)} of ${printExpression(statement.expression, ns)}) ${printEmbeddedStatement(statement.statement, context, depth, ns)}`;
  }
  if (isBreakStatement(statement)) {
    return statement.label === undefined ? "break;" : `break ${statement.label.text};`;
  }
  if (isContinueStatement(statement)) {
    return statement.label === undefined ? "continue;" : `continue ${statement.label.text};`;
  }
  if (isReturnStatement(statement)) {
    return statement.expression === undefined ? "return;" : `return ${printExpression(statement.expression, ns)};`;
  }
  if (isThrowStatement(statement)) {
    return `throw ${printExpression(statement.expression, ns)};`;
  }
  if (isTryStatement(statement)) {
    const catchClause = statement.catchClause === undefined ? "" : ` catch${statement.catchClause.variableDeclaration === undefined ? "" : ` (${printVariableDeclaration(statement.catchClause.variableDeclaration, ns)})`} ${printBlock(statement.catchClause.block.statements, context, depth, ns)}`;
    const finallyBlock = statement.finallyBlock === undefined ? "" : ` finally ${printBlock(statement.finallyBlock.statements, context, depth, ns)}`;
    return `try ${printBlock(statement.tryBlock.statements, context, depth, ns)}${catchClause}${finallyBlock}`;
  }
  if (isSwitchStatement(statement)) {
    const childIndent = context.indentText.repeat(depth + 1);
    const currentIndent = context.indentText.repeat(depth);
    const clauses = statement.caseBlock.clauses.map(clause => {
      const header = clause.kind === Kind.CaseClause ? `case ${printExpression(clause.expression, ns)}:` : "default:";
      const body = clause.statements.map(child => `${context.indentText.repeat(depth + 2)}${printStatement(child, context, depth + 2, ns) ?? ""}`).join(context.newline);
      return body.length === 0 ? `${childIndent}${header}` : `${childIndent}${header}${context.newline}${body}`;
    }).join(context.newline);
    return `switch (${printExpression(statement.expression, ns)}) {${context.newline}${clauses}${context.newline}${currentIndent}}`;
  }
  if (isBlock(statement)) {
    return printBlock(statement.statements, context, depth, ns);
  }
  throw new Error(`Unsupported statement kind ${kindDebugName(statement.kind)}`);
}

function printImportDeclaration(importDeclaration: ImportDeclaration): string | undefined {
  const moduleSpecifier = printExpression(importDeclaration.moduleSpecifier, undefined);
  if (importDeclaration.importClause === undefined) {
    return `import ${moduleSpecifier};`;
  }
  const importClause = printImportClause(importDeclaration.importClause);
  return importClause === undefined ? undefined : `import ${importClause} from ${moduleSpecifier};`;
}

/**
 * Print an `ImportEqualsDeclaration` node (SyntaxKind 272), i.e. an
 * `import <name> = <moduleReference>` declaration.
 *
 * Bounded scope (matches TS-Go's CommonJS lowering exactly):
 *
 *   - A type-only declaration (`import type a = require("m")`) carries no value
 *     and is erased (TS-Go's typeEraser elides it), so it produces no JS.
 *   - A plain (non-`export`) external-module form `import a = require("m")`
 *     lowers to the CommonJS `const a = require("m");` (TS-Go's
 *     `visitTopLevelImportEqualsDeclaration` emits a `const` variable statement
 *     whose initializer is `require(<specifier>)` — see e.g.
 *     `exportAssignmentMerging1` → `b.js`: `const a = require("./a");`). The
 *     module specifier string literal is reproduced verbatim.
 *
 * Honestly out of scope (rejected via the unsupported-statement error so no
 * malformed output is produced):
 *
 *   - The `export import a = require("m")` form, whose lowering is
 *     `exports.a = require("m");` plus re-export wiring — module-target `exports`
 *     work (the same category as `export namespace`).
 *   - The entity-name (alias) form `import a = N.B`, whose emit-vs-elide
 *     decision and `var a = N.B;` lowering are symbol/alias-reference driven
 *     (TS-Go's `isReferencedAliasDeclaration` /
 *     `isTopLevelValueImportEqualsWithEntityName`), which cannot be decided
 *     syntactically.
 */
function printImportEqualsDeclaration(importEquals: ImportEqualsDeclaration): string | undefined {
  // A type-only `import type a = …` is type-space only: no JS emit.
  if (importEquals.isTypeOnly) {
    return undefined;
  }
  // The entity-name (alias) form `import a = N.B` requires alias-reference
  // resolution to decide emit-vs-elide and its `var a = N.B;` lowering; out of
  // scope (rejected so no malformed output is produced).
  if (!isExternalModuleReference(importEquals.moduleReference)) {
    throw new Error(`Unsupported statement kind ${kindDebugName(importEquals.kind)}`);
  }
  // `export import a = require("m")` lowers to `exports.a = require("m");`,
  // which needs module-target `exports` wiring; out of scope.
  if (hasModifier(importEquals.modifiers, Kind.ExportKeyword)) {
    throw new Error(`Unsupported statement kind ${kindDebugName(importEquals.kind)}`);
  }
  const moduleSpecifier = printExpression(importEquals.moduleReference.expression, undefined);
  return `const ${importEquals.name.text} = require(${moduleSpecifier});`;
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
  const moduleSpecifier = exportDeclaration.moduleSpecifier === undefined ? "" : ` from ${printExpression(exportDeclaration.moduleSpecifier, undefined)}`;
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
  const expression = printExpression(exportAssignment.expression, undefined);
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

/**
 * Print a `ModuleDeclaration` node (SyntaxKind 268), i.e. a `namespace N {}` or
 * `module N {}` declaration, lowering it to TypeScript's canonical namespace
 * IIFE.
 *
 * Bounded scope (matches TS-Go exactly):
 *
 *   - A `declare` namespace, or a namespace that is not "instantiated" (its body
 *     contains only type-level declarations: interfaces, type aliases, and
 *     type-only nested namespaces), produces no JS and is elided.
 *   - An instantiated, non-merged, non-exported namespace with a plain
 *     identifier name lowers to
 *     `var N;\n(function (N) { <body> })(N || (N = {}));` at the top level, and
 *     to the same wrapper preceded by `let N;` when nested inside another
 *     namespace.
 *   - Inside the body: `export const/let/var <name> = <init>` becomes
 *     `N.<name> = <init>`, `export function f(){}` becomes `function f(){}`
 *     followed by `N.f = f;`, and `export class C {}` becomes `class C {}`
 *     followed by `N.C = C;`. References to the namespace's own exported members
 *     are qualified as `N.<name>`.
 *
 * Honestly out of scope (rejected via the unsupported-statement error so no
 * malformed output is produced):
 *
 *   - Merged namespaces, and namespaces merged with a class/function/enum of the
 *     same name (these change whether `var N;` is emitted and require resolving
 *     member references across declarations — symbol-level work).
 *   - Exported namespaces (`export namespace`), which require module-target
 *     `exports.N` wiring.
 *   - String-literal module names (`module "foo" {}`) and dotted names
 *     (`namespace A.B {}`).
 *   - Exported `enum` / nested `namespace` members, whose lowering uses the
 *     `N.E` IIFE-argument form.
 */
function printModuleDeclaration(moduleDeclaration: ModuleDeclaration, context: PrintContext, depth: number): string | undefined {
  // `declare namespace` / `declare module` is type-space only: no JS emit.
  if (hasModifier(moduleDeclaration.modifiers, Kind.DeclareKeyword)) {
    return undefined;
  }
  // `export namespace` requires module-target `exports.N` wiring; out of scope.
  if (hasModifier(moduleDeclaration.modifiers, Kind.ExportKeyword)) {
    throw new Error(`Unsupported statement kind ${kindDebugName(moduleDeclaration.kind)}`);
  }
  // Dotted (`namespace A.B {}`) names parse as a nested ModuleDeclaration body;
  // string-literal module names use a different lowering. Only a plain
  // identifier name is in scope.
  if (!isIdentifier(moduleDeclaration.name)) {
    throw new Error(`Unsupported statement kind ${kindDebugName(moduleDeclaration.kind)}`);
  }
  if (moduleDeclaration.body === undefined || !isModuleBlock(moduleDeclaration.body)) {
    throw new Error(`Unsupported statement kind ${kindDebugName(moduleDeclaration.kind)}`);
  }
  const statements = moduleDeclaration.body.statements;
  // A namespace with no value-level declarations is not instantiated and is
  // elided entirely (matches TS-Go, which emits nothing for type-only modules).
  if (!isInstantiatedModuleBody(statements)) {
    return undefined;
  }

  const name = moduleDeclaration.name.text;
  const exportedNames = collectExportedValueNames(statements);
  // Member references that cannot be faithfully qualified without symbol
  // resolution (exported enum/namespace members, exported-name collisions with
  // unsupported lowerings) are rejected so no malformed output is produced.
  rejectUnsupportedModuleMembers(statements);
  const ns: NamespaceContext = { name, exportedNames };

  const bodyLines = statements.flatMap(statement => printModuleBodyStatement(statement, context, depth + 1, ns));
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  const body = bodyLines.map(line => `${childIndent}${line}`).join(context.newline);
  const iife = `(function (${name}) {${context.newline}${body}${context.newline}${currentIndent}})(${name} || (${name} = {}));`;
  // A nested namespace declares its variable with `let` (block scope inside the
  // enclosing IIFE); a top-level namespace uses `var`.
  const declarationKeyword = depth === 0 ? "var" : "let";
  return `${declarationKeyword} ${name};${context.newline}${currentIndent}${iife}`;
}

/**
 * Whether a module body contains at least one value-level (instantiated)
 * declaration. Interfaces, type aliases, and nested type-only namespaces are
 * type-space only and do not, on their own, instantiate the namespace.
 */
function isInstantiatedModuleBody(statements: NodeArray<Statement>): boolean {
  return statements.some(isInstantiatedModuleStatement);
}

function isInstantiatedModuleStatement(statement: Statement): boolean {
  if (isInterfaceDeclaration(statement) || isTypeAliasDeclaration(statement)) {
    return false;
  }
  if (isModuleDeclaration(statement)) {
    // A `declare` nested namespace never instantiates; otherwise it instantiates
    // only if its own body does.
    if (hasModifier(statement.modifiers, Kind.DeclareKeyword)) {
      return false;
    }
    return statement.body !== undefined
      && isModuleBlock(statement.body)
      && isInstantiatedModuleBody(statement.body.statements);
  }
  return true;
}

/**
 * Collect the names exported as value members of a single namespace
 * declaration's body (purely lexical; no symbol resolution).
 */
function collectExportedValueNames(statements: NodeArray<Statement>): ReadonlySet<string> {
  const names = statements.flatMap(statement => {
    if (!hasModifier(getStatementModifiers(statement), Kind.ExportKeyword)) {
      return [];
    }
    if (isVariableStatement(statement)) {
      return statement.declarationList.declarations.flatMap(declaration =>
        isIdentifier(declaration.name) ? [declaration.name.text] : []);
    }
    if (isFunctionDeclaration(statement) && statement.name !== undefined) {
      return [statement.name.text];
    }
    if (isClassDeclaration(statement) && statement.name !== undefined) {
      return [statement.name.text];
    }
    return [];
  });
  return new Set(names);
}

function getStatementModifiers(statement: Statement): NodeArray<ModifierLike> | undefined {
  return (statement as { readonly modifiers?: NodeArray<ModifierLike> }).modifiers;
}

/**
 * Reject namespace member forms whose faithful lowering needs more than the
 * bounded lexical transform (exported enums/nested namespaces use the `N.E`
 * IIFE-argument form, which is symbol-driven). This keeps emit honest: an
 * unsupported member triggers the standard unsupported-statement error rather
 * than producing malformed output.
 */
function rejectUnsupportedModuleMembers(statements: NodeArray<Statement>): void {
  for (const statement of statements) {
    const exported = hasModifier(getStatementModifiers(statement), Kind.ExportKeyword);
    if (exported && (isEnumDeclaration(statement) || isModuleDeclaration(statement))) {
      throw new Error(`Unsupported statement kind ${kindDebugName(statement.kind)}`);
    }
  }
}

/**
 * Print one statement of a namespace body, lowering exported value members to
 * assignments on the namespace object.
 */
function printModuleBodyStatement(statement: Statement, context: PrintContext, depth: number, ns: NamespaceContext): readonly string[] {
  const exported = hasModifier(getStatementModifiers(statement), Kind.ExportKeyword);

  if (exported && isVariableStatement(statement)) {
    // `export const a = 1, b = 2;` => `N.a = 1, N.b = 2;`
    const assignments = statement.declarationList.declarations.flatMap(declaration => {
      if (!isIdentifier(declaration.name)) {
        throw new Error(`Unsupported statement kind ${kindDebugName(statement.kind)}`);
      }
      const target = `${ns.name}.${declaration.name.text}`;
      return declaration.initializer === undefined
        ? [target]
        : [`${target} = ${printExpression(declaration.initializer, ns)}`];
    });
    return [`${assignments.join(", ")};`];
  }

  if (exported && isFunctionDeclaration(statement) && statement.name !== undefined) {
    // The function keeps its own declaration (with `export` suppressed) and is
    // additionally assigned onto the namespace object.
    const declaration = printFunctionDeclaration(statement, context, depth, true);
    return [declaration, `${ns.name}.${statement.name.text} = ${statement.name.text};`];
  }

  if (exported && isClassDeclaration(statement) && statement.name !== undefined) {
    const declaration = printClassDeclaration(statement, context, depth, true);
    return [declaration, `${ns.name}.${statement.name.text} = ${statement.name.text};`];
  }

  const printed = printStatement(statement, context, depth, ns);
  return printed === undefined ? [] : [printed];
}

function printVariableStatement(modifiers: NodeArray<ModifierLike> | undefined, declarationList: VariableDeclarationList, ns: NamespaceContext | undefined): string {
  const prefix = printModifierPrefix(modifiers);
  return `${prefix}${printVariableDeclarationList(declarationList, ns)};`;
}

function printVariableDeclarationList(declarationList: VariableDeclarationList, ns: NamespaceContext | undefined): string {
  return `${printVariableDeclarationKind(declarationList)} ${declarationList.declarations.map(declaration => printVariableDeclaration(declaration, ns)).join(", ")}`;
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

function printVariableDeclaration(declaration: VariableDeclaration, ns: NamespaceContext | undefined): string {
  const name = printBindingName(declaration.name);
  return declaration.initializer === undefined ? name : `${name} = ${printExpression(declaration.initializer, ns)}`;
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
  return printExpression(expression, undefined);
}

function printFunctionDeclaration(functionDeclaration: FunctionDeclaration, context: PrintContext, depth: number, omitExport: boolean): string {
  const prefix = printModifierPrefix(functionDeclaration.modifiers, omitExport);
  const asterisk = functionDeclaration.asteriskToken === undefined ? "" : "*";
  const name = functionDeclaration.name === undefined ? "" : ` ${functionDeclaration.name.text}`;
  const parameters = functionDeclaration.parameters.map(printParameterDeclaration).join(", ");
  const body = functionDeclaration.body === undefined ? ";" : ` ${printBlock(functionDeclaration.body.statements, context, depth, undefined)}`;
  return `${prefix}function${asterisk}${name}(${parameters})${body}`;
}

function printClassDeclaration(classDeclaration: ClassDeclaration, context: PrintContext, depth: number, omitExport: boolean): string {
  const prefix = printDeclarationModifierPrefix(classDeclaration.modifiers, omitExport);
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
  return ` extends ${printExpression(extendsClause.types[0]!.expression, undefined)}`;
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
    const body = member.body === undefined ? "{}" : printBlock(member.body.statements, context, depth, undefined);
    return `${prefix}get ${printPropertyName(member.name)}() ${body}`;
  }
  if (isSetAccessorDeclaration(member)) {
    const prefix = printMemberModifierPrefix(member.modifiers);
    const parameters = member.parameters.map(printParameterDeclaration).join(", ");
    const body = member.body === undefined ? "{}" : printBlock(member.body.statements, context, depth, undefined);
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
    return printBlock(constructorDeclaration.body.statements, context, depth, undefined);
  }

  const statementLines = constructorDeclaration.body.statements.flatMap(statement => {
    const printed = printStatement(statement, context, depth + 1, undefined);
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
  const body = methodDeclaration.body === undefined ? "{}" : printBlock(methodDeclaration.body.statements, context, depth, undefined);
  return `${prefix}${printPropertyName(methodDeclaration.name)}(${parameters}) ${body}`;
}

function printPropertyDeclaration(propertyDeclaration: PropertyDeclaration): string | undefined {
  if (hasModifier(propertyDeclaration.modifiers, Kind.DeclareKeyword)) {
    return undefined;
  }
  const prefix = printMemberModifierPrefix(propertyDeclaration.modifiers);
  const initializer = propertyDeclaration.initializer === undefined ? "" : ` = ${printExpression(propertyDeclaration.initializer, undefined)}`;
  return `${prefix}${printPropertyName(propertyDeclaration.name)}${initializer};`;
}

function printIfStatement(ifStatement: IfStatement, context: PrintContext, depth: number, ns: NamespaceContext | undefined): string {
  const thenStatement = printEmbeddedStatement(ifStatement.thenStatement, context, depth, ns);
  const elseStatement = ifStatement.elseStatement === undefined ? "" : ` else ${printEmbeddedStatement(ifStatement.elseStatement, context, depth, ns)}`;
  return `if (${printExpression(ifStatement.expression, ns)}) ${thenStatement}${elseStatement}`;
}

function printWhileStatement(whileStatement: WhileStatement, context: PrintContext, depth: number, ns: NamespaceContext | undefined): string {
  return `while (${printExpression(whileStatement.expression, ns)}) ${printEmbeddedStatement(whileStatement.statement, context, depth, ns)}`;
}

function printForInitializer(initializer: ForInitializer | undefined, ns: NamespaceContext | undefined): string {
  if (initializer === undefined) {
    return "";
  }
  if (isVariableDeclarationList(initializer)) {
    return printVariableDeclarationList(initializer, ns);
  }
  if (isMissingDeclaration(initializer)) {
    return "";
  }
  return printExpression(initializer, ns);
}

function printEmbeddedStatement(statement: Statement, context: PrintContext, depth: number, ns: NamespaceContext | undefined): string {
  if (isBlock(statement)) {
    return printBlock(statement.statements, context, depth, ns);
  }
  const printed = printStatement(statement, context, depth + 1, ns);
  if (printed === undefined) {
    return "{}";
  }
  return `{${context.newline}${context.indentText.repeat(depth + 1)}${printed}${context.newline}${context.indentText.repeat(depth)}}`;
}

function printBlock(statements: NodeArray<Statement>, context: PrintContext, depth: number, ns: NamespaceContext | undefined): string {
  if (statements.length === 0) {
    return "{}";
  }
  const childIndent = context.indentText.repeat(depth + 1);
  const currentIndent = context.indentText.repeat(depth);
  const body = statements.flatMap(statement => {
    const printed = printStatement(statement, context, depth + 1, ns);
    return printed === undefined ? [] : [`${childIndent}${printed}`];
  }).join(context.newline);
  return `{${context.newline}${body}${context.newline}${currentIndent}}`;
}

function printParameterDeclaration(parameter: ParameterDeclaration): string {
  const rest = parameter.dotDotDotToken === undefined ? "" : "...";
  const initializer = parameter.initializer === undefined ? "" : ` = ${printExpression(parameter.initializer, undefined)}`;
  return `${rest}${printBindingName(parameter.name)}${initializer}`;
}

function printModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined, omitExport = false): string {
  return printDeclarationModifierPrefix(modifiers, omitExport);
}

function printDeclarationModifierPrefix(modifiers: NodeArray<ModifierLike> | undefined, omitExport = false): string {
  if (modifiers === undefined || modifiers.length === 0) {
    return "";
  }
  const printed = modifiers.flatMap(modifier => {
    if (omitExport && modifier.kind === Kind.ExportKeyword) {
      return [];
    }
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
  const initializer = element.initializer === undefined ? "" : ` = ${printExpression(element.initializer, undefined)}`;
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
    return `[${printExpression(name.expression, undefined)}]`;
  }
  throw new Error(`Unsupported property name kind ${kindDebugName(name.kind)}`);
}

function printExpression(expression: Expression, ns: NamespaceContext | undefined): string {
  if (isIdentifier(expression)) {
    if (ns !== undefined && ns.exportedNames.has(expression.text)) {
      return `${ns.name}.${expression.text}`;
    }
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
    return `\`${expression.head.text}${expression.templateSpans.map(span => `\${${printExpression(span.expression, ns)}}${span.literal.text}`).join("")}\``;
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
    return `(${printExpression(expression.expression, ns)})`;
  }
  if (isArrayLiteralExpression(expression)) {
    return `[${expression.elements.map(element => printExpression(element, ns)).join(", ")}]`;
  }
  if (isSpreadElement(expression)) {
    return `...${printExpression(expression.expression, ns)}`;
  }
  if (isObjectLiteralExpression(expression)) {
    return `{ ${expression.properties.map(property => printObjectLiteralElement(property, ns)).join(", ")} }`;
  }
  if (isPropertyAccessExpression(expression)) {
    return `${printExpression(expression.expression, ns)}${expression.questionDotToken === undefined ? "." : "?."}${expression.name.text}`;
  }
  if (isElementAccessExpression(expression)) {
    return `${printExpression(expression.expression, ns)}${expression.questionDotToken === undefined ? "" : "?."}[${printExpression(expression.argumentExpression, ns)}]`;
  }
  if (isCallExpression(expression)) {
    return `${printExpression(expression.expression, ns)}${expression.questionDotToken === undefined ? "" : "?."}(${expression.arguments.map(argument => printExpression(argument, ns)).join(", ")})`;
  }
  if (isFunctionExpression(expression)) {
    const asterisk = expression.asteriskToken === undefined ? "" : "*";
    const name = expression.name === undefined ? "" : ` ${expression.name.text}`;
    const parameters = expression.parameters.map(printParameterDeclaration).join(", ");
    return `function${asterisk}${name}(${parameters}) ${printBlock(expression.body.statements, { newline: "\n", indentText: "  " }, 0, ns)}`;
  }
  if (isNewExpression(expression)) {
    const typeArguments = "";
    const argumentsText = expression.arguments === undefined ? "" : `(${expression.arguments.map(argument => printExpression(argument, ns)).join(", ")})`;
    return `new ${printExpression(expression.expression, ns)}${typeArguments}${argumentsText}`;
  }
  if (isPrefixUnaryExpression(expression)) {
    return `${printPrefixUnaryOperator(expression.operator)}${printExpression(expression.operand, ns)}`;
  }
  if (isDeleteExpression(expression)) {
    return `delete ${printExpression(expression.expression, ns)}`;
  }
  if (isTypeOfExpression(expression)) {
    return `typeof ${printExpression(expression.expression, ns)}`;
  }
  if (isVoidExpression(expression)) {
    return `void ${printExpression(expression.expression, ns)}`;
  }
  if (isAwaitExpression(expression)) {
    return `await ${printExpression(expression.expression, ns)}`;
  }
  if (isPostfixUnaryExpression(expression)) {
    return `${printExpression(expression.operand, ns)}${expression.operator === Kind.PlusPlusToken ? "++" : "--"}`;
  }
  if (isNonNullExpression(expression)) {
    return printExpression(expression.expression, ns);
  }
  if (isAsExpression(expression) || isSatisfiesExpression(expression)) {
    return printExpression(expression.expression, ns);
  }
  if (isConditionalExpression(expression)) {
    return `${printExpression(expression.condition, ns)} ? ${printExpression(expression.whenTrue, ns)} : ${printExpression(expression.whenFalse, ns)}`;
  }
  if (isArrowFunction(expression)) {
    return printArrowFunction(expression, ns);
  }
  if (isBinaryExpression(expression)) {
    return `${printExpression(expression.left, ns)} ${printBinaryOperator(expression.operatorToken)} ${printExpression(expression.right, ns)}`;
  }
  throw new Error(`Unsupported expression kind ${kindDebugName(expression.kind)}`);
}

function printArrowFunction(arrowFunction: ArrowFunction, ns: NamespaceContext | undefined): string {
  const parameters = arrowFunction.parameters.length === 1
    ? printParameterDeclaration(arrowFunction.parameters[0]!)
    : `(${arrowFunction.parameters.map(printParameterDeclaration).join(", ")})`;
  const body = isBlock(arrowFunction.body) ? printBlock(arrowFunction.body.statements, { newline: "\n", indentText: "  " }, 0, ns) : printExpression(arrowFunction.body, ns);
  return `${parameters} => ${body}`;
}

function printObjectLiteralElement(element: ObjectLiteralElementLike, ns: NamespaceContext | undefined): string {
  if (isPropertyAssignment(element)) {
    return `${printPropertyName(element.name)}: ${printExpression(element.initializer, ns)}`;
  }
  if (isShorthandPropertyAssignment(element)) {
    return printPropertyName(element.name);
  }
  if (isSpreadAssignment(element)) {
    return `...${printExpression(element.expression, ns)}`;
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
