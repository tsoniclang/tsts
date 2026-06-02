import type { int } from "@tsonic/core/types.js";
import {
  createElementAccessExpression,
  createExpressionWithTypeArguments,
  createIdentifier,
  createIndexedAccessTypeNode,
  createKeywordTypeNode,
  createLiteralTypeNode,
  cloneNode as cloneAstNode,
  createNodeArray,
  createParenthesizedTypeNode,
  createPropertyAccessExpression,
  createQualifiedName,
  createStringLiteral,
  createTypeQueryNode,
  createTypeReferenceNode,
  Kind,
  NodeFlags,
  SymbolFlags,
  type Expression,
  type KeywordTypeSyntaxKind,
  type Node as AstNode,
  type NodeArray,
  type Symbol as AstSymbol,
  type TypeNode,
} from "../ast/index.js";
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
  mapper?: TypeMapper | undefined;
  reverseMappedStack: AstSymbol[];
  enclosingSymbolTypes: Map<number, Type>;
  suppressReportInferenceFallback: boolean;
  remappedSymbolReferences: Map<number, AstSymbol>;
  typeParameterNames: Map<TypeId, AstNode>;
  typeParameterNamesByText: Set<string>;
  typeParameterNamesByTextNextNameCount: Map<string, number>;
  typeParameterSymbolList: Set<number>;
}

interface NodeBuilderIdentifierCarrier extends AstNode {
  symbol?: AstSymbol;
}

