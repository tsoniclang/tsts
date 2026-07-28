import assert from "node:assert/strict";
import { test } from "node:test";
import type { GoPtr } from "../go/compat.js";
import type { Node } from "../internal/ast/ast.js";
import {
  createCompilerSessionFromFiles,
  defineExtensionFactKey,
  type CompilerExtension,
  type SourceAnalysisContext,
} from "../index.js";

const sourceAnalysisExtensionId = "test.source-analysis";
const selectedCallFactKey = defineExtensionFactKey<string>({
  extensionId: sourceAnalysisExtensionId,
  name: "selectedCall",
  snapshot: (value) => value,
});

test("source analysis consumes the fully checked program once through direct source queries", () => {
  let analysisCount = 0;
  let selectedCall: GoPtr<Node>;
  const extension: CompilerExtension = {
    identity: {
      id: sourceAnalysisExtensionId,
      version: "1.0.0",
      capabilityNamespace: sourceAnalysisExtensionId,
    },
    composition: { kind: "source" },
    analyzeSource(context): void {
      analysisCount += 1;
      assert.equal(Object.isFrozen(context), true);
      assert.equal(Object.isFrozen(context.source), true);
      const sourceFile = context.source.getSourceFile("/src/index.ts");
      const source = context.source.getSourceFileQueries(sourceFile);
      const call = findFirstCall(source.ast, sourceFile);
      assert.ok(call !== undefined);
      const selected = source.checker.getResolvedCallInfo(call);
      assert.equal(selected?.outcome, "applicable");
      assert.ok(selected?.call === call, "Source analysis must retain the exact checked call node.");
      assert.equal(selected?.sourceSelectedMethodTypeArguments?.length, 1);
      assert.equal(context.facts.set(call, selectedCallFactKey, "identity<number>"), "inserted");
      selectedCall = call;
    },
  };
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/index.ts"],
    files: {
      "/src/index.ts": [
        "function identity<T>(value: T): T { return value; }",
        "const result = identity<number>(1);",
      ].join("\n"),
    },
    extensionHostOptions: { extensions: [extension] },
  });

  assert.equal(session.ensureChecked().length, 0);
  assert.equal(analysisCount, 0);
  const checked = session.checkSource();
  assert.equal(analysisCount, 1);
  assert.equal(checked.sourceFacts?.getFact(selectedCall, selectedCallFactKey), "identity<number>");
  assert.ok(session.checkSource() === checked, "Source checking must retain one exact checked program.");
  assert.equal(analysisCount, 1);
});

test("source analysis is dependency ordered and globally fail closed", () => {
  const firstExtensionId = "test.source-analysis.first";
  const secondExtensionId = "test.source-analysis.second";
  const firstFactKey = defineExtensionFactKey<string>({
    extensionId: firstExtensionId,
    name: "first",
    snapshot: (value) => value,
  });
  const order: string[] = [];
  let subject: GoPtr<Node>;
  const first: CompilerExtension = {
    identity: {
      id: firstExtensionId,
      version: "1.0.0",
      capabilityNamespace: firstExtensionId,
    },
    composition: { kind: "source" },
    analyzeSource(context): void {
      order.push("first");
      subject = context.source.getSourceFile("/src/index.ts");
      assert.ok(subject !== undefined);
      assert.equal(context.facts.set(subject, firstFactKey, "provisional"), "inserted");
    },
  };
  const second: CompilerExtension = {
    identity: {
      id: secondExtensionId,
      version: "1.0.0",
      capabilityNamespace: secondExtensionId,
    },
    dependencies: { dependsOn: [firstExtensionId] },
    composition: { kind: "source" },
    analyzeSource(): void {
      order.push("second");
      throw new Error("source analysis failed");
    },
  };
  const session = createCompilerSessionFromFiles({
    currentDirectory: "/src",
    rootFiles: ["/src/index.ts"],
    files: { "/src/index.ts": "export const value = 1;" },
    extensionHostOptions: { extensions: [second, first] },
  });

  assert.throws(() => session.checkSource(), /source analysis failed/);
  assert.deepEqual(order, ["first", "second"]);
  assert.equal(session.extensionHost?.facts.get(subject, firstFactKey), undefined);
  assert.equal(
    session.extensionHost?.diagnostics.all().filter((diagnostic) =>
      diagnostic.extensionCode === "SOURCE_ANALYSIS_FAILED").length,
    1,
  );
  assert.throws(() => session.checkSource(), /previously failed/);
});

function findFirstCall(ast: SourceAnalysisContext["source"]["ast"], root: GoPtr<Node>): GoPtr<Node> {
  if (root === undefined) {
    return undefined;
  }
  if (ast.is.IsCallExpression(root)) {
    return root;
  }
  for (const child of ast.children(root)) {
    const found = findFirstCall(ast, child);
    if (found !== undefined) {
      return found;
    }
  }
  return undefined;
}
