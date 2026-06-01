/**
 * Code-action orchestration.
 *
 * Port of TS-Go `internal/ls/codeactions.go`.
 */

import { TextRange } from "../core/index.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import type { SourceFileSlim } from "../diagnostics/types.js";
import {
  CodeActionKindQuickFix,
  CodeActionKindSourceFixAll,
  CodeActionKindSourceOrganizeImports,
  CodeActionKindSourceRemoveUnusedImports,
  CodeActionKindSourceSortImports,
  type CodeActionKind,
  type CodeActionParams,
  type CodeActionResponse,
  type CommandOrCodeAction,
  type Diagnostic,
  type DocumentUri,
  type Position,
  type TextEdit,
} from "../lsp/lsproto/index.js";
import { compareRanges } from "../lsp/lsproto/util.js";
import { getAllDiagnostics, type DiagnosticProgram } from "./diagnostics.js";
import { fileNameToDocumentURI } from "./lsconv/index.js";

export interface CodeFixProvider<TProgram extends CodeActionProgram = CodeActionProgram, TFile extends CodeActionSourceFile = CodeActionSourceFile> {
  readonly errorCodes: readonly number[];
  readonly getCodeActions: (fixContext: CodeFixContext<TProgram, TFile>) => readonly CodeAction[];
  readonly fixIds?: readonly string[];
  readonly getAllCodeActions?: (fixContext: CodeFixContext<TProgram, TFile>) => CombinedCodeActions | undefined;
}

export interface CodeFixContext<TProgram extends CodeActionProgram = CodeActionProgram, TFile extends CodeActionSourceFile = CodeActionSourceFile> {
  readonly sourceFile: TFile;
  readonly span?: TextRange;
  readonly errorCode?: number;
  readonly program: TProgram;
  readonly languageService: CodeActionLanguageService<TProgram, TFile>;
  readonly diagnostic?: Diagnostic;
  readonly params?: CodeActionParams;
}

export interface CodeAction {
  readonly description: string;
  readonly changes: readonly TextEdit[];
  readonly fixId?: string;
  readonly fixAllDescription?: string;
}

export interface CombinedCodeActions {
  readonly description: string;
  readonly changes: readonly TextEdit[];
}

export interface CodeActionSourceFile extends SourceFileSlim {
  readonly lineStarts: readonly number[];
  readonly path?: string;
}

export interface CodeActionConverters<TFile extends CodeActionSourceFile = CodeActionSourceFile> {
  lineAndCharacterToPosition(file: TFile, position: Position): number;
}

export interface CodeActionProgram<TFile extends CodeActionSourceFile = CodeActionSourceFile> extends DiagnosticProgram<TFile> {}

export interface CodeActionLanguageService<TProgram extends CodeActionProgram = CodeActionProgram, TFile extends CodeActionSourceFile = CodeActionSourceFile> {
  readonly converters: CodeActionConverters<TFile>;
  getProgramAndFile(uri: DocumentUri): readonly [TProgram, TFile];
  organizeImports(file: TFile, program: TProgram, kind: CodeActionKind): ReadonlyMap<string, readonly TextEdit[]>;
}

export const codeFixProviders: readonly CodeFixProvider[] = [];

export function compareCodeActions(left: CodeAction, right: CodeAction): number {
  return left.description.localeCompare(right.description)
    || left.changes.length - right.changes.length
    || compareTextEditLists(left.changes, right.changes);
}

