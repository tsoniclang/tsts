import { Kind, SymbolFlags, type Node } from "../../ast/index.js";
import {
  ModuleDetectionKind,
  ModuleKind,
  getEmitModuleDetectionKind,
  getEmitModuleKind,
  tristateIsTrue as coreTristateIsTrue,
  type CompilerOptions as CoreCompilerOptions,
} from "../../core/index.js";
import {
  compareNumberOfDirectorySeparators,
  getDirectoryPath,
} from "../../tspath/index.js";
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
  type AutoImportFix,
  type AutoImportFixKind,
  type ImportKind,
  type Position,
} from "../../lsp/lsproto/index.js";
import {
  ImportModuleSpecifierPreference,
  ResultKind,
  type ResultKind as ResultKindValue,
  type SourceFileForSpecifierGeneration,
  type UserPreferences as ModuleSpecifierUserPreferences,
} from "../../modulespecifiers/index.js";
import {
  ExportSyntaxCommonJSExportsProperty,
  ExportSyntaxCommonJSModuleExports,
  ExportSyntaxDefaultDeclaration,
  ExportSyntaxDefaultModifier,
  ExportSyntaxEquals,
  ExportSyntaxModifier,
  ExportSyntaxNamed,
  ExportSyntaxStar,
  ExportSyntaxUMD,
  exportIsRenameable,
  exportIsUnresolvedAlias,
  exportName,
  internalSymbolNameDefault,
  internalSymbolNameExportEquals,
  type ExportEntry,
} from "./export.js";
import { getModuleSpecifier } from "./specifiers.js";
import type { AutoImportFixProvider, View } from "./view.js";

export interface NewImportBinding {
  readonly kind: ImportKind;
  readonly propertyName: string;
  readonly name: string;
  readonly addAsTypeOnly: AddAsTypeOnly;
}

export interface Fix extends AutoImportFix {
  readonly kind: AutoImportFixKind;
  readonly moduleSpecifierKind: ResultKindValue;
  readonly isReExport: boolean;
  readonly moduleFileName: string;
  readonly typeOnlyAliasDeclaration?: Node;
}

export interface AddToExistingImportFix {
  readonly importClauseOrBindingPattern: Node;
  readonly defaultImport?: NewImportBinding;
  readonly namedImport?: NewImportBinding;
}

export interface TypeOnlyAutoImportPreferences {
  readonly preferTypeOnlyAutoImports?: boolean | "auto" | "on" | "off";
}

export interface AutoImportRankingView {
  readonly preferences: ModuleSpecifierUserPreferences;
  readonly importingFile: SourceFileForSpecifierGeneration;
  readonly shouldUseUriStyleNodeCoreModules?: boolean | "auto" | "on" | "off";
}

export interface AutoImportFixProgramWithModuleMode {
  options(): unknown;
  getEmitModuleFormatOfFile?(file: SourceFileForSpecifierGeneration): number;
  getImpliedNodeFormatForEmit?(file: SourceFileForSpecifierGeneration): number;
  getSourceFiles?(): readonly SourceFileForSpecifierGeneration[];
  isSourceFileFromExternalLibrary?(file: SourceFileForSpecifierGeneration): boolean;
}

export const autoImportFixProvider: AutoImportFixProvider = {
  getFixes(view, exportEntry, forJsx, isValidTypeOnlyUseSite, usagePosition) {
    return getFixes(view, exportEntry, forJsx, isValidTypeOnlyUseSite, usagePosition);
  },
  compareFixesForRanking(view, left, right) {
    return compareFixesForRanking(view, requireComparableFix(left), requireComparableFix(right));
  },
  compareFixesForSorting(view, left, right) {
    return compareFixesForSorting(view, requireComparableFix(left), requireComparableFix(right));
  },
};

export function getFixes(
  view: View,
  exportEntry: ExportEntry,
  forJsx: boolean,
  isValidTypeOnlyUseSite: boolean,
  usagePosition: Position | undefined,
): readonly Fix[] {
  const fixes: Fix[] = [];
  const [moduleSpecifier, moduleSpecifierKind] = getModuleSpecifier(view, exportEntry, view.preferences);

  const namespaceFix = tryUseExistingNamespaceImport(view, exportEntry, moduleSpecifier, moduleSpecifierKind, usagePosition);
  if (namespaceFix !== undefined) fixes.push(namespaceFix);

  if (moduleSpecifier === "") return fixes;

  const importedSymbolHasValueMeaning = (exportEntry.flags & SymbolFlags.Value) !== 0 || exportIsUnresolvedAlias(exportEntry);
  if (!importedSymbolHasValueMeaning && view.importingFile.isJS() && usagePosition !== undefined) {
    return [{
      kind: AutoImportFixKindJsdocTypeImport,
      importKind: ImportKindNamed,
      importIndex: 0,
      addAsTypeOnly: AddAsTypeOnlyAllowed,
      moduleSpecifier,
      name: exportName(exportEntry),
      usagePosition,
      moduleSpecifierKind,
      isReExport: !sameExportID(exportEntry.target, exportEntry),
      moduleFileName: exportEntry.moduleFileName,
    }];
  }

  const importKind = getImportKind(view.importingFile, exportEntry, view.program as AutoImportFixProgramWithModuleMode);
  const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, exportEntry, view.program.options());

  let name = exportName(exportEntry);
  if (forJsx && !startsWithUppercase(name)) {
    if (!exportIsRenameable(exportEntry)) return fixes;
    name = name.charAt(0).toLocaleUpperCase() + name.slice(1);
  }

  fixes.push({
    kind: AutoImportFixKindAddNew,
    importKind,
    importIndex: 0,
    addAsTypeOnly,
    moduleSpecifier,
    name,
    useRequire: shouldUseRequire(view),
    moduleSpecifierKind,
    isReExport: !sameExportID(exportEntry.target, exportEntry),
    moduleFileName: exportEntry.moduleFileName,
  });
  return fixes;
}

export function getAddAsTypeOnly(
  isValidTypeOnlyUseSite: boolean,
  exportEntry: ExportEntry,
  compilerOptions: unknown,
): AddAsTypeOnly {
  if (!isValidTypeOnlyUseSite) return AddAsTypeOnlyNotAllowed;
  const options = compilerOptions as CoreCompilerOptions;
  const exportHasValue = (exportEntry.flags & SymbolFlags.Value) !== 0;
  if (
    coreTristateIsTrue(options.verbatimModuleSyntax) && (exportEntry.isTypeOnly || !exportHasValue)
    || exportEntry.isTypeOnly && exportHasValue
  ) {
    return AddAsTypeOnlyRequired;
  }
  return AddAsTypeOnlyAllowed;
}

export function getImportKind(
  importingFile: SourceFileForSpecifierGeneration,
  exportEntry: ExportEntry,
  program: AutoImportFixProgramWithModuleMode,
): ImportKind {
  const options = program.options() as CoreCompilerOptions;
  if (
    coreTristateIsTrue(options.verbatimModuleSyntax)
    && getEmitModuleFormatOfFile(program, importingFile, options) === ModuleKind.CommonJS
  ) {
    return ImportKindCommonJS;
  }

  switch (exportEntry.syntax) {
    case ExportSyntaxDefaultModifier:
    case ExportSyntaxDefaultDeclaration:
      return ImportKindDefault;
    case ExportSyntaxNamed:
      return exportEntry.exportName === internalSymbolNameDefault ? ImportKindDefault : ImportKindNamed;
    case ExportSyntaxModifier:
    case ExportSyntaxStar:
    case ExportSyntaxCommonJSExportsProperty:
      return ImportKindNamed;
    case ExportSyntaxEquals:
    case ExportSyntaxCommonJSModuleExports:
    case ExportSyntaxUMD:
      if (exportEntry.exportName !== internalSymbolNameExportEquals) return ImportKindNamed;
      if (hasImportEqualsDeclaration(importingFile)) return ImportKindCommonJS;
      if (hasExternalModuleIndicator(importingFile) || !importingFile.isJS()) return ImportKindDefault;
      return ImportKindCommonJS;
    default:
      throw new Error(`unhandled export syntax kind: ${String(exportEntry.syntax)}`);
  }
}

export function shouldUseRequire(view: View): boolean {
  const importingFile = view.importingFile;
  if (!importingFile.isJS()) return false;

  const program = view.program as AutoImportFixProgramWithModuleMode;
  const options = program.options() as CoreCompilerOptions;
  switch (detectSyntax(importingFile, options)) {
    case FileSyntaxKind.CJS:
      return true;
    case FileSyntaxKind.ESM:
      return false;
  }

  const implied = program.getImpliedNodeFormatForEmit?.(importingFile);
  if (implied === ModuleKind.CommonJS) return true;
  if (implied === ModuleKind.ESNext) return false;

  if (options.configFilePath !== undefined && options.configFilePath !== "") {
    return getEmitModuleKind(options) < ModuleKind.ES2015;
  }

  for (const otherFile of program.getSourceFiles?.() ?? []) {
    if (
      otherFile === importingFile
      || !otherFile.isJS()
      || program.isSourceFileFromExternalLibrary?.(otherFile) === true
    ) {
      continue;
    }
    switch (detectSyntax(otherFile, options)) {
      case FileSyntaxKind.CJS:
        return true;
      case FileSyntaxKind.ESM:
        return false;
    }
  }

  return true;
}

export function needsTypeOnly(addAsTypeOnly: AddAsTypeOnly): boolean {
  return addAsTypeOnly === AddAsTypeOnlyRequired;
}

export function shouldUseTypeOnly(addAsTypeOnly: AddAsTypeOnly, preferences: TypeOnlyAutoImportPreferences): boolean {
  return needsTypeOnly(addAsTypeOnly)
    || (addAsTypeOnly !== AddAsTypeOnlyNotAllowed && tristateIsTrue(preferences.preferTypeOnlyAutoImports));
}

export function compareFixesForSorting(view: AutoImportRankingView, left: Fix, right: Fix): number {
  const rank = compareFixesForRanking(view, left, right);
  if (rank !== 0) return rank;
  return compareModuleSpecifiersForSorting(view, left, right);
}

export function compareFixesForRanking(view: AutoImportRankingView, left: Fix, right: Fix): number {
  const fixKind = compareFixKinds(left.kind, right.kind);
  if (fixKind !== 0) return fixKind;
  return compareModuleSpecifiersForRanking(view, left, right);
}

export function compareFixKinds(left: AutoImportFixKind, right: AutoImportFixKind): number {
  return fixKindOrder(left) - fixKindOrder(right);
}

export function compareModuleSpecifiersForRanking(view: AutoImportRankingView, left: Fix, right: Fix): number {
  const relativity = compareModuleSpecifierRelativity(left, right, view.preferences);
  if (relativity !== 0) return relativity;

  if (left.moduleSpecifierKind === ResultKind.Ambient && right.moduleSpecifierKind === ResultKind.Ambient) {
    const coreModule = compareNodeCoreModuleSpecifiers(
      left.moduleSpecifier ?? "",
      right.moduleSpecifier ?? "",
      view.shouldUseUriStyleNodeCoreModules,
    );
    if (coreModule !== 0) return coreModule;
  }

  if (left.moduleSpecifierKind === ResultKind.Relative && right.moduleSpecifierKind === ResultKind.Relative) {
    const reExporting = compareBooleans(
      isFixPossiblyReExportingImportingFile(left, view.importingFile.fileName()),
      isFixPossiblyReExportingImportingFile(right, view.importingFile.fileName()),
    );
    if (reExporting !== 0) return reExporting;
  }

  return compareNumberOfDirectorySeparators(left.moduleSpecifier ?? "", right.moduleSpecifier ?? "");
}

export function compareModuleSpecifiersForSorting(view: AutoImportRankingView, left: Fix, right: Fix): number {
  const rank = compareModuleSpecifiersForRanking(view, left, right);
  if (rank !== 0) return rank;

  const leftSpecifier = left.moduleSpecifier ?? "";
  const rightSpecifier = right.moduleSpecifier ?? "";
  if (leftSpecifier.startsWith("./") && !rightSpecifier.startsWith("./")) return -1;
  if (rightSpecifier.startsWith("./") && !leftSpecifier.startsWith("./")) return 1;

  const specifier = leftSpecifier.localeCompare(rightSpecifier);
  if (specifier !== 0) return specifier;
  return left.importKind - right.importKind;
}

export function compareNodeCoreModuleSpecifiers(
  leftSpecifier: string,
  rightSpecifier: string,
  shouldUseUriStyleNodeCoreModules: boolean | "auto" | "on" | "off" | undefined,
): number {
  const leftNode = leftSpecifier.startsWith("node:");
  const rightNode = rightSpecifier.startsWith("node:");
  if (leftNode === rightNode) return 0;
  const preference = tristatePreference(shouldUseUriStyleNodeCoreModules);
  if (preference === undefined) return 0;
  return leftNode === preference ? -1 : 1;
}

export function isFixPossiblyReExportingImportingFile(fix: Fix, importingFileName: string): boolean {
  if (!fix.isReExport || !isIndexFileName(fix.moduleFileName)) return false;
  const reExportDirectory = getDirectoryPath(fix.moduleFileName);
  return importingFileName.startsWith(reExportDirectory);
}

export function isIndexFileName(fileName: string): boolean {
  const slash = fileName.lastIndexOf("/");
  if (slash < 0 || fileName.length <= slash + 1) return false;
  switch (fileName.slice(slash + 1)) {
    case "index.js":
    case "index.jsx":
    case "index.d.ts":
    case "index.ts":
    case "index.tsx":
      return true;
  }
  return false;
}

export function getModuleSpecifierText(promotedDeclaration: Node): string {
  if (promotedDeclaration.kind === 0) return "";
  const moduleSpecifier = (promotedDeclaration as { readonly moduleSpecifier?: Node }).moduleSpecifier
    ?? (promotedDeclaration.parent as { readonly moduleSpecifier?: Node } | undefined)?.moduleSpecifier;
  if (moduleSpecifier === undefined) return sourceTextOfNode(promotedDeclaration);
  const literalText = (moduleSpecifier as { readonly text?: string }).text;
  return literalText ?? sourceTextOfNode(moduleSpecifier);
}

export function compareModuleSpecifierRelativity(
  left: Fix,
  right: Fix,
  preferences: ModuleSpecifierUserPreferences,
): number {
  switch (preferences.importModuleSpecifierPreference) {
    case ImportModuleSpecifierPreference.NonRelative:
    case ImportModuleSpecifierPreference.ProjectRelative:
      return compareBooleans(left.moduleSpecifierKind === ResultKind.Relative, right.moduleSpecifierKind === ResultKind.Relative);
  }
  return 0;
}

function fixKindOrder(kind: AutoImportFixKind): number {
  switch (kind) {
    case AutoImportFixKindUseNamespace:
      return 0;
    case AutoImportFixKindJsdocTypeImport:
      return 1;
    case AutoImportFixKindAddToExisting:
      return 2;
    case AutoImportFixKindAddNew:
      return 3;
    case AutoImportFixKindPromoteTypeOnly:
      return 4;
    default:
      return kind;
  }
}

function compareBooleans(left: boolean, right: boolean): number {
  if (left === right) return 0;
  return left ? 1 : -1;
}

function tristateIsTrue(value: boolean | "auto" | "on" | "off" | undefined): boolean {
  return value === true || value === "on";
}

