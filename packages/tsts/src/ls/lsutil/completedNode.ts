/**
 * Language-service parity map for TS-Go `ls/lsutil/completednode.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeUpstreamPath = "ls/lsutil/completednode.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeDeclarations: readonly UpstreamDeclaration[] = [
  {"line":12,"kind":"func","name":"PositionBelongsToNode"},
  {"line":19,"kind":"func","name":"IsCompletedNode"},
  {"line":162,"kind":"func","name":"nodeEndsWith"},
  {"line":194,"kind":"func","name":"hasChildOfKind"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsutil"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":5,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":8,"text":")"},
  {"line":12,"text":"func PositionBelongsToNode(candidate *ast.Node, position int, file *ast.SourceFile) bool {"},
  {"line":13,"text":"\tif candidate.Pos() > position {"},
  {"line":14,"text":"\t\tpanic(\"Expected candidate.pos <= position\")"},
  {"line":15,"text":"\t}"},
  {"line":16,"text":"\treturn position < candidate.End() || !IsCompletedNode(candidate, file)"},
  {"line":17,"text":"}"},
  {"line":19,"text":"func IsCompletedNode(n *ast.Node, sourceFile *ast.SourceFile) bool {"},
  {"line":20,"text":"\tif n == nil || ast.NodeIsMissing(n) {"},
  {"line":21,"text":"\t\treturn false"},
  {"line":22,"text":"\t}"},
  {"line":24,"text":"\tswitch n.Kind {"},
  {"line":25,"text":"\tcase ast.KindClassDeclaration,"},
  {"line":26,"text":"\t\tast.KindInterfaceDeclaration,"},
  {"line":27,"text":"\t\tast.KindEnumDeclaration,"},
  {"line":28,"text":"\t\tast.KindObjectLiteralExpression,"},
  {"line":29,"text":"\t\tast.KindObjectBindingPattern,"},
  {"line":30,"text":"\t\tast.KindTypeLiteral,"},
  {"line":31,"text":"\t\tast.KindBlock,"},
  {"line":32,"text":"\t\tast.KindModuleBlock,"},
  {"line":33,"text":"\t\tast.KindCaseBlock,"},
  {"line":34,"text":"\t\tast.KindNamedImports,"},
  {"line":35,"text":"\t\tast.KindNamedExports:"},
  {"line":36,"text":"\t\treturn nodeEndsWith(n, ast.KindCloseBraceToken, sourceFile)"},
  {"line":38,"text":"\tcase ast.KindCatchClause:"},
  {"line":39,"text":"\t\treturn IsCompletedNode(n.AsCatchClause().Block, sourceFile)"},
  {"line":41,"text":"\tcase ast.KindNewExpression:"},
  {"line":42,"text":"\t\tif n.ArgumentList() == nil {"},
  {"line":43,"text":"\t\t\treturn true"},
  {"line":44,"text":"\t\t}"},
  {"line":45,"text":"\t\tfallthrough"},
  {"line":47,"text":"\tcase ast.KindCallExpression,"},
  {"line":48,"text":"\t\tast.KindParenthesizedExpression,"},
  {"line":49,"text":"\t\tast.KindParenthesizedType:"},
  {"line":50,"text":"\t\treturn nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)"},
  {"line":52,"text":"\tcase ast.KindFunctionType,"},
  {"line":53,"text":"\t\tast.KindConstructorType:"},
  {"line":54,"text":"\t\treturn IsCompletedNode(n.Type(), sourceFile)"},
  {"line":56,"text":"\tcase ast.KindConstructor,"},
  {"line":57,"text":"\t\tast.KindGetAccessor,"},
  {"line":58,"text":"\t\tast.KindSetAccessor,"},
  {"line":59,"text":"\t\tast.KindFunctionDeclaration,"},
  {"line":60,"text":"\t\tast.KindFunctionExpression,"},
  {"line":61,"text":"\t\tast.KindMethodDeclaration,"},
  {"line":62,"text":"\t\tast.KindMethodSignature,"},
  {"line":63,"text":"\t\tast.KindConstructSignature,"},
  {"line":64,"text":"\t\tast.KindCallSignature,"},
  {"line":65,"text":"\t\tast.KindArrowFunction:"},
  {"line":66,"text":"\t\tif n.Body() != nil {"},
  {"line":67,"text":"\t\t\treturn IsCompletedNode(n.Body(), sourceFile)"},
  {"line":68,"text":"\t\t}"},
  {"line":69,"text":"\t\tif n.Type() != nil {"},
  {"line":70,"text":"\t\t\treturn IsCompletedNode(n.Type(), sourceFile)"},
  {"line":71,"text":"\t\t}"},
  {"line":74,"text":"\t\treturn hasChildOfKind(n, ast.KindCloseParenToken, sourceFile)"},
  {"line":76,"text":"\tcase ast.KindModuleDeclaration:"},
  {"line":77,"text":"\t\treturn n.Body() != nil && IsCompletedNode(n.Body(), sourceFile)"},
  {"line":79,"text":"\tcase ast.KindIfStatement:"},
  {"line":80,"text":"\t\tif n.AsIfStatement().ElseStatement != nil {"},
  {"line":81,"text":"\t\t\treturn IsCompletedNode(n.AsIfStatement().ElseStatement, sourceFile)"},
  {"line":82,"text":"\t\t}"},
  {"line":83,"text":"\t\treturn IsCompletedNode(n.AsIfStatement().ThenStatement, sourceFile)"},
  {"line":85,"text":"\tcase ast.KindExpressionStatement:"},
  {"line":86,"text":"\t\treturn IsCompletedNode(n.Expression(), sourceFile) ||"},
  {"line":87,"text":"\t\t\thasChildOfKind(n, ast.KindSemicolonToken, sourceFile)"},
  {"line":89,"text":"\tcase ast.KindArrayLiteralExpression,"},
  {"line":90,"text":"\t\tast.KindArrayBindingPattern,"},
  {"line":91,"text":"\t\tast.KindElementAccessExpression,"},
  {"line":92,"text":"\t\tast.KindComputedPropertyName,"},
  {"line":93,"text":"\t\tast.KindTupleType:"},
  {"line":94,"text":"\t\treturn nodeEndsWith(n, ast.KindCloseBracketToken, sourceFile)"},
  {"line":96,"text":"\tcase ast.KindIndexSignature:"},
  {"line":97,"text":"\t\tif n.AsIndexSignatureDeclaration().Type != nil {"},
  {"line":98,"text":"\t\t\treturn IsCompletedNode(n.AsIndexSignatureDeclaration().Type, sourceFile)"},
  {"line":99,"text":"\t\t}"},
  {"line":100,"text":"\t\treturn hasChildOfKind(n, ast.KindCloseBracketToken, sourceFile)"},
  {"line":102,"text":"\tcase ast.KindCaseClause,"},
  {"line":103,"text":"\t\tast.KindDefaultClause:"},
  {"line":105,"text":"\t\treturn false"},
  {"line":107,"text":"\tcase ast.KindForStatement,"},
  {"line":108,"text":"\t\tast.KindForInStatement,"},
  {"line":109,"text":"\t\tast.KindForOfStatement,"},
  {"line":110,"text":"\t\tast.KindWhileStatement:"},
  {"line":111,"text":"\t\treturn IsCompletedNode(n.Statement(), sourceFile)"},
  {"line":112,"text":"\tcase ast.KindDoStatement:"},
  {"line":114,"text":"\t\tif hasChildOfKind(n, ast.KindWhileKeyword, sourceFile) {"},
  {"line":115,"text":"\t\t\treturn nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)"},
  {"line":116,"text":"\t\t}"},
  {"line":117,"text":"\t\treturn IsCompletedNode(n.Statement(), sourceFile)"},
  {"line":119,"text":"\tcase ast.KindTypeQuery:"},
  {"line":120,"text":"\t\treturn IsCompletedNode(n.AsTypeQueryNode().ExprName, sourceFile)"},
  {"line":122,"text":"\tcase ast.KindTypeOfExpression,"},
  {"line":123,"text":"\t\tast.KindDeleteExpression,"},
  {"line":124,"text":"\t\tast.KindVoidExpression,"},
  {"line":125,"text":"\t\tast.KindYieldExpression,"},
  {"line":126,"text":"\t\tast.KindSpreadElement:"},
  {"line":127,"text":"\t\treturn IsCompletedNode(n.Expression(), sourceFile)"},
  {"line":129,"text":"\tcase ast.KindTaggedTemplateExpression:"},
  {"line":130,"text":"\t\treturn IsCompletedNode(n.AsTaggedTemplateExpression().Template, sourceFile)"},
  {"line":132,"text":"\tcase ast.KindTemplateExpression:"},
  {"line":133,"text":"\t\tif n.AsTemplateExpression().TemplateSpans == nil {"},
  {"line":134,"text":"\t\t\treturn false"},
  {"line":135,"text":"\t\t}"},
  {"line":136,"text":"\t\tlastSpan := core.LastOrNil(n.AsTemplateExpression().TemplateSpans.Nodes)"},
  {"line":137,"text":"\t\treturn IsCompletedNode(lastSpan, sourceFile)"},
  {"line":139,"text":"\tcase ast.KindTemplateSpan:"},
  {"line":140,"text":"\t\treturn ast.NodeIsPresent(n.AsTemplateSpan().Literal)"},
  {"line":142,"text":"\tcase ast.KindExportDeclaration,"},
  {"line":143,"text":"\t\tast.KindImportDeclaration:"},
  {"line":144,"text":"\t\treturn ast.NodeIsPresent(n.ModuleSpecifier())"},
  {"line":146,"text":"\tcase ast.KindPrefixUnaryExpression:"},
  {"line":147,"text":"\t\treturn IsCompletedNode(n.AsPrefixUnaryExpression().Operand, sourceFile)"},
  {"line":149,"text":"\tcase ast.KindBinaryExpression:"},
  {"line":150,"text":"\t\treturn IsCompletedNode(n.AsBinaryExpression().Right, sourceFile)"},
  {"line":152,"text":"\tcase ast.KindConditionalExpression:"},
  {"line":153,"text":"\t\treturn IsCompletedNode(n.AsConditionalExpression().WhenFalse, sourceFile)"},
  {"line":155,"text":"\tdefault:"},
  {"line":156,"text":"\t\treturn true"},
  {"line":157,"text":"\t}"},
  {"line":158,"text":"}"},
  {"line":162,"text":"func nodeEndsWith(n *ast.Node, expectedLastToken ast.Kind, sourceFile *ast.SourceFile) bool {"},
  {"line":163,"text":"\tlastChildNode := GetLastVisitedChild(n, sourceFile)"},
  {"line":164,"text":"\tvar lastNodeAndTokens []*ast.Node"},
  {"line":165,"text":"\tvar tokenStartPos int"},
  {"line":166,"text":"\tif lastChildNode != nil {"},
  {"line":167,"text":"\t\tlastNodeAndTokens = []*ast.Node{lastChildNode}"},
  {"line":168,"text":"\t\ttokenStartPos = lastChildNode.End()"},
  {"line":169,"text":"\t} else {"},
  {"line":170,"text":"\t\ttokenStartPos = n.Pos()"},
  {"line":171,"text":"\t}"},
  {"line":172,"text":"\tscanner := scanner.GetScannerForSourceFile(sourceFile, tokenStartPos)"},
  {"line":173,"text":"\tfor startPos := tokenStartPos; startPos < n.End(); {"},
  {"line":174,"text":"\t\ttokenKind := scanner.Token()"},
  {"line":175,"text":"\t\ttokenFullStart := scanner.TokenFullStart()"},
  {"line":176,"text":"\t\ttokenEnd := scanner.TokenEnd()"},
  {"line":177,"text":"\t\ttoken := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, n, scanner.TokenFlags())"},
  {"line":178,"text":"\t\tlastNodeAndTokens = append(lastNodeAndTokens, token)"},
  {"line":179,"text":"\t\tstartPos = tokenEnd"},
  {"line":180,"text":"\t\tscanner.Scan()"},
  {"line":181,"text":"\t}"},
  {"line":182,"text":"\tif len(lastNodeAndTokens) == 0 {"},
  {"line":183,"text":"\t\treturn false"},
  {"line":184,"text":"\t}"},
  {"line":185,"text":"\tlastChild := lastNodeAndTokens[len(lastNodeAndTokens)-1]"},
  {"line":186,"text":"\tif lastChild.Kind == expectedLastToken {"},
  {"line":187,"text":"\t\treturn true"},
  {"line":188,"text":"\t} else if lastChild.Kind == ast.KindSemicolonToken && len(lastNodeAndTokens) > 1 {"},
  {"line":189,"text":"\t\treturn lastNodeAndTokens[len(lastNodeAndTokens)-2].Kind == expectedLastToken"},
  {"line":190,"text":"\t}"},
  {"line":191,"text":"\treturn false"},
  {"line":192,"text":"}"},
  {"line":194,"text":"func hasChildOfKind(containingNode *ast.Node, kind ast.Kind, sourceFile *ast.SourceFile) bool {"},
  {"line":195,"text":"\treturn astnav.FindChildOfKind(containingNode, kind, sourceFile) != nil"},
  {"line":196,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsutilCompletedNodeSourceLines.find((entry) => entry.line === line)?.text;
}
