/**
 * Base transformer type.
 *
 * Port of TS-Go `internal/transformers/transformer.go`. The base captures
 * the emit context, the node factory, and a node visitor; concrete
 * transformers (type eraser, downlevel passes, decorator lowering, etc.)
 * compose with it.
 *
 * API surface mirrors Strada exactly:
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
} from "../ast/index.js";

/**
 * The emit-context surface transformers need. The full
 * `printer.EmitContext` arrives with the printer module; this captures
 * the methods transformers invoke directly.
 */
export interface EmitContext {
  readonly factory: NodeFactory;
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
  // Variable + lexical scope (Strada emit context surface)
  startVariableEnvironment(): void;
  endVariableEnvironment(): readonly AstNode[];
  endAndMergeVariableEnvironment(statements: readonly AstNode[]): readonly AstNode[];
  endAndMergeVariableEnvironmentList(statements: readonly AstNode[]): readonly AstNode[];
  addInitializationStatement(node: AstNode): void;
  startLexicalEnvironment(): void;
  endLexicalEnvironment(): readonly AstNode[];
  endAndMergeLexicalEnvironment(statements: readonly AstNode[]): readonly AstNode[];
  addVariableDeclaration(name: IdentifierNode): void;
  addLexicalDeclaration(name: IdentifierNode): void;
  addHoistedFunctionDeclaration(node: AstNode): void;
  mergeEnvironment(statements: readonly AstNode[], declarations: readonly AstNode[]): readonly AstNode[];
  // Visitor convenience accessors (Strada visitor methods on EmitContext)
  visitParameters(parameters: readonly AstNode[]): readonly AstNode[];
  visitFunctionBody(body: AstNode | undefined): AstNode | undefined;
  visitIterationBody(body: AstNode): AstNode;
  visitEmbeddedStatement(statement: AstNode): AstNode;
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
}