interface SyntheticCommentCarrier extends AstNode {
  syntheticLeadingComments?: readonly SyntheticLeadingComment[];
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
      links = { serializedTypes: new Map<string, SerializedTypeEntry>() };
      this.links.set(node, links);
    }
    return links;
  }

  getSymbolLinks(symbol: AstSymbol): NodeBuilderSymbolLinks {
    let links = this.symbolLinks.get(symbol);
    if (links === undefined) {
      links = { specifierCache: new Map<string, string>() };
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

  isActivelyExpanding(): boolean {
    return this.ctx.maxExpansionDepth > 0 && this.ctx.depth < this.ctx.maxExpansionDepth;
  }

  checkTypeExpandability(type: Type | undefined): void {
    if (type === undefined || this.ctx.maxExpansionDepth < 0 || this.ctx.canIncreaseExpansionDepth) return;
    this.ctx.typeStack.push(type);
    if (type.aliasSymbol !== undefined) this.shouldExpandType(type, true);
    if (!this.ctx.canIncreaseExpansionDepth) this.shouldExpandType(type, false);
    this.ctx.typeStack.pop();
    if (this.ctx.canIncreaseExpansionDepth) return;
    if ((objectFlagsOf(type) & ObjectFlags.Reference) !== 0) {
      for (const argument of typeArgumentsOf(type)) {
        this.checkTypeExpandability(argument);
        if (this.ctx.canIncreaseExpansionDepth) return;
      }
    }
  }

  appendReferenceToType(root: AstNode, ref: AstNode): AstNode {
    const accessStack = getAccessStack(ref);
    if (root.kind === Kind.ImportType) {
      let qualifier = child(root, "qualifier");
      for (const identifier of accessStack) {
        qualifier = qualifier === undefined
          ? identifier
          : createQualifiedName(qualifier as never, identifier as never);
      }
      return {
        ...cloneNode(root),
        qualifier,
        typeArguments: typeArgumentList(ref),
      } as AstNode;
    }
    if (root.kind === Kind.TypeReference) {
      const typeReference = root as { readonly typeName?: AstNode };
      if ((this.ctx.flags & NodeBuilderFlags.UseInstantiationExpressions) !== 0 && typeArgumentList(root) !== undefined) {
        let expression = this.createAccessExpression(typeReference.typeName ?? root);
        expression = createExpressionWithTypeArguments(expression as never, typeArgumentList(root) as never) as unknown as AstNode;
        for (const identifier of accessStack) {
          expression = createPropertyAccessExpression(expression as never, undefined, identifier as never, NodeFlags.None) as unknown as AstNode;
        }
        return expression;
      }
      let typeName = typeReference.typeName ?? root;
      for (const identifier of accessStack) {
        typeName = createQualifiedName(typeName as never, identifier as never);
      }
      return createTypeReferenceNode(typeName as never, typeArgumentList(ref) as never);
    }
    let expression = this.createAccessExpression(root);
    for (const identifier of accessStack) {
      expression = createPropertyAccessExpression(expression as never, undefined, identifier as never, NodeFlags.None) as unknown as AstNode;
    }
    return expression;
  }

  createElidedInformationPlaceholder(): TypeNode {
    this.ctx.approximateLength += 3;
    if ((this.ctx.flags & NodeBuilderFlags.NoTruncation) !== 0) {
      return withSyntheticComment(createKeywordTypeNode(Kind.AnyKeyword), "elided") as TypeNode;
    }
    return createTypeReferenceNode(createIdentifier("..."), undefined);
  }

  mapToTypeNodes(list: readonly Type[], isBareList: boolean): NodeArray<TypeNode> | undefined {
    if (list.length === 0) return undefined;
    if (this.checkTruncationLength()) {
      if (!isBareList) return createNodeArray([this.createElidedInformationPlaceholder()]);
      if (list.length > 2) {
        const first = this.typeToTypeNode(list[0]!);
        const last = this.typeToTypeNode(list[list.length - 1]!);
        const middle = (this.ctx.flags & NodeBuilderFlags.NoTruncation) !== 0
          ? withSyntheticComment(createKeywordTypeNode(Kind.AnyKeyword), `... ${list.length - 2} more elided ...`)
          : createTypeReferenceNode(createIdentifier(`... ${list.length - 2} more ...`), undefined);
        return createNodeArray([first, middle, last].filter(isTypeNode));
      }
    }

    const mayHaveNameCollisions = (this.ctx.flags & NodeBuilderFlags.UseFullyQualifiedType) === 0;
    const seenNames = new Map<string, { type: Type; index: int }[]>();
    const result: TypeNode[] = [];
    for (let index = 0; index < list.length; index += 1) {
      const type = list[index]!;
      const displayIndex = index + 1;
      if (this.checkTruncationLength() && displayIndex + 2 < list.length - 1) {
        const elided = (this.ctx.flags & NodeBuilderFlags.NoTruncation) !== 0
          ? withSyntheticComment(createKeywordTypeNode(Kind.AnyKeyword), `... ${list.length - displayIndex} more elided ...`)
          : createTypeReferenceNode(createIdentifier(`... ${list.length - displayIndex} more ...`), undefined);
        result.push(elided);
        const tail = this.typeToTypeNode(list[list.length - 1]!);
        if (tail !== undefined) result.push(tail);
        break;
      }
      this.ctx.approximateLength += 2;
      const typeNode = this.typeToTypeNode(type);
      if (typeNode === undefined) continue;
      result.push(typeNode);
      if (mayHaveNameCollisions && isIdentifierTypeReference(typeNode)) {
        const name = entityNameText(child(typeNode, "typeName"));
        const bucket = seenNames.get(name) ?? [];
        bucket.push({ type, index: result.length - 1 });
        seenNames.set(name, bucket);
      }
    }

    if (mayHaveNameCollisions) {
      const restoreFlags = this.saveRestoreFlags();
      this.ctx.flags |= NodeBuilderFlags.UseFullyQualifiedType;
      for (const bucket of seenNames.values()) {
        if (arrayIsHomogeneous(bucket, (left, right) => typesAreSameReference(left.type, right.type))) continue;
        for (const entry of bucket) {
          const regenerated = this.typeToTypeNode(entry.type);
          if (regenerated !== undefined) result[entry.index] = regenerated;
        }
      }
      restoreFlags();
    }
    return createNodeArray(result);
  }

  serializeTypeName(node: AstNode, isTypeOf: boolean, typeArguments: NodeArray<TypeNode> | undefined): AstNode | undefined {
    const symbol = nodeSymbol(node);
    if (symbol === undefined) return undefined;
    const resolvedSymbol = resolveAliasSymbol(symbol);
    return this.symbolToTypeNode(resolvedSymbol, isTypeOf ? SymbolFlags.Value : SymbolFlags.Type, typeArguments);
  }

  typeToTypeNode(type: Type | undefined): TypeNode | undefined {
    if (type === undefined) return undefined;
    const primitive = primitiveKeywordKind(type);
    if (primitive !== undefined) return createKeywordTypeNode(primitive);
    if ((type.flags & TypeFlags.StringLiteral) !== 0) {
      return createLiteralTypeNode(createStringLiteral(String(typeValue(type)), 0));
    }
    if ((type.flags & TypeFlags.Union) !== 0 || (type.flags & TypeFlags.Intersection) !== 0) {
      return this.createElidedInformationPlaceholder();
    }
    if ((type.flags & TypeFlags.TypeParameter) !== 0) {
      return createTypeReferenceNode(createIdentifier(typeName(type) || "T"), undefined);
    }
    const name = typeName(type);
    return name.length === 0 ? createKeywordTypeNode(Kind.UnknownKeyword) : createTypeReferenceNode(createIdentifier(name), undefined);
  }

  typeNodeIsEquivalentToType(annotatedDeclaration: AstNode | undefined, type: Type, typeFromTypeNode: Type | undefined): boolean {
    if (typeFromTypeNode === type) return true;
    if (annotatedDeclaration === undefined || typeFromTypeNode === undefined) return false;
    if (!isOptionalDeclaration(annotatedDeclaration)) return false;
    return (type.flags & TypeFlags.Undefined) !== 0 || (typeFromTypeNode.flags & TypeFlags.Undefined) !== 0;
  }

  existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing: AstNode, type: Type): boolean {
    if ((objectFlagsOf(type) & ObjectFlags.Reference) === 0) return true;
    if (existing.kind !== Kind.TypeReference) return true;
    const existingArguments = nodeArray(child(existing, "typeArguments"));
    const minimum = (type.data as { readonly minimumTypeArgumentCount?: number } | undefined)?.minimumTypeArgumentCount ?? 0;
    return existingArguments.length >= minimum;
  }

  tryReuseExistingTypeNode(typeNode: AstNode | undefined, type: Type, host: AstNode | undefined, addUndefined: boolean): TypeNode | undefined {
    if (typeNode === undefined) return undefined;
    const clone = this.tryReuseExistingNonParameterTypeNode(typeNode, type, host, undefined);
    if (clone !== undefined) return clone;
    if (!addUndefined) return undefined;
    const withoutUndefined = removeUndefinedFromType(type);
    return withoutUndefined === type ? undefined : this.tryReuseExistingNonParameterTypeNode(typeNode, withoutUndefined, host, undefined);
  }

  tryReuseExistingNonParameterTypeNode(existing: AstNode | undefined, type: Type, host: AstNode | undefined, annotationType: Type | undefined): TypeNode | undefined {
    if (existing === undefined) return undefined;
    const effectiveHost = host ?? this.ctx.enclosingDeclaration;
    const effectiveAnnotationType = annotationType ?? typeFromTypeNode(existing);
    if (effectiveAnnotationType !== undefined
      && this.typeNodeIsEquivalentToType(effectiveHost, type, effectiveAnnotationType)
      && this.existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing, type)) {
      return cloneNode(existing) as TypeNode;
    }
    return undefined;
  }

  getResolvedTypeWithoutAbstractConstructSignatures(type: Type): Type {
    const constructSignatures = (type.data as { readonly constructSignatures?: readonly { readonly flags?: number }[] } | undefined)?.constructSignatures;
    if (constructSignatures === undefined || constructSignatures.length === 0) return type;
    const concrete = constructSignatures.filter((signature) => (signature.flags ?? 0) === 0);
    if (concrete.length === constructSignatures.length) return type;
    return {
      ...type,
      data: {
        ...(type.data as object | undefined),
        constructSignatures: concrete,
      },
    } as Type;
  }

  symbolToNode(symbol: AstSymbol, meaning: number): AstNode | undefined {
    const declarationName = firstDeclarationName(symbol);
    if ((this.ctx.internalFlags & 1) !== 0 && declarationName?.kind === Kind.ComputedPropertyName) return declarationName;
    return this.symbolToExpression(symbol, meaning);
  }

  symbolToExpression(symbol: AstSymbol, meaning: number): AstNode | undefined {
    const chain = this.lookupSymbolChain(symbol, meaning, false);
    return this.createExpressionFromSymbolChain(chain, chain.length - 1);
  }

  symbolToName(symbol: AstSymbol, meaning: number, expectsIdentifier: boolean): AstNode | undefined {
    const chain = this.lookupSymbolChain(symbol, meaning, false);
    if (expectsIdentifier && chain.length !== 1 && (this.ctx.flags & NodeBuilderFlags.AllowQualifiedNameInPlaceOfIdentifier) === 0) {
      this.ctx.encounteredError = true;
    }
    return this.createEntityNameFromSymbolChain(chain, chain.length - 1);
  }

  createEntityNameFromSymbolChain(chain: readonly AstSymbol[], index: int): AstNode | undefined {
    if (index < 0 || index >= chain.length) return undefined;
    const symbol = chain[index]!;
    const enteringInitial = index === 0;
    if (enteringInitial) this.ctx.flags |= NodeBuilderFlags.InInitialEntityName;
    const identifier = this.newIdentifier(this.getNameOfSymbolAsWritten(symbol), symbol);
    if (enteringInitial) this.ctx.flags &= ~NodeBuilderFlags.InInitialEntityName;
    if (index > 0) {
      const left = this.createEntityNameFromSymbolChain(chain, index - 1);
      return left === undefined ? identifier : createQualifiedName(left as never, identifier as never);
    }
    return identifier;
  }

  symbolToEntityNameNode(symbol: AstSymbol): AstNode {
    const identifier = this.newIdentifier(symbolName(symbol), symbol);
    const parent = symbolParent(symbol);
    return parent === undefined ? identifier : createQualifiedName(this.symbolToEntityNameNode(parent) as never, identifier as never);
  }

  symbolToTypeNode(symbol: AstSymbol, mask: number, typeArguments: NodeArray<TypeNode> | undefined): AstNode | undefined {
    const chain = this.lookupSymbolChain(symbol, mask, (this.ctx.flags & NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope) === 0);
    if (chain.length === 0) return undefined;
    const isTypeOf = mask === SymbolFlags.Value;
    const access = this.createAccessFromSymbolChain(chain, chain.length - 1, 0, typeArguments);
    if (access === undefined) return undefined;
    if (access.kind === Kind.IndexedAccessType) return access;
    if (isEntityName(access)) return isTypeOf
      ? createTypeQueryNode(access as never, undefined)
      : createTypeReferenceNode(access as never, typeArguments);
    if (isTypeOf && access.kind === Kind.ExpressionWithTypeArguments) {
      const expression = child(access, "expression");
      return expression === undefined ? undefined : createTypeQueryNode(expression as never, typeArgumentList(access) as never);
    }
    return access;
  }

  createAccessFromSymbolChain(
    chain: readonly AstSymbol[],
    index: int,
    stopper: number,
    overrideTypeArguments: NodeArray<TypeNode> | undefined,
  ): AstNode | undefined {
    if (index < 0 || index >= chain.length) return undefined;
    const symbol = chain[index]!;
    const parent = index > 0 ? chain[index - 1] : undefined;
    const typeParameterNodes = index === chain.length - 1 ? overrideTypeArguments : this.lookupTypeParameterNodes(chain, index);
    const symbolNameText = this.getNameOfSymbolAsWritten(symbol);
    this.ctx.approximateLength += symbolNameText.length + 1;

    if ((this.ctx.flags & NodeBuilderFlags.ForbidIndexedAccessSymbolReferences) === 0
      && parent !== undefined
      && symbolTableGet(symbolMembers(parent), symbolName(parent)) === symbol) {
      const left = this.createAccessFromSymbolChain(chain, index - 1, stopper, overrideTypeArguments);
      if (left === undefined) return undefined;
      const indexNode = createLiteralTypeNode(createStringLiteral(symbolNameText, 0));
      return left.kind === Kind.IndexedAccessType
        ? createIndexedAccessTypeNode(left as never, indexNode)
        : createIndexedAccessTypeNode(createTypeReferenceNode(left as never, typeParameterNodes as never), indexNode);
    }

    const identifier = this.newIdentifier(symbolNameText, symbol);
    if (index > stopper) {
      const left = this.createAccessFromSymbolChain(chain, index - 1, stopper, overrideTypeArguments);
      if (left === undefined) return identifier;
      if ((this.ctx.flags & NodeBuilderFlags.UseInstantiationExpressions) === 0 || isEntityName(left) && nodeArray(typeParameterNodes).length === 0) {
        return createQualifiedName(left as never, identifier as never);
      }
      return createExpressionWithTypeArguments(
        createPropertyAccessExpression(this.createAccessExpression(left) as never, undefined, identifier as never, NodeFlags.None),
        typeParameterNodes as never,
      );
    }
    return identifier;
  }

  createExpressionFromSymbolChain(chain: readonly AstSymbol[], index: int): AstNode | undefined {
    if (index < 0 || index >= chain.length) return undefined;
    const symbol = chain[index]!;
    const typeParameterNodes = this.lookupExpressionChainTypeArgumentNodes(chain, index);
    let symbolNameText = this.getNameOfSymbolAsWritten(symbol);
    if (startsWithSingleOrDoubleQuote(symbolNameText) && hasExternalModuleDeclaration(symbol)) {
      return createStringLiteral(unquote(symbolNameText), 0);
    }
    if (index === 0 || canUsePropertyAccess(symbolNameText)) {
      const identifier = this.newIdentifier(symbolNameText, symbol);
      this.ctx.approximateLength += symbolNameText.length + 1;
      if (index === 0) return createExpressionWithTypeArguments(identifier as never, typeParameterNodes as never);
      const left = this.createExpressionFromSymbolChain(chain, index - 1);
      if (left === undefined) return identifier;
      return createExpressionWithTypeArguments(
        createPropertyAccessExpression(left as never, undefined, identifier as never, NodeFlags.None),
        typeParameterNodes as never,
      );
    }
    if (startsWithSquareBracket(symbolNameText)) symbolNameText = symbolNameText.slice(1, -1);
    const expression = startsWithSingleOrDoubleQuote(symbolNameText)
      ? createStringLiteral(unquote(symbolNameText), 0)
      : createStringLiteral(symbolNameText, 0);
    const left = this.createExpressionFromSymbolChain(chain, index - 1);
    if (left === undefined) return expression;
    this.ctx.approximateLength += symbolNameText.length + 2;
    return createExpressionWithTypeArguments(
      createElementAccessExpression(left as never, undefined, expression as never, NodeFlags.None),
      typeParameterNodes as never,
    );
  }

  createAccessExpression(node: AstNode): AstNode {
    if (node.kind === Kind.TypeReference) {
      return (node as { readonly typeName?: AstNode }).typeName ?? node;
    }
    if (node.kind === Kind.TypeQuery) {
      return (node as { readonly exprName?: AstNode }).exprName ?? node;
    }
    return node;
  }

  getNameOfSymbolFromNameType(symbol: AstSymbol): string {
    const nameType = (symbol as { readonly nameType?: Type }).nameType
      ?? (symbol as { readonly links?: { readonly nameType?: Type } }).links?.nameType;
    if (nameType === undefined) return "";
    const value = typeValue(nameType);
    if (typeof value === "string" || typeof value === "number") {
      const text = String(value);
      return canUsePropertyAccess(text) || isNumericLiteralName(text) ? text : JSON.stringify(text);
    }
    if ((nameType.flags & TypeFlags.UniqueESSymbol) !== 0 && nameType.symbol !== undefined) {
      return `[${this.getNameOfSymbolAsWritten(nameType.symbol)}]`;
    }
    return "";
  }

  getNameOfSymbolAsWritten(symbol: AstSymbol): string {
    const remapped = this.ctx.remappedSymbolReferences.get(getSymbolId(symbol));
    const actual = remapped ?? symbol;
    if (symbolName(actual) === "default"
      && (this.ctx.flags & NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope) === 0
      && ((this.ctx.flags & NodeBuilderFlags.InInitialEntityName) === 0 || declarationsOf(actual).length === 0)) {
      return "default";
    }
    const declarationName = firstDeclarationName(actual);
    if (declarationName !== undefined) return declarationNameToString(declarationName);
    const nameFromType = this.getNameOfSymbolFromNameType(actual);
    if (nameFromType.length > 0) return nameFromType;
    return symbolName(actual) || "__missing";
  }

  getTypeParametersOfClassOrInterface(symbol: AstSymbol): readonly Type[] {
    const declared = (symbol as { readonly declaredType?: Type }).declaredType ?? getSymbolType(symbol);
    const data = declared?.data as { readonly outerTypeParameters?: readonly Type[]; readonly localTypeParameters?: readonly Type[]; readonly typeParameters?: readonly Type[] } | undefined;
    return [
      ...(data?.outerTypeParameters ?? []),
      ...(data?.localTypeParameters ?? data?.typeParameters ?? []),
    ];
  }

  lookupTypeParameterNodes(chain: readonly AstSymbol[], index: int): NodeArray<TypeNode> | undefined {
    const symbol = chain[index];
    if (symbol === undefined) return undefined;
    const nodes = this.getTypeParametersOfClassOrInterface(symbol)
      .map((type) => this.typeToTypeNode(type))
      .filter(isTypeNode);
    return nodes.length === 0 ? undefined : createNodeArray(nodes);
  }

  lookupExpressionChainTypeArgumentNodes(chain: readonly AstSymbol[], index: int): NodeArray<TypeNode> | undefined {
    return this.lookupTypeParameterNodes(chain, index);
  }

  lookupSymbolChain(symbol: AstSymbol, meaning: number, useOnlyExternalAliasing: boolean): readonly AstSymbol[] {
    void meaning; void useOnlyExternalAliasing;
    const chain: AstSymbol[] = [];
    const seen = new Set<AstSymbol>();
    let current: AstSymbol | undefined = symbol;
    while (current !== undefined && !seen.has(current)) {
      seen.add(current);
      chain.unshift(current);
      current = symbolParent(current);
    }
    return chain.length === 0 ? [symbol] : chain;
  }

  newIdentifier(text: string, symbol?: AstSymbol): AstNode {
    const identifier = createIdentifier(text.length === 0 ? "__missing" : text) as NodeBuilderIdentifierCarrier;
    if (symbol !== undefined) {
      identifier.symbol = symbol;
      this.associateIdentifierWithSymbol(identifier, symbol);
    }
    return identifier;
  }
}

