/**
 * Checker-side EmitResolver implementation.
 *
 * Substantive port of TS-Go `internal/checker/emitresolver.go` (~1233 LoC).
 * Implements the printer.EmitResolver interface (see ../printer/emitresolver.ts)
 * by routing through the checker's symbol + type resolution.
 */

import { getCombinedNodeFlags, hasSyntacticModifier, Kind, NodeFlags, SymbolFlags } from "../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, Declaration, IdentifierNode, Expression } from "../ast/index.js";
import { ModifierFlags } from "../enums/modifierFlags.enum.js";
import { SymbolAccessibility, type SymbolAccessibilityResult, type EmitResolver } from "../printer/emitResolver.js";
import { ObjectFlags, TypeFlags, type Type } from "./types.js";

export type TypeReferenceSerializationKind = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const TypeReferenceSerializationKind = {
  Unknown: 0 as TypeReferenceSerializationKind,
  TypeWithConstructSignatureAndValue: 1 as TypeReferenceSerializationKind,
  VoidNullableOrNeverType: 2 as TypeReferenceSerializationKind,
  NumberLikeType: 3 as TypeReferenceSerializationKind,
  BigIntLikeType: 4 as TypeReferenceSerializationKind,
  StringLikeType: 5 as TypeReferenceSerializationKind,
  BooleanType: 6 as TypeReferenceSerializationKind,
  ArrayLikeType: 7 as TypeReferenceSerializationKind,
  ESSymbolType: 8 as TypeReferenceSerializationKind,
  Promise: 9 as TypeReferenceSerializationKind,
  TypeWithCallSignature: 10 as TypeReferenceSerializationKind,
  ObjectType: 11 as TypeReferenceSerializationKind,
} as const;

export class CheckerEmitResolver implements EmitResolver {
  getJsxFactoryEntity(location: AstNode | undefined): AstNode | undefined {
    return findClosest(location, (node) => nodeField(node, "jsxFactoryEntity"))
      ?? findClosest(location, (node) => nodeField(node, "jsxFactory"));
  }

  getJsxFragmentFactoryEntity(location: AstNode | undefined): AstNode | undefined {
    return findClosest(location, (node) => nodeField(node, "jsxFragmentFactoryEntity"))
      ?? findClosest(location, (node) => nodeField(node, "jsxFragmentFactory"));
  }

