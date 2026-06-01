export interface SourceMapRecord {
  readonly source: string;
  readonly generated: string;
  readonly sourceMap: string;
}

export class SourceMapRecordSet {
  private readonly records: SourceMapRecord[] = [];

  add(record: SourceMapRecord): void {
    this.records.push(record);
  }

  values(): readonly SourceMapRecord[] {
    return [...this.records].sort((left, right) => left.generated.localeCompare(right.generated));
  }

  isEmpty(): boolean {
    return this.records.length === 0;
  }
}
