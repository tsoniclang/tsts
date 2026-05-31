import {
  Kind,
  SymbolFlags,
  nodeParent,
  nodeSymbol,
  type Node as AstNode,
  type Symbol as AstSymbol,
  type SymbolTable,
} from "../ast/index.js";
import { getSpellingSuggestion } from "../core/index.js";
import { getPropertySymbolOfType, type Type } from "./types.js";

export interface NameResolutionDiagnostics {
  readonly diagnostics: { message: string; node?: AstNode; args?: readonly unknown[] }[];
}

export interface NameResolutionHost extends NameResolutionDiagnostics {
  readonly globals: SymbolTable;
  readonly getSymbolOfDeclaration: (node: AstNode) => AstSymbol | undefined;
  readonly getTypeOfSymbol: (symbol: AstSymbol) => Type | undefined;
  readonly getDeclaredTypeOfSymbol: (symbol: AstSymbol) => Type | undefined;
  readonly resolveName: (
    location: AstNode | undefined,
    name: string,
    meaning: number,
    diagnostic: string | undefined,
    isUse: boolean,
    excludeGlobals: boolean,
  ) => AstSymbol | undefined;
  readonly resolveAlias?: (symbol: AstSymbol) => AstSymbol | undefined;
  readonly getMergedSymbol?: (symbol: AstSymbol | undefined) => AstSymbol | undefined;
  readonly getSymbolFlags?: (symbol: AstSymbol) => number;
  readonly compareSymbols?: (left: AstSymbol, right: AstSymbol) => number;
}

export interface ResolvedSymbolUse {
  readonly errorLocation: AstNode | undefined;
  readonly result: AstSymbol;
  readonly meaning: number;
  readonly lastLocation: AstNode | undefined;
  readonly associatedDeclarationForContainingInitializerOrBindingName: AstNode | undefined;
  readonly withinDeferredContext: boolean;
}

export function getGlobalTypeDeclaration(symbol: AstSymbol): AstNode | undefined {
  for (const declaration of symbol.declarations ?? []) {
    if (declaration.kind === Kind.ClassDeclaration
      || declaration.kind === Kind.InterfaceDeclaration
      || declaration.kind === Kind.EnumDeclaration
      || declaration.kind === Kind.TypeAliasDeclaration) {
      return declaration;
    }
  }
  return undefined;
}

export function getGlobalSymbol(
  host: NameResolutionHost,
  name: string,
  meaning: number,
  diagnostic: string | undefined,
): AstSymbol | undefined {
  return host.resolveName(undefined, name, meaning, diagnostic, false, false);
}

export function symbolReferenced(symbol: AstSymbol, meaning: number): void {
  const referenceLinks = symbol as { referenceKinds?: number };
  referenceLinks.referenceKinds = (referenceLinks.referenceKinds ?? 0) | meaning;
}

export function getSymbolFromTable(
  host: Pick<NameResolutionHost, "getSymbolFlags" | "getMergedSymbol">,
  symbols: ReadonlyMap<string, AstSymbol>,
  name: string,
  meaning: number,
): AstSymbol | undefined {
  if ((meaning & SymbolFlags.All) === 0) return undefined;
  const symbol = host.getMergedSymbol?.(symbols.get(name)) ?? symbols.get(name);
  if (symbol === undefined) return undefined;
  if (((symbol.flags ?? 0) & meaning) !== 0) return symbol;
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
    const targetFlags = host.getSymbolFlags?.(symbol) ?? 0;
    if ((targetFlags & meaning) !== 0 || targetFlags === SymbolFlags.All) return symbol;
  }
  return undefined;
}

export function onFailedToResolveSymbol(
  host: NameResolutionHost,
  errorLocation: AstNode | undefined,
  name: string,
  meaning: number,
  nameNotFoundMessage: string,
): void {
  if (errorLocation !== undefined
    && (checkAndReportErrorForMissingPrefix(host, errorLocation, name)
      || checkAndReportErrorForUsingTypeAsNamespace(host, errorLocation, name, meaning)
      || checkAndReportErrorForExportingPrimitiveType(host, errorLocation, name)
      || checkAndReportErrorForUsingNamespaceAsTypeOrValue(host, errorLocation, name, meaning)
      || checkAndReportErrorForUsingTypeAsValue(host, errorLocation, name, meaning)
      || checkAndReportErrorForUsingValueAsType(host, errorLocation, name, meaning))) {
    return;
  }
  const declarationName = identifierText(errorLocation) === name ? declarationNameToString(errorLocation) : name;
  const suggestedLib = getSuggestedLibForNonExistentName(name);
  if (suggestedLib.length > 0) {
    pushDiagnostic(host, errorLocation, nameNotFoundMessage, declarationName, suggestedLib);
    return;
  }
  const suggestion = getSuggestedSymbolForNonexistentSymbol(host, errorLocation, name, meaning);
  if (suggestion !== undefined && !isGlobalScopeAugmentation(valueDeclarationOf(suggestion))) {
    pushDiagnostic(host, errorLocation, `${nameNotFoundMessage} Did you mean '${symbolDisplayName(suggestion)}'?`, declarationName);
    return;
  }
  pushDiagnostic(host, errorLocation, nameNotFoundMessage, declarationName);
}

