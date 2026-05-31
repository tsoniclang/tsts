export type ProjectKind = "inferred" | "configured" | "external";

export function projectKindToString(kind: ProjectKind): string {
  return kind;
}
