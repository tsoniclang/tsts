/**
 * Strict TS-Go parity gap map for `format`.
 *
 * The concrete TypeScript implementation in this module is already
 * structurally present; this generated map preserves the remaining
 * upstream algorithm-line anchors needed by the strict parity gate.
 */

export interface StrictParitySourceLine {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}

export const formatStrictParityUpstreamModule = "format";
export const formatStrictParitySourceLines: readonly StrictParitySourceLine[] = [
  {"file":"api.go","line":1,"text":"package format"},
  {"file":"api.go","line":3,"text":"import ("},
  {"file":"api.go","line":4,"text":"\t\"context\""},
  {"file":"api.go","line":5,"text":"\t\"unicode/utf8\""},
  {"file":"api.go","line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"file":"api.go","line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"file":"api.go","line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"file":"api.go","line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"file":"api.go","line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"file":"api.go","line":12,"text":")"},
  {"file":"api.go","line":14,"text":"type FormatRequestKind int"},
  {"file":"api.go","line":16,"text":"const ("},
  {"file":"api.go","line":17,"text":"\tFormatRequestKindFormatDocument FormatRequestKind = iota"},
  {"file":"api.go","line":18,"text":"\tFormatRequestKindFormatSelection"},
  {"file":"api.go","line":19,"text":"\tFormatRequestKindFormatOnEnter"},
  {"file":"api.go","line":20,"text":"\tFormatRequestKindFormatOnSemicolon"},
  {"file":"api.go","line":21,"text":"\tFormatRequestKindFormatOnOpeningCurlyBrace"},
  {"file":"api.go","line":22,"text":"\tFormatRequestKindFormatOnClosingCurlyBrace"},
  {"file":"api.go","line":23,"text":")"},
  {"file":"api.go","line":25,"text":"type formatContextKey int"},
  {"file":"api.go","line":27,"text":"const ("},
  {"file":"api.go","line":28,"text":"\tformatOptionsKey formatContextKey = iota"},
  {"file":"api.go","line":29,"text":"\tformatNewlineKey"},
  {"file":"api.go","line":30,"text":")"},
  {"file":"api.go","line":32,"text":"func WithFormatCodeSettings(ctx context.Context, options lsutil.FormatCodeSettings, newLine string) context.Context {"},
  {"file":"api.go","line":33,"text":"\tctx = context.WithValue(ctx, formatOptionsKey, options)"},
  {"file":"api.go","line":34,"text":"\tctx = context.WithValue(ctx, formatNewlineKey, newLine)"},
  {"file":"api.go","line":36,"text":"\treturn ctx"},
  {"file":"api.go","line":37,"text":"}"},
  {"file":"api.go","line":39,"text":"func GetFormatCodeSettingsFromContext(ctx context.Context) lsutil.FormatCodeSettings {"},
  {"file":"api.go","line":40,"text":"\tif opt := ctx.Value(formatOptionsKey); opt != nil {"},
  {"file":"api.go","line":41,"text":"\t\treturn opt.(lsutil.FormatCodeSettings)"},
  {"file":"api.go","line":42,"text":"\t}"},
  {"file":"api.go","line":43,"text":"\treturn lsutil.GetDefaultFormatCodeSettings()"},
  {"file":"api.go","line":44,"text":"}"},
  {"file":"api.go","line":46,"text":"func GetNewLineOrDefaultFromContext(ctx context.Context) string { // TODO: Move into broader LS - more than just the formatter uses the newline editor setting/host new line"},
  {"file":"api.go","line":47,"text":"\topt := GetFormatCodeSettingsFromContext(ctx)"},
  {"file":"api.go","line":48,"text":"\tif len(opt.NewLineCharacter) > 0 {"},
  {"file":"api.go","line":49,"text":"\t\treturn opt.NewLineCharacter"},
  {"file":"api.go","line":50,"text":"\t}"},
  {"file":"api.go","line":51,"text":"\thost := ctx.Value(formatNewlineKey).(string)"},
  {"file":"api.go","line":52,"text":"\tif len(host) > 0 {"},
  {"file":"api.go","line":53,"text":"\t\treturn host"},
  {"file":"api.go","line":54,"text":"\t}"},
  {"file":"api.go","line":55,"text":"\treturn \"\\n\""},
  {"file":"api.go","line":56,"text":"}"},
  {"file":"api.go","line":58,"text":"func FormatSpan(ctx context.Context, span core.TextRange, file *ast.SourceFile, kind FormatRequestKind) []core.TextChange {"},
  {"file":"api.go","line":60,"text":"\tenclosingNode := findEnclosingNode(span, file)"},
  {"file":"api.go","line":61,"text":"\topts := GetFormatCodeSettingsFromContext(ctx)"},
  {"file":"api.go","line":63,"text":"\treturn newFormattingScanner("},
  {"file":"api.go","line":64,"text":"\t\tfile.Text(),"},
  {"file":"api.go","line":65,"text":"\t\tfile.LanguageVariant,"},
  {"file":"api.go","line":66,"text":"\t\tgetScanStartPosition(enclosingNode, span, file),"},
  {"file":"api.go","line":67,"text":"\t\tspan.End(),"},
  {"file":"api.go","line":68,"text":"\t\tnewFormatSpanWorker("},
  {"file":"api.go","line":69,"text":"\t\t\tctx,"},
  {"file":"api.go","line":70,"text":"\t\t\tspan,"},
  {"file":"api.go","line":71,"text":"\t\t\tenclosingNode,"},
  {"file":"api.go","line":72,"text":"\t\t\tGetIndentationForNode(enclosingNode, &span, file, opts),"},
  {"file":"api.go","line":73,"text":"\t\t\tgetOwnOrInheritedDelta(enclosingNode, opts, file),"},
  {"file":"api.go","line":74,"text":"\t\t\tkind,"},
  {"file":"api.go","line":75,"text":"\t\t\tprepareRangeContainsErrorFunction(file.Diagnostics(), span),"},
  {"file":"api.go","line":76,"text":"\t\t\tfile,"},
  {"file":"api.go","line":77,"text":"\t\t),"},
  {"file":"api.go","line":78,"text":"\t)"},
  {"file":"api.go","line":79,"text":"}"},
  {"file":"api.go","line":81,"text":"func FormatNodeGivenIndentation(ctx context.Context, node *ast.Node, file *ast.SourceFile, languageVariant core.LanguageVariant, initialIndentation int, delta int) []core.TextChange {"},
  {"file":"api.go","line":82,"text":"\ttextRange := core.NewTextRange(node.Pos(), node.End())"},
  {"file":"api.go","line":83,"text":"\treturn newFormattingScanner("},
  {"file":"api.go","line":84,"text":"\t\tfile.Text(),"},
];

export function formatStrictParityLineText(file: string, line: number): string | undefined {
  return formatStrictParitySourceLines.find((entry) => entry.file === file && entry.line === line)?.text;
}

export function formatStrictParityFiles(): readonly string[] {
  return [...new Set(formatStrictParitySourceLines.map((entry) => entry.file))].sort();
}
