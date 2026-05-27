/**
 * Named-evaluation transform helpers.
 *
 * Port of TS-Go `internal/transformers/estransforms/namedevaluation.go`.
 * Implements ECMA-262 NamedEvaluation algorithm for anonymous classes
 * and functions: when an anonymous function/class is assigned via a
 * binding form that has a known name (variable decl, property assign,
 * shorthand init, parameter default, binding element, property decl,
 * `=`/`||=`/`&&=`/`??=`, or `export default`), inject a static
 * `__setFunctionName(this, "name")` block (for classes) or wrap the
 * RHS in a `__setFunctionName(fn, "name")` helper call.
 *
 * Cross-module deps (AST predicates, factory, printer.EmitContext)
 * forward-declared at file end.
 */

import { isClassThisAssignmentBlock } from "./classthis.js";
import type { Node as AstNode, ClassLikeDeclaration, IdentifierNode, StringLiteralNode, PropertyName, ComputedPropertyName, PropertyAssignment, ShorthandPropertyAssignment, VariableDeclaration, ParameterDeclaration, BindingElement, PropertyDeclaration, BinaryExpression, ExportAssignment, ClassExpression, FunctionExpression, ArrowFunction } from "../../ast/index.js";
import {
  nodeLoc, setLoc, declName, classDeclName, classMembers, classModifiers,
  classHeritageClauses,
  hasSyntacticModifier, skipOuterExpressions,
  variableDeclarationName,
  bindingElementName, bindingElementInitializer,
  bindingElementDotDotDotToken, bindingElementPropertyName,
  parameterDotDotDotToken,
  callExpressionArguments,
  binaryLeft, binaryRight, binaryOperatorToken, binaryOperatorTokenKind,
  exportAssignmentExpression, exportAssignmentIsExportEquals,
} from "../../ast/index.js";
import {
  isIdentifier, isStringLiteral, isPrivateIdentifier,
  isComputedPropertyName, isClassDeclaration, isFunctionDeclaration,
  isClassExpression, isExpressionStatement,
  isClassStaticBlockDeclaration, isPropertyNameLiteral,
} from "../../ast/index.js";
import {
  classStaticBlockBodyStatements, expressionOfStatement,
  stringLiteralText, classMemberListLoc, classTypeParameterList,
  functionExpressionName, propertyNameText, propertyNameExpression,
  propertyAssignmentName, propertyAssignmentInitializer,
  shorthandName, shorthandObjectAssignmentInitializer, shorthandEqualsToken,
  variableDeclarationInitializer,
  parameterDeclarationName, parameterDeclarationInitializer,
  propertyDeclarationName, propertyDeclarationInitializer,
  propertyDeclarationModifiers,
  nodeInitializer,
} from "../../ast/index.js";
import { Kind } from "../../ast/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";

// An anonymous function definition is a ClassExpression | FunctionExpression | ArrowFunction.
export type AnonymousFunctionDefinition = ClassExpression | FunctionExpression | ArrowFunction;

/**
 * Gets whether a node is a `static {}` block containing only a single
 * call to the `__setFunctionName` helper where the call's second
 * argument is the value stored in the `assignedName` property of the
 * block's `EmitNode`.
 */
export function isClassNamedEvaluationHelperBlock(emitContext: EmitContext, node: AstNode): boolean {
  if (!isClassStaticBlockDeclaration(node)) return false;
  const stmts = classStaticBlockBodyStatements(node);
  if (stmts.length !== 1) return false;

  const statement = stmts[0]!;
  if (isExpressionStatement(statement)) {
    const expression = expressionOfStatement(statement);
    if (emitContext.isCallToHelper(expression, "__setFunctionName")) {
      const args = callExpressionArguments(expression);
      return args.length >= 2 && args[1] === emitContext.assignedName(node);
    }
  }
  return false;
}

/**
 * Gets whether a `ClassLikeDeclaration` has a `static {}` block
 * containing only a single call to the `__setFunctionName` helper.
 */
export function classHasExplicitlyAssignedName(emitContext: EmitContext, node: ClassLikeDeclaration): boolean {
  const assigned = emitContext.assignedName(node as unknown as AstNode);
  if (assigned !== undefined) {
    for (const member of classMembers(node as unknown as AstNode) ?? []) {
      if (isClassNamedEvaluationHelperBlock(emitContext, member)) return true;
    }
  }
  return false;
}

/**
 * Gets whether a `ClassLikeDeclaration` has a declared name or
 * contains a `static {}` block with `__setFunctionName`.
 */
