import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import type { CompilerHost } from "./program.js";

export function createNodeCompilerHost(currentDirectory = process.cwd()): CompilerHost {
  return {
    getCurrentDirectory: () => currentDirectory,
    readFile: fileName => {
      try {
        return readFileSync(fileName, "utf8");
      } catch (error) {
        if (isNotFoundError(error)) {
          return undefined;
        }
        throw error;
      }
    },
    writeFile: (fileName, text) => {
      mkdirSync(dirname(fileName), { recursive: true });
      writeFileSync(fileName, text);
    },
    useCaseSensitiveFileNames: () => process.platform !== "win32",
  };
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
