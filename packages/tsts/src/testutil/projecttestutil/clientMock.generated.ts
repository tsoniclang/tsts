export interface ClientMockCall {
  readonly method: string;
  readonly args: readonly unknown[];
}

export interface ProgressCall {
  readonly message: unknown;
  readonly args: readonly unknown[];
}

export interface ContextCall {
  readonly context: unknown;
}

export interface PublishDiagnosticsCall {
  readonly context: unknown;
  readonly params: unknown;
}

export interface SendTelemetryCall {
  readonly context: unknown;
  readonly telemetry: unknown;
}

export interface UnwatchFilesCall {
  readonly context: unknown;
  readonly id: unknown;
}

export interface WatchFilesCall {
  readonly context: unknown;
  readonly id: unknown;
  readonly watchers: readonly unknown[];
}

export class ClientMock {
  readonly calls: ClientMockCall[] = [];
  private readonly isActiveCallList: unknown[] = [];
  private readonly progressFinishCallList: ProgressCall[] = [];
  private readonly progressStartCallList: ProgressCall[] = [];
  private readonly publishDiagnosticsCallList: PublishDiagnosticsCall[] = [];
  private readonly refreshCodeLensCallList: ContextCall[] = [];
  private readonly refreshDiagnosticsCallList: ContextCall[] = [];
  private readonly refreshInlayHintsCallList: ContextCall[] = [];
  private readonly sendTelemetryCallList: SendTelemetryCall[] = [];
  private readonly unwatchFilesCallList: UnwatchFilesCall[] = [];
  private readonly watchFilesCallList: WatchFilesCall[] = [];

  watchFilesFunc?: (context: unknown, id: unknown, watchers: readonly unknown[]) => void | Promise<void>;
  unwatchFilesFunc?: (context: unknown, id: unknown) => void | Promise<void>;
  refreshDiagnosticsFunc?: (context: unknown) => void | Promise<void>;
  publishDiagnosticsFunc?: (context: unknown, params: unknown) => void | Promise<void>;
  refreshInlayHintsFunc?: (context: unknown) => void | Promise<void>;
  refreshCodeLensFunc?: (context: unknown) => void | Promise<void>;
  sendTelemetryFunc?: (context: unknown, telemetry: unknown) => void | Promise<void>;
  progressStartFunc?: (message: unknown, ...args: readonly unknown[]) => void;
  progressFinishFunc?: (message: unknown, ...args: readonly unknown[]) => void;
  isActiveFunc?: () => boolean;

  async watchFiles(context: unknown, id: unknown, watchers: readonly unknown[]): Promise<void> {
    const args = [context, id, watchers] as const;
    this.calls.push({ method: "watchFiles", args });
    this.watchFilesCallList.push({ context, id, watchers });
    await this.watchFilesFunc?.(context, id, watchers);
  }

  watchFilesCalls(): readonly WatchFilesCall[] {
    return [...this.watchFilesCallList];
  }

  async unwatchFiles(context: unknown, id: unknown): Promise<void> {
    const args = [context, id] as const;
    this.calls.push({ method: "unwatchFiles", args });
    this.unwatchFilesCallList.push({ context, id });
    await this.unwatchFilesFunc?.(context, id);
  }

  unwatchFilesCalls(): readonly UnwatchFilesCall[] {
    return [...this.unwatchFilesCallList];
  }

  async refreshDiagnostics(context: unknown): Promise<void> {
    const args = [context] as const;
    this.calls.push({ method: "refreshDiagnostics", args });
    this.refreshDiagnosticsCallList.push({ context });
    await this.refreshDiagnosticsFunc?.(context);
  }

  refreshDiagnosticsCalls(): readonly ContextCall[] {
    return [...this.refreshDiagnosticsCallList];
  }

  async publishDiagnostics(context: unknown, params: unknown): Promise<void> {
    const args = [context, params] as const;
    this.calls.push({ method: "publishDiagnostics", args });
    this.publishDiagnosticsCallList.push({ context, params });
    await this.publishDiagnosticsFunc?.(context, params);
  }

  publishDiagnosticsCalls(): readonly PublishDiagnosticsCall[] {
    return [...this.publishDiagnosticsCallList];
  }

  async refreshInlayHints(context: unknown): Promise<void> {
    const args = [context] as const;
    this.calls.push({ method: "refreshInlayHints", args });
    this.refreshInlayHintsCallList.push({ context });
    await this.refreshInlayHintsFunc?.(context);
  }

  refreshInlayHintsCalls(): readonly ContextCall[] {
    return [...this.refreshInlayHintsCallList];
  }

  async refreshCodeLens(context: unknown): Promise<void> {
    const args = [context] as const;
    this.calls.push({ method: "refreshCodeLens", args });
    this.refreshCodeLensCallList.push({ context });
    await this.refreshCodeLensFunc?.(context);
  }

  refreshCodeLensCalls(): readonly ContextCall[] {
    return [...this.refreshCodeLensCallList];
  }

  progressStart(message: unknown, ...args: readonly unknown[]): void {
    this.calls.push({ method: "progressStart", args: [message, ...args] });
    this.progressStartCallList.push({ message, args });
    this.progressStartFunc?.(message, ...args);
  }

  progressStartCalls(): readonly ProgressCall[] {
    return [...this.progressStartCallList];
  }

  progressFinish(message: unknown, ...args: readonly unknown[]): void {
    this.calls.push({ method: "progressFinish", args: [message, ...args] });
    this.progressFinishCallList.push({ message, args });
    this.progressFinishFunc?.(message, ...args);
  }

  progressFinishCalls(): readonly ProgressCall[] {
    return [...this.progressFinishCallList];
  }

  async sendTelemetry(context: unknown, telemetry: unknown): Promise<void> {
    const args = [context, telemetry] as const;
    this.calls.push({ method: "sendTelemetry", args });
    this.sendTelemetryCallList.push({ context, telemetry });
    await this.sendTelemetryFunc?.(context, telemetry);
  }

  sendTelemetryCalls(): readonly SendTelemetryCall[] {
    return [...this.sendTelemetryCallList];
  }

  isActive(): boolean {
    this.calls.push({ method: "isActive", args: [] });
    this.isActiveCallList.push({});
    return this.isActiveFunc?.() ?? false;
  }

  isActiveCalls(): readonly unknown[] {
    return [...this.isActiveCallList];
  }
}
