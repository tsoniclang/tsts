import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { getNodeId } from "../ast/ids.js";
import { NodeBuilderFlags, type NodeBuilderContext } from "./nodeBuilder.js";
import type { SymbolTracker } from "./symbolTracker.js";
import { ObjectFlags, TypeFlags, type Type, type TypeId, type TypeMapper } from "./types.js";

export interface CompositeSymbolIdentity {
  readonly isConstructorNode: boolean;
  readonly symbolId: number;
  readonly nodeId: number;
}

export interface TrackedSymbolArgs {
  readonly symbol: AstSymbol;
  readonly enclosingDeclaration: AstNode | undefined;
  readonly meaning: number;
}

export interface SerializedTypeEntry {
  readonly node: AstNode;
  readonly truncating: boolean;
  readonly addedLength: number;
  readonly trackedSymbols: readonly TrackedSymbolArgs[];
}

export interface CompositeTypeCacheIdentity {
  readonly typeId: TypeId;
  readonly flags: NodeBuilderFlags;
  readonly internalFlags: number;
}

export interface NodeBuilderLinks {
  readonly serializedTypes: Map<string, SerializedTypeEntry>;
  fakeScopeForSignatureDeclaration?: string;
}

export interface NodeBuilderSymbolLinks {
  readonly specifierCache: Map<string, string>;
}

export interface NodeBuilderImplHost {
  readonly isLibTypeForHoverVerbosity?: (type: Type) => boolean;
  readonly isLibSymbolForHoverVerbosity?: (symbol: AstSymbol) => boolean;
}

export interface NodeBuilderImplOptions {
  readonly host?: NodeBuilderImplHost;
  readonly tracker?: SymbolTracker;
  readonly maxTruncationLength?: number;
  readonly maxExpansionDepth?: number;
}

export interface NodeBuilderImplContext extends NodeBuilderContext {
  maxTruncationLength: number;
  encounteredError: boolean;
  truncating: boolean;
  reportedDiagnostic: boolean;
  internalFlags: number;
  depth: number;
  maxExpansionDepth: number;
  typeStack: Type[];
  canIncreaseExpansionDepth: boolean;
  expansionTruncated: boolean;
  enclosingFile?: AstNode;
  visitedTypes: Set<TypeId>;
  symbolDepth: Map<string, number>;
  trackedSymbols: TrackedSymbolArgs[];
  mapper?: TypeMapper;
  reverseMappedStack: AstSymbol[];
  enclosingSymbolTypes: Map<number, Type>;
  suppressReportInferenceFallback: boolean;
  remappedSymbolReferences: Map<number, AstSymbol>;
  typeParameterNames: Map<TypeId, AstNode>;
  typeParameterNamesByText: Set<string>;
  typeParameterNamesByTextNextNameCount: Map<string, number>;
  typeParameterSymbolList: Set<number>;
}

export const defaultMaximumTruncationLength = 160;
export const noTruncationMaximumTruncationLength = 1_000_000;

const symbolIds = new WeakMap<AstSymbol, number>();
let nextSymbolId = 1;

export function getSymbolId(symbol: AstSymbol): number {
  const existing = symbolIds.get(symbol);
  if (existing !== undefined) return existing;
  const id = nextSymbolId;
  nextSymbolId += 1;
  symbolIds.set(symbol, id);
  return id;
}

export function compositeSymbolIdentity(
  symbol: AstSymbol,
  enclosingDeclaration: AstNode | undefined,
  isConstructorNode: boolean,
): CompositeSymbolIdentity {
  return {
    isConstructorNode,
    symbolId: getSymbolId(symbol),
    nodeId: enclosingDeclaration === undefined ? 0 : getNodeId(enclosingDeclaration as { id?: number }),
  };
}

export function compositeTypeCacheKey(identity: CompositeTypeCacheIdentity): string {
  return `${identity.typeId}:${identity.flags}:${identity.internalFlags}`;
}

export function compositeSymbolKey(identity: CompositeSymbolIdentity): string {
  return `${identity.isConstructorNode ? 1 : 0}:${identity.symbolId}:${identity.nodeId}`;
}

export function createNodeBuilderContext(
  enclosingDeclaration: AstNode | undefined,
  flags: NodeBuilderFlags,
  options: NodeBuilderImplOptions = {},
): NodeBuilderImplContext {
  const context: NodeBuilderImplContext = {
    enclosingDeclaration,
    flags,
    approximateLength: 0,
    maxTruncationLength: options.maxTruncationLength ?? defaultMaximumTruncationLength,
    encounteredError: false,
    truncating: false,
    reportedDiagnostic: false,
    internalFlags: 0,
    depth: 0,
    maxExpansionDepth: options.maxExpansionDepth ?? -1,
    typeStack: [],
    canIncreaseExpansionDepth: false,
    expansionTruncated: false,
    inferTypeParameters: [],
    visitedTypes: new Set(),
    symbolDepth: new Map(),
    trackedSymbols: [],
    reverseMappedStack: [],
    enclosingSymbolTypes: new Map(),
    suppressReportInferenceFallback: false,
    remappedSymbolReferences: new Map(),
    typeParameterNames: new Map(),
    typeParameterNamesByText: new Set(),
    typeParameterNamesByTextNextNameCount: new Map(),
    typeParameterSymbolList: new Set(),
  };
  if (options.tracker !== undefined) context.tracker = options.tracker;
  return context;
}

