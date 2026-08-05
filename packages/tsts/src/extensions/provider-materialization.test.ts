import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createCompilerSessionFromFiles,
  type ProviderDeclarationModel,
  type ProviderDeclarationRequest,
} from "../index.js";
import type {
  ExtensionHostOptions,
  ProviderModuleResolution,
  ProviderVirtualDeclarationFact,
} from "./index.js";
import { getExtensionHost } from "./host.js";
import { ProviderMaterializationCoordinator } from "./provider-materialization.js";
import {
  sourceProviderExtension,
  testCoreDeclarations,
  testNoLibCompilerOptions,
  testProviderIdentity,
} from "./source-provider-test-support.js";

test("provider materialization demand is exact monotonic transactional and sealed", () => {
  const coordinator = new ProviderMaterializationCoordinator();
  const provider = testProviderIdentity("test.materialization.state");
  const resolution: ProviderModuleResolution = {
    kind: "virtual",
    moduleSpecifier: "@test/state.js",
    virtualFileName: "/provider/Test.State.d.ts",
    providerModuleId: "Test.State",
  };
  const first = coordinator.beginRound(options());
  const firstRequest = first.createRequest(provider, resolution, Object.freeze({}), "incremental");

  assert.deepEqual(firstRequest.materialization, {
    kind: "incremental",
    completeExports: [],
  });
  assert.throws(
    () => first.recordCompleteExportDemand(
      { ...provider, id: "test.materialization.other" },
      fact("B", "Test.B"),
      firstRequest.materialization,
    ),
    /does not match its owning provider identity/,
  );
  assert.equal(first.hasPendingDemands(), false);
  assert.equal(first.recordCompleteExportDemand(provider, fact("B", "Test.B"), firstRequest.materialization), true);
  assert.equal(first.recordCompleteExportDemand(provider, fact("A", "Test.A"), firstRequest.materialization), true);
  assert.equal(first.recordCompleteExportDemand(provider, fact("B", "Test.B"), firstRequest.materialization), false);
  assert.deepEqual(flattenDemands(first), [{ exportName: "A", exportId: "Test.A" }, {
    exportName: "B",
    exportId: "Test.B",
  }]);
  assert.throws(() => coordinator.seal(first), /unresolved complete-export demands/);
  assert.equal(coordinator.finishRound(first), true);
  assert.throws(
    () => first.recordCompleteExportDemand(provider, fact("C", "Test.C"), firstRequest.materialization),
    /arrived after its round was finished/,
  );

  const second = coordinator.beginRound(options());
  const secondRequest = second.createRequest(provider, resolution, Object.freeze({}), "incremental");
  assert.deepEqual(secondRequest.materialization, {
    kind: "incremental",
    completeExports: [{ exportName: "A", exportId: "Test.A" }, {
      exportName: "B",
      exportId: "Test.B",
    }],
  });
  assert.equal(second.recordCompleteExportDemand(provider, fact("A", "Test.A"), secondRequest.materialization), false);
  assert.equal(second.hasPendingDemands(), false);
  coordinator.seal(second);
  assert.throws(() => coordinator.beginRound(options()), /materialization is sealed/);
});