export function onSuccessfullyResolvedSymbol(host: NameResolutionHost, use: ResolvedSymbolUse): void {
  const name = symbolDisplayName(use.result);
  const errorLocation = use.errorLocation;
  if (errorLocation !== undefined
    && ((use.meaning & SymbolFlags.BlockScopedVariable) !== 0
      || ((use.meaning & (SymbolFlags.Class | SymbolFlags.Enum)) !== 0 && (use.meaning & SymbolFlags.Value) === SymbolFlags.Value))) {
    const exportOrLocal = exportSymbolOfValueSymbolIfExported(use.result);
    const flags = exportOrLocal.flags ?? 0;
    if ((flags & (SymbolFlags.BlockScopedVariable | SymbolFlags.Class | SymbolFlags.Enum)) !== 0) {
      checkResolvedBlockScopedVariable(host, exportOrLocal, errorLocation);
    }
  }
  if (use.associatedDeclarationForContainingInitializerOrBindingName !== undefined
    && !use.withinDeferredContext
    && (use.meaning & SymbolFlags.Value) === SymbolFlags.Value) {
    const candidate = host.getMergedSymbol?.(lateBoundSymbol(use.result)) ?? lateBoundSymbol(use.result);
    const associated = use.associatedDeclarationForContainingInitializerOrBindingName;
    if (candidate === host.getSymbolOfDeclaration(associated)) {
      pushDiagnostic(host, errorLocation, "Parameter_0_cannot_reference_itself", declarationNameToString(nameOfDeclaration(associated)));
    } else {
      const valueDeclaration = valueDeclarationOf(candidate);
      const root = rootDeclaration(associated);
      const parentLocals = symbolTableOf(nodeParent(root), "locals");
      if (valueDeclaration !== undefined
        && posOf(valueDeclaration) > posOf(associated)
        && parentLocals !== undefined
        && getSymbolFromTable(host, parentLocals, symbolDisplayName(candidate), use.meaning) === candidate) {
        pushDiagnostic(
          host,
          errorLocation,
          "Parameter_0_cannot_reference_identifier_1_declared_after_it",
          declarationNameToString(nameOfDeclaration(associated)),
          declarationNameToString(errorLocation),
        );
      }
    }
  }
  if (errorLocation !== undefined
    && (use.meaning & SymbolFlags.Value) !== 0
    && ((use.result.flags ?? 0) & SymbolFlags.Alias) !== 0
    && ((use.result.flags ?? 0) & SymbolFlags.Value) === 0
    && !isValidTypeOnlyAliasUseSite(errorLocation)) {
    const typeOnlyDeclaration = getTypeOnlyAliasDeclarationEx(host, use.result, SymbolFlags.Value);
    if (typeOnlyDeclaration !== undefined) {
      pushDiagnostic(host, errorLocation, "X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type", name);
    }
  }
}

export function checkAndReportErrorForMissingPrefix(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
): boolean {
  if (errorLocation.kind !== Kind.Identifier || identifierText(errorLocation) !== name || isTypeReferenceIdentifier(errorLocation) || isInTypeQuery(errorLocation)) return false;
  const container = getThisContainer(errorLocation);
  for (let location = container; nodeParent(location) !== undefined; location = nodeParent(location)!) {
    const parent = nodeParent(location);
    if (parent !== undefined && (parent.kind === Kind.ClassDeclaration || parent.kind === Kind.ClassExpression)) {
      const classSymbol = host.getSymbolOfDeclaration(parent);
      if (classSymbol === undefined) break;
      const constructorType = host.getTypeOfSymbol(classSymbol);
      if (constructorType !== undefined && getPropertySymbolOfType(constructorType, name) !== undefined) {
        pushDiagnostic(host, errorLocation, "Cannot_find_name_0_Did_you_mean_the_static_member_1_0", name, symbolDisplayName(classSymbol));
        return true;
      }
      if (location === container && !isStatic(location)) {
        const instanceType = host.getDeclaredTypeOfSymbol(classSymbol);
        if (instanceType !== undefined && getPropertySymbolOfType(instanceType, name) !== undefined) {
          pushDiagnostic(host, errorLocation, "Cannot_find_name_0_Did_you_mean_the_instance_member_this_0", name);
          return true;
        }
      }
    }
  }
  return false;
}

