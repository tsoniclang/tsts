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
import type { int } from "@tsonic/core/types.js";
import type { IndexInfo, Signature, Type, TypeMapper, TypeParameter } from "./types.js";
import {
  Kind,
  NodeFlags,
  SymbolFlags,
  getCombinedModifierFlags,
  nodeParent,
  hasSyntacticModifier,
} from "../ast/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { MapperKind } from "./mapper.js";
import { pseudoBigIntToString, type PseudoBigInt } from "../jsnum/index.js";

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
  const pos = (node as unknown as { pos?: number }).pos ?? 0;
  const end = (node as unknown as { end?: number }).end ?? pos;
  const formatted = formatDiagnosticMessage(message.message, args);
  const diagnosticMessage = {
    key: message.message,
    code: message.code,
    category: DiagnosticCategory.Error,
    message: formatted,
  };
  return {
    message: diagnosticMessage,
    start: pos,
    length: Math.max(0, end - pos),
    category: DiagnosticCategory.Error,
    code: message.code,
    text: formatted,
  };
}

export function newDiagnosticChainForNode(
  chain: Diagnostic, node: AstNode, message: { code: number; message: string }, ...args: unknown[]
): Diagnostic {
  // Build a chained diagnostic: the new message is the head, the
  // previous diagnostic becomes the .next link (matches ts-go's
  // DiagnosticMessageChain shape).
  const base = newDiagnosticForNode(node, message, ...args);
  return { ...base, chainedDiagnostics: [chain] };
}

