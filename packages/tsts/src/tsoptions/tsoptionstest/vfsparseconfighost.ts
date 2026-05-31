import type { ParseConfigHost } from "../tsconfigparsing.js";

export interface VfsParseConfigHost extends ParseConfigHost {
  readonly currentDirectory: string;
}
