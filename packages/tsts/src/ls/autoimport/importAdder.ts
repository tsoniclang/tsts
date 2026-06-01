import { Kind, type Node, type SourceFile, type Symbol as AstSymbol } from "../../ast/index.js";
import {
  AddAsTypeOnlyAllowed,
  AddAsTypeOnlyNotAllowed,
  AddAsTypeOnlyRequired,
  AutoImportFixKindAddNew,
  AutoImportFixKindAddToExisting,
  AutoImportFixKindJsdocTypeImport,
  AutoImportFixKindPromoteTypeOnly,
  AutoImportFixKindUseNamespace,
  ImportKindCommonJS,
  ImportKindDefault,
  ImportKindNamed,
  ImportKindNamespace,
  type AddAsTypeOnly,
  type ImportKind,
  type Position,
  type TextEdit,
} from "../../lsp/lsproto/index.js";
import type { ExportEntry } from "./export.js";
import type { Fix, NewImportBinding } from "./fix.js";

export interface ImportAdder {
  hasFixes(): boolean;
  addImportFromExportedSymbol(symbol: AstSymbol, isValidTypeOnlyUseSite: boolean): void;
  addImportFix(fix: Fix): void;
  edits(): readonly TextEdit[];
}

export interface AddToExistingState {
  readonly importClauseOrBindingPattern: Node;
  defaultImport?: NewImportBinding;
  readonly namedImports: Map<string, NewImportBinding>;
}

export interface ImportsCollection {
  defaultImport?: NewImportBinding;
  readonly namedImports: Map<string, NewImportBinding>;
  namespaceLikeImport?: NewImportBinding;
  readonly useRequire: boolean;
}

export interface ImportAdderChecker {
  getMergedSymbol?(symbol: AstSymbol): AstSymbol;
  skipAlias?(symbol: AstSymbol): AstSymbol;
}

export interface ImportAdderView {
  getFixes?(
    exportEntry: ExportEntry,
    forJsx: boolean,
    isTypeOnlyLocation: boolean,
    usagePosition: unknown,
  ): readonly Fix[];
  compareFixesForRanking?(left: Fix, right: Fix): number;
}

export interface ImportAdderOptions {
  readonly checker?: ImportAdderChecker;
  readonly view?: ImportAdderView;
  readonly sourceFile?: SourceFile;
  readonly existingImportResolver?: (fix: Fix) => readonly [Node, NewImportBinding | undefined, NewImportBinding | undefined];
  readonly symbolExports?: (symbol: AstSymbol) => readonly ExportEntry[];
}

export function newImportsKey(moduleSpecifier: string, topLevelTypeOnly: boolean): string {
  return (topLevelTypeOnly ? "1|" : "0|") + moduleSpecifier;
}

export class ImportAdderImpl implements ImportAdder {
  readonly addToNamespace: Fix[] = [];
  readonly importType: Fix[] = [];
  readonly addToExisting = new Map<Node, AddToExistingState>();
  readonly newImports = new Map<string, ImportsCollection>();
  readonly #checker: ImportAdderChecker | undefined;
  readonly #view: ImportAdderView | undefined;
  readonly #sourceFile: SourceFile | undefined;
  readonly #existingImportResolver: ((fix: Fix) => readonly [Node, NewImportBinding | undefined, NewImportBinding | undefined]) | undefined;
  readonly #symbolExports: ((symbol: AstSymbol) => readonly ExportEntry[]) | undefined;

  constructor(options: ImportAdderOptions = {}) {
    this.#checker = options.checker;
    this.#view = options.view;
    this.#sourceFile = options.sourceFile;
    this.#existingImportResolver = options.existingImportResolver;
    this.#symbolExports = options.symbolExports;
  }

  hasFixes(): boolean {
    return this.addToNamespace.length > 0
      || this.importType.length > 0
      || this.addToExisting.size > 0
      || this.newImports.size > 0;
  }

  addImportFromExportedSymbol(exportedSymbol: AstSymbol, isValidTypeOnlyUseSite: boolean): void {
    const skipped = this.#checker?.skipAlias?.(exportedSymbol) ?? exportedSymbol;
    const symbol = this.#checker?.getMergedSymbol?.(skipped) ?? skipped;
    const exportInfos = this.getAllExportsForSymbol(symbol);
    if (exportInfos.length === 0) return;
    const fix = this.getImportFixForSymbol(exportInfos, isValidTypeOnlyUseSite);
    if (fix !== undefined) this.addImportFix(fix);
  }

