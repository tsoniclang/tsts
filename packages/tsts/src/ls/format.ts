/**
 * Language-service parity map for TS-Go `ls/format.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatUpstreamPath = "ls/format.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatDeclarations: readonly UpstreamDeclaration[] = [
  {"line":16,"kind":"func","name":"toLSProtoTextEdits","receiver":"l *LanguageService"},
  {"line":27,"kind":"func","name":"ProvideFormatDocument","receiver":"l *LanguageService"},
  {"line":42,"kind":"func","name":"ProvideFormatDocumentRange","receiver":"l *LanguageService"},
  {"line":59,"kind":"func","name":"ProvideFormatDocumentOnType","receiver":"l *LanguageService"},
  {"line":78,"kind":"func","name":"getFormattingEditsForRange","receiver":"l *LanguageService"},
  {"line":88,"kind":"func","name":"getFormattingEditsForDocument","receiver":"l *LanguageService"},
  {"line":97,"kind":"func","name":"getFormattingEditsAfterKeystroke","receiver":"l *LanguageService"},
  {"line":128,"kind":"func","name":"getRangeOfEnclosingComment"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":5,"text":"\t\"iter\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/format\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsutil\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":14,"text":")"},
  {"line":16,"text":"func (l *LanguageService) toLSProtoTextEdits(file *ast.SourceFile, changes []core.TextChange) []*lsproto.TextEdit {"},
  {"line":17,"text":"\tresult := make([]*lsproto.TextEdit, 0, len(changes))"},
  {"line":18,"text":"\tfor _, c := range changes {"},
  {"line":19,"text":"\t\tresult = append(result, &lsproto.TextEdit{"},
  {"line":20,"text":"\t\t\tNewText: c.NewText,"},
  {"line":21,"text":"\t\t\tRange:   l.createLspRangeFromBounds(c.Pos(), c.End(), file),"},
  {"line":22,"text":"\t\t})"},
  {"line":23,"text":"\t}"},
  {"line":24,"text":"\treturn result"},
  {"line":25,"text":"}"},
  {"line":27,"text":"func (l *LanguageService) ProvideFormatDocument("},
  {"line":28,"text":"\tctx context.Context,"},
  {"line":29,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":30,"text":"\toptions *lsproto.FormattingOptions,"},
  {"line":31,"text":") (lsproto.DocumentFormattingResponse, error) {"},
  {"line":32,"text":"\t_, file := l.getProgramAndFile(documentURI)"},
  {"line":33,"text":"\tformatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)"},
  {"line":34,"text":"\tedits := l.toLSProtoTextEdits(file, l.getFormattingEditsForDocument("},
  {"line":35,"text":"\t\tctx,"},
  {"line":36,"text":"\t\tfile,"},
  {"line":37,"text":"\t\tformatOpts,"},
  {"line":38,"text":"\t))"},
  {"line":39,"text":"\treturn lsproto.TextEditsOrNull{TextEdits: &edits}, nil"},
  {"line":40,"text":"}"},
  {"line":42,"text":"func (l *LanguageService) ProvideFormatDocumentRange("},
  {"line":43,"text":"\tctx context.Context,"},
  {"line":44,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":45,"text":"\toptions *lsproto.FormattingOptions,"},
  {"line":46,"text":"\tr lsproto.Range,"},
  {"line":47,"text":") (lsproto.DocumentRangeFormattingResponse, error) {"},
  {"line":48,"text":"\t_, file := l.getProgramAndFile(documentURI)"},
  {"line":49,"text":"\tformatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)"},
  {"line":50,"text":"\tedits := l.toLSProtoTextEdits(file, l.getFormattingEditsForRange("},
  {"line":51,"text":"\t\tctx,"},
  {"line":52,"text":"\t\tfile,"},
  {"line":53,"text":"\t\tformatOpts,"},
  {"line":54,"text":"\t\tl.converters.FromLSPRange(file, r),"},
  {"line":55,"text":"\t))"},
  {"line":56,"text":"\treturn lsproto.TextEditsOrNull{TextEdits: &edits}, nil"},
  {"line":57,"text":"}"},
  {"line":59,"text":"func (l *LanguageService) ProvideFormatDocumentOnType("},
  {"line":60,"text":"\tctx context.Context,"},
  {"line":61,"text":"\tdocumentURI lsproto.DocumentUri,"},
  {"line":62,"text":"\toptions *lsproto.FormattingOptions,"},
  {"line":63,"text":"\tposition lsproto.Position,"},
  {"line":64,"text":"\tcharacter string,"},
  {"line":65,"text":") (lsproto.DocumentOnTypeFormattingResponse, error) {"},
  {"line":66,"text":"\t_, file := l.getProgramAndFile(documentURI)"},
  {"line":67,"text":"\tformatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)"},
  {"line":68,"text":"\tedits := l.toLSProtoTextEdits(file, l.getFormattingEditsAfterKeystroke("},
  {"line":69,"text":"\t\tctx,"},
  {"line":70,"text":"\t\tfile,"},
  {"line":71,"text":"\t\tformatOpts,"},
  {"line":72,"text":"\t\tint(l.converters.LineAndCharacterToPosition(file, position)),"},
  {"line":73,"text":"\t\tcharacter,"},
  {"line":74,"text":"\t))"},
  {"line":75,"text":"\treturn lsproto.TextEditsOrNull{TextEdits: &edits}, nil"},
  {"line":76,"text":"}"},
  {"line":78,"text":"func (l *LanguageService) getFormattingEditsForRange("},
  {"line":79,"text":"\tctx context.Context,"},
  {"line":80,"text":"\tfile *ast.SourceFile,"},
  {"line":81,"text":"\toptions lsutil.FormatCodeSettings,"},
  {"line":82,"text":"\tr core.TextRange,"},
  {"line":83,"text":") []core.TextChange {"},
  {"line":84,"text":"\tctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)"},
  {"line":85,"text":"\treturn format.FormatSelection(ctx, file, r.Pos(), r.End())"},
  {"line":86,"text":"}"},
  {"line":88,"text":"func (l *LanguageService) getFormattingEditsForDocument("},
  {"line":89,"text":"\tctx context.Context,"},
  {"line":90,"text":"\tfile *ast.SourceFile,"},
  {"line":91,"text":"\toptions lsutil.FormatCodeSettings,"},
  {"line":92,"text":") []core.TextChange {"},
  {"line":93,"text":"\tctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)"},
  {"line":94,"text":"\treturn format.FormatDocument(ctx, file)"},
  {"line":95,"text":"}"},
  {"line":97,"text":"func (l *LanguageService) getFormattingEditsAfterKeystroke("},
  {"line":98,"text":"\tctx context.Context,"},
  {"line":99,"text":"\tfile *ast.SourceFile,"},
  {"line":100,"text":"\toptions lsutil.FormatCodeSettings,"},
  {"line":101,"text":"\tposition int,"},
  {"line":102,"text":"\tkey string,"},
  {"line":103,"text":") []core.TextChange {"},
  {"line":104,"text":"\tctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)"},
  {"line":106,"text":"\ttokenAtPosition := astnav.GetTokenAtPosition(file, position)"},
  {"line":107,"text":"\tif isInComment(file, position, tokenAtPosition) == nil {"},
  {"line":108,"text":"\t\tswitch key {"},
  {"line":109,"text":"\t\tcase \"{\":"},
  {"line":110,"text":"\t\t\treturn format.FormatOnOpeningCurly(ctx, file, position)"},
  {"line":111,"text":"\t\tcase \"}\":"},
  {"line":112,"text":"\t\t\treturn format.FormatOnClosingCurly(ctx, file, position)"},
  {"line":113,"text":"\t\tcase \";\":"},
  {"line":114,"text":"\t\t\treturn format.FormatOnSemicolon(ctx, file, position)"},
  {"line":115,"text":"\t\tcase \"\\n\":"},
  {"line":116,"text":"\t\t\treturn format.FormatOnEnter(ctx, file, position)"},
  {"line":117,"text":"\t\tdefault:"},
  {"line":118,"text":"\t\t\treturn nil"},
  {"line":119,"text":"\t\t}"},
  {"line":120,"text":"\t}"},
  {"line":121,"text":"\treturn nil"},
  {"line":122,"text":"}"},
  {"line":128,"text":"func getRangeOfEnclosingComment("},
  {"line":129,"text":"\tfile *ast.SourceFile,"},
  {"line":130,"text":"\tposition int,"},
  {"line":131,"text":"\tprecedingToken *ast.Node,"},
  {"line":132,"text":"\ttokenAtPosition *ast.Node,"},
  {"line":133,"text":") *ast.CommentRange {"},
  {"line":134,"text":"\tjsdoc := ast.FindAncestor(tokenAtPosition, (*ast.Node).IsJSDoc)"},
  {"line":135,"text":"\tif jsdoc != nil {"},
  {"line":136,"text":"\t\ttokenAtPosition = jsdoc.Parent"},
  {"line":137,"text":"\t}"},
  {"line":138,"text":"\ttokenStart := astnav.GetStartOfNode(tokenAtPosition, file, false /*includeJSDoc*/)"},
  {"line":139,"text":"\tif tokenStart <= position && position < tokenAtPosition.End() {"},
  {"line":140,"text":"\t\treturn nil"},
  {"line":141,"text":"\t}"},
  {"line":145,"text":"\tvar trailingRangesOfPreviousToken iter.Seq[ast.CommentRange]"},
  {"line":146,"text":"\tif precedingToken != nil {"},
  {"line":147,"text":"\t\ttrailingRangesOfPreviousToken = scanner.GetTrailingCommentRanges(&ast.NodeFactory{}, file.Text(), precedingToken.End())"},
  {"line":148,"text":"\t}"},
  {"line":149,"text":"\tleadingRangesOfNextToken := getLeadingCommentRangesOfNode(tokenAtPosition, file)"},
  {"line":150,"text":"\tcommentRanges := core.ConcatenateSeq(trailingRangesOfPreviousToken, leadingRangesOfNextToken)"},
  {"line":151,"text":"\tfor commentRange := range commentRanges {"},
  {"line":165,"text":"\t\tif commentRange.ContainsExclusive(position) ||"},
  {"line":166,"text":"\t\t\tposition == commentRange.End() &&"},
  {"line":167,"text":"\t\t\t\t(commentRange.Kind == ast.KindSingleLineCommentTrivia || position == len(file.Text())) {"},
  {"line":168,"text":"\t\t\treturn &commentRange"},
  {"line":169,"text":"\t\t}"},
  {"line":170,"text":"\t}"},
  {"line":171,"text":"\treturn nil"},
  {"line":172,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsFormatSourceLines.find((entry) => entry.line === line)?.text;
}
