/**
 * Shared helpers used by multiple ES transformer passes.
 *
 * Port of TS-Go `internal/transformers/estransforms/utilities.go`.
 * Provides:
 *   - `convertClassDeclarationToClassExpression`: used by class
 *     fields / decorator lowering.
 *   - `createNotNullCondition`: generates `(a !== null && a !== void 0)`
 *     (or its inverted form) used by optional chaining / nullish coalescing.
 *   - `SuperAccessState`: shared bookkeeping used by async and
 *     for-await passes to capture and rewrite `super.x` / `super[x]`
 *     accesses inside generator bodies.
 *   - `createAccessorPropertyBackingField`: helper for `accessor`
 *     class members.
 */

import type { Node as AstNode } from "../../ast/index.js";

import type { EmitContext, NodeFactory } from "../transformer.js";

/**
 * Converts a `class Foo {}` declaration to a `class Foo {}` expression
 * (drops `export`/`default` modifiers as appropriate).
 *
 * Mirrors TS-Go `convertClassDeclarationToClassExpression`.
 */
export function convertClassDeclarationToClassExpression(
  emitContext: EmitContext,
  node: AstNode,
  extractModifiers: (emitContext: EmitContext, modifiers: AstNode | undefined, mask: number) => AstNode | undefined,
): AstNode {
  const factory = emitContext.factory();
  const updated = newClassExpression(
    factory,
    extractModifiers(emitContext, classModifiers(node), ~ModifierFlagsExportDefault),
    classDeclarationName(node),
    classTypeParameters(node),
    classHeritageClauses(node),
    classMembers(node),
  );
  setOriginal(emitContext, updated, node);
  return updated;
}

/**
 * Generates `(left !== null && right !== void 0)` (or, when `invert`
 * is true, `(left === null || right === void 0)`) used by optional
 * chaining and nullish coalescing.
 *
 * Mirrors TS-Go `createNotNullCondition`.
 */
export function createNotNullCondition(
  emitContext: EmitContext,
  left: AstNode,
  right: AstNode,
  invert: boolean,
): AstNode {
  const factory = emitContext.factory();
  const token = invert ? KindEqualsEqualsEqualsToken : KindExclamationEqualsEqualsToken;
  const op = invert ? KindBarBarToken : KindAmpersandAmpersandToken;

  return newBinaryExpression(
    factory,
    newBinaryExpression(
      factory,
      left,
      newToken(factory, token),
      newKeywordExpression(factory, KindNullKeyword),
    ),
    newToken(factory, op),
    newBinaryExpression(
      factory,
      right,
      newToken(factory, token),
      newVoidZeroExpression(factory),
    ),
  );
}

/**
 * Tracks `super.x` / `super[x]` / `super.x = ...` accesses inside an
 * async function or for-await body. Used to rewrite the body so that
 * `super` references work inside a generator function (which has no
 * direct access to `super`).
 *
 * Mirrors TS-Go `superAccessState`.
 */
export class SuperAccessState {
  public capturedSuperProperties = new Set<string>();
  public hasSuperElementAccess = false;
  public hasSuperPropertyAssignment = false;

  public superBinding: AstNode | undefined;
  public superIndexBinding: AstNode | undefined;
  public superAccessVisitor: NodeVisitorLike | undefined;

  public factory: NodeFactory | undefined;

  initSuperAccessVisitor(emitContext: EmitContext, factory: NodeFactory): void {
    this.factory = factory;
    this.superAccessVisitor = emitContext.newNodeVisitor((node) => this.visitSuperAccessNode(node)) as unknown as NodeVisitorLike;
  }

  visitSuperAccessNode(node: AstNode): AstNode | undefined {
    const kind = nodeKind(node);
    if (kind === KindCallExpression && isSuperProperty(callExpressionExpression(node))) {
      return this.substituteCallExpressionWithSuperAccess(node);
    }
    if (kind === KindPropertyAccessExpression && nodeKind(propertyAccessExpressionOf(node)) === KindSuperKeyword) {
      // super.x → _super.x
      return newPropertyAccessExpression(this.requireFactory(), this.requireSuperBinding(), undefined, propertyAccessName(node));
    }
    if (kind === KindElementAccessExpression && nodeKind(elementAccessExpressionOf(node)) === KindSuperKeyword) {
      // super[x] → _superIndex(x) or _superIndex(x).value
      return this.createSuperElementAccessInAsyncMethod(elementArgumentExpression(node));
    }
    if (
      kind === KindFunctionExpression || kind === KindFunctionDeclaration ||
      kind === KindMethodDeclaration || kind === KindGetAccessor || kind === KindSetAccessor ||
      kind === KindConstructor || kind === KindClassDeclaration || kind === KindClassExpression
    ) {
      // Don't recurse into non-arrow function/class scopes.
      return node;
    }
    return visitEachChild(this.requireVisitor(), node);
  }

