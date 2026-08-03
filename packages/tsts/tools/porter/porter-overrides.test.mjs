import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import {
  buildLocalOverrideStatus,
  collectLocalOverrideFailures,
} from "./porter.mjs";

test("buildLocalOverrideStatus accepts local body overrides", () => {
  const tsUnits = {
    units: [
      {
        id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
        path: "packages/tsts/src/internal/scanner/scanner.ts",
        override: {
          category: "runtime-performance",
          allow: ["body"],
          reason: "Use the JS/.NET UTF-16 source-text model in the scanner hot path while preserving the TS-Go public contract.",
        },
      },
    ],
  };
  const status = buildLocalOverrideStatus({}, tsUnits);
  assert.equal(status.inline, 1);
  assert.equal(status.byAllow.body, 1);
  assert.equal(status.byCategory["runtime-performance"], 1);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("buildLocalOverrideStatus accepts local signature overrides with snapshots", () => {
  const status = buildLocalOverrideStatus(
    {},
    {
      units: [
        {
          id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
          path: "packages/tsts/src/internal/scanner/scanner.ts",
          override: {
            category: "runtime-performance",
            allow: ["body", "signature"],
            reason: "Use a target-native source-text model.",
            goSignature: "func(K:string)=>K:void",
            tsSignature: "func(K:string)=>K:void",
          },
        },
      ],
    },
  );
  assert.equal(status.inline, 1);
  assert.equal(status.byAllow.body, 1);
  assert.equal(status.byAllow.signature, 1);
  assert.equal(status.signatureUnits.length, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), []);
});

test("buildLocalOverrideStatus accepts exact signature hash snapshots and rejects mixed modes", () => {
  const base = {
    category: "extension-host",
    allow: ["signature"],
    reason: "Bound an exact structurally large signature override.",
    goSignatureHash: `sha256:${"a".repeat(64)}`,
    tsSignatureHash: `sha256:${"b".repeat(64)}`,
  };
  const accepted = buildLocalOverrideStatus({}, {
    units: [{ id: "large", path: "large.ts", override: base }],
  });
  assert.equal(accepted.failureCount, 0);
  assert.equal(accepted.byAllow.signature, 1);

  const mixed = buildLocalOverrideStatus({}, {
    units: [{
      id: "mixed",
      path: "mixed.ts",
      override: { ...base, goSignature: "interface{}", tsSignature: "interface{}" },
    }],
  });
  assert.equal(mixed.failureCount, 1);
  assert.match(mixed.invalidInline[0]?.reason ?? "", /never both/);
});

test("buildLocalOverrideStatus rejects central implementationOverrides", () => {
  const status = buildLocalOverrideStatus(
    { implementationOverrides: [{ match: "github.com/microsoft/typescript-go::internal/scanner/**" }] },
    {
      units: [
        {
          id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
          path: "packages/tsts/src/internal/scanner/scanner.ts",
        },
      ],
    },
  );
  assert.equal(status.failureCount, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), [
    "1 invalid local @tsgo-override entries",
  ]);
});
test("buildLocalOverrideStatus flags malformed local overrides", () => {
  const status = buildLocalOverrideStatus(
    {},
    {
      units: [
        {
          id: "github.com/microsoft/typescript-go::internal/scanner/scanner.go::func::Scan",
          path: "packages/tsts/src/internal/scanner/scanner.ts",
          override: {
            category: "",
            allow: ["signature"],
            reason: "",
            goSignature: "",
          },
        },
      ],
    },
  );
  assert.equal(status.invalidInline.length, 1);
  assert.deepEqual(collectLocalOverrideFailures(status), [
    "1 invalid local @tsgo-override entries",
  ]);
});
