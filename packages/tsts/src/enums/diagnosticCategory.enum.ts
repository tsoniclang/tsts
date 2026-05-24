export type DiagnosticCategory = 0 | 1 | 2 | 3;
export const DiagnosticCategory: {
  readonly Warning: DiagnosticCategory;
  readonly Error: DiagnosticCategory;
  readonly Suggestion: DiagnosticCategory;
  readonly Message: DiagnosticCategory;
} = {
  Warning: 0,
  Error: 1,
  Suggestion: 2,
  Message: 3,
};