export function classHasDeclaredOrExplicitlyAssignedName(emitContext: EmitContext, node: ClassLikeDeclaration): boolean {
  return classDeclName(node) !== undefined || classHasExplicitlyAssignedName(emitContext, node);
}

/**
 * Indicates whether a property name is the special `__proto__`
 * property. Per ECMA-262, this only matters for property assignments
 * whose name is the Identifier `__proto__` or the string literal
 * `"__proto__"`, but not for computed property names.
 */
export function isProtoSetter(node: PropertyName): boolean {
  return (isIdentifier(node as unknown as AstNode) || isStringLiteral(node as unknown as AstNode)) &&
    propertyNameText(node) === "__proto__";
}

/**
 * Indicates whether an expression is an anonymous function definition.
 * See https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 */
export function isAnonymousFunctionDefinition(
  emitContext: EmitContext,
  node: AstNode,
  cb?: (def: AnonymousFunctionDefinition) => boolean,
): boolean {
  const unwrapped = skipOuterExpressions(node, OEK.All);
  switch (unwrapped.kind) {
    case Kind.ClassExpression:
      if (classHasDeclaredOrExplicitlyAssignedName(emitContext, unwrapped as unknown as ClassLikeDeclaration)) {
        return false;
      }
      break;
    case Kind.FunctionExpression:
      if (functionExpressionName(unwrapped as unknown as FunctionExpression) !== undefined) {
        return false;
      }
      break;
    case Kind.ArrowFunction:
      break;
    default:
      return false;
  }
  if (cb !== undefined) {
    return cb(unwrapped as unknown as AnonymousFunctionDefinition);
  }
  return true;
}

/**
 * Indicates whether a node is a potential source of an assigned name
 * for a class, function, or arrow function.
 */
export function isNamedEvaluationSource(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.PropertyAssignment:
      return !isProtoSetter(propertyAssignmentName(node) as unknown as PropertyName);
    case Kind.ShorthandPropertyAssignment:
      return shorthandObjectAssignmentInitializer(node as unknown as ShorthandPropertyAssignment) !== undefined;
    case Kind.VariableDeclaration:
      return isIdentifier(variableDeclarationName(node as unknown as VariableDeclaration)) &&
        nodeInitializer(node) !== undefined;
    case Kind.Parameter:
      return isIdentifier(parameterDeclarationName(node as unknown as ParameterDeclaration)) &&
        nodeInitializer(node) !== undefined &&
        parameterDotDotDotToken(node as unknown as ParameterDeclaration) === undefined;
    case Kind.BindingElement:
      return isIdentifier(bindingElementName(node as unknown as BindingElement)) &&
        nodeInitializer(node) !== undefined &&
        bindingElementDotDotDotToken(node as unknown as BindingElement) === undefined;
    case Kind.PropertyDeclaration:
      return nodeInitializer(node) !== undefined;
    case Kind.BinaryExpression: {
      const opKind = binaryOperatorTokenKind(node as unknown as BinaryExpression);
      switch (opKind) {
        case Kind.EqualsToken:
        case Kind.AmpersandAmpersandEqualsToken:
        case Kind.BarBarEqualsToken:
        case Kind.QuestionQuestionEqualsToken:
          return isIdentifier(binaryLeft(node as unknown as BinaryExpression));
      }
      break;
    }
    case Kind.ExportAssignment:
      return true;
  }
  return false;
}

export function isNamedEvaluation(emitContext: EmitContext, node: AstNode): boolean {
  return isNamedEvaluationAnd(emitContext, node, undefined);
}

export function isNamedEvaluationAnd(
  emitContext: EmitContext,
  node: AstNode,
  cb: ((def: AnonymousFunctionDefinition) => boolean) | undefined,
): boolean {
  if (!isNamedEvaluationSource(node)) return false;
  switch (node.kind) {
    case Kind.ShorthandPropertyAssignment:
      return isAnonymousFunctionDefinition(
        emitContext,
        shorthandObjectAssignmentInitializer(node as unknown as ShorthandPropertyAssignment)!,
        cb,
      );
    case Kind.PropertyAssignment:
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.BindingElement:
    case Kind.PropertyDeclaration:
      return isAnonymousFunctionDefinition(emitContext, nodeInitializer(node)!, cb);
    case Kind.BinaryExpression:
      return isAnonymousFunctionDefinition(emitContext, binaryRight(node as unknown as BinaryExpression), cb);
    case Kind.ExportAssignment:
      return isAnonymousFunctionDefinition(emitContext, exportAssignmentExpression(node as unknown as ExportAssignment), cb);
    default:
      throw new Error("Unhandled case in isNamedEvaluation");
  }
}

