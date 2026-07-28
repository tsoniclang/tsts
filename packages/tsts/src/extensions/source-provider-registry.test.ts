import assert from "node:assert/strict";
import { test } from "node:test";
import {
  ExtensionHost,
  type ExtensionDiagnostic,
  type ProviderDeclarationModel,
  type ProviderModuleContext,
  type SourceDeclarationProvider,
} from "./index.js";
import {
  sourceProviderCompilerExtension,
  testProviderIdentity,
  testProviderModel,
} from "./source-provider-test-support.js";
import { providerVirtualInternalRoot } from "./provider-virtual-internal.js";

test("source provider registration rejects duplicate identities and contract drift", () => {
  const specifier = "@test/provider.js";
  const model = testProviderModel(specifier, "test.provider");
  const first = provider("test.provider", specifier, model);
  const duplicate = provider("test.provider", specifier, model);
  const mismatched: SourceDeclarationProvider = {
    ...provider("test.mismatched", specifier, model),
    identity: {
      ...testProviderIdentity("test.mismatched"),
      extensionContractVersion: "tsts.source-provider.unknown",
    },
  };
  const host = new ExtensionHost({}, {
    extensions: [
      sourceProviderCompilerExtension(first, "test.first"),
      sourceProviderCompilerExtension(duplicate, "test.duplicate"),
      sourceProviderCompilerExtension(mismatched, "test.mismatched"),
    ],
  });

  assert.deepEqual(
    host.diagnostics.all().map((diagnostic) => diagnostic.extensionCode),
    ["DUPLICATE_SOURCE_DECLARATION_PROVIDER", "PROVIDER_CONTRACT_MISMATCH"],
  );
  const resolved = host.providers.resolveVirtualModule(specifier);
  assert.equal(resolved.kind, "resolved");
  if (resolved.kind === "resolved") {
    assert.equal(resolved.module.artifact.provider.id, "test.provider");
  }
});

test("source provider ownership conflicts expose immutable identity snapshots", () => {
  const specifier = "@test/conflict.js";
  const first = provider("test.conflict.first", specifier, testProviderModel(specifier, "test.first"));
  const second = provider("test.conflict.second", specifier, testProviderModel(specifier, "test.second"));
  const host = new ExtensionHost({}, {
    extensions: [
      sourceProviderCompilerExtension(first),
      sourceProviderCompilerExtension(second),
    ],
  });

  const result = host.providers.resolveVirtualModule(specifier);
  assert.equal(result.kind, "conflict");
  if (result.kind !== "conflict") {
    return;
  }
  assert.deepEqual(
    result.providers.map((identity) => identity.id),
    ["test.conflict.first", "test.conflict.second"],
  );
  assert.equal(Object.isFrozen(result.providers), true);
  assert.ok(result.providers.every((identity) => Object.isFrozen(identity)));
  assert.ok(result.providers.every((identity) => !("ownsModule" in identity)));
  assert.deepEqual(
    host.diagnostics.all().map((diagnostic) => diagnostic.extensionCode),
    ["PROVIDER_OWNERSHIP_CONFLICT"],
  );
});

