/**
 * TS-Go container + member inventory.
 *
 * The function inventory (checkTsgoFunctionInventory.ts) proves whether a
 * same-named function/method exists locally; logical-parity proves module/file
 * declaration coverage. Neither proves STRUCTURAL STATE equivalence: that a
 * TS-Go struct's fields, an interface's method set, a receiver type's methods,
 * and a const/iota member set are each represented on a matching TSTS container.
 *
 * This tool closes that gap. It parses CONTAINERS (and their members) from both
 * sides, matches containers across the port (honoring renames.json casing +
 * split-ownership.json), then matches each upstream MEMBER (field / method /
 * const member) to a TSTS member, and classifies both containers and members.
 *
 * Container kinds parsed from TS-Go (.go, excluding *_test.go and generated):
 *   - `struct`    -> fields
 *   - `interface` -> method set
 *   - receiver method group `func (r *T) m(...)` grouped by receiver T -> methods
 *   - enum group `type T <int>` + flat-prefix `const ( TXxx ... )` -> members
 *
 * Container kinds parsed from TSTS (src/**, excluding *.test.ts and ast/generated):
 *   - `class`     -> fields + methods (incl. #private)
 *   - `interface` -> members
 *   - enum / const-object (`const enum X`, `var X: any; (function(X){...})`) -> members
 *   - FREE FUNCTIONS attributed to a Go receiver-type container, when TSTS models
 *     the receiver type as a primitive/alias and ports the receiver methods as
 *     free functions across the split-ownership files for the receiver's home .go.
 *
 * Classifications (per the Codex container/member parity gate directive):
 *   container: matched | missing | renamed | split | generated | go-only
 *   member:    matched | missing | renamed | split | generated | go-only | extra
 *
 * Numbers are kept HONEST: a bare member-name match without container
 * attribution is NOT counted as matched; it is attributed to the right
 * container or recorded as split / receiver-mapping. Real gaps stay visible.
 *
 * This is structural, not semantic. The TS-Go conformance corpus remains the
 * semantic source of truth. Run with --no-fail to surface gaps without failing.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  collectFiles,
  DEFAULT_TSGO_REPO,
  EXCLUDED_TSGO_FILES,
  EXCLUDED_TSTS_FILES,
  isTsGoCandidate,
  isTstsCandidate,
  loadRenameMap,
  loadSplitOwnership,
  MODULES,
  normalizeName,
  PROJECT_ROOT,
  REPO_ROOT,
  splitLocalsForUpstream,
  stripCommentsAndStrings,
  stripLineComment,
  type ClassifiedFile,
  type ModuleSpec,
  type RenameMap,
  type Scope,
  type SplitOwnershipMap,
} from "./tsgoParityShared.js";
import { existsSync } from "node:fs";

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

type ContainerKind = "struct" | "interface" | "receiver" | "enum";
type MemberKind = "field" | "method" | "member";

type ContainerStatus =
  | "matched-container"
  | "missing-container"
  | "renamed-container"
  | "split-container"
  | "generated-container"
  | "go-only-container";

type MemberStatus =
  | "matched-member"
  | "missing-member"
  | "renamed-member"
  | "split-member"
  | "generated-member"
  | "go-only-member"
  | "extra-member";

interface GoMember {
  readonly name: string;
  readonly kind: MemberKind;
}

interface GoContainer {
  readonly module: string;
  readonly file: string;
  readonly name: string;
  readonly kind: ContainerKind;
  readonly exported: boolean;
  readonly generated: boolean;
  readonly members: readonly GoMember[];
}

interface LocalMember {
  readonly name: string;
  readonly kind: MemberKind;
}

interface LocalContainer {
  readonly file: string;
  readonly name: string;
  readonly kind: "class" | "interface" | "enum";
  readonly members: readonly LocalMember[];
}

interface LocalFreeFunction {
  readonly file: string;
  readonly name: string;
}

interface MemberResult {
  readonly upstream: string;
  readonly kind: MemberKind;
  readonly status: MemberStatus;
  readonly localCandidate: string | null;
  readonly note: string;
}

interface ContainerResult {
  readonly module: string;
  readonly upstreamFile: string;
  readonly upstreamContainer: string;
  readonly kind: ContainerKind;
  readonly status: ContainerStatus;
  readonly localContainers: readonly string[];
  readonly members: readonly MemberResult[];
  readonly memberTotals: Readonly<Record<MemberStatus, number>>;
  readonly note: string;
}

interface ModuleSummary {
  readonly module: string;
  readonly scope: Scope;
  readonly containers: number;
  readonly containerStatus: Readonly<Record<ContainerStatus, number>>;
  readonly members: number;
  readonly memberStatus: Readonly<Record<MemberStatus, number>>;
}

interface InventoryReport {
  readonly tsgoRepo: string;
  readonly renameMapFile: string | null;
  readonly splitOwnershipFile: string | null;
  readonly totals: {
    readonly containers: number;
    readonly containerStatus: Readonly<Record<ContainerStatus, number>>;
    readonly members: number;
    readonly memberStatus: Readonly<Record<MemberStatus, number>>;
  };
  readonly modules: readonly ModuleSummary[];
  readonly containersResult: readonly ContainerResult[];
}

// ---------------------------------------------------------------------------
// Go-only container / member scaffolding (mirrors checkLogicalParity.ts).
//
// Containers/members that exist because of Go's runtime/idioms (sync, io, fs,
// goroutines, stringer, JSON marshalling, external-lib facades) have no
// hand-port compiler-logic counterpart. They are classified `go-only-*` rather
// than `missing-*` so honest gaps are not inflated by Go scaffolding.
// ---------------------------------------------------------------------------

const GO_ONLY_MEMBER_NAMES: ReadonlySet<string> = new Set([
  "nocopy",
  "lock",
  "unlock",
  "rlock",
  "runlock",
  "string", // fmt.Stringer; covered by *_stringer_generated.go
  "error", // error interface method
  "marshaljson",
  "unmarshaljson",
  "marshaljsonto",
  "unmarshaljsonfrom",
  "init", // Go package init()
  "read",
  "write",
  "close",
  "seek",
  "sys",
  "clone", // value-semantics helpers; TS uses references
  "accept",
  "acquire",
  "release",
  "modtime",
  "mode",
  "isdir",
  "name",
  "size",
  "type",
  "stat",
  "chtimes",
  "appendfile",
]);

// Go receiver types whose methods exist purely to satisfy stdlib interfaces or
// model Go runtime facades (pools, readers/writers, goroutine sync). Their
// methods are not hand-port compiler logic.
const GO_ONLY_RECEIVER_HINTS: ReadonlySet<string> = new Set([
  "noCopy",
]);

function isGoOnlyMember(name: string): boolean {
  return GO_ONLY_MEMBER_NAMES.has(normalizeName(name));
}

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

function includeDeferred(): boolean {
  return process.argv.includes("--all") || process.argv.includes("--full");
}

function outputJson(): boolean {
  return process.argv.includes("--json");
}

function failOnFindings(): boolean {
  return !process.argv.includes("--no-fail");
}

// ---------------------------------------------------------------------------
// Go container parsing
//
// Brace-balanced block scan over the comment/string-stripped text. We walk the
// stripped source character-stream-free (line oriented) and use a running brace
// depth so struct / interface bodies are captured precisely even across many
// lines. Receiver methods and const/iota groups are scanned separately.
// ---------------------------------------------------------------------------

const GO_BLANK_OR_NOISE = /^[A-Za-z_]/;

// Capture `type Name struct {` / `type Name interface {` blocks and their member
// sets. Field lines inside a struct are `name Type` (possibly multiple names);
// method lines inside an interface are `Name(...) ...` or embedded interfaces.
function parseGoStructsAndInterfaces(
  module: string,
  file: ClassifiedFile,
): readonly GoContainer[] {
  const containers: GoContainer[] = [];
  const stripped = stripCommentsAndStrings(file.text);
  const lines = stripped.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = stripLineComment(lines[i] ?? "").trim();
    const head = /^type\s+([A-Za-z_]\w*)(?:\[[^\]]*\])?\s+(struct|interface)\s*\{/.exec(line);
    if (head === null) continue;
    const name = head[1];
    const kindWord = head[2];
    if (name === undefined || kindWord === undefined) continue;
    const kind: ContainerKind = kindWord === "struct" ? "struct" : "interface";

    // Collect the brace-balanced body. The opening `{` is on this head line, so
    // start the depth from the braces on the REST of the head line after that
    // first `{`. This makes a same-line `struct{}` / `struct{ X int }` close
    // immediately instead of swallowing later declarations.
    const headOpen = line.indexOf("{");
    const headTail = headOpen >= 0 ? line.slice(headOpen + 1) : "";
    const bodyLines: string[] = [];
    let depth = 1;
    for (const ch of headTail) {
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
    }
    if (depth > 0 && headTail.trim() !== "" && !headTail.trim().startsWith("}")) {
      bodyLines.push(headTail);
    }
    let j = i + 1;
    for (; j < lines.length && depth > 0; j += 1) {
      const raw = stripLineComment(lines[j] ?? "");
      let lineDepth = depth;
      for (const ch of raw) {
        if (ch === "{") lineDepth += 1;
        else if (ch === "}") lineDepth -= 1;
      }
      if (depth > 0 && lineDepth > 0) bodyLines.push(raw);
      else if (depth > 0 && lineDepth <= 0) bodyLines.push(raw); // closing line residue
      depth = lineDepth;
    }
    const members = kind === "struct"
      ? parseGoStructFields(bodyLines)
      : parseGoInterfaceMethods(bodyLines);
    containers.push({
      module,
      file: file.path,
      name,
      kind,
      exported: /^[A-Z]/.test(name),
      generated: file.generated,
      members,
    });
    i = j - 1;
  }
  return containers;
}

// Struct fields: `name Type`, `name, name2 Type`, or embedded `Type`. We take
// the leading identifier(s) before the first whitespace-delimited type token.
// Embedded fields (a bare type name, capitalized) are skipped as members because
// they are composition, not named state.
function parseGoStructFields(bodyLines: readonly string[]): readonly GoMember[] {
  const members: GoMember[] = [];
  const seen = new Set<string>();
  for (const raw of bodyLines) {
    const line = raw.trim();
    if (line === "" || !GO_BLANK_OR_NOISE.test(line)) continue;
    if (line.startsWith("}") || line.startsWith("{")) continue;
    // `name Type` / `name, name2 Type`. Capture the comma-separated leading
    // identifier list, then require a following type token (a space + non-comma).
    const fieldMatch = /^([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)\s+\S/.exec(line);
    if (fieldMatch === null) continue;
    const names = fieldMatch[1];
    if (names === undefined) continue;
    // An embedded field is a single capitalized type with no following token of
    // a different form; we keep only entries that look like `ident <type>` where
    // the first token is a field name. Heuristic: skip if the line is a single
    // token (embedded) — handled by requiring `\s+\S` above (single token fails).
    for (const part of names.split(",")) {
      const fieldName = part.trim();
      if (fieldName === "" || seen.has(fieldName)) continue;
      seen.add(fieldName);
      members.push({ name: fieldName, kind: "field" });
    }
  }
  return members;
}

// Interface methods: `Name(args) returns` or embedded interface `OtherIface`.
// Embedded interfaces (bare capitalized identifier, no parens) are skipped.
function parseGoInterfaceMethods(bodyLines: readonly string[]): readonly GoMember[] {
  const members: GoMember[] = [];
  const seen = new Set<string>();
  for (const raw of bodyLines) {
    const line = raw.trim();
    if (line === "") continue;
    const methodMatch = /^([A-Za-z_]\w*)\s*\(/.exec(line);
    if (methodMatch === null) continue;
    const methodName = methodMatch[1];
    if (methodName === undefined || seen.has(methodName)) continue;
    seen.add(methodName);
    members.push({ name: methodName, kind: "method" });
  }
  return members;
}

// Receiver methods: `func (r *T) Name(...)` / `func (r T) Name(...)` grouped by
// receiver type T (pointer marker + generic type-args stripped). Each receiver
// type becomes a `receiver` container with its method set.
function parseGoReceiverGroups(
  module: string,
  file: ClassifiedFile,
): readonly GoContainer[] {
  const byReceiver = new Map<string, GoMember[]>();
  const stripped = stripCommentsAndStrings(file.text);
  for (const rawLine of stripped.split("\n")) {
    const line = stripLineComment(rawLine);
    if (!line.startsWith("func ")) continue;
    const method = /^func\s+\(\s*[A-Za-z_]\w*\s+\*?([A-Za-z_]\w*)(?:\[[^\]]*\])?\s*\)\s*([A-Za-z_]\w*)\s*(?:\[|\()/.exec(line);
    if (method === null) continue;
    const receiver = method[1];
    const name = method[2];
    if (receiver === undefined || name === undefined) continue;
    const existing = byReceiver.get(receiver);
    if (existing === undefined) byReceiver.set(receiver, [{ name, kind: "method" }]);
    else if (!existing.some((m) => m.name === name)) existing.push({ name, kind: "method" });
  }
  return [...byReceiver.entries()].map(([receiver, members]) => ({
    module,
    file: file.path,
    name: receiver,
    kind: "receiver" as ContainerKind,
    exported: /^[A-Z]/.test(receiver),
    generated: file.generated,
    members,
  }));
}

// Enum const/iota groups: a `type T <integer kind>` declaration plus a
// `const ( ... )` block whose members are flat-prefixed with T (e.g.
// `ScriptKindUnknown`). The container is T; its members are the prefix-stripped
// member names. This is the Go side of the enum/const-object member-set compare.
function parseGoEnumGroups(
  module: string,
  file: ClassifiedFile,
): readonly GoContainer[] {
  const stripped = stripCommentsAndStrings(file.text);
  const lines = stripped.split("\n");
  // Integer-typed enum container names: `type Foo int` / `int32` / `uint32`...
  const enumTypeNames = new Set<string>();
  for (const rawLine of lines) {
    const line = stripLineComment(rawLine).trim();
    const typeMatch = /^type\s+([A-Za-z_]\w*)\s+(?:u?int(?:8|16|32|64)?|byte|rune)\b/.exec(line);
    const typeName = typeMatch?.[1];
    if (typeName !== undefined) enumTypeNames.add(typeName);
  }
  if (enumTypeNames.size === 0) return [];

  // Collect flat-prefix const members. We scan const ( ... ) blocks and direct
  // `Name Type = ...` const declarations, then bucket each constant whose name
  // begins with a known enum type prefix into that enum's member set.
  const constNames: string[] = [];
  let inConstBlock = false;
  for (const rawLine of lines) {
    const line = stripLineComment(rawLine).trim();
    if (line === "") continue;
    if (!inConstBlock) {
      if (/^const\s*\(/.test(line)) { inConstBlock = true; continue; }
      const direct = /^const\s+([A-Za-z_]\w*)\b/.exec(line)?.[1];
      if (direct !== undefined) constNames.push(direct);
      continue;
    }
    if (line.startsWith(")")) { inConstBlock = false; continue; }
    const memberName = /^([A-Za-z_]\w*)\b/.exec(line)?.[1];
    if (memberName !== undefined) constNames.push(memberName);
  }

  // Bucket constants into enums by longest-matching type prefix so that
  // overlapping prefixes (e.g. `Flags` vs `FlagsExtended`) attribute correctly.
  const byEnum = new Map<string, GoMember[]>();
  for (const enumName of enumTypeNames) byEnum.set(enumName, []);
  const sortedPrefixes = [...enumTypeNames].sort((a, b) => b.length - a.length);
  for (const constName of constNames) {
    const prefix = sortedPrefixes.find((p) => constName.length > p.length && constName.startsWith(p));
    if (prefix === undefined) continue;
    const member = constName.slice(prefix.length);
    if (!/^[A-Za-z_]/.test(member)) continue;
    const bucket = byEnum.get(prefix);
    if (bucket !== undefined && !bucket.some((m) => m.name === member)) {
      bucket.push({ name: member, kind: "member" });
    }
  }

  // Only emit enum containers that actually have flat-prefix members; a bare
  // `type Foo int` with no members is just a type alias, covered elsewhere.
  return [...byEnum.entries()]
    .filter(([, members]) => members.length > 0)
    .map(([enumName, members]) => ({
      module,
      file: file.path,
      name: enumName,
      kind: "enum" as ContainerKind,
      exported: /^[A-Z]/.test(enumName),
      generated: file.generated,
      members,
    }));
}

function parseGoContainers(module: string, files: readonly ClassifiedFile[]): readonly GoContainer[] {
  return files.flatMap((file) => [
    ...parseGoStructsAndInterfaces(module, file),
    ...parseGoReceiverGroups(module, file),
    ...parseGoEnumGroups(module, file),
  ]);
}

// ---------------------------------------------------------------------------
// TSTS container parsing
// ---------------------------------------------------------------------------

const TS_NON_MEMBER_WORDS: ReadonlySet<string> = new Set([
  "if", "for", "switch", "while", "catch", "return", "throw", "new", "function",
  "do", "else", "case", "default", "typeof", "await", "yield", "in", "of",
  "constructor", "get", "set",
]);

// Parse TSTS `class` / `interface` containers and their members, plus free
// functions (for receiver-method attribution). enum / const-object containers
// are parsed separately so their member sets are captured exactly.
function parseTstsContainers(
  files: readonly ClassifiedFile[],
): { readonly containers: readonly LocalContainer[]; readonly freeFunctions: readonly LocalFreeFunction[] } {
  const containers: LocalContainer[] = [];
  const freeFunctions: LocalFreeFunction[] = [];
  for (const file of files) {
    const stripped = stripCommentsAndStrings(file.text);
    const lines = stripped.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
      const line = stripLineComment(lines[i] ?? "");
      const trimmed = line.trim();

      // class / interface container with a brace-balanced body.
      const classMatch = /^(?:export\s+)?(?:declare\s+)?(?:abstract\s+)?(class|interface)\s+([A-Za-z_$][\w$]*)\b/.exec(trimmed);
      if (classMatch !== null && line.includes("{")) {
        const kindWord = classMatch[1];
        const name = classMatch[2];
        if (kindWord !== undefined && name !== undefined) {
          const result = captureTsBody(lines, i);
          const members = kindWord === "class"
            ? parseTsClassMembers(result.bodyLines)
            : parseTsInterfaceMembers(result.bodyLines);
          containers.push({ file: file.path, name, kind: kindWord === "class" ? "class" : "interface", members });
          i = result.end;
          continue;
        }
      }

      // Free function (function decl or arrow-bound const): receiver-method
      // attribution candidates.
      const fn = /^\s*(?:export\s+)?(?:declare\s+)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)\b/.exec(line);
      if (fn?.[1] !== undefined) { freeFunctions.push({ file: file.path, name: fn[1] }); continue; }
      const arrow = /^\s*(?:export\s+)?(?:declare\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*(?:async\s+)?(?:<[^>]*>\s*)?\([^)]*\)\s*(?::[^=]+)?=>/.exec(line);
      if (arrow?.[1] !== undefined) { freeFunctions.push({ file: file.path, name: arrow[1] }); }
    }
    containers.push(...parseTsEnumContainers(file, lines));
  }
  return { containers, freeFunctions };
}

interface BodyLine {
  readonly text: string;
  // Brace depth, relative to the container body, at the START of this line. A
  // top-level container member sits at relativeDepth 1; lines nested inside a
  // method body (locals, control flow) sit at relativeDepth >= 2 and must NOT be
  // counted as members.
  readonly relativeDepth: number;
}

interface CapturedBody {
  readonly bodyLines: readonly BodyLine[];
  readonly end: number;
}

// Capture the brace-balanced body that opens on `startLine`. Each body line is
// tagged with the brace depth (relative to the container body) at its start so
// member parsers can restrict themselves to top-level (relativeDepth === 1)
// declarations and ignore locals inside method bodies. Returns the index of the
// last consumed line so the caller can resume after the container.
function captureTsBody(lines: readonly string[], startLine: number): CapturedBody {
  let depth = 0;
  const startRaw = stripLineComment(lines[startLine] ?? "");
  for (const ch of startRaw) {
    if (ch === "{") depth += 1;
    else if (ch === "}") depth -= 1;
  }
  if (depth <= 0) return { bodyLines: [], end: startLine };
  const bodyLines: BodyLine[] = [];
  let j = startLine + 1;
  for (; j < lines.length && depth > 0; j += 1) {
    const raw = stripLineComment(lines[j] ?? "");
    const entryDepth = depth;
    for (const ch of raw) {
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
    }
    if (entryDepth >= 1) bodyLines.push({ text: raw, relativeDepth: entryDepth });
  }
  return { bodyLines, end: j - 1 };
}

// Class members: fields (`name:`, `readonly name:`, `#name:`, `static name =`)
// and methods (`name(...) {`, `#name(...) {`, accessors). Nested function bodies
// are tolerated because we only key on member-shaped lines at any depth; a few
// false members are acceptable (they only ever ADD to local coverage, never
// hide an upstream gap), but control keywords are excluded.
function parseTsClassMembers(bodyLines: readonly BodyLine[]): readonly LocalMember[] {
  const members: LocalMember[] = [];
  const seen = new Set<string>();
  for (const body of bodyLines) {
    // Only top-level class members (relativeDepth 1); skip locals/control flow
    // declared inside method bodies so they cannot inflate the member set.
    if (body.relativeDepth !== 1) continue;
    const line = body.text.trim();
    if (line === "") continue;
    // method: `[modifiers] name(...)[: type] {`
    const method = /^(?:public\s+|private\s+|protected\s+|static\s+|override\s+|abstract\s+|async\s+|readonly\s+)*(?:get\s+|set\s+)?(#?[A-Za-z_$][\w$]*)\s*(?:<[^>{}]*>)?\([^;{}]*\)\s*(?::[^=>{}]*)?\{/.exec(line);
    if (method?.[1] !== undefined) {
      const name = method[1].replace(/^#/, "");
      if (!TS_NON_MEMBER_WORDS.has(name) && !seen.has(`m:${name}`)) {
        seen.add(`m:${name}`);
        members.push({ name: method[1], kind: "method" });
      }
      continue;
    }
    // field: `[modifiers] name[?]: type;` or `[modifiers] name = ...;`
    const field = /^(?:public\s+|private\s+|protected\s+|static\s+|override\s+|abstract\s+|readonly\s+|declare\s+)*(#?[A-Za-z_$][\w$]*)\s*[?!]?\s*(?::[^=({}]+|=)/.exec(line);
    if (field?.[1] !== undefined) {
      const name = field[1].replace(/^#/, "");
      if (!TS_NON_MEMBER_WORDS.has(name) && !seen.has(`f:${name}`)) {
        seen.add(`f:${name}`);
        members.push({ name: field[1], kind: "field" });
      }
    }
  }
  return members;
}

// Interface members: properties (`name?: type;`, `readonly name: type;`) and
// method signatures (`name(...): type;`). Both kinds are recorded as members.
function parseTsInterfaceMembers(bodyLines: readonly BodyLine[]): readonly LocalMember[] {
  const members: LocalMember[] = [];
  const seen = new Set<string>();
  for (const body of bodyLines) {
    if (body.relativeDepth !== 1) continue;
    const line = body.text.trim();
    if (line === "") continue;
    const methodSig = /^(?:readonly\s+)?([A-Za-z_$][\w$]*)\s*(?:<[^>{}]*>)?\([^;{}]*\)\s*:/.exec(line);
    if (methodSig?.[1] !== undefined && !TS_NON_MEMBER_WORDS.has(methodSig[1])) {
      if (!seen.has(methodSig[1])) { seen.add(methodSig[1]); members.push({ name: methodSig[1], kind: "method" }); }
      continue;
    }
    const prop = /^(?:readonly\s+)?([A-Za-z_$][\w$]*)\s*[?]?\s*:/.exec(line);
    if (prop?.[1] !== undefined && !TS_NON_MEMBER_WORDS.has(prop[1])) {
      if (!seen.has(prop[1])) { seen.add(prop[1]); members.push({ name: prop[1], kind: "field" }); }
    }
  }
  return members;
}

// enum / const-object containers (the generate:enums surface and hand-authored
// const enums). Two shapes:
//   `export const enum X { Member = 0, ... }`
//   `export var X: any; (function (X) { X[X["Member"] = 0] = "Member"; })(...)`
function parseTsEnumContainers(file: ClassifiedFile, lines: readonly string[]): readonly LocalContainer[] {
  const originalLines = file.text.split("\n");
  const containers: LocalContainer[] = [];

  // `const enum X { ... }`
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = stripLineComment(lines[i] ?? "").trim();
    const enumMatch = /^(?:export\s+)?(?:declare\s+)?(?:const\s+)?enum\s+([A-Za-z_$][\w$]*)\b/.exec(trimmed);
    if (enumMatch?.[1] === undefined || !trimmed.includes("{")) continue;
    const name = enumMatch[1];
    const result = captureTsBody(lines, i);
    const members: LocalMember[] = [];
    const seen = new Set<string>();
    for (const body of result.bodyLines) {
      if (body.relativeDepth !== 1) continue;
      const memberName = /^([A-Za-z_$][\w$]*)\s*(?:=|,|$)/.exec(body.text.trim())?.[1];
      if (memberName !== undefined && !seen.has(memberName)) { seen.add(memberName); members.push({ name: memberName, kind: "member" }); }
    }
    if (members.length > 0) containers.push({ file: file.path, name, kind: "enum", members });
    i = result.end;
  }

  // generate:enums IIFE form: container `var X: any;` + `X[X["Member"] = 0] = "Member";`.
  const iifeContainers = new Map<string, LocalMember[]>();
  for (const rawLine of originalLines) {
    const container = /^\s*(?:export\s+)?var\s+([A-Za-z_$][\w$]*)\s*:\s*any\s*;/.exec(rawLine)?.[1];
    if (container !== undefined && !iifeContainers.has(container)) iifeContainers.set(container, []);
    const memberMatch = /^\s*([A-Za-z_$][\w$]*)\[[A-Za-z_$][\w$]*\["([A-Za-z_$][\w$]*)"\]\s*=/.exec(rawLine);
    const enumName = memberMatch?.[1];
    const member = memberMatch?.[2];
    if (enumName !== undefined && member !== undefined) {
      const bucket = iifeContainers.get(enumName) ?? [];
      if (!bucket.some((m) => m.name === member)) bucket.push({ name: member, kind: "member" });
      iifeContainers.set(enumName, bucket);
    }
  }
  for (const [name, members] of iifeContainers) {
    if (members.length > 0) containers.push({ file: file.path, name, kind: "enum", members });
  }

  return containers;
}

// ---------------------------------------------------------------------------
// Matching + classification
// ---------------------------------------------------------------------------

// Index local containers by normalized name (folding the casing convention).
function indexLocalContainers(containers: readonly LocalContainer[]): Map<string, LocalContainer[]> {
  const map = new Map<string, LocalContainer[]>();
  for (const container of containers) {
    const key = normalizeName(container.name);
    const existing = map.get(key);
    if (existing === undefined) map.set(key, [container]);
    else existing.push(container);
  }
  return map;
}

function renameTarget(renames: RenameMap, module: string, file: string, name: string): readonly string[] {
  const entry =
    renames.entries[`${file}#${name}`] ??
    renames.entries[`${module}:${name}`] ??
    renames.entries[name];
  if (entry === undefined) return [];
  const out: string[] = [];
  if (entry.localName !== undefined) out.push(entry.localName);
  if (entry.localNames !== undefined) out.push(...entry.localNames);
  return out;
}

// Aggregate the members exposed by the TSTS files that the split-ownership map
// associates with a receiver's home .go file, indexed by normalized member name.
// Free functions in those files count as receiver-method ports.
function splitOwnedMemberIndex(
  module: string,
  goFile: string,
  splits: SplitOwnershipMap,
  localFreeFnByFile: ReadonlyMap<string, readonly LocalFreeFunction[]>,
  localContainersByFile: ReadonlyMap<string, readonly LocalContainer[]>,
): ReadonlyMap<string, string> {
  const index = new Map<string, string>();
  // The split-ownership keys are upstream paths relative to internal/ (e.g.
  // `binder/binder.go`), exactly the shape of go.file, so look up by go.file.
  void module;
  const localFiles = splitLocalsForUpstream(splits, goFile);
  for (const local of localFiles) {
    const fns = localFreeFnByFile.get(local) ?? [];
    for (const fn of fns) {
      const key = normalizeName(fn.name);
      if (!index.has(key)) index.set(key, `${local}:${fn.name}`);
    }
    for (const container of localContainersByFile.get(local) ?? []) {
      for (const member of container.members) {
        const key = normalizeName(member.name);
        if (!index.has(key)) index.set(key, `${local}:${container.name}.${member.name}`);
      }
    }
  }
  return index;
}

function tallyMembers(members: readonly MemberResult[]): Record<MemberStatus, number> {
  const totals: Record<MemberStatus, number> = {
    "matched-member": 0,
    "missing-member": 0,
    "renamed-member": 0,
    "split-member": 0,
    "generated-member": 0,
    "go-only-member": 0,
    "extra-member": 0,
  };
  for (const member of members) totals[member.status] += 1;
  return totals;
}

interface LocalIndexes {
  readonly byName: ReadonlyMap<string, readonly LocalContainer[]>;
  readonly globalFreeFnNames: ReadonlySet<string>;
  readonly freeFnByFile: ReadonlyMap<string, readonly LocalFreeFunction[]>;
  readonly containersByFile: ReadonlyMap<string, readonly LocalContainer[]>;
}

// Classify a single Go container and all its members against the local indexes.
function classifyContainer(
  go: GoContainer,
  scope: Scope,
  local: LocalIndexes,
  renames: RenameMap,
  splits: SplitOwnershipMap,
): ContainerResult {
  const normalized = normalizeName(go.name);
  const exactMatches = local.byName.get(normalized) ?? [];
  const renameNames = renameTarget(renames, go.module, go.file, go.name);
  const renameMatches = renameNames.flatMap((rn) => local.byName.get(normalizeName(rn)) ?? []);

  // A receiver container whose methods are ported as FREE FUNCTIONS across the
  // split-ownership files for its home .go is a split (not missing). Build the
  // split member index up front so both container and member classification use it.
  const splitMemberIndex = splitOwnedMemberIndex(go.module, go.file, splits, local.freeFnByFile, local.containersByFile);

  // Determine container status.
  const containerStatus = ((): { status: ContainerStatus; locals: readonly string[]; note: string } => {
    if (go.generated) {
      return { status: "generated-container", locals: [], note: "declared in a generated TS-Go file; check via generated/schema parity tools" };
    }
    if (exactMatches.length > 1) {
      return {
        status: "split-container",
        locals: exactMatches.map((c) => `${c.file}:${c.name}`),
        note: `container is split across ${exactMatches.length} TSTS files`,
      };
    }
    if (exactMatches.length === 1) {
      const match = exactMatches[0];
      if (match === undefined) return { status: "missing-container", locals: [], note: "" };
      // Exact-name (case-insensitive after stripping #/_) match. If the casing
      // differs it is an intentional casing rename; otherwise a clean match.
      const sameCase = match.name === go.name || match.name.replace(/^#/, "") === go.name;
      if (!sameCase && renames.casingConventionEnabled) {
        return { status: "renamed-container", locals: [`${match.file}:${match.name}`], note: "intentional casing rename (renames.json casingConvention)" };
      }
      return { status: "matched-container", locals: [`${match.file}:${match.name}`], note: "" };
    }
    if (renameMatches.length > 0) {
      return {
        status: "renamed-container",
        locals: renameMatches.map((c) => `${c.file}:${c.name}`),
        note: "explicit rename (renames.json renames.entries)",
      };
    }
    if (go.kind === "receiver" && splitMemberIndex.size > 0) {
      // No same-named TSTS class, but the receiver's methods are ported as free
      // functions across the split files for its home .go: a receiver split.
      return {
        status: "split-container",
        locals: [...new Set([...splitMemberIndex.values()].map((v) => v.split(":")[0] ?? ""))].filter((f) => f.length > 0),
        note: "receiver methods modeled as free functions across split-ownership files",
      };
    }
    if (GO_ONLY_RECEIVER_HINTS.has(go.name) || (go.kind === "receiver" && go.members.every((m) => isGoOnlyMember(m.name)))) {
      return { status: "go-only-container", locals: [], note: "Go runtime/stdlib facade (no hand-port compiler counterpart)" };
    }
    return { status: "missing-container", locals: [], note: "" };
  })();

  // Determine the local container(s) we match members against. For a matched/
  // renamed/split-by-class container we use the matched local container members;
  // for a receiver split we use the split member index.
  const matchedLocalContainers = [...exactMatches, ...renameMatches];
  const localMemberIndex = buildLocalMemberIndex(matchedLocalContainers);

  const containerGenerated = containerStatus.status === "generated-container";
  const containerGoOnly = containerStatus.status === "go-only-container";

  const members = go.members.map((member): MemberResult => {
    const key = normalizeName(member.name);
    // Members inherit a generated/go-only container classification: a member of
    // a generated container is checked via schema/generated tools, and a member
    // of a Go-only facade has no hand-port counterpart by construction.
    if (containerGenerated) {
      return { upstream: member.name, kind: member.kind, status: "generated-member", localCandidate: null, note: "generated container" };
    }
    if (containerGoOnly) {
      return { upstream: member.name, kind: member.kind, status: "go-only-member", localCandidate: null, note: "Go-only facade member" };
    }
    // 1) member on a matched/renamed/split local container of the same name.
    const direct = localMemberIndex.get(key);
    if (direct !== undefined) {
      // Exact case when the upstream member name (sans leading #) appears in the
      // local container(s) with identical case; otherwise it is the intentional
      // PascalCase->camelCase / #private casing rename.
      const exactCase = direct.exactCaseNames.has(member.name) || direct.exactCaseNames.has(member.name.replace(/^#/, ""));
      const status: MemberStatus = direct.split
        ? "split-member"
        : exactCase ? "matched-member" : (renames.casingConventionEnabled ? "renamed-member" : "matched-member");
      return {
        upstream: member.name,
        kind: member.kind,
        status,
        localCandidate: direct.candidate,
        note: direct.split ? "member found on multiple matched local containers" : exactCase ? "" : "casing rename",
      };
    }
    // 2) receiver-method-as-free-function (split attribution).
    const splitCandidate = splitMemberIndex.get(key);
    if (splitCandidate !== undefined) {
      return { upstream: member.name, kind: member.kind, status: "split-member", localCandidate: splitCandidate, note: "ported as free function in split-ownership file" };
    }
    // 3) Go-only scaffolding member.
    if (isGoOnlyMember(member.name)) {
      return { upstream: member.name, kind: member.kind, status: "go-only-member", localCandidate: null, note: "Go runtime/stdlib scaffolding member" };
    }
    // 4) genuinely missing.
    return { upstream: member.name, kind: member.kind, status: "missing-member", localCandidate: null, note: "" };
  });

  // Extra members: local members with no upstream counterpart. Only meaningful
  // when the UPSTREAM container is the full surface for the local container — a
  // Go struct (fields) or interface/enum (members). A Go RECEIVER container is a
  // method-only view of a TSTS class that also legitimately holds fields and the
  // methods of OTHER receivers; reporting those as `extra` would be dishonest
  // double-counting, so receivers do not produce extras.
  const extraMembers: MemberResult[] = [];
  if (go.kind !== "receiver") {
    const upstreamMemberKeys = new Set(go.members.map((m) => normalizeName(m.name)));
    // A struct's upstream surface is FIELDS only; its TSTS class also holds
    // methods (ported from the matching receiver container) which must not be
    // double-counted as struct extras. Restrict extras to the local member kind
    // that aligns with the upstream container kind.
    const extraKinds: ReadonlySet<MemberKind> = go.kind === "struct"
      ? new Set<MemberKind>(["field"])
      : new Set<MemberKind>(["field", "method", "member"]);
    const seenExtra = new Set<string>();
    for (const container of matchedLocalContainers) {
      for (const member of container.members) {
        if (!extraKinds.has(member.kind)) continue;
        const key = normalizeName(member.name);
        if (upstreamMemberKeys.has(key) || seenExtra.has(key)) continue;
        seenExtra.add(key);
        extraMembers.push({ upstream: `${container.name}.${member.name}`, kind: member.kind, status: "extra-member", localCandidate: `${container.file}:${member.name}`, note: "local member with no upstream counterpart" });
      }
    }
  }

  const allMembers = [...members, ...extraMembers];
  return {
    module: go.module,
    upstreamFile: go.file,
    upstreamContainer: go.name,
    kind: go.kind,
    status: containerStatus.status,
    localContainers: containerStatus.locals,
    members: allMembers,
    memberTotals: tallyMembers(allMembers),
    note: scope === "deferred" ? `${containerStatus.note} (deferred module)`.trim() : containerStatus.note,
  };
}

interface LocalMemberHit {
  readonly candidate: string;
  readonly split: boolean;
  // Local member names (leading `#` stripped) under this normalized key, with
  // case preserved. The caller compares the upstream member's exact name against
  // this set to tell an exact-case match from an intentional casing rename.
  readonly exactCaseNames: ReadonlySet<string>;
}

// Build a normalized-name -> hit index over the matched local container(s).
// `split` is true when more than one matched container exposes the member.
function buildLocalMemberIndex(containers: readonly LocalContainer[]): ReadonlyMap<string, LocalMemberHit> {
  const collector = new Map<string, { candidates: string[]; exactCaseNames: Set<string> }>();
  for (const container of containers) {
    for (const member of container.members) {
      const key = normalizeName(member.name);
      const entry = collector.get(key) ?? { candidates: [], exactCaseNames: new Set<string>() };
      entry.candidates.push(`${container.file}:${container.name}.${member.name}`);
      entry.exactCaseNames.add(member.name.replace(/^#/, ""));
      collector.set(key, entry);
    }
  }
  const index = new Map<string, LocalMemberHit>();
  for (const [key, entry] of collector) {
    index.set(key, {
      candidate: entry.candidates[0] ?? "",
      split: entry.candidates.length > 1,
      exactCaseNames: entry.exactCaseNames,
    });
  }
  return index;
}

// ---------------------------------------------------------------------------
// Aggregation + reporting
// ---------------------------------------------------------------------------

const CONTAINER_STATUSES: readonly ContainerStatus[] = [
  "matched-container", "missing-container", "renamed-container", "split-container", "generated-container", "go-only-container",
];
const MEMBER_STATUSES: readonly MemberStatus[] = [
  "matched-member", "missing-member", "renamed-member", "split-member", "generated-member", "go-only-member", "extra-member",
];

function zeroContainerTotals(): Record<ContainerStatus, number> {
  return { "matched-container": 0, "missing-container": 0, "renamed-container": 0, "split-container": 0, "generated-container": 0, "go-only-container": 0 };
}

function zeroMemberTotals(): Record<MemberStatus, number> {
  return { "matched-member": 0, "missing-member": 0, "renamed-member": 0, "split-member": 0, "generated-member": 0, "go-only-member": 0, "extra-member": 0 };
}

function summarizeModule(module: string, scope: Scope, results: readonly ContainerResult[]): ModuleSummary {
  const containerStatus = zeroContainerTotals();
  const memberStatus = zeroMemberTotals();
  let members = 0;
  for (const result of results) {
    containerStatus[result.status] += 1;
    for (const member of result.members) { memberStatus[member.status] += 1; members += 1; }
  }
  return { module, scope, containers: results.length, containerStatus, members, memberStatus };
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function renderText(report: InventoryReport): string {
  const lines: string[] = [];
  lines.push("TSTS / TS-Go Container + Member Inventory");
  lines.push(`tsgo_repo=${report.tsgoRepo}`);
  lines.push(`rename_map=${report.renameMapFile ?? "(none)"}`);
  lines.push(`split_ownership=${report.splitOwnershipFile ?? "(none)"}`);
  lines.push("");

  const ct = report.totals.containerStatus;
  const matchedContainers = ct["matched-container"] + ct["renamed-container"] + ct["split-container"];
  lines.push(
    `containers=${report.totals.containers} matched=${ct["matched-container"]} renamed=${ct["renamed-container"]} `
    + `split=${ct["split-container"]} missing=${ct["missing-container"]} generated=${ct["generated-container"]} `
    + `go-only=${ct["go-only-container"]} represented=${percent(report.totals.containers === 0 ? 1 : matchedContainers / report.totals.containers)}`,
  );
  const mt = report.totals.memberStatus;
  const matchedMembers = mt["matched-member"] + mt["renamed-member"] + mt["split-member"];
  const memberDenom = report.totals.members - mt["extra-member"];
  lines.push(
    `members=${report.totals.members} matched=${mt["matched-member"]} renamed=${mt["renamed-member"]} `
    + `split=${mt["split-member"]} missing=${mt["missing-member"]} generated=${mt["generated-member"]} `
    + `go-only=${mt["go-only-member"]} extra=${mt["extra-member"]} represented=${percent(memberDenom === 0 ? 1 : matchedMembers / memberDenom)}`,
  );
  lines.push("");
  lines.push("module containers(matched/renamed/split/missing/gen/go-only) members(matched/renamed/split/missing/gen/go-only/extra) scope");
  for (const summary of report.modules) {
    const c = summary.containerStatus;
    const m = summary.memberStatus;
    lines.push(
      `${summary.module} C=${c["matched-container"]}/${c["renamed-container"]}/${c["split-container"]}/${c["missing-container"]}/${c["generated-container"]}/${c["go-only-container"]} `
      + `M=${m["matched-member"]}/${m["renamed-member"]}/${m["split-member"]}/${m["missing-member"]}/${m["generated-member"]}/${m["go-only-member"]}/${m["extra-member"]} scope=${summary.scope}`,
    );
  }
  lines.push("");

  // Top containers by missing members.
  const worst = [...report.containersResult]
    .map((r) => ({ r, missing: r.memberTotals["missing-member"] }))
    .filter((x) => x.missing > 0)
    .sort((a, b) => b.missing - a.missing)
    .slice(0, 20);
  lines.push("Top 20 containers by missing members:");
  for (const { r, missing } of worst) {
    lines.push(`  ${missing} missing  ${r.status}  ${r.module} ${r.upstreamFile}#${r.upstreamContainer} (${r.kind})`);
  }
  lines.push("");

  // Top missing containers.
  const missingContainers = report.containersResult.filter((r) => r.status === "missing-container").slice(0, 30);
  lines.push("Top missing containers:");
  for (const r of missingContainers) {
    lines.push(`  MISSING ${r.module} ${r.upstreamFile}#${r.upstreamContainer} (${r.kind}, ${r.members.length} members)`);
  }
  return lines.join("\n");
}

function writeOutputs(report: InventoryReport, text: string): void {
  const tempDir = join(REPO_ROOT, ".temp");
  mkdirSync(tempDir, { recursive: true });
  writeFileSync(join(tempDir, "tsgo-container-member-inventory.json"), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(join(tempDir, "tsgo-container-member-inventory.txt"), `${text}\n`);
}

function specsToRun(): readonly ModuleSpec[] {
  return includeDeferred() ? MODULES : MODULES.filter((spec) => spec.scope === "required");
}

function buildLocalIndexes(localContainers: readonly LocalContainer[], freeFunctions: readonly LocalFreeFunction[]): LocalIndexes {
  const freeFnByFile = new Map<string, LocalFreeFunction[]>();
  for (const fn of freeFunctions) {
    const existing = freeFnByFile.get(fn.file);
    if (existing === undefined) freeFnByFile.set(fn.file, [fn]);
    else existing.push(fn);
  }
  const containersByFile = new Map<string, LocalContainer[]>();
  for (const container of localContainers) {
    const existing = containersByFile.get(container.file);
    if (existing === undefined) containersByFile.set(container.file, [container]);
    else existing.push(container);
  }
  return {
    byName: indexLocalContainers(localContainers),
    globalFreeFnNames: new Set(freeFunctions.map((fn) => normalizeName(fn.name))),
    freeFnByFile,
    containersByFile,
  };
}

function main(): void {
  const tsgoRepo = process.env.TSGO_REPO ?? DEFAULT_TSGO_REPO;
  const tsgoInternal = join(tsgoRepo, "internal");
  const tstsSrc = join(PROJECT_ROOT, "src");
  if (!existsSync(tsgoInternal)) {
    console.error(`TS-Go internal directory not found: ${tsgoInternal}`);
    process.exit(2);
  }

  const renames = loadRenameMap();
  const splits = loadSplitOwnership();
  const specs = specsToRun();

  // Build a GLOBAL local index across every in-scope module: receiver methods
  // ported as free functions, and split containers, frequently live in TSTS
  // files outside the upstream module's 1:1 directory. A global index keeps
  // cross-module split attribution honest.
  const allLocalFiles = collectFiles(tstsSrc, specs.flatMap((s) => s.local), isTstsCandidate, "ts", EXCLUDED_TSTS_FILES);
  const parsedLocal = parseTstsContainers(allLocalFiles);
  const localIndexes = buildLocalIndexes(parsedLocal.containers, parsedLocal.freeFunctions);

  const moduleResults = specs.map((spec) => {
    const scope: Scope = includeDeferred() ? "required" : spec.scope;
    const upstreamFiles = collectFiles(tsgoInternal, [spec.upstream], isTsGoCandidate, "go", EXCLUDED_TSGO_FILES);
    const goContainers = parseGoContainers(spec.upstream, upstreamFiles);
    const results = goContainers.map((go) => classifyContainer(go, scope, localIndexes, renames, splits));
    return { spec, scope, results };
  });

  const containersResult = moduleResults.flatMap((r) => r.results);
  const modules = moduleResults.map((r) => summarizeModule(r.spec.upstream, r.scope, r.results));

  const containerStatus = zeroContainerTotals();
  const memberStatus = zeroMemberTotals();
  let members = 0;
  for (const result of containersResult) {
    containerStatus[result.status] += 1;
    for (const member of result.members) { memberStatus[member.status] += 1; members += 1; }
  }

  const report: InventoryReport = {
    tsgoRepo,
    renameMapFile: renames.path,
    splitOwnershipFile: splits.path,
    totals: { containers: containersResult.length, containerStatus, members, memberStatus },
    modules,
    containersResult,
  };

  const text = renderText(report);
  writeOutputs(report, text);
  console.log(outputJson() ? JSON.stringify(report, null, 2) : text);

  // A finding is any genuinely-missing container or member in a required module.
  const hasFailure = modules.some((summary) =>
    summary.scope === "required" && (summary.containerStatus["missing-container"] > 0 || summary.memberStatus["missing-member"] > 0));
  process.exit(hasFailure && failOnFindings() ? 1 : 0);
}

// CONTAINER_STATUSES / MEMBER_STATUSES are exported-style constants used for
// stable status ordering; reference them so the lint/typecheck treats them as
// intentionally retained even when the renderer iterates them implicitly.
void CONTAINER_STATUSES;
void MEMBER_STATUSES;

main();
