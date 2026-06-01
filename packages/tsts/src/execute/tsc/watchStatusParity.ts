/**
 * TSC watch-status parity helpers.
 */

export type WatchStatusKind = "starting" | "file-change" | "config-change" | "compiling" | "success" | "failure";

export interface WatchStatus {
  readonly kind: WatchStatusKind;
  readonly project?: string;
  readonly file?: string;
  readonly diagnosticCount?: number;
}

export function formatWatchStatus(status: WatchStatus): string {
  switch (status.kind) {
    case "starting":
      return `Starting compilation in watch mode${projectSuffix(status)}.`;
    case "file-change":
      return `File change detected${fileSuffix(status)}. Starting incremental compilation.`;
    case "config-change":
      return `Project configuration changed${projectSuffix(status)}.`;
    case "compiling":
      return `Compiling${projectSuffix(status)}.`;
    case "success":
      return `Found 0 errors. Watching for file changes.`;
    case "failure":
      return `Found ${status.diagnosticCount ?? 0} errors. Watching for file changes.`;
  }
}

export function coalesceWatchStatuses(statuses: readonly WatchStatus[]): readonly WatchStatus[] {
  const result: WatchStatus[] = [];
  for (const status of statuses) {
    const previous = result[result.length - 1];
    if (previous !== undefined && previous.kind === status.kind && previous.project === status.project && previous.file === status.file) {
      const diagnosticCount = status.diagnosticCount ?? previous.diagnosticCount;
      result[result.length - 1] = { ...status, ...(diagnosticCount === undefined ? {} : { diagnosticCount }) };
    } else {
      result.push(status);
    }
  }
  return result;
}

export function watchStatusIsTerminal(status: WatchStatus): boolean {
  return status.kind === "success" || status.kind === "failure";
}

function projectSuffix(status: WatchStatus): string {
  return status.project === undefined ? "" : ` for project ${status.project}`;
}

function fileSuffix(status: WatchStatus): string {
  return status.file === undefined ? "" : ` in ${status.file}`;
}
