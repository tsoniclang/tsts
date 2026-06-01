/**
 * Language-service parity map for TS-Go `ls/lsutil/children.go`.
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

export const lsLsutilChildrenUpstreamPath = "ls/lsutil/children.go";

export const lsLsutilChildrenDeclarations: readonly UpstreamDeclaration[] = [
  {"line":11,"kind":"func","name":"GetLastChild"},
  {"line":35,"kind":"func","name":"GetLastToken"},
  {"line":60,"kind":"func","name":"GetLastVisitedChild"},
  {"line":85,"kind":"func","name":"GetFirstToken"},
  {"line":126,"kind":"func","name":"AssertHasRealPosition"},
];

export const lsLsutilChildrenSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsutil"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":5,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":8,"text":")"},
  {"line":11,"text":"func GetLastChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":12,"text":"\tlastChildNode := GetLastVisitedChild(node, sourceFile)"},
  {"line":13,"text":"\tif ast.IsJSDocSingleCommentNode(node) && lastChildNode == nil {"},
  {"line":14,"text":"\t\treturn nil"},
  {"line":15,"text":"\t}"},
  {"line":16,"text":"\tvar tokenStartPos int"},
  {"line":17,"text":"\tif lastChildNode != nil {"},
  {"line":18,"text":"\t\ttokenStartPos = lastChildNode.End()"},
  {"line":19,"text":"\t} else {"},
  {"line":20,"text":"\t\ttokenStartPos = node.Pos()"},
  {"line":21,"text":"\t}"},
  {"line":22,"text":"\tvar lastToken *ast.Node"},
  {"line":23,"text":"\tscanner := scanner.GetScannerForSourceFile(sourceFile, tokenStartPos)"},
  {"line":24,"text":"\tfor startPos := tokenStartPos; startPos < node.End(); {"},
  {"line":25,"text":"\t\ttokenKind := scanner.Token()"},
  {"line":26,"text":"\t\ttokenFullStart := scanner.TokenFullStart()"},
  {"line":27,"text":"\t\ttokenEnd := scanner.TokenEnd()"},
  {"line":28,"text":"\t\tlastToken = sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, node, scanner.TokenFlags())"},
  {"line":29,"text":"\t\tstartPos = tokenEnd"},
  {"line":30,"text":"\t\tscanner.Scan()"},
  {"line":31,"text":"\t}"},
  {"line":32,"text":"\treturn core.IfElse(lastToken != nil, lastToken, lastChildNode)"},
  {"line":33,"text":"}"},
  {"line":35,"text":"func GetLastToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":36,"text":"\tif node == nil {"},
  {"line":37,"text":"\t\treturn nil"},
  {"line":38,"text":"\t}"},
  {"line":40,"text":"\tif ast.IsTokenKind(node.Kind) || ast.IsIdentifier(node) {"},
  {"line":41,"text":"\t\treturn nil"},
  {"line":42,"text":"\t}"},
  {"line":44,"text":"\tAssertHasRealPosition(node)"},
  {"line":46,"text":"\tlastChild := GetLastChild(node, sourceFile)"},
  {"line":47,"text":"\tif lastChild == nil {"},
  {"line":48,"text":"\t\treturn nil"},
  {"line":49,"text":"\t}"},
  {"line":51,"text":"\tif lastChild.Kind < ast.KindFirstNode {"},
  {"line":52,"text":"\t\treturn lastChild"},
  {"line":53,"text":"\t} else {"},
  {"line":54,"text":"\t\treturn GetLastToken(lastChild, sourceFile)"},
  {"line":55,"text":"\t}"},
  {"line":56,"text":"}"},
  {"line":60,"text":"func GetLastVisitedChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":61,"text":"\tvar lastChild *ast.Node"},
  {"line":63,"text":"\tvisitNode := func(n *ast.Node, _ *ast.NodeVisitor) *ast.Node {"},
  {"line":64,"text":"\t\tif n != nil && n.Flags&ast.NodeFlagsReparsed == 0 {"},
  {"line":65,"text":"\t\t\tlastChild = n"},
  {"line":66,"text":"\t\t}"},
  {"line":67,"text":"\t\treturn n"},
  {"line":68,"text":"\t}"},
  {"line":69,"text":"\tvisitNodeList := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {"},
  {"line":70,"text":"\t\tif nodeList != nil && len(nodeList.Nodes) > 0 {"},
  {"line":71,"text":"\t\t\tfor i := len(nodeList.Nodes) - 1; i >= 0; i-- {"},
  {"line":72,"text":"\t\t\t\tif nodeList.Nodes[i].Flags&ast.NodeFlagsReparsed == 0 {"},
  {"line":73,"text":"\t\t\t\t\tlastChild = nodeList.Nodes[i]"},
  {"line":74,"text":"\t\t\t\t\tbreak"},
  {"line":75,"text":"\t\t\t\t}"},
  {"line":76,"text":"\t\t\t}"},
  {"line":77,"text":"\t\t}"},
  {"line":78,"text":"\t\treturn nodeList"},
  {"line":79,"text":"\t}"},
  {"line":81,"text":"\tastnav.VisitEachChildAndJSDoc(node, sourceFile, visitNode, visitNodeList)"},
  {"line":82,"text":"\treturn lastChild"},
  {"line":83,"text":"}"},
  {"line":85,"text":"func GetFirstToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {"},
  {"line":86,"text":"\tif ast.IsIdentifier(node) || ast.IsTokenKind(node.Kind) {"},
  {"line":87,"text":"\t\treturn nil"},
  {"line":88,"text":"\t}"},
  {"line":89,"text":"\tAssertHasRealPosition(node)"},
  {"line":90,"text":"\tvar firstChild *ast.Node"},
  {"line":91,"text":"\tnode.ForEachChild(func(n *ast.Node) bool {"},
  {"line":92,"text":"\t\tif n == nil || node.Flags&ast.NodeFlagsReparsed != 0 {"},
  {"line":93,"text":"\t\t\treturn false"},
  {"line":94,"text":"\t\t}"},
  {"line":95,"text":"\t\tfirstChild = n"},
  {"line":96,"text":"\t\treturn true"},
  {"line":97,"text":"\t})"},
  {"line":99,"text":"\tvar tokenEndPosition int"},
  {"line":100,"text":"\tif firstChild != nil {"},
  {"line":101,"text":"\t\ttokenEndPosition = firstChild.Pos()"},
  {"line":102,"text":"\t} else {"},
  {"line":103,"text":"\t\ttokenEndPosition = node.End()"},
  {"line":104,"text":"\t}"},
  {"line":105,"text":"\tscanner := scanner.GetScannerForSourceFile(sourceFile, node.Pos())"},
  {"line":106,"text":"\tvar firstToken *ast.Node"},
  {"line":107,"text":"\tif node.Pos() < tokenEndPosition {"},
  {"line":108,"text":"\t\ttokenKind := scanner.Token()"},
  {"line":109,"text":"\t\ttokenFullStart := scanner.TokenFullStart()"},
  {"line":110,"text":"\t\ttokenEnd := scanner.TokenEnd()"},
  {"line":111,"text":"\t\tfirstToken = sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, node, scanner.TokenFlags())"},
  {"line":112,"text":"\t}"},
  {"line":114,"text":"\tif firstToken != nil {"},
  {"line":115,"text":"\t\treturn firstToken"},
  {"line":116,"text":"\t}"},
  {"line":117,"text":"\tif firstChild == nil {"},
  {"line":118,"text":"\t\treturn nil"},
  {"line":119,"text":"\t}"},
  {"line":120,"text":"\tif firstChild.Kind < ast.KindFirstNode {"},
  {"line":121,"text":"\t\treturn firstChild"},
  {"line":122,"text":"\t}"},
  {"line":123,"text":"\treturn GetFirstToken(firstChild, sourceFile)"},
  {"line":124,"text":"}"},
  {"line":126,"text":"func AssertHasRealPosition(node *ast.Node) {"},
  {"line":127,"text":"\tif ast.PositionIsSynthesized(node.Pos()) || ast.PositionIsSynthesized(node.End()) {"},
  {"line":128,"text":"\t\tpanic(\"Node must have a real position for this operation.\")"},
  {"line":129,"text":"\t}"},
  {"line":130,"text":"}"},
];

export function findLsLsutilChildrenDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsLsutilChildrenDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsLsutilChildrenDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsLsutilChildrenDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsLsutilChildrenLineText(line: number): string | undefined {
  return lsLsutilChildrenSourceLines.find((entry) => entry.line === line)?.text;
}
