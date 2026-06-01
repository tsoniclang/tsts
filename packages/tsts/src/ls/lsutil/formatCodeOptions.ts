/**
 * Language-service parity map for TS-Go `ls/lsutil/formatcodeoptions.go`.
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

export const lsLsutilFormatCodeOptionsUpstreamPath = "ls/lsutil/formatcodeoptions.go";

export const lsLsutilFormatCodeOptionsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":11,"kind":"type","name":"IndentStyle"},
  {"line":19,"kind":"func","name":"parseIndentStyle"},
  {"line":38,"kind":"type","name":"SemicolonPreference"},
  {"line":46,"kind":"func","name":"parseSemicolonPreference"},
  {"line":60,"kind":"type","name":"EditorSettings"},
  {"line":70,"kind":"type","name":"FormatCodeSettings"},
  {"line":94,"kind":"func","name":"FromLSFormatOptions"},
  {"line":105,"kind":"func","name":"ToLSFormatOptions","receiver":"settings FormatCodeSettings"},
  {"line":114,"kind":"func","name":"GetDefaultFormatCodeSettings"},
];

export const lsLsutilFormatCodeOptionsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsutil"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"strings\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/printer\""},
  {"line":9,"text":")"},
  {"line":11,"text":"type IndentStyle int"},
  {"line":13,"text":"const ("},
  {"line":14,"text":"\tIndentStyleNone IndentStyle = iota"},
  {"line":15,"text":"\tIndentStyleBlock"},
  {"line":16,"text":"\tIndentStyleSmart"},
  {"line":17,"text":")"},
  {"line":19,"text":"func parseIndentStyle(v any) IndentStyle {"},
  {"line":20,"text":"\tswitch s := v.(type) {"},
  {"line":21,"text":"\tcase string:"},
  {"line":22,"text":"\t\tswitch strings.ToLower(s) {"},
  {"line":23,"text":"\t\tcase \"none\":"},
  {"line":24,"text":"\t\t\treturn IndentStyleNone"},
  {"line":25,"text":"\t\tcase \"block\":"},
  {"line":26,"text":"\t\t\treturn IndentStyleBlock"},
  {"line":27,"text":"\t\tcase \"smart\":"},
  {"line":28,"text":"\t\t\treturn IndentStyleSmart"},
  {"line":29,"text":"\t\t}"},
  {"line":30,"text":"\tcase float64:"},
  {"line":31,"text":"\t\treturn IndentStyle(int(s))"},
  {"line":32,"text":"\tcase int:"},
  {"line":33,"text":"\t\treturn IndentStyle(s)"},
  {"line":34,"text":"\t}"},
  {"line":35,"text":"\treturn IndentStyleSmart"},
  {"line":36,"text":"}"},
  {"line":38,"text":"type SemicolonPreference string"},
  {"line":40,"text":"const ("},
  {"line":41,"text":"\tSemicolonPreferenceIgnore SemicolonPreference = \"ignore\""},
  {"line":42,"text":"\tSemicolonPreferenceInsert SemicolonPreference = \"insert\""},
  {"line":43,"text":"\tSemicolonPreferenceRemove SemicolonPreference = \"remove\""},
  {"line":44,"text":")"},
  {"line":46,"text":"func parseSemicolonPreference(v any) SemicolonPreference {"},
  {"line":47,"text":"\tif s, ok := v.(string); ok {"},
  {"line":48,"text":"\t\tswitch strings.ToLower(s) {"},
  {"line":49,"text":"\t\tcase \"ignore\":"},
  {"line":50,"text":"\t\t\treturn SemicolonPreferenceIgnore"},
  {"line":51,"text":"\t\tcase \"insert\":"},
  {"line":52,"text":"\t\t\treturn SemicolonPreferenceInsert"},
  {"line":53,"text":"\t\tcase \"remove\":"},
  {"line":54,"text":"\t\t\treturn SemicolonPreferenceRemove"},
  {"line":55,"text":"\t\t}"},
  {"line":56,"text":"\t}"},
  {"line":57,"text":"\treturn SemicolonPreferenceIgnore"},
  {"line":58,"text":"}"},
  {"line":60,"text":"type EditorSettings struct {"},
  {"line":61,"text":"\tBaseIndentSize         int           `raw:\"baseIndentSize\" config:\"format.baseIndentSize\"`"},
  {"line":62,"text":"\tIndentSize             int           `raw:\"indentSize\" config:\"format.indentSize\"`"},
  {"line":63,"text":"\tTabSize                int           `raw:\"tabSize\" config:\"format.tabSize\"`"},
  {"line":64,"text":"\tNewLineCharacter       string        `raw:\"newLineCharacter\" config:\"format.newLineCharacter\"`"},
  {"line":65,"text":"\tConvertTabsToSpaces    core.Tristate `raw:\"convertTabsToSpaces\" config:\"format.convertTabsToSpaces\"`"},
  {"line":66,"text":"\tIndentStyle            IndentStyle   `raw:\"indentStyle\" config:\"format.indentStyle\"`"},
  {"line":67,"text":"\tTrimTrailingWhitespace core.Tristate `raw:\"trimTrailingWhitespace\" config:\"format.trimTrailingWhitespace\"`"},
  {"line":68,"text":"}"},
  {"line":70,"text":"type FormatCodeSettings struct {"},
  {"line":71,"text":"\tEditorSettings"},
  {"line":72,"text":"\tInsertSpaceAfterCommaDelimiter                              core.Tristate       `raw:\"insertSpaceAfterCommaDelimiter\" config:\"format.insertSpaceAfterCommaDelimiter\"`"},
  {"line":73,"text":"\tInsertSpaceAfterSemicolonInForStatements                    core.Tristate       `raw:\"insertSpaceAfterSemicolonInForStatements\" config:\"format.insertSpaceAfterSemicolonInForStatements\"`"},
  {"line":74,"text":"\tInsertSpaceBeforeAndAfterBinaryOperators                    core.Tristate       `raw:\"insertSpaceBeforeAndAfterBinaryOperators\" config:\"format.insertSpaceBeforeAndAfterBinaryOperators\"`"},
  {"line":75,"text":"\tInsertSpaceAfterConstructor                                 core.Tristate       `raw:\"insertSpaceAfterConstructor\" config:\"format.insertSpaceAfterConstructor\"`"},
  {"line":76,"text":"\tInsertSpaceAfterKeywordsInControlFlowStatements             core.Tristate       `raw:\"insertSpaceAfterKeywordsInControlFlowStatements\" config:\"format.insertSpaceAfterKeywordsInControlFlowStatements\"`"},
  {"line":77,"text":"\tInsertSpaceAfterFunctionKeywordForAnonymousFunctions        core.Tristate       `raw:\"insertSpaceAfterFunctionKeywordForAnonymousFunctions\" config:\"format.insertSpaceAfterFunctionKeywordForAnonymousFunctions\"`"},
  {"line":78,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis  core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis\"`"},
  {"line":79,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets     core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets\"`"},
  {"line":80,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces       core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces\"`"},
  {"line":81,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingEmptyBraces          core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingEmptyBraces\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces\"`"},
  {"line":82,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces\"`"},
  {"line":83,"text":"\tInsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces  core.Tristate       `raw:\"insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces\" config:\"format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces\"`"},
  {"line":84,"text":"\tInsertSpaceAfterTypeAssertion                               core.Tristate       `raw:\"insertSpaceAfterTypeAssertion\" config:\"format.insertSpaceAfterTypeAssertion\"`"},
  {"line":85,"text":"\tInsertSpaceBeforeFunctionParenthesis                        core.Tristate       `raw:\"insertSpaceBeforeFunctionParenthesis\" config:\"format.insertSpaceBeforeFunctionParenthesis\"`"},
  {"line":86,"text":"\tPlaceOpenBraceOnNewLineForFunctions                         core.Tristate       `raw:\"placeOpenBraceOnNewLineForFunctions\" config:\"format.placeOpenBraceOnNewLineForFunctions\"`"},
  {"line":87,"text":"\tPlaceOpenBraceOnNewLineForControlBlocks                     core.Tristate       `raw:\"placeOpenBraceOnNewLineForControlBlocks\" config:\"format.placeOpenBraceOnNewLineForControlBlocks\"`"},
  {"line":88,"text":"\tInsertSpaceBeforeTypeAnnotation                             core.Tristate       `raw:\"insertSpaceBeforeTypeAnnotation\" config:\"format.insertSpaceBeforeTypeAnnotation\"`"},
  {"line":89,"text":"\tIndentMultiLineObjectLiteralBeginningOnBlankLine            core.Tristate       `raw:\"indentMultiLineObjectLiteralBeginningOnBlankLine\" config:\"format.indentMultiLineObjectLiteralBeginningOnBlankLine\"`"},
  {"line":90,"text":"\tSemicolons                                                  SemicolonPreference `raw:\"semicolons\" config:\"format.semicolons\"`"},
  {"line":91,"text":"\tIndentSwitchCase                                            core.Tristate       `raw:\"indentSwitchCase\" config:\"format.indentSwitchCase\"`"},
  {"line":92,"text":"}"},
  {"line":94,"text":"func FromLSFormatOptions(f FormatCodeSettings, opt *lsproto.FormattingOptions) FormatCodeSettings {"},
  {"line":95,"text":"\tupdatedSettings := f"},
  {"line":96,"text":"\tupdatedSettings.TabSize = int(opt.TabSize)"},
  {"line":97,"text":"\tupdatedSettings.IndentSize = int(opt.TabSize)"},
  {"line":98,"text":"\tupdatedSettings.ConvertTabsToSpaces = core.BoolToTristate(opt.InsertSpaces)"},
  {"line":99,"text":"\tif opt.TrimTrailingWhitespace != nil {"},
  {"line":100,"text":"\t\tupdatedSettings.TrimTrailingWhitespace = core.BoolToTristate(*opt.TrimTrailingWhitespace)"},
  {"line":101,"text":"\t}"},
  {"line":102,"text":"\treturn updatedSettings"},
  {"line":103,"text":"}"},
  {"line":105,"text":"func (settings FormatCodeSettings) ToLSFormatOptions() *lsproto.FormattingOptions {"},
  {"line":106,"text":"\ttrimTrailingWhitespace := settings.TrimTrailingWhitespace.IsTrue()"},
  {"line":107,"text":"\treturn &lsproto.FormattingOptions{"},
  {"line":108,"text":"\t\tTabSize:                uint32(settings.TabSize),"},
  {"line":109,"text":"\t\tInsertSpaces:           settings.ConvertTabsToSpaces.IsTrue(),"},
  {"line":110,"text":"\t\tTrimTrailingWhitespace: &trimTrailingWhitespace,"},
  {"line":111,"text":"\t}"},
  {"line":112,"text":"}"},
  {"line":114,"text":"func GetDefaultFormatCodeSettings() FormatCodeSettings {"},
  {"line":115,"text":"\treturn FormatCodeSettings{"},
  {"line":116,"text":"\t\tEditorSettings: EditorSettings{"},
  {"line":117,"text":"\t\t\tIndentSize:             printer.GetDefaultIndentSize(),"},
  {"line":118,"text":"\t\t\tTabSize:                printer.GetDefaultIndentSize(),"},
  {"line":119,"text":"\t\t\tNewLineCharacter:       \"\\n\","},
  {"line":120,"text":"\t\t\tConvertTabsToSpaces:    core.TSTrue,"},
  {"line":121,"text":"\t\t\tIndentStyle:            IndentStyleSmart,"},
  {"line":122,"text":"\t\t\tTrimTrailingWhitespace: core.TSTrue,"},
  {"line":123,"text":"\t\t},"},
  {"line":124,"text":"\t\tInsertSpaceAfterConstructor:                                 core.TSFalse,"},
  {"line":125,"text":"\t\tInsertSpaceAfterCommaDelimiter:                              core.TSTrue,"},
  {"line":126,"text":"\t\tInsertSpaceAfterSemicolonInForStatements:                    core.TSTrue,"},
  {"line":127,"text":"\t\tInsertSpaceBeforeAndAfterBinaryOperators:                    core.TSTrue,"},
  {"line":128,"text":"\t\tInsertSpaceAfterKeywordsInControlFlowStatements:             core.TSTrue,"},
  {"line":129,"text":"\t\tInsertSpaceAfterFunctionKeywordForAnonymousFunctions:        core.TSFalse,"},
  {"line":130,"text":"\t\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:  core.TSFalse,"},
  {"line":131,"text":"\t\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:     core.TSFalse,"},
  {"line":132,"text":"\t\tInsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces:       core.TSTrue,"},
  {"line":133,"text":"\t\tInsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: core.TSFalse,"},
  {"line":134,"text":"\t\tInsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces:  core.TSFalse,"},
  {"line":135,"text":"\t\tInsertSpaceBeforeFunctionParenthesis:                        core.TSFalse,"},
  {"line":136,"text":"\t\tPlaceOpenBraceOnNewLineForFunctions:                         core.TSFalse,"},
  {"line":137,"text":"\t\tPlaceOpenBraceOnNewLineForControlBlocks:                     core.TSFalse,"},
  {"line":138,"text":"\t\tSemicolons:                                                  SemicolonPreferenceIgnore,"},
  {"line":139,"text":"\t\tIndentSwitchCase:                                            core.TSTrue,"},
  {"line":140,"text":"\t}"},
  {"line":141,"text":"}"},
];

export function findLsLsutilFormatCodeOptionsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsLsutilFormatCodeOptionsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsLsutilFormatCodeOptionsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsLsutilFormatCodeOptionsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsLsutilFormatCodeOptionsLineText(line: number): string | undefined {
  return lsLsutilFormatCodeOptionsSourceLines.find((entry) => entry.line === line)?.text;
}
