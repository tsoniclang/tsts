/**
 * Shared utilities for TypeScript-specific transformer passes.
 *
 * Port of TS-Go `internal/transformers/tstransforms/utilities.go`
 * (~29 LoC). Provides `constantExpression`, which converts a runtime
 * constant value (string or JS number) into the corresponding
 * literal/identifier AST node. Used by the runtime-syntax transformer
 * to emit enum member values.
 *
 * Cross-module deps forward-declared at file end.
 */

import type { Node as AstNode, Expression } from "../../ast/index.js";
import { Number as JsNumber } from "../../jsnum/jsnum.js";

export function constantExpression(value: unknown, factory: NodeFactory): Expression | undefined {
  if (typeof value === "string") {
    return factory.newStringLiteral(value, TokenFlags.None);
  }
  if (value instanceof JsNumber) {
    if (value.isInf()) {
      if (value.gt(JsNumber.zero())) {
        return factory.newIdentifier("Infinity") as unknown as Expression;
      }
      return factory.newPrefixUnaryExpression(
        Kind.MinusToken,
        factory.newIdentifier("Infinity") as unknown as Expression,
      );
    }
    if (value.isNaN()) {
      return factory.newIdentifier("NaN") as unknown as Expression;
    }
    if (value.lt(JsNumber.zero())) {
      const positive = constantExpression(value.negate(), factory);
      if (positive === undefined) return undefined;
      return factory.newPrefixUnaryExpression(Kind.MinusToken, positive);
    }
    return factory.newNumericLiteral(value.toString(), TokenFlags.None);
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface NodeFactory {
  newStringLiteral(text: string, flags: number): Expression;
  newNumericLiteral(text: string, flags: number): Expression;
  newIdentifier(text: string): AstNode;
  newPrefixUnaryExpression(operator: number, operand: Expression): Expression;
}

declare const Kind: {
  MinusToken: number;
};

declare const TokenFlags: {
  None: number;
};
