// Declaration-only constant evaluation with explicit success and failure states.

export function evaluateTypeScriptConstant(api, initializer, environment = new Map()) {
  if (initializer === undefined) return missingTypeScriptConstant("initializer is absent");
  return evaluateExpression(api, unwrapExpression(api, initializer), environment);
}

export function knownTypeScriptConstant(kind, value) {
  return Object.freeze({
    status: "known",
    value: constantValue(kind, value, "known TypeScript constant result"),
  });
}

export function missingTypeScriptConstant(reason) {
  assertNonEmptyText(reason, "missing TypeScript constant result", "reason");
  return Object.freeze({ status: "missing", reason });
}

export function unsupportedTypeScriptConstant(astKind, reason) {
  assertNonEmptyText(astKind, "unsupported TypeScript constant result", "astKind");
  assertNonEmptyText(reason, "unsupported TypeScript constant result", "reason");
  return Object.freeze({ status: "unsupported", astKind, reason });
}

export function canonicalTypeScriptConstantValue(evaluation) {
  assertConstantEvaluation(evaluation, "TypeScript constant evaluation");
  if (evaluation.status !== "known") return undefined;
  const value = evaluation.value;
  if (value.kind === "number") return { kind: "number", value: numberText(value.value) };
  if (value.kind === "bigint") return { kind: "bigint", value: String(value.value) };
  if (value.kind === "undefined") return { kind: "undefined" };
  return { kind: value.kind, value: value.value };
}

export function constantEvaluationIssue(evaluation) {
  assertConstantEvaluation(evaluation, "TypeScript constant evaluation");
  if (evaluation.status === "known") return undefined;
  if (evaluation.status === "missing") return evaluation.reason;
  return `${evaluation.astKind}: ${evaluation.reason}`;
}

function evaluateExpression(api, expression, environment) {
  if (expression === undefined) return unsupportedNode(api, expression, "expression wrapper has no operand");
  const K = api.Kinds;
  if (expression.Kind === K.KindStringLiteral || expression.Kind === K.KindNoSubstitutionTemplateLiteral) {
    return knownTypeScriptConstant("string", expression.Text);
  }
  if (expression.Kind === K.KindNumericLiteral) return parseNumber(api, expression);
  if (expression.Kind === K.KindBigIntLiteral) return parseBigInt(api, expression);
  if (expression.Kind === K.KindTrueKeyword) return knownTypeScriptConstant("boolean", true);
  if (expression.Kind === K.KindFalseKeyword) return knownTypeScriptConstant("boolean", false);
  if (expression.Kind === K.KindNullKeyword) return knownTypeScriptConstant("null", null);
  if (expression.Kind === K.KindIdentifier) return resolveReference(api, expression, expression.Text, environment);
  if (expression.Kind === K.KindPropertyAccessExpression) {
    const path = referencePath(api, expression);
    return path === undefined
      ? unsupportedNode(api, expression, "property access is not a declaration constant reference")
      : resolveReference(api, expression, path, environment);
  }
  if (expression.Kind === K.KindElementAccessExpression) return evaluateElementAccess(api, expression, environment);
  if (expression.Kind === K.KindTemplateExpression) return evaluateTemplate(api, expression, environment);
  if (expression.Kind === K.KindConditionalExpression) return evaluateConditional(api, expression, environment);
  if (expression.Kind === K.KindPrefixUnaryExpression) return evaluateUnary(api, expression, environment);
  if (expression.Kind === K.KindBinaryExpression) return evaluateBinary(api, expression, environment);
  return unsupportedNode(api, expression, "expression kind is outside the pure declaration-constant grammar");
}

function unwrapExpression(api, node) {
  while (node !== undefined) {
    if (node.Kind === api.Kinds.KindAsExpression) node = api.Casts.AsAsExpression(node)?.Expression;
    else if (node.Kind === api.Kinds.KindTypeAssertionExpression) node = api.Casts.AsTypeAssertion(node)?.Expression;
    else if (node.Kind === api.Kinds.KindParenthesizedExpression) node = api.Casts.AsParenthesizedExpression(node)?.Expression;
    else if (node.Kind === api.Kinds.KindSatisfiesExpression) node = api.Casts.AsSatisfiesExpression(node)?.Expression;
    else if (node.Kind === api.Kinds.KindNonNullExpression) node = api.Casts.AsNonNullExpression(node)?.Expression;
    else break;
  }
  return node;
}

function evaluateElementAccess(api, node, environment) {
  const access = api.Casts.AsElementAccessExpression(node);
  const receiver = referencePath(api, access?.Expression);
  if (receiver === undefined) return unsupportedNode(api, node, "element-access receiver is not a declaration constant reference");
  const key = evaluateExpression(api, unwrapExpression(api, access?.ArgumentExpression), environment);
  if (key.status !== "known") return key;
  if (!new Set(["string", "number", "bigint"]).has(key.value.kind)) {
    return unsupportedNode(api, access?.ArgumentExpression, `element-access key has unsupported ${key.value.kind} value`);
  }
  return resolveReference(api, node, `${receiver}.${String(key.value.value)}`, environment);
}

