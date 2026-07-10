// Exact constant evaluation for TypeScript-side value signatures.

export function evaluateTypeScriptConstant(api, initializer, environment = new Map()) {
  if (!initializer) return undefined;
  while (initializer) {
    if (initializer.Kind === api.Kinds.KindAsExpression) {
      initializer = api.Casts.AsAsExpression(initializer)?.Expression;
      continue;
    }
    if (initializer.Kind === api.Kinds.KindTypeAssertionExpression) {
      initializer = api.Casts.AsTypeAssertion(initializer)?.Expression;
      continue;
    }
    if (initializer.Kind === api.Kinds.KindParenthesizedExpression) {
      initializer = api.Casts.AsParenthesizedExpression(initializer)?.Expression;
      continue;
    }
    if (initializer.Kind === api.Kinds.KindSatisfiesExpression) {
      initializer = api.Casts.AsSatisfiesExpression(initializer)?.Expression;
      continue;
    }
    break;
  }
  if (!initializer) return undefined;
  if (initializer.Kind === api.Kinds.KindStringLiteral || initializer.Kind === api.Kinds.KindNoSubstitutionTemplateLiteral) {
    return { kind: "string", value: initializer.Text };
  }
  if (initializer.Kind === api.Kinds.KindNumericLiteral || initializer.Kind === api.Kinds.KindBigIntLiteral) {
    return parseTypeScriptNumericConstant(String(initializer.Text));
  }
  if (initializer.Kind === api.Kinds.KindTrueKeyword) return { kind: "boolean", value: true };
  if (initializer.Kind === api.Kinds.KindFalseKeyword) return { kind: "boolean", value: false };
  if (initializer.Kind === api.Kinds.KindIdentifier) return environment.get(initializer.Text);
  if (initializer.Kind === api.Kinds.KindPropertyAccessExpression) {
    const expression = api.Casts.AsPropertyAccessExpression(initializer);
    const receiver = expression?.Expression;
    const name = expression?.Name?.Text;
    if (receiver?.Kind === api.Kinds.KindIdentifier && name !== undefined) {
      return environment.get(`${receiver.Text}.${name}`);
    }
    return undefined;
  }
  if (initializer.Kind === api.Kinds.KindPrefixUnaryExpression) {
    const expression = api.Casts.AsPrefixUnaryExpression(initializer);
    const operand = evaluateTypeScriptConstant(api, expression?.Operand, environment);
    return applyTypeScriptUnaryConstant(api.kindName.get(expression?.Operator), operand);
  }
  if (initializer.Kind === api.Kinds.KindBinaryExpression) {
    const expression = api.Casts.AsBinaryExpression(initializer);
    const left = evaluateTypeScriptConstant(api, expression?.Left, environment);
    const right = evaluateTypeScriptConstant(api, expression?.Right, environment);
    return applyTypeScriptBinaryConstant(api.kindName.get(expression?.OperatorToken?.Kind), left, right);
  }
  return undefined;
}

export function canonicalTypeScriptConstantValue(value) {
  if (value === undefined) return undefined;
  if (value.kind === "number") return { kind: "number", value: rationalText(value.numerator, value.denominator) };
  return value;
}