function tristatePreference(value: boolean | "auto" | "on" | "off" | undefined): boolean | undefined {
  if (value === true || value === "on") return true;
  if (value === false || value === "off") return false;
  return undefined;
}

function sourceTextOfNode(node: Node): string {
  const sourceFile = node.getSourceFile();
  return sourceFile.text.slice(Math.max(0, node.pos), Math.max(0, node.end));
}

const enum FileSyntaxKind {
  Ambiguous = 0,
  ESM = 1,
  CJS = 2,
}

function requireComparableFix(fix: AutoImportFix): Fix {
  if (fix.kind === undefined) throw new Error("Auto-import fix comparison requires a fix kind.");
  return fix as Fix;
}

function sameExportID(left: { readonly moduleID: string; readonly exportName: string }, right: { readonly moduleID: string; readonly exportName: string }): boolean {
  return left.moduleID === right.moduleID && left.exportName === right.exportName;
}

function startsWithUppercase(text: string): boolean {
  if (text.length === 0) return false;
  const first = text.charAt(0);
  return first.toLocaleUpperCase() === first && first.toLocaleLowerCase() !== first;
}

function tryUseExistingNamespaceImport(
  view: View,
  exportEntry: ExportEntry,
  moduleSpecifier: string,
  moduleSpecifierKind: ResultKindValue,
  usagePosition: Position | undefined,
): Fix | undefined {
  if (usagePosition === undefined || moduleSpecifier === "") return undefined;
  if (getImportKind(view.importingFile, exportEntry, view.program as AutoImportFixProgramWithModuleMode) !== ImportKindNamed) return undefined;

  const existingImport = findExistingNamespaceImport(view.importingFile, moduleSpecifier);
  if (existingImport === undefined) return undefined;

  return {
    kind: AutoImportFixKindUseNamespace,
    importKind: ImportKindNamespace,
    importIndex: existingImport.index,
    addAsTypeOnly: AddAsTypeOnlyAllowed,
    moduleSpecifier,
    name: exportName(exportEntry),
    usagePosition,
    namespacePrefix: existingImport.namespacePrefix,
    moduleSpecifierKind,
    isReExport: !sameExportID(exportEntry.target, exportEntry),
    moduleFileName: exportEntry.moduleFileName,
  };
}

function findExistingNamespaceImport(
  file: SourceFileForSpecifierGeneration,
  moduleSpecifier: string,
): { readonly namespacePrefix: string; readonly index: number } | undefined {
  const imports = file.imports();
  for (let index = 0; index < imports.length; index += 1) {
    const importLiteral = imports[index] as unknown as Node;
    if (nodeText(importLiteral) !== moduleSpecifier) continue;
    const declaration = importDeclarationFromModuleSpecifier(importLiteral);
    if (declaration === undefined) continue;
    const namespacePrefix = getNamespaceLikeImportText(declaration);
    if (namespacePrefix !== "") return { namespacePrefix, index };
  }
  return undefined;
}

function getNamespaceLikeImportText(declaration: Node): string {
  switch (declaration.kind) {
    case Kind.VariableDeclaration: {
      const name = nodeProperty<Node>(declaration, "name");
      return name?.kind === Kind.Identifier ? nodeText(name) : "";
    }
    case Kind.ImportEqualsDeclaration: {
      const name = nodeProperty<Node>(declaration, "name");
      return name?.kind === Kind.Identifier ? nodeText(name) : "";
    }
    case Kind.JSDocImportTag:
    case Kind.ImportDeclaration: {
      const importClause = nodeProperty<Node>(declaration, "importClause");
      const namedBindings = nodeProperty<Node>(importClause, "namedBindings");
      if (namedBindings?.kind !== Kind.NamespaceImport) return "";
      const name = nodeProperty<Node>(namedBindings, "name");
      return name?.kind === Kind.Identifier ? nodeText(name) : "";
    }
    default:
      return "";
  }
}

function getEmitModuleFormatOfFile(
  program: AutoImportFixProgramWithModuleMode,
  importingFile: SourceFileForSpecifierGeneration,
  options: CoreCompilerOptions,
): number {
  return program.getEmitModuleFormatOfFile?.(importingFile) ?? getEmitModuleKind(options);
}

function hasImportEqualsDeclaration(file: SourceFileForSpecifierGeneration): boolean {
  for (const importLiteral of file.imports()) {
    if (ancestorOfKind(importLiteral as unknown as Node, Kind.ImportEqualsDeclaration) !== undefined) return true;
  }
  return false;
}

function hasExternalModuleIndicator(file: SourceFileForSpecifierGeneration): boolean {
  const sourceFile = sourceFileFromSpecifierFile(file);
  if (sourceFile !== undefined && nodeProperty<Node>(sourceFile, "externalModuleIndicator") !== undefined) return true;
  for (const importLiteral of file.imports()) {
    const declaration = importDeclarationFromModuleSpecifier(importLiteral as unknown as Node);
    if (declaration !== undefined && declaration.kind !== Kind.CallExpression && declaration.kind !== Kind.VariableDeclaration) {
      return true;
    }
  }
  return false;
}

function detectSyntax(file: SourceFileForSpecifierGeneration, options: CoreCompilerOptions): FileSyntaxKind {
  const [hasESM, hasCJS] = detectSyntaxIndicators(file, options);
  if (hasCJS && !hasESM) return FileSyntaxKind.CJS;
  if (hasESM && !hasCJS) return FileSyntaxKind.ESM;
  return FileSyntaxKind.Ambiguous;
}

function detectSyntaxIndicators(file: SourceFileForSpecifierGeneration, options: CoreCompilerOptions): readonly [boolean, boolean] {
  const sourceFile = sourceFileFromSpecifierFile(file);
  let hasCJS = sourceFile !== undefined && nodeProperty<Node>(sourceFile, "commonJSModuleIndicator") !== undefined;

  for (const importLiteral of file.imports()) {
    const declaration = importDeclarationFromModuleSpecifier(importLiteral as unknown as Node);
    if (declaration?.kind === Kind.CallExpression || declaration?.kind === Kind.VariableDeclaration) {
      hasCJS = true;
      break;
    }
  }

  if (getEmitModuleDetectionKind(options) !== ModuleDetectionKind.Force) {
    const hasESM = sourceFile !== undefined && nodeProperty<Node>(sourceFile, "externalModuleIndicator") !== undefined;
    return [hasESM || hasEsmImportSyntax(file), hasCJS];
  }

  const externalModuleIndicator = sourceFile === undefined ? undefined : nodeProperty<Node>(sourceFile, "externalModuleIndicator");
  if (sourceFile !== undefined && externalModuleIndicator !== undefined && externalModuleIndicator !== sourceFile) {
    return [true, hasCJS];
  }
  return [hasEsmImportSyntax(file), hasCJS];
}

function hasEsmImportSyntax(file: SourceFileForSpecifierGeneration): boolean {
  for (const importLiteral of file.imports()) {
    const declaration = importDeclarationFromModuleSpecifier(importLiteral as unknown as Node);
    switch (declaration?.kind) {
      case Kind.ImportDeclaration:
      case Kind.JSImportDeclaration:
      case Kind.ExportDeclaration:
      case Kind.ImportEqualsDeclaration:
        return true;
    }
  }
  return false;
}

function importDeclarationFromModuleSpecifier(moduleSpecifier: Node): Node | undefined {
  const parent = moduleSpecifier.parent;
  if (parent === undefined) return undefined;
  switch (parent.kind) {
    case Kind.ImportDeclaration:
    case Kind.JSImportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.JSDocImportTag:
      return parent;
    case Kind.ExternalModuleReference:
      return parent.parent?.kind === Kind.ImportEqualsDeclaration ? parent.parent : parent;
    case Kind.CallExpression:
      return isRequireCall(parent) ? requireVariableDeclaration(parent) ?? parent : parent;
    default:
      return ancestorOfKind(parent, Kind.ImportDeclaration)
        ?? ancestorOfKind(parent, Kind.ExportDeclaration)
        ?? ancestorOfKind(parent, Kind.ImportEqualsDeclaration)
        ?? ancestorOfKind(parent, Kind.CallExpression);
  }
}

function requireVariableDeclaration(callExpression: Node): Node | undefined {
  const parent = callExpression.parent;
  return parent?.kind === Kind.VariableDeclaration ? parent : undefined;
}

function isRequireCall(callExpression: Node): boolean {
  const expression = nodeProperty<Node>(callExpression, "expression");
  return expression?.kind === Kind.Identifier && nodeText(expression) === "require";
}

function ancestorOfKind(node: Node, kind: Kind): Node | undefined {
  let current: Node | undefined = node;
  while (current !== undefined) {
    if (current.kind === kind) return current;
    current = current.parent;
  }
  return undefined;
}

function sourceFileFromSpecifierFile(file: SourceFileForSpecifierGeneration): Node | undefined {
  const withSourceFile = file as SourceFileForSpecifierGeneration & { readonly sourceFile?: () => unknown };
  const sourceFile = withSourceFile.sourceFile?.();
  return isNode(sourceFile) ? sourceFile : undefined;
}

function nodeProperty<T>(node: Node | undefined, propertyName: string): T | undefined {
  if (node === undefined) return undefined;
  return (node as unknown as Record<string, T | undefined>)[propertyName];
}

function nodeText(node: Node): string {
  const text = nodeProperty<string>(node, "text");
  if (text !== undefined) return text;
  const escapedText = nodeProperty<string>(node, "escapedText");
  return escapedText ?? "";
}

function isNode(value: unknown): value is Node {
  return typeof value === "object"
    && value !== null
    && typeof (value as { readonly kind?: unknown }).kind === "number";
}

