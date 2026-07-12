import assert from "node:assert/strict";
import test from "node:test";

import { buildStatus, renderStatusMarkdown } from "../porter.mjs";
import { summarizeSignatureReport } from "../core/signature-command.mjs";
import { baseConfig, fileRecord, snapshotWith, unitRecord } from "./helpers.mjs";

test("renderStatusMarkdown reports largest missing modules from missing rows only", () => {
  const snapshot = snapshotWith([
    fileRecord({
      path: "internal/checker/checker.go",
      units: [unitRecord({
        id: "m::internal/checker/checker.go::func::Implemented",
        kind: "func",
        qualifiedName: "Implemented",
        goPath: "internal/checker/checker.go",
        sigHash: "sig-1",
        bodyHash: "body-1",
      })],
    }),
    fileRecord({
      path: "internal/parser/parser.go",
      units: [unitRecord({
        id: "m::internal/parser/parser.go::func::Missing",
        kind: "func",
        qualifiedName: "Missing",
        goPath: "internal/parser/parser.go",
        sigHash: "sig-2",
        bodyHash: "body-2",
      })],
    }),
  ]);
  const status = buildStatus(baseConfig, snapshot, {
    fileCount: 1,
    files: [{ path: "packages/tsts/src/internal/checker/checker.ts", metadataCount: 1 }],
    units: [{
      id: "m::internal/checker/checker.go::func::Implemented",
      path: "packages/tsts/src/internal/checker/checker.ts",
      status: "implemented",
      sigHash: "sig-1",
      bodyHash: "body-1",
    }],
  });
  const markdown = renderStatusMarkdown(status);

  assert.match(markdown, /\| internal\/parser \| 1 \|/);
  assert.doesNotMatch(markdown, /\| internal\/checker \| 1 \|/);
});

test("signature summaries retain facade and unmatched declaration audit counts", () => {
  const summary = summarizeSignatureReport({
    checked: 4,
    descriptors: 4,
    overriddenUnits: 0,
    mismatches: [],
    overrideIssues: [],
    authoredFacades: { checked: 2, methodBindingCount: 1 },
    untrackedTypeScript: { exportedDeclarationCount: 3, privateDeclarationCount: 5, reExportCount: 7 },
  });
  assert.deepEqual(summary.authoredFacades, { checked: 2, methodBindingCount: 1 });
  assert.deepEqual(summary.untrackedTypeScript, {
    exportedDeclarationCount: 3,
    privateDeclarationCount: 5,
    reExportCount: 7,
  });
});