  // Alias / value-alias queries
  isReferencedAliasDeclaration(node: AstNode): boolean {
    if (!isAliasDeclaration(node)) return false;
    const symbol = declarationSymbol(node);
    if (symbol === undefined) return this.isValueAliasDeclaration(node);
    const aliasLinks = symbol as unknown as { aliasReferenced?: boolean; referenced?: boolean; aliasTarget?: AstSymbol };
    if (aliasLinks.aliasReferenced === true || aliasLinks.referenced === true) return true;
    const target = aliasLinks.aliasTarget ?? symbol.exportSymbol;
    return hasExportModifier(node) && target !== undefined && ((target.flags ?? 0) & SymbolFlags.Value) !== 0;
  }
  isValueAliasDeclaration(node: AstNode): boolean {
    return this.isValueAliasDeclarationWorker(node);
  }
  isValueAliasDeclarationWorker(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.ImportEqualsDeclaration:
        return this.isAliasResolvedToValue(declarationSymbol(node), false);
      case Kind.ImportClause:
      case Kind.NamespaceImport:
      case Kind.ImportSpecifier:
      case Kind.ExportSpecifier:
        return !isTypeOnlyAlias(node) && this.isAliasResolvedToValue(declarationSymbol(node), true);
      case Kind.ExportDeclaration: {
        const exportClause = (node as unknown as { exportClause?: AstNode }).exportClause;
        if (exportClause === undefined) return false;
        if (exportClause.kind === Kind.NamespaceExport) return true;
        const elements = (exportClause as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
        return elements.some((element) => this.isValueAliasDeclaration(element));
      }
      case Kind.ExportAssignment: {
        const expression = (node as unknown as { expression?: AstNode }).expression;
        return expression?.kind === Kind.Identifier ? this.isAliasResolvedToValue(declarationSymbol(node), true) : true;
      }
      case Kind.BinaryExpression:
        return isCommonJSModuleExports(node) && ((node as unknown as { right?: AstNode }).right?.kind === Kind.Identifier)
          ? this.isAliasResolvedToValue(declarationSymbol(node), true)
          : false;
    }
    return false;
  }
  private isAliasResolvedToValue(symbol: AstSymbol | undefined, excludeTypeOnlyValues: boolean): boolean {
    if (symbol === undefined) return false;
    if (excludeTypeOnlyValues && typeOnlyAliasDeclaration(symbol) !== undefined) return false;
    const target = symbol.exportSymbol ?? (symbol as unknown as { aliasTarget?: AstSymbol }).aliasTarget ?? symbol;
    return ((target.flags ?? symbol.flags ?? 0) & SymbolFlags.Value) !== 0;
  }
  isTopLevelValueImportEqualsWithEntityName(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.ImportEqualsDeclaration) return false;
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (parent === undefined) return false;
    if ((parent as { kind?: number }).kind !== Kind.SourceFile) return false;
    // Entity-name (not require-call) — moduleReference.kind is
    // QualifiedName or Identifier.
    const ref = (node as unknown as { moduleReference?: { kind?: number } }).moduleReference;
    if (ref?.kind !== Kind.QualifiedName && ref?.kind !== Kind.Identifier) return false;
    return this.isAliasResolvedToValue(declarationSymbol(node), false);
  }
  hasGlobalName(name: string): boolean {
    // Without a global-symbol table, conservative false. Real impl
    // consults the checker's globals.
    void name; return false;
  }
  getReferencedExportContainer(node: IdentifierNode, prefixLocals: boolean): AstNode | undefined {
    // Match referenceresolver semantics: find the parent symbol's
    // first declaration node.
    void prefixLocals;
    const sym = (node as unknown as { symbol?: AstSymbol }).symbol;
    if (sym === undefined) return undefined;
    const parent = (sym as unknown as { parent?: AstSymbol }).parent;
    if (parent === undefined) return undefined;
    const decls = (parent as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined || decls.length === 0) return undefined;
    return decls[0];
  }
  getReferencedImportDeclaration(node: IdentifierNode): Declaration | undefined {
    const sym = (node as unknown as { symbol?: AstSymbol }).symbol;
    if (sym === undefined) return undefined;
    const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined) return undefined;
    for (const d of decls) {
      const k = (d as { kind?: number }).kind;
      if (k === Kind.ImportClause || k === Kind.ImportSpecifier ||
          k === Kind.NamespaceImport || k === Kind.ImportEqualsDeclaration) {
        return d as Declaration;
      }
    }
    return undefined;
  }
  getReferencedDeclarationWithCollidingName(node: IdentifierNode): Declaration | undefined {
    const name = nodeText(node);
    if (name === "") return undefined;
    const symbol = declarationSymbol(node);
    const declarations = symbol?.declarations ?? [];
    for (const declaration of declarations) {
      if (declaration !== node && declarationNameText(declaration) === name && this.isDeclarationWithCollidingName(declaration)) {
        return declaration as Declaration;
      }
    }
    return undefined;
  }
  isDeclarationWithCollidingName(node: AstNode): boolean {
    const name = declarationNameText(node);
    if (name === "") return false;
    const siblings = siblingDeclarations(node);
    return siblings.some((candidate) => candidate !== node && declarationNameText(candidate) === name && declarationHasValueMeaning(candidate) === declarationHasValueMeaning(node));
  }
  isValueAlias(node: AstNode): boolean { return this.isValueAliasDeclaration(node); }

  // Constants + literals
  getConstantValue(node: AstNode): string | number | undefined {
    // For literal nodes, return the literal value directly. The full
    // checker also collapses enum-member constant references; without
    // type info we restrict to literal-direct cases.
    const k = (node as { kind?: number }).kind;
    if (k === Kind.NumericLiteral) {
      const text = (node as unknown as { text?: string }).text ?? "";
      const n = Number(text);
      return Number.isFinite(n) ? n : undefined;
    }
    if (k === Kind.StringLiteral || k === Kind.NoSubstitutionTemplateLiteral) {
      return (node as unknown as { text?: string }).text;
    }
    return undefined;
  }
  getEnumMemberValue(node: AstNode): string | number | undefined {
    // Use the initializer's constant value when present.
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) return undefined;
    return this.getConstantValue(init);
  }
  collectLinkedAliases(node: IdentifierNode, setVisibility: boolean): readonly AstNode[] {
    const result: AstNode[] = [];
    const seen = new Set<AstSymbol>();
    let current: AstSymbol | undefined = declarationSymbol(node);
    while (current !== undefined && !seen.has(current)) {
      seen.add(current);
      if (setVisibility) {
        (current as unknown as { aliasReferenced?: boolean }).aliasReferenced = true;
      }
      result.push(...current.declarations);
      current = current.exportSymbol ?? (current as unknown as { aliasTarget?: AstSymbol }).aliasTarget;
    }
    return result;
  }
  markLinkedAliases(node: IdentifierNode): void {
    this.collectLinkedAliases(node, true);
  }
  markLinkedReferencesRecursively(file: AstNode): void {
    forEachChild(file, node => {
      this.aliasMarkingVisitorWorker(node);
      return true;
    });
  }
  aliasMarkingVisitorWorker(node: AstNode): boolean {
    if (node.kind === Kind.ExportSpecifier) {
      const name = (node as { readonly propertyName?: IdentifierNode; readonly name?: IdentifierNode }).propertyName
        ?? (node as { readonly name?: IdentifierNode }).name;
      if (name !== undefined) this.markLinkedAliases(name);
    } else if (node.kind === Kind.ExportAssignment || isCommonJSModuleExports(node)) {
      const expression = (node as { readonly expression?: IdentifierNode; readonly right?: IdentifierNode }).expression
        ?? (node as { readonly right?: IdentifierNode }).right;
      if (expression?.kind === Kind.Identifier) this.markLinkedAliases(expression);
    }
    return true;
  }
  getMeaningOfEntityNameReference(entityName: AstNode): number {
    const parent = (entityName as { readonly parent?: AstNode }).parent;
    if (parent?.kind === Kind.TypeQuery
      || parent?.kind === Kind.ComputedPropertyName
      || parent?.kind === Kind.TypePredicate) {
      return SymbolFlags.Value | SymbolFlags.ExportValue;
    }
    if (entityName.kind === Kind.QualifiedName
      || entityName.kind === Kind.PropertyAccessExpression
      || parent?.kind === Kind.ImportEqualsDeclaration
      || parent?.kind === Kind.QualifiedName
      || parent?.kind === Kind.PropertyAccessExpression
      || parent?.kind === Kind.ElementAccessExpression) {
      return SymbolFlags.Namespace;
    }
    return SymbolFlags.Type;
  }
  isEntityNameVisible(entityName: AstNode, enclosingDeclaration: AstNode | undefined): SymbolAccessibilityResult {
    const firstIdentifier = firstIdentifierOf(entityName);
    const symbol = firstIdentifier === undefined ? undefined : declarationSymbol(firstIdentifier);
    if (symbol === undefined) {
      const result: SymbolAccessibilityResult = {
        accessibility: SymbolAccessibility.NotResolved,
        errorSymbolName: nodeText(firstIdentifier),
      };
      if (firstIdentifier !== undefined) result.errorNode = firstIdentifier;
      return result;
    }
    return this.hasVisibleDeclarations(symbol, true, enclosingDeclaration);
  }
  hasVisibleDeclarations(symbol: AstSymbol, shouldComputeAliasToMakeVisible: boolean, enclosingDeclaration: AstNode | undefined): SymbolAccessibilityResult {
    const aliasesToMakeVisible: AstNode[] = [];
    for (const declaration of symbol.declarations ?? []) {
      if (this.isDeclarationVisible(declaration)) continue;
      const importSyntax = getAnyImportSyntax(declaration);
      if (shouldComputeAliasToMakeVisible && importSyntax !== undefined && this.isDeclarationVisible(parentOrSelf(importSyntax))) {
        aliasesToMakeVisible.push(importSyntax);
        continue;
      }
      const result: SymbolAccessibilityResult = {
        accessibility: SymbolAccessibility.NotAccessible,
        errorSymbolName: symbol.name ?? symbol.escapedName ?? "",
      };
      if (enclosingDeclaration !== undefined) result.errorNode = enclosingDeclaration;
      return result;
    }
    return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };
  }
  isDeclarationVisible(node: AstNode): boolean {
    return this.determineIfDeclarationIsVisible(node);
  }
  determineIfDeclarationIsVisible(node: AstNode): boolean {
    switch (node.kind) {
      case Kind.SourceFile:
      case Kind.NamespaceExportDeclaration:
      case Kind.TypeParameter:
        return true;
      case Kind.ImportClause:
      case Kind.NamespaceImport:
      case Kind.ImportSpecifier:
      case Kind.ExportAssignment:
        return false;
      case Kind.BindingElement:
        return parentOf(parentOf(node)) === undefined ? false : this.isDeclarationVisible(parentOf(parentOf(node))!);
      case Kind.PropertyDeclaration:
      case Kind.PropertySignature:
      case Kind.GetAccessor:
      case Kind.SetAccessor:
      case Kind.MethodDeclaration:
      case Kind.MethodSignature:
        if (hasSyntacticModifier(node, ModifierFlags.Private | ModifierFlags.Protected)) return false;
        return parentOf(node) === undefined || this.isDeclarationVisible(parentOf(node)!);
      case Kind.Parameter:
      case Kind.Constructor:
      case Kind.ConstructSignature:
      case Kind.CallSignature:
      case Kind.IndexSignature:
      case Kind.FunctionType:
      case Kind.ConstructorType:
      case Kind.TypeLiteral:
      case Kind.TypeReference:
      case Kind.ArrayType:
      case Kind.TupleType:
      case Kind.UnionType:
      case Kind.IntersectionType:
      case Kind.ParenthesizedType:
      case Kind.NamedTupleMember:
        return parentOf(node) === undefined || this.isDeclarationVisible(parentOf(node)!);
      default:
        if (hasExportModifier(node)) return parentOf(node) === undefined || this.isDeclarationVisible(parentOf(node)!);
        return parentOf(node)?.kind === Kind.SourceFile && isGlobalSourceFile(parentOf(node)!);
    }
  }
  precalculateDeclarationEmitVisibility(file: AstNode): void {
    forEachChild(file, node => {
      this.aliasMarkingVisitorWorker(node);
      return true;
    });
  }

  // Overload classification
  isImplementationOfOverload(node: AstNode): boolean {
    if (hasBody(node) === false) return false;
    if (node.kind === Kind.GetAccessor || node.kind === Kind.SetAccessor) return false;
    const symbolDeclarations = declarationSymbol(node)?.declarations ?? [];
    if (symbolDeclarations.some((declaration) => declaration !== node && declarationNameText(declaration) === declarationNameText(node) && !hasBody(declaration))) {
      return true;
    }
    const siblings = siblingDeclarations(node);
    return siblings.some((declaration) => declaration !== node && declarationNameText(declaration) === declarationNameText(node) && !hasBody(declaration));
  }
  isLateBound(node: AstNode): boolean {
    if (node.kind !== Kind.ComputedPropertyName) return false;
    return !this.isLiteralComputedPropertyDeclarationName(node);
  }
  isLiteralComputedPropertyDeclarationName(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.ComputedPropertyName) return false;
    const expr = (node as unknown as { expression?: { kind?: number } }).expression;
    return expr?.kind === Kind.StringLiteral || expr?.kind === Kind.NumericLiteral;
  }

  // Node-check flags
  getNodeCheckFlags(node: AstNode): number {
    return (node as unknown as { checkFlags?: number }).checkFlags ?? 0;
  }

  // Parameter classification
  isOptionalParameter(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined ||
           (node as unknown as { initializer?: AstNode }).initializer !== undefined ||
           (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
  }
  isRequiredInitializedParameter(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { initializer?: AstNode }).initializer !== undefined &&
           (node as unknown as { questionToken?: AstNode }).questionToken === undefined;
  }
  isOptionalUninitializedParameterProperty(node: AstNode): boolean {
    if ((node as { kind?: number }).kind !== Kind.Parameter) return false;
    return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined &&
           (node as unknown as { initializer?: AstNode }).initializer === undefined;
  }

  // Expando functions
  isExpandoFunctionDeclaration(node: AstNode): boolean {
    return this.getPropertiesOfContainerFunction(node).some(isExpandoPropertyDeclaration);
  }
  getPropertiesOfContainerFunction(node: AstNode): readonly AstNode[] {
    const symbol = declarationSymbol(node);
    const members = symbol?.members ?? symbol?.exports;
    if (members === undefined) return [];
    const result: AstNode[] = [];
    for (const member of members.values()) result.push(...member.declarations);
    return result;
  }
  isImportRequiredByAugmentation(node: AstNode): boolean {
    const sourceFile = sourceFileOf(node);
    const target = this.getExternalModuleFileFromDeclaration(node);
    return sourceFile !== undefined && target !== undefined && sourceFile !== target;
  }
  isDefinitelyReferenceToGlobalSymbolObject(node: AstNode): boolean {
    if (node.kind !== Kind.PropertyAccessExpression) return false;
    const expression = (node as { readonly expression?: AstNode }).expression;
    if (expression?.kind === Kind.Identifier) return nodeText(expression) === "Symbol";
    if (expression?.kind !== Kind.PropertyAccessExpression) return false;
    const base = (expression as { readonly expression?: AstNode }).expression;
    const name = (expression as { readonly name?: AstNode }).name;
    return base?.kind === Kind.Identifier && nodeText(base) === "globalThis" && nodeText(name) === "Symbol";
  }
  requiresAddingImplicitUndefined(declaration: AstNode, symbol: AstSymbol | undefined, enclosingDeclaration: AstNode | undefined): boolean {
    switch (declaration.kind) {
      case Kind.PropertyDeclaration:
      case Kind.PropertySignature:
        return ((symbol?.flags ?? declarationSymbol(declaration)?.flags ?? 0) & SymbolFlags.Optional) !== 0
          && isOptionalDeclaration(declaration);
      case Kind.Parameter:
        return this.requiresAddingImplicitUndefinedWorker(declaration, enclosingDeclaration);
      default:
        return false;
    }
  }
  requiresAddingImplicitUndefinedWorker(parameter: AstNode, enclosingDeclaration: AstNode | undefined): boolean {
    return (this.isRequiredInitializedParameter(parameter) || this.isOptionalUninitializedParameterProperty(parameter))
      && !this.declaredParameterTypeContainsUndefined(parameter, enclosingDeclaration);
  }
  declaredParameterTypeContainsUndefined(parameter: AstNode, enclosingDeclaration?: AstNode): boolean {
    void enclosingDeclaration;
    const typeNode = (parameter as { readonly type?: AstNode }).type;
    return typeNode !== undefined && containsUndefinedTypeNode(typeNode);
  }
  requiresAddingImplicitUndefinedUnsafe(declaration: AstNode, symbol: AstSymbol | undefined, enclosingDeclaration: AstNode | undefined): boolean {
    return this.requiresAddingImplicitUndefined(declaration, symbol, enclosingDeclaration);
  }
  isLiteralConstDeclaration(node: AstNode): boolean {
    const initializer = (node as { readonly initializer?: AstNode }).initializer;
    return initializer !== undefined && isLiteralExpression(initializer) && hasSyntacticModifier(node, ModifierFlags.Const);
  }
  isExpandoFunctionDeclarationUnsafe(node: AstNode): boolean {
    return this.isExpandoFunctionDeclaration(node);
  }
  getExternalModuleFileFromDeclaration(node: AstNode): AstNode | undefined {
    const moduleSpecifier = (node as { readonly moduleSpecifier?: AstNode }).moduleSpecifier;
    const symbol = moduleSpecifier === undefined ? undefined : declarationSymbol(moduleSpecifier);
    return symbol?.declarations?.find(declaration => declaration.kind === Kind.SourceFile);
  }
  setReferencedImportDeclaration(node: IdentifierNode, declaration: Declaration | undefined): void {
    const target = node as unknown as { referencedImportDeclaration?: Declaration };
    if (declaration === undefined) {
      delete target.referencedImportDeclaration;
    } else {
      target.referencedImportDeclaration = declaration;
    }
  }
  getReferencedValueDeclaration(node: IdentifierNode): Declaration | undefined {
    const symbol = declarationSymbol(node);
    return symbol?.declarations?.find(declarationHasValueMeaning) as Declaration | undefined;
  }
  getReferencedValueDeclarations(node: IdentifierNode): readonly Declaration[] {
    return (declarationSymbol(node)?.declarations ?? []).filter(declarationHasValueMeaning) as unknown as readonly Declaration[];
  }
  getElementAccessExpressionName(node: AstNode): string | undefined {
    if (node.kind !== Kind.ElementAccessExpression) return undefined;
    const argument = (node as { readonly argumentExpression?: AstNode }).argumentExpression;
    if (argument?.kind === Kind.StringLiteral || argument?.kind === Kind.NumericLiteral) return nodeText(argument);
    return undefined;
  }
  getReferencedMemberValueDeclaration(node: IdentifierNode): Declaration | undefined {
    const symbol = declarationSymbol(node);
    return symbol?.declarations?.find(declaration => declaration.kind === Kind.PropertyDeclaration || declaration.kind === Kind.MethodDeclaration) as Declaration | undefined;
  }
  createTypeParametersOfSignatureDeclaration(signatureDeclaration: AstNode): readonly AstNode[] {
    return nodeArray((signatureDeclaration as { readonly typeParameters?: unknown }).typeParameters);
  }
  createLiteralConstValue(node: AstNode): string | number | undefined {
    return this.getConstantValue(node);
  }
  createLateBoundIndexSignatures(node: AstNode): readonly AstNode[] {
    return nodeArray((node as { readonly members?: unknown }).members).filter(member => this.isLateBound((member as { readonly name?: AstNode }).name ?? member));
  }
  getEffectiveDeclarationFlags(node: AstNode, flagsToCheck: ModifierFlags): ModifierFlags {
    return hasSyntacticModifier(node, flagsToCheck) ? flagsToCheck : ModifierFlags.None;
  }
  getResolutionModeOverride(node: AstNode | undefined, reportErrors: boolean): unknown {
    void reportErrors;
    return (node as { readonly resolutionMode?: unknown } | undefined)?.resolutionMode;
  }
  getReferenceResolver(): { readonly resolverKind: "checker"; readonly resolve?: (node: AstNode) => AstSymbol | undefined } {
    return {
      resolverKind: "checker",
      resolve: (node) => declarationSymbol(node),
    };
  }
  getTypeReferenceSerializationKind(typeName: AstNode | undefined, location: AstNode | undefined): TypeReferenceSerializationKind {
    if (typeName === undefined || location === undefined) return TypeReferenceSerializationKind.Unknown;
    const symbol = declarationSymbol(typeName);
    const resolvedSymbol = symbol === undefined ? undefined : resolveAliasSymbol(symbol);
    const type = symbolType(resolvedSymbol);
    const isTypeOnly = symbol !== undefined && typeOnlyAliasDeclaration(symbol) !== undefined;
    if (type === undefined) return isTypeOnly ? TypeReferenceSerializationKind.ObjectType : TypeReferenceSerializationKind.Unknown;
    if ((type.flags & TypeFlags.AnyOrUnknown) !== 0) return TypeReferenceSerializationKind.ObjectType;
    if ((type.flags & (TypeFlags.Void | TypeFlags.Nullable | TypeFlags.Never)) !== 0) return TypeReferenceSerializationKind.VoidNullableOrNeverType;
    if ((type.flags & TypeFlags.BooleanLike) !== 0) return TypeReferenceSerializationKind.BooleanType;
    if ((type.flags & TypeFlags.NumberLike) !== 0) return TypeReferenceSerializationKind.NumberLikeType;
    if ((type.flags & TypeFlags.BigIntLike) !== 0) return TypeReferenceSerializationKind.BigIntLikeType;
    if ((type.flags & TypeFlags.StringLike) !== 0) return TypeReferenceSerializationKind.StringLikeType;
    if ((type.flags & TypeFlags.ESSymbolLike) !== 0) return TypeReferenceSerializationKind.ESSymbolType;
    if (isArrayLikeType(type)) return TypeReferenceSerializationKind.ArrayLikeType;
    if (isFunctionLikeType(type)) return TypeReferenceSerializationKind.TypeWithCallSignature;
    if (isConstructorLikeType(type)) return isTypeOnly
      ? TypeReferenceSerializationKind.TypeWithCallSignature
      : TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue;
    if (symbolToName(resolvedSymbol) === "Promise") return TypeReferenceSerializationKind.Promise;
    return TypeReferenceSerializationKind.ObjectType;
  }

  // Declaration emit support
  createTypeOfDeclaration(declaration: AstNode): AstNode {
    // Without checker type inference, return the declared type node
    // directly when present (declaration.type). Falls back to an empty
    // any-type sentinel.
    const t = (declaration as unknown as { type?: AstNode }).type;
    if (t !== undefined) return t;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }
  createReturnTypeOfSignatureDeclaration(signatureDeclaration: AstNode): AstNode {
    const t = (signatureDeclaration as unknown as { type?: AstNode }).type;
    if (t !== undefined) return t;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }
  createTypeOfExpression(expression: Expression): AstNode {
    if (expression.kind === Kind.NumericLiteral) return { kind: Kind.NumberKeyword } as unknown as AstNode;
    if (expression.kind === Kind.StringLiteral || expression.kind === Kind.NoSubstitutionTemplateLiteral) return { kind: Kind.StringKeyword } as unknown as AstNode;
    if (expression.kind === Kind.TrueKeyword || expression.kind === Kind.FalseKeyword) return { kind: Kind.BooleanKeyword } as unknown as AstNode;
    if (expression.kind === Kind.BigIntLiteral) return { kind: Kind.BigIntKeyword } as unknown as AstNode;
    if (expression.kind === Kind.NullKeyword) return { kind: Kind.NullKeyword } as unknown as AstNode;
    return { kind: Kind.AnyKeyword } as unknown as AstNode;
  }

  isSymbolAccessible(
    symbol: unknown, enclosingDeclaration: AstNode | undefined,
    meaning: number, shouldComputeAliases: boolean,
  ): SymbolAccessibilityResult {
    void symbol; void enclosingDeclaration; void meaning; void shouldComputeAliases;
    return { accessibility: SymbolAccessibility.Accessible };
  }
}

