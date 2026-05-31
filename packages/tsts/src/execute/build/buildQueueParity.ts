/**
 * Build queue parity helpers.
 *
 * TS-Go build orchestration tracks pending projects, blocked project
 * references, invalidated outputs, and diagnostic-only rebuilds separately.
 */

export type BuildQueueReason = "initial" | "upstream" | "dirty-file" | "config" | "force";

export interface BuildQueueProject {
  readonly name: string;
  readonly references: readonly string[];
  readonly dirtyFiles: readonly string[];
  readonly emitBlocked: boolean;
}

export interface BuildQueueEntry {
  readonly project: BuildQueueProject;
  readonly reason: BuildQueueReason;
  readonly blockedBy: readonly string[];
}

export interface BuildQueue {
  enqueue(project: BuildQueueProject, reason: BuildQueueReason): void;
  markBuilt(projectName: string): void;
  markFailed(projectName: string): void;
  next(): BuildQueueEntry | undefined;
  pending(): readonly BuildQueueEntry[];
}

export function createBuildQueue(): BuildQueue {
  const entries: BuildQueueEntry[] = [];
  const built = new Set<string>();
  const failed = new Set<string>();
  return {
    enqueue(project, reason) {
      const blockedBy = project.references.filter(reference => !built.has(reference));
      const existingIndex = entries.findIndex(entry => entry.project.name === project.name);
      const entry: BuildQueueEntry = { project, reason, blockedBy };
      if (existingIndex >= 0) entries[existingIndex] = entry;
      else entries.push(entry);
    },
    markBuilt(projectName) {
      built.add(projectName);
      failed.delete(projectName);
      refreshBlocked(entries, built, failed);
    },
    markFailed(projectName) {
      failed.add(projectName);
      refreshBlocked(entries, built, failed);
    },
    next() {
      const index = entries.findIndex(entry => entry.blockedBy.length === 0);
      if (index < 0) return undefined;
      const [entry] = entries.splice(index, 1);
      return entry;
    },
    pending() {
      return [...entries];
    },
  };
}

export function computeBuildInvalidation(previous: readonly string[], next: readonly string[]): readonly string[] {
  const previousSet = new Set(previous);
  return next.filter(file => !previousSet.has(file));
}

export function buildQueueReasonForChange(path: string): BuildQueueReason {
  if (path.endsWith("tsconfig.json")) return "config";
  if (path.endsWith(".d.ts")) return "upstream";
  return "dirty-file";
}

export function shouldEmitProject(project: BuildQueueProject): boolean {
  return !project.emitBlocked && project.dirtyFiles.length > 0;
}

export function shouldCheckProject(project: BuildQueueProject): boolean {
  return project.dirtyFiles.length > 0 || project.references.length > 0;
}

function refreshBlocked(entries: BuildQueueEntry[], built: ReadonlySet<string>, failed: ReadonlySet<string>): void {
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index]!;
    entries[index] = {
      ...entry,
      blockedBy: entry.project.references.filter(reference => !built.has(reference) || failed.has(reference)),
    };
  }
}
