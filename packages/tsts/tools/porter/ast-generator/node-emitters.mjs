// ───────────────────────────────────────────────────────────────────────────
// AST node/data/factory/etc emitters (free-fn/adapter model).
//
// These port generate-go-ast.ts's emission rules but produce Codex's Go-faithful
// free-function + interface-adapter TypeScript instead of Go. The output mirrors
// ast_generated.go structurally: bases, aliases, concrete data interfaces +
// `Concrete_as_nodeData` adapters, factories, predicates, casts, visitor tables.
// ───────────────────────────────────────────────────────────────────────────

export const HAND_WRITTEN_BASES = new Set(["NodeBase"]);

// The nodeData methods, in declaration order, with their default targets in
// spine.ts. Methods overridden by hand-written base structs resolve (via Go
// embedding promotion) to that base's free-fn; the rest fall to NodeDefault_*.
// Generated per-concrete overrides exist for Clone/ForEachChild/VisitEachChild/
// computeSubtreeFacts (+ subtreeFactsWorker via CompositeBase). Hand-written
// visitor exceptions route through ast.ts.
export const NODE_DATA_METHODS = [
  "AsNode",
  "ForEachChild",
  "IterChildren",
  "VisitEachChild",
  "Clone",
  "Name",
  "Modifiers",
  "setModifiers",
  "FlowNodeData",
  "DeclarationData",
  "ExportableData",
  "LocalsContainerData",
  "FunctionLikeData",
  "ClassLikeData",
  "BodyData",
  "LiteralLikeData",
  "TemplateLiteralLikeData",
  "SubtreeFacts",
  "computeSubtreeFacts",
  "subtreeFactsWorker",
  "propagateSubtreeFacts",
];

