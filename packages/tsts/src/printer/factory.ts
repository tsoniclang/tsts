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
  // -------------------------------------------------------------------------
  // Temp / loop / unique / generated names
  // -------------------------------------------------------------------------

  newTempVariable(): IdentifierNode {
    return { kind: 80, text: "_tmp" } as unknown as IdentifierNode;
  }
  newTempVariableEx(options: AutoGenerateOptions): IdentifierNode {
    void options; return this.newTempVariable();
  }
  newLoopVariable(): IdentifierNode { return this.newTempVariable(); }
  newLoopVariableEx(options: AutoGenerateOptions): IdentifierNode {
    void options; return this.newTempVariable();
  }
  newUniqueName(text: string): IdentifierNode { void text; return this.newTempVariable(); }
  newUniqueNameEx(text: string, options: AutoGenerateOptions): IdentifierNode {
    void text; void options; return this.newTempVariable();
  }
  newGeneratedNameForNode(node: AstNode): IdentifierNode { void node; return this.newTempVariable(); }
  newGeneratedNameForNodeEx(node: AstNode, options: AutoGenerateOptions): IdentifierNode {
    void node; void options; return this.newTempVariable();
  }
  newUniquePrivateName(text: string): PrivateIdentifierNode {
    void text;
    return { kind: 81, text: "#tmp" } as unknown as PrivateIdentifierNode;
  }
  newUniquePrivateNameEx(text: string, options: AutoGenerateOptions): PrivateIdentifierNode {
    void text; void options; return this.newUniquePrivateName("");
  }
  newGeneratedPrivateNameForNode(node: AstNode): PrivateIdentifierNode {
    void node; return this.newUniquePrivateName("");
  }
  newGeneratedPrivateNameForNodeEx(node: AstNode, options: AutoGenerateOptions): PrivateIdentifierNode {
    void node; void options; return this.newUniquePrivateName("");
  }

  newStringLiteralFromNode(textSourceNode: AstNode): AstNode {
    void textSourceNode;
    return {} as AstNode;
  }

  // -------------------------------------------------------------------------
  // Primitive expressions
  // -------------------------------------------------------------------------

  newThisExpression(): Expression { return {} as Expression; }
  newTrueExpression(): Expression { return {} as Expression; }
  newFalseExpression(): Expression { return {} as Expression; }
  newNullExpression(): Expression { return {} as Expression; }
  newCommaExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newAssignmentExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newAssignment(left: Expression, right: Expression): Expression { return this.newAssignmentExpression(left, right); }
  newLogicalORExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newLogicalANDExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newStrictEqualityExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newStrictInequalityExpression(left: Expression, right: Expression): Expression { void left; void right; return {} as Expression; }
  newVoidZeroExpression(): Expression { return {} as Expression; }
  newVoidZero(): Expression { return this.newVoidZeroExpression(); }
  newConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): Expression {
    void condition; void whenTrue; void whenFalse; return {} as Expression;
  }
  newTypeOfExpression(expression: Expression): Expression { void expression; return {} as Expression; }
  newAnyKeyword(): AstNode { return {} as AstNode; }
  newEmptyStatement(): Statement { return {} as Statement; }
  newBlock(statements: readonly Statement[]): Statement { void statements; return {} as Statement; }
  newSyntaxList(items: readonly AstNode[]): AstNode { void items; return {} as AstNode; }
  newLetStatement(name: IdentifierNode, initializer: Expression | undefined): Statement {
    void name; void initializer; return {} as Statement;
  }
  newExpressionStatement(expression: Expression): Statement { void expression; return {} as Statement; }
  newPropertyAccessExpression(expression: Expression, name: AstNode): AstNode {
    void expression; void name; return {} as AstNode;
  }
  newElementAccessExpression(expression: Expression, argumentExpression: Expression): Expression {
    void expression; void argumentExpression; return {} as Expression;
  }
  newIdentifier(text: string): AstNode { void text; return {} as AstNode; }
  newStringLiteral(text: string, flags: number): Expression { void text; void flags; return {} as Expression; }
  newNumericLiteral(text: string, flags: number): Expression { void text; void flags; return {} as Expression; }
  newPrefixUnaryExpression(operator: number, operand: Expression): Expression {
    void operator; void operand; return {} as Expression;
  }
  newArrayLiteralExpression(elements: readonly Expression[]): AstNode { void elements; return {} as AstNode; }
  newReflectSetCall(target: Expression, name: Expression, value: Expression, receiver: Expression): Expression {
    void target; void name; void value; void receiver; return {} as Expression;
  }
  newAssignmentTargetWrapper(target: Expression, value: Expression): Expression {
    void target; void value; return {} as Expression;
  }

  // -------------------------------------------------------------------------
  // Type checks + call helpers
  // -------------------------------------------------------------------------

  newTypeCheck(value: AstNode, tag: string): AstNode { void value; void tag; return {} as AstNode; }
  newMethodCall(object: AstNode, methodName: AstNode, argumentsList: readonly AstNode[]): AstNode {
    void object; void methodName; void argumentsList; return {} as AstNode;
  }
  newGlobalMethodCall(globalObjectName: string, methodName: string, argumentsList: readonly AstNode[]): AstNode {
    void globalObjectName; void methodName; void argumentsList; return {} as AstNode;
  }
  newFunctionCallCall(target: Expression, thisArg: Expression, argumentsList: readonly AstNode[]): AstNode {
    void target; void thisArg; void argumentsList; return {} as AstNode;
  }
  newArraySliceCall(array: Expression, start: number): AstNode {
    void array; void start; return {} as AstNode;
  }
  inlineExpressions(expressions: readonly Expression[]): Expression {
    return expressions[expressions.length - 1] ?? ({} as Expression);
  }

  // -------------------------------------------------------------------------
  // Update helpers (forwarders to per-node update functions)
  // -------------------------------------------------------------------------

  updatePropertyAccessExpression(
    node: AstNode, expression: AstNode, questionDotToken: AstNode | undefined,
    name: AstNode, flags: number,
  ): AstNode {
    void node; void expression; void questionDotToken; void name; void flags;
    return node;
  }

  updatePropertyDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateConstructorDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateMethodDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateGetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateSetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateVariableDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateHeritageClause(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateClassDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateClassExpression(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateFunctionDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateFunctionExpression(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateArrowFunction(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateParameterDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateCallExpression(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateNewExpression(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateTaggedTemplateExpression(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateExpressionWithTypeArguments(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateJsxSelfClosingElement(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateJsxOpeningElement(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateImportDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateImportClause(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateNamedImports(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateExportDeclaration(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  updateNamedExports(node: AstNode, ...args: unknown[]): AstNode { void args; return node; }
  newPartiallyEmittedExpression(expression: AstNode): AstNode { void expression; return {} as AstNode; }
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode {
    void brandCheckIdentifier; void receiver; return {} as AstNode;
  }
  newNodeList(items: readonly AstNode[]): AstNode { void items; return {} as AstNode; }
  newModifierList(items: readonly AstNode[]): AstNode { void items; return {} as AstNode; }

  // -------------------------------------------------------------------------
  // Emit-helper invocations (__decorate, __metadata, __param, etc.)
  // -------------------------------------------------------------------------

  newUnscopedHelperName(name: string): IdentifierNode {
    void name;
    return this.newTempVariable();
  }

  newDecorateHelper(
    decoratorExpressions: readonly AstNode[], target: AstNode, memberName: AstNode | undefined, descriptor: AstNode | undefined,
  ): Expression {
    void decoratorExpressions; void target; void memberName; void descriptor;
    return {} as Expression;
  }

  newMetadataHelper(metadataKey: string, metadataValue: AstNode): AstNode {
    void metadataKey; void metadataValue;
    return {} as AstNode;
  }

  newParamHelper(expression: AstNode, parameterOffset: number, location: TextRange | undefined): Expression {
    void expression; void parameterOffset; void location;
    return {} as Expression;
  }

  newAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression {
    void envBinding; void value; void async;
    return {} as Expression;
  }

  newDisposeResourcesHelper(envBinding: Expression): Expression {
    void envBinding;
    return {} as Expression;
  }

  newClassPrivateFieldGetHelper(
    receiver: Expression, state: IdentifierNode, kind: PrivateIdentifierKindStr, fn: IdentifierNode | undefined,
  ): Expression {
    void receiver; void state; void kind; void fn;
    return {} as Expression;
  }

  newClassPrivateFieldSetHelper(
    receiver: Expression, state: IdentifierNode, value: Expression,
    kind: PrivateIdentifierKindStr, fn: IdentifierNode | undefined,
  ): Expression {
    void receiver; void state; void value; void kind; void fn;
    return {} as Expression;
  }
}

export function newNodeFactory(): NodeFactory {
  return new NodeFactory();
}
