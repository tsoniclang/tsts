/**
 * Strada-shaped Checker — directory entry point.
 *
 * The Checker class lives here as a thin shell: it holds state and
 * routes per-Kind work to standalone functions in sibling files:
 *
 *   - statements.ts    — checkBlock, checkIfStatement, …
 *   - expressions.ts   — checkExpressionWorker, checkBinaryLikeExpression
 *   - declarations.ts  — checkClassDeclaration, checkEnumDeclaration, …
 *   - types.ts         — getTypeFromTypeNode and friends
 *   - symbols.ts       — getSymbol, getSymbolAtLocation
 *   - signatures.ts    — getSignaturesOfType, getSignatureFromDeclaration
 *   - properties.ts    — getPropertyOfType, getTypeOfPropertyOfType
 *   - contextual.ts    — getContextualType family
 *
 * Splitting this way mirrors Strada's `checker.go` organization while
 * keeping each file small and readable. The CheckerOps interface lets
 * the standalone functions call back into the Checker's dispatch.
 */

import { Kind } from "../../ast/index.js";
import type {
  Node as AstNode,
  SourceFile,
  Symbol as AstSymbol,
  Diagnostic,
} from "../../ast/index.js";
import { forEachChild as astForEachChild } from "../../ast/generated/visitor.js";
import type { Type, Signature, SignatureKind } from "../types.js";

import { type CheckerState, newCheckerState } from "./state.js";
import * as Statements from "./statements.js";
import * as Expressions from "./expressions.js";
import * as Declarations from "./declarations.js";
import * as Types from "./types.js";
import * as Symbols from "./symbols.js";
import * as Signatures from "./signatures.js";
import * as Properties from "./properties.js";
import * as Contextual from "./contextual.js";

// ---------------------------------------------------------------------------
// CheckerOps — the per-family functions call back through this.
// ---------------------------------------------------------------------------

export interface CheckerOps {
  // Dispatch + traversal
  checkSourceElement(node: AstNode): void;
  checkExpression(node: AstNode): Type;

  // Statements
  checkBlock(node: AstNode): void;

  // Declarations
  checkClassExpressionDeferred(node: AstNode): void;
  checkMethodDeclaration(node: AstNode): void;
  checkPropertyDeclaration(node: AstNode): void;
  checkConstructorDeclaration(node: AstNode): void;
  checkAccessorDeclaration(node: AstNode): void;
  checkClassStaticBlockDeclaration(node: AstNode): void;
  checkParameter(node: AstNode): void;
  checkEnumMember(node: AstNode): void;
  checkVariableDeclarationList(node: AstNode): void;

  // Expressions
  checkIdentifier(node: AstNode): Type;
  checkBinaryExpression(node: AstNode, checkMode: number): Type;
  checkConditionalExpression(node: AstNode, checkMode: number): Type;
  checkCallExpression(node: AstNode, checkMode: number): Type;
  checkObjectLiteral(node: AstNode, checkMode: number): Type;
  checkArrayLiteral(node: AstNode, checkMode: number, forceTuple: boolean): Type;
  checkJsxElement?(node: AstNode): Type;

  // Types
  getTypeFromTypeNode(node: AstNode): Type;
  getTypeOfSymbol(symbol: AstSymbol): Type;
  getTypeOfPropertyOfType(t: Type, name: string): Type | undefined;
  getDeclaredTypeOfClassOrInterface(symbol: AstSymbol): Type;
  getTypeAliasInstantiation(symbol: AstSymbol, typeArguments: readonly Type[] | undefined): Type;
  createTypeReference(target: Type, typeArguments: readonly Type[] | undefined): Type;
  getNonOptionalType(t: Type): Type;

  // Symbols
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined;
  getSignaturesOfSymbol(symbol: AstSymbol): readonly Signature[];
}

// ---------------------------------------------------------------------------
// Checker class — top-level dispatch.
// ---------------------------------------------------------------------------

export class Checker implements CheckerOps {
  state: CheckerState = newCheckerState();

  // -------------------------------------------------------------------------
  // Top-level entry
  // -------------------------------------------------------------------------