function formatDiagnosticMessage(template: string, args: readonly unknown[]): string {
  // Interpolate {0}, {1}, … placeholders with String(args[i]).
  return template.replace(/\{(\d+)\}/g, (_match, idx) => {
    const i: int = Number(idx) | 0;
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
  const s1 = getTypeNameSymbol(t1);
  const s2 = getTypeNameSymbol(t2);
  if (s1 === s2) {
    const a1 = t1.aliasTypeArguments ?? [];
    const a2 = t2.aliasTypeArguments ?? [];
    return compareTypeLists(a1, a2);
  }
  if (s1 === undefined) return 1;
  if (s2 === undefined) return -1;
  const n1 = symbolName(s1);
  const n2 = symbolName(s2);
  if (n1 < n2) return -1;
  if (n1 > n2) return 1;
  return 0;
}

export function getTypeNameSymbol(t: Type): AstSymbol | undefined {
  if (t.aliasSymbol !== undefined) return t.aliasSymbol;
  const objectFlags = objectFlagsOf(t);
  if ((t.flags & (TypeFlags.TypeParameter | TypeFlags.StringMapping)) !== 0
      || (objectFlags & (ObjectFlags.ClassOrInterface | ObjectFlags.Reference)) !== 0) {
    return t.symbol;
  }
  return undefined;
}

export function getObjectTypeName(t: Type): AstSymbol | undefined {
  return (objectFlagsOf(t) & (ObjectFlags.ClassOrInterface | ObjectFlags.Reference)) !== 0 ? t.symbol : undefined;
}

export function compareTypeLists(s1: readonly Type[] | undefined, s2: readonly Type[] | undefined): number {
  const a = s1 ?? [];
  const b = s2 ?? [];
  if (a.length !== b.length) return a.length - b.length;
  for (let i = 0; i < a.length; i += 1) {
    const c = compareTypes(a[i]!, b[i]!);
    if (c !== 0) return c;
  }
  return 0;
}

export function compareTupleTypes(t1: Type, t2: Type): number {
  if (t1 === t2) return 0;
  const a = t1.data as { readonly?: boolean; elementInfo?: readonly { flags: number; labeledDeclaration?: AstNode }[] } | undefined;
  const b = t2.data as { readonly?: boolean; elementInfo?: readonly { flags: number; labeledDeclaration?: AstNode }[] } | undefined;
  if ((a?.readonly ?? false) !== (b?.readonly ?? false)) return (a?.readonly ?? false) ? 1 : -1;
  const ae = a?.elementInfo ?? [];
  const be = b?.elementInfo ?? [];
  if (ae.length !== be.length) return ae.length - be.length;
  for (let i = 0; i < ae.length; i += 1) {
    const c = (ae[i]?.flags ?? 0) - (be[i]?.flags ?? 0);
    if (c !== 0) return c;
  }
  for (let i = 0; i < ae.length; i += 1) {
    const c = compareElementLabels(ae[i]?.labeledDeclaration, be[i]?.labeledDeclaration);
    if (c !== 0) return c;
  }
  return 0;
}

export function compareElementLabels(n1: AstNode | undefined, n2: AstNode | undefined): number {
  if (n1 === n2) return 0;
  if (n1 === undefined) return -1;
  if (n2 === undefined) return 1;
  return textOfName(nameOf(n1)).localeCompare(textOfName(nameOf(n2)));
}

export function compareTypeMappers(m1: TypeMapper | undefined, m2: TypeMapper | undefined): number {
  if (m1 === m2) return 0;
  if (m1 === undefined) return 1;
  if (m2 === undefined) return -1;
  if (m1.kind !== m2.kind) return m1.kind - m2.kind;
  switch (m1.kind) {
    case MapperKind.Simple:
      return compareOptionalTypes(m1.sources?.[0], m2.sources?.[0])
        || compareOptionalTypes(m1.targets?.[0], m2.targets?.[0]);
    case MapperKind.Array:
    case MapperKind.ArrayToSingle:
      return compareTypeLists(m1.sources, m2.sources)
        || compareTypeLists(m1.targets, m2.targets);
    case MapperKind.Merged:
      return compareTypeMappers(m1.mapper1, m2.mapper1)
        || compareTypeMappers(m1.mapper2, m2.mapper2);
    default:
      return 0;
  }
}

export function getDeclarationModifierFlagsFromSymbol(s: AstSymbol): ModifierFlags {
  return getDeclarationModifierFlagsFromSymbolEx(s, false);
}

export function getDeclarationModifierFlagsFromSymbolEx(s: AstSymbol, isWrite: boolean): ModifierFlags {
  const declarations = symbolDeclarations(s);
  const valueDeclaration = valueDeclarationOf(s) ?? declarations[0];
  if (valueDeclaration !== undefined) {
    let declaration: AstNode | undefined;
    if (isWrite) declaration = declarations.find((d) => d.kind === Kind.SetAccessor);
    if (declaration === undefined && ((symbolFlags(s) & SymbolFlags.GetAccessor) !== 0)) {
      declaration = declarations.find((d) => d.kind === Kind.GetAccessor);
    }
    declaration ??= valueDeclaration;
    const flags = getCombinedModifierFlags(declaration);
    const parent = (s as unknown as { parent?: AstSymbol }).parent;
    if (parent !== undefined && (symbolFlags(parent) & SymbolFlags.Class) !== 0) return flags;
    return flags & ~ModifierFlags.AccessibilityModifier;
  }

  const checkFlags = (s as unknown as { checkFlags?: number }).checkFlags ?? 0;
  if ((checkFlags & CheckFlagsSynthetic) !== 0) {
    let accessModifier = ModifierFlags.Protected;
    if ((checkFlags & CheckFlagsContainsPrivate) !== 0) accessModifier = ModifierFlags.Private;
    else if ((checkFlags & CheckFlagsContainsPublic) !== 0) accessModifier = ModifierFlags.Public;
    const staticModifier = (checkFlags & CheckFlagsContainsStatic) !== 0 ? ModifierFlags.Static : ModifierFlags.None;
    return accessModifier | staticModifier;
  }
  if ((symbolFlags(s) & SymbolFlags.Prototype) !== 0) return ModifierFlags.Public | ModifierFlags.Static;
  return ModifierFlags.None;
}

export function isExponentiationOperator(kind: number): boolean {
  return kind === Kind.AsteriskAsteriskToken;
}

export function isMultiplicativeOperator(kind: number): boolean {
  return kind === Kind.AsteriskToken || kind === Kind.SlashToken || kind === Kind.PercentToken;
}

export function isMultiplicativeOperatorOrHigher(kind: number): boolean {
  return isExponentiationOperator(kind) || isMultiplicativeOperator(kind);
}

export function isAdditiveOperator(kind: number): boolean {
  return kind === Kind.PlusToken || kind === Kind.MinusToken;
}

export function isAdditiveOperatorOrHigher(kind: number): boolean {
  return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind);
}

export function isShiftOperator(kind: number): boolean {
  return kind === Kind.LessThanLessThanToken
    || kind === Kind.GreaterThanGreaterThanToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanToken;
}

export function isShiftOperatorOrHigher(kind: number): boolean {
  return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind);
}

