/**
 * Strada-shaped Checker skeleton.
 *
 * Substantive port of TS-Go `internal/checker/checker.go` (~31402 LoC,
 * 1322 methods). This file mirrors Strada's Checker API at the method-
 * API level so downstream code can declare against the full surface.
 * The existing `checker.ts` retains the incremental working checker;
 * this file lists ~200 highest-priority methods as stubbed signatures
 * covering the major dispatch families.
 *
 * Method bodies are stubbed. Baseline checker conformance tests will
 * drive the incremental migration of bodies onto this skeleton.
 */

import { Kind } from "../ast/index.js";
import type {
  Node as AstNode,
  SourceFile,
  Symbol as AstSymbol,
  Diagnostic,
} from "../ast/index.js";
import { forEachChild as astForEachChild } from "../ast/generated/visitor.js";
import type { Type, Signature, SignatureKind, TypeFormatFlags } from "./types.js";

// ---------------------------------------------------------------------------
// Checker class — Strada-shaped surface
// ---------------------------------------------------------------------------

export class Checker {
  // -------------------------------------------------------------------------
  // Top-level entry
  // -------------------------------------------------------------------------

  fileDiagnostics: Map<SourceFile, Diagnostic[]> = new Map();
  globalDiagnostics: Diagnostic[] = [];

