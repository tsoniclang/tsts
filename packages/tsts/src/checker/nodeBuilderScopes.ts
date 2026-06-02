import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { getSymbolId, type NodeBuilderImplContext } from "./nodeBuilderImpl.js";
import type { Type, TypeMapper } from "./types.js";

export interface NodeBuilderScopeFrame {
  readonly declaration: AstNode | undefined;
  readonly mapper: TypeMapper | undefined;
  readonly parameterNames: readonly string[];
  readonly typeParameterNames: readonly string[];
}

export class NodeBuilderScopes {
  private readonly scopes: NodeBuilderScopeFrame[] = [];

  enterScope(frame: NodeBuilderScopeFrame): () => void {
    this.scopes.push(frame);
    return () => {
      const current = this.scopes.pop();
      if (current !== frame) throw new Error("NodeBuilderScopes exited out of order");
    };
  }

  currentScope(): NodeBuilderScopeFrame | undefined {
    return this.scopes[this.scopes.length - 1];
  }

  isInScope(declaration: AstNode): boolean {
    return this.scopes.some(scope => scope.declaration === declaration);
  }

  unavailableNames(): ReadonlySet<string> {
    const names = new Set<string>();
    for (const scope of this.scopes) {
      for (const name of scope.parameterNames) names.add(name);
      for (const name of scope.typeParameterNames) names.add(name);
    }
    return names;
  }
}

export function newNodeBuilderScopes(): NodeBuilderScopes {
  return new NodeBuilderScopes();
}

export function cloneNodeBuilderContext(context: NodeBuilderImplContext): () => void {
  const typeParameterNames = new Map(context.typeParameterNames);
  const typeParameterNamesByText = new Set(context.typeParameterNamesByText);
  const typeParameterNamesByTextNextNameCount = new Map(context.typeParameterNamesByTextNextNameCount);
  const typeParameterSymbolList = new Set(context.typeParameterSymbolList);
  const enclosingSymbolTypes = new Map(context.enclosingSymbolTypes);
  const trackedSymbols = [...context.trackedSymbols];
  const mapper = context.mapper;
  const enclosingDeclaration = context.enclosingDeclaration;
  return () => {
    context.typeParameterNames = typeParameterNames;
    context.typeParameterNamesByText = typeParameterNamesByText;
    context.typeParameterNamesByTextNextNameCount = typeParameterNamesByTextNextNameCount;
    context.typeParameterSymbolList = typeParameterSymbolList;
    context.enclosingSymbolTypes = enclosingSymbolTypes;
    context.trackedSymbols = trackedSymbols;
    context.enclosingDeclaration = enclosingDeclaration;
    context.mapper = mapper;
  };
}

export function addSymbolTypeToContext(context: NodeBuilderImplContext, symbol: AstSymbol, type: Type): () => void {
  const id = getSymbolId(symbol);
  const previous = context.enclosingSymbolTypes.get(id);
  const hadPrevious = context.enclosingSymbolTypes.has(id);
  context.enclosingSymbolTypes.set(id, type);
  return () => {
    if (hadPrevious) context.enclosingSymbolTypes.set(id, previous!);
    else context.enclosingSymbolTypes.delete(id);
  };
}

export function enterSignatureScope(
  context: NodeBuilderImplContext,
  declaration: AstNode | undefined,
  expandedParameters: readonly AstSymbol[] | undefined,
  typeParameters: readonly Type[] | undefined,
  mapper: TypeMapper | undefined,
): () => void {
  const restore = cloneNodeBuilderContext(context);
  if (declaration !== undefined) context.enclosingDeclaration = declaration;
  if (mapper !== undefined) context.mapper = mapper;
  for (const parameter of expandedParameters ?? []) {
    const name = symbolName(parameter);
    if (name !== "") context.typeParameterNamesByText.add(name);
  }
  for (const typeParameter of typeParameters ?? []) {
    const name = symbolName(typeParameter.symbol);
    if (name !== "") context.typeParameterNamesByText.add(name);
    if (typeParameter.symbol !== undefined) context.typeParameterSymbolList.add(getSymbolId(typeParameter.symbol));
  }
  return restore;
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}
