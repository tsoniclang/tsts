/**
 * Build status reporter parity helpers.
 */

export interface BuildStatusReport {
  readonly project: string;
  readonly phase: "queue" | "build" | "emit" | "done";
  readonly diagnostics: number;
  readonly elapsedMs: number;
}

export function formatBuildStatusReport(report: BuildStatusReport): string {
  const diagnostics = report.diagnostics === 0 ? "0 errors" : `${report.diagnostics} errors`;
  return `${report.project}: ${report.phase} completed in ${report.elapsedMs}ms with ${diagnostics}`;
}

export function summarizeBuildStatusReports(reports: readonly BuildStatusReport[]): BuildStatusSummary {
  return {
    projects: new Set(reports.map(report => report.project)).size,
    diagnostics: reports.reduce((sum, report) => sum + report.diagnostics, 0),
    elapsedMs: reports.reduce((sum, report) => Math.max(sum, report.elapsedMs), 0),
  };
}

export interface BuildStatusSummary {
  readonly projects: number;
  readonly diagnostics: number;
  readonly elapsedMs: number;
}
