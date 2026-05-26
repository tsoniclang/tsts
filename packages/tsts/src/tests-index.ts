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

// === Still blocked. ===
// Tsonic 4376d7f0 "Fix TSTS blocker compiler gaps" landed at 14:06 but
// did NOT address the batch 114500 residuals — re-running the trial
// enable at 14:25 reproduced the same errors verbatim:
//   - checker.ts TSN5202 on `new Map(environment)` field-init pattern
//   - checker.ts TSN7414 narrowing for union members 50-52 + initializer
//     unknown leak
//   - json.test.ts TSN5201 on call-site return-type recovery in
//     xUnit method bodies
// Re-enable once batch 114500 actually clears.
// See /home/jeswin/repos/tsoniclang/tsonic/.analysis/claude-code-feedback/2026-05-26-114500/
//
// import "./ast/generated-types.test.ts";
// import "./ast/runtime.test.ts";
// import "./binder/binder.test.ts";
// import "./checker/checker.test.ts";
// import "./emit-js/printer.test.ts";
// import "./parser/parser.test.ts";
// import "./program/program.test.ts";
// import "./scanner/scanner.test.ts";
// import "./json/json.test.ts";

// === Still disabled (TSTS source incompleteness; not tsonic blockers) ===

// Disabled — pulls in api/binary-ast/encoder.ts which uses `value: unknown`
// in isNodeArray (TSN5001). Codex explicitly decided not to fix
// Array.isArray(unknown); TSTS source needs JsValue migration first.
// import "./api/binary-encoder.test.ts";

// Disabled — compile.ts depends on api/binary-ast/encoder.ts (same
// TSN5001 blocker as above).
// import "./compiler/compile.test.ts";

// Disabled — config/tsconfig.ts pulls in compile.ts via cascade.
// Re-enable once compiler/compile.test.ts is enabled.
// import "./config/tsconfig.test.ts";

// Disabled — runner module has no source files (only the test).
// Re-enable when runner is implemented.
// import "./runner/runner.test.ts";

// Disabled — schema-contract.test.ts uses JSON.stringify(NodeMembersByName.X)
// for deep-shape equality, which trips TSN5001 (closed-type stringify).
// Rewrite with per-field assertions before re-enabling.
// import "./schema/schema-contract.test.ts";

// Disabled — sourcemap/generator.ts imports `marshal` from json/index.js
// which was removed pending JSON.stringify policy; also pulls Buffer Node
// API recovery.
// import "./sourcemap/generator.test.ts";
