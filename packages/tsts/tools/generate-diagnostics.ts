import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

import { writeGenerated } from "./common.js";

// ---------------------------------------------------------------------------
// generate-diagnostics.ts
//
// Faithful regeneration tool for the diagnostic message catalog. This is the
// TSTS equivalent of TS-Go's `internal/diagnostics/generate.go`: it parses the
// already-generated upstream Go table
// (`internal/diagnostics/diagnostics_generated.go`) and emits the TSTS catalog
// (`src/diagnostics/diagnostics_generated.ts`).
//
// We parse the Go table (not the JSON sources) because the Go file is the
// canonical, post-sort, post-name-sanitization snapshot: it already contains
// the final exported identifier, the stable `key`, the numeric `code`, the
// `Category`, the message `text`, and the three optional boolean flags. Parsing
// it guarantees the TSTS catalog is byte-for-byte faithful to what TS-Go ships.
//
// There are NO compat aliases, NO legacy bridges, and NO hand-authored extra
// entries: every emitted entry corresponds 1:1 to an upstream
// `var Name = &Message{...}` declaration, and `keyToMessage` mirrors upstream's
// reverse-lookup switch exactly.
// ---------------------------------------------------------------------------

const EXPECTED_ENTRY_COUNT = 2153;

// Upstream `Category<Name>` constant -> TSTS `Category.<Name>` member.
const CATEGORY_NAME: Record<string, string> = {
  CategoryWarning: "Warning",
  CategoryError: "Error",
  CategorySuggestion: "Suggestion",
  CategoryMessage: "Message",
};

interface DiagnosticEntry {
  readonly name: string;
  readonly code: number;
  readonly category: string;
  readonly key: string;
  readonly text: string;
  readonly reportsUnnecessary: boolean;
  readonly reportsDeprecated: boolean;
  readonly elidedInCompatibilityPyramid: boolean;
}

// Resolve the upstream TS-Go clone the same way the other tools do
// (`check-schema.ts`, `check-completeness.ts`): honor TSGO_REPO, else default
// to the conventional local checkout path.
function resolveUpstreamRepo(): string {
  return process.env.TSGO_REPO ?? join(homedir(), "repos/microsoft/typescript-go");
}

// Decode a Go double-quoted string literal beginning at `start` (the opening
// quote). The upstream file is produced with Go's `%q`, which only emits the
// `\"`, `\\`, `\n`, `\t`, `\r` escapes for these messages; reject anything else
// so a future upstream change with an unhandled escape fails loudly rather than
// corrupting the catalog. Returns the decoded value and the index just past the
// closing quote.
function parseGoString(source: string, start: number): { readonly value: string; readonly end: number } {
  if (source[start] !== "\"") {
    throw new Error(`expected opening quote at offset ${start}`);
  }
  const chars: string[] = [];
  let i = start + 1;
  while (i < source.length) {
    const c = source[i];
    if (c === "\\") {
      const next = source[i + 1];
      switch (next) {
        case "\"":
          chars.push("\"");
          i += 2;
          continue;
        case "\\":
          chars.push("\\");
          i += 2;
          continue;
        case "n":
          chars.push("\n");
          i += 2;
          continue;
        case "t":
          chars.push("\t");
          i += 2;
          continue;
        case "r":
          chars.push("\r");
          i += 2;
          continue;
        default:
          throw new Error(`unhandled Go escape \\${next ?? "<eof>"} near ${source.slice(i, i + 12)}`);
      }
    }
    if (c === "\"") {
      return { value: chars.join(""), end: i + 1 };
    }
    chars.push(c ?? "");
    i += 1;
  }
  throw new Error(`unterminated Go string starting at offset ${start}`);
}