export function parseGoNodeDataMethods(source) {
  const declaration = /^type\s+nodeData\s+interface\s*\{\s*$/m.exec(source);
  if (declaration === null) throw new Error("could not find TS-Go nodeData interface");
  const bodyStart = declaration.index + declaration[0].length;
  const bodyEnd = source.indexOf("\n}", bodyStart);
  if (bodyEnd < 0) throw new Error("unterminated TS-Go nodeData interface");
  const methods = [];
  for (const rawLine of source.slice(bodyStart, bodyEnd).split(/\r?\n/)) {
    const line = rawLine.replace(/\/\/.*$/, "").trim();
    if (line === "") continue;
    const match = /^([A-Za-z_]\w*)\s*\(/.exec(line);
    if (match === null) throw new Error(`unsupported TS-Go nodeData member: ${line}`);
    methods.push(match[1]);
  }
  return methods;
}

export function assertNodeDataMethodsMatchUpstream(source) {
  const actual = parseGoNodeDataMethods(source);
  if (JSON.stringify(actual) !== JSON.stringify(NODE_DATA_METHODS)) {
    throw new Error(
      `TS-Go nodeData method set drifted; update the generator from upstream\nexpected: ${NODE_DATA_METHODS.join(", ")}\nactual: ${actual.join(", ")}`,
    );
  }
}

// Hand-written base data-view method providers (ast.go), keyed by method ->
// ordered list of bases that provide an override. The generator resolves the
// MOST-DERIVED provider for each concrete by walking its base chain.
export const BASE_METHOD_PROVIDERS = {
  DeclarationData: ["NamedMemberBase", "DeclarationBase"],
  ExportableData: ["ExportableBase"],
  Modifiers: ["NamedMemberBase", "ModifiersBase"],
  setModifiers: ["NamedMemberBase", "ModifiersBase"],
  Name: ["NamedMemberBase", "ClassLikeBase"],
  LocalsContainerData: ["FunctionLikeWithBodyBase", "FunctionLikeBase", "LocalsContainerBase"],
  FunctionLikeData: ["FunctionLikeWithBodyBase", "FunctionLikeBase"],
  BodyData: ["FunctionLikeWithBodyBase", "BodyBase"],
  FlowNodeData: ["FlowNodeBase"],
  LiteralLikeData: ["TemplateLiteralLikeNodeBase", "LiteralLikeNodeBase"],
  TemplateLiteralLikeData: ["TemplateLiteralLikeNodeBase"],
  ClassLikeData: ["ClassLikeBase"],
  subtreeFactsWorker: ["CompositeBase"],
  // computeSubtreeFacts: ClassLikeBase provides a base override; otherwise the
  // generated per-node Concrete_computeSubtreeFacts wins. Handled specially.
};

// Hand-written CONCRETE-type setModifiers overrides (ast.go), ported in ast.ts.
// Go: func (node *BinaryExpression) setModifiers(modifiers *ModifierList) { node.modifiers = modifiers }
const AST_MANUAL_SET_MODIFIERS = new Set(["BinaryExpression"]);

const AST_MANUAL_COMPUTE_SUBTREE_FACTS = new Set([
  "AccessorDeclarationBase",
  "ArrowFunction",
  "AsExpression",
  "AwaitExpression",
  "BigIntLiteral",
  "BinaryExpression",
  "BindingElement",
  "BindingPattern",
  "CallExpression",
  "CatchClause",
  "ClassStaticBlockDeclaration",
  "ConstructorDeclaration",
  "Decorator",
  "EnumDeclaration",
  "EnumMember",
  "ExportAssignment",
  "ExportDeclaration",
  "ExportSpecifier",
  "ExpressionWithTypeArguments",
  "ForInOrOfStatement",
  "FunctionDeclaration",
  "FunctionExpression",
  "HeritageClause",
  "Identifier",
  "ImportClause",
  "ImportEqualsDeclaration",
  "ImportSpecifier",
  "JsxAttribute",
  "JsxAttributes",
  "JsxClosingElement",
  "JsxClosingFragment",
  "JsxElement",
  "JsxExpression",
  "JsxFragment",
  "JsxNamespacedName",
  "JsxOpeningElement",
  "JsxOpeningFragment",
  "JsxSelfClosingElement",
  "JsxSpreadAttribute",
  "JsxText",
  "KeywordExpression",
  "MetaProperty",
  "MethodDeclaration",
  "ModuleDeclaration",
  "NewExpression",
  "NoSubstitutionTemplateLiteral",
  "NonNullExpression",
  "ParameterDeclaration",
  "PrivateIdentifier",
  "PropertyAccessExpression",
  "PropertyAssignment",
  "PropertyDeclaration",
  "ReturnStatement",
  "SatisfiesExpression",
  "ShorthandPropertyAssignment",
  "SourceFile",
  "SpreadAssignment",
  "SpreadElement",
  "TaggedTemplateExpression",
  "TemplateHead",
  "TemplateMiddle",
  "TemplateTail",
  "Token",
  "TypeAssertion",
  "TypeSyntaxBase",
  "VariableDeclaration",
  "VariableDeclarationList",
  "VariableStatement",
  "YieldExpression",
]);

const AST_MANUAL_PROPAGATE_SUBTREE_FACTS = new Set([
  "AccessorDeclarationBase",
  "ArrayLiteralExpression",
  "ArrowFunction",
  "AsExpression",
  "BindingPattern",
  "CallExpression",
  "CatchClause",
  "ClassDeclaration",
  "ClassExpression",
  "ConstructorDeclaration",
  "ElementAccessExpression",
  "FunctionDeclaration",
  "FunctionExpression",
  "MethodDeclaration",
  "ModuleDeclaration",
  "NewExpression",
  "ObjectLiteralExpression",
  "ParameterDeclaration",
  "PropertyAccessExpression",
  "PropertyDeclaration",
  "SatisfiesExpression",
  "TypeAssertion",
  "TypeSyntaxBase",
  "VariableDeclarationList",
]);

// Methods that have a GENERATED per-concrete override in this wave.
export function generatedOverrideMethodsFor(schema, nodeName) {
  const out = new Set();
  out.add("Clone"); // every concrete gets a Clone in ast_generated.go
  if (schema.schemaMembers(nodeName).some((m) => m.name === "name")) {
    out.add("Name");
  }
  const childMembers = schema.schemaMembers(nodeName).filter((m) => m.isChild());
  if (childMembers.length > 0) {
    out.add("ForEachChild");
    out.add("VisitEachChild");
  }
  if (schema.definitions[nodeName].generateSubtreeFacts) {
    out.add("computeSubtreeFacts");
  }
  return out;
}

// Resolve which free-fn an adapter slot calls for `method` on `nodeName`.
// Returns { fn, arg } where `arg` is "receiver" or "receiver, self" etc.
export function resolveAdapterTarget(schema, nodeName, method) {
  const chain = schema.baseChainOf(nodeName); // most-derived first
  const generated = generatedOverrideMethodsFor(schema, nodeName);

  // Hand-written concrete setModifiers overrides (ast.go), living in ast.ts.
  // Go: func (node *BinaryExpression) setModifiers(modifiers *ModifierList) { node.modifiers = modifiers }
  if (method === "setModifiers" && AST_MANUAL_SET_MODIFIERS.has(nodeName)) {
    return { fn: `AstManual.${nodeName}_setModifiers`, takesModifiers: true };
  }

  // computeSubtreeFacts: ClassLikeBase override beats generated only when the
  // node embeds ClassLikeBase and has no own generateSubtreeFacts.
  if (method === "computeSubtreeFacts") {
    if (generated.has("computeSubtreeFacts")) {
      return { fn: `${nodeName}_computeSubtreeFacts`, takesSelf: false };
    }
    // Go promotes embedded-base methods onto the concrete; resolve the most-derived
    // hand-written provider by walking the base chain (e.g. AccessorDeclarationBase
    // provides computeSubtreeFacts for Get/SetAccessorDeclaration).
    const manualComputeProvider = [nodeName, ...chain].find((name) => AST_MANUAL_COMPUTE_SUBTREE_FACTS.has(name));
    if (manualComputeProvider !== undefined) {
      return { fn: `AstManual.${manualComputeProvider}_computeSubtreeFacts`, takesSelf: false };
    }
    if (chain.includes("ClassLikeBase")) {
      return { fn: "ClassLikeBase_computeSubtreeFacts", takesSelf: false };
    }
    if (chain.includes("TypeSyntaxBase")) {
      return { fn: "AstManual.TypeSyntaxBase_computeSubtreeFacts", takesSelf: false };
    }
    return { fn: "NodeDefault_computeSubtreeFacts", takesSelf: false };
  }

  if (method === "propagateSubtreeFacts") {
    const manualPropagateProvider = [nodeName, ...chain].find((name) => AST_MANUAL_PROPAGATE_SUBTREE_FACTS.has(name));
    if (manualPropagateProvider !== undefined) {
      return { fn: `AstManual.${manualPropagateProvider}_propagateSubtreeFacts`, takesSelf: false };
    }
    if (chain.includes("TypeSyntaxBase")) {
      return { fn: "AstManual.TypeSyntaxBase_propagateSubtreeFacts", takesSelf: false };
    }
  }

  if (method === "Clone") {
    return { fn: `${nodeName}_Clone`, takesSelf: false, takesFactory: true };
  }
  if (method === "Name" && generated.has("Name")) {
    return { fn: `${nodeName}_Name`, takesSelf: false };
  }
  if (method === "ForEachChild") {
    if (schema.definitions[nodeName].handWrittenVisitor) {
      return { fn: `AstManual.forEachChild_${nodeName}`, takesVisitor: true };
    }
    if (generated.has("ForEachChild")) return { fn: `${nodeName}_ForEachChild`, takesVisitor: true };
    return { fn: "NodeDefault_ForEachChild", takesVisitor: true };
  }
  if (method === "VisitEachChild") {
    if (schema.definitions[nodeName].handWrittenVisitor) {
      return { fn: `AstManual.visitEachChild_${nodeName}`, takesNodeVisitor: true, takesConcreteNodeVisitor: true };
    }
    if (generated.has("VisitEachChild")) return { fn: `${nodeName}_VisitEachChild`, takesNodeVisitor: true };
    return { fn: "NodeDefault_VisitEachChild", takesNodeVisitor: true };
  }

  // Hand-written base data-view overrides (most-derived provider in the chain).
  const providers = BASE_METHOD_PROVIDERS[method];
  if (providers) {
    for (const p of providers) {
      if (chain.includes(p)) {
        if (method === "subtreeFactsWorker") return { fn: `${p}_subtreeFactsWorker`, takesSelf: true };
        if (method === "setModifiers") return { fn: `${p}_setModifiers`, takesModifiers: true };
        return { fn: `${p}_${method}`, takesSelf: false };
      }
    }
  }

  // Default from spine.
  if (method === "subtreeFactsWorker") return { fn: "NodeDefault_subtreeFactsWorker", takesSelf: true };
  if (method === "setModifiers") return { fn: "NodeDefault_setModifiers", takesModifiers: true };
  if (method === "ForEachChild") return { fn: "NodeDefault_ForEachChild", takesVisitor: true };
  return { fn: `NodeDefault_${method}`, takesSelf: false };
}

// ── unions.ts ──────────────────────────────────────────────────────────────

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
  const compatTypes = baseCompatTypes(schema);
  lines.push(`import type { ${compatTypes.join(", ")} } from "../../../go/compat.js";`);
  lines.push(`import { Uint32 } from "../../../go/sync/atomic.js";`);
  lines.push(`import type { ModifierList, Node, NodeBase, NodeList } from "../spine.js";`);
  lines.push(`import type { ModifierFlags } from "../modifierflags.js";`);
  lines.push(`import type { TokenFlags } from "../tokenflags.js";`);
  lines.push(`import type { FlowNode } from "../flow.js";`);
  lines.push(`import type { Symbol, SymbolTable } from "../symbol.js";`);
  lines.push(`import type {`);
  // forward node-union / list references used by base fields
  const unionRefs = collectBaseFieldRefs(schema);
  for (const ref of unionRefs) lines.push(`  ${ref},`);
  lines.push(`} from "./unions.js";`);
  lines.push("");
  lines.push(`// TS-Go stores binder/checker state directly on these embedded bases. The fields`);
  lines.push(`// remain central here even though the schema marks them goOnly: the TypeScript`);
  lines.push(`// runtime shares the same Node state rather than maintaining divergent side tables.`);
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
    for (const field of schema.baseFields(baseName)) {
      if (field.noTS && !field.goOnly) continue;
      fieldLines.push(`  ${field.name}: ${astMemberTsType(field)};`);
    }
    const body = fieldLines.length > 0 ? `\n${fieldLines.join("\n")}\n` : "";
    lines.push(`export interface ${baseName}${extendsClause} {${body}}`);
    lines.push("");
  }
  return lines.join("\n");
}