export function isRelationalOperator(kind: number): boolean {
  return kind === Kind.LessThanToken
    || kind === Kind.LessThanEqualsToken
    || kind === Kind.GreaterThanToken
    || kind === Kind.GreaterThanEqualsToken
    || kind === Kind.InstanceOfKeyword
    || kind === Kind.InKeyword;
}

export function isRelationalOperatorOrHigher(kind: number): boolean {
  return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind);
}

export function isEqualityOperator(kind: number): boolean {
  return kind === Kind.EqualsEqualsToken
    || kind === Kind.EqualsEqualsEqualsToken
    || kind === Kind.ExclamationEqualsToken
    || kind === Kind.ExclamationEqualsEqualsToken;
}

export function isEqualityOperatorOrHigher(kind: number): boolean {
  return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind);
}

export function isBitwiseOperator(kind: number): boolean {
  return kind === Kind.AmpersandToken || kind === Kind.BarToken || kind === Kind.CaretToken;
}

export function isBitwiseOperatorOrHigher(kind: number): boolean {
  return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind);
}

export function isLogicalOperatorOrHigher(kind: number): boolean {
  return kind === Kind.AmpersandAmpersandToken || kind === Kind.BarBarToken || isBitwiseOperatorOrHigher(kind);
}

export function isAssignmentOperatorOrHigher(kind: number): boolean {
  return kind === Kind.QuestionQuestionToken || isLogicalOperatorOrHigher(kind) || isAssignmentOperatorKind(kind);
}

export function isBinaryOperator(kind: number): boolean {
  return isAssignmentOperatorOrHigher(kind) || kind === Kind.CommaToken;
}

export function isObjectLiteralType(t: Type): boolean {
  return (objectFlagsOf(t) & ObjectFlags.ObjectLiteral) !== 0;
}

export function isDeclarationReadonly(declaration: AstNode): boolean {
  return (getCombinedModifierFlags(declaration) & ModifierFlags.Readonly) !== 0
    && !isParameterPropertyDeclaration(declaration);
}

export class OrderedSet<T> {
  private readonly valuesByKey = new Set<T>();
  readonly values: T[] = [];

  contains(value: T): boolean {
    return this.valuesByKey.has(value);
  }

  add(value: T): void {
    if (this.valuesByKey.has(value)) return;
    this.valuesByKey.add(value);
    this.values.push(value);
  }
}