test("source provider callback failures reject at their exact stage and never fall back", () => {
  const specifier = "@test/failure.js";
  const stages = [
    {
      stage: "ownership",
      expectedCode: "PROVIDER_OWNERSHIP_FAILED",
      provider: {
        identity: testProviderIdentity("test.failure.ownership"),
        ownsModule(): never {
          throw new Error("ownership failed");
        },
        resolveModule(): never {
          throw new Error("resolution must not run");
        },
        getDeclarationModel(): never {
          throw new Error("declaration must not run");
        },
      },
    },
    {
      stage: "resolution",
      expectedCode: "PROVIDER_RESOLVE_FAILED",
      provider: {
        identity: testProviderIdentity("test.failure.resolution"),
        ownsModule: () => ({ kind: "owned" as const }),
        resolveModule(): never {
          throw new Error("resolution failed");
        },
        getDeclarationModel(): never {
          throw new Error("declaration must not run");
        },
      },
    },
    {
      stage: "declaration",
      expectedCode: "PROVIDER_DECLARATION_FAILED",
      provider: {
        identity: testProviderIdentity("test.failure.declaration"),
        ownsModule: () => ({ kind: "owned" as const }),
        resolveModule: () => resolution(specifier, "test.failure.declaration"),
        getDeclarationModel(): never {
          throw new Error("declaration failed");
        },
      },
    },
  ] satisfies readonly {
    readonly stage: string;
    readonly expectedCode: string;
    readonly provider: SourceDeclarationProvider;
  }[];

  for (const entry of stages) {
    const host = hostWith(entry.provider);
    const first = host.providers.resolveVirtualModule(specifier);
    const repeated = host.providers.resolveVirtualModule(specifier);
    assert.equal(first.kind, "rejected", `${entry.stage} failure must reject.`);
    assert.ok(repeated === first, `${entry.stage} rejection must be terminally cached.`);
    assert.deepEqual(
      host.diagnostics.all().map((diagnostic) => diagnostic.extensionCode),
      [entry.expectedCode],
    );
    assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
  }
});

test("source provider callback re-entry rejects and rolls back the complete transaction", () => {
  const specifier = "@test/reentrant.js";
  let host: ExtensionHost;
  let declarationCount = 0;
  let reenter = true;
  const sourceProvider: SourceDeclarationProvider = {
    identity: testProviderIdentity("test.reentrant"),
    ownsModule: (candidate) => candidate === specifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule(candidate) {
      if (reenter) {
        assert.equal(host.providers.resolveVirtualModule(candidate).kind, "rejected");
      }
      return resolution(candidate, "test.reentrant");
    },
    getDeclarationModel(module) {
      declarationCount += 1;
      return testProviderModel(module.moduleSpecifier, module.providerModuleId);
    },
  };
  host = hostWith(sourceProvider);

  const first = host.providers.resolveVirtualModule(specifier);
  assert.equal(first.kind, "rejected");
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "PROVIDER_RESOLUTION_REENTRANT");
  assert.equal(declarationCount, 1);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);

  reenter = false;
  const repeated = host.providers.resolveVirtualModule(specifier);
  assert.ok(repeated === first, "A rejected exact request must never retry against changed callback state.");
  assert.equal(declarationCount, 1);
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

test("source provider registrations and request contexts are immutable snapshots", () => {
  const specifier = "@test/snapshot.js";
  const mutableContext: {
    containingFile: string;
    resolutionMode: "import";
  } = {
    containingFile: "/src/first.ts",
    resolutionMode: "import",
  };
  let observedContext: ProviderModuleContext | undefined;
  let ownershipCalls = 0;
  const identity = {
    ...testProviderIdentity("test.snapshot"),
    displayName: "Original",
  };
  const sourceProvider: SourceDeclarationProvider = {
    identity,
    ownsModule(candidate, context) {
      ownershipCalls += 1;
      observedContext = context;
      mutableContext.containingFile = "/src/mutated.ts";
      return candidate === specifier ? { kind: "owned" } : { kind: "unowned" };
    },
    resolveModule: (candidate) => resolution(candidate, "test.snapshot"),
    getDeclarationModel: (module) =>
      testProviderModel(module.moduleSpecifier, module.providerModuleId),
  };
  const host = hostWith(sourceProvider);

  identity.displayName = "Mutated";
  sourceProvider.ownsModule = () => {
    throw new Error("Registration must retain the original callback.");
  };
  const first = host.providers.resolveVirtualModule(specifier, mutableContext);
  assert.equal(first.kind, "resolved");
  assert.equal(ownershipCalls, 1);
  assert.equal(observedContext?.containingFile, "/src/first.ts");
  assert.equal(Object.isFrozen(observedContext), true);
  if (first.kind === "resolved") {
    assert.equal(first.module.context.containingFile, "/src/first.ts");
    assert.equal(first.module.artifact.provider.displayName, "Original");
  }
});

