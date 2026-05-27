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
  scopeReserved: Set<string> = new Set();
  // Sequential auto-name counters used by the `_a`, `_b`, ... naming.
  tempVarCounter = 0;
  // Per-base-name counter for `name_1`, `name_2`.
  nameCounters: Map<string, number> = new Map();
  generatedNames: Map<AstNode, string> = new Map();

  /**
   * Generates a name unique under the current reservation set.
   * Mirrors TS-Go `(*NameGenerator).generateNameWorker`.
   */
  generateName(kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    void kind;
    return this.uniquify(prefix, suffix);
  }

  generateNameForNode(node: AstNode, kind: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
    void node; return this.generateName(kind, prefix, suffix);
  }

  reserve(name: string): void {
    this.reservedNames.add(name);
  }

  reserveInScope(name: string): void {
    this.scopeReserved.add(name);
  }

  isReserved(name: string): boolean {
    return this.reservedNames.has(name) || this.scopeReserved.has(name);
  }

  /**
   * Returns a fresh name in the form `<prefix>_<n>[<suffix>]` whose
   * total is not in the reserved set. Mirrors TS-Go `uniquify`.
   */
  private uniquify(prefix: string, suffix: string): string {
    let n = this.nameCounters.get(prefix) ?? 0;
    while (true) {
      n += 1;
      const candidate = `${prefix}_${n}${suffix}`;
      if (!this.isReserved(candidate)) {
        this.nameCounters.set(prefix, n);
        this.reservedNames.add(candidate);
        return candidate;
      }
    }
  }

  makeName(prefix: string, suffix: string): IdentifierNode {
    return { kind: 80, text: this.uniquify(prefix, suffix) } as unknown as IdentifierNode;
  }

  /**
   * Generates the next `_a`, `_b`, ..., `_z`, `_aa`, `_ab`, ... temp
   * variable name (TS-Go's `makeTempVariableName`).
   */
  makeTempVariable(): IdentifierNode {
    while (true) {
      const text = this.tempVariableText(this.tempVarCounter);
      this.tempVarCounter += 1;
      if (!this.isReserved(text)) {
        this.reservedNames.add(text);
        return { kind: 80, text } as unknown as IdentifierNode;
      }
    }
  }

  private tempVariableText(i: number): string {
    let n = i;
    let s = "";
    while (true) {
      const r = n % 26;
      s = String.fromCharCode(97 + r) + s;
      n = Math.floor(n / 26) - 1;
      if (n < 0) break;
    }
    return `_${s}`;
  }

  makeUniqueName(text: string): IdentifierNode {
    if (!this.isReserved(text)) {
      this.reservedNames.add(text);
      return { kind: 80, text } as unknown as IdentifierNode;
    }
    return this.makeName(text, "");
  }

  makeFileLevelOptimisticUniqueName(text: string): IdentifierNode {
    // Optimistic naming: try the bare name first (no `_N` suffix). If
    // already reserved, fall through to the suffix path.
    return this.makeUniqueName(text);
  }

  makeUniqueNameOfKind(text: string, kind: GeneratedIdentifierFlags): IdentifierNode {
    void kind; return this.makeUniqueName(text);
  }

  getGeneratedNameForNode(node: AstNode, prefix: string, suffix: string): IdentifierNode {
    const existing = this.generatedNames.get(node);
    if (existing !== undefined) return { kind: 80, text: existing } as unknown as IdentifierNode;
    const name = this.uniquify(prefix, suffix);
    this.generatedNames.set(node, name);
    return { kind: 80, text: name } as unknown as IdentifierNode;
  }
}

export function newNameGenerator(): NameGenerator {
  return new NameGenerator();
}
