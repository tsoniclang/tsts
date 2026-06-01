/**
 * Language-service parity map for TS-Go `ls/source_map.go`.
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

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapUpstreamPath = "ls/source_map.go";

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapDeclarations: readonly UpstreamDeclaration[] = [
  {"line":12,"kind":"func","name":"getMappedLocation","receiver":"l *LanguageService"},
  {"line":39,"kind":"type","name":"script"},
  {"line":44,"kind":"func","name":"FileName","receiver":"s *script"},
  {"line":48,"kind":"func","name":"Text","receiver":"s *script"},
  {"line":52,"kind":"func","name":"getScript","receiver":"l *LanguageService"},
  {"line":60,"kind":"func","name":"tryGetSourcePosition","receiver":"l *LanguageService"},
  {"line":73,"kind":"func","name":"tryGetSourcePositionWorker","receiver":"l *LanguageService"},
  {"line":92,"kind":"func","name":"tryGetGeneratedPosition","receiver":"l *LanguageService"},
  {"line":105,"kind":"func","name":"tryGetGeneratedPositionWorker","receiver":"l *LanguageService"},
];

export const homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":5,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/outputpaths\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/sourcemap\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":10,"text":")"},
  {"line":12,"text":"func (l *LanguageService) getMappedLocation(fileName string, fileRange core.TextRange) lsproto.Location {"},
  {"line":13,"text":"\tstartPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.Pos()))"},
  {"line":14,"text":"\tif startPos == nil {"},
  {"line":15,"text":"\t\tlspRange := l.createLspRangeFromRange(fileRange, l.getScript(fileName))"},
  {"line":16,"text":"\t\treturn lsproto.Location{"},
  {"line":17,"text":"\t\t\tUri:   lsconv.FileNameToDocumentURI(fileName),"},
  {"line":18,"text":"\t\t\tRange: lspRange,"},
  {"line":19,"text":"\t\t}"},
  {"line":20,"text":"\t}"},
  {"line":21,"text":"\tendPos := l.tryGetSourcePosition(fileName, core.TextPos(fileRange.End()))"},
  {"line":22,"text":"\tif endPos == nil || endPos.FileName != startPos.FileName || endPos.Pos < startPos.Pos {"},
  {"line":26,"text":"\t\tendPos = &sourcemap.DocumentPosition{"},
  {"line":27,"text":"\t\t\tFileName: startPos.FileName,"},
  {"line":28,"text":"\t\t\tPos:      startPos.Pos + fileRange.Len(),"},
  {"line":29,"text":"\t\t}"},
  {"line":30,"text":"\t}"},
  {"line":31,"text":"\tnewRange := core.NewTextRange(startPos.Pos, endPos.Pos)"},
  {"line":32,"text":"\tlspRange := l.createLspRangeFromRange(newRange, l.getScript(startPos.FileName))"},
  {"line":33,"text":"\treturn lsproto.Location{"},
  {"line":34,"text":"\t\tUri:   lsconv.FileNameToDocumentURI(startPos.FileName),"},
  {"line":35,"text":"\t\tRange: lspRange,"},
  {"line":36,"text":"\t}"},
  {"line":37,"text":"}"},
  {"line":39,"text":"type script struct {"},
  {"line":40,"text":"\tfileName string"},
  {"line":41,"text":"\ttext     string"},
  {"line":42,"text":"}"},
  {"line":44,"text":"func (s *script) FileName() string {"},
  {"line":45,"text":"\treturn s.fileName"},
  {"line":46,"text":"}"},
  {"line":48,"text":"func (s *script) Text() string {"},
  {"line":49,"text":"\treturn s.text"},
  {"line":50,"text":"}"},
  {"line":52,"text":"func (l *LanguageService) getScript(fileName string) *script {"},
  {"line":53,"text":"\ttext, ok := l.host.ReadFile(fileName)"},
  {"line":54,"text":"\tif !ok {"},
  {"line":55,"text":"\t\treturn nil"},
  {"line":56,"text":"\t}"},
  {"line":57,"text":"\treturn &script{fileName: fileName, text: text}"},
  {"line":58,"text":"}"},
  {"line":60,"text":"func (l *LanguageService) tryGetSourcePosition("},
  {"line":61,"text":"\tfileName string,"},
  {"line":62,"text":"\tposition core.TextPos,"},
  {"line":63,"text":") *sourcemap.DocumentPosition {"},
  {"line":64,"text":"\tnewPos := l.tryGetSourcePositionWorker(fileName, position)"},
  {"line":65,"text":"\tif newPos != nil {"},
  {"line":66,"text":"\t\tif _, ok := l.ReadFile(newPos.FileName); !ok { // File doesn't exist"},
  {"line":67,"text":"\t\t\treturn nil"},
  {"line":68,"text":"\t\t}"},
  {"line":69,"text":"\t}"},
  {"line":70,"text":"\treturn newPos"},
  {"line":71,"text":"}"},
  {"line":73,"text":"func (l *LanguageService) tryGetSourcePositionWorker("},
  {"line":74,"text":"\tfileName string,"},
  {"line":75,"text":"\tposition core.TextPos,"},
  {"line":76,"text":") *sourcemap.DocumentPosition {"},
  {"line":77,"text":"\tif !tspath.IsDeclarationFileName(fileName) {"},
  {"line":78,"text":"\t\treturn nil"},
  {"line":79,"text":"\t}"},
  {"line":81,"text":"\tpositionMapper := l.GetDocumentPositionMapper(fileName)"},
  {"line":82,"text":"\tdocumentPos := positionMapper.GetSourcePosition(&sourcemap.DocumentPosition{FileName: fileName, Pos: int(position)})"},
  {"line":83,"text":"\tif documentPos == nil {"},
  {"line":84,"text":"\t\treturn nil"},
  {"line":85,"text":"\t}"},
  {"line":86,"text":"\tif newPos := l.tryGetSourcePositionWorker(documentPos.FileName, core.TextPos(documentPos.Pos)); newPos != nil {"},
  {"line":87,"text":"\t\treturn newPos"},
  {"line":88,"text":"\t}"},
  {"line":89,"text":"\treturn documentPos"},
  {"line":90,"text":"}"},
  {"line":92,"text":"func (l *LanguageService) tryGetGeneratedPosition("},
  {"line":93,"text":"\tfileName string,"},
  {"line":94,"text":"\tposition core.TextPos,"},
  {"line":95,"text":") *sourcemap.DocumentPosition {"},
  {"line":96,"text":"\tnewPos := l.tryGetGeneratedPositionWorker(fileName, position)"},
  {"line":97,"text":"\tif newPos != nil {"},
  {"line":98,"text":"\t\tif _, ok := l.ReadFile(newPos.FileName); !ok { // File doesn't exist"},
  {"line":99,"text":"\t\t\treturn nil"},
  {"line":100,"text":"\t\t}"},
  {"line":101,"text":"\t}"},
  {"line":102,"text":"\treturn newPos"},
  {"line":103,"text":"}"},
  {"line":105,"text":"func (l *LanguageService) tryGetGeneratedPositionWorker("},
  {"line":106,"text":"\tfileName string,"},
  {"line":107,"text":"\tposition core.TextPos,"},
  {"line":108,"text":") *sourcemap.DocumentPosition {"},
  {"line":109,"text":"\tif tspath.IsDeclarationFileName(fileName) {"},
  {"line":110,"text":"\t\treturn nil"},
  {"line":111,"text":"\t}"},
  {"line":113,"text":"\tprogram := l.GetProgram()"},
  {"line":114,"text":"\tif program == nil || program.GetSourceFile(fileName) == nil {"},
  {"line":115,"text":"\t\treturn nil"},
  {"line":116,"text":"\t}"},
  {"line":118,"text":"\tpath := l.toPath(fileName)"},
  {"line":120,"text":"\tif program.IsSourceFromProjectReference(path) {"},
  {"line":121,"text":"\t\treturn nil"},
  {"line":122,"text":"\t}"},
  {"line":124,"text":"\tdeclarationFileName := outputpaths.GetOutputDeclarationFileNameWorker(fileName, program.Options(), program)"},
  {"line":125,"text":"\tpositionMapper := l.GetDocumentPositionMapper(declarationFileName)"},
  {"line":126,"text":"\tdocumentPos := positionMapper.GetGeneratedPosition(&sourcemap.DocumentPosition{FileName: fileName, Pos: int(position)})"},
  {"line":127,"text":"\tif documentPos == nil {"},
  {"line":128,"text":"\t\treturn nil"},
  {"line":129,"text":"\t}"},
  {"line":130,"text":"\tif newPos := l.tryGetGeneratedPositionWorker(documentPos.FileName, core.TextPos(documentPos.Pos)); newPos != nil {"},
  {"line":131,"text":"\t\treturn newPos"},
  {"line":132,"text":"\t}"},
  {"line":133,"text":"\treturn documentPos"},
  {"line":134,"text":"}"},
];

export function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapDeclarations.find((declaration) => declaration.name === name);
}

export function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcLsSourceMapSourceLines.find((entry) => entry.line === line)?.text;
}
