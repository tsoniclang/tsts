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
  // Locate the containing SourceFile and resolve pos/length from the
  // node so callers get a diagnostic anchored at the right location.
  let sf: AstNode | undefined = node;
  while (sf !== undefined && (sf as { kind?: number }).kind !== Kind.SourceFile) {
    sf = (sf as unknown as { parent?: AstNode }).parent;
  }
  const pos = (node as unknown as { pos?: number }).pos ?? 0;
  const end = (node as unknown as { end?: number }).end ?? pos;
  const formatted = formatDiagnosticMessage(message.message, args);
  return {
    file: sf, start: pos, length: Math.max(0, end - pos),
    messageText: formatted, category: 1, code: message.code,
  } as unknown as Diagnostic;
}

export function newDiagnosticChainForNode(
  chain: Diagnostic, node: AstNode, message: { code: number; message: string }, ...args: unknown[]
): Diagnostic {
  // Build a chained diagnostic: the new message is the head, the
  // previous diagnostic becomes the .next link (matches ts-go's
  // DiagnosticMessageChain shape).
  const base = newDiagnosticForNode(node, message, ...args);
  (base as unknown as { next?: Diagnostic }).next = chain;
  return base;
}

function formatDiagnosticMessage(template: string, args: readonly unknown[]): string {
  // Interpolate {0}, {1}, … placeholders with String(args[i]).
  return template.replace(/\{(\d+)\}/g, (_match, idx) => {
    const i = Number(idx);
    return i < args.length ? String(args[i]) : `{${idx}}`;
  });
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

export function isStaticPrivateIdentifierProperty(s: AstSymbol): boolean {
  const decls = (s as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  for (const d of decls) {
    if (d.kind !== Kind.PropertyDeclaration) continue;
    if (!isPrivateIdentifierClassElementDeclaration(d)) continue;
    if (hasSyntacticModifier(d, ModifierFlags.Static)) return true;
  }
  return false;
}

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

export function getAssignmentTargetKind(node: AstNode): AssignmentKind {
  // Walk up parents looking for an assignment expression that has this
  // node on its left side. Mirrors TS-Go `getAssignmentTargetKind`.
  let parent: AstNode | undefined = nodeParent(node);
  while (parent !== undefined) {
    if (parent.kind === Kind.BinaryExpression) {
      const op = (parent as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      const left = (parent as unknown as { left?: AstNode }).left;
      if (op !== undefined && left === node) {
        if (op === Kind.EqualsToken) return AssignmentKind.Definite;
        if (op >= Kind.PlusEqualsToken && op <= Kind.CaretEqualsToken) return AssignmentKind.Compound;
      }
      return AssignmentKind.None;
    }
    if (parent.kind === Kind.PrefixUnaryExpression || parent.kind === Kind.PostfixUnaryExpression) {
      const op = (parent as unknown as { operator?: number }).operator;
      if (op === Kind.PlusPlusToken || op === Kind.MinusMinusToken) return AssignmentKind.Compound;
      return AssignmentKind.None;
    }
    if (parent.kind === Kind.ForInStatement || parent.kind === Kind.ForOfStatement) {
      const init = (parent as unknown as { initializer?: AstNode }).initializer;
      return init === node ? AssignmentKind.Definite : AssignmentKind.None;
    }
    if (parent.kind === Kind.ParenthesizedExpression
        || parent.kind === Kind.ArrayLiteralExpression
        || parent.kind === Kind.SpreadElement
        || parent.kind === Kind.NonNullExpression) {
      node = parent;
      parent = nodeParent(parent);
      continue;
    }
    return AssignmentKind.None;
  }
  return AssignmentKind.None;
}
export function isDeleteTarget(node: AstNode): boolean {
  const parent = nodeParent(node);
  return parent !== undefined && parent.kind === Kind.DeleteExpression;
}
export function isInCompoundLikeAssignment(node: AstNode): boolean {
  return getAssignmentTargetKind(node) === AssignmentKind.Compound;
}
export function isCompoundLikeAssignment(assignment: AstNode): boolean {
  if (assignment.kind !== Kind.BinaryExpression) return false;
  const op = (assignment as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  return op !== undefined && op >= Kind.PlusEqualsToken && op <= Kind.CaretEqualsToken;
}

// ---------------------------------------------------------------------------
// Variable-statement helpers
// ---------------------------------------------------------------------------

export function getSingleVariableOfVariableStatement(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.VariableStatement) return undefined;
  const list = (node as unknown as { declarationList?: { declarations?: { nodes?: readonly AstNode[] } } }).declarationList;
  const decls = list?.declarations?.nodes;
  if (decls === undefined || decls.length !== 1) return undefined;
  return decls[0];
}

// ---------------------------------------------------------------------------
// Type-query context
// ---------------------------------------------------------------------------

export function isTypeReferenceIdentifier(node: AstNode): boolean {
  // True for identifiers/qualified-names appearing inside TypeReference.
  let current: AstNode | undefined = node;
  while (current !== undefined
      && (current.kind === Kind.Identifier || current.kind === Kind.QualifiedName)) {
    const parent = nodeParent(current);
    if (parent === undefined) return false;
    if (parent.kind === Kind.TypeReference) return true;
    current = parent;
  }
  return false;
}
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

export function canHaveLocals(node: AstNode): boolean {
  // Mirrors ts-go canHaveLocals: container-like kinds that get a
  // SymbolTable for their lexical scope.
  switch (node.kind) {
    case Kind.ArrowFunction:
    case Kind.Block:
    case Kind.CallSignature:
    case Kind.CaseBlock:
    case Kind.CatchClause:
    case Kind.ClassStaticBlockDeclaration:
    case Kind.ConditionalType:
    case Kind.Constructor:
    case Kind.ConstructorType:
    case Kind.ConstructSignature:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.ForStatement:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.FunctionType:
    case Kind.GetAccessor:
    case Kind.IndexSignature:
    case Kind.JSDocSignature:
    case Kind.JSDocTypedefTag:
    case Kind.JSDocCallbackTag:
    case Kind.MappedType:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.ModuleDeclaration:
    case Kind.SetAccessor:
    case Kind.SourceFile:
    case Kind.TypeAliasDeclaration:
      return true;
  }
  return false;
}
export function isShorthandAmbientModuleSymbol(moduleSymbol: AstSymbol): boolean {
  const decls = (moduleSymbol as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  for (const d of decls) {
    if (isShorthandAmbientModule(d)) return true;
  }
  return false;
}
export function isShorthandAmbientModule(node: AstNode): boolean {
  // Module declaration without a body — `declare module "x";`.
  if (node.kind !== Kind.ModuleDeclaration) return false;
  return (node as unknown as { body?: AstNode }).body === undefined;
}

// ---------------------------------------------------------------------------
// Alias / import helpers
// ---------------------------------------------------------------------------

export function getAliasDeclarationFromName(node: AstNode): AstNode | undefined {
  // Walks up from an identifier looking for the import/export
  // declaration that introduces it as an alias.
  let parent: AstNode | undefined = nodeParent(node);
  while (parent !== undefined) {
    switch (parent.kind) {
      case Kind.ImportClause:
      case Kind.NamespaceImport:
      case Kind.NamespaceExport:
      case Kind.ImportSpecifier:
      case Kind.ExportSpecifier:
      case Kind.ImportEqualsDeclaration:
      case Kind.NamespaceExportDeclaration:
        return parent;
    }
    parent = nodeParent(parent);
  }
  return undefined;
}
export function entityNameToString(name: AstNode): string {
  if (name.kind === Kind.Identifier) return (name as unknown as { text?: string }).text ?? "";
  if (name.kind === Kind.QualifiedName) {
    const left = (name as unknown as { left?: AstNode }).left;
    const right = (name as unknown as { right?: { text?: string } }).right;
    return `${left !== undefined ? entityNameToString(left) : ""}.${right?.text ?? ""}`;
  }
  return (name as unknown as { text?: string }).text ?? "";
}
export function getContainingQualifiedNameNode(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    const parent = nodeParent(current);
    if (parent === undefined || parent.kind !== Kind.QualifiedName) return current;
    current = parent;
  }
  return current;
}
export function isSideEffectImport(node: AstNode): boolean {
  if (node.kind !== Kind.ImportDeclaration) return false;
  return (node as unknown as { importClause?: AstNode }).importClause === undefined;
}
export function getExternalModuleRequireArgument(node: AstNode): AstNode | undefined {
  // For `import x = require("path")`, returns the StringLiteral "path".
  if (node.kind !== Kind.ImportEqualsDeclaration) return undefined;
  const mr = (node as unknown as { moduleReference?: { kind?: number; expression?: AstNode } }).moduleReference;
  if (mr?.kind === Kind.ExternalModuleReference) return mr.expression;
  return undefined;
}
export function isRightSideOfAccessExpression(node: AstNode): boolean {
  const parent = nodeParent(node);
  if (parent === undefined) return false;
  if (parent.kind === Kind.PropertyAccessExpression) {
    return (parent as unknown as { name?: AstNode }).name === node;
  }
  if (parent.kind === Kind.ElementAccessExpression) {
    return (parent as unknown as { argumentExpression?: AstNode }).argumentExpression === node;
  }
  return false;
}
export function isTopLevelInExternalModuleAugmentation(node: AstNode): boolean {
  const parent = nodeParent(node);
  if (parent === undefined || parent.kind !== Kind.ModuleBlock) return false;
  const grandparent = nodeParent(parent);
  return grandparent !== undefined && grandparent.kind === Kind.ModuleDeclaration;
}
export function isSyntacticDefault(node: AstNode): boolean {
  if (node.kind === Kind.ExportAssignment) {
    return (node as unknown as { isExportEquals?: boolean }).isExportEquals !== true;
  }
  return hasSyntacticModifier(node, ModifierFlags.Default);
}
export function hasExportAssignmentSymbol(moduleSymbol: AstSymbol): boolean {
  const exports = (moduleSymbol as unknown as { exports?: SymbolTable }).exports;
  return exports !== undefined && exports.has("export=");
}
export function isTypeAlias(node: AstNode): boolean {
  return node.kind === Kind.TypeAliasDeclaration;
}

// ---------------------------------------------------------------------------
// Initializer predicates
// ---------------------------------------------------------------------------

export function hasOnlyExpressionInitializer(node: AstNode): boolean {
  // True when the node has an .initializer that's an expression (not
  // a binding-pattern initializer). Mirrors ts-go.
  const k = node.kind;
  if (k !== Kind.VariableDeclaration && k !== Kind.Parameter
      && k !== Kind.BindingElement && k !== Kind.PropertyDeclaration
      && k !== Kind.PropertyAssignment && k !== Kind.EnumMember) {
    return false;
  }
  return (node as unknown as { initializer?: AstNode }).initializer !== undefined;
}
export function hasDotDotDotToken(node: AstNode): boolean {
  return (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}
export function isJSDocOptionalParameter(node: ParameterDeclaration): boolean {
  // Optional parameter via @param tag — needs JSDoc port. Conservative
  // false until that lands.
  void node;
  return false;
}
export function isExclamationToken(node: AstNode): boolean {
  return node.kind === Kind.ExclamationToken;
}
export function isOptionalDeclaration(declaration: AstNode): boolean {
  // Optional declaration via `?` token. Covers parameter, property, method.
  const qm = (declaration as unknown as { questionToken?: AstNode }).questionToken;
  return qm !== undefined;
}

// ---------------------------------------------------------------------------
// Type-any check
// ---------------------------------------------------------------------------

export function isTypeAny(t: Type): boolean {
  return (t.flags & 1) !== 0; // TypeFlags.Any
}

// ---------------------------------------------------------------------------
// Privacy + ambient predicates
// ---------------------------------------------------------------------------

export function declarationBelongsToPrivateAmbientMember(declaration: AstNode): boolean {
  const root = getRootDeclaration(declaration);
  const memberDecl = root.kind === Kind.Parameter ? nodeParent(root) : root;
  return memberDecl !== undefined && isPrivateWithinAmbient(memberDecl);
}
function getRootDeclaration(node: AstNode): AstNode {
  let cur = node;
  while (cur.kind === Kind.BindingElement) {
    const p = nodeParent(cur);
    if (p === undefined) break;
    const pp = nodeParent(p);
    if (pp === undefined) break;
    cur = pp;
  }
  return cur;
}
export function isPrivateWithinAmbient(node: AstNode): boolean {
  return (hasSyntacticModifier(node, ModifierFlags.Private)
    || isPrivateIdentifierClassElementDeclaration(node))
    && hasSyntacticModifier(node, ModifierFlags.Ambient);
}
function isPrivateIdentifierClassElementDeclaration(node: AstNode): boolean {
  const k = node.kind;
  if (k !== Kind.PropertyDeclaration && k !== Kind.MethodDeclaration
      && k !== Kind.GetAccessor && k !== Kind.SetAccessor) {
    return false;
  }
  const name = (node as unknown as { name?: AstNode }).name;
  return name !== undefined && name.kind === Kind.PrivateIdentifier;
}

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

