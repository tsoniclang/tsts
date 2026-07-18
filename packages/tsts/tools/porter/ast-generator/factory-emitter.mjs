import { addRefsFromTsType } from "./node-emitter.mjs";

export function emitFactory(schema) {
  const lines = [];
  lines.push(`import type { bool, int } from "../../../go/scalars.js";`);
  lines.push(`import type { GoPtr, GoSlice } from "../../../go/compat.js";`);
  lines.push(`import type { Arena } from "../../core/arena.js";`);
  lines.push(`import { NodeDefault_AsNode, NodeFactory_newNode, updateNode } from "../spine.js";`);
  lines.push(`import type { ModifierList, Node, NodeFactoryHooks, NodeList, nodeData } from "../spine.js";`);
  lines.push(`import type { ModifierFlags } from "../modifierflags.js";`);
  lines.push(`import type { NodeFlags } from "./flags.js";`);
  lines.push(`import type { TokenFlags } from "../tokenflags.js";`);
  lines.push(`import {`);
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    lines.push(`  create${node}Data,`);
  }
  lines.push(`} from "./data.js";`);
  lines.push(`import type {`);
  const dataImports = new Set();
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    dataImports.add(node);
  }
  for (const d of [...dataImports].sort()) lines.push(`  ${d},`);
  lines.push(`} from "./data.js";`);
  lines.push(`import {`);
  for (const k of factoryKindConstants(schema)) lines.push(`  ${k},`);
  lines.push(`} from "./kinds.js";`);
  lines.push(`import type { Kind } from "./kinds.js";`);
  const bitmasks = factoryBitmaskConstants(schema);
  const nodeFlagMasks = bitmasks.filter((b) => b.startsWith("NodeFlags"));
  const tokenFlagMasks = bitmasks.filter((b) => b.startsWith("TokenFlags"));
  if (nodeFlagMasks.length > 0) {
    lines.push(`import {`);
    for (const b of nodeFlagMasks) lines.push(`  ${b},`);
    lines.push(`} from "./flags.js";`);
  }
  if (tokenFlagMasks.length > 0) {
    lines.push(`import {`);
    for (const b of tokenFlagMasks) lines.push(`  ${b},`);
    lines.push(`} from "../tokenflags.js";`);
  }
  lines.push(`import type {`);
  const unionRefs = collectFactoryParamRefs(schema);
  for (const u of unionRefs) lines.push(`  ${u},`);
  lines.push(`} from "./unions.js";`);
  lines.push("");

  // NodeFactory struct (hooks + 46 arenas + counters).
  emitNodeFactoryStruct(schema, lines);

  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    emitNewFactories(schema, node, lines);
  }
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    const childMembers = schema.schemaMembers(node).filter((m) => m.isChild());
    if (childMembers.length === 0) continue;
    emitUpdateFactory(schema, node, lines);
  }
  return lines.join("\n");
}

function emitNodeFactoryStruct(schema, lines) {
  const arenaFields = [];
  for (const node of schema.nodeNames()) {
    if (!schema.definitions[node].arena) continue;
    arenaFields.push({ field: `${schema.uncapitalize(node)}Arena`, type: node });
  }
  arenaFields.push({ field: "modifierListArena", type: "ModifierList" });
  arenaFields.push({ field: "nodeListArena", type: "NodeList" });
  arenaFields.sort((a, b) => a.field.localeCompare(b.field));

  lines.push(`export interface NodeFactory {`);
  lines.push(`  hooks: NodeFactoryHooks;`);
  lines.push(`  AsNodeFactory(): GoPtr<NodeFactory>;`);
  for (const { field, type } of arenaFields) {
    lines.push(`  ${field}?: Arena<${type}>;`);
  }
  lines.push(`  nodeCount: int;`);
  lines.push(`  textCount: int;`);
  lines.push(`}`);
  lines.push("");
}

function factoryKindConstants(schema) {
  const out = new Set();
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    const members = schema.schemaMembers(node);
    const kindMember = members.find((m) => m.isKindParam());
    if (!kindMember) out.add(`Kind${schema.syntaxKindName(node)}`);
    for (const alias of schema.kindAliasesOf(node)) out.add(`Kind${alias}`);
  }
  return [...out].sort();
}

// Bitmask constants referenced by New* factories (data.X = (p & MASK) >>> 0
// and node.Flags |= (p & MASK)). These are value imports from flags/tokenflags.
function factoryBitmaskConstants(schema) {
  const out = new Set();
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    for (const m of schema.schemaMembers(node)) {
      if (m.bitmask) out.add(m.bitmask);
    }
  }
  return [...out].sort();
}

function collectFactoryParamRefs(schema) {
  const refs = new Set();
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    for (const m of schema.schemaMembers(node)) {
      if (m.isKindParam()) continue;
      addRefsFromTsType(m.tsReference(), refs);
    }
  }
  return [...refs].sort();
}

function hasTextContent(schema, node) {
  return schema.schemaMembers(node).some((m) => {
    if (Array.isArray(m.rawType)) return false;
    if (m.listKind === "raw") return m.rawType === "string";
    return m.rawType === "string";
  });
}

