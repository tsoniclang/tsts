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

// TSGO-DIVERGENCE probes: known to FAIL against the current pre-scan parser.
// They encode the TSGO-CORRECT value and are expected to pass only after the
// parser is fixed (4b-swap). If one of these PASSES now, the gate flags it as an
// XPASS (the bug was fixed early → prune this list in that wave).
//
// Two divergence classes:
//  (a) nested generic closers — #expectGreaterThan splits `>>`/`>>>` WITHOUT
//      advancing #index, leaving the inner TypeReference end off-by-one (inner
//      B<C> end is 14 "B<C" instead of tsgo-correct 15 "B<C>"). The live scanner's
//      reScanGreaterThanToken is expected to fix this in 4b-swap.
//  (b) `**` associativity — the binary loop (parser.ts ~1519) treats EVERY operator
//      as left-associative (`operatorPrecedence <= precedence`), so `a**b**c` parses
//      as `(a**b)**c` instead of the tsgo-correct right-associative `a**(b**c)`.
//      tsgo strictly-less-thans only for the right-associative `**`. This is a real
//      parser bug independent of the scanner swap; the probe pins the tsgo-correct
//      right-assoc shape so the fix is gated.
const KNOWN_DIVERGENCE_FAILURES = new Set([
  // (a) existing probe in position.test.ts (asserts inner B<C> end == 15)
  "ParserPositionTests.nested_generic_type_arguments_split_greater_than",
  // (a) new parity probes (assert tsgo-correct nested-generic ends)
  "ParserParityTests.nested_generic_double_closer_tsgo_correct",
  "ParserParityTests.nested_generic_triple_closer_tsgo_correct",
  // (b) `**` right-associativity (a**b**c -> a**(b**c))
  "ParserParityTests.precedence_exponent_right_assoc",
]);

const thisDir = dirname(fileURLToPath(import.meta.url));
// <root>/packages/tsts/tools/parser-positions/ → repo root is 4 levels up.
const repoRoot = resolvePath(thisDir, "..", "..", "..", "..");
const jsoutDir = process.argv[2] ?? resolvePath(repoRoot, ".temp", "jsout");

const suites = [
  { className: "ParserPositionTests", file: "src/parser/position.test.js" },
  { className: "ParserParityTests", file: "src/parser/parser-parity.test.js" },
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
