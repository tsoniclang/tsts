// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./smoke.test.js";
import "./api/binaryProtocol.test.js";
import "./collections/collections.test.js";
import "./core/core.test.js";
import "./core/pattern.test.js";
import "./debug/debug.test.js";
import "./diagnosticwriter/format.test.js";
import "./execute/execute.test.js";
import "./evaluator/evaluator.test.js";
import "./glob/glob.test.js";
import "./jsnum/jsnum.test.js";
import "./module/util.test.js";
import "./packagejson/packageJson.test.js";
import "./semver/version.test.js";
import "./semver/versionRange.test.js";
import "./stringutil/stringUtil.test.js";
import "./symlinks/symlinks.test.js";
import "./tspath/path.test.js";

import "./ast/generatedTypes.test.js";
import "./ast/runtime.test.js";
import "./binder/binder.test.js";
import "./checker/checker.test.js";
import "./emit-js/printer.test.js";
import "./parser/parser.test.js";
import "./program/program.test.js";
import "./scanner/scanner.test.js";
import "./scanner/regexp.test.js";
import "./json/json.test.js";
import "./ls/diagnostics.test.js";
import "./ls/lsconv/lineMap.test.js";

// === Still disabled (TSTS source incompleteness; not tsonic blockers) ===

// Disabled — pulls in api/binary-ast/encoder.ts which uses `value: unknown`
// in isNodeArray (TSN5001). Codex explicitly decided not to fix
// Array.isArray(unknown); TSTS source needs JsValue migration first.
// import "./api/binaryEncoder.test.ts";

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
// import "./schema/schemaContract.test.ts";

// Disabled — sourcemap/generator.ts imports `marshal` from json/index.js
// which was removed pending JSON.stringify policy; also pulls Buffer Node
// API recovery.
// import "./sourcemap/generator.test.ts";
