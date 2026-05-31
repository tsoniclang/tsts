import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { NodeBuilder } from "./nodeBuilder.js";
import type { Signature, Type, TypeFormatFlags } from "./types.js";

export type HoverExpansionKind = "enum" | "class" | "module" | "interface" | "value";

export interface HoverExpansionDeclaration {
  readonly kind: HoverExpansionKind;
  readonly name: string;
  readonly memberNames: readonly string[];
  readonly truncated: boolean;
}

export interface NodeBuilderHoverOptions {
  readonly maxMemberCount?: number;
  readonly maxExpansionDepth?: number;
}

export function isExpandingHover(options: NodeBuilderHoverOptions | undefined): boolean {
  return (options?.maxExpansionDepth ?? -1) !== -1;
}

export class NodeBuilderHover {
  private readonly builder: NodeBuilder;
  private readonly maxMemberCount: number;
  private readonly maxExpansionDepth: number;

  constructor(builder = new NodeBuilder(), options: NodeBuilderHoverOptions = {}) {
    this.builder = builder;
    this.maxMemberCount = options.maxMemberCount ?? 32;
    this.maxExpansionDepth = options.maxExpansionDepth ?? -1;
  }

  buildHoverForSymbol(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): string {
    void enclosingDeclaration;
    const expansions = this.expandSymbolForHover(symbol);
    if (expansions.length === 0) return symbolName(symbol);
    return expansions.map(formatExpansion).join("\n");
  }

  buildHoverForType(type: Type, enclosingDeclaration: AstNode | undefined): string {
    return this.builder.typeToString(type, enclosingDeclaration, 0 as TypeFormatFlags);
  }

  buildHoverForSignature(signature: Signature, enclosingDeclaration: AstNode | undefined): string {
    return this.builder.signatureToString(signature, enclosingDeclaration, 0 as TypeFormatFlags, Kind.FunctionType);
  }

  expandSymbolForHover(symbol: AstSymbol): readonly HoverExpansionDeclaration[] {
    const flags = symbol.flags ?? SymbolFlags.None;
    const declarations: HoverExpansionDeclaration[] = [];
    if ((flags & SymbolFlags.Enum) !== 0) declarations.push(this.expandDeclaration(symbol, "enum"));
    if ((flags & SymbolFlags.Class) !== 0) declarations.push(this.expandDeclaration(symbol, "class"));
    if ((flags & (SymbolFlags.ValueModule | SymbolFlags.NamespaceModule)) !== 0) declarations.push(this.expandDeclaration(symbol, "module"));
    if ((flags & SymbolFlags.Interface) !== 0 && (flags & SymbolFlags.Class) === 0) declarations.push(this.expandDeclaration(symbol, "interface"));
    if (declarations.length === 0 && symbolName(symbol) !== "") declarations.push(this.expandDeclaration(symbol, "value"));
    return declarations;
  }

  shouldExpandSymbol(symbol: AstSymbol): boolean {
    if (this.maxExpansionDepth < 0) return false;
    const flags = symbol.flags ?? SymbolFlags.None;
    return (flags & (SymbolFlags.Enum | SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.ValueModule | SymbolFlags.NamespaceModule)) !== 0;
  }

  private expandDeclaration(symbol: AstSymbol, kind: HoverExpansionKind): HoverExpansionDeclaration {
    const memberNames = collectMemberNames(symbol);
    const truncated = memberNames.length > this.maxMemberCount;
    return {
      kind,
      name: symbolName(symbol),
      memberNames: truncated ? [...memberNames.slice(0, this.maxMemberCount), `... ${memberNames.length - this.maxMemberCount} more ...`] : memberNames,
      truncated,
    };
  }
}

export function newNodeBuilderHover(builder?: NodeBuilder, options?: NodeBuilderHoverOptions): NodeBuilderHover {
  return new NodeBuilderHover(builder, options);
}

function collectMemberNames(symbol: AstSymbol): readonly string[] {
  const names = new Set<string>();
  for (const key of symbol.members?.keys() ?? []) names.add(key);
  for (const key of symbol.exports?.keys() ?? []) names.add(key);
  for (const declaration of symbol.declarations ?? []) {
    const name = declarationNameText(declaration);
    if (name !== "") names.add(name);
  }
  return [...names].sort();
}

function declarationNameText(node: AstNode): string {
  const candidate = node as { readonly name?: { readonly text?: string; readonly escapedText?: string } | string };
  if (typeof candidate.name === "string") return candidate.name;
  return candidate.name?.text ?? candidate.name?.escapedText ?? "";
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function formatExpansion(declaration: HoverExpansionDeclaration): string {
  const header = `${declaration.kind} ${declaration.name}`.trim();
  if (declaration.memberNames.length === 0) return header;
  return `${header} { ${declaration.memberNames.join("; ")} }`;
}
