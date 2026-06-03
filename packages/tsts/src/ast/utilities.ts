// utilities.ts — Hand-written, additive AST utility functions.
//
// Faithful 1:1 port of the pure/additive helpers in
// microsoft/typescript-go internal/ast/utilities.go. These mirror the
// upstream algorithms exactly (names, structure, branches) and depend only
// on AST kind/flag/modifier state that is already present in the port.
//
// Functions whose upstream equivalents already exist as generated kind-based
// type guards in ./generated/is.ts (e.g. isAccessExpression, isForInOrOfStatement,
// isPropertyNameLiteral, isAssertionExpression, isJsxChild) are NOT redefined
// here; import them from "./generated/is.js" instead.

import { Kind } from "./generated/kind.js";
import type { int } from "@tsonic/core/types.js";
import { NodeFlags } from "./flags.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import type {
  Node,
  TextRange,
} from "./generated/types.js";
import type {
  AccessorDeclaration,
  BinaryExpression,
  BindingElement,
  ExpressionStatement,
  ForInStatement,
  ForOfStatement,
  GetAccessorDeclaration,
  Identifier,
  ImportSpecifier,
  JsxNamespacedName,
  LabeledStatement,
  LiteralTypeNode,
  MetaProperty,
  ModifiersBase,
  ParenthesizedExpression,
  ParenthesizedTypeNode,
  PartiallyEmittedExpression,
  PostfixUnaryExpression,
  PrefixUnaryExpression,
  ModifierLike,
  PropertyAccessExpression,
  PropertyAssignment,
  QualifiedName,
  SetAccessorDeclaration,
  ShorthandPropertyAssignment,
} from "./generated/nodes.js";
import {
  isArrowFunction,
  isBinaryExpression,
  isCallExpression,
  isCatchClause,
  isClassStaticBlockDeclaration,
  isClassElement,
  isElementAccessExpression,
  isExportSpecifier,
  isForInStatement,
  isForOfStatement,
  isFunctionExpression,
  isFunctionLikeDeclaration,
  isIdentifier,
  isImportSpecifier,
  isImportTypeNode,
  isJsxNamespacedName,
  isLeftHandSideExpression,
  isLiteralTypeNode,
  isModuleDeclaration,
  isNonNullExpression,
  isNumericLiteral,
  isParameterDeclaration,
  isParenthesizedTypeNode,
  isPartiallyEmittedExpression,
  isPrivateIdentifier,
  isExpressionStatement,
  isPropertyAccessExpression,
  isPropertyDeclaration,
  isSourceFile,
  isStringLiteral,
  isVariableDeclaration,
  isVoidExpression,
} from "./generated/is.js";
// `isStringOrNumericLiteralLike` (utilities.go:331 IsStringOrNumericLiteralLike)
// and `isExternalModule` (utilities.go:1626 IsExternalModule) live in
// accessors.ts as the single owners; imported here for faithful reuse.
import { isExternalModule, isStringOrNumericLiteralLike, nodeName, tagName } from "./accessors.js";

function sameReference(left: unknown, right: unknown): boolean {
  return left === right;
}

const nodeFlagOptionalChain: int = 1 << 5;

// ─────────────────────────────────────────────────────────────────────────────
// Internal typed accessors mirroring upstream polymorphic *Node accessors.
// These narrow to the exact set of kinds the upstream accessor handles, so we
// can read the field directly via a checked downcast (mirrors node.AsXxx()).
// ─────────────────────────────────────────────────────────────────────────────

// Mirrors n.ModifierFlags() (ast.go:601) → Modifiers().ModifierFlags. tsgo
// computes the modifier flags eagerly on the modifier LIST at parse time
// (NewModifierList → ModifiersToFlags(nodes)); the tsts AST instead carries a
// node-level `modifierFlags` cache that the parser leaves unset. To stay faithful
// to Node.ModifierFlags() this reads the cache when present (fast path) and
// otherwise computes the flags from the modifier list directly, exactly as
// tsgo's ModifiersToFlags would. Returns None when the node has no modifiers.
function modifierStorage(node: Node): ModifiersBase | undefined {
  switch (node.kind) {
    case Kind.TypeParameter:
    case Kind.Parameter:
    case Kind.PropertySignature:
    case Kind.PropertyDeclaration:
    case Kind.MethodSignature:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.IndexSignature:
    case Kind.ClassStaticBlockDeclaration:
    case Kind.BinaryExpression:
    case Kind.FunctionType:
    case Kind.ConstructorType:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.ClassExpression:
    case Kind.VariableStatement:
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportAssignment:
    case Kind.NamespaceExportDeclaration:
    case Kind.ExportDeclaration:
      return node as ModifiersBase;
  }
  return undefined;
}

function nodeModifierFlags(node: Node): ModifierFlags {
  const carrier = modifierStorage(node);
  if (carrier === undefined) return ModifierFlags.None;
  const cached = carrier.modifierFlags;
  if (typeof cached === "number") {
    return cached as ModifierFlags;
  }
  const modifiers = carrier.modifiers;
  return modifiers === undefined ? ModifierFlags.None : modifierLikesToFlags(modifiers);
}

