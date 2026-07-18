export const HAND_WRITTEN_BASES = new Set(["NodeBase"]);

// The 20 nodeData methods, in declaration order, with their default targets in
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
