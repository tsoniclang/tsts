// TSTS AST generator.
//
// Reads the checked-in AST schema (packages/tsts/schema/tsgo/*) and emits the
// generated AST infrastructure under packages/tsts/src/internal/ast/generated/.
// This is the TypeScript analogue of TS-Go's ast_generated.go / kind_generated.go
// / kind_stringer_generated.go, produced deterministically from the same schema.
//
// Output files carry file-level @tsgo-generated metadata and are checked the same
// way as the Go-compat facades: missing / stale / orphan / untracked / invalid.
// Safe-write contract: create missing, no-op identical, fail on different unless
// --force.
//
// Emitters are intentionally incremental. The NodeData-independent surfaces
// (kinds, flags) land first; node/data/adapters/factory/visitor follow under the
// same pipeline.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { hashText, resolveRepo, writeTextSafely } from "./porter.mjs";

const GENERATOR = "porter:ast";
const GENERATED_KIND = "ast-generated";

// ---------------------------------------------------------------------------
// Config / schema loading
// ---------------------------------------------------------------------------

export function astConfig(config) {
  const tsRoot = (config.tsRoot ?? "packages/tsts/src").replace(/\/$/, "");
  return {
    tsRoot,
    schemaDir: config.astSchemaDir ?? "packages/tsts/schema/tsgo",
    generatedDir: config.astGeneratedDir ?? "internal/ast/generated",
    schemaInputs: config.astSchemaInputs ?? [
      "packages/tsts/schema/tsgo/ast.json",
      "packages/tsts/schema/tsgo/ast.schema.json",
      "packages/tsts/schema/tsgo/nodeflags.go",
      "packages/tsts/schema/tsgo/symbolflags.go",
    ],
  };
}

export function loadAstSchema(config) {
  const ac = astConfig(config);
  const astJsonPath = resolveRepo(path.join(ac.schemaDir, "ast.json"));
  const nodeFlagsPath = resolveRepo(path.join(ac.schemaDir, "nodeflags.go"));
  const symbolFlagsPath = resolveRepo(path.join(ac.schemaDir, "symbolflags.go"));
  return {
    ast: JSON.parse(readFileSync(astJsonPath, "utf8")),
    nodeFlagsSource: readFileSync(nodeFlagsPath, "utf8"),
    symbolFlagsSource: readFileSync(symbolFlagsPath, "utf8"),
  };
}

// ---------------------------------------------------------------------------
// Go const-block evaluation (for flag bit values)
//
// Go integer-constant precedence differs from JavaScript: `<<`/`>>`/`&`/`&^`
// bind tighter than `+`/`-`/`|`/`^`. We therefore evaluate each flag to its
// concrete uint32 value with Go precedence instead of re-emitting an expression
// that JavaScript would parse differently.
// ---------------------------------------------------------------------------

function tokenizeGoExpr(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === " " || ch === "\t") {
      i += 1;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[0-9xXa-fA-F_]/.test(input[j])) j += 1;
      tokens.push({ type: "number", value: input.slice(i, j) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /[A-Za-z0-9_]/.test(input[j])) j += 1;
      tokens.push({ type: "ident", value: input.slice(i, j) });
      i = j;
      continue;
    }
    const two = input.slice(i, i + 2);
    if (two === "<<" || two === ">>" || two === "&^") {
      tokens.push({ type: "op", value: two });
      i += 2;
      continue;
    }
    if ("|&^+-*/()~".includes(ch)) {
      tokens.push({ type: "op", value: ch });
      i += 1;
      continue;
    }
    throw new Error(`unexpected character in Go const expression: ${JSON.stringify(ch)} in ${JSON.stringify(input)}`);
  }
  return tokens;
}

function parseGoIntLiteral(text) {
  const normalized = text.replaceAll("_", "");
  const value = Number(normalized);
  if (!Number.isFinite(value)) throw new Error(`invalid integer literal: ${text}`);
  return value;
}

// Precedence-climbing evaluator. Higher number binds tighter.
const GO_BINARY_PRECEDENCE = {
  "|": 1,
  "^": 1,
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
  "<<": 4,
  ">>": 4,
  "&": 4,
  "&^": 4,
};

