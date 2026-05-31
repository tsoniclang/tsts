export interface AutoImportFixture {
  readonly packageName: string;
  readonly files: ReadonlyMap<string, string>;
}

export function createAutoImportFixture(packageName: string, files: Iterable<readonly [string, string]>): AutoImportFixture {
  return { packageName, files: new Map(files) };
}
