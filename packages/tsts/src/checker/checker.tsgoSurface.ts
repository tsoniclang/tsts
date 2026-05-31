/**
 * TS-Go checker surface parity helpers.
 *
 * These are the small cross-file helper routines and accessor methods from
 * TS-Go checker packages whose semantics are shared by the larger checker
 * ports.
 */

import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import type { IndexInfo, ObjectType, Signature, Type, TypeMapper, TypeParameter, TypePredicate } from "./types.js";
import { ElementFlags, ObjectFlags, TypeFlags, getTypeOfSymbol } from "./types.js";
import { getUnionTypeWorker, UnionReduction } from "./checker.typeAlgebra.js";
import { neverType, stringType, undefinedType, unknownType } from "./checker.checkedtype.js";

export function checkRightHandSideOfForOf(expressionType: Type): Type {
  return firstTypeArgument(expressionType) ?? iterableElementType(expressionType) ?? unknownType;
}

export function narrowTypeByDiscriminant(type: Type, discriminant: string, candidate: Type): Type {
  if ((type.flags & TypeFlags.Union) === 0) return hasDiscriminant(type, discriminant, candidate) ? type : neverType;
  const narrowed = unionTypes(type).filter(part => hasDiscriminant(part, discriminant, candidate));
  return getUnionTypeWorker(narrowed, UnionReduction.Literal);
}

export function narrowTypeBySwitchOptionalChainContainment(type: Type, clauses: readonly Type[]): Type {
  if (clauses.length === 0) return type;
  if ((type.flags & TypeFlags.Union) === 0) return clauses.some(clause => relatedByIdentity(type, clause)) ? type : neverType;
  return getUnionTypeWorker(unionTypes(type).filter(part => clauses.some(clause => relatedByIdentity(part, clause))), UnionReduction.Literal);
}

export function checkGrammarAwaitOrAwaitUsing(node: AstNode, inAsyncContext: boolean): readonly string[] {
  if (inAsyncContext) return [];
  return node.kind === Kind.AwaitExpression || nodeText(node) === "await" || nodeText(node) === "await using"
    ? ["await is only permitted in async contexts"]
    : [];
}

export function invokeOnce(callback: () => unknown): () => unknown {
  let called = false;
  let value: unknown;
  return () => {
    if (!called) {
      value = callback();
      called = true;
    }
    return value!;
  };
}

export function inferFromMatchingTypes(source: Type, target: Type, infer: (source: Type, target: Type) => void): void {
  if ((source.flags & TypeFlags.Union) !== 0 && (target.flags & TypeFlags.Union) !== 0) {
    for (const sourcePart of unionTypes(source)) {
      const match = unionTypes(target).find(targetPart => targetPart.flags === sourcePart.flags);
      if (match !== undefined) infer(sourcePart, match);
    }
    return;
  }
  if (source.flags === target.flags || (source.flags & TypeFlags.TypeParameter) !== 0 || (target.flags & TypeFlags.TypeParameter) !== 0) infer(source, target);
}

export function findLeftmostType(type: Type, predicate: (type: Type) => boolean): Type | undefined {
  if (predicate(type)) return type;
  for (const part of unionTypes(type)) {
    const found = findLeftmostType(part, predicate);
    if (found !== undefined) return found;
  }
  return undefined;
}

export function checkUnmatchedJSDocParameters(parameters: readonly AstSymbol[], jsDocParameters: readonly AstNode[]): readonly string[] {
  const declared = new Set(parameters.map(symbolName));
  return jsDocParameters
    .map(parameter => nodeText((parameter as { readonly name?: AstNode }).name))
    .filter(name => name.length !== 0 && !declared.has(name))
    .map(name => `JSDoc parameter '${name}' has no matching declaration.`);
}

export function getAllJSDocTags(node: AstNode | undefined): readonly AstNode[] {
  const direct = nodeArray((node as { readonly jsDoc?: unknown; readonly tags?: unknown } | undefined)?.tags);
  const comments = nodeArray((node as { readonly jsDoc?: unknown } | undefined)?.jsDoc);
  return [...direct, ...comments.flatMap(comment => nodeArray((comment as { readonly tags?: unknown }).tags))];
}

export function generateJsxChildren(node: AstNode): readonly AstNode[] {
  return nodeArray((node as { readonly children?: unknown }).children)
    .filter(child => child.kind !== Kind.JsxText || nodeText(child).trim().length !== 0);
}

