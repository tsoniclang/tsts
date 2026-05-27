/**
 * Destructuring flattening.
 *
 * Port of TS-Go `internal/transformers/destructuring.go`. Flattens
 * binding/assignment destructuring patterns into a sequence of
 * simple property/element access assignments or variable
 * declarations. Supports both assignment mode (destructuring
 * assignment expressions) and binding mode (variable declarations,
 * parameters, binding elements). Levels: `All` (decompose
 * everything) and `ObjectRest` (decompose only patterns containing
 * object rest elements).
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, IdentifierNode, VariableDeclaration, BinaryExpression, ElementAccessExpression } from "../ast/index.js";
import {
  nodeLoc, nodeText, nodeIsSynthesized, setLoc,
  binaryLeft, binaryRight, nodeInitializerOf,
  variableDeclarationNameRO, shorthandObjectAssignmentInitializerRO,
  spreadElementExpressionRO, cloneNode as _astCloneNode,
} from "../ast/index.js";
import {
  isIdentifier, isComputedPropertyName, isLiteralExpression,
  isBigIntLiteral, isBindingPattern, isOmittedExpression,
  isDestructuringAssignment, isVariableDeclaration,
  isPropertyAssignment, isShorthandPropertyAssignment,
  isSpreadElement,
  isStringOrNumericLiteralLike,
} from "../ast/index.js";
import { isSimpleCopiableExpression, isAssignmentPattern, isPropertyNameLiteral, subtreeFacts } from "../ast/index.js";
import { Kind, NodeFlags } from "../ast/index.js";
import { bindingElementName, bindingElementInitializer, bindingElementDotDotDotToken, bindingElementPropertyName, bindingPatternElements } from "../ast/index.js";

function isDeclarationBindingElement(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind ?? 0;
  return k === Kind.BindingElement || k === Kind.VariableDeclaration || k === Kind.Parameter;
}
function isEmptyArrayLiteral(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.ArrayLiteralExpression) return false;
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).elements;
  if (elements === undefined) return true;
  const inner = (elements as { nodes?: readonly AstNode[] }).nodes;
  return (inner ?? (elements as readonly AstNode[])).length === 0;
}
function isEmptyObjectLiteral(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.ObjectLiteralExpression) return false;
  const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).properties;
  if (props === undefined) return true;
  const inner = (props as { nodes?: readonly AstNode[] }).nodes;
  return (inner ?? (props as readonly AstNode[])).length === 0;
}
function isSimpleInlineableExpression(node: AstNode): boolean {
  // A simple inlineable expression: identifier, literal, this/super,
  // or true/false/null/undefined. Same as isSimpleCopiableExpression
  // for now (which covers all the simple literal-like cases).
  return isSimpleCopiableExpression(node);
}
function getTargetOfBindingOrAssignmentElement(element: AstNode | undefined): AstNode | undefined {
  if (element === undefined) return undefined;
  const k = (element as { kind?: number }).kind;
  if (k === Kind.BindingElement || k === Kind.VariableDeclaration || k === Kind.Parameter) {
    return bindingElementName(element);
  }
  if (k === Kind.PropertyAssignment) {
    return (element as unknown as { initializer?: AstNode }).initializer;
  }
  if (k === Kind.ShorthandPropertyAssignment || k === Kind.SpreadAssignment || k === Kind.SpreadElement) {
    return (element as unknown as { expression?: AstNode; name?: AstNode }).expression
      ?? (element as unknown as { name?: AstNode }).name;
  }
  return element;
}
function getRestIndicatorOfBindingOrAssignmentElement(element: AstNode | undefined): AstNode | undefined {
  if (element === undefined) return undefined;
  return bindingElementDotDotDotToken(element);
}
function tryGetPropertyNameOfBindingOrAssignmentElement(element: AstNode | undefined): AstNode | undefined {
  if (element === undefined) return undefined;
  return bindingElementPropertyName(element);
}
function getElementsOfBindingOrAssignmentPattern(pattern: AstNode): readonly AstNode[] {
  const k = (pattern as { kind?: number }).kind;
  if (k === Kind.ObjectBindingPattern || k === Kind.ArrayBindingPattern) {
    return bindingPatternElements(pattern) ?? [];
  }
  if (k === Kind.ObjectLiteralExpression) {
    const props = (pattern as unknown as { properties?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).properties;
    if (props === undefined) return [];
    return (props as { nodes?: readonly AstNode[] }).nodes ?? (props as readonly AstNode[]);
  }
  if (k === Kind.ArrayLiteralExpression) {
    const elements = (pattern as unknown as { elements?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).elements;
    if (elements === undefined) return [];
    return (elements as { nodes?: readonly AstNode[] }).nodes ?? (elements as readonly AstNode[]);
  }
  return [];
}
function computedPropertyNameExpression(node: AstNode): AstNode {
  return (node as unknown as { expression: AstNode }).expression;
}
function elementAccessExpressionArgument(node: ElementAccessExpression): AstNode {
  return (node as unknown as { argumentExpression: AstNode }).argumentExpression;
}
void bindingElementInitializer;
const TokenFlags = { None: 0 } as const;
function cloneNode(node: AstNode, _factory: unknown): AstNode { return _astCloneNode(node); }
// isAssignmentExpression: BinaryExpression with assignment operator.
function isAssignmentExpression(node: AstNode | undefined, excludeCompound: boolean): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  if (op === undefined) return false;
  if (excludeCompound) return op === Kind.EqualsToken;
  return op >= Kind.EqualsToken && op <= Kind.CaretEqualsToken;
}
type TextRange = { readonly pos: number; readonly end: number } | undefined;
import type { Transformer } from "./transformer.js";

// ---------------------------------------------------------------------------
// FlattenLevel
// ---------------------------------------------------------------------------

export type FlattenLevel = number;
export const FlattenLevel = {
  All: 0 as FlattenLevel,
  ObjectRest: 1 as FlattenLevel,
} as const;

// ---------------------------------------------------------------------------
// Callbacks
// ---------------------------------------------------------------------------

export type CreateAssignmentCallback = (
  name: IdentifierNode,
  value: AstNode,
  location: TextRange,
) => AstNode;

interface PendingDecl {
  pendingExpressions: AstNode[];
  name: AstNode;
  value: AstNode;
  location: TextRange;
  original: AstNode | undefined;
}

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

export function flattenDestructuringAssignment(
  tx: Transformer,
  node: AstNode,
  needsValue: boolean,
  level: FlattenLevel,
  createAssignmentCallback: CreateAssignmentCallback | undefined,
): AstNode {
  const f = new Flattener(tx, level);
  f.createAssignmentCallback = createAssignmentCallback;
  f.hoistTempVariables = true;
  f.emitBindingOrAssignment = (ff, t, v, l, o) => ff.emitAssignment(t, v, l, o);
  f.createArrayBindingOrAssignmentPattern = (ff, e) => ff.createArrayAssignmentPattern(e);
  f.createObjectBindingOrAssignmentPattern = (ff, e) => ff.createObjectAssignmentPattern(e);
  f.createArrayBindingOrAssignmentElement = (_ff, e) => e;
  return f.flattenDestructuringAssignment(node, needsValue);
}

export function flattenDestructuringBinding(
  tx: Transformer,
  node: AstNode,
  rval: AstNode | undefined,
  level: FlattenLevel,
  hoistTempVariables: boolean,
  skipInitializer: boolean,
): AstNode | undefined {
  const f = new Flattener(tx, level);
  f.hoistTempVariables = hoistTempVariables;
  f.emitBindingOrAssignment = (ff, t, v, l, o) => ff.emitBinding(t, v, l, o);
  f.createArrayBindingOrAssignmentPattern = (ff, e) => ff.createArrayBindingPattern(e);
  f.createObjectBindingOrAssignmentPattern = (ff, e) => ff.createObjectBindingPattern(e);
  f.createArrayBindingOrAssignmentElement = (ff, e) => ff.createArrayBindingElement(e);
  return f.flattenDestructuringBinding(node, rval, skipInitializer);
}

// ---------------------------------------------------------------------------
// Flattener
// ---------------------------------------------------------------------------

class Flattener {
  readonly tx: Transformer;
  readonly level: FlattenLevel;

  createAssignmentCallback: CreateAssignmentCallback | undefined;

  expressions: AstNode[] = [];
  declarations: PendingDecl[] = [];
  hasTransformedPriorElement = false;
  hoistTempVariables = false;

  emitBindingOrAssignment!: (
    f: Flattener,
    target: AstNode,
    value: AstNode,
    location: TextRange,
    original: AstNode | undefined,
  ) => void;
  createArrayBindingOrAssignmentPattern!: (f: Flattener, elements: AstNode[]) => AstNode;
  createObjectBindingOrAssignmentPattern!: (f: Flattener, elements: AstNode[]) => AstNode;
  createArrayBindingOrAssignmentElement!: (f: Flattener, expr: AstNode) => AstNode;

  constructor(tx: Transformer, level: FlattenLevel) {
    this.tx = tx;
    this.level = level;
  }

  // --- Assignment mode callbacks ---

  createArrayAssignmentPattern(elements: AstNode[]): AstNode {
    return this.tx.factory().newArrayLiteralExpression(this.tx.factory().newNodeList(elements), false);
  }

  createObjectAssignmentPattern(elements: AstNode[]): AstNode {
    return this.tx.factory().newObjectLiteralExpression(this.tx.factory().newNodeList(elements), false);
  }

  emitAssignment(target: AstNode, value: AstNode, location: TextRange, original: AstNode | undefined): void {
    let expression: AstNode;
    if (this.createAssignmentCallback !== undefined && isIdentifier(target)) {
      expression = this.createAssignmentCallback(target as IdentifierNode, value, location);
    } else {
      expression = this.tx.factory().newAssignmentExpression(this.tx.visitor().visitNode(target), value);
      setLoc(expression, location);
    }
    if (original !== undefined) this.tx.emitContext().setOriginal(expression, original);
    this.emitExpression(expression);
  }

  // --- Binding mode callbacks ---

  createArrayBindingPattern(elements: AstNode[]): AstNode {
    return this.tx.factory().newBindingPattern(Kind.ArrayBindingPattern, this.tx.factory().newNodeList(elements));
  }

  createObjectBindingPattern(elements: AstNode[]): AstNode {
    return this.tx.factory().newBindingPattern(Kind.ObjectBindingPattern, this.tx.factory().newNodeList(elements));
  }

  createArrayBindingElement(expr: AstNode): AstNode {
    return this.tx.factory().newBindingElement(undefined, undefined, expr, undefined);
  }

  emitBinding(target: AstNode, value: AstNode, location: TextRange, original: AstNode | undefined): void {
    let v = value;
    if (this.expressions.length > 0) {
      v = this.tx.factory().inlineExpressions([...this.expressions, v]);
      this.expressions = [];
    }
    this.declarations.push({
      pendingExpressions: [],
      name: target,
      value: v,
      location,
      original,
    });
  }

  // --- Shared helpers ---

  emitExpression(expr: AstNode): void {
    this.expressions = [...this.expressions, expr];
  }

  ensureIdentifier(value: AstNode, reuseIdentifierExpressions: boolean, location: TextRange): AstNode {
    if (reuseIdentifierExpressions && isIdentifier(value)) return value;
    const temp = this.tx.factory().newTempVariable();
    if (this.hoistTempVariables) {
      this.tx.emitContext().addVariableDeclaration(temp);
      const assign = this.tx.factory().newAssignmentExpression(temp, value);
      setLoc(assign, location);
      this.emitExpression(assign);
    } else {
      this.emitBindingOrAssignment(this, temp, value, location, undefined);
    }
    return temp;
  }

  createDefaultValueCheck(value: AstNode, defaultValue: AstNode, location: TextRange): AstNode {
    const v = this.ensureIdentifier(value, true, location);
    return this.tx.factory().newConditionalExpression(
      this.tx.factory().newTypeCheck(v, "undefined"),
      this.tx.factory().newToken(Kind.QuestionToken),
      defaultValue,
      this.tx.factory().newToken(Kind.ColonToken),
      v,
    );
  }

  createDestructuringPropertyAccess(value: AstNode, propertyName: AstNode): AstNode {
    if (isComputedPropertyName(propertyName)) {
      const argumentExpression = this.ensureIdentifier(
        this.tx.visitor().visitNode(computedPropertyNameExpression(propertyName)),
        false,
        nodeLoc(propertyName),
      );
      return this.tx.factory().newElementAccessExpression(value, undefined, argumentExpression, NodeFlags.None);
    } else if (isStringOrNumericLiteralLike(propertyName) || isBigIntLiteral(propertyName)) {
      const argumentExpression = cloneNode(propertyName, this.tx.factory());
      return this.tx.factory().newElementAccessExpression(value, undefined, argumentExpression, NodeFlags.None);
    } else {
      const name = this.tx.factory().newIdentifier(nodeText(propertyName));
      return this.tx.factory().newPropertyAccessExpression(value, undefined, name, NodeFlags.None);
    }
  }

  // --- Entry points ---

  flattenDestructuringAssignment(initialNode: AstNode, needsValue: boolean): AstNode {
    let node = initialNode;
    let location = nodeLoc(node);
    let value: AstNode | undefined;
    if (isDestructuringAssignment(node)) {
      value = binaryRight(node as BinaryExpression);
      while (
        isEmptyArrayLiteral(binaryLeft(node as BinaryExpression)) ||
        isEmptyObjectLiteral(binaryLeft(node as BinaryExpression))
      ) {
        if (isDestructuringAssignment(value!)) {
          node = value!;
          location = nodeLoc(node);
          value = binaryRight(node as BinaryExpression);
        } else {
          return this.tx.visitor().visitNode(value!);
        }
      }
    }

    if (value !== undefined) {
      value = this.tx.visitor().visitNode(value);
      if (
        (isIdentifier(value) && bindingOrAssignmentElementAssignsToName(node, nodeText(value))) ||
        bindingOrAssignmentElementContainsNonLiteralComputedName(node)
      ) {
        value = this.ensureIdentifier(value, false, location);
      } else if (needsValue) {
        value = this.ensureIdentifier(value, true, location);
      } else if (nodeIsSynthesized(node)) {
        location = nodeLoc(value);
      }
    }

    this.flattenBindingOrAssignmentElement(node, value, location, isDestructuringAssignment(node));

    if (value !== undefined && needsValue) {
      if (this.expressions.length === 0) return value;
      this.expressions = [...this.expressions, value];
    }

    const res = this.tx.factory().inlineExpressions(this.expressions);
    if (res !== undefined) return res;
    return this.tx.factory().newOmittedExpression();
  }

  flattenDestructuringBinding(node: AstNode, rval: AstNode | undefined, skipInitializer: boolean): AstNode | undefined {
    let current = node;
    if (isVariableDeclaration(current)) {
      let initializer = getInitializerOfBindingOrAssignmentElement(current);
      if (
        initializer !== undefined &&
        ((isIdentifier(initializer) && bindingOrAssignmentElementAssignsToName(current, nodeText(initializer))) ||
          bindingOrAssignmentElementContainsNonLiteralComputedName(current))
      ) {
        initializer = this.ensureIdentifier(this.tx.visitor().visitNode(initializer), false, nodeLoc(initializer));
        current = this.tx.factory().updateVariableDeclaration(
          current as unknown as VariableDeclaration,
          variableDeclarationNameRO(current as unknown as VariableDeclaration),
          undefined,
          undefined,
          initializer,
        );
      }
    }

    this.flattenBindingOrAssignmentElement(current, rval, nodeLoc(current), skipInitializer);

    if (this.expressions.length > 0) {
      const temp = this.tx.factory().newTempVariable();
      this.tx.emitContext().addVariableDeclaration(temp);
      const last = this.declarations[this.declarations.length - 1]!;
      last.pendingExpressions = [
        ...last.pendingExpressions,
        this.tx.factory().newAssignmentExpression(temp, last.value),
        ...this.expressions,
      ];
      last.value = temp;
    }

    const decls: AstNode[] = [];
    for (const pending of this.declarations) {
      let expr = pending.value;
      if (pending.pendingExpressions.length > 0) {
        expr = this.tx.factory().inlineExpressions([...pending.pendingExpressions, pending.value]);
      }
      const decl = this.tx.factory().newVariableDeclaration(pending.name, undefined, undefined, expr);
      setLoc(decl, pending.location);
      if (pending.original !== undefined) this.tx.emitContext().setOriginal(decl, pending.original);
      decls.push(decl);
    }

    if (decls.length === 1) return decls[0];
    if (decls.length === 0) return undefined;
    return this.tx.factory().newSyntaxList(decls);
  }

  // --- Core flattening ---

  flattenBindingOrAssignmentElement(
    element: AstNode,
    value: AstNode | undefined,
    location: TextRange,
    skipInitializer: boolean,
  ): void {
    const bindingTarget = getTargetOfBindingOrAssignmentElement(element);
    if (bindingTarget === undefined) return;
    let v = value;
    if (!skipInitializer) {
      const initializer = this.tx.visitor().visitNode(getInitializerOfBindingOrAssignmentElement(element)!);
      if (initializer !== undefined) {
        if (v !== undefined) {
          v = this.createDefaultValueCheck(v, initializer, location);
          if (!isSimpleCopiableExpression(initializer) && (isBindingPattern(bindingTarget) || isAssignmentPattern(bindingTarget))) {
            v = this.ensureIdentifier(v, true, location);
          }
        } else {
          v = initializer;
        }
      } else if (v === undefined) {
        v = this.tx.factory().newVoidZeroExpression();
      }
    }

    if (isObjectBindingOrAssignmentPattern(bindingTarget)) {
      this.flattenObjectBindingOrAssignmentPattern(element, bindingTarget, v!, location);
    } else if (isArrayBindingOrAssignmentPattern(bindingTarget)) {
      this.flattenArrayBindingOrAssignmentPattern(element, bindingTarget, v!, location);
    } else {
      this.emitBindingOrAssignment(this, bindingTarget, v!, location, element);
    }
  }

  flattenObjectBindingOrAssignmentPattern(
    parent: AstNode,
    pattern: AstNode,
    initialValue: AstNode,
    location: TextRange,
  ): void {
    let value = initialValue;
    const elements = getElementsOfBindingOrAssignmentPattern(pattern);
    const numElements = elements.length;
    if (numElements !== 1) {
      const reuseIdentifierExpressions = !isDeclarationBindingElement(parent) || numElements !== 0;
      value = this.ensureIdentifier(value, reuseIdentifierExpressions, location);
    }
    let bindingElements: AstNode[] = [];
    const computedTempVariables: AstNode[] = [];
    for (let i = 0; i < numElements; i++) {
      const element = elements[i]!;
      if (getRestIndicatorOfBindingOrAssignmentElement(element) === undefined) {
        const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
        if (
          this.level >= FlattenLevel.ObjectRest &&
          (subtreeFacts(element) &
            (SubtreeFacts.ContainsRestOrSpread | SubtreeFacts.ContainsObjectRestOrSpread)) ===
            0 &&
          (subtreeFacts(getTargetOfBindingOrAssignmentElement(element)!) &
            (SubtreeFacts.ContainsRestOrSpread | SubtreeFacts.ContainsObjectRestOrSpread)) ===
            0 &&
          (propertyName === undefined || !isComputedPropertyName(propertyName))
        ) {
          bindingElements.push(this.tx.visitor().visitNode(element));
        } else {
          if (bindingElements.length > 0) {
            this.emitBindingOrAssignment(
              this,
              this.createObjectBindingOrAssignmentPattern(this, bindingElements),
              value,
              location,
              pattern,
            );
            bindingElements = [];
          }
          const rhsValue = this.createDestructuringPropertyAccess(value, propertyName!);
          if (isComputedPropertyName(propertyName!)) {
            computedTempVariables.push(elementAccessExpressionArgument(rhsValue as ElementAccessExpression));
          }
          this.flattenBindingOrAssignmentElement(element, rhsValue, nodeLoc(element), false);
        }
      } else if (i === numElements - 1) {
        if (bindingElements.length > 0) {
          this.emitBindingOrAssignment(
            this,
            this.createObjectBindingOrAssignmentPattern(this, bindingElements),
            value,
            location,
            pattern,
          );
          bindingElements = [];
        }
        const rhsValue = this.tx.factory().newRestHelper(value, elements, computedTempVariables, nodeLoc(pattern));
        this.flattenBindingOrAssignmentElement(element, rhsValue, nodeLoc(element), false);
      }
    }
    if (bindingElements.length > 0) {
      this.emitBindingOrAssignment(
        this,
        this.createObjectBindingOrAssignmentPattern(this, bindingElements),
        value,
        location,
        pattern,
      );
    }
  }

  flattenArrayBindingOrAssignmentPattern(
    parent: AstNode,
    pattern: AstNode,
    initialValue: AstNode,
    location: TextRange,
  ): void {
    let value = initialValue;
    const elements = getElementsOfBindingOrAssignmentPattern(pattern);
    const numElements = elements.length;
    if (
      (numElements !== 1 && (this.level < FlattenLevel.ObjectRest || numElements === 0)) ||
      elements.every(isOmittedExpression)
    ) {
      const reuseIdentifierExpressions = !isDeclarationBindingElement(parent) || numElements !== 0;
      value = this.ensureIdentifier(value, reuseIdentifierExpressions, location);
    }
    const bindingElements: AstNode[] = [];
    const restContainingElements: { id: AstNode; element: AstNode }[] = [];
    for (let i = 0; i < numElements; i++) {
      const element = elements[i]!;
      if (this.level >= FlattenLevel.ObjectRest) {
        if (
          (subtreeFacts(element) & SubtreeFacts.ContainsObjectRestOrSpread) !== 0 ||
          (this.hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element))
        ) {
          this.hasTransformedPriorElement = true;
          const temp = this.tx.factory().newTempVariable();
          if (this.hoistTempVariables) {
            this.tx.emitContext().addVariableDeclaration(temp);
          }
          restContainingElements.push({ id: temp, element });
          bindingElements.push(this.createArrayBindingOrAssignmentElement(this, temp));
        } else {
          bindingElements.push(element);
        }
      } else if (isOmittedExpression(element)) {
        continue;
      } else if (getRestIndicatorOfBindingOrAssignmentElement(element) === undefined) {
        const rhsValue = this.tx
          .factory()
          .newElementAccessExpression(
            value,
            undefined,
            this.tx.factory().newNumericLiteral(String(i), TokenFlags.None),
            NodeFlags.None,
          );
        this.flattenBindingOrAssignmentElement(element, rhsValue, nodeLoc(element), false);
      } else if (i === numElements - 1) {
        const rhsValue = this.tx.factory().newArraySliceCall(value, i);
        this.flattenBindingOrAssignmentElement(element, rhsValue, nodeLoc(element), false);
      }
    }
    if (bindingElements.length > 0) {
      this.emitBindingOrAssignment(
        this,
        this.createArrayBindingOrAssignmentPattern(this, bindingElements),
        value,
        location,
        pattern,
      );
    }
    if (restContainingElements.length > 0) {
      for (const pair of restContainingElements) {
        this.flattenBindingOrAssignmentElement(pair.element, pair.id, nodeLoc(pair.element), false);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Exported helper functions
// ---------------------------------------------------------------------------

export function bindingOrAssignmentElementAssignsToName(element: AstNode, name: string): boolean {
  const target = getTargetOfBindingOrAssignmentElement(element);
  if (target === undefined) return false;
  if (isBindingPattern(target) || isAssignmentPattern(target)) {
    return bindingOrAssignmentPatternAssignsToName(target, name);
  }
  if (isIdentifier(target)) return nodeText(target) === name;
  return false;
}

function bindingOrAssignmentPatternAssignsToName(pattern: AstNode, name: string): boolean {
  const elements = getElementsOfBindingOrAssignmentPattern(pattern);
  for (const element of elements) {
    if (bindingOrAssignmentElementAssignsToName(element, name)) return true;
  }
  return false;
}

export function bindingOrAssignmentElementContainsNonLiteralComputedName(element: AstNode): boolean {
  const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
  if (propertyName !== undefined && isComputedPropertyName(propertyName) && !isLiteralExpression(computedPropertyNameExpression(propertyName))) {
    return true;
  }
  const target = getTargetOfBindingOrAssignmentElement(element);
  return (
    target !== undefined &&
    (isBindingPattern(target) || isAssignmentPattern(target)) &&
    bindingOrAssignmentPatternContainsNonLiteralComputedName(target)
  );
}

function bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern: AstNode): boolean {
  const elements = getElementsOfBindingOrAssignmentPattern(pattern);
  return elements.some(bindingOrAssignmentElementContainsNonLiteralComputedName);
}

export function getInitializerOfBindingOrAssignmentElement(bindingElement: AstNode | undefined): AstNode | undefined {
  if (bindingElement === undefined) return undefined;
  if (isDeclarationBindingElement(bindingElement)) return nodeInitializerOf(bindingElement);
  if (isPropertyAssignment(bindingElement)) {
    const initializer = nodeInitializerOf(bindingElement);
    if (initializer !== undefined && isAssignmentExpression(initializer, true)) {
      return binaryRight(initializer as BinaryExpression);
    }
    return undefined;
  }
  if (isShorthandPropertyAssignment(bindingElement)) {
    return shorthandObjectAssignmentInitializerRO(bindingElement);
  }
  if (isAssignmentExpression(bindingElement, true)) {
    return binaryRight(bindingElement as BinaryExpression);
  }
  if (isSpreadElement(bindingElement)) {
    return getInitializerOfBindingOrAssignmentElement(spreadElementExpressionRO(bindingElement));
  }
  return undefined;
}

function isObjectBindingOrAssignmentPattern(node: AstNode | undefined): boolean {
  return node !== undefined && (node.kind === Kind.ObjectBindingPattern || node.kind === Kind.ObjectLiteralExpression);
}

function isArrayBindingOrAssignmentPattern(node: AstNode | undefined): boolean {
  return node !== undefined && (node.kind === Kind.ArrayBindingPattern || node.kind === Kind.ArrayLiteralExpression);
}

function isSimpleBindingOrAssignmentElement(element: AstNode): boolean {
  const target = getTargetOfBindingOrAssignmentElement(element);
  if (target === undefined || isOmittedExpression(target)) return true;
  const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
  if (propertyName !== undefined && !isPropertyNameLiteral(propertyName)) return false;
  const initializer = getInitializerOfBindingOrAssignmentElement(element);
  if (initializer !== undefined && !isSimpleInlineableExpression(initializer)) return false;
  if (isBindingPattern(target) || isAssignmentPattern(target)) {
    return getElementsOfBindingOrAssignmentPattern(target).every(isSimpleBindingOrAssignmentElement);
  }
  return isIdentifier(target);
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

const SubtreeFacts = {
  ContainsRestOrSpread: 1 << 0,
  ContainsObjectRestOrSpread: 1 << 1,
} as const;

// Strada predicates and accessors that aren't yet wired to ast/index.js.
