import { Kind } from "./generated/kind.js";

const kindNames = new Map<number, string>(
  Object.entries(Kind)
    .filter(([, value]) => typeof value === "number")
    .map(([name, value]) => [value as number, name]),
);

export function kindToString(kind: Kind): string {
  return kindNames.get(kind) ?? `Kind(${kind})`;
}
