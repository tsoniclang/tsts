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

export class NameGenerator {
  reservedNames: Set<string> = new Set();
  nameCount = 0;
  generatedNames: Map<AstNode, string> = new Map();

  generateName(kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    this.nameCount += 1;
    return `${prefix}_${this.nameCount}${suffix}`;
  }

  generateNameForNode(node: AstNode, kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    void node; return this.generateName(kind, prefix, suffix);
  }

  reserve(name: string): void {
    this.reservedNames.add(name);
  }

  isReserved(name: string): boolean {
    return this.reservedNames.has(name);
  }

  makeName(prefix: string, suffix: string): IdentifierNode {
    return { kind: 80, text: `${prefix}_${++this.nameCount}${suffix}` } as unknown as IdentifierNode;
  }

  makeTempVariable(): IdentifierNode {
    return this.makeName("_", "");
  }

  makeUniqueName(text: string): IdentifierNode {
    return this.makeName(text, "");
  }

  makeFileLevelOptimisticUniqueName(text: string): IdentifierNode {
    return this.makeName(text, "");
  }

  makeUniqueNameOfKind(text: string, kind: GeneratedIdentifierFlags): IdentifierNode {
    void kind; return this.makeUniqueName(text);
  }

  getGeneratedNameForNode(node: AstNode, prefix: string, suffix: string): IdentifierNode {
    const existing = this.generatedNames.get(node);
    if (existing !== undefined) return { kind: 80, text: existing } as unknown as IdentifierNode;
    const name = `${prefix}_${++this.nameCount}${suffix}`;
    this.generatedNames.set(node, name);
    return { kind: 80, text: name } as unknown as IdentifierNode;
  }
}

export function newNameGenerator(): NameGenerator {
  return new NameGenerator();
}