function declarationSymbol(node: AstNode): AstSymbol | undefined {
  return node.symbol ?? (node as unknown as { localSymbol?: AstSymbol }).localSymbol;
}

function parentOf(node: AstNode | undefined): AstNode | undefined {
  return (node as { readonly parent?: AstNode } | undefined)?.parent;
}

function parentOrSelf(node: AstNode): AstNode {
  return parentOf(node) ?? node;
}

function sourceFileOf(node: AstNode | undefined): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current;
    current = parentOf(current);
  }
  return undefined;
}

function isGlobalSourceFile(node: AstNode): boolean {
  return node.kind === Kind.SourceFile && (node as { readonly externalModuleIndicator?: AstNode }).externalModuleIndicator === undefined;
}

function firstIdentifierOf(node: AstNode | undefined): IdentifierNode | undefined {
  if (node?.kind === Kind.Identifier) return node as IdentifierNode;
  for (const child of childrenOf(node)) {
    const identifier = firstIdentifierOf(child);
    if (identifier !== undefined) return identifier;
  }
  return undefined;
}

function getAnyImportSyntax(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.ImportDeclaration
      || current.kind === Kind.ImportEqualsDeclaration
      || current.kind === Kind.ImportClause
      || current.kind === Kind.ImportSpecifier
      || current.kind === Kind.NamespaceImport) {
      return current;
    }
    current = parentOf(current);
  }
  return undefined;
}

