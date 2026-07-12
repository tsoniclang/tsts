import assert from "node:assert/strict";
import test from "node:test";

import {
  loadParser,
  parseSource,
} from "./ast-signatures.mjs";
import {
  canonicalTypeScriptConstantValue,
  constantEvaluationIssue,
  evaluateTypeScriptConstant,
  knownTypeScriptConstant,
} from "./constant-evaluation.mjs";
import { buildIndexedModuleValueEnvironments } from "./extract-signatures.mjs";
import { indexTypeScriptModuleSources } from "./module-index.mjs";

test("declaration constants preserve explicit result states and lazy primitive semantics", async () => {
  const api = await loadParser();
  const sourceFile = parseSource(api, "fixture/constants.ts", `
const template = \`value=\${Base}\`;
const conditional = Flag ? Base + 1 : Missing;
const property = Values.Second;
const element = Values["Second"];
const andValue = false && Missing;
const orValue = true || Missing;
const nullish = null ?? 7;
const compared = Base >= 2;
const asserted = Base!;
const unsupported = buildValue();
let absent: number;
`);
  const environment = new Map([
    ["Base", { status: "known", value: { kind: "number", value: 2 } }],
    ["Flag", { status: "known", value: { kind: "boolean", value: true } }],
    ["Values.Second", { status: "known", value: { kind: "number", value: 4 } }],
  ]);
  const evaluations = sourceFile.Statements.Nodes.map((statement) => {
    const declaration = api.Casts.AsVariableStatement(statement).DeclarationList.Declarations.Nodes[0];
    return evaluateTypeScriptConstant(api, declaration.Initializer, environment);
  });
  assert.deepEqual(evaluations.map(canonicalTypeScriptConstantValue), [
    { kind: "string", value: "value=2" },
    { kind: "number", value: "3" },
    { kind: "number", value: "4" },
    { kind: "number", value: "4" },
    { kind: "boolean", value: false },
    { kind: "boolean", value: true },
    { kind: "number", value: "7" },
    { kind: "boolean", value: true },
    { kind: "number", value: "2" },
    undefined,
    undefined,
  ]);
  assert.equal(evaluations[9].status, "unsupported");
  assert.equal(evaluations[9].astKind, "KindCallExpression");
  assert.equal(evaluations[10].status, "missing");
});

test("unsupported expressions are distinct from unresolved references", async () => {
  const api = await loadParser();
  const sourceFile = parseSource(api, "fixture/unsupported.ts", `const a = Missing; const b = () => 1;`);
  const [missingReference, functionExpression] = sourceFile.Statements.Nodes.map((statement) => {
    const declaration = api.Casts.AsVariableStatement(statement).DeclarationList.Declarations.Nodes[0];
    return evaluateTypeScriptConstant(api, declaration.Initializer, new Map());
  });
  assert.deepEqual(missingReference, {
    status: "unsupported",
    astKind: "KindIdentifier",
    reason: "unresolved declaration constant reference 'Missing'",
  });
  assert.equal(functionExpression.status, "unsupported");
  assert.equal(functionExpression.astKind, "KindArrowFunction");
});