const AST_VALUE_TS_TYPES = new Map([
  ["SymbolTable", "SymbolTable"],
  ["atomic.Uint32", "Uint32"],
  ["bool", "bool"],
  ["int", "int"],
  ["string", "string"],
]);

const AST_REFERENCE_POINTEES = new Set(["SymbolTable", "bool", "int", "string"]);

const REVIEWED_AGGREGATE_POINTERS = new Map([
  ["Symbol", "Symbol"],
  ["Node", "Node"],
  ["FlowNode", "FlowNode"],
]);

export function astMemberTsType(field) {
  if (field.goOnly) return goOnlyFieldTsType(field);
  if (field.listKind === undefined && typeof field.rawType === "string"
    && (field.rawType.startsWith("*") || field.rawType.startsWith("[]"))) {
    return lowerAstStorageType(field.rawType, field.name);
  }
  const reference = field.tsReference();
  if (field.listKind === "raw") {
    const prefix = "GoPtr<";
    if (!reference.startsWith(prefix) || !reference.endsWith(">")) {
      throw new Error(`raw AST list '${field.name}' has no exact direct-slice provenance`);
    }
    const slice = reference.slice(prefix.length, -1);
    if (!slice.startsWith("GoSlice<") || !slice.endsWith(">")) {
      throw new Error(`raw AST list '${field.name}' did not resolve to the canonical GoSlice carrier`);
    }
    assertNoCollapsingGoPtr(slice, field.name);
    return slice;
  }
  assertNoCollapsingGoPtr(reference, field.name);
  if (reference.startsWith("GoPtr<") && !hasReviewedAggregatePointerProvenance(field)) {
    throw new Error(`AST field '${field.name}' has no reviewed aggregate-pointer representation provenance: ${reference}`);
  }
  return reference;
}