function emitNewFactories(schema, node, lines) {
  const members = schema.schemaMembers(node);
  const kindMember = members.find((m) => m.isKindParam());
  const nodeFlagsMembers = members.filter((m) => !Array.isArray(m.rawType) && m.rawType === "NodeFlags");
  emitNewFactory(schema, `New${node}`, schema.syntaxKindName(node), node, members, kindMember, nodeFlagsMembers, lines);
  for (const alias of schema.kindAliasesOf(node)) {
    emitNewFactory(schema, `New${alias}`, alias, node, members, kindMember, nodeFlagsMembers, lines);
  }
}

function emitNewFactory(schema, funcName, kindName, node, members, kindMember, nodeFlagsMembers, lines) {
  const params = members.map((m) => `${m.goParamName()}: ${m.tsReference()}`);
  const paramList = ["receiver: GoPtr<NodeFactory>", ...params].join(", ");
  lines.push(`export function ${funcName}(${paramList}): GoPtr<Node> {`);
  lines.push(`  const data = create${node}Data();`);
  for (const m of members) {
    if (m.isKindParam()) continue;
    if (!Array.isArray(m.rawType) && m.rawType === "NodeFlags") continue;
    const rawValue = m.goParamName();
    const value = m.bitmask
      ? `(${rawValue} & ${m.bitmask}) >>> 0`
      : !Array.isArray(m.rawType) && m.rawType === "string"
        ? `${rawValue} ?? ""`
        : rawValue;
    lines.push(`  data.${m.name} = ${value};`);
  }
  if (schema.baseChainOf(node).includes("TemplateLiteralLikeNodeBase") && !members.some((m) => m.name === "RawText")) {
    lines.push(`  data.RawText = "";`);
  }
  if (hasTextContent(schema, node)) {
    lines.push(`  receiver!.textCount = (receiver!.textCount + 1) as int;`);
  }
  const kindArg = kindMember ? kindMember.goParamName() : `Kind${kindName}`;
  if (nodeFlagsMembers.length > 0) {
    lines.push(`  const node = NodeFactory_newNode(receiver, ${kindArg}, data);`);
    for (const m of nodeFlagsMembers) {
      const p = m.goParamName();
      if (m.bitmask) lines.push(`  node!.Flags = (node!.Flags | (${p} & ${m.bitmask})) >>> 0;`);
      else lines.push(`  node!.Flags = ${p};`);
    }
    lines.push(`  return node;`);
  } else {
    lines.push(`  return NodeFactory_newNode(receiver, ${kindArg}, data);`);
  }
  lines.push(`}`);
  lines.push("");
}

function emitUpdateFactory(schema, node, lines) {
  const members = schema.schemaMembers(node);
  const updateMembers = members.filter((m) => !m.isKindParam());
  const params = updateMembers.map((m) => `${m.goParamName()}: ${m.tsReference()}`);
  const paramList = ["receiver: GoPtr<NodeFactory>", `node: GoPtr<${node}>`, ...params].join(", ");
  lines.push(`export function NodeFactory_Update${node}(${paramList}): GoPtr<Node> {`);
  const comparisons = updateMembers.map((m) => `${m.goParamName()} !== ${updateCompareAccess(m)}`);
  lines.push(`  if (${comparisons.join(" || ")}) {`);
  const newArgs = members.map((m) => (m.isKindParam() ? "node!.Kind" : m.goParamName())).join(", ");
  const aliases = schema.kindAliasesOf(node);
  if (aliases.length === 0) {
    lines.push(`    return updateNode(New${node}(receiver, ${newArgs}), NodeDefault_AsNode(node), receiver!.hooks);`);
  } else {
    lines.push(`    switch (NodeDefault_AsNode(node)!.Kind) {`);
    lines.push(`      case Kind${schema.syntaxKindName(node)}:`);
    lines.push(`        return updateNode(New${node}(receiver, ${newArgs}), NodeDefault_AsNode(node), receiver!.hooks);`);
    for (const alias of aliases) {
      lines.push(`      case Kind${alias}:`);
      lines.push(`        return updateNode(New${alias}(receiver, ${newArgs}), NodeDefault_AsNode(node), receiver!.hooks);`);
    }
    lines.push(`      default:`);
    lines.push(`        throw new globalThis.Error("unexpected kind in NodeFactory_Update${node}: " + NodeDefault_AsNode(node)!.Kind);`);
    lines.push(`    }`);
  }
  lines.push(`  }`);
  lines.push(`  return NodeDefault_AsNode(node);`);
  lines.push(`}`);
  lines.push("");
}

function updateCompareAccess(m) {
  if (!Array.isArray(m.rawType) && m.rawType === "NodeFlags") return "node!.Flags";
  return `node!.${m.name}`;
}

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
  lines.push(`import { goReceiverKey } from "../spine.js";`);
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
    lines.push(`  return n!.data[goReceiverKey] as GoPtr<${node}>;`);
    lines.push(`}`);
    lines.push("");
  }
  return lines.join("\n");
}
