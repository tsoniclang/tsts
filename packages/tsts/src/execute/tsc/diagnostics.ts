/**
 * Command-line diagnostic reporter helpers.
 *
 * Port of TS-Go `internal/execute/tsc/diagnostics.go`.
 */

import type { TextWriter } from "./statistics.js";
import type { System, CommandLineTesting } from "./compile.js";

export interface DiagnosticLike {
  readonly message: string;
}

export interface CompilerOptionsLike {
  readonly quiet?: boolean;
  readonly pretty?: boolean;
}

export type DiagnosticReporter<Diagnostic extends DiagnosticLike = DiagnosticLike> = (diagnostic: Diagnostic) => void;
export type DiagnosticsReporter<Diagnostic extends DiagnosticLike = DiagnosticLike> = (diagnostics: readonly Diagnostic[]) => void;

export function quietDiagnosticReporter(_diagnostic: DiagnosticLike): void {
}

export function quietDiagnosticsReporter(_diagnostics: readonly DiagnosticLike[]): void {
}

export function createDiagnosticReporter<Diagnostic extends DiagnosticLike>(
  sys: System,
  writer: TextWriter,
  options: CompilerOptionsLike | undefined,
): DiagnosticReporter<Diagnostic> {
  if (options?.quiet === true) return quietDiagnosticReporter;
  return (diagnostic: Diagnostic) => {
    writer.write(diagnostic.message);
    writer.write("\n");
    if (shouldBePretty(sys, options)) writer.write("\n");
  };
}

export function createReportErrorSummary<Diagnostic extends DiagnosticLike>(
  sys: System,
  writer: TextWriter,
  options: CompilerOptionsLike | undefined,
): DiagnosticsReporter<Diagnostic> {
  if (!shouldBePretty(sys, options)) return quietDiagnosticsReporter;
  return (diagnostics: readonly Diagnostic[]) => {
    if (diagnostics.length === 0) return;
    writer.write("Found " + diagnostics.length + " error");
    if (diagnostics.length !== 1) writer.write("s");
    writer.write(".\n");
  };
}

export function defaultIsPretty(sys: System): boolean {
  if (sys.getEnvironmentVariable("NO_COLOR") !== "") return false;
  if (sys.getEnvironmentVariable("FORCE_COLOR") !== "") return true;
  return sys.writeOutputIsTTY();
}

export function shouldBePretty(sys: System, options: CompilerOptionsLike | undefined): boolean {
  if (options === undefined || options.pretty === undefined) return defaultIsPretty(sys);
  return options.pretty;
}

export class Colors {
  readonly showColors: boolean;
  readonly isWindows: boolean;
  readonly isWindowsTerminal: boolean;
  readonly isVSCode: boolean;
  readonly supportsRicherColors: boolean;

  constructor(
    showColors: boolean,
    isWindows: boolean,
    isWindowsTerminal: boolean,
    isVSCode: boolean,
    supportsRicherColors: boolean,
  ) {
    this.showColors = showColors;
    this.isWindows = isWindows;
    this.isWindowsTerminal = isWindowsTerminal;
    this.isVSCode = isVSCode;
    this.supportsRicherColors = supportsRicherColors;
  }

  bold(text: string): string {
    if (!this.showColors) return text;
    return "\x1b[1m" + text + "\x1b[22m";
  }

  blue(text: string): string {
    if (!this.showColors) return text;
    if (this.isWindows && !this.isWindowsTerminal && !this.isVSCode) return this.brightWhite(text);
    return "\x1b[94m" + text + "\x1b[39m";
  }

  blueBackground(text: string): string {
    if (!this.showColors) return text;
    if (this.supportsRicherColors) return "\x1B[48;5;68m" + text + "\x1B[39;49m";
    return "\x1b[44m" + text + "\x1B[39;49m";
  }

  brightWhite(text: string): string {
    if (!this.showColors) return text;
    return "\x1b[97m" + text + "\x1b[39m";
  }
}

export function createColors(sys: System): Colors {
  if (!defaultIsPretty(sys)) return new Colors(false, false, false, false, false);

  const os = sys.getEnvironmentVariable("OS");
  const isWindows = os.toLowerCase().includes("windows");
  const isWindowsTerminal = sys.getEnvironmentVariable("WT_SESSION") !== "";
  const isVSCode = sys.getEnvironmentVariable("TERM_PROGRAM") === "vscode";
  const supportsRicherColors = sys.getEnvironmentVariable("COLORTERM") === "truecolor"
    || sys.getEnvironmentVariable("TERM") === "xterm-256color";
  return new Colors(true, isWindows, isWindowsTerminal, isVSCode, supportsRicherColors);
}

export function createBuilderStatusReporter<Diagnostic extends DiagnosticLike>(
  sys: System,
  writer: TextWriter,
  options: CompilerOptionsLike | undefined,
  testing?: CommandLineTesting,
): DiagnosticReporter<Diagnostic> {
  if (options?.quiet === true) return quietDiagnosticReporter;
  return (diagnostic: Diagnostic) => {
    if (testing !== undefined) testing.onBuildStatusReportStart(writer);
    writer.write(sys.now().toLocaleTimeString());
    writer.write(" - ");
    writer.write(diagnostic.message);
    writer.write("\n\n");
    if (testing !== undefined) testing.onBuildStatusReportEnd(writer);
  };
}

export function createWatchStatusReporter<Diagnostic extends DiagnosticLike>(
  sys: System,
  options: CompilerOptionsLike | undefined,
  testing?: CommandLineTesting,
): DiagnosticReporter<Diagnostic> {
  const writer = sys.writer();
  return (diagnostic: Diagnostic) => {
    if (testing !== undefined) testing.onWatchStatusReportStart();
    const reporter: DiagnosticReporter<Diagnostic> = createBuilderStatusReporter(sys, writer, options);
    reporter(diagnostic);
    if (testing !== undefined) testing.onWatchStatusReportEnd();
  };
}
