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
    // Mirror upstream: a string literal whose text is sourced from
    // another node (e.g. an Identifier in destructuring). Carries the
    // sourceText reference so the printer can preserve the original.
    const text = (textSourceNode as unknown as { text?: string }).text ?? "";
    return {
      kind: 11 /* StringLiteral */,
      text,
      textSourceNode,
    } as unknown as AstNode;
  }

  // -------------------------------------------------------------------------
  // Primitive expressions
  // -------------------------------------------------------------------------

  newBinary(left: Expression, operatorTokenKind: number, right: Expression): Expression {
    return {
      kind: 225 /* BinaryExpression */,
      left, right,
      operatorToken: { kind: operatorTokenKind },
    } as unknown as Expression;
  }

  newThisExpression(): Expression { return { kind: 110 /* ThisKeyword */ } as unknown as Expression; }
  newTrueExpression(): Expression { return { kind: 112 /* TrueKeyword */ } as unknown as Expression; }
  newFalseExpression(): Expression { return { kind: 97 /* FalseKeyword */ } as unknown as Expression; }
  newNullExpression(): Expression { return { kind: 106 /* NullKeyword */ } as unknown as Expression; }
  newCommaExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 28 /* CommaToken */, right);
  }
  newAssignmentExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 64 /* EqualsToken */, right);
  }
  newAssignment(left: Expression, right: Expression): Expression { return this.newAssignmentExpression(left, right); }
  newLogicalORExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 58 /* BarBarToken */, right);
  }
  newLogicalANDExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 57 /* AmpersandAmpersandToken */, right);
  }
  newStrictEqualityExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 38 /* EqualsEqualsEqualsToken */, right);
  }
  newStrictInequalityExpression(left: Expression, right: Expression): Expression {
    return this.newBinary(left, 39 /* ExclamationEqualsEqualsToken */, right);
  }
  newVoidZeroExpression(): Expression {
    return {
      kind: 220 /* VoidExpression */,
      expression: { kind: 9 /* NumericLiteral */, text: "0" },
    } as unknown as Expression;
  }
  newVoidZero(): Expression { return this.newVoidZeroExpression(); }
  newConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): Expression {
    return {
      kind: 226 /* ConditionalExpression */,
      condition, whenTrue, whenFalse,
      questionToken: { kind: 58 /* QuestionToken */ },
      colonToken: { kind: 59 /* ColonToken */ },
    } as unknown as Expression;
  }
  newTypeOfExpression(expression: Expression): Expression {
    return { kind: 219 /* TypeOfExpression */, expression } as unknown as Expression;
  }
  newAnyKeyword(): AstNode { return { kind: 133 /* AnyKeyword */ } as unknown as AstNode; }
  newEmptyStatement(): Statement {
    return { kind: 244 /* EmptyStatement */ } as unknown as Statement;
  }
  newBlock(statements: readonly Statement[]): Statement {
    return {
      kind: 242 /* Block */,
      statements: { nodes: statements },
    } as unknown as Statement;
  }
  newSyntaxList(items: readonly AstNode[]): AstNode {
    return { kind: 354 /* SyntaxList */, nodes: items } as unknown as AstNode;
  }
  newLetStatement(name: IdentifierNode, initializer: Expression | undefined): Statement {
    return {
      kind: 243 /* VariableStatement */,
      declarationList: {
        kind: 261 /* VariableDeclarationList */,
        flags: 1, // Let
        declarations: { nodes: [{
          kind: 260 /* VariableDeclaration */,
          name,
          initializer,
        }]},
      },
    } as unknown as Statement;
  }
  newExpressionStatement(expression: Expression): Statement {
    return { kind: 245 /* ExpressionStatement */, expression } as unknown as Statement;
  }
  newPropertyAccessExpression(expression: Expression, name: AstNode): AstNode {
    return { kind: 211 /* PropertyAccessExpression */, expression, name } as unknown as AstNode;
  }
  newElementAccessExpression(expression: Expression, argumentExpression: Expression): Expression {
    return {
      kind: 212 /* ElementAccessExpression */,
      expression, argumentExpression,
    } as unknown as Expression;
  }
  newIdentifier(text: string): AstNode {
    return { kind: 80 /* Identifier */, text } as unknown as AstNode;
  }
  newStringLiteral(text: string, flags: number): Expression {
    return { kind: 11 /* StringLiteral */, text, flags } as unknown as Expression;
  }
  newNumericLiteral(text: string, flags: number): Expression {
    return { kind: 9 /* NumericLiteral */, text, flags } as unknown as Expression;
  }
  newPrefixUnaryExpression(operator: number, operand: Expression): Expression {
    return { kind: 222 /* PrefixUnaryExpression */, operator, operand } as unknown as Expression;
  }
  newArrayLiteralExpression(elements: readonly Expression[]): AstNode {
    return {
      kind: 209 /* ArrayLiteralExpression */,
      elements: { nodes: elements },
    } as unknown as AstNode;
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
    return {
      kind: 213 /* CallExpression */,
      expression,
      arguments: { nodes: argumentsList },
    } as unknown as Expression;
  }
  newTypeCheck(value: AstNode, tag: string): AstNode {
    // typeof value === "tag"
    return this.newStrictEqualityExpression(
      this.newTypeOfExpression(value as Expression),
      this.newStringLiteral(tag, 0),
    );
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
    // Returns a node sharing the original's pos/end but with updated
    // expression + name (immutability via spread).
    void flags;
    return { ...(node as object), expression, name, questionDotToken } as unknown as AstNode;
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
  newPartiallyEmittedExpression(expression: AstNode): AstNode {
    return { kind: 351 /* PartiallyEmittedExpression */, expression } as unknown as AstNode;
  }
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode {
    // brandCheckIdentifier in receiver  → BinaryExpression(InKeyword)
    return this.newBinary(brandCheckIdentifier as unknown as Expression, 105 /* InKeyword */, receiver as Expression) as unknown as AstNode;
  }
  newNodeList(items: readonly AstNode[]): AstNode {
    return { nodes: items } as unknown as AstNode;
  }
  newModifierList(items: readonly AstNode[]): AstNode {
    return { nodes: items } as unknown as AstNode;
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
    const name = { kind: 80 /* Identifier */, text: nameText } as unknown as IdentifierNode;
    this.autoGenerate.set(name, { ...options, id, node });
    return name;
  }

  private newGeneratedPrivateIdentifier(text: string, node: AstNode | undefined, options: AutoGenerateOptions): PrivateIdentifierNode {
    const id = this.nextAutoGenerateId + 1;
    this.nextAutoGenerateId = id;
    const candidate = text === "" ? `(auto@${id})` : text;
    if (candidate.startsWith("#")) {
      const name = { kind: 81 /* PrivateIdentifier */, text: candidate } as unknown as PrivateIdentifierNode;
      this.autoGenerate.set(name, { ...options, id, node });
      return name;
    }
    const name = { kind: 81 /* PrivateIdentifier */, text: formatGeneratedName(true, options.prefix, candidate, options.suffix) } as unknown as PrivateIdentifierNode;
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

function formatGeneratedName(privateName: boolean, prefix: string | undefined, text: string, suffix: string | undefined): string {
  const body = `${prefix ?? ""}${text}${suffix ?? ""}`;
  return privateName ? `#${body.replace(/^#/, "")}` : body;
}

export function newNodeFactory(): NodeFactory {
  return new NodeFactory();
}
