export interface Client {
  watchFiles(context: unknown, id: string, watchers: readonly unknown[]): Promise<void> | void;
  unwatchFiles(context: unknown, id: string): Promise<void> | void;
  refreshDiagnostics(context: unknown): Promise<void> | void;
  publishDiagnostics(context: unknown, params: unknown): Promise<void> | void;
  refreshInlayHints(context: unknown): Promise<void> | void;
  refreshCodeLens(context: unknown): Promise<void> | void;
  progressStart(message: unknown, ...args: readonly unknown[]): void;
  progressFinish(message: unknown, ...args: readonly unknown[]): void;
  sendTelemetry(context: unknown, telemetry: unknown): Promise<void> | void;
  isActive(): boolean;
}
