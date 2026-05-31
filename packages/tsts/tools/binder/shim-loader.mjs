// Committed binder-gate scaffolding (M4b). Registers the shim-resolve hook so
// the compiled binder.test.js probe can import xunit-types / @tsonic specifiers
// under plain node. Use as:
//   node --import <this> run-binder.mjs [jsoutDir]
import { register } from "node:module";
register("./shim-resolve.mjs", import.meta.url);