  checkSourceFile(file: SourceFile): void {
    this.state.fileDiagnostics.set(file, []);
    const statements = (file as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
    if (statements === undefined) return;
    for (const stmt of statements) {
      this.checkSourceElement(stmt);
    }
  }

  checkSourceElement(node: AstNode): void {
    const k = (node as { kind?: number }).kind;
    switch (k) {
      case Kind.Block: Statements.checkBlock(this, node); return;
      case Kind.VariableStatement:
        this.checkVariableDeclarationList((node as unknown as { declarationList: AstNode }).declarationList);
        return;
      case Kind.ExpressionStatement: Statements.checkExpressionStatement(this, node); return;
      case Kind.IfStatement: Statements.checkIfStatement(this, node); return;
      case Kind.DoStatement: Statements.checkDoStatement(this, node); return;
      case Kind.WhileStatement: Statements.checkWhileStatement(this, node); return;
      case Kind.ForStatement: Statements.checkForStatement(this, node); return;
      case Kind.ForInStatement: Statements.checkForInStatement(this, node); return;
      case Kind.ForOfStatement: Statements.checkForOfStatement(this, node); return;
      case Kind.BreakStatement:
      case Kind.ContinueStatement: Statements.checkBreakOrContinueStatement(this, node); return;
      case Kind.ReturnStatement: Statements.checkReturnStatement(this, node); return;
      case Kind.SwitchStatement: Statements.checkSwitchStatement(this, node); return;
      case Kind.LabeledStatement: Statements.checkLabeledStatement(this, node); return;
      case Kind.ThrowStatement: Statements.checkThrowStatement(this, node); return;
      case Kind.TryStatement: Statements.checkTryStatement(this, node); return;
      case Kind.EmptyStatement: Statements.checkEmptyStatement(this, node); return;
      case Kind.DebuggerStatement: Statements.checkDebuggerStatement(this, node); return;
      case Kind.WithStatement: Statements.checkWithStatement(this, node); return;
      case Kind.ClassDeclaration: Declarations.checkClassDeclaration(this, node); return;
      case Kind.InterfaceDeclaration: Declarations.checkInterfaceDeclaration(this, node); return;
      case Kind.TypeAliasDeclaration: Declarations.checkTypeAliasDeclaration(this, node); return;
      case Kind.EnumDeclaration: Declarations.checkEnumDeclaration(this, node); return;
      case Kind.ModuleDeclaration: Declarations.checkModuleDeclaration(this, node); return;
      case Kind.FunctionDeclaration: Declarations.checkFunctionDeclaration(this, node); return;
      case Kind.ImportDeclaration: Declarations.checkImportDeclaration(this, node); return;
      case Kind.ExportDeclaration: Declarations.checkExportDeclaration(this, node); return;
      case Kind.ExportAssignment: Declarations.checkExportAssignment(this, node); return;
      default:
        astForEachChild(node, (c) => { this.checkSourceElement(c); return undefined; });
    }
  }

  getDiagnostics(file: SourceFile | undefined): readonly Diagnostic[] {
    if (file === undefined) return this.state.globalDiagnostics;
    return this.state.fileDiagnostics.get(file) ?? [];
  }
  getGlobalDiagnostics(): readonly Diagnostic[] { return this.state.globalDiagnostics; }

  // -------------------------------------------------------------------------
  // Statement check (per-Kind thin wrappers around the standalone bodies).
  // -------------------------------------------------------------------------
  checkBlock(node: AstNode): void { Statements.checkBlock(this, node); }

  // -------------------------------------------------------------------------
  // Declarations
  // -------------------------------------------------------------------------
  checkClassDeclaration(node: AstNode): void { Declarations.checkClassDeclaration(this, node); }
  checkClassExpression(node: AstNode): Type { return Declarations.checkClassExpression(this, node); }
  checkClassExpressionDeferred(node: AstNode): void { Declarations.checkClassExpressionDeferred(this, node); }
  checkClassStaticBlockDeclaration(node: AstNode): void { Declarations.checkClassStaticBlockDeclaration(this, node); }
  checkInterfaceDeclaration(node: AstNode): void { Declarations.checkInterfaceDeclaration(this, node); }
  checkTypeAliasDeclaration(node: AstNode): void { Declarations.checkTypeAliasDeclaration(this, node); }
  checkEnumDeclaration(node: AstNode): void { Declarations.checkEnumDeclaration(this, node); }
  checkEnumMember(node: AstNode): void { Declarations.checkEnumMember(this, node); }
  checkModuleDeclaration(node: AstNode): void { Declarations.checkModuleDeclaration(this, node); }
  checkConstructorDeclaration(node: AstNode): void { Declarations.checkConstructorDeclaration(this, node); }
  checkMethodDeclaration(node: AstNode): void { Declarations.checkMethodDeclaration(this, node); }
  checkAccessorDeclaration(node: AstNode): void { Declarations.checkAccessorDeclaration(this, node); }
  checkPropertyDeclaration(node: AstNode): void { Declarations.checkPropertyDeclaration(this, node); }
  checkFunctionDeclaration(node: AstNode): void { Declarations.checkFunctionDeclaration(this, node); }
  checkVariableDeclaration(node: AstNode): void { Declarations.checkVariableDeclaration(this, node); }
  checkVariableDeclarationList(node: AstNode): void { Declarations.checkVariableDeclarationList(this, node); }
  checkParameter(node: AstNode): void { Declarations.checkParameter(this, node); }
  checkBindingElement(node: AstNode): void { Declarations.checkBindingElement(this, node); }
  checkImportDeclaration(node: AstNode): void { Declarations.checkImportDeclaration(this, node); }
  checkExportDeclaration(node: AstNode): void { Declarations.checkExportDeclaration(this, node); }
  checkExportAssignment(node: AstNode): void { Declarations.checkExportAssignment(this, node); }

  // -------------------------------------------------------------------------
  // Expressions
  // -------------------------------------------------------------------------
  checkExpression(node: AstNode): Type { return this.checkExpressionEx(node, 0, false); }
  checkExpressionEx(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void forceTuple;
    return Expressions.checkExpressionWorker(this, node, checkMode);
  }
  checkIdentifier(node: AstNode): Type {
    const sym = this.getSymbolAtLocation(node);
    if (sym !== undefined) return this.getTypeOfSymbol(sym);
    return { flags: 1 << 0 } as unknown as Type;
  }
  checkBinaryExpression(node: AstNode, checkMode: number): Type {
    const left = (node as unknown as { left?: AstNode }).left;
    const right = (node as unknown as { right?: AstNode }).right;
    const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken;
    void checkMode;
    return Expressions.checkBinaryLikeExpression(this, left!, op?.kind ?? 0, right!);
  }
  checkConditionalExpression(node: AstNode, checkMode: number): Type {
    void checkMode;
    const cond = (node as unknown as { condition?: AstNode }).condition;
    const whenTrue = (node as unknown as { whenTrue?: AstNode }).whenTrue;
    const whenFalse = (node as unknown as { whenFalse?: AstNode }).whenFalse;
    if (cond !== undefined) this.checkExpression(cond);
    if (whenTrue !== undefined) this.checkExpression(whenTrue);
    if (whenFalse !== undefined) this.checkExpression(whenFalse);
    return { flags: 1 << 0 } as unknown as Type;
  }
  checkCallExpression(node: AstNode, checkMode: number): Type {
    void checkMode;
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) this.checkExpression(expr);
    const args = (node as unknown as { arguments?: { nodes?: readonly AstNode[] } }).arguments?.nodes;
    if (args !== undefined) for (const a of args) this.checkExpression(a);
    return { flags: 1 << 0 } as unknown as Type;
  }
  checkObjectLiteral(node: AstNode, checkMode: number): Type {
    void checkMode;
    const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
    if (props !== undefined) for (const p of props) {
      const init = (p as unknown as { initializer?: AstNode }).initializer;
      if (init !== undefined) this.checkExpression(init);
    }
    return { flags: 1 << 19 } as unknown as Type;
  }
  checkArrayLiteral(node: AstNode, checkMode: number, forceTuple: boolean): Type {
    void checkMode; void forceTuple;
    const elems = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
    if (elems !== undefined) for (const e of elems) this.checkExpression(e);
    return { flags: 1 << 19 } as unknown as Type;
  }

