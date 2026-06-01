import {
  Kind,
  SymbolFlags,
  getCombinedModifierFlags,
  getSourceFileOfNode,
  isExportAssignment,
  isExportSpecifier,
  isIdentifier,
  isModuleDeclaration,
  isObjectLiteralExpression,
  isPropertyAssignment,
  isShorthandPropertyAssignment,
  isSourceFile,
  nodeText,
  type Node,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../../ast/index.js";
import type { Checker } from "../../checker/index.js";
import { ModifierFlags } from "../../enums/modifierFlags.enum.js";
import type { Resolver } from "../../module/resolver.js";
import { getDirectoryPath, isExternalModuleNameRelative, resolvePath, type Path } from "../../tspath/index.js";
import {
  ExportSyntaxCommonJSExportsProperty,
  ExportSyntaxCommonJSModuleExports,
  ExportSyntaxDefaultDeclaration,
  ExportSyntaxDefaultModifier,
  ExportSyntaxEquals,
  ExportSyntaxModifier,
  ExportSyntaxNamed,
  ExportSyntaxNone,
  ExportSyntaxStar,
  ExportSyntaxUMD,
  internalSymbolNameDefault,
  internalSymbolNameExportEquals,
  type ExportEntry,
  type ExportID,
  type ExportSyntax,
  type ModuleID,
} from "./export.js";
import { getDefaultLikeExportNameFromDeclaration, tryGetModuleIDAndFileNameOfModuleSymbol } from "./util.js";
import { moduleSpecifierToValidIdentifier } from "../lsutil/utilities.js";
import { getSymbolKind, getSymbolModifiers, type SymbolDisplayTypeChecker } from "../lsutil/symbolDisplay.js";

const internalSymbolNameExportStar = "__export";

export class ExtractorStats {
  exports = 0;
  usedChecker = 0;
}

class CheckerLease {
  used = false;
  readonly checker: Checker;

  constructor(checker: Checker) {
    this.checker = checker;
  }

  getChecker(): Checker {
    this.used = true;
    return this.checker;
  }

  tryChecker(): Checker | undefined {
    return this.used ? this.checker : undefined;
  }
}

export interface SymbolExtractorOptions {
  readonly packageName: string;
  readonly checker: Checker;
  readonly toPath?: (fileName: string) => Path;
  readonly realpath?: (fileName: string) => string;
}

export interface ExportExtractorOptions extends SymbolExtractorOptions {
  readonly moduleResolver: Resolver;
}

export class SymbolExtractor {
  readonly packageName: string;
  readonly stats: ExtractorStats;
  readonly checker: Checker;
  readonly toPath: ((fileName: string) => Path) | undefined;
  readonly realpath: ((fileName: string) => string) | undefined;

  constructor(options: SymbolExtractorOptions) {
    this.packageName = options.packageName;
    this.checker = options.checker;
    this.stats = new ExtractorStats();
    this.toPath = options.toPath;
    this.realpath = options.realpath;
  }

  getModuleID(file: SourceFile): ModuleID {
    if (this.realpath !== undefined && this.toPath !== undefined) {
      return this.toPath(this.realpath(file.fileName));
    }
    return file.path;
  }

  getModuleIDForSymbol(symbol: AstSymbol): readonly [ModuleID, boolean] {
    const [moduleID, fileName, ok] = tryGetModuleIDAndFileNameOfModuleSymbol(symbol);
    if (!ok) return ["", false];
    if (fileName !== "" && this.realpath !== undefined) {
      const declaration = getNonAugmentationDeclaration(symbol);
      if (declaration !== undefined && isSourceFile(declaration)) {
        return [this.getModuleID(declaration), true];
      }
    }
    return [moduleID, true];
  }

  extractFromSymbol(
    name: string,
    symbol: AstSymbol,
    moduleID: ModuleID,
    moduleFileName: string,
    file: SourceFile,
    exports: ExportEntry[],
  ): void {
    if (shouldIgnoreSymbol(symbol)) return;

    if (name === internalSymbolNameExportStar) {
      const checkerLease = new CheckerLease(this.checker);
      const allExports = [...checkerExportsOfModule(this.checker, symbol.parent)];
      for (const [exportNameText, namedExport] of symbol.parent?.exports ?? []) {
        if (exportNameText === internalSymbolNameExportStar) continue;
        const index = allExports.indexOf(namedExport);
        if (index >= 0 || shouldIgnoreSymbol(namedExport)) {
          if (index >= 0) allExports.splice(index, 1);
        }
      }

      for (const reexportedSymbol of allExports) {
        const [entry] = this.createExport(reexportedSymbol, moduleID, moduleFileName, ExportSyntaxStar, file, checkerLease);
        if (entry === undefined) continue;
        const parent = checkerMergedSymbol(checkerLease.getChecker(), reexportedSymbol.parent);
        if (parent !== undefined && isExternalModuleSymbol(parent)) {
          const [targetModuleID, ok] = this.getModuleIDForSymbol(parent);
          if (ok) {
            exports.push({
              ...entry,
              target: {
                exportName: symbolName(reexportedSymbol),
                moduleID: targetModuleID,
              },
              through: internalSymbolNameExportStar,
            });
            continue;
          }
        }
        exports.push({ ...entry, through: internalSymbolNameExportStar });
      }
      return;
    }

    const syntax = getSyntax(symbol);
    const checkerLease = new CheckerLease(this.checker);
    const [entry, target] = this.createExport(symbol, moduleID, moduleFileName, syntax, file, checkerLease);
    if (entry === undefined) return;
    exports.push(entry);

    if (target !== undefined) {
      if (syntax === ExportSyntaxEquals && ((target.flags ?? 0) & SymbolFlags.Namespace) !== 0) {
        for (const [innerName, namedExport] of target.exports ?? []) {
          if (innerName === internalSymbolNameExportStar) continue;
          const [innerEntry] = this.createExport(namedExport, moduleID, moduleFileName, syntax, file, checkerLease);
          if (innerEntry !== undefined) exports.push({ ...innerEntry, through: name });
        }
      }
      return;
    }

    if (syntax !== ExportSyntaxCommonJSModuleExports) return;
    const declaration = symbol.declarations[0];
    if (declaration?.kind !== Kind.BinaryExpression) return;
    const expression = (declaration as { readonly right?: Node }).right;
    if (expression === undefined || !isObjectLiteralExpression(expression)) return;
    for (const property of expression.properties) {
      if (!isShorthandPropertyAssignment(property) && !(isPropertyAssignment(property) && property.name.kind === Kind.Identifier)) {
        continue;
      }
      const member = expression.symbol?.members?.get(nodeText(property.name));
      if (member === undefined) continue;
      const [propertyEntry] = this.createExport(member, moduleID, moduleFileName, syntax, file, checkerLease);
      if (propertyEntry !== undefined) exports.push({ ...propertyEntry, through: name });
    }
  }

  createExport(
    symbol: AstSymbol,
    moduleID: ModuleID,
    moduleFileName: string,
    syntax: ExportSyntax,
    file: SourceFile,
    checkerLease: CheckerLease,
  ): readonly [ExportEntry | undefined, AstSymbol | undefined] {
    if (shouldIgnoreSymbol(symbol)) return [undefined, undefined];

    let entry: ExportEntry = {
      moduleID,
      exportName: symbolName(symbol),
      moduleFileName,
      syntax,
      flags: combinedLocalAndExportSymbolFlags(symbol),
      path: file.path,
      packageName: this.packageName,
      target: emptyTarget(),
      isTypeOnly: false,
    };

    if (syntax === ExportSyntaxUMD) {
      entry = {
        ...entry,
        exportName: internalSymbolNameExportEquals,
        localName: symbolName(symbol),
      };
    }

    let targetSymbol: AstSymbol | undefined;
    if (((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0) {
      targetSymbol = this.tryResolveSymbol(symbol, syntax, checkerLease);
      if (targetSymbol !== undefined) {
        let declaration = targetSymbol.declarations[0];
        if (declaration === undefined && hasMappedCheckFlag(targetSymbol)) {
          const mappedSymbol = checkerMappedTypeSymbolOfProperty(checkerLease.getChecker(), targetSymbol);
          declaration = mappedSymbol?.declarations[0];
        }
        declaration ??= symbol.declarations[0];
        if (declaration === undefined) {
          throw new Error("auto-import export extraction found an aliased symbol without a declaration");
        }

        const activeChecker = checkerLease.tryChecker();
        const parent = activeChecker === undefined ? targetSymbol.parent : checkerMergedSymbol(activeChecker, targetSymbol.parent);
        const sourceFile = getSourceFileOfNode(declaration);
        let targetModuleID: ModuleID = sourceFile !== undefined && isSourceFile(sourceFile) ? sourceFile.path : moduleID;
        if (parent !== undefined && isExternalModuleSymbol(parent)) {
          const [candidateModuleID, ok] = this.getModuleIDForSymbol(parent);
          if (ok) targetModuleID = candidateModuleID;
        }

        entry = {
          ...entry,
          flags: activeChecker === undefined ? targetSymbol.flags ?? 0 : checkerSymbolFlags(activeChecker, targetSymbol),
          isTypeOnly: activeChecker === undefined
            ? symbol.declarations.some(isPartOfTypeOnlyImportOrExportDeclaration)
            : checkerTypeOnlyAliasDeclaration(activeChecker, symbol) !== undefined,
          scriptElementKind: getSymbolKind(activeChecker as SymbolDisplayTypeChecker | undefined, targetSymbol, declaration),
          scriptElementKindModifiers: getSymbolModifiers(activeChecker as SymbolDisplayTypeChecker | undefined, targetSymbol),
          target: {
            exportName: symbolName(targetSymbol),
            moduleID: targetModuleID,
          },
        };
      }
    } else {
      const declaration = symbol.declarations[0];
      if (declaration !== undefined) {
        const activeChecker = checkerLease.tryChecker() as SymbolDisplayTypeChecker | undefined;
        entry = {
          ...entry,
          scriptElementKind: getSymbolKind(activeChecker, symbol, declaration),
          scriptElementKindModifiers: getSymbolModifiers(activeChecker, symbol),
        };
      }
    }

    if (symbolName(symbol) === internalSymbolNameDefault || symbolName(symbol) === internalSymbolNameExportEquals) {
      let namedSymbol = getLocalSymbolForExportDefault(symbol) ?? symbol;
      let localName = getDefaultLikeExportNameFromDeclaration(namedSymbol);
      if (isUnusableName(localName)) localName = entry.target.exportName;
      if (isUnusableName(localName) && targetSymbol !== undefined) {
        namedSymbol = getLocalSymbolForExportDefault(targetSymbol) ?? targetSymbol;
        localName = getDefaultLikeExportNameFromDeclaration(namedSymbol);
      }
      if (isUnusableName(localName)) {
        localName = moduleSpecifierToValidIdentifier(fileNameForDefaultExportName(targetSymbol, moduleFileName, moduleID), false);
      }
      entry = { ...entry, localName };
    }

    if (isUnusableName(exportName(entry))) return [undefined, undefined];

    this.stats.exports += 1;
    if (checkerLease.tryChecker() !== undefined) {
      this.stats.usedChecker += 1;
    }
    return [entry, targetSymbol];
  }

  tryResolveSymbol(symbol: AstSymbol, syntax: ExportSyntax, checkerLease: CheckerLease): AstSymbol | undefined {
    if (!isNonLocalAlias(symbol)) return symbol;

    let location: Node | undefined;
    let name = "";
    if (syntax === ExportSyntaxNamed) {
      const declaration = getDeclarationOfKind(symbol, Kind.ExportSpecifier);
      const exportDeclaration = declaration?.parent?.parent as { readonly moduleSpecifier?: Node } | undefined;
      if (declaration !== undefined && exportDeclaration?.moduleSpecifier === undefined) {
        const node = (declaration as { readonly name?: Node; readonly propertyName?: Node }).name
          ?? (declaration as { readonly name?: Node; readonly propertyName?: Node }).propertyName;
        if (node !== undefined && isIdentifier(node)) {
          location = node;
          name = node.text;
        }
      }
    } else if (
      syntax === ExportSyntaxDefaultDeclaration
      || (syntax === ExportSyntaxEquals && symbolName(symbol) === internalSymbolNameExportEquals)
    ) {
      const declaration = getDeclarationOfKind(symbol, Kind.ExportAssignment);
      const expression = declaration !== undefined && isExportAssignment(declaration) ? declaration.expression : undefined;
      if (expression !== undefined && isIdentifier(expression)) {
        location = expression;
        name = expression.text;
      }
    }

    if (location !== undefined) {
      const local = resolveLocalName(location, name);
      if (local !== undefined && !isNonLocalAlias(local)) return local;
    }

    const checker = checkerLease.getChecker();
    const resolved = checkerAliasedSymbol(checker, symbol);
    if (resolved !== undefined && !checkerUnknownSymbol(checker, resolved)) return resolved;
    return undefined;
  }
}

export class ExportExtractor extends SymbolExtractor {
  readonly moduleResolver: Resolver;

  constructor(options: ExportExtractorOptions) {
    super(options);
    this.moduleResolver = options.moduleResolver;
  }

  getStats(): ExtractorStats {
    return this.stats;
  }

  extractFromFile(file: SourceFile): readonly ExportEntry[] {
    if (file.symbol !== undefined) return this.extractFromModule(file);
    if (file.ambientModuleNames.length === 0) return [];

    const exports: ExportEntry[] = [];
    for (const statement of file.statements) {
      if (!isModuleWithStringLiteralName(statement)) continue;
      const declarationSymbol = statement.symbol;
      if (declarationSymbol === undefined) continue;
      this.extractFromModuleDeclaration(statement, file, nodeText(statement.name), "", exports);
    }
    return exports;
  }

  extractFromModule(file: SourceFile): readonly ExportEntry[] {
    const moduleAugmentations = file.moduleAugmentations
      .map(name => name.parent)
      .filter((declaration): declaration is Node => declaration !== undefined && isModuleDeclaration(declaration) && !isGlobalScopeAugmentation(declaration));
    const moduleID = this.getModuleID(file);
    const exports: ExportEntry[] = [];
    for (const [name, symbol] of file.symbol?.exports ?? []) {
      this.extractFromSymbol(name, symbol, moduleID, file.fileName, file, exports);
    }
    for (const declaration of moduleAugmentations) {
      const nameNode = (declaration as unknown as { readonly name: Node }).name;
      if (nameNode.kind !== Kind.StringLiteral) continue;
      const name = nodeText(nameNode);
      let augmentationModuleID: ModuleID = name;
      let moduleFileName = "";
      if (isExternalModuleNameRelative(name) && this.toPath !== undefined) {
        const resolved = this.moduleResolver.resolveModuleName(name, file.fileName, undefined, undefined).resolvedModule;
        if (resolved !== undefined) {
          moduleFileName = resolved.resolvedFileName;
          augmentationModuleID = this.toPath(moduleFileName);
        } else {
          moduleFileName = resolvePath(getDirectoryPath(file.fileName), name);
          augmentationModuleID = this.toPath(moduleFileName);
        }
      }
      this.extractFromModuleDeclaration(declaration, file, augmentationModuleID, moduleFileName, exports);
    }
    return exports;
  }

  extractFromModuleDeclaration(
    declaration: Node & { readonly symbol?: AstSymbol },
    file: SourceFile,
    moduleID: ModuleID,
    moduleFileName: string,
    exports: ExportEntry[],
  ): void {
    for (const [name, symbol] of declaration.symbol?.exports ?? []) {
      this.extractFromSymbol(name, symbol, moduleID, moduleFileName, file, exports);
    }
  }
}

export function newSymbolExtractor(
  packageName: string,
  checker: Checker,
  toPath?: (fileName: string) => Path,
  realpath?: (fileName: string) => string,
): SymbolExtractor {
  const options: SymbolExtractorOptions = { packageName, checker };
  if (toPath !== undefined) {
    (options as { toPath: (fileName: string) => Path }).toPath = toPath;
  }
  if (realpath !== undefined) {
    (options as { realpath: (fileName: string) => string }).realpath = realpath;
  }
  return new SymbolExtractor(options);
}

export function newExportExtractor(options: ExportExtractorOptions): ExportExtractor {
  return new ExportExtractor(options);
}

export function shouldIgnoreSymbol(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Prototype) !== 0;
}

export function getSyntax(symbol: AstSymbol): ExportSyntax {
  for (const declaration of symbol.declarations) {
    switch (declaration.kind) {
      case Kind.ExportSpecifier:
        return ExportSyntaxNamed;
      case Kind.ExportAssignment:
        return isExportAssignment(declaration) && declaration.isExportEquals
          ? ExportSyntaxEquals
          : ExportSyntaxDefaultDeclaration;
      case Kind.NamespaceExportDeclaration:
        return ExportSyntaxUMD;
      case Kind.BinaryExpression: {
        const assignmentKind = getAssignmentDeclarationKind(declaration);
        if (assignmentKind === "moduleExports") return ExportSyntaxCommonJSModuleExports;
        if (assignmentKind === "exportsProperty") return ExportSyntaxCommonJSExportsProperty;
        break;
      }
      default:
        return (getCombinedModifierFlags(declaration) & ModifierFlags.Default) !== 0
          ? ExportSyntaxDefaultModifier
          : ExportSyntaxModifier;
    }
  }
  return ExportSyntaxNone;
}

export function isUnusableName(name: string | undefined): boolean {
  return name === undefined
    || name === ""
    || name === "_default"
    || name === internalSymbolNameExportStar
    || name === internalSymbolNameDefault
    || name === internalSymbolNameExportEquals;
}

export function fileNameForDefaultExportName(
  targetSymbol: AstSymbol | undefined,
  moduleFileName: string,
  moduleID: ModuleID,
): string {
  const declaration = targetSymbol?.declarations[0];
  if (declaration !== undefined) {
    const file = getSourceFileOfNode(declaration);
    if (file !== undefined && isSourceFile(file) && file.fileName !== "") return file.fileName;
  }
  if (moduleFileName !== "") return moduleFileName;
  return moduleID;
}

function exportName(entry: ExportEntry): string {
  if (entry.localName !== undefined && entry.localName !== "") return entry.localName;
  if (entry.exportName === internalSymbolNameExportEquals) return entry.target.exportName;
  return entry.exportName;
}

function emptyTarget(): ExportID {
  return { moduleID: "", exportName: "" };
}

function getNonAugmentationDeclaration(symbol: AstSymbol): Node | undefined {
  return symbol.declarations.find(declaration => !isGlobalScopeAugmentation(declaration));
}

function isGlobalScopeAugmentation(node: Node): boolean {
  return node.kind === Kind.ModuleDeclaration && nodeText((node as { readonly name?: Node }).name) === "global";
}

function isModuleWithStringLiteralName(node: Node): node is Node & { readonly name: Node; readonly symbol?: AstSymbol } {
  return node.kind === Kind.ModuleDeclaration && (node as { readonly name?: Node }).name?.kind === Kind.StringLiteral;
}

function isExternalModuleSymbol(symbol: AstSymbol): boolean {
  const externalModuleResult = (symbol as { readonly isExternalModule?: () => boolean }).isExternalModule?.();
  if (externalModuleResult !== undefined) return externalModuleResult;
  return ((symbol.flags ?? 0) & SymbolFlags.Module) !== 0 && symbolName(symbol).startsWith("\"");
}

function symbolName(symbol: AstSymbol | undefined): string {
  return symbol?.name ?? symbol?.escapedName ?? "";
}

function combinedLocalAndExportSymbolFlags(symbol: AstSymbol): SymbolFlags {
  return ((symbol.flags ?? 0) | (symbol.exportSymbol?.flags ?? 0)) as SymbolFlags;
}

function isNonLocalAlias(symbol: AstSymbol): boolean {
  return ((symbol.flags ?? 0) & SymbolFlags.Alias) !== 0 && symbol.declarations.some(isAliasExportOrImport);
}

function isAliasExportOrImport(node: Node): boolean {
  return node.kind === Kind.ExportSpecifier
    || node.kind === Kind.ExportAssignment
    || node.kind === Kind.ImportSpecifier
    || node.kind === Kind.ImportClause
    || node.kind === Kind.NamespaceImport
    || node.kind === Kind.ImportEqualsDeclaration;
}

function getDeclarationOfKind(symbol: AstSymbol, kind: Kind): Node | undefined {
  return symbol.declarations.find(declaration => declaration.kind === kind);
}

function resolveLocalName(location: Node, name: string): AstSymbol | undefined {
  let current: Node | undefined = location;
  while (current !== undefined) {
    const local = current.locals?.get(name);
    if (local !== undefined) return local;
    current = current.parent;
  }
  return undefined;
}

function checkerExportsOfModule(checker: Checker, symbol: AstSymbol | undefined): readonly AstSymbol[] {
  if (symbol === undefined) return [];
  const method = checker as Checker & { readonly getExportsOfModule?: (symbol: AstSymbol) => readonly AstSymbol[] | ReadonlyMap<string, AstSymbol> };
  const exports = method.getExportsOfModule?.(symbol);
  if (exports === undefined) return [...(symbol.exports?.values() ?? [])];
  return isSymbolMap(exports) ? [...exports.values()] : [...exports];
}

function isSymbolMap(value: readonly AstSymbol[] | ReadonlyMap<string, AstSymbol>): value is ReadonlyMap<string, AstSymbol> {
  return typeof (value as ReadonlyMap<string, AstSymbol>).values === "function"
    && typeof (value as ReadonlyMap<string, AstSymbol>).get === "function";
}

function checkerMergedSymbol(checker: Checker, symbol: AstSymbol | undefined): AstSymbol | undefined {
  if (symbol === undefined) return undefined;
  const method = checker as Checker & { readonly getMergedSymbol?: (symbol: AstSymbol | undefined) => AstSymbol | undefined };
  return method.getMergedSymbol?.(symbol) ?? symbol;
}

function checkerAliasedSymbol(checker: Checker, symbol: AstSymbol): AstSymbol | undefined {
  const method = checker as Checker & { readonly getAliasedSymbol?: (symbol: AstSymbol) => AstSymbol | undefined };
  return method.getAliasedSymbol?.(symbol)
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).aliasTarget
    ?? (symbol as { readonly aliasTarget?: AstSymbol; readonly target?: AstSymbol }).target
    ?? symbol;
}

function checkerUnknownSymbol(checker: Checker, symbol: AstSymbol | undefined): boolean {
  const method = checker as Checker & { readonly isUnknownSymbol?: (symbol: AstSymbol | undefined) => boolean };
  return method.isUnknownSymbol?.(symbol) ?? symbolName(symbol) === "unknown";
}

function checkerSymbolFlags(checker: Checker, symbol: AstSymbol): SymbolFlags {
  const method = checker as Checker & { readonly getSymbolFlags?: (symbol: AstSymbol) => number };
  return (method.getSymbolFlags?.(symbol) ?? symbol.flags ?? 0) as SymbolFlags;
}

function checkerTypeOnlyAliasDeclaration(checker: Checker, symbol: AstSymbol): Node | undefined {
  const method = checker as Checker & { readonly getTypeOnlyAliasDeclaration?: (symbol: AstSymbol) => Node | undefined };
  return method.getTypeOnlyAliasDeclaration?.(symbol);
}

function checkerMappedTypeSymbolOfProperty(checker: Checker, symbol: AstSymbol): AstSymbol | undefined {
  const method = checker as Checker & { readonly getMappedTypeSymbolOfProperty?: (symbol: AstSymbol) => AstSymbol | undefined };
  return method.getMappedTypeSymbolOfProperty?.(symbol);
}

function hasMappedCheckFlag(symbol: AstSymbol): boolean {
  return ((symbol as { readonly checkFlags?: number; readonly CheckFlags?: number }).checkFlags
    ?? (symbol as { readonly checkFlags?: number; readonly CheckFlags?: number }).CheckFlags
    ?? 0) !== 0;
}

function isPartOfTypeOnlyImportOrExportDeclaration(node: Node): boolean {
  let current: Node | undefined = node;
  while (current !== undefined) {
    if ((isExportSpecifier(current) && current.isTypeOnly) || (current.kind === Kind.ImportSpecifier && (current as { readonly isTypeOnly?: boolean }).isTypeOnly === true)) {
      return true;
    }
    if ((current.kind === Kind.ExportDeclaration || current.kind === Kind.ImportDeclaration) && (current as { readonly isTypeOnly?: boolean }).isTypeOnly === true) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

function getLocalSymbolForExportDefault(symbol: AstSymbol): AstSymbol | undefined {
  return (symbol as { readonly localSymbol?: AstSymbol }).localSymbol
    ?? symbol.declarations.find(declaration => declaration.localSymbol !== undefined)?.localSymbol;
}

function getAssignmentDeclarationKind(node: Node): "none" | "moduleExports" | "exportsProperty" {
  if (node.kind !== Kind.BinaryExpression) return "none";
  const left = (node as { readonly left?: Node }).left;
  if (left === undefined) return "none";
  if (isModuleExportsAccess(left)) return "moduleExports";
  if (isExportsPropertyAccess(left)) return "exportsProperty";
  return "none";
}

function isModuleExportsAccess(node: Node): boolean {
  if (node.kind !== Kind.PropertyAccessExpression) return false;
  const access = node as { readonly expression?: Node; readonly name?: Node };
  return nodeText(access.name) === "exports"
    && access.expression?.kind === Kind.Identifier
    && nodeText(access.expression) === "module";
}

function isExportsPropertyAccess(node: Node): boolean {
  if (node.kind !== Kind.PropertyAccessExpression) return false;
  const access = node as { readonly expression?: Node; readonly name?: Node };
  return access.name !== undefined
    && access.expression?.kind === Kind.Identifier
    && nodeText(access.expression) === "exports";
}