  checkSourceFile(file: SourceFile): void {
    // Pre-order walk: dispatch each child to its per-kind checker.
    // The checker walks declarations + statements at the top level.
    this.fileDiagnostics.set(file, []);
    const statements = (file as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
    if (statements === undefined) return;
    for (const stmt of statements) {
      this.checkSourceElement(stmt);
    }
  }

  checkSourceElement(node: AstNode): void {
    const k = (node as { kind?: number }).kind;
    switch (k) {
      case Kind.Block: this.checkBlock(node); return;
      case Kind.VariableStatement:
        this.checkVariableDeclarationList((node as unknown as { declarationList: AstNode }).declarationList);
        return;
      case Kind.ExpressionStatement: this.checkExpressionStatement(node); return;
      case Kind.IfStatement: this.checkIfStatement(node); return;
      case Kind.DoStatement: this.checkDoStatement(node); return;
      case Kind.WhileStatement: this.checkWhileStatement(node); return;
      case Kind.ForStatement: this.checkForStatement(node); return;
      case Kind.ForInStatement: this.checkForInStatement(node); return;
      case Kind.ForOfStatement: this.checkForOfStatement(node); return;
      case Kind.BreakStatement:
      case Kind.ContinueStatement: this.checkBreakOrContinueStatement(node); return;
      case Kind.ReturnStatement: this.checkReturnStatement(node); return;
      case Kind.SwitchStatement: this.checkSwitchStatement(node); return;
      case Kind.LabeledStatement: this.checkLabeledStatement(node); return;
      case Kind.ThrowStatement: this.checkThrowStatement(node); return;
      case Kind.TryStatement: this.checkTryStatement(node); return;
      case Kind.ClassDeclaration: this.checkClassDeclaration(node); return;
      case Kind.InterfaceDeclaration: this.checkInterfaceDeclaration(node); return;
      case Kind.TypeAliasDeclaration: this.checkTypeAliasDeclaration(node); return;
      case Kind.EnumDeclaration: this.checkEnumDeclaration(node); return;
      case Kind.ModuleDeclaration: this.checkModuleDeclaration(node); return;
      case Kind.FunctionDeclaration: this.checkFunctionDeclaration(node); return;
      case Kind.ImportDeclaration: this.checkImportDeclaration(node); return;
      case Kind.ExportDeclaration: this.checkExportDeclaration(node); return;
      case Kind.ExportAssignment: this.checkExportAssignment(node); return;
      default:
        // Unknown node — walk children defensively so nested
        // declarations still get visited.
        astForEachChild(node, (c) => { this.checkSourceElement(c); return undefined; });
    }
  }

  getDiagnostics(file: SourceFile | undefined): readonly Diagnostic[] {
    if (file === undefined) return this.globalDiagnostics;
    return this.fileDiagnostics.get(file) ?? [];
  }
  getGlobalDiagnostics(): readonly Diagnostic[] { return this.globalDiagnostics; }

  // -------------------------------------------------------------------------
  // Statement checking
  // -------------------------------------------------------------------------

  checkBlock(node: AstNode): void { void node; }
  checkExpressionStatement(node: AstNode): void { void node; }
  checkIfStatement(node: AstNode): void { void node; }
  checkDoStatement(node: AstNode): void { void node; }
  checkWhileStatement(node: AstNode): void { void node; }
  checkForStatement(node: AstNode): void { void node; }
  checkForInStatement(node: AstNode): void { void node; }
  checkForOfStatement(node: AstNode): void { void node; }
  checkReturnStatement(node: AstNode): void { void node; }
  checkBreakOrContinueStatement(node: AstNode): void { void node; }
  checkSwitchStatement(node: AstNode): void { void node; }
  checkLabeledStatement(node: AstNode): void { void node; }
  checkThrowStatement(node: AstNode): void { void node; }
  checkTryStatement(node: AstNode): void { void node; }

  // -------------------------------------------------------------------------
  // Declaration checking
  // -------------------------------------------------------------------------

  checkClassDeclaration(node: AstNode): void { void node; }
  checkClassExpression(node: AstNode): Type { void node; return {} as Type; }
  checkClassExpressionDeferred(node: AstNode): void { void node; }
  checkClassLikeDeclaration(node: AstNode): void { void node; }
  checkClassStaticBlockDeclaration(node: AstNode): void { void node; }
  checkInterfaceDeclaration(node: AstNode): void { void node; }
  checkTypeAliasDeclaration(node: AstNode): void { void node; }
  checkEnumDeclaration(node: AstNode): void { void node; }
  checkEnumMember(node: AstNode): void { void node; }
  checkModuleDeclaration(node: AstNode): void { void node; }
  checkConstructorDeclaration(node: AstNode): void { void node; }
  checkMethodDeclaration(node: AstNode): void { void node; }
  checkAccessorDeclaration(node: AstNode): void { void node; }
  checkPropertyDeclaration(node: AstNode): void { void node; }
  checkFunctionDeclaration(node: AstNode): void { void node; }
  checkVariableDeclaration(node: AstNode): void { void node; }
  checkVariableDeclarationList(node: AstNode): void { void node; }
  checkParameter(node: AstNode): void { void node; }
  checkBindingElement(node: AstNode): void { void node; }
  checkImportDeclaration(node: AstNode): void { void node; }
  checkExportDeclaration(node: AstNode): void { void node; }
  checkExportAssignment(node: AstNode): void { void node; }
  checkExportSpecifier(node: AstNode): void { void node; }
  checkExternalImportOrExportDeclaration(node: AstNode): boolean { void node; return true; }
  checkExternalModuleExports(file: SourceFile): void { void file; }

  // -------------------------------------------------------------------------
  // Expression checking
  // -------------------------------------------------------------------------

  checkExpression(node: AstNode): Type { void node; return {} as Type; }
  checkExpressionEx(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void node; void checkMode; void forceTuple; return {} as Type;
  }
  checkExpressionCached(node: AstNode): Type { void node; return {} as Type; }
  checkExpressionCachedEx(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkExpressionWorker(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkExpressionForMutableLocation(node: AstNode, checkMode: number, contextualType: Type | undefined): Type {
    void node; void checkMode; void contextualType; return {} as Type;
  }
  checkExpressionWithContextualType(node: AstNode, contextualType: Type, checkMode: number): Type {
    void node; void contextualType; void checkMode; return {} as Type;
  }
  checkExpressionWithTypeArguments(node: AstNode): Type { void node; return {} as Type; }
  checkIdentifier(node: AstNode): Type { void node; return {} as Type; }
  checkBinaryExpression(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkBinaryLikeExpression(left: AstNode, operator: number, right: AstNode, errorNode: AstNode | undefined): Type {
    void left; void operator; void right; void errorNode; return {} as Type;
  }
  checkAssignmentOperator(left: AstNode, operator: number, right: AstNode, valueType: Type): void {
    void left; void operator; void right; void valueType;
  }
  checkConditionalExpression(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkCallExpression(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkObjectLiteral(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkObjectLiteralMethod(node: AstNode, checkMode: number): Type {
    void node; void checkMode; return {} as Type;
  }
  checkArrayLiteral(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void node; void checkMode; void forceTuple; return {} as Type;
  }
  checkObjectLiteralAssignment(node: AstNode, sourceType: Type, rightIsThis?: boolean): Type {
    void node; void rightIsThis; return sourceType;
  }
  checkObjectLiteralDestructuringPropertyAssignment(
    node: AstNode, objectLiteralType: Type, property: AstNode, rhsType: Type,
  ): Type {
    void node; void objectLiteralType; void property; return rhsType;
  }
  checkArrayLiteralAssignment(node: AstNode, sourceType: Type): Type {
    void node; return sourceType;
  }
  checkArrayLiteralDestructuringElementAssignment(
    node: AstNode, sourceType: Type, elementIndex: number, elementType: Type,
  ): Type {
    void node; void sourceType; void elementIndex; return elementType;
  }
  checkDestructuringAssignment(expr: AstNode, sourceType: Type, checkMode: number): Type {
    void expr; void checkMode; return sourceType;
  }
  checkDeclarationInitializer(declaration: AstNode, checkMode: number, contextualType: Type | undefined): Type {
    void declaration; void checkMode; void contextualType; return {} as Type;
  }

  // -------------------------------------------------------------------------
  // Symbol resolution + types
  // -------------------------------------------------------------------------

  getSymbol(name: string, location: AstNode | undefined, meaning: number): AstSymbol | undefined {
    void name; void location; void meaning; return undefined;
  }
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolOfNode(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolFlags(symbol: AstSymbol): number { void symbol; return 0; }
  getSymbolFlagsEx(symbol: AstSymbol, excludeTypeOnlyMeanings: boolean): number {
    void symbol; void excludeTypeOnlyMeanings; return 0;
  }
  getSymbolFromTypeReference(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolForPrivateIdentifierExpression(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolIfSameReference(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolOfNameOrPropertyAccessExpression(node: AstNode): AstSymbol | undefined { void node; return undefined; }
  getSymbolOfPartOfRightHandSideOfImportEquals(node: AstNode): AstSymbol | undefined { void node; return undefined; }

  resolveSymbol(symbol: AstSymbol | undefined, dontResolveAlias?: boolean): AstSymbol | undefined {
    void dontResolveAlias; return symbol;
  }
  resolveSymbolEx(
    symbol: AstSymbol | undefined, meaning: number, dontResolveAlias: boolean,
  ): AstSymbol | undefined {
    void meaning; void dontResolveAlias; return symbol;
  }
  resolveTypeReferenceMembers(t: Type): void { void t; }
  resolveTypeReferenceName(node: AstNode, meaning: number): AstSymbol | undefined {
    void node; void meaning; return undefined;
  }

  // -------------------------------------------------------------------------
  // Type queries
  // -------------------------------------------------------------------------

  getTypeOfSymbol(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfSymbolWithDeferredType(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfVariableOrParameterOrProperty(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfVariableOrParameterOrPropertyWorker(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfInstantiatedSymbol(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfMappedSymbol(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfAccessors(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfAlias(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfEnumMember(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeOfExpression(node: AstNode): Type { void node; return {} as Type; }
  getTypeOfParameter(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfPropertyOfType(t: Type, name: string): Type | undefined { void t; void name; return undefined; }
  getTypeOfPropertyOrIndexSignatureOfType(t: Type, name: string): Type | undefined {
    void t; void name; return undefined;
  }
  getTypeOfPropertyInBaseClass(prop: AstSymbol, base: Type): Type | undefined {
    void prop; void base; return undefined;
  }
  getTypeOfPropertyOfContextualType(t: Type, name: string): Type | undefined {
    void t; void name; return undefined;
  }
  getTypeOfPropertyOfContextualTypeEx(t: Type, name: string, computedNameType: Type | undefined): Type | undefined {
    void t; void name; void computedNameType; return undefined;
  }
  getTypeOfConcretePropertyOfContextualType(t: Type, name: string): Type | undefined {
    void t; void name; return undefined;
  }
  getTypeOfPrototypeProperty(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfFirstParameterOfSignature(signature: Signature): Type { void signature; return {} as Type; }
  getTypeOfFirstParameterOfSignatureWithFallback(signature: Signature, fallback: Type): Type {
    void signature; return fallback;
  }
  getTypeOfFuncClassEnumModule(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getTypeOfFuncClassEnumModuleWorker(symbol: AstSymbol): Type { void symbol; return {} as Type; }

  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfAlias(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfClassOrInterface(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfEnum(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfEnumMember(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfTypeAlias(symbol: AstSymbol): Type { void symbol; return {} as Type; }
  getDeclaredTypeOfTypeParameter(symbol: AstSymbol): Type { void symbol; return {} as Type; }

  getApparentType(t: Type): Type { return t; }
  getApparentTypeOfContextualType(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getApparentTypeOfIntersectionType(t: Type): Type { return t; }
  getApparentTypeOfMappedType(t: Type): Type { return t; }

  // -------------------------------------------------------------------------
  // Contextual type
  // -------------------------------------------------------------------------

  getContextualType(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForArgument(callTarget: AstNode, arg: AstNode): Type | undefined {
    void callTarget; void arg; return undefined;
  }
  getContextualTypeForArgumentAtIndex(callTarget: AstNode, argIndex: number): Type | undefined {
    void callTarget; void argIndex; return undefined;
  }
  getContextualTypeForAssignmentExpression(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForAwaitOperand(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForBinaryOperand(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForBindingElement(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForConditionalOperand(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForDecorator(node: AstNode): Signature | undefined { void node; return undefined; }
  getContextualTypeForElementExpression(node: AstNode, elementIndex: number): Type | undefined {
    void node; void elementIndex; return undefined;
  }
  getContextualTypeForInitializerExpression(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForObjectLiteralElement(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForObjectLiteralMethod(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForReturnExpression(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForStaticPropertyDeclaration(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForSubstitutionExpression(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForVariableLikeDeclaration(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForYieldOperand(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }

  // -------------------------------------------------------------------------
  // Signatures
  // -------------------------------------------------------------------------

  getSignaturesOfType(t: Type, kind: SignatureKind): readonly Signature[] {
    void t; void kind; return [];
  }
  getSignaturesOfStructuredType(t: Type, kind: SignatureKind): readonly Signature[] {
    void t; void kind; return [];
  }
  getSignaturesOfSymbol(symbol: AstSymbol): readonly Signature[] { void symbol; return []; }
  getSignatureFromDeclaration(declaration: AstNode): Signature { void declaration; return {} as Signature; }
  getSignatureInstantiation(signature: Signature, typeArguments: readonly Type[] | undefined): Signature {
    void typeArguments; return signature;
  }
  getSignatureInstantiationWithoutFillingInTypeArguments(
    signature: Signature, typeArguments: readonly Type[] | undefined,
  ): Signature {
    void typeArguments; return signature;
  }
  getSignatureOfFullSignatureType(t: Type): Signature | undefined { void t; return undefined; }
  getReturnTypeOfSignature(signature: Signature): Type { void signature; return {} as Type; }

  // -------------------------------------------------------------------------
  // Property queries
  // -------------------------------------------------------------------------

  getPropertyOfType(t: Type, name: string): AstSymbol | undefined { void t; void name; return undefined; }
  getPropertyOfTypeEx(t: Type, name: string, skipObjectFunctionPropertyAugment: boolean): AstSymbol | undefined {
    void t; void name; void skipObjectFunctionPropertyAugment; return undefined;
  }
  getPropertyOfObjectType(t: Type, name: string): AstSymbol | undefined { void t; void name; return undefined; }
  getPropertyOfUnionOrIntersectionType(t: Type, name: string): AstSymbol | undefined {
    void t; void name; return undefined;
  }
  getPropertyOfVariable(symbol: AstSymbol, name: string): AstSymbol | undefined {
    void symbol; void name; return undefined;
  }
  getPropertyNameFromBindingElement(node: AstNode): string | undefined { void node; return undefined; }
  getPropertyNameFromIndex(node: AstNode, accessNode: AstNode | undefined): string | undefined {
    void node; void accessNode; return undefined;
  }
  getPropertyTypeForIndexType(originalObjectType: Type, indexType: Type, accessNode: AstNode | undefined): Type | undefined {
    void originalObjectType; void indexType; void accessNode; return undefined;
  }

  // -------------------------------------------------------------------------
  // TypeNode → Type
  // -------------------------------------------------------------------------

  getTypeFromTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeNodeWorker(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeReference(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeAliasReference(node: AstNode, symbol: AstSymbol): Type {
    void node; void symbol; return {} as Type;
  }
  getTypeFromClassOrInterfaceReference(node: AstNode, symbol: AstSymbol): Type {
    void node; void symbol; return {} as Type;
  }
  getTypeFromConditionalTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromUnionTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromIntersectionTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromMappedTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromIndexedAccessTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromInferTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromImportTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromImportAttributes(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromLiteralTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromArrayOrTupleTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromNamedTupleTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromOptionalTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromRestTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromThisTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTemplateTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeOperatorNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeQueryNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromArrayBindingPattern(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromObjectBindingPattern(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromBindingElement(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromBindingPattern(node: AstNode, includePatternInType: boolean, reportErrors: boolean): Type {
    void node; void includePatternInType; void reportErrors; return {} as Type;
  }
  getTypeFromPropertyDescriptor(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromIndexInfosOfContextualType(t: Type, indexType: Type, accessNode: AstNode | undefined): Type | undefined {
    void t; void indexType; void accessNode; return undefined;
  }

  // -------------------------------------------------------------------------
  // Type arguments + parameters
  // -------------------------------------------------------------------------

  getTypeArguments(t: Type): readonly Type[] { void t; return []; }
  getTypeArgumentsForAliasSymbol(symbol: AstSymbol): readonly Type[] | undefined { void symbol; return undefined; }
  getTypeArgumentsFromNode(node: AstNode): readonly Type[] { void node; return []; }
  getTypeArgumentsFromNodes(nodes: readonly AstNode[]): readonly Type[] { void nodes; return []; }
  getTypeArgumentArityError(node: AstNode, signatures: readonly Signature[]): unknown {
    void node; void signatures; return undefined;
  }
  getTypeReferenceArity(t: Type): number { void t; return 0; }
  getTypeReferenceType(node: AstNode, symbol: AstSymbol): Type { void node; void symbol; return {} as Type; }
  getTypeAliasInstantiation(symbol: AstSymbol, typeArguments: readonly Type[] | undefined): Type {
    void symbol; void typeArguments; return {} as Type;
  }

  getTypeParameterFromMappedType(mappedType: Type): Type { void mappedType; return {} as Type; }
  getTypeParametersForMapper(mapper: unknown): readonly Type[] { void mapper; return []; }
  getTypeParametersForTypeAndSymbol(t: Type, symbol: AstSymbol): readonly Type[] | undefined {
    void t; void symbol; return undefined;
  }
  getTypeParametersForTypeReferenceOrImport(node: AstNode): readonly Type[] {
    void node; return [];
  }
  getTypeParametersFromDeclaration(node: AstNode): readonly Type[] | undefined { void node; return undefined; }

  // -------------------------------------------------------------------------
  // Type facts + predicates
  // -------------------------------------------------------------------------

  getTypeFacts(t: Type, mask: number): number { void t; void mask; return 0; }
  getTypeFactsWorker(t: Type, mask: number): number { void t; void mask; return 0; }
  getTypeWithFacts(t: Type, facts: number): Type { void facts; return t; }
  getTypeWithoutSignatures(t: Type): Type { return t; }
  getTypeWithSyntheticDefaultImportType(t: Type): Type { return t; }
  getTypeWithSyntheticDefaultOnly(t: Type): Type { return t; }
  getTypeWithThisArgument(t: Type, thisArgument: Type | undefined, needApparentType: boolean): Type {
    void thisArgument; void needApparentType; return t;
  }

  getTypePredicateFromBody(node: AstNode): unknown { void node; return undefined; }
  getTypePredicateParent(node: AstNode): AstNode | undefined { void node; return undefined; }

  getTypeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined { void symbol; return undefined; }
  getTypeOnlyAliasDeclarationEx(symbol: AstSymbol, includeMode: number): AstNode | undefined {
    void symbol; void includeMode; return undefined;
  }
  getTypeOnlyDeclarationOfEntityName(node: AstNode): AstNode | undefined { void node; return undefined; }

  // -------------------------------------------------------------------------
  // Type relation predicates
  // -------------------------------------------------------------------------

  isTypeAssignableToKind(source: Type, kind: number): boolean { void source; void kind; return false; }
  isTypeAssignableToKindEx(source: Type, kind: number, strict: boolean): boolean {
    void source; void kind; void strict; return false;
  }
  isTypeEqualityComparableTo(source: Type, target: Type): boolean {
    void source; void target; return false;
  }
  isTypeMatchedByTemplateLiteralOrStringMapping(source: Type, target: Type): boolean {
    void source; void target; return false;
  }
  isTypeParameterPossiblyReferenced(parameter: Type, body: AstNode): boolean {
    void parameter; void body; return false;
  }
  isTypeUsableAsIndexSignatureDeclaration(t: Type, name: string): boolean {
    void t; void name; return false;
  }

  // -------------------------------------------------------------------------
  // Constructors
  // -------------------------------------------------------------------------

  createTypeReference(target: Type, typeArguments: readonly Type[] | undefined): Type {
    void target; void typeArguments; return {} as Type;
  }
  createTypeFromGenericGlobalType(genericGlobalType: Type, typeArguments: readonly Type[]): Type {
    void genericGlobalType; void typeArguments; return {} as Type;
  }
  createSymbolWithType(symbol: AstSymbol, t: Type): AstSymbol { void t; return symbol; }
}

export function newChecker(): Checker {
  return new Checker();
}