export function goOnlyFieldTsType(field) {
  if (!field.goOnly) throw new Error(`goOnly field mapper received non-goOnly field '${field.name}'`);
  if (field.listKind !== undefined) {
    throw new Error(`unsupported list kind '${field.listKind}' on goOnly field '${field.name}'`);
  }
  return lowerAstStorageType(field.rawType, field.name);
}

export function lowerAstStorageType(rawType, fieldName = "<unknown>") {
  if (typeof rawType !== "string" || rawType === "") {
    throw new Error(`goOnly AST field '${fieldName}' has no exact Go type provenance`);
  }
  if (rawType.startsWith("*")) return lowerAstPointer(rawType.slice(1), fieldName);
  if (rawType.startsWith("[]")) return `GoSlice<${lowerAstStorageType(rawType.slice(2), fieldName)}>`;
  const value = AST_VALUE_TS_TYPES.get(rawType) ?? REVIEWED_AGGREGATE_POINTERS.get(rawType);
  if (value !== undefined) return value;
  throw new Error(`goOnly AST field '${fieldName}' type '${rawType}' has no reviewed representation provenance`);
}

function lowerAstPointer(pointee, fieldName) {
  const aggregate = REVIEWED_AGGREGATE_POINTERS.get(pointee);
  if (aggregate !== undefined) return `GoPtr<${aggregate}>`;
  if (pointee.startsWith("*") || pointee.startsWith("[]") || AST_REFERENCE_POINTEES.has(pointee)) {
    return `GoRef<${lowerAstStorageType(pointee, fieldName)}>`;
  }
  throw new Error(`goOnly AST field '${fieldName}' pointer to '${pointee}' has no reviewed representation provenance`);
}

