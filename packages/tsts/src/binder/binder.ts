import {
  NodeFlags,
  SymbolFlags,
  isBlock,
  isClassDeclaration,
  isDoStatement,
  isEnumDeclaration,
  isExpressionStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isIdentifier,
  isIfStatement,
  isLabeledStatement,
  isModuleDeclaration,
  isObjectBindingPattern,
  isArrayBindingPattern,
  isImportDeclaration,
  isInterfaceDeclaration,
  isNamedImports,
  isNamespaceImport,
  isParameterDeclaration,
  isReturnStatement,
  isSourceFile,
  isSwitchStatement,
  isThrowStatement,
  isTryStatement,
  isTypeAliasDeclaration,
  isVariableStatement,
  isWhileStatement,
  type BindingName,
  type BindingElement,
  type Block,
  type ClassDeclaration,
  type ForInitializer,
  type FunctionDeclaration,
  type ImportClause,
  type ImportSpecifier,
  type InterfaceDeclaration,
  type Node,
  type ParameterDeclaration,
  type SourceFile,
  type Statement,
  type TypeAliasDeclaration,
  type VariableDeclaration,
  type VariableDeclarationList,
} from "../ast/index.js";

export type SymbolTable = Map<string, BoundSymbol>;

export interface BoundSymbol {
  readonly name: string;
  flags: SymbolFlags;
  readonly declarations: Node[];
  valueDeclaration?: Node;
  readonly members?: SymbolTable;
  readonly exports?: SymbolTable;
}

export interface BindDiagnostic {
  readonly message: string;
  readonly node: Node;
}

export interface BindResult {
  readonly sourceFile: SourceFile;
  readonly globals: SymbolTable;
  readonly locals: WeakMap<Node, SymbolTable>;
  readonly symbols: WeakMap<Node, BoundSymbol>;
  readonly diagnostics: readonly BindDiagnostic[];
}

interface BinderState {
  readonly locals: WeakMap<Node, SymbolTable>;
  readonly symbols: WeakMap<Node, BoundSymbol>;
  readonly diagnostics: BindDiagnostic[];
}

export function bindSourceFile(sourceFile: SourceFile): BindResult {
  const state: BinderState = {
    locals: new WeakMap(),
    symbols: new WeakMap(),
    diagnostics: [],
  };
  const globals: SymbolTable = new Map();
  state.locals.set(sourceFile, globals);
  bindStatements(sourceFile.statements, state, globals, globals);
  return {
    sourceFile,
    globals,
    locals: state.locals,
    symbols: state.symbols,
    diagnostics: state.diagnostics,
  };
}

export function lookupSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags = SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias): BoundSymbol | undefined {
  const symbol = symbols.get(name);
  if (symbol === undefined) {
    return undefined;
  }
  return (symbol.flags & meaning) === 0 ? undefined : symbol;
}

export function getSymbol(bindResult: BindResult, node: Node): BoundSymbol | undefined {
  return bindResult.symbols.get(node);
}

function bindStatements(statements: readonly Statement[], state: BinderState, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
  for (const statement of statements) {
    bindStatement(statement, state, lexicalScope, functionScope);
  }
}

