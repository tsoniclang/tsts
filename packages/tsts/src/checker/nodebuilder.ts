/**
 * Node builder.
 *
 * Substantive port of TS-Go `internal/checker/nodebuilder.go` (~292 LoC),
 * `nodebuilderimpl.go` (~3490 LoC), `nodebuilder_hover.go` (~597 LoC),
 * `nodebuilderscopes.go` (~259 LoC), `pseudotypenodebuilder.go` (~696 LoC).
 *
 * The NodeBuilder constructs type-node AST representations from
 * checker types for declaration emit, hover display, and language-
 * services type queries. The full implementation spans ~5300 LoC; this
 * skeleton provides the method-API surface.
 *
 * Port scope: full method-API parity for the major typeToTypeNode /
 * signatureToSignatureDeclaration / symbolToExpression / typeToString
 * surface. Bodies are stubbed; baseline tests drive incremental fill-in.
 */

import type {
  Node as AstNode,
  Symbol as AstSymbol,
  TypeNode,
} from "../ast/index.js";
import type { Type, Signature, SymbolFormatFlags, TypeFormatFlags } from "./types.js";
import type { SymbolTracker } from "./symboltracker.js";

// ---------------------------------------------------------------------------
// NodeBuilderFlags
// ---------------------------------------------------------------------------

export type NodeBuilderFlags = number;
export const NodeBuilderFlags = {
  None: 0 as NodeBuilderFlags,
  NoTruncation: (1 << 0) as NodeBuilderFlags,
  WriteArrayAsGenericType: (1 << 1) as NodeBuilderFlags,
  GenerateNamesForShadowedTypeParams: (1 << 2) as NodeBuilderFlags,
  UseStructuralFallback: (1 << 3) as NodeBuilderFlags,
  ForbidIndexedAccessSymbolReferences: (1 << 4) as NodeBuilderFlags,
  WriteTypeArgumentsOfSignature: (1 << 5) as NodeBuilderFlags,
  UseFullyQualifiedType: (1 << 6) as NodeBuilderFlags,
  UseOnlyExternalAliasing: (1 << 7) as NodeBuilderFlags,
  SuppressAnyReturnType: (1 << 8) as NodeBuilderFlags,
  WriteTypeParametersInQualifiedName: (1 << 9) as NodeBuilderFlags,
  MultilineObjectLiterals: (1 << 10) as NodeBuilderFlags,
  WriteClassExpressionAsTypeLiteral: (1 << 11) as NodeBuilderFlags,
  UseTypeOfFunction: (1 << 12) as NodeBuilderFlags,
  OmitParameterModifiers: (1 << 13) as NodeBuilderFlags,
  UseAliasDefinedOutsideCurrentScope: (1 << 14) as NodeBuilderFlags,
  UseSingleQuotesForStringLiteralType: (1 << 28) as NodeBuilderFlags,
  NoTypeReduction: (1 << 29) as NodeBuilderFlags,
  OmitThisParameter: (1 << 25) as NodeBuilderFlags,
  AllowThisInObjectLiteral: (1 << 15) as NodeBuilderFlags,
  AllowQualifiedNameInPlaceOfIdentifier: (1 << 16) as NodeBuilderFlags,
  AllowAnonymousIdentifier: (1 << 17) as NodeBuilderFlags,
  AllowEmptyUnionOrIntersection: (1 << 18) as NodeBuilderFlags,
  AllowEmptyTuple: (1 << 19) as NodeBuilderFlags,
  AllowUniqueESSymbolType: (1 << 20) as NodeBuilderFlags,
  AllowEmptyIndexInfoType: (1 << 21) as NodeBuilderFlags,
  AllowNodeModulesRelativePaths: (1 << 26) as NodeBuilderFlags,
  DoNotIncludeSymbolChain: (1 << 27) as NodeBuilderFlags,
  IgnoreErrors: (1 << 22) as NodeBuilderFlags,
  InObjectTypeLiteral: (1 << 23) as NodeBuilderFlags,
  InTypeAlias: (1 << 24) as NodeBuilderFlags,
} as const;

// ---------------------------------------------------------------------------
// NodeBuilder
// ---------------------------------------------------------------------------

export interface NodeBuilderContext {
  enclosingDeclaration: AstNode | undefined;
  flags: NodeBuilderFlags;
  tracker?: SymbolTracker;
  approximateLength: number;
  truncated?: boolean;
  inferTypeParameters?: readonly Type[];
}