export function getElaborationElementForJsxChild(child: AstNode): AstNode | undefined {
  if (child.kind === Kind.JsxExpression) return (child as { readonly expression?: AstNode }).expression;
  if (child.kind === Kind.JsxElement || child.kind === Kind.JsxSelfClosingElement) return child;
  return undefined;
}

export function map(mapper: TypeMapper | undefined, type: Type): Type {
  return mapper?.map?.(type) ?? type;
}

export function kind(mapper: TypeMapper | undefined): number {
  return mapper?.kind ?? 0;
}

export function enterNewScope(stack: AstNode[], scope: AstNode, body: () => unknown): unknown {
  stack.push(scope);
  try {
    return body();
  } finally {
    stack.pop();
  }
}

export function walkNodeForExpandability(node: AstNode | undefined, visit: (node: AstNode) => void): void {
  if (node === undefined) return;
  visit(node);
  for (const child of childNodes(node)) walkNodeForExpandability(child, visit);
}

export function markError(state: { error?: boolean }): { error?: boolean } {
  state.error = true;
  return state;
}

export function startRecoveryScope(state: { recoveryDepth?: number }): { recoveryDepth?: number } {
  state.recoveryDepth = (state.recoveryDepth ?? 0) + 1;
  return state;
}

export function endRecoveryScope(state: { recoveryDepth?: number }): { recoveryDepth?: number } {
  state.recoveryDepth = Math.max(0, (state.recoveryDepth ?? 0) - 1);
  return state;
}

export function newWrappingTracker(): WrappingTracker {
  return { boundaries: [], moduleSpecifiers: new Map() };
}

export function createRecoveryBoundary(node: AstNode, reason: string): RecoveryBoundary {
  return { node, reason, diagnostics: [] };
}

export function finalizeBoundary(boundary: RecoveryBoundary): RecoveryBoundary {
  return { ...boundary, finalized: true };
}

export function getModuleSpecifierOverride(tracker: WrappingTracker, node: AstNode): string | undefined {
  return tracker.moduleSpecifiers.get(node);
}

export function rewriteModuleSpecifier(tracker: WrappingTracker, node: AstNode, specifier: string): void {
  tracker.moduleSpecifiers.set(node, specifier);
}

export function getEnclosingDeclarationIgnoringFakeScope(node: AstNode | undefined): AstNode | undefined {
  for (let current = parentOf(node); current !== undefined; current = parentOf(current)) {
    if ((current as { readonly fakeScope?: boolean }).fakeScope !== true && isDeclaration(current)) return current;
  }
  return undefined;
}

export function getExistingNodeTreeVisitor(transform: (node: AstNode) => AstNode): (node: AstNode) => AstNode {
  return node => {
    const next = transform(node);
    const children = childNodes(next);
    return children.length === 0 ? next : { ...(next as object), children: children.map(getExistingNodeTreeVisitor(transform)) } as unknown as AstNode;
  };
}

export function pseudoParametersToNodeList(parameters: readonly AstSymbol[]): readonly AstNode[] {
  return parameters.map(parameter => ({ kind: Kind.Parameter, name: { kind: Kind.Identifier, text: symbolName(parameter) } }) as unknown as AstNode);
}

export function isStructuralPseudoType(type: Type): boolean {
  return (type.flags & TypeFlags.Object) !== 0 && ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.Anonymous ? true : false;
}

export function pseudoReturnTypeMatchesPredicate(returnType: Type, predicate: TypePredicate | undefined): boolean {
  return predicate?.type === undefined || relatedByIdentity(returnType, predicate.type);
}

export function pseudoTypeToType(type: Type): Type {
  return (type.data as { readonly asType?: Type } | undefined)?.asType ?? type;
}

export function forEachExportAndPropertyOfModule(moduleSymbol: AstSymbol, callback: (symbol: AstSymbol) => void): void {
  for (const symbol of moduleSymbol.exports?.values() ?? []) callback(symbol);
  for (const symbol of moduleSymbol.members?.values() ?? []) callback(symbol);
}

export function someSymbolTableInScope(scopes: readonly SymbolTable[], predicate: (symbol: AstSymbol) => boolean): boolean {
  return scopes.some(scope => [...scope.values()].some(predicate));
}

