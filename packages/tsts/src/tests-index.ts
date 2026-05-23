// Test entry point.
// Side-effect imports register each xUnit class via the attributes API.

import "./_smoke.test.ts";
import "./api/binary-protocol.test.ts";
import "./debug/debug.test.ts";

// Disabled pending tsonic fixes (TSN5107: string index with `number`):
// import "./tspath/path.test.ts";

// Disabled pending tsonic fixes (CS8978/CS0030/CS0029 collections emitter):
// import "./collections/collections.test.ts";