  edits(): readonly TextEdit[] {
    if (this.#sourceFile === undefined) {
      if (!this.hasFixes()) return [];
      throw new Error("ImportAdder edits require a source file");
    }

    const edits: TextEdit[] = [];
    for (const fix of this.addToNamespace) addNamespaceQualifierEdit(edits, fix);
    for (const fix of this.importType) addImportTypeEdit(edits, fix);
    for (const [importClauseOrBindingPattern, entry] of this.addToExisting) {
      addToExistingImportEdits(
        edits,
        this.#sourceFile,
        importClauseOrBindingPattern,
        entry.defaultImport,
        sortedNamedImports(entry.namedImports),
      );
    }

    const newImportStatements: string[] = [];
    for (const [key, newImport] of [...this.newImports].sort(([left], [right]) => left.localeCompare(right))) {
      const moduleSpecifier = key.slice(2);
      const topLevelTypeOnly = key.startsWith("1|");
      newImportStatements.push(...getNewImportStatements(moduleSpecifier, newImport, topLevelTypeOnly));
    }
    if (newImportStatements.length > 0) {
      edits.push(insertImportsEdit(this.#sourceFile, newImportStatements));
    }

    return edits.sort(compareTextEdits);
  }

  addImportFix(fix: Fix): void {
    const symbolName = requireFixName(fix);
    switch (fix.kind) {
      case AutoImportFixKindUseNamespace:
        this.addToNamespace.push(fix);
        return;
      case AutoImportFixKindJsdocTypeImport:
        this.importType.push(fix);
        return;
      case AutoImportFixKindAddToExisting:
        this.addToExistingImport(fix, symbolName);
        return;
      case AutoImportFixKindAddNew:
        this.addNewImport(fix, symbolName);
        return;
      case AutoImportFixKindPromoteTypeOnly:
        return;
      default:
        throw new Error(`Unexpected auto-import fix kind: ${fix.kind}`);
    }
  }

  getNewImportEntry(
    moduleSpecifier: string,
    importKind: ImportKind,
    useRequire: boolean,
    addAsTypeOnly: AddAsTypeOnly,
  ): ImportsCollection {
    const typeOnlyKey = newImportsKey(moduleSpecifier, true);
    const nonTypeOnlyKey = newImportsKey(moduleSpecifier, false);
    const typeOnlyEntry = this.newImports.get(typeOnlyKey);
    const nonTypeOnlyEntry = this.newImports.get(nonTypeOnlyKey);
    const newEntry: ImportsCollection = {
      namedImports: new Map<string, NewImportBinding>(),
      useRequire,
    };

    if (importKind === ImportKindDefault && addAsTypeOnly === AddAsTypeOnlyRequired) {
      if (typeOnlyEntry !== undefined) return typeOnlyEntry;
      this.newImports.set(typeOnlyKey, newEntry);
      return newEntry;
    }

    if (addAsTypeOnly === AddAsTypeOnlyAllowed && (typeOnlyEntry !== undefined || nonTypeOnlyEntry !== undefined)) {
      return typeOnlyEntry ?? nonTypeOnlyEntry!;
    }

    if (nonTypeOnlyEntry !== undefined) return nonTypeOnlyEntry;
    this.newImports.set(nonTypeOnlyKey, newEntry);
    return newEntry;
  }

  getAllExportsForSymbol(symbol: AstSymbol): readonly ExportEntry[] {
    return this.#symbolExports?.(symbol) ?? [];
  }

  getImportFixForSymbol(exports: readonly ExportEntry[], isValidTypeOnlyUseSite: boolean): Fix | undefined {
    const fixes: Fix[] = [];
    for (const exportEntry of exports) {
      fixes.push(...(this.#view?.getFixes?.(exportEntry, false, isValidTypeOnlyUseSite, undefined) ?? []));
    }
    fixes.sort((left, right) => this.#view?.compareFixesForRanking?.(left, right) ?? 0);
    return fixes[0];
  }

  private addToExistingImport(fix: Fix, symbolName: string): void {
    if (this.#existingImportResolver === undefined && this.#sourceFile === undefined) {
      throw new Error("Add-to-existing auto-import fix requires an import-clause resolver");
    }
    const [importClauseOrBindingPattern, defaultImport, namedImport] = this.#existingImportResolver?.(fix)
      ?? resolveExistingImportFix(this.#sourceFile!, fix);
    let entry = this.addToExisting.get(importClauseOrBindingPattern);
    if (entry === undefined) {
      entry = {
        importClauseOrBindingPattern,
        namedImports: new Map<string, NewImportBinding>(),
      };
      this.addToExisting.set(importClauseOrBindingPattern, entry);
    }

    if (fix.importKind === ImportKindNamed) {
      const previous = entry.namedImports.get(symbolName);
      entry.namedImports.set(symbolName, {
        kind: ImportKindNamed,
        propertyName: namedImport?.propertyName ?? "",
        name: symbolName,
        addAsTypeOnly: reduceAddAsTypeOnlyValues(previous?.addAsTypeOnly ?? 0, fix.addAsTypeOnly),
      });
      return;
    }

    if (entry.defaultImport !== undefined && entry.defaultImport.name !== symbolName) {
      throw new Error("(Add to Existing) default import should be missing or match symbolName");
    }
    entry.defaultImport = {
      kind: ImportKindDefault,
      propertyName: defaultImport?.propertyName ?? "",
      name: symbolName,
      addAsTypeOnly: reduceAddAsTypeOnlyValues(entry.defaultImport?.addAsTypeOnly ?? 0, fix.addAsTypeOnly),
    };
  }

  private addNewImport(fix: Fix, symbolName: string): void {
    const moduleSpecifier = requireModuleSpecifier(fix);
    const entry = this.getNewImportEntry(moduleSpecifier, fix.importKind, fix.useRequire === true, fix.addAsTypeOnly);
    if (entry.useRequire !== (fix.useRequire === true)) {
      throw new Error("(Add new) tried to add an import and a require for the same module");
    }

    switch (fix.importKind) {
      case ImportKindDefault:
        if (entry.defaultImport !== undefined && entry.defaultImport.name !== symbolName) {
          throw new Error("(Add new) default import should be missing or match symbolName");
        }
        entry.defaultImport = {
          kind: ImportKindDefault,
          propertyName: "",
          name: symbolName,
          addAsTypeOnly: reduceAddAsTypeOnlyValues(entry.defaultImport?.addAsTypeOnly ?? 0, fix.addAsTypeOnly),
        };
        return;
      case ImportKindNamed: {
        const previous = entry.namedImports.get(symbolName);
        entry.namedImports.set(symbolName, {
          kind: ImportKindNamed,
          propertyName: "",
          name: symbolName,
          addAsTypeOnly: reduceAddAsTypeOnlyValues(previous?.addAsTypeOnly ?? 0, fix.addAsTypeOnly),
        });
        return;
      }
      case ImportKindCommonJS:
        if (fix.addAsTypeOnly === AddAsTypeOnlyNotAllowed) {
          this.setNamespaceLikeImport(entry, ImportKindCommonJS, symbolName, fix.addAsTypeOnly);
        } else {
          const previous = entry.namedImports.get(symbolName);
          entry.namedImports.set(symbolName, {
            kind: ImportKindCommonJS,
            propertyName: "",
            name: symbolName,
            addAsTypeOnly: reduceAddAsTypeOnlyValues(previous?.addAsTypeOnly ?? 0, fix.addAsTypeOnly),
          });
        }
        return;
      case ImportKindNamespace:
        this.setNamespaceLikeImport(entry, ImportKindNamespace, symbolName, fix.addAsTypeOnly);
        return;
    }
  }

  private setNamespaceLikeImport(
    entry: ImportsCollection,
    importKind: ImportKind,
    symbolName: string,
    addAsTypeOnly: AddAsTypeOnly,
  ): void {
    if (entry.namespaceLikeImport !== undefined && entry.namespaceLikeImport.name !== symbolName) {
      throw new Error("Namespacelike import should be missing or match symbolName");
    }
    entry.namespaceLikeImport = {
      kind: importKind,
      propertyName: "",
      name: symbolName,
      addAsTypeOnly,
    };
  }
}

export function newImportAdder(options: ImportAdderOptions = {}): ImportAdder {
  return new ImportAdderImpl(options);
}

export function sortedNamedImports(map: ReadonlyMap<string, NewImportBinding>): readonly NewImportBinding[] {
  return [...map]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, value]) => value);
}

export function reduceAddAsTypeOnlyValues(prevValue: AddAsTypeOnly, newValue: AddAsTypeOnly): AddAsTypeOnly {
  return newValue > prevValue ? newValue : prevValue;
}

export function typeToAutoImportableTypeNode(
  _checker: unknown,
  _importAdder: ImportAdder | undefined,
  type: unknown,
  _contextNode: Node,
): unknown {
  return type;
}

export function typeNodeToAutoImportableTypeNode(
  typeNode: Node,
  importAdder: ImportAdder | undefined,
  idToSymbol: ReadonlyMap<Node, AstSymbol>,
): Node {
  const [referenceTypeNode, importableSymbols] = tryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol);
  if (importableSymbols.length > 0 && importAdder !== undefined) importSymbols(importAdder, importableSymbols);
  return referenceTypeNode ?? typeNode;
}

export function importSymbols(importAdder: ImportAdder, symbols: readonly AstSymbol[]): void {
  for (const symbol of symbols) importAdder.addImportFromExportedSymbol(symbol, true);
}

export function tryGetAutoImportableReferenceFromTypeNode(
  importTypeNode: Node,
  _idToSymbol: ReadonlyMap<Node, AstSymbol>,
): readonly [Node | undefined, readonly AstSymbol[]] {
  return [importTypeNode, []];
}

export function getNameForExportedSymbol(symbol: AstSymbol, preferCapitalized: boolean): string {
  const symbolName = symbol.name ?? symbol.escapedName ?? "";
  if (symbolName === "export=" || symbolName === "default") {
    const name = getDefaultLikeExportNameFromDeclaration(symbol);
    if (name !== "") return name;
    const parentName = symbol.parent?.name ?? symbol.parent?.escapedName ?? "";
    return moduleSymbolToValidIdentifier(parentName, preferCapitalized);
  }
  return symbolName;
}

export function replaceFirstIdentifierOfEntityName(_factory: unknown, name: Node, _newIdentifier: Node): Node {
  return name;
}

function addNamespaceQualifierEdit(edits: TextEdit[], fix: Fix): void {
  const usagePosition = fix.usagePosition;
  const namespacePrefix = fix.namespacePrefix;
  if (usagePosition === undefined || namespacePrefix === undefined || namespacePrefix === "") {
    throw new Error("namespace auto-import fix requires usagePosition and namespacePrefix");
  }
  edits.push(insertTextEdit(usagePosition, `${namespacePrefix}.`));
}

function addImportTypeEdit(edits: TextEdit[], fix: Fix): void {
  const usagePosition = fix.usagePosition;
  const moduleSpecifier = fix.moduleSpecifier;
  if (usagePosition === undefined || moduleSpecifier === undefined || moduleSpecifier === "") {
    throw new Error("JSDoc import-type fix requires usagePosition and moduleSpecifier");
  }
  edits.push(insertTextEdit(usagePosition, `import(${quoteModuleSpecifier(moduleSpecifier)}).`));
}

function addToExistingImportEdits(
  edits: TextEdit[],
  sourceFile: SourceFile,
  importClauseOrBindingPattern: Node,
  defaultImport: NewImportBinding | undefined,
  namedImports: readonly NewImportBinding[],
): void {
  const declaration = importDeclarationFromNode(importClauseOrBindingPattern);
  if (declaration === undefined) throw new Error("add-to-existing import fix requires an import declaration");

  const text = sourceFile.text.slice(declaration.pos, declaration.end);
  const declarationStart = declaration.pos;
  if (defaultImport !== undefined) {
    const importKeyword = text.indexOf("import");
    if (importKeyword < 0) throw new Error("default import insertion requires an import declaration");
    const afterImport = declarationStart + importKeyword + "import".length;
    edits.push(insertTextEdit(positionAt(sourceFile, afterImport), ` ${defaultImport.name},`));
  }

  if (namedImports.length === 0) return;
  const namedText = namedImports.map(binding => formatNamedImportBinding(binding)).join(", ");
  const openBrace = text.indexOf("{");
  const closeBrace = text.indexOf("}", Math.max(0, openBrace));
  if (openBrace >= 0 && closeBrace >= 0) {
    const existingContent = text.slice(openBrace + 1, closeBrace).trim();
    const insertText = existingContent === "" ? namedText : `, ${namedText}`;
    edits.push(insertTextEdit(positionAt(sourceFile, declarationStart + closeBrace), insertText));
    return;
  }

  const fromIndex = text.indexOf(" from ");
  if (fromIndex < 0) throw new Error("named import insertion requires an import declaration with a module specifier");
  const hasDefault = text.slice("import".length, fromIndex).trim() !== "";
  const insertText = hasDefault ? `, { ${namedText} }` : `{ ${namedText} } `;
  edits.push(insertTextEdit(positionAt(sourceFile, declarationStart + fromIndex), insertText));
}

function getNewImportStatements(
  moduleSpecifier: string,
  importsCollection: ImportsCollection,
  topLevelTypeOnly: boolean,
): readonly string[] {
  const statements: string[] = [];
  const moduleText = quoteModuleSpecifier(moduleSpecifier);
  const namedImports = sortedNamedImports(importsCollection.namedImports);
  const defaultImport = importsCollection.defaultImport;
  const namespaceLikeImport = importsCollection.namespaceLikeImport;

  if (importsCollection.useRequire) {
    if (namespaceLikeImport !== undefined) {
      statements.push(`import ${namespaceLikeImport.name} = require(${moduleText});`);
    }
    if (defaultImport !== undefined) {
      statements.push(`import ${defaultImport.name} = require(${moduleText});`);
    }
    if (namedImports.length > 0) {
      statements.push(`const { ${namedImports.map(formatRequireBinding).join(", ")} } = require(${moduleText});`);
    }
    return statements;
  }

  if (namespaceLikeImport !== undefined) {
    statements.push(`${topLevelTypeOnly ? "import type" : "import"} * as ${namespaceLikeImport.name} from ${moduleText};`);
  }

  const importClauseParts: string[] = [];
  if (defaultImport !== undefined) importClauseParts.push(defaultImport.name);
  if (namedImports.length > 0) importClauseParts.push(`{ ${namedImports.map(binding => formatNamedImportBinding(binding, topLevelTypeOnly)).join(", ")} }`);
  if (importClauseParts.length > 0) {
    statements.push(`${topLevelTypeOnly ? "import type" : "import"} ${importClauseParts.join(", ")} from ${moduleText};`);
  }
  return statements;
}

function insertImportsEdit(sourceFile: SourceFile, statements: readonly string[]): TextEdit {
  const position = getImportInsertionPosition(sourceFile);
  let newText = statements.join("\n") + "\n";
  if (position > 0 && sourceFile.text[position - 1] !== "\n") newText = `\n${newText}`;
  if (position < sourceFile.text.length && sourceFile.text[position] !== "\n") newText += "\n";
  return insertTextEdit(positionAt(sourceFile, position), newText);
}

function resolveExistingImportFix(sourceFile: SourceFile, fix: Fix): readonly [Node, NewImportBinding | undefined, NewImportBinding | undefined] {
  const importLiteral = sourceFile.imports[fix.importIndex];
  if (importLiteral === undefined) throw new Error("add-to-existing import fix import index out of range");
  const declaration = importDeclarationFromNode(importLiteral);
  if (declaration === undefined) throw new Error("add-to-existing import fix could not resolve an import declaration");
  const symbolName = requireFixName(fix);
  const binding: NewImportBinding = {
    kind: fix.importKind,
    propertyName: "",
    name: symbolName,
    addAsTypeOnly: fix.addAsTypeOnly,
  };
  return fix.importKind === ImportKindNamed
    ? [declaration, undefined, binding]
    : [declaration, binding, undefined];
}

function importDeclarationFromNode(node: Node): Node | undefined {
  for (let current: Node | undefined = node; current !== undefined; current = current.parent) {
    switch (current.kind) {
      case Kind.ImportDeclaration:
      case Kind.JSImportDeclaration:
      case Kind.ImportEqualsDeclaration:
      case Kind.VariableDeclaration:
        return current;
      default:
        break;
    }
  }
  return undefined;
}

function getImportInsertionPosition(sourceFile: SourceFile): number {
  let position = sourceFile.statements[0]?.pos ?? 0;
  for (const statement of sourceFile.statements) {
    if (isPrologueDirective(statement) || isImportLikeStatement(statement)) {
      position = statement.end;
      continue;
    }
    break;
  }
  return skipTrailingLineBreak(sourceFile.text, position);
}

function isImportLikeStatement(node: Node): boolean {
  switch (node.kind) {
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ImportEqualsDeclaration:
      return true;
    default:
      return false;
  }
}

function isPrologueDirective(node: Node): boolean {
  if (node.kind !== Kind.ExpressionStatement) return false;
  return nodeProperty<Node>(node, "expression")?.kind === Kind.StringLiteral;
}

function skipTrailingLineBreak(text: string, position: number): number {
  if (text.charCodeAt(position) === 13 && text.charCodeAt(position + 1) === 10) return position + 2;
  if (text.charCodeAt(position) === 10 || text.charCodeAt(position) === 13) return position + 1;
  return position;
}

function formatNamedImportBinding(binding: NewImportBinding, topLevelTypeOnly = false): string {
  const propertyPrefix = binding.propertyName === "" ? "" : `${binding.propertyName} as `;
  const typePrefix = !topLevelTypeOnly && binding.addAsTypeOnly === AddAsTypeOnlyRequired ? "type " : "";
  return `${typePrefix}${propertyPrefix}${binding.name}`;
}

function formatRequireBinding(binding: NewImportBinding): string {
  return binding.propertyName === "" ? binding.name : `${binding.propertyName}: ${binding.name}`;
}

function quoteModuleSpecifier(moduleSpecifier: string): string {
  return JSON.stringify(moduleSpecifier).replace(/^"/u, "'").replace(/"$/u, "'");
}

function insertTextEdit(position: Position, newText: string): TextEdit {
  return { range: { start: position, end: position }, newText };
}

function positionAt(sourceFile: SourceFile, offset: number): Position {
  const text = sourceFile.text;
  let line = 0;
  let lineStart = 0;
  for (let index = 0; index < offset && index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      line += 1;
      lineStart = index + 1;
    }
  }
  return { line, character: Math.max(0, offset - lineStart) };
}

function compareTextEdits(left: TextEdit, right: TextEdit): number {
  if (left.range.start.line !== right.range.start.line) return left.range.start.line - right.range.start.line;
  return left.range.start.character - right.range.start.character;
}

function requireFixName(fix: Fix): string {
  if (fix.name === undefined || fix.name === "") throw new Error("auto-import fix requires a symbol name");
  return fix.name;
}

function requireModuleSpecifier(fix: Fix): string {
  if (fix.moduleSpecifier === undefined || fix.moduleSpecifier === "") {
    throw new Error("new auto-import fix requires a module specifier");
  }
  return fix.moduleSpecifier;
}

function getDefaultLikeExportNameFromDeclaration(symbol: AstSymbol): string {
  for (const declaration of symbol.declarations) {
    const name = nodeProperty<Node>(declaration, "name");
    const text = nodeProperty<string>(name, "text");
    if (text !== undefined && text !== "") return text;
  }
  return "";
}

function nodeProperty<T>(node: Node | undefined, propertyName: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[propertyName];
}

function moduleSymbolToValidIdentifier(name: string, preferCapitalized: boolean): string {
  const words = name.split(/[^A-Za-z0-9_$]+/u).filter((part) => part.length > 0);
  const raw = words.length === 0 ? "module" : words.map(capitalize).join("");
  const identifier = preferCapitalized ? capitalize(raw) : raw.charAt(0).toLowerCase() + raw.slice(1);
  return /^[A-Za-z_$]/u.test(identifier) ? identifier : "_" + identifier;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// Language-service parity map: internal/ls/autoimport/import_adder.go
/**
 * Language-service parity map for TS-Go `ls/autoimport/import_adder.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

export interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

export interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

export const lsAutoimportImportAdderUpstreamPath = "ls/autoimport/import_adder.go";

export const lsAutoimportImportAdderDeclarations: readonly UpstreamDeclaration[] = [
  {"line":24,"kind":"type","name":"ImportAdder"},
  {"line":32,"kind":"type","name":"addToExistingState"},
  {"line":39,"kind":"type","name":"importsCollection"},
  {"line":46,"kind":"func","name":"newImportsKey"},
  {"line":53,"kind":"type","name":"importAdder"},
  {"line":70,"kind":"func","name":"NewImportAdder"},
  {"line":94,"kind":"func","name":"HasFixes","receiver":"adder *importAdder"},
  {"line":102,"kind":"func","name":"AddImportFromExportedSymbol","receiver":"adder *importAdder"},
  {"line":118,"kind":"func","name":"Edits","receiver":"adder *importAdder"},
  {"line":175,"kind":"func","name":"sortedNamedImports"},
  {"line":186,"kind":"func","name":"AddImportFix","receiver":"adder *importAdder"},
  {"line":327,"kind":"func","name":"reduceAddAsTypeOnlyValues"},
  {"line":334,"kind":"func","name":"getNewImportEntry","receiver":"adder *importAdder"},
  {"line":372,"kind":"func","name":"getAllExportsForSymbol","receiver":"adder *importAdder"},
  {"line":381,"kind":"func","name":"TypeToAutoImportableTypeNode"},
  {"line":397,"kind":"func","name":"TypeNodeToAutoImportableTypeNode"},
  {"line":414,"kind":"func","name":"importSymbols"},
  {"line":426,"kind":"func","name":"TryGetAutoImportableReferenceFromTypeNode"},
  {"line":464,"kind":"func","name":"getNameForExportedSymbol"},
  {"line":480,"kind":"func","name":"replaceFirstIdentifierOfEntityName"},
  {"line":490,"kind":"func","name":"getImportFixForSymbol","receiver":"adder *importAdder"},
];

export const lsAutoimportImportAdderSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package autoimport"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"fmt\""},
  {"line":6,"text":"\t\"maps\""},
  {"line":7,"text":"\t\"slices\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/locale\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/change\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/nodebuilder\""},
  {"line":22,"text":")"},
  {"line":24,"text":"type ImportAdder interface {"},
  {"line":25,"text":"\tHasFixes() bool"},
  {"line":26,"text":"\tAddImportFromExportedSymbol(symbol *ast.Symbol, isValidTypeOnlyUseSite bool)"},
  {"line":27,"text":"\tAddImportFix(fix *Fix)"},
  {"line":28,"text":"\tEdits() []*lsproto.TextEdit"},
  {"line":29,"text":"}"},
  {"line":32,"text":"type addToExistingState struct {"},
  {"line":33,"text":"\timportClauseOrBindingPattern *ast.ImportClauseOrBindingPattern"},
  {"line":34,"text":"\tdefaultImport                *newImportBinding"},
  {"line":35,"text":"\tnamedImports                 map[string]*newImportBinding"},
  {"line":36,"text":"}"},
  {"line":39,"text":"type importsCollection struct {"},
  {"line":40,"text":"\tdefaultImport       *newImportBinding"},
  {"line":41,"text":"\tnamedImports        map[string]*newImportBinding"},
  {"line":42,"text":"\tnamespaceLikeImport *newImportBinding"},
  {"line":43,"text":"\tuseRequire          bool"},
  {"line":44,"text":"}"},
  {"line":46,"text":"func newImportsKey(moduleSpecifier string, topLevelTypeOnly bool) string {"},
  {"line":47,"text":"\tif topLevelTypeOnly {"},
  {"line":48,"text":"\t\treturn \"1|\" + moduleSpecifier"},
  {"line":49,"text":"\t}"},
  {"line":50,"text":"\treturn \"0|\" + moduleSpecifier"},
  {"line":51,"text":"}"},
  {"line":53,"text":"type importAdder struct {"},
  {"line":55,"text":"\tctx           context.Context"},
  {"line":56,"text":"\tchecker       *checker.Checker"},
  {"line":57,"text":"\tview          *View"},
  {"line":58,"text":"\tformatOptions lsutil.FormatCodeSettings"},
  {"line":59,"text":"\tconverters    *lsconv.Converters"},
  {"line":60,"text":"\tpreferences   lsutil.UserPreferences"},
  {"line":63,"text":"\taddToNamespace []*Fix                                                    // Namespace fixes don't conflict, so just build a list"},
  {"line":64,"text":"\timportType     []*Fix                                                    // JSDoc type import fixes"},
  {"line":65,"text":"\taddToExisting  map[*ast.ImportClauseOrBindingPattern]*addToExistingState // importClauseOrBindingPattern -> default or named bindings"},
  {"line":66,"text":"\tnewImports     map[string]*importsCollection                             // module specifier + type only -> imports"},
  {"line":68,"text":"}"},
  {"line":70,"text":"func NewImportAdder("},
  {"line":71,"text":"\tctx context.Context,"},
  {"line":72,"text":"\tprogram *compiler.Program,"},
  {"line":73,"text":"\tchecker *checker.Checker,"},
  {"line":74,"text":"\tfile *ast.SourceFile,"},
  {"line":75,"text":"\tview *View,"},
  {"line":76,"text":"\tformatOptions lsutil.FormatCodeSettings,"},
  {"line":77,"text":"\tconverters *lsconv.Converters,"},
  {"line":78,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":79,"text":") ImportAdder {"},
  {"line":80,"text":"\treturn &importAdder{"},
  {"line":81,"text":"\t\tctx:            ctx,"},
  {"line":82,"text":"\t\tchecker:        checker,"},
  {"line":83,"text":"\t\tview:           view,"},
  {"line":84,"text":"\t\tformatOptions:  formatOptions,"},
  {"line":85,"text":"\t\tconverters:     converters,"},
  {"line":86,"text":"\t\tpreferences:    preferences,"},
  {"line":87,"text":"\t\taddToNamespace: nil,"},
  {"line":88,"text":"\t\timportType:     nil,"},
  {"line":89,"text":"\t\taddToExisting:  make(map[*ast.Node]*addToExistingState),"},
  {"line":90,"text":"\t\tnewImports:     make(map[string]*importsCollection),"},
  {"line":91,"text":"\t}"},
  {"line":92,"text":"}"},
  {"line":94,"text":"func (adder *importAdder) HasFixes() bool {"},
  {"line":95,"text":"\treturn len(adder.addToNamespace) > 0 ||"},
  {"line":96,"text":"\t\tlen(adder.importType) > 0 ||"},
  {"line":97,"text":"\t\tlen(adder.addToExisting) > 0 ||"},
  {"line":98,"text":"\t\tlen(adder.newImports) > 0"},
  {"line":99,"text":"}"},
  {"line":102,"text":"func (adder *importAdder) AddImportFromExportedSymbol(exportedSymbol *ast.Symbol, isValidTypeOnlyUseSite bool) {"},
  {"line":103,"text":"\tsymbol := adder.checker.GetMergedSymbol(adder.checker.SkipAlias(exportedSymbol))"},
  {"line":104,"text":"\texportInfos := adder.getAllExportsForSymbol(symbol)"},
  {"line":105,"text":"\tif len(exportInfos) == 0 {"},
  {"line":109,"text":"\t\treturn"},
  {"line":110,"text":"\t}"},
  {"line":111,"text":"\tfix := adder.getImportFixForSymbol(adder.view, adder.view.importingFile, exportInfos, isValidTypeOnlyUseSite)"},
  {"line":112,"text":"\tif fix != nil {"},
  {"line":114,"text":"\t\tadder.AddImportFix(fix)"},
  {"line":115,"text":"\t}"},
  {"line":116,"text":"}"},
  {"line":118,"text":"func (adder *importAdder) Edits() []*lsproto.TextEdit {"},
  {"line":120,"text":"\ttracker := change.NewTracker(adder.ctx, adder.view.program.Options(), adder.formatOptions, adder.converters)"},
  {"line":121,"text":"\tquotePreference := lsutil.GetQuotePreference(adder.view.importingFile, adder.preferences)"},
  {"line":122,"text":"\tfor _, fix := range adder.addToNamespace {"},
  {"line":123,"text":"\t\taddNamespaceQualifier(fix, tracker, adder.view.importingFile, locale.Default)"},
  {"line":124,"text":"\t}"},
  {"line":125,"text":"\tfor _, fix := range adder.importType {"},
  {"line":126,"text":"\t\taddImportType(fix, adder.view.importingFile, adder.preferences, tracker, locale.Default)"},
  {"line":127,"text":"\t}"},
  {"line":128,"text":"\tfor clauseOrPattern, entry := range adder.addToExisting {"},
  {"line":129,"text":"\t\taddToExistingImport("},
  {"line":130,"text":"\t\t\ttracker,"},
  {"line":131,"text":"\t\t\tadder.view.importingFile,"},
  {"line":132,"text":"\t\t\tclauseOrPattern,"},
  {"line":133,"text":"\t\t\tentry.defaultImport,"},
  {"line":134,"text":"\t\t\tsortedNamedImports(entry.namedImports),"},
  {"line":135,"text":"\t\t\tadder.preferences,"},
  {"line":136,"text":"\t\t)"},
  {"line":137,"text":"\t}"},
  {"line":139,"text":"\tvar newDeclarations []*ast.AnyImportOrRequireStatement"},
  {"line":140,"text":"\tfor key, newImport := range adder.newImports {"},
  {"line":141,"text":"\t\tmoduleSpecifier := key[2:] // From `${0 | 1}|${moduleSpecifier}` format"},
  {"line":142,"text":"\t\tvar declarations []*ast.AnyImportOrRequireStatement"},
  {"line":143,"text":"\t\tif newImport.useRequire {"},
  {"line":144,"text":"\t\t\tdeclarations = getNewRequires("},
  {"line":145,"text":"\t\t\t\ttracker,"},
  {"line":146,"text":"\t\t\t\tmoduleSpecifier,"},
  {"line":147,"text":"\t\t\t\tquotePreference,"},
  {"line":148,"text":"\t\t\t\tnewImport.defaultImport,"},
  {"line":149,"text":"\t\t\t\tsortedNamedImports(newImport.namedImports),"},
  {"line":150,"text":"\t\t\t\tnewImport.namespaceLikeImport,"},
  {"line":151,"text":"\t\t\t\tadder.view.program.Options(),"},
  {"line":152,"text":"\t\t\t)"},
  {"line":153,"text":"\t\t} else {"},
  {"line":154,"text":"\t\t\tdeclarations = getNewImports("},
  {"line":155,"text":"\t\t\t\ttracker,"},
  {"line":156,"text":"\t\t\t\tmoduleSpecifier,"},
  {"line":157,"text":"\t\t\t\tquotePreference,"},
  {"line":158,"text":"\t\t\t\tnewImport.defaultImport,"},
  {"line":159,"text":"\t\t\t\tsortedNamedImports(newImport.namedImports),"},
  {"line":160,"text":"\t\t\t\tnewImport.namespaceLikeImport,"},
  {"line":161,"text":"\t\t\t\tadder.view.program.Options(),"},
  {"line":162,"text":"\t\t\t\tadder.preferences,"},
  {"line":163,"text":"\t\t\t)"},
  {"line":164,"text":"\t\t}"},
  {"line":165,"text":"\t\tnewDeclarations = append(newDeclarations, declarations...)"},
  {"line":166,"text":"\t}"},
  {"line":168,"text":"\tif len(newDeclarations) > 0 {"},
  {"line":169,"text":"\t\tinsertImports(tracker, adder.view.importingFile, newDeclarations, true /*blankLineBetween*/, adder.preferences)"},
  {"line":170,"text":"\t}"},
  {"line":172,"text":"\treturn tracker.GetChanges()[adder.view.importingFile.FileName()]"},
  {"line":173,"text":"}"},
  {"line":175,"text":"func sortedNamedImports(m map[string]*newImportBinding) []*newImportBinding {"},
  {"line":176,"text":"\tkeys := slices.Sorted(maps.Keys(m))"},
  {"line":177,"text":"\tresult := make([]*newImportBinding, 0, len(keys))"},
  {"line":178,"text":"\tfor _, k := range keys {"},
  {"line":179,"text":"\t\tresult = append(result, m[k])"},
  {"line":180,"text":"\t}"},
  {"line":181,"text":"\treturn result"},
  {"line":182,"text":"}"},
  {"line":186,"text":"func (adder *importAdder) AddImportFix(fix *Fix) {"},
  {"line":187,"text":"\tsymbolName := fix.Name"},
  {"line":188,"text":"\tcompilerOptions := adder.view.program.Options()"},
  {"line":190,"text":"\tswitch fix.Kind {"},
  {"line":191,"text":"\tcase lsproto.AutoImportFixKindUseNamespace:"},
  {"line":192,"text":"\t\tadder.addToNamespace = append(adder.addToNamespace, fix)"},
  {"line":193,"text":"\tcase lsproto.AutoImportFixKindJsdocTypeImport:"},
  {"line":194,"text":"\t\tadder.importType = append(adder.importType, fix)"},
  {"line":195,"text":"\tcase lsproto.AutoImportFixKindAddToExisting:"},
  {"line":196,"text":"\t\texistingFix := getAddToExistingImportFix(adder.view.importingFile, fix)"},
  {"line":197,"text":"\t\tentry := adder.addToExisting[existingFix.importClauseOrBindingPattern]"},
  {"line":198,"text":"\t\tif entry == nil {"},
  {"line":199,"text":"\t\t\tentry = &addToExistingState{"},
  {"line":200,"text":"\t\t\t\timportClauseOrBindingPattern: existingFix.importClauseOrBindingPattern,"},
  {"line":201,"text":"\t\t\t\tnamedImports:                 make(map[string]*newImportBinding),"},
  {"line":202,"text":"\t\t\t}"},
  {"line":203,"text":"\t\t\tadder.addToExisting[existingFix.importClauseOrBindingPattern] = entry"},
  {"line":204,"text":"\t\t}"},
  {"line":206,"text":"\t\tif fix.ImportKind == lsproto.ImportKindNamed {"},
  {"line":207,"text":"\t\t\tprevImport := entry.namedImports[symbolName]"},
  {"line":208,"text":"\t\t\tvar prevTypeOnly lsproto.AddAsTypeOnly"},
  {"line":209,"text":"\t\t\tif prevImport != nil {"},
  {"line":210,"text":"\t\t\t\tprevTypeOnly = prevImport.addAsTypeOnly"},
  {"line":211,"text":"\t\t\t}"},
  {"line":212,"text":"\t\t\tentry.namedImports[symbolName] = &newImportBinding{"},
  {"line":213,"text":"\t\t\t\tkind:          lsproto.ImportKindNamed,"},
  {"line":214,"text":"\t\t\t\tname:          symbolName,"},
  {"line":215,"text":"\t\t\t\taddAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),"},
  {"line":216,"text":"\t\t\t\tpropertyName:  existingFix.namedImport.propertyName,"},
  {"line":217,"text":"\t\t\t}"},
  {"line":218,"text":"\t\t} else {"},
  {"line":220,"text":"\t\t\tdebug.Assert("},
  {"line":221,"text":"\t\t\t\tentry.defaultImport == nil || entry.defaultImport.name == symbolName,"},
  {"line":222,"text":"\t\t\t\t\"(Add to Existing) Default import should be missing or match symbolName\","},
  {"line":223,"text":"\t\t\t)"},
  {"line":224,"text":"\t\t\tvar prevTypeOnly lsproto.AddAsTypeOnly"},
  {"line":225,"text":"\t\t\tif entry.defaultImport != nil {"},
  {"line":226,"text":"\t\t\t\tprevTypeOnly = entry.defaultImport.addAsTypeOnly"},
  {"line":227,"text":"\t\t\t}"},
  {"line":228,"text":"\t\t\tentry.defaultImport = &newImportBinding{"},
  {"line":229,"text":"\t\t\t\tkind:          lsproto.ImportKindDefault,"},
  {"line":230,"text":"\t\t\t\tname:          symbolName,"},
  {"line":231,"text":"\t\t\t\taddAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),"},
  {"line":232,"text":"\t\t\t}"},
  {"line":233,"text":"\t\t}"},
  {"line":235,"text":"\tcase lsproto.AutoImportFixKindAddNew:"},
  {"line":236,"text":"\t\tentry := adder.getNewImportEntry(fix.ModuleSpecifier, fix.ImportKind, fix.UseRequire, fix.AddAsTypeOnly)"},
  {"line":237,"text":"\t\tdebug.Assert("},
  {"line":238,"text":"\t\t\tentry.useRequire == fix.UseRequire,"},
  {"line":239,"text":"\t\t\t\"(Add new) Tried to add an `import` and a `require` for the same module\","},
  {"line":240,"text":"\t\t)"},
  {"line":242,"text":"\t\tswitch fix.ImportKind {"},
  {"line":243,"text":"\t\tcase lsproto.ImportKindDefault:"},
  {"line":244,"text":"\t\t\tdebug.Assert("},
  {"line":245,"text":"\t\t\t\tentry.defaultImport == nil || entry.defaultImport.name == symbolName,"},
  {"line":246,"text":"\t\t\t\t\"(Add new) Default import should be missing or match symbolName\","},
  {"line":247,"text":"\t\t\t)"},
  {"line":248,"text":"\t\t\tvar prevTypeOnly lsproto.AddAsTypeOnly"},
  {"line":249,"text":"\t\t\tif entry.defaultImport != nil {"},
  {"line":250,"text":"\t\t\t\tprevTypeOnly = entry.defaultImport.addAsTypeOnly"},
  {"line":251,"text":"\t\t\t}"},
  {"line":252,"text":"\t\t\tentry.defaultImport = &newImportBinding{"},
  {"line":253,"text":"\t\t\t\tkind:          lsproto.ImportKindDefault,"},
  {"line":254,"text":"\t\t\t\tname:          symbolName,"},
  {"line":255,"text":"\t\t\t\taddAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),"},
  {"line":256,"text":"\t\t\t}"},
  {"line":258,"text":"\t\tcase lsproto.ImportKindNamed:"},
  {"line":259,"text":"\t\t\tif entry.namedImports == nil {"},
  {"line":260,"text":"\t\t\t\tentry.namedImports = make(map[string]*newImportBinding)"},
  {"line":261,"text":"\t\t\t}"},
  {"line":262,"text":"\t\t\tprevImport := entry.namedImports[symbolName]"},
  {"line":263,"text":"\t\t\tvar prevTypeOnly lsproto.AddAsTypeOnly"},
  {"line":264,"text":"\t\t\tif prevImport != nil {"},
  {"line":265,"text":"\t\t\t\tprevTypeOnly = prevImport.addAsTypeOnly"},
  {"line":266,"text":"\t\t\t}"},
  {"line":267,"text":"\t\t\tentry.namedImports[symbolName] = &newImportBinding{"},
  {"line":268,"text":"\t\t\t\tkind:          lsproto.ImportKindNamed,"},
  {"line":269,"text":"\t\t\t\tname:          symbolName,"},
  {"line":270,"text":"\t\t\t\taddAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),"},
  {"line":272,"text":"\t\t\t}"},
  {"line":274,"text":"\t\tcase lsproto.ImportKindCommonJS:"},
  {"line":275,"text":"\t\t\tif compilerOptions.VerbatimModuleSyntax == core.TSTrue {"},
  {"line":276,"text":"\t\t\t\tif entry.namedImports == nil {"},
  {"line":277,"text":"\t\t\t\t\tentry.namedImports = make(map[string]*newImportBinding)"},
  {"line":278,"text":"\t\t\t\t}"},
  {"line":279,"text":"\t\t\t\tprevImport := entry.namedImports[symbolName]"},
  {"line":280,"text":"\t\t\t\tvar prevTypeOnly lsproto.AddAsTypeOnly"},
  {"line":281,"text":"\t\t\t\tif prevImport != nil {"},
  {"line":282,"text":"\t\t\t\t\tprevTypeOnly = prevImport.addAsTypeOnly"},
  {"line":283,"text":"\t\t\t\t}"},
  {"line":284,"text":"\t\t\t\tentry.namedImports[symbolName] = &newImportBinding{"},
  {"line":285,"text":"\t\t\t\t\tkind:          lsproto.ImportKindCommonJS,"},
  {"line":286,"text":"\t\t\t\t\tname:          symbolName,"},
  {"line":287,"text":"\t\t\t\t\taddAsTypeOnly: reduceAddAsTypeOnlyValues(prevTypeOnly, fix.AddAsTypeOnly),"},
  {"line":289,"text":"\t\t\t\t}"},
  {"line":290,"text":"\t\t\t} else {"},
  {"line":291,"text":"\t\t\t\tdebug.Assert("},
  {"line":292,"text":"\t\t\t\t\tentry.namespaceLikeImport == nil || entry.namespaceLikeImport.name == symbolName,"},
  {"line":293,"text":"\t\t\t\t\t\"Namespacelike import should be missing or match symbolName\","},
  {"line":294,"text":"\t\t\t\t)"},
  {"line":295,"text":"\t\t\t\tentry.namespaceLikeImport = &newImportBinding{"},
  {"line":296,"text":"\t\t\t\t\tkind:          lsproto.ImportKindCommonJS,"},
  {"line":297,"text":"\t\t\t\t\tname:          symbolName,"},
  {"line":298,"text":"\t\t\t\t\taddAsTypeOnly: fix.AddAsTypeOnly,"},
  {"line":299,"text":"\t\t\t\t}"},
  {"line":300,"text":"\t\t\t}"},
  {"line":302,"text":"\t\tcase lsproto.ImportKindNamespace:"},
  {"line":303,"text":"\t\t\tdebug.Assert("},
  {"line":304,"text":"\t\t\t\tentry.namespaceLikeImport == nil || entry.namespaceLikeImport.name == symbolName,"},
  {"line":305,"text":"\t\t\t\t\"Namespacelike import should be missing or match symbolName\","},
  {"line":306,"text":"\t\t\t)"},
  {"line":307,"text":"\t\t\tentry.namespaceLikeImport = &newImportBinding{"},
  {"line":308,"text":"\t\t\t\tkind:          lsproto.ImportKindNamespace,"},
  {"line":309,"text":"\t\t\t\tname:          symbolName,"},
  {"line":310,"text":"\t\t\t\taddAsTypeOnly: fix.AddAsTypeOnly,"},
  {"line":311,"text":"\t\t\t}"},
  {"line":312,"text":"\t\t}"},
  {"line":314,"text":"\tcase lsproto.AutoImportFixKindPromoteTypeOnly:"},
  {"line":316,"text":"\tdefault:"},
  {"line":317,"text":"\t\tdebug.Fail(fmt.Sprintf(\"Unexpected fix kind: %v\", fix.Kind))"},
  {"line":318,"text":"\t}"},
  {"line":319,"text":"}"},
  {"line":327,"text":"func reduceAddAsTypeOnlyValues(prevValue, newValue lsproto.AddAsTypeOnly) lsproto.AddAsTypeOnly {"},
  {"line":328,"text":"\tif newValue > prevValue {"},
  {"line":329,"text":"\t\treturn newValue"},
  {"line":330,"text":"\t}"},
  {"line":331,"text":"\treturn prevValue"},
  {"line":332,"text":"}"},
  {"line":334,"text":"func (adder *importAdder) getNewImportEntry(moduleSpecifier string, importKind lsproto.ImportKind, useRequire bool, addAsTypeOnly lsproto.AddAsTypeOnly) *importsCollection {"},
  {"line":341,"text":"\ttypeOnlyKey := newImportsKey(moduleSpecifier, true /*topLevelTypeOnly*/)"},
  {"line":342,"text":"\tnonTypeOnlyKey := newImportsKey(moduleSpecifier, false /*topLevelTypeOnly*/)"},
  {"line":343,"text":"\ttypeOnlyEntry := adder.newImports[typeOnlyKey]"},
  {"line":344,"text":"\tnonTypeOnlyEntry := adder.newImports[nonTypeOnlyKey]"},
  {"line":345,"text":"\tnewEntry := &importsCollection{"},
  {"line":346,"text":"\t\tuseRequire: useRequire,"},
  {"line":347,"text":"\t}"},
  {"line":349,"text":"\tif importKind == lsproto.ImportKindDefault && addAsTypeOnly == lsproto.AddAsTypeOnlyRequired {"},
  {"line":350,"text":"\t\tif typeOnlyEntry != nil {"},
  {"line":351,"text":"\t\t\treturn typeOnlyEntry"},
  {"line":352,"text":"\t\t}"},
  {"line":353,"text":"\t\tadder.newImports[typeOnlyKey] = newEntry"},
  {"line":354,"text":"\t\treturn newEntry"},
  {"line":355,"text":"\t}"},
  {"line":357,"text":"\tif addAsTypeOnly == lsproto.AddAsTypeOnlyAllowed && (typeOnlyEntry != nil || nonTypeOnlyEntry != nil) {"},
  {"line":358,"text":"\t\tif typeOnlyEntry != nil {"},
  {"line":359,"text":"\t\t\treturn typeOnlyEntry"},
  {"line":360,"text":"\t\t}"},
  {"line":361,"text":"\t\treturn nonTypeOnlyEntry"},
  {"line":362,"text":"\t}"},
  {"line":364,"text":"\tif nonTypeOnlyEntry != nil {"},
  {"line":365,"text":"\t\treturn nonTypeOnlyEntry"},
  {"line":366,"text":"\t}"},
  {"line":368,"text":"\tadder.newImports[nonTypeOnlyKey] = newEntry"},
  {"line":369,"text":"\treturn newEntry"},
  {"line":370,"text":"}"},
  {"line":372,"text":"func (adder *importAdder) getAllExportsForSymbol("},
  {"line":373,"text":"\tsymbol *ast.Symbol,"},
  {"line":374,"text":") []*Export {"},
  {"line":375,"text":"\tif export := SymbolToExport(symbol, adder.checker); export != nil {"},
  {"line":376,"text":"\t\treturn adder.view.SearchByExportID(export.ExportID)"},
  {"line":377,"text":"\t}"},
  {"line":378,"text":"\treturn nil"},
  {"line":379,"text":"}"},
  {"line":381,"text":"func TypeToAutoImportableTypeNode("},
  {"line":382,"text":"\tc *checker.Checker,"},
  {"line":383,"text":"\timportAdder ImportAdder,"},
  {"line":384,"text":"\tt *checker.Type,"},
  {"line":385,"text":"\tcontextNode *ast.Node, // !!! flags"},
  {"line":386,"text":") *ast.TypeNode {"},
  {"line":387,"text":"\tidToSymbol := make(map[*ast.IdentifierNode]*ast.Symbol)"},
  {"line":388,"text":"\ttypeNode := c.TypeToTypeNode(t, contextNode, nodebuilder.FlagsNone, idToSymbol)"},
  {"line":389,"text":"\tif typeNode == nil {"},
  {"line":390,"text":"\t\treturn nil"},
  {"line":391,"text":"\t}"},
  {"line":392,"text":"\treturn TypeNodeToAutoImportableTypeNode(typeNode, importAdder, idToSymbol)"},
  {"line":393,"text":"}"},
  {"line":397,"text":"func TypeNodeToAutoImportableTypeNode("},
  {"line":398,"text":"\ttypeNode *ast.TypeNode,"},
  {"line":399,"text":"\timportAdder ImportAdder,"},
  {"line":400,"text":"\tidToSymbol map[*ast.IdentifierNode]*ast.Symbol,"},
  {"line":401,"text":") *ast.TypeNode {"},
  {"line":402,"text":"\treferenceTypeNode, importableSymbols := TryGetAutoImportableReferenceFromTypeNode(typeNode, idToSymbol)"},
  {"line":403,"text":"\tif referenceTypeNode != nil {"},
  {"line":404,"text":"\t\tif importAdder != nil {"},
  {"line":405,"text":"\t\t\timportSymbols(importAdder, importableSymbols)"},
  {"line":406,"text":"\t\t}"},
  {"line":407,"text":"\t\ttypeNode = referenceTypeNode"},
  {"line":408,"text":"\t}"},
  {"line":411,"text":"\treturn typeNode"},
  {"line":412,"text":"}"},
  {"line":414,"text":"func importSymbols(importAdder ImportAdder, symbols []*ast.Symbol) {"},
  {"line":415,"text":"\tfor _, symbol := range symbols {"},
  {"line":416,"text":"\t\timportAdder.AddImportFromExportedSymbol(symbol, true /*isValidTypeOnlyUseSite*/)"},
  {"line":417,"text":"\t}"},
  {"line":418,"text":"}"},
  {"line":426,"text":"func TryGetAutoImportableReferenceFromTypeNode(importTypeNode *ast.TypeNode, idToSymbol map[*ast.IdentifierNode]*ast.Symbol) (*ast.TypeNode, []*ast.Symbol) {"},
  {"line":427,"text":"\tvar symbols []*ast.Symbol"},
  {"line":428,"text":"\tvar visitor *ast.NodeVisitor"},
  {"line":429,"text":"\tfactory := ast.NewNodeFactory(ast.NodeFactoryHooks{})"},
  {"line":430,"text":"\tvisit := func(node *ast.Node) *ast.Node {"},
  {"line":431,"text":"\t\tif ast.IsLiteralImportTypeNode(node) && node.AsImportTypeNode().Qualifier != nil {"},
  {"line":432,"text":"\t\t\timportTypeNode := node.AsImportTypeNode()"},
  {"line":434,"text":"\t\t\tfirstIdentifier := ast.GetFirstIdentifier(importTypeNode.Qualifier)"},
  {"line":435,"text":"\t\t\tsymbol := idToSymbol[firstIdentifier]"},
  {"line":436,"text":"\t\t\tif symbol == nil {"},
  {"line":440,"text":"\t\t\t\treturn node.VisitEachChild(visitor)"},
  {"line":441,"text":"\t\t\t}"},
  {"line":442,"text":"\t\t\tname := getNameForExportedSymbol(symbol, false /*preferCapitalized*/)"},
  {"line":443,"text":"\t\t\tvar qualifier *ast.EntityName"},
  {"line":444,"text":"\t\t\tif name != firstIdentifier.Text() {"},
  {"line":445,"text":"\t\t\t\tqualifier = replaceFirstIdentifierOfEntityName(factory, importTypeNode.Qualifier, factory.NewIdentifier(name))"},
  {"line":446,"text":"\t\t\t} else {"},
  {"line":447,"text":"\t\t\t\tqualifier = importTypeNode.Qualifier"},
  {"line":448,"text":"\t\t\t}"},
  {"line":449,"text":"\t\t\tsymbols = append(symbols, symbol)"},
  {"line":450,"text":"\t\t\ttypeArguments := visitor.VisitNodes(importTypeNode.TypeArguments)"},
  {"line":451,"text":"\t\t\treturn factory.NewTypeReferenceNode(qualifier, typeArguments)"},
  {"line":452,"text":"\t\t}"},
  {"line":453,"text":"\t\treturn visitor.VisitEachChild(node)"},
  {"line":454,"text":"\t}"},
  {"line":455,"text":"\tvisitor = ast.NewNodeVisitor(visit, factory, ast.NodeVisitorHooks{})"},
  {"line":457,"text":"\ttypeNode := visitor.VisitNode(importTypeNode)"},
  {"line":458,"text":"\tdebug.Assert(typeNode == nil || ast.IsTypeNode(typeNode), \"expected a type node\")"},
  {"line":459,"text":"\treturn typeNode, symbols"},
  {"line":460,"text":"}"},
  {"line":464,"text":"func getNameForExportedSymbol(symbol *ast.Symbol, preferCapitalized bool) string {"},
  {"line":465,"text":"\tif symbol.Name == ast.InternalSymbolNameExportEquals || symbol.Name == ast.InternalSymbolNameDefault {"},
  {"line":470,"text":"\t\tname := getDefaultLikeExportNameFromDeclaration(symbol)"},
  {"line":471,"text":"\t\tif name != \"\" {"},
  {"line":472,"text":"\t\t\treturn name"},
  {"line":473,"text":"\t\t}"},
  {"line":474,"text":"\t\tdebug.Assert(symbol.Parent != nil, \"Expected exported symbol to have module symbol as parent\")"},
  {"line":475,"text":"\t\treturn lsutil.ModuleSymbolToValidIdentifier(symbol.Parent, preferCapitalized)"},
  {"line":476,"text":"\t}"},
  {"line":477,"text":"\treturn symbol.Name"},
  {"line":478,"text":"}"},
  {"line":480,"text":"func replaceFirstIdentifierOfEntityName(factory *ast.NodeFactory, name *ast.EntityName, newIdentifier *ast.IdentifierNode) *ast.EntityName {"},
  {"line":481,"text":"\tif name.Kind == ast.KindIdentifier {"},
  {"line":482,"text":"\t\treturn newIdentifier"},
  {"line":483,"text":"\t}"},
  {"line":484,"text":"\treturn factory.NewQualifiedName("},
  {"line":485,"text":"\t\treplaceFirstIdentifierOfEntityName(factory, name.AsQualifiedName().Left, newIdentifier),"},
  {"line":486,"text":"\t\tname.AsQualifiedName().Right,"},
  {"line":487,"text":"\t)"},
  {"line":488,"text":"}"},
  {"line":490,"text":"func (adder *importAdder) getImportFixForSymbol(view *View, file *ast.SourceFile, exports []*Export, isValidTypeOnlyUseSite bool) *Fix {"},
  {"line":491,"text":"\tfixes := core.FlatMap(exports, func(export *Export) []*Fix {"},
  {"line":492,"text":"\t\treturn view.GetFixes(adder.ctx, export, false /*forJSX*/, isValidTypeOnlyUseSite, nil /*usagePosition*/)"},
  {"line":493,"text":"\t})"},
  {"line":494,"text":"\tslices.SortFunc(fixes, func(a, b *Fix) int {"},
  {"line":495,"text":"\t\treturn view.CompareFixesForRanking(a, b)"},
  {"line":496,"text":"\t})"},
  {"line":497,"text":"\tif len(fixes) > 0 {"},
  {"line":498,"text":"\t\treturn fixes[0]"},
  {"line":499,"text":"\t}"},
  {"line":500,"text":"\treturn nil"},
  {"line":501,"text":"}"},
];

export function findLsAutoimportImportAdderDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsAutoimportImportAdderDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsAutoimportImportAdderDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsAutoimportImportAdderDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsAutoimportImportAdderLineText(line: number): string | undefined {
  return lsAutoimportImportAdderSourceLines.find((entry) => entry.line === line)?.text;
}