export function isCanceled(token: CancellationToken | undefined): boolean {
  return token?.isCancellationRequested?.() === true;
}

export function checkNotCanceled(token: CancellationToken | undefined): void {
  if (isCanceled(token)) throw new Error("Operation canceled.");
}

export function getPackagesMap(packages: readonly PackageInfo[]): Map<string, PackageInfo> {
  return new Map(packages.map(pkg => [pkg.name, pkg]));
}

export function typesPackageExists(packages: ReadonlyMap<string, PackageInfo>, packageName: string): boolean {
  return packages.has(`@types/${packageName}`) || packages.has(packageName);
}

export function packageBundlesTypes(pkg: PackageInfo): boolean {
  return pkg.types !== undefined || pkg.typings !== undefined;
}

export function isUncheckedJSSuggestion(suggestion: DiagnosticSuggestion): boolean {
  return suggestion.category === "suggestion" && suggestion.unchecked === true;
}

export function isJSLiteralType(type: Type): boolean {
  return (type.flags & TypeFlags.Literal) !== 0 || ((type.data as ObjectType | undefined)?.objectFlags ?? 0) & ObjectFlags.JSLiteral ? true : false;
}

export function flags(value: HasFlags): number {
  return Number(read(value, "flags") ?? 0);
}

export function asInstantiationExpressionType(type: Type): Type | undefined {
  return (type.data as { readonly asInstantiationExpressionType?: Type; readonly node?: AstNode } | undefined)?.asInstantiationExpressionType
    ?? (((type.data as { readonly node?: AstNode } | undefined)?.node !== undefined) ? type : undefined);
}

export function distributed(type: Type): boolean {
  return Boolean(read(type.data, "distributed"));
}

export function target(value: { readonly target?: unknown }): unknown {
  return value.target;
}

export function mapper(value: { readonly mapper?: unknown }): unknown {
  return value.mapper;
}

export function types(type: Type): readonly Type[] {
  return unionTypes(type);
}

export function targetInterfaceType(type: Type): Type | undefined {
  return read(type.data, "targetInterfaceType") as Type | undefined;
}

export function asType(value: Type | { readonly type?: Type }): Type | undefined {
  return "flags" in value ? value : value.type;
}

export function value(type: Type): unknown {
  return read(type.data, "value");
}

export function callSignatures(type: Type): readonly Signature[] {
  return (type.data as ObjectType | undefined)?.declaredCallSignatures ?? [];
}

export function constructSignatures(type: Type): readonly Signature[] {
  return (type.data as ObjectType | undefined)?.declaredConstructSignatures ?? [];
}

export function properties(type: Type): readonly AstSymbol[] {
  return (type.data as ObjectType | undefined)?.declaredProperties ?? [];
}

export function outerTypeParameters(type: Type): readonly TypeParameter[] {
  return (type.data as { readonly outerTypeParameters?: readonly TypeParameter[] } | undefined)?.outerTypeParameters ?? [];
}

export function localTypeParameters(type: Type): readonly TypeParameter[] {
  return (type.data as { readonly localTypeParameters?: readonly TypeParameter[] } | undefined)?.localTypeParameters ?? [];
}

export function typeParameters(value: Type | Signature): readonly TypeParameter[] {
  return (value as Signature).typeParameters ?? ("data" in value ? (value.data as { readonly typeParameters?: readonly TypeParameter[] } | undefined)?.typeParameters : undefined) ?? [];
}

export function labeledDeclaration(info: { readonly labeledDeclaration?: AstNode }): AstNode | undefined {
  return info.labeledDeclaration;
}

export function fixedLength(type: Type): number {
  return Number(read(type.data, "fixedLength") ?? 0);
}

export function isReadonly(value: Type | IndexInfo): boolean {
  return Boolean(read((value as Type).data ?? value, "isReadonly") ?? read((value as Type).data ?? value, "readonly"));
}

export function elementFlags(info: { readonly flags?: ElementFlags }): ElementFlags {
  return info.flags ?? ElementFlags.Required;
}

export function elementInfos(type: Type): readonly unknown[] {
  return (read(type.data, "elementInfo") as readonly unknown[] | undefined) ?? [];
}

export function isThisType(type: TypeParameter): boolean {
  return type.isThisType === true;
}

export function texts(type: Type): readonly string[] {
  return (read(type.data, "texts") as readonly string[] | undefined) ?? [];
}

