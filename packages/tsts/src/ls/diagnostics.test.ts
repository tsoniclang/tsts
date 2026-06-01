import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import type { Diagnostic, DiagnosticMessage, SourceFileSlim } from "../diagnostics/types.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { DiagnosticSeverityError, DiagnosticSeverityHint, DiagnosticSeverityWarning } from "../lsp/lsproto/index.js";
import {
  diagnosticRange,
  diagnosticSeverity,
  getAllDiagnostics,
  provideDiagnostics,
  type DiagnosticProgram,
  type DiagnosticProgramOptions,
} from "./diagnostics.js";

const message: DiagnosticMessage = {
  key: "Test_message",
  code: 9001,
  category: DiagnosticCategory.Error,
  message: "Test message",
};

const sourceFile: SourceFileSlim = {
  fileName: "/file.ts",
  text: "first\nsecond\nthird",
};

function diagnostic(category: typeof DiagnosticCategory[keyof typeof DiagnosticCategory], start = 0, length = 1): Diagnostic {
  return {
    message,
    file: sourceFile,
    start,
    length,
    category,
    code: message.code,
    text: message.message,
  };
}

class Program implements DiagnosticProgram {
  readonly emitDeclarations: boolean;
  readonly syntactic = [diagnostic(DiagnosticCategory.Error, 0, 1)];
  readonly semantic = [diagnostic(DiagnosticCategory.Warning, 6, 2)];
  readonly suggestion = [diagnostic(DiagnosticCategory.Suggestion, 8, 1)];
  readonly declaration = [diagnostic(DiagnosticCategory.Error, 13, 5)];

  constructor(emitDeclarations: boolean) {
    this.emitDeclarations = emitDeclarations;
  }

  getSyntacticDiagnostics(_file: SourceFileSlim): readonly Diagnostic[] {
    return this.syntactic;
  }

  getSemanticDiagnostics(_file: SourceFileSlim): readonly Diagnostic[] {
    return this.semantic;
  }

  getSuggestionDiagnostics(_file: SourceFileSlim): readonly Diagnostic[] {
    return this.suggestion;
  }

  getDeclarationDiagnostics(_file: SourceFileSlim): readonly Diagnostic[] {
    return this.declaration;
  }

  options(): DiagnosticProgramOptions {
    return { getEmitDeclarations: () => this.emitDeclarations };
  }
}

export class DiagnosticsCollectionTests {
  collects_declaration_diagnostics_only_when_declarations_emit(): void {
    Assert.Equal(3, getAllDiagnostics(new Program(false), sourceFile).length);
    Assert.Equal(4, getAllDiagnostics(new Program(true), sourceFile).length);
  }

  preserves_diagnostic_category_severity_mapping(): void {
    Assert.Equal(DiagnosticSeverityError, diagnosticSeverity(diagnostic(DiagnosticCategory.Error), false));
    Assert.Equal(DiagnosticSeverityWarning, diagnosticSeverity(diagnostic(DiagnosticCategory.Warning), false));
    Assert.Equal(DiagnosticSeverityHint, diagnosticSeverity(diagnostic(DiagnosticCategory.Suggestion), false));
    Assert.Equal(DiagnosticSeverityWarning, diagnosticSeverity(diagnostic(DiagnosticCategory.Suggestion), true));
  }

  computes_lsp_ranges_from_source_offsets(): void {
    const range = diagnosticRange(sourceFile, 8, 4);
    Assert.Equal(1, range.start.line);
    Assert.Equal(2, range.start.character);
    Assert.Equal(2, range.end.line);
    Assert.Equal(0, range.end.character);
  }

  returns_full_document_diagnostic_report(): void {
    const program = new Program(false);
    const report = provideDiagnostics({
      getProgramAndFile: (_uri) => [program, sourceFile] as const,
      reportStyleChecksAsWarnings: () => false,
    }, "file:///file.ts");

    Assert.True(report.fullDocumentDiagnosticReport !== undefined);
    Assert.Equal("full", report.fullDocumentDiagnosticReport!.kind);
    Assert.Equal(3, report.fullDocumentDiagnosticReport!.items.length);
  }
}

A<DiagnosticsCollectionTests>().method((t) => t.collects_declaration_diagnostics_only_when_declarations_emit).add(FactAttribute);
A<DiagnosticsCollectionTests>().method((t) => t.preserves_diagnostic_category_severity_mapping).add(FactAttribute);
A<DiagnosticsCollectionTests>().method((t) => t.computes_lsp_ranges_from_source_offsets).add(FactAttribute);
A<DiagnosticsCollectionTests>().method((t) => t.returns_full_document_diagnostic_report).add(FactAttribute);
