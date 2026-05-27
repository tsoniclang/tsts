/**
 * Constant-expression evaluator for enum members and const-context types.
 *
 * Faithful port of TS-Go `internal/evaluator/evaluator.go` (168 LoC).
 *
 * The evaluator computes literal values for expressions during the
 * binder and checker passes. It returns a Result tagged with metadata
 * about whether the value originated syntactically as a string (for
 * template-literal type narrowing), whether evaluation crossed file
 * boundaries, and whether the value reaches into external references
 * (for isolatedModules diagnostics).
 *
 * Cross-module AST deps are forward-declared at the file end. Numeric
 * operations use JavaScript's native semantics, which match TC39 (and
 * therefore TS-Go's `jsnum.Number`).
 */

import { numberToString, fromString } from "../jsnum/string.js";
import type { Node as AstNode } from "../ast/index.js";
import {
  nodeText, skipOuterExpressions,
  unaryOperand as prefixUnaryExpressionOperand,
  prefixUnaryOperator as prefixUnaryExpressionOperator,
  binaryLeft as binaryExpressionLeft,
  binaryRight as binaryExpressionRight,
  binaryOperatorKind as binaryExpressionOperatorTokenKind,
} from "../ast/index.js";
import { Kind } from "../ast/index.js";

function memberAccessExpression(node: AstNode): AstNode {
  return (node as unknown as { expression: AstNode }).expression;
}
function isEntityNameExpression(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  const k = (node as { kind?: number }).kind;
  return k === Kind.Identifier || k === Kind.PropertyAccessExpression;
}
function templateExpressionHead(node: AstNode): AstNode {
  return (node as unknown as { head: AstNode }).head;
}
function templateExpressionSpans(node: AstNode): readonly AstNode[] {
  const spans = (node as unknown as { templateSpans?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).templateSpans;
  if (spans === undefined) return [];
  const inner = (spans as { nodes?: readonly AstNode[] }).nodes;
  return inner ?? (spans as readonly AstNode[]);
}
function templateSpanExpression(span: AstNode): AstNode {
  return (span as unknown as { expression: AstNode }).expression;
}
function templateSpanLiteral(span: AstNode): AstNode {
  return (span as unknown as { literal: AstNode }).literal;
}

export interface EvaluatorResult {
  readonly value: string | number | boolean | bigint | undefined;
  readonly isSyntacticallyString: boolean;
  readonly resolvedOtherFiles: boolean;
  readonly hasExternalReferences: boolean;
}

export function newResult(
  value: EvaluatorResult["value"],
  isSyntacticallyString: boolean,
  resolvedOtherFiles: boolean,
  hasExternalReferences: boolean,
): EvaluatorResult {
  return { value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
}

export type Evaluator = (expr: AstNode, location: AstNode | undefined) => EvaluatorResult;

/**
 * Constructs an evaluator. The provided `evaluateEntity` callback
 * resolves identifiers and entity-name expressions back to their
 * declared values (typically by consulting the binder/checker).
 *
 * `outerExpressionsToSkip` is a bitmask of OuterExpressionKinds —
 * always includes `Parentheses` per upstream.
 */
export function newEvaluator(
  evaluateEntity: Evaluator,
  outerExpressionsToSkip: number,
): Evaluator {
  const skip = outerExpressionsToSkip | OuterExpressionKinds.Parentheses;

  const evaluate: Evaluator = (initialExpr, location) => {
    let isSyntacticallyString = false;
    let resolvedOtherFiles = false;
    let hasExternalReferences = false;
    const expr = skipOuterExpressions(initialExpr, skip);

    switch (expr.kind) {
      case Kind.PrefixUnaryExpression: {
        const operand = prefixUnaryExpressionOperand(expr);
        const operator = prefixUnaryExpressionOperator(expr);
        const result = evaluate(operand, location);
        resolvedOtherFiles = result.resolvedOtherFiles;
        hasExternalReferences = result.hasExternalReferences;
        if (typeof result.value === "number") {
          const value = result.value;
          switch (operator) {
            case Kind.PlusToken:
              return { value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.MinusToken:
              return { value: -value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.TildeToken:
              return { value: ~value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
          }
        }
        break;
      }
      case Kind.BinaryExpression: {
        const leftNode = binaryExpressionLeft(expr);
        const rightNode = binaryExpressionRight(expr);
        const operator = binaryExpressionOperatorTokenKind(expr);
        const left = evaluate(leftNode, location);
        const right = evaluate(rightNode, location);
        isSyntacticallyString = (left.isSyntacticallyString || right.isSyntacticallyString) && operator === Kind.PlusToken;
        resolvedOtherFiles = left.resolvedOtherFiles || right.resolvedOtherFiles;
        hasExternalReferences = left.hasExternalReferences || right.hasExternalReferences;
        const leftIsNum = typeof left.value === "number";
        const rightIsNum = typeof right.value === "number";
        if (leftIsNum && rightIsNum) {
          const a = left.value as number;
          const b = right.value as number;
          switch (operator) {
            case Kind.BarToken:
              return { value: (a | 0) | (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.AmpersandToken:
              return { value: (a | 0) & (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.GreaterThanGreaterThanToken:
              return { value: (a | 0) >> (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.GreaterThanGreaterThanGreaterThanToken:
              return { value: (a | 0) >>> (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.LessThanLessThanToken:
              return { value: (a | 0) << (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.CaretToken:
              return { value: (a | 0) ^ (b | 0), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.AsteriskToken:
              return { value: a * b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.SlashToken:
              return { value: a / b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.PlusToken:
              return { value: a + b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.MinusToken:
              return { value: a - b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.PercentToken:
              return { value: a % b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
            case Kind.AsteriskAsteriskToken:
              return { value: a ** b, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
          }
        }
        const leftIsStr = typeof left.value === "string";
        const rightIsStr = typeof right.value === "string";
        if ((leftIsStr || leftIsNum) && (rightIsStr || rightIsNum) && operator === Kind.PlusToken) {
          const ls = leftIsNum ? numberToString(left.value as number) : (left.value as string);
          const rs = rightIsNum ? numberToString(right.value as number) : (right.value as string);
          return { value: ls + rs, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
        }
        break;
      }
      case Kind.StringLiteral:
      case Kind.NoSubstitutionTemplateLiteral:
        return { value: nodeText(expr), isSyntacticallyString: true, resolvedOtherFiles: false, hasExternalReferences: false };
      case Kind.TemplateExpression:
        return evaluateTemplateExpression(expr, location, evaluate);
      case Kind.NumericLiteral:
        return { value: fromString(nodeText(expr)), isSyntacticallyString: false, resolvedOtherFiles: false, hasExternalReferences: false };
      case Kind.Identifier:
        return evaluateEntity(expr, location);
      case Kind.ElementAccessExpression:
      case Kind.PropertyAccessExpression:
        if (isEntityNameExpression(memberAccessExpression(expr))) {
          return evaluateEntity(expr, location);
        }
        break;
    }
    return { value: undefined, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
  };
  return evaluate;
}

function evaluateTemplateExpression(
  expr: AstNode,
  location: AstNode | undefined,
  evaluate: Evaluator,
): EvaluatorResult {
  let s = nodeText(templateExpressionHead(expr));
  let resolvedOtherFiles = false;
  let hasExternalReferences = false;
  for (const span of templateExpressionSpans(expr)) {
    const spanResult = evaluate(templateSpanExpression(span), location);
    if (spanResult.value === undefined) {
      return { value: undefined, isSyntacticallyString: true, resolvedOtherFiles: false, hasExternalReferences: false };
    }
    s += anyToString(spanResult.value);
    s += nodeText(templateSpanLiteral(span));
    resolvedOtherFiles = resolvedOtherFiles || spanResult.resolvedOtherFiles;
    hasExternalReferences = hasExternalReferences || spanResult.hasExternalReferences;
  }
  return { value: s, isSyntacticallyString: true, resolvedOtherFiles, hasExternalReferences };
}

export function anyToString(v: EvaluatorResult["value"]): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return numberToString(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "bigint") return v.toString();
  throw new Error("Unhandled case in anyToString");
}

export function isTruthy(v: EvaluatorResult["value"]): boolean {
  if (typeof v === "string") return v.length !== 0;
  if (typeof v === "number") return v !== 0 && !Number.isNaN(v);
  if (typeof v === "boolean") return v;
  if (typeof v === "bigint") return v !== 0n;
  throw new Error("Unhandled case in isTruthy");
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module AST surface
// ---------------------------------------------------------------------------

const OuterExpressionKinds = { Parentheses: 1 << 0 } as const;
// Strada-specific accessors not yet wired to ast/index.js.
