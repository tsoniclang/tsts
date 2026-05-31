/**
 * Checker services.
 *
 * Substantive port of TS-Go `internal/checker/services.go` (~1094 LoC).
 * Language-service-facing API: hover info, completion, find-references,
 * quick-info, signature help, rename-info. These layer on top of the
 * core checker.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { NodeFlags, SymbolFlags } from "../ast/index.js";
import type { Type, Signature, ObjectType, UnionOrIntersectionType, IndexInfo } from "./types.js";
import { ObjectFlags, SignatureKind, TypeFlags, getTypeOfSymbol } from "./types.js";

export interface QuickInfoResult {
  kind: string;
  kindModifiers: string;
  textSpan: { start: number; length: number };
  displayParts: readonly { text: string; kind: string }[];
  documentation?: readonly { text: string; kind: string }[];
  tags?: readonly { name: string; text: string }[];
}

export interface SignatureHelpResult {
  items: readonly SignatureHelpItem[];
  applicableSpan: { start: number; length: number };
  selectedItemIndex: number;
  argumentIndex: number;
  argumentCount: number;
}

export interface SignatureHelpItem {
  isVariadic: boolean;
  prefixDisplayParts: readonly { text: string; kind: string }[];
  suffixDisplayParts: readonly { text: string; kind: string }[];
  separatorDisplayParts: readonly { text: string; kind: string }[];
  parameters: readonly { name: string; documentation: readonly unknown[]; displayParts: readonly unknown[]; isOptional: boolean }[];
  documentation: readonly { text: string; kind: string }[];
  tags: readonly { name: string; text: string }[];
}

export interface ExportPropertyEntry {
  symbol: AstSymbol;
  name: string;
}

export class CheckerServices {
  // Hover / quick-info
  getQuickInfoAtPosition(file: AstNode, position: number): QuickInfoResult | undefined {
    const node = getTouchingNode(file, position);
    if (node === undefined) return undefined;
    const symbol = this.getSymbolAtLocation(node);
    const type = this.getTypeAtLocation(node);
    const name = symbolName(symbol) || nodeText(node);
    if (name.length === 0 && type === undefined) return undefined;
    const display = type === undefined ? name : `${name}: ${typeToDisplay(type)}`;
    return {
      kind: symbolKind(symbol, node),
      kindModifiers: symbolKindModifiers(symbol),
      textSpan: textSpanOf(node),
      displayParts: [{ text: display, kind: "text" }],
    };
  }
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
    return nodeSymbol(node)
      ?? (node as unknown as { resolvedSymbol?: AstSymbol; localSymbol?: AstSymbol }).resolvedSymbol
      ?? (node as unknown as { resolvedSymbol?: AstSymbol; localSymbol?: AstSymbol }).localSymbol;
  }
  getSymbolsInScope(location: AstNode, meaning: number): readonly AstSymbol[] {
    if ((((location as { flags?: number }).flags ?? 0) & NodeFlags.InWithStatement) !== 0) return [];
    const out: AstSymbol[] = [];
    const seen = new Set<string>();
    let n: AstNode | undefined = location;
    while (n !== undefined) {
      copySymbolTable(localsOf(n), meaning, out, seen);
      if (isExternalModuleOrModuleDeclaration(n)) {
        copySymbolTable(exportsOf(nodeSymbol(n)), meaning & SymbolFlags.ModuleMember, out, seen, true);
      } else if (isEnumDeclaration(n)) {
        copySymbolTable(exportsOf(nodeSymbol(n)), meaning & SymbolFlags.EnumMember, out, seen);
      } else if (isClassOrInterfaceDeclaration(n)) {
        copySymbolTable(membersOf(nodeSymbol(n)), meaning & SymbolFlags.Type, out, seen);
      }
      if (introducesArgumentsExoticObject(n)) {
        const argumentsSymbol = localsOf(n)?.get("arguments");
        if (argumentsSymbol !== undefined) copySymbol(argumentsSymbol, meaning, out, seen);
      }
      n = parentOf(n);
    }
    return out;
  }
  getTypeAtLocation(node: AstNode): Type | undefined {
    const sym = this.getSymbolAtLocation(node);
    if (sym === undefined) return undefined;
    return getTypeOfSymbol(sym) ?? (sym as unknown as { type?: Type }).type;
  }
  getContextualType(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    const contextualType = (node as unknown as { contextualType?: Type }).contextualType;
    if (contextualType !== undefined) return contextualType;
    const parent = parentOf(node);
    if (parent === undefined) return undefined;
    const map = (parent as unknown as { contextualTypes?: Map<AstNode, Type> }).contextualTypes;
    return map?.get(node);
  }
  getApparentType(t: Type): Type {
    // Apparent type unwraps type parameters to their constraint, but
    // for primitives this is the type itself.
    return (t.data as { constraint?: Type } | undefined)?.constraint ?? t;
  }
  getNonOptionalType(t: Type): Type {
    // Removes undefined/null from the type for definite-assignment
    // narrowing. For union types, filter constituents; otherwise
    // identity.
    const types = constituentTypes(t);
    if (types === undefined) return t;
    const filtered = types.filter((u) => {
      const f = (u as { flags?: number }).flags ?? 0;
      return (f & (TypeFlags.Undefined | TypeFlags.Null)) === 0;
    });
    if (filtered.length === types.length) return t;
    if (filtered.length === 1) return filtered[0]!;
    return { ...(t as object), types: filtered } as unknown as Type;
  }

  // Signature help
  getSignatureHelpItems(file: AstNode, position: number): SignatureHelpResult | undefined {
    const call = getCallLikeAncestor(getTouchingNode(file, position));
    if (call === undefined) return undefined;
    const candidates = this.getCandidateSignatures(call);
    const selected = candidates[0];
    return {
      items: candidates.map((signature) => signatureHelpItem(signature)),
      applicableSpan: textSpanOf(call),
      selectedItemIndex: selected === undefined ? -1 : 0,
      argumentIndex: argumentIndexAtPosition(call, position),
      argumentCount: argumentCount(call),
    };
  }
  getCandidateSignatures(node: AstNode): readonly Signature[] {
    // For a CallExpression, return signatures of the callee's type.
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr === undefined) return [];
    const t = this.getTypeAtLocation(expr);
    if (t === undefined) return [];
    return this.getCallSignaturesOfType(t);
  }
  getResolvedSignature(node: AstNode): Signature | undefined {
    const sigs = this.getCandidateSignatures(node);
    return sigs.length > 0 ? sigs[0] : undefined;
  }
  getResolvedSignatureForSignatureHelp(node: AstNode, candidatesOutArray: Signature[]): Signature | undefined {
    const candidates = this.getCandidateSignatures(node);
    candidatesOutArray.push(...candidates);
    return candidates[0];
  }

  // Find-references support
  getReferencesAtPosition(file: AstNode, position: number): readonly AstNode[] {
    const node = getTouchingNode(file, position);
    const symbol = node === undefined ? undefined : this.getSymbolAtLocation(node);
    if (symbol === undefined) return [];
    return collectNodes(file, (candidate) => this.getSymbolAtLocation(candidate) === symbol);
  }
  getDefinitionAtPosition(file: AstNode, position: number): readonly AstNode[] {
    const node = getTouchingNode(file, position);
    const symbol = node === undefined ? undefined : this.getSymbolAtLocation(node);
    if (symbol === undefined) return [];
    return declarationsOf(symbol);
  }
  getImplementationAtPosition(file: AstNode, position: number): readonly AstNode[] {
    return this.getDefinitionAtPosition(file, position).filter((node) => !isDeclarationOnly(node));
  }
  getTypeDefinitionAtPosition(file: AstNode, position: number): readonly AstNode[] {
    const node = getTouchingNode(file, position);
    const type = node === undefined ? undefined : this.getTypeAtLocation(node);
    return declarationsOf(type?.symbol);
  }

  // Completions
  getCompletionsAtPosition(file: AstNode, position: number): readonly AstSymbol[] {
    const node = getTouchingNode(file, position) ?? file;
    const propertyReceiver = propertyAccessReceiver(node);
    if (propertyReceiver !== undefined) {
      const receiverType = this.getTypeAtLocation(propertyReceiver);
      return receiverType === undefined ? [] : this.getAugmentedPropertiesOfType(receiverType);
    }
    return this.getSymbolsInScope(node, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace);
  }
  getCompletionEntryDetails(entryName: string, file: AstNode, position: number): unknown {
    const symbol = this.getCompletionsAtPosition(file, position).find((candidate) => symbolName(candidate) === entryName);
    if (symbol === undefined) return undefined;
    return {
      name: entryName,
      kind: symbolKind(symbol),
      type: typeToDisplay(getTypeOfSymbol(symbol)),
      declarations: declarationsOf(symbol),
    };
  }

  // Type / property access info
  getPropertyOfType(t: Type, name: string): AstSymbol | undefined {
    const unionData = t.data as UnionOrIntersectionType | undefined;
    const objectData = t.data as ObjectType | undefined;
    return membersOf(t.symbol)?.get(name)
      ?? unionData?.propertyCache?.get(name)
      ?? objectData?.declaredProperties?.find((symbol) => symbolName(symbol) === name);
  }
  getPropertyOfTypeOrUndefined(t: Type, name: string): AstSymbol | undefined {
    return this.getPropertyOfType(t, name);
  }
  getIndexTypeOfType(t: Type, kind: number): Type | undefined {
    const infos = indexInfosOf(t);
    if (infos === undefined) return undefined;
    const named = infos.find((info) => ((info.keyType.flags & kind) !== 0));
    return (named ?? infos[0])?.valueType;
  }
  getCallSignaturesOfType(t: Type): readonly Signature[] {
    return (t.data as ObjectType | undefined)?.declaredCallSignatures
      ?? (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures
      ?? [];
  }
  getConstructSignaturesOfType(t: Type): readonly Signature[] {
    return (t.data as ObjectType | undefined)?.declaredConstructSignatures
      ?? (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures
      ?? [];
  }

  getExportsOfModule(symbol: AstSymbol): readonly AstSymbol[] {
    return symbolsToArray(exportsOf(symbol));
  }

  forEachExportAndPropertyOfModule(moduleSymbol: AstSymbol, cb: (symbol: AstSymbol, name: string) => void): void {
    for (const [name, symbol] of exportsOf(moduleSymbol) ?? []) {
      if (!isReservedMemberName(name)) cb(symbol, name);
    }
    const exportEqualsType = getTypeOfSymbol(moduleSymbol);
    if (exportEqualsType === undefined || !this.shouldTreatPropertiesOfExternalModuleAsExports(exportEqualsType)) return;
    for (const symbol of this.getAugmentedPropertiesOfType(exportEqualsType)) {
      const name = symbolName(symbol);
      if (!isReservedMemberName(name)) cb(symbol, name);
    }
  }

  getExportsAndPropertiesOfModule(moduleSymbol: AstSymbol): readonly AstSymbol[] {
    const out = [...this.getExportsOfModule(moduleSymbol)];
    const exportEqualsType = getTypeOfSymbol(moduleSymbol);
    if (exportEqualsType !== undefined && this.shouldTreatPropertiesOfExternalModuleAsExports(exportEqualsType)) {
      out.push(...this.getAugmentedPropertiesOfType(exportEqualsType));
    }
    return dedupeSymbols(out);
  }

  tryGetMemberInModuleExports(memberName: string, moduleSymbol: AstSymbol): AstSymbol | undefined {
    return exportsOf(moduleSymbol)?.get(memberName);
  }

  tryGetMemberInModuleExportsAndProperties(memberName: string, moduleSymbol: AstSymbol): AstSymbol | undefined {
    const exported = this.tryGetMemberInModuleExports(memberName, moduleSymbol);
    if (exported !== undefined) return exported;
    const exportEqualsType = getTypeOfSymbol(moduleSymbol);
    return exportEqualsType !== undefined && this.shouldTreatPropertiesOfExternalModuleAsExports(exportEqualsType)
      ? this.getPropertyOfType(exportEqualsType, memberName)
      : undefined;
  }

  shouldTreatPropertiesOfExternalModuleAsExports(type: Type): boolean {
    return (type.flags & TypeFlags.Primitive) === 0
      || (objectFlagsOf(type) & ObjectFlags.Class) !== 0
      || this.arrayElementType(type) !== undefined
      || (objectFlagsOf(type) & ObjectFlags.Tuple) !== 0;
  }

  getAugmentedPropertiesOfType(type: Type): readonly AstSymbol[] {
    const apparent = this.getApparentType(type);
    const table = new Map<string, AstSymbol>();
    for (const property of (apparent.data as ObjectType | undefined)?.declaredProperties ?? []) {
      table.set(symbolName(property), property);
    }
    for (const [name, property] of membersOf(apparent.symbol) ?? []) {
      table.set(name, property);
    }
    return symbolsToArray(table);
  }

  getAllPossiblePropertiesOfTypes(types: readonly Type[]): readonly AstSymbol[] {
    const table = new Map<string, AstSymbol>();
    for (const type of types) {
      for (const property of this.getAugmentedPropertiesOfType(type)) {
        const name = symbolName(property);
        if (!table.has(name)) table.set(name, property);
      }
    }
    return symbolsToArray(table);
  }

  getFirstTypeArgumentFromKnownType(type: Type): Type | undefined {
    const name = symbolName(type.symbol ?? type.aliasSymbol);
    if (!isKnownGenericTypeName(name)) return undefined;
    const data = type.data as ObjectType | undefined;
    return (data?.resolvedTypeArguments ?? type.aliasTypeArguments)?.[0];
  }

  getTypeParameterAtPosition(signature: Signature, position: number): Type | undefined {
    return (signature.typeParameters?.[position] as Type | undefined) ?? getTypeOfSymbol(signature.parameters[position]);
  }

  getPropertySymbolsFromContextualType(
    node: AstNode, contextualType: Type, unionSymbolOk: boolean,
  ): readonly AstSymbol[] {
    const name = propertyNameText(node);
    if (name.length === 0) return [];
    if ((contextualType.flags & TypeFlags.Union) === 0) {
      const symbol = this.getPropertyOfType(contextualType, name);
      return symbol === undefined ? [] : [symbol];
    }
    const hits = (constituentTypes(contextualType) ?? [])
      .map((type) => this.getPropertyOfType(type, name))
      .filter((symbol): symbol is AstSymbol => symbol !== undefined);
    if (unionSymbolOk && (hits.length === 0 || hits.length === (constituentTypes(contextualType)?.length ?? 0))) {
      const symbol = this.getPropertyOfType(contextualType, name);
      if (symbol !== undefined) return [symbol];
    }
    return dedupeSymbols(hits);
  }

  getConstantValue(node: AstNode): unknown {
    const symbol = this.getSymbolAtLocation(node);
    const valueDeclaration = (symbol as { valueDeclaration?: AstNode } | undefined)?.valueDeclaration;
    return (valueDeclaration as { constantValue?: unknown; value?: unknown } | undefined)?.constantValue
      ?? (valueDeclaration as { constantValue?: unknown; value?: unknown } | undefined)?.value
      ?? (node as { constantValue?: unknown; value?: unknown }).constantValue
      ?? (node as { constantValue?: unknown; value?: unknown }).value;
  }

  isLibSymbolForHoverVerbosity(symbol: AstSymbol | undefined): boolean {
    if (symbol === undefined) return false;
    return declarationsOf(symbol).some((declaration) => /(^|\/)lib\..*\.d\.[cm]?ts$/.test(sourceFileName(declaration)));
  }

  isLibTypeForHoverVerbosity(type: Type): boolean {
    return this.isLibSymbolForHoverVerbosity(type.symbol)
      || (objectFlagsOf(type) & ObjectFlags.Tuple) !== 0;
  }

  arrayElementType(type: Type): Type | undefined {
    const data = type.data as { elementType?: Type; resolvedTypeArguments?: readonly Type[]; resolvedTypeArguments_?: readonly Type[] } | undefined;
    return data?.elementType ?? data?.resolvedTypeArguments?.[0] ?? data?.resolvedTypeArguments_?.[0];
  }
}

export function newCheckerServices(): CheckerServices {
  return new CheckerServices();
}

function nodeSymbol(node: AstNode | undefined): AstSymbol | undefined {
  return (node as { symbol?: AstSymbol } | undefined)?.symbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { parent?: AstNode } | undefined)?.parent;
}

function localsOf(node: AstNode | undefined): SymbolTable | undefined {
  return (node as { locals?: SymbolTable } | undefined)?.locals;
}

function membersOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { members?: SymbolTable } | undefined)?.members;
}

function exportsOf(symbol: AstSymbol | undefined): SymbolTable | undefined {
  return (symbol as { exports?: SymbolTable } | undefined)?.exports;
}

function declarationsOf(symbol: AstSymbol | undefined): readonly AstNode[] {
  return (symbol as { declarations?: readonly AstNode[] } | undefined)?.declarations ?? [];
}

function symbolName(symbol: AstSymbol | undefined): string {
  return (symbol as { name?: string } | undefined)?.name ?? "";
}

function symbolFlags(symbol: AstSymbol | undefined): number {
  return (symbol as { flags?: number } | undefined)?.flags ?? 0;
}

function copySymbol(symbol: AstSymbol, meaning: number, out: AstSymbol[], seen: Set<string>): void {
  if (meaning !== 0 && (symbolFlags(symbol) & meaning) === 0) return;
  const name = symbolName(symbol);
  if (isReservedMemberName(name) || seen.has(name)) return;
  seen.add(name);
  out.push(symbol);
}

function copySymbolTable(
  source: SymbolTable | undefined,
  meaning: number,
  out: AstSymbol[],
  seen: Set<string>,
  skipExportSpecifiers = false,
): void {
  if (source === undefined || meaning === 0) return;
  for (const [name, symbol] of source) {
    if (skipExportSpecifiers && (name === "default" || name === "__export")) continue;
    copySymbol(symbol, meaning, out, seen);
  }
}

function symbolsToArray(table: SymbolTable | undefined): readonly AstSymbol[] {
  if (table === undefined) return [];
  return [...table.entries()]
    .filter(([name]) => !isReservedMemberName(name))
    .map(([, symbol]) => symbol);
}

function dedupeSymbols(symbols: readonly AstSymbol[]): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  const seen = new Set<AstSymbol>();
  for (const symbol of symbols) {
    if (seen.has(symbol)) continue;
    seen.add(symbol);
    out.push(symbol);
  }
  return out;
}

function textSpanOf(node: AstNode): { start: number; length: number } {
  const start = nodePos(node);
  const end = nodeEnd(node);
  return { start, length: Math.max(0, end - start) };
}

function nodePos(node: AstNode): number {
  return (node as { pos?: number; loc?: { pos?: number; start?: number } }).pos
    ?? (node as { pos?: number; loc?: { pos?: number; start?: number } }).loc?.pos
    ?? (node as { pos?: number; loc?: { pos?: number; start?: number } }).loc?.start
    ?? 0;
}

function nodeEnd(node: AstNode): number {
  return (node as { end?: number; loc?: { end?: number } }).end
    ?? (node as { end?: number; loc?: { end?: number } }).loc?.end
    ?? nodePos(node);
}

function childrenOf(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const value of Object.values(node as object)) {
    if (isNode(value)) out.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) out.push(item);
    } else if (isNodeList(value)) {
      out.push(...value.nodes.filter(isNode));
    }
  }
  return out;
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}

function isNodeList(value: unknown): value is { nodes: unknown[] } {
  return typeof value === "object" && value !== null && Array.isArray((value as { nodes?: unknown }).nodes);
}

function getTouchingNode(root: AstNode | undefined, position: number): AstNode | undefined {
  if (root === undefined) return undefined;
  if (position < nodePos(root) || position > nodeEnd(root)) return undefined;
  for (const child of childrenOf(root)) {
    const match = getTouchingNode(child, position);
    if (match !== undefined) return match;
  }
  return root;
}

function collectNodes(root: AstNode, predicate: (node: AstNode) => boolean): readonly AstNode[] {
  const out: AstNode[] = [];
  const visit = (node: AstNode): void => {
    if (predicate(node)) out.push(node);
    for (const child of childrenOf(node)) visit(child);
  };
  visit(root);
  return out;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { text?: string; name?: { text?: string } } | undefined)?.text
    ?? (node as { text?: string; name?: { text?: string } } | undefined)?.name?.text
    ?? "";
}

function propertyNameText(node: AstNode): string {
  return nodeText((node as { name?: AstNode }).name ?? node);
}

function symbolKind(symbol: AstSymbol | undefined, node?: AstNode): string {
  const flags = symbolFlags(symbol);
  if ((flags & SymbolFlags.Class) !== 0) return "class";
  if ((flags & SymbolFlags.Interface) !== 0) return "interface";
  if ((flags & SymbolFlags.Function) !== 0) return "function";
  if ((flags & SymbolFlags.Method) !== 0) return "method";
  if ((flags & SymbolFlags.Enum) !== 0) return "enum";
  if ((flags & SymbolFlags.TypeAlias) !== 0) return "type";
  if ((flags & SymbolFlags.Alias) !== 0) return "alias";
  if ((flags & SymbolFlags.Property) !== 0) return "property";
  if ((flags & SymbolFlags.Variable) !== 0) return "var";
  return node === undefined ? "unknown" : `kind:${(node as { kind?: number }).kind ?? -1}`;
}

function symbolKindModifiers(symbol: AstSymbol | undefined): string {
  const flags = symbolFlags(symbol);
  const modifiers: string[] = [];
  if ((flags & SymbolFlags.Optional) !== 0) modifiers.push("optional");
  if ((flags & SymbolFlags.Alias) !== 0) modifiers.push("alias");
  return modifiers.join(",");
}

function typeToDisplay(type: Type | undefined): string {
  if (type === undefined) return "unknown";
  if ((type.flags & TypeFlags.String) !== 0) return "string";
  if ((type.flags & TypeFlags.Number) !== 0) return "number";
  if ((type.flags & TypeFlags.Boolean) !== 0) return "boolean";
  if ((type.flags & TypeFlags.Void) !== 0) return "void";
  if ((type.flags & TypeFlags.Any) !== 0) return "any";
  if ((type.flags & TypeFlags.Unknown) !== 0) return "unknown";
  if ((type.flags & TypeFlags.Union) !== 0) return (constituentTypes(type) ?? []).map(typeToDisplay).join(" | ");
  return symbolName(type.symbol) || `type#${type.id}`;
}

function constituentTypes(type: Type): readonly Type[] | undefined {
  return (type.data as UnionOrIntersectionType | undefined)?.types;
}

function indexInfosOf(type: Type): readonly IndexInfo[] | undefined {
  return (type.data as ObjectType | undefined)?.indexInfos;
}

function objectFlagsOf(type: Type): ObjectFlags {
  return (type.data as ObjectType | UnionOrIntersectionType | undefined)?.objectFlags ?? 0;
}

function signatureHelpItem(signature: Signature): SignatureHelpItem {
  return {
    isVariadic: signature.parameters.length > signature.minArgumentCount,
    prefixDisplayParts: [{ text: "(", kind: "punctuation" }],
    suffixDisplayParts: [{ text: ")", kind: "punctuation" }],
    separatorDisplayParts: [{ text: ", ", kind: "punctuation" }],
    parameters: signature.parameters.map((parameter) => ({
      name: symbolName(parameter),
      documentation: [],
      displayParts: [{ text: `${symbolName(parameter)}: ${typeToDisplay(getTypeOfSymbol(parameter))}`, kind: "parameter" }],
      isOptional: (symbolFlags(parameter) & SymbolFlags.Optional) !== 0,
    })),
    documentation: [],
    tags: [],
  };
}

function getCallLikeAncestor(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if ((current as { arguments?: readonly AstNode[]; expression?: AstNode }).arguments !== undefined
      && (current as { arguments?: readonly AstNode[]; expression?: AstNode }).expression !== undefined) {
      return current;
    }
    current = parentOf(current);
  }
  return undefined;
}

function argumentCount(node: AstNode): number {
  return ((node as { arguments?: readonly AstNode[] }).arguments ?? []).length;
}

function argumentIndexAtPosition(node: AstNode, position: number): number {
  const args = (node as { arguments?: readonly AstNode[] }).arguments ?? [];
  const index = args.findIndex((arg) => position <= nodeEnd(arg));
  return index < 0 ? args.length : index;
}

function propertyAccessReceiver(node: AstNode): AstNode | undefined {
  const parent = parentOf(node);
  if (parent === undefined) return undefined;
  if ((parent as { expression?: AstNode; name?: AstNode }).name === node) return (parent as { expression?: AstNode }).expression;
  return undefined;
}

function isReservedMemberName(name: string): boolean {
  return name.length === 0 || name === "__constructor" || name === "__export" || name === "__missing";
}

function isExternalModuleOrModuleDeclaration(node: AstNode): boolean {
  return (node as { externalModuleIndicator?: AstNode; moduleSpecifier?: AstNode }).externalModuleIndicator !== undefined
    || (node as { externalModuleIndicator?: AstNode; moduleSpecifier?: AstNode }).moduleSpecifier !== undefined
    || ((node as { kind?: number }).kind ?? 0) === 265;
}

function isEnumDeclaration(node: AstNode): boolean {
  return ((node as { kind?: number }).kind ?? 0) === 266;
}

function isClassOrInterfaceDeclaration(node: AstNode): boolean {
  const kind = (node as { kind?: number }).kind ?? 0;
  return kind === 264 || kind === 263;
}

function introducesArgumentsExoticObject(node: AstNode): boolean {
  const kind = (node as { kind?: number }).kind ?? 0;
  return kind === 262 || kind === 244 || kind === 232;
}

function isDeclarationOnly(node: AstNode): boolean {
  return (((node as { flags?: number }).flags ?? 0) & NodeFlags.Ambient) !== 0
    || sourceFileName(node).endsWith(".d.ts");
}

function sourceFileName(node: AstNode): string {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    const fileName = (current as { fileName?: string; path?: string }).fileName
      ?? (current as { fileName?: string; path?: string }).path;
    if (fileName !== undefined) return fileName;
    current = parentOf(current);
  }
  return "";
}

const knownGenericTypeNames = new Set([
  "Array",
  "ArrayLike",
  "ReadonlyArray",
  "Promise",
  "PromiseLike",
  "Iterable",
  "IterableIterator",
  "AsyncIterable",
  "Set",
  "WeakSet",
  "ReadonlySet",
  "Map",
  "WeakMap",
  "ReadonlyMap",
  "Partial",
  "Required",
  "Readonly",
  "Pick",
  "Omit",
  "NonNullable",
]);

function isKnownGenericTypeName(name: string): boolean {
  return knownGenericTypeNames.has(name);
}