function isOptionalDeclaration(node: AstNode): boolean {
  return (node as { readonly questionToken?: AstNode }).questionToken !== undefined
    || ((node.symbol?.flags ?? 0) & SymbolFlags.Optional) !== 0;
}

function containsUndefinedTypeNode(node: AstNode): boolean {
  if (node.kind === Kind.UndefinedKeyword) return true;
  return childrenOf(node).some(containsUndefinedTypeNode);
}

function isLiteralExpression(node: AstNode): boolean {
  return node.kind === Kind.StringLiteral
    || node.kind === Kind.NumericLiteral
    || node.kind === Kind.BigIntLiteral
    || node.kind === Kind.TrueKeyword
    || node.kind === Kind.FalseKeyword
    || node.kind === Kind.NullKeyword
    || node.kind === Kind.NoSubstitutionTemplateLiteral;
}

function forEachChild(node: AstNode, cb: (node: AstNode) => boolean): void {
  for (const child of childrenOf(node)) {
    if (cb(child)) forEachChild(child, cb);
  }
}

function childrenOf(node: AstNode | undefined): readonly AstNode[] {
  if (node === undefined) return [];
  const result: AstNode[] = [];
  for (const key of Object.keys(node as object)) {
    if (key === "parent" || key === "symbol" || key === "locals") continue;
    const value = (node as unknown as Record<string, unknown>)[key];
    if (isAstNode(value)) result.push(value);
    else if (Array.isArray(value)) result.push(...value.filter(isAstNode));
    else if (isNodeArray(value)) result.push(...value.nodes);
  }
  return result;
}

