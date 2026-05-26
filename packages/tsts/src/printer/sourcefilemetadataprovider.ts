/**
 * SourceFileMetadataProvider.
 *
 * Port of TS-Go `internal/printer/sourcefilemetadataprovider.go` (~10 LoC).
 * Minimal interface for accessing per-source-file metadata during emit.
 */

import type { SourceFile } from "../ast/index.js";

export interface SourceFileMetadataProvider {
  getSourceFileMetadata(file: SourceFile): unknown;
}