/**
 * NodeFactory — the AST-node constructor surface. The full ~200-method
 * surface mirrors Strada's `printer.NodeFactory` and the underlying
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
  newNodeList(items: readonly AstNode[]): NodeList;
  newModifierList(items: readonly AstNode[]): unknown;
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
  newBigIntLiteral(value: string): AstNode;
  newRegularExpressionLiteral(text: string): AstNode;
  newNoSubstitutionTemplateLiteral(text: string, rawText: string | undefined): AstNode;
  newTemplateExpression(head: AstNode, spans: readonly AstNode[]): AstNode;
  newTemplateSpan(expression: AstNode, literal: AstNode): AstNode;

  // ---- Calls + access ---- (Strada surface — argument order matches Go)
  newCallExpression(expression: AstNode, questionDotToken: AstNode | undefined, typeArguments: unknown, args: unknown, flags?: number): AstNode;
  newNewExpression(expression: AstNode, typeArguments: unknown, args: unknown): AstNode;
  newTaggedTemplateExpression(tag: AstNode, questionDotToken: AstNode | undefined, typeArguments: unknown, template: AstNode, flags?: number): AstNode;
  newPropertyAccessExpression(expression: AstNode, questionDotToken: AstNode | undefined, name: AstNode, flags?: number): AstNode;
  newElementAccessExpression(expression: AstNode, questionDotToken: AstNode | undefined, argumentExpression: AstNode, flags?: number): AstNode;
  newArrayLiteralExpression(elements: unknown, multiLine?: boolean): AstNode;
  newObjectLiteralExpression(properties: unknown, multiLine?: boolean): AstNode;
  newPropertyAssignment(modifiers: unknown, name: AstNode, questionToken: AstNode | undefined, exclamationToken: AstNode | undefined, initializer: AstNode): AstNode;
  newShorthandPropertyAssignment(modifiers: unknown, name: IdentifierNode, questionToken: AstNode | undefined, exclamationToken: AstNode | undefined, equalsToken: AstNode | undefined, objectAssignmentInitializer: AstNode | undefined): AstNode;
  newSpreadAssignment(expression: AstNode): AstNode;

  // ---- Variable declarations ----
  newVariableDeclaration(name: AstNode, exclamationToken: AstNode | undefined, type: AstNode | undefined, initializer: AstNode | undefined): AstNode;
  newVariableDeclarationList(declarations: readonly AstNode[], flags?: number): AstNode;
  newVariableStatement(modifiers: unknown, declarationList: AstNode): AstNode;
  newParameterDeclaration(modifiers: unknown, dotDotDotToken: AstNode | undefined, name: AstNode, questionToken?: AstNode, type?: AstNode, initializer?: AstNode): AstNode;
  newBindingElement(dotDotDotToken: AstNode | undefined, propertyName: AstNode | undefined, name: AstNode, initializer?: AstNode): AstNode;
  newObjectBindingPattern(elements: readonly AstNode[]): AstNode;
  newArrayBindingPattern(elements: readonly AstNode[]): AstNode;

  // ---- Statements ----
  newBlock(statements: readonly AstNode[], multiLine?: boolean): AstNode;
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
  newFunctionDeclaration(modifiers: unknown, asteriskToken: AstNode | undefined, name: IdentifierNode | undefined, typeParameters: unknown, parameters: readonly AstNode[], type: AstNode | undefined, body: AstNode | undefined): AstNode;
  newFunctionExpression(modifiers: unknown, asteriskToken: AstNode | undefined, name: IdentifierNode | undefined, typeParameters: unknown, parameters: readonly AstNode[], type: AstNode | undefined, body: AstNode): AstNode;
  newArrowFunction(modifiers: unknown, typeParameters: unknown, parameters: readonly AstNode[], type: AstNode | undefined, equalsGreaterThanToken: AstNode | undefined, body: AstNode): AstNode;
  newConstructorDeclaration(modifiers: unknown, parameters: readonly AstNode[], body: AstNode | undefined): AstNode;
  newMethodDeclaration(modifiers: unknown, asteriskToken: AstNode | undefined, name: AstNode, questionToken: AstNode | undefined, typeParameters: unknown, parameters: readonly AstNode[], type: AstNode | undefined, body: AstNode | undefined): AstNode;
  newGetAccessorDeclaration(modifiers: unknown, name: AstNode, parameters: readonly AstNode[], type: AstNode | undefined, body: AstNode | undefined): AstNode;
  newSetAccessorDeclaration(modifiers: unknown, name: AstNode, parameters: readonly AstNode[], body: AstNode | undefined): AstNode;
  newPropertyDeclaration(modifiers: unknown, name: AstNode, questionOrExclamationToken: AstNode | undefined, type: AstNode | undefined, initializer: AstNode | undefined): AstNode;
  newClassDeclaration(modifiers: unknown, name: IdentifierNode | undefined, typeParameters: unknown, heritageClauses: unknown, members: readonly AstNode[]): AstNode;
  newClassExpression(modifiers: unknown, name: IdentifierNode | undefined, typeParameters: unknown, heritageClauses: unknown, members: readonly AstNode[]): AstNode;
  newClassStaticBlockDeclaration(body: AstNode): AstNode;

  // ---- Top-level declarations ----
  newSourceFile(statements: readonly AstNode[]): AstNode;
  newImportDeclaration(modifiers: unknown, importClause: AstNode | undefined, moduleSpecifier: AstNode, attributes: AstNode | undefined): AstNode;
  newExportDeclaration(modifiers: unknown, isTypeOnly: boolean, exportClause: AstNode | undefined, moduleSpecifier: AstNode | undefined, attributes: AstNode | undefined): AstNode;
  newImportClause(isTypeOnly: boolean | undefined, phaseModifier: AstNode | undefined, name: IdentifierNode | undefined, namedBindings: AstNode | undefined): AstNode;
  newNamedImports(elements: readonly AstNode[]): AstNode;
  newNamedExports(elements: readonly AstNode[]): AstNode;
  newImportSpecifier(isTypeOnly: boolean, propertyName: IdentifierNode | undefined, name: IdentifierNode): AstNode;
  newExportSpecifier(isTypeOnly: boolean, propertyName: IdentifierNode | undefined, name: IdentifierNode): AstNode;
  newImportEqualsDeclaration(modifiers: unknown, isTypeOnly: boolean, name: IdentifierNode, moduleReference: AstNode): AstNode;
  newExportAssignment(modifiers: unknown, isExportEquals: boolean | undefined, expression: AstNode): AstNode;

  // ---- Heritage + type nodes ----
  newHeritageClause(token: number, types: readonly AstNode[]): AstNode;
  newExpressionWithTypeArguments(expression: AstNode, typeArguments: readonly AstNode[] | undefined): AstNode;
  newTypeReference(name: AstNode, typeArguments?: readonly AstNode[]): AstNode;
  newTypeParameter(name: IdentifierNode, constraint?: AstNode, defaultType?: AstNode): AstNode;

  // ---- Update operations (one per "newX" / "createX" returning the same kind) ----
  updateSourceFile(node: AstNode, statements: readonly AstNode[]): AstNode;
  updateBlock(node: AstNode, statements: readonly AstNode[]): AstNode;
  updateVariableDeclaration(node: AstNode, name: AstNode, exclamationToken: AstNode | undefined, type: AstNode | undefined, initializer: AstNode | undefined): AstNode;
  updateVariableStatement(node: AstNode, modifiers: unknown, declarationList: AstNode): AstNode;
  updateForStatement(node: AstNode, initializer: AstNode | undefined, condition: AstNode | undefined, incrementor: AstNode | undefined, statement: AstNode): AstNode;
  updateForInStatement(node: AstNode, initializer: AstNode, expression: AstNode, statement: AstNode): AstNode;
  updateForOfStatement(node: AstNode, awaitModifier: AstNode | undefined, initializer: AstNode, expression: AstNode, statement: AstNode): AstNode;
  updateForInOrOfStatement(node: AstNode, ...args: unknown[]): AstNode;
  updatePropertyAccessExpression(node: AstNode, expression: AstNode, questionDotToken: AstNode | undefined, name: AstNode, flags: number): AstNode;
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

  // ---- Composition + helpers ----
  inlineExpressions(expressions: readonly AstNode[]): AstNode;
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode;
  splitStandardPrologue(statements: readonly AstNode[]): { prologue: readonly AstNode[]; rest: readonly AstNode[] };
  splitCustomPrologue(statements: readonly AstNode[]): { custom: readonly AstNode[]; rest: readonly AstNode[] };
  ensureUseStrict(statements: readonly AstNode[]): readonly AstNode[];
  restoreEnclosingLabel(node: AstNode, label: AstNode | undefined): AstNode;

  // ---- Binary + binding expressions ----
  newBinaryExpression(left: AstNode, operator: number, right: AstNode): AstNode;
  updateBinaryExpression(node: AstNode, left: AstNode, operator: number, right: AstNode): AstNode;
  updateShorthandPropertyAssignment(node: AstNode, name: IdentifierNode, objectAssignmentInitializer: AstNode | undefined): AstNode;
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
  newAwaiterHelper(hasLexicalArguments: boolean, hasLexicalThis: boolean, promiseConstructor: AstNode | undefined, body: AstNode): AstNode;
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
  newAssignHelper(args: readonly AstNode[]): AstNode;
  newRestHelper(value: AstNode, elements: readonly AstNode[], computedTempVariables: readonly AstNode[]): AstNode;
}

/**
 * NodeVisitor — visits, transforms, and walks AST trees. Mirrors
 * Strada's `ast.NodeVisitor` surface.
 */
