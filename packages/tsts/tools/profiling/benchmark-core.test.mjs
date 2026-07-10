import assert from "node:assert/strict";
import test from "node:test";

import {
  aggregateSamples,
  buildInterleavedSchedule,
  dispersion,
  evaluatePerformanceGate,
  exactWorkReceipt,
  parseExtendedDiagnostics,
  parseVerboseTime,
} from "./benchmark-core.mjs";

const metrics = ["Files", "Lines", "Parse", "Bind", "Check", "Total", "MemReportedKB", "wallSecs", "userSecs", "systemSecs", "cpuSecs", "cpuPercent", "maxRssKB"];

test("extended diagnostics require and sum every declared work category", () => {
  const result = parseExtendedDiagnostics(`Files: 4
Lines of Library: 10
Lines of Definitions: 20
Lines of TypeScript: 30
Parse time: 0.10s
Bind time: 0.20s
Check time: 0.30s
Emit time: 0.40s
Total time: 1.00s
Memory used: 123K
`);
  assert.deepEqual(result, { Parse: 0.1, Bind: 0.2, Check: 0.3, Emit: 0.4, Files: 4, Lines: 60, Total: 1, MemReportedKB: 123 });
});

test("GNU time parsing preserves wall, CPU, utilization, and RSS", () => {
  assert.deepEqual(parseVerboseTime(`User time (seconds): 1.25
System time (seconds): 0.25
Percent of CPU this job got: 150%
Elapsed (wall clock) time (h:mm:ss or m:ss): 0:01.00
Maximum resident set size (kbytes): 4096
`), { wallSecs: 1, userSecs: 1.25, systemSecs: 0.25, cpuSecs: 1.5, cpuPercent: 150, maxRssKB: 4096 });
});

test("aggregation is fail-closed and reports robust dispersion", () => {
  const samples = [sample(1), sample(2), sample(3), sample(4), sample(5)];
  const aggregate = aggregateSamples(samples, metrics);
  assert.deepEqual(aggregate.Parse, {
    count: 5,
    min: 1,
    max: 5,
    mean: 3,
    median: 3,
    standardDeviation: Math.sqrt(2.5),
    medianAbsoluteDeviation: 1,
    coefficientOfVariation: Math.sqrt(2.5) / 3,
  });
  assert.equal(dispersion([2, 2, 2]).coefficientOfVariation, 0);
  const incomplete = { ...samples[0] };
  delete incomplete.Bind;
  assert.throws(() => aggregateSamples([incomplete], metrics), /valid Bind metric/);
});

test("schedule rotates compilers across explicit warmup and measured rounds", () => {
  const schedule = buildInterleavedSchedule({ projectNames: ["one"], compilerIds: ["tsts", "tsgo", "tsc"], systemCacheWarmupRounds: 1, measuredRounds: 2 });
  assert.equal(schedule.length, 9);
  assert.deepEqual(schedule.slice(0, 3).map((entry) => entry.compiler), ["tsts", "tsgo", "tsc"]);
  assert.deepEqual(schedule.slice(3, 6).map((entry) => entry.compiler), ["tsgo", "tsc", "tsts"]);
  assert.deepEqual(schedule.slice(6, 9).map((entry) => entry.compiler), ["tsc", "tsts", "tsgo"]);
  assert.deepEqual(schedule.map((entry) => entry.ordinal), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test("equivalent-work receipt rejects compiler or round drift", () => {
  const byCompiler = Object.fromEntries(["tsts", "tsgo", "tsc"].map((compiler) => [compiler, {
    systemCacheWarmupSamples: [sample(1)],
    measuredSamples: [sample(2)],
  }]));
  assert.deepEqual(exactWorkReceipt(byCompiler, ["Files", "Lines"]), { Files: 20, Lines: 200 });
  byCompiler.tsgo.measuredSamples[0].Lines = 201;
  assert.throws(() => exactWorkReceipt(byCompiler, ["Files", "Lines"]), /non-equivalent work for Lines/);
});

test("baseline gate checks both regression and current/baseline dispersion", () => {
  const aggregate = (median, coefficientOfVariation) => ({ median, coefficientOfVariation });
  const currentReport = { results: [{ name: "fixture", byCompiler: { tsts: { aggregate: { wallSecs: aggregate(12, 0.20) } } } }] };
  const baselineReport = { results: [{ name: "fixture", byCompiler: { tsts: { aggregate: { wallSecs: aggregate(10, 0.01) } } } }] };
  const policy = { gatedMetrics: ["wallSecs"], limits: { wallSecs: { maxRegressionRatio: 1.1, maxCoefficientOfVariation: 0.1 } } };
  assert.deepEqual(evaluatePerformanceGate({ currentReport, baselineReport, policy }), [
    "fixture/wallSecs: current coefficientOfVariation=0.2 limit=0.1",
    "fixture/wallSecs: regressionRatio=1.2 limit=1.1",
  ]);
});

function sample(value) {
  return {
    Files: 20,
    Lines: 200,
    Parse: value,
    Bind: value,
    Check: value,
    Total: value,
    MemReportedKB: 100 + value,
    wallSecs: value,
    userSecs: value,
    systemSecs: value,
    cpuSecs: value * 2,
    cpuPercent: 100,
    maxRssKB: 1000 + value,
  };
}
