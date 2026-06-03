/**
 * Base transformer type.
 *
 * Port of TS-Go `internal/transformers/transformer.go`. The base captures
 * the emit context, the node factory, and a node visitor; concrete
 * transformers (type eraser, downlevel passes, decorator lowering, etc.)
 * compose with it.
 *
 * API surface mirrors TS-Go exactly:
 * - `emitContext()`, `factory()`, `visitor()` — accessor methods (Go
 *   exported methods, capitalized in Go, lowercased in TS).
 * - `newTransformer(visit, ec)` / `initTransformer(visit, ec)` —
 *   initializers. Both names work since the codebase has historically
 *   used both.
 * - `transformSourceFile(file)` — public entry.
 */

import type {
  Node as AstNode,
  SourceFile,
  IdentifierNode,
  NodeList,
  ModifierList,
} from "../ast/index.js";
import { createNodeArray } from "../ast/index.js";

/**
 * The emit-context surface transformers need. The full
 * `printer.EmitContext` arrives with the printer module; this captures
 * the methods transformers invoke directly.
 */
export interface EmitContext {
  factory(): NodeFactory;
  newNodeVisitor(visit: (node: AstNode) => AstNode | undefined): NodeVisitor;
  addEmitHelper(node: AstNode, ...helpers: AstNode[]): void;
  addEmitHelpers(node: AstNode, helpers: readonly AstNode[] | undefined): void;
  readEmitHelpers(): readonly AstNode[];
  emitFlags(node: AstNode): number;
  setEmitFlags(node: AstNode, flags: number): void;
  addEmitFlags(node: AstNode, flags: number): void;
  setOriginal(node: AstNode, original: AstNode): void;
  setSourceMapRange(node: AstNode, range: unknown): void;
  setCommentRange(node: AstNode, range: unknown): void;
  setTypeNode(node: AstNode, typeNode: AstNode): void;
  mostOriginal(node: AstNode): AstNode;
  parseNode(node: AstNode): AstNode | undefined;
  newNotEmittedStatement(node: AstNode): AstNode;
  // Variable + lexical scope (TS-Go emit context surface)
  startVariableEnvironment(): void;
  endVariableEnvironment(): readonly AstNode[];
  endAndMergeVariableEnvironment(statements: readonly AstNode[]): readonly AstNode[];
  endAndMergeVariableEnvironmentList(statements: readonly AstNode[] | NodeList | undefined): NodeList;
  mergeEnvironmentList(statements: readonly AstNode[] | NodeList | undefined, declarations: readonly AstNode[]): NodeList;
  addInitializationStatement(node: AstNode): void;
  startLexicalEnvironment(): void;
  endLexicalEnvironment(): readonly AstNode[];
  endAndMergeLexicalEnvironment(statements: readonly AstNode[]): readonly AstNode[];
  addVariableDeclaration(name: IdentifierNode): void;
  addLexicalDeclaration(name: IdentifierNode): void;
  addHoistedFunctionDeclaration(node: AstNode): void;
  mergeEnvironment(statements: readonly AstNode[], declarations: readonly AstNode[]): readonly AstNode[];
  // Visitor convenience accessors (TS-Go visitor methods on EmitContext)
  visitParameters(parameters: readonly AstNode[] | NodeList | undefined, visitor?: unknown): NodeList;
  visitFunctionBody(body: AstNode | undefined, visitor?: unknown): AstNode | undefined;
  visitIterationBody(body: AstNode, visitor?: unknown): AstNode;
  visitEmbeddedStatement(statement: AstNode, visitor?: unknown): AstNode;
  // Range + comment helpers
  assignCommentAndSourceMapRanges(node: AstNode, original: AstNode): void;
  setNewSourceMapRange(node: AstNode, range: unknown): void;
  getOriginalRange(node: AstNode): unknown;
  // Auto-generate info introspection
  hasAutoGenerateInfo(node: AstNode): boolean;
  getAutoGenerateInfo(name: AstNode): unknown;
  getNodeForGeneratedName(name: AstNode): AstNode | undefined;
  // Type-node mapping
  getTypeNode(node: AstNode): AstNode | undefined;
  // Original-node mapping
  original(node: AstNode): AstNode | undefined;
  unsetOriginal(node: AstNode): void;
  addSyntheticTrailingComment(node: AstNode, kind: number, text: string, hasTrailingNewLine?: boolean): void;
  addSyntheticLeadingComment(node: AstNode, kind: number, text: string, hasTrailingNewLine?: boolean): void;
}

