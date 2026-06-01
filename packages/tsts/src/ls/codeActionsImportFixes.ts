/**
 * Import-related code fixes.
 *
 * Porting surface for TS-Go `internal/ls/codeactions_importfixes.go`.
 */

import {
  Kind,
  SymbolFlags,
  type Node as AstNode,
  type SourceFile,
  type Symbol as AstSymbol,
} from "../ast/index.js";
import {
  isIdentifier,
  isJsxClosingElement,
  isJsxOpeningFragment,
  isJsxOpeningLikeElement,
} from "../ast/index.js";
import { getTokenAtPositionPublic } from "../astnav/tokens.js";
import { TextRange } from "../core/index.js";
import { JsxEmit, type JsxEmit as JsxEmitValue } from "../core/index.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { Diagnostic as CompilerDiagnostic } from "../diagnostics/types.js";
import {
  AddAsTypeOnlyNotAllowed,
  AutoImportFixKindPromoteTypeOnly,
  ImportKindNamed,
  type Position,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import { ResultKind } from "../modulespecifiers/index.js";
import { isIntrinsicJsxName } from "../scanner/utilities.js";
import { isDynamicFileName } from "../tspath/index.js";
import {
  type CodeAction,
  type CodeActionLanguageService,
  type CodeActionProgram,
  type CodeActionSourceFile,
  type CodeFixContext,
  type CodeFixProvider,
  type CombinedCodeActions,
  containsErrorCode,
} from "./codeActions.js";
import { getAllDiagnostics } from "./diagnostics.js";
import { isTypeOnlyImportOrExportDeclaration } from "../checker/exports.js";
import {
  QueryKind,
  View,
  type ExportEntry,
} from "./autoimport/index.js";
import {
  newImportAdder,
  type ImportAdder,
} from "./autoimport/importAdder.js";
import type { Fix } from "./autoimport/fix.js";

export const importFixErrorCodes: readonly number[] = [
  Diagnostics.Cannot_find_name_0.code,
  Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
  Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
  Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
  Diagnostics.Cannot_find_namespace_0.code,
  Diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code,
  Diagnostics.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here.code,
  Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.code,
  Diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig.code,
  Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode.code,
  Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig.code,
  Diagnostics.Cannot_find_namespace_0_Did_you_mean_1.code,
  Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code,
  Diagnostics.This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found.code,
];

export const importFixID = "fixMissingImport";

export interface ImportFixSourceFile extends CodeActionSourceFile {
  readonly kind?: Kind;
  readonly statements?: unknown;
  readonly root?: SourceFile;
}

export interface ImportFixCompilerOptions {
  readonly jsx?: JsxEmitValue;
  getEmitDeclarations(): boolean;
}

export interface ImportFixChecker {
  getResolvedSymbol?(node: AstNode): AstSymbol | undefined;
  resolveName?(name: string, location: AstNode, meaning: SymbolFlags, excludeGlobals: boolean): AstSymbol | undefined;
  getJsxNamespace?(location: AstNode): string;
  getTypeOnlyAliasDeclaration?(symbol: AstSymbol): AstNode | undefined;
}

export interface ImportFixProgram extends CodeActionProgram<ImportFixSourceFile> {
  options(): ImportFixCompilerOptions;
  getTypeChecker?(): ImportFixChecker | [ImportFixChecker, () => void];
}

export interface ImportFixLanguageService extends CodeActionLanguageService<ImportFixProgram, ImportFixSourceFile> {
  getPreparedAutoImportView?(sourceFile: ImportFixSourceFile): View | undefined;
  getCurrentAutoImportView?(sourceFile: ImportFixSourceFile): View | undefined;
  formatOptions?(): unknown;
  userPreferences?(): unknown;
}

export type ImportFixContext = CodeFixContext<ImportFixProgram, ImportFixSourceFile> & {
  readonly languageService: ImportFixLanguageService;
};

export interface FixInfo {
  readonly fix: Fix;
  readonly symbolName: string;
  readonly errorIdentifierText: string;
  readonly isJsxNamespaceFix: boolean;
}

export const ImportFixProvider: CodeFixProvider<ImportFixProgram, ImportFixSourceFile> = {
  errorCodes: importFixErrorCodes,
  getCodeActions: getImportCodeActions,
  fixIds: [importFixID],
  getAllCodeActions: getAllImportCodeActions,
};

export function getImportCodeActions(fixContext: ImportFixContext): readonly CodeAction[] {
  const info = getFixInfos(fixContext, fixContext.errorCode ?? 0, fixContext.span?.pos ?? 0);
  if (info.length === 0) return [];

  const actions: CodeAction[] = [];
  for (const fixInfo of info) {
    const editResult = editsForFix(fixInfo.fix);
    actions.push({
      description: editResult.description,
      changes: editResult.changes,
      fixId: importFixID,
      fixAllDescription: Diagnostics.Add_all_missing_imports.message,
    });
  }
  return actions;
}

export function getAllImportCodeActions(fixContext: ImportFixContext): CombinedCodeActions | undefined {
  if (isDynamicFileName(fixContext.sourceFile.fileName)) return undefined;

  const importDiagnostics = getAllDiagnostics(fixContext.program, fixContext.sourceFile)
    .filter((diagnostic) => containsErrorCode(importFixErrorCodes, diagnostic.code));
  if (importDiagnostics.length === 0) return undefined;

  const view = fixContext.languageService.getPreparedAutoImportView?.(fixContext.sourceFile)
    ?? fixContext.languageService.getCurrentAutoImportView?.(fixContext.sourceFile);
  if (view === undefined) return undefined;

  const importAdderOptions = {
    view: viewForImportAdder(view),
  };
  const checker = checkerForImportAdder(fixContext.program);
  const importAdder = checker === undefined
    ? newImportAdder(importAdderOptions)
    : newImportAdder({ ...importAdderOptions, checker });

  for (const diagnostic of importDiagnostics) {
    addImportFromDiagnostic(importAdder, diagnostic, fixContext);
  }

  if (!importAdder.hasFixes()) return undefined;
  return {
    description: Diagnostics.Add_all_missing_imports.message,
    changes: importAdder.edits(),
  };
}

export function addImportFromDiagnostic(
  importAdder: ImportAdder,
  diagnostic: CompilerDiagnostic,
  fixContext: ImportFixContext,
): void {
  const start = diagnostic.start ?? 0;
  const length = diagnostic.length ?? 0;
  const diagnosticContext: ImportFixContext = {
    ...fixContext,
    span: new TextRange(start, start + length),
    errorCode: diagnostic.code,
  };
  const infos = getFixInfos(diagnosticContext, diagnostic.code, start);
  if (infos.length > 0) importAdder.addImportFix(infos[0]!.fix);
}

export function getFixInfos(fixContext: ImportFixContext, errorCode: number, position: number): readonly FixInfo[] {
  if (isDynamicFileName(fixContext.sourceFile.fileName)) return [];

  const astSourceFile = sourceFileForAst(fixContext.sourceFile);
  if (astSourceFile === undefined) return [];

  const symbolToken = getTokenAtPositionPublic(astSourceFile, position);
  if (symbolToken === undefined) return [];

  let view: View | undefined;
  let info: readonly FixInfo[] = [];

  if (errorCode === Diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code) {
    view = fixContext.languageService.getCurrentAutoImportView?.(fixContext.sourceFile);
    info = view === undefined ? [] : getFixesInfoForUMDImport(fixContext, symbolToken, view);
  } else if (!isIdentifier(symbolToken)) {
    return [];
  } else if (errorCode === Diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code) {
    const checker = getChecker(fixContext.program);
    if (checker === undefined) return [];
    const symbolNames = getSymbolNamesToImport(astSourceFile, checker, symbolToken, fixContext.program.options());
    const allTypeOnlyFixes: FixInfo[] = [];

    for (const symbolName of symbolNames) {
      if (!symbolName.isTypeOnly) continue;
      const fix = getTypeOnlyPromotionFix(astSourceFile, symbolToken, symbolName.name, fixContext.program);
      if (fix !== undefined) {
        allTypeOnlyFixes.push({
          fix,
          symbolName: symbolName.name,
          errorIdentifierText: symbolToken.text,
          isJsxNamespaceFix: false,
        });
      }
    }

    const diagnosticMessage = fixContext.diagnostic?.message ?? "";
    if (allTypeOnlyFixes.length > 1 && diagnosticMessage !== "") {
      const matching = allTypeOnlyFixes.filter((fix) => diagnosticMessage.includes("'" + fix.symbolName + "'"));
      if (matching.length > 0) return matching;
    }
    return allTypeOnlyFixes;
  } else {
    view = fixContext.languageService.getPreparedAutoImportView?.(fixContext.sourceFile);
    if (view !== undefined) {
      info = getFixesInfoForNonUMDImport(fixContext, symbolToken, view);
    }
  }

  view ??= fixContext.languageService.getCurrentAutoImportView?.(fixContext.sourceFile);
  return view === undefined ? info : sortFixInfo(info, view);
}

export function getFixesInfoForUMDImport(
  fixContext: ImportFixContext,
  token: AstNode,
  view: View,
): readonly FixInfo[] {
  const checker = getChecker(fixContext.program);
  if (checker === undefined) return [];

  const umdSymbol = getUmdSymbol(token, checker);
  if (umdSymbol === undefined) return [];

  const symbolName = symbolNameOf(umdSymbol);
  if (symbolName === "") return [];

  const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(token);
  const result: FixInfo[] = [];
  for (const exportEntry of view.search(symbolName, QueryKind.ExactMatch)) {
    for (const fix of viewFixes(view, exportEntry, false, isValidTypeOnlyUseSite, undefined)) {
      result.push({
        fix,
        symbolName,
        errorIdentifierText: isIdentifier(token) ? token.text : "",
        isJsxNamespaceFix: false,
      });
    }
  }
  return result;
}

export function getUmdSymbol(token: AstNode, checker: ImportFixChecker): AstSymbol | undefined {
  let umdSymbol: AstSymbol | undefined;
  if (isIdentifier(token)) umdSymbol = checker.getResolvedSymbol?.(token);
  if (isUMDExportSymbol(umdSymbol)) return umdSymbol;

  const parent = token.parent;
  if (
    (parent !== undefined && isJsxOpeningLikeElement(parent) && parent.tagName === token)
    || (parent !== undefined && isJsxOpeningFragment(parent))
  ) {
    const location = isJsxOpeningLikeElement(parent) ? token : parent;
    const jsxNamespace = checker.getJsxNamespace?.(parent) ?? "";
    const parentSymbol = jsxNamespace === ""
      ? undefined
      : checker.resolveName?.(jsxNamespace, location, SymbolFlags.Value, false);
    if (isUMDExportSymbol(parentSymbol)) return parentSymbol;
  }
  return undefined;
}

export function isUMDExportSymbol(symbol: AstSymbol | undefined): boolean {
  return symbol !== undefined
    && symbol.declarations.length > 0
    && symbol.declarations[0] !== undefined
    && symbol.declarations[0]!.kind === Kind.NamespaceExportDeclaration;
}

export function getFixesInfoForNonUMDImport(
  fixContext: ImportFixContext,
  symbolToken: AstNode,
  view: View,
): readonly FixInfo[] {
  if (!isIdentifier(symbolToken)) return [];

  const astSourceFile = sourceFileForAst(fixContext.sourceFile);
  const checker = getChecker(fixContext.program);
  if (astSourceFile === undefined || checker === undefined) return [];

  const isValidTypeOnlyUseSite = isValidTypeOnlyAliasUseSite(symbolToken);
  const symbolNames = getSymbolNamesToImport(astSourceFile, checker, symbolToken, fixContext.program.options());
  const usagePosition = positionAt(fixContext.sourceFile, symbolToken.pos);
  const allInfo: FixInfo[] = [];

  for (const symbolNameInfo of symbolNames) {
    if (symbolNameInfo.isTypeOnly) continue;

    const symbolName = symbolNameInfo.name;
    if (symbolName === "default") continue;

    const isJSXTagName = symbolName === symbolToken.text && isJsxTagName(symbolToken);
    const queryKind = isJSXTagName ? QueryKind.CaseInsensitiveMatch : QueryKind.ExactMatch;

    for (const exportEntry of view.search(symbolName, queryKind)) {
      const exportName = exportNameOf(exportEntry);
      if (isJSXTagName && !(exportName === symbolName || exportIsRenameable(exportEntry))) continue;

      for (const fix of viewFixes(view, exportEntry, isJSXTagName, isValidTypeOnlyUseSite, usagePosition)) {
        allInfo.push({
          fix,
          symbolName,
          errorIdentifierText: "",
          isJsxNamespaceFix: symbolName !== symbolToken.text,
        });
      }
    }
  }

  return allInfo;
}

export function getTypeOnlyPromotionFix(
  sourceFile: SourceFile,
  symbolToken: AstNode,
  symbolName: string,
  program: ImportFixProgram,
): Fix | undefined {
  const checker = getChecker(program);
  const symbol = checker?.resolveName?.(symbolName, symbolToken, SymbolFlags.Value, true);
  if (symbol === undefined) return undefined;

  const typeOnlyAliasDeclaration = checker?.getTypeOnlyAliasDeclaration?.(symbol);
  if (typeOnlyAliasDeclaration === undefined || getSourceFileOfNode(typeOnlyAliasDeclaration) !== sourceFile) {
    return undefined;
  }

  return {
    kind: AutoImportFixKindPromoteTypeOnly,
    name: symbolName,
    importKind: ImportKindNamed,
    addAsTypeOnly: AddAsTypeOnlyNotAllowed,
    importIndex: -1,
    moduleSpecifierKind: ResultKind.Ambient,
    isReExport: false,
    moduleFileName: sourceFile.fileName,
    typeOnlyAliasDeclaration,
  };
}

export interface SymbolNameInfo {
  readonly name: string;
  readonly isTypeOnly: boolean;
}

export function getSymbolNamesToImport(
  sourceFile: SourceFile,
  checker: ImportFixChecker,
  symbolToken: AstNode,
  compilerOptions: ImportFixCompilerOptions,
): readonly SymbolNameInfo[] {
  if (!isIdentifier(symbolToken)) return [];

  const parent = symbolToken.parent;
  if (
    parent !== undefined
    && (isJsxOpeningLikeElement(parent) || isJsxClosingElement(parent))
    && tagNameOf(parent) === symbolToken
    && jsxModeNeedsExplicitImport(compilerOptions.jsx ?? JsxEmit.None)
  ) {
    const jsxNamespace = checker.getJsxNamespace?.(sourceFile) ?? "";
    if (needsJsxNamespaceFix(jsxNamespace, symbolToken, checker)) {
      const result: SymbolNameInfo[] = [];
      if (!isIntrinsicJsxName(symbolToken.text)) {
        const componentSymbol = checker.resolveName?.(symbolToken.text, symbolToken, SymbolFlags.Value, false);
        if (componentSymbol === undefined) {
          result.push({ name: symbolToken.text, isTypeOnly: false });
        } else if (checker.getTypeOnlyAliasDeclaration?.(componentSymbol) !== undefined) {
          result.push({ name: symbolToken.text, isTypeOnly: true });
        }
      }
      const namespaceSymbol = checker.resolveName?.(jsxNamespace, symbolToken, SymbolFlags.Value, true);
      const namespaceIsTypeOnly = namespaceSymbol === undefined ? false : checker.getTypeOnlyAliasDeclaration?.(namespaceSymbol) !== undefined;
      result.push({ name: jsxNamespace, isTypeOnly: namespaceIsTypeOnly });
      return result;
    }
  }

  const tokenSymbol = checker.resolveName?.(symbolToken.text, symbolToken, SymbolFlags.Value, true);
  const tokenIsTypeOnly = tokenSymbol === undefined ? false : checker.getTypeOnlyAliasDeclaration?.(tokenSymbol) !== undefined;
  return [{ name: symbolToken.text, isTypeOnly: tokenIsTypeOnly }];
}

export function needsJsxNamespaceFix(jsxNamespace: string, symbolToken: AstNode, checker: ImportFixChecker): boolean {
  if (isIdentifier(symbolToken) && isIntrinsicJsxName(symbolToken.text)) return true;

  const namespaceSymbol = jsxNamespace === ""
    ? undefined
    : checker.resolveName?.(jsxNamespace, symbolToken, SymbolFlags.Value, true);
  if (namespaceSymbol === undefined) return true;

  if (namespaceSymbol.declarations.some(isTypeOnlyImportOrExportDeclaration)) {
    return ((namespaceSymbol.flags ?? 0) & SymbolFlags.Value) === 0;
  }
  return false;
}

export function jsxModeNeedsExplicitImport(jsx: JsxEmitValue): boolean {
  return jsx === JsxEmit.React || jsx === JsxEmit.ReactNative;
}

export function sortFixInfo(fixes: readonly FixInfo[], view: View): readonly FixInfo[] {
  if (fixes.length === 0) return fixes;
  return [...fixes].sort((left, right) =>
    compareBooleans(left.isJsxNamespaceFix, right.isJsxNamespaceFix)
    || compareFixesForSorting(view, left.fix, right.fix));
}

function getChecker(program: ImportFixProgram): ImportFixChecker | undefined {
  const checkerResult = program.getTypeChecker?.();
  if (checkerResult === undefined) return undefined;
  return Array.isArray(checkerResult) ? checkerResult[0] as ImportFixChecker : checkerResult;
}

function checkerForImportAdder(program: ImportFixProgram): { getMergedSymbol(symbol: AstSymbol): AstSymbol; skipAlias(symbol: AstSymbol): AstSymbol } | undefined {
  const checker = getChecker(program);
  if (checker === undefined) return undefined;
  return {
    getMergedSymbol: (symbol) => symbol,
    skipAlias: (symbol) => symbol,
  };
}

function viewForImportAdder(view: View): { getFixes(exportEntry: ExportEntry, forJsx: boolean, isTypeOnlyLocation: boolean, usagePosition: unknown): readonly Fix[]; compareFixesForRanking(left: Fix, right: Fix): number } {
  return {
    getFixes: (exportEntry, forJsx, isTypeOnlyLocation, usagePosition) =>
      viewFixes(view, exportEntry, forJsx, isTypeOnlyLocation, usagePosition as Position | undefined),
    compareFixesForRanking: (left, right) => compareFixesForRanking(view, left, right),
  };
}

function viewFixes(
  view: View,
  exportEntry: ExportEntry,
  forJsx: boolean,
  isTypeOnlyLocation: boolean,
  usagePosition: Position | undefined,
): readonly Fix[] {
  const provider = view.fixProvider;
  if (provider === undefined) return [];
  return provider.getFixes(
    view,
    exportEntry,
    forJsx,
    isTypeOnlyLocation,
    usagePosition ?? { line: 0, character: 0 },
  ).map(toFix);
}

function compareFixesForRanking(view: View, left: Fix, right: Fix): number {
  return view.fixProvider?.compareFixesForRanking(view, left, right) ?? 0;
}

function compareFixesForSorting(view: View, left: Fix, right: Fix): number {
  return view.fixProvider?.compareFixesForSorting(view, left, right) ?? compareFixesForRanking(view, left, right);
}

function editsForFix(fix: Fix): { readonly changes: readonly TextEdit[]; readonly description: string } {
  if (fix.kind === AutoImportFixKindPromoteTypeOnly) {
    return {
      changes: [],
      description: Diagnostics.Use_import_type.message,
    };
  }
  const moduleSpecifier = fix.moduleSpecifier === undefined || fix.moduleSpecifier === "" ? "" : ` from '${fix.moduleSpecifier}'`;
  return {
    changes: [],
    description: `Add import for '${fix.name ?? ""}'${moduleSpecifier}`,
  };
}

function sourceFileForAst(sourceFile: ImportFixSourceFile): SourceFile | undefined {
  if (sourceFile.root !== undefined) return sourceFile.root;
  if (sourceFile.kind === Kind.SourceFile && sourceFile.statements !== undefined) return sourceFile as unknown as SourceFile;
  return undefined;
}

function getSourceFileOfNode(node: AstNode): SourceFile | undefined {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) return current as SourceFile;
    current = current.parent;
  }
  return undefined;
}

