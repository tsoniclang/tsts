/**
 * Auto-name generator.
 *
 * Port of TS-Go `internal/printer/namegenerator.go` (~405 LoC).
 * Generates unique, non-colliding identifier names for temp variables,
 * loop variables, and generated names tied to specific nodes (e.g.
 * `_a`, `_b`, `__1`, `class_2`).
 */

import type { Node as AstNode, IdentifierNode } from "../ast/index.js";

export type GeneratedIdentifierFlags = number;
export const GeneratedIdentifierFlags = {
  None: 0 as GeneratedIdentifierFlags,
  Auto: 1 as GeneratedIdentifierFlags,
  Loop: 2 as GeneratedIdentifierFlags,
  Unique: 3 as GeneratedIdentifierFlags,
  Node: 4 as GeneratedIdentifierFlags,
  KindMask: 7 as GeneratedIdentifierFlags,
  ReservedInNestedScopes: (1 << 3) as GeneratedIdentifierFlags,
  Optimistic: (1 << 4) as GeneratedIdentifierFlags,
  FileLevel: (1 << 5) as GeneratedIdentifierFlags,
  AllowNameSubstitution: (1 << 6) as GeneratedIdentifierFlags,
} as const;

type TempFlags = number;
const TempFlags = {
  Auto: 0,
  CountMask: 0x0fffffff,
  I: 0x10000000,
} as const;

interface NameGenerationScope {
  tempFlags: TempFlags;
  formattedNameTempFlags: Map<string, TempFlags>;
  reservedNames: Set<string>;
}

export class NameGenerator {
  reservedNames: Set<string> = new Set();
  scopeReserved: Set<string> = new Set();
  nameCounters: Map<string, number> = new Map();
  generatedNames: Map<AstNode, string> = new Map();
  generatedPrivateNames: Map<AstNode, string> = new Map();
  private readonly generatedNameTexts = new Set<string>();
  private readonly nameGenerationScopes: NameGenerationScope[] = [];
  private readonly privateNameGenerationScopes: NameGenerationScope[] = [];

  generateName(kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    switch (generatedIdentifierKind(kind)) {
      case GeneratedIdentifierFlags.Loop:
        return this.makeTempVariableName(TempFlags.I, hasFlag(kind, GeneratedIdentifierFlags.ReservedInNestedScopes), false, prefix, suffix);
      case GeneratedIdentifierFlags.Unique:
        return this.makeUniqueNameText(prefix === "" ? "generated" : prefix, hasFlag(kind, GeneratedIdentifierFlags.Optimistic), hasFlag(kind, GeneratedIdentifierFlags.ReservedInNestedScopes), false, "", suffix);
      case GeneratedIdentifierFlags.Node:
      case GeneratedIdentifierFlags.Auto:
      default:
        return this.makeTempVariableName(TempFlags.Auto, hasFlag(kind, GeneratedIdentifierFlags.ReservedInNestedScopes), false, prefix, suffix);
    }
  }

  generateNameForNode(node: AstNode, kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    return this.generateNameForNodeCached(node, kind, prefix, suffix);
  }

  generateNameForNodeCached(node: AstNode, kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    const cached = this.generatedNames.get(node);
    if (cached !== undefined) return cached;
    const baseName = memberNameText(node) ?? nodeKindBaseName(node);
    const name = generatedIdentifierKind(kind) === GeneratedIdentifierFlags.Unique || generatedIdentifierKind(kind) === GeneratedIdentifierFlags.Node
      ? this.makeUniqueNameText(baseName, hasFlag(kind, GeneratedIdentifierFlags.Optimistic), hasFlag(kind, GeneratedIdentifierFlags.ReservedInNestedScopes), false, prefix, suffix)
      : this.generateName(kind, prefix, suffix);
    this.generatedNames.set(node, name);
    return name;
  }

  generateNameForModuleOrEnum(node: AstNode, prefix = "", suffix = ""): string {
    return this.generateNameForNodeCached(node, GeneratedIdentifierFlags.Node | GeneratedIdentifierFlags.Optimistic, prefix, suffix);
  }

  generateNameForImportOrExportDeclaration(node: AstNode, prefix = "", suffix = ""): string {
    return this.generateNameForNodeCached(node, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.ReservedInNestedScopes, prefix, suffix);
  }

  generateNameForExportDefault(node: AstNode, prefix = "", suffix = ""): string {
    return this.generateNameForNodeCached(node, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.FileLevel, prefix, suffix);
  }

  generateNameForClassExpression(node: AstNode, prefix = "", suffix = ""): string {
    return this.generateNameForNodeCached(node, GeneratedIdentifierFlags.Node | GeneratedIdentifierFlags.Optimistic, prefix, suffix);
  }

