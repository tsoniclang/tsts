// Demand-driven constant evaluation using JavaScript's exact primitive semantics.

export function evaluateTypeScriptConstant(api, initializer, environment = new Map()) {
  if (!initializer) return undefined;
  while (initializer) {
    if (initializer.Kind === api.Kinds.KindAsExpression) initializer = api.Casts.AsAsExpression(initializer)?.Expression;
    else if (initializer.Kind === api.Kinds.KindTypeAssertionExpression) initializer = api.Casts.AsTypeAssertion(initializer)?.Expression;
    else if (initializer.Kind === api.Kinds.KindParenthesizedExpression) initializer = api.Casts.AsParenthesizedExpression(initializer)?.Expression;
    else if (initializer.Kind === api.Kinds.KindSatisfiesExpression) initializer = api.Casts.AsSatisfiesExpression(initializer)?.Expression;
    else break;
  }
  if (!initializer) return undefined;
  const K = api.Kinds;
  if (initializer.Kind === K.KindStringLiteral || initializer.Kind === K.KindNoSubstitutionTemplateLiteral) return constant("string", initializer.Text);
  if (initializer.Kind === K.KindNumericLiteral) return parseNumber(String(initializer.Text));
  if (initializer.Kind === K.KindBigIntLiteral) return parseBigInt(String(initializer.Text));
  if (initializer.Kind === K.KindTrueKeyword) return constant("boolean", true);
  if (initializer.Kind === K.KindFalseKeyword) return constant("boolean", false);
  if (initializer.Kind === K.KindIdentifier) return environment.get(initializer.Text);
  if (initializer.Kind === K.KindPropertyAccessExpression) {
    const path = propertyAccessPath(api, initializer);
    return path === undefined ? undefined : environment.get(path);
  }
  if (initializer.Kind === K.KindPrefixUnaryExpression) {
    const expression = api.Casts.AsPrefixUnaryExpression(initializer);
    return applyUnary(api.kindName.get(expression?.Operator), evaluateTypeScriptConstant(api, expression?.Operand, environment));
  }
  if (initializer.Kind === K.KindBinaryExpression) {
    const expression = api.Casts.AsBinaryExpression(initializer);
    return applyBinary(
      api.kindName.get(expression?.OperatorToken?.Kind),
      evaluateTypeScriptConstant(api, expression?.Left, environment),
      evaluateTypeScriptConstant(api, expression?.Right, environment),
    );
  }
  return undefined;
}

function propertyAccessPath(api, node) {
  if (node?.Kind === api.Kinds.KindIdentifier) return node.Text;
  if (node?.Kind !== api.Kinds.KindPropertyAccessExpression) return undefined;
  const expression = api.Casts.AsPropertyAccessExpression(node);
  const receiver = propertyAccessPath(api, expression?.Expression);
  return receiver === undefined || expression?.Name?.Text === undefined ? undefined : `${receiver}.${expression.Name.Text}`;
}

export function canonicalTypeScriptConstantValue(value) {
  if (value === undefined) return undefined;
  if (value.kind === "number") return { kind: "number", value: numberText(value.value) };
  if (value.kind === "bigint") return { kind: "bigint", value: String(value.value) };
  return { kind: value.kind, value: value.value };
}

function parseNumber(text) {
  const value = Number(text.replaceAll("_", ""));
  return Number.isNaN(value) ? undefined : constant("number", value);
}

function parseBigInt(text) {
  try {
    return constant("bigint", BigInt(text.replaceAll("_", "").replace(/n$/, "")));
  } catch {
    return undefined;
  }
}

function constant(kind, value) {
  return Object.freeze({ kind, value });
}

function applyUnary(operator, operand) {
  if (operand === undefined) return undefined;
  if (operator === "KindExclamationToken") return constant("boolean", !operand.value);
  if (operand.kind !== "number" && operand.kind !== "bigint") return undefined;
  if (operator === "KindPlusToken") return operand.kind === "bigint" ? undefined : constant("number", +operand.value);
  if (operator === "KindMinusToken") return constant(operand.kind, -operand.value);
  if (operator === "KindTildeToken") return constant(operand.kind, ~operand.value);
  return undefined;
}

function applyBinary(operator, left, right) {
  if (left === undefined || right === undefined) return undefined;
  if (operator === "KindPlusToken" && (left.kind === "string" || right.kind === "string")) {
    return constant("string", String(left.value) + String(right.value));
  }
  if (operator === "KindAmpersandAmpersandToken") return left.value ? right : left;
  if (operator === "KindBarBarToken") return left.value ? left : right;
  if ((left.kind !== "number" && left.kind !== "bigint") || left.kind !== right.kind) return undefined;
  try {
    const value = binaryValue(operator, left.value, right.value, left.kind);
    return value === undefined ? undefined : constant(left.kind, value);
  } catch {
    return undefined;
  }
}

function binaryValue(operator, left, right, kind) {
  switch (operator) {
    case "KindPlusToken": return left + right;
    case "KindMinusToken": return left - right;
    case "KindAsteriskToken": return left * right;
    case "KindSlashToken": return left / right;
    case "KindPercentToken": return left % right;
    case "KindAsteriskAsteriskToken": return left ** right;
    case "KindLessThanLessThanToken": return left << right;
    case "KindGreaterThanGreaterThanToken": return left >> right;
    case "KindGreaterThanGreaterThanGreaterThanToken": return kind === "bigint" ? undefined : left >>> right;
    case "KindAmpersandToken": return left & right;
    case "KindBarToken": return left | right;
    case "KindCaretToken": return left ^ right;
    default: return undefined;
  }
}

function numberText(value) {
  if (Object.is(value, -0)) return "-0";
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  return String(value);
}