/**
 * Gets a string literal to use as the assigned name of an anonymous
 * class or function declaration.
 */
export function getAssignedNameOfIdentifier(
  emitContext: EmitContext,
  name: IdentifierNode,
  expression: AstNode,
): StringLiteralNode {
  const original = emitContext.mostOriginal(skipOuterExpressions(expression, OEK.All));
  if (
    (isClassDeclaration(original) || isFunctionDeclaration(original)) &&
    declName(original) === undefined &&
    hasSyntacticModifier(original, ModifierFlags.Default)
  ) {
    return emitContext.factory().newStringLiteral("default", TokenFlags.None);
  }
  return emitContext.factory().newStringLiteralFromNode(name);
}

export function getAssignedNameOfPropertyName(
  emitContext: EmitContext,
  name: PropertyName,
  assignedNameText: string,
): { assignedName: AstNode; updatedName: PropertyName } {
  const factory = emitContext.factory();
  if (assignedNameText.length > 0) {
    const assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
    return { assignedName, updatedName: name };
  }

  if (isPropertyNameLiteral(name as unknown as AstNode) || isPrivateIdentifier(name as unknown as AstNode)) {
    const assignedName = factory.newStringLiteralFromNode(name);
    return { assignedName, updatedName: name };
  }

  const expression = propertyNameExpression(name);
  if (isPropertyNameLiteral(expression) && !isIdentifier(expression)) {
    const assignedName = factory.newStringLiteralFromNode(expression);
    return { assignedName, updatedName: name };
  }

  if (!isComputedPropertyName(name as unknown as AstNode)) {
    throw new Error("Expected computed property name");
  }

  const assignedName = factory.newGeneratedNameForNode(name);
  emitContext.addVariableDeclaration(assignedName);

  const key = factory.newPropKeyHelper(expression);
  const assignment = factory.newAssignmentExpression(assignedName, key);
  const updatedName = factory.updateComputedPropertyName(name as unknown as ComputedPropertyName, assignment);
  return { assignedName, updatedName: updatedName as unknown as PropertyName };
}

/**
 * Creates a class `static {}` block used to dynamically set the name
 * of a class.
 */
export function createClassNamedEvaluationHelperBlock(
  emitContext: EmitContext,
  assignedName: AstNode,
  thisExpression: AstNode | undefined,
): AstNode {
  // produces:  static { __setFunctionName(this, "C"); }
  const factory = emitContext.factory();
  const thisExpr = thisExpression ?? factory.newThisExpression();
  const expression = factory.newSetFunctionNameHelper(thisExpr, assignedName, "");
  const statement = factory.newExpressionStatement(expression);
  const body = factory.newBlock(factory.newNodeList([statement]), false);
  const block = factory.newClassStaticBlockDeclaration(undefined, body);

  // We use `emitNode.assignedName` to indicate this is a NamedEvaluation helper block
  // and to stash the expression used to resolve the assigned name.
  emitContext.setAssignedName(block, assignedName);
  return block;
}

/**
 * Injects a class `static {}` block used to dynamically set the name
 * of a class, if one does not already exist. If the class has a
 * `_classThis` assignment block, the new block is injected after it.
 */