export function checkAndReportErrorForUsingTypeAsNamespace(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
  meaning: number,
): boolean {
  if (meaning !== SymbolFlags.Namespace) return false;
  const symbol = resolveSymbol(host, host.resolveName(errorLocation, name, SymbolFlags.Type & ~SymbolFlags.Namespace, undefined, false, false));
  if (symbol === undefined) return false;
  const parent = nodeParent(errorLocation);
  if (parent?.kind === Kind.QualifiedName && (parent as { left?: AstNode }).left === errorLocation) {
    const propName = identifierText((parent as { right?: AstNode }).right);
    const declaredType = host.getDeclaredTypeOfSymbol(symbol);
    if (declaredType !== undefined && propName.length > 0 && getPropertySymbolOfType(declaredType, propName) !== undefined) {
      pushDiagnostic(host, parent, "Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1", name, propName);
      return true;
    }
  }
  pushDiagnostic(host, errorLocation, "X_0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here", name);
  return true;
}

export function checkAndReportErrorForExportingPrimitiveType(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
): boolean {
  if (isPrimitiveTypeName(name) && nodeParent(errorLocation)?.kind === Kind.ExportSpecifier) {
    pushDiagnostic(host, errorLocation, "Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module", name);
    return true;
  }
  return false;
}

export function checkAndReportErrorForUsingNamespaceAsTypeOrValue(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
  meaning: number,
): boolean {
  if ((meaning & (SymbolFlags.Value & ~SymbolFlags.Type)) !== 0) {
    const symbol = resolveSymbol(host, host.resolveName(errorLocation, name, SymbolFlags.NamespaceModule, undefined, false, false));
    if (symbol !== undefined) {
      pushDiagnostic(host, errorLocation, "Cannot_use_namespace_0_as_a_value", name);
      return true;
    }
  } else if ((meaning & (SymbolFlags.Type & ~SymbolFlags.Value)) !== 0) {
    const symbol = resolveSymbol(host, host.resolveName(errorLocation, name, SymbolFlags.Module, undefined, false, false));
    if (symbol !== undefined) {
      pushDiagnostic(host, errorLocation, "Cannot_use_namespace_0_as_a_type", name);
      return true;
    }
  }
  return false;
}

export function checkAndReportErrorForUsingTypeAsValue(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
  meaning: number,
): boolean {
  if ((meaning & SymbolFlags.Value) === 0) return false;
  if (isPrimitiveTypeName(name)) {
    const grandparent = nodeParent(nodeParent(errorLocation));
    const containerKind = nodeParent(grandparent)?.kind;
    if (grandparent?.kind === Kind.HeritageClause) {
      const heritageKind = (grandparent as { token?: number }).token;
      if (containerKind === Kind.InterfaceDeclaration && heritageKind === Kind.ExtendsKeyword) {
        pushDiagnostic(host, errorLocation, "An_interface_cannot_extend_a_primitive_type_like_0_It_can_only_extend_other_named_object_types", name);
      } else if ((containerKind === Kind.ClassDeclaration || containerKind === Kind.ClassExpression) && heritageKind === Kind.ExtendsKeyword) {
        pushDiagnostic(host, errorLocation, "A_class_cannot_extend_a_primitive_type_like_0_Classes_can_only_extend_constructable_values", name);
      } else if ((containerKind === Kind.ClassDeclaration || containerKind === Kind.ClassExpression) && heritageKind === Kind.ImplementsKeyword) {
        pushDiagnostic(host, errorLocation, "A_class_cannot_implement_a_primitive_type_like_0_It_can_only_implement_other_named_object_types", name);
      }
    } else {
      pushDiagnostic(host, errorLocation, "X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here", name);
    }
    return true;
  }
  const symbol = resolveSymbol(host, host.resolveName(errorLocation, name, SymbolFlags.Type & ~SymbolFlags.Value, undefined, false, false));
  if (symbol === undefined) return false;
  const allFlags = host.getSymbolFlags?.(symbol) ?? symbol.flags ?? 0;
  if ((allFlags & SymbolFlags.Value) !== 0) return false;
  if (isES2015OrLaterConstructorName(name)) {
    pushDiagnostic(host, errorLocation, "X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_es2015_or_later", name);
  } else if (maybeMappedType(host, errorLocation, symbol)) {
    pushDiagnostic(host, errorLocation, "X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0", name, name === "K" ? "P" : "K");
  } else {
    pushDiagnostic(host, errorLocation, "X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here", name);
  }
  return true;
}

