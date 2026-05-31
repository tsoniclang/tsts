export interface TestFileSystemEntry {
  readonly path: string;
  readonly content?: string;
}

export interface TestFileSystem {
  readonly files: readonly TestFileSystemEntry[];
}
