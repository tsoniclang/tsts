import ts from "typescript";

export function analyzeTypeScriptReturnSemantics(ownerStatements, checker, statementBySymbol) {
  const paths = [];
  for (const statement of ownerStatements) {
    const callable = callableFromStatement(statement, undefined, checker);
    if (callable !== undefined) paths.push(...returnPathsFromCallable(callable, checker, statementBySymbol, new Set()));
  }
  return { paths };
}

export function analyzeExceptionSafeCleanup(statements) {
  let cleanupCalls = 0;
  let finallyBlocks = 0;
  for (const statement of statements) {
    const visit = (node) => {
      if (ts.isTryStatement(node) && node.finallyBlock !== undefined) {
        finallyBlocks++;
        cleanupCalls += countCalls(node.finallyBlock);
      }
      ts.forEachChild(node, visit);
    };
    visit(statement);
  }
  return { cleanupCalls, finallyBlocks };
}

function returnPathsFromCallable(callable, checker, statementBySymbol, stack) {
  if (stack.has(callable)) return [{ kind: "recursive-call" }];
  stack.add(callable);
  const paths = [];
  const body = callable.body;
  if (body !== undefined) {
    const visit = (node) => {
      if (node !== body && ts.isFunctionLike(node)) return;
      if (ts.isReturnStatement(node)) {
        if (node.expression === undefined) paths.push({ kind: "bare" });
        else paths.push(...expressionFacts(node.expression, checker, statementBySymbol, stack));
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(body);
  }
  stack.delete(callable);
  return paths;
}

function expressionFacts(expression, checker, statementBySymbol, stack) {
  const node = stripTypeScriptExpression(expression);
  if (node.kind === ts.SyntaxKind.UndefinedKeyword) return [{ kind: "nil" }];
  if (ts.isIdentifier(node)) return identifierFacts(node, checker, statementBySymbol, stack);
  if (ts.isArrayLiteralExpression(node)) {
    if (node.elements.length === 0) return [{ kind: "empty-array" }];
    return arrayElementVariants(node.elements.map((element) => expressionFacts(element, checker, statementBySymbol, stack)));
  }
  if (ts.isObjectLiteralExpression(node) && node.properties.length === 0) return [{ kind: "empty-object" }];
  if (ts.isNewExpression(node) && isEmptyMapConstruction(node)) return [{ kind: "empty-map" }];
  if (ts.isCallExpression(node)) {
    const target = calledTopLevelStatement(node, checker, statementBySymbol);
    const callable = target === undefined ? undefined : callableFromStatement(target.statement, target.symbol, checker);
    if (callable !== undefined) return returnPathsFromCallable(callable, checker, statementBySymbol, stack);
    return [{ kind: "other" }];
  }
  if (ts.isConditionalExpression(node)) {
    return [
      ...expressionFacts(node.whenTrue, checker, statementBySymbol, stack),
      ...expressionFacts(node.whenFalse, checker, statementBySymbol, stack),
    ];
  }
  if (ts.isBinaryExpression(node) && (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken || node.operatorToken.kind === ts.SyntaxKind.BarBarToken)) {
    const left = expressionFacts(node.left, checker, statementBySymbol, stack)
      .filter((fact) => fact.kind !== "nil" && fact.kind !== "nil-capable");
    return [
      ...left,
      ...expressionFacts(node.right, checker, statementBySymbol, stack).map((fact) => relabelEmptyFact(fact, "normalization")),
    ];
  }
  return [{ kind: "other" }];
}

function identifierFacts(identifier, checker, statementBySymbol, stack) {
  const symbol = checker.getSymbolAtLocation(identifier);
  if (identifier.text === "undefined" && isIntrinsicUndefined(symbol)) return [{ kind: "nil" }];
  if (symbol !== undefined) {
    const declaration = symbol.valueDeclaration ?? symbol.declarations?.find(ts.isVariableDeclaration);
    if (declaration !== undefined && ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) {
      return expressionFacts(declaration.initializer, checker, statementBySymbol, stack)
        .map((fact) => relabelEmptyFact(fact, "eager"));
    }
  }
  return [{ kind: "other" }];
}

function arrayElementVariants(elementVariants) {
  let variants = [[]];
  for (const facts of elementVariants) {
    const next = [];
    for (const variant of variants) {
      for (const fact of facts) next.push([...variant, fact]);
    }
    variants = next;
  }
  return variants.map((elements) => ({ kind: "array", elements }));
}

function relabelEmptyFact(fact, source) {
  if (fact.kind === "empty-array" || fact.kind === "empty-map" || fact.kind === "empty-object") {
    return { ...fact, kind: `${source}-${fact.kind}` };
  }
  if (fact.kind === "array") return { ...fact, elements: fact.elements.map((element) => relabelEmptyFact(element, source)) };
  return fact;
}

function calledTopLevelStatement(call, checker, statementBySymbol) {
  const symbol = checker.getSymbolAtLocation(call.expression);
  if (symbol === undefined) return undefined;
  const resolved = resolveAliasSymbol(checker, symbol);
  const statement = statementBySymbol.get(resolved);
  return statement === undefined ? undefined : { statement, symbol: resolved };
}

function callableFromStatement(statement, selectedSymbol, checker) {
  if (ts.isFunctionDeclaration(statement)) return statement;
  if (!ts.isVariableStatement(statement)) return undefined;
  for (const declaration of statement.declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name)) continue;
    const symbol = checker.getSymbolAtLocation(declaration.name);
    if (selectedSymbol !== undefined && symbol !== selectedSymbol) continue;
    if (declaration.initializer !== undefined && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) {
      return declaration.initializer;
    }
  }
  return undefined;
}

function stripTypeScriptExpression(expression) {
  let current = expression;
  while (ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isTypeAssertionExpression(current)
    || ts.isNonNullExpression(current)
    || ts.isSatisfiesExpression(current)) {
    current = current.expression;
  }
  return current;
}

function isIntrinsicUndefined(symbol) {
  if (symbol === undefined) return true;
  return (symbol.declarations ?? []).every((declaration) => declaration.getSourceFile().fileName.endsWith("__tsts_porter_intrinsic_undefined.d.ts"));
}

function isEmptyMapConstruction(expression) {
  if ((expression.arguments?.length ?? 0) !== 0) return false;
  if (ts.isIdentifier(expression.expression)) return expression.expression.text === "Map";
  return ts.isPropertyAccessExpression(expression.expression)
    && ts.isIdentifier(expression.expression.expression)
    && expression.expression.expression.text === "globalThis"
    && expression.expression.name.text === "Map";
}

function resolveAliasSymbol(checker, symbol) {
  return (symbol.flags & ts.SymbolFlags.Alias) === 0 ? symbol : checker.getAliasedSymbol(symbol);
}

function countCalls(block) {
  let count = 0;
  const visit = (node) => {
    if (node !== block && ts.isFunctionLike(node)) return;
    if (ts.isCallExpression(node)) count++;
    ts.forEachChild(node, visit);
  };
  visit(block);
  return count;
}
