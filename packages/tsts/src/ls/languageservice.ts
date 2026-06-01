/**
 * Language service state holder.
 *
 * Porting anchor for TS-Go `internal/ls/languageservice.go`.
 */

import type { Diagnostic, DocumentUri, Hover, Position } from "../lsp/lsproto/index.js";
import type { Host } from "./host.js";

export class LanguageService {
  readonly host: Host;

  constructor(host: Host) {
    this.host = host;
  }

  getDiagnostics(uri: DocumentUri): readonly Diagnostic[] {
    const path = uri;
    const file = this.host.readFile(path);
    return file.ok ? [] : [{
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
      message: `File not found: ${path}`,
    }];
  }

  getHover(_uri: DocumentUri, _position: Position): Hover | undefined {
    return undefined;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.host.useCaseSensitiveFileNames();
  }
}