function nodeArray(value: unknown): readonly AstNode[] {
  if (Array.isArray(value)) return value.filter(isAstNode);
  if (isNodeArray(value)) return value.nodes;
  return [];
}

function isNodeArray(value: unknown): value is { readonly nodes: readonly AstNode[] } {
  return typeof value === "object"
    && value !== null
    && Array.isArray((value as { readonly nodes?: unknown }).nodes)
    && (value as { readonly nodes: readonly unknown[] }).nodes.every(isAstNode);
}

function isAstNode(value: unknown): value is AstNode {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly kind?: unknown }).kind === "number";
}

function nodeText(node: AstNode | undefined): string {
  return (node as unknown as { text?: string; escapedText?: string } | undefined)?.text
    ?? (node as unknown as { escapedText?: string } | undefined)?.escapedText
    ?? "";
}

function declarationNameText(node: AstNode): string {
  return nodeText((node as unknown as { name?: AstNode }).name);
}

function isAliasDeclaration(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ImportEqualsDeclaration:
    case Kind.ImportClause:
    case Kind.NamespaceImport:
    case Kind.ImportSpecifier:
    case Kind.ExportSpecifier:
    case Kind.ExportDeclaration:
    case Kind.ExportAssignment:
      return true;
  }
  return isCommonJSModuleExports(node);
}