  substituteSuperAccessesInBody(body: AstNode): AstNode {
    return visitNode(this.requireVisitor(), body);
  }

  substituteCallExpressionWithSuperAccess(call: AstNode): AstNode {
    const expression = callExpressionExpression(call);
    let target: AstNode;
    if (isPropertyAccessExpression(expression)) {
      target = newPropertyAccessExpression(
        this.requireFactory(),
        this.requireSuperBinding(),
        undefined,
        propertyAccessName(expression),
      );
    } else if (isElementAccessExpression(expression)) {
      target = this.createSuperElementAccessInAsyncMethod(elementArgumentExpression(expression));
    } else {
      return visitEachChild(this.requireVisitor(), call);
    }
    const callTarget = newPropertyAccessExpression(
      this.requireFactory(),
      target,
      undefined,
      newIdentifier(this.requireFactory(), "call"),
    );
    const allArgs: AstNode[] = [newThisExpression(this.requireFactory())];
    const callArgs = callExpressionArguments(call);
    if (callArgs !== undefined) {
      const visited = visitNodes(this.requireVisitor(), callArgs);
      if (visited !== undefined) {
        for (const n of nodeListNodes(visited)) allArgs.push(n);
      }
    }
    return newCallExpression(this.requireFactory(), callTarget, undefined, undefined, newNodeList(this.requireFactory(), allArgs));
  }

  createSuperElementAccessInAsyncMethod(argumentExpression: AstNode): AstNode {
    const superIndexCall = newCallExpression(
      this.requireFactory(),
      this.requireSuperIndexBinding(),
      undefined,
      undefined,
      newNodeList(this.requireFactory(), [argumentExpression]),
    );
    if (this.hasSuperPropertyAssignment) {
      return newPropertyAccessExpression(
        this.requireFactory(),
        superIndexCall,
        undefined,
        newIdentifier(this.requireFactory(), "value"),
      );
    }
    return superIndexCall;
  }

  /**
   * Builds a `const _super = Object.create(null, { x: { get, set? } })`
   * statement that exposes the captured super properties.
   */
  createSuperAccessVariableStatement(): AstNode {
    const f = this.requireFactory();
    const accessors: AstNode[] = [];
    for (const name of this.capturedSuperProperties) {
      const descriptorProperties: AstNode[] = [];
      const getterBody = newPropertyAccessExpression(
        f,
        newKeywordExpression(f, KindSuperKeyword),
        undefined,
        newIdentifier(f, name),
      );
      const getterArrow = newArrowFunction(f, [], newToken(f, KindEqualsGreaterThanToken), getterBody);
      descriptorProperties.push(newPropertyAssignment(f, newIdentifier(f, "get"), getterArrow));

      if (this.hasSuperPropertyAssignment) {
        const vParam = newParameterDeclaration(f, newIdentifier(f, "v"));
        const superProp = newPropertyAccessExpression(
          f,
          newKeywordExpression(f, KindSuperKeyword),
          undefined,
          newIdentifier(f, name),
        );
        const assignExpr = newAssignmentExpression(f, superProp, newIdentifier(f, "v"));
        const setterArrow = newArrowFunction(f, [vParam], newToken(f, KindEqualsGreaterThanToken), assignExpr);
        descriptorProperties.push(newPropertyAssignment(f, newIdentifier(f, "set"), setterArrow));
      }
      const descriptor = newObjectLiteralExpression(f, newNodeList(f, descriptorProperties), false);
      const accessor = newPropertyAssignment(f, newIdentifier(f, name), descriptor);
      accessors.push(accessor);
    }
    const descriptorsObject = newObjectLiteralExpression(f, newNodeList(f, accessors), true);
    const objectCreateCall = newCallExpression(
      f,
      newPropertyAccessExpression(f, newIdentifier(f, "Object"), undefined, newIdentifier(f, "create")),
      undefined,
      undefined,
      newNodeList(f, [newKeywordExpression(f, KindNullKeyword), descriptorsObject]),
    );
    const decl = newVariableDeclaration(f, this.requireSuperBinding(), undefined, undefined, objectCreateCall);
    const declList = newVariableDeclarationList(f, newNodeList(f, [decl]), NodeFlagsConst);
    return newVariableStatement(f, undefined, declList);
  }

