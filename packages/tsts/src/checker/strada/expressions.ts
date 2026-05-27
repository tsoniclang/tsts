/**
 * Expression-level check functions.
 *
 * Each function returns a Type for the expression — visited
 * recursively through CheckerOps.checkExpression which dispatches
 * by Kind.
 *
 * Ported from Strada `checker.go` checkExpression family. Per-kind
 * inference rules below are conservative; the full type system
 * lands incrementally.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

const ANY: Type = { flags: 1 << 0 } as unknown as Type;
const STRING: Type = { flags: 1 << 2 } as unknown as Type;
const NUMBER: Type = { flags: 1 << 3 } as unknown as Type;
const BOOLEAN: Type = { flags: 1 << 4 } as unknown as Type;
const BIGINT: Type = { flags: 1 << 6 } as unknown as Type;
const UNDEFINED: Type = { flags: 1 << 15 } as unknown as Type;
const NULL: Type = { flags: 1 << 16 } as unknown as Type;
const NEVER: Type = { flags: 1 << 17 } as unknown as Type;
const ESSYMBOL: Type = { flags: 1 << 12 } as unknown as Type;
const VOID: Type = { flags: 1 << 14 } as unknown as Type;
const OBJECT: Type = { flags: 1 << 19 } as unknown as Type;

export function checkExpressionWorker(c: CheckerOps, node: AstNode, checkMode: number): Type {
  const k = (node as { kind?: number }).kind;
  switch (k) {
    case Kind.Identifier: return c.checkIdentifier(node);
    case Kind.StringLiteral: return { flags: 1 << 7, value: (node as unknown as { text?: string }).text } as unknown as Type;
    case Kind.NoSubstitutionTemplateLiteral: return STRING;
    case Kind.NumericLiteral: return { flags: 1 << 8, value: Number((node as unknown as { text?: string }).text ?? "0") } as unknown as Type;
    case Kind.BigIntLiteral: return BIGINT;
    case Kind.TrueKeyword: return { flags: 1 << 9, intrinsicName: "true" } as unknown as Type;
    case Kind.FalseKeyword: return { flags: 1 << 9, intrinsicName: "false" } as unknown as Type;
    case Kind.NullKeyword: return NULL;
    case Kind.UndefinedKeyword: return UNDEFINED;
    case Kind.ThisKeyword: return ANY;
    case Kind.SuperKeyword: return ANY;
    case Kind.RegularExpressionLiteral: return OBJECT;

    case Kind.BinaryExpression: return c.checkBinaryExpression(node, checkMode);
    case Kind.ConditionalExpression: return c.checkConditionalExpression(node, checkMode);
    case Kind.CallExpression: return c.checkCallExpression(node, checkMode);
    case Kind.NewExpression: return checkNewExpression(c, node);
    case Kind.ObjectLiteralExpression: return c.checkObjectLiteral(node, checkMode);
    case Kind.ArrayLiteralExpression: return c.checkArrayLiteral(node, checkMode, false);

    case Kind.PropertyAccessExpression: return checkPropertyAccessExpression(c, node);
    case Kind.ElementAccessExpression: return checkElementAccessExpression(c, node);

    case Kind.ParenthesizedExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr !== undefined ? c.checkExpression(expr) : ANY;
    }
    case Kind.AsExpression:
    case Kind.SatisfiesExpression:
    case Kind.TypeAssertionExpression: {
      const t = (node as unknown as { type?: AstNode }).type;
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
      return t !== undefined ? c.getTypeFromTypeNode(t) : ANY;
    }
    case Kind.NonNullExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr === undefined) return ANY;
      return c.getNonOptionalType(c.checkExpression(expr));
    }
    case Kind.PrefixUnaryExpression: return checkPrefixUnary(c, node);
    case Kind.PostfixUnaryExpression: return checkPostfixUnary(c, node);
    case Kind.AwaitExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr !== undefined ? c.checkExpression(expr) : ANY;
    }
    case Kind.YieldExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
      return ANY;
    }
    case Kind.VoidExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
      return UNDEFINED;
    }
    case Kind.DeleteExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
      return BOOLEAN;
    }
    case Kind.TypeOfExpression: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
      return STRING;
    }
    case Kind.SpreadElement: {
      const expr = (node as unknown as { expression?: AstNode }).expression;
      return expr !== undefined ? c.checkExpression(expr) : ANY;
    }
    case Kind.TemplateExpression: {
      const spans = (node as unknown as { templateSpans?: { nodes?: readonly AstNode[] } }).templateSpans?.nodes;
      if (spans !== undefined) for (const s of spans) {
        const e = (s as unknown as { expression?: AstNode }).expression;
        if (e !== undefined) c.checkExpression(e);
      }
      return STRING;
    }
    case Kind.TaggedTemplateExpression: {
      const tag = (node as unknown as { tag?: AstNode }).tag;
      if (tag !== undefined) c.checkExpression(tag);
      return ANY;
    }
    case Kind.ArrowFunction:
    case Kind.FunctionExpression: {
      const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
      if (params !== undefined) for (const p of params) c.checkParameter(p);
      const body = (node as unknown as { body?: AstNode }).body;
      if (body !== undefined) c.checkSourceElement(body);
      return OBJECT;
    }
    case Kind.ClassExpression:
      c.checkClassExpressionDeferred(node);
      return OBJECT;
    case Kind.JsxElement:
    case Kind.JsxSelfClosingElement:
    case Kind.JsxFragment:
      return c.checkJsxElement?.(node) ?? OBJECT;
    default:
      return ANY;
  }
  void NEVER; void ESSYMBOL; void VOID;
}

function checkNewExpression(c: CheckerOps, node: AstNode): Type {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
  const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
  if (args !== undefined) for (const a of args) c.checkExpression(a);
  return OBJECT;
}

function checkPropertyAccessExpression(c: CheckerOps, node: AstNode): Type {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return ANY;
  const objectType = c.checkExpression(expr);
  const name = (node as unknown as { name?: { text?: string } }).name?.text;
  if (name === undefined) return ANY;
  const t = c.getTypeOfPropertyOfType(objectType, name);
  return t ?? ANY;
}

function checkElementAccessExpression(c: CheckerOps, node: AstNode): Type {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  const arg = (node as unknown as { argumentExpression?: AstNode }).argumentExpression;
  if (expr !== undefined) c.checkExpression(expr);
  if (arg !== undefined) c.checkExpression(arg);
  return ANY;
}

function checkPrefixUnary(c: CheckerOps, node: AstNode): Type {
  const operand = (node as unknown as { operand?: AstNode }).operand;
  if (operand === undefined) return ANY;
  const opType = c.checkExpression(operand);
  const op = (node as unknown as { operator?: number }).operator;
  switch (op) {
    case 54 /* ExclamationToken */: return BOOLEAN;
    case 41 /* PlusToken */:
    case 40 /* MinusToken */:
    case 56 /* TildeToken */:
    case 47 /* PlusPlusToken */:
    case 48 /* MinusMinusToken */:
      return NUMBER;
    default:
      return opType;
  }
}

