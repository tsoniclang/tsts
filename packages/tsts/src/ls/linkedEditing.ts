/**
 * Language-service parity map for TS-Go `ls/linkedediting.go`.
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

export const lsLinkedEditingUpstreamPath = "ls/linkedediting.go";

export const lsLinkedEditingDeclarations: readonly UpstreamDeclaration[] = [
  {"line":15,"kind":"var","name":"jsxTagWordPattern"},
  {"line":17,"kind":"func","name":"ProvideLinkedEditingRange","receiver":"l *LanguageService"},
];

export const lsLinkedEditingSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":12,"text":")"},
  {"line":15,"text":"var jsxTagWordPattern = new(\"[a-zA-Z0-9:\\\\-\\\\._$]*\")"},
  {"line":17,"text":"func (l *LanguageService) ProvideLinkedEditingRange(ctx context.Context, params *lsproto.LinkedEditingRangeParams) (lsproto.LinkedEditingRangeResponse, error) {"},
  {"line":18,"text":"\t_, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)"},
  {"line":19,"text":"\tposition := l.converters.LineAndCharacterToPosition(sourceFile, params.Position)"},
  {"line":20,"text":"\ttoken := astnav.FindPrecedingToken(sourceFile, int(position))"},
  {"line":22,"text":"\tif token == nil || token.Parent.Kind == ast.KindSourceFile {"},
  {"line":23,"text":"\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":24,"text":"\t}"},
  {"line":26,"text":"\tif ast.IsJsxFragment(token.Parent.Parent) {"},
  {"line":27,"text":"\t\tfragment := token.Parent.Parent.AsJsxFragment()"},
  {"line":28,"text":"\t\topenFragment := fragment.OpeningFragment"},
  {"line":29,"text":"\t\tcloseFragment := fragment.ClosingFragment"},
  {"line":30,"text":"\t\tif openFragment.Flags&ast.NodeFlagsThisNodeOrAnySubNodesHasError != 0 || closeFragment.Flags&ast.NodeFlagsThisNodeOrAnySubNodesHasError != 0 {"},
  {"line":31,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":32,"text":"\t\t}"},
  {"line":34,"text":"\t\topenPos := core.TextPos(astnav.GetStartOfNode(openFragment.AsNode(), sourceFile, false) + len(\"<\"))"},
  {"line":35,"text":"\t\tclosePos := core.TextPos(astnav.GetStartOfNode(closeFragment.AsNode(), sourceFile, false) + len(\"</\"))"},
  {"line":38,"text":"\t\tif (position != openPos) && (position != closePos) {"},
  {"line":39,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":40,"text":"\t\t}"},
  {"line":42,"text":"\t\topenLineChar := l.converters.PositionToLineAndCharacter(sourceFile, openPos)"},
  {"line":43,"text":"\t\tcloseLineChar := l.converters.PositionToLineAndCharacter(sourceFile, closePos)"},
  {"line":44,"text":"\t\treturn lsproto.LinkedEditingRangeResponse{"},
  {"line":45,"text":"\t\t\tLinkedEditingRanges: &lsproto.LinkedEditingRanges{"},
  {"line":46,"text":"\t\t\t\tRanges: []lsproto.Range{"},
  {"line":47,"text":"\t\t\t\t\t{Start: openLineChar, End: openLineChar}, // only return start position for opening tag since the length of a fragment is always 3 and it is unlikely user will type in the middle of a fragment tag"},
  {"line":48,"text":"\t\t\t\t\t{Start: closeLineChar, End: closeLineChar},"},
  {"line":49,"text":"\t\t\t\t},"},
  {"line":50,"text":"\t\t\t\tWordPattern: jsxTagWordPattern,"},
  {"line":51,"text":"\t\t\t},"},
  {"line":52,"text":"\t\t}, nil"},
  {"line":53,"text":"\t} else {"},
  {"line":55,"text":"\t\ttag := ast.FindAncestor(token.Parent, func(n *ast.Node) bool {"},
  {"line":56,"text":"\t\t\tif ast.IsJsxOpeningElement(n) || ast.IsJsxClosingElement(n) {"},
  {"line":57,"text":"\t\t\t\treturn true"},
  {"line":58,"text":"\t\t\t}"},
  {"line":59,"text":"\t\t\treturn false"},
  {"line":60,"text":"\t\t})"},
  {"line":61,"text":"\t\tif tag == nil {"},
  {"line":62,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":63,"text":"\t\t}"},
  {"line":64,"text":"\t\tdebug.Assert(ast.IsJsxOpeningElement(tag) || ast.IsJsxClosingElement(tag), \"tag should be opening or closing element\")"},
  {"line":66,"text":"\t\tjsxElement := tag.Parent.AsJsxElement()"},
  {"line":67,"text":"\t\topenTag := jsxElement.OpeningElement"},
  {"line":68,"text":"\t\tcloseTag := jsxElement.ClosingElement"},
  {"line":70,"text":"\t\topenTagNameStart := astnav.GetStartOfNode(openTag.TagName().AsNode(), sourceFile, false)"},
  {"line":71,"text":"\t\topenTagNameEnd := openTag.TagName().End()"},
  {"line":72,"text":"\t\tcloseTagNameStart := astnav.GetStartOfNode(closeTag.TagName().AsNode(), sourceFile, false)"},
  {"line":73,"text":"\t\tcloseTagNameEnd := closeTag.TagName().End()"},
  {"line":75,"text":"\t\tif openTagNameStart == astnav.GetStartOfNode(openTag.AsNode(), sourceFile, false) || closeTagNameStart == astnav.GetStartOfNode(closeTag.AsNode(), sourceFile, false) ||"},
  {"line":76,"text":"\t\t\topenTagNameEnd == openTag.End() || closeTagNameEnd == closeTag.End() {"},
  {"line":77,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":78,"text":"\t\t}"},
  {"line":80,"text":"\t\tpositionInt := int(position)"},
  {"line":81,"text":"\t\tif !(openTagNameStart <= positionInt && positionInt <= openTagNameEnd || closeTagNameStart <= positionInt && positionInt <= closeTagNameEnd) {"},
  {"line":82,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":83,"text":"\t\t}"},
  {"line":86,"text":"\t\topeningTagText := scanner.GetTextOfNode(openTag.TagName().AsNode())"},
  {"line":87,"text":"\t\tif openingTagText != scanner.GetTextOfNode(closeTag.TagName().AsNode()) {"},
  {"line":88,"text":"\t\t\treturn lsproto.LinkedEditingRangeResponse{}, nil"},
  {"line":89,"text":"\t\t}"},
  {"line":91,"text":"\t\treturn lsproto.LinkedEditingRangeResponse{"},
  {"line":92,"text":"\t\t\tLinkedEditingRanges: &lsproto.LinkedEditingRanges{"},
  {"line":93,"text":"\t\t\t\tRanges: []lsproto.Range{"},
  {"line":94,"text":"\t\t\t\t\t{"},
  {"line":95,"text":"\t\t\t\t\t\tStart: l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(openTagNameStart)),"},
  {"line":96,"text":"\t\t\t\t\t\tEnd:   l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(openTagNameEnd)),"},
  {"line":97,"text":"\t\t\t\t\t},"},
  {"line":98,"text":"\t\t\t\t\t{"},
  {"line":99,"text":"\t\t\t\t\t\tStart: l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(closeTagNameStart)),"},
  {"line":100,"text":"\t\t\t\t\t\tEnd:   l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(closeTagNameEnd)),"},
  {"line":101,"text":"\t\t\t\t\t},"},
  {"line":102,"text":"\t\t\t\t},"},
  {"line":103,"text":"\t\t\t\tWordPattern: jsxTagWordPattern,"},
  {"line":104,"text":"\t\t\t},"},
  {"line":105,"text":"\t\t}, nil"},
  {"line":106,"text":"\t}"},
  {"line":107,"text":"}"},
];

export function findLsLinkedEditingDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsLinkedEditingDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsLinkedEditingDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsLinkedEditingDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsLinkedEditingLineText(line: number): string | undefined {
  return lsLinkedEditingSourceLines.find((entry) => entry.line === line)?.text;
}