export function checkAndReportErrorForUsingValueAsType(
  host: NameResolutionHost,
  errorLocation: AstNode,
  name: string,
  meaning: number,
): boolean {
  if ((meaning & (SymbolFlags.Type & ~SymbolFlags.Namespace)) === 0) return false;
  const symbol = resolveSymbol(host, host.resolveName(errorLocation, name, (~SymbolFlags.Type) & SymbolFlags.Value, undefined, false, false));
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Namespace) === 0) {
    pushDiagnostic(host, errorLocation, "X_0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0", name);
    return true;
  }
  return false;
}

export function isPrimitiveTypeName(name: string): boolean {
  return name === "any" || name === "string" || name === "number" || name === "boolean" || name === "never" || name === "unknown";
}

export function isES2015OrLaterConstructorName(name: string): boolean {
  return name === "Promise" || name === "Symbol" || name === "Map" || name === "WeakMap" || name === "Set" || name === "WeakSet";
}

export function maybeMappedType(host: NameResolutionHost, node: AstNode, symbol: AstSymbol): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    const parent = nodeParent(current);
    if (parent?.kind !== Kind.ComputedPropertyName && parent?.kind !== Kind.PropertySignature) break;
    current = parent;
  }
  if (current?.kind !== Kind.TypeLiteral) return false;
  const members = nodeArray((current as { members?: unknown }).members);
  if (members.length !== 1) return false;
  const declared = host.getDeclaredTypeOfSymbol(symbol);
  return declared !== undefined && ((declared.flags ?? 0) & ((1 << 27) | (1 << 10) | (1 << 11))) !== 0;
}

export function getSuggestedLibForNonExistentName(name: string): string {
  if (name === "Promise" || name === "Symbol" || name === "Map" || name === "WeakMap" || name === "Set" || name === "WeakSet") return "es2015";
  if (name === "AsyncIterable" || name === "AsyncIterator") return "es2018";
  if (name === "BigInt" || name === "BigInt64Array" || name === "BigUint64Array") return "es2020";
  return "";
}

export function getPrimitiveTypeAliasSuggestions(symbols: ReadonlyMap<string, AstSymbol>): readonly AstSymbol[] {
  const result: AstSymbol[] = [];
  for (const [builtin, primitive] of [
    ["String", "string"],
    ["Number", "number"],
    ["Boolean", "boolean"],
    ["Object", "object"],
    ["BigInt", "bigint"],
    ["Symbol", "symbol"],
  ] as const) {
    if (symbols.has(builtin)) result.push({ flags: SymbolFlags.TypeAlias | SymbolFlags.Transient, name: primitive, escapedName: primitive, declarations: [] });
  }
  return result;
}

export function getSuggestionForSymbolNameLookup(
  host: Pick<NameResolutionHost, "compareSymbols" | "resolveAlias" | "getMergedSymbol" | "getSymbolFlags">,
  symbols: ReadonlyMap<string, AstSymbol>,
  name: string,
  meaning: number,
): AstSymbol | undefined {
  const symbol = getSymbolFromTable(host, symbols, name, meaning);
  if (symbol !== undefined) return symbol;
  const extras = (meaning & SymbolFlags.GlobalLookup) === 0 ? [] : getPrimitiveTypeAliasSuggestions(symbols);
  return getSpellingSuggestion(name, [...symbols.values(), ...extras], candidate => candidateNameForMeaning(host, candidate, meaning), host.compareSymbols ?? compareSymbols);
}

export function getSuggestedSymbolForNonexistentSymbol(
  host: Pick<NameResolutionHost, "compareSymbols" | "resolveAlias" | "globals">,
  _location: AstNode | undefined,
  outerName: string,
  meaning: number,
): AstSymbol | undefined {
  return getSpellingSuggestion(outerName, host.globals.values(), candidate => candidateNameForMeaning(host, candidate, meaning), host.compareSymbols ?? compareSymbols);
}