// Mirrors getQuestionDotToken / the QuestionDotToken() accessor for the kinds
// that participate in an optional chain.
function optionalChainQuestionDotToken(node: Node): Node | undefined {
  if (isPropertyAccessExpression(node)) {
    return node.questionDotToken;
  }
  if (isElementAccessExpression(node)) {
    return node.questionDotToken;
  }
  if (isCallExpression(node)) {
    return node.questionDotToken;
  }
  return undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Missing / synthesized
// ─────────────────────────────────────────────────────────────────────────────

// Determines if a node is missing (either nil or empty).
export function nodeIsMissing(node: Node | undefined): boolean {
  return node === undefined || node.pos === node.end && node.pos >= 0 && node.kind !== Kind.EndOfFile;
}

// Determines if a node is present.
export function nodeIsPresent(node: Node | undefined): boolean {
  return !nodeIsMissing(node);
}

// Determines if a node contains synthetic positions.
export function nodeIsSynthesized(node: Node): boolean {
  return positionIsSynthesized(node.pos) || positionIsSynthesized(node.end);
}

export function rangeIsSynthesized(loc: TextRange): boolean {
  return positionIsSynthesized(loc.pos) || positionIsSynthesized(loc.end);
}

// Determines whether a position is synthetic.
export function positionIsSynthesized(pos: int): boolean {
  return pos < 0;
}

export function nodeKindIs(node: Node, ...kinds: readonly Kind[]): boolean {
  return kinds.includes(node.kind);
}

// ─────────────────────────────────────────────────────────────────────────────
// Assignment helpers
// ─────────────────────────────────────────────────────────────────────────────

function isAssignmentOperator(token: Kind): boolean {
  return token >= Kind.FirstAssignment && token <= Kind.LastAssignment;
}

export function isCompoundAssignment(token: Kind): boolean {
  return token >= Kind.FirstCompoundAssignment && token <= Kind.LastCompoundAssignment;
}

export function isAssignmentExpression(node: Node, excludeCompoundAssignment: boolean): boolean {
  if (node.kind === Kind.BinaryExpression) {
    const expr = node as BinaryExpression;
    return (expr.operatorToken.kind === Kind.EqualsToken || !excludeCompoundAssignment && isAssignmentOperator(expr.operatorToken.kind))
      && isLeftHandSideExpression(expr.left);
  }
  return false;
}

export function getRightMostAssignedExpression(node: Node): Node {
  let current = node;
  while (isAssignmentExpression(current, /*excludeCompoundAssignment*/ false)) {
    current = (current as BinaryExpression).right;
  }
  return current;
}

export function isObjectBindingOrAssignmentElement(node: Node): boolean {
  switch (node.kind) {
    case Kind.BindingElement:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.SpreadAssignment:
      return true;
  }
  return false;
}

export function isArrayBindingOrAssignmentElement(node: Node): boolean {
  switch (node.kind) {
    case Kind.BindingElement:
    case Kind.OmittedExpression:
    case Kind.SpreadElement:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.Identifier:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
      return true;
  }
  return isAssignmentExpression(node, /*excludeCompoundAssignment*/ true);
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
export function isAssignmentTarget(node: Node): boolean {
  return getAssignmentTarget(node) !== undefined;
}

// Returns the BinaryExpression, PrefixUnaryExpression, PostfixUnaryExpression, or ForInOrOfStatement that references
// the given node as an assignment target.
export function getAssignmentTarget(node: Node): Node | undefined {
  let current = node;
  for (;;) {
    const parent = current.parent;
    switch (parent.kind) {
      case Kind.BinaryExpression: {
        const binary = parent as BinaryExpression;
        if (isAssignmentOperator(binary.operatorToken.kind) && binary.left === current) {
          return parent;
        }
        return undefined;
      }
      case Kind.PrefixUnaryExpression: {
        const prefix = parent as PrefixUnaryExpression;
        if (prefix.operator === Kind.PlusPlusToken || prefix.operator === Kind.MinusMinusToken) {
          return parent;
        }
        return undefined;
      }
      case Kind.PostfixUnaryExpression: {
        const postfix = parent as PostfixUnaryExpression;
        if (postfix.operator === Kind.PlusPlusToken || postfix.operator === Kind.MinusMinusToken) {
          return parent;
        }
        return undefined;
      }
      case Kind.ForInStatement:
      case Kind.ForOfStatement: {
        const initializer = isForInStatement(parent)
          ? (parent as ForInStatement).initializer
          : (parent as ForOfStatement).initializer;
        if (sameReference(initializer, current)) {
          return parent;
        }
        return undefined;
      }
      case Kind.ParenthesizedExpression:
      case Kind.ArrayLiteralExpression:
      case Kind.SpreadElement:
      case Kind.NonNullExpression:
        current = parent;
        break;
      case Kind.SpreadAssignment:
        current = parent.parent;
        break;
      case Kind.ShorthandPropertyAssignment: {
        const shorthand = parent as ShorthandPropertyAssignment;
        if (!sameReference(shorthand.name, current)) {
          return undefined;
        }
        current = parent.parent;
        break;
      }
      case Kind.PropertyAssignment: {
        const property = parent as PropertyAssignment;
        if (sameReference(property.name, current)) {
          return undefined;
        }
        current = parent.parent;
        break;
      }
      default:
        return undefined;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Logical / coalescing
// ─────────────────────────────────────────────────────────────────────────────

export function isLogicalBinaryOperator(token: Kind): boolean {
  return token === Kind.BarBarToken || token === Kind.AmpersandAmpersandToken;
}

export function isLogicalOrCoalescingBinaryOperator(token: Kind): boolean {
  return isLogicalBinaryOperator(token) || token === Kind.QuestionQuestionToken;
}

function isLogicalOrCoalescingBinaryExpression(expr: Node): boolean {
  return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind);
}

// IsLogicalOrCoalescingAssignmentOperator (ast_generated.go:9878).
export function isLogicalOrCoalescingAssignmentOperator(token: Kind): boolean {
  switch (token) {
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return true;
  }
  return false;
}

// IsLogicalOrCoalescingAssignmentExpression (utilities.go:240).
export function isLogicalOrCoalescingAssignmentExpression(expr: Node): boolean {
  return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
}

export function isLogicalExpression(node: Node): boolean {
  let current = node;
  for (;;) {
    if (current.kind === Kind.ParenthesizedExpression) {
      current = (current as ParenthesizedExpression).expression;
    } else if (current.kind === Kind.PrefixUnaryExpression && (current as PrefixUnaryExpression).operator === Kind.ExclamationToken) {
      current = (current as PrefixUnaryExpression).operand;
    } else {
      return isLogicalOrCoalescingBinaryExpression(current);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Literals
// ─────────────────────────────────────────────────────────────────────────────

export function isSignedNumericLiteral(node: Node): boolean {
  if (node.kind === Kind.PrefixUnaryExpression) {
    const unary = node as PrefixUnaryExpression;
    return (unary.operator === Kind.PlusToken || unary.operator === Kind.MinusToken) && isNumericLiteral(unary.operand);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Optional chains
// ─────────────────────────────────────────────────────────────────────────────

// Determines if a node is part of an OptionalChain.
export function isOptionalChain(node: Node): boolean {
  if ((node.flags & nodeFlagOptionalChain) !== 0) {
    switch (node.kind) {
      case Kind.PropertyAccessExpression:
      case Kind.ElementAccessExpression:
      case Kind.CallExpression:
      case Kind.NonNullExpression:
        return true;
    }
  }
  return false;
}

// Determines if node is the root expression of an OptionalChain.
export function isOptionalChainRoot(node: Node): boolean {
  return isOptionalChain(node) && !isNonNullExpression(node) && optionalChainQuestionDotToken(node) !== undefined;
}

// Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`.
export function isOutermostOptionalChain(node: Node): boolean {
  const parent = node.parent;
  return !isOptionalChain(parent) // cases 1, 2, and 3
    || isOptionalChainRoot(parent) // case 4
    || node !== optionalChainExpression(parent); // case 5
}

// Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
export function isExpressionOfOptionalChainRoot(node: Node): boolean {
  return isOptionalChainRoot(node.parent) && optionalChainExpression(node.parent) === node;
}

function optionalChainExpression(node: Node): Node | undefined {
  if (isPropertyAccessExpression(node)) return node.expression;
  if (isElementAccessExpression(node)) return node.expression;
  if (isCallExpression(node)) return node.expression;
  if (isNonNullExpression(node)) return node.expression;
  return undefined;
}

export function isNullishCoalesce(node: Node): boolean {
  return node.kind === Kind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === Kind.QuestionQuestionToken;
}

// ─────────────────────────────────────────────────────────────────────────────
// Comma
// ─────────────────────────────────────────────────────────────────────────────

export function isCommaExpression(node: Node): boolean {
  return node.kind === Kind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === Kind.CommaToken;
}

export function isCommaSequence(node: Node): boolean {
  return isCommaExpression(node);
}

// ─────────────────────────────────────────────────────────────────────────────
// JSX tag-name structural equivalence
// ─────────────────────────────────────────────────────────────────────────────

// Faithful 1:1 port of tsgo ast.TagNamesAreEquivalent (ast/utilities.go ~4400).
// STRUCTURAL compare of two JSX tag-name expressions — NOT a stringification /
// name-text heuristic. Used by the parser's JSX closing-tag mismatch check and the
// mismatch restructure. Compares exactly the tsgo-compared forms: Identifier text,
// `this` keyword (KeywordExpression with Kind.ThisKeyword), PropertyAccessExpression
// (name text + recursive expression), and JsxNamespacedName (namespace + name text).
export function tagNamesAreEquivalent(lhs: Node, rhs: Node): boolean {
  if (lhs.kind !== rhs.kind) {
    return false;
  }
  if (isIdentifier(lhs) && isIdentifier(rhs)) {
    return lhs.text === rhs.text;
  }
  if (lhs.kind === Kind.ThisKeyword && rhs.kind === Kind.ThisKeyword) {
    return true;
  }
  if (isJsxNamespacedName(lhs) && isJsxNamespacedName(rhs)) {
    return lhs.namespace.text === rhs.namespace.text && lhs.name.text === rhs.name.text;
  }
  if (isPropertyAccessExpression(lhs) && isPropertyAccessExpression(rhs)) {
    return lhs.name.text === rhs.name.text
      && tagNamesAreEquivalent(lhs.expression, rhs.expression);
  }
  // tsgo panic("Unhandled case in TagNamesAreEquivalent"). A JsxTagNameExpression
  // is only ever one of the four forms above; any other kind is an internal
  // invariant violation (the faithful panic-equivalent is a thrown Error).
  throw new Error("Unhandled case in tagNamesAreEquivalent");
}

// ─────────────────────────────────────────────────────────────────────────────
// Iteration statements
// ─────────────────────────────────────────────────────────────────────────────

export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): boolean {
  switch (node.kind) {
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.DoStatement:
    case Kind.WhileStatement:
      return true;
    case Kind.LabeledStatement:
      return lookInLabeledStatements && isIterationStatement((node as LabeledStatement).statement, lookInLabeledStatements);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Function- / class-like grouping
// ─────────────────────────────────────────────────────────────────────────────

function isFunctionLikeKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.JSDocSignature:
    case Kind.ConstructSignature:
    case Kind.IndexSignature:
    case Kind.FunctionType:
    case Kind.ConstructorType:
      return true;
  }
  return isFunctionLikeDeclarationKind(kind);
}

function isFunctionLikeDeclarationKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.FunctionDeclaration:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
      return true;
  }
  return false;
}

// Determines if a node is function- or signature-like. Exported (mirrors
// ast.IsFunctionLike) so the binder's GetContainerFlags can classify a Block by
// the kind of its parent.
export function isFunctionLike(node: Node | undefined): boolean {
  return node !== undefined && isFunctionLikeKind(node.kind);
}

export function isFunctionOrSourceFile(node: Node): boolean {
  return isFunctionLike(node) || isSourceFile(node);
}

export function isClassOrInterfaceLike(node: Node): boolean {
  return node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression || node.kind === Kind.InterfaceDeclaration;
}

export function isMethodOrAccessor(node: Node): boolean {
  switch (node.kind) {
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      return true;
  }
  return false;
}

export function isObjectLiteralOrClassExpressionMethodOrAccessor(node: Node): boolean {
  const kind = node.kind;
  return (kind === Kind.MethodDeclaration || kind === Kind.GetAccessor || kind === Kind.SetAccessor)
    && (node.parent.kind === Kind.ObjectLiteralExpression || node.parent.kind === Kind.ClassExpression);
}

export function isAutoAccessorPropertyDeclaration(node: Node): boolean {
  return isPropertyDeclaration(node) && hasAccessorModifier(node);
}

export function isParameterPropertyDeclaration(node: Node, parent: Node): boolean {
  return isParameterDeclaration(node) && hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier) && parent.kind === Kind.Constructor;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blocks
// ─────────────────────────────────────────────────────────────────────────────

// Determines whether a node is the Block-like body of a function by walking the parent of the node.
export function isFunctionBlock(node: Node | undefined): boolean {
  return node !== undefined && node.kind === Kind.Block && node.parent !== undefined && isFunctionLike(node.parent);
}

export function isFunctionOrModuleBlock(node: Node): boolean {
  return isSourceFile(node) || node.kind === Kind.ModuleBlock || node.kind === Kind.Block && isFunctionLike(node.parent);
}

// ─────────────────────────────────────────────────────────────────────────────
// Prologue directives
// ─────────────────────────────────────────────────────────────────────────────

export function isPrologueDirective(node: Node): boolean {
  return node.kind === Kind.ExpressionStatement
    && expressionStatementExpressionKind(node) === Kind.StringLiteral;
}

function expressionStatementExpressionKind(node: Node): Kind | undefined {
  return isExpressionStatement(node) ? (node as ExpressionStatement).expression.kind : undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Parenthesized walks
// ─────────────────────────────────────────────────────────────────────────────

export function skipTypeParentheses(node: Node): Node {
  let current = node;
  while (isParenthesizedTypeNode(current)) {
    current = (current as ParenthesizedTypeNode).type;
  }
  return current;
}

// Walks up the parents of a parenthesized expression to find the containing node.
export function walkUpParenthesizedExpressions(node: Node | undefined): Node | undefined {
  let current = node;
  while (current !== undefined && current.kind === Kind.ParenthesizedExpression) {
    current = current.parent;
  }
  return current;
}

// Walks up the parents of a parenthesized type to find the containing node.
export function walkUpParenthesizedTypes(node: Node | undefined): Node | undefined {
  let current = node;
  while (current !== undefined && current.kind === Kind.ParenthesizedType) {
    current = current.parent;
  }
  return current;
}

// ─────────────────────────────────────────────────────────────────────────────
// Modifiers
// ─────────────────────────────────────────────────────────────────────────────

export function modifierToFlag(token: Kind): ModifierFlags {
  switch (token) {
    case Kind.StaticKeyword:
      return ModifierFlags.Static;
    case Kind.PublicKeyword:
      return ModifierFlags.Public;
    case Kind.ProtectedKeyword:
      return ModifierFlags.Protected;
    case Kind.PrivateKeyword:
      return ModifierFlags.Private;
    case Kind.AbstractKeyword:
      return ModifierFlags.Abstract;
    case Kind.AccessorKeyword:
      return ModifierFlags.Accessor;
    case Kind.ExportKeyword:
      return ModifierFlags.Export;
    case Kind.DeclareKeyword:
      return ModifierFlags.Ambient;
    case Kind.ConstKeyword:
      return ModifierFlags.Const;
    case Kind.DefaultKeyword:
      return ModifierFlags.Default;
    case Kind.AsyncKeyword:
      return ModifierFlags.Async;
    case Kind.ReadonlyKeyword:
      return ModifierFlags.Readonly;
    case Kind.OverrideKeyword:
      return ModifierFlags.Override;
    case Kind.InKeyword:
      return ModifierFlags.In;
    case Kind.OutKeyword:
      return ModifierFlags.Out;
    case Kind.Decorator:
      return ModifierFlags.Decorator;
  }
  return ModifierFlags.None;
}

function modifierLikesToFlags(modifiers: readonly ModifierLike[]): ModifierFlags {
  let flags = ModifierFlags.None;
  for (const modifier of modifiers) {
    flags |= modifierToFlag(modifier.kind);
  }
  return flags;
}

export function modifiersToFlags(modifiers: readonly Node[]): ModifierFlags {
  let flags = ModifierFlags.None;
  for (const modifier of modifiers) {
    flags |= modifierToFlag(modifier.kind);
  }
  return flags;
}

export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
  return (nodeModifierFlags(node) & flags) !== 0;
}

export function hasAccessorModifier(node: Node): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Accessor);
}

export function hasStaticModifier(node: Node): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Static);
}

export function isStatic(node: Node): boolean {
  // https://tc39.es/ecma262/#sec-static-semantics-isstatic
  return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
}

// ─────────────────────────────────────────────────────────────────────────────
// CanHave… predicates
// ─────────────────────────────────────────────────────────────────────────────

export function canHaveIllegalDecorators(node: Node): boolean {
  switch (node.kind) {
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.FunctionDeclaration:
    case Kind.Constructor:
    case Kind.IndexSignature:
    case Kind.ClassStaticBlockDeclaration:
    case Kind.MissingDeclaration:
    case Kind.VariableStatement:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.NamespaceExportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      return true;
  }
  return false;
}

export function canHaveIllegalModifiers(node: Node): boolean {
  switch (node.kind) {
    case Kind.ClassStaticBlockDeclaration:
    case Kind.PropertyAssignment:
    case Kind.ShorthandPropertyAssignment:
    case Kind.MissingDeclaration:
    case Kind.NamespaceExportDeclaration:
      return true;
  }
  return false;
}

export function canHaveModifiers(node: Node): boolean {
  switch (node.kind) {
    case Kind.TypeParameter:
    case Kind.Parameter:
    case Kind.PropertySignature:
    case Kind.PropertyDeclaration:
    case Kind.MethodSignature:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.IndexSignature:
    case Kind.ConstructorType:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.ClassExpression:
    case Kind.VariableStatement:
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportAssignment:
    case Kind.ExportDeclaration:
      return true;
  }
  return false;
}

export function canHaveDecorators(node: Node): boolean {
  switch (node.kind) {
    case Kind.Parameter:
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ClassExpression:
    case Kind.ClassDeclaration:
      return true;
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Declaration root / combined flags (binder support)
// ─────────────────────────────────────────────────────────────────────────────

// GetRootDeclaration (utilities.go:1139) — climbs binding-element nesting to the
// owning VariableDeclaration / ParameterDeclaration.
export function getRootDeclaration(node: Node): Node {
  let current = node;
  while (current.kind === Kind.BindingElement) {
    current = current.parent.parent;
  }
  return current;
}

// getCombinedFlags (utilities.go:1146) specialized for NodeFlags — ORs the flags
// of a VariableDeclaration with its enclosing VariableDeclarationList and
// VariableStatement so `let`/`const`/`using` (carried on the list/statement) are
// visible from the declaration node. Relies on parent pointers being set, which
// the binder establishes in its traversal before descending.
export function getCombinedNodeFlags(node: Node): NodeFlags {
  let current: Node | undefined = getRootDeclaration(node);
  let flags = current.flags as NodeFlags;
  if (current.kind === Kind.VariableDeclaration) {
    current = current.parent;
  }
  if (current !== undefined && current.kind === Kind.VariableDeclarationList) {
    flags |= current.flags as NodeFlags;
    current = current.parent;
  }
  if (current !== undefined && current.kind === Kind.VariableStatement) {
    flags |= current.flags as NodeFlags;
  }
  return flags;
}

// GetCombinedModifierFlags (utilities.go:1162) — the modifier-flag specialization
// of getCombinedFlags: ORs a VariableDeclaration's modifier flags with those of
// its enclosing VariableDeclarationList and VariableStatement so an
// `export const x` (modifier on the statement) is visible from the declaration.
// Mirrors getCombinedNodeFlags above; relies on parent pointers (set by the binder
// traversal before descending). Used by the binder's declareModuleMember.
export function getCombinedModifierFlags(node: Node): ModifierFlags {
  let current: Node | undefined = getRootDeclaration(node);
  let flags = nodeModifierFlags(current);
  if (current.kind === Kind.VariableDeclaration) {
    current = current.parent;
  }
  if (current !== undefined && current.kind === Kind.VariableDeclarationList) {
    flags |= nodeModifierFlags(current);
    current = current.parent;
  }
  if (current !== undefined && current.kind === Kind.VariableStatement) {
    flags |= nodeModifierFlags(current);
  }
  return flags;
}

// IsEntityNameExpression (utilities.go:1580) — an identifier or a property-access
// chain whose name is an identifier and whose head is itself an entity-name
// expression. Used by ExpressionIsAlias (binder bindExportAssignment).
export function isEntityNameExpression(node: Node): boolean {
  return isEntityNameExpressionEx(node, /*allowJS*/ false);
}

// IsEntityNameExpressionEx (utilities.go:1584).
export function isEntityNameExpressionEx(node: Node, allowJS: boolean): boolean {
  return isIdentifier(node)
    || isPropertyAccessEntityNameExpression(node, allowJS)
    || allowJS && (node.kind === Kind.ThisKeyword || isElementAccessEntityNameExpression(node, allowJS));
}

// IsPropertyAccessEntityNameExpression (utilities.go:1590).
function isPropertyAccessEntityNameExpression(node: Node, allowJS: boolean): boolean {
  return isPropertyAccessExpression(node)
    && isIdentifier(node.name)
    && isEntityNameExpressionEx(node.expression, allowJS);
}

// isElementAccessEntityNameExpression (utilities.go:1594).
function isElementAccessEntityNameExpression(node: Node, allowJS: boolean): boolean {
  return isElementAccessExpression(node)
    && isStringOrNumericLiteralLike(node.argumentExpression)
    && isEntityNameExpressionEx(node.expression, allowJS);
}

// IsDottedName (utilities.go:1598).
export function isDottedName(node: Node): boolean {
  switch (node.kind) {
    case Kind.Identifier:
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.MetaProperty:
      return true;
    case Kind.PropertyAccessExpression:
      return isDottedName((node as PropertyAccessExpression).expression);
    case Kind.ParenthesizedExpression:
      return isDottedName((node as ParenthesizedExpression).expression);
  }
  return false;
}

// HasSamePropertyAccessName (utilities.go:1608).
export function hasSamePropertyAccessName(node1: Node, node2: Node): boolean {
  if (node1.kind === Kind.Identifier && node2.kind === Kind.Identifier) {
    return (node1 as Identifier).text === (node2 as Identifier).text;
  } else if (node1.kind === Kind.PropertyAccessExpression && node2.kind === Kind.PropertyAccessExpression) {
    const a = node1 as PropertyAccessExpression;
    const b = node2 as PropertyAccessExpression;
    return (a.name as Identifier).text === (b.name as Identifier).text
      && hasSamePropertyAccessName(a.expression, b.expression);
  }
  return false;
}

// IsCatchClauseVariableDeclarationOrBindingElement (utilities.go:721).
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Node): boolean {
  const node = getRootDeclaration(declaration);
  return isVariableDeclaration(node) && node.parent !== undefined && isCatchClause(node.parent);
}

// IsBlockOrCatchScoped (utilities.go:717).
export function isBlockOrCatchScoped(declaration: Node): boolean {
  return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0
    || isCatchClauseVariableDeclarationOrBindingElement(declaration);
}

// IsPartOfParameterDeclaration (utilities.go:1736).
export function isPartOfParameterDeclaration(node: Node): boolean {
  return getRootDeclaration(node).kind === Kind.Parameter;
}

// IsAccessor (utilities.go:256).
export function isAccessor(node: Node): boolean {
  return node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor;
}

// ─────────────────────────────────────────────────────────────────────────────
// CanHave… predicates (continued)
// ─────────────────────────────────────────────────────────────────────────────

// CanHaveSymbol (utilities.go:1019).
export function canHaveSymbol(node: Node): boolean {
  switch (node.kind) {
    case Kind.ArrowFunction:
    case Kind.BinaryExpression:
    case Kind.BindingElement:
    case Kind.CallExpression:
    case Kind.CallSignature:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.ClassStaticBlockDeclaration:
    case Kind.Constructor:
    case Kind.ConstructorType:
    case Kind.ConstructSignature:
    case Kind.ElementAccessExpression:
    case Kind.EnumDeclaration:
    case Kind.EnumMember:
    case Kind.ExportAssignment:
    case Kind.ExportDeclaration:
    case Kind.ExportSpecifier:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.FunctionType:
    case Kind.GetAccessor:
    case Kind.ImportClause:
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportSpecifier:
    case Kind.IndexSignature:
    case Kind.InterfaceDeclaration:
    case Kind.JSTypeAliasDeclaration:
    case Kind.JsxAttribute:
    case Kind.JsxAttributes:
    case Kind.JsxSpreadAttribute:
    case Kind.MappedType:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.ModuleDeclaration:
    case Kind.NamedTupleMember:
    case Kind.NamespaceExport:
    case Kind.NamespaceExportDeclaration:
    case Kind.NamespaceImport:
    case Kind.NewExpression:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.NumericLiteral:
    case Kind.ObjectLiteralExpression:
    case Kind.Parameter:
    case Kind.PropertyAccessExpression:
    case Kind.PropertyAssignment:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.SetAccessor:
    case Kind.ShorthandPropertyAssignment:
    case Kind.SourceFile:
    case Kind.SpreadAssignment:
    case Kind.StringLiteral:
    case Kind.TypeAliasDeclaration:
    case Kind.TypeLiteral:
    case Kind.TypeParameter:
    case Kind.VariableDeclaration:
      return true;
  }
  return false;
}

// Node.CanHaveStatements (ast.go:592).
export function canHaveStatements(node: Node): boolean {
  switch (node.kind) {
    case Kind.SourceFile:
    case Kind.Block:
    case Kind.ModuleBlock:
    case Kind.CaseClause:
    case Kind.DefaultClause:
      return true;
    default:
      return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Access kind (read / write / read-write)
// ─────────────────────────────────────────────────────────────────────────────

// AccessKind (ast.go:1503-1509).
export type AccessKind = number;

export const AccessKind = {
  Read: 0, // Only reads from a variable
  Write: 1, // Only writes to a variable without ever reading it. E.g.: `x=1;`.
  ReadWrite: 2, // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
} as const;

// accessKind (ast.go:1430).
function accessKind(node: Node): AccessKind {
  const parent = node.parent;
  if (parent === undefined) {
    return AccessKind.Read;
  }
  switch (parent.kind) {
    case Kind.ParenthesizedExpression:
      return accessKind(parent);
    case Kind.PrefixUnaryExpression: {
      const operator = (parent as PrefixUnaryExpression).operator;
      if (operator === Kind.PlusPlusToken || operator === Kind.MinusMinusToken) {
        return AccessKind.ReadWrite;
      }
      return AccessKind.Read;
    }
    case Kind.PostfixUnaryExpression: {
      const operator = (parent as PostfixUnaryExpression).operator;
      if (operator === Kind.PlusPlusToken || operator === Kind.MinusMinusToken) {
        return AccessKind.ReadWrite;
      }
      return AccessKind.Read;
    }
    case Kind.BinaryExpression:
      if ((parent as BinaryExpression).left === node) {
        const operator = (parent as BinaryExpression).operatorToken;
        if (isAssignmentOperator(operator.kind)) {
          if (operator.kind === Kind.EqualsToken) {
            return AccessKind.Write;
          }
          return AccessKind.ReadWrite;
        }
      }
      return AccessKind.Read;
    case Kind.PropertyAccessExpression:
      if ((parent as PropertyAccessExpression).name !== node) {
        return AccessKind.Read;
      }
      return accessKind(parent);
    case Kind.PropertyAssignment: {
      const parentAccess = accessKind(parent.parent);
      // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
      if (node === (parent as PropertyAssignment).name) {
        return reverseAccessKind(parentAccess);
      }
      return parentAccess;
    }
    case Kind.ShorthandPropertyAssignment:
      // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
      if (node === (parent as ShorthandPropertyAssignment).objectAssignmentInitializer) {
        return AccessKind.Read;
      }
      return accessKind(parent.parent);
    case Kind.ArrayLiteralExpression:
      return accessKind(parent);
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
      if (node === (parent as ForInStatement | ForOfStatement).initializer) {
        return AccessKind.Write;
      }
      return AccessKind.Read;
    default:
      return AccessKind.Read;
  }
}

// reverseAccessKind (ast.go:1491).
function reverseAccessKind(a: AccessKind): AccessKind {
  switch (a) {
    case AccessKind.Read:
      return AccessKind.Write;
    case AccessKind.Write:
      return AccessKind.Read;
    case AccessKind.ReadWrite:
      return AccessKind.ReadWrite;
  }
  throw new Error("Unhandled case in reverseAccessKind");
}

// IsWriteOnlyAccess (ast.go:1268).
export function isWriteOnlyAccess(node: Node): boolean {
  return accessKind(node) === AccessKind.Write;
}

// IsWriteAccess (ast.go:1272).
export function isWriteAccess(node: Node): boolean {
  return accessKind(node) !== AccessKind.Read;
}

// ─────────────────────────────────────────────────────────────────────────────
// Accessor declarations
// ─────────────────────────────────────────────────────────────────────────────

// AllAccessorDeclarations (utilities.go:4321).
export interface AllAccessorDeclarations {
  firstAccessor: AccessorDeclaration | undefined;
  secondAccessor: AccessorDeclaration | undefined;
  setAccessor: SetAccessorDeclaration | undefined;
  getAccessor: GetAccessorDeclaration | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// Identifier classification
// ─────────────────────────────────────────────────────────────────────────────

// IsIdentifierName (utilities.go:292) — true if the given identifier is
// classified as an IdentifierName by inspecting the parent of the node.
export function isIdentifierName(node: Node): boolean {
  const parent = node.parent;
  switch (parent.kind) {
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.EnumMember:
    case Kind.PropertyAssignment:
    case Kind.PropertyAccessExpression:
      return nodeName(parent) === node;
    case Kind.QualifiedName:
      return (parent as QualifiedName).right === node;
    case Kind.BindingElement:
      return (parent as BindingElement).propertyName === node;
    case Kind.ImportSpecifier:
      return (parent as ImportSpecifier).propertyName === node;
    case Kind.ExportSpecifier:
    case Kind.JsxAttribute:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxOpeningElement:
    case Kind.JsxClosingElement:
      return true;
  }
  return false;
}

// IsPushOrUnshiftIdentifier (utilities.go:310).
export function isPushOrUnshiftIdentifier(node: Node): boolean {
  const text = (node as Identifier).text;
  return text === "push" || text === "unshift";
}

// IsExportsIdentifier (utilities.go:1321).
export function isExportsIdentifier(node: Node): boolean {
  return isIdentifier(node) && node.text === "exports";
}

// IsModuleIdentifier (utilities.go:1325).
export function isModuleIdentifier(node: Node): boolean {
  return isIdentifier(node) && node.text === "module";
}

// IsThisIdentifier (utilities.go:1329).
export function isThisIdentifier(node: Node): boolean {
  return isIdentifier(node) && node.text === "this";
}

// IsImportMeta (utilities.go:1241).
export function isImportMeta(node: Node): boolean {
  if (node.kind === Kind.MetaProperty) {
    const meta = node as MetaProperty;
    return meta.keywordToken === Kind.ImportKeyword && meta.name.text === "meta";
  }
  return false;
}

// IsVoidZero (utilities.go:1317).
export function isVoidZero(node: Node): boolean {
  return isVoidExpression(node) && isNumericLiteral(node.expression) && node.expression.text === "0";
}

// ─────────────────────────────────────────────────────────────────────────────
// Expression / unary / left-hand-side classification (by kind)
// ─────────────────────────────────────────────────────────────────────────────

function isLeftHandSideExpressionKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.NewExpression:
    case Kind.CallExpression:
    case Kind.JsxElement:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxFragment:
    case Kind.TaggedTemplateExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ParenthesizedExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.ClassExpression:
    case Kind.FunctionExpression:
    case Kind.Identifier:
    case Kind.PrivateIdentifier:
    case Kind.RegularExpressionLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
    case Kind.FalseKeyword:
    case Kind.NullKeyword:
    case Kind.ThisKeyword:
    case Kind.TrueKeyword:
    case Kind.SuperKeyword:
    case Kind.NonNullExpression:
    case Kind.ExpressionWithTypeArguments:
    case Kind.MetaProperty:
    case Kind.ImportKeyword:
    case Kind.MissingDeclaration:
      return true;
  }
  return false;
}

function isUnaryExpressionKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.AwaitExpression:
    case Kind.TypeAssertionExpression:
      return true;
  }
  return isLeftHandSideExpressionKind(kind);
}

// Determines whether a node is a UnaryExpression based only on its kind.
export function isUnaryExpression(node: Node): boolean {
  return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isExpressionKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.ConditionalExpression:
    case Kind.YieldExpression:
    case Kind.ArrowFunction:
    case Kind.BinaryExpression:
    case Kind.SpreadElement:
    case Kind.AsExpression:
    case Kind.OmittedExpression:
    case Kind.PartiallyEmittedExpression:
    case Kind.SatisfiesExpression:
      return true;
  }
  return isUnaryExpressionKind(kind);
}

// Determines whether a node is an expression based only on its kind.
// (utilities.go:451 IsExpression). Named distinctly from the generated
// `isExpression` type guard to avoid a duplicate barrel export.
export function isExpressionNode(node: Node): boolean {
  return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

// SkipPartiallyEmittedExpressions (utilities.go:825).
export function skipPartiallyEmittedExpressions(node: Node): Node {
  let current = node;
  while (isPartiallyEmittedExpression(current)) {
    current = (current as PartiallyEmittedExpression).expression;
  }
  return current;
}

// ─────────────────────────────────────────────────────────────────────────────
// Function- / class- / object-literal members (continued)
// ─────────────────────────────────────────────────────────────────────────────

// IsFunctionLikeOrClassStaticBlockDeclaration (utilities.go:523).
export function isFunctionLikeOrClassStaticBlockDeclaration(node: Node | undefined): boolean {
  return node !== undefined && (isFunctionLike(node) || isClassStaticBlockDeclaration(node));
}

// IsClassLike (utilities.go:531).
export function isClassLike(node: Node): boolean {
  return node.kind === Kind.ClassDeclaration || node.kind === Kind.ClassExpression;
}

// IsPrivateIdentifierClassElementDeclaration (utilities.go:562).
export function isPrivateIdentifierClassElementDeclaration(node: Node): boolean {
  if (!(isPropertyDeclaration(node) || isMethodOrAccessor(node))) return false;
  const name = nodeName(node);
  return name !== undefined && isPrivateIdentifier(name);
}

// IsObjectLiteralMethod (utilities.go:600).
export function isObjectLiteralMethod(node: Node | undefined): boolean {
  return node !== undefined && node.kind === Kind.MethodDeclaration && node.parent.kind === Kind.ObjectLiteralExpression;
}

// ─────────────────────────────────────────────────────────────────────────────
// Statement / declaration classification (by kind)
// ─────────────────────────────────────────────────────────────────────────────

function isDeclarationStatementKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.FunctionDeclaration:
    case Kind.MissingDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.JSTypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ImportEqualsDeclaration:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
    case Kind.NamespaceExportDeclaration:
      return true;
  }
  return false;
}

