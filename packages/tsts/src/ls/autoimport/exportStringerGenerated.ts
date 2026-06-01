import {
  type ExportSyntax,
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
} from "./export.js";

const exportSyntaxName = "ExportSyntaxNoneExportSyntaxModifierExportSyntaxNamedExportSyntaxDefaultModifierExportSyntaxDefaultDeclarationExportSyntaxEqualsExportSyntaxUMDExportSyntaxStarExportSyntaxCommonJSModuleExportsExportSyntaxCommonJSExportsProperty";
const exportSyntaxIndex: readonly number[] = [0, 16, 36, 53, 80, 110, 128, 143, 159, 192, 227];

const exportSyntaxValues: readonly ExportSyntax[] = [
  ExportSyntaxNone,
  ExportSyntaxModifier,
  ExportSyntaxNamed,
  ExportSyntaxDefaultModifier,
  ExportSyntaxDefaultDeclaration,
  ExportSyntaxEquals,
  ExportSyntaxUMD,
  ExportSyntaxStar,
  ExportSyntaxCommonJSModuleExports,
  ExportSyntaxCommonJSExportsProperty,
];

export function exportSyntaxString(value: ExportSyntax | number): string {
  const index = Math.trunc(value) - ExportSyntaxNone;
  if (!exportSyntaxValues.includes(value as ExportSyntax) || index < 0 || index >= exportSyntaxIndex.length - 1) {
    return "ExportSyntax(" + String(Math.trunc(value)) + ")";
  }
  return exportSyntaxName.slice(exportSyntaxIndex[index]!, exportSyntaxIndex[index + 1]!);
}
