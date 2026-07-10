import path from "node:path";

export function matchGlob(pattern, value) {
  const normalizedPattern = pattern.split(path.sep).join("/");
  const normalizedValue = value.split(path.sep).join("/");
  const regex = new RegExp(`^${normalizedPattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*")}$`);
  return regex.test(normalizedValue);
}