function evaluateTemplate(api, node, environment) {
  const template = api.Casts.AsTemplateExpression(node);
  let text = template?.Head?.Text ?? "";
  for (const span of template?.TemplateSpans?.Nodes ?? []) {
    const value = evaluateExpression(api, unwrapExpression(api, span.Expression), environment);
    if (value.status !== "known") return value;
    text += String(value.value.value);
    text += span.Literal?.Text ?? "";
  }
  return knownTypeScriptConstant("string", text);
}

function evaluateConditional(api, node, environment) {
  const conditional = api.Casts.AsConditionalExpression(node);
  const condition = evaluateExpression(api, unwrapExpression(api, conditional?.Condition), environment);
  if (condition.status !== "known") return condition;
  const selected = truthy(condition.value) ? conditional?.WhenTrue : conditional?.WhenFalse;
  return evaluateExpression(api, unwrapExpression(api, selected), environment);
}

function evaluateUnary(api, node, environment) {
  const expression = api.Casts.AsPrefixUnaryExpression(node);
  const operand = evaluateExpression(api, unwrapExpression(api, expression?.Operand), environment);
  if (operand.status !== "known") return operand;
  const operator = api.kindName.get(expression?.Operator);
  try {
    switch (operator) {
      case "KindExclamationToken": return knownTypeScriptConstant("boolean", !truthy(operand.value));
      case "KindPlusToken": return knownPrimitiveConstant(+operand.value.value);
      case "KindMinusToken": return knownPrimitiveConstant(-operand.value.value);
      case "KindTildeToken": return knownPrimitiveConstant(~operand.value.value);
      default: return unsupportedNode(api, node, `unsupported unary operator ${operator ?? "<unknown>"}`);
    }
  } catch (error) {
    return unsupportedNode(api, node, `unary operation is not a valid primitive constant: ${errorMessage(error)}`);
  }
}

function evaluateBinary(api, node, environment) {
  const expression = api.Casts.AsBinaryExpression(node);
  const operator = api.kindName.get(expression?.OperatorToken?.Kind);
  const left = evaluateExpression(api, unwrapExpression(api, expression?.Left), environment);
  if (left.status !== "known") return left;
  if (operator === "KindAmpersandAmpersandToken" && !truthy(left.value)) return left;
  if (operator === "KindBarBarToken" && truthy(left.value)) return left;
  if (operator === "KindQuestionQuestionToken" && !nullish(left.value)) return left;
  const right = evaluateExpression(api, unwrapExpression(api, expression?.Right), environment);
  if (right.status !== "known") return right;
  if (operator === "KindAmpersandAmpersandToken" || operator === "KindBarBarToken" || operator === "KindQuestionQuestionToken") return right;
  try {
    return applyPrimitiveBinary(api, node, operator, left.value.value, right.value.value);
  } catch (error) {
    return unsupportedNode(api, node, `binary operation is not a valid primitive constant: ${errorMessage(error)}`);
  }
}

function applyPrimitiveBinary(api, node, operator, left, right) {
  let value;
  switch (operator) {
    case "KindPlusToken": value = left + right; break;
    case "KindMinusToken": value = left - right; break;
    case "KindAsteriskToken": value = left * right; break;
    case "KindSlashToken": value = left / right; break;
    case "KindPercentToken": value = left % right; break;
    case "KindAsteriskAsteriskToken": value = left ** right; break;
    case "KindLessThanLessThanToken": value = left << right; break;
    case "KindGreaterThanGreaterThanToken": value = left >> right; break;
    case "KindGreaterThanGreaterThanGreaterThanToken": value = left >>> right; break;
    case "KindAmpersandToken": value = left & right; break;
    case "KindBarToken": value = left | right; break;
    case "KindCaretToken": value = left ^ right; break;
    case "KindEqualsEqualsToken": value = left == right; break;
    case "KindExclamationEqualsToken": value = left != right; break;
    case "KindEqualsEqualsEqualsToken": value = left === right; break;
    case "KindExclamationEqualsEqualsToken": value = left !== right; break;
    case "KindLessThanToken": value = left < right; break;
    case "KindLessThanEqualsToken": value = left <= right; break;
    case "KindGreaterThanToken": value = left > right; break;
    case "KindGreaterThanEqualsToken": value = left >= right; break;
    default: return unsupportedNode(api, node, `unsupported binary operator ${operator ?? "<unknown>"}`);
  }
  return knownPrimitiveConstant(value);
}

function resolveReference(api, node, path, environment) {
  const evaluation = environment.get(path);
  if (evaluation === undefined) return unsupportedNode(api, node, `unresolved declaration constant reference '${path}'`);
  assertConstantEvaluation(evaluation, `constant environment entry '${path}'`);
  return evaluation;
}

function referencePath(api, node) {
  node = unwrapExpression(api, node);
  if (node?.Kind === api.Kinds.KindIdentifier) return node.Text;
  if (node?.Kind !== api.Kinds.KindPropertyAccessExpression) return undefined;
  const expression = api.Casts.AsPropertyAccessExpression(node);
  const receiver = referencePath(api, expression?.Expression);
  return receiver === undefined || expression?.name?.Text === undefined ? undefined : `${receiver}.${expression.name.Text}`;
}

