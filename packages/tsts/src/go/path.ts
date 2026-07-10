import path from "node:path";

export function Join(...args: Array<string>): string {
  return path.posix.join(...args);
}

export function Split(pathValue: string): [string, string] {
  const separatorIndex = pathValue.lastIndexOf("/");
  return [pathValue.slice(0, separatorIndex + 1), pathValue.slice(separatorIndex + 1)];
}
