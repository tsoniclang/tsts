export interface NpmExecutorMockCall {
  readonly method: string;
  readonly args: readonly unknown[];
}

export class NpmExecutorMock {
  readonly calls: NpmExecutorMockCall[] = [];
  installFunc?: (...args: readonly unknown[]) => Promise<void> | void;

  async install(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "install", args });
    await this.installFunc?.(...args);
  }
}