export function checkResolvedBlockScopedVariable(
  host: NameResolutionHost,
  result: AstSymbol,
  errorLocation: AstNode,
): void {
  const flags = result.flags ?? 0;
  if ((flags & (SymbolFlags.Function | SymbolFlags.FunctionScopedVariable | SymbolFlags.Assignment)) !== 0 && (flags & SymbolFlags.Class) !== 0) return;
  const declaration = (result.declarations ?? []).find(declaration =>
    isBlockOrCatchScoped(declaration) || declaration.kind === Kind.ClassDeclaration || declaration.kind === Kind.ClassExpression || declaration.kind === Kind.EnumDeclaration);
  if (declaration === undefined) return;
  if ((((declaration as { flags?: number }).flags ?? 0) & (1 << 23)) !== 0) return;
  if (isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation)) return;
  const declarationName = declarationNameToString(nameOfDeclaration(declaration));
  if ((flags & SymbolFlags.BlockScopedVariable) !== 0) pushDiagnostic(host, errorLocation, "Block_scoped_variable_0_used_before_its_declaration", declarationName);
  else if ((flags & SymbolFlags.Class) !== 0) pushDiagnostic(host, errorLocation, "Class_0_used_before_its_declaration", declarationName);
  else if ((flags & SymbolFlags.RegularEnum) !== 0 || (flags & SymbolFlags.ConstEnum) !== 0) pushDiagnostic(host, errorLocation, "Enum_0_used_before_its_declaration", declarationName);
}

export function isBlockScopedNameDeclaredBeforeUse(declaration: AstNode, usage: AstNode): boolean {
  const declarationFile = sourceFileOf(declaration);
  const useFile = sourceFileOf(usage);
  const declContainer = enclosingBlockScopeContainer(declaration);
  if (declarationFile !== useFile) return true;
  if (isInTypeQuery(usage) || isInAmbientOrTypeNode(usage)) return true;
  if (posOf(declaration) <= posOf(usage) && !(declaration.kind === Kind.PropertyDeclaration && isThisProperty(nodeParent(usage)) && initializerOf(declaration) === undefined && postfixTokenOf(declaration) === undefined)) {
    if (declaration.kind === Kind.BindingElement) {
      const errorBindingElement = findAncestor(usage, node => node.kind === Kind.BindingElement);
      if (errorBindingElement !== undefined) {
        return findAncestor(errorBindingElement, node => node.kind === Kind.BindingElement) !== findAncestor(declaration, node => node.kind === Kind.BindingElement)
          || posOf(declaration) < posOf(errorBindingElement);
      }
      const variableDeclaration = findAncestor(declaration, node => node.kind === Kind.VariableDeclaration);
      return variableDeclaration === undefined || isBlockScopedNameDeclaredBeforeUse(variableDeclaration, usage);
    }
    if (declaration.kind === Kind.VariableDeclaration) return !isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration, usage, declContainer);
    if (declaration.kind === Kind.ClassDeclaration || declaration.kind === Kind.ClassExpression) return isClassUseDeferred(declaration, usage);
    if (declaration.kind === Kind.PropertyDeclaration) return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, false);
    if (isParameterPropertyDeclaration(declaration)) return !isUsedInFunctionOrInstanceProperty(usage, declaration, declContainer);
    return true;
  }
  const parent = nodeParent(usage);
  if (parent?.kind === Kind.ExportSpecifier || (parent?.kind === Kind.ExportAssignment && (parent as { isExportEquals?: boolean }).isExportEquals === true)) return true;
  if (usage.kind === Kind.ExportAssignment && (usage as { isExportEquals?: boolean }).isExportEquals === true) return true;
  if (isUsedInFunctionOrInstanceProperty(usage, declaration, declContainer)) return true;
  return false;
}

export function isUsedInFunctionOrInstanceProperty(
  usage: AstNode,
  declaration: AstNode,
  declContainer: AstNode | undefined,
): boolean {
  for (let current: AstNode | undefined = usage; current !== undefined; current = nodeParent(current)) {
    if (current === declContainer) return false;
    if (isFunctionLike(current)) return !isImmediatelyInvokedFunctionExpression(current);
    if (current.kind === Kind.ClassStaticBlockDeclaration) return posOf(declaration) < posOf(usage);
    const parent = nodeParent(current);
    if (parent?.kind === Kind.PropertyDeclaration && (parent as { initializer?: AstNode }).initializer === current) {
      if (isStatic(parent)) return declaration.kind === Kind.MethodDeclaration;
      const declarationInstanceProperty = declaration.kind === Kind.PropertyDeclaration && !isStatic(declaration);
      if (!declarationInstanceProperty || containingClass(usage) !== containingClass(declaration)) return true;
    }
    if (parent?.kind === Kind.Decorator) {
      const decoratorParent = nodeParent(parent);
      if (decoratorParent?.kind === Kind.Parameter) return isUsedInFunctionOrInstanceProperty(nodeParent(nodeParent(decoratorParent)!) ?? decoratorParent, declaration, declContainer);
      if (decoratorParent?.kind === Kind.MethodDeclaration) return isUsedInFunctionOrInstanceProperty(nodeParent(decoratorParent) ?? decoratorParent, declaration, declContainer);
    }
  }
  return false;
}