function evalGoExpr(tokens, lookup) {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  const parsePrimary = () => {
    const token = next();
    if (!token) throw new Error("unexpected end of Go const expression");
    if (token.type === "number") return parseGoIntLiteral(token.value);
    if (token.type === "ident") {
      if (!(token.value in lookup)) throw new Error(`unknown identifier in const expression: ${token.value}`);
      return lookup[token.value];
    }
    if (token.value === "(") {
      const inner = parseExpr(0);
      const close = next();
      if (!close || close.value !== ")") throw new Error("missing closing paren in const expression");
      return inner;
    }
    if (token.value === "-") return -parseUnary();
    if (token.value === "+") return parseUnary();
    if (token.value === "^" || token.value === "~") return ~parseUnary();
    throw new Error(`unexpected token in const expression: ${token.value}`);
  };

  function parseUnary() {
    const token = peek();
    if (token && token.type === "op" && (token.value === "-" || token.value === "+" || token.value === "^" || token.value === "~")) {
      next();
      const operand = parseUnary();
      if (token.value === "-") return -operand;
      if (token.value === "+") return operand;
      return ~operand;
    }
    return parsePrimary();
  }

  function parseExpr(minPrecedence) {
    let left = parseUnary();
    while (true) {
      const token = peek();
      if (!token || token.type !== "op") break;
      const precedence = GO_BINARY_PRECEDENCE[token.value];
      if (precedence === undefined || precedence < minPrecedence) break;
      next();
      const right = parseExpr(precedence + 1);
      left = applyGoBinary(token.value, left, right);
    }
    return left;
  }

  const result = parseExpr(0);
  if (pos !== tokens.length) throw new Error("trailing tokens in Go const expression");
  return result;
}

function applyGoBinary(op, left, right) {
  switch (op) {
    case "|":
      return left | right;
    case "^":
      return left ^ right;
    case "&":
      return left & right;
    case "&^":
      return left & ~right;
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return Math.trunc(left / right);
    case "<<":
      return left << right;
    case ">>":
      return left >> right;
    default:
      throw new Error(`unsupported operator: ${op}`);
  }
}

// Parse a `type Name uintNN` + single `const ( ... )` block, returning the
// ordered list of { name, value, comment } with each value evaluated to uint32.
export function parseGoFlagFile(source, typeName) {
  const typeMatch = new RegExp(`type\\s+${typeName}\\s+(u?int\\d+)`).exec(source);
  if (!typeMatch) throw new Error(`could not find 'type ${typeName} ...' declaration`);
  const constStart = source.indexOf("const (", typeMatch.index);
  if (constStart < 0) throw new Error(`could not find const block for ${typeName}`);
  const bodyStart = source.indexOf("\n", constStart) + 1;
  const constEnd = source.indexOf("\n)", bodyStart);
  if (constEnd < 0) throw new Error(`unterminated const block for ${typeName}`);
  const body = source.slice(bodyStart, constEnd);

  const lookup = {};
  const entries = [];
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (line === "") {
      entries.push({ kind: "blank" });
      continue;
    }
    if (line.startsWith("//")) {
      entries.push({ kind: "comment", text: line.slice(2).trim() });
      continue;
    }
    // Name [Type] = expr [// comment]
    const commentSplit = splitTrailingComment(line);
    const decl = commentSplit.code.trim();
    const eq = decl.indexOf("=");
    if (eq < 0) throw new Error(`unparseable const line for ${typeName}: ${line}`);
    const lhs = decl.slice(0, eq).trim().split(/\s+/);
    const name = lhs[0];
    const exprText = decl.slice(eq + 1).trim();
    const value = evalGoExpr(tokenizeGoExpr(exprText), lookup) >>> 0;
    lookup[name] = value;
    entries.push({ kind: "const", name, value, comment: commentSplit.comment });
  }
  return entries;
}

function splitTrailingComment(line) {
  // Flag files have no string literals, so the first `//` outside none begins a comment.
  const idx = line.indexOf("//");
  if (idx < 0) return { code: line, comment: "" };
  return { code: line.slice(0, idx), comment: line.slice(idx + 2).trim() };
}

// ---------------------------------------------------------------------------
// Emitters
// ---------------------------------------------------------------------------

