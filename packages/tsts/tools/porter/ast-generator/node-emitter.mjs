import {
  BASE_METHOD_PROVIDERS,
  HAND_WRITTEN_BASES,
  NODE_DATA_METHODS,
} from "./adapter-model.mjs";
import {
  emitAdapter,
  emitConcreteInterface,
  emitGeneratedVisitHelpers,
  emitOverrideFreeFns,
} from "./adapter-emitter.mjs";

export function emitUnions(schema) {
  const lines = [];
  lines.push(`import type { Node, NodeList } from "../spine.js";`);
  lines.push("");

  // Block 1: <NodeName>Node = Node, then instantiation aliases.
  lines.push("// Node type aliases");
  for (const node of schema.nodeNames()) {
    lines.push(`export type ${node}Node = Node;`);
  }
  for (const node of schema.nodeNames()) {
    for (const alias of schema.instantiationAliasesOf(node)) {
      lines.push(`export type ${alias.name} = Node;`);
    }
  }
  lines.push("");

  // Block 2: list aliases.
  lines.push("// NodeList aliases");
  for (const [name, element] of Object.entries(schema.listAliases)) {
    lines.push(`export type ${name} = NodeList; // NodeList[*${element}]`);
  }
  lines.push("");

  // Block 3: node union aliases.
  lines.push("// Node union aliases");
  for (const name of Object.keys(schema.aliases)) {
    lines.push(`export type ${name} = Node;`);
  }
  lines.push("");
  return lines.join("\n");
}

// ── node.ts (schema base data interfaces) ────────────────────────────────────

export function emitNode(schema) {
  const lines = [];
  lines.push(`import type { bool, int } from "../../../go/scalars.js";`);
  lines.push(`import type { GoPtr, GoSlice } from "../../../go/compat.js";`);
  lines.push(`import { Uint32 } from "../../../go/sync/atomic.js";`);
  lines.push(`import type { ModifierList, Node, NodeBase, NodeList } from "../spine.js";`);
  lines.push(`import type { ModifierFlags } from "../modifierflags.js";`);
  lines.push(`import type { TokenFlags } from "../tokenflags.js";`);
  lines.push(`import type {`);
  // forward node-union / list references used by base fields
  const unionRefs = collectBaseFieldRefs(schema);
  for (const ref of unionRefs) lines.push(`  ${ref},`);
  lines.push(`} from "./unions.js";`);
  lines.push("");
  lines.push(`// Symbol/SymbolTable/FlowNode are owned by sibling ast-package files (deferred);`);
  lines.push(`// they appear only on goOnly base fields, which are excluded from this TS layer.`);
  lines.push("");

  for (const baseName of schema.baseNames()) {
    if (HAND_WRITTEN_BASES.has(baseName)) continue;
    const brand = schema.baseBrand(baseName);
    // NodeBase is hand-written (spine.ts) but remains in the extends chain so the
    // generated bases root to Node via spine's NodeBase -> NodeDefault -> Node.
    const exts = schema.extendsKeysOf(baseName);
    const extendsClause = exts.length > 0 ? ` extends ${exts.join(", ")}` : "";
    const fieldLines = [];
    if (brand) {
      fieldLines.push(`  readonly ${brand}?: never;`);
    }
    // CompositeBase.facts is goOnly in the schema, but the hand-written
    // CompositeBase_subtreeFactsWorker (spine.ts) reads/writes it. It is a real
    // runtime field (atomic.Uint32), so emit it faithfully.
    if (baseName === "CompositeBase") {
      fieldLines.push(`  facts: Uint32;`);
    }
    for (const field of schema.baseFields(baseName)) {
      if (field.noTS) continue;
      fieldLines.push(`  ${field.name}: ${baseFieldTsType(schema, field)};`);
    }
    const body = fieldLines.length > 0 ? `\n${fieldLines.join("\n")}\n` : "";
    lines.push(`export interface ${baseName}${extendsClause} {${body}}`);
    lines.push("");
  }
  return lines.join("\n");
}

// CompositeBase.facts is goOnly in the schema, but the hand-written
// CompositeBase_subtreeFactsWorker in spine.ts reads/writes `facts`. Provide it
// as a runtime field typed atomic.Uint32 (faithful to the Go struct).
function baseFieldTsType(schema, field) {
  return schema.formatTsReference(field.rawType, field.listKind);
}

// CompositeBase needs a (non-goOnly-in-TS) facts cell because spine reads it.
function collectBaseFieldRefs(schema) {
  const refs = new Set();
  for (const baseName of schema.baseNames()) {
    if (HAND_WRITTEN_BASES.has(baseName)) continue;
    for (const field of schema.baseFields(baseName)) {
      if (field.noTS) continue;
      addRefsFromTsType(field.tsReference(), refs);
    }
  }
  return [...refs].sort();
}
// Extracts the union/list alias identifiers referenced by a TS reference string
// (e.g. "GoPtr<EntityName>" -> EntityName) so node.ts can import them.
export function addRefsFromTsType(tsRef, out) {
  const ids = tsRef.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  const skip = new Set(["GoPtr", "GoSlice", "Node", "NodeList", "ModifierList", "bool", "int", "string", "unknown", "Kind", "ModifierFlags", "NodeFlags", "TokenFlags", "Uint32"]);
  for (const id of ids) {
    if (!skip.has(id)) out.add(id);
  }
}