// IsDeclarationStatement (utilities.go:653) — determines whether a node is a
// DeclarationStatement. (ECMA262 would call this a Declaration.)
export function isDeclarationStatement(node: Node): boolean {
  return isDeclarationStatementKind(node.kind);
}

function isStatementKindButNotDeclarationKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.BreakStatement:
    case Kind.ContinueStatement:
    case Kind.DebuggerStatement:
    case Kind.DoStatement:
    case Kind.ExpressionStatement:
    case Kind.EmptyStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.ForStatement:
    case Kind.IfStatement:
    case Kind.LabeledStatement:
    case Kind.ReturnStatement:
    case Kind.SwitchStatement:
    case Kind.ThrowStatement:
    case Kind.TryStatement:
    case Kind.VariableStatement:
    case Kind.WhileStatement:
    case Kind.WithStatement:
    case Kind.NotEmittedStatement:
      return true;
  }
  return false;
}

// IsStatementButNotDeclaration (utilities.go:687) — a Statement that is not also
// a Declaration. (ECMA262 would call this a Statement.)
export function isStatementButNotDeclaration(node: Node): boolean {
  return isStatementKindButNotDeclarationKind(node.kind);
}

// ─────────────────────────────────────────────────────────────────────────────
// Type-node / JSDoc classification (by kind)
// ─────────────────────────────────────────────────────────────────────────────