export function emitKinds(schema) {
  const elements = schema.ast.kinds?.elements ?? [];
  const markers = schema.ast.kinds?.markers ?? [];
  const lines = [];
  lines.push(`import type { short } from "@tsonic/core/types.js";`);
  lines.push("");
  lines.push("// SyntaxKind constants. Go: type Kind int16 (iota-sequential).");
  lines.push("export type Kind = short;");
  lines.push("");

  const names = [];
  let index = 0;
  for (const element of elements) {
    if (typeof element === "string") {
      lines.push(`export const Kind${element}: Kind = ${index};`);
      names.push(element);
      index += 1;
      continue;
    }
    if (element && typeof element === "object") {
      if (element.name) {
        const suffix = element.comment ? ` // ${element.comment}` : "";
        lines.push(`export const Kind${element.name}: Kind = ${index};${suffix}`);
        names.push(element.name);
        index += 1;
        continue;
      }
      if (element.comment) {
        lines.push(`// ${element.comment}`);
        continue;
      }
    }
    throw new Error(`unsupported kind element: ${JSON.stringify(element)}`);
  }

  if (markers.length > 0) {
    lines.push("");
    lines.push("// Range markers (aliases of existing kinds).");
    for (const marker of markers) {
      lines.push(`export const Kind${marker.name}: Kind = Kind${marker.value};`);
    }
  }

  // Faithful analogue of the Go stringer: returns the constant name, or
  // `Kind(n)` for out-of-range values.
  lines.push("");
  lines.push("const kindNames: readonly string[] = [");
  for (const name of names) {
    lines.push(`  "Kind${name}",`);
  }
  lines.push("];");
  lines.push("");
  lines.push("export function KindString(kind: Kind): string {");
  lines.push("  const value = kind as number;");
  lines.push("  if (value >= 0 && value < kindNames.length) return kindNames[value]!;");
  lines.push("  return `Kind(${value})`;");
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

function emitFlags(schema) {
  const nodeFlags = parseGoFlagFile(schema.nodeFlagsSource, "NodeFlags");
  const symbolFlags = parseGoFlagFile(schema.symbolFlagsSource, "SymbolFlags");
  const lines = [];
  lines.push(`import type { uint } from "@tsonic/core/types.js";`);
  lines.push("");
  emitFlagGroup(lines, "NodeFlags", "Go: type NodeFlags uint32", nodeFlags);
  lines.push("");
  emitFlagGroup(lines, "SymbolFlags", "Go: type SymbolFlags uint32", symbolFlags);
  lines.push("");
  return lines.join("\n");
}

function emitFlagGroup(lines, typeName, banner, entries) {
  lines.push(`// ${banner}`);
  lines.push(`export type ${typeName} = uint;`);
  for (const entry of entries) {
    if (entry.kind === "blank") {
      lines.push("");
      continue;
    }
    if (entry.kind === "comment") {
      lines.push(`// ${entry.text}`);
      continue;
    }
    const suffix = entry.comment ? ` // ${entry.comment}` : "";
    lines.push(`export const ${entry.name}: ${typeName} = ${entry.value};${suffix}`);
  }
}

function emitIndex() {
  const lines = [];
  lines.push(`export * from "./kinds.js";`);
  lines.push(`export * from "./flags.js";`);
  lines.push("");
  return lines.join("\n");
}

const EMITTERS = [
  { file: "kinds.ts", emit: emitKinds },
  { file: "flags.ts", emit: emitFlags },
  { file: "index.ts", emit: emitIndex },
];

// ---------------------------------------------------------------------------
// File assembly + metadata
// ---------------------------------------------------------------------------

// Deterministic digest of each declared schema input, so porter:ast --check can
// fail with a useful diagnostic when a specific input changes.
function schemaInputDigests(ac) {
  return ac.schemaInputs.map((relativePath) => ({
    path: relativePath,
    contentHash: hashText(readFileSync(resolveRepo(relativePath), "utf8")),
  }));
}

function generatedHeader(relativePath, body, sourceRevision, schemaInputs) {
  const metadata = {
    schemaVersion: 1,
    kind: GENERATED_KIND,
    generator: GENERATOR,
    sourceRevision,
    schemaInputs,
    path: relativePath,
    contentHash: hashText(body),
  };
  return `// Code generated by TSTS AST generator. DO NOT EDIT.\n// @tsgo-generated ${JSON.stringify(metadata)}\n\n`;
}

// Returns Map<tsRootRelativePath, fullFileText>.
export function buildAstGeneratedFiles(config, sourceRevision) {
  const ac = astConfig(config);
  const schema = loadAstSchema(config);
  const schemaInputs = schemaInputDigests(ac);
  const files = new Map();
  for (const emitter of EMITTERS) {
    const relativePath = `${ac.generatedDir}/${emitter.file}`;
    const body = emitter.emit(schema);
    const header = generatedHeader(relativePath, body, sourceRevision, schemaInputs);
    files.set(relativePath, header + body);
  }
  return files;
}

function generatedDirAbsolute(config) {
  const ac = astConfig(config);
  return resolveRepo(path.join(ac.tsRoot, ac.generatedDir));
}

function walkTsFiles(root) {
  if (!existsSync(root)) return [];
  const out = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".ts")) {
      out.push(full);
    }
  }
  return out;
}

