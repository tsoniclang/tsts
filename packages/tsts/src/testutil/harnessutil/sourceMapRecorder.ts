export interface SourceMapRecord {
  readonly generatedFile: string;
  readonly sourceMap: string;
}

export class SourceMapRecorder {
  private readonly records: SourceMapRecord[] = [];

  record(generatedFile: string, sourceMap: string): void {
    this.records.push({ generatedFile, sourceMap });
  }

  all(): readonly SourceMapRecord[] {
    return [...this.records];
  }

  toBaseline(): string {
    return this.records
      .map((record) => `//// ${record.generatedFile}\n${record.sourceMap}`)
      .join("\n\n");
  }
}
