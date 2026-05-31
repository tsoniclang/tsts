import { normalizeBaselinePath } from "../harnessutil/harnessutil.js";

export const harnessNewLine = "\r\n";
export const noContent = "<no content>";

export function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator = false): string {
  const normalized = text.replace(/\\/g, "/");
  const withoutWorkspace = normalized
    .replaceAll("/home/jeswin/repos/tsoniclang/tsts/", "")
    .replaceAll("/home/jeswin/temp/typescript-go/", "");
  return retainTrailingDirectorySeparator ? withoutWorkspace : withoutWorkspace.replace(/\/(?=[\r\n]|$)/g, "");
}

export function sanitizeTestFilePath(fileName: string): string {
  return normalizeBaselinePath(removeTestPathPrefixes(fileName, false)).toLowerCase();
}

export function isDefaultLibraryFile(fileName: string | undefined): boolean {
  if (fileName === undefined) return false;
  const normalized = fileName.replace(/\\/g, "/").toLowerCase();
  return /(?:^|\/)lib\..*\.d\.ts$/.test(normalized) || normalized.endsWith("/built/local/lib.d.ts");
}

export function isBuiltFile(fileName: string | undefined): boolean {
  if (fileName === undefined) return false;
  const normalized = fileName.replace(/\\/g, "/").toLowerCase();
  return normalized.includes("/built/") || normalized.includes("/_generated/");
}

export function isTsConfigFile(fileName: string | undefined): boolean {
  if (fileName === undefined) return false;
  return fileName.replace(/\\/g, "/").toLowerCase().endsWith("/tsconfig.json")
    || fileName.toLowerCase() === "tsconfig.json";
}

export function changeTsExtension(fileName: string, extension: string): string {
  return fileName.replace(/\.(?:tsx?|jsx?|json)$/i, extension);
}

export function fileHeader(fileName: string): string {
  return `//// [${removeTestPathPrefixes(fileName, false)}] ////`;
}

export function sectionHeader(title: string): string {
  return `==== ${title} ====`;
}

export function splitLines(text: string): readonly string[] {
  return text.replace(/\r\n?/g, "\n").split("\n");
}

export function lineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13) {
      if (text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    } else if (ch === 10) {
      starts.push(index + 1);
    }
  }
  return starts;
}

export function lineAndCharacterOfPosition(text: string, position: number): readonly [number, number] {
  const starts = lineStarts(text);
  let line = 0;
  for (let index = 1; index < starts.length; index += 1) {
    if (starts[index]! > position) break;
    line = index;
  }
  return [line, position - starts[line]!];
}