  generateNameForMethodOrAccessor(node: AstNode, prefix = "", suffix = ""): string {
    return this.generateNameForNodeCached(node, GeneratedIdentifierFlags.Node, prefix, suffix);
  }

  checkUniqueName(name: string, privateName = false): boolean {
    return this.isUniqueName(name, privateName);
  }

  nextContainer(): void {
    this.pushScope(false);
  }

  isUniqueLocalName(name: string): boolean {
    const scope = this.activeScope(false);
    return !scope.reservedNames.has(name) && !this.reservedNames.has(name);
  }

  pushScope(reuseTempVariableScope = false): void {
    this.privateNameGenerationScopes.push(newNameGenerationScope());
    if (!reuseTempVariableScope) this.nameGenerationScopes.push(newNameGenerationScope());
  }

  popScope(reuseTempVariableScope = false): void {
    this.privateNameGenerationScopes.pop();
    if (!reuseTempVariableScope) this.nameGenerationScopes.pop();
  }

  reserve(name: string): void {
    this.reserveName(name, false, false, false);
  }

  reserveInScope(name: string): void {
    this.reserveName(name, false, true, false);
  }

  isReserved(name: string): boolean {
    return this.isReservedName(name, false);
  }

  makeName(prefix: string, suffix: string): IdentifierNode {
    return { kind: 80, text: this.makeTempVariableName(TempFlags.Auto, false, false, prefix, suffix) } as unknown as IdentifierNode;
  }

  makeTempVariable(): IdentifierNode {
    return { kind: 80, text: this.makeTempVariableName(TempFlags.Auto, false, false, "", "") } as unknown as IdentifierNode;
  }

  makeUniqueName(text: string): IdentifierNode {
    return { kind: 80, text: this.makeUniqueNameText(text, true, false, false, "", "") } as unknown as IdentifierNode;
  }

  makeFileLevelOptimisticUniqueName(text: string): IdentifierNode {
    return this.makeUniqueName(text);
  }

  makeUniqueNameOfKind(text: string, kind: GeneratedIdentifierFlags): IdentifierNode {
    return {
      kind: 80,
      text: this.makeUniqueNameText(
        text,
        hasFlag(kind, GeneratedIdentifierFlags.Optimistic),
        hasFlag(kind, GeneratedIdentifierFlags.ReservedInNestedScopes),
        false,
        "",
        "",
      ),
    } as unknown as IdentifierNode;
  }

  getGeneratedNameForNode(node: AstNode, prefix: string, suffix: string): IdentifierNode {
    const existing = this.generatedNames.get(node);
    if (existing !== undefined) return { kind: 80, text: existing } as unknown as IdentifierNode;
    const name = this.generateNameForNode(node, GeneratedIdentifierFlags.Node, prefix, suffix);
    this.generatedNames.set(node, name);
    return { kind: 80, text: name } as unknown as IdentifierNode;
  }

  getGeneratedPrivateNameForNode(node: AstNode, prefix: string, suffix: string): IdentifierNode {
    const existing = this.generatedPrivateNames.get(node);
    if (existing !== undefined) return { kind: 81, text: existing } as unknown as IdentifierNode;
    const baseName = memberNameText(node) ?? nodeKindBaseName(node);
    const name = this.makeUniqueNameText(baseName, false, false, true, prefix, suffix);
    this.generatedPrivateNames.set(node, name);
    return { kind: 81, text: name } as unknown as IdentifierNode;
  }

  private makeTempVariableName(flags: TempFlags, reservedInNestedScopes: boolean, privateName: boolean, prefix: string, suffix: string): string {
    const simple = prefix.length === 0 && suffix.length === 0;
    const formattedNameKey = simple ? "" : formatGeneratedName(privateName, prefix, "", suffix);
    let tempFlags = simple
      ? this.getTempFlags(privateName)
      : this.getTempFlagsForFormattedName(privateName, formattedNameKey);
    if (flags !== TempFlags.Auto && (tempFlags & flags) === 0) {
      const fullName = formatGeneratedName(privateName, prefix, "_i", suffix);
      if (this.isUniqueName(fullName, privateName)) {
        tempFlags |= flags;
        this.reserveName(fullName, privateName, reservedInNestedScopes, true);
        this.setTempFlagsFor(simple, privateName, formattedNameKey, tempFlags);
        return fullName;
      }
    }
    while (true) {
      const count = tempFlags & TempFlags.CountMask;
      tempFlags += 1;
      if (count === 8 || count === 13) continue;
      const baseName = count < 26 ? `_${String.fromCharCode(97 + count)}` : `_${count - 26}`;
      const fullName = formatGeneratedName(privateName, prefix, baseName, suffix);
      if (!this.isUniqueName(fullName, privateName)) continue;
      this.reserveName(fullName, privateName, reservedInNestedScopes, true);
      this.setTempFlagsFor(simple, privateName, formattedNameKey, tempFlags);
      return fullName;
    }
  }

