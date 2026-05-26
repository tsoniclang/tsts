// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./_smoke.test.ts";
import "./api/binary-protocol.test.ts";
import "./debug/debug.test.ts";
import "./tspath/path.test.ts";
import "./collections/collections.test.ts";

// Disabled — json.ts source removed marshal/marshalIndent pending tsonic
// JSON.stringify(JsonValue) policy resolution.
// Also blocked by tsonic emitting TSN7403 for `{}` / `[]` literals passed
// to functions whose parameter type is the dynamic JsValue carrier; new
// batch 2026-05-26-083500 filed.
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
import "./packagejson/packagejson.test.ts";

// Disabled pending tsonic batch 2026-05-26-083500:
//   - TSN5202 (binder/checker explicit constructor type args)
//   - TSN5201/TSN5203 (program/node-host method return + property types)
//   - TSN7414 (checker.ts `unknown` narrowing leak)
//   - TSN7414 (intersection types in ast/generated, parser)
// import "./config/tsconfig.test.ts";
