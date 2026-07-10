import { analyzeTypeScriptImplementation } from "./ts-units.mjs";
import ts from "typescript";

export const nontrivialGoStatementKinds = [
  "AssignStmt",
  "BranchStmt",
  "CallExpr",
  "DeferStmt",
  "ForStmt",
  "GoStmt",
  "IfStmt",
  "IncDecStmt",
  "RangeStmt",
  "ReturnStmt",
  "SelectStmt",
  "SendStmt",
  "SwitchStmt",
  "TypeSwitchStmt",
];

export function collectMechanicalPortRisks(goUnit, tsUnit) {
  if (tsUnit.status !== "implemented") return [];
  const body = tsUnit.implementationBody ?? "";
  const analysis = tsUnit.implementationAnalysis ?? analyzeTypeScriptImplementation(body);
  const bodyOverride = tsUnit.override?.allow?.includes("body") === true;
  const risks = [];
  const goHasBehavior = nontrivialGoStatementKinds.some((kind) => (goUnit.nodeKindCounts?.[kind] ?? 0) > 0);
  if ((goUnit.kind === "func" || goUnit.kind === "method") && goHasBehavior && !bodyOverride && isVoidOnlyImplementation(body)) {
    risks.push({
      kind: "implemented-no-op",
      message: "Go function has executable statements but the implemented TypeScript body is empty or only discards parameters.",
    });
  }
  if (goCalls(goUnit, "encoding/json", "Marshal") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, "Marshal")) {
    risks.push({
      kind: "json-marshal-substitution",
      message: "Go json.Marshal was replaced with raw JSON.stringify, bypassing Go field tags and custom marshalers.",
    });
  }
  if (goCalls(goUnit, "reflect", "DeepEqual") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, "DeepEqual")) {
    risks.push({
      kind: "deep-equal-stringify-substitution",
      message: "Go reflect.DeepEqual was replaced with JSON string comparison, which loses maps and non-JSON state.",
    });
  }
  const missingTristateField = tristateFields(goUnit.snippet ?? "", "IsTrue").find((field) => {
    const escapedField = escapeRegExp(field);
    const exactHelper = new RegExp(`Tristate_IsTrue\\([^)]*\\b${escapedField}\\b`);
    const numericComparison = new RegExp(`\\b${escapedField}\\b\\s*(?:!==|===)\\s*0\\b|\\b0\\s*(?:!==|===)\\s*[^;\\n]{0,40}\\b${escapedField}\\b`);
    return !exactHelper.test(body) && numericComparison.test(body);
  });
  if (missingTristateField !== undefined) {
    risks.push({
      kind: "tristate-numeric-truthiness",
      message: `Go Tristate.${missingTristateField}.IsTrue was replaced with a numeric zero comparison, which treats TSFalse as true.`,
    });
  }
  const goHasBranching = ["IfStmt", "ForStmt", "RangeStmt", "SwitchStmt", "TypeSwitchStmt", "SelectStmt"].some(
    (kind) => (goUnit.nodeKindCounts?.[kind] ?? 0) > 0,
  );
  const tsControlFlow = typeScriptControlFlowStats(body);
  if (
    !goHasBranching
    && (goUnit.nodeKindCounts?.ReturnStmt ?? 0) === 1
    && !bodyOverride
    && tsControlFlow.hasControlFlow
    && tsControlFlow.returnCount > 1
  ) {
    risks.push({
      kind: "unexpected-control-flow",
      message: "TypeScript adds control flow to a Go unit with no branch or loop; port the direct Go behavior or document a local body override.",
    });
  }
  for (const match of (goUnit.snippet ?? "").matchAll(/\.Update([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)) {
    const nodeKind = match[1];
    const manualUpdate = analysis.calls.some((call) => call.terminal === "updateNode" && call.argumentCalls.includes(`New${nodeKind}`));
    if (manualUpdate && !hasTsFacadeCall(analysis, `NodeFactory_Update${nodeKind}`)) {
      risks.push({
        kind: "manual-node-update",
        message: `Go calls NodeFactory.Update${nodeKind}, but TypeScript manually reconstructs the node instead of using the generated update factory.`,
      });
    }
  }
  if (goCalls(goUnit, "path", "Split") && hasTsCallTerminal(analysis, "lastIndexOf") && !hasTsFacadeCall(analysis, "Split")) {
    risks.push({
      kind: "path-split-reimplementation",
      message: "Go path.Split was reimplemented with string indexing instead of the authored Go path facade.",
    });
  }
  if (goCalls(goUnit, "slices", "Reverse") && (hasTsCallTerminal(analysis, "reverse") || hasTsCallTerminal(analysis, "toReversed")) && !hasTsFacadeCall(analysis, "Reverse")) {
    risks.push({
      kind: "slice-reverse-reimplementation",
      message: "Go slices.Reverse was replaced with direct JavaScript reverse/copy logic instead of the authored Go slices facade.",
    });
  }
  return risks;
}

export function goCalls(goUnit, importPathSuffix, name) {
  return (goUnit.externalRefs ?? []).some((reference) =>
    reference.role === "call" && reference.name === name &&
    (reference.importPath === importPathSuffix || reference.importPath.endsWith(`/${importPathSuffix}`)));
}

export function hasTsCall(analysis, text) {
  return analysis.calls.some((call) => call.text === text);
}

export function hasTsCallTerminal(analysis, terminal) {
  return analysis.calls.some((call) => call.terminal === terminal);
}

export function hasTsFacadeCall(analysis, exportedName) {
  return analysis.calls.some((call) =>
    call.importedName === exportedName || call.terminal === exportedName || call.terminal?.endsWith(`_${exportedName}`));
}

export function typeScriptControlFlowStats(body) {
  if (body === "") return { hasControlFlow: false, returnCount: 0 };
  const sourceFile = ts.createSourceFile("porter-risk.ts", `function __ported() ${body}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = sourceFile.statements[0];
  if (!declaration || !ts.isFunctionDeclaration(declaration) || declaration.body === undefined) {
    return { hasControlFlow: false, returnCount: 0 };
  }
  let hasControlFlow = false;
  let returnCount = 0;
  const visit = (node) => {
    if (node !== declaration && ts.isFunctionLike(node)) return;
    if (ts.isReturnStatement(node)) returnCount++;
    if (
      ts.isIfStatement(node)
      || ts.isForStatement(node)
      || ts.isForInStatement(node)
      || ts.isForOfStatement(node)
      || ts.isWhileStatement(node)
      || ts.isDoStatement(node)
      || ts.isSwitchStatement(node)
      || ts.isTryStatement(node)
    ) {
      hasControlFlow = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(declaration.body);
  return { hasControlFlow, returnCount };
}

export function tristateFields(snippet, method) {
  const fields = new Set();
  const pattern = new RegExp(`\\b([A-Za-z_][A-Za-z0-9_]*)\\.${method}\\(\\)`, "g");
  for (const match of snippet.matchAll(pattern)) {
    fields.add(match[1]);
  }
  return [...fields];
}

export function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isVoidOnlyImplementation(body) {
  if (body === "") return false;
  const inner = body
    .replace(/^\s*\{/, "")
    .replace(/\}\s*$/, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n\r]*/g, "")
    .replace(/\bvoid\s+[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\s*;/g, "")
    .replace(/[;\s]/g, "");
  return inner === "";
}
