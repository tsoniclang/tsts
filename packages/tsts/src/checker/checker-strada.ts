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

  checkBlock(node: AstNode): void {
    const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
    if (statements === undefined) return;
    for (const s of statements) this.checkSourceElement(s);
  }
  checkExpressionStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
  }
  checkIfStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode; thenStatement?: AstNode; elseStatement?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
    const then = (node as unknown as { thenStatement?: AstNode }).thenStatement;
    const els = (node as unknown as { elseStatement?: AstNode }).elseStatement;
    if (then !== undefined) this.checkSourceElement(then);
    if (els !== undefined) this.checkSourceElement(els);
  }
  checkDoStatement(node: AstNode): void {
    const stmt = (node as unknown as { statement?: AstNode }).statement;
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (stmt !== undefined) this.checkSourceElement(stmt);
    if (expr !== undefined) this.checkExpression(expr);
  }
  checkWhileStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    const stmt = (node as unknown as { statement?: AstNode }).statement;
    if (expr !== undefined) this.checkExpression(expr);
    if (stmt !== undefined) this.checkSourceElement(stmt);
  }
  checkForStatement(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    const cond = (node as unknown as { condition?: AstNode }).condition;
    const inc = (node as unknown as { incrementor?: AstNode }).incrementor;
    const stmt = (node as unknown as { statement?: AstNode }).statement;
    if (init !== undefined) this.checkSourceElement(init);
    if (cond !== undefined) this.checkExpression(cond);
    if (inc !== undefined) this.checkExpression(inc);
    if (stmt !== undefined) this.checkSourceElement(stmt);
  }
  checkForInStatement(node: AstNode): void { this.checkForStatement(node); }
  checkForOfStatement(node: AstNode): void { this.checkForStatement(node); }
  checkReturnStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
  }
  checkBreakOrContinueStatement(node: AstNode): void { void node; }
  checkSwitchStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
    const caseBlock = (node as unknown as { caseBlock?: { clauses?: { nodes?: readonly AstNode[] } } }).caseBlock;
    const clauses = caseBlock?.clauses?.nodes;
    if (clauses !== undefined) {
      for (const c of clauses) {
        const stmts = (c as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
        if (stmts !== undefined) for (const s of stmts) this.checkSourceElement(s);
      }
    }
  }
  checkLabeledStatement(node: AstNode): void {
    const stmt = (node as unknown as { statement?: AstNode }).statement;
    if (stmt !== undefined) this.checkSourceElement(stmt);
  }
  checkThrowStatement(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
  }
  checkTryStatement(node: AstNode): void {
    const tryBlock = (node as unknown as { tryBlock?: AstNode }).tryBlock;
    const catchClause = (node as unknown as { catchClause?: AstNode }).catchClause;
    const finallyBlock = (node as unknown as { finallyBlock?: AstNode }).finallyBlock;
    if (tryBlock !== undefined) this.checkSourceElement(tryBlock);
    if (catchClause !== undefined) {
      const cb = (catchClause as unknown as { block?: AstNode }).block;
      if (cb !== undefined) this.checkSourceElement(cb);
    }
    if (finallyBlock !== undefined) this.checkSourceElement(finallyBlock);
  }

  // -------------------------------------------------------------------------
  // Declaration checking
  // -------------------------------------------------------------------------

  checkClassDeclaration(node: AstNode): void { this.checkClassLikeDeclaration(node); }
  checkClassExpression(node: AstNode): Type {
    this.checkClassLikeDeclaration(node);
    return {} as Type;
  }
  checkClassExpressionDeferred(node: AstNode): void { this.checkClassLikeDeclaration(node); }
  checkClassLikeDeclaration(node: AstNode): void {
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
    if (members === undefined) return;
    for (const m of members) {
      const k = (m as { kind?: number }).kind;
      if (k === Kind.MethodDeclaration) this.checkMethodDeclaration(m);
      else if (k === Kind.PropertyDeclaration) this.checkPropertyDeclaration(m);
      else if (k === Kind.Constructor) this.checkConstructorDeclaration(m);
      else if (k === Kind.GetAccessor || k === Kind.SetAccessor) this.checkAccessorDeclaration(m);
      else if (k === Kind.ClassStaticBlockDeclaration) this.checkClassStaticBlockDeclaration(m);
    }
  }
  checkClassStaticBlockDeclaration(node: AstNode): void {
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) this.checkSourceElement(body);
  }
  checkInterfaceDeclaration(node: AstNode): void {
    void node; // Type-only — members checked via type system.
  }
  checkTypeAliasDeclaration(node: AstNode): void { void node; }
  checkEnumDeclaration(node: AstNode): void {
    const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
    if (members === undefined) return;
    for (const m of members) this.checkEnumMember(m);
  }
  checkEnumMember(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
  }
  checkModuleDeclaration(node: AstNode): void {
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) this.checkSourceElement(body);
  }
  checkConstructorDeclaration(node: AstNode): void {
    const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
    if (params !== undefined) for (const p of params) this.checkParameter(p);
    const body = (node as unknown as { body?: AstNode }).body;
    if (body !== undefined) this.checkSourceElement(body);
  }
  checkMethodDeclaration(node: AstNode): void {
    this.checkConstructorDeclaration(node); // Same shape: params + body.
  }
  checkAccessorDeclaration(node: AstNode): void { this.checkConstructorDeclaration(node); }
  checkPropertyDeclaration(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
  }
  checkFunctionDeclaration(node: AstNode): void { this.checkConstructorDeclaration(node); }
  checkVariableDeclaration(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
  }
  checkVariableDeclarationList(node: AstNode): void {
    const decls = (node as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes;
    if (decls !== undefined) for (const d of decls) this.checkVariableDeclaration(d);
  }
  checkParameter(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
  }
  checkBindingElement(node: AstNode): void {
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
  }
  checkImportDeclaration(node: AstNode): void { void node; }
  checkExportDeclaration(node: AstNode): void { void node; }
  checkExportAssignment(node: AstNode): void {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
  }
  checkExportSpecifier(node: AstNode): void { void node; }
  checkExternalImportOrExportDeclaration(node: AstNode): boolean { void node; return true; }
  checkExternalModuleExports(file: SourceFile): void { void file; }

  // -------------------------------------------------------------------------
  // Expression checking
  // -------------------------------------------------------------------------

  checkExpression(node: AstNode): Type {
    return this.checkExpressionEx(node, 0, false);
  }
  checkExpressionEx(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void forceTuple;
    return this.checkExpressionWorker(node, checkMode);
  }
  checkExpressionCached(node: AstNode): Type { return this.checkExpression(node); }
  checkExpressionCachedEx(node: AstNode, checkMode: number): Type {
    return this.checkExpressionEx(node, checkMode, false);
  }
  checkExpressionWorker(node: AstNode, checkMode: number): Type {
    // Dispatch by Kind. Without the full type system we recurse into
    // sub-expressions to keep the visit pass driving the AST.
    const k = (node as { kind?: number }).kind;
    switch (k) {
      case Kind.Identifier: return this.checkIdentifier(node);
      case Kind.BinaryExpression: return this.checkBinaryExpression(node, checkMode);
      case Kind.ConditionalExpression: return this.checkConditionalExpression(node, checkMode);
      case Kind.CallExpression: return this.checkCallExpression(node, checkMode);
      case Kind.ObjectLiteralExpression: return this.checkObjectLiteral(node, checkMode);
      case Kind.ArrayLiteralExpression: return this.checkArrayLiteral(node, checkMode, false);
      case Kind.PropertyAccessExpression:
      case Kind.ElementAccessExpression: {
        const expr = (node as unknown as { expression?: AstNode }).expression;
        if (expr !== undefined) this.checkExpression(expr);
        return {} as Type;
      }
      case Kind.ParenthesizedExpression:
      case Kind.AsExpression:
      case Kind.SatisfiesExpression:
      case Kind.TypeAssertionExpression:
      case Kind.NonNullExpression:
      case Kind.PrefixUnaryExpression:
      case Kind.PostfixUnaryExpression:
      case Kind.AwaitExpression:
      case Kind.VoidExpression:
      case Kind.DeleteExpression:
      case Kind.TypeOfExpression:
      case Kind.YieldExpression:
      case Kind.SpreadElement: {
        const expr = (node as unknown as { expression?: AstNode }).expression;
        if (expr !== undefined) this.checkExpression(expr);
        return {} as Type;
      }
      default: return {} as Type;
    }
  }
  checkExpressionForMutableLocation(node: AstNode, checkMode: number, contextualType: Type | undefined): Type {
    void contextualType;
    return this.checkExpressionEx(node, checkMode, false);
  }
  checkExpressionWithContextualType(node: AstNode, contextualType: Type, checkMode: number): Type {
    void contextualType;
    return this.checkExpressionEx(node, checkMode, false);
  }
  checkExpressionWithTypeArguments(node: AstNode): Type { return this.checkExpression(node); }
  checkIdentifier(node: AstNode): Type { void node; return {} as Type; }
  checkBinaryExpression(node: AstNode, checkMode: number): Type {
    const left = (node as unknown as { left?: AstNode }).left;
    const right = (node as unknown as { right?: AstNode }).right;
    const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken;
    return this.checkBinaryLikeExpression(left as AstNode, op?.kind ?? 0, right as AstNode, undefined);
  }
  checkBinaryLikeExpression(left: AstNode, operator: number, right: AstNode, errorNode: AstNode | undefined): Type {
    void operator; void errorNode;
    if (left !== undefined) this.checkExpression(left);
    if (right !== undefined) this.checkExpression(right);
    return {} as Type;
  }
  checkAssignmentOperator(left: AstNode, operator: number, right: AstNode, valueType: Type): void {
    void left; void operator; void right; void valueType;
  }
  checkConditionalExpression(node: AstNode, checkMode: number): Type {
    void checkMode;
    const cond = (node as unknown as { condition?: AstNode }).condition;
    const whenTrue = (node as unknown as { whenTrue?: AstNode }).whenTrue;
    const whenFalse = (node as unknown as { whenFalse?: AstNode }).whenFalse;
    if (cond !== undefined) this.checkExpression(cond);
    if (whenTrue !== undefined) this.checkExpression(whenTrue);
    if (whenFalse !== undefined) this.checkExpression(whenFalse);
    return {} as Type;
  }
  checkCallExpression(node: AstNode, checkMode: number): Type {
    void checkMode;
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
    const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
    if (args !== undefined) for (const a of args) this.checkExpression(a);
    return {} as Type;
  }
  checkObjectLiteral(node: AstNode, checkMode: number): Type {
    void checkMode;
    const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
    if (props === undefined) return {} as Type;
    for (const p of props) {
      const init = (p as unknown as { initializer?: AstNode }).initializer;
      if (init !== undefined) this.checkExpression(init);
    }
    return {} as Type;
  }
  checkObjectLiteralMethod(node: AstNode, checkMode: number): Type {
    void checkMode;
    this.checkMethodDeclaration(node);
    return {} as Type;
  }
  checkArrayLiteral(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void checkMode; void forceTuple;
    const elems = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elems !== undefined) for (const e of elems) this.checkExpression(e);
    return {} as Type;
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

  getTypeFromTypeNode(node: AstNode): Type {
    return this.getTypeFromTypeNodeWorker(node);
  }
  getTypeFromTypeNodeWorker(node: AstNode): Type {
    // Type-keyword dispatch returns a tagged singleton stub that the
    // checker/printer.ts type-renderer can already serialize. Real type
    // identity + caching lands with the full type system.
    const k = (node as { kind?: number }).kind;
    switch (k) {
      case Kind.AnyKeyword: return { flags: 1 << 0 } as unknown as Type;       // Any
      case Kind.UnknownKeyword: return { flags: 1 << 1 } as unknown as Type;   // Unknown
      case Kind.StringKeyword: return { flags: 1 << 2 } as unknown as Type;
      case Kind.NumberKeyword: return { flags: 1 << 3 } as unknown as Type;
      case Kind.BooleanKeyword: return { flags: 1 << 4 } as unknown as Type;
      case Kind.BigIntKeyword: return { flags: 1 << 6 } as unknown as Type;
      case Kind.VoidKeyword: return { flags: 1 << 14 } as unknown as Type;
      case Kind.UndefinedKeyword: return { flags: 1 << 15 } as unknown as Type;
      case Kind.NullKeyword: return { flags: 1 << 16 } as unknown as Type;
      case Kind.NeverKeyword: return { flags: 1 << 17 } as unknown as Type;
      case Kind.SymbolKeyword: return { flags: 1 << 12 } as unknown as Type;
      case Kind.ObjectKeyword: return { flags: 1 << 26 } as unknown as Type;   // NonPrimitive
      case Kind.ArrayType: return this.getTypeFromArrayOrTupleTypeNode(node);
      case Kind.TupleType: return this.getTypeFromArrayOrTupleTypeNode(node);
      case Kind.UnionType: return this.getTypeFromUnionTypeNode(node);
      case Kind.IntersectionType: return this.getTypeFromIntersectionTypeNode(node);
      case Kind.ConditionalType: return this.getTypeFromConditionalTypeNode(node);
      case Kind.MappedType: return this.getTypeFromMappedTypeNode(node);
      case Kind.LiteralType: return this.getTypeFromLiteralTypeNode(node);
      case Kind.IndexedAccessType: return this.getTypeFromIndexedAccessTypeNode(node);
      case Kind.TypeReference: return this.getTypeFromTypeReference(node);
      default: return { flags: 1 << 0 } as unknown as Type;
    }
  }
  getTypeFromTypeReference(node: AstNode): Type { void node; return {} as Type; }
  getTypeFromTypeAliasReference(node: AstNode, symbol: AstSymbol): Type {
    void node; void symbol; return {} as Type;
  }
  getTypeFromClassOrInterfaceReference(node: AstNode, symbol: AstSymbol): Type {
    void node; void symbol; return {} as Type;
  }
  getTypeFromConditionalTypeNode(node: AstNode): Type {
    const checkType = (node as unknown as { checkType?: AstNode }).checkType;
    const extendsType = (node as unknown as { extendsType?: AstNode }).extendsType;
    const trueType = (node as unknown as { trueType?: AstNode }).trueType;
    const falseType = (node as unknown as { falseType?: AstNode }).falseType;
    return {
      flags: 1 << 24, // Conditional
      checkType: checkType !== undefined ? this.getTypeFromTypeNode(checkType) : undefined,
      extendsType: extendsType !== undefined ? this.getTypeFromTypeNode(extendsType) : undefined,
      trueType: trueType !== undefined ? this.getTypeFromTypeNode(trueType) : undefined,
      falseType: falseType !== undefined ? this.getTypeFromTypeNode(falseType) : undefined,
    } as unknown as Type;
  }
  getTypeFromUnionTypeNode(node: AstNode): Type {
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
    return {
      flags: 1 << 20, // Union
      types: types !== undefined ? types.map((t) => this.getTypeFromTypeNode(t)) : [],
    } as unknown as Type;
  }
  getTypeFromIntersectionTypeNode(node: AstNode): Type {
    const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
    return {
      flags: 1 << 21, // Intersection
      types: types !== undefined ? types.map((t) => this.getTypeFromTypeNode(t)) : [],
    } as unknown as Type;
  }
  getTypeFromMappedTypeNode(node: AstNode): Type { void node; return { flags: 1 << 19 } as unknown as Type; }
  getTypeFromIndexedAccessTypeNode(node: AstNode): Type {
    const objectType = (node as unknown as { objectType?: AstNode }).objectType;
    const indexType = (node as unknown as { indexType?: AstNode }).indexType;
    return {
      flags: 1 << 23, // IndexedAccess
      objectType: objectType !== undefined ? this.getTypeFromTypeNode(objectType) : undefined,
      indexType: indexType !== undefined ? this.getTypeFromTypeNode(indexType) : undefined,
    } as unknown as Type;
  }
  getTypeFromInferTypeNode(node: AstNode): Type { void node; return { flags: 1 << 18 } as unknown as Type; }
  getTypeFromImportTypeNode(node: AstNode): Type { void node; return { flags: 1 << 19 } as unknown as Type; }
  getTypeFromImportAttributes(node: AstNode): Type { void node; return { flags: 1 << 19 } as unknown as Type; }
  getTypeFromLiteralTypeNode(node: AstNode): Type {
    const literal = (node as unknown as { literal?: { kind?: number; text?: string } }).literal;
    if (literal === undefined) return { flags: 1 << 0 } as unknown as Type;
    switch (literal.kind) {
      case Kind.StringLiteral: return { flags: 1 << 7, value: literal.text } as unknown as Type;
      case Kind.NumericLiteral: return { flags: 1 << 8, value: Number(literal.text ?? "0") } as unknown as Type;
      case Kind.TrueKeyword: return { flags: 1 << 9, intrinsicName: "true" } as unknown as Type;
      case Kind.FalseKeyword: return { flags: 1 << 9, intrinsicName: "false" } as unknown as Type;
      case Kind.NullKeyword: return { flags: 1 << 16 } as unknown as Type;
      default: return { flags: 1 << 0 } as unknown as Type;
    }
  }
  getTypeFromArrayOrTupleTypeNode(node: AstNode): Type {
    const k = (node as { kind?: number }).kind;
    if (k === Kind.ArrayType) {
      const elementType = (node as unknown as { elementType?: AstNode }).elementType;
      return {
        flags: 1 << 19, // Object
        elementType: elementType !== undefined ? this.getTypeFromTypeNode(elementType) : undefined,
      } as unknown as Type;
    }
    // Tuple
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    return {
      flags: 1 << 19, // Object
      typeArguments: elements !== undefined ? elements.map((e) => this.getTypeFromTypeNode(e)) : [],
    } as unknown as Type;
  }
  getTypeFromNamedTupleTypeNode(node: AstNode): Type {
    const type = (node as unknown as { type?: AstNode }).type;
    return type !== undefined ? this.getTypeFromTypeNode(type) : { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromOptionalTypeNode(node: AstNode): Type {
    const type = (node as unknown as { type?: AstNode }).type;
    return type !== undefined ? this.getTypeFromTypeNode(type) : { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromRestTypeNode(node: AstNode): Type {
    const type = (node as unknown as { type?: AstNode }).type;
    return type !== undefined ? this.getTypeFromTypeNode(type) : { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromThisTypeNode(node: AstNode): Type { void node; return { flags: 1 << 18 } as unknown as Type; }
  getTypeFromTemplateTypeNode(node: AstNode): Type { void node; return { flags: 1 << 27 } as unknown as Type; } // TemplateLiteral
  getTypeFromTypeOperatorNode(node: AstNode): Type {
    // keyof/typeof/readonly. Resolve operand to the underlying type.
    const operand = (node as unknown as { type?: AstNode }).type;
    return operand !== undefined ? this.getTypeFromTypeNode(operand) : { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromTypeQueryNode(node: AstNode): Type { void node; return { flags: 1 << 0 } as unknown as Type; }
  getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node: AstNode): Type {
    void node; return { flags: 1 << 19 } as unknown as Type; // Object
  }
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