test("source provider exact unowned and rejected outcomes are terminally cached", () => {
  const specifier = "@test/terminal.js";
  let ownershipCalls = 0;
  let outcome: "unowned" | "reject" = "unowned";
  const rejection = providerDiagnostic("test.terminal", "TEST_PROVIDER_REJECTED", "rejected");
  const sourceProvider: SourceDeclarationProvider = {
    identity: {
      ...testProviderIdentity("test.terminal"),
      diagnosticRange: { start: 9_900_000, end: 9_900_099 },
    },
    ownsModule() {
      ownershipCalls += 1;
      return outcome === "unowned"
        ? { kind: "unowned" }
        : { kind: "reject", diagnostic: rejection };
    },
    resolveModule(): never {
      throw new Error("Unowned and rejected providers must not resolve.");
    },
    getDeclarationModel(): never {
      throw new Error("Unowned and rejected providers must not declare.");
    },
  };
  const host = hostWith(sourceProvider);

  const first = host.providers.resolveVirtualModule(specifier);
  outcome = "reject";
  const repeated = host.providers.resolveVirtualModule(specifier);
  assert.equal(first.kind, "unowned");
  assert.ok(repeated === first, "The exact unowned outcome must be terminal for that request.");
  assert.equal(ownershipCalls, 1);

  const other = host.providers.resolveVirtualModule(specifier, { containingFile: "/src/other.ts" });
  assert.equal(other.kind, "rejected");
  const repeatedOther = host.providers.resolveVirtualModule(specifier, { containingFile: "/src/other.ts" });
  assert.ok(repeatedOther === other, "The exact rejected outcome must be terminal for that request.");
  assert.equal(ownershipCalls, 2);
});

test("provider registration seals at first resolution and required modules fail closed", () => {
  const requiredSpecifier = "@required/missing.js";
  const host = new ExtensionHost({}, {
    requiredProviderModules: [{
      specifierPrefix: "@required/",
      providerId: "required.provider",
    }],
  });

  const missing = host.providers.resolveVirtualModule(requiredSpecifier);
  assert.equal(missing.kind, "rejected");
  assert.equal(host.diagnostics.all()[0]?.extensionCode, "REQUIRED_PROVIDER_MISSING");

  const late = provider(
    "test.late",
    "@test/late.js",
    testProviderModel("@test/late.js", "test.late"),
  );
  assert.equal(host.providers.registerSourceDeclarationProvider(late), false);
  assert.equal(host.diagnostics.all().at(-1)?.extensionCode, "EXTENSION_REGISTRATION_CLOSED");
});

test("host-owned provider identities cannot be requested or claimed", () => {
  const reserved = `${providerVirtualInternalRoot}owned`;
  const sourceProvider = provider(
    "test.reserved",
    reserved,
    testProviderModel(reserved, "test.reserved"),
  );
  const host = hostWith(sourceProvider);

  const result = host.providers.resolveVirtualModule(reserved);
  assert.equal(result.kind, "rejected");
  assert.equal(result.kind === "rejected" ? result.diagnostic.extensionCode : "", "PROVIDER_RESERVED_MODULE_SPECIFIER");
  assert.deepEqual(host.providers.getVirtualDeclarationDocuments(), []);
});

function hostWith(sourceProvider: SourceDeclarationProvider): ExtensionHost {
  return new ExtensionHost({}, {
    extensions: [sourceProviderCompilerExtension(sourceProvider)],
  });
}

function provider(
  id: string,
  specifier: string,
  model: ProviderDeclarationModel,
): SourceDeclarationProvider {
  return {
    identity: testProviderIdentity(id),
    ownsModule: (candidate) => candidate === specifier
      ? { kind: "owned" }
      : { kind: "unowned" },
    resolveModule: (candidate) => resolution(candidate, model.providerModuleId),
    getDeclarationModel: () => model,
  };
}

function resolution(specifier: string, providerModuleId: string) {
  return {
    kind: "virtual" as const,
    moduleSpecifier: specifier,
    virtualFileName: `/provider/${providerModuleId}.d.ts`,
    providerModuleId,
  };
}

function providerDiagnostic(
  extensionId: string,
  extensionCode: string,
  message: string,
): ExtensionDiagnostic {
  return {
    category: "error",
    numericCode: 9_900_001,
    extensionId,
    extensionCode,
    message,
  };
}