export function injectClassNamedEvaluationHelperBlockIfMissing(
  emitContext: EmitContext,
  node: ClassLikeDeclaration,
  assignedName: AstNode,
  thisExpression: AstNode | undefined,
): ClassLikeDeclaration {
  if (classHasExplicitlyAssignedName(emitContext, node)) return node;

  const factory = emitContext.factory();
  const namedEvaluationBlock = createClassNamedEvaluationHelperBlock(emitContext, assignedName, thisExpression);
  const className = classDeclName(node);
  if (className !== undefined) {
    emitContext.setSourceMapRange(
      classStaticBlockBodyStatements(namedEvaluationBlock)[0]!,
      nodeLoc(className),
    );
  }

  const members = classMembers(node as unknown as AstNode) ?? [];
  let insertionIndex = -1;
  for (let i = 0; i < members.length; i++) {
    if (isClassThisAssignmentBlock(emitContext as unknown as never, members[i]!)) {
      insertionIndex = i;
      break;
    }
  }
  insertionIndex += 1;
  const leading = [...members].slice(0, insertionIndex);
  const trailing = [...members].slice(insertionIndex);

  const newMembers: AstNode[] = [...leading, namedEvaluationBlock, ...trailing];
  const membersList = factory.newNodeList(newMembers);
  setLoc(membersList as AstNode, classMemberListLoc(node));

  const oldNode = node;
  let updated: ClassLikeDeclaration;
  if (isClassDeclaration(node as unknown as AstNode)) {
    updated = factory.updateClassDeclaration(
      node,
      classModifiers(node),
      className,
      classTypeParameterList(node),
      classHeritageClauses(node),
      membersList,
    );
  } else {
    updated = factory.updateClassExpression(
      node,
      classModifiers(node),
      className,
      classTypeParameterList(node),
      classHeritageClauses(node),
      membersList,
    );
  }

  emitContext.setAssignedName(updated as unknown as AstNode, assignedName);

  // Transfer ClassThis from old to new node, since UpdateClassExpression creates
  // a new node that won't have ClassThis set on it.
  const ct = emitContext.classThis(oldNode as unknown as AstNode);
  if (ct !== undefined) {
    emitContext.setClassThis(updated as unknown as AstNode, ct);
  }

  return updated;
}

export function finishTransformNamedEvaluation(
  emitContext: EmitContext,
  expression: AstNode,
  assignedName: AstNode,
  ignoreEmptyStringLiteral: boolean,
): AstNode {
  if (ignoreEmptyStringLiteral && isStringLiteral(assignedName) && stringLiteralText(assignedName).length === 0) {
    return expression;
  }

  const factory = emitContext.factory();
  const innerExpression = skipOuterExpressions(expression, OEK.All);

  let updatedExpression: AstNode;
  if (isClassExpression(innerExpression)) {
    updatedExpression = injectClassNamedEvaluationHelperBlockIfMissing(
      emitContext,
      innerExpression as unknown as ClassLikeDeclaration,
      assignedName,
      undefined,
    ) as unknown as AstNode;
  } else {
    updatedExpression = factory.newSetFunctionNameHelper(innerExpression, assignedName, "");
  }

  return factory.restoreOuterExpressions(expression, updatedExpression, OEK.All);
}

// ---------------------------------------------------------------------------
// Per-kind transformers
// ---------------------------------------------------------------------------