export function getContainingFunctionOrClassStaticBlock(node: AstNode): AstNode | undefined {
  let current = nodeParent(node);
  while (current !== undefined) {
    if (isFunctionLikeOrClassStaticBlockDeclaration(current)) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function isNodeDescendantOf(node: AstNode | undefined, ancestor: AstNode): boolean {
  let current = node;
  while (current !== undefined) {
    if (current === ancestor) return true;
    current = nodeParent(current);
  }
  return false;
}

export function isTypeUsableAsPropertyName(t: Type): boolean {
  return (t.flags & TypeFlags.StringOrNumberLiteralOrUnique) !== 0;
}

export function getPropertyNameFromType(t: Type): string {
  if ((t.flags & TypeFlags.StringLiteral) !== 0) return String(literalValue(t));
  if ((t.flags & TypeFlags.NumberLiteral) !== 0) return String(literalValue(t));
  if ((t.flags & TypeFlags.UniqueESSymbol) !== 0) return (t.data as { escapedName?: string } | undefined)?.escapedName ?? symbolName(t.symbol);
  throw new Error("Unhandled case in getPropertyNameFromType");
}

export function isNumericLiteralName(name: string): boolean {
  if (name.trim() !== name || name === "") return false;
  const numeric = Number(name);
  if (Number.isNaN(numeric)) return name === "NaN";
  return String(numeric) === name;
}

export function isThisProperty(node: AstNode): boolean {
  return isAccessExpressionKind(node.kind) && expressionOf(node)?.kind === Kind.ThisKeyword;
}

export function isValidNumberString(s: string, roundTripOnly: boolean): boolean {
  if (s === "") return false;
  const n = Number(s);
  return Number.isFinite(n) && (!roundTripOnly || String(n) === s);
}

export function isValidBigIntString(s: string, roundTripOnly: boolean): boolean {
  if (s === "") return false;
  if (s.includes("_")) return false;
  let text = s;
  let negative = false;
  if (text.startsWith("-")) {
    negative = true;
    text = text.slice(1);
  }
  if (text === "") return false;
  try {
    const value = BigInt(text);
    return !roundTripOnly || (negative ? "-" : "") + value.toString() === s;
  } catch {
    return false;
  }
}

export function isValidESSymbolDeclaration(node: AstNode): boolean {
  if (node.kind === Kind.VariableDeclaration) {
    return isVarConst(node) && nameOf(node)?.kind === Kind.Identifier && isVariableDeclarationInVariableStatement(node);
  }
  if (node.kind === Kind.PropertyDeclaration) {
    return hasReadonlyModifier(node) && hasSyntacticModifier(node, ModifierFlags.Static);
  }
  return node.kind === Kind.PropertySignature && hasReadonlyModifier(node);
}

export function isVariableDeclarationInVariableStatement(node: AstNode): boolean {
  return nodeParent(node)?.kind === Kind.VariableDeclarationList
    && parentOf(nodeParent(node))?.kind === Kind.VariableStatement;
}

export function isKnownSymbol(symbol: AstSymbol): boolean {
  return isLateBoundName(symbolName(symbol));
}

export function isPrivateIdentifierSymbol(symbol: AstSymbol | undefined): boolean {
  return symbol !== undefined && symbolName(symbol).startsWith("__#");
}

export function isLateBoundName(name: string): boolean {
  return name.length >= 2 && name.charCodeAt(0) === 0xfe && name[1] === "@";
}

export function isObjectOrArrayLiteralType(t: Type): boolean {
  return (objectFlagsOf(t) & (ObjectFlags.ObjectLiteral | ObjectFlags.ArrayLiteral)) !== 0;
}

export function isThisTypeParameter(t: Type): boolean {
  return (t.flags & TypeFlags.TypeParameter) !== 0 && (t.data as TypeParameter | undefined)?.isThisType === true;
}

export function isClassInstanceProperty(node: AstNode): boolean {
  return nodeParent(node) !== undefined
    && isClassLikeKind(nodeParent(node)!.kind)
    && node.kind === Kind.PropertyDeclaration
    && !hasSyntacticModifier(node, ModifierFlags.Accessor);
}

export function isThisInitializedObjectBindingExpression(node: AstNode | undefined): boolean {
  if (node === undefined) return false;
  if (node.kind !== Kind.ShorthandPropertyAssignment && node.kind !== Kind.PropertyAssignment) return false;
  const assignment = parentOf(parentOf(node));
  return assignment?.kind === Kind.BinaryExpression
    && operatorKind(assignment) === Kind.EqualsToken
    && rightOf(assignment)?.kind === Kind.ThisKeyword;
}

export function isThisInitializedDeclaration(node: AstNode | undefined): boolean {
  return node !== undefined && node.kind === Kind.VariableDeclaration && initializerOf(node)?.kind === Kind.ThisKeyword;
}

export function isInfinityOrNaNString(name: string): boolean {
  return name === "Infinity" || name === "-Infinity" || name === "NaN";
}

export function isInAmbientOrTypeNode(node: AstNode): boolean {
  if ((node.flags & NodeFlags.Ambient) !== 0) return true;
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.InterfaceDeclaration
        || current.kind === Kind.TypeAliasDeclaration
        || current.kind === Kind.JSTypeAliasDeclaration
        || current.kind === Kind.TypeLiteral) {
      return true;
    }
    current = nodeParent(current);
  }
  return false;
}

export function isLiteralExpressionOfObject(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ObjectLiteralExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.RegularExpressionLiteral:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
      return true;
  }
  return false;
}

export function canHaveFlowNode(node: AstNode): boolean {
  return (node as unknown as { flowNode?: unknown }).flowNode !== undefined
    || canHaveFlowNodeKind(node.kind);
}

export function isNonNullAccess(node: AstNode): boolean {
  return isAccessExpressionKind(node.kind) && expressionOf(node)?.kind === Kind.NonNullExpression;
}

export function getBindingElementPropertyName(node: AstNode): AstNode | undefined {
  return (node as unknown as { propertyName?: AstNode; name?: AstNode }).propertyName
    ?? (node as unknown as { name?: AstNode }).name;
}

