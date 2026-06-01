/**
 * Public language-service API.
 *
 * Porting anchor for TS-Go `internal/ls/api.go`.
 */

import type { DocumentUri, Position } from "../lsp/lsproto/index.js";
import type { Host } from "./host.js";
import { LanguageService } from "./languageservice.js";

export interface LanguageServiceOptions {
  readonly host: Host;
}

export function newLanguageService(options: LanguageServiceOptions): LanguageService {
  return new LanguageService(options.host);
}

export interface FilePositionRequest {
  readonly uri: DocumentUri;
  readonly position: Position;
}

export interface FileRangeRequest extends FilePositionRequest {
  readonly end: Position;
}
