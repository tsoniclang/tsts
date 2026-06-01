/**
 * TSC diagnostic summary parity helpers.
 */

export interface TscDiagnosticSummary {
  readonly files: number;
  readonly errors: number;
  readonly warnings: number;
}

export function formatTscDiagnosticSummary(summary: TscDiagnosticSummary): string {
  const diagnostics = summary.errors + summary.warnings;
  return `Files: ${summary.files}. Diagnostics: ${diagnostics} (${summary.errors} errors, ${summary.warnings} warnings).`;
}

export function mergeTscDiagnosticSummaries(summaries: readonly TscDiagnosticSummary[]): TscDiagnosticSummary {
  return {
    files: summaries.reduce((sum, summary) => sum + summary.files, 0),
    errors: summaries.reduce((sum, summary) => sum + summary.errors, 0),
    warnings: summaries.reduce((sum, summary) => sum + summary.warnings, 0),
  };
}