/**
 * NodeFactory — the AST-node constructor surface. The full ~200-method
 * surface mirrors TS-Go's `printer.NodeFactory` and the underlying
 * `ast/generated/factory.ts` create-functions.
 */
export interface NodeFactory {
  // ---- Identifiers + names ----
  newIdentifier(text: string): IdentifierNode;
  newUniqueName(text: string, options?: unknown): IdentifierNode;
  newUniqueNameEx(text: string, options: unknown): IdentifierNode;
  newTempVariable(reservedInNestedScopes?: boolean): IdentifierNode;
  newTempVariableEx(options: unknown): IdentifierNode;
  newLoopVariable(reservedInNestedScopes?: boolean): IdentifierNode;
  newLoopVariableEx(options: unknown): IdentifierNode;
  newGeneratedNameForNode(node: AstNode, options?: unknown): IdentifierNode;
  newGeneratedNameForNodeEx(node: AstNode, options: unknown): IdentifierNode;
  newUniquePrivateName(text: string): AstNode;
  newGeneratedPrivateNameForNode(node: AstNode): AstNode;

  // ---- Lists ----
  newNodeList<T extends AstNode = AstNode>(items: readonly T[]): NodeList;
  newModifierList(items: readonly AstNode[]): ModifierList;
  newSyntaxList(items: readonly AstNode[]): AstNode;

  // ---- Primitive expressions ----
  newThisExpression(): AstNode;
  newSuperExpression(): AstNode;
  newTrueExpression(): AstNode;
  newFalseExpression(): AstNode;
  newNullExpression(): AstNode;
  newVoidZeroExpression(): AstNode;
  newVoidZero(): AstNode;
  newCommaExpression(left: AstNode, right: AstNode): AstNode;
  newAssignment(left: AstNode, right: AstNode): AstNode;
  newAssignmentExpression(left: AstNode, right: AstNode): AstNode;
  newLogicalORExpression(left: AstNode, right: AstNode): AstNode;
  newLogicalANDExpression(left: AstNode, right: AstNode): AstNode;
  newStrictEqualityExpression(left: AstNode, right: AstNode): AstNode;
  newStrictInequalityExpression(left: AstNode, right: AstNode): AstNode;
  newPrefixUnaryExpression(operator: number, operand: AstNode): AstNode;
  newPostfixUnaryExpression(operand: AstNode, operator: number): AstNode;
  newConditional(condition: AstNode, whenTrue: AstNode, whenFalse: AstNode): AstNode;
  newConditionalExpression(...args: unknown[]): AstNode;
  newTypeOfExpression(expression: AstNode): AstNode;
  newDeleteExpression(expression: AstNode): AstNode;
  newAwaitExpression(expression: AstNode): AstNode;
  newYieldExpression(asteriskToken: AstNode | undefined, expression: AstNode | undefined): AstNode;
  newSpreadElement(expression: AstNode): AstNode;
  newParenthesizedExpression(expression: AstNode): AstNode;

  // ---- Literals ----
  newStringLiteral(text: string, flags?: number): AstNode;
  newStringLiteralFromNode(textSourceNode: AstNode): AstNode;
  newNumericLiteral(value: string, flags?: number): AstNode;
  newBigIntLiteral(value: string, flags?: number): AstNode;
  newRegularExpressionLiteral(text: string): AstNode;
  newNoSubstitutionTemplateLiteral(text: string, rawText: string | undefined): AstNode;
  newTemplateExpression(head: AstNode, spans: readonly AstNode[]): AstNode;
  newTemplateSpan(expression: AstNode, literal: AstNode): AstNode;

  // ---- Calls + access ---- (TS-Go surface — argument order matches Go)
  newCallExpression(...args: unknown[]): AstNode;
  newNewExpression(...args: unknown[]): AstNode;
  newTaggedTemplateExpression(...args: unknown[]): AstNode;
  newPropertyAccessExpression(...args: unknown[]): AstNode;
  newElementAccessExpression(...args: unknown[]): AstNode;
  newArrayLiteralExpression(elements: unknown, multiLine?: boolean): AstNode;
  newObjectLiteralExpression(properties: unknown, multiLine?: boolean): AstNode;
  newPropertyAssignment(...args: unknown[]): AstNode;
  newShorthandPropertyAssignment(...args: unknown[]): AstNode;
  newSpreadAssignment(expression: AstNode): AstNode;

