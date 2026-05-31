/**
 * Node factory helpers for the printer.
 *
 * Substantive port of TS-Go `internal/printer/factory.go` (~1315 LoC,
 * 89 methods). The NodeFactory hosts helper constructors for synthetic
 * nodes used during emit (temp variables, generated names, emit
 * helpers like __decorate / __metadata / __param / __addDisposableResource).
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  IdentifierNode,
  Expression,
  Statement,
  TextRange,
  PrivateIdentifierNode,
  NodeArray,
} from "../ast/index.js";
import {
  Kind,
  NodeFlags,
  createArrowFunction,
  createArrayLiteralExpression,
  createArrayBindingPattern,
  createAwaitExpression,
  createAsExpression,
  createBinaryExpression,
  createBigIntLiteral,
  createBlock,
  createBreakStatement,
  createBindingElement,
  createCallExpression,
  createCaseBlock,
  createCaseClause,
  createCatchClause,
  createClassDeclaration,
  createClassExpression,
  createClassStaticBlockDeclaration,
  createConditionalExpression,
  createConstructorDeclaration,
  createContinueStatement,
  createDebuggerStatement,
  createDefaultClause,
  createDeleteExpression,
  createDoStatement,
  createElementAccessExpression,
  createEmptyStatement,
  createExportAssignment,
  createExportDeclaration,
  createExportSpecifier,
  createExpressionStatement,
  createExpressionWithTypeArguments,
  createForInStatement,
  createForOfStatement,
  createForStatement,
  createFunctionDeclaration,
  createFunctionExpression,
  createGetAccessorDeclaration,
  createHeritageClause,
  createIdentifier,
  createIfStatement,
  createImportClause,
  createImportDeclaration,
  createImportEqualsDeclaration,
  createImportSpecifier,
  createLabeledStatement,
  createMethodDeclaration,
  createNamedExports,
  createNamedImports,
  createNewExpression,
  createNoSubstitutionTemplateLiteral,
  createKeywordExpression,
  createNodeArray,
  createNumericLiteral,
  createObjectBindingPattern,
  createObjectLiteralExpression,
  createParameterDeclaration,
  createPartiallyEmittedExpression,
  createParenthesizedExpression,
  createPrefixUnaryExpression,
  createPrivateIdentifier,
  createPropertyAssignment,
  createPropertyAccessExpression,
  createPropertyDeclaration,
  createRegularExpressionLiteral,
  createReturnStatement,
  createSetAccessorDeclaration,
  createShorthandPropertyAssignment,
  createSpreadAssignment,
  createSpreadElement,
  createStringLiteral,
  createSwitchStatement,
  createSyntaxList,
  createTaggedTemplateExpression,
  createTemplateExpression,
  createTemplateSpan,
  createThrowStatement,
  createToken,
  createTypeAssertion,
  createTypeOfExpression,
  createTypeParameterDeclaration,
  createTypeReferenceNode,
  createTryStatement,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
  createVoidExpression,
  createWhileStatement,
  createYieldExpression,
  updateArrowFunction as updateAstArrowFunction,
  updateAsExpression as updateAstAsExpression,
  updateCallExpression as updateAstCallExpression,
  updateClassDeclaration as updateAstClassDeclaration,
  updateClassExpression as updateAstClassExpression,
  updateConstructorDeclaration as updateAstConstructorDeclaration,
  updateDoStatement as updateAstDoStatement,
  updateElementAccessExpression as updateAstElementAccessExpression,
  updateExportDeclaration as updateAstExportDeclaration,
  updateExpressionStatement as updateAstExpressionStatement,
  updateExpressionWithTypeArguments as updateAstExpressionWithTypeArguments,
  updateForInStatement as updateAstForInStatement,
  updateForOfStatement as updateAstForOfStatement,
  updateForStatement as updateAstForStatement,
  updateFunctionDeclaration as updateAstFunctionDeclaration,
  updateFunctionExpression as updateAstFunctionExpression,
  updateGetAccessorDeclaration as updateAstGetAccessorDeclaration,
  updateHeritageClause as updateAstHeritageClause,
  updateIfStatement as updateAstIfStatement,
  updateImportClause as updateAstImportClause,
  updateImportDeclaration as updateAstImportDeclaration,
  updateLabeledStatement as updateAstLabeledStatement,
  updateMethodDeclaration as updateAstMethodDeclaration,
  updateNamedExports as updateAstNamedExports,
  updateNamedImports as updateAstNamedImports,
  updateNewExpression as updateAstNewExpression,
  updateNonNullExpression as updateAstNonNullExpression,
  updateParameterDeclaration as updateAstParameterDeclaration,
  updateParenthesizedExpression as updateAstParenthesizedExpression,
  updatePartiallyEmittedExpression as updateAstPartiallyEmittedExpression,
  updatePropertyAccessExpression as updateAstPropertyAccessExpression,
  updatePropertyDeclaration as updateAstPropertyDeclaration,
  updateSetAccessorDeclaration as updateAstSetAccessorDeclaration,
  updateSatisfiesExpression as updateAstSatisfiesExpression,
  updateSourceFile as updateAstSourceFile,
  updateSwitchStatement as updateAstSwitchStatement,
  updateTaggedTemplateExpression as updateAstTaggedTemplateExpression,
  updateTypeAssertion as updateAstTypeAssertion,
  updateVariableDeclaration as updateAstVariableDeclaration,
  updateVariableDeclarationList as updateAstVariableDeclarationList,
  updateWhileStatement as updateAstWhileStatement,
} from "../ast/index.js";
import { EmitFlags } from "./emitFlags.js";

// ---------------------------------------------------------------------------
// AutoGenerate options
// ---------------------------------------------------------------------------

export interface AutoGenerateOptions {
  flags?: number;
  prefix?: string;
  suffix?: string;
}

export interface NameOptions { allowComments?: boolean; allowSourceMaps?: boolean; emitFlags?: number }
export interface AssignedNameOptions { allowComments?: boolean; allowSourceMaps?: boolean; ignoreAssignedName?: boolean; ignoreEmptyStringLiteral?: boolean; assignedName?: string }

export type PrivateIdentifierKindStr = "field" | "method" | "accessor" | "auto-accessor";

// ---------------------------------------------------------------------------
// NodeFactory class
// ---------------------------------------------------------------------------

export class NodeFactory {
  private nextAutoGenerateId = 0;
  private readonly autoGenerate = new Map<AstNode, AutoGenerateOptions & { readonly id: number; readonly node?: AstNode | undefined }>();

  // -------------------------------------------------------------------------
  // Temp / loop / unique / generated names
  // -------------------------------------------------------------------------

  newTempVariable(): IdentifierNode {
    return this.newTempVariableEx({});
  }
  newTempVariableEx(options: AutoGenerateOptions): IdentifierNode {
    return this.newGeneratedIdentifier("(auto)", undefined, options);
  }
  newLoopVariable(): IdentifierNode { return this.newLoopVariableEx({}); }
  newLoopVariableEx(options: AutoGenerateOptions): IdentifierNode {
    return this.newGeneratedIdentifier("(loop)", undefined, options);
  }
  newUniqueName(text: string): IdentifierNode { return this.newUniqueNameEx(text, {}); }
  newUniqueNameEx(text: string, options: AutoGenerateOptions): IdentifierNode {
    return this.newGeneratedIdentifier(text, undefined, options);
  }
  newGeneratedNameForNode(node: AstNode): IdentifierNode { return this.newGeneratedNameForNodeEx(node, {}); }
  newGeneratedNameForNodeEx(node: AstNode, options: AutoGenerateOptions): IdentifierNode {
    const text = memberNameText(node) ?? `(generated@${this.nextAutoGenerateId + 1})`;
    return this.newGeneratedIdentifier(text, node, options);
  }
  newUniquePrivateName(text: string): PrivateIdentifierNode {
    return this.newUniquePrivateNameEx(text, {});
  }
  newUniquePrivateNameEx(text: string, options: AutoGenerateOptions): PrivateIdentifierNode {
    return this.newGeneratedPrivateIdentifier(text, undefined, options);
  }
  newGeneratedPrivateNameForNode(node: AstNode): PrivateIdentifierNode {
    return this.newGeneratedPrivateNameForNodeEx(node, {});
  }
  newGeneratedPrivateNameForNodeEx(node: AstNode, options: AutoGenerateOptions): PrivateIdentifierNode {
    const text = memberNameText(node) ?? `(generated@${this.nextAutoGenerateId + 1})`;
    return this.newGeneratedPrivateIdentifier(text, node, options);
  }

  newStringLiteralFromNode(textSourceNode: AstNode): AstNode {
    const text = (textSourceNode as unknown as { text?: string }).text ?? "";
    const node = createStringLiteral(text, 0) as AstNode & { textSourceNode?: AstNode };
    node.textSourceNode = textSourceNode;
    return node;
  }

  // -------------------------------------------------------------------------
  // Primitive expressions
  // -------------------------------------------------------------------------

  newBinary(left: Expression, operatorTokenKind: number, right: Expression): Expression {
    return createBinaryExpression(
      undefined,
      left,
      undefined,
      createToken(operatorTokenKind as never) as never,
      right,
    ) as unknown as Expression;
  }

  newThisExpression(): Expression { return createKeywordExpression(Kind.ThisKeyword) as unknown as Expression; }
  newTrueExpression(): Expression { return createKeywordExpression(Kind.TrueKeyword) as unknown as Expression; }
  newFalseExpression(): Expression { return createKeywordExpression(Kind.FalseKeyword) as unknown as Expression; }
  newNullExpression(): Expression { return createKeywordExpression(Kind.NullKeyword) as unknown as Expression; }
  newCommaExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.CommaToken, right);
  }
  newAssignmentExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.EqualsToken, right);
  }
  newAssignment(left: Expression, right: Expression): Expression { return this.newAssignmentExpression(left, right); }
  newLogicalORExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.BarBarToken, right);
  }
  newLogicalANDExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.AmpersandAmpersandToken, right);
  }
  newBitwiseORExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.BarToken, right);
  }
  newBitwiseXORExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.CaretToken, right);
  }
  newBitwiseANDExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.AmpersandToken, right);
  }
  newStrictEqualityExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.EqualsEqualsEqualsToken, right);
  }
  newStrictInequalityExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, Kind.ExclamationEqualsEqualsToken, right);
  }
  newVoidZeroExpression(): Expression {
    return createVoidExpression(this.newNumericLiteral("0", 0)) as unknown as Expression;
  }
  newVoidZero(): Expression { return this.newVoidZeroExpression(); }
  newConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): Expression {
    return createConditionalExpression(
      condition,
      createToken(Kind.QuestionToken) as never,
      whenTrue,
      createToken(Kind.ColonToken) as never,
      whenFalse,
    ) as unknown as Expression;
  }
  newTypeOfExpression(expression: Expression): Expression {
    return createTypeOfExpression(expression) as unknown as Expression;
  }
  newAnyKeyword(): AstNode { return createToken(Kind.AnyKeyword) as unknown as AstNode; }
  newEmptyStatement(): Statement {
    return createEmptyStatement() as unknown as Statement;
  }
  newBlock(statements: readonly Statement[]): Statement {
    return createBlock(createNodeArray(statements) as NodeArray<never>, false) as unknown as Statement;
  }
  newSyntaxList(items: readonly AstNode[]): AstNode {
    return createSyntaxList(items) as unknown as AstNode;
  }
  newLetStatement(name: IdentifierNode, initializer: Expression | undefined): Statement {
    const declaration = createVariableDeclaration(name as never, undefined, undefined, initializer);
    const declarationList = createVariableDeclarationList(createNodeArray([declaration]) as NodeArray<never>, NodeFlags.Let);
    return createVariableStatement(undefined, declarationList) as unknown as Statement;
  }
  newExpressionStatement(expression: Expression): Statement {
    return createExpressionStatement(expression) as unknown as Statement;
  }
  newPropertyAccessExpression(expression: Expression, name: AstNode): AstNode {
    return createPropertyAccessExpression(expression, undefined, name as never, 0) as unknown as AstNode;
  }
  newElementAccessExpression(expression: Expression, argumentExpression: Expression): Expression {
    return createElementAccessExpression(expression, undefined, argumentExpression, 0) as unknown as Expression;
  }
  newIdentifier(text: string): AstNode {
    return createIdentifier(text) as unknown as AstNode;
  }
  newStringLiteral(text: string, flags: number): Expression {
    return createStringLiteral(text, flags) as unknown as Expression;
  }
  newNumericLiteral(text: string, flags: number): Expression {
    return createNumericLiteral(text, flags) as unknown as Expression;
  }
  newPrefixUnaryExpression(operator: number, operand: Expression): Expression {
    return createPrefixUnaryExpression(operator as Kind, operand) as unknown as Expression;
  }
  newArrayLiteralExpression(elements: readonly Expression[]): AstNode {
    return createArrayLiteralExpression(createNodeArray(elements) as NodeArray<never>, false) as unknown as AstNode;
  }
  newObjectLiteralExpression(properties: unknown, multiLine = false): AstNode {
    return createObjectLiteralExpression(asNodeArray(properties), multiLine) as unknown as AstNode;
  }
  newPropertyAssignment(...args: unknown[]): AstNode {
    return createPropertyAssignment(args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode;
  }
  newShorthandPropertyAssignment(...args: unknown[]): AstNode {
    return createShorthandPropertyAssignment(args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode;
  }
  newSpreadAssignment(expression: AstNode): AstNode {
    return createSpreadAssignment(expression as never) as unknown as AstNode;
  }
  newReflectSetCall(target: Expression, name: Expression, value: Expression, receiver: Expression): Expression {
    return this.newGlobalMethodCall("Reflect", "set", [target, name, value, receiver]);
  }
  newAssignmentTargetWrapper(target: Expression, value: Expression): Expression {
    // (target = value) — used in destructuring synth.
    return this.newAssignmentExpression(target, value);
  }

  // -------------------------------------------------------------------------
  // Type checks + call helpers
  // -------------------------------------------------------------------------

  newCallExpression(expression: AstNode, argumentsList: readonly AstNode[]): Expression {
    return createCallExpression(
      expression as never,
      undefined,
      undefined,
      createNodeArray(argumentsList as readonly Expression[]) as NodeArray<never>,
      0,
    ) as unknown as Expression;
  }
  newNewExpression(...args: unknown[]): AstNode {
    return createNewExpression(args[0] as never, asOptionalNodeArray(args[1]), asOptionalNodeArray(args[2])) as unknown as AstNode;
  }
  newTaggedTemplateExpression(...args: unknown[]): AstNode {
    return createTaggedTemplateExpression(args[0] as never, args[1] as never, asOptionalNodeArray(args[2]), args[3] as never, args[4] as number ?? 0) as unknown as AstNode;
  }
  newTypeCheck(value: AstNode, tag: string): AstNode {
    // typeof value === "tag"
    return this.newStrictEqualityExpression(
      this.newTypeOfExpression(value as Expression),
      this.newStringLiteral(tag, 0),
    );
  }

  newToken(kind: number): AstNode {
    return createToken(kind as never) as unknown as AstNode;
  }
  newKeywordExpression(kind: number): AstNode {
    return createKeywordExpression(kind as never) as unknown as AstNode;
  }
  newSuperExpression(): AstNode {
    return createKeywordExpression(Kind.SuperKeyword) as unknown as AstNode;
  }
  newUnknownKeyword(): AstNode {
    return createToken(Kind.UnknownKeyword as never) as unknown as AstNode;
  }
  newPostfixUnaryExpression(operand: AstNode, operator: number): AstNode {
    return { kind: Kind.PostfixUnaryExpression, operand, operator } as unknown as AstNode;
  }
  newConditionalExpression(...args: unknown[]): AstNode {
    return createConditionalExpression(args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode;
  }
  newDeleteExpression(expression: AstNode): AstNode {
    return createDeleteExpression(expression as never) as unknown as AstNode;
  }
  newAwaitExpression(expression: AstNode): AstNode {
    return createAwaitExpression(expression as never) as unknown as AstNode;
  }
  newYieldExpression(asteriskToken: AstNode | undefined, expression: AstNode | undefined): AstNode {
    return createYieldExpression(asteriskToken as never, expression as never) as unknown as AstNode;
  }
  newSpreadElement(expression: AstNode): AstNode {
    return createSpreadElement(expression as never) as unknown as AstNode;
  }
  newParenthesizedExpression(expression: AstNode): AstNode {
    return createParenthesizedExpression(expression as never) as unknown as AstNode;
  }
  newBigIntLiteral(value: string, flags = 0): AstNode {
    return createBigIntLiteral(value, flags) as unknown as AstNode;
  }
  newRegularExpressionLiteral(text: string): AstNode {
    return createRegularExpressionLiteral(text, 0) as unknown as AstNode;
  }
  newNoSubstitutionTemplateLiteral(text: string, rawText: string | undefined): AstNode {
    return createNoSubstitutionTemplateLiteral(rawText ?? text, 0) as unknown as AstNode;
  }
  newTemplateExpression(head: AstNode, spans: readonly AstNode[]): AstNode {
    return createTemplateExpression(head as never, createNodeArray(spans) as NodeArray<never>) as unknown as AstNode;
  }
  newTemplateSpan(expression: AstNode, literal: AstNode): AstNode {
    return createTemplateSpan(expression as never, literal as never) as unknown as AstNode;
  }

  newVariableDeclaration(...args: unknown[]): AstNode {
    return createVariableDeclaration(args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode;
  }
  newVariableDeclarationList(...args: unknown[]): AstNode {
    return createVariableDeclarationList(asNodeArray(args[0]), args[1] as number ?? 0) as unknown as AstNode;
  }
  newVariableStatement(...args: unknown[]): AstNode {
    return createVariableStatement(asOptionalNodeArray(args[0]), args[1] as never) as unknown as AstNode;
  }
  newParameterDeclaration(...args: unknown[]): AstNode {
    return createParameterDeclaration(args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode;
  }
  newBindingElement(...args: unknown[]): AstNode {
    return createBindingElement(args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode;
  }
  newObjectBindingPattern(elements: readonly AstNode[]): AstNode {
    return createObjectBindingPattern(createNodeArray(elements) as NodeArray<never>) as unknown as AstNode;
  }
  newArrayBindingPattern(elements: readonly AstNode[]): AstNode {
    return createArrayBindingPattern(createNodeArray(elements) as NodeArray<never>) as unknown as AstNode;
  }

  newIfStatement(expression: AstNode, thenStatement: AstNode, elseStatement?: AstNode): AstNode {
    return createIfStatement(expression as never, thenStatement as never, elseStatement as never) as unknown as AstNode;
  }
  newDoStatement(statement: AstNode, expression: AstNode): AstNode {
    return createDoStatement(statement as never, expression as never) as unknown as AstNode;
  }
  newWhileStatement(expression: AstNode, statement: AstNode): AstNode {
    return createWhileStatement(expression as never, statement as never) as unknown as AstNode;
  }
  newForStatement(initializer: AstNode | undefined, condition: AstNode | undefined, incrementor: AstNode | undefined, statement: AstNode): AstNode {
    return createForStatement(initializer as never, condition as never, incrementor as never, statement as never) as unknown as AstNode;
  }
  newForInStatement(initializer: AstNode, expression: AstNode, statement: AstNode): AstNode {
    return createForInStatement(undefined, initializer as never, expression as never, statement as never) as unknown as AstNode;
  }
  newForOfStatement(awaitModifier: AstNode | undefined, initializer: AstNode, expression: AstNode, statement: AstNode): AstNode {
    return createForOfStatement(awaitModifier as never, initializer as never, expression as never, statement as never) as unknown as AstNode;
  }
  newReturnStatement(expression?: AstNode): AstNode {
    return createReturnStatement(expression as never) as unknown as AstNode;
  }
  newBreakStatement(label?: IdentifierNode): AstNode {
    return createBreakStatement(label as never) as unknown as AstNode;
  }
  newContinueStatement(label?: IdentifierNode): AstNode {
    return createContinueStatement(label as never) as unknown as AstNode;
  }
  newThrowStatement(expression: AstNode): AstNode {
    return createThrowStatement(expression as never) as unknown as AstNode;
  }
  newTryStatement(tryBlock: AstNode, catchClause?: AstNode, finallyBlock?: AstNode): AstNode {
    return createTryStatement(tryBlock as never, catchClause as never, finallyBlock as never) as unknown as AstNode;
  }
  newCatchClause(variableDeclaration: AstNode | undefined, block: AstNode): AstNode {
    return createCatchClause(variableDeclaration as never, block as never) as unknown as AstNode;
  }
  newSwitchStatement(expression: AstNode, caseBlock: AstNode): AstNode {
    return createSwitchStatement(expression as never, caseBlock as never) as unknown as AstNode;
  }
  newCaseClause(expression: AstNode, statements: readonly AstNode[]): AstNode {
    return createCaseClause(expression as never, createNodeArray(statements) as NodeArray<never>) as unknown as AstNode;
  }
  newDefaultClause(statements: readonly AstNode[]): AstNode {
    return createDefaultClause(undefined as never, createNodeArray(statements) as NodeArray<never>) as unknown as AstNode;
  }
  newCaseBlock(clauses: readonly AstNode[]): AstNode {
    return createCaseBlock(createNodeArray(clauses) as NodeArray<never>) as unknown as AstNode;
  }
  newLabeledStatement(label: IdentifierNode, statement: AstNode): AstNode {
    return createLabeledStatement(label as never, statement as never) as unknown as AstNode;
  }
  newDebuggerStatement(): AstNode {
    return createDebuggerStatement() as unknown as AstNode;
  }

  newFunctionDeclaration(...args: unknown[]): AstNode {
    return createFunctionDeclaration(asOptionalNodeArray(args[0]), args[1] as never, args[2] as never, asOptionalNodeArray(args[3]), asNodeArray(args[4]), args[5] as never, args[6] as never) as unknown as AstNode;
  }
  newFunctionExpression(...args: unknown[]): AstNode {
    return createFunctionExpression(asOptionalNodeArray(args[0]), args[1] as never, args[2] as never, asOptionalNodeArray(args[3]), asNodeArray(args[4]), args[5] as never, args[6] as never) as unknown as AstNode;
  }
  newArrowFunction(...args: unknown[]): AstNode {
    return createArrowFunction(asOptionalNodeArray(args[0]), asOptionalNodeArray(args[1]), asNodeArray(args[2]), args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode;
  }
  newConstructorDeclaration(...args: unknown[]): AstNode {
    return createConstructorDeclaration(asOptionalNodeArray(args[0]), asOptionalNodeArray(args[1]), asNodeArray(args[2]), args[3] as never, args[4] as never) as unknown as AstNode;
  }
  newMethodDeclaration(...args: unknown[]): AstNode {
    return createMethodDeclaration(asOptionalNodeArray(args[0]), args[1] as never, args[2] as never, args[3] as never, asOptionalNodeArray(args[4]), asNodeArray(args[5]), args[6] as never, args[7] as never) as unknown as AstNode;
  }
  newGetAccessorDeclaration(...args: unknown[]): AstNode {
    return createGetAccessorDeclaration(asOptionalNodeArray(args[0]), args[1] as never, asOptionalNodeArray(args[2]), asNodeArray(args[3]), args[4] as never, args[5] as never) as unknown as AstNode;
  }
  newSetAccessorDeclaration(...args: unknown[]): AstNode {
    return createSetAccessorDeclaration(asOptionalNodeArray(args[0]), args[1] as never, asOptionalNodeArray(args[2]), asNodeArray(args[3]), args[4] as never, args[5] as never) as unknown as AstNode;
  }
  newPropertyDeclaration(...args: unknown[]): AstNode {
    return createPropertyDeclaration(asOptionalNodeArray(args[0]), args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode;
  }
  newClassDeclaration(...args: unknown[]): AstNode {
    return createClassDeclaration(asOptionalNodeArray(args[0]), args[1] as never, asOptionalNodeArray(args[2]), asOptionalNodeArray(args[3]), asNodeArray(args[4])) as unknown as AstNode;
  }
  newClassExpression(...args: unknown[]): AstNode {
    return createClassExpression(asOptionalNodeArray(args[0]), args[1] as never, asOptionalNodeArray(args[2]), asOptionalNodeArray(args[3]), asNodeArray(args[4])) as unknown as AstNode;
  }
  newClassStaticBlockDeclaration(body: AstNode): AstNode {
    return createClassStaticBlockDeclaration(undefined, body as never) as unknown as AstNode;
  }

  newImportDeclaration(...args: unknown[]): AstNode {
    return createImportDeclaration(asOptionalNodeArray(args[0]), args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode;
  }
  newExportDeclaration(...args: unknown[]): AstNode {
    return createExportDeclaration(asOptionalNodeArray(args[0]), Boolean(args[1]), args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode;
  }
  newImportClause(...args: unknown[]): AstNode {
    return createImportClause(args[0] as never, args[1] as never, args[2] as never) as unknown as AstNode;
  }
  newNamedImports(elements: readonly AstNode[]): AstNode {
    return createNamedImports(createNodeArray(elements) as NodeArray<never>) as unknown as AstNode;
  }
  newNamedExports(elements: readonly AstNode[]): AstNode {
    return createNamedExports(createNodeArray(elements) as NodeArray<never>) as unknown as AstNode;
  }
  newImportSpecifier(isTypeOnly: boolean, propertyName: IdentifierNode | undefined, name: IdentifierNode): AstNode {
    return createImportSpecifier(isTypeOnly, propertyName as never, name as never) as unknown as AstNode;
  }
  newExportSpecifier(...args: unknown[]): AstNode {
    return createExportSpecifier(Boolean(args[0]), args[1] as never, args[2] as never) as unknown as AstNode;
  }
  newImportEqualsDeclaration(modifiers: unknown, isTypeOnly: boolean, name: IdentifierNode, moduleReference: AstNode): AstNode {
    return createImportEqualsDeclaration(asOptionalNodeArray(modifiers), isTypeOnly, name as never, moduleReference as never) as unknown as AstNode;
  }
  newExportAssignment(...args: unknown[]): AstNode {
    return createExportAssignment(asOptionalNodeArray(args[0]), Boolean(args[1]), args[2] as never, args[3] as never) as unknown as AstNode;
  }
  newHeritageClause(token: number, types: readonly AstNode[]): AstNode {
    return createHeritageClause(token as Kind, createNodeArray(types) as NodeArray<never>) as unknown as AstNode;
  }
  newExpressionWithTypeArguments(expression: AstNode, typeArguments: readonly AstNode[] | undefined): AstNode {
    return createExpressionWithTypeArguments(expression as never, typeArguments === undefined ? undefined : createNodeArray(typeArguments) as NodeArray<never>) as unknown as AstNode;
  }
  newTypeReference(name: AstNode, typeArguments?: readonly AstNode[]): AstNode {
    return createTypeReferenceNode(name as never, typeArguments === undefined ? undefined : createNodeArray(typeArguments) as NodeArray<never>) as unknown as AstNode;
  }
  newTypeParameter(name: IdentifierNode, constraint?: AstNode, defaultType?: AstNode): AstNode {
    return createTypeParameterDeclaration(undefined, name as never, constraint as never, undefined, defaultType as never) as unknown as AstNode;
  }
  newMethodCall(object: AstNode, methodName: AstNode, argumentsList: readonly AstNode[]): Expression {
    return this.newCallExpression(
      this.newPropertyAccessExpression(object as Expression, methodName),
      argumentsList,
    );
  }
  newGlobalMethodCall(globalObjectName: string, methodName: string, argumentsList: readonly AstNode[]): Expression {
    return this.newMethodCall(
      this.newIdentifier(globalObjectName),
      this.newIdentifier(methodName),
      argumentsList,
    );
  }
  newFunctionCallCall(target: Expression, thisArg: Expression, argumentsList: readonly AstNode[]): Expression {
    // target.call(thisArg, ...args)
    return this.newMethodCall(target, this.newIdentifier("call"), [thisArg, ...argumentsList]);
  }
  newArraySliceCall(array: Expression, start: number): Expression {
    // array.slice(start)
    return this.newMethodCall(array, this.newIdentifier("slice"), [this.newNumericLiteral(`${start}`, 0)]);
  }
  inlineExpressions(expressions: readonly Expression[]): Expression {
    if (expressions.length === 0) return undefined as unknown as Expression;
    const flattened = flattenCommaElements(expressions);
    let expression = flattened[0]!;
    for (const next of flattened.slice(1)) expression = this.newCommaExpression(expression, next);
    return expression;
  }

  createExpressionFromEntityName(node: AstNode): Expression {
    const qualified = node as { kind?: number; left?: AstNode; right?: AstNode };
    if (qualified.kind === Kind.QualifiedName && qualified.left !== undefined && qualified.right !== undefined) {
      return this.newPropertyAccessExpression(
        this.createExpressionFromEntityName(qualified.left),
        cloneNodeLike(qualified.right),
      ) as unknown as Expression;
    }
    return cloneNodeLike(node) as unknown as Expression;
  }

  restoreEnclosingLabel(node: AstNode, outermostLabeledStatement: AstNode | undefined): AstNode {
    if (outermostLabeledStatement === undefined) return node;
    const labeled = outermostLabeledStatement as { label?: IdentifierNode; statement?: AstNode };
    const statement = labeled.statement;
    const innerLabel = statement !== undefined && (statement as { kind?: number }).kind === Kind.LabeledStatement
      ? this.restoreEnclosingLabel(node, statement)
      : node;
    return this.updateLabeledStatement(outermostLabeledStatement, labeled.label, innerLabel);
  }

  createForOfBindingStatement(node: AstNode, boundValue: AstNode): AstNode {
    const candidate = node as { kind?: number; declarations?: { nodes?: readonly AstNode[] } | readonly AstNode[]; flags?: number };
    if (candidate.kind === Kind.VariableDeclarationList) {
      const declarations = nodeArrayElements(candidate.declarations);
      const [firstDeclaration, ...rest] = declarations;
      if (firstDeclaration === undefined) return this.newEmptyStatement();
      const first = firstDeclaration as { name?: AstNode };
      const updatedDeclaration = this.updateVariableDeclaration(firstDeclaration, first.name, undefined, undefined, boundValue);
      const updatedList = this.updateVariableDeclarationList(
        node,
        this.newNodeList([updatedDeclaration, ...rest]),
        candidate.flags ?? NodeFlags.None,
      );
      return this.newVariableStatement(undefined, updatedList);
    }
    return this.newExpressionStatement(this.newAssignmentExpression(node as unknown as Expression, boundValue as unknown as Expression));
  }

  restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds = OuterExpressionKinds.All): Expression {
    if (outerExpression !== undefined && isOuterExpressionKind((outerExpression as { kind?: number }).kind, kinds) && !this.isIgnorableParen(outerExpression)) {
      const expression = (outerExpression as { expression?: Expression }).expression;
      return this.updateOuterExpression(
        outerExpression,
        this.restoreOuterExpressions(expression, innerExpression, OuterExpressionKinds.All),
      );
    }
    return innerExpression;
  }

  ensureUseStrict(statements: readonly Statement[]): readonly Statement[] {
    const first = statements[0];
    if (first !== undefined && isUseStrictPrologue(first)) return statements;
    return [this.newExpressionStatement(this.newStringLiteral("use strict", 0)), ...statements];
  }

  splitStandardPrologue(source: readonly Statement[]): readonly [readonly Statement[], readonly Statement[]] {
    const index = findFirstIndex(source, (statement) => !isPrologueDirectiveStatement(statement));
    return index < 0 ? [source, []] : [source.slice(0, index), source.slice(index)];
  }

  splitCustomPrologue(source: readonly Statement[]): readonly [readonly Statement[], readonly Statement[]] {
    const index = findFirstIndex(source, (statement) => isPrologueDirectiveStatement(statement) || !this.isCustomPrologue(statement));
    return index < 0 ? [source, []] : [source.slice(0, index), source.slice(index)];
  }

  getLocalName(node: AstNode): IdentifierNode {
    return this.getLocalNameEx(node, {});
  }

  getLocalNameEx(node: AstNode, opts: AssignedNameOptions): IdentifierNode {
    return this.getName(node, EmitFlags.LocalName, opts);
  }

  getExportName(node: AstNode): IdentifierNode {
    return this.getExportNameEx(node, {});
  }

  getExportNameEx(node: AstNode, opts: AssignedNameOptions): IdentifierNode {
    return this.getName(node, EmitFlags.ExportName, opts);
  }

  getDeclarationName(node: AstNode): IdentifierNode {
    return this.getDeclarationNameEx(node, {});
  }

  getDeclarationNameEx(node: AstNode, opts: NameOptions): IdentifierNode {
    const assignedOptions: AssignedNameOptions = {};
    if (opts.allowComments !== undefined) assignedOptions.allowComments = opts.allowComments;
    if (opts.allowSourceMaps !== undefined) assignedOptions.allowSourceMaps = opts.allowSourceMaps;
    return this.getName(node, EmitFlags.None, assignedOptions);
  }

  getNamespaceMemberName(ns: IdentifierNode, name: IdentifierNode, opts: NameOptions): IdentifierNode {
    const qualifiedName = this.newPropertyAccessExpression(ns as unknown as Expression, name) as unknown as IdentifierNode;
    return this.withNameEmitFlags(qualifiedName, opts);
  }

  getExternalModuleOrNamespaceExportName(ns: IdentifierNode | undefined, node: AstNode, allowComments: boolean, allowSourceMaps: boolean): AstNode {
    if (ns !== undefined && hasModifier(node, Kind.ExportKeyword)) {
      const opts: NameOptions = { allowComments, allowSourceMaps };
      return this.getNamespaceMemberName(ns, this.getDeclarationNameEx(node, opts), opts) as unknown as AstNode;
    }
    return this.getExportNameEx(node, { allowComments, allowSourceMaps }) as unknown as AstNode;
  }

  newObjectDefinePropertyCall(target: Expression, propertyName: Expression, attributes: AstNode): Expression {
    return this.newGlobalMethodCall("Object", "defineProperty", [target, propertyName, attributes]);
  }

  newReflectGetCall(target: Expression, propertyKey: Expression, receiver?: Expression): Expression {
    return this.newGlobalMethodCall("Reflect", "get", receiver === undefined ? [target, propertyKey] : [target, propertyKey, receiver]);
  }

  newFunctionBindCall(target: Expression, thisArg: Expression, argumentsList: readonly AstNode[]): Expression {
    return this.newMethodCall(target, this.newIdentifier("bind"), [thisArg, ...argumentsList]);
  }

  newImmediatelyInvokedArrowFunction(statements: readonly Statement[]): Expression {
    return this.newCallExpression(
      this.newParenthesizedExpression(this.newArrowFunction(undefined, undefined, [], undefined, undefined, this.newBlock(statements)) as AstNode),
      [],
    );
  }

  newExportDefault(expression: AstNode): AstNode {
    return this.newExportAssignment(undefined, false, expression);
  }

  newExternalModuleExport(exportName: AstNode): AstNode {
    return this.newExportDeclaration(undefined, false, this.newNamedExports([this.newExportSpecifier(false, undefined, exportName as IdentifierNode)]), undefined, undefined);
  }

  // -------------------------------------------------------------------------
  // Update helpers (forwarders to per-node update functions)
  // -------------------------------------------------------------------------

  updatePropertyAccessExpression(
    node: AstNode, expression: AstNode, questionDotToken: AstNode | undefined,
    name: AstNode, flags: number,
  ): AstNode {
    return updateAstPropertyAccessExpression(node as never, expression as never, questionDotToken as never, name as never, flags) as unknown as AstNode;
  }

  updatePropertyDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstPropertyDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateConstructorDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstConstructorDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateMethodDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstMethodDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never, args[6] as never, args[7] as never) as unknown as AstNode; }
  updateGetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstGetAccessorDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode; }
  updateSetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstSetAccessorDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode; }
  updateVariableDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstVariableDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode; }
  updateHeritageClause(node: AstNode, ...args: unknown[]): AstNode { return updateAstHeritageClause(node as never, args[0] as never, args[1] as never) as unknown as AstNode; }
  updateClassDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstClassDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateClassExpression(node: AstNode, ...args: unknown[]): AstNode { return updateAstClassExpression(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateFunctionDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstFunctionDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never, args[6] as never) as unknown as AstNode; }
  updateFunctionExpression(node: AstNode, ...args: unknown[]): AstNode { return updateAstFunctionExpression(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never, args[6] as never) as unknown as AstNode; }
  updateArrowFunction(node: AstNode, ...args: unknown[]): AstNode { return updateAstArrowFunction(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode; }
  updateParameterDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstParameterDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never, args[5] as never) as unknown as AstNode; }
  updateCallExpression(node: AstNode, ...args: unknown[]): AstNode { return updateAstCallExpression(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateNewExpression(node: AstNode, ...args: unknown[]): AstNode { return updateAstNewExpression(node as never, args[0] as never, args[1] as never, args[2] as never) as unknown as AstNode; }
  updateTaggedTemplateExpression(node: AstNode, ...args: unknown[]): AstNode { return updateAstTaggedTemplateExpression(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateIfStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstIfStatement(node as never, args[0] as never, args[1] as never, args[2] as never) as unknown as AstNode; }
  updateDoStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstDoStatement(node as never, args[0] as never, args[1] as never) as unknown as AstNode; }
  updateWhileStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstWhileStatement(node as never, args[0] as never, args[1] as never) as unknown as AstNode; }
  updateForStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstForStatement(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode; }
  updateForInStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstForInStatement(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode; }
  updateForOfStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstForOfStatement(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode; }
  updateSwitchStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstSwitchStatement(node as never, args[0] as never, args[1] as never) as unknown as AstNode; }
  updateLabeledStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstLabeledStatement(node as never, args[0] as never, args[1] as never) as unknown as AstNode; }
  updateExpressionStatement(node: AstNode, ...args: unknown[]): AstNode { return updateAstExpressionStatement(node as never, args[0] as never) as unknown as AstNode; }
  updateVariableDeclarationList(node: AstNode, ...args: unknown[]): AstNode { return updateAstVariableDeclarationList(node as never, asNodeArray(args[0]), args[1] as number ?? nodeFlags(node)) as unknown as AstNode; }
  updateParenthesizedExpression(node: AstNode, expression: AstNode): AstNode { return updateAstParenthesizedExpression(node as never, expression as never) as unknown as AstNode; }
  updateTypeAssertion(node: AstNode, type: AstNode, expression: AstNode): AstNode { return updateAstTypeAssertion(node as never, type as never, expression as never) as unknown as AstNode; }
  updateAsExpression(node: AstNode, expression: AstNode, type: AstNode): AstNode { return updateAstAsExpression(node as never, expression as never, type as never) as unknown as AstNode; }
  updateSatisfiesExpression(node: AstNode, expression: AstNode, type: AstNode): AstNode { return updateAstSatisfiesExpression(node as never, expression as never, type as never) as unknown as AstNode; }
  updateNonNullExpression(node: AstNode, expression: AstNode, flags?: number): AstNode { return updateAstNonNullExpression(node as never, expression as never, flags ?? nodeFlags(node)) as unknown as AstNode; }
  updateExpressionWithTypeArguments(node: AstNode, ...args: unknown[]): AstNode { return updateAstExpressionWithTypeArguments(node as never, args[0] as never, asOptionalNodeArray(args[1])) as unknown as AstNode; }
  updatePartiallyEmittedExpression(node: AstNode, expression: AstNode): AstNode { return updateAstPartiallyEmittedExpression(node as never, expression as never) as unknown as AstNode; }
  updateSourceFile(node: AstNode, statements: readonly AstNode[], endOfFileToken: AstNode): AstNode { return updateAstSourceFile(node as never, createNodeArray(statements) as never, endOfFileToken as never) as unknown as AstNode; }
  updateJsxSelfClosingElement(node: AstNode, ...args: unknown[]): AstNode { return { ...(node as object), tagName: args[0], typeArguments: args[1], attributes: args[2] } as unknown as AstNode; }
  updateJsxOpeningElement(node: AstNode, ...args: unknown[]): AstNode { return { ...(node as object), tagName: args[0], typeArguments: args[1], attributes: args[2] } as unknown as AstNode; }
  updateImportDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstImportDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never) as unknown as AstNode; }
  updateImportClause(node: AstNode, ...args: unknown[]): AstNode { return updateAstImportClause(node as never, args[0] as never, args[1] as never, args[2] as never) as unknown as AstNode; }
  updateNamedImports(node: AstNode, ...args: unknown[]): AstNode { return updateAstNamedImports(node as never, args[0] as never) as unknown as AstNode; }
  updateExportDeclaration(node: AstNode, ...args: unknown[]): AstNode { return updateAstExportDeclaration(node as never, args[0] as never, args[1] as never, args[2] as never, args[3] as never, args[4] as never) as unknown as AstNode; }
  updateNamedExports(node: AstNode, ...args: unknown[]): AstNode { return updateAstNamedExports(node as never, args[0] as never) as unknown as AstNode; }
  newPartiallyEmittedExpression(expression: AstNode): AstNode {
    return createPartiallyEmittedExpression(expression as never) as unknown as AstNode;
  }
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode {
    return this.newBinary(brandCheckIdentifier as unknown as Expression, Kind.InKeyword, receiver as Expression) as unknown as AstNode;
  }
  newNodeList(items: readonly AstNode[]): AstNode {
    return createNodeArray(items) as unknown as AstNode;
  }
  newModifierList(items: readonly AstNode[]): AstNode {
    return createNodeArray(items) as unknown as AstNode;
  }

  // -------------------------------------------------------------------------
  // Emit-helper invocations (__decorate, __metadata, __param, etc.)
  // -------------------------------------------------------------------------

  newUnscopedHelperName(name: string): IdentifierNode {
    // The TS-Go printer emits __helperName as a plain identifier; the
    // emitter is responsible for marking these for unscoped emission.
    return this.newIdentifier(name) as unknown as IdentifierNode;
  }

  newDecorateHelper(
    decoratorExpressions: readonly AstNode[], target: AstNode, memberName: AstNode | undefined, descriptor: AstNode | undefined,
  ): Expression {
    // __decorate([...decorators], target, memberName?, descriptor?)
    const args: AstNode[] = [this.newArrayLiteralExpression(decoratorExpressions as readonly Expression[]) as AstNode, target];
    if (memberName !== undefined) {
      args.push(memberName);
      if (descriptor !== undefined) args.push(descriptor);
    }
    return this.newCallExpression(this.newUnscopedHelperName("__decorate"), args);
  }

  newMetadataHelper(metadataKey: string, metadataValue: AstNode): AstNode {
    // __metadata(metadataKey, metadataValue)
    return this.newCallExpression(
      this.newUnscopedHelperName("__metadata"),
      [this.newStringLiteral(metadataKey, 0), metadataValue],
    ) as unknown as AstNode;
  }

  newParamHelper(expression: AstNode, parameterOffset: number, location: TextRange | undefined): Expression {
    // __param(parameterOffset, expression)
    void location;
    return this.newCallExpression(
      this.newUnscopedHelperName("__param"),
      [this.newNumericLiteral(`${parameterOffset}`, 0), expression],
    );
  }

  newAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression {
    // __addDisposableResource(envBinding, value, async)
    return this.newCallExpression(
      this.newUnscopedHelperName("__addDisposableResource"),
      [envBinding, value, async ? this.newTrueExpression() : this.newFalseExpression()],
    );
  }

  newDisposeResourcesHelper(envBinding: Expression): Expression {
    // __disposeResources(envBinding)
    return this.newCallExpression(
      this.newUnscopedHelperName("__disposeResources"),
      [envBinding],
    );
  }

  newClassPrivateFieldGetHelper(
    receiver: Expression, state: IdentifierNode, kind: PrivateIdentifierKindStr, fn: IdentifierNode | undefined,
  ): Expression {
    // __classPrivateFieldGet(receiver, state, "kind", fn?)
    const args: AstNode[] = [receiver, state, this.newStringLiteral(kind, 0)];
    if (fn !== undefined) args.push(fn);
    return this.newCallExpression(this.newUnscopedHelperName("__classPrivateFieldGet"), args);
  }

  newClassPrivateFieldSetHelper(
    receiver: Expression, state: IdentifierNode, value: Expression,
    kind: PrivateIdentifierKindStr, fn: IdentifierNode | undefined,
  ): Expression {
    // __classPrivateFieldSet(receiver, state, value, "kind", fn?)
    const args: AstNode[] = [receiver, state, value, this.newStringLiteral(kind, 0)];
    if (fn !== undefined) args.push(fn);
    return this.newCallExpression(this.newUnscopedHelperName("__classPrivateFieldSet"), args);
  }

  private isIgnorableParen(node: Expression): boolean {
    const current = node as unknown as { kind?: number; pos?: number; end?: number };
    return current.kind === Kind.ParenthesizedExpression
      && current.pos !== undefined
      && current.end !== undefined
      && current.pos >= 0
      && current.end >= 0;
  }

  private updateOuterExpression(outerExpression: Expression, expression: Expression): Expression {
    const outer = outerExpression as unknown as { kind?: number; type?: AstNode; flags?: number; typeArguments?: readonly AstNode[] };
    switch (outer.kind) {
      case Kind.ParenthesizedExpression:
        return this.updateParenthesizedExpression(outerExpression as unknown as AstNode, expression as unknown as AstNode) as unknown as Expression;
      case Kind.TypeAssertionExpression:
        return this.updateTypeAssertion(outerExpression as unknown as AstNode, outer.type as AstNode, expression as unknown as AstNode) as unknown as Expression;
      case Kind.AsExpression:
        return this.updateAsExpression(outerExpression as unknown as AstNode, expression as unknown as AstNode, outer.type as AstNode) as unknown as Expression;
      case Kind.SatisfiesExpression:
        return this.updateSatisfiesExpression(outerExpression as unknown as AstNode, expression as unknown as AstNode, outer.type as AstNode) as unknown as Expression;
      case Kind.NonNullExpression:
        return this.updateNonNullExpression(outerExpression as unknown as AstNode, expression as unknown as AstNode, outer.flags) as unknown as Expression;
      case Kind.ExpressionWithTypeArguments:
        return this.updateExpressionWithTypeArguments(outerExpression as unknown as AstNode, expression as unknown as AstNode, outer.typeArguments) as unknown as Expression;
      case Kind.PartiallyEmittedExpression:
        return this.updatePartiallyEmittedExpression(outerExpression as unknown as AstNode, expression as unknown as AstNode) as unknown as Expression;
      default:
        throw new Error(`Unexpected outer expression kind: ${String(outer.kind)}`);
    }
  }

  private isCustomPrologue(statement: Statement): boolean {
    return (emitFlags(statement as unknown as AstNode) & EmitFlags.CustomPrologue) !== 0;
  }

  private getName(node: AstNode, emitFlagsValue: EmitFlags, opts: AssignedNameOptions): IdentifierNode {
    const declarationName = opts.ignoreAssignedName ? nonAssignedNameOfDeclaration(node) : nameOfDeclaration(node);
    if (declarationName !== undefined) {
      return this.withAssignedNameEmitFlags(cloneNodeLike(declarationName) as IdentifierNode, emitFlagsValue, opts);
    }
    return this.newGeneratedNameForNode(node);
  }

  private withAssignedNameEmitFlags(name: IdentifierNode, emitFlagsValue: EmitFlags, opts: AssignedNameOptions): IdentifierNode {
    let flags = emitFlagsValue;
    if (opts.allowComments !== true) flags |= EmitFlags.NoComments;
    if (opts.allowSourceMaps !== true) flags |= EmitFlags.NoSourceMap;
    setEmitFlags(name as unknown as AstNode, flags);
    return name;
  }

  private withNameEmitFlags(name: IdentifierNode, opts: NameOptions): IdentifierNode {
    let flags = opts.emitFlags ?? EmitFlags.None;
    if (opts.allowComments !== true) flags |= EmitFlags.NoComments;
    if (opts.allowSourceMaps !== true) flags |= EmitFlags.NoSourceMap;
    setEmitFlags(name as unknown as AstNode, flags);
    return name;
  }

  private newGeneratedIdentifier(text: string, node: AstNode | undefined, options: AutoGenerateOptions): IdentifierNode {
    const id = this.nextAutoGenerateId + 1;
    this.nextAutoGenerateId = id;
    const nameText = formatGeneratedName(false, options.prefix, text === "" ? `(auto@${id})` : text, options.suffix);
    const name = createIdentifier(nameText) as unknown as IdentifierNode;
    this.autoGenerate.set(name, { ...options, id, node });
    return name;
  }

  private newGeneratedPrivateIdentifier(text: string, node: AstNode | undefined, options: AutoGenerateOptions): PrivateIdentifierNode {
    const id = this.nextAutoGenerateId + 1;
    this.nextAutoGenerateId = id;
    const candidate = text === "" ? `(auto@${id})` : text;
    if (candidate.startsWith("#")) {
      const name = createPrivateIdentifier(candidate) as unknown as PrivateIdentifierNode;
      this.autoGenerate.set(name, { ...options, id, node });
      return name;
    }
    const name = createPrivateIdentifier(formatGeneratedName(true, options.prefix, candidate, options.suffix)) as unknown as PrivateIdentifierNode;
    this.autoGenerate.set(name, { ...options, id, node });
    return name;
  }
}

function flattenCommaElements(expressions: readonly Expression[]): readonly Expression[] {
  const result: Expression[] = [];
  for (const expression of expressions) flattenCommaElement(expression, result);
  return result;
}

function flattenCommaElement(expression: Expression, result: Expression[]): void {
  const binary = expression as unknown as { kind?: number; operatorToken?: { kind?: number }; left?: Expression; right?: Expression };
  if (binary.kind === 225 /* BinaryExpression */ && binary.operatorToken?.kind === 28 /* CommaToken */ && binary.left !== undefined && binary.right !== undefined) {
    flattenCommaElement(binary.left, result);
    flattenCommaElement(binary.right, result);
    return;
  }
  result.push(expression);
}

