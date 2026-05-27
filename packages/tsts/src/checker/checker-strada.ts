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
    void rightIsThis;
    // Walk each property and descend into nested binding patterns.
    const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
    if (props !== undefined) {
      for (const p of props) this.checkObjectLiteralDestructuringPropertyAssignment(node, sourceType, p, sourceType);
    }
    return sourceType;
  }
  checkObjectLiteralDestructuringPropertyAssignment(
    node: AstNode, objectLiteralType: Type, property: AstNode, rhsType: Type,
  ): Type {
    void node; void objectLiteralType;
    const init = (property as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
    return rhsType;
  }
  checkArrayLiteralAssignment(node: AstNode, sourceType: Type): Type {
    const elems = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elems !== undefined) {
      for (let i = 0; i < elems.length; i++) {
        this.checkArrayLiteralDestructuringElementAssignment(elems[i]!, sourceType, i, sourceType);
      }
    }
    return sourceType;
  }
  checkArrayLiteralDestructuringElementAssignment(
    node: AstNode, sourceType: Type, elementIndex: number, elementType: Type,
  ): Type {
    void sourceType; void elementIndex;
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) this.checkExpression(init);
    return elementType;
  }
  checkDestructuringAssignment(expr: AstNode, sourceType: Type, checkMode: number): Type {
    void checkMode;
    const k = (expr as { kind?: number }).kind;
    if (k === Kind.ObjectLiteralExpression) return this.checkObjectLiteralAssignment(expr, sourceType);
    if (k === Kind.ArrayLiteralExpression) return this.checkArrayLiteralAssignment(expr, sourceType);
    return sourceType;
  }
  checkDeclarationInitializer(declaration: AstNode, checkMode: number, contextualType: Type | undefined): Type {
    void contextualType;
    const init = (declaration as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) return this.checkExpressionEx(init, checkMode, false);
    return { flags: 1 << 0 } as unknown as Type;
  }

  // -------------------------------------------------------------------------
  // Symbol resolution + types
  // -------------------------------------------------------------------------

  getSymbol(name: string, location: AstNode | undefined, meaning: number): AstSymbol | undefined {
    void meaning;
    // Walk parents of `location` looking for a locals/exports/members
    // table that has `name`. Matches nameresolver semantics.
    let n: AstNode | undefined = location;
    while (n !== undefined) {
      const tables: ReadonlyArray<unknown> = [
        (n as unknown as { locals?: Map<string, AstSymbol> }).locals,
        (n as unknown as { symbol?: { exports?: Map<string, AstSymbol> } }).symbol?.exports,
        (n as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members,
      ];
      for (const t of tables) {
        const found = (t as Map<string, AstSymbol> | undefined)?.get(name);
        if (found !== undefined) return found;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return undefined;
  }
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined {
    // The binder annotates Identifiers and declaration nodes with
    // .symbol; for a property-access RHS, fall back to the parent's
    // resolved member.
    const direct = (node as unknown as { symbol?: AstSymbol }).symbol;
    if (direct !== undefined) return direct;
    const resolved = (node as unknown as { resolvedSymbol?: AstSymbol }).resolvedSymbol;
    return resolved;
  }
  getSymbolOfNode(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }
  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined {
    return (node as unknown as { symbol?: AstSymbol }).symbol;
  }
  getSymbolFlags(symbol: AstSymbol): number {
    return (symbol as unknown as { flags?: number }).flags ?? 0;
  }
  getSymbolFlagsEx(symbol: AstSymbol, excludeTypeOnlyMeanings: boolean): number {
    void excludeTypeOnlyMeanings;
    return this.getSymbolFlags(symbol);
  }
  getSymbolFromTypeReference(node: AstNode): AstSymbol | undefined {
    const typeName = (node as unknown as { typeName?: AstNode }).typeName;
    return typeName !== undefined ? this.getSymbolAtLocation(typeName) : undefined;
  }
  getSymbolForPrivateIdentifierExpression(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }
  getSymbolIfSameReference(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }
  getSymbolOfNameOrPropertyAccessExpression(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }
  getSymbolOfPartOfRightHandSideOfImportEquals(node: AstNode): AstSymbol | undefined {
    return this.getSymbolAtLocation(node);
  }

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

  getTypeOfSymbol(symbol: AstSymbol): Type {
    // Read cached type first, otherwise resolve via the first declaration's
    // .type annotation (when present) or fall back to Any.
    const cached = (symbol as unknown as { type?: Type }).type;
    if (cached !== undefined) return cached;
    return this.getTypeOfVariableOrParameterOrProperty(symbol);
  }
  getTypeOfSymbolWithDeferredType(symbol: AstSymbol): Type {
    return this.getTypeOfSymbol(symbol);
  }
  getTypeOfVariableOrParameterOrProperty(symbol: AstSymbol): Type {
    return this.getTypeOfVariableOrParameterOrPropertyWorker(symbol);
  }
  getTypeOfVariableOrParameterOrPropertyWorker(symbol: AstSymbol): Type {
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls !== undefined) {
      for (const d of decls) {
        const typeNode = (d as unknown as { type?: AstNode }).type;
        if (typeNode !== undefined) return this.getTypeFromTypeNode(typeNode);
      }
    }
    return { flags: 1 << 0 } as unknown as Type; // Any
  }
  getTypeOfInstantiatedSymbol(symbol: AstSymbol): Type { return this.getTypeOfSymbol(symbol); }
  getTypeOfMappedSymbol(symbol: AstSymbol): Type { return this.getTypeOfSymbol(symbol); }
  getTypeOfAccessors(symbol: AstSymbol): Type { return this.getTypeOfSymbol(symbol); }
  getTypeOfAlias(symbol: AstSymbol): Type { return this.getTypeOfSymbol(symbol); }
  getTypeOfEnumMember(symbol: AstSymbol): Type {
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls !== undefined && decls.length > 0) {
      const init = (decls[0] as unknown as { initializer?: AstNode }).initializer;
      if (init !== undefined) {
        const k = (init as { kind?: number }).kind;
        if (k === Kind.NumericLiteral) return { flags: 1 << 8, value: Number((init as unknown as { text?: string }).text ?? "0") } as unknown as Type;
        if (k === Kind.StringLiteral) return { flags: 1 << 7, value: (init as unknown as { text?: string }).text } as unknown as Type;
      }
    }
    return { flags: 1 << 5 } as unknown as Type; // Enum
  }
  getTypeOfNode(node: AstNode): Type {
    const sym = this.getSymbolAtLocation(node);
    if (sym !== undefined) return this.getTypeOfSymbol(sym);
    return { flags: 1 << 0 } as unknown as Type;
  }
  getTypeOfExpression(node: AstNode): Type {
    return this.getTypeOfNode(node);
  }
  getTypeOfParameter(symbol: AstSymbol): Type {
    return this.getTypeOfSymbol(symbol);
  }
  getTypeOfPropertyOfType(t: Type, name: string): Type | undefined {
    const prop = this.getPropertyOfType(t, name);
    return prop !== undefined ? this.getTypeOfSymbol(prop) : undefined;
  }
  getTypeOfPropertyOrIndexSignatureOfType(t: Type, name: string): Type | undefined {
    return this.getTypeOfPropertyOfType(t, name);
  }
  getTypeOfPropertyInBaseClass(prop: AstSymbol, base: Type): Type | undefined {
    const name = (prop as unknown as { name?: string }).name;
    if (name === undefined) return undefined;
    return this.getTypeOfPropertyOfType(base, name);
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
  getTypeOfPrototypeProperty(symbol: AstSymbol): Type {
    return this.getTypeOfSymbol(symbol);
  }
  getTypeOfFirstParameterOfSignature(signature: Signature): Type {
    const params = (signature as unknown as { parameters?: readonly AstSymbol[] }).parameters;
    if (params === undefined || params.length === 0) return { flags: 1 << 0 } as unknown as Type;
    return this.getTypeOfSymbol(params[0]!);
  }
  getTypeOfFirstParameterOfSignatureWithFallback(signature: Signature, fallback: Type): Type {
    void signature; return fallback;
  }
  getTypeOfFuncClassEnumModule(symbol: AstSymbol): Type {
    // The type of a function/class/enum/module is the object-type built
    // around its declarations. Return cached .type or a fresh Object
    // record carrying the symbol back-ref.
    const cached = (symbol as unknown as { type?: Type }).type;
    if (cached !== undefined) return cached;
    return this.getTypeOfFuncClassEnumModuleWorker(symbol);
  }
  getTypeOfFuncClassEnumModuleWorker(symbol: AstSymbol): Type {
    return { flags: 1 << 19, symbol } as unknown as Type;
  }

  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type {
    // Dispatch by symbol kind. SymbolFlags: Class=32, Interface=64,
    // Enum=384, TypeAlias=524288, TypeParameter=262144,
    // EnumMember=8.
    const flags = (symbol as unknown as { flags?: number }).flags ?? 0;
    if ((flags & 32) !== 0 || (flags & 64) !== 0) {
      return this.getDeclaredTypeOfClassOrInterface(symbol);
    }
    if ((flags & 384) !== 0) return this.getDeclaredTypeOfEnum(symbol);
    if ((flags & 8) !== 0) return this.getDeclaredTypeOfEnumMember(symbol);
    if ((flags & 524288) !== 0) return this.getDeclaredTypeOfTypeAlias(symbol);
    if ((flags & 262144) !== 0) return this.getDeclaredTypeOfTypeParameter(symbol);
    return { flags: 1 << 0 } as unknown as Type;
  }
  getDeclaredTypeOfAlias(symbol: AstSymbol): Type {
    return this.getDeclaredTypeOfSymbol(symbol);
  }
  getDeclaredTypeOfClassOrInterface(symbol: AstSymbol): Type {
    // Build an Object-flagged type record carrying the symbol back-ref.
    const cached = (symbol as unknown as { declaredType?: Type }).declaredType;
    if (cached !== undefined) return cached;
    return { flags: 1 << 19, symbol } as unknown as Type;
  }
  getDeclaredTypeOfEnum(symbol: AstSymbol): Type {
    return { flags: 1 << 5, symbol } as unknown as Type; // Enum
  }
  getDeclaredTypeOfEnumMember(symbol: AstSymbol): Type {
    return this.getTypeOfEnumMember(symbol);
  }
  getDeclaredTypeOfTypeAlias(symbol: AstSymbol): Type {
    // Walk the alias declaration's .type and resolve.
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls !== undefined && decls.length > 0) {
      const typeNode = (decls[0] as unknown as { type?: AstNode }).type;
      if (typeNode !== undefined) return this.getTypeFromTypeNode(typeNode);
    }
    return { flags: 1 << 0 } as unknown as Type;
  }
  getDeclaredTypeOfTypeParameter(symbol: AstSymbol): Type {
    return { flags: 1 << 18, symbol } as unknown as Type; // TypeParameter
  }

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
    void contextFlags;
    // Dispatch by the node's parent — contextual type comes from the
    // surrounding syntactic context.
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (parent === undefined) return undefined;
    const k = (parent as { kind?: number }).kind;
    switch (k) {
      case Kind.VariableDeclaration:
      case Kind.PropertyDeclaration:
      case Kind.Parameter:
      case Kind.PropertyAssignment:
      case Kind.BindingElement:
        return this.getContextualTypeForVariableLikeDeclaration(parent);
      case Kind.ReturnStatement:
        return this.getContextualTypeForReturnExpression(node);
      case Kind.CallExpression:
      case Kind.NewExpression:
        return this.getContextualTypeForArgument(parent, node);
      case Kind.ConditionalExpression:
        return this.getContextualTypeForConditionalOperand(parent, 0);
      case Kind.AwaitExpression:
        return this.getContextualTypeForAwaitOperand(parent, 0);
      case Kind.BinaryExpression:
        return this.getContextualTypeForBinaryOperand(node, 0);
      case Kind.ArrayLiteralExpression: {
        // Find this node's index in the parent's elements array.
        const elements = (parent as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
        if (elements === undefined) return undefined;
        const idx = elements.indexOf(node);
        return idx >= 0 ? this.getContextualTypeForElementExpression(parent, idx) : undefined;
      }
      default:
        return undefined;
    }
  }
  getContextualTypeForArgument(callTarget: AstNode, arg: AstNode): Type | undefined {
    const args = (callTarget as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
    if (args === undefined) return undefined;
    const idx = args.indexOf(arg);
    return idx >= 0 ? this.getContextualTypeForArgumentAtIndex(callTarget, idx) : undefined;
  }
  getContextualTypeForArgumentAtIndex(callTarget: AstNode, argIndex: number): Type | undefined {
    // Resolve the call's signature, then return the type of parameter
    // at argIndex.
    const calleeExpr = (callTarget as unknown as { expression?: AstNode }).expression;
    if (calleeExpr === undefined) return undefined;
    const calleeSym = this.getSymbolAtLocation(calleeExpr);
    if (calleeSym === undefined) return undefined;
    const signatures = this.getSignaturesOfSymbol(calleeSym);
    if (signatures.length === 0) return undefined;
    const params = (signatures[0] as unknown as { parameters?: readonly AstSymbol[] }).parameters;
    if (params === undefined || argIndex >= params.length) return undefined;
    return this.getTypeOfSymbol(params[argIndex]!);
  }
  getContextualTypeForAssignmentExpression(node: AstNode): Type | undefined {
    // RHS of `=` takes the LHS type.
    const left = (node as unknown as { left?: AstNode }).left;
    return left !== undefined ? this.getTypeOfNode(left) : undefined;
  }
  getContextualTypeForAwaitOperand(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    // The operand's contextual type is the contextual type of the
    // enclosing AwaitExpression itself (unwrapped from Promise<T>).
    return this.getContextualType(node, 0);
  }
  getContextualTypeForBinaryOperand(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    const parent = (node as unknown as { parent?: AstNode }).parent;
    if (parent === undefined) return undefined;
    const op = (parent as unknown as { operatorToken?: { kind?: number } }).operatorToken;
    if (op?.kind === Kind.EqualsToken) {
      const left = (parent as unknown as { left?: AstNode; right?: AstNode }).left;
      const right = (parent as unknown as { right?: AstNode }).right;
      if (right === node && left !== undefined) return this.getTypeOfNode(left);
    }
    return undefined;
  }
  getContextualTypeForBindingElement(node: AstNode): Type | undefined {
    const parent = (node as unknown as { parent?: AstNode }).parent;
    return parent !== undefined ? this.getContextualTypeForVariableLikeDeclaration(parent) : undefined;
  }
  getContextualTypeForConditionalOperand(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    return this.getContextualType(node, 0);
  }
  getContextualTypeForDecorator(node: AstNode): Signature | undefined { void node; return undefined; }
  getContextualTypeForElementExpression(node: AstNode, elementIndex: number): Type | undefined {
    void node; void elementIndex; return undefined;
  }
  getContextualTypeForInitializerExpression(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    // Initializer takes the declaration's type annotation.
    const decl = (node as unknown as { parent?: AstNode }).parent;
    if (decl === undefined) return undefined;
    const typeNode = (decl as unknown as { type?: AstNode }).type;
    return typeNode !== undefined ? this.getTypeFromTypeNode(typeNode) : undefined;
  }
  getContextualTypeForObjectLiteralElement(node: AstNode, contextFlags: number): Type | undefined {
    void node; void contextFlags; return undefined;
  }
  getContextualTypeForObjectLiteralMethod(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    return this.getContextualTypeForObjectLiteralElement(node, 0);
  }
  getContextualTypeForReturnExpression(node: AstNode): Type | undefined {
    // Walk up to the enclosing function-like and return its declared
    // return type.
    let n: AstNode | undefined = node;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.FunctionDeclaration || k === Kind.MethodDeclaration ||
          k === Kind.FunctionExpression || k === Kind.ArrowFunction ||
          k === Kind.GetAccessor || k === Kind.SetAccessor) {
        const t = (n as unknown as { type?: AstNode }).type;
        return t !== undefined ? this.getTypeFromTypeNode(t) : undefined;
      }
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return undefined;
  }
  getContextualTypeForStaticPropertyDeclaration(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    const t = (node as unknown as { type?: AstNode }).type;
    return t !== undefined ? this.getTypeFromTypeNode(t) : undefined;
  }
  getContextualTypeForSubstitutionExpression(node: AstNode): Type | undefined { void node; return undefined; }
  getContextualTypeForVariableLikeDeclaration(node: AstNode): Type | undefined {
    const typeNode = (node as unknown as { type?: AstNode }).type;
    return typeNode !== undefined ? this.getTypeFromTypeNode(typeNode) : undefined;
  }
  getContextualTypeForYieldOperand(node: AstNode, contextFlags: number): Type | undefined {
    void contextFlags;
    return this.getContextualTypeForReturnExpression(node);
  }

  // -------------------------------------------------------------------------
  // Signatures
  // -------------------------------------------------------------------------

  getSignaturesOfType(t: Type, kind: SignatureKind): readonly Signature[] {
    return this.getSignaturesOfStructuredType(t, kind);
  }
  getSignaturesOfStructuredType(t: Type, kind: SignatureKind): readonly Signature[] {
    // Read pre-resolved signatures off the type. Call-signature lookup
    // returns .callSignatures[]; construct returns .constructSignatures[].
    if (kind === 0 /* Call */) {
      return (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures ?? [];
    }
    return (t as unknown as { constructSignatures?: readonly Signature[] }).constructSignatures ?? [];
  }
  getSignaturesOfSymbol(symbol: AstSymbol): readonly Signature[] {
    // Iterate declarations, building a signature for each function-like.
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined) return [];
    const out: Signature[] = [];
    for (const d of decls) {
      const k = (d as { kind?: number }).kind;
      if (k === Kind.FunctionDeclaration || k === Kind.MethodDeclaration ||
          k === Kind.FunctionExpression || k === Kind.ArrowFunction ||
          k === Kind.Constructor || k === Kind.GetAccessor || k === Kind.SetAccessor ||
          k === Kind.MethodSignature || k === Kind.CallSignature || k === Kind.ConstructSignature) {
        out.push(this.getSignatureFromDeclaration(d));
      }
    }
    return out;
  }
  getSignatureFromDeclaration(declaration: AstNode): Signature {
    // Build a signature record from the declaration's parameters and
    // return-type-node. Without the type system we surface the parsed
    // type nodes; the checker's getReturnTypeOfSignature resolves them.
    const params = (declaration as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes ?? [];
    const returnTypeNode = (declaration as unknown as { type?: AstNode }).type;
    const typeParameters = (declaration as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters?.nodes;
    return {
      declaration,
      parameters: params.map((p) => (p as unknown as { symbol?: AstSymbol }).symbol).filter((s): s is AstSymbol => s !== undefined),
      typeParameters,
      resolvedReturnType: returnTypeNode !== undefined ? this.getTypeFromTypeNode(returnTypeNode) : undefined,
    } as unknown as Signature;
  }
  getSignatureInstantiation(signature: Signature, typeArguments: readonly Type[] | undefined): Signature {
    if (typeArguments === undefined) return signature;
    return { ...(signature as object), typeArguments } as unknown as Signature;
  }
  getSignatureInstantiationWithoutFillingInTypeArguments(
    signature: Signature, typeArguments: readonly Type[] | undefined,
  ): Signature {
    return this.getSignatureInstantiation(signature, typeArguments);
  }
  getSignatureOfFullSignatureType(t: Type): Signature | undefined {
    const callSigs = (t as unknown as { callSignatures?: readonly Signature[] }).callSignatures;
    return callSigs !== undefined && callSigs.length > 0 ? callSigs[0] : undefined;
  }
  getReturnTypeOfSignature(signature: Signature): Type {
    const resolved = (signature as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    return resolved ?? ({ flags: 1 << 0 } as unknown as Type);
  }

  // -------------------------------------------------------------------------
  // Property queries
  // -------------------------------------------------------------------------

  getPropertyOfType(t: Type, name: string): AstSymbol | undefined {
    return this.getPropertyOfTypeEx(t, name, false);
  }
  getPropertyOfTypeEx(t: Type, name: string, skipObjectFunctionPropertyAugment: boolean): AstSymbol | undefined {
    void skipObjectFunctionPropertyAugment;
    // Read the type's properties table or members map for `name`.
    const props = (t as unknown as { properties?: Map<string, AstSymbol> }).properties;
    if (props !== undefined) {
      const direct = props.get(name);
      if (direct !== undefined) return direct;
    }
    const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (members !== undefined) {
      const direct = members.get(name);
      if (direct !== undefined) return direct;
    }
    return undefined;
  }
  getPropertyOfObjectType(t: Type, name: string): AstSymbol | undefined {
    return this.getPropertyOfType(t, name);
  }
  getPropertyOfUnionOrIntersectionType(t: Type, name: string): AstSymbol | undefined {
    // For union/intersection, the property is present in any constituent
    // type that has it. Conservative implementation walks all types.
    const types = (t as unknown as { types?: readonly Type[] }).types;
    if (types === undefined) return undefined;
    for (const sub of types) {
      const found = this.getPropertyOfType(sub, name);
      if (found !== undefined) return found;
    }
    return undefined;
  }
  getPropertyOfVariable(symbol: AstSymbol, name: string): AstSymbol | undefined {
    const members = (symbol as unknown as { members?: Map<string, AstSymbol> }).members;
    return members?.get(name);
  }
  getPropertyNameFromBindingElement(node: AstNode): string | undefined {
    const propertyName = (node as unknown as { propertyName?: { text?: string } }).propertyName;
    if (propertyName?.text !== undefined) return propertyName.text;
    const name = (node as unknown as { name?: { text?: string } }).name;
    return name?.text;
  }
  getPropertyNameFromIndex(node: AstNode, accessNode: AstNode | undefined): string | undefined {
    void accessNode;
    const k = (node as { kind?: number }).kind;
    if (k === Kind.StringLiteral || k === Kind.NoSubstitutionTemplateLiteral || k === Kind.NumericLiteral || k === Kind.Identifier) {
      return (node as unknown as { text?: string }).text;
    }
    return undefined;
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
  getTypeFromTypeReference(node: AstNode): Type {
    // Resolve the .typeName entity to a symbol, then build a type
    // reference with the typeArguments[].
    const typeName = (node as unknown as { typeName?: AstNode }).typeName;
    const symbol = typeName !== undefined ? this.getSymbolAtLocation(typeName) : undefined;
    const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
    const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => this.getTypeFromTypeNode(t)) : [];
    if (symbol === undefined) {
      return { flags: 1 << 19, typeArguments } as unknown as Type;
    }
    const flags = (symbol as unknown as { flags?: number }).flags ?? 0;
    // TypeAlias bit (524288)
    if ((flags & 524288) !== 0) return this.getTypeFromTypeAliasReference(node, symbol);
    // Class/Interface bits (32, 64)
    if ((flags & 96) !== 0) return this.getTypeFromClassOrInterfaceReference(node, symbol);
    return { flags: 1 << 19, symbol, typeArguments } as unknown as Type;
  }
  getTypeFromTypeAliasReference(node: AstNode, symbol: AstSymbol): Type {
    const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
    const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => this.getTypeFromTypeNode(t)) : undefined;
    return this.getTypeAliasInstantiation(symbol, typeArguments);
  }
  getTypeFromClassOrInterfaceReference(node: AstNode, symbol: AstSymbol): Type {
    const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
    const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => this.getTypeFromTypeNode(t)) : [];
    return this.createTypeReference(this.getDeclaredTypeOfClassOrInterface(symbol), typeArguments);
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
  getTypeFromArrayBindingPattern(node: AstNode): Type {
    // Synthesize a tuple of element types from the pattern's binding
    // elements.
    const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    return {
      flags: 1 << 19, // Object
      typeArguments: elements !== undefined ? elements.map((e) => this.getTypeFromBindingElement(e)) : [],
    } as unknown as Type;
  }
  getTypeFromObjectBindingPattern(node: AstNode): Type {
    void node;
    // Synthesize an Object-flagged record; without symbol-table walk
    // we can't surface per-property types directly.
    return { flags: 1 << 19 } as unknown as Type;
  }
  getTypeFromBindingElement(node: AstNode): Type {
    // The binding element type is its .type annotation if present, else
    // its .initializer's expression type, else Any.
    const typeNode = (node as unknown as { type?: AstNode }).type;
    if (typeNode !== undefined) return this.getTypeFromTypeNode(typeNode);
    const init = (node as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) return this.getTypeOfExpression(init);
    return { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromBindingPattern(node: AstNode, includePatternInType: boolean, reportErrors: boolean): Type {
    void includePatternInType; void reportErrors;
    const k = (node as { kind?: number }).kind;
    if (k === Kind.ArrayBindingPattern) return this.getTypeFromArrayBindingPattern(node);
    if (k === Kind.ObjectBindingPattern) return this.getTypeFromObjectBindingPattern(node);
    return { flags: 1 << 0 } as unknown as Type;
  }
  getTypeFromPropertyDescriptor(node: AstNode): Type { void node; return { flags: 1 << 19 } as unknown as Type; }
  getTypeFromIndexInfosOfContextualType(t: Type, indexType: Type, accessNode: AstNode | undefined): Type | undefined {
    void t; void indexType; void accessNode; return undefined;
  }

  // -------------------------------------------------------------------------
  // Type arguments + parameters
  // -------------------------------------------------------------------------

  getTypeArguments(t: Type): readonly Type[] {
    return (t as unknown as { typeArguments?: readonly Type[] }).typeArguments ?? [];
  }
  getTypeArgumentsForAliasSymbol(symbol: AstSymbol): readonly Type[] | undefined {
    return (symbol as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  }
  getTypeArgumentsFromNode(node: AstNode): readonly Type[] {
    const args = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
    return args !== undefined ? args.map((a) => this.getTypeFromTypeNode(a)) : [];
  }
  getTypeArgumentsFromNodes(nodes: readonly AstNode[]): readonly Type[] {
    return nodes.map((n) => this.getTypeFromTypeNode(n));
  }
  getTypeArgumentArityError(node: AstNode, signatures: readonly Signature[]): unknown {
    void node; void signatures; return undefined;
  }
  getTypeReferenceArity(t: Type): number {
    return (t as unknown as { typeArguments?: readonly Type[] }).typeArguments?.length ?? 0;
  }
  getTypeReferenceType(node: AstNode, symbol: AstSymbol): Type {
    return this.getTypeFromClassOrInterfaceReference(node, symbol);
  }
  getTypeAliasInstantiation(symbol: AstSymbol, typeArguments: readonly Type[] | undefined): Type {
    // Without lazy instantiation, return the declared alias type (the
    // body expression resolved through getTypeFromTypeNode) plus the
    // captured typeArguments for downstream rendering.
    const base = this.getDeclaredTypeOfTypeAlias(symbol);
    if (typeArguments === undefined || typeArguments.length === 0) return base;
    return { ...(base as object), typeArguments } as unknown as Type;
  }

  getTypeParameterFromMappedType(mappedType: Type): Type {
    return (mappedType as unknown as { typeParameter?: Type }).typeParameter ?? ({ flags: 1 << 18 } as unknown as Type);
  }
  getTypeParametersForMapper(mapper: unknown): readonly Type[] {
    return (mapper as unknown as { sources?: readonly Type[] })?.sources ?? [];
  }
  getTypeParametersForTypeAndSymbol(t: Type, symbol: AstSymbol): readonly Type[] | undefined {
    void t;
    return this.getTypeArgumentsForAliasSymbol(symbol);
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
  getTypePredicateParent(node: AstNode): AstNode | undefined {
    // Walk up until a function-like ancestor (the type-predicate's
    // containing signature). Useful for diagnostic reporting.
    let n: AstNode | undefined = node;
    while (n !== undefined) {
      const k = (n as { kind?: number }).kind;
      if (k === Kind.FunctionDeclaration || k === Kind.MethodDeclaration ||
          k === Kind.FunctionExpression || k === Kind.ArrowFunction ||
          k === Kind.MethodSignature || k === Kind.CallSignature) return n;
      n = (n as unknown as { parent?: AstNode }).parent;
    }
    return undefined;
  }

  getTypeOnlyAliasDeclaration(symbol: AstSymbol): AstNode | undefined {
    return this.getTypeOnlyAliasDeclarationEx(symbol, 0);
  }
  getTypeOnlyAliasDeclarationEx(symbol: AstSymbol, includeMode: number): AstNode | undefined {
    void includeMode;
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls === undefined) return undefined;
    for (const d of decls) {
      const isTypeOnly = (d as unknown as { isTypeOnly?: boolean }).isTypeOnly;
      if (isTypeOnly === true) return d;
      // Walk up to find an enclosing ImportClause / ExportDeclaration
      // / ImportEqualsDeclaration with isTypeOnly === true.
      let p: AstNode | undefined = (d as unknown as { parent?: AstNode }).parent;
      while (p !== undefined) {
        const pk = (p as { kind?: number }).kind;
        if (pk === Kind.ImportClause || pk === Kind.ExportDeclaration || pk === Kind.ImportEqualsDeclaration) {
          if ((p as unknown as { isTypeOnly?: boolean }).isTypeOnly === true) return d;
          break;
        }
        p = (p as unknown as { parent?: AstNode }).parent;
      }
    }
    return undefined;
  }
  getTypeOnlyDeclarationOfEntityName(node: AstNode): AstNode | undefined {
    const sym = this.getSymbolAtLocation(node);
    return sym !== undefined ? this.getTypeOnlyAliasDeclaration(sym) : undefined;
  }

  // -------------------------------------------------------------------------
  // Type relation predicates
  // -------------------------------------------------------------------------

  isTypeAssignableToKind(source: Type, kind: number): boolean {
    return ((source as { flags?: number }).flags ?? 0 & kind) !== 0;
  }
  isTypeAssignableToKindEx(source: Type, kind: number, strict: boolean): boolean {
    void strict;
    return this.isTypeAssignableToKind(source, kind);
  }
  isTypeEqualityComparableTo(source: Type, target: Type): boolean {
    if (source === target) return true;
    const sf = (source as { flags?: number }).flags ?? 0;
    const tf = (target as { flags?: number }).flags ?? 0;
    return sf === tf;
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
    return {
      flags: 1 << 19, // Object
      target,
      typeArguments: typeArguments ?? [],
    } as unknown as Type;
  }
  createTypeFromGenericGlobalType(genericGlobalType: Type, typeArguments: readonly Type[]): Type {
    return this.createTypeReference(genericGlobalType, typeArguments);
  }
  createSymbolWithType(symbol: AstSymbol, t: Type): AstSymbol {
    return { ...(symbol as object), type: t } as unknown as AstSymbol;
  }
}

export function newChecker(): Checker {
  return new Checker();
}