function parseTypeScriptNumericConstant(text) {
  const source = text.replaceAll("_", "").replace(/n$/, "");
  if (/^0[xX][0-9a-fA-F]+$/.test(source) || /^0[bB][01]+$/.test(source) || /^0[oO][0-7]+$/.test(source)) {
    return numericConstant(BigInt(source), 1n);
  }
  const match = /^(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(source);
  if (match === null || (match[1] === "" && match[2] === "")) return undefined;
  const fraction = match[2] ?? "";
  const digits = `${match[1] || "0"}${fraction}`;
  const exponent = Number(match[3] ?? "0") - fraction.length;
  if (!Number.isSafeInteger(exponent)) return undefined;
  return exponent >= 0
    ? numericConstant(BigInt(digits || "0") * (10n ** BigInt(exponent)), 1n)
    : numericConstant(BigInt(digits || "0"), 10n ** BigInt(-exponent));
}

function numericConstant(numerator, denominator) {
  if (denominator === 0n) return undefined;
  if (denominator < 0n) return numericConstant(-numerator, -denominator);
  const divisor = bigintGcd(numerator, denominator);
  return { kind: "number", numerator: numerator / divisor, denominator: denominator / divisor };
}

function applyTypeScriptUnaryConstant(operator, operand) {
  if (operand === undefined) return undefined;
  if (operator === "KindExclamationToken" && operand.kind === "boolean") return { kind: "boolean", value: !operand.value };
  if (operand.kind !== "number") return undefined;
  if (operator === "KindPlusToken") return operand;
  if (operator === "KindMinusToken") return numericConstant(-operand.numerator, operand.denominator);
  if (operator === "KindTildeToken" && operand.denominator === 1n) {
    return numericConstant(BigInt.asIntN(32, ~BigInt.asIntN(32, operand.numerator)), 1n);
  }
  return undefined;
}

function applyTypeScriptBinaryConstant(operator, left, right) {
  if (left === undefined || right === undefined) return undefined;
  if (operator === "KindPlusToken" && left.kind === "string" && right.kind === "string") {
    return { kind: "string", value: left.value + right.value };
  }
  if (operator === "KindAmpersandAmpersandToken" && left.kind === "boolean" && right.kind === "boolean") {
    return { kind: "boolean", value: left.value && right.value };
  }
  if (operator === "KindBarBarToken" && left.kind === "boolean" && right.kind === "boolean") {
    return { kind: "boolean", value: left.value || right.value };
  }
  if (left.kind !== "number" || right.kind !== "number") return undefined;
  switch (operator) {
    case "KindPlusToken": return numericConstant(left.numerator * right.denominator + right.numerator * left.denominator, left.denominator * right.denominator);
    case "KindMinusToken": return numericConstant(left.numerator * right.denominator - right.numerator * left.denominator, left.denominator * right.denominator);
    case "KindAsteriskToken": return numericConstant(left.numerator * right.numerator, left.denominator * right.denominator);
    case "KindSlashToken": return numericConstant(left.numerator * right.denominator, left.denominator * right.numerator);
    case "KindPercentToken":
      if (left.denominator === 1n && right.denominator === 1n) return numericConstant(left.numerator % right.numerator, 1n);
      return undefined;
    case "KindAsteriskAsteriskToken":
      if (right.denominator === 1n && right.numerator >= 0n && right.numerator <= 1024n) {
        return numericConstant(left.numerator ** right.numerator, left.denominator ** right.numerator);
      }
      return undefined;
    case "KindLessThanLessThanToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asIntN(32, a << BigInt(Number(b & 31n))));
    case "KindGreaterThanGreaterThanToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asIntN(32, a) >> BigInt(Number(b & 31n)));
    case "KindGreaterThanGreaterThanGreaterThanToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asUintN(32, a) >> BigInt(Number(b & 31n)));
    case "KindAmpersandToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asIntN(32, a) & BigInt.asIntN(32, b));
    case "KindBarToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asIntN(32, a) | BigInt.asIntN(32, b));
    case "KindCaretToken": return applyTypeScriptBitwise(left, right, (a, b) => BigInt.asIntN(32, a) ^ BigInt.asIntN(32, b));
    default: return undefined;
  }
}

function applyTypeScriptBitwise(left, right, operation) {
  if (left.denominator !== 1n || right.denominator !== 1n) return undefined;
  return numericConstant(operation(left.numerator, right.numerator), 1n);
}

function rationalText(numerator, denominator) {
  return denominator === 1n ? String(numerator) : `${numerator}/${denominator}`;
}

function bigintGcd(left, right) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) [a, b] = [b, a % b];
  return a === 0n ? 1n : a;
}
