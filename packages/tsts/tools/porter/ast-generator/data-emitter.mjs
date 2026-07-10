import {
  addRefsFromTsType,
  BASE_METHOD_PROVIDERS,
  generatedOverrideMethodsFor,
  goOnlyFieldTsType,
  HAND_WRITTEN_BASES,
  NODE_DATA_METHODS,
  resolveAdapterTarget,
} from "./node-emitters.mjs";

// ── data.ts (concrete interfaces + adapters + generated override free-fns) ───

export function emitData(schema) {
  const lines = [];
  lines.push(`import type { bool, int } from "../../../go/scalars.js";`);
  lines.push(`import type { GoPtr, GoSlice } from "../../../go/compat.js";`);
  lines.push(`import { goReceiverKey } from "../../../go/compat.js";`);
  lines.push(`import { Uint32 } from "../../../go/sync/atomic.js";`);
  lines.push(`import type { ModifierFlags } from "../modifierflags.js";`);
  lines.push(`import type { NodeFlags } from "./flags.js";`);
  lines.push(`import type { Kind } from "./kinds.js";`);
  lines.push(`import type { TokenFlags } from "../tokenflags.js";`);
  lines.push(`import type { FlowNode } from "../flow.js";`);
  lines.push(`import type { Symbol, SymbolTable } from "../symbol.js";`);
  lines.push(`import {`);
  lines.push(`  AsSyntaxList,`);
  lines.push(`} from "./casts.js";`);
  lines.push(`import {`);
  lines.push(`  KindSyntaxList,`);
  lines.push(`} from "./kinds.js";`);
  lines.push(`import {`);
  lines.push(`  cloneNode,`);
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
  lines.push(`import type { ModifierList, Node, NodeBase, NodeFactoryCoercible, NodeList, NodeVisitor, Visitor, nodeData } from "../spine.js";`);
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

function emitGeneratedVisitHelpers(lines) {
  lines.push(`type GeneratedNodeVisitorHooks = {`);
  lines.push(`  VisitNode?: (node: GoPtr<Node>, v: GoPtr<NodeVisitor>) => GoPtr<Node>;`);
  lines.push(`  VisitNodes?: (nodes: GoPtr<NodeList>, v: GoPtr<NodeVisitor>) => GoPtr<NodeList>;`);
  lines.push(`  VisitModifiers?: (nodes: GoPtr<ModifierList>, v: GoPtr<NodeVisitor>) => GoPtr<ModifierList>;`);
  lines.push(`  VisitEmbeddedStatement?: (node: GoPtr<Statement>, v: GoPtr<NodeVisitor>) => GoPtr<Statement>;`);
  lines.push(`  VisitIterationBody?: (node: GoPtr<Statement>, v: GoPtr<NodeVisitor>) => GoPtr<Statement>;`);
  lines.push(`  VisitParameters?: (nodes: GoPtr<ParameterList>, v: GoPtr<NodeVisitor>) => GoPtr<ParameterList>;`);
  lines.push(`  VisitFunctionBody?: (node: GoPtr<BlockOrExpression>, v: GoPtr<NodeVisitor>) => GoPtr<BlockOrExpression>;`);
  lines.push(`  VisitTopLevelStatements?: (nodes: GoPtr<StatementList>, v: GoPtr<NodeVisitor>) => GoPtr<StatementList>;`);
  lines.push(`};`);
  lines.push("");
  lines.push(`type GeneratedNodeVisitor = NodeVisitor & {`);
  lines.push(`  Visit?: (node: GoPtr<Node>) => GoPtr<Node>;`);
  lines.push(`  Factory: GoPtr<Factory.NodeFactory>;`);
  lines.push(`  Hooks?: GeneratedNodeVisitorHooks;`);
  lines.push(`};`);
  lines.push("");
  lines.push(`function generatedVisitor(v: GoPtr<NodeVisitor>): GoPtr<GeneratedNodeVisitor> {`);
  lines.push(`  return v as GoPtr<GeneratedNodeVisitor>;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitorFactory(v: GoPtr<NodeVisitor>): GoPtr<Factory.NodeFactory> {`);
  lines.push(`  return generatedVisitor(v)!.Factory;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitorHooks(v: GoPtr<NodeVisitor>): GeneratedNodeVisitorHooks {`);
  lines.push(`  return generatedVisitor(v)!.Hooks ?? {};`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitNodeBase(v: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  if (node === undefined || receiver!.Visit === undefined) {`);
  lines.push(`    return node;`);
  lines.push(`  }`);
  lines.push("");
  lines.push(`  let visited = receiver!.Visit(node);`);
  lines.push(`  if (visited !== undefined && visited.Kind === KindSyntaxList) {`);
  lines.push(`    const nodes = AsSyntaxList(visited)!.Children;`);
  lines.push(`    if (nodes.length !== 1) {`);
  lines.push(`      throw new globalThis.Error("Expected only a single node to be written to output");`);
  lines.push(`    }`);
  lines.push(`    visited = nodes[0];`);
  lines.push(`    if (visited !== undefined && visited.Kind === KindSyntaxList) {`);
  lines.push(`      throw new globalThis.Error("The result of visiting and lifting a Node may not be SyntaxList");`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(`  return visited;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitNode(v: GoPtr<NodeVisitor>, node: GoPtr<Node>): GoPtr<Node> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitNode;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(node, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitNodeBase(v, node);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitSlice(v: GoPtr<NodeVisitor>, nodes: GoPtr<GoSlice<GoPtr<Node>>>): [GoPtr<GoSlice<GoPtr<Node>>>, bool] {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  if (nodes === undefined || receiver!.Visit === undefined) {`);
  lines.push(`    return [nodes, false as bool];`);
  lines.push(`  }`);
  lines.push("");
  lines.push(`  for (let i = 0; i < nodes.length; i++) {`);
  lines.push(`    let node = nodes[i];`);
  lines.push(`    if (receiver!.Visit === undefined) {`);
  lines.push(`      break;`);
  lines.push(`    }`);
  lines.push("");
  lines.push(`    let visited = receiver!.Visit(node);`);
  lines.push(`    if (visited === undefined || visited !== node) {`);
  lines.push(`      let updated = nodes.slice(0, i);`);
  lines.push("");
  lines.push(`      for (;;) {`);
  lines.push(`        if (visited === undefined) {`);
  lines.push(`          // do nothing`);
  lines.push(`        } else if (visited.Kind === KindSyntaxList) {`);
  lines.push(`          updated = [...updated, ...AsSyntaxList(visited)!.Children];`);
  lines.push(`        } else {`);
  lines.push(`          updated = [...updated, visited];`);
  lines.push(`        }`);
  lines.push("");
  lines.push(`        i++;`);
  lines.push(`        if (i >= nodes.length) {`);
  lines.push(`          break;`);
  lines.push(`        }`);
  lines.push("");
  lines.push(`        if (receiver!.Visit !== undefined) {`);
  lines.push(`          node = nodes[i];`);
  lines.push(`          visited = receiver!.Visit(node);`);
  lines.push(`        } else {`);
  lines.push(`          updated = [...updated, ...nodes.slice(i)];`);
  lines.push(`          break;`);
  lines.push(`        }`);
  lines.push(`      }`);
  lines.push("");
  lines.push(`      return [updated, true as bool];`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push("");
  lines.push(`  return [nodes, false as bool];`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitRawNodes(v: GoPtr<NodeVisitor>, nodes: GoPtr<GoSlice<GoPtr<Node>>>): GoPtr<GoSlice<GoPtr<Node>>> {`);
  lines.push(`  if (nodes === undefined) {`);
  lines.push(`    return nodes;`);
  lines.push(`  }`);
  lines.push(`  for (let i = 0; i < nodes.length; i++) {`);
  lines.push(`    const node = nodes[i];`);
  lines.push(`    const visited = generatedVisitNode(v, node);`);
  lines.push(`    if (visited !== node) {`);
  lines.push(`      const updated = nodes.slice(0, i);`);
  lines.push(`      updated.push(visited);`);
  lines.push(`      for (let j = i + 1; j < nodes.length; j++) {`);
  lines.push(`        updated.push(generatedVisitNode(v, nodes[j]));`);
  lines.push(`      }`);
  lines.push(`      return updated;`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(`  return nodes;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitNodesBase(v: GoPtr<NodeVisitor>, nodes: GoPtr<NodeList>): GoPtr<NodeList> {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  if (nodes === undefined || receiver!.Visit === undefined) {`);
  lines.push(`    return nodes;`);
  lines.push(`  }`);
  lines.push("");
  lines.push(`  const [result, changed] = generatedVisitSlice(v, nodes.Nodes);`);
  lines.push(`  if (changed) {`);
  lines.push(`    const list = NodeFactory_NewNodeList(receiver!.Factory, result);`);
  lines.push(`    list!.Loc = nodes.Loc;`);
  lines.push(`    return list;`);
  lines.push(`  }`);
  lines.push(`  return nodes;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitNodes(v: GoPtr<NodeVisitor>, nodes: GoPtr<NodeList>): GoPtr<NodeList> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitNodes;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(nodes, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitNodesBase(v, nodes);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitModifiersBase(v: GoPtr<NodeVisitor>, nodes: GoPtr<ModifierList>): GoPtr<ModifierList> {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  if (nodes === undefined || receiver!.Visit === undefined) {`);
  lines.push(`    return nodes;`);
  lines.push(`  }`);
  lines.push("");
  lines.push(`  const [result, changed] = generatedVisitSlice(v, nodes.Nodes);`);
  lines.push(`  if (changed) {`);
  lines.push(`    const list = NodeFactory_NewModifierList(receiver!.Factory, result);`);
  lines.push(`    list!.Loc = nodes.Loc;`);
  lines.push(`    return list;`);
  lines.push(`  }`);
  lines.push(`  return nodes;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitModifiers(v: GoPtr<NodeVisitor>, nodes: GoPtr<ModifierList>): GoPtr<ModifierList> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitModifiers;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(nodes, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitModifiersBase(v, nodes);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedLiftToBlock(v: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  let nodes: GoSlice<GoPtr<Node>> = [];`);
  lines.push(`  if (node !== undefined) {`);
  lines.push(`    if (node.Kind === KindSyntaxList) {`);
  lines.push(`      nodes = AsSyntaxList(node)!.Children;`);
  lines.push(`    } else {`);
  lines.push(`      nodes = [node];`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(`  if (nodes.length === 1) {`);
  lines.push(`    node = nodes[0];`);
  lines.push(`  } else {`);
  lines.push(`    node = Factory.NewBlock(receiver!.Factory, NodeFactory_NewNodeList(receiver!.Factory, nodes), true as bool);`);
  lines.push(`  }`);
  lines.push(`  if (node!.Kind === KindSyntaxList) {`);
  lines.push(`    throw new globalThis.Error("The result of visiting and lifting a Node may not be SyntaxList");`);
  lines.push(`  }`);
  lines.push(`  return node;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitEmbeddedStatementBase(v: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {`);
  lines.push(`  const receiver = generatedVisitor(v);`);
  lines.push(`  if (node === undefined || receiver!.Visit === undefined) {`);
  lines.push(`    return node;`);
  lines.push(`  }`);
  lines.push(`  const visited = receiver!.Visit(node);`);
  lines.push(`  if (visited === undefined) {`);
  lines.push(`    return undefined;`);
  lines.push(`  }`);
  lines.push(`  return generatedLiftToBlock(v, visited);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitEmbeddedStatement(v: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {`);
  lines.push(`  const hooks = generatedVisitorHooks(v);`);
  lines.push(`  if (hooks.VisitEmbeddedStatement !== undefined) {`);
  lines.push(`    return hooks.VisitEmbeddedStatement(node, v);`);
  lines.push(`  }`);
  lines.push(`  if (hooks.VisitNode !== undefined) {`);
  lines.push(`    return generatedLiftToBlock(v, hooks.VisitNode(node, v));`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitEmbeddedStatementBase(v, node);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitIterationBody(v: GoPtr<NodeVisitor>, node: GoPtr<Statement>): GoPtr<Statement> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitIterationBody;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(node, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitEmbeddedStatement(v, node);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitParameters(v: GoPtr<NodeVisitor>, nodes: GoPtr<ParameterList>): GoPtr<ParameterList> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitParameters;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(nodes, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitNodes(v, nodes) as GoPtr<ParameterList>;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitFunctionBody(v: GoPtr<NodeVisitor>, node: GoPtr<BlockOrExpression>): GoPtr<BlockOrExpression> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitFunctionBody;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(node, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitNode(v, node) as GoPtr<BlockOrExpression>;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`function generatedVisitTopLevelStatements(v: GoPtr<NodeVisitor>, nodes: GoPtr<StatementList>): GoPtr<StatementList> {`);
  lines.push(`  const hook = generatedVisitorHooks(v).VisitTopLevelStatements;`);
  lines.push(`  if (hook !== undefined) {`);
  lines.push(`    return hook(nodes, v);`);
  lines.push(`  }`);
  lines.push(`  return generatedVisitNodes(v, nodes) as GoPtr<StatementList>;`);
  lines.push(`}`);
  lines.push("");
}

function emitConcreteInterface(schema, node, lines) {
  const exts = schema.extendsKeysOf(node);
  const extendsClause = exts.length > 0 ? ` extends ${exts.join(", ")}` : "";
  const fieldLines = [];
  for (const m of schema.members(node)) {
    if (m.noTS && !m.goOnly) continue;
    if (m.isKindParam()) continue;
    if (m.inherited) continue;
    // Go has no optional field marker — pointer fields are nilable (GoPtr) and
    // scalar fields are zero-valued. Mirror that; do not add a TS `?`.
    fieldLines.push(`  ${m.name}: ${m.goOnly ? goOnlyFieldTsType(m) : m.tsReference()};`);
  }
  const body = fieldLines.length > 0 ? `\n${fieldLines.join("\n")}\n` : "";
  lines.push(`export interface ${node}${extendsClause} {${body}}`);
  lines.push("");
}

function emitOverrideFreeFns(schema, node, lines) {
  const generated = generatedOverrideMethodsFor(schema, node);
  // Clone (always)
  emitCloneFreeFn(schema, node, lines);
  // Name (named declarations/expressions)
  if (generated.has("Name")) emitNameFreeFn(node, lines);
  // ForEachChild (child-bearing)
  if (generated.has("ForEachChild")) emitForEachChildFreeFn(schema, node, lines);
  // VisitEachChild (child-bearing)
  if (generated.has("VisitEachChild") && !schema.definitions[node].handWrittenVisitor) {
    emitVisitEachChildFreeFn(schema, node, lines);
  }
  // computeSubtreeFacts (generateSubtreeFacts)
  if (generated.has("computeSubtreeFacts")) emitComputeSubtreeFactsFreeFn(schema, node, lines);
}

function cloneArgList(schema, node) {
  const members = schema.schemaMembers(node);
  return members.map((m) => {
    if (m.isKindParam()) return "receiver!.Kind";
    // Go Clone passes node.Modifiers() for the inherited ModifierLike member,
    // since `modifiers` is private on the base. Resolve to the promoted
    // Modifiers provider for this node.
    if (m.inherited && m.listKind === "ModifierList") {
      const target = resolveAdapterTarget(schema, node, "Modifiers");
      return `${target.fn}(receiver)`;
    }
    return `receiver!.${m.name}`;
  });
}

function emitCloneFreeFn(schema, node, lines) {
  const args = cloneArgList(schema, node).join(", ");
  lines.push(`export function ${node}_Clone(receiver: GoPtr<${node}>, f: NodeFactoryCoercible): GoPtr<Node> {`);
  const aliases = schema.kindAliasesOf(node);
  if (aliases.length === 0) {
    lines.push(`  return cloneNode(Factory.New${node}(f.AsNodeFactory()!, ${args}), receiver, f.AsNodeFactory()!.hooks);`);
  } else {
    lines.push(`  switch (NodeDefault_AsNode(receiver)!.Kind) {`);
    lines.push(`    case Kinds.Kind${schema.syntaxKindName(node)}:`);
    lines.push(`      return cloneNode(Factory.New${node}(f.AsNodeFactory()!, ${args}), receiver, f.AsNodeFactory()!.hooks);`);
    for (const alias of aliases) {
      lines.push(`    case Kinds.Kind${alias}:`);
      lines.push(`      return cloneNode(Factory.New${alias}(f.AsNodeFactory()!, ${args}), receiver, f.AsNodeFactory()!.hooks);`);
    }
    lines.push(`    default:`);
    lines.push(`      throw new globalThis.Error("unexpected kind in ${node}_Clone: " + NodeDefault_AsNode(receiver)!.Kind);`);
    lines.push(`  }`);
  }
  lines.push(`}`);
  lines.push("");
}

function emitNameFreeFn(node, lines) {
  lines.push(`export function ${node}_Name(receiver: GoPtr<${node}>): GoPtr<Node> {`);
  lines.push(`  return receiver!.name;`);
  lines.push(`}`);
  lines.push("");
}

function emitForEachChildFreeFn(schema, node, lines) {
  lines.push(`export function ${node}_ForEachChild(receiver: GoPtr<${node}>, v: Visitor): bool {`);
  const childMembers = schema.schemaMembers(node).filter((m) => m.isChild());
  const parts = childMembers.map((m) => {
    const access = `receiver!.${m.name}`;
    if (m.listKind === "raw") return `visitNodes(v, ${access})`;
    if (m.listKind === "ModifierList") return `visitModifiers(v, ${access})`;
    if (m.listKind === "NodeList") return `visitNodeList(v, ${access})`;
    return `visit(v, ${access})`;
  });
  lines.push(`  return ${parts.join(" || ")};`);
  lines.push(`}`);
  lines.push("");
}

function visitEachChildArgList(schema, node) {
  const members = schema.schemaMembers(node).filter((m) => !m.isKindParam());
  return members.map((m) => visitEachChildArg(schema, node, m));
}

function visitEachChildArg(schema, node, m) {
  const access = `receiver!.${m.name}`;
  const cast = (expr) => `${expr} as ${m.tsReference()}`;
  if (!m.isChild()) {
    if (!Array.isArray(m.rawType) && m.rawType === "NodeFlags") return "receiver!.Flags";
    return access;
  }
  if (m.listKind === "raw") return cast(`generatedVisitRawNodes(v, ${access})`);
  if (m.listKind === "ModifierList") return cast(`generatedVisitModifiers(v, ${access})`);
  if (m.listKind === "NodeList") {
    if (m.visit === "parameters") return cast(`generatedVisitParameters(v, ${access})`);
    if (m.visit === "topLevelStatements") return cast(`generatedVisitTopLevelStatements(v, ${access})`);
    return cast(`generatedVisitNodes(v, ${access})`);
  }
  if (m.visit === "embeddedStatement") return cast(`generatedVisitEmbeddedStatement(v, ${access})`);
  if (m.visit === "iterationBody") return cast(`generatedVisitIterationBody(v, ${access})`);
  if (m.visit === "functionBody") return cast(`generatedVisitFunctionBody(v, ${access})`);
  return cast(`generatedVisitNode(v, ${access})`);
}

function emitVisitEachChildFreeFn(schema, node, lines) {
  const args = visitEachChildArgList(schema, node).join(", ");
  lines.push(`export function ${node}_VisitEachChild(receiver: GoPtr<${node}>, v: GoPtr<NodeVisitor>): GoPtr<Node> {`);
  lines.push(`  return Factory.NodeFactory_Update${node}(generatedVisitorFactory(v), receiver, ${args});`);
  lines.push(`}`);
  lines.push("");
}

function subtreeFactsTerm(m) {
  const access = `receiver!.${m.name}`;
  if (m.listKind === "ModifierList") return `propagateModifierListSubtreeFacts(${access})`;
  if (m.listKind === "raw" || m.listKind === "NodeList") return `propagateNodeListSubtreeFacts(${access}, propagateSubtreeFacts)`;
  return `propagateSubtreeFacts(${access})`;
}

function emitComputeSubtreeFactsFreeFn(schema, node, lines) {
  lines.push(`export function ${node}_computeSubtreeFacts(receiver: GoPtr<${node}>): SubtreeFacts {`);
  const childMembers = schema.schemaMembers(node).filter((m) => m.isChild());
  if (childMembers.length === 0) {
    lines.push(`  return 0;`);
  } else {
    const terms = childMembers.map(subtreeFactsTerm);
    lines.push(`  return (${terms.join(" | ")}) >>> 0;`);
  }
  lines.push(`}`);
  lines.push("");
}

function emitAdapter(schema, node, lines) {
  lines.push(`const ${node}_nodeDataPrototype: nodeData & ThisType<GoPtr<${node}>> = {`);
  lines.push(`  get [goReceiverKey](): GoPtr<${node}> { return this; },`);
  for (const method of NODE_DATA_METHODS) {
    const t = resolveAdapterTarget(schema, node, method);
    const slot = adapterSlot(node, method, t);
    lines.push(`  ${slot}`);
  }
  lines.push(`};`);
  lines.push("");
  lines.push(`export function ${node}_as_nodeData(receiver: GoPtr<${node}>): nodeData {`);
  lines.push(`  return globalThis.Object.setPrototypeOf(receiver!, ${node}_nodeDataPrototype) as nodeData;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export function create${node}Data(): ${node} & nodeData {`);
  lines.push(`  return globalThis.Object.create(${node}_nodeDataPrototype) as ${node} & nodeData;`);
  lines.push(`}`);
  lines.push("");
}

function adapterSlot(node, method, t) {
  const receiver = `this`;
  if (method === "Clone") {
    return `Clone(f: NodeFactoryCoercible): GoPtr<Node> { return ${t.fn}(${receiver}, f); },`;
  }
  if (method === "ForEachChild") {
    return `ForEachChild(v: Visitor): bool { return ${t.fn}(${receiver}, v); },`;
  }
  if (method === "VisitEachChild") {
    if (t.takesConcreteNodeVisitor) {
      return `VisitEachChild(v: GoPtr<NodeVisitor>): GoPtr<Node> { return ${t.fn}(${receiver}, v as GoPtr<ConcreteNodeVisitor>); },`;
    }
    return `VisitEachChild(v: GoPtr<NodeVisitor>): GoPtr<Node> { return ${t.fn}(${receiver}, v); },`;
  }
  if (method === "setModifiers") {
    return `setModifiers(modifiers: GoPtr<ModifierList>): void { ${t.fn}(${receiver}, modifiers); },`;
  }
  if (method === "subtreeFactsWorker") {
    return `subtreeFactsWorker(self: nodeData): SubtreeFacts { return ${t.fn}(${receiver}, self); },`;
  }
  if (method === "AsNode") {
    return `AsNode(): GoPtr<Node> { return ${t.fn}(${receiver}); },`;
  }
  return `${method}() { return ${t.fn}(${receiver}); },`;
}