function parseNumber(api, node) {
  const value = Number(String(node.Text).replaceAll("_", ""));
  return Number.isNaN(value)
    ? unsupportedNode(api, node, `invalid numeric literal '${node.Text}'`)
    : knownTypeScriptConstant("number", value);
}

function parseBigInt(api, node) {
  try {
    return knownTypeScriptConstant("bigint", BigInt(String(node.Text).replaceAll("_", "").replace(/n$/, "")));
  } catch {
    return unsupportedNode(api, node, `invalid bigint literal '${node.Text}'`);
  }
}

function knownPrimitiveConstant(value) {
  if (value === null) return knownTypeScriptConstant("null", null);
  if (value === undefined) return knownTypeScriptConstant("undefined", undefined);
  const kind = typeof value;
  if (kind === "string" || kind === "number" || kind === "bigint" || kind === "boolean") {
    return knownTypeScriptConstant(kind, value);
  }
  throw new Error(`unsupported primitive result '${kind}'`);
}

function truthy(value) {
  return Boolean(value.value);
}

function nullish(value) {
  return value.kind === "null" || value.kind === "undefined";
}

function unsupportedNode(api, node, reason) {
  const astKind = node === undefined ? "<missing>" : api.kindName.get(node.Kind) ?? `kind${node.Kind}`;
  return unsupportedTypeScriptConstant(astKind, reason);
}

function assertConstantEvaluation(evaluation, context) {
  assertPlainRecord(evaluation, context);
  const status = ownDataValue(evaluation, "status", context);
  if (status === "known") {
    assertExactDataKeys(evaluation, ["status", "value"], context);
    assertConstantValue(ownDataValue(evaluation, "value", context), `${context}.value`);
    return;
  }
  if (status === "missing") {
    assertExactDataKeys(evaluation, ["status", "reason"], context);
    assertNonEmptyText(ownDataValue(evaluation, "reason", context), context, "reason");
    return;
  }
  if (status === "unsupported") {
    assertExactDataKeys(evaluation, ["status", "astKind", "reason"], context);
    assertNonEmptyText(ownDataValue(evaluation, "astKind", context), context, "astKind");
    assertNonEmptyText(ownDataValue(evaluation, "reason", context), context, "reason");
    return;
  }
  contractViolation(context, `status must be exactly 'known', 'missing', or 'unsupported', received ${valueText(status)}`);
}

function constantValue(kind, value, context) {
  assertConstantKindAndValue(kind, value, context);
  return Object.freeze({ kind, value });
}

function assertConstantValue(value, context) {
  assertExactDataKeys(value, ["kind", "value"], context);
  assertConstantKindAndValue(
    ownDataValue(value, "kind", context),
    ownDataValue(value, "value", context),
    context,
  );
}

function assertConstantKindAndValue(kind, value, context) {
  let valid;
  switch (kind) {
    case "string": valid = typeof value === "string"; break;
    case "number": valid = typeof value === "number"; break;
    case "bigint": valid = typeof value === "bigint"; break;
    case "boolean": valid = typeof value === "boolean"; break;
    case "null": valid = value === null; break;
    case "undefined": valid = value === undefined; break;
    default:
      contractViolation(context, `kind must be exactly 'string', 'number', 'bigint', 'boolean', 'null', or 'undefined', received ${valueText(kind)}`);
  }
  if (!valid) contractViolation(context, `kind '${kind}' has invalid ${valueText(value)} value`);
}

function assertExactDataKeys(value, expectedKeys, context) {
  assertPlainRecord(value, context);
  const actualKeys = Reflect.ownKeys(value);
  const exact = actualKeys.length === expectedKeys.length && expectedKeys.every((key) => actualKeys.includes(key));
  if (!exact) {
    contractViolation(context, `own keys must be exactly [${expectedKeys.join(", ")}], received [${actualKeys.map(keyText).join(", ")}]`);
  }
  for (const key of expectedKeys) ownDataValue(value, key, context);
}

function assertPlainRecord(value, context) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    contractViolation(context, `result must be a plain object, received ${valueText(value)}`);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    contractViolation(context, "result must use Object.prototype or a null prototype");
  }
}

function ownDataValue(value, key, context) {
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  if (descriptor === undefined || !("value" in descriptor)) {
    contractViolation(context, `'${key}' must be an own data property`);
  }
  return descriptor.value;
}

function assertNonEmptyText(value, context, key) {
  if (typeof value !== "string" || value.length === 0) {
    contractViolation(context, `'${key}' must be a non-empty string, received ${valueText(value)}`);
  }
}

function contractViolation(context, detail) {
  throw new Error(`${context} does not use the exact TypeScript constant-evaluation contract: ${detail}`);
}

function keyText(key) {
  return typeof key === "symbol" ? key.toString() : key;
}

function valueText(value) {
  if (typeof value === "string") return `'${value}'`;
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "symbol") return value.toString();
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function numberText(value) {
  if (Object.is(value, -0)) return "-0";
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "-Infinity";
  return String(value);
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