function checkPostfixUnary(c: CheckerOps, node: AstNode): Type {
  const operand = (node as unknown as { operand?: AstNode }).operand;
  if (operand !== undefined) c.checkExpression(operand);
  return NUMBER;
}

export function checkBinaryLikeExpression(c: CheckerOps, left: AstNode, operator: number, right: AstNode): Type {
  const leftType = c.checkExpression(left);
  const rightType = c.checkExpression(right);
  switch (operator) {
    case 41 /* PlusToken */: {
      const lf = (leftType as { flags?: number }).flags ?? 0;
      const rf = (rightType as { flags?: number }).flags ?? 0;
      // string + ? → string
      if ((lf & ((1 << 2) | (1 << 7))) !== 0 || (rf & ((1 << 2) | (1 << 7))) !== 0) return STRING;
      return NUMBER;
    }
    case 40 /* MinusToken */:
    case 42 /* AsteriskToken */:
    case 43 /* AsteriskAsteriskToken */:
    case 44 /* SlashToken */:
    case 45 /* PercentToken */:
    case 51 /* LessThanLessThanToken */:
    case 52 /* GreaterThanGreaterThanToken */:
    case 53 /* GreaterThanGreaterThanGreaterThanToken */:
    case 55 /* AmpersandToken */:
    case 56 /* BarToken */:
    case 57 /* CaretToken */:
      return NUMBER;
    case 31 /* LessThanToken */:
    case 32 /* GreaterThanToken */:
    case 33 /* LessThanEqualsToken */:
    case 34 /* GreaterThanEqualsToken */:
    case 35 /* EqualsEqualsToken */:
    case 36 /* ExclamationEqualsToken */:
    case 37 /* EqualsEqualsEqualsToken */:
    case 38 /* ExclamationEqualsEqualsToken */:
      return BOOLEAN;
    case 60 /* AmpersandAmpersandToken */:
    case 61 /* BarBarToken */:
    case 62 /* QuestionQuestionToken */:
      // Returns the union; without union construction we return right.
      return rightType;
    case 63 /* EqualsToken */:
      return rightType;
    default:
      // Compound assignment operators (+=, -=, …) return the right type.
      if (operator >= 64 && operator <= 78) return rightType;
      return ANY;
  }
}
