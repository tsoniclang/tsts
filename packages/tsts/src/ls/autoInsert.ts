/**
 * Language-service parity map for TS-Go `ls/autoinsert.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertUpstreamPath = "ls/autoinsert.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertDeclarations: readonly UpstreamDeclaration[] = [
  {"line":12,"kind":"func","name":"ProvideOnAutoInsert","receiver":"l *LanguageService"},
  {"line":68,"kind":"func","name":"isUnclosedTag"},
  {"line":84,"kind":"func","name":"isUnclosedFragment"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":10,"text":")"},
  {"line":12,"text":"func (l *LanguageService) ProvideOnAutoInsert(ctx context.Context, params *lsproto.VsOnAutoInsertParams) (lsproto.VsOnAutoInsertResponse, error) {"},
  {"line":13,"text":"\tif params.VSCh != \">\" {"},
  {"line":14,"text":"\t\treturn lsproto.VsOnAutoInsertResponse{}, nil"},
  {"line":15,"text":"\t}"},
  {"line":17,"text":"\t_, sourceFile := l.getProgramAndFile(params.VSTextDocument.Uri)"},
  {"line":18,"text":"\tposition := l.converters.LineAndCharacterToPosition(sourceFile, params.VSPosition)"},
  {"line":20,"text":"\ttoken := astnav.FindPrecedingToken(sourceFile, int(position))"},
  {"line":21,"text":"\tif token == nil {"},
  {"line":22,"text":"\t\treturn lsproto.VsOnAutoInsertResponse{}, nil"},
  {"line":23,"text":"\t}"},
  {"line":25,"text":"\tvar closingText string"},
  {"line":26,"text":"\tvar element *ast.Node"},
  {"line":27,"text":"\tif token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningElement(token.Parent) {"},
  {"line":28,"text":"\t\telement = token.Parent.Parent"},
  {"line":29,"text":"\t} else if ast.IsJsxText(token) && ast.IsJsxElement(token.Parent) {"},
  {"line":30,"text":"\t\telement = token.Parent"},
  {"line":31,"text":"\t}"},
  {"line":33,"text":"\tif element != nil && isUnclosedTag(element.AsJsxElement()) {"},
  {"line":34,"text":"\t\ttagNameNode := element.AsJsxElement().OpeningElement.TagName()"},
  {"line":36,"text":"\t\tclosingText = \"</\" + ast.EntityNameToString(tagNameNode, scanner.GetTextOfNode) + \">\""},
  {"line":37,"text":"\t} else {"},
  {"line":38,"text":"\t\tvar fragment *ast.Node"},
  {"line":39,"text":"\t\tif token.Kind == ast.KindGreaterThanToken && ast.IsJsxOpeningFragment(token.Parent) {"},
  {"line":40,"text":"\t\t\tfragment = token.Parent.Parent"},
  {"line":41,"text":"\t\t} else if ast.IsJsxText(token) && ast.IsJsxFragment(token.Parent) {"},
  {"line":42,"text":"\t\t\tfragment = token.Parent"},
  {"line":43,"text":"\t\t}"},
  {"line":45,"text":"\t\tif fragment != nil && isUnclosedFragment(fragment.AsJsxFragment()) {"},
  {"line":46,"text":"\t\t\tclosingText = \"</>\""},
  {"line":47,"text":"\t\t}"},
  {"line":48,"text":"\t}"},
  {"line":50,"text":"\tif closingText == \"\" {"},
  {"line":51,"text":"\t\treturn lsproto.VsOnAutoInsertResponse{}, nil"},
  {"line":52,"text":"\t}"},
  {"line":54,"text":"\treturn lsproto.VsOnAutoInsertResponse{"},
  {"line":55,"text":"\t\tVsOnAutoInsertResponseItem: &lsproto.VsOnAutoInsertResponseItem{"},
  {"line":56,"text":"\t\t\tVSTextEditFormat: lsproto.InsertTextFormatSnippet,"},
  {"line":57,"text":"\t\t\tVSTextEdit: &lsproto.TextEdit{"},
  {"line":58,"text":"\t\t\t\tRange: lsproto.Range{Start: params.VSPosition, End: params.VSPosition},"},
  {"line":62,"text":"\t\t\t\tNewText: \"$0\" + escapeSnippetText(closingText),"},
  {"line":63,"text":"\t\t\t},"},
  {"line":64,"text":"\t\t},"},
  {"line":65,"text":"\t}, nil"},
  {"line":66,"text":"}"},
  {"line":68,"text":"func isUnclosedTag(node *ast.JsxElement) bool {"},
  {"line":69,"text":"\topeningElement := node.OpeningElement"},
  {"line":70,"text":"\tclosingElement := node.ClosingElement"},
  {"line":71,"text":"\tif !ast.TagNamesAreEquivalent(openingElement.TagName(), closingElement.TagName()) {"},
  {"line":72,"text":"\t\treturn true"},
  {"line":73,"text":"\t}"},
  {"line":75,"text":"\tparent := node.Parent"},
  {"line":76,"text":"\tif ast.IsJsxElement(parent) {"},
  {"line":77,"text":"\t\tparent := parent.AsJsxElement()"},
  {"line":78,"text":"\t\treturn ast.TagNamesAreEquivalent(openingElement.TagName(), parent.OpeningElement.TagName()) && isUnclosedTag(parent)"},
  {"line":79,"text":"\t}"},
  {"line":81,"text":"\treturn false"},
  {"line":82,"text":"}"},
  {"line":84,"text":"func isUnclosedFragment(node *ast.JsxFragment) bool {"},
  {"line":85,"text":"\tclosingFragment := node.ClosingFragment"},
  {"line":86,"text":"\tif closingFragment.Flags&ast.NodeFlagsThisNodeHasError != 0 {"},
  {"line":87,"text":"\t\treturn true"},
  {"line":88,"text":"\t}"},
  {"line":90,"text":"\tparent := node.Parent"},
  {"line":91,"text":"\tif ast.IsJsxFragment(parent) && isUnclosedFragment(parent.AsJsxFragment()) {"},
  {"line":92,"text":"\t\treturn true"},
  {"line":93,"text":"\t}"},
  {"line":95,"text":"\treturn false"},
  {"line":96,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsAutoInsertSourceLines.find((entry) => entry.line === line)?.text;
}
