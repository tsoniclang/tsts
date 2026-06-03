import type { Node, Symbol, SymbolTable } from "../ast/index.js";
import {
  Kind,
  nodeInitializer,
  nodeLocals,
  nodeParent,
  setNodeLocals,
  setNodeNextContainer,
} from "../ast/index.js";

export type BinderContainerFlags = number;
export const BinderContainerFlags = {
  None: 0,
  IsContainer: 1 << 0,
  IsBlockScopedContainer: 1 << 1,
  IsControlFlowContainer: 1 << 2,
  IsFunctionLike: 1 << 3,
  IsFunctionExpression: 1 << 4,
  HasLocals: 1 << 5,
  IsInterface: 1 << 6,
  IsObjectLiteralOrClassExpressionMethodOrAccessor: 1 << 7,
  IsThisContainer: 1 << 8,
  PropagatesThisKeyword: 1 << 9,
} as const;

export interface BinderContainerState {
  readonly container: Node | undefined;
  readonly thisContainer: Node | undefined;
  readonly blockScopeContainer: Node | undefined;
  readonly lastContainer: Node | undefined;
}

export interface BinderContainerTransition {
  readonly previous: BinderContainerState;
  readonly next: BinderContainerState;
  readonly createdLocals: boolean;
}

export function getBinderContainerFlags(node: Node): BinderContainerFlags {
  switch (node.kind) {
    case Kind.ClassExpression:
    case Kind.ClassDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ObjectLiteralExpression:
    case Kind.TypeLiteral:
    case Kind.JsxAttributes:
      return BinderContainerFlags.IsContainer;
    case Kind.InterfaceDeclaration:
      return BinderContainerFlags.IsContainer | BinderContainerFlags.IsInterface;
    case Kind.ModuleDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.MappedType:
    case Kind.IndexSignature:
      return BinderContainerFlags.IsContainer | BinderContainerFlags.HasLocals;
    case Kind.SourceFile:
      return BinderContainerFlags.IsContainer | BinderContainerFlags.IsControlFlowContainer | BinderContainerFlags.HasLocals;
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.MethodDeclaration:
      if (isObjectLiteralOrClassExpressionMethodOrAccessorContainer(node)) {
        return BinderContainerFlags.IsContainer |
          BinderContainerFlags.IsControlFlowContainer |
          BinderContainerFlags.HasLocals |
          BinderContainerFlags.IsFunctionLike |
          BinderContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor |
          BinderContainerFlags.IsThisContainer;
      }
      return BinderContainerFlags.IsContainer |
        BinderContainerFlags.IsControlFlowContainer |
        BinderContainerFlags.HasLocals |
        BinderContainerFlags.IsFunctionLike |
        BinderContainerFlags.IsThisContainer;
    case Kind.Constructor:
    case Kind.FunctionDeclaration:
    case Kind.ClassStaticBlockDeclaration:
      return BinderContainerFlags.IsContainer |
        BinderContainerFlags.IsControlFlowContainer |
        BinderContainerFlags.HasLocals |
        BinderContainerFlags.IsFunctionLike |
        BinderContainerFlags.IsThisContainer;
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.FunctionType:
    case Kind.ConstructSignature:
    case Kind.ConstructorType:
      return BinderContainerFlags.IsContainer |
        BinderContainerFlags.IsControlFlowContainer |
        BinderContainerFlags.HasLocals |
        BinderContainerFlags.IsFunctionLike |
        BinderContainerFlags.PropagatesThisKeyword;
    case Kind.FunctionExpression:
      return BinderContainerFlags.IsContainer |
        BinderContainerFlags.IsControlFlowContainer |
        BinderContainerFlags.HasLocals |
        BinderContainerFlags.IsFunctionLike |
        BinderContainerFlags.IsFunctionExpression |
        BinderContainerFlags.IsThisContainer;
    case Kind.ArrowFunction:
      return BinderContainerFlags.IsContainer |
        BinderContainerFlags.IsControlFlowContainer |
        BinderContainerFlags.HasLocals |
        BinderContainerFlags.IsFunctionLike |
        BinderContainerFlags.IsFunctionExpression |
        BinderContainerFlags.PropagatesThisKeyword;
    case Kind.ModuleBlock:
      return BinderContainerFlags.IsControlFlowContainer;
    case Kind.PropertyDeclaration:
      return nodeInitializer(node) !== undefined
        ? BinderContainerFlags.IsControlFlowContainer | BinderContainerFlags.IsThisContainer
        : BinderContainerFlags.None;
    case Kind.CatchClause:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.CaseBlock:
      return BinderContainerFlags.IsBlockScopedContainer | BinderContainerFlags.HasLocals;
    case Kind.Block:
      return blockIsFunctionBody(node)
        ? BinderContainerFlags.None
        : BinderContainerFlags.IsBlockScopedContainer | BinderContainerFlags.HasLocals;
  }
  return BinderContainerFlags.None;
}

