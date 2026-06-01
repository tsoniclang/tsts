/**
 * Language-service parity map for TS-Go `ls/lsutil/utilities.go`.
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

export const lsLsutilUtilitiesUpstreamPath = "ls/lsutil/utilities.go";

export const lsLsutilUtilitiesDeclarations: readonly UpstreamDeclaration[] = [
  {"line":16,"kind":"func","name":"ProbablyUsesSemicolons"},
  {"line":76,"kind":"func","name":"ShouldUseUriStyleNodeCoreModules"},
  {"line":90,"kind":"func","name":"QuotePreferenceFromString"},
  {"line":97,"kind":"func","name":"GetQuotePreference"},
  {"line":114,"kind":"func","name":"ModuleSymbolToValidIdentifier"},
  {"line":118,"kind":"func","name":"ModuleSpecifierToValidIdentifier"},
  {"line":153,"kind":"func","name":"IsNonContextualKeyword"},
];

export const lsLsutilUtilitiesSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsutil"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"strings\""},
  {"line":5,"text":"\t\"unicode\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":14,"text":")"},
  {"line":16,"text":"func ProbablyUsesSemicolons(file *ast.SourceFile) bool {"},
  {"line":17,"text":"\twithSemicolon := 0"},
  {"line":18,"text":"\twithoutSemicolon := 0"},
  {"line":19,"text":"\tnStatementsToObserve := 5"},
  {"line":21,"text":"\tvar visit func(node *ast.Node) bool"},
  {"line":22,"text":"\tvisit = func(node *ast.Node) bool {"},
  {"line":23,"text":"\t\tif node.Flags&ast.NodeFlagsReparsed != 0 {"},
  {"line":24,"text":"\t\t\treturn false"},
  {"line":25,"text":"\t\t}"},
  {"line":26,"text":"\t\tif SyntaxRequiresTrailingSemicolonOrASI(node.Kind) {"},
  {"line":27,"text":"\t\t\tlastToken := GetLastToken(node, file)"},
  {"line":28,"text":"\t\t\tif lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {"},
  {"line":29,"text":"\t\t\t\twithSemicolon++"},
  {"line":30,"text":"\t\t\t} else {"},
  {"line":31,"text":"\t\t\t\twithoutSemicolon++"},
  {"line":32,"text":"\t\t\t}"},
  {"line":33,"text":"\t\t} else if SyntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {"},
  {"line":34,"text":"\t\t\tlastToken := GetLastToken(node, file)"},
  {"line":35,"text":"\t\t\tif lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {"},
  {"line":36,"text":"\t\t\t\twithSemicolon++"},
  {"line":37,"text":"\t\t\t} else if lastToken != nil && lastToken.Kind != ast.KindCommaToken {"},
  {"line":38,"text":"\t\t\t\tlastTokenLine := scanner.GetECMALineOfPosition("},
  {"line":39,"text":"\t\t\t\t\tfile,"},
  {"line":40,"text":"\t\t\t\t\tastnav.GetStartOfNode(lastToken, file, false /*includeJSDoc*/))"},
  {"line":41,"text":"\t\t\t\tnextTokenLine := scanner.GetECMALineOfPosition("},
  {"line":42,"text":"\t\t\t\t\tfile,"},
  {"line":43,"text":"\t\t\t\t\tscanner.SkipTrivia(file.Text(), lastToken.End()))"},
  {"line":46,"text":"\t\t\t\tif lastTokenLine != nextTokenLine {"},
  {"line":47,"text":"\t\t\t\t\twithoutSemicolon++"},
  {"line":48,"text":"\t\t\t\t}"},
  {"line":49,"text":"\t\t\t}"},
  {"line":50,"text":"\t\t}"},
  {"line":52,"text":"\t\tif withSemicolon+withoutSemicolon >= nStatementsToObserve {"},
  {"line":53,"text":"\t\t\treturn true"},
  {"line":54,"text":"\t\t}"},
  {"line":56,"text":"\t\treturn node.ForEachChild(visit)"},
  {"line":57,"text":"\t}"},
  {"line":59,"text":"\tfile.ForEachChild(visit)"},
  {"line":63,"text":"\tif withSemicolon == 0 && withoutSemicolon <= 1 {"},
  {"line":64,"text":"\t\treturn true"},
  {"line":65,"text":"\t}"},
  {"line":70,"text":"\tif withoutSemicolon == 0 {"},
  {"line":71,"text":"\t\treturn true"},
  {"line":72,"text":"\t}"},
  {"line":73,"text":"\treturn withSemicolon*nStatementsToObserve > withoutSemicolon"},
  {"line":74,"text":"}"},
  {"line":76,"text":"func ShouldUseUriStyleNodeCoreModules(file *ast.SourceFile, program *compiler.Program) core.Tristate {"},
  {"line":77,"text":"\tfor _, node := range file.Imports() {"},
  {"line":78,"text":"\t\tif core.NodeCoreModules()[node.Text()] && !core.ExclusivelyPrefixedNodeCoreModules[node.Text()] {"},
  {"line":79,"text":"\t\t\tif strings.HasPrefix(node.Text(), \"node:\") {"},
  {"line":80,"text":"\t\t\t\treturn core.TSTrue"},
  {"line":81,"text":"\t\t\t} else {"},
  {"line":82,"text":"\t\t\t\treturn core.TSFalse"},
  {"line":83,"text":"\t\t\t}"},
  {"line":84,"text":"\t\t}"},
  {"line":85,"text":"\t}"},
  {"line":87,"text":"\treturn program.UsesUriStyleNodeCoreModules()"},
  {"line":88,"text":"}"},
  {"line":90,"text":"func QuotePreferenceFromString(str *ast.StringLiteral) QuotePreference {"},
  {"line":91,"text":"\tif str.TokenFlags&ast.TokenFlagsSingleQuote != 0 {"},
  {"line":92,"text":"\t\treturn QuotePreferenceSingle"},
  {"line":93,"text":"\t}"},
  {"line":94,"text":"\treturn QuotePreferenceDouble"},
  {"line":95,"text":"}"},
  {"line":97,"text":"func GetQuotePreference(sourceFile *ast.SourceFile, preferences UserPreferences) QuotePreference {"},
  {"line":98,"text":"\tif preferences.QuotePreference != \"\" && preferences.QuotePreference != \"auto\" {"},
  {"line":99,"text":"\t\tif preferences.QuotePreference == \"single\" {"},
  {"line":100,"text":"\t\t\treturn QuotePreferenceSingle"},
  {"line":101,"text":"\t\t}"},
  {"line":102,"text":"\t\treturn QuotePreferenceDouble"},
  {"line":103,"text":"\t}"},
  {"line":105,"text":"\tfirstModuleSpecifier := core.Find(sourceFile.Imports(), func(n *ast.Node) bool {"},
  {"line":106,"text":"\t\treturn ast.IsStringLiteral(n) && !ast.NodeIsSynthesized(n.Parent)"},
  {"line":107,"text":"\t})"},
  {"line":108,"text":"\tif firstModuleSpecifier != nil {"},
  {"line":109,"text":"\t\treturn QuotePreferenceFromString(firstModuleSpecifier.AsStringLiteral())"},
  {"line":110,"text":"\t}"},
  {"line":111,"text":"\treturn QuotePreferenceDouble"},
  {"line":112,"text":"}"},
  {"line":114,"text":"func ModuleSymbolToValidIdentifier(moduleSymbol *ast.Symbol, forceCapitalize bool) string {"},
  {"line":115,"text":"\treturn ModuleSpecifierToValidIdentifier(stringutil.StripQuotes(moduleSymbol.Name), forceCapitalize)"},
  {"line":116,"text":"}"},
  {"line":118,"text":"func ModuleSpecifierToValidIdentifier(moduleSpecifier string, forceCapitalize bool) string {"},
  {"line":119,"text":"\tbaseName := tspath.GetBaseFileName(strings.TrimSuffix(tspath.RemoveFileExtension(moduleSpecifier), \"/index\"))"},
  {"line":120,"text":"\tres := []rune{}"},
  {"line":121,"text":"\tlastCharWasValid := true"},
  {"line":122,"text":"\tbaseNameRunes := []rune(baseName)"},
  {"line":123,"text":"\tif len(baseNameRunes) > 0 && scanner.IsIdentifierStart(baseNameRunes[0]) {"},
  {"line":124,"text":"\t\tif forceCapitalize {"},
  {"line":125,"text":"\t\t\tres = append(res, unicode.ToUpper(baseNameRunes[0]))"},
  {"line":126,"text":"\t\t} else {"},
  {"line":127,"text":"\t\t\tres = append(res, baseNameRunes[0])"},
  {"line":128,"text":"\t\t}"},
  {"line":129,"text":"\t} else {"},
  {"line":130,"text":"\t\tlastCharWasValid = false"},
  {"line":131,"text":"\t}"},
  {"line":133,"text":"\tfor i := 1; i < len(baseNameRunes); i++ {"},
  {"line":134,"text":"\t\tisValid := scanner.IsIdentifierPart(baseNameRunes[i])"},
  {"line":135,"text":"\t\tif isValid {"},
  {"line":136,"text":"\t\t\tif !lastCharWasValid {"},
  {"line":137,"text":"\t\t\t\tres = append(res, unicode.ToUpper(baseNameRunes[i]))"},
  {"line":138,"text":"\t\t\t} else {"},
  {"line":139,"text":"\t\t\t\tres = append(res, baseNameRunes[i])"},
  {"line":140,"text":"\t\t\t}"},
  {"line":141,"text":"\t\t}"},
  {"line":142,"text":"\t\tlastCharWasValid = isValid"},
  {"line":143,"text":"\t}"},
  {"line":146,"text":"\tresString := string(res)"},
  {"line":147,"text":"\tif resString != \"\" && !IsNonContextualKeyword(scanner.StringToToken(resString)) {"},
  {"line":148,"text":"\t\treturn resString"},
  {"line":149,"text":"\t}"},
  {"line":150,"text":"\treturn \"_\" + resString"},
  {"line":151,"text":"}"},
  {"line":153,"text":"func IsNonContextualKeyword(token ast.Kind) bool {"},
  {"line":154,"text":"\treturn ast.IsKeywordKind(token) && !ast.IsContextualKeyword(token)"},
  {"line":155,"text":"}"},
];

export function findLsLsutilUtilitiesDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsLsutilUtilitiesDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsLsutilUtilitiesDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsLsutilUtilitiesDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsLsutilUtilitiesLineText(line: number): string | undefined {
  return lsLsutilUtilitiesSourceLines.find((entry) => entry.line === line)?.text;
}