test("incremental provider header and completed-body drift reject without published artifacts", () => {
  const moduleSpecifier = "@test/drift.js";
  const cases = [{
    kind: "header" as const,
    reason: "stable export header changed between materialization rounds",
  }, {
    kind: "body" as const,
    reason: "completed export body changed between materialization rounds",
  }];
  for (const entry of cases) {
    const completeModel = driftingModel(moduleSpecifier, completeRequest(), entry.kind);
    const extension = sourceProviderExtension(new Map([[moduleSpecifier, completeModel]]), {
      declarationMaterialization: "incremental",
      getDeclarationModel(_resolution, _model, request) {
        return driftingModel(moduleSpecifier, request, entry.kind);
      },
    });
    const checked = createCompilerSessionFromFiles({
      currentDirectory: "/src",
      rootFiles: ["/src/core.d.ts", "/src/index.ts"],
      files: {
        "/src/core.d.ts": testCoreDeclarations,
        "/src/index.ts": [
          `import type { Root } from "${moduleSpecifier}";`,
          "declare const root: Root;",
          "export const value = root.next.value;",
        ].join("\n"),
      },
      compilerOptions: testNoLibCompilerOptions,
      extensionHostOptions: { extensions: [extension] },
    }).checkSource();

    assert.deepEqual(
      checked.extensionDiagnostics.map((diagnostic) => diagnostic.extensionCode),
      ["INVALID_PROVIDER_DECLARATION_MODEL"],
      entry.kind,
    );
    const details = checked.extensionDiagnostics[0]?.evidence?.find(
      (evidence) => evidence.message === "Incremental declaration contract conflict",
    )?.details;
    assert.equal(typeof details, "object", entry.kind);
    assert.notEqual(details, null, entry.kind);
    assert.deepEqual({ ...(details as Readonly<Record<string, unknown>>) }, {
      sourceExportName: "Root",
      reason: entry.reason,
    }, entry.kind);
    assert.deepEqual(getExtensionHost(checked.program)?.providers.getVirtualDeclarationDocuments(), [], entry.kind);
  }
});

function options(): ExtensionHostOptions {
  return Object.freeze({});
}

function fact(exportName: string, exportId: string): ProviderVirtualDeclarationFact {
  return Object.freeze({
    providerId: "test.materialization.state",
    providerVersion: "1.0.0",
    providerModuleId: "Test.State",
    moduleSpecifier: "@test/state.js",
    artifactFileName: "/provider/Test.State.d.ts",
    exportName,
    exportId,
  });
}

function flattenDemands(
  round: { readonly pendingDemands: () => readonly (readonly [string, readonly unknown[]])[] },
): readonly unknown[] {
  return round.pendingDemands().flatMap(([, demands]) => demands);
}

function completeRequest(): ProviderDeclarationRequest {
  return Object.freeze({
    context: Object.freeze({}),
    materialization: Object.freeze({ kind: "complete" }),
  });
}

function driftingModel(
  moduleSpecifier: string,
  request: ProviderDeclarationRequest,
  drift: "header" | "body",
): ProviderDeclarationModel {
  const rootComplete = isComplete(request, "Root", "Test.Root");
  const leafComplete = isComplete(request, "Leaf", "Test.Leaf");
  return {
    moduleSpecifier,
    providerModuleId: "Test.Drift",
    exports: [{
      id: "Test.Root",
      name: "Root",
      kind: drift === "header" && rootComplete ? "interface" : "class",
      ...(rootComplete ? {
        members: [{
          id: "Test.Root.next",
          name: "next",
          kind: "property" as const,
          readonly: true,
          type: {
            kind: "provider-ref" as const,
            moduleSpecifier,
            exportName: "Leaf",
          },
        }, {
          id: "Test.Root.unused",
          name: "unused",
          kind: "property" as const,
          readonly: true,
          type: drift === "body" && leafComplete
            ? { kind: "string" as const }
            : { kind: "number" as const },
        }],
      } : {}),
    }, {
      id: "Test.Leaf",
      name: "Leaf",
      kind: "class",
      ...(leafComplete ? {
        members: [{
          id: "Test.Leaf.value",
          name: "value",
          kind: "property" as const,
          readonly: true,
          type: { kind: "number" as const },
        }],
      } : {}),
    }],
  };
}

function isComplete(
  request: ProviderDeclarationRequest,
  exportName: string,
  exportId: string,
): boolean {
  return request.materialization.kind === "complete"
    || request.materialization.completeExports.some((entry) =>
      entry.exportName === exportName
      && (entry.exportId === undefined || entry.exportId === exportId)
    );
}