function isValidTypeOnlyAliasUseSite(node: AstNode): boolean {
  return findAncestor(node, current => current.kind === Kind.TypeQuery || current.kind === Kind.ImportType || current.kind === Kind.TypeReference) !== undefined;
}

function findAncestor(node: AstNode | undefined, predicate: (node: AstNode) => boolean): AstNode | undefined {
  let current = node;
  while (current !== undefined) {
    if (predicate(current)) return current;
    current = current.parent;
  }
  return undefined;
}

function isJsxTagName(node: AstNode): boolean {
  const parent = node.parent;
  return parent !== undefined
    && (isJsxOpeningLikeElement(parent) || isJsxClosingElement(parent))
    && tagNameOf(parent) === node;
}

function tagNameOf(node: AstNode): AstNode | undefined {
  return (node as { readonly tagName?: AstNode }).tagName;
}

function symbolNameOf(symbol: AstSymbol): string {
  return symbol.name ?? symbol.escapedName ?? "";
}

function exportNameOf(entry: ExportEntry): string {
  return entry.localName ?? entry.exportName;
}

function exportIsRenameable(entry: ExportEntry): boolean {
  return entry.exportName === "export=" || entry.exportName === "default";
}

function toFix(autoImportFix: import("../lsp/lsproto/index.js").AutoImportFix): Fix {
  return {
    ...autoImportFix,
    kind: autoImportFix.kind ?? 0,
    moduleSpecifierKind: ResultKind.Ambient,
    isReExport: false,
    moduleFileName: "",
  };
}