  // -------------------------------------------------------------------------
  // Types
  // -------------------------------------------------------------------------
  getTypeFromTypeNode(node: AstNode): Type { return Types.getTypeFromTypeNode(this, node); }
  getTypeOfSymbol(symbol: AstSymbol): Type { return Types.getTypeOfSymbol(this, symbol); }
  getTypeOfNode(node: AstNode): Type {
    const sym = this.getSymbolAtLocation(node);
    if (sym !== undefined) return this.getTypeOfSymbol(sym);
    return { flags: 1 << 0 } as unknown as Type;
  }
  getTypeOfExpression(node: AstNode): Type { return this.getTypeOfNode(node); }
  getTypeOfParameter(symbol: AstSymbol): Type { return this.getTypeOfSymbol(symbol); }
  getTypeOfPropertyOfType(t: Type, name: string): Type | undefined { return Properties.getTypeOfPropertyOfType(t, name); }
  getDeclaredTypeOfSymbol(symbol: AstSymbol): Type { return Types.getDeclaredTypeOfSymbol(this, symbol); }
  getDeclaredTypeOfClassOrInterface(symbol: AstSymbol): Type { return Types.getDeclaredTypeOfClassOrInterface(this, symbol); }
  createTypeReference(target: Type, typeArguments: readonly Type[] | undefined): Type { return Types.createTypeReference(this, target, typeArguments); }
  getTypeAliasInstantiation(symbol: AstSymbol, typeArguments: readonly Type[] | undefined): Type {
    return Types.getTypeAliasInstantiation(this, symbol, typeArguments);
  }
  getNonOptionalType(t: Type): Type {
    const types = (t as unknown as { types?: readonly Type[] }).types;
    if (types === undefined) return t;
    const filtered = types.filter((u) => {
      const f = (u as { flags?: number }).flags ?? 0;
      return (f & ((1 << 15) | (1 << 16))) === 0;
    });
    if (filtered.length === types.length) return t;
    if (filtered.length === 1) return filtered[0]!;
    return { ...(t as object), types: filtered } as unknown as Type;
  }

