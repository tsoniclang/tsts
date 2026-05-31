import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(TOOL_DIR, "..");
const TSGO_CHECKER_DIR = join(process.env.TSGO_REPO ?? "/home/jeswin/temp/typescript-go", "internal", "checker");
const OUT_FILE = join(PROJECT_ROOT, "src", "checker", "checker.functionRegistry.generated.ts");

interface Entry {
  readonly upstreamFile: string;
  readonly line: number;
  readonly receiver: string;
  readonly name: string;
  readonly category: string;
}

function categoryFor(name: string, file: string): string {
  if (file === "relater.go" || name.includes("Related") || name.includes("Relation") || name.includes("Assignable") || name.includes("Subtype")) return "relation";
  if (file === "flow.go" || name.includes("Flow") || name.includes("Narrow")) return "flow";
  if (file === "grammarchecks.go" || name.includes("Grammar")) return "grammar";
  if (file.includes("nodebuilder") || name.includes("NodeBuilder") || name.includes("TypeNode")) return "node-builder";
  if (name.includes("Signature") || name.includes("Overload") || name.includes("Call")) return "signature";
  if (name.includes("Symbol") || name.includes("Alias") || name.includes("Export") || name.includes("Import")) return "symbol";
  if (name.includes("Type") || name.includes("Constraint") || name.includes("Union") || name.includes("Intersection")) return "type";
  if (name.includes("Check") || name.includes("Diagnostic") || name.includes("Error")) return "check";
  return "checker";
}

function receiverFrom(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return "free";
  const match = /\*?([A-Za-z_][A-Za-z0-9_]*)/.exec(trimmed);
  return match?.[1] ?? "free";
}

function collectEntries(): readonly Entry[] {
  if (!existsSync(TSGO_CHECKER_DIR)) throw new Error(`TS-Go checker directory not found: ${TSGO_CHECKER_DIR}`);
  const entries: Entry[] = [];
  for (const fileName of readdirSync(TSGO_CHECKER_DIR).filter(name => name.endsWith(".go") && !name.endsWith("_test.go")).sort()) {
    const filePath = join(TSGO_CHECKER_DIR, fileName);
    const lines = readFileSync(filePath, "utf8").split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]!;
      const match = /^func\s+(?:\(([^)]*)\)\s*)?([A-Za-z_][A-Za-z0-9_]*)\s*(?:\[|\()/.exec(line);
      if (match === null) continue;
      const name = match[2]!;
      entries.push({
        upstreamFile: fileName,
        line: index + 1,
        receiver: receiverFrom(match[1] ?? ""),
        name,
        category: categoryFor(name, fileName),
      });
    }
  }
  return entries;
}

function emit(entries: readonly Entry[]): string {
  const lines: string[] = [];
  lines.push("/**");
  lines.push(" * Generated checker function registry.");
  lines.push(" *");
  lines.push(" * Source: TS-Go internal/checker/*.go function declarations.");
  lines.push(" * Regenerate with: node packages/tsts/tools/generateCheckerFunctionRegistry.ts");
  lines.push(" */");
  lines.push("");
  lines.push("export interface CheckerFunctionRegistryEntry {");
  lines.push("  readonly upstreamFile: string;");
  lines.push("  readonly line: number;");
  lines.push("  readonly receiver: string;");
  lines.push("  readonly name: string;");
  lines.push("  readonly category: string;");
  lines.push("}");
  lines.push("");
  lines.push("export const checkerFunctionRegistry = [");
  for (const entry of entries) {
    lines.push("  {");
    lines.push(`    upstreamFile: ${JSON.stringify(entry.upstreamFile)},`);
    lines.push(`    line: ${entry.line},`);
    lines.push(`    receiver: ${JSON.stringify(entry.receiver)},`);
    lines.push(`    name: ${JSON.stringify(entry.name)},`);
    lines.push(`    category: ${JSON.stringify(entry.category)},`);
    lines.push("  },");
  }
  lines.push("] as const satisfies readonly CheckerFunctionRegistryEntry[];");
  lines.push("");
  lines.push("export function checkerFunctionRegistryByName(): ReadonlyMap<string, readonly CheckerFunctionRegistryEntry[]> {");
  lines.push("  const byName = new Map<string, CheckerFunctionRegistryEntry[]>();");
  lines.push("  for (const entry of checkerFunctionRegistry) {");
  lines.push("    const existing = byName.get(entry.name) ?? [];");
  lines.push("    existing.push(entry);");
  lines.push("    byName.set(entry.name, existing);");
  lines.push("  }");
  lines.push("  return byName;");
  lines.push("}");
  lines.push("");
  lines.push("export function checkerFunctionRegistryByFile(): ReadonlyMap<string, readonly CheckerFunctionRegistryEntry[]> {");
  lines.push("  const byFile = new Map<string, CheckerFunctionRegistryEntry[]>();");
  lines.push("  for (const entry of checkerFunctionRegistry) {");
  lines.push("    const existing = byFile.get(entry.upstreamFile) ?? [];");
  lines.push("    existing.push(entry);");
  lines.push("    byFile.set(entry.upstreamFile, existing);");
  lines.push("  }");
  lines.push("  return byFile;");
  lines.push("}");
  lines.push("");
  lines.push("export function checkerFunctionRegistrySummary(): ReadonlyMap<string, number> {");
  lines.push("  const summary = new Map<string, number>();");
  lines.push("  for (const entry of checkerFunctionRegistry) summary.set(entry.category, (summary.get(entry.category) ?? 0) + 1);");
  lines.push("  return summary;");
  lines.push("}");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function main(): void {
  const entries = collectEntries();
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, emit(entries));
  console.log(`generated ${relative(PROJECT_ROOT, OUT_FILE)} entries=${entries.length}`);
}

main();
