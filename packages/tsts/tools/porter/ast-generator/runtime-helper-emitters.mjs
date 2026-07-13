// ── predicates.ts (IsXxx) ────────────────────────────────────────────────────

export function emitPredicates(schema) {
  const lines = [];
  lines.push(`import type { bool } from "../../../go/scalars.js";`);
  lines.push(`import type { GoPtr, GoSlice } from "../../../go/compat.js";`);
  lines.push(`import type { Node } from "../spine.js";`);
  lines.push(`import type { Kind } from "./kinds.js";`);
  lines.push(`import {`);
  for (const k of predicateKindConstants(schema)) lines.push(`  ${k},`);
  lines.push(`} from "./kinds.js";`);
  lines.push("");

  for (const node of schema.nodeNames()) {
    emitIsFunction(schema, node, lines);
  }
  emitKindAliasGuards(schema, lines);
  return lines.join("\n");
}

function predicateKindConstants(schema) {
  const out = new Set();
  for (const node of schema.nodeNames()) {
    const kt = schema.kindTypesOf(node);
    if (kt.isTypeParameter || schema.isMultiKind(node)) {
      for (const k of kt.kindNames) out.add(`Kind${k}`);
    } else {
      out.add(`Kind${schema.syntaxKindName(node)}`);
      for (const alias of schema.kindAliasesOf(node)) out.add(`Kind${alias}`);
    }
  }
  // kind alias guards
  for (const name of schema.kindAliasNames()) {
    const guard = goKindGuardNameJs(name);
    if (guard === "IsJSDocKind") continue;
    if (schema.kindAliasIsRange(name)) {
      const [first, last] = schema.kindAliasRange(name);
      out.add(`Kind${first}`);
      out.add(`Kind${last}`);
    } else {
      for (const m of schema.expandKindAliasMembers(name)) out.add(`Kind${m}`);
    }
  }
  return [...out].sort();
}

function emitIsFunction(schema, node, lines) {
  const kt = schema.kindTypesOf(node);
  if (kt.isTypeParameter) {
    lines.push(`export function Is${node}(node: GoPtr<Node>): bool {`);
    lines.push(`  switch (node!.Kind) {`);
    lines.push(`    ${kt.kindNames.map((k) => `case Kind${k}:`).join("\n    ")}`);
    lines.push(`      return true as bool;`);
    lines.push(`  }`);
    lines.push(`  return false as bool;`);
    lines.push(`}`);
    lines.push("");
    return;
  }
  if (schema.isMultiKind(node)) {
    for (const k of kt.kindNames) {
      lines.push(`export function Is${k}(node: GoPtr<Node>): bool {`);
      lines.push(`  return (node!.Kind === Kind${k}) as bool;`);
      lines.push(`}`);
      lines.push("");
    }
    return;
  }
  lines.push(`export function Is${node}(node: GoPtr<Node>): bool {`);
  lines.push(`  return (node!.Kind === Kind${schema.syntaxKindName(node)}) as bool;`);
  lines.push(`}`);
  lines.push("");
  for (const alias of schema.kindAliasesOf(node)) {
    lines.push(`export function Is${alias}(node: GoPtr<Node>): bool {`);
    lines.push(`  return (node!.Kind === Kind${alias}) as bool;`);
    lines.push(`}`);
    lines.push("");
  }
}

function kindGuardNameJs(aliasName) {
  return `is${aliasName.replace("Syntax", "")}`;
}

function goKindGuardNameJs(aliasName) {
  const n = kindGuardNameJs(aliasName);
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function emitKindAliasGuards(schema, lines) {
  for (const name of schema.kindAliasNames()) {
    const funcName = goKindGuardNameJs(name);
    if (funcName === "IsJSDocKind") continue;
    if (schema.kindAliasIsRange(name)) {
      const [first, last] = schema.kindAliasRange(name);
      lines.push(`export function ${funcName}(kind: Kind): bool {`);
      lines.push(`  return (kind >= Kind${first} && kind <= Kind${last}) as bool;`);
      lines.push(`}`);
      lines.push("");
    } else {
      const expanded = schema.expandKindAliasMembers(name);
      lines.push(`export function ${funcName}(kind: Kind): bool {`);
      lines.push(`  switch (kind) {`);
      lines.push(`    ${expanded.map((m) => `case Kind${m}:`).join("\n    ")}`);
      lines.push(`      return true as bool;`);
      lines.push(`  }`);
      lines.push(`  return false as bool;`);
      lines.push(`}`);
      lines.push("");
    }
  }
}

// ── casts.ts (AsXxx) ─────────────────────────────────────────────────────────

export function emitCasts(schema) {
  const lines = [];
  lines.push(`import type { GoPtr } from "../../../go/compat.js";`);
  lines.push(`import { goReceiverKey } from "../../../go/compat.js";`);
  lines.push(`import type { Node } from "../spine.js";`);
  lines.push(`import type {`);
  const dataImports = [];
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    dataImports.push(node);
  }
  for (const d of dataImports.sort()) lines.push(`  ${d},`);
  lines.push(`} from "./data.js";`);
  lines.push("");
  lines.push(`// Recovers the concrete receiver behind a Node's nodeData interface value`);
  lines.push(`// (Go: n.data.(*Concrete)). Panics (throws) on kind mismatch, matching Go's`);
  lines.push(`// single-return type assertion.`);
  lines.push("");
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) {
      lines.push(`// As${node}: ${node} struct is hand-written in ../ast.ts.`);
      lines.push("");
      continue;
    }
    lines.push(`export function As${node}(n: GoPtr<Node>): GoPtr<${node}> {`);
    lines.push(`  return n!.data![goReceiverKey] as GoPtr<${node}>;`);
    lines.push(`}`);
    lines.push("");
  }
  return lines.join("\n");
}

// ── visitor.ts (ForEachChild registry) ──────────────────────────────────────

export function emitVisitor(schema) {
  const lines = [];
  lines.push(`// forEachChild/VisitEachChild traversal surface — re-exports the generated`);
  lines.push(`// per-kind concrete overrides (defined in data.ts) for every child-bearing`);
  lines.push(`// concrete kind. Runtime dispatch goes through nodeData; this module gives`);
  lines.push(`// traversal functions a stable named surface.`);
  lines.push("");
  const entries = [];
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    if (schema.definitions[node].handWrittenVisitor) continue;
    const childMembers = schema.schemaMembers(node).filter((m) => m.isChild());
    if (childMembers.length === 0) continue;
    entries.push(node);
  }
  lines.push(`export {`);
  for (const node of entries) {
    lines.push(`  ${node}_ForEachChild,`);
    lines.push(`  ${node}_VisitEachChild,`);
  }
  lines.push(`} from "./data.js";`);
  lines.push("");
  return lines.join("\n");
}
