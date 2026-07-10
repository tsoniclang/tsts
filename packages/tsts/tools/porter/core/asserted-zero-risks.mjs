import path from "node:path";
import ts from "typescript";

const intrinsicUndefinedFile = "/__tsts_porter_intrinsic_undefined.d.ts";

export function collectTypeScriptTextMechanicalRisks(fileName, text) {
  const sourceFile = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  return collectTypeScriptFileMechanicalRisks(sourceFile);
}

export function collectTypeScriptFileMechanicalRisks(sourceFile) {
  const checker = createMechanicalRiskChecker([sourceFile]);
  return collectPositionedTypeScriptFileMechanicalRisks(sourceFile, checker).map(publicMechanicalRisk);
}

export function createMechanicalRiskChecker(sourceFiles) {
  const compilerOptions = {
    module: ts.ModuleKind.ESNext,
    noLib: true,
    target: ts.ScriptTarget.Latest,
  };
  const intrinsicUndefinedSource = ts.createSourceFile(
    intrinsicUndefinedFile,
    "declare const undefined: never;\n",
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const canonicalPath = (fileName) => path.resolve("/", fileName);
  const sources = new Map([
    [canonicalPath(intrinsicUndefinedFile), intrinsicUndefinedSource],
    ...sourceFiles.map((sourceFile) => [canonicalPath(sourceFile.fileName), sourceFile]),
  ]);
  const host = ts.createCompilerHost(compilerOptions, true);
  host.fileExists = (fileName) => sources.has(canonicalPath(fileName));
  host.getCurrentDirectory = () => "/";
  host.getSourceFile = (fileName) => sources.get(canonicalPath(fileName));
  host.readFile = (fileName) => sources.get(canonicalPath(fileName))?.text;
  host.resolveModuleNames = (moduleNames, containingFile) => moduleNames.map((moduleName) => {
    if (!moduleName.startsWith(".")) return undefined;
    const base = path.resolve(path.dirname(containingFile), moduleName);
    for (const candidate of moduleCandidates(base)) {
      const resolvedFileName = canonicalPath(candidate);
      if (!sources.has(resolvedFileName)) continue;
      return { resolvedFileName, extension: extensionFor(resolvedFileName) };
    }
    return undefined;
  });
  const program = ts.createProgram({
    rootNames: [...sources.keys()],
    options: compilerOptions,
    host,
  });
  return program.getTypeChecker();
}

function moduleCandidates(base) {
  const candidates = [base];
  if (base.endsWith(".js")) candidates.push(`${base.slice(0, -3)}.ts`);
  else if (base.endsWith(".mjs")) candidates.push(`${base.slice(0, -4)}.mts`);
  else if (base.endsWith(".cjs")) candidates.push(`${base.slice(0, -4)}.cts`);
  else candidates.push(`${base}.ts`, `${base}.d.ts`, path.join(base, "index.ts"), path.join(base, "index.d.ts"));
  return candidates;
}

function extensionFor(fileName) {
  if (fileName.endsWith(".d.ts") || fileName.endsWith(".ts")) return ts.Extension.Ts;
  if (fileName.endsWith(".mts")) return ts.Extension.Mts;
  if (fileName.endsWith(".cts")) return ts.Extension.Cts;
  return ts.Extension.Ts;
}

export function collectPositionedTypeScriptFileMechanicalRisks(sourceFile, checker) {
  const risks = [];
  const visit = (node) => {
    if (isAssertionChainNode(node) && !isAssertionChainNode(node.parent) && assertionChainHasAssertion(node)) {
      const operand = stripAssertionChain(node);
      if (isAssertedGoZeroOperand(operand, checker)) {
        const position = node.getStart(sourceFile);
        const location = sourceFile.getLineAndCharacterOfPosition(position);
        risks.push({
          kind: "asserted-go-zero",
          line: location.line + 1,
          column: location.character + 1,
          position,
          message: "Go zero or nil is hidden behind a TypeScript assertion; model nilability or construct the exact Go zero value instead.",
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return risks;
}

export function publicMechanicalRisk(risk) {
  return {
    kind: risk.kind,
    line: risk.line,
    column: risk.column,
    message: risk.message,
  };
}

function isAssertionChainNode(node) {
  return node !== undefined && (
    ts.isAsExpression(node)
    || ts.isTypeAssertionExpression(node)
    || ts.isNonNullExpression(node)
    || ts.isParenthesizedExpression(node)
  );
}

function stripAssertionChain(node) {
  let current = node;
  while (isAssertionChainNode(current)) current = current.expression;
  return current;
}

function assertionChainHasAssertion(node) {
  let current = node;
  while (isAssertionChainNode(current)) {
    if (ts.isAsExpression(current) || ts.isTypeAssertionExpression(current) || ts.isNonNullExpression(current)) return true;
    current = current.expression;
  }
  return false;
}

function isAssertedGoZeroOperand(node, checker) {
  if (node.kind === ts.SyntaxKind.NullKeyword) return true;
  if (ts.isVoidExpression(node)) return true;
  if (!ts.isIdentifier(node) || node.text !== "undefined") return false;
  const symbol = checker.getSymbolAtLocation(node);
  if (symbol === undefined) return true;
  const declarations = symbol.declarations ?? [];
  return declarations.length === 0 || declarations.every((declaration) => declaration.getSourceFile().fileName === intrinsicUndefinedFile);
}
