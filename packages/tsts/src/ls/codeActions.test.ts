import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { Diagnostic as CompilerDiagnostic } from "../diagnostics/types.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import {
  CodeActionKindQuickFix,
  CodeActionKindSource,
  CodeActionKindSourceFixAll,
  CodeActionKindSourceOrganizeImports,
  CodeActionKindSourceRemoveUnusedImports,
  CodeActionKindSourceSortImports,
  type CodeActionKind,
  type CodeActionParams,
  type Diagnostic,
  type DocumentUri,
  type Position,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import {
  codeActionKindContains,
  compareCodeActions,
  containsErrorCode,
  createFixAllAction,
  createOrganizeImportsAction,
  getFixAllQuickFixes,
  getOrganizeImportsActionTitle,
  getOrganizeImportsActionsForKind,
  hasMultipleFixableDiagnostics,
  isFixAllKind,
  provideCodeActions,
  wantsQuickFixes,
  type CodeAction,
  type CodeActionLanguageService,
  type CodeActionProgram,
  type CodeActionSourceFile,
  type CodeFixProvider,
} from "./codeActions.js";

interface TestFile extends CodeActionSourceFile {
  readonly fileName: string;
  readonly text: string;
  readonly lineStarts: readonly number[];
  readonly path: string;
}

class Program implements CodeActionProgram<TestFile> {
  readonly syntactic: CompilerDiagnostic[] = [];
  readonly semantic: CompilerDiagnostic[] = [];
  readonly suggestion: CompilerDiagnostic[] = [];
  readonly declaration: CompilerDiagnostic[] = [];

  getSyntacticDiagnostics(_file: TestFile): readonly CompilerDiagnostic[] {
    return this.syntactic;
  }

  getSemanticDiagnostics(_file: TestFile): readonly CompilerDiagnostic[] {
    return this.semantic;
  }

  getSuggestionDiagnostics(_file: TestFile): readonly CompilerDiagnostic[] {
    return this.suggestion;
  }

  getDeclarationDiagnostics(_file: TestFile): readonly CompilerDiagnostic[] {
    return this.declaration;
  }

  options(): { getEmitDeclarations(): boolean } {
    return { getEmitDeclarations: () => false };
  }
}

class Service implements CodeActionLanguageService<Program, TestFile> {
  readonly converters = {
    lineAndCharacterToPosition(file: TestFile, position: Position): number {
      return (file.lineStarts[position.line] ?? 0) + position.character;
    },
  };

  readonly program: Program;
  readonly file: TestFile;
  readonly organizeEdits = new Map<string, readonly TextEdit[]>();

  constructor(program: Program, file: TestFile) {
    this.program = program;
    this.file = file;
  }

  getProgramAndFile(_uri: DocumentUri): readonly [Program, TestFile] {
    return [this.program, this.file];
  }

  organizeImports(_file: TestFile, _program: Program, _kind: CodeActionKind): ReadonlyMap<string, readonly TextEdit[]> {
    return this.organizeEdits;
  }
}

function testFile(text: string = "one\ntwo\nthree"): TestFile {
  return {
    fileName: "/repo/src/file.ts",
    text,
    lineStarts: [0, 4, 8],
    path: "/repo/src/file.ts",
  };
}

function edit(newText: string, start: number = 0, end: number = 0): TextEdit {
  return {
    range: {
      start: { line: 0, character: start },
      end: { line: 0, character: end },
    },
    newText,
  };
}

function lspDiagnostic(code: number, startLine: number = 0, startCharacter: number = 0, endLine: number = 0, endCharacter: number = 1): Diagnostic {
  return {
    range: {
      start: { line: startLine, character: startCharacter },
      end: { line: endLine, character: endCharacter },
    },
    code: { integer: code },
    message: "diagnostic",
  };
}

function compilerDiagnostic(code: number, file: TestFile): CompilerDiagnostic {
  return {
    message: Diagnostics.Cannot_find_name_0,
    file,
    start: 0,
    length: 1,
    category: DiagnosticCategory.Error,
    code,
    text: "diagnostic",
  };
}

function provider(errorCode: number): CodeFixProvider<Program, TestFile> {
  return {
    errorCodes: [errorCode],
    getCodeActions: () => [{
      description: "Add missing import",
      changes: [edit("import { value } from \"pkg\";\n")],
      fixId: "fixMissingImport",
      fixAllDescription: "Add all missing imports",
    }],
    getAllCodeActions: () => ({
      description: "Add all missing imports",
      changes: [edit("import { a } from \"pkg\";\nimport { b } from \"pkg\";\n")],
    }),
  };
}

