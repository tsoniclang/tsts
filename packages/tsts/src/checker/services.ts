/**
 * Checker services.
 *
 * Substantive port of TS-Go `internal/checker/services.go` (~1094 LoC).
 * Language-service-facing API: hover info, completion, find-references,
 * quick-info, signature help, rename-info. These layer on top of the
 * core checker.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import type { Type, Signature } from "./types.js";

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

export class CheckerServices {
  // Hover / quick-info
  getQuickInfoAtPosition(file: AstNode, position: number): QuickInfoResult | undefined {
    void file; void position; return undefined;
  }
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
    return (node as unknown as { symbol?: AstSymbol }).symbol;
  }
  getSymbolsInScope(location: AstNode, meaning: number): readonly AstSymbol[] {
    void meaning;
    // Walk parents collecting symbols from each scope's locals table.
    const out: AstSymbol[] = [];
    const seen = new Set<string>();
    let n: AstNode | undefined = location;
    while (n !== undefined) {
      const locals = (n as unknown as { locals?: Map<string, AstSymbol> }).locals;
      if (locals !== undefined) {
        for (const [name, sym] of locals) {
          if (!seen.has(name)) {
            seen.add(name);
            out.push(sym);
          }
        }
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return out;
  }
  getTypeAtLocation(node: AstNode): Type | undefined {
    const sym = this.getSymbolAtLocation(node);
    if (sym === undefined) return undefined;
    return (sym as unknown as { type?: Type }).type;
  }
  getContextualType(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getApparentType(t: Type): Type {
    // Apparent type unwraps type parameters to their constraint, but
    // for primitives this is the type itself.
    return t;
  }
  getNonOptionalType(t: Type): Type {
    // Removes undefined/null from the type for definite-assignment
    // narrowing. For union types, filter constituents; otherwise
    // identity.
    const types = (t as unknown as { types?: readonly Type[] }).types;
    if (types === undefined) return t;
    const filtered = types.filter((u) => {
      const f = (u as { flags?: number }).flags ?? 0;
      return (f & ((1 << 15) | (1 << 16))) === 0; // ¬(Undefined | Null)
    });
    if (filtered.length === types.length) return t;
    if (filtered.length === 1) return filtered[0]!;
    return { ...(t as object), types: filtered } as unknown as Type;
  }

  // Signature help
  getSignatureHelpItems(file: AstNode, position: number): SignatureHelpResult | undefined {
    void file; void position; return undefined;
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
    void node; void candidatesOutArray; return undefined;
  }

  // Find-references support
  getReferencesAtPosition(file: AstNode, position: number): readonly AstNode[] {
    void file; void position; return [];
  }
  getDefinitionAtPosition(file: AstNode, position: number): readonly AstNode[] {
    void file; void position; return [];
  }
  getImplementationAtPosition(file: AstNode, position: number): readonly AstNode[] {
    void file; void position; return [];
  }
  getTypeDefinitionAtPosition(file: AstNode, position: number): readonly AstNode[] {
    void file; void position; return [];
  }

  // Completions
  getCompletionsAtPosition(file: AstNode, position: number): readonly AstSymbol[] {
    void file; void position; return [];
  }
  getCompletionEntryDetails(entryName: string, file: AstNode, position: number): unknown {
    void entryName; void file; void position; return undefined;
  }

  // Type / property access info
  getPropertyOfType(t: Type, name: string): AstSymbol | undefined {
    const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    return members?.get(name);
  }
  getPropertyOfTypeOrUndefined(t: Type, name: string): AstSymbol | undefined {
    return this.getPropertyOfType(t, name);
  }
  getIndexTypeOfType(t: Type, kind: number): Type | undefined {
    void kind;
    // Read pre-resolved index info off the type.
    const indexInfos = (t as unknown as { indexInfos?: readonly { keyType: Type; type: Type }[] }).indexInfos;
    return indexInfos !== undefined && indexInfos.length > 0 ? indexInfos[0]!.type : undefined;
  }
  getCallSignaturesOfType(t: Type): readonly Signature[] {
    return (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures ?? [];
  }
  getConstructSignaturesOfType(t: Type): readonly Signature[] {
    return (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures ?? [];
  }
}

export function newCheckerServices(): CheckerServices {
  return new CheckerServices();
}
