import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
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
    readDirectory: (rootDir, extensions, excludes, includes) => {
      const root = rootDir.length === 0 ? "." : rootDir;
      const excludeMatchers = excludes.map(pattern => createGlobMatcher(pattern));
      const includeMatchers = includes.map(pattern => createGlobMatcher(normalizeIncludePattern(pattern)));
      const files: string[] = [];
      visitDirectory(root, fileName => {
        const relativeName = toPosixPath(relative(root, fileName));
        if (excludeMatchers.some(matches => matches(relativeName))) {
          return;
        }
        if (!extensions.some(extension => fileName.endsWith(extension))) {
          return;
        }
        if (includeMatchers.length > 0 && !includeMatchers.some(matches => matches(relativeName))) {
          return;
        }
        files.push(fileName);
      }, directoryName => {
        const relativeName = toPosixPath(relative(root, directoryName));
        return relativeName.length === 0 || !excludeMatchers.some(matches => matches(`${relativeName}/`));
      });
      return files.sort((left, right) => left.localeCompare(right));
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

function visitDirectory(directoryName: string, onFile: (fileName: string) => void, shouldVisitDirectory: (directoryName: string) => boolean): void {
  if (!shouldVisitDirectory(directoryName)) {
    return;
  }
  let entries;
  try {
    entries = readdirSync(directoryName, { withFileTypes: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return;
    }
    throw error;
  }
  for (const entry of entries) {
    const fileName = join(directoryName, entry.name);
    if (entry.isDirectory()) {
      visitDirectory(fileName, onFile, shouldVisitDirectory);
      continue;
    }
    if (entry.isFile()) {
      onFile(fileName);
    }
  }
}

function createGlobMatcher(pattern: string): (fileName: string) => boolean {
  const normalized = toPosixPath(pattern);
  const segments = normalized.split("/");
  const source = segments.map((segment, index) => {
    if (segment === "**") {
      return "(?:[^/]+/)*";
    }
    const text = escapeRegExp(segment).replaceAll("\\*", "[^/]*").replaceAll("\\?", "[^/]");
    return index === segments.length - 1 ? text : `${text}/`;
  }).join("");
  const exact = new RegExp(`^${source}/?$`);
  const subtree = new RegExp(`^${source}/.*$`);
  return fileName => exact.test(fileName) || subtree.test(fileName);
}

function normalizeIncludePattern(pattern: string): string {
  const normalized = toPosixPath(pattern);
  if (normalized.endsWith(".ts") || normalized.endsWith(".tsx") || normalized.includes("*")) {
    return normalized;
  }
  return `${normalized.replace(/\/$/, "")}/**/*`;
}

function toPosixPath(fileName: string): string {
  return sep === "/" ? fileName : fileName.split(sep).join("/");
}

function escapeRegExp(text: string): string {
  return text.replace(/[\\^$+?.()|[\]{}]/g, "\\$&");
}
