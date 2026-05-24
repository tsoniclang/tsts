// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./_smoke.test.ts";
import "./api/binary-protocol.test.ts";
import "./debug/debug.test.ts";
import "./tspath/path.test.ts";
import "./collections/collections.test.ts";

// Disabled by tsonic policy (TSN5001 — open `unknown` carriers for
// JSON.stringify / Array.isArray; codex batch 2026-05-23-065215):
// import "./json/json.test.ts";

import "./semver/version.test.ts";

import "./semver/version_range.test.ts";

import "./jsnum/jsnum.test.ts";

import "./stringutil/stringutil.test.ts";

import "./evaluator/evaluator.test.ts";

import "./module/util.test.ts";

import "./symlinks/symlinks.test.ts";

import "./glob/glob.test.ts";

import "./core/core.test.ts";

import "./core/pattern.test.ts";

// Disabled pending emitter support for object-literal-as-anonymous-interface
// (FileLike/Diagnostic), Dictionary<int, string> CATEGORY_NAMES emission, and
// DiagnosticCategory enum coercion to int (see batch 2026-05-24-125700):
// import "./diagnosticwriter/format.test.ts";