export interface NodeVisitor {
  visit(node: AstNode | undefined): AstNode | undefined;
  visitNode(node: AstNode | undefined): AstNode | undefined;
  visitNodes(nodes: NodeList | undefined): NodeList;
  visitEachChild(node: AstNode): AstNode;
  visitSlice(nodes: readonly AstNode[]): { items: readonly AstNode[]; changed: boolean };
  visitSourceFile(file: SourceFile): SourceFile;
  visitModifiers(modifiers: unknown): unknown;
  visitParameters(parameters: readonly AstNode[]): readonly AstNode[];
  visitFunctionBody(body: AstNode | undefined): AstNode | undefined;
  visitIterationBody(body: AstNode): AstNode;
  visitEmbeddedStatement(statement: AstNode): AstNode;
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
  newTransformer(
    visit: (node: AstNode) => AstNode | undefined,
    emitContext: EmitContext | undefined,
  ): this {
    if (this.#emitContext !== undefined) {
      throw new Error("Transformer already initialized");
    }
    const ec = emitContext ?? createDefaultEmitContext();
    this.#emitContext = ec;
    this.#factory = ec.factory;
    this.#visitor = ec.newNodeVisitor(visit);
    return this;
  }

  /** Alias for `newTransformer`, kept for ports that use the newer name. */
  initTransformer(
    visit: (node: AstNode) => AstNode | undefined,
    emitContext: EmitContext | undefined,
  ): this {
    return this.newTransformer(visit, emitContext);
  }

  /**
   * Accessor for the emit context (Strada `EmitContext()`).
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
   * Accessor for the node factory (Strada `Factory()`).
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
   * Accessor for the node visitor (Strada `Visitor()`).
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
    factory,
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
      return [...hoisted, ...statements];
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
    visitParameters(parameters) { return parameters; },
    visitFunctionBody(body) { return body; },
    visitIterationBody(body) { return body; },
    visitEmbeddedStatement(statement) { return statement; },
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
    visit(node) { return node === undefined ? undefined : visit(node); },
    visitNode(node) { return node === undefined ? undefined : visit(node); },
    visitNodes(nodes) { return nodes ?? ({} as NodeList); },
    visitEachChild(node) { return node; },
    visitSlice(nodes) { return { items: nodes, changed: false }; },
    visitSourceFile(file) { return file; },
    visitModifiers(modifiers) { return modifiers; },
    visitParameters(parameters) { return parameters; },
    visitFunctionBody(body) { return body; },
    visitIterationBody(body) { return body; },
    visitEmbeddedStatement(statement) { return statement; },
  };
  return noop;
}
