/**
 * Language-service parity map for TS-Go `ls/autoimport/export_stringer_generated.go`.
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

export const lsAutoimportExportStringerGeneratedUpstreamPath = "ls/autoimport/export_stringer_generated.go";

export const lsAutoimportExportStringerGeneratedDeclarations: readonly UpstreamDeclaration[] = [
  {"line":7,"kind":"func","name":"_"},
  {"line":23,"kind":"const","name":"_ExportSyntax_name"},
  {"line":25,"kind":"var","name":"_ExportSyntax_index"},
  {"line":27,"kind":"func","name":"String","receiver":"i ExportSyntax"},
];

export const lsAutoimportExportStringerGeneratedSourceLines: readonly UpstreamSourceLine[] = [
  {"line":3,"text":"package autoimport"},
  {"line":5,"text":"import \"strconv\""},
  {"line":7,"text":"func _() {"},
  {"line":10,"text":"\tvar x [1]struct{}"},
  {"line":11,"text":"\t_ = x[ExportSyntaxNone-0]"},
  {"line":12,"text":"\t_ = x[ExportSyntaxModifier-1]"},
  {"line":13,"text":"\t_ = x[ExportSyntaxNamed-2]"},
  {"line":14,"text":"\t_ = x[ExportSyntaxDefaultModifier-3]"},
  {"line":15,"text":"\t_ = x[ExportSyntaxDefaultDeclaration-4]"},
  {"line":16,"text":"\t_ = x[ExportSyntaxEquals-5]"},
  {"line":17,"text":"\t_ = x[ExportSyntaxUMD-6]"},
  {"line":18,"text":"\t_ = x[ExportSyntaxStar-7]"},
  {"line":19,"text":"\t_ = x[ExportSyntaxCommonJSModuleExports-8]"},
  {"line":20,"text":"\t_ = x[ExportSyntaxCommonJSExportsProperty-9]"},
  {"line":21,"text":"}"},
  {"line":23,"text":"const _ExportSyntax_name = \"ExportSyntaxNoneExportSyntaxModifierExportSyntaxNamedExportSyntaxDefaultModifierExportSyntaxDefaultDeclarationExportSyntaxEqualsExportSyntaxUMDExportSyntaxStarExportSyntaxCommonJSModuleExportsExportSyntaxCommonJSExportsProperty\""},
  {"line":25,"text":"var _ExportSyntax_index = [...]uint8{0, 16, 36, 53, 80, 110, 128, 143, 159, 192, 227}"},
  {"line":27,"text":"func (i ExportSyntax) String() string {"},
  {"line":28,"text":"\tidx := int(i) - 0"},
  {"line":29,"text":"\tif i < 0 || idx >= len(_ExportSyntax_index)-1 {"},
  {"line":30,"text":"\t\treturn \"ExportSyntax(\" + strconv.FormatInt(int64(i), 10) + \")\""},
  {"line":31,"text":"\t}"},
  {"line":32,"text":"\treturn _ExportSyntax_name[_ExportSyntax_index[idx]:_ExportSyntax_index[idx+1]]"},
  {"line":33,"text":"}"},
];

export function findLsAutoimportExportStringerGeneratedDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsAutoimportExportStringerGeneratedDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsAutoimportExportStringerGeneratedDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsAutoimportExportStringerGeneratedDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsAutoimportExportStringerGeneratedLineText(line: number): string | undefined {
  return lsAutoimportExportStringerGeneratedSourceLines.find((entry) => entry.line === line)?.text;
}