export function provideCodeActions<TProgram extends CodeActionProgram<TFile>, TFile extends CodeActionSourceFile>(
  service: CodeActionLanguageService<TProgram, TFile>,
  params: CodeActionParams,
  providers: readonly CodeFixProvider<TProgram, TFile>[] = codeFixProviders as readonly CodeFixProvider<TProgram, TFile>[],
): CodeActionResponse {
  const [program, file] = service.getProgramAndFile(params.textDocument.uri);
  const actions: CommandOrCodeAction[] = [];

  if (params.context?.only !== undefined) {
    for (const kind of params.context.only) {
      for (const matchingKind of getOrganizeImportsActionsForKind(kind)) {
        actions.push(createOrganizeImportsAction(service, program, file, matchingKind));
      }
      if (isFixAllKind(kind)) {
        const fixAllAction = createFixAllAction(service, program, file, params.textDocument.uri, providers);
        if (fixAllAction !== undefined) actions.push(fixAllAction);
      }
    }
  }

  if (params.context?.diagnostics !== undefined && wantsQuickFixes(params.context.only)) {
    const fixIdSeen = new Map<string, CodeFixProvider<TProgram, TFile>>();

    for (const diagnostic of params.context.diagnostics) {
      const errorCode = diagnostic.code?.integer;
      if (errorCode === undefined) continue;

      for (const provider of providers) {
        if (!containsErrorCode(provider.errorCodes, errorCode)) continue;

        const start = service.converters.lineAndCharacterToPosition(file, diagnostic.range.start);
        const end = service.converters.lineAndCharacterToPosition(file, diagnostic.range.end);
        const fixContext: CodeFixContext<TProgram, TFile> = {
          sourceFile: file,
          span: new TextRange(start, end),
          errorCode,
          program,
          languageService: service,
          diagnostic,
          params,
        };
        for (const action of provider.getCodeActions(fixContext)) {
          actions.push(convertToLSPCodeAction(action, diagnostic, params.textDocument.uri));
          if (action.fixId !== undefined && action.fixId !== "") {
            fixIdSeen.set(action.fixId, provider);
          }
        }
      }
    }

    actions.push(...getFixAllQuickFixes(service, program, file, params.textDocument.uri, fixIdSeen));
  }

  return { commandOrCodeActionArray: actions };
}

export function getFixAllQuickFixes<TProgram extends CodeActionProgram<TFile>, TFile extends CodeActionSourceFile>(
  service: CodeActionLanguageService<TProgram, TFile>,
  program: TProgram,
  file: TFile,
  uri: DocumentUri,
  fixIdSeen: ReadonlyMap<string, CodeFixProvider<TProgram, TFile>>,
): readonly CommandOrCodeAction[] {
  const actions: CommandOrCodeAction[] = [];
  const seen = new Set<CodeFixProvider<TProgram, TFile>>();

  for (const provider of fixIdSeen.values()) {
    if (seen.has(provider)) continue;
    seen.add(provider);
    if (provider.getAllCodeActions === undefined) continue;
    if (!hasMultipleFixableDiagnostics(program, file, provider.errorCodes)) continue;

    const combined = provider.getAllCodeActions({
      sourceFile: file,
      program,
      languageService: service,
    });
    if (combined !== undefined && combined.changes.length > 0) {
      actions.push(workspaceCodeAction(combined.description, CodeActionKindQuickFix, uri, combined.changes));
    }
  }

  return actions;
}

export function hasMultipleFixableDiagnostics<TFile extends CodeActionSourceFile>(
  program: CodeActionProgram<TFile>,
  file: TFile,
  errorCodes: readonly number[],
): boolean {
  let count = 0;
  for (const diagnostic of getAllDiagnostics(program, file)) {
    if (containsErrorCode(errorCodes, diagnostic.code)) {
      count += 1;
      if (count >= 2) return true;
    }
  }
  return false;
}

export function codeActionKindContains(requestedKind: CodeActionKind, actionKind: CodeActionKind): boolean {
  return requestedKind === actionKind
    || requestedKind === ""
    || actionKind.startsWith(`${requestedKind}.`);
}

export function isFixAllKind(kind: CodeActionKind): boolean {
  return codeActionKindContains(kind, CodeActionKindSourceFixAll);
}

export function wantsQuickFixes(only: readonly CodeActionKind[] | undefined): boolean {
  if (only === undefined || only.length === 0) return true;
  return only.some((kind) => codeActionKindContains(kind, CodeActionKindQuickFix));
}

