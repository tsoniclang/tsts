import { realpathSync } from "node:fs";

export function realpath(path: string): string {
  return realpathSync.native(path);
}
