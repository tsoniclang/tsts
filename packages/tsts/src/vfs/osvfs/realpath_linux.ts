import { realpathSync } from "node:fs";

import { ignoringEINTR } from "./eintr_unix.js";

export function realpath(path: string): string {
  return ignoringEINTR(() => realpathSync.native(path));
}
