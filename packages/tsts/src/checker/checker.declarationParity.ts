/**
 * Declaration-checking support.
 *
 * TS-Go checks declarations through class/interface/function/module/import
 * branches in `checker.go`. This file keeps those algorithms explicit in the
 * split TSTS checker: declaration-space validation, function overload
 * compatibility, class heritage checks, member override checks, property
 * initialization, imports/exports, decorators, and index constraints.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../ast/index.js";
import { Kind, SymbolFlags } from "../ast/index.js";
import { TypeFlags, type IndexInfo, type Signature, type Type } from "./types.js";

export interface DeclarationCheckEnvironment {
  readonly anyType: Type;
  readonly voidType: Type;
  readonly undefinedType: Type;
  readonly neverType: Type;
  readonly booleanType: Type;
  readonly getDeclaredTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getTypeOfSymbol?: (symbol: AstSymbol) => Type | undefined;
  readonly getBaseTypes?: (type: Type) => readonly Type[];
  readonly getPropertiesOfType?: (type: Type) => readonly AstSymbol[];
  readonly getSignaturesOfType?: (type: Type) => readonly Signature[];
  readonly getIndexInfosOfType?: (type: Type) => readonly IndexInfo[];
  readonly isTypeAssignableTo?: (source: Type, target: Type) => boolean;
  readonly isTypeIdenticalTo?: (source: Type, target: Type) => boolean;
  readonly report: (node: AstNode, message: string) => void;
}

export interface DeclarationCheckResult {
  readonly node: AstNode;
  readonly checked: boolean;
  readonly diagnostics: readonly string[];
}

export interface OverrideCheckResult {
  readonly member: AstSymbol;
  readonly baseMember?: AstSymbol;
  readonly compatible: boolean;
  readonly requiresOverride: boolean;
}

export interface IndexConstraintFailure {
  readonly property: AstSymbol | undefined;
  readonly indexInfo: IndexInfo;
  readonly propertyType: Type;
  readonly indexType: Type;
}

export function checkDeclarationNode(
  node: AstNode,
  environment: DeclarationCheckEnvironment,
): DeclarationCheckResult {
  const diagnostics: string[] = [];
  const report = (target: AstNode, message: string): void => {
    diagnostics.push(message);
    environment.report(target, message);
  };
  const scoped = { ...environment, report };
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      checkSignatureDeclaration(node, scoped);
      break;
    case Kind.ClassDeclaration:
      checkClassLikeDeclaration(node, scoped);
      break;
    case Kind.InterfaceDeclaration:
      checkInterfaceDeclaration(node, scoped);
      break;
    case Kind.TypeAliasDeclaration:
      checkTypeAliasDeclaration(node, scoped);
      break;
    case Kind.EnumDeclaration:
      checkEnumDeclaration(node, scoped);
      break;
    case Kind.ModuleDeclaration:
      checkModuleDeclaration(node, scoped);
      break;
    case Kind.ImportDeclaration:
    case Kind.ImportEqualsDeclaration:
      checkImportDeclaration(node, scoped);
      break;
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      checkExportDeclaration(node, scoped);
      break;
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.PropertyDeclaration:
    case Kind.PropertySignature:
      checkVariableLikeDeclaration(node, scoped);
      break;
    default:
      break;
  }
  return { node, checked: true, diagnostics };
}

export function checkSignatureDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  checkTypeParameters(nodeArray(node, "typeParameters"), environment);
  checkParameterList(nodeArray(node, "parameters"), environment);
  const signature = signatureOf(node);
  if (signature === undefined) return;
  if (isAsyncFunctionLike(node)) checkAsyncFunctionReturnType(node, signature, environment);
  if (isGeneratorFunctionLike(node)) checkGeneratorFunctionReturnType(node, signature, environment);
}

export function checkFunctionOrConstructorSymbol(symbol: AstSymbol, environment: DeclarationCheckEnvironment): void {
  const declarations = symbol.declarations ?? [];
  const signatures = declarations.map(signatureOf).filter((signature): signature is Signature => signature !== undefined);
  if (signatures.length <= 1) return;
  const implementation = signatures[signatures.length - 1]!;
  const overloads = signatures.slice(0, -1);
  for (const overload of overloads) {
    if (!isImplementationCompatibleWithOverload(implementation, overload, environment)) {
      const declaration = implementation.declaration ?? declarations[declarations.length - 1];
      if (declaration !== undefined) {
        environment.report(declaration, "This overload signature is not compatible with its implementation signature.");
      }
    }
  }
}

export function isImplementationCompatibleWithOverload(
  implementation: Signature,
  overload: Signature,
  environment: DeclarationCheckEnvironment,
): boolean {
  if (implementation.parameters.length < overload.minArgumentCount) return false;
  const returnType = implementation.resolvedReturnType ?? environment.voidType;
  const overloadReturn = overload.resolvedReturnType ?? environment.voidType;
  if ((overloadReturn.flags & TypeFlags.Void) === 0 && environment.isTypeAssignableTo?.(returnType, overloadReturn) === false) return false;
  for (let index = 0; index < overload.parameters.length; index += 1) {
    const overloadParameter = overload.parameters[index]!;
    const implementationParameter = implementation.parameters[index];
    if (implementationParameter === undefined) return false;
    const sourceType = environment.getTypeOfSymbol?.(overloadParameter);
    const targetType = environment.getTypeOfSymbol?.(implementationParameter);
    if (sourceType !== undefined && targetType !== undefined && environment.isTypeAssignableTo?.(sourceType, targetType) === false) {
      return false;
    }
  }
  return true;
}

export function checkAsyncFunctionReturnType(node: AstNode, signature: Signature, environment: DeclarationCheckEnvironment): void {
  const returnType = signature.resolvedReturnType;
  if (returnType === undefined) return;
  if (typeName(returnType) === "Promise") return;
  if ((returnType.flags & TypeFlags.AnyOrUnknown) !== 0) return;
  environment.report(node, "The return type of an async function or method must be the global Promise type.");
}

export function checkGeneratorFunctionReturnType(node: AstNode, signature: Signature, environment: DeclarationCheckEnvironment): void {
  const returnType = signature.resolvedReturnType;
  if (returnType === undefined) return;
  if (typeName(returnType).includes("Generator")) return;
  if ((returnType.flags & TypeFlags.AnyOrUnknown) !== 0) return;
  environment.report(node, "A generator function must return an iterable iterator type.");
}

export function checkClassLikeDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const symbol = symbolOf(node);
  const type = symbol === undefined ? undefined : environment.getDeclaredTypeOfSymbol?.(symbol);
  if (type === undefined) return;
  checkBaseTypeAccessibility(type, node, environment);
  checkClassForStaticPropertyNameConflicts(node, environment);
  checkKindsOfPropertyMemberOverrides(type, environment);
  checkMembersForOverrideModifier(node, type, environment);
  checkPropertyInitialization(node, type, environment);
  checkClassOrInterfaceForDuplicateIndexSignatures(node, type, environment);
}

export function checkInterfaceDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const symbol = symbolOf(node);
  const type = symbol === undefined ? undefined : environment.getDeclaredTypeOfSymbol?.(symbol);
  if (type === undefined) return;
  checkBaseTypeAccessibility(type, node, environment);
  checkInheritedPropertiesAreIdentical(type, node, environment);
  checkClassOrInterfaceForDuplicateIndexSignatures(node, type, environment);
}

export function checkTypeAliasDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  checkTypeParameters(nodeArray(node, "typeParameters"), environment);
  const name = declarationName(node);
  if (isReservedTypeName(name)) environment.report(node, `Type alias name '${name}' is reserved.`);
}

export function checkEnumDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const members = nodeArray(node, "members");
  const names = new Set<string>();
  for (const member of members) {
    const name = declarationName(member);
    if (names.has(name)) environment.report(member, `Duplicate enum member '${name}'.`);
    names.add(name);
  }
}

export function checkModuleDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const name = declarationName(node);
  if (name.length === 0) environment.report(node, "Module declaration must have a name.");
  for (const statement of nodeArray(node, "statements")) checkDeclarationNode(statement, environment);
}

export function checkImportDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const moduleSpecifier = moduleSpecifierText(node);
  if (moduleSpecifier.length === 0) environment.report(node, "Import declaration requires a module specifier.");
  if (hasTypeJsonImportAttribute(node) && !moduleSpecifier.endsWith(".json")) {
    environment.report(node, "The 'json' import attribute can only be used with JSON modules.");
  }
}

export function checkExportDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const moduleSpecifier = moduleSpecifierText(node);
  if (node.kind === Kind.ExportAssignment && moduleSpecifier.length !== 0) {
    environment.report(node, "Export assignment cannot have a module specifier.");
  }
}

export function checkVariableLikeDeclaration(node: AstNode, environment: DeclarationCheckEnvironment): void {
  checkTypeNameIsReserved(node, environment);
  const declaredType = declaredTypeOfNode(node);
  const initializerType = initializerTypeOfNode(node);
  if (declaredType !== undefined && initializerType !== undefined && environment.isTypeAssignableTo?.(initializerType, declaredType) === false) {
    environment.report(node, "Type of initializer is not assignable to declared type.");
  }
}

export function checkTypeParameters(typeParameters: readonly AstNode[], environment: DeclarationCheckEnvironment): void {
  const names = new Set<string>();
  for (const parameter of typeParameters) {
    const name = declarationName(parameter);
    if (names.has(name)) environment.report(parameter, `Duplicate type parameter '${name}'.`);
    if (isReservedTypeName(name)) environment.report(parameter, `Type parameter name '${name}' is reserved.`);
    names.add(name);
  }
}

export function checkParameterList(parameters: readonly AstNode[], environment: DeclarationCheckEnvironment): void {
  let seenOptional = false;
  let seenRest = false;
  const names = new Set<string>();
  for (const parameter of parameters) {
    const name = declarationName(parameter);
    if (names.has(name)) environment.report(parameter, `Duplicate parameter name '${name}'.`);
    names.add(name);
    if (seenRest) environment.report(parameter, "A rest parameter must be last in a parameter list.");
    if (isRestParameter(parameter)) seenRest = true;
    if (seenOptional && !isOptionalParameter(parameter) && !isRestParameter(parameter)) {
      environment.report(parameter, "A required parameter cannot follow an optional parameter.");
    }
    if (isOptionalParameter(parameter)) seenOptional = true;
  }
}

export function checkBaseTypeAccessibility(type: Type, node: AstNode, environment: DeclarationCheckEnvironment): void {
  for (const baseType of environment.getBaseTypes?.(type) ?? []) {
    if ((baseType.flags & TypeFlags.AnyOrUnknown) !== 0) continue;
    if ((baseType.flags & TypeFlags.Object) === 0) environment.report(node, "A class or interface can only extend an object type.");
  }
}

export function checkInheritedPropertiesAreIdentical(type: Type, node: AstNode, environment: DeclarationCheckEnvironment): boolean {
  const baseTypes = environment.getBaseTypes?.(type) ?? [];
  const propertiesByName = new Map<string, AstSymbol>();
  let ok = true;
  for (const baseType of baseTypes) {
    for (const property of environment.getPropertiesOfType?.(baseType) ?? []) {
      const name = symbolName(property);
      const previous = propertiesByName.get(name);
      if (previous === undefined) {
        propertiesByName.set(name, property);
        continue;
      }
      const previousType = environment.getTypeOfSymbol?.(previous);
      const currentType = environment.getTypeOfSymbol?.(property);
      if (previousType !== undefined && currentType !== undefined && environment.isTypeIdenticalTo?.(previousType, currentType) === false) {
        environment.report(node, `Named property '${name}' of inherited types is not identical.`);
        ok = false;
      }
    }
  }
  return ok;
}

export function checkKindsOfPropertyMemberOverrides(type: Type, environment: DeclarationCheckEnvironment): readonly OverrideCheckResult[] {
  const results: OverrideCheckResult[] = [];
  const ownProperties = environment.getPropertiesOfType?.(type) ?? [];
  const baseProperties = new Map<string, AstSymbol>();
  for (const baseType of environment.getBaseTypes?.(type) ?? []) {
    for (const property of environment.getPropertiesOfType?.(baseType) ?? []) baseProperties.set(symbolName(property), property);
  }
  for (const member of ownProperties) {
    const baseMember = baseProperties.get(symbolName(member));
    if (baseMember === undefined) continue;
    const compatible = memberKind(member) === memberKind(baseMember);
    results.push({ member, baseMember, compatible, requiresOverride: true });
  }
  return results;
}

export function checkMembersForOverrideModifier(node: AstNode, type: Type, environment: DeclarationCheckEnvironment): void {
  for (const result of checkKindsOfPropertyMemberOverrides(type, environment)) {
    if (!result.compatible) environment.report(node, `Member '${symbolName(result.member)}' incorrectly overrides base member kind.`);
    if (result.requiresOverride && !hasOverrideModifier(result.member)) {
      environment.report(node, `This member must have an 'override' modifier.`);
    }
  }
}

export function checkClassForStaticPropertyNameConflicts(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const members = nodeArray(node, "members").filter(isStaticMember);
  const names = new Set<string>();
  for (const member of members) {
    const name = declarationName(member);
    if (names.has(name)) environment.report(member, `Duplicate static member '${name}'.`);
    names.add(name);
  }
}

export function checkPropertyInitialization(node: AstNode, type: Type, environment: DeclarationCheckEnvironment): void {
  void type;
  for (const member of nodeArray(node, "members")) {
    if (member.kind !== Kind.PropertyDeclaration) continue;
    if (hasInitializer(member) || isOptionalParameter(member) || hasDefiniteAssignmentAssertion(member)) continue;
    environment.report(member, `Property '${declarationName(member)}' has no initializer and is not definitely assigned in the constructor.`);
  }
}

export function checkClassOrInterfaceForDuplicateIndexSignatures(node: AstNode, type: Type, environment: DeclarationCheckEnvironment): void {
  const infos = environment.getIndexInfosOfType?.(type) ?? [];
  const names = new Set<string>();
  for (const info of infos) {
    const name = indexInfoName(info);
    if (names.has(name)) environment.report(node, `Duplicate index signature for type '${name}'.`);
    names.add(name);
  }
}

export function checkIndexConstraints(type: Type, environment: DeclarationCheckEnvironment): readonly IndexConstraintFailure[] {
  const failures: IndexConstraintFailure[] = [];
  const indexes = environment.getIndexInfosOfType?.(type) ?? [];
  for (const property of environment.getPropertiesOfType?.(type) ?? []) {
    const propertyType = environment.getTypeOfSymbol?.(property);
    if (propertyType === undefined) continue;
    for (const indexInfo of indexes) {
      if (environment.isTypeAssignableTo?.(propertyType, indexInfo.valueType) === false) {
        failures.push({ property, indexInfo, propertyType, indexType: indexInfo.valueType });
      }
    }
  }
  return failures;
}

export function checkDecorators(node: AstNode, environment: DeclarationCheckEnvironment): void {
  for (const decorator of nodeArray(node, "decorators")) checkDecorator(decorator, environment);
}

export function checkDecorator(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const expressionType = declaredTypeOfNode(node);
  if (expressionType === undefined) return;
  const signatures = environment.getSignaturesOfType?.(expressionType) ?? [];
  if (signatures.length === 0) environment.report(node, "Decorator expression must be callable.");
}

export function checkTypeNameIsReserved(node: AstNode, environment: DeclarationCheckEnvironment): void {
  const name = declarationName(node);
  if (isReservedTypeName(name)) environment.report(node, `'${name}' is a reserved type name.`);
}

function nodeArray(node: AstNode, field: "members" | "parameters" | "typeParameters" | "statements" | "decorators"): readonly AstNode[] {
  const candidate = node as {
    readonly members?: readonly AstNode[];
    readonly parameters?: readonly AstNode[];
    readonly typeParameters?: readonly AstNode[];
    readonly statements?: readonly AstNode[];
    readonly decorators?: readonly AstNode[];
  };
  if (field === "members") return candidate.members ?? [];
  if (field === "parameters") return candidate.parameters ?? [];
  if (field === "typeParameters") return candidate.typeParameters ?? [];
  if (field === "statements") return candidate.statements ?? [];
  return candidate.decorators ?? [];
}

function signatureOf(node: AstNode): Signature | undefined {
  return (node as { readonly signature?: Signature; readonly resolvedSignature?: Signature }).signature
    ?? (node as { readonly resolvedSignature?: Signature }).resolvedSignature;
}

function symbolOf(node: AstNode): AstSymbol | undefined {
  return (node as { readonly symbol?: AstSymbol; readonly localSymbol?: AstSymbol }).symbol
    ?? (node as { readonly localSymbol?: AstSymbol }).localSymbol;
}

function declarationName(node: AstNode): string {
  const candidate = node as { readonly name?: AstNode | string; readonly text?: string; readonly escapedText?: string };
  if (typeof candidate.name === "string") return candidate.name;
  if (candidate.name !== undefined) return declarationName(candidate.name);
  return candidate.text ?? candidate.escapedText ?? "";
}

function symbolName(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function typeName(type: Type): string {
  return type.symbol?.name ?? type.symbol?.escapedName ?? (type.data as { readonly intrinsicName?: string } | undefined)?.intrinsicName ?? "";
}

function isAsyncFunctionLike(node: AstNode): boolean {
  return Boolean((node as { readonly async?: boolean }).async);
}

function isGeneratorFunctionLike(node: AstNode): boolean {
  return Boolean((node as { readonly asteriskToken?: unknown }).asteriskToken);
}

function isReservedTypeName(name: string): boolean {
  return name === "any" || name === "unknown" || name === "never" || name === "void" || name === "undefined" || name === "null";
}

function isRestParameter(node: AstNode): boolean {
  return Boolean((node as { readonly dotDotDotToken?: unknown; readonly rest?: boolean }).dotDotDotToken)
    || Boolean((node as { readonly rest?: boolean }).rest);
}

function isOptionalParameter(node: AstNode): boolean {
  return Boolean((node as { readonly questionToken?: unknown; readonly optional?: boolean }).questionToken)
    || Boolean((node as { readonly optional?: boolean }).optional);
}

function hasInitializer(node: AstNode): boolean {
  return (node as { readonly initializer?: AstNode }).initializer !== undefined;
}

function hasDefiniteAssignmentAssertion(node: AstNode): boolean {
  return Boolean((node as { readonly exclamationToken?: unknown }).exclamationToken);
}

function isStaticMember(node: AstNode): boolean {
  return Boolean((node as { readonly static?: boolean; readonly modifiers?: readonly AstNode[] }).static)
    || ((node as { readonly modifiers?: readonly AstNode[] }).modifiers ?? []).some(modifier => modifier.kind === Kind.StaticKeyword);
}

function hasOverrideModifier(symbol: AstSymbol): boolean {
  return Boolean((symbol as { readonly override?: boolean }).override)
    || (symbol.declarations ?? []).some(declaration => ((declaration as { readonly modifiers?: readonly AstNode[] }).modifiers ?? []).some(modifier => modifier.kind === Kind.OverrideKeyword));
}

function memberKind(symbol: AstSymbol): string {
  const declaration = symbol.declarations?.[0];
  return declaration === undefined ? "property" : Kind[declaration.kind] ?? "property";
}

function moduleSpecifierText(node: AstNode): string {
  const specifier = (node as { readonly moduleSpecifier?: AstNode | string }).moduleSpecifier;
  if (typeof specifier === "string") return specifier;
  return specifier === undefined ? "" : declarationName(specifier);
}

function hasTypeJsonImportAttribute(node: AstNode): boolean {
  return ((node as { readonly attributes?: readonly AstNode[] }).attributes ?? [])
    .some(attribute => declarationName(attribute) === "type" && (attribute as { readonly value?: string }).value === "json");
}

function declaredTypeOfNode(node: AstNode): Type | undefined {
  return (node as { readonly declaredType?: Type; readonly type?: Type }).declaredType
    ?? (node as { readonly type?: Type }).type;
}

function initializerTypeOfNode(node: AstNode): Type | undefined {
  return (node as { readonly initializerType?: Type }).initializerType;
}

function indexInfoName(info: IndexInfo): string {
  return typeName(info.keyType);
}
