import type { ParseConfigHost } from "../tsconfigParsing.js";

export interface VfsParseConfigHost extends ParseConfigHost {
  readonly currentDirectory: string;
}