export function newNodeBuilderImpl(
  ctx: NodeBuilderImplContext = createNodeBuilderContext(undefined, NodeBuilderFlags.None),
  host?: NodeBuilderImplHost,
): NodeBuilderImpl {
  return new NodeBuilderImpl(ctx, host);
}

export function getAccessStack(ref: AstNode): readonly AstNode[] {
  let state = ref.kind === Kind.TypeReference ? child(ref, "typeName") : ref;
  const ids: AstNode[] = [];
  while (state !== undefined && state.kind !== Kind.Identifier) {
    const right = child(state, "right") ?? child(state, "name");
    if (right !== undefined) ids.unshift(right);
    state = child(state, "left") ?? child(state, "expression");
  }
  if (state !== undefined) ids.unshift(state);
  return ids;
}

export function isClassInstanceSide(type: Type): boolean {
  return type.symbol !== undefined
    && ((type.symbol.flags ?? 0) & SymbolFlags.Class) !== 0
    && ((objectFlagsOf(type) & ObjectFlags.IsClassInstanceClone) !== 0 || type.symbol === type.symbol.exportSymbol);
}

export function isIdentifierTypeReference(node: AstNode | undefined): boolean {
  return node?.kind === Kind.TypeReference && child(node, "typeName")?.kind === Kind.Identifier;
}

