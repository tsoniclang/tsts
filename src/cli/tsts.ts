#!/usr/bin/env node
import { createNodeCompilerHost, createProgram, emitProgram } from "../program/index.js";

interface CliOptions {
  readonly inputFiles: readonly string[];
  readonly outFile?: string;
  readonly outDir?: string;
}

function parseArgs(argv: readonly string[]): CliOptions {
  const inputFiles: string[] = [];
  let outFile: string | undefined;
  let outDir: string | undefined;
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]!;
    if (arg === "--outFile") {
      outFile = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--outDir") {
      outDir = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unsupported option ${arg}`);
    }
    inputFiles.push(arg);
  }
  if (inputFiles.length === 0) {
    throw new Error("Usage: tsts <input.ts> [...more.ts] [--outFile output.js] [--outDir dist]");
  }
  if (outFile !== undefined && inputFiles.length !== 1) {
    throw new Error("--outFile requires exactly one input file");
  }
  return {
    inputFiles,
    ...(outFile === undefined ? {} : { outFile }),
    ...(outDir === undefined ? {} : { outDir }),
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const host = createNodeCompilerHost();
  const program = createProgram(options.inputFiles, options.outDir === undefined ? {} : { outDir: options.outDir }, host);
  const result = emitProgram(program, options.outFile === undefined && options.outDir === undefined && options.inputFiles.length === 1 ? undefined : host);
  if (result.diagnostics.length > 0) {
    for (const diagnostic of result.diagnostics) {
      process.stderr.write(`${diagnostic.fileName}: ${diagnostic.message}\n`);
    }
    process.exitCode = 1;
    return;
  }
  if (options.outFile !== undefined) {
    host.writeFile!(options.outFile, `${result.emittedFiles[0]!.text}\n`);
    return;
  }
  if (options.outDir === undefined && options.inputFiles.length === 1) {
    process.stdout.write(result.emittedFiles[0]!.text);
    process.stdout.write("\n");
  }
}

await main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
