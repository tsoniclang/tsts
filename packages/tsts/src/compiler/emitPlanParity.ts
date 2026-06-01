/**
 * Compiler emit-plan parity helpers.
 */

export interface EmitPlanInput {
  readonly sourceFiles: readonly string[];
  readonly declaration: boolean;
  readonly sourceMap: boolean;
  readonly outDir?: string;
}

export interface EmitPlanEntry {
  readonly sourceFile: string;
  readonly jsFile: string;
  readonly declarationFile?: string;
  readonly sourceMapFile?: string;
}

export function createEmitPlan(input: EmitPlanInput): readonly EmitPlanEntry[] {
  return input.sourceFiles.map(sourceFile => {
    const base = outputBase(sourceFile, input.outDir);
    return {
      sourceFile,
      jsFile: replaceExtension(base, ".js"),
      ...(input.declaration ? { declarationFile: replaceExtension(base, ".d.ts") } : {}),
      ...(input.sourceMap ? { sourceMapFile: replaceExtension(base, ".js.map") } : {}),
    };
  });
}

export function emitPlanOutputs(plan: readonly EmitPlanEntry[]): readonly string[] {
  return plan.flatMap(entry => [entry.jsFile, entry.declarationFile, entry.sourceMapFile].filter((file): file is string => file !== undefined));
}

function outputBase(sourceFile: string, outDir: string | undefined): string {
  const normalized = sourceFile.replace(/\\/g, "/");
  if (outDir === undefined) return normalized;
  return `${outDir.replace(/\\/g, "/").replace(/\/$/, "")}/${normalized.slice(normalized.lastIndexOf("/") + 1)}`;
}

function replaceExtension(path: string, extension: string): string {
  const index = path.lastIndexOf(".");
  return `${index < 0 ? path : path.slice(0, index)}${extension}`;
}
