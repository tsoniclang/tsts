import test from "node:test";
import assert from "node:assert/strict";

import type { BaselineDiff, BaselineDiffKind } from "../testutil/baseline/diffParity.js";
import { classifyBaselineDiff, normalizeBaselineText } from "../testutil/baseline/diffParity.js";

import { DivergenceCollector, formatDivergenceReport, type ChannelSummary, type DivergenceEntry } from "./divergenceReport.js";
import { DiffCategorizer } from "./testCaseParser.js";

/**
 * Empty accepted/triaged lists: the categorizer then maps every non-equal diff
 * to `new`/`changed` purely from its kind, so the synthetic entries below drive
 * the metrics deterministically without touching the file system.
 */
function categorizer(): DiffCategorizer {
  return new DiffCategorizer({ acceptedListPath: "", triagedListPath: "" });
}

function diff(path: string, kind: BaselineDiffKind): BaselineDiff {
  return { path, kind };
}

function entry(caseName: string, kind: string, diffKind: BaselineDiffKind): DivergenceEntry {
  return { caseName, kind, regression: "absent", diff: diff(`${caseName}.${kind}`, diffKind) };
}

/**
 * A `changed` entry that carries expected/actual diff text, so the cluster
 * signature derivation has something to read.
 */
function changedEntry(caseName: string, kind: string, expected: string, actual: string): DivergenceEntry {
  return {
    caseName,
    kind,
    regression: "absent",
    diff: { path: `${caseName}.${kind}`, kind: "changed", expected, actual },
  };
}

function channel(channels: readonly ChannelSummary[], name: string): ChannelSummary {
  const found = channels.find((row) => row.channel === name);
  assert.ok(found !== undefined, `expected a channelSummary row for '${name}'`);
  return found;
}

test("computes strict and implemented case-match metrics across channels", () => {
  const collector = new DivergenceCollector(categorizer());

  // Case A: every implemented channel matches, no unimplemented channel.
  collector.record(entry("caseA", "error", "equal"));
  collector.record(entry("caseA", "output", "equal"));

  // Case B: implemented channels match, but one channel is unimplemented.
  collector.record(entry("caseB", "error", "equal"));
  collector.record(entry("caseB", "output", "equal"));
  collector.record(entry("caseB", "types-and-symbols (unimplemented)", "missing"));

  // Case C: an implemented channel diverges.
  collector.record(entry("caseC", "error", "equal"));
  collector.record(entry("caseC", "output", "changed"));

  // Case D: compile-failed is an implemented channel that does not match.
  collector.record(entry("caseD", "output (compile-failed)", "changed"));

  const report = collector.build();

  assert.strictEqual(report.summary.cases, 4);
  // Only case A matches every channel (B has an unimplemented channel).
  assert.strictEqual(report.summary.strictCaseMatch, 1);
  // A and B match across implemented channels; B's unimplemented channel is excluded.
  assert.strictEqual(report.summary.implementedCaseMatch, 2);
});

test("aggregates per-channel counts and keeps unimplemented channels visible", () => {
  const collector = new DivergenceCollector(categorizer());

  collector.record(entry("caseA", "error", "equal"));
  collector.record(entry("caseA", "output", "equal"));
  collector.record(entry("caseB", "error", "equal"));
  collector.record(entry("caseB", "output", "equal"));
  collector.record(entry("caseB", "types-and-symbols (unimplemented)", "missing"));
  collector.record(entry("caseC", "error", "equal"));
  collector.record(entry("caseC", "output", "changed"));
  collector.record(entry("caseD", "output (compile-failed)", "changed"));

  const channels = collector.build().channelSummary;

  const errorChannel = channel(channels, "error");
  assert.strictEqual(errorChannel.implemented, true);
  assert.strictEqual(errorChannel.compared, 3);
  assert.strictEqual(errorChannel.match, 3);
  assert.strictEqual(errorChannel.changed, 0);
  assert.strictEqual(errorChannel.unimplemented, 0);

  const outputChannel = channel(channels, "output");
  assert.strictEqual(outputChannel.implemented, true);
  // A(equal) + B(equal) + C(changed) + D(compile-failed→changed).
  assert.strictEqual(outputChannel.compared, 4);
  assert.strictEqual(outputChannel.match, 2);
  assert.strictEqual(outputChannel.changed, 2);
  assert.strictEqual(outputChannel.unimplemented, 0);

  const typesChannel = channel(channels, "types-and-symbols");
  assert.strictEqual(typesChannel.implemented, false);
  assert.strictEqual(typesChannel.compared, 0);
  assert.strictEqual(typesChannel.unimplemented, 1);
});

test("counts new and missing diffs into their own channel columns", () => {
  const collector = new DivergenceCollector(categorizer());
  collector.record(entry("caseA", "output", "new"));
  collector.record(entry("caseB", "output", "missing"));

  const outputChannel = channel(collector.build().channelSummary, "output");
  assert.strictEqual(outputChannel.compared, 2);
  assert.strictEqual(outputChannel.new, 1);
  assert.strictEqual(outputChannel.missing, 1);
  assert.strictEqual(outputChannel.match, 0);
  assert.strictEqual(outputChannel.changed, 0);
});