test("constant evaluation states enforce exact keys and primitive value shapes", async () => {
  const api = await loadParser();
  const sourceFile = parseSource(api, "fixture/result-states.ts", "const unsupported = buildValue();");
  const declaration = api.Casts.AsVariableStatement(sourceFile.Statements.Nodes[0]).DeclarationList.Declarations.Nodes[0];
  const knownCases = [
    ["string", "value"],
    ["number", -0],
    ["bigint", 1n],
    ["boolean", false],
    ["null", null],
    ["undefined", undefined],
  ];
  const knownResults = knownCases.map(([kind, value]) => knownTypeScriptConstant(kind, value));
  const missing = evaluateTypeScriptConstant(api, undefined);
  const unsupported = evaluateTypeScriptConstant(api, declaration.Initializer);

  for (const [index, known] of knownResults.entries()) {
    const [kind, value] = knownCases[index];
    assert.deepEqual(Reflect.ownKeys(known), ["status", "value"]);
    assert.deepEqual(Reflect.ownKeys(known.value), ["kind", "value"]);
    assert.deepEqual(known, { status: "known", value: { kind, value } });
    assert.ok(Object.isFrozen(known));
    assert.ok(Object.isFrozen(known.value));
  }
  assert.deepEqual(missing, { status: "missing", reason: "initializer is absent" });
  assert.deepEqual(unsupported, {
    status: "unsupported",
    astKind: "KindCallExpression",
    reason: "expression kind is outside the pure declaration-constant grammar",
  });
  assert.deepEqual(Reflect.ownKeys(missing), ["status", "reason"]);
  assert.deepEqual(Reflect.ownKeys(unsupported), ["status", "astKind", "reason"]);
  assert.equal(canonicalTypeScriptConstantValue(knownResults.at(-1)).kind, "undefined");
  assert.equal(constantEvaluationIssue(missing), "initializer is absent");
  for (const [kind, value] of [
    ["string", 1],
    ["number", "1"],
    ["bigint", 1],
    ["boolean", 0],
    ["null", undefined],
    ["undefined", null],
  ]) {
    assert.throws(() => knownTypeScriptConstant(kind, value), /exact TypeScript constant-evaluation contract/);
  }
  assert.throws(() => knownTypeScriptConstant("object", {}), /exact TypeScript constant-evaluation contract/);
});

test("noncontract constant environment entries are rejected", async () => {
  const api = await loadParser();
  const sourceFile = parseSource(api, "fixture/invalid-environment.ts", "const value = InvalidEntry;");
  const declaration = api.Casts.AsVariableStatement(sourceFile.Statements.Nodes[0]).DeclarationList.Declarations.Nodes[0];
  const accessorStatus = Object.defineProperty({ reason: "invalid" }, "status", {
    enumerable: true,
    get: () => "missing",
  });
  const invalidEntries = [
    { kind: "number", value: 1 },
    { status: "known", value: { kind: "number", value: 1 }, extra: true },
    { status: "known", value: { kind: "number", value: 1, extra: true } },
    { status: "known", value: { kind: "number", value: "1" } },
    { status: "missing" },
    { status: "missing", reason: "" },
    { status: "unsupported", astKind: "KindIdentifier", reason: "invalid", extra: true },
    accessorStatus,
  ];
  for (const invalidEntry of invalidEntries) {
    assert.throws(
      () => evaluateTypeScriptConstant(api, declaration.Initializer, new Map([["InvalidEntry", invalidEntry]])),
      /exact TypeScript constant-evaluation contract/,
    );
  }
  assert.throws(
    () => canonicalTypeScriptConstantValue({ status: "missing", reason: "invalid", extra: true }),
    /exact TypeScript constant-evaluation contract/,
  );
});

test("indexed constants resolve property paths without visiting implementation bodies", async () => {
  const api = await loadParser();
  const index = indexTypeScriptModuleSources(api, new Map([["fixture/declaration-boundary.ts", `
export enum Values { First = 1, Second = First + 1 }
export function implementationOnly(): number {
  const bodyFirst = bodySecond;
  const bodySecond = bodyFirst;
  return bodyFirst;
}
export const selected = Values.Second;
`]]));
  const environment = buildIndexedModuleValueEnvironments(api, index).get("fixture/declaration-boundary.ts");

  assert.deepEqual(environment.get("selected"), {
    status: "known",
    value: { kind: "number", value: 2 },
  });
  assert.deepEqual(environment.get("Values.Second"), {
    status: "known",
    value: { kind: "number", value: 2 },
  });
  assert.equal(environment.get("bodyFirst"), undefined);
  assert.equal(environment.get("implementationOnly.bodyFirst"), undefined);
});
