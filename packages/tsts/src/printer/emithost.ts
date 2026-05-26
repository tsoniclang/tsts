/**
 * EmitHost interface.
 *
 * Port of TS-Go `internal/printer/emithost.go` (~23 LoC). The EmitHost
 * provides the printer with access to host-level services: file write,
 * source-file lookup, and compiler-option queries.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";

export interface EmitHost {
  getSourceFile(fileName: string): SourceFile | undefined;
  getCompilerOptions(): unknown;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  writeFile(
    fileName: string, data: string, writeByteOrderMark: boolean,
    onError?: (message: string) => void, sourceFiles?: readonly SourceFile[],
    diagnostics?: readonly unknown[],
  ): void;
  getNewLine(): string;
  getCanonicalFileName(fileName: string): string;
  isEmitBlocked(emitFileName: string): boolean;
  getSourceFiles(): readonly SourceFile[];
  getProjectReferenceRedirect(fileName: string): string | undefined;
  isSourceOfProjectReferenceRedirect(fileName: string): boolean;
  getResolvedProjectReferenceToRedirect(fileName: string): unknown;
  getRedirectFromOutputFileName(fileName: string): unknown;
  redirectTargetsMap: Map<string, readonly string[]>;
}

export type _Node = AstNode;
