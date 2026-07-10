import * as nodeFs from "node:fs";

import type { GoError } from "../../go/compat.js";
import type { bool } from "../../go/scalars.js";

export function nodeRealpath(path: string): [string, GoError] {
  try {
    return [nodeFs.realpathSync.native(path), undefined];
  } catch (error) {
    return ["", error instanceof globalThis.Error ? error : new globalThis.Error(String(error))];
  }
}

export function nodeIsSymlinkOrReparsePoint(path: string): bool {
  try {
    return nodeFs.lstatSync(path).isSymbolicLink() as bool;
  } catch {
    return false as bool;
  }
}