  // ---- Variable declarations ----
  newVariableDeclaration(...args: unknown[]): AstNode;
  newVariableDeclarationList(...args: unknown[]): AstNode;
  newVariableStatement(...args: unknown[]): AstNode;
  newParameterDeclaration(...args: unknown[]): AstNode;
  newBindingElement(...args: unknown[]): AstNode;
  newObjectBindingPattern(elements: readonly AstNode[]): AstNode;
  newArrayBindingPattern(elements: readonly AstNode[]): AstNode;

  // ---- Statements ----
  newBlock(statements: readonly AstNode[] | NodeList, multiLine?: boolean): AstNode;
  newEmptyStatement(): AstNode;
  newExpressionStatement(expression: AstNode): AstNode;
  newLetStatement(name: IdentifierNode, initializer: AstNode | undefined): AstNode;
  newIfStatement(expression: AstNode, thenStatement: AstNode, elseStatement?: AstNode): AstNode;
  newDoStatement(statement: AstNode, expression: AstNode): AstNode;
  newWhileStatement(expression: AstNode, statement: AstNode): AstNode;
  newForStatement(initializer: AstNode | undefined, condition: AstNode | undefined, incrementor: AstNode | undefined, statement: AstNode): AstNode;
  newForInStatement(initializer: AstNode, expression: AstNode, statement: AstNode): AstNode;
  newForOfStatement(awaitModifier: AstNode | undefined, initializer: AstNode, expression: AstNode, statement: AstNode): AstNode;
  newReturnStatement(expression?: AstNode): AstNode;
  newBreakStatement(label?: IdentifierNode): AstNode;
  newContinueStatement(label?: IdentifierNode): AstNode;
  newThrowStatement(expression: AstNode): AstNode;
  newTryStatement(tryBlock: AstNode, catchClause?: AstNode, finallyBlock?: AstNode): AstNode;
  newCatchClause(variableDeclaration: AstNode | undefined, block: AstNode): AstNode;
  newSwitchStatement(expression: AstNode, caseBlock: AstNode): AstNode;
  newCaseClause(expression: AstNode, statements: readonly AstNode[]): AstNode;
  newDefaultClause(statements: readonly AstNode[]): AstNode;
  newCaseBlock(clauses: readonly AstNode[]): AstNode;
  newLabeledStatement(label: IdentifierNode, statement: AstNode): AstNode;
  newDebuggerStatement(): AstNode;
  newNotEmittedStatement(original: AstNode): AstNode;
  newPartiallyEmittedExpression(expression: AstNode, original?: AstNode): AstNode;

  // ---- Tokens / keywords ----
  newToken(kind: number): AstNode;
  newKeywordExpression(kind: number): AstNode;
  newAnyKeyword(): AstNode;
  newUnknownKeyword(): AstNode;

  // ---- Functions + classes ----
  newFunctionDeclaration(...args: unknown[]): AstNode;
  newFunctionExpression(...args: unknown[]): AstNode;
  newArrowFunction(...args: unknown[]): AstNode;
  newConstructorDeclaration(...args: unknown[]): AstNode;
  newMethodDeclaration(...args: unknown[]): AstNode;
  newGetAccessorDeclaration(...args: unknown[]): AstNode;
  newSetAccessorDeclaration(...args: unknown[]): AstNode;
  newPropertyDeclaration(...args: unknown[]): AstNode;
  newClassDeclaration(...args: unknown[]): AstNode;
  newClassExpression(...args: unknown[]): AstNode;
  newClassStaticBlockDeclaration(body: AstNode): AstNode;

  // ---- Top-level declarations ----
  newSourceFile(statements: readonly AstNode[]): AstNode;
  newImportDeclaration(...args: unknown[]): AstNode;
  newExportDeclaration(...args: unknown[]): AstNode;
  newImportClause(...args: unknown[]): AstNode;
  newNamedImports(elements: readonly AstNode[]): AstNode;
  newNamedExports(elements: readonly AstNode[]): AstNode;
  newImportSpecifier(isTypeOnly: boolean, propertyName: IdentifierNode | undefined, name: IdentifierNode): AstNode;
  newExportSpecifier(...args: unknown[]): AstNode;
  newImportEqualsDeclaration(modifiers: unknown, isTypeOnly: boolean, name: IdentifierNode, moduleReference: AstNode): AstNode;
  newExportAssignment(...args: unknown[]): AstNode;

