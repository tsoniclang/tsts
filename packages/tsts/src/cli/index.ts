#!/usr/bin/env node
/**
 * Executable shim for the standalone TSTS CLI.
 *
 * This is the file the `bin` entry points at. It only wires the real
 * `process` argv to {@link main}; all parsing, compilation, and diagnostic
 * formatting live in `./main.js`, which stays free of top-level side
 * effects so it can be unit-tested directly.
 */

import { main } from "./main.js";

main(process.argv.slice(2));