function params(uri: DocumentUri, only: readonly CodeActionKind[] | undefined, diagnostics: readonly Diagnostic[]): CodeActionParams {
  const context = only === undefined
    ? { diagnostics }
    : { only, diagnostics };
  return {
    textDocument: { uri },
    range: {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 1 },
    },
    context,
  };
}

export class CodeActionsTests {
  code_action_kind_contains_matches_hierarchical_kind_semantics(): void {
    Assert.True(codeActionKindContains("", CodeActionKindQuickFix));
    Assert.True(codeActionKindContains(CodeActionKindSource, CodeActionKindSourceFixAll));
    Assert.True(codeActionKindContains(CodeActionKindSourceFixAll, CodeActionKindSourceFixAll));
    Assert.False(codeActionKindContains(CodeActionKindQuickFix, CodeActionKindSourceFixAll));
    Assert.True(isFixAllKind(CodeActionKindSource));
    Assert.True(isFixAllKind(CodeActionKindSourceFixAll));
    Assert.False(isFixAllKind(CodeActionKindQuickFix));
  }

  wants_quick_fixes_matches_only_filter(): void {
    Assert.True(wantsQuickFixes(undefined));
    Assert.True(wantsQuickFixes([]));
    Assert.True(wantsQuickFixes([CodeActionKindQuickFix]));
    Assert.False(wantsQuickFixes([CodeActionKindSourceOrganizeImports]));
  }

  organize_import_kind_selection_matches_tsgo(): void {
    const all = getOrganizeImportsActionsForKind(CodeActionKindSource);
    const exact = getOrganizeImportsActionsForKind(CodeActionKindSourceSortImports);

    Assert.Equal(3, all.length);
    Assert.Equal(CodeActionKindSourceOrganizeImports, all[0]);
    Assert.Equal(CodeActionKindSourceRemoveUnusedImports, all[1]);
    Assert.Equal(CodeActionKindSourceSortImports, all[2]);
    Assert.Equal(1, exact.length);
    Assert.Equal(CodeActionKindSourceSortImports, exact[0]);
  }

  organize_import_titles_match_diagnostic_catalog(): void {
    Assert.Equal("Organize Imports", getOrganizeImportsActionTitle(CodeActionKindSourceOrganizeImports));
    Assert.Equal("Remove Unused Imports", getOrganizeImportsActionTitle(CodeActionKindSourceRemoveUnusedImports));
    Assert.Equal("Sort Imports", getOrganizeImportsActionTitle(CodeActionKindSourceSortImports));
  }

  compare_code_actions_orders_description_change_count_and_edits(): void {
    const left: CodeAction = { description: "A", changes: [edit("b")] };
    const right: CodeAction = { description: "B", changes: [edit("a")] };
    const shorter: CodeAction = { description: "A", changes: [] };
    const laterEdit: CodeAction = { description: "A", changes: [edit("c")] };

    Assert.True(compareCodeActions(left, right) < 0);
    Assert.True(compareCodeActions(shorter, left) < 0);
    Assert.True(compareCodeActions(left, laterEdit) < 0);
    Assert.Equal(0, compareCodeActions(left, { description: "A", changes: [edit("b")] }));
  }

  create_organize_imports_action_returns_empty_workspace_edit_when_no_changes(): void {
    const file = testFile();
    const program = new Program();
    const service = new Service(program, file);

    const action = createOrganizeImportsAction(service, program, file, CodeActionKindSourceOrganizeImports);

    Assert.Equal("Organize Imports", action.codeAction?.title);
    Assert.Equal(0, Object.keys(action.codeAction?.edit?.changes ?? {}).length);
  }

  create_organize_imports_action_converts_file_names_to_document_uris(): void {
    const file = testFile();
    const program = new Program();
    const service = new Service(program, file);
    service.organizeEdits.set("/repo/src/file.ts", [edit("sorted")]);

    const action = createOrganizeImportsAction(service, program, file, CodeActionKindSourceSortImports);
    const changes = action.codeAction?.edit?.changes ?? {};

    Assert.Equal("Sort Imports", action.codeAction?.title);
    Assert.Equal(1, Object.keys(changes).length);
    Assert.Equal("sorted", changes["file:///repo/src/file.ts"]?.[0]?.newText);
  }