  // ---- Heritage + type nodes ----
  newHeritageClause(token: number, types: readonly AstNode[]): AstNode;
  newExpressionWithTypeArguments(expression: AstNode, typeArguments: readonly AstNode[] | undefined): AstNode;
  newTypeReference(name: AstNode, typeArguments?: readonly AstNode[]): AstNode;
  newTypeParameter(name: IdentifierNode, constraint?: AstNode, defaultType?: AstNode): AstNode;

  // ---- Update operations (one per "newX" / "createX" returning the same kind) ----
  updateSourceFile(node: AstNode, statements: unknown, endOfFileToken?: AstNode): AstNode;
  updateBlock(node: AstNode, ...args: unknown[]): AstNode;
  updateVariableDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateVariableStatement(node: AstNode, ...args: unknown[]): AstNode;
  updateForStatement(node: AstNode, ...args: unknown[]): AstNode;
  updateForInStatement(node: AstNode, ...args: unknown[]): AstNode;
  updateForOfStatement(node: AstNode, ...args: unknown[]): AstNode;
  updateForInOrOfStatement(node: AstNode, ...args: unknown[]): AstNode;
  updatePropertyAccessExpression(node: AstNode, ...args: unknown[]): AstNode;
  updatePropertyDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateConstructorDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateMethodDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateGetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateSetAccessorDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateHeritageClause(node: AstNode, ...args: unknown[]): AstNode;
  updateClassDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateClassExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateFunctionDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateFunctionExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateArrowFunction(node: AstNode, ...args: unknown[]): AstNode;
  updateParameterDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateCallExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateNewExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateTaggedTemplateExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateExpressionWithTypeArguments(node: AstNode, ...args: unknown[]): AstNode;
  updateJsxSelfClosingElement(node: AstNode, ...args: unknown[]): AstNode;
  updateJsxOpeningElement(node: AstNode, ...args: unknown[]): AstNode;
  updateImportDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateImportClause(node: AstNode, ...args: unknown[]): AstNode;
  updateNamedImports(node: AstNode, ...args: unknown[]): AstNode;
  updateExportDeclaration(node: AstNode, ...args: unknown[]): AstNode;
  updateNamedExports(node: AstNode, ...args: unknown[]): AstNode;
  updateVariableDeclarationList(node: AstNode, ...args: unknown[]): AstNode;
  updateDoStatement(node: AstNode, statement: AstNode, expression: AstNode): AstNode;
  updateWhileStatement(node: AstNode, expression: AstNode, statement: AstNode): AstNode;
  updateIfStatement(node: AstNode, expression: AstNode, thenStatement: AstNode, elseStatement: AstNode | undefined): AstNode;
  updateSwitchStatement(node: AstNode, expression: AstNode, caseBlock: AstNode): AstNode;
  updateLabeledStatement(node: AstNode, ...args: unknown[]): AstNode;
  updateReturnStatement(node: AstNode, expression: AstNode | undefined): AstNode;
  updateCatchClause(node: AstNode, variableDeclaration: AstNode | undefined, block: AstNode): AstNode;
  updateCaseOrDefaultClause(node: AstNode, ...args: unknown[]): AstNode;
  updatePartiallyEmittedExpression(node: AstNode, expression: AstNode): AstNode;
  updateParenthesizedExpression(node: AstNode, expression: AstNode): AstNode;
  updatePrefixUnaryExpression(node: AstNode, ...args: unknown[]): AstNode;
  updatePostfixUnaryExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateSpreadElement(node: AstNode, expression: AstNode): AstNode;
  updateSpreadAssignment(node: AstNode, expression: AstNode): AstNode;
  updatePropertyAssignment(node: AstNode, ...args: unknown[]): AstNode;

  // ---- Composition + helpers ----
  inlineExpressions(expressions: readonly AstNode[]): AstNode;
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode;
  splitStandardPrologue(statements: readonly AstNode[]): { prologue: readonly AstNode[]; rest: readonly AstNode[] };
  splitCustomPrologue(statements: readonly AstNode[]): { custom: readonly AstNode[]; rest: readonly AstNode[] };
  ensureUseStrict(statements: readonly AstNode[]): readonly AstNode[];
  restoreEnclosingLabel(node: AstNode, label: AstNode | undefined): AstNode;