function assertNoCollapsingGoPtr(reference, fieldName) {
  if (/GoPtr<Go(?:Nilable|Ptr|Ref|Slice|Map|Chan|Func|Interface|Seq2?|Error|UnsafePointer)(?:<|>)/.test(reference)) {
    throw new Error(`AST field '${fieldName}' would collapse a pointer/header slot without exact representation provenance: ${reference}`);
  }
}

function hasReviewedAggregatePointerProvenance(field) {
  if (field.listKind === "ModifierList" || field.listKind === "NodeList") return true;
  return field.listKind === undefined && typeof field.isChild === "function" && field.isChild();
}

function baseCompatTypes(schema) {
  const types = new Set(["GoPtr", "GoSlice"]);
  for (const baseName of schema.baseNames()) {
    for (const field of schema.baseFields(baseName)) {
      if (field.noTS && !field.goOnly) continue;
      if (astMemberTsType(field).includes("GoRef<")) types.add("GoRef");
    }
  }
  return [...types].sort();
}

// CompositeBase needs a (non-goOnly-in-TS) facts cell because spine reads it.
function collectBaseFieldRefs(schema) {
  const refs = new Set();
  for (const baseName of schema.baseNames()) {
    if (HAND_WRITTEN_BASES.has(baseName)) continue;
    for (const field of schema.baseFields(baseName)) {
      if (field.noTS) continue;
      addRefsFromTsType(astMemberTsType(field), refs);
    }
  }
  return [...refs].sort();
}

// Extracts the union/list alias identifiers referenced by a TS reference string
// (e.g. "GoPtr<EntityName>" -> EntityName) so node.ts can import them.
export function addRefsFromTsType(tsRef, out) {
  const ids = tsRef.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  const skip = new Set(["GoPtr", "GoRef", "GoSlice", "Node", "NodeList", "ModifierList", "bool", "int", "string", "unknown", "Kind", "ModifierFlags", "NodeFlags", "TokenFlags", "Uint32"]);
  for (const id of ids) {
    if (!skip.has(id)) out.add(id);
  }
}