function parseAstMetadata(text) {
  const match = /^\/\/ @tsgo-generated\s+({[^\n\r]+})/m.exec(text);
  if (!match) return undefined;
  try {
    return JSON.parse(match[1]);
  } catch {
    return undefined;
  }
}

// Returns { missing, stale, orphan, untracked, invalid } — same shape as facades.
export function buildAstGeneratedArtifactStatus(config, sourceRevision) {
  const ac = astConfig(config);
  const expected = buildAstGeneratedFiles(config, sourceRevision);
  const expectedPaths = new Set(expected.keys());
  const root = generatedDirAbsolute(config);
  const actualFiles = walkTsFiles(root).map((file) => `${ac.generatedDir}/${path.relative(root, file).split(path.sep).join("/")}`);
  const actualPaths = new Set(actualFiles);

  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = [];

  for (const relativePath of [...expectedPaths].sort()) {
    if (!actualPaths.has(relativePath)) {
      missing.push({ path: relativePath, reason: "Expected generated AST artifact is missing." });
    }
  }

  for (const relativePath of actualFiles) {
    const absolute = resolveRepo(path.join(ac.tsRoot, relativePath));
    const text = readFileSync(absolute, "utf8");
    const metadata = parseAstMetadata(text);
    if (!metadata) {
      untracked.push({ path: relativePath, reason: "Generated AST directory file is missing @tsgo-generated metadata." });
      continue;
    }
    if (metadata.kind !== GENERATED_KIND || metadata.generator !== GENERATOR) {
      invalid.push({ path: relativePath, reason: "Generated AST file metadata kind/generator is not ast-generated/porter:ast." });
      continue;
    }
    if (!expectedPaths.has(relativePath)) {
      orphan.push({ path: relativePath, reason: "Generated AST file is no longer produced from the current schema." });
      continue;
    }
    if (text !== expected.get(relativePath)) {
      stale.push({ path: relativePath, reason: "Generated AST file differs from the current deterministic generator output." });
    }
  }

  return { missing, stale, orphan, untracked, invalid };
}

export function collectAstArtifactFailures(status) {
  const failures = [];
  if (status.missing.length > 0) failures.push(`${status.missing.length} missing AST generated artifacts`);
  if (status.stale.length > 0) failures.push(`${status.stale.length} stale AST generated artifacts`);
  if (status.orphan.length > 0) failures.push(`${status.orphan.length} orphan AST generated artifacts`);
  if (status.untracked.length > 0) failures.push(`${status.untracked.length} untracked AST generated artifacts`);
  if (status.invalid.length > 0) failures.push(`${status.invalid.length} invalid AST generated artifacts`);
  return failures;
}

export function writeAstGenerated(config, sourceRevision, options = {}) {
  const ac = astConfig(config);
  const expected = buildAstGeneratedFiles(config, sourceRevision);
  const results = [];
  for (const [relativePath, text] of expected) {
    const absolute = resolveRepo(path.join(ac.tsRoot, relativePath));
    const outcome = writeTextSafely(absolute, text, { force: options.force === true, label: "AST generated artifact" });
    results.push({ path: relativePath, outcome });
  }
  return results;
}

export function emptyAstGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}