export function isImmediatelyUsedInInitializerOfBlockScopedVariable(
  declaration: AstNode,
  usage: AstNode,
  declContainer: AstNode | undefined,
): boolean {
  const declarationList = nodeParent(declaration);
  const grandparent = nodeParent(declarationList);
  if (grandparent?.kind === Kind.VariableStatement || grandparent?.kind === Kind.ForStatement || grandparent?.kind === Kind.ForOfStatement) {
    if (isSameScopeDescendentOf(usage, declaration, declContainer)) return true;
  }
  return (grandparent?.kind === Kind.ForInStatement || grandparent?.kind === Kind.ForOfStatement)
    && isSameScopeDescendentOf(usage, expressionOf(grandparent), declContainer);
}

export function isSameScopeDescendentOf(
  initial: AstNode,
  parent: AstNode | undefined,
  stopAt: AstNode | undefined,
): boolean {
  if (parent === undefined) return false;
  for (let node: AstNode | undefined = initial; node !== undefined; node = nodeParent(node)) {
    if (node === parent) return true;
    if (node === stopAt || (isFunctionLike(node) && !isImmediatelyInvokedFunctionExpression(node))) return false;
  }
  return false;
}

export function isPropertyImmediatelyReferencedWithinDeclaration(
  declaration: AstNode,
  usage: AstNode,
  stopAtAnyPropertyDeclaration: boolean,
): boolean {
  if (endOf(usage) > endOf(declaration)) return false;
  for (let node: AstNode | undefined = usage; node !== undefined && node !== declaration; node = nodeParent(node)) {
    if (node.kind === Kind.ArrowFunction) return false;
    if (node.kind === Kind.PropertyDeclaration) {
      return stopAtAnyPropertyDeclaration && (nodeParent(node) === nodeParent(declaration) || nodeParent(node) === nodeParent(nodeParent(declaration)));
    }
    if (node.kind === Kind.Block) {
      const parent = nodeParent(node);
      if (parent?.kind === Kind.MethodDeclaration || parent?.kind === Kind.GetAccessor || parent?.kind === Kind.SetAccessor) return false;
    }
  }
  return true;
}

export function getTypeOnlyAliasDeclaration(host: Pick<NameResolutionHost, "resolveAlias">, symbol: AstSymbol): AstNode | undefined {
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) === 0) return undefined;
  host.resolveAlias?.(symbol);
  return (symbol as { typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration;
}

export function getTypeOnlyAliasDeclarationEx(host: Pick<NameResolutionHost, "resolveAlias">, symbol: AstSymbol, meaning: number): AstNode | undefined {
  let current: AstSymbol | undefined = symbol;
  while (current !== undefined && ((current.flags ?? 0) & SymbolFlags.Alias) !== 0 && ((current.flags ?? 0) & meaning) === 0) {
    const declaration = (current as { typeOnlyDeclaration?: AstNode }).typeOnlyDeclaration;
    if (declaration !== undefined) return declaration;
    current = host.resolveAlias?.(current);
  }
  return undefined;
}

export function getImmediateAliasedSymbol(host: Pick<NameResolutionHost, "resolveAlias">, symbol: AstSymbol): AstSymbol | undefined {
  if (((symbol.flags ?? 0) & SymbolFlags.Alias) === 0) return undefined;
  const cached = (symbol as { immediateTarget?: AstSymbol }).immediateTarget;
  if (cached !== undefined) return cached;
  const target = host.resolveAlias?.(symbol);
  if (target !== undefined) (symbol as { immediateTarget?: AstSymbol }).immediateTarget = target;
  return target;
}

export function addTypeOnlyDeclarationRelatedInfo<T extends { relatedInfo?: unknown[] }>(
  diagnostic: T,
  typeOnlyDeclaration: AstNode | undefined,
  name: string,
): T {
  if (typeOnlyDeclaration === undefined) return diagnostic;
  diagnostic.relatedInfo = [...(diagnostic.relatedInfo ?? []), {
    node: typeOnlyDeclaration,
    message: isExportTypeOnlyDeclaration(typeOnlyDeclaration) ? "X_0_was_exported_here" : "X_0_was_imported_here",
    args: [name],
  }];
  return diagnostic;
}

function candidateNameForMeaning(host: Pick<NameResolutionHost, "resolveAlias">, candidate: AstSymbol, meaning: number): string {
  const candidateName = symbolDisplayName(candidate);
  if (candidateName.length === 0 || candidateName.startsWith("\"") || candidateName.charCodeAt(0) === 0xfe) return "";
  if (((candidate.flags ?? 0) & meaning) !== 0) return candidateName;
  if (((candidate.flags ?? 0) & SymbolFlags.Alias) !== 0) {
    const alias = host.resolveAlias?.(candidate);
    if (alias !== undefined && ((alias.flags ?? 0) & meaning) !== 0) return candidateName;
  }
  return "";
}

function resolveSymbol(host: Pick<NameResolutionHost, "resolveAlias">, symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol !== undefined && ((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) return host.resolveAlias?.(symbol) ?? symbol;
  return symbol;
}

function compareSymbols(left: AstSymbol, right: AstSymbol): number {
  return symbolDisplayName(left).localeCompare(symbolDisplayName(right));
}

function pushDiagnostic(host: NameResolutionDiagnostics, node: AstNode | undefined, message: string, ...args: readonly unknown[]): void {
  if (node === undefined) host.diagnostics.push({ message, args });
  else host.diagnostics.push({ node, message, args });
}

function symbolDisplayName(symbol: AstSymbol | undefined): string {
  return symbol?.escapedName ?? symbol?.name ?? "";
}

function identifierText(node: AstNode | undefined): string {
  return (node as { text?: string } | undefined)?.text ?? "";
}

function declarationNameToString(node: AstNode | undefined): string {
  return identifierText(node) || ((node as { name?: string } | undefined)?.name ?? "");
}

function nameOfDeclaration(node: AstNode | undefined): AstNode | undefined {
  return (node as { name?: AstNode } | undefined)?.name;
}

function valueDeclarationOf(symbol: AstSymbol | undefined): AstNode | undefined {
  return (symbol as { valueDeclaration?: AstNode } | undefined)?.valueDeclaration ?? symbol?.declarations?.[0];
}

function exportSymbolOfValueSymbolIfExported(symbol: AstSymbol): AstSymbol {
  return (symbol as { exportSymbol?: AstSymbol }).exportSymbol ?? symbol;
}

function lateBoundSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { lateSymbol?: AstSymbol }).lateSymbol ?? symbol;
}