function memberNameText(node: AstNode): string | undefined {
  const text = (node as unknown as { text?: string }).text;
  return text === undefined || text === "" ? undefined : text;
}

function cloneNodeLike<T extends AstNode>(node: T): T {
  return { ...(node as object) } as T;
}

function nodeArrayElements<T extends AstNode = AstNode>(items: unknown): readonly T[] {
  if (items === undefined) return [];
  if (Array.isArray(items)) return items as readonly T[];
  return (items as { readonly nodes?: readonly T[] }).nodes ?? [];
}

function asNodeArray<T extends AstNode = AstNode>(items: unknown): NodeArray<T> {
  if (items === undefined) return createNodeArray([]) as NodeArray<T>;
  if (Array.isArray(items)) return createNodeArray(items as readonly T[]);
  const nodes = (items as { readonly nodes?: readonly T[] }).nodes;
  return createNodeArray(nodes ?? []);
}

function asOptionalNodeArray<T extends AstNode = AstNode>(items: unknown): NodeArray<T> | undefined {
  return items === undefined ? undefined : asNodeArray<T>(items);
}

function formatGeneratedName(privateName: boolean, prefix: string | undefined, text: string, suffix: string | undefined): string {
  const body = `${prefix ?? ""}${text}${suffix ?? ""}`;
  return privateName ? `#${body.replace(/^#/, "")}` : body;
}