function positionAt(file: CodeActionSourceFile, offset: number): Position {
  const lineStarts = file.lineStarts.length > 0 ? file.lineStarts : computeLineStarts(file.text);
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const start = lineStarts[middle]!;
    const next = middle + 1 < lineStarts.length ? lineStarts[middle + 1]! : file.text.length + 1;
    if (offset < start) high = middle - 1;
    else if (offset >= next) low = middle + 1;
    else return { line: middle, character: offset - start };
  }
  return { line: 0, character: Math.max(0, offset) };
}

function computeLineStarts(text: string): readonly number[] {
  const starts: number[] = [0];
  for (let index = 0; index < text.length; index += 1) {
    const charCode = text.charCodeAt(index);
    if (charCode === 13 || charCode === 10) {
      if (charCode === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    }
  }
  return starts;
}

function compareBooleans(left: boolean, right: boolean): number {
  if (left === right) return 0;
  return left ? 1 : -1;
}

// Language-service parity map: internal/ls/codeactions_importfixes.go
/**
 * Language-service parity map for TS-Go `ls/codeactions_importfixes.go`.
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

export const lsCodeActionsImportFixesUpstreamPath = "ls/codeactions_importfixes.go";

export const lsCodeActionsImportFixesDeclarations: readonly UpstreamDeclaration[] = [
  {"line":21,"kind":"var","name":"importFixErrorCodes"},
  {"line":50,"kind":"var","name":"ImportFixProvider"},
  {"line":57,"kind":"type","name":"fixInfo"},
  {"line":64,"kind":"func","name":"getImportCodeActions"},
  {"line":94,"kind":"func","name":"getAllImportCodeActions"},
  {"line":151,"kind":"func","name":"addImportFromDiagnostic"},
  {"line":170,"kind":"func","name":"getFixInfos"},
  {"line":241,"kind":"func","name":"getFixesInfoForUMDImport"},
  {"line":268,"kind":"func","name":"getUmdSymbol"},
  {"line":297,"kind":"func","name":"isUMDExportSymbol"},
  {"line":303,"kind":"func","name":"getFixesInfoForNonUMDImport"},
  {"line":353,"kind":"func","name":"getTypeOnlyPromotionFix"},
  {"line":377,"kind":"type","name":"symbolNameInfo"},
  {"line":382,"kind":"func","name":"getSymbolNamesToImport"},
  {"line":413,"kind":"func","name":"needsJsxNamespaceFix"},
  {"line":427,"kind":"func","name":"jsxModeNeedsExplicitImport"},
  {"line":431,"kind":"func","name":"sortFixInfo"},
];

export const lsCodeActionsImportFixesSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":6,"text":"\t\"strings\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/diagnostics\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/locale\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/autoimport\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":19,"text":")"},
  {"line":21,"text":"var importFixErrorCodes = []int32{"},
  {"line":22,"text":"\tdiagnostics.Cannot_find_name_0.Code(),"},
  {"line":23,"text":"\tdiagnostics.Cannot_find_name_0_Did_you_mean_1.Code(),"},
  {"line":24,"text":"\tdiagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.Code(),"},
  {"line":25,"text":"\tdiagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.Code(),"},
  {"line":26,"text":"\tdiagnostics.Cannot_find_namespace_0.Code(),"},
  {"line":27,"text":"\tdiagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.Code(),"},
  {"line":28,"text":"\tdiagnostics.X_0_only_refers_to_a_type_but_is_being_used_as_a_value_here.Code(),"},
  {"line":29,"text":"\tdiagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.Code(),"},
  {"line":30,"text":"\tdiagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.Code(),"},
  {"line":31,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery.Code(),"},
  {"line":32,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later.Code(),"},
  {"line":33,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom.Code(),"},
  {"line":34,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig.Code(),"},
  {"line":35,"text":"\tdiagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function.Code(),"},
  {"line":36,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig.Code(),"},
  {"line":37,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha.Code(),"},
  {"line":38,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode.Code(),"},
  {"line":39,"text":"\tdiagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig.Code(),"},
  {"line":40,"text":"\tdiagnostics.Cannot_find_namespace_0_Did_you_mean_1.Code(),"},
  {"line":41,"text":"\tdiagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.Code(),"},
  {"line":42,"text":"\tdiagnostics.This_JSX_tag_requires_0_to_be_in_scope_but_it_could_not_be_found.Code(),"},
  {"line":43,"text":"}"},
  {"line":45,"text":"const ("},
  {"line":46,"text":"\timportFixID = \"fixMissingImport\""},
  {"line":47,"text":")"},
  {"line":50,"text":"var ImportFixProvider = &CodeFixProvider{"},
  {"line":51,"text":"\tErrorCodes:        importFixErrorCodes,"},
  {"line":52,"text":"\tGetCodeActions:    getImportCodeActions,"},
  {"line":53,"text":"\tFixIds:            []string{importFixID},"},
  {"line":54,"text":"\tGetAllCodeActions: getAllImportCodeActions,"},
  {"line":55,"text":"}"},
  {"line":57,"text":"type fixInfo struct {"},
  {"line":58,"text":"\tfix                 *autoimport.Fix"},
  {"line":59,"text":"\tsymbolName          string"},
  {"line":60,"text":"\terrorIdentifierText string"},
  {"line":61,"text":"\tisJsxNamespaceFix   bool"},
  {"line":62,"text":"}"},
  {"line":64,"text":"func getImportCodeActions(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {"},
  {"line":65,"text":"\tinfo, err := getFixInfos(ctx, fixContext, fixContext.ErrorCode, fixContext.Span.Pos())"},
  {"line":66,"text":"\tif err != nil {"},
  {"line":67,"text":"\t\treturn nil, err"},
  {"line":68,"text":"\t}"},
  {"line":69,"text":"\tif len(info) == 0 {"},
  {"line":70,"text":"\t\treturn nil, nil"},
  {"line":71,"text":"\t}"},
  {"line":73,"text":"\tvar actions []*CodeAction"},
  {"line":74,"text":"\tfor _, fixInfo := range info {"},
  {"line":75,"text":"\t\tedits, description := fixInfo.fix.Edits("},
  {"line":76,"text":"\t\t\tctx,"},
  {"line":77,"text":"\t\t\tfixContext.SourceFile,"},
  {"line":78,"text":"\t\t\tfixContext.Program.Options(),"},
  {"line":79,"text":"\t\t\tfixContext.LS.FormatOptions(),"},
  {"line":80,"text":"\t\t\tfixContext.LS.converters,"},
  {"line":81,"text":"\t\t\tfixContext.LS.UserPreferences(),"},
  {"line":82,"text":"\t\t)"},
  {"line":84,"text":"\t\tactions = append(actions, &CodeAction{"},
  {"line":85,"text":"\t\t\tDescription:       description,"},
  {"line":86,"text":"\t\t\tChanges:           edits,"},
  {"line":87,"text":"\t\t\tFixID:             importFixID,"},
  {"line":88,"text":"\t\t\tFixAllDescription: diagnostics.Add_all_missing_imports.Localize(locale.FromContext(ctx)),"},
  {"line":89,"text":"\t\t})"},
  {"line":90,"text":"\t}"},
  {"line":91,"text":"\treturn actions, nil"},
  {"line":92,"text":"}"},
  {"line":94,"text":"func getAllImportCodeActions(ctx context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error) {"},
  {"line":95,"text":"\tif tspath.IsDynamicFileName(fixContext.SourceFile.FileName()) {"},
  {"line":96,"text":"\t\treturn nil, nil"},
  {"line":97,"text":"\t}"},
  {"line":99,"text":"\tallDiagnostics := fixContext.Program.GetSemanticDiagnostics(ctx, fixContext.SourceFile)"},
  {"line":101,"text":"\tvar importDiags []*ast.Diagnostic"},
  {"line":102,"text":"\tfor _, diag := range allDiagnostics {"},
  {"line":103,"text":"\t\tif containsErrorCode(importFixErrorCodes, diag.Code()) {"},
  {"line":104,"text":"\t\t\timportDiags = append(importDiags, diag)"},
  {"line":105,"text":"\t\t}"},
  {"line":106,"text":"\t}"},
  {"line":108,"text":"\tif len(importDiags) == 0 {"},
  {"line":109,"text":"\t\treturn nil, nil"},
  {"line":110,"text":"\t}"},
  {"line":112,"text":"\tview, err := fixContext.LS.getPreparedAutoImportView(fixContext.SourceFile)"},
  {"line":113,"text":"\tif err != nil {"},
  {"line":114,"text":"\t\treturn nil, err"},
  {"line":115,"text":"\t}"},
  {"line":116,"text":"\tif view == nil {"},
  {"line":117,"text":"\t\tview = fixContext.LS.getCurrentAutoImportView(fixContext.SourceFile)"},
  {"line":118,"text":"\t}"},
  {"line":120,"text":"\tch, done := fixContext.Program.GetTypeChecker(ctx)"},
  {"line":121,"text":"\tdefer done()"},
  {"line":123,"text":"\timportAdder := autoimport.NewImportAdder("},
  {"line":124,"text":"\t\tctx,"},
  {"line":125,"text":"\t\tfixContext.Program,"},
  {"line":126,"text":"\t\tch,"},
  {"line":127,"text":"\t\tfixContext.SourceFile,"},
  {"line":128,"text":"\t\tview,"},
  {"line":129,"text":"\t\tfixContext.LS.FormatOptions(),"},
  {"line":130,"text":"\t\tfixContext.LS.converters,"},
  {"line":131,"text":"\t\tfixContext.LS.UserPreferences(),"},
  {"line":132,"text":"\t)"},
  {"line":134,"text":"\tfor _, diag := range importDiags {"},
  {"line":135,"text":"\t\tif err := addImportFromDiagnostic(ctx, importAdder, diag, fixContext); err != nil {"},
  {"line":136,"text":"\t\t\treturn nil, err"},
  {"line":137,"text":"\t\t}"},
  {"line":138,"text":"\t}"},
  {"line":140,"text":"\tif !importAdder.HasFixes() {"},
  {"line":141,"text":"\t\treturn nil, nil"},
  {"line":142,"text":"\t}"},
  {"line":144,"text":"\treturn &CombinedCodeActions{"},
  {"line":145,"text":"\t\tDescription: diagnostics.Add_all_missing_imports.Localize(locale.FromContext(ctx)),"},
  {"line":146,"text":"\t\tChanges:     importAdder.Edits(),"},
  {"line":147,"text":"\t}, nil"},
  {"line":148,"text":"}"},
  {"line":151,"text":"func addImportFromDiagnostic(ctx context.Context, importAdder autoimport.ImportAdder, diag *ast.Diagnostic, fixContext *CodeFixContext) error {"},
  {"line":152,"text":"\tdiagFixContext := &CodeFixContext{"},
  {"line":153,"text":"\t\tSourceFile: fixContext.SourceFile,"},
  {"line":154,"text":"\t\tSpan:       core.NewTextRange(diag.Pos(), diag.End()),"},
  {"line":155,"text":"\t\tErrorCode:  diag.Code(),"},
  {"line":156,"text":"\t\tProgram:    fixContext.Program,"},
  {"line":157,"text":"\t\tLS:         fixContext.LS,"},
  {"line":158,"text":"\t}"},
  {"line":160,"text":"\tinfos, err := getFixInfos(ctx, diagFixContext, diag.Code(), diag.Pos())"},
  {"line":161,"text":"\tif err != nil {"},
  {"line":162,"text":"\t\treturn err"},
  {"line":163,"text":"\t}"},
  {"line":164,"text":"\tif len(infos) > 0 {"},
  {"line":165,"text":"\t\timportAdder.AddImportFix(infos[0].fix)"},
  {"line":166,"text":"\t}"},
  {"line":167,"text":"\treturn nil"},
  {"line":168,"text":"}"},
  {"line":170,"text":"func getFixInfos(ctx context.Context, fixContext *CodeFixContext, errorCode int32, pos int) ([]*fixInfo, error) {"},
  {"line":172,"text":"\tif tspath.IsDynamicFileName(fixContext.SourceFile.FileName()) {"},
  {"line":173,"text":"\t\treturn nil, nil"},
  {"line":174,"text":"\t}"},
  {"line":176,"text":"\tsymbolToken := astnav.GetTokenAtPosition(fixContext.SourceFile, pos)"},
  {"line":178,"text":"\tvar view *autoimport.View"},
  {"line":179,"text":"\tvar info []*fixInfo"},
  {"line":181,"text":"\tif errorCode == diagnostics.X_0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.Code() {"},
  {"line":182,"text":"\t\tview = fixContext.LS.getCurrentAutoImportView(fixContext.SourceFile)"},
  {"line":183,"text":"\t\tinfo = getFixesInfoForUMDImport(ctx, fixContext, symbolToken, view)"},
  {"line":184,"text":"\t} else if !ast.IsIdentifier(symbolToken) {"},
  {"line":185,"text":"\t\treturn nil, nil"},
  {"line":186,"text":"\t} else if errorCode == diagnostics.X_0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.Code() {"},
  {"line":187,"text":"\t\tch, done := fixContext.Program.GetTypeChecker(ctx)"},
  {"line":188,"text":"\t\tdefer done()"},
  {"line":189,"text":"\t\tcompilerOptions := fixContext.Program.Options()"},
  {"line":190,"text":"\t\tsymbolNames := getSymbolNamesToImport(fixContext.SourceFile, ch, symbolToken, compilerOptions)"},
  {"line":192,"text":"\t\tvar allTypeOnlyFixes []*fixInfo"},
  {"line":193,"text":"\t\tfor _, sn := range symbolNames {"},
  {"line":194,"text":"\t\t\tif !sn.isTypeOnly {"},
  {"line":195,"text":"\t\t\t\tcontinue"},
  {"line":196,"text":"\t\t\t}"},
  {"line":197,"text":"\t\t\tfix := getTypeOnlyPromotionFix(ctx, fixContext.SourceFile, symbolToken, sn.name, fixContext.Program)"},
  {"line":198,"text":"\t\t\tif fix != nil {"},
  {"line":199,"text":"\t\t\t\tallTypeOnlyFixes = append(allTypeOnlyFixes, &fixInfo{fix: fix, symbolName: sn.name, errorIdentifierText: symbolToken.Text()})"},
  {"line":200,"text":"\t\t\t}"},
  {"line":201,"text":"\t\t}"},
  {"line":208,"text":"\t\tdiagnosticMessage := \"\""},
  {"line":209,"text":"\t\tif fixContext.Diagnostic != nil {"},
  {"line":210,"text":"\t\t\tdiagnosticMessage = fixContext.Diagnostic.Message"},
  {"line":211,"text":"\t\t}"},
  {"line":212,"text":"\t\tif len(allTypeOnlyFixes) > 1 && diagnosticMessage != \"\" {"},
  {"line":213,"text":"\t\t\tfor _, fi := range allTypeOnlyFixes {"},
  {"line":214,"text":"\t\t\t\tif strings.Contains(diagnosticMessage, \"'\"+fi.symbolName+\"'\") {"},
  {"line":215,"text":"\t\t\t\t\tinfo = append(info, fi)"},
  {"line":216,"text":"\t\t\t\t}"},
  {"line":217,"text":"\t\t\t}"},
  {"line":218,"text":"\t\t}"},
  {"line":219,"text":"\t\tif len(info) == 0 {"},
  {"line":220,"text":"\t\t\tinfo = allTypeOnlyFixes"},
  {"line":221,"text":"\t\t}"},
  {"line":222,"text":"\t\treturn info, nil"},
  {"line":223,"text":"\t} else {"},
  {"line":224,"text":"\t\tvar err error"},
  {"line":225,"text":"\t\tview, err = fixContext.LS.getPreparedAutoImportView(fixContext.SourceFile)"},
  {"line":226,"text":"\t\tif err != nil {"},
  {"line":227,"text":"\t\t\treturn nil, err"},
  {"line":228,"text":"\t\t}"},
  {"line":229,"text":"\t\tif view != nil {"},
  {"line":230,"text":"\t\t\tinfo = getFixesInfoForNonUMDImport(ctx, fixContext, symbolToken, view)"},
  {"line":231,"text":"\t\t}"},
  {"line":232,"text":"\t}"},
  {"line":235,"text":"\tif view == nil {"},
  {"line":236,"text":"\t\tview = fixContext.LS.getCurrentAutoImportView(fixContext.SourceFile)"},
  {"line":237,"text":"\t}"},
  {"line":238,"text":"\treturn sortFixInfo(info, fixContext, view), nil"},
  {"line":239,"text":"}"},
  {"line":241,"text":"func getFixesInfoForUMDImport(ctx context.Context, fixContext *CodeFixContext, token *ast.Node, view *autoimport.View) []*fixInfo {"},
  {"line":242,"text":"\tch, done := fixContext.Program.GetTypeChecker(ctx)"},
  {"line":243,"text":"\tdefer done()"},
  {"line":245,"text":"\tumdSymbol := getUmdSymbol(token, ch)"},
  {"line":246,"text":"\tif umdSymbol == nil {"},
  {"line":247,"text":"\t\treturn nil"},
  {"line":248,"text":"\t}"},
  {"line":250,"text":"\texport := autoimport.SymbolToExport(umdSymbol, ch)"},
  {"line":251,"text":"\tisValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(token)"},
  {"line":253,"text":"\tvar result []*fixInfo"},
  {"line":254,"text":"\tfor _, fix := range view.GetFixes(ctx, export, false, isValidTypeOnlyUseSite, nil) {"},
  {"line":255,"text":"\t\terrorIdentifierText := \"\""},
  {"line":256,"text":"\t\tif ast.IsIdentifier(token) {"},
  {"line":257,"text":"\t\t\terrorIdentifierText = token.Text()"},
  {"line":258,"text":"\t\t}"},
  {"line":259,"text":"\t\tresult = append(result, &fixInfo{"},
  {"line":260,"text":"\t\t\tfix:                 fix,"},
  {"line":261,"text":"\t\t\tsymbolName:          umdSymbol.Name,"},
  {"line":262,"text":"\t\t\terrorIdentifierText: errorIdentifierText,"},
  {"line":263,"text":"\t\t})"},
  {"line":264,"text":"\t}"},
  {"line":265,"text":"\treturn result"},
  {"line":266,"text":"}"},
  {"line":268,"text":"func getUmdSymbol(token *ast.Node, ch *checker.Checker) *ast.Symbol {"},
  {"line":270,"text":"\tvar umdSymbol *ast.Symbol"},
  {"line":271,"text":"\tif ast.IsIdentifier(token) {"},
  {"line":272,"text":"\t\tumdSymbol = ch.GetResolvedSymbol(token)"},
  {"line":273,"text":"\t}"},
  {"line":274,"text":"\tif isUMDExportSymbol(umdSymbol) {"},
  {"line":275,"text":"\t\treturn umdSymbol"},
  {"line":276,"text":"\t}"},
  {"line":279,"text":"\tparent := token.Parent"},
  {"line":280,"text":"\tif (ast.IsJsxOpeningLikeElement(parent) && parent.TagName() == token) ||"},
  {"line":281,"text":"\t\tast.IsJsxOpeningFragment(parent) {"},
  {"line":282,"text":"\t\tvar location *ast.Node"},
  {"line":283,"text":"\t\tif ast.IsJsxOpeningLikeElement(parent) {"},
  {"line":284,"text":"\t\t\tlocation = token"},
  {"line":285,"text":"\t\t} else {"},
  {"line":286,"text":"\t\t\tlocation = parent"},
  {"line":287,"text":"\t\t}"},
  {"line":288,"text":"\t\tjsxNamespace := ch.GetJsxNamespace(parent)"},
  {"line":289,"text":"\t\tparentSymbol := ch.ResolveName(jsxNamespace, location, ast.SymbolFlagsValue, false /* excludeGlobals */)"},
  {"line":290,"text":"\t\tif isUMDExportSymbol(parentSymbol) {"},
  {"line":291,"text":"\t\t\treturn parentSymbol"},
  {"line":292,"text":"\t\t}"},
  {"line":293,"text":"\t}"},
  {"line":294,"text":"\treturn nil"},
  {"line":295,"text":"}"},
  {"line":297,"text":"func isUMDExportSymbol(symbol *ast.Symbol) bool {"},
  {"line":298,"text":"\treturn symbol != nil && len(symbol.Declarations) > 0 &&"},
  {"line":299,"text":"\t\tsymbol.Declarations[0] != nil &&"},
  {"line":300,"text":"\t\tast.IsNamespaceExportDeclaration(symbol.Declarations[0])"},
  {"line":301,"text":"}"},
  {"line":303,"text":"func getFixesInfoForNonUMDImport(ctx context.Context, fixContext *CodeFixContext, symbolToken *ast.Node, view *autoimport.View) []*fixInfo {"},
  {"line":304,"text":"\tch, done := fixContext.Program.GetTypeChecker(ctx)"},
  {"line":305,"text":"\tdefer done()"},
  {"line":306,"text":"\tcompilerOptions := fixContext.Program.Options()"},
  {"line":308,"text":"\tisValidTypeOnlyUseSite := ast.IsValidTypeOnlyAliasUseSite(symbolToken)"},
  {"line":309,"text":"\tsymbolNames := getSymbolNamesToImport(fixContext.SourceFile, ch, symbolToken, compilerOptions)"},
  {"line":310,"text":"\tvar allInfo []*fixInfo"},
  {"line":313,"text":"\tusagePosition := fixContext.LS.converters.PositionToLineAndCharacter(fixContext.SourceFile, core.TextPos(scanner.GetTokenPosOfNode(symbolToken, fixContext.SourceFile, false)))"},
  {"line":315,"text":"\tfor _, sn := range symbolNames {"},
  {"line":317,"text":"\t\tif sn.isTypeOnly {"},
  {"line":318,"text":"\t\t\tcontinue"},
  {"line":319,"text":"\t\t}"},
  {"line":321,"text":"\t\tsymbolName := sn.name"},
  {"line":323,"text":"\t\tif symbolName == \"default\" {"},
  {"line":324,"text":"\t\t\tcontinue"},
  {"line":325,"text":"\t\t}"},
  {"line":327,"text":"\t\tisJSXTagName := symbolName == symbolToken.Text() && ast.IsJsxTagName(symbolToken)"},
  {"line":328,"text":"\t\tqueryKind := autoimport.QueryKindExactMatch"},
  {"line":329,"text":"\t\tif isJSXTagName {"},
  {"line":330,"text":"\t\t\tqueryKind = autoimport.QueryKindCaseInsensitiveMatch"},
  {"line":331,"text":"\t\t}"},
  {"line":333,"text":"\t\texports := view.Search(symbolName, queryKind)"},
  {"line":334,"text":"\t\tfor _, export := range exports {"},
  {"line":335,"text":"\t\t\tif isJSXTagName && !(export.Name() == symbolName || export.IsRenameable()) {"},
  {"line":336,"text":"\t\t\t\tcontinue"},
  {"line":337,"text":"\t\t\t}"},
  {"line":339,"text":"\t\t\tfixes := view.GetFixes(ctx, export, isJSXTagName, isValidTypeOnlyUseSite, &usagePosition)"},
  {"line":340,"text":"\t\t\tfor _, fix := range fixes {"},
  {"line":341,"text":"\t\t\t\tallInfo = append(allInfo, &fixInfo{"},
  {"line":342,"text":"\t\t\t\t\tfix:               fix,"},
  {"line":343,"text":"\t\t\t\t\tsymbolName:        symbolName,"},
  {"line":344,"text":"\t\t\t\t\tisJsxNamespaceFix: symbolName != symbolToken.Text(),"},
  {"line":345,"text":"\t\t\t\t})"},
  {"line":346,"text":"\t\t\t}"},
  {"line":347,"text":"\t\t}"},
  {"line":348,"text":"\t}"},
  {"line":350,"text":"\treturn allInfo"},
  {"line":351,"text":"}"},
  {"line":353,"text":"func getTypeOnlyPromotionFix(ctx context.Context, sourceFile *ast.SourceFile, symbolToken *ast.Node, symbolName string, program *compiler.Program) *autoimport.Fix {"},
  {"line":354,"text":"\tch, done := program.GetTypeChecker(ctx)"},
  {"line":355,"text":"\tdefer done()"},
  {"line":358,"text":"\tsymbol := ch.ResolveName(symbolName, symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */)"},
  {"line":359,"text":"\tif symbol == nil {"},
  {"line":360,"text":"\t\treturn nil"},
  {"line":361,"text":"\t}"},
  {"line":364,"text":"\ttypeOnlyAliasDeclaration := ch.GetTypeOnlyAliasDeclaration(symbol)"},
  {"line":365,"text":"\tif typeOnlyAliasDeclaration == nil || ast.GetSourceFileOfNode(typeOnlyAliasDeclaration) != sourceFile {"},
  {"line":366,"text":"\t\treturn nil"},
  {"line":367,"text":"\t}"},
  {"line":369,"text":"\treturn &autoimport.Fix{"},
  {"line":370,"text":"\t\tAutoImportFix: &lsproto.AutoImportFix{"},
  {"line":371,"text":"\t\t\tKind: lsproto.AutoImportFixKindPromoteTypeOnly,"},
  {"line":372,"text":"\t\t},"},
  {"line":373,"text":"\t\tTypeOnlyAliasDeclaration: typeOnlyAliasDeclaration,"},
  {"line":374,"text":"\t}"},
  {"line":375,"text":"}"},
  {"line":377,"text":"type symbolNameInfo struct {"},
  {"line":378,"text":"\tname       string"},
  {"line":379,"text":"\tisTypeOnly bool // whether the symbol currently resolves to a type-only import"},
  {"line":380,"text":"}"},
  {"line":382,"text":"func getSymbolNamesToImport(sourceFile *ast.SourceFile, ch *checker.Checker, symbolToken *ast.Node, compilerOptions *core.CompilerOptions) []symbolNameInfo {"},
  {"line":383,"text":"\tparent := symbolToken.Parent"},
  {"line":384,"text":"\tif (ast.IsJsxOpeningLikeElement(parent) || ast.IsJsxClosingElement(parent)) &&"},
  {"line":385,"text":"\t\tparent.TagName() == symbolToken &&"},
  {"line":386,"text":"\t\tjsxModeNeedsExplicitImport(compilerOptions.Jsx) {"},
  {"line":387,"text":"\t\tjsxNamespace := ch.GetJsxNamespace(sourceFile.AsNode())"},
  {"line":388,"text":"\t\tif needsJsxNamespaceFix(jsxNamespace, symbolToken, ch) {"},
  {"line":389,"text":"\t\t\tvar result []symbolNameInfo"},
  {"line":390,"text":"\t\t\tif !scanner.IsIntrinsicJsxName(symbolToken.Text()) {"},
  {"line":391,"text":"\t\t\t\tcompSymbol := ch.ResolveName(symbolToken.Text(), symbolToken, ast.SymbolFlagsValue, false /* excludeGlobals */)"},
  {"line":392,"text":"\t\t\t\tif compSymbol == nil {"},
  {"line":393,"text":"\t\t\t\t\tresult = append(result, symbolNameInfo{name: symbolToken.Text()})"},
  {"line":394,"text":"\t\t\t\t} else if ch.GetTypeOnlyAliasDeclaration(compSymbol) != nil {"},
  {"line":395,"text":"\t\t\t\t\tresult = append(result, symbolNameInfo{name: symbolToken.Text(), isTypeOnly: true})"},
  {"line":396,"text":"\t\t\t\t}"},
  {"line":397,"text":"\t\t\t}"},
  {"line":398,"text":"\t\t\tnsIsTypeOnly := false"},
  {"line":399,"text":"\t\t\tif nsSymbol := ch.ResolveName(jsxNamespace, symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */); nsSymbol != nil {"},
  {"line":400,"text":"\t\t\t\tnsIsTypeOnly = ch.GetTypeOnlyAliasDeclaration(nsSymbol) != nil"},
  {"line":401,"text":"\t\t\t}"},
  {"line":402,"text":"\t\t\tresult = append(result, symbolNameInfo{name: jsxNamespace, isTypeOnly: nsIsTypeOnly})"},
  {"line":403,"text":"\t\t\treturn result"},
  {"line":404,"text":"\t\t}"},
  {"line":405,"text":"\t}"},
  {"line":406,"text":"\ttokenIsTypeOnly := false"},
  {"line":407,"text":"\tif sym := ch.ResolveName(symbolToken.Text(), symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */); sym != nil {"},
  {"line":408,"text":"\t\ttokenIsTypeOnly = ch.GetTypeOnlyAliasDeclaration(sym) != nil"},
  {"line":409,"text":"\t}"},
  {"line":410,"text":"\treturn []symbolNameInfo{{name: symbolToken.Text(), isTypeOnly: tokenIsTypeOnly}}"},
  {"line":411,"text":"}"},
  {"line":413,"text":"func needsJsxNamespaceFix(jsxNamespace string, symbolToken *ast.Node, ch *checker.Checker) bool {"},
  {"line":414,"text":"\tif scanner.IsIntrinsicJsxName(symbolToken.Text()) {"},
  {"line":415,"text":"\t\treturn true"},
  {"line":416,"text":"\t}"},
  {"line":417,"text":"\tnamespaceSymbol := ch.ResolveName(jsxNamespace, symbolToken, ast.SymbolFlagsValue, true /* excludeGlobals */)"},
  {"line":418,"text":"\tif namespaceSymbol == nil {"},
  {"line":419,"text":"\t\treturn true"},
  {"line":420,"text":"\t}"},
  {"line":421,"text":"\tif slices.ContainsFunc(namespaceSymbol.Declarations, ast.IsTypeOnlyImportOrExportDeclaration) {"},
  {"line":422,"text":"\t\treturn (namespaceSymbol.Flags & ast.SymbolFlagsValue) == 0"},
  {"line":423,"text":"\t}"},
  {"line":424,"text":"\treturn false"},
  {"line":425,"text":"}"},
  {"line":427,"text":"func jsxModeNeedsExplicitImport(jsx core.JsxEmit) bool {"},
  {"line":428,"text":"\treturn jsx == core.JsxEmitReact || jsx == core.JsxEmitReactNative"},
  {"line":429,"text":"}"},
  {"line":431,"text":"func sortFixInfo(fixes []*fixInfo, fixContext *CodeFixContext, view *autoimport.View) []*fixInfo {"},
  {"line":432,"text":"\tif len(fixes) == 0 {"},
  {"line":433,"text":"\t\treturn fixes"},
  {"line":434,"text":"\t}"},
  {"line":437,"text":"\tsorted := make([]*fixInfo, len(fixes))"},
  {"line":438,"text":"\tcopy(sorted, fixes)"},
  {"line":443,"text":"\tslices.SortFunc(sorted, func(a, b *fixInfo) int {"},
  {"line":445,"text":"\t\tif cmp := core.CompareBooleans(a.isJsxNamespaceFix, b.isJsxNamespaceFix); cmp != 0 {"},
  {"line":446,"text":"\t\t\treturn cmp"},
  {"line":447,"text":"\t\t}"},
  {"line":448,"text":"\t\treturn view.CompareFixesForSorting(a.fix, b.fix)"},
  {"line":449,"text":"\t})"},
  {"line":451,"text":"\treturn sorted"},
  {"line":452,"text":"}"},
];

export function findLsCodeActionsImportFixesDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsCodeActionsImportFixesDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsCodeActionsImportFixesDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsCodeActionsImportFixesDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsCodeActionsImportFixesLineText(line: number): string | undefined {
  return lsCodeActionsImportFixesSourceLines.find((entry) => entry.line === line)?.text;
}