export function arrayIsHomogeneous<T>(array: readonly T[], comparer: (left: T, right: T) => boolean): boolean {
  if (array.length < 2) return true;
  const first = array[0]!;
  for (let index = 1; index < array.length; index += 1) {
    if (!comparer(first, array[index]!)) return false;
  }
  return true;
}

export function typesAreSameReference(left: Type, right: Type): boolean {
  return left === right
    || left.symbol !== undefined && left.symbol === right.symbol
    || left.aliasSymbol !== undefined && left.aliasSymbol === right.aliasSymbol;
}

export function getTopmostIndexedAccessType(node: AstNode): AstNode {
  const objectType = child(node, "objectType");
  return objectType?.kind === Kind.IndexedAccessType ? getTopmostIndexedAccessType(objectType) : node;
}

export function canUsePropertyAccess(name: string): boolean {
  if (name.length === 0) return false;
  const text = name.startsWith("#") ? name.slice(1) : name;
  return /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(text);
}

export function startsWithSingleOrDoubleQuote(text: string): boolean {
  return text.startsWith("'") || text.startsWith("\"");
}

export function startsWithSquareBracket(text: string): boolean {
  return text.startsWith("[");
}

export function isDefaultBindingContext(location: AstNode | undefined): boolean {
  return location?.kind === Kind.SourceFile || location?.kind === Kind.ModuleDeclaration;
}