const OuterExpressionKinds = {
  Parentheses: 1 << 0,
  TypeAssertions: 1 << 1,
  NonNullAssertions: 1 << 2,
  PartiallyEmittedExpressions: 1 << 3,
  ExpressionsWithTypeArguments: 1 << 4,
  All: (1 << 5) - 1,
} as const;

function isOuterExpressionKind(kind: number | undefined, kinds: number): boolean {
  switch (kind) {
    case Kind.ParenthesizedExpression:
      return (kinds & OuterExpressionKinds.Parentheses) !== 0;
    case Kind.TypeAssertionExpression:
    case Kind.AsExpression:
    case Kind.SatisfiesExpression:
      return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
    case Kind.NonNullExpression:
      return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
    case Kind.PartiallyEmittedExpression:
      return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    case Kind.ExpressionWithTypeArguments:
      return (kinds & OuterExpressionKinds.ExpressionsWithTypeArguments) !== 0;
    default:
      return false;
  }
}

function isPrologueDirectiveStatement(statement: Statement): boolean {
  const candidate = statement as unknown as { kind?: number; expression?: { kind?: number; text?: string } };
  return candidate.kind === Kind.ExpressionStatement
    && candidate.expression?.kind === Kind.StringLiteral
    && typeof candidate.expression.text === "string";
}