test("renders strict/implemented metrics and the channel table in the human report", () => {
  const collector = new DivergenceCollector(categorizer());
  collector.record(entry("caseA", "error", "equal"));
  collector.record(entry("caseA", "types-and-symbols (unimplemented)", "missing"));

  const text = formatDivergenceReport(collector.build());

  assert.match(text, /strictCaseMatch=0\/1/);
  assert.match(text, /implementedCaseMatch=1\/1/);
  assert.match(text, /## channel summary/);
  assert.match(text, /channel\s+implemented\s+compared\s+match\s+changed\s+new\s+missing\s+unimplemented/);
  // The unimplemented channel must remain a visible row, not be dropped.
  assert.match(text, /types-and-symbols\s+no\s+0/);
});

test("ranks the top changed channels by changed count", () => {
  const collector = new DivergenceCollector(categorizer());
  // error: 1 changed; output: 2 changed.
  collector.record(entry("caseA", "error", "changed"));
  collector.record(entry("caseA", "output", "changed"));
  collector.record(entry("caseB", "output", "changed"));
  collector.record(entry("caseC", "output", "equal"));

  const { topChangedChannels } = collector.build().clusters;

  assert.deepStrictEqual(
    topChangedChannels.map((channel) => [channel.channel, channel.changed]),
    [
      ["output", 2],
      ["error", 1],
    ],
  );
});

test("clusters .errors divergences by leading TS error code", () => {
  const collector = new DivergenceCollector(categorizer());
  collector.record(changedEntry("caseA", "error", "", "a.ts(1,1): error TS2322: Type mismatch."));
  collector.record(changedEntry("caseB", "error", "", "b.ts(2,2): error TS2322: Other mismatch."));
  collector.record(changedEntry("caseC", "error", "", "c.ts(3,3): error TS2345: Argument mismatch."));

  const { errorClusters } = collector.build().clusters;

  assert.strictEqual(errorClusters.available, true);
  assert.strictEqual(errorClusters.rows.length, 2);
  // TS2322 has two cases and ranks above TS2345's single case.
  assert.deepStrictEqual(
    errorClusters.rows.map((row) => [row.signature, row.count]),
    [
      ["TS2322", 2],
      ["TS2345", 1],
    ],
  );
});

test("clusters .js divergences by first differing line signature", () => {
  const collector = new DivergenceCollector(categorizer());
  collector.record(changedEntry("caseA", "output", "var x = 1;\n", "let x = 1;\n"));
  collector.record(changedEntry("caseB", "output", "var y = 1;\n", "var y = 1;\nextra();\n"));

  const { outputClusters } = collector.build().clusters;

  assert.strictEqual(outputClusters.available, true);
  assert.strictEqual(outputClusters.rows.length, 2);
  const signatures = outputClusters.rows.map((row) => row.signature);
  assert.ok(signatures.includes("-var x = 1;/+let x = 1;"));
  assert.ok(signatures.includes("-/+extra();"));
});

test("reports clustering unavailable when changed entries lack diff text", () => {
  const collector = new DivergenceCollector(categorizer());
  // A `changed` output entry with no expected/actual text recorded.
  collector.record(entry("caseA", "output", "changed"));

  const report = collector.build();
  assert.strictEqual(report.clusters.outputClusters.available, false);
  assert.strictEqual(report.clusters.outputClusters.rows.length, 0);

  const text = formatDivergenceReport(report);
  assert.match(text, /clustering not available \(entries lack diff text\)/);
});

test("renders the top-cluster section in the human report", () => {
  const collector = new DivergenceCollector(categorizer());
  collector.record(changedEntry("caseA", "error", "", "a.ts(1,1): error TS2322: Type mismatch."));
  collector.record(changedEntry("caseB", "output", "var x = 1;\n", "let x = 1;\n"));

  const text = formatDivergenceReport(collector.build());

  assert.match(text, /## top clusters/);
  assert.match(text, /top changed channels \(by changed count\):/);
  assert.match(text, /top \.js \(output\) clusters:/);
  assert.match(text, /top \.errors \(error\) clusters:/);
  assert.match(text, /TS2322/);
});

test("CRLF and LF text compare equal in the normalized diff layer", () => {
  // diffParity.normalizeBaselineText is the single normalization point used by
  // classifyBaselineDiff's equal check; confirm CRLF/LF parity stays there.
  assert.strictEqual(normalizeBaselineText("a\r\nb\r\n"), normalizeBaselineText("a\nb\n"));
  const lists = { accepted: new Set<string>(), triaged: new Set<string>() };
  assert.strictEqual(classifyBaselineDiff("foo.js", "a\r\nb\r\n", "a\nb\n", lists), "equal");
});
