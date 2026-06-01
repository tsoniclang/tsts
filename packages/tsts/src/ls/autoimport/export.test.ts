import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SymbolFlags } from "../../ast/index.js";
import {
  type ExportChecker,
  type ExportEntry,
  type ExportSourceFile,
  type ExportSymbol,
  ExportSyntaxCommonJSExportsProperty,
  ExportSyntaxDefaultDeclaration,
  ExportSyntaxDefaultModifier,
  ExportSyntaxEquals,
  ExportSyntaxModifier,
  ExportSyntaxNamed,
  ExportSyntaxNone,
  ExportSyntaxStar,
  ExportSyntaxUMD,
  exportAmbientModuleName,
  exportIsRenameable,
  exportIsUnresolvedAlias,
  exportName,
  internalSymbolNameDefault,
  internalSymbolNameExportEquals,
  symbolToExport,
  tryGetModuleExport,
} from "./export.js";
import { exportSyntaxString } from "./exportStringerGenerated.js";

function entry(exportNameText: string, localName = ""): ExportEntry {
  return {
    moduleID: "pkg",
    exportName: exportNameText,
    moduleFileName: "/repo/pkg/index.ts",
    syntax: ExportSyntaxNamed,
    flags: SymbolFlags.None,
    localName,
    target: { moduleID: "pkg", exportName: "targetName" },
    isTypeOnly: false,
    path: "/repo/pkg/index.ts",
    packageName: "pkg",
  };
}

class Checker implements ExportChecker {
  readonly extracted: ExportEntry;
  readonly moduleSymbol: ExportSymbol;
  readonly exportedSymbol: ExportSymbol;
  readonly targetSymbol: ExportSymbol;
  readonly file: ExportSourceFile;

  constructor() {
    this.moduleSymbol = { name: "module", flags: SymbolFlags.Module };
    this.exportedSymbol = { name: "value", flags: SymbolFlags.Alias };
    this.targetSymbol = { name: "target", flags: SymbolFlags.None };
    this.file = { fileName: "/repo/mod.ts", path: "/repo/mod.ts", symbol: this.moduleSymbol };
    this.extracted = entry("value");
  }

  isExternalModuleSymbol(symbol: ExportSymbol): boolean {
    return symbol === this.moduleSymbol;
  }

  tryGetModuleIDAndFileNameOfModuleSymbol(symbol: ExportSymbol) {
    if (symbol !== this.moduleSymbol) return undefined;
    return { moduleID: "/repo/mod.ts", moduleFileName: "/repo/mod.ts" };
  }

  getSourceFileOfModule(symbol: ExportSymbol): ExportSourceFile | undefined {
    return symbol === this.moduleSymbol ? this.file : undefined;
  }

  getMergedSymbol(symbol: ExportSymbol): ExportSymbol {
    return symbol;
  }

  skipAlias(symbol: ExportSymbol): ExportSymbol {
    return symbol === this.exportedSymbol ? this.targetSymbol : symbol;
  }

  tryGetMemberInModuleExportsAndProperties(exportNameText: string, moduleSymbol: ExportSymbol): ExportSymbol | undefined {
    if (moduleSymbol === this.moduleSymbol && exportNameText === "value") return this.exportedSymbol;
    return undefined;
  }

  extractFirstExport(symbol: ExportSymbol, moduleID: string, moduleFileName: string, file: ExportSourceFile): ExportEntry | undefined {
    if (symbol !== this.exportedSymbol && symbol.name !== "value") return undefined;
    return { ...this.extracted, moduleID, moduleFileName, path: file.path };
  }
}

export class AutoImportExportTests {
  computes_public_export_name_like_ts_go(): void {
    Assert.Equal("local", exportName(entry("public", "local")));
    Assert.Equal("targetName", exportName(entry(internalSymbolNameExportEquals)));
    Assert.Equal("public", exportName(entry("public")));
  }

  classifies_rename_ambient_and_alias_properties(): void {
    Assert.True(exportIsRenameable(entry(internalSymbolNameExportEquals)));
    Assert.True(exportIsRenameable(entry(internalSymbolNameDefault)));
    Assert.False(exportIsRenameable(entry("named")));

    Assert.Equal("pkg", exportAmbientModuleName(entry("named")));
    Assert.Equal("", exportAmbientModuleName({ ...entry("named"), moduleID: "./relative" }));
    Assert.True(exportIsUnresolvedAlias({ ...entry("named"), flags: SymbolFlags.Alias }));
    Assert.False(exportIsUnresolvedAlias(entry("named")));
  }

  stringifies_export_syntax_with_generated_stringer_contract(): void {
    Assert.Equal("ExportSyntaxNone", exportSyntaxString(ExportSyntaxNone));
    Assert.Equal("ExportSyntaxModifier", exportSyntaxString(ExportSyntaxModifier));
    Assert.Equal("ExportSyntaxNamed", exportSyntaxString(ExportSyntaxNamed));
    Assert.Equal("ExportSyntaxDefaultModifier", exportSyntaxString(ExportSyntaxDefaultModifier));
    Assert.Equal("ExportSyntaxDefaultDeclaration", exportSyntaxString(ExportSyntaxDefaultDeclaration));
    Assert.Equal("ExportSyntaxEquals", exportSyntaxString(ExportSyntaxEquals));
    Assert.Equal("ExportSyntaxUMD", exportSyntaxString(ExportSyntaxUMD));
    Assert.Equal("ExportSyntaxStar", exportSyntaxString(ExportSyntaxStar));
    Assert.Equal("ExportSyntaxCommonJSExportsProperty", exportSyntaxString(ExportSyntaxCommonJSExportsProperty));
    Assert.Equal("ExportSyntax(99)", exportSyntaxString(99));
  }

  resolves_module_export_through_checker_contract(): void {
    const checker = new Checker();
    const result = tryGetModuleExport("value", checker.targetSymbol, checker.moduleSymbol, checker, "/repo/mod.ts", "/repo/mod.ts", checker.file);

    Assert.True(result !== undefined);
    Assert.Equal("/repo/mod.ts", result!.moduleID);
    Assert.Equal("/repo/mod.ts", result!.path);
  }

  resolves_external_module_symbol_to_first_export(): void {
    const checker = new Checker();
    const symbol: ExportSymbol = { name: "value", parent: checker.moduleSymbol, flags: SymbolFlags.Alias };
    const result = symbolToExport(symbol, checker);

    Assert.True(result !== undefined);
    Assert.Equal("value", result!.exportName);
  }
}

A<AutoImportExportTests>().method((t) => t.computes_public_export_name_like_ts_go).add(FactAttribute);
A<AutoImportExportTests>().method((t) => t.classifies_rename_ambient_and_alias_properties).add(FactAttribute);
A<AutoImportExportTests>().method((t) => t.stringifies_export_syntax_with_generated_stringer_contract).add(FactAttribute);
A<AutoImportExportTests>().method((t) => t.resolves_module_export_through_checker_contract).add(FactAttribute);
A<AutoImportExportTests>().method((t) => t.resolves_external_module_symbol_to_first_export).add(FactAttribute);
