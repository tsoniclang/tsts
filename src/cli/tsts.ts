#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { compileSource } from "../compiler/index.js";

interface CliOptions {
  readonly inputFile: string;
  readonly outFile?: string;
}

function parseArgs(argv: readonly string[]): CliOptions {
  let inputFile: string | undefined;
  let outFile: string | undefined;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]!;
    if (arg === "--outFile") {
      outFile = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unsupported option ${arg}`);
    }
    if (inputFile !== undefined) {
      throw new Error(`Unexpected extra input ${arg}`);
    }
    inputFile = arg;
  }
  if (inputFile === undefined) {
    throw new Error("Usage: tsts <input.ts> [--outFile output.js]");
  }
  return outFile === undefined ? { inputFile } : { inputFile, outFile };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const sourceText = await readFile(options.inputFile, "utf8");
  const result = compileSource(sourceText, { fileName: basename(options.inputFile) });
  if (options.outFile === undefined) {
    process.stdout.write(result.javascript);
    process.stdout.write("\n");
    return;
  }
  await writeFile(options.outFile, `${result.javascript}\n`);
}

await main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
