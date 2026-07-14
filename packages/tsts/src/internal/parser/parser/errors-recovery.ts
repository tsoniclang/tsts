import type { int } from "../../../go/scalars.js";
import { GoAppend, type GoInterface, type GoPtr, type GoSlice } from "../../../go/compat.js";
import { GoPointerValueOps, GoSliceAppend } from "../../../go/compat.js";
import type { SourceFile } from "../../ast/ast.js";
import { NewDiagnostic } from "../../ast/diagnostic.js";
import type { Diagnostic } from "../../ast/diagnostic.js";
import { Diagnostic_Pos, Diagnostic_RelatedInformation, Diagnostic_SetFile } from "../../ast/diagnostic.js";
import { NewTextRange } from "../../core/text.js";
import { TextRange_Pos, TextRange_End } from "../../core/text.js";
import type { TextRange } from "../../core/text.js";
import type { Message } from "../../diagnostics/diagnostics.js";
import { SkipTrivia } from "../../scanner/scanner.js";
import type { Parser } from "./state.js";
import { GoSliceLoad } from "../../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/parser.go::method::Parser.scanError","kind":"method","status":"implemented","sigHash":"4cb77a38a6d3ba42f133ea91d3303ab6f366aec1c1e60aa0365afb68874ed7bb"}
 *
 * Go source:
 * func (p *Parser) scanError(message *diagnostics.Message, pos int, length int, args ...any) {
 * 	p.parseErrorAtRange(core.NewTextRange(pos, pos+length), message, args...)
 * }
 */
export function Parser_scanError(receiver: GoPtr<Parser>, message: GoPtr<Message>, pos: int, length: int, ...args: Array<GoInterface<unknown>>): void {
  Parser_parseErrorAtRange(receiver, NewTextRange(pos, pos + length), message, ...args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/parser.go::method::Parser.parseErrorAt","kind":"method","status":"implemented","sigHash":"8d8b0a591144dbb765b4f0d29a3efd9359e63d101e41edc38eddce55702b18f9"}
 *
 * Go source:
 * func (p *Parser) parseErrorAt(pos int, end int, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 	return p.parseErrorAtRange(core.NewTextRange(pos, end), message, args...)
 * }
 */
export function Parser_parseErrorAt(receiver: GoPtr<Parser>, pos: int, end: int, message: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Diagnostic> {
  return Parser_parseErrorAtRange(receiver, NewTextRange(pos, end), message, ...args);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/parser.go::method::Parser.parseErrorAtRange","kind":"method","status":"implemented","sigHash":"608373636629518793de10c153ca49430f6368d2a2b6045c0e036ec3e670a22b"}
 *
 * Go source:
 * func (p *Parser) parseErrorAtRange(loc core.TextRange, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 	// Don't report another error if it would just be at the same location as the last error
 * 	var result *ast.Diagnostic
 * 	if len(p.diagnostics) == 0 || p.diagnostics[len(p.diagnostics)-1].Pos() != loc.Pos() {
 * 		result = ast.NewDiagnostic(nil, loc, message, args...)
 * 		p.diagnostics = append(p.diagnostics, result)
 * 	}
 * 	p.hasParseError = true
 * 	return result
 * }
 */
export function Parser_parseErrorAtRange(receiver: GoPtr<Parser>, loc: TextRange, message: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): GoPtr<Diagnostic> {
  // Don't report another error if it would just be at the same location as the last error
  let result: GoPtr<Diagnostic> = undefined;
  if (receiver!.diagnostics.length === 0 || Diagnostic_Pos(GoSliceLoad(receiver!.diagnostics, receiver!.diagnostics.length - 1, GoPointerValueOps<Diagnostic>())) !== TextRange_Pos(loc)) {
    result = NewDiagnostic(undefined, loc, message, ...args);
    receiver!.diagnostics = GoSliceAppend(receiver!.diagnostics, result, GoPointerValueOps<Diagnostic>());
  }
  receiver!.hasParseError = true;
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/parser.go::func::attachFileToDiagnostics","kind":"func","status":"implemented","sigHash":"62daefe68a9446f449b2037ca5a675cd5772295d5c3ebda6a082783039697721"}
 *
 * Go source:
 * func attachFileToDiagnostics(diagnostics []*ast.Diagnostic, file *ast.SourceFile) []*ast.Diagnostic {
 * 	for _, d := range diagnostics {
 * 		d.SetFile(file)
 * 		for _, r := range d.RelatedInformation() {
 * 			r.SetFile(file)
 * 		}
 * 	}
 * 	return diagnostics
 * }
 */
export function attachFileToDiagnostics(diagnostics: GoSlice<GoPtr<Diagnostic>>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  for (const d of diagnostics) {
    Diagnostic_SetFile(d, file);
    for (const r of Diagnostic_RelatedInformation(d)) {
      Diagnostic_SetFile(r, file);
    }
  }
  return diagnostics;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/parser/parser.go::method::Parser.jsErrorAtRange","kind":"method","status":"implemented","sigHash":"f51b95c35feb0706f901334935342bad82b923f4f57e3477c218f96d34d1cc26"}
 *
 * Go source:
 * func (p *Parser) jsErrorAtRange(loc core.TextRange, message *diagnostics.Message, args ...any) {
 * 	p.jsDiagnostics = append(p.jsDiagnostics, ast.NewDiagnostic(nil, core.NewTextRange(scanner.SkipTrivia(p.sourceText, loc.Pos()), loc.End()), message, args...))
 * }
 */
export function Parser_jsErrorAtRange(receiver: GoPtr<Parser>, loc: TextRange, message: GoPtr<Message>, ...args: Array<GoInterface<unknown>>): void {
  receiver!.jsDiagnostics = GoSliceAppend(receiver!.jsDiagnostics, NewDiagnostic(undefined, NewTextRange(SkipTrivia(receiver!.sourceText, TextRange_Pos(loc)), TextRange_End(loc)), message, ...args), GoPointerValueOps<Diagnostic>());
}
