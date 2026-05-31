import { normalizeNewlines } from "../stringtestutil/stringTestUtil.js";

export interface NamedSource {
  readonly name: string;
  readonly content: string;
}

export function splitSources(text: string): readonly NamedSource[] {
  const normalized = normalizeNewlines(text);
  const parts = normalized.split(/^\/\/\/\/\s*(.+)$/m);
  if (parts.length === 1) return [{ name: "input.ts", content: normalized }];
  const out: NamedSource[] = [];
  for (let index = 1; index < parts.length; index += 2) {
    const name = parts[index]!.trim();
    const content = parts[index + 1] ?? "";
    out.push({ name, content: content.replace(/^\n/, "") });
  }
  return out;
}

export function joinSources(sources: readonly NamedSource[]): string {
  return sources.map((source) => `//// ${source.name}\n${source.content}`).join("\n");
}

export function normalizeBaselinePath(path: string): string {
  return path.replace(/\\/g, "/").replace(/^[A-Za-z]:/, "");
}