function rootDeclaration(node: AstNode): AstNode {
  let current = node;
  while (nodeParent(current) !== undefined && isDeclarationName(current)) current = nodeParent(current)!;
  return current;
}

function isDeclarationName(node: AstNode): boolean {
  const parent = nodeParent(node);
  return parent !== undefined && (parent as { name?: AstNode }).name === node;
}

function isTypeReferenceIdentifier(node: AstNode): boolean {
  const parent = nodeParent(node);
  return parent?.kind === Kind.TypeReference || parent?.kind === Kind.ExpressionWithTypeArguments;
}

function isInTypeQuery(node: AstNode): boolean {
  return findAncestor(node, current => current.kind === Kind.TypeQuery) !== undefined;
}

function getThisContainer(node: AstNode): AstNode {
  let current: AstNode = node;
  for (let parent = nodeParent(current); parent !== undefined; parent = nodeParent(parent)) {
    if (isFunctionLike(parent) || parent.kind === Kind.ClassStaticBlockDeclaration) return parent;
    current = parent;
  }
  return current;
}

function isStatic(node: AstNode): boolean {
  return modifierKinds(node).includes(Kind.StaticKeyword);
}

function modifierKinds(node: AstNode): readonly Kind[] {
  const modifiers = (node as { modifiers?: readonly AstNode[] | { nodes?: readonly AstNode[] } }).modifiers;
  let nodes: readonly AstNode[];
  if (Array.isArray(modifiers)) nodes = modifiers;
  else nodes = (modifiers as { nodes?: readonly AstNode[] } | undefined)?.nodes ?? [];
  return nodes.map((modifier: AstNode) => modifier.kind);
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isNode);
  if (value !== undefined && Array.isArray((value as { nodes?: unknown }).nodes)) return (value as { nodes: unknown[] }).nodes.filter(isNode);
  return [];
}

function symbolTableOf(owner: unknown, field: "locals" | "exports" | "members"): SymbolTable | undefined {
  const table = (owner as Record<string, unknown> | undefined)?.[field];
  return table instanceof Map ? table as SymbolTable : undefined;
}

function isGlobalScopeAugmentation(node: AstNode | undefined): boolean {
  return node?.kind === Kind.ModuleDeclaration && identifierText((node as { name?: AstNode }).name) === "global";
}

function isValidTypeOnlyAliasUseSite(node: AstNode): boolean {
  return isInTypeQuery(node) || findAncestor(node, current => current.kind === Kind.ImportType || current.kind === Kind.TypeReference) !== undefined;
}

