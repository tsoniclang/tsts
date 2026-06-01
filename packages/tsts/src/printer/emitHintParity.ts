/**
 * Emit-hint parity helpers.
 */

export type PrinterEmitHint = "source-file" | "expression" | "statement" | "identifier" | "type" | "decorator";

export function emitHintForNodeKind(kindName: string): PrinterEmitHint {
  if (kindName.endsWith("Statement") || kindName === "Block") return "statement";
  if (kindName.endsWith("Type") || kindName.endsWith("TypeNode")) return "type";
  if (kindName === "Identifier" || kindName.endsWith("Name")) return "identifier";
  if (kindName === "Decorator") return "decorator";
  if (kindName === "SourceFile") return "source-file";
  return "expression";
}

export function emitHintAllowsComments(hint: PrinterEmitHint): boolean {
  return hint === "source-file" || hint === "statement" || hint === "expression" || hint === "decorator";
}

export function emitHintPreservesSourceMap(hint: PrinterEmitHint): boolean {
  return hint !== "type";
}
