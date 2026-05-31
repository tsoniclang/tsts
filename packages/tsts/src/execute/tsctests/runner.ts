import { newTestSys, type FileMap, type TestSys } from "./sys.js";

export interface TscTestCase {
  readonly name: string;
  run(): void;
}

export interface TscEdit {
  readonly caption: string;
  readonly commandLineArgs?: readonly string[];
  readonly edit?: (sys: TestSys) => void;
  readonly expectedDiff?: string;
}

export const noChange: TscEdit = {
  caption: "no change",
};

export const noChangeOnlyEdit: readonly TscEdit[] = [noChange];

export interface TscInput {
  readonly subScenario: string;
  readonly commandLineArgs: readonly string[];
  readonly files: FileMap;
  readonly cwd?: string;
  readonly edits?: readonly TscEdit[];
  readonly env?: Readonly<Record<string, string>>;
  readonly ignoreCase?: boolean;
  readonly windowsStyleRoot?: string;
}

export interface CommandLineResult {
  readonly status: TscExitStatus;
  readonly watcher?: { doCycle(): void };
}

export const TscExitStatus = {
  Success: 0,
  DiagnosticsPresentOutputsSkipped: 1,
  DiagnosticsPresentOutputsGenerated: 2,
  InvalidProjectOutputsSkipped: 3,
  ProjectReferenceCycleOutputsSkipped: 4,
  NotImplemented: 5,
} as const;

export type TscExitStatus = typeof TscExitStatus[keyof typeof TscExitStatus];

export type CommandLineExecutor = (
  sys: TestSys,
  commandLineArgs: readonly string[],
) => CommandLineResult;

export function runTscTests(tests: readonly TscTestCase[]): void {
  for (const test of tests) test.run();
}

export function executeCommand(
  input: TscInput,
  sys: TestSys,
  commandLineArgs: readonly string[],
  execute: CommandLineExecutor,
): { readonly result: CommandLineResult; readonly baseline: string } {
  const result = execute(sys, commandLineArgs);
  return {
    result,
    baseline: `tsgo ${commandLineArgs.join(" ")}\nExitStatus:: ${exitStatusName(result.status)}`,
  };
}

export function runTscInput(
  input: TscInput,
  scenario: string,
  execute: CommandLineExecutor,
): string {
  const baseline: string[] = [];
  const sys = newTestSys(input);
  baseline.push(`currentDirectory::${sys.getCurrentDirectory()}`);
  baseline.push(`useCaseSensitiveFileNames::${sys.fs.useCaseSensitiveFileNames}`);
  baseline.push("Input::");
  baseline.push(JSON.stringify(sys.fs.snapshot(), undefined, 2));

  const initial = executeCommand(input, sys, input.commandLineArgs, execute);
  baseline.push(initial.baseline);
  baseline.push(sys.serializeState());

  const edits = input.edits ?? noChangeOnlyEdit;
  for (let index = 0; index < edits.length; index += 1) {
    const edit = edits[index]!;
    sys.clearOutput();
    baseline.push(`\n\nEdit [${index}]:: ${edit.caption}`);
    edit.edit?.(sys);
    const commandLineArgs = edit.commandLineArgs ?? input.commandLineArgs;
    if (initial.result.watcher === undefined) {
      baseline.push(executeCommand(input, sys, commandLineArgs, execute).baseline);
    } else {
      initial.result.watcher.doCycle();
    }
    baseline.push(sys.serializeState());

    const nonIncrementalSys = newTestSys(input, true);
    for (let editIndex = 0; editIndex <= index; editIndex += 1) {
      edits[editIndex]?.edit?.(nonIncrementalSys);
    }
    execute(nonIncrementalSys, commandLineArgs);
    const diff = getDiffForIncremental(sys, nonIncrementalSys);
    if (diff !== "") {
      baseline.push(`\n\nDiff:: ${edit.expectedDiff ?? "!!! Unexpected diff, please review and either fix or write explanation as expectedDiff !!!"}`);
      baseline.push(diff);
    } else if (edit.expectedDiff !== undefined && edit.expectedDiff !== "") {
      baseline.push(`\n\nDiff:: ${edit.expectedDiff} !!! Diff not found but explanation present, please review and remove the explanation !!!`);
    }
  }
  return baselineName(input, scenario) + "\n" + baseline.join("\n");
}

export function getDiffForIncremental(incrementalSys: TestSys, nonIncrementalSys: TestSys): string {
  const lines: string[] = [];
  for (const path of [...nonIncrementalSys.fs.writtenFiles].sort()) {
    const expected = nonIncrementalSys.readFile(path);
    const actual = incrementalSys.readFile(path);
    if (path.endsWith(".tsbuildinfo") || path.endsWith(".readable.baseline.txt")) {
      if (actual === undefined) lines.push(diffText(`nonIncremental ${path}`, `incremental ${path}`, "Exists", ""));
    } else if (expected !== actual) {
      lines.push(diffText(`nonIncremental ${path}`, `incremental ${path}`, expected ?? "", actual ?? ""));
    }
  }
  const incrementalOutput = incrementalSys.getOutput(true);
  const nonIncrementalOutput = nonIncrementalSys.getOutput(true);
  if (incrementalOutput !== nonIncrementalOutput) {
    lines.push(diffText("nonIncremental.output.txt", "incremental.output.txt", nonIncrementalOutput, incrementalOutput));
  }
  return lines.join("\n");
}

export function getBaselineSubFolder(input: TscInput): string {
  const commandName = input.commandLineArgs.some((arg) => arg === "-b" || arg === "--b" || arg === "-build" || arg === "--build")
    ? "tsbuild"
    : "tsc";
  const watch = input.commandLineArgs.some((arg) => arg === "-w" || arg === "--w" || arg === "-watch" || arg === "--watch")
    ? "Watch"
    : "";
  return commandName + watch;
}

function baselineName(input: TscInput, scenario: string): string {
  return `${getBaselineSubFolder(input)}/${scenario}/${input.subScenario.replaceAll(" ", "-")}.js`;
}

function exitStatusName(status: TscExitStatus): string {
  switch (status) {
    case TscExitStatus.Success:
      return "Success";
    case TscExitStatus.DiagnosticsPresentOutputsSkipped:
      return "DiagnosticsPresent_OutputsSkipped";
    case TscExitStatus.DiagnosticsPresentOutputsGenerated:
      return "DiagnosticsPresent_OutputsGenerated";
    case TscExitStatus.InvalidProjectOutputsSkipped:
      return "InvalidProject_OutputsSkipped";
    case TscExitStatus.ProjectReferenceCycleOutputsSkipped:
      return "ProjectReferenceCycle_OutputsSkipped";
    case TscExitStatus.NotImplemented:
      return "NotImplemented";
  }
}

function diffText(expectedName: string, actualName: string, expected: string, actual: string): string {
  if (expected === actual) return "";
  return `==== ${expectedName}\n${expected}\n==== ${actualName}\n${actual}`;
}