  /**
   * Records a `super` access encountered during the visit pass. The
   * captured set is consumed when emitting the `_super` binding.
   */
  trackSuperAccess(node: AstNode): void {
    const kind = nodeKind(node);
    if (kind === KindPropertyAccessExpression && nodeKind(propertyAccessExpressionOf(node)) === KindSuperKeyword) {
      this.capturedSuperProperties.add(identifierText(propertyAccessName(node)));
    } else if (kind === KindElementAccessExpression && nodeKind(elementAccessExpressionOf(node)) === KindSuperKeyword) {
      this.hasSuperElementAccess = true;
    } else if (kind === KindBinaryExpression) {
      if (isAssignmentOperator(binaryOperatorKind(node)) && assignmentTargetContainsSuperProperty(binaryLeft(node))) {
        this.hasSuperPropertyAssignment = true;
      }
    } else if (kind === KindPrefixUnaryExpression && isUpdateExpression(node) && assignmentTargetContainsSuperProperty(unaryOperand(node))) {
      this.hasSuperPropertyAssignment = true;
    } else if (kind === KindPostfixUnaryExpression && isUpdateExpression(node) && assignmentTargetContainsSuperProperty(unaryOperand(node))) {
      this.hasSuperPropertyAssignment = true;
    }
  }

  private requireFactory(): NodeFactory {
    if (this.factory === undefined) throw new Error("SuperAccessState not initialized");
    return this.factory;
  }

  private requireSuperBinding(): AstNode {
    if (this.superBinding === undefined) throw new Error("superBinding not set");
    return this.superBinding;
  }

  private requireSuperIndexBinding(): AstNode {
    if (this.superIndexBinding === undefined) throw new Error("superIndexBinding not set");
    return this.superIndexBinding;
  }

  private requireVisitor(): NodeVisitorLike {
    if (this.superAccessVisitor === undefined) throw new Error("SuperAccessState not initialized");
    return this.superAccessVisitor;
  }
}

/**
 * Creates a private backing field for an `accessor` PropertyDeclaration.
 * Mirrors TS-Go `createAccessorPropertyBackingField`.
 */
export function createAccessorPropertyBackingField(
  factory: NodeFactory,
  node: AstNode,
  modifiers: AstNode | undefined,
  initializer: AstNode | undefined,
): AstNode {
  return updatePropertyDeclaration(
    factory,
    node,
    modifiers,
    newGeneratedPrivateNameForNode(factory, propertyDeclarationName(node), { suffix: "_accessor_storage" }),
    undefined,
    undefined,
    initializer,
  );
}

// ---------------------------------------------------------------------------
// Forward declarations
// ---------------------------------------------------------------------------

interface NodeVisitorLike {
  visitEachChild?(node: AstNode): AstNode;
  visitNode?(node: AstNode): AstNode | undefined;
  visitNodes?(nodes: AstNode): AstNode | undefined;
}

declare function nodeKind(node: AstNode): number;
declare function classModifiers(node: AstNode): AstNode | undefined;
declare function classDeclarationName(node: AstNode): AstNode | undefined;
declare function classTypeParameters(node: AstNode): AstNode | undefined;
declare function classHeritageClauses(node: AstNode): AstNode | undefined;
declare function classMembers(node: AstNode): AstNode | undefined;
declare function callExpressionExpression(node: AstNode): AstNode;
declare function callExpressionArguments(node: AstNode): AstNode | undefined;
declare function propertyAccessExpressionOf(node: AstNode): AstNode;
declare function propertyAccessName(node: AstNode): AstNode;
declare function elementAccessExpressionOf(node: AstNode): AstNode;
declare function elementArgumentExpression(node: AstNode): AstNode;
declare function isPropertyAccessExpression(node: AstNode): boolean;
declare function isElementAccessExpression(node: AstNode): boolean;
declare function isSuperProperty(node: AstNode): boolean;
declare function isAssignmentOperator(kind: number): boolean;
declare function isUpdateExpression(node: AstNode): boolean;
declare function assignmentTargetContainsSuperProperty(node: AstNode): boolean;
declare function binaryLeft(node: AstNode): AstNode;
declare function binaryOperatorKind(node: AstNode): number;
declare function unaryOperand(node: AstNode): AstNode;
declare function identifierText(node: AstNode): string;
declare function nodeListNodes(list: AstNode): readonly AstNode[];
declare function propertyDeclarationName(node: AstNode): AstNode;

