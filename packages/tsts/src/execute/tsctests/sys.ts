export interface TscTestSys {
  readFile(path: string): string | undefined;
  writeFile(path: string, text: string): void;
}