function isUseStrictPrologue(statement: Statement): boolean {
  const candidate = statement as unknown as { expression?: { text?: string } };
  return isPrologueDirectiveStatement(statement) && candidate.expression?.text === "use strict";
}

function findFirstIndex<T>(items: readonly T[], predicate: (value: T) => boolean): number {
  for (let index = 0; index < items.length; index += 1) {
    if (predicate(items[index]!)) return index;
  }
  return -1;
}

function hasModifier(node: AstNode, modifierKind: number): boolean {
  return nodeArrayElements((node as { modifiers?: unknown }).modifiers)
    .some((modifier) => (modifier as { kind?: number }).kind === modifierKind);
}

function nameOfDeclaration(node: AstNode): AstNode | undefined {
  const assignedName = (node as { assignedName?: AstNode }).assignedName;
  return assignedName ?? (node as { name?: AstNode }).name;
}

function nonAssignedNameOfDeclaration(node: AstNode): AstNode | undefined {
  return (node as { name?: AstNode }).name;
}

function nodeFlags(node: AstNode): number {
  return (node as { flags?: number }).flags ?? NodeFlags.None;
}

function emitFlags(node: AstNode): number {
  return (node as { emitFlags?: number }).emitFlags ?? EmitFlags.None;
}

function setEmitFlags(node: AstNode, flags: number): void {
  (node as { emitFlags?: number }).emitFlags = flags;
}

export function newNodeFactory(): NodeFactory {
  return new NodeFactory();
}
