/**
 * Language-service parity map for TS-Go `ls/lsconv/linemap.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapUpstreamPath = "ls/lsconv/linemap.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapDeclarations: readonly UpstreamDeclaration[] = [
  {"line":12,"kind":"type","name":"LSPLineStarts"},
  {"line":14,"kind":"type","name":"LSPLineMap"},
  {"line":19,"kind":"func","name":"ComputeLSPLineStarts"},
  {"line":56,"kind":"func","name":"ComputeIndexOfLineStart","receiver":"lm *LSPLineMap"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package lsconv"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":6,"text":"\t\"strings\""},
  {"line":7,"text":"\t\"unicode/utf8\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":10,"text":")"},
  {"line":12,"text":"type LSPLineStarts []core.TextPos"},
  {"line":14,"text":"type LSPLineMap struct {"},
  {"line":15,"text":"\tLineStarts LSPLineStarts"},
  {"line":16,"text":"\tAsciiOnly  bool // TODO(jakebailey): collect ascii-only info per line"},
  {"line":17,"text":"}"},
  {"line":19,"text":"func ComputeLSPLineStarts(text string) *LSPLineMap {"},
  {"line":22,"text":"\tlineStarts := make([]core.TextPos, 0, strings.Count(text, \"\\n\")+1)"},
  {"line":23,"text":"\tasciiOnly := true"},
  {"line":25,"text":"\ttextLen := core.TextPos(len(text))"},
  {"line":26,"text":"\tvar pos core.TextPos"},
  {"line":27,"text":"\tvar lineStart core.TextPos"},
  {"line":28,"text":"\tfor pos < textLen {"},
  {"line":29,"text":"\t\tb := text[pos]"},
  {"line":30,"text":"\t\tif b < utf8.RuneSelf {"},
  {"line":31,"text":"\t\t\tpos++"},
  {"line":32,"text":"\t\t\tswitch b {"},
  {"line":33,"text":"\t\t\tcase '\\r':"},
  {"line":34,"text":"\t\t\t\tif pos < textLen && text[pos] == '\\n' {"},
  {"line":35,"text":"\t\t\t\t\tpos++"},
  {"line":36,"text":"\t\t\t\t}"},
  {"line":37,"text":"\t\t\t\tfallthrough"},
  {"line":38,"text":"\t\t\tcase '\\n':"},
  {"line":39,"text":"\t\t\t\tlineStarts = append(lineStarts, lineStart)"},
  {"line":40,"text":"\t\t\t\tlineStart = pos"},
  {"line":41,"text":"\t\t\t}"},
  {"line":42,"text":"\t\t} else {"},
  {"line":43,"text":"\t\t\t_, size := utf8.DecodeRuneInString(text[pos:])"},
  {"line":44,"text":"\t\t\tpos += core.TextPos(size)"},
  {"line":45,"text":"\t\t\tasciiOnly = false"},
  {"line":46,"text":"\t\t}"},
  {"line":47,"text":"\t}"},
  {"line":48,"text":"\tlineStarts = append(lineStarts, lineStart)"},
  {"line":50,"text":"\treturn &LSPLineMap{"},
  {"line":51,"text":"\t\tLineStarts: lineStarts,"},
  {"line":52,"text":"\t\tAsciiOnly:  asciiOnly,"},
  {"line":53,"text":"\t}"},
  {"line":54,"text":"}"},
  {"line":56,"text":"func (lm *LSPLineMap) ComputeIndexOfLineStart(targetPos core.TextPos) int {"},
  {"line":58,"text":"\tlineNumber, ok := slices.BinarySearchFunc(lm.LineStarts, targetPos, func(p, t core.TextPos) int {"},
  {"line":59,"text":"\t\treturn cmp.Compare(int(p), int(t))"},
  {"line":60,"text":"\t})"},
  {"line":61,"text":"\tif !ok && lineNumber > 0 {"},
  {"line":68,"text":"\t\tlineNumber = lineNumber - 1"},
  {"line":69,"text":"\t}"},
  {"line":70,"text":"\treturn lineNumber"},
  {"line":71,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsLsconvLineMapSourceLines.find((entry) => entry.line === line)?.text;
}
