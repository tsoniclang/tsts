import { lstatSync } from "node:fs";

export function isReparsePoint(path: string): boolean {
  try {
    return lstatSync(path).isSymbolicLink();
  } catch {
    return false;
  }
}
