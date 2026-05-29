/**
 * Binder — SUBSTRATE (codex-021307 M4a).
 *
 * Faithful 1:1 re-port of microsoft/typescript-go `internal/binder/binder.go`
 * at the DATA-SUBSTRATE level: the binder writes symbols, locals tables and
 * parent pointers IN PLACE onto the parsed AST, exactly as tsgo does — there is
 * no side-table. The container stack + the single recursive `bind` dispatch +
 * `GetContainerFlags` + the full `declareSymbolEx` merge engine + module/class
 * static-vs-instance routing are deferred to M4b; M4a keeps the existing
 * statement-walk SHAPE while swapping the substrate to in-place binding.
 *
 * Controlled-mutable `Binder` class: one instance per bind run, the same
 * sanctioned exception as the parser/scanner run-state. Pure helpers
 * (declareSymbol given an explicit table) remain free of binder identity.
 *
 * tsgo refs:
 *   - newSymbol                binder.go:136
 *   - addDeclarationToSymbol   binder.go:2530-2546
 *   - SetValueDeclaration      binder.go:2548-2557
 */

import {
  NodeFlags,
  SymbolFlags,
  isArrayBindingPattern,
  isBigIntLiteral,
  isBlock,
  isClassDeclaration,
  isDoStatement,
  isEnumDeclaration,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isGetAccessorDeclaration,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isInterfaceDeclaration,
  isLabeledStatement,
  isMethodDeclaration,
  isMethodSignatureDeclaration,
  isModuleBlock,
  isModuleDeclaration,
  isNamedImports,
  isNamespaceImport,
  isNoSubstitutionTemplateLiteral,
  isNumericLiteral,
  isObjectBindingPattern,
  isParameterDeclaration,
  isPrivateIdentifier,
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  isReturnStatement,
  isSetAccessorDeclaration,
  isSourceFile,
  isStringLiteral,
  isSwitchStatement,
  isThrowStatement,
  isTryStatement,
  isTypeAliasDeclaration,
  isVariableStatement,
  isWhileStatement,
  type BindingElement,
  type BindingName,
  type Block,
  type ClassDeclaration,
  type Declaration,
  type EnumDeclaration,
  type ForInitializer,
  type FunctionDeclaration,
  type ImportClause,
  type ImportSpecifier,
  type InterfaceDeclaration,
  type ModuleDeclaration,
  type Node,
  type ParameterDeclaration,
  type PropertyName,
  type SourceFile,
  type Statement,
  type Symbol,
  type SymbolTable,
  type TypeAliasDeclaration,
  type TypeElement,
  type ClassElement,
  type VariableDeclaration,
  type VariableDeclarationList,
} from "../ast/index.js";

export interface BindDiagnostic {
  readonly message: string;
  readonly node: Node;
}

const allMeanings: SymbolFlags =
  SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias;

/**
 * Binds `sourceFile` in place (writing `node.symbol`, `node.locals`,
 * `node.parent`, and the real `Symbol` tables) and returns the binder
 * diagnostics. Mirrors tsgo's binder accumulating `bindDiagnostics` on the
 * source file (SourceFile.BindDiagnostics()); the substrate surfaces them as
 * the function result rather than as a side-table `BindResult`.
 */
export function bindSourceFile(sourceFile: SourceFile): readonly BindDiagnostic[] {
  return new Binder().bind(sourceFile);
}

/**
 * Reads the in-place symbol slot a declaration was bound to (tsgo
 * node.DeclarationData().Symbol).
 */
export function getSymbol(node: Declaration): Symbol | undefined {
  return node.symbol;
}

/**
 * Looks up `name` in `symbols`, filtered by `meaning`. Mirrors the meaning
 * refinement the name resolver applies when walking in-place `locals` /
 * `symbol.exports` / `symbol.members` tables.
 */
export function lookupSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags = allMeanings): Symbol | undefined {
  const symbol = symbols.get(name);
  if (symbol === undefined) {
    return undefined;
  }
  return ((symbol.flags ?? SymbolFlags.None) & meaning) === 0 ? undefined : symbol;
}

