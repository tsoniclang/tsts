import { realpathSync } from "node:fs";

import { ignoringEINTR } from "./eintr.unix.js";

export function realpath(path: string): string {
  return ignoringEINTR(() => realpathSync.native(path));
}