function bindStatement(statement: Statement, state: BinderState, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
  if (isVariableStatement(statement)) {
    bindVariableDeclarationList(statement.declarationList, state, lexicalScope, functionScope);
    return;
  }
  if (isImportDeclaration(statement)) {
    bindImportClause(statement.importClause, lexicalScope, state);
    return;
  }
  if (isFunctionDeclaration(statement)) {
    bindFunctionDeclaration(statement, state, lexicalScope);
    return;
  }
  if (isClassDeclaration(statement)) {
    bindClassDeclaration(statement, state, lexicalScope);
    return;
  }
  if (isInterfaceDeclaration(statement)) {
    bindInterfaceDeclaration(statement, state, lexicalScope);
    return;
  }
  if (isTypeAliasDeclaration(statement)) {
    bindTypeAliasDeclaration(statement, state, lexicalScope);
    return;
  }
  if (isWhileStatement(statement) || isDoStatement(statement)) {
    bindStatement(statement.statement, state, lexicalScope, functionScope);
    return;
  }
  if (isForStatement(statement)) {
    const loopScope: SymbolTable = new Map();
    state.locals.set(statement, loopScope);
    bindForInitializer(statement.initializer, state, loopScope, functionScope);
    bindStatement(statement.statement, state, loopScope, functionScope);
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    const loopScope: SymbolTable = new Map();
    state.locals.set(statement, loopScope);
    bindForInitializer(statement.initializer, state, loopScope, functionScope);
    bindStatement(statement.statement, state, loopScope, functionScope);
    return;
  }
  if (isBlock(statement)) {
    bindBlock(statement, state, functionScope);
    return;
  }
  if (isIfStatement(statement)) {
    // Then-branch + optional else-branch get bound in lexical scope.
    bindStatement(statement.thenStatement, state, lexicalScope, functionScope);
    if (statement.elseStatement !== undefined) {
      bindStatement(statement.elseStatement, state, lexicalScope, functionScope);
    }
    return;
  }
  if (isSwitchStatement(statement)) {
    // The CaseBlock contains the case clauses; each clause has its own
    // implicit block-scope.
    const caseBlock = statement.caseBlock;
    if (caseBlock !== undefined) {
      const switchScope: SymbolTable = new Map();
      state.locals.set(caseBlock, switchScope);
      for (const clause of caseBlock.clauses) {
        // CaseClause and DefaultClause both have a `statements` array.
        const clauseStatements = (clause as unknown as { statements?: readonly Statement[] }).statements;
        if (clauseStatements !== undefined) {
          bindStatements(clauseStatements, state, switchScope, functionScope);
        }
      }
    }
    return;
  }
  if (isTryStatement(statement)) {
    bindBlock(statement.tryBlock, state, functionScope);
    if (statement.catchClause !== undefined) {
      const catchScope: SymbolTable = new Map();
      state.locals.set(statement.catchClause, catchScope);
      const varDecl = statement.catchClause.variableDeclaration;
      if (varDecl !== undefined) {
        bindBindingName(
          varDecl.name, varDecl, catchScope,
          SymbolFlags.FunctionScopedVariable,
          SymbolFlags.FunctionScopedVariableExcludes,
          state,
        );
      }
      bindStatements(statement.catchClause.block.statements, state, catchScope, functionScope);
    }
    if (statement.finallyBlock !== undefined) {
      bindBlock(statement.finallyBlock, state, functionScope);
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
    bindStatement(statement.statement, state, lexicalScope, functionScope);
    return;
  }
  if (isModuleDeclaration(statement)) {
    bindModuleDeclaration(statement, state, lexicalScope);
    return;
  }
  if (isEnumDeclaration(statement)) {
    bindEnumDeclaration(statement, state, lexicalScope);
    return;
  }
}

function bindModuleDeclaration(
  moduleDecl: { name: { text: string }; body?: unknown },
  state: BinderState,
  lexicalScope: SymbolTable,
): void {
  const isAmbient = (moduleDecl as unknown as { flags?: number }).flags;
  void isAmbient;
  declareSymbol(
    lexicalScope,
    moduleDecl.name.text,
    moduleDecl as unknown as Node,
    SymbolFlags.ValueModule | SymbolFlags.NamespaceModule,
    SymbolFlags.None,
    state,
  );
  const moduleMembers: SymbolTable = new Map();
  state.locals.set(moduleDecl as unknown as Node, moduleMembers);
  // ModuleBlock body — bind its statements in the new scope.
  const body = (moduleDecl as unknown as { body?: { statements?: readonly Statement[]; kind?: number } }).body;
  if (body !== undefined && body.statements !== undefined) {
    bindStatements(body.statements, state, moduleMembers, moduleMembers);
  }
}

function bindEnumDeclaration(
  enumDecl: Node,
  state: BinderState,
  lexicalScope: SymbolTable,
): void {
  const name = (enumDecl as unknown as { name?: { text?: string } }).name;
  if (name?.text === undefined) return;
  declareSymbol(
    lexicalScope,
    name.text,
    enumDecl,
    SymbolFlags.RegularEnum,
    SymbolFlags.RegularEnumExcludes,
    state,
  );
  const enumMembers: SymbolTable = new Map();
  state.locals.set(enumDecl, enumMembers);
  const members = (enumDecl as unknown as { members?: readonly Node[] }).members ?? [];
  for (const member of members) {
    const memberName = (member as unknown as { name?: { text?: string } }).name?.text;
    if (memberName === undefined) continue;
    declareSymbol(
      enumMembers,
      memberName,
      member,
      SymbolFlags.EnumMember,
      SymbolFlags.EnumMemberExcludes,
      state,
    );
  }
}

function bindImportClause(importClause: ImportClause | undefined, lexicalScope: SymbolTable, state: BinderState): void {
  if (importClause === undefined) {
    return;
  }
  if (importClause.name !== undefined) {
    declareSymbol(lexicalScope, importClause.name.text, importClause, SymbolFlags.Alias, SymbolFlags.AliasExcludes, state);
  }
  const namedBindings = importClause.namedBindings;
  if (namedBindings === undefined) {
    return;
  }
  if (isNamespaceImport(namedBindings)) {
    declareSymbol(lexicalScope, namedBindings.name.text, namedBindings, SymbolFlags.Alias, SymbolFlags.AliasExcludes, state);
    return;
  }
  if (isNamedImports(namedBindings)) {
    for (const specifier of namedBindings.elements) {
      bindImportSpecifier(specifier, lexicalScope, state);
    }
  }
}

function bindImportSpecifier(specifier: ImportSpecifier, lexicalScope: SymbolTable, state: BinderState): void {
  declareSymbol(lexicalScope, specifier.name.text, specifier, SymbolFlags.Alias, SymbolFlags.AliasExcludes, state);
}

function bindBlock(block: Block, state: BinderState, functionScope: SymbolTable): void {
  const blockScope: SymbolTable = new Map();
  state.locals.set(block, blockScope);
  bindStatements(block.statements, state, blockScope, functionScope);
}

function bindFunctionDeclaration(functionDeclaration: FunctionDeclaration, state: BinderState, lexicalScope: SymbolTable): void {
  if (functionDeclaration.name !== undefined) {
    declareSymbol(
      lexicalScope,
      functionDeclaration.name.text,
      functionDeclaration,
      SymbolFlags.Function,
      SymbolFlags.FunctionExcludes,
      state,
    );
  }

  const functionLocals: SymbolTable = new Map();
  state.locals.set(functionDeclaration, functionLocals);
  for (const parameter of functionDeclaration.parameters) {
    bindParameter(parameter, functionLocals, state);
  }
  if (functionDeclaration.body !== undefined) {
    bindBlock(functionDeclaration.body, state, functionLocals);
  }
}

function bindClassDeclaration(classDeclaration: ClassDeclaration, state: BinderState, lexicalScope: SymbolTable): void {
  if (classDeclaration.name !== undefined) {
    declareSymbol(
      lexicalScope,
      classDeclaration.name.text,
      classDeclaration,
      SymbolFlags.Class,
      SymbolFlags.ClassExcludes,
      state,
    );
  }
  const classMembers: SymbolTable = new Map();
  state.locals.set(classDeclaration, classMembers);
}

function bindInterfaceDeclaration(interfaceDeclaration: InterfaceDeclaration, state: BinderState, lexicalScope: SymbolTable): void {
  declareSymbol(
    lexicalScope,
    interfaceDeclaration.name.text,
    interfaceDeclaration,
    SymbolFlags.Interface,
    SymbolFlags.InterfaceExcludes,
    state,
  );
  const interfaceMembers: SymbolTable = new Map();
  state.locals.set(interfaceDeclaration, interfaceMembers);
}

function bindTypeAliasDeclaration(typeAliasDeclaration: TypeAliasDeclaration, state: BinderState, lexicalScope: SymbolTable): void {
  declareSymbol(
    lexicalScope,
    typeAliasDeclaration.name.text,
    typeAliasDeclaration,
    SymbolFlags.TypeAlias,
    SymbolFlags.TypeAliasExcludes,
    state,
  );
}

function bindParameter(parameter: ParameterDeclaration, functionLocals: SymbolTable, state: BinderState): void {
  bindBindingName(parameter.name, parameter, functionLocals, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes, state);
}

function bindVariableDeclarationList(declarationList: VariableDeclarationList, state: BinderState, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
  const blockScoped = (declarationList.flags & NodeFlags.BlockScoped) !== 0;
  const targetScope = blockScoped ? lexicalScope : functionScope;
  const flags = blockScoped ? SymbolFlags.BlockScopedVariable : SymbolFlags.FunctionScopedVariable;
  const excludes = blockScoped ? SymbolFlags.BlockScopedVariableExcludes : SymbolFlags.FunctionScopedVariableExcludes;
  for (const declaration of declarationList.declarations) {
    bindVariableDeclaration(declaration, targetScope, flags, excludes, state);
  }
}

function bindForInitializer(initializer: ForInitializer | undefined, state: BinderState, lexicalScope: SymbolTable, functionScope: SymbolTable): void {
  if (initializer !== undefined && "declarations" in initializer) {
    bindVariableDeclarationList(initializer, state, lexicalScope, functionScope);
  }
}

function bindVariableDeclaration(declaration: VariableDeclaration, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags, state: BinderState): void {
  bindBindingName(declaration.name, declaration, targetScope, flags, excludes, state);
}

function bindBindingName(name: BindingName, declaration: Node, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags, state: BinderState): void {
  if (isIdentifier(name)) {
    declareSymbol(targetScope, name.text, declaration, flags, excludes, state);
    return;
  }
  if (isObjectBindingPattern(name) || isArrayBindingPattern(name)) {
    for (const element of name.elements) {
      bindBindingElement(element, targetScope, flags, excludes, state);
    }
    return;
  }
}

function bindBindingElement(element: BindingElement, targetScope: SymbolTable, flags: SymbolFlags, excludes: SymbolFlags, state: BinderState): void {
  if (element.name !== undefined) {
    bindBindingName(element.name, element, targetScope, flags, excludes, state);
  }
}

function declareSymbol(
  symbols: SymbolTable,
  name: string,
  declaration: Node,
  includes: SymbolFlags,
  excludes: SymbolFlags,
  state: BinderState,
): BoundSymbol {
  const existing = symbols.get(name);
  if (existing !== undefined) {
    if ((existing.flags & excludes) !== 0) {
      state.diagnostics.push({
        message: `Duplicate identifier '${name}'.`,
        node: declaration,
      });
    } else {
      existing.flags |= includes;
      existing.declarations.push(declaration);
      if (existing.valueDeclaration === undefined && isValueDeclaration(includes)) {
        existing.valueDeclaration = declaration;
      }
      state.symbols.set(declaration, existing);
      return existing;
    }
  }

  const symbol: BoundSymbol = {
    name,
    flags: includes,
    declarations: [declaration],
  };
  if (isValueDeclaration(includes)) {
    symbol.valueDeclaration = declaration;
  }
  symbols.set(name, symbol);
  state.symbols.set(declaration, symbol);
  return symbol;
}

function isValueDeclaration(flags: SymbolFlags): boolean {
  return (flags & SymbolFlags.Value) !== 0;
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
