import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { NodeBuilder } from "./nodeBuilder.js";
import type { Signature, Type, TypeFormatFlags } from "./types.js";

export type HoverExpansionKind = "enum" | "class" | "module" | "interface" | "value";

export interface HoverExpansionDeclaration {
  kind: HoverExpansionKind;
  name: string;
  memberNames: readonly string[];
  truncated: boolean;
}

export interface NodeBuilderHoverOptions {
  readonly maxMemberCount?: number;
  readonly maxExpansionDepth?: number;
}

export function isExpandingHover(options: NodeBuilderHoverOptions | undefined): boolean {
  return (options?.maxExpansionDepth ?? -1) !== -1;
}

export function isExpanding(ctx: { readonly maxExpansionDepth?: number } | undefined): boolean {
  return (ctx?.maxExpansionDepth ?? -1) !== -1;
}

export class NodeBuilderHover {
  private readonly builder: NodeBuilder;
  private readonly maxMemberCount: number;
  private readonly maxExpansionDepth: number;

  constructor(builder: NodeBuilder = new NodeBuilder(), options: NodeBuilderHoverOptions = {}) {
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

  expandEnumDecl(symbol: AstSymbol): HoverExpansionDeclaration {
    const memberNames = enumMemberSymbols(symbol).map(symbolName);
    return truncateExpansion({
      kind: "enum",
      name: symbolName(symbol),
      memberNames: memberNames.length === 0 ? collectMemberNames(symbol) : memberNames,
      truncated: false,
    }, this.maxMemberCount);
  }

  enumMemberInitializer(symbol: AstSymbol): string | number | undefined {
    for (const declaration of symbol.declarations ?? []) {
      const initializer = (declaration as { readonly initializer?: AstNode }).initializer;
      if (initializer === undefined) continue;
      const value = literalValue(initializer);
      if (value !== undefined) return value;
    }
    return undefined;
  }

  expandClassDecl(symbol: AstSymbol): HoverExpansionDeclaration {
    const ownMembers = collectClassLikeMembers(symbol, false);
    const staticMembers = collectClassLikeMembers(symbol, true).map((name) => `static ${name}`);
    const constructors = this.serializeConstructors(symbol).map((name) => `constructor ${name}`);
    const indexSignatures = this.serializeIndexSignaturesOfType(symbol).map((name) => `[${name}]`);
    return truncateExpansion({
      kind: "class",
      name: symbolName(symbol),
      memberNames: [...indexSignatures, ...staticMembers, ...constructors, ...ownMembers],
      truncated: false,
    }, this.maxMemberCount);
  }

  addClassModifiers(members: readonly string[], isStatic: boolean): readonly string[] {
    return isStatic ? members.map((member) => member.startsWith("static ") ? member : `static ${member}`) : members;
  }

  typeElementsToClassElements(members: readonly string[]): readonly string[] {
    return members.map((member) => member.replace(/\(\):/u, "():"));
  }

  expandInterfaceDecl(symbol: AstSymbol): HoverExpansionDeclaration {
    return truncateExpansion({
      kind: "interface",
      name: symbolName(symbol),
      memberNames: [
        ...this.hoverHeritageClauses(symbol).map((name) => `extends ${name}`),
        ...this.serializeIndexSignaturesOfType(symbol),
        ...collectMemberNames(symbol),
      ],
      truncated: false,
    }, this.maxMemberCount);
  }

  hoverHeritageClauses(symbolOrDeclarations: AstSymbol | readonly AstNode[]): readonly string[] {
    const declarations: readonly AstNode[] = Array.isArray(symbolOrDeclarations)
      ? symbolOrDeclarations
      : (symbolOrDeclarations as AstSymbol).declarations ?? [];
    const names: string[] = [];
    for (const declaration of declarations) {
      for (const heritage of nodeList((declaration as { readonly heritageClauses?: unknown }).heritageClauses)) {
        for (const type of nodeList((heritage as { readonly types?: unknown }).types)) {
          const text = entityNameText((type as { readonly expression?: AstNode }).expression ?? type);
          if (text.length > 0) names.push(text);
        }
      }
    }
    return names;
  }

  serializePropertiesWithTruncation(properties: readonly AstSymbol[], elements: readonly string[] = []): readonly string[] {
    const output = [...elements];
    for (let index = 0; index < properties.length; index += 1) {
      if (index >= this.maxMemberCount && properties.length > this.maxMemberCount + 1) {
        output.push(`... ${properties.length - index} more ...`);
        output.push(symbolName(properties[properties.length - 1]!));
        break;
      }
      output.push(symbolName(properties[index]!));
    }
    return output.filter((name) => name.length > 0);
  }

  serializeConstructors(symbol: AstSymbol): readonly string[] {
    const declarations = symbol.declarations ?? [];
    const constructors: string[] = [];
    for (const declaration of declarations) {
      for (const member of nodeList((declaration as { readonly members?: unknown }).members)) {
        if (member.kind === Kind.Constructor) constructors.push(parameterListText(member));
      }
    }
    return constructors;
  }

  serializeIndexSignaturesOfType(symbol: AstSymbol): readonly string[] {
    const signatures: string[] = [];
    for (const declaration of symbol.declarations ?? []) {
      for (const member of nodeList((declaration as { readonly members?: unknown }).members)) {
        if (member.kind === Kind.IndexSignature) signatures.push(parameterListText(member));
      }
    }
    return signatures;
  }

  serializeNamespaceMember(resolved: AstSymbol, name: string): string {
    const flags = resolved.flags ?? SymbolFlags.None;
    if ((flags & SymbolFlags.TypeAlias) !== 0) return this.serializeTypeAliasForNamespace(resolved, name);
    if ((flags & SymbolFlags.Enum) !== 0) return `enum ${name}`;
    if ((flags & SymbolFlags.Class) !== 0) return `class ${name}`;
    if ((flags & SymbolFlags.Interface) !== 0) return `interface ${name}`;
    if ((flags & (SymbolFlags.ValueModule | SymbolFlags.NamespaceModule)) !== 0) return `namespace ${name}`;
    return `let ${name}`;
  }

  expandModuleDecl(symbol: AstSymbol): HoverExpansionDeclaration {
    const exports = symbol.exports ?? symbol.members ?? new Map<string, AstSymbol>();
    const members: string[] = [];
    for (const [name, exported] of [...exports.entries()].sort(([left], [right]) => left.localeCompare(right))) {
      if (!this.isNamespaceMember(exported)) continue;
      if (!isIdentifierText(name)) continue;
      members.push(this.serializeNamespaceMember(resolveAlias(exported), name));
    }
    return truncateExpansion({
      kind: "module",
      name: symbolName(symbol),
      memberNames: members,
      truncated: false,
    }, this.maxMemberCount);
  }

  serializeTypeAliasForNamespace(symbol: AstSymbol, name: string): string {
    const typeParameters = collectTypeParameterNames(symbol);
    return `type ${name}${typeParameters.length === 0 ? "" : `<${typeParameters.join(", ")}>`}`;
  }

  filterInheritedProperties(_type: unknown, baseTypes: readonly unknown[], properties: readonly AstSymbol[]): readonly AstSymbol[] {
    if (baseTypes.length === 0) return properties;
    const inheritedNames = new Set<string>();
    for (const base of baseTypes) {
      const symbols = (base as { readonly properties?: readonly AstSymbol[] } | undefined)?.properties ?? [];
      for (const symbol of symbols) inheritedNames.add(symbolName(symbol));
    }
    return properties.filter((property) => !inheritedNames.has(symbolName(property)));
  }

  isNamespaceMember(symbol: AstSymbol): boolean {
    return isNamespaceMember(symbol);
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

function enumMemberSymbols(symbol: AstSymbol): readonly AstSymbol[] {
  return [...(symbol.exports?.values() ?? []), ...(symbol.members?.values() ?? [])]
    .filter((member) => ((member.flags ?? 0) & SymbolFlags.EnumMember) !== 0)
    .sort(compareSymbols);
}

function collectClassLikeMembers(symbol: AstSymbol, isStatic: boolean): readonly string[] {
  const names = new Set<string>();
  const declarations = symbol.declarations ?? [];
  for (const declaration of declarations) {
    for (const member of nodeList((declaration as { readonly members?: unknown }).members)) {
      const isStaticMember = hasModifier(member, "static");
      if (isStaticMember !== isStatic) continue;
      const name = declarationNameText(member);
      if (name.length > 0 && name !== "constructor") names.add(name);
    }
  }
  const table = isStatic ? symbol.exports : symbol.members;
  for (const key of table?.keys() ?? []) {
    if (key !== "prototype") names.add(key);
  }
  return [...names].sort();
}

function truncateExpansion(declaration: HoverExpansionDeclaration, maxMemberCount: number): HoverExpansionDeclaration {
  if (declaration.memberNames.length <= maxMemberCount) return declaration;
  return {
    ...declaration,
    memberNames: [
      ...declaration.memberNames.slice(0, maxMemberCount),
      `... ${declaration.memberNames.length - maxMemberCount} more ...`,
    ],
    truncated: true,
  };
}

function literalValue(node: AstNode): string | number | undefined {
  if (node.kind === Kind.StringLiteral || node.kind === Kind.NoSubstitutionTemplateLiteral) {
    return (node as { readonly text?: string }).text ?? "";
  }
  if (node.kind === Kind.NumericLiteral) {
    const text = (node as { readonly text?: string }).text ?? "";
    const value = Number(text);
    return Number.isFinite(value) ? value : undefined;
  }
  return undefined;
}

function nodeList(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isAstNode);
  if (typeof value === "object" && value !== null && Array.isArray((value as { readonly nodes?: unknown }).nodes)) {
    return (value as { readonly nodes: readonly unknown[] }).nodes.filter(isAstNode);
  }
  return [];
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function hasModifier(node: AstNode, text: string): boolean {
  const flags = (node as { readonly modifierFlags?: number }).modifierFlags ?? 0;
  if (text === "static") return (flags & 256) !== 0;
  return false;
}

function parameterListText(node: AstNode): string {
  const parameters = nodeList((node as { readonly parameters?: unknown }).parameters);
  return `(${parameters.map(declarationNameText).join(", ")})`;
}

function entityNameText(node: AstNode | undefined): string {
  if (node === undefined) return "";
  const name = declarationNameText(node);
  if (name.length > 0) return name;
  const left = entityNameText((node as { readonly left?: AstNode; readonly expression?: AstNode }).left ?? (node as { readonly expression?: AstNode }).expression);
  const right = entityNameText((node as { readonly right?: AstNode; readonly name?: AstNode }).right ?? (node as { readonly name?: AstNode }).name);
  return left.length === 0 ? right : right.length === 0 ? left : `${left}.${right}`;
}

function collectTypeParameterNames(symbol: AstSymbol): readonly string[] {
  const names = new Set<string>();
  for (const declaration of symbol.declarations ?? []) {
    for (const parameter of nodeList((declaration as { readonly typeParameters?: unknown }).typeParameters)) {
      const name = declarationNameText(parameter);
      if (name.length > 0) names.add(name);
    }
  }
  return [...names].sort();
}

function isIdentifierText(text: string): boolean {
  return /^[A-Za-z_$][0-9A-Za-z_$]*$/u.test(text);
}

function resolveAlias(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).aliasTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).target
    ?? symbol.exportSymbol
    ?? symbol;
}

function isNamespaceMember(symbol: AstSymbol): boolean {
  const flags = symbol.flags ?? SymbolFlags.None;
  return (flags & (SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias)) !== 0
    || ((flags & SymbolFlags.Prototype) === 0 && symbolName(symbol) !== "prototype" && !isStaticClassMember(symbol));
}

function isStaticClassMember(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some((declaration) => hasModifier(declaration, "static")
    && ((declaration as { readonly parent?: AstNode }).parent?.kind === Kind.ClassDeclaration
      || (declaration as { readonly parent?: AstNode }).parent?.kind === Kind.ClassExpression));
}

function isHashPrivate(symbol: AstSymbol): boolean {
  return (symbol.declarations ?? []).some((declaration) => ((declaration as { readonly name?: AstNode }).name?.kind === Kind.PrivateIdentifier));
}

function compareSymbols(left: AstSymbol, right: AstSymbol): number {
  return symbolName(left).localeCompare(symbolName(right));
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