function isExportTypeOnlyDeclaration(node: AstNode): boolean {
  return node.kind === Kind.ExportSpecifier || node.kind === Kind.ExportDeclaration || node.kind === Kind.NamespaceExport;
}

function isBlockOrCatchScoped(node: AstNode): boolean {
  return node.kind === Kind.VariableDeclaration
    || node.kind === Kind.BindingElement
    || node.kind === Kind.CatchClause;
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  return findAncestor(node, current => current.kind === Kind.SourceFile || (current as { fileName?: string }).fileName !== undefined);
}

function enclosingBlockScopeContainer(node: AstNode): AstNode | undefined {
  for (let current = nodeParent(node); current !== undefined; current = nodeParent(current)) {
    if (current.kind === Kind.SourceFile
      || current.kind === Kind.Block
      || current.kind === Kind.ModuleBlock
      || current.kind === Kind.CaseBlock
      || isFunctionLike(current)
      || current.kind === Kind.ClassStaticBlockDeclaration) return current;
  }
  return undefined;
}

function isInAmbientOrTypeNode(node: AstNode): boolean {
  return findAncestor(node, current => (((current as { flags?: number }).flags ?? 0) & (1 << 23)) !== 0 || isTypeNodeKind(current.kind)) !== undefined;
}

function isTypeNodeKind(kind: Kind): boolean {
  return kind === Kind.TypeReference
    || kind === Kind.TypeLiteral
    || kind === Kind.ArrayType
    || kind === Kind.TupleType
    || kind === Kind.UnionType
    || kind === Kind.IntersectionType
    || kind === Kind.ConditionalType
    || kind === Kind.InferType
    || kind === Kind.TypeOperator
    || kind === Kind.IndexedAccessType
    || kind === Kind.MappedType
    || kind === Kind.TemplateLiteralType
    || kind === Kind.ImportType;
}

function initializerOf(node: AstNode): AstNode | undefined {
  return (node as { initializer?: AstNode }).initializer;
}

function postfixTokenOf(node: AstNode): AstNode | undefined {
  return (node as { postfixToken?: AstNode }).postfixToken;
}

function isThisProperty(node: AstNode | undefined): boolean {
  return node?.kind === Kind.PropertyAccessExpression && (node as { expression?: AstNode }).expression?.kind === Kind.ThisKeyword;
}

function isParameterPropertyDeclaration(node: AstNode): boolean {
  return node.kind === Kind.Parameter && modifierKinds(node).some(kind => kind === Kind.PublicKeyword || kind === Kind.PrivateKeyword || kind === Kind.ProtectedKeyword || kind === Kind.ReadonlyKeyword);
}

function isClassUseDeferred(declaration: AstNode, usage: AstNode): boolean {
  for (let current: AstNode | undefined = usage; current !== undefined && current !== declaration; current = nodeParent(current)) {
    const parent = nodeParent(current);
    if (current.kind === Kind.ComputedPropertyName && nodeParent(parent) === declaration) return false;
    if (current.kind === Kind.Decorator && (parent === declaration || nodeParent(parent) === declaration || nodeParent(nodeParent(parent)) === declaration)) return false;
  }
  return true;
}

function containingClass(node: AstNode): AstNode | undefined {
  return findAncestor(node, current => current.kind === Kind.ClassDeclaration || current.kind === Kind.ClassExpression);
}

function isFunctionLike(node: AstNode): boolean {
  return node.kind === Kind.FunctionDeclaration
    || node.kind === Kind.FunctionExpression
    || node.kind === Kind.ArrowFunction
    || node.kind === Kind.MethodDeclaration
    || node.kind === Kind.GetAccessor
    || node.kind === Kind.SetAccessor
    || node.kind === Kind.Constructor;
}

function isImmediatelyInvokedFunctionExpression(node: AstNode): boolean {
  const parent = nodeParent(node);
  return parent?.kind === Kind.CallExpression && (parent as { expression?: AstNode }).expression === node;
}

function expressionOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { expression?: AstNode } | undefined)?.expression;
}

function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  for (let current = node; current !== undefined; current = nodeParent(current)) {
    if (predicate(current)) return current;
  }
  return undefined;
}

function posOf(node: AstNode | undefined): number {
  return (node as { pos?: number } | undefined)?.pos ?? 0;
}

function endOf(node: AstNode | undefined): number {
  return (node as { end?: number } | undefined)?.end ?? posOf(node);
}

function isNode(value: unknown): value is AstNode {
  return typeof value === "object" && value !== null && typeof (value as { kind?: unknown }).kind === "number";
}
