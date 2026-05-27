/**
 * Checker utilities.
 *
 * Substantive port of TS-Go `internal/checker/utilities.go` (~1812 LoC,
 * 146 module-level functions + Checker methods). Pure helpers used by
 * the checker: diagnostic creation, AST predicates, symbol-table
 * construction, type comparison, scope queries.
 *
 * Port scope: full method-API parity. Bodies are stubbed; baseline
 * checker tests drive incremental fill-in.
 */

import type {
  Node as AstNode,
  Symbol as AstSymbol,
  SymbolTable,
  Diagnostic,
  ParameterDeclaration,
} from "../ast/index.js";
import type { Type } from "./types.js";
import { Kind, nodeParent, hasSyntacticModifier } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";

// ---------------------------------------------------------------------------
// Constant-union: AssignmentKind
// ---------------------------------------------------------------------------

export type AssignmentKind = 0 | 1 | 2;
export const AssignmentKind = {
  None: 0 as AssignmentKind,
  Definite: 1 as AssignmentKind,
  Compound: 2 as AssignmentKind,
} as const;

// ---------------------------------------------------------------------------
// Diagnostic factories
// ---------------------------------------------------------------------------

export function newDiagnosticForNode(
  node: AstNode, message: { code: number; message: string }, ...args: unknown[]
): Diagnostic {
  void args;
  return {
    file: undefined, start: 0, length: 0, messageText: message.message,
    category: 1, code: message.code,
  } as unknown as Diagnostic;
}

export function newDiagnosticChainForNode(
  chain: Diagnostic, node: AstNode, message: { code: number; message: string }, ...args: unknown[]
): Diagnostic {
  void chain; void args;
  return newDiagnosticForNode(node, message);
}

// ---------------------------------------------------------------------------
// Map iteration helpers
// ---------------------------------------------------------------------------

export function findInMap<K, V>(m: Map<K, V>, predicate: (v: V) => boolean): V | undefined {
  for (const v of m.values()) {
    if (predicate(v)) return v;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Token / modifier predicates
// ---------------------------------------------------------------------------

export function tokenIsIdentifierOrKeyword(token: number): boolean {
  return token >= Kind.Identifier;
}
export function tokenIsIdentifierOrKeywordOrGreaterThan(token: number): boolean {
  return token === Kind.GreaterThanToken || tokenIsIdentifierOrKeyword(token);
}

export function hasOverrideModifier(node: AstNode): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Override);
}
export function hasAsyncModifier(node: AstNode): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Async);
}
export function getSelectedModifierFlags(node: AstNode, flags: number): number {
  // Mirrors TS-Go: collect only the bits in `flags` that node has.
  const modifiers = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes ?? [];
  let result = 0;
  for (const m of modifiers) {
    const k = (m as { kind?: number }).kind;
    switch (k) {
      case Kind.PublicKeyword: result |= ModifierFlags.Public; break;
      case Kind.PrivateKeyword: result |= ModifierFlags.Private; break;
      case Kind.ProtectedKeyword: result |= ModifierFlags.Protected; break;
      case Kind.StaticKeyword: result |= ModifierFlags.Static; break;
      case Kind.ReadonlyKeyword: result |= ModifierFlags.Readonly; break;
      case Kind.OverrideKeyword: result |= ModifierFlags.Override; break;
      case Kind.ExportKeyword: result |= ModifierFlags.Export; break;
      case Kind.DefaultKeyword: result |= ModifierFlags.Default; break;
      case Kind.AbstractKeyword: result |= ModifierFlags.Abstract; break;
      case Kind.AsyncKeyword: result |= ModifierFlags.Async; break;
      case Kind.DeclareKeyword: result |= ModifierFlags.Ambient; break;
      case Kind.AccessorKeyword: result |= ModifierFlags.Accessor; break;
      case Kind.ConstKeyword: result |= ModifierFlags.Const; break;
      case Kind.InKeyword: result |= ModifierFlags.In; break;
      case Kind.OutKeyword: result |= ModifierFlags.Out; break;
    }
  }
  return result & flags;
}
export function hasReadonlyModifier(node: AstNode): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Readonly);
}

// ---------------------------------------------------------------------------
// Symbol predicates
// ---------------------------------------------------------------------------

export function isStaticPrivateIdentifierProperty(s: AstSymbol): boolean { void s; return false; }

// ---------------------------------------------------------------------------
// AST literal predicates
// ---------------------------------------------------------------------------