  // ---- Binary + binding expressions ----
  newBinaryExpression(...args: unknown[]): AstNode;
  updateBinaryExpression(node: AstNode, ...args: unknown[]): AstNode;
  updateShorthandPropertyAssignment(node: AstNode, ...args: unknown[]): AstNode;
  updateYieldExpression(node: AstNode, asteriskToken: AstNode | undefined, expression: AstNode | undefined): AstNode;
  updateWithStatement(node: AstNode, expression: AstNode, statement: AstNode): AstNode;
  newBindingPattern(kind: number, elements: readonly AstNode[]): AstNode;

  // ---- Identifier-name helpers ----
  getDeclarationName(node: AstNode, allowComments?: boolean, allowSourceMaps?: boolean): IdentifierNode;
  getLocalName(node: AstNode, allowComments?: boolean, allowSourceMaps?: boolean): IdentifierNode;
  getExportName(node: AstNode, allowComments?: boolean, allowSourceMaps?: boolean): IdentifierNode;
  getNamespaceMemberName(ns: IdentifierNode, name: IdentifierNode, allowComments?: boolean, allowSourceMaps?: boolean): AstNode;

  // ---- Emit helpers (__decorate, __metadata, __param, __await, etc.) ----
  newAwaitHelper(expression: AstNode): AstNode;
  newAwaiterHelper(...args: unknown[]): AstNode;
  newAsyncValuesHelper(expression: AstNode): AstNode;
  newDisposeResourcesHelper(envBinding: AstNode): AstNode;
  newImportStarHelper(expression: AstNode): AstNode;
  newImportDefaultHelper(expression: AstNode): AstNode;
  newRewriteRelativeImportExtensionsHelper(expression: AstNode, preserveJSX?: boolean): AstNode;
  newDecorateHelper(decoratorExpressions: readonly AstNode[], target: AstNode, memberName?: AstNode | undefined, descriptor?: AstNode | undefined): AstNode;
  newMetadataHelper(metadataKey: string, metadataValue: AstNode): AstNode;
  newParamHelper(expression: AstNode, parameterOffset: number, location?: unknown): AstNode;
  newAddDisposableResourceHelper(envBinding: AstNode, value: AstNode, async: boolean): AstNode;
  newReadHelper(value: AstNode): AstNode;
  newSpreadHelper(value: AstNode): AstNode;
  newSpreadArrayHelper(to: AstNode, from: AstNode, packFrom?: boolean): AstNode;
  newAssignHelper(...args: unknown[]): AstNode;
  newRestHelper(...args: unknown[]): AstNode;
  newAsyncDelegatorHelper(expression: AstNode): AstNode;
  newAsyncGeneratorHelper(generatorFunc: AstNode, hasLexicalThis: boolean): AstNode;
  newExportStarHelper(moduleExpression: AstNode, exportsExpression?: AstNode): AstNode;
  newGeneratorHelper(body: AstNode): AstNode;
  newCreateBindingHelper(moduleExpression: AstNode, inputName: AstNode, outputName?: AstNode): AstNode;
  createForOfBindingStatement(node: AstNode, value: AstNode): AstNode;
  restoreOuterExpressions(...args: unknown[]): AstNode;
  createExpressionFromEntityName(name: AstNode): AstNode;
  newSetModuleDefaultHelper(targetObject: AstNode, value: AstNode): AstNode;

  // ---- Misc node types ----
  newOmittedExpression(): AstNode;
  newNamespaceImport(name: IdentifierNode): AstNode;
  newNamespaceExport(name: IdentifierNode): AstNode;
  newModifier(kind: number): AstNode;
  newMetaProperty(keywordToken: number, name: IdentifierNode): AstNode;
  newFunctionCallCall(target: AstNode, thisArg: AstNode, argumentsList: readonly AstNode[]): AstNode;
  newFunctionApplyCall(target: AstNode, thisArg: AstNode, argumentsExpression: AstNode): AstNode;
  newTemplateHead(...args: unknown[]): AstNode;
  newTemplateMiddle(...args: unknown[]): AstNode;
  newTemplateTail(...args: unknown[]): AstNode;
  newTypeCheck(value: AstNode, tag: string): AstNode;
  newArraySliceCall(array: AstNode, start?: number): AstNode;
  newGlobalMethodCall(globalObjectName: string, methodName: string, argumentsList: readonly AstNode[]): AstNode;
  newMethodCall(object: AstNode, methodName: IdentifierNode | string, argumentsList: readonly AstNode[]): AstNode;
  newUnscopedHelperName(name: string): AstNode;
  newReflectSetCall(target: AstNode, propertyKey: AstNode, value: AstNode, receiver: AstNode): AstNode;
  newAssignmentTargetWrapper(paramName: IdentifierNode, expression: AstNode): AstNode;