export function isCallChain(node: AstNode): boolean {
  return node.kind === Kind.CallExpression && (node.flags & NodeFlags.OptionalChain) !== 0;
}

export function callLikeExpressionMayHaveTypeArguments(node: AstNode): boolean {
  return node.kind === Kind.CallExpression
    || node.kind === Kind.NewExpression
    || node.kind === Kind.TaggedTemplateExpression
    || node.kind === Kind.JsxOpeningElement
    || node.kind === Kind.JsxSelfClosingElement;
}

export function isSuperCall(node: AstNode): boolean {
  return node.kind === Kind.CallExpression && expressionOf(node)?.kind === Kind.SuperKeyword;
}

export function getMembersOfDeclaration(node: AstNode): readonly AstNode[] {
  switch (node.kind) {
    case Kind.InterfaceDeclaration:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.TypeLiteral:
      return (node as unknown as { members?: { nodes?: readonly AstNode[] } | readonly AstNode[] }).members instanceof Array
        ? (node as unknown as { members: readonly AstNode[] }).members
        : ((node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes ?? []);
    case Kind.ObjectLiteralExpression:
      return (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes ?? [];
  }
  return [];
}

export function isInRightSideOfImportOrExportAssignment(node: AstNode): boolean {
  let current = node;
  while (nodeParent(current)?.kind === Kind.QualifiedName) current = nodeParent(current)!;
  const parent = nodeParent(current);
  return (parent?.kind === Kind.ImportEqualsDeclaration && (parent as unknown as { moduleReference?: AstNode }).moduleReference === current)
    || (parent?.kind === Kind.ExportAssignment && expressionOf(parent) === current);
}

export function isJsxIntrinsicTagName(tagName: AstNode): boolean {
  return (tagName.kind === Kind.Identifier && /^[a-z]/.test(textOfName(tagName)))
    || tagName.kind === Kind.JsxNamespacedName;
}

export function getContainingObjectLiteral(f: AstNode): AstNode | undefined {
  const parent = nodeParent(f);
  if ((f.kind === Kind.MethodDeclaration || f.kind === Kind.GetAccessor || f.kind === Kind.SetAccessor)
      && parent?.kind === Kind.ObjectLiteralExpression) {
    return parent;
  }
  if (f.kind === Kind.FunctionExpression && parent?.kind === Kind.PropertyAssignment) {
    return nodeParent(parent);
  }
  return undefined;
}

export function isImportTypeQualifierPart(node: AstNode): AstNode | undefined {
  let current = node;
  let parent = nodeParent(current);
  while (parent?.kind === Kind.QualifiedName) {
    current = parent;
    parent = nodeParent(parent);
  }
  if (parent?.kind === Kind.ImportType && (parent as unknown as { qualifier?: AstNode }).qualifier === current) return parent;
  return undefined;
}

export function isInNameOfExpressionWithTypeArguments(node: AstNode): boolean {
  let current = node;
  while (nodeParent(current)?.kind === Kind.PropertyAccessExpression) current = nodeParent(current)!;
  return nodeParent(current)?.kind === Kind.ExpressionWithTypeArguments;
}

export function getIndexSymbolFromSymbolTable(symbolTable: SymbolTable): AstSymbol | undefined {
  return symbolTable.get("__index");
}

export function expressionResultIsUnused(node: AstNode): boolean {
  let current = node;
  for (;;) {
    const parent = nodeParent(current);
    if (parent === undefined) return false;
    if (parent.kind === Kind.ParenthesizedExpression) {
      current = parent;
      continue;
    }
    if (parent.kind === Kind.ExpressionStatement
        || parent.kind === Kind.VoidExpression
        || (parent.kind === Kind.ForStatement
          && ((parent as unknown as { initializer?: AstNode }).initializer === current
            || (parent as unknown as { incrementor?: AstNode }).incrementor === current))) {
      return true;
    }
    if (parent.kind === Kind.BinaryExpression && operatorKind(parent) === Kind.CommaToken) {
      if ((parent as unknown as { left?: AstNode }).left === current) return true;
      current = parent;
      continue;
    }
    return false;
  }
}

export function valueToString(value: unknown): string {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (isPseudoBigInt(value)) return pseudoBigIntToString(value) + "n";
  throw new Error("unhandled value type in valueToString");
}

export function nodeStartsNewLexicalEnvironment(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.Constructor:
    case Kind.FunctionExpression:
    case Kind.FunctionDeclaration:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ModuleDeclaration:
    case Kind.SourceFile:
      return true;
  }
  return false;
}

export interface FeatureMapEntry {
  readonly lib: string;
  readonly props: readonly string[];
}

let featureMap: ReadonlyMap<string, readonly FeatureMapEntry[]> | undefined;

export function getFeatureMap(): ReadonlyMap<string, readonly FeatureMapEntry[]> {
  featureMap ??= new Map<string, readonly FeatureMapEntry[]>([
    ["Array", [
      { lib: "es2015", props: ["find", "findIndex", "fill", "copyWithin", "entries", "keys", "values"] },
      { lib: "es2016", props: ["includes"] },
      { lib: "es2019", props: ["flat", "flatMap"] },
      { lib: "es2022", props: ["at"] },
      { lib: "es2023", props: ["findLastIndex", "findLast", "toReversed", "toSorted", "toSpliced", "with"] },
    ]],
    ["ObjectConstructor", [
      { lib: "es2015", props: ["assign", "getOwnPropertySymbols", "keys", "is", "setPrototypeOf"] },
      { lib: "es2017", props: ["values", "entries", "getOwnPropertyDescriptors"] },
      { lib: "es2019", props: ["fromEntries"] },
      { lib: "es2022", props: ["hasOwn"] },
      { lib: "es2024", props: ["groupBy"] },
    ]],
    ["String", [
      { lib: "es2015", props: ["codePointAt", "includes", "endsWith", "normalize", "repeat", "startsWith", "anchor", "big", "blink", "bold", "fixed", "fontcolor", "fontsize", "italics", "link", "small", "strike", "sub", "sup"] },
      { lib: "es2017", props: ["padStart", "padEnd"] },
      { lib: "es2019", props: ["trimStart", "trimEnd", "trimLeft", "trimRight"] },
      { lib: "es2020", props: ["matchAll"] },
      { lib: "es2021", props: ["replaceAll"] },
      { lib: "es2022", props: ["at"] },
      { lib: "es2024", props: ["isWellFormed", "toWellFormed"] },
    ]],
    ["PromiseConstructor", [
      { lib: "es2015", props: ["all", "race", "reject", "resolve"] },
      { lib: "es2020", props: ["allSettled"] },
      { lib: "es2021", props: ["any"] },
      { lib: "es2024", props: ["withResolvers"] },
      { lib: "es2025", props: ["try"] },
    ]],
    ["Map", [
      { lib: "es2015", props: ["entries", "keys", "values"] },
      { lib: "esnext", props: ["getOrInsert", "getOrInsertComputed"] },
    ]],
    ["Set", [
      { lib: "es2015", props: ["entries", "keys", "values"] },
      { lib: "es2025", props: ["union", "intersection", "difference", "symmetricDifference", "isSubsetOf", "isSupersetOf", "isDisjointFrom"] },
    ]],
  ]);
  return featureMap;
}

export function rangeOfTypeParameters(
  sourceFile: { text: string },
  typeParameters: { pos: number; end: number },
): { pos: number; end: number } {
  return { pos: Math.max(0, typeParameters.pos - 1), end: Math.min(sourceFile.text.length, typeParameters.end + 1) };
}

export function tryGetPropertyAccessOrIdentifierToString(expr: AstNode | undefined): string {
  if (expr === undefined) return "";
  if (expr.kind === Kind.PropertyAccessExpression) {
    const baseStr = tryGetPropertyAccessOrIdentifierToString(expressionOf(expr));
    if (baseStr !== "") return baseStr + "." + entityNameToString((expr as unknown as { name: AstNode }).name);
  }
  if (expr.kind === Kind.ElementAccessExpression) {
    const baseStr = tryGetPropertyAccessOrIdentifierToString(expressionOf(expr));
    const argument = (expr as unknown as { argumentExpression?: AstNode }).argumentExpression;
    if (baseStr !== "" && argument !== undefined && isPropertyNameKind(argument.kind)) {
      return baseStr + "." + textOfName(argument);
    }
  }
  if (expr.kind === Kind.Identifier) return textOfName(expr);
  if (expr.kind === Kind.JsxNamespacedName) return entityNameToString(expr);
  return "";
}

export function allDeclarationsInSameSourceFile(symbol: AstSymbol): boolean {
  const declarations = symbolDeclarations(symbol);
  if (declarations.length <= 1) return true;
  const first = sourceFileOf(declarations[0]!);
  for (let i = 1; i < declarations.length; i += 1) {
    if (sourceFileOf(declarations[i]!) !== first) return false;
  }
  return true;
}

export function containsNonMissingUndefinedType(
  checker: { missingType?: Type },
  t: Type,
): boolean {
  const candidate = (t.flags & TypeFlags.Union) !== 0
    ? ((t.data as { types?: readonly Type[] } | undefined)?.types?.[0] ?? t)
    : t;
  return (candidate.flags & TypeFlags.Undefined) !== 0 && candidate !== checker.missingType;
}

export function getAnyImportSyntax(node: AstNode): AstNode | undefined {
  switch (node.kind) {
    case Kind.ImportEqualsDeclaration:
      return node;
    case Kind.ImportClause:
      return nodeParent(node);
    case Kind.NamespaceImport:
      return parentOf(parentOf(node));
    case Kind.ImportSpecifier:
      return parentOf(parentOf(parentOf(node)));
    default:
      return undefined;
  }
}

export function isReservedMemberName(name: string): boolean {
  return name.length >= 2 && name.charCodeAt(0) === 0xfe && name[1] !== "@" && name[1] !== "#";
}

export function introducesArgumentsExoticObject(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
      return true;
  }
  return false;
}

