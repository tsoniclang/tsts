// run-checker.mjs — committed executing gate for the checker Fact suite (M5a,
// codex-041455).
//
// WHY THIS EXISTS: src/checker/checker.test.ts (CheckerGroundworkTests) is the
// checker's behavioral conformance suite, but it was only ever EXECUTED by
// throwaway .temp scripts (the gitignored verify.mjs). M5a swaps the checker's
// VALUE/module/export name resolution from the string-keyed TypeEnvironment
// substitution to the real binder symbol graph (bind-before-check →
// NameResolver.resolve → getTypeOfSymbol flag-dispatch). That behavior change
// MUST be guarded by COMMITTED assertions. This runner is the committed gate
// that actually EXECUTES the suite (including the two M5a resolution examples),
// mirroring tools/binder/run-binder.mjs.
//
// HOW IT RUNS: checker.test.ts imports xunit-types / @tsonic specifiers that do
// not resolve under plain node; invoke this with the committed shim loader:
//
//   node --import ./packages/tsts/tools/checker/shim-loader.mjs \
//        ./packages/tsts/tools/checker/run-checker.mjs [jsoutDir]
//
// after the standard re-emit to .temp/jsout. jsoutDir defaults to the repo-root
// .temp/jsout (derived from this file's location). It reflects each test class's
// prototype, runs every zero-arg method in try/catch, counts pass/fail, prints
// "N passed, N failed", and EXITS NONZERO on any failure.

import { pathToFileURL } from "node:url";
import { resolve as resolvePath, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const thisDir = dirname(fileURLToPath(import.meta.url));
// <root>/packages/tsts/tools/checker/ → repo root is 4 levels up.
const repoRoot = resolvePath(thisDir, "..", "..", "..", "..");
const jsoutDir = process.argv[2] ?? resolvePath(repoRoot, ".temp", "jsout");

const suites = [
  { className: "CheckerGroundworkTests", file: "src/checker/checker.test.js" },
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

  for (const r of passed) console.log("PASS " + r.id);
  for (const r of failed) console.log("FAIL " + r.id + " -> " + r.error);

  console.log("");
  console.log(passed.length + " passed, " + failed.length + " failed (of " + allResults.length + " methods)");

  process.exit(failed.length > 0 ? 1 : 0);
};

main().catch((e) => {
  console.error(e);
  process.exit(3);
});