function objectFlagsOf(type: Type): number {
  const data = type.data as { readonly objectFlags?: number } | undefined;
  return data?.objectFlags ?? 0;
}

function primitiveKeywordKind(type: Type): KeywordTypeSyntaxKind | undefined {
  if ((type.flags & TypeFlags.Any) !== 0) return Kind.AnyKeyword;
  if ((type.flags & TypeFlags.Unknown) !== 0) return Kind.UnknownKeyword;
  if ((type.flags & TypeFlags.String) !== 0) return Kind.StringKeyword;
  if ((type.flags & TypeFlags.Number) !== 0) return Kind.NumberKeyword;
  if ((type.flags & TypeFlags.BigInt) !== 0) return Kind.BigIntKeyword;
  if ((type.flags & TypeFlags.Boolean) !== 0) return Kind.BooleanKeyword;
  if ((type.flags & TypeFlags.ESSymbol) !== 0) return Kind.SymbolKeyword;
  if ((type.flags & TypeFlags.Void) !== 0) return Kind.VoidKeyword;
  if ((type.flags & TypeFlags.Undefined) !== 0) return Kind.UndefinedKeyword;
  if ((type.flags & TypeFlags.Never) !== 0) return Kind.NeverKeyword;
  if ((type.flags & TypeFlags.NonPrimitive) !== 0) return Kind.ObjectKeyword;
  return undefined;
}

