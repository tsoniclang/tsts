// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./_smoke.test.ts";
import "./api/binary-protocol.test.ts";
import "./collections/collections.test.ts";
import "./core/core.test.ts";
import "./core/pattern.test.ts";
import "./debug/debug.test.ts";
import "./diagnosticwriter/format.test.ts";
import "./evaluator/evaluator.test.ts";
import "./glob/glob.test.ts";
import "./jsnum/jsnum.test.ts";
import "./module/util.test.ts";
import "./packagejson/packagejson.test.ts";
import "./semver/version.test.ts";
import "./semver/version_range.test.ts";
import "./stringutil/stringutil.test.ts";
import "./symlinks/symlinks.test.ts";
import "./tspath/path.test.ts";

// === Disabled tests, batched in tsonic feedback dir 2026-05-26-083500 ===

// Disabled — pulls in api/binary-ast/encoder.ts which uses `value: unknown`
// in isNodeArray; TSTS source needs JsValue swap. Also re-enabling exposes
// the same patterns through compiler/compile.test.ts.
// import "./api/binary-encoder.test.ts";

// Disabled — `Equal<Actual, Expected>` conditional-type identity check
// pattern leaks `unknown` (TSN7414); compile-time-only erasure not honored.
// Filed in batch 2026-05-26-083500 #6.
// import "./ast/generated-types.test.ts";

// Disabled — ast/generated/factory.ts and ast/generated/types.ts use
// intersection types (`NodeArray<T> & {pos,end,...}` / branded `Path`).
// Filed as batch 2026-05-26-083500 #4.
// import "./ast/runtime.test.ts";

// Disabled — binder.ts new Map()/new WeakMap() contextual type-arg
// inference (TSN5202). Filed as batch 2026-05-26-083500 #1.
// import "./binder/binder.test.ts";

// Disabled — checker.ts hits TSN5202 (Map ctor inference) + TSN7414
// (AST union narrowing leak); transitively pulls in compiler internals.
// Filed as batch 2026-05-26-083500 #1 + #3.
// import "./checker/checker.test.ts";

// Disabled — compile.ts depends on api/binary-ast/encoder.ts (unknown→JsValue
// TSTS-side cleanup needed first).
// import "./compiler/compile.test.ts";

// Disabled — config/tsconfig.ts pulls in program → checker → binder →
// ast/generated → parser. All blockers from batch 2026-05-26-083500.
// import "./config/tsconfig.test.ts";

// Disabled — emit-js/printer.ts pulls in parser → ast/generated;
// intersection-types blocker (batch 2026-05-26-083500 #4).
// import "./emit-js/printer.test.ts";

// Disabled — TSN7403 ({} / [] literal at JsValue parameter); filed as
// batch 2026-05-26-083500 #5. Source-side marshal/marshalIndent also missing.
// import "./json/json.test.ts";

// Disabled — parser.ts uses intersection types (`NodeArray<T> & {…}`).
// Filed as batch 2026-05-26-083500 #4.
// import "./parser/parser.test.ts";

// Disabled — program.ts uses Node host APIs (TSN5201/5203) + transitive
// blockers from checker/binder.
// import "./program/program.test.ts";

// Disabled — runner module has no source files (only the test).
// Re-enable when runner is implemented.
// import "./runner/runner.test.ts";

// Disabled — scanner.ts is large; needs probing to surface its blockers
// once intersection-types and Map-ctor are unblocked.
// import "./scanner/scanner.test.ts";

// Disabled — schema-contract.test.ts uses JSON.stringify for deep equality
// of typed shapes; TSN5001 since stringify cannot accept a closed source
// type yet. Source-side mitigation would need per-field comparisons; flagged
// as part of batch 2026-05-26-083500 #5 family (closed-type stringify).
// import "./schema/schema-contract.test.ts";

// Disabled — sourcemap/generator.ts imports `marshal` from json which was
// removed pending JSON.stringify policy. Test also hits intersection types
// and node Buffer API recovery.
// import "./sourcemap/generator.test.ts";
