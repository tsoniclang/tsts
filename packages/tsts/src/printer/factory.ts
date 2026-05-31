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
  createArrowFunction,
  createArrayLiteralExpression,
  createArrayBindingPattern,
  createAwaitExpression,
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
  updateCallExpression as updateAstCallExpression,
  updateClassDeclaration as updateAstClassDeclaration,
  updateClassExpression as updateAstClassExpression,
  updateConstructorDeclaration as updateAstConstructorDeclaration,
  updateElementAccessExpression as updateAstElementAccessExpression,
  updateExportDeclaration as updateAstExportDeclaration,
  updateFunctionDeclaration as updateAstFunctionDeclaration,
  updateFunctionExpression as updateAstFunctionExpression,
  updateGetAccessorDeclaration as updateAstGetAccessorDeclaration,
  updateHeritageClause as updateAstHeritageClause,
  updateImportClause as updateAstImportClause,
  updateImportDeclaration as updateAstImportDeclaration,
  updateMethodDeclaration as updateAstMethodDeclaration,
  updateNamedExports as updateAstNamedExports,
  updateNamedImports as updateAstNamedImports,
  updateNewExpression as updateAstNewExpression,
  updateParameterDeclaration as updateAstParameterDeclaration,
  updatePropertyAccessExpression as updateAstPropertyAccessExpression,
  updatePropertyDeclaration as updateAstPropertyDeclaration,
  updateSetAccessorDeclaration as updateAstSetAccessorDeclaration,
  updateTaggedTemplateExpression as updateAstTaggedTemplateExpression,
  updateVariableDeclaration as updateAstVariableDeclaration,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// AutoGenerate options
// ---------------------------------------------------------------------------

export interface AutoGenerateOptions {
  flags?: number;
  prefix?: string;
  suffix?: string;
}

export interface NameOptions { allowSourceMap?: boolean; emitFlags?: number }
export interface AssignedNameOptions { allowSourceMap?: boolean; ignoreEmptyStringLiteral?: boolean; assignedName?: string }

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
    const declarationList = createVariableDeclarationList(createNodeArray([declaration]) as NodeArray<never>, 1);
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
  updateExpressionWithTypeArguments(node: AstNode, ...args: unknown[]): AstNode { return { ...(node as object), expression: args[0], typeArguments: args[1] } as unknown as AstNode; }
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

export function newNodeFactory(): NodeFactory {
  return new NodeFactory();
}
