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
  const mechanicalRiskBody = tsUnit.mechanicalRiskBody ?? body;
  const analysis = tsUnit.implementationAnalysis ?? analyzeTypeScriptImplementation(body);
  const bodyOverride = tsUnit.override?.allow?.includes("body") === true;
  const exactNilOverride = bodyOverride
    && tsUnit.override?.allow?.includes("signature") === true
    && typeof tsUnit.override?.reason === "string"
    && tsUnit.override.reason.trim() !== "";
  const risks = [];
  const goHasBehavior = nontrivialGoStatementKinds.some((kind) => (goUnit.nodeKindCounts?.[kind] ?? 0) > 0);
  if ((goUnit.kind === "func" || goUnit.kind === "method") && goHasBehavior && !bodyOverride && isVoidOnlyImplementation(body)) {
    risks.push({
      kind: "implemented-no-op",
      message: "Go function has executable statements but the implemented TypeScript body is empty or only discards parameters.",
    });
  }
  if (goCalls(goUnit, "encoding/json", "Marshal") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, ["/packages/tsts/src/internal/json/json.ts", "/packages/tsts/src/go/github.com/go-json-experiment/json.ts"], "Marshal")) {
    risks.push({
      kind: "json-marshal-substitution",
      message: "Go json.Marshal was replaced with raw JSON.stringify, bypassing Go field tags and custom marshalers.",
    });
  }
  if (goCalls(goUnit, "reflect", "DeepEqual") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/reflect.ts"], "DeepEqual")) {
    risks.push({
      kind: "deep-equal-stringify-substitution",
      message: "Go reflect.DeepEqual was replaced with JSON string comparison, which loses maps and non-JSON state.",
    });
  }
  const missingTristateField = tristateFields(goUnit.snippet ?? "", "IsTrue").find((field) => {
    const escapedField = escapeRegExp(field);
    const exactHelper = new RegExp(`Tristate_IsTrue\\([^)]*\\b${escapedField}\\b`);
    const numericComparison = new RegExp(`\\b${escapedField}\\b\\s*(?:!==|===)\\s*0\\b|\\b0\\s*(?:!==|===)\\s*[^;\\n]{0,40}\\b${escapedField}\\b`);
    return !exactHelper.test(mechanicalRiskBody) && numericComparison.test(mechanicalRiskBody);
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
    if (manualUpdate && !hasTsFacadeCall(analysis, ["/packages/tsts/src/internal/ast/ast.ts"], `NodeFactory_Update${nodeKind}`)) {
      risks.push({
        kind: "manual-node-update",
        message: `Go calls NodeFactory.Update${nodeKind}, but TypeScript manually reconstructs the node instead of using the generated update factory.`,
      });
    }
  }
  if (goCalls(goUnit, "path", "Split") && hasTsCallTerminal(analysis, "lastIndexOf") && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/path.ts"], "Split")) {
    risks.push({
      kind: "path-split-reimplementation",
      message: "Go path.Split was reimplemented with string indexing instead of the authored Go path facade.",
    });
  }
  if (goCalls(goUnit, "slices", "Reverse") && (hasTsCallTerminal(analysis, "reverse") || hasTsCallTerminal(analysis, "toReversed")) && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/slices.ts"], "Reverse")) {
    risks.push({
      kind: "slice-reverse-reimplementation",
      message: "Go slices.Reverse was replaced with direct JavaScript reverse/copy logic instead of the authored Go slices facade.",
    });
  }
  if (!exactNilOverride) risks.push(...nilReturnRisks(goUnit, tsUnit));
  const deferred = goUnit.featureCounts?.deferStmt ?? 0;
  if (!bodyOverride && deferred > (tsUnit.exceptionSafeCleanup?.cleanupCalls ?? 0)) {
    risks.push({
      kind: "defer-cleanup-not-exception-safe",
      message: `Go registers ${deferred} deferred cleanup call(s), but the reachable TypeScript implementation has only ${tsUnit.exceptionSafeCleanup?.cleanupCalls ?? 0} call(s) inside finally blocks; a trailing call is not exception-safe.`,
    });
  }
  if (!bodyOverride) risks.push(...concurrencyRisks(goUnit, analysis));
  return risks;
}