export function createFixAllAction<TProgram extends CodeActionProgram<TFile>, TFile extends CodeActionSourceFile>(
  service: CodeActionLanguageService<TProgram, TFile>,
  program: TProgram,
  file: TFile,
  uri: DocumentUri,
  providers: readonly CodeFixProvider<TProgram, TFile>[] = codeFixProviders as readonly CodeFixProvider<TProgram, TFile>[],
): CommandOrCodeAction | undefined {
  const changes: Record<string, readonly TextEdit[]> = {};

  for (const provider of providers) {
    if (provider.getAllCodeActions === undefined) continue;
    const combined = provider.getAllCodeActions({
      sourceFile: file,
      program,
      languageService: service,
    });
    if (combined !== undefined && combined.changes.length > 0) {
      changes[uri] = [...(changes[uri] ?? []), ...combined.changes];
    }
  }

  return Object.keys(changes).length === 0
    ? undefined
    : {
      codeAction: {
        title: Diagnostics.Fix_All.message,
        kind: CodeActionKindSourceFixAll,
        edit: { changes },
      },
    };
}

export function getOrganizeImportsActionTitle(kind: CodeActionKind): string {
  switch (kind) {
    case CodeActionKindSourceRemoveUnusedImports:
      return Diagnostics.Remove_Unused_Imports.message;
    case CodeActionKindSourceSortImports:
      return Diagnostics.Sort_Imports.message;
    default:
      return Diagnostics.Organize_Imports.message;
  }
}

export function getOrganizeImportsActionsForKind(requestedKind: CodeActionKind): readonly CodeActionKind[] {
  const organizeImportsKinds: readonly CodeActionKind[] = [
    CodeActionKindSourceOrganizeImports,
    CodeActionKindSourceRemoveUnusedImports,
    CodeActionKindSourceSortImports,
  ];

  const result = organizeImportsKinds.filter((organizeKind) => codeActionKindContains(requestedKind, organizeKind));
  return result.includes(requestedKind) ? [requestedKind] : result;
}

export function createOrganizeImportsAction<TProgram extends CodeActionProgram<TFile>, TFile extends CodeActionSourceFile>(
  service: CodeActionLanguageService<TProgram, TFile>,
  program: TProgram,
  file: TFile,
  kind: CodeActionKind,
): CommandOrCodeAction {
  const title = getOrganizeImportsActionTitle(kind);
  const changes = service.organizeImports(file, program, kind);
  const lspChanges: Record<string, readonly TextEdit[]> = {};

  for (const [fileName, edits] of changes) {
    lspChanges[fileNameToDocumentURI(fileName)] = edits;
  }

  return {
    codeAction: {
      title,
      kind,
      edit: { changes: lspChanges },
    },
  };
}

export function containsErrorCode(codes: readonly number[], code: number): boolean {
  return codes.includes(code);
}

export function convertToLSPCodeAction(action: CodeAction, diagnostic: Diagnostic, uri: DocumentUri): CommandOrCodeAction {
  return workspaceCodeAction(action.description, CodeActionKindQuickFix, uri, action.changes, [diagnostic]);
}

function workspaceCodeAction(
  title: string,
  kind: CodeActionKind,
  uri: DocumentUri,
  edits: readonly TextEdit[],
  diagnostics?: readonly Diagnostic[],
): CommandOrCodeAction {
  const changes: Record<string, readonly TextEdit[]> = {};
  changes[uri] = edits;
  const codeAction = {
    title,
    kind,
    edit: { changes },
  };
  if (diagnostics === undefined) {
    return { codeAction };
  }
  return {
    codeAction: {
      ...codeAction,
      diagnostics,
    },
  };
}

function compareTextEditLists(left: readonly TextEdit[], right: readonly TextEdit[]): number {
  for (let index = 0; index < left.length; index += 1) {
    const comparison = compareTextEdits(left[index]!, right[index]!);
    if (comparison !== 0) return comparison;
  }
  return 0;
}

function compareTextEdits(left: TextEdit, right: TextEdit): number {
  return compareRanges(left.range, right.range)
    || left.newText.localeCompare(right.newText);
}
