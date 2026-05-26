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
  readEmitHelpers(): readonly AstNode[];
  emitFlags(node: AstNode): number;
  addEmitFlags(node: AstNode, flags: number): void;
  setOriginal(node: AstNode, original: AstNode): void;
  setSourceMapRange(node: AstNode, range: unknown): void;
  setCommentRange(node: AstNode, range: unknown): void;
  setTypeNode(node: AstNode, typeNode: AstNode): void;
  mostOriginal(node: AstNode): AstNode;
  parseNode(node: AstNode): AstNode | undefined;
  newNotEmittedStatement(node: AstNode): AstNode;
}

export interface NodeFactory {
  newIdentifier(text: string): IdentifierNode;
  newUniqueName(text: string): IdentifierNode;
  newTempVariable(): IdentifierNode;
  newNodeList(items: readonly AstNode[]): NodeList;
  newModifierList(items: readonly AstNode[]): unknown;
  newSyntaxList(items: readonly AstNode[]): AstNode;
  newAssignment(left: AstNode, right: AstNode): AstNode;
  newBlock(statements: readonly AstNode[]): AstNode;
  newEmptyStatement(): AstNode;
  newLetStatement(name: IdentifierNode, initializer: AstNode | undefined): AstNode;
  newExpressionStatement(expression: AstNode): AstNode;
  newPropertyAccessExpression(expression: AstNode, name: AstNode): AstNode;
  newElementAccessExpression(expression: AstNode, argumentExpression: AstNode): AstNode;
  newPrefixUnaryExpression(operator: number, operand: AstNode): AstNode;
  newPartiallyEmittedExpression(expression: AstNode): AstNode;
  newClassPrivateFieldInHelper(brandCheckIdentifier: IdentifierNode, receiver: AstNode): AstNode;
  inlineExpressions(expressions: readonly AstNode[]): AstNode;
  // The full factory surface is large; per-method getters are
  // declared by concrete printer/factory.ts. Transformers reference
  // them via this opaque type.
}

export interface NodeVisitor {
  visitNode(node: AstNode | undefined): AstNode | undefined;
  visitNodes(nodes: NodeList | undefined): NodeList;
  visitEachChild(node: AstNode): AstNode;
  visitSlice(nodes: readonly AstNode[]): readonly AstNode[];
  visitSourceFile(file: SourceFile): SourceFile;
  visitModifiers(modifiers: unknown): unknown;
}

/**
 * Options passed when constructing a transformer. Mirrors TS-Go
 * `transformers.TransformOptions`.
 */
export interface TransformOptions {
  readonly compilerOptions: CompilerOptionsLike;
  readonly resolver: ReferenceResolverLike;
  readonly emitResolver: EmitResolverLike;
  readonly context: EmitContext;
}

/** Minimal CompilerOptions surface needed by transformers. */
export interface CompilerOptionsLike {
  readonly experimentalDecorators?: unknown;
  readonly verbatimModuleSyntax?: unknown;
  readonly [key: string]: unknown;
}

/** Minimal ReferenceResolver surface used by transformers. */
export interface ReferenceResolverLike {
  getReferencedValueDeclaration(node: AstNode): AstNode | undefined;
  readonly [key: string]: unknown;
}

/** Minimal EmitResolver surface used by transformers. */
export interface EmitResolverLike {
  isReferencedAliasDeclaration?(node: AstNode): boolean;
  isValueAliasDeclaration?(node: AstNode): boolean;
  isTopLevelValueImportEqualsWithEntityName?(node: AstNode): boolean;
  readonly [key: string]: unknown;
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

  const ctx: EmitContext = {
    factory,
    newNodeVisitor(visit) {
      return createStubNodeVisitor(visit);
    },
    addEmitHelper(_node, ...newHelpers) {
      helpers.push(...newHelpers);
    },
    readEmitHelpers() {
      const result = helpers.slice();
      helpers.length = 0;
      return result;
    },
    emitFlags(node) {
      return flagMap.get(node) ?? 0;
    },
    addEmitFlags(node, flags) {
      flagMap.set(node, (flagMap.get(node) ?? 0) | flags);
    },
    setOriginal(node, original) {
      originalMap.set(node, original);
    },
    setSourceMapRange(node, range) {
      sourceMapRangeMap.set(node, range);
    },
    setCommentRange(node, range) {
      commentRangeMap.set(node, range);
    },
    setTypeNode(node, typeNode) {
      typeNodeMap.set(node, typeNode);
    },
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
    parseNode(_node) {
      return undefined;
    },
    newNotEmittedStatement(node) {
      return node;
    },
  };
  return ctx;
}

function createStubFactory(): NodeFactory {
  const stub = {} as NodeFactory;
  return stub;
}

function createStubNodeVisitor(_visit: (node: AstNode) => AstNode | undefined): NodeVisitor {
  const noop: NodeVisitor = {
    visitNode(node) { return node; },
    visitNodes(nodes) { return nodes ?? ({} as NodeList); },
    visitEachChild(node) { return node; },
    visitSlice(nodes) { return nodes; },
    visitSourceFile(file) { return file; },
    visitModifiers(modifiers) { return modifiers; },
  };
  return noop;
}
