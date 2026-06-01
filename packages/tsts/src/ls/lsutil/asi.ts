/**
 * Language-service parity map for TS-Go `ls/lsutil/asi.go`.
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

export const lsLsutilAsiUpstreamPath = "ls/lsutil/asi.go";

export const lsLsutilAsiDeclarations: readonly UpstreamDeclaration[] = [
  {"line":9,"kind":"func","name":"PositionIsASICandidate"},
  {"line":21,"kind":"func","name":"SyntaxMayBeASICandidate"},
  {"line":28,"kind":"func","name":"SyntaxRequiresTrailingCommaOrSemicolonOrASI"},
  {"line":36,"kind":"func","name":"SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI"},
  {"line":44,"kind":"func","name":"SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI"},
  {"line":48,"kind":"func","name":"SyntaxRequiresTrailingSemicolonOrASI"},
  {"line":66,"kind":"func","name":"NodeIsASICandidate"},
];

export const lsLsutilAsiSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsutil"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":5,"text":"\t\"github.com/microsoft/typescript-go/internal/astnav\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/scanner\""},
  {"line":7,"text":")"},
  {"line":9,"text":"func PositionIsASICandidate(pos int, context *ast.Node, file *ast.SourceFile) bool {"},
  {"line":10,"text":"\tcontextAncestor := ast.FindAncestorOrQuit(context, func(ancestor *ast.Node) ast.FindAncestorResult {"},
  {"line":11,"text":"\t\tif ancestor.End() != pos {"},
  {"line":12,"text":"\t\t\treturn ast.FindAncestorQuit"},
  {"line":13,"text":"\t\t}"},
  {"line":15,"text":"\t\treturn ast.ToFindAncestorResult(SyntaxMayBeASICandidate(ancestor.Kind))"},
  {"line":16,"text":"\t})"},
  {"line":18,"text":"\treturn contextAncestor != nil && NodeIsASICandidate(contextAncestor, file)"},
  {"line":19,"text":"}"},
  {"line":21,"text":"func SyntaxMayBeASICandidate(kind ast.Kind) bool {"},
  {"line":22,"text":"\treturn SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind) ||"},
  {"line":23,"text":"\t\tSyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind) ||"},
  {"line":24,"text":"\t\tSyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind) ||"},
  {"line":25,"text":"\t\tSyntaxRequiresTrailingSemicolonOrASI(kind)"},
  {"line":26,"text":"}"},
  {"line":28,"text":"func SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind ast.Kind) bool {"},
  {"line":29,"text":"\treturn kind == ast.KindCallSignature ||"},
  {"line":30,"text":"\t\tkind == ast.KindConstructSignature ||"},
  {"line":31,"text":"\t\tkind == ast.KindIndexSignature ||"},
  {"line":32,"text":"\t\tkind == ast.KindPropertySignature ||"},
  {"line":33,"text":"\t\tkind == ast.KindMethodSignature"},
  {"line":34,"text":"}"},
  {"line":36,"text":"func SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind ast.Kind) bool {"},
  {"line":37,"text":"\treturn kind == ast.KindFunctionDeclaration ||"},
  {"line":38,"text":"\t\tkind == ast.KindConstructor ||"},
  {"line":39,"text":"\t\tkind == ast.KindMethodDeclaration ||"},
  {"line":40,"text":"\t\tkind == ast.KindGetAccessor ||"},
  {"line":41,"text":"\t\tkind == ast.KindSetAccessor"},
  {"line":42,"text":"}"},
  {"line":44,"text":"func SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind ast.Kind) bool {"},
  {"line":45,"text":"\treturn kind == ast.KindModuleDeclaration"},
  {"line":46,"text":"}"},
  {"line":48,"text":"func SyntaxRequiresTrailingSemicolonOrASI(kind ast.Kind) bool {"},
  {"line":49,"text":"\treturn kind == ast.KindVariableStatement ||"},
  {"line":50,"text":"\t\tkind == ast.KindExpressionStatement ||"},
  {"line":51,"text":"\t\tkind == ast.KindDoStatement ||"},
  {"line":52,"text":"\t\tkind == ast.KindContinueStatement ||"},
  {"line":53,"text":"\t\tkind == ast.KindBreakStatement ||"},
  {"line":54,"text":"\t\tkind == ast.KindReturnStatement ||"},
  {"line":55,"text":"\t\tkind == ast.KindThrowStatement ||"},
  {"line":56,"text":"\t\tkind == ast.KindDebuggerStatement ||"},
  {"line":57,"text":"\t\tkind == ast.KindPropertyDeclaration ||"},
  {"line":58,"text":"\t\tkind == ast.KindTypeAliasDeclaration ||"},
  {"line":59,"text":"\t\tkind == ast.KindImportDeclaration ||"},
  {"line":60,"text":"\t\tkind == ast.KindImportEqualsDeclaration ||"},
  {"line":61,"text":"\t\tkind == ast.KindExportDeclaration ||"},
  {"line":62,"text":"\t\tkind == ast.KindNamespaceExportDeclaration ||"},
  {"line":63,"text":"\t\tkind == ast.KindExportAssignment"},
  {"line":64,"text":"}"},
  {"line":66,"text":"func NodeIsASICandidate(node *ast.Node, file *ast.SourceFile) bool {"},
  {"line":67,"text":"\tlastToken := GetLastToken(node, file)"},
  {"line":68,"text":"\tif lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {"},
  {"line":69,"text":"\t\treturn false"},
  {"line":70,"text":"\t}"},
  {"line":72,"text":"\tif SyntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {"},
  {"line":73,"text":"\t\tif lastToken != nil && lastToken.Kind == ast.KindCommaToken {"},
  {"line":74,"text":"\t\t\treturn false"},
  {"line":75,"text":"\t\t}"},
  {"line":76,"text":"\t} else if SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.Kind) {"},
  {"line":77,"text":"\t\tlastChild := GetLastChild(node, file)"},
  {"line":78,"text":"\t\tif lastChild != nil && ast.IsModuleBlock(lastChild) {"},
  {"line":79,"text":"\t\t\treturn false"},
  {"line":80,"text":"\t\t}"},
  {"line":81,"text":"\t} else if SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.Kind) {"},
  {"line":82,"text":"\t\tlastChild := GetLastChild(node, file)"},
  {"line":83,"text":"\t\tif lastChild != nil && ast.IsFunctionBlock(lastChild) {"},
  {"line":84,"text":"\t\t\treturn false"},
  {"line":85,"text":"\t\t}"},
  {"line":86,"text":"\t} else if !SyntaxRequiresTrailingSemicolonOrASI(node.Kind) {"},
  {"line":87,"text":"\t\treturn false"},
  {"line":88,"text":"\t}"},
  {"line":91,"text":"\tif node.Kind == ast.KindDoStatement {"},
  {"line":92,"text":"\t\treturn true"},
  {"line":93,"text":"\t}"},
  {"line":95,"text":"\ttopNode := ast.FindAncestor(node, func(ancestor *ast.Node) bool { return ancestor.Parent == nil })"},
  {"line":96,"text":"\tnextToken := astnav.FindNextToken(node, topNode, file)"},
  {"line":97,"text":"\tif nextToken == nil || nextToken.Kind == ast.KindCloseBraceToken {"},
  {"line":98,"text":"\t\treturn true"},
  {"line":99,"text":"\t}"},
  {"line":101,"text":"\tstartLine := scanner.GetECMALineOfPosition(file, node.End())"},
  {"line":102,"text":"\tendLine := scanner.GetECMALineOfPosition(file, astnav.GetStartOfNode(nextToken, file, false /*includeJSDoc*/))"},
  {"line":103,"text":"\treturn startLine != endLine"},
  {"line":104,"text":"}"},
];

export function findLsLsutilAsiDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsLsutilAsiDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsLsutilAsiDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsLsutilAsiDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsLsutilAsiLineText(line: number): string | undefined {
  return lsLsutilAsiSourceLines.find((entry) => entry.line === line)?.text;
}
