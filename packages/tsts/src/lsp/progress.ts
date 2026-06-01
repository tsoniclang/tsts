/**
 * Work-done progress state machine.
 *
 * Port of TS-Go `internal/lsp/progress.go`, expressed synchronously so tests can
 * drive event ordering deterministically.
 */

import type { ProgressParams, WorkDoneProgressBeginOrReportOrEnd } from "./lsproto/index.js";

export interface ProgressReporter {
  localize(message: string, ...args: readonly unknown[]): string;
  createWorkDoneProgress(token: string): void;
  sendProgress(token: string, value: WorkDoneProgressBeginOrReportOrEnd): void;
}

export interface ProgressEvent {
  readonly message: string;
  readonly args: readonly unknown[];
  readonly finish: boolean;
}

export class ProjectLoadingProgress {
  private readonly reporter: ProgressReporter;
  private readonly loading = new Map<string, number>();
  private token = "";
  private tokenId = 0;
  private begun = false;

  constructor(reporter: ProgressReporter) {
    this.reporter = reporter;
  }

  start(message: string, ...args: readonly unknown[]): void {
    this.handle({ message, args, finish: false });
  }

  finish(message: string, ...args: readonly unknown[]): void {
    this.handle({ message, args, finish: true });
  }

  activeToken(): string {
    return this.token;
  }

  activeMessages(): readonly string[] {
    return [...this.loading.keys()];
  }

  private handle(event: ProgressEvent): void {
    const text = this.reporter.localize(event.message, ...event.args);
    if (!event.finish) {
      this.loading.set(text, (this.loading.get(text) ?? 0) + 1);
      if (this.token === "") {
        this.tokenId += 1;
        this.token = `tsgo-loading-${this.tokenId}`;
        this.begun = false;
        this.reporter.createWorkDoneProgress(this.token);
      }
      this.begun = this.beginOrReport(this.token, text, this.begun);
      return;
    }
    const count = this.loading.get(text) ?? 0;
    if (count <= 1) this.loading.delete(text);
    else this.loading.set(text, count - 1);
    if (this.token === "") return;
    if (this.loading.size === 0) {
      if (this.begun) this.reporter.sendProgress(this.token, { end: { kind: "end" } });
      this.token = "";
      this.begun = false;
      return;
    }
    const first = this.loading.keys().next().value as string;
    this.reporter.sendProgress(this.token, { report: { kind: "report", message: first } });
  }

  private beginOrReport(token: string, text: string, begun: boolean): boolean {
    if (!begun) {
      this.reporter.sendProgress(token, { begin: { kind: "begin", title: this.reporter.localize("Loading"), message: text } });
    } else {
      this.reporter.sendProgress(token, { report: { kind: "report", message: text } });
    }
    return true;
  }
}

export function progressParams(token: string, value: WorkDoneProgressBeginOrReportOrEnd): ProgressParams {
  return { token: { string: token }, value };
}
