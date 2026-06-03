/**
 * TS-Go conformance run (node:test entry).
 *
 * This is the corpus-driven side of the test system. It runs the real
 * `CompilerBaselineRunner` over the on-disk TS-Go corpus, compares every
 * generated baseline against the TS-Go reference tree, and writes a divergence
 * report. It is intentionally NOT part of the normal green gate: the report is
 * expected to contain failures until TSTS reaches TS-Go parity. What matters is
 * that the gap is produced as honest data, never hidden.
 *
 * Corpus discovery (see `repo/paths`):
 *   - corpus root  = TSGO_TESTDATA_ROOT ?? <repo>/_submodules/typescript-go/testdata
 *   - reference    = <corpus>/baselines/reference
 *
 * Behavior when the corpus is absent:
 *   - `TSGO_REQUIRED` unset → the test is skipped with a clear message
 *     (this is how `npm run test:tsgo` behaves on a machine without the corpus).
 *   - `TSGO_REQUIRED` set   → `requireTsgoCorpus()` throws the clear message
 *     (this is how `npm run test:tsgo:required` fails fast in CI).
 *
 * Honesty bar: the runner does not hide cases, does not silently skip an
 * unavailable corpus, and does not mark divergence as success. Baseline kinds
 * that have no wired text producer yet are recorded as explicit `unimplemented`
 * divergences (visible in the report), never treated as passing.
 */

import test from "node:test";
import { join } from "node:path";

import { rootPath, testDataPath, tsgoCorpusExists, tsgoReferenceRoot, requireTsgoCorpus } from "../repo/paths.js";
import { type BaselineDiffLists } from "../testutil/baseline/diffParity.js";

import { newBaselineSink, type BaselineTextProducer, type GeneratedBaseline } from "./baselineSink.js";
import { produceBaselineText, UnsupportedBaselineKindError } from "./baselineTextProducer.js";
import {
  CompilerTestType,
  newCompilerBaselineRunner,
  type CompilerBaseline,
  type CompilerRunnerHost,
} from "./compilerRunner.js";
import { newNodeCompilerRunnerHost, type BaselineSink } from "./nodeCompilerRunnerHost.js";
import { DivergenceCollector, formatDivergenceReport, writeDivergenceReport } from "./divergenceReport.js";
import { DiffCategorizer } from "./testCaseParser.js";

const reportDir = join(rootPath(), ".temp", "tsgo-report");

/** Extension a baseline kind would carry, so an unimplemented kind still maps
 * to the TS-Go reference file it diverges from. */
const kindExtension: Record<string, string> = {
  error: ".errors.txt",
  output: ".js",
  sourcemap: ".sourcemap.txt",
  "sourcemap-record": ".sourcemap.txt",
  "types-and-symbols": ".types",
  "module-resolution": ".resolution.txt",
  "union-ordering": ".union-ordering.txt",
  "parent-pointers": ".parent-pointers.txt",
};

const unimplementedMarker = "<tsts: baseline kind not implemented>";

/**
 * Conformance-mode producer: delegates to the real producer and, for any kind
 * without a wired text generator, returns an explicit `unimplemented` artifact
 * so the gap is recorded as a real divergence rather than silently dropped.
 */
function conformanceProducer(baseline: CompilerBaseline): readonly GeneratedBaseline[] {
  try {
    return produceBaselineText(baseline);
  } catch (error) {
    if (error instanceof UnsupportedBaselineKindError) {
      const extension = kindExtension[error.kind] ?? ".unimplemented.txt";
      return [{ kind: `${error.kind} (unimplemented)`, extension, text: unimplementedMarker }];
    }
    throw error;
  }
}

const conformanceProducerRef: BaselineTextProducer = conformanceProducer;

function emptyDiffLists(): BaselineDiffLists {
  return { accepted: new Set(), triaged: new Set() };
}

function runConformanceSuite(): void {
  const categorizer = new DiffCategorizer({ acceptedListPath: "", triagedListPath: "" });
  const collector = new DivergenceCollector(categorizer);
  const sink = newBaselineSink({
    regressionBaselineRoot: join(testDataPath(), "baselines", "reference"),
    conformanceReferenceRoot: tsgoReferenceRoot(),
    regression: false,
    conformance: true,
    diffLists: emptyDiffLists(),
    collector,
    produce: conformanceProducerRef,
  });

  const host = buildHost(sink);
  for (const testType of [CompilerTestType.Conformance, CompilerTestType.Regression]) {
    const runner = newCompilerBaselineRunner(testType, false, host);
    runner.runTests();
  }

  const report = collector.build();
  writeDivergenceReport(report, {
    humanPath: join(reportDir, "divergence.md"),
    machinePath: join(reportDir, "divergence.json"),
  });
  // The report itself is the deliverable; surface the title + summary counts so
  // a CI log shows the gap without having to open the file. The formatted report
  // is `# title`, a blank line, then the `cases=… match=…` summary line.
  const reportLines = formatDivergenceReport(report).split("\n");
  process.stdout.write(`${[reportLines[0], reportLines[2]].filter((line) => line !== undefined).join("\n")}\n`);
}

test("tsgo conformance corpus", { skip: tsgoCorpusExists() ? false : skipReason() }, () => {
  if (!tsgoCorpusExists()) {
    // Only reached when TSGO_REQUIRED forces the test to run without a corpus.
    requireTsgoCorpus();
  }
  runConformanceSuite();
});

function buildHost(sink: BaselineSink): CompilerRunnerHost {
  return newNodeCompilerRunnerHost({ baselineSink: sink });
}

function skipReason(): string | false {
  if (process.env.TSGO_REQUIRED !== undefined && process.env.TSGO_REQUIRED !== "") {
    // Do not skip: the test body calls requireTsgoCorpus() and throws.
    return false;
  }
  return "TS-Go corpus not present (set TSGO_TESTDATA_ROOT or run test:tsgo:required to require it)";
}
