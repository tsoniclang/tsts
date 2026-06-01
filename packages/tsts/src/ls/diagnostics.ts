/**
 * Language-service parity map for TS-Go `ls/diagnostics.go`.
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

export const lsDiagnosticsUpstreamPath = "ls/diagnostics.go";

export const lsDiagnosticsDeclarations: readonly UpstreamDeclaration[] = [
  {"line":14,"kind":"func","name":"getAllDiagnostics"},
  {"line":25,"kind":"func","name":"ProvideDiagnostics","receiver":"l *LanguageService"},
  {"line":37,"kind":"func","name":"toLSPDiagnostics","receiver":"l *LanguageService"},
];

export const lsDiagnosticsSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package ls"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"context\""},
  {"line":6,"text":"\t\"github.com/microsoft/typescript-go/internal/ast\""},
  {"line":7,"text":"\t\"github.com/microsoft/typescript-go/internal/compiler\""},
  {"line":8,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":9,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":10,"text":")"},
  {"line":14,"text":"func getAllDiagnostics(ctx context.Context, program *compiler.Program, file *ast.SourceFile) []*ast.Diagnostic {"},
  {"line":15,"text":"\tvar diags []*ast.Diagnostic"},
  {"line":16,"text":"\tdiags = append(diags, program.GetSyntacticDiagnostics(ctx, file)...)"},
  {"line":17,"text":"\tdiags = append(diags, program.GetSemanticDiagnostics(ctx, file)...)"},
  {"line":18,"text":"\tdiags = append(diags, program.GetSuggestionDiagnostics(ctx, file)...)"},
  {"line":19,"text":"\tif program.Options().GetEmitDeclarations() {"},
  {"line":20,"text":"\t\tdiags = append(diags, program.GetDeclarationDiagnostics(ctx, file)...)"},
  {"line":21,"text":"\t}"},
  {"line":22,"text":"\treturn diags"},
  {"line":23,"text":"}"},
  {"line":25,"text":"func (l *LanguageService) ProvideDiagnostics(ctx context.Context, uri lsproto.DocumentUri) (lsproto.DocumentDiagnosticResponse, error) {"},
  {"line":26,"text":"\tprogram, file := l.getProgramAndFile(uri)"},
  {"line":28,"text":"\tdiagnostics := getAllDiagnostics(ctx, program, file)"},
  {"line":30,"text":"\treturn lsproto.RelatedFullDocumentDiagnosticReportOrUnchangedDocumentDiagnosticReport{"},
  {"line":31,"text":"\t\tFullDocumentDiagnosticReport: &lsproto.RelatedFullDocumentDiagnosticReport{"},
  {"line":32,"text":"\t\t\tItems: l.toLSPDiagnostics(ctx, diagnostics),"},
  {"line":33,"text":"\t\t},"},
  {"line":34,"text":"\t}, nil"},
  {"line":35,"text":"}"},
  {"line":37,"text":"func (l *LanguageService) toLSPDiagnostics(ctx context.Context, diagnostics ...[]*ast.Diagnostic) []*lsproto.Diagnostic {"},
  {"line":38,"text":"\tsize := 0"},
  {"line":39,"text":"\tfor _, diagSlice := range diagnostics {"},
  {"line":40,"text":"\t\tsize += len(diagSlice)"},
  {"line":41,"text":"\t}"},
  {"line":42,"text":"\tlspDiagnostics := make([]*lsproto.Diagnostic, 0, size)"},
  {"line":43,"text":"\tfor _, diagSlice := range diagnostics {"},
  {"line":44,"text":"\t\tfor _, diag := range diagSlice {"},
  {"line":45,"text":"\t\t\tlspDiagnostics = append(lspDiagnostics, lsconv.DiagnosticToLSPPull(ctx, l.converters, diag, l.UserPreferences().ReportStyleChecksAsWarnings.IsTrue()))"},
  {"line":46,"text":"\t\t}"},
  {"line":47,"text":"\t}"},
  {"line":48,"text":"\treturn lspDiagnostics"},
  {"line":49,"text":"}"},
];

export function findLsDiagnosticsDeclaration(name: string): UpstreamDeclaration | undefined {
  return lsDiagnosticsDeclarations.find((declaration) => declaration.name === name);
}

export function requireLsDiagnosticsDeclaration(name: string): UpstreamDeclaration {
  const declaration = findLsDiagnosticsDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

export function lsDiagnosticsLineText(line: number): string | undefined {
  return lsDiagnosticsSourceLines.find((entry) => entry.line === line)?.text;
}
