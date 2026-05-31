// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./_smoke.test.js";
import "./api/binary-protocol.test.js";
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
import "./packagejson/packagejson.test.js";
import "./semver/version.test.js";
import "./semver/version_range.test.js";
import "./stringutil/stringutil.test.js";
import "./symlinks/symlinks.test.js";
import "./tspath/path.test.js";

import "./ast/generated-types.test.js";
import "./ast/runtime.test.js";
import "./binder/binder.test.js";
import "./checker/checker.test.js";
import "./emit-js/printer.test.js";
import "./parser/parser.test.js";
import "./program/program.test.js";
import "./scanner/scanner.test.js";
import "./json/json.test.js";

// === Additional modules now mechanically re-enabled ===

import "./api/binary-encoder.test.js";

import "./compiler/compile.test.js";

import "./config/tsconfig.test.js";

import "./runner/runner.test.js";

import "./schema/schema-contract.test.js";

import "./sourcemap/generator.test.js";
