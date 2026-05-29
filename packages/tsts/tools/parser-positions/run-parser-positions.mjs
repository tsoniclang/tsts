// run-parser-positions.mjs — committed executing gate for the parser position +
// parse-parity probe suites (wave 4b-prep).
//
// WHY THIS EXISTS: the ~124 ParserPositionTests probes in src/parser/position.test.ts
// compile into jsout but were NOT run by any committed gate — only by throwaway
// .temp/jsout/run-*.mjs scripts. The new ParserParityTests probes in
// src/parser/parser-parity.test.ts would be inert the same way. This runner is the
// committed gate that actually EXECUTES both suites, so the 4b-swap (parser → live
// scanner) is gated by real assertions, not compiled-but-unrun dead tests.
//
// HOW IT RUNS: the *.test.ts files import xunit-types / @tsonic specifiers that do
// not resolve under plain node; invoke this with the committed shim loader:
//
//   node --import ./packages/tsts/tools/parser-positions/shim-loader.mjs \
//        ./packages/tsts/tools/parser-positions/run-parser-positions.mjs [jsoutDir]
//
// after the standard re-emit to .temp/jsout. jsoutDir defaults to the repo-root
// .temp/jsout (derived from this file's location). It reflects each test class's
// prototype, runs every zero-arg method in try/catch, counts pass/fail, prints
// "N passed, N failed", and EXITS NONZERO unless the only failures are the
// explicitly-flagged tsgo divergences listed below (which fail on the CURRENT
// pre-scan parser and are expected to FLIP GREEN once 4b-swap lands).

import { pathToFileURL } from "node:url";
import { resolve as resolvePath, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// TSGO-DIVERGENCE probes: historically FAILED against the pre-scan parser and
// encoded the TSGO-CORRECT value, flipping green once the parser was fixed.
// As of the 4b-swap (parser → live scanner) ALL of them now PASS:
//  (a) nested generic closers — the live scanner emits a single GreaterThanToken
//      per `>`, so #expectGreaterThan consumes one real `>` (no array-mutation
//      off-by-one); inner `B<C>` ends at the first `>` (index 15).
//  (b) `**` right-associativity — the binary loop now consumes `**` at EQUAL
//      precedence (`a**b**c` -> `a**(b**c)`), all other ops unchanged.
// The set is therefore empty: every probe is a real (non-divergence) assertion.
const KNOWN_DIVERGENCE_FAILURES = new Set([]);

const thisDir = dirname(fileURLToPath(import.meta.url));
// <root>/packages/tsts/tools/parser-positions/ → repo root is 4 levels up.
const repoRoot = resolvePath(thisDir, "..", "..", "..", "..");
const jsoutDir = process.argv[2] ?? resolvePath(repoRoot, ".temp", "jsout");

const suites = [
  { className: "ParserPositionTests", file: "src/parser/position.test.js" },
  { className: "ParserParityTests", file: "src/parser/parser-parity.test.js" },
  { className: "ScannerGroundworkTests", file: "src/scanner/scanner.test.js" },
];

const runMethods = (instance, className) => {
  const proto = Object.getPrototypeOf(instance);
  const names = Object.getOwnPropertyNames(proto).filter(
    (n) => n !== "constructor" && typeof instance[n] === "function",
  );
  const results = [];
  for (const name of names) {
    const id = className + "." + name;
    try {
      instance[name]();
      results.push({ id, name, ok: true, error: undefined });
    } catch (e) {
      results.push({ id, name, ok: false, error: e && e.message ? e.message : String(e) });
    }
  }
  return results;
};

const main = async () => {
  const allResults = [];
  for (const suite of suites) {
    const url = pathToFileURL(resolvePath(jsoutDir, suite.file)).href;
    const mod = await import(url);
    const Ctor = mod[suite.className];
    if (typeof Ctor !== "function") {
      console.error("MISSING class " + suite.className + " in " + suite.file);
      process.exit(2);
    }
    const instance = new Ctor();
    allResults.push(...runMethods(instance, suite.className));
  }

  const passed = allResults.filter((r) => r.ok);
  const failed = allResults.filter((r) => !r.ok);

  const unexpectedFailures = failed.filter((r) => !KNOWN_DIVERGENCE_FAILURES.has(r.id));
  const expectedFailures = failed.filter((r) => KNOWN_DIVERGENCE_FAILURES.has(r.id));
  const unexpectedPasses = passed.filter((r) => KNOWN_DIVERGENCE_FAILURES.has(r.id));

  for (const r of unexpectedFailures) console.log("FAIL " + r.id + " -> " + r.error);
  for (const r of expectedFailures) {
    console.log("XFAIL (tsgo-divergence, expected on current parser) " + r.id + " -> " + r.error);
  }
  for (const r of unexpectedPasses) {
    console.log("XPASS (tsgo-divergence unexpectedly green; 4b-swap may have landed) " + r.id);
  }

  console.log("");
  console.log(passed.length + " passed, " + failed.length + " failed (of " + allResults.length + " methods)");
  console.log(
    expectedFailures.length + " expected tsgo-divergence failures, " +
    unexpectedFailures.length + " unexpected failures, " +
    unexpectedPasses.length + " unexpected divergence passes",
  );

  // Gate fails ONLY on unexpected failures (real regressions). Unexpected passes
  // of divergence probes are reported but do NOT fail the gate — they indicate
  // 4b-swap fixed the bug, at which point the KNOWN_DIVERGENCE_FAILURES list
  // should be pruned in that wave.
  if (unexpectedFailures.length > 0) {
    process.exit(1);
  }
  process.exit(0);
};

main().catch((e) => {
  console.error(e);
  process.exit(3);
});
