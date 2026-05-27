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
import {
  nodeKind, classModifiers, classDeclarationName, classTypeParameters,
  classHeritageClauses, classMembers,
  callExpressionExpression,
  binaryLeft, binaryOperatorKind, identifierText,
  assignmentTargetContainsSuperProperty,
} from "../../ast/index.js";
import {
  isPropertyAccessExpression, isElementAccessExpression,
} from "../../ast/index.js";
import { callExpressionArguments } from "../../ast/index.js";
import {
  propertyAccessExpressionOf, propertyAccessName,
  elementAccessExpressionOf, elementArgumentExpression,
  isSuperProperty, isUpdateExpression,
  unaryOperand, nodeListNodes, propertyDeclarationName,
} from "../../ast/index.js";
import { Kind, NodeFlags } from "../../ast/index.js";
function isAssignmentOperator(kind: number): boolean {
  // AssignmentOperator covers EqualsToken..CaretEqualsToken in the
  // canonical Kind enum (kind values are contiguous).
  return kind >= Kind.EqualsToken && kind <= Kind.CaretEqualsToken;
}
import { newGeneratedPrivateNameForNode } from "../../printer/factory-helpers.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import {
  visitNode, visitNodes, visitEachChild,
  setOriginal,
  newClassExpression, newBinaryExpression, newPropertyAccessExpression,
  newKeywordExpression, newVoidZeroExpression, newToken,
  newIdentifier, newThisExpression, newCallExpression,
  newArrowFunction, newParameterDeclaration,
  newPropertyAssignment, newAssignmentExpression,
  newObjectLiteralExpression,
  newVariableDeclaration, newVariableDeclarationList,
  newVariableStatement, newNodeList,
  updatePropertyDeclaration,
} from "../../printer/factory-helpers.js";

import type { EmitContext, NodeFactory, NodeVisitor } from "../transformer.js";

const KindCallExpression = Kind.CallExpression;
const KindPropertyAccessExpression = Kind.PropertyAccessExpression;
const KindElementAccessExpression = Kind.ElementAccessExpression;
const KindBinaryExpression = Kind.BinaryExpression;
const KindPrefixUnaryExpression = Kind.PrefixUnaryExpression;
const KindPostfixUnaryExpression = Kind.PostfixUnaryExpression;
const KindFunctionExpression = Kind.FunctionExpression;
const KindFunctionDeclaration = Kind.FunctionDeclaration;
const KindMethodDeclaration = Kind.MethodDeclaration;
const KindGetAccessor = Kind.GetAccessor;
const KindSetAccessor = Kind.SetAccessor;
const KindConstructor = Kind.Constructor;
const KindClassDeclaration = Kind.ClassDeclaration;
const KindClassExpression = Kind.ClassExpression;
const KindSuperKeyword = Kind.SuperKeyword;
const KindNullKeyword = Kind.NullKeyword;
const KindEqualsEqualsEqualsToken = Kind.EqualsEqualsEqualsToken;
const KindExclamationEqualsEqualsToken = Kind.ExclamationEqualsEqualsToken;
const KindBarBarToken = Kind.BarBarToken;
const KindAmpersandAmpersandToken = Kind.AmpersandAmpersandToken;
const KindEqualsGreaterThanToken = Kind.EqualsGreaterThanToken;
const ModifierFlagsExportDefault = ModifierFlags.ExportDefault;
const NodeFlagsConst = NodeFlags.Const;
void KindCallExpression; void KindPropertyAccessExpression;
void KindElementAccessExpression; void KindBinaryExpression;
void KindPrefixUnaryExpression; void KindPostfixUnaryExpression;
void KindFunctionExpression; void KindFunctionDeclaration;
void KindMethodDeclaration; void KindGetAccessor; void KindSetAccessor;
void KindConstructor; void KindClassDeclaration; void KindClassExpression;
void KindSuperKeyword; void KindNullKeyword;
void KindEqualsEqualsEqualsToken; void KindExclamationEqualsEqualsToken;
void KindBarBarToken; void KindAmpersandAmpersandToken;
void KindEqualsGreaterThanToken;
void ModifierFlagsExportDefault; void NodeFlagsConst;

/**
 * Converts a `class Foo {}` declaration to a `class Foo {}` expression
 * (drops `export`/`default` modifiers as appropriate).
 *
 * Mirrors TS-Go `convertClassDeclarationToClassExpression`.
 */
export function convertClassDeclarationToClassExpression(
  emitContext: EmitContext,
  node: AstNode,
  extractModifiers?: (emitContext: EmitContext, modifiers: AstNode | undefined, mask: number) => AstNode | undefined,
): AstNode {
  const factory = emitContext.factory();
  const updated = newClassExpression(
    factory,
    extractModifiers !== undefined ? extractModifiers(emitContext, classModifiers(node) as AstNode | undefined, ~ModifierFlagsExportDefault) : (classModifiers(node) as AstNode | undefined),
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
  public superAccessVisitor: NodeVisitor | undefined;

  public factory: NodeFactory | undefined;

  initSuperAccessVisitor(emitContext: EmitContext, factory: NodeFactory): void {
    this.factory = factory;
    this.superAccessVisitor = emitContext.newNodeVisitor((node) => this.visitSuperAccessNode(node));
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
        for (const n of nodeListNodes(visited as AstNode)) allArgs.push(n);
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

  private requireVisitor(): NodeVisitor {
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