export function symbolsToArray(symbols: SymbolTable): AstSymbol[] {
  const result: AstSymbol[] = [];
  for (const [id, symbol] of symbols) {
    if (!isReservedMemberName(id)) result.push(symbol);
  }
  return result;
}

export function skipAlias(symbol: AstSymbol, checker: { getAliasedSymbol?: (symbol: AstSymbol) => AstSymbol }): AstSymbol {
  if ((symbolFlags(symbol) & SymbolFlags.Alias) !== 0) return checker.getAliasedSymbol?.(symbol) ?? symbol;
  return symbol;
}

export function isExternalModuleSymbol(moduleSymbol: AstSymbol): boolean {
  const name = symbolName(moduleSymbol);
  return (symbolFlags(moduleSymbol) & SymbolFlags.Module) !== 0 && name.startsWith("\"");
}

export function getNonRestParameterCount(sig: Signature): number {
  return sig.parameters.length - (signatureHasRestParameter(sig) ? 1 : 0);
}

export function minAndMax<T>(slice: readonly T[], getValue: (value: T) => number): { min: number; max: number } {
  if (slice.length === 0) return { min: 0, max: 0 };
  let min = getValue(slice[0]!);
  let max = min;
  for (let i = 1; i < slice.length; i += 1) {
    const value = getValue(slice[i]!);
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return { min, max };
}

function compareOptionalTypes(t1: Type | undefined, t2: Type | undefined): number {
  if (t1 === t2) return 0;
  if (t1 === undefined) return -1;
  if (t2 === undefined) return 1;
  return compareTypes(t1, t2);
}

const CheckFlagsSynthetic = 1 << 0;
const CheckFlagsContainsPrivate = 1 << 1;
const CheckFlagsContainsProtected = 1 << 2;
const CheckFlagsContainsPublic = 1 << 3;
const CheckFlagsContainsStatic = 1 << 4;

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return node === undefined ? undefined : nodeParent(node);
}

