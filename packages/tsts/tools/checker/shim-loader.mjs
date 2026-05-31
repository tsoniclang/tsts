// Committed checker-gate scaffolding (M5a). Registers the shim-resolve hook so
// the compiled checker.test.js probe can import xunit-types / @tsonic specifiers
// under plain node. Use as:
//   node --import <this> run-checker.mjs [jsoutDir]
import { register } from "node:module";
register("./shim-resolve.mjs", import.meta.url);
