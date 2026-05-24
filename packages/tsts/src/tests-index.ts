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

import "./diagnosticwriter/format.test.ts";

// Disabled pending tsonic ICE: "Runtime typeof expression reached emitter -
// validation missed TSN2001" when packagejson uses typeof narrowing on
// JsonValue. See batch 2026-05-24-181000 follow-up.
// import "./packagejson/packagejson.test.ts";

// Disabled pending generator-wide refactor of ast/generated/{kind,schema,nodes}.ts
// to avoid `enum`, `as const`, and other tsonic-rejected patterns:
// import "./config/tsconfig.test.ts";
