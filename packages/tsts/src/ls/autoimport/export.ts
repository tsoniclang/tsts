/**
 * Language-service parity map for TS-Go `ls/autoimport/export.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportUpstreamPath = "ls/autoimport/export.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportDeclarations: readonly UpstreamDeclaration[] = [
  {"line":18,"kind":"type","name":"ModuleID"},
  {"line":20,"kind":"type","name":"ExportID"},
  {"line":25,"kind":"type","name":"ExportSyntax"},
  {"line":49,"kind":"type","name":"Export"},
  {"line":72,"kind":"func","name":"Name","receiver":"e *Export"},
  {"line":82,"kind":"func","name":"IsRenameable","receiver":"e *Export"},
  {"line":86,"kind":"func","name":"AmbientModuleName","receiver":"e *Export"},
  {"line":93,"kind":"func","name":"IsUnresolvedAlias","receiver":"e *Export"},
  {"line":97,"kind":"func","name":"SymbolToExport"},
  {"line":129,"kind":"func","name":"tryGetModuleExport"},
  {"line":137,"kind":"func","name":"extractFirstExport"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package autoimport"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":5,"text":"\t\"github.com/microsoft/typescript-go/internal/checker\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":9,"text":")"},
  {"line":18,"text":"type ModuleID string"},
  {"line":20,"text":"type ExportID struct {"},
  {"line":21,"text":"\tModuleID   ModuleID"},
  {"line":22,"text":"\tExportName string"},
  {"line":23,"text":"}"},
  {"line":25,"text":"type ExportSyntax int"},
  {"line":27,"text":"const ("},
  {"line":28,"text":"\tExportSyntaxNone ExportSyntax = iota"},
  {"line":30,"text":"\tExportSyntaxModifier"},
  {"line":32,"text":"\tExportSyntaxNamed"},
  {"line":34,"text":"\tExportSyntaxDefaultModifier"},
  {"line":36,"text":"\tExportSyntaxDefaultDeclaration"},
  {"line":38,"text":"\tExportSyntaxEquals"},
  {"line":40,"text":"\tExportSyntaxUMD"},
  {"line":42,"text":"\tExportSyntaxStar"},
  {"line":44,"text":"\tExportSyntaxCommonJSModuleExports"},
  {"line":46,"text":"\tExportSyntaxCommonJSExportsProperty"},
  {"line":47,"text":")"},
  {"line":49,"text":"type Export struct {"},
  {"line":50,"text":"\tExportID"},
  {"line":51,"text":"\tModuleFileName string"},
  {"line":52,"text":"\tSyntax         ExportSyntax"},
  {"line":53,"text":"\tFlags          ast.SymbolFlags"},
  {"line":54,"text":"\tlocalName      string"},
  {"line":57,"text":"\tthrough string"},
  {"line":61,"text":"\tTarget                     ExportID"},
  {"line":62,"text":"\tIsTypeOnly                 bool"},
  {"line":63,"text":"\tScriptElementKind          lsutil.ScriptElementKind"},
  {"line":64,"text":"\tScriptElementKindModifiers lsutil.ScriptElementKindModifier"},
  {"line":67,"text":"\tPath tspath.Path"},
  {"line":69,"text":"\tPackageName string"},
  {"line":70,"text":"}"},
  {"line":72,"text":"func (e *Export) Name() string {"},
  {"line":73,"text":"\tif e.localName != \"\" {"},
  {"line":74,"text":"\t\treturn e.localName"},
  {"line":75,"text":"\t}"},
  {"line":76,"text":"\tif e.ExportName == ast.InternalSymbolNameExportEquals {"},
  {"line":77,"text":"\t\treturn e.Target.ExportName"},
  {"line":78,"text":"\t}"},
  {"line":79,"text":"\treturn e.ExportName"},
  {"line":80,"text":"}"},
  {"line":82,"text":"func (e *Export) IsRenameable() bool {"},
  {"line":83,"text":"\treturn e.ExportName == ast.InternalSymbolNameExportEquals || e.ExportName == ast.InternalSymbolNameDefault"},
  {"line":84,"text":"}"},
  {"line":86,"text":"func (e *Export) AmbientModuleName() string {"},
  {"line":87,"text":"\tif !tspath.IsExternalModuleNameRelative(string(e.ModuleID)) {"},
  {"line":88,"text":"\t\treturn string(e.ModuleID)"},
  {"line":89,"text":"\t}"},
  {"line":90,"text":"\treturn \"\""},
  {"line":91,"text":"}"},
  {"line":93,"text":"func (e *Export) IsUnresolvedAlias() bool {"},
  {"line":94,"text":"\treturn e.Flags == ast.SymbolFlagsAlias"},
  {"line":95,"text":"}"},
  {"line":97,"text":"func SymbolToExport(symbol *ast.Symbol, ch *checker.Checker) *Export {"},
  {"line":98,"text":"\tif symbol.Parent != nil && checker.IsExternalModuleSymbol(symbol.Parent) {"},
  {"line":99,"text":"\t\tif moduleID, moduleFileName, ok := tryGetModuleIDAndFileNameOfModuleSymbol(symbol.Parent); ok {"},
  {"line":100,"text":"\t\t\treturn extractFirstExport(symbol, ch, moduleID, moduleFileName, ast.GetSourceFileOfModule(symbol.Parent))"},
  {"line":101,"text":"\t\t}"},
  {"line":102,"text":"\t\treturn nil"},
  {"line":103,"text":"\t}"},
  {"line":105,"text":"\tdeclaration := core.FirstOrNil(symbol.Declarations)"},
  {"line":106,"text":"\tif declaration == nil {"},
  {"line":107,"text":"\t\treturn nil"},
  {"line":108,"text":"\t}"},
  {"line":110,"text":"\tfile := ast.GetSourceFileOfNode(declaration)"},
  {"line":111,"text":"\tif file.Symbol == nil {"},
  {"line":112,"text":"\t\treturn nil"},
  {"line":113,"text":"\t}"},
  {"line":115,"text":"\tmoduleSymbol := ch.GetMergedSymbol(file.Symbol)"},
  {"line":116,"text":"\tmoduleID := ModuleID(file.Path())"},
  {"line":117,"text":"\tmoduleFileName := file.FileName()"},
  {"line":118,"text":"\ttarget := ch.GetMergedSymbol(ch.SkipAlias(symbol))"},
  {"line":120,"text":"\tif export := tryGetModuleExport(ast.InternalSymbolNameDefault, target, moduleSymbol, ch, moduleID, moduleFileName, file); export != nil {"},
  {"line":121,"text":"\t\treturn export"},
  {"line":122,"text":"\t}"},
  {"line":123,"text":"\tif export := tryGetModuleExport(ast.InternalSymbolNameExportEquals, target, moduleSymbol, ch, moduleID, moduleFileName, file); export != nil {"},
  {"line":124,"text":"\t\treturn export"},
  {"line":125,"text":"\t}"},
  {"line":126,"text":"\treturn tryGetModuleExport(symbol.Name, target, moduleSymbol, ch, moduleID, moduleFileName, file)"},
  {"line":127,"text":"}"},
  {"line":129,"text":"func tryGetModuleExport(exportName string, target *ast.Symbol, moduleSymbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName string, file *ast.SourceFile) *Export {"},
  {"line":130,"text":"\texported := ch.TryGetMemberInModuleExportsAndProperties(exportName, moduleSymbol)"},
  {"line":131,"text":"\tif exported != nil && ch.GetMergedSymbol(ch.SkipAlias(exported)) == target {"},
  {"line":132,"text":"\t\treturn extractFirstExport(exported, ch, moduleID, moduleFileName, file)"},
  {"line":133,"text":"\t}"},
  {"line":134,"text":"\treturn nil"},
  {"line":135,"text":"}"},
  {"line":137,"text":"func extractFirstExport(symbol *ast.Symbol, ch *checker.Checker, moduleID ModuleID, moduleFileName string, file *ast.SourceFile) *Export {"},
  {"line":138,"text":"\tvar exports []*Export"},
  {"line":139,"text":"\textractor := newSymbolExtractor(\"\", ch, nil, nil)"},
  {"line":140,"text":"\textractor.extractFromSymbol(symbol.Name, symbol, moduleID, moduleFileName, file, &exports)"},
  {"line":141,"text":"\treturn core.FirstOrNil(exports)"},
  {"line":142,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoimportExportSourceLines.find((entry) => entry.line === line)?.text;
}
