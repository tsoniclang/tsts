/**
 * Language-service parity map for TS-Go `ls/autoimport/specifiers.go`.
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

export const lsAutoimportSpecifiersUpstreamPath = "ls/autoimport/specifiers.go";

export const lsAutoimportSpecifiersDeclarations: readonly UpstreamDeclaration[] = [
  {"line":9,"kind":"func","name":"GetModuleSpecifier","receiver":"v *View"},
];

export const lsAutoimportSpecifiersSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package autoimport"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"strings\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/modulespecifiers\""},
  {"line":7,"text":")"},
  {"line":9,"text":"func (v *View) GetModuleSpecifier("},
  {"line":10,"text":"\texport *Export,"},
  {"line":11,"text":"\tuserPreferences modulespecifiers.UserPreferences,"},
  {"line":12,"text":") (string, modulespecifiers.ResultKind) {"},
  {"line":14,"text":"\tif modulespecifiers.PathIsBareSpecifier(string(export.ModuleID)) {"},
  {"line":15,"text":"\t\tspecifier := string(export.ModuleID)"},
  {"line":16,"text":"\t\tif modulespecifiers.IsExcludedByRegex(specifier, userPreferences.AutoImportSpecifierExcludeRegexes) {"},
  {"line":17,"text":"\t\t\treturn \"\", modulespecifiers.ResultKindNone"},
  {"line":18,"text":"\t\t}"},
  {"line":19,"text":"\t\treturn string(export.ModuleID), modulespecifiers.ResultKindAmbient"},
  {"line":20,"text":"\t}"},
  {"line":22,"text":"\tif export.PackageName != \"\" {"},
  {"line":23,"text":"\t\tif entrypoints, ok := v.registry.entrypoints[export.Path]; ok {"},
  {"line":24,"text":"\t\t\tfor _, entrypoint := range entrypoints {"},
  {"line":25,"text":"\t\t\t\tif entrypoint.IncludeConditions.IsSubsetOf(v.conditions) && !v.conditions.Intersects(entrypoint.ExcludeConditions) {"},
  {"line":26,"text":"\t\t\t\t\tspecifier := modulespecifiers.ProcessEntrypointEnding("},
  {"line":27,"text":"\t\t\t\t\t\tentrypoint,"},
  {"line":28,"text":"\t\t\t\t\t\tuserPreferences,"},
  {"line":29,"text":"\t\t\t\t\t\tv.program,"},
  {"line":30,"text":"\t\t\t\t\t\tv.program.Options(),"},
  {"line":31,"text":"\t\t\t\t\t\tv.importingFile,"},
  {"line":32,"text":"\t\t\t\t\t\tv.getAllowedEndings(),"},
  {"line":33,"text":"\t\t\t\t\t)"},
  {"line":35,"text":"\t\t\t\t\tif !modulespecifiers.IsExcludedByRegex(specifier, userPreferences.AutoImportSpecifierExcludeRegexes) {"},
  {"line":36,"text":"\t\t\t\t\t\treturn specifier, modulespecifiers.ResultKindNodeModules"},
  {"line":37,"text":"\t\t\t\t\t}"},
  {"line":38,"text":"\t\t\t\t}"},
  {"line":39,"text":"\t\t\t}"},
  {"line":40,"text":"\t\t\treturn \"\", modulespecifiers.ResultKindNone"},
  {"line":41,"text":"\t\t}"},
  {"line":42,"text":"\t}"},
  {"line":44,"text":"\tcache := v.registry.specifierCache[v.importingFile.Path()]"},
  {"line":45,"text":"\tif export.PackageName == \"\" {"},
  {"line":46,"text":"\t\tif specifier, ok := cache.Load(export.Path); ok {"},
  {"line":47,"text":"\t\t\tif specifier == \"\" {"},
  {"line":48,"text":"\t\t\t\treturn \"\", modulespecifiers.ResultKindNone"},
  {"line":49,"text":"\t\t\t}"},
  {"line":50,"text":"\t\t\treturn specifier, modulespecifiers.ResultKindRelative"},
  {"line":51,"text":"\t\t}"},
  {"line":52,"text":"\t}"},
  {"line":54,"text":"\tspecifiers, kind := modulespecifiers.GetModuleSpecifiersForFileWithInfo("},
  {"line":55,"text":"\t\tv.importingFile,"},
  {"line":56,"text":"\t\texport.ModuleFileName,"},
  {"line":57,"text":"\t\tv.program.Options(),"},
  {"line":58,"text":"\t\tv.program,"},
  {"line":59,"text":"\t\tuserPreferences,"},
  {"line":60,"text":"\t\tmodulespecifiers.ModuleSpecifierOptions{},"},
  {"line":61,"text":"\t\ttrue,"},
  {"line":62,"text":"\t)"},
  {"line":66,"text":"\tfor _, specifier := range specifiers {"},
  {"line":67,"text":"\t\tif strings.Contains(specifier, \"/node_modules/\") {"},
  {"line":68,"text":"\t\t\tcontinue"},
  {"line":69,"text":"\t\t}"},
  {"line":70,"text":"\t\tcache.Store(export.Path, specifier)"},
  {"line":71,"text":"\t\treturn specifier, kind"},
  {"line":72,"text":"\t}"},
  {"line":73,"text":"\tcache.Store(export.Path, \"\")"},
  {"line":74,"text":"\treturn \"\", modulespecifiers.ResultKindNone"},
  {"line":75,"text":"}"},
];

export function findLsAutoimportSpecifiersDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsAutoimportSpecifiersDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsAutoimportSpecifiersDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsAutoimportSpecifiersDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsAutoimportSpecifiersLineText(line: number): string | undefined {
  return lsAutoimportSpecifiersSourceLines.find((entry) => entry.line === line)?.text;
}
