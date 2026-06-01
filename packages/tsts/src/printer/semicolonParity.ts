/**
 * Semicolon parity helper.
 */

export type SemicolonDecision =
  | "emit"
  | "omit"
  | "preserve";

export interface SemicolonContext {
  readonly text: string;
  readonly nextToken?: string;
  readonly statementKind?: string;
  readonly preserveSourceNewLine?: boolean;
}

export function needsSemicolon(text: string): boolean {
  return !/[;}]$/.test(text.trimEnd());
}

export function decideSemicolon(context: SemicolonContext): SemicolonDecision {
  const trimmed = context.text.trimEnd();
  if (trimmed.length === 0) return "omit";
  if (context.preserveSourceNewLine === true && trimmed.endsWith(";")) return "preserve";
  if (statementCanOmitSemicolon(context.statementKind) && context.nextToken !== "(" && context.nextToken !== "[") return "omit";
  return needsSemicolon(trimmed) ? "emit" : "preserve";
}

export function statementCanOmitSemicolon(kind: string | undefined): boolean {
  return kind === "block"
    || kind === "function"
    || kind === "class"
    || kind === "interface"
    || kind === "enum"
    || kind === "namespace";
}

export function appendSemicolonIfNeeded(context: SemicolonContext): string {
  return decideSemicolon(context) === "emit" ? `${context.text};` : context.text;
}
