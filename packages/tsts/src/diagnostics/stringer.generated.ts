import type { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

export function categoryToString(category: DiagnosticCategory): string {
  if (category === 0) return "CategoryWarning";
  if (category === 1) return "CategoryError";
  if (category === 2) return "CategorySuggestion";
  if (category === 3) return "CategoryMessage";
  return `Category(${category})`;
}
