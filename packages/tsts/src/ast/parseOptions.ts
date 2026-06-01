export interface SourceFileParseOptions {
  readonly fileName: string;
  readonly path?: string;
  readonly scriptKind?: number;
  readonly languageVersion?: number;
  readonly setExternalModuleIndicator?: boolean;
  readonly jsDocParsingMode?: number;
}