function symbolName(symbol: AstSymbol | undefined): string {
  return (symbol as unknown as { name?: string } | undefined)?.name ?? "";
}

function symbolFlags(symbol: AstSymbol | undefined): number {
  return (symbol as unknown as { flags?: number } | undefined)?.flags ?? 0;
}

function symbolDeclarations(symbol: AstSymbol | undefined): readonly AstNode[] {
  return (symbol as unknown as { declarations?: readonly AstNode[] } | undefined)?.declarations ?? [];
}

function valueDeclarationOf(symbol: AstSymbol | undefined): AstNode | undefined {
  return (symbol as unknown as { valueDeclaration?: AstNode } | undefined)?.valueDeclaration;
}

function objectFlagsOf(t: Type): ObjectFlags {
  return ((t.data as { objectFlags?: ObjectFlags } | undefined)?.objectFlags ?? 0) as ObjectFlags;
}

function literalValue(t: Type): unknown {
  return (t.data as { value?: unknown } | undefined)?.value;
}

function nameOf(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { name?: AstNode } | undefined)?.name;
}

function textOfName(node: AstNode | undefined): string {
  if (node === undefined) return "";
  return (node as unknown as { text?: string; escapedText?: string }).text
    ?? (node as unknown as { escapedText?: string }).escapedText
    ?? "";
}