  // ---- Token / decorator factories ----
  newDecorator(expression: AstNode): AstNode;
  newQualifiedName(left: AstNode, right: IdentifierNode): AstNode;
  newComputedPropertyName(expression: AstNode): AstNode;
}

/**
 * NodeVisitor — visits, transforms, and walks AST trees. Mirrors
 * TS-Go's `ast.NodeVisitor` surface.
 */
export interface NodeVisitor {
  visit(node: AstNode | undefined): AstNode;
  visitNode(node: AstNode | undefined): AstNode;
  visitNodes(nodes: NodeList | undefined): NodeList;
  visitEachChild(node: AstNode): AstNode;
  visitSlice(nodes: readonly AstNode[]): { items: readonly AstNode[]; changed: boolean };
  visitSourceFile(file: SourceFile): SourceFile;
  visitModifiers(modifiers: ModifierList | undefined): ModifierList | undefined;
  visitParameters(parameters: readonly AstNode[]): readonly AstNode[];
  visitFunctionBody(body: AstNode | undefined): AstNode | undefined;
  visitIterationBody(body: AstNode | undefined): AstNode;
  visitEmbeddedStatement(statement: AstNode | undefined): AstNode;
}

/**
 * Options passed when constructing a transformer. Mirrors TS-Go
 * `transformers.TransformOptions`. The index signature is intentional —
 * concrete transformers may attach extra options (like
 * `getEmitModuleFormatOfFile` used by commonjsmodule.ts).
 */
export interface TransformOptions {
  readonly compilerOptions: CompilerOptionsLike;
  readonly resolver: ReferenceResolverLike;
  readonly emitResolver: EmitResolverLike;
  readonly context: EmitContext;
  readonly [key: string]: unknown;
}

/** Permissive CompilerOptions surface — the real shape lives in core. */
export interface CompilerOptionsLike {
  readonly experimentalDecorators?: unknown;
  readonly verbatimModuleSyntax?: unknown;
  readonly [key: string]: unknown;
}

/** Permissive ReferenceResolver surface. */
export interface ReferenceResolverLike {
  getReferencedValueDeclaration(node: AstNode): AstNode | undefined;
  getReferencedExportContainer?(node: AstNode, prefixLocals: boolean): AstNode | undefined;
  getReferencedImportDeclaration?(node: AstNode): AstNode | undefined;
  getReferencedValueDeclarations?(node: AstNode): readonly AstNode[] | undefined;
  getReferencedDeclarationWithCollidingName?(node: AstNode): AstNode | undefined;
  isDeclarationWithCollidingName?(node: AstNode): boolean;
}

/** Permissive EmitResolver surface. */
export interface EmitResolverLike {
  isReferencedAliasDeclaration?(node: AstNode): boolean;
  isValueAliasDeclaration?(node: AstNode): boolean;
  isTopLevelValueImportEqualsWithEntityName?(node: AstNode): boolean;
  hasGlobalName?(name: string): boolean;
  getReferencedExportContainer?(node: AstNode, prefixLocals: boolean): AstNode | undefined;
  getReferencedImportDeclaration?(node: AstNode): AstNode | undefined;
  getConstantValue?(node: AstNode): string | number | undefined;
  getEnumMemberValue?(node: AstNode): string | number | undefined;
  isImplementationOfOverload?(node: AstNode): boolean;
  isLateBound?(node: AstNode): boolean;
  getExternalModuleFileFromDeclaration?(declaration: AstNode): SourceFile | undefined;
  getNodeCheckFlags?(node: AstNode): number;
}

/**
 * Base transformer. Concrete transformers extend this and call
 * `newTransformer(visit, ec)` (or the alias `initTransformer(visit, ec)`)
 * in their constructor to wire up the emit context, factory, and
 * visitor.
 */
export class Transformer {
  #emitContext: EmitContext | undefined;
  #factory: NodeFactory | undefined;
  #visitor: NodeVisitor | undefined;

  /**
   * Initialize the transformer with a visit function and (optionally)
   * an existing emit context.
   *
   * Mirrors TS-Go `(tx *Transformer) NewTransformer(...)`.
   */
  newTransformer(visit: (node: AstNode) => AstNode | undefined, emitContext: EmitContext | undefined): this {
    if (this.#emitContext !== undefined) {
      throw new Error("Transformer already initialized");
    }
    const ec = emitContext ?? createDefaultEmitContext();
    this.#emitContext = ec;
    this.#factory = ec.factory();
    this.#visitor = ec.newNodeVisitor(visit);
    return this;
  }