// IsTypeNodeKind (utilities.go:726).
export function isTypeNodeKind(kind: Kind): boolean {
  switch (kind) {
    case Kind.AnyKeyword:
    case Kind.UnknownKeyword:
    case Kind.NumberKeyword:
    case Kind.BigIntKeyword:
    case Kind.ObjectKeyword:
    case Kind.BooleanKeyword:
    case Kind.StringKeyword:
    case Kind.SymbolKeyword:
    case Kind.VoidKeyword:
    case Kind.UndefinedKeyword:
    case Kind.NeverKeyword:
    case Kind.IntrinsicKeyword:
    case Kind.ExpressionWithTypeArguments:
    case Kind.JSDocAllType:
    case Kind.JSDocNullableType:
    case Kind.JSDocNonNullableType:
    case Kind.JSDocOptionalType:
    case Kind.JSDocVariadicType:
      return true;
  }
  return kind >= Kind.FirstTypeNode && kind <= Kind.LastTypeNode;
}

// IsJSDocKind (utilities.go:755).
export function isJSDocKind(kind: Kind): boolean {
  return Kind.FirstJSDocNode <= kind && kind <= Kind.LastJSDocNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// Variable-declaration flavor (const / let / using) via combined node flags
// ─────────────────────────────────────────────────────────────────────────────

// IsVarAwaitUsing (utilities.go:1175) — whether a bound `VariableDeclaration` or
// `VariableDeclarationList` is part of an `await using` declaration.
export function isVarAwaitUsing(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.AwaitUsing;
}

// IsVarUsing (utilities.go:1180) — whether a bound declaration is part of a `using` declaration.
export function isVarUsing(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Using;
}

// IsVarConst (utilities.go:1223) — whether a bound declaration is part of a `const` declaration.
export function isVarConst(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Const;
}

// IsVarConstLike (utilities.go:1228) — whether a bound declaration is part of a
// `const`, `using`, or `await using` declaration.
export function isVarConstLike(node: Node): boolean {
  switch (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) {
    case NodeFlags.Const:
    case NodeFlags.Using:
    case NodeFlags.AwaitUsing:
      return true;
  }
  return false;
}

// IsVarLet (utilities.go:1237) — whether a bound declaration is part of a `let` declaration.
export function isVarLet(node: Node): boolean {
  return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Let;
}

// ─────────────────────────────────────────────────────────────────────────────
// Module / import / jsx structural predicates
// ─────────────────────────────────────────────────────────────────────────────

// IsFunctionExpressionOrArrowFunction (utilities.go:1117).
export function isFunctionExpressionOrArrowFunction(node: Node): boolean {
  return isFunctionExpression(node) || isArrowFunction(node);
}

// IsModuleOrEnumDeclaration (utilities.go:1296).
export function isModuleOrEnumDeclaration(node: Node): boolean {
  return node.kind === Kind.ModuleDeclaration || node.kind === Kind.EnumDeclaration;
}

// IsLiteralImportTypeNode (utilities.go:1300).
export function isLiteralImportTypeNode(node: Node): boolean {
  return isImportTypeNode(node)
    && isLiteralTypeNode(node.argument)
    && isStringLiteral((node.argument as LiteralTypeNode).literal);
}

// IsJsxTagName (utilities.go:1304).
export function isJsxTagName(node: Node): boolean {
  const parent = node.parent;
  switch (parent.kind) {
    case Kind.JsxOpeningElement:
    case Kind.JsxClosingElement:
    case Kind.JsxSelfClosingElement:
      return tagName(parent) === node;
  }
  return false;
}

// IsImportOrExportSpecifier (utilities.go:1313).
export function isImportOrExportSpecifier(node: Node): boolean {
  return isImportSpecifier(node) || isExportSpecifier(node);
}

// IsModuleWithStringLiteralName (utilities.go:1674).
export function isModuleWithStringLiteralName(node: Node): boolean {
  return isModuleDeclaration(node) && node.name.kind === Kind.StringLiteral;
}

// IsGlobalScopeAugmentation (utilities.go:1656).
export function isGlobalScopeAugmentation(node: Node): boolean {
  return isModuleDeclaration(node) && node.keyword === Kind.GlobalKeyword;
}

// IsAmbientModule (utilities.go:1618).
export function isAmbientModule(node: Node): boolean {
  return isModuleDeclaration(node)
    && (node.name.kind === Kind.StringLiteral || isGlobalScopeAugmentation(node));
}

// IsAmbientModuleSymbolName (utilities.go:1622).
export function isAmbientModuleSymbolName(s: string): boolean {
  return s.startsWith("\"") && s.endsWith("\"");
}

// IsModuleAugmentationExternal (utilities.go:1660) — an external module
// augmentation is an ambient module declaration that is either:
//   - defined in the top level scope and source file is an external module, or
//   - defined inside an ambient module declaration located in the top level
//     scope and source file is not an external module.
export function isModuleAugmentationExternal(node: Node): boolean {
  switch (node.parent.kind) {
    case Kind.SourceFile:
      return isExternalModule(node.parent);
    case Kind.ModuleBlock: {
      const grandParent = node.parent.parent;
      return isAmbientModule(grandParent)
        && isSourceFile(grandParent.parent)
        && !isExternalModule(grandParent.parent);
    }
  }
  return false;
}

// IsExternalModuleAugmentation (utilities.go:3533).
export function isExternalModuleAugmentation(node: Node): boolean {
  return isAmbientModule(node) && isModuleAugmentationExternal(node);
}