export function transformNamedEvaluationOfPropertyAssignment(
  context: EmitContext,
  node: PropertyAssignment,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = context.factory();
  const { assignedName, updatedName } = getAssignedNameOfPropertyName(
    context,
    propertyAssignmentName(node) as unknown as PropertyName,
    assignedNameText,
  );
  const initializer = finishTransformNamedEvaluation(
    context,
    propertyAssignmentInitializer(node),
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updatePropertyAssignment(node, undefined, updatedName, undefined, undefined, initializer);
}

export function transformNamedEvaluationOfShorthandAssignmentProperty(
  emitContext: EmitContext,
  node: ShorthandPropertyAssignment,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else {
    assignedName = getAssignedNameOfIdentifier(
      emitContext,
      shorthandName(node) as unknown as IdentifierNode,
      shorthandObjectAssignmentInitializer(node)!,
    );
  }
  const objectAssignmentInitializer = finishTransformNamedEvaluation(
    emitContext,
    shorthandObjectAssignmentInitializer(node)!,
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateShorthandPropertyAssignment(
    node,
    undefined,
    shorthandName(node) as unknown as IdentifierNode,
    undefined,
    undefined,
    shorthandEqualsToken(node),
    objectAssignmentInitializer,
  );
}

export function transformNamedEvaluationOfVariableDeclaration(
  emitContext: EmitContext,
  node: VariableDeclaration,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else {
    assignedName = getAssignedNameOfIdentifier(
      emitContext,
      variableDeclarationName(node) as unknown as IdentifierNode,
      variableDeclarationInitializer(node)!,
    );
  }
  const initializer = finishTransformNamedEvaluation(
    emitContext,
    variableDeclarationInitializer(node)!,
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateVariableDeclaration(
    node,
    variableDeclarationName(node),
    undefined,
    undefined,
    initializer,
  );
}

export function transformNamedEvaluationOfParameterDeclaration(
  emitContext: EmitContext,
  node: ParameterDeclaration,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else {
    assignedName = getAssignedNameOfIdentifier(
      emitContext,
      parameterDeclarationName(node) as unknown as IdentifierNode,
      parameterDeclarationInitializer(node)!,
    );
  }
  const initializer = finishTransformNamedEvaluation(
    emitContext,
    parameterDeclarationInitializer(node)!,
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateParameterDeclaration(
    node,
    undefined,
    parameterDotDotDotToken(node),
    parameterDeclarationName(node),
    undefined,
    undefined,
    initializer,
  );
}

export function transformNamedEvaluationOfBindingElement(
  emitContext: EmitContext,
  node: BindingElement,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else {
    assignedName = getAssignedNameOfIdentifier(
      emitContext,
      bindingElementName(node) as unknown as IdentifierNode,
      bindingElementInitializer(node)!,
    );
  }
  const initializer = finishTransformNamedEvaluation(
    emitContext,
    bindingElementInitializer(node)!,
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateBindingElement(
    node,
    bindingElementDotDotDotToken(node),
    bindingElementPropertyName(node),
    bindingElementName(node),
    initializer,
  );
}

export function transformNamedEvaluationOfPropertyDeclaration(
  emitContext: EmitContext,
  node: PropertyDeclaration,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  const { assignedName, updatedName } = getAssignedNameOfPropertyName(
    emitContext,
    propertyDeclarationName(node) as unknown as PropertyName,
    assignedNameText,
  );
  const initializer = finishTransformNamedEvaluation(
    emitContext,
    propertyDeclarationInitializer(node)!,
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updatePropertyDeclaration(
    node,
    propertyDeclarationModifiers(node),
    updatedName,
    undefined,
    undefined,
    initializer,
  );
}

export function transformNamedEvaluationOfAssignmentExpression(
  emitContext: EmitContext,
  node: BinaryExpression,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else {
    assignedName = getAssignedNameOfIdentifier(
      emitContext,
      binaryLeft(node) as unknown as IdentifierNode,
      binaryRight(node),
    );
  }
  const right = finishTransformNamedEvaluation(
    emitContext,
    binaryRight(node),
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateBinaryExpression(
    node,
    undefined,
    binaryLeft(node),
    undefined,
    binaryOperatorToken(node),
    right,
  );
}

export function transformNamedEvaluationOfExportAssignment(
  emitContext: EmitContext,
  node: ExportAssignment,
  ignoreEmptyStringLiteral: boolean,
  assignedNameText: string,
): AstNode {
  const factory = emitContext.factory();
  let assignedName: AstNode;
  if (assignedNameText.length > 0) {
    assignedName = factory.newStringLiteral(assignedNameText, TokenFlags.None);
  } else if (exportAssignmentIsExportEquals(node)) {
    // `export =` translates to `module.exports = ...`, the assigned name is `""`.
    assignedName = factory.newStringLiteral("", TokenFlags.None);
  } else {
    assignedName = factory.newStringLiteral("default", TokenFlags.None);
  }
  const expression = finishTransformNamedEvaluation(
    emitContext,
    exportAssignmentExpression(node),
    assignedName,
    ignoreEmptyStringLiteral,
  );
  return factory.updateExportAssignment(
    node,
    undefined,
    exportAssignmentIsExportEquals(node),
    undefined,
    expression,
  );
}

/**
 * Performs a shallow transformation of a `NamedEvaluation` node, such
 * that a valid name will be assigned.
 */
export function transformNamedEvaluation(
  context: EmitContext,
  node: AstNode,
  ignoreEmptyStringLiteral: boolean,
  assignedName: string,
): AstNode {
  switch (node.kind) {
    case Kind.PropertyAssignment:
      return transformNamedEvaluationOfPropertyAssignment(context, node as unknown as PropertyAssignment, ignoreEmptyStringLiteral, assignedName);
    case Kind.ShorthandPropertyAssignment:
      return transformNamedEvaluationOfShorthandAssignmentProperty(context, node as unknown as ShorthandPropertyAssignment, ignoreEmptyStringLiteral, assignedName);
    case Kind.VariableDeclaration:
      return transformNamedEvaluationOfVariableDeclaration(context, node as unknown as VariableDeclaration, ignoreEmptyStringLiteral, assignedName);
    case Kind.Parameter:
      return transformNamedEvaluationOfParameterDeclaration(context, node as unknown as ParameterDeclaration, ignoreEmptyStringLiteral, assignedName);
    case Kind.BindingElement:
      return transformNamedEvaluationOfBindingElement(context, node as unknown as BindingElement, ignoreEmptyStringLiteral, assignedName);
    case Kind.PropertyDeclaration:
      return transformNamedEvaluationOfPropertyDeclaration(context, node as unknown as PropertyDeclaration, ignoreEmptyStringLiteral, assignedName);
    case Kind.BinaryExpression:
      return transformNamedEvaluationOfAssignmentExpression(context, node as unknown as BinaryExpression, ignoreEmptyStringLiteral, assignedName);
    case Kind.ExportAssignment:
      return transformNamedEvaluationOfExportAssignment(context, node as unknown as ExportAssignment, ignoreEmptyStringLiteral, assignedName);
    default:
      throw new Error("Unhandled case in transformNamedEvaluation");
  }
}

// ---------------------------------------------------------------------------
// Forward-declared types / cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext {
  factory(): Factory;
  assignedName(node: AstNode): AstNode | undefined;
  setAssignedName(node: AstNode, name: AstNode): void;
  classThis(node: AstNode): AstNode | undefined;
  setClassThis(node: AstNode, thisExpr: AstNode): void;
  mostOriginal(node: AstNode): AstNode;
  isCallToHelper(node: AstNode, name: string): boolean;
  addVariableDeclaration(name: AstNode): void;
  setSourceMapRange(node: AstNode, range: unknown): void;
}

interface Factory {
  newStringLiteral(text: string, flags: number): StringLiteralNode;
  newStringLiteralFromNode(node: AstNode): StringLiteralNode;
  newGeneratedNameForNode(node: AstNode): AstNode;
  newAssignmentExpression(left: AstNode, right: AstNode): AstNode;
  newPropKeyHelper(expression: AstNode): AstNode;
  updateComputedPropertyName(node: ComputedPropertyName, expression: AstNode): AstNode;
  newThisExpression(): AstNode;
  newSetFunctionNameHelper(target: AstNode, name: AstNode, prefix: string): AstNode;
  newExpressionStatement(expression: AstNode): AstNode;
  newBlock(statements: unknown, multiLine: boolean): AstNode;
  newNodeList<T extends AstNode>(items: readonly T[]): unknown;
  newClassStaticBlockDeclaration(modifiers: unknown, body: AstNode): AstNode;
  updateClassDeclaration(
    node: ClassLikeDeclaration,
    modifiers: unknown,
    name: AstNode | undefined,
    typeParameters: unknown,
    heritageClauses: unknown,
    members: unknown,
  ): ClassLikeDeclaration;
  updateClassExpression(
    node: ClassLikeDeclaration,
    modifiers: unknown,
    name: AstNode | undefined,
    typeParameters: unknown,
    heritageClauses: unknown,
    members: unknown,
  ): ClassLikeDeclaration;
  updatePropertyAssignment(
    node: PropertyAssignment,
    modifiers: unknown,
    name: PropertyName,
    postfixToken: unknown,
    typeNode: unknown,
    initializer: AstNode,
  ): AstNode;
  updateShorthandPropertyAssignment(
    node: ShorthandPropertyAssignment,
    modifiers: unknown,
    name: IdentifierNode,
    postfixToken: unknown,
    typeNode: unknown,
    equalsToken: unknown,
    initializer: AstNode,
  ): AstNode;
  updateVariableDeclaration(
    node: VariableDeclaration,
    name: AstNode,
    exclamationToken: unknown,
    typeNode: unknown,
    initializer: AstNode,
  ): AstNode;
  updateParameterDeclaration(
    node: ParameterDeclaration,
    modifiers: unknown,
    dotDotDotToken: unknown,
    name: AstNode,
    questionToken: unknown,
    typeNode: unknown,
    initializer: AstNode,
  ): AstNode;
  updateBindingElement(
    node: BindingElement,
    dotDotDotToken: unknown,
    propertyName: unknown,
    name: AstNode,
    initializer: AstNode,
  ): AstNode;
  updatePropertyDeclaration(
    node: PropertyDeclaration,
    modifiers: unknown,
    name: PropertyName,
    postfixToken: unknown,
    typeNode: unknown,
    initializer: AstNode,
  ): AstNode;
  updateBinaryExpression(
    node: BinaryExpression,
    modifiers: unknown,
    left: AstNode,
    typeNode: unknown,
    operator: unknown,
    right: AstNode,
  ): AstNode;
  updateExportAssignment(
    node: ExportAssignment,
    modifiers: unknown,
    isExportEquals: boolean,
    typeNode: unknown,
    expression: AstNode,
  ): AstNode;
  restoreOuterExpressions(original: AstNode, inner: AstNode, kinds: number): AstNode;
}

const OEK = { All: 0 } as const;
const TokenFlags = { None: 0 } as const;