export class NodeBuilderImpl {
  readonly host: NodeBuilderImplHost | undefined;
  readonly links = new WeakMap<AstNode, NodeBuilderLinks>();
  readonly symbolLinks = new WeakMap<AstSymbol, NodeBuilderSymbolLinks>();
  readonly idToSymbol = new WeakMap<AstNode, AstSymbol>();
  ctx: NodeBuilderImplContext;

  constructor(ctx: NodeBuilderImplContext, host?: NodeBuilderImplHost) {
    this.ctx = ctx;
    this.host = host;
  }

  saveRestoreFlags(): () => void {
    const flags = this.ctx.flags;
    const internalFlags = this.ctx.internalFlags;
    const depth = this.ctx.depth;
    return () => {
      this.ctx.flags = flags;
      this.ctx.internalFlags = internalFlags;
      this.ctx.depth = depth;
    };
  }

  checkTruncationLength(): boolean {
    if (this.ctx.truncating) return true;
    const maxLength = (this.ctx.flags & NodeBuilderFlags.NoTruncation) !== 0
      ? noTruncationMaximumTruncationLength
      : this.ctx.maxTruncationLength > 0
        ? this.ctx.maxTruncationLength
        : defaultMaximumTruncationLength;
    this.ctx.truncating = this.ctx.approximateLength > maxLength;
    return this.ctx.truncating;
  }

  checkTruncationLengthIfExpanding(): boolean {
    if (this.ctx.maxExpansionDepth >= 0 && this.checkTruncationLength()) {
      this.ctx.expansionTruncated = true;
      return true;
    }
    return false;
  }

  isExpandableType(type: Type, isAlias: boolean): boolean {
    if (isAlias) {
      const aliasSymbol = type.aliasSymbol;
      return aliasSymbol === undefined || this.host?.isLibSymbolForHoverVerbosity?.(aliasSymbol) !== true;
    }
    if (this.host?.isLibTypeForHoverVerbosity?.(type) === true) return false;
    const objectFlags = objectFlagsOf(type);
    if ((type.flags & TypeFlags.EnumLike) !== 0) return true;
    if ((objectFlags & ObjectFlags.Reference) !== 0) return true;
    if ((objectFlags & ObjectFlags.ClassOrInterface) !== 0) return true;
    if ((objectFlags & ObjectFlags.Anonymous) !== 0 && type.symbol !== undefined) return true;
    return false;
  }

  isTypeOnStack(type: Type): boolean {
    for (let index = 0; index < this.ctx.typeStack.length - 1; index += 1) {
      if (this.ctx.typeStack[index] === type) return true;
    }
    return false;
  }

  shouldExpandType(type: Type, isAlias: boolean): boolean {
    if (this.ctx.maxExpansionDepth < 0) return false;
    if (!this.isExpandableType(type, isAlias)) return false;
    if (this.isTypeOnStack(type)) return false;
    if (this.ctx.depth < this.ctx.maxExpansionDepth) return true;
    this.ctx.canIncreaseExpansionDepth = true;
    return false;
  }

  getLinks(node: AstNode): NodeBuilderLinks {
    let links = this.links.get(node);
    if (links === undefined) {
      links = { serializedTypes: new Map() };
      this.links.set(node, links);
    }
    return links;
  }

  getSymbolLinks(symbol: AstSymbol): NodeBuilderSymbolLinks {
    let links = this.symbolLinks.get(symbol);
    if (links === undefined) {
      links = { specifierCache: new Map() };
      this.symbolLinks.set(symbol, links);
    }
    return links;
  }

  trackSymbol(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined, meaning: number): void {
    const args = { symbol, enclosingDeclaration, meaning };
    this.ctx.trackedSymbols.push(args);
    this.ctx.tracker?.trackSymbol?.(symbol, enclosingDeclaration, meaning);
  }

  associateIdentifierWithSymbol(identifier: AstNode, symbol: AstSymbol): void {
    this.idToSymbol.set(identifier, symbol);
  }

  symbolForIdentifier(identifier: AstNode): AstSymbol | undefined {
    return this.idToSymbol.get(identifier);
  }
}

function objectFlagsOf(type: Type): number {
  const data = type.data as { readonly objectFlags?: number } | undefined;
  return data?.objectFlags ?? 0;
}