  private makeUniqueNameText(baseName: string, optimistic: boolean, scoped: boolean, privateName: boolean, prefix: string, suffix: string): string {
    const normalizedBaseName = removeLeadingHash(baseName);
    if (optimistic) {
      const optimisticName = formatGeneratedName(privateName, prefix, normalizedBaseName, suffix);
      if (this.isUniqueName(optimisticName, privateName)) {
        this.reserveName(optimisticName, privateName, scoped, false);
        return optimisticName;
      }
    }
    const counterBase = normalizedBaseName.length > 0 && !normalizedBaseName.endsWith("_") ? `${normalizedBaseName}_` : normalizedBaseName;
    let counter = this.nameCounters.get(counterBase) ?? 0;
    while (true) {
      counter += 1;
      const fullName = formatGeneratedName(privateName, prefix, `${counterBase}${counter}`, suffix);
      if (!this.isUniqueName(fullName, privateName)) continue;
      this.nameCounters.set(counterBase, counter);
      this.reserveName(fullName, privateName, scoped, false);
      return fullName;
    }
  }

  private reserveName(name: string, privateName: boolean, scoped: boolean, temp: boolean): void {
    const scope = this.activeScope(privateName);
    if (privateName || scoped) {
      scope.reservedNames.add(name);
      this.scopeReserved.add(name);
    } else if (!temp) {
      this.generatedNameTexts.add(name);
      this.reservedNames.add(name);
    } else {
      this.reservedNames.add(name);
    }
  }

  private isUniqueName(name: string, privateName: boolean): boolean {
    return !this.isReservedName(name, privateName);
  }

  private isReservedName(name: string, privateName: boolean): boolean {
    if (this.generatedNameTexts.has(name) || this.reservedNames.has(name)) return true;
    for (const scope of this.scopes(privateName)) if (scope.reservedNames.has(name)) return true;
    return false;
  }

  private getTempFlags(privateName: boolean): TempFlags {
    return this.activeScope(privateName).tempFlags;
  }

  private getTempFlagsForFormattedName(privateName: boolean, formattedNameKey: string): TempFlags {
    return this.activeScope(privateName).formattedNameTempFlags.get(formattedNameKey) ?? TempFlags.Auto;
  }

  private setTempFlagsFor(simple: boolean, privateName: boolean, formattedNameKey: string, flags: TempFlags): void {
    const scope = this.activeScope(privateName);
    if (simple) scope.tempFlags = flags;
    else scope.formattedNameTempFlags.set(formattedNameKey, flags);
  }

  private activeScope(privateName: boolean): NameGenerationScope {
    const scopes = this.scopes(privateName);
    if (scopes.length === 0) scopes.push(newNameGenerationScope());
    return scopes[scopes.length - 1]!;
  }

  private scopes(privateName: boolean): NameGenerationScope[] {
    return privateName ? this.privateNameGenerationScopes : this.nameGenerationScopes;
  }
}

export function newNameGenerator(): NameGenerator {
  return new NameGenerator();
}

function newNameGenerationScope(): NameGenerationScope {
  return {
    tempFlags: TempFlags.Auto,
    formattedNameTempFlags: new Map(),
    reservedNames: new Set(),
  };
}

function generatedIdentifierKind(flags: GeneratedIdentifierFlags): GeneratedIdentifierFlags {
  return flags & GeneratedIdentifierFlags.KindMask;
}

function hasFlag(flags: GeneratedIdentifierFlags, flag: GeneratedIdentifierFlags): boolean {
  return (flags & flag) !== 0;
}

function formatGeneratedName(privateName: boolean, prefix: string, baseName: string, suffix: string): string {
  const text = `${prefix}${baseName}${suffix}`;
  return privateName ? ensureLeadingHash(text) : text;
}

function ensureLeadingHash(text: string): string {
  return text.startsWith("#") ? text : `#${text}`;
}

function removeLeadingHash(text: string): string {
  return text.startsWith("#") ? text.slice(1) : text;
}

function memberNameText(node: AstNode): string | undefined {
  const text = (node as unknown as { readonly text?: string }).text;
  return text === undefined || text.length === 0 ? undefined : removeLeadingHash(text);
}

function nodeKindBaseName(node: AstNode): string {
  switch (node.kind) {
    case 264:
      return "module";
    case 265:
      return "class";
    case 262:
      return "function";
    case 266:
      return "enum";
    case 277:
      return "default";
    default:
      return "generated";
  }
}
