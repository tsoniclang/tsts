import {
  NodeFlags,
  SymbolFlags,
  isBlock,
  isClassDeclaration,
  isDoStatement,
  isForInStatement,
  isForOfStatement,
  isForStatement,
  isFunctionDeclaration,
  isIdentifier,
  isObjectBindingPattern,
  isArrayBindingPattern,
  isImportDeclaration,
  isInterfaceDeclaration,
  isNamedImports,
  isNamespaceImport,
  isParameterDeclaration,
  isSourceFile,
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
    bindForInitializer(statement.initializer, state, lexicalScope, functionScope);
    bindStatement(statement.statement, state, lexicalScope, functionScope);
    return;
  }
  if (isForInStatement(statement) || isForOfStatement(statement)) {
    bindForInitializer(statement.initializer, state, lexicalScope, functionScope);
    bindStatement(statement.statement, state, lexicalScope, functionScope);
    return;
  }
  if (isBlock(statement)) {
    bindBlock(statement, state, functionScope);
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