function typeArgumentsOf(type: Type): readonly Type[] {
  return type.aliasTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments?: readonly Type[]; readonly typeArguments?: readonly Type[] } | undefined)?.resolvedTypeArguments
    ?? (type.data as { readonly resolvedTypeArguments_?: readonly Type[] } | undefined)?.resolvedTypeArguments_
    ?? (type.data as { readonly typeArguments?: readonly Type[] } | undefined)?.typeArguments
    ?? [];
}

function typeName(type: Type): string {
  return symbolName(type.aliasSymbol) || symbolName(type.symbol) || ((type.data as { readonly intrinsicName?: string } | undefined)?.intrinsicName ?? "");
}

function typeValue(type: Type): unknown {
  return (type.data as { readonly value?: unknown } | undefined)?.value;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function symbolParent(symbol: AstSymbol | undefined): AstSymbol | undefined {
  return (symbol as { readonly parent?: AstSymbol } | undefined)?.parent;
}

function symbolMembers(symbol: AstSymbol | undefined): Map<string, AstSymbol> | undefined {
  return (symbol as { readonly members?: Map<string, AstSymbol> } | undefined)?.members;
}

function symbolTableGet(table: Map<string, AstSymbol> | undefined, key: string): AstSymbol | undefined {
  return table?.get(key);
}

function declarationsOf(symbol: AstSymbol | undefined): readonly AstNode[] {
  return symbol?.declarations ?? [];
}

function firstDeclarationName(symbol: AstSymbol | undefined): AstNode | undefined {
  for (const declaration of declarationsOf(symbol)) {
    const name = child(declaration, "name");
    if (name !== undefined) return name;
  }
  return undefined;
}

function declarationNameToString(node: AstNode): string {
  if (node.kind === Kind.ComputedPropertyName) {
    const expression = child(node, "expression");
    return expression === undefined ? "" : `[${declarationNameToString(expression)}]`;
  }
  return (node as { readonly text?: string; readonly escapedText?: string }).text
    ?? (node as { readonly escapedText?: string }).escapedText
    ?? "";
}

function child(node: AstNode | undefined, key: string): AstNode | undefined {
  const value = (node as unknown as Record<string, unknown> | undefined)?.[key];
  return isAstNode(value) ? value : undefined;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isAstNode);
  if (typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes)) {
    return (value as { readonly nodes: readonly unknown[] }).nodes.filter(isAstNode);
  }
  return [];
}