  quickfix_provider_actions_convert_to_lsp_code_actions_and_fix_all_quickfixes(): void {
    const file = testFile();
    const program = new Program();
    program.semantic.push(compilerDiagnostic(2304, file), compilerDiagnostic(2304, file));
    const service = new Service(program, file);

    const response = provideCodeActions(
      service,
      params("file:///repo/src/file.ts", [CodeActionKindQuickFix], [lspDiagnostic(2304, 0, 1, 1, 2)]),
      [provider(2304)],
    );
    const actions = response.commandOrCodeActionArray ?? [];

    Assert.Equal(2, actions.length);
    Assert.Equal("Add missing import", actions[0]?.codeAction?.title);
    Assert.Equal(CodeActionKindQuickFix, actions[0]?.codeAction?.kind);
    Assert.Equal(1, actions[0]?.codeAction?.diagnostics?.length);
    Assert.Equal("Add all missing imports", actions[1]?.codeAction?.title);
    Assert.True(actions[1]?.codeAction?.edit?.changes?.["file:///repo/src/file.ts"] !== undefined);
  }

  source_fix_all_combines_all_provider_changes(): void {
    const file = testFile();
    const program = new Program();
    const service = new Service(program, file);

    const action = createFixAllAction(service, program, file, "file:///repo/src/file.ts", [provider(2304), provider(2552)]);
    const changes = action?.codeAction?.edit?.changes?.["file:///repo/src/file.ts"] ?? [];

    Assert.Equal("Fix All", action?.codeAction?.title);
    Assert.Equal(CodeActionKindSourceFixAll, action?.codeAction?.kind);
    Assert.Equal(2, changes.length);
  }

  fix_all_quickfixes_require_multiple_matching_diagnostics(): void {
    const file = testFile();
    const program = new Program();
    program.semantic.push(compilerDiagnostic(2304, file));
    const service = new Service(program, file);
    const seen = new Map<string, CodeFixProvider<Program, TestFile>>();
    seen.set("fixMissingImport", provider(2304));

    Assert.False(hasMultipleFixableDiagnostics(program, file, [2304]));
    Assert.Equal(0, getFixAllQuickFixes(service, program, file, "file:///repo/src/file.ts", seen).length);

    program.semantic.push(compilerDiagnostic(2304, file));

    Assert.True(hasMultipleFixableDiagnostics(program, file, [2304]));
    Assert.Equal(1, getFixAllQuickFixes(service, program, file, "file:///repo/src/file.ts", seen).length);
  }

  contains_error_code_matches_slices_contains(): void {
    Assert.True(containsErrorCode([1, 2, 3], 2));
    Assert.False(containsErrorCode([1, 2, 3], 4));
  }

  diagnostic_range_is_converted_to_text_range_for_provider_context(): void {
    const file = testFile();
    const program = new Program();
    const service = new Service(program, file);
    let spanStart = -1;
    let spanEnd = -1;
    const capturingProvider: CodeFixProvider<Program, TestFile> = {
      errorCodes: [2304],
      getCodeActions: (context) => {
        spanStart = context.span?.pos ?? -1;
        spanEnd = context.span?.end ?? -1;
        return [];
      },
    };

    provideCodeActions(
      service,
      params("file:///repo/src/file.ts", [CodeActionKindQuickFix], [lspDiagnostic(2304, 1, 1, 2, 2)]),
      [capturingProvider],
    );

    Assert.Equal(5, spanStart);
    Assert.Equal(10, spanEnd);
  }
}

A<CodeActionsTests>().method((t) => t.code_action_kind_contains_matches_hierarchical_kind_semantics).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.wants_quick_fixes_matches_only_filter).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.organize_import_kind_selection_matches_tsgo).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.organize_import_titles_match_diagnostic_catalog).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.compare_code_actions_orders_description_change_count_and_edits).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.create_organize_imports_action_returns_empty_workspace_edit_when_no_changes).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.create_organize_imports_action_converts_file_names_to_document_uris).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.quickfix_provider_actions_convert_to_lsp_code_actions_and_fix_all_quickfixes).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.source_fix_all_combines_all_provider_changes).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.fix_all_quickfixes_require_multiple_matching_diagnostics).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.contains_error_code_matches_slices_contains).add(FactAttribute);
A<CodeActionsTests>().method((t) => t.diagnostic_range_is_converted_to_text_range_for_provider_context).add(FactAttribute);
