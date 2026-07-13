export const ArgumentPassingModes: readonly [
  "by-value",
  "byref-readonly",
  "byref-readwrite",
  "byref-writeonly-must-init",
  "borrow-shared",
  "borrow-mut",
  "move",
] = [
  "by-value",
  "byref-readonly",
  "byref-readwrite",
  "byref-writeonly-must-init",
  "borrow-shared",
  "borrow-mut",
  "move",
] as const;

export type ArgumentPassingMode = typeof ArgumentPassingModes[number];

export function isArgumentPassingMode(value: unknown): value is ArgumentPassingMode {
  return typeof value === "string" && (ArgumentPassingModes as readonly string[]).includes(value);
}
