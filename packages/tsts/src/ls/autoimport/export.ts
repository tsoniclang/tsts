import { SymbolFlags } from "../../ast/index.js";
import { isExternalModuleNameRelative, type Path } from "../../tspath/index.js";

export type ModuleID = string;

export interface ExportID {
  readonly moduleID: ModuleID;
  readonly exportName: string;
}

export type ExportSyntax = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const ExportSyntaxNone: ExportSyntax = 0;
export const ExportSyntaxModifier: ExportSyntax = 1;
export const ExportSyntaxNamed: ExportSyntax = 2;
export const ExportSyntaxDefaultModifier: ExportSyntax = 3;
export const ExportSyntaxDefaultDeclaration: ExportSyntax = 4;
export const ExportSyntaxEquals: ExportSyntax = 5;
export const ExportSyntaxUMD: ExportSyntax = 6;
export const ExportSyntaxStar: ExportSyntax = 7;
export const ExportSyntaxCommonJSModuleExports: ExportSyntax = 8;
export const ExportSyntaxCommonJSExportsProperty: ExportSyntax = 9;

export const internalSymbolNameDefault = "default";
export const internalSymbolNameExportEquals = "export=";

export interface ExportEntry extends ExportID {
  readonly moduleFileName: string;
  readonly syntax: ExportSyntax;
  readonly flags: SymbolFlags;
  readonly localName?: string;
  readonly through?: string;
  readonly target: ExportID;
  readonly isTypeOnly: boolean;
  readonly scriptElementKind?: number;
  readonly scriptElementKindModifiers?: number;
  readonly path: Path;
  readonly packageName: string;
}

export interface ExportSymbol {
  readonly name: string;
  readonly parent?: ExportSymbol;
  readonly declarations?: readonly ExportDeclaration[];
  readonly flags: SymbolFlags;
}

export interface ExportDeclaration {
  readonly sourceFile?: ExportSourceFile;
}

export interface ExportSourceFile {
  readonly symbol?: ExportSymbol;
  readonly path: Path;
  readonly fileName: string;
}

export interface ModuleExportInfo {
  readonly moduleID: ModuleID;
  readonly moduleFileName: string;
}

export interface ExportChecker {
  isExternalModuleSymbol(symbol: ExportSymbol): boolean;
  tryGetModuleIDAndFileNameOfModuleSymbol(symbol: ExportSymbol): ModuleExportInfo | undefined;
  getSourceFileOfModule(symbol: ExportSymbol): ExportSourceFile | undefined;
  getMergedSymbol(symbol: ExportSymbol): ExportSymbol;
  skipAlias(symbol: ExportSymbol): ExportSymbol;
  tryGetMemberInModuleExportsAndProperties(exportName: string, moduleSymbol: ExportSymbol): ExportSymbol | undefined;
  extractFirstExport(symbol: ExportSymbol, moduleID: ModuleID, moduleFileName: string, file: ExportSourceFile): ExportEntry | undefined;
}

export function exportName(entry: ExportEntry): string {
  if (entry.localName !== undefined && entry.localName !== "") {
    return entry.localName;
  }
  if (entry.exportName === internalSymbolNameExportEquals) {
    return entry.target.exportName;
  }
  return entry.exportName;
}

export function exportIsRenameable(entry: ExportEntry): boolean {
  return entry.exportName === internalSymbolNameExportEquals || entry.exportName === internalSymbolNameDefault;
}

export function exportAmbientModuleName(entry: ExportEntry): string {
  if (!isExternalModuleNameRelative(entry.moduleID)) {
    return entry.moduleID;
  }
  return "";
}

export function exportIsUnresolvedAlias(entry: ExportEntry): boolean {
  return entry.flags === SymbolFlags.Alias;
}

export function symbolToExport(symbol: ExportSymbol, checker: ExportChecker): ExportEntry | undefined {
  if (symbol.parent !== undefined && checker.isExternalModuleSymbol(symbol.parent)) {
    const moduleInfo = checker.tryGetModuleIDAndFileNameOfModuleSymbol(symbol.parent);
    if (moduleInfo !== undefined) {
      const file = checker.getSourceFileOfModule(symbol.parent);
      if (file === undefined) return undefined;
      return checker.extractFirstExport(symbol, moduleInfo.moduleID, moduleInfo.moduleFileName, file);
    }
    return undefined;
  }

  const declaration = symbol.declarations?.[0];
  if (declaration === undefined) return undefined;

  const file = declaration.sourceFile;
  if (file === undefined || file.symbol === undefined) return undefined;

  const moduleSymbol = checker.getMergedSymbol(file.symbol);
  const moduleID: ModuleID = file.path;
  const moduleFileName = file.fileName;
  const target = checker.getMergedSymbol(checker.skipAlias(symbol));

  return tryGetModuleExport(internalSymbolNameDefault, target, moduleSymbol, checker, moduleID, moduleFileName, file)
    ?? tryGetModuleExport(internalSymbolNameExportEquals, target, moduleSymbol, checker, moduleID, moduleFileName, file)
    ?? tryGetModuleExport(symbol.name, target, moduleSymbol, checker, moduleID, moduleFileName, file);
}

export function tryGetModuleExport(
  exportNameText: string,
  target: ExportSymbol,
  moduleSymbol: ExportSymbol,
  checker: ExportChecker,
  moduleID: ModuleID,
  moduleFileName: string,
  file: ExportSourceFile,
): ExportEntry | undefined {
  const exported = checker.tryGetMemberInModuleExportsAndProperties(exportNameText, moduleSymbol);
  if (exported !== undefined && checker.getMergedSymbol(checker.skipAlias(exported)) === target) {
    return checker.extractFirstExport(exported, moduleID, moduleFileName, file);
  }
  return undefined;
}
