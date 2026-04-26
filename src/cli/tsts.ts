#!/usr/bin/env node
import { createNodeCompilerHost, createProgram, emitProgram } from "../program/index.js";
import { loadTsConfig } from "../config/index.js";

interface CliOptions {
  readonly inputFiles: readonly string[];
  readonly outFile?: string;
  readonly outDir?: string;
  readonly project?: string;
}

function parseArgs(argv: readonly string[]): CliOptions {
  const inputFiles: string[] = [];
  let outFile: string | undefined;
  let outDir: string | undefined;
  let project: string | undefined;
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
    if (arg === "--project" || arg === "-p") {
      project = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unsupported option ${arg}`);
    }
    inputFiles.push(arg);
  }
  if (inputFiles.length === 0 && project === undefined) {
    throw new Error("Usage: tsts <input.ts> [...more.ts] [--outFile output.js] [--outDir dist] or tsts --project tsconfig.json");
  }
  if (outFile !== undefined && inputFiles.length !== 1) {
    throw new Error("--outFile requires exactly one input file");
  }
  if (project !== undefined && inputFiles.length > 0) {
    throw new Error("--project cannot be combined with input files");
  }
  return {
    inputFiles,
    ...(outFile === undefined ? {} : { outFile }),
    ...(outDir === undefined ? {} : { outDir }),
    ...(project === undefined ? {} : { project }),
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const host = createNodeCompilerHost();
  const projectConfig = options.project === undefined ? undefined : loadTsConfig(options.project, host);
  if (projectConfig?.diagnostics.length) {
    for (const diagnostic of projectConfig.diagnostics) {
      process.stderr.write(`${diagnostic.fileName}: ${diagnostic.message}\n`);
    }
    process.exitCode = 1;
    return;
  }
  const rootNames = projectConfig?.config?.rootNames ?? options.inputFiles;
  const compilerOptions = {
    ...(projectConfig?.config?.options ?? {}),
    ...(options.outDir === undefined ? {} : { outDir: options.outDir }),
  };
  const program = createProgram(rootNames, compilerOptions, host);
  const shouldPrintSingleFile = options.outFile === undefined && compilerOptions.outDir === undefined && rootNames.length === 1 && options.project === undefined;
  const result = emitProgram(program, shouldPrintSingleFile ? undefined : host);
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
  if (shouldPrintSingleFile) {
    process.stdout.write(result.emittedFiles[0]!.text);
    process.stdout.write("\n");
  }
}

await main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