declare function visitEachChild(visitor: NodeVisitorLike, node: AstNode): AstNode;
declare function visitNode(visitor: NodeVisitorLike, node: AstNode): AstNode;
declare function visitNodes(visitor: NodeVisitorLike, nodes: AstNode): AstNode | undefined;

declare function setOriginal(emitContext: EmitContext, node: AstNode, original: AstNode): void;

declare function newClassExpression(factory: NodeFactory, modifiers: AstNode | undefined, name: AstNode | undefined, typeParameters: AstNode | undefined, heritageClauses: AstNode | undefined, members: AstNode | undefined): AstNode;
declare function newBinaryExpression(factory: NodeFactory, left: AstNode, operatorToken: AstNode, right: AstNode): AstNode;
declare function newPropertyAccessExpression(factory: NodeFactory, expression: AstNode, questionDot: AstNode | undefined, name: AstNode): AstNode;
declare function newKeywordExpression(factory: NodeFactory, kind: number): AstNode;
declare function newVoidZeroExpression(factory: NodeFactory): AstNode;
declare function newToken(factory: NodeFactory, kind: number): AstNode;
declare function newIdentifier(factory: NodeFactory, text: string): AstNode;
declare function newThisExpression(factory: NodeFactory): AstNode;
declare function newCallExpression(factory: NodeFactory, expression: AstNode, questionDot: undefined, typeArgs: undefined, args: AstNode): AstNode;
declare function newArrowFunction(factory: NodeFactory, parameters: readonly AstNode[], arrowToken: AstNode, body: AstNode): AstNode;
declare function newParameterDeclaration(factory: NodeFactory, name: AstNode): AstNode;
declare function newPropertyAssignment(factory: NodeFactory, name: AstNode, value: AstNode): AstNode;
declare function newAssignmentExpression(factory: NodeFactory, target: AstNode, value: AstNode): AstNode;
declare function newObjectLiteralExpression(factory: NodeFactory, properties: AstNode, multiLine: boolean): AstNode;
declare function newVariableDeclaration(factory: NodeFactory, name: AstNode, exclamationToken: undefined, type: undefined, initializer: AstNode): AstNode;
declare function newVariableDeclarationList(factory: NodeFactory, declarations: AstNode, flags: number): AstNode;
declare function newVariableStatement(factory: NodeFactory, modifiers: undefined, declList: AstNode): AstNode;
declare function newNodeList(factory: NodeFactory, nodes: readonly AstNode[]): AstNode;
declare function updatePropertyDeclaration(factory: NodeFactory, node: AstNode, modifiers: AstNode | undefined, name: AstNode, postfixToken: undefined, type: undefined, initializer: AstNode | undefined): AstNode;
declare function newGeneratedPrivateNameForNode(factory: NodeFactory, node: AstNode, opts: { readonly suffix: string }): AstNode;

declare const KindCallExpression: number;
declare const KindPropertyAccessExpression: number;
declare const KindElementAccessExpression: number;
declare const KindBinaryExpression: number;
declare const KindPrefixUnaryExpression: number;
declare const KindPostfixUnaryExpression: number;
declare const KindFunctionExpression: number;
declare const KindFunctionDeclaration: number;
declare const KindMethodDeclaration: number;
declare const KindGetAccessor: number;
declare const KindSetAccessor: number;
declare const KindConstructor: number;
declare const KindClassDeclaration: number;
declare const KindClassExpression: number;
declare const KindSuperKeyword: number;
declare const KindNullKeyword: number;
declare const KindEqualsEqualsEqualsToken: number;
declare const KindExclamationEqualsEqualsToken: number;
declare const KindBarBarToken: number;
declare const KindAmpersandAmpersandToken: number;
declare const KindEqualsGreaterThanToken: number;
declare const ModifierFlagsExportDefault: number;
declare const NodeFlagsConst: number;
