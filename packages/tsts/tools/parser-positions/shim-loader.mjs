// Committed test scaffolding (wave 4b-prep). Registers the shim-resolve hook so
// the compiled *.test.js probes can import xunit-types / @tsonic specifiers under
// plain node. Use as: node --import <this> run-parser-positions.mjs [jsoutDir].
import { register } from "node:module";
register("./shim-resolve.mjs", import.meta.url);