export function enterBinderContainer(
  state: BinderContainerState,
  node: Node,
  flags: BinderContainerFlags,
): BinderContainerTransition {
  let container = state.container;
  let thisContainer = state.thisContainer;
  let blockScopeContainer = state.blockScopeContainer;
  let lastContainer = state.lastContainer;
  let createdLocals = false;
  if ((flags & BinderContainerFlags.IsContainer) !== 0) {
    container = node;
    blockScopeContainer = node;
    if ((flags & BinderContainerFlags.HasLocals) !== 0) {
      ensureLocals(node);
      createdLocals = true;
      if (lastContainer !== undefined) setNodeNextContainer(lastContainer, node);
      lastContainer = node;
    }
  } else if ((flags & BinderContainerFlags.IsBlockScopedContainer) !== 0) {
    blockScopeContainer = node;
    if (lastContainer !== undefined) setNodeNextContainer(lastContainer, node);
    lastContainer = node;
  }
  if ((flags & BinderContainerFlags.IsThisContainer) !== 0) thisContainer = node;
  return {
    previous: state,
    next: { container, thisContainer, blockScopeContainer, lastContainer },
    createdLocals,
  };
}

export function restoreBinderContainer(transition: BinderContainerTransition): BinderContainerState {
  return transition.previous;
}

export function ensureLocals(node: Node): SymbolTable {
  const locals = nodeLocals(node);
  if (locals !== undefined) return locals;
  const created = new Map<string, Symbol>();
  setNodeLocals(node, created);
  return created;
}

export function isLocalsContainerNode(node: Node): boolean {
  return (getBinderContainerFlags(node) & BinderContainerFlags.HasLocals) !== 0;
}

export function isControlFlowContainerNode(node: Node): boolean {
  return (getBinderContainerFlags(node) & BinderContainerFlags.IsControlFlowContainer) !== 0;
}

export function isFunctionLikeContainerNode(node: Node): boolean {
  return (getBinderContainerFlags(node) & BinderContainerFlags.IsFunctionLike) !== 0;
}

export function isThisContainerNode(node: Node): boolean {
  return (getBinderContainerFlags(node) & BinderContainerFlags.IsThisContainer) !== 0;
}

export function isBlockScopedContainerNode(node: Node): boolean {
  return (getBinderContainerFlags(node) & BinderContainerFlags.IsBlockScopedContainer) !== 0;
}

export function containerFlagNames(flags: BinderContainerFlags): readonly string[] {
  const names: string[] = [];
  if ((flags & BinderContainerFlags.IsContainer) !== 0) names.push("IsContainer");
  if ((flags & BinderContainerFlags.IsBlockScopedContainer) !== 0) names.push("IsBlockScopedContainer");
  if ((flags & BinderContainerFlags.IsControlFlowContainer) !== 0) names.push("IsControlFlowContainer");
  if ((flags & BinderContainerFlags.IsFunctionLike) !== 0) names.push("IsFunctionLike");
  if ((flags & BinderContainerFlags.IsFunctionExpression) !== 0) names.push("IsFunctionExpression");
  if ((flags & BinderContainerFlags.HasLocals) !== 0) names.push("HasLocals");
  if ((flags & BinderContainerFlags.IsInterface) !== 0) names.push("IsInterface");
  if ((flags & BinderContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor) !== 0) names.push("IsObjectLiteralOrClassExpressionMethodOrAccessor");
  if ((flags & BinderContainerFlags.IsThisContainer) !== 0) names.push("IsThisContainer");
  if ((flags & BinderContainerFlags.PropagatesThisKeyword) !== 0) names.push("PropagatesThisKeyword");
  return names;
}

export function describeContainerTransition(transition: BinderContainerTransition): string {
  const previous = transition.previous.container?.kind ?? Kind.Unknown;
  const next = transition.next.container?.kind ?? Kind.Unknown;
  const block = transition.next.blockScopeContainer?.kind ?? Kind.Unknown;
  const thisContainer = transition.next.thisContainer?.kind ?? Kind.Unknown;
  return `container ${previous}->${next}; block=${block}; this=${thisContainer}; locals=${transition.createdLocals ? "created" : "unchanged"}`;
}

export function walkContainerChain(first: Node | undefined): readonly Node[] {
  const result: Node[] = [];
  let current = first;
  while (current !== undefined) {
    result.push(current);
    current = current.nextContainer;
  }
  return result;
}

export function closestContainer(node: Node | undefined): Node | undefined {
  let current = node;
  while (current !== undefined) {
    if ((getBinderContainerFlags(current) & BinderContainerFlags.IsContainer) !== 0) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function closestBlockScopeContainer(node: Node | undefined): Node | undefined {
  let current = node;
  while (current !== undefined) {
    if ((getBinderContainerFlags(current) & (BinderContainerFlags.IsBlockScopedContainer | BinderContainerFlags.IsContainer)) !== 0) {
      return current;
    }
    current = nodeParent(current);
  }
  return undefined;
}

function blockIsFunctionBody(node: Node): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  return parent.kind === Kind.FunctionDeclaration ||
    parent.kind === Kind.FunctionExpression ||
    parent.kind === Kind.ArrowFunction ||
    parent.kind === Kind.MethodDeclaration ||
    parent.kind === Kind.Constructor ||
    parent.kind === Kind.GetAccessor ||
    parent.kind === Kind.SetAccessor ||
    parent.kind === Kind.ClassStaticBlockDeclaration;
}

function isObjectLiteralOrClassExpressionMethodOrAccessorContainer(node: Node): boolean {
  const parent = nodeParent(node);
  return parent !== undefined && (parent.kind === Kind.ObjectLiteralExpression || parent.kind === Kind.ClassExpression);
}