  /** Alias for `newTransformer`, kept for ports that use the newer name. */
  initTransformer(visit: (node: AstNode) => AstNode | undefined, emitContext: EmitContext | undefined): this {
    return this.newTransformer(visit, emitContext);
  }

  /**
   * Accessor for the emit context (TS-Go `EmitContext()`).
   * Throws if the transformer is not initialized.
   */
  emitContext(): EmitContext {
    if (this.#emitContext === undefined) {
      throw new Error("Transformer not initialized");
    }
    return this.#emitContext;
  }

  /** Backward-compat alias used by ~19 call sites. */
  getEmitContext(): EmitContext {
    return this.emitContext();
  }

  /**
   * Accessor for the node factory (TS-Go `Factory()`).
   */
  factory(): NodeFactory {
    if (this.#factory === undefined) {
      throw new Error("Transformer not initialized");
    }
    return this.#factory;
  }

  /** Backward-compat alias. */
  getFactory(): NodeFactory {
    return this.factory();
  }

  /**
   * Accessor for the node visitor (TS-Go `Visitor()`).
   */
  visitor(): NodeVisitor {
    if (this.#visitor === undefined) {
      throw new Error("Transformer not initialized");
    }
    return this.#visitor;
  }

  /** Backward-compat alias. */
  getVisitor(): NodeVisitor {
    return this.visitor();
  }

  /**
   * Public entry: transform a single source file. Concrete transformers
   * may override.
   */
  transformSourceFile(file: SourceFile): SourceFile {
    return this.visitor().visitSourceFile(file);
  }
}

/**
 * Default fallback emit context used when a transformer is constructed
 * without one. The real emit context is built by the printer module
 * and passed in via TransformOptions; this fallback is a minimal stub
 * that supports the transformer's most-common needs at test time.
 */