class Binder {
  // Controlled-mutable run-state (the sanctioned exception — one instance per
  // bind run, same category as the parser/scanner state).
  #file: SourceFile | undefined = undefined;
  #container: Node | undefined = undefined;
  #blockScopeContainer: Node | undefined = undefined;
  #thisContainer: Node | undefined = undefined;
  #lastContainer: Node | undefined = undefined;
  #symbolCount = 0;
  readonly #classifiableNames: Set<string> = new Set<string>();
  readonly #diagnostics: BindDiagnostic[] = [];
  // Flow run-state — declared now (used by M4d, not M4a).
  #currentFlow: Node | undefined = undefined;

  bind(sourceFile: SourceFile): readonly BindDiagnostic[] {
    this.#file = sourceFile;
    this.#container = sourceFile;
    this.#thisContainer = sourceFile;
    this.#blockScopeContainer = sourceFile;
    const globals: SymbolTable = new Map<string, Symbol>();
    sourceFile.locals = globals;
    this.bindStatements(sourceFile.statements, sourceFile, globals, globals);
    return this.#diagnostics;
  }

  // tsgo binder.go:136 — newSymbol(flags, name).
  #newSymbol(flags: SymbolFlags, name: string): Symbol {
    this.#symbolCount += 1;
    return { name, flags, declarations: [] };
  }

  // tsgo binder.go:2530-2546 — addDeclarationToSymbol(symbol, node, symbolFlags).
  #addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags): void {
    symbol.flags = (symbol.flags ?? SymbolFlags.None) | symbolFlags;
    node.symbol = symbol;
    if (!symbol.declarations.includes(node)) {
      symbol.declarations.push(node);
    }
    if ((symbolFlags & SymbolFlags.Value) !== 0) {
      setValueDeclaration(symbol, node);
    }
  }

  // declareSymbol skeleton (the full declareSymbolEx merge engine is M4b). Adds
  // `node` to `symbolTable` under `name`, reporting forbidden-redeclaration
  // diagnostics for `excludes` clashes.
  #declareSymbol(
    symbolTable: SymbolTable,
    name: string,
    node: Declaration,
    includes: SymbolFlags,
    excludes: SymbolFlags,
  ): Symbol {
    const existing = symbolTable.get(name);
    if (existing !== undefined) {
      if (((existing.flags ?? SymbolFlags.None) & excludes) !== 0) {
        this.#diagnostics.push({ message: `Duplicate identifier '${name}'.`, node });
        const symbol = this.#newSymbol(SymbolFlags.None, name);
        this.#addDeclarationToSymbol(symbol, node, includes);
        return symbol;
      }
      this.#addDeclarationToSymbol(existing, node, includes);
      return existing;
    }
    const symbol = this.#newSymbol(SymbolFlags.None, name);
    symbolTable.set(name, symbol);
    this.#addDeclarationToSymbol(symbol, node, includes);
    return symbol;
  }

  bindStatements(statements: readonly Statement[], parent: Node, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
    for (const statement of statements) {
      this.bindStatement(statement, parent, lexicalScope, functionScope);
    }
  }

  bindStatement(statement: Statement, parent: Node, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
    statement.parent = parent;
    if (isVariableStatement(statement)) {
      this.bindVariableDeclarationList(statement.declarationList, statement, lexicalScope, functionScope);
      return;
    }
    if (isImportDeclaration(statement)) {
      this.bindImportClause(statement.importClause, statement, lexicalScope);
      return;
    }
    if (isFunctionDeclaration(statement)) {
      this.bindFunctionDeclaration(statement, lexicalScope);
      return;
    }
    if (isClassDeclaration(statement)) {
      this.bindClassDeclaration(statement, lexicalScope);
      return;
    }
    if (isInterfaceDeclaration(statement)) {
      this.bindInterfaceDeclaration(statement, lexicalScope);
      return;
    }
    if (isTypeAliasDeclaration(statement)) {
      this.bindTypeAliasDeclaration(statement, lexicalScope);
      return;
    }
    if (isWhileStatement(statement) || isDoStatement(statement)) {
      this.bindStatement(statement.statement, statement, lexicalScope, functionScope);
      return;
    }
    if (isForStatement(statement)) {
      const loopScope: SymbolTable = new Map<string, Symbol>();
      statement.locals = loopScope;
      this.bindForInitializer(statement.initializer, statement, loopScope, functionScope);
      this.bindStatement(statement.statement, statement, loopScope, functionScope);
      return;
    }
    if (isForInStatement(statement) || isForOfStatement(statement)) {
      const loopScope: SymbolTable = new Map<string, Symbol>();
      statement.locals = loopScope;
      this.bindForInitializer(statement.initializer, statement, loopScope, functionScope);
      this.bindStatement(statement.statement, statement, loopScope, functionScope);
      return;
    }
    if (isBlock(statement)) {
      this.bindBlock(statement, statement.parent, functionScope);
      return;
    }
    if (isIfStatement(statement)) {
      // Then-branch + optional else-branch get bound in lexical scope.
      this.bindStatement(statement.thenStatement, statement, lexicalScope, functionScope);
      if (statement.elseStatement !== undefined) {
        this.bindStatement(statement.elseStatement, statement, lexicalScope, functionScope);
      }
      return;
    }
    if (isSwitchStatement(statement)) {
      // The CaseBlock contains the case clauses; each clause has its own
      // implicit block-scope.
      const caseBlock = statement.caseBlock;
      caseBlock.parent = statement;
      const switchScope: SymbolTable = new Map<string, Symbol>();
      caseBlock.locals = switchScope;
      for (const clause of caseBlock.clauses) {
        clause.parent = caseBlock;
        // CaseClause and DefaultClause both have a `statements` array.
        this.bindStatements(clause.statements, clause, switchScope, functionScope);
      }
      return;
    }
    if (isTryStatement(statement)) {
      this.bindBlock(statement.tryBlock, statement, functionScope);
      if (statement.catchClause !== undefined) {
        const catchClause = statement.catchClause;
        catchClause.parent = statement;
        const catchScope: SymbolTable = new Map<string, Symbol>();
        catchClause.locals = catchScope;
        const varDecl = catchClause.variableDeclaration;
        if (varDecl !== undefined) {
          varDecl.parent = catchClause;
          this.bindBindingName(
            varDecl.name, varDecl, catchScope,
            SymbolFlags.FunctionScopedVariable,
            SymbolFlags.FunctionScopedVariableExcludes,
          );
        }
        this.bindBlock(catchClause.block, catchClause, functionScope);
      }
      if (statement.finallyBlock !== undefined) {
        this.bindBlock(statement.finallyBlock, statement, functionScope);
      }
      return;
    }
    if (isReturnStatement(statement) || isThrowStatement(statement) || isExpressionStatement(statement)) {
      // These don't declare new symbols — flow-bind only when checker is wired.
      return;
    }
    if (isLabeledStatement(statement)) {
      // Labels live in their own namespace (handled by the checker via
      // labels-on-stack); we still descend into the labeled statement.
      this.bindStatement(statement.statement, statement, lexicalScope, functionScope);
      return;
    }
    if (isModuleDeclaration(statement)) {
      this.bindModuleDeclaration(statement, lexicalScope);
      return;
    }
    if (isEnumDeclaration(statement)) {
      this.bindEnumDeclaration(statement, lexicalScope);
      return;
    }
  }

  bindModuleDeclaration(moduleDecl: ModuleDeclaration, lexicalScope: SymbolTable): void {
    if (isIdentifier(moduleDecl.name) || isStringLiteral(moduleDecl.name)) {
      this.#declareSymbol(
        lexicalScope,
        moduleDecl.name.text,
        moduleDecl,
        SymbolFlags.ValueModule | SymbolFlags.NamespaceModule,
        SymbolFlags.None,
      );
    }
    const moduleMembers: SymbolTable = new Map<string, Symbol>();
    moduleDecl.locals = moduleMembers;
    // ModuleBlock body — bind its statements in the new scope.
    const body = moduleDecl.body;
    body.parent = moduleDecl;
    if (isModuleBlock(body)) {
      this.bindStatements(body.statements, body, moduleMembers, moduleMembers);
    } else {
      // Nested `namespace A.B` — body is itself a ModuleDeclaration.
      this.bindModuleDeclaration(body, moduleMembers);
    }
  }

  bindEnumDeclaration(enumDecl: EnumDeclaration, lexicalScope: SymbolTable): void {
    this.#declareSymbol(
      lexicalScope,
      enumDecl.name.text,
      enumDecl,
      SymbolFlags.RegularEnum,
      SymbolFlags.RegularEnumExcludes,
    );
    // tsgo declareSymbolAndAddToSymbolTable (binder.go:443-444): an enum is an
    // IsContainer (NOT HasLocals); its members live on the enum symbol's
    // `exports` table, not on `node.locals`.
    const symbol = enumDecl.symbol;
    const enumMembers: SymbolTable = symbol?.exports ?? new Map<string, Symbol>();
    if (symbol !== undefined) {
      symbol.exports = enumMembers;
    }
    for (const member of enumDecl.members) {
      member.parent = enumDecl;
      const memberName = propertyNameText(member.name);
      if (memberName === undefined) continue;
      this.#declareSymbol(
        enumMembers,
        memberName,
        member,
        SymbolFlags.EnumMember,
        SymbolFlags.EnumMemberExcludes,
      );
    }
  }

  bindImportClause(importClause: ImportClause | undefined, parent: Node, lexicalScope: SymbolTable): void {
    if (importClause === undefined) {
      return;
    }
    importClause.parent = parent;
    if (importClause.name !== undefined) {
      importClause.name.parent = importClause;
      this.#declareSymbol(lexicalScope, importClause.name.text, importClause, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
    }
    const namedBindings = importClause.namedBindings;
    if (namedBindings === undefined) {
      return;
    }
    namedBindings.parent = importClause;
    if (isNamespaceImport(namedBindings)) {
      this.#declareSymbol(lexicalScope, namedBindings.name.text, namedBindings, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
      return;
    }
    if (isNamedImports(namedBindings)) {
      for (const specifier of namedBindings.elements) {
        specifier.parent = namedBindings;
        this.bindImportSpecifier(specifier, lexicalScope);
      }
    }
  }

  bindImportSpecifier(specifier: ImportSpecifier, lexicalScope: SymbolTable): void {
    if (isIdentifier(specifier.name)) {
      this.#declareSymbol(lexicalScope, specifier.name.text, specifier, SymbolFlags.Alias, SymbolFlags.AliasExcludes);
    }
  }

  bindBlock(block: Block, parent: Node, functionScope: SymbolTable): void {
    block.parent = parent;
    const blockScope: SymbolTable = new Map<string, Symbol>();
    block.locals = blockScope;
    this.bindStatements(block.statements, block, blockScope, functionScope);
  }

  bindFunctionDeclaration(functionDeclaration: FunctionDeclaration, lexicalScope: SymbolTable): void {
    if (functionDeclaration.name !== undefined) {
      this.#declareSymbol(
        lexicalScope,
        functionDeclaration.name.text,
        functionDeclaration,
        SymbolFlags.Function,
        SymbolFlags.FunctionExcludes,
      );
    }

    const functionLocals: SymbolTable = new Map<string, Symbol>();
    functionDeclaration.locals = functionLocals;
    for (const parameter of functionDeclaration.parameters) {
      parameter.parent = functionDeclaration;
      this.bindParameter(parameter, functionLocals);
    }
    if (functionDeclaration.body !== undefined) {
      this.bindBlock(functionDeclaration.body, functionDeclaration, functionLocals);
    }
  }

  bindClassDeclaration(classDeclaration: ClassDeclaration, lexicalScope: SymbolTable): void {
    if (classDeclaration.name !== undefined) {
      this.#declareSymbol(
        lexicalScope,
        classDeclaration.name.text,
        classDeclaration,
        SymbolFlags.Class,
        SymbolFlags.ClassExcludes,
      );
    }
    // Class members live on the class symbol's member table (the full
    // static-vs-instance routing — members vs exports — is M4b; M4a writes
    // the in-place mechanism). `locals` carries the class type-parameter scope.
    const classMembers: SymbolTable = new Map<string, Symbol>();
    classDeclaration.locals = classMembers;
    const symbol = classDeclaration.symbol;
    const memberTable: SymbolTable = symbol?.members ?? new Map<string, Symbol>();
    if (symbol !== undefined) {
      symbol.members = memberTable;
    }
    for (const member of classDeclaration.members) {
      member.parent = classDeclaration;
      this.bindClassMember(member, memberTable);
    }
  }

  bindClassMember(member: ClassElement, memberTable: SymbolTable): void {
    if (isMethodDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.Method, SymbolFlags.MethodExcludes);
      return;
    }
    if (isGetAccessorDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes);
      return;
    }
    if (isSetAccessorDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes);
      return;
    }
    if (isPropertyDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
      return;
    }
  }

  bindInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, lexicalScope: SymbolTable): void {
    this.#declareSymbol(
      lexicalScope,
      interfaceDeclaration.name.text,
      interfaceDeclaration,
      SymbolFlags.Interface,
      SymbolFlags.InterfaceExcludes,
    );
    const symbol = interfaceDeclaration.symbol;
    const memberTable: SymbolTable = symbol?.members ?? new Map<string, Symbol>();
    if (symbol !== undefined) {
      symbol.members = memberTable;
    }
    for (const member of interfaceDeclaration.members) {
      member.parent = interfaceDeclaration;
      this.bindInterfaceMember(member, memberTable);
    }
  }

  bindInterfaceMember(member: TypeElement, memberTable: SymbolTable): void {
    if (isPropertySignatureDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
      return;
    }
    if (isMethodSignatureDeclaration(member)) {
      this.bindNamedMember(member, member.name, memberTable, SymbolFlags.Method, SymbolFlags.MethodExcludes);
      return;
    }
  }

  bindNamedMember(member: Declaration, name: PropertyName, memberTable: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags): void {
    const text = propertyNameText(name);
    if (text === undefined) return;
    this.#declareSymbol(memberTable, text, member, flags, excludes);
  }

  bindTypeAliasDeclaration(typeAliasDeclaration: TypeAliasDeclaration, lexicalScope: SymbolTable): void {
    this.#declareSymbol(
      lexicalScope,
      typeAliasDeclaration.name.text,
      typeAliasDeclaration,
      SymbolFlags.TypeAlias,
      SymbolFlags.TypeAliasExcludes,
    );
  }

  bindParameter(parameter: ParameterDeclaration, functionLocals: SymbolTable): void {
    this.bindBindingName(parameter.name, parameter, functionLocals, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
  }

  bindVariableDeclarationList(declarationList: VariableDeclarationList, parent: Node, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
    declarationList.parent = parent;
    const blockScoped = (declarationList.flags & NodeFlags.BlockScoped) !== 0;
    const targetScope = blockScoped ? lexicalScope : functionScope;
    const flags = blockScoped ? SymbolFlags.BlockScopedVariable : SymbolFlags.FunctionScopedVariable;
    const excludes = blockScoped ? SymbolFlags.BlockScopedVariableExcludes : SymbolFlags.FunctionScopedVariableExcludes;
    for (const declaration of declarationList.declarations) {
      declaration.parent = declarationList;
      this.bindVariableDeclaration(declaration, targetScope, flags, excludes);
    }
  }

  bindForInitializer(initializer: ForInitializer | undefined, parent: Node, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
    if (initializer !== undefined && "declarations" in initializer) {
      this.bindVariableDeclarationList(initializer, parent, lexicalScope, functionScope);
    }
  }

  bindVariableDeclaration(declaration: VariableDeclaration, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags): void {
    this.bindBindingName(declaration.name, declaration, targetScope, flags, excludes);
  }

  bindBindingName(name: BindingName, declaration: Declaration, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags): void {
    name.parent = declaration;
    if (isIdentifier(name)) {
      this.#declareSymbol(targetScope, name.text, declaration, flags, excludes);
      return;
    }
    if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
      for (const element of name.elements) {
        element.parent = name;
        this.bindBindingElement(element, targetScope, flags, excludes);
      }
      return;
    }
  }

  bindBindingElement(element: BindingElement, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags): void {
    if (element.name !== undefined) {
      this.bindBindingName(element.name, element, targetScope, flags, excludes);
    }
  }
}

// tsgo binder.go:2548-2557 — SetValueDeclaration (pure: writes the symbol's
// value declaration slot). Non-assignment declarations take precedence over
// assignment declarations; the M4a substrate only needs the first-writer rule.
function setValueDeclaration(symbol: Symbol, node: Declaration): void {
  if (symbol.valueDeclaration === undefined) {
    symbol.valueDeclaration = node;
  }
}

// Extracts the text of a member/property name when it is a textual name; a
// ComputedPropertyName has no static text and is skipped (full computed-name
// handling is M4b).
function propertyNameText(name: PropertyName): string | undefined {
  if (
    isIdentifier(name)
    || isStringLiteral(name)
    || isNumericLiteral(name)
    || isPrivateIdentifier(name)
    || isNoSubstitutionTemplateLiteral(name)
    || isBigIntLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

export function assertBoundSourceFile(node: Node): asserts node is SourceFile {
  if (!isSourceFile(node)) {
    throw new Error("Expected SourceFile");
  }
}

export function assertBoundParameter(node: Node): asserts node is ParameterDeclaration {
  if (!isParameterDeclaration(node)) {
    throw new Error("Expected ParameterDeclaration");
  }
}
