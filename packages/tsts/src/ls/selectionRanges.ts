/**
 * Language-service parity map for TS-Go `ls/selectionranges.go`.
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

export const lsSelectionRangesUpstreamPath = "ls/selectionranges.go";

export const lsSelectionRangesDeclarations: readonly UpstreamDeclaration[] = [
  {"line":13,"kind":"func","name":"ProvideSelectionRanges","receiver":"l *LanguageService"},
  {"line":31,"kind":"func","name":"getSmartSelectionRange"},
];

export const lsSelectionRangesSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":11,"text":")"},
  {"line":13,"text":"func (l *LanguageService) ProvideSelectionRanges(ctx context.Context, params *lsproto.SelectionRangeParams) (lsproto.SelectionRangeResponse, error) {"},
  {"line":14,"text":"\t_, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)"},
  {"line":15,"text":"\tif sourceFile == nil {"},
  {"line":16,"text":"\t\treturn lsproto.SelectionRangesOrNull{}, nil"},
  {"line":17,"text":"\t}"},
  {"line":19,"text":"\tvar results []*lsproto.SelectionRange"},
  {"line":20,"text":"\tfor _, position := range params.Positions {"},
  {"line":21,"text":"\t\tpos := l.converters.LineAndCharacterToPosition(sourceFile, position)"},
  {"line":22,"text":"\t\tselectionRange := getSmartSelectionRange(l, sourceFile, int(pos))"},
  {"line":23,"text":"\t\tif selectionRange != nil {"},
  {"line":24,"text":"\t\t\tresults = append(results, selectionRange)"},
  {"line":25,"text":"\t\t}"},
  {"line":26,"text":"\t}"},
  {"line":28,"text":"\treturn lsproto.SelectionRangesOrNull{SelectionRanges: &results}, nil"},
  {"line":29,"text":"}"},
  {"line":31,"text":"func getSmartSelectionRange(l *LanguageService, sourceFile *ast.SourceFile, pos int) *lsproto.SelectionRange {"},
  {"line":32,"text":"\tfactory := &ast.NodeFactory{}"},
  {"line":34,"text":"\tnodeContainsPosition := func(node *ast.Node) bool {"},
  {"line":35,"text":"\t\tif node == nil {"},
  {"line":36,"text":"\t\t\treturn false"},
  {"line":37,"text":"\t\t}"},
  {"line":38,"text":"\t\tstart := scanner.GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc*/)"},
  {"line":39,"text":"\t\tend := node.End()"},
  {"line":40,"text":"\t\treturn start <= pos && pos < end"},
  {"line":41,"text":"\t}"},
  {"line":43,"text":"\tpushSelectionRange := func(current *lsproto.SelectionRange, start, end int) *lsproto.SelectionRange {"},
  {"line":44,"text":"\t\tif start == end {"},
  {"line":45,"text":"\t\t\treturn current"},
  {"line":46,"text":"\t\t}"},
  {"line":48,"text":"\t\tif !(start <= pos && pos <= end) {"},
  {"line":49,"text":"\t\t\treturn current"},
  {"line":50,"text":"\t\t}"},
  {"line":52,"text":"\t\tlspRange := l.converters.ToLSPRange(sourceFile, core.NewTextRange(start, end))"},
  {"line":54,"text":"\t\tif current != nil && current.Range == lspRange {"},
  {"line":55,"text":"\t\t\treturn current"},
  {"line":56,"text":"\t\t}"},
  {"line":58,"text":"\t\treturn &lsproto.SelectionRange{"},
  {"line":59,"text":"\t\t\tRange:  lspRange,"},
  {"line":60,"text":"\t\t\tParent: current,"},
  {"line":61,"text":"\t\t}"},
  {"line":62,"text":"\t}"},
  {"line":64,"text":"\tpushSelectionCommentRange := func(current *lsproto.SelectionRange, start, end int) *lsproto.SelectionRange {"},
  {"line":65,"text":"\t\tcurrent = pushSelectionRange(current, start, end)"},
  {"line":67,"text":"\t\tcommentPos := start"},
  {"line":68,"text":"\t\ttext := sourceFile.Text()"},
  {"line":69,"text":"\t\tfor commentPos < end && commentPos < len(text) && text[commentPos] == '/' {"},
  {"line":70,"text":"\t\t\tcommentPos++"},
  {"line":71,"text":"\t\t}"},
  {"line":72,"text":"\t\tcurrent = pushSelectionRange(current, commentPos, end)"},
  {"line":74,"text":"\t\treturn current"},
  {"line":75,"text":"\t}"},
  {"line":77,"text":"\tpositionsAreOnSameLine := func(pos1, pos2 int) bool {"},
  {"line":78,"text":"\t\tif pos1 == pos2 {"},
  {"line":79,"text":"\t\t\treturn true"},
  {"line":80,"text":"\t\t}"},
  {"line":81,"text":"\t\tlspPos1 := l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(pos1))"},
  {"line":82,"text":"\t\tlspPos2 := l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(pos2))"},
  {"line":83,"text":"\t\treturn lspPos1.Line == lspPos2.Line"},
  {"line":84,"text":"\t}"},
  {"line":86,"text":"\tshouldSkipNode := func(node *ast.Node, parent *ast.Node) bool {"},
  {"line":87,"text":"\t\tif ast.IsBlock(node) {"},
  {"line":88,"text":"\t\t\treturn true"},
  {"line":89,"text":"\t\t}"},
  {"line":91,"text":"\t\tif ast.IsTemplateSpan(node) || ast.IsTemplateHead(node) || ast.IsTemplateTail(node) {"},
  {"line":92,"text":"\t\t\treturn true"},
  {"line":93,"text":"\t\t}"},
  {"line":95,"text":"\t\tif parent != nil && ast.IsVariableDeclarationList(node) && ast.IsVariableStatement(parent) {"},
  {"line":96,"text":"\t\t\treturn true"},
  {"line":97,"text":"\t\t}"},
  {"line":100,"text":"\t\tif parent != nil && ast.IsVariableDeclaration(node) && ast.IsVariableDeclarationList(parent) {"},
  {"line":101,"text":"\t\t\tdecl := parent.AsVariableDeclarationList()"},
  {"line":102,"text":"\t\t\tif decl != nil && len(decl.Declarations.Nodes) == 1 {"},
  {"line":103,"text":"\t\t\t\treturn true"},
  {"line":104,"text":"\t\t\t}"},
  {"line":105,"text":"\t\t}"},
  {"line":107,"text":"\t\tif ast.IsJSDocTypeExpression(node) || ast.IsJSDocSignature(node) || ast.IsJSDocTypeLiteral(node) {"},
  {"line":108,"text":"\t\t\treturn true"},
  {"line":109,"text":"\t\t}"},
  {"line":111,"text":"\t\treturn false"},
  {"line":112,"text":"\t}"},
  {"line":114,"text":"\tfullRange := l.converters.ToLSPRange(sourceFile, core.NewTextRange(sourceFile.Pos(), sourceFile.End()))"},
  {"line":115,"text":"\tresult := &lsproto.SelectionRange{"},
  {"line":116,"text":"\t\tRange: fullRange,"},
  {"line":117,"text":"\t}"},
  {"line":119,"text":"\tvar current *ast.Node"},
  {"line":120,"text":"\tfor current = sourceFile.AsNode(); current != nil; {"},
  {"line":121,"text":"\t\tvar next *ast.Node"},
  {"line":122,"text":"\t\tparent := current"},
  {"line":124,"text":"\t\tvisit := func(node *ast.Node) *ast.Node {"},
  {"line":125,"text":"\t\t\tif node != nil && next == nil {"},
  {"line":126,"text":"\t\t\t\tvar foundComment *ast.CommentRange"},
  {"line":127,"text":"\t\t\t\tfor comment := range scanner.GetTrailingCommentRanges(factory, sourceFile.Text(), node.End()) {"},
  {"line":128,"text":"\t\t\t\t\tfoundComment = &comment"},
  {"line":129,"text":"\t\t\t\t\tbreak"},
  {"line":130,"text":"\t\t\t\t}"},
  {"line":131,"text":"\t\t\t\tif foundComment != nil && foundComment.Kind == ast.KindSingleLineCommentTrivia {"},
  {"line":132,"text":"\t\t\t\t\tresult = pushSelectionCommentRange(result, foundComment.Pos(), foundComment.End())"},
  {"line":133,"text":"\t\t\t\t}"},
  {"line":135,"text":"\t\t\t\tif nodeContainsPosition(node) {"},
  {"line":137,"text":"\t\t\t\t\tif ast.IsBlock(node) && ast.IsFunctionLikeDeclaration(parent) {"},
  {"line":138,"text":"\t\t\t\t\t\tif !positionsAreOnSameLine(astnav.GetStartOfNode(node, sourceFile, false), node.End()) {"},
  {"line":139,"text":"\t\t\t\t\t\t\tstart := astnav.GetStartOfNode(node, sourceFile, false)"},
  {"line":140,"text":"\t\t\t\t\t\t\tend := node.End()"},
  {"line":141,"text":"\t\t\t\t\t\t\tresult = pushSelectionRange(result, start, end)"},
  {"line":142,"text":"\t\t\t\t\t\t}"},
  {"line":143,"text":"\t\t\t\t\t}"},
  {"line":146,"text":"\t\t\t\t\tif ast.IsTemplateSpan(parent) {"},
  {"line":147,"text":"\t\t\t\t\t\ttemplateSpan := parent.AsTemplateSpan()"},
  {"line":148,"text":"\t\t\t\t\t\tif templateSpan.Literal != nil {"},
  {"line":151,"text":"\t\t\t\t\t\t\tspanStart := node.Pos() - 2"},
  {"line":153,"text":"\t\t\t\t\t\t\tspanEnd := astnav.GetStartOfNode(templateSpan.Literal, sourceFile, false) + 1"},
  {"line":155,"text":"\t\t\t\t\t\t\ttext := sourceFile.Text()"},
  {"line":156,"text":"\t\t\t\t\t\t\tif spanStart >= 0 && spanEnd <= len(text) && spanStart < spanEnd {"},
  {"line":157,"text":"\t\t\t\t\t\t\t\tresult = pushSelectionRange(result, spanStart, spanEnd)"},
  {"line":158,"text":"\t\t\t\t\t\t\t}"},
  {"line":159,"text":"\t\t\t\t\t\t}"},
  {"line":160,"text":"\t\t\t\t\t}"},
  {"line":162,"text":"\t\t\t\t\tif !shouldSkipNode(node, parent) {"},
  {"line":163,"text":"\t\t\t\t\t\tstart := astnav.GetStartOfNode(node, sourceFile, false)"},
  {"line":164,"text":"\t\t\t\t\t\tend := node.End()"},
  {"line":165,"text":"\t\t\t\t\t\tresult = pushSelectionRange(result, start, end)"},
  {"line":168,"text":"\t\t\t\t\t\tif ast.IsStringLiteral(node) || node.Kind == ast.KindTemplateExpression || node.Kind == ast.KindNoSubstitutionTemplateLiteral {"},
  {"line":170,"text":"\t\t\t\t\t\t\tif start+1 < end-1 {"},
  {"line":171,"text":"\t\t\t\t\t\t\t\tresult = pushSelectionRange(result, start+1, end-1)"},
  {"line":172,"text":"\t\t\t\t\t\t\t}"},
  {"line":173,"text":"\t\t\t\t\t\t}"},
  {"line":174,"text":"\t\t\t\t\t}"},
  {"line":176,"text":"\t\t\t\t\tnext = node"},
  {"line":177,"text":"\t\t\t\t}"},
  {"line":178,"text":"\t\t\t}"},
  {"line":179,"text":"\t\t\treturn node"},
  {"line":180,"text":"\t\t}"},
  {"line":182,"text":"\t\tvisitNodes := func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {"},
  {"line":183,"text":"\t\t\tif nodes != nil && len(nodes.Nodes) > 0 {"},
  {"line":184,"text":"\t\t\t\tshouldSkipList := parent != nil && (ast.IsVariableDeclarationList(parent) || ast.IsTemplateExpression(parent))"},
  {"line":186,"text":"\t\t\t\tif !shouldSkipList {"},
  {"line":187,"text":"\t\t\t\t\tstart := astnav.GetStartOfNode(nodes.Nodes[0], sourceFile, false)"},
  {"line":188,"text":"\t\t\t\t\tend := nodes.Nodes[len(nodes.Nodes)-1].End()"},
  {"line":190,"text":"\t\t\t\t\tif start <= pos && pos < end {"},
  {"line":191,"text":"\t\t\t\t\t\tresult = pushSelectionRange(result, start, end)"},
  {"line":192,"text":"\t\t\t\t\t}"},
  {"line":193,"text":"\t\t\t\t}"},
  {"line":194,"text":"\t\t\t}"},
  {"line":195,"text":"\t\t\treturn v.VisitNodes(nodes)"},
  {"line":196,"text":"\t\t}"},
  {"line":199,"text":"\t\tfor _, jsdoc := range current.JSDoc(sourceFile) {"},
  {"line":200,"text":"\t\t\tvisit(jsdoc)"},
  {"line":201,"text":"\t\t}"},
  {"line":203,"text":"\t\ttempVisitor := ast.NewNodeVisitor(visit, nil, ast.NodeVisitorHooks{"},
  {"line":204,"text":"\t\t\tVisitNodes: visitNodes,"},
  {"line":205,"text":"\t\t})"},
  {"line":207,"text":"\t\tcurrent.VisitEachChild(tempVisitor)"},
  {"line":208,"text":"\t\tcurrent = next"},
  {"line":209,"text":"\t}"},
  {"line":210,"text":"\treturn result"},
  {"line":211,"text":"}"},
];

export function findLsSelectionRangesDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsSelectionRangesDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsSelectionRangesDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsSelectionRangesDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsSelectionRangesLineText(line: number): string | undefined {
  return lsSelectionRangesSourceLines.find((entry) => entry.line === line)?.text;
}
