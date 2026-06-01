export interface NpmExecutorMockCall {
  readonly method: string;
  readonly args: readonly unknown[];
}

export interface NpmInstallCall {
  readonly cwd: string;
  readonly args: readonly string[];
}

export class NpmExecutorMock {
  readonly calls: NpmExecutorMockCall[] = [];
  private readonly npmInstallCallList: NpmInstallCall[] = [];
  npmInstallFunc?: (cwd: string, args: readonly string[]) => Promise<Uint8Array | undefined> | Uint8Array | undefined;

  async npmInstall(cwd: string, args: readonly string[]): Promise<Uint8Array | undefined> {
    this.calls.push({ method: "npmInstall", args: [cwd, args] });
    this.npmInstallCallList.push({ cwd, args });
    return await this.npmInstallFunc?.(cwd, args);
  }

  npmInstallCalls(): readonly NpmInstallCall[] {
    return [...this.npmInstallCallList];
  }
}