function createDefaultEmitContext(): EmitContext {
  const factory: NodeFactory = createStubFactory();
  const helpers: AstNode[] = [];
  const flagMap = new Map<AstNode, number>();
  const originalMap = new Map<AstNode, AstNode>();
  const sourceMapRangeMap = new Map<AstNode, unknown>();
  const commentRangeMap = new Map<AstNode, unknown>();
  const typeNodeMap = new Map<AstNode, AstNode>();
  const variableStack: IdentifierNode[][] = [];
  const lexicalStack: IdentifierNode[][] = [];
  const hoistedFunctionStack: AstNode[][] = [];

  const ctx: EmitContext = {
    factory() { return factory; },
    newNodeVisitor(visit) {
      return createStubNodeVisitor(visit);
    },
    addEmitHelper(_node, ...newHelpers) {
      helpers.push(...newHelpers);
    },
    addEmitHelpers(_node, newHelpers) {
      if (newHelpers !== undefined) helpers.push(...newHelpers);
    },
    readEmitHelpers() {
      const result = helpers.slice();
      helpers.length = 0;
      return result;
    },
    emitFlags(node) { return flagMap.get(node) ?? 0; },
    setEmitFlags(node, flags) { flagMap.set(node, flags); },
    addEmitFlags(node, flags) { flagMap.set(node, (flagMap.get(node) ?? 0) | flags); },
    setOriginal(node, original) { originalMap.set(node, original); },
    setSourceMapRange(node, range) { sourceMapRangeMap.set(node, range); },
    setCommentRange(node, range) { commentRangeMap.set(node, range); },
    setTypeNode(node, typeNode) { typeNodeMap.set(node, typeNode); },
    mostOriginal(node) {
      let current: AstNode = node;
      const seen = new Set<AstNode>();
      while (!seen.has(current)) {
        seen.add(current);
        const next = originalMap.get(current);
        if (next === undefined) break;
        current = next;
      }
      return current;
    },
    parseNode(_node) { return undefined; },
    newNotEmittedStatement(node) { return node; },
    startVariableEnvironment() { variableStack.push([]); hoistedFunctionStack.push([]); },
    endVariableEnvironment() {
      variableStack.pop();
      return hoistedFunctionStack.pop() ?? [];
    },
    endAndMergeVariableEnvironment(statements) {
      const hoisted = hoistedFunctionStack.pop() ?? [];
      variableStack.pop();
      return [...hoisted, ...statements];
    },
    endAndMergeVariableEnvironmentList(statements) {
      const hoisted = hoistedFunctionStack.pop() ?? [];
      variableStack.pop();
      const arr = statements === undefined ? [] : [...hoisted, ...(statements as readonly AstNode[])];
      return createNodeArray(arr);
    },
    mergeEnvironmentList(statements, declarations) {
      const arr = statements === undefined ? [...declarations] : [...declarations, ...(statements as readonly AstNode[])];
      return createNodeArray(arr);
    },
    addInitializationStatement(node) {
      const top = hoistedFunctionStack[hoistedFunctionStack.length - 1];
      if (top !== undefined) top.push(node);
    },
    startLexicalEnvironment() { lexicalStack.push([]); },
    endLexicalEnvironment() { return lexicalStack.pop() ?? []; },
    endAndMergeLexicalEnvironment(statements) {
      const decls = lexicalStack.pop() ?? [];
      return [...decls, ...statements];
    },
    addVariableDeclaration(name) {
      const top = variableStack[variableStack.length - 1];
      if (top !== undefined) top.push(name);
    },
    addLexicalDeclaration(name) {
      const top = lexicalStack[lexicalStack.length - 1];
      if (top !== undefined) top.push(name);
    },
    addHoistedFunctionDeclaration(node) {
      const top = hoistedFunctionStack[hoistedFunctionStack.length - 1];
      if (top !== undefined) top.push(node);
    },
    mergeEnvironment(statements, declarations) {
      return [...declarations, ...statements];
    },
    visitParameters(parameters) { return createNodeArray(parameters ?? []); },
    visitFunctionBody(body) { return body; },
    visitIterationBody(body) { return (body ?? ({} as AstNode)); },
    visitEmbeddedStatement(statement) { return (statement ?? ({} as AstNode)); },
    assignCommentAndSourceMapRanges(node, original) {
      commentRangeMap.set(node, commentRangeMap.get(original));
      sourceMapRangeMap.set(node, sourceMapRangeMap.get(original));
    },
    setNewSourceMapRange(node, range) { sourceMapRangeMap.set(node, range); },
    getOriginalRange(node) {
      const orig = originalMap.get(node);
      return orig === undefined ? sourceMapRangeMap.get(node) : sourceMapRangeMap.get(orig);
    },
    hasAutoGenerateInfo(_node) { return false; },
    getAutoGenerateInfo(_name) { return undefined; },
    getNodeForGeneratedName(_name) { return undefined; },
    getTypeNode(node) { return typeNodeMap.get(node); },
    original(node) { return originalMap.get(node); },
    unsetOriginal(node) { originalMap.delete(node); },
    addSyntheticTrailingComment(_node, _kind, _text, _hasTrailingNewLine) {},
    addSyntheticLeadingComment(_node, _kind, _text, _hasTrailingNewLine) {},
  };
  return ctx;
}

function createStubFactory(): NodeFactory {
  // A permissive stub for test/fallback contexts. The real factory
  // is constructed by `printer/factory.ts` and passed in via
  // TransformOptions. Methods here return synthesized placeholders so
  // transformer chains can run end-to-end during unit tests.
  const dummy = (): AstNode => ({} as AstNode);
  const handler: ProxyHandler<NodeFactory> = {
    get(_target, _prop) {
      return dummy;
    },
  };
  return new Proxy({} as NodeFactory, handler);
}

function createStubNodeVisitor(visit: (node: AstNode) => AstNode | undefined): NodeVisitor {
  const noop: NodeVisitor = {
    visit(node) {
      if (node === undefined) return {} as AstNode;
      const result = visit(node);
      return result ?? node;
    },
    visitNode(node) {
      if (node === undefined) return {} as AstNode;
      const result = visit(node);
      return result ?? node;
    },
    visitNodes(nodes) { return nodes ?? ({} as NodeList); },
    visitEachChild(node) { return node; },
    visitSlice(nodes) { return { items: nodes, changed: false }; },
    visitSourceFile(file) { return file; },
    visitModifiers(modifiers) { return modifiers; },
    visitParameters(parameters) { return parameters ?? []; },
    visitFunctionBody(body) { return body; },
    visitIterationBody(body) { return (body ?? ({} as AstNode)); },
    visitEmbeddedStatement(statement) { return (statement ?? ({} as AstNode)); },
  };
  return noop;
}
