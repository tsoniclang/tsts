#!/usr/bin/env node
import { runBenchmarkCli } from "./bench.mjs";

await runBenchmarkCli(process.argv.slice(2));