// Match the head of a `var Name = &Message{code: N, category: CategoryX, key: ...`
// declaration. Everything from `key:` onward is parsed by hand because the text
// can contain `key:`/`text:`-looking substrings inside the quoted message.
const VAR_HEAD = /^var ([A-Za-z0-9_]+) = &Message\{code: (\d+), category: (Category[A-Za-z]+), key: /;

function parseDiagnosticsTable(go: string): readonly DiagnosticEntry[] {
  const entries: DiagnosticEntry[] = [];
  for (const line of go.split("\n")) {
    const head = VAR_HEAD.exec(line);
    if (head === null) {
      continue;
    }
    const name = head[1]!;
    const code = Number(head[2]!);
    const categoryConst = head[3]!;
    const category = CATEGORY_NAME[categoryConst];
    if (category === undefined) {
      throw new Error(`unknown upstream category ${categoryConst} for ${name}`);
    }

    const keyStart = line.indexOf("key: ") + "key: ".length;
    const parsedKey = parseGoString(line, keyStart);

    const afterKey = line.slice(parsedKey.end);
    const textRel = afterKey.indexOf("text: ");
    if (textRel < 0) {
      throw new Error(`missing text field for ${name}`);
    }
    const parsedText = parseGoString(line, parsedKey.end + textRel + "text: ".length);

    const rest = line.slice(parsedText.end);
    entries.push({
      name,
      code,
      category,
      key: parsedKey.value,
      text: parsedText.value,
      reportsUnnecessary: /\breportsUnnecessary: true\b/.test(rest),
      reportsDeprecated: /\breportsDeprecated: true\b/.test(rest),
      elidedInCompatibilityPyramid: /\belidedInCompatibilityPyramid: true\b/.test(rest),
    });
  }
  return entries;
}

function assertFaithful(entries: readonly DiagnosticEntry[]): void {
  if (entries.length !== EXPECTED_ENTRY_COUNT) {
    throw new Error(`expected ${EXPECTED_ENTRY_COUNT} diagnostic entries, parsed ${entries.length}`);
  }
  const seenKeys = new Set<string>();
  const seenNames = new Set<string>();
  for (const entry of entries) {
    if (seenKeys.has(entry.key)) {
      throw new Error(`duplicate diagnostic key ${entry.key}`);
    }
    if (seenNames.has(entry.name)) {
      throw new Error(`duplicate diagnostic identifier ${entry.name}`);
    }
    seenKeys.add(entry.key);
    seenNames.add(entry.name);
  }
}

function jsonString(value: string): string {
  return JSON.stringify(value);
}

function flagsArg(entry: DiagnosticEntry): string {
  const parts: string[] = [];
  if (entry.reportsUnnecessary) {
    parts.push("reportsUnnecessary: true");
  }
  // Order mirrors the upstream struct field declaration order:
  // reportsUnnecessary, elidedInCompatibilityPyramid, reportsDeprecated.
  if (entry.elidedInCompatibilityPyramid) {
    parts.push("elidedInCompatibilityPyramid: true");
  }
  if (entry.reportsDeprecated) {
    parts.push("reportsDeprecated: true");
  }
  if (parts.length === 0) {
    return "";
  }
  return `, { ${parts.join(", ")} }`;
}

function header(upstreamRelative: string): string {
  return `/**
 * Faithful generated diagnostic message catalog. DO NOT EDIT.
 *
 * Regenerate via \`tools/generate-diagnostics.ts\` (run \`npm run diagnostics:generate\`).
 *
 * 1:1 port of TS-Go \`${upstreamRelative}\` (${EXPECTED_ENTRY_COUNT} entries).
 * Upstream is itself generated by \`internal/diagnostics/generate.go\` from
 * TypeScript's \`diagnosticMessages.json\` and TS-Go's
 * \`extraDiagnosticMessages.json\`.
 *
 * Each upstream \`var Name = &Message{...}\` becomes one entry in the exported
 * \`Diagnostics\` table, keyed by the same exported identifier. The three
 * optional boolean flags (\`reportsUnnecessary\`, \`elidedInCompatibilityPyramid\`,
 * \`reportsDeprecated\`) are preserved exactly as upstream declares them.
 *
 * \`keyToMessage\` mirrors upstream's reverse-lookup switch: it maps a stable
 * \`key\` (\`DiagnosticMessage.key\`) back to its \`DiagnosticMessage\`, or
 * \`undefined\` when the key is unknown.
 */

import type { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { DiagnosticMessage as Message } from "./types.js";

const Category: {
  readonly Warning: DiagnosticCategory;
  readonly Error: DiagnosticCategory;
  readonly Suggestion: DiagnosticCategory;
  readonly Message: DiagnosticCategory;
} = {
  Warning: 0,
  Error: 1,
  Suggestion: 2,
  Message: 3,
};

interface MessageFlags {
  readonly reportsUnnecessary?: boolean;
  readonly reportsDeprecated?: boolean;
  readonly elidedInCompatibilityPyramid?: boolean;
}

function msg(code: number, category: DiagnosticCategory, key: string, text: string, flags?: MessageFlags): Message {
  return {
    code,
    category,
    key,
    message: text,
    ...(flags?.reportsUnnecessary === true ? { reportsUnnecessary: true } : {}),
    ...(flags?.reportsDeprecated === true ? { reportsDeprecated: true } : {}),
    ...(flags?.elidedInCompatibilityPyramid === true ? { elidedInCompatibilityPyramid: true } : {}),
  };
}
`;
}

function generateCatalog(entries: readonly DiagnosticEntry[], upstreamRelative: string): string {
  const tableLines = entries.map(
    (entry) =>
      `  ${entry.name}: msg(${entry.code}, Category.${entry.category}, ${jsonString(entry.key)}, ${jsonString(entry.text)}${flagsArg(entry)}),`,
  );

  const table = `
export const Diagnostics = {
${tableLines.join("\n")}
} as const;

export type DiagnosticsKey = keyof typeof Diagnostics;
`;

  const caseLines = entries.map(
    (entry) => `    case ${jsonString(entry.key)}:\n      return Diagnostics.${entry.name};`,
  );

  const keyToMessage = `
/**
 * Reverse lookup: maps a stable diagnostic \`key\` back to its message. Mirrors
 * upstream \`keyToMessage\`; returns \`undefined\` for unknown keys.
 */
export function keyToMessage(key: string): Message | undefined {
  switch (key) {
${caseLines.join("\n")}
    default:
      return undefined;
  }
}
`;

  return header(upstreamRelative) + table + keyToMessage;
}

async function main(): Promise<void> {
  const upstreamRepo = resolveUpstreamRepo();
  const upstreamRelative = "internal/diagnostics/diagnostics_generated.go";
  const goPath = join(upstreamRepo, upstreamRelative);

  const go = await readFile(goPath, "utf8");
  const entries = parseDiagnosticsTable(go);
  assertFaithful(entries);

  await writeGenerated("src/diagnostics/diagnostics_generated.ts", generateCatalog(entries, upstreamRelative));

  const flagged = entries.filter(
    (entry) => entry.reportsUnnecessary || entry.reportsDeprecated || entry.elidedInCompatibilityPyramid,
  );
  console.log(`Generated diagnostics catalog: ${entries.length} entries, ${flagged.length} flag-bearing.`);
}

await main();