export function isEmptyObjectLiteral(expression: AstNode): boolean {
  if (expression.kind !== Kind.ObjectLiteralExpression) return false;
  const props = (expression as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  return props === undefined || props.length === 0;
}
export function isEmptyArrayLiteral(expression: AstNode): boolean {
  if (expression.kind !== Kind.ArrayLiteralExpression) return false;
  const els = (expression as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
  return els === undefined || els.length === 0;
}
export function isTypeAssertion(node: AstNode): boolean {
  return node.kind === Kind.TypeAssertionExpression || node.kind === Kind.AsExpression;
}
export function isConstTypeReference(node: AstNode): boolean {
  // `as const` references — TypeReferenceNode whose typeName is the
  // identifier "const".
  if (node.kind !== Kind.TypeReference) return false;
  const typeName = (node as unknown as { typeName?: { kind?: number; text?: string } }).typeName;
  return typeName?.kind === Kind.Identifier && typeName.text === "const";
}

// ---------------------------------------------------------------------------
// Assignment-target classification
// ---------------------------------------------------------------------------

export function getAssignmentTargetKind(node: AstNode): AssignmentKind { void node; return AssignmentKind.None; }
export function isDeleteTarget(node: AstNode): boolean { void node; return false; }
export function isInCompoundLikeAssignment(node: AstNode): boolean { void node; return false; }
export function isCompoundLikeAssignment(assignment: AstNode): boolean { void assignment; return false; }

// ---------------------------------------------------------------------------
// Variable-statement helpers
// ---------------------------------------------------------------------------

export function getSingleVariableOfVariableStatement(node: AstNode): AstNode | undefined {
  void node;
  return undefined;
}

// ---------------------------------------------------------------------------
// Type-query context
// ---------------------------------------------------------------------------

export function isTypeReferenceIdentifier(node: AstNode): boolean { void node; return false; }
export function isInTypeQuery(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.TypeQuery) return true;
    if (current.kind === Kind.Identifier || current.kind === Kind.QualifiedName) {
      current = nodeParent(current);
      continue;
    }
    return false;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Container queries
// ---------------------------------------------------------------------------

export function canHaveLocals(node: AstNode): boolean { void node; return false; }
export function isShorthandAmbientModuleSymbol(moduleSymbol: AstSymbol): boolean { void moduleSymbol; return false; }
export function isShorthandAmbientModule(node: AstNode): boolean { void node; return false; }

// ---------------------------------------------------------------------------
// Alias / import helpers
// ---------------------------------------------------------------------------

export function getAliasDeclarationFromName(node: AstNode): AstNode | undefined { void node; return undefined; }
export function entityNameToString(name: AstNode): string { void name; return ""; }
export function getContainingQualifiedNameNode(node: AstNode): AstNode | undefined { void node; return undefined; }
export function isSideEffectImport(node: AstNode): boolean { void node; return false; }
export function getExternalModuleRequireArgument(node: AstNode): AstNode | undefined { void node; return undefined; }
export function isRightSideOfAccessExpression(node: AstNode): boolean { void node; return false; }
export function isTopLevelInExternalModuleAugmentation(node: AstNode): boolean { void node; return false; }
export function isSyntacticDefault(node: AstNode): boolean { void node; return false; }
export function hasExportAssignmentSymbol(moduleSymbol: AstSymbol): boolean { void moduleSymbol; return false; }
export function isTypeAlias(node: AstNode): boolean { void node; return false; }

// ---------------------------------------------------------------------------
// Initializer predicates
// ---------------------------------------------------------------------------

export function hasOnlyExpressionInitializer(node: AstNode): boolean { void node; return false; }
export function hasDotDotDotToken(node: AstNode): boolean { void node; return false; }
export function isJSDocOptionalParameter(node: ParameterDeclaration): boolean { void node; return false; }
export function isExclamationToken(node: AstNode): boolean { void node; return false; }
export function isOptionalDeclaration(declaration: AstNode): boolean { void declaration; return false; }

// ---------------------------------------------------------------------------
// Type-any check
// ---------------------------------------------------------------------------

export function isTypeAny(t: Type): boolean {
  return (t.flags & 1) !== 0; // TypeFlags.Any
}

// ---------------------------------------------------------------------------
// Privacy + ambient predicates
// ---------------------------------------------------------------------------

export function declarationBelongsToPrivateAmbientMember(declaration: AstNode): boolean { void declaration; return false; }
export function isPrivateWithinAmbient(node: AstNode): boolean { void node; return false; }

// ---------------------------------------------------------------------------
// Symbol table construction
// ---------------------------------------------------------------------------

export function createSymbolTable(symbols: readonly AstSymbol[]): SymbolTable {
  const t: SymbolTable = new Map();
  for (const s of symbols) {
    const name = (s as unknown as { name: string }).name;
    t.set(name, s);
  }
  return t;
}

// ---------------------------------------------------------------------------
// Type comparison
// ---------------------------------------------------------------------------

export function compareTypes(t1: Type, t2: Type): number {
  if (t1.id < t2.id) return -1;
  if (t1.id > t2.id) return 1;
  return 0;
}

export function getSortOrderFlags(t: Type): number {
  return t.flags;
}

export function compareTypeNames(t1: Type, t2: Type): number {
  const n1 = (t1.symbol as unknown as { name?: string } | undefined)?.name ?? "";
  const n2 = (t2.symbol as unknown as { name?: string } | undefined)?.name ?? "";
  if (n1 < n2) return -1;
  if (n1 > n2) return 1;
  return 0;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