export function nilReturnRisks(goUnit, tsUnit) {
  const arity = goResultArity(goUnit.results ?? []);
  if (arity < 1) return [];
  const goCounts = Array.from({ length: arity }, () => ({ empty: 0, nil: 0 }));
  for (const path of goUnit.returnFacts ?? []) {
    if ((path.results?.length ?? 0) !== arity) continue;
    for (let index = 0; index < arity; index++) {
      const kind = path.results[index]?.kind;
      if (kind === "nil") goCounts[index].nil++;
      else if (isAllocatedEmptyKind(kind)) goCounts[index].empty++;
    }
  }
  const tsCounts = Array.from({ length: arity }, () => ({ empty: 0, nil: 0, normalized: 0 }));
  for (const path of tsUnit.returnSemantics?.paths ?? []) {
    const results = typeScriptResultFacts(path, arity);
    if (results === undefined) continue;
    for (let index = 0; index < arity; index++) {
      const kind = results[index]?.kind;
      if (kind === "nil" || kind === "nil-capable") tsCounts[index].nil++;
      if (isAllocatedEmptyKind(kind)) tsCounts[index].empty++;
      if (typeof kind === "string" && (kind.startsWith("normalization-") || kind.startsWith("eager-"))) tsCounts[index].normalized++;
    }
  }
  const risks = [];
  for (let index = 0; index < arity; index++) {
    if (goCounts[index].nil === 0 || tsCounts[index].nil >= goCounts[index].nil) continue;
    const normalized = tsCounts[index].normalized > 0 || tsCounts[index].empty > goCounts[index].empty;
    risks.push({
      kind: normalized ? "nil-return-normalized" : "nil-return-preservation-unproven",
      message: normalized
        ? `Go result #${index} has ${goCounts[index].nil} nil return path(s), but TypeScript proves only ${tsCounts[index].nil} nil-preserving path(s) and allocates/normalizes empty values on ${tsCounts[index].empty} path(s).`
        : `Go result #${index} has ${goCounts[index].nil} nil return path(s), but the reachable TypeScript return graph proves only ${tsCounts[index].nil} nil-preserving path(s).`,
    });
  }
  return risks;
}

export function concurrencyRisks(goUnit, analysis) {
  const risks = [];
  const featureCounts = goUnit.featureCounts ?? {};
  if ((featureCounts.goStmt ?? 0) > 0) {
    risks.push({ kind: "goroutine-semantics-unproven", message: "Go starts a goroutine, but no exact local body override owns the target runtime scheduling semantics." });
  }
  if ((featureCounts.selectStmt ?? 0) > 0 && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "GoChanSelect")) {
    risks.push({ kind: "select-semantics-missing", message: "Go select semantics are not represented by the shared GoChanSelect runtime and have no exact local body override." });
  }
  if ((featureCounts.sendStmt ?? 0) > 0 && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "GoChanTrySend")) {
    risks.push({ kind: "channel-send-semantics-missing", message: "Go channel send semantics are not represented by the shared channel runtime and have no exact local body override." });
  }
  if ((featureCounts.receiveExpr ?? 0) > 0
    && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "GoChanReceive")
    && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "GoChanSelect")) {
    risks.push({ kind: "channel-receive-semantics-missing", message: "Go channel receive semantics disappeared without a shared channel-runtime operation or exact local body override." });
  }
  if ((featureCounts.closeChanCall ?? 0) > 0 && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "GoChanClose")) {
    risks.push({ kind: "channel-close-semantics-missing", message: "Go channel close semantics disappeared without GoChanClose or an exact local body override." });
  }
  if ((featureCounts.makeChanCall ?? 0) > 0 && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/compat.ts"], "MakeGoChan")) {
    risks.push({ kind: "channel-construction-semantics-missing", message: "Go channel construction disappeared without MakeGoChan or an exact local body override." });
  }
  for (const name of ["AfterFunc", "WithCancel", "WithCancelCause", "WithDeadline", "WithTimeout"]) {
    if (goCalls(goUnit, "context", name) && !hasTsFacadeCall(analysis, ["/packages/tsts/src/go/context.ts"], name)) {
      risks.push({ kind: "cancellation-semantics-missing", message: `Go context.${name} cancellation semantics disappeared without the exact context facade or a local body override.` });
    }
  }
  return risks;
}

function goResultArity(results) {
  return results.reduce((count, result) => count + Math.max(result.names?.length ?? 0, 1), 0);
}

function typeScriptResultFacts(path, arity) {
  if (arity === 1) return [path];
  return path?.kind === "array" && path.elements.length === arity ? path.elements : undefined;
}

function isAllocatedEmptyKind(kind) {
  return typeof kind === "string" && /(?:^|-)(?:empty-array|empty-map|empty-object|empty-slice|empty-struct)$/.test(kind)
    || kind === "make-empty-map"
    || kind === "make-empty-slice";
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

export function hasTsFacadeCall(analysis, moduleFiles, exportedName) {
  return analysis.calls.some((call) =>
    call.importedName === exportedName
      && typeof call.moduleFile === "string"
      && moduleFiles.some((moduleFile) => call.moduleFile.endsWith(moduleFile)));
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