function isTypeOnlyAlias(node: AstNode): boolean {
  if ((node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return true;
  const parent = (node as unknown as { parent?: AstNode }).parent;
  return parent !== undefined && (parent as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}

function typeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined {
  return symbol.declarations.find(isTypeOnlyAlias);
}

function hasExportModifier(node: AstNode): boolean {
  return hasSyntacticModifier(node, ModifierFlags.Export);
}

function isCommonJSModuleExports(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const left = (node as unknown as { left?: AstNode }).left;
  if (left?.kind !== Kind.PropertyAccessExpression) return false;
  const leftExpression = (left as unknown as { expression?: AstNode }).expression;
  const leftName = (left as unknown as { name?: AstNode }).name;
  return leftExpression?.kind === Kind.Identifier && nodeText(leftExpression) === "module" && nodeText(leftName) === "exports";
}

function siblingDeclarations(node: AstNode): readonly AstNode[] {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return [];
  if (parent.kind === Kind.SourceFile) return (parent as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
  if (parent.kind === Kind.ModuleBlock || parent.kind === Kind.Block) return (parent as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes ?? [];
  if (parent.kind === Kind.ClassDeclaration || parent.kind === Kind.ClassExpression || parent.kind === Kind.InterfaceDeclaration || parent.kind === Kind.ObjectLiteralExpression) {
    return (parent as unknown as { members?: { nodes?: readonly AstNode[] }; properties?: { nodes?: readonly AstNode[] } }).members?.nodes
      ?? (parent as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes
      ?? [];
  }
  return [];
}

function declarationHasValueMeaning(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.TypeParameter:
      return false;
  }
  return true;
}

function hasBody(node: AstNode): boolean {
  return (node as unknown as { body?: AstNode }).body !== undefined;
}

function isExpandoPropertyDeclaration(node: AstNode): boolean {
  if (node.kind === Kind.BinaryExpression) {
    const left = (node as unknown as { left?: AstNode }).left;
    return left?.kind === Kind.PropertyAccessExpression;
  }
  return ((getCombinedNodeFlags(node) & NodeFlags.JavaScriptFile) !== 0)
    && (node.kind === Kind.PropertyAssignment || node.kind === Kind.MethodDeclaration || node.kind === Kind.PropertyDeclaration);
}

export function newCheckerEmitResolver(): CheckerEmitResolver {
  return new CheckerEmitResolver();
}

export function newEmitResolver(): CheckerEmitResolver {
  return new CheckerEmitResolver();
}

export function noopAddVisibleAlias(_declaration: AstNode, _aliasingStatement: AstNode): void {}

export function isConstEnumOrConstEnumOnlyModule(symbol: AstSymbol | undefined): boolean {
  const constEnumFlag = (SymbolFlags as unknown as { readonly ConstEnum?: number }).ConstEnum ?? 0;
  if (symbol === undefined) return false;
  if (((symbol.flags ?? 0) & constEnumFlag) !== 0) return true;
  const exports = symbol.exports ?? symbol.members;
  if (exports === undefined || exports.size === 0) return false;
  for (const exported of exports.values()) {
    if (!isConstEnumOrConstEnumOnlyModule(exported)) return false;
  }
  return true;
}

function findClosest<T extends AstNode>(
  node: AstNode | undefined,
  predicate: (node: AstNode) => T | undefined,
): T | undefined {
  let current = node;
  while (current !== undefined) {
    const match = predicate(current);
    if (match !== undefined) return match;
    current = parentOf(current);
  }
  return undefined;
}

function resolveAliasSymbol(symbol: AstSymbol): AstSymbol {
  return (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).aliasTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).target
    ?? symbol.exportSymbol
    ?? symbol;
}

function symbolType(symbol: AstSymbol | undefined): Type | undefined {
  return (symbol as { readonly type?: Type; readonly declaredType?: Type } | undefined)?.type
    ?? (symbol as { readonly type?: Type; readonly declaredType?: Type } | undefined)?.declaredType;
}

function symbolToName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function isArrayLikeType(type: Type): boolean {
  const objectFlags = (type.data as { readonly objectFlags?: number } | undefined)?.objectFlags ?? 0;
  return (objectFlags & (ObjectFlags.ArrayLiteral | ObjectFlags.Tuple | ObjectFlags.Reference)) !== 0
    && /^(?:Array|ReadonlyArray|Tuple)/.test(symbolToName(type.symbol));
}

function isFunctionLikeType(type: Type): boolean {
  return ((type.data as { readonly callSignatures?: readonly unknown[]; readonly declaredCallSignatures?: readonly unknown[] } | undefined)?.callSignatures?.length ?? 0) > 0
    || ((type.data as { readonly callSignatures?: readonly unknown[]; readonly declaredCallSignatures?: readonly unknown[] } | undefined)?.declaredCallSignatures?.length ?? 0) > 0;
}

function isConstructorLikeType(type: Type): boolean {
  return ((type.data as { readonly constructSignatures?: readonly unknown[]; readonly declaredConstructSignatures?: readonly unknown[] } | undefined)?.constructSignatures?.length ?? 0) > 0
    || ((type.data as { readonly constructSignatures?: readonly unknown[]; readonly declaredConstructSignatures?: readonly unknown[] } | undefined)?.declaredConstructSignatures?.length ?? 0) > 0;
}

function nodeField(node: AstNode, key: string): AstNode | undefined {
  const value = (node as unknown as Record<string, unknown>)[key];
  return isAstNode(value) ? value : undefined;
}