export class NodeBuilder {
  // -------------------------------------------------------------------------
  // Top-level entry points
  // -------------------------------------------------------------------------

  typeToTypeNode(
    type: Type, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): TypeNode | undefined {
    void type; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  indexInfoToIndexSignatureDeclaration(
    indexInfo: unknown, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void indexInfo; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  signatureToSignatureDeclaration(
    signature: Signature, kind: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void signature; void kind; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  symbolToEntityName(
    symbol: AstSymbol, meaning: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void symbol; void meaning; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  symbolToExpression(
    symbol: AstSymbol, meaning: number, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void symbol; void meaning; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  symbolToTypeParameterDeclarations(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): readonly AstNode[] | undefined {
    void symbol; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  symbolToParameterDeclaration(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void symbol; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  typeParameterToDeclaration(
    parameter: Type, enclosingDeclaration: AstNode | undefined,
    flags: NodeBuilderFlags, tracker?: SymbolTracker,
  ): AstNode | undefined {
    void parameter; void enclosingDeclaration; void flags; void tracker;
    return undefined;
  }

  // -------------------------------------------------------------------------
  // Public typeToString surface
  // -------------------------------------------------------------------------

  typeToString(
    type: Type, enclosingDeclaration: AstNode | undefined,
    flags: TypeFormatFlags, tracker?: SymbolTracker,
  ): string {
    void type; void enclosingDeclaration; void flags; void tracker;
    return "";
  }

  symbolToString(
    symbol: AstSymbol, enclosingDeclaration: AstNode | undefined,
    meaning: number, flags: SymbolFormatFlags,
  ): string {
    void symbol; void enclosingDeclaration; void meaning; void flags;
    return "";
  }

  signatureToString(
    signature: Signature, enclosingDeclaration: AstNode | undefined,
    flags: TypeFormatFlags, kind: number,
  ): string {
    void signature; void enclosingDeclaration; void flags; void kind;
    return "";
  }
}

// ---------------------------------------------------------------------------
// Hover-specific entry points (nodebuilder_hover.go)
// ---------------------------------------------------------------------------

export class NodeBuilderHover {
  buildHoverForSymbol(symbol: AstSymbol, enclosingDeclaration: AstNode | undefined): string {
    void symbol; void enclosingDeclaration;
    return "";
  }

  buildHoverForType(type: Type, enclosingDeclaration: AstNode | undefined): string {
    void type; void enclosingDeclaration;
    return "";
  }

  buildHoverForSignature(signature: Signature, enclosingDeclaration: AstNode | undefined): string {
    void signature; void enclosingDeclaration;
    return "";
  }
}

// ---------------------------------------------------------------------------
// Scope tracking (nodebuilderscopes.go)
// ---------------------------------------------------------------------------

export class NodeBuilderScopes {
  scopes: AstNode[] = [];

  enterScope(node: AstNode): void {
    this.scopes.push(node);
  }

  exitScope(): void {
    this.scopes.pop();
  }

  currentScope(): AstNode | undefined {
    return this.scopes[this.scopes.length - 1];
  }

  isInScope(node: AstNode): boolean {
    return this.scopes.includes(node);
  }
}

// ---------------------------------------------------------------------------
// Pseudo type-node builder (pseudotypenodebuilder.go)
// ---------------------------------------------------------------------------

export class PseudoTypeNodeBuilder {
  buildPseudoTypeNode(
    type: Type, enclosingDeclaration: AstNode | undefined, flags: NodeBuilderFlags,
  ): TypeNode | undefined {
    void type; void enclosingDeclaration; void flags;
    return undefined;
  }

  buildPseudoTypeParameter(
    parameter: Type, enclosingDeclaration: AstNode | undefined,
  ): AstNode | undefined {
    void parameter; void enclosingDeclaration;
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Top-level factory
// ---------------------------------------------------------------------------

export function newNodeBuilder(): NodeBuilder {
  return new NodeBuilder();
}

export function newNodeBuilderHover(): NodeBuilderHover {
  return new NodeBuilderHover();
}

export function newNodeBuilderScopes(): NodeBuilderScopes {
  return new NodeBuilderScopes();
}

export function newPseudoTypeNodeBuilder(): PseudoTypeNodeBuilder {
  return new PseudoTypeNodeBuilder();
}