function typeArgumentList(node: AstNode | undefined): NodeArray<TypeNode> | undefined {
  const value = (node as unknown as { readonly typeArguments?: unknown } | undefined)?.typeArguments;
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return createNodeArray(value.filter(isTypeNode));
  if (typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes)) {
    return value as NodeArray<TypeNode>;
  }
  return undefined;
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function isTypeNode(value: AstNode | undefined): value is TypeNode {
  return value !== undefined;
}

function isEntityName(node: AstNode): boolean {
  return node.kind === Kind.Identifier || node.kind === Kind.QualifiedName;
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol; readonly localSymbol?: AstSymbol } | undefined)?.symbol
    ?? (node as { readonly symbol?: AstSymbol; readonly localSymbol?: AstSymbol } | undefined)?.localSymbol;
}

function resolveAliasSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).aliasTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).target
    ?? symbol.exportSymbol
    ?? symbol;
}

function getSymbolType(symbol: AstSymbol): Type | undefined {
  return (symbol as { readonly type?: Type; readonly declaredType?: Type }).type
    ?? (symbol as { readonly type?: Type; readonly declaredType?: Type }).declaredType;
}

function cloneNode<T extends AstNode>(node: T): T {
  return cloneAstNode(node) as T;
}

function withSyntheticComment<T extends AstNode>(node: T, comment: string): T {
  const clone = cloneAstNode(node);
  const carrier = clone as SyntheticCommentCarrier;
  carrier.syntheticLeadingComments = [{ kind: Kind.MultiLineCommentTrivia, text: comment, hasTrailingNewLine: false }];
  return clone as T;
}