// Language-service parity map: internal/ls/autoimport/fix.go
/**
 * Language-service parity map for TS-Go `ls/autoimport/fix.go`.
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

export const lsAutoimportFixUpstreamPath = "ls/autoimport/fix.go";

export const lsAutoimportFixDeclarations: readonly UpstreamDeclaration[] = [
  {"line":30,"kind":"type","name":"newImportBinding"},
  {"line":37,"kind":"type","name":"Fix"},
  {"line":46,"kind":"type","name":"addToExistingImportFix"},
  {"line":53,"kind":"func","name":"Edits","receiver":"f *Fix"},
  {"line":121,"kind":"func","name":"addImportType"},
  {"line":135,"kind":"func","name":"addNamespaceQualifier"},
  {"line":144,"kind":"func","name":"getAddToExistingImportFix"},
  {"line":181,"kind":"func","name":"addToExistingImport"},
  {"line":304,"kind":"func","name":"getTypeKeywordOfTypeOnlyImport"},
  {"line":314,"kind":"func","name":"addElementToBindingPattern"},
  {"line":329,"kind":"func","name":"getNewImports"},
  {"line":398,"kind":"func","name":"getNewRequires"},
  {"line":463,"kind":"func","name":"createConstEqualsRequireDeclaration"},
  {"line":486,"kind":"func","name":"insertImports"},
  {"line":525,"kind":"func","name":"makeImport"},
  {"line":537,"kind":"func","name":"GetFixes","receiver":"v *View"},
  {"line":606,"kind":"func","name":"getAddAsTypeOnly"},
  {"line":619,"kind":"func","name":"tryUseExistingNamespaceImport","receiver":"v *View"},
  {"line":652,"kind":"func","name":"getNamespaceLikeImportText"},
  {"line":673,"kind":"func","name":"tryAddToExistingImport","receiver":"v *View"},
  {"line":780,"kind":"func","name":"getImportKind"},
  {"line":820,"kind":"type","name":"existingImport"},
  {"line":826,"kind":"func","name":"getExistingImports","receiver":"v *View"},
  {"line":857,"kind":"func","name":"shouldUseRequire","receiver":"v *View"},
  {"line":867,"kind":"type","name":"fileSyntaxKind"},
  {"line":879,"kind":"func","name":"detectSyntax"},
  {"line":895,"kind":"func","name":"detectSyntaxIndicators"},
  {"line":929,"kind":"func","name":"computeShouldUseRequire","receiver":"v *View"},
  {"line":975,"kind":"func","name":"needsTypeOnly"},
  {"line":979,"kind":"func","name":"shouldUseTypeOnly"},
  {"line":987,"kind":"func","name":"CompareFixesForSorting","receiver":"v *View"},
  {"line":997,"kind":"func","name":"CompareFixesForRanking","receiver":"v *View"},
  {"line":1004,"kind":"func","name":"compareFixKinds"},
  {"line":1008,"kind":"func","name":"compareModuleSpecifiersForRanking","receiver":"v *View"},
  {"line":1031,"kind":"func","name":"compareModuleSpecifiersForSorting","receiver":"v *View"},
  {"line":1052,"kind":"func","name":"compareNodeCoreModuleSpecifiers","receiver":"v *View"},
  {"line":1076,"kind":"func","name":"isFixPossiblyReExportingImportingFile"},
  {"line":1084,"kind":"func","name":"isIndexFileName"},
  {"line":1097,"kind":"func","name":"promoteFromTypeOnly"},
  {"line":1190,"kind":"func","name":"promoteImportClause"},
  {"line":1271,"kind":"func","name":"deleteTypeKeyword"},
  {"line":1286,"kind":"func","name":"getModuleSpecifierText"},
  {"line":1308,"kind":"func","name":"compareModuleSpecifierRelativity"},
];

export const lsAutoimportFixSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package autoimport"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"context\""},
  {"line":6,"text":"\t\"fmt\""},
  {"line":7,"text":"\t\"slices\""},
  {"line":8,"text":"\t\"strings\""},
  {"line":9,"text":"\t\"unicode\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/diagnostics\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/locale\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/change\""},
  {"line":21,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":22,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":23,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":24,"text":"\t\"github.com/microsoft/typescript-go/internal/modulespecifiers\""},
  {"line":25,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":26,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":27,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":28,"text":")"},
  {"line":30,"text":"type newImportBinding struct {"},
  {"line":31,"text":"\tkind          lsproto.ImportKind"},
  {"line":32,"text":"\tpropertyName  string"},
  {"line":33,"text":"\tname          string"},
  {"line":34,"text":"\taddAsTypeOnly lsproto.AddAsTypeOnly"},
  {"line":35,"text":"}"},
  {"line":37,"text":"type Fix struct {"},
  {"line":38,"text":"\t*lsproto.AutoImportFix"},
  {"line":40,"text":"\tModuleSpecifierKind      modulespecifiers.ResultKind"},
  {"line":41,"text":"\tIsReExport               bool"},
  {"line":42,"text":"\tModuleFileName           string"},
  {"line":43,"text":"\tTypeOnlyAliasDeclaration *ast.Declaration"},
  {"line":44,"text":"}"},
  {"line":46,"text":"type addToExistingImportFix struct {"},
  {"line":47,"text":"\timportClauseOrBindingPattern *ast.ImportClauseOrBindingPattern"},
  {"line":49,"text":"\tdefaultImport *newImportBinding"},
  {"line":50,"text":"\tnamedImport   *newImportBinding"},
  {"line":51,"text":"}"},
  {"line":53,"text":"func (f *Fix) Edits("},
  {"line":54,"text":"\tctx context.Context,"},
  {"line":55,"text":"\tfile *ast.SourceFile,"},
  {"line":56,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":57,"text":"\tformatOptions lsutil.FormatCodeSettings,"},
  {"line":58,"text":"\tconverters *lsconv.Converters,"},
  {"line":59,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":60,"text":") ([]*lsproto.TextEdit, string) {"},
  {"line":61,"text":"\tlocale := locale.FromContext(ctx)"},
  {"line":62,"text":"\ttracker := change.NewTracker(ctx, compilerOptions, formatOptions, converters)"},
  {"line":63,"text":"\tswitch f.Kind {"},
  {"line":64,"text":"\tcase lsproto.AutoImportFixKindUseNamespace:"},
  {"line":65,"text":"\t\tdescription := addNamespaceQualifier(f, tracker, file, locale)"},
  {"line":66,"text":"\t\treturn tracker.GetChanges()[file.FileName()], description"},
  {"line":67,"text":"\tcase lsproto.AutoImportFixKindAddToExisting:"},
  {"line":68,"text":"\t\tif len(file.Imports()) <= int(f.ImportIndex) {"},
  {"line":69,"text":"\t\t\tpanic(\"import index out of range\")"},
  {"line":70,"text":"\t\t}"},
  {"line":71,"text":"\t\texistingFix := getAddToExistingImportFix(file, f)"},
  {"line":72,"text":"\t\taddToExistingImport(tracker, file, existingFix.importClauseOrBindingPattern, existingFix.defaultImport, core.SingleElementSlice(existingFix.namedImport), preferences)"},
  {"line":73,"text":"\t\treturn tracker.GetChanges()[file.FileName()], diagnostics.Update_import_from_0.Localize(locale, f.ModuleSpecifier)"},
  {"line":74,"text":"\tcase lsproto.AutoImportFixKindAddNew:"},
  {"line":75,"text":"\t\tvar declarations []*ast.Statement"},
  {"line":76,"text":"\t\tdefaultImport := core.IfElse(f.ImportKind == lsproto.ImportKindDefault, &newImportBinding{name: f.Name, addAsTypeOnly: f.AddAsTypeOnly}, nil)"},
  {"line":77,"text":"\t\tnamedImports := core.IfElse(f.ImportKind == lsproto.ImportKindNamed, []*newImportBinding{{name: f.Name, addAsTypeOnly: f.AddAsTypeOnly}}, nil)"},
  {"line":78,"text":"\t\tvar namespaceLikeImport *newImportBinding"},
  {"line":80,"text":"\t\tif f.ImportKind == lsproto.ImportKindNamespace || f.ImportKind == lsproto.ImportKindCommonJS {"},
  {"line":81,"text":"\t\t\tnamespaceLikeImport = &newImportBinding{kind: f.ImportKind, name: f.Name}"},
  {"line":85,"text":"\t\t}"},
  {"line":87,"text":"\t\tquotePreference := lsutil.GetQuotePreference(file, preferences)"},
  {"line":88,"text":"\t\tif f.UseRequire {"},
  {"line":89,"text":"\t\t\tdeclarations = getNewRequires(tracker, f.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions)"},
  {"line":90,"text":"\t\t} else {"},
  {"line":91,"text":"\t\t\tdeclarations = getNewImports(tracker, f.ModuleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport, compilerOptions, preferences)"},
  {"line":92,"text":"\t\t}"},
  {"line":94,"text":"\t\tinsertImports("},
  {"line":95,"text":"\t\t\ttracker,"},
  {"line":96,"text":"\t\t\tfile,"},
  {"line":97,"text":"\t\t\tdeclarations,"},
  {"line":98,"text":"\t\t\t/*blankLineBetween*/ true,"},
  {"line":99,"text":"\t\t\tpreferences,"},
  {"line":100,"text":"\t\t)"},
  {"line":104,"text":"\t\treturn tracker.GetChanges()[file.FileName()], diagnostics.Add_import_from_0.Localize(locale, f.ModuleSpecifier)"},
  {"line":105,"text":"\tcase lsproto.AutoImportFixKindPromoteTypeOnly:"},
  {"line":106,"text":"\t\tpromotedDeclaration := promoteFromTypeOnly(tracker, f.TypeOnlyAliasDeclaration, compilerOptions, file, preferences)"},
  {"line":107,"text":"\t\tif promotedDeclaration.Kind == ast.KindImportSpecifier {"},
  {"line":108,"text":"\t\t\tmoduleSpec := getModuleSpecifierText(promotedDeclaration.Parent.Parent)"},
  {"line":109,"text":"\t\t\treturn tracker.GetChanges()[file.FileName()], diagnostics.Remove_type_from_import_of_0_from_1.Localize(locale, f.Name, moduleSpec)"},
  {"line":110,"text":"\t\t}"},
  {"line":111,"text":"\t\tmoduleSpec := getModuleSpecifierText(promotedDeclaration)"},
  {"line":112,"text":"\t\treturn tracker.GetChanges()[file.FileName()], diagnostics.Remove_type_from_import_declaration_from_0.Localize(locale, moduleSpec)"},
  {"line":113,"text":"\tcase lsproto.AutoImportFixKindJsdocTypeImport:"},
  {"line":114,"text":"\t\tdescription := addImportType(f, file, preferences, tracker, locale)"},
  {"line":115,"text":"\t\treturn tracker.GetChanges()[file.FileName()], description"},
  {"line":116,"text":"\tdefault:"},
  {"line":117,"text":"\t\tpanic(\"unimplemented fix edit\")"},
  {"line":118,"text":"\t}"},
  {"line":119,"text":"}"},
  {"line":121,"text":"func addImportType(f *Fix, file *ast.SourceFile, preferences lsutil.UserPreferences, tracker *change.Tracker, locale locale.Locale) string {"},
  {"line":122,"text":"\tif f.UsagePosition == nil {"},
  {"line":123,"text":"\t\tpanic(\"UsagePosition must be set for JSDoc type import fix\")"},
  {"line":124,"text":"\t}"},
  {"line":125,"text":"\tquotePreference := lsutil.GetQuotePreference(file, preferences)"},
  {"line":126,"text":"\tquoteChar := \"\\\"\""},
  {"line":127,"text":"\tif quotePreference == lsutil.QuotePreferenceSingle {"},
  {"line":128,"text":"\t\tquoteChar = \"'\""},
  {"line":129,"text":"\t}"},
  {"line":130,"text":"\timportTypePrefix := fmt.Sprintf(\"import(%s%s%s).\", quoteChar, f.ModuleSpecifier, quoteChar)"},
  {"line":131,"text":"\ttracker.InsertText(file, *f.UsagePosition, importTypePrefix)"},
  {"line":132,"text":"\treturn diagnostics.Change_0_to_1.Localize(locale, f.Name, importTypePrefix+f.Name)"},
  {"line":133,"text":"}"},
  {"line":135,"text":"func addNamespaceQualifier(f *Fix, tracker *change.Tracker, file *ast.SourceFile, locale locale.Locale) string {"},
  {"line":136,"text":"\tif f.UsagePosition == nil || f.NamespacePrefix == \"\" {"},
  {"line":137,"text":"\t\tpanic(\"namespace fix requires usage position and prefix\")"},
  {"line":138,"text":"\t}"},
  {"line":139,"text":"\tqualified := fmt.Sprintf(\"%s.%s\", f.NamespacePrefix, f.Name)"},
  {"line":140,"text":"\ttracker.InsertText(file, *f.UsagePosition, f.NamespacePrefix+\".\")"},
  {"line":141,"text":"\treturn diagnostics.Change_0_to_1.Localize(locale, f.Name, qualified)"},
  {"line":142,"text":"}"},
  {"line":144,"text":"func getAddToExistingImportFix(file *ast.SourceFile, fix *Fix) *addToExistingImportFix {"},
  {"line":145,"text":"\tif fix.Kind != lsproto.AutoImportFixKindAddToExisting {"},
  {"line":146,"text":"\t\tpanic(\"expected add to existing import fix\")"},
  {"line":147,"text":"\t}"},
  {"line":148,"text":"\tmoduleSpecifier := file.Imports()[fix.ImportIndex]"},
  {"line":149,"text":"\timportNode := ast.TryGetImportFromModuleSpecifier(moduleSpecifier)"},
  {"line":150,"text":"\tif importNode == nil {"},
  {"line":151,"text":"\t\tpanic(\"expected import declaration\")"},
  {"line":152,"text":"\t}"},
  {"line":153,"text":"\tvar importClauseOrBindingPattern *ast.Node"},
  {"line":154,"text":"\tswitch importNode.Kind {"},
  {"line":155,"text":"\tcase ast.KindImportDeclaration:"},
  {"line":156,"text":"\t\timportClauseOrBindingPattern = importNode.ImportClause()"},
  {"line":157,"text":"\t\tif importClauseOrBindingPattern == nil {"},
  {"line":158,"text":"\t\t\tpanic(\"expected import clause\")"},
  {"line":159,"text":"\t\t}"},
  {"line":160,"text":"\tcase ast.KindCallExpression:"},
  {"line":161,"text":"\t\tif !ast.IsVariableDeclarationInitializedToRequire(importNode.Parent) {"},
  {"line":162,"text":"\t\t\tpanic(\"expected require call expression to be in variable declaration\")"},
  {"line":163,"text":"\t\t}"},
  {"line":164,"text":"\t\timportClauseOrBindingPattern = importNode.Parent.Name()"},
  {"line":165,"text":"\t\tif importClauseOrBindingPattern == nil || !ast.IsObjectBindingPattern(importClauseOrBindingPattern) {"},
  {"line":166,"text":"\t\t\tpanic(\"expected object binding pattern in variable declaration\")"},
  {"line":167,"text":"\t\t}"},
  {"line":168,"text":"\tdefault:"},
  {"line":169,"text":"\t\tpanic(\"expected import declaration or require call expression\")"},
  {"line":170,"text":"\t}"},
  {"line":172,"text":"\tdefaultImport := core.IfElse(fix.ImportKind == lsproto.ImportKindDefault, &newImportBinding{kind: lsproto.ImportKindDefault, name: fix.Name, addAsTypeOnly: fix.AddAsTypeOnly}, nil)"},
  {"line":173,"text":"\tnamedImports := core.IfElse(fix.ImportKind == lsproto.ImportKindNamed, &newImportBinding{kind: lsproto.ImportKindNamed, name: fix.Name, addAsTypeOnly: fix.AddAsTypeOnly}, nil)"},
  {"line":174,"text":"\treturn &addToExistingImportFix{"},
  {"line":175,"text":"\t\timportClauseOrBindingPattern: importClauseOrBindingPattern,"},
  {"line":176,"text":"\t\tdefaultImport:                defaultImport,"},
  {"line":177,"text":"\t\tnamedImport:                  namedImports,"},
  {"line":178,"text":"\t}"},
  {"line":179,"text":"}"},
  {"line":181,"text":"func addToExistingImport("},
  {"line":182,"text":"\tct *change.Tracker,"},
  {"line":183,"text":"\tfile *ast.SourceFile,"},
  {"line":184,"text":"\timportClauseOrBindingPattern *ast.Node,"},
  {"line":185,"text":"\tdefaultImport *newImportBinding,"},
  {"line":186,"text":"\tnamedImports []*newImportBinding,"},
  {"line":187,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":188,"text":") {"},
  {"line":189,"text":"\tswitch importClauseOrBindingPattern.Kind {"},
  {"line":190,"text":"\tcase ast.KindObjectBindingPattern:"},
  {"line":191,"text":"\t\tbindingPattern := importClauseOrBindingPattern.AsBindingPattern()"},
  {"line":192,"text":"\t\tif defaultImport != nil {"},
  {"line":193,"text":"\t\t\taddElementToBindingPattern(ct, file, bindingPattern, defaultImport.name, \"default\")"},
  {"line":194,"text":"\t\t}"},
  {"line":195,"text":"\t\tfor _, namedImport := range namedImports {"},
  {"line":196,"text":"\t\t\taddElementToBindingPattern(ct, file, bindingPattern, namedImport.name, \"\")"},
  {"line":197,"text":"\t\t}"},
  {"line":198,"text":"\t\treturn"},
  {"line":199,"text":"\tcase ast.KindImportClause:"},
  {"line":200,"text":"\t\timportClause := importClauseOrBindingPattern.AsImportClause()"},
  {"line":203,"text":"\t\tpromoteFromTypeOnly := importClause.IsTypeOnly() && core.Some(append(namedImports, defaultImport), func(i *newImportBinding) bool {"},
  {"line":204,"text":"\t\t\tif i == nil {"},
  {"line":205,"text":"\t\t\t\treturn false"},
  {"line":206,"text":"\t\t\t}"},
  {"line":207,"text":"\t\t\treturn i.addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed"},
  {"line":208,"text":"\t\t})"},
  {"line":210,"text":"\t\tvar existingSpecifiers []*ast.Node"},
  {"line":211,"text":"\t\tif importClause.NamedBindings != nil && importClause.NamedBindings.Kind == ast.KindNamedImports {"},
  {"line":212,"text":"\t\t\texistingSpecifiers = importClause.NamedBindings.Elements()"},
  {"line":213,"text":"\t\t}"},
  {"line":215,"text":"\t\tif defaultImport != nil {"},
  {"line":216,"text":"\t\t\tdebug.Assert(importClause.Name() == nil, \"Cannot add a default import to an import clause that already has one\")"},
  {"line":217,"text":"\t\t\tct.InsertNodeAt(file, core.TextPos(astnav.GetStartOfNode(importClause.AsNode(), file, false)), ct.NodeFactory.NewIdentifier(defaultImport.name), change.NodeOptions{Suffix: \", \"})"},
  {"line":218,"text":"\t\t}"},
  {"line":220,"text":"\t\tif len(namedImports) > 0 {"},
  {"line":221,"text":"\t\t\tspecifierComparer, isSorted := lsutil.GetNamedImportSpecifierComparerWithDetection(importClause.Parent, file, preferences)"},
  {"line":222,"text":"\t\t\tnewSpecifiers := core.Map(namedImports, func(namedImport *newImportBinding) *ast.Node {"},
  {"line":223,"text":"\t\t\t\tvar identifier *ast.Node"},
  {"line":224,"text":"\t\t\t\tif namedImport.propertyName != \"\" {"},
  {"line":225,"text":"\t\t\t\t\tidentifier = ct.NodeFactory.NewIdentifier(namedImport.propertyName).AsIdentifier().AsNode()"},
  {"line":226,"text":"\t\t\t\t}"},
  {"line":227,"text":"\t\t\t\treturn ct.NodeFactory.NewImportSpecifier("},
  {"line":228,"text":"\t\t\t\t\t(!importClause.IsTypeOnly() || promoteFromTypeOnly) && shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),"},
  {"line":229,"text":"\t\t\t\t\tidentifier,"},
  {"line":230,"text":"\t\t\t\t\tct.NodeFactory.NewIdentifier(namedImport.name),"},
  {"line":231,"text":"\t\t\t\t)"},
  {"line":232,"text":"\t\t\t})"},
  {"line":233,"text":"\t\t\tslices.SortFunc(newSpecifiers, specifierComparer)"},
  {"line":234,"text":"\t\t\tif len(existingSpecifiers) > 0 && isSorted != core.TSFalse {"},
  {"line":243,"text":"\t\t\t\tspecsToCompareAgainst := existingSpecifiers"},
  {"line":244,"text":"\t\t\t\tif promoteFromTypeOnly && len(existingSpecifiers) > 0 {"},
  {"line":245,"text":"\t\t\t\t\tspecsToCompareAgainst = core.Map(existingSpecifiers, func(e *ast.Node) *ast.Node {"},
  {"line":246,"text":"\t\t\t\t\t\tspec := e.AsImportSpecifier()"},
  {"line":247,"text":"\t\t\t\t\t\tvar propertyName *ast.Node"},
  {"line":248,"text":"\t\t\t\t\t\tif spec.PropertyName != nil {"},
  {"line":249,"text":"\t\t\t\t\t\t\tpropertyName = spec.PropertyName"},
  {"line":250,"text":"\t\t\t\t\t\t}"},
  {"line":251,"text":"\t\t\t\t\t\tsyntheticSpec := ct.NodeFactory.NewImportSpecifier("},
  {"line":252,"text":"\t\t\t\t\t\t\ttrue, // isTypeOnly"},
  {"line":253,"text":"\t\t\t\t\t\t\tpropertyName,"},
  {"line":254,"text":"\t\t\t\t\t\t\tspec.Name(),"},
  {"line":255,"text":"\t\t\t\t\t\t)"},
  {"line":256,"text":"\t\t\t\t\t\treturn syntheticSpec"},
  {"line":257,"text":"\t\t\t\t\t})"},
  {"line":258,"text":"\t\t\t\t}"},
  {"line":260,"text":"\t\t\t\tfor _, spec := range newSpecifiers {"},
  {"line":261,"text":"\t\t\t\t\tinsertionIndex := lsutil.GetImportSpecifierInsertionIndex(specsToCompareAgainst, spec, specifierComparer)"},
  {"line":262,"text":"\t\t\t\t\tct.InsertImportSpecifierAtIndex(file, spec, importClause.NamedBindings, insertionIndex)"},
  {"line":263,"text":"\t\t\t\t}"},
  {"line":264,"text":"\t\t\t} else if len(existingSpecifiers) > 0 {"},
  {"line":265,"text":"\t\t\t\tfor _, spec := range newSpecifiers {"},
  {"line":266,"text":"\t\t\t\t\tct.InsertNodeInListAfter(file, existingSpecifiers[len(existingSpecifiers)-1], spec.AsNode(), nil)"},
  {"line":267,"text":"\t\t\t\t}"},
  {"line":268,"text":"\t\t\t} else {"},
  {"line":269,"text":"\t\t\t\tif len(newSpecifiers) > 0 {"},
  {"line":270,"text":"\t\t\t\t\tnamedImports := ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(newSpecifiers))"},
  {"line":271,"text":"\t\t\t\t\tif importClause.NamedBindings != nil {"},
  {"line":272,"text":"\t\t\t\t\t\tct.ReplaceNode(file, importClause.NamedBindings, namedImports, nil)"},
  {"line":273,"text":"\t\t\t\t\t} else {"},
  {"line":274,"text":"\t\t\t\t\t\tif importClause.Name() == nil {"},
  {"line":275,"text":"\t\t\t\t\t\t\tpanic(\"Import clause must have either named imports or a default import\")"},
  {"line":276,"text":"\t\t\t\t\t\t}"},
  {"line":277,"text":"\t\t\t\t\t\tct.InsertNodeAfter(file, importClause.Name(), namedImports)"},
  {"line":278,"text":"\t\t\t\t\t}"},
  {"line":279,"text":"\t\t\t\t}"},
  {"line":280,"text":"\t\t\t}"},
  {"line":281,"text":"\t\t}"},
  {"line":283,"text":"\t\tif promoteFromTypeOnly {"},
  {"line":285,"text":"\t\t\ttypeKeyword := getTypeKeywordOfTypeOnlyImport(importClause, file)"},
  {"line":286,"text":"\t\t\tct.Delete(file, typeKeyword)"},
  {"line":291,"text":"\t\t\tif len(existingSpecifiers) > 0 {"},
  {"line":292,"text":"\t\t\t\tfor _, specifier := range existingSpecifiers {"},
  {"line":293,"text":"\t\t\t\t\tif !specifier.AsImportSpecifier().IsTypeOnly {"},
  {"line":294,"text":"\t\t\t\t\t\tct.InsertModifierBefore(file, ast.KindTypeKeyword, specifier)"},
  {"line":295,"text":"\t\t\t\t\t}"},
  {"line":296,"text":"\t\t\t\t}"},
  {"line":297,"text":"\t\t\t}"},
  {"line":298,"text":"\t\t}"},
  {"line":299,"text":"\tdefault:"},
  {"line":300,"text":"\t\tpanic(\"Unsupported clause kind: \" + importClauseOrBindingPattern.KindString() + \" for addToExistingImport\")"},
  {"line":301,"text":"\t}"},
  {"line":302,"text":"}"},
  {"line":304,"text":"func getTypeKeywordOfTypeOnlyImport(importClause *ast.ImportClause, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":305,"text":"\tdebug.Assert(importClause.IsTypeOnly(), \"import clause must be type-only\")"},
  {"line":309,"text":"\ttypeKeyword := astnav.FindChildOfKind(importClause.AsNode(), ast.KindTypeKeyword, sourceFile)"},
  {"line":310,"text":"\tdebug.Assert(typeKeyword != nil, \"type-only import clause should have a type keyword\")"},
  {"line":311,"text":"\treturn typeKeyword"},
  {"line":312,"text":"}"},
  {"line":314,"text":"func addElementToBindingPattern("},
  {"line":315,"text":"\tct *change.Tracker,"},
  {"line":316,"text":"\tfile *ast.SourceFile,"},
  {"line":317,"text":"\tbindingPattern *ast.BindingPattern,"},
  {"line":318,"text":"\tname string,"},
  {"line":319,"text":"\tpropertyName string,"},
  {"line":320,"text":") {"},
  {"line":321,"text":"\telement := ct.NodeFactory.NewBindingElement(nil, nil, ct.NodeFactory.NewIdentifier(name), core.IfElse(propertyName == \"\", nil, ct.NodeFactory.NewIdentifier(propertyName)))"},
  {"line":322,"text":"\tif len(bindingPattern.Elements.Nodes) > 0 {"},
  {"line":323,"text":"\t\tct.InsertNodeInListAfter(file, bindingPattern.Elements.Nodes[len(bindingPattern.Elements.Nodes)-1], element, bindingPattern.Elements)"},
  {"line":324,"text":"\t} else {"},
  {"line":325,"text":"\t\tct.ReplaceNode(file, bindingPattern.AsNode(), ct.NodeFactory.NewBindingPattern(ast.KindObjectBindingPattern, ct.AsNodeFactory().NewNodeList([]*ast.Node{element})), nil)"},
  {"line":326,"text":"\t}"},
  {"line":327,"text":"}"},
  {"line":329,"text":"func getNewImports("},
  {"line":330,"text":"\tct *change.Tracker,"},
  {"line":331,"text":"\tmoduleSpecifier string,"},
  {"line":332,"text":"\tquotePreference lsutil.QuotePreference,"},
  {"line":333,"text":"\tdefaultImport *newImportBinding,"},
  {"line":334,"text":"\tnamedImports []*newImportBinding,"},
  {"line":335,"text":"\tnamespaceLikeImport *newImportBinding, // { lsproto.importKind: lsproto.ImportKind.CommonJS | lsproto.ImportKind.Namespace; }"},
  {"line":336,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":337,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":338,"text":") []*ast.AnyImportSyntax {"},
  {"line":339,"text":"\ttokenFlags := core.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone)"},
  {"line":340,"text":"\tmoduleSpecifierStringLiteral := ct.NodeFactory.NewStringLiteral(moduleSpecifier, tokenFlags)"},
  {"line":341,"text":"\tvar statements []*ast.AnyImportSyntax"},
  {"line":342,"text":"\tif defaultImport != nil || len(namedImports) > 0 {"},
  {"line":345,"text":"\t\ttopLevelTypeOnly := (defaultImport == nil || needsTypeOnly(defaultImport.addAsTypeOnly)) &&"},
  {"line":346,"text":"\t\t\tcore.Every(namedImports, func(i *newImportBinding) bool { return needsTypeOnly(i.addAsTypeOnly) }) ||"},
  {"line":347,"text":"\t\t\t(compilerOptions.VerbatimModuleSyntax.IsTrue() || preferences.PreferTypeOnlyAutoImports.IsTrue()) &&"},
  {"line":348,"text":"\t\t\t\t(defaultImport == nil || defaultImport.addAsTypeOnly != lsproto.AddAsTypeOnlyNotAllowed) &&"},
  {"line":349,"text":"\t\t\t\t!core.Some(namedImports, func(i *newImportBinding) bool { return i.addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed })"},
  {"line":351,"text":"\t\tvar defaultImportNode *ast.Node"},
  {"line":352,"text":"\t\tif defaultImport != nil {"},
  {"line":353,"text":"\t\t\tdefaultImportNode = ct.NodeFactory.NewIdentifier(defaultImport.name)"},
  {"line":354,"text":"\t\t}"},
  {"line":356,"text":"\t\tstatements = append(statements, makeImport(ct, defaultImportNode, core.Map(namedImports, func(namedImport *newImportBinding) *ast.Node {"},
  {"line":357,"text":"\t\t\tvar namedImportPropertyName *ast.Node"},
  {"line":358,"text":"\t\t\tif namedImport.propertyName != \"\" {"},
  {"line":359,"text":"\t\t\t\tnamedImportPropertyName = ct.NodeFactory.NewIdentifier(namedImport.propertyName)"},
  {"line":360,"text":"\t\t\t}"},
  {"line":361,"text":"\t\t\treturn ct.NodeFactory.NewImportSpecifier("},
  {"line":362,"text":"\t\t\t\t!topLevelTypeOnly && shouldUseTypeOnly(namedImport.addAsTypeOnly, preferences),"},
  {"line":363,"text":"\t\t\t\tnamedImportPropertyName,"},
  {"line":364,"text":"\t\t\t\tct.NodeFactory.NewIdentifier(namedImport.name),"},
  {"line":365,"text":"\t\t\t)"},
  {"line":366,"text":"\t\t}), moduleSpecifierStringLiteral, topLevelTypeOnly))"},
  {"line":367,"text":"\t}"},
  {"line":369,"text":"\tif namespaceLikeImport != nil {"},
  {"line":370,"text":"\t\tvar declaration *ast.Statement"},
  {"line":371,"text":"\t\tif namespaceLikeImport.kind == lsproto.ImportKindCommonJS {"},
  {"line":372,"text":"\t\t\tdeclaration = ct.NodeFactory.NewImportEqualsDeclaration("},
  {"line":373,"text":"\t\t\t\t/*modifiers*/ nil,"},
  {"line":374,"text":"\t\t\t\tshouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences),"},
  {"line":375,"text":"\t\t\t\tct.NodeFactory.NewIdentifier(namespaceLikeImport.name),"},
  {"line":376,"text":"\t\t\t\tct.NodeFactory.NewExternalModuleReference(moduleSpecifierStringLiteral),"},
  {"line":377,"text":"\t\t\t)"},
  {"line":378,"text":"\t\t} else {"},
  {"line":379,"text":"\t\t\tdeclaration = ct.NodeFactory.NewImportDeclaration("},
  {"line":380,"text":"\t\t\t\t/*modifiers*/ nil,"},
  {"line":381,"text":"\t\t\t\tct.NodeFactory.NewImportClause("},
  {"line":382,"text":"\t\t\t\t\t/*phaseModifier*/ core.IfElse(shouldUseTypeOnly(namespaceLikeImport.addAsTypeOnly, preferences), ast.KindTypeKeyword, ast.KindUnknown),"},
  {"line":383,"text":"\t\t\t\t\t/*name*/ nil,"},
  {"line":384,"text":"\t\t\t\t\tct.NodeFactory.NewNamespaceImport(ct.NodeFactory.NewIdentifier(namespaceLikeImport.name)),"},
  {"line":385,"text":"\t\t\t\t),"},
  {"line":386,"text":"\t\t\t\tmoduleSpecifierStringLiteral,"},
  {"line":387,"text":"\t\t\t\t/*attributes*/ nil,"},
  {"line":388,"text":"\t\t\t)"},
  {"line":389,"text":"\t\t}"},
  {"line":390,"text":"\t\tstatements = append(statements, declaration)"},
  {"line":391,"text":"\t}"},
  {"line":392,"text":"\tif len(statements) == 0 {"},
  {"line":393,"text":"\t\tpanic(\"No statements to insert for new imports\")"},
  {"line":394,"text":"\t}"},
  {"line":395,"text":"\treturn statements"},
  {"line":396,"text":"}"},
  {"line":398,"text":"func getNewRequires("},
  {"line":399,"text":"\tchangeTracker *change.Tracker,"},
  {"line":400,"text":"\tmoduleSpecifier string,"},
  {"line":401,"text":"\tquotePreference lsutil.QuotePreference,"},
  {"line":402,"text":"\tdefaultImport *newImportBinding,"},
  {"line":403,"text":"\tnamedImports []*newImportBinding,"},
  {"line":404,"text":"\tnamespaceLikeImport *newImportBinding,"},
  {"line":405,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":406,"text":") []*ast.Statement {"},
  {"line":407,"text":"\tquotedModuleSpecifier := changeTracker.NodeFactory.NewStringLiteral("},
  {"line":408,"text":"\t\tmoduleSpecifier,"},
  {"line":409,"text":"\t\tcore.IfElse(quotePreference == lsutil.QuotePreferenceSingle, ast.TokenFlagsSingleQuote, ast.TokenFlagsNone),"},
  {"line":410,"text":"\t)"},
  {"line":411,"text":"\tvar statements []*ast.Statement"},
  {"line":414,"text":"\tif defaultImport != nil || len(namedImports) > 0 {"},
  {"line":415,"text":"\t\tbindingElements := []*ast.Node{}"},
  {"line":416,"text":"\t\tfor _, namedImport := range namedImports {"},
  {"line":417,"text":"\t\t\tvar propertyName *ast.Node"},
  {"line":418,"text":"\t\t\tif namedImport.propertyName != \"\" {"},
  {"line":419,"text":"\t\t\t\tpropertyName = changeTracker.NodeFactory.NewIdentifier(namedImport.propertyName)"},
  {"line":420,"text":"\t\t\t}"},
  {"line":421,"text":"\t\t\tbindingElements = append(bindingElements, changeTracker.NodeFactory.NewBindingElement("},
  {"line":422,"text":"\t\t\t\t/*dotDotDotToken*/ nil,"},
  {"line":423,"text":"\t\t\t\tpropertyName,"},
  {"line":424,"text":"\t\t\t\tchangeTracker.NodeFactory.NewIdentifier(namedImport.name),"},
  {"line":425,"text":"\t\t\t\t/*initializer*/ nil,"},
  {"line":426,"text":"\t\t\t))"},
  {"line":427,"text":"\t\t}"},
  {"line":428,"text":"\t\tif defaultImport != nil {"},
  {"line":429,"text":"\t\t\tbindingElements = append([]*ast.Node{"},
  {"line":430,"text":"\t\t\t\tchangeTracker.NodeFactory.NewBindingElement("},
  {"line":431,"text":"\t\t\t\t\t/*dotDotDotToken*/ nil,"},
  {"line":432,"text":"\t\t\t\t\tchangeTracker.NodeFactory.NewIdentifier(\"default\"),"},
  {"line":433,"text":"\t\t\t\t\tchangeTracker.NodeFactory.NewIdentifier(defaultImport.name),"},
  {"line":434,"text":"\t\t\t\t\t/*initializer*/ nil,"},
  {"line":435,"text":"\t\t\t\t),"},
  {"line":436,"text":"\t\t\t}, bindingElements...)"},
  {"line":437,"text":"\t\t}"},
  {"line":438,"text":"\t\tdeclaration := createConstEqualsRequireDeclaration("},
  {"line":439,"text":"\t\t\tchangeTracker,"},
  {"line":440,"text":"\t\t\tchangeTracker.NodeFactory.NewBindingPattern("},
  {"line":441,"text":"\t\t\t\tast.KindObjectBindingPattern,"},
  {"line":442,"text":"\t\t\t\tchangeTracker.NodeFactory.NewNodeList(bindingElements),"},
  {"line":443,"text":"\t\t\t),"},
  {"line":444,"text":"\t\t\tquotedModuleSpecifier,"},
  {"line":445,"text":"\t\t)"},
  {"line":446,"text":"\t\tstatements = append(statements, declaration)"},
  {"line":447,"text":"\t}"},
  {"line":450,"text":"\tif namespaceLikeImport != nil {"},
  {"line":451,"text":"\t\tdeclaration := createConstEqualsRequireDeclaration("},
  {"line":452,"text":"\t\t\tchangeTracker,"},
  {"line":453,"text":"\t\t\tchangeTracker.NodeFactory.NewIdentifier(namespaceLikeImport.name),"},
  {"line":454,"text":"\t\t\tquotedModuleSpecifier,"},
  {"line":455,"text":"\t\t)"},
  {"line":456,"text":"\t\tstatements = append(statements, declaration)"},
  {"line":457,"text":"\t}"},
  {"line":459,"text":"\tdebug.Assert(statements != nil)"},
  {"line":460,"text":"\treturn statements"},
  {"line":461,"text":"}"},
  {"line":463,"text":"func createConstEqualsRequireDeclaration(changeTracker *change.Tracker, name *ast.Node, quotedModuleSpecifier *ast.Node) *ast.Statement {"},
  {"line":464,"text":"\treturn changeTracker.NodeFactory.NewVariableStatement("},
  {"line":465,"text":"\t\t/*modifiers*/ nil,"},
  {"line":466,"text":"\t\tchangeTracker.NodeFactory.NewVariableDeclarationList("},
  {"line":467,"text":"\t\t\tchangeTracker.NodeFactory.NewNodeList([]*ast.Node{"},
  {"line":468,"text":"\t\t\t\tchangeTracker.NodeFactory.NewVariableDeclaration("},
  {"line":469,"text":"\t\t\t\t\tname,"},
  {"line":470,"text":"\t\t\t\t\t/*exclamationToken*/ nil,"},
  {"line":471,"text":"\t\t\t\t\t/*type*/ nil,"},
  {"line":472,"text":"\t\t\t\t\tchangeTracker.NodeFactory.NewCallExpression("},
  {"line":473,"text":"\t\t\t\t\t\tchangeTracker.NodeFactory.NewIdentifier(\"require\"),"},
  {"line":474,"text":"\t\t\t\t\t\t/*questionDotToken*/ nil,"},
  {"line":475,"text":"\t\t\t\t\t\t/*typeArguments*/ nil,"},
  {"line":476,"text":"\t\t\t\t\t\tchangeTracker.NodeFactory.NewNodeList([]*ast.Node{quotedModuleSpecifier}),"},
  {"line":477,"text":"\t\t\t\t\t\tast.NodeFlagsNone,"},
  {"line":478,"text":"\t\t\t\t\t),"},
  {"line":479,"text":"\t\t\t\t),"},
  {"line":480,"text":"\t\t\t}),"},
  {"line":481,"text":"\t\t\tast.NodeFlagsConst,"},
  {"line":482,"text":"\t\t),"},
  {"line":483,"text":"\t)"},
  {"line":484,"text":"}"},
  {"line":486,"text":"func insertImports(ct *change.Tracker, sourceFile *ast.SourceFile, imports []*ast.AnyImportOrRequireStatement, blankLineBetween bool, preferences lsutil.UserPreferences) {"},
  {"line":487,"text":"\tvar existingImportStatements []*ast.Statement"},
  {"line":489,"text":"\tif imports[0].Kind == ast.KindVariableStatement {"},
  {"line":490,"text":"\t\texistingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsRequireVariableStatement)"},
  {"line":491,"text":"\t} else {"},
  {"line":492,"text":"\t\texistingImportStatements = core.Filter(sourceFile.Statements.Nodes, ast.IsAnyImportSyntax)"},
  {"line":493,"text":"\t}"},
  {"line":494,"text":"\tcomparer, isSorted := lsutil.GetOrganizeImportsStringComparerWithDetection(existingImportStatements, preferences)"},
  {"line":495,"text":"\tsortedNewImports := slices.Clone(imports)"},
  {"line":496,"text":"\tslices.SortFunc(sortedNewImports, func(a, b *ast.Statement) int {"},
  {"line":497,"text":"\t\treturn lsutil.CompareImportsOrRequireStatements(a, b, comparer)"},
  {"line":498,"text":"\t})"},
  {"line":500,"text":"\tif len(existingImportStatements) > 0 && isSorted {"},
  {"line":502,"text":"\t\tfor _, newImport := range sortedNewImports {"},
  {"line":503,"text":"\t\t\tinsertionIndex := lsutil.GetImportDeclarationInsertIndex(existingImportStatements, newImport, func(a, b *ast.Statement) stringutil.Comparison {"},
  {"line":504,"text":"\t\t\t\treturn lsutil.CompareImportsOrRequireStatements(a, b, comparer)"},
  {"line":505,"text":"\t\t\t})"},
  {"line":506,"text":"\t\t\tif insertionIndex == 0 {"},
  {"line":508,"text":"\t\t\t\tleadingTriviaOption := change.LeadingTriviaOptionNone"},
  {"line":509,"text":"\t\t\t\tif existingImportStatements[0] == sourceFile.Statements.Nodes[0] {"},
  {"line":510,"text":"\t\t\t\t\tleadingTriviaOption = change.LeadingTriviaOptionExclude"},
  {"line":511,"text":"\t\t\t\t}"},
  {"line":512,"text":"\t\t\t\tct.InsertNodeBefore(sourceFile, existingImportStatements[0].AsNode(), newImport.AsNode(), false /*blankLineBetween*/, leadingTriviaOption)"},
  {"line":513,"text":"\t\t\t} else {"},
  {"line":514,"text":"\t\t\t\tprevImport := existingImportStatements[insertionIndex-1]"},
  {"line":515,"text":"\t\t\t\tct.InsertNodeAfter(sourceFile, prevImport.AsNode(), newImport.AsNode())"},
  {"line":516,"text":"\t\t\t}"},
  {"line":517,"text":"\t\t}"},
  {"line":518,"text":"\t} else if len(existingImportStatements) > 0 {"},
  {"line":519,"text":"\t\tct.InsertNodesAfter(sourceFile, existingImportStatements[len(existingImportStatements)-1], sortedNewImports)"},
  {"line":520,"text":"\t} else {"},
  {"line":521,"text":"\t\tct.InsertAtTopOfFile(sourceFile, sortedNewImports, blankLineBetween)"},
  {"line":522,"text":"\t}"},
  {"line":523,"text":"}"},
  {"line":525,"text":"func makeImport(ct *change.Tracker, defaultImport *ast.IdentifierNode, namedImports []*ast.Node, moduleSpecifier *ast.Expression, isTypeOnly bool) *ast.Statement {"},
  {"line":526,"text":"\tvar newNamedImports *ast.Node"},
  {"line":527,"text":"\tif len(namedImports) > 0 {"},
  {"line":528,"text":"\t\tnewNamedImports = ct.NodeFactory.NewNamedImports(ct.NodeFactory.NewNodeList(namedImports))"},
  {"line":529,"text":"\t}"},
  {"line":530,"text":"\tvar importClause *ast.Node"},
  {"line":531,"text":"\tif defaultImport != nil || newNamedImports != nil {"},
  {"line":532,"text":"\t\timportClause = ct.NodeFactory.NewImportClause(core.IfElse(isTypeOnly, ast.KindTypeKeyword, ast.KindUnknown), defaultImport, newNamedImports)"},
  {"line":533,"text":"\t}"},
  {"line":534,"text":"\treturn ct.NodeFactory.NewImportDeclaration( /*modifiers*/ nil, importClause, moduleSpecifier, nil /*attributes*/)"},
  {"line":535,"text":"}"},
  {"line":537,"text":"func (v *View) GetFixes(ctx context.Context, export *Export, forJSX bool, isValidTypeOnlyUseSite bool, usagePosition *lsproto.Position) []*Fix {"},
  {"line":538,"text":"\tvar fixes []*Fix"},
  {"line":539,"text":"\tif namespaceFix := v.tryUseExistingNamespaceImport(ctx, export, usagePosition); namespaceFix != nil {"},
  {"line":540,"text":"\t\tfixes = append(fixes, namespaceFix)"},
  {"line":541,"text":"\t}"},
  {"line":543,"text":"\tif fix := v.tryAddToExistingImport(ctx, export, isValidTypeOnlyUseSite); fix != nil {"},
  {"line":544,"text":"\t\treturn append(fixes, fix)"},
  {"line":545,"text":"\t}"},
  {"line":549,"text":"\tmoduleSpecifier, moduleSpecifierKind := v.GetModuleSpecifier(export, v.preferences)"},
  {"line":550,"text":"\tif moduleSpecifier == \"\" {"},
  {"line":551,"text":"\t\tif len(fixes) > 0 {"},
  {"line":552,"text":"\t\t\treturn fixes"},
  {"line":553,"text":"\t\t}"},
  {"line":554,"text":"\t\treturn nil"},
  {"line":555,"text":"\t}"},
  {"line":558,"text":"\tisJs := tspath.HasJSFileExtension(v.importingFile.FileName())"},
  {"line":559,"text":"\timportedSymbolHasValueMeaning := export.Flags&ast.SymbolFlagsValue != 0 || export.IsUnresolvedAlias()"},
  {"line":560,"text":"\tif !importedSymbolHasValueMeaning && isJs && usagePosition != nil {"},
  {"line":562,"text":"\t\treturn []*Fix{"},
  {"line":563,"text":"\t\t\t{"},
  {"line":564,"text":"\t\t\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":565,"text":"\t\t\t\t\tKind:            lsproto.AutoImportFixKindJsdocTypeImport,"},
  {"line":566,"text":"\t\t\t\t\tModuleSpecifier: moduleSpecifier,"},
  {"line":567,"text":"\t\t\t\t\tName:            export.Name(),"},
  {"line":568,"text":"\t\t\t\t\tUsagePosition:   usagePosition,"},
  {"line":569,"text":"\t\t\t\t},"},
  {"line":570,"text":"\t\t\t\tModuleSpecifierKind: moduleSpecifierKind,"},
  {"line":571,"text":"\t\t\t\tIsReExport:          export.Target.ModuleID != export.ModuleID,"},
  {"line":572,"text":"\t\t\t\tModuleFileName:      export.ModuleFileName,"},
  {"line":573,"text":"\t\t\t},"},
  {"line":574,"text":"\t\t}"},
  {"line":575,"text":"\t}"},
  {"line":577,"text":"\timportKind := getImportKind(v.importingFile, export, v.program)"},
  {"line":578,"text":"\taddAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, export, v.program.Options())"},
  {"line":580,"text":"\tname := export.Name()"},
  {"line":581,"text":"\tstartsWithUpper := unicode.IsUpper(rune(name[0]))"},
  {"line":582,"text":"\tif forJSX && !startsWithUpper {"},
  {"line":583,"text":"\t\tif export.IsRenameable() {"},
  {"line":584,"text":"\t\t\tname = fmt.Sprintf(\"%c%s\", unicode.ToUpper(rune(name[0])), name[1:])"},
  {"line":585,"text":"\t\t} else {"},
  {"line":586,"text":"\t\t\treturn nil"},
  {"line":587,"text":"\t\t}"},
  {"line":588,"text":"\t}"},
  {"line":590,"text":"\treturn append(fixes, &Fix{"},
  {"line":591,"text":"\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":592,"text":"\t\t\tKind:            lsproto.AutoImportFixKindAddNew,"},
  {"line":593,"text":"\t\t\tImportKind:      importKind,"},
  {"line":594,"text":"\t\t\tModuleSpecifier: moduleSpecifier,"},
  {"line":595,"text":"\t\t\tName:            name,"},
  {"line":596,"text":"\t\t\tUseRequire:      v.shouldUseRequire(),"},
  {"line":597,"text":"\t\t\tAddAsTypeOnly:   addAsTypeOnly,"},
  {"line":598,"text":"\t\t},"},
  {"line":599,"text":"\t\tModuleSpecifierKind: moduleSpecifierKind,"},
  {"line":600,"text":"\t\tIsReExport:          export.Target.ModuleID != export.ModuleID,"},
  {"line":601,"text":"\t\tModuleFileName:      export.ModuleFileName,"},
  {"line":602,"text":"\t})"},
  {"line":603,"text":"}"},
  {"line":606,"text":"func getAddAsTypeOnly(isValidTypeOnlyUseSite bool, export *Export, compilerOptions *core.CompilerOptions) lsproto.AddAsTypeOnly {"},
  {"line":607,"text":"\tif !isValidTypeOnlyUseSite {"},
  {"line":609,"text":"\t\treturn lsproto.AddAsTypeOnlyNotAllowed"},
  {"line":610,"text":"\t}"},
  {"line":611,"text":"\tif compilerOptions.VerbatimModuleSyntax.IsTrue() && (export.IsTypeOnly || export.Flags&ast.SymbolFlagsValue == 0) ||"},
  {"line":612,"text":"\t\texport.IsTypeOnly && export.Flags&ast.SymbolFlagsValue != 0 {"},
  {"line":614,"text":"\t\treturn lsproto.AddAsTypeOnlyRequired"},
  {"line":615,"text":"\t}"},
  {"line":616,"text":"\treturn lsproto.AddAsTypeOnlyAllowed"},
  {"line":617,"text":"}"},
  {"line":619,"text":"func (v *View) tryUseExistingNamespaceImport(ctx context.Context, export *Export, usagePosition *lsproto.Position) *Fix {"},
  {"line":620,"text":"\tif usagePosition == nil {"},
  {"line":621,"text":"\t\treturn nil"},
  {"line":622,"text":"\t}"},
  {"line":624,"text":"\tif getImportKind(v.importingFile, export, v.program) != lsproto.ImportKindNamed {"},
  {"line":625,"text":"\t\treturn nil"},
  {"line":626,"text":"\t}"},
  {"line":628,"text":"\texistingImports := v.getExistingImports(ctx)"},
  {"line":629,"text":"\tmatchingDeclarations := existingImports.Get(export.ModuleID)"},
  {"line":630,"text":"\tfor _, existingImport := range matchingDeclarations {"},
  {"line":631,"text":"\t\tnamespacePrefix := getNamespaceLikeImportText(existingImport.node)"},
  {"line":632,"text":"\t\tif namespacePrefix == \"\" || existingImport.moduleSpecifier == \"\" {"},
  {"line":633,"text":"\t\t\tcontinue"},
  {"line":634,"text":"\t\t}"},
  {"line":635,"text":"\t\treturn &Fix{"},
  {"line":636,"text":"\t\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":637,"text":"\t\t\t\tKind:            lsproto.AutoImportFixKindUseNamespace,"},
  {"line":638,"text":"\t\t\t\tName:            export.Name(),"},
  {"line":639,"text":"\t\t\t\tModuleSpecifier: existingImport.moduleSpecifier,"},
  {"line":640,"text":"\t\t\t\tImportKind:      lsproto.ImportKindNamespace,"},
  {"line":641,"text":"\t\t\t\tAddAsTypeOnly:   lsproto.AddAsTypeOnlyAllowed,"},
  {"line":642,"text":"\t\t\t\tImportIndex:     int32(existingImport.index),"},
  {"line":643,"text":"\t\t\t\tUsagePosition:   usagePosition,"},
  {"line":644,"text":"\t\t\t\tNamespacePrefix: namespacePrefix,"},
  {"line":645,"text":"\t\t\t},"},
  {"line":646,"text":"\t\t}"},
  {"line":647,"text":"\t}"},
  {"line":649,"text":"\treturn nil"},
  {"line":650,"text":"}"},
  {"line":652,"text":"func getNamespaceLikeImportText(declaration *ast.Node) string {"},
  {"line":653,"text":"\tswitch declaration.Kind {"},
  {"line":654,"text":"\tcase ast.KindVariableDeclaration:"},
  {"line":655,"text":"\t\tname := declaration.Name()"},
  {"line":656,"text":"\t\tif name != nil && name.Kind == ast.KindIdentifier {"},
  {"line":657,"text":"\t\t\treturn name.Text()"},
  {"line":658,"text":"\t\t}"},
  {"line":659,"text":"\t\treturn \"\""},
  {"line":660,"text":"\tcase ast.KindImportEqualsDeclaration:"},
  {"line":661,"text":"\t\treturn declaration.Name().Text()"},
  {"line":662,"text":"\tcase ast.KindJSDocImportTag, ast.KindImportDeclaration:"},
  {"line":663,"text":"\t\timportClause := declaration.ImportClause()"},
  {"line":664,"text":"\t\tif importClause != nil && importClause.AsImportClause().NamedBindings != nil && importClause.AsImportClause().NamedBindings.Kind == ast.KindNamespaceImport {"},
  {"line":665,"text":"\t\t\treturn importClause.AsImportClause().NamedBindings.Name().Text()"},
  {"line":666,"text":"\t\t}"},
  {"line":667,"text":"\t\treturn \"\""},
  {"line":668,"text":"\tdefault:"},
  {"line":669,"text":"\t\treturn \"\""},
  {"line":670,"text":"\t}"},
  {"line":671,"text":"}"},
  {"line":673,"text":"func (v *View) tryAddToExistingImport("},
  {"line":674,"text":"\tctx context.Context,"},
  {"line":675,"text":"\texport *Export,"},
  {"line":676,"text":"\tisValidTypeOnlyUseSite bool,"},
  {"line":677,"text":") *Fix {"},
  {"line":678,"text":"\texistingImports := v.getExistingImports(ctx)"},
  {"line":679,"text":"\tmatchingDeclarations := existingImports.Get(export.ModuleID)"},
  {"line":680,"text":"\tif len(matchingDeclarations) == 0 {"},
  {"line":681,"text":"\t\treturn nil"},
  {"line":682,"text":"\t}"},
  {"line":685,"text":"\tif ast.IsSourceFileJS(v.importingFile) && export.Flags&ast.SymbolFlagsValue == 0 && !core.Every(matchingDeclarations, func(i existingImport) bool {"},
  {"line":686,"text":"\t\treturn ast.IsJSDocImportTag(i.node)"},
  {"line":687,"text":"\t}) {"},
  {"line":688,"text":"\t\treturn nil"},
  {"line":689,"text":"\t}"},
  {"line":691,"text":"\timportKind := getImportKind(v.importingFile, export, v.program)"},
  {"line":692,"text":"\tif importKind == lsproto.ImportKindCommonJS || importKind == lsproto.ImportKindNamespace {"},
  {"line":693,"text":"\t\treturn nil"},
  {"line":694,"text":"\t}"},
  {"line":696,"text":"\taddAsTypeOnly := getAddAsTypeOnly(isValidTypeOnlyUseSite, export, v.program.Options())"},
  {"line":698,"text":"\tvar best *Fix"},
  {"line":699,"text":"\tfor _, existingImport := range matchingDeclarations {"},
  {"line":700,"text":"\t\tif existingImport.node.Kind == ast.KindImportEqualsDeclaration {"},
  {"line":701,"text":"\t\t\tcontinue"},
  {"line":702,"text":"\t\t}"},
  {"line":704,"text":"\t\tif existingImport.node.Kind == ast.KindVariableDeclaration {"},
  {"line":705,"text":"\t\t\tif (importKind == lsproto.ImportKindNamed || importKind == lsproto.ImportKindDefault) && existingImport.node.Name().Kind == ast.KindObjectBindingPattern {"},
  {"line":706,"text":"\t\t\t\tfix := &Fix{"},
  {"line":707,"text":"\t\t\t\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":708,"text":"\t\t\t\t\t\tKind:            lsproto.AutoImportFixKindAddToExisting,"},
  {"line":709,"text":"\t\t\t\t\t\tName:            export.Name(),"},
  {"line":710,"text":"\t\t\t\t\t\tImportKind:      importKind,"},
  {"line":711,"text":"\t\t\t\t\t\tImportIndex:     int32(existingImport.index),"},
  {"line":712,"text":"\t\t\t\t\t\tModuleSpecifier: existingImport.moduleSpecifier,"},
  {"line":713,"text":"\t\t\t\t\t\tAddAsTypeOnly:   addAsTypeOnly,"},
  {"line":714,"text":"\t\t\t\t\t},"},
  {"line":715,"text":"\t\t\t\t}"},
  {"line":719,"text":"\t\t\t\tif addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed {"},
  {"line":720,"text":"\t\t\t\t\treturn fix"},
  {"line":721,"text":"\t\t\t\t}"},
  {"line":722,"text":"\t\t\t\tif best == nil {"},
  {"line":723,"text":"\t\t\t\t\tbest = fix"},
  {"line":724,"text":"\t\t\t\t}"},
  {"line":725,"text":"\t\t\t}"},
  {"line":726,"text":"\t\t\tcontinue"},
  {"line":727,"text":"\t\t}"},
  {"line":729,"text":"\t\timportClauseNode := existingImport.node.ImportClause()"},
  {"line":730,"text":"\t\tif importClauseNode == nil || !ast.IsStringLiteralLike(existingImport.node.ModuleSpecifier()) {"},
  {"line":732,"text":"\t\t\tcontinue"},
  {"line":733,"text":"\t\t}"},
  {"line":734,"text":"\t\timportClause := importClauseNode.AsImportClause()"},
  {"line":736,"text":"\t\tnamedBindings := importClause.NamedBindings"},
  {"line":739,"text":"\t\tif importClause.IsTypeOnly() && !(importKind == lsproto.ImportKindNamed && namedBindings != nil) {"},
  {"line":740,"text":"\t\t\tcontinue"},
  {"line":741,"text":"\t\t}"},
  {"line":743,"text":"\t\tif importKind == lsproto.ImportKindDefault && (importClause.Name() != nil ||"},
  {"line":745,"text":"\t\t\taddAsTypeOnly == lsproto.AddAsTypeOnlyRequired && namedBindings != nil) {"},
  {"line":746,"text":"\t\t\tcontinue"},
  {"line":747,"text":"\t\t}"},
  {"line":750,"text":"\t\tif importKind == lsproto.ImportKindNamed && namedBindings != nil && namedBindings.Kind == ast.KindNamespaceImport {"},
  {"line":751,"text":"\t\t\tcontinue"},
  {"line":752,"text":"\t\t}"},
  {"line":754,"text":"\t\tfix := &Fix{"},
  {"line":755,"text":"\t\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":756,"text":"\t\t\t\tKind:            lsproto.AutoImportFixKindAddToExisting,"},
  {"line":757,"text":"\t\t\t\tName:            export.Name(),"},
  {"line":758,"text":"\t\t\t\tImportKind:      importKind,"},
  {"line":759,"text":"\t\t\t\tImportIndex:     int32(existingImport.index),"},
  {"line":760,"text":"\t\t\t\tModuleSpecifier: existingImport.moduleSpecifier,"},
  {"line":761,"text":"\t\t\t\tAddAsTypeOnly:   addAsTypeOnly,"},
  {"line":762,"text":"\t\t\t},"},
  {"line":763,"text":"\t\t}"},
  {"line":765,"text":"\t\tisTypeOnly := importClause.IsTypeOnly()"},
  {"line":768,"text":"\t\tif (addAsTypeOnly != lsproto.AddAsTypeOnlyNotAllowed && isTypeOnly) ||"},
  {"line":769,"text":"\t\t\t(addAsTypeOnly == lsproto.AddAsTypeOnlyNotAllowed && !isTypeOnly) {"},
  {"line":770,"text":"\t\t\treturn fix"},
  {"line":771,"text":"\t\t}"},
  {"line":772,"text":"\t\tif best == nil {"},
  {"line":773,"text":"\t\t\tbest = fix"},
  {"line":774,"text":"\t\t}"},
  {"line":775,"text":"\t}"},
  {"line":777,"text":"\treturn best"},
  {"line":778,"text":"}"},
  {"line":780,"text":"func getImportKind(importingFile *ast.SourceFile, export *Export, program *compiler.Program) lsproto.ImportKind {"},
  {"line":781,"text":"\tif program.Options().VerbatimModuleSyntax.IsTrue() && program.GetEmitModuleFormatOfFile(importingFile) == core.ModuleKindCommonJS {"},
  {"line":782,"text":"\t\treturn lsproto.ImportKindCommonJS"},
  {"line":783,"text":"\t}"},
  {"line":784,"text":"\tswitch export.Syntax {"},
  {"line":785,"text":"\tcase ExportSyntaxDefaultModifier, ExportSyntaxDefaultDeclaration:"},
  {"line":786,"text":"\t\treturn lsproto.ImportKindDefault"},
  {"line":787,"text":"\tcase ExportSyntaxNamed:"},
  {"line":788,"text":"\t\tif export.ExportName == ast.InternalSymbolNameDefault {"},
  {"line":789,"text":"\t\t\treturn lsproto.ImportKindDefault"},
  {"line":790,"text":"\t\t}"},
  {"line":791,"text":"\t\tfallthrough"},
  {"line":792,"text":"\tcase ExportSyntaxModifier, ExportSyntaxStar, ExportSyntaxCommonJSExportsProperty:"},
  {"line":793,"text":"\t\treturn lsproto.ImportKindNamed"},
  {"line":794,"text":"\tcase ExportSyntaxEquals, ExportSyntaxCommonJSModuleExports, ExportSyntaxUMD:"},
  {"line":796,"text":"\t\tif export.ExportName != ast.InternalSymbolNameExportEquals {"},
  {"line":797,"text":"\t\t\treturn lsproto.ImportKindNamed"},
  {"line":798,"text":"\t\t}"},
  {"line":800,"text":"\t\tfor _, statement := range importingFile.Statements.Nodes {"},
  {"line":802,"text":"\t\t\tif ast.IsImportEqualsDeclaration(statement) && !ast.NodeIsMissing(statement.AsImportEqualsDeclaration().ModuleReference) {"},
  {"line":803,"text":"\t\t\t\treturn lsproto.ImportKindCommonJS"},
  {"line":804,"text":"\t\t\t}"},
  {"line":805,"text":"\t\t}"},
  {"line":811,"text":"\t\tif importingFile.ExternalModuleIndicator != nil || !ast.IsSourceFileJS(importingFile) {"},
  {"line":812,"text":"\t\t\treturn lsproto.ImportKindDefault"},
  {"line":813,"text":"\t\t}"},
  {"line":814,"text":"\t\treturn lsproto.ImportKindCommonJS"},
  {"line":815,"text":"\tdefault:"},
  {"line":816,"text":"\t\tpanic(\"unhandled export syntax kind: \" + export.Syntax.String())"},
  {"line":817,"text":"\t}"},
  {"line":818,"text":"}"},
  {"line":820,"text":"type existingImport struct {"},
  {"line":821,"text":"\tnode            *ast.Node"},
  {"line":822,"text":"\tmoduleSpecifier string"},
  {"line":823,"text":"\tindex           int"},
  {"line":824,"text":"}"},
  {"line":826,"text":"func (v *View) getExistingImports(ctx context.Context) *collections.MultiMap[ModuleID, existingImport] {"},
  {"line":827,"text":"\tif v.existingImports != nil {"},
  {"line":828,"text":"\t\treturn v.existingImports"},
  {"line":829,"text":"\t}"},
  {"line":831,"text":"\tresult := collections.NewMultiMapWithSizeHint[ModuleID, existingImport](len(v.importingFile.Imports()))"},
  {"line":832,"text":"\tch, done := v.program.GetTypeChecker(ctx)"},
  {"line":833,"text":"\tdefer done()"},
  {"line":835,"text":"\tfor i, moduleSpecifier := range v.importingFile.Imports() {"},
  {"line":836,"text":"\t\tnode := ast.TryGetImportFromModuleSpecifier(moduleSpecifier)"},
  {"line":837,"text":"\t\tif node == nil {"},
  {"line":838,"text":"\t\t\tpanic(\"error: did not expect node kind \" + moduleSpecifier.Kind.String())"},
  {"line":839,"text":"\t\t} else if ast.IsVariableDeclarationInitializedToRequire(node.Parent) {"},
  {"line":840,"text":"\t\t\tif moduleSymbol := ch.ResolveExternalModuleName(moduleSpecifier); moduleSymbol != nil {"},
  {"line":841,"text":"\t\t\t\tif moduleID, _, ok := tryGetModuleIDAndFileNameOfModuleSymbol(moduleSymbol); ok {"},
  {"line":842,"text":"\t\t\t\t\tresult.Add(moduleID, existingImport{node: node.Parent, moduleSpecifier: moduleSpecifier.Text(), index: i})"},
  {"line":843,"text":"\t\t\t\t}"},
  {"line":844,"text":"\t\t\t}"},
  {"line":845,"text":"\t\t} else if node.Kind == ast.KindImportDeclaration || node.Kind == ast.KindImportEqualsDeclaration || node.Kind == ast.KindJSDocImportTag {"},
  {"line":846,"text":"\t\t\tif moduleSymbol := ch.GetSymbolAtLocation(moduleSpecifier); moduleSymbol != nil {"},
  {"line":847,"text":"\t\t\t\tif moduleID, _, ok := tryGetModuleIDAndFileNameOfModuleSymbol(moduleSymbol); ok {"},
  {"line":848,"text":"\t\t\t\t\tresult.Add(moduleID, existingImport{node: node, moduleSpecifier: moduleSpecifier.Text(), index: i})"},
  {"line":849,"text":"\t\t\t\t}"},
  {"line":850,"text":"\t\t\t}"},
  {"line":851,"text":"\t\t}"},
  {"line":852,"text":"\t}"},
  {"line":853,"text":"\tv.existingImports = result"},
  {"line":854,"text":"\treturn result"},
  {"line":855,"text":"}"},
  {"line":857,"text":"func (v *View) shouldUseRequire() bool {"},
  {"line":858,"text":"\tif v.shouldUseRequireForFixes != nil {"},
  {"line":859,"text":"\t\treturn *v.shouldUseRequireForFixes"},
  {"line":860,"text":"\t}"},
  {"line":861,"text":"\tshouldUseRequire := v.computeShouldUseRequire()"},
  {"line":862,"text":"\tv.shouldUseRequireForFixes = &shouldUseRequire"},
  {"line":863,"text":"\treturn shouldUseRequire"},
  {"line":864,"text":"}"},
  {"line":867,"text":"type fileSyntaxKind int"},
  {"line":869,"text":"const ("},
  {"line":870,"text":"\tfileSyntaxKindAmbiguous fileSyntaxKind = iota"},
  {"line":871,"text":"\tfileSyntaxKindESM"},
  {"line":872,"text":"\tfileSyntaxKindCJS"},
  {"line":873,"text":")"},
  {"line":879,"text":"func detectSyntax(file *ast.SourceFile, options *core.CompilerOptions) fileSyntaxKind {"},
  {"line":880,"text":"\thasESM, hasCJS := detectSyntaxIndicators(file, options)"},
  {"line":881,"text":"\tswitch {"},
  {"line":882,"text":"\tcase hasCJS && !hasESM:"},
  {"line":883,"text":"\t\treturn fileSyntaxKindCJS"},
  {"line":884,"text":"\tcase hasESM && !hasCJS:"},
  {"line":885,"text":"\t\treturn fileSyntaxKindESM"},
  {"line":886,"text":"\tdefault:"},
  {"line":887,"text":"\t\treturn fileSyntaxKindAmbiguous"},
  {"line":888,"text":"\t}"},
  {"line":889,"text":"}"},
  {"line":895,"text":"func detectSyntaxIndicators(file *ast.SourceFile, options *core.CompilerOptions) (hasESM bool, hasCJS bool) {"},
  {"line":896,"text":"\thasCJS = file.CommonJSModuleIndicator != nil"},
  {"line":897,"text":"\tif options.GetEmitModuleDetectionKind() != core.ModuleDetectionKindForce {"},
  {"line":899,"text":"\t\thasESM = file.ExternalModuleIndicator != nil"},
  {"line":900,"text":"\t\treturn hasESM, hasCJS"},
  {"line":901,"text":"\t}"},
  {"line":905,"text":"\tif file.ExternalModuleIndicator != nil && file.ExternalModuleIndicator != file.AsNode() {"},
  {"line":906,"text":"\t\treturn true, hasCJS"},
  {"line":907,"text":"\t}"},
  {"line":910,"text":"\tfor _, imp := range file.Imports() {"},
  {"line":911,"text":"\t\tif imp.Flags&ast.NodeFlagsSynthesized != 0 {"},
  {"line":912,"text":"\t\t\tcontinue"},
  {"line":913,"text":"\t\t}"},
  {"line":914,"text":"\t\tparent := imp.Parent"},
  {"line":915,"text":"\t\tif parent == nil {"},
  {"line":916,"text":"\t\t\tcontinue"},
  {"line":917,"text":"\t\t}"},
  {"line":918,"text":"\t\tswitch parent.Kind {"},
  {"line":919,"text":"\t\tcase ast.KindImportDeclaration, ast.KindJSImportDeclaration, ast.KindExportDeclaration:"},
  {"line":920,"text":"\t\t\treturn true, hasCJS"},
  {"line":921,"text":"\t\tcase ast.KindExternalModuleReference:"},
  {"line":923,"text":"\t\t\treturn true, hasCJS"},
  {"line":924,"text":"\t\t}"},
  {"line":925,"text":"\t}"},
  {"line":926,"text":"\treturn hasESM, hasCJS"},
  {"line":927,"text":"}"},
  {"line":929,"text":"func (v *View) computeShouldUseRequire() bool {"},
  {"line":931,"text":"\tif !tspath.HasJSFileExtension(v.importingFile.FileName()) {"},
  {"line":932,"text":"\t\treturn false"},
  {"line":933,"text":"\t}"},
  {"line":936,"text":"\tswitch detectSyntax(v.importingFile, v.program.Options()) {"},
  {"line":937,"text":"\tcase fileSyntaxKindCJS:"},
  {"line":938,"text":"\t\treturn true"},
  {"line":939,"text":"\tcase fileSyntaxKindESM:"},
  {"line":940,"text":"\t\treturn false"},
  {"line":941,"text":"\t}"},
  {"line":945,"text":"\tswitch v.program.GetImpliedNodeFormatForEmit(v.importingFile) {"},
  {"line":946,"text":"\tcase core.ModuleKindCommonJS:"},
  {"line":947,"text":"\t\treturn true"},
  {"line":948,"text":"\tcase core.ModuleKindESNext:"},
  {"line":949,"text":"\t\treturn false"},
  {"line":950,"text":"\t}"},
  {"line":953,"text":"\tif v.program.Options().ConfigFilePath != \"\" {"},
  {"line":954,"text":"\t\treturn v.program.Options().GetEmitModuleKind() < core.ModuleKindES2015"},
  {"line":955,"text":"\t}"},
  {"line":958,"text":"\tfor _, otherFile := range v.program.GetSourceFiles() {"},
  {"line":959,"text":"\t\tswitch {"},
  {"line":960,"text":"\t\tcase otherFile == v.importingFile, !ast.IsSourceFileJS(otherFile), v.program.IsSourceFileFromExternalLibrary(otherFile):"},
  {"line":961,"text":"\t\t\tcontinue"},
  {"line":962,"text":"\t\t}"},
  {"line":963,"text":"\t\tswitch detectSyntax(otherFile, v.program.Options()) {"},
  {"line":964,"text":"\t\tcase fileSyntaxKindCJS:"},
  {"line":965,"text":"\t\t\treturn true"},
  {"line":966,"text":"\t\tcase fileSyntaxKindESM:"},
  {"line":967,"text":"\t\t\treturn false"},
  {"line":968,"text":"\t\t}"},
  {"line":969,"text":"\t}"},
  {"line":972,"text":"\treturn true"},
  {"line":973,"text":"}"},
  {"line":975,"text":"func needsTypeOnly(addAsTypeOnly lsproto.AddAsTypeOnly) bool {"},
  {"line":976,"text":"\treturn addAsTypeOnly == lsproto.AddAsTypeOnlyRequired"},
  {"line":977,"text":"}"},
  {"line":979,"text":"func shouldUseTypeOnly(addAsTypeOnly lsproto.AddAsTypeOnly, preferences lsutil.UserPreferences) bool {"},
  {"line":980,"text":"\treturn needsTypeOnly(addAsTypeOnly) || addAsTypeOnly != lsproto.AddAsTypeOnlyNotAllowed && preferences.PreferTypeOnlyAutoImports.IsTrue()"},
  {"line":981,"text":"}"},
  {"line":987,"text":"func (v *View) CompareFixesForSorting(a, b *Fix) int {"},
  {"line":988,"text":"\tif res := v.CompareFixesForRanking(a, b); res != 0 {"},
  {"line":989,"text":"\t\treturn res"},
  {"line":990,"text":"\t}"},
  {"line":991,"text":"\treturn v.compareModuleSpecifiersForSorting(a, b)"},
  {"line":992,"text":"}"},
  {"line":997,"text":"func (v *View) CompareFixesForRanking(a, b *Fix) int {"},
  {"line":998,"text":"\tif res := compareFixKinds(a.Kind, b.Kind); res != 0 {"},
  {"line":999,"text":"\t\treturn res"},
  {"line":1000,"text":"\t}"},
  {"line":1001,"text":"\treturn v.compareModuleSpecifiersForRanking(a, b)"},
  {"line":1002,"text":"}"},
  {"line":1004,"text":"func compareFixKinds(a, b lsproto.AutoImportFixKind) int {"},
  {"line":1005,"text":"\treturn int(a) - int(b)"},
  {"line":1006,"text":"}"},
  {"line":1008,"text":"func (v *View) compareModuleSpecifiersForRanking(a, b *Fix) int {"},
  {"line":1009,"text":"\tif comparison := compareModuleSpecifierRelativity(a, b, v.preferences); comparison != 0 {"},
  {"line":1010,"text":"\t\treturn comparison"},
  {"line":1011,"text":"\t}"},
  {"line":1012,"text":"\tif a.ModuleSpecifierKind == modulespecifiers.ResultKindAmbient && b.ModuleSpecifierKind == modulespecifiers.ResultKindAmbient {"},
  {"line":1013,"text":"\t\tif comparison := v.compareNodeCoreModuleSpecifiers(a.ModuleSpecifier, b.ModuleSpecifier, v.importingFile, v.program); comparison != 0 {"},
  {"line":1014,"text":"\t\t\treturn comparison"},
  {"line":1015,"text":"\t\t}"},
  {"line":1016,"text":"\t}"},
  {"line":1017,"text":"\tif a.ModuleSpecifierKind == modulespecifiers.ResultKindRelative && b.ModuleSpecifierKind == modulespecifiers.ResultKindRelative {"},
  {"line":1018,"text":"\t\tif comparison := core.CompareBooleans("},
  {"line":1019,"text":"\t\t\tisFixPossiblyReExportingImportingFile(a, v.importingFile.FileName()),"},
  {"line":1020,"text":"\t\t\tisFixPossiblyReExportingImportingFile(b, v.importingFile.FileName()),"},
  {"line":1021,"text":"\t\t); comparison != 0 {"},
  {"line":1022,"text":"\t\t\treturn comparison"},
  {"line":1023,"text":"\t\t}"},
  {"line":1024,"text":"\t}"},
  {"line":1025,"text":"\tif comparison := tspath.CompareNumberOfDirectorySeparators(a.ModuleSpecifier, b.ModuleSpecifier); comparison != 0 {"},
  {"line":1026,"text":"\t\treturn comparison"},
  {"line":1027,"text":"\t}"},
  {"line":1028,"text":"\treturn 0"},
  {"line":1029,"text":"}"},
  {"line":1031,"text":"func (v *View) compareModuleSpecifiersForSorting(a, b *Fix) int {"},
  {"line":1032,"text":"\tif res := v.compareModuleSpecifiersForRanking(a, b); res != 0 {"},
  {"line":1033,"text":"\t\treturn res"},
  {"line":1034,"text":"\t}"},
  {"line":1036,"text":"\tif strings.HasPrefix(a.ModuleSpecifier, \"./\") && !strings.HasPrefix(b.ModuleSpecifier, \"./\") {"},
  {"line":1037,"text":"\t\treturn -1"},
  {"line":1038,"text":"\t}"},
  {"line":1039,"text":"\tif strings.HasPrefix(b.ModuleSpecifier, \"./\") && !strings.HasPrefix(a.ModuleSpecifier, \"./\") {"},
  {"line":1040,"text":"\t\treturn 1"},
  {"line":1041,"text":"\t}"},
  {"line":1042,"text":"\tif comparison := strings.Compare(a.ModuleSpecifier, b.ModuleSpecifier); comparison != 0 {"},
  {"line":1043,"text":"\t\treturn comparison"},
  {"line":1044,"text":"\t}"},
  {"line":1045,"text":"\tif comparison := cmp.Compare(a.ImportKind, b.ImportKind); comparison != 0 {"},
  {"line":1046,"text":"\t\treturn comparison"},
  {"line":1047,"text":"\t}"},
  {"line":1049,"text":"\treturn 0"},
  {"line":1050,"text":"}"},
  {"line":1052,"text":"func (v *View) compareNodeCoreModuleSpecifiers(a, b string, importingFile *ast.SourceFile, program *compiler.Program) int {"},
  {"line":1053,"text":"\tif strings.HasPrefix(a, \"node:\") && !strings.HasPrefix(b, \"node:\") {"},
  {"line":1054,"text":"\t\tif v.shouldUseUriStyleNodeCoreModules.IsTrue() {"},
  {"line":1055,"text":"\t\t\treturn -1"},
  {"line":1056,"text":"\t\t} else if v.shouldUseUriStyleNodeCoreModules.IsFalse() {"},
  {"line":1057,"text":"\t\t\treturn 1"},
  {"line":1058,"text":"\t\t}"},
  {"line":1059,"text":"\t\treturn 0"},
  {"line":1060,"text":"\t}"},
  {"line":1061,"text":"\tif strings.HasPrefix(b, \"node:\") && !strings.HasPrefix(a, \"node:\") {"},
  {"line":1062,"text":"\t\tif v.shouldUseUriStyleNodeCoreModules.IsTrue() {"},
  {"line":1063,"text":"\t\t\treturn 1"},
  {"line":1064,"text":"\t\t} else if v.shouldUseUriStyleNodeCoreModules.IsFalse() {"},
  {"line":1065,"text":"\t\t\treturn -1"},
  {"line":1066,"text":"\t\t}"},
  {"line":1067,"text":"\t}"},
  {"line":1068,"text":"\treturn 0"},
  {"line":1069,"text":"}"},
  {"line":1076,"text":"func isFixPossiblyReExportingImportingFile(fix *Fix, importingFileName string) bool {"},
  {"line":1077,"text":"\tif fix.IsReExport && isIndexFileName(fix.ModuleFileName) {"},
  {"line":1078,"text":"\t\treExportDir := tspath.GetDirectoryPath(fix.ModuleFileName)"},
  {"line":1079,"text":"\t\treturn strings.HasPrefix(importingFileName, reExportDir)"},
  {"line":1080,"text":"\t}"},
  {"line":1081,"text":"\treturn false"},
  {"line":1082,"text":"}"},
  {"line":1084,"text":"func isIndexFileName(fileName string) bool {"},
  {"line":1085,"text":"\tlastSlash := strings.LastIndexByte(fileName, '/')"},
  {"line":1086,"text":"\tif lastSlash < 0 || len(fileName) <= lastSlash+1 {"},
  {"line":1087,"text":"\t\treturn false"},
  {"line":1088,"text":"\t}"},
  {"line":1089,"text":"\tfileName = fileName[lastSlash+1:]"},
  {"line":1090,"text":"\tswitch fileName {"},
  {"line":1091,"text":"\tcase \"index.js\", \"index.jsx\", \"index.d.ts\", \"index.ts\", \"index.tsx\":"},
  {"line":1092,"text":"\t\treturn true"},
  {"line":1093,"text":"\t}"},
  {"line":1094,"text":"\treturn false"},
  {"line":1095,"text":"}"},
  {"line":1097,"text":"func promoteFromTypeOnly("},
  {"line":1098,"text":"\tchanges *change.Tracker,"},
  {"line":1099,"text":"\taliasDeclaration *ast.Declaration,"},
  {"line":1100,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":1101,"text":"\tsourceFile *ast.SourceFile,"},
  {"line":1102,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":1103,"text":") *ast.Declaration {"},
  {"line":1105,"text":"\tconvertExistingToTypeOnly := compilerOptions.VerbatimModuleSyntax"},
  {"line":1107,"text":"\tswitch aliasDeclaration.Kind {"},
  {"line":1108,"text":"\tcase ast.KindImportSpecifier:"},
  {"line":1109,"text":"\t\tspec := aliasDeclaration.AsImportSpecifier()"},
  {"line":1110,"text":"\t\tif spec.IsTypeOnly {"},
  {"line":1111,"text":"\t\t\tif spec.Parent != nil && spec.Parent.Kind == ast.KindNamedImports {"},
  {"line":1112,"text":"\t\t\t\tnamedImportsNode := spec.Parent.AsNamedImports()"},
  {"line":1113,"text":"\t\t\t\telements := namedImportsNode.Elements.Nodes"},
  {"line":1114,"text":"\t\t\t\tif len(elements) > 1 {"},
  {"line":1116,"text":"\t\t\t\t\tvar propertyName *ast.Node"},
  {"line":1117,"text":"\t\t\t\t\tif spec.PropertyName != nil {"},
  {"line":1118,"text":"\t\t\t\t\t\tpropertyName = changes.NodeFactory.NewIdentifier(spec.PropertyName.Text()).AsIdentifier().AsNode()"},
  {"line":1119,"text":"\t\t\t\t\t}"},
  {"line":1120,"text":"\t\t\t\t\tnewSpecifier := changes.NodeFactory.NewImportSpecifier("},
  {"line":1121,"text":"\t\t\t\t\t\tfalse, // isTypeOnly = false"},
  {"line":1122,"text":"\t\t\t\t\t\tpropertyName,"},
  {"line":1123,"text":"\t\t\t\t\t\tchanges.NodeFactory.NewIdentifier(spec.Name().Text()),"},
  {"line":1124,"text":"\t\t\t\t\t)"},
  {"line":1125,"text":"\t\t\t\t\tspecifierComparer, _ := lsutil.GetNamedImportSpecifierComparerWithDetection("},
  {"line":1126,"text":"\t\t\t\t\t\tspec.Parent.Parent.Parent, // ImportDeclaration"},
  {"line":1127,"text":"\t\t\t\t\t\tsourceFile,"},
  {"line":1128,"text":"\t\t\t\t\t\tpreferences,"},
  {"line":1129,"text":"\t\t\t\t\t)"},
  {"line":1130,"text":"\t\t\t\t\tinsertionIndex := lsutil.GetImportSpecifierInsertionIndex(elements, newSpecifier, specifierComparer)"},
  {"line":1131,"text":"\t\t\t\t\tcurrentIndex := slices.Index(elements, aliasDeclaration)"},
  {"line":1132,"text":"\t\t\t\t\tif insertionIndex != currentIndex {"},
  {"line":1133,"text":"\t\t\t\t\t\tchanges.Delete(sourceFile, aliasDeclaration)"},
  {"line":1134,"text":"\t\t\t\t\t\tchanges.InsertImportSpecifierAtIndex(sourceFile, newSpecifier, spec.Parent, insertionIndex)"},
  {"line":1135,"text":"\t\t\t\t\t\treturn aliasDeclaration"},
  {"line":1136,"text":"\t\t\t\t\t}"},
  {"line":1137,"text":"\t\t\t\t}"},
  {"line":1139,"text":"\t\t\t\tfirstToken := lsutil.GetFirstToken(aliasDeclaration, sourceFile)"},
  {"line":1140,"text":"\t\t\t\ttypeKeywordPos := scanner.GetTokenPosOfNode(firstToken, sourceFile, false)"},
  {"line":1141,"text":"\t\t\t\tvar targetNode *ast.DeclarationName"},
  {"line":1142,"text":"\t\t\t\tif spec.PropertyName != nil {"},
  {"line":1143,"text":"\t\t\t\t\ttargetNode = spec.PropertyName"},
  {"line":1144,"text":"\t\t\t\t} else {"},
  {"line":1145,"text":"\t\t\t\t\ttargetNode = spec.Name()"},
  {"line":1146,"text":"\t\t\t\t}"},
  {"line":1147,"text":"\t\t\t\ttargetPos := scanner.GetTokenPosOfNode(targetNode.AsNode(), sourceFile, false)"},
  {"line":1148,"text":"\t\t\t\tchanges.DeleteRange(sourceFile, core.NewTextRange(typeKeywordPos, targetPos))"},
  {"line":1149,"text":"\t\t\t}"},
  {"line":1150,"text":"\t\t\treturn aliasDeclaration"},
  {"line":1151,"text":"\t\t} else {"},
  {"line":1153,"text":"\t\t\tif spec.Parent == nil || spec.Parent.Kind != ast.KindNamedImports {"},
  {"line":1154,"text":"\t\t\t\tpanic(\"ImportSpecifier parent must be NamedImports\")"},
  {"line":1155,"text":"\t\t\t}"},
  {"line":1156,"text":"\t\t\tif spec.Parent.Parent == nil || spec.Parent.Parent.Kind != ast.KindImportClause {"},
  {"line":1157,"text":"\t\t\t\tpanic(\"NamedImports parent must be ImportClause\")"},
  {"line":1158,"text":"\t\t\t}"},
  {"line":1159,"text":"\t\t\tpromoteImportClause(changes, spec.Parent.Parent.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)"},
  {"line":1160,"text":"\t\t\treturn spec.Parent.Parent"},
  {"line":1161,"text":"\t\t}"},
  {"line":1163,"text":"\tcase ast.KindImportClause:"},
  {"line":1164,"text":"\t\tpromoteImportClause(changes, aliasDeclaration.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)"},
  {"line":1165,"text":"\t\treturn aliasDeclaration"},
  {"line":1167,"text":"\tcase ast.KindNamespaceImport:"},
  {"line":1169,"text":"\t\tif aliasDeclaration.Parent == nil || aliasDeclaration.Parent.Kind != ast.KindImportClause {"},
  {"line":1170,"text":"\t\t\tpanic(\"NamespaceImport parent must be ImportClause\")"},
  {"line":1171,"text":"\t\t}"},
  {"line":1172,"text":"\t\tpromoteImportClause(changes, aliasDeclaration.Parent.AsImportClause(), compilerOptions, sourceFile, preferences, convertExistingToTypeOnly, aliasDeclaration)"},
  {"line":1173,"text":"\t\treturn aliasDeclaration.Parent"},
  {"line":1175,"text":"\tcase ast.KindImportEqualsDeclaration:"},
  {"line":1177,"text":"\t\timportEqDecl := aliasDeclaration.AsImportEqualsDeclaration()"},
  {"line":1179,"text":"\t\tscan := scanner.GetScannerForSourceFile(sourceFile, importEqDecl.Pos())"},
  {"line":1181,"text":"\t\tscan.Scan()"},
  {"line":1182,"text":"\t\tdeleteTypeKeyword(changes, sourceFile, scan.TokenStart())"},
  {"line":1183,"text":"\t\treturn aliasDeclaration"},
  {"line":1184,"text":"\tdefault:"},
  {"line":1185,"text":"\t\tpanic(fmt.Sprintf(\"Unexpected alias declaration kind: %v\", aliasDeclaration.Kind))"},
  {"line":1186,"text":"\t}"},
  {"line":1187,"text":"}"},
  {"line":1190,"text":"func promoteImportClause("},
  {"line":1191,"text":"\tchanges *change.Tracker,"},
  {"line":1192,"text":"\timportClause *ast.ImportClause,"},
  {"line":1193,"text":"\tcompilerOptions *core.CompilerOptions,"},
  {"line":1194,"text":"\tsourceFile *ast.SourceFile,"},
  {"line":1195,"text":"\tpreferences lsutil.UserPreferences,"},
  {"line":1196,"text":"\tconvertExistingToTypeOnly core.Tristate,"},
  {"line":1197,"text":"\taliasDeclaration *ast.Declaration,"},
  {"line":1198,"text":") {"},
  {"line":1200,"text":"\tif importClause.PhaseModifier == ast.KindTypeKeyword {"},
  {"line":1201,"text":"\t\tdeleteTypeKeyword(changes, sourceFile, importClause.Pos())"},
  {"line":1202,"text":"\t}"},
  {"line":1205,"text":"\tif compilerOptions.AllowImportingTsExtensions.IsFalse() {"},
  {"line":1206,"text":"\t\tmoduleSpecifier := checker.TryGetModuleSpecifierFromDeclaration(importClause.Parent)"},
  {"line":1207,"text":"\t\tif moduleSpecifier != nil {"},
  {"line":1210,"text":"\t\t}"},
  {"line":1211,"text":"\t}"},
  {"line":1216,"text":"\tif convertExistingToTypeOnly.IsTrue() {"},
  {"line":1217,"text":"\t\tnamedImports := importClause.NamedBindings"},
  {"line":1218,"text":"\t\tif namedImports != nil && namedImports.Kind == ast.KindNamedImports {"},
  {"line":1219,"text":"\t\t\tnamedImportsData := namedImports.AsNamedImports()"},
  {"line":1220,"text":"\t\t\tif len(namedImportsData.Elements.Nodes) > 1 {"},
  {"line":1222,"text":"\t\t\t\t_, isSorted := lsutil.GetNamedImportSpecifierComparerWithDetection("},
  {"line":1223,"text":"\t\t\t\t\timportClause.Parent,"},
  {"line":1224,"text":"\t\t\t\t\tsourceFile,"},
  {"line":1225,"text":"\t\t\t\t\tpreferences,"},
  {"line":1226,"text":"\t\t\t\t)"},
  {"line":1230,"text":"\t\t\t\tif isSorted.IsFalse() == false && // isSorted !== false"},
  {"line":1231,"text":"\t\t\t\t\taliasDeclaration != nil &&"},
  {"line":1232,"text":"\t\t\t\t\taliasDeclaration.Kind == ast.KindImportSpecifier {"},
  {"line":1234,"text":"\t\t\t\t\taliasIndex := -1"},
  {"line":1235,"text":"\t\t\t\t\tfor i, element := range namedImportsData.Elements.Nodes {"},
  {"line":1236,"text":"\t\t\t\t\t\tif element == aliasDeclaration {"},
  {"line":1237,"text":"\t\t\t\t\t\t\taliasIndex = i"},
  {"line":1238,"text":"\t\t\t\t\t\t\tbreak"},
  {"line":1239,"text":"\t\t\t\t\t\t}"},
  {"line":1240,"text":"\t\t\t\t\t}"},
  {"line":1242,"text":"\t\t\t\t\tif aliasIndex > 0 {"},
  {"line":1244,"text":"\t\t\t\t\t\tchanges.Delete(sourceFile, aliasDeclaration)"},
  {"line":1246,"text":"\t\t\t\t\t\tchanges.InsertImportSpecifierAtIndex(sourceFile, aliasDeclaration, namedImports, 0)"},
  {"line":1247,"text":"\t\t\t\t\t}"},
  {"line":1248,"text":"\t\t\t\t}"},
  {"line":1251,"text":"\t\t\t\tfor _, element := range namedImportsData.Elements.Nodes {"},
  {"line":1252,"text":"\t\t\t\t\tspec := element.AsImportSpecifier()"},
  {"line":1254,"text":"\t\t\t\t\tif aliasDeclaration != nil && aliasDeclaration.Kind == ast.KindImportSpecifier {"},
  {"line":1255,"text":"\t\t\t\t\t\tif element == aliasDeclaration {"},
  {"line":1256,"text":"\t\t\t\t\t\t\tcontinue"},
  {"line":1257,"text":"\t\t\t\t\t\t}"},
  {"line":1258,"text":"\t\t\t\t\t}"},
  {"line":1260,"text":"\t\t\t\t\tif !spec.IsTypeOnly {"},
  {"line":1261,"text":"\t\t\t\t\t\tchanges.InsertModifierBefore(sourceFile, ast.KindTypeKeyword, element)"},
  {"line":1262,"text":"\t\t\t\t\t}"},
  {"line":1263,"text":"\t\t\t\t}"},
  {"line":1264,"text":"\t\t\t}"},
  {"line":1265,"text":"\t\t}"},
  {"line":1266,"text":"\t}"},
  {"line":1267,"text":"}"},
  {"line":1271,"text":"func deleteTypeKeyword(changes *change.Tracker, sourceFile *ast.SourceFile, startPos int) {"},
  {"line":1272,"text":"\tscan := scanner.GetScannerForSourceFile(sourceFile, startPos)"},
  {"line":1273,"text":"\tif scan.Token() != ast.KindTypeKeyword {"},
  {"line":1274,"text":"\t\treturn"},
  {"line":1275,"text":"\t}"},
  {"line":1276,"text":"\ttypeStart := scan.TokenStart()"},
  {"line":1277,"text":"\ttypeEnd := scan.TokenEnd()"},
  {"line":1279,"text":"\ttext := sourceFile.Text()"},
  {"line":1280,"text":"\tfor typeEnd < len(text) && (text[typeEnd] == ' ' || text[typeEnd] == '\\t') {"},
  {"line":1281,"text":"\t\ttypeEnd++"},
  {"line":1282,"text":"\t}"},
  {"line":1283,"text":"\tchanges.DeleteRange(sourceFile, core.NewTextRange(typeStart, typeEnd))"},
  {"line":1284,"text":"}"},
  {"line":1286,"text":"func getModuleSpecifierText(promotedDeclaration *ast.Node) string {"},
  {"line":1287,"text":"\tif promotedDeclaration.Kind == ast.KindImportEqualsDeclaration {"},
  {"line":1288,"text":"\t\timportEqualsDeclaration := promotedDeclaration.AsImportEqualsDeclaration()"},
  {"line":1289,"text":"\t\tif ast.IsExternalModuleReference(importEqualsDeclaration.ModuleReference) {"},
  {"line":1290,"text":"\t\t\texpr := importEqualsDeclaration.ModuleReference.Expression()"},
  {"line":1291,"text":"\t\t\tif expr != nil {"},
  {"line":1292,"text":"\t\t\t\tif ast.IsStringLiteralLike(expr) {"},
  {"line":1293,"text":"\t\t\t\t\treturn expr.Text()"},
  {"line":1294,"text":"\t\t\t\t}"},
  {"line":1295,"text":"\t\t\t\treturn scanner.GetTextOfNode(expr)"},
  {"line":1296,"text":"\t\t\t}"},
  {"line":1297,"text":"\t\t}"},
  {"line":1298,"text":"\t\treturn scanner.GetTextOfNode(importEqualsDeclaration.ModuleReference)"},
  {"line":1299,"text":"\t}"},
  {"line":1300,"text":"\tmoduleSpecifier := promotedDeclaration.Parent.ModuleSpecifier()"},
  {"line":1301,"text":"\tif ast.IsStringLiteralLike(moduleSpecifier) {"},
  {"line":1302,"text":"\t\treturn moduleSpecifier.Text()"},
  {"line":1303,"text":"\t}"},
  {"line":1304,"text":"\treturn scanner.GetTextOfNode(moduleSpecifier)"},
  {"line":1305,"text":"}"},
  {"line":1308,"text":"func compareModuleSpecifierRelativity(a *Fix, b *Fix, preferences modulespecifiers.UserPreferences) int {"},
  {"line":1309,"text":"\tswitch preferences.ImportModuleSpecifierPreference {"},
  {"line":1310,"text":"\tcase modulespecifiers.ImportModuleSpecifierPreferenceNonRelative, modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative:"},
  {"line":1311,"text":"\t\treturn core.CompareBooleans(a.ModuleSpecifierKind == modulespecifiers.ResultKindRelative, b.ModuleSpecifierKind == modulespecifiers.ResultKindRelative)"},
  {"line":1312,"text":"\t}"},
  {"line":1313,"text":"\treturn 0"},
  {"line":1314,"text":"}"},
];

export function findLsAutoimportFixDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsAutoimportFixDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsAutoimportFixDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsAutoimportFixDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsAutoimportFixLineText(line: number): string | undefined {
  return lsAutoimportFixSourceLines.find((entry) => entry.line === line)?.text;
}
