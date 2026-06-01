/**
 * Transformer pipeline parity helpers.
 *
 * TS-Go's transformer package uses a small set of reusable pipeline rules:
 * lexical environment lifetimes, substitution hooks, emit-notification hooks,
 * helper-request aggregation, and visitor composition. This file ports those
 * mechanics as target-neutral TypeScript utilities so individual transform
 * modules share one contract instead of inventing local state machines.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";

export interface TransformerContext {
  readonly factory?: TransformerFactory;
  readonly lexicalEnvironment: LexicalEnvironment;
  readonly helperRequests: HelperRequestSink;
  readonly substitution: SubstitutionHooks;
  readonly emitNotifications: EmitNotificationHooks;
  readonly diagnostics: DiagnosticSink;
}

export interface TransformerFactory {
  updateNode(node: AstNode, children: readonly AstNode[]): AstNode;
  cloneNode(node: AstNode): AstNode;
}

export interface LexicalEnvironment {
  readonly stack: LexicalFrame[];
  startScope(name: string, node: AstNode | undefined): LexicalFrame;
  endScope(frame: LexicalFrame): readonly HoistedDeclaration[];
  hoistFunction(declaration: AstNode): void;
  hoistVariable(name: string, source: AstNode | undefined): void;
}

export interface LexicalFrame {
  readonly name: string;
  readonly node?: AstNode;
  readonly declarations: HoistedDeclaration[];
}

export interface HoistedDeclaration {
  readonly kind: "function" | "variable";
  readonly name: string;
  readonly node?: AstNode;
}

export interface HelperRequestSink {
  request(name: string, node?: AstNode): void;
  consume(): readonly HelperRequest[];
  has(name: string): boolean;
}

export interface HelperRequest {
  readonly name: string;
  readonly node?: AstNode;
}

export interface SubstitutionHooks {
  enable(kind: number): void;
  isEnabled(kind: number): boolean;
  substitute(kind: number, node: AstNode): AstNode;
  register(kind: number, hook: (node: AstNode) => AstNode): void;
}

export interface EmitNotificationHooks {
  enable(kind: number): void;
  isEnabled(kind: number): boolean;
  onEmit(kind: number, node: AstNode): void;
  register(kind: number, hook: (node: AstNode) => void): void;
}

export interface DiagnosticSink {
  report(node: AstNode | undefined, message: string): void;
}

export interface TransformResult {
  readonly sourceFile: SourceFile;
  readonly helpers: readonly HelperRequest[];
  readonly diagnostics: readonly TransformDiagnostic[];
}

export interface TransformDiagnostic {
  readonly node?: AstNode;
  readonly message: string;
}

export type NodeVisitor = (node: AstNode, context: TransformerContext) => AstNode;
export type SourceFileTransformer = (sourceFile: SourceFile, context: TransformerContext) => SourceFile;

export function transformSourceFile(sourceFile: SourceFile, transformers: readonly SourceFileTransformer[], context = createTransformerContext()): TransformResult {
  let current = sourceFile;
  for (const transformer of transformers) current = transformer(current, context);
  return {
    sourceFile: current,
    helpers: context.helperRequests.consume(),
    diagnostics: (context.diagnostics as CollectingDiagnosticSink).items,
  };
}

export function composeSourceFileTransformers(transformers: readonly SourceFileTransformer[]): SourceFileTransformer {
  return (sourceFile, context) => transformers.reduce((current, transformer) => transformer(current, context), sourceFile);
}

export function composeVisitors(visitors: readonly NodeVisitor[]): NodeVisitor {
  return (node, context) => visitors.reduce((current, visitor) => visitor(current, context), node);
}

export function visitEachChild(node: AstNode, visitor: NodeVisitor, context: TransformerContext): AstNode {
  const children = childNodes(node);
  if (children.length === 0) return visitor(node, context);
  const visitedChildren = children.map(child => visitor(child, context));
  const updated = context.factory?.updateNode(node, visitedChildren) ?? withChildren(node, visitedChildren);
  return visitor(updated, context);
}

export function visitNodes(nodes: readonly AstNode[], visitor: NodeVisitor, context: TransformerContext): readonly AstNode[] {
  const result: AstNode[] = [];
  for (const node of nodes) {
    const visited = visitor(node, context);
    if (!isNodeOmitted(visited)) result.push(visited);
  }
  return result;
}

export function startLexicalEnvironment(context: TransformerContext, name: string, node: AstNode | undefined): LexicalFrame {
  return context.lexicalEnvironment.startScope(name, node);
}

export function endLexicalEnvironment(context: TransformerContext, frame: LexicalFrame): readonly HoistedDeclaration[] {
  return context.lexicalEnvironment.endScope(frame);
}

export function hoistFunctionDeclaration(context: TransformerContext, declaration: AstNode): void {
  context.lexicalEnvironment.hoistFunction(declaration);
}

export function hoistVariableDeclaration(context: TransformerContext, name: string, source: AstNode | undefined): void {
  context.lexicalEnvironment.hoistVariable(name, source);
}

export function requestEmitHelper(context: TransformerContext, helperName: string, node?: AstNode): void {
  context.helperRequests.request(helperName, node);
}

export function enableSubstitution(context: TransformerContext, kind: number): void {
  context.substitution.enable(kind);
}

export function enableEmitNotification(context: TransformerContext, kind: number): void {
  context.emitNotifications.enable(kind);
}

export function substituteNode(context: TransformerContext, kind: number, node: AstNode): AstNode {
  return context.substitution.isEnabled(kind) ? context.substitution.substitute(kind, node) : node;
}

export function notifyEmit(context: TransformerContext, kind: number, node: AstNode): void {
  if (context.emitNotifications.isEnabled(kind)) context.emitNotifications.onEmit(kind, node);
}

export function createTransformerContext(): TransformerContext {
  return {
    factory: defaultTransformerFactory,
    lexicalEnvironment: createLexicalEnvironment(),
    helperRequests: createHelperRequestSink(),
    substitution: createSubstitutionHooks(),
    emitNotifications: createEmitNotificationHooks(),
    diagnostics: new CollectingDiagnosticSink(),
  };
}

export function createLexicalEnvironment(): LexicalEnvironment {
  const stack: LexicalFrame[] = [];
  const current = (): LexicalFrame | undefined => stack[stack.length - 1];
  return {
    stack,
    startScope(name, node) {
      const frame: LexicalFrame = { name, ...(node === undefined ? {} : { node }), declarations: [] };
      stack.push(frame);
      return frame;
    },
    endScope(frame) {
      const popped = stack.pop();
      if (popped !== frame) throw new Error("Lexical environment scope ended out of order.");
      return frame.declarations;
    },
    hoistFunction(declaration) {
      const frame = current();
      if (frame === undefined) return;
      frame.declarations.push({ kind: "function", name: declarationName(declaration), node: declaration });
    },
    hoistVariable(name, source) {
      const frame = current();
      if (frame === undefined) return;
      frame.declarations.push({ kind: "variable", name, ...(source === undefined ? {} : { node: source }) });
    },
  };
}

export function createHelperRequestSink(): HelperRequestSink {
  const requests: HelperRequest[] = [];
  return {
    request(name, node) {
      if (requests.some(request => request.name === name && request.node === node)) return;
      requests.push({ name, ...(node === undefined ? {} : { node }) });
    },
    consume() {
      const copy = [...requests];
      requests.length = 0;
      return copy;
    },
    has(name) {
      return requests.some(request => request.name === name);
    },
  };
}

export function createSubstitutionHooks(): SubstitutionHooks {
  const enabled = new Set<number>();
  const hooks = new Map<number, (node: AstNode) => AstNode>();
  return {
    enable(kind) {
      enabled.add(kind);
    },
    isEnabled(kind) {
      return enabled.has(kind);
    },
    substitute(kind, node) {
      return hooks.get(kind)?.(node) ?? node;
    },
    register(kind, hook) {
      hooks.set(kind, hook);
      enabled.add(kind);
    },
  };
}

export function createEmitNotificationHooks(): EmitNotificationHooks {
  const enabled = new Set<number>();
  const hooks = new Map<number, (node: AstNode) => void>();
  return {
    enable(kind) {
      enabled.add(kind);
    },
    isEnabled(kind) {
      return enabled.has(kind);
    },
    onEmit(kind, node) {
      hooks.get(kind)?.(node);
    },
    register(kind, hook) {
      hooks.set(kind, hook);
      enabled.add(kind);
    },
  };
}

export class CollectingDiagnosticSink implements DiagnosticSink {
  readonly items: TransformDiagnostic[] = [];

  report(node: AstNode | undefined, message: string): void {
    this.items.push({ ...(node === undefined ? {} : { node }), message });
  }
}

export function createScopedVisitor(name: string, visitor: NodeVisitor): NodeVisitor {
  return (node, context) => {
    const frame = startLexicalEnvironment(context, name, node);
    try {
      return visitor(node, context);
    } finally {
      endLexicalEnvironment(context, frame);
    }
  };
}

export function preserveNodeMetadata(original: AstNode, updated: AstNode): AstNode {
  if (original === updated) return updated;
  return {
    ...(updated as object),
    parent: original.parent,
    pos: (original as { readonly pos?: number }).pos,
    end: (original as { readonly end?: number }).end,
  } as AstNode;
}

export function factoryCloneNode(node: AstNode): AstNode {
  return { ...(node as object) } as AstNode;
}

export function factoryUpdateNode(node: AstNode, children: readonly AstNode[]): AstNode {
  return withChildren(node, children);
}

const defaultTransformerFactory: TransformerFactory = {
  updateNode: factoryUpdateNode,
  cloneNode: factoryCloneNode,
};

function childNodes(node: AstNode): readonly AstNode[] {
  const children = (node as { readonly children?: readonly AstNode[] }).children;
  if (children !== undefined) return children;
  const statements = (node as { readonly statements?: readonly AstNode[] }).statements;
  if (statements !== undefined) return statements;
  const members = (node as { readonly members?: readonly AstNode[] }).members;
  if (members !== undefined) return members;
  return [];
}

function withChildren(node: AstNode, children: readonly AstNode[]): AstNode {
  if ("statements" in node) return Object.assign({}, node, { statements: children });
  if ("members" in node) return Object.assign({}, node, { members: children });
  return Object.assign({}, node, { children });
}

function isNodeOmitted(node: AstNode): boolean {
  return Boolean((node as { readonly omitted?: boolean }).omitted);
}

function declarationName(node: AstNode): string {
  const name = (node as { readonly name?: { readonly text?: string; readonly escapedText?: string } }).name;
  return name?.text ?? name?.escapedText ?? "";
}