  // -------------------------------------------------------------------------
  // Symbols
  // -------------------------------------------------------------------------
  getSymbol(name: string, location: AstNode | undefined, meaning: number): AstSymbol | undefined {
    return Symbols.getSymbol(name, location, meaning);
  }
  getSymbolAtLocation(node: AstNode): AstSymbol | undefined { return Symbols.getSymbolAtLocation(node); }
  getSymbolOfNode(node: AstNode): AstSymbol | undefined { return Symbols.getSymbolOfNode(node); }
  getSymbolOfDeclaration(node: AstNode): AstSymbol | undefined { return Symbols.getSymbolOfDeclaration(node); }
  getSymbolFlags(symbol: AstSymbol): number { return Symbols.getSymbolFlags(symbol); }

  // -------------------------------------------------------------------------
  // Signatures
  // -------------------------------------------------------------------------
  getSignaturesOfType(t: Type, kind: SignatureKind): readonly Signature[] { return Signatures.getSignaturesOfType(t, kind); }
  getSignaturesOfSymbol(symbol: AstSymbol): readonly Signature[] { return Signatures.getSignaturesOfSymbol(this, symbol); }
  getSignatureFromDeclaration(declaration: AstNode): Signature { return Signatures.getSignatureFromDeclaration(this, declaration); }
  getReturnTypeOfSignature(signature: Signature): Type { return Signatures.getReturnTypeOfSignature(signature); }

  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------
  getPropertyOfType(t: Type, name: string): AstSymbol | undefined { return Properties.getPropertyOfType(t, name); }
  getPropertyOfObjectType(t: Type, name: string): AstSymbol | undefined { return Properties.getPropertyOfObjectType(t, name); }
  getPropertyOfUnionOrIntersectionType(t: Type, name: string): AstSymbol | undefined { return Properties.getPropertyOfUnionOrIntersectionType(t, name); }

  // -------------------------------------------------------------------------
  // Contextual
  // -------------------------------------------------------------------------
  getContextualType(node: AstNode): Type | undefined { return Contextual.getContextualType(this, node); }
}

export function newChecker(): Checker {
  return new Checker();
}

// Re-export the family modules for callers that want to call functions
// directly without going through a Checker instance.
export { Statements, Expressions, Declarations, Types, Symbols, Signatures, Properties, Contextual };