// ── data.ts (concrete interfaces + adapters + generated override free-fns) ───

export function emitData(schema) {
  const lines = [];
  lines.push(`import type { bool, int } from "../../../go/scalars.js";`);
  lines.push(`import type { GoPtr, GoSlice } from "../../../go/compat.js";`);
  lines.push(`import type { ModifierFlags } from "../modifierflags.js";`);
  lines.push(`import type { NodeFlags } from "./flags.js";`);
  lines.push(`import type { Kind } from "./kinds.js";`);
  lines.push(`import type { TokenFlags } from "../tokenflags.js";`);
  lines.push(`import {`);
  lines.push(`  AsSyntaxList,`);
  lines.push(`} from "./casts.js";`);
  lines.push(`import {`);
  lines.push(`  KindSyntaxList,`);
  lines.push(`} from "./kinds.js";`);
  lines.push(`import {`);
  lines.push(`  cloneNode,`);
  lines.push(`  goReceiverKey,`);
  lines.push(`  invert,`);
  lines.push(`  NodeFactory_NewModifierList,`);
  lines.push(`  NodeFactory_NewNodeList,`);
  lines.push(`  visit,`);
  lines.push(`  visitModifiers,`);
  lines.push(`  visitNodeList,`);
  lines.push(`  visitNodes,`);
  for (const m of NODE_DATA_METHODS) {
    lines.push(`  NodeDefault_${m},`);
  }
  // base data-view free-fns referenced by adapters
  for (const fn of baseFreeFnsUsed()) lines.push(`  ${fn},`);
  lines.push(`} from "../spine.js";`);
  lines.push(`import type { ModifierList, Node, NodeBase, NodeFactoryCoercible, NodeIter, NodeList, NodeVisitor, Visitor, nodeData } from "../spine.js";`);
  lines.push(`import type { NodeVisitor as ConcreteNodeVisitor } from "../visitor.js";`);
  lines.push(`import type { SubtreeFacts } from "../subtreefacts.js";`);
  lines.push(`import {`);
  lines.push(`  propagateBindingElementSubtreeFacts,`);
  lines.push(`  propagateEraseableSyntaxListSubtreeFacts,`);
  lines.push(`  propagateEraseableSyntaxSubtreeFacts,`);
  lines.push(`  propagateModifierListSubtreeFacts,`);
  lines.push(`  propagateNodeListSubtreeFacts,`);
  lines.push(`  propagateObjectBindingElementSubtreeFacts,`);
  lines.push(`  propagateSubtreeFacts,`);
  lines.push(`} from "../subtreefacts.js";`);
  lines.push(`import * as Kinds from "./kinds.js";`);
  lines.push(`import * as Factory from "./factory.js";`);
  lines.push(`import * as AstManual from "../ast.js";`);
  // base interfaces and node-unions referenced by concrete fields / extends
  const baseImports = new Set();
  for (const baseName of schema.baseNames()) {
    if (!HAND_WRITTEN_BASES.has(baseName)) baseImports.add(baseName);
  }
  lines.push(`import type {`);
  for (const b of [...baseImports].sort()) lines.push(`  ${b},`);
  lines.push(`} from "./node.js";`);
  const unionImportsSet = new Set(collectConcreteFieldRefs(schema));
  for (const helperType of ["BlockOrExpression", "ParameterList", "Statement", "StatementList"]) {
    unionImportsSet.add(helperType);
  }
  const unionImports = [...unionImportsSet].sort();
  lines.push(`import type {`);
  for (const u of unionImports) lines.push(`  ${u},`);
  lines.push(`} from "./unions.js";`);
  lines.push("");
  emitGeneratedVisitHelpers(lines);

  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) {
      lines.push(`// ${node}: struct + factory hand-written in ../ast.ts (handWritten).`);
      lines.push("");
      continue;
    }
    emitConcreteInterface(schema, node, lines);
    emitOverrideFreeFns(schema, node, lines);
    emitAdapter(schema, node, lines);
  }
  return lines.join("\n");
}

function baseFreeFnsUsed() {
  const out = new Set();
  for (const [method, providers] of Object.entries(BASE_METHOD_PROVIDERS)) {
    for (const p of providers) {
      out.add(`${p}_${method === "subtreeFactsWorker" ? "subtreeFactsWorker" : method}`);
    }
  }
  out.add("ClassLikeBase_computeSubtreeFacts");
  return [...out].sort();
}

function collectConcreteFieldRefs(schema) {
  const refs = new Set();
  for (const node of schema.nodeNames()) {
    if (schema.definitions[node].handWritten) continue;
    // The interface itself only emits own concrete fields, but generated
    // Clone/VisitEachChild functions use schemaMembers, including inherited
    // factory fields. Import every union/list alias those functions reference.
    for (const m of schema.schemaMembers(node)) {
      if (m.noTS) continue;
      if (m.isKindParam()) continue;
      addRefsFromTsType(m.tsReference(), refs);
    }
  }
  return [...refs].sort();
}