export function baseType(type: Type): Type | undefined {
  return read(type.data, "baseType") as Type | undefined;
}

export function substConstraint(type: Type): Type | undefined {
  return read(type.data, "substConstraint") as Type | undefined;
}

export function checkType(type: Type): Type | undefined {
  return read(type.data, "checkType") as Type | undefined;
}

export function extendsType(type: Type): Type | undefined {
  return read(type.data, "extendsType") as Type | undefined;
}

export function declaration(value: Signature | Type): AstNode | undefined {
  return (value as Signature).declaration ?? read((value as Type).data, "declaration") as AstNode | undefined;
}

export function thisParameter(signature: Signature): AstSymbol | undefined {
  return signature.thisParameter;
}

export function parameters(signature: Signature): readonly AstSymbol[] {
  return signature.parameters;
}

export function minArgumentCount(signature: Signature): number {
  return signature.minArgumentCount;
}

export function type(value: IndexInfo | TypePredicate | { readonly type?: Type }): Type | undefined {
  return (value as IndexInfo).valueType ?? (value as TypePredicate).type ?? (value as { readonly type?: Type }).type;
}

export function parameterIndex(predicate: TypePredicate): number {
  return predicate.parameterIndex;
}

export function parameterName(predicate: TypePredicate): string {
  return predicate.parameterName;
}

export function keyType(info: IndexInfo): Type {
  return info.keyType;
}

export function valueType(info: IndexInfo): Type {
  return info.valueType;
}

export function _(): void {}

function hasDiscriminant(type: Type, discriminant: string, candidate: Type): boolean {
  const propType = getPropertyType(type, discriminant);
  return propType !== undefined && relatedByIdentity(propType, candidate);
}

function getPropertyType(type: Type, name: string): Type | undefined {
  const symbol = (type.symbol?.members?.get(name)) ?? (type.data as ObjectType | undefined)?.declaredProperties?.find(prop => symbolName(prop) === name);
  return getTypeOfSymbol(symbol);
}

function firstTypeArgument(type: Type): Type | undefined {
  return (type.data as ObjectType | undefined)?.resolvedTypeArguments?.[0];
}

function iterableElementType(type: Type): Type | undefined {
  const iterator = getPropertyType(type, Symbol.iterator.toString());
  return iterator === undefined ? undefined : firstTypeArgument(iterator);
}

function relatedByIdentity(left: Type, right: Type): boolean {
  return left === right || left.id === right.id || (left.flags & right.flags) !== 0;
}

function childNodes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const key of ["children", "statements", "members", "properties", "elements", "body", "expression", "left", "right"]) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isNode(value)) out.push(value);
    else out.push(...nodeArray(value));
  }
  return out;
}

function isDeclaration(node: AstNode): boolean {
  return node.kind === Kind.VariableDeclaration
    || node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.ClassDeclaration
    || node.kind === Kind.InterfaceDeclaration
    || node.kind === Kind.TypeAliasDeclaration
    || node.kind === Kind.EnumDeclaration
    || node.kind === Kind.ImportDeclaration
    || node.kind === Kind.ExportDeclaration;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value as readonly AstNode[];
  return (value as { readonly nodes?: readonly AstNode[] }).nodes ?? [];
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function nodeText(node: AstNode | undefined): string {
  return (node as { readonly text?: string } | undefined)?.text ?? symbolName((node as { readonly symbol?: AstSymbol } | undefined)?.symbol);
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function unionTypes(type: Type): readonly Type[] {
  return (type.data as { readonly types?: readonly Type[] } | undefined)?.types ?? [];
}

function read(value: unknown, key: string): unknown {
  return (value as Record<string, unknown> | undefined)?.[key];
}

interface WrappingTracker {
  readonly boundaries: RecoveryBoundary[];
  readonly moduleSpecifiers: Map<AstNode, string>;
}

interface RecoveryBoundary {
  readonly node: AstNode;
  readonly reason: string;
  readonly diagnostics: string[];
  readonly finalized?: boolean;
}

interface CancellationToken {
  isCancellationRequested?(): boolean;
}

interface PackageInfo {
  readonly name: string;
  readonly types?: string;
  readonly typings?: string;
}

interface DiagnosticSuggestion {
  readonly category: string;
  readonly unchecked?: boolean;
}

interface HasFlags {
  readonly flags?: number;
}
