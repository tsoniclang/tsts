/**
 * Structured diagnostics for option parsing.
 *
 * TS-Go returns AST diagnostics; TSTS also needs a lightweight structured
 * representation while the JSON/parser bridge is being ported. These helpers
 * keep option-name, source path, and offending value together until callers
 * lower them into the AST diagnostic type.
 */

export type OptionDiagnosticSeverity = "error" | "warning" | "suggestion";

export interface OptionParseDiagnostic {
  readonly severity: OptionDiagnosticSeverity;
  readonly option: string;
  readonly message: string;
  readonly path: readonly string[];
  readonly value: unknown;
}

export function optionError(
  option: string,
  message: string,
  value: unknown,
  path: readonly string[] = [option],
): OptionParseDiagnostic {
  return { severity: "error", option, message, value, path };
}

export function optionWarning(
  option: string,
  message: string,
  value: unknown,
  path: readonly string[] = [option],
): OptionParseDiagnostic {
  return { severity: "warning", option, message, value, path };
}

export function optionSuggestion(
  option: string,
  message: string,
  value: unknown,
  path: readonly string[] = [option],
): OptionParseDiagnostic {
  return { severity: "suggestion", option, message, value, path };
}

export function formatOptionDiagnostic(diagnostic: OptionParseDiagnostic): string {
  const path = diagnostic.path.length === 0 ? diagnostic.option : diagnostic.path.join(".");
  return `${diagnostic.severity.toUpperCase()} ${path}: ${diagnostic.message}`;
}

export function hasOptionParseErrors(diagnostics: readonly OptionParseDiagnostic[]): boolean {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

export function diagnosticsForUnknownOption(
  option: string,
  suggestions: readonly string[],
): readonly OptionParseDiagnostic[] {
  if (suggestions.length === 0) {
    return [optionError(option, `Unknown option '${option}'.`, undefined)];
  }
  return [optionError(option, `Unknown option '${option}'. Did you mean ${suggestions.join(", ")}?`, undefined)];
}

export function nearestOptionNames(
  option: string,
  knownOptions: readonly string[],
  maxDistance: number = 3,
): readonly string[] {
  return knownOptions
    .map((known) => ({ known, distance: levenshtein(option.toLowerCase(), known.toLowerCase()) }))
    .filter((candidate) => candidate.distance <= maxDistance)
    .sort((left, right) => left.distance - right.distance || left.known.localeCompare(right.known))
    .slice(0, 3)
    .map((candidate) => candidate.known);
}

function levenshtein(left: string, right: string): number {
  const previous = new Array<number>(right.length + 1);
  const current = new Array<number>(right.length + 1);
  for (let column = 0; column <= right.length; column += 1) previous[column] = column;
  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      const substitution = previous[column - 1]! + (left[row - 1] === right[column - 1] ? 0 : 1);
      const insertion = current[column - 1]! + 1;
      const deletion = previous[column]! + 1;
      current[column] = Math.min(substitution, insertion, deletion);
    }
    for (let column = 0; column <= right.length; column += 1) previous[column] = current[column]!;
  }
  return previous[right.length]!;
}
