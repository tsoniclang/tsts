export interface ClientMockCall {
  readonly method: string;
  readonly args: readonly unknown[];
}

export class ClientMock {
  readonly calls: ClientMockCall[] = [];
  watchFilesFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  unwatchFilesFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  refreshDiagnosticsFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  publishDiagnosticsFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  refreshInlayHintsFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  refreshCodeLensFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  sendTelemetryFunc?: (...args: readonly unknown[]) => void | Promise<void>;
  isActiveFunc?: () => boolean;

  async watchFiles(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "watchFiles", args });
    await this.watchFilesFunc?.(...args);
  }

  async unwatchFiles(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "unwatchFiles", args });
    await this.unwatchFilesFunc?.(...args);
  }

  async refreshDiagnostics(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "refreshDiagnostics", args });
    await this.refreshDiagnosticsFunc?.(...args);
  }

  async publishDiagnostics(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "publishDiagnostics", args });
    await this.publishDiagnosticsFunc?.(...args);
  }

  async refreshInlayHints(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "refreshInlayHints", args });
    await this.refreshInlayHintsFunc?.(...args);
  }

  async refreshCodeLens(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "refreshCodeLens", args });
    await this.refreshCodeLensFunc?.(...args);
  }

  progressStart(...args: readonly unknown[]): void {
    this.calls.push({ method: "progressStart", args });
  }

  progressFinish(...args: readonly unknown[]): void {
    this.calls.push({ method: "progressFinish", args });
  }

  async sendTelemetry(...args: readonly unknown[]): Promise<void> {
    this.calls.push({ method: "sendTelemetry", args });
    await this.sendTelemetryFunc?.(...args);
  }

  isActive(): boolean {
    this.calls.push({ method: "isActive", args: [] });
    return this.isActiveFunc?.() ?? true;
  }
}