function sourceFileOf(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined && current.kind !== Kind.SourceFile) current = nodeParent(current);
  return current;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { expression?: AstNode } | undefined)?.expression;
}

function rightOf(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { right?: AstNode } | undefined)?.right;
}

function initializerOf(node: AstNode | undefined): AstNode | undefined {
  return (node as unknown as { initializer?: AstNode } | undefined)?.initializer;
}

function operatorKind(node: AstNode): number | undefined {
  return (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
}

function isAssignmentOperatorKind(kind: number): boolean {
  return kind === Kind.EqualsToken
    || kind === Kind.PlusEqualsToken
    || kind === Kind.MinusEqualsToken
    || kind === Kind.AsteriskAsteriskEqualsToken
    || kind === Kind.AsteriskEqualsToken
    || kind === Kind.SlashEqualsToken
    || kind === Kind.PercentEqualsToken
    || kind === Kind.LessThanLessThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanEqualsToken
    || kind === Kind.GreaterThanGreaterThanGreaterThanEqualsToken
    || kind === Kind.AmpersandEqualsToken
    || kind === Kind.BarEqualsToken
    || kind === Kind.CaretEqualsToken
    || kind === Kind.AmpersandAmpersandEqualsToken
    || kind === Kind.BarBarEqualsToken
    || kind === Kind.QuestionQuestionEqualsToken;
}

function isAccessExpressionKind(kind: number): boolean {
  return kind === Kind.PropertyAccessExpression || kind === Kind.ElementAccessExpression;
}

function isFunctionLikeOrClassStaticBlockDeclaration(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.CallSignature:
    case Kind.ConstructSignature:
    case Kind.FunctionType:
    case Kind.ConstructorType:
    case Kind.ClassStaticBlockDeclaration:
      return true;
  }
  return false;
}

function isParameterPropertyDeclaration(node: AstNode): boolean {
  return node.kind === Kind.Parameter
    && (getCombinedModifierFlags(node) & ModifierFlags.ParameterPropertyModifier) !== 0
    && parentOf(node)?.kind === Kind.Constructor;
}

function isVarConst(node: AstNode): boolean {
  return (node.flags & NodeFlags.Const) !== 0 || (getCombinedNodeFlagsLite(node) & NodeFlags.Const) !== 0;
}

function getCombinedNodeFlagsLite(node: AstNode): NodeFlags {
  let flags = node.flags as NodeFlags;
  const parent = nodeParent(node);
  if (parent !== undefined) {
    flags |= parent.flags as NodeFlags;
    const grandparent = nodeParent(parent);
    if (grandparent !== undefined) flags |= grandparent.flags as NodeFlags;
  }
  return flags;
}

function isClassLikeKind(kind: number): boolean {
  return kind === Kind.ClassDeclaration || kind === Kind.ClassExpression;
}

function canHaveFlowNodeKind(kind: number): boolean {
  switch (kind) {
    case Kind.Identifier:
    case Kind.ThisKeyword:
    case Kind.SuperKeyword:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.CallExpression:
    case Kind.BinaryExpression:
    case Kind.ConditionalExpression:
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.AwaitExpression:
    case Kind.YieldExpression:
      return true;
  }
  return false;
}

function isPropertyNameKind(kind: number): boolean {
  return kind === Kind.Identifier
    || kind === Kind.PrivateIdentifier
    || kind === Kind.StringLiteral
    || kind === Kind.NumericLiteral
    || kind === Kind.ComputedPropertyName;
}

function signatureHasRestParameter(sig: Signature): boolean {
  const last = sig.parameters[sig.parameters.length - 1];
  const declaration = valueDeclarationOf(last) ?? symbolDeclarations(last)[0];
  return declaration !== undefined && hasDotDotDotToken(declaration);
}

function isPseudoBigInt(value: unknown): value is PseudoBigInt {
  return typeof value === "object"
    && value !== null
    && typeof (value as { negative?: unknown }).negative === "boolean"
    && typeof (value as { base10Value?: unknown }).base10Value === "string";
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------