interface SyntheticLeadingComment {
  readonly kind: Kind;
  readonly text: string;
  readonly hasTrailingNewLine: boolean;
}

function isOptionalDeclaration(node: AstNode): boolean {
  return child(node, "questionToken") !== undefined || ((node.symbol?.flags ?? 0) & SymbolFlags.Optional) !== 0;
}

function typeFromTypeNode(node: AstNode): Type | undefined {
  return (node as { readonly resolvedType?: Type; readonly type?: Type }).resolvedType
    ?? (node as { readonly resolvedType?: Type; readonly type?: Type }).type;
}

function removeUndefinedFromType(type: Type): Type {
  const types = (type.data as { readonly types?: readonly Type[] } | undefined)?.types;
  if (types === undefined) return type;
  const filtered = types.filter((candidate) => (candidate.flags & TypeFlags.Undefined) === 0);
  return filtered.length === types.length ? type : { ...type, data: { ...(type.data as object | undefined), types: filtered } } as Type;
}

function hasExternalModuleDeclaration(symbol: AstSymbol): boolean {
  return declarationsOf(symbol).some((declaration) => declaration.kind === Kind.SourceFile || child(declaration, "moduleSpecifier") !== undefined);
}

function entityNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const direct = declarationNameToString(node);
  if (direct.length > 0) return direct;
  const left = entityNameText(child(node, "left") ?? child(node, "expression"));
  const right = entityNameText(child(node, "right") ?? child(node, "name"));
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function isNumericLiteralName(text: string): boolean {
  return /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(text);
}

function unquote(text: string): string {
  if (startsWithSingleOrDoubleQuote(text) && text.length >= 2) return text.slice(1, -1);
  return text;
}
